/**
 * funcion para cambiar la url de las imagenes utilzadas en la las grillas de kendo
 * @param {type} url url que que contiene ip puerto 
 * @returns {undefined}
 */
function createStyleSheet(url) {
    var x = document.createElement("LINK");
    x.setAttribute("rel", "stylesheet");
    x.setAttribute("type", "text/css");
    x.setAttribute("href", "http://190.144.16.114:18800/sbm/BizSolo/Base_Integrity/css/cssSpriteIntegrity.css");
    document.head.appendChild(x);
}
/**
 * funcion que se invoca en un evenchange de un campo definido por bd como cascada
 * es una funcion recursiva ya que puede tener varios eventchange anidados 
 * de acuerdo a los servicios del llokup que son campos por aparte monta una lista dependiendo del item seleccionado
 * @returns {undefined}
 */
function CuJsonQuantum(){//regresa a esta funcion apenas das click en el popupActualizar
	try{
		if(indicador){
			indicador="";
			delete clickGrilla["ID"];
			delete clickGrilla["piindicador"];
			//clickGrilla = JSON.parse(modificarJSONKendo(JSON.stringify(clickGrilla)));
			editarReg(clickGrilla);
			//alert(JSON.stringify(clickGrilla));
		}else {
			indicador="";
			delete grilla._data[0]["ID"];
			delete grilla._data[0]["piindicador"];
			clickGrilla = grilla._data[0];
			var  clickGrillaStr = JSON.stringify(clickGrilla);
			clickGrilla = JSON.parse(clickGrillaStr);
			var arreglo2 =[];
			for(var i =0;i < grilla.columns.length;i++){
				if(grilla.columns[i].field){
					arreglo2.push(grilla.columns[i].field);
				}
			}
			for(var i =0;i < arreglo2.length;i++){
				if(!clickGrilla[arreglo2[i]]){
					clickGrilla[arreglo2[i]] = "";
				}
			}
			//clickGrilla = JSON.parse(modificarJSONKendo(JSON.stringify(grilla.dataSource._data[0])));
			crearReg(clickGrilla);
		}
	}catch(e){
		alert("Function: CuJsonQuantum Error: "+e.message);
	}
}
function DJsonQuantum(){//regresa a esta funcion apenas das click en el popupActualizar
	indicador="";
	delete clickGrilla["ID"];
	delete clickGrilla["piindicador"];
	//clickGrilla = JSON.parse(modificarJSONKendo(JSON.stringify(clickGrilla)));
	borrarReg(clickGrilla);
}/**
 *  funcion para coger un textField y cambiarlo por los parametros de una funcion kendo
 * @param {type} idElemento id del elementohtml
 * @param {type} tipo tipo de dato
 * @param {type} readonly solo lectura
 * @returns {undefined}
 */
function modTextboxPopupFl(idElemento,tipo,readonly) {
	if(lookup[idElemento]){
	  tipo= "lista";
	 }
	elemento= $("#"+idElemento);
	if(readonly){
		elemento.kendoMaskedTextBox();
		elemento[0].disabled = true;
	}else{
		if (tipo=="decimal"){
			elemento.kendoNumericTextBox();
		}else if (tipo=="number"){
			elemento.kendoNumericTextBox({format: "#"});
		}else if((tipo=="string")||(tipo=="character")){
			elemento.kendoMaskedTextBox();
		}else if(tipo=="date"){
			elemento.kendoDatePicker({
                            format: "yyyy-MM-dd"
                        });
                }else if(tipo=="hora"){
			elemento.kendoTimePicker();
		}else if(tipo=="logical"){
			var lista = ["si","no"];
			elemento = elemento.kendoComboBox({
				dataSource: lista,
				filter: "contains",
				suggest: true,
				index: 0
			});
		}else if(tipo=="lista"){
			
			var lista = lookup[idElemento].des;
			
//			if(idElemento.substring(0,6)=="Codigo"){
//				lista = lookup[idElemento].cod;
//			}
			elemento = elemento.kendoComboBox({
				dataSource: lista,
				filter: "contains",
				suggest: true,
				index: 0
			});
		}
	}
}/**
 * funcion para verificar si el dato es nbumerico
 * @param {type} n string
 * @returns {RegExp} un valor boolean 
 */
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
/**
 * dirve para reemplazar varias palabras por una expresion Regular
 * @param {type} s1 txt a reemplazar
 * @param {type} expReg expresion Regular
 * @param {type} parametro0 parametro de condicion 
 * @param {type} parametro1 parametro de condicion 
 * @param {type} parametro2 nuevo valor
 * @returns {unresolved}
 */
function remplazaExpRegEspe(s1,expReg,parametro0,parametro1,parametro2) {
	var test = expReg;
	var s2 = s1.replace(test,
		function($0,$1,$2,$3,$4,$5){
			
			if(($4==parametro1)&&($2==parametro0)){
				if(!($3)&&!($5)){
					$3="\"";$5="\"";
				}
				return(($0.replace($0,$2+"\": "+$3+parametro2+$5))); 
			}
			else{
				if(($3)&&($5)){
					return(($1+$3+$4+$5));
				}
				else{
					return(($1+$4));
				}
			}
		});
	return s2;
}
/**
 * funcion para hacer un historial por que paginas ha pasado en caso de que la aplicacion se a de cabecera y detalle 
 * @returns {undefined}
 */
