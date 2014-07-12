var dhxLayout;

function initLayout(){
	dhxLayout = new dhtmlXLayoutObject(document.getElementById("layout"),"4G");
	dhxLayout.setAutoSize();
	dhxLayout.cells("a").hideHeader();
	dhxLayout.cells("b").hideHeader();
	dhxLayout.cells("c").hideHeader();
	dhxLayout.cells("d").hideHeader();
		
	toolbar_procesos=dhxLayout.cells("a").attachToolbar();
	toolbar_objetivos=dhxLayout.cells("b").attachToolbar();
	toolbar_practicas=dhxLayout.cells("c").attachToolbar();
	toolbar_productos=dhxLayout.cells("d").attachToolbar();
	
	mygrid_procesos=dhxLayout.cells("a").attachGrid();
	mygrid_objetivos=dhxLayout.cells("b").attachGrid();
	mygrid_practicas=dhxLayout.cells("c").attachGrid();
	mygrid_productos=dhxLayout.cells("d").attachGrid();
	
	initProcesos();
	initPracticas();
	initObjetivos();
	initProductos();
}

function initProcesos(){
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_procesos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar el proceso seleccionado?')){
					}
				}
				else{
					alert("Debe seleccionar un proceso de la tabla");
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

function initPracticas(){
	toolbar_practicas.setSkin("dhx_skyblue");
	toolbar_practicas.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_practicas.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_practicas.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_practicas.getSelectedRowId();
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
	
	mygrid_practicas.setSkin("dhx_skyblue");
	mygrid_practicas.setImagePath("css/images/");
	mygrid_practicas.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Práctica Específica</b></center>"+","+"<center><b>Objetivo Específico</b></center>");
	mygrid_practicas.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_practicas.setInitWidthsP("14,55,*");
	mygrid_practicas.setColAlign("center,left,left");
	mygrid_practicas.setColTypes("ch,ed,coro");
	mygrid_practicas.enableTooltips("false,true,true");
//	mygrid_practicas.attachEvent("onCheckbox", doOnCheck);
	mygrid_practicas.init();
	cargarPracticas();
	mygrid_practicas.enableAutoWidth(true);
	mygrid_practicas.adjustColumnSize(2);
	mygrid_practicas.refreshFilters();
}

function cargarPracticas(){
	mygrid_practicas.addRow(1,[0,'4.1 General requirements']);
	mygrid_practicas.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_practicas.addRow(3,[0,'5.1 Management commitment']);
	mygrid_practicas.addRow(4,[0,'5.2 Customer focus']);
	mygrid_practicas.addRow(5,[0,'5.3 Quality policy']);
	mygrid_practicas.addRow(6,[0,'5.5 Responsibility, authority and communication']);
}

function initObjetivos(){
	toolbar_objetivos.setSkin("dhx_skyblue");
	toolbar_objetivos.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_objetivos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_objetivos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_objetivos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar el objetivo específico seleccionado?')){
					}
				}
				else{
					alert("Debe seleccionar un objetivo específico de la tabla");
				}
				break;
		}
	});
	
	mygrid_objetivos.setSkin("dhx_skyblue");
	mygrid_objetivos.setImagePath("css/images/");
	mygrid_objetivos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Objetivo Específico</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_objetivos.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_objetivos.setInitWidthsP("14,50,*");
	mygrid_objetivos.setColAlign("center,left,left");
	mygrid_objetivos.setColTypes("ch,ed,coro");
	mygrid_objetivos.enableTooltips("false,true,true");
//	mygrid_objetivos.attachEvent("onCheckbox", doOnCheck);
	mygrid_objetivos.init();
	cargarObjetivos();
	mygrid_objetivos.enableAutoWidth(true);
	mygrid_objetivos.adjustColumnSize(2);
	mygrid_objetivos.refreshFilters();
}

function cargarObjetivos(){
	mygrid_objetivos.addRow(1,[0,'4.1 General requirements']);
	mygrid_objetivos.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_objetivos.addRow(3,[0,'5.1 Management commitment']);
	mygrid_objetivos.addRow(4,[0,'5.2 Customer focus']);
	mygrid_objetivos.addRow(5,[0,'5.3 Quality policy']);
	mygrid_objetivos.addRow(6,[0,'5.5 Responsibility, authority and communication']);
}

function initProductos(){
	toolbar_productos.setSkin("dhx_skyblue");
	toolbar_productos.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_productos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_productos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				break;
			case "del":
				var id = mygrid_productos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar el producto de trabajo seleccionado?')){
					}
				}
				else{
					alert("Debe seleccionar un producto de trabajo de la tabla");
				}
				break;
		}
	});
	
	mygrid_productos.setSkin("dhx_skyblue");
	mygrid_productos.setImagePath("css/images/");
	mygrid_productos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Producto de trabajo</b></center>"+","+"<center><b>Práctica Específica</b></center>");
	mygrid_productos.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_productos.setInitWidthsP("14,50,*");
	mygrid_productos.setColAlign("center,left,left");
	mygrid_productos.setColTypes("ch,ed,coro");
	mygrid_productos.enableTooltips("false,true,true");
//	mygrid_productos.attachEvent("onCheckbox", doOnCheck);
	mygrid_productos.init();
	cargarProductos();
	mygrid_productos.enableAutoWidth(true);
	mygrid_productos.adjustColumnSize(2);
	mygrid_productos.refreshFilters();
}

function cargarProductos(){
	mygrid_productos.addRow(1,[0,'4.1 General requirements']);
	mygrid_productos.addRow(2,[0,'4.2 Documentation requirements']);
	mygrid_productos.addRow(3,[0,'5.1 Management commitment']);
	mygrid_productos.addRow(4,[0,'5.2 Customer focus']);
	mygrid_productos.addRow(5,[0,'5.3 Quality policy']);
	mygrid_productos.addRow(6,[0,'5.5 Responsibility, authority and communication']);
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
	$("#layout").css('height',height+"px");
	initLayout();
});