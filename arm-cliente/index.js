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

function openIso(){
	$.colorbox({href:"tabla_iso.html"+url_lang,width:'95%',height:'95%,',iframe: true,scrolling : true});
}

function openCmmi(){
	$.colorbox({href:"tabla_cmmi.html"+url_lang,width:'95%',height:'95%,',iframe: true,scrolling : true});
}

function resultados(){
	$.colorbox({href:"graficas.html"+url_lang,width:'95%',height:'95%,',iframe: true,scrolling : true});
}

function manual(){
	$.colorbox({href:"graficas.html"+url_lang,width:'95%',height:'95%,',iframe: true,scrolling : true});
}