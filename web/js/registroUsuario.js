/*------------------------------------------------------------------------
 File        : Plantilla Sencilla Kendo
 Author(s)   : Alex G.M.
 Created     : Tue Ago 20 10:27:47 COT 2015
 Notes       : Derechos Reservados Quantum Data System 
 ----------------------------------------------------------------------*/
//document.getElementById("table3").style.display = "none"; 
/*
 * 
 * @param {type} param
 * @indicador                   Variable uasa como bandera para determinar si el proceso que esta haciendo es de crear eliminar o actializar
 * @tamPopUp                    Variable para redimensionar el popup, ya el diseño del div que lo contiene se deforma al tener un labekl muy grande
 * @cInvisibles                 Arreglo para almacenar todos los campos invisibles en la plantilla se llena en la funcion cargaDatosTabla
 * @cNoEditable                 Arreglo para almacenar todos los campos no Editables se llena en la funcion cargaDatosTabla
 * @plConsulta                  Bandera para determinar si es una plantilla de solo consulta o tiene todo el crud  se usa en la funcion kendoTabla
 * @llaves                      
 */
var indicador = "";
var tamPopUp = '410px'; //variable para extender el tamano del popup en caso de que el nombre sea muy grande

var cInvisibles = [];
var cNoEditable = [];
var plConsulta = "";
var llaves = [];
var pillaves = ["picter_nit", "picProyecto", "picCapitulo", "piiTareasConsecutivo", "picDescripcion", "pidFechainicio", "pidFechafinal", "piiEstado", "picResponsable"];
var inputs = "";
var inputsType = "";
var inputsNameSer = "";
var x = document.URL.split("BizSolo/");
var url = x[0] + "BizSolo/";
var titulos = [];
var nomApp = "Tareas";

var instance = 0;
var lookUpQuemado = []; //para utilizarlo en kendo , especificamente si el dato esta como un campo numerico
var varcotejalookup = ["ter-nit", "Proyecto", "Capitulo", "TareasConsecutivo", "Descripcion", "Fechainicio", "Fechafinal", "Estado", "Responsable"]; //variable para cotejar con los nombres de los campos que vienen en el lookup
////////////////////////////busqueda Extendida/////////////////////////////////////
var jsonAppAbl = {
    "EmpresaCliente": "", "Proyecto": "", "Capitulo": "", "Consecutivo": "", "Descripcion": "", "FechaInicio": "", "FechaFinal": "", "Estado": "", "UsuarioResponsable": ""
};
var arrglojoinD = ["EmpresaCliente", "Proyecto", "Capitulo", "Consecutivo"];
var arrglojoinC = ["EmpresaCliente", "Proyecto", "Capitulo", "TareasConsecutivo"];
var typeItem = ["string", "string", "string", "number", "editor", "date", "date", "number", "string"]; //Tipo de Dato al cual pertenece dicho input
var arrglojLinkURL = ["actaUsuario"];
var arrgloLinkCampo = ["UsuarioResponsable"];
var arrgloRelaCampo = ["IdentificaciondeUsuario"];
//Abl tiene que generarme un json  parecido para hacer colocar los vvalores por defecto en el popUp de guardar y crear
var ArregloAppAbl = ["picter_nit", "picProyecto", "picCapitulo", "piiTareasConsecutivo", "picDescripcion", "pidFechainicio", "pidFechafinal", "piiEstado", "picResponsable"];
//arreglo para hacerla busqueda por defecto en el sir, en caso de que sea detalle
//parametros usados en la funcion cargar
var jsonCUPop = {};
var AccPopUp = "";
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var filasSum = [];
var seriesg = "";
var grilla = "";
var titulo = "Editar";
var clickGrilla;
var arregloClase;
var text = '[' +
        '{"boolID":"si"},' +
        '{"boolID":"no"}' +
        ']';
var arrLlavesServBackEndCUD = [];//llaves que se llena en la parte de cargar y funcionan para recorrer el json que me entrega BackEnd
var arrLlavesServBackEndSIR = [];//llaves que se llena en la parte de cargar y funcionan para recorrer el json que me entrega BackEnd
var strUriRest = "http://172.21.24.146:8810/rest/Base/BaseIntegrity/Tareas?dssearch";
var strUrlRestLook = "http://172.21.24.146:8810/rest/Base/BaseIntegrity/LookupCampos?dssearch";
var datos = {};
var datosLook = {};
arregloClase = JSON.parse(text);
arregloClase1 = ["si", "no"];
var lookup = {};///AREGLO EN DONDE SE ENCUENTRA TODO EL LOOKUP
/*
 * De acuerdo al alto de la pagina redimensiona la altura del div outerWrapper, el cual contiene toda la grilla
 * esto para montar el foot de la grilla osea los botones de cambio de pagina y demas
 * @param {type} param
 */
$(window).resize(function () {
    var viewportHeight = $(window).height();
    $('#outerWrapper').height(viewportHeight - 63);
});

/*
 * funcion al cargar la grilla
 * oculta la tabla de elemetos dataslots que se utilizaban en open Edge
 * @param {type} param
 */
$(document).ready(function () {

    $("#table2").hide();

    document.getElementById("div6").style.display = "none";
    document.getElementById("textField7").value = "defecto";
    cargar();
});

/*
 * funcion que pinta la grilla kendo en el div3
 * @param {type} txt1 es todo el json que recoge del servicio 
 * @param {type} titulos son los titulos a los que van asociados las columnas de la grilla
 * @returns {KendoTabla1}
 */
