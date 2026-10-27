/**
 * Logística Pro - Renderizador Dinámico de Interfaces (UI)
 */

const UIRenderer = {
    renderDashboard() {
        const container = document.getElementById('view-container');
        if (!container) return;

        let html = `
            <span class="tag-subtitle">Pensum de Maestría</span>
            <h2 class="main-title">Módulos Académicos</h2>
        `;

        syllabusData.forEach((mod, index) => {
            const isCompleted = AppState.isCompleted(mod.id);
            const isLocked = mod.req && !AppState.isCompleted(mod.req);

            let badgeClass = mod.type === 'lab' ? 'card-badge lab' : 'card-badge';
            let badgeText = mod.type === 'lab' ? 'Laboratorio SAP' : 'Teoría Avanzada';

            html += `
                <div class="module-card ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}"
                     onclick="!${isLocked} && Router.openModule('${mod.id}')">
                    <div class="card-top">
                        <span class="${badgeClass}">Semestre ${mod.semester} • ${badgeText}</span>
                        <span>${isCompleted ? '✅' : (isLocked ? '🔒' : '▶️')}</span>
                    </div>
                    <h3>${index + 1}. ${mod.title}</h3>
                    <p>${mod.description}</p>
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

                    <div class="quiz-container">
                        <div class="quiz-q">📝 Evaluación de Validación</div>
                        <p style="margin-bottom: 16px; font-weight: 600;">${mod.quiz.question}</p>
                        ${optionsHtml}
                        <div id="feedback-${itemId}" class="quiz-feedback"></div>
                    </div>

                    <button class="btn btn-outline" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="lesson-content" style="text-align: center; padding-top: 40px;">
                    <span class="tag-subtitle">Semestre ${mod.semester} • Práctica de Sistemas</span>
                    <h2 style="border:none; text-align:center; padding:0;">Laboratorio SAP S/4HANA</h2>
                    <p style="margin-bottom: 30px;">${mod.description}</p>
                    
                    <div style="font-size: 4rem; margin-bottom: 20px;">💻</div>

                    <button class="btn btn-primary" onclick="SAPEngine.open('${mod.id}')">
                        INICIAR TERMINAL SAP (T-CODE)
                    </button>
                    
                    <button class="btn btn-outline" onclick="Router.renderDashboard()">← Volver al Pensum</button>
                </div>
            `;
        }
        container.scrollTop = 0;
    },

    handleQuiz(itemId, optIndex, isCorrect) {
        AudioEngine.play('click');
        const mod = syllabusData.find(i => i.id === itemId);
        const feedback = document.getElementById(`feedback-${itemId}`);
        
        // Desactivar botones para prevenir doble clic
        document.querySelectorAll(`[id^="opt-${itemId}-"]`).forEach(b => b.style.pointerEvents = 'none');
        const selectedBtn = document.getElementById(`opt-${itemId}-${optIndex}`);

        feedback.style.display = 'block';

        if (isCorrect) {
            AudioEngine.play('success');
            selectedBtn.classList.add('correct');
            feedback.style.background = 'rgba(16,185,129,0.1)';
            feedback.style.color = 'var(--success)';
            feedback.style.border = '1px solid var(--success)';
            feedback.innerHTML = `✔️ <strong>¡Aprobado!</strong> ${mod.quiz.explanation}`;

            AppState.markComplete(itemId);
            setTimeout(() => Router.renderDashboard(), 3500);
        } else {
            AudioEngine.play('error');
            selectedBtn.classList.add('wrong');
            feedback.style.background = 'rgba(239,68,68,0.1)';
            feedback.style.color = 'var(--danger)';
            feedback.style.border = '1px solid var(--danger)';
            feedback.innerHTML = `❌ <strong>Incorrecto.</strong> Analiza de nuevo el concepto teórico e inténtalo otra vez.`;

            setTimeout(() => Router.openModule(itemId), 2500);
        }
    },

    renderGlossary() {
        const container = document.getElementById('view-container');
        if (!container) return;

        container.innerHTML = `
            <span class="tag-subtitle">Glosario Corporativo</span>
            <h2 class="main-title">Transacciones SAP Clave</h2>
            
            <div class="module-card">
                <div class="card-top"><span class="card-badge">MM / IM</span></div>
                <h3>MIGO</h3>
                <p>Movimiento de mercancías general. Utilizado para entradas de mercancía de proveedores, traslados y devoluciones.</p>
            </div>
            <div class="module-card">
                <div class="card-top"><span class="card-badge">WM / EWM</span></div>
                <h3>LT01</h3>
                <p>Creación manual de una Orden de Transporte (Transfer Order) para mover stock entre ubicaciones dentro del almacén.</p>
            </div>
            <div class="module-card">
                <div class="card-top"><span class="card-badge">MM / FI</span></div>
                <h3>MIRO</h3>
                <p>Verificación de facturas de proveedores contra la orden de compra y la recepción de mercancía (Entrada de Factura).</p>
            </div>
            <div class="module-card">
                <div class="card-top"><span class="card-badge">EWM Monitor</span></div>
                <h3>/SCWM/MON</h3>
                <p>El centro de control maestro en EWM para monitorear oleadas (Waves), colas de trabajo, tareas y recursos en tiempo real.</p>
            </div>
        `;
        container.scrollTop = 0;
    }
};