function regresarPagV2(){
	try{
		cabeceraOld = sessionStorage.getItem("cabeceraLast");
		if((cabeceraOld!="")){
			if((cabeceraOld)&&(cabeceraOld!="[]")){
				cabeceraLlaves = sessionStorage.getItem("cabeceraLlaves");
				objLlaves = JSON.parse(cabeceraLlaves);
				objLlavesLength = ((objLlaves.length)-1);
				sessionStorage.setItem("cabeceraLlaves",JSON.stringify(objLlaves.slice(0,(objLlaves.length)-1)));
				obj = JSON.parse(cabeceraOld);
				objLength = ((obj.length)-1);
				sessionStorage.setItem("cabeceraLast",JSON.stringify(obj.slice(0,(obj.length)-1)));
				sessionStorage.setItem("cabeceraNew",JSON.stringify(obj[objLength]));
			}else{
				sessionStorage.setItem("cabeceraNew","");
				sessionStorage.setItem("cabeceraLast","");
				sessionStorage.setItem("cabeceraLlaves","");
			}
		}else{
			sessionStorage.setItem("cabeceraNew","");
			sessionStorage.setItem("cabeceraLast","");
			sessionStorage.setItem("cabeceraLlaves","");
		}
	}catch(e){
		alert("Function: regresarPagV2 Error: "+e.message);
	}
}
//function regresarPag(){
// try{
//  cabeceraOld = sessionStorage.getItem("cabeceraLast");
//  var links="";
//  if((cabeceraOld!="[]")){
//
//   if(cabeceraOld){
//    obj = JSON.parse(cabeceraOld);
//    objLength = ((obj.length)-1);
//    sessionStorage.setItem("cabeceraLast",JSON.stringify(obj.slice(0,(obj.length)-1)));
//    sessionStorage.setItem("cabeceraNew",JSON.stringify(obj[objLength]));
//   }else{sessionStorage.setItem("cabeceraNew","[]");}
//
//  }else{sessionStorage.setItem("cabeceraNew","[]");}
//  cabeceraLink = sessionStorage.getItem("cabeceraLink");
//  objlink = JSON.parse(cabeceraLink);
//  objlinkLength = ((objlink.length)-1);
//  sessionStorage.setItem("cabeceraLink",JSON.stringify(objlink.slice(0,(objlink.length)-1)));
//  links = objlink[(objlink.length)-1].url;
//  cabeceraLlaves = sessionStorage.getItem("cabeceraLlaves");
//  objLlaves = JSON.parse(cabeceraLlaves);
//  objLlavesLength = ((objLlaves.length)-1);
//  sessionStorage.setItem("cabeceraLlaves",JSON.stringify(objLlaves.slice(0,(objLlaves.length)-1)));
//  window.location = links;
// }catch(e){
//  alert("Function: regresarPag Error: "+e.message);
// }
//}

/**
 * verijfica si el usuario esta logueado
 * @returns {undefined}
 */
function loginValido(){
	var login=sessionStorage.getItem("loginintegrity");
	if(login=="cerrado"){
		cerrarSesion();
	}
	else{
		sessionStorage.setItem("loginintegrity","valido");
	}
}
/**
 * renderizar los datos opbtenidos de los servicios para consumirlo en kendo
 * @param {type} textAreaJSON todolo que obtiene de un json 
 * @returns {modificarJSON.string|limpiarJson.string} en modificarjson entrega un strin con el cambio de las llaves en lipiar cambia las nombres de las tablas
 */
function limpiarJson(textAreaJSON){
	var string =   modificarJSON(textAreaJSON);
	string =  string.substring(0, string.lastIndexOf ('}'));
	string =  string.replace('{','');
	string =  string.replaceAll("\"nombreTabla\":",'');
	obj =JSON.parse(string);
	if((Object.keys(obj).length==1)&&(Object.keys(obj)[0]!="0")){
		string = limpiarJson(string);
	}
	return string;
}
/**
 * funcion para organizar el json qque necesita kendo para pintar la grafica
 * @param {type} json que obtiene
 * @returns {Array|Object}
 */
function pintarGrafica(txt1){//funcion para organizar el json qque necesita kendo para pintar la grafica
	try{
		txt1 = limpiarJson(txt1);
		var serie = txt1.replaceAll("columna1","name");
		serie = serie.replaceAll("columna2","data");
		var series = JSON.parse(serie);
		for(var x = 0;x<Object.keys(series).length-35;x++){
			var numero =series[x].data;
			numero=numero.replaceAll(",","");
			if( (/^\d+/.test(numero)) ) {
				var texti = series[x].data;// data debe ser numerico y separado por , eje 33,22,44
				series[x].data = "["+texti +"]";
			}else {alert("No hay valores numericos para realizar el grafico.");}
			
		}
		serie = JSON.stringify(series);
		serie = serie.replaceAll("\"[","[");
		serie = serie.replaceAll("]\"","]");
		var seriesg = JSON.parse(serie);
		return seriesg;
	} catch(e){
		alert("fun intarGrafica error: <br>"+e.message);
	}
}
/**
 * cambia las llaves de las columnas por columna# esto por que los servicios no se entregaban correctamente
 * @param {type} textAreaJSON json en string con solo se han cambiado los nombres de la tabla
 * @returns {modificarJSON.string} string con las llaves modificadas
 */
