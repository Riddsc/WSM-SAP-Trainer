/**
 * Logística Pro - Enrutador SPA y Control de Navegación Nativa
 */
const Router = {
    currentView: 'dashboard',

    // ESTA ES LA FUNCIÓN INIT YA ARMADA CON TODOS LOS BOTONES
    init() {
        // 1. Botón Academia
        document.getElementById('nav-academy').addEventListener('click', () => {
            AudioEngine.play('click');
            this.currentView = 'dashboard';
            this.setActiveNav('nav-academy');
            UIRenderer.renderDashboard();
        });

        // 2. Botón Glosario
        document.getElementById('nav-glossary').addEventListener('click', () => {
            AudioEngine.play('click');
            this.currentView = 'glossary';
            this.setActiveNav('nav-glossary');
            UIRenderer.renderGlossary();
        });

        // 3. Botón Perfil / Backups (El que te faltaba)
        const navProfile = document.getElementById('nav-profile');
        if (navProfile) {
            navProfile.addEventListener('click', () => {
                AudioEngine.play('click');
                this.currentView = 'profile';
                this.setActiveNav('nav-profile');
                UIRenderer.renderProfile();
            });
        }

        // 4. Cierre de ventanas modales
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.closeModal();
        });

        // 5. Control del botón "Atrás" físico del celular (Android nativo)
        if (window.Capacitor && window.Capacitor.Plugins.App) {
            window.Capacitor.Plugins.App.addListener('backButton', () => {
                const overlay = document.getElementById('global-overlay');
                // Si hay un modal abierto, lo cierra
                if (!overlay.classList.contains('hidden')) {
                    this.closeModal();
                } 
                // Si no estamos en el menú principal, vuelve al menú
                else if (this.currentView !== 'dashboard') {
                    this.currentView = 'dashboard';
                    this.setActiveNav('nav-academy');
                    UIRenderer.renderDashboard();
                } 
                // Si estamos en el menú principal, cierra la app
                else {
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
        UIRenderer.renderLesson(id, 0); // Arranca siempre en la página 0
    },

    closeModal() {
        AudioEngine.play('click');
        document.getElementById('global-overlay').classList.add('hidden');
    },

    setActiveNav(navId) {
        // Quita la clase 'active' de todos los botones y se la pone al que tocaste
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(navId);
        if (activeBtn) activeBtn.classList.add('active');
    }
};

// Disparador inicial
document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
