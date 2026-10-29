/**
 * Logística Pro - Copia las tipografías (licencia SIL OFL) al paquete de la app,
 * para que el APK las tenga sin internet.
 *
 * Uso: node scripts/copiar-fuentes.js [carpeta destino]   (por defecto: fonts/)
 * Requiere haber corrido "npm install" (paquetes @fontsource).
 */
const fs = require('fs');
const path = require('path');

const destino = path.resolve(process.argv[2] || path.join(__dirname, '..', 'fonts'));
const base = path.join(__dirname, '..', 'node_modules', '@fontsource');

// [paquete, archivo de origen, nombre final]
const fuentes = [
    ['atkinson-hyperlegible', 'atkinson-hyperlegible-latin-400-normal.woff2', 'atkinson-400.woff2'],
    ['atkinson-hyperlegible', 'atkinson-hyperlegible-latin-700-normal.woff2', 'atkinson-700.woff2'],
    ['atkinson-hyperlegible', 'atkinson-hyperlegible-latin-400-italic.woff2', 'atkinson-400-italic.woff2'],
    ['barlow-condensed', 'barlow-condensed-latin-600-normal.woff2', 'barlow-condensed-600.woff2'],
    ['barlow-condensed', 'barlow-condensed-latin-700-normal.woff2', 'barlow-condensed-700.woff2'],
    ['jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff2', 'jetbrains-mono-500.woff2'],
    ['jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff2', 'jetbrains-mono-700.woff2']
];

fs.mkdirSync(destino, { recursive: true });
let faltan = 0;
fuentes.forEach(([paquete, archivo, final]) => {
    const origen = path.join(base, paquete, 'files', archivo);
    if (!fs.existsSync(origen)) {
        console.error(`✖ No se encontró ${paquete}/files/${archivo}`);
        faltan++;
        return;
    }
    fs.copyFileSync(origen, path.join(destino, final));
    console.log(`✓ ${final}`);
});
// Licencias
['atkinson-hyperlegible', 'barlow-condensed', 'jetbrains-mono'].forEach(p => {
    const lic = path.join(base, p, 'LICENSE');
    if (fs.existsSync(lic)) fs.copyFileSync(lic, path.join(destino, `LICENCIA-${p}.txt`));
});
if (faltan) {
    console.error(`Faltan ${faltan} tipografías; la app usará las del sistema.`);
    process.exit(1);
}
