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
	toolbar_procesos.addButton('add',0,'Añadir','css/images/add.png');
	toolbar_procesos.addButton('del',1,'Eliminar','css/images/del.png');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
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
	mygrid_procesos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_procesos.attachHeader(",#text_filter");
	mygrid_procesos.setInitWidthsP("14,*");
	mygrid_procesos.setColAlign("center,left");
	mygrid_procesos.setColTypes("ch,ed");
	mygrid_procesos.enableTooltips("false,true");
//	mygrid_procesos.attachEvent("onCheckbox", doOnCheck);
	mygrid_procesos.attachEvent("onEditCell", function(stage,rowId,cellId,nValue,oValue) {
		if(stage==2){
			if (nValue != oValue){
				var updated_process = $.grep(all_process, function(obj) {
				   if(obj.id === rowId){
					   return obj;
				   }
				});
				
				updated_process[0].name = nValue;
				
				console.log(updated_process[0]);
				
//				updateElement('cmmi','process',updated_process[0],callback)
			}
		}
	});
	mygrid_procesos.init();
	
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(1);
	mygrid_procesos.refreshFilters();
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
	mygrid_practicas.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Práctica Específica</b></center>"+","+"<center><b>Objetivo Específico</b></center>");
	mygrid_practicas.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_practicas.setInitWidthsP("14,55,*");
	mygrid_practicas.setColAlign("center,left,left");
	mygrid_practicas.setColTypes("ch,ed,coro");
	mygrid_practicas.enableTooltips("false,true,true");
//	mygrid_practicas.attachEvent("onCheckbox", doOnCheck);
	
	mygrid_practicas.init();
	
	mygrid_practicas.enableAutoWidth(true);
	mygrid_practicas.adjustColumnSize(2);
	mygrid_practicas.refreshFilters();
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
	mygrid_objetivos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Objetivo Específico</b></center>"+","+"<center><b>Proceso</b></center>");
	mygrid_objetivos.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_objetivos.setInitWidthsP("14,50,*");
	mygrid_objetivos.setColAlign("center,left,left");
	mygrid_objetivos.setColTypes("ch,ed,coro");
	mygrid_objetivos.enableTooltips("false,true,true");
//	mygrid_objetivos.attachEvent("onCheckbox", doOnCheck);
	mygrid_objetivos.init();
	
	mygrid_objetivos.enableAutoWidth(true);
	mygrid_objetivos.adjustColumnSize(2);
	mygrid_objetivos.refreshFilters();
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
	mygrid_productos.setHeader("<center><b>Seleccionar</b></center>"+","+"<center><b>Producto de trabajo</b></center>"+","+"<center><b>Práctica Específica</b></center>");
	mygrid_productos.attachHeader(",#text_filter,#select_filter_strict");
	mygrid_productos.setInitWidthsP("14,50,*");
	mygrid_productos.setColAlign("center,left,left");
	mygrid_productos.setColTypes("ch,ed,coro");
	mygrid_productos.enableTooltips("false,true,true");
//	mygrid_productos.attachEvent("onCheckbox", doOnCheck);
	mygrid_productos.init();
	
	mygrid_productos.enableAutoWidth(true);
	mygrid_productos.adjustColumnSize(2);
	mygrid_productos.refreshFilters();
}

function refreshTables(){
	mygrid_procesos.clearAll();
	mygrid_objetivos.clearAll();
	mygrid_practicas.clearAll();
	mygrid_productos.clearAll();
	
	
	getElements('cmmi','process',id_standard,function(elements) {
		all_process = elements;
		elements.forEach(function(element) {
			mygrid_procesos.addRow(element.id,[0,element.name]);
		});
	});
	
	all_process.forEach(function(element) {
		mygrid_objetivos.getCombo(2).put(element.id,element.name);
	});	
	
	getElements('cmmi','specificgoal',id_standard,function(elements) {
		all_specific_goals = elements;
		elements.forEach(function(element) {
			mygrid_objetivos.addRow(element.id,[0,element.title,element.process]);
		});
	});
	
	all_specific_goals.forEach(function(element) {
		mygrid_practicas.getCombo(2).put(element.id,element.title);
	});
	
	getElements('cmmi','specificpractice',id_standard,function(elements) {
		all_specific_practices = elements;
		elements.forEach(function(element) {
			mygrid_practicas.addRow(element.id,[0,element.title,element.specificGoal]);
		});
	});
	
	all_specific_practices.forEach(function(element) {
		mygrid_productos.getCombo(2).put(element.id,element.title);
	});
	
	getElements('cmmi','workproduct',id_standard,function(elements) {
		all_work_products = elements;
		elements.forEach(function(element) {
			mygrid_productos.addRow(element.id,[0,element.description,element.specificPractice]);
		});
	});
}

$(document).ready(function() {
	language();
	
	id_standard = getParameterByName('id');
	
	var height = $(window).height()-20;
	$("#layout").css('height',height+"px");
	initLayout();
});