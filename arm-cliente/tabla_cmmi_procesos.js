var dhxLayout;
var id_standard;
var all_process;

function initTable(){
		
	toolbar_procesos= new dhtmlXToolbarObject("toolbar");
	
	mygrid_procesos= new dhtmlXGridObject('mygrid');
	
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_procesos.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	toolbar_procesos.addButton('back',2,lang['Volver'],'css/images/back.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {standard:id_standard,name:"New process"};
				addElement('cmmi','process',object,refreshTable,function (id) {
					mygrid_procesos.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar completamente el proceso seleccionado?'])){
						deleteElement('cmmi','process',id,refreshTable);
					}
				}
				else{
					alert(lang["Debe seleccionar un proceso de la tabla"]);
				}
				break;
			case "back":
				window.location = "tabla_cmmi.html"+url_lang+"&id="+id_standard;
				break;
		}
	});
	
	mygrid_procesos.setSkin("dhx_skyblue");
	mygrid_procesos.setImagePath("css/images/");
	mygrid_procesos.setHeader("<center><b>"+lang["Proceso"]+"</b></center>,<center><b>"+lang["Área"]+"</b></center>,<center><b>"+lang["Madurez"]+"</b></center>,<center><b>"+lang["Propósito"]+"</b></center>");
	mygrid_procesos.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter");
	mygrid_procesos.setInitWidthsP("30,20,7,*");
	mygrid_procesos.setColAlign("left,left,left,left");
	mygrid_procesos.setColTypes("ed,ed,ed,ed");
	mygrid_procesos.enableTooltips("true,true,true,true");
	mygrid_procesos.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_process, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				switch (cellId) {
					case 0:
						updated[0].name = nValue;
						break;
					case 1:
						updated[0].areaCategory = nValue;
						break;
					case 2:
						updated[0].maturityLevel = nValue;
						break;
					case 3:
						updated[0].purposeStatement = nValue;
						break;
				}
												
				updateElement('cmmi','process',updated[0],function(){});
				mygrid_procesos.refreshFilters();
				return true;
			}
		}
	});
	mygrid_procesos.init();
	
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(3);

	refreshTable();
}


function refreshTable(){
	mygrid_procesos.clearAll();
	
	getElements('cmmi','process',id_standard,function(elements) {
		all_process = elements;
		elements.forEach(function(element) {
			mygrid_procesos.addRow(element.id,[element.name,element.areaCategory,element.maturityLevel,element.purposeStatement]);
		});
	});
	
	mygrid_procesos.refreshFilters();
}

$(document).ready(function() {
	language();
	
	id_standard = parseInt(getParameterByName('id'));
	
	var height = $(window).height()-50;
	$("#mygrid").css('height',height+"px");
	initTable();
});