function modificarJSON(textAreaJSON){
	try{
		var string=textAreaJSON;
		var JSONObject2=JSON.parse(string);
		var nomTabZonaActual=Object.keys(JSONObject2).toString();
		string=string.replaceAll(nomTabZonaActual,"nombreTabla");
		var obj5 = JSON.parse(string);
		for (var i = 0; i<Object.keys(obj5).length+1; i++) { //loop through the array
			cont1=0;
			var obj = obj5.nombreTabla.length;
			if(obj){
				var obj = obj5.nombreTabla[i];
				for (var key in obj) { //loop through the keys
					cont1=cont1+1;
					string=string.replaceAll("\""+key+"\":","\""+"columna"+cont1+"\":");
					
				}
			}
			}
			
		return string;
	}catch (e) {
		return null;
	}
}
/**
 * 
 * @param {type} textAreaJSON
 * @returns {modificarJSONKendo.string}
 */
function modificarJSONKendo(textAreaJSON){
	try{
		var string=textAreaJSON;
		var obj5 = JSON.parse(string);
		cont1=0;
		for (var key in obj5) {
			cont1=cont1+1;
			string=string.replaceAll("\""+key+"\":","\""+"columna"+cont1+"\":");
		}
		return string;
	}catch (e) {
		return null;
	}
}
function nombreJson(json){
	var string = json;
	var JSONObject2=JSON.parse(string);
	var nomTabZonaActual=Object.keys(JSONObject2).toString();
	string=string.replaceAll(nomTabZonaActual,"nombreTabla");
	string =  string.substring(0, string.lastIndexOf ('}'));
	string =  string.replace('{','');
	string =  string.replaceAll("\"nombreTabla\":",'');
	obj =JSON.parse(string);
	if(Object.keys(obj).length==1){
		string = nombreJson(string);
	}
	return string;
}

function camposLookUp(jsonKendo,jsonLookUp){
	var datos = {};
	try{
		jsonLookUp = remplazaMenosLlaves(jsonLookUp);
		jsonKendo = remplazaMenosLlaves(jsonKendo);
		var json = nombreJson(jsonKendo);
		var lookUp = modificarJSON(jsonLookUp);
		json = JSON.parse(json);
		lookUp = JSON.parse(lookUp);
		
		for(var key in json[0]){
			var  a = partir(key);
			if(a== "cod"){
				for(var i=0; i<lookUp.nombreTabla.length;i++ ) {
					if( lookUp.nombreTabla[i].columna5 === key ){
						var jsonAnt = lookUp.nombreTabla[i].columna5;
						if(datos[jsonAnt]){
							datos[lookUp.nombreTabla[i].columna5].push({
								"campo": lookUp.nombreTabla[i].columna5,
								"cod": lookUp.nombreTabla[i].columna4,
								"des": lookUp.nombreTabla[i].columna7,
						});
						}else{
							datos[lookUp.nombreTabla[i].columna5]=[{
								"campo": lookUp.nombreTabla[i].columna5,
								"cod": lookUp.nombreTabla[i].columna4,
								"des": lookUp.nombreTabla[i].columna7,
						}];
						}
						
					}
				}
			}
		}
	}catch(err){
		alert(err.message + " camposLookUp");
	}
	return datos;
}

function partir(string){
	var cambia = string.split('_');
	return(cambia[1]);
}

String.prototype.replaceAll = function(token, newToken, ignoreCase) {
	var str = this + "";
	var i = -1;
	if (typeof token === "string") {
		if (ignoreCase) {
			_token = token.toLowerCase();
			while ((i = str.toLowerCase().indexOf(token,
					i >= 0 ? i + newToken.length : 0)) !== -1) {
				str = str.substring(0, i) + newToken
						+ str.substring(i + token.length);
			}
		} else {
			return this.split(token).join(newToken);
		}
	}
	return str;
};


/**
 * funcionn actualizada para generar un formato xml para cualquier numero de datos
 * @param {type} name nombre de la tabla 
 * @param {type} arreglo obj json o arreglo a modificar
 * @param {type} SegVerNull en caso de que el dato sea nulo algunos xml piden una configuracion especial si es true la pone
 * @returns {String} una estructura xml con los datos listoa
 */

function datoXmlV2(name,arreglo,SegVerNull){//funcionn actualizada para generar un formato xml para cualquier numero de datos
	try{
		var Keys="";
		var Dato= "";
		var Datos= "";
		var xml = "";
		for(var key in arreglo){
			Keys = key;
			Datos = arreglo[key];
			if(Datos == "si"){
				Datos = "true";
			}
			if(Datos == "no"){
				Datos = "false";
			}
			if((typeof Datos === 'number')||(typeof Datos === 'boolean')){
				Dato = Datos.toString();
			}else{
				Dato = Datos;
			}
			if((Dato=="")&&(SegVerNull==true)){
				xml = xml + "<" + Keys + "/>\r\n";
			}else {
				xml = xml + "<" + Keys + ">" + Dato + "</" + Keys + ">\r\n";
			}
		}
		if(xml){
			var xml2 = xml;
			xml = "";
			xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
			xml = xml + "<" + name + " xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n";
			xml = xml + "<" + name + "Row>\r\n";
			xml = xml + xml2;
			xml = xml + "</" + name + "Row>\r\n";
			xml = xml + "</" + name + ">";
		}
		return xml;
	}catch(err){
			alert(err.message);
		}
}
/**
 * pasa de arreglo a un objjson
 * @param {type} arreglo
 * @param {type} nombre nombre del obj json
 * @returns {Array|pasarObj.obj|Object} obj json 
 */
