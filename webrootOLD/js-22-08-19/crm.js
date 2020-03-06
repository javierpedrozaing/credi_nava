var iCtrl = iCtrl || {};
/**
* @description definicion de variables
*/
iCtrl.tableCallsRows = [];
iCtrl.tablePaymentsRows = [];
iCtrl.tableObligationsRows = [];
iCtrl.timeoutSearchClients = null;
ctrlData.validClient = null;



iCtrl.printInvoice = function(evt, input) {
    printInvoice(input);
}

iCtrl.printPayment = function(evt, input) {
    printPayment(input);
}

iCtrl.printPazSalvo = function(evt, input){
    let target = $(evt);
    let doc = target.data('document');
    let fecha = target.data('fecha');
    let cliente = target.data('cliente');
    let nomcli = target.data('nomcli');
    let almacen = target.data('almacen');
    printPazSalvo(doc,fecha,cliente,nomcli,almacen);
}
/**
* @description iCtrl.searchClients obtiene el listado de cliente en la busqueda
* @param {object} evt => evento
* @return {void}
*/
iCtrl.searchClients = function(evt) {
    let codeKey = (event.keyCode)? event.keyCode: event.which;
    if(codeKey == 13) {
        if(iCtrl.timeoutSearchClients) {
            clearTimeout(iCtrl.timeoutSearchClients);
        }
        return false;
    }

    if(iCtrl.timeoutSearchClients) {
        clearTimeout(iCtrl.timeoutSearchClients);
    }
    iCtrl.timeoutSearchClients = setTimeout(function() {
        let strSearch = getValInput('input[name="validar_cedula"]');
        reqJSON({
            'path': urlWS+'/buscarCliente',
            'data': {
                'empresa': ctrlData.user.empresa,
                'stbuscar': strSearch
            },
            'type': 'POST'
        }, function(err, response) {
            iCtrl.printSearchClients(response.data[0]);
        }, true);
    }, 800);
}
iCtrl.printSearchClients = function(input) {
    let availableTags = [];
    for (let item of input) {
        let valOption = ""+item.cod_cli.replace(/(\s)/g, '');
        availableTags.push({label: (valOption+' - '+item.nom_cli), value: valOption});
    }
    $('#validarCedula').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#validarCedula').val(ui.item.value);
            iCtrl.validClient();
            return false;
        },
        'focus': function(event, ui) {
            $("#validarCedula").val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    }).focus();
}
/**
* @description iCtrl.toggleFilterRequest filtro de obligaciones
* @param {Object} evt => evento original
* @param {String} type => active | canceled | all
* @return {void}
*/
iCtrl.toggleFilterRequest = function(evt, type) {
    type = (type)? type: 'all';
    let toFilter = {
        'active': false,
        'canceled': false,
        'all': false
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
    let filterRows = iCtrl.tableObligationsRows.filter(function(a) {
        let c = false;
        if(toFilter.all) c = true;
        if(toFilter.active && ''+a.dSaldo > 0) c = true;
        if(toFilter.canceled && ''+a.dSaldo <= 0) c = true;
        return c;
    });
    rowsToAdd = filterRows;

    iCtrl.tableObligations.clear();
    iCtrl.tableObligations.rows.add(rowsToAdd).draw();

    setTimeout(function() {
        $('#datatablesObligations span[data-saldo="0"]').parents('tr').addClass('orange');
    }, 300);
}
/**
* @description iCtrl.getTableItems obtiene el listado de articulos
* @param {object} input => fila seleccionada
* @return {void}
*/
iCtrl.getTableItems = function(input, fn) {
    togglePreloader(true);
    reqJSON({
        'path': urlWS+'/crmItem',
        'data': {
            'ano_doc': input.ano_doc,
            'per_doc': input.per_doc,
            'tip_doc': input.tip_doc,
            'num_doc': input.num_doc
        },
        'type': 'POST'
    }, function(err, response) {
        let result = [];
        if(err) { console.error(err) }
        result = ((response)? response.data[0]: []);
        setTimeout(function() { togglePreloader(false) }, 100);
        fn(result);
    }, true);
}
/**
* @description iCtrl.onClickRowTableObligations escucha el evento click sobre una
* fila de la tabla de obligaiones
* @param
* @return {void}
*/
iCtrl.onClickRowTableObligations = function() {
    $('#datatablesObligations tbody').on('click', 'tr', function(evt) {
        if(evt.target.nodeName == 'I' || evt.target.nodeName == 'i') {
            if(evt.target.dataset.document) { return }
            let elData = iCtrl.tableObligations.row(this).data();
            let filterRow = ctrlData.obligations.filter(function(a) {
                return (""+a.num_doc == ""+elData.num_doc)? true: false;
            })[0];
            if(!filterRow) { return }
            ctrlData.obligationSelected = filterRow;

            iCtrl.getTableItems(ctrlData.obligationSelected, function(items) {
                iCtrl.printTableFees(ctrlData.obligationSelected.items, ctrlData.obligationSelected.helpItems);
                iCtrl.printTableItems(items);

                $('#crmModal').modal('show');
            });

            let dateAge = moment(filterRow.item.fec_edad.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY");
            let cAge = calculateAge(dateAge);

            $('#emNumeroFactura').html(filterRow.num_doc);
            $('#emFechaEdad').html(moment(filterRow.item.fec_edad.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY"));
            $('#emEdad').html(cAge);
        }
    });
}
/**
* @description iCtrl.printTableItems Pinta la tabla de articulos
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableItems = function(input) {
    let rowsToAdd = [];
    for (let item of input) {
        rowsToAdd.push({
            'reg': item.reg,
            'codigo': item.alterno,
            'descripcion': item.des_item,
        });
    }
    iCtrl.tableItems.clear();
    iCtrl.tableItems.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.printTableFees Pinta la tabla de cuotas
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableFees = function(input, helpInput) {
    let rowsToAddFees = [];
    let rowsToAddPending = [];
    let rowsToAddExpired = [];
    let rowsToAddPayments = [];
    let totalFees = 0;

    let totalSal = 0;
    let totalInt = 0;
    for (let item of input) {
        if(parseFloat(item.saldo_doc) > 0) {
            rowsToAddPending.push({
                'cuota': item.reg_doc,
                'valor': numeral(item.val_doc).format('$0,000'),
                'fecha_vencimiento': moment(item.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY")
            });
        }
        if(parseFloat(item.sal_vdo) > 0) {
            let filterHelp = helpInput.filter((a) => {
                return (''+a.num_doc == ''+item.num_doc && ''+a.numero_cuota == ''+item.reg_doc)? true: false;
            })[0];
            let valInt = ((filterHelp)? filterHelp.valor_interes: item.intereses);

            rowsToAddExpired.push({
                'cuota': item.reg_doc,
                'valor': numeral(item.sal_vdo).format('$0,000'),
                'fecha_vencimiento': moment(item.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY"),
                'dias_mora': item.mora_cuo,
                'intereses': numeral(valInt).format('$0,000')
            });

            totalSal += item.sal_vdo;
            totalInt += valInt;
        }
        if(''+item.tip_doc == '040') {
            rowsToAddPayments.push({
                'cuota': item.reg_ref,
                'numero': item.num_doc,
                'fecha': moment(item.fch_doc.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY"),
                'valor': numeral(item.val_doc).format('$0,000'),
                'intereses': numeral(item.intereses).format('$0,000'),
                'mora': item.dia_mora
            });
        }
        if(''+item.tip_doc == '010') {
            rowsToAddFees.push({
                'reg': item.reg_doc,
                'cuota': '<span data-reg="'+item.reg_doc+'">'+item.reg_doc+'</span>',
                'valor': numeral(item.val_doc).format('$0,000'),
                'saldo': numeral(item.sal_doc).format('$0,000'),
                'fecha_vencimiento': moment(item.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY")
            });
        }

        totalFees += parseFloat(item.sal_doc);
    }

    iCtrl.tableFees.clear();
    iCtrl.tableFees.rows.add(rowsToAddFees).draw();

    iCtrl.tablePending.clear();
    iCtrl.tablePending.rows.add(rowsToAddPending).draw();

    iCtrl.tableExpired.clear();
    iCtrl.tableExpired.rows.add(rowsToAddExpired).draw();

    iCtrl.tablePaymentModal.clear();
    iCtrl.tablePaymentModal.rows.add(rowsToAddPayments).draw();

    $('#emSaldoMora').html(numeral(totalSal).format('$0,000'));
    $('#emInteresesMora').html(numeral(totalInt).format('$0,000'));
    $('#emTotalMora').html(numeral(parseFloat(totalSal) + parseFloat(totalInt)).format('$0,000'));
    $('#emTotal').html(numeral(totalFees).format('$0,000'));

    for (let item of rowsToAddFees) {
        if(parseInt(numeral(item.saldo).format('0')) == 0) {
            $('#datatablesFees span[data-reg="'+item.reg+'"]').parents('tr').addClass('orange');
        }
    }
}

iCtrl.openObligationPDF = function(event) {
    let valDocument = $(event).data('document');
    $('#pdfAutorizacion').prop('src', '');
    $('#pdfContrato').prop('src', '');
    $('#pdfPagare').prop('src', '');
    togglePreloader(true);
    reqJSON({
        'path': './archivosCrm',
        'data': {
            'cod_cli': ctrlData.validClient.client.cod_cli,
            'Documento': valDocument
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(!response.data.length) { return; }
        setTimeout(function() {
            togglePreloader(false);
            if(!response.data[0].length && !response.data[0].length && !response.data[0].length) {
                swal({
                    title: 'No hay archivos firmados',
                    text: 'No se encontraron archivos firmados para el documento '+valDocument,
                    icon: 'warning',
                    dangerMode: true
                }).then((value) => {});
                return false;
            }

            if(response.data[0].length) {
                $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo);
            }else {
                $('#nav-autorizacion-tab').addClass('hide');
            }
            if(response.data[1].length) {
                $('#pdfContrato').prop('src', 'data:application/pdf;base64,'+response.data[1][0].archivo);
            }else {
                $('#nav-contrato-tab').addClass('hide');
            }
            if(response.data[2].length) {
                $('#pdfPagare').prop('src', 'data:application/pdf;base64,'+response.data[2][0].archivo);
            }else {
                $('#nav-pagare-tab').addClass('hide');
            }

            $('#pdfsModal').modal('show');
        }, 300);
    });
}

/**
* @description iCtrl.printTableObligations Pinta la tabla de obligaciones
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableObligations = function(input) {
    let rowsToAdd = [];
    let count = 1;
    let countActives = 0;
    let countCanceled = 0;
    for (let item of ctrlData.obligations) {
        if(item.item) {
            let filterPayment = ctrlData.payments.filter(function(a) {
                return (a.doc_ref == item.num_doc)? true: false;
            });
            let datetimePayment = null;
            for (let item of filterPayment) {
                let iDatetime = moment(item.fec_grab.replace('Z','')).valueOf();
                if(iDatetime > datetimePayment) {
                    datetimePayment = iDatetime;
                }
            }
            let datePayment = ((datetimePayment)? moment(datetimePayment).format('DD/MM/YYYY'): ' - ');
            let pazSalvo = (parseInt(item.saldo_doc) == 0) ? '<i class="material-icons check text-danger" data-document="'+item.num_doc+'" data-fecha="'+item.fecha_hora+'" data-cliente="'+item.cliente.trim()+'" data-nomcli="'+item.nom_cli.trim()+'" data-almacen="'+item.nom_cco+'" title="Imprimir Paz y Salvo" onclick="iCtrl.printPazSalvo(this)">check</i>' : '';
            let filterHelp = item.items.filter((a) => {
                return (''+a.num_doc == ''+item.num_doc && ''+a.sal_vdo > 0)? true: false;
            });

            let vdo = {
                'dias_mora': 0,
                'cuotas_mora': 0,
                'saldo_mora': 0
            }
            if(filterHelp.length) {
                for (let itemHelp of filterHelp) {
                    vdo.dias_mora = (itemHelp.mora_cuo > vdo.dias_mora)? itemHelp.mora_cuo: vdo.dias_mora;
                    vdo.saldo_mora += itemHelp.sal_vdo;
                    vdo.cuotas_mora += 1;
                }
            }

            rowsToAdd.push({
                'dSaldo': item.saldo_doc,
                'det': '<i class="material-icons text-danger pl-8 pr-8 pointer">details</i>',
                'reg': count,// ((item.item.reg_doc)? item.item.reg_doc: ''),
                'almacen': item.nom_suc,
                'prefijo': '0',
                'nro_credito': '<span style="white-space: nowrap;">'+item.num_doc+'</span>',
                'condicion': item.CondCredito,
                'fecha_factura': moment(item.fec_grab.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY HH:mm"),
                'valor_total': numeral(item.valor).format('$0,000'),
                'valor_cuota': numeral(item.item.val_doc).format('$0,000'),
                'saldo': '<span data-saldo="'+item.saldo_doc+'">'+numeral(item.saldo_doc).format('$0,000')+'</span>',
                'fecha_vencimiento': moment(item.item.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY"),
                'saldo_vencido': numeral(vdo.saldo_mora).format('$0,000'),
                'dias_mora': vdo.dias_mora,
                'cuotas_mora': vdo.cuotas_mora,
                'fecha_pago': datePayment,
                'codeudor': ' - ',
                'huella': ((item.huella)? 'Sí': 'No'),
                'pdfs': '<i class="material-icons pointer text-danger" data-document="'+item.num_doc+'" onclick="iCtrl.openObligationPDF(this)">picture_as_pdf</i>',
                'print': '<i class="material-icons pointer text-danger" data-document="'+item.num_doc+'" onclick="iCtrl.printInvoice(this, \''+item.num_doc.replace(/\s/g, '')+'\')">print</i>',
                'paz_salvo': pazSalvo,
                'num_doc': item.num_doc
            });
            count++;

            if(item.saldo_doc > 0) {
                countActives++;
            }
            if(item.saldo_doc <= 0) {
                countCanceled++;
            }
        }
    }

    iCtrl.tableObligationsRows = rowsToAdd;
    $('#countAll').html(rowsToAdd.length);
    $('#countActives').html(countActives);
    $('#countCanceled').html(countCanceled);
    iCtrl.toggleFilterRequest();
}
/**
* @description iCtrl.printTablePayments Pinta la tabla de pagos
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTablePayments = function(input) {
    let rowsToAdd = [];
    for (let item of ctrlData.payments) {
        rowsToAdd.push({
            'fecha_hora': moment(item.fec_grab.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY HH:mm"),
            'tipo_documento': item.nom_tip,
            'documento': item.num_doc,
            'doc_enlazado': item.doc_ref,
            'valor': numeral(item.valor).format('$0,000'),
            'print': '<i class="material-icons pointer text-danger" data-document="'+item.num_doc+'" onclick="iCtrl.printPayment(this, \''+item.num_doc.replace(/\s/g, '')+'\')">print</i>'
        });
    }
    iCtrl.tablePaymentsRows = rowsToAdd;
    iCtrl.tablePayments.clear();
    iCtrl.tablePayments.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.printTableCalls Pinta la tabla de llamadas
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableCalls = function(input) {
    let rowsToAdd = [];
    for (let item of ctrlData.calls) {
        rowsToAdd.push({
            'reg': item.regi,
            'empresa': item.empresa,
            'fecha_hora': moment(item.fecha_hora.replace("Z", "")).format("DD/MM/YYYY LT"),
            'usuario': item.usuario,
            'grupo': item.grupo,
            'subgrupo': item.subgrupo,
            'comentario': eval('"'+item.comentario.replace(/(\")|(\s\s)/g, ' ')+'"')
        });
    }
    iCtrl.tableCallsRows = rowsToAdd;
    iCtrl.tableCalls.clear();
    iCtrl.tableCalls.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.newDataTableObligations Inicializa la tabla de obligaciones
* @return {void}
*/
iCtrl.newDataTableObligations = function() {
    $('#datatablesObligations').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'det' },
            { 'data': 'reg' },
            { 'data': 'almacen', 'visible': false },
            { 'data': 'prefijo' },
            { 'data': 'nro_credito' },
            { 'data': 'condicion' },
            { 'data': 'fecha_factura' },
            { 'data': 'valor_total' },
            { 'data': 'valor_cuota' },
            { 'data': 'saldo' },
            { 'data': 'fecha_vencimiento' },
            { 'data': 'saldo_vencido' },
            { 'data': 'dias_mora' },
            { 'data': 'cuotas_mora' },
            { 'data': 'fecha_pago' },
            { 'data': 'codeudor' },
            { 'data': 'huella' },
            { 'data': 'pdfs' },
            { 'data': 'print' },
            { 'data': 'paz_salvo' },
            { 'data': 'codeudor', 'visible': false }
        ]
    });
    iCtrl.tableObligations = $('#datatablesObligations').DataTable();

    $(document).on('page.dt', '#datatablesObligations', function () {
        setTimeout(function() {
            $('#datatablesObligations span[data-saldo="0"]').parents('tr').addClass('orange');
        }, 300);
    });
}
/**
* @description iCtrl.newDataTablePayments Inicializa la tabla de pagos
* @return {void}
*/
iCtrl.newDataTablePayments = function() {
    $('#datatablesPayments').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'fecha_hora' },
            { 'data': 'tipo_documento' },
            { 'data': 'documento' },
            { 'data': 'doc_enlazado' },
            { 'data': 'valor' },
            { 'data': 'print' }
        ]
    });
    iCtrl.tablePayments = $('#datatablesPayments').DataTable();
}
/**
* @description iCtrl.newDataTablesCalls Inicializa la tabla de llamadas
* @return {void}
*/
iCtrl.newDataTableCalls = function() {
    $('#datatablesCalls').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'reg' },
            { 'data': 'empresa' },
            { 'data': 'fecha_hora' },
            { 'data': 'usuario' },
            { 'data': 'grupo' },
            { 'data': 'subgrupo' },
            { 'data': 'comentario' }
        ]
    });
    iCtrl.tableCalls = $('#datatablesCalls').DataTable();
}
/**
* @description iCtrl.newDataTableItems Inicializa la tabla de articulos
* @return {void}
*/
iCtrl.newDataTableItems = function() {
    $('#datatablesItems').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'reg' },
            { 'data': 'codigo' },
            { 'data': 'descripcion' }
        ]
    });

    iCtrl.tableItems = $('#datatablesItems').DataTable();
}
/**
* @description iCtrl.newDataTableFees Inicializa la tabla de cuotas
* @return {void}
*/
iCtrl.newDataTableFees = function() {
    $('#datatablesFees').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'cuota' },
            { 'data': 'valor' },
            { 'data': 'saldo' },
            { 'data': 'fecha_vencimiento' }
        ]
    });

    iCtrl.tableFees = $('#datatablesFees').DataTable();
}
/**
* @description iCtrl.newDataTablePending Inicializa la tabla de pendientes
* @return {void}
*/
iCtrl.newDataTablePending = function() {
    $('#datatablesPending').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'cuota' },
            { 'data': 'valor' },
            { 'data': 'fecha_vencimiento' }
        ]
    });
    iCtrl.tablePending = $('#datatablesPending').DataTable();
}
/**
* @description iCtrl.newDataTableExpired Inicializa la tabla de vencidas
* @return {void}
*/
iCtrl.newDataTableExpired = function() {
    $('#datatablesExpired').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'cuota' },
            { 'data': 'valor' },
            { 'data': 'fecha_vencimiento' },
            { 'data': 'dias_mora' },
            { 'data': 'intereses' }
        ]
    });
    iCtrl.tableExpired = $('#datatablesExpired').DataTable();
}
/**
* @description iCtrl.newDataTablePayment Inicializa la tabla de abonos
* @return {void}
*/
iCtrl.newDataTablePayment = function() {
    $('#datatablesPaymentModal').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': false,
        "order": [],
        'columns': [
            { 'data': 'cuota' },
            { 'data': 'numero' },
            { 'data': 'fecha' },
            { 'data': 'valor' },
            { 'data': 'intereses' },
            { 'data': 'mora' }
        ]
    });
    iCtrl.tablePaymentModal = $('#datatablesPaymentModal').DataTable();
}
iCtrl.onSubmitValidClient = function() {
    $(document).on('keypress','input[name="validar_cedula"]',function(evt) {
        if(evt.which == 13) {
            iCtrl.validClient();
        }
    });
}
iCtrl.validClient = function() {
    let elDocument = $('input[name="validar_cedula"]');
    if(!elDocument.val()) { return false; }
    if(isNaN(elDocument.val())) { return false; }

    togglePreloader(true);
    reqJSON({
        'path': urlWS+'/validaCliente',
        'data': {
            'StrEmpresa': ctrlData.user.empresa,
            'StrCaja': ctrlData.user.caja,
            'cod_cli': elDocument.val()
        },
        'type': 'POST'
    }, function(err, dataset) {
        let validClient = {'result': false};
        if(dataset.data[0].length) {
            if(dataset.data[0][0].result == 'YA EXISTE') {
                validClient.result = true;
                for (let keyItem in dataset.data[1][0]) {
                    let valItem = dataset.data[1][0][keyItem];
                    validClient[''+keyItem] = ((typeof(valItem) == 'string')? valItem.trim(): valItem);
                }
            }
        }
        if(err) { console.error(err); return }

        let response = {'client': validClient};
        ctrlData.validClient = response;

        if(!response.client.result) {
            swal({
                title: '¡El cliente no existe!',
                text: 'El cliente '+elDocument.val()+' no ha sido encontrado.',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            iCtrl.getRowsExtend({'payments': [], 'obligations': [], 'calls': []});
            return;
        }

        $('#nomCli').html(response.client.nom_cli);
        $('#cupo').html(numeral(response.client.cup_cli).format('$0,000'));
        $('#saldo').html(numeral(response.client.saldo).format('$0,000'));
        iCtrl.getRows(response.client);
    }, true);
}
iCtrl.getRows = function(input) {
    $('#countAll').html('0');
    $('#countActives').html('0');
    $('#countCanceled').html('0');

    reqJSON({
        'path': urlWS+'/crm',
        'data': {
            "empresa": ctrlData.user.empresa,
            'nit': input.cod_cli
        },
        'type': 'POST'
    }, function(err, getCrm) {
        if(err) { console.error(err) }
        let calls = getCrm['data'][1];
        let obligations = [];
        for (let value of getCrm['data'][0]) {
            if(value['tip_doc'] == '510') {
                value['items'] = [];
                value['helpItems'] = [];
                value['item'] = null;
                value['valor_total'] = 0;
                flagRegDoc = [];

                for (let sValue of getCrm['data'][2]) {
                    if(value['num_doc'] == sValue['num_ref']) {
                        if(value['item'] == null) {
                            value['item'] = sValue;
                        }

                        let sDate = moment(sValue['fec_ven']).unix();
                        let mDate = moment(value['item']['fec_ven']).unix();
                        if(sDate > mDate) {
                            value['item'] = sValue;
                        }
                        value['valor_total'] = (sValue['val_doc'] + value['valor_total']);
                        value['items'].push(sValue);
                    }
                }

                for (let sValue of getCrm['data'][4]) {
                    if(value['num_doc'] == sValue['num_doc']) {
                        value['helpItems'].push(sValue);
                    }
                }
                obligations.push(value);
            }
        }

        let payments = [];
        for (let value of getCrm['data'][0]) {
            if(value['tip_doc'] == '040') {
                payments.push(value);
            }
        }

        iCtrl.getRowsExtend({
            'calls': calls,
            'obligations': obligations,
            'payments': payments
        });
    }, true);
}

iCtrl.getRowsExtend = function(response) {
    ctrlData.payments = response.payments;
    ctrlData.obligations = response.obligations;
    ctrlData.calls = response.calls;

    iCtrl.printTableCalls();
    iCtrl.printTableObligations();
    iCtrl.printTablePayments();
    setTimeout(function() { togglePreloader(false) }, 100);
}
// /**
// * @description document.ready inicializa el modulo
// * @return {void}
// */
$(document).ready(function() {
    iCtrl.newDataTableCalls();
    iCtrl.printTableCalls();
    iCtrl.newDataTableObligations();
    iCtrl.printTableObligations();
    iCtrl.newDataTablePayments();
    iCtrl.printTablePayments();
    iCtrl.onClickRowTableObligations();

    iCtrl.newDataTableItems();
    iCtrl.newDataTableFees();
    iCtrl.newDataTablePending();
    iCtrl.newDataTableExpired();
    iCtrl.newDataTablePayment();

    iCtrl.onSubmitValidClient();
});
