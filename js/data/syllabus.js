/**
 * Logística Pro - Base de Datos Masiva (Masterclass WMS / SAP)
 * Nivel: Consultoría y Arquitectura Corporativa
 */
const syllabusData = [
    {
        id: "s1_m1",
        semester: 1,
        type: "theory",
        title: "1.1 Arquitectura Empresarial (Enterprise Structure)",
        duration: "3 Horas • Especialización",
        description: "Aprende a mapear corporaciones multinacionales desde la sociedad financiera hasta el almacén físico.",
        review: "La jerarquía inquebrantable de SAP: Client -> Company Code (Finanzas) -> Plant (Operaciones) -> Storage Location (MM) -> Warehouse Number (EWM). Todo movimiento de caja afecta a la contabilidad.",
        pages: [
            `<h3>El Lienzo Corporativo</h3>
            <p>Un error común de los ingenieros junior es pensar que un almacén en SAP es solo un edificio. En la vida real, SAP requiere un mapeo <strong>legal y financiero</strong> antes de permitirte guardar una sola caja. Cuando implementas SAP en una empresa (ej. Coca-Cola), debes estructurar la compañía de Macro a Micro.</p>
            <ul>
                <li><strong>El Mandante (Client):</strong> Es el nivel de base de datos más alto. Los datos aquí se comparten en toda la corporación a nivel mundial.</li>
                <li><strong>La Sociedad (Company Code - FI):</strong> Es la entidad legal. Emite balances y paga impuestos (Ej. Coca-Cola Colombia S.A.S). La logística no existe si no está amparada por un Company Code, ya que cada palet tiene un valor monetario.</li>
            </ul>`,
            
            `<h3>El Centro Logístico (Plant)</h3>
            <p>El "Plant" es la unidad operativa fundamental. Representa una fábrica, un mega centro de distribución o incluso una sucursal corporativa de mantenimiento. Todo el módulo de <strong>Planificación de Producción (PP)</strong> y <strong>Gestión de Materiales (MM)</strong> gira en torno al Plant.</p>
            <p>Dentro de un Plant, el inventario se divide en <strong>Storage Locations</strong> (Almacenes Lógicos). Estos no tienen geometría. Si tienes 1,000 laptops en el Storage Location 0001, SAP MM sabe que tienes 1,000 unidades y que valen $1,000,000 USD, pero <em>no tiene ni idea de en qué pasillo están</em>. Es un inventario ciego.</p>`,
            
            `<h3>El Cruce de la Frontera: Warehouse Number</h3>
            <p>Para darle visión tridimensional al sistema, el Storage Location lógico de MM se "enchufa" a un <strong>Warehouse Number (Número de Almacén)</strong> en el módulo EWM.</p>
            <p>En el instante en que la mercancía cruza al Warehouse Number, las reglas cambian. El dinero pasa a un segundo plano y el sistema empieza a calcular <strong>Volumen (M3), Peso (KG), Rutas de Montacargas, y Pasillos de Alta Rotación</strong>. EWM es un motor de ejecución física en tiempo real.</p>`
        ],
        exam: [
            {
                question: "¿Qué nivel de la estructura organizativa de SAP se encarga estrictamente de la presentación de balances financieros e impuestos legales?",
                options: [
                    { text: "El Centro (Plant)", correct: false },
                    { text: "El Storage Location", correct: false },
                    { text: "La Sociedad (Company Code)", correct: true },
                    { text: "El Warehouse Number", correct: false }
                ]
            },
            {
                question: "Si el módulo SAP MM (Materials Management) conoce la cantidad total y el valor del inventario, ¿por qué necesitamos conectarlo a SAP EWM?",
                options: [
                    { text: "Porque MM no puede emitir órdenes de compra, solo EWM puede.", correct: false },
                    { text: "Porque MM es ciego respecto a la geometría (Pasillos, Racks) y EWM mapea la ubicación exacta (Coordenadas X, Y, Z).", correct: true },
                    { text: "Porque EWM calcula los impuestos de importación.", correct: false }
                ]
            },
            {
                question: "Verdadero o Falso: Un Storage Location puede existir sin estar asignado a un Plant.",
                options: [
                    { text: "Falso. Todo Storage Location debe pertenecer físicamente y lógicamente a un Plant.", correct: true },
                    { text: "Verdadero. Son entidades independientes.", correct: false }
                ]
            }
        ]
    },
    {
        id: "s1_l1",
        semester: 1,
        type: "lab",
        title: "1.2 Lab Multi-Paso: Customizing de Estructura",
        duration: "45 Min • Simulador SAP",
        req: "s1_m1",
        description: "Entra al sistema troncal de parametrización y crea un Storage Location desde cero.",
        simTask: { hint: "En la vida real, los consultores no usan los menús. Usan los T-Codes directamente. Sigue las instrucciones del simulador." },
        simSteps: [
            {
                instruction: "<strong>FASE 1:</strong> Como consultor SAP, debes ingresar al menú principal de parametrización del sistema. Ingresa el T-Code universal de Customizing.",
                expectedCmd: "SPRO",
                hint: "S_ _ O",
                successMessage: "> AUTORIZACIÓN VERIFICADA\n> Cargando SAP Reference IMG...\n> Árbol de configuración desplegado."
            },
            {
                instruction: "<strong>FASE 2:</strong> Ahora que estás en el menú IMG, ejecuta la transacción directa para 'Mantener Almacenes' (Maintain Storage Location).",
                expectedCmd: "OX09",
                hint: "Empieza por O y termina con X09",
                successMessage: "> Abriendo tabla T001L...\n> Bloqueando tabla para edición exclusiva...\n> Ingrese datos del nuevo almacén."
            },
            {
                instruction: "<strong>FASE 3:</strong> El sistema pide el código de la nueva locación. Escribe 'SAVE' para guardar el Storage Location 0001 en el Plant 1000.",
                expectedCmd: "SAVE",
                hint: "Escribe SAVE",
                successMessage: "> Generando orden de transporte (Transport Request)...\n> Guardando en base de datos de producción...\n> SUCCESS: Storage Location 0001 activado."
            }
        ]
    },
    {
        id: "s1_m2",
        semester: 1,
        type: "theory",
        title: "1.3 Material Master (El ADN del Inventario)",
        duration: "4 Horas • Especialización",
        req: "s1_l1",
        description: "Anatomía de los datos maestros. Cómo las 'Vistas' definen el comportamiento algorítmico del WMS.",
        review: "Vistas Básicas (UOM) -> Vista Compras (PO) -> Vista Plant/Storage (Hazmat/SLED) -> Vista WM (Estrategia Putaway). Un error en las conversiones destruye los cálculos volumétricos del WMS.",
        pages: [
            `<h3>La Anatomía del Producto</h3>
            <p>El Maestro de Materiales no es solo un nombre y un código de barras. Es una base de datos gigantesca, dividida en <strong>Vistas (Views)</strong>. Cuando creas un material en SAP, debes seleccionar qué departamentos interactuarán con él. Las vistas más críticas para un arquitecto logístico son cuatro.</p>`,
            
            `<h3>1. Vistas Básicas (Basic Data)</h3>
            <p>Es información global (Mandante). Aquí configuras el Número de Material, la Descripción y lo más importante: <strong>La Unidad de Medida Base (Base UOM)</strong>.</p>
            <p>Regla de oro de SAP: La Base UOM debe ser la unidad más pequeña en la que se pueda gestionar el material (Ej. "Pieza" o "EA"). A partir de ahí, creas <strong>Unidades de Medida Alternativas</strong>. Debes decirle al sistema matemáticamente: <em>1 Palet (PAL) = 50 Cajas (CAR) = 500 Piezas (EA)</em>. Sin esta matemática, el WMS no puede calcular cuántos palets vienen en un camión de 10,000 piezas.</p>`,
            
            `<h3>2. Vistas de Ejecución y EWM</h3>
            <p><strong>Vista Plant Data / Storage:</strong> Aquí defines las variables ambientales. ¿El producto tiene Fecha de Caducidad (SLED - Shelf Life Expiration Date)? ¿Requiere control de temperatura? ¿Es inflamable?</p>
            <p><strong>Vista Warehouse Management:</strong> El núcleo físico. Aquí configuras el <em>Control de Entrada de Almacén (Putaway Control Indicator)</em>. Este campo es el que le dice al algoritmo de EWM: "Este producto es pesado, busca ubicaciones vacías únicamente en los niveles a ras de piso del Bulk Storage".</p>`
        ],
        exam: [
            {
                question: "¿Cuál es la regla de oro para definir la Unidad de Medida Base (Base UOM) en el Material Master?",
                options: [
                    { text: "Debe ser siempre el Palet, porque es más fácil de contar.", correct: false },
                    { text: "Debe ser la unidad física más pequeña en la que se pueda mover o gestionar el producto (Ej. Pieza).", correct: true },
                    { text: "Debe ser la unidad de medida que usa el proveedor en China.", correct: false }
                ]
            },
            {
                question: "¿Qué ocurre en SAP EWM si olvidas configurar las conversiones de unidades de medida alternativas (Ej. 1 Palet = 50 Cajas)?",
                options: [
                    { text: "El sistema WMS no podrá calcular correctamente el peso y el volumen para asignar las ubicaciones tridimensionales.", correct: true },
                    { text: "El sistema no permite emitir facturas al cliente.", correct: false },
                    { text: "Nada, EWM asume por defecto que todo viene en Palets.", correct: false }
                ]
            },
            {
                question: "El 'Putaway Control Indicator', que le dicta al algoritmo a qué tipo de estantería debe ir un producto, se configura en:",
                options: [
                    { text: "La Vista de Contabilidad", correct: false },
                    { text: "La Vista de Compras", correct: false },
                    { text: "La Vista de Warehouse Management", correct: true }
                ]
            }
        ]
    },
    {
        id: "s1_l2",
        semester: 1,
        type: "lab",
        title: "1.4 Lab Multi-Paso: Alta de Materiales",
        duration: "30 Min • Simulador SAP",
        req: "s1_m2",
        description: "Crea el Maestro de Materiales para el producto 'Motor V8' configurando sus vistas logísticas.",
        simTask: { hint: "Utiliza el comando estándar para Crear Materiales." },
        simSteps: [
            {
                instruction: "<strong>PASO 1:</strong> Inicia la transacción estándar de MM para Crear un Maestro de Materiales.",
                expectedCmd: "MM01",
                hint: "MM01",
                successMessage: "> Accediendo a Creación de Material...\n> Seleccione el Ramo (Industry Sector) y Tipo de Material."
            },
            {
                instruction: "<strong>PASO 2:</strong> Hemos seleccionado Ramo: Ingeniería Mecánica y Tipo: Producto Terminado (FERT). El sistema te pide las Vistas. Escribe 'WM' para seleccionar las Vistas de Warehouse Management.",
                expectedCmd: "WM",
                hint: "Escribe WM",
                successMessage: "> Vistas WM seleccionadas.\n> Cargando Dynpro de datos logísticos...\n> Ingresa Putaway Control Indicator."
            },
            {
                instruction: "<strong>PASO 3:</strong> Para un 'Motor V8', la estantería convencional colapsaría. Escribe 'BULK' para asignarlo algorítmicamente a almacenamiento en piso, y guardar.",
                expectedCmd: "BULK",
                hint: "Escribe BULK",
                successMessage: "> Asignando Estrategia: BULK STORAGE.\n> Evaluando pesos y dimensiones...\n> Guardando Material PRD-V800.\n> SUCCESS: Material listo para ser importado."
            }
        ]
    }
];
