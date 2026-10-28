/**
 * Logística Pro - Motor UI (Paginación, Exámenes, Perfil, Alarmas y Glosario)
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

        // Prevención de error por si syllabusData no ha cargado aún
        if (typeof syllabusData === 'undefined') {
            container.innerHTML = `<h2 class="main-title">Cargando base de datos...</h2>`;
            return;
        }

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

        if (typeof smartNotes !== 'undefined') {
            smartNotes.setContext(itemId, mod.title);
        }

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
                        ${pageIndex > 0 ? `<button class="btn btn-outline" onclick="UIRenderer.renderLesson('${itemId}',${pageIndex - 1})">← Anterior</button>` : ''}
                        ${!isLastPage ? `<button class="btn btn-primary" onclick="if(typeof AudioEngine !== 'undefined') AudioEngine.play('click'); UIRenderer.renderLesson('${itemId}',${pageIndex + 1})">Siguiente →</button>` : ''}
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
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        
        currentLessonState.activeExam = shuffleArray(mod.exam);
        currentLessonState.answers = new Array(currentLessonState.activeExam.length).fill(null);
        
        let examHtml = `
            <div class="exam-header">
                <h2 style="color:var(--text-primary); border:none; padding:0; margin-bottom:10px;">Examen de Certificación</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">Debe aprobar con un 80% mínimo. Las preguntas han sido aleatorizadas para garantizar la integridad técnica.</p>
            </div>
        `;

        currentLessonState
