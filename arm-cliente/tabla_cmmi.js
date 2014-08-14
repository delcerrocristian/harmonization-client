var dhxLayout;
var id_standard;
var all_process;
var all_specific_goals;
var all_specific_practices;
var all_work_products;


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
	initObjetivos();
	initPracticas();
	initProductos();
	
	refreshTables();
}

function initProcesos(){
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('add',0,'Detalles','css/images/add.png');
	toolbar_procesos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				window.location = "tabla_cmmi_procesos.html?id="+id_standard;
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar completamente el proceso seleccionado?')){
						deleteElement('cmmi','process',id,refreshTables);
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
	mygrid_procesos.setHeader("<center><b>Proceso</b></center>");
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
								
				updateElement('cmmi','process',updated[0],refreshTables)
			}
		}
	});
	mygrid_procesos.init();
	
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(0);
}
function initPracticas(){
	toolbar_practicas.setSkin("dhx_skyblue");
	toolbar_practicas.addButton('add',0,'Detalles','css/images/add.png');
	toolbar_practicas.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_practicas.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				window.location = "tabla_cmmi_practicas.html?id="+id_standard;
				break;
			case "del":
				var id = mygrid_practicas.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar la actividad seleccionada?')){
						deleteElement('cmmi','specificpractice',id,refreshTables);
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
	mygrid_practicas.setHeader("<center><b>Práctica Específica</b></center>"+","+"<center><b>Objetivo Específico</b></center>");
	mygrid_practicas.attachHeader("#text_filter,#select_filter_strict");
	mygrid_practicas.setInitWidthsP("60,*");
	mygrid_practicas.setColAlign("left,left");
	mygrid_practicas.setColTypes("ed,coro");
	mygrid_practicas.enableTooltips("true,true");
	
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
						updated[0].specificGoal = nValue;
						break;
				}
				
								
				updateElement('cmmi','specificpractice',updated[0],refreshTables)
			}
		}
	});
	
	mygrid_practicas.init();
	
	mygrid_practicas.enableAutoWidth(true);
	mygrid_practicas.adjustColumnSize(1);
}

function initObjetivos(){
	toolbar_objetivos.setSkin("dhx_skyblue");
	toolbar_objetivos.addButton('add',0,'Detalles','css/images/add.png');
	toolbar_objetivos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_objetivos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				window.location = "tabla_cmmi_objetivos.html?id="+id_standard;
				break;
			case "del":
				var id = mygrid_objetivos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar el objetivo específico seleccionado?')){
						deleteElement('cmmi','specificgoal',id,refreshTables);
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
	mygrid_objetivos.setHeader("<center><b>Objetivo Específico</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_objetivos.attachHeader("#text_filter,#select_filter_strict");
	mygrid_objetivos.setInitWidthsP("60,*");
	mygrid_objetivos.setColAlign("left,left");
	mygrid_objetivos.setColTypes("ed,coro");
	mygrid_objetivos.enableTooltips("true,true");
	
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
						updated[0].process = nValue;
						break;
				}
				
								
				updateElement('cmmi','specificgoal',updated[0],refreshTables)
			}
		}
	});
	
	mygrid_objetivos.init();
	
	mygrid_objetivos.enableAutoWidth(true);
	mygrid_objetivos.adjustColumnSize(1);
}

function initProductos(){
	toolbar_productos.setSkin("dhx_skyblue");
	toolbar_productos.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_productos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_productos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "add":
				var object = {description:"New Work Product",specificPractice:all_specific_practices[0].id};
				addElement('cmmi','workproduct',object,refreshTables,function (id) {
					mygrid_productos.selectRowById(id,false,true,false);
				});
				break;
			case "del":
				var id = mygrid_productos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm('¿Confirma que desea eliminar el producto de trabajo seleccionado?')){
						deleteElement('cmmi','workproduct',id,refreshTables);
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
	mygrid_productos.setHeader("<center><b>Producto de trabajo</b></center>"+","+"<center><b>Práctica Específica</b></center>");
	mygrid_productos.attachHeader("#text_filter,#select_filter_strict");
	mygrid_productos.setInitWidthsP("60,*");
	mygrid_productos.setColAlign("left,left");
	mygrid_productos.setColTypes("ed,coro");
	mygrid_productos.enableTooltips("true,true");
	
	mygrid_productos.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated = $.grep(all_work_products, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				switch (cellId) {
					case 0:
						updated[0].description = nValue;
						break;
					case 1:
						updated[0].specificPractice = nValue;
						break;
				}
				
								
				updateElement('cmmi','workproduct',updated[0],function(){});
				return true;
			}
		}
	});
	
	mygrid_productos.init();
	
	mygrid_productos.enableAutoWidth(true);
	mygrid_productos.adjustColumnSize(1);
}

function refreshTables(){
	mygrid_procesos.clearAll();
	mygrid_objetivos.clearAll();
	mygrid_practicas.clearAll();
	mygrid_productos.clearAll();
	
	
	getElements('cmmi','process',id_standard,function(elements) {
		all_process = elements;
		elements.forEach(function(element) {
			mygrid_procesos.addRow(element.id,[element.name]);
		});
	});
	
	all_process.forEach(function(element) {
		mygrid_objetivos.getCombo(1).put(element.id,element.name);
	});	
	
	getElements('cmmi','specificgoal',id_standard,function(elements) {
		all_specific_goals = elements;
		elements.forEach(function(element) {
			mygrid_objetivos.addRow(element.id,[element.title,element.process]);
		});
	});
	
	all_specific_goals.forEach(function(element) {
		mygrid_practicas.getCombo(1).put(element.id,element.title);
	});
	
	getElements('cmmi','specificpractice',id_standard,function(elements) {
		all_specific_practices = elements;
		elements.forEach(function(element) {
			mygrid_practicas.addRow(element.id,[element.title,element.specificGoal]);
		});
	});
	
	all_specific_practices.forEach(function(element) {
		mygrid_productos.getCombo(1).put(element.id,element.title);
	});
	
	getElements('cmmi','workproduct',id_standard,function(elements) {
		all_work_products = elements;
		elements.forEach(function(element) {
			mygrid_productos.addRow(element.id,[element.description,element.specificPractice]);
		});
	});
	
	mygrid_procesos.refreshFilters();
	mygrid_objetivos.refreshFilters();
	mygrid_practicas.refreshFilters();
	mygrid_productos.refreshFilters();
}

$(document).ready(function() {
	language();
	
	id_standard = parseInt(getParameterByName('id'));
	
	var height = $(window).height()-20;
	$("#layout").css('height',height+"px");
	initLayout();
});