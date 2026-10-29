/**
 * Logística Pro - Robots guía: MechaRidds (científico profesor) y
 * Mechanizer (científica de operaciones). Ambos con bata de científicos.
 *
 * Robots.svg(quien, animo, tamaño) devuelve el dibujo listo para insertar.
 *   quien: 'ridds' | 'mech'
 *   animo: 'explicando' | 'celebrando' | 'pensando' | 'alertando'
 */
const Robots = {
    NOMBRES: { ridds: 'MechaRidds', mech: 'Mechanizer' },

    base: {
        ridds: `
<line x1="100" y1="32" x2="100" y2="14" stroke="#2B3F45" stroke-width="5" stroke-linecap="round"/>
<circle cx="100" cy="11" r="8" fill="#3DD6E8" stroke="#0E5561" stroke-width="2"/>
<rect x="30" y="64" width="14" height="30" rx="5" fill="#9FB3B8" stroke="#2B3F45" stroke-width="3"/>
<rect x="156" y="64" width="14" height="30" rx="5" fill="#9FB3B8" stroke="#2B3F45" stroke-width="3"/>
<circle cx="37" cy="105" r="9" fill="none" stroke="#121A1C" stroke-width="5"/>
<circle cx="163" cy="105" r="9" fill="none" stroke="#121A1C" stroke-width="5"/>
<rect x="88" y="124" width="24" height="16" fill="#9FB3B8"/>
<path d="M58 136 L142 136 L162 216 L38 216 Z" fill="#F7FAFA" stroke="#B9C7CA" stroke-width="3" stroke-linejoin="round"/>
<path d="M86 136 L114 136 L100 168 Z" fill="#E3EAEC"/>
<path d="M80 136 L100 172 L92 216" fill="none" stroke="#B9C7CA" stroke-width="3" stroke-linejoin="round"/>
<path d="M120 136 L100 172 L108 216" fill="none" stroke="#B9C7CA" stroke-width="3" stroke-linejoin="round"/>
<path d="M95 140 L105 140 L107 166 L100 176 L93 166 Z" fill="#3DD6E8" stroke="#0E5561" stroke-width="2" stroke-linejoin="round"/>
<rect x="118" y="180" width="22" height="16" rx="3" fill="none" stroke="#B9C7CA" stroke-width="3"/>
<rect x="124" y="171" width="5" height="15" rx="2" fill="#F5A524"/>
<rect x="40" y="30" width="120" height="100" rx="28" fill="#DCE4E6" stroke="#2B3F45" stroke-width="4"/>
<circle cx="54" cy="44" r="3" fill="#9FB3B8"/>
<circle cx="146" cy="44" r="3" fill="#9FB3B8"/>
<rect x="56" y="62" width="40" height="32" rx="9" fill="#D3F5FA" stroke="#22343A" stroke-width="6"/>
<rect x="104" y="62" width="40" height="32" rx="9" fill="#D3F5FA" stroke="#22343A" stroke-width="6"/>
<line x1="96" y1="76" x2="104" y2="76" stroke="#22343A" stroke-width="6"/>`,
        mech: `
<rect x="30" y="66" width="14" height="30" rx="6" fill="#F7A1C4" stroke="#B3266A" stroke-width="2"/>
<rect x="156" y="66" width="14" height="30" rx="6" fill="#F7A1C4" stroke="#B3266A" stroke-width="2"/>
<rect x="88" y="124" width="24" height="16" fill="#F7D9E4"/>
<path d="M58 136 L142 136 L162 216 L38 216 Z" fill="#FFFFFF" stroke="#F2B6CB" stroke-width="3" stroke-linejoin="round"/>
<path d="M86 136 L114 136 L100 166 Z" fill="#F06BA0"/>
<path d="M58 136 L86 136 L100 168 L84 192 Z" fill="#FBD3E2" stroke="#F2B6CB" stroke-width="2" stroke-linejoin="round"/>
<path d="M142 136 L114 136 L100 168 L116 192 Z" fill="#FBD3E2" stroke="#F2B6CB" stroke-width="2" stroke-linejoin="round"/>
<path d="M100 168 L100 216" fill="none" stroke="#F2B6CB" stroke-width="3"/>
<rect x="60" y="182" width="22" height="16" rx="3" fill="none" stroke="#F2B6CB" stroke-width="3"/>
<rect x="66" y="173" width="5" height="15" rx="2" fill="#E8558E"/>
<circle cx="125" cy="186" r="9" fill="#FFFFFF" stroke="#E8558E" stroke-width="2.5"/>
<path d="M122 181 L122 186 L118 192 L132 192 L128 186 L128 181" fill="none" stroke="#E8558E" stroke-width="2" stroke-linejoin="round"/>
<rect x="40" y="34" width="120" height="96" rx="44" fill="#FFF1F4" stroke="#E0628F" stroke-width="4"/>
<path d="M50 56 Q100 20 150 56" fill="none" stroke="#F06BA0" stroke-width="7" stroke-linecap="round"/>
<path d="M100 30 C80 8 64 22 74 38 C82 46 94 38 100 32 C106 38 118 46 126 38 C136 22 120 8 100 30 Z" fill="#E8558E" stroke="#B3266A" stroke-width="2" stroke-linejoin="round"/>
<circle cx="100" cy="31" r="6" fill="#F7A1C4" stroke="#B3266A" stroke-width="2"/>
<polygon points="50,60 98,66 93,93 61,93" fill="#FDE7F0" stroke="#C2185B" stroke-width="5" stroke-linejoin="round"/>
<polygon points="150,60 102,66 107,93 139,93" fill="#FDE7F0" stroke="#C2185B" stroke-width="5" stroke-linejoin="round"/>
<line x1="98" y1="68" x2="102" y2="68" stroke="#C2185B" stroke-width="5"/>
<line x1="50" y1="60" x2="43" y2="53" stroke="#C2185B" stroke-width="3" stroke-linecap="round"/>
<line x1="150" y1="60" x2="157" y2="53" stroke="#C2185B" stroke-width="3" stroke-linecap="round"/>
<circle cx="61" cy="107" r="8" fill="#F9B8CF" opacity="0.85"/>
<circle cx="139" cy="107" r="8" fill="#F9B8CF" opacity="0.85"/>`
    },

    brazo(d, c) {
        return `<path d="${d}" fill="none" stroke="${c.borde}" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${d}" fill="none" stroke="${c.relleno}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`;
    },

    mano(x, y, c) {
        return `<circle cx="${x}" cy="${y}" r="8" fill="${c.relleno}" stroke="${c.borde}" stroke-width="3"/>`;
    },

    animo(animo, c) {
        const brazoAbajo = this.brazo('M60 146 L46 190', c) + this.mano(45, 194, c);
        switch (animo) {
            case 'celebrando':
                return `
<rect x="14" y="40" width="9" height="5" rx="1" fill="#F5A524" transform="rotate(-25 18 42)"/>
<rect x="176" y="34" width="9" height="5" rx="1" fill="#3DD6E8" transform="rotate(30 180 36)"/>
<rect x="8" y="76" width="8" height="5" rx="1" fill="#3DD6E8" transform="rotate(40 12 78)"/>
<rect x="184" y="70" width="8" height="5" rx="1" fill="#F5A524" transform="rotate(-35 188 72)"/>
<circle cx="28" cy="18" r="3" fill="#34D399"/><circle cx="172" cy="12" r="3" fill="#F06BA0"/>
${this.brazo('M60 146 L32 108', c)}${this.mano(30, 104, c)}
${this.brazo('M140 146 L168 108', c)}${this.mano(170, 104, c)}
<path d="M68 82 Q76 70 84 82" fill="none" stroke="#0F2A31" stroke-width="5" stroke-linecap="round"/>
<path d="M116 82 Q124 70 132 82" fill="none" stroke="#0F2A31" stroke-width="5" stroke-linecap="round"/>
<path d="M86 106 Q100 126 114 106 Z" fill="#0F2A31" stroke="#0F2A31" stroke-width="2" stroke-linejoin="round"/>`;
            case 'pensando':
                return `
<circle cx="160" cy="50" r="3" fill="#FFFFFF" stroke="#2B3F45" stroke-width="2"/>
<circle cx="168" cy="40" r="5" fill="#FFFFFF" stroke="#2B3F45" stroke-width="2"/>
<circle cx="182" cy="20" r="15" fill="#FFFFFF" stroke="#2B3F45" stroke-width="3"/>
<path d="M177 15 Q182 9 187 15 Q188 20 182 22 L182 25" fill="none" stroke="#0F2A31" stroke-width="3" stroke-linecap="round"/>
<circle cx="182" cy="30" r="1.8" fill="#0F2A31"/>
${brazoAbajo}
${this.brazo('M140 146 L158 170 L124 134', c)}${this.mano(121, 131, c)}
<circle cx="80" cy="75" r="5.5" fill="#0F2A31"/><circle cx="128" cy="75" r="5.5" fill="#0F2A31"/>
<path d="M110 54 Q124 47 140 54" fill="none" stroke="#0F2A31" stroke-width="4" stroke-linecap="round"/>
<path d="M90 114 Q100 110 110 112" fill="none" stroke="#0F2A31" stroke-width="4" stroke-linecap="round"/>`;
            case 'alertando':
                return `
${brazoAbajo}
<line x1="176" y1="112" x2="176" y2="66" stroke="#2B3F45" stroke-width="4" stroke-linecap="round"/>
<path d="M176 26 L199 66 L153 66 Z" fill="#F5A524" stroke="#7A4A00" stroke-width="3" stroke-linejoin="round"/>
<path d="M176 40 L176 54" stroke="#1A1300" stroke-width="5" stroke-linecap="round"/>
<circle cx="176" cy="60" r="2.6" fill="#1A1300"/>
${this.brazo('M140 146 L170 116', c)}${this.mano(174, 112, c)}
<circle cx="76" cy="78" r="9" fill="#FFFFFF" stroke="#0F2A31" stroke-width="3"/>
<circle cx="124" cy="78" r="9" fill="#FFFFFF" stroke="#0F2A31" stroke-width="3"/>
<circle cx="76" cy="78" r="3.5" fill="#0F2A31"/><circle cx="124" cy="78" r="3.5" fill="#0F2A31"/>
<ellipse cx="100" cy="114" rx="6" ry="7" fill="none" stroke="#0F2A31" stroke-width="4"/>`;
            default: // explicando
                return `
${brazoAbajo}
${this.brazo('M140 146 L168 122', c)}
<line x1="172" y1="118" x2="192" y2="82" stroke="#2B3F45" stroke-width="4" stroke-linecap="round"/>
<circle cx="193" cy="80" r="5" fill="#F5A524" stroke="#7A4A00" stroke-width="2"/>
${this.mano(171, 119, c)}
<circle cx="76" cy="79" r="5.5" fill="#0F2A31"/><circle cx="124" cy="79" r="5.5" fill="#0F2A31"/>
<circle cx="78" cy="77" r="1.8" fill="#FFFFFF"/><circle cx="126" cy="77" r="1.8" fill="#FFFFFF"/>
<ellipse cx="100" cy="112" rx="9" ry="6" fill="#0F2A31"/>`;
        }
    },

    /** Devuelve el SVG del robot. decorativo=true lo oculta de los lectores de pantalla. */
    svg(quien = 'ridds', animo = 'explicando', tam = 80, decorativo = true) {
        const q = quien === 'mech' ? 'mech' : 'ridds';
        const colores = q === 'mech'
            ? { relleno: '#F7D9E4', borde: '#C2185B' }
            : { relleno: '#E3EAEC', borde: '#2B3F45' };
        const accesible = decorativo
            ? 'aria-hidden="true" focusable="false"'
            : `role="img" aria-label="${this.NOMBRES[q]} ${animo}"`;
        return `<svg class="robot robot-${q}" viewBox="0 0 200 220" width="${tam}" height="${Math.round(tam * 1.1)}" ${accesible} style="overflow:visible">${this.base[q]}${this.animo(animo, colores)}</svg>`;
    },

    /** ¿El estudiante quiere ver los robots? */
    visibles() {
        return AppState.ajustes.robots !== false;
    }
};
