/**
 * Logística Pro - Gestor de Estado y Persistencia
 */

const AppState = {
    data: {
        completedModules: []
    },

    init() {
        try {
            const saved = localStorage.getItem('logistica_pro_state');
            if (saved) {
                this.data = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Error al leer el estado local:', e);
            this.data = { completedModules: [] };
        }
        this.updateUIProgress();
    },

    save() {
        try {
            localStorage.setItem('logistica_pro_state', JSON.stringify(this.data));
        } catch (e) {
            console.error('Error al guardar el estado local:', e);
        }
        this.updateUIProgress();
    },

    isCompleted(id) {
        return this.data.completedModules.includes(id);
    },

    markComplete(id) {
        if (!this.isCompleted(id)) {
            this.data.completedModules.push(id);
            this.save();
        }
    },

    getProgressPercentage() {
        const total = syllabusData.length;
        if (total === 0) return 0;
        const completed = this.data.completedModules.length;
        return Math.round((completed / total) * 100);
    },

    updateUIProgress() {
        const pct = this.getProgressPercentage();
        const textEl = document.getElementById('progress-text');
        const barEl = document.getElementById('progress-bar');
        
        if (textEl) textEl.innerText = `${pct}%`;
        if (barEl) barEl.style.width = `${pct}%`;
    }
};

// Inicializar estado al cargar el script
AppState.init();
