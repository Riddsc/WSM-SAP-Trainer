/**
 * Logística Pro - Base de Datos Masiva (Masterclass WMS / SAP)
 * Nivel: Arquitectura Corporativa - EXPANSIÓN 1000 HORAS
 */
const syllabusData = [
    {
        id: "s1_m1",
        semester: 1,
        type: "theory",
        title: "1.1 Arquitectura Empresarial Definitiva (Enterprise Structure)",
        duration: "15 Horas • Certificación Core",
        description: "Inmersión absoluta en el mapeo legal, financiero y operativo de SAP S/4HANA. 15 capítulos de teoría y 50 preguntas de certificación.",
        review: "Resumen de Tablas: T000 (Mandante), T001 (Sociedad), T001W (Centro), T001L (Almacén). La jerarquía nunca se rompe y toda operación física en el almacén desencadena un impacto financiero en el G/L de la Sociedad.",
        pages: [
            `<h3>Capítulo 1: El Paisaje de Sistemas (System Landscape)</h3>
            <p>Un consultor SAP nunca opera en un solo servidor. La arquitectura de hardware y software se divide en tres entornos estandarizados para proteger la integridad de los datos financieros de la corporación:</p>
            <ul>
                <li><strong>DEV (Desarrollo):</strong> El laboratorio. Aquí se crea la configuración en el SPRO y los programadores ABAP escriben código Z. Contiene el Mandante de Configuración (Ej. 100) y el de Pruebas Unitarias (Ej. 110).</li>
                <li><strong>QAS (Calidad):</strong> El entorno de pruebas integradas. Los Key Users (usuarios clave de la empresa) validan que el almacén funcione ejecutando el UAT (User Acceptance Testing).</li>
                <li><strong>PRD (Producción):</strong> El sistema vivo. Nadie configura aquí. Una mala parametrización en PRD puede detener la facturación de una multinacional en segundos.</li>
            </ul>`,
            
            `<h3>Capítulo 2: El Motor de Transportes (CTS)</h3>
            <p>¿Cómo viaja la configuración del almacén de DEV a PRD? A través del Change and Transport System (CTS).</p>
            <p>Cuando guardas un Storage Location en DEV, el sistema te exige una <strong>Orden de Transporte (TR)</strong>. Existen dos tipos críticos:</p>
            <ul>
                <li><strong>Customizing Request:</strong> Guarda parametrizaciones específicas del Mandante (Ej. Crear un Centro o un Almacén).</li>
                <li><strong>Workbench Request:</strong> Guarda desarrollos técnicos (código ABAP, diccionarios de datos) que afectan a TODOS los mandantes (Cross-Client).</li>
            </ul>`,
            
            `<h3>Capítulo 3: El Mandante (Client) - El Nivel Supremo</h3>
            <p>Técnicamente, el Mandante es el nivel jerárquico más alto en la base de datos de SAP (Tabla T000). Representa al holding corporativo completo.</p>
            <p><strong>Datos Cross-Client:</strong> Los registros maestros como el Maestro de Proveedores, Clientes y los Números de Material básicos se crean a este nivel. Esto garantiza que un 'Tornillo de Acero 5mm' tenga el código 900512 en las fábricas de Alemania, China y Brasil simultáneamente, estandarizando el inventario global.</p>`,
            
            `<h3>Capítulo 4: La Sociedad (Company Code - FI)</h3>
            <p>La Sociedad es la entidad jurídica independiente obligada por ley a presentar balances (Balance Sheet) y estados de pérdidas y ganancias (P&L). En la base de datos es la tabla T001.</p>
            <p><em>Impacto Logístico:</em> El WMS no opera en el vacío. Si un montacarguista en EWM da de baja un palet por daños (Scrap), el sistema calcula el costo de ese palet y genera automáticamente un asiento contable en la cuenta de mayor (G/L Account) asignada a la Sociedad. Sin Sociedad, no hay logística valorada.</p>`,
            
            `<h3>Capítulo 5: El Área de Control (Controlling Area - CO)</h3>
            <p>Mientras que la Sociedad (FI) es para reportes externos (gobierno, impuestos), el Controlling Area (CO) es para reportes internos (rentabilidad por departamento).</p>
            <p>Varias Sociedades (Ej. Coca-Cola Colombia y Coca-Cola Perú) pueden asignarse a una misma Controlling Area, siempre y cuando compartan el mismo Plan de Cuentas (Chart of Accounts) y la misma Variante de Ejercicio Fiscal (Fiscal Year Variant). Esto permite a la junta directiva ver los costos logísticos globales.</p>`,
            
            `<h3>Capítulo 6: El Centro (Plant) - El Corazón Logístico</h3>
            <p>El Plant (Tabla T001W) es la unidad organizativa fundamental de producción y logística. Es el ancla de los módulos MM, PP y SD.</p>
            <p><strong>Funciones exclusivas del Centro:</strong><br>
            1. Ejecución del MRP (Planificación de Requerimientos de Material).<br>
            2. Mantenimiento de Planta (PM).<br>
            3. Es el punto de origen o destino en una Orden de Transporte (Stock Transport Order - STO). Un Centro siempre debe estar asignado a una y solo una Sociedad.</p>`,
            
            `<h3>Capítulo 7: El Área de Valoración (Valuation Area)</h3>
            <p>En SAP, debes decidir a qué nivel se costea el inventario: a nivel de Sociedad o a nivel de Centro.</p>
            <p>La norma industrial y el estándar de SAP S/4HANA es definir el Área de Valoración a <strong>nivel de Centro (Plant)</strong>. Esto permite que un mismo teclado cueste $10 producirlo en la fábrica A, y $15 en la fábrica B (por costos de flete). Si se valuara a nivel de Sociedad, el costo tendría que ser un promedio forzado para ambas fábricas.</p>`,
            
            `<h3>Capítulo 8: El Almacén (Storage Location - IM)</h3>
            <p>El Storage Location (Tabla T001L) subdivide un Centro. Es el nivel más bajo de gestión de inventario en el ERP tradicional (Inventory Management).</p>
            <p>Un Centro puede tener el SL01 (Disponible), SL02 (Calidad) y SL03 (Chatarra). En este nivel, SAP cuenta unidades y calcula valor, pero es espacialmente ciego. No calcula volumen, no sabe de estantes, ni optimiza rutas de picking. Solo sabe "qué" y "cuánto" hay.</p>`,
            
            `<h3>Capítulo 9: El Número de Almacén (Warehouse Number - EWM)</h3>
            <p>Para activar la gestión tridimensional y operativa, un Storage Location (o varios) se vinculan a un Warehouse Number de EWM.</p>
            <p>Al cruzar esta frontera, el objeto de control deja de ser el valor monetario y pasa a ser la <strong>Unidad de Manipulación (Handling Unit - HU)</strong>. EWM gestiona Tipos de Almacén (Estantería alta, Bloque en piso), pasillos, bines, pesos máximos permitidos y asigna tareas (Warehouse Tasks) a los recursos móviles (RF Scanners).</p>`,
            
            `<h3>Capítulo 10: La Unidad de Cadena de Suministro (SCU)</h3>
            <p>En SAP EWM descentralizado o embebido en S/4HANA, el Warehouse Number se apoya en una Supply Chain Unit (SCU). Esta unidad proporciona atributos geográficos vitales como la zona horaria del almacén (crítico para planificar olas de picking) y las coordenadas de latitud/longitud para el ruteo de camiones.</p>`,
            
            `<h3>Capítulo 11: La Organización de Compras (Purchasing Org)</h3>
            <p>Entidad responsable de negociar condiciones de precios con los proveedores (Módulo MM-PUR). Puede ser Centralizada (una para toda la corporación) o Descentralizada (una por cada Plant).</p>
            <p>Si está descentralizada, se asigna directamente a un Plant específico. Si es centralizada, se asigna al Company Code y sirve a todos los Plants debajo de él.</p>`,
            
            `<h3>Capítulo 12: Organización de Ventas (Sales Org)</h3>
            <p>Ancla del módulo SD (Sales and Distribution). Responsable legal de los productos vendidos y de la responsabilidad ante el cliente. Se estructura junto con el Canal de Distribución (Mayorista, Retail) y el Sector (Division) para formar el Área de Ventas (Sales Area).</p>`,
            
            `<h3>Capítulo 13: El Puesto de Expedición (Shipping Point)</h3>
            <p>Fundamental para la logística de salida (Outbound). El Shipping Point es el lugar físico (muelles de carga, andén de trenes) donde se procesa la entrega.</p>
            <p>El sistema asigna automáticamente un Shipping Point a un pedido de ventas basándose en tres variables: 1. Condición de Expedición del Cliente, 2. Grupo de Carga del Material, y 3. El Centro (Plant) suministrador.</p>`,
            
            `<h3>Capítulo 14: Tablas Core de la Arquitectura SQL</h3>
            <p>Un consultor experto no siempre usa las transacciones visuales; consulta directamente las tablas en SE16N o SE11.</p>
            <ul>
                <li><strong>T000:</strong> Lista de Mandantes.</li>
                <li><strong>T001:</strong> Sociedades (Company Codes).</li>
                <li><strong>T001W:</strong> Centros (Plants).</li>
                <li><strong>T001L:</strong> Almacenes (Storage Locations).</li>
                <li><strong>TVST:</strong> Puestos de Expedición.</li>
            </ul>`,
            
            `<h3>Capítulo 15: La Matriz de Asignaciones (Customizing SPRO)</h3>
            <p>Crear los elementos no sirve de nada sin vincularlos. La ruta en SPRO es: <em>Enterprise Structure -> Assignment</em>.</p>
            <p>Reglas inflexibles: Un Plant solo puede pertenecer a UN Company Code. Un Storage Location solo puede pertenecer a UN Plant. Varios Storage Locations pueden vincularse a un solo Warehouse Number en EWM, pero un Storage Location no puede dividirse en dos Warehouse Numbers.</p>`
        ],
        exam: [
            // Mandante y Paisaje de Sistemas (1-5)
            { question: "¿Cuál es el entorno de SAP donde los usuarios clave realizan el User Acceptance Testing (UAT)?", options: [ {text:"PRD", correct:false}, {text:"DEV", correct:false}, {text:"QAS", correct:true}, {text:"SANDBOX", correct:false} ]},
            { question: "¿Qué tipo de Orden de Transporte se genera al escribir código ABAP que afecta a todos los mandantes del servidor?", options: [ {text:"Customizing Request", correct:false}, {text:"Workbench Request", correct:true}, {text:"Release Request", correct:false}, {text:"Business Request", correct:false} ]},
            { question: "La tabla de base de datos que almacena la información de los Mandantes en SAP es:", options: [ {text:"T001", correct:false}, {text:"T001W", correct:false}, {text:"T000", correct:true}, {text:"MARA", correct:false} ]},
            { question: "¿Por qué el maestro de materiales tiene datos a nivel de Mandante (Cross-Client)?", options: [ {text:"Para estandarizar el código y descripción básica de un material a nivel mundial en toda la corporación.", correct:true}, {text:"Para que cada país pueda ponerle un código diferente.", correct:false}, {text:"Para calcular los impuestos locales.", correct:false}, {text:"Para restringir el acceso a los desarrolladores.", correct:false} ]},
            { question: "¿Qué entorno del System Landscape no debe recibir parametrizaciones directas para evitar corrupciones operativas?", options: [ {text:"DEV", correct:false}, {text:"QAS", correct:false}, {text:"PRD", correct:true}, {text:"Ninguno", correct:false} ]},
            
            // Sociedad y Controlling (6-12)
            { question: "¿Qué entidad organizativa es la responsable jurídica de presentar el Balance y P&L?", options: [ {text:"Controlling Area", correct:false}, {text:"Plant", correct:false}, {text:"Company Code", correct:true}, {text:"Purchasing Org", correct:false} ]},
            { question: "Si un montacargas daña un palet y EWM lo da de baja, el impacto financiero se registra automáticamente en los libros de mayor de:", options: [ {text:"El Warehouse Number", correct:false}, {text:"El Company Code", correct:true}, {text:"El Storage Location", correct:false}, {text:"El Shipping Point", correct:false} ]},
            { question: "¿Qué requisito estricto debe cumplirse para asignar dos Company Codes a una misma Controlling Area?", options: [ {text:"Deben estar en el mismo país.", correct:false}, {text:"Deben compartir el mismo Plan de Cuentas (Chart of Accounts) y Variante de Ejercicio Fiscal.", correct:true}, {text:"Deben tener el mismo número de empleados.", correct:false}, {text:"No es posible asignar dos Company Codes a una Controlling Area.", correct:false} ]},
            { question: "La tabla SQL que almacena las Sociedades (Company Codes) es:", options: [ {text:"T001W", correct:false}, {text:"T001", correct:true}, {text:"T001L", correct:false}, {text:"T000", correct:false} ]},
            { question: "¿Es posible que un Plant exista sin estar asignado a un Company Code?", options: [ {text:"Sí, si es solo un centro de distribución.", correct:false}, {text:"No. Un Plant debe estar anclado a un único Company Code para la valoración de inventarios.", correct:true}, {text:"Depende de la versión de SAP.", correct:false}, {text:"Sí, mediante una orden de workbench.", correct:false} ]},
            { question: "El Controlling Area (CO) se utiliza principalmente para:", options: [ {text:"Reportes externos e impuestos del gobierno.", correct:false}, {text:"Contabilidad interna, centros de costos y rentabilidad de gestión.", correct:true}, {text:"Calcular rutas de montacargas.", correct:false}, {text:"Gestión de calidad de proveedores.", correct:false} ]},
            { question: "Un Company Code puede estar asignado a múltiples Controlling Areas.", options: [ {text:"Verdadero", correct:false}, {text:"Falso", correct:true} ]},

            // Centro y Valoración (13-20)
            { question: "La Planificación de Requerimientos de Materiales (MRP) se ejecuta organizativamente a nivel de:", options: [ {text:"Storage Location", correct:false}, {text:"Company Code", correct:false}, {text:"Plant (Centro)", correct:true}, {text:"Warehouse Number", correct:false} ]},
            { question: "El estándar industrial en SAP S/4HANA dicta que el Área de Valoración (Valuation Area) debe definirse a nivel de:", options: [ {text:"Client", correct:false}, {text:"Company Code", correct:false}, {text:"Plant", correct:true}, {text:"Storage Location", correct:false} ]},
            { question: "¿Por qué se recomienda valorar el inventario a nivel de Plant?", options: [ {text:"Porque permite que un mismo material tenga un costo de producción o adquisición diferente en distintas ubicaciones geográficas.", correct:true}, {text:"Porque simplifica la contabilidad al promediar los costos globalmente.", correct:false}, {text:"Porque EWM lo requiere para calcular volumen.", correct:false}, {text:"No se recomienda, es una mala práctica.", correct:false} ]},
            { question: "La tabla SQL que almacena los Centros (Plants) es:", options: [ {text:"T001W", correct:true}, {text:"T001", correct:false}, {text:"T001L", correct:false}, {text:"MARA", correct:false} ]},
            { question: "¿Un Plant puede pertenecer simultáneamente a dos Company Codes diferentes?", options: [ {text:"Sí, para procesos de inter-compañía.", correct:false}, {text:"No. La asignación es 1 a 1 (un Plant a un solo Company Code).", correct:true}, {text:"Solo si están en el mismo país.", correct:false}, {text:"Sí, si usan la misma moneda.", correct:false} ]},
            { question: "En un proceso de traslado de stock (STO), el punto de origen y destino a nivel macro se define mediante:", options: [ {text:"Centros (Plants)", correct:true}, {text:"Mandantes (Clients)", correct:false}, {text:"Organizaciones de Ventas", correct:false}, {text:"Puestos de expedición exclusivamente", correct:false} ]},
            { question: "El módulo de Mantenimiento de Planta (PM) ancla sus equipos y ubicaciones técnicas al nivel organizativo de:", options: [ {text:"Storage Location", correct:false}, {text:"Warehouse Number", correct:false}, {text:"Plant (Centro)", correct:true}, {text:"Company Code", correct:false} ]},
            { question: "Si fabrico un producto, la estructura de la lista de materiales (BOM) y la hoja de ruta (Routing) se mantienen por:", options: [ {text:"Plant", correct:true}, {text:"Storage Location", correct:false}, {text:"Company Code", correct:false}, {text:"Mandante", correct:false} ]},

            // Storage Location (21-27)
            { question: "El Storage Location es el nivel más bajo de gestión de inventario en:", options: [ {text:"SAP EWM", correct:false}, {text:"SAP FI", correct:false}, {text:"SAP MM-IM (Inventory Management)", correct:true}, {text:"SAP SD", correct:false} ]},
            { question: "¿Cuál es la limitación física de un Storage Location sin EWM?", options: [ {text:"No puede almacenar materiales peligrosos.", correct:false}, {text:"Gestiona cantidades y valores, pero es ciego respecto a pasillos, estantes, dimensiones y ubicaciones exactas.", correct:true}, {text:"Solo permite almacenar productos terminados.", correct:false}, {text:"No soporta unidades de medida alternativas.", correct:false} ]},
            { question: "La tabla de la base de datos para Storage Locations es:", options: [ {text:"T001L", correct:true}, {text:"T001W", correct:false}, {text:"LQUA", correct:false}, {text:"MARC", correct:false} ]},
            { question: "Un Storage Location debe estar asignado obligatoriamente a:", options: [ {text:"Un Warehouse Number", correct:false}, {text:"Un Plant", correct:true}, {text:"Un Company Code directamente", correct:false}, {text:"Un Shipping Point", correct:false} ]},
            { question: "Para separar físicamente el stock bloqueado por calidad del stock de libre utilización, la mejor práctica en MM es usar:", options: [ {text:"Diferentes Plants", correct:false}, {text:"Diferentes Company Codes", correct:false}, {text:"Diferentes Storage Locations o Tipos de Stock", correct:true}, {text:"Diferentes Mandantes", correct:false} ]},
            { question: "¿Puede un Plant tener múltiples Storage Locations?", options: [ {text:"No, la relación es 1 a 1.", correct:false}, {text:"Sí, un Plant puede tener decenas de Storage Locations lógicos.", correct:true}, {text:"Solo si EWM está activo.", correct:false}, {text:"Solo 2 (bueno y malo).", correct:false} ]},
            { question: "Si eliminas un Storage Location que contiene stock, ¿qué hace SAP?", options: [ {text:"Lo borra y el stock desaparece.", correct:false}, {text:"Traslada el stock automáticamente al Plant.", correct:false}, {text:"El sistema emite un error y no permite borrar un SLoc con stock valorado existente.", correct:true}, {text:"Borra el SLoc y deja el stock flotando.", correct:false} ]},

            // Warehouse Number y EWM (28-35)
            { question: "El código de un Warehouse Number en EWM está compuesto típicamente por:", options: [ {text:"2 caracteres", correct:false}, {text:"3 caracteres alfanuméricos o 4 en EWM embebido", correct:true}, {text:"10 números", correct:false}, {text:"1 letra", correct:false} ]},
            { question: "Al conectar un Storage Location a un Warehouse Number, la unidad operativa de control pasa a ser:", options: [ {text:"El Lote", correct:false}, {text:"El Código de Barras", correct:false}, {text:"La Unidad de Manipulación (Handling Unit - HU) y el Bin de Almacenamiento.", correct:true}, {text:"El Número de Material", correct:false} ]},
            { question: "¿Varios Storage Locations pueden estar vinculados a un solo Warehouse Number?", options: [ {text:"Sí, es común mapear varios SLocs lógicos al mismo almacén físico.", correct:true}, {text:"No, la relación debe ser 1 a 1.", correct:false}, {text:"Solo si están en diferentes Plants.", correct:false}, {text:"No, generaría un error de redundancia.", correct:false} ]},
            { question: "¿Un solo Storage Location puede dividirse y mapearse a dos Warehouse Numbers distintos simultáneamente?", options: [ {text:"Sí, si el almacén es muy grande.", correct:false}, {text:"No. Un Storage Location pertenece íntegramente a un solo Warehouse Number.", correct:true}, {text:"Sí, mediante una orden de mejora.", correct:false}, {text:"Depende del país.", correct:false} ]},
            { question: "La Unidad de Cadena de Suministro (SCU) en EWM proporciona atributos críticos como:", options: [ {text:"El valor financiero del stock.", correct:false}, {text:"La zona horaria y las coordenadas geográficas del almacén.", correct:true}, {text:"El límite de crédito del cliente.", correct:false}, {text:"El cálculo de impuestos.", correct:false} ]},
            { question: "En EWM, la estructura que subdivide al Warehouse Number basada en el tipo de tecnología (Ej. Rack alto, Bloque, Flujo) se llama:", options: [ {text:"Storage Bin", correct:false}, {text:"Storage Type (Tipo de Almacén)", correct:true}, {text:"Storage Section", correct:false}, {text:"Activity Area", correct:false} ]},
            { question: "El nivel más detallado de coordenadas espaciales en EWM es:", options: [ {text:"El Storage Bin (Ubicación)", correct:true}, {text:"El Storage Type", correct:false}, {text:"El Storage Section", correct:false}, {text:"El Storage Location", correct:false} ]},
            { question: "¿El Warehouse Number gestiona el valor financiero en dólares de la mercancía?", options: [ {text:"Sí, reemplaza al módulo FI.", correct:false}, {text:"No. El WMS es estricto sobre cantidades, volumen, peso y ubicación. El valor monetario se maneja en MM/FI.", correct:true}, {text:"Sí, para calcular los seguros de la nave.", correct:false}, {text:"Solo si se integra con SD.", correct:false} ]},

            // Compras, Ventas y Expedición (36-42)
            { question: "Una Organización de Compras (Purchasing Org) centralizada a nivel de corporación se asigna a:", options: [ {text:"El Company Code", correct:true}, {text:"El Storage Location", correct:false}, {text:"El Warehouse Number", correct:false}, {text:"Un solo Plant", correct:false} ]},
            { question: "El Área de Ventas (Sales Area) es una combinación estricta de:", options: [ {text:"Sales Org + Plant + Storage Location", correct:false}, {text:"Sales Org + Distribution Channel + Division", correct:true}, {text:"Company Code + Sales Org + Plant", correct:false}, {text:"Sales Org + Shipping Point + Plant", correct:false} ]},
            { question: "El lugar físico donde se procesa la entrega de mercancía (Outbound) y se planifica la carga de camiones es el:", options: [ {text:"Storage Type", correct:false}, {text:"Shipping Point (Puesto de Expedición)", correct:true}, {text:"Purchasing Group", correct:false}, {text:"Sales Office", correct:false} ]},
            { question: "El sistema SAP determina automáticamente el Shipping Point de un pedido cruzando tres variables:", options: [ {text:"Condición de Expedición, Grupo de Carga y Centro (Plant).", correct:true}, {text:"Cliente, Material y Precio.", correct:false}, {text:"Warehouse Number, Storage Location y Plant.", correct:false}, {text:"Peso, Volumen y Altura.", correct:false} ]},
            { question: "¿Puede un Plant tener asignado más de un Shipping Point?", options: [ {text:"No, genera colisiones de salida.", correct:false}, {text:"Sí, por ejemplo, uno para carga por ferrocarril y otro para carga de camiones.", correct:true}, {text:"Solo si se asigna a múltiples Company Codes.", correct:false}, {text:"Solo en entornos descentralizados.", correct:false} ]},
            { question: "La Organización de Ventas asume la responsabilidad jurídica y los reclamos de los clientes.", options: [ {text:"Verdadero", correct:true}, {text:"Falso", correct:false} ]},
            { question: "Un Shipping Point está asignado jerárquicamente de manera directa a:", options: [ {text:"El Company Code", correct:false}, {text:"El Warehouse Number", correct:false}, {text:"El Plant", correct:true}, {text:"El Storage Location", correct:false} ]},

            // Tablas, Transacciones y Matriz (43-50)
            { question: "La transacción principal para acceder a la parametrización de la Arquitectura Empresarial es:", options: [ {text:"SE16N", correct:false}, {text:"MIGO", correct:false}, {text:"SPRO", correct:true}, {text:"MM01", correct:false} ]},
            { question: "En SPRO, después de 'Definir' las entidades organizativas, el siguiente paso obligatorio para que funcionen es:", options: [ {text:"Borrarlas y recrearlas.", correct:false}, {text:"Asignarlas (Assignment) entre sí para crear la jerarquía.", correct:true}, {text:"Liberar el transporte a PRD de inmediato.", correct:false}, {text:"Crear los materiales.", correct:false} ]},
            { question: "La tabla TVST almacena información de:", options: [ {text:"Centros", correct:false}, {text:"Sociedades", correct:false}, {text:"Puestos de Expedición (Shipping Points)", correct:true}, {text:"Almacenes", correct:false} ]},
            { question: "Si un consultor quiere ver de forma masiva en Excel la lista de todos los Storage Locations creados, usará la transacción SE16N y consultará la tabla:", options: [ {text:"T001L", correct:true}, {text:"T001W", correct:false}, {text:"MARA", correct:false}, {text:"LQUA", correct:false} ]},
            { question: "¿Qué sucede si olvidas asignar la Organización de Compras al Centro en el SPRO?", options: [text:"No podrás crear un Storage Location.", correct:false}, {text:"No podrás generar Órdenes de Compra (PO) para ese Centro.", correct:true}, {text:"El WMS colapsará.", correct:false}, {text:"No podrás crear el mandante.", correct:false} ]},
            { question: "La transacción estándar para asignar un Storage Location a un Plant en Customizing es:", options: [ {text:"MM01", correct:false}, {text:"SPRO / OX09", correct:true}, {text:"MIGO", correct:false}, {text:"LT01", correct:false} ]},
            { question: "Un proyecto SAP fallido a menudo se debe a una mala definición de la Enterprise Structure porque:", options: [ {text:"Es aburrido configurarla.", correct:false}, {text:"Una vez que se generan documentos transaccionales (órdenes, facturas, movimientos), es casi imposible cambiar o borrar la estructura organizativa sin corromper la base de datos.", correct:true}, {text:"Los programadores ABAP no saben usarla.", correct:false}, {text:"El sistema no permite crear más de 5 Plants.", correct:false} ]},
            { question: "¿Estás listo para asumir la responsabilidad de arquitecto SAP?", options: [ {text:"Aún necesito estudiar más.", correct:false}, {text:"Totalmente. Comprendo que la integridad de la base de datos logística y financiera de la corporación depende de una jerarquía impecable.", correct:true} ]}
        ]
    },
    {
        id: "s1_l1",
        semester: 1,
        type: "lab",
        title: "1.2 Lab Multi-Paso: Arquitectura (SPRO)",
        duration: "1 Hora • Simulación Consultoría",
        req: "s1_m1",
        description: "Asume el rol de arquitecto SAP. Entrarás al IMG de configuración para crear un Almacén Lógico y vincularlo al Centro.",
        simTask: { hint: "Este laboratorio tiene 7 fases. SPRO -> OX09 -> Plant 1000 -> SLoc 0001 -> RAW MATERIALS -> SAVE -> CONFIRM." },
        simSteps: [
            { instruction: "<strong>FASE 1/7: Acceso al Sistema</strong><br>Inicia la transacción universal de Customizing (SAP Project Reference Object).", expectedCmd: "SPRO", hint: "Escribe SPRO", successMessage: "> SAP Reference IMG cargado.\n> Árbol de configuración desplegado." },
            { instruction: "<strong>FASE 2/7: Navegación de Arquitectura</strong><br>Abre la carpeta 'Enterprise Structure'. Ingresa el T-Code directo para mantener el Storage Location.", expectedCmd: "OX09", hint: "OX09", successMessage: "> Tabla T001L abierta en modo edición." },
            { instruction: "<strong>FASE 3/7: Asignación al Centro</strong><br>Ingresa el código del Plant (Centro) al que asignaremos el almacén: '1000'.", expectedCmd: "1000", hint: "1000", successMessage: "> Plant 1000 (Planta Principal) validado." },
            { instruction: "<strong>FASE 4/7: Creación de Entidad</strong><br>Vamos a crear un almacén para Materia Prima. Ingresa el código '0001'.", expectedCmd: "0001", hint: "0001", successMessage: "> SLoc 0001 temporalmente en memoria." },
            { instruction: "<strong>FASE 5/7: Descripción Lógica</strong><br>Ingresa la descripción estandarizada: 'RAW MATERIALS'.", expectedCmd: "RAW MATERIALS", hint: "RAW MATERIALS", successMessage: "> Descripción aplicada a SLoc 0001." },
            { instruction: "<strong>FASE 6/7: Commit de Base de Datos</strong><br>Ejecuta el comando de guardado: 'SAVE'.", expectedCmd: "SAVE", hint: "SAVE", successMessage: "> Invocando proceso de actualización en batch..." },
            { instruction: "<strong>FASE 7/7: Orden de Transporte (TR)</strong><br>El sistema te sugiere la TR 'DEV90014'. Escribe 'CONFIRM' para anexar tus cambios.", expectedCmd: "CONFIRM", hint: "CONFIRM", successMessage: "> Guardando en TR DEV90014...\n> Base de datos actualizada. Operación Exitosa." }
        ]
    },
    {
        id: "s1_m2", semester: 1, type: "theory", title: "1.3 Material Master (El ADN del Inventario)", duration: "Próximo Bloque", req: "s1_l1", description: "En el próximo despliegue dividiremos el código para traerte las 50 preguntas exclusivas del Maestro de Materiales.",
        pages: ["<h3>Siguiente Fase Arquitectónica</h3><p>Una vez apruebes el monumental módulo 1.1 y su laboratorio, estaremos listos para inyectar el código del Maestro de Materiales con 50 preguntas más.</p>"],
        exam: [{ question: "¿Comprendiste el flujo de 50 preguntas del módulo 1.1?", options: [{ text: "Sí", correct: true }, { text: "No", correct: false }]}]
    }
];
