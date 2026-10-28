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
            `<h3>Capítulo 1: El Paisaje de Sistemas (System Landscape)</h3>
            <p>Entornos DEV (Desarrollo), QAS (Calidad/Pruebas UAT) y PRD (Producción).</p>
            <details>
                <summary>Ver explicación a fondo (Arquitectura Tiers)</summary>
                <div class="details-content">
                    <p>En implementaciones enterprise, nunca se toca Producción directamente. Todo diseño de almacén inicia en el mandante "Golden" de <strong>DEV</strong>. Una vez configurado, viaja a <strong>QAS</strong> donde los <em>Key Users</em> prueban con pistolas de radiofrecuencia reales. Solo si aprueban (UAT - User Acceptance Testing), el cambio pasa a <strong>PRD</strong>, evitando paralizar la operación por errores de sistema.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: El Motor de Transportes (CTS)</h3>
            <p>Customizing Requests (Configuración) vs Workbench Requests (Desarrollo ABAP).</p>
            <details>
                <summary>Ver explicación a fondo (Gestión de Cambios)</summary>
                <div class="details-content">
                    <p>SAP encapsula los cambios en "Órdenes de Transporte" (TRs). Las <strong>Customizing Requests</strong> guardan ajustes funcionales (ej. crear una nueva zona de almacén en SPRO). Las <strong>Workbench Requests</strong> son exclusivas de los programadores (ej. inyectar código ABAP en una BAdI o modificar una tabla del diccionario de datos SE11).</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: El Mandante (Client)</h3>
            <p>Nivel supremo. Datos Cross-Client como Maestro de Proveedores y Materiales Base.</p>
            <details>
                <summary>Ver explicación a fondo (Aislamiento de Datos)</summary>
                <div class="details-content">
                    <p>El Mandante (Tabla T000) es el nivel de base de datos más alto. Si creas un número de material (MARA) aquí, existirá para todas las filiales de la empresa a nivel mundial. Es vital para empresas multinacionales que desean estandarizar su catálogo (ej. Coca-Cola usando el mismo código de material para el envase en México y Colombia).</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: La Sociedad (Company Code - FI)</h3>
            <p>Entidad jurídica. Presenta Balance y P&L. Toda baja de stock impacta sus cuentas (G/L).</p>
            <details>
                <summary>Ver explicación a fondo (Integración Financiera)</summary>
                <div class="details-content">
                    <p>La Sociedad (T001) es la entidad que rinde cuentas al gobierno (paga impuestos). Todo movimiento logístico en EWM está auditado financieramente: si un operario de montacargas daña un palet y hace un ajuste de inventario, el sistema lee la Sociedad y dispara automáticamente un asiento contable de "Gasto por Pérdida" al libro mayor (General Ledger).</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: El Área de Control (Controlling - CO)</h3>
            <p>Reportes internos y centros de costos. Agrupa Sociedades con mismo plan de cuentas.</p>
            <details>
                <summary>Ver explicación a fondo (Contabilidad Administrativa)</summary>
                <div class="details-content">
                    <p>Mientras la Sociedad mira hacia afuera (impuestos/auditores), el Controlling mira hacia adentro (rentabilidad). Si la bodega gasta $10,000 en diésel para montacargas, ese gasto se asigna al <strong>Centro de Costo (Cost Center)</strong> del almacén bajo esta área, permitiendo calcular el verdadero costo logístico por palet movido.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: El Centro (Plant)</h3>
            <p>Corazón logístico. Ejecuta MRP. Asignado a una sola Sociedad.</p>
            <details>
                <summary>Ver explicación a fondo (Motor de Planeación)</summary>
                <div class="details-content">
                    <p>El Centro (T001W) es la fábrica o centro de distribución principal. Aquí corre el algoritmo de <strong>Material Requirements Planning (MRP)</strong>. El Plant evalúa si el stock es suficiente para cubrir los pedidos de ventas y, si falta, genera automáticamente las solicitudes de compra. Un Plant solo puede pertenecer a una Sociedad Financiera (OX18).</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: El Área de Valoración (Valuation Area)</h3>
            <p>Norma S/4HANA: Se valora el stock a nivel de Centro (Plant) para diferenciar costos de fletes.</p>
            <details>
                <summary>Ver explicación a fondo (Costeo Local)</summary>
                <div class="details-content">
                    <p>Aunque SAP permite valorar el inventario a nivel Sociedad, la best practice en S/4HANA es a nivel de Centro. ¿Por qué? Un televisor en el Centro de Bogotá (cerca de la aduana aérea) cuesta $500, pero el mismo televisor en el Centro de Leticia cuesta $530 debido al flete fluvial. Valorar por Centro permite a finanzas reflejar estos costos logísticos reales.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: El Almacén (Storage Location - IM)</h3>
            <p>Subdivide el Centro. Nivel IM. Cuenta unidades y valor, pero es espacialmente ciego (no ve estantes).</p>
            <details>
                <summary>Ver explicación a fondo (Inventory Management Clásico)</summary>
                <div class="details-content">
                    <p>El Storage Location (SLoc - T001L) agrupa físicamente el inventario (ej. SLoc 0001 Producto Terminado, SLoc 0002 Cuarentena). Sabe que hay 1,000 laptops y que valen $1M, pero es "ciego" en 3D: no sabe en qué pasillo, nivel o estante están. Para ganar visión espacial, este SLoc debe vincularse al módulo EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: El Número de Almacén (Warehouse Number - EWM)</h3>
            <p>Activa la gestión 3D. Trabaja con Handling Units (HU), pesos, volúmenes y coordina escáneres RF.</p>
            <details>
                <summary>Ver explicación a fondo (El Cerebro EWM)</summary>
                <div class="details-content">
                    <p>Aquí nace la magia. El Número de Almacén divide el SLoc en Storage Types (Zonas), Storage Sections (Pasillos) y Storage Bins (Huecos exactos con coordenadas X,Y,Z). Gobierna los algoritmos de Putaway, Picking y envía las tareas (Warehouse Orders) directo a las pistolas de radiofrecuencia (RFUI) de los montacarguistas.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Supply Chain Unit (SCU)</h3>
            <p>Da atributos geográficos (zona horaria, lat/long) al almacén EWM.</p>
            <details>
                <summary>Ver explicación a fondo (Husos Horarios en SAP)</summary>
                <div class="details-content">
                    <p>En un mandante global, tienes un almacén en Tokio y otro en Nueva York. Si usas la hora del servidor central en Alemania, los operarios registrarían horas incorrectas. La SCU le inyecta la zona horaria exacta y las coordenadas geográficas al Warehouse Number, vital para los cálculos de labor management y rutas de transporte.</p>
                </div>
            </details>`,

            `<h3>Capítulo 11: Organización de Compras (Purchasing Org)</h3>
            <p>Negocia con proveedores. Centralizada (Sociedad) o Descentralizada (Centro).</p>
            <details>
                <summary>Ver explicación a fondo (Estrategias de Negociación)</summary>
                <div class="details-content">
                    <p>Si es Centralizada, negocia precios masivos para todos los centros del país (economía de escala). Si es Descentralizada, cada Centro negocia localmente. Es responsable de emitir las <strong>Purchase Orders (POs)</strong> que luego EWM recibe físicamente en el muelle de descarga mediante los Inbound Deliveries.</p>
                </div>
            </details>`,

            `<h3>Capítulo 12: Organización de Ventas (Sales Org)</h3>
            <p>Responsable jurídica ante clientes. SD Module.</p>
            <details>
                <summary>Ver explicación a fondo (Gestión Comercial)</summary>
                <div class="details-content">
                    <p>Fija listas de precios, políticas de descuentos y recibe las devoluciones de clientes. En conjunto con el Canal de Distribución y el Sector (Division), conforma el <strong>Sales Area</strong>. Los pedidos de venta creados aquí viajan a EWM como <em>Outbound Delivery Orders</em> para ser recolectados.</p>
                </div>
            </details>`,

            `<h3>Capítulo 13: Puesto de Expedición (Shipping Point)</h3>
            <p>Coordina carga Outbound basándose en Condición de Expedición, Grupo de Carga y Centro.</p>
            <details>
                <summary>Ver explicación a fondo (Algoritmo de Despacho)</summary>
                <div class="details-content">
                    <p>Es la entidad lógica que realiza el despacho. El ERP usa 3 variables para determinarlo automáticamente: 1) Cómo se envía (Express, Marítimo), 2) Qué equipo necesita (Grúa para contenedores vs Montacargas ligero) y 3) De qué Centro sale. Sin Shipping Point, es imposible crear una entrega de salida hacia EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 14: Tablas Core SQL</h3>
            <p>T000 (Mandante), T001 (Sociedad), T001W (Plant), T001L (SLoc), TVST (Shipping Point).</p>
            <details>
                <summary>Ver explicación a fondo (Depuración y Queries)</summary>
                <div class="details-content">
                    <p>Como consultor, si un reporte estándar de SAP falla, debes ir a la transacción <strong>SE16N</strong> y cruzar estas tablas manualmente (Data Browser). Conocer de memoria la T001W (Plant) te salva la vida en auditorías logísticas cuando buscas fallos de configuración maestra.</p>
                </div>
            </details>`,

            `<h3>Capítulo 15: Matriz de Asignaciones</h3>
            <p>SPRO. Plant a Company Code (OX18). SLoc a Plant (OX09). Sin asignación, el sistema colapsa.</p>
            <details>
                <summary>Ver explicación a fondo (Enterprise Structure Linkage)</summary>
                <div class="details-content">
                    <p>Crear los elementos es solo el 50% del trabajo. La integración (Assignment) es la estructura vascular de SAP. Si olvidas enlazar el SLoc al Centro en la transacción <strong>OX09</strong>, el módulo EWM jamás recibirá mercancía porque SAP no sabrá a qué centro de costos asignarle el valor contable de los palets recibidos.</p>
                </div>
            </details>`
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
            `<h3>Capítulo 1: El Maestro Transversal (MARA)</h3>
            <p>La tabla central a nivel de Mandante se llama MARA (Datos Básicos).</p>
            <details>
                <summary>Ver explicación a fondo (Gobernanza de Datos)</summary>
                <div class="details-content">
                    <p>La tabla MARA almacena atributos que son idénticos en todo el planeta: el número del material, la descripción, el peso bruto y la unidad de medida base. Ningún Centro local puede modificar estos campos sin afectar a toda la corporación, lo que exige estricta Gobernanza de Datos (MDG).</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Tipos y Grupos de Material</h3>
            <p>Material Type controla el algoritmo. ROH (Materia Prima), FERT (Producto Terminado).</p>
            <details>
                <summary>Ver explicación a fondo (Control de Comportamiento)</summary>
                <div class="details-content">
                    <p>El Tipo de Material define qué pantallas (Vistas) te obliga a llenar SAP. Un <strong>ROH</strong> te exigirá la vista de Compras (porque se compra) pero ocultará la vista de Ventas. Un <strong>FERT</strong> te ocultará la de Compras (porque se fabrica internamente) pero te exigirá la vista Comercial. Determina también la cuenta contable (Valuation Class).</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Vistas Básicas 1 y 2</h3>
            <p>Aplica a nivel corporativo. Define el Número de Material y la Unidad de Medida Base (BUoM).</p>
            <details>
                <summary>Ver explicación a fondo (La Ley de la UoM)</summary>
                <div class="details-content">
                    <p><strong>Regla de oro:</strong> Una vez que registras stock de un material (aunque sea 1 unidad), el campo BUoM queda bloqueado para siempre en S/4HANA. Si te equivocaste y le pusiste Litros en vez de Kilogramos, la única solución es vaciar físicamente el stock a cero, archivar el material y crear uno nuevo. Por eso esta vista es crítica.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Matemática de Unidades (UoM)</h3>
            <p>La BUoM debe ser la unidad indivisible más pequeña (Ej. EA). Debes declarar alternativas: 1 Palet = 50 Cajas.</p>
            <details>
                <summary>Ver explicación a fondo (El Colapso de EWM)</summary>
                <div class="details-content">
                    <p>SAP EWM necesita modelar el espacio 3D. Si la BUoM es 'Unidad' (EA) pero el proveedor envía 'Palets' (PAL), EWM no sabrá qué tamaño tiene el palet. En la Vista Básica 1 DEBES insertar el factor de conversión exacto, además de los campos EAN/UPC (Código de barras GS1) para cada nivel de empaque.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Vista de Compras (MARC)</h3>
            <p>Mantenida a nivel Centro. GR Processing Time define días de descarga antes de que el MRP lo vea disponible.</p>
            <details>
                <summary>Ver explicación a fondo (Tiempos Logísticos)</summary>
                <div class="details-content">
                    <p>El 'Goods Receipt Processing Time' es vital. Si sabes que el control de calidad y Putaway demoran 2 días, debes configurarlo aquí. Si lo dejas en 0, el sistema ERP le prometerá al equipo de Ventas que el producto estará listo para vender el mismo día que llega el camión, generando falsas promesas al cliente final.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Vista Plant Data 1 (MARD)</h3>
            <p>Condiciones ambientales y Shelf Life Expiration Date (SLED - Vida útil restante mínima).</p>
            <details>
                <summary>Ver explicación a fondo (Control de Caducidad FEFO)</summary>
                <div class="details-content">
                    <p>Especial para alimentos y farmacéuticas. Aquí se define que un material requiere, por ejemplo, 90 días de vida útil restante en el momento de la entrega al almacén. Si el proveedor llega con un lote al que le quedan 80 días, EWM bloqueará el Post Goods Receipt con un Hard Error en el muelle de descarga.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Vista Plant Data 2</h3>
            <p>Ajustes locales de peso logístico.</p>
            <details>
                <summary>Ver explicación a fondo (Gestión de Mermas Locales)</summary>
                <div class="details-content">
                    <p>Permite sobreescribir el peso neto global para un Centro específico. Útil en materiales con variaciones higroscópicas: el algodón absorbe humedad y pesa más en un centro ubicado en la selva que en uno ubicado en un desierto. Esto impacta el Capacity Check de los racks en EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Vista WM 1 (Inteligencia de Putaway)</h3>
            <p>Putaway Control Indicator (Estrategia de rack) y Stock Removal Indicator (Estrategia FIFO/LIFO).</p>
            <details>
                <summary>Ver explicación a fondo (Ruteo Inteligente EWM)</summary>
                <div class="details-content">
                    <p>El <strong>Putaway Control Indicator (PACI)</strong> es la llave del algoritmo EWM. Si le asignas 'PESA' (Material Pesado), EWM lo enviará obligatoriamente a los racks de nivel de piso. El <strong>Stock Removal</strong> define si al hacer Picking el sistema extraerá primero el lote más antiguo (FIFO/FEFO) o el último que entró (LIFO, común en arenas o gravas).</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Vista WM 2 (Paletización)</h3>
            <p>LE Quantity: Cuántas cajas caben en un EuroPalet estándar.</p>
            <details>
                <summary>Ver explicación a fondo (Cartonization/Palletization)</summary>
                <div class="details-content">
                    <p>La <em>Loading Equipment Quantity (LE Qty)</em> es fundamental. Si pones que caben 50 cajas por Palet, y el camión llega con 120 cajas sueltas, SAP EWM generará automáticamente 3 Warehouse Tasks para el proceso de estiba y armado: dos palets enteros de 50 cajas, y un "Palet Parcial" con las 20 cajas restantes.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Vistas Contables (FI)</h3>
            <p>La Valuation Class es el puente entre logística y la cuenta de mayor. Precio S o V.</p>
            <details>
                <summary>Ver explicación a fondo (Control de Precios e Integración Automática OBYC)</summary>
                <div class="details-content">
                    <p>La <strong>Valuation Class</strong> mapea el material a la transacción OBYC. Cuando EWM mueve stock, SAP FI lee esta clase y sabe exactamente a qué cuenta de Mayor del Balance enviar el débito/crédito. <strong>Precio V (Promedio Móvil):</strong> Común en Materias Primas; fluctúa con cada compra. <strong>Precio S (Estándar):</strong> Común en Terminados; fijo por el área de Costos anualmente.</p>
                </div>
            </details>`
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
            `<h3>Capítulo 1: El Paradigma Inbound Moderno</h3>
            <p>En SAP EWM se requiere visibilidad anticipada. No se recibe contra una PO, se recibe contra un ASN.</p>
            <details>
                <summary>Ver explicación a fondo (El Cuello de Botella MIGO)</summary>
                <div class="details-content">
                    <p>En el SAP clásico (IM), un camión llega, el guardia pide la Orden de Compra (PO) y el almacén hace la MIGO 101. En volúmenes enterprise, esto es inviable: no sabes cuántos palets vienen ni qué tamaño tienen hasta que abren el camión. SAP EWM <strong>prohíbe</strong> la recepción directa por PO. Obliga a que el proveedor o el ERP envíe un aviso previo (Inbound Delivery) para pre-calcular el espacio en los racks antes de que el camión cruce la puerta.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: El Aviso de Expedición (ASN)</h3>
            <p>La Inbound Delivery (VL31N) le dice al almacén qué viene, a qué hora y en qué palets. Es un compromiso logístico.</p>
            <details>
                <summary>Ver explicación a fondo (Advanced Shipping Notice)</summary>
                <div class="details-content">
                    <p>El proveedor transmite el ASN vía EDI (IDoc DELVRY03). Esta Inbound Delivery aterriza en la transacción ERP <strong>VL31N / VL32N</strong> y se replica inmediatamente a EWM (transacción <strong>/SCWM/PRDI</strong>). EWM la usa para programar los montacargas, calcular las olas de Putaway y asignar una puerta de descarga (Door Assignment).</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Handling Unit Management (HUM)</h3>
            <p>El código SSCC de 18 dígitos identifica a un palet único. Al escanearlo, SAP da por recibidas las unidades internas.</p>
            <details>
                <summary>Ver explicación a fondo (Trazabilidad SSCC)</summary>
                <div class="details-content">
                    <p>Una <strong>Handling Unit (HU)</strong> es la combinación física del empaque (ej. EuroPalet de madera) y su contenido (ej. 50 laptops). Su matrícula global es el <em>Serial Shipping Container Code (SSCC)</em>. Con EWM HUM activo, el operario no digita "Recibí 50 laptops"; simplemente dispara su láser al SSCC del palet y el sistema hace el Post Goods Receipt (PGR) del contenido exacto en un milisegundo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Yard Management (Gestión de Patios)</h3>
            <p>Gestiona el flujo vehicular desde el Check-in. Asigna puertas (Doors) o espacios de parqueo internos.</p>
            <details>
                <summary>Ver explicación a fondo (El Almacén Externo)</summary>
                <div class="details-content">
                    <p>El Yard es un almacén EWM al aire libre. Los camiones se modelan como "Transportation Units" (TUs). El flujo es: 1) <strong>Check-in</strong> en garita, 2) Movimiento a un Parking Space, 3) Llamado a la Inbound Door, 4) Descarga, 5) <strong>Check-out</strong>. Si omites el Check-out, el sistema asume que el camión sigue bloqueando la puerta, impidiendo la asignación del siguiente vehículo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: MIGO vs VL32N / PRDI</h3>
            <p>MIGO es para Inventory Management clásico. En EWM, el Post Goods Receipt (PGR) se hace sobre la Inbound Delivery.</p>
            <details>
                <summary>Ver explicación a fondo (Bloqueo de Transacciones)</summary>
                <div class="details-content">
                    <p>Si intentas usar la MIGO_GR para un Almacén gestionado por EWM, SAP lanzará un Hard Error. Toda recepción debe hacerse desde EWM en la transacción <strong>/SCWM/PRDI</strong>. Al pulsar el botón "PGR", EWM envía un mensaje asíncrono (qRFC) al ERP para que actualice la contabilidad y disminuya el saldo pendiente de la Orden de Compra.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: La Zona Temporal (GR Zone)</h3>
            <p>La Zona 9010/902 es transitoria. Logísticamente está en 'tránsito interno' hasta que se mueva al rack.</p>
            <details>
                <summary>Ver explicación a fondo (Storage Type Transitorio)</summary>
                <div class="details-content">
                    <p>Cuando haces PGR, el inventario corporativo aumenta financieramente, pero físicamente los palets están sentados en el piso de descarga (GR Zone 9010). Este <em>Storage Type</em> no tiene capacidad volumétrica. Si los palets se quedan ahí más de 4 horas, se generan alertas rojas en el monitor (/SCWM/MON), ya que bloquean el flujo de los siguientes camiones.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Integración con Calidad (QM)</h3>
            <p>El stock entra como 'Quality Inspection Stock'. Nadie puede venderlo hasta que se libere con la QA11.</p>
            <details>
                <summary>Ver explicación a fondo (Inspection Lots)</summary>
                <div class="details-content">
                    <p>Si el Material Master tiene la vista QM activa (Inspection Type 01), EWM detona automáticamente un Lote de Inspección (Inspection Lot) al momento del PGR. El sistema crea una Warehouse Task para mover el palet a la zona de cuarentena (Q-Zone). Ventas verá el stock, pero no podrá despacharlo hasta que el inspector de calidad registre el "Usage Decision" (UD) de liberación en SAP ERP.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Expected Goods Receipt (EGR)</h3>
            <p>Si el ERP se cae, EWM puede seguir recibiendo camiones basándose en los EGR pre-descargados.</p>
            <details>
                <summary>Ver explicación a fondo (Operación Offline / Desacoplada)</summary>
                <div class="details-content">
                    <p>Una de las mayores ventajas de que EWM esté descentralizado (o como Add-on S/4HANA embebido) es la resiliencia. EWM descarga periódicamente un documento llamado <strong>EGR</strong> (Entradas de mercancías esperadas basadas en las POs abiertas del ERP). Si el ERP entra en mantenimiento o cae la red, EWM permite recibir camiones y crear Inbound Deliveries locales basadas en ese EGR, enviando la actualización contable cuando el ERP reviva.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Reversiones (Movement Type 102)</h3>
            <p>Para anular una recepción (101). EWM lo bloquea si el palet ya fue movido de la GR Zone al rack.</p>
            <details>
                <summary>Ver explicación a fondo (Reverse Goods Receipt)</summary>
                <div class="details-content">
                    <p>El error humano existe. Un operario confirma PGR por 1,000 unidades, pero el camión traía 100. En SAP IM, vas a MIGO y anulas con 102. En EWM es complejo: solo puedes ejecutar la anulación (Reverse GR) <strong>SI Y SOLO SÍ</strong> la Warehouse Task de Putaway no ha sido confirmada. Si el palet ya está guardado en el pasillo 14 a 10 metros de altura, debes hacer un Putaway inverso para devolverlo a la zona 9010 antes de poder anular financieramente.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Tolerancias de Entrega</h3>
            <p>Si la PO permite 5% extra, y el camión trae 6% extra, el sistema arroja Hard Error (M7 022).</p>
            <details>
                <summary>Ver explicación a fondo (Overdelivery & Underdelivery)</summary>
                <div class="details-content">
                    <p>La clave para evitar cuellos de botella en la garita está en las tolerancias (mantenidas en la Purchasing Info Record o el Material Master). Si el proveedor envía de más, EWM verifica la tolerancia. Si se excede, el PGR falla y el camión queda atascado en el muelle. Las mejores prácticas recomiendan gestionar estos excesos mediante "Unplanned Returns" o re-negociación dinámica con el comprador antes del escaneo final.</p>
                </div>
            </details>`
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
            `<h3>Capítulo 1: El Desafío del Putaway</h3>
            <p>EWM elimina la decisión humana. Evalúa peso, volumen y rotación mediante el Slotting.</p>
            <details>
                <summary>Ver explicación a fondo (El Fin del Operario Soberano)</summary>
                <div class="details-content">
                    <p>En bodegas antiguas, el montacarguista decidía dónde guardar el palet, ocultando inventario en "huecos secretos" que nadie más encontraba. En EWM, el algoritmo es un dictador benevolente: calcula las dimensiones (X,Y,Z), la inflamabilidad, la rotación (ABC) y el peso (Kg) para generar una Warehouse Task con coordenadas inamovibles. El humano solo obedece al escáner.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Putaway Control Indicator (PACI)</h3>
            <p>La llave del algoritmo en el Material Master. Ej. PACI 'PESA' para cosas pesadas.</p>
            <details>
                <summary>Ver explicación a fondo (El Gatillo del Algoritmo)</summary>
                <div class="details-content">
                    <p>El PACI se configura en la Vista <em>Warehouse Execution</em> del Material Master. Es el punto de partida del árbol de decisiones. Si un motor de avión tiene PACI = <code>HVY</code> (Pesado) y un chip tiene PACI = <code>SML</code> (Pequeño), el algoritmo separa sus caminos al instante: el motor buscará espacio en piso, y el chip buscará espacio en las estanterías de picking miniload.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Storage Type Search Sequence (STSS)</h3>
            <p>Filtro macro. Si la Zona 1 está llena, busca en la Zona 2.</p>
            <details>
                <summary>Ver explicación a fondo (La Cascada de Zonas)</summary>
                <div class="details-content">
                    <p>El STSS es la matriz de prioridades del almacén. Para el PACI <code>SML</code>, la secuencia dicta: <em>Intenta guardar primero en el Storage Type 0050 (Gavetas Rápidas). Si la capacidad de ese Storage Type llegó al 100%, pasa a la Prioridad 2: Storage Type 0060 (Gavetas Lentas). Si también falla, lanza la Excepción de Capacidad y detiene el palet en el muelle.</em></p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Storage Section y Bin Type</h3>
            <p>Filtro micro. Alta rotación vs Baja rotación. Hueco grande vs Hueco pequeño.</p>
            <details>
                <summary>Ver explicación a fondo (Slotting de Precisión)</summary>
                <div class="details-content">
                    <p>Una vez dentro del <em>Storage Type</em> ganador, el sistema aplica dos filtros más. <strong>Storage Section:</strong> ¿El material rota rápido (Fast-Mover)? Lo guarda en los primeros 3 pasillos cerca de la puerta. <strong>Bin Type:</strong> ¿El palet mide 1.5m de alto? El sistema descarta todos los <em>Bin Types</em> de 1.0m (para evitar que la carga se estrelle contra la viga superior) y elige el hueco perfecto.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Capacity Checking</h3>
            <p>Verifica que el Bin no colapse por el peso de la HU, por volumen, o por Key Figure.</p>
            <details>
                <summary>Ver explicación a fondo (Prevención de Desastres Estructurales)</summary>
                <div class="details-content">
                    <p>Asignar dos palets de 2 toneladas a una viga que solo soporta 3 toneladas es un accidente mortal. EWM ejecuta el chequeo de capacidad de tres formas: <strong>Por Peso</strong> (suma el gross weight de la HU actual + la entrante vs el Max Weight del Bin), <strong>Por Volumen</strong> (metros cúbicos), o <strong>Por Capacity Indicator</strong> (un factor adimensional, ej. el estante tiene 100 puntos de capacidad, y cada caja consume 5 puntos).</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Bin Strategies</h3>
            <p>Next Empty Bin, Addition to Existing Stock, o Fixed Bin.</p>
            <details>
                <summary>Ver explicación a fondo (Estrategias de Búsqueda Final)</summary>
                <div class="details-content">
                    <p>Una vez definidos todos los filtros, ¿qué Bin vacío elegimos primero? <strong>Next Empty Bin:</strong> Busca el primer hueco vacío en orden alfanumérico (Ideal para Alta Elevación). <strong>Addition to Existing Stock:</strong> Si ya hay 20 tornillos sueltos en un gavetero, y recibes 10 más, EWM buscará guardarlos en ese mismo gavetero para maximizar la densidad y evitar desparramar el mismo SKU por todo el almacén.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Bulk y Near Picking</h3>
            <p>Bulk es piso sin altura Z. Near picking deja el palet de reserva justo sobre la zona de recolección.</p>
            <details>
                <summary>Ver explicación a fondo (Estrategias de Relleno)</summary>
                <div class="details-content">
                    <p><strong>Bulk Storage (Almacenamiento en Bloque):</strong> Se usa para apilar cajas sobre cajas en el piso (sin racks metálicos), como los barriles de cerveza o llantas de tractor. EWM calcula el <em>Stacking Factor</em> (máximo 4 palets de altura antes de que la caja de abajo colapse). <strong>Near Picking:</strong> Sitúa el palet de sobrestock exactamente en el rack superior a la gaveta de picking para que el reabastecimiento demore segundos.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Cross-Docking (El Santo Grial)</h3>
            <p>Transferir mercancía directa de Inbound a Outbound sin almacenarla.</p>
            <details>
                <summary>Ver explicación a fondo (Aceleración de Flujo)</summary>
                <div class="details-content">
                    <p>El almacenamiento genera costos. Si se detecta un faltante crítico al descargar un palet, EWM suspende el algoritmo clásico de Putaway (que lo mandaría al rack) y ejecuta un atajo: genera una Warehouse Task que desvía la mercancía del muelle 9010 directamente hacia el andén de despacho 9020. Cero almacenamiento, cien por ciento eficiencia.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Planned vs Opportunistic CD</h3>
            <p>Planificado por APO/TM, u Oportunista interceptado por EWM si hay pedidos atrasados al hacer PGR.</p>
            <details>
                <summary>Ver explicación a fondo (Decisiones Dinámicas)</summary>
                <div class="details-content">
                    <p>El <strong>Planned Cross-Docking</strong> viene ordenado desde arriba (el ERP o SAP APO ya vincularon la entrada con la salida desde hace semanas). El verdadero poder de EWM radica en el <strong>Opportunistic Cross-Docking</strong>: una decisión heurística que el sistema toma en milisegundos en plena rampa de descarga cuando nota que un pedido acaba de caer en <em>Backorder</em> (atrasado por quiebre de stock).</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: La BAdI de Putaway</h3>
            <p>Código ABAP inyectado para reglas especiales que no existen en el estándar de SAP.</p>
            <details>
                <summary>Ver explicación a fondo (Business Add-Ins)</summary>
                <div class="details-content">
                    <p>A veces el algoritmo nativo no basta. Ejemplo real: "No guardes palets de productos químicos en Bins cuyo pasillo tenga palets de alimentos almacenados". Como SAP no trae esta regla por defecto, el desarrollador crea una <strong>BAdI (Business Add-In) de Putaway</strong>. Es un fragmento de código ABAP customizado que intercepta la decisión del sistema y filtra los Bins peligrosos antes de generar la Warehouse Task final.</p>
                </div>
            </details>`
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
            `<h3>Capítulo 1: El Flujo Outbound</h3>
            <p>El pedido nace en SAP SD. Al llegar a la fecha, se crea la Outbound Delivery, que viaja a EWM.</p>
            <details>
                <summary>Ver explicación a fondo (Integración SD-EWM)</summary>
                <div class="details-content">
                    <p>La logística de salida nunca nace en el almacén; nace en una venta corporativa (Sales Order en SAP SD) o en un traslado entre plantas (STO en MM). Cuando la fecha de disponibilidad del material (Material Availability Date - MAD) se cumple, el ERP genera automáticamente la <strong>Outbound Delivery (VL01N)</strong>, la cual se transmite vía qRFC hacia el sistema descentralizado EWM para iniciar la operación física.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: ODR y ODO</h3>
            <p>ODR recibe el mensaje. ODO (Outbound Delivery Order) es el documento operativo del almacén.</p>
            <details>
                <summary>Ver explicación a fondo (Conversión de Documentos)</summary>
                <div class="details-content">
                    <p>En EWM, el mensaje de ERP aterriza primero como un <strong>Outbound Delivery Request (ODR)</strong>, que es solo un espejo pasivo del requerimiento. Inmediatamente y sin intervención humana, SAP EWM lo convierte en un <strong>Outbound Delivery Order (ODO)</strong>. El ODO es el "Rey del Outbound": sobre este documento se arman las olas, se hacen los pickings, se empaca y se despacha usando la transacción <code>/SCWM/PRDO</code>.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Discrete Picking</h3>
            <p>Recolectar pedido por pedido es ineficiente. El operario camina kilómetros innecesarios.</p>
            <details>
                <summary>Ver explicación a fondo (El Desperdicio del Recorrido)</summary>
                <div class="details-content">
                    <p>El Picking Discreto ocurre cuando le das a un operario la lista de 1 cliente, él va por todo el almacén recolectando y vuelve a la puerta. Si tienes 100 clientes que pidieron el mismo modelo de iPhone, tendrías a 100 operarios viajando al mismo pasillo 100 veces en un día. Esto satura los pasillos y multiplica los tiempos logísticos. La solución a esto es agrupar.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Wave Management (Olas)</h3>
            <p>Agrupa líneas de diferentes ODOs bajo criterios lógicos (Ruta, Zona, Horario) para optimizar el picking.</p>
            <details>
                <summary>Ver explicación a fondo (El Cerebro del Despacho)</summary>
                <div class="details-content">
                    <p>El <strong>Wave Management</strong> rompe los pedidos de clientes y los agrupa en una gran "Ola de trabajo". En lugar de recoger por cliente, el montacarguista del Ala Norte recibe la orden de recoger TODOS los iPhones de todos los clientes de las 5:00 PM de un solo viaje, llevándolos a una zona central de empaque donde se separan por pedido. Esto reduce el recorrido total de la flota hasta en un 60%.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Wave Templates</h3>
            <p>Define Cut-off time y Release time. Automatiza la creación de olas.</p>
            <details>
                <summary>Ver explicación a fondo (Tiempos de Corte)</summary>
                <div class="details-content">
                    <p>Las Olas no se crean a mano; las generan los <strong>Wave Templates</strong>. Configuras parámetros críticos: <em>Release Time</em> (Ej. 2:00 PM, momento en que las tareas caen a las pistolas RF) y <em>Cut-off Time</em> (Ej. 1:45 PM, si un pedido entra 1:46 PM, se patea automáticamente para la ola del día siguiente). Esto asegura que el camión de las 5:00 PM salga a tiempo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Wave Release</h3>
            <p>Al liberar la Ola, EWM crea Warehouse Tasks (WTs) y las agrupa en Warehouse Orders (WOs) según ruta.</p>
            <details>
                <summary>Ver explicación a fondo (Creación de Tareas y WOCR)</summary>
                <div class="details-content">
                    <p>Al hacer el <strong>Wave Release</strong>, SAP genera cientos de Warehouse Tasks. Sin embargo, no se las lanza sueltas al operario. Pasan por las reglas <strong>WOCR (Warehouse Order Creation Rules)</strong>, que agrupan las tareas lógicamente. Por ejemplo: "No le des al operario más tareas de las que caben por volumen en su carrito de picking", o "Agrupa las tareas formando un recorrido en forma de 'U' o 'Z' para que no camine en zigzag".</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Pick-HU</h3>
            <p>El operario toma una caja vacía (Pick-HU), escanea los productos y los mete lógicamente en ella.</p>
            <details>
                <summary>Ver explicación a fondo (Virtualización del Empaque)</summary>
                <div class="details-content">
                    <p>En el Picking moderno, no recolectas en las manos. Al iniciar su ruta en la pistola RF, el operario escanea el código de barras de una caja de cartón vacía convirtiéndola en una <strong>Pick-Handling Unit</strong>. A medida que extrae unidades del rack, las va asociando lógicamente a esa caja (Nesting). Al final del pasillo, la caja ya está lista, empaquetada y rastreable en el sistema.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Two-Step Picking</h3>
            <p>Paso 1: Withdrawal (Bajar palet entero). Paso 2: Allocation (Distribuir en cajas de clientes).</p>
            <details>
                <summary>Ver explicación a fondo (Optimización Retail)</summary>
                <div class="details-content">
                    <p>Ideal si 50 clientes piden el mismo material. <strong>Paso 1 (Withdrawal/Retiro):</strong> Un montacargas de gran altura baja un palet completo con 500 unidades a la zona media. <strong>Paso 2 (Allocation/Asignación):</strong> Los operarios pedestres de picking rápido toman de ese palet las unidades exactas para cada cliente. Evita que la máquina pesada haga 50 viajes al mismo hueco.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Staging y Loading</h3>
            <p>Consolidación en andenes (920). Carga escaneando el SSCC al subirlo al camión.</p>
            <details>
                <summary>Ver explicación a fondo (Auditoría de Carga)</summary>
                <div class="details-content">
                    <p>El <strong>Staging Area (Zona 920)</strong> es la cuadrícula pintada en el piso frente a la puerta del andén. Una vez consolidada la mercancía, inicia el proceso de <strong>Loading (Carga)</strong> en RF. El operario debe escanear el palet al subirlo por la rampa del camión. Si intenta subir el palet del Cliente A al camión del Cliente B, el sistema lo bloquea con una alerta acústica grave.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Post Goods Issue (PGI)</h3>
            <p>El botón final. Desaparece el inventario, detona la facturación en SD y registra el COGS en FI.</p>
            <details>
                <summary>Ver explicación a fondo (El Cierre Financiero)</summary>
                <div class="details-content">
                    <p>El PGI sella el ciclo logístico. Físicamente, el camión cierra puertas. En SAP, la mercancía desaparece del almacén de EWM (disminuye LQUA). A nivel ERP, se registra el asiento contable de Costo de Ventas (COGS contra Inventario) y se levanta el bloqueo comercial, permitiendo que el módulo SD emita la factura legal para cobrarle al cliente.</p>
                </div>
            </details>`
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
            `<h3>Capítulo 1: La Realidad del Almacén</h3>
            <p>El sistema dice que hay 100, pero físicamente hay 80. Aquí nacen las Excepciones.</p>
            <details>
                <summary>Ver explicación a fondo (El Desfase Físico-Lógico)</summary>
                <div class="details-content">
                    <p>En el mundo real los productos se rompen, se roban o se almacenan en pasillos equivocados. Cuando el inventario lógico de HANA no coincide con la realidad física, los algoritmos de EWM fallan al enviar a un operario a buscar "aire". El manejo de estas crisis en pleno flujo de trabajo sin detener el almacén se llama <strong>Exception Handling</strong>.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Exception Codes</h3>
            <p>Códigos de 4 letras. Ej: BIDF (Bin Denied), CHBA (Change Batch), SPLT (Split).</p>
            <details>
                <summary>Ver explicación a fondo (Comandos de Contingencia)</summary>
                <div class="details-content">
                    <p>Cuando un operario de radiofrecuencia no puede completar su tarea, presiona la tecla <code>F4</code> (Exceptions) y digita un código técnico. <strong>BIDF:</strong> El Bin está vacío (Bin Denied). <strong>CHBA:</strong> El lote sugerido por SAP está averiado, pido permiso para sacar otro lote. <strong>SPLT:</strong> Mi carrito está lleno, divido la tarea y dejo el resto para el siguiente operario.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Pick Denial</h3>
            <p>BIDF ajusta inventario, bloquea el Bin, y recalcula el STSS buscando stock en otra ubicación.</p>
            <details>
                <summary>Ver explicación a fondo (Reacción en Cadena)</summary>
                <div class="details-content">
                    <p>Si el montacarguista dispara <strong>BIDF</strong>, SAP EWM no solo lanza un error. En background, dispara tres reglas de negocio: 1) Ajusta contablemente el inventario a cero en ese Bin, 2) Bloquea el Bin con un candado para que a nadie más lo envíen allí, y 3) Despierta nuevamente el algoritmo de Picking para escanear el almacén y asignarle al operario otro Bin que sí contenga la mercancía en menos de un segundo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Replenishment</h3>
            <p>Reabastecimiento de Racks Altos a Bins de Piso antes de que se queden vacíos.</p>
            <details>
                <summary>Ver explicación a fondo (Alimentación de Pick-Faces)</summary>
                <div class="details-content">
                    <p>Si el nivel de piso (Picking Face) se queda sin stock, los pedidos se retrasan. <strong>Replenishment (Reabastecimiento)</strong> es el proceso de bajar palets enteros desde la zona de reserva (High Rack) y distribuirlos en las gavetas de los recolectores. Evita el "Pick Denial" adelantándose a la escasez de mercancía.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Planned y Automatic</h3>
            <p>Planned: Background Job nocturno. Automatic: Al caer bajo el mínimo durante un picking.</p>
            <details>
                <summary>Ver explicación a fondo (Estrategias de Reposición)</summary>
                <div class="details-content">
                    <p><strong>Planned (Planificado):</strong> Un Job en S/4HANA corre a las 2:00 AM, calcula promedios y ordena llenar las gavetas para el turno matutino. <strong>Automatic (Automático):</strong> Si un operario extrae cajas y el stock del Bin cae por debajo del umbral Mínimo parametrizado, el sistema lanza una tarea inmediata al montacargas más cercano para reponer ese Bin urgente.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Order-Related Replenishment</h3>
            <p>Pausa la liberación de la Ola, ordena reabastecer, y luego libera las tareas de salida.</p>
            <details>
                <summary>Ver explicación a fondo (Reposición Bajo Demanda)</summary>
                <div class="details-content">
                    <p>Este es el algoritmo más complejo. Al hacer Wave Release, SAP nota que un pedido requiere 500 baterías, pero en el piso de Picking solo hay 100. En lugar de crear un Picking parcial que trabaría el pedido, SAP EWM pausa la Ola de salida. Primero envía una tarea urgente de reabastecimiento (bajar palets). Solo cuando el montacarguista confirma que bajó los palets al piso, SAP "descongela" la Ola y libera el Picking final.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Cancelaciones Outbound</h3>
            <p>Requiere Reverse Goods Issue y tareas de Putaway inverso para devolver palets al rack.</p>
            <details>
                <summary>Ver explicación a fondo (Reversión Compleja)</summary>
                <div class="details-content">
                    <p>Si el camión choca al salir de la planta y el cliente cancela la compra, debes anular el proceso en SAP. Si ya hiciste el PGI, debes hacer un <strong>Reverse PGI</strong> para regresar el saldo financiero. Sin embargo, físicamente los palets están en el andén de salida (920). EWM exige que generes Warehouse Tasks de Putaway inversas para devolver cada palet desde el andén de vuelta a su estantería original (Racks) liberando así el muelle.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Batch Determination (FEFO)</h3>
            <p>First Expired, First Out. Busca el lote más antiguo que aún cumpla la vida útil exigida.</p>
            <details>
                <summary>Ver explicación a fondo (Condiciones de Lotes)</summary>
                <div class="details-content">
                    <p>En industrias farmacéuticas o alimenticias, no puedes enviar cualquier lote. El algoritmo <strong>FEFO</strong> rutea la tarea hacia el Bin que tenga la fecha de caducidad (SLED) más próxima. Además, SAP respeta los Acuerdos de Nivel de Servicio (SLA): si el cliente Wal-Mart exige que los yogures lleguen con mínimo 20 días de vida útil, EWM ignorará (saltará) los lotes que venzan en 10 días, forzando un Picking de lotes más frescos.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Cartonization</h3>
            <p>IA que lee dimensiones (X,Y,Z) y recomienda la caja de cartón exacta para evitar flete de aire.</p>
            <details>
                <summary>Ver explicación a fondo (Cartonization Planning / CAP)</summary>
                <div class="details-content">
                    <p>Enviar "aire" es el mayor desperdicio en E-Commerce. El <em>Cartonization Planning</em> es un motor matemático. Conoce las dimensiones de los productos del pedido y las dimensiones de todas las cajas vacías del almacén (S, M, L, XL). Durante el Wave Release, SAP calcula un Tetris 3D virtual y le dice al operario de RF: "Para este pedido, usa exactamente una caja Talla M y una caja Talla S".</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Warehouse Monitor</h3>
            <p>Panel /SCWM/MON. Permite desencolar tareas, reasignar operarios y auditar inventario.</p>
            <details>
                <summary>Ver explicación a fondo (El Centro de Mando EWM)</summary>
                <div class="details-content">
                    <p>La transacción <strong>/SCWM/MON</strong> es el radar del consultor y supervisor. Desde aquí no solo visualizas datos, sino que ejecutas <em>Methods</em> (Acciones). Si una ODO está bloqueada por falta de stock, la desencolas. Si un operario desapareció con tareas pendientes, reasignas sus Warehouse Orders a otro empleado. Es la consola suprema de gestión de crisis en S/4HANA EWM.</p>
                </div>
            </details>`
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
        duration: "35 Horas • Certificación Arquitecto Senior",
        req: "s3_l2",
        description: "Inmersión de nivel consultor senior en la automatización extrema de SAP S/4HANA EWM. Domina el motor matemático de Cross-Docking (Planned, Opportunistic y Merchandise Distribution) y la arquitectura de comunicación directa por Sockets TCP/IP con PLCs, transelevadores ASRS y fajas transportadoras mediante SAP MFS. 15 capítulos profundos y 40 preguntas de certificación.",
        review: "Regla de Oro: El Cross-Docking elimina el Putaway y el Picking intermedio redirigiendo la HU desde la zona GR (9010) hacia la zona GI (9020). SAP MFS ejecuta ese movimiento físico sin middleware WCS, traduciendo Warehouse Tasks en Telegramas ASCII enviados por ABAP Push Channels (APC) directo a la IP del PLC.",
        pages: [
            `<h3>Capítulo 1: La Física y Economía del Cross-Docking (CD)</h3>
            <p>En la ingeniería clásica de almacenes, un producto atraviesa cuatro etapas costosas: Recepción (Inbound), Almacenamiento en Rack (Putaway), Recolección (Picking) y Expedición (Shipping). Estudios industriales demuestran que el <strong>Putaway y el Picking consumen hasta el 65% del costo operativo total (OPEX)</strong> de un centro de distribución en horas-hombre, desgaste de montacargas y depreciación de baterías.</p>
            <p>El <strong>Cross-Docking (CD)</strong> es la estrategia arquitectónica que cortocircuita el almacén: la mercancía que baja del camión del proveedor en el muelle de entrada (Inbound Door) se redirige directamente hacia el muelle de salida (Outbound Door) para cubrir una demanda activa, tocando únicamente el piso de consolidación (Staging Area) por pocas horas o minutos.</p>
            <ul>
                <li><strong>Impacto en el Working Capital:</strong> Reduce el tiempo de ciclo de pedido (Order Lead Time) de 48 horas a menos de 2 horas.</li>
                <li><strong>Impacto en la Huella Espacial:</strong> Disminuye la necesidad de ubicaciones en rack alto (High Rack Storage), liberando capacidad cúbica para SKUs de baja rotación.</li>
                <li><strong>Requisito Crítico:</strong> Sincronización milimétrica de datos mediante códigos de barras GS1-128 (SSCC) e integración en tiempo real entre las órdenes de entrada y salida.</li>
            </ul>`,

            `<h3>Capítulo 2: Tipologías de Cross-Docking en SAP S/4HANA EWM</h3>
            <p>SAP EWM no trata el Cross-Docking como un proceso único, sino que ofrece cinco motores algorítmicos distintos según el origen de la decisión y la industria:</p>
            <ul>
                <li><strong>1. Transportation Cross-Docking (TCD):</strong> El almacén actúa como un mero "Hub de Tránsito". El palet (HU) entra cerrado y sale cerrado hacia otro centro o cliente final sin abrirse jamás. Es gobernado en conjunto con SAP TM (Transportation Management).</li>
                <li><strong>2. Merchandise Distribution (Retail Push & Pull):</strong> Típico de supermercados y moda. Un proveedor entrega 1,000 camisas en un palet madre; en la zona de Cross-Docking se abre el palet y se reparten inmediatamente 20 unidades para la Tienda A, 50 para la Tienda B y 30 para la Tienda C según documentos de asignación previos (Allocation Tables en SAP S/4HANA Retail).</li>
                <li><strong>3. Pick-from-Goods-Receipt (PfGR):</strong> Variante reactiva donde la mercancía se recibe en el muelle 9010 y desde ahí mismo se generan las tareas de extracción hacia las cajas de los clientes (Pick-HUs).</li>
                <li><strong>4. Planned Cross-Docking:</strong> El enlace entre la Inbound Delivery y la Outbound Delivery ya viene sellado desde el sistema ERP o SAP APO antes de que el camión toque la garita.</li>
                <li><strong>5. EWM-Triggered Opportunistic Cross-Docking:</strong> El motor más inteligente. Ni el ERP ni el proveedor saben que habrá Cross-Docking; es el propio cerebro de SAP EWM quien intercepta la mercancía en pleno muelle de descarga al detectar urgencias de salida.</li>
            </ul>`,

            `<h3>Capítulo 3: Arquitectura del Opportunistic Cross-Docking</h3>
            <p>El <strong>Opportunistic Cross-Docking</strong> ocurre de forma 100% dinámica dentro de SAP EWM y se divide en dos vertientes operativas: <em>Inbound-Driven</em> (impulsado por la entrada) y <em>Outbound-Driven</em> (impulsado por la salida).</p>
            <p>En el escenario <strong>Inbound-Driven</strong>, un camión llega al muelle y el operario contabiliza el Post Goods Receipt (PGR) o intenta crear la tarea de Putaway. En ese milisegundo, antes de buscar un Bin vacío en el rack mediante el STSS, SAP EWM escanea la tabla de órdenes de salida (<code>/SCWM/DB_PROCH_O</code> y <code>/SCWM/DB_PROCI_O</code>) buscando <strong>Outbound Delivery Orders (ODOs)</strong> que tengan ese mismo Material, Lote y Tipo de Stock pendientes de asignación o en estado de Backorder.</p>
            <p>En el escenario <strong>Outbound-Driven</strong>, el proceso ocurre al revés: al liberar una Ola (Wave Release) para hacer Picking, el sistema nota que en los racks el stock es insuficiente o decide optimizar movimientos mirando si ya existe stock recién descargado sentado en la <strong>GR Zone (Storage Type 9010)</strong>. En lugar de mandar al montacarguista al pasillo 40 nivel 8, el sistema secuestra el palet que está en la puerta de recepción, cancela su Putaway pendiente y crea una Warehouse Task directa hacia la <strong>GI Zone (Storage Type 9020)</strong>.</p>`,

            `<h3>Capítulo 4: División de Tareas (WT Split) y Ruteo Complejo CD</h3>
            <p>¿Qué sucede cuando el camión del proveedor descarga un EuroPalet con <strong>100 unidades</strong> de un componente electrónico, pero la Outbound Delivery Order urgente del cliente solo exige <strong>35 unidades</strong>? SAP EWM ejecuta automáticamente una maniobra de <strong>División de Tareas (Warehouse Task Split)</strong> apalancada en un <em>Work Center</em> de desconsolidación o directamente en el muelle:</p>
            <ul>
                <li><strong>WT 1 (Cross-Docking Allocation):</strong> Por 35 unidades, con origen en la GR Zone (9010) y destino en la GI Staging Area (9020), vinculada directamente al documento ODO de salida mediante una referencia cruzada en la tabla <code>/SCWM/ORDIM_O</code>.</li>
                <li><strong>WT 2 (Putaway Remanente):</strong> Por las 65 unidades sobrantes, ejecutando el algoritmo normal de Putaway (PACI -> STSS -> Storage Section -> Bin) para guardarlas en el rack de reserva.</li>
            </ul>
            <p>Además, en centros logísticos gigantescos donde las puertas Inbound están en el Ala Norte y las puertas Outbound en el Ala Sur (a más de 600 metros de distancia), el sistema aplica <strong>Layout-Oriented Storage Control (LOSC)</strong>. Esto divide el traslado en sub-tareas pasando por puntos intermedios de transferencia (Identification Points / Pick Points) para que un montacargas de muelle no abandone su zona asignada.</p>`,

            `<h3>Capítulo 5: Introducción a SAP Material Flow System (MFS)</h3>
            <p>Cuando un almacén supera cierto umbral de volumen (por ejemplo, despachar 150,000 cajas diarias), los montacargas conducidos por humanos se vuelven un cuello de botella físico. Las empresas instalan entonces <strong>automatización mecatrónica</strong>: kilómetros de fajas transportadoras de rodillos (Conveyors), desviadores neumáticos (Sorters), elevadores verticales y grúas robóticas de pasillo estrecho conocidas como <strong>ASRS (Automated Storage and Retrieval Systems)</strong> o transelevadores.</p>
            <p>El módulo <strong>SAP MFS (Material Flow System)</strong> es el componente nativo dentro de SAP S/4HANA EWM diseñado para gobernar este hardware mecatrónico en tiempo real. A través de MFS, SAP controla cada motor, cada sensor fotoeléctrico y cada brazo robótico del centro de distribución, convirtiendo una orden lógica de negocio en impulsos eléctricos industriales sin intervención humana.</p>`,

            `<h3>Capítulo 6: La Muerte del Middleware WCS</h3>
            <p>En la arquitectura legada de los años 90 y 2000 (SAP WM clásico), SAP era incapaz de comunicarse a velocidades de milisegundos con la maquinaria. Por ello existía una arquitectura de 3 capas:</p>
            <ol>
                <li><strong>Capa Superior (WMS - SAP):</strong> Tenía el inventario financiero y lanzaba una orden genérica ("Bajar palet X del rack").</li>
                <li><strong>Capa Intermedia (WCS - Warehouse Control System):</strong> Un software de terceros (de fabricantes como Dematic, Knapp, Vanderlande o Swisslog) con su propia base de datos que recibía la orden de SAP, decidía la ruta física en las fajas y hablaba con las máquinas.</li>
                <li><strong>Capa Inferior (PLC - Programmable Logic Controller):</strong> Las computadoras industriales (Siemens Simatic S7, Allen-Bradley) conectadas a los motores eléctricos.</li>
            </ol>
            <p>Esta arquitectura de 3 capas sufría un defecto crónico: <strong>desincronización de bases de datos (Split-Brain Syndrome)</strong>. Si un palet se caía en la faja, el WCS lo sabía, pero SAP creía que seguía en camino. <strong>SAP EWM MFS elimina por completo el WCS intermedio</strong>: SAP absorbe la inteligencia de control de tráfico y se conecta por cable de red (TCP/IP) directamente al PLC Siemens o Allen-Bradley. Una sola base de datos (HANA), cero interfaces duplicadas y visibilidad absoluta en tiempo real.</p>`,

            `<h3>Capítulo 7: Los 5 Objetos Maestros de la Arquitectura MFS</h3>
            <p>Para que SAP EWM pueda modelar digitalmente un circuito de fajas y grúas (Digital Twin), el arquitecto funcional debe configurar cinco entidades maestras interconectadas en el Customizing (SPRO) y datos maestros:</p>
            <ul>
                <li><strong>1. PLC (Controlador Lógico Programable):</strong> Representa en SAP al cerebro electrónico físico que controla un sector de máquinas. Define qué protocolo y estructura de mensajes utiliza.</li>
                <li><strong>2. Communication Channel (Canal de Comunicación):</strong> Define el túnel TCP/IP (Dirección IP, Puerto Socket, Timeout de respuesta, secuencia de Handshake) entre el servidor SAP S/4HANA y el PLC. Un PLC puede tener múltiples canales (ej. Canal A para envío, Canal B para recepción).</li>
                <li><strong>3. Communication Point (Punto de Comunicación / CP):</strong> Es la representación lógica de un punto físico en la faja donde hay un <strong>escáner láser de código de barras, una báscula o un sensor óptico (I-Point)</strong>. Cada CP se mapea a un Storage Bin técnico en SAP.</li>
                <li><strong>4. Conveyor Segment (Segmento de Transporte):</strong> Es el tramo de faja física que une el Punto de Comunicación A con el Punto de Comunicación B.</li>
                <li><strong>5. Resource MFS (Vehículo / Grúa):</strong> Representa a un transelevador (Stacker Crane) o carro satelital (Shuttle) que se mueve sobre rieles y tiene capacidad de carga definida.</li>
            </ul>`,

            `<h3>Capítulo 8: Anatomía de un Telegrama MFS y Protocolo RFC/TCP</h3>
            <p>Un PLC industrial tiene memoria medida en Kilobytes; no entiende archivos JSON pesados, ni XML, ni llamadas OData. Por eso, SAP MFS se comunica con los PLCs mediante <strong>Telegramas</strong>: cadenas de caracteres ASCII o flujos binarios de longitud fija (por ejemplo, exactamente 64 o 128 bytes) donde la posición de cada carácter tiene un significado estricto.</p>
            <p>Veamos la disección de un telegrama real de orden de transporte (<code>WT_TASK</code>) enviado por SAP a un PLC Siemens:</p>
            <p><code>[STX]00452|CHAN01|WT99821|CP_IN_01|CP_OUT_04|00180005009123456789|ACK[ETX]</code></p>
            <ul>
                <li><strong>STX / ETX:</strong> Caracteres de control hexadecimal que marcan el inicio (Start of Text) y fin (End of Text) del paquete en el cable de red.</li>
                <li><strong>Sequence Number (00452):</strong> Contador correlativo anti-pérdida. Si el PLC recibió el 00451 y luego recibe el 00453, detecta pérdida de paquetes y detiene el canal.</li>
                <li><strong>Source & Destination (CP_IN_01 -> CP_OUT_04):</strong> Coordenadas físicas de qué sensor a qué desviador debe moverse el motor.</li>
                <li><strong>Payload (00180005009123456789):</strong> El código SSCC de 20 dígitos de la Handling Unit que está viajando sobre los rodillos.</li>
                <li><strong>Handshake (ACK / NAK):</strong> Todo telegrama exige un acuse de recibo técnico a nivel de capa de transporte en menos de 200 milisegundos. Si el PLC no responde <code>ACK</code>, SAP retransmite automáticamente el telegrama según el contador de reintentos del canal.</li>
            </ul>`,

            `<h3>Capítulo 9: ABAP Push Channels (APC) vs SAP Plant Connectivity (PCo)</h3>
            <p>¿Cómo logra un servidor SAP (escrito en lenguaje ABAP, históricamente transaccional) mantener una conexión de Socket TCP/IP abierta permanentemente las 24 horas escuchando a un PLC en milisegundos? En SAP S/4HANA existen dos arquitecturas de conectividad física:</p>
            <ul>
                <li><strong>Arquitectura Moderna Directa — ABAP Push Channels (APC) + TCP Sockets:</strong> Introducida en el kernel moderno de S/4HANA. El servidor de aplicaciones ABAP abre directamente un Socket TCP/IP nativo (transacción <code>SAPC</code>) que escucha y transmite paquetes TCP crudos al PLC sin ningún software externo. Es la arquitectura recomendada por SAP por su latencia inferior a 15 milisegundos.</li>
                <li><strong>Arquitectura Clásica — SAP Plant Connectivity (SAP PCo):</strong> Un pequeño servicio instalado en un servidor Windows local en la planta que convierte los Sockets TCP/IP del PLC en llamadas RFC (Remote Function Call) hacia SAP. Se sigue utilizando cuando el servidor S/4HANA está en la nube pública (HEC / RISE with SAP) y por seguridad de firewall corporativo se requiere un concentrador local en el almacén físico.</li>
            </ul>`,

            `<h3>Capítulo 10: Routing Points, Escáneres Láser y Layout-Oriented Storage Control (LOSC)</h3>
            <p>Cuando un palet avanza sobre una faja transportadora a 1.5 metros por segundo, el sistema ejecuta el <strong>Layout-Oriented Storage Control (LOSC)</strong> paso a paso, de sensor en sensor (Routing Point a Routing Point), en lugar de revelar la ruta entera de una sola vez al PLC.</p>
            <p>Imagina que un palet debe ir desde el Muelle de Recepción (<code>BIN-GR-01</code>) hasta el Rack Automatizado Pasillo 5, Nivel 12, Profundidad 2 (<code>05-12-02</code>):</p>
            <ol>
                <li>En SAP existe una <strong>Warehouse Task Madre</strong>: Origen <code>BIN-GR-01</code> -> Destino Final <code>05-12-02</code> (Estado: <em>Waiting</em>, bloqueada porque antes debe pasar por los puntos de control de la faja).</li>
                <li>El operario deja el palet al inicio de la faja (<code>CP01 - I-Point</code>). El túnel de rayos láser mide altura, ancho, pesa el palet y lee el código SSCC.</li>
                <li>El PLC envía a SAP un telegrama de notificación en el punto <code>CP01</code>. SAP valida que el palet no tenga sobrepeso ni deformaciones (Contour Error) y crea la <strong>Sub-WT 1</strong>: de <code>CP01</code> hacia el cruce del Pasillo 5 (<code>CP_AISLE_05</code>).</li>
                <li>Cuando el palet llega al sensor <code>CP_AISLE_05</code>, el PLC avisa a SAP. SAP confirma la Sub-WT 1 y libera la <strong>WT Madre</strong> para que el transelevador (grúa robótica del Pasillo 5) tome el palet de la faja y lo inyecte en el hueco final <code>05-12-02</code>.</li>
            </ol>`,

            `<h3>Capítulo 11: Control de Capacidad de Fajas y Prevención de Atascos (Deadlocks)</h3>
            <p>En una autopista de rodillos industriales, si SAP envía 50 palets seguidos hacia el punto de transferencia del Pasillo 3, pero la grúa del Pasillo 3 solo puede guardar 20 palets por hora, la faja colapsará, bloqueando la arteria principal e impidiendo que los palets que iban al Pasillo 4 puedan pasar. Esto se conoce en ingeniería como <strong>Bloqueo Mutuo (Deadlock) o Congestión de Línea</strong>.</p>
            <p>SAP MFS previene este desastre mediante los <strong>Capacity Limits de Communication Points y Conveyor Segments</strong>:</p>
            <ul>
                <li>Cada punto de acumulación antes de una grúa tiene configurado en SAP un parámetro <code>Max. Number of HUs</code> (por ejemplo, máximo 4 palets en cola física).</li>
                <li>SAP lleva el conteo en memoria de cuántas Warehouse Tasks activas están viajando hacia ese segmento (<code>Current Load</code>).</li>
                <li>Cuando se alcanza el límite de 4 palets en tránsito, SAP MFS <strong>congela la liberación de nuevas WTs</strong> hacia ese ramal o desvía el palet nº 5 para que dé una vuelta en el carrusel de recirculación (Loop Conveyor) hasta que el PLC envíe el telegrama de confirmación indicando que la grúa ya liberó espacio en el buffer.</li>
            </ul>`,

            `<h3>Capítulo 12: Cinemática de Grúas ASRS, Single/Dual Command y Multi-Deep</h3>
            <p>Los transelevadores o grúas robóticas (<strong>Stacker Cranes</strong>) en un almacén de gran altura (Silo de 40 metros) son gobernados en SAP MFS como recursos especializados. Para maximizar su velocidad, SAP MFS aplica algoritmos de cinemática y optimización de ciclos:</p>
            <ul>
                <li><strong>Single Command Cycle (Ciclo Simple):</strong> La grúa toma un palet en la cabecera del pasillo, viaja al hueco <code>X,Y</code>, lo deposita y regresa vacía a la cabecera. Es ineficiente en horas pico.</li>
                <li><strong>Dual Command Cycle (Ciclo Doble / MFS Task Interleaving):</strong> SAP MFS empareja automáticamente una tarea de entrada (Putaway) con una tarea de salida (Picking) dentro del mismo pasillo. La grúa lleva el Palet A y lo guarda en la coordenada <code>05-10-01</code>; sin regresar a la base, se desplaza solo dos metros hasta <code>05-11-01</code>, extrae el Palet B que se necesita para un pedido de venta, y vuelve a la cabecera cargada. <strong>Ahorra hasta un 40% de desplazamientos mecánicos</strong>.</li>
                <li><strong>Almacenamiento Multi-Deep (Doble o Triple Profundidad):</strong> Las estanterías automatizadas suelen guardar dos o tres palets de fondo para ahorrar pasillos. Si SAP necesita sacar el palet del fondo (Posición B), pero adelante está bloqueando otro palet (Posición A), el motor MFS genera automáticamente una <strong>Tarea de Reubicación (Stock Rearrangement WT)</strong> para mover el palet delantero a un hueco vacío cercano antes de extraer el objetivo.</li>
            </ul>`,

            `<h3>Capítulo 13: Manejo de Excepciones Mecánicas en Tiempo Real</h3>
            <p>El mundo físico es imperfecto: las etiquetas de código de barras se rasgan, la madera de los EuroPalets se astilla en los rodillos y los sensores ópticos se ensucian. SAP MFS traduce los códigos de fallo del PLC en <strong>MFS Exception Codes</strong> que detonan acciones correctivas instantáneas sin detener la planta:</p>
            <ul>
                <li><strong>Excepción NOREAD (Scanner No-Read) / CONT (Contour Error):</strong> El palet pasa por el I-Point pero el láser no logra leer el SSCC o detecta que una caja sobresale 5 cm del borde del palet (riesgo de derrumbe en el rack a 30 metros de altura). SAP MFS cancela la ruta hacia el rack y envía inmediatamente un telegrama desviando el palet hacia el <strong>Ramal de Rechazo (Reject Spur / Clearing Station)</strong>, donde un operario humano re-etiqueta o acomoda la carga.</li>
                <li><strong>Excepción BINF (Bin Full Physically):</strong> La grúa llega al hueco supuestamente vacío en SAP, pero su sensor óptico en la horquilla detecta que ya hay un obstáculo físico (Fantasma en el Bin). El PLC aborta la inserción y envía el código de error a SAP; SAP marca ese Bin como bloqueado para inventario, mantiene el palet sobre la horquilla de la grúa y en menos de 100 milisegundos calcula un <strong>Nuevo Bin Destino</strong> en el mismo pasillo enviando un nuevo telegrama a la grúa.</li>
                <li><strong>Caída de Grúa (Resource Out of Order):</strong> Si un motor entra en fallo térmico, el PLC notifica el estado inactivo del recurso. SAP MFS recalcula las olas de salida buscando stock idéntico en los pasillos vecinos cuyas grúas siguen operativas.</li>
            </ul>`,

            `<h3>Capítulo 14: Tablas SQL Core y el Monitor MFS (/SCWM/MON)</h3>
            <p>Un arquitecto de soporte nivel 3 debe dominar el modelo de datos subyacente de MFS y las herramientas de control en el <strong>Warehouse Management Monitor (<code>/SCWM/MON</code>)</strong> bajo el nodo especializado <em>Material Flow System</em>:</p>
            <ul>
                <li><strong>Tabla <code>/SCWM/MFS_PLC</code>:</strong> Configuración maestra de los PLCs e interfaz de comunicación.</li>
                <li><strong>Tabla <code>/SCWM/MFS_CH</code>:</strong> Estado operativo en vivo de los Communication Channels (Abierto, Cerrado, Secuencia actual de envío/recepción, IP y Puerto).</li>
                <li><strong>Tabla <code>/SCWM/MFS_CP</code>:</strong> Maestro y estado de ocupación actual de los Communication Points.</li>
                <li><strong>Tabla <code>/SCWM/MFS_WT</code> y <code>/SCWM/ORDIM_O</code>:</strong> Cola de telegramas pendientes y tareas de almacén activas en el circuito automatizado.</li>
                <li><strong>Tabla <code>/SCWM/MFSTELELOG</code>:</strong> El registro forense (Log de Telegramas). Guarda cada cadena ASCII enviada y recibida con marca de tiempo en microsegundos. Se activa y audita con las transacciones <code>/SCWM/MFS_ACS</code> o directamente desde los métodos del monitor para iniciar/detener canales, reiniciar contadores de secuencia o reenviar un telegrama atascado.</li>
            </ul>`,

            `<h3>Capítulo 15: Integración End-to-End (Cross-Docking + MFS) y Emulación de Estrés</h3>
            <p>El pináculo de la ingeniería logística ocurre cuando combinamos ambos mundos: <strong>Opportunistic Cross-Docking ejecutado sobre SAP MFS</strong>. Cuando un camión descarga un palet y el operario lo deposita en el rodillo de entrada (I-Point), el láser escanea el SSCC. SAP recibe el telegrama, ejecuta el PGR automático, detecta un Backorder urgente mediante el motor de Cross-Docking y, en lugar de enviar el palet hacia los transelevadores ASRS, le ordena al PLC de las fajas que desvíe el palet a toda velocidad por el carril rápido directo hacia la rampa de carga del camión de salida. El palet cruza la bodega entera en 4 minutos sin que ningún ser humano ni montacargas lo toque.</p>
            <p>Antes del Go-Live de una planta automatizada, detener el almacén real por un bug de configuración cuesta millones de dólares. Por ello, SAP incluye herramientas de simulación y diagnóstico como <strong><code>/SCWM/MFS_SIM</code> (Simulador de PLC)</strong> y generadores de telegramas de prueba, que permiten a los consultores simular el paso de miles de HUs virtuales por los Communication Points, provocando fallos artificiales (<code>BINF</code>, <code>CONT</code>) para certificar que las colas, las BAdIs de ruteo y el servidor S/4HANA resisten la carga máxima sin bloqueos de base de datos.</p>`
        ],
        exam: [
            { question: "¿Qué porcentaje aproximado del costo operativo (OPEX) de un almacén tradicional representan las tareas combinadas de Putaway y Picking que el Cross-Docking busca eliminar?", options: [{text:"Hasta el 65% del costo operativo.", correct:true}, {text:"Menos del 5% del costo operativo.", correct:false}, {text:"Exactamente el 100%, ya que no hay otros costos.", correct:false}, {text:"Solo el costo de facturación en SAP SD.", correct:false}] },
            { question: "En SAP S/4HANA EWM, ¿cuál es la diferencia arquitectónica entre Planned Cross-Docking y Opportunistic Cross-Docking?", options: [{text:"Planned CD viene pre-vinculado desde ERP/APO antes de la llegada; Opportunistic CD lo decide EWM dinámicamente en tiempo real durante la operación.", correct:true}, {text:"Planned CD solo usa montacargas y Opportunistic CD solo usa grúas robóticas.", correct:false}, {text:"Planned CD no requiere documentos de entrega y Opportunistic CD usa MIGO manual.", correct:false}, {text:"Son exactamente el mismo algoritmo con diferente nombre comercial.", correct:false}] },
            { question: "¿Qué modalidad de Cross-Docking se utiliza cuando una HU cerrada entra al almacén y vuelve a salir cerrada hacia otro centro sin abrirse jamás, actuando la bodega como un Hub de tránsito?", options: [{text:"Transportation Cross-Docking (TCD).", correct:true}, {text:"Merchandise Distribution Push.", correct:false}, {text:"Two-Step Replenishment.", correct:false}, {text:"Discrete Cartonization.", correct:false}] },
            { question: "En la industria Retail, cuando un palet del proveedor se recibe y se desagrega inmediatamente en el andén para repartir cajas específicas a 50 tiendas distintas según una tabla de asignación previa, hablamos de:", options: [{text:"Merchandise Distribution (Retail Push/Pull).", correct:true}, {text:"Transportation Cross-Docking.", correct:false}, {text:"Bulk Storage Putaway.", correct:false}, {text:"Physical Inventory Cycle Counting.", correct:false}] },
            { question: "En un escenario de Opportunistic Cross-Docking 'Inbound-Driven', ¿en qué momento exacto intercepta SAP EWM la mercancía?", options: [{text:"Al contabilizar el PGR o al intentar crear la Warehouse Task de Putaway para la entrega entrante.", correct:true}, {text:"Seis meses antes, durante la corrida anual del presupuesto en SAP CO.", correct:false}, {text:"Después de que el palet lleva 15 días almacenado en el High Rack.", correct:false}, {text:"Al emitir la factura fiscal al cliente en la transacción VF01.", correct:false}] },
            { question: "En el Opportunistic Cross-Docking 'Outbound-Driven', ¿qué acción toma SAP EWM al liberar una Ola de salida si detecta que el stock necesario acaba de ser descargado en la zona GR (9010)?", options: [{text:"Cancela la tarea de Putaway pendiente del palet en GR Zone y crea una WT de picking directo hacia la GI Zone (9020).", correct:true}, {text:"Obliga al montacarguista a subir primero el palet al rack alto y bajarlo 5 minutos después.", correct:false}, {text:"Bloquea la Outbound Delivery Order con un error fatal M7 022.", correct:false}, {text:"Borra la Inbound Delivery del sistema ERP.", correct:false}] },
            { question: "Si llega un palet con 100 unidades a la zona de recepción, pero el pedido urgente en Backorder solo requiere 35 unidades, ¿qué ejecuta el motor de Cross-Docking de SAP EWM?", options: [{text:"Un WT Split: genera una WT de 35 unidades hacia GI Staging (Cross-Docking) y otra WT de 65 unidades hacia el rack (Putaway normal).", correct:true}, {text:"Envía las 100 unidades al cliente y le regala las 65 sobrantes.", correct:false}, {text:"Rechaza el Cross-Docking porque las cantidades no coinciden al 100%.", correct:false}, {text:"Envía las 100 unidades al rack y cancela el pedido del cliente.", correct:false}] },
            { question: "¿Qué tabla de base de datos de SAP EWM almacena las Warehouse Tasks abiertas donde se refleja el vínculo operativo del movimiento?", options: [{text:"/SCWM/ORDIM_O", correct:true}, {text:"T001W", correct:false}, {text:"MARA", correct:false}, {text:"BSEG", correct:false}] },
            { question: "¿Qué mecanismo de SAP EWM divide un traslado largo dentro del almacén en sub-tareas pasando por puntos intermedios de transferencia o identificación?", options: [{text:"Layout-Oriented Storage Control (LOSC).", correct:true}, {text:"Valuation Class Determination.", correct:false}, {text:"Batch Input Session (SM35).", correct:false}, {text:"Material Ledger Closing.", correct:false}] },
            { question: "¿Qué significa la sigla MFS dentro de SAP S/4HANA Extended Warehouse Management?", options: [{text:"Material Flow System.", correct:true}, {text:"Master Financial Ledger System.", correct:false}, {text:"Manual Forklift Scheduling.", correct:false}, {text:"Material Forecasting Strategy.", correct:false}] },
            { question: "¿Cuál es la principal revolución arquitectónica de implementar SAP EWM MFS frente a un esquema de automatización tradicional?", options: [{text:"Elimina la capa intermedia de software de terceros (WCS - Warehouse Control System), comunicando a SAP directamente con los PLCs.", correct:true}, {text:"Reemplaza los motores eléctricos de las fajas por operarios con carretillas manuales.", correct:false}, {text:"Elimina la necesidad de usar códigos de barras en los palets.", correct:false}, {text:"Permite llevar la contabilidad sin usar cuentas de mayor (G/L Accounts).", correct:false}] },
            { question: "En las arquitecturas antiguas de 3 capas (ERP/WMS -> WCS -> PLC), ¿qué problema crítico ocurría frecuentemente y se resuelve al usar SAP MFS directo?", options: [{text:"Desincronización de bases de datos (Split-Brain) entre el inventario lógico de SAP y la posición real en el WCS.", correct:true}, {text:"Imposibilidad de crear materiales tipo FERT en la MM01.", correct:false}, {text:"Falta de soporte para monedas extranjeras en las órdenes de compra.", correct:false}, {text:"Bloqueo del módulo de Recursos Humanos.", correct:false}] },
            { question: "¿Qué es un PLC en el contexto de un almacén automatizado conectado a SAP MFS?", options: [{text:"Un Controlador Lógico Programable (computadora industrial de tiempo real que gobierna motores, sensores y grúas).", correct:true}, {text:"Un documento contable de liquidación de fletes.", correct:false}, {text:"El código de barras impreso en la etiqueta del proveedor.", correct:false}, {text:"Un tipo de sociedad financiera en SAP FI.", correct:false}] },
            { question: "En la arquitectura maestra de SAP MFS, ¿qué objeto define la dirección IP, el puerto TCP/IP, el tiempo de espera (Timeout) y las reglas de Handshake con un PLC?", options: [{text:"Communication Channel (Canal de Comunicación).", correct:true}, {text:"Storage Section Indicator.", correct:false}, {text:"Purchasing Organization.", correct:false}, {text:"Putaway Control Indicator (PACI).", correct:false}] },
            { question: "¿Qué representa un 'Communication Point' (CP) o 'Routing Point' dentro de SAP MFS?", options: [{text:"Una posición física en la faja o circuito equipada con escáner/sensor donde el PLC se comunica con SAP para tomar una decisión de ruteo.", correct:true}, {text:"La oficina donde se reúnen los gerentes de logística.", correct:false}, {text:"El servidor de correo electrónico corporativo.", correct:false}, {text:"Un lote de producción vencido en calidad.", correct:false}] },
            { question: "¿A qué entidad maestra del almacén EWM debe mapearse obligatoriamente cada Communication Point (CP) para que el inventario de la HU sea rastreable en cada tramo de la faja?", options: [{text:"A un Storage Bin (Ubicación lógica/técnica).", correct:true}, {text:"A un Company Code distinto.", correct:false}, {text:"A un Vendor Master Record.", correct:false}, {text:"A un Cost Center de Controlling.", correct:false}] },
            { question: "¿Qué objeto maestro de SAP MFS modela el tramo físico de rodillos que conecta un Communication Point A con un Communication Point B?", options: [{text:"Conveyor Segment (Segmento de Transporte).", correct:true}, {text:"Wave Template.", correct:false}, {text:"Account Assignment Category.", correct:false}, {text:"Packing Instruction.", correct:false}] },
            { question: "¿Cómo transmite SAP MFS las instrucciones de movimiento a un PLC industrial a través de la red?", options: [{text:"Mediante 'Telegramas' (cadenas de caracteres ASCII o tramas binarias de estructura fija ultraligera por Sockets TCP/IP).", correct:true}, {text:"Enviando archivos PDF adjuntos por correo SMTP.", correct:false}, {text:"Mediante hojas de cálculo Excel compartidas en red.", correct:false}, {text:"A través de llamadas telefónicas analógicas.", correct:false}] },
            { question: "Dentro de la estructura de un Telegrama MFS, ¿para qué sirve el campo 'Sequence Number' (Número de Secuencia correlativo)?", options: [{text:"Para garantizar el orden de los paquetes y detectar inmediatamente si un mensaje se perdió o duplicó en la red.", correct:true}, {text:"Para indicar el precio unitario del producto en dólares.", correct:false}, {text:"Para definir el número de teléfono del transportista.", correct:false}, {text:"Para calcular el impuesto al valor agregado (IVA).", correct:false}] },
            { question: "Cuando SAP envía un telegrama de acción a un PLC, ¿qué respuesta técnica inmediata exige a nivel de protocolo antes de dar por entregado el paquete?", options: [{text:"Un telegrama de confirmación técnica (Handshake ACK).", correct:true}, {text:"Una firma manuscrita del montacarguista.", correct:false}, {text:"Un documento contable de pago en SAP FI.", correct:false}, {text:"Un reinicio completo del servidor S/4HANA.", correct:false}] },
            { question: "¿Qué sucede en SAP MFS si el PLC no responde con el Handshake 'ACK' dentro del tiempo límite (Timeout) configurado en el Communication Channel?", options: [{text:"SAP retransmite automáticamente el telegrama hasta agotar el número máximo de reintentos y, si persiste, reinicia o marca el canal en error.", correct:true}, {text:"SAP borra definitivamente la Handling Unit y ajusta el inventario a cero.", correct:false}, {text:"SAP ignora el fallo y envía mil telegramas más sin esperar.", correct:false}, {text:"Se desinstala el módulo EWM automáticamente.", correct:false}] },
            { question: "¿Qué tecnología nativa del kernel de SAP S/4HANA permite abrir Sockets TCP/IP directos desde ABAP hacia los PLCs sin requerir servidores intermedios?", options: [{text:"ABAP Push Channels (APC) con soporte nativo de TCP Sockets.", correct:true}, {text:"SAPScript Legacy Printing.", correct:false}, {text:"LSMW (Legacy System Migration Workbench).", correct:false}, {text:"SmartForms.", correct:false}] },
            { question: "¿En qué caso se sigue utilizando el componente 'SAP Plant Connectivity (PCo)' entre SAP EWM MFS y los PLCs?", options: [{text:"Cuando el servidor S/4HANA está en la nube/remoto y se requiere un concentrador local en la planta para traducir Sockets TCP/IP a llamadas RFC seguras.", correct:true}, {text:"Cuando el almacén no tiene ningún equipo automatizado y todo se mueve a mano.", correct:false}, {text:"Únicamente para imprimir etiquetas de precios en tiendas.", correct:false}, {text:"Para liquidar sueldos en SAP HCM.", correct:false}] },
            { question: "Cuando un palet avanza por una faja automatizada gobernada por LOSC, ¿cómo gestiona SAP EWM la Warehouse Task desde el muelle hasta el rack final?", options: [{text:"Mantiene una WT Madre hacia el destino final en espera y va creando/confirmando Sub-WTs tramo por tramo entre cada Communication Point.", correct:true}, {text:"No crea ninguna Warehouse Task hasta que el palet sale vendido un mes después.", correct:false}, {text:"Obliga al operario a confirmar manualmente en su celular cada metro que avanza el rodillo.", correct:false}, {text:"Crea un documento MIGO 101 en cada sensor de la faja.", correct:false}] },
            { question: "¿Qué es un 'I-Point' (Identification Point) al inicio de una línea automatizada MFS?", options: [{text:"Un pórtico de entrada con escáneres láser, báscula y sensores ópticos de gálibo (contorno) que valida la HU antes de inyectarla al sistema ASRS.", correct:true}, {text:"El punto donde los camiones cargan combustible diésel.", correct:false}, {text:"Una transacción de contabilidad general.", correct:false}, {text:"Un almacén externo sin gestión de ubicaciones.", correct:false}] },
            { question: "¿Cómo evita SAP MFS que una faja transportadora colapse por exceso de palets acumulados (Deadlock/Congestión) antes de entrar a un pasillo de grúa?", options: [{text:"Mediante los Capacity Limits configurados en el Communication Point o Conveyor Segment, deteniendo o desviando el envío de nuevas HUs si el buffer está lleno.", correct:true}, {text:"Apagando la electricidad de toda la fábrica cada 10 minutos.", correct:false}, {text:"Aumentando la velocidad de los rodillos a 50 kilómetros por hora.", correct:false}, {text:"Borrando los pedidos de los clientes en SAP SD.", correct:false}] },
            { question: "Si el ramal de entrada al Pasillo 3 ha alcanzado su límite máximo de capacidad (ej. 4 HUs en cola), ¿qué puede hacer SAP MFS con el quinto palet que viene avanzando por la arteria principal?", options: [{text:"Mantenerlo dando una vuelta en el carrusel de recirculación (Loop Conveyor) o retenerlo en el punto previo hasta que se libere un espacio.", correct:true}, {text:"Empujarlo fuera de la faja hacia el piso.", correct:false}, {text:"Facturarlo inmediatamente como pérdida financiera.", correct:false}, {text:"Cambiarle el número de material en la tabla MARA.", correct:false}] },
            { question: "En la operación de transelevadores (grúas ASRS), ¿en qué consiste el 'Dual Command Cycle' (Ciclo Doble) optimizado por SAP MFS?", options: [{text:"En intercalar una tarea de Putaway con una de Picking en el mismo viaje dentro del pasillo, evitando que la grúa regrese vacía (Task Interleaving mecánico).", correct:true}, {text:"En usar dos grúas chocando en el mismo riel para cargar un solo palet ligero.", correct:false}, {text:"En exigir que dos supervisores digiten su contraseña para mover un palet.", correct:false}, {text:"En duplicar el peso contable del material.", correct:false}] },
            { question: "En un rack automatizado 'Multi-Deep' (ej. Doble Profundidad), ¿qué hace SAP MFS automáticamente si necesita extraer el palet del fondo pero hay otro palet bloqueando la posición delantera?", options: [{text:"Genera automáticamente una Warehouse Task previa de reubicación (Stock Rearrangement) para mover el palet delantero a otro hueco vacío del pasillo.", correct:true}, {text:"Cancela el pedido del cliente porque el palet está inaccesible.", correct:false}, {text:"Atraviesa y destruye el palet delantero con la horquilla de la grúa.", correct:false}, {text:"Detiene el PLC en estado de pánico crítico.", correct:false}] },
            { question: "Si un palet pasa por el pórtico láser (I-Point) y una caja rota sobresale 8 cm fuera del perímetro permitido del EuroPalet, ¿qué excepción recibe SAP MFS y cómo actúa?", options: [{text:"Recibe una excepción de contorno/perfil (CONT) y rutea automáticamente la HU hacia el ramal de rechazo/acondicionamiento (Reject Spur).", correct:true}, {text:"Lo mete a la fuerza en el rack de 30 metros de altura ignorando el sensor.", correct:false}, {text:"Genera una orden de compra nueva al proveedor automáticamente.", correct:false}, {text:"Cambia la moneda de la sociedad en la tabla T001.", correct:false}] },
            { question: "¿Qué ocurre si el escáner láser de un Routing Point no logra leer el código de barras SSCC porque la etiqueta se despegó (Excepción NOREAD)?", options: [{text:"SAP MFS desvía la HU con un ID temporal hacia la estación de clearing/excepciones para que un operario la identifique y re-etiquete.", correct:true}, {text:"La faja tritura el palet automáticamente.", correct:false}, {text:"SAP asigna el palet al azar a cualquier cliente.", correct:false}, {text:"Se apaga la base de datos HANA.", correct:false}] },
            { question: "Cuando una grúa ASRS intenta depositar un palet en el Bin 04-08-01 (que figuraba vacío en SAP), pero su sensor óptico detecta que el hueco está físicamente ocupado por un palet fantasma, ¿qué excepción envía el PLC?", options: [{text:"Excepción de Bin Lleno (BINF - Bin Full), tras lo cual SAP bloquea ese Bin y calcula al instante un nuevo Bin destino para que la grúa deposite la carga.", correct:true}, {text:"Excepción de falta de pago del cliente.", correct:false}, {text:"Código de movimiento 102 de reversión de compras.", correct:false}, {text:"Error de sintaxis ABAP en el entorno DEV.", correct:false}] },
            { question: "¿En qué transacción central los consultores y supervisores monitorean el estado de los PLCs, abren/cierran canales TCP/IP y auditan el log de telegramas en vivo?", options: [{text:"/SCWM/MON (bajo el nodo Material Flow System).", correct:true}, {text:"MMBE (Resumen de Stocks IM).", correct:false}, {text:"ME21N (Crear Pedido de Compras).", correct:false}, {text:"VA01 (Crear Pedido de Ventas).", correct:false}] },
            { question: "¿Cuál es la tabla de base de datos de SAP EWM que registra el historial forense (Log) de todos los telegramas enviados y recibidos entre SAP y los PLCs?", options: [{text:"/SCWM/MFSTELELOG", correct:true}, {text:"MARD", correct:false}, {text:"T001L", correct:false}, {text:"EKKO", correct:false}] },
            { question: "¿Qué tabla técnica almacena el estado actual de los Communication Channels (si el Socket está abierto, cerrado o con secuencia desincronizada)?", options: [{text:"/SCWM/MFS_CH", correct:true}, {text:"MARC", correct:false}, {text:"LFA1", correct:false}, {text:"KNA1", correct:false}] },
            { question: "Si después de un mantenimiento eléctrico del PLC los contadores de secuencia de telegramas entre SAP y el PLC quedan desfasados (ej. SAP va por el 500 y el PLC volvió a 001), ¿qué debe hacerse desde el Monitor MFS?", options: [{text:"Detener el canal, ejecutar el reseteo/sincronización de contadores de secuencia del canal y volver a iniciarlo.", correct:true}, {text:"Formatear el servidor de producción PRD.", correct:false}, {text:"Crear un nuevo almacén desde cero en SPRO.", correct:false}, {text:"Hacer un inventario físico anual de todos los racks.", correct:false}] },
            { question: "Si una grúa robótica del Pasillo 2 entra en fallo mecánico y su PLC reporta estado 'Out of Order', ¿cómo protege SAP EWM el cumplimiento de los pedidos de salida?", options: [{text:"Inhabilita el recurso/pasillo afectado y busca stock equivalente en los demás pasillos cuyas grúas siguen operativas.", correct:true}, {text:"Detiene todas las demás grúas del almacén por solidaridad.", correct:false}, {text:"Cancela todas las entregas de salida del mes.", correct:false}, {text:"Cambia el precio estándar de los materiales a cero.", correct:false}] },
            { question: "¿Cómo se denomina la funcionalidad que permite encender visores luminosos digitales directamente en los estantes para indicar al operario la posición y cantidad exacta a recolectar?", options: [{text:"Pick-by-Light (integrado vía MFS o sub-sistemas RF/PLC).", correct:true}, {text:"Post Goods Issue (PGI).", correct:false}, {text:"Invoice Verification (MIRO).", correct:false}, {text:"Automatic Account Determination (OBYC).", correct:false}] },
            { question: "¿Para qué sirve el simulador interno de PLC en SAP EWM antes del lanzamiento a producción (Go-Live)?", options: [{text:"Para emular el envío y recepción de miles de telegramas y validar toda la lógica de ruteo MFS, capacidad y excepciones sin necesitar el hardware físico conectado.", correct:true}, {text:"Para diseñar planos arquitectónicos en 3D con AutoCAD.", correct:false}, {text:"Para calcular la depreciación contable de los montacargas en SAP FI-AA.", correct:false}, {text:"Para entrenar modelos de lenguaje natural.", correct:false}] },
            { question: "En una integración perfecta de Cross-Docking Oportunista con SAP MFS, ¿qué ocurre cuando un palet con Backorder pasa por el escáner I-Point del muelle de entrada?", options: [{text:"SAP contabiliza la entrada, intercepta la HU para Cross-Docking y envía un telegrama al PLC para desviarla por las fajas directo hacia la rampa de salida sin tocar el rack ASRS.", correct:true}, {text:"El palet se guarda obligatoriamente 24 horas en el silo ASRS antes de poder salir.", correct:false}, {text:"El PLC apaga las fajas porque no soporta Cross-Docking.", correct:false}, {text:"El operario debe cargar el palet al hombro hasta el camión de salida.", correct:false}] }
        ]
    },
    {
        id: "s4_l1",
        semester: 4,
        type: "lab",
        title: "4.2 Lab Multi-Paso: Cross-Docking sobre Circuito MFS",
        duration: "2 Horas 30 Min • Simulación Industrial",
        req: "s4_m1",
        description: "Acaba de acoplarse un camión con 100 servidores rackeables. Existe un Backorder crítico de 40 unidades para un Data Center. Debes levantar el canal TCP/IP del PLC, procesar el palet en el I-Point láser, activar la intercepción de Cross-Docking Oportunista y auditar el telegrama que desvía las 40 unidades directo al muelle de salida 9020.",
        simTask: { hint: "Fases: /SCWM/MON -> MFS-START -> /SCWM/PRDI -> PGR -> CD-INTERCEPT -> WT-SPLIT -> TELE-SEND -> ACK-WAIT -> /SCWM/TO_CONF -> PGI." },
        simSteps: [
            { instruction: "Abrir Monitor Central EWM", expectedCmd: "/SCWM/MON", hint: "/SCWM/MON", successMessage: "> Monitor cargado. Nodo Material Flow System desplegado." },
            { instruction: "Iniciar Canal TCP/IP con PLC Siemens", expectedCmd: "MFS-START", hint: "MFS-START", successMessage: "> Socket APC 192.168.10.50:4000 ABIERTO. Handshake OK." },
            { instruction: "Abrir Entrega Entrante (ASN)", expectedCmd: "/SCWM/PRDI", hint: "/SCWM/PRDI", successMessage: "> IBD 180009941 cargada (100 EA Servidores en HU 800091)." },
            { instruction: "Contabilizar Entrada en I-Point", expectedCmd: "PGR", hint: "PGR", successMessage: "> PGR OK. Escáner CP01 leyó SSCC. ¡Alerta Backorder ODO 84001 (40 EA)!" },
            { instruction: "Ejecutar Motor Opportunistic CD", expectedCmd: "CD-INTERCEPT", hint: "CD-INTERCEPT", successMessage: "> Putaway anulado. Intercepción Cross-Docking activada." },
            { instruction: "Dividir Tarea (40 Salida / 60 Rack)", expectedCmd: "WT-SPLIT", hint: "WT-SPLIT", successMessage: "> WT-1 (40 EA -> GI 9020) y WT-2 (60 EA -> ASRS Silo) creadas." },
            { instruction: "Transmitir Telegrama de Desvío al PLC", expectedCmd: "TELE-SEND", hint: "TELE-SEND", successMessage: "> TX: [STX]00891|CHAN01|WT-1|CP01|CP_OUT_9020|ACK[ETX]" },
            { instruction: "Verificar Acuse Técnico del PLC", expectedCmd: "ACK-WAIT", hint: "ACK-WAIT", successMessage: "> RX: Telegrama ACK recibido en 12ms. Desviador neumático activado." },
            { instruction: "Confirmar Llegada a Rampa Outbound", expectedCmd: "/SCWM/TO_CONF", hint: "/SCWM/TO_CONF", successMessage: "> Sensor CP_OUT_9020 confirma llegada física a Staging de Salida." },
            { instruction: "Contabilizar Salida de Mercancía", expectedCmd: "PGI", hint: "PGI", successMessage: "> PGI CONTABILIZADO. Cross-Docking MFS ejecutado en 3 min 40 seg." }
        ]
    }
    ,
    {
        id: "s4_m2",
        semester: 4,
        type: "theory",
        title: "4.3 Ingeniería de Recursos (Resource Management), Task Interleaving y Labor Management",
        duration: "35 Horas • Certificación Optimización Operativa",
        req: "s4_l1",
        description: "Domina la orquestación matemática de la flota de montacargas, operarios pedestres y terminales de Radiofrecuencia (RFUI). Aprende a erradicar los viajes en vacío mediante Task Interleaving, diseñar secuencias de colas dinámicas, modelar redes de distancia (TDC) y medir la productividad al segundo con SAP EWM Labor Management. 15 capítulos profundos y 40 preguntas de certificación.",
        review: "Regla de Oro: Resource Management asigna la Warehouse Order (WO) óptima evaluando Queue Sequence, Bin Access Type, Prioridad de Ejecución y Posición Actual del Recurso. El Task Interleaving alterna una WO de Putaway con una WO de Picking/Replenishment en la misma zona para erradicar el Deadheading (viajes con horquillas vacías).",
        pages: [
            `<h3>Capítulo 1: El Problema Económico del Viaje en Vacío (Deadheading)</h3>
            <p>En un centro de distribución operado de forma tradicional, la flota de montacargas se divide en compartimentos estancos: un grupo de operarios se dedica exclusivamente a guardar palets entrantes (Putaway) y otro grupo se dedica a extraer palets para pedidos de salida (Picking). Analicemos la cinemática de este modelo clásico:</p>
            <ul>
                <li>El Montacargas A toma un palet en el muelle de recepción (Zona 9010), conduce 250 metros hasta el Pasillo 14 Nivel 5, deposita el palet y <strong>regresa los 250 metros con las horquillas completamente vacías</strong> hasta el muelle para buscar otro palet.</li>
                <li>Simultáneamente, el Montacargas B sale vacío desde el muelle de despacho (Zona 9020), conduce los mismos 250 metros hasta el Pasillo 14 Nivel 4, toma un palet para un cliente y regresa cargado al muelle.</li>
            </ul>
            <p>En este escenario sin orquestación algorítmica, <strong>el 50% de los kilómetros recorridos por la flota de montacargas se realiza sin carga útil</strong>. En logística industrial, este fenómeno se denomina <strong>Deadheading (Viaje en Vacío)</strong>. Representa millones de dólares anuales desperdiciados en ciclos de batería de litio, desgaste de llantas de poliuretano, congestión de pasillos y horas-hombre improductivas. El módulo de <strong>Resource Management (RM)</strong> de SAP S/4HANA EWM existe para reducir ese 50% de viaje en vacío a menos del 12%.</p>`,

            `<h3>Capítulo 2: Arquitectura de Resource Management en SAP S/4HANA EWM</h3>
            <p>Para que SAP EWM deje de ser un simple registro contable de ubicaciones y se convierta en un director de orquesta en tiempo real, el sistema modela a cada actor que ejecuta trabajo físico dentro del almacén como un <strong>Recurso (Resource)</strong>. Un Recurso en SAP EWM es la combinación lógica de un vehículo o equipo de manipulación (montacargas retráctil, transpaleta eléctrica, grúa trilateral, carrito de picking manual) y el operario humano que se autentica en él mediante un dispositivo móvil.</p>
            <p>La arquitectura de Resource Management descansa sobre cuatro pilares configurables en SPRO y datos maestros:</p>
            <ol>
                <li><strong>Resource Type (Tipo de Recurso):</strong> Clasifica las capacidades físicas y mecánicas de la máquina (velocidad horizontal, velocidad de elevación vertical, peso máximo soportado y tipo de acceso a estanterías).</li>
                <li><strong>Resource Queue (Cola de Trabajo):</strong> Agrupación lógica de órdenes de almacén (Warehouse Orders - WOs) según su área de actividad de origen, área de destino y proceso logístico.</li>
                <li><strong>Resource Group (Grupo de Recursos):</strong> Define a qué colas de trabajo tiene permitido acceder un conjunto de montacargas y en qué orden de prioridad (Queue Sequence).</li>
                <li><strong>Execution Priorities (Prioridades de Ejecución):</strong> Ponderación matemática que determina qué tarea es más urgente dentro de una misma cola.</li>
            </ol>`,

            `<h3>Capítulo 3: Resource Types, Velocidad y Restricciones Dimensionales (Bin Access Types)</h3>
            <p>Imagina el caos operativo si SAP enviara a un operario que camina a pie con una carretilla hidráulica manual a extraer un palet situado a <strong>11 metros de altura</strong> en el nivel 6 de un rack selectivo, o si enviara a un montacargas contrabalanceado gigante a un pasillo ultra-angosto (VNA - Very Narrow Aisle) donde físicamente no cabe y derribaría la estantería.</p>
            <p>SAP EWM previene este error físico cruzando dos parámetros maestros críticos antes de asignar cualquier trabajo:</p>
            <ul>
                <li><strong>Bin Access Type (Tipo de Acceso a Ubicación):</strong> Es un atributo que se asigna a cada Storage Bin en el dato maestro (<code>/SCWM/LS01</code> o carga masiva). Por ejemplo: <code>BA01</code> = Nivel de Piso (accesible a pie), <code>BA02</code> = Rack Medio hasta 4 metros (apilador eléctrico), <code>BA03</code> = Gran Altura hasta 14 metros (montacargas retráctil Reach Truck), <code>BA04</code> = Pasillo VNA con cable guía.</li>
                <li><strong>Handling Unit Type Group (Grupo de Tipo de HU):</strong> Define qué tipos de contenedores puede levantar la horquilla del recurso (ej. EuroPalet, Tambor Químico, Caja suelta, Bobina de acero).</li>
            </ul>
            <p>En la configuración del <strong>Resource Type</strong>, el consultor declara exactamente qué combinación de <em>Bin Access Types</em> y <em>HU Type Groups</em> soporta ese vehículo, además de su velocidad media en metros por segundo (ej. <code>2.5 m/s</code>). Si una Warehouse Order involucra un Bin con acceso <code>BA03</code>, un operario logueado con un recurso que solo tiene permiso <code>BA01</code> jamás verá esa tarea en su pantalla RF.</p>`,

            `<h3>Capítulo 4: Ingeniería de Colas de Trabajo (Resource Queues y Queue Determination)</h3>
            <p>Una <strong>Resource Queue (Cola de Recursos)</strong> es el buzón virtual donde caen las Warehouse Orders (WOs) recién creadas esperando a que un operario las tome y ejecute. En un almacén bien diseñado en SAP EWM, las colas nunca se crean al azar; responden a una matriz determinista llamada <strong>Queue Determination Criteria</strong>.</p>
            <p>Cuando SAP EWM crea una Warehouse Order (por ejemplo, al liberar una Ola o contabilizar un PGR), el sistema consulta la tabla de determinación de colas evaluando cinco variables clave de la tarea:</p>
            <ul>
                <li><strong>1. Source Activity Area (Área de Actividad Origen):</strong> ¿En qué zona nace el movimiento? (Ej. <code>GR01</code> Zona de Recepción).</li>
                <li><strong>2. Destination Activity Area (Área de Actividad Destino):</strong> ¿Hacia qué zona va la carga? (Ej. <code>RACK</code> Estantería Alta o <code>GI01</code> Zona de Despacho).</li>
                <li><strong>3. Bin Access Type:</strong> ¿Qué tipo de máquina requiere la ubicación?</li>
                <li><strong>4. Warehouse Process Type (WPT):</strong> ¿Cuál es la naturaleza del movimiento? (Ej. <code>1010</code> Putaway, <code>2010</code> Picking, <code>3010</code> Replenishment).</li>
                <li><strong>5. Activity (Actividad):</strong> <code>PUTA</code> (Guardar), <code>PICK</code> (Extraer), <code>internal</code> (Movimiento interno), <code>INVE</code> (Conteo físico).</li>
            </ul>
            <p>Por ejemplo: <em>Origen = GR01 + Destino = RACK + WPT = 1010 -> Asignar automáticamente a la Cola <code>Q_INB_PUTAWAY</code></em>.</p>`,

            `<h3>Capítulo 5: Grupos de Recursos y Secuencias de Colas (Queue Sequences)</h3>
            <p>Si un montacarguista estuviera atado de forma rígida a una sola cola (por ejemplo, solo a la cola <code>Q_PASILLO_01</code>), en el momento en que se acaben las tareas del Pasillo 1 el operario se quedaría de brazos cruzados mirando su pantalla vacía, mientras en el Pasillo 2 hay 80 tareas atrasadas a punto de perder la hora de corte del camión.</p>
            <p>Para dotar de elasticidad a la plantilla laboral, SAP EWM utiliza los <strong>Resource Groups (Grupos de Recursos)</strong> y las <strong>Queue Sequences (Secuencias de Colas)</strong> mantenidas en la transacción <code>/SCWM/QSEQ</code>:</p>
            <ul>
                <li>Al Recurso <code>FORK_01</code> no se le asigna una cola única, sino que se le vincula al Grupo de Recursos <code>RG_ZONA_NORTE</code>.</li>
                <li>El Grupo <code>RG_ZONA_NORTE</code> tiene configurada una secuencia ordenada de búsqueda:
                    <br><strong>Prioridad 1:</strong> Cola <code>Q_INB_URGENTE</code> (Descargas prioritarias).
                    <br><strong>Prioridad 2:</strong> Cola <code>Q_REPLENISH_NORTE</code> (Reabastecimientos de piso).
                    <br><strong>Prioridad 3:</strong> Cola <code>Q_PICK_NORTE</code> (Picking general).
                    <br><strong>Prioridad 4:</strong> Cola <code>Q_PICK_SUR</code> (Apoyo solidario a la zona vecina si todo el Norte está limpio).</li>
            </ul>
            <p>De esta manera, SAP busca trabajo en la Prioridad 1; solo cuando esa cola tiene 0 tareas disponibles, salta en milisegundos a buscar en la Prioridad 2, garantizando ocupación continua del 100% durante todo el turno.</p>`,

            `<h3>Capítulo 6: Modos de Procesamiento: System-Guided vs Semi-System-Guided vs Manual</h3>
            <p>Cuando un operario sostiene la pistola de Radiofrecuencia (RFUI), SAP EWM permite tres filosofías operativas para entregarle su trabajo:</p>
            <ul>
                <li><strong>1. System-Guided Processing (Guiado por el Sistema - Recomendado Enterprise):</strong> El operario no elige qué hacer. Pulsa "Ejecutar Guiado por Sistema" y el motor algorítmico de SAP selecciona la mejor Warehouse Order disponible y la proyecta directamente en pantalla. Elimina el vicio del <em>"Cherry-Picking"</em> (donde los operarios escogen las tareas fáciles o cercanas al baño y dejan las pesadas para el turno nocturno).</li>
                <li><strong>2. Semi-System-Guided Processing (Semi-Guiado por Cola):</strong> Se utiliza cuando hay varias órdenes de trabajo apiladas físicamente sin un orden previsible (por ejemplo, 30 palets mezclados en el muelle de recepción). El operario elige o escanea cualquier HU física que tiene frente a él en la cola, y a partir de ese escaneo el sistema toma el control guiándolo hacia el Bin destino.</li>
                <li><strong>3. Manual Selection (Por Solicitud Directa de WO/HU):</strong> El operario digita o escanea manualmente el código de barras de una hoja de picking impresa o el número exacto de una Warehouse Order. Se reserva únicamente para supervisores, auditorías o contingencias.</li>
            </ul>`,

            `<h3>Capítulo 7: El Algoritmo Matemático de Selección de Warehouse Orders (WO Prioritization)</h3>
            <p>Supongamos que en la Cola <code>Q_PICK_NORTE</code> hay 50 Warehouse Orders abiertas esperando ser ejecutadas y el montacargas <code>FORK_01</code> acaba de quedar libre. ¿Cómo decide SAP EWM cuál de esas 50 órdenes enviarle primero en modo <em>System-Guided</em>? El motor calcula en tiempo real un puntaje de prioridad combinando tres factores:</p>
            <ol>
                <li><strong>Execution Priority Weighting (Peso de Prioridad de Origen):</strong> Combina la prioridad del tipo de proceso (WPT), la prioridad del tipo de ubicación y la prioridad comercial del cliente en la Outbound Delivery Order.</li>
                <li><strong>Latest Starting Date / Time (LSD - Fecha/Hora Límite de Inicio):</strong> SAP calcula hacia atrás a partir de la hora de salida del camión (Wave Cutoff / Departure Time) restando el tiempo estimado de carga, empaque y duración de la tarea. A medida que el reloj actual se acerca al <strong>LSD</strong> de una Warehouse Order, su urgencia sube exponencialmente para evitar que el camión salga incompleto.</li>
                <li><strong>Posición Actual del Recurso (Last Known Bin):</strong> SAP guarda en la tabla de estado del recurso cuál fue el último Storage Bin donde ese montacargas confirmó su tarea anterior. Entre dos WOs de igual urgencia, SAP elige aquella cuyo primer Bin de origen esté a menor distancia física de la ubicación actual del montacargas.</li>
            </ol>`,

            `<h3>Capítulo 8: Task Interleaving (Entrelazado de Tareas): El Santo Grial de la Eficiencia</h3>
            <p>Llegamos a la cúspide de la optimización operativa en SAP S/4HANA EWM: el <strong>Task Interleaving (Entrelazado de Tareas)</strong>. Como estudiamos en el Capítulo 1, el peor enemigo de la rentabilidad es el <em>Deadheading</em> (regresar vacío al muelle después de guardar un palet). El Task Interleaving erradica este fenómeno unificando los ciclos de entrada y salida en un bucle continuo.</p>
            <p>Veamos cómo opera un ciclo con <strong>Task Interleaving Activo</strong>:</p>
            <ol>
                <li>El montacargas <code>FORK_01</code> está en el muelle de entrada (Zona 9010). El sistema mira su secuencia de colas y le asigna una tarea de la <strong>Cola 1: Putaway (<code>Q_PUTAWAY</code>)</strong>.</li>
                <li>El operario toma el Palet Entrante X, viaja al Pasillo 8, Ubicación <code>08-15-03</code>, lo deposita en el rack y escanea el código de confirmación en su terminal RF.</li>
                <li>En ese exacto milisegundo, el sistema sabe que <code>FORK_01</code> se encuentra detenido en las coordenadas del Pasillo 8 (<code>08-15-03</code>) con las horquillas vacías.</li>
                <li>En lugar de buscar otra tarea en la Cola 1 (que lo obligaría a viajar vacío de vuelta al muelle 9010), <strong>el algoritmo de Task Interleaving salta forzosamente a la Cola 2: Picking o Replenishment (<code>Q_PICKING</code>)</strong> y busca la Warehouse Order de extracción cuyo Bin de origen esté más cerca de <code>08-15-03</code>.</li>
                <li>SAP encuentra una tarea de Picking en <code>08-16-01</code> (a solo 3 metros de distancia). El operario se mueve 3 metros, extrae el Palet Saliente Y y viaja cargado hacia el muelle de despacho (Zona 9020). ¡Cero metros recorridos en vacío!</li>
            </ol>`,

            `<h3>Capítulo 9: Configuración Técnica del Task Interleaving y Radios de Búsqueda</h3>
            <p>Como arquitecto de sistemas, no basta con entender el concepto: debes saber cómo se parametriza en SPRO y en las transacciones maestras de SAP EWM para que el entrelazado no genere efectos secundarios indeseados:</p>
            <ul>
                <li><strong>Activación en la Queue Sequence (<code>/SCWM/QSEQ</code>):</strong> Dentro de la secuencia de colas asignada al Resource Group, existe una casilla de verificación (Flag) llamada <strong><code>Interleaving</code> (Entrelazado activo)</strong> por cada cola. Si marcas con este flag la cola <code>Q_PUTAWAY</code> y la cola <code>Q_PICKING</code>, cuando el recurso termine una WO de <code>Q_PUTAWAY</code>, el sistema no volverá a leer <code>Q_PUTAWAY</code> en el siguiente ciclo, sino que pasará obligatoriamente a evaluar <code>Q_PICKING</code>.</li>
                <li><strong>Radio Máximo de Búsqueda (Maximum Travel Distance for Interleaving):</strong> ¿Qué ocurre si el montacargas termina un Putaway en el Pasillo 1 (extremo norte), y la única tarea de Picking disponible en toda la bodega está en el Pasillo 50 (a 800 metros en el extremo sur)? Si el sistema lo obligara a cruzar 800 metros vacío para hacer ese picking, el remedio sería peor que la enfermedad. Por ello, en SAP se configura un <strong>Radio Máximo de Distancia</strong>: si no existe ninguna tarea de Picking dentro de un radio cercano (ej. 60 metros) respecto a la ubicación actual del montacargas, SAP aborta el Interleaving en ese ciclo o busca en la siguiente cola cercana.</li>
            </ul>`,

            `<h3>Capítulo 10: Arquitectura del Radio Frequency Framework (/SCWM/RFUI) y Logical Transactions</h3>
            <p>El 95% de los operarios de un almacén jamás ven la interfaz gráfica de escritorio de SAP (SAP GUI ni Fiori Launchpad de oficina). Ellos interactúan con el sistema a través del <strong>RF Framework (Transacción <code>/SCWM/RFUI</code>)</strong>, renderizado en terminales portátiles robustas (Zebra, Honeywell), tablets montadas en el chasis del montacargas (Vehicle-Mounted Terminals) o lectores de anillo en el dedo, frecuentemente conectados mediante <strong>SAP ITSmobile</strong> (que convierte pantallas ABAP en HTML ligero para navegadores industriales).</p>
            <p>A diferencia de SAP ERP clásico, donde cada pantalla era un programa rígido, el <strong>RF Framework de EWM</strong> separa completamente la lógica de negocio de la visualización mediante tres capas arquitectónicas:</p>
            <ul>
                <li><strong>Logical Transaction (Transacción Lógica):</strong> Es el proceso funcional sin pantalla (ej. <code>PIIN</code> para Picking por WR, <code>PUHU</code> para Putaway por HU). Controla el flujo de pasos (Step Flow).</li>
                <li><strong>Function Module (Módulos de Función ABAP):</strong> Bloques de código que se ejecutan al pulsar <em>Enter</em> en cada paso (PBO - Process Before Output para preparar los datos en pantalla, y PAI - Process After Input para validar lo que escaneó el operario).</li>
                <li><strong>Subscreens y Dynpros Técnicas:</strong> Las plantillas visuales que se adaptan al tamaño en píxeles o líneas de caracteres (ej. formato <code>8x40</code> o <code>16x20</code>) del dispositivo físico.</li>
            </ul>`,

            `<h3>Capítulo 11: Personalización de Pantallas RF, Perfiles de Presentación y Campos de Verificación</h3>
            <p>En la vida real, cada cliente corporativo exige adaptar las pantallas de sus pistolas RF: ocultar campos irrelevantes, agregar el logo o cambiar el orden de escaneo sin romper el estándar de SAP. Esto se logra en el Customizing mediante el <strong>RF Screen Manager (<code>/SCWM/RFSCR</code>)</strong> manejando dos perfiles maestros:</p>
            <ul>
                <li><strong>Presentation Profile (Perfil de Presentación):</strong> Agrupa las características de la interfaz general y el menú de botones asignado a un tipo de almacén o grupo de usuarios.</li>
                <li><strong>Personalization Profile (Perfil de Personalización):</strong> Permite clonar una pantalla estándar a una sub-pantalla personalizada (en el rango de cliente <code>9000</code>), mover botones de función (<code>F1</code> a <code>F12</code>), o fusionar dos pasos de confirmación en uno solo sin tocar el motor estándar de SAP.</li>
            </ul>
            <p>Además, para garantizar <strong>Cero Errores Humanos</strong>, SAP EWM utiliza los <strong>Verification Profiles (Perfiles de Verificación)</strong> y el campo <strong>Check Digit (Dígito Verificador del Bin)</strong>: cuando el operario llega al Bin <code>05-10-02</code>, el sistema no le pide que escriba "05-10-02" de memoria, sino que lo obliga a disparar el láser contra un código de barras único pegado en la viga metálica del estante. Si el código escaneado no coincide al 100% con el Bin o con la HU solicitada, la pistola emite un pitido grave de error y bloquea la confirmación.</p>`,

            `<h3>Capítulo 12: Cálculo de Distancias de Viaje (Travel Distance Calculation - TDC) y Redes Viales</h3>
            <p>Para que SAP EWM pueda saber exactamente cuántos metros debe recorrer un montacargas entre el Bin A y el Bin B (indispensable tanto para el <em>Task Interleaving</em> como para <em>Labor Management</em>), el sistema no puede calcular una simple línea recta diagonal (Distancia Euclidiana $\\sqrt{\\Delta X^2 + \\Delta Y^2}$), ¡porque los montacargas no pueden atravesar las estanterías de acero como fantasmas!</p>
            <p>SAP EWM resuelve esto mediante el motor de <strong>Travel Distance Calculation (TDC - Cálculo de Distancia de Viaje)</strong>:</p>
            <ul>
                <li><strong>Coordenadas X, Y, Z en el Maestro de Bins:</strong> Cada ubicación del almacén tiene cargadas sus coordenadas métricas exactas en el plano cartesiano del edificio.</li>
                <li><strong>Distancia Manhattan vs Red Vial (Storage Type Specific Networks):</strong> Dentro de un mismo pasillo, el sistema calcula el desplazamiento longitudinal más la elevación vertical del mástil. Para moverse del Pasillo 2 al Pasillo 9, SAP modela una <strong>Red de Nodos y Arcos (Edges & Nodes)</strong> que representa los pasillos transversales de circulación, definiendo si un pasillo es de doble vía o de <strong>Un Solo Sentido (One-Way Aisle)</strong>.</li>
                <li><strong>Algoritmo de Dijkstra en HANA:</strong> Al evaluar qué tarea asignar o cuánto tiempo debe tardar un operario, SAP ejecuta el algoritmo de ruta más corta sobre la red de pasillos permitidos, obteniendo la distancia real al centímetro.</li>
            </ul>`,

            `<h3>Capítulo 13: Introducción a SAP EWM Labor Management (LM) y Tiempos Estándar (ELS)</h3>
            <p>¿Cómo sabe un Director de Operaciones si el operario Juan Pérez, que hoy movió 120 palets, fue más productivo que María Gómez, que movió 95 palets? Si Juan movió 120 palets que estaban a 5 metros de la puerta, y María movió 95 palets subiendo a 14 metros de altura en el fondo de la bodega, ¡en realidad María trabajó mucho mejor que Juan! Medir solo "bultos por hora" es injusto e inexacto.</p>
            <p>El módulo <strong>SAP EWM Labor Management (LM)</strong> elimina la subjetividad aplicando la ingeniería industrial de <strong>Engineered Labor Standards (ELS - Estándares de Trabajo de Ingeniería)</strong> para calcular el <strong>Planned Duration (Tiempo Planificado Exacto)</strong> de cada tarea individual:</p>
            <ul>
                <li><strong>Fórmulas Basadas en MTM (Methods-Time Measurement):</strong> SAP divide la tarea en micro-movimientos: <em>Tiempo de aceleración del montacargas + (Distancia TDC / Velocidad del Resource Type) + Tiempo de elevación de horquillas a altura Z + Tiempo de lectura de escáner + Tiempo por peso/volumen de cajas recolectadas</em>.</li>
                <li><strong>BRFplus (Business Rule Framework plus) o Fórmulas de Condición:</strong> El sistema calcula automáticamente que la Warehouse Order #500124 debe tomar exactamente <strong>4 minutos y 18 segundos</strong> en condiciones normales, teniendo en cuenta las curvas, el peso y la altura real de ese movimiento específico.</li>
            </ul>`,

            `<h3>Capítulo 14: Documentos de Carga de Trabajo (Executed Workload) e Integración con RRHH/Bonos</h3>
            <p>En <strong>Labor Management</strong>, toda la actividad diaria del personal se divide y audita en dos categorías que se registran mediante el procesador (<strong>Processor / Business Partner del Operario</strong>):</p>
            <ul>
                <li><strong>1. Direct Labor (Trabajo Directo):</strong> Todo movimiento rastreado automáticamente por el sistema al confirmar Warehouse Orders (Putaway, Picking, Replenishment, Conteo Físico). Al cerrarse la WO, SAP genera un registro en firme llamado <strong>Executed Workload (Carga de Trabajo Ejecutada)</strong> comparando el <em>Tiempo Planificado (ej. 4.5 min)</em> contra el <em>Tiempo Real Cronometrado (ej. 4.1 min)</em>.</li>
                <li><strong>2. Indirect Labor (Trabajo Indirecto):</strong> Actividades necesarias que no mueven stock en el sistema, tales como limpiar el pasillo, cambiar la batería del montacargas, asistir a una charla de seguridad o envolver un palet con plástico film a mano. El operario registra el inicio y fin de estas tareas en su pistola RF para que ese tiempo no penalice su índice de eficiencia.</li>
            </ul>
            <p>Al finalizar la semana o el mes, estos registros de eficiencia (por ejemplo: <em>Eficiencia de María = 112% sobre el estándar ELS</em>) se transmiten vía interfaz estándar hacia <strong>SAP HCM (Human Capital Management) o SuccessFactors</strong> para liquidar de forma transparente y auditable los bonos salariales de productividad variable.</p>`,

            `<h3>Capítulo 15: Tablas Core SQL de Recursos y Gestión de Crisis en Vivo (/SCWM/MON)</h3>
            <p>Para cerrar el Semestre 4 como un verdadero Arquitecto Senior de SAP S/4HANA EWM, debes dominar las tablas de base de datos donde reside la inteligencia de recursos y las herramientas de intervención en vivo ante emergencias operativas:</p>
            <ul>
                <li><strong>Tabla <code>/SCWM/RSRC</code>:</strong> Maestro y estado en vivo de todos los Recursos (indica qué usuario está logueado, en qué cola activa está, cuál es su última ubicación conocida y qué Warehouse Order tiene bloqueada actualmente).</li>
                <li><strong>Tabla <code>/SCWM/QUEUE</code> y <code>/SCWM/QSEQ</code>:</strong> Definición de colas y secuencias de asignación por grupo.</li>
                <li><strong>Tabla <code>/SCWM/WHO</code>:</strong> Cabecera de las Warehouse Orders (contiene el campo <code>QUEUE</code>, el <code>RSRC</code> asignado, el estado de ejecución y el <code>LSD</code> - Latest Starting Date).</li>
                <li><strong>Tabla <code>/SCWM/EXCLD</code>:</strong> Almacena los documentos de <em>Executed Workload</em> de Labor Management con los tiempos planificados y reales.</li>
            </ul>
            <p><strong>Intervención de Crisis en <code>/SCWM/MON</code>:</strong> Si un montacarguista sufre un desmayo o la batería de su equipo muere a mitad de un pasillo dejando una Warehouse Order urgente "En Proceso" (bloqueada bajo su usuario), ningún otro operario podría tomarla. En segundos, el supervisor entra a <code>/SCWM/MON</code> -> nodo <em>Resource Management</em> -> ejecuta el método <strong>"Forzar Cierre de Sesión / Desasignar WO del Recurso"</strong> y cambia dinámicamente el grupo de colas de otros 3 montacargas para absorber la sobrecarga del pasillo afectado sin perder el corte de facturación.</p>`
        ],
        exam: [
            { question: "En la ingeniería de almacenes, ¿qué significa exactamente el término 'Deadheading' que SAP EWM Resource Management busca erradicar?", options: [{text:"El desplazamiento de un montacargas u operario viajando con las horquillas vacías (sin carga útil) entre una tarea y la siguiente.", correct:true}, {text:"Un bloqueo de base de datos SQL en el servidor HANA.", correct:false}, {text:"La pérdida de señal Wi-Fi en las antenas del techo de la bodega.", correct:false}, {text:"El vencimiento de la fecha de caducidad (SLED) de un lote farmacéutico.", correct:false}] },
            { question: "En un almacén tradicional sin Task Interleaving donde los equipos de Putaway y Picking trabajan separados, ¿qué porcentaje aproximado de la distancia recorrida corresponde a viajes en vacío?", options: [{text:"Aproximadamente el 50% de los recorridos se realiza en vacío.", correct:true}, {text:"Exactamente el 0%, porque nunca viajan vacíos.", correct:false}, {text:"Menos del 1% del recorrido total.", correct:false}, {text:"El 100%, ya que los montacargas nunca mueven palets.", correct:false}] },
            { question: "Dentro de la arquitectura de SAP S/4HANA EWM, ¿qué representa la entidad maestra 'Resource' (Recurso)?", options: [{text:"El vehículo de manipulación o equipo ejecutor (montacargas, apilador, operario pedestre) que se autentica en RF para procesar Warehouse Orders.", correct:true}, {text:"Una cuenta contable del Balance General en SAP FI.", correct:false}, {text:"Un proveedor extranjero de materias primas en la tabla LFA1.", correct:false}, {text:"Una orden de compra bloqueada por estrategia de liberación.", correct:false}] },
            { question: "¿En qué objeto de configuración se definen la velocidad media de desplazamiento horizontal y las restricciones físicas de un tipo de montacargas?", options: [{text:"En el Resource Type (Tipo de Recurso).", correct:true}, {text:"En el Company Code (Sociedad Financiera).", correct:false}, {text:"En la Purchasing Organization.", correct:false}, {text:"En el Billing Type de SAP SD.", correct:false}] },
            { question: "¿Cómo evita SAP EWM asignar una tarea ubicada en el nivel 7 de un rack (a 12 metros de altura) a un operario que conduce una transpaleta eléctrica de piso?", options: [{text:"Mediante la validación cruzada del 'Bin Access Type' (Tipo de Acceso a Ubicación) del Bin contra los accesos permitidos del Resource Type.", correct:true}, {text:"Enviando un correo electrónico de advertencia al gerente financiero.", correct:false}, {text:"Bloqueando el código de material en la transacción MM01.", correct:false}, {text:"Cambiando el precio estándar del producto a precio variable.", correct:false}] },
            { question: "Además del Bin Access Type, ¿qué otro parámetro físico valida el Resource Type para asegurar que las horquillas del equipo puedan levantar un contenedor específico?", options: [{text:"El Handling Unit Type Group (Grupo de Tipo de HU).", correct:true}, {text:"El grupo de vendedores de SAP SD.", correct:false}, {text:"El plan de cuentas corporativo (Chart of Accounts).", correct:false}, {text:"El código postal del cliente final.", correct:false}] },
            { question: "¿Qué es una 'Resource Queue' (Cola de Recursos) en SAP EWM?", options: [{text:"Un buzón lógico donde se agrupan y encolan las Warehouse Orders (WOs) pendientes según sus áreas de actividad y proceso para ser tomadas por los recursos.", correct:true}, {text:"Una fila física de camiones esperando en la calle afuera de la planta.", correct:false}, {text:"Una cola de impresión de facturas láser en la oficina administrativa.", correct:false}, {text:"Un lote de productos rechazados por control de calidad.", correct:false}] },
            { question: "¿Cuáles son las cinco variables estándar que evalúa la matriz de 'Queue Determination Criteria' para decidir a qué cola enviar una Warehouse Order recién creada?", options: [{text:"Source Activity Area, Destination Activity Area, Bin Access Type, Warehouse Process Type (WPT) y Activity.", correct:true}, {text:"Sociedad, Centro de Costo, Moneda, Idioma y País del Proveedor.", correct:false}, {text:"Peso neto, color del empaque, marca comercial, descuento e IVA.", correct:false}, {text:"Nombre del chofer, placa del camión, aseguradora, peajes y combustible.", correct:false}] },
            { question: "¿Qué problema operativo ocurre si asignamos un montacargas de forma fija a una única cola sin usar un Resource Group ni Queue Sequence?", options: [{text:"Cuando esa cola específica se queda sin tareas, el operario queda ocioso sin recibir trabajo aunque existan urgencias en colas vecinas.", correct:true}, {text:"El servidor SAP S/4HANA se reinicia automáticamente.", correct:false}, {text:"Se borra el inventario de la tabla LQUA.", correct:false}, {text:"La pistola de radiofrecuencia se desconfigura permanentemente.", correct:false}] },
            { question: "¿Qué transacción de SAP EWM permite definir y mantener la secuencia priorizada de colas (Queue Sequence) para un Resource Group?", options: [{text:"/SCWM/QSEQ", correct:true}, {text:"MIGO", correct:false}, {text:"MM02", correct:false}, {text:"VA02", correct:false}] },
            { question: "Si un Resource Group tiene configuradas 3 colas en secuencia (Prioridad 1: Q_URG, Prioridad 2: Q_REPL, Prioridad 3: Q_PICK), ¿cuándo buscará SAP tareas en la cola Q_REPL?", options: [{text:"Únicamente cuando no existan tareas ejecutables disponibles en la cola de Prioridad 1 (Q_URG) o según las reglas de alternancia de Interleaving.", correct:true}, {text:"Solo los días domingos por la noche.", correct:false}, {text:"Nunca, porque el sistema solo lee la primera línea de la tabla.", correct:false}, {text:"Al azar mediante una lotería informática.", correct:false}] },
            { question: "En la operación con terminales RF, ¿qué significa el modo de trabajo 'System-Guided Processing' (Guiado por el Sistema)?", options: [{text:"El algoritmo de SAP selecciona y empuja automáticamente la Warehouse Order óptima a la pantalla del operario, impidiendo que él elija tareas a conveniencia (Cherry-Picking).", correct:true}, {text:"El operario camina libremente sin pistola RF y anota lo que mueve en una libreta de papel.", correct:false}, {text:"Un robot humanoide conduce el montacargas sin ningún ser humano en la planta.", correct:false}, {text:"El departamento de contabilidad dicta por teléfono cada movimiento.", correct:false}] },
            { question: "¿En qué escenario operativo resulta ideal utilizar el modo 'Semi-System-Guided Processing'?", options: [{text:"En un muelle de descarga abarrotado donde hay decenas de palets acumulados y el operario escanea la HU que tiene físicamente más a mano para que luego el sistema lo guíe al Bin destino.", correct:true}, {text:"Cuando el almacén está completamente vacío y cerrado por vacaciones.", correct:false}, {text:"Durante el cierre fiscal anual del Balance General.", correct:false}, {text:"Para crear nuevos códigos de materiales terminados.", correct:false}] },
            { question: "¿Qué significa el vicio operativo conocido como 'Cherry-Picking' en un almacén sin asignación guiada por sistema?", options: [{text:"Cuando los operarios seleccionan manualmente de una lista solo las órdenes fáciles, ligeras o cercanas y postergan las tareas pesadas o lejanas.", correct:true}, {text:"La cosecha agrícola de frutas en el campo.", correct:false}, {text:"Un método contable de valoración de divisas.", correct:false}, {text:"La rotura de una tarima de madera en el rack.", correct:false}] },
            { question: "Dentro de una misma cola de trabajo, ¿qué significa el parámetro 'LSD' (Latest Starting Date / Time) de una Warehouse Order?", options: [{text:"La hora límite máxima en la que debe comenzar a ejecutarse esa Warehouse Order para no retrasar la salida del camión o el corte de la Ola.", correct:true}, {text:"La fecha en que se fundó la empresa propietaria del almacén.", correct:false}, {text:"El último día del año fiscal contable.", correct:false}, {text:"La fecha de fabricación del montacargas eléctrico.", correct:false}] },
            { question: "¿Cómo influye la 'Posición Actual del Recurso' (Last Known Bin) en el algoritmo de selección de la siguiente Warehouse Order?", options: [{text:"Entre tareas urgentes elegibles, el sistema prioriza aquella cuyo Bin de inicio esté físicamente más cerca de la ubicación donde el montacargas acaba de confirmar su tarea previa.", correct:true}, {text:"Obliga al montacargas a regresar siempre al estacionamiento de baterías después de cada palet.", correct:false}, {text:"No tiene ninguna influencia; SAP ignora las distancias físicas.", correct:false}, {text:"Bloquea al operario si intenta moverse a otro pasillo.", correct:false}] },
            { question: "¿Cuál es la definición técnica exacta de 'Task Interleaving' (Entrelazado de Tareas) en SAP S/4HANA EWM?", options: [{text:"La alternancia algorítmica entre una tarea de entrada/guardado (ej. Putaway) y una tarea de extracción cercana (ej. Picking/Replenishment) para que el montacargas trabaje en doble ciclo sin regresar vacío.", correct:true}, {text:"La fusión de dos sociedades financieras en un mismo mandante.", correct:false}, {text:"El conteo físico de un mismo Bin por dos auditores al mismo tiempo.", correct:false}, {text:"La impresión simultánea de facturas y remitos en la puerta de despacho.", correct:false}] },
            { question: "¿Dónde se activa técnicamente el indicador (Flag) para que una cola participe en el ciclo de Task Interleaving?", options: [{text:"En la definición de la secuencia de colas (Queue Sequence - /SCWM/QSEQ) del Resource Group.", correct:true}, {text:"En la vista de Contabilidad 1 del Maestro de Materiales (MM01).", correct:false}, {text:"En los datos maestros del cliente (BP).", correct:false}, {text:"En la configuración de monedas de SAP FI.", correct:false}] },
            { question: "¿Por qué es crítico configurar un 'Radio Máximo de Búsqueda' (Maximum Travel Distance) al activar Task Interleaving?", options: [{text:"Para evitar que el sistema obligue a un montacargas que terminó un Putaway en el Pasillo 1 a viajar 900 metros vacío hasta el otro extremo de la bodega solo por forzar un Picking lejano.", correct:true}, {text:"Para limitar el alcance de la señal Bluetooth de los auriculares del operario.", correct:false}, {text:"Para impedir que el montacargas salga a la autopista pública.", correct:false}, {text:"Para reducir el tamaño de la base de datos SQL.", correct:false}] },
            { question: "Si un montacargas con Task Interleaving activo termina un Putaway en el Pasillo 5, pero no existe ninguna tarea de Picking dentro del radio máximo permitido (ej. 50 metros), ¿qué hace SAP EWM?", options: [{text:"Omite el entrelazado forzado en esa ocasión y busca la siguiente tarea óptima disponible según la secuencia de colas para no hacerle perder tiempo en un cruce absurdo.", correct:true}, {text:"Apaga el motor del montacargas de forma remota y bloquea al usuario.", correct:false}, {text:"Crea un pedido de venta falso en el Pasillo 5.", correct:false}, {text:"Genera un error ABAP Short Dump (ST22).", correct:false}] },
            { question: "¿Cuál es el código de transacción estándar para lanzar el entorno de simulación y ejecución de Radiofrecuencia en SAP EWM?", options: [{text:"/SCWM/RFUI", correct:true}, {text:"/SCWM/PRDO", correct:false}, {text:"VL01N", correct:false}, {text:"ME23N", correct:false}] },
            { question: "¿Qué tecnología de servidor integrada en SAP permite publicar las pantallas del RF Framework como páginas HTML ultraligeras para los navegadores industriales de las pistolas Zebra o Honeywell?", options: [{text:"SAP ITSmobile (Internet Transaction Server Mobile).", correct:true}, {text:"SAP Crystal Reports.", correct:false}, {text:"Adobe Document Services (ADS).", correct:false}, {text:"SAP BusinessObjects Lumira.", correct:false}] },
            { question: "En la arquitectura interna del RF Framework de SAP EWM, ¿qué elemento gobierna el flujo de pasos funcionales (Step Flow) independientemente del tamaño de la pantalla física?", options: [{text:"La Logical Transaction (Transacción Lógica).", correct:true}, {text:"El hoja de estilos CSS del navegador.", correct:false}, {text:"El número de serie de la batería de la pistola.", correct:false}, {text:"La tabla de tipos de cambio TCURR.", correct:false}] },
            { question: "Cuando un operario escanea un código de barras en la pistola RF y presiona Enter, ¿en qué momento de programación ABAP se ejecutan los módulos de función que validan si el dato escaneado es correcto?", options: [{text:"En el evento PAI (Process After Input).", correct:true}, {text:"En el evento PBO (Process Before Output) antes de mostrar la pantalla inicial.", correct:false}, {text:"Un mes después durante el cierre contable.", correct:false}, {text:"Al instalar el sistema operativo Windows.", correct:false}] },
            { question: "¿Qué herramienta de configuración de SAP EWM permite clonar pantallas RF al rango de cliente (9000), ocultar campos o reubicar teclas de función sin modificar el código fuente estándar?", options: [{text:"El RF Screen Manager (/SCWM/RFSCR) utilizando un Personalization Profile.", correct:true}, {text:"La transacción MIGO.", correct:false}, {text:"El generador de balances financieros F.01.", correct:false}, {text:"El maestro de lotes MSC1N.", correct:false}] },
            { question: "¿Para qué sirve configurar un 'Verification Profile' y un 'Check Digit' (código verificador) en las ubicaciones físicas para la operación RF?", options: [{text:"Para obligar al operario a escanear físicamente la etiqueta pegada en la viga del Bin, garantizando que realmente se encuentra frente al estante correcto y no digitando de memoria.", correct:true}, {text:"Para encriptar la contraseña del gerente general.", correct:false}, {text:"Para calcular el peso bruto del camión en la báscula de entrada.", correct:false}, {text:"Para traducir el menú del español al alemán.", correct:false}] },
            { question: "Si durante un picking en /SCWM/RFUI la etiqueta de la caja está manchada y no se puede escanear, o falta stock en el Bin, ¿qué debe ingresar el operario en la pantalla RF?", options: [{text:"Un Exception Code (Código de Excepción RF, como BIDF o SPLT) habilitado para ese paso de la transacción lógica.", correct:true}, {text:"Apagar la pistola quitándole la batería en silencio.", correct:false}, {text:"Inventar un código de barras escribiendo números al azar.", correct:false}, {text:"Entrar a SPRO desde la pistola y borrar el almacén.", correct:false}] },
            { question: "¿Por qué el motor de 'Travel Distance Calculation' (TDC) de SAP EWM NO utiliza una línea recta diagonal simple (Euclidiana) entre el Bin A y el Bin B?", options: [{text:"Porque en un almacén físico los montacargas no pueden atravesar las estanterías metálicas; deben circular por pasillos y cruces definidos (Distancia Manhattan / Red Vial).", correct:true}, {text:"Porque el procesador de SAP S/4HANA no sabe calcular raíces cuadradas.", correct:false}, {text:"Porque la Tierra es curva en distancias de 10 metros.", correct:false}, {text:"Porque las baterías de litio solo funcionan en línea recta.", correct:false}] },
            { question: "¿Qué datos maestros deben cargarse obligatoriamente en los Storage Bins para que el motor TDC pueda calcular las distancias de desplazamiento y elevación?", options: [{text:"Las coordenadas espaciales X (largo), Y (ancho) y Z (altura) medidas en la unidad métrica del almacén.", correct:true}, {text:"El precio de compra del estante metálico y su proveedor.", correct:false}, {text:"El color de la pintura epóxica del piso.", correct:false}, {text:"El nombre del arquitecto que construyó el techo.", correct:false}] },
            { question: "¿Cómo modela SAP EWM TDC las reglas de tránsito cuando un almacén tiene pasillos estrechos de 'Un Solo Sentido' (One-Way Aisles) donde está prohibido girar en U?", options: [{text:"Mediante una Red Vial específica (Edges & Nodes / Arcos dirigidos) donde cada tramo tiene dirección permitida y puntos de entrada/salida.", correct:true}, {text:"No lo soporta; asume que todos los montacargas vuelan por el aire.", correct:false}, {text:"Bloqueando todas las órdenes de venta del sistema.", correct:false}, {text:"Cambiando la unidad de medida base del material a kilómetros.", correct:false}] },
            { question: "¿Qué algoritmo matemático clásico de grafos utiliza internamente SAP EWM sobre la red de nodos y pasillos para hallar la ruta más corta entre dos ubicaciones?", options: [{text:"El algoritmo de ruta más corta de Dijkstra (o variantes de búsqueda heurística sobre grafos dirigidos).", correct:true}, {text:"El método contable de amortización lineal.", correct:false}, {text:"La transformada rápida de Fourier para audio.", correct:false}, {text:"El método de regresión logística de ventas.", correct:false}] },
            { question: "¿Por qué medir la productividad de los operarios contando únicamente 'cajas o palets movidos por hora' sin usar SAP Labor Management es técnicamente erróneo?", options: [{text:"Porque castiga injustamente al operario que realiza movimientos largos, a gran altura o de productos pesados frente al que mueve cajas ligeras al lado del muelle.", correct:true}, {text:"Porque en SAP está prohibido contar palets.", correct:false}, {text:"Porque las cajas no tienen código de barras.", correct:false}, {text:"Porque los montacargas no tienen reloj interno.", correct:false}] },
            { question: "¿Qué significan las siglas 'ELS' dentro del módulo SAP EWM Labor Management?", options: [{text:"Engineered Labor Standards (Estándares de Trabajo de Ingeniería para calcular el tiempo objetivo justo de cada tarea).", correct:true}, {text:"Enterprise Logistics Server.", correct:false}, {text:"External Labeling System.", correct:false}, {text:"Emergency Lift Shutdown.", correct:false}] },
            { question: "¿Qué herramienta de reglas de negocio integrada en SAP S/4HANA utiliza Labor Management para evaluar fórmulas complejas de tiempo (distancia + altura + peso + tipo de envase)?", options: [{text:"BRFplus (Business Rule Framework plus) y fórmulas de condición de tiempos estándar.", correct:true}, {text:"SAP GUI Logon Pad.", correct:false}, {text:"Batch Input Recorder (SHDB).", correct:false}, {text:"Transport Management System (STMS).", correct:false}] },
            { question: "En SAP Labor Management, ¿cuál es la diferencia entre 'Direct Labor' (Trabajo Directo) e 'Indirect Labor' (Trabajo Indirecto)?", options: [{text:"Direct Labor son tareas operativas rastreadas por WOs (Picking, Putaway); Indirect Labor son actividades de soporte sin movimiento de stock (limpieza, cambio de batería, reuniones).", correct:true}, {text:"Direct Labor lo hacen los gerentes e Indirect Labor lo hacen los proveedores externos.", correct:false}, {text:"Direct Labor se paga en dólares e Indirect Labor no se paga.", correct:false}, {text:"Son exactamente lo mismo en la base de datos.", correct:false}] },
            { question: "Cuando un operario confirma una Warehouse Order en RF con Labor Management activo, ¿qué documento técnico se genera automáticamente para registrar su tiempo planificado versus su tiempo real?", options: [{text:"Un registro de 'Executed Workload' (Carga de Trabajo Ejecutada) en la tabla /SCWM/EXCLD.", correct:true}, {text:"Una factura de proveedor en la tabla RBKP.", correct:false}, {text:"Un asiento contable en la tabla ACDOCA.", correct:false}, {text:"Una orden de transporte de código ABAP en la tabla E070.", correct:false}] },
            { question: "¿Con qué módulo de Recursos Humanos se integra SAP EWM Labor Management para enviar los porcentajes de eficiencia y liquidar bonos e incentivos en la nómina?", options: [{text:"SAP HCM (Human Capital Management) / SAP SuccessFactors.", correct:true}, {text:"SAP Plant Maintenance (PM).", correct:false}, {text:"SAP Real Estate Management (RE-FX).", correct:false}, {text:"SAP Environment, Health and Safety (EHS).", correct:false}] },
            { question: "¿Cuál es la tabla SQL maestra y de estado en tiempo real donde SAP EWM guarda qué usuario está logueado en cada Recurso, su última ubicación y su cola actual?", options: [{text:"/SCWM/RSRC", correct:true}, {text:"MARA", correct:false}, {text:"T001", correct:false}, {text:"VBAK", correct:false}] },
            { question: "¿En qué tabla de base de datos de SAP EWM se almacena la cabecera de las Warehouse Orders (incluyendo a qué Queue y a qué Resource están asignadas)?", options: [{text:"/SCWM/WHO", correct:true}, {text:"MARD", correct:false}, {text:"EKPO", correct:false}, {text:"LIKP", correct:false}] },
            { question: "Si un montacarguista sufre una avería mecánica a mitad del pasillo dejando una Warehouse Order urgente tomada bajo su sesión RF, ¿qué acción ejecuta el supervisor en /SCWM/MON?", options: [{text:"Entra al nodo Resource Management, fuerza el cierre de sesión o desasigna la WO del recurso averiado para liberarla de inmediato a la cola de los demás montacargas.", correct:true}, {text:"Espera 3 días hasta que el taller mecánico repare el montacargas sin tocar el sistema.", correct:false}, {text:"Elimina el almacén completo desde SPRO.", correct:false}, {text:"Realiza una reversión MIGO 102 de todas las compras del año.", correct:false}] }
        ]
    },
    {
        id: "s4_l2",
        semester: 4,
        type: "lab",
        title: "4.4 Lab Multi-Paso: Task Interleaving y Auditoría de Flota RF",
        duration: "2 Horas 30 Min • Optimización Maestra",
        req: "s4_m2",
        description: "La flota de montacargas retráctiles presenta un 48% de viajes en vacío (Deadheading). Configura el recurso FORK-01, activa el flag de Task Interleaving en la secuencia de colas (/SCWM/QSEQ), ejecuta el ciclo doble en el emulador /SCWM/RFUI (Putaway en Pasillo 04 seguido de Picking automático a 3 metros) y audita el documento Executed Workload en el Monitor.",
        simTask: { hint: "Fases: SPRO -> /SCWM/RSRC -> /SCWM/QSEQ -> INTERLEAVE-ACT -> /SCWM/RFUI -> LOGIN-FORK01 -> PUTAWAY-CONF -> AUTO-PICK-WO -> PICK-CONF -> /SCWM/MON-KPI." },
        simSteps: [
            { instruction: "Abrir IMG de Resource Management", expectedCmd: "SPRO", hint: "SPRO", successMessage: "> Nodos de Resource Management y Labor Management cargados." },
            { instruction: "Configurar Maestro de Recurso Retráctil", expectedCmd: "/SCWM/RSRC", hint: "/SCWM/RSRC", successMessage: "> Recurso FORK-01 (Tipo RT_HIGH, Vel 2.5 m/s, Acceso BA03) creado." },
            { instruction: "Abrir Secuencia de Colas por Grupo", expectedCmd: "/SCWM/QSEQ", hint: "/SCWM/QSEQ", successMessage: "> Grupo RG_ALTURA abierto: Prioridad 1 Q_PUTAWAY, Prioridad 2 Q_PICKING." },
            { instruction: "Activar Flag de Task Interleaving y Radio 50m", expectedCmd: "INTERLEAVE-ACT", hint: "INTERLEAVE-ACT", successMessage: "> Flag Interleaving = X activado entre Q_PUTAWAY y Q_PICKING. Radio TDC: 50m." },
            { instruction: "Lanzar Terminal de Radiofrecuencia", expectedCmd: "/SCWM/RFUI", hint: "/SCWM/RFUI", successMessage: "> Pantalla ITSmobile 16x20 iniciada." },
            { instruction: "Autenticar Operario en Montacargas FORK-01", expectedCmd: "LOGIN-FORK01", hint: "LOGIN-FORK01", successMessage: "> Sesión activa en FORK-01. Modo: System-Guided Processing." },
            { instruction: "Confirmar Putaway en Pasillo 04 Bin 04-10-02", expectedCmd: "PUTAWAY-CONF", hint: "PUTAWAY-CONF", successMessage: "> WO 600011 confirmada. Ubicación actual del recurso: 04-10-02." },
            { instruction: "Solicitar Siguiente Tarea (Motor Interleaving)", expectedCmd: "AUTO-PICK-WO", hint: "AUTO-PICK-WO", successMessage: "> ¡INTERLEAVING EJECUTADO! Salto a Q_PICKING: WO 700089 asignada en Bin 04-11-01 (a 2.8m)." },
            { instruction: "Confirmar Extracción y Entrega en GI Zone 9020", expectedCmd: "PICK-CONF", hint: "PICK-CONF", successMessage: "> Picking confirmado en 9020. Viaje en vacío: 0%. Doble ciclo completado." },
            { instruction: "Auditar Eficiencia ELS y Executed Workload", expectedCmd: "/SCWM/MON-KPI", hint: "/SCWM/MON-KPI", successMessage: "> Tabla /SCWM/EXCLD actualizada: Eficiencia ELS 108.4%. SEMESTRE 4 COMPLETADO." }
        ]
    }
