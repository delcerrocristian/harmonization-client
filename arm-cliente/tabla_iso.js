var dhxLayout;

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
}

function initProcesos(){
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('add',0,lang['Añadir'],'css/images/add.png');
	toolbar_procesos.addButton('del',1,lang['Eliminar'],'css/images/del.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(lang['¿Confirma que desea eliminar el proceso seleccionado?'])){
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
	mygrid_procesos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_procesos.attachHeader(",#text_filter");
	mygrid_procesos.setInitWidthsP("14,*");
	mygrid_procesos.setColAlign("center,left");
	mygrid_procesos.setColTypes("ch,ed");
	mygrid_procesos.enableTooltips("false,true");
//	mygrid_procesos.attachEvent("onCheckbox", doOnCheck);
	mygrid_procesos.init();
	cargarProcesos();
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(1);
	mygrid_procesos.refreshFilters();
}

function cargarProcesos(){
	mygrid_procesos.addRow(1,[0,'4.1 General requirements']);
	mygrid_procesos.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_procesos.addRow(3,[0,'5.1 Management commitment']);
	mygrid_procesos.addRow(4,[0,'5.2 Customer focus']);
	mygrid_procesos.addRow(5,[0,'5.3 Quality policy']);
	mygrid_procesos.addRow(6,[0,'5.5 Responsibility, authority and communication']);
}

function initActividades(){
	toolbar_actividades.setSkin("dhx_skyblue");
	toolbar_actividades.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_actividades.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_actividades.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_actividades.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar la actividad seleccionada?')){
					}
				}
				else{
					alert("Debe seleccionar una actividad de la tabla");
				}
				break;
		}
	});
	
	mygrid_actividades.setSkin("dhx_skyblue");
	mygrid_actividades.setImagePath("css/images/");
	mygrid_actividades.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Actividad</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_actividades.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_actividades.setInitWidthsP("14,55,*");
	mygrid_actividades.setColAlign("center,left,left");
	mygrid_actividades.setColTypes("ch,ed,coro");
	mygrid_actividades.enableTooltips("false,true,true");
//	mygrid_actividades.attachEvent("onCheckbox", doOnCheck);
	mygrid_actividades.init();
	cargarActividades();
	mygrid_actividades.enableAutoWidth(true);
	mygrid_actividades.adjustColumnSize(2);
	mygrid_actividades.refreshFilters();
}

function cargarActividades(){
	mygrid_actividades.addRow(1,[0,'4.1 General requirements']);
	mygrid_actividades.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_actividades.addRow(3,[0,'5.1 Management commitment']);
	mygrid_actividades.addRow(4,[0,'5.2 Customer focus']);
	mygrid_actividades.addRow(5,[0,'5.3 Quality policy']);
	mygrid_actividades.addRow(6,[0,'5.5 Responsibility, authority and communication']);
}

function initTareas(){
	toolbar_tareas.setSkin("dhx_skyblue");
	toolbar_tareas.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_tareas.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_tareas.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_tareas.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar la tarea seleccionada?')){
					}
				}
				else{
					alert("Debe seleccionar una tarea de la tabla");
				}
				break;
		}
	});
	
	mygrid_tareas.setSkin("dhx_skyblue");
	mygrid_tareas.setImagePath("css/images/");
	mygrid_tareas.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Tarea</b></center>"+","+"<center><b>Proceso</b></center>"+","+"<center><b>Actividad</b></center>");
	mygrid_tareas.attachHeader(",#text_filter,#select_filter_strict,#select_filter_strict");
	mygrid_tareas.setInitWidthsP("10,50,20,*");
	mygrid_tareas.setColAlign("center,left,left,left");
	mygrid_tareas.setColTypes("ch,ed,coro,coro");
	mygrid_tareas.enableTooltips("false,true,true,true");
//	mygrid_tareas.attachEvent("onCheckbox", doOnCheck);
	mygrid_tareas.init();
	cargarTareas();
	mygrid_tareas.enableAutoWidth(true);
	mygrid_tareas.adjustColumnSize(3);
	mygrid_tareas.refreshFilters();
}

function cargarTareas(){
	mygrid_tareas.addRow(1,[0,'4.1 General requirements']);
	mygrid_tareas.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_tareas.addRow(3,[0,'5.1 Management commitment']);
	mygrid_tareas.addRow(4,[0,'5.2 Customer focus']);
	mygrid_tareas.addRow(5,[0,'5.3 Quality policy']);
	mygrid_tareas.addRow(6,[0,'5.5 Responsibility, authority and communication']);
}

$(document).ready(function() {
	var url_array = $(location).attr('href').split('=');
	
	if(url_array.length == 2){
		if(url_array[1] == 'en'){
			$(".body").append("<script type='text/javascript' src='lang/en.js'></script>");
		}else{
			$(".body").append("<script type='text/javascript' src='lang/es.js'></script>");
		}
	}else{
		$(".body").append("<script type='text/javascript' src='lang/es.js'></script>");
	}
	
	var height = $(window).height()-20;
	var width = $(window).width()-20;
	$("#layout").css('height',height+"px");
	initLayout(height,width);
});