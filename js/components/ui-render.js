/**
 * Logística Pro - Motor UI Completo (Paginación, Exámenes, Perfil, Reportes, Certificados y Glosario T-Codes)
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

const MASTER_TCODES = [
    { code: 'MIGO', cat: 'MM / IM', badgeClass: 'card-badge', color: 'var(--cyan)', desc: 'Movimiento de mercancías (Entradas, salidas, traslados, traspasos y reservas).' },
    { code: 'MMBE', cat: 'MM / IM', badgeClass: 'card-badge', color: 'var(--cyan)', desc: 'Resumen de stocks. Permite auditar la disponibilidad de un material por centro y almacén en tiempo real.' },
    { code: 'ME21N', cat: 'MM / IM', badgeClass: 'card-badge', color: 'var(--cyan)', desc: 'Creación de Pedidos de Compras (Purchase Orders) estándar o de traslado (STO).' },
    { code: 'VL31N', cat: 'LE / SHP', badgeClass: 'card-badge', color: 'var(--cyan)', desc: 'Creación de Entrega Entrante (Inbound Delivery) en ERP antes de su distribución a EWM.' },
    { code: '/SCWM/PRDI', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Mantenimiento de Entregas de Entrada (Inbound Delivery) en SAP S/4HANA EWM para recepción.' },
    { code: '/SCWM/PRDO', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Mantenimiento de Entregas de Salida (Outbound Delivery Order) para picking, packing y carga.' },
    { code: '/SCWM/MON', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Monitor de Gestión de Almacenes. Centro de mando operativo total para auditar stocks, tareas (WT), órdenes (WO) y recursos.' },
    { code: '/SCWM/RFUI', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Entorno de Radiofrecuencia (RF). Interfaz móvil nativa para pistolas de escaneo y montacargas.' },
    { code: '/SCWM/PACK', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Work Center de Embalaje. Creación, reembalaje y estructuración física de HUs (Handling Units).' },
    { code: '/SCWM/LS01', cat: 'WM / EWM', badgeClass: 'card-badge lab', color: 'var(--warning)', desc: 'Creación maestra de Ubicaciones (Storage Bins) dentro de un Tipo y Área de Almacenamiento.' },
    { code: 'OX09', cat: 'CUSTOMIZING', badgeClass: 'card-badge', color: 'var(--text-primary)', desc: 'Mantenimiento y creación de Almacenes (Storage Locations) vinculados al Centro (Plant).' },
    { code: 'SPRO', cat: 'CUSTOMIZING', badgeClass: 'card-badge', color: 'var(--text-primary)', desc: 'Guía de Implementación (IMG). Acceso al árbol maestro de parametrización del sistema.' }
];

const UIRenderer = {
    renderDashboard() {
        const container = document.getElementById('view-container');
        if (!container) return;

        const userName = localStorage.getItem('logistica_username');
        const subtitle = userName ? `Bienvenido(a), ${userName}` : 'Ruta de Especialización EWM';

        let html = `
            <span class="tag-subtitle">${subtitle}</span>
            <h2 class="main-title">Módulos Universitarios</h2>
        `;

        if (typeof syllabusData === 'undefined') {
            container.innerHTML = `<h2 class="main-title">Cargando base de datos...</h2>`;
            return;
        }

        syllabusData.forEach((mod, idx) => {
            const isCompleted = AppState.isCompleted(mod.id);
            const isLocked = mod.req && !AppState.isCompleted(mod.req);
            const badgeClass = mod.type === 'lab' ? 'card-badge lab' : 'card-badge';

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
        if (!mod || !container) return;

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

                    <div class="pagination-controls" style="margin-top: 32px; display:flex; gap:10px;">
                        ${pageIndex > 0 ? `<button class="btn btn-outline" type="button" onclick="UIRenderer.renderLesson('${itemId}', ${pageIndex - 1})">← Anterior</button>` : ''}
                        ${!isLastPage ? `<button class="btn btn-primary" type="button" onclick="if(typeof AudioEngine !== 'undefined') AudioEngine.play('click'); UIRenderer.renderLesson('${itemId}', ${pageIndex + 1})">Siguiente →</button>` : ''}
                    </div>

                    ${isLastPage ? `
                        <div class="review-box" style="margin-top:26px;">
                            <h4>🔄 Resumen Ejecutivo</h4>
                            <p>${mod.review}</p>
                        </div>
                        <button class="btn btn-primary" type="button" style="margin-top: 18px;" onclick="UIRenderer.startExam('${itemId}')">📝 INICIAR EXAMEN DE CERTIFICACIÓN</button>
                    ` : ''}
                    <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        } else if (mod.type === 'lab') {
            container.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding-top: 30px;">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Laboratorio</span>
                    <h2 style="border:none; padding:0;">Práctica SAP S/4HANA</h2>
                    <p style="margin-bottom: 26px;">${mod.description}</p>
                    <div style="font-size: 3.8rem; margin-bottom: 20px;">💻</div>
                    <button class="btn btn-primary" type="button" onclick="SAPEngine.open('${mod.id}')">INICIAR TERMINAL</button>
                    <button class="btn btn-outline" type="button" style="margin-top: 24px;" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        }
        container.scrollTop = 0;
    },

    startExam(itemId) {
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const container = document.getElementById('view-container');
        if (!mod || !container) return;

        currentLessonState.activeExam = shuffleArray(mod.exam);
        currentLessonState.answers = new Array(currentLessonState.activeExam.length).fill(null);

        let examHtml = `
            <div class="exam-header">
                <h2 style="color:var(--text-primary); border:none; padding:0; margin-bottom:8px;">Examen de Certificación</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">Debes aprobar con un 80% mínimo. Las preguntas han sido aleatorizadas.</p>
            </div>
        `;

        currentLessonState.activeExam.forEach((q, qIndex) => {
            const shuffledOptions = shuffleArray(q.options);
            const optionsHtml = shuffledOptions.map((opt, oIndex) => `
                <div class="quiz-opt" id="q${qIndex}-o${oIndex}" onclick="UIRenderer.selectAnswer(${qIndex}, ${oIndex}, ${opt.correct})">
                    ${opt.text}
                </div>
            `).join('');

            examHtml += `
                <div class="quiz-container">
                    <div class="quiz-q">${qIndex + 1}. ${q.question}</div>
                    ${optionsHtml}
                </div>
            `;
        });

        examHtml += `
            <button class="btn btn-primary" type="button" style="margin-top:24px;" onclick="UIRenderer.submitExam('${itemId}')">ENTREGAR EXAMEN</button>
            <div id="exam-results" style="margin-top: 20px;"></div>
            <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.renderDashboard()">← Abortar Examen</button>
        `;

        container.innerHTML = examHtml;
        container.scrollTop = 0;
    },

    selectAnswer(qIndex, oIndex, isCorrect) {
        if (typeof AudioEngine !== 'undefined') AudioEngine.play('click');
        document.querySelectorAll(`[id^="q${qIndex}-o"]`).forEach(el => el.classList.remove('selected'));
        const target = document.getElementById(`q${qIndex}-o${oIndex}`);
        if (target) target.classList.add('selected');
        currentLessonState.answers[qIndex] = isCorrect;
    },

    submitExam(itemId) {
        const resultsDiv = document.getElementById('exam-results');
        if (!resultsDiv) return;

        if (currentLessonState.answers.includes(null)) {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('error');
            resultsDiv.innerHTML = `<div class="review-box" style="border-color:var(--warning);"><h4>⚠️ Advertencia</h4><p>Debes responder todas las preguntas antes de entregar.</p></div>`;
            return;
        }

        const totalQuestions = currentLessonState.activeExam.length;
        const correctCount = currentLessonState.answers.filter(a => a === true).length;
        const score = Math.round((correctCount / totalQuestions) * 100);
        const userName = localStorage.getItem('logistica_username') || 'Especialista';

        if (score >= 80) {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('success');
            AppState.markComplete(itemId);
            if (AppState.saveScore) AppState.saveScore(itemId, score);

            if (typeof visualUI !== 'undefined') {
                visualUI.showMascot(`¡Excelente trabajo, ${userName}! Aprobaste con un ${score}%.`, 5);
            }

            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);">
                    <h4 style="color:var(--success);">✅ CERTIFICADO (Score: ${score}%)</h4>
                    <p>Dominio técnico verificado. Siguiente módulo desbloqueado.</p>
                </div>
                <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.renderDashboard()">Volver al Pensum</button>
            `;
        } else {
            if (typeof AudioEngine !== 'undefined') AudioEngine.play('error');
            if (typeof visualUI !== 'undefined') {
                visualUI.showMascot(`Obtuviste ${score}%, ${userName}. ¡Repasa la teoría e inténtalo de nuevo!`, 5);
            }

            resultsDiv.innerHTML = `
                <div class="review-box" style="border-color:var(--danger); background:rgba(239,68,68,0.1);">
                    <h4 style="color:var(--danger);">❌ REPROBADO (Score: ${score}%)</h4>
                    <p>Se requiere un 80% mínimo. Las preguntas se barajarán en el próximo intento.</p>
                </div>
                <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="UIRenderer.renderLesson('${itemId}', 0)">Repasar Teoría</button>
            `;
        }
    },

    // ==========================================
    // GLOSARIO MAESTRO DE T-CODES (CON BUSCADOR)
    // ==========================================
    renderGlossary() {
        const container = document.getElementById('view-container');
        if (!container) return;

        container.innerHTML = `
            <span class="tag-subtitle">Diccionario Técnico SAP</span>
            <h2 class="main-title">Transacciones (T-Codes)</h2>

            <div class="settings-card" style="margin-bottom: 18px; padding: 14px;">
                <input type="text" id="tcode-search" class="modern-input" placeholder="🔍 Buscar T-Code o palabra clave (ej. MIGO, MON, stock)..." oninput="UIRenderer.filterGlossary(this.value)">
            </div>

            <div id="tcode-list-container"></div>
        `;

        this.filterGlossary('');
        container.scrollTop = 0;

        if (typeof visualUI !== 'undefined') {
            const userName = localStorage.getItem('logistica_username');
            const msg = userName
                ? `${userName}, aquí tienes todas las transacciones clave de S/4HANA y EWM.`
                : 'Glosario activado. Usa el buscador para filtrar transacciones.';
            visualUI.showMascot(msg, 4);
        }
    },

    filterGlossary(query = '') {
        const listContainer = document.getElementById('tcode-list-container');
        if (!listContainer) return;

        const q = query.trim().toLowerCase();
        const filtered = MASTER_TCODES.filter(item =>
            item.code.toLowerCase().includes(q) ||
            item.cat.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="review-box">
                    <h4>Sin coincidencias</h4>
                    <p>No se encontraron transacciones para "${query}".</p>
                </div>
            `;
            return;
        }

        listContainer.innerHTML = filtered.map(item => `
            <div class="module-card" style="cursor:default;">
                <div class="card-top">
                    <span class="${item.badgeClass}">${item.cat}</span>
                </div>
                <h3 style="color:${item.color}; font-family:'Courier New', monospace; font-size:1.2rem;">${item.code}</h3>
                <p>${item.desc}</p>
            </div>
        `).join('');
    },

    // ==========================================
    // CENTRO DE COMANDO, PERFIL Y ESTADÍSTICAS
    // ==========================================
    renderProfile() {
        const container = document.getElementById('view-container');
        if (!container) return;

        let pct = 0;
        let completed = 0;
        const total = typeof syllabusData !== 'undefined' ? syllabusData.length : 0;

        try {
            pct = AppState.getProgressPercentage ? AppState.getProgressPercentage() : 0;
            if (total > 0) {
                completed = syllabusData.filter(m => AppState.isCompleted(m.id)).length;
            }
        } catch (e) {
            pct = 0;
        }

        const pending = Math.max(0, total - completed);
        const userName = localStorage.getItem('logistica_username') || '';
        const userRole = localStorage.getItem('logistica_userrole') || 'Consultor SAP EWM Jr.';
        const sOn = localStorage.getItem('logistica_sound') !== 'false';
        const sVol = localStorage.getItem('logistica_vol') || '100';
        const vOn = localStorage.getItem('logistica_vib') !== 'false';
        const vLvl = localStorage.getItem('logistica_vib_level') || 'MEDIUM';

        container.innerHTML = `
            <span class="tag-subtitle">Centro de Comando</span>
            <h2 class="main-title">Perfil y Configuración</h2>

            <div class="settings-grid">
                <!-- 1. PERFIL DEL ESTUDIANTE -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">👤 Identidad del Estudiante</span>
                        <span class="status-badge ${userName ? 'status-done' : 'status-pend'}">${userName ? 'Activo' : 'Sin registrar'}</span>
                    </div>
                    <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:12px;">
                        Tu nombre aparecerá en los saludos de MechaRidds y Mechanizer, en el Reporte Analítico y en tu Certificado Oficial.
                    </p>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <input type="text" id="user-name-input" class="modern-input" placeholder="Nombre completo (Ej. Juan Pérez)" value="${userName}">
                        <input type="text" id="user-role-input" class="modern-input" placeholder="Cargo o Meta (Ej. Especialista SAP EWM)" value="${userRole}">
                        <button class="btn btn-primary" type="button" onclick="UIRenderer.saveProfileName()">💾 Guardar Perfil</button>
                    </div>
                </div>

                <!-- 2. ESTADÍSTICAS, REPORTE Y CERTIFICADO -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">📊 Estadísticas y Credenciales</span>
                        <span style="font-weight:800; color:var(--cyan);">${pct}%</span>
                    </div>

                    <div style="width:100%; background:rgba(128,128,128,0.2); height:8px; border-radius:4px; overflow:hidden; margin-bottom:12px;">
                        <div style="width:${pct}%; background:var(--cyan); height:100%; border-radius:4px; box-shadow:0 0 8px var(--cyan-glow);"></div>
                    </div>

                    <div class="stat-kpi-grid">
                        <div class="stat-kpi-box">
                            <span class="stat-kpi-val">${completed}</span>
                            <span class="stat-kpi-lbl">Aprobados</span>
                        </div>
                        <div class="stat-kpi-box">
                            <span class="stat-kpi-val">${pending}</span>
                            <span class="stat-kpi-lbl">Restantes</span>
                        </div>
                        <div class="stat-kpi-box">
                            <span class="stat-kpi-val">${total}</span>
                            <span class="stat-kpi-lbl">Total Módulos</span>
                        </div>
                    </div>

                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;">
                        <button class="btn btn-outline" type="button" style="border-color:var(--cyan); color:var(--cyan);" onclick="UIRenderer.generateReport()">
                            📋 Generar Reporte de Módulos
                        </button>
                        <button class="btn btn-primary" type="button" onclick="UIRenderer.generateCertificate()">
                            🎓 Emitir Certificado Oficial
                        </button>
                    </div>
                </div>

                <!-- 3. SONIDO, VOLUMEN Y VIBRACIÓN (HAPTICS) -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">🎛️ Sonido y Vibración</span>
                    </div>

                    <div class="settings-row">
                        <div>
                            <span class="settings-label">Efectos de Sonido</span>
                            <span class="settings-sublabel">Audio sintético al navegar y evaluar</span>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="t-sound" ${sOn ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()">
                            <span class="slider-toggle"></span>
                        </label>
                    </div>

                    <div class="settings-row">
                        <span class="settings-label" style="font-size:0.85rem;">Volumen (<span id="vol-label">${sVol}%</span>)</span>
                        <input type="range" id="t-vol" min="0" max="100" value="${sVol}" style="width:55%;" oninput="document.getElementById('vol-label').innerText = this.value + '%'" onchange="UIRenderer.saveHardwareSettings()">
                    </div>

                    <div class="settings-row" style="border-top:1px solid var(--border-light); margin-top:8px; padding-top:14px;">
                        <div>
                            <span class="settings-label">Respuesta Háptica (Vibración)</span>
                            <span class="settings-sublabel">Vibración táctil al pulsar controles</span>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="t-vib" ${vOn ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()">
                            <span class="slider-toggle"></span>
                        </label>
                    </div>

                    <div class="settings-row">
                        <span class="settings-label" style="font-size:0.85rem;">Intensidad de Vibración</span>
                        <select id="t-vib-lvl" class="modern-input" style="width:55%; padding:8px 10px;" onchange="UIRenderer.saveHardwareSettings()">
                            <option value="LIGHT" ${vLvl === 'LIGHT' ? 'selected' : ''}>Suave (Light)</option>
                            <option value="MEDIUM" ${vLvl === 'MEDIUM' ? 'selected' : ''}>Media (Medium)</option>
                            <option value="HEAVY" ${vLvl === 'HEAVY' ? 'selected' : ''}>Fuerte (Heavy)</option>
                        </select>
                    </div>
                </div>

                <!-- 4. RECORDATORIO DIARIO -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">⏰ Alerta de Estudio Diario</span>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <input type="time" id="study-time" class="time-picker-input" style="flex:1;" value="20:00">
                        <button class="btn btn-outline" type="button" style="width:auto; padding:11px 18px;" onclick="UIRenderer.scheduleReminder()">Activar</button>
                    </div>
                    <p id="reminder-status" style="color:var(--success); font-size:0.82rem; margin-top:10px; display:none;"></p>
                </div>

                <!-- 5. COPIA DE SEGURIDAD Y RESET -->
                <div class="settings-card" style="border-color:rgba(239,68,68,0.3);">
                    <div class="settings-card-header">
                        <span class="settings-card-title" style="color:var(--danger);">💾 Respaldo y Restauración</span>
                    </div>
                    <div style="display:flex; gap:10px; margin-bottom:12px;">
                        <button class="btn btn-outline" type="button" style="flex:1;" onclick="AppState.exportBackup()">⬇️ Exportar .JSON</button>
                        <input type="file" id="backup-file" accept=".json" style="display:none;" onchange="AppState.importBackup(event)">
                        <button class="btn btn-outline" type="button" style="flex:1;" onclick="document.getElementById('backup-file').click()">⬆️ Importar .JSON</button>
                    </div>
                    <button class="btn btn-danger" type="button" onclick="UIRenderer.factoryReset()">⚠️ Borrar Todo el Progreso</button>
                </div>
            </div>
        `;
        container.scrollTop = 0;
    },

    saveProfileName() {
        const nameInput = document.getElementById('user-name-input');
        const roleInput = document.getElementById('user-role-input');
        const name = nameInput ? nameInput.value.trim() : '';
        const role = roleInput ? roleInput.value.trim() : 'Consultor SAP EWM';

        if (!name) {
            if (typeof visualUI !== 'undefined') visualUI.showMascot('Por favor escribe tu nombre antes de guardar.', 3);
            return;
        }

        localStorage.setItem('logistica_username', name);
        localStorage.setItem('logistica_userrole', role);

        if (typeof AudioEngine !== 'undefined') AudioEngine.play('success');
        if (typeof visualUI !== 'undefined') {
            visualUI.showMascot(`¡Perfil guardado, ${name}! Tus reportes y certificados ya están personalizados.`, 4);
        }
        this.renderProfile();
    },

    saveHardwareSettings() {
        const sOn = document.getElementById('t-sound') ? document.getElementById('t-sound').checked : true;
        const sVol = document.getElementById('t-vol') ? document.getElementById('t-vol').value : '100';
        const vOn = document.getElementById('t-vib') ? document.getElementById('t-vib').checked : true;
        const vLvl = document.getElementById('t-vib-lvl') ? document.getElementById('t-vib-lvl').value : 'MEDIUM';

        localStorage.setItem('logistica_sound', sOn);
        localStorage.setItem('logistica_vol', sVol);
        localStorage.setItem('logistica_vib', vOn);
        localStorage.setItem('logistica_vib_level', vLvl);

        if (vOn) {
            this.triggerHaptic(vLvl);
        }
        if (typeof visualUI !== 'undefined') {
            visualUI.showMascot('Parámetros de sonido y vibración actualizados.', 3);
        }
    },

    triggerHaptic(level = 'MEDIUM') {
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Haptics) {
            window.Capacitor.Plugins.Haptics.impact({ style: level }).catch(() => {});
        } else if (navigator.vibrate) {
            const ms = level === 'LIGHT' ? 15 : (level === 'HEAVY' ? 60 : 30);
            navigator.vibrate(ms);
        }
    },

    // ==========================================
    // DOCUMENTO 1: REPORTE ANALÍTICO DETALLADO
    // ==========================================
    generateReport() {
        const container = document.getElementById('view-container');
        if (!container) return;

        const userName = localStorage.getItem('logistica_username') || 'Estudiante No Registrado';
        const userRole = localStorage.getItem('logistica_userrole') || 'Especialista SAP S/4HANA EWM';
        const date = new Date().toLocaleDateString('es-CO');
        let pct = 0;
        try { pct = AppState.getProgressPercentage(); } catch (e) { pct = 0; }

        let tableRows = '';
        let completedCount = 0;

        if (typeof syllabusData !== 'undefined') {
            syllabusData.forEach((mod, idx) => {
                const isCompleted = AppState.isCompleted(mod.id);
                const isLocked = mod.req && !AppState.isCompleted(mod.req);
                if (isCompleted) completedCount++;

                let statusBadge = `<span class="status-badge status-pend">En Curso</span>`;
                if (isCompleted) statusBadge = `<span class="status-badge status-done">Aprobado</span>`;
                else if (isLocked) statusBadge = `<span class="status-badge status-lock">Bloqueado</span>`;

                tableRows += `
                    <tr>
                        <td>${idx + 1}</td>
                        <td>
                            <strong>${mod.title}</strong>
                            <span style="display:block; font-size:0.72rem; color:var(--text-muted);">Semestre ${mod.semester} • ${mod.type.toUpperCase()}</span>
                        </td>
                        <td>${statusBadge}</td>
                    </tr>
                `;
            });
        }

        container.innerHTML = `
            <span class="tag-subtitle">Kárdex Académico</span>
            <h2 class="main-title">Reporte Analítico de Avance</h2>

            <div class="settings-card">
                <p style="margin-bottom:6px;"><strong>Estudiante:</strong> ${userName}</p>
                <p style="margin-bottom:6px;"><strong>Rol / Especialidad:</strong> ${userRole}</p>
                <p style="margin-bottom:6px;"><strong>Fecha de Emisión:</strong> ${date}</p>
                <p style="margin-bottom:0;"><strong>Avance Global:</strong> <span style="color:var(--cyan); font-weight:800;">${pct}% (${completedCount} de ${syllabusData.length} módulos)</span></p>
            </div>

            <div class="settings-card" style="margin-top:16px; overflow-x:auto; padding:12px;">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Módulo del Pensum</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>

            <div class="no-print" style="display:flex; gap:10px; margin-top:20px;">
                <button class="btn btn-primary" type="button" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
                <button class="btn btn-outline" type="button" onclick="UIRenderer.renderProfile()">← Volver al Perfil</button>
            </div>
        `;
        container.scrollTop = 0;
    },

    // ==========================================
    // DOCUMENTO 2: CERTIFICADO OFICIAL DE LOGRO
    // ==========================================
    generateCertificate() {
        const container = document.getElementById('view-container');
        if (!container) return;

        let pct = 0;
        try { pct = AppState.getProgressPercentage(); } catch (e) { pct = 0; }

        const userName = localStorage.getItem('logistica_username') || 'Estudiante de Logística Pro';
        const userRole = localStorage.getItem('logistica_userrole') || 'Especialista en Gestión de Almacenes SAP EWM';
        const date = new Date().toLocaleDateString('es-CO');
        const certType = pct >= 100
            ? 'CERTIFICADO DE FINALIZACIÓN MASTERCLASS'
            : 'CERTIFICADO DE AVANCE ACADÉMICO';

        container.innerHTML = `
            <div class="cert-container">
                <div style="font-size: 2.8rem; margin-bottom: 8px;">🎓</div>
                <h1>${certType}</h1>
                <p style="color: #475569; font-size: 0.95rem; margin-bottom: 18px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
                    Academia Corporativa Logística Pro • SAP S/4HANA &amp; EWM
                </p>

                <p style="font-size: 0.95rem; margin-bottom: 6px; color:#334155;">Se otorga la presente acreditación a:</p>
                <h2 style="color: #0A0F1C; font-size: 1.9rem; border-bottom: 2px solid #06B6D4; display:inline-block; padding: 0 18px 4px 18px; margin-bottom: 8px;">
                    ${userName}
                </h2>
                <p style="font-size: 0.85rem; color: #0284C7; font-weight: bold; margin-bottom: 18px;">${userRole}</p>

                <p style="font-size: 0.95rem; color:#334155; line-height: 1.5; max-width: 480px; margin: 0 auto 14px auto;">
                    Por demostrar competencias técnicas operativas y de configuración en procesos de recepción, almacenamiento, picking y monitorización en <strong>SAP Extended Warehouse Management</strong>.
                </p>

                <div style="background:#F0F9FF; border:1px solid #BAE6FD; border-radius:8px; padding:10px 18px; display:inline-block; margin: 10px 0 24px 0;">
                    <span style="font-size:0.75rem; color:#0369A1; font-weight:800; text-transform:uppercase; display:block;">Índice de Completitud</span>
                    <span style="font-size:2.2rem; font-weight:900; color:#0284C7;">${pct}%</span>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 2px solid #E2E8F0; padding-top: 14px; margin-top: 10px;">
                    <div style="text-align:left;">
                        <p style="font-weight: bold; margin:0; font-size:0.8rem; color:#0A0F1C;">Fecha de Expedición</p>
                        <p style="margin:0; font-size:0.85rem; color:#475569;">${date}</p>
                    </div>
                    <div style="text-align:right;">
                        <p style="font-weight: bold; margin:0; font-size:0.8rem; color:#0A0F1C;">Dirección Académica</p>
                        <p class="signature">MechaRidds &amp; Mechanizer</p>
                    </div>
                </div>
            </div>

            <div class="no-print" style="display: flex; gap: 10px; margin-top: 16px;">
                <button class="btn btn-primary" type="button" onclick="window.print()" style="flex:1;">🖨️ Guardar PDF / Imprimir</button>
                <button class="btn btn-outline" type="button" onclick="UIRenderer.renderProfile()" style="flex:1;">← Volver al Perfil</button>
            </div>
        `;
        container.scrollTop = 0;
    },

    async scheduleReminder() {
        const timeInput = document.getElementById('study-time') ? document.getElementById('study-time').value : '';
        const statusText = document.getElementById('reminder-status');
        if (!timeInput || !statusText) return;

        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
            try {
                const LocalNotifications = window.Capacitor.Plugins.LocalNotifications;
                const permStatus = await LocalNotifications.requestPermissions();
                if (permStatus.display === 'granted') {
                    const [hours, minutes] = timeInput.split(':');
                    await LocalNotifications.schedule({
                        notifications: [{
                            title: '¡Hora de entrenar en SAP EWM!',
                            body: 'Tu terminal S/4HANA te espera para avanzar de semestre.',
                            id: 1,
                            schedule: {
                                on: { hour: parseInt(hours, 10), minute: parseInt(minutes, 10) },
                                allowWhileIdle: true,
                                repeats: true
                            }
                        }]
                    });
                    statusText.innerText = `✅ Alarma diaria programada a las ${timeInput}`;
                    statusText.style.display = 'block';
                    if (typeof visualUI !== 'undefined') visualUI.showMascot(`¡Recordatorio activado para las ${timeInput}!`, 4);
                } else {
                    alert('Por favor habilita los permisos de notificación en los ajustes de tu teléfono.');
                }
            } catch (e) {
                console.error('Error programando notificación:', e);
            }
        } else {
            statusText.innerText = `✅ Recordatorio registrado para las ${timeInput}`;
            statusText.style.display = 'block';
            if (typeof visualUI !== 'undefined') visualUI.showMascot(`¡Alarma configurada a las ${timeInput}!`, 3);
        }
    },

    factoryReset() {
        if (confirm('⚠️ ATENCIÓN: Se borrará todo tu progreso, perfil y apuntes. ¿Estás seguro?')) {
            if (confirm('🚨 ÚLTIMA ADVERTENCIA: Esta acción no se puede deshacer. ¿Confirmar borrado total?')) {
                localStorage.clear();
                window.location.reload();
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
                this.saveTimeout = setTimeout(() => { this.saveNotes(); }, 800);
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
        const storageKey = `logistica_pro_notes_${this.currentLessonId}`;
        localStorage.setItem(storageKey, this.textarea.value);
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
            alert('No hay apuntes para exportar en esta lección.');
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
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('logistica_pro_theme', 'dark');
            if (this.themeBtn) this.themeBtn.innerText = '🌞';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('logistica_pro_theme', 'light');
            if (this.themeBtn) this.themeBtn.innerText = '🌙';
        }
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
        }, 400);
    }

    toggleMascot() {
        this.currentMascot = this.currentMascot === 'mecharidds' ? 'mechanizer' : 'mecharidds';
        localStorage.setItem('logistica_pro_mascot', this.currentMascot);
        this.updateMascotUI();

        const userName = localStorage.getItem('logistica_username');
        const saludo = this.currentMascot === 'mecharidds'
            ? `¡MechaRidds en línea${userName ? ', ' + userName : ''}! Listo para el análisis.`
            : `¡Mechanizer lista${userName ? ', ' + userName : ''}! Agregando estilo a los datos.`;
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
                this.mascotName.style.color = '#000';
            }
            if (this.mascotBubble) this.mascotBubble.style.borderColor = '#f48fb1';
        }
    }

    showMascot(message, durationInSeconds = 4) {
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

window.addEventListener('DOMContentLoaded', () => {
    // Saludo inicial personalizado
    setTimeout(() => {
        if (typeof visualUI !== 'undefined') {
            const storedName = localStorage.getItem('logistica_username');
            const greeting = storedName
                ? `¡Hola de nuevo, ${storedName}! Sistemas S/4HANA en línea.`
                : '¡Sistemas online! Registra tu nombre en Perfil para personalizar tus certificados.';
            visualUI.showMascot(greeting, 4);
        }
    }, 900);

    // Interceptor global de Audio (Respeta switch de sonido y slider de volumen)
    if (typeof AudioEngine !== 'undefined' && AudioEngine.play) {
        const originalPlay = AudioEngine.play.bind(AudioEngine);
        AudioEngine.play = (soundName) => {
            const isEnabled = localStorage.getItem('logistica_sound') !== 'false';
            const vol = parseInt(localStorage.getItem('logistica_vol') || '100', 10) / 100;
            if (isEnabled && vol > 0) {
                if (AudioEngine.sounds && AudioEngine.sounds[soundName]) {
                    AudioEngine.sounds[soundName].volume = vol;
                }
                originalPlay(soundName);
            }
        };
    }

    // Interceptor global de Haptics / Vibración
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.btn, .quiz-opt, .module-card, .nav-btn, .mascot-switch, .theme-btn')) {
            const vibEnabled = localStorage.getItem('logistica_vib') !== 'false';
            const vibLevel = localStorage.getItem('logistica_vib_level') || 'MEDIUM';
            if (vibEnabled && typeof UIRenderer !== 'undefined') {
                UIRenderer.triggerHaptic(vibLevel);
            }
        }
    });
});
