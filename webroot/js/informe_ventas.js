var iCtrl = iCtrl || {};
var dCtrl = dCtrl || {};

dCtrl.pdfModal = {};
dCtrl.filter = {
    'dateFrom': moment().format('YYYYMMDD'),
    'dateTo': moment().format('YYYYMMDD')
};

iCtrl.initDatetimePicker = function() {

}

iCtrl.getExternalSales = function() {
    togglePreloader(true);
    reqJSON({
        'path': './pdfInformeVentas',
        'data': {
            'metodo': 'RECAUDO_VENTAS_EXTERNOS',
            'row': {
                'datfecha_ini': dCtrl.filter.dateFrom,
                'datfecha_fin': dCtrl.filter.dateTo,
                'strbodega': ((role_usu == 'G_INFORMES')? '%': null),
                'tiporepor': '2'
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response.type == 'error') {
            swal({
                title: 'No se encontraron datos',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            return;
        }
        $('#pdfsModal #pdfsModalLabel').html('EXT-RECAUDOS Y VENTAS DIARIAS-ALMACENES');
        dCtrl.pdfModal['pdfInformeVentas'] = response.data;
        $('#pdfsModal #pdfGeneric').prop('src', 'data:application/pdf;base64,'+response.data);
        $('#pdfsModal').modal({'show': true});
        togglePreloader(false);
    });
}

iCtrl.recaudosVentasTirilla = () => {
    printRecaudosVentasDiarias(cod_caja, cod_sucursal, role_usu, dCtrl.filter.dateFrom, dCtrl.filter.dateTo);
}

iCtrl.getExternalSalesPresent = function() {
    togglePreloader(true);
    reqJSON({
        'path': './pdfInformeVentas',
        'data': {
            'metodo': 'RECAUDO_VENTAS_CUOTA_REGALO',
            'row': {
                'datfecha_ini': dCtrl.filter.dateFrom,
                'datfecha_fin': dCtrl.filter.dateTo,
                'strbodega': ((role_usu == 'G_INFORMES')? '%': null),
                'tiporepor': '2'
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response.type == 'error') {
            swal({
                title: 'No se encontraron datos',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            return;
        }
        $('#pdfsModal #pdfsModalLabel').html('EXT-RECAUDOS Y VENTAS DIARIAS-ALMACENES');
        dCtrl.pdfModal['pdfInformeVentas'] = response.data;
        $('#pdfsModal #pdfGeneric').prop('src', 'data:application/pdf;base64,'+response.data);
        $('#pdfsModal').modal({'show': true});
        togglePreloader(false);
    });
}

iCtrl.getSellerSales = function() {
    togglePreloader(true);
    reqJSON({
        'path': './pdfInformeVentas',
        'data': {
            'metodo': 'RECAUDO_VENTAS_VENDEDOR',
            'row': {
                'datfecha_ini': dCtrl.filter.dateFrom,
                'datfecha_fin': dCtrl.filter.dateTo,
                'strbodega': null,
                'tiporepor': ((role_usu == 'G_INFORMES')? '2': '2')
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response.type == 'error') {
            swal({
                title: 'No se encontraron datos',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            return;
        }
        $('#pdfsModal #pdfsModalLabel').html('EXT-VENTAS POR VENDEDOR');
        dCtrl.pdfModal['pdfInformeVentas'] = response.data;
        $('#pdfsModal #pdfGeneric').prop('src', 'data:application/pdf;base64,'+response.data);
        $('#pdfsModal').modal({'show': true});
        togglePreloader(false);
    });
}

iCtrl.initDatetimePicker = function() {
    $('#dateFrom').datetimepicker({
        'inline': true,
        'format': 'DD/MM/YYYY',
        'icons': iconsDateTimeicker
    });
    $('#dateTo').datetimepicker({
        'inline': true,
        'format': 'DD/MM/YYYY',
        'icons': iconsDateTimeicker
    });

    $("#dateFrom").on("dp.change", function (e) {
        dCtrl.filter.dateFrom = e.date.format('YYYYMMDD');
        $('#dateTo').data("DateTimePicker").minDate(e.date);
    });
    $("#dateTo").on("dp.change", function (e) {
        dCtrl.filter.dateTo = e.date.format('YYYYMMDD');
        $('#dateFrom').data("DateTimePicker").maxDate(e.date);
    });

    setTimeout(function() {
        $('#dateTo').data("DateTimePicker").minDate(moment());
        $('#dateFrom').data("DateTimePicker").maxDate(moment());
    }, 0);
}

$(document).ready(function() {
    iCtrl.initDatetimePicker();
});
