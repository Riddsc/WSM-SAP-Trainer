/**
 * Logística Pro - Pantallas de la app: mapa de la maestría, ciclos,
 * lecciones, exámenes, transacciones, repaso, perfil, reporte y constancia.
 */
function shuffleArray(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

const UIRenderer = {
    moduloActual: null,
    transacciones: null,
    examen: null,
    relojExamen: null,
    avisoTimeout: null,

    contenedor() {
        return document.getElementById('view-container');
    },

    /**
     * Dibuja una pantalla. opciones.nav = false oculta el menú inferior
     * (lecciones, laboratorios y exámenes usan su propia barra de acciones).
     */
    mostrar(html, opciones = {}) {
        const c = this.contenedor();
        if (!c) return null;
        if (!opciones.mantenerReloj) this.detenerReloj();
        document.body.classList.toggle('sin-nav', opciones.nav === false);
        c.innerHTML = html;
        c.scrollTop = 0;
        return c;
    },

    nombreUsuario(porDefecto = '') {
        return AppState.perfil.nombre || porDefecto;
    },

    primerNombre() {
        const n = (AppState.perfil.nombre || '').trim().split(/\s+/)[0];
        return n || 'aprendiz';
    },

    /** Aviso corto con un robot (si el estudiante los tiene visibles). */
    aviso(mensaje, { quien = 'ridds', animo = 'explicando', segundos = 4 } = {}) {
        const caja = document.getElementById('aviso');
        if (!caja) return;
        const conRobot = Robots.visibles();
        caja.className = `${quien === 'mech' ? 'mech' : ''} ${conRobot ? '' : 'sin-robot'}`;
        caja.innerHTML = `${conRobot ? Robots.svg(quien, animo, 56) : ''}<div class="aviso-globo"></div>`;
        caja.querySelector('.aviso-globo').textContent = mensaje;
        requestAnimationFrame(() => caja.classList.add('visible'));
        clearTimeout(this.avisoTimeout);
        this.avisoTimeout = setTimeout(() => caja.classList.remove('visible'), segundos * 1000);
    },

    /** Compatibilidad: mensajes generales de MechaRidds. */
    mascota(mensaje, segundos) {
        this.aviso(mensaje, { segundos });
    },

    actualizarBarraProgreso() { /* El avance se muestra en el mapa y en el perfil. */ },

    renderError(titulo, detalle) {
        this.mostrar(`
            <div class="vista"><div class="vista-cuerpo">
                <div class="vacio">
                    ${Robots.svg('ridds', 'alertando', 110)}
                    <h2 class="titulo-seccion"></h2>
                    <p></p>
                    <button class="btn btn-primario" type="button" onclick="Router.renderDashboard()">Volver al mapa</button>
                </div>
            </div></div>`);
        const c = this.contenedor();
        c.querySelector('h2').textContent = titulo;
        c.querySelector('p').textContent = detalle;
    },

    renderCargando() {
        this.mostrar(`<div class="vista"><div class="vista-cuerpo"><p class="vacio" role="status">Cargando…</p></div></div>`, { nav: false });
    },

    /** Barra superior estándar de una pantalla interna. */
    barraSup({ antetitulo = '', titulo = '', tituloTexto = false, atras = null, cerrar = null, acciones = '', debajo = '' }) {
        const boton = atras
            ? `<button class="btn-icono sin-borde" type="button" onclick="${atras}" aria-label="Volver">${Icono.atras()}</button>`
            : cerrar
                ? `<button class="btn-icono sin-borde" type="button" onclick="${cerrar}" aria-label="Salir">${Icono.cerrar()}</button>`
                : '';
        return `
            <header class="barra-sup">
                <div class="barra-fila">
                    ${boton}
                    <div class="barra-textos" ${boton ? '' : 'style="padding-left:4px"'}>
                        ${antetitulo ? `<span class="barra-antetitulo">${antetitulo}</span>` : ''}
                        <h1 class="barra-titulo ${tituloTexto ? 'texto' : ''}">${titulo}</h1>
                    </div>
                    ${acciones}
                </div>
                ${debajo}
            </header>`;
    },

    // ==========================================
    // MAPA DE LA MAESTRÍA
    // ==========================================
    renderDashboard(encenderCiclo = null) {
        this.moduloActual = null;
        const pct = AppState.getProgressPercentage();
        const siguiente = AppState.siguienteModulo();
        const ciclo = siguiente ? ContentStore.cicloDe(siguiente.id) : null;
        const oscuro = document.documentElement.getAttribute('data-theme') !== 'light';
        const robots = Robots.visibles();

        const saludo = siguiente && ciclo ? `
            <span class="saludo-hola">Hola, ${escaparHTML(this.primerNombre())} · vas en el ciclo ${ciclo.numero}</span>
            <span class="saludo-ciclo">${escaparHTML(ciclo.nombre)}</span>
            <div class="saludo-avance">
                <div class="barra-progreso" role="progressbar" aria-label="Avance de la maestría" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
                <span class="saludo-pct">${pct} %</span>
            </div>
            <span class="saludo-modulo">${siguiente.tipo === 'lab' ? 'Laboratorio' : 'Lección'}: ${escaparHTML(siguiente.titulo)}</span>
            <button class="btn btn-primario" type="button" onclick="Router.openModule('${siguiente.id}')">
                ${siguiente.tipo === 'lab' ? 'Ir al laboratorio' : (AppState.getScore(siguiente.id) !== null ? 'Repasar y repetir' : 'Continuar')} ${Icono.siguiente()}
            </button>` : `
            <span class="saludo-hola">¡Muy bien, ${escaparHTML(this.primerNombre())}!</span>
            <span class="saludo-ciclo">Completaste todo el contenido disponible</span>
            <span class="texto-suave" style="font-size:0.9rem;">Los ciclos nuevos llegan en las próximas fases.</span>
            <button class="btn btn-primario" type="button" onclick="Router.irA('certificate','nav-profile'); UIRenderer.generateCertificate()">Ver mi constancia ${Icono.siguiente()}</button>`;

        const zonas = ContentStore.zonas.map(z => {
            const ciclos = z.ciclos.map(id => ContentStore.ciclo(id)).filter(Boolean);
            const fichas = ciclos.map((c, i) => {
                let variante = '';
                if (ciclos.length === 1) variante = 'ancho';
                else if (z.icono && i === 0 && ciclos.length === 2) variante = 'doble';
                return this.fichaCiclo(c, variante, variante ? z.icono : null, encenderCiclo === c.id);
            }).join('');
            return `
                <div class="zona">
                    <div class="zona-cab"><span class="zona-titulo">${escaparHTML(z.titulo)}</span><span class="zona-etiqueta">${escaparHTML(z.etiqueta)}</span></div>
                    <div class="rejilla-ciclos">${fichas}</div>
                </div>`;
        }).join('');

        this.mostrar(`
            <div class="vista">
                <header class="barra-sup">
                    <div class="barra-fila">
                        <div class="marca">
                            <span class="marca-logo">${Icono.caja(24)}</span>
                            <div style="min-width:0">
                                <span class="marca-nombre">LOGÍSTICA PRO</span>
                                <span class="marca-sub">Maestría SAP · bodega y transporte</span>
                            </div>
                        </div>
                        <button class="btn-icono" type="button" onclick="visualUI.toggleTheme()" aria-label="${oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}">${oscuro ? Icono.luna(20) : Icono.sol(20)}</button>
                        <button class="btn-icono cian ${robots ? '' : 'activo'}" type="button" onclick="visualUI.toggleRobots()" aria-pressed="${!robots}" aria-label="${robots ? 'Ocultar robots guía' : 'Mostrar robots guía'}">${Icono.robot(22)}</button>
                    </div>
                </header>
                <div class="vista-cuerpo">
                    <section class="tarjeta tarjeta-saludo">
                        <div class="saludo-textos">${saludo}</div>
                        ${robots ? `<div class="saludo-robot">${Robots.svg(siguiente ? 'ridds' : 'mech', siguiente ? 'explicando' : 'celebrando', 88)}</div>` : ''}
                    </section>
                    <div class="cab-plano">
                        <h2 class="titulo-seccion">Plano de la maestría</h2>
                        <div class="leyenda" aria-hidden="true"><span><i class="l-hecho"></i>Hecho</span><span><i class="l-actual"></i>Actual</span><span><i class="l-cerrado"></i>Cerrado</span></div>
                    </div>
                    <section class="plano" aria-label="Plano de bodega con los ${ContentStore.ciclos.length} ciclos">${zonas}</section>
                </div>
            </div>`);
    },

    fichaCiclo(c, variante, icono, encender) {
        const estado = AppState.estadoCiclo(c);
        const textos = { hecho: 'completo', actual: 'aquí vas', abierto: 'disponible', cerrado: 'cerrado', construccion: 'en construcción' };
        let indicador = '';
        if (estado === 'hecho') indicador = Icono.circuloCheck(18);
        else if (estado === 'actual') indicador = '<span class="ciclo-aqui">AQUÍ</span>';
        else if (estado === 'cerrado') indicador = Icono.candado(16);
        else if (estado === 'construccion') indicador = '<span class="ciclo-pronto">PRONTO</span>';

        const ilustra = icono === 'estanteria' ? Icono.estanteria(44) : icono === 'camion' ? Icono.camion(30) : '';
        const etiqueta = `Ciclo ${c.numero}, ${c.nombre}: ${textos[estado]}`;
        const clase = `ciclo ${estado} ${variante} ${encender ? 'encender' : ''}`;

        if (variante) {
            return `
                <button type="button" class="${clase}" onclick="Router.abrirCiclo('${c.id}')" aria-label="${escaparHTML(etiqueta)}">
                    ${ilustra ? `<span class="ciclo-ilustra">${ilustra}</span>` : ''}
                    <span class="ciclo-textos"><span class="ciclo-num">C${c.numero}</span><span class="ciclo-nombre">${escaparHTML(c.corto)}</span></span>
                    ${indicador}
                </button>`;
        }
        return `
            <button type="button" class="${clase}" onclick="Router.abrirCiclo('${c.id}')" aria-label="${escaparHTML(etiqueta)}">
                <span class="ciclo-fila"><span class="ciclo-num">C${c.numero}</span>${indicador}</span>
                <span class="ciclo-nombre">${escaparHTML(c.corto)}</span>
            </button>`;
    },

    // ==========================================
    // PANTALLA DE UN CICLO
    // ==========================================
    renderCiclo(id) {
        const c = ContentStore.ciclo(id);
        if (!c) { Router.renderDashboard(); return; }
        const estado = AppState.estadoCiclo(c);
        const mods = (c.modulos || []).map(m => ContentStore.info(m)).filter(Boolean);
        const hechos = mods.filter(m => AppState.isCompleted(m.id)).length;
        const pct = mods.length ? Math.round((hechos / mods.length) * 100) : 0;

        let cuerpo;
        if (estado === 'construccion') {
            cuerpo = `
                <div class="tarjeta" style="display:flex; flex-direction:column; gap:10px;">
                    <span class="antetitulo">En construcción</span>
                    <p>Este ciclo se escribe completo en la <strong>Fase ${c.fase}</strong> de la maestría, con lecciones, laboratorios y examen.</p>
                    <p class="texto-suave" style="font-size:0.9rem;"><strong>Temas:</strong> ${escaparHTML(c.temas || '')}</p>
                </div>
                ${Robots.visibles() ? `<div class="robot-dice">${Robots.svg('ridds', 'pensando', 78)}<div class="globo"><span class="globo-quien">MechaRidds</span>Mientras tanto, sigue con el ciclo marcado como "Aquí" en el mapa.</div></div>` : ''}`;
        } else {
            cuerpo = `
                <div class="lista-modulos">
                    ${mods.map(m => this.tarjetaModulo(m)).join('')}
                </div>
                <p class="texto-suave" style="font-size:0.85rem;">Mientras se reescriben los cursos, este ciclo usa los módulos actuales de la app. En las siguientes fases se reemplazan por los nuevos.</p>`;
        }

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: `Ciclo ${c.numero} · ${escaparHTML(c.ruta)}`, titulo: escaparHTML(c.nombre), atras: 'Router.renderDashboard()' })}
                <div class="vista-cuerpo">
                    <div class="ciclo-cab">
                        <div class="ciclo-meta">
                            <span>Meta: ${c.horas} h de estudio</span>
                            ${mods.length ? `<span>· ${hechos} de ${mods.length} aprobados</span>` : ''}
                        </div>
                        ${mods.length ? `<div class="barra-progreso" role="progressbar" aria-label="Avance del ciclo" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>` : ''}
                    </div>
                    ${cuerpo}
                </div>
            </div>`);
    },

    tarjetaModulo(m) {
        const completado = AppState.isCompleted(m.id);
        const disponible = AppState.estaDisponible(m);
        const puntaje = AppState.getScore(m.id);
        const lab = m.tipo === 'lab';
        let estado = '<span class="chip chip-cerrado">Cerrado</span>';
        if (completado) estado = `<span class="chip chip-exito">Aprobado${puntaje !== null ? ` · ${puntaje} %` : ''}</span>`;
        else if (disponible) estado = '<span class="chip chip-cian">Disponible</span>';
        const textoEstado = completado ? 'aprobado' : disponible ? 'disponible' : 'cerrado';

        return `
            <button type="button" class="modulo ${lab ? 'lab' : ''}" ${disponible || completado ? `onclick="Router.openModule('${m.id}')"` : 'disabled'}
                aria-label="${lab ? 'Laboratorio' : 'Lección'}: ${escaparHTML(m.titulo)}. ${textoEstado}">
                <span class="modulo-icono">${disponible || completado ? (lab ? Icono.terminal() : Icono.libro()) : Icono.candado(20)}</span>
                <span class="modulo-textos">
                    <span class="modulo-tipo">${lab ? 'Laboratorio' : 'Lección y examen'}</span>
                    <span class="modulo-titulo">${escaparHTML(m.titulo)}</span>
                    ${m.descripcion ? `<span class="modulo-desc">${escaparHTML(m.descripcion)}</span>` : ''}
                    <span class="modulo-estado">${estado}</span>
                </span>
            </button>`;
    },

    // ==========================================
    // LECCIONES
    // ==========================================
    async renderLesson(itemId, pageIndex = 0) {
        this.moduloActual = itemId;
        let mod;
        if (!ContentStore.cache[itemId]) this.renderCargando();
        try {
            mod = await ContentStore.cargar(itemId);
        } catch (e) {
            this.renderError('No se pudo abrir el módulo.', 'Revisa tu conexión si usas la versión web, o intenta de nuevo.');
            return;
        }
        // Si el estudiante cambió de pantalla mientras cargaba, no se dibuja nada
        if (this.moduloActual !== itemId || Router.currentView !== 'lesson') return;

        if (mod.tipo === 'lab') {
            SAPEngine.abrir(mod);
            return;
        }

        const paginas = mod.paginas || [];
        const total = paginas.length;
        const i = Math.max(0, Math.min(pageIndex, total - 1));
        const ultima = i === total - 1;
        const ciclo = ContentStore.cicloDe(itemId);
        smartNotes.setContext(itemId, mod.titulo);

        const progreso = total <= 16
            ? `<div class="segmentos" style="grid-template-columns:repeat(${total}, minmax(0,1fr))" role="progressbar" aria-label="Avance de la lección" aria-valuenow="${i + 1}" aria-valuemin="1" aria-valuemax="${total}">${paginas.map((_, n) => `<span class="${n <= i ? 'lleno' : ''}"></span>`).join('')}</div>`
            : `<div class="barra-progreso" style="margin:0 4px" role="progressbar" aria-label="Avance de la lección" aria-valuenow="${i + 1}" aria-valuemin="1" aria-valuemax="${total}"><span style="width:${Math.round(((i + 1) / total) * 100)}%"></span></div>`;

        const grande = AppState.ajustes.letra === 'grande';
        const acciones = `
            <button class="btn-icono ${grande ? 'activo' : ''}" type="button" onclick="visualUI.toggleLetra(); UIRenderer.renderLesson('${itemId}', ${i})" aria-pressed="${grande}" aria-label="Letra grande"><span class="aa" aria-hidden="true">Aa</span></button>
            <button class="btn-icono" type="button" onclick="smartNotes.openNotes()" aria-label="Abrir mis apuntes">${Icono.apuntes()}</button>`;

        const pagina = paginas[i];
        const contenido = typeof pagina === 'string'
            ? `<div class="contenido-leccion">${pagina}</div>`
            : this.paginaNueva(pagina || {});
        const consejo = i === 0 && typeof pagina === 'string' && pagina.includes('<details') ? this.cajaPuente('MechaRidds', 'Lee primero la idea principal. Cuando quieras el detalle técnico, toca "Ver explicación a fondo".') : '';

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({
                    antetitulo: ciclo ? `Ciclo ${ciclo.numero} · ${escaparHTML(ciclo.corto)}` : 'Lección',
                    titulo: `Página ${i + 1} de ${total}`, tituloTexto: true,
                    atras: ciclo ? `Router.abrirCiclo('${ciclo.id}')` : 'Router.renderDashboard()',
                    acciones, debajo: progreso
                })}
                <div class="vista-cuerpo">
                    <h2 class="leccion-titulo">${escaparHTML(mod.titulo)}</h2>
                    ${consejo}
                    ${contenido}
                    ${ultima && mod.resumen ? `<section class="resumen-leccion"><h3>Resumen</h3><p>${mod.resumen}</p></section>` : ''}
                </div>
                <footer class="barra-inf">
                    <button class="btn btn-secundario btn-alto" type="button" ${i === 0 ? 'disabled' : `onclick="UIRenderer.cambiarPagina('${itemId}', ${i - 1})"`}>Anterior</button>
                    ${ultima
                        ? `<button class="btn btn-primario btn-alto" type="button" onclick="UIRenderer.startExam('${itemId}')">Presentar examen ${Icono.siguiente()}</button>`
                        : `<button class="btn btn-primario btn-alto" type="button" onclick="UIRenderer.cambiarPagina('${itemId}', ${i + 1})">Siguiente ${Icono.siguiente()}</button>`}
                </footer>
            </div>`, { nav: false });
    },

    cajaPuente(titulo, texto) {
        const robot = Robots.visibles();
        return `
            <section class="puente ${robot ? '' : 'sin-robot'}">
                ${robot ? Robots.svg('ridds', 'explicando', 64) : ''}
                <div class="puente-textos"><span class="puente-titulo">${escaparHTML(titulo)}</span><p>${escaparHTML(texto)}</p></div>
            </section>`;
    },

    /**
     * Formato nuevo de página (Fase 2 en adelante):
     * { caso, capas: {idea, detalle, sap}, glosario: [{es, en}], puente, error: {titulo, texto}, html }
     */
    paginaNueva(p) {
        let html = '';
        if (p.caso) html += `<section class="caso"><span class="caso-etiqueta">CASO DE NEGOCIO</span><p>${p.caso}</p></section>`;
        if (p.capas) {
            const nombres = [['idea', 'Idea'], ['detalle', 'Detalle'], ['sap', 'En SAP']].filter(([k]) => p.capas[k]);
            html += `
                <div class="capas" role="tablist" aria-label="Nivel de explicación" style="grid-template-columns:repeat(${nombres.length}, minmax(0,1fr))">
                    ${nombres.map(([k, n], i) => `<button type="button" role="tab" id="capa-tab-${k}" aria-controls="capa-${k}" aria-selected="${i === 0}" onclick="UIRenderer.cambiarCapa('${k}')">${n}</button>`).join('')}
                </div>
                ${nombres.map(([k], i) => `<div class="contenido-leccion" role="tabpanel" id="capa-${k}" aria-labelledby="capa-tab-${k}" ${i === 0 ? '' : 'hidden'}>${p.capas[k]}</div>`).join('')}`;
        }
        if (p.html) html += `<div class="contenido-leccion">${p.html}</div>`;
        if (Array.isArray(p.glosario) && p.glosario.length) {
            html += `<div class="glosario"><span class="glosario-titulo">Términos nuevos</span><div class="glosario-lista">
                ${p.glosario.map(t => `<span lang="es">${escaparHTML(t.es)} · <em lang="en">${escaparHTML(t.en)}</em></span>`).join('')}
            </div></div>`;
        }
        if (p.puente) html += this.cajaPuente('Conecta con lo que sabes', p.puente);
        if (p.error) {
            html += `<details class="error-comun"><summary><span class="icono-error">${Icono.alerta()}</span><span style="flex:1"><strong>Error común:</strong> ${escaparHTML(p.error.titulo || '')}</span>${Icono.bajar()}</summary><p>${p.error.texto || ''}</p></details>`;
        }
        return html;
    },

    cambiarCapa(clave) {
        document.querySelectorAll('.capas [role="tab"]').forEach(b => b.setAttribute('aria-selected', String(b.id === `capa-tab-${clave}`)));
        document.querySelectorAll('[role="tabpanel"][id^="capa-"]').forEach(p => { p.hidden = p.id !== `capa-${clave}`; });
    },

    cambiarPagina(itemId, pagina) {
        AudioEngine.play('click');
        this.renderLesson(itemId, pagina);
    },

    // ==========================================
    // EXÁMENES
    // ==========================================
    async startExam(itemId) {
        AudioEngine.play('click');
        let mod;
        try {
            mod = await ContentStore.cargar(itemId);
        } catch (e) {
            this.renderError('No se pudo abrir el examen.', 'Intenta de nuevo.');
            return;
        }
        Router.irA('exam');
        this.moduloActual = itemId;
        smartNotes.setContext(itemId, mod.titulo);

        const preguntas = shuffleArray(mod.examen || []).map(p => {
            const opciones = shuffleArray(p.opciones);
            const correctas = opciones.filter(o => o.correcta).length;
            return { ...p, opciones, multiple: correctas > 1, nCorrectas: correctas };
        });
        this.examen = {
            id: itemId,
            titulo: mod.titulo,
            ciclo: ContentStore.cicloDe(itemId),
            preguntas,
            respuestas: preguntas.map(() => []),
            marcadas: new Set(),
            actual: 0,
            inicio: Date.now()
        };
        this.renderPregunta(0);
        this.iniciarReloj();
    },

    iniciarReloj() {
        this.detenerReloj();
        this.relojExamen = setInterval(() => {
            const el = document.getElementById('reloj-texto');
            if (el && this.examen) el.textContent = this.tiempoTranscurrido();
        }, 1000);
    },

    detenerReloj() {
        if (this.relojExamen) clearInterval(this.relojExamen);
        this.relojExamen = null;
    },

    tiempoTranscurrido() {
        const s = Math.floor((Date.now() - (this.examen?.inicio || Date.now())) / 1000);
        return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    },

    renderPregunta(i) {
        const ex = this.examen;
        if (!ex) return;
        ex.actual = i;
        const p = ex.preguntas[i];
        const total = ex.preguntas.length;
        const ultima = i === total - 1;
        const elegidas = ex.respuestas[i];
        const marcada = ex.marcadas.has(i);
        const pct = Math.round(((i + 1) / total) * 100);

        const tipo = p.multiple ? `Varias correctas · elige ${p.nCorrectas}` : 'Una respuesta';
        const opciones = p.opciones.map((op, oi) => `
            <button type="button" class="opcion ${p.multiple ? '' : 'unica'}" id="op-${oi}" aria-pressed="${elegidas.includes(oi)}" onclick="UIRenderer.elegir(${oi})">
                <span class="opcion-marca">${p.multiple ? Icono.check(18) : ''}</span>
                <span>${op.texto}</span>
            </button>`).join('');

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({
                    antetitulo: `Examen${ex.ciclo ? ` · Ciclo ${ex.ciclo.numero}` : ''}`,
                    titulo: `Pregunta ${i + 1} de ${total}`,
                    cerrar: 'UIRenderer.salirExamen()',
                    acciones: `<div class="reloj" role="timer" aria-label="Tiempo transcurrido">${Icono.reloj()}<span id="reloj-texto">${this.tiempoTranscurrido()}</span></div>`,
                    debajo: `<div class="barra-progreso cian" style="margin:0 4px" role="progressbar" aria-label="Avance del examen" aria-valuenow="${i + 1}" aria-valuemin="1" aria-valuemax="${total}"><span style="width:${pct}%"></span></div>`
                })}
                <div class="vista-cuerpo">
                    <span class="pregunta-tipo">${tipo}</span>
                    <h2 class="pregunta-texto" id="pregunta-texto">${p.pregunta}</h2>
                    <div class="opciones" role="group" aria-labelledby="pregunta-texto">${opciones}</div>
                    ${i === 0 ? `<div class="nota-evaluacion">${Robots.visibles() ? Robots.svg('mech', 'explicando', 52) : ''}<span>En el examen no hay pistas. Necesitas 80 % para aprobar; las preguntas cambian de orden en cada intento.</span></div>` : ''}
                </div>
                <footer class="barra-inf">
                    <button class="btn-icono" style="width:52px;height:52px;border-radius:14px" type="button" ${i === 0 ? 'disabled' : `onclick="UIRenderer.irPregunta(${i - 1})"`} aria-label="Pregunta anterior">${Icono.anterior(20)}</button>
                    <button class="btn btn-secundario btn-alto" type="button" aria-pressed="${marcada}" onclick="UIRenderer.marcarRevision()">${Icono.marcador()} ${marcada ? 'Marcada' : 'Revisar luego'}</button>
                    <button class="btn btn-primario btn-alto" type="button" onclick="${ultima ? 'UIRenderer.renderResumenExamen()' : `UIRenderer.irPregunta(${i + 1})`}">${ultima ? 'Ver resumen' : 'Siguiente'} ${Icono.siguiente()}</button>
                </footer>
            </div>`, { nav: false, mantenerReloj: true });
    },

    elegir(oi) {
        const ex = this.examen;
        if (!ex) return;
        AudioEngine.play('click');
        const p = ex.preguntas[ex.actual];
        let sel = ex.respuestas[ex.actual];
        if (p.multiple) sel = sel.includes(oi) ? sel.filter(x => x !== oi) : [...sel, oi];
        else sel = [oi];
        ex.respuestas[ex.actual] = sel;
        p.opciones.forEach((_, k) => {
            const b = document.getElementById(`op-${k}`);
            if (b) b.setAttribute('aria-pressed', String(sel.includes(k)));
        });
    },

    irPregunta(i) {
        AudioEngine.play('click');
        this.renderPregunta(i);
    },

    marcarRevision() {
        const ex = this.examen;
        if (!ex) return;
        if (ex.marcadas.has(ex.actual)) ex.marcadas.delete(ex.actual);
        else ex.marcadas.add(ex.actual);
        this.renderPregunta(ex.actual);
    },

    salirExamen() {
        if (confirm('¿Salir del examen? Perderás las respuestas marcadas.')) {
            this.examen = null;
            this.detenerReloj();
            const ciclo = ContentStore.cicloDe(this.moduloActual);
            if (ciclo) Router.abrirCiclo(ciclo.id);
            else Router.renderDashboard();
        }
    },

    renderResumenExamen() {
        const ex = this.examen;
        if (!ex) return;
        const total = ex.preguntas.length;
        const respondidas = ex.respuestas.filter(r => r.length > 0).length;
        const botones = ex.preguntas.map((_, i) => {
            const clases = `${ex.respuestas[i].length ? 'respondida' : ''} ${ex.marcadas.has(i) ? 'marcada' : ''}`;
            const estado = `${ex.respuestas[i].length ? 'respondida' : 'sin responder'}${ex.marcadas.has(i) ? ', marcada para revisar' : ''}`;
            return `<button type="button" class="${clases}" onclick="UIRenderer.irPregunta(${i})" aria-label="Pregunta ${i + 1}, ${estado}">${i + 1}</button>`;
        }).join('');

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({
                    antetitulo: `Examen${ex.ciclo ? ` · Ciclo ${ex.ciclo.numero}` : ''}`,
                    titulo: 'Resumen antes de entregar',
                    atras: `UIRenderer.irPregunta(${total - 1})`,
                    acciones: `<div class="reloj" role="timer" aria-label="Tiempo transcurrido">${Icono.reloj()}<span id="reloj-texto">${this.tiempoTranscurrido()}</span></div>`
                })}
                <div class="vista-cuerpo">
                    <p style="font-size:1.05rem;"><strong>${respondidas} de ${total}</strong> preguntas respondidas.${ex.marcadas.size ? ` ${ex.marcadas.size} marcada(s) para revisar.` : ''}</p>
                    <div class="leyenda-mapa" aria-hidden="true">
                        <span><i style="background:var(--cian-suave); border:1.5px solid var(--cian)"></i>Respondida</span>
                        <span><i style="border:1.5px dashed var(--texto-tenue)"></i>Sin responder</span>
                        <span><i style="background:var(--ambar); border-radius:50%"></i>Revisar</span>
                    </div>
                    <div class="mapa-preguntas">${botones}</div>
                    <p class="texto-suave" style="font-size:0.9rem;">Toca un número para volver a esa pregunta.</p>
                </div>
                <footer class="barra-inf">
                    <button class="btn btn-primario btn-alto" type="button" onclick="UIRenderer.submitExam()">Entregar examen</button>
                </footer>
            </div>`, { nav: false, mantenerReloj: true });
    },

    esCorrecta(p, sel) {
        const correctas = p.opciones.map((o, i) => (o.correcta ? i : -1)).filter(i => i >= 0);
        return sel.length === correctas.length && correctas.every(i => sel.includes(i));
    },

    submitExam() {
        const ex = this.examen;
        if (!ex) return;
        const sinResponder = ex.respuestas.filter(r => r.length === 0).length;
        if (sinResponder > 0 && !confirm(`Te faltan ${sinResponder} pregunta(s) por responder. Cuentan como incorrectas. ¿Entregar de todos modos?`)) return;

        this.detenerReloj();
        const total = ex.preguntas.length;
        const buenas = ex.preguntas.filter((p, i) => this.esCorrecta(p, ex.respuestas[i])).length;
        const puntaje = Math.round((buenas / total) * 100);
        const aprobado = puntaje >= 80;
        const duracion = this.tiempoTranscurrido();
        AppState.saveScore(ex.id, puntaje);

        if (aprobado) {
            AudioEngine.play('success');
            NativeBridge.vibrarAviso('SUCCESS');
            AppState.markComplete(ex.id);
        } else {
            AudioEngine.play('error');
            NativeBridge.vibrarAviso('ERROR');
        }

        const retro = ex.preguntas.map((p, i) => {
            const sel = ex.respuestas[i];
            const bien = this.esCorrecta(p, sel);
            const tuyas = sel.length ? sel.map(k => p.opciones[k].texto).join(' · ') : 'Sin responder';
            const correctas = p.opciones.filter(o => o.correcta).map(o => o.texto).join(' · ');
            return `
                <div class="retro-item">
                    <div class="retro-cab">
                        <span class="opcion-marca" style="background:${bien ? 'var(--exito)' : 'var(--error)'}; border-color:transparent; color:${bien ? 'var(--sobre-exito)' : 'var(--sobre-error)'}; width:22px; height:22px; border-radius:50%" role="img" aria-label="${bien ? 'Correcta' : 'Incorrecta'}">${bien ? Icono.check(14) : Icono.equis(12)}</span>
                        <span class="retro-preg">${i + 1}. ${p.pregunta}</span>
                    </div>
                    ${bien ? '' : `<p class="retro-linea"><b>Tu respuesta:</b> ${tuyas}</p>`}
                    <p class="retro-linea"><b>Correcta:</b> ${correctas}</p>
                    ${p.explicacion ? `<p class="retro-linea"><b>Por qué:</b> ${p.explicacion}</p>` : ''}
                </div>`;
        }).join('');

        const siguiente = AppState.siguienteModulo();
        const ciclo = ex.ciclo;
        const nombre = this.primerNombre();
        const robots = Robots.visibles();

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: escaparHTML(ex.titulo), titulo: aprobado ? 'Examen aprobado' : 'Examen no aprobado', atras: ciclo ? `Router.abrirCiclo('${ciclo.id}')` : 'Router.renderDashboard()' })}
                <div class="vista-cuerpo">
                    <section class="resultado">
                        ${robots ? Robots.svg(aprobado ? 'mech' : 'ridds', aprobado ? 'celebrando' : 'pensando', 120) : ''}
                        <span class="resultado-puntaje ${aprobado ? 'bien' : 'mal'}">${puntaje} %</span>
                        <p><strong>${buenas} de ${total}</strong> correctas · tiempo ${duracion}</p>
                        <p class="texto-suave">${aprobado ? `¡Excelente trabajo, ${escaparHTML(nombre)}! Se desbloqueó lo siguiente.` : `Se necesita 80 %. Repasa la teoría con calma y vuelve a intentarlo, ${escaparHTML(nombre)}.`}</p>
                        ${aprobado
                            ? `${siguiente ? `<button class="btn btn-primario btn-alto" type="button" onclick="Router.openModule('${siguiente.id}')">Continuar con lo siguiente ${Icono.siguiente()}</button>` : ''}
                               <button class="btn btn-secundario" type="button" onclick="Router.renderDashboard('${ciclo ? ciclo.id : ''}')">Ver el mapa</button>`
                            : `<button class="btn btn-primario btn-alto" type="button" onclick="Router.openModule('${ex.id}')">Repasar la teoría</button>
                               <button class="btn btn-secundario" type="button" onclick="UIRenderer.startExam('${ex.id}')">Intentar de nuevo</button>`}
                    </section>
                    <h2 class="titulo-seccion">Retroalimentación</h2>
                    <div class="retro">${retro}</div>
                </div>
            </div>`);
        Router.irA('examResult');
        this.examen = null;
    },

    // ==========================================
    // TRANSACCIONES (solo verificadas)
    // ==========================================
    async renderGlossary() {
        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: 'Diccionario SAP verificado', titulo: 'Transacciones' })}
                <div class="vista-cuerpo">
                    <div class="buscador">
                        ${Icono.buscar()}
                        <label for="tcode-search" class="sr-only">Buscar transacción</label>
                        <input type="search" id="tcode-search" class="modern-input" placeholder="Buscar: MIGO, monitor, inventario…" oninput="UIRenderer.filterGlossary(this.value)">
                    </div>
                    <div id="tcode-list-container" style="display:flex; flex-direction:column; gap:10px;"><p class="vacio" role="status">Cargando…</p></div>
                </div>
            </div>`);

        if (!this.transacciones) {
            try {
                const r = await fetch('content/transacciones-verificadas.json');
                this.transacciones = (await r.json()).transacciones;
            } catch (e) {
                const lista = document.getElementById('tcode-list-container');
                if (lista) lista.innerHTML = '<p class="vacio">No se pudo cargar la lista de transacciones.</p>';
                return;
            }
        }
        if (Router.currentView !== 'glossary') return;
        this.filterGlossary('');
    },

    filterGlossary(consulta = '') {
        const lista = document.getElementById('tcode-list-container');
        if (!lista || !this.transacciones) return;
        const q = consulta.trim().toLowerCase();
        const filtradas = this.transacciones.filter(t =>
            t.codigo.toLowerCase().includes(q) ||
            t.modulo.toLowerCase().includes(q) ||
            t.descripcion.toLowerCase().includes(q)
        );

        if (filtradas.length === 0) {
            lista.innerHTML = `<div class="vacio"><strong>Sin coincidencias</strong><span></span></div>`;
            lista.querySelector('span').textContent = `No hay transacciones para "${consulta}".`;
            return;
        }
        lista.innerHTML = filtradas.map(t => `
            <div class="tarjeta tcode">
                <span class="tcode-codigo ${t.modulo === 'EWM' ? 'ewm' : ''}">${escaparHTML(t.codigo)}</span>
                <span class="tcode-textos">
                    <span class="tcode-modulo">${escaparHTML(t.modulo)}</span>
                    <span>${escaparHTML(t.descripcion)}</span>
                </span>
            </div>`).join('');
    },

    // ==========================================
    // REPASO
    // ==========================================
    renderRepaso() {
        const apuntes = AppState.data.apuntes || {};
        const lista = Object.keys(apuntes)
            .filter(id => (apuntes[id] || '').trim())
            .map(id => {
                const info = id === 'general' ? { titulo: 'Apuntes generales' } : ContentStore.info(id);
                return { id, titulo: info ? info.titulo : id, texto: apuntes[id] };
            });

        const tarjetas = lista.length
            ? lista.map(a => `
                <button type="button" class="tarjeta apunte" onclick="UIRenderer.abrirApunte('${escaparHTML(a.id)}')">
                    <span class="apunte-titulo">${escaparHTML(a.titulo)}</span>
                    <span class="apunte-extracto">${escaparHTML(a.texto)}</span>
                </button>`).join('')
            : `<div class="vacio">${Robots.visibles() ? Robots.svg('ridds', 'pensando', 90) : ''}<p>Aún no tienes apuntes. En cada lección y laboratorio hay un botón para escribirlos.</p></div>`;

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: 'Lo que aprendiste', titulo: 'Repaso' })}
                <div class="vista-cuerpo">
                    <section class="tarjeta" style="display:flex; flex-direction:column; gap:6px;">
                        <span class="antetitulo">Próximamente</span>
                        <p><strong>Tarjetas de repaso</strong> con transacciones y términos clave, que vuelven a aparecer justo cuando las vas a olvidar. Llegan con los ciclos nuevos.</p>
                    </section>
                    <div class="cab-plano">
                        <h2 class="titulo-seccion">Mis apuntes</h2>
                        <button class="btn btn-secundario btn-chico" type="button" onclick="UIRenderer.abrirApunte('general')">${Icono.apuntes(16)} Apunte general</button>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px;">${tarjetas}</div>
                </div>
            </div>`);
    },

    abrirApunte(id) {
        const info = id === 'general' ? { titulo: 'Apuntes generales' } : ContentStore.info(id);
        smartNotes.setContext(id, info ? info.titulo : id);
        smartNotes.openNotes();
    },

    // ==========================================
    // PERFIL Y AJUSTES
    // ==========================================
    renderProfile() {
        const total = ContentStore.total();
        const aprobados = ContentStore.catalogo.filter(m => AppState.isCompleted(m.id)).length;
        const pct = AppState.getProgressPercentage();
        const { nombre, rol } = AppState.perfil;
        const a = AppState.ajustes;
        const version = window.APP_VERSION || 'desarrollo';
        const claro = document.documentElement.getAttribute('data-theme') === 'light';

        const interruptor = (id, etiqueta, sub, activo, accion) => `
            <div class="settings-row">
                <div><span class="settings-label" id="${id}-lbl">${etiqueta}</span>${sub ? `<span class="settings-sublabel">${sub}</span>` : ''}</div>
                <label class="switch"><input type="checkbox" id="${id}" ${activo ? 'checked' : ''} onchange="${accion}" aria-labelledby="${id}-lbl"><span class="slider-toggle"></span></label>
            </div>`;

        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: 'Centro de mando', titulo: 'Perfil y ajustes' })}
                <div class="vista-cuerpo settings-grid">
                    <section class="settings-card">
                        <div class="settings-card-header">
                            <h2 class="settings-card-title">Datos del estudiante</h2>
                            <span class="status-badge ${nombre ? 'status-done' : 'status-pend'}">${nombre ? 'Activo' : 'Sin registrar'}</span>
                        </div>
                        <p>Tu nombre aparece en los saludos de los robots, en el reporte y en la constancia de avance.</p>
                        <label for="user-name-input" class="sr-only">Nombre completo</label>
                        <input type="text" id="user-name-input" class="modern-input" placeholder="Nombre completo (ej. Juan Pérez)" value="${escaparHTML(nombre)}" maxlength="60" autocomplete="name">
                        <label for="user-role-input" class="sr-only">Cargo o meta</label>
                        <input type="text" id="user-role-input" class="modern-input" placeholder="Cargo o meta (ej. Analista de inventarios)" value="${escaparHTML(rol)}" maxlength="60">
                        <button class="btn btn-primario" type="button" onclick="UIRenderer.saveProfileName()">Guardar perfil</button>
                    </section>

                    <section class="settings-card">
                        <div class="settings-card-header">
                            <h2 class="settings-card-title">Avance</h2>
                            <span class="codigo" style="color:var(--ambar-texto)">${pct} %</span>
                        </div>
                        <div class="barra-progreso" role="progressbar" aria-label="Avance de la maestría" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>
                        <div class="kpis">
                            <div class="kpi"><strong>${aprobados}</strong><span>Aprobados</span></div>
                            <div class="kpi"><strong>${total - aprobados}</strong><span>Restantes</span></div>
                            <div class="kpi"><strong>${total}</strong><span>Módulos</span></div>
                        </div>
                        <div class="fila-botones">
                            <button class="btn btn-secundario" type="button" onclick="UIRenderer.generateReport()">Reporte de módulos</button>
                            <button class="btn btn-primario" type="button" onclick="UIRenderer.generateCertificate()">Constancia de avance</button>
                        </div>
                    </section>

                    <section class="settings-card">
                        <h2 class="settings-card-title">Apariencia</h2>
                        ${interruptor('t-claro', 'Modo claro', 'Fondo claro para estudiar de día', claro, 'visualUI.toggleTheme(); UIRenderer.renderProfile()')}
                        ${interruptor('t-letra', 'Letra grande', 'Agranda el texto de toda la app', a.letra === 'grande', 'visualUI.toggleLetra()')}
                        ${interruptor('t-robots', 'Robots guía', 'MechaRidds y Mechanizer en lecciones, laboratorios y avisos', a.robots !== false, 'visualUI.toggleRobots(false)')}
                    </section>

                    <section class="settings-card">
                        <h2 class="settings-card-title">Sonido y vibración</h2>
                        ${interruptor('t-sound', 'Efectos de sonido', 'Al navegar y al evaluar', a.sonido, 'UIRenderer.saveHardwareSettings()')}
                        <div class="settings-row">
                            <label for="t-vol" class="settings-label">Volumen <span id="vol-label" class="texto-suave">${a.volumen} %</span></label>
                            <input type="range" id="t-vol" min="0" max="100" step="5" value="${a.volumen}" style="width:50%;"
                                oninput="document.getElementById('vol-label').innerText = this.value + ' %'" onchange="UIRenderer.saveHardwareSettings(); AudioEngine.play('click')">
                        </div>
                        ${interruptor('t-vib', 'Vibración', 'Al tocar botones', a.vibracion, 'UIRenderer.saveHardwareSettings()')}
                        <div class="settings-row">
                            <label for="t-vib-lvl" class="settings-label">Intensidad</label>
                            <select id="t-vib-lvl" class="modern-input" style="width:50%; min-height:44px;" onchange="UIRenderer.saveHardwareSettings()">
                                <option value="LIGHT" ${a.nivelVibracion === 'LIGHT' ? 'selected' : ''}>Suave</option>
                                <option value="MEDIUM" ${a.nivelVibracion === 'MEDIUM' ? 'selected' : ''}>Media</option>
                                <option value="HEAVY" ${a.nivelVibracion === 'HEAVY' ? 'selected' : ''}>Fuerte</option>
                            </select>
                        </div>
                    </section>

                    <section class="settings-card">
                        <h2 class="settings-card-title">Recordatorio diario</h2>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <label for="study-time" class="sr-only">Hora del recordatorio</label>
                            <input type="time" id="study-time" class="time-picker-input" style="flex:1;" value="${a.recordatorio || '20:00'}">
                            <button class="btn btn-secundario" type="button" onclick="UIRenderer.scheduleReminder()">Activar</button>
                        </div>
                        <p id="reminder-status" class="reminder-status" role="status" ${a.recordatorio ? '' : 'hidden'}>${a.recordatorio ? `Recordatorio diario a las ${a.recordatorio}` : ''}</p>
                        ${a.recordatorio ? `<button class="btn btn-neutro" type="button" onclick="UIRenderer.cancelReminder()">Desactivar recordatorio</button>` : ''}
                    </section>

                    <section class="settings-card peligro">
                        <h2 class="settings-card-title">Respaldo y restauración</h2>
                        <p>El respaldo incluye progreso, puntajes, apuntes, perfil y ajustes.</p>
                        <div class="fila-botones">
                            <button class="btn btn-neutro" type="button" onclick="AppState.exportBackup()">Guardar respaldo</button>
                            <input type="file" id="backup-file" accept=".json,application/json" hidden onchange="AppState.importBackup(event)">
                            <button class="btn btn-neutro" type="button" onclick="document.getElementById('backup-file').click()">Restaurar</button>
                        </div>
                        <button class="btn btn-peligro" type="button" onclick="UIRenderer.factoryReset()">Borrar todo el progreso</button>
                    </section>

                    <p class="app-version">Logística Pro · versión ${escaparHTML(version)}<br>
                    App de estudio independiente; no está afiliada ni respaldada por SAP SE. SAP, S/4HANA y EWM son marcas de SAP SE.</p>
                </div>
            </div>`);
    },

    saveProfileName() {
        const nombre = (document.getElementById('user-name-input')?.value || '').trim();
        const rol = (document.getElementById('user-role-input')?.value || '').trim();
        if (!nombre) {
            this.aviso('Escribe tu nombre antes de guardar.', { animo: 'alertando', segundos: 3 });
            return;
        }
        AppState.setPerfil(nombre, rol);
        AudioEngine.play('success');
        this.renderProfile();
        this.aviso(`¡Perfil guardado, ${nombre.split(/\s+/)[0]}!`, { quien: 'mech', animo: 'celebrando' });
    },

    saveHardwareSettings() {
        const leer = (id, porDefecto) => {
            const el = document.getElementById(id);
            if (!el) return porDefecto;
            return el.type === 'checkbox' ? el.checked : el.value;
        };
        AppState.setAjuste('sonido', leer('t-sound', true));
        AppState.setAjuste('volumen', Number(leer('t-vol', 100)));
        AppState.setAjuste('vibracion', leer('t-vib', true));
        AppState.setAjuste('nivelVibracion', leer('t-vib-lvl', 'MEDIUM'));
        NativeBridge.vibrar(AppState.ajustes.nivelVibracion);
    },

    triggerHaptic(nivel) {
        NativeBridge.vibrar(nivel || AppState.ajustes.nivelVibracion);
    },

    async scheduleReminder() {
        const hora = document.getElementById('study-time')?.value;
        const estado = document.getElementById('reminder-status');
        if (!hora || !estado) return;
        const resultado = await NativeBridge.programarRecordatorio(hora);
        estado.hidden = false;
        estado.textContent = resultado.mensaje;
        estado.style.color = resultado.ok ? 'var(--exito)' : 'var(--error)';
        if (resultado.ok) {
            AppState.setAjuste('recordatorio', hora);
            this.renderProfile();
            this.aviso(`Recordatorio activado para las ${hora}.`, { quien: 'mech' });
        }
    },

    async cancelReminder() {
        await NativeBridge.cancelarRecordatorio();
        AppState.setAjuste('recordatorio', '');
        this.renderProfile();
    },

    factoryReset() {
        if (confirm('Se borrará todo: progreso, perfil y apuntes. ¿Continuar?') &&
            confirm('Última advertencia: esto no se puede deshacer. ¿Borrar todo?')) {
            NativeBridge.cancelarRecordatorio();
            AppState.borrarTodo();
            window.location.reload();
        }
    },

    // ==========================================
    // DOCUMENTOS: REPORTE Y CONSTANCIA
    // ==========================================
    datosDocumento() {
        return {
            nombre: this.nombreUsuario('Estudiante no registrado'),
            rol: AppState.perfil.rol || 'Estudiante de logística con SAP',
            fecha: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
            pct: AppState.getProgressPercentage(),
            aprobados: ContentStore.catalogo.filter(m => AppState.isCompleted(m.id)).length,
            total: ContentStore.total()
        };
    },

    htmlReporte() {
        const d = this.datosDocumento();
        const filas = ContentStore.catalogo.map((mod, i) => {
            const completado = AppState.isCompleted(mod.id);
            const bloqueado = !AppState.estaDisponible(mod);
            const puntaje = AppState.getScore(mod.id);
            const ciclo = ContentStore.cicloDe(mod.id);
            let estado = '<span class="status-badge status-pend">Pendiente</span>';
            if (completado) estado = '<span class="status-badge status-done">Aprobado</span>';
            else if (bloqueado) estado = '<span class="status-badge status-lock">Cerrado</span>';
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td><strong>${escaparHTML(mod.titulo)}</strong>
                        <span class="report-sub">${ciclo ? `Ciclo ${ciclo.numero} · ${escaparHTML(ciclo.corto)} · ` : ''}${mod.tipo === 'lab' ? 'Laboratorio' : 'Lección y examen'}</span></td>
                    <td>${puntaje !== null ? puntaje + ' %' : '—'}</td>
                    <td>${estado}</td>
                </tr>`;
        }).join('');

        return `
            <section class="settings-card">
                <p><strong>Estudiante:</strong> ${escaparHTML(d.nombre)}</p>
                <p><strong>Rol o meta:</strong> ${escaparHTML(d.rol)}</p>
                <p><strong>Fecha:</strong> ${d.fecha}</p>
                <p><strong>Avance global:</strong> ${d.pct} % (${d.aprobados} de ${d.total} módulos)</p>
            </section>
            <section class="settings-card tabla-scroll">
                <table class="report-table">
                    <thead><tr><th>#</th><th>Módulo</th><th>Puntaje</th><th>Estado</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </section>`;
    },

    htmlConstancia() {
        const d = this.datosDocumento();
        const tipo = d.pct >= 100 ? 'CONSTANCIA DE FINALIZACIÓN' : 'CONSTANCIA DE AVANCE';
        return `
            <div class="cert-container">
                <div class="cert-robots">${Robots.svg('ridds', 'celebrando', 64)}${Robots.svg('mech', 'celebrando', 64)}</div>
                <h1>${tipo}</h1>
                <p class="cert-org">Logística Pro · Maestría práctica en SAP para logística</p>
                <p class="cert-text">Se deja constancia de que</p>
                <h2 class="cert-name">${escaparHTML(d.nombre)}</h2>
                <p class="cert-role">${escaparHTML(d.rol)}</p>
                <p class="cert-text cert-body">
                    ha completado ${d.aprobados} de ${d.total} módulos de estudio sobre procesos de recepción, almacenamiento,
                    picking, despacho y control de bodega con <strong>SAP S/4HANA</strong>.
                </p>
                <div class="cert-score"><span>Avance</span><strong>${d.pct} %</strong></div>
                <div class="cert-footer">
                    <div><p class="cert-label">Fecha de expedición</p><p>${d.fecha}</p></div>
                    <div style="text-align:right;"><p class="cert-label">Tutores virtuales</p><p class="signature">MechaRidds y Mechanizer</p></div>
                </div>
                <p class="cert-disclaimer">Documento de estudio personal. No es una certificación oficial de SAP. Logística Pro no está afiliada ni respaldada por SAP SE.</p>
            </div>`;
    },

    botonesDocumento(tipo) {
        const textoGuardar = NativeBridge.esApp() ? 'Guardar o compartir' : 'Imprimir o guardar PDF';
        return `
            <div class="fila-botones no-print">
                <button class="btn btn-primario" type="button" onclick="UIRenderer.exportarDocumento('${tipo}')">${textoGuardar}</button>
                <button class="btn btn-secundario" type="button" onclick="Router.atras()">Volver al perfil</button>
            </div>
            ${NativeBridge.esApp() ? '<p class="doc-hint no-print">Se guarda como página web. Ábrela en el navegador del celular y usa "Imprimir → Guardar como PDF".</p>' : ''}`;
    },

    generateReport() {
        Router.irA('report', 'nav-profile');
        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: 'Kárdex académico', titulo: 'Reporte de avance', atras: 'Router.atras()' })}
                <div class="vista-cuerpo">${this.htmlReporte()}${this.botonesDocumento('reporte')}</div>
            </div>`);
    },

    generateCertificate() {
        Router.irA('certificate', 'nav-profile');
        this.mostrar(`
            <div class="vista">
                ${this.barraSup({ antetitulo: 'Documento', titulo: 'Constancia de avance', atras: 'Router.atras()' })}
                <div class="vista-cuerpo">${this.htmlConstancia()}${this.botonesDocumento('constancia')}</div>
            </div>`);
    },

    /** En el navegador imprime; en el APK guarda un archivo HTML autónomo y lo comparte. */
    async exportarDocumento(tipo) {
        if (!NativeBridge.esApp()) {
            window.print();
            return;
        }
        const cuerpo = tipo === 'constancia' ? this.htmlConstancia() : this.htmlReporte();
        let estilos = '';
        try {
            estilos = await (await fetch('css/components.css')).text();
        } catch (e) { /* sin estilos si falla */ }
        const titulo = tipo === 'constancia' ? 'Constancia de avance' : 'Reporte de avance';
        const documento = `<!DOCTYPE html><html lang="es" data-theme="light"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${titulo} - Logística Pro</title>
