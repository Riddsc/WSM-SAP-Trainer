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

        if (typeof smartNotes !== 'undefined') smartNotes.setContext(itemId, mod.title);

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
                        ${!isLastPage ? `<button class="btn btn-primary" onclick="if(typeof AudioEngine !== 'undefined') AudioEngine.play('click'); UIRenderer.renderLesson('${itemId}', ${pageIndex + 1})">Siguiente →</button>` : ''}
                    </div>
                    ${isLastPage ? `
                        <div class="review-box" style="margin-top:30px;"><h4>🔄 Resumen</h4><p>${mod.review}</p></div>
                        <button class="btn btn-primary" style="margin-top: 20px;" onclick="UIRenderer.startExam('${itemId}')">📝 INICIAR EXAMEN</button>
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
                <p style="color:var(--text-muted); font-size:0.9rem;">Las preguntas han sido aleatorizadas.</p>
            </div>
        `;

        currentLessonState.activeExam.forEach((q, qIndex) => {
            const shuffledOptions = shuffleArray(q.options);
            let optionsHtml = shuffledOptions.map((opt, oIndex) => `
                <div class="quiz-opt" id="q${qIndex}-o${oIndex}" onclick="UIRenderer.selectAnswer(${qIndex}, ${oIndex}, ${opt.correct})">${opt.text}</div>
            `).join('');

            examHtml += `<div class="quiz-container" style="margin-top: 20px;"><div class="quiz-q">${qIndex + 1}. ${q.question}</div>${optionsHtml}</div>`;
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
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');
        document.querySelectorAll(`[id^="q${qIndex}-o"]`).forEach(el => el.classList.remove('selected'));
        document.getElementById(`q${qIndex}-o${oIndex}`).classList.add('selected');
        currentLessonState.answers[qIndex] = isCorrect;
    },

    submitExam(itemId) {
        const resultsDiv = document.getElementById('exam-results');
        if (currentLessonState.answers.includes(null)) {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('error');
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--warning);"><h4>⚠️ Advertencia</h4><p>Responde todas las preguntas.</p></div>`;
            return;
        }

        const score = Math.round((currentLessonState.answers.filter(a => a === true).length / currentLessonState.activeExam.length) * 100);
        if (score >= 80) {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('success');
            AppState.markComplete(itemId); AppState.saveScore(itemId, score);
            if (typeof visualUI !== 'undefined') visualUI.showMascot(`¡Aprobaste con un ${score}%!`, 5);
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);"><h4 style="color:var(--success);">✅ APROBADO (${score}%)</h4></div><button class="btn btn-outline" style="margin-top:20px;" onclick="Router.renderDashboard()">Volver al Pensum</button>`;
        } else {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('error');
            if (typeof visualUI !== 'undefined') visualUI.showMascot(`Obtuviste ${score}%. ¡Repasa e intenta de nuevo!`, 5);
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--danger); background:rgba(239,68,68,0.1);"><h4 style="color:var(--danger);">❌ REPROBADO (${score}%)</h4></div><button class="btn btn-outline" style="margin-top:20px;" onclick="UIRenderer.renderLesson('${itemId}', 0)">Repasar</button>`;
        }
    },

    // ==========================================
    // NUEVO CENTRO DE COMANDO CORPORATIVO
    // ==========================================
    renderProfile() {
        const container = document.getElementById('view-container');
        if (!container) return;

        let pct = 0, completed = 0, total = typeof syllabusData !== 'undefined' ? syllabusData.length : 0;
        try { 
            pct = AppState.getProgressPercentage(); 
            if(total > 0) completed = syllabusData.filter(m => AppState.isCompleted(m.id)).length;
        } catch (e) {}

        const userName = localStorage.getItem('logistica_username') || '';
        const sOn = localStorage.getItem('logistica_sound') !== 'false';
        const sVol = localStorage.getItem('logistica_vol') || '100';
        const vOn = localStorage.getItem('logistica_vib') !== 'false';
        const vLvl = localStorage.getItem('logistica_vib_level') || 'MEDIUM';

        container.innerHTML = `
            <span class="tag-subtitle">Panel de Control</span>
            <h2 class="main-title">Ajustes y Perfil</h2>
            
            <!-- 1. IDENTIDAD DEL USUARIO -->
            <div class="module-card" style="cursor:default; border-left: 4px solid var(--cyan);">
                <h3 style="color:var(--cyan); margin-bottom:5px;">👤 Perfil de Estudiante</h3>
                <p style="font-size:0.85rem; color:var(--text-muted);">Define tu nombre para los reportes, certificados y para que los asistentes interactúen contigo.</p>
                <div style="display:flex; gap:10px; align-items:flex-end;">
                    <div style="flex:1;">
                        <input type="text" id="user-name-input" class="modern-input" placeholder="Ej. Juan Pérez" value="${userName}">
                    </div>
                    <button class="btn btn-primary" style="padding:12px 20px; width:auto;" onclick="UIRenderer.saveProfileName()">Guardar</button>
                </div>
            </div>

            <!-- 2. MÉTRICAS Y CREDENCIALES -->
            <div class="module-card" style="margin-top:20px; cursor:default;">
                <h3 style="display:flex; justify-content:space-between; align-items:center;">
                    <span>🎓 Avance Académico</span>
                    <span style="color:var(--cyan); font-size:1.4rem;">${pct}%</span>
                </h3>
                <div style="width:100%; background:rgba(255,255,255,0.1); height:8px; border-radius:4px; margin: 15px 0;">
                    <div style="width:${pct}%; background:var(--cyan); height:100%; border-radius:4px; box-shadow: 0 0 8px var(--cyan);"></div>
                </div>
                <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:20px;">Módulos superados: <strong>${completed} de ${total}</strong></p>
                
                <div style="display:flex; gap:10px; flex-direction:column;">
                    <button class="btn btn-outline" style="border-color:var(--cyan); color:var(--cyan);" onclick="UIRenderer.generateReport()">📊 Ver Reporte Analítico</button>
                    ${pct >= 20 ? `<button class="btn btn-primary" onclick="UIRenderer.generateCertificate()">📜 Emitir Certificado de Logro</button>` : `<button class="btn btn-outline" style="opacity:0.5; cursor:not-allowed;" disabled>🔒 Certificado (Requiere más avance)</button>`}
                </div>
            </div>

            <!-- 3. HARDWARE E INMERSIÓN -->
            <div class="module-card" style="margin-top:20px; cursor:default;">
                <h3 style="color:var(--cyan); margin-bottom:15px;">🎛️ Configuración del Sistema</h3>
                
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <span style="font-weight:bold;">Sonidos del Sistema</span>
                    <label class="switch"><input type="checkbox" id="t-sound" ${sOn ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()"><span class="slider-toggle"></span></label>
                </div>
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:25px;">
                    <span style="font-size:0.85rem; color:var(--text-muted); width:70px;">Volumen</span>
                    <input type="range" id="t-vol" min="0" max="100" value="${sVol}" style="flex:1;" onchange="UIRenderer.saveHardwareSettings()">
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-top:1px solid rgba(255,255,255,0.1); padding-top:15px;">
                    <span style="font-weight:bold;">Vibración (Haptics)</span>
                    <label class="switch"><input type="checkbox" id="t-vib" ${vOn ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()"><span class="slider-toggle"></span></label>
                </div>
                <div style="display:flex; align-items:center; gap:15px;">
                    <span style="font-size:0.85rem; color:var(--text-muted); width:70px;">Fuerza</span>
                    <select id="t-vib-lvl" class="modern-input" style="flex:1; margin-top:0; padding:8px;" onchange="UIRenderer.saveHardwareSettings()">
                        <option value="LIGHT" ${vLvl==='LIGHT'?'selected':''}>Suave (Light)</option>
                        <option value="MEDIUM" ${vLvl==='MEDIUM'?'selected':''}>Media (Medium)</option>
                        <option value="HEAVY" ${vLvl==='HEAVY'?'selected':''}>Fuerte (Heavy)</option>
                    </select>
                </div>
            </div>

            <!-- 4. DATOS Y RESET -->
            <div class="module-card" style="margin-top:20px; border: 1px solid rgba(239, 68, 68, 0.3); cursor:default;">
                <h3 style="color:var(--danger); margin-bottom:15px;">💾 Base de Datos Local</h3>
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <button class="btn btn-outline" style="flex:1;" onclick="AppState.exportBackup()">Exportar .json</button>
                    <input type="file" id="backup-file" accept=".json" style="display:none;" onchange="AppState.importBackup(event)">
                    <button class="btn btn-outline" style="flex:1;" onclick="document.getElementById('backup-file').click()">Importar .json</button>
                </div>
                <button class="btn btn-danger" style="width:100%;" onclick="UIRenderer.factoryReset()">⚠️ Borrar Todo el Progreso</button>
            </div>
        `;
        container.scrollTop = 0;
    },

    saveProfileName() {
        const name = document.getElementById('user-name-input').value.trim();
        if(name) {
            localStorage.setItem('logistica_username', name);
            if(typeof visualUI !== 'undefined') visualUI.showMascot(`¡Perfil actualizado, ${name}! Es un honor asistirte.`, 4);
        }
    },

    saveHardwareSettings() {
        localStorage.setItem('logistica_sound', document.getElementById('t-sound').checked);
        localStorage.setItem('logistica_vol', document.getElementById('t-vol').value);
        localStorage.setItem('logistica_vib', document.getElementById('t-vib').checked);
        localStorage.setItem('logistica_vib_level', document.getElementById('t-vib-lvl').value);

        if (document.getElementById('t-vib').checked && window.Capacitor?.Plugins?.Haptics) {
            window.Capacitor.Plugins.Haptics.impact({ style: document.getElementById('t-vib-lvl').value });
        }
    },

    generateReport() {
        const container = document.getElementById('view-container');
        let tableRows = '';
        
        syllabusData.forEach((mod, idx) => {
            const isCompleted = AppState.isCompleted(mod.id);
            const isLocked = mod.req && !AppState.isCompleted(mod.req);
            let status = `<span class="status-badge status-pend">Pendiente</span>`;
            if(isCompleted) status = `<span class="status-badge status-done">Completado</span>`;
            else if(isLocked) status = `<span class="status-badge status-lock">Bloqueado</span>`;

            tableRows += `<tr><td>${idx + 1}</td><td><strong>${mod.title}</strong><br><small style="color:var(--text-muted);">${mod.type.toUpperCase()}</small></td><td>${status}</td></tr>`;
        });

        const userName = localStorage.getItem('logistica_username') || 'Estudiante No Registrado';
        const date = new Date().toLocaleDateString('es-CO');

        container.innerHTML = `
            <span class="tag-subtitle">Analítica Académica</span>
            <h2 class="main-title">Reporte Detallado de Avance</h2>
            <div class="review-box" style="margin-bottom:20px;">
                <p><strong>Titular:</strong> ${userName}</p>
                <p><strong>Fecha de corte:</strong> ${date}</p>
            </div>
            <div style="overflow-x:auto; background:rgba(0,0,0,0.2); border-radius:var(--radius-md); padding:10px;">
                <table class="report-table">
                    <thead><tr><th>#</th><th>Módulo de Estudio</th><th>Estado Actual</th></tr></thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
            <button class="btn btn-outline" style="margin-top:20px;" onclick="UIRenderer.renderProfile()">← Volver a Configuración</button>
        `;
        container.scrollTop = 0;
    },

    generateCertificate() {
        const container = document.getElementById('view-container');
        let pct = 0; try { pct = AppState.getProgressPercentage(); } catch(e){}
        const userName = localStorage.getItem('logistica_username') || 'El/La Estudiante';
        const date = new Date().toLocaleDateString('es-CO');

        container.innerHTML = `
            <div class="cert-container">
                <div style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 3rem; background: var(--bg-card); border-radius: 50%; padding: 10px; border: 2px solid #06B6D4;">🎓</div>
                <h1>CERTIFICADO DE LOGRO</h1>
                <p style="color: #475569; font-size: 1.1rem; margin-bottom: 20px; font-weight: bold; text-transform: uppercase;">Masterclass Logística Pro</p>
                
                <p style="font-size: 1.1rem; margin-bottom: 5px; color:#334155;">Otorgado orgullosamente a:</p>
                <h2 style="color: #0A0F1C; font-size: 2.5rem; border-bottom: 2px solid #06B6D4; display:inline-block; padding:0 20px; margin-bottom: 20px;">${userName}</h2>

                <p style="font-size: 1.1rem; margin-bottom: 10px; color:#334155;">Por certificar su progreso técnico de nivel Ingeniería sobre el currículo del sistema SAP S/4HANA & EWM.</p>
                
                <h2 style="color: #06B6D4; font-size: 4rem; margin: 15px 0;">${pct}%</h2>
                <p style="font-size: 1.1rem; margin-bottom: 40px; color:#334155;">Completitud del Entrenamiento Teórico-Práctico</p>
                
                <div style="display: flex; justify-content: space-between; border-top: 2px solid #cbd5e1; padding-top: 15px;">
                    <div style="text-align:left;">
                        <p style="font-weight: bold; margin:0; color:#0A0F1C;">Expedición</p>
                        <p style="margin:0; color:#475569;">${date}</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="font-weight: bold; margin:0; color:#0A0F1C;">Firma Autorizada</p>
                        <p class="signature">MechaRidds & Mechanizer</p>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="window.print()" style="flex:1;">🖨️ Guardar PDF / Imprimir</button>
                <button class="btn btn-outline" onclick="UIRenderer.renderProfile()">← Volver</button>
            </div>
        `;
    },

    // Las demás funciones quedan igual, esto cierra el objeto
    factoryReset() {
        if (confirm("⚠️ ATENCIÓN: Estás a punto de borrar todo tu progreso. ¿Estás seguro?")) {
            if (confirm("🚨 ÚLTIMA ADVERTENCIA: Esta acción es irreversible. ¿Proceder?")) {
                localStorage.clear(); alert("Progreso reseteado."); window.location.reload();
            }
        }
    }
};

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
                this.saveTimeout = setTimeout(() => { this.saveNotes(); }, 1000); 
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
        if (!content.trim()) { alert("No hay apuntes para exportar en esta lección."); return; }
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

