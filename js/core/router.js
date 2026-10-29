/**
 * Logística Pro - Navegación entre pantallas y botón "atrás" de Android.
 */
const Router = {
    currentView: 'dashboard',

    async init() {
        this.conectarMenu('nav-academy', 'dashboard', () => UIRenderer.renderDashboard());
        this.conectarMenu('nav-glossary', 'glossary', () => UIRenderer.renderGlossary());
        this.conectarMenu('nav-profile', 'profile', () => UIRenderer.renderProfile());

        // Botón "atrás" físico de Android
        const appPlugin = NativeBridge.plugin('App');
        if (appPlugin) {
            appPlugin.addListener('backButton', () => this.atras());
        }

        try {
            await ContentStore.init();
        } catch (e) {
            console.error(e);
            UIRenderer.renderError('No se pudo cargar el contenido de la maestría.', 'Cierra y vuelve a abrir la app. Si el problema sigue, reinstálala.');
            return;
        }
        UIRenderer.actualizarBarraProgreso();
        this.renderDashboard();
    },

    conectarMenu(idBoton, vista, render) {
        const boton = document.getElementById(idBoton);
        if (!boton) return;
        boton.addEventListener('click', () => {
            AudioEngine.play('click');
            this.irA(vista, idBoton);
            render();
        });
    },

    irA(vista, idBoton) {
        this.currentView = vista;
        if (idBoton) this.setActiveNav(idBoton);
    },

    /**
     * Lo que hace el botón "atrás": primero cierra lo que esté abierto
     * encima (terminal, apuntes); luego vuelve a la pantalla anterior;
     * en el inicio, sale de la app.
     */
    atras() {
        if (SAPEngine.estaAbierta()) {
            SAPEngine.closeTerminal();
            return;
        }
        if (smartNotes.estaAbierto()) {
            smartNotes.closeNotes();
            return;
        }
        switch (this.currentView) {
            case 'report':
            case 'certificate':
                this.irA('profile', 'nav-profile');
                UIRenderer.renderProfile();
                break;
            case 'exam':
                if (confirm('¿Salir del examen? Perderás las respuestas marcadas.')) this.renderDashboard();
                break;
            case 'dashboard': {
                const appPlugin = NativeBridge.plugin('App');
                if (appPlugin) appPlugin.exitApp();
                break;
            }
            default:
                this.renderDashboard();
        }
    },

    renderDashboard() {
        this.irA('dashboard', 'nav-academy');
        smartNotes.setContext('general', 'Apuntes generales');
        UIRenderer.renderDashboard();
    },

    openModule(id) {
        this.irA('lesson', 'nav-academy');
        UIRenderer.renderLesson(id, 0);
    },

    setActiveNav(navId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        const activo = document.getElementById(navId);
        if (activo) activo.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
