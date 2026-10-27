/**
 * Logística Pro - Gestor de Estado y Persistencia Avanzada
 */
const AppState = {
    data: {
        completedModules: [],
        userNotes: {} // Nuevo: Almacén de notas por módulo
    },

    init() {
        try {
            const saved = localStorage.getItem('logistica_pro_state_v2');
            if (saved) {
                // Hacemos merge para no perder notas si hay versiones viejas
                this.data = { ...this.data, ...JSON.parse(saved) };
            }
        } catch (e) { console.error('Error al leer state:', e); }
        this.updateUIProgress();
    },

    save() {
        try { localStorage.setItem('logistica_pro_state_v2', JSON.stringify(this.data)); } 
        catch (e) { console.error('Error al guardar:', e); }
        this.updateUIProgress();
    },

    isCompleted(id) { return this.data.completedModules.includes(id); },
    
    markComplete(id) {
        if (!this.isCompleted(id)) {
            this.data.completedModules.push(id);
            this.save();
        }
    },

    // --- NUEVO: GESTIÓN DE NOTAS ---
    saveNote(moduleId, text) {
        this.data.userNotes[moduleId] = text;
        this.save();
    },
    getNote(moduleId) {
        return this.data.userNotes[moduleId] || '';
    },

    getProgressPercentage() {
        const total = syllabusData.length;
        if (total === 0) return 0;
        return Math.round((this.data.completedModules.length / total) * 100);
    },

    updateUIProgress() {
        const pct = this.getProgressPercentage();
        const textEl = document.getElementById('progress-text');
        const barEl = document.getElementById('progress-bar');
        if (textEl) textEl.innerText = `${pct}%`;
        if (barEl) barEl.style.width = `${pct}%`;
    }
};
AppState.init();
