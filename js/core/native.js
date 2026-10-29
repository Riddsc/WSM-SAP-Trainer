/**
 * Logística Pro - Puente con las funciones nativas del celular.
 * En el APK usa los complementos de Capacitor (vibración, notificaciones,
 * archivos y compartir). En el navegador usa lo que el navegador ofrece.
 */
const NativeBridge = {
    plugin(nombre) {
        const cap = window.Capacitor;
        if (!cap || !cap.isNativePlatform || !cap.isNativePlatform()) return null;
        return (cap.Plugins && cap.Plugins[nombre]) || null;
    },

    esApp() {
        return !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
    },

    // --- Vibración ---
    /** nivel: 'LIGHT' | 'MEDIUM' | 'HEAVY' */
    vibrar(nivel = 'MEDIUM') {
        if (!AppState.ajustes.vibracion) return;
        const haptics = this.plugin('Haptics');
        if (haptics) {
            haptics.impact({ style: nivel }).catch(() => {});
        } else if (navigator.vibrate) {
            navigator.vibrate(nivel === 'LIGHT' ? 15 : nivel === 'HEAVY' ? 60 : 30);
        }
    },

    /** tipo: 'SUCCESS' | 'WARNING' | 'ERROR' */
    vibrarAviso(tipo) {
        if (!AppState.ajustes.vibracion) return;
        const haptics = this.plugin('Haptics');
        if (haptics) {
            haptics.notification({ type: tipo }).catch(() => {});
        } else if (navigator.vibrate) {
            navigator.vibrate(tipo === 'ERROR' ? [60, 40, 60] : 30);
        }
    },

    // --- Archivos ---
    /**
     * Guarda un archivo de texto. En el APK lo escribe y abre el menú
     * "Compartir" (Drive, WhatsApp, correo, Archivos...). En el navegador
     * lo descarga. Devuelve true si se pudo.
     */
    async guardarArchivo(nombre, contenido, tipo = 'text/plain') {
        const fs = this.plugin('Filesystem');
        const share = this.plugin('Share');
        if (fs && share) {
            try {
                const resultado = await fs.writeFile({
                    path: nombre,
                    data: contenido,
                    directory: 'CACHE',
                    encoding: 'utf8'
                });
                await share.share({ title: nombre, url: resultado.uri, dialogTitle: 'Guardar o enviar archivo' });
                return true;
            } catch (e) {
                // Cerrar el menú de compartir sin elegir nada no es un error
                if (String(e && e.message).toLowerCase().includes('cancel')) return false;
                console.error(e);
                alert('No se pudo guardar el archivo. Intenta de nuevo.');
                return false;
            }
        }

        try {
            const blob = new Blob([contenido], { type: `${tipo};charset=utf-8` });
            const url = URL.createObjectURL(blob);
            const enlace = document.createElement('a');
            enlace.href = url;
            enlace.download = nombre;
            document.body.appendChild(enlace);
            enlace.click();
            enlace.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            return true;
        } catch (e) {
            alert('Tu navegador no permitió descargar el archivo.');
            return false;
        }
    },

    // --- Recordatorio diario ---
    /** Devuelve { ok, mensaje } para mostrarlo en pantalla. */
    async programarRecordatorio(hora) {
        const notis = this.plugin('LocalNotifications');
        if (!notis) {
            return { ok: false, mensaje: 'El recordatorio diario solo funciona en la app instalada (APK).' };
        }
        try {
            const permiso = await notis.requestPermissions();
            if (permiso.display !== 'granted') {
                return { ok: false, mensaje: 'Activa las notificaciones de Logística Pro en los ajustes del celular.' };
            }
            const [h, m] = hora.split(':').map(n => parseInt(n, 10));
            await notis.cancel({ notifications: [{ id: 1 }] }).catch(() => {});
            await notis.schedule({
                notifications: [{
                    id: 1,
                    title: '¡Hora de estudiar en Logística Pro!',
                    body: 'Tu bodega en SAP te espera para avanzar en la maestría.',
                    schedule: { on: { hour: h, minute: m }, allowWhileIdle: true }
                }]
            });
            return { ok: true, mensaje: `✅ Recordatorio diario a las ${hora}` };
        } catch (e) {
            console.error(e);
            return { ok: false, mensaje: 'No se pudo programar el recordatorio. Intenta de nuevo.' };
        }
    },

    async cancelarRecordatorio() {
        const notis = this.plugin('LocalNotifications');
        if (notis) await notis.cancel({ notifications: [{ id: 1 }] }).catch(() => {});
    }
};
