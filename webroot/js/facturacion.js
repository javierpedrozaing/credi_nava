var version = '1.8';
var iCtrl = iCtrl || {};
var signInterval = null;
var idFingerPrint
var codeudorFingerCheck = false
/**
* @description definicion de variables
*/
ctrlData.lastRowTableSimulator = {
    'ammount': null,
    'typeCredit': null,
    'client': null,
    'seller': null,
    'paymentOption': null
};
ctrlData.saveFianza = false;
ctrlData.isSelectedTableCuotas = false;
ctrlData.valorPagado = 0;
ctrlData.validClient = {};
ctrlData.pdfModal = {};
ctrlData.idInvoice = null;
ctrlData.idPayment = null;
ctrlData.pdfsWithoutSign = [];
ctrlData.idSigned = null;
ctrlData.isValidFinger = false;
ctrlData.isValidFingerCodeudor = false;
ctrlData.dermatitisFinger = false;
ctrlData.fingers = [
    null,
    {
        'id': '1',
        'description': 'pulgar derecho'
    },
    {
        'id': '2',
        'description': 'indice derecho'
    },
    {
        'id': '3',
        'description': 'medio derecho'
    },
    {
        'id': '4',
        'description': 'anular derecho'
    },
    {
        'id': '5',
        'description': 'meñique derecho'
    },
    {
        'id': '6',
        'description': 'pulgar izquierdo'
    },
    {
        'id': '7',
        'description': 'indice izquierdo'
    },
    {
        'id': '8',
        'description': 'medio izquierdo'
    },
    {
        'id': '9',
        'description': 'anular izquierdo'
    },
    {
        'id': '10',
        'description': 'meñique izquierdo'
    }
]
iCtrl.timeoutSearchClients = null;
// iCtrl.tableSimulatorRows



iCtrl.controlsKeys = function() {
    $('body').on('keyup', function(evt) {
        if(evt.which == 113 || evt.which == 115 || evt.which == 118) {
            switch (evt.which) {
                case 113:
                iCtrl.resetSimulator();
                break;
                case 115:
                $('#formSimulator').submit();
                break;
                case 118:
                iCtrl.recordInvoice();
                break;
            }
        }
    });
}
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
        let strSearch = getValInput('#formSimulator input[name="client"]');
        reqJSON({
            'path': urlWS+'/buscarCliente',
            'data': {
                'empresa': ctrlData.usuario.empresa,
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
    $('#fClient').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#fClient').val(ui.item.value);
            iCtrl.validClient();
            return false;
        },
        'focus': function(event, ui) {
            $("#fClient").val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    if($('#formSimulator input[name="client"]').is(':focus')) {
        $('#fClient').focus();
    }
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
var countTotalPdfs = 0;
iCtrl.openPdfModal = function(input, flagWithoutSign) {
    if(input && flagWithoutSign) {
        iCtrl.resetSimulator();
        ctrlData.validClient.client = {}
        ctrlData.validClient.questions = [];

        let elSign = $(input);
        if(elSign.length) {
            let elReg = elSign[0].dataset.reg;
            let filterRow = ctrlData.pdfsWithoutSign.filter(function(a) {
                return (''+a.reg == ''+elReg)? true: false;
            })[0];
            if(filterRow) {
                ctrlData.idInvoice = filterRow.num_doc;
                ctrlData.validClient.client = {
                    'ap1_cli': filterRow.ap1_cli,
                    'ap2_cli': filterRow.ap2_cli,
                    'celular': filterRow.fax_cli,
                    'cod_cli': filterRow.cliente,
                    'direccion': filterRow.direccion,
                    'e_mail': filterRow.e_mail,
                    'fax_cli': filterRow.fax_cli,
                    'nom1_cli': filterRow.nom1_cli,
                    'nom2_cli': filterRow.nom2_cli,
                    'nom_cli': filterRow.nom_cli,
                    'nom_dep': filterRow.nom_dep,
                    'nom_ciu': filterRow.nom_ciu,
                    'result': true,
                    'te1_cli': filterRow.telefono,
                    'telefono': filterRow.telefono
                }

                if(!ctrlData.usuario.ind_auto_firma) {
                    iCtrl.resetSimulator();
                    printInvoice(ctrlData.idInvoice);
                    if(ctrlData.idPayment) {
                        printPayment(ctrlData.idPayment);
                    }
                    $('#pdfsModal').modal('hide');
                    return false;
                }

                countTotalPdfs = 0;
                togglePreloader(true);
                iCtrl.getAuthorizationOfCentralReports(ctrlData.idInvoice);
                iCtrl.getBondAgreement(ctrlData.idInvoice);
                iCtrl.getPayForSale(ctrlData.idInvoice);

                $('#btnSign').show();
                $('#pdfsWithoutSignModal').modal('hide');
            }
        }
    }

    $('#modalPdfCedula').html(ctrlData.validClient.client.cod_cli);
    $('#modalPdfNombre').html(ctrlData.validClient.client.nom1_cli+' '+ctrlData.validClient.client.nom2_cli);
    $('#modalPdfApellido').html(ctrlData.validClient.client.ap1_cli+' '+ctrlData.validClient.client.ap2_cli);
    $('#modalPdfCorreo').html(ctrlData.validClient.client.e_mail);
    $('#modalPdfTelefono').html(((ctrlData.validClient.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.client.te1_cli: ctrlData.validClient.client.fax_cli));
    $('#modalPdfDireccion').html(ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+', '+ctrlData.validClient.client.nom_dep+')');
    $('#modalPdfIdFirma').html('');
//aqio
    if(ctrlData.validClient.codeudor) {
        $('#modalPdfCoCedula').html(ctrlData.validClient.codeudor.client.cod_cli);
        $('#modalPdfCoNombre').html(ctrlData.validClient.codeudor.client.nom1_cli+' '+ctrlData.validClient.codeudor.client.nom2_cli);
        $('#modalPdfCoApellido').html(ctrlData.validClient.codeudor.client.ap1_cli+' '+ctrlData.validClient.codeudor.client.ap2_cli);
        $('#modalPdfCoCorreo').html(ctrlData.validClient.codeudor.client.e_mail);
        $('#modalPdfCoTelefono').html(((ctrlData.validClient.codeudor.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.client.te1_cli: ctrlData.validClient.codeudor.client.fax_cli));
        $('#modalPdfCoDireccion').html(ctrlData.validClient.codeudor.client.direccion+'('+ctrlData.validClient.codeudor.client.nom_ciu+', '+ctrlData.validClient.codeudor.client.nom_dep+')');
    }
}

iCtrl.getAuthorizationOfCentralReports = function(idInvoice) {
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'AUTORIZACION_REPORTE_CENTRALES',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',

                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.nom1_cli+' '+ctrlData.validClient.codeudor.client.nom2_cli+' '+ctrlData.validClient.codeudor.client.ap1_cli+' '+ctrlData.validClient.codeudor.client.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.client.te1_cli: ctrlData.validClient.codeudor.client.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.direccion+'('+ctrlData.validClient.codeudor.client.nom_ciu+', '+ctrlData.validClient.codeudor.client.nom_dep+')': ' '),
                
                
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
        }
    }, true);
}
iCtrl.getBondAgreement = function(idInvoice) {
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'CONTRATO_DE_FIANZA',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',
               
                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.nom1_cli+' '+ctrlData.validClient.codeudor.client.nom2_cli+' '+ctrlData.validClient.codeudor.client.ap1_cli+' '+ctrlData.validClient.codeudor.client.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.client.te1_cli: ctrlData.validClient.codeudor.client.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.direccion+'('+ctrlData.validClient.codeudor.client.nom_ciu+', '+ctrlData.validClient.codeudor.client.nom_dep+')': ' '),
                
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
        }
    }, true);
}
iCtrl.getPayForSale = function(idInvoice) {
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'PAGARE_DE_VENTA',
            'row': {
                'nit_cliente': ctrlData.validClient.client.cod_cli,
                'nombre_cliente': ctrlData.validClient.client.nom_cli,
                'celular_cliente': ctrlData.validClient.client.fax_cli,
                'email_cliente': ctrlData.validClient.client.e_mail,
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',
               
                'nit_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.cod_cli: ' '),
                'nombre_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.nom1_cli+' '+ctrlData.validClient.codeudor.client.nom2_cli+' '+ctrlData.validClient.codeudor.client.ap1_cli+' '+ctrlData.validClient.codeudor.client.ap2_cli: ' '),
                'celular_codeudor': ((ctrlData.validClient.codeudor)? ((ctrlData.validClient.codeudor.client.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.client.te1_cli: ctrlData.validClient.codeudor.client.fax_cli):' '),
                'email_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.e_mail: ' '),
                'residencia_codeudor': ((ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.direccion+'('+ctrlData.validClient.codeudor.client.nom_ciu+', '+ctrlData.validClient.codeudor.client.nom_dep+')': ' '),

               
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
        }
    }, true);
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
            'confirm': 'Cancelar'
        },
        'closeOnClickOutside': false,
        'closeOnEsc': false
    }).then((value) => {
        if(value) {
            if(signInterval) {
                clearTimeout(signInterval);
            }
            if(ctrlData.idSigned) {
                iCtrl.removeSign(ctrlData.idSigned);
                ctrlData.idSigned = null;
            }
        }
    });

    ctrlData.idSigned = null;

    // let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
    let dataToSend = {
        'ap1': ctrlData.validClient.client.ap1_cli,
        'ap2': ctrlData.validClient.client.ap2_cli,
        'ced_cod': (ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.cod_cli: '',
        'cod_cli': ctrlData.validClient.client.cod_cli,
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
        'vba3': ctrlData.pdfModal.pdfPagare,
        'StrUsuario': ctrlData.usuario.nom_usu
    };
    reqJSON({
        'path': urlWS+'/enviarFirma',
        'data': dataToSend,
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.idSigned = response.data[0][0].id;
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
    }, true);
}

