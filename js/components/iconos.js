/**
 * Logística Pro - Íconos de trazo e ilustraciones planas (sin emojis).
 * Icono.x(tamaño) devuelve un SVG decorativo; el texto accesible va en el botón.
 */
const Icono = {
    trazo(contenido, tam = 22, grosor = 2) {
        return `<svg viewBox="0 0 24 24" width="${tam}" height="${tam}" fill="none" stroke="currentColor" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${contenido}</svg>`;
    },
    atras: (t) => Icono.trazo('<path d="M19 12H5M11 6l-6 6 6 6"/>', t, 2.2),
    cerrar: (t) => Icono.trazo('<path d="M6 6l12 12M18 6L6 18"/>', t, 2.2),
    siguiente: (t = 18) => Icono.trazo('<path d="M5 12h14M13 6l6 6-6 6"/>', t, 2.4),
    anterior: (t = 18) => Icono.trazo('<path d="M19 12H5M11 6l-6 6 6 6"/>', t, 2.4),
    luna: (t) => Icono.trazo('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', t),
    sol: (t) => Icono.trazo('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', t),
    robot: (t) => Icono.trazo('<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><circle cx="9" cy="14" r="1.2"/><circle cx="15" cy="14" r="1.2"/>', t),
    apuntes: (t = 20) => Icono.trazo('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>', t),
    candado: (t = 16) => Icono.trazo('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', t, 2.2),
    check: (t = 18) => Icono.trazo('<path d="M5 12.5l4.5 4.5L19 7.5"/>', t, 3),
    equis: (t = 16) => Icono.trazo('<path d="M7 7l10 10M17 7L7 17"/>', t, 3),
    libro: (t = 22) => Icono.trazo('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', t),
    terminal: (t = 22) => Icono.trazo('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>', t),
    buscar: (t = 20) => Icono.trazo('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', t),
    reloj: (t = 16) => Icono.trazo('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>', t, 2.2),
    marcador: (t = 18) => Icono.trazo('<path d="M6 3h12v18l-6-4-6 4z"/>', t, 2.2),
    alerta: (t = 20) => Icono.trazo('<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>', t, 2.2),
    bajar: (t = 18) => Icono.trazo('<path d="M6 9l6 6 6-6"/>', t, 2.2),
    medalla: (t = 22) => Icono.trazo('<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>', t),
    caja: (t = 24) => Icono.trazo('<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>', t, 2.2),

    circuloCheck(t = 18) {
        return `<svg viewBox="0 0 24 24" width="${t}" height="${t}" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11" fill="var(--ambar)"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="var(--sobre-ambar)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    },

    // --- Ilustraciones del mapa y del laboratorio ---
    estanteria(t = 44) {
        return `<svg viewBox="0 0 48 32" width="${t}" height="${Math.round(t * 0.68)}" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path d="M2 2v28M46 2v28M2 11h44M2 21h44M17 2v28M32 2v28"/></svg>`;
    },
    camion(t = 30) {
        return Icono.trazo('<path d="M1 6h13v10H1z"/><path d="M14 9h4l4 4v3h-8z"/><circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>', t, 1.8);
    },
    muelle() {
        return `<svg class="camion-llega" viewBox="0 0 96 56" width="96" height="56" fill="none" aria-hidden="true" focusable="false">
<rect x="1" y="1" width="40" height="54" rx="3" fill="var(--elevado)" stroke="var(--linea)" stroke-width="2"/>
<path d="M5 10h32M5 18h32M5 26h32M5 34h32M5 42h32" stroke="var(--linea)" stroke-width="2"/>
<path d="M1 50h40" stroke="#F5A524" stroke-width="4" stroke-dasharray="5 4"/>
<rect x="44" y="18" width="34" height="26" rx="2" fill="#E6F0F2" stroke="#9FB3B8" stroke-width="1"/>
<path d="M78 26h8l8 8v10H78z" fill="#3DD6E8"/>
<rect x="81" y="28" width="6" height="6" fill="#0A1F26"/>
<circle cx="54" cy="47" r="5" fill="#0A1F26" stroke="#E6F0F2" stroke-width="2.5"/>
<circle cx="86" cy="47" r="5" fill="#0A1F26" stroke="#E6F0F2" stroke-width="2.5"/>
</svg>`;
    }
};
