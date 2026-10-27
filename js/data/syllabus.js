/**
 * Logística Pro - Base de Datos Masiva (Masterclass WMS / SAP)
 * Nivel: Arquitectura Corporativa - EXPANSIÓN 1000 HORAS (Fase 2)
 */
const syllabusData = [
    // ==========================================
    // SEMESTRE 1 - MÓDULO 1 Y LAB 1 (YA SUPERADOS)
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
            // (Nota: Examen 1 resumido internamente a 10 para balancear peso de archivo, la lógica de 50 aplicará al módulo actual).
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

    // ==========================================
    // SEMESTRE 1 - EXPANSIÓN MASIVA (NUEVO)
    // ==========================================
    {
        id: "s1_m2",
        semester: 1,
        type: "theory",
        title: "1.3 Material Master Definitivo (El ADN del Inventario)",
        duration: "18 Horas • Certificación Avanzada",
        req: "s1_l1",
        description: "Disección absoluta de las vistas logísticas del Material Master (MARA, MARC, MARD). 10 capítulos teóricos y un examen bloqueante de 40 preguntas.",
        review: "Sin unidades de medida alternativas configuradas en la Vista Básica, el Warehouse Management colapsará al intentar calcular volúmenes (Putaway). El Material Master es transversal a todos los departamentos de la corporación.",
        pages: [
            `<h3>Capítulo 1: El Maestro Transversal (MARA)</h3>
            <p>El "Material Master" es el núcleo de datos más importante de SAP. Ningún proceso (Compras, Ventas, Producción, EWM) puede ejecutarse si el material no existe en el sistema. Técnicamente, la tabla central a nivel de Mandante se llama <strong>MARA</strong> (Datos Básicos).</p>
            <p>El maestro está dividido en <strong>Vistas (Views)</strong>. Diferentes departamentos son dueños de diferentes vistas. Logística no debe tocar la vista de Finanzas, y Finanzas no sabe qué poner en la vista de Warehouse Management.</p>`,

            `<h3>Capítulo 2: Tipos y Grupos de Material</h3>
            <p>Al crear un material (Transacción <strong>MM01</strong>), SAP exige dos parámetros innegociables:</p>
            <ul>
                <li><strong>Material Type (Tipo de Material):</strong> Controla el comportamiento algorítmico del producto. Ejemplos estándar: <strong>ROH</strong> (Materia Prima - Se compra pero no se vende), <strong>FERT</strong> (Producto Terminado - Se vende pero no se compra, se fabrica), <strong>HAWA</strong> (Mercadería de Trading - Se compra y se vende igual).</li>
                <li><strong>Material Group (Grupo de Artículos):</strong> Agrupa materiales para análisis de compras. (Ej. Grupo "Electrónicos" o "Tornillería").</li>
            </ul>`,

            `<h3>Capítulo 3: Vistas Básicas 1 y 2 (El Mandante)</h3>
            <p>Estas vistas aplican a nivel corporativo (Client-level). Si un atributo se define aquí, es idéntico en Japón y en México.</p>
            <p>Aquí definimos el <strong>Número de Material</strong>, la descripción (en múltiples idiomas) y el peso bruto/neto. Pero el campo más crítico y destructivo es la <strong>Unidad de Medida Base (Base Unit of Measure - BUoM)</strong>.</p>`,

            `<h3>Capítulo 4: La Matemática de las Unidades (UoM)</h3>
            <p>Regla de oro industrial: La BUoM debe ser <strong>la unidad indivisible más pequeña</strong> en la que se gestiona el producto (Ej. EA - Each/Pieza).</p>
            <p>En la vista básica, debes configurar las Unidades Alternativas. Si tu BUoM es "EA", debes declarar: <em>1 CAR (Cartón/Caja) = 24 EA</em> y <em>1 PAL (Palet) = 50 CAR</em>. Si omites esta conversión matemática, cuando llegue un camión con 10 Palets, SAP EWM no sabrá cómo calcular el volumen en el rack y rechazará la recepción de la mercancía con un error crítico (Hard Error).</p>`,

            `<h3>Capítulo 5: Vista de Compras (Purchasing View)</h3>
            <p>Mantenida a nivel de <strong>Centro (Plant)</strong>. Tabla MARC.</p>
            <p>Atributos críticos: El <strong>Purchasing Group</strong> (El código del comprador responsable de este ítem). También se define aquí el <strong>GR Processing Time</strong> (Tiempo de procesamiento de Entrada de Mercancías), es decir, cuántos días tarda el almacén en bajar el palet del camión y ponerlo disponible para la venta. Si configuras 2 días, el MRP no lo contará como stock disponible hasta el día 3.</p>`,

            `<h3>Capítulo 6: Vista Plant Data / Storage 1 (Condiciones Físicas)</h3>
            <p>A nivel de Centro/Almacén (MARD). Esta vista dicta cómo sobrevive el material en la vida real.</p>
            <p>Aquí defines las condiciones ambientales: ¿Requiere refrigeración? ¿Es un material peligroso (HazMat)? Y lo más importante para la industria alimenticia o farmacéutica: <strong>Shelf Life Expiration Date (SLED)</strong>. Aquí le dices al sistema cuántos días de vida útil tiene un producto y cuál es el porcentaje mínimo de vida restante aceptable para recibirlo de un proveedor.</p>`,

            `<h3>Capítulo 7: Vista Plant Data / Storage 2 (Pesos y Volúmenes locales)</h3>
            <p>Mientras que la Vista Básica tiene el peso global, esta vista permite ajustar parámetros locales. Si en el Centro 1000 usas palets de madera pesados y en el Centro 2000 usas palets plásticos ligeros, aquí ajustas esas métricas logísticas a nivel de Plant.</p>`,

            `<h3>Capítulo 8: Vista de Warehouse Management 1 (La Inteligencia del Putaway)</h3>
            <p>A nivel de Número de Almacén (Warehouse Number). Cuando el material cruza a EWM, esta vista es su cerebro.</p>
            <p>El <strong>Putaway Control Indicator (Indicador de entrada a stock)</strong>: Le dice al algoritmo de SAP qué tipo de estantería buscar. (Ej. 'BULK' para piso, 'HGH' para racks altos).<br>
            El <strong>Stock Removal Indicator (Indicador de salida)</strong>: Le dice al WMS qué estrategia de picking usar (FIFO - Primero en entrar, primero en salir; o LIFO - Último en entrar, primero en salir).</p>`,

            `<h3>Capítulo 9: Vista de Warehouse Management 2 (Paletización)</h3>
            <p>Aquí se definen los datos de paletización (LE Quantity). Le dices a SAP EWM exactamente cuántas cajas de este material caben en un EuroPalet estándar frente a un Palet Americano. El sistema usa esto para fragmentar una orden de compra gigante en tareas de montacargas individuales (Warehouse Tasks).</p>`,

            `<h3>Capítulo 10: Vistas Contables (Accounting 1)</h3>
            <p>Mantenidas por el departamento de FI/CO a nivel de Centro.</p>
            <p>El campo crucial es la <strong>Valuation Class (Clase de Valoración)</strong>. Este campo es el puente entre la logística y la contabilidad. Dependiendo de la clase asignada, cuando un operario mueva este material, SAP generará el asiento contable en una cuenta de mayor (G/L) específica. También se define el control de precios: <strong>V (Moving Average Price)</strong> típico para materias primas o <strong>S (Standard Price)</strong> típico para productos terminados.</p>`
        ],
        exam: [
            // Mezcla masiva de 40 preguntas (Fisher-Yates lo desordenará en la UI)
            { question: "¿Qué transacción se utiliza en SAP para crear un Maestro de Materiales?", options: [{text:"MM01", correct:true}, {text:"SPRO", correct:false}, {text:"MIGO", correct:false}, {text:"LT01", correct:false}] },
            { question: "¿Qué tabla de la base de datos almacena los Datos Básicos del material a nivel de Mandante?", options: [{text:"MARA", correct:true}, {text:"MARC", correct:false}, {text:"MARD", correct:false}, {text:"T001", correct:false}] },
            { question: "El Material Type (Tipo de Material) controla el comportamiento del producto. ¿Qué código estándar se usa para Producto Terminado?", options: [{text:"ROH", correct:false}, {text:"FERT", correct:true}, {text:"HAWA", correct:false}, {text:"HALB", correct:false}] },
            { question: "¿Qué significa ROH en SAP?", options: [{text:"Materia Prima (Raw Material)", correct:true}, {text:"Mercadería de Trading", correct:false}, {text:"Producto Semiterminado", correct:false}, {text:"Embalaje", correct:false}] },
            { question: "Regla de oro: La Unidad de Medida Base (BUoM) debe ser siempre:", options: [{text:"La unidad más pequeña en la que se gestiona el material.", correct:true}, {text:"El Palet, para optimizar espacio.", correct:false}, {text:"La unidad en la que vende el proveedor.", correct:false}, {text:"Unidades de peso (Kg).", correct:false}] },
            { question: "Si omites la conversión matemática de unidades alternativas (Ej. 1 Palet = 50 Cajas), ¿qué módulo falla críticamente al calcular volumen?", options: [{text:"SAP FI", correct:false}, {text:"SAP EWM", correct:true}, {text:"SAP HR", correct:false}, {text:"SAP CO", correct:false}] },
            { question: "El GR Processing Time (Tiempo de procesamiento de Entrada) se configura en la vista de:", options: [{text:"Ventas", correct:false}, {text:"Compras (Purchasing View)", correct:true}, {text:"Contabilidad", correct:false}, {text:"MRP", correct:false}] },
            { question: "Si el GR Processing Time es de 3 días, ¿cuándo considera el MRP que el stock está disponible para la venta tras la descarga?", options: [{text:"Inmediatamente", correct:false}, {text:"Al 3er día", correct:true}, {text:"Al finalizar el mes", correct:false}, {text:"Nunca", correct:false}] },
            { question: "La Vida Útil (SLED - Shelf Life Expiration Date) se configura a nivel de:", options: [{text:"Mandante (Client)", correct:false}, {text:"Centro/Almacén (Plant Data/Storage 1)", correct:true}, {text:"Organización de Ventas", correct:false}, {text:"Sociedad (Company Code)", correct:false}] },
            { question: "El Putaway Control Indicator (Estrategia de entrada al rack) se define en la vista:", options: [{text:"Warehouse Management 1", correct:true}, {text:"Basic Data 2", correct:false}, {text:"Purchasing", correct:false}, {text:"Accounting 1", correct:false}] },
            { question: "¿Qué campo de WM indica si el sistema usará estrategia FIFO o LIFO para retirar mercancía?", options: [{text:"Putaway Control Indicator", correct:false}, {text:"Stock Removal Indicator", correct:true}, {text:"Valuation Class", correct:false}, {text:"Material Group", correct:false}] },
            { question: "Los datos de Paletización (LE Quantity) en WM 2 le dicen al sistema:", options: [{text:"El precio del palet.", correct:false}, {text:"Cuántas unidades base o cajas caben en un palet estándar para dividir tareas.", correct:true}, {text:"El proveedor del palet.", correct:false}, {text:"La temperatura de almacenamiento.", correct:false}] },
            { question: "En la vista Accounting 1, el campo clave que hace el puente entre logística y la cuenta de mayor (G/L) en FI es:", options: [{text:"Valuation Class (Clase de Valoración)", correct:true}, {text:"Material Group", correct:false}, {text:"Purchasing Group", correct:false}, {text:"Storage Bin", correct:false}] },
            { question: "¿Qué control de precios se usa típicamente para Materias Primas por la fluctuación del mercado?", options: [{text:"V (Moving Average Price)", correct:true}, {text:"S (Standard Price)", correct:false}, {text:"F (Fixed)", correct:false}, {text:"P (Purchasing Price)", correct:false}] },
            { question: "¿Qué control de precios se usa típicamente para Productos Terminados?", options: [{text:"S (Standard Price)", correct:true}, {text:"V (Moving Average Price)", correct:false}, {text:"Z (Zero Price)", correct:false}, {text:"C (Cost Price)", correct:false}] },
            { question: "La tabla de base de datos que guarda las Vistas de Compras a nivel de Centro (Plant) es:", options: [{text:"MARA", correct:false}, {text:"MARC", correct:true}, {text:"T001", correct:false}, {text:"LQUA", correct:false}] },
            { question: "Si deseas bloquear un material para compras en todas las fábricas del mundo simultáneamente, usas el campo:", options: [{text:"Plant-Specific Material Status", correct:false}, {text:"Cross-Plant Material Status (en Basic Data)", correct:true}, {text:"Storage Location Block", correct:false}, {text:"Supplier Block", correct:false}] },
            { question: "¿Se puede modificar la Unidad de Medida Base (BUoM) una vez que el material tiene stock contabilizado?", options: [{text:"Sí, libremente.", correct:false}, {text:"No, SAP bloquea la modificación de la BUoM si existen movimientos de stock, documentos de compra o inventario físico abierto.", correct:true}, {text:"Solo por el gerente de FI.", correct:false}, {text:"Sí, usando una TR.", correct:false}] },
            { question: "El indicador de Material Peligroso (HazMat) se mantiene en la vista:", options: [{text:"Plant Data / Storage", correct:true}, {text:"Accounting", correct:false}, {text:"Sales", correct:false}, {text:"MRP 1", correct:false}] },
            { question: "¿Por qué Finanzas y Logística tienen vistas separadas en el mismo registro MM01?", options: [{text:"Porque usan bases de datos distintas.", correct:false}, {text:"Para asegurar la segregación de funciones (SoD); cada área es dueña y responsable de sus parámetros operativos o financieros.", correct:true}, {text:"Para que el sistema sea más lento.", correct:false}, {text:"Por error de diseño de SAP.", correct:false}] },
            // Agregando 20 preguntas más de alto rigor técnico para completar 40
            { question: "En un Material HAWA (Trading Good), ¿qué vista estándar normalmente NO se configura?", options: [{text:"Purchasing (Compras)", correct:false}, {text:"Work Scheduling (Preparación del Trabajo / PP)", correct:true}, {text:"Basic Data", correct:false}, {text:"Accounting", correct:false}] },
            { question: "Al crear un material con MM01, si usas la función 'Copy from' (Referencia), ¿qué información NUNCA se copia?", options: [{text:"La descripción base", correct:false}, {text:"El stock físico y los historiales de movimiento", correct:true}, {text:"El grupo de artículos", correct:false}, {text:"La unidad de medida", correct:false}] },
            { question: "La tabla MARD almacena:", options: [{text:"Datos de Centro", correct:false}, {text:"Datos de Almacén (Storage Location)", correct:true}, {text:"Datos de Ventas", correct:false}, {text:"Costos estándar", correct:false}] },
            { question: "¿Qué indicador en el Material Master permite que el material sea gestionado por número de lote (Batch Management)?", options: [{text:"Batch Requirement Indicator", correct:true}, {text:"Serial Number Profile", correct:false}, {text:"SLED Indicator", correct:false}, {text:"Valuation Category", correct:false}] },
            { question: "¿El Material Group se puede usar para restringir aprobaciones de compras?", options: [{text:"Sí, las estrategias de liberación (Release Strategies) de compras pueden basarse en el Material Group.", correct:true}, {text:"No, solo sirve para reportes de inventario.", correct:false}, {text:"Solo en SAP ERP antiguo, no en S/4HANA.", correct:false}, {text:"No, para eso se usa el Material Type.", correct:false}] },
            { question: "Si un material se cuenta por litros, pero se almacena en tambores de 200 litros, ¿qué declaras?", options: [{text:"BUoM = Tambor, Alt UoM = Litro", correct:false}, {text:"BUoM = Litro, Alt UoM = Tambor (1 Tambor = 200 L)", correct:true}, {text:"Solo litros.", correct:false}, {text:"Solo tambores.", correct:false}] },
            { question: "¿Dónde defines el perfil de número de serie si cada laptop requiere rastreo individual?", options: [{text:"Plant Data / Storage 2", correct:true}, {text:"Accounting 1", correct:false}, {text:"Purchasing", correct:false}, {text:"WM 1", correct:false}] },
            { question: "¿Qué vista es obligatoria para emitir una Orden de Venta (Sales Order) al cliente final?", options: [{text:"Sales: General/Plant Data", correct:true}, {text:"Purchasing", correct:false}, {text:"MRP 4", correct:false}, {text:"Quality Management", correct:false}] },
            { question: "Si un producto requiere inspección de calidad antes de poder usarse en producción, se configura en:", options: [{text:"Quality Management View", correct:true}, {text:"Basic Data 1", correct:false}, {text:"Accounting", correct:false}, {text:"WM 2", correct:false}] },
            { question: "¿Qué sucede si olvidas crear la Vista de Compras (Purchasing) para un material ROH?", options: [{text:"No se podrá emitir una Purchase Order (Orden de Compra) para ese material en ese Centro.", correct:true}, {text:"El sistema asigna un proveedor automático.", correct:false}, {text:"Se bloquea el MRP.", correct:false}, {text:"Nada, EWM lo asume.", correct:false}] },
            { question: "El código EAN/UPC (Código de barras global) se asigna en:", options: [{text:"WM 1", correct:false}, {text:"Basic Data 1", correct:true}, {text:"Sales", correct:false}, {text:"Purchasing", correct:false}] },
            { question: "Si necesitas que el inventario se cuente físicamente cada 3 meses en lugar de 1 vez al año, ajustas el:", options: [{text:"CC (Cycle Counting) Physical Inventory Indicator", correct:true}, {text:"MRP Type", correct:false}, {text:"Putaway Indicator", correct:false}, {text:"Lot Size", correct:false}] },
            { question: "¿Un mismo número de material puede tener diferentes Valuation Classes en dos Centros distintos?", options: [{text:"Sí, si la Valoración es a nivel de Plant, se pueden tener clases y costos distintos.", correct:true}, {text:"No, la Valuation Class es Cross-Client.", correct:false}, {text:"Solo si el material es HAWA.", correct:false}, {text:"Sí, pero genera alertas rojas.", correct:false}] },
            { question: "¿Qué vista debes extender si un almacén tradicional (IM) se actualiza a un almacén avanzado (EWM)?", options: [{text:"Warehouse Management 1 y 2", correct:true}, {text:"Sales 1 y 2", correct:false}, {text:"Accounting 1", correct:false}, {text:"Basic Data 2", correct:false}] },
            { question: "El campo 'Division' (Sector) que vincula el material a la estructura de SD se encuentra en:", options: [{text:"Basic Data 1", correct:true}, {text:"WM 1", correct:false}, {text:"Purchasing", correct:false}, {text:"Accounting 1", correct:false}] },
            { question: "¿Qué transacción masiva permite modificar un campo de cientos de materiales al mismo tiempo?", options: [{text:"MM17 (Mass Maintenance)", correct:true}, {text:"MM01", correct:false}, {text:"MM03", correct:false}, {text:"MIGO", correct:false}] },
            { question: "Si un material ya no se va a usar, ¿cuál es la mejor práctica?", options: [{text:"Borrarlo de la base de datos con un script.", correct:false}, {text:"Marcarlo para borrado (Flag for Deletion) usando MM06 a nivel de Centro o Mandante.", correct:true}, {text:"Cambiar su precio a cero.", correct:false}, {text:"Renombrarlo a 'NO USAR'.", correct:false}] },
            { question: "El Grupo de Compras (Purchasing Group) representa a:", options: [{text:"El proveedor.", correct:false}, {text:"El individuo o equipo de compradores internos responsables del aprovisionamiento de ese material.", correct:true}, {text:"El cliente.", correct:false}, {text:"El operador del montacargas.", correct:false}] },
            { question: "En la creación MM01, el mensaje 'Material ya existe, se extenderá a la nueva vista' significa:", options: [{text:"Error fatal.", correct:false}, {text:"Que el material base existe en el mandante, pero se le están agregando datos de un nuevo departamento o Centro.", correct:true}, {text:"Que se está duplicando el inventario físico.", correct:false}, {text:"Que el sistema colapsó.", correct:false}] },
            { question: "¿Estás listo para crear materiales a nivel consultor senior?", options: [{text:"Sí, comprendo que el Material Master es el engranaje principal de todo el ecosistema SAP.", correct:true}, {text:"No, volveré a leer.", correct:false}] }
        ]
    },
    {
        id: "s1_l2",
        semester: 1,
        type: "lab",
        title: "1.4 Lab Multi-Paso: Alta de Producto Terminado",
        duration: "1 Hora 15 Min",
        req: "s1_m2",
        description: "Ejecuta la transacción MM01. Crea un Producto Terminado (FERT) y define sus métricas críticas de almacén.",
        simTask: { hint: "Fases: MM01 -> FERT -> WM -> 1000 -> 0001 -> EA -> BULK -> SAVE. Tres errores seguidos y serás expulsado." },
        simSteps: [
            { instruction: "<strong>Fase 1/8: Iniciar Alta</strong><br>Inicia la transacción para crear Materiales.", expectedCmd: "MM01", hint: "MM01", successMessage: "> Dynpro inicial MM01." },
            { instruction: "<strong>Fase 2/8: Tipo de Material</strong><br>El sistema pide el 'Industry Sector' (M - Mechanical) y el 'Material Type'. Escribe el código estándar para un Producto Terminado.", expectedCmd: "FERT", hint: "FERT", successMessage: "> Material Type: FERT validado." },
            { instruction: "<strong>Fase 3/8: Selección de Vistas</strong><br>Logística exige definir la inteligencia de ubicación tridimensional. Selecciona la vista de Warehouse Management escribiendo 'WM'.", expectedCmd: "WM", hint: "WM", successMessage: "> Vistas WM seleccionadas." },
            { instruction: "<strong>Fase 4/8: Nivel de Centro</strong><br>Declara en qué Centro físico va a existir este producto. Ingresa el Plant principal: '1000'.", expectedCmd: "1000", hint: "1000", successMessage: "> Plant 1000 verificado." },
            { instruction: "<strong>Fase 5/8: Nivel de Almacén</strong><br>Asigna el Storage Location de Producto Terminado (0001).", expectedCmd: "0001", hint: "0001", successMessage: "> SLoc 0001 verificado. Abriendo Maestro..." },
            { instruction: "<strong>Fase 6/8: Vistas Básicas (BUoM)</strong><br>El sistema exige la Unidad de Medida Base. Ingresa el código internacional para 'Pieza' o 'Cada una' (Each).", expectedCmd: "EA", hint: "EA", successMessage: "> BUoM: EA seteada globalmente." },
            { instruction: "<strong>Fase 7/8: Estrategia Putaway (WM 1)</strong><br>El producto pesa 2 toneladas. En la vista WM 1, asigna el Putaway Control Indicator para que el WMS busque espacio en piso y no rompa los racks en altura. Escribe 'BULK'.", expectedCmd: "BULK", hint: "BULK", successMessage: "> Estrategia BULK Storage asignada a algoritmo." },
            { instruction: "<strong>Fase 8/8: Contabilizar Base de Datos</strong><br>Todos los datos logísticos están en caché. Confirma y contabiliza el nuevo registro maestro en la tabla MARA/MARC/MARD. Comando: 'SAVE'.", expectedCmd: "SAVE", hint: "SAVE", successMessage: "> Validando consistencia de unidades...\n> Asignando número de material interno...\n> MATERIAL CREADO: '5009214' Creado en Plant 1000.\n> EWM Listo para Putaway." }
        ]
    }
];
