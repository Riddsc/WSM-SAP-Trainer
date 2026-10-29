/**
 * Logística Pro - Almacén de contenido.
 * El catálogo (lista de módulos) se carga al abrir la app; el contenido
 * completo de cada módulo (páginas, examen, pasos de laboratorio) se carga
 * solo cuando el estudiante lo abre. Así la app abre rápido aunque la
 * maestría tenga mucho contenido.
 */
const ContentStore = {
    catalogo: [],
    cache: {},
    listo: false,

    async init() {
        const respuesta = await fetch('content/catalogo.json', { cache: 'no-cache' });
        if (!respuesta.ok) throw new Error(`No se pudo cargar el catálogo (${respuesta.status})`);
        const datos = await respuesta.json();
        this.catalogo = datos.modulos || [];
        this.listo = true;
        return this.catalogo;
    },

    /** Datos básicos del módulo (título, tipo, semestre...). */
    info(id) {
        return this.catalogo.find(m => m.id === id) || null;
    },

    /** Contenido completo del módulo; usa la copia en memoria si ya se cargó. */
    async cargar(id) {
        if (this.cache[id]) return this.cache[id];
        const info = this.info(id);
        if (!info) throw new Error(`El módulo "${id}" no existe`);
        const respuesta = await fetch(`content/modulos/${encodeURIComponent(id)}.json`);
        if (!respuesta.ok) throw new Error(`No se pudo cargar el módulo "${id}" (${respuesta.status})`);
        const datos = await respuesta.json();
        this.cache[id] = { ...info, ...datos };
        return this.cache[id];
    },

    total() {
        return this.catalogo.length;
    }
};

/** Escapa texto escrito por el usuario antes de ponerlo en HTML. */
function escaparHTML(texto) {
    return String(texto ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
