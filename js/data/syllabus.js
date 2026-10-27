/**
 * Logística Pro - Base de Datos del Pensum WMS & SAP
 * Nivel Maestría: Arquitectura, Procesos Inbound/Outbound y Automatización MFS.
 */

const syllabusData = [
    {
        id: "mod_1",
        semester: 1,
        type: "theory",
        title: "Arquitectura Enterprise: ERP vs WMS",
        duration: "45 min • Teoría Avanzada",
        description: "Comprende la separación crítica entre el flujo financiero y el control físico de la mercancía.",
        content: `
            <span class="tag-subtitle">Módulo 1.1 • Fundamentos Corporativos</span>
            <h2>El Ecosistema Tecnológico Logístico</h2>
            <p>En las operaciones de la cadena de suministro de clase mundial (como Amazon, DHL o centros de distribución automotrices), la gestión de inventario nunca recae en un solo software. Existe una división estricta de poderes entre el ERP corporativo y el WMS de piso.</p>
            
            <h2>1. El ERP: El Cerebro Financiero y Comercial</h2>
            <p>Sistemas como <strong>SAP S/4HANA (Módulos MM y SD)</strong> actúan como el sistema nervioso central de la corporación. El ERP <strong>no administra pasillos ni coordenadas físicas</strong>; su propósito es gestionar el valor monetario, la propiedad legal del stock y las relaciones con proveedores y clientes.</p>
            <ul>
                <li><strong>Módulo MM (Materials Management):</strong> Controla el Maestro de Materiales, la emisión de Órdenes de Compra (PO), la recepción contable y la valoración financiera del inventario.</li>
                <li><strong>Módulo SD (Sales & Distribution):</strong> Administra la demanda comercial, la disponibilidad de stock a nivel macro y la generación de la Entrega de Salida (Outbound Delivery).</li>
            </ul>

            <h2>2. El WMS: El Cerebro Físico y Operativo</h2>
            <p>Sistemas como <strong>SAP EWM (Extended Warehouse Management)</strong> son herramientas de ejecución en tiempo real. Mapean la geometría tridimensional del almacén (Pasillo, Rack, Columna, Nivel y Bin) y traducen las órdenes comerciales del ERP en tareas físicas ultra-optimizadas.</p>
            <p>Mientras que el ERP emite una orden de despacho, el WMS calcula la ruta más corta para el montacarguista, optimiza el empaque (Cartonization) y previene colapsos de tráfico en los pasillos estrechos (VNA).</p>
        `,
        quiz: {
            question: "¿Cuál de las siguientes afirmaciones describe correctamente la responsabilidad de SAP EWM (WMS) frente a SAP ERP?",
            options: [
                { text: "El WMS se encarga de emitir las facturas de venta y calcular los impuestos del cliente.", correct: false },
                { text: "El WMS administra la ubicación física exacta de los bultos, rutas de picking y la ejecución operativa.", correct: true },
                { text: "El WMS gestiona la contabilidad general y la nómina del personal del almacén.", correct: false }
            ],
            explanation: "¡Exacto! El ERP maneja la contabilidad y las transacciones comerciales, mientras que el WMS es estrictamente operativo y espacial."
        }
    },
    {
        id: "mod_2",
        semester: 1,
        type: "lab",
        title: "Lab: Recepción de Proveedores (MIGO)",
        duration: "20 min • Simulador SAP",
        req: "mod_1",
        description: "Ejecuta la transacción estándar de entrada de mercancía en el entorno simulado de S/4HANA.",
        simTask: {
            instruction: "Un camión con 500 unidades de materia prima ha llegado al muelle 03. Para registrar físicamente el ingreso y actualizar la contabilidad en SAP MM, debes ejecutar el T-Code universal de movimientos de mercancía.",
            expectedCmd: "MIGO",
            successMessage: "SUCCESS [SAP_RC: 00]: Documento de material generado. Stock actualizado en MM y enrutado al buffer de Putaway."
        }
    },
    {
        id: "mod_3",
        semester: 2,
        type: "theory",
        title: "Ingeniería Inbound: Slotting y Cross-Docking",
        duration: "60 min • Teoría Avanzada",
        req: "mod_2",
        description: "Optimización algorítmica del almacenamiento y eliminación de tiempos muertos.",
        content: `
            <span class="tag-subtitle">Módulo 2.1 • Procesos Inbound</span>
            <h2>Algoritmos de Asignación (Slotting)</h2>
            <p>Cuando la mercancía ingresa al centro de distribución, el peor error operativo es almacenar los productos en espacios aleatorios. El motor de <strong>Slotting</strong> del WMS calcula las ubicaciones óptimas basándose en:</p>
            <ul>
                <li><strong>Curva ABC (Rotación):</strong> Los artículos de alta rotación (Clase A) se posicionan en ubicaciones doradas (Golden Zone), a la altura de las manos y cerca de los muelles de salida.</li>
                <li><strong>Restricciones Volumétricas y de Peso:</strong> El sistema cruza los datos maestros del material para impedir que un palet de 1.5 toneladas sea asignado a niveles superiores de estantería convencional.</li>
            </ul>

            <h2>Cross-Docking: Logística Sin Almacenamiento</h2>
            <p>Es la cúspide de la eficiencia operativa. Consiste en recibir la mercancía en el muelle de entrada y transferirla directamente al muelle de salida (o zona de consolidación) <strong>sin pasar por los racks de almacenamiento</strong>, eliminando por completo los costos de Putaway y Picking.</p>
        `,
        quiz: {
            question: "¿Qué beneficio financiero y operativo principal aporta el Cross-Docking?",
            options: [
                { text: "Aumenta la capacidad de almacenamiento a largo plazo en los racks altos.", correct: false },
                { text: "Elimina los costos asociados al almacenamiento físico y reduce las horas-hombre de manipulación.", correct: true },
                { text: "Permite renegociar los precios de compra con los proveedores internacionales.", correct: false }
            ],
            explanation: "¡Correcto! Al saltarse el almacenamiento, se reducen drásticamente los costos operativos y de inventario retenido."
        }
    },
    {
        id: "mod_4",
        semester: 2,
        type: "lab",
        title: "Lab: Órdenes de Transporte (LT01)",
        duration: "25 min • Simulador SAP",
        req: "mod_3",
        description: "Crea órdenes de transferencia en el sistema para instruir a los operarios en los pasillos.",
        simTask: {
            instruction: "La mercancía de Cross-Docking requiere una orden formal de movimiento interno hacia el área de expedición. Ingresa el T-Code para crear una Orden de Transporte (Transfer Order) en WM.",
            expectedCmd: "LT01",
            successMessage: "SUCCESS [SAP_RC: 00]: Orden de Transporte creada. Instrucción enviada a la terminal RF del montacarguista."
        }
    }
];
