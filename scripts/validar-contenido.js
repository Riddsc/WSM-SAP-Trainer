/**
 * Logística Pro - Validador automático del contenido de los cursos.
 *
 * Uso: npm run validar
 *
 * ERRORES (detienen la construcción del APK): estructura rota, módulos
 * faltantes, requisitos que no existen, preguntas sin respuesta correcta.
 * ADVERTENCIAS (no detienen): problemas de calidad que se deben corregir
 * al reescribir el contenido, como respuestas correctas que siempre son
 * las más largas o comandos que no son transacciones SAP verificadas.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..', 'content');
const errores = [];
const advertencias = [];

function leerJSON(ruta) {
    try {
        return JSON.parse(fs.readFileSync(ruta, 'utf8'));
    } catch (e) {
        errores.push(`No se pudo leer ${path.relative(RAIZ, ruta)}: ${e.message}`);
        return null;
    }
}

const catalogo = leerJSON(path.join(RAIZ, 'catalogo.json'));
const verificadas = leerJSON(path.join(RAIZ, 'transacciones-verificadas.json'));
if (!catalogo || !verificadas) {
    console.error(errores.join('\n'));
    process.exit(1);
}
const listaVerificada = new Set(verificadas.transacciones.map(t => t.codigo.toUpperCase()));

const ids = new Set();
let preguntasTotales = 0;
let correctaMasLarga = 0;
const comandosDudosos = [];

catalogo.modulos.forEach((m, indice) => {
    const nombre = `${m.id} (${m.titulo})`;

    // --- Estructura del catálogo ---
    ['id', 'semestre', 'tipo', 'titulo'].forEach(campo => {
        if (m[campo] === undefined || m[campo] === '') errores.push(`${nombre}: falta el campo "${campo}" en el catálogo`);
    });
    if (ids.has(m.id)) errores.push(`${m.id}: id repetido`);
    ids.add(m.id);
    if (!['theory', 'lab', 'exam'].includes(m.tipo)) errores.push(`${nombre}: tipo desconocido "${m.tipo}"`);
    // requisitoLegado: módulo de una versión anterior (ya retirado) que también desbloquea este
    if (m.requisitoLegado !== undefined && typeof m.requisitoLegado !== 'string') {
        errores.push(`${nombre}: el requisito heredado debe ser un texto`);
    }
    if (m.requisito) {
        const posicion = catalogo.modulos.findIndex(x => x.id === m.requisito);
        if (posicion === -1) errores.push(`${nombre}: el requisito "${m.requisito}" no existe`);
        else if (posicion > indice) errores.push(`${nombre}: el requisito "${m.requisito}" está después del módulo`);
    }

    // --- Archivo del módulo ---
    const datos = leerJSON(path.join(RAIZ, 'modulos', `${m.id}.json`));
    if (!datos) return;
    if (datos.id !== m.id) errores.push(`${nombre}: el archivo tiene id "${datos.id}"`);

    if (m.tipo === 'theory' || m.tipo === 'exam') {
        if (m.tipo === 'theory') {
            if (!Array.isArray(datos.paginas) || datos.paginas.length === 0) errores.push(`${nombre}: no tiene páginas`);
            if (!datos.resumen) advertencias.push(`${nombre}: no tiene resumen`);
            (datos.paginas || []).forEach((pg, n) => {
                if (typeof pg === 'object' && pg !== null) {
                    if (!pg.capas && !pg.html) errores.push(`${nombre} · página ${n + 1}: no tiene explicación (capas o html)`);
                    if (pg.capas && !pg.capas.idea) errores.push(`${nombre} · página ${n + 1}: falta la capa "idea"`);
                    (pg.glosario || []).forEach(t => { if (!t.es || !t.en) errores.push(`${nombre} · página ${n + 1}: término de glosario incompleto`); });
                }
            });
        }
        if (m.tipo === 'exam') {
            datos.examen = datos.banco;
            if (datos.preguntasPorIntento && (datos.banco || []).length < datos.preguntasPorIntento) {
                errores.push(`${nombre}: el banco tiene menos preguntas que las de cada intento`);
            }
        }
        if (!Array.isArray(datos.examen) || datos.examen.length === 0) {
            errores.push(`${nombre}: no tiene ${m.tipo === 'exam' ? 'banco de preguntas' : 'examen'}`);
            return;
        }

        // Lo que dice la descripción frente a lo que realmente hay
        const prometidas = (m.descripcion || '').match(/(\d+)\s*preguntas/);
        if (prometidas && Number(prometidas[1]) !== datos.examen.length) {
            advertencias.push(`${nombre}: la descripción promete ${prometidas[1]} preguntas, pero hay ${datos.examen.length}`);
        }

        datos.examen.forEach((p, n) => {
            preguntasTotales++;
            const etiqueta = `${nombre} · pregunta ${n + 1}`;
            if (!p.pregunta) errores.push(`${etiqueta}: no tiene enunciado`);
            if (!Array.isArray(p.opciones) || p.opciones.length < 2) {
                errores.push(`${etiqueta}: necesita al menos 2 opciones`);
                return;
            }
            const correctas = p.opciones.filter(o => o.correcta === true);
            if (m.tipo === 'exam' || typeof (datos.paginas || [])[0] === 'object') {
                if (!p.explicacion) advertencias.push(`${etiqueta}: falta la explicación (retroalimentación)`);
            }
            if (correctas.length === 0) errores.push(`${etiqueta}: no tiene respuesta correcta`);
            if (correctas.length === p.opciones.length) errores.push(`${etiqueta}: todas las opciones son correctas`);

            // Calidad: ¿la correcta es siempre la más larga?
            const largos = p.opciones.map(o => (o.texto || '').length);
            const maximo = Math.max(...largos);
            if (correctas.length === 1 && (correctas[0].texto || '').length === maximo) correctaMasLarga++;
        });
    }

    if (m.tipo === 'lab') {
        if (!Array.isArray(datos.pasos) || datos.pasos.length === 0) {
            errores.push(`${nombre}: el laboratorio no tiene pasos`);
            return;
        }
        datos.pasos.forEach((paso, n) => {
            const etiqueta = `${nombre} · paso ${n + 1}`;
            if (!paso.instruccion) errores.push(`${etiqueta}: falta la instrucción`);
            if (!paso.comando) errores.push(`${etiqueta}: falta el comando esperado`);
            if (!paso.pista) advertencias.push(`${etiqueta}: falta la pista`);
            if (!paso.exito) advertencias.push(`${etiqueta}: falta el mensaje de éxito`);

            // Calidad: comandos con forma de transacción que no están verificados
            const cmd = String(paso.comando || '').toUpperCase().trim();
            if (paso.tipo && !['comando', 'valor'].includes(paso.tipo)) errores.push(`${etiqueta}: tipo de paso desconocido "${paso.tipo}"`);
            if (paso.tipo === 'comando' && !listaVerificada.has(cmd)) errores.push(`${etiqueta}: "${cmd}" no está en la lista de transacciones verificadas`);
            const pareceTransaccion = paso.tipo ? paso.tipo === 'comando' : (cmd.startsWith('/') || /^[A-Z]{2,4}\d{1,3}[A-Z]?$/.test(cmd) || /^[A-Z0-9]+(-[A-Z0-9]+)+$/.test(cmd));
            if (pareceTransaccion && !listaVerificada.has(cmd)) comandosDudosos.push(`${m.id}: ${cmd}`);
        });
    }
});

if (preguntasTotales > 0) {
    const porcentaje = Math.round((correctaMasLarga / preguntasTotales) * 100);
    if (porcentaje > 40) {
        advertencias.push(`En ${correctaMasLarga} de ${preguntasTotales} preguntas (${porcentaje} %) la respuesta correcta es la opción más larga. Se puede adivinar.`);
    }
}
if (comandosDudosos.length > 0) {
    advertencias.push(`${comandosDudosos.length} comandos de laboratorio no son transacciones SAP verificadas:\n      ${comandosDudosos.join('\n      ')}`);
}

// --- Ciclos y zonas del mapa ---
if (!Array.isArray(catalogo.ciclos) || catalogo.ciclos.length === 0) {
    errores.push('El catálogo no tiene la lista de ciclos');
} else {
    const enCiclo = new Map();
    const idsCiclo = new Set();
    catalogo.ciclos.forEach(c => {
        ['id', 'numero', 'ruta', 'nombre', 'corto'].forEach(campo => {
            if (c[campo] === undefined || c[campo] === '') errores.push(`Ciclo ${c.id || '?'}: falta el campo "${campo}"`);
        });
        idsCiclo.add(c.id);
        (c.modulos || []).forEach(id => {
            if (!ids.has(id)) errores.push(`Ciclo ${c.id}: el módulo "${id}" no existe`);
            if (enCiclo.has(id)) errores.push(`El módulo "${id}" está en dos ciclos (${enCiclo.get(id)} y ${c.id})`);
            enCiclo.set(id, c.id);
        });
    });
    ids.forEach(id => {
        if (!enCiclo.has(id)) errores.push(`El módulo "${id}" no está en ningún ciclo`);
    });
    (catalogo.zonas || []).forEach(z => (z.ciclos || []).forEach(id => {
        if (!idsCiclo.has(id)) errores.push(`Zona ${z.id}: el ciclo "${id}" no existe`);
    }));
}

console.log(`Módulos revisados: ${catalogo.modulos.length} · Ciclos: ${(catalogo.ciclos || []).length} · Preguntas: ${preguntasTotales}`);
if (advertencias.length) {
    console.log(`\nADVERTENCIAS (${advertencias.length}):`);
    advertencias.forEach(a => console.log(`  ⚠ ${a}`));
}
if (errores.length) {
    console.error(`\nERRORES (${errores.length}):`);
    errores.forEach(e => console.error(`  ✖ ${e}`));
    process.exit(1);
}
console.log('\nSin errores de estructura.');
