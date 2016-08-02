function createStyleSheet(url) {
    var x = document.createElement("LINK");
    x.setAttribute("rel", "stylesheet");
    x.setAttribute("type", "text/css");
    x.setAttribute("href", url+"Base_Integrity/css/cssSpriteIntegrity.css");
    document.head.appendChild(x);
}



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
}
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
			//elemento.kendoMaskedTextBox({mask: "0000-00-00"});
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
}
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
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
function regresarPag(){
 try{
  cabeceraOld = sessionStorage.getItem("cabeceraLast");
  var links="";
  if((cabeceraOld!="[]")){

   if(cabeceraOld){
    obj = JSON.parse(cabeceraOld);
    objLength = ((obj.length)-1);
    sessionStorage.setItem("cabeceraLast",JSON.stringify(obj.slice(0,(obj.length)-1)));
    sessionStorage.setItem("cabeceraNew",JSON.stringify(obj[objLength]));
   }else{sessionStorage.setItem("cabeceraNew","[]");}

  }else{sessionStorage.setItem("cabeceraNew","[]");}
  cabeceraLink = sessionStorage.getItem("cabeceraLink");
  objlink = JSON.parse(cabeceraLink);
  objlinkLength = ((objlink.length)-1);
  sessionStorage.setItem("cabeceraLink",JSON.stringify(objlink.slice(0,(objlink.length)-1)));
  links = objlink[(objlink.length)-1].url;
  cabeceraLlaves = sessionStorage.getItem("cabeceraLlaves");
  objLlaves = JSON.parse(cabeceraLlaves);
  objLlavesLength = ((objLlaves.length)-1);
  sessionStorage.setItem("cabeceraLlaves",JSON.stringify(objLlaves.slice(0,(objLlaves.length)-1)));
  window.location = links;
 }catch(e){
  alert("Function: regresarPag Error: "+e.message);
 }
}
function loginValido(){
	var login=sessionStorage.getItem("loginintegrity");
	if(login=="cerrado"){
		cerrarSesion();
	}
	else{
		sessionStorage.setItem("loginintegrity","valido");
	}
}
//renderizar los datos opbtenidos de los servicios 
function limpiarJson(textAreaJSON){
	var string =   modificarJSON(textAreaJSON);
	string =  string.substring(0, string.lastIndexOf ('}'));
	string =  string.replace('{','');
	string =  string.replaceAll("\"nombreTabla\":",'');
	obj =JSON.parse(string);
	if(Object.keys(obj).length==1){
		string = limpiarJson(string);
	}
	return string;
}
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

function datoXML(name,atributo1,contenido1,atributo2,contenido2,atributo3,contenido3,atributo4,contenido4,atributo5,contenido5,atributo6,contenido6,atributo7,contenido7,atributo8,contenido8,atributo9,contenido9,atributo10,contenido10){
    var xml="";
    try{
    
    if(atributo1){
    	xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n";
    	xml = xml + "<" + name + " xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n";
    	xml = xml + "<" + name + "Row>\r\n";
    	xml = xml + "<" + atributo1 + ">" + contenido1 + "</" + atributo1 + ">\r\n";
		if(atributo2){
			xml = xml + "<" + atributo2 + ">" + contenido2 + "</" + atributo2 + ">\r\n";
			if(atributo3){
				xml = xml + "<" + atributo3 + ">" + contenido3 + "</" + atributo3 + ">\r\n";
				if(atributo4){
					xml = xml + "<" + atributo4 + ">" + contenido4 + "</" + atributo4 + ">\r\n";
					if(atributo5){
						xml = xml + "<" + atributo5 + ">" + contenido5 + "</" + atributo5 + ">\r\n";
						if(atributo6){
							xml = xml + "<" + atributo6 + ">" + contenido6 + "</" + atributo6 + ">\r\n";
							if(atributo7){
								xml = xml + "<" + atributo7 + ">" + contenido7 + "</" + atributo7 + ">\r\n";
								if(atributo8){
									xml = xml + "<" + atributo8 + ">" + contenido8 + "</" + atributo8 + ">\r\n";
									if(atributo9){
										xml = xml + "<" + atributo9 + ">" + contenido9 + "</" + atributo9 + ">\r\n";
										if(atributo10){
											xml = xml + "<" + atributo10 + ">" + contenido10 + "</" + atributo10 + ">\r\n";
										}
									}
								}
							}
						}
					}
				}
			}
		}
		xml = xml + "</" + name + "Row>\r\n";
		xml = xml + "</" + name + ">";
    }
    }catch(err){
			alert(err.message);
		}
    
    return xml;
}


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
function  crearFont (titulo,div,tam,color){
	var font = document.createElement('font');
	font.setAttribute('color', color);
	font.setAttribute('size', tam);
	font.innerHTML = titulo;
	document.getElementById(div).appendChild(font);
}
function  crearInput (id,div){
	var newInput = document.createElement("INPUT");
	newInput.id = id;
	newInput.name = "text";
	document.getElementById(div).appendChild(newInput);
}
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
function  crearButton (id,titulo,div,clase){
	var boton = document.createElement("button");
	boton.type = "button";
	boton.id = id;
	boton.setAttribute("class",clase);
	var texto = document.createTextNode(titulo); 
	boton.appendChild(texto); 
	document.getElementById(div).appendChild(boton);
}

