/**
 * Logística Pro - Laboratorio: simulador con pantallas tipo SAP.
 *
 * Cada paso espera una transacción (en el campo de comando) o un valor
 * (en el formulario). Hay dos modos:
 *   - Práctica: el robot principal da pistas progresivas; sirve para aprender.
 *   - Evaluación: sin pistas y con 3 intentos por paso; aprobarlo marca
 *     el laboratorio como completado.
 */
const MAX_STRIKES = 3;

const SAPEngine = {
    modulo: null,
    paso: 0,
    errores: 0,
    modo: 'practica',
    pistaNivel: 0,
    tcode: null,
    campos: [],
    estado: null,
    terminado: false,

    async abrir(modulo, modo = 'practica') {
        if (!modulo.pasos || modulo.pasos.length === 0) {
            UIRenderer.renderError('Este laboratorio no tiene pasos.', 'Avísale al autor de la app.');
            return;
        }
        Router.irA('lab');
        UIRenderer.moduloActual = modulo.id;
        smartNotes.setContext(modulo.id, modulo.titulo);
        await this.cargarTransacciones();
        this.modulo = modulo;
        this.modo = modo;
        this.reiniciarDatos();
        this.render(true);
    },

    async cargarTransacciones() {
        if (UIRenderer.transacciones) return;
        try {
            const r = await fetch('content/transacciones-verificadas.json');
            UIRenderer.transacciones = (await r.json()).transacciones;
        } catch (e) {
            UIRenderer.transacciones = [];
        }
    },

    reiniciarDatos() {
        this.paso = 0;
        this.errores = 0;
        this.pistaNivel = 0;
        this.tcode = null;
        this.campos = [];
        this.estado = null;
        this.porQue = '';
        this.terminado = false;
    },

    estaAbierta() {
        return Router.currentView === 'lab' && !!this.modulo;
    },

    /** ¿El paso espera una transacción (va en el campo de comando)? */
    esTransaccion(cmd) {
        const c = String(cmd).toUpperCase().trim();
        const lista = UIRenderer.transacciones || [];
        if (lista.some(t => t.codigo.toUpperCase() === c)) return true;
        return c.startsWith('/') || /^[A-Z]{2,4}\d{1,3}[A-Z]?$/.test(c);
    },

    /** El paso puede decir si espera un comando o un valor; si no, se deduce. */
    pasoEsComando(paso) {
        if (paso.tipo === 'comando') return true;
        if (paso.tipo === 'valor') return false;
        return this.esTransaccion(paso.comando);
    },

    descripcionTransaccion(cmd) {
        const t = (UIRenderer.transacciones || []).find(x => x.codigo.toUpperCase() === String(cmd).toUpperCase());
        return t ? t.descripcion : 'Transacción';
    },

    tituloCorto() {
        return this.modulo.titulo.replace(/^[\d.]+\s*/, '').replace(/^Lab(oratorio)?( Multi-Paso)?:\s*/i, '');
    },

    limpiarMensaje(texto) {
        return String(texto || '').replace(/^>\s*/, '').replace(/\n+/g, ' ').trim();
    },

    // ------------------------------------------
    // Dibujo de la pantalla
    // ------------------------------------------
    render(animarCamion = false) {
        const m = this.modulo;
        const ciclo = ContentStore.cicloDe(m.id);
        const total = m.pasos.length;
        const paso = m.pasos[this.paso];
        const pideComando = this.pasoEsComando(paso);
        const practica = this.modo === 'practica';

        const puntos = m.pasos.map((_, i) => `<span class="${i < this.paso ? 'hecho' : i === this.paso ? 'actual' : ''}"></span>`).join('');

        const campos = this.campos.map(c => `
            <span class="sap-etq">${escaparHTML(c.etq)}</span>
            <span class="sap-valor" title="${escaparHTML(c.valor)}">${escaparHTML(c.valor)}</span>`).join('');
        const campoActivo = pideComando ? '' : `
            <label for="lab-campo">${escaparHTML(paso.campo || paso.instruccion)}</label>
            <input id="lab-campo" autocomplete="off" spellcheck="false" autocapitalize="characters" enterkeyhint="send" placeholder="${escaparHTML(paso.placeholder || 'Valor')}">`;
        const formVacio = !campos && pideComando ? '<span class="sap-vacio">Escribe la transacción en el campo de comando y confírmala.</span>' : '';

        const estado = this.estado
            ? `<div class="sap-estado ${this.estado.ok ? 'ok' : 'mal'}" role="status">${this.estado.ok ? Icono.check(16) : Icono.alerta(16)}<span></span></div>`
            : '<div class="sap-estado" role="status"><span class="texto-suave" style="color:#4A6268">Listo.</span></div>';

        let ayuda;
        if (practica) {
            const textos = [
                '¿Te atascaste? Pide una pista y te oriento sin darte la respuesta.',
                `Pista 1 de 2: relee la misión. ${this.orientacion(paso)}`,
                `Pista 2 de 2: ${paso.pista || paso.comando}`
            ];
            const nivel = Math.min(this.pistaNivel, 2);
            const boton = nivel < 2
                ? `<button type="button" class="btn btn-secundario btn-chico" onclick="SAPEngine.pedirPista()">${nivel === 0 ? 'Pedir pista' : 'Otra pista'}</button>` : '';
            ayuda = Robots.visibles()
                ? `<section class="robot-dice ${Robots.principal()}">${Robots.svg(Robots.principal(), nivel === 0 ? 'explicando' : 'pensando', 74)}<div class="globo"><span class="globo-quien">${Robots.nombre(Robots.principal())} · ${nivel === 0 ? 'Práctica' : 'Pista'}</span><span id="lab-pista"></span>${boton}</div></section>`
                : `<section class="tarjeta" style="display:flex; flex-direction:column; gap:8px; padding:12px"><span class="antetitulo">Práctica</span><span id="lab-pista"></span>${boton}</section>`;
            this._textoPista = textos[nivel];
        } else {
            const quedan = MAX_STRIKES - this.errores;
            ayuda = `<div class="nota-evaluacion">${Robots.visibles() ? Robots.svg(Robots.complemento(), this.errores ? 'alertando' : 'explicando', 52) : ''}<span>Modo evaluación: sin pistas. Te quedan <strong>${quedan}</strong> intento(s) en este paso.</span></div>`;
            this._textoPista = '';
        }

        UIRenderer.mostrar(`
            <div class="vista">
                ${UIRenderer.barraSup({
                    antetitulo: `Laboratorio${ciclo ? ` · Ciclo ${ciclo.numero}` : ''}`,
                    titulo: escaparHTML(this.tituloCorto()),
                    cerrar: 'SAPEngine.salir()',
                    debajo: `
                        <div class="modo" role="radiogroup" aria-label="Modo del laboratorio">
                            <button type="button" role="radio" aria-checked="${practica}" onclick="SAPEngine.cambiarModo('practica')">Práctica · con pistas</button>
                            <button type="button" role="radio" aria-checked="${!practica}" onclick="SAPEngine.cambiarModo('evaluacion')">Evaluación · aprueba</button>
                        </div>`
                })}
                <div class="vista-cuerpo">
                    <section class="tarjeta escenario">
                        ${animarCamion ? Icono.muelle() : Icono.muelle().replace('class="camion-llega"', '')}
                        <div class="escenario-textos">
                            <span class="escenario-etiqueta">Caso de negocio</span>
                            <span class="escenario-texto">${escaparHTML(m.descripcion || '')}</span>
                        </div>
                    </section>

                    <section class="mision" aria-live="polite">
                        <div class="mision-cab">
                            <span class="mision-etiqueta">MISIÓN · PASO ${this.paso + 1} DE ${total}</span>
                            <div class="puntos" aria-hidden="true">${puntos}</div>
                        </div>
                        <p class="mision-texto">${paso.mision ? escaparHTML(paso.mision) : `${pideComando ? 'Abre la transacción para: ' : 'Llena el campo: '}${escaparHTML(paso.instruccion)}`}</p>
                    </section>

                    <section class="sap" id="lab-sap" aria-label="Simulador de SAP">
                        <div class="sap-cmd">
                            <label for="lab-cmd">Comando</label>
                            <input id="lab-cmd" autocomplete="off" spellcheck="false" autocapitalize="characters" enterkeyhint="go" ${pideComando ? '' : 'disabled'} placeholder="${pideComando ? 'Transacción' : ''}">
                            <button type="button" aria-label="Confirmar comando" ${pideComando ? 'onclick="SAPEngine.ejecutar()"' : 'disabled'}>${Icono.check(18)}</button>
                        </div>
                        <div class="sap-titulo">
                            <strong>${this.tcode ? escaparHTML(this.tcode.descripcion) : 'Pantalla inicial'}</strong>
                            <span class="codigo">${this.tcode ? escaparHTML(this.tcode.codigo) : 'S/4HANA · práctica'}</span>
                        </div>
                        <div class="sap-form">${campos}${campoActivo}${formVacio}</div>
                        ${estado}
                    </section>
                    ${this.porQue ? '<p class="por-que" id="lab-porque"></p>' : ''}

                    ${ayuda}
                </div>
                <footer class="barra-inf">
                    <button class="btn-icono" style="width:52px;height:52px;border-radius:14px" type="button" onclick="smartNotes.openNotes()" aria-label="Abrir mis apuntes">${Icono.apuntes()}</button>
                    <button class="btn btn-primario btn-alto" type="button" onclick="SAPEngine.ejecutar()">Ejecutar <span class="tecla">F8</span></button>
                </footer>
            </div>`, { nav: false });

        // Textos que vienen del contenido: se insertan como texto, nunca como HTML
        const porQue = document.getElementById('lab-porque');
        if (porQue) porQue.textContent = `Por qué: ${this.porQue}`;
        const pista = document.getElementById('lab-pista');
        if (pista) pista.textContent = this._textoPista;
        const mensaje = document.querySelector('.sap-estado span:last-child');
        if (mensaje && this.estado) mensaje.textContent = this.estado.texto;

        const activo = document.getElementById(pideComando ? 'lab-cmd' : 'lab-campo');
        if (activo) {
            activo.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === 'F8') {
                    e.preventDefault();
                    this.ejecutar();
                }
            });
            setTimeout(() => activo.focus({ preventScroll: true }), 150);
        }
    },

    // ------------------------------------------
    // Acciones
    // ------------------------------------------
    ejecutar() {
        if (!this.estaAbierta() || this.terminado) return;
        const paso = this.modulo.pasos[this.paso];
        const pideComando = this.pasoEsComando(paso);
        const input = document.getElementById(pideComando ? 'lab-cmd' : 'lab-campo');
        if (!input) return;
        const valor = input.value.toUpperCase().trim();
        if (valor === '') {
            input.focus();
            return;
        }
        AudioEngine.play('click');
        const esperado = String(paso.comando).toUpperCase().trim();
        if (valor === esperado || valor === `/N${esperado}`) this.acierto(paso, esperado, pideComando);
        else this.fallo(valor);
    },

    acierto(paso, esperado, pideComando) {
        AudioEngine.play('success');
        NativeBridge.vibrar('LIGHT');
        if (pideComando) {
            this.tcode = { codigo: esperado, descripcion: this.descripcionTransaccion(esperado) };
            this.campos = [];
        } else {
            this.campos.push({ etq: paso.campo || paso.instruccion, valor: esperado });
        }
        this.estado = { ok: true, texto: this.limpiarMensaje(paso.exito) || 'Paso completado.' };
        this.porQue = paso.porque || '';
        this.paso++;
        this.errores = 0;
        this.pistaNivel = 0;
        if (this.paso >= this.modulo.pasos.length) this.terminar();
        else this.render();
    },

    fallo(valor) {
        AudioEngine.play('error');
        NativeBridge.vibrarAviso('ERROR');
        this.errores++;
        this.estado = { ok: false, texto: `"${valor}" no es correcto para este paso.` };
        this.porQue = '';

        if (this.modo === 'evaluacion' && this.errores >= MAX_STRIKES) {
            this.resultado(false);
            return;
        }
        if (this.modo === 'practica') this.pistaNivel = Math.max(this.pistaNivel, Math.min(this.errores, 2));
        this.render();
        const sap = document.getElementById('lab-sap');
        if (sap) sap.classList.add('lab-error');
    },

    pedirPista() {
        this.pistaNivel = Math.min(this.pistaNivel + 1, 2);
        AudioEngine.play('click');
        this.render();
    },

    cambiarModo(modo) {
        if (modo === this.modo) return;
        if (this.paso > 0 && !confirm('Cambiar de modo reinicia el laboratorio desde el primer paso. ¿Continuar?')) return;
        this.modo = modo;
        this.reiniciarDatos();
        this.render();
    },

    reintentar(modo) {
        this.modo = modo;
        this.reiniciarDatos();
        this.render(true);
    },

    salir() {
        if (this.paso > 0 && !this.terminado && !confirm('¿Salir del laboratorio? Se perderá el avance de esta sesión.')) return;
        this.cerrar();
    },

    cerrar() {
        const ciclo = this.modulo ? ContentStore.cicloDe(this.modulo.id) : null;
        this.modulo = null;
        if (ciclo) Router.abrirCiclo(ciclo.id);
        else Router.renderDashboard();
    },

    // Compatibilidad con el botón "atrás" de Android
    closeTerminal() { this.salir(); },

    terminar() {
        this.terminado = true;
        if (this.modo === 'evaluacion') {
            AppState.markComplete(this.modulo.id);
            NativeBridge.vibrarAviso('SUCCESS');
        }
        this.resultado(true);
    },

    resultado(exito) {
        this.terminado = true;
        const m = this.modulo;
        const ciclo = ContentStore.cicloDe(m.id);
        const evaluacion = this.modo === 'evaluacion';
        const siguiente = AppState.siguienteModulo();
        const robots = Robots.visibles();
        let robot, titulo, texto, botones;

        if (exito && evaluacion) {
            robot = robots ? Robots.svg(Robots.principal(), 'celebrando', 130) : '';
            titulo = 'Laboratorio aprobado';
            texto = `¡Bien hecho, ${UIRenderer.primerNombre()}! Completaste los ${m.pasos.length} pasos sin pistas.`;
            botones = `${siguiente ? `<button class="btn btn-primario btn-alto" type="button" onclick="Router.openModule('${siguiente.id}')">Continuar con lo siguiente ${Icono.siguiente()}</button>` : ''}
                <button class="btn btn-secundario" type="button" onclick="SAPEngine.modulo=null; Router.renderDashboard('${ciclo ? ciclo.id : ''}')">Ver el mapa</button>`;
        } else if (exito) {
            robot = robots ? Robots.svg(Robots.complemento(), 'celebrando', 130) : '';
            titulo = 'Práctica completada';
            texto = 'Ya conoces el proceso. Para aprobar el laboratorio, hazlo ahora en modo evaluación, sin pistas.';
            botones = `<button class="btn btn-primario btn-alto" type="button" onclick="SAPEngine.reintentar('evaluacion')">Hacer la evaluación ${Icono.siguiente()}</button>
                <button class="btn btn-secundario" type="button" onclick="SAPEngine.reintentar('practica')">Practicar otra vez</button>`;
        } else {
            AudioEngine.play('error');
            robot = robots ? Robots.svg(Robots.complemento(), 'pensando', 130) : '';
            titulo = 'Se acabaron los intentos';
            texto = `Fallaste ${MAX_STRIKES} veces en el paso ${this.paso + 1}. Practica con pistas y vuelve a intentarlo.`;
            botones = `<button class="btn btn-primario btn-alto" type="button" onclick="SAPEngine.reintentar('practica')">Practicar con pistas</button>
                <button class="btn btn-secundario" type="button" onclick="SAPEngine.reintentar('evaluacion')">Reintentar la evaluación</button>`;
        }

        UIRenderer.mostrar(`
            <div class="vista">
                ${UIRenderer.barraSup({ antetitulo: `Laboratorio${ciclo ? ` · Ciclo ${ciclo.numero}` : ''}`, titulo: escaparHTML(this.tituloCorto()), cerrar: 'SAPEngine.cerrar()' })}
                <div class="vista-cuerpo">
                    <section class="resultado">
                        ${robot}
                        <h2 class="titulo-pagina">${titulo}</h2>
                        <p class="texto-suave">${escaparHTML(texto)}</p>
                        ${botones}
                    </section>
                </div>
            </div>`);
    },

    /** Primera pista: orienta sin dar la respuesta. */
    orientacion(paso) {
        const cmd = String(paso.comando);
        if (cmd.startsWith('/')) return 'Se espera una transacción que empieza por "/".';
        if (/^\d+$/.test(cmd)) return `Se espera un número de ${cmd.length} dígitos.`;
        if (this.pasoEsComando(paso)) return `Se espera un código de transacción de ${cmd.length} caracteres (letras y números).`;
        return `La respuesta tiene ${cmd.length} caracteres.`;
    }
};
