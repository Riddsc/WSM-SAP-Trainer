/**
 * Logística Pro - Enrutador SPA y Control de Navegación Nativa
 */

const Router = {
    currentView: 'dashboard',

    init() {
        // Enlazar botones de navegación inferior
        document.getElementById('nav-academy').addEventListener('click', () => {
            AudioEngine.play('click');
            this.renderDashboard();
        });

        document.getElementById('nav-glossary').addEventListener('click', () => {
            AudioEngine.play('click');
            this.renderGlossary();
        });

        // Enlazar cierre de modal
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // Listener nativo para el botón Atrás de Android (Capacitor)
        if (window.Capacitor && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                const overlay = document.getElementById('global-overlay');
                if (!overlay.classList.contains('hidden')) {
                    this.closeModal();
                } else if (this.currentView !== 'dashboard') {
                    this.renderDashboard();
                } else {
                    window.Capacitor.Plugins.App.exitApp();
                }
            });
        }

        // Cargar vista inicial
        this.renderDashboard();
    },

    renderDashboard() {
        this.currentView = 'dashboard';
        this.setActiveNav('nav-academy');
        UIRenderer.renderDashboard();
    },

    openModule(id) {
        this.currentView = 'lesson';
        UIRenderer.renderLesson(id);
    },

    renderGlossary() {
        this.currentView = 'glossary';
        this.setActiveNav('nav-glossary');
        UIRenderer.renderGlossary();
    },

    closeModal() {
        AudioEngine.play('click');
        document.getElementById('global-overlay').classList.add('hidden');
    },

    setActiveNav(navId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(navId);
        if (activeBtn) activeBtn.classList.add('active');
    }
};

// Arrancar el enrutador al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