,
    // ==========================================
    // SEMESTRE 5 - INTEGRACIÓN DE PRODUCCIÓN (PP) Y CALIDAD (QM)
    // ==========================================
    {
        id: "s5_m1",
        semester: 5,
        type: "theory",
        title: "5.1 Integración Avanzada de Producción (PP-EWM)",
        duration: "40 Horas • Arquitectura de Manufactura",
        req: "s4_l2",
        description: "El puente entre la logística pura y la manufactura industrial. Aprende a sincronizar SAP EWM con SAP PP (Production Planning) y sistemas MES para abastecer líneas de ensamblaje mediante Production Material Requests (PMRs), ciclos de control Kanban y backflushing en tiempo real. 15 capítulos profundos y 40 preguntas de certificación.",
        review: "Regla de Oro: En SAP EWM avanzado ya no usamos Outbound Deliveries para abastecer producción. Usamos el documento nativo PMR (Production Material Request) que lee directamente los componentes de la Orden de Fabricación (CO01) y calcula el Staging exacto hacia el PSA (Production Supply Area) sin duplicar documentos financieros.",
        pages: [
            `<h3>Capítulo 1: La Frontera entre el Almacén y la Fábrica</h3>
            <p>El almacén logístico resguarda el inventario, pero la planta de manufactura lo consume. La sincronización entre EWM y PP es vital.</p>
            <details>
                <summary>Ver explicación a fondo (El Cuello de Botella Industrial)</summary>
                <div class="details-content">
                    <p>Si la línea de ensamblaje automotriz pide 50 motores y el almacén demora 20 minutos en enviarlos, la línea se detiene (Downtime). Cada minuto de línea parada cuesta miles de dólares. La integración <strong>PP-EWM (Production Planning - Extended Warehouse Management)</strong> automatiza el suministro de componentes justo a tiempo (JIT) hacia los estantes de la fábrica, leyendo la lista de materiales (BOM) de la Orden de Producción.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Production Supply Area (PSA)</h3>
            <p>El PSA es la zona de estanterías físicas ubicada a escasos metros de la máquina de producción.</p>
            <details>
                <summary>Ver explicación a fondo (Mapeo Logístico del PSA)</summary>
                <div class="details-content">
                    <p>En SAP, el <strong>PSA (Área de Suministro de Producción)</strong> es el punto de encuentro entre PP y EWM. En el ERP (PP), el PSA es un dato maestro (PK05). En EWM, ese mismo PSA se mapea a un Storage Bin físico específico (ej. <code>BIN-LINEA-01</code>). EWM envía la mercancía desde el rack general de reserva hasta este Bin del PSA, y desde ahí la máquina "jala" el componente para consumirlo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: El Documento PMR (Production Material Request)</h3>
            <p>El documento nativo de S/4HANA EWM para abastecimiento de producción. Sustituye a las entregas de salida.</p>
            <details>
                <summary>Ver explicación a fondo (Evolución Arquitectónica)</summary>
                <div class="details-content">
                    <p>Históricamente (SAP WM), abastecer a producción requería crear una Delivery en el ERP, lo que inflaba la base de datos de LIKP/LIPS. S/4HANA introdujo el <strong>PMR</strong>. Al liberar una Orden de Producción (CO02), el ERP envía una señal a EWM. EWM crea un PMR localmente que consolida todos los componentes requeridos, simplificando el modelo de datos y permitiendo el Staging dinámico.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Tipos de Suministro: Pick Parts vs Crate Parts</h3>
            <p>No todos los componentes se abastecen igual. ¿Necesitas piezas exactas o canastillas completas?</p>
            <details>
                <summary>Ver explicación a fondo (Staging Indicators)</summary>
                <div class="details-content">
                    <p><strong>Pick Parts:</strong> Abastecimiento exacto. Si la orden dice 14 tuercas, EWM te hace extraer 14 tuercas. <strong>Crate Parts (Cajas Completas):</strong> Típico para tornillería a granel. Aunque la orden pida 14 tuercas, el sistema te obliga a bajar un palet o caja completa de 1,000 unidades al PSA para que la máquina tome lo que necesite, devolviendo el sobrante a fin de mes.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Release Order Parts (Componentes de Orden de Liberación)</h3>
            <p>Se usan cuando múltiples órdenes de producción consumen el mismo componente continuamente durante el día.</p>
            <details>
                <summary>Ver explicación a fondo (Agrupación de Demanda)</summary>
                <div class="details-content">
                    <p>Si fabricas 10 modelos de computadoras y todos usan el mismo microprocesador, hacer Pick Parts crearía 10 tareas de almacén al mismo pasillo. <strong>Release Order Parts</strong> suma la cantidad de procesadores de las 10 órdenes y crea un solo gran PMR consolidado. El montacarguista hace un solo viaje con 500 procesadores al PSA de la línea de ensamblaje.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Integración con Kanban de SAP PP</h3>
            <p>Filosofía Toyota. Un recipiente vacío es la señal visual y lógica para que el almacén lo rellene.</p>
            <details>
                <summary>Ver explicación a fondo (Señal de Tarjeta - Kanban)</summary>
                <div class="details-content">
                    <p>En el tablero Kanban (PK13N), la máquina tiene dos cajas de etiquetas. Cuando la máquina vacía la Caja 1, el operario escanea el código de barras Kanban cambiándolo a estado <code>EMPTY</code> (Rojo). Esto dispara instantáneamente una Warehouse Task en EWM. El montacargas llena la caja y al depositarla en el PSA, la tarjeta cambia automáticamente a estado <code>FULL</code> (Verde).</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Control Cycles (Ciclos de Control - LSK)</h3>
            <p>El dato maestro que une al Material, al Centro, al PSA y define cómo se abastecerá (Kanban, PMR, WM).</p>
            <details>
                <summary>Ver explicación a fondo (Transacción LPK1)</summary>
                <div class="details-content">
                    <p>Sin <strong>Control Cycles</strong>, el ERP no sabe hablar con EWM sobre manufactura. En S/4HANA (Transacción LSK o LPK1), defines para cada SKU cómo viaja hacia cada línea de producción. Defines el <em>Staging Indicator</em> (ej. "3" para Pick Parts) y el Bin de EWM destino. Es la matriz de enrutamiento industrial.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Proceso de Staging en EWM (/SCWM/STAGE)</h3>
            <p>La consola de control donde el supervisor de almacén decide cuándo y cómo surtir a la fábrica.</p>
            <details>
                <summary>Ver explicación a fondo (Planificación de Desplazamiento)</summary>
                <div class="details-content">
                    <p>El planificador entra a <code>/SCWM/STAGE</code>, visualiza todos los PMRs activos y los agrupa. No se envía todo al mismo tiempo para no saturar físicamente la fábrica. El sistema verifica el <em>Capacity Check</em> del PSA (para no mandar 10 palets si el PSA solo tiene espacio para 2) y crea las Warehouse Tasks escalonadas hacia los montacargas.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Consumo de Materiales (Backflushing)</h3>
            <p>Cuando la máquina consume el material, el inventario debe desaparecer en SAP y generar un cargo contable.</p>
            <details>
                <summary>Ver explicación a fondo (Deducción Retrospectiva)</summary>
                <div class="details-content">
                    <p>El <strong>Backflush (Movimiento 261)</strong> es el consumo automático. Cuando el operario de la máquina reporta en PP que fabricó 1 Televisor (Movimiento 101), SAP PP lee la receta (BOM) y automáticamente da de baja (deduce) 1 Pantalla y 2 Bocinas del Bin del PSA en EWM. No se escanea el consumo componente por componente; se asume matemáticamente.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Recepción de Producto Terminado (Inbound from Production)</h3>
            <p>El televisor ya está ensamblado. Ahora debe viajar de la fábrica hacia el rack de Producto Terminado del almacén.</p>
            <details>
                <summary>Ver explicación a fondo (Expected Goods Receipt EWM-PP)</summary>
                <div class="details-content">
                    <p>Al final de la línea hay una empacadora. Cuando se arma el EuroPalet con 20 televisores, se le imprime un SSCC y se declara la entrada (MIGO 101) contra la Orden de Producción. Esto genera automáticamente una <strong>Inbound Delivery</strong> en EWM. El montacargas escanea el SSCC en la zona de producción y el algoritmo PACI/STSS le dice en qué rack guardarlo.</p>
                </div>
            </details>`,

            `<h3>Capítulo 11: Limpieza del PSA (Clear PSA)</h3>
            <p>Finaliza la producción y quedan tornillos sobrantes en la línea. Deben volver a la bodega principal.</p>
            <details>
                <summary>Ver explicación a fondo (Transacción /SCWM/CLEAR_PSA)</summary>
                <div class="details-content">
                    <p>Si la fábrica operó con <em>Crate Parts</em>, sobrarán componentes en el piso de planta. Usando la transacción <code>/SCWM/CLEAR_PSA</code>, el sistema escanea todos los PSA buscando stock que no tiene órdenes de producción activas vinculadas, y genera tareas automáticas de <strong>Putaway de Retorno</strong> hacia la zona de reserva, manteniendo el piso de planta despejado.</p>
                </div>
            </details>`,

            `<h3>Capítulo 12: Co-Products y By-Products (Subproductos)</h3>
            <p>En industrias químicas o lácteas, al fabricar el Producto A, inevitablemente sale un Producto B (ej. Suero de leche).</p>
            <details>
                <summary>Ver explicación a fondo (Movimiento 531)</summary>
                <div class="details-content">
                    <p>Un <strong>Co-Product</strong> tiene valor comercial (se vende); un <strong>By-Product</strong> suele ser merma o requerir reproceso. En ambos casos, PP genera una recepción automática con movimiento 531 en EWM. EWM debe tener configuradas estrategias de almacenamiento (Putaway) específicas para aislar estos subproductos, frecuentemente en silos de tanques líquidos.</p>
                </div>
            </details>`,

            `<h3>Capítulo 13: Determinación de Lotes (Batch Determination) en Producción</h3>
            <p>Asegurar que la fábrica consuma los ingredientes más próximos a vencer (FEFO) para minimizar mermas.</p>
            <details>
                <summary>Ver explicación a fondo (Integración BMBC y EWM)</summary>
                <div class="details-content">
                    <p>La <strong>Determinación de Lotes</strong> puede ocurrir en ERP (PP) o directamente en EWM. La best-practice recomienda hacerla en EWM durante la creación de la Warehouse Task de Staging. EWM evalúa la condición FEFO y busca en el rack el ingrediente activo más viejo, asegurando que la orden de producción se alimente con componentes a punto de expirar.</p>
                </div>
            </details>`,

            `<h3>Capítulo 14: Nested HUs (Unidades de Manipulación Anidadas) en Producción</h3>
            <p>Abastecer kits pre-armados. Una caja grande que contiene 4 cajitas más pequeñas, cada una con código de barras.</p>
            <details>
                <summary>Ver explicación a fondo (Multilevel Packing)</summary>
                <div class="details-content">
                    <p>La manufactura automotriz o aeroespacial utiliza carritos de kitting. EWM arma un carrito (HU Madre) que contiene gavetas (HUs Hijas). EWM mueve la HU Madre completa hacia la línea de ensamblaje (PSA). Al consumir, PP hace backflush leyendo directamente los componentes dentro de las HUs Hijas anidadas de forma transparente.</p>
                </div>
            </details>`,

            `<h3>Capítulo 15: Integración MES (Manufacturing Execution Systems)</h3>
            <p>Cuando SAP no opera solo. El almacén habla con EWM y la fábrica con un software MES de terceros (Siemens, Rockwell).</p>
            <details>
                <summary>Ver explicación a fondo (Arquitectura SAP MII / PCo)</summary>
                <div class="details-content">
                    <p>Las fábricas ultramodernas usan un MES para controlar los robots soldadores. La integración <strong>S/4HANA EWM <-> MES</strong> se realiza vía APIs (OData, SOAP) intermediadas por SAP MII (Manufacturing Integration and Intelligence) o PCo. El MES envía un mensaje de "Máquina lista para lote 2"; SAP MII lo traduce a EWM, quien lanza la grúa MFS para entregar el palet en el robot.</p>
                </div>
            </details>`
        ],
        exam: [
            { question: "¿Cuál es el principal documento operativo introducido en SAP S/4HANA EWM diseñado exclusivamente para gestionar el abastecimiento de componentes a las órdenes de producción sin generar entregas de salida masivas?", options: [{text:"Production Material Request (PMR).", correct:true}, {text:"Outbound Delivery Order (ODO).", correct:false}, {text:"Material Document (MIGO).", correct:false}, {text:"Kanban Control Card.", correct:false}] },
            { question: "En el contexto de la integración EWM-PP, ¿qué significa la sigla PSA?", options: [{text:"Production Supply Area (Área de Suministro de Producción / Estanterías físicas junto a la máquina).", correct:true}, {text:"Process Sequence Algorithm.", correct:false}, {text:"Plant Security Agreement.", correct:false}, {text:"Putaway Strategy Assessment.", correct:false}] },
            { question: "¿Qué indicador de Staging (Staging Indicator) se utiliza cuando el sistema EWM extrae la cantidad exacta de piezas requeridas por la orden de producción sin sobrar un solo tornillo?", options: [{text:"Pick Parts (Piezas de Selección Exacta).", correct:true}, {text:"Crate Parts.", correct:false}, {text:"Bulk Materials.", correct:false}, {text:"Release Order Parts.", correct:false}] },
            { question: "¿Qué indicador de Staging fuerza al sistema a abastecer un palet o caja completa (Ej. 1,000 unidades) al piso de producción independientemente de que la orden exija una cantidad menor?", options: [{text:"Crate Parts (Cajas Completas).", correct:true}, {text:"Pick Parts.", correct:false}, {text:"By-Products.", correct:false}, {text:"Direct Consumption.", correct:false}] },
            { question: "Si fabricas 20 órdenes de producción distintas en el día que consumen la misma materia prima de alta rotación, ¿qué estrategia de Staging agrupa las 20 necesidades en un solo requerimiento acumulado de transporte hacia el PSA?", options: [{text:"Release Order Parts (Componentes de Orden de Liberación).", correct:true}, {text:"Pick Parts.", correct:false}, {text:"Discrete Cartonization.", correct:false}, {text:"Task Interleaving.", correct:false}] },
            { question: "¿Qué dato maestro de SAP vincula al Material, el Centro y el PSA para dictaminar la estrategia de reabastecimiento (ej. si debe usarse EWM, Kanban o WM clásico)?", options: [{text:"Control Cycles (Ciclos de Control).", correct:true}, {text:"Purchasing Info Record.", correct:false}, {text:"Sales Area Data.", correct:false}, {text:"Valuation Class.", correct:false}] },
            { question: "En la integración Kanban con EWM, ¿qué evento del mundo físico detona de manera automática e instantánea la creación de una Warehouse Task de reabastecimiento hacia el montacargas?", options: [{text:"El escaneo o cambio de estado de la tarjeta Kanban a 'EMPTY' (Vacío) en el área de producción.", correct:true}, {text:"La impresión de una factura de cliente.", correct:false}, {text:"El pago mensual de la nómina de empleados.", correct:false}, {text:"El inicio de sesión del Gerente en el Fiori Launchpad.", correct:false}] },
            { question: "Dentro del flujo de SAP, ¿qué significa el concepto de 'Backflushing' en manufactura?", options: [{text:"La deducción (consumo) automática y retroactiva de los componentes del inventario en el PSA basándose en la declaración de producto terminado y la Lista de Materiales (BOM).", correct:true}, {text:"Limpiar la fábrica con mangueras de agua a presión al terminar el turno.", correct:false}, {text:"Revertir una factura de proveedor por error de precios.", correct:false}, {text:"Eliminar los lotes caducados de la base de datos SQL.", correct:false}] },
            { question: "Cuando finaliza el ensamblaje de un televisor y se empaca en la línea de producción, ¿qué proceso detona SAP para ingresarlo al almacén general de reserva de EWM?", options: [{text:"Genera una Inbound Delivery desde Producción (movimiento 101 contra la Orden de Producción) permitiendo su Putaway guiado en EWM.", correct:true}, {text:"Se emite directamente la factura al cliente final.", correct:false}, {text:"Se borra la Orden de Producción del sistema.", correct:false}, {text:"Se lanza un Wave Release de salida.", correct:false}] },
            { question: "¿Qué transacción especializada utiliza el supervisor de almacén en EWM para agrupar PMRs, verificar capacidades de planta y crear las órdenes de trabajo escalonadas hacia los montacargas para abastecer a la fábrica?", options: [{text:"/SCWM/STAGE (Consola de Staging).", correct:true}, {text:"MMBE.", correct:false}, {text:"ME21N.", correct:false}, {text:"VK11.", correct:false}] },
            { question: "¿Para qué sirve el proceso y transacción 'Clear PSA' (/SCWM/CLEAR_PSA) en SAP EWM?", options: [{text:"Para limpiar los remanentes del piso de fábrica, identificando stock en el PSA que ya no tiene órdenes activas y generando WTs de retorno hacia el rack de reserva.", correct:true}, {text:"Para eliminar el historial de auditoría de los usuarios antiguos.", correct:false}, {text:"Para reiniciar el servidor SAP S/4HANA por memoria llena.", correct:false}, {text:"Para archivar los clientes que no han comprado en 3 años.", correct:false}] },
            { question: "En un proceso de refinería, al procesar petróleo (Producto Principal) se obtiene alquitrán que requiere tratamiento (Subproducto o By-Product). ¿Qué tipo de movimiento y acción detona en SAP EWM?", options: [{text:"Movimiento 531 (Entrada de By-Product), detonando una recepción automática y un Putaway hacia silos o zonas de almacenamiento designadas.", correct:true}, {text:"Movimiento 601 de Venta directa al cliente.", correct:false}, {text:"Movimiento 102 de anulación de compras.", correct:false}, {text:"Un Short Dump de sistema porque EWM no soporta líquidos.", correct:false}] },
            { question: "¿Dónde recomienda la arquitectura de best-practices de SAP S/4HANA realizar la Determinación de Lotes (Batch Determination - FEFO) para componentes de fabricación?", options: [{text:"En EWM, directamente durante la creación de la Warehouse Task de Staging, para que el algoritmo busque físicamente en el rack el ingrediente más viejo disponible.", correct:true}, {text:"En Finanzas, durante el cálculo de la depreciación anual.", correct:false}, {text:"Un mes después de haber consumido los materiales.", correct:false}, {text:"En Recursos Humanos, cruzado con la fecha de nacimiento del operario.", correct:false}] },
            { question: "¿Qué estructura lógica de EWM se utiliza para gestionar 'Kits de ensamblaje' o carritos donde una caja grande contiene 10 cajitas independientes escaneables?", options: [{text:"Nested Handling Units (HUs Anidadas / Empaque Multinivel).", correct:true}, {text:"Cross-Company Code Stock Transfers.", correct:false}, {text:"Material Ledgers.", correct:false}, {text:"Profitability Analysis (CO-PA).", correct:false}] },
            { question: "En una arquitectura industrial automatizada, ¿qué siglas recibe el software de piso de fábrica (terceros) que interactúa con robots y habla con SAP EWM a través de SAP MII/PCo?", options: [{text:"MES (Manufacturing Execution System).", correct:true}, {text:"CRM (Customer Relationship Management).", correct:false}, {text:"SRM (Supplier Relationship Management).", correct:false}, {text:"BW (Business Warehouse).", correct:false}] },
            { question: "En un ambiente integrado EWM-PP, si el inventario financiero de SAP ERP no concuerda con el físico reportado por el PSA en EWM, ¿cuál suele ser la causa más común?", options: [{text:"Consumos reales de la máquina que no fueron reportados vía Backflushing, o mermas de producción no declaradas en el ERP.", correct:true}, {text:"Hackers internacionales atacando la base de datos.", correct:false}, {text:"Un error en el servidor de correos Exchange.", correct:false}, {text:"Que el material está configurado como Servicio (DIEN) y no como Producto.", correct:false}] },
            { question: "¿Es posible configurar SAP EWM para que abastezca una línea de producción sin que exista una Orden de Producción (CO01) previa en el ERP?", options: [{text:"No, en el modelo de PMR avanzado la Orden de Producción u Orden de Proceso es el requisito mandatorio del cual EWM extrae la lista de requerimientos (BOM).", correct:true}, {text:"Sí, EWM adivina lo que la fábrica necesita mágicamente.", correct:false}, {text:"Sí, usando una Orden de Venta estándar (VA01) directamente.", correct:false}, {text:"Depende de la fase lunar.", correct:false}] },
            { question: "Un 'Storage Bin' asignado a un PSA (Production Supply Area) logísticamente pertenece a:", options: [{text:"EWM (Se parametriza en la estructura del Warehouse Number para tener trazabilidad 3D del piso de fábrica).", correct:true}, {text:"FI (Finanzas).", correct:false}, {text:"HCM (Recursos Humanos).", correct:false}, {text:"QM (Calidad).", correct:false}] },
            { question: "¿Qué sucede si una Warehouse Task de abastecimiento (Staging) sufre una excepción BIDF (Bin Denied / Rack Vacío) durante su recolección?", options: [{text:"EWM lanza el manejo de excepciones, bloquea el rack vacío y recalcula el STSS para buscar el componente en otro rack y evitar parar la línea de producción.", correct:true}, {text:"La Orden de Producción se borra irreversiblemente de SAP.", correct:false}, {text:"El cliente recibe un correo de que su pedido fue cancelado.", correct:false}, {text:"El montacargas se bloquea con clave.", correct:false}] },
            { question: "¿Cuál es el principal beneficio de cambiar la antigua logística WM basada en Outbound Deliveries por la nueva integración PP-EWM basada en PMRs?", options: [{text:"Evita la generación de miles de documentos de entrega (Deliveries) redundantes en el ERP, reduciendo la carga de base de datos y unificando el control en EWM.", correct:true}, {text:"Aumenta el cobro de impuestos corporativos.", correct:false}, {text:"Permite imprimir en impresoras de inyección de tinta.", correct:false}, {text:"Reduce el peso físico del acero de las estanterías.", correct:false}] },
            { question: "Si la máquina de ensamblaje solicita 2 palets completos pero el PSA solo tiene capacidad volumétrica para 1 palet a la vez, ¿cómo lo gestiona EWM?", options: [{text:"Mediante el Capacity Check del Bin del PSA, fraccionando o escalonando la creación de las WTs de abastecimiento desde la consola de Staging.", correct:true}, {text:"Lanzando los 2 palets para que se estrellen en el piso.", correct:false}, {text:"Suspendiendo la producción por 1 semana.", correct:false}, {text:"Apagando la pantalla RF del operario.", correct:false}] },
            { question: "¿Qué transacción clásica de SAP ERP se utiliza para notificar (confirmar) la fabricación de un producto final y detonar los Backflushes?", options: [{text:"CO11N / CO15 / MFBF (para manufactura repetitiva).", correct:true}, {text:"FB50 (Asiento de diario).", correct:false}, {text:"ME21N (Pedido de compras).", correct:false}, {text:"SU01 (Creación de usuarios).", correct:false}] },
            { question: "¿Un 'Co-Product' fabricado junto al producto principal puede almacenarse en EWM con su propia valoración contable en SAP FI?", options: [{text:"Sí, los co-productos son inventariables y tienen su propia Valuation Class para recibir costos del proceso conjunto.", correct:true}, {text:"No, solo el producto principal puede valorarse.", correct:false}, {text:"Sí, pero solo si no tienen código de barras.", correct:false}, {text:"No, los co-productos son ilegales contablemente.", correct:false}] },
            { question: "En Kanban Clásico (2-Bin System), ¿cuántas tarjetas o cajas físicas requiere la máquina para nunca detenerse?", options: [{text:"Dos (una caja en uso siendo consumida y otra caja vacía que viaja/avisa a EWM para ser rellenada).", correct:true}, {text:"Cincuenta cajas.", correct:false}, {text:"Ninguna caja.", correct:false}, {text:"Solo la pantalla de una computadora.", correct:false}] },
            { question: "¿Qué protocolo técnico utiliza SAP EWM para conversar nativamente con el ERP en el modelo descentralizado para confirmar los consumos y recepciones de producción?", options: [{text:"Mensajería qRFC (Queued Remote Function Call).", correct:true}, {text:"Bluetooth.", correct:false}, {text:"Cables HDMI.", correct:false}, {text:"Impresión de códigos QR.", correct:false}] },
            { question: "Si el material 'Motor V8' está marcado como 'Pick Parts' y se requieren 5 unidades, ¿qué generará EWM?", options: [{text:"Una WT exacta por 5 unidades desde el rack hasta el PSA.", correct:true}, {text:"Una WT por el palet entero de 50 motores.", correct:false}, {text:"Una alerta de error porque Pick Parts es solo para tornillos.", correct:false}, {text:"Una factura proforma de exportación.", correct:false}] },
            { question: "Si el material 'Tornillo de Acero' está marcado como 'Crate Parts' y la orden requiere 5 unidades, sabiendo que la caja base trae 1,000, ¿qué generará EWM?", options: [{text:"Una WT por la caja completa de 1,000 unidades hacia el PSA.", correct:true}, {text:"Una WT exacta por 5 tornillos forzando al operario a contarlos a mano.", correct:false}, {text:"Cero WTs, porque asume que hay stock infinito.", correct:false}, {text:"Un bloqueo automático por diferencia de cantidades.", correct:false}] },
            { question: "¿Qué ocurre con las 995 unidades sobrantes del Crate Part que quedaron en el PSA al final de la jornada si la máquina solo ensambló un equipo?", options: [{text:"Quedan físicamente en el PSA y lógicamente en EWM, listas para ser usadas por otra orden, o se devuelven al rack mediante /SCWM/CLEAR_PSA.", correct:true}, {text:"Se desaparecen de la base de datos automáticamente.", correct:false}, {text:"Se facturan al gobierno.", correct:false}, {text:"El ERP las considera destruidas por mermas.", correct:false}] },
            { question: "El 'Staging' en manufactura significa:", options: [{text:"El proceso físico y sistémico de mover y posicionar los componentes logísticos desde el almacén hacia el borde de la línea de producción.", correct:true}, {text:"El proceso de auditar los estados financieros de la empresa.", correct:false}, {text:"La capacitación de los nuevos operarios de limpieza.", correct:false}, {text:"La configuración de los escáneres Zebra en la red Wi-Fi.", correct:false}] },
            { question: "¿Cuál es el riesgo de NO utilizar Backflush en una línea de producción de alta velocidad (ej. embotelladora a 3,000 botellas/hora)?", options: [{text:"Que se necesite un ejército de operarios tecleando manualmente el consumo de tapas y botellas en SAP, lo cual es humanamente imposible y trabaría la fábrica.", correct:true}, {text:"Que el líquido se eche a perder más rápido.", correct:false}, {text:"Que SAP EWM funcione más lento por exceso de RAM.", correct:false}, {text:"Ningún riesgo; Backflush es solo un adorno gráfico en Fiori.", correct:false}] },
            { question: "En la integración EWM-MES, si el brazo robótico soldador falla, ¿cómo evita el MES que SAP EWM siga mandando palets de metal hacia el robot?", options: [{text:"El MES envía un mensaje de estado por API a SAP para bloquear el PSA o pausar temporalmente las WTs de abastecimiento dirigidas a esa celda.", correct:true}, {text:"El robot llama por teléfono al gerente de almacén.", correct:false}, {text:"El MES detiene el reloj del sistema operativo Windows.", correct:false}, {text:"SAP EWM detecta el humo físicamente por las cámaras.", correct:false}] },
            { question: "¿Qué es un BOM (Bill of Materials) y por qué es crítico para EWM en procesos de manufactura?", options: [{text:"Es la receta técnica de componentes de un producto. Es crítico porque EWM usa el BOM para calcular qué materiales, y en qué cantidad, debe abastecer vía PMR.", correct:true}, {text:"Es el recibo de sueldo de los operarios del almacén.", correct:false}, {text:"Es un reporte de finanzas sobre materiales dañados.", correct:false}, {text:"Es la factura de flete del transportista.", correct:false}] },
            { question: "¿A qué nivel de la estructura organizativa de SAP se define un Control Cycle (Ciclo de Control)?", options: [{text:"A nivel de Centro (Plant) y Área de Suministro de Producción (PSA).", correct:true}, {text:"A nivel de Mandante (Cross-Client).", correct:false}, {text:"A nivel de Sociedad (Company Code).", correct:false}, {text:"A nivel de Canal de Distribución (Sales Channel).", correct:false}] },
            { question: "Para visualizar el historial de tareas de abastecimiento hacia una línea de producción en específico, ¿qué nodo del Warehouse Monitor (/SCWM/MON) debe consultar el arquitecto?", options: [{text:"Production Supply / Production Material Request.", correct:true}, {text:"Inbound / Inbound Delivery.", correct:false}, {text:"Resource Management / Queue Sequence.", correct:false}, {text:"Alerts / Exception Codes.", correct:false}] },
            { question: "Si la Orden de Producción CO01 requiere un material 'X' que EWM identifica como 'Out of Stock' (Sin inventario en toda la bodega), el documento PMR:", options: [{text:"Se genera, pero EWM no podrá crear las Warehouse Tasks de Staging para ese material hasta que se reciba nuevo inventario (Backorder).", correct:true}, {text:"Destruye la Orden de Producción de SAP ERP.", correct:false}, {text:"Cambia el requerimiento automáticamente por un material 'Y' al azar.", correct:false}, {text:"Abre el cajón de dinero de la recepción.", correct:false}] },
            { question: "En un escenario MFS + PP-EWM, el abastecimiento se realiza mediante grúas automáticas. ¿Qué documento desencadena el telegrama TCP/IP hacia el PLC de la grúa?", options: [{text:"La Warehouse Task de Staging originada por el PMR, al convertirse en telegrama MFS.", correct:true}, {text:"La Orden de Producción CO02 del ERP.", correct:false}, {text:"La factura electrónica del proveedor.", correct:false}, {text:"La tarjeta de tiempo de Recursos Humanos.", correct:false}] },
            { question: "Si se fabrican piezas aeronáuticas críticas, ¿dónde se asegura la trazabilidad del Lote exacto y Número de Serie ensamblado en SAP?", options: [{text:"Se escanea y asocia de forma estricta (Serial Number Profile / Batch Management) durante el consumo (Goods Issue) en el PSA, quedando ligado al equipo final.", correct:true}, {text:"En una hoja de Excel guardada en la computadora del gerente.", correct:false}, {text:"No se requiere trazabilidad en S/4HANA.", correct:false}, {text:"A través del color de la caja de empaque.", correct:false}] },
            { question: "¿Qué módulo de SAP ERP debe estar activado y configurado en conjunto con EWM para que el flujo completo de PMR funcione?", options: [{text:"SAP PP (Production Planning) o SAP PP-PI (Production Planning for Process Industries).", correct:true}, {text:"SAP HCM (Recursos Humanos).", correct:false}, {text:"SAP FI-AA (Activos Fijos).", correct:false}, {text:"SAP TRM (Treasury and Risk Management).", correct:false}] },
            { question: "¿Cómo se llama el proceso de recibir un producto de la fábrica y despacharlo directamente al cliente final sin almacenarlo (combinando PP y SD vía EWM)?", options: [{text:"Producción con Opportunistic Cross-Docking o Flow-Through.", correct:true}, {text:"Dumping.", correct:false}, {text:"Blind Receiving.", correct:false}, {text:"Ciclo de Vida de Activos.", correct:false}] },
            { question: "Como consultor senior, recomiendas implementar SAP EWM integrado con PP principalmente porque:", options: [{text:"Proporciona visibilidad 3D del stock en planta, optimiza el movimiento de montacargas, automatiza el reabastecimiento exacto y elimina el exceso de inventario inmovilizado en las líneas.", correct:true}, {text:"Porque hace que los gráficos de Fiori se vean más bonitos.", correct:false}, {text:"Porque elimina la necesidad de cobrarle a los clientes.", correct:false}, {text:"Porque permite apagar el servidor los fines de semana.", correct:false}] }
        ]
    },
    {
        id: "s5_l1",
        semester: 5,
        type: "lab",
        title: "5.2 Lab Multi-Paso: Staging PP-EWM y Backflushing",
        duration: "2 Horas 15 Min • Integración Industrial",
        req: "s5_m1",
        description: "El departamento de Manufactura ha liberado la Orden de Producción #90050 para ensamblar un Motor V8. Entra al monitor de Staging de EWM, analiza el PMR, verifica que haya capacidad en la estantería del PSA (Línea de Ensamblaje 1), crea las tareas de montacargas y audita el consumo automático retrospectivo (Backflush) tras el ensamblaje.",
        simTask: { hint: "Fases: CO02-RELEASE -> /SCWM/STAGE -> SELECT-PMR -> CREATE-WT -> /SCWM/RFUI -> CONFIRM-STAGING -> PP-MFBF-BACKFLUSH." },
        simSteps: [
            { instruction: "Liberar Orden de Producción (ERP)", expectedCmd: "CO02-RELEASE", hint: "CO02-RELEASE", successMessage: "> Orden de Fabricación 90050 LIBERADA. PMR generado asíncronamente en EWM." },
            { instruction: "Abrir Consola de Staging (EWM)", expectedCmd: "/SCWM/STAGE", hint: "/SCWM/STAGE", successMessage: "> Monitor de Abastecimiento de Producción cargado. PSA: LINEA-01." },
            { instruction: "Seleccionar PMR Pendiente", expectedCmd: "SELECT-PMR", hint: "SELECT-PMR", successMessage: "> PMR #1000550 (Req: 16 Pistones, 2 Culatas, 1 Bloque V8) Seleccionado." },
            { instruction: "Ejecutar Motor de Tareas", expectedCmd: "CREATE-WT", hint: "CREATE-WT", successMessage: "> Capacity Check OK. 3 WTs creadas hacia montacargas (Pick Parts)." },
            { instruction: "Simulador de Montacargas RF", expectedCmd: "/SCWM/RFUI", hint: "/SCWM/RFUI", successMessage: "> Terminal iniciada. Menú 'Putaway a Producción'." },
            { instruction: "Confirmar Entrega en Línea", expectedCmd: "CONFIRM-STAGING", hint: "CONFIRM-STAGING", successMessage: "> Materiales entregados físicamente en BIN-LINEA-01. EWM Stock en PSA = OK." },
            { instruction: "Ejecutar Consumo de Máquina", expectedCmd: "PP-MFBF-BACKFLUSH", hint: "PP-MFBF-BACKFLUSH", successMessage: "> Producción Terminada. BACKFLUSH EJECUTADO (Mov 261). Inventario deducido correctamente." }
        ]
    },
    {
        id: "s5_m2",
        semester: 5,
        type: "theory",
        title: "5.3 Gestión de Calidad Integrada (SAP QM-EWM)",
        duration: "40 Horas • Arquitectura de Aseguramiento (QA)",
        req: "s5_l1",
        description: "El control absoluto sobre la calidad del inventario corporativo. Aprende cómo SAP EWM y SAP QM se integran mediante Inspection Object Types (IOTs) para bloquear lotes farmacéuticos, generar muestreos estadísticos, rutar productos hacia laboratorios de pruebas destructivas y ejecutar Decisiones de Empleo (Usage Decisions) sin fricciones logísticas. 15 capítulos teóricos y 40 preguntas de certificación.",
        review: "Regla de Oro: El módulo de Calidad manda sobre Logística. Si el Lote de Inspección (Inspection Lot) dictamina un 'Usage Decision' de Rechazo, EWM bloquea automáticamente la mercancía y la enruta hacia Scrap (Destrucción) o Rework (Reproceso). Las reglas de calidad se rigen por la transacción maestra /SCWM/QRSETUP (Inspection Rules) y los IOTs.",
        pages: [
            `<h3>Capítulo 1: El Paradigma de Calidad Integrada</h3>
            <p>El almacén no solo guarda cajas; custodia millones de dólares sujetos a normativas de la FDA, ISO 9001 o regulaciones de aeronáutica. Si el almacén despacha un palet de medicina vencida o contaminada, las consecuencias legales quiebran empresas.</p>
            <details>
                <summary>Ver explicación a fondo (El Muro de QA)</summary>
                <div class="details-content">
                    <p>La integración QM-EWM es el muro de contención (Quality Firewall). En almacenes sin integración, los operarios pueden hacer picking por error de un lote dudoso. En EWM, el stock en estado <strong>'Q' (Quality Inspection)</strong> es ciego matemáticamente para el algoritmo de Outbound: es imposible asignarlo a una ola de salidas de clientes. Calidad manda sobre la operación comercial.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Inspection Object Types (IOTs)</h3>
            <p>Son los "enchufes" arquitectónicos que conectan un evento logístico de EWM con el motor de Calidad (QM).</p>
            <details>
                <summary>Ver explicación a fondo (El Mapa IOT)</summary>
                <div class="details-content">
                    <p>En el Customizing de EWM, activas diferentes IOTs según en qué etapa del flujo logístico quieres inspeccionar:<br>
                    <strong>IOT 1:</strong> Inspección Pre-Entrada (Aviso de Despacho del Proveedor).<br>
                    <strong>IOT 3:</strong> Inspección de Salida (Revisión antes de cargar el camión al cliente).<br>
                    <strong>IOT 4:</strong> Inspección de Entrada (La más crítica, ocurre en el PGR).<br>
                    <strong>IOT 5:</strong> Inspecciones Internas o cíclicas (Inspecciones periódicas de lotes que llevan meses guardados).</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Inspección de Entrada (IOT 4) y Q-Zone</h3>
            <p>El camión descarga. Automáticamente, el sistema secuestra el inventario y lo aísla lógicamente.</p>
            <details>
                <summary>Ver explicación a fondo (Ruteo Dinámico de Calidad)</summary>
                <div class="details-content">
                    <p>Al contabilizar el Post Goods Receipt (PGR), el IOT 4 se gatilla. SAP verifica si el Material Master exige inspección. Si es así, crea un <strong>Inspection Lot (Lote de Inspección)</strong> en el ERP y una Warehouse Task en EWM para mover el palet desde el muelle hacia la <strong>Q-Zone (Zona de Cuarentena)</strong> o Laboratorio de QA. El palet jamás tocará los racks de venta hasta aprobar el examen.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Inspection Rules (Reglas de Inspección - /SCWM/QRSETUP)</h3>
            <p>El cerebro condicional. Define a quién, cuánto y cómo inspeccionar sin tener que codificar a mano.</p>
            <details>
                <summary>Ver explicación a fondo (Matriz de Riesgos)</summary>
                <div class="details-content">
                    <p>La transacción maestra de calidad en EWM es <code>/SCWM/QRSETUP</code>. Aquí configuras matrices de riesgo: "Si el material es QUÍMICO y el proveedor es NUEVO, inspecciona el 100% de los palets. Si el proveedor tiene certificado ISO y lleva 5 años de buen récord (Skip-Lot), inspecciona solo 1 palet de cada 20 de forma aleatoria". Todo de forma algorítmica.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Muestreo Físico (Sample Size & Sampling Procedures)</h3>
            <p>El inspector de calidad no puede abrir las 10,000 botellas que llegaron; necesita una muestra representativa (Sample).</p>
            <details>
                <summary>Ver explicación a fondo (Work Center de QA)</summary>
                <div class="details-content">
                    <p>Según la regla <em>Sampling Procedure</em> basada en tablas de estadística militar (ej. AQL), SAP determina que debe extraer 15 botellas de muestra. EWM genera una Warehouse Task especial (Sample Extraction WT). El operario extrae las 15 botellas, las escanea, y las lleva al <strong>Work Center de QA</strong>. El resto del palet (9,985 botellas) queda inmovilizado en la zona de reserva esperando el resultado de la muestra.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Registro de Resultados (Results Recording - QA32/QE01)</h3>
            <p>El laboratorista ingresa las mediciones físicas o químicas a la base de datos de SAP QM.</p>
            <details>
                <summary>Ver explicación a fondo (Master Inspection Characteristics - MICs)</summary>
                <div class="details-content">
                    <p>El lote de inspección contiene <strong>MICs (Características Maestras de Inspección)</strong>. Ejemplos: MIC 1 = Temperatura (Permitido: 2°C a 8°C). MIC 2 = Color (Permitido: Blanco). Si el laboratorista teclea 15°C, SAP QM rechaza automáticamente esa característica (Out of Spec). Esta información vive en el ERP, pero impacta la logística inmovilizada en EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: La Decisión de Empleo (Usage Decision - UD)</h3>
            <p>El momento de la verdad. ¿El material se aprueba para la venta, o se destruye?</p>
            <details>
                <summary>Ver explicación a fondo (Follow-Up Actions)</summary>
                <div class="details-content">
                    <p>El Gerente de Calidad firma digitalmente el UD (Usage Decision) en la transacción QA11. Existen decisiones estándar: <strong>A (Aprobado)</strong> o <strong>R (Rechazado)</strong>. Al guardar el UD, SAP dispara un <strong>Follow-Up Action (Acción Subsiguiente)</strong>. Esta acción se comunica vía qRFC de vuelta a EWM, desencadenando toda una tormenta de Warehouse Tasks automatizadas según el resultado.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Logística Post-Aprobación (Unrestricted Stock)</h3>
            <p>El Gerente de Calidad aprobó el lote. El stock se libera comercialmente.</p>
            <details>
                <summary>Ver explicación a fondo (Cambio de Tipo de Stock - Posting Change)</summary>
                <div class="details-content">
                    <p>Si el UD es "Aprobado", el Follow-Up Action en EWM ejecuta un <strong>Posting Change (Cambio Contable)</strong> en milisegundos. El inventario pasa del tipo de stock <code>'Q' (Quality)</code> al tipo de stock <code>'F' o 'Blank' (Unrestricted/Libre Utilización)</code>. Inmediatamente después, genera una Warehouse Task para mover los palets desde la zona de cuarentena hacia el rack de venta (High Rack Putaway).</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Logística de Rechazo, Reproceso (Rework) y Scrap (Chatarra)</h3>
            <p>El lote falló las pruebas. El peligro de contaminación es inminente. Debe aislarse o destruirse.</p>
            <details>
                <summary>Ver explicación a fondo (Ruteo de Excepciones)</summary>
                <div class="details-content">
                    <p>Si el UD es "Rechazado", el Follow-Up Action cambia el stock a tipo <code>'S' (Blocked/Scrap)</code>. EWM crea tareas forzosas hacia la <strong>Zona de Destrucción (Scrap Zone)</strong> o, si el artículo es recuperable (ej. le falta una etiqueta), hacia la <strong>Zona de Reproceso (Rework Work Center)</strong>. Financieramente, esto detona una pérdida contable o un cargo/débito en reclamo hacia el proveedor en SAP MM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Ensayos Destructivos (Destructive Testing)</h3>
            <p>Para probar que un chaleco antibalas funciona, tienes que dispararle y destruirlo. El inventario desaparece.</p>
            <details>
                <summary>Ver explicación a fondo (Inventario Consumido por QA)</summary>
                <div class="details-content">
                    <p>En pruebas destructivas o de microbiología, la muestra extraída jamás regresa al almacén principal. El Follow-Up Action del módulo QM ejecuta automáticamente un <strong>Goods Issue to Sample (Salida por Muestreo)</strong>. En EWM, las 15 unidades que se llevaron al laboratorio se borran del inventario físico y se cargan al Centro de Costos del departamento de calidad en SAP FI.</p>
                </div>
            </details>`,

            `<h3>Capítulo 11: Inspecciones Cíclicas e Internas (IOT 5 / Relocation)</h3>
            <p>Medicinas que llevan guardadas 12 meses deben re-evaluarse antes de salir al mercado para asegurar su potencia.</p>
            <details>
                <summary>Ver explicación a fondo (Batch Expiration Monitoring)</summary>
                <div class="details-content">
                    <p>Un Job nocturno monitorea las fechas de caducidad (SLED). Si un lote de vacunas entra en su "Ventana Crítica de Inspección Repetitiva" (Recurring Inspection), el ERP genera un nuevo Lote de Inspección (IOT 5). EWM cambia sorpresivamente el stock de los racks de 'Unrestricted' a 'Quality', congelándolo, y envía WTs para que los operarios bajen los palets y los lleven al laboratorio para un test de estabilidad.</p>
                </div>
            </details>`,

            `<h3>Capítulo 12: Devoluciones de Clientes (Customer Returns) y Calidad</h3>
            <p>Un cliente devuelve 5 laptops porque "no encienden". No puedes meterlas al inventario de venta directamente.</p>
            <details>
                <summary>Ver explicación a fondo (ARM - Advanced Returns Management)</summary>
                <div class="details-content">
                    <p>El proceso <strong>Advanced Returns Management (ARM)</strong> usa el IOT 4 o IOT 3. Al recibir la caja de devolución en el muelle (Advanced Return Delivery), el sistema la envía forzosamente al <strong>Returns Work Center</strong>. Un técnico evalúa si la laptop realmente está dañada, si fue golpeada por el transportista, o si funciona perfecto (A-Stock). Su Decisión de Empleo determina si se devuelve el dinero al cliente o se tira a la basura.</p>
                </div>
            </details>`,

            `<h3>Capítulo 13: Certificados de Calidad (Quality Certificates)</h3>
            <p>Documentos PDF firmados (ej. Certificado de Análisis - CoA) que el proveedor debe enviar con el camión, o el almacén no recibe.</p>
            <details>
                <summary>Ver explicación a fondo (Bloqueo de Inbound por Falta de Documentos)</summary>
                <div class="details-content">
                    <p>En la industria farmacéutica, si llega la materia prima pero el transportista olvidó el <em>Certificate of Analysis (CoA)</em> del lote, SAP EWM bloquea por sistema la contabilización del Post Goods Receipt (PGR) a través del status "Certificate Missing". El camión se queda en el patio de maniobras (Yard Management) hasta que el proveedor envíe el PDF y el empleado de garita lo adjunte en SAP.</p>
                </div>
            </details>`,

            `<h3>Capítulo 14: Lotes de Inspección en EWM vs ERP (Engine QM Embebido vs Descentralizado)</h3>
            <p>S/4HANA trajo una revolución: incrustar el motor de QM dentro del propio EWM para ganar microsegundos de respuesta.</p>
            <details>
                <summary>Ver explicación a fondo (QIE - Quality Inspection Engine)</summary>
                <div class="details-content">
                    <p>Antes, EWM dependía enteramente de los mensajes RFC lentos del ERP para saber qué hacer. Ahora, S/4HANA EWM utiliza el <strong>QIE (Quality Inspection Engine)</strong> local. Esto permite generar documentos de inspección paralelos en EWM en tiempo real, permitiendo a los operarios del Work Center ingresar defectos desde su pistola de radiofrecuencia (/RFUI) sin tener acceso a las pantallas complejas de SAP ERP.</p>
                </div>
            </details>`,

            `<h3>Capítulo 15: Monitor EWM para Calidad y Tablas Core SQL QM</h3>
            <p>Como consultor, si un palet está bloqueado en calidad y no sabes por qué, aquí encuentras las respuestas.</p>
            <details>
                <summary>Ver explicación a fondo (Troubleshooting QM-EWM)</summary>
                <div class="details-content">
                    <p>En el Monitor (<code>/SCWM/MON</code>), nodo <em>Quality Inspection</em>, visualizas los Inspection Documents vinculados al stock. <strong>Tablas Core:</strong> <code>QALS</code> (Cabecera de Lote de Inspección ERP), <code>QAMV</code> (Características de inspección), <code>QAMR</code> (Resultados de inspección), y en EWM <code>/SCWM/QUAN</code> (Tabla maestra de Quants/Stock donde visualizas el flag de tipo 'Q' o 'S' de las HUs inmovilizadas).</p>
                </div>
            </details>`
        ],
        exam: [
            { question: "¿Cuál es el propósito fundamental de integrar SAP EWM con SAP QM en un almacén de clase mundial?", options: [{text:"Crear un 'Quality Firewall' (muro de calidad) inmovilizando sistémicamente inventarios dudosos o sin evaluar para evitar que sean recolectados y enviados a clientes.", correct:true}, {text:"Mejorar los gráficos y colores del sistema SAP Fiori.", correct:false}, {text:"Permitir que el departamento de finanzas cobre los fletes más rápido.", correct:false}, {text:"Eliminar la necesidad de contratar gerentes en el almacén.", correct:false}] },
            { question: "En la arquitectura técnica de integración EWM-QM, ¿qué significan las siglas IOT?", options: [{text:"Inspection Object Types (Los eventos de proceso, como entrada o salida, que detonan una inspección de calidad).", correct:true}, {text:"Internet of Things.", correct:false}, {text:"Internal Operation Taxes.", correct:false}, {text:"Inter-Office Transfers.", correct:false}] },
            { question: "¿Qué IOT (Inspection Object Type) se dispara de forma crítica y estándar justo en el momento en que se contabiliza el Post Goods Receipt (PGR) de un camión entrante?", options: [{text:"IOT 4 (Inspección de Entrada / Inbound Inspection).", correct:true}, {text:"IOT 1 (Inspección Pre-Entrada).", correct:false}, {text:"IOT 3 (Inspección de Salida).", correct:false}, {text:"IOT 5 (Inspección Interna).", correct:false}] },
            { question: "¿Qué IOT se encarga de las inspecciones cíclicas o internas para lotes de productos que ya llevan almacenados 12 meses en la bodega y necesitan re-evaluación por vencimiento?", options: [{text:"IOT 5 (Inspección Interna o Relocation Inspection).", correct:true}, {text:"IOT 4.", correct:false}, {text:"IOT 1.", correct:false}, {text:"IOT 9.", correct:false}] },
            { question: "¿Cuál es la transacción maestra centralizada en SAP EWM donde el consultor parametriza las Reglas de Inspección (ej. inspeccionar el 100%, o solo muestras, dependiendo del proveedor o material)?", options: [{text:"/SCWM/QRSETUP (Inspection Rules).", correct:true}, {text:"MM01 (Material Master).", correct:false}, {text:"SU01 (User Maintenance).", correct:false}, {text:"SE38 (ABAP Editor).", correct:false}] },
            { question: "Cuando EWM recibe mercancía sujeta a calidad bajo IOT 4, ¿bajo qué Tipo de Stock (Stock Type) ingresa financieramente y lógicamente el inventario para inmovilizarlo?", options: [{text:"Tipo de Stock 'Q' (Quality Inspection Stock).", correct:true}, {text:"Tipo de Stock 'Blank' o 'F' (Unrestricted / Libre Utilización).", correct:false}, {text:"Tipo de Stock 'B' (Blocked by Finance).", correct:false}, {text:"Tipo de Stock 'T' (Transit).", correct:false}] },
            { question: "Si un lote de 1,000 unidades llega y el sistema calcula, según las reglas de muestreo (AQL), que solo se necesitan 15 unidades de muestra. ¿Qué genera EWM?", options: [{text:"Una Warehouse Task de extracción de muestra (Sample WT) para llevar 15 unidades al laboratorio, inmovilizando las 985 unidades restantes en el rack de reserva bajo estado 'Q'.", correct:true}, {text:"Envía las 1,000 unidades directo al laboratorio colapsando el edificio.", correct:false}, {text:"Destruye las 985 unidades restantes por seguridad.", correct:false}, {text:"Rechaza el camión obligando a que envíe solo 15 unidades.", correct:false}] },
            { question: "¿Qué son las MICs (Master Inspection Characteristics) dentro de un Lote de Inspección de SAP QM?", options: [{text:"Las variables técnicas a medir en el laboratorio (ej. pH, color, temperatura) que definen el límite de tolerancia (Pass/Fail) del análisis.", correct:true}, {text:"Las cámaras de seguridad físicas del almacén.", correct:false}, {text:"Un tipo especial de código de barras militar.", correct:false}, {text:"La tarifa por hora que cobra el inspector.", correct:false}] },
            { question: "¿Qué significan las siglas 'UD' en el flujo de gestión de calidad integrada en SAP S/4HANA?", options: [{text:"Usage Decision (Decisión de Empleo - el dictamen final firmado por el Gerente de Calidad que aprueba o rechaza un lote).", correct:true}, {text:"User Database (Base de datos de usuarios).", correct:false}, {text:"Universal Delivery (Entrega universal).", correct:false}, {text:"Urgent Dispatch (Despacho urgente).", correct:false}] },
            { question: "Si el Gerente de QA en el ERP realiza un 'Usage Decision' con resultado APROBADO, ¿qué mecanismo técnico utiliza SAP para informar y mover la mercancía en EWM de forma automatizada?", options: [{text:"A través de una 'Follow-Up Action' que ejecuta un Cambio Contable (Posting Change) en EWM, cambiando el stock de 'Q' a 'Libre', y generando las WTs de Putaway final.", correct:true}, {text:"Llama por teléfono al supervisor de almacén para que mueva las cajas a mano.", correct:false}, {text:"Genera una nueva Orden de Compra para premiar al proveedor.", correct:false}, {text:"Borra el Material Master entero.", correct:false}] },
            { question: "Si el UD dictamina un RECHAZO definitivo por contaminación, ¿qué Follow-Up Action desencadena EWM típicamente sobre el inventario físico en la Q-Zone?", options: [{text:"Ejecuta el cambio de estado a tipo 'S' (Scrap/Blocked) y genera una Warehouse Task forzosa moviendo los palets desde la zona de calidad hacia la Zona de Destrucción (Scrap Zone).", correct:true}, {text:"Lo vende al doble del precio en una liquidación.", correct:false}, {text:"Lo empaqueta como regalo para los empleados.", correct:false}, {text:"Lo vuelve a enviar al rack de venta libre, pero ocultándolo.", correct:false}] },
            { question: "En un proceso de QA donde se aplican 'Ensayos Destructivos' (ej. someter una pieza a presión extrema hasta que estalla), ¿qué ocurre con el inventario lógico de esa muestra en SAP?", options: [{text:"El Follow-Up Action ejecuta un consumo o salida de mercancía por muestreo (Goods Issue to Sample), descargando el inventario de EWM con cargo al Centro de Costos de Calidad.", correct:true}, {text:"SAP clona el inventario mágicamente para no perder dinero.", correct:false}, {text:"Se devuelve el polvo de la pieza rota al proveedor para que la repare.", correct:false}, {text:"El sistema genera un Short Dump porque no soporta roturas.", correct:false}] },
            { question: "¿Qué característica de control avanzada permite a SAP EWM bloquear en garita a un camión entrante si le falta un documento PDF normativo crucial?", options: [{text:"La validación del Certificate of Analysis (CoA) en el Inbound Delivery; sin él, el status de calidad falla y se bloquea el PGR.", correct:true}, {text:"El escáner térmico del guardia de seguridad.", correct:false}, {text:"El pago anticipado de los impuestos de aduana.", correct:false}, {text:"El certificado de antecedentes penales del chofer.", correct:false}] },
            { question: "Un cliente devuelve un producto de alta tecnología porque llegó abollado. Usando Advanced Returns Management (ARM), ¿hacia dónde enruta EWM forzosamente el paquete al recibirlo en muelle?", options: [{text:"Hacia un Work Center especializado de Devoluciones (Returns Work Center) para que un técnico dictamine la gravedad del daño mediante una inspección IOT.", correct:true}, {text:"Directamente al rack de ventas Unrestricted como nuevo.", correct:false}, {text:"Directamente al basurero corporativo sin preguntar.", correct:false}, {text:"Al escritorio de recepción administrativa (Front Desk).", correct:false}] },
            { question: "¿Cómo se denomina el motor local interno de SAP S/4HANA EWM que permite gestionar documentos de calidad y registrar defectos directamente desde las pantallas de radiofrecuencia (RF) del almacén sin depender exclusivamente del ERP?", options: [{text:"QIE (Quality Inspection Engine).", correct:true}, {text:"V8 JavaScript Engine.", correct:false}, {text:"Unreal Engine 5.", correct:false}, {text:"SAP BTP Integration Suite.", correct:false}] },
            { question: "Dentro del EWM Warehouse Monitor (/SCWM/MON), ¿en qué tabla SQL principal podrías buscar si existe un flag de stock tipo 'Q' o 'S' inmovilizando una unidad de manipulación (HU)?", options: [{text:"En la tabla /SCWM/QUAN (La tabla maestra de Quants/Inventario).", correct:true}, {text:"En la tabla T001W (Maestro de Centros).", correct:false}, {text:"En la tabla BIKER (No existe en logística).", correct:false}, {text:"En la tabla VBAK (Cabecera de ventas).", correct:false}] },
            { question: "En un escenario descentralizado (ERP separado de EWM), si la red corporativa sufre una desconexión total (Network Outage) por 2 horas, ¿qué sucede con las Decisiones de Empleo (UD) realizadas por el gerente en ERP QA11?", options: [{text:"Se encolan de forma asíncrona mediante mensajes qRFC y, tan pronto regresa la red, EWM las procesa en orden y dispara las WTs de los Follow-Up Actions.", correct:true}, {text:"Se borran permanentemente y el gerente debe rehacerlas.", correct:false}, {text:"EWM asume automáticamente que todo está aprobado para no frenar ventas.", correct:false}, {text:"El ERP genera un Rollback masivo de toda la producción del año.", correct:false}] },
            { question: "¿Qué ventaja estadística militar e industrial integra SAP QM para evitar inspeccionar cada tuerca individualmente en envíos masivos?", options: [{text:"Procedimientos de Muestreo Basados en Normas Internacionales (como AQL - Acceptable Quality Limits y reglas Skip-Lot para proveedores confiables).", correct:true}, {text:"El Teorema de Pitágoras.", correct:false}, {text:"Secuencias de Fibonacci invertidas.", correct:false}, {text:"Mediciones astrológicas corporativas.", correct:false}] },
            { question: "Si un almacén de alimentos usa 'Rework' (Reproceso), ¿qué flujo físico rige EWM para el lote fallido?", options: [{text:"EWM mueve el lote a una zona física de Rework, PP lanza una Orden de Reproceso (CO01) para re-etiquetar, y al terminar, la mercancía se re-evalúa en QM antes de ir al rack final.", correct:true}, {text:"Se vende a mitad de precio en la puerta del almacén sin registro alguno.", correct:false}, {text:"Se esconde el palet detrás de los montacargas rotos.", correct:false}, {text:"Se borra la tabla MARA para que Finanzas no note la pérdida.", correct:false}] },
            { question: "¿Por qué el consultor logístico arquitecto (Senior Architect) nunca debe permitir que se evada el IOT 4 (Inbound Inspection) en productos regulados como farmacéuticos?", options: [{text:"Porque anula el 'Quality Firewall', permitiendo que lotes peligrosos se mezclen con el stock comercial y generando riesgo legal multimillonario y peligro de salud pública.", correct:true}, {text:"Porque SAP cobraría una multa por falta de uso del módulo.", correct:false}, {text:"Porque los montacargas se aburrirían por falta de tareas de cuarentena.", correct:false}, {text:"Porque los laboratorios de calidad se quedarían sin presupuesto anual.", correct:false}] }
        ]
    },
    {
        id: "s5_l2",
        semester: 5,
        type: "lab",
        title: "5.4 Lab Multi-Paso: Inspección de Calidad (QM-EWM Firewall)",
        duration: "2 Horas 30 Min • Contingencia Sanitaria",
        req: "s5_m2",
        description: "Acaba de llegar un lote de 5,000 vacunas importadas (Inbound Delivery). Por normativas sanitarias, está sometido a IOT 4. Ejecuta el PGR, observa cómo el sistema confisca el palet bajo estado 'Q', extrae la muestra para el Work Center de QA, y como Gerente, registra un 'Usage Decision' de rechazo (R) por ruptura de cadena de frío, enviando todo el lote a la cámara de Destrucción.",
        simTask: { hint: "Fases: /SCWM/PRDI -> PGR-IOT4 -> /SCWM/MON-Q -> SAMPLE-EXTRACT -> ERP-QA32 -> RECORD-RESULTS -> UD-REJECT -> /SCWM/TO_CONF -> SCRAP-ZONE." },
        simSteps: [
            { instruction: "Cargar Inbound Delivery EWM", expectedCmd: "/SCWM/PRDI", hint: "/SCWM/PRDI", successMessage: "> IBD #88001 (5,000 Dosis Vacuna). Lote 0001." },
            { instruction: "Contabilizar PGR", expectedCmd: "PGR-IOT4", hint: "PGR-IOT4", successMessage: "> PGR EJECUTADO. IOT 4 Activado: Lote de Inspección #991000 creado. Stock en Cuarentena (Q)." },
            { instruction: "Auditar Bloqueo en EWM", expectedCmd: "/SCWM/MON-Q", hint: "/SCWM/MON-Q", successMessage: "> Palet SSCC-8822 inmovilizado en GR Zone (9010). Stock Type: Q." },
            { instruction: "Extraer Muestra Médica", expectedCmd: "SAMPLE-EXTRACT", hint: "SAMPLE-EXTRACT", successMessage: "> WT 4001: 50 dosis separadas hacia Q-Work Center. 4,950 dosis bajo resguardo de seguridad." },
            { instruction: "Ingresar a Worklist QA (ERP)", expectedCmd: "ERP-QA32", hint: "ERP-QA32", successMessage: "> QA32 Worklist Abierto. Lote #991000 listo para evaluación." },
            { instruction: "Registrar Resultados Analíticos", expectedCmd: "RECORD-RESULTS", hint: "RECORD-RESULTS", successMessage: "> MIC Temperatura reporta 18°C (Límite max 8°C). FALLO CRÍTICO (Out of Spec)." },
            { instruction: "Firmar Usage Decision (Rechazo)", expectedCmd: "UD-REJECT", hint: "UD-REJECT", successMessage: "> UD FIRMADO: R (Rechazado). Follow-Up Action: SCRAP. Mensaje qRFC enviado a EWM." },
            { instruction: "Verificar Tarea de Retiro EWM", expectedCmd: "/SCWM/TO_CONF", hint: "/SCWM/TO_CONF", successMessage: "> WT Automática #80992 generada: Origen 9010 (Palet inmovilizado) -> Destino: INCINERADOR-01." },
            { instruction: "Destruir Lote Contaminado", expectedCmd: "SCRAP-ZONE", hint: "SCRAP-ZONE", successMessage: "> STOCK ELIMINADO FÍSICA Y CONTABLEMENTE. Riesgo de Salud Pública mitigado al 100%." }
        ]
    }
