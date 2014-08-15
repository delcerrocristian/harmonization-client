var dhxLayout;
var id_standard;
var all_process;
var all_activities;
var all_tasks;

function initLayout(height,width){
	dhxLayout = new dhtmlXLayoutObject(document.getElementById("layout"),"3J");
	dhxLayout.setAutoSize();
	dhxLayout.cells("a").hideHeader();
	dhxLayout.cells("a").setWidth(width*0.35);
	dhxLayout.cells("a").setHeight(height/2);
	dhxLayout.cells("b").hideHeader();
	dhxLayout.cells("b").setHeight(height);
	dhxLayout.cells("c").hideHeader();
	dhxLayout.cells("c").setWidth(width*0.35);
	dhxLayout.cells("c").setHeight(height/2);
		
	toolbar_procesos=dhxLayout.cells("a").attachToolbar();
	toolbar_tareas=dhxLayout.cells("b").attachToolbar();
	toolbar_actividades=dhxLayout.cells("c").attachToolbar();
	
	mygrid_procesos=dhxLayout.cells("a").attachGrid();
	mygrid_tareas=dhxLayout.cells("b").attachGrid();
	mygrid_actividades=dhxLayout.cells("c").attachGrid();
	
	initProcesos();
	initActividades();
	initTareas();
	
	refreshTables();
}

function refreshTables(){
	
	mygrid_procesos.clearAll();
	mygrid_tareas.clearAll();
	mygrid_actividades.clearAll();
	
	
	getElements('iso','process',id_standard,function(elements) {
		all_process = elements;
		elements.forEach(function(element) {
			mygrid_procesos.addRow(element.id,[element.name]);
		});
	});
		
	all_process.forEach(function(element) {
		mygrid_tareas.getCombo(1).put(element.id,element.name);
		mygrid_actividades.getCombo(1).put(element.id,element.name);
	});	
	
	getElements('iso','activity',id_standard,function(elements) {
		all_activities = elements;
		elements.forEach(function(element) {
			mygrid_actividades.addRow(element.id,[element.name,element.process]);
		});
	});
	
	all_activities.forEach(function(element) {
		mygrid_tareas.getCombo(2).put(element.id,element.name);
	});
	
	getElements('iso','task',id_standard,function(elements) {
		all_tasks = elements;
		elements.forEach(function(element) {
			mygrid_tareas.addRow(element.id,[element.content,element.process,element.activity]);
		});
	});
	
	mygrid_procesos.refreshFilters();
	mygrid_tareas.refreshFilters();
	mygrid_actividades.refreshFilters();

}

function initProcesos(){
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_procesos.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {standard:id_standard,name:"New process"};
				addElement('iso','process',object,refreshTables,function (id) {
					mygrid_procesos.selectRowById(id,false,true,false);
				});
				
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar completamente el proceso seleccionado?'])){
						deleteElement('iso','process',id,refreshTables);
					}
				}
				else{
					alert(lang["Debe seleccionar un proceso de la tabla"]);
				}
				break;
		}
	});
	
	mygrid_procesos.setSkin("dhx_skyblue");
	mygrid_procesos.setImagePath("css/images/");
	mygrid_procesos.setHeader("<center><b>"+lang["Proceso"]+"</b></center>");
	mygrid_procesos.attachHeader("#text_filter");
	mygrid_procesos.setInitWidthsP("*");
	mygrid_procesos.setColAlign("left");
	mygrid_procesos.setColTypes("ed");
	mygrid_procesos.enableTooltips("true");
	
	mygrid_procesos.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_process, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				updated[0].name = nValue;
								
				updateElement('iso','process',updated[0],refreshTables)
			}
		}
	});
	
	mygrid_procesos.init();
	
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(0);
}

function initActividades(){
	toolbar_actividades.setSkin("dhx_skyblue");
	toolbar_actividades.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_actividades.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	
	toolbar_actividades.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {process:all_process[0].id,name:"New activity"};
				addElement('iso','activity',object,refreshTables,function (id) {
					mygrid_actividades.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_actividades.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar la actividad seleccionada?'])){
						deleteElement('iso','activity',id,refreshTables);
					}
				}
				else{
					alert(lang["Debe seleccionar una actividad de la tabla"]);
				}
				break;
		}
	});
	
	mygrid_actividades.setSkin("dhx_skyblue");
	mygrid_actividades.setImagePath("css/images/");
	mygrid_actividades.setHeader("<center><b>"+lang["Actividad"]+"</b></center>,<center><b>"+lang["Proceso"]+"</b></center>");
	mygrid_actividades.attachHeader("#text_filter,#select_filter_strict");
	mygrid_actividades.setInitWidthsP("65,*");
	mygrid_actividades.setColAlign("left,left");
	mygrid_actividades.setColTypes("ed,coro");
	mygrid_actividades.enableTooltips("true,true");
	
	mygrid_actividades.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_activities, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				switch (cellId) {
					case 0:
						updated[0].name = nValue;
						break;
					case 1:
						updated[0].process = nValue;
						break;
				}
				
								
				updateElement('iso','activity',updated[0],refreshTables)
			}
		}
	});
	
	mygrid_actividades.init();
	mygrid_actividades.enableAutoWidth(true);
	mygrid_actividades.adjustColumnSize(1);
}

function initTareas(){
	toolbar_tareas.setSkin("dhx_skyblue");
	toolbar_tareas.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_tareas.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	
	toolbar_tareas.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {process:all_process[0].id,content:"New task"};
				addElement('iso','task',object,refreshTables,function (id) {
					mygrid_tareas.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_tareas.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar la tarea seleccionada?'])){
						deleteElement('iso','task',id,refreshTables);
					}
				}
				else{
					alert(lang["Debe seleccionar una tarea de la tabla"]);
				}
				break;
		}
	});
	
	mygrid_tareas.setSkin("dhx_skyblue");
	mygrid_tareas.setImagePath("css/images/");
	mygrid_tareas.setHeader("<center><b>"+lang["Tarea"]+"</b></center>,<center><b>"+lang["Proceso"]+"</b></center>,<center><b>"+lang["Actividad"]+"</b></center>");
	mygrid_tareas.attachHeader("#text_filter,#select_filter_strict,#select_filter_strict");
	mygrid_tareas.setInitWidthsP("55,20,*");
	mygrid_tareas.setColAlign("left,left,left");
	mygrid_tareas.setColTypes("ed,coro,coro");
	mygrid_tareas.enableTooltips("true,true,true");
	
	mygrid_tareas.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_tasks, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				switch (cellId) {
					case 0:
						updated[0].content = nValue;
						break;
					case 1:
						updated[0].process = nValue;
						break;
					case 2:
						updated[0].activity = nValue;
						break;
				}
				
								
				updateElement('iso','task',updated[0],function(){});
				return true;
			}
		}
	});
	
	mygrid_tareas.init();
	mygrid_tareas.enableAutoWidth(true);
	mygrid_tareas.adjustColumnSize(2);
}

$(document).ready(function() {
	language();
	
	id_standard = parseInt(getParameterByName('id'));
	
	var height = $(window).height()-20;
	var width = $(window).width()-20;
	$("#layout").css('height',height+"px");
	initLayout(height,width);
});