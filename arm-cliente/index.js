var urlApi = "http://192.168.1.12:8080/armonize/api";
var sentences;
var ejecucion;
var lang_es = true;
var cont_patron = 1;

function chooseFile() {
  $(".inputFileInvisible").click();
}

$('.inputFileInvisible').bind('change paste keyup', function(){
  var $fileName = $(this).val().replace(/C:\\fakepath\\/i, '');
  $('.fileName').val($fileName);
});

//function enviar(){
//	var archivos = document.getElementById("file");//Damos el valor del input tipo file
//	var archivo = archivos.files; //Obtenemos el valor del input (los arcchivos) en modo de arreglo
//
//  //El objeto FormData nos permite crear un formulario pasandole clave/valor para poder enviarlo, este tipo de objeto ya tiene la propiedad multipart/form-data para poder subir archivos
//  var data = new FormData();
//
//  //Como no sabemos cuantos archivos subira el usuario, iteramos la variable y al
//  //objeto de FormData con el metodo "append" le pasamos calve/valor, usamos el indice "i" para
//  //que no se repita, si no lo usamos solo tendra el valor de la ultima iteracion
//  for(i=0; i<archivo.length; i++){
//    data.append('archivo'+i,archivo[i]);
//  }
//
//  var nombre = $("#nombre").val();
//
//  loader = new Loader({
//    placementNode : document.getElementById('loadWrap'),
//    colors : [
//      '#4285F4',
//      '#8F6596',
//      '#DB4437',
//      '#E87C1C',
//      '#F4B400',
//      '#82A92C',
//      '#0F9D58'
//    ],
//    easeInt: 200,
//    timeing : 600
//  });
//
//  ejecucion = $("input[name='ejecucion']:checked").val();
//
//  var url = builUrl(nombre);
//
//  $.ajax({
//    url:url, //Url a donde la enviaremos
//    type:'POST', //Metodo que usaremos
//    contentType:false, //Debe estar en false para que pase el objeto sin procesar
//    data:data, //Le pasamos el objeto que creamos con los archivos
//    processData:false, //Debe estar en false para que JQuery no procese los datos a enviar
//    cache:false //Para que el formulario no guarde cache
//  }).done(function(id){
//    callMainSentences(id);
//  });
//}

function addPatron(){
  cont_patron++;
  
  var cadena_delete = "Borrar";
  
  if(lang_es == false) cadena_delete = lang[cadena_delete];
    
  var cadena_patron = '<input class="fileName roundedCorners animation pattern" type="text" name="patron_'+cont_patron+'" id="patron_'+cont_patron+'"><button class="inputFile roundedCorners animation inter" type="button" name="btpatron_'+cont_patron+'" id="btpatron_'+cont_patron+'" onclick="delPatron('+cont_patron+')">'+cadena_delete+'</button>'
  
  $("#patrones").append(cadena_patron);
}

function delPatron(index){
  $("#btpatron_"+index).remove();
  $("#patron_"+index).remove();
  cont_patron--;
}

function builUrl(name){
  var url = urlApi+'?name='+name;
  $(".pattern").each(function(){
    if($(this).val() != "") url += '&patterns='+$(this).val();
  });
  return url;
}

function openIso(){
	$.colorbox({href:"tabla_iso.html",width:'95%',height:'95%,',iframe: true,scrolling : true});
}

$(document).ready(function() { 
	var url_array = $(location).attr('href').split('=');
	
	if(url_array.length == 2){
		if(url_array[1] == 'en'){
			lang_es = false;
			$(".body").append("<script type='text/javascript' src='lang/en.js'></script>");
		}
		
		$(".inter").each(function (){
			$(this).html(lang[$(this).html()]);
		});
	}
}); 