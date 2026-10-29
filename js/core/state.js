/**
 * Logística Pro - Estado único de la app.
 * Todo lo del estudiante vive en un solo lugar: progreso, puntajes,
 * apuntes, perfil y ajustes. Así el respaldo siempre lo incluye todo.
 */
const CLAVE_ESTADO = 'logistica_pro_v4';

const ESTADO_INICIAL = () => ({
    version: 4,
    progreso: { completados: [], puntajes: {} },
    apuntes: {},
    perfil: { nombre: '', rol: '' },
    ajustes: {
        sonido: true,
        volumen: 100,
        vibracion: true,
        nivelVibracion: 'MEDIUM',
        tema: 'dark',
        mascota: 'mecharidds',
        robots: true,
        principal: 'ridds',
        colorRidds: 'verde',
        colorMech: 'amarillo',
        letra: 'normal',
        recordatorio: ''
    }
});

const AppState = {
    data: ESTADO_INICIAL(),

    init() {
        let guardado = null;
        try {
            guardado = localStorage.getItem(CLAVE_ESTADO);
        } catch (e) { /* almacenamiento no disponible */ }

        if (guardado) {
            try {
                this.data = this.normalizar(JSON.parse(guardado));
                return;
            } catch (e) {
                console.error('Estado guardado dañado; se usará uno nuevo.', e);
            }
        }
        this.migrarDesdeVersionAnterior();
    },

    /** Completa campos faltantes para que versiones viejas o respaldos parciales no rompan la app. */
    normalizar(obj) {
        const base = ESTADO_INICIAL();
        const o = obj && typeof obj === 'object' ? obj : {};
        return {
            version: 4,
            progreso: {
                completados: Array.isArray(o.progreso?.completados) ? [...new Set(o.progreso.completados)] : [],
                puntajes: { ...(o.progreso?.puntajes || {}) }
            },
            apuntes: { ...(o.apuntes || {}) },
            perfil: { ...base.perfil, ...(o.perfil || {}) },
            ajustes: { ...base.ajustes, ...(o.ajustes || {}) }
        };
    },

    /** Trae los datos de la versión anterior (varias claves sueltas) al formato nuevo. */
    migrarDesdeVersionAnterior() {
        const leer = (clave) => {
            try { return localStorage.getItem(clave); } catch (e) { return null; }
        };
        const nuevo = ESTADO_INICIAL();
        let habiaDatos = false;

        const v3 = leer('logistica_pro_v3');
        if (v3) {
            try {
                const viejo = JSON.parse(v3);
                nuevo.progreso.completados = viejo.completedModules || [];
                nuevo.progreso.puntajes = viejo.examScores || {};
                Object.assign(nuevo.apuntes, viejo.userNotes || {});
                habiaDatos = true;
            } catch (e) { /* ignorar */ }
        }

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith('logistica_pro_notes_')) {
                    const valor = leer(clave);
                    if (valor) {
                        nuevo.apuntes[clave.replace('logistica_pro_notes_', '')] = valor;
                        habiaDatos = true;
                    }
                }
            }
        } catch (e) { /* ignorar */ }

        const mapa = [
            ['logistica_username', v => { nuevo.perfil.nombre = v; }],
            ['logistica_userrole', v => { nuevo.perfil.rol = v; }],
            ['logistica_sound', v => { nuevo.ajustes.sonido = v !== 'false'; }],
            ['logistica_vol', v => { nuevo.ajustes.volumen = Number(v) || 0; }],
            ['logistica_vib', v => { nuevo.ajustes.vibracion = v !== 'false'; }],
            ['logistica_vib_level', v => { nuevo.ajustes.nivelVibracion = v; }],
            ['logistica_pro_theme', v => { nuevo.ajustes.tema = v; }],
            ['logistica_pro_mascot', v => { nuevo.ajustes.mascota = v; }]
        ];
        mapa.forEach(([clave, aplicar]) => {
            const valor = leer(clave);
            if (valor !== null) { aplicar(valor); habiaDatos = true; }
        });

        this.data = this.normalizar(nuevo);
        if (habiaDatos) {
            this.save();
            this.limpiarClavesViejas();
        }
    },

    limpiarClavesViejas() {
        try {
            const borrar = [];
            for (let i = 0; i < localStorage.length; i++) {
                const clave = localStorage.key(i);
                if (clave && clave.startsWith('logistica') && clave !== CLAVE_ESTADO) borrar.push(clave);
            }
            borrar.forEach(c => localStorage.removeItem(c));
        } catch (e) { /* ignorar */ }
    },

    save() {
        try {
            localStorage.setItem(CLAVE_ESTADO, JSON.stringify(this.data));
        } catch (e) {
            console.error('No se pudo guardar el progreso.', e);
        }
        if (typeof UIRenderer !== 'undefined' && UIRenderer.actualizarBarraProgreso) {
            UIRenderer.actualizarBarraProgreso();
        }
    },

    // --- Progreso ---
    isCompleted(id) { return this.data.progreso.completados.includes(id); },

    markComplete(id) {
        if (!this.isCompleted(id)) {
            this.data.progreso.completados.push(id);
            this.save();
        }
    },

    /** Guarda el mejor puntaje obtenido en el examen del módulo. */
    saveScore(id, puntaje) {
        const anterior = this.data.progreso.puntajes[id] || 0;
        if (puntaje > anterior) {
            this.data.progreso.puntajes[id] = puntaje;
            this.save();
        }
    },

    getScore(id) { return this.data.progreso.puntajes[id] ?? null; },

    /** Porcentaje de módulos aprobados frente al total del catálogo. */
    getProgressPercentage() {
        const total = typeof ContentStore !== 'undefined' ? ContentStore.total() : 0;
        if (!total) return 0;
        const aprobados = ContentStore.catalogo.filter(m => this.isCompleted(m.id)).length;
        return Math.round((aprobados / total) * 100);
    },

    /** Un módulo está disponible si no tiene requisito o si el requisito ya se aprobó. */
    estaDisponible(mod) {
        if (!mod.requisito || this.isCompleted(mod.requisito)) return true;
        // Quien ya había aprobado el módulo equivalente de la versión anterior no pierde su avance
        return !!mod.requisitoLegado && this.isCompleted(mod.requisitoLegado);
    },

    /** El siguiente módulo por estudiar, en el orden del catálogo. */
    siguienteModulo() {
        if (typeof ContentStore === 'undefined') return null;
        return ContentStore.catalogo.find(m => !this.isCompleted(m.id) && this.estaDisponible(m)) || null;
    },

    /**
     * Estado de un ciclo en el mapa:
     * 'construccion' (aún sin contenido), 'hecho', 'actual' (tiene el siguiente
     * módulo), 'abierto' (tiene algo disponible) o 'cerrado'.
     */
    estadoCiclo(ciclo) {
        const ids = ciclo.modulos || [];
        if (ids.length === 0) return 'construccion';
        const mods = ids.map(id => ContentStore.info(id)).filter(Boolean);
        if (mods.every(m => this.isCompleted(m.id))) return 'hecho';
        const siguiente = this.siguienteModulo();
        if (siguiente && ids.includes(siguiente.id)) return 'actual';
        if (mods.some(m => this.isCompleted(m.id) || this.estaDisponible(m))) return 'abierto';
        return 'cerrado';
    },

    // --- Apuntes ---
    saveNote(id, texto) { this.data.apuntes[id] = texto; this.save(); },
    getNote(id) { return this.data.apuntes[id] || ''; },

    // --- Perfil y ajustes ---
    setPerfil(nombre, rol) {
        this.data.perfil = { nombre, rol };
        this.save();
    },
    get perfil() { return this.data.perfil; },

    setAjuste(clave, valor) {
        this.data.ajustes[clave] = valor;
        this.save();
    },
    get ajustes() { return this.data.ajustes; },

    // --- Respaldo ---
    async exportBackup() {
        const fecha = new Date().toISOString().split('T')[0];
        const contenido = JSON.stringify({ app: 'Logística Pro', exportado: new Date().toISOString(), ...this.data }, null, 2);
        const ok = await NativeBridge.guardarArchivo(`LogisticaPro_Respaldo_${fecha}.json`, contenido, 'application/json');
        if (ok && typeof AudioEngine !== 'undefined') AudioEngine.play('success');
    },

    importBackup(event) {
        const archivo = event.target.files[0];
        if (!archivo) return;
        const lector = new FileReader();
        lector.onload = (e) => {
            try {
                const importado = JSON.parse(e.target.result);
                // Acepta respaldos nuevos y los de la versión anterior
                let datos;
                if (importado.progreso) datos = this.normalizar(importado);
                else if (importado.completedModules) {
                    datos = this.normalizar({
                        progreso: { completados: importado.completedModules, puntajes: importado.examScores || {} },
                        apuntes: importado.userNotes || {}
                    });
                } else throw new Error('Formato desconocido');

                this.data = datos;
                this.save();
                AudioEngine.play('success');
                alert('✅ Respaldo restaurado. La app se reiniciará.');
                location.reload();
            } catch (err) {
                AudioEngine.play('error');
                alert('❌ El archivo no es un respaldo válido de Logística Pro.');
            } finally {
                event.target.value = '';
            }
        };
        lector.readAsText(archivo);
    },

    borrarTodo() {
        try {
            localStorage.removeItem(CLAVE_ESTADO);
            this.limpiarClavesViejas();
        } catch (e) { /* ignorar */ }
        this.data = ESTADO_INICIAL();
    }
};
AppState.init();
