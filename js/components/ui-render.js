/**
 * Logística Pro - Renderizador Dinámico de Interfaces (UI)
 */
const UIRenderer = {
    renderDashboard() {
        const container = document.getElementById('view-container');
        if (!container) return;

        let html = `<span class="tag-subtitle">Pensum de Maestría (Ruta EWM)</span><h2 class="main-title">Módulos Académicos</h2>`;

        syllabusData.forEach((mod, index) => {
            const isCompleted = AppState.isCompleted(mod.id);
            const isLocked = mod.req && !AppState.isCompleted(mod.req);
            let badgeClass = mod.type === 'lab' ? 'card-badge lab' : 'card-badge';
            let badgeText = mod.type === 'lab' ? 'Terminal SAP' : 'Teoría Core';

            html += `
                <div class="module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                     onclick="!${isLocked} && Router.openModule('${mod.id}')">
                    <div class="card-top">
                        <span class="${badgeClass}">Semestre ${mod.semester} • ${badgeText}</span>
                        <span>${isCompleted ? '✅' : (isLocked ? '🔒' : '▶️')}</span>
                    </div>
                    <h3>${index + 1}. ${mod.title}</h3>
                    <p style="margin-top:4px; font-weight:600; color:var(--cyan); font-size:0.75rem;">⏱ ${mod.duration}</p>
                </div>
            `;
        });
        container.innerHTML = html;
        container.scrollTop = 0;
    },

    renderLesson(itemId) {
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        if (!mod || !container) return;

        // Extraer Nota guardada
        const savedNote = AppState.getNote(itemId);

        if (mod.type === 'theory') {
            let optionsHtml = mod.quiz.options.map((opt, i) => `
                <button class="quiz-opt" id="opt-${itemId}-${i}" onclick="UIRenderer.handleQuiz('${itemId}', ${i}, ${opt.correct})">
                    ${opt.text}
                </button>
            `).join('');

            container.innerHTML = `
                <div class="lesson-content">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Módulo Teórico</span>
                    ${mod.content}

                    <!-- REPASO -->
                    <div class="review-box">
                        <h4>🔄 Repaso Ejecutivo</h4>
                        <p>${mod.review}</p>
                    </div>

                    <!-- EVALUACIÓN Y PISTAS -->
                    <div class="quiz-container">
                        <div class="quiz-q">📝 Evaluación de Control</div>
                        <p style="margin-bottom: 16px; font-weight: 600;">${mod.quiz.question}</p>
                        ${optionsHtml}
                        <div id="feedback-${itemId}" class="quiz-feedback"></div>
                        
                        <button class="hint-btn" onclick="UIRenderer.showHint('${itemId}')">💡 Solicitar Pista Operativa</button>
                        <div id="hint-${itemId}" class="hint-box">${mod.quiz.hint}</div>
                    </div>

                    <!-- NOTAS PERSONALES -->
                    <div class="notes-section">
                        <h4>📝 Mis Notas (Se guardan automáticamente)</h4>
                        <textarea class="premium-textarea" placeholder="Escribe aquí tus apuntes sobre este módulo..." 
                                  onblur="AppState.saveNote('${itemId}', this.value)">${savedNote}</textarea>
                    </div>

                    <button class="btn btn-outline" style="margin-top: 40px;" onclick="Router.renderDashboard()">← Guardar y Volver</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding-top: 40px;">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Práctica de Sistemas</span>
                    <h2 style="border:none; text-align:center; padding:0; margin-bottom: 8px;">Laboratorio SAP S/4HANA</h2>
                    <p style="margin-bottom: 30px; font-size: 1.1rem;">${mod.description}</p>
                    <div style="font-size: 4rem; margin-bottom: 20px;">💻</div>

                    <button class="btn btn-primary" onclick="SAPEngine.open('${mod.id}')">INICIAR TERMINAL SAP</button>
                    
                    <button class="hint-btn" onclick="UIRenderer.showHint('${itemId}')" style="margin-top: 24px;">💡 Ver Pista del Comando</button>
                    <div id="hint-${itemId}" class="hint-box" style="text-align:left;">${mod.simTask.hint}</div>

                    <div class="notes-section" style="text-align:left;">
                        <h4>📝 Notas del Laboratorio</h4>
                        <textarea class="premium-textarea" placeholder="Anota los T-Codes o errores aquí..." 
                                  onblur="AppState.saveNote('${itemId}', this.value)">${savedNote}</textarea>
                    </div>
                    <button class="btn btn-outline" style="margin-top: 40px;" onclick="Router.renderDashboard()">← Guardar y Volver</button>
                </div>
            `;
        }
        container.scrollTop = 0;
    },

    showHint(itemId) {
        AudioEngine.play('click');
        const hintBox = document.getElementById(`hint-${itemId}`);
        if (hintBox) {
            hintBox.style.display = hintBox.style.display === 'block' ? 'none' : 'block';
        }
    },

    handleQuiz(itemId, optIndex, isCorrect) {
        AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const feedback = document.getElementById(`feedback-${itemId}`);
        
        document.querySelectorAll(`[id^="opt-${itemId}-"]`).forEach(b => b.style.pointerEvents = 'none');
        const selectedBtn = document.getElementById(`opt-${itemId}-${optIndex}`);
        feedback.style.display = 'block';

        if (isCorrect) {
            AudioEngine.play('success');
            selectedBtn.classList.add('correct');
            feedback.style.background = 'rgba(16,185,129,0.1)'; feedback.style.color = 'var(--success)'; feedback.style.border = '1px solid var(--success)';
            feedback.innerHTML = `✔️ <strong>¡Aprobado!</strong> ${mod.quiz.explanation}`;
            AppState.markComplete(itemId);
            setTimeout(() => Router.renderDashboard(), 4000); // Más tiempo para leer la explicación
        } else {
            AudioEngine.play('error');
            selectedBtn.classList.add('wrong');
            feedback.style.background = 'rgba(239,68,68,0.1)'; feedback.style.color = 'var(--danger)'; feedback.style.border = '1px solid var(--danger)';
            feedback.innerHTML = `❌ <strong>Error Analítico.</strong> Bloqueo de sistema. Repasa e intenta de nuevo.`;
            setTimeout(() => Router.openModule(itemId), 2500);
        }
    },
    renderGlossary() { /* ... igual que la v1, no lo tocaremos hoy ... */ }
};
