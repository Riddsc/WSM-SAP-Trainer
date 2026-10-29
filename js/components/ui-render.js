/**
 * Logística Pro - Pantallas de la app: inicio, lecciones, exámenes,
 * glosario de transacciones, perfil, reporte y constancia de avance.
 */
let currentLessonState = { id: null, page: 0, answers: [], activeExam: [] };

function shuffleArray(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

const UIRenderer = {
    moduloActual: null,
    transacciones: null,

    contenedor() {
        return document.getElementById('view-container');
    },

    mostrar(html) {
        const c = this.contenedor();
        if (!c) return null;
        c.innerHTML = html;
        c.scrollTop = 0;
        return c;
    },

    nombreUsuario(porDefecto = '') {
        return AppState.perfil.nombre || porDefecto;
    },

    mascota(mensaje, segundos) {
        if (typeof visualUI !== 'undefined') visualUI.showMascot(mensaje, segundos);
    },

    actualizarBarraProgreso() {
        const pct = AppState.getProgressPercentage();
        const barra = document.getElementById('progress-bar');
        const texto = document.getElementById('progress-text');
        if (barra) barra.style.width = `${pct}%`;
        if (texto) texto.textContent = `${pct}%`;
    },

    renderError(titulo, detalle) {
        this.mostrar(`
            <div class="review-box" style="border-color:var(--danger); margin-top:24px;">
                <h4 style="color:var(--danger);">⚠️ ${escaparHTML(titulo)}</h4>
                <p>${escaparHTML(detalle)}</p>
            </div>
        `);
    },

    renderCargando() {
        this.mostrar(`<p class="tag-subtitle" style="margin-top:24px;">Cargando…</p>`);
    },

    // ==========================================
    // INICIO: PENSUM
    // ==========================================
    renderDashboard() {
        this.moduloActual = null;
        const nombre = this.nombreUsuario();
        const subtitulo = nombre ? `Bienvenido(a), ${escaparHTML(nombre)}` : 'Ruta de especialización SAP';

        let html = `
            <span class="tag-subtitle">${subtitulo}</span>
            <h2 class="main-title">Módulos de la maestría</h2>
        `;

        ContentStore.catalogo.forEach((mod, idx) => {
            const completado = AppState.isCompleted(mod.id);
            const bloqueado = !!mod.requisito && !AppState.isCompleted(mod.requisito);
            const puntaje = AppState.getScore(mod.id);
            const tipo = mod.tipo === 'lab' ? 'Laboratorio' : 'Teoría';
            const estado = completado ? 'Aprobado' : (bloqueado ? 'Bloqueado' : 'Disponible');

            html += `
                <button type="button" class="module-card ${bloqueado ? 'locked' : ''} ${completado ? 'completed' : ''}"
                     ${bloqueado ? 'disabled aria-disabled="true"' : `onclick="Router.openModule('${mod.id}')"`}
                     aria-label="${escaparHTML(mod.titulo)}. ${estado}">
                    <div class="card-top">
                        <span class="${mod.tipo === 'lab' ? 'card-badge lab' : 'card-badge'}">Semestre ${mod.semestre} • ${tipo}</span>
                        <span aria-hidden="true">${completado ? '✅' : (bloqueado ? '🔒' : '▶️')}</span>
                    </div>
                    <h3>${idx + 1}. ${escaparHTML(mod.titulo)}</h3>
                    ${puntaje !== null ? `<p class="card-score">Mejor puntaje: ${puntaje}%</p>` : ''}
                </button>
            `;
        });

        this.mostrar(html);
    },

    // ==========================================
    // LECCIONES Y LABORATORIOS
    // ==========================================
    async renderLesson(itemId, pageIndex = 0) {
        this.moduloActual = itemId;
        let mod;
        if (!ContentStore.cache[itemId]) this.renderCargando();
        try {
            mod = await ContentStore.cargar(itemId);
        } catch (e) {
            this.renderError('No se pudo abrir el módulo.', 'Revisa tu conexión si usas la versión web, o intenta de nuevo.');
            return;
        }
        // Si el estudiante cambió de pantalla mientras cargaba, no se dibuja nada
        if (this.moduloActual !== itemId || Router.currentView !== 'lesson') return;

        currentLessonState.id = itemId;
        currentLessonState.page = pageIndex;
        smartNotes.setContext(itemId, mod.titulo);

        if (mod.tipo === 'theory' && mod.paginas) {
            const ultima = pageIndex === mod.paginas.length - 1;
            this.mostrar(`
                <div class="lesson-content" style="animation: fadeIn 0.4s;">
                    <div class="page-indicator">Página ${pageIndex + 1} de ${mod.paginas.length}</div>
                    <span class="tag-subtitle">Semestre ${mod.semestre}</span>
                    <h2 style="margin-top: 10px; border:none; padding:0;">${escaparHTML(mod.titulo)}</h2>

                    ${mod.paginas[pageIndex]}

                    <div class="pagination-controls" style="margin-top: 32px; display:flex; gap:10px;">
                        ${pageIndex > 0 ? `<button class="btn btn-outline" type="button" onclick="UIRenderer.cambiarPagina('${itemId}', ${pageIndex - 1})">← Anterior</button>` : ''}
                        ${!ultima ? `<button class="btn btn-primary" type="button" onclick="UIRenderer.cambiarPagina('${itemId}', ${pageIndex + 1})">Siguiente →</button>` : ''}
                    </div>

                    ${ultima ? `
                        <div class="review-box" style="margin-top:26px;">
                            <h4>🔄 Resumen</h4>
                            <p>${mod.resumen || ''}</p>
                        </div>
                        <button class="btn btn-primary" type="button" style="margin-top: 18px;" onclick="UIRenderer.startExam('${itemId}')">📝 Presentar el examen</button>
                    ` : ''}
                    <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.renderDashboard()">← Volver al pensum</button>
                </div>
            `);
        } else if (mod.tipo === 'lab') {
            this.mostrar(`
                <div class="lesson-content" style="text-align: center; padding-top: 30px;">
                    <span class="tag-subtitle">Semestre ${mod.semestre} • Laboratorio</span>
                    <h2 style="border:none; padding:0;">${escaparHTML(mod.titulo)}</h2>
                    <p style="margin-bottom: 26px;">${escaparHTML(mod.descripcion)}</p>
                    <div style="font-size: 3.8rem; margin-bottom: 20px;" aria-hidden="true">💻</div>
                    <button class="btn btn-primary" type="button" onclick="SAPEngine.open('${mod.id}')">Iniciar terminal</button>
                    <button class="btn btn-outline" type="button" style="margin-top: 24px;" onclick="Router.renderDashboard()">← Volver al pensum</button>
                </div>
            `);
        }
    },

    cambiarPagina(itemId, pagina) {
        AudioEngine.play('click');
        this.renderLesson(itemId, pagina);
    },

    // ==========================================
    // EXÁMENES
    // ==========================================
    async startExam(itemId) {
        AudioEngine.play('click');
        const mod = await ContentStore.cargar(itemId);
        Router.irA('exam');

        currentLessonState.id = itemId;
        currentLessonState.activeExam = shuffleArray(mod.examen).map(p => ({
            ...p,
            opciones: shuffleArray(p.opciones)
        }));
        currentLessonState.answers = new Array(currentLessonState.activeExam.length).fill(null);

        let html = `
            <div class="exam-header">
                <h2 style="color:var(--text-primary); border:none; padding:0; margin-bottom:8px;">Examen: ${escaparHTML(mod.titulo)}</h2>
                <p style="color:var(--text-muted); font-size:0.9rem;">Necesitas 80 % para aprobar. Las preguntas y opciones cambian de orden en cada intento.</p>
            </div>
        `;

        currentLessonState.activeExam.forEach((p, qi) => {
            const opciones = p.opciones.map((op, oi) => `
                <button type="button" class="quiz-opt" id="q${qi}-o${oi}" onclick="UIRenderer.selectAnswer(${qi}, ${oi})">
                    ${op.texto}
                </button>
            `).join('');
            html += `
                <div class="quiz-container">
                    <div class="quiz-q">${qi + 1}. ${p.pregunta}</div>
                    ${opciones}
                </div>
            `;
        });

        html += `
            <button class="btn btn-primary" type="button" style="margin-top:24px;" onclick="UIRenderer.submitExam('${itemId}')">Entregar examen</button>
            <div id="exam-results" style="margin-top: 20px;"></div>
            <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.atras()">← Salir del examen</button>
        `;
        this.mostrar(html);
    },

    selectAnswer(qi, oi) {
        AudioEngine.play('click');
        document.querySelectorAll(`[id^="q${qi}-o"]`).forEach(el => el.classList.remove('selected'));
        const elegido = document.getElementById(`q${qi}-o${oi}`);
        if (elegido) elegido.classList.add('selected');
        currentLessonState.answers[qi] = oi;
    },

    submitExam(itemId) {
        const resultados = document.getElementById('exam-results');
        if (!resultados) return;

        const sinResponder = currentLessonState.answers.filter(a => a === null).length;
        if (sinResponder > 0) {
            AudioEngine.play('error');
            resultados.innerHTML = `<div class="review-box" style="border-color:var(--warning);"><h4>⚠️ Faltan respuestas</h4><p>Te faltan ${sinResponder} pregunta(s) por responder.</p></div>`;
            return;
        }

        const total = currentLessonState.activeExam.length;
        const buenas = currentLessonState.activeExam.filter((p, i) => p.opciones[currentLessonState.answers[i]].correcta).length;
        const puntaje = Math.round((buenas / total) * 100);
        const nombre = this.nombreUsuario('estudiante');

        if (puntaje >= 80) {
            AudioEngine.play('success');
            NativeBridge.vibrarAviso('SUCCESS');
            AppState.markComplete(itemId);
            AppState.saveScore(itemId, puntaje);
            this.mascota(`¡Excelente trabajo, ${nombre}! Aprobaste con ${puntaje}%.`, 5);
            resultados.innerHTML = `
                <div class="review-box" style="border-color:var(--success); background:rgba(16,185,129,0.1);">
                    <h4 style="color:var(--success);">✅ Aprobado (${puntaje}%)</h4>
                    <p>${buenas} de ${total} respuestas correctas. Siguiente módulo desbloqueado.</p>
                </div>
                <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.renderDashboard()">Volver al pensum</button>
            `;
        } else {
            AudioEngine.play('error');
            NativeBridge.vibrarAviso('ERROR');
            this.mascota(`Obtuviste ${puntaje}%, ${nombre}. ¡Repasa la teoría e inténtalo de nuevo!`, 5);
            resultados.innerHTML = `
                <div class="review-box" style="border-color:var(--danger); background:rgba(239,68,68,0.1);">
                    <h4 style="color:var(--danger);">❌ No aprobado (${puntaje}%)</h4>
                    <p>${buenas} de ${total} respuestas correctas. Se necesita 80 %.</p>
                </div>
                <button class="btn btn-outline" type="button" style="margin-top: 16px;" onclick="Router.irA('lesson','nav-academy'); UIRenderer.renderLesson('${itemId}', 0)">Repasar la teoría</button>
            `;
        }
        // Marca visual de aciertos y errores después de entregar
        currentLessonState.activeExam.forEach((p, qi) => {
            p.opciones.forEach((op, oi) => {
                const el = document.getElementById(`q${qi}-o${oi}`);
                if (!el) return;
                el.disabled = true;
                if (op.correcta) el.classList.add('correct');
                else if (currentLessonState.answers[qi] === oi) el.classList.add('wrong');
            });
        });
    },

    // ==========================================
    // GLOSARIO DE TRANSACCIONES (solo verificadas)
    // ==========================================
    async renderGlossary() {
        this.mostrar(`
            <span class="tag-subtitle">Diccionario técnico SAP</span>
            <h2 class="main-title">Transacciones (T-Codes)</h2>
            <div class="settings-card" style="margin-bottom: 18px; padding: 14px;">
                <label for="tcode-search" class="sr-only">Buscar transacción</label>
                <input type="search" id="tcode-search" class="modern-input" placeholder="🔍 Buscar (ej. MIGO, MON, inventario)…" oninput="UIRenderer.filterGlossary(this.value)">
            </div>
            <div id="tcode-list-container"><p class="tag-subtitle">Cargando…</p></div>
        `);

        if (!this.transacciones) {
            try {
                const r = await fetch('content/transacciones-verificadas.json');
                this.transacciones = (await r.json()).transacciones;
            } catch (e) {
                document.getElementById('tcode-list-container').innerHTML = '<p>No se pudo cargar el glosario.</p>';
                return;
            }
        }
        if (Router.currentView !== 'glossary') return;
        this.filterGlossary('');
        const nombre = this.nombreUsuario();
        this.mascota(nombre ? `${nombre}, estas son transacciones reales de SAP, todas verificadas.` : 'Usa el buscador para filtrar transacciones.', 4);
    },

    filterGlossary(consulta = '') {
        const lista = document.getElementById('tcode-list-container');
        if (!lista || !this.transacciones) return;
        const q = consulta.trim().toLowerCase();
        const filtradas = this.transacciones.filter(t =>
            t.codigo.toLowerCase().includes(q) ||
            t.modulo.toLowerCase().includes(q) ||
            t.descripcion.toLowerCase().includes(q)
        );

        if (filtradas.length === 0) {
            lista.innerHTML = `
                <div class="review-box">
                    <h4>Sin coincidencias</h4>
                    <p>No hay transacciones para "${escaparHTML(consulta)}".</p>
                </div>`;
            return;
        }
        lista.innerHTML = filtradas.map(t => `
            <div class="module-card" style="cursor:default;">
                <div class="card-top">
                    <span class="${t.modulo === 'EWM' ? 'card-badge lab' : 'card-badge'}">${escaparHTML(t.modulo)}</span>
                </div>
                <h3 style="color:${t.modulo === 'EWM' ? 'var(--warning)' : 'var(--cyan)'}; font-family:'Courier New', monospace; font-size:1.2rem;">${escaparHTML(t.codigo)}</h3>
                <p>${escaparHTML(t.descripcion)}</p>
            </div>
        `).join('');
    },

    // ==========================================
    // PERFIL Y AJUSTES
    // ==========================================
    renderProfile() {
        const total = ContentStore.total();
        const aprobados = ContentStore.catalogo.filter(m => AppState.isCompleted(m.id)).length;
        const pct = AppState.getProgressPercentage();
        const { nombre, rol } = AppState.perfil;
        const a = AppState.ajustes;
        const version = window.APP_VERSION || 'desarrollo';

        this.mostrar(`
            <span class="tag-subtitle">Centro de mando</span>
            <h2 class="main-title">Perfil y configuración</h2>

            <div class="settings-grid">
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">👤 Datos del estudiante</span>
                        <span class="status-badge ${nombre ? 'status-done' : 'status-pend'}">${nombre ? 'Activo' : 'Sin registrar'}</span>
                    </div>
                    <p style="font-size:0.84rem; color:var(--text-muted); margin-bottom:12px;">
                        Tu nombre aparece en los saludos de MechaRidds y Mechanizer, en el reporte y en la constancia de avance.
                    </p>
                    <div style="display:flex; flex-direction:column; gap:10px;">
                        <label for="user-name-input" class="sr-only">Nombre completo</label>
                        <input type="text" id="user-name-input" class="modern-input" placeholder="Nombre completo (ej. Juan Pérez)" value="${escaparHTML(nombre)}" maxlength="60">
                        <label for="user-role-input" class="sr-only">Cargo o meta</label>
                        <input type="text" id="user-role-input" class="modern-input" placeholder="Cargo o meta (ej. Analista de inventarios)" value="${escaparHTML(rol)}" maxlength="60">
                        <button class="btn btn-primary" type="button" onclick="UIRenderer.saveProfileName()">💾 Guardar perfil</button>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">📊 Avance</span>
                        <span style="font-weight:800; color:var(--cyan);">${pct}%</span>
                    </div>
                    <div class="mini-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                        <div style="width:${pct}%;"></div>
                    </div>
                    <div class="stat-kpi-grid">
                        <div class="stat-kpi-box"><span class="stat-kpi-val">${aprobados}</span><span class="stat-kpi-lbl">Aprobados</span></div>
                        <div class="stat-kpi-box"><span class="stat-kpi-val">${total - aprobados}</span><span class="stat-kpi-lbl">Restantes</span></div>
                        <div class="stat-kpi-box"><span class="stat-kpi-val">${total}</span><span class="stat-kpi-lbl">Total módulos</span></div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:14px;">
                        <button class="btn btn-outline" type="button" style="border-color:var(--cyan); color:var(--cyan);" onclick="UIRenderer.generateReport()">📋 Ver reporte de módulos</button>
                        <button class="btn btn-primary" type="button" onclick="UIRenderer.generateCertificate()">🎓 Ver constancia de avance</button>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">🎛️ Sonido y vibración</span>
                    </div>
                    <div class="settings-row">
                        <div>
                            <span class="settings-label">Efectos de sonido</span>
                            <span class="settings-sublabel">Sonidos al navegar y evaluar</span>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="t-sound" ${a.sonido ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()" aria-label="Efectos de sonido">
                            <span class="slider-toggle"></span>
                        </label>
                    </div>
                    <div class="settings-row">
                        <label for="t-vol" class="settings-label" style="font-size:0.85rem;">Volumen (<span id="vol-label">${a.volumen}%</span>)</label>
                        <input type="range" id="t-vol" min="0" max="100" step="5" value="${a.volumen}" style="width:55%;"
                               oninput="document.getElementById('vol-label').innerText = this.value + '%'" onchange="UIRenderer.saveHardwareSettings(); AudioEngine.play('click')">
                    </div>
                    <div class="settings-row" style="border-top:1px solid var(--border-light); margin-top:8px; padding-top:14px;">
                        <div>
                            <span class="settings-label">Vibración</span>
                            <span class="settings-sublabel">Vibración al tocar botones</span>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="t-vib" ${a.vibracion ? 'checked' : ''} onchange="UIRenderer.saveHardwareSettings()" aria-label="Vibración">
                            <span class="slider-toggle"></span>
                        </label>
                    </div>
                    <div class="settings-row">
                        <label for="t-vib-lvl" class="settings-label" style="font-size:0.85rem;">Intensidad</label>
                        <select id="t-vib-lvl" class="modern-input" style="width:55%; padding:8px 10px;" onchange="UIRenderer.saveHardwareSettings()">
                            <option value="LIGHT" ${a.nivelVibracion === 'LIGHT' ? 'selected' : ''}>Suave</option>
                            <option value="MEDIUM" ${a.nivelVibracion === 'MEDIUM' ? 'selected' : ''}>Media</option>
                            <option value="HEAVY" ${a.nivelVibracion === 'HEAVY' ? 'selected' : ''}>Fuerte</option>
                        </select>
                    </div>
                </div>

                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">⏰ Recordatorio diario</span>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <label for="study-time" class="sr-only">Hora del recordatorio</label>
                        <input type="time" id="study-time" class="time-picker-input" style="flex:1;" value="${a.recordatorio || '20:00'}">
                        <button class="btn btn-outline" type="button" style="width:auto; padding:11px 18px;" onclick="UIRenderer.scheduleReminder()">Activar</button>
                    </div>
                    <p id="reminder-status" class="reminder-status" ${a.recordatorio ? '' : 'hidden'}>${a.recordatorio ? `✅ Recordatorio diario a las ${a.recordatorio}` : ''}</p>
                    ${a.recordatorio ? `<button class="btn btn-outline" type="button" style="margin-top:10px;" onclick="UIRenderer.cancelReminder()">Desactivar recordatorio</button>` : ''}
                </div>

                <div class="settings-card" style="border-color:rgba(239,68,68,0.3);">
                    <div class="settings-card-header">
                        <span class="settings-card-title" style="color:var(--danger);">💾 Respaldo y restauración</span>
                    </div>
                    <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:12px;">
                        El respaldo incluye progreso, puntajes, apuntes, perfil y ajustes.
                    </p>
                    <div style="display:flex; gap:10px; margin-bottom:12px;">
                        <button class="btn btn-outline" type="button" style="flex:1;" onclick="AppState.exportBackup()">⬇️ Guardar respaldo</button>
                        <input type="file" id="backup-file" accept=".json,application/json" style="display:none;" onchange="AppState.importBackup(event)">
                        <button class="btn btn-outline" type="button" style="flex:1;" onclick="document.getElementById('backup-file').click()">⬆️ Restaurar</button>
                    </div>
                    <button class="btn btn-danger" type="button" onclick="UIRenderer.factoryReset()">⚠️ Borrar todo el progreso</button>
                </div>

                <p class="app-version">Logística Pro · versión ${escaparHTML(version)}<br>
                App de estudio independiente; no está afiliada ni respaldada por SAP SE. SAP, S/4HANA y EWM son marcas de SAP SE.</p>
            </div>
        `);
    },

    saveProfileName() {
        const nombre = (document.getElementById('user-name-input')?.value || '').trim();
        const rol = (document.getElementById('user-role-input')?.value || '').trim();
        if (!nombre) {
            this.mascota('Escribe tu nombre antes de guardar.', 3);
            return;
        }
        AppState.setPerfil(nombre, rol);
        AudioEngine.play('success');
        this.mascota(`¡Perfil guardado, ${nombre}!`, 4);
        this.renderProfile();
    },

    saveHardwareSettings() {
        const leer = (id, porDefecto) => {
            const el = document.getElementById(id);
            if (!el) return porDefecto;
            return el.type === 'checkbox' ? el.checked : el.value;
        };
        AppState.setAjuste('sonido', leer('t-sound', true));
        AppState.setAjuste('volumen', Number(leer('t-vol', 100)));
        AppState.setAjuste('vibracion', leer('t-vib', true));
        AppState.setAjuste('nivelVibracion', leer('t-vib-lvl', 'MEDIUM'));
        NativeBridge.vibrar(AppState.ajustes.nivelVibracion);
    },

    triggerHaptic(nivel) {
        NativeBridge.vibrar(nivel || AppState.ajustes.nivelVibracion);
    },

    async scheduleReminder() {
        const hora = document.getElementById('study-time')?.value;
        const estado = document.getElementById('reminder-status');
        if (!hora || !estado) return;
        const resultado = await NativeBridge.programarRecordatorio(hora);
        estado.hidden = false;
        estado.textContent = resultado.mensaje;
        estado.style.color = resultado.ok ? 'var(--success)' : 'var(--warning)';
        if (resultado.ok) {
            AppState.setAjuste('recordatorio', hora);
            this.mascota(`¡Recordatorio activado para las ${hora}!`, 4);
            this.renderProfile();
        }
    },

    async cancelReminder() {
        await NativeBridge.cancelarRecordatorio();
        AppState.setAjuste('recordatorio', '');
        this.renderProfile();
    },

    factoryReset() {
        if (confirm('⚠️ Se borrará todo: progreso, perfil y apuntes. ¿Continuar?') &&
            confirm('🚨 Última advertencia: esto no se puede deshacer. ¿Borrar todo?')) {
            NativeBridge.cancelarRecordatorio();
            AppState.borrarTodo();
            window.location.reload();
        }
    },

    // ==========================================
    // DOCUMENTOS: REPORTE Y CONSTANCIA
    // ==========================================
    datosDocumento() {
        return {
            nombre: this.nombreUsuario('Estudiante no registrado'),
            rol: AppState.perfil.rol || 'Estudiante de logística con SAP',
            fecha: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
            pct: AppState.getProgressPercentage(),
            aprobados: ContentStore.catalogo.filter(m => AppState.isCompleted(m.id)).length,
            total: ContentStore.total()
        };
    },

    htmlReporte() {
        const d = this.datosDocumento();
        const filas = ContentStore.catalogo.map((mod, i) => {
            const completado = AppState.isCompleted(mod.id);
            const bloqueado = !!mod.requisito && !AppState.isCompleted(mod.requisito);
            const puntaje = AppState.getScore(mod.id);
            let estado = '<span class="status-badge status-pend">Pendiente</span>';
            if (completado) estado = '<span class="status-badge status-done">Aprobado</span>';
            else if (bloqueado) estado = '<span class="status-badge status-lock">Bloqueado</span>';
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td><strong>${escaparHTML(mod.titulo)}</strong>
                        <span class="report-sub">Semestre ${mod.semestre} • ${mod.tipo === 'lab' ? 'Laboratorio' : 'Teoría'}</span></td>
                    <td>${puntaje !== null ? puntaje + '%' : '—'}</td>
                    <td>${estado}</td>
                </tr>`;
        }).join('');

        return `
            <span class="tag-subtitle">Kárdex académico</span>
            <h2 class="main-title">Reporte de avance</h2>
            <div class="settings-card">
                <p><strong>Estudiante:</strong> ${escaparHTML(d.nombre)}</p>
                <p><strong>Rol / meta:</strong> ${escaparHTML(d.rol)}</p>
                <p><strong>Fecha:</strong> ${d.fecha}</p>
                <p><strong>Avance global:</strong> <span style="color:var(--cyan); font-weight:800;">${d.pct}% (${d.aprobados} de ${d.total} módulos)</span></p>
            </div>
            <div class="settings-card" style="margin-top:16px; overflow-x:auto; padding:12px;">
                <table class="report-table">
                    <thead><tr><th>#</th><th>Módulo</th><th>Puntaje</th><th>Estado</th></tr></thead>
                    <tbody>${filas}</tbody>
                </table>
            </div>`;
    },

    htmlConstancia() {
        const d = this.datosDocumento();
        const tipo = d.pct >= 100 ? 'CONSTANCIA DE FINALIZACIÓN' : 'CONSTANCIA DE AVANCE';
        return `
            <div class="cert-container">
                <div style="font-size: 2.8rem; margin-bottom: 8px;" aria-hidden="true">🎓</div>
                <h1>${tipo}</h1>
                <p class="cert-org">Logística Pro • Maestría práctica en SAP para logística</p>
                <p class="cert-text">Se deja constancia de que</p>
                <h2 class="cert-name">${escaparHTML(d.nombre)}</h2>
                <p class="cert-role">${escaparHTML(d.rol)}</p>
                <p class="cert-text cert-body">
                    ha completado ${d.aprobados} de ${d.total} módulos de estudio sobre procesos de recepción, almacenamiento,
                    picking, despacho y control de bodega con <strong>SAP S/4HANA</strong>.
                </p>
                <div class="cert-score">
                    <span>Avance</span>
                    <strong>${d.pct}%</strong>
                </div>
                <div class="cert-footer">
                    <div><p class="cert-label">Fecha de expedición</p><p>${d.fecha}</p></div>
                    <div style="text-align:right;"><p class="cert-label">Tutores virtuales</p><p class="signature">MechaRidds &amp; Mechanizer</p></div>
                </div>
                <p class="cert-disclaimer">Documento de estudio personal. No es una certificación oficial de SAP. Logística Pro no está afiliada ni respaldada por SAP SE.</p>
            </div>`;
    },

    botonesDocumento(tipo) {
        const textoGuardar = NativeBridge.esApp() ? '📤 Guardar o compartir' : '🖨️ Imprimir / guardar PDF';
        return `
            <div class="no-print" style="display:flex; gap:10px; margin-top:20px;">
                <button class="btn btn-primary" type="button" style="flex:1;" onclick="UIRenderer.exportarDocumento('${tipo}')">${textoGuardar}</button>
                <button class="btn btn-outline" type="button" style="flex:1;" onclick="Router.atras()">← Volver al perfil</button>
            </div>
            ${NativeBridge.esApp() ? '<p class="doc-hint no-print">Se guarda como página web. Ábrela en el navegador del celular y usa "Imprimir → Guardar como PDF".</p>' : ''}`;
    },

    generateReport() {
        Router.irA('report');
        this.mostrar(this.htmlReporte() + this.botonesDocumento('reporte'));
    },

    generateCertificate() {
        Router.irA('certificate');
        this.mostrar(this.htmlConstancia() + this.botonesDocumento('constancia'));
    },

    /** En el navegador imprime; en el APK guarda un archivo HTML autónomo y lo comparte. */
    async exportarDocumento(tipo) {
        if (!NativeBridge.esApp()) {
            window.print();
            return;
        }
        const cuerpo = tipo === 'constancia' ? this.htmlConstancia() : this.htmlReporte();
        let estilos = '';
        try {
            estilos = await (await fetch('css/components.css')).text();
        } catch (e) { /* sin estilos si falla */ }
        const titulo = tipo === 'constancia' ? 'Constancia de avance' : 'Reporte de avance';
        const documento = `<!DOCTYPE html><html lang="es" data-theme="light"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${titulo} - Logística Pro</title>
<style>${estilos} body{overflow:auto;padding:20px;background:#fff;}</style></head><body>${cuerpo}</body></html>`;
        const nombre = `LogisticaPro_${tipo === 'constancia' ? 'Constancia' : 'Reporte'}_${new Date().toISOString().split('T')[0]}.html`;
        await NativeBridge.guardarArchivo(nombre, documento, 'text/html');
    }
};

// ==========================================
// APUNTES (guardados dentro del estado único)
// ==========================================
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
        this.currentLessonTitle = 'Apuntes generales';
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
                this.saveTimeout = setTimeout(() => this.saveNotes(), 800);
            });
        }
    }

    estaAbierto() {
        return !!this.overlay && !this.overlay.classList.contains('notes-hidden');
    }

    setContext(id, titulo) {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveNotes();
        }
        this.currentLessonId = id || 'general';
        this.currentLessonTitle = titulo || 'Apuntes generales';
        if (this.titleText) this.titleText.innerText = this.currentLessonTitle;
        this.loadNotes();
    }

    openNotes() {
        this.loadNotes();
        if (this.overlay) this.overlay.classList.remove('notes-hidden');
    }

    closeNotes() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
            this.saveNotes();
        }
        if (this.overlay) this.overlay.classList.add('notes-hidden');
        if (this.textarea) this.textarea.blur();
    }

    saveNotes() {
        this.saveTimeout = null;
        if (!this.textarea) return;
        AppState.saveNote(this.currentLessonId, this.textarea.value);
        if (this.saveStatus) this.saveStatus.classList.add('visible');
    }

    loadNotes() {
        if (!this.textarea) return;
        this.textarea.value = AppState.getNote(this.currentLessonId);
        if (this.saveStatus) this.saveStatus.classList.remove('visible');
    }

    async exportToTXT() {
        if (!this.textarea) return;
        const contenido = this.textarea.value;
        if (!contenido.trim()) {
            alert('No hay apuntes para exportar en esta lección.');
            return;
        }
        const texto = `${this.currentLessonTitle}\n${'='.repeat(this.currentLessonTitle.length)}\n\n${contenido}\n`;
        await NativeBridge.guardarArchivo(`Apuntes_${this.currentLessonId}.txt`, texto, 'text/plain');
    }
}

