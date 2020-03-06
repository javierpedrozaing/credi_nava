var iCtrl = iCtrl || {};
/**
* @description definicion de variables
*/
iCtrl.tableRequestRows = [];
iCtrl.timeoutSearchClients = null;


/**
* @description iCtrl.searchClients obtiene el listado de cliente en la busqueda
* @param {object} evt => evento
* @return {void}
*/
iCtrl.searchClients = function(evt) {
    if(iCtrl.timeoutSearchClients) {
        clearTimeout(iCtrl.timeoutSearchClients);
    }
    iCtrl.timeoutSearchClients = setTimeout(function() {
        let strSearch = getValInput('input[name="cc"]');
        reqJSON({
            'path': './buscarCliente',
            'data': {
                'stbuscar': strSearch
            },
            'type': 'POST'
        }, function(err, response) {
            iCtrl.printSearchClients(response.data[0]);
        });
    }, 800);
}
iCtrl.printSearchClients = function(input) {
    let availableTags = [];
    for (let item of input) {
        let valOption = ""+item.cod_cli.replace(/(\s)/g, '');
        availableTags.push({label: (valOption+' - '+item.nom_cli), value: valOption});
    }
    $('#fcc').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#fcc').val(ui.item.value);
            $('#formRequest').submit();
            return false;
        },
        'focus': function(event, ui) {
            $("#fcc").val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    }).focus();
}
/**
* @description iCtrl.onSubmitFormRequest escuha el envio de formulario de solicitudes
* @return {void}
*/
iCtrl.onSubmitFormRequest = function() {
    $(document).on('keypress','#formRequest',function(evt) {
        if(evt.which == 13) {
            $('#formRequest').submit();
        }
    });

    $(document).on('submit','#formRequest',function(evt) {
        if(isNaN(getValInput('input[name="cc"]'))) { return false; }
        togglePreloader(true);
        reqJSON({
            'path': './solicitudes',
            'data': {
                'fec1': moment(getValInput('input[name="dateFrom"]'), 'DD/MM/YYYY').format('YYYYMMDD'),
                'fec2': moment(getValInput('input[name="dateTo"]'), 'DD/MM/YYYY').format('YYYYMMDD'),
                'cli': getValInput('input[name="cc"]'),
                'tcli': getValInput('select[name="typeClient"]')
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            iCtrl.printTableRequest(response.data[0]);

            setTimeout(function() {
                togglePreloader(false);
            }, 100);
        });
        return false;
    });
}
/**
* @description iCtrl.printTableRequest Pinta la tabla de solicitudes
* @param {Array} input => datos para el llenado de la tabla
* @param {String} [input.Cliente]
* @param {String} [input.Nombre]
* @param {String} [input.FechaEnvio]
* @param {String} [input.Estado]
* @param {String} [input.FechaAprobacion]
* @param {String} [input.CupoDisponible]
* @param {String} [input.RazonResultado]
* @param {String} [input.NotaResultado]
* @return {void}
*/
iCtrl.printTableRequest = function(input) {
    let counts = {
        'pending': 0,'transit': 0,
        'attended': 0,'approved': 0,
        'refused': 0
    };
    for (let item of input) {
        if(''+item.Aprobadas == '1') {
            counts.approved++;
        }else if(''+item.Negadas == '1') {
            counts.refused++;
        }else if(''+item.Pendientes == '1') {
            counts.pending++;
        }else {
            counts.transit++;
        }
    }

    iCtrl.requestRows = input;
    iCtrl.toggleFilterRequest(null, null);

    counts.attended = (counts.pending + counts.transit + counts.attended + counts.approved + counts.refused);
    $('#countPending').html(counts.pending);
    $('#countTransit').html(counts.transit);
    $('#countAttended').html(counts.attended);
    $('#countApproved').html(counts.approved);
    $('#countRefused').html(counts.refused);
}
/**
* @description iCtrl.printTableRequest Pinta la tabla de solicitudes
* @param {Object} evt => evento original
* @param {String} type => approved | attended | transit | pending
* @return {void}
*/
iCtrl.toggleFilterRequest = function(evt, type) {
    type = (type)? type: 'attended';
    let toFilter = {
        'approved': false,
        'attended': false,
        'transit': false,
        'pending': false,
        'refused': false
    };
    for (let iKey in toFilter) {
        if(iKey !== type) {
            toFilter[iKey] = false;
            $('.btn.request-filter.'+iKey).addClass('button-filter-disabled');
        }else {
            toFilter[iKey] = true;
            $('.btn.request-filter.'+iKey).removeClass('button-filter-disabled');
        }
    }

    let rowsToAdd = [];
    let filterRows = iCtrl.requestRows.filter(function(a) {
        let c = false;
        if(toFilter.attended) c = true;
        if(toFilter.transit && (''+a.Pendientes != '1' && ''+a.Aprobadas != '1' && ''+a.Negadas != '1')) c = true;
        if(toFilter.pending && ''+a.Pendientes == '1') c = true;
        if(toFilter.approved && ''+a.Aprobadas == '1') c = true;
        if(toFilter.refused && ''+a.Negadas == '1') c = true;
        return c;
    });
    for (let item of filterRows) {
        let status = item.Estado;
        if(status.indexOf('SIN ASIGNAR') == -1 && status.indexOf('EN TRAMITE') == -1) {
            status = status.split(/(\s)/g)[0];
        }

        let row = {
            'cliente': item.Cliente,
            'nombre': item.Nombre,
            'fechaEnvio': moment(item.FechaEnvio.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY H:mm"),
            'estado': status,
            'fechaAprobacion': moment(item.FechaAprobacion.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY H:mm"),
            'usuarioCallcenter': item.UsuarioCall,
            'cupoDisponible': numeral(item.CupoDisponible).format('$0,0.00'),
            'razonResultado': item.RazonResultado,
            'notaResultado': item.NotaResultado
        }

        if(item.Estado == 'NEGADO'){
            row.razonResultado   = '' 
            row.notaResultado = ''
        }

        rowsToAdd.push(row);
    }
    iCtrl.tableRequestRows = rowsToAdd;
    iCtrl.tableRequest.clear();
    iCtrl.tableRequest.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.newInputsDatePicker Inicializa los datepicker de los inputs
* @return {void}
*/
iCtrl.newInputsDatePicker = function() {
    $('#dateFrom').datetimepicker({
        'format': 'DD/MM/YYYY',
        'icons': iconsDateTimeicker
    });
    $('#dateTo').datetimepicker({
        'format': 'DD/MM/YYYY',
        'icons': iconsDateTimeicker
    });
}
/**
* @description iCtrl.newDataTableRequest Inicializa la tabla de solicitudes
* @return {void}
*/
iCtrl.newDataTableRequest = function() {
    $('#datatablesRequest').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        "order": [],
        'columns': [
            { 'data': 'cliente' },
            { 'data': 'nombre' },
            { 'data': 'fechaEnvio' },
            { 'data': 'estado' },
            { 'data': 'fechaAprobacion' },
            { 'data': 'usuarioCallcenter' },
            { 'data': 'cupoDisponible' },
            { 'data': 'razonResultado' },
            { 'data': 'notaResultado' }
        ]
    });
    iCtrl.tableRequest = $('#datatablesRequest').DataTable();
}
/**
* @description document.ready inicializa el modulo
* @return {void}
*/
$(document).ready(function() {
    iCtrl.newInputsDatePicker();
    iCtrl.onSubmitFormRequest();
    iCtrl.newDataTableRequest();

    $('#dateFrom').val(moment().format('DD/MM/YYYY'));
    $('#dateTo').val(moment().format('DD/MM/YYYY'));
    setTimeout(function() {
        $('#formRequest').submit();
    }, 0);
});
