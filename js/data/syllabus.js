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
];
