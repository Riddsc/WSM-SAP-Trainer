/**
 * Logística Pro - Base de Datos Masiva (Masterclass WMS / SAP)
 * Nivel: Arquitectura Corporativa - VERSIÓN DEFINITIVA Y ENSAMBLADA
 */
const syllabusData = [
    // ==========================================
    // SEMESTRE 1 - ESTRUCTURA Y MAESTRO DE MATERIALES
    // ==========================================
    {
        id: "s1_m1", semester: 1, type: "theory", title: "1.1 Arquitectura Empresarial Definitiva", duration: "15 Horas • Certificación",
        description: "Inmersión absoluta en el mapeo legal, financiero y operativo de SAP S/4HANA. 15 capítulos de teoría y 50 preguntas de certificación.",
        review: "Resumen: Mandante (T000) -> Sociedad (T001) -> Centro (T001W) -> Almacén (T001L) -> Número de Almacén (EWM). Todo impacta FI.",
        pages: [
            `<h3>Capítulo 1: El Paisaje de Sistemas (System Landscape)</h3><p>Entornos DEV (Desarrollo), QAS (Calidad/Pruebas UAT) y PRD (Producción).</p>`,
            `<h3>Capítulo 2: El Motor de Transportes (CTS)</h3><p>Customizing Requests (Configuración) vs Workbench Requests (Desarrollo ABAP).</p>`,
            `<h3>Capítulo 3: El Mandante (Client)</h3><p>Nivel supremo. Datos Cross-Client como Maestro de Proveedores y Materiales Base.</p>`,
            `<h3>Capítulo 4: La Sociedad (Company Code - FI)</h3><p>Entidad jurídica. Presenta Balance y P&L. Toda baja de stock impacta sus cuentas (G/L).</p>`,
            `<h3>Capítulo 5: El Área de Control (Controlling - CO)</h3><p>Reportes internos y centros de costos. Agrupa Sociedades con mismo plan de cuentas.</p>`,
            `<h3>Capítulo 6: El Centro (Plant)</h3><p>Corazón logístico. Ejecuta MRP. Asignado a una sola Sociedad.</p>`,
            `<h3>Capítulo 7: El Área de Valoración (Valuation Area)</h3><p>Norma S/4HANA: Se valora el stock a nivel de Centro (Plant) para diferenciar costos de fletes.</p>`,
            `<h3>Capítulo 8: El Almacén (Storage Location - IM)</h3><p>Subdivide el Centro. Nivel IM. Cuenta unidades y valor, pero es espacialmente ciego (no ve estantes).</p>`,
            `<h3>Capítulo 9: El Número de Almacén (Warehouse Number - EWM)</h3><p>Activa la gestión 3D. Trabaja con Handling Units (HU), pesos, volúmenes y coordina escáneres RF.</p>`,
            `<h3>Capítulo 10: Supply Chain Unit (SCU)</h3><p>Da atributos geográficos (zona horaria, lat/long) al almacén EWM.</p>`,
            `<h3>Capítulo 11: Organización de Compras (Purchasing Org)</h3><p>Negocia con proveedores. Centralizada (Sociedad) o Descentralizada (Centro).</p>`,
            `<h3>Capítulo 12: Organización de Ventas (Sales Org)</h3><p>Responsable jurídica ante clientes. SD Module.</p>`,
            `<h3>Capítulo 13: Puesto de Expedición (Shipping Point)</h3><p>Coordina carga Outbound basándose en Condición de Expedición, Grupo de Carga y Centro.</p>`,
            `<h3>Capítulo 14: Tablas Core SQL</h3><p>T000 (Mandante), T001 (Sociedad), T001W (Plant), T001L (SLoc), TVST (Shipping Point).</p>`,
            `<h3>Capítulo 15: Matriz de Asignaciones</h3><p>SPRO. Plant a Company Code (OX18). SLoc a Plant (OX09). Sin asignación, el sistema colapsa.</p>`
        ],
        exam: [
            { question: "¿Entorno para UAT (User Acceptance Testing)?", options: [ {text:"PRD", correct:false}, {text:"QAS", correct:true}, {text:"DEV", correct:false} ]},
            { question: "¿Orden de Transporte para código ABAP?", options: [ {text:"Customizing", correct:false}, {text:"Workbench", correct:true} ]},
            { question: "Tabla de Sociedades:", options: [ {text:"T001W", correct:false}, {text:"T001", correct:true}, {text:"T000", correct:false} ]},
            { question: "¿Entidad que presenta Balance General?", options: [ {text:"Plant", correct:false}, {text:"Company Code", correct:true} ]},
            { question: "¿Dónde se ejecuta el MRP?", options: [ {text:"Plant (Centro)", correct:true}, {text:"SLoc", correct:false} ]},
            { question: "¿A qué nivel se recomienda el Área de Valoración en S/4HANA?", options: [ {text:"Plant", correct:true}, {text:"Client", correct:false} ]},
            { question: "¿Entidad ciega al espacio 3D (pasillos/estantes)?", options: [ {text:"Warehouse Number", correct:false}, {text:"Storage Location (IM)", correct:true} ]},
            { question: "¿Entidad que gestiona Handling Units (HUs) y tareas RF?", options: [ {text:"Warehouse Number (EWM)", correct:true}, {text:"Plant", correct:false} ]},
            { question: "¿Transacción para asignar SLoc a Plant?", options: [ {text:"OX18", correct:false}, {text:"OX09", correct:true} ]},
            { question: "¿Las variables que determinan el Shipping Point son?", options: [ {text:"Condición de expedición, grupo de carga y Centro", correct:true}, {text:"Peso y volumen", correct:false} ]}
        ]
    },
    {
        id: "s1_l1", semester: 1, type: "lab", title: "1.2 Lab Multi-Paso: Arquitectura (SPRO)", duration: "1 Hora", req: "s1_m1",
        description: "Crear un Almacén Lógico (OX09).",
        simTask: { hint: "Fases: SPRO -> OX09 -> 1000 -> 0001 -> RAW MATERIALS -> SAVE -> CONFIRM." },
        simSteps: [
            { instruction: "Inicia Customizing", expectedCmd: "SPRO", hint: "SPRO", successMessage: "> Cargado." },
            { instruction: "T-Code Mantener SLoc", expectedCmd: "OX09", hint: "OX09", successMessage: "> T001L abierta." },
            { instruction: "Plant", expectedCmd: "1000", hint: "1000", successMessage: "> Validado." },
            { instruction: "SLoc", expectedCmd: "0001", hint: "0001", successMessage: "> Memoria." },
            { instruction: "Descripción", expectedCmd: "RAW MATERIALS", hint: "RAW MATERIALS", successMessage: "> Text OK." },
            { instruction: "Guardar", expectedCmd: "SAVE", hint: "SAVE", successMessage: "> Batch..." },
            { instruction: "TR", expectedCmd: "CONFIRM", hint: "CONFIRM", successMessage: "> Éxito." }
        ]
    },
    {
        id: "s1_m2",
        semester: 1,
        type: "theory",
        title: "1.3 Material Master Definitivo (El ADN del Inventario)",
        duration: "18 Horas • Certificación Avanzada",
        req: "s1_l1",
        description: "Disección absoluta de las vistas logísticas del Material Master (MARA, MARC, MARD). 10 capítulos teóricos y un examen bloqueante de 40 preguntas.",
        review: "Sin unidades de medida alternativas configuradas en la Vista Básica, el Warehouse Management colapsará al intentar calcular volúmenes (Putaway).",
        pages: [
            `<h3>Capítulo 1: El Maestro Transversal (MARA)</h3><p>La tabla central a nivel de Mandante se llama MARA (Datos Básicos).</p>`,
            `<h3>Capítulo 2: Tipos y Grupos de Material</h3><p>Material Type controla el algoritmo. ROH (Materia Prima), FERT (Producto Terminado).</p>`,
            `<h3>Capítulo 3: Vistas Básicas 1 y 2</h3><p>Aplica a nivel corporativo. Define el Número de Material y la Unidad de Medida Base (BUoM).</p>`,
            `<h3>Capítulo 4: Matemática de Unidades (UoM)</h3><p>La BUoM debe ser la unidad indivisible más pequeña (Ej. EA). Debes declarar: 1 Palet = 50 Cajas para EWM.</p>`,
            `<h3>Capítulo 5: Vista de Compras (MARC)</h3><p>Mantenida a nivel Centro. GR Processing Time define días de descarga antes de que el MRP lo vea disponible.</p>`,
            `<h3>Capítulo 6: Vista Plant Data 1 (MARD)</h3><p>Condiciones ambientales y Shelf Life Expiration Date (SLED - Vida útil restante mínima).</p>`,
            `<h3>Capítulo 7: Vista Plant Data 2</h3><p>Ajustes locales de peso logístico.</p>`,
            `<h3>Capítulo 8: Vista WM 1 (Inteligencia de Putaway)</h3><p>Putaway Control Indicator (Estrategia de rack) y Stock Removal Indicator (Estrategia FIFO/LIFO).</p>`,
            `<h3>Capítulo 9: Vista WM 2 (Paletización)</h3><p>LE Quantity: Cuántas cajas caben en un EuroPalet estándar.</p>`,
            `<h3>Capítulo 10: Vistas Contables (FI)</h3><p>La Valuation Class (Clase de Valoración) es el puente entre logística y la cuenta de mayor. Precio S o V.</p>`
        ],
        exam: [
            { question: "¿Transacción para crear un Maestro de Materiales?", options: [{text:"MM01", correct:true}, {text:"SPRO", correct:false}, {text:"MIGO", correct:false}, {text:"LT01", correct:false}] },
            { question: "¿Tabla que almacena los Datos Básicos (Mandante)?", options: [{text:"MARA", correct:true}, {text:"MARC", correct:false}, {text:"MARD", correct:false}, {text:"T001", correct:false}] },
            { question: "Material Type para Producto Terminado:", options: [{text:"ROH", correct:false}, {text:"FERT", correct:true}, {text:"HAWA", correct:false}, {text:"HALB", correct:false}] },
            { question: "¿Qué significa ROH en SAP?", options: [{text:"Materia Prima (Raw Material)", correct:true}, {text:"Mercadería de Trading", correct:false}, {text:"Producto Semiterminado", correct:false}, {text:"Embalaje", correct:false}] },
            { question: "La Unidad de Medida Base (BUoM) debe ser siempre:", options: [{text:"La unidad más pequeña en la que se gestiona el material.", correct:true}, {text:"El Palet.", correct:false}, {text:"La unidad del proveedor.", correct:false}, {text:"Kilogramos.", correct:false}] },
            { question: "Si omites la conversión matemática de unidades alternativas (Ej. 1 Palet = 50 Cajas), ¿qué módulo falla críticamente?", options: [{text:"SAP FI", correct:false}, {text:"SAP EWM", correct:true}, {text:"SAP HR", correct:false}, {text:"SAP CO", correct:false}] },
            { question: "El GR Processing Time se configura en la vista de:", options: [{text:"Ventas", correct:false}, {text:"Compras (Purchasing View)", correct:true}, {text:"Contabilidad", correct:false}, {text:"MRP", correct:false}] },
            { question: "La Vida Útil (SLED) se configura a nivel de:", options: [{text:"Mandante", correct:false}, {text:"Centro/Almacén (Plant Data 1)", correct:true}, {text:"Ventas", correct:false}, {text:"Sociedad", correct:false}] },
            { question: "El Putaway Control Indicator se define en la vista:", options: [{text:"Warehouse Management 1", correct:true}, {text:"Basic Data 2", correct:false}, {text:"Purchasing", correct:false}, {text:"Accounting 1", correct:false}] },
            { question: "¿Qué campo de WM indica si usar FIFO o LIFO?", options: [{text:"Putaway Control", correct:false}, {text:"Stock Removal Indicator", correct:true}, {text:"Valuation Class", correct:false}, {text:"Material Group", correct:false}] },
            { question: "Los datos de Paletización (LE Quantity) le dicen al sistema:", options: [{text:"Precio del palet.", correct:false}, {text:"Cuántas cajas caben en un palet estándar.", correct:true}, {text:"Proveedor del palet.", correct:false}, {text:"Temperatura.", correct:false}] },
            { question: "En Accounting 1, el puente entre logística y contabilidad es:", options: [{text:"Valuation Class", correct:true}, {text:"Material Group", correct:false}, {text:"Purchasing Group", correct:false}, {text:"Storage Bin", correct:false}] },
            { question: "¿Control de precios típico para Materias Primas?", options: [{text:"V (Moving Average Price)", correct:true}, {text:"S (Standard Price)", correct:false}, {text:"F", correct:false}, {text:"P", correct:false}] },
            { question: "¿Control de precios típico para Productos Terminados?", options: [{text:"S (Standard Price)", correct:true}, {text:"V (Moving Average Price)", correct:false}, {text:"Z", correct:false}, {text:"C", correct:false}] },
            { question: "La tabla de base de datos de la Vista de Compras (Centro) es:", options: [{text:"MARA", correct:false}, {text:"MARC", correct:true}, {text:"T001", correct:false}, {text:"LQUA", correct:false}] },
            { question: "Para bloquear un material mundialmente usas el campo:", options: [{text:"Plant-Specific Status", correct:false}, {text:"Cross-Plant Material Status", correct:true}, {text:"SLoc Block", correct:false}, {text:"Supplier Block", correct:false}] },
            { question: "¿Se puede modificar la BUoM si ya hay stock contabilizado?", options: [{text:"Sí, libremente.", correct:false}, {text:"No, SAP bloquea la modificación.", correct:true}, {text:"Solo FI.", correct:false}, {text:"Sí con TR.", correct:false}] },
            { question: "El indicador de Material Peligroso se mantiene en la vista:", options: [{text:"Plant Data / Storage", correct:true}, {text:"Accounting", correct:false}, {text:"Sales", correct:false}, {text:"MRP 1", correct:false}] },
            { question: "¿Por qué Finanzas y Logística tienen vistas separadas?", options: [{text:"Distintas bases.", correct:false}, {text:"Segregación de funciones (SoD).", correct:true}, {text:"Lentitud.", correct:false}, {text:"Error SAP.", correct:false}] },
            { question: "En un Material HAWA (Trading Good), ¿qué vista NO se configura?", options: [{text:"Purchasing", correct:false}, {text:"Work Scheduling (PP)", correct:true}, {text:"Basic Data", correct:false}, {text:"Accounting", correct:false}] },
            { question: "Al usar 'Copy from' en MM01, ¿qué NUNCA se copia?", options: [{text:"Descripción base", correct:false}, {text:"El stock físico y los historiales de movimiento", correct:true}, {text:"Grupo de artículos", correct:false}, {text:"Unidad", correct:false}] },
            { question: "La tabla MARD almacena:", options: [{text:"Datos de Centro", correct:false}, {text:"Datos de Almacén (SLoc)", correct:true}, {text:"Ventas", correct:false}, {text:"Costos", correct:false}] },
            { question: "¿Indicador para gestión por lote?", options: [{text:"Batch Requirement Indicator", correct:true}, {text:"Serial Profile", correct:false}, {text:"SLED", correct:false}, {text:"Valuation Category", correct:false}] },
            { question: "¿El Material Group sirve para restringir compras?", options: [{text:"Sí, mediante Release Strategies.", correct:true}, {text:"No, solo reportes.", correct:false}, {text:"No en S/4HANA.", correct:false}, {text:"Se usa Material Type.", correct:false}] },
            { question: "Se cuenta por litros pero se almacena en tambores de 200L:", options: [{text:"BUoM = Tambor", correct:false}, {text:"BUoM = Litro, Alt = Tambor", correct:true}, {text:"Solo litros.", correct:false}, {text:"Solo tambores.", correct:false}] },
            { question: "¿Dónde defines el perfil de número de serie?", options: [{text:"Plant Data / Storage 2", correct:true}, {text:"Accounting 1", correct:false}, {text:"Purchasing", correct:false}, {text:"WM 1", correct:false}] },
            { question: "¿Vista obligatoria para Sales Order?", options: [{text:"Sales: General/Plant Data", correct:true}, {text:"Purchasing", correct:false}, {text:"MRP 4", correct:false}, {text:"QM", correct:false}] },
            { question: "Inspección de calidad antes de producción se configura en:", options: [{text:"Quality Management View", correct:true}, {text:"Basic Data", correct:false}, {text:"Accounting", correct:false}, {text:"WM 2", correct:false}] },
            { question: "¿Si olvidas crear la Vista de Compras para un ROH?", options: [{text:"No podrás emitir una Purchase Order.", correct:true}, {text:"Sistema asigna proveedor.", correct:false}, {text:"Bloquea MRP.", correct:false}, {text:"Nada.", correct:false}] },
            { question: "El código EAN/UPC se asigna en:", options: [{text:"WM 1", correct:false}, {text:"Basic Data 1", correct:true}, {text:"Sales", correct:false}, {text:"Purchasing", correct:false}] },
            { question: "Ciclo de conteo físico cada 3 meses:", options: [{text:"CC Physical Inventory Indicator", correct:true}, {text:"MRP Type", correct:false}, {text:"Putaway Indicator", correct:false}, {text:"Lot Size", correct:false}] },
            { question: "¿Distintas Valuation Classes para el mismo material en 2 Centros?", options: [{text:"Sí, si la valoración es a nivel Plant.", correct:true}, {text:"No.", correct:false}, {text:"Solo HAWA.", correct:false}, {text:"Sí con alertas.", correct:false}] },
            { question: "¿Vista para actualizar IM a EWM?", options: [{text:"Warehouse Management 1 y 2", correct:true}, {text:"Sales", correct:false}, {text:"Accounting", correct:false}, {text:"Basic", correct:false}] },
            { question: "Campo 'Division' (Sector) está en:", options: [{text:"Basic Data 1", correct:true}, {text:"WM 1", correct:false}, {text:"Purchasing", correct:false}, {text:"Accounting", correct:false}] },
            { question: "Transacción de Mantenimiento Masivo:", options: [{text:"MM17", correct:true}, {text:"MM01", correct:false}, {text:"MM03", correct:false}, {text:"MIGO", correct:false}] },
            { question: "Práctica para material obsoleto:", options: [{text:"Borrar base datos.", correct:false}, {text:"Flag for Deletion (MM06).", correct:true}, {text:"Precio cero.", correct:false}, {text:"Renombrar.", correct:false}] },
            { question: "Purchasing Group representa a:", options: [{text:"Proveedor.", correct:false}, {text:"Compradores internos responsables del ítem.", correct:true}, {text:"Cliente.", correct:false}, {text:"Montacarguista.", correct:false}] },
            { question: "Mensaje 'se extenderá a la nueva vista':", options: [{text:"Error fatal.", correct:false}, {text:"Se agregan datos de un nuevo departamento o Centro al material base.", correct:true}, {text:"Duplica inventario.", correct:false}, {text:"Colapso.", correct:false}] },
            { question: "¿Listo para ser arquitecto de materiales?", options: [{text:"Sí.", correct:true}, {text:"No.", correct:false}] },
            { question: "¿MARA significa?", options: [{text:"Material Master General Data", correct:true}, {text:"Sales Data", correct:false}] }
        ]
    },
    {
        id: "s1_l2",
        semester: 1,
        type: "lab",
        title: "1.4 Lab Multi-Paso: Alta de Producto Terminado",
        duration: "1 Hora 15 Min",
        req: "s1_m2",
        description: "Crea un Producto Terminado (FERT) y define sus métricas críticas de almacén.",
        simTask: { hint: "Fases: MM01 -> FERT -> WM -> 1000 -> 0001 -> EA -> BULK -> SAVE." },
        simSteps: [
            { instruction: "Inicia alta", expectedCmd: "MM01", hint: "MM01", successMessage: "> Dynpro MM01." },
            { instruction: "Tipo Material", expectedCmd: "FERT", hint: "FERT", successMessage: "> Validado." },
            { instruction: "Vistas", expectedCmd: "WM", hint: "WM", successMessage: "> Vistas WM." },
            { instruction: "Centro", expectedCmd: "1000", hint: "1000", successMessage: "> Plant 1000." },
            { instruction: "Almacén", expectedCmd: "0001", hint: "0001", successMessage: "> SLoc 0001." },
            { instruction: "BUoM", expectedCmd: "EA", hint: "EA", successMessage: "> Unidad EA." },
            { instruction: "Putaway", expectedCmd: "BULK", hint: "BULK", successMessage: "> BULK Storage." },
            { instruction: "Guardar", expectedCmd: "SAVE", hint: "SAVE", successMessage: "> CREADO." }
        ]
    },
    // ==========================================
    // SEMESTRE 2 - INGENIERÍA INBOUND Y ESTRATEGIAS
    // ==========================================
    {
        id: "s2_m1",
        semester: 2,
        type: "theory",
        title: "2.1 Ingeniería Inbound: ASN, MIGO y Yard Management",
        duration: "20 Horas • Especialización Inbound",
        req: "s1_l2",
        description: "Domina el proceso de recepción de clase mundial. Diferencias entre MIGO y VL31N, gestión de patios (Yard Management), y unidades de manipulación (HUM).",
        review: "En operaciones enterprise, nunca se recibe con MIGO directo contra una PO. Se utiliza VL31N para crear el Aviso de Expedición (ASN) y mapear el camión en el Yard Management antes de tocar el muelle.",
        pages: [
            `<h3>Capítulo 1: El Paradigma Inbound Moderno</h3><p>En SAP EWM se requiere visibilidad anticipada. No se recibe contra una PO, se recibe contra un ASN.</p>`,
            `<h3>Capítulo 2: El Aviso de Expedición (ASN)</h3><p>La Inbound Delivery (VL31N) le dice al almacén qué viene, a qué hora y en qué palets. Es un compromiso logístico.</p>`,
            `<h3>Capítulo 3: Handling Unit Management (HUM)</h3><p>El código SSCC de 18 dígitos identifica a un palet único. Al escanearlo, SAP da por recibidas las unidades internas.</p>`,
            `<h3>Capítulo 4: Yard Management (Gestión de Patios)</h3><p>Gestiona el flujo vehicular desde el Check-in. Asigna puertas (Doors) o espacios de parqueo internos.</p>`,
            `<h3>Capítulo 5: MIGO vs VL32N</h3><p>MIGO es para Inventory Management clásico. En EWM, el Post Goods Receipt (PGR) se hace sobre la Inbound Delivery (VL32N/PRDI).</p>`,
            `<h3>Capítulo 6: La Zona Temporal (GR Zone)</h3><p>La Zona 902 es transitoria. Logísticamente está en 'tránsito interno' hasta que se mueva al rack.</p>`,
            `<h3>Capítulo 7: Integración con Calidad (QM)</h3><p>El stock entra como 'Quality Inspection Stock'. Nadie puede venderlo hasta que se libere con la QA11.</p>`,
            `<h3>Capítulo 8: Expected Goods Receipt (EGR)</h3><p>Si el ERP se cae, EWM puede seguir recibiendo camiones basándose en los EGR pre-descargados.</p>`,
            `<h3>Capítulo 9: Reversiones (Movement Type 102)</h3><p>Para anular una recepción (101). EWM lo bloquea si el palet ya fue movido de la GR Zone al rack.</p>`,
            `<h3>Capítulo 10: Tolerancias de Entrega</h3><p>Si la PO permite 5% extra, y el camión trae 6% extra, el sistema arroja Hard Error (M7 022).</p>`
        ],
        exam: [
            { question: "¿Documento recomendado para recepción con EWM?", options: [{text:"Inbound Delivery (ASN)", correct:true}, {text:"Purchase Order", correct:false}, {text:"Material Document", correct:false}] },
            { question: "¿Transacción para crear Inbound Delivery?", options: [{text:"VL31N", correct:true}, {text:"MIGO", correct:false}, {text:"VA01", correct:false}] },
            { question: "Código de barras global de un palet:", options: [{text:"SSCC", correct:true}, {text:"EAN13", correct:false}, {text:"UPC", correct:false}] },
            { question: "¿Qué es HUM?", options: [{text:"Handling Unit Management", correct:true}, {text:"Human Usage", correct:false}] },
            { question: "Estado inicial del camión en Yard Management:", options: [{text:"Check-in", correct:true}, {text:"Docked", correct:false}, {text:"Loading", correct:false}] },
            { question: "Movement Type estándar para recepción de compras:", options: [{text:"101", correct:true}, {text:"102", correct:false}, {text:"561", correct:false}] },
            { question: "Al hacer PGR exitoso:", options: [{text:"Se carga inventario y abona cuenta GR/IR.", correct:true}, {text:"Se paga al proveedor.", correct:false}] },
            { question: "Área transitoria de descarga (piso):", options: [{text:"GR Zone (902)", correct:true}, {text:"High Rack", correct:false}] },
            { question: "¿Stock type si requiere inspección?", options: [{text:"Quality Inspection Stock", correct:true}, {text:"Unrestricted", correct:false}] },
            { question: "¿Se puede despachar stock en Quality Inspection?", options: [{text:"No, hasta la Decisión de Empleo.", correct:true}, {text:"Sí.", correct:false}] },
            { question: "¿Transacción para liberar stock de calidad?", options: [{text:"QA11", correct:true}, {text:"MIGO", correct:false}] },
            { question: "¿EGR sirve para?", options: [{text:"Recibir camiones si ERP se cae.", correct:true}, {text:"Imprimir facturas.", correct:false}] },
            { question: "Movement Type para anular MIGO 101:", options: [{text:"102", correct:true}, {text:"311", correct:false}] },
            { question: "¿Por qué falla la reversión 102 en EWM?", options: [{text:"El palet ya se movió al rack alto.", correct:true}, {text:"Es de noche.", correct:false}] },
            { question: "Si recibe 105 tons de 100 pactadas sin error, es por:", options: [{text:"Overdelivery Tolerance.", correct:true}, {text:"Bug SAP.", correct:false}] },
            { question: "Error si excede tolerancia:", options: [{text:"M7 022", correct:true}, {text:"404", correct:false}] },
            { question: "Si andenes están ocupados, el camión va a:", options: [{text:"Parking Space.", correct:true}, {text:"La calle.", correct:false}] },
            { question: "La Inbound Delivery ERP se convierte en EWM a:", options: [{text:"Inbound Delivery EWM.", correct:true}, {text:"Transfer Order.", correct:false}] },
            { question: "Una Inbound Delivery agrupa POs si:", options: [{text:"Mismo proveedor y Centro.", correct:true}, {text:"Mismo peso.", correct:false}] },
            { question: "Cajas dentro de palets se llaman:", options: [{text:"Nested HUs", correct:true}, {text:"Slotting", correct:false}] },
            { question: "¿Movement Type para traslado entre SLocs del mismo Plant?", options: [{text:"311", correct:true}, {text:"101", correct:false}] },
            { question: "Documento de MIGO:", options: [{text:"Material Document.", correct:true}, {text:"WT.", correct:false}] },
            { question: "¿MIGO si PO no está aprobada (release)?", options: [{text:"Bloqueado.", correct:true}, {text:"Permitido.", correct:false}] },
            { question: "Monitor de colas atascadas:", options: [{text:"SMQ1/SMQ2", correct:true}, {text:"MIGO", correct:false}] }
        ]
    },
    {
        id: "s2_l1",
        semester: 2,
        type: "lab",
        title: "2.2 Lab Multi-Paso: Recepción Inbound (VL31N / PGR)",
        duration: "1 Hora 30 Min",
        req: "s2_m1",
        description: "El camión de Sony ha llegado a la garita. Ejecuta el ASN y el Post Goods Receipt para ingresar 500 consolas al inventario corporativo.",
        simTask: { hint: "Fases: VL31N -> PO-SONY99 -> 500 -> PACK -> VL32N -> PGR -> MMBE." },
        simSteps: [
            { instruction: "Crear ASN", expectedCmd: "VL31N", hint: "VL31N", successMessage: "> Dynpro VL31N." },
            { instruction: "Referencia PO", expectedCmd: "PO-SONY99", hint: "PO-SONY99", successMessage: "> Validada." },
            { instruction: "Cantidad", expectedCmd: "500", hint: "500", successMessage: "> Tolerancia OK." },
            { instruction: "Empacar en HU", expectedCmd: "PACK", hint: "PACK", successMessage: "> SSCC Generado." },
            { instruction: "Modificar ASN", expectedCmd: "VL32N", hint: "VL32N", successMessage: "> ASN Abierto." },
            { instruction: "Ejecutar PGR", expectedCmd: "PGR", hint: "PGR", successMessage: "> GR Contabilizado." },
            { instruction: "Verificar Saldo", expectedCmd: "MMBE", hint: "MMBE", successMessage: "> 500 EA Confirmados." }
        ]
    },
    {
        id: "s2_m2",
        semester: 2,
        type: "theory",
        title: "2.3 Algoritmos EWM: Putaway, Slotting y Cross-Docking",
        duration: "25 Horas • Arquitectura EWM",
        req: "s2_l1",
        description: "El cerebro matemático de SAP EWM. Entiende cómo el sistema evalúa millones de coordenadas tridimensionales en milisegundos para decidir dónde almacenar un palet.",
        review: "Jerarquía de búsqueda: Putaway Control Indicator (PACI) -> Storage Type Search Sequence (STSS) -> Storage Section Search -> Storage Bin Type Search.",
        pages: [
            `<h3>Capítulo 1: El Desafío del Putaway</h3><p>EWM elimina la decisión humana. Evalúa peso, volumen y rotación mediante el Slotting.</p>`,
            `<h3>Capítulo 2: Putaway Control Indicator (PACI)</h3><p>La llave del algoritmo en el Material Master. Ej. PACI 'PESA' para cosas pesadas.</p>`,
            `<h3>Capítulo 3: Storage Type Search Sequence (STSS)</h3><p>Filtro macro. Si la Zona 1 está llena, busca en la Zona 2.</p>`,
            `<h3>Capítulo 4: Storage Section y Bin Type</h3><p>Filtro micro. Alta rotación vs Baja rotación. Hueco grande vs Hueco pequeño.</p>`,
            `<h3>Capítulo 5: Capacity Checking</h3><p>Verifica que el Bin no colapse por el peso de la HU, por volumen, o por Key Figure.</p>`,
            `<h3>Capítulo 6: Bin Strategies</h3><p>Next Empty Bin, Addition to Existing Stock (para juntar productos), o Fixed Bin.</p>`,
            `<h3>Capítulo 7: Bulk y Near Picking</h3><p>Bulk es piso sin altura Z. Near picking deja el palet de reserva justo sobre la zona de recolección.</p>`,
            `<h3>Capítulo 8: Cross-Docking (El Santo Grial)</h3><p>Transferir mercancía directa de Inbound a Outbound sin almacenarla.</p>`,
            `<h3>Capítulo 9: Planned vs Opportunistic CD</h3><p>Planificado por APO/TM, u Oportunista interceptado por EWM si hay pedidos atrasados al hacer PGR.</p>`,
            `<h3>Capítulo 10: La BAdI de Putaway</h3><p>Código ABAP (Custom) inyectado para reglas especiales que no existen en el estándar de SAP.</p>`
        ],
        exam: [
            { question: "Disparador inicial para estrategia de almacenamiento en MM:", options: [{text:"PACI", correct:true}, {text:"Material Group", correct:false}] },
            { question: "Secuencia lógica del algoritmo EWM:", options: [{text:"Storage Type -> Section -> Bin Type -> Bin", correct:true}, {text:"Bin -> Section -> Type", correct:false}] },
            { question: "¿Configuración para buscar en Zona 1 y luego en Zona 2?", options: [{text:"STSS", correct:true}, {text:"Capacity Check", correct:false}] },
            { question: "Objetivo de 'Addition to Existing Stock':", options: [{text:"Maximizar densidad agrupando material.", correct:true}, {text:"Llenar más rápido.", correct:false}] },
            { question: "¿Storage Type sin coordenadas de altura Z?", options: [{text:"Bulk Storage", correct:true}, {text:"High Rack", correct:false}] },
            { question: "¿Capacity Check por Peso evalúa?", options: [{text:"Peso bruto HU vs límite del Bin.", correct:true}, {text:"Peso camión.", correct:false}] },
            { question: "Mover mercancía directa de muelles de recepción a salida:", options: [{text:"Cross-Docking", correct:true}, {text:"Putaway", correct:false}] },
            { question: "Opportunistic Cross-Docking se basa en:", options: [{text:"Pedidos atrasados al hacer PGR.", correct:true}, {text:"Planes de meses.", correct:false}] },
            { question: "¿Qué es una BAdI?", options: [{text:"Punto de ampliación de código ABAP.", correct:true}, {text:"Bin Data Interface.", correct:false}] },
            { question: "Estrategia 'Fixed Bin' usada para:", options: [{text:"Artículos pequeños de alta rotación en gavetas.", correct:true}, {text:"Palets de 3 tons.", correct:false}] },
            { question: "Almacenar la reserva justo arriba del picking fijo:", options: [{text:"Near Picking Bin.", correct:true}, {text:"Bulk.", correct:false}] },
            { question: "¿Puede EWM mezclar lotes en un Bin?", options: [{text:"Si el Mixed Storage Flag lo permite.", correct:true}, {text:"Nunca.", correct:false}] },
            { question: "Una Warehouse Task de Putaway tiene:", options: [{text:"Línea de Origen y Línea de Destino.", correct:true}, {text:"Vendor y Customer.", correct:false}] },
            { question: "Si STSS no encuentra Bin disponible:", options: [{text:"Falla la WT y palet queda en Zona GR.", correct:true}, {text:"Va al pasillo.", correct:false}] },
            { question: "Agrupación de Bins para optimizar ruta:", options: [{text:"Activity Area.", correct:true}, {text:"Plant.", correct:false}] }
        ]
    },
    {
        id: "s2_l2",
        semester: 2,
        type: "lab",
        title: "2.4 Lab Multi-Paso: Algoritmo Storage Type Search",
        duration: "1 Hora 45 Min",
        req: "s2_m2",
        description: "Configura la matriz algorítmica troncal (STSS) en SPRO para garantizar que los palets identificados como pesados busquen espacio en piso antes que en racks en altura.",
        simTask: { hint: "Fases: SPRO -> STSS -> PESA -> BULK -> HGH -> SAVE -> ACTIVATE." },
        simSteps: [
            { instruction: "Acceso Configuración", expectedCmd: "SPRO", hint: "SPRO", successMessage: "> SAP Reference IMG." },
            { instruction: "Transacción STSS", expectedCmd: "STSS", hint: "STSS", successMessage: "> Matriz abierta." },
            { instruction: "Control Indicator", expectedCmd: "PESA", hint: "PESA", successMessage: "> Filtrando PESA." },
            { instruction: "Prioridad 1 (Piso)", expectedCmd: "BULK", hint: "BULK", successMessage: "> Prioridad BULK." },
            { instruction: "Prioridad 2 (Rack)", expectedCmd: "HGH", hint: "HGH", successMessage: "> Prioridad HGH." },
            { instruction: "Commit", expectedCmd: "SAVE", hint: "SAVE", successMessage: "> Update SQL." },
            { instruction: "Activar TR", expectedCmd: "ACTIVATE", hint: "ACTIVATE", successMessage: "> Activo." }
        ]
    },
    // ==========================================
    // SEMESTRE 3 - OUTBOUND & WAVE MANAGEMENT
    // ==========================================
    {
        id: "s3_m1",
        semester: 3,
        type: "theory",
        title: "3.1 Arquitectura Outbound y Wave Management",
        duration: "25 Horas • Especialización Outbound",
        req: "s2_l2",
        description: "El arte de sacar la mercancía. Desde la conversión de documentos ERP->EWM hasta los algoritmos de agrupación en Olas (Waves) para optimizar el picking masivo.",
        review: "Sales Order -> Outbound Delivery -> ODR -> ODO. El ODO es el documento sobre el que se ejecutan todas las tareas de salida en EWM.",
        pages: [
            `<h3>Capítulo 1: El Flujo Outbound</h3><p>El pedido nace en SAP SD. Al llegar a la fecha, se crea la Outbound Delivery, que viaja a EWM.</p>`,
            `<h3>Capítulo 2: ODR y ODO</h3><p>ODR recibe el mensaje. ODO (Outbound Delivery Order) es el documento operativo del almacén.</p>`,
            `<h3>Capítulo 3: Discrete Picking</h3><p>Recolectar pedido por pedido es ineficiente. El operario camina kilómetros innecesarios.</p>`,
            `<h3>Capítulo 4: Wave Management (Olas)</h3><p>Agrupa líneas de diferentes ODOs bajo criterios lógicos (Ruta, Zona, Horario) para optimizar el picking.</p>`,
            `<h3>Capítulo 5: Wave Templates</h3><p>Define Cut-off time y Release time. Automatiza la creación de olas.</p>`,
            `<h3>Capítulo 6: Wave Release</h3><p>Al liberar la Ola, EWM crea Warehouse Tasks (WTs) y las agrupa en Warehouse Orders (WOs) según peso y ruta en U o Z.</p>`,
            `<h3>Capítulo 7: Pick-HU</h3><p>El operario toma una caja vacía (Pick-HU), escanea los productos y los mete lógicamente en ella.</p>`,
            `<h3>Capítulo 8: Two-Step Picking</h3><p>Paso 1: Withdrawal (Bajar palet entero). Paso 2: Allocation (Distribuir en cajas de clientes).</p>`,
            `<h3>Capítulo 9: Staging y Loading</h3><p>Consolidación en andenes (920). Carga escaneando el SSCC al subirlo al camión.</p>`,
            `<h3>Capítulo 10: Post Goods Issue (PGI)</h3><p>El botón final. Desaparece el inventario, detona la facturación en SD y registra el COGS en FI.</p>`
        ],
        exam: [
            { question: "Documento puente desde ERP a EWM en salidas:", options: [{text:"Outbound Delivery", correct:true}, {text:"Sales Order", correct:false}] },
            { question: "Documento operativo rey en EWM para salidas:", options: [{text:"Outbound Delivery Order (ODO)", correct:true}, {text:"ODR", correct:false}] },
            { question: "Transacción para gestionar despachos (ODOs):", options: [{text:"/SCWM/PRDO", correct:true}, {text:"VL01N", correct:false}] },
            { question: "Técnica para agrupar pedidos y optimizar rutas:", options: [{text:"Wave Management", correct:true}, {text:"Discrete Picking", correct:false}] },
            { question: "¿Qué evita el Wave Management?", options: [{text:"Caminar múltiples veces por el mismo pasillo.", correct:true}, {text:"Usar escáneres RF.", correct:false}] },
            { question: "Al liberar la Ola (Release), el sistema crea:", options: [{text:"WTs agrupadas en WOs.", correct:true}, {text:"Facturas.", correct:false}] },
            { question: "Paquete de trabajo optimizado para el operario:", options: [{text:"Warehouse Order (WO)", correct:true}, {text:"Purchase Order", correct:false}] },
            { question: "Caja vacía con SSCC para recolectar:", options: [{text:"Pick-HU", correct:true}, {text:"Cartonization", correct:false}] },
            { question: "Two-Step Picking se usa cuando:", options: [{text:"Muchos clientes piden el mismo producto.", correct:true}, {text:"Hay pocos clientes.", correct:false}] },
            { question: "Botón transaccional final de salida:", options: [{text:"Post Goods Issue (PGI)", correct:true}, {text:"Post Goods Receipt", correct:false}] },
            { question: "Impacto financiero del PGI:", options: [{text:"Disminuye inventario y registra COGS.", correct:true}, {text:"Paga al proveedor.", correct:false}] },
            { question: "¿EWM factura sin hacer PGI?", options: [{text:"No. Bloquea facturación hasta PGI.", correct:true}, {text:"Sí.", correct:false}] }
        ]
    },
    {
        id: "s3_l1",
        semester: 3,
        type: "lab",
        title: "3.2 Lab Multi-Paso: Wave Release & Picking",
        duration: "1 Hora 45 Min",
        req: "s3_m1",
        description: "El cliente Amazon requiere 1,000 unidades. Libera la Ola y ejecuta el PGI.",
        simTask: { hint: "Fases: /SCWM/WAVE -> 9901 -> RELEASE -> /SCWM/TO_CONF -> CONFIRM -> /SCWM/PRDO -> PGI." },
        simSteps: [
            { instruction: "Consola de Olas", expectedCmd: "/SCWM/WAVE", hint: "/SCWM/WAVE", successMessage: "> Gestión de Olas." },
            { instruction: "Filtrar Ola", expectedCmd: "9901", hint: "9901", successMessage: "> Ola 9901 localizada." },
            { instruction: "Liberación", expectedCmd: "RELEASE", hint: "RELEASE", successMessage: "> WO 50000123 creada." },
            { instruction: "Confirmación Manual", expectedCmd: "/SCWM/TO_CONF", hint: "/SCWM/TO_CONF", successMessage: "> Interfaz abierta." },
            { instruction: "Post Confirmación", expectedCmd: "CONFIRM", hint: "CONFIRM", successMessage: "> Stock en Staging (920)." },
            { instruction: "Monitor Despachos", expectedCmd: "/SCWM/PRDO", hint: "/SCWM/PRDO", successMessage: "> ODO seleccionada." },
            { instruction: "Ejecutar PGI", expectedCmd: "PGI", hint: "PGI", successMessage: "> OPERACIÓN CERRADA." }
        ]
    },
    {
        id: "s3_m2",
        semester: 3,
        type: "theory",
        title: "3.3 Excepciones Outbound y Replenishment",
        duration: "25 Horas • Arquitectura de Crisis",
        req: "s3_l1",
        description: "Domina el caos. Qué hacer cuando el sistema falla, cuando el rack está vacío (Pick Denial), y cómo el Reabastecimiento salva las Olas de Picking.",
        review: "Un Exception Code como 'BIDF' no solo avisa del error, sino que dispara un flujo en background para resolver la crisis.",
        pages: [
            `<h3>Capítulo 1: La Realidad del Almacén</h3><p>El sistema dice que hay 100, pero físicamente hay 80. Aquí nacen las Excepciones.</p>`,
            `<h3>Capítulo 2: Exception Codes</h3><p>Códigos de 4 letras. Ej: BIDF (Bin Denied), CHBA (Change Batch), SPLT (Split).</p>`,
            `<h3>Capítulo 3: Pick Denial</h3><p>BIDF ajusta inventario, bloquea el Bin, y recalcula el STSS buscando stock en otra ubicación.</p>`,
            `<h3>Capítulo 4: Replenishment</h3><p>Reabastecimiento de Racks Altos a Bins de Piso antes de que se queden vacíos.</p>`,
            `<h3>Capítulo 5: Planned y Automatic</h3><p>Planned: Background Job nocturno. Automatic: Al caer bajo el mínimo durante un picking.</p>`,
            `<h3>Capítulo 6: Order-Related Replenishment</h3><p>Pausa la liberación de la Ola, ordena reabastecer, y luego libera las tareas de salida.</p>`,
            `<h3>Capítulo 7: Cancelaciones Outbound</h3><p>Requiere Reverse Goods Issue y tareas de Putaway inverso para devolver palets al rack.</p>`,
            `<h3>Capítulo 8: Batch Determination (FEFO)</h3><p>First Expired, First Out. Busca el lote más antiguo que aún cumpla la vida útil exigida.</p>`,
            `<h3>Capítulo 9: Cartonization</h3><p>IA que lee dimensiones (X,Y,Z) y recomienda la caja de cartón exacta para evitar flete de aire.</p>`,
            `<h3>Capítulo 10: Warehouse Monitor</h3><p>Panel /SCWM/MON. Permite desencolar tareas, reasignar operarios y auditar inventario.</p>`
        ],
        exam: [
            { question: "¿Qué es un Exception Code?", options: [{text:"Código de 4 letras que reporta anomalía y gatilla acción algorítmica.", correct:true}, {text:"Error ABAP.", correct:false}] },
            { question: "Código para Pick Denial (Rack vacío):", options: [{text:"BIDF (Bin Denied)", correct:true}, {text:"MIGO", correct:false}] },
            { question: "Acción de EWM tras un BIDF:", options: [{text:"Ajusta inventario, bloquea Bin, busca alternativo.", correct:true}, {text:"Despide operario.", correct:false}] },
            { question: "Documento generado para investigar faltantes:", options: [{text:"Physical Inventory Document", correct:true}, {text:"Purchase Order", correct:false}] },
            { question: "¿Qué Replenishment ocurre durante el Wave Release?", options: [{text:"Order-Related Replenishment", correct:true}, {text:"Planned", correct:false}] },
            { question: "Cálculo matemático del tamaño de caja de envío:", options: [{text:"Cartonization Planning", correct:true}, {text:"Slotting", correct:false}] },
            { question: "FEFO significa:", options: [{text:"First Expired, First Out", correct:true}, {text:"First Empty, First Out", correct:false}] },
            { question: "Consola maestra de monitoreo EWM:", options: [{text:"/SCWM/MON", correct:true}, {text:"/SCWM/WAVE", correct:false}] }
        ]
    },
    {
        id: "s3_l2",
        semester: 3,
        type: "lab",
        title: "3.4 Lab Multi-Paso: Resolución Pick Denial",
        duration: "2 Horas • Crisis Management",
        req: "s3_m2",
        description: "El operario llegó al Bin A-01 y reporta que el rack está vacío. Registra la excepción y dispara el reabastecimiento.",
        simTask: { hint: "Fases: /RFUI -> BIDF -> /SCWM/MON -> LQUA -> REPLENISH -> CONFIRM -> PGI." },
        simSteps: [
            { instruction: "Simulador RF", expectedCmd: "/RFUI", hint: "/RFUI", successMessage: "> Emulador RF cargado." },
            { instruction: "Excepción", expectedCmd: "BIDF", hint: "BIDF", successMessage: "> BIDF Registrado. Bin Bloqueado." },
            { instruction: "Monitor", expectedCmd: "/SCWM/MON", hint: "/SCWM/MON", successMessage: "> Ola en riesgo detectada." },
            { instruction: "Auditar", expectedCmd: "LQUA", hint: "LQUA", successMessage: "> Stock hallado en Reserva." },
            { instruction: "Reabastecer", expectedCmd: "REPLENISH", hint: "REPLENISH", successMessage: "> WT Creada." },
            { instruction: "Confirmar Rescate", expectedCmd: "CONFIRM", hint: "CONFIRM", successMessage: "> Stock en Staging." },
            { instruction: "Cierre Financiero", expectedCmd: "PGI", hint: "PGI", successMessage: "> CRISIS RESUELTA." }
        ]
    }
,
    // ==========================================
    // SEMESTRE 4 - INGENIERÍA AVANZADA, MFS Y RESOURCE MANAGEMENT
    // ==========================================
    {
        id: "s4_m1",
        semester: 4,
        type: "theory",
        title: "4.1 Cross-Docking Avanzado y Material Flow System (MFS)",
        duration: "30 Horas • Arquitectura Nivel Experto",
        req: "s3_l2",
        description: "Domina la automatización extrema. Desde el ruteo dinámico de Cross-Docking para evadir el almacenamiento, hasta la integración directa con PLCs, fajas transportadoras y grúas robóticas usando SAP MFS.",
        review: "El Cross-Docking Opportunista intercepta palets en la puerta; MFS (Material Flow System) mueve esos palets físicamente a través de TCP/IP enviando Telegramas a los PLCs sin middleware de terceros.",
        pages: [
            `<h3>Capítulo 1: La Filosofía del Cross-Docking (CD)</h3><p>El almacenamiento es un desperdicio de tiempo y dinero. El CD busca que la mercancía fluya del muelle de entrada al de salida sin tocar un rack.</p>`,
            `<h3>Capítulo 2: Planned vs Opportunistic CD</h3><p>Planned CD viene pre-calculado desde SAP TM o APO. Opportunistic CD es una decisión en tiempo real de EWM al detectar un Backorder (pedido atrasado) justo en el momento del PGR.</p>`,
            `<h3>Capítulo 3: Merchandise Distribution (Push/Pull)</h3><p>Técnica Retail. Se recibe un camión consolidado del fabricante y se distribuye inmediatamente a nivel de caja para múltiples tiendas en la zona de Staging.</p>`,
            `<h3>Capítulo 4: EWM CD Routes</h3><p>Si la puerta Inbound 1 está a 1 kilómetro de la puerta Outbound 50, el sistema genera WTs intermedias de traslado para no bloquear los montacargas.</p>`,
            `<h3>Capítulo 5: Introducción a SAP MFS</h3><p>Material Flow System. Permite a EWM hablar directamente con los Controladores Lógicos Programables (PLCs) del hardware del almacén (fajas, transelevadores).</p>`,
            `<h3>Capítulo 6: La Muerte del Middleware</h3><p>Históricamente, SAP hablaba con un WCS (Warehouse Control System) intermedio, y este al PLC. MFS elimina el WCS, reduciendo latencia y puntos de fallo.</p>`,
            `<h3>Capítulo 7: Telegramas MFS</h3><p>EWM no envía WTs al hardware. Convierte la WT en una cadena de texto ultraligera llamada Telegrama, enviada vía Sockets TCP/IP.</p>`,
            `<h3>Capítulo 8: Communication Channels</h3><p>Configuración de IP, Puerto y Handshake entre EWM y el PLC. Utiliza procesos ABAP Push Channel (APC) para streaming bidireccional en milisegundos.</p>`,
            `<h3>Capítulo 9: Routing Points (Puntos de Ruteo)</h3><p>Sensores láser en la faja transportadora. Cuando un palet pasa por un escáner, el PLC envía un telegrama a EWM preguntando: "¿Hacia dónde desvío esta HU?".</p>`,
            `<h3>Capítulo 10: Capacity Limits en MFS</h3><p>Si una faja transportadora solo soporta 10 palets, EWM pausa la liberación de nuevas WTs hacia esa zona hasta que el PLC confirme que la faja tiene espacio.</p>`,
            `<h3>Capítulo 11: Exception Handling en Hardware</h3><p>¿Qué pasa si un palet se traba? El PLC envía un Telegrama de Error. EWM redirige el tráfico subsecuente a una faja de contingencia automáticamente.</p>`,
            `<h3>Capítulo 12: Layout Orientado a MFS</h3><p>Los Storage Bins no son racks de piso, son coordenadas X,Y,Z exactas de un ASRS (Automated Storage and Retrieval System).</p>`,
            `<h3>Capítulo 13: Monitorización MFS (/SCWM/MON)</h3><p>Nodo especial en el Monitor para ver el estado de los canales TCP/IP, leer telegramas crudos y resetear PLCs desde SAP.</p>`,
            `<h3>Capítulo 14: Pick-by-Light y Pick-by-Voice</h3><p>Integraciones MFS donde SAP enciende luces en el rack físico para guiar al humano, o interactúa por auriculares RF.</p>`,
            `<h3>Capítulo 15: Pruebas de Estrés MFS</h3><p>Uso del emulador interno de SAP para simular PLCs enviando 10,000 telegramas por minuto y probar la estabilidad del servidor S/4HANA.</p>`
        ],
        exam: [
            { question: "¿Cuál es el objetivo principal del Cross-Docking?", options: [{text:"Evitar el almacenamiento físico y enviar la mercancía directo a salida.", correct:true}, {text:"Consolidar inventario en el fondo del almacén.", correct:false}, {text:"Hacer conteo cíclico rápido.", correct:false}] },
            { question: "El Opportunistic Cross-Docking se gatilla generalmente por:", options: [{text:"La detección de un Backorder durante el proceso de entrada (PGR).", correct:true}, {text:"Una planificación de SAP APO 6 meses antes.", correct:false}, {text:"Un cierre de mes financiero.", correct:false}] },
            { question: "¿Qué significa MFS en el ecosistema EWM?", options: [{text:"Material Flow System", correct:true}, {text:"Manual Forklift System", correct:false}, {text:"Master Financial Setup", correct:false}] },
            { question: "La gran ventaja arquitectónica de SAP MFS es:", options: [{text:"Eliminar el middleware (WCS) y hablar directo con los PLCs.", correct:true}, {text:"Que funciona sin internet.", correct:false}, {text:"Que es gratis.", correct:false}] },
            { question: "¿Cómo se comunican EWM y un PLC?", options: [{text:"A través de Telegramas mediante Sockets TCP/IP.", correct:true}, {text:"Por correos electrónicos automáticos.", correct:false}, {text:"Mediante impresiones PDF escaneadas.", correct:false}] },
            { question: "Un 'Routing Point' en MFS representa:", options: [{text:"Un sensor de decisión en el hardware (ej. cruce de fajas).", correct:true}, {text:"El escritorio del supervisor.", correct:false}, {text:"Una puerta del camión.", correct:false}] },
            { question: "Si una grúa robótica falla, ¿cómo se entera SAP EWM?", options: [{text:"El PLC envía un Telegrama de Excepción directo al Communication Channel.", correct:true}, {text:"Un operador debe hacer un MIGO.", correct:false}, {text:"EWM no se entera hasta el día siguiente.", correct:false}] },
            { question: "Si el CD Opportunista detecta un pedido atrasado, la Warehouse Task (WT) de Inbound:", options: [{text:"Cambia su destino del Rack hacia la zona de Staging Outbound (920).", correct:true}, {text:"Se cancela y borra.", correct:false}, {text:"Se bloquea esperando un QA.", correct:false}] },
            { question: "¿Qué protocolo de SAP S/4HANA moderno permite mantener Sockets abiertos para MFS?", options: [{text:"ABAP Push Channels (APC).", correct:true}, {text:"SOAP Web Services.", correct:false}, {text:"RFC sincrónico tradicional.", correct:false}] },
            { question: "Para verificar si la conexión TCP/IP con el PLC está activa, se utiliza:", options: [{text:"El nodo MFS en el Warehouse Monitor (/SCWM/MON).", correct:true}, {text:"Transacción MMBE.", correct:false}, {text:"La dynpro de creación de material.", correct:false}] },
            { question: "En Retail, cuando se recibe mercancía masiva para repartir directo a tiendas se usa:", options: [{text:"Merchandise Distribution (Push/Pull).", correct:true}, {text:"Discrete Picking manual.", correct:false}, {text:"Archiving.", correct:false}] },
            { question: "¿Puede EWM detener el envío de telegramas si la faja está llena?", options: [{text:"Sí, mediante MFS Capacity Limits.", correct:true}, {text:"No, satura la faja obligatoriamente.", correct:false}] },
            { question: "Un sistema ASRS interactúa con EWM MFS para:", options: [{text:"Movimiento automatizado en tres dimensiones (X,Y,Z).", correct:true}, {text:"Calcular impuestos corporativos.", correct:false}] },
            { question: "Pick-by-Light es considerado:", options: [{text:"Una extensión de hardware integrada a los telegramas MFS o BAdIs RF.", correct:true}, {text:"Un módulo de Finanzas.", correct:false}] },
            { question: "Para simular PLCs y probar la estabilidad MFS antes del Go-Live, SAP:", options: [{text:"Ofrece un emulador MFS interno.", correct:true}, {text:"Exige comprar hardware real.", correct:false}] }
        ]
    },
    {
        id: "s4_l1",
        semester: 4,
        type: "lab",
        title: "4.2 Lab Multi-Paso: Opportunistic Cross-Docking",
        duration: "2 Horas 15 Min",
        req: "s4_m1",
        description: "Hay un pedido atrasado urgiendo 50 Laptops. Acaba de llegar un camión con 100 Laptops. Ejecuta el PGR y observa cómo el algoritmo anula el Putaway y desvía 50 unidades directo al andén de salida.",
        simTask: { hint: "Fases: /SCWM/PRDI -> PGR -> ALGORITMO-CD -> /SCWM/TO_CONF -> /SCWM/MON -> ODO-CONFIRM -> PGI." },
        simSteps: [
            { instruction: "Inbound Delivery EWM", expectedCmd: "/SCWM/PRDI", hint: "/SCWM/PRDI", successMessage: "> IBD Abierta." },
            { instruction: "Ejecutar Recepción", expectedCmd: "PGR", hint: "PGR", successMessage: "> Alerta: Backorder Detectado." },
            { instruction: "Forzar Ruteo CD", expectedCmd: "ALGORITMO-CD", hint: "ALGORITMO-CD", successMessage: "> WT dividida (50 Rack / 50 Salida)." },
            { instruction: "Confirmar Movimiento", expectedCmd: "/SCWM/TO_CONF", hint: "/SCWM/TO_CONF", successMessage: "> Palet CD en Zona 920." },
            { instruction: "Verificar Monitor", expectedCmd: "/SCWM/MON", hint: "/SCWM/MON", successMessage: "> Enlace CD-ODO activo." },
            { instruction: "Cerrar Tarea ODO", expectedCmd: "ODO-CONFIRM", hint: "ODO-CONFIRM", successMessage: "> Picking marcado OK." },
            { instruction: "Despachar", expectedCmd: "PGI", hint: "PGI", successMessage: "> CROSS-DOCKING COMPLETADO." }
        ]
    }
,
    {
        id: "s4_m2",
        semester: 4,
        type: "theory",
        title: "4.2 Resource Management y Task Interleaving Avanzado",
        duration: "30 Horas • Optimización de Flota y Operarios",
        req: "s4_l1",
        description: "El arte de maximizar la productividad de la mano de obra y los montacargas. Aprende a configurar colas dinámicas, balanceo de turnos y el santo grial de la eficiencia: Task Interleaving.",
        review: "Task Interleaving evita que un montacarguista regrese con las 'manos vacías' (Deadheading). Al dejar un palet en el rack (Putaway), EWM le asigna inmediatamente un picking cercano.",
        pages: [
            `<h3>Capítulo 1: El Desperdicio del Deadheading</h3><p>Un montacargas que camina vacío está quemando dinero. El objetivo del Resource Management es cero viajes en vacío.</p>`,
            `<h3>Capítulo 2: Definición de Recursos</h3><p>Un recurso puede ser un operario pedestre, un montacargas de hombre a bordo, o una grúa ASRS. Se configuran con capacidades de peso y volumen.</p>`,
            `<h3>Capítulo 3: Resource Queues (Colas de Trabajo)</h3><p>Los trabajos se agrupan en colas por zonas físicas (Ej: Cola de Pasillos Pares, Cola de Congelados). Los recursos se asignan a estas colas.</p>`,
            `<h3>Capítulo 4: El Algoritmo de Asignación (RFUI)</h3><p>Cuando un operario pulsa 'Siguiente Tarea' en su terminal RF, el sistema evalúa su posición GPS/Warehouse y le asigna la tarea más óptima.</p>`,
            `<h3>Capítulo 5: Task Interleaving (Entrelazado de Tareas)</h3><p>La técnica definitiva: fusionar flujos Inbound y Outbound. El operario hace Putaway de un palet que acaba de recibir y, al terminar, el sistema le asigna un Picking a 3 metros de distancia.</p>`,
            `<h3>Capítulo 6: Queue Sequence</h3><p>Configuración en SPRO para definir qué colas puede atender un recurso y en qué orden de prioridad.</p>`,
            `<h3>Capítulo 7: Shift Management (Turnos)</h3><p>Control de pausas, asignación de operarios por turnos rotativos y balanceo de carga de trabajo por hora.</p>`,
            `<h3>Capítulo 8: Radio Frequency Framework (RFUI)</h3><p>Las pantallas de las pistolas RF se construyen mediante Dynpros móviles optimizadas para no requerir scroll ni teclado físico.</p>`,
            `<h3>Capítulo 9: Exception Handling en Recursos</h3><p>Si un montacargas sufre una avería mecánica, el supervisor puede reasignar todas sus tareas activas a otro recurso con un solo clic en el monitor.</p>`,
            `<h3>Capítulo 10: KPIs y Productividad en el Monitor</h3><p>Medición de segundos por tarea, porcentaje de tiempo en vacío vs cargado, y rendimiento por operario en tiempo real.</p>`
        ],
        exam: [
            { question: "¿Qué significa 'Deadheading' en logística de almacenes?", options: [{text:"Un montacargas viajando sin carga (vacío).", correct:true}, {text:"Un error de sistema ABAP.", correct:false}, {text:"Una falla de red en la pistola RF.", correct:false}] },
            { question: "¿Cuál es el propósito fundamental del Task Interleaving?", options: [{text:"Eliminar los viajes vacíos entrelazando tareas de entrada y salida.", correct:true}, {text:"Duplicar el inventario contable.", correct:false}, {text:"Acelerar el cierre contable financiero.", correct:false}] },
            { question: "¿Cómo sabe el sistema qué tarea asignar a qué montacargas?", options: [{text:"A través de Resource Queues y la posición del recurso.", correct:true}, {text:"Mediante un sorteo aleatorio nocturno.", correct:false}] },
            { question: "¿Qué transacción RF utiliza el operario para solicitar su siguiente trabajo?", options: [{text:"/RFUI (Radio Frequency User Interface).", correct:true}, {text:"MM01", correct:false}, {text:"MIGO", correct:false}] },
            { question: "Si un montacargas se descompone a mitad de un turno, el supervisor puede:", options: [{text:"Reasignar sus tareas pendientes a otro recurso desde el Monitor.", correct:true}, {text:"Eliminar el almacén completo.", correct:false}] },
            { question: "Las Resource Queues se estructuran típicamente por:", options: [{text:"Zonas físicas del almacén (Pasillos, Niveles o Áreas).", correct:true}, {text:"Apellidos de los operarios.", correct:false}] },
            { question: "¿Qué métrica evalúa el éxito del Resource Management?", options: [{text:"Porcentaje de tiempo con tareas productivas vs viajes vacíos.", correct:true}, {text:"El costo de la electricidad.", correct:false}] }
        ]
    },
    {
        id: "s4_l2",
        semester: 4,
        type: "lab",
        title: "4.3 Lab Multi-Paso: Configuración de Task Interleaving",
        duration: "2 Horas",
        req: "s4_m2",
        description: "Configura el motor de Resource Management para que el montacargas de alta elevación (HGH-FORK) ejecute entrelazado dinámico entre tareas de Putaway y Picking.",
        simTask: { hint: "Fases: SPRO -> QUEUE-DEF -> ASSIGN-RESOURCE -> INTERLEAVE-ON -> /RFUI -> TEST-RUN -> KPIS." },
        simSteps: [
            { instruction: "Acceso SPRO Recursos", expectedCmd: "SPRO", hint: "SPRO", successMessage: "> IMG de Resource Management." },
            { instruction: "Definir Cola Unificada", expectedCmd: "QUEUE-DEF", hint: "QUEUE-DEF", successMessage: "> Cola HGH-MIX creada." },
            { instruction: "Vincular Recurso", expectedCmd: "ASSIGN-RESOURCE", hint: "ASSIGN-RESOURCE", successMessage: "> Montacargas HGH-01 asignado." },
            { instruction: "Activar Interleaving", expectedCmd: "INTERLEAVE-ON", hint: "INTERLEAVE-ON", successMessage: "> Algoritmo de enlace activo." },
            { instruction: "Simular RF", expectedCmd: "/RFUI", hint: "/RFUI", successMessage: "> Operario logueado." },
            { instruction: "Prueba de Flujo", expectedCmd: "TEST-RUN", hint: "/RFUI", successMessage: "> Putaway completado -> Siguiente: Picking a 2m." },
            { instruction: "Validar Métricas", expectedCmd: "KPIS", hint: "KPIS", successMessage: "> EFICIENCIA DE FLOTA: 98.5% (CERO VACÍOS)." }
        ]
    }
];
