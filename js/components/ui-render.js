/**
 * Logística Pro - Motor UI (Paginación, Exámenes Anti-Trampas, Perfil y Glosario)
 */
let currentLessonState = { id: null, page: 0, answers: [], score: 0, activeExam: [] };

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const UIRenderer = {
    renderDashboard() {
        const container = document.getElementById('view-container');
        if (!container) return;

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
                    <h2 style="margin-top: 10px; border:none; padding:0;">${mod.title}</h2>
                    
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
            container.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding-top: 40px;">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Laboratorio</span>
                    <h2 style="border:none; padding:0;">Práctica SAP S/4HANA</h2>
                    <p style="margin-bottom: 30px;">${mod.description}</p>
                    <div style="font-size: 4rem; margin-bottom: 20px;">💻</div>
                    <button class="btn btn-primary" onclick="SAPEngine.open('${mod.id}')">INICIAR TERMINAL</button>
                    <button class="btn btn-outline" style="margin-top: 40px;" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        }
        container.scrollTop = 0;
    },

    startExam(itemId) {
        AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        
        currentLessonState.activeExam = shuffleArray(mod.exam);
        currentLessonState.answers = new Array(currentLessonState.activeExam.length).fill(null);
        
        let examHtml = `
            <div class="exam-header">
                <h2 style="color:var(--text-primary); border:none; padding:0; margin-bottom:10px;">Examen de Certificación</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">Debe aprobar con un 80% mínimo. Las preguntas y opciones han sido aleatorizadas para garantizar la integridad técnica.</p>
            </div>
        `;

        currentLessonState.activeExam.forEach((q, qIndex) => {
            const shuffledOptions = shuffleArray(q.options);
            
            let optionsHtml = shuffledOptions.map((opt, oIndex) => `
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
            <button class="btn btn-outline" style="margin-top: 20px;" onclick="Router.renderDashboard()">← Abortar Examen</button>
        `;

        container.innerHTML = examHtml;
        container.scrollTop = 0;
    },

    selectAnswer(qIndex, oIndex, isCorrect) {
        AudioEngine.play('click');
        document.querySelectorAll(`[id^="q${qIndex}-o"]`).forEach(el => el.classList.remove('selected'));
        document.getElementById(`q${qIndex}-o${oIndex}`).classList.add('selected');
        currentLessonState.answers[qIndex] = isCorrect;
    },

    submitExam(itemId) {
        const resultsDiv = document.getElementById('exam-results');
        
        if (currentLessonState.answers.includes(null)) {
            AudioEngine.play('error');
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--warning);"><h4>⚠️ Advertencia</h4><p>Debes responder todas las preguntas antes de entregar.</p></div>`;
            return;
        }

        const totalQuestions = currentLessonState.activeExam.length;
        const correctCount = currentLessonState.answers.filter(a => a === true).length;
        const score = Math.round((correctCount / totalQuestions) * 100);
        
        if (score >= 80) {
            AudioEngine.play('success');
            AppState.markComplete(itemId);
            AppState.saveScore(itemId, score);
            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);">
                    <h4 style="color:var(--success);">✅ CERTIFICADO (Score: ${score}%)</h4>
                    <p>Dominio técnico verificado. Módulo desbloqueado.</p>
                </div>
                <button class="btn btn-outline" style="margin-top: 20px;" onclick="Router.renderDashboard()">Volver al Pensum</button>
            `;
        } else {
            AudioEngine.play('error');
            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--danger); background:rgba(239,68,68,0.1);">
                    <h4 style="color:var(--danger);">❌ REPROBADO (Score: ${score}%)</h4>
                    <p>No has alcanzado el 80%. Las preguntas se barajarán en tu próximo intento.</p>
                </div>
                <button class="btn btn-outline" style="margin-top: 20px;" onclick="UIRenderer.renderLesson('${itemId}', 0)">Repasar Teoría</button>
            `;
        }
    },

    renderProfile() {
        const container = document.getElementById('view-container');
        if (!container) return;

        // Validamos que el progreso sea un número seguro
        let pct = 0;
        try { pct = AppState.getProgressPercentage(); } catch (e) { pct = 0; }

        container.innerHTML = `
            <span class="tag-subtitle">Administración de Cuenta</span>
            <h2 class="main-title">Mi Perfil Estudiantil</h2>
            
            <div class="review-box">
                <h4>Progreso Total Académico</h4>
                <p>Has completado el <strong>${pct}%</strong> de la Maestría WMS.</p>
            </div>

            <div class="module-card" style="margin-top:30px; cursor:default;">
                <h3 style="color:var(--cyan);">💾 Crear Copia de Seguridad</h3>
                <p>Exporta tu progreso, puntajes y apuntes. Si cambias de teléfono, podrás restaurar este archivo.</p>
                <button class="btn btn-primary" onclick="AppState.exportBackup()">Descargar Backup (.json)</button>
            </div>

            <div class="module-card" style="margin-top:20px; cursor:default;">
                <h3 style="color:var(--warning);">📥 Restaurar Copia</h3>
                <p>Carga un archivo .json de Logística Pro para recuperar tu cuenta. (Sobrescribirá el progreso actual).</p>
                <input type="file" id="backup-file" accept=".json" style="display:none;" onchange="AppState.importBackup(event)">
                <button class="btn btn-outline" onclick="document.getElementById('backup-file').click()">Seleccionar Archivo</button>
            </div>
        `;
        container.scrollTop = 0;
    },
    
    renderGlossary() {
        const container = document.getElementById('view-container');
        if (!container) return;

        container.innerHTML = `
            <span class="tag-subtitle">Glosario Corporativo</span>
            <h2 class="main-title">Transacciones Clave</h2>
            <div class="module-card"><div class="card-top"><span class="card-badge">MM / IM</span></div><h3>MIGO</h3><p>Movimiento general de mercancías (Entradas, salidas, traslados).</p></div>
            <div class="module-card"><div class="card-top"><span class="card-badge">WM / EWM</span></div><h3>LT01</h3><p>Creación manual de Orden de Transporte interna en el almacén.</p></div>
            <div class="module-card"><div class="card-top"><span class="card-badge">CUSTOMIZING</span></div><h3>OX09</h3><p>Mantenimiento y creación de Storage Locations vinculados al Plant.</p></div>
        `;
        container.scrollTop = 0;
    }
};
