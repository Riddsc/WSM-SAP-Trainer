/**
 * Logística Pro - Simulador de Terminal SAP S/4HANA / EWM (Multi-Paso)
 */
let currentSapItemId = null;
let currentSapStep = 0;

const SAPEngine = {
    open(itemId) {
        AudioEngine.play('click');
        const item = syllabusData.find(i => i.id === itemId);
        if (!item || !item.simSteps) return;
        
        currentSapItemId = itemId;
        currentSapStep = 0;
        this.renderStep();
    },

    renderStep() {
        const item = syllabusData.find(i => i.id === currentSapItemId);
        const step = item.simSteps[currentSapStep];
        const modalBody = document.getElementById('modal-content');
        
        modalBody.innerHTML = `
            <div class="sap-engine-ui">
                <div class="sap-topbar">
                    <div class="sap-dot"></div><div class="sap-dot"></div><div class="sap-dot"></div>
                    <span class="sap-title">S4HANA-PRD // PASO ${currentSapStep + 1} DE ${item.simSteps.length}</span>
                </div>
                <div class="sap-body">
                    <div class="sap-instruction">${step.instruction}</div>
                    <div class="sap-cmd-line">
                        <span class="sap-prompt">${step.prompt || '/N'}</span>
                        <input type="text" id="sap-input-code" class="sap-input" placeholder="${step.placeholder || 'T-CODE O VALOR'}" autocomplete="off" oninput="AudioEngine.play('key')">
                    </div>
                    <button class="sap-btn-execute" onclick="SAPEngine.execute()">EJECUTAR ACCIÓN (F8)</button>
                    <div id="sap-console-output" class="sap-console-log"></div>
                    
                    <!-- Pista nativa del simulador -->
                    <div style="margin-top: 20px; text-align: left;">
                        <button class="hint-btn" onclick="document.getElementById('sap-step-hint').style.display='block'" style="padding: 8px; font-size: 0.8rem;">💡 Pista del Paso</button>
                        <div id="sap-step-hint" class="hint-box" style="display:none; font-size: 0.8rem; margin-top: 8px;">${step.hint}</div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('global-overlay').classList.remove('hidden');
        setTimeout(() => {
            const input = document.getElementById('sap-input-code');
            if (input) input.focus();
        }, 300);
    },

    execute() {
        AudioEngine.play('click');
        const inputEl = document.getElementById('sap-input-code');
        const outputEl = document.getElementById('sap-console-output');
        const item = syllabusData.find(i => i.id === currentSapItemId);
        const step = item.simSteps[currentSapStep];

        if (!inputEl || !outputEl) return;
        const val = inputEl.value.toUpperCase().trim();
        
        outputEl.className = 'sap-console-log'; 
        outputEl.innerHTML = '';

        // Validación de comando o acción
        if (val === step.expectedCmd || val === `/N${step.expectedCmd}`) {
            AudioEngine.play('success');
            let text = step.successMessage;
            let i = 0;
            let typingInterval = setInterval(() => {
                if (i < text.length) {
                    outputEl.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                    if (i % 4 === 0) AudioEngine.play('key');
                    i++;
                } else {
                    clearInterval(typingInterval);
                    currentSapStep++;
                    
                    if (currentSapStep < item.simSteps.length) {
                        // Siguiente paso
                        setTimeout(() => { this.renderStep(); }, 2500);
                    } else {
                        // Laboratorio Completado
                        outputEl.innerHTML += `<br><br><span style="color:var(--success);">✅ LABORATORIO COMPLETADO CON ÉXITO. Sistema actualizado.</span>`;
                        AppState.markComplete(currentSapItemId);
                        setTimeout(() => { 
                            Router.closeModal(); 
                            Router.renderDashboard(); 
                        }, 4000);
                    }
                }
            }, 20);
        } else {
            AudioEngine.play('error');
            outputEl.classList.add('sap-error');
            outputEl.innerHTML = `> ER_INPUT_INVALID: El valor o T-Code '${val}' es incorrecto para el proceso actual.`;
        }
    }
};
