var iCtrl = iCtrl || {};

ctrlData.filter = {
    'dateFrom': moment().format('YYYYMMDD'),
    'dateTo': moment().format('YYYYMMDD')
};
/**
* @description iCtrl.toggleCalendar
* @return {void}
*/
iCtrl.toggleCalendar = function() {
    $('#contentCalendar').toggleClass('active');
}
/**
* @description iCtrl.getHistorySales carga el historial de ventas
* @return {void}
*/
iCtrl.getHistorySales = function() {
    togglePreloader(true);
    reqJSON({
        'path': './historialRecaudos',
        'data': {
            'fecha_ini': ctrlData.filter.dateFrom,
            'fecha_fin': ctrlData.filter.dateTo
        },
        'type': 'POST'
    }, function(err, response) {
        ctrlData.requestPayments = response;
        iCtrl.printTableHistorySales();
        togglePreloader(false);
    });
}
/**
* @description iCtrl.printTableHistorySales Imprime la tabla
* @return {void}
*/
iCtrl.printTableHistorySales = function(input) {
    let rowsToAdd = [];

    for (let item of ctrlData.requestPayments.data[0]) {
        rowsToAdd.push({
            'fecha': moment(item.fecha.replace('Z', '')).format('DD-MM-YYYY'),
            'documento': item.num_doc,
            'valor': numeral(item.valor).format('$0,00'),
            'nit': item.nit,
            'cliente': item.cliente,
            'print': '<i class="material-icons pointer text-danger" data-document="'+item.num_doc+'" onclick="iCtrl.printPayment(this, \''+item.num_doc.replace(/\s/g, '')+'\')">print</i>'
        });
    }
    iCtrl.tableHistorySales.clear();
    iCtrl.tableHistorySales.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.newDataTableHistorySales Inicializa la tabla de pdfs historia
* de ventas
* @return {void}
*/
iCtrl.newDataTableHistorySales = function() {
    $('#datatablesHistorySales').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': true,
        "order": [],// 'order': [[1, 'desc']],
        'columns': [
            { 'data': 'fecha' },
            { 'data': 'documento' },
            { 'data': 'valor' },
            { 'data': 'nit' },
            { 'data': 'cliente' },
            { 'data': 'print' }
        ]
    });
    iCtrl.tableHistorySales = $('#datatablesHistorySales').DataTable();
}
/**
* @description iCtrl.printPayment re-imprime una factura
* de ventas
* @return {void}
*/
iCtrl.printPayment = function(evt, input) {
    printPayment(input);
}
/**
* @description iCtrl.initDatetimePicker Inicializa el filtro de fecha
* @return {void}
*/
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
        ctrlData.filter.dateFrom = e.date.format('YYYYMMDD');
        $('#dateTo').data("DateTimePicker").minDate(e.date);
        // iCtrl.getHistorySales();
    });
    $("#dateTo").on("dp.change", function (e) {
        ctrlData.filter.dateTo = e.date.format('YYYYMMDD');
        $('#dateFrom').data("DateTimePicker").maxDate(e.date);
        // iCtrl.getHistorySales();
    });

    setTimeout(function() {
        $('#dateTo').data("DateTimePicker").minDate(moment());
        $('#dateFrom').data("DateTimePicker").maxDate(moment(moment().format("YYYY-MM-01")));
    }, 0);
}

$(document).ready(function() {
    iCtrl.initDatetimePicker();
    iCtrl.newDataTableHistorySales();
    iCtrl.printTableHistorySales();

    $('[data-toggle="tooltip"]').tooltip();
});
