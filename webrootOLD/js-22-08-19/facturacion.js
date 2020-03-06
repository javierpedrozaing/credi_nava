var iCtrl = iCtrl || {};
var signInterval = null;
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
ctrlData.validClient = {};
ctrlData.pdfModal = {};
ctrlData.idInvoice = null;
ctrlData.idPayment = null;
ctrlData.pdfsWithoutSign = [];
ctrlData.idSigned = null;
ctrlData.isValidFinger = false;
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
                    printInvoice(ctrlData.idInvoice);
                    if(ctrlData.idPayment) {
                        printPayment(ctrlData.idPayment);
                    }
                    $('#pdfsModal').modal('hide');
                    iCtrl.resetSimulator();
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

    if(ctrlData.validClient.codeudor) {
        $('#modalPdfCoCedula').html(ctrlData.validClient.codeudor.cod_cli);
        $('#modalPdfCoNombre').html(ctrlData.validClient.codeudor.nom1_cli+' '+ctrlData.validClient.codeudor.nom2_cli);
        $('#modalPdfCoApellido').html(ctrlData.validClient.codeudor.ap1_cli+' '+ctrlData.validClient.codeudor.ap2_cli);
        $('#modalPdfCoCorreo').html(ctrlData.validClient.codeudor.e_mail);
        $('#modalPdfCoTelefono').html(((ctrlData.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlData.validClient.codeudor.te1_cli: ctrlData.validClient.codeudor.fax_cli));
        $('#modalPdfCoDireccion').html(ctrlData.validClient.codeudor.direccion+'('+ctrlData.validClient.codeudor.nom_ciu+', '+ctrlData.validClient.codeudor.nom_dep+')');
    }
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
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
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
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
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
                'residencia_cliente': ctrlData.validClient.client.direccion+'('+ctrlData.validClient.client.nom_ciu+','+ctrlData.validClient.client.nom_dep+')',
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
            $('#pdfsModal').modal({'show': true});
            setTimeout(function() {
                togglePreloader(false);
            },800);
        }
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
        'ced_cod': (ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.cod_cli: '',
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
        'vba3': ctrlData.pdfModal.pdfPagare
    };
    reqJSON({
        'path': './enviarFirma',
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
                                                    'title': '¡Factura Generada!',
                                                    'icon': 'info',
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
* @description iCtrl.removeSign elimina el id de la firma antes de firmados
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.removeSign = function(idSigned) {
    reqJSON({
        'path': './eliminarFirma',
        'data': {
            'id': idSigned
        },
        'type': 'POST'
    }, function(err, response) { });
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
    swal({
        'title': 'Verificando huella del dedo '+((nameFinger)? nameFinger.description: ''),
        'content': elPreloader,
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
            'path': './huellaValidaEstado',
            'data': {
                'id': idRegister
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { fn(false); return }
            if(response.data[0][0].estado == 2) {
                // ctrlDataSeer.historyClient.fp.push(response.data[0][0]);
                fn(response);
                return;
            }else if(response.data[0][0].estado == 3) {
                fn(false);
                return;
            }
            iCtrl.isCheckFingerprint(idRegister, fn);
        });
    }, 3000);
}



/**
* @description iCtrl.onChangeTypeCredit escuha el cambio del campo de formulario
* 'Tipo de Credito'
* @return {void}
*/
iCtrl.recordInvoice = function() {
    if(!ctrlData.lastRowTableSimulator.paymentOption) {
        swal({
            title: "¡No ha seleccionado una opción de financiación!",
            icon: "warning",
            dangerMode: true
        });
        return false;
    }
    if(parseFloat(ctrlData.lastRowTableSimulator.paymentOption.ValorTotal) > parseFloat(ctrlData.validClient.client.cup_cli)) {
        swal({
            title: "¡Excedio el cupo disponible!",
            text: "El valor de la factura es mayor que el cupo \ndisponible de "+numeral(ctrlData.validClient.client.cup_cli).format('$0,0'),
            icon: "warning",
            dangerMode: true
        });
        return false;
    }

    togglePreloader(true);
    reqJSON({
        'path': './facturacion',
        'data': {
            'ced_cod': (ctrlData.validClient.codeudor)? ctrlData.validClient.codeudor.cod_cli: '0',
            'cod_cli': ctrlData.validClient.client.cod_cli,
            'cod_ven': ctrlData.lastRowTableSimulator.seller,
            'valor': ctrlData.lastRowTableSimulator.ammount,
            'tipo': ctrlData.lastRowTableSimulator.paymentOption.cod_tip,
            'cuotas': ctrlData.lastRowTableSimulator.paymentOption.cuotas,
            'dias': ctrlData.lastRowTableSimulator.typeCreditDays,
            'con_huella': ((ctrlData.isValidFinger)? 1: 0),
            'num_pagare': getValInput('input[name="num_pagare"]')
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        ctrlData.idInvoice = response.data[0][0].factura;
        ctrlData.idPayment = ((response.data[1])? response.data[1][0].recibo: null);

        togglePreloader(false);

        swal({
            'title': '¡Factura generada correctamente!',
            'text': 'La facturase ha generado con el número '+response.data[0][0].factura,
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
        return;
    });
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
    ctrlData.lastRowTableSimulator.client = getValInput('input[name="client"]');
    iCtrl.resetCreditBox();
    togglePreloader(true);
    reqJSON({
        'path': './validarCliente',
        'data': {
            'cliente': ctrlData.lastRowTableSimulator.client,
            'fullRes': false
        },
        'type': 'POST'
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
            if(ctrlData.validClient.validations[0]['DIAS'] > 15) {
                swal({
                    title: "¡Verificar centrales de riesgo!",
                    text: "Han pasado "+ctrlData.validClient.validations[0]['DIAS']+" día(s) desde la última aprobación \nFavor verificar centrales de riesgo con el CALL CENTER",
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

        ctrlData.validClient.codeudor = (ctrlData.validClient.codeudor.length)? ctrlData.validClient.codeudor: null;
        if(ctrlData.validClient.codeudor) {
            if(ctrlData.validClient.codeudor[0].ind_next == 1) {
                iCtrl.getCodeudor(ctrlData.validClient.codeudor[0], function(record) {
                    ctrlData.validClient.codeudor = (record)? record: null;

                    setTimeout(function() { togglePreloader(false) },100);
                    setTimeout(function() {
                        swal({
                            'title': 'Venta con Codeudor',
                            'text': ctrlData.validClient.codeudor.cod_cli+' '+ctrlData.validClient.codeudor.nom_cli,
                            'icon': 'info',
                            'buttons': {
                                'cancel': false,
                                'confirm': 'Aceptar'
                            }
                        }).then((value) => {
                            $('#textSeller').focus();
                        });
                    },200);

                    $('#nameCodeudor input[name="name_codeudor"]').val(ctrlData.validClient.codeudor.nom_cli);
                    $('#nameCodeudor').css({'display': 'flex'});
                });
            }else {
                ctrlData.validClient.codeudor = null;
                setTimeout(function() { togglePreloader(false) },100);
                $('#codeudor').hide();
                $('#nameCodeudor').hide();
            }
        }else {
            setTimeout(function() { togglePreloader(false) },100);
            $('#codeudor').hide();
            $('#nameCodeudor').hide();
        }

        // $('#cupo').html(numeral(ctrlData.validClient.client.cup_cli).format('$0,0'));
        $('input[name="name_client"]').val(ctrlData.validClient.client.nom_cli);
        $('input[name="cupo"]').val(numeral(ctrlData.validClient.client.cup_cli).format('$0,0'));


        $('#hands .finger').removeClass('finger-selected');
        $('#hands .finger').removeClass('finger-exist');
        $('#listFp').html('');
        ctrlData.isValidFinger = false;
        if(ctrlData.validClient.fingers) {
            $('#listFpRight').html('');
            $('#listFpLeft').html('');
            for (let item of ctrlData.validClient.fingers) {
                $('#hands #finger'+item.dedo).addClass('finger-exist');
                if(item.dedo < 6) {
                    $('#listFpRight').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
                }else {
                    $('#listFpLeft').append('<p><b>Dedo '+ctrlData.fingers[item.dedo].description+'</b></p>');
                }
            }

            $('#fingerprintModal #clientFp b').html(ctrlData.validClient.client.cod_cli+' - '+ctrlData.validClient.client.nom_cli);
        }

        // ctrlData.isValidFinger = (ctrlData.usuario.valid_huella)? ctrlData.isValidFinger: false;
        if(!ctrlData.isValidFinger && ctrlData.usuario.valid_huella && ctrlData.validClient.fingers.length) {
            $('#fingerprintModal').modal({'show': true});
            return false;
        }else {
            setTimeout(() => { $('#textSeller').focus(); }, 300);
        }
    });
}
/**
* @description iCtrl.getCodeudor obtiene los datos del codeudor
* @return {void}
*/
iCtrl.getCodeudor = function(input, fn) {
    reqJSON({
        'path': './validarCliente',
        'data': {
            'cliente': input.Cedula,
            'fullRes': false
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        let result = null;
        if(response.client.result) {
            result = response.client;
        }
        fn(result);
    });
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
            togglePreloader(false);
        });

        return false;
    });
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

    iCtrl.changeTypeCredit();
    iCtrl.resetCreditBox();
    ctrlData.validClient = {};

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
/**
* @description iCtrl.printSellers Imprime el listado de vendedores
* @return {void}
*/
iCtrl.printSellers = function() {
    let htmlOptions = "";
    let availableTags = [];
    for (let item of ctrlData.sellers) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+valOption+' - '+item.nombre+'</option> \n';
        availableTags.push({label: (valOption+' - '+item.nombre), value: valOption});
    }
    $('#formSimulator select[name="seller"]').html(htmlOptions);
    $('#formSimulator #textSeller').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textSeller').val(ui.item.label);
            $('#formSimulator select[name="seller"]').val(ui.item.value);
            return false;
        },
        'focus': function(event, ui) {
            $("#textSeller").val(ui.item.label);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
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
        $("#valorIntereses").html(numeral(parseFloat(filterRow.ValTotAval)+parseFloat(filterRow.ValorFinan)).format('$0,0.00'));
        $("#cantidadCuotas").html(filterRow.cuotas);
        $("#cuotasDe").html(numeral(filterRow.ValorCuota).format('$0,0.00'));
        $("#totalFinanciar").html(numeral(filterRow.ValorTotal).format('$0,0.00'));
        ctrlData.lastRowTableSimulator.paymentOption = filterRow;
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
});


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
