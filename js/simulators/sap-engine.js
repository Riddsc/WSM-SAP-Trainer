/**
 * Logística Pro - Simulador de Terminal SAP S/4HANA / EWM
 */
const SAPEngine = {
    open(itemId) {
        AudioEngine.play('click');
        const item = syllabusData.find(i => i.id === itemId);
        if (!item || !item.simTask) return;

        const modalBody = document.getElementById('modal-content');
        modalBody.innerHTML = `
            <div class="sap-engine-ui">
                <div class="sap-topbar">
                    <div class="sap-dot"></div><div class="sap-dot"></div><div class="sap-dot"></div>
                    <span class="sap-title">S4HANA-PRD://CORE-SYSTEM</span>
                </div>
                <div class="sap-body">
                    <div class="sap-instruction">${item.simTask.instruction}</div>
                    <div class="sap-cmd-line">
                        <span class="sap-prompt">/N</span>
                        <input type="text" id="sap-input-code" class="sap-input" placeholder="T-CODE" autocomplete="off" oninput="AudioEngine.play('key')">
                    </div>
                    <button class="sap-btn-execute" onclick="SAPEngine.execute('${itemId}')">EJECUTAR TRANSACCIÓN (F8)</button>
                    <div id="sap-console-output" class="sap-console-log"></div>
                </div>
            </div>
        `;
        document.getElementById('global-overlay').classList.remove('hidden');
        setTimeout(() => {
            const input = document.getElementById('sap-input-code');
            if (input) input.focus();
        }, 300);
    },

    execute(itemId) {
        AudioEngine.play('click');
        const inputEl = document.getElementById('sap-input-code');
        const outputEl = document.getElementById('sap-console-output');
        const item = syllabusData.find(i => i.id === itemId);

        if (!inputEl || !outputEl) return;
        const val = inputEl.value.toUpperCase().trim();
        outputEl.className = 'sap-console-log'; outputEl.innerHTML = '';

        if (val === item.simTask.expectedCmd || val === `/N${item.simTask.expectedCmd}`) {
            AudioEngine.play('success');
            let text = item.simTask.successMessage;
            let i = 0;
            let typingInterval = setInterval(() => {
                if (i < text.length) {
                    outputEl.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                    if (i % 4 === 0) AudioEngine.play('key');
                    i++;
                } else {
                    clearInterval(typingInterval);
                    AppState.markComplete(itemId);
                    setTimeout(() => { Router.closeModal(); Router.renderDashboard(); }, 3500);
                }
            }, 25);
        } else {
            AudioEngine.play('error');
            outputEl.classList.add('sap-error');
            outputEl.innerHTML = `> ER_TRANS_NOT_FOUND: La transacción '${val}' no existe o el rol actual no tiene autorización.`;
        }
    }
};
