/**
 * Logística Pro - Navegación entre pantallas y botón "atrás" de Android.
 */
const Router = {
    currentView: 'dashboard',

    async init() {
        this.conectarMenu('nav-academy', 'dashboard', () => UIRenderer.renderDashboard());
        this.conectarMenu('nav-review', 'review', () => UIRenderer.renderRepaso());
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
        this.renderDashboard();

        setTimeout(() => {
            const nombre = AppState.perfil.nombre;
            UIRenderer.aviso(nombre
                ? `¡Hola de nuevo, ${nombre.split(/\s+/)[0]}! La bodega está lista.`
                : 'Bienvenido. Escribe tu nombre en Perfil para personalizar tu constancia.', { segundos: 4 });
        }, 700);
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
     * encima (apuntes); luego vuelve a la pantalla anterior; en el mapa,
     * sale de la app.
     */
    atras() {
        if (smartNotes.estaAbierto()) {
            smartNotes.closeNotes();
            return;
        }
        switch (this.currentView) {
            case 'lab':
                SAPEngine.salir();
                break;
            case 'exam':
                UIRenderer.salirExamen();
                break;
            case 'lesson':
            case 'examResult': {
                const ciclo = ContentStore.cicloDe(UIRenderer.moduloActual);
                if (ciclo) this.abrirCiclo(ciclo.id);
                else this.renderDashboard();
                break;
            }
            case 'report':
            case 'certificate':
                this.irA('profile', 'nav-profile');
                UIRenderer.renderProfile();
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

    renderDashboard(encenderCiclo) {
        this.irA('dashboard', 'nav-academy');
        smartNotes.setContext('general', 'Apuntes generales');
        UIRenderer.renderDashboard(encenderCiclo || null);
    },

    abrirCiclo(id) {
        this.irA('cycle', 'nav-academy');
        smartNotes.setContext('general', 'Apuntes generales');
        UIRenderer.renderCiclo(id);
    },

    openModule(id) {
        this.irA('lesson', 'nav-academy');
        UIRenderer.renderLesson(id, 0);
    },

    setActiveNav(navId) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.removeAttribute('aria-current');
        });
        const activo = document.getElementById(navId);
        if (activo) {
            activo.classList.add('active');
            activo.setAttribute('aria-current', 'page');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
});
