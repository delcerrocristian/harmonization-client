var toolbar_top;
var opt_grafica;
var opt_estandar;

function inicializarToolbar(nombre){
	var toolbar=new dhtmlXToolbarObject(nombre);
	
	var url_chart = 'css/images/chart.png';
	var url_doc = 'css/images/doc.png';
	var url_doc_dis = 'css/images/doc_dis.png';
	
	toolbar.addButtonSelect('graficas',0, 'Gráficas', new Array(), url_chart);
	toolbar.addListOption('graficas','graf_1',1,'button','Barras Procesos ISO',url_chart);
	toolbar.addListOption('graficas','graf_2',2,'button','Barras Procesos CMMI',url_chart);
	
	toolbar.addButtonSelect('estandar',1, 'Estándar', new Array(), url_doc, url_doc_dis);
	toolbar.addListOption('estandar','est_1',1,'button','ISO 1',url_doc);
	toolbar.addListOption('estandar','est_2',2,'button','CMMI 1',url_doc);
	
	toolbar.disableItem('estandar');
	
	toolbar.addButton('load', 2, 'Cargar', 'css/images/load.png');
	
	toolbar.attachEvent('onClick',function(id_opt){
		switch(id_opt){
		case "load":
			
//			var dataToDrawStats = [
//	       		{
//	       			name : 'Process', 
//	                   y: 10
//	       		},
//	       		{
//	       			name: 'Activity', 
//	                   y: 26
//	       		},
//	       		{
//	       			name: 'Task', 
//	                   y: 102
//	       		}];
//			
//			graph(dataToDrawStats,'pie','Cantidad Procesos Armonizados','Cantidad Total','Cantidad');
			graphGeneral();
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

function graphGeneral(){
	var height = $(window).height()-50;
	$("#grafica").css('height',height+"px");
    $('#grafica').highcharts({
        title: {
            text: 'Comparativa ISO',
            x: -20 //center
        },
        xAxis: {
            categories: ['ISO 1', 'ISO 2', 'ISO 3']
        },
        yAxis: {
            title: {
                text: 'Cantidad'
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
        series: [{
            name: 'Procesos',
            data: [10, 12, 15]
        }, {
            name: 'Actividades',
            data: [33, 42, 37]
        }, {
            name: 'Tareas',
            data: [112, 121, 102]
        }],
        lang : lang_graph
    });
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
	toolbar_top = inicializarToolbar('toolbar');
});