<style>${estilos} body{overflow:auto;padding:20px;background:#fff;}</style></head><body>${cuerpo}</body></html>`;
        const nombre = `LogisticaPro_${tipo === 'constancia' ? 'Constancia' : 'Reporte'}_${new Date().toISOString().split('T')[0]}.html`;
        await NativeBridge.guardarArchivo(nombre, documento, 'text/html');
    }
};

// ==========================================
// APUNTES (guardados dentro del estado único)
// ==========================================
class SmartNotesManager {
    constructor() {
        this.overlay = document.getElementById('notes-overlay');
        this.fondo = document.getElementById('notes-backdrop');
        this.closeBtn = document.getElementById('notes-close-btn');
        this.textarea = document.getElementById('notes-textarea');
        this.titleText = document.getElementById('notes-context-title');
        this.saveStatus = document.getElementById('notes-save-status');
        this.exportBtn = document.getElementById('notes-export-btn');

        this.currentLessonId = 'general';
        this.currentLessonTitle = 'Apuntes generales';
        this.saveTimeout = null;
        this.foco = null;
        this.init();
    }

    init() {
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeNotes());
        if (this.fondo) this.fondo.addEventListener('click', () => this.closeNotes());
        if (this.exportBtn) this.exportBtn.addEventListener('click', () => this.exportToTXT());
        if (this.textarea) {
            this.textarea.addEventListener('input', () => {
                clearTimeout(this.saveTimeout);
                if (this.saveStatus) this.saveStatus.classList.remove('visible');
                this.saveTimeout = setTimeout(() => this.saveNotes(), 800);
            });
        }
    }

    estaAbierto() {
        return !!this.overlay && !this.overlay.classList.contains('notes-hidden');
    }

    setContext(id, titulo) {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveNotes();
        }
        this.currentLessonId = id || 'general';
        this.currentLessonTitle = titulo || 'Apuntes generales';
        if (this.titleText) this.titleText.innerText = this.currentLessonTitle;
        this.loadNotes();
    }

    openNotes() {
        this.loadNotes();
        this.foco = document.activeElement;
        if (this.overlay) {
            this.overlay.classList.remove('notes-hidden');
            this.overlay.setAttribute('aria-hidden', 'false');
        }
        if (this.fondo) this.fondo.classList.add('visible');
        setTimeout(() => this.textarea && this.textarea.focus(), 250);
    }

    closeNotes() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveNotes();
        }
        if (this.overlay) {
            this.overlay.classList.add('notes-hidden');
            this.overlay.setAttribute('aria-hidden', 'true');
        }
        if (this.fondo) this.fondo.classList.remove('visible');
        if (this.textarea) this.textarea.blur();
        if (this.foco && this.foco.focus) this.foco.focus();
        if (Router.currentView === 'review') UIRenderer.renderRepaso();
    }

    saveNotes() {
        this.saveTimeout = null;
        if (!this.textarea) return;
        AppState.saveNote(this.currentLessonId, this.textarea.value);
        if (this.saveStatus) this.saveStatus.classList.add('visible');
    }

    loadNotes() {
        if (!this.textarea) return;
        this.textarea.value = AppState.getNote(this.currentLessonId);
        if (this.saveStatus) this.saveStatus.classList.remove('visible');
    }

    async exportToTXT() {
        if (!this.textarea) return;
        const contenido = this.textarea.value;
        if (!contenido.trim()) {
            UIRenderer.aviso('No hay apuntes para exportar todavía.', { animo: 'alertando', segundos: 3 });
            return;
        }
        const texto = `${this.currentLessonTitle}\n${'='.repeat(this.currentLessonTitle.length)}\n\n${contenido}\n`;
        await NativeBridge.guardarArchivo(`Apuntes_${this.currentLessonId}.txt`, texto, 'text/plain');
    }
}