function pasarObj(arreglo,nombre){
	try{
		var obj = [];

		for (var i =0; i<=arreglo.length;i++){
			obj.push({
				"nombre": arreglo[i],
			});
		}
		var txt = (JSON.stringify(obj));
		txt= txt.replaceAll("\""+"nombre"+"\":","\""+nombre+"\":");
		obj = JSON.parse(txt);
		return obj;	
	}catch(e){
		alert("Function: pasarObj Error: "+e.message);
	}
}
/**
 * funcion con una expreg que pone - en vez de los _ para enviarlos al servicio
 * @param {type} s1 todo e string 
 * @returns {unresolved}un string con los 
 */
function remplaza_porMenos(s1) {
	var test = /(_\d+(\._\d*)?)\b/g;
	var s2 = s1.replace(test,
		function($0,$1,$2)
		{ 
			return(($1.replace("_","-")));
		}
	)
	return s2;
}
/**
 * reemplaza los - por _
 * @param {type} s1
 * @returns {unresolved}
 */
function remplazaMenosLlaves(s1) {
	var test = /([abc]*-[a-zA-z]+(\.-[abc]*)?)\b\":/g;
	var s2 = s1.replace(test,
		function($0,$1,$2)
		{ 
			return(($1.replace("-","_")+"\":"));
		}
	)
	return s2;
}
/**
 * Crear un elemento label dentro de un div
 * @param {type} id id del nuevo label
 * @param {type} titulo valor del label
 * @param {type} div div al cual sele asigna el nuevo elemento
 * @param {type} fuente tipo de fuente del label
 * @param {type} color si quiere un color especifico
 * @param {type} tipo en caso de ser Editor cambia ya que necesita un tam especifico
 * @returns {undefined}
 */
function  crearLabel (id,titulo,div,fuente,color,tipo){
	var newlabel = document.createElement("Label");
	newlabel.id = id;
	newlabel.setAttribute("for","text" + id);
	if(tipo=='editor'){//en caso de que sea un label para editor le coloca este estilo para mostrarlo en la parte superior
		newlabel.style.verticalAlign = '220%'; 
	}
	newlabel.style.font= fuente;
	newlabel.innerHTML = titulo;
	document.getElementById(div).appendChild(newlabel);
}
/**
 * Al igual que el label  este crea un font 
 * @param {type} titulo valor del font
 * @param {type} div div al que se le asigna el nuevo elemento 
 * @param {type} tam tamaño de font
 * @param {type} color si el usuario quiere un color especifico
 * @returns {undefined}
 */
function  crearFont (titulo,div,tam,color){
	var font = document.createElement('font');
	font.setAttribute('color', color);
	font.setAttribute('size', tam);
	font.innerHTML = titulo;
	document.getElementById(div).appendChild(font);
}
/**
 * Crea un elemento input 
 * @param {type} id id del nuevo elemeto
 * @param {type} div div el cual se le asignara el nuevo elemento
 * @returns {undefined}
 */
function  crearInput (id,div){
	var newInput = document.createElement("INPUT");
	newInput.id = id;
	newInput.name = "text";
	document.getElementById(div).appendChild(newInput);
}
/**
 * en caso de tener un input con un eventochange o casacada
 * @param {type} id id del elemento
 * @param {type} div div al cual va  a ser asignado el nuevo elemento
 * @param {type} funcion funcion que se le asigna en caso de modificacio 
 * @param {type} idCmpDpd id del campo que cambiara
 * @param {type} evento
 * @returns {undefined}
 */
function  crearInputCmpDpd (id,div,funcion,idCmpDpd,evento){
	funcion  = funcion+'( \"'+idCmpDpd+'\",\"'+id+'\")';
	crearInputEvento (id,div,funcion,evento);
}

function  crearInputEvento (id,div,funcion,Event){
	var newInput = document.createElement("INPUT");
	newInput.id = id;
	newInput.name = "text";
	newInput.setAttribute(Event, funcion);
	document.getElementById(div).appendChild(newInput);
}
/**
 * Crea un Input con lupa 
 * @param {type} id id del nuevo elemento
 * @param {type} div donde va a crear el nuevo elemento
 * @param {type} busqueda url de la pagina donde va a ir a buscar
 * @returns {undefined}
 */
function  crearInputBE (id,div,busqueda){
	var span = document.createElement("span");
	span.setAttribute('class', "k-textbox k-button k-space-right");
	var newInput = document.createElement("INPUT");
	newInput.id = id;
	var elem = document.createElement("img");
	var link = document.createElement('a');
	elem.id = id+"img";	
	busqueda = 'busquedaExtendida( \"'+busqueda+','+id+'\")';
	link.setAttribute('href', '#');
	link.setAttribute('onClick', busqueda);
	link.setAttribute("class","k-icon k-i-search");
	span.appendChild(newInput);
	span.appendChild(link);
//	try{}catch(e){}
	document.getElementById(div).appendChild(span);
}
/**
 * En caso de tener label es necesario montar un espacio o un salto del linea 
 * @param {type} tipo varia en salto de linea o solo un espacio
 * @param {type} longiel nuemero de espacios o saltos 
 * @param {type} div div al que le le va a signar el espacio o salto
 * @param {type} ExtTamPoUp
 * @returns {undefined}
 */