iCtrl.isSignedRecursive = function(idSigned) {
    signInterval = setTimeout(function() {
        reqJSON({
            'path': urlWS+'/consultarFirma',
            'data': {
                'id': idSigned
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }

            if(response) {
                if(response.data) {
                    if(response.data[0].length) {
                        if(response.data[0][0]) {
                            $('#modalPdfIdFirma').html(response.data[0][0].id_biofirma);
                            if(''+response.data[0][0].estado == '1') {
                                if(signInterval) {
                                    if(response.data[0][0].archivo_firmado1) {
                                        $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado1);
                                        $('#pdfContrato').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado2);
                                        $('#pdfPagare').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado3);
                                    }

                                    if(ctrlData.idSigned) {
                                        iCtrl.saveSign(idSigned, function() {
                                            swal.close();
                                            $('#btnSign').hide();
                                            $('#btnSignEnd').show();

                                            setTimeout(() => {
                                                swal({
                                                    'title': (ctrlData.usuario.externo) ? '¡Obligación generada correctamente!' : 'Obligación Generada!',
                                                    'text': (ctrlData.usuario.externo) ? 'La obligación se ha generado con el número '+ctrlData.usuario.factura_generada : '',
                                                    'buttons': {
                                                        'cancel': false,
                                                        'confirm': 'Aceptar'
                                                    },
                                                    'closeOnClickOutside': false
                                                }).then((value) => {
                                                    if(value) {
                                                        printInvoice(ctrlData.idInvoice, true);
                                                    }else {
                                                        $('#pdfsModal').modal('hide');
                                                        iCtrl.resetSimulator();
                                                    }

                                                    if(ctrlData.idPayment) {
                                                        setTimeout(function() {
                                                            swal({
                                                                'title': '¡Imprimir Recibo!',
                                                                'icon': 'info',
                                                                'buttons': {
                                                                    'cancel': false,
                                                                    'confirm': 'Aceptar'
                                                                },
                                                                'closeOnClickOutside': false
                                                            }).then((value) => {
                                                                if(value) {
                                                                    printPayment(ctrlData.idPayment, true);
                                                                }

                                                                setTimeout(function() {
                                                                    $('#pdfsModal').modal('hide');
                                                                    iCtrl.resetSimulator();
                                                                }, 0);
                                                            });
                                                        }, 0);
                                                    }else {
                                                        $('#pdfsModal').modal('hide');
                                                        iCtrl.resetSimulator();
                                                    }
                                                });
                                            }, 0);
                                        });
                                    }
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
                        }else {
                            iCtrl.isSignedRecursive(idSigned);
                        }
                    }else {
                        iCtrl.isSignedRecursive(idSigned);
                    }
                }else {
                    iCtrl.isSignedRecursive(idSigned);
                }
            }else {
                iCtrl.isSignedRecursive(idSigned);
            }
        }, true);
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
* @description iCtrl.removeSign elimina el id de la firma antes de firmados
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.removeSign = function(idSigned) {
    reqJSON({
        'path': urlWS+'/eliminarFirma',
        'data': {
            'id': idSigned
        },
        'type': 'POST'
    }, function(err, response) { }, true);
}
/**
* @description iCtrl.saveSign guarda el id de la firma luego de firmados
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.saveSign = function(idSigned, fn) {
    reqJSON({
        'path': urlWS+'/guardarFirma',
        'data': {
            'caja': ctrlData.usuario.caja,
            'empresa': ctrlData.usuario.empresa,
            'id_firma': idSigned,
            'factura': ctrlData.idInvoice
        },
        'type': 'POST'
    }, function(err, response) {
        fn();
    }, true);
}

/**
* @description iCtrl.onFinger
* @param {string}
* @return {void}
*/
iCtrl.onFinger = function(indFinger) {
    if(ctrlData.validClient.fingers) {
        // let filterFinger = ctrlData.validClient.fingers.filter(function(a) {
        //     return (parseInt(a.dedo) == parseInt(indFinger))? true: false;
        // })[0];
        // if(filterFinger) {
        //     $('#hands .finger').removeClass('finger-selected');
        //     setTimeout(function() {
        //         $('#hands #finger'+indFinger).addClass('finger-selected');
        //     }, 0);
        // }
    }
}

iCtrl.checkFingerprint = function() {


    let codCli = ctrlData.validClient.client.cod_cli;

    if(codeudorFingerCheck){
        codCli = ctrlData.validClient.codeudor.client.cod_cli;
    }


   
    let dataFingers = [];
    dataFingers.push({
        'nit': codCli,
        'dedo': 0,
        'tipo': 3
    });
    // $('.finger.finger-selected').each(function(elInd, el) {
    //     dataFingers.push({
    //         'nit': codCli,
    //         'dedo': el.dataset.finger,
    //         'tipo': 2
    //     })
    // });

    if(!dataFingers.length) {
        swal({
            'title': 'Verificación de huella',
            'text': 'Debe seleccionar el dedo que desea verificar.',
            'icon': 'warning',
            'dangerMode': true
        }).then((value) => {});
        return;
    }

    iCtrl.rcCheckFingerprint(dataFingers, 0, function(finish) {
        ctrlData.isValidFinger = true;
        $('#fingerprintModal').modal('hide');
        swal.close();

        if(!finish) { return; }
        setTimeout(function() {
            $('#textSeller').focus();
        }, 0);



        //si validar huella de cliente esta activa no ouedo entrar aqui queda en dos if para mas claro
        if(!codeudorFingerCheck){
            if(ctrlData.validClient.codeudor){
                iCtrl.checkFingersCodeudor()
            }
        }   
      


        console.log("Finish...");
    });
}





iCtrl.closeFingerprintModal = function() {
    if(!ctrlData.validClient.fingers.length || !ctrlData.usuario.valid_huella) {
        $('#fingerprintModal').modal('hide');
        return false;
    }
    swal({
        'title': 'Cliente con Huellas',
        'text': 'Para continuar el cliente debe verificar la huella.',
        'icon': 'warning',
        'buttons': {
            'cancel': 'Continuar',
            'confirm': 'Salir'
        },
        'closeOnClickOutside': false
    }).then((value) => {
        if(value) {
            togglePreloader(true);
            window.location.reload();
        }
    });
}

iCtrl.rcCheckFingerprint = function(dataFingers, indDataFingers, fn) {
    if(dataFingers.length == indDataFingers) {
        swal.close();
        fn(true);
        return;
    }

    let elPreloader = document.createElement("img");
    elPreloader.setAttribute("src", "./img/preloader.gif");
    let nameFinger = ctrlData.fingers[parseInt(dataFingers[indDataFingers].dedo)];
    let titleCheckFinger = (ctrlData.usuario.externo) ? 'Validación de huella en proceso' : 'Verificando huella del dedo '+((nameFinger)? nameFinger.description: '');
    let textCheckFinger = (ctrlData.usuario.externo) ? 'Por favor, valida la huella desde el agente de Credimarcas o desde el aplicativo móvil' : '';
    swal({
        'title': titleCheckFinger,
        'content': elPreloader,
        'text': textCheckFinger,
        'buttons': {
            'cancel': false,
        },
        'closeOnClickOutside': false,
        'closeOnEsc': false
    }).then((value) => {
        if(value == 'resend') {
            // #code
        }
    });

    reqJSON({
        'path': './huellaRegistroEstado',
        'data': dataFingers[indDataFingers],
        'type': 'POST'
    }, function(err, response) {
        if(err) { fn(false); return }
        
        //registor huella global si esta validando huella del cliente
        if(!codeudorFingerCheck){
            //registro la huella global
            console.log(response.data[0][0].id)
            idFingerPrint = response.data[0][0].id
        }
      

        iCtrl.isCheckFingerprint(response.data[0][0].id, function(dataRegister) {
            if(!dataRegister) { fn(false); return }
            $('#hands #finger'+dataFingers[indDataFingers].dedo).removeClass('finger-selected');
            $('#hands #finger'+dataFingers[indDataFingers].dedo).addClass('finger-exist');

            indDataFingers++;
            iCtrl.rcCheckFingerprint(dataFingers, indDataFingers, fn);
        });
    });
}

var checkFingerprintInterval = null;
iCtrl.isCheckFingerprint = function(idRegister, fn) {
    if(checkFingerprintInterval) {
        clearTimeout(checkFingerprintInterval);
    }

    checkFingerprintInterval = setTimeout(function() {
        reqJSON({
            'path': urlWS+'/huellaValidaEstado',
            'data': {
                'id': idRegister
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { fn(false); return }
            if(response.data[0][0].estado == 2) {

                //si esta validacion es del codeudor
                if(codeudorFingerCheck){
                    ctrlData.isValidFingerCodeudor = true

                    $('#fingerprintModal').modal('hide');
                    swal.close();


                    return
                }

                // ctrlDataSeer.historyClient.fp.push(response.data[0][0]);
                fn(response);
                return;
            }else if(response.data[0][0].estado == 3) {
                ctrlData.isValidFinger = false;
                swal({
                    'title': 'Verifición cancelada',
                    'text': 'La verificación de la huella se ha cancelado',
                    'icon': 'warning',
                    'buttons': {
                        'cancel': 'Continuar',
                        'confirm': 'Salir'
                    },
                    'closeOnClickOutside': false
                }).then((value) => {
                    if(value) {
                        togglePreloader(true);
                        window.location.reload();
                    }
                });// fn(false);
                return;
            }
            iCtrl.isCheckFingerprint(idRegister, fn);
        }, true);
    }, 3000);
}

//validacion de huella doble
iCtrl.beforeRecordInvoice = function() {
    //si tiene dermatitis no valido nada
    if(ctrlData.dermatitisFinger){
        iCtrl.recordInvoice()
    }
    
    if(ctrlData.usuario.valid_huella && ctrlData.validClient.fingers.length){
        reqJSON({
            'path': urlWS+'/validaHuellaFactura',
            'data': {
                'tipo': 1,
                'factura': 0,
                'id':idFingerPrint,
            },
            'type': 'POST'
        }, function(err, response) {
            try {
                if(response.data[0][0].factura.trim() == 0){  
                    iCtrl.recordInvoice()     
                }else{
                    swal({
                        title: "¡Error en la huella!",
                        text: "Favor volver a validar huella",
                        icon: "warning",
                        dangerMode: true
                    })
                }
            } catch (error) {
                console.log(err)
            }
        }, true)
    }else{
        iCtrl.recordInvoice()
    }
    
    if (ctrlData.usuario.externo) {
        $('#guia_pago3').hide();
    }
}
//despues de guardar la factura actualizamos la huella con el id de la factura
iCtrl.afterRecordInvoice = function(invoiceId) {

    reqJSON({
        'path': urlWS+'/validaHuellaFactura',
        'data': {
            'tipo': 2,
            'factura': invoiceId,
            'id':idFingerPrint,
        },
        'type': 'POST'
    }, function(err, response) {}, true)


}

//1152199680
//con huella 1214727071
iCtrl.recordInvoice = function() {
 
    if(!ctrlData.lastRowTableSimulator.paymentOption) {
        swal({
            title: "¡No ha seleccionado una opción de financiación!",
            icon: "warning",
            dangerMode: true
        });
        return false;
    }
    if(parseFloat(ctrlData.lastRowTableSimulator.paymentOption.ValorTotal) > parseFloat(ctrlData.validClient.client.cup_cli) && parseInt(ctrlData.usuario.ind_liq_cupo) == 1) {
        swal({
            title: "¡Excedio el cupo disponible!",
            text: "El valor de la factura es mayor que el cupo \ndisponible de "+numeral(ctrlData.validClient.client.cup_cli).format('$0,0'),
            icon: "warning",
            dangerMode: true
        });
        return false;
    }

    togglePreloader(true);

    setTimeout(() => {
        reqJSON({
            'path': urlWS+'/webFactura',
            'data': {
                'caja': ctrlData.usuario.caja,
                'empresa': ctrlData.usuario.empresa,
                'nom_usu': ctrlData.usuario.nom_usu,
                'ced_cod': (ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.client.cod_cli: '',
                'cod_cli': ctrlData.validClient.client.cod_cli,
                'cod_ven': ctrlData.lastRowTableSimulator.seller,
                'valor': ctrlData.lastRowTableSimulator.ammount,
                'tipo': ctrlData.lastRowTableSimulator.paymentOption.cod_tip,
                'cuotas': ctrlData.lastRowTableSimulator.paymentOption.cuotas,
                'dias': ctrlData.lastRowTableSimulator.typeCreditDays,
                'con_huella': ((ctrlData.isValidFinger)? 1: 0),
                'num_pagare': getValInput('input[name="num_pagare"]'),
                'con_aval': ((ctrlData.saveFianza) ? 1 : 0),
                'fianpag': ctrlData.valorPagado,
                'id_transaccion': ((ctrlData.usuario.externo_id_transaccion) ?  ctrlData.usuario.externo_id_transaccion : 0)
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            ctrlData.idInvoice = response.data[0][0].factura;
            ctrlData.idPayment = ((response.data[1])? response.data[1][0].recibo: null);


            //guardo 
            if(ctrlData.usuario.valid_huella && ctrlData.validClient.fingers.length){
                iCtrl.afterRecordInvoice(ctrlData.idInvoice)
            }
            

            togglePreloader(false);

            setTimeout(() => {

                if (ctrlData.usuario.externo) {
                    ctrlData.usuario.factura_generada = response.data[0][0].factura;
                    countTotalPdfs = 0;
                    togglePreloader(true);

                    iCtrl.getAuthorizationOfCentralReports(response.data[0][0].factura);
                    iCtrl.getBondAgreement(response.data[0][0].factura);
                    iCtrl.getPayForSale(response.data[0][0].factura);
                    iCtrl.openPdfModal(response.data[0][0].factura);
                } else {
                    swal({
                        'title': '¡Obligación generada correctamente!',
                        'text': 'La obligación se ha generado con el número '+response.data[0][0].factura,
                        'buttons': {
                            'cancel': false,
                            'confirm': 'Aceptar'
                        },
                        'icon': 'success'
                    }).then((value) => {
                        countTotalPdfs = 0;
                        togglePreloader(true);

                        if(!ctrlData.usuario.ind_auto_firma) {
                            printInvoice(response.data[0][0].factura);
                            if(ctrlData.idPayment) {
                                printPayment(ctrlData.idPayment);
                            }

                            $('#pdfsModal').modal('hide');
                            iCtrl.resetSimulator();
                            return false;
                        }

                        iCtrl.getAuthorizationOfCentralReports(response.data[0][0].factura);
                        iCtrl.getBondAgreement(response.data[0][0].factura);
                        iCtrl.getPayForSale(response.data[0][0].factura);

                        iCtrl.openPdfModal(response.data[0][0].factura);
                    });
                }

                return;
            }, 350);
        }, true);
    }, 350);
}
/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.onChangeTypeCredit = function() {
    $(document).on('change','select[name="typeCredit"]',function(evt) {
        if(!evt.target.value) {
            $(evt.target).addClass('empty');
            return;
        }
        $(evt.target).removeClass('empty');
        iCtrl.changeTypeCredit(evt);

        if (ctrlData.usuario.externo) {
            $('select[name=typeCredit]').css('border','');
            $('#guia_pago1').fadeOut();
            $('#guia_pago2').fadeIn();
        }

        if(ctrlData.validClient.client.result) {
            $('#formSimulator').submit();
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
    if(filterTypeCredit) {
        ctrlData.lastRowTableSimulator.typeCreditDays = filterTypeCredit.dias;
        $('#daysTypeCredit').html(filterTypeCredit.dias);
    }else {
        $('#daysTypeCredit').html('');
    }
}
iCtrl.validClient = function() {
    if(isNaN(getValInput('input[name="client"]'))) { return false; }

    $('input[name="name_client"]').val('')
    $('input[name="cupo"]').val('')
    
    $('input[name="text_seller"]').val('')
    $('input[name="text_seller"]').prop('disabled', true)

    $('input[name="ammount"]').val('')
    $('input[name="ammount"]').prop('disabled', true)



    ctrlData.lastRowTableSimulator.client = getValInput('input[name="client"]');
    iCtrl.resetCreditBox();
    togglePreloader(true);
    iCtrl.getValidClient({
        'cliente': ctrlData.lastRowTableSimulator.client,
        'fullRes': true
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.validClient = response;

        if(!ctrlData.validClient.client.result) {
            swal({
                title: "¡El cliente no existe!",
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        if(!ctrlData.validClient.validations.length) {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO",
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }

        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '00') {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO \nEl último resultado del cliente fue: NEGADO \nFecha aprobación: "+moment(ctrlData.validClient.validations[0]['FECHA'].replace('Z','')).format('DD-MM-YYYY'),
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '01') {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO \nEl último resultado del cliente fue: PENDIENTE \nFecha aprobación: "+moment(ctrlData.validClient.validations[0]['FECHA'].replace('Z','')).format('DD-MM-YYYY'),
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '02') {
            var dias_verificacion = (ctrlData.usuario.dias_verificacion) ? ctrlData.usuario.dias_verificacion : 15;
            if(ctrlData.validClient.validations[0]['DIAS'] > dias_verificacion) {
                swal({
                    title: "¡Actualizar datos del cliente!",
                    text: "Han pasado "+ctrlData.validClient.validations[0]['DIAS']+" día(s) desde la última aprobación \nFavor actualizar los datos del cliente y enviar al CALL CENTER",
                    icon: "warning",
                    dangerMode: true
                }).then((value) => {
                    iCtrl.resetSimulator();
                });
                return;
            }
        }
        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '03') {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO \nEl último resultado del cliente fue: APROBADO COMO CODEUDOR \nFecha aprobación: "+moment(ctrlData.validClient.validations[0]['FECHA'].replace('Z','')).format('DD-MM-YYYY'),
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '04') {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO \nEl último resultado del cliente fue: CAMPAÑAS \nFecha aprobación: "+moment(ctrlData.validClient.validations[0]['FECHA'].replace('Z','')).format('DD-MM-YYYY'),
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        if(ctrlData.validClient.validations[0]['RES_CLIENTE'] == '05') {
            swal({
                title: "¡Cliente no autorizado!",
                text: "Este cliente no está autorizado para ventas a CRÉDITO \nEl último resultado del cliente fue: VERIFICACIÓN CENTRALES \nFecha aprobación: "+moment(ctrlData.validClient.validations[0]['FECHA'].replace('Z','')).format('DD-MM-YYYY'),
                icon: "warning",
                dangerMode: true
            }).then((value) => {
                iCtrl.resetSimulator();
            });
            return;
        }
        // ctrlData.validClient.codeudor = [ctrlData.validClient.client];
        // ctrlData.validClient.codeudor[0].cedula = ctrlData.validClient.codeudor[0].cod_cli;
        $('#nameCodeudor input[name="name_codeudor"]').val('');

        $('#textSeller').prop('disabled', false)

        ctrlData.validClient.codeudor = (ctrlData.validClient.codeudor.length)? ctrlData.validClient.codeudor: null;
        if(ctrlData.validClient.codeudor) {
            if(ctrlData.validClient.codeudor[0].ind_next == 1) {
             
                iCtrl.getCodeudor(ctrlData.validClient.codeudor[0], function(record) {
                    ctrlData.validClient.codeudor = (record)? record: null;

                 

                    setTimeout(function() { togglePreloader(false) },100);
                    setTimeout(function() {
                        swal({
                            'title': 'Venta con Codeudor',
                            'text': ctrlData.validClient.codeudor.client.cod_cli+' '+ctrlData.validClient.codeudor.client.nom_cli,
                            'icon': 'info',
                            'buttons': {
                                'cancel': true,
                                'confirm': 'Aceptar'
                            }
                        }).then((value) => {
                            console.log(value)
                            if(value){
                                iCtrl.checkFingersClient()
                            }else{
                                window.location.reload();
                                return
                            }
                            $('#textSeller').focus();
                        });
                    },200);

                   

                    $('#nameCodeudor input[name="name_codeudor"]').val(ctrlData.validClient.codeudor.client.nom_cli);
                    $('#nameCodeudor').css({'display': 'flex'});
                });
            }else {
                iCtrl.checkFingersClient()
                ctrlData.validClient.codeudor = null;
                setTimeout(function() { togglePreloader(false) },100);
                $('#codeudor').hide();
                $('#nameCodeudor').hide();
            }
        }else {
            iCtrl.checkFingersClient()
            setTimeout(function() { togglePreloader(false) },100);
            $('#codeudor').hide();
            $('#nameCodeudor').hide();
        }

       
        // $('#cupo').html(numeral(ctrlData.validClient.client.cup_cli).format('$0,0'));
        $('input[name="name_client"]').val(ctrlData.validClient.client.nom_cli);
        $('input[name="cupo"]').val(numeral(ctrlData.validClient.client.cup_cli).format('$0,0'));

      
               
        // ctrlData.isValidFinger = (ctrlData.usuario.valid_huella)? ctrlData.isValidFinger: false;
        if(!ctrlData.isValidFinger && ctrlData.usuario.valid_huella && ctrlData.validClient.fingers.length) {
           
        }else {

            //bloqueo input hasta que seleccionen 
            $('input[name="ammount"]').prop('disabled', true)

            //setTimeout(() => { $('#textSeller').focus(); }, 300);
        }
    });
}


iCtrl.checkFingersClient = function(){

  

    $('#hands .finger').removeClass('finger-selected');
    $('#hands .finger').removeClass('finger-exist');
    $('#listFp').html('');
    ctrlData.isValidFinger = false;
    if(ctrlData.validClient.fingers) {
        
        $('#listFpRight').html('');
        $('#listFpLeft').html('');
        for (let item of ctrlData.validClient.fingers) {
            if(item.dedo == 99){
                ctrlData.dermatitisFinger = true
                continue
            }   
            $('#hands #finger'+item.dedo).addClass('finger-exist');
            if(item.dedo < 6) {
                $('#listFpRight').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
            }else {
                $('#listFpLeft').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
            }
        }

        $('#fingerprintModal #clientFp b').html(ctrlData.validClient.client.cod_cli+' - '+ctrlData.validClient.client.nom_cli);
    }

    //!ctrlData.isValidFinger && 
    if(ctrlData.usuario.valid_huella && ctrlData.validClient.fingers.length) {
        if( !ctrlData.dermatitisFinger ){
            $('#fingerprintModal').modal({'show': true});
        }else{
            
            
            
            if(ctrlData.validClient.codeudor){
                iCtrl.checkFingersCodeudor()
            }
        }
        
    }





}


iCtrl.checkFingersCodeudor = function(){
    
    //pongo esto en falso por que necesito validar huella
    isValidFingerCodeudor = false
    codeudorFingerCheck = true
    

    $('#hands .finger').removeClass('finger-selected');
    $('#hands .finger').removeClass('finger-exist');
    $('#listFp').html('');
    ctrlData.isValidFingerCodeudor = false;
    console.log( ctrlData.validClient.codeudor)
    if(ctrlData.validClient.codeudor.fingers) {
        $('#listFpRight').html('');
        $('#listFpLeft').html('');
    
        for (let item of ctrlData.validClient.codeudor.fingers) {
          
            $('#hands #finger'+item.dedo).addClass('finger-exist');
            if(item.dedo < 6) {
                $('#listFpRight').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
            }else {
                $('#listFpLeft').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
            }
        }

        $('#fingerprintModal #clientFp b').html(ctrlData.validClient.codeudor.client.cod_cli+' - '+ctrlData.validClient.codeudor.client.nom_cli);




        setTimeout(function() {
            $('#fingerprintModal').modal({'show': true});
        }, 500);
       
    }




}


/**
* @description iCtrl.getCodeudor obtiene los datos del codeudor
* @return {void}
*/
iCtrl.getCodeudor = function(input, fn) {
    iCtrl.getValidClient({
        'cliente': input.Cedula,
        'fullRes': true
    }, function(err, response) {
        if(err) { console.error(err) }
        let result = null;
        console.log(response)
        if(response) {
            result = response
        }
        fn(result);
    });
}
/**
* @description iCtrl.getValidClient de validar cliente
* @return {void}
*/
iCtrl.getValidClient = function(params, fn) {
    reqJSON({
        'path': urlWS+'/validaCliente',
        'data': {
            'StrEmpresa': ctrlData.usuario.empresa,
            'StrCaja': ctrlData.usuario.caja,
            'cod_cli': params.cliente
        },
        'type': 'POST'
    }, function(err, dataset) {
        let result = {
            'client': {'result': false},
            'questions': [],
            'validations': [],
            'codeudor': [],
            'fingers': []
        }
        if(err) { fn(err, {}); return }
        if(dataset.data[0].length) {
            if(dataset.data[0][0].result == 'YA EXISTE') {
                result.client.result = true;
                for (let keyItem in dataset.data[1][0]) {
                    let valItem = dataset.data[1][0][keyItem];
                    result.client[''+keyItem] = ((typeof(valItem) == 'string')? valItem.trim(): valItem);
                }
                result.questions = (dataset.data[3])? dataset.data[3]: [];
                result.validations = (dataset.data[4])? dataset.data[4]: [];
                result.codeudor = (dataset.data[5])? dataset.data[5]: [];
                result.fingers = (dataset.data[6])? dataset.data[6]: [];
                if(dataset.data[2].length) {
                    result.client['valid_normal'] = dataset.data[2][0]['valid_normal'];
                }else {
                    result.client['valid_normal'] = 0;
                }
            }else if(dataset.data[0][0].result == 'EXISTE EN OTRA EMPRESA' || dataset.data[0][0].result == 'EXISTE EN CONFE') {
                result.client['mes'] = dataset.data[0][0]['mes'];
                result.client['empresa'] = dataset.data[0][0]['empresa'];
                result.client['tipo'] = dataset.data[0][0]['tipo'];
            }
        }
        fn(null, ((params.fullRes)? result: result.client));
    }, true);
}
/**
* @description iCtrl.onSubmitFormSimulator escuha el envio de formulario de
* simulacion
* @return {void}
*/
iCtrl.onSubmitFormSimulator = function() {
    $(document).on('keydown','#formSimulator input[name="client"]',function(evt) { /** change  */
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 9 && evt.type != 'change') { return true; }
        if(!evt.target.value) { return }

        iCtrl.validClient();
        return;
    });
    $(document).on('keypress','#formSimulator input[name="client"]',function(evt) { /** change  */
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 13 && evt.type != 'change') { return true; }
        iCtrl.validClient();

        return false;
    });
    $(document).on('submit keypress','#formSimulator',function(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 13 && evt.type == 'keypress') {
            return true;
        }else if(evt.type == 'keypress') {
            $('#formSimulator button[type="submit"]').click();
            return false;
        }
        if(!ctrlData.validClient.client) {
            swal({
                'title': "¡Ingrese un cliente!",
                'icon': "warning",
                'dangerMode': true
            });
            return false;
        }
        if(!ctrlData.validClient.client.result) {
            swal({
                'title': "¡El cliente no existe!",
                'icon': "warning",
                'dangerMode': true
            });
            return false;
        }

        // let result = true;
        // for (let item of ctrlDataWizard.validations.step2) {
        //     let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
        //     if(!(''+elVal.replace(/(\s)/g, ''))) {
        //         iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
        //         iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
        //         result = false;
        //     }else {
        //         iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
        //         iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
        //     }
        // }

        let valAmmount = getValInput('input[name="ammount"]');
        let valTypeCredit = getValInput('select[name="typeCredit"]');
        valAmmount = numeral(valAmmount)._value;
        if(!valAmmount) { return false; }
        // iCtrl.resetCreditBox();

        ctrlData.lastRowTableSimulator.ammount = valAmmount;
        ctrlData.lastRowTableSimulator.typeCredit = valTypeCredit;
        ctrlData.lastRowTableSimulator.client = getValInput('input[name="client"]');
        ctrlData.lastRowTableSimulator.seller = getValInput('select[name="seller"]');

        if(parseFloat(valAmmount) > parseFloat(ctrlData.validClient.client.cup_cli)) {
            swal({
                title: "¡Excedio el cupo disponible!",
                text: "El cupo disponible es de "+numeral(ctrlData.validClient.client.cup_cli).format('$0,0'),
                icon: "warning",
                dangerMode: true
            });
            return false;
        }

        togglePreloader(true);

        var pathSimulator = (ctrlData.saveFianza) ? '/webSimulator' : '/webSimulator2';
        reqJSON({
            'path': urlWS+pathSimulator,
            'data': {
                'empresa': ctrlData.usuario.empresa,
                'tipo': valTypeCredit,
                'valor': valAmmount
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            iCtrl.printTableSimulator(response.data[0]);
            togglePreloader(false);

            setTimeout(function(){
                if (ctrlData.isSelectedTableCuotas) {
                    $($('#datatablesSimulator tbody tr')[ctrlData.selTableCuotas]).trigger('click');
                }
            }, 300)
        }, true);

        return false;
    });
    $(document).on('click', '#loadSimulator2', function(evt) {
        if(ctrlData.validClient.client.result) {
            if (ctrlData.saveFianza) {
                ctrlData.saveFianza = false;
                ctrlData.valorPagado = 0;
                $(evt.target).css('background-color', '');
                $('#valorPagado').html('$0');
                $('.guardaFianza').fadeOut('fast');
            } else {
                ctrlData.saveFianza = true;
                ctrlData.valorPagado = 0;
                $(evt.target).css('background-color', '#000');
                $('#valorPagado').html('$0');
                $('.guardaFianza').fadeIn('fast');
            }
            ctrlData.isSelectedTableCuotas = true;
            ctrlData.selTableCuotas = iCtrl.getTableCuotasSelection();
            iCtrl.resetCreditBox();
            $('#formSimulator').submit();
        }
    })
    // Valida si maneja Guardar Fianzar
    if (ctrlData.usuario.mod_liq == 2) {
        $('#loadSimulator2').show();
    }
}
iCtrl.getTableCuotasSelection = function() {
    var trIndex = 0;
    var selTableCuotas = 0;
    ctrlData.isSelectedTableCuotas = false;
    _.each($('#datatablesSimulator tbody tr'), (o) => {
        if ($(o).hasClass('active')) {
            selTableCuotas = trIndex;
            ctrlData.isSelectedTableCuotas = true;
        }
        trIndex++;
    });
    return selTableCuotas;
}
/**
* @description iCtrl.resetSimulator Reinicia todo el panel de simulacion
* @return {void}
*/
iCtrl.resetSimulator = function() {
    $('input[name="client"]').val('');
    $('input[name="name_client"]').val('');
    $('input[name="text_seller"]').val('');
    $('select[name="seller"]').val('01');
    $('input[name="ammount"]').val('');
    $('input[name="cupo"]').val('');
    $('input[name="num_pagare"]').val('');
    $('select[name="typeCredit"]').val('');
    $('input[name="name_codeudor"]').val('');
    $('#nameCodeudor').hide();
    $('#btnSignEnd').hide();
    $('#btnSign').show();
    $('#valorPagado').html('$0');
    $('.guardaFianza').fadeOut('fast');
    $('#loadSimulator2').css('background-color', '');

    iCtrl.changeTypeCredit();
    iCtrl.resetCreditBox();
    ctrlData.validClient = {};
    ctrlData.saveFianza = false;
    ctrlData.valorPagado = 0;

    iCtrl.tableSimulator.clear().draw();

    setTimeout(function() {
        $('select[name="typeCredit"]').change();
    }, 0);
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
    $("#cupo").html(numeral(0).format('$0,0'));
}
/**
* @description iCtrl.printTableSimulator Pinta la tabla de resultados de solicitud
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableSimulator = function(input) {
    let rowsToAdd = [];
    for (let item of input) {
        var cuota = (ctrlData.saveFianza) ? item.ValorCuota - item.ValorAvalCuo : item.ValorCuota;
        rowsToAdd.push({
            'cuotas': item.cuotas,
            'valorTotal': numeral(item.ValorTotal).format('$0,0.00'),
            'valorCuota': numeral(cuota).format('$0,0.00'),
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
/**
* @description iCtrl.printSellers Imprime el listado de vendedores
* @return {void}
*/
iCtrl.printSellers = function() {
    let htmlOptions = "";
    let availableTags = [];
    for (let item of ctrlData.sellers) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        if (ctrlData.usuario.empresa == '067') {
            let valCedula = ""+item.cedula_ven.replace(/(\s)/g, '');
            htmlOptions += '<option value="'+valOption+'">'+valCedula+' - '+item.nombre+'</option> \n';
            availableTags.push({label: (valCedula+' - '+item.nombre), value: valOption});
        } else {
            htmlOptions += '<option value="'+valOption+'">'+valOption+' - '+item.nombre+'</option> \n';
            availableTags.push({label: (valOption+' - '+item.nombre), value: valOption});
        }
        
    }
    $('#formSimulator select[name="seller"]').html(htmlOptions);

    if (!ctrlData.usuario.externo) {
        $('#formSimulator #textSeller').autocomplete({
            'minLength': 0,
            'source': availableTags,
            'select': function(event, ui) {
                $('#textSeller').val(ui.item.label);
                $('#formSimulator select[name="seller"]').val(ui.item.value);
                $('input[name="ammount"]').prop('disabled', false)
                
                return false;
            },
            'focus': function(event, ui) {
               // $("#textSeller").val(ui.item.label);
                return false;
            }
        }).focus(function () {
            $(this).autocomplete('search');
        });
    }

}
/**
* @description iCtrl.onClickRowTableSimulator Escuch el evento click sobre una
* fila de la tabla opciones de financiacion
* @return {void}
*/
iCtrl.onClickRowTableSimulator = function() {
    $('#datatablesSimulator tbody').on('click', 'tr', function() {
        let elData = iCtrl.tableSimulator.row(this).data();
        if(!elData) { return }
        let filterRow = iCtrl.simulatorRows.filter(function(a) {
            return (""+a.cuotas == ""+elData.cuotas)? true: false;
        })[0];

        $('#datatablesSimulator tr.active').removeClass('active');
        $(this).addClass('active');

        $("#descripcionCredito").html(filterRow.d_cuota);
        $("#valorFactura").html(numeral(filterRow.ValorTotal).format('$0,0.00'));
        $("#valorIntereses").html(numeral(parseFloat(filterRow.ValorFinan)).format('$0,0.00'));
        $("#cantidadCuotas").html(filterRow.cuotas);
        
        var totalFinanciar = filterRow.ValorTotal - filterRow.ValorFinan;
        totalFinanciar = numeral(totalFinanciar).format('$0,0.00');

        let valAmmount = getValInput('input[name="ammount"]');
        valAmmount = numeral(valAmmount)._value;

        var valorCuotaReal = filterRow.ValorCuota;

        if (ctrlData.saveFianza) {
            totalFinanciar = numeral(valAmmount).format('$0,0.00');
            
            var valorPagar = filterRow.ValorTotal - filterRow.ValorFinan - valAmmount;
            valorCuotaReal = filterRow.ValorCuota - filterRow.ValorAvalCuo;
            ctrlData.valorPagado = valorPagar;
            $('#valorPagado').html(numeral(valorPagar).format('$0,0.00'));
        } 

        valorCuotaReal = Math.ceil(valorCuotaReal/100)*100;

        $("#cuotasDe").html(numeral(valorCuotaReal).format('$0,0.00'));
        $("#totalFinanciar").html(numeral(totalFinanciar).format('$0,0.00'));
        ctrlData.lastRowTableSimulator.paymentOption = filterRow;

        if (ctrlData.usuario.externo) {
            $('#guia_pago2').fadeOut();
            $('#guia_pago3').fadeIn();
        }
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
        'searching': false,
        'paging': false,
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
    iCtrl.onChangeTypeCredit();
    // iCtrl.changeTypeCredit(null);
    iCtrl.onSubmitFormSimulator();
    iCtrl.newDataTableSimulator();
    iCtrl.onClickRowTableSimulator();
    iCtrl.printSellers();

    iCtrl.controlsKeys();

    $('#formSimulator select[name="typeCredit"]').change();
    $('[data-toggle="tooltip"]').tooltip();
    
    // Usuario externo
    if (ctrlData.usuario.externo == 3) {
        swal({
            'title': 'Token no válido',
            'text': 'No hay datos para realizar la compra o el token que ingresó no es válido.',
            'buttons': {
                'cancel': false,
                'confirm': "Aceptar"
            },
            'closeOnClickOutside': false,
            'closeOnEsc': false
        })
        .then((value) => {
            window.location.href = "http://intranet.credimarcas.com.co/users/logout";
        })
    } else if (ctrlData.usuario.externo) {
        $('.navbar-nav').find('.dropdown').hide();
        $('.sidebar').hide();
        $('#minimizeSidebar').hide();
        $('.b-search').hide();
        $('#btn-limpiar').hide();
        $('#btn-simular').hide();
        $('.fab').hide();

        $('#fClient')
            .val(ctrlData.usuario.externo_cod_cli.trim())
            .css('background', '#f6f6f6')
            .attr('readonly', 'readonly');
        iCtrl.validClient();
        $('input[name=ammount')
            .val('$ '+ctrlData.usuario.externo_valor.toString().replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ","))
            .css('background', '#f6f6f6')
            .attr('readonly', 'readonly');

        var objVendedor = _.findWhere(ctrlData.sellers, (o) => { return o.codigo == ctrlData.usuario.externo_cod_vendedor});
        $('#formSimulator #textSeller')
            .val(objVendedor.cedula_ven + " - " + objVendedor.nombre)
            .css('background', '#f6f6f6')
            .attr('readonly', 'readonly');
        
        $('#formSimulator select[name="seller"]').val(objVendedor.codigo); 

        $('input[name="num_pagare"]')
            .val("IDAPROB-"+ctrlData.usuario.externo_id_transaccion)
            .css('background', '#f6f6f6')
            .attr('readonly', 'readonly');

        $('#diasParaInicial').hide();
        $('select[name=typeCredit]').css('border','1px solid #f44336');
        $('#guia_pago1').fadeIn();
        //doBounce($('#guia_pago1'), 20, '10px', 300);
    }

});

function doBounce(element, times, distance, speed) {
    for(i = 0; i < times; i++) {
        element.animate({marginTop: '-='+distance},speed)
            .animate({marginTop: '+='+distance},speed);
    }        
}

/**
* Preguntar antes de salir
*/
/** --- ***** --- */
window.onbeforeunload = beforeLeave;
function beforeLeave() {
    if(iCtrl.tableSimulator.data().count()) {
        return "¿Seguro que quieres salir?";
    }
}
/** --- / ***** --- */



$('#version').html(version)