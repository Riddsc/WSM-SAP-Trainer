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

        // Actualizamos el contexto de los apuntes automáticamente
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
            
            // ¡Hacemos que la mascota felicite al usuario!
            if (typeof visualUI !== 'undefined') {
                visualUI.showMascot(`¡Excelente trabajo! Aprobaste con un ${score}%. ¡Sigue así!`, 5);
            }

            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);">
                    <h4 style="color:var(--success);">✅ CERTIFICADO (Score: ${score}%)</h4>
                    <p>Dominio técnico verificado. Módulo desbloqueado.</p>
                </div>
                <button class="btn btn-outline" style="margin-top: 20px;" onclick="Router.renderDashboard()">Volver al Pensum</button>
            `;
        } else {
            AudioEngine.play('error');
            
            // La mascota da ánimo si reprueba
            if (typeof visualUI !== 'undefined') {
                visualUI.showMascot(`Obtuviste un ${score}%. ¡No te rindas, repasa y vuelve a intentarlo!`, 5);
            }

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

/**
 * ==========================================
 * GESTOR DE APUNTES CONTEXTUALES (SMART NOTES)
 * ==========================================
 */
class SmartNotesManager {
    constructor() {
        this.fab = document.getElementById('fab-notes');
        this.overlay = document.getElementById('notes-overlay');
        this.closeBtn = document.getElementById('notes-close-btn');
        this.textarea = document.getElementById('notes-textarea');
        this.titleText = document.getElementById('notes-context-title');
        this.saveStatus = document.getElementById('notes-save-status');
        this.exportBtn = document.getElementById('notes-export-btn');

        this.currentLessonId = 'general';
        this.currentLessonTitle = 'Apuntes Generales';
        this.saveTimeout = null;

        this.init();
    }

    init() {
        if (!this.fab) return; 

        this.fab.addEventListener('click', () => this.openNotes());
        if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.closeNotes());
        if (this.exportBtn) this.exportBtn.addEventListener('click', () => this.exportToTXT());

        if (this.textarea) {
            this.textarea.addEventListener('input', () => {
                clearTimeout(this.saveTimeout);
                if (this.saveStatus) this.saveStatus.classList.remove('visible'); 
                
                this.saveTimeout = setTimeout(() => {
                    this.saveNotes();
                }, 1000); 
            });
        }
    }

    setContext(lessonId, lessonTitle) {
        this.currentLessonId = lessonId || 'general';
        this.currentLessonTitle = lessonTitle || 'Apuntes Generales';
        if (this.titleText) this.titleText.innerText = this.currentLessonTitle;
        
        this.loadNotes();
    }

    openNotes() {
        this.loadNotes(); 
        if (this.overlay) this.overlay.classList.remove('notes-hidden');
    }

    closeNotes() {
        if (this.overlay) this.overlay.classList.add('notes-hidden');
        if (this.textarea) this.textarea.blur(); 
    }

    saveNotes() {
        if (!this.textarea) return;
        const content = this.textarea.value;
        const storageKey = `logistica_pro_notes_${this.currentLessonId}`;
        
        localStorage.setItem(storageKey, content);
        
        if (this.saveStatus) this.saveStatus.classList.add('visible');
    }

    loadNotes() {
        if (!this.textarea) return;
        const storageKey = `logistica_pro_notes_${this.currentLessonId}`;
        const savedContent = localStorage.getItem(storageKey);
        
        this.textarea.value = savedContent ? savedContent : '';
        if (this.saveStatus) this.saveStatus.classList.remove('visible');
    }

    exportToTXT() {
        if (!this.textarea) return;
        const content = this.textarea.value;
        if (!content.trim()) {
            alert("No hay apuntes para exportar en esta lección.");
            return;
        }

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `Apuntes_${this.currentLessonId}.txt`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

const smartNotes = new SmartNotesManager();

/**
 * ==========================================
 * GESTOR VISUAL (TEMAS Y MASCOTAS MECHARIDDS/MECHANIZER)
 * ==========================================
 */
class VisualManager {
    constructor() {
        this.themeBtn = document.getElementById('theme-toggle-btn');
        this.mascotContainer = document.getElementById('mascot-container');
        this.mascotMessage = document.getElementById('mascot-message');
        this.mascotName = document.getElementById('mascot-name');
        this.mascotSwitchBtn = document.getElementById('mascot-switch-btn');
        this.svgMechaRidds = document.getElementById('svg-mecharidds');
        this.svgMechanizer = document.getElementById('svg-mechanizer');
        
        // Memoria de la mascota preferida
        this.currentMascot = localStorage.getItem('logistica_pro_mascot') || 'mecharidds';
        this.mascotTimeout = null;

        this.initTheme();
        this.initMascot();
    }

    // --- LÓGICA DEL TEMA CLARO/OSCURO ---
    initTheme() {
        if (!this.themeBtn) return;

        const savedTheme = localStorage.getItem('logistica_pro_theme');
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.themeBtn.innerText = '🌙'; 
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeBtn.innerText = '🌞'; 
        }

        this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('logistica_pro_theme', 'dark');
            this.themeBtn.innerText = '🌞';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('logistica_pro_theme', 'light');
            this.themeBtn.innerText = '🌙';
        }
    }

    // --- LÓGICA DE LAS MASCOTAS ---
    initMascot() {
        if (!this.mascotSwitchBtn) return;
        
        this.updateMascotUI();

        this.mascotSwitchBtn.addEventListener('click', () => {
            // Alternar identidad
            this.currentMascot = this.currentMascot === 'mecharidds' ? 'mechanizer' : 'mecharidds';
            localStorage.setItem('logistica_pro_mascot', this.currentMascot);
            this.updateMascotUI();
            
            // Saludo personalizado al cambiar
            const saludo = this.currentMascot === 'mecharidds' 
                ? "¡MechaRidds en línea! Listo para analizar el sistema." 
                : "¡Mechanizer lista! Agregando estilo a la base de datos.";
            this.showMascot(saludo, 4);
        });
    }

    updateMascotUI() {
        const bubble = document.querySelector('.mascot-bubble');
        
        if (this.currentMascot === 'mecharidds') {
            if (this.svgMechaRidds) this.svgMechaRidds.style.display = 'block';
            if (this.svgMechanizer) this.svgMechanizer.style.display = 'none';
            if (this.mascotName) {
                this.mascotName.innerText = 'MechaRidds';
                this.mascotName.style.backgroundColor = 'var(--cyan)';
                this.mascotName.style.color = '#000';
            }
            if (bubble) bubble.style.borderColor = 'var(--cyan)';
        } else {
            if (this.svgMechaRidds) this.svgMechaRidds.style.display = 'none';
            if (this.svgMechanizer) this.svgMechanizer.style.display = 'block';
            if (this.mascotName) {
                this.mascotName.innerText = 'Mechanizer';
                this.mascotName.style.backgroundColor = '#f48fb1'; // Tono Girlie Pink
                this.mascotName.style.color = '#fff';
            }
            if (bubble) bubble.style.borderColor = '#f48fb1';
        }
    }

    showMascot(message, durationInSeconds = 5) {
        if (!this.mascotContainer || !this.mascotMessage) return;

        this.mascotMessage.innerText = message;
        this.mascotContainer.classList.remove('mascot-hidden');

        if (this.mascotTimeout) {
            clearTimeout(this.mascotTimeout);
        }

        this.mascotTimeout = setTimeout(() => {
            this.mascotContainer.classList.add('mascot-hidden');
        }, durationInSeconds * 1000);
    }
}

const visualUI = new VisualManager();