function  crearEspacio_salto (tipo,longi,div,ExtTamPoUp){
 var newlabel = document.createElement("Label");
 var longitud = ""; 
 if(tipo=="jumpLine"){
  tipo = "<br>";
 }else{
  tipo = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
 }
 for(var i=0;i<longi;i++){
  longitud = longitud +tipo;
 }
 newlabel.innerHTML = longitud;
 if(ExtTamPoUp){
  var tam = 'margin-left:'+ExtTamPoUp;
  newlabel.setAttribute('style', tam);
 }
 document.getElementById(div).appendChild(newlabel);
}
/**
 * Crea un nuevo elemento buttton
 * @param {type} id id del nuevo elemtento button
 * @param {type} titulo 
 * @param {type} div donde se va a crear el nuevo elemento 
 * @param {type} clase stilo css que contiene el button
 * @returns {undefined}
 */
function  crearButton (id,titulo,div,clase){
	var boton = document.createElement("button");
	boton.type = "button";
	boton.id = id;
	boton.setAttribute("class",clase);
	var texto = document.createTextNode(titulo); 
	boton.appendChild(texto); 
	document.getElementById(div).appendChild(boton);
}
/**
 * identifica en que navegador se esta ejecutando la aplicacion 
 * @returns {navigator.appVersion|String} el navegador en el cual se esta ejecutando
 */
function identBrowser (){
	var  browser = navigator.appVersion;
	if(/\w*Edge\//g.exec(browser)){
		browser = "Edge";
	}else if(/\w*Chrome\//g.exec(browser)){
		browser =  "Chrome";
	}else {browser = "Mozilla";} 
	return  browser;
}
/**
 * En caso de que se necesiten listas en un combobox que no estan en el servicio lookup 
 * @param {type} lookup lista de los nnuevos elementos
 * @returns {String}
 */
function putLookUoQue(lookup){
	var lookupQuemado= '\"Estado/cod\":[\"0\",\"1\",\"2\",\"3\"],\"Estado/des\":[\"Activa\",\"Terminada\",\"Cancelada\",\"En Espera\"]';//viene de la bd
	if(lookupQuemado){
		if(lookup.slice(-1)=='}'){
			lookup = lookup.slice(0,-1);
			lookup = lookup+',' +lookupQuemado+ '}';
		}
	}
	if ((lookup=="")&&(lookupQuemado!="")){
		lookup = "{" + lookupQuemado + "}";
	}
	return  lookup;
}/**
 * obtiene las dos primeras llaves de un obj json. De los que se obtienen de BD Progress
 * @param {type} obj json con todas las llaves
 * @returns {obtdosPLlaves.jsonLlaves} las llaves del json
 */
function obtdosPLlaves(obj){//obtiene las dos primeras llaves de un obj json. De los que se obtienen de BD Progress
	var llavestxt1="";
	var llavestxt2="";
	var jsonLlaves = {};
	for (var key in obj) {//saca las llaves del json de entrada
				llavestxt1 = (key);
				for (var key1 in obj[key]) {//saca las llaves del json de entrada
					llavestxt2 = (key1);
					break; 
				} 
				break;
			}
	jsonLlaves["llavestxt1"] = llavestxt1;
	jsonLlaves["llavestxt2"] = llavestxt2;
	return  jsonLlaves;
}
/**
 * Coge el objeto que responde el servicio de consluta y cambia los valores codigo por los valores dedescripcion
 * @param {type} json json del serviciio
 * @param {type} lookup json del lookup
 * @param {type} ind 
 * @param {type} llave1 primera llave del servicio o nombre de tabla
 * @param {type} llave2 segunda  llave del servicio o nombre de subtabla
 * @returns {@var;obj}
 */
function cambianit(json, lookup, ind,llave1,llave2) {
	try {
		lookup="["+lookup+"]";
		lookup=JSON.parse(lookup)
		obj=JSON.parse(json);
		json=obj;
		var bole="no";
		var lookups=[];
		for ( var key in json[llave1][llave2][0]) {
			for ( var key2 in lookup[0]) {
				if (key + "/cod" == key2) {
					lookups.push(key);
				}
			}
		}
		for(var i=0; i<json[llave1][llave2].length;i++){
			for(var j=0;j<lookup.length;j++){
				for(var k=0;k<lookups.length;k++){
					var arreglocods=lookup[j][lookups[k]+"/cod"];
					var arreglodsc=lookup[j][lookups[k]+"/des"];
					if((lookups[k]!="Capitulo")&&(lookups[k]!="Proyecto")){
					for(var n=0; n<arreglocods.length;n++){
						if(ind==1){
							if((json[llave1][llave2][i][lookups[k]]).toString()==(arreglocods[n]).toString()){
								json[llave1][llave2][i][lookups[k]]=arreglodsc[n];
								var tamLlaveLook = lookups[k].length;
								for(var m=0; m<ArregloAppAbl.length;m++){
									if(ArregloAppAbl[m].slice(-tamLlaveLook) == lookups[k]){
										typeItem[m] = 'string';
											lookUpQuemado.push(lookups[k]);
									break;
									}
								}
							}
						}else if(ind==2){
							if((json[llave1][llave2][i][lookups[k]]).toString()==(arreglodsc[n]).toString()){
								json[llave1][llave2][i][lookups[k]]=arreglocods[n];
							}
						}
					}
					}
				}
			}
		}
		return json;
	} catch (e) {
		alert(e);
	}
}
/**
 * crea un elemento html tipo date . Solo sirve en caso de que se utilice la arquitectutra de openEdge ya que hay un conflicto con este ide por lo que no acepta el elemento date
 * @param {type} id id del nuevo elemento
 * @param {type} div div al que se le asigna el nuevo elemento
 * @param {type} tipo en caso de ser  fecha o hora
 * @returns {undefined}
 */
