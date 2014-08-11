var urlApi = "http://localhost:8080/armonize/api";

function chooseFile(type) {
	$(".file"+type).click();
}

function enviar(type){
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
		addModelToSelect(id,name,type);
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

$(document).ready(function() {
	
	$.ajax({
		url:urlApi+"/standard/all", //Url a donde la enviaremos
		type:'GET', //Metodo que usaremos
		contentType:false, //Debe estar en false para que pase el objeto sin procesar
		processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
		cache:false //Para que el formulario no guarde cache
	}).done(function(models){
		addModelsToSelect(models);
	});
	
	var url_array = $(location).attr('href').split('=');
	
	if(url_array.length == 2){
		if(url_array[1] == 'en'){
			lang_es = false;
			url_lang = "?lang=en";
			$(".body").append("<script type='text/javascript' src='lang/en.js'></script>");
		}else{
			$(".body").append("<script type='text/javascript' src='lang/es.js'></script>");
		}
		
		$(".inter").each(function (){
			$(this).html(lang[$(this).html()]);
		});
	}else{
		$(".body").append("<script type='text/javascript' src='lang/es.js'></script>");
	}
}); 