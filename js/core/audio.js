/**
 * Logística Pro - Sonidos sintéticos (Web Audio API).
 * Funciona sin internet y sin archivos de audio. Respeta el interruptor
 * de sonido y el volumen elegidos en el perfil.
 */
const AudioEngine = {
    audioCtx: null,

    init() {
        if (!this.audioCtx) {
            const Contexto = window.AudioContext || window.webkitAudioContext;
            if (!Contexto) return false;
            this.audioCtx = new Contexto();
        }
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        return true;
    },

    /** Volumen elegido por el usuario, de 0 a 1. */
    volumen() {
        if (typeof AppState === 'undefined') return 1;
        const a = AppState.ajustes;
        if (!a.sonido) return 0;
        return Math.max(0, Math.min(100, Number(a.volumen))) / 100;
    },

    play(tipo) {
        const vol = this.volumen();
        if (vol <= 0) return;
        try {
            if (!this.init()) return;
            const ctx = this.audioCtx;
            const ahora = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            // Cada sonido define su forma, notas, volumen base y duración
            const sonidos = {
                click:   { forma: 'sine',     notas: [[500, 0], [200, 0.08, true]], base: 0.15, dur: 0.08 },
                success: { forma: 'triangle', notas: [[523.25, 0], [659.25, 0.1], [783.99, 0.2]], base: 0.2, dur: 0.4 },
                error:   { forma: 'sawtooth', notas: [[140, 0], [90, 0.25, true]], base: 0.25, dur: 0.25 },
                key:     { forma: 'square',   notas: [[800, 0]], base: 0.03, dur: 0.03 }
            };
            const s = sonidos[tipo];
            if (!s) return;

            osc.type = s.forma;
            s.notas.forEach(([frecuencia, momento, rampa]) => {
                if (rampa) osc.frequency.exponentialRampToValueAtTime(frecuencia, ahora + momento);
                else osc.frequency.setValueAtTime(frecuencia, ahora + momento);
            });
            gain.gain.setValueAtTime(s.base * vol, ahora);
            gain.gain.exponentialRampToValueAtTime(0.0001, ahora + s.dur);
            osc.start(ahora);
            osc.stop(ahora + s.dur);
        } catch (e) {
            // El navegador bloquea el audio hasta que el usuario toca la pantalla
        }
    }
};