function  crearInputDate (id,div,tipo){
	 var newInput = document.createElement("INPUT");
	 newInput.id = id;
	 //newInput.type = "date";
	 newInput.name = "text";
	 if(tipo =='date'){
		newInput.setAttribute("type","date"); 
	 }else if(tipo == 'hora'){
		newInput.setAttribute("type","time");
	}
	 
	 document.getElementById(div).appendChild(newInput);
}
/**
 * 
 * crea un elemento html tipo Editor
 * @param {type} id id del nuevo elemento
 * @param {type} div div al que se le asigna el nuevo elemento
 * @returns {undefined}
 */
function  crearTextArea (id,div){
	 var newInput = document.createElement("textarea");
	 newInput.id = id;
	 newInput.name = "text";
	 newInput.setAttribute("data-bind","value: textareaValue");
	 newInput.setAttribute("class","k-textbox");//le pone un clase kendo
	 newInput.setAttribute("style","height: 100px; width: 200px;");//le pone un estilo kendo
	 document.getElementById(div).appendChild(newInput);
}/**
 * 
 * Modifivca un input para ponerlo como una lista tipo Kendo
 * @param {type} elemento id que se quiere modificar
 * @param {type} lista arreglo que se le asignara al elemento kendo
 * @returns {undefined}
 * @returns {undefined}
 */
function comboBoxKendo (elemento,lista){
	var fecha = new Date();
	var ano = fecha.getFullYear();
 	elemento= $("#"+elemento);//DECLARO EL ELEMENTO COMO UN OBJ JQUERY
	//var lista = [];//LISTA DE DATOS QUE VA A TENE EL ELEMENTO DE KENDO
	if(!lista){
		lista.push(" ");
	}
	//elemento.data("kendoComboBox").value(null);//LIMPIO TODO EL ELEMENTO KENDO 
	elemento = elemento.kendoComboBox({//CREO EL ELEMENTO DE NUEVO Y PONGO SUS NUEVOS VALORES
		dataSource: lista,
		filter: "contains",
		suggest: true,
		index: 0
	});
}
/**
 * crear los elementos html que van a ser mostrados en un popUP
 * @param {type} clickGrilla en caso de dar click en un boton Editar  el recoge todos los datos de la fila y los va a colocar en la variable valor field
 * @param {type} titulo bandera que diferencia si el usuario da click en editar o crear
 * @returns {undefined}
 */