class VisualManager {
    constructor() {
        this.themeBtn = document.getElementById('theme-toggle-btn');
        this.mascotContainer = document.getElementById('mascot-container');
        this.mascotBubble = document.getElementById('mascot-message'); 
        this.mascotName = document.getElementById('mascot-name');
        this.mascotSwitchBtn = document.getElementById('mascot-switch-btn');
        this.svgMechaRidds = document.getElementById('svg-mecharidds');
        this.svgMechanizer = document.getElementById('svg-mechanizer');
        
        this.currentMascot = localStorage.getItem('logistica_pro_mascot') || 'mecharidds';
        this.mascotTimeout = null;

        this.initTheme();
        this.initMascot();
    }

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
        let newIcon = '';
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('logistica_pro_theme', 'dark');
            newIcon = '🌞';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('logistica_pro_theme', 'light');
            newIcon = '🌙';
        }
        if (this.themeBtn) this.themeBtn.innerText = newIcon;
    }

    initMascot() {
        this.updateMascotUI();
        
        if (this.mascotSwitchBtn) {
            this.mascotSwitchBtn.addEventListener('click', () => this.toggleMascot());
        }

        setTimeout(() => {
            if (this.mascotContainer) {
                this.mascotContainer.classList.remove('mascot-hidden');
            }
            if (this.mascotBubble) {
                this.mascotBubble.classList.add('bubble-hidden');
            }
        }, 500);
    }

    toggleMascot() {
        this.currentMascot = this.currentMascot === 'mecharidds' ? 'mechanizer' : 'mecharidds';
        localStorage.setItem('logistica_pro_mascot', this.currentMascot);
        this.updateMascotUI();
        
        const saludo = this.currentMascot === 'mecharidds' 
            ? "¡MechaRidds en línea! Listo para el análisis." 
            : "¡Mechanizer lista! Agregando estilo a los datos.";
        this.showMascot(saludo, 4);
    }

    updateMascotUI() {
        if (this.currentMascot === 'mecharidds') {
            if (this.svgMechaRidds) this.svgMechaRidds.style.display = 'block';
            if (this.svgMechanizer) this.svgMechanizer.style.display = 'none';
            if (this.mascotName) {
                this.mascotName.innerText = 'MechaRidds';
                this.mascotName.style.backgroundColor = 'var(--cyan)';
                this.mascotName.style.color = '#000';
            }
            if (this.mascotBubble) this.mascotBubble.style.borderColor = 'var(--cyan)';
        } else {
            if (this.svgMechaRidds) this.svgMechaRidds.style.display = 'none';
            if (this.svgMechanizer) this.svgMechanizer.style.display = 'block';
            if (this.mascotName) {
                this.mascotName.innerText = 'Mechanizer';
                this.mascotName.style.backgroundColor = '#f48fb1';
                this.mascotName.style.color = '#fff';
            }
            if (this.mascotBubble) this.mascotBubble.style.borderColor = '#f48fb1';
        }
    }

    showMascot(message, durationInSeconds = 5) {
        if (!this.mascotContainer || !this.mascotBubble) return;

        this.mascotBubble.innerText = message;
        this.mascotBubble.classList.remove('bubble-hidden');

        if (this.mascotTimeout) clearTimeout(this.mascotTimeout);

        this.mascotTimeout = setTimeout(() => {
            this.mascotBubble.classList.add('bubble-hidden');
        }, durationInSeconds * 1000);
    }
}

