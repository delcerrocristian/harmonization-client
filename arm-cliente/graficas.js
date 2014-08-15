var toolbar_top;
var opt_grafica = 0;
var opt_estandar = 0;

function inicializarToolbar(nombre){
	var toolbar=new dhtmlXToolbarObject(nombre);
	
	var url_chart = 'css/images/chart.png';
	var url_doc = 'css/images/doc.png';
	var url_doc_dis = 'css/images/doc_dis.png';
	
	toolbar.addButtonSelect('graficas',0, lang['Gráficas'], new Array(), url_chart);
	toolbar.addListOption('graficas','graf_3',1,'button',lang['Sectores'],url_chart);
	toolbar.addListOption('graficas','graf_1',2,'button',lang['Procesos ISO'],url_chart);
	toolbar.addListOption('graficas','graf_2',3,'button',lang['Procesos CMMI'],url_chart);
	
	toolbar.addButtonSelect('estandar',1, lang['Estándar'], new Array(), url_doc, url_doc_dis);
	
	toolbar.disableItem('estandar');
	
	toolbar.addButton('load', 2, lang['Cargar'], 'css/images/load.png');
	
	toolbar.attachEvent('onClick',function(id_opt){
		switch(id_opt){
		case "load":
			if(opt_estandar!=0){
				var opt_estandar_array = opt_estandar.split("-");
				
				getStatsByStandard(opt_estandar_array[0],opt_estandar_array[1],function (data) {
					switch (opt_estandar_array[0]) {
						case 'iso':
							var dataToDrawStats = [
								       	       		{
								       	       			name : lang['Procesos'], 
								       	                   y: data.process
								       	       		},
								       	       		{
								       	       			name: lang['Actividades'], 
								       	                   y: data.activity
								       	       		},
								       	       		{
								       	       			name: lang['Tareas'], 
								       	                   y: data.task
								       	       		}];
							break;
						case 'cmmi':
							var dataToDrawStats = [
								       	       		{
								       	       			name : lang['Procesos'], 
								       	                   y: data.process
								       	       		},
								       	       		{
								       	       			name: lang['Objetivos Específicos'], 
								       	                   y: data.specificGoal
								       	       		},
								       	       		{
								       	       			name: lang['Prácticas Específicas'], 
								       	                   y: data.specificPractice
								       	       		},
								       	       		{
								       	       			name: lang['Productos de Trabajo'], 
								       	                   y: data.workProduct
								       	       		}];
							break;
					}
						       			
		       		graph(dataToDrawStats,'pie',lang['Cantidad Procesos Armonizados'],lang['Cantidad Total'],lang['Cantidad']);
				});
			}else if(opt_grafica == "graf_1"){
				var categories = new Array();
				var data_process = new Array();
				var data_activity = new Array();
				var data_task = new Array();
				var data;
				getAllStats('iso',function(models) {
					models.forEach(function (element) {
						categories.push(element.name);
						data_process.push(element.process);
						data_activity.push(element.activity);
						data_task.push(element.task);
					});
					
					data = [{
			            name: lang['Procesos'],
			            data: data_process
			        }, {
			            name: lang['Actividades'],
			            data: data_activity
			        }, {
			            name: lang['Tareas'],
			            data: data_task
			        }];
					 
				});
				graphGeneral(lang['Comparativa ISO'],categories,data);
			}
			else if(opt_grafica == "graf_2"){
				var categories = new Array();
				var data_process = new Array();
				var data_specific_goal = new Array();
				var data_specific_practice = new Array();
				var data_work_product = new Array();
				var data;
				getAllStats('cmmi',function(models) {
					models.forEach(function (element) {
						categories.push(element.name);
						data_process.push(element.process);
						data_specific_goal.push(element.specificGoal);
						data_specific_practice.push(element.specificPractice);
						data_work_product.push(element.workProduct);
					});
					
					data = [{
			            name: lang['Procesos'],
			            data: data_process
			        }, {
			            name: lang['Objetivos Específicos'],
			            data: data_specific_goal
			        }, {
			            name: lang['Prácticas Específicas'],
			            data: data_specific_practice
			        },
			        {
			            name: lang['Productos de Trabajo'],
			            data: data_work_product
			        }];
					 
				});
				graphGeneral(lang['Comparativa CMMI'],categories,data);
			}
			break;
		case "graficas":
		case "estandar":
			break;
		default:
			var array_opt = id_opt.split("_");
			var opcion;
			if(array_opt[0] == 'graf'){
				opcion = "graficas";
				toolbar.enableItem('estandar');
				opt_grafica = id_opt;
				opt_estandar = 0;
				
				toolbar.removeItem("estandar");
				toolbar.removeItem("load");
				
				toolbar.addButtonSelect('estandar',1, lang['Estándar'], new Array(), url_doc, url_doc_dis);
				
				toolbar.disableItem('estandar');
				
				toolbar.addButton('load', 2, lang['Cargar'], 'css/images/load.png');
				
				if(id_opt == "graf_3"){
					toolbar.enableItem('estandar');
					
					fillSelect(function(models) {
						for (var i in models){
							toolbar.addListOption('estandar',models[i].type+"-"+models[i].id,i,'button',models[i].name+" ("+models[i].type.toUpperCase()+")",url_doc);
						}
					});
				}
				else toolbar.disableItem('estandar');
				
			}else{
				opcion = "estandar";
				opt_estandar = id_opt;
			}
		
			toolbar.setItemText(opcion, toolbar.getListOptionText(opcion,id_opt));
			
			break;
		}
	});
	
	return toolbar;
}

function graph(data,type,title,yaxis,series) {
	var height = $(window).height()-50;
	$("#grafica").css('height',height+"px");
	
    $('#grafica').highcharts({
        chart: {
            type: type
        },
        title: {
            text: title
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: yaxis
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        lang : lang_graph,
        series: [{
            name: series,
            colorByPoint: true,
            data: data
        }]
    });
}

function graphGeneral(title,categories,data){
	var height = $(window).height()-50;
	$("#grafica").css('height',height+"px");
    $('#grafica').highcharts({
        title: {
            text: title,
            x: -20 //center
        },
        xAxis: {
        	categories: categories
        },
        yAxis: {
            title: {
                text: lang['Cantidad']
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series : data,
        lang : lang_graph
    });
}

$(document).ready(function() {
	language();
	toolbar_top = inicializarToolbar('toolbar');
});