var dhxLayout;
var id_standard;
var all_process;
var all_specific_goals;

function initTable(){
		
	toolbar_objetivos= new dhtmlXToolbarObject("toolbar");
	
	mygrid_objetivos= new dhtmlXGridObject('mygrid');
	
	toolbar_objetivos.setSkin("dhx_skyblue");
	toolbar_objetivos.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_objetivos.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	toolbar_objetivos.addButton('back',2,lang['Volver'],'css/images/back.png');
	
	toolbar_objetivos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {title:"New Specific Goal",process:all_process[0].id};
				addElement('cmmi','specificgoal',object,refreshTable,function (id) {
					mygrid_objetivos.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_objetivos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar el objetivo específico seleccionado?'])){
						deleteElement('cmmi','specificgoal',id,refreshTable);
					}
				}
				else{
					alert(lang["Debe seleccionar un objetivo específico de la tabla"]);
				}
				break;
			case "back":
				window.location = "tabla_cmmi.html"+url_lang+"&id="+id_standard;
				break;
		}
	});
	
	mygrid_objetivos.setSkin("dhx_skyblue");
	mygrid_objetivos.setImagePath("css/images/");
	mygrid_objetivos.setHeader("<center><b>"+lang["Objetivo Específico"]+"</b></center>,<center><b>"+lang["Descripción"]+"</b></center>,<center><b>"+lang["Proceso"]+"</b></center>");
	mygrid_objetivos.attachHeader("#text_filter,#text_filter,#select_filter");
	mygrid_objetivos.setInitWidthsP("30,40,*");
	mygrid_objetivos.setColAlign("left,left,left");
	mygrid_objetivos.setColTypes("ed,ed,coro");
	mygrid_objetivos.enableTooltips("true,true,true");
	mygrid_objetivos.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_specific_goals, function(obj) {
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
						updated[0].process = nValue;
						break;
				}
												
				updateElement('cmmi','specificgoal',updated[0],function(){});
				mygrid_objetivos.refreshFilters();
				return true;
			}
		}
	});
	mygrid_objetivos.init();
	
	mygrid_objetivos.enableAutoWidth(true);
	mygrid_objetivos.adjustColumnSize(2);

	refreshTable();
}


function refreshTable(){
	mygrid_objetivos.clearAll();
	
	getElements('cmmi','process',id_standard,function(elements) {
		all_process = elements;
	});
	
	all_process.forEach(function(element) {
		mygrid_objetivos.getCombo(2).put(element.id,element.name);
	});	
	
	getElements('cmmi','specificgoal',id_standard,function(elements) {
		all_specific_goals = elements;
		elements.forEach(function(element) {
			mygrid_objetivos.addRow(element.id,[element.title,element.description,element.process]);
		});
	});
	
	mygrid_objetivos.refreshFilters();
}

$(document).ready(function() {
	language();
	
	id_standard = parseInt(getParameterByName('id'));
	
	var height = $(window).height()-50;
	$("#mygrid").css('height',height+"px");
	initTable();
});