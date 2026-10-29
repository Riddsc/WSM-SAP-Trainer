/**
 * Logística Pro - Simulador de terminal SAP.
 * Cada laboratorio es una sesión con sus propios temporizadores. Al cerrar
 * la terminal se cancelan todos, así nada sigue corriendo por detrás ni
 * afecta otra pantalla u otro laboratorio.
 */
const MAX_STRIKES = 3;

const SAPEngine = {
    modulo: null,
    paso: 0,
    errores: 0,
    sesion: 0,          // cambia en cada apertura; invalida temporizadores viejos
    temporizadores: [],
    escribiendo: null,

    init() {
        const input = document.getElementById('terminal-input');
        const cerrar = document.getElementById('terminal-close-btn');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.execute();
                }
            });
        }
        const ejecutar = document.getElementById('terminal-exec-btn');
        if (ejecutar) ejecutar.addEventListener('click', () => this.execute());
        if (cerrar) cerrar.addEventListener('click', () => this.closeTerminal());
    },

    estaAbierta() {
        const overlay = document.getElementById('sap-terminal-overlay');
        return !!overlay && !overlay.classList.contains('terminal-hidden');
    },

    /** Programa una acción que solo ocurre si la sesión sigue siendo la misma. */
    despues(ms, accion) {
        const sesion = this.sesion;
        const id = setTimeout(() => {
            if (sesion === this.sesion) accion();
        }, ms);
        this.temporizadores.push(id);
    },

    cancelarTodo() {
        this.temporizadores.forEach(clearTimeout);
        this.temporizadores = [];
        if (this.escribiendo) clearInterval(this.escribiendo);
        this.escribiendo = null;
    },

    async open(id) {
        AudioEngine.play('click');
        let modulo;
        try {
            modulo = await ContentStore.cargar(id);
        } catch (e) {
            alert('No se pudo cargar el laboratorio. Intenta de nuevo.');
            return;
        }
        if (!modulo.pasos || modulo.pasos.length === 0) return;

        this.cancelarTodo();
        this.sesion++;
        this.modulo = modulo;
        this.paso = 0;
        this.errores = 0;

        const historial = document.getElementById('terminal-history');
        if (historial) {
            historial.innerHTML = `
                <div class="log-system">SAP S/4HANA · Simulador de práctica de Logística Pro</div>
                <div class="log-system">--- SESIÓN: ${escaparHTML(modulo.titulo.toUpperCase())} ---</div>
                <div class="log-hint">CASO DE NEGOCIO: ${escaparHTML(modulo.descripcion)}</div>
                <div class="log-system">--------------------------------------------------</div>
            `;
        }
        document.getElementById('sap-terminal-overlay').classList.remove('terminal-hidden');
        this.renderStep();
    },

    closeTerminal() {
        this.cancelarTodo();
        this.sesion++;
        document.getElementById('sap-terminal-overlay').classList.add('terminal-hidden');
        const input = document.getElementById('terminal-input');
        if (input) {
            input.value = '';
            input.blur();
        }
    },

    renderStep() {
        const paso = this.modulo.pasos[this.paso];
        const instruccion = document.getElementById('terminal-current-instruction');
        const input = document.getElementById('terminal-input');
        if (instruccion) {
            instruccion.innerText = `PASO ${this.paso + 1}/${this.modulo.pasos.length}: ${paso.instruccion}`;
        }
        if (input) {
            input.placeholder = paso.placeholder || 'T-CODE O VALOR';
            input.disabled = false;
            this.despues(300, () => input.focus());
        }
    },

    /** Agrega una línea a la terminal. El texto se escapa siempre. */
    printLog(mensaje, tipo) {
        const historial = document.getElementById('terminal-history');
        if (!historial) return;
        const linea = document.createElement('div');
        linea.className = `log-${tipo}`;
        String(mensaje).split('\n').forEach((parte, i) => {
            if (i > 0) linea.appendChild(document.createElement('br'));
            linea.appendChild(document.createTextNode(parte));
        });
        historial.appendChild(linea);
        this.bajarScroll();
    },

    bajarScroll() {
        const cuerpo = document.getElementById('terminal-body');
        if (cuerpo) cuerpo.scrollTop = cuerpo.scrollHeight;
    },

    execute() {
        if (!this.modulo || !this.estaAbierta()) return;
        const input = document.getElementById('terminal-input');
        if (!input || input.disabled) return;

        const paso = this.modulo.pasos[this.paso];
        const valor = input.value.toUpperCase().trim();
        if (valor === '') return;

        this.printLog(`EWM_PRD:/> ${valor}`, 'user');
        input.value = '';
        AudioEngine.play('click');

        const esperado = String(paso.comando).toUpperCase();
        if (valor === esperado || valor === `/N${esperado}`) {
            this.acierto(paso, input);
        } else {
            this.fallo(paso, valor, input);
        }
    },

    acierto(paso, input) {
        AudioEngine.play('success');
        NativeBridge.vibrar('LIGHT');
        this.errores = 0;
        input.disabled = true;

        // Efecto de máquina de escribir
        const texto = paso.exito || 'Paso completado.';
        const linea = document.createElement('div');
        linea.className = 'log-success';
        document.getElementById('terminal-history').appendChild(linea);
        let i = 0;
        const sesion = this.sesion;
        this.escribiendo = setInterval(() => {
            if (sesion !== this.sesion) return;
            if (i < texto.length) {
                const letra = texto.charAt(i);
                if (letra === '\n') linea.appendChild(document.createElement('br'));
                else linea.appendChild(document.createTextNode(letra));
                if (i % 4 === 0) AudioEngine.play('key');
                this.bajarScroll();
                i++;
                return;
            }
            clearInterval(this.escribiendo);
            this.escribiendo = null;
            this.paso++;
            if (this.paso < this.modulo.pasos.length) {
                this.despues(1200, () => this.renderStep());
            } else {
                this.terminarLaboratorio();
            }
        }, 20);
    },

    terminarLaboratorio() {
        const id = this.modulo.id;
        this.printLog('\n✅ LABORATORIO COMPLETADO CON ÉXITO.', 'success');
        NativeBridge.vibrarAviso('SUCCESS');
        AppState.markComplete(id);
        this.despues(2500, () => {
            this.closeTerminal();
            // Solo vuelve al inicio si el estudiante sigue en ese laboratorio
            if (Router.currentView === 'lesson' && UIRenderer.moduloActual === id) Router.renderDashboard();
        });
    },

    fallo(paso, valor, input) {
        AudioEngine.play('error');
        NativeBridge.vibrarAviso('ERROR');
        this.errores++;

        if (this.errores >= MAX_STRIKES) {
            this.printLog(`> ERROR: ${this.errores} intentos fallidos.\n> La sesión se cerrará. Repasa la teoría y vuelve a intentarlo.`, 'error');
            input.disabled = true;
            this.despues(3500, () => {
                this.closeTerminal();
                alert('Se cerró el laboratorio por demasiados errores. Repasa la teoría y vuelve a intentarlo desde el inicio.');
            });
            return;
        }

        const restantes = MAX_STRIKES - this.errores;
        this.printLog(`> El valor '${valor}' no es correcto. Te quedan ${restantes} intento(s).`, 'error');
        // Pistas progresivas: primero una orientación, luego la pista completa
        this.despues(500, () => {
            if (this.errores === 1) {
                this.printLog(`PISTA: relee la instrucción. ${this.orientacion(paso)}`, 'hint');
            } else {
                this.printLog(`PISTA: ${paso.pista}`, 'hint');
            }
        });
    },

    /** Primera pista: orienta sin dar la respuesta. */
    orientacion(paso) {
        const cmd = String(paso.comando);
        if (cmd.startsWith('/')) return 'Se espera una transacción con espacio de nombres (empieza por /).';
        if (/^\d+$/.test(cmd)) return `Se espera un número de ${cmd.length} dígitos.`;
        if (/^[A-Z]{2,4}\d{1,3}[A-Z]?$/i.test(cmd)) return 'Se espera un código de transacción (letras y números).';
        return `La respuesta tiene ${cmd.length} caracteres.`;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    SAPEngine.init();
});
