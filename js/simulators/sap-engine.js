/**
 * Logística Pro - Simulador de Terminal SAP S/4HANA / EWM
 * Nivel: Estricto. Incluye sistema de bloqueos de seguridad (3 Strikes).
 * Visual: Interfaz Retro Hacker (Glassmorphism) + Capacitor Haptics.
 */
let currentSapItemId = null;
let currentSapStep = 0;
let currentStrikes = 0; 

const MAX_STRIKES = 3;

const SAPEngine = {
    // 1. Inicializa los eventos del nuevo HTML (Enter y Botón Cerrar)
    init() {
        const inputEl = document.getElementById('terminal-input');
        const closeBtn = document.getElementById('terminal-close-btn');

        if (inputEl) {
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.execute();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeTerminal();
            });
        }
    },

    open(itemId) {
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');
        const item = syllabusData.find(i => i.id === itemId);
        if (!item || !item.simSteps) return;
        
        currentSapItemId = itemId;
        currentSapStep = 0;
        currentStrikes = 0; 
        
        // Limpiamos el historial visual de la nueva terminal e inyectamos el contexto
        const historyContainer = document.getElementById('terminal-history');
        if (historyContainer) {
            historyContainer.innerHTML = `
                <div class="log-system">SAP EWM Kernel 7.89 - Terminal Emulator Inicializado.</div>
                <div class="log-system">--- INICIANDO SESIÓN: ${item.title.toUpperCase()} ---</div>
                <div class="log-hint">CASO DE NEGOCIO: ${item.description}</div>
                <div class="log-system">--------------------------------------------------</div>
            `;
        }

        // Mostramos el nuevo overlay (reemplaza a tu antiguo global-overlay)
        document.getElementById('sap-terminal-overlay').classList.remove('terminal-hidden');
        this.renderStep();
    },

    closeTerminal() {
        document.getElementById('sap-terminal-overlay').classList.add('terminal-hidden');
        const inputEl = document.getElementById('terminal-input');
        if (inputEl) {
            inputEl.value = '';
            inputEl.blur(); // Oculta el teclado
        }
    },

    renderStep() {
        const item = syllabusData.find(i => i.id === currentSapItemId);
        const step = item.simSteps[currentSapStep];
        
        // Actualizamos el panel de instrucciones de la nueva UI
        const instructionText = document.getElementById('terminal-current-instruction');
        const inputEl = document.getElementById('terminal-input');
        
        if (instructionText) {
            instructionText.innerText = `PASO ${currentSapStep + 1}/${item.simSteps.length}: ${step.instruction}`;
        }
        
        if (inputEl) {
            inputEl.placeholder = step.placeholder || 'T-CODE O VALOR';
            inputEl.disabled = false;
            setTimeout(() => inputEl.focus(), 300);
        }
    },

    printLog(message, type) {
        const historyContainer = document.getElementById('terminal-history');
        const bodyContainer = document.getElementById('terminal-body');
        if (!historyContainer) return;

        const div = document.createElement('div');
        div.className = `log-${type}`;
        div.innerHTML = message; // Usamos innerHTML para soportar los <br> de tus mensajes de error
        historyContainer.appendChild(div);

        // Auto-scroll hacia abajo
        if (bodyContainer) {
            bodyContainer.scrollTop = bodyContainer.scrollHeight;
        }
    },

    triggerHaptic(type) {
        if (window.Capacitor && window.Capacitor.Plugins.Haptics) {
            const Haptics = window.Capacitor.Plugins.Haptics;
            try {
                if (type === 'success') Haptics.impact({ style: 'Light' });
                else if (type === 'error') Haptics.notification({ type: 'ERROR' });
                else if (type === 'heavy') Haptics.impact({ style: 'Heavy' });
            } catch (e) { console.warn("Haptics no soportado."); }
        }
    },

    execute() {
        const inputEl = document.getElementById('terminal-input');
        const item = syllabusData.find(i => i.id === currentSapItemId);
        const step = item.simSteps[currentSapStep];

        if (!inputEl || !item) return;

        const val = inputEl.value.toUpperCase().trim();
        if (val === '') return;

        // Imprimir lo que el usuario digitó
        this.printLog(`EWM_PRD:/> ${val}`, 'user');
        inputEl.value = ''; 
        
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');

        if (val === step.expectedCmd.toUpperCase() || val === `/N${step.expectedCmd.toUpperCase()}`) {
            // ==========================================
            // ACIERTO (Usando tu lógica original)
            // ==========================================
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('success');
            this.triggerHaptic('success');
            currentStrikes = 0; 
            
            inputEl.disabled = true; 

            // Tu efecto de máquina de escribir adaptado al nuevo DOM
            let text = step.successMessage;
            let i = 0;
            let typingLog = document.createElement('div');
            typingLog.className = 'log-success';
            document.getElementById('terminal-history').appendChild(typingLog);

            let typingInterval = setInterval(() => {
                if (i < text.length) {
                    typingLog.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                    if (i % 4 === 0 && typeof AudioEngine !== 'undefined') AudioEngine.play('key');
                    document.getElementById('terminal-body').scrollTop = document.getElementById('terminal-body').scrollHeight;
                    i++;
                } else {
                    clearInterval(typingInterval);
                    currentSapStep++;
                    
                    if (currentSapStep < item.simSteps.length) {
                        setTimeout(() => { this.renderStep(); }, 1500); // Pausa corta antes del siguiente paso
                    } else {
                        // Fin del laboratorio
                        this.printLog("<br><br>✅ LABORATORIO COMPLETADO CON ÉXITO. Sistema actualizado.", 'success');
                        this.triggerHaptic('heavy');
                        
                        if (typeof AppState !== 'undefined') AppState.markComplete(currentSapItemId);
                        
                        setTimeout(() => { 
                            this.closeTerminal(); 
                            if (typeof Router !== 'undefined') Router.renderDashboard(); 
                        }, 3000);
                    }
                }
            }, 20);
            
        } else {
            // ==========================================
            // FALLO / STRIKE SYSTEM (Usando tu lógica original)
            // ==========================================
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('error');
            this.triggerHaptic('error');
            currentStrikes++;
            
            if (currentStrikes >= MAX_STRIKES) {
                // FATAL ERROR: Expulsión
                this.printLog(`> FATAL ERROR: Se han detectado ${currentStrikes} intentos fallidos.<br>> Violación de protocolo operativo.<br>> CERRANDO CONEXIÓN DEL TERMINAL...`, 'error');
                
                inputEl.disabled = true;
                
                setTimeout(() => {
                    this.closeTerminal();
                    alert("Has sido expulsado de la terminal SAP por demasiados errores. Repasa la teoría y vuelve a intentar el laboratorio desde cero.");
                }, 4000);
            } else {
                // Advertencia regular
                const intentosRestantes = MAX_STRIKES - currentStrikes;
                this.printLog(`> ER_INPUT_INVALID: El valor '${val}' es incorrecto.<br>> ADVERTENCIA: ${intentosRestantes} intento(s) restante(s) antes del bloqueo.`, 'error');
                
                // Mostrar la pista después de un error
                setTimeout(() => {
                    this.printLog(`PISTA DEL SISTEMA: Se esperaba [ ${step.hint} ]`, 'hint');
                }, 600);
            }
        }
    }
};

// Autoinicializar el event listener del teclado cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    SAPEngine.init();
});