const smartNotes = new SmartNotesManager();

// ==========================================
// TEMA Y ROBOTS GUÍA
// ==========================================
class VisualManager {
    constructor() {
        this.themeBtn = document.getElementById('theme-toggle-btn');
        this.mascotContainer = document.getElementById('mascot-container');
        this.mascotBubble = document.getElementById('mascot-message');
        this.mascotName = document.getElementById('mascot-name');
        this.mascotSwitchBtn = document.getElementById('mascot-switch-btn');
        this.svgMechaRidds = document.getElementById('svg-mecharidds');
        this.svgMechanizer = document.getElementById('svg-mechanizer');
        this.currentMascot = AppState.ajustes.mascota || 'mecharidds';
        this.mascotTimeout = null;
        this.initTheme();
        this.initMascot();
    }

    initTheme() {
        this.aplicarTema(AppState.ajustes.tema === 'light' ? 'light' : 'dark');
        if (this.themeBtn) this.themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    aplicarTema(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        if (this.themeBtn) {
            this.themeBtn.innerText = tema === 'light' ? '🌙' : '🌞';
            this.themeBtn.setAttribute('aria-label', tema === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro');
        }
    }

    toggleTheme() {
        const nuevo = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        this.aplicarTema(nuevo);
        AppState.setAjuste('tema', nuevo);
    }

    initMascot() {
        this.updateMascotUI();
        if (this.mascotSwitchBtn) this.mascotSwitchBtn.addEventListener('click', () => this.toggleMascot());
        setTimeout(() => {
            if (this.mascotContainer) this.mascotContainer.classList.remove('mascot-hidden');
            if (this.mascotBubble) this.mascotBubble.classList.add('bubble-hidden');
        }, 400);
    }

    toggleMascot() {
        this.currentMascot = this.currentMascot === 'mecharidds' ? 'mechanizer' : 'mecharidds';
        AppState.setAjuste('mascota', this.currentMascot);
        this.updateMascotUI();
        const nombre = AppState.perfil.nombre;
        const saludo = this.currentMascot === 'mecharidds'
            ? `¡MechaRidds en línea${nombre ? ', ' + nombre : ''}! Listo para explicar.`
            : `¡Mechanizer lista${nombre ? ', ' + nombre : ''}! Vamos a operar la bodega.`;
        this.showMascot(saludo, 4);
    }

    updateMascotUI() {
        const esRidds = this.currentMascot === 'mecharidds';
        if (this.svgMechaRidds) this.svgMechaRidds.style.display = esRidds ? 'block' : 'none';
        if (this.svgMechanizer) this.svgMechanizer.style.display = esRidds ? 'none' : 'block';
        if (this.mascotName) {
            this.mascotName.innerText = esRidds ? 'MechaRidds' : 'Mechanizer';
            this.mascotName.style.backgroundColor = esRidds ? 'var(--cyan)' : '#f48fb1';
            this.mascotName.style.color = '#000';
        }
        if (this.mascotBubble) this.mascotBubble.style.borderColor = esRidds ? 'var(--cyan)' : '#f48fb1';
    }

    showMascot(mensaje, segundos = 4) {
        if (!this.mascotContainer || !this.mascotBubble) return;
        this.mascotBubble.innerText = mensaje;
        this.mascotBubble.classList.remove('bubble-hidden');
        if (this.mascotTimeout) clearTimeout(this.mascotTimeout);
        this.mascotTimeout = setTimeout(() => this.mascotBubble.classList.add('bubble-hidden'), segundos * 1000);
    }
}

const visualUI = new VisualManager();

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const nombre = AppState.perfil.nombre;
        visualUI.showMascot(nombre
            ? `¡Hola de nuevo, ${nombre}! La bodega está lista.`
            : '¡Bienvenido! Registra tu nombre en Perfil para personalizar tu constancia.', 4);
    }, 900);

    // Vibración al tocar controles principales
    document.body.addEventListener('click', (e) => {
        if (e.target.closest('.btn, .quiz-opt, .module-card:not([disabled]), .nav-btn, .mascot-switch, .theme-btn')) {
            NativeBridge.vibrar(AppState.ajustes.nivelVibracion);
        }
    });
});
