/**
 * Logística Pro - Base de Datos Masiva
 * Nivel: Maestría y Consultoría Corporativa
 */
const syllabusData = [
    {
        id: "s1_m1",
        semester: 1,
        type: "theory",
        title: "1.1 La Arquitectura Empresarial (Enterprise Structure)",
        duration: "1 Hora 30 Min • Teoría Core",
        description: "Cómo mapear legal y logísticamente una corporación multinacional en SAP.",
        content: `
            <span class="tag-subtitle">Módulo 1.1 • Consultoría Nivel 1</span>
            <h2>El Lienzo en Blanco de SAP</h2>
            <p>Imagina que eres contratado por Tesla para implementar su logística en Alemania. No puedes simplemente abrir SAP y crear un "Almacén". El software exige que construyas una jerarquía legal, financiera y física exacta.</p>
            
            <h2>1. La Sociedad (Company Code - FI)</h2>
            <p>Es el nivel más alto. Representa una entidad legal independiente (Ej. Tesla GMBH). Todo el dinero, los balances financieros y los impuestos se calculan aquí. A la logística no le importa la Sociedad, pero <strong>ningún material puede comprarse sin pertenecer a una.</strong></p>

            <h2>2. El Centro (Plant - Logística General)</h2>
            <p>El "Centro" (Plant) es el corazón de la manufactura y la distribución corporativa. Un Plant puede ser una mega-fábrica o un centro de distribución regional. El ERP usa el Plant para calcular la planificación de la producción (MRP) y los costos de flete.</p>

            <h2>3. Almacén MM (Storage Location - IM)</h2>
            <p>Dentro de un Centro, puedes tener múltiples "Storage Locations" (Ej. SL01 para Producto Terminado, SL02 para Cuarentena, SL03 para Chatarra). Hasta aquí, SAP solo sabe <strong>cuántas</strong> cajas tienes y su valor contable, pero no tiene ni idea de en qué estante exacto están.</p>

            <h2>4. Número de Almacén (Warehouse Number - EWM)</h2>
            <p>Aquí entra la magia física. El "Storage Location" del ERP se enlaza umbilicalmente a un "Warehouse Number" en el sistema WMS. A partir de este nivel, dejamos de hablar de dinero y empezamos a hablar de <strong>Coordenadas X, Y, Z, volumen y peso</strong>.</p>
        `,
        review: "La jerarquía estricta es: Sociedad (Legal/Finanzas) ➔ Centro (Operaciones Macro) ➔ Storage Location (Inventario MM) ➔ Warehouse Number (Control Físico Tridimensional EWM).",
        quiz: {
            question: "En la jerarquía corporativa de SAP, ¿qué nivel organizativo es el responsable estricto de emitir los balances financieros y pagar impuestos, al cual se debe anclar cualquier operación logística?",
            options: [
                { text: "El Centro (Plant)", correct: false },
                { text: "La Sociedad (Company Code)", correct: true },
                { text: "El Número de Almacén (Warehouse Number)", correct: false }
            ],
            explanation: "El Company Code es la entidad legal suprema en SAP FI. Todo centro logístico debe pertenecer obligatoriamente a un Company Code para que los movimientos de inventario generen asientos contables reales.",
            hint: "Piensa en el departamento de contabilidad. Ellos no gestionan fábricas, gestionan Entidades Legales."
        }
    },
    {
        id: "s1_l1",
        semester: 1,
        type: "lab",
        title: "1.2 Lab: Vinculación de Centro y Almacén (OX09)",
        duration: "25 Min • Simulador SAP",
        req: "s1_m1",
        description: "Ejecuta la transacción de parametrización (SPRO) para crear un Storage Location dentro de tu Plant.",
        simTask: {
            instruction: "Eres el consultor líder. Tu cliente ha construido una nueva nave logística anexa a la fábrica principal (Plant 1000). Para que el ERP pueda empezar a registrar mercancía ahí, debes ejecutar el T-Code estándar de Customizing para 'Mantener Almacenes' (Maintain Storage Location).",
            expectedCmd: "OX09",
            successMessage: "SUCCESS [SAP_RC: 00]:\n> Entrando a SPRO Customizing...\n> Entidad Creada: Storage Location '0001'\n> Vinculada exitosamente al Plant 1000.\n> La estructura IM está lista.",
            hint: "El comando empieza con la letra 'O' y termina con 'X09'. En el mundo real, los consultores se aprenden estos códigos de memoria para evitar navegar por el inmenso árbol de SPRO."
        }
    },
    {
        id: "s1_m2",
        semester: 1,
        type: "theory",
        title: "1.3 El Maestro de Materiales (Material Master)",
        duration: "1 Hora 45 Min • Teoría Core",
        req: "s1_l1",
        description: "El ADN de la logística. Cómo definir los atributos físicos, de compra y de almacenamiento de un producto.",
        content: `
            <span class="tag-subtitle">Módulo 1.2 • Gestión de Datos Maestros</span>
            <h2>El ADN del Inventario: Material Master</h2>
            <p>En SAP, no puedes simplemente escribir "Laptop Dell" en una orden de compra. Tienes que crear un registro maestro que contiene más de 300 campos de información divididos en "Vistas" (Views). Diferentes departamentos mantienen diferentes vistas del mismo código de material.</p>

            <h2>Las Vistas Críticas:</h2>
            <ul>
                <li><strong>Vistas Básicas (Basic Data 1 & 2):</strong> Información universal. Aquí se define el Número de Material, la Descripción global, la Unidad de Medida Base (ej. Unidad, Litro, Kg) y el peso bruto/neto. Esto lo ve toda la empresa.</li>
                <li><strong>Vista de Compras (Purchasing):</strong> Mantenida por los compradores. Define si el producto requiere inspección de calidad obligatoria al llegar o quién es el grupo de compras responsable.</li>
                <li><strong>Vistas Plant/Storage (Datos de Centro/Almacén):</strong> Define condiciones ambientales. ¿Este producto requiere refrigeración? ¿Es material peligroso (HazMat)? ¿Tiene fecha de caducidad (SLED)?</li>
                <li><strong>Vista Warehouse Management (WM Execution):</strong> Aquí EWM toma el control. Define el <em>Putaway Control Indicator</em> (Estrategia de almacenamiento: ¿Va a estantería pesada o a zona de picking ligero?) y los perfiles de paletización (¿Cuántas cajas caben en un palet estándar de madera?).</li>
            </ul>

            <h2>Unidades de Medida Alternativas (UOM)</h2>
            <p>Un error clásico es no definir las conversiones. En la <em>Basic Data</em> debes decirle a SAP: 1 Palet (PAL) = 50 Cajas (CAR) = 500 Unidades Base (EA). Si omites esto, el WMS no sabrá calcular el espacio necesario cuando llegue un camión.</p>
        `,
        review: "El Maestro de Materiales es transversal. Ventas, Finanzas, Compras y Logística comparten el mismo código, pero cada departamento llena su propia 'Vista' de información. EWM requiere la vista de Warehouse Management para saber cómo mover físicamente el objeto.",
        quiz: {
            question: "Si necesitas configurar el sistema para que sepa que 1 Palet contiene 120 cajas, y que esas cajas deben almacenarse en la zona de 'Alta Rotación', ¿qué vistas del Maestro de Materiales debes configurar?",
            options: [
                { text: "La vista de Ventas y la vista de Finanzas.", correct: false },
                { text: "Vistas Básicas (para la conversión de UOM) y la vista de Warehouse Management (para la zona de almacenamiento).", correct: true },
                { text: "Exclusivamente la vista de Compras.", correct: false }
            ],
            explanation: "Perfecto. Las Vistas Básicas manejan las matemáticas de conversión (UOM), y la vista WM (Warehouse Management) dicta el comportamiento físico dentro del almacén.",
            hint: "Piensa: ¿Quién hace la matemática de conversión? (Básico). ¿Quién decide en qué estante va? (WMS)."
        }
    },
    {
        id: "s1_l2",
        semester: 1,
        type: "lab",
        title: "1.4 Lab: Creación de Maestro de Materiales (MM01)",
        duration: "20 Min • Simulador SAP",
        req: "s1_m2",
        description: "Accede al módulo MM y genera el registro maestro para un nuevo smartphone.",
        simTask: {
            instruction: "El equipo de I+D ha lanzado un nuevo producto. Debes crear su registro en el sistema antes de que compras pueda ordenar el primer lote a China. Inicia la transacción estándar global de creación de materiales.",
            expectedCmd: "MM01",
            successMessage: "SUCCESS [SAP_RC: 00]:\n> Cargando dynpro de Material Master...\n> Vistas seleccionadas: Basic, Purchasing, WM.\n> Guardando en BD...\n> Material 'PRD-9945' creado exitosamente.",
            hint: "Es la transacción número uno de SAP Materials Management. Las letras son 'MM' y los números son '01' (01 siempre es crear en SAP)."
        }
    },
    {
        id: "s1_m3",
        semester: 1,
        type: "theory",
        title: "1.5 La Geometría Interna: Storage Types y Bins",
        duration: "2 Horas • Teoría Core",
        req: "s1_l2",
        description: "Dejamos el ERP. Bienvenidos a EWM. Así se mapea el espacio físico en tres dimensiones.",
        content: `
            <span class="tag-subtitle">Módulo 1.3 • Topografía EWM</span>
            <h2>Mapeando la Realidad en Coordenadas</h2>
            <p>En el momento en que cruzamos la frontera hacia el Warehouse Management System (WMS), la unidad más importante ya no es el dinero, es el <strong>Espacio</strong>.</p>
            
            <h2>1. Tipo de Almacén (Storage Type)</h2>
            <p>Es la división física o lógica más grande de tu nave industrial. Un EWM debe tener separados los tipos de tecnología. Ejemplos de Storage Types:</p>
            <ul>
                <li><strong>High Rack Storage:</strong> Racks convencionales a gran altura operados por montacargas retráctiles (Reach Trucks).</li>
                <li><strong>Bulk Storage (Bloque):</strong> Zonas en el piso sin estanterías, donde se apilan pallets pesados (ej. bebidas, cemento) uno sobre otro.</li>
                <li><strong>Open Storage:</strong> Patios exteriores (ej. para almacenar tuberías de acero o vehículos).</li>
                <li><strong>Picking Zone:</strong> Estanterías dinámicas bajas (Carton Flow) diseñadas exclusivamente para que los humanos recojan unidades sueltas a mano.</li>
            </ul>

            <h2>2. Secciones (Storage Sections)</h2>
            <p>Subdivide el Storage Type. Por ejemplo, dentro del "High Rack", puedes crear una sección "Fast-Moving" (Alta Rotación) cerca del pasillo principal, y otra "Slow-Moving" al fondo.</p>

            <h2>3. Las Ubicaciones (Storage Bins)</h2>
            <p>Es la coordenada exacta final (X, Y, Z). Su nomenclatura es estrictamente lógica para que el operario no se pierda. Un estándar industrial es: <strong>[Pasillo]-[Columna]-[Nivel]</strong>.<br>Ejemplo de Bin: <code>A12-05-03</code> (Pasillo 12, Columna 5, Nivel 3). A nivel de sistema de datos, a este Bin se le asigna una capacidad máxima de peso (ej. 1000 Kg) para evitar que un palet pesado rompa la estantería.</p>
        `,
        review: "De Macro a Micro en EWM: El Warehouse Number se divide en Storage Types (Tipo de tecnología de rack). Estos en Storage Sections (Zonas de rotación). Y estos finalmente en Storage Bins (Coordenada exacta X,Y,Z).",
        quiz: {
            question: "Un cliente te pide configurar una zona en el piso, sin estanterías de acero, para apilar de a 3 niveles pallets completos de agua embotellada. ¿Qué Storage Type es el adecuado?",
            options: [
                { text: "High Rack Storage (Estantería en Altura)", correct: false },
                { text: "Picking Zone (Zona de recolección manual)", correct: false },
                { text: "Bulk Storage (Almacenamiento en Bloque/Piso)", correct: true }
            ],
            explanation: "Correcto. El Bulk Storage está diseñado algorítmicamente para zonas sin estantería, permitiendo apilar unidades (Stacking) y gestionando carriles en el piso en lugar de Bins individuales en altura.",
            hint: "Piensa en el volumen masivo y en cosas que se apilan en el piso unas sobre otras."
        }
    }
];
