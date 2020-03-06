var iCtrl = iCtrl || {};
ctrlData.pdfsWithoutSign = [];
ctrlData.validClient = {
    'client': null,
    'codeudor': null
};
ctrlData.pdfModal = {};
ctrlData.idInvoice = null;
var signInterval = null;

/**
* @description iCtrl.getInvoicesWithoutSign carga las facturas sin firmar
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.getTotalInvoicesWithoutSign = function() {
    reqJSON({
        'path': './totalFacturasSinFirmar',
        'data': {},
        'type': 'POST'
    }, function(err, response) {
        $('#totalFacturaSinFirma').html(((response)? response: '0'));
        // let dataToSet = [];
        // if(err) { console.error(err); return; }
        // if(response.type == 'error') { return; }
        // ctrlData.invoicesWithoutSign = response;
        // iCtrl.printTablePdfsWithoutSign();
    });
}
/**
* @description iCtrl.getInvoicesWithoutSign carga las facturas sin firmar
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.getInvoicesWithoutSign = function() {
    reqJSON({
        'path': './facturasSinFirmar',
        'data': {},
        'type': 'POST'
    }, function(err, response) {
        let dataToSet = [];
        if(err) { console.error(err); return; }
        if(response.type == 'error') { return; }
        ctrlData.invoicesWithoutSign = response;
        iCtrl.printTablePdfsWithoutSign();
    });
}
/**
* @description iCtrl.sendSign envia los pdfs a firmar en la bio
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.sendSign = function() {
    var elPreloader = document.createElement("img");
    elPreloader.setAttribute("src", "./img/preloader.gif");
    swal({
        'title': 'Firmando documentos...',
        'content': elPreloader,
        'buttons': {
            'cancel': false,
            'confirm': false
        },
        'closeOnClickOutside': false
    });
    // let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
    let dataToSend = {
        'ap1': ctrlData.validClient.client.ap1_cli,
        'ap2': ctrlData.validClient.client.ap2_cli,
        'cod_cli': ctrlData.validClient.client.cod_cli,
        'ced_cod': '',
        'direccion': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')',
        'email': ctrlData.validClient.client.e_mail,
        'firma': 'si',
        'nom1': ctrlData.validClient.client.nom1_cli,
        'nom2': ctrlData.validClient.client.nom2_cli,
        'telefono': ((ctrlData.validClient.client.fax_cli)? ctrlData.validClient.client.fax_cli: ctrlData.validClient.client.telefono),
        'plantilla1': '003',
        'plantilla2': '004',
        'plantilla3': '002',
        'vba1': ctrlData.pdfModal.pdfAutorizacion,
        'vba2': ctrlData.pdfModal.pdfContrato,
        'vba3': ctrlData.pdfModal.pdfPagare
    };
    reqJSON({
        'path': './enviarFirma',
        'data': dataToSend,
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        $('#modalPdfIdFirma').html(response.data[0][0].id);
        reqJSON({
            'path': './firmarPdf',
            'data': {
                'id': response.data[0][0].id,
                'forceReturn': true
            },
            'type': 'POST'
        }, function(err, responseSignPdf) {
            iCtrl.isSigned(response.data[0][0].id);
        });
    });
}

iCtrl.isSignedRecursive = function(idSigned) {
    signInterval = setTimeout(function() {
        reqJSON({
            'path': './consultarFirma',
            'data': {
                'id': idSigned
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            $('#modalPdfIdFirma').html(response.data[0][0].id_biofirma);
            if(''+response.data[0][0].estado == '1') {
                if(signInterval) {
                    if(response.data[0][0].archivo_firmado1) {
                        $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado1);
                        $('#pdfContrato').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado2);
                        $('#pdfPagare').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado3);
                    }

                    iCtrl.saveSign(idSigned, function() {
                        swal.close();
                        $('#btnSign').hide();
                        $('#btnSignEnd').show();

                        swal({
                            'title': '¡Factura Generada!',
                            'icon': 'info',
                            'buttons': {
                                'confirm': 'Aceptar'
                            },
                            'closeOnClickOutside': false
                        }).then((value) => {
                            if(value) {
                                printInvoice(ctrlData.idInvoice);
                                $('#pdfsModal').modal('hide');
                                $('#btnSign').show();
                                iCtrl.getInvoicesWithoutSign();
                                iCtrl.getTotalInvoicesWithoutSign();
                            }
                        });
                    });
                }
            }else if(''+response.data[0][0].estado == '2') {
                swal.close();
                swal({
                    title: 'Firma Cancelada',
                    icon: 'warning',
                    dangerMode: true
                }).then((value) => {});
            }else if(''+response.data[0][0].estado == '3') {
                swal.close();
                swal({
                    title: 'Intente nuevamente',
                    icon: 'warning',
                    dangerMode: true
                }).then((value) => {});
            }else {
                iCtrl.isSignedRecursive(idSigned);
            }
        });
    }, 7000);
}

/**
* @description iCtrl.isSigned espera a que se firmen los pdfs
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.isSigned = function(idSigned) {
    if(signInterval) {
        clearTimeout(signInterval);
    }
    iCtrl.isSignedRecursive(idSigned);
}
/**
* @description iCtrl.saveSign guarda el id de la firma luego de firmados
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.saveSign = function(idSigned, fn) {
    reqJSON({
        'path': './guardarFirma',
        'data': {
            'id_firma': idSigned,
            'factura': ctrlData.idInvoice
        },
        'type': 'POST'
    }, function(err, response) {
        fn();
    });
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.resetPdfModal = function(input, flagWithoutSign) {
    $('#modalPdfCedula').html('');
    $('#modalPdfNombre').html('');
    $('#modalPdfApellido').html('');
    $('#modalPdfCorreo').html('');
    $('#modalPdfTelefono').html('');
    $('#modalPdfDireccion').html('');
    $('#modalPdfIdFirma').html('');
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
var countTotalPdfs = 0;
iCtrl.openPdfModal = function(input, flagWithoutSign) {
    iCtrl.resetPdfModal();
    ctrlData.validClient.client = {}

    let elSign = $(input);
    if(elSign.length) {
        let elReg = elSign[0].dataset.reg;
        let filterRow = ctrlData.pdfsWithoutSign.filter(function(a) {
            return (''+a.reg == ''+elReg)? true: false;
        })[0];
        if(filterRow) {
            let haveCodeudor = (filterRow.codeudor !== 'NO')? filterRow.ced_codedudor: null;
            togglePreloader(true);
            iCtrl.getCodeudor(haveCodeudor, function(record) {
                ctrlData.idInvoice = filterRow.num_doc.replace(/(\s)/g, '');
                ctrlData.validClient.client = {
                    'ap1_cli': filterRow.ap1_cli,
                    'ap2_cli': filterRow.ap2_cli,
                    'celular': filterRow.fax_cli,
                    'cod_cli': ((filterRow.cliente)? filterRow.cliente.replace(/(\s)/g, ''): ''),
                    'direccion': filterRow.direccion,
                    'e_mail': filterRow.e_mail,
                    'fax_cli': filterRow.fax_cli,
                    'nom1_cli': filterRow.nom1_cli,
                    'nom2_cli': filterRow.nom2_cli,
                    'nom_cli': filterRow.nom_cli,
                    'nom_dep': filterRow.nom_dep,
                    'nom_ciu': filterRow.nom_ciu,
                    'result': true,
                    'te1_cli': ((filterRow.telefono)? filterRow.telefono: ''),
                    'telefono': ((filterRow.telefono)? filterRow.telefono: '')
                }
                ctrlData.validClient.codeudor = (record)? record: null;

                countTotalPdfs = 0;
                togglePreloader(true);

                iCtrl.getAuthorizationOfCentralReports(ctrlData.idInvoice);
                iCtrl.getBondAgreement(ctrlData.idInvoice);
                iCtrl.getPayForSale(ctrlData.idInvoice);

                $('#modalPdfCedula').html(ctrlData.validClient.client.cod_cli);
                $('#modalPdfNombre').html(ctrlData.validClient.client.nom1_cli+' '+ctrlData.validClient.client.nom2_cli);
                $('#modalPdfApellido').html(ctrlData.validClient.client.ap1_cli+' '+ctrlData.validClient.client.ap2_cli);
                $('#modalPdfCorreo').html(ctrlData.validClient.client.e_mail);
                $('#modalPdfTelefono').html(((ctrlData.validClient.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.client.te1_cli: ctrlData.validClient.client.fax_cli));
                $('#modalPdfDireccion').html(ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')');
                $('#modalPdfIdFirma').html('');
                $('#pdfsModal').modal({'show': true});

                if(ctrlData.validClient.codeudor) {
                    $('#modalPdfCoCedula').html(ctrlData.validClient.codeudor.cod_cli);
                    $('#modalPdfCoNombre').html(ctrlData.validClient.codeudor.nom1_cli+' '+ctrlData.validClient.codeudor.nom2_cli);
                    $('#modalPdfCoApellido').html(ctrlData.validClient.codeudor.ap1_cli+' '+ctrlData.validClient.codeudor.ap2_cli);
                    $('#modalPdfCoCorreo').html(ctrlData.validClient.codeudor.e_mail);
                    $('#modalPdfCoTelefono').html(((ctrlData.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.te1_cli: ctrlData.validClient.codeudor.fax_cli));
                    $('#modalPdfCoDireccion').html(ctrlData.validClient.codeudor.direccion+'('+ctrlData.validClient.codeudor.nom_ciu+', '+ctrlData.validClient.codeudor.nom_dep+')');
                    $('#codeudor').show();
                }else {
                    $('#codeudor').hide();
                }

                setTimeout(function() {
                    togglePreloader(false);
                },300);
            });
        }
    }
}

/**
* @description iCtrl.getCodeudor obtiene los datos del codeudor
* @return {void}
*/
iCtrl.getCodeudor = function(input, fn) {
    let result = null;
    if(!input) {
        fn(result);
        return;
    }
    reqJSON({
        'path': './validarCliente',
        'data': {
            'cliente': input,
            'fullRes': false
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response.client.result) {
            result = response.client;
        }
        fn(result);
    });
}