function fieldsPopUp(clickGrilla,titulo){//creacion del popup de CU
	try{
		var arregloRelCampo1 =["EmpresaCliente","Proyecto"];//ARREGLO PARA RELACIONAR DOS CAMPOS EN EL POPUP CAMPO oRIGEN CON EVENTO ONCHANGE
		var arregloRelCampo2 =["Proyecto","Capitulo"];//ARREGLO PARA RELACIONAR DOS CAMPOS EN EL POPUP CAMPO DESTINO SIN EVENTO ONCHANGE
		var invPop = ["Consecutivo"];
		var numcarac = 14;
		var nameField = titulos;//arreglo que coloca el id a cada input
		var  valorField = [];
		var elem = document.getElementById("ButtonFiltr");
		elem.value = titulo;
		var ItemField = [];//arreglo que coloca un string para refernciar el input
		var  clickGrillaStr = JSON.stringify(clickGrilla);
		clickGrilla = JSON.parse(clickGrillaStr);

		for (var key in jsonAppAbl){//saca las llaves del json de entrada
			ItemField.push(key);
			if(titulo=="Editar"){
				valorField.push(clickGrilla[key]); 
			}else if("Crear"){
				valorField.push(""); 
			}
		}
		limpiar("labelPopUp");
		limpiar("labelMensaje");//LIMPIO TODO EL POPUP PARA CREAR UNO DESDE CERO
		for(var i=0;i< ItemField.length;i++){//en este for se pueden modificar todos los inputs que aparecen en el popUp, ya que es necesario para generara ciertas condiciones(rangos y demas).
			if((cInvisibles.indexOf(ItemField[i]))<0){// SI NO SON INVISIBLES EN LA GRILLA LOS PONGO EN EL POPUP
				if(arrgloLinkCampo.indexOf(ItemField[i])!=-1){//SI EL CAMPO TIENE ASIGNADO UN LINK ES BUSQUEDA EXTENDIDA
					noInvPop(i,invPop,ItemField,nameField,'urlBE');
				}else if(typeItem[i]=="date"){
					noInvPop(i,invPop,ItemField,nameField,"date");
				}else if(typeItem[i]=="hora"){
					noInvPop(i,invPop,ItemField,nameField,"hora");
				}else if(typeItem[i]=="editor"){
					noInvPop(i,invPop,ItemField,nameField,"editor");	
				}else if(arregloRelCampo1.indexOf(ItemField[i])!=-1){
					noInvPop(i,invPop,ItemField,nameField,'onChange',arregloRelCampo2[arregloRelCampo1.indexOf(ItemField[i])]);
				}else{
					noInvPop(i,invPop,ItemField,nameField);
				}
			}
			if((jsonAppAbl[ItemField[i]])||(isNumber (jsonAppAbl[ItemField[i]]))){//SI SOLO SE PUEDE VER LA INFO DEL CAMPO 
				document.getElementById(ItemField[i]).value = jsonAppAbl[ItemField[i]]
				modTextboxPopupFl(ItemField[i],typeItem[i],"readonly");
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			}else if(invPop.indexOf(ItemField[i])>=0){//EN CASO DE QUE SOLO SEA INVISIBLE EN EL POPUP SOLO ECULTO LOS INPUT Y LABEL PARA ASIGNARLOS DESPUES EN UN CUD Y QUE NO SE PIERDAN LOS DATOS
				document.getElementById(ItemField[i]).value = valorField[i]
				document.getElementById("labelsPopUp"+ItemField[i]).style.display = "none";
				document.getElementById(ItemField[i]).style.display = "none";
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			
			}else{
				document.getElementById(ItemField[i]).value = valorField[i]
				modTextboxPopupFl(ItemField[i],typeItem[i]);
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			}
//			document.getElementById("Ciudad").value = "";
		}
		crearEspacio_salto ("jumpLine",2,"labelPopUp");
		crearEspacio_salto ("jumpLine",2,"labelPopUp",tamPopUp);
		if(ItemField.length>15){//crea un espacio al final del popup, esto con el fin de adaptar el ancho del popup al label mas grande
			if("Mozilla"==identBrowser()){
				numcarac = numcarac+5;
			}
			crearEspacio_salto ("espacio",(numcarac/2)+8,"labelPopUp");
		}
	}catch(e){
		alert("Function: fieldsPopUp Error: "+e.message);
	}
}/**
 *  funcion para determinar si el campo es invisible en el popup
 * @param {type} i la iteracion que viene de la funcion fieldsPopUp
 * @param {type} invPop bandera para determinar si es invisible o no
 * @param {type} ItemField id del nuevo elemento a crear
 * @param {type} nameField el label que se le va a colocar al nuevo elemento
 * @param {type} tipo el tipo de dato que esta en las primeras lineas del codigo principal de la funcion
 * @param {type} campoDes en caso de que el elemto tenga un eventChage en esta variable viene el id del elemento que a a sufrir el cambio por lo general es un campo en cascada
 * @returns {undefined}
 */
function noInvPop(i,invPop,ItemField,nameField,tipo,campoDes){//PARA VALIDAR QUE TIPO DE CAMPO ES EN CASO DE QUE SEA BUSQUEDA EXTENDIDA SI SON INVISIBLES EN EL POPUP
	if(invPop.indexOf(ItemField[i])<0){//SI SON INVISIBLES pOPup
		if(i==0){
			if("Mozilla"==identBrowser()){//MOZILLA TIENE ALGUNOS PROBLEMAS Y CON ESTO LO ADAPTO PARA QUE NO SE VEA MAL
				crearEspacio_salto ("jumpLine",1,"labelPopUp");
			}else{crearEspacio_salto ("jumpLine",2,"labelPopUp");}
		}else{crearEspacio_salto ("jumpLine",2,"labelPopUp");}
		crearLabel ("labelsPopUp"+ItemField[i],nameField[i]+": ","labelPopUp","13px Verdana","",tipo);
		if(tipo == 'urlBE'){//SI ES BUSQUEDA EXTENDIDA LE COLOCO UNA URL
			var urlBE = url + arrglojLinkURL[arrgloLinkCampo.indexOf(ItemField[i])] + "/Start.jsp";
			crearInputBE (ItemField[i],"labelPopUp",urlBE);//FUNCION QUE COLOCA IMAGEN DE BUSQUEDA Y LINK PARA ABRIR OTRA PAG
		}else if(tipo == 'onChange'){//SI TIENE UN EVENTO ONCHANGE EL CAMPO
			crearInputCmpDpd (ItemField[i],"labelPopUp","onChangeCmp",campoDes,'onchange');//onChangeCmp ES EL NOMBRE DE LA FUNCION QUE QUIERO QUE EJECUTE CON EL EVENTO ONCHANGE
		}else if((tipo == 'date')||(tipo == 'hora')){//SI el campo tiene un formato de fecha
			crearInputDate (ItemField[i],"labelPopUp",tipo);
		}else if(tipo == 'editor'){//SI el campo tiene un formato de editor
			crearTextArea (ItemField[i],"labelPopUp"); 
		}else{
			crearInput (ItemField[i],"labelPopUp");
		}
	}else{
		crearLabel ("labelsPopUp"+ItemField[i],nameField[i]+": ","labelPopUp","13px Verdana","",tipo);
		if(tipo == 'date'){//SI el campo tiene un formato de fecha
			crearInputDate (ItemField[i],"labelPopUp");
		}else if(tipo == 'editor'){//SI el campo tiene un formato de fecha
			crearTextArea (ItemField[i],"labelPopUp"); 
		}else{crearInput (ItemField[i],"labelPopUp");}
		//crearInput (ItemField[i],"labelPopUp");
	}
}/**
 * Esta funcion sirve para hacer la cascada entre campo
 * @param {type} campoDes
 * @param {type} campoOri
 * @returns {undefined}
 */
