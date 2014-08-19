var urlApi = "http://localhost:8080/armonize/api";

function chooseFile(type) {
	$(".file"+type).click();
}

function enviar(type){
	$.loader({
		className:"blue-with-image-2",
		content:''
	});
	
	var archivos = document.getElementById("file_"+type);//Damos el valor del input tipo file
	var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo

	//El objeto FormData nos permite crear un formulario pasandole clave/valor para poder enviarlo, este tipo de objeto ya tiene la propiedad multipart/form-data para poder subir archivos
	var data = new FormData();

	//Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
	//objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
	//que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
	for(i=0; i<archivo.length; i++){
		data.append('archivo'+i,archivo[i]);
	}

	var name = $("#nombre_"+type).val();

	var url = builUrl(name,type);

	$.ajax({
		url:url, //Url a donde la enviaremos
		type:'POST', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		data:data, //Le pasamos el objeto que creamos con los archivos
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(id){
		$.loader('close');
		openTable(id,type);
		addModelToSelect(id,name,type);
	}).fail(function(error) {
		$.loader('close');
		var msg = "";
		if(error.status == 400) msg = lang["Debe introducir el nombre."];
		else msg = lang["Ha ocurrido un error al procesar."];
	    alert(msg);
	  });
	
}

function builUrl(name,type){
	var url = urlApi+'?name='+name+"&type="+type;
	
	if(type == 'iso'){
		$(".pattern").each(function(){
			if($(this).val() != "") url += '&patterns='+$(this).val();
		});
	}
	
	return url;
}

function addModelToSelect(id,name,type){
	$("#model").append(new Option(name+" ("+type.toUpperCase()+")", type+"-"+id));
}

function addModelsToSelect(models){
	models.forEach(function(model) {
		addModelToSelect(model.id,model.name,model.type);
	});
}

function openTable(id,type){
	
	var url_table = "tabla_"+type+url_lang+"&id="+id;
	
	$.colorbox({href:url_table,width:'95%',height:'95%,',iframe: true,scrolling : true});
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function language(){
	var short_lang = getParameterByName('lang');
	
	if(short_lang == 'en'){
		lang_es = false;
		url_lang = "?lang=en";
		$(".body").append("<script type='text/javascript' src='lang/en.js'></script>");
	}else{
		$(".body").append("<script type='text/javascript' src='lang/es.js'></script>");
		url_lang = "?lang=es";
	}
}

function fillSelect(callback){
	$.ajax({
		url:urlApi+"/standard/all", //Url a donde la enviaremos
		type:'GET', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(models){
		callback(models);
	});
}

function getElements(type,type_element,id_standard,callback){
	$.ajax({
		url:urlApi+"/"+type+"/all"+type_element+"?standard="+id_standard, //Url a donde la enviaremos
		type:'GET', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		async:false,
		cache:false //Para que el formulario no guarde cache
	}).done(function(elements){
		callback(elements);
	});
}

function getStatsByStandard(type,id_standard,callback){
	$.ajax({
		url:urlApi+"/"+type+"/stats?id="+id_standard, //Url a donde la enviaremos
		type:'GET', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		async:false,
		cache:false //Para que el formulario no guarde cache
	}).done(function(elements){
		callback(elements);
	});
}

function getAllStats(type,callback){
	$.ajax({
		url:urlApi+"/"+type+"/allstats", //Url a donde la enviaremos
		type:'GET', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		async:false,
		cache:false //Para que el formulario no guarde cache
	}).done(function(elements){
		callback(elements);
	});
}

function deleteElement(type,type_element,id,callback){
	$.ajax({
		url:urlApi+"/"+type+"/"+type_element+"?id="+id, //Url a donde la enviaremos
		type:'DELETE', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(){
		callback();
	});
}

function updateElement(type,type_element,object,callback){
	$.ajax({
		url:urlApi+"/"+type+"/"+type_element, //Url a donde la enviaremos
		type:'PUT', //Metodo que usaremos
		contentType:"application/json",
		accept: "application/json",//Debe estar en false para que pase el objeto sin procesar
		data:JSON.stringify(object),
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(){
		callback();
	});
}

function addElement(type,type_element,object,callback,returnId){
	$.ajax({
		url:urlApi+"/"+type+"/"+type_element, //Url a donde la enviaremos
		type:'POST', //Metodo que usaremos
		contentType:"application/json",
		accept: "application/json",//Debe estar en false para que pase el objeto sin procesar
		data:JSON.stringify(object),
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(id){
		callback();
		returnId(id);
	});
}