iCtrl.getAuthorizationOfCentralReports = function(idInvoice) {
    reqJSON({
        'path': './pdfSolicitud',
        'data': {
            'metodo': 'AUTORIZACION_REPORTE_CENTRALES',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')',
                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.nom1_cli+' '+ctrlData.validClient.codeudor.nom2_cli+' '+ctrlData.validClient.codeudor.ap1_cli+' '+ctrlData.validClient.codeudor.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.te1_cli: ctrlData.validClient.codeudor.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.direccion+'('+ctrlData.validClient.codeudor.nom_ciu+', '+ctrlData.validClient.codeudor.nom_dep+')': ' '),
                'num_factura': idInvoice,
                'validacion_huella': 'NO'
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.pdfModal['pdfAutorizacion'] = response.data;
        $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data);

        countTotalPdfs++;
        if(countTotalPdfs == 3) {
            $('#pdfsWithoutSignModal').modal('hide');
            $('#pdfsModal').modal({'show': true});
            togglePreloader(false);
        }
    });
}
iCtrl.getBondAgreement = function(idInvoice) {
    reqJSON({
        'path': './pdfSolicitud',
        'data': {
            'metodo': 'CONTRATO_DE_FIANZA',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')',
                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.nom1_cli+' '+ctrlData.validClient.codeudor.nom2_cli+' '+ctrlData.validClient.codeudor.ap1_cli+' '+ctrlData.validClient.codeudor.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.te1_cli: ctrlData.validClient.codeudor.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.direccion+'('+ctrlData.validClient.codeudor.nom_ciu+', '+ctrlData.validClient.codeudor.nom_dep+')': ' '),
                'num_factura': idInvoice,
                'validacion_huella': 'NO'
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.pdfModal['pdfContrato'] = response.data;
        $('#pdfContrato').prop('src', 'data:application/pdf;base64,'+response.data);
        countTotalPdfs++;
        if(countTotalPdfs == 3) {
            $('#pdfsWithoutSignModal').modal('hide');
            $('#pdfsModal').modal({'show': true});
            togglePreloader(false);
        }
    });
}
iCtrl.getPayForSale = function(idInvoice) {
    reqJSON({
        'path': './pdfSolicitud',
        'data': {
            'metodo': 'PAGARE_DE_VENTA',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')',
                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.nom1_cli+' '+ctrlData.validClient.codeudor.nom2_cli+' '+ctrlData.validClient.codeudor.ap1_cli+' '+ctrlData.validClient.codeudor.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.te1_cli: ctrlData.validClient.codeudor.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.direccion+'('+ctrlData.validClient.codeudor.nom_ciu+', '+ctrlData.validClient.codeudor.nom_dep+')': ' '),
                'num_factura': idInvoice,
                'validacion_huella': 'NO'
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.pdfModal['pdfPagare'] = response.data;
        $('#pdfPagare').prop('src', 'data:application/pdf;base64,'+response.data);
        countTotalPdfs++;
        if(countTotalPdfs == 3) {
            $('#pdfsWithoutSignModal').modal('hide');
            $('#pdfsModal').modal({'show': true});
            togglePreloader(false);
        }
    });
}
/**
* @description iCtrl.printTablePdfsWithoutSign Inicializa la tabla de pdfs sin
* firmar
* @return {void}
*/
iCtrl.printTablePdfsWithoutSign = function() {
    let rowsToAdd = [];

    for (let item of ctrlData.invoicesWithoutSign.data[0]) {
        rowsToAdd.push({
            'reg': item.reg,
            'cedula': item.cliente,
            'nombre': item.nom_cli,
            'fecha': item.fecha_fac,
            'factura': item.num_doc,
            'codeudor': item.codeudor,
            'firmar': '<i class="material-icons pointer text-danger" data-reg="'+item.reg+'" onclick="iCtrl.openPdfModal(this, true)">edit</i>'
        });
    }
    ctrlData.pdfsWithoutSign = ctrlData.invoicesWithoutSign.data[0];
    iCtrl.tablePdfsWithoutSign.clear();
    iCtrl.tablePdfsWithoutSign.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.newDataTablePdfsWithoutSign Inicializa la tabla de pdfs sin
* firmar
* @return {void}
*/
iCtrl.newDataTablePdfsWithoutSign = function() {
    $('#datatablesPdfsWithoutSign').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': true,
        "order": [],
        'columns': [
            { 'data': 'reg' },
            { 'data': 'cedula' },
            { 'data': 'nombre' },
            { 'data': 'fecha' },
            { 'data': 'factura' },
            { 'data': 'codeudor' },
            { 'data': 'firmar' }
        ]
    });
    iCtrl.tablePdfsWithoutSign = $('#datatablesPdfsWithoutSign').DataTable();
}

$(document).ready(function() {
    iCtrl.newDataTablePdfsWithoutSign();
    iCtrl.printTablePdfsWithoutSign();
});