function KendoTabla1(txt1, titulos) {///////PINTA GRILLA KENDO
    try {
        if (txt1 != "{}") {
            txt1 = limpiarJson(txt1);//renderiza json para mostrar la grilla
        }
        var campos = [];
        for (var x = 0; x < titulos.length; x++) {
            var y = x + 1;
            var columna = "columna" + y + "\":";
            txt1 = txt1.replaceAll(columna, titulos[x] + "\":");
        }
        var ntitul = [];
        for (var j = 0; j < titulos.length; j++) {
            ntitul[j] = titulos[j].replace(/[^A-Z0-9]+/ig, '');
            txt1 = txt1.replaceAll(titulos[j], ntitul[j]);
        }
        var lookup1 = varcotejalookup;
        var lookupString = JSON.stringify(lookup);
        for (var i = 0; i < lookup1.length; i++) {
            for (var j = 0; j < titulos.length; j++) {
                if (lookup[lookup1[i]]) {
                    if (lookup[lookup1[i]].nom == titulos[j]) {
                        lookupString = lookupString.replaceAll(lookup1[i], ntitul[j]);
                        break;
                    }
                }
            }
        }
        lookup = JSON.parse(lookupString);
        document.getElementById("textArea2").value = txt1;
        var b = JSON.parse(txt1);
        ///////////////////////////////////////////////Encaso de ser una lista//////////////////////////////////////////////////////////////////////////		
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var k = 0;
        var titulosNue = [];
        for (var p = 0; p < titulos.length; p++) {
            titulosNue[p] = titulos[p].replaceAll(" ", "");
            titulos[p] = titulos[p].toUpperCase();
        }
        var obj = b;
        
        var keyst = [];
        if (obj[0] !== undefined) {

            keyst = Object.keys(obj[0]);
        }
        if (plConsulta != "-2") {
            campos.push({"command": [{name: "detalleActividades", text: " ", click: showDetailsWindowActividades, template: "<a class='k-grid-detalleActividades'><span class='k-icon po_detalle'></span></a>"}], title: "", width: "50px"});
        }
        if (txt1 == "{}") {
            for (var p = 0; p < titulos.length; p++) {
                if ((titulos[p] == "ID")) {
                    campos.push({
                        "field": titulosNue[p],
                        "title": titulos[p],
                        hidden: true, //oculta la columna id
                        filterable: false, //en caso de eliminar un filtro //oculta la columna id
                        //      editor: arregloClases, template: "#=Clase.ClaseName#"//crear una lista en el popup
                    });
                }
                /////////////////////////////////////////
                else if ((titulos[p] == "CONSECUTIVO")) {
                    campos.push({
                        "field": titulosNue[p],
                        "title": titulos[p],
                        hidden: true, //oculta la columna id
                        filterable: false, //en caso de eliminar un filtro //oculta la columna id
                    });
                }
                //////////////////////////////////////////////////				
                else if ((cInvisibles.indexOf(llave)) >= 0) {//para evitar los campos
                    if (lookup[llave]) {
                        campos.push({
                            "field": titulosNue[p],
                            "title": titulos[p],
                            hidden: true, //oculta la columna id
                            filterable: false, //en caso de eliminar un filtro //oculta la columna id
                            editor: listaEdit,
                        });
                    } else {
                        campos.push({
                            "field": titulosNue[p],
                            "title": titulos[p],
                            hidden: true, //oculta la columna id
                            filterable: false, //en caso de eliminar un filtro //oculta la columna id
                            //							editor: arregloClases, template: "#=Clase.ClaseName#"//crear una lista en el popup
                        });
                    }
                }
                ////////////////////////////////si es lista agregar///////////////////////////////////////
                else if (lookup[llave]) {
                    campos.push({
                        "field": titulosNue[p],
                        "title": titulos[p],
                        editor: listaEdit,
                    });
                }
                ///////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////			  
                else {
                    campos.push({
                        "field": titulosNue[p],
                        "title": titulos[p],
                    });
                }
            }
            b = "";
        }
        for (var p = 0; p < titulos.length; p++) {
            if (keyst[p] == ntitul[p]) {
                var llave = keyst[p];
                if ((keyst[p] == "ID") || (keyst[p] == "piindicador")) {
                    campos.push({
                        "field": keyst[p],
                        "title": titulos[p],
                        hidden: true, //oculta la columna id
                        filterable: false, //en caso de eliminar un filtro //oculta la columna id
                        //						editor: arregloClases, template: "#=Clase.ClaseName#"//crear una lista en el popup
                    });
                    k++;
                } else if ((cInvisibles.indexOf(llave)) >= 0) {//para evitar los campos
                    if (lookup[llave]) {
                        campos.push({
                            "field": keyst[p],
                            "title": titulos[p],
                            hidden: true, //oculta la columna id
                            filterable: false, //en caso de eliminar un filtro //oculta la columna id
                            editor: listaEdit,
                        });
                    } else {
                        campos.push({
                            "field": keyst[p],
                            "title": titulos[p],
                            hidden: true, //oculta la columna id
                            filterable: false, //en caso de eliminar un filtro //oculta la columna id
                            //							editor: arregloClases, template: "#=Clase.ClaseName#"//crear una lista en el popup
                        });
                    }
                }
                ////////////////////////////////si es lista agregar///////////////////////////////////////
                else if (lookup[llave]) {
                    campos.push({
                        "field": keyst[p],
                        "title": titulos[p],
                        editor: listaEdit,
                    });
                } else if ((keyst[p] == "Consecutivo")) {
                    campos.push({
                        "field": keyst[p],
                        "title": titulos[p],
                        hidden: true, //oculta la columna id
                        filterable: false, //en caso de eliminar un filtro //oculta la columna id
                    });
                }
                ///////////////////////////////////////////////////////////////////////				
                else {
                    campos.push({
                        "field": keyst[p],
                        "title": titulos[p],
                    });
                    k++;
                }
            }
        }
        var filas = {};
        for (var p = 0; p < cNoEditable.length; p++) {
            filas[cNoEditable[p]] = {editable: false, nullable: true};
        }
        filas["ID"] = {editable: false, nullable: true};
        var columnas = ["Consecutivo", "Estado"];
        var columnasTipo = ["number", "number"];
        for (var i = 0; i < columnas.length; i++) {//poner los tipos de dato en la grilla kendo 
            if (!lookup[columnas[i]]) {
                if (lookUpQuemado.indexOf(columnas[i]) == -1) {//en caso de que se ingresen lookups quemados como estado 
                    filas[columnas[i]] = {type: 'string'};
                } else {
                    filas[columnas[i]] = {type: columnasTipo[i]};
                }
            }
        }
        fecha = new Date().toString('yyyy/M/d');
        filas["FechaInicio"] = {type: "String", defaultValue: fecha};
        filas["FechaFinal"] = {type: "String", defaultValue: fecha};
        filas["Consecutivo"] = {editable: false, nullable: true};
        var seleccionar = true;
        var scroll = true;
        var addExtraStylingToGrid = function () {};
        var botonAdd = {};
        //		plConsulta = "-1";
        if (plConsulta != "-1") {
            if (plConsulta == "-2") {
                seleccionar = "multiple";
                scroll = false;
                addExtraStylingToGrid = function () {
                    $("#grid.k-grid > table > tbody > tr ").hover(
                            function () {
                                $(this).toggleClass("k-state-hover");
                            }
                    );
                };
                document.getElementById("div4").style.display = "none";
                document.getElementById("table1").style.display = "none";
            } else {
                //			btnDesActivar
                //			btnActivar
                //			btnCrear
                //			campos.push({"command": [{text: "Editar", click: showDetailsEditar}] , title: "&nbsp;", width: "100px" });
                //			campos.push({"command": [{name:"edit", className: "btnEditar",text: " ", click: showDetailsEditar}] , title: "&nbsp;", width: "100px" });
                campos.push({"command": [{name: "editar", text: " ", click: showDetailsEditarV2, template: "<a class='k-grid-editar'><span class='k-icon po_editon'></span></a>"}], title: "&nbsp;", width: "50px"});
                //				campos.push({"command": [{className: "btnBorrar",text: " ", click: showDetailsBorrar}] , title: "&nbsp;", width: "82px" });
            }
        }
        //renderiza el alto del div grid    
        $(window).trigger("resize");
        grilla = $("#grid").kendoGrid({//grid es el nombre de la tabla o contenedor donde va a estar la grilla
            pdf: {
                allPages: true,
                fileName: "Tareas.pdf",
                proxyURL: "//demos.telerik.com/kendo-ui/service/export"
            },
            columns: campos,
            dataSource: {
                data: b,
                pageSize: 15,
                schema: {
                    model: {
                        id: "ID",
                        fields: filas,
                    }
                }
            },
            sortable: true,
            selectable: seleccionar,
            groupable: true,
            reorderable: true,
            resizable: true,
            scrollable: scroll,
            navigatable: true,
            dataBound: addExtraStylingToGrid,
            filterable: {//coloco los parametros del filtro
                messages: {
                    info: "Filtrar Por: ",
                    and: "Y",
                    or: "O",
                    filter: "Aplicar",
                    clear: "Borrar"
                },
            },
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 2
            },
            editable: {
                mode: "popup",
                window: {
                    minWidth: "300px",
                    maxHeight: "600px",
                }
            },
            change: busqueExten,
        }).data("kendoGrid");
        $("#botonAdd").kendoTooltip({
            content: "Crear Registro"
        });
        $("#buttonAdd").kendoButton({
            click: showDetailsCrearV2,
            template: "<a class='k-grid-editar'><span class='k-icon po_editon'></span></a>"
        });
        for (var i = 0; i < inputs.length; i++) {
            document.getElementById("div6").style.display = "";
            var j = i + 1;
            crearEspacio_salto("espacio", 1, "div6");
            crearLabel("label" + inputs[i], inputs[i] + ": ", "div6", "15px Verdana");
            crearInput("filtroBD" + j, "div6");
            modTextboxPopupFl("filtroBD" + j, inputsType[i]);
            document.getElementById("filtroBD" + j).value = sessionStorage.getItem("filtroBD" + j)
            sessionStorage.setItem("filtroBD" + j, "");
        }
        crearEspacio_salto("espacio", 1, "div6");
        crearButton("ButtonFiltrar", "Buscar", "div6", "k-primary");
        //		document.getElementById("labelfiltroMensaje").value = "");
        $("#ButtonFiltrar").kendoButton({
            click: clickFiltrarfl
        });
        $("#ButtonFiltrar").kendoTooltip({
            content: "La tabla contiene mucha informaci\u00F3n por favor seleccione un item <br> para poder reducir el numero de registros."
        });
    } catch (e) {
        alert("Function: KendoTabla1 Error: " + e.message);
    }
}