const smartNotes = new SmartNotesManager();

// ==========================================
// TEMA, LETRA Y ROBOTS
// ==========================================
class VisualManager {
    constructor() {
        this.aplicarTema(AppState.ajustes.tema === 'light' ? 'light' : 'dark');
        this.aplicarLetra();
    }

    aplicarTema(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', tema === 'light' ? '#FFFFFF' : '#0A1F26');
    }

    toggleTheme() {
        const nuevo = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        this.aplicarTema(nuevo);
        AppState.setAjuste('tema', nuevo);
        if (Router.currentView === 'dashboard') UIRenderer.renderDashboard();
    }

    aplicarLetra() {
        document.documentElement.classList.toggle('letra-grande', AppState.ajustes.letra === 'grande');
    }

    toggleLetra() {
        AppState.setAjuste('letra', AppState.ajustes.letra === 'grande' ? 'normal' : 'grande');
        this.aplicarLetra();
    }

    toggleRobots(redibujar = true) {
        const visibles = !Robots.visibles();
        AppState.setAjuste('robots', visibles);
        if (redibujar && Router.currentView === 'dashboard') UIRenderer.renderDashboard();
        if (visibles) UIRenderer.aviso('¡Volvimos! Te acompañamos en lecciones y laboratorios.', { quien: 'mech', animo: 'celebrando', segundos: 3 });
        else UIRenderer.aviso('Robots ocultos. Puedes volver a mostrarlos cuando quieras.', { segundos: 3 });
    }

    // Compatibilidad con llamadas anteriores
    showMascot(mensaje, segundos = 4) {
        UIRenderer.aviso(mensaje, { segundos });
    }
}

const visualUI = new VisualManager();

window.addEventListener('DOMContentLoaded', () => {
    // Vibración al tocar controles principales
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.btn, .btn-icono, .opcion, .ciclo, .modulo:not([disabled]), .nav-btn')) {
            NativeBridge.vibrar(AppState.ajustes.nivelVibracion);
        }
    });
});
