/**
 * Logística Pro - Motor UI (Paginación, Exámenes y Perfil)
 */
let currentLessonState = { id: null, page: 0, answers: [], score: 0 };

const UIRenderer = {
    renderDashboard() {
        const container = document.getElementById('view-container');
        let html = `<span class="tag-subtitle">Ruta de Especialización EWM</span><h2 class="main-title">Módulos Universitarios</h2>`;

        syllabusData.forEach((mod, idx) => {
            const isCompleted = AppState.isCompleted(mod.id);
            const isLocked = mod.req && !AppState.isCompleted(mod.req);
            let badgeClass = mod.type === 'lab' ? 'card-badge lab' : 'card-badge';
            
            html += `
                <div class="module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                     onclick="!${isLocked} && Router.openModule('${mod.id}')">
                    <div class="card-top">
                        <span class="${badgeClass}">Semestre ${mod.semester} • ${mod.type.toUpperCase()}</span>
                        <span>${isCompleted ? '✅' : (isLocked ? '🔒' : '▶️')}</span>
                    </div>
                    <h3>${idx + 1}. ${mod.title}</h3>
                </div>
            `;
        });
        container.innerHTML = html;
        container.scrollTop = 0;
    },

    // --- NUEVO: MOTOR DE PAGINACIÓN ---
    renderLesson(itemId, pageIndex = 0) {
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        currentLessonState.id = itemId;
        currentLessonState.page = pageIndex;

        if (mod.type === 'theory' && mod.pages) {
            const isLastPage = pageIndex === mod.pages.length - 1;
            const content = mod.pages[pageIndex];

            container.innerHTML = `
                <div class="lesson-content" style="animation: fadeIn 0.4s;">
                    <div class="page-indicator">Página ${pageIndex + 1} de ${mod.pages.length}</div>
                    <span class="tag-subtitle">Semestre ${mod.semester}</span>
                    <h2 style="margin-top: 10px;">${mod.title}</h2>
                    
                    ${content}

                    <div class="pagination-controls" style="margin-top: 40px; display:flex; gap:10px;">
                        ${pageIndex > 0 ? `<button class="btn btn-outline" onclick="UIRenderer.renderLesson('${itemId}', ${pageIndex - 1})">← Anterior</button>` : ''}
                        ${!isLastPage ? `<button class="btn btn-primary" onclick="AudioEngine.play('click'); UIRenderer.renderLesson('${itemId}', ${pageIndex + 1})">Siguiente →</button>` : ''}
                    </div>

                    ${isLastPage ? `
                        <div class="review-box" style="margin-top:30px;"><h4>🔄 Resumen</h4><p>${mod.review}</p></div>
                        <button class="btn btn-primary" style="margin-top: 20px;" onclick="UIRenderer.startExam('${itemId}')">📝 INICIAR EXAMEN DE CERTIFICACIÓN</button>
                    ` : ''}
                    <button class="btn btn-outline" style="margin-top: 20px;" onclick="Router.renderDashboard()">← Volver al Menú</button>
                </div>
            `;
        } else if (mod.type === 'lab') {
            // Render del lab (mantiene la estructura anterior)
            container.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding-top: 40px;">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Laboratorio</span>
                    <h2 style="border:none;">Práctica SAP S/4HANA</h2>
                    <p style="margin-bottom: 30px;">${mod.description}</p>
                    <div style="font-size: 4rem; margin-bottom: 20px;">💻</div>
                    <button class="btn btn-primary" onclick="SAPEngine.open('${mod.id}')">INICIAR TERMINAL</button>
                    <button class="btn btn-outline" style="margin-top: 40px;" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        }
        container.scrollTop = 0;
    },

    // --- NUEVO: MOTOR DE EXÁMENES ESTRICTOS (80% MINIMO) ---
    startExam(itemId) {
        AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        currentLessonState.answers = new Array(mod.exam.length).fill(null);
        
        let examHtml = `
            <div class="exam-header">
                <h2>Examen de Certificación</h2>
                <p>Para aprobar este módulo, debes responder correctamente al menos el 80% de las preguntas. El sistema evalúa tu capacidad analítica.</p>
            </div>
        `;

        mod.exam.forEach((q, qIndex) => {
            let optionsHtml = q.options.map((opt, oIndex) => `
                <div class="quiz-opt" id="q${qIndex}-o${oIndex}" onclick="UIRenderer.selectAnswer(${qIndex}, ${oIndex}, ${opt.correct})">
                    ${opt.text}
                </div>
            `).join('');

            examHtml += `
                <div class="quiz-container" style="margin-top: 20px;">
                    <div class="quiz-q">${qIndex + 1}. ${q.question}</div>
                    ${optionsHtml}
                </div>
            `;
        });

        examHtml += `
            <button class="btn btn-primary" style="margin-top:40px;" onclick="UIRenderer.submitExam('${itemId}')">ENTREGAR EXAMEN</button>
            <div id="exam-results" style="margin-top: 20px;"></div>
        `;

        container.innerHTML = examHtml;
        container.scrollTop = 0;
    },

    selectAnswer(qIndex, oIndex, isCorrect) {
        AudioEngine.play('click');
        // Visual update
        document.querySelectorAll(`[id^="q${qIndex}-o"]`).forEach(el => el.classList.remove('selected'));
        document.getElementById(`q${qIndex}-o${oIndex}`).classList.add('selected');
        // Save answer state
        currentLessonState.answers[qIndex] = isCorrect;
    },

    submitExam(itemId) {
        const mod = syllabusData.find(i => i.id === itemId);
        const resultsDiv = document.getElementById('exam-results');
        
        // Validar que todas estén respondidas
        if (currentLessonState.answers.includes(null)) {
            AudioEngine.play('error');
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--warning);"><h4>⚠️ Advertencia</h4><p>Debes responder todas las preguntas antes de entregar.</p></div>`;
            return;
        }

        const correctCount = currentLessonState.answers.filter(a => a === true).length;
        const score = Math.round((correctCount / mod.exam.length) * 100);
        
        if (score >= 80) {
            AudioEngine.play('success');
            AppState.markComplete(itemId);
            AppState.saveScore(itemId, score);
            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);">
                    <h4 style="color:var(--success);">✅ CERTIFICADO (Score: ${score}%)</h4>
                    <p>Has demostrado dominio técnico. El siguiente módulo ha sido desbloqueado.</p>
                </div>
                <button class="btn btn-outline" style="margin-top: 20px;" onclick="Router.renderDashboard()">Volver al Pensum</button>
            `;
        } else {
            AudioEngine.play('error');
            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--danger); background:rgba(239,68,68,0.1);">
                    <h4 style="color:var(--danger);">❌ REPROBADO (Score: ${score}%)</h4>
                    <p>No has alcanzado el 80% requerido. Debes volver a estudiar la teoría.</p>
                </div>
                <button class="btn btn-outline" style="margin-top: 20px;" onclick="UIRenderer.renderLesson('${itemId}', 0)">Repasar Teoría</button>
            `;
        }
    },

    // --- NUEVO: PANTALLA DE PERFIL Y BACKUPS ---
    renderProfile() {
        const container = document.getElementById('view-container');
        const pct = AppState.getProgressPercentage();
        
        container.innerHTML = `
            <span class="tag-subtitle">Administración de Cuenta</span>
            <h2 class="main-title">Mi Perfil Estudiantil</h2>
            
            <div class="review-box">
                <h4>Progreso Total Académico</h4>
                <p>Has completado el <strong>${pct}%</strong> de la Maestría WMS.</p>
            </div>

            <div class="module-card" style="margin-top:30px;">
                <h3>💾 Crear Copia de Seguridad</h3>
                <p>Exporta tu progreso, exámenes aprobados y apuntes personales. Si cambias de teléfono, podrás restaurar este archivo.</p>
                <button class="btn btn-primary" onclick="AppState.exportBackup()">Descargar Backup (.json)</button>
            </div>

            <div class="module-card" style="margin-top:20px;">
                <h3>📥 Restaurar Copia de Seguridad</h3>
                <p>Carga un archivo .json de Logística Pro para recuperar tu cuenta.</p>
                <input type="file" id="backup-file" accept=".json" style="display:none;" onchange="AppState.importBackup(event)">
                <button class="btn btn-outline" onclick="document.getElementById('backup-file').click()">Seleccionar Archivo</button>
            </div>
        `;
        container.scrollTop = 0;
    },
    
    renderGlossary() { /* ... igual que siempre ... */ }
};
