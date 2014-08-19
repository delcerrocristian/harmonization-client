var lang_es = true;
var url_lang = "";
var cont_patron = 1;

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

function resultados(){
	var data = $('#model').val();
	if(data != ""){
		var data_array = data.split("-");
		openTable(data_array[1],data_array[0]);
	}
}

function statistics(){
	$.colorbox({href:"graficas.html"+url_lang,width:'95%',height:'95%',iframe: true,scrolling : true});
}

function manual(){
	$.colorbox({href:"manual_es.html",width:'75%',height:'95%',iframe: true,scrolling : true});
}

function deleteStandard(){
	var data = $('#model').val();
	if(data != ""){
		var data_array = data.split("-");
		deleteElement(data_array[0],"standard",data_array[1],function () {
			$("#model option[value='"+data+"']").remove();
		});
	}
}

$(document).ready(function() {
	
	fillSelect(addModelsToSelect);
	
	language();
	
	$(".inter").each(function (){
		$(this).html(lang[$(this).html()]);
	});
});