function identBrowser (){
	var  browser = navigator.appVersion;
	if(/\w*Edge\//g.exec(browser)){
		browser = "Edge";
	}else if(/\w*Chrome\//g.exec(browser)){
		browser =  "Chrome";
	}else {browser = "Mozilla";} 
	return  browser;
}
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
}
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
function  crearInputDate (id,div,tipo){
	 var newInput = document.createElement("INPUT");
	 newInput.id = id;
	 newInput.type = "date";
	 newInput.name = "text";
	 if(tipo =='date'){
		newInput.setAttribute("type","date"); 
	 }else if(tipo == 'hora'){
		newInput.setAttribute("type","time");
	}
	 newInput.setAttribute("class","k-textbox");//le pone un estilo kendo
	 if(identBrowser ()== "Mozilla"){//si el navegador es mozilla monta el calendario con otra estructura ya que el calendario de htmlsolo sirve en chrome
		 // src="//cdn.jsdelivr.net/webshim/1.14.5/polyfiller.js//extrae las funcuiones desde esta url
		 newInput.setAttribute("data-date",'{"startView": 2, "openOnMouseFocus": true}');//lleva al usuario al calendariio por mes en caso de utilizar mozilla como navegador
		 $('#'+div).load('ajax/test.html', function(){
			 $(this).updatePolyfill();
		 });
		 webshims.setOptions('forms-ext', {types: 'date'});
		 webshims.polyfill('forms forms-ext');
		 webshims.setOptions('wspopover', {appendTo: 'body'});
		 webshims.setOptions('waitReady', false); 
	 }
	 document.getElementById(div).appendChild(newInput);
}
function  crearTextArea (id,div){
	 var newInput = document.createElement("textarea");
	 newInput.id = id;
	 newInput.name = "text";
	 newInput.setAttribute("data-bind","value: textareaValue");
	 newInput.setAttribute("class","k-textbox");//le pone un clase kendo
	 newInput.setAttribute("style","height: 100px; width: 148.8px;");//le pone un estilo kendo
	 document.getElementById(div).appendChild(newInput);
}
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
				sbm.util.setValue(ItemField[i],jsonAppAbl[ItemField[i]]);
				modTextboxPopupFl(ItemField[i],typeItem[i],"readonly");
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			}else if(invPop.indexOf(ItemField[i])>=0){//EN CASO DE QUE SOLO SEA INVISIBLE EN EL POPUP SOLO ECULTO LOS INPUT Y LABEL PARA ASIGNARLOS DESPUES EN UN CUD Y QUE NO SE PIERDAN LOS DATOS
				sbm.util.setValue(ItemField[i],valorField[i]);
				sbm.util.hide("labelsPopUp"+ItemField[i]);
				sbm.util.hide(ItemField[i]);
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			
			}else{
				sbm.util.setValue(ItemField[i],valorField[i]);
				modTextboxPopupFl(ItemField[i],typeItem[i]);
				jsonCUPop[ItemField[i]] = jsonAppAbl[ItemField[i]];
			}
//			sbm.util.setValue("Ciudad","");
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
}
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
}
function onChangeCmp (campoDes,campoOri){
	try{
		
		var dCampoOri = sbm.util.getValue(campoOri);
		var vCampoOri = lookup[campoOri].cod[lookup[campoOri].des.indexOf(dCampoOri)];
		var campoOri1= null;
		var objreljson ={};
		var reljson=sbm.util.getValue("textArea10");
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

