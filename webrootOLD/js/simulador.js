var iCtrl = iCtrl || {};
/**
* @description definicion de variables
*/
iCtrl.tableSimulatorRows = [];
/**
* @description iCtrl.controlsKeys teclas rapidas
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.controlsKeys = function()  {
    $('body').on('keyup', function(evt) {
        if(evt.which == 113 || evt.which == 115) {
            switch (evt.which) {
                case 113:
                iCtrl.resetSimulator();
                break;
                case 115:
                $('#formSimulator').submit();
                break;
            }
        }
    });
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.onChangeTypeCredit = function() {
    $(document).on('change','select[name="typeCredit"]',function(evt) {
        iCtrl.changeTypeCredit(evt);

        let valAmmount = getValInput('input[name="ammount"]');
        if(valAmmount.replace(/(\s)|(\$)/g)) {
            $('#formSimulator').submit();
        }
    });
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.keyEnterAmmount = function() {
    $(document).on('keypress','input[name="ammount"]',function(evt) {
        if(evt.which == 13) {
            $('#formSimulator').submit();
            return false;
        }
    });
}
/**
* @description iCtrl.onChangeTypeCredit actualiza el valor de 'Dias para la inicial'
* segun el valor seleccionado en 'Tipo de Credito'
* 'Tipo de Credito'
* @param {object} evt => evento original
* @return {void}
*/
iCtrl.changeTypeCredit = function(evt) {
    let valTypeCredit = getValInput('select[name="typeCredit"]');
    let filterTypeCredit = ctrlData.typesCredit.filter(function(a) {
        return ((""+a.cod_tip == ""+valTypeCredit)? true: false);
    })[0];
    $('#daysTypeCredit').html(filterTypeCredit.dias);
}
/**
* @description iCtrl.onSubmitFormSimulator escuha el envio de formulario de
* simulacion
* @return {void}
*/
iCtrl.onSubmitFormSimulator = function() {
    $(document).on('submit','#formSimulator',function(evt) {
        let valAmmount = getValInput('input[name="ammount"]');
        let valTypeCredit = getValInput('select[name="typeCredit"]');
        valAmmount = numeral(valAmmount)._value;
        if(!valAmmount) { return false; }
        iCtrl.resetCreditBox();

        togglePreloader(true);
        reqJSON({
            'path': './simulador',
            'data': {
                'tipo': valTypeCredit,
                'valor': valAmmount
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            iCtrl.printTableSimulator(response.data[0]);
            setTimeout(function() { togglePreloader(false) },100);
        });
        return false;
    });
}
/**
* @description iCtrl.resetSimulator Reinicia todo el panel de simulacion
* @return {void}
*/
iCtrl.resetSimulator = function() {
    $('input[name="ammount"]').val('');
    $('select[name="typeCredit"]').val('01');
    iCtrl.changeTypeCredit();
    iCtrl.resetCreditBox();

    iCtrl.tableSimulator.clear().draw();
}
/**
* @description iCtrl.resetCreditBox Reinicia el panel de Credito
* @return {void}
*/
iCtrl.resetCreditBox = function() {
    $("#descripcionCredito").html("Crédito");
    $("#valorFactura").html(numeral(0).format('$0,0'));
    $("#valorIntereses").html(numeral(0).format('$0,0'));
    $("#cantidadCuotas").html(0);
    $("#cuotasDe").html(numeral(0).format('$0,0'));
    $("#totalFinanciar").html(numeral(0).format('$0,0'));
}
/**
* @description iCtrl.printTableSimulator Pinta la tabla de resultados de solicitud
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableSimulator = function(input) {
    let rowsToAdd = [];
    for (let item of input) {
        rowsToAdd.push({
            'cuotas': item.cuotas,
            'valorTotal': numeral(item.ValorTotal).format('$0,0.00'),
            'valorCuota': numeral(item.ValorCuota).format('$0,0.00'),
            'info': '<span data-reg="'+((item.sw_cuo_reg)? 1: 0)+'">&nbsp;</span>'

        });
    }
    iCtrl.simulatorRows = input;
    iCtrl.tableSimulatorRows = rowsToAdd;
    iCtrl.tableSimulator.clear();
    iCtrl.tableSimulator.rows.add(rowsToAdd).draw();


    setTimeout(function() {
        $('#datatablesSimulator span[data-reg="1"]').parents('tr').addClass('green');
    }, 300);


    
}
iCtrl.onClickRowTableSimulator = function() {
    $('#datatablesSimulator tbody').on('click', 'tr', function() {
        let elData = iCtrl.tableSimulator.row(this).data();
        let filterRow = iCtrl.simulatorRows.filter(function(a) {
            return (""+a.cuotas == ""+elData.cuotas)? true: false;
        })[0];

        $('#datatablesSimulator tr.active').removeClass('active');
        $(this).addClass('active');

        $("#descripcionCredito").html(filterRow.d_cuota);
        $("#valorFactura").html(numeral(filterRow.ValorTotal).format('$0,0.00'));
        $("#valorIntereses").html(numeral(parseFloat(filterRow.ValTotAval)+parseFloat(filterRow.ValorFinan)).format('$0,0.00'));
        $("#cantidadCuotas").html(filterRow.cuotas);
        $("#cuotasDe").html(numeral(filterRow.ValorCuota).format('$0,0.00'));
        $("#totalFinanciar").html(numeral(filterRow.ValorTotal).format('$0,0.00'));
    });
}
/**
* @description iCtrl.newDataTableSimulator Inicializa la tabla de resultado de
* simulacion
* @return {void}
*/
iCtrl.newDataTableSimulator = function() {
    $('#datatablesSimulator').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'columns': [
            { 'data': 'cuotas' },
            { 'data': 'valorCuota' },
            { 'data': 'valorTotal' },
            { 'data': 'info' }

        ]
    });
    iCtrl.tableSimulator = $('#datatablesSimulator').DataTable();
}

/**
* @description document.ready inicializa el modulo
* @return {void}
*/
$(document).ready(function() {
    iCtrl.keyEnterAmmount();
    iCtrl.onChangeTypeCredit();
    iCtrl.changeTypeCredit(null);
    iCtrl.onSubmitFormSimulator();
    iCtrl.newDataTableSimulator();
    iCtrl.onClickRowTableSimulator();

    iCtrl.controlsKeys();

    $('[data-toggle="tooltip"]').tooltip();
});