,
    // ==========================================
    // SEMESTRE 6 - SAP TM ASR, EWM BILLING (3PL) Y ANALÍTICA CDS / FIORI
    // ==========================================
    {
        id: "s6_m1",
        semester: 6,
        type: "theory",
        title: "6.1 Advanced Shipping & Receiving (ASR) y EWM Billing (3PL)",
        duration: "40 Horas • Arquitectura de Transporte y Facturación",
        req: "s5_l2",
        description: "El nivel cumbre de rentabilidad logística. Aprende a fusionar EWM con SAP TM (Transportation Management) para consolidar fletes directamente sobre el Freight Order (FO) mediante el framework ASR. Además, domina Warehouse Billing para operadores 3PL, cobrando a los clientes por metros cúbicos ocupados, palets movidos y servicios de empaque usando Measurement Services. 15 capítulos profundos y 20 preguntas de certificación ejecutiva.",
        review: "Regla de Oro: En S/4HANA moderno (ASR), EWM y TM comparten la misma base de datos. Ya no existen TUs (Transportation Units) duplicadas en EWM; el camión físico se representa directamente mediante el TM Freight Order (FO). Para 3PLs, el EWM Measurement Service captura las métricas de operación y genera automáticamente el Billing Document en SAP SD para cobrar los servicios.",
        pages: [
            `<h3>Capítulo 1: El Ecosistema 3PL (Third Party Logistics)</h3>
            <p>Un operador logístico (ej. DHL, Kuehne+Nagel) no vende productos; vende el espacio de su almacén y el sudore de sus montacarguistas.</p>
            <details>
                <summary>Ver explicación a fondo (El Negocio de la Logística)</summary>
                <div class="details-content">
                    <p>Si eres un 3PL, tienes el inventario de 50 empresas distintas (Entitled to Dispose) en un mismo Centro. La rentabilidad depende de cobrar por cada acción: por guardar un palet 10 días, por etiquetar una caja (Value-Added Services - VAS) y por cada camión cargado. SAP EWM debe actuar como un taxímetro milimétrico que registre cada evento y lo facture automáticamente a fin de mes.</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: Warehouse Billing (Facturación de Almacén)</h3>
            <p>La arquitectura financiera para cobrar servicios logísticos mediante Snapshots de inventario.</p>
            <details>
                <summary>Ver explicación a fondo (Integración EWM-SD)</summary>
                <div class="details-content">
                    <p><strong>Warehouse Billing</strong> captura dos tipos de cargos. 1) <strong>Cargos Recurrentes:</strong> ¿Cuántos metros cúbicos ocupó el cliente X hoy a medianoche? SAP toma un 'Snapshot' del inventario diario y cobra tarifa de almacenamiento. 2) <strong>Cargos Transaccionales:</strong> ¿Cuántas Warehouse Orders se confirmaron para el cliente Y? Se cobra una tarifa fija por cada movimiento de Putaway o Picking.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Measurement Services (Servicios de Medición)</h3>
            <p>Algoritmos nocturnos que barren la base de datos de EWM buscando KPIs facturables.</p>
            <details>
                <summary>Ver explicación a fondo (Extracción de Métricas)</summary>
                <div class="details-content">
                    <p>Un Measurement Service es una consulta SQL sofisticada parametrizada en EWM. Ejemplo: <em>"Contar el número de Handling Units del Partner 1000 que entraron por el muelle entre las 08:00 y las 18:00"</em>. El resultado de esta medición (ej. 450 HUs) se envía mediante un <strong>Billing Document Request (BDR)</strong> hacia SAP SD (Sales and Distribution), quien multiplica 450 por $2 USD para emitir la factura final.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Value-Added Services (VAS - Servicios de Valor Agregado)</h3>
            <p>Emplayar, etiquetar precios especiales, armar kits de promoción (Kitting).</p>
            <details>
                <summary>Ver explicación a fondo (Work Centers de Empaque)</summary>
                <div class="details-content">
                    <p>El cliente pide que a los perfumes se les pegue una etiqueta de "Día de la Madre" antes de enviarlos a tienda. Esto es un <strong>VAS</strong>. EWM genera una Orden VAS paralela a la Warehouse Order. Detiene el palet en el Work Center (Zona 8000), el operario escanea el material de empaque consumido (film plástico, etiquetas) y EWM registra el tiempo laboral para cobrárselo al cliente en la facturación mensual.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Evolución de Integración de Transporte (SAP TM)</h3>
            <p>De sistemas separados (ERP + TM + EWM) a una única base de datos incrustada en S/4HANA.</p>
            <details>
                <summary>Ver explicación a fondo (Embedded TM vs Standalone)</summary>
                <div class="details-content">
                    <p>Históricamente, SAP EWM y SAP TM hablaban mediante pesados mensajes SOAP/XML. El TM planificaba el camión y le enviaba un mensaje a EWM para que creara un "Transportation Unit" (TU). La redundancia de datos causaba bloqueos. <strong>S/4HANA Embedded TM</strong> unifica el código: el TM y el EWM corren en el mismo servidor y memoria, eliminando las interfaces redundantes y los desfases de estado de los camiones.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: Freight Units (FU) y Freight Orders (FO)</h3>
            <p>El lenguaje maestro de SAP Transportation Management.</p>
            <details>
                <summary>Ver explicación a fondo (La Matemática del Flete)</summary>
                <div class="details-content">
                    <p>Cuando se crea un pedido de venta, SAP TM genera <strong>Freight Units (FUs)</strong>, que representan el requerimiento logístico (ej. "Mover 2 toneladas de Cemento de Bogotá a Cali"). El planificador consolida múltiples FUs en un <strong>Freight Order (FO)</strong>, que representa el camión físico (ej. Tractomula Placa XYZ-123). Este FO es el documento rector para EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: Advanced Shipping & Receiving (ASR)</h3>
            <p>El framework moderno de S/4HANA que erradica la redundancia de las Transportation Units (TUs).</p>
            <details>
                <summary>Ver explicación a fondo (El Fin de Yard Management Duplicado)</summary>
                <div class="details-content">
                    <p>Con <strong>ASR</strong> activado, EWM ya no utiliza su viejo módulo de TUs para despachar. El documento de ejecución del almacén se vuelve directamente el <strong>Freight Order de TM</strong>. Si el guardia de seguridad marca "Llegada a Garita" en el documento TM, el monitor de EWM (/SCWM/MON) refleja instantáneamente que el camión está en puerta, compartiendo la misma tabla SQL. Simplifica la arquitectura radicalmente.</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Load Planning (Planificación de Carga en 3D)</h3>
            <p>Motor gráfico de TM que dicta a EWM el orden exacto en que debe cargar los palets en el tráiler.</p>
            <details>
                <summary>Ver explicación a fondo (Axle Weight & Reverse Stop)</summary>
                <div class="details-content">
                    <p>El TM Load Optimizer evalúa el peso por ejes del camión para evitar multas de carretera y el orden de paradas (Reverse Stop-Sequence). Si el camión descarga primero en Medellín y luego en Cartagena, EWM recibe instrucciones de cargar primero los palets de Cartagena (al fondo) y luego los de Medellín (a la puerta). Esto altera el orden del Wave Release en EWM.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Direct Integration EWM-TM (Escenario Outbound)</h3>
            <p>Sincronización milimétrica: EWM reporta si las cajas ocuparon más volumen del estimado por TM.</p>
            <details>
                <summary>Ver explicación a fondo (Actualización de Volumen Real)</summary>
                <div class="details-content">
                    <p>TM planeó el flete asumiendo 10 metros cúbicos. Pero durante el proceso de empaque (Cartonization) en EWM, el operario usó cajas más grandes y el volumen real subió a 12 m3. Al escanear la HU cerrada, EWM notifica automáticamente al Freight Order en TM. TM recalcula la tarifa del transportista o alerta si el camión ya no tiene capacidad para cerrar puertas.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: Transit Warehousing (EWM como Hub Aéreo/Terrestre)</h3>
            <p>Operación de aeropuertos de carga o hubs postales donde la mercancía nunca es tuya, solo transita.</p>
            <details>
                <summary>Ver বাধা fondo (Air Freight Consolidation)</summary>
                <div class="details-content">
                    <p>Aplica para FedEx, DHL Express. En <strong>Transit Warehousing</strong>, EWM no conoce los productos internos (televisores, ropa). Solo gestiona HUs ciegas (cajas cerradas) guiadas por el Air Waybill (AWB) de TM. EWM escanea el paquete entrante, lo dirige a la zona de exportación correspondiente y arma palets aéreos (ULDs - Unit Load Devices) optimizando contornos cilíndricos para aviones.</p>
                </div>
            </details>`,

            `<h3>Capítulo 11: Freight Settlement (Liquidación de Gastos de Transporte)</h3>
            <p>El puente entre TM y Finanzas (MM/FI) para pagarle al transportista.</p>
            <details>
                <summary>Ver explicación a fondo (Freight Settlement Document - FSD)</summary>
                <div class="details-content">
                    <p>Una vez que EWM confirma el <em>Post Goods Issue (PGI)</em>, la operación física termina. TM toma los costos calculados en el Freight Order y genera un <strong>FSD (Freight Settlement Document)</strong>. Este documento viaja automáticamente a SAP MM, creando una Hoja de Entrada de Servicios y una factura logística (MIRO) para liberar el pago en tesorería al dueño de la tractomula.</p>
                </div>
            </details>`,

            `<h3>Capítulo 12: Gestión de Daños en Carga (Discrepancy / Damage Recording)</h3>
            <p>Si el palet sale sano de EWM pero llega roto a destino, el seguro debe intervenir.</p>
            <details>
                <summary>Ver explicación a fondo (Notificación de Excepciones TM)</summary>
                <div class="details-content">
                    <p>Al descargar en un almacén receptor con ASR, el operario escanea la caja. Si nota humedad o roturas, usa un Exception Code en la RF (ej. DAMG) y toma una foto con la terminal (attachment). Esto se refleja instantáneamente en el FO de TM como una Discrepancia, reteniendo automáticamente el pago de la liquidación de flete hasta que se resuelva la disputa con la empresa transportista.</p>
                </div>
            </details>`,

            `<h3>Capítulo 13: Monitor EWM / Nodo Transporte y ASR</h3>
            <p>El tablero unificado para el supervisor de andenes (Dock Manager).</p>
            <details>
                <summary>Ver explicación a fondo (Control de Tráfico)</summary>
                <div class="details-content">
                    <p>Con ASR, el monitor de EWM adquiere poderes de TM. En el nodo de <strong>Shipping & Receiving</strong>, el supervisor ve los Freight Orders activos, qué porcentaje de la carga ya está en la zona de Staging, qué camiones están en el Yard esperando, y puede ejecutar bloqueos de salida si faltan precintos de seguridad (Seals) en las puertas del tráiler.</p>
                </div>
            </details>`,

            `<h3>Capítulo 14: Manejo de Mercancías Peligrosas (Dangerous Goods - DG)</h3>
            <p>Integración EWM-TM con regulaciones globales (IATA, ADR, IMDG).</p>
            <details>
                <summary>Ver explicación a fondo (Compliance de Transporte)</summary>
                <div class="details-content">
                    <p>Si EWM carga un barril de Ácido Sulfúrico y otro de Cianuro, TM detecta una violación a las reglas de segregación química (no pueden viajar en el mismo remolque). EWM bloquea la confirmación de la Loading WT. El Freight Order exige generar e imprimir documentos de materiales peligrosos (Tremcards) obligatorios para que el chofer los presente en los peajes o aduanas.</p>
                </div>
            </details>`,

            `<h3>Capítulo 15: Arquitectura Cross-System para Multinacionales</h3>
            <p>Un centro en EWM Descentralizado S/4HANA integrado a un TM Global en otro servidor.</p>
            <details>
                <summary>Ver explicación a fondo (Arquitectura Hub)</summary>
                <div class="details-content">
                    <p>Las corporaciones inmensas pueden tener el ERP en un continente, y usar S/4HANA EWM como un sistema puramente descentralizado junto a TM. En este modelo Hub-and-Spoke, los mensajes SOA (Service Oriented Architecture) garantizan que, si el ERP matriz cae, la distribución local regional, la planeación de fletes y los cobros a los clientes sigan operando en el Hub EWM/TM independiente 24/7.</p>
                </div>
            </details>`
        ],
        exam: [
            { question: "En un escenario 3PL (Third Party Logistics), ¿cuál es el objetivo arquitectónico del módulo 'Warehouse Billing' de SAP EWM?", options: [{text:"Capturar, calcular y enviar a SAP SD todos los costos de los servicios de almacenamiento, empaque y manipulación (Putaway/Picking) para facturarlos al cliente dueño del inventario.", correct:true}, {text:"Pagar las nóminas de los operarios de montacargas a través de SAP HCM.", correct:false}, {text:"Cobrar los impuestos de aduana a los proveedores extranjeros.", correct:false}, {text:"Imprimir facturas en las pistolas de radiofrecuencia (RF).", correct:false}] },
            { question: "Dentro del EWM Billing, ¿qué es un 'Measurement Service' (Servicio de Medición)?", options: [{text:"Una consulta o algoritmo programado que barre EWM (ej. contando HUs almacenadas o Warehouse Orders completadas) para generar las cantidades facturables (BDRs).", correct:true}, {text:"El proceso físico de pesar un camión en la báscula de entrada (Yard Management).", correct:false}, {text:"Una herramienta para medir el desgaste de las llantas de los montacargas.", correct:false}, {text:"Un sensor láser que mide las dimensiones de las cajas de cartón vacías.", correct:false}] },
            { question: "¿Cómo se denomina en SAP EWM a los servicios adicionales solicitados por el cliente, tales como emplayar palets, armar kits promocionales o etiquetar precios antes del despacho?", options: [{text:"Value-Added Services (VAS - Servicios de Valor Agregado).", correct:true}, {text:"Transportation Cross-Docking (TCD).", correct:false}, {text:"Post Goods Issue (PGI).", correct:false}, {text:"Storage Type Search Sequence (STSS).", correct:false}] },
            { question: "En la evolución de S/4HANA, ¿cuál es la mayor ventaja del modelo 'Embedded TM' (Transportation Management embebido) sobre la versión histórica Standalone?", options: [{text:"EWM y TM corren en el mismo servidor y base de datos, eliminando la pesada mensajería middleware (XML/SOAP) y los desfases de sincronización de documentos.", correct:true}, {text:"Es gratuito y de código abierto (Open Source).", correct:false}, {text:"Solo funciona si el almacén está operado por robots.", correct:false}, {text:"Permite usar bases de datos Oracle en lugar de HANA.", correct:false}] },
            { question: "En SAP TM, ¿qué documento técnico representa el requerimiento logístico puro de transporte de mercancía antes de asignarse a un camión específico?", options: [{text:"Freight Unit (FU).", correct:true}, {text:"Purchase Requisition (PR).", correct:false}, {text:"Handling Unit (HU).", correct:false}, {text:"Warehouse Order (WO).", correct:false}] },
            { question: "En SAP TM, ¿qué documento técnico representa la capacidad consolidada, es decir, el camión físico (con chofer y placa) planificado para ejecutar el viaje?", options: [{text:"Freight Order (FO).", correct:true}, {text:"Sales Order (SO).", correct:false}, {text:"Inbound Delivery (IBD).", correct:false}, {text:"Measurement Document.", correct:false}] },
            { question: "Con el nuevo framework ASR (Advanced Shipping & Receiving) de S/4HANA, ¿qué objeto histórico y redundante de EWM queda obsoleto al sincronizarse directamente con el Freight Order de TM?", options: [{text:"El Transportation Unit (TU) de EWM Yard Management.", correct:true}, {text:"El Material Master (MARA).", correct:false}, {text:"El Storage Bin (/SCWM/LS01).", correct:false}, {text:"El Inbound Delivery de SAP ERP.", correct:false}] },
            { question: "Si el optimizador 3D de SAP TM ('Load Planning') detecta que un camión tiene múltiples paradas (Stop-Sequence: descargar primero en Cali, luego en Buenaventura), ¿cómo afecta esto a EWM?", options: [{text:"TM dicta el orden de carga a EWM; EWM altera sus olas y tareas para cargar al fondo los palets de Buenaventura y en la puerta los de Cali (LIFO en el camión).", correct:true}, {text:"EWM ignora a TM y carga todo alfabéticamente.", correct:false}, {text:"TM cancela el camión porque no permite múltiples paradas.", correct:false}, {text:"EWM cobra el doble de facturación al transportista.", correct:false}] },
            { question: "¿Qué proceso de integración ocurre si, durante el empaque en EWM, las dimensiones reales del palet resultan ser 20% más grandes de lo que TM planificó originalmente?", options: [{text:"EWM actualiza el volumen real de la HU; TM recibe la notificación instantánea, recalcula la ocupación del camión (Load Planning) y ajusta los costos del flete.", correct:true}, {text:"TM rechaza el palet, obligando a EWM a destruir la mercancía sobrante.", correct:false}, {text:"EWM manda el exceso por correo postal a expensas de la compañía.", correct:false}, {text:"El ERP genera un reporte de fraude.", correct:false}] },
            { question: "En un escenario de 'Transit Warehousing' (Hub aeroportuario/courier), ¿cuál es la característica operativa principal de SAP EWM?", options: [{text:"EWM no necesita conocer el producto interno; opera 'a ciegas' guiado por etiquetas externas de TM (AWB), moviendo cajas cerradas hacia los palets aéreos (ULDs).", correct:true}, {text:"EWM desarma todas las cajas para inspeccionar cada cable interno y contar el inventario en el ERP.", correct:false}, {text:"EWM solo permite movimientos manuales sin pistolas RF.", correct:false}, {text:"El módulo TM se desactiva permanentemente.", correct:false}] },
            { question: "Después de que un camión sale del almacén EWM (PGI), ¿qué documento de TM es el puente final para crear la cuenta por pagar al transportista en SAP MM/FI?", options: [{text:"Freight Settlement Document (FSD).", correct:true}, {text:"Outbound Delivery Order (ODO).", correct:false}, {text:"Proof of Delivery (POD).", correct:false}, {text:"Customer Invoice (VF01).", correct:false}] },
            { question: "Si un cliente reporta mercancía dañada por culpa del transportista y se registra una 'Discrepancia' (Damage Recording) en la aplicación de llegada ASR, ¿qué sucede en TM?", options: [{text:"TM retiene o bloquea temporalmente el proceso de Freight Settlement (liquidación de pago) al transportista hasta que el departamento de finanzas resuelva la disputa.", correct:true}, {text:"TM aprueba el pago e incrementa un bono de premio al transportista.", correct:false}, {text:"SAP borra el camión de la base de datos.", correct:false}, {text:"El almacén EWM expulsa automáticamente al cliente de la base de datos.", correct:false}] },
            { question: "En materia de Compliance, ¿qué sucede si la integración TM-EWM detecta la carga simultánea de mercancías peligrosas incompatibles (Dangerous Goods - DG) en el mismo Freight Order?", options: [{text:"El sistema emite errores críticos de segregación; EWM bloquea las Warehouse Tasks de carga hacia ese andén y TM detiene el Freight Order.", correct:true}, {text:"El sistema imprime advertencias, pero permite el envío sin restricciones.", correct:false}, {text:"EWM apaga el servidor HANA para prevenir incendios.", correct:false}, {text:"TM aumenta el seguro de vida del chofer automáticamente pero autoriza la salida.", correct:false}] },
            { question: "¿Cómo se comunican internamente TM y EWM en la arquitectura 'Embedded S/4HANA' moderna sin utilizar TUs?", options: [{text:"Comparten la misma base de datos (HANA) y los mismos objetos de negocio (Documentos de Transporte de ASR), eliminando la mensajería XML asíncrona.", correct:true}, {text:"A través de correos electrónicos internos de SAP Business Workplace.", correct:false}, {text:"Mediante llamadas telefónicas de los planificadores.", correct:false}, {text:"Utilizando discos duros externos (USB).", correct:false}] },
            { question: "¿Qué transacción/consola utiliza un supervisor logístico (3PL) para generar el Billing Document Request (BDR) tras recolectar los Measurement Services del mes?", options: [{text:"La transacción de Liquidación de Servicios de Almacén (Warehouse Billing Settlement).", correct:true}, {text:"La creación de pedidos de compras ME21N.", correct:false}, {text:"El planificador MRP (MD04).", correct:false}, {text:"El registro de tiempos de empleados CAT2.", correct:false}] },
            { question: "Si un cliente 3PL requiere cobrar 5 USD por cada palet recibido por el muelle de entrada, ¿qué mecanismo configuras?", options: [{text:"Un Measurement Service Transaccional en EWM que cuente las Warehouse Tasks de Putaway confirmadas para ese cliente y las transmita a SAP SD.", correct:true}, {text:"Una multa de recursos humanos.", correct:false}, {text:"Un descuento en la Orden de Venta estándar.", correct:false}, {text:"Un incremento en el precio promedio móvil del material.", correct:false}] },
            { question: "Si un cliente 3PL requiere cobrar 10 USD por metro cúbico ocupado en los racks al finalizar cada día, ¿qué mecanismo configuras?", options: [{text:"Un Measurement Service de Inventario (Snapshot) que fotografíe la ocupación volumétrica a medianoche y envíe los agregados a la facturación SD.", correct:true}, {text:"Un documento de inventario físico anual (PI).", correct:false}, {text:"Una orden de mantenimiento de activos fijos (SAP PM).", correct:false}, {text:"Un reporte de control de calidad IOT4.", correct:false}] },
            { question: "¿A qué módulo del ecosistema corporativo S/4HANA llegan los BDRs de EWM para generar la Factura Legal (Invoice) que se envía al cliente 3PL?", options: [{text:"SAP SD (Sales and Distribution).", correct:true}, {text:"SAP PP (Production Planning).", correct:false}, {text:"SAP QM (Quality Management).", correct:false}, {text:"SAP TM (Transportation Management).", correct:false}] },
            { question: "Bajo ASR, el Check-in y Check-out del camión en la puerta de la planta actualiza directamente el estado de:", options: [{text:"El Freight Order (FO).", correct:true}, {text:"La Orden de Producción (CO01).", correct:false}, {text:"El Maestro de Proveedores.", correct:false}, {text:"El Asiento Contable (Journal Entry).", correct:false}] },
            { question: "¿Cuál es el principal documento legal impreso generado por TM y entregado al chofer, que ampara la propiedad y ruta de la carga consolidada (ej. Bill of Lading)?", options: [{text:"El Waybill o Bill of Lading, asociado directamente al Freight Order y a los Dangerous Goods documents.", correct:true}, {text:"El recibo de nómina del almacén.", correct:false}, {text:"La lista de precios del supermercado.", correct:false}, {text:"El currículum del transportista.", correct:false}] }
        ]
    },
    {
        id: "s6_l1",
        semester: 6,
        type: "lab",
        title: "6.2 Lab Multi-Paso: Carga ASR (TM-EWM) y Facturación 3PL",
        duration: "2 Horas 30 Min • Consolidación Final",
        req: "s6_m1",
        description: "El Freight Order #99550 (Tractomula) ha llegado a la puerta para cargar mercancía de tu cliente 3PL. Realiza el Check-in (ASR), carga el palet con RF y emite la orden de facturación automática del almacén (Billing Document) por los servicios de despacho prestados.",
        simTask: { hint: "Fases: NWBC-FO -> CHECK-IN -> /SCWM/RFUI -> OUTBOUND-LOAD -> SCAN-SSCC -> LOAD-COMPLETE -> /SCWM/MON -> RUN-MEASUREMENT -> GENERATE-BDR." },
        simSteps: [
            { instruction: "Abrir TM Freight Order", expectedCmd: "NWBC-FO", hint: "NWBC-FO", successMessage: "> Freight Order 99550 abierto en Fiori/NWBC. Estado: Planeado." },
            { instruction: "Ejecutar Check-in de Tractomula", expectedCmd: "CHECK-IN", hint: "CHECK-IN", successMessage: "> Evento ARRIV_YARD marcado. Estado EWM/TM sincronizado a 'In Yard'." },
            { instruction: "Emular RF para Operario de Carga", expectedCmd: "/SCWM/RFUI", hint: "/SCWM/RFUI", successMessage: "> Terminal iniciada. Menú 'Loading by Freight Order'." },
            { instruction: "Iniciar Proceso de Carga", expectedCmd: "OUTBOUND-LOAD", hint: "OUTBOUND-LOAD", successMessage: "> ODO seleccionada. Rampa de carga 920 confirmada." },
            { instruction: "Escanear SSCC del Palet al Camión", expectedCmd: "SCAN-SSCC", hint: "SCAN-SSCC", successMessage: "> Palet 558000 cargado físicamente. TM Volumen actualizado al 100%." },
            { instruction: "Confirmar Fin de Carga (PGI)", expectedCmd: "LOAD-COMPLETE", hint: "LOAD-COMPLETE", successMessage: "> PGI Ejecutado. Camión despachado (Check-out). Costos FSD listos para pago." },
            { instruction: "Abrir Monitor Central de Facturación", expectedCmd: "/SCWM/MON", hint: "/SCWM/MON", successMessage: "> EWM Monitor cargado. Nodo 'Warehouse Billing'." },
            { instruction: "Extraer KPIs de la Jornada (Measurement)", expectedCmd: "RUN-MEASUREMENT", hint: "RUN-MEASUREMENT", successMessage: "> Measurement Service: 1 Palet Cargado (Tarifa $15 USD)." },
            { instruction: "Generar Cobro al Cliente 3PL (BDR)", expectedCmd: "GENERATE-BDR", hint: "GENERATE-BDR", successMessage: "> Billing Document Request (BDR) enviado a SAP SD exitosamente. FACTURACIÓN CERRADA." }
        ]
    },
    {
        id: "s6_m2",
        semester: 6,
        type: "theory",
        title: "6.3 Arquitectura Analítica, Core Data Services (CDS) y APIs EWM",
        duration: "30 Horas • Desarrollo y Cloud Extensibility",
        req: "s6_l1",
        description: "El futuro de SAP. Abandona los pesados reportes ABAP ALV y abraza la arquitectura 'In-Memory'. Aprende cómo SAP S/4HANA utiliza Vistas CDS (Core Data Services) empujadas a la base de datos HANA para renderizar tableros Fiori Elements (KPI Dashboards) en milisegundos. Explora cómo exponer los datos de EWM al exterior usando OData v4 APIs para integración con la nube (BTP).",
        review: "Regla de Oro: En S/4HANA (Code-to-Data paradigm), los cálculos ya no se hacen en la capa de aplicación ABAP, sino que se delegan (Push-down) a los motores nativos de la base de datos HANA mediante Vistas CDS. Esto permite que millones de líneas de inventario se sumaricen en un gráfico de barras Fiori en 120 milisegundos y se expongan como APIs OData.",
        pages: [
            `<h3>Capítulo 1: El Paradigma "Code-to-Data"</h3>
            <p>La revolución de HANA. ¿Por qué traer los datos al código si el código puede ir a los datos?</p>
            <details>
                <summary>Ver explicación a fondo (El Fin de los Bucles ABAP)</summary>
                <div class="details-content">
                    <p>En el antiguo ERP (R/3), el programa ABAP solicitaba a la base de datos (Oracle/SQL) 1 millón de registros, los cargaba en una tabla interna en memoria RAM de aplicación (Data-to-Code) y luego sumaba los valores con un ciclo <code>LOOP</code>. Esto tardaba minutos u horas. En S/4HANA, el paradigma es <strong>Code-to-Data</strong>: le envías la orden matemática (mediante CDS Views) directo al motor de HANA, y HANA te devuelve en milisegundos únicamente el gran total (1 solo registro).</p>
                </div>
            </details>`,

            `<h3>Capítulo 2: ABAP Core Data Services (CDS Views)</h3>
            <p>El estándar moderno de modelado de datos en S/4HANA. SQL con esteroides y semántica de negocio.</p>
            <details>
                <summary>Ver explicación a fondo (Semántica y Anotaciones)</summary>
                <div class="details-content">
                    <p>Una <strong>Vista CDS</strong> (Core Data Service) no es solo un `+`VIEW`+` de SQL. Además de hacer <em>Joins</em> entre <code>/SCWM/AQUA</code> (Inventario) y <code>/SCWM/WHO</code> (Órdenes), una CDS View incluye <strong>Anotaciones (@Annotations)</strong>. Por ejemplo, la anotación <code>@OData.publish: true</code> convierte automáticamente esa vista SQL en un servicio web API RESTful listo para la nube, sin programar una sola línea de backend.</p>
                </div>
            </details>`,

            `<h3>Capítulo 3: Virtual Data Model (VDM)</h3>
            <p>La pirámide de datos de SAP S/4HANA: Vistas Básicas, Compuestas y de Consumo.</p>
            <details>
                <summary>Ver explicación a fondo (Arquitectura de Capas CDS)</summary>
                <div class="details-content">
                    <p>SAP prohíbe que el desarrollador front-end lea directamente las tablas físicas crudas. Todo pasa por el <strong>VDM (Modelo de Datos Virtual)</strong>. 1) <strong>Basic Views (Private):</strong> Leen las tablas 1:1. 2) <strong>Composite Views:</strong> Unen las Basic Views aplicando cálculos de negocio (ej. "Palets vencidos = Fecha Actual > SLED"). 3) <strong>Consumption Views (C-Views):</strong> Son las que se exponen a Fiori, optimizadas para los gráficos y filtros de la interfaz gráfica.</p>
                </div>
            </details>`,

            `<h3>Capítulo 4: Fiori Elements y KPI Dashboards</h3>
            <p>Creación de interfaces gráficas empresariales (UI) sin escribir código JavaScript ni HTML.</p>
            <details>
                <summary>Ver explicación a fondo (Smart Templates)</summary>
                <div class="details-content">
                    <p>Con SAPUI5 puro, un desarrollador tardaba meses en programar una app con tablas, filtros y Excel export. <strong>Fiori Elements</strong> lee las anotaciones semánticas de la CDS View de EWM (ej. <code>@UI.lineItem</code>) y <em>renderiza la pantalla entera automáticamente</em>. Los gerentes logísticos usan la app "KPI Workspace" para crear gráficos de "Productividad de Outbound" en vivo usando drag-and-drop sobre estas vistas CDS.</p>
                </div>
            </details>`,

            `<h3>Capítulo 5: Embedded Analytics en SAP EWM</h3>
            <p>Reportes gráficos y análisis predictivo ejecutándose en la misma máquina transaccional.</p>
            <details>
                <summary>Ver explicación a fondo (La Muerte de la Extracción Nocturna)</summary>
                <div class="details-content">
                    <p>Históricamente, los reportes analíticos pesados paralizaban el sistema de almacén, por lo que los datos se extraían en la madrugada hacia SAP BW (Business Warehouse). Con <strong>S/4HANA Embedded Analytics</strong>, puedes tener tableros en vivo (ej. "Cuellos de botella de Putaway hace 1 minuto") corriendo en el mismo servidor de EWM transaccional, gracias a la capacidad de HANA de procesar OLTP y OLAP simultáneamente sin bloqueos.</p>
                </div>
            </details>`,

            `<h3>Capítulo 6: OData APIs (RESTful) para S/4HANA EWM</h3>
            <p>El puente estándar y moderno para integrar EWM con aplicaciones web, celulares de terceros y software externo.</p>
            <details>
                <summary>Ver explicación a fondo (De RFC a OData v4)</summary>
                <div class="details-content">
                    <p>Ya no enviamos archivos planos (TXT) por FTP ni usamos pesados IDocs de los 90s para sistemas web. SAP expone APIs estándar (ej. <em>WarehouseOrder API</em> o <em>InboundDelivery API</em>) basadas en el protocolo <strong>OData v2/v4 (REST/JSON)</strong>. Una startup que desarrolla drones para inventario puede llamar a la API de EWM con un <code>GET /sap/opu/odata/.../WarehouseTaskSet</code> para recibir las coordenadas de vuelo en JSON al instante.</p>
                </div>
            </details>`,

            `<h3>Capítulo 7: SAP Business Technology Platform (BTP)</h3>
            <p>El entorno de innovación en la nube de SAP. Amplía EWM sin tocar el código central (Clean Core).</p>
            <details>
                <summary>Ver explicación a fondo (Side-by-Side Extensibility)</summary>
                <div class="details-content">
                    <p>Los clientes antiguos destrozaban el código estándar (Core) de SAP con modificaciones Z (User Exits/BAdIs salvajes) que hacían imposible actualizar el ERP. El nuevo dogma es el <strong>Clean Core</strong>. Si necesitas una app compleja de Inteligencia Artificial para predecir atascos en EWM, la programas en la nube pública (SAP BTP) usando NodeJS o Java, y esta app en la nube se conecta a tu S/4HANA EWM local mediante APIs OData (Side-by-Side).</p>
                </div>
            </details>`,

            `<h3>Capítulo 8: Cloud Connector</h3>
            <p>El túnel seguro de grado militar que conecta tu almacén físico on-premise con SAP BTP en la nube.</p>
            <details>
                <summary>Ver explicación a fondo (VPN Inversa)</summary>
                <div class="details-content">
                    <p>Tu S/4HANA EWM está blindado tras el firewall corporativo de la fábrica y no tiene IP pública. El <strong>SAP Cloud Connector</strong> es un pequeño software instalado localmente que abre un túnel TLS saliente (VPN inversa) hacia SAP BTP. Gracias a esto, la app de drones en la nube puede leer los datos locales de EWM con máxima seguridad, sin necesidad de que el departamento de IT abra puertos entrantes peligrosos en el router principal.</p>
                </div>
            </details>`,

            `<h3>Capítulo 9: Event-Driven Architecture (Enterprise Messaging)</h3>
            <p>La nueva forma de avisar a otros sistemas. "EWM lanza un grito, y el que quiera lo escucha".</p>
            <details>
                <summary>Ver explicación a fondo (Publish-Subscribe Pattern)</summary>
                <div class="details-content">
                    <p>Antes, si EWM confirmaba un PGI, debía saber exactamente a qué 3 sistemas notificar de forma síncrona. Si uno estaba caído, fallaba todo. Ahora se usa <strong>SAP Event Mesh</strong>. EWM simplemente publica el evento asíncrono (ej. <code>GoodsIssueConfirmed</code>) en un bus de eventos (Topic). Un sistema CRM en AWS, una app móvil y una báscula pueden estar "suscritos" (Subscribers) a ese canal y reaccionar independientemente. Máxima escalabilidad.</p>
                </div>
            </details>`,

            `<h3>Capítulo 10: In-App Extensibility (Ampliaciones dentro de S/4HANA)</h3>
            <p>Agregar un campo personalizado (Z) a un documento sin escribir código.</p>
            <details>
                <summary>Ver explicación a fondo (Key User Extensibility)</summary>
                <div class="details-content">
                    <p>Necesitas agregar el campo "Temperatura del Camión" a la Inbound Delivery. Antes requerías semanas de un desarrollador ABAP (modificando tablas, pantallas y estructuras). Hoy, usas la app Fiori <strong>Custom Fields and Logic</strong>. En 5 clics creas el campo, y el sistema automáticamente altera la base de datos HANA, las Vistas CDS y las APIs OData en background. En 10 minutos está listo para producción (Key User Extensibility).</p>
                </div>
            </details>`,

            `<h3>Capítulo 11: Machine Learning en EWM (SAP ISLM)</h3>
            <p>Inteligencia artificial embebida para pronosticar fallos o predecir tiempos de entrega.</p>
            <details>
                <summary>Ver explicación a fondo (Intelligent Scenario Lifecycle Management)</summary>
                <div class="details-content">
                    <p>La base de datos HANA posee bibliotecas nativas de Machine Learning (PAL - Predictive Analysis Library). EWM puede usarlas para predecir si una Outbound Delivery va a retrasarse basándose en el clima, el tráfico de la hora y el desempeño histórico del operario asignado, alertando al planificador en Fiori antes de que el camión siquiera llegue a la puerta.</p>
                </div>
            </details>`,

            `<h3>Capítulo 12: EWM Warehouse Monitor (/SCWM/MON) vs Fiori Dashboards</h3>
            <p>¿Cuándo usar el monitor clásico y cuándo usar los analíticos de Fiori?</p>
            <details>
                <summary>Ver explicación a fondo (Operacional vs Analítico)</summary>
                <div class="details-content">
                    <p>El <strong>Warehouse Monitor (/SCWM/MON)</strong> en SAP GUI es una herramienta <em>Operacional y Táctica</em>. Los supervisores lo usan para corregir errores, desbloquear WOs, cancelar tareas (Transaction Processing). Los <strong>Fiori CDS Dashboards</strong> son herramientas <em>Analíticas y Estratégicas</em>. Los gerentes las usan para ver gráficos circulares, tendencias semanales y cuellos de botella globales, pero generalmente no para intervenir en una caja específica rota.</p>
                </div>
            </details>`,

            `<h3>Capítulo 13: Core Data Services en Autorizaciones (DCL)</h3>
            <p>Seguridad a nivel de fila. Un gerente regional solo puede ver gráficamente los almacenes de su región.</p>
            <details>
                <summary>Ver explicación a fondo (Data Control Language)</summary>
                <div class="details-content">
                    <p>La seguridad de los reportes ya no se hace en la interfaz visual. Al crear una Vista CDS, el desarrollador asocia un objeto de autorización de SAP en un script <strong>DCL (Data Control Language)</strong>. Si el Gerente de Colombia entra a la app Fiori global, el motor de HANA filtra a nivel de SQL (Row-level security) asegurando que el gerente no pueda ver los inventarios del Centro de México, bloqueando fugas de datos de raíz.</p>
                </div>
            </details>`,

            `<h3>Capítulo 14: Migración del código antiguo al nuevo paradigma (AMDP)</h3>
            <p>ABAP Managed Database Procedures. Cómo empujar procedimientos complejos a HANA.</p>
            <details>
                <summary>Ver explicación a fondo (SQLScript nativo)</summary>
                <div class="details-content">
                    <p>Si la lógica de negocio es tan compleja que una Vista CDS no basta (ej. el algoritmo matricial de consolidación de cajas de EWM), los arquitectos escriben <strong>AMDP (ABAP Managed Database Procedures)</strong>. Básicamente, se incrusta código nativo SQLScript de HANA (Loops de base de datos ultrarrápidos) dentro de una clase ABAP, fusionando lo mejor del mantenimiento tradicional con la potencia paralela de la memoria in-memory.</p>
                </div>
            </details>`,

            `<h3>Capítulo 15: Fin del Viaje del Arquitecto EWM</h3>
            <p>La maestría técnica exige visión holística: el almacén no es una isla, es el corazón del comercio digital.</p>
            <details>
                <summary>Ver explicación a fondo (De Configurador a Arquitecto)</summary>
                <div class="details-content">
                    <p>¡Felicidades! Has completado el programa maestro. Como Arquitecto S/4HANA EWM, tu valor ya no reside en memorizar transacciones, sino en comprender cómo la Estructura Empresarial (Semestre 1) fluye hacia la Física del Inbound (Semestre 2) y el Ritmo del Outbound (Semestre 3), cómo la mecatrónica MFS y los recursos humanos escalan la operación (Semestre 4), cómo la industria de la Calidad y Producción dictan las reglas logísticas (Semestre 5) y finalmente, cómo exponer toda esta maquinaria mediante APIs modernas a la Inteligencia Artificial y Fiori (Semestre 6). Estás listo para certificar y liderar la Supply Chain global.</p>
                </div>
            </details>`
        ],
        exam: [
            { question: "¿En qué consiste el paradigma tecnológico 'Code-to-Data' introducido por la base de datos SAP HANA?", options: [{text:"Delegar la carga de cálculos masivos (sumas, agrupaciones) directamente a los motores de la base de datos en memoria (HANA), en lugar de traer millones de registros a la memoria RAM de aplicación ABAP.", correct:true}, {text:"Extraer la información a discos duros lentos para archivado.", correct:false}, {text:"Imprimir en papel todo el código fuente.", correct:false}, {text:"Usar bases de datos Oracle como almacenamiento en la nube.", correct:false}] },
            { question: "En el moderno S/4HANA, ¿qué es una Vista CDS (Core Data Services)?", options: [{text:"Una vista SQL avanzada que, además de realizar uniones de tablas (Joins), integra semántica de negocio y anotaciones directas para seguridad, interfaces Fiori (UI) y publicación como servicios web.", correct:true}, {text:"Una pantalla verde antigua de SAP GUI.", correct:false}, {text:"Un disco de instalación de software en CD-ROM.", correct:false}, {text:"Una herramienta de recursos humanos para contratar gerentes.", correct:false}] },
            { question: "¿Qué característica poderosa proporcionan las 'Anotaciones' (@Annotations) dentro del código fuente de una Vista CDS?", options: [{text:"Permiten inyectar comportamientos automáticos, como @OData.publish:true, que expone inmediatamente la consulta de base de datos como una API RESTful sin tener que programar infraestructura backend.", correct:true}, {text:"Permiten escribir comentarios de texto para que los lean los auditores legales.", correct:false}, {text:"Eliminan por completo la necesidad de tener tablas SQL.", correct:false}, {text:"Apagan el servidor HANA durante los fines de semana.", correct:false}] },
            { question: "En la arquitectura analítica de SAP (Virtual Data Model - VDM), ¿qué diferencia hay entre las Basic Views y las Consumption Views (C-Views)?", options: [{text:"Las Basic Views leen las tablas físicas 1:1 (son privadas/base). Las Consumption Views están en la punta de la pirámide, adaptadas con filtros y gráficos específicos para ser consumidas directamente por SAP Fiori.", correct:true}, {text:"Las Basic Views están en Fiori y las Consumption Views son para Oracle.", correct:false}, {text:"Las Basic Views son gratuitas y las Consumption Views cuestan dinero.", correct:false}, {text:"Son exactamente lo mismo.", correct:false}] },
            { question: "¿Qué herramienta del ecosistema SAP UI permite a los desarrolladores o arquitectos generar aplicaciones Fiori (listas, tablas y dashboards) leyendo automáticamente las anotaciones de las Vistas CDS sin programar JavaScript/HTML5 desde cero?", options: [{text:"SAP Fiori Elements (Smart Templates).", correct:true}, {text:"Microsoft Excel.", correct:false}, {text:"Adobe Acrobat Reader.", correct:false}, {text:"SAP Logon Pad (GUI).", correct:false}] },
            { question: "¿Cuál es el beneficio de 'S/4HANA Embedded Analytics' en la operación diaria de EWM frente al uso histórico de SAP BW (Business Warehouse)?", options: [{text:"Permite ejecutar tableros y KPIs gráficos pesados en tiempo real directo sobre la misma máquina transaccional EWM sin bloquear el almacén, eliminando los retrasos (latencia) de la extracción nocturna.", correct:true}, {text:"Requiere comprar servidores nuevos cada año.", correct:false}, {text:"Obliga a detener el almacén durante 2 horas al día para procesar los datos.", correct:false}, {text:"Envía la información de inventario por fax a los clientes.", correct:false}] },
            { question: "Para integrar SAP S/4HANA EWM con aplicaciones externas modernas (como drones, apps móviles de clientes en AWS o Azure), ¿qué protocolo estándar y ligero expone SAP a través del SAP Gateway?", options: [{text:"OData v2/v4 APIs (RESTful web services respondiendo típicamente en JSON o XML).", correct:true}, {text:"Floppy Disks de 3.5 pulgadas.", correct:false}, {text:"Documentos físicos impresos en matricial.", correct:false}, {text:"Mensajes SMS analógicos.", correct:false}] },
            { question: "¿Qué es 'SAP Business Technology Platform' (BTP) en el paradigma del 'Clean Core' corporativo?", options: [{text:"El entorno y plataforma en la nube (PaaS) de SAP donde los desarrolladores construyen integraciones complejas y apps satélite (Side-by-Side Extensibility) sin contaminar o modificar el código fuente estándar del servidor S/4HANA local.", correct:true}, {text:"Una empresa de transporte de camiones físicos.", correct:false}, {text:"Un sistema operativo para teléfonos Android.", correct:false}, {text:"La herramienta para compilar código ABAP clásico en terminales de texto.", correct:false}] },
            { question: "En una arquitectura donde el almacén SAP EWM se aloja de forma local (On-Premise) en los servidores corporativos físicos, ¿cómo se conecta de manera segura a las apps y servicios de la nube pública SAP BTP sin abrir puertos de entrada vulnerables en el firewall?", options: [{text:"Utilizando SAP Cloud Connector, que establece un túnel VPN saliente (TLS) desde la red interna hacia la nube BTP de SAP, garantizando control y cifrado de grado militar.", correct:true}, {text:"Publicando la base de datos HANA abierta a Internet para todos.", correct:false}, {text:"Mediante memorias USB enviadas por correo certificado.", correct:false}, {text:"Cambiando temporalmente las contraseñas a '1234'.", correct:false}] },
            { question: "A diferencia de las comunicaciones síncronas clásicas punto-a-punto (API/RFC) que fallan si el receptor está caído, ¿qué arquitectura moderna usa SAP Event Mesh (Event-Driven Architecture) para ser resiliente?", options: [{text:"Publish-Subscribe Pattern: EWM publica eventos de negocio ('Se confirmó un despacho') asíncronamente en un Bus o Topic en la nube, y múltiples sistemas suscritos pueden consumirlos a su propio ritmo sin bloquear a EWM.", correct:true}, {text:"Llamadas telefónicas de emergencia del gerente.", correct:false}, {text:"Transmisión de radio FM local.", correct:false}, {text:"Peticiones sincrónicas que congelan EWM hasta que el sistema destino responde.", correct:false}] },
            { question: "Si el negocio logístico exige añadir un campo personalizado (Z) llamado 'Temperatura Camión' al documento Inbound Delivery de EWM, ¿qué herramienta de S/4HANA permite a un Key User hacerlo en minutos sin requerir un programador ABAP?", options: [{text:"La aplicación Fiori 'Custom Fields and Logic' (In-App Extensibility), que adapta automáticamente la BD, CDS y APIs subyacentes.", correct:true}, {text:"Un script en lenguaje C++ ensamblado desde cero.", correct:false}, {text:"Alterar directamente las celdas en SQL Developer como DBA.", correct:false}, {text:"No se pueden agregar campos en S/4HANA EWM.", correct:false}] },
            { question: "En el mundo analítico, ¿qué rol juegan los archivos DCL (Data Control Language) unidos a una Vista CDS de EWM?", options: [{text:"Aplican reglas de autorización y seguridad a nivel de fila (Row-Level Security), bloqueando directamente en la base de datos SQL el acceso a datos (ej. un centro logístico) que el usuario no tiene permiso de ver.", correct:true}, {text:"Generan colores bonitos en el gráfico de pastel de Fiori.", correct:false}, {text:"Borran el disco duro si detectan un ataque cibernético.", correct:false}, {text:"Traducen las consultas de inglés a español.", correct:false}] },
            { question: "¿Cuál es la distinción primordial en los casos de uso entre el EWM Warehouse Monitor (/SCWM/MON) y un Dashboard de KPIs en SAP Fiori CDS?", options: [{text:"El Monitor es táctico/operativo (permite resolver excepciones, cancelar WTs o interactuar activamente). Los Fiori Dashboards son analíticos/estratégicos (para visualizar métricas históricas, tendencias y sumatorias directivas).", correct:true}, {text:"Fiori solo funciona en blanco y negro, el Monitor es a color.", correct:false}, {text:"No hay diferencia, son el mismo programa con distinto nombre.", correct:false}, {text:"El Monitor es solo para Finanzas (FI) y Fiori es solo para EWM.", correct:false}] },
            { question: "Cuando un algoritmo logístico requiere matemáticas iterativas tan complejas y densas que las sentencias SQL estándar de una Vista CDS no son suficientes, ¿qué tecnología permite a los desarrolladores empujar lógicas potentes a la memoria de HANA?", options: [{text:"AMDP (ABAP Managed Database Procedures), donde el código nativo de HANA (SQLScript) se incrusta y encapsula dentro de clases ABAP.", correct:true}, {text:"BAdIs clásicas corriendo en la RAM del servidor de aplicación.", correct:false}, {text:"Macros de Microsoft Excel.", correct:false}, {text:"SmartForms.", correct:false}] },
            { question: "¿Qué característica de SAP HANA (PAL) permite implementar algoritmos predictivos en EWM, como prever demoras en salidas basándose en el clima y la eficiencia histórica?", options: [{text:"Las bibliotecas nativas de Machine Learning e Inteligencia Artificial embebidas (ISLM), que entrenan y ejecutan predicciones directamente sobre los datos operativos sin exportarlos.", correct:true}, {text:"Un generador de números aleatorios simple.", correct:false}, {text:"El catálogo de piezas de repuesto en formato PDF.", correct:false}, {text:"El sistema de control de accesos (molinetes) de la garita de seguridad.", correct:false}] },
            { question: "En S/4HANA In-App Extensibility, ¿qué tecnología se utiliza si un Key User necesita aplicar una regla de validación de negocio simple en Fiori (ej. si campo X > 10, mostrar error)?", options: [{text:"ABAP para Cloud (Restricted ABAP / Cloud BAdIs), que es un subconjunto seguro del lenguaje ABAP que garantiza que la lógica no romperá el sistema en futuras actualizaciones (Clean Core).", correct:true}, {text:"Ensamblador de 16 bits.", correct:false}, {text:"BAdIs clásicas sin restricciones donde se puede borrar toda la base de datos.", correct:false}, {text:"Modificación del kernel de Linux de SAP.", correct:false}] },
            { question: "Si creas una CDS View Consumption en S/4HANA EWM, ¿cómo es que SAP Fiori sabe que debe presentar un 'Gráfico de Barras' en lugar de una simple tabla al usuario final?", options: [{text:"Porque el desarrollador inyectó las Anotaciones de Interfaz Gráfica de Fiori Elements (@UI.chart, @UI.lineItem) directamente en el código de la Vista CDS, indicando el tipo de renderizado esperado.", correct:true}, {text:"Fiori adivina aleatoriamente el gráfico cada vez que el usuario se conecta.", correct:false}, {text:"El gerente llama a soporte técnico de SAP para configurar el gráfico manualmente.", correct:false}, {text:"HANA envía un correo pidiendo instrucciones al usuario.", correct:false}] },
            { question: "En un ecosistema BTP (Business Technology Platform) integrado a EWM local (On-Premise), ¿cómo se considera arquitectónicamente a la aplicación en la nube que consume las APIs de EWM para pronosticar stock?", options: [{text:"Una aplicación de extensibilidad paralela o Side-by-Side Extensibility, que escala el poder de cómputo en AWS/Azure sin poner en riesgo la máquina EWM local.", correct:true}, {text:"Un virus de red.", correct:false}, {text:"Una versión pirata de SAP.", correct:false}, {text:"Un add-on (plug-in) que se instala con CD-ROM en el servidor físico local.", correct:false}] },
            { question: "¿Cuál de las siguientes afirmaciones describe mejor el verdadero rol moderno de un 'Consultor Arquitecto Senior' en SAP S/4HANA EWM (como tú al finalizar este curso)?", options: [{text:"Un orquestador holístico que no solo configura almacenes, sino que entiende cómo la EWM se integra con Finanzas, Manufactura, Calidad, Mecatrónica y APIs modernas para construir la Cadena de Suministro Digital del futuro.", correct:true}, {text:"Alguien que memoriza transacciones antiguas pero se niega a usar Fiori o CDS.", correct:false}, {text:"Un operador de montacargas que aprobó un examen teórico.", correct:false}, {text:"Un desarrollador web frontend que no sabe nada de logística.", correct:false}] },
            { question: "¿Cuál es la misión tecnológica de S/4HANA como pilar en la revolución logística y Supply Chain?", options: [{text:"Convertir operaciones complejas, asiladas y reactivas en procesos empresariales integrados, en tiempo real (In-Memory), predecibles y escalables hacia ecosistemas de automatización y nube (Intelligent Enterprise).", correct:true}, {text:"Hacer que los reportes se impriman con letras más oscuras en papel.", correct:false}, {text:"Cobrar suscripciones más baratas para bases de datos de texto plano.", correct:false}, {text:"Vender montacargas diésel pintados de color azul corporativo.", correct:false}] }
        ]
    },
    {
        id: "s6_l2",
        semester: 6,
        type: "lab",
        title: "6.4 Lab Multi-Paso: Creación Analítica (CDS, API & Fiori)",
        duration: "2 Horas 30 Min • Certificación Arquitecto Cloud",
        req: "s6_m2",
        description: "El Director de Logística requiere ver en su celular la eficiencia del almacén. Asume el rol de Arquitecto HANA: consulta las tablas transaccionales EWM, publica una CDS View como API OData RESTful (Code-to-Data), y configura el Smart Template en el KPI Workspace de Fiori Elements. Celebra la culminación de tu maestría.",
        simTask: { hint: "Fases: HANA-STUDIO -> CREATE-CDS-VIEW -> ADD-ODATA-ANNOTATION -> ACTIVATE-API -> FIORI-LAUNCHPAD -> KPI-WORKSPACE -> LINK-API -> PUBLISH-DASHBOARD -> MASTERY-ACHIEVED." },
        simSteps: [
            { instruction: "Iniciar Entorno de Desarrollo (Eclipse/HANA)", expectedCmd: "HANA-STUDIO", hint: "HANA-STUDIO", successMessage: "> SAP HANA Studio (ABAP Development Tools - ADT) iniciado." },
            { instruction: "Codificar CDS View (Consumption)", expectedCmd: "CREATE-CDS-VIEW", hint: "CREATE-CDS-VIEW", successMessage: "> Vista 'ZC_EWM_Productivity' creada uniendo /SCWM/WHO y /SCWM/RSRC." },
            { instruction: "Inyectar Anotaciones de API y UI", expectedCmd: "ADD-ODATA-ANNOTATION", hint: "ADD-ODATA-ANNOTATION", successMessage: "> @OData.publish:true y @UI.chart inyectados. SQLScript compilado y empujado a Base de Datos." },
            { instruction: "Activar Servicio OData (SAP Gateway)", expectedCmd: "ACTIVATE-API", hint: "ACTIVATE-API", successMessage: "> RESTful API Endpoint Activo: /sap/opu/odata/sap/ZC_EWM_PRODUCTIVITY_CDS" },
            { instruction: "Abrir Entorno Directivo Web", expectedCmd: "FIORI-LAUNCHPAD", hint: "FIORI-LAUNCHPAD", successMessage: "> Fiori Launchpad logueado. Perfil: Director Global Supply Chain." },
            { instruction: "Entrar al Modelador Analítico", expectedCmd: "KPI-WORKSPACE", hint: "KPI-WORKSPACE", successMessage: "> App 'Manage KPIs and Reports' cargada (Fiori Elements Smart Templates)." },
            { instruction: "Enlazar Gráfico con API CDS", expectedCmd: "LINK-API", hint: "LINK-API", successMessage: "> Datasource enlazado. Eje X (Horas), Eje Y (Warehouse Orders). Datos Live en 115 milisegundos." },
            { instruction: "Publicar Dashboard en Catálogo", expectedCmd: "PUBLISH-DASHBOARD", hint: "PUBLISH-DASHBOARD", successMessage: "> App Fiori creada y publicada en el catálogo directivo." },
            { instruction: "Recibir Certificación Global EWM", expectedCmd: "MASTERY-ACHIEVED", hint: "MASTERY-ACHIEVED", successMessage: "> SEMESTRES 1 a 6 SUPERADOS. Eres oficialmente Arquitecto Consultor Senior de SAP S/4HANA EWM. Misión cumplida." }
        ]
    }
];
