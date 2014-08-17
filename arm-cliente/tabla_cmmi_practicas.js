var dhxLayout;
var id_standard;
var all_specific_practices;
var all_specific_goals;

function initTable(){
		
	toolbar_practicas= new dhtmlXToolbarObject("toolbar");
	
	mygrid_practicas= new dhtmlXGridObject('mygrid');
	
	toolbar_practicas.setSkin("dhx_skyblue");
	toolbar_practicas.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_practicas.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	toolbar_practicas.addButton('back',2,lang['Volver'],'css/images/back.png');
	
	toolbar_practicas.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {title:"New Specific Practice",specificGoal:all_specific_goals[0].id};
				addElement('cmmi','specificpractice',object,refreshTable,function (id) {
					mygrid_practicas.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_practicas.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar la práctica específica seleccionada?'])){
						deleteElement('cmmi','specificpractice',id,refreshTable);
					}
				}
				else{
					alert(lang["Debe seleccionar una práctica específica de la tabla"]);
				}
				break;
			case "back":
				window.location = "tabla_cmmi.html"+url_lang+"&id="+id_standard;
				break;
		}
	});
	
	mygrid_practicas.setSkin("dhx_skyblue");
	mygrid_practicas.setImagePath("css/images/");
	mygrid_practicas.setHeader("<center><b>"+lang["Práctica Específica"]+"</b></center>,<center><b>"+lang["Descripción"]+"</b></center>,<center><b>"+lang["Objetivo Específico"]+"</b></center>");
	mygrid_practicas.attachHeader("#text_filter,#text_filter,#select_filter");
	mygrid_practicas.setInitWidthsP("30,40,*");
	mygrid_practicas.setColAlign("left,left,left");
	mygrid_practicas.setColTypes("ed,ed,coro");
	mygrid_practicas.enableTooltips("true,true,true");
	mygrid_practicas.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_specific_practices, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				switch (cellId) {
					case 0:
						updated[0].title = nValue;
						break;
					case 1:
						updated[0].description = nValue;
						break;
					case 2:
						updated[0].specificGoal = nValue;
						break;
				}
												
				updateElement('cmmi','specificpractice',updated[0],function(){});
				mygrid_practicas.refreshFilters();
				return true;
			}
		}
	});
	mygrid_practicas.init();
	
	mygrid_practicas.enableAutoWidth(true);
	mygrid_practicas.adjustColumnSize(2);

	refreshTable();
}


function refreshTable(){
	mygrid_practicas.clearAll();
	
	getElements('cmmi','specificgoal',id_standard,function(elements) {
		all_specific_goals = elements;
	});
	
	all_specific_goals.forEach(function(element) {
		mygrid_practicas.getCombo(2).put(element.id,element.title);
	});	
	
	getElements('cmmi','specificpractice',id_standard,function(elements) {
		all_specific_practices = elements;
		elements.forEach(function(element) {
			mygrid_practicas.addRow(element.id,[element.title,element.description,element.specificGoal]);
		});
	});
	
	mygrid_practicas.refreshFilters();
}

$(document).ready(function() {
	language();
	
	id_standard = parseInt(getParameterByName('id'));
	
	var height = $(window).height()-50;
	$("#mygrid").css('height',height+"px");
	initTable();
});