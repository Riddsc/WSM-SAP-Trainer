/**
 * Logística Pro - Gestor de Estado y Copias de Seguridad
 */
const AppState = {
    data: {
        completedModules: [],
        userNotes: {},
        examScores: {} // Nuevo: Guarda los puntajes de certificación
    },

    init() {
        try {
            const saved = localStorage.getItem('logistica_pro_v3');
            if (saved) this.data = { ...this.data, ...JSON.parse(saved) };
        } catch (e) { console.error(e); }
    },

    save() {
        localStorage.setItem('logistica_pro_v3', JSON.stringify(this.data));
    },

    isCompleted(id) { return this.data.completedModules.includes(id); },
    markComplete(id) {
        if (!this.isCompleted(id)) {
            this.data.completedModules.push(id);
            this.save();
        }
    },

    saveNote(id, text) { this.data.userNotes[id] = text; this.save(); },
    getNote(id) { return this.data.userNotes[id] || ''; },
    
    saveScore(id, score) { this.data.examScores[id] = score; this.save(); },

    // --- MOTOR DE EXPORTACIÓN (BACKUP) ---
    exportBackup() {
        AudioEngine.play('success');
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `LogisticaPro_Backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(dlAnchorElem);
        dlAnchorElem.click();
        dlAnchorElem.remove();
    },

    // --- MOTOR DE IMPORTACIÓN ---
    importBackup(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (importedData.completedModules) {
                    this.data = importedData;
                    this.save();
                    AudioEngine.play('success');
                    alert("✅ Copia de seguridad restaurada con éxito. Reiniciando...");
                    location.reload();
                } else {
                    throw new Error("Archivo inválido");
                }
            } catch (err) {
                AudioEngine.play('error');
                alert("❌ Archivo de copia de seguridad corrupto o inválido.");
            }
        };
        reader.readAsText(file);
    }
};
AppState.init();
