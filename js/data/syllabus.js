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
            `<h3>Capítulo 1: El Paradigma Inbound Moderno</h3>
            <p>El proceso de entrada (Inbound) no comienza cuando el camión llega al almacén, comienza cuando el proveedor cierra las puertas del camión en su fábrica en otro país.</p>
            <p>En almacenes pequeños, el guardia llama por radio, el camión entra, y el almacenista usa la transacción MIGO para recibir la mercancía basándose en un papel (Orden de Compra - PO). En almacenes corporativos (SAP EWM), hacer esto es un suicidio operativo. Se requiere visibilidad anticipada para planificar el personal, los montacargas y el espacio en los racks.</p>`,

            `<h3>Capítulo 2: El Aviso de Expedición (ASN / Inbound Delivery)</h3>
            <p>La <strong>Inbound Delivery (Entrega Entrante)</strong>, también conocida como ASN (Advanced Shipping Notification), es el documento puente. Se genera en SAP con la transacción <strong>VL31N</strong>.</p>
            <p>El ASN le dice al almacén exactamente qué viene, a qué hora llega, en qué tipo de palets está empacado, y cuál es el peso bruto del camión. Mientras que la Orden de Compra (PO) es un compromiso financiero, el ASN es un compromiso puramente logístico y operativo.</p>`,

            `<h3>Capítulo 3: Handling Unit Management (HUM)</h3>
            <p>A nivel de ASN, entra en juego el submódulo HUM (Gestión de Unidades de Manipulación). SAP no quiere recibir "1000 laptops"; SAP quiere recibir "2 Palets (HUs), cada uno con 50 Cajas (HUs hijas), cada una con 10 laptops".</p>
            <p>El código de barras internacional que identifica a un palet único en el mundo se llama <strong>SSCC (Serial Shipping Container Code)</strong> de 18 dígitos. Al escanear el SSCC en la rampa de descarga, SAP EWM automáticamente da por recibidas las 1000 laptops sin que el operario tenga que contarlas manualmente.</p>`,

            `<h3>Capítulo 4: Yard Management (Gestión de Patios)</h3>
            <p>El almacén tiene un límite físico de andenes (Doors). El Yard Management (YM) gestiona el flujo vehicular desde el Check-in en la garita hasta el Check-out.</p>
            <p>Un camión (representado como un Transporte en SAP o un <em>Vehicle/Transportation Unit</em> en EWM) llega a la puerta principal. El guardia le asigna un estado: <strong>"Llegada al Checkpoint"</strong>. El sistema calcula qué muelle está libre y le dice: "Diríjase a la Puerta (Door) 04". Si el muelle está ocupado, lo envía a una zona de estacionamiento interna (Parking Space).</p>`,

            `<h3>Capítulo 5: MIGO vs VL32N</h3>
            <p>La transacción <strong>MIGO</strong> (Movement Type 101) es la vieja confiable de Inventory Management (IM). Sirve para recibir directamente contra una Orden de Compra.</p>
            <p>La transacción <strong>VL32N</strong> (Modificar Inbound Delivery) pertenece al módulo Logistics Execution (LE). En operaciones corporativas, el usuario NUNCA usa MIGO. Ejecuta la contabilización de la entrada (Post Goods Receipt - PGR) directamente sobre la Inbound Delivery. Esto actualiza EWM y FI simultáneamente.</p>`,

            `<h3>Capítulo 6: La Zona Temporal (GR Zone)</h3>
            <p>Físicamente, cuando descargas el camión, los palets no se teletransportan al rack de 15 metros de altura. Se dejan en una zona delimitada en el piso frente a los muelles.</p>
            <p>En SAP EWM, esta área se mapea como un Storage Type especial llamado <strong>GR Zone (Goods Receipt Zone) / Zona 902</strong>. Es un área transitoria. El inventario aquí pertenece legalmente a la empresa, pero logísticamente está "en tránsito interno" (Putaway Status: Not Started). Un palet no debe vivir en la GR Zone más de unas pocas horas.</p>`,

            `<h3>Capítulo 7: Integración con Calidad (QM)</h3>
            <p>¿Qué pasa si la política exige que la materia prima pase por el laboratorio? En la Vista de Compras y de Calidad del Material Master se activa el QM.</p>
            <p>Al hacer el Post Goods Receipt (PGR), el sistema intercepta el palet. El stock no entra como "Unrestricted-Use" (Libre Utilización), sino que entra automáticamente como <strong>"Quality Inspection Stock" (Stock en Control de Calidad)</strong>. El WMS enruta físicamente el palet a una jaula de cuarentena. Ningún vendedor puede prometer ese stock a un cliente hasta que el técnico de laboratorio apruebe el Lote de Inspección (Inspection Lot) mediante la transacción QA11.</p>`,

            `<h3>Capítulo 8: Expected Goods Receipt (EGR)</h3>
            <p>En S/4HANA EWM, existe un documento llamado EGR. Sirve como un "espejo" de las órdenes de compra del ERP hacia el WMS.</p>
            <p>Si el sistema SAP ERP se cae o pierde conexión temporalmente, el almacén (EWM) puede seguir trabajando y recibiendo camiones basándose en los EGR pre-descargados, garantizando un uptime del 99.9% en las operaciones de rampa.</p>`,

            `<h3>Capítulo 9: Reversiones de Inventario (Movement Type 102)</h3>
            <p>El error humano es inevitable. Un almacenista escanea 1000 unidades, pero físicamente solo venían 100.</p>
            <p>El movimiento de recepción (101) desencadenó un pago al proveedor y una subida de inventario. Para anularlo, se debe ejecutar una cancelación con el <strong>Movement Type 102 (Reversal)</strong>. Esto anula el asiento financiero y saca lógicamente el palet del almacén. Sin embargo, si el WMS ya movió el palet al rack alto, SAP bloqueará la reversión hasta que físicamente bajes el palet de nuevo a la GR Zone.</p>`,

            `<h3>Capítulo 10: Tolerancias de Entrega (Over/Under Delivery)</h3>
            <p>Los proveedores rara vez envían exactamente lo que pediste. Si compraste 100 toneladas de acero, el camión puede traer 101 toneladas.</p>
            <p>En la Vista de Compras (Purchasing View), el arquitecto configura las <strong>Tolerancias</strong>. Si configuras un "Overdelivery Tolerance" del 5%, el almacenista podrá recibir hasta 105 toneladas sin pedir permiso. Si el camión trae 106, el sistema arroja un "Hard Error" (M7 022) y el camión queda inmovilizado en el muelle hasta que el comprador (Purchasing Group) modifique la PO.</p>`
        ],
        exam: [
            // 40 preguntas nivel certificación EWM/MM
            { question: "En un ecosistema SAP avanzado con EWM, ¿cuál es el documento recomendado para iniciar la recepción física de mercancía desde un proveedor internacional?", options: [{text:"Inbound Delivery (ASN)", correct:true}, {text:"Purchase Order (PO)", correct:false}, {text:"Outbound Delivery", correct:false}, {text:"Material Document", correct:false}] },
            { question: "¿Qué transacción de SAP GUI se utiliza para crear manualmente una Inbound Delivery?", options: [{text:"VL31N", correct:true}, {text:"MIGO", correct:false}, {text:"MM01", correct:false}, {text:"VA01", correct:false}] },
            { question: "El código de barras internacional de 18 dígitos que identifica de manera única a una Unidad de Manipulación (Palet) en el mundo logístico es:", options: [{text:"SSCC (Serial Shipping Container Code)", correct:true}, {text:"EAN13", correct:false}, {text:"UPC", correct:false}, {text:"RFID", correct:false}] },
            { question: "¿Qué representa el submódulo HUM en SAP?", options: [{text:"Handling Unit Management (Gestión de Unidades de Manipulación)", correct:true}, {text:"Human Usage Metrics", correct:false}, {text:"Hazardous Unit Materials", correct:false}, {text:"Hardware Update Mode", correct:false}] },
            { question: "En SAP Yard Management (Gestión de Patios), el estado operativo inicial cuando el guardia registra la matrícula del camión es:", options: [{text:"Check-in / Llegada al Checkpoint", correct:true}, {text:"Docked / En muelle", correct:false}, {text:"Loading / Cargando", correct:false}, {text:"Goods Receipt", correct:false}] },
            { question: "Si usas la transacción MIGO para recibir mercancía, el Movement Type (Clase de Movimiento) estándar para la entrada por pedido de compras es:", options: [{text:"101", correct:true}, {text:"102", correct:false}, {text:"561", correct:false}, {text:"601", correct:false}] },
            { question: "¿Qué sucede a nivel financiero cuando se contabiliza un Post Goods Receipt (PGR) exitosamente?", options: [{text:"Se carga la cuenta de inventario y se abona la cuenta puente GR/IR (Goods Receipt / Invoice Receipt).", correct:true}, {text:"Se emite el cheque de pago automáticamente al proveedor.", correct:false}, {text:"Se eliminan los impuestos.", correct:false}, {text:"Nada, EWM no afecta FI.", correct:false}] },
            { question: "En EWM, el área transitoria en el piso donde se descargan los camiones antes de llevar la mercancía al rack se conoce comúnmente como:", options: [{text:"GR Zone (902)", correct:true}, {text:"High Rack", correct:false}, {text:"Scrap Zone", correct:false}, {text:"Outbound Staging Area", correct:false}] },
            { question: "¿Qué tipo de stock (Stock Type) asigna automáticamente SAP si el material tiene activa la inspección de calidad (QM)?", options: [{text:"Quality Inspection Stock", correct:true}, {text:"Unrestricted-Use Stock", correct:false}, {text:"Blocked Stock", correct:false}, {text:"Valuated GR Blocked Stock", correct:false}] },
            { question: "Si un palet está en 'Quality Inspection Stock', ¿puede el departamento de ventas despacharlo en un camión para un cliente?", options: [{text:"No, el sistema prohíbe el despacho hasta que Calidad (QM) libere el lote de inspección mediante la decisión de empleo (UD).", correct:true}, {text:"Sí, asumiendo el riesgo.", correct:false}, {text:"Sí, pero solo a clientes VIP.", correct:false}, {text:"Depende del peso del palet.", correct:false}] },
            { question: "¿Qué transacción usa el equipo de Calidad (QM) para tomar la Decisión de Empleo (Usage Decision) y liberar el stock?", options: [{text:"QA11", correct:true}, {text:"MIGO", correct:false}, {text:"VL32N", correct:false}, {text:"SPRO", correct:false}] },
            { question: "En EWM, el documento EGR (Expected Goods Receipt) es vital para:", options: [{text:"Permitir que el almacén siga operando y recibiendo si el sistema ERP principal (S/4HANA) se cae o pierde conexión temporalmente.", correct:true}, {text:"Imprimir facturas.", correct:false}, {text:"Calcular los impuestos aduaneros.", correct:false}, {text:"Rechazar camiones sin cita.", correct:false}] },
            { question: "Si te equivocas en una recepción (MIGO 101) y necesitas anular el documento de material, debes ejecutar un Movement Type:", options: [{text:"102 (Reversal)", correct:true}, {text:"101", correct:false}, {text:"311", correct:false}, {text:"602", correct:false}] },
            { question: "Al intentar hacer una reversión (102) de un palet que recibiste ayer, SAP arroja un error. ¿Por qué ocurre esto comúnmente en un entorno EWM?", options: [{text:"Porque el montacargas ya ejecutó la Warehouse Task y movió el palet al rack alto. EWM no permite reversiones si el stock no está físicamente en la zona de muelle (GR Zone).", correct:true}, {text:"Porque pasaron más de 24 horas.", correct:false}, {text:"Porque FI ya bloqueó el sistema.", correct:false}, {text:"Porque debes pedir permiso por correo.", correct:false}] },
            { question: "Si un proveedor envía 105 toneladas en lugar de 100, y el sistema SAP recibe la mercancía exitosamente sin errores, esto se debe a:", options: [{text:"Que la tolerancia de exceso de suministro (Overdelivery Tolerance) configurada en la PO o en el Material Master lo permitía.", correct:true}, {text:"Un bug del sistema SAP.", correct:false}, {text:"Que el usuario forzó el sistema con un T-Code secreto.", correct:false}, {text:"Que EWM ignora las cantidades de la PO.", correct:false}] },
            { question: "¿Qué código de error fatal (Hard Error) arroja SAP cuando la cantidad recibida excede el porcentaje de tolerancia máximo permitido?", options: [{text:"M7 022 (PU Exceeded by...)", correct:true}, {text:"404 Not Found", correct:false}, {text:"ABAP Dump", correct:false}, {text:"QA 100", correct:false}] },
            { question: "En Yard Management, si todos los andenes de descarga (Doors) están ocupados, ¿a dónde dirige el sistema al camión recién llegado?", options: [{text:"A una plaza de aparcamiento interna (Parking Space).", correct:true}, {text:"A la calle, fuera de la empresa.", correct:false}, {text:"A la zona de chatarra.", correct:false}, {text:"A la oficina contable.", correct:false}] },
            { question: "La Inbound Delivery a nivel de ERP contiene el número de PO como referencia. Al replicarse a EWM, se convierte en un documento llamado:", options: [{text:"Inbound Delivery (Documento de Entrega Entrante de EWM)", correct:true}, {text:"Transfer Order", correct:false}, {text:"Warehouse Request", correct:false}, {text:"Outbound Order", correct:false}] },
            { question: "Una Inbound Delivery puede agrupar múltiples Órdenes de Compra (POs) diferentes siempre y cuando:", options: [{text:"Vengan del mismo proveedor y tengan destino al mismo Plant.", correct:true}, {text:"Tengan el mismo peso.", correct:false}, {text:"El comprador sea la misma persona.", correct:false}, {text:"Nunca se pueden agrupar POs diferentes.", correct:false}] },
            { question: "El proceso de empacar virtualmente mercancías sueltas dentro de un cartón, y luego ese cartón dentro de un palet, se conoce en SAP como:", options: [{text:"Unidades de Manipulación Anidadas (Nested HUs)", correct:true}, {text:"Cartonization virtual", correct:false}, {text:"Slotting dinámico", correct:false}, {text:"Consolidación cruzada", correct:false}] },
            // (Preguntas extra de estrés y validación técnica)
            { question: "¿Cuál es el Movement Type estándar de SAP para trasladar stock libremente de un Storage Location a otro dentro del MISMO Plant?", options: [{text:"311", correct:true}, {text:"101", correct:false}, {text:"102", correct:false}, {text:"561", correct:false}] },
            { question: "Si haces un ingreso inicial de inventario (Carga de saldos iniciales en Go-Live) sin una orden de compra, el Movement Type clásico es:", options: [{text:"561", correct:true}, {text:"101", correct:false}, {text:"311", correct:false}, {text:"601", correct:false}] },
            { question: "El documento resultante (físico y contable) de una transacción MIGO se llama:", options: [{text:"Material Document (y su respectivo Accounting Document)", correct:true}, {text:"Inbound Delivery", correct:false}, {text:"Warehouse Task", correct:false}, {text:"Transfer Order", correct:false}] },
            { question: "¿El Yard Management (YM) de SAP requiere coordenadas GPS reales de los camiones?", options: [{text:"No obligatoriamente. Se basa en hitos y checkpoints lógicos del almacén.", correct:true}, {text:"Sí, es 100% dependiente de satélites.", correct:false}, {text:"No existe YM en SAP.", correct:false}, {text:"Solo si el camión es de la misma empresa.", correct:false}] },
            { question: "En un proceso Inbound con HUs, la etiqueta que se imprime y se pega en el palet con el SSCC para ser escaneada se conoce como:", options: [{text:"HU Label (Etiqueta de Unidad de Manipulación)", correct:true}, {text:"Material Label", correct:false}, {text:"PO Document", correct:false}, {text:"Delivery Note", correct:false}] },
            { question: "Si el camión llega y el proveedor olvidó poner las etiquetas SSCC, ¿el almacén se detiene?", options: [{text:"No. El sistema permite imprimir etiquetas de HU internas en la zona de recepción para paletizar la carga suelta.", correct:true}, {text:"Sí, el camión debe ser devuelto a su país de origen.", correct:false}, {text:"Sí, hasta que se anule la Orden de Compra.", correct:false}, {text:"El sistema no las requiere en EWM.", correct:false}] },
            { question: "El campo 'Underdelivery Tolerance' sirve para:", options: [{text:"Permitir que el almacén cierre y complete la orden (PGR) aunque el proveedor haya enviado menos cantidad de la pactada.", correct:true}, {text:"Permitir que el camión llegue tarde.", correct:false}, {text:"Reducir el precio de compra.", correct:false}, {text:"Rechazar el camión por traer peso insuficiente.", correct:false}] },
            { question: "Verdadero o Falso: Un ASN siempre requiere confirmación manual mediante MIGO.", options: [{text:"Falso. En Logistics Execution (LE), el PGR se hace en la VL32N, anulando la necesidad de usar MIGO 101.", correct:true}, {text:"Verdadero.", correct:false}] },
            { question: "¿Qué sucede si el empleado realiza un PGR y la fecha de caducidad (SLED) ingresada es menor al mínimo aceptado por la configuración?", options: [{text:"El sistema arroja un error duro y prohíbe la recepción de esa mercancía.", correct:true}, {text:"El sistema lo acepta pero envía un email al gerente.", correct:false}, {text:"El sistema ajusta el precio a la mitad.", correct:false}, {text:"EWM mueve el palet a cuarentena pero lo recibe.", correct:false}] },
            { question: "En EWM, después de realizar el PGR en la zona 902 (GR Zone), ¿cuál es el siguiente paso lógico del sistema?", options: [{text:"Crear automáticamente una Warehouse Task para el Putaway (Almacenamiento físico en el rack).", correct:true}, {text:"Facturarle al cliente.", correct:false}, {text:"Borrar la Inbound Delivery.", correct:false}, {text:"Sacar el camión de la garita.", correct:false}] },
            { question: "En operaciones de retail, recibir en la Puerta 1 y enviar directamente a la Puerta 10 sin almacenar en los racks se conoce como:", options: [{text:"Cross-Docking", correct:true}, {text:"Putaway Flow", correct:false}, {text:"Yard Routing", correct:false}, {text:"Replenishment", correct:false}] },
            { question: "La cuenta contable 'GR/IR' (Goods Receipt / Invoice Receipt) funciona como:", options: [{text:"Una cuenta puente (clearing account) que equilibra la recepción física (GR) contra la factura legal (IR) del proveedor.", correct:true}, {text:"La cuenta del banco donde se paga la nómina.", correct:false}, {text:"Un registro de los kilómetros del camión.", correct:false}, {text:"Un fondo de caja chica.", correct:false}] },
            { question: "¿Quién es el responsable de despejar y cuadrar la cuenta GR/IR si hay discrepancias?", options: [{text:"El departamento de Finanzas / Cuentas por Pagar.", correct:true}, {text:"El montacarguista.", correct:false}, {text:"El supervisor de patio.", correct:false}, {text:"El guardia de seguridad.", correct:false}] },
            { question: "En SAP, la transacción MMBE (Stock Overview) sirve para:", options: [{text:"Visualizar la cantidad de stock disponible, reservado o en calidad a través de todos los niveles organizativos.", correct:true}, {text:"Hacer el pago al proveedor.", correct:false}, {text:"Mover mercancía físicamente.", correct:false}, {text:"Dar de alta un cliente.", correct:false}] },
            { question: "¿Puede un operario de almacén realizar un Movement Type 101 si la Orden de Compra (PO) no ha sido liberada (aprobada) por la gerencia?", options: [{text:"No. MIGO bloqueará la recepción de una PO sin estrategia de liberación completada.", correct:true}, {text:"Sí, la logística es independiente de las aprobaciones.", correct:false}, {text:"Solo si ingresa una contraseña especial.", correct:false}, {text:"El sistema emite un aviso, pero lo permite.", correct:false}] },
            { question: "Si un ASN de 10 pallets se cae del sistema EWM por un error técnico de interfaz qRFC, ¿dónde se verifica el atasco?", options: [{text:"En la transacción SMQ1 / SMQ2 (Monitor de colas).", correct:true}, {text:"En la MIGO.", correct:false}, {text:"En el maestro de materiales.", correct:false}, {text:"En el servidor DEV.", correct:false}] },
            { question: "La transacción estándar para aprobar un Lote de Inspección (Usage Decision) y mover el stock de 'Quality' a 'Unrestricted' es:", options: [{text:"QA11", correct:true}, {text:"QA10", correct:false}, {text:"LT01", correct:false}, {text:"MIGO", correct:false}] },
            { question: "¿El WMS permite que un montacargas haga Putaway de un palet que aún está bloqueado en calidad?", options: [{text:"Sí. Físicamente el palet se almacena en el rack final, pero lógicamente sigue bloqueado en el sistema para evitar su picking.", correct:true}, {text:"No, los palets de calidad deben quedarse en el piso para siempre.", correct:false}, {text:"Solo si el rack está a nivel de piso.", correct:false}, {text:"No, SAP requiere que todo palet en calidad vuelva al camión.", correct:false}] },
            { question: "¿Cuál es el objetivo final de la Ingeniería Inbound eficiente?", options: [{text:"Eliminar cuellos de botella en los muelles, procesar la recepción rápidamente y hacer el stock disponible para la venta en el menor tiempo posible.", correct:true}, {text:"Llenar el almacén hasta el tope.", correct:false}, {text:"Negociar precios con proveedores.", correct:false}, {text:"Despedir personal.", correct:false}] },
            { question: "¿Estás listo para ejecutar la recepción logística?", options: [{text:"Sí, asumo la responsabilidad.", correct:true}, {text:"No.", correct:false}] }
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
        simTask: { hint: "Fases: VL31N -> PO-SONY99 -> 500 -> PACK -> VL32N -> PGR -> MMBE. Si fallas 3 veces, el sistema revierte el ASN y te expulsa." },
        simSteps: [
            { instruction: "<strong>Fase 1/7: Creación del ASN</strong><br>El guardia reporta que el camión de Sony está en la garita con la PO 'PO-SONY99'. Ingresa la transacción para crear una Inbound Delivery.", expectedCmd: "VL31N", hint: "VL31N", successMessage: "> Cargando Dynpro inicial Inbound Delivery..." },
            { instruction: "<strong>Fase 2/7: Asignación de PO</strong><br>El sistema te pide el número de Orden de Compra de referencia. Ingresa el código provisto por el guardia.", expectedCmd: "PO-SONY99", hint: "PO-SONY99", successMessage: "> PO Validada. Extrayendo datos de compra...\n> Material: PS5_CONSOLE | Pendiente: 500 EA." },
            { instruction: "<strong>Fase 3/7: Verificación de Cantidad</strong><br>El conductor entrega la factura física (Bill of Lading). Indica que vienen 500 unidades. Ingresa la cantidad para el Delivery Quantity.", expectedCmd: "500", hint: "500", successMessage: "> Cantidad 500 EA dentro de la tolerancia de la PO." },
            { instruction: "<strong>Fase 4/7: HUM (Empaque virtual)</strong><br>En empresas EWM, no puedes recibir suelto. Debes meter las 500 consolas en un Palet (HU). Escribe el comando para invocar la pantalla de empaque.", expectedCmd: "PACK", hint: "PACK", successMessage: "> Abriendo interfaz Handling Unit Management...\n> Generando SSCC Automático...\n> HU 100000000000000452 empaquetada." },
            { instruction: "<strong>Fase 5/7: Modificación para Recepción</strong><br>El ASN fue creado (Delivery 180045). El camión ha sido descargado en la zona 902. Ingresa la transacción para MODIFICAR la Inbound Delivery y realizar la entrada oficial.", expectedCmd: "VL32N", hint: "VL32N", successMessage: "> Inbound Delivery 180045 abierta en modo edición." },
            { instruction: "<strong>Fase 6/7: Post Goods Receipt (PGR)</strong><br>Todo cuadra. Escribe el comando crítico que actualiza el inventario en EWM y genera la deuda en Finanzas simultáneamente.", expectedCmd: "PGR", hint: "PGR", successMessage: "> Ejecutando Post Goods Receipt...\n> Generando Material Document...\n> Generando Accounting Document en FI...\n> ÉXITO: Inventario contabilizado en GR Zone." },
            { instruction: "<strong>Fase 7/7: Verificación de Saldo</strong><br>Como arquitecto, siempre debes verificar que tus datos hayan impactado la base. Ingresa la transacción estándar (Stock Overview) para confirmar que las 500 consolas están en el sistema.", expectedCmd: "MMBE", hint: "MMBE", successMessage: "> Consultando tabla MARD/LQUA...\n> Plant: 1000 | SLoc: 0001 | Material: PS5_CONSOLE\n> Stock Unrestricted: 500 EA.\n> LABORATORIO INBOUND COMPLETADO." }
        ]
    }
