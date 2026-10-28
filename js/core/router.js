/**
 * Logística Pro - Enrutador SPA y Control de Navegación Nativa
 */
const Router = {
    currentView: 'dashboard',

    init() {
        // 1. Botón Academia
        const navAcademy = document.getElementById('nav-academy');
        if (navAcademy) {
            navAcademy.addEventListener('click', () => {
                if (typeof AudioEngine !== 'undefined' && AudioEngine.play) AudioEngine.play('click');
                this.currentView = 'dashboard';
                this.setActiveNav('nav-academy');
                UIRenderer.renderDashboard();
            });
        }

        // 2. Botón Glosario (T-Codes)
        const navGlossary = document.getElementById('nav-glossary');
        if (navGlossary) {
            navGlossary.addEventListener('click', () => {
                if (typeof AudioEngine !== 'undefined' && AudioEngine.play) AudioEngine.play('click');
                this.currentView = 'glossary';
                this.setActiveNav('nav-glossary');
                UIRenderer.renderGlossary();
            });
        }

        // 3. Botón Perfil / Backups
        const navProfile = document.getElementById('nav-profile');
        if (navProfile) {
            navProfile.addEventListener('click', () => {
                if (typeof AudioEngine !== 'undefined' && AudioEngine.play) AudioEngine.play('click');
                this.currentView = 'profile';
                this.setActiveNav('nav-profile');
                UIRenderer.renderProfile();
            });
        }

        // 4. Cierre de ventanas modales (Con validación segura por si no está en el DOM)
        const closeModalBtn = document.getElementById('close-modal-btn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // 5. Control del botón "Atrás" físico del celular (Android nativo)
        if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                const overlay = document.getElementById('global-overlay');
                if (overlay && !overlay.classList.contains('hidden')) {
                    this.closeModal();
                } else if (this.currentView !== 'dashboard') {
                    this.currentView = 'dashboard';
                    this.setActiveNav('nav-academy');
                    UIRenderer.renderDashboard();
                } else {
                    window.Capacitor.Plugins.App.exitApp();
                }
            });
        }

        // Arrancar en Dashboard por defecto al abrir la app
        this.renderDashboard();
    },

    renderDashboard() {
        this.currentView = 'dashboard';
        this.setActiveNav('nav-academy');
        UIRenderer.renderDashboard();
    },

    openModule(id) {
        this.currentView = 'lesson';
        UIRenderer.renderLesson(id, 0);
    },

    closeModal() {
        if (typeof AudioEngine !== 'undefined' && AudioEngine.play) AudioEngine.play('click');
        const overlay = document.getElementById('global-overlay');
        if (overlay) overlay.classList.add('hidden');
    },

    setActiveNav(navId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(navId);
        if (activeBtn) activeBtn.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