const visualUI = new VisualManager();

// Autocarga para evitar la pantalla blanca al inicio
window.addEventListener('DOMContentLoaded', () => {
    if (typeof UIRenderer !== 'undefined') UIRenderer.renderDashboard();
    
    setTimeout(() => {
        if (typeof visualUI !== 'undefined') {
            const storedName = localStorage.getItem('logistica_username');
            const greeting = storedName ? `¡Hola ${storedName}! Sistemas online y listos.` : "¡Sistemas online! Listo para continuar tu maestría.";
            visualUI.showMascot(greeting, 4);
        }
    }, 1200);

    // 3. INTERCEPTOR GLOBAL DE AUDIO (Respeta el volumen y Mute)
    if (typeof AudioEngine !== 'undefined' && AudioEngine.play) {
        const originalPlay = AudioEngine.play.bind(AudioEngine);
        AudioEngine.play = (soundName) => {
            const isEnabled = localStorage.getItem('logistica_sound') !== 'false';
            if (isEnabled) {
                // Forzamos el volumen en el objeto audio justo antes de reproducir
                const vol = parseInt(localStorage.getItem('logistica_vol') || '100') / 100;
                if(AudioEngine.sounds && AudioEngine.sounds[soundName]) {
                    AudioEngine.sounds[soundName].volume = vol;
                }
                originalPlay(soundName);
            }
        };
    }

    // 4. INTERCEPTOR GLOBAL DE HAPTICS (Vibración al tocar cualquier botón)
    document.body.addEventListener('click', (e) => {
        // Si tocamos un botón, una tarjeta o una opción de quiz
        if (e.target.closest('.btn, .quiz-opt, .module-card, .icon-btn')) {
            const vibEnabled = localStorage.getItem('logistica_vib') !== 'false';
            const vibLevel = localStorage.getItem('logistica_vib_level') || 'MEDIUM';
            
            if (vibEnabled && window.Capacitor && window.Capacitor.Plugins.Haptics) {
                window.Capacitor.Plugins.Haptics.impact({ style: vibLevel });
            }
        }
    });
});
/**
 * PUENTE GLOBAL DE COMPATIBILIDAD
 * Garantiza que cualquier llamada antigua a renderGlossary funcione de inmediato 
 * aunque esté dentro de UIRenderer.
 */
window.renderGlossary = function() {
    if (typeof UIRenderer !== 'undefined' && UIRenderer.renderGlossary) {
        UIRenderer.renderGlossary();
    }
};

// Aseguramos también el Router global por si acaso
if (typeof Router !== 'undefined') {
    Router.renderGlossary = function() {
        window.renderGlossary();
    };
}