/*
 * Funcion a la que llega el boton crear, ya que es un boton modificado lo apunto a la siguiente funcion para eliminar el registro
 * @param {type} e recoge todos los datos de la fila secceionada para borrar
 * @returns {undefined}
 */
function showDetailsBorrar(e) {//extrae el id seleccionado en la tabla
    try {
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        clickGrilla = this.dataItem($(e.currentTarget).closest("tr"));
        var grid = $("#grid").data("kendoGrid");
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        grid.select(grid.tbody.find(">tr:not(.k-grouping-row)").eq(fila));
        indicador = "3";
        var elem = document.getElementById("ButtonFiltr");
        elem.value = "Borrar";
        setAccPopUp("Borrar");
        limpiar("labelPopUp");
        limpiar("labelMensaje");
        crearEspacio_salto("jumpLine", 2, "labelMensaje");
        crearLabel("labelsMensajeEli", "Confirma la eliminaci\u00F3n de este registro?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "labelMensaje", "15px Verdana");
        crearEspacio_salto("jumpLine", 2, "labelMensaje");
        popUpPeque("Borrar", "tipo");
    } catch (e) {
        alert("Function: showDetailsBorrar Error: " + e.message);
    }
}
/*
 * *
 * funcion ruta Arbol es para crear una historia por que paginas ha pasado, es decir: apenas le dan detalle se ejecuta esta funcion para crea
 * una serie de variables de sesiion como para llebar el hilo y pasar los datos a la siguiente plantilla 
 * @returns {undefined}
 */
function rutaArbol() {
    try {
        llaves = pillaves;
        if (sessionStorage.getItem("cabeceraNew") != "") {
            if ((sessionStorage.getItem("cabeceraLast") != "") && (sessionStorage.getItem("cabeceraLast") != "[]")) {
                var cadenaLast = sessionStorage.getItem("cabeceraLast");
                var cadenaLlaves = sessionStorage.getItem("cabeceraLlaves");
                var cabeceraLast = sessionStorage.getItem("cabeceraLast").substring(1, (cadenaLast.length) - 1);
                var cabeceraLlaves = sessionStorage.getItem("cabeceraLlaves").substring(1, (cadenaLlaves.length) - 1);
                sessionStorage.setItem("cabeceraLlaves", "[" + cabeceraLlaves + ",{\"llaves\":\"" + llaves + "\"}]");
                sessionStorage.setItem("cabeceraLast", "[" + cabeceraLast + "," + sessionStorage.getItem("cabeceraNew") + "]");
            } else {
                var cadenaLlaves = sessionStorage.getItem("cabeceraLlaves");
                var cabeceraLlaves = sessionStorage.getItem("cabeceraLlaves").substring(1, (cadenaLlaves.length) - 1);
                sessionStorage.setItem("cabeceraLlaves", "[" + cabeceraLlaves + ",{\"llaves\":\"" + llaves + "\"}]");
                sessionStorage.setItem("cabeceraLast", "[" + sessionStorage.getItem("cabeceraNew") + "]");
            }
        } else {
            sessionStorage.setItem("cabeceraLlaves", "[{\"llaves\":\"" + llaves + "\"}]");
        }
        sessionStorage.setItem("cabeceraTitu", nomApp);
        sessionStorage.setItem("cabeceraNew", JSON.stringify(clickGrilla));
    } catch (e) {
        alert("Function: rutaArbol Error: " + e.message);
    }
}
/*
 * Funcion para mostrar un detalle en la aplicacion en una nueva ventana muy similar a la de un popUp
 * @param {type} detalle es la url que va a desplegarse en la nueva ventana
 * @param {type} titulo es el nombre que lleva en la parte superior de la nueva ventana
 * @returns {undefined}
 */
function  windowPopUp(detalle, titulo) {
    try {
        $("#windowDiv").append("<div id='window'></div>");
        var win = $("#window").kendoWindow({
            draggable: true,
            height: "90%",
            modal: true,
            resizable: false,
            title: titulo,
            width: "90%",
            content: detalle,
            close: function () {
                regresarPagV2();
                this.destroy();
            }
        }).data("kendoWindow").center();
        win.open();
    } catch (e) {
        alert("Function: windowPopUp Error: " + e.message);
    }
}

/*
 * hace un barrido de información por todo el elemento combo
 * @elelmento nombre del div asociado al elemento combo
 * @param {type} elemento nombre del div asociado al elemento combo
 * @returns {undefined}
 */
function limpiarCombo(elemento) {
    elemento = $("#" + elemento);//DECLARO EL ELEMENTO COMO UN OBJ JQUERY
    var lista = [];
    if (!lista) {
        lista.push(" ");
    }
    elemento.data("kendoComboBox").value(null);//LIMPIO TODO EL ELEMENTO KENDO 
    elemento = elemento.kendoComboBox({//CREO EL ELEMENTO DE NUEVO Y PONGO SUS NUEVOS VALORES
        dataSource: lista,
        filter: "contains",
        suggest: true,
        index: 0
    });
}
/* 
 * Es la funcion a la cual esta asociada el boton editar lacual obtiene los datos de la fila seleccionada y los envia fields popUp que es ta en funciones propias
 * @param {type} e obtiene todo el ebjeto de la fila seccionada
 * @returns {undefined}
 */
function showDetailsEditarV2(e) {//creacion del popup de CU
    try {
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        clickGrilla = this.dataItem($(e.currentTarget).closest("tr"));
        var grid = $("#grid").data("kendoGrid");
        var fila = $(e.currentTarget).closest("tr")[0].rowIndex;
        grid.select(grid.tbody.find(">tr:not(.k-grouping-row)").eq(fila));
        setAccPopUp("Editar");
        fieldsPopUp(clickGrilla, "Editar");
        popUpPeque("Editar", "tipo");
    } catch (e) {
        alert("Function: showDetailsEditarV2 Error: " + e.message);
    }
}
/*
 * 
 * Es la funcion a la cual esta asociada el boton editar lacual obtiene los datos de la fila seleccionada y los envia fields popUp que es ta en funciones propias
 * @param {type} e obtiene todo el ebjeto de la fila seccionada
 * @returns {undefined}
 */
function showDetailsCrearV2(e) {//creacion del popup de CU
    try {
        clickGrilla = jsonAppAbl;
        setAccPopUp("Crear");
        fieldsPopUp(clickGrilla, "Crear");
        if ($("#Proyecto")[0].className != "k-textbox") {//si el elemento html no es un campo de texto o textfield
            limpiarCombo("Proyecto");
            limpiarCombo("Capitulo");
            document.getElementById("EmpresaCliente").onchange();
        }
        popUpPeque("Crear", "tipo");
        clickGrilla = {};
    } catch (e) {
        alert("Function: showDetailsCrearV2 Error: " + e.message);
    }
}/**
 * Crea una ventana pequeña la cual hace de popUp para hacer la edicion o creacion de un registro
 * @titulo el nombre que lleva en la parte superior 
 * @tipo originalmente se creo para determinar si era edicion o creacion pero esa propiedad ya se logro definir con otra propiedad
 * */
function popUpPeque(titulo, tipo) {
    var popUp = $("#accessDiv").kendoWindow({
        draggable: true,
        maxHeight: "600px",
        modal: true,
        resizable: false,
        title: titulo,
    }).data("kendoWindow").center();
    document.getElementById("accessDiv_wnd_title").innerHTML = titulo;
    document.getElementById("accessDiv_wnd_title").textContent = titulo;
    popUp.open();
    $("#ButtonCancel").kendoButton({
        click: clickCancelar
    });
    $("#ButtonFiltr").kendoButton({
        click: clickGuardar
    });
}
/*
 * Funcion en caso de que tengamos un detalle en la plantilla  de ser asi el boton va relacionado con esta funcion y sirve para obtener los datos de la fila y enviarlos a la nueva ventana
 * @param {type} e los datos de la fila seleccionada
 * @returns {undefined}
 */
function  showDetailsWindowActividades(e) {
    try {
        e.preventDefault();//Aca se pueden colocar las funcionalidades dependiendo del uso del click
        clickGrilla = this.dataItem($(e.currentTarget).closest("tr"));
        clickGrilla = cudCambValoresLista(clickGrilla);
        $("#grid").data("kendoGrid").select($("#grid").data("kendoGrid").tbody.find(">tr:not(.k-grouping-row)").eq($(e.currentTarget).closest("tr")[0].rowIndex));
        rutaArbol();
        var urlDetalle = "Actividades";
        var detalle = url + urlDetalle + "/Start.jsp";
        windowPopUp(detalle, "");
    } catch (e) {
        alert("Function: showDetailsWindow Error: " + e.message);
    }
}
/*
 * funcion de kendo que sirve para mostrar un cargando en caso de que la funcion se demore mucho en cargar
 * @param {type} target
 * @returns {undefined}
 */
function displayLoading(target) {//funcion para poner bloquear una pantalla mientras consume un servicio la llama con
    var element = $(target);
    kendo.ui.progress(element, true);
    setTimeout(function () {
        kendo.ui.progress(element, false);
    }, 20000);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////Codigo//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * esta funcion va enlazada al index sirve para recoger los datos de paginas anteriores como usuario cargo y demas 
 * carga los datos por defecto para consultar los servicios web
 * determina si es plantilla detalle, en caso de ser asi mota en el header los valores que hiceron match para enviar la consulta con dichos valores 
 * la funcion es llamada en el onload 
 * @returns {undefined}
 */
function cargar() {
    try {
        var usuario = sessionStorage.getItem("usuario");
        var cargo = sessionStorage.getItem("carcod");
        var fiid = sessionStorage.getItem("fiid");
        usuario = "dgonima";
        fiid = "7905827825855520768";
        datos = {
            "fiid": fiid,
            "picusrcod": usuario,
            "picternit": "*",
            "picProyecto": "*",
            "picCapitulo": "*",
            "piiTareasConsecutivo": "0"
        };
        datosLook = {
            "fiid": fiid,
            "picusrcod": usuario,
            "piicarcod": cargo,
            "pictable": "acta.Proyectos,acta.Capitulos"
        };
        
        var cabeceraNew = sessionStorage.getItem("cabeceraNew");//la bd la debe poner el titulo de la variable de sesion 
        var arregloCabecera = [];
        var valoresC = [];
        /*createStyleSheet esta en funciones propias
         *se encarga de crear un enlace a la hoja de estilo cssSpriteIntegrity
         *el cual contine algunos estilos que apuntan a una img sprite que retorna 
         *algunas imagenes usadas en la grilla
         */
        createStyleSheet(sessionStorage.getItem("url"));
        if (sessionStorage.getItem("cabeceraTitu")) {
            document.getElementById("image05").style.display = "";
            crearFont(sessionStorage.getItem("cabeceraTitu"), "divTituPrinc", '4', '#2A2D33');
            if (!sessionStorage.getItem("BusqueExte")) {
                crearFont(nomApp, "divTituSecund", '4', '#5B5B5B');
            } else {
                sessionStorage.setItem("BusqueExte", "");
            }
        } else {
            crearFont(nomApp, "divTituPrinc", '4', '#2A2D33');
        }
        if ((cabeceraNew) && (cabeceraNew != "[]")) {
            arregloCabecera = JSON.parse(cabeceraNew);
            arregloCabecera = cudCambValoresLista(arregloCabecera);//cambia los valores si estos pertenecen a una lista del lookUp
            for (var i = 0; i < arrglojoinC.length; i++) {
                jsonAppAbl[arrglojoinD[i]] = arregloCabecera[arrglojoinC[i]];
            }
            var arreg = [];
            i = 0;
            delete arregloCabecera["ID"];
            for (var keyDeta in jsonAppAbl) {
                arreg.push(keyDeta);
                if (arrglojoinD.indexOf(keyDeta) != -1) {
                    valoresC[i] = arregloCabecera[arrglojoinC[arrglojoinD.indexOf(keyDeta)]];
                }
                for (var keyDet in datos) {
                    if ((keyDet == (ArregloAppAbl[i])) && (valoresC[i])) {
                        datos[keyDet] = valoresC[i];
                    }
                }
                i++;
            }
            i = 0;
            var cabeceraInv = ["EmpresaCliente", "Descripcion", "UsuarioResponsable", "Estado"];
            for (var key in arregloCabecera) {
                if (cabeceraInv.indexOf(key) == -1) {
                    var valor = arregloCabecera[key];
                    crearLabel("label" + key, key + ": ", "divCabecera");
                    crearLabel("label" + valor, valor, "divCabecera");
                    crearEspacio_salto("espacio", 3, "divCabecera");
                    i++;
                }
            }
        } else {
            document.getElementById("image05").style.display = "none";
            sessionStorage.setItem("cabeceraTitu", "");
            sessionStorage.setItem("cabeceraNew", "");
            sessionStorage.setItem("cabeceraLast", "");
        }
        var usuario = sessionStorage.getItem("usuario");
        var cargo = sessionStorage.getItem("carcod");
        document.getElementById("textField4").value = usuario;
        document.getElementById("textField5").value = cargo;
        var usuario = sessionStorage.getItem("usuario");
        var cargo = sessionStorage.getItem("carcod");
        document.getElementById("textField4").value = usuario;
        document.getElementById("textField5").value = cargo;
        document.getElementById("textField8").value = "fin.gfc_cli,acta.Proyectos,acta.Capitulos";
        //consumeServAjaxSIRLook(datosLook)
        if ((document.getElementById("textField7").value == "")) {
            msnError("Por favor revise el servicio de consulta, es posible que no est\u00E9 funcionando correctamente.");
        } else if ((document.getElementById("textField7").value == "defecto") && (!inputs.length)) {
            //			document.getElementById("textField1").value = "0");
            //consuServ (datos);
            consumeServAjaxSIR(datos);
        } else if ((document.getElementById("textField7").value == "defecto") && (inputs.length) && (!((sessionStorage.getItem("filtroBD1")) || (sessionStorage.getItem("filtroBD2")) || (sessionStorage.getItem("filtroBD1"))))) {
            datos.indicador = 5;
            //			document.getElementById("textField1").value = "5");
            //consuServ (datos);
            consumeServAjaxSIR(datos);
        } else if ((document.getElementById("textField7").value == "defecto") && (inputs.length) && (!((sessionStorage.getItem("filtroBD1")) || (sessionStorage.getItem("filtroBD2")) || (sessionStorage.getItem("filtroBD1"))))) {
            filtrarFirstPant();
        } else {
            cargaDatosTabla();
        }
        document.getElementById("textField7").value = "";
        document.getElementById("div1").style.display = "none";
    } catch (e) {
        alert("Function: cargar Error: " + e.message);
    }
    document.getElementById("table3").style.display = "";
}
/*
 * Funcion consumeServAjaxSIR sirve para extraer de la bd los datos que 
 * se piensan mostrar en la grilla o en el formulario
 * @param {type} datos el es json que se construye antes de enviar la peticion al servicio creado en cargar()
 * @returns {undefined}
 */
function consumeServAjaxSIR(datos) {
    try {
        var strSplitTblTemp = strUriRest.split("?");
        arrLlavesServBackEndSIR[0] = strSplitTblTemp[1];
        arrLlavesServBackEndSIR[1] = "tt" + arrLlavesServBackEndSIR[0].slice(2, arrLlavesServBackEndSIR[0].length);
        var objRest1 = {};
        var objRest2 = {};
        objRest2[arrLlavesServBackEndSIR[1]] = [datos];
        objRest1[arrLlavesServBackEndSIR[0]] = objRest2;
        var objResponse = {};
        var objEstado = {};
        $.ajax({
            type: "GET",
            url: strUriRest + "=" + JSON.stringify(objRest1),
            contentType: "application/json",
            success: function (resp) {
                objEstado = resp.response.pocestado;
                objResponse = resp.response;
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () { //use this
            afterAjax(objResponse, objEstado);
        });
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
/*
 * Funcion afterAjax se ejecuta al terminar el hilo de ajax
 * @param {type} objRest obtiene el json del servicio
 * @param {type} strEstado obtiene el estado del servicio
 * @returns {undefined}
 */
function afterAjax(objRest, strEstado) {
    try {
        var arrLLaves = recorrejson(objRest, "").split("---");
        arrLLaves = arrLLaves.slice(1, arrLLaves.length);
        var arrLLaves2 = arrLLaves.slice(0, arrLLaves.length - 2);
        arrLlavesServBackEndCUD = arrLLaves.slice(1, arrLLaves.length);//llaves que se llena en la parte de cargar y funcionan para recorrer el json que me entrega BackEnd
        arrLlavesServBackEndSIR = arrLLaves;//llaves que se llena en la parte de cargar y funcionan para recorrer el json que me entrega BackEnd
        document.getElementById("textField2").value = strEstado;
        document.getElementById("textArea1").value = JSON.stringify(objRest[arrLLaves2]);
        if (document.getElementById("textArea1").value == "undefined") {
            document.getElementById("textArea1").value = "";
        }
        consumeServAjaxSIRLook(datosLook);
    } catch (e) {
        alert("Function: afterAjax Error: " + e.message);
    }
}
/*
 * @param {type} datosLook  el es json que se construye antes de enviar la peticion al servicio creado en cargar()
 * @returns {undefined}
 */
function consumeServAjaxSIRLook(datosLook) {
    try{
        var strSplitTblTemp = strUrlRestLook.split("?");
        var strNomTbl1 = strSplitTblTemp[1];
        var strNomTbl2 = "tt" + strNomTbl1.slice(2, strNomTbl1.length);
        var objRest1 = {};
        var objRest2 = {};
        objRest2[strNomTbl2] = [datosLook];
        objRest1[strNomTbl1] = objRest2;
        var objResponseLook = {};
        var objEstadoLook = {};
        $.ajax({
                type: "GET",
                url: strUrlRestLook + "=" + JSON.stringify(objRest1),
                contentType: "application/json",
                success: function (resp) {
                    objEstadoLook = resp.response.pocestado;
                    objResponseLook = resp.response;
                },
                error: function (e) {
                    alert("Error" + JSON.stringify(e));
                }
            }).done(function () { //use this
                afterAjaxLookup(objResponseLook, objEstadoLook);
            });
    } catch (e) {
        alert("Function: consumeServAjaxSIRLook Error: " + e.message);
    }
}
/*
 *  Funcion afterAjax se ejecuta al terminar el hilo de ajax
 * @param {type} objResponseLook obtiene el json del servicio
 * @param {type} objEstadoLook obtiene el estado del servicio
 * @returns {undefined}
 */
function afterAjaxLookup(objResponseLook, objEstadoLook) {
    try {
//        var arrLLaves = recorrejson(objResponseLook.wk_arreglo, "").split("---");
//        arrLLaves = arrLLaves.slice(1, arrLLaves.length);
//        var arrLLaves2 = arrLLaves.slice(0, arrLLaves.length - 2);
        document.getElementById("textField7").value = objEstadoLook;
        document.getElementById("textArea4").value = JSON.stringify(objResponseLook.wk_arreglo);
        if (document.getElementById("textArea4").value == "undefined") {
            document.getElementById("textArea4").value = "";
        }
        cargaDatosTabla();
    } catch (e) {
        alert("Function: afterAjax Error: " + e.message);
    }
}
/*
 *  funcion recursiva para navegar por las llaves del json, las recoge y llas envia en un arreglo finaliza cuando encuentra un arreglo como contenido en el obj
 * @param {type} objRest datos del servicion rest
 * @param {type} key2 la llave anterior
 * @returns {String}
 */
function recorrejson(objRest, key2) {
    try {
        var key3 = "";
        for (var key in objRest) {//saca las llaves del json de entrada
            if (Object.prototype.toString.call(objRest) == "[object Object]") {
                key3 = "---" + recorrejson(objRest[key], key);
            }
            return key2 + key3;
        }
    } catch (e) {
        alert("Function: recorrejson Error: " + e.message);
    }
}
/*
 * funcion que arregla y parametriza los datos obtenidos del servicio para enviarlos a la funcion tablakendo 
 * cambia los datos dependiendo del lookup
 * @returns {undefined}
 */
function cargaDatosTabla() {
    try {
        var mensajeBD = document.getElementById("textField2").value;
        if (mensajeBD) {//en caso de tener un mensaje de erro proveniente de la bd
            if ((mensajeBD != "OK") && (mensajeBD != "*")) {
                msnError(mensajeBD);
            }
        }
        plConsulta = sessionStorage.getItem("idrepcon");//variable que llega de la aplicacion base (BaseIntegrity) que cumple con la funcion de determinar si el usuario puede ver consulta o editar toda la plantilla
        sessionStorage.setItem("idrepcon", 0);
        var txt = document.getElementById("textArea1").value;//obtiene el json para pintar con Kendo
        txt = txt.replaceAll(" true,", "\"si\",");
        txt = txt.replaceAll(" false,", "\"no\",");
        var obj = {};
        if (txt) {
            obj = JSON.parse(txt);
        }
        var llavestxt1 = "";
        var llavestxt2 = "";
        var objLlaves = obtdosPLlaves(obj);//obtiene las dos primeras llaves del obj 
        llavestxt1 = objLlaves.llavestxt1;
        llavestxt2 = objLlaves.llavestxt2;
        var txtlook = document.getElementById("textArea4").value;//teare4 tiene toda la info que proviene del servicio
        txtlook = putLookUoQue(txtlook);//adiciona a lookupQuemado al lookup que llega de la base de datos
        var txat = "";
        if (txt && txt != "") {
            txat = cambianit(txt, txtlook, 1, llavestxt1, llavestxt2); //cambia los valores por los que estan en el lookup
        }
        if (txt) {
            obj = txat;
        }
        llaves = [];
        var txtInv = document.getElementById("textArea6").value;
        txtInv = remplazaMenosLlaves(txtInv);
        var arregloInv = [];
        if (txtInv) {
            arregloInv = JSON.parse(txtInv).invisibles;
        }
        var txtDesEdit = document.getElementById("textArea7").value;
        txtDesEdit = remplazaMenosLlaves(txtDesEdit);
        var arregloDesEdit = [];
        if (txtDesEdit) {
            arregloDesEdit = JSON.parse(txtDesEdit).invEditar;
        }
        if (txt) {
            for (var key in obj[arrLlavesServBackEndSIR[1]][arrLlavesServBackEndSIR[2]][0]) {//saca las llaves del json de entrada
                llaves.push(key);
            }
            for (var i = 0; i < Object.keys(obj[arrLlavesServBackEndSIR[1]][arrLlavesServBackEndSIR[2]]).length; i++) {
                if (obj[arrLlavesServBackEndSIR[1]][arrLlavesServBackEndSIR[2]][i]) {
                    obj[arrLlavesServBackEndSIR[1]][arrLlavesServBackEndSIR[2]][i].ID = i;
                    delete obj[arrLlavesServBackEndSIR[1]][arrLlavesServBackEndSIR[2]][i].piindicador;
                }
            }
        }
        txt = JSON.stringify(obj);
        txtlook = remplazaMenosLlaves(txtlook);
        var objlook = {};
        if (txtlook) {
            objlook = JSON.parse(txtlook);
        }
        titulos = [//son los nombres que van a quedar en la cabecera de la grilla
            "Empresa Cliente",
            "Proyecto",
            "Capitulo",
            "Consecutivo",
            "Descripcion",
            "Fecha Inicio",
            "Fecha Final",
            "Estado",
            "Usuario Responsable",
            "ID",
        ];
        chanTutuTabl("eerep_cmp", titulos, llaves);
        for (var i = 0; i < arregloInv.length; i++) {//para eliminar los titulos en caso de que el usuario no los pueda ver, esta condicion sale apartir del servicio de restriccion por usuario
            cInvisibles.push(titulos[llaves.indexOf(arregloInv[i])]);
        }
        for (var i = 0; i < arregloDesEdit.length; i++) {//para eliminar los titulos en caso de que el usuario no los pueda ver, esta condicion sale apartir del servicio de restriccion por usuario
            cNoEditable.push(titulos[llaves.indexOf(arregloDesEdit[i])]);
        }
        for (var i = 0; i < varcotejalookup.length; i++) {///monta variables dinamicas para crear las listas de los campos que van en combobox
            var llave = varcotejalookup[i];
            if (objlook[llave + '/cod']) {
                var arregloCod = [];
                var arregloDes = [];
                for (var j = 0; j < objlook[llave + '/cod'].length; j++) {
                    arregloCod.push(objlook[llave + '/cod'][j]);
                    arregloDes.push(objlook[llave + '/des'][j]);
                    var expReg = /(([\w]*[-]*[\w]*)\b\":?)(")?([[\d]*]|[[\w]*]?)(")?/g;
                    //txt =  remplazaExpRegEspe(txt,expReg,llave,objlook[llave+'/cod'][j],objlook[llave+'/des'][j]);
                }
                if ((llave == "Proyecto")) {
                    lookup[llave] = {
                        "cod": arregloCod,
                        "des": arregloCod,
                        "nom": titulos[i],
                    };
                } else if ((llave == "Capitulo")) {
                    lookup[llave] = {
                        "cod": arregloCod,
                        "des": arregloCod,
                        "nom": titulos[i],
                    };
                } else {
                    lookup[llave] = {
                        "cod": arregloCod,
                        "des": arregloDes,
                        "nom": titulos[i],
                    };
                }
            }
        }
        KendoTabla1(txt, titulos);
    } catch (e) {
        alert("Function: cargaDatosTabla Error: " + e.message);
    }
}

function chanTutuTabl(nomtbl, titu, llavesTbl) {
    var titulosbd = [];
    /*Solo se utiliza si tiene la textArea9 habilitado*/
    //	if(document.getElementById("textArea9").value!=""){
    //		var tituDicc = document.getElementById("textArea9").value;
    //		if(tituDicc){//carga un json donde se encuentran todos los titulos de la tabla kendo  y los reemplaza por los que estan por defecto
    //			var objtituDicc = JSON.parse(tituDicc);
    //			for (var i= 0; i < objtituDicc[nomtbl].length; i++){
    //				var nomcmp = objtituDicc[nomtbl][i].cmp_nom;
    //				var tamnomcmp = nomcmp.length;
    //				for(var j = 0; j < inputs.length;j++){
    //					var input =  inputsNameSer[j].slice(-tamnomcmp);
    //					if((input == nomcmp)||(input == nomcmp.replace("-", "_"))){
    //						inputs[j] = objtituDicc[nomtbl][i].cmp_dsc;
    //					}
    //				}
    //				if((titu)&&(llavesTbl)){
    //					if(llavesTbl.indexOf(objtituDicc[nomtbl][i].cmp_nom)!=-1){
    //						titu[llavesTbl.indexOf(objtituDicc[nomtbl][i].cmp_nom)] = objtituDicc[nomtbl][i].cmp_dsc;
    //					}
    //				}
    //			}
    //		}
    //		titulosbd = titu;
    //	}
    return titulosbd;
}
/*
 * Si la plantilla posee una gantidad enorme de datos se activa la funcionn
 * En este caso no se va a usar muy a menudo ya que con el consumo de obj rest la capacidad de obtener muchos datos es mayor
 * @returns {undefined}
 */
function filtrarFirstPant() {
    try {
        limpiar("labelPopUp");
        limpiar("labelMensaje");
        crearEspacio_salto("jumpLine", 1, "labelPopUp");
        chanTutuTabl("eerep_cmp");
        for (var i = 0; i < inputs.length; i++) {
            var j = i + 1;
            if (i != 0) {
                crearEspacio_salto("jumpLine", 2, "labelPopUp");
            }
            crearLabel("label" + inputs[i], inputs[i] + ": ", "labelPopUp", "13px Verdana");
            crearInput("filtroBD" + j, "labelPopUp");
            modTextboxPopupFl("filtroBD" + j, inputsType[i]);
            //		document.getElementById("ButtonFiltrar"+j).value = inputs[i]
            setAccPopUp("Filtrar");
            var elem = document.getElementById("ButtonFiltr");
            elem.value = "Filtrar";
            document.getElementById("ButtonCancel").style.display = "none";
        }
        crearEspacio_salto("jumpLine", 2, "labelPopUp");
        popUpPeque("Filtrar", "tipo");
    } catch (e) {
        alert("Function: filtrarFirstPant Error: " + e.message);
    }
}

////////////////////////////////////////////////crear XML para enviar a los servicios CUD///////////////////////////////////////////////////

/*
 * Apenas pasa por la funcion ShowDetail Crear lla ma lasiguiente funcion la cual organiza los datos obtenidos para enviarlos en la funcion 
 * consumeServAjaxCUD la cual sonsume el servicio json para crear actializar y borrar
 * @param {type} e todos los datos de la fila seleccionada
 * @returns {undefined}
 */
function crearReg(e) {
    try {
        cudCambValoresLista(e);//cambia los valores si estos pertenecen a una lista del lookUp
        //	alert("En esta funcion colocas el click de la cud");
        var datosCrear = {
            "ternit": e.EmpresaCliente, "Proyecto": e.Proyecto, "Capitulo": e.Capitulo, "TareasConsecutivo": "0", "Descripcion": e.Descripcion, "Fechainicio": e.FechaInicio, "Fechafinal": e.FechaFinal, "Estado": e.Estado, "Responsable": e.UsuarioResponsable,
        };
        for (var i = 0; i < inputs.length; i++) {
            var j = i + 1;
            sessionStorage.setItem("filtroBD" + j, document.getElementById("filtroBD" + j)).value = "";
            ;
        }
        debugger;
        var objRest = {"dsttTareas": {
            }
        };
        objRest.dsttTareas.ttTareas = [datosCrear];
    consumeServAjaxCUD(datos, "PUT", objRest);
        //document.getElementById("button01").click();//en las va el id del boton para simular un un click al boton seleccionado
    } catch (e) {
        alert("Function: crearReg Error: " + e.message);
    }
}
/*
 * Apenas pasa por la funcion ShowDetail Editar lla ma lasiguiente funcion la cual organiza los datos obtenidos para enviarlos en la funcion 
 * consumeServAjaxCUD la cual sonsume el servicio json para crear actializar y borrar
 * @param {type} e todos los datos de la fila seleccionada
 * @returns {undefined}
 */
function editarReg(e) {
    cudCambValoresLista(e);//cambia los valores si estos pertenecen a una lista del lookUp
    //	alert("En esta funcion colocas el click de la cud");
    var datosEditar = {
        "ternit": e.EmpresaCliente, "Proyecto": e.Proyecto, "Capitulo": e.Capitulo, "TareasConsecutivo": e.Consecutivo, "Descripcion": e.Descripcion, "Fechainicio": e.FechaInicio, "Fechafinal": e.FechaFinal, "Estado": e.Estado, "Responsable": e.UsuarioResponsable,
    };
    try {
        for (var i = 0; i < inputs.length; i++) {
            var j = i + 1;
            sessionStorage.setItem("filtroBD" + j, document.getElementById("filtroBD" + j)).value = "";
            ;
        }
        var objRest = {"dsttTareas": {
            }
        };
        objRest.dsttTareas.ttTareas = [datosEditar];
        consumeServAjaxCUD(datos, "POST", objRest);
    } catch (e) {
        alert("Function: editarReg Error: " + e.message);
    }
}
/*
 * Apenas pasa por la funcion ShowDetail Borrar lla ma lasiguiente funcion la cual organiza los datos obtenidos para enviarlos en la funcion 
 * consumeServAjaxCUD la cual sonsume el servicio json para crear actializar y borrar
 * @param {type} e todos los datos de la fila seleccionada
 * @returns {undefined}
 */
function borrarReg(e) {
    try {
        cudCambValoresLista(e);//cambia los valores si estos pertenecen a una lista del lookUp
        var datosBorrar = {
            "ternit": e.EmpresaCliente, "Proyecto": e.Proyecto, "Capitulo": e.Capitulo, "TareasConsecutivo": e.Consecutivo, "Descripcion": e.Descripcion, "Fechainicio": e.FechaInicio, "Fechafinal": e.FechaFinal, "Estado": e.Estado, "Responsable": e.UsuarioResponsable,
        };
        for (var i = 0; i < inputs.length; i++) {
            var j = i + 1;
            sessionStorage.setItem("filtroBD" + j, document.getElementById("filtroBD" + j)).value = "";
            ;
        }
        var objRest = {"dsttTareas": {
            }
        };
        objRest.dsttTareas.ttTareas = [datosBorrar];
        consumeServAjaxCUD(datos, "DELETE", objRest);
    } catch (e) {
        alert("Function: borrarReg Error: " + e.message);
    }
}
/**
 * Funcion consumeServAjaxCUD sirve para extraer de la bd los datos que 
 * se piensan mostrar en la grilla o en el formulario
 @datos el es json que se construye antes de enviar la peticion al servicio creado en cargar()
 @ope operacion que se va a ejecutar "PUT, GET, POST, DELETE"
 @datosCUD es la informacion que quiero enviar al servicioo
 */
function consumeServAjaxCUD(datos, ope, datosCUD) {
    try {
        var strSplitTblTemp = strUriRest.split("?");
        arrLlavesServBackEndSIR[0] = strSplitTblTemp[1];
        arrLlavesServBackEndSIR[1] = "tt" + arrLlavesServBackEndSIR[0].slice(2, arrLlavesServBackEndSIR[0].length);
        var objRest1 = {};
        var objRest2 = {};
        objRest2[arrLlavesServBackEndSIR[1]] = [datos];
        objRest1[arrLlavesServBackEndSIR[0]] = objRest2;
        var objResponse = {};
        var objEstado = {};
        $.ajax({
            type: ope,
            data: JSON.stringify(datosCUD),
            url: strUriRest + "=" + JSON.stringify(objRest1),
            contentType: "application/json",
            success: function (resp) {
                objEstado = resp.response.pocestado;
                objResponse = resp.response;
            },
            error: function (e) {
                alert("Error" + JSON.stringify(e));
            }
        }).done(function () { //use this
            consumeServAjaxSIR(datos);//lo envio de nuevo para que me actulice los datos
        });
    } catch (e) {
        alert("Function: consumeServAjaxSIR Error: " + e.message);
    }
}
////////////////////////////////////////////////para montar datos a un conbobox kendo de si y no///////////////////////////////////////////////////
/**
 * 
 * @param {type} container
 * @param {type} options
 * @returns {undefined}
 */
function clasescombobox(container, options) {
    $('<input required  data-bind="value:' + options.field + '"  />')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: arregloClase1
            });
}
function estadoFilter(element) {
    element.kendoDropDownList({
        dataTextField: "boolID",
        dataValueField: "boolID",
        dataSource: arregloClase,
        optionLabel: "--Select Value--"
    });
}
///////////////////////////////////////////////////////////listas combobox/////////////////////////////////////////////////////////////////////////
/**
 * sirve para cambiar los valores en la grilla, es decir, valores de descripcion a codigo
 * @param {type} e coge todos los datos de la fila seleccionada
 * @returns {unresolved}
 */
function cudCambValoresLista(e) {//cambia los nombres por id si el campo hace parte del pool de lookup
    try {
        var llavesArreglo = [];
        for (var key in jsonAppAbl) {
            llavesArreglo.push(key);
        }
        for (var key in e) {
            if (lookup[key]) {
                var valorllega = e[key];
                if ((lookup[key].cod) && (lookup[key].des)) {
                    var arregloCod = lookup[key].cod;
                    var arregloDes = lookup[key].des;
                    var valorCambia = arregloCod[arregloDes.indexOf(valorllega)];
                    if (!valorCambia) {
                        valorCambia = valorllega;
                    }
                    e[key] = valorCambia;
                }
            } else if (typeItem[llavesArreglo.indexOf(key)] == 'hora') {
                var S = e[key];
                var times = S.split(":");
                var minutes = times[0];
                var seconds = times[1];
                e[key] = (parseInt(seconds, 10) * 60) + (parseInt(minutes, 10) * 60 * 60);
            }
        }
    } catch (e) {
        alert("Function: cudCambValoresLista Error: " + e.message);
    }
    return  e;
}
/**
 * 
 * @param {type} container
 * @param {type} options
 * @returns {undefined}
 */
function listaEdit(container, options) {//pone una lista ene el popup si esta en el lookup
    var lista = lookup[options.field].des;
    //	$('<input required  data-bind="value:' + options.field + '"  />')
    $('<input data-bind="value:' + options.field + '"  />')
            .appendTo(container)
            .kendoComboBox({
                filter: "contains",
                autoBind: false,
                minLength: 2,
                dataSource: lista,
            });
}
/**
 * esta funcion crea variables de sesion, necesarias para enviar a la pagina busquedaextendida, la cual sirve cuando se representa la lupa en uno de los campos del pop
 * de edicion  
 * pasrte de quien envia la solicitud de busqueda extendida
 * @param {type} urlBE la url a la cual esta asignada la busqueda extendida
 * @returns {undefined}
 */
function busquedaExtendida(urlBE) {
    try {
        sessionStorage.setItem("idrepcon", "-2");
        sessionStorage.setItem("BusqueExte", "1");
        var arreglo = urlBE.split(',');
        rutaArbol();//con estas dos  funcion llamo el poup emergente
        setitemBE(urlBE);
        windowPopUp(arreglo[0], "Busqueda Extendida: " + arreglo[1]);
    } catch (e) {
        alert("Function: clickFiltrarfl Error: " + e.message);
    }
}
/**
 * Esta funccion se consulta apenas el usuario da click en alguna de las filas que contiene la grilla de busqueda extendida en caso de que la variable de sesion idrepcon sea -2
 * pasrte de quien envia la solicitud de busqueda extendida
 * @param {type} e todos los datos de la fila seleccionada
 * @returns {undefined} a la funcion regresaBusque de la pagina anterior es decir la pagina que la llamo
 */
function busqueExten(e) {
    try {
        if (plConsulta == "-2") {
            sessionStorage.setItem("idrepcon", "0");
            var grid = $("#grid").data("kendoGrid");//OBTENFGO TODA LA GRILLA
            var dataRows = grid.items();
            var rowIndex = dataRows.index(grid.select());//OBTENGO EL ELEMENTO SELECCIONADO
            var nropag = grid.dataSource.page();//OBTENGO LA PAG SELECCIONADA
            if (nropag > 1) {
                rowIndex = 15 * (nropag - 1) + (rowIndex);//COMO C/PAG TIENE UN MAX DE 15 REGISTROS HAGO ESTA OPE PARA DETERMINAR CUAL ES EL REGISTRO SELECCIONADO
            }
            parent.regresaBusque(grid.dataSource._data[rowIndex]);//LE ENVIO A LA PAG ORIGEN UN JSON CON TODOS LOS DATOS DE LA FILA SELECCIONADA
        }
    } catch (e) {
        alert("Function: busqueExten Error: " + e.message);
    }
}
/**
 * funcion que retorna los datos seleccionados en la pagina de busqueda extedida 
 *  En caso de cambiar el dato que rretorna de la busqueda extendida, solo tendriamos que cambiar campo 
 * @param {type} todos los datos que retornaron de la busqueda extenediida 
 * @returns {undefined}
 */
function regresaBusque(e) {
    arreglo = getitemBE().split(',');
    var campo = arrgloRelaCampo[arrgloLinkCampo.indexOf(arreglo[1])];
    arrgloLinkCampo.indexOf(arreglo[1]);
    setValueKendo(arreglo[1], e[campo]);//dato a coger por el el detalle
    $("#window").data("kendoWindow").close();
}
/**
 * Funcion para setear un campo kendo 
 * @param {type} field campo al cual se le asignara el nuevo valor
 * @param {type} valor valor asignado
 * @returns {undefined}
 */

function setValueKendo(field, valor) {
    var elemento = "#" + field;
    var tipo = $(elemento)[0].dataset.role;
    if (tipo == "numerictextbox") {
        if (isNumber(valor)) {
            $(elemento).data("kendoNumericTextBox").value(valor);
        }
    } else if (tipo == "combobox") {
        $(elemento).data("kendoComboBox").value(valor);
    } else {
        document.getElementById(field).value = valor;
    }
}
/**
 * funcion que se activa con el event Click del boton cancelar, el cual esta dentro del popup de edicion 
 * este cierra la ventana popup
 * @returns {undefined}
 */
function clickCancelar() {
    $("#accessDiv").data("kendoWindow").close();
    document.getElementById("ButtonFiltr").style.display = "";
    //jsonCUPop limpia estejson para no ejecutar nada
    jsonCUPop = {};
}
/**
 * funcion que se activa con el event Click del boton Crear, Borrar y filtrar , el cual esta dentro del popup de edicion 
 * el nombre del boton cambia dependiendo del tipo de acciion
 * uitiliza una variable acciion la cual es enviadea desde show details y esta le permite decidir que camino tomar 
 * @returns {undefined}
 */
function clickGuardar() {
    $("#accessDiv").data("kendoWindow").close();
    var jsonCUPopstr = JSON.stringify(jsonCUPop);
    jsonCUPopstr = obtenerDataPop(jsonCUPopstr);
    jsonCUPop = JSON.parse(jsonCUPopstr);
    var action = getAccPopUp();
    if (action == "Editar") {
        editarReg(jsonCUPop);
    } else if (action == "Crear") {
        crearReg(jsonCUPop);
    } else if (action == "Borrar") {
        borrarReg(clickGrilla);
    } else if (action == "Filtrar") {
        clickFiltrarfl();
    }
}
/**
 * esta funcion es llamada desde crearReg borrar o editar su funcion es obtener todos los datos que edito el usuario en el popUp 
 * @param {type} jsonCUPop un json por defecto que esta creado con el nombre de los campos a editar  pero antes de consultar esta vacio para llenarlo los nuevos valores del popUp
 * @returns {String}envia un json tipo string con la estructura requerida para enviar la consulta a los servicios , esta consulta la envia en una estructura json
 */
function obtenerDataPop(jsonCUPop) {
    jsonCUPop = JSON.parse(jsonCUPop);
    for (var key in jsonCUPop) {
        jsonCUPop[key] = document.getElementById(key).value;
    }
    var str = JSON.stringify(jsonCUPop);
    return str;
}
/**
 * en caso de que sea un filtro desde bd el cual es llamado desde un popUp al inicio o unos textField en el header de la pantalla
 * se activa con el eventClick del filtrar
 * @returns {undefined}
 */
function clickFiltrarfl() {
    document.getElementById("textArea8").value = "";
    var usuario = sessionStorage.getItem("usuario");
    datos = {
        "picter_nit": "*",
        "picProyecto": "*",
        "picCapitulo": "*",
        "piiTareasConsecutivo": 0,
        "picusuario": usuario,
    };
    for (var i = 0; i < inputs.length; i++) {
        var j = i + 1;
        if (document.getElementById("filtroBD" + j).value = "") {
            if (inputsType[i] == "date") {
                if ((document.getElementById("filtroBD" + j) == "0000-00-00") || (document.getElementById("filtroBD" + j).value == "")) {
                    datos[inputsNameSer[i]] = "*";
                } else {
                    //
                    datos[inputsNameSer[i]] = document.getElementById("filtroBD" + j).value = "";
                    ;
                }
            } else {
                datos[inputsNameSer[i]] = document.getElementById("filtroBD" + j).value = "";
                ;
            }
        } else {
            if ((inputsType[i] == "integer") || (inputsType[i] == "decimal")) {
                datos[inputsNameSer[i]] = "0";
            } else {
                datos[inputsNameSer[i]] = "*";
            }
        }
        sessionStorage.setItem("filtroBD" + j, document.getElementById("filtroBD" + j)).value = "";
        ;
    }
    document.getElementById("textArea8").value = datoXmlV2("ttemp", datos, true);
    document.getElementById("textArea1").value = "";
    document.getElementById("textArea2").value = "";
    document.getElementById("button02").click();
}
/**
 * Limpia div, es decir borra contenido y campos para dejar el div listo para otra consulta en la cual se crean denuevo los campos y label
 * @param {type} div nombre del div
 * @returns {undefined}
 */
function limpiar(div) {
    var d = document.getElementById(div);
    while (d.hasChildNodes())
        d.removeChild(d.firstChild);
}
/**
 * Funcion para mostrar un mensaje en un popUp de kendo
 * @param {type} mensaje string que contiene el mensaje
 * @returns {undefined}
 */
function  msnError(mensaje) { //pasar a carpeta scrips
    crearEspacio_salto("jumpLine", 1, "labelMensaje");
    crearLabel("labelmenBD", mensaje, "labelMensaje", "15px Verdana");
    crearEspacio_salto("jumpLine", 2, "labelMensaje");
    popUpPeque("Aceptar", "tipo");
    var elem = document.getElementById("ButtonCancel");
    elem.value = "Aceptar";
    setAccPopUp("Aceptar");
    document.getElementById("ButtonFiltr").style.display = "none";
}

//////////////////////////////////////////////////funciones pára invalidar la tecla F12 y el clickDere para evitar que vean el codigo fuente/////////////////////////////////
//document.onkeydown = ShowKeyCode;
//function ShowKeyCode(evt) {
//if (evt.keyCode == '123')
//return false;
//}
//if (document.addEventListener) {
//document.addEventListener('contextmenu', function(e) {
//e.preventDefault(;
//}, false;
//} else {
//document.attachEvent('oncontextmenu', function() {
//window.event.returnValue = false;
//};
//}
////////////////////////////////////////////////en caso de colocar en el filtro una lista////////////////////////////////////////////////////////////////////////////////////
//function SucursalAgenciaFiltr(element) {
//element.kendoDropDownList({
//dataSource:lookup["SucursalAgencia"].des,
//optionLabel: "--Select Value--"
//};
//}
function CancelarJsonQuantum() {
    indicador = "";
}
function getAccPopUp() {
    return AccPopUp;
}
function setAccPopUp(e) {
    AccPopUp = e;
}
function getitemBE() {
    return itemBE;
}
function setitemBE(e) {
    itemBE = e;
}
function getTitulo() {
    return titulo;
}
function setTitulo(e) {
    titulo = e;
}