function onChangeCmp (campoDes,campoOri){
	try{
		
		var dCampoOri = document.getElementById(campoOri).value
		var vCampoOri = lookup[campoOri].cod[lookup[campoOri].des.indexOf(dCampoOri)];
		var campoOri1= null;
		var objreljson ={};
		var reljson=document.getElementById("textArea10").value
		var objLlaves = {};
		var objAnt = new Array();
		var objRel = {};
		//var listaAnt = sessionStorage.getItem("lista");
		var elemento= $("#"+campoDes);//DECLARO EL ELEMENTO COMO UN OBJ JQUERY
		var lista = [];//LISTA DE DATOS QUE VA A TENE EL ELEMENTO DE KENDO
		
		reljson =  remplazaMenosLlaves(reljson);// obtengo json de relacion Y REMPLAZO LOS MENOS CON GUION AL PISO

		if(reljson){
			objreljson = JSON.parse(reljson);
		}
		objLlaves =  obtdosPLlaves(objreljson);//obtengo las dos primeras llaves de obj para mapear el json el las siguientes consultas
		
		if(!objreljson[objLlaves.llavestxt1][objLlaves.llavestxt2][1][campoOri]){
			campoOri1 = "ter_nit";
		}
		var cmpComb1 = campoOri1;
		
		if(!cmpComb1){
			cmpComb1 = campoOri;
		} 
		var t = $("#labelPopUp .k-widget.k-combobox.k-header");
		var desLink = false;
		for (var i = 0; i<t.length; i++){
			var id = t[i].children[1].id;
			if(t[i].children[id].onchange!=null){
				if(id === campoDes){
					desLink = true;
				}
				var objAnt1= {}
				var descr = document.getElementById(id).value;//obtengo la inf seleccionada en el combo
				var cod = lookup[id].cod[(lookup[id].des.indexOf(descr))];//obtengo el codigo relacionado a la descripcion anterior
				if(id == "EmpresaCliente"){
					objAnt1 = {"cmpComb":"ter_nit","texto":descr,"cod":cod,"id":i}; 
				}else{
					objAnt1 = {"cmpComb":id,"texto":descr,"cod":cod,"id":i}; 
				}
				objAnt.push(objAnt1);
			}
		}
		objRel = objreljson[objLlaves.llavestxt1][objLlaves.llavestxt2];//obtengo todo el objeto que contiene todas las relaciones
		for(var i = 0;i<objRel.length;i++){//ciclo para colocar en una lista los item asociados al campo destino
			var valrel= true;
			if(objAnt){
				/*ciclo para hacer el join con los combos anteriores en caso de que
					no encuentre relacion con los combox anteriores decarta la 
					consulta y sigue con la otra*/
				for(var j = 0; j < objAnt.length;j++){
					if(((objRel[i][objAnt[j].cmpComb])!= objAnt[j].cod)&&(objAnt[j].texto!="")){
						valrel = false;
					}
				}
			}
			if(valrel===true){
				var dscCmp = lookup[campoDes].des[lookup[campoDes].cod.indexOf(objRel[i][campoDes])];//obtengo la descripcion del campo a partir del lookup
				if((vCampoOri)&&(objRel[i][campoOri]==vCampoOri)){//RECORRO EL JSON PARA VALIDAR SI HAY COINCIDENCIAS CON EL ITEM QUE QUIERO QUE FILTRE
					lista.push(dscCmp);//ADICIONO A LA LISTA
				}else if(campoOri1!=null){
					if(objRel[i][campoOri1]==vCampoOri){//RECORRO EL JSON PARA VALIDAR SI HAY COINCIDENCIAS CON EL ITEM QUE QUIERO QUE FILTRE
						var index = lista.indexOf(dscCmp);
						if(index==-1){
							if((lookup[campoDes].cod.indexOf(objRel[i][campoDes]))!=-1){
								lista.push(dscCmp);//ADICIONO A LA LISTA
							}
						}
					}
				}
			}
		}
		
		if(!lista){//en caso de que no tenga info lista lo deja con espacio para enviarlo al obj kendo 
			lista.push(" ");
		}
		
		 
		elemento.data("kendoComboBox").value(null);//LIMPIO TODO EL ELEMENTO KENDO 
		elemento = elemento.kendoComboBox({//CREO EL ELEMENTO DE NUEVO Y PONGO SUS NUEVOS VALORES
			dataSource: lista,
			filter: "contains",
			suggest: true,
			index: 0
		});
		
		
		if(desLink==true){
			document.getElementById(campoDes).onchange();
		}
	}catch(e){
		alert("Function: onChangeCmp Error: "+e.message);
	}
}

