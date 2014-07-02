var dhxLayout;

function initLayout(){
	dhxLayout = new dhtmlXLayoutObject(document.getElementById("layout"),"3J");
	
	dhxLayout.cells("a").hideHeader();
//	dhxLayout.cells("b").hideHeader();
//	dhxLayout.cells("c").hideHeader();
		
	toolbar_procesos=dhxLayout.cells("a").attachToolbar();
	toolbar_grupos=dhxLayout.cells("b").attachToolbar();
	toolbar_opciones=dhxLayout.cells("c").attachToolbar();
	
	mygrid_procesos=dhxLayout.cells("a").attachGrid();
	mygrid_grupos=dhxLayout.cells("b").attachGrid();
	mygrid_opciones=dhxLayout.cells("c").attachGrid();
	
	initProcesos();
}

function initProcesos(){
	toolbar_procesos.setSkin("dhx_skyblue");
	toolbar_procesos.addButton('copy',0,'Restaurar','copy');
//	toolbar_procesos.addButton('del',1,_('Eliminar'),'del');
//	toolbar_procesos.addSeparator('s1',2);
//	toolbar_procesos.addButton('up', 3, _('Subir'), 'up');
//	toolbar_procesos.addButton('down', 4, _('Bajar'), 'down');
//	toolbar_procesos.addSeparator('s1',5);
//	toolbar_procesos.addButton('exp', 6, _('Expandir'), 'expand');
//	toolbar_procesos.addButton('col', 7, _('Contraer'), 'collapse');
	
	toolbar_procesos.attachEvent('onClick',function(id_opt){
		switch(id_opt){
			case "copy":
				if(confirm(_('¿Confirma que desea restaurar el menú?'))){
					var ajax = new lib_ajax();
					ajax.setUrl(CLASSROOT_CORE+"Configuracion/General/ajax_configuracion_menu.php");
					ajax.addVar('accion','ajax_restaurar_menu');
					ajax.onComplete = function (res){
						cargarGrupos();
						cargarOpciones();
						cargarMenu();
					};
					ajax.request();
				}
				break;
			case "del":
				var id = mygrid_procesos.getSelectedRowId();
				if (id != -1 && id != null){
					if(confirm(_('¿Confirma que desea eliminar el elemento seleccionado?'))){
						
						var padre = mygrid_procesos.getParentId(id);
												
						var ajax = new lib_ajax();
						ajax.setUrl(CLASSROOT_CORE+"Configuracion/General/ajax_configuracion_menu.php");
						
						if(padre != 0){
							var array_opcio_id = id.split("-");
							
							ajax.addVar('accion','ajax_del_menu_opcion');
							ajax.addVar('id_opcion',array_opcio_id[1]);
							ajax.addVar('id_grupo',padre);
						}else{
							ajax.addVar('accion','ajax_del_menu_grupo');
							ajax.addVar('id_grupo',id);
						}

						ajax.onComplete = function (){
							mygrid_procesos.deleteRow(id);	
							cargarGrupos();
						};
						ajax.request();
					}
				}
				else{
					alert(_("Debe seleccionar un elemento de la tabla"));
				}
				break;
			case "exp":
				mygrid_procesos.expandAll();
				break;
			case "col":
				mygrid_procesos.collapseAll();
				break;
			case "up":
				var id = mygrid_procesos.getSelectedRowId();
				var padre = mygrid_procesos.getParentId(id);
				
				var ajax = new lib_ajax();
				ajax.setUrl(CLASSROOT_CORE+"Configuracion/General/ajax_configuracion_menu.php");
				
				if(padre == 0){
					ajax.addVar('accion','ajax_up_grupo');
					ajax.addVar('id_grupo',id);
					ajax.onComplete = function(res){
						mygrid_procesos.moveRowUp(id);
						mygrid_grupos.moveRowUp(id);
					};
				}else{
					id_opcion = id.split("-");
					ajax.addVar('accion','ajax_up_opcion');
					ajax.addVar('id_grupo',padre);
					ajax.addVar('id_opcion',id_opcion[1]);
					ajax.onComplete = function(res){
						mygrid_procesos.moveRowUp(id);
					};
				}
				ajax.request();
				break;
			case "down":
				var id = mygrid_procesos.getSelectedRowId();
				var padre = mygrid_procesos.getParentId(id);
				
				var ajax = new lib_ajax();
				ajax.setUrl(CLASSROOT_CORE+"Configuracion/General/ajax_configuracion_menu.php");
				
				if(padre == 0){
					ajax.addVar('accion','ajax_down_grupo');
					ajax.addVar('id_grupo',id);
					ajax.onComplete = function(res){
						mygrid_procesos.moveRowDown(id);
						mygrid_grupos.moveRowDown(id);
					};
				}else{
					id_opcion = id.split("-");
					ajax.addVar('accion','ajax_down_opcion');
					ajax.addVar('id_grupo',padre);
					ajax.addVar('id_opcion',id_opcion[1]);
					ajax.onComplete = function(res){
						mygrid_procesos.moveRowDown(id);
					};
				}
				ajax.request();
				break;
		}
	});
	
	mygrid_procesos.setSkin("dhx_skyblue");
	mygrid_procesos.setHeader("Seleccionar"+","+"<center>Proceso</center>");
	mygrid_procesos.attachHeader(",#text_filter");
	mygrid_procesos.setInitWidthsP("14,*");
	mygrid_procesos.setColAlign("center,left");
	mygrid_procesos.setColTypes("ch,ed");
	mygrid_procesos.enableTooltips("false,true");
//	mygrid_procesos.attachEvent("onCheckbox", doOnCheck);
	mygrid_procesos.init();
//	cargarMenu();
	mygrid_procesos.enableAutoWidth(true);
	mygrid_procesos.adjustColumnSize(1);
	mygrid_procesos.refreshFilters();
}

$(document).ready(function() { 
	initLayout();
});