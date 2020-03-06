var urlAuxWs = urlWS;

var arrPdfs = [
    {'index': 'pdfAutorizacion', 'plantilla': '001'},
    {'index': 'pdfConsentimiento', 'plantilla': '005'},
    {'index': 'pdfAcuerdo', 'plantilla': '006'}
];
/** ***** WIZARD ***** */
var ignoreFocusSearch = false;
var sendingForm = false;
var isPending = true;
var isSeerOptional = false;
var iCtrlWizard = iCtrlWizard || {};
var iCtrlSeerOptional = iCtrlSeerOptional || {};
var signInterval = null;
var sendingDocuments = false;
var sendingFormSeerOptional = false;
var dilForm = false;
var flagFormWizard = true;
var flagDatRL = false;
ctrlDataSeer.historyClient = {};
ctrlDataSeer.tmpIntegration = {};
ctrlDataWizard.restricts = true;
ctrlDataWizard.isSubmit = false;
ctrlDataWizard.failedSeer = false;
ctrlDataWizard.pdfModal = {};
ctrlDataWizard.isValidFinger = false;
//aqui seteo si necesita actualizar la huella
ctrlDataWizard.updateFinger = false;

ctrlDataWizard.listProfile = {
    'p_ind_estudiante': 'Estudiante universitario',
    'p_ind_amacasa': 'Ama(o) de casa',
    'p_ind_independiente': 'Empleado independiente',
    'p_ind_laboral': 'Empleado dependiente',
    'p_ind_pensionado': 'Pensionado',
    'p_ind_histcrediti': '',
    'p_ind_comercial': ''
}
ctrlDataWizard.validations = {
    'step1': [
        'p_ind_estudiante','p_ind_amacasa','p_ind_independiente',
        'p_ind_laboral','p_ind_pensionado','p_ind_histcrediti',
        'p_ind_comercial','p_ind_credito_cedula','p_ind_credito_codeudor'
    ],
    'step2': [
        'tip_ide','cod_cli','nit_ciu','fec_nac','edad','nom1_cli',
        'ap1_cli','sexo','direccion','di1_cli',
        'di2_cli','di3_cli','cod_pai','cod_dep','cod_ciu','text_cod_ciu',
        'cod_comuna','cod_barrio','text_cod_barrio'
    ],// est_civ
    'step3': [
        'rl1_nom_emp'/* ,'rl1_telefono' */
    ],
    'step4': [
        'text_rc1_codigo','rc1_codigo','rc1_estado'
    ],
    'step5': [
        'rp1_nombre','rp1_parentesco',
        'rp2_nombre','rp2_parentesco',
        'rp3_parentesco','rp4_parentesco'
    ],
    'step6': [
        // 'val_sol',
        // 'cod_ven','text_cod_ven'
    ]
}
ctrlDataWizard.modified = {
    'step1': false,
    'step2': false,
    'step3': false,
    'step4': false,
    'step5': false,
    'step6': false,
    'step7': false
}
ctrlDataWizard.changes = {
    'step1': [

    ],
    'step2': [
        'select[name="tip_ide"]','input[name="nit_ciu"]','input[name="fec_nac"]',
        'input[name="nom1_cli"]','input[name="nom2_cli"]','input[name="ap1_cli"]',
        'input[name="ap2_cli"]','input[name="te1_cli"]','input[name="te2_cli"]',
        'input[name="fax_cli"]','sexo[name="sexo"]','select[name="est_civ"]',
        'input[name="email"]','select[name="direccion"]','input[name="di1_cli"]',
        'input[name="di2_cli"]','input[name="di3_cli"]','input[name="di4_cli"]',
        'input[name="unidad"]','select[name="cod_dep"]','input[name="text_cod_dep"]',
        'select[name="cod_ciu"]','input[name="text_cod_ciu"]','select[name="cod_barrio"]',
        'input[name="text_cod_barrio"]','select[name="cod_residencia"]',
        'select[name="ocup_cli"]','input[name="text_ocup_cli"]'
    ],
    'step3': [
        'input[name="rl1_nom_emp"]','input[name="rl1_cargo"]','input[name="rl1_area"]',
        'input[name="rl1_telefono"]','input[name="rl1_ext"]'
    ],
    'step4': [
        'select[name="rc1_codigo"]','input[name="text_rc1_codigo"]','select[name="rc1_estado"]',
        'select[name="rc2_codigo"]','input[name="text_rc2_codigo"]','select[name="rc2_estado"]',
        'select[name="rc3_codigo"]','input[name="text_rc3_codigo"]','select[name="rc3_estado"]',
        'select[name="rc4_codigo"]','input[name="text_rc4_codigo"]','select[name="rc4_estado"]'
    ],
    'step5': [
        'input[name="rp1_nombre"]','select[name="rp1_parentesco"]','input[name="rp1_cel"]','input[name="rp1_ind_tel"]','input[name="rp1_tel"]',
        'input[name="rp2_nombre"]','select[name="rp2_parentesco"]','input[name="rp2_cel"]','input[name="rp2_ind_tel"]','input[name="rp2_tel"]',
        'input[name="rp3_nombre"]','select[name="rp3_parentesco"]','input[name="rp3_cel"]','input[name="rp3_ind_tel"]','input[name="rp3_tel"]',
        'input[name="rp4_nombre"]','select[name="rp4_parentesco"]','input[name="rp4_cel"]','input[name="rp4_ind_tel"]','input[name="rp4_tel"]'
    ],
    'step6': [
        'input[name="val_sol"]','select[name="cod_ven"]','input[name="text_cod_ven"]','input[name="notas_pos"]'
    ]
}
ctrlDataWizard.strSave = {
    'comercial': [],
    'personal': []
}

ctrlDataWizard.fingerHistoric = []

ctrlDataWizard.fingers = [
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

iCtrlWizard.toggleBtnFinish = function() {
    $('#pdfsModal').modal('hide');

    if(!isSeerOptional) {
        setTimeout(function() {
            swal.close();
            setTimeout(function() {
                $("#formWizard #btnFinish").click();
            }, 100);
        }, 0);
    }else {
        iCtrlSeerOptional.onSubmitFormSeerOptional();
    }
}

iCtrlWizard.validInicio = function(input) {
    if(input == 'p_ind_credito_cedula') {
        let valPInd = $('#formWizard input[name="p_ind_credito_cedula"]:checked').val();
        if(valPInd == 'on') {
            $('#formWizard input[name="p_ind_credito_codeudor"]').prop('checked', false);
        }
    }else if(input == 'p_ind_credito_codeudor') {
        let valPInd = $('#formWizard input[name="p_ind_credito_codeudor"]:checked').val();
        if(valPInd == 'on') {
            $('#formWizard input[name="p_ind_credito_cedula"]').prop('checked', false);
        }
    }
}

iCtrlWizard.openModalAm = function(evt) {
    $('#amModalImage').prop('src', $(evt).prop('src'));
    $('#amModal').modal({'show': true});
}

iCtrlWizard.saveAutManual = function() {
    iCtrlWizard.loadDataPdfModal();
    let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
    let countFiles = 0;

    var objDataForm = new FormData();
    $.each($('#aut-centrales #autManual001')[0].files, function(i, file) {
        objDataForm.append('vba1', file);
        countFiles++;
    });
    $.each($('#aut-centrales #autManual005')[0].files, function(i, file) {
        objDataForm.append('vba2', file);
        countFiles++;
    });
    if(!countFiles) { return; }

    objDataForm.append('cod_cli', ctrlDataWizard.pdfModal.cod_cli);
    objDataForm.append('StrEmpresa', ctrlDataWizard.usuario.empresa);
    objDataForm.append('StrUsuario', ctrlDataWizard.usuario.nom_usu);
    objDataForm.append('user', 'confe');
    objDataForm.append('password', 'vedA_Ewaca6u');
    togglePreloader(true);
    jQuery.ajax({
        url: urlAuxWs+'/enviarFirmaManual',
        data: objDataForm,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data) {
            // $('#formWizard input[name="id_firma"]').val(response.data[0][0].id);
            togglePreloader(false);
        }
    });
}

iCtrlWizard.saveAttached = function() {
    iCtrlWizard.loadDataPdfModal();

    let countFiles = 0;
    let objDataForm = new FormData();
    let fileAttached1 = $('#cedula #attached1')[0].files;
    let fileAttached2 = $('#cedula #attached2')[0].files;
    let filePrevAttached1 = $('#cedula #prevAttached1').attr('src');
    let filePrevAttached2 = $('#cedula #prevAttached2').attr('src');
    if(fileAttached1.length) {
        $.each($('#cedula #attached1')[0].files, function(i, file) {
            objDataForm.append('vba1', file);
            countFiles++;
        });
    }else if(filePrevAttached1) {
        let splitPrevAttached = filePrevAttached1.split(";");
        let fileInfo = {
            'contentType': splitPrevAttached[0].split(":")[1],
            'base64': splitPrevAttached[1].split(",")[1]
        };
        let fileInBlob = base64toBlob(fileInfo.base64, fileInfo.contentType);
        objDataForm.append('vba1', fileInBlob);
        countFiles++;
    }
    if(fileAttached2.length) {
        $.each($('#cedula #attached2')[0].files, function(i, file) {
            objDataForm.append(((fileAttached1.length || filePrevAttached1)? 'vba2': 'vba1'), file);
            countFiles++;
        });
    }else if(filePrevAttached2) {
        let splitPrevAttached = filePrevAttached2.split(";");
        let fileInfo = {
            'contentType': splitPrevAttached[0].split(":")[1],
            'base64': splitPrevAttached[1].split(",")[1]
        };
        let fileInBlob = base64toBlob(fileInfo.base64, fileInfo.contentType);
        objDataForm.append(((fileAttached1.length || filePrevAttached1)? 'vba2': 'vba1'), fileInBlob);
        countFiles++;
    }

    if(!countFiles) { return; }
    objDataForm.append('cod_cli', ctrlDataWizard.pdfModal.cod_cli);
    objDataForm.append('StrEmpresa', ctrlDataWizard.usuario.empresa);
    objDataForm.append('StrUsuario', ctrlDataWizard.usuario.nom_usu);
    objDataForm.append('user', 'confe');
    objDataForm.append('password', 'vedA_Ewaca6u');
    togglePreloader(true);

    jQuery.ajax({
        url: urlAuxWs+'/actualizaArchivoCliente',
        data: objDataForm,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data) {
            togglePreloader(false);
        }
    });
}

iCtrlWizard.saveAutIntegration = function() {
    let filesToSend = [];
    for (let item of ctrlDataSeer.historyClient.pdfs) {
        filesToSend.push({'plantilla': item.plantilla, 'base64': item.archivo});
    }
    if(filesToSend.length) {
        iCtrlWizard.loadDataPdfModal();
        iCtrlWizard.saveAutManualExtend(filesToSend);
    }
}

iCtrlWizard.saveAutManualExtend = function(input) {
    let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
    let dataToSend = {
        'ap1': ctrlDataWizard.pdfModal.ap1_cli,
        'ap2': ctrlDataWizard.pdfModal.ap2_cli,
        'cod_cli': ctrlDataWizard.pdfModal.cod_cli,
        'ced_cod': (ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.cod_cli: '',
        'direccion': ctrlDataWizard.pdfModal.direccion,
        'email': ctrlDataWizard.pdfModal.email,
        'firma': valSignClient,
        'nom1': ctrlDataWizard.pdfModal.nom1_cli,
        'nom2': ctrlDataWizard.pdfModal.nom2_cli,
        'telefono': (ctrlDataWizard.pdfModal.fax_cli)? ''+ctrlDataWizard.pdfModal.fax_cli: ''+ctrlDataWizard.pdfModal.tel1_cli,
        'plantilla1': '',
        'plantilla2': '',
        'plantilla3': '',
        'vba1': '',
        'vba2': '',
        'vba3': ''
    };

    let count = 1;
    for (let iInput of input) {
        dataToSend['plantilla'+count] = iInput.plantilla;
        dataToSend['vba'+count] = iInput.base64;
        count++;
    }
    reqJSON({
        'path': './enviarFirmaManual',
        'data': dataToSend,
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        $('#formWizard input[name="id_firma"]').val(response.data[0][0].id);
        iCtrlWizard.saveSign(function() {

        });
    });
}

iCtrlWizard.controlsKeys = function()  {
    $('body').on('keyup', function(evt) {
        if(evt.which == 113 || evt.which == 114 || evt.which == 115) {
            let isWizard = $("#formWizard").is(":visible");
            if(isWizard) {
                switch (evt.which) {
                    case 113:
                        $('#formWizard .btn[name="previous"]').click();
                    break;
                    case 115:
                        $('#formWizard .btn[name="next"]').click();
                    break;
                    case 118:
                        if(ctrlDataSeer.validClient.client.result) {
                            $('#formWizard .btn[name="save"]').click();
                        }
                    break;
                }
            }
        }
    });
}

iCtrlWizard.onChangeBirthdate = function(evt) {
    let elVal = $(evt).val();
    if(typeof(elVal) !== 'undefined') {
        if(!isDate(elVal)) {
            console.error('Invalid format date');
        }
    }
}

iCtrlWizard.autoCompleteEmail = function() {
    let eDomains = [];
    for (let item of ctrlDataWizard.dominios) {
        if(item.dominio.indexOf('@') !== -1) {
            eDomains.push(item.dominio.trim());
        }
    }
    $('#formWizard').on('keyup', 'input[name="email"]', function(evt) {
        let elVal = evt.target.value.replace(/\s/g, '');
        if(elVal.indexOf('@') == -1 && elVal.length > 0) {
            let availableTags = [];
            for (let item of eDomains) {
                let tmpVal = elVal+''+item;
                availableTags.push({label: tmpVal, value: tmpVal});
            }
            $('#formWizard #eDomains').autocomplete({
                'minLength': 0,
                'source': availableTags
            }).focus(function () {
                $(this).autocomplete('search');
            });
        }else {
            $('#formWizard #eDomains').autocomplete({'source': []});
        }
    });
}

iCtrlWizard.onClosePdfsModal = function() {
    $(document).on('hidden.bs.modal', '#pdfsModal', function(evt) {
        let valIdBiofirma = $('#formWizard input[name="id_biofirma"]').val();
        valIdBiofirma = valIdBiofirma.replace(/(\s)/s, '');
        if(valIdBiofirma && ''+valIdBiofirma !== '0') {
            $('#wizardProfile .btn-finish').show();
            $('.nav-pills a[href="#resultado"]').tab('show');
            iCtrlWizard.refreshTabSelected();
        }else {
            swal({
                'title': 'Documentos sin firmar',
                'text': 'Aún no se han firmado los documentos, revise los datos con el cliente y firme los documentos para continuar.',
                'icon': 'warning',
                'dangerMode': true
            }).then((value) => {});
        }
        return false;
    });
}

iCtrlWizard.sendSignAlert = function() {
    let elPreloader = document.createElement("img");
    elPreloader.setAttribute("src", urlPreloader);
    swal({
        'title': 'Firmando documentos...',
        'content': elPreloader,
        'buttons': {
            'cancel': false,
            'resend': 'Consultar',
            // 'confirm': 'Cancelar'
        },
        'closeOnClickOutside': false,
        'closeOnEsc': false
    }).then((value) => {
        if(value == 'resend') {
            iCtrlWizard.isSigned(test);
            iCtrlWizard.sendSignAlert();
            // let idSigned = $('#formWizard input[name="id_firma"]').val();
            // if(idSigned) {
            //     iCtrlWizard.removeSign(idSigned);
            // }
            // $('#formWizard input[name="id_biofirma"]').val('');
            // $('#formWizard input[name="id_firma"]').val('');
            // $('#modalPdfIdFirma').html('');
            // iCtrlWizard.sendSign();
        }else if(value == true) {
            if(signInterval) {
                clearTimeout(signInterval);
            }
            let idSigned = $('#formWizard input[name="id_firma"]').val();
            if(idSigned) {
                iCtrlWizard.removeSign(idSigned);
            }
            $('#formWizard input[name="id_biofirma"]').val('');
            $('#formWizard input[name="id_firma"]').val('');
            $('#formSeerOptional input[name="uco_id_firma"]').val('');
            $('#formSeerOptional input[name="uco_id_biofirma"]').val('');
            $('#modalPdfIdFirma').html('');
        }
    });
}

iCtrlWizard.sendSign = function() {
    $('#formWizard input[name="id_firma"]').val('');
    $('#formWizard input[name="id_biofirma"]').val('');
    $('#formSeerOptional input[name="uco_id_firma"]').val('');
    $('#formSeerOptional input[name="uco_id_biofirma"]').val('');
    $('#modalPdfIdFirma').html('');

    iCtrlWizard.sendSignAlert();

    let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
    let dataToSend = {
        'ap1': ctrlDataWizard.pdfModal.ap1_cli,
        'ap2': ctrlDataWizard.pdfModal.ap2_cli,
        'cod_cli': ctrlDataWizard.pdfModal.cod_cli,
        'ced_cod': (ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.cod_cli: '',
        'direccion': ctrlDataWizard.pdfModal.direccion+'('+ctrlDataWizard.pdfModal.nom_ciu+', '+ctrlDataWizard.pdfModal.nom_dep+')',
        'email': ctrlDataWizard.pdfModal.email,
        'firma': valSignClient,
        'nom1': ctrlDataWizard.pdfModal.nom1_cli,
        'nom2': ctrlDataWizard.pdfModal.nom2_cli,
        'telefono': (ctrlDataWizard.pdfModal.fax_cli)? ''+ctrlDataWizard.pdfModal.fax_cli: ''+ctrlDataWizard.pdfModal.tel1_cli,
        'plantilla1': '',
        'plantilla2': '',
        'plantilla3': '',
        'vba1': '',
        'vba2': '',
        'vba3': '',
        'StrUsuario': ctrlDataWizard.usuario.nom_usu
    };

    let count = 1;
    for (let iPdf of arrPdfs) {
        if(ctrlDataWizard.pdfModal[iPdf.index]) {
            dataToSend['plantilla'+count] = iPdf.plantilla;
            dataToSend['vba'+count] = ctrlDataWizard.pdfModal[iPdf.index];
            count++;
        }
    }

    reqJSON({
        'path': urlWS+'/enviarFirma',
        'data': dataToSend,
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        $('#formWizard input[name="id_firma"]').val(response.data[0][0].id);
        $('#formSeerOptional input[name="id_firma"]').val(response.data[0][0].id);
        $('#modalPdfIdFirma').html(response.data[0][0].id);
        reqJSON({
            'path': './firmarPdf',
            'data': {
                'id': response.data[0][0].id,
                'forceReturn': true
            },
            'type': 'POST'
        }, function(err, response) {
            iCtrlWizard.isSigned(dataToSend);
        });
    }, true);
}

iCtrlWizard.removeSign = function(idSigned) {
    reqJSON({
        'path': './eliminarFirma',
        'data': {
            'id': idSigned
        },
        'type': 'POST'
    }, function(err, response) { });
}

iCtrlWizard.isSignedRecursive = function(input) {
    signInterval = setTimeout(function() {
        let idSigned = $('#formWizard input[name="id_firma"]').val();

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
                            $('#formWizard input[name="id_biofirma"]').val(response.data[0][0].id_biofirma);
                            $('#formSeerOptional input[name="uco_id_biofirma"]').val(response.data[0][0].id_biofirma);
                            $('#modalPdfIdFirma').html(response.data[0][0].id_biofirma);

                            if(''+response.data[0][0].estado == '1') { // firmado
                                if(signInterval) {
                                    let tmpKey = 0;
                                    if(!ctrlDataSeer.historyClient.pdfs) {
                                        ctrlDataSeer.historyClient['pdfs'] = [];
                                    }else {
                                        tmpKey = (ctrlDataSeer.historyClient['pdfs'].length - 1);
                                    }

                                    if(response.data[0][0].archivo_firmado1) {
                                        if(input.plantilla1 == '001') {
                                            $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado1);
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado1,
                                                'cod_plantilla': '001',
                                                'plantilla': 'AUTO.TRATAMIENTO DE DATOS PERSONALES'
                                            });
                                        }
                                        if(input.plantilla1 == '005') {
                                            $('#pdfConsentimiento').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado1);
                                            $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open005').data('indexPdf', ''+tmpKey);
                                            $('#open005').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado1,
                                                'cod_plantilla': '005',
                                                'plantilla': 'AUTO.CONSENTIMIENTO DE DATOS'
                                            });
                                        }
                                        if(input.plantilla1 == '006') {
                                            $('#pdfAcuerdo').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado1);
                                            $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open006').data('indexPdf', ''+tmpKey);
                                            $('#open006').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado1,
                                                'cod_plantilla': '006',
                                                'plantilla': 'ACUERDO FIRMA ELECTRONICA'
                                            });
                                        }
                                    }
                                    if(response.data[0][0].archivo_firmado2) {
                                        if(input.plantilla2 == '001') {
                                            $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado2);
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado2,
                                                'cod_plantilla': '001',
                                                'plantilla': 'AUTO.TRATAMIENTO DE DATOS PERSONALES'
                                            });
                                        }
                                        if(input.plantilla2 == '005') {
                                            $('#pdfConsentimiento').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado2);
                                            $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open005').data('indexPdf', ''+tmpKey);
                                            $('#open005').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado2,
                                                'cod_plantilla': '005',
                                                'plantilla': 'AUTO.CONSENTIMIENTO DE DATOS'
                                            });
                                        }
                                        if(input.plantilla2 == '006') {
                                            $('#pdfAcuerdo').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado2);
                                            $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open006').data('indexPdf', ''+tmpKey);
                                            $('#open006').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado2,
                                                'cod_plantilla': '006',
                                                'plantilla': 'ACUERDO FIRMA ELECTRONICA'
                                            });
                                        }
                                    }
                                    if(response.data[0][0].archivo_firmado3) {
                                        if(input.plantilla3 == '001') {
                                            $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado3);
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado3,
                                                'cod_plantilla': '001',
                                                'plantilla': 'AUTO.TRATAMIENTO DE DATOS PERSONALES'
                                            });
                                        }
                                        if(input.plantilla3 == '005') {
                                            $('#pdfConsentimiento').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado3);
                                            $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open005').data('indexPdf', ''+tmpKey);
                                            $('#open005').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado3,
                                                'cod_plantilla': '005',
                                                'plantilla': 'AUTO.CONSENTIMIENTO DE DATOS'
                                            });
                                        }
                                        if(input.plantilla3 == '006') {
                                            $('#pdfAcuerdo').prop('src', 'data:application/pdf;base64,'+response.data[0][0].archivo_firmado3);
                                            $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
                                            tmpKey++;
                                            $('#open006').data('indexPdf', ''+tmpKey);
                                            $('#open006').show();
                                            ctrlDataSeer.historyClient.pdfs.push({
                                                'archivo': response.data[0][0].archivo_firmado3,
                                                'cod_plantilla': '006',
                                                'plantilla': 'ACUERDO FIRMA ELECTRONICA'
                                            });
                                        }
                                    }

                                    if($('#formWizard input[name="id_firma"]').val()) {
                                        iCtrlWizard.saveSign(function() {
                                            swal.close();
                                            $('#btnSign').hide();
                                            $('#btnSignEnd').show();
                                            $('#btnSend').show();
                                            if(!isSeerOptional) {
                                                iCtrlWizard.sendDirectFormWizard();
                                            }
                                        });
                                    }
                                }
                            }else if(''+response.data[0][0].estado == '2') { // cancelado
                                $('#formWizard input[name="id_biofirma"]').val('');
                                $('#formWizard input[name="id_firma"]').val('');
                                $('#formSeerOptional input[name="uco_id_biofirma"]').val('');
                                $('#formSeerOptional input[name="uco_id_firma"]').val('');
                                $('#modalPdfIdFirma').html('');

                                swal.close();
                                swal({
                                    title: 'Firma Cancelada',
                                    icon: 'warning',
                                    dangerMode: true
                                }).then((value) => {});
                            }else if(''+response.data[0][0].estado == '3') { // error en la firma
                                $('#formWizard input[name="id_biofirma"]').val('');
                                $('#formWizard input[name="id_firma"]').val('');
                                $('#formSeerOptional input[name="uco_id_biofirma"]').val('');
                                $('#formSeerOptional input[name="uco_id_firma"]').val('');
                                $('#modalPdfIdFirma').html('');

                                swal.close();
                                swal({
                                    title: 'Intente nuevamente',
                                    icon: 'warning',
                                    dangerMode: true
                                }).then((value) => {});
                            }else {
                                iCtrlWizard.isSignedRecursive(input);
                                // swal({
                                //     title: 'Ya tiene un estudio de cliente',
                                //     text: 'El cliente '+codCli+' ya tiene un estudio de crédito pendiente. \nPor favor esperar la respuesta del Call Center.',
                                //     icon: 'warning',
                                //     dangerMode: true
                                // }).then((value) => {});
                            }
                        }else {
                            iCtrlWizard.isSignedRecursive(input);
                        }
                    }else {
                        iCtrlWizard.isSignedRecursive(input);
                    }
                }else {
                    iCtrlWizard.isSignedRecursive(input);
                }
            }else {
                iCtrlWizard.isSignedRecursive(input);
            }
        }, true);
    }, 8000);
}

var test = null;
iCtrlWizard.isSigned = function(input) {
    if(signInterval) {
        clearTimeout(signInterval);
        $('#formWizard input[name="id_biofirma"]').val('');
        $('#formSeerOptional input[name="uco_id_biofirma"]').val('');
    }

    test = input;
    iCtrlWizard.isSignedRecursive(input);
}

iCtrlWizard.saveSign = function(fn) {
    let idSigned = $('#formWizard input[name="id_firma"]').val();
    reqJSON({
        'path': './guardarFirma',
        'data': {
            'id_firma': idSigned,
            'factura': ''
        },
        'type': 'POST'
    }, function(err, response) {
        iCtrlWizard.sendDirectFormWizard();
        fn();
    });
}

iCtrlWizard.getAuthorizationFormat = function(input) {
    let strAddressClient = ctrlDataWizard.pdfModal.direccion+'('+ctrlDataWizard.pdfModal.nom_ciu+', '+ctrlDataWizard.pdfModal.nom_dep+')';
    let strAddressCod = ((ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.direccion+'('+ctrlDataSeer.validClient.codeudor.nom_ciu+', '+ctrlDataSeer.validClient.codeudor.nom_dep+')': ' ');
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'FORMATO_DE_AUTORIZACION_PARA_EL_TRATAMIENTO_DE_DATOS_PERSONALES',
            'row': {
                'nit_cliente': ctrlDataWizard.pdfModal.cod_cli,
                'nombre_cliente': ctrlDataWizard.pdfModal.nom_cli+' '+ctrlDataWizard.pdfModal.ap_cli,
                'celular_cliente': ctrlDataWizard.pdfModal.fax_cli,
                'email_cliente': ctrlDataWizard.pdfModal.email,
                'residencia_cliente': strAddressClient,
                'nit_codeudor': ((ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.cod_cli: ' '),
                'nombre_codeudor': ((ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.nom1_cli+' '+ctrlDataSeer.validClient.codeudor.nom2_cli+' '+ctrlDataSeer.validClient.codeudor.ap1_cli+' '+ctrlDataSeer.validClient.codeudor.ap2_cli: ' '),
                'celular_codeudor': ((ctrlDataSeer.validClient.codeudor)? ((ctrlDataSeer.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlDataSeer.validClient.codeudor.te1_cli: ctrlDataSeer.validClient.codeudor.fax_cli):' '),
                'email_codeudor': ((ctrlDataSeer.validClient.codeudor)? ctrlDataSeer.validClient.codeudor.e_mail: ' '),
                'residencia_codeudor': strAddressCod
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response) {
            ctrlDataWizard.pdfModal['pdfAutorizacion'] = response.data;
            $('#pdfAutorizacion').prop('src', 'data:application/pdf;base64,'+response.data);
            countTotalPdfs++;

            if(input == countTotalPdfs) {
                $('#pdfsModal').modal({'show': true});
                setTimeout(function() {
                    togglePreloader(false);
                },800);
            }
        }
    }, true);
}
iCtrlWizard.getDataTreatment = function(input) {
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'CONSENTIMIENTO_PARA_TRATAMIENTO_DE_DATOS_PERSONALE',
            'row': {
                'nit_cliente': ctrlDataWizard.pdfModal.cod_cli,
                'nombre_cliente': ctrlDataWizard.pdfModal.nom_cli+' '+ctrlDataWizard.pdfModal.ap_cli
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response) {
            ctrlDataWizard.pdfModal['pdfConsentimiento'] = response.data;
            $('#pdfConsentimiento').prop('src', 'data:application/pdf;base64,'+response.data);
            countTotalPdfs++;

            if(input == countTotalPdfs) {
                $('#pdfsModal').modal({'show': true});
                setTimeout(function() {
                    togglePreloader(false);
                },800);
            }
        }
    }, true);
}
iCtrlWizard.getElectronicCommunicationAgreement = function(input) {
    reqJSON({
        'path': urlWS+'/pdf',
        'data': {
            'metodo': 'ACUERDO_DE_COMUNICACION_ELECTRONICA',
            'row': {
                'nit_cliente': ctrlDataWizard.pdfModal.cod_cli,
                'nombre_cliente': ctrlDataWizard.pdfModal.nom_cli+' '+ctrlDataWizard.pdfModal.ap_cli
            }
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        if(response) {
            ctrlDataWizard.pdfModal['pdfAcuerdo'] = response.data;
            $('#pdfAcuerdo').prop('src', 'data:application/pdf;base64,'+response.data);
            countTotalPdfs++;

            if(input == countTotalPdfs) {
                $('#pdfsModal').modal({'show': true});
                setTimeout(function() { togglePreloader(false); },800);
            }
        }
    }, true);
}

iCtrlWizard.onSubmitDocuments = function(fn) {
    if(sendingDocuments) {
        fn({});
        return;
    }

    var objDataForm = new FormData();
    $.each($('#formWizard input[name="side_a"]')[0].files, function(i, file) {
        if(i == 0) {
            objDataForm.append('file-side-a', file);
        }else if(i == 1) {
            objDataForm.append('file-side-b', file);
        }
    });

    objDataForm.append('user', 'confe');
    objDataForm.append('password', 'vedA_Ewaca6u');
    objDataForm.append('StrEmpresa', ctrlDataWizard.usuario.empresa);
    objDataForm.append('StrUsuario', ctrlDataWizard.usuario.nom_usu);
    objDataForm.append('cod_cli', getValInput('#formWizard .c-field[name="cod_cli"]'));

    jQuery.ajax({
        url: urlAuxWs+'/fotoCedula',
        data: objDataForm,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data) {
            $('#generales input[name="foto_cedula"]').val('1');
            let valSideA = $('#cedula input[name="side_a"]').val('');
            // let valSideB = $('#cedula input[name="side_b"]').val('');
            iCtrlWizard.sendDirectFormWizard();

            sendingDocuments = true;
            // $('#cedula #sideA').prop('disabled', 'true');
            // $('#cedula .file-zone').addClass('c-disabled');

            fn(data);
        }
    });
}

iCtrlWizard.onSubmitFormWizard = function() {
    $(document).on('submit','#formWizard',function(evt) {
        let flagSendForm = ctrlDataWizard.isSubmit;
        ctrlDataWizard.isSubmit = false;
        return flagSendForm;
    });
    $(document).on('click', '#btnSendFormWizard', function() {
        let valIdBiofirma = $('#formWizard input[name="id_biofirma"]').val();
        if(valIdBiofirma) {
            ctrlDataWizard.isSubmit = true;
            $('#formWizard #bSubmitFormWizard').click();
        }
    });
}

iCtrlWizard.onChangeFieldsFormWizard = function() {
    document.querySelector("#generales input").addEventListener("change", function() {
        ctrlDataWizard.modified.step2 = true;
        $('#formWizard input[name="dat_general"]').val('1');
    });
    document.querySelector("#generales select").addEventListener("change", function() {
        ctrlDataWizard.modified.step2 = true;
        $('#formWizard input[name="dat_general"]').val('1');
    });
    $('#formWizard').on('change','#generales input', function(evt) {
        ctrlDataWizard.modified.step2 = true;
        $('#formWizard input[name="dat_general"]').val('1');
    });
    $('#formWizard').on('change','#generales select', function(evt) {
        ctrlDataWizard.modified.step2 = true;
        $('#formWizard input[name="dat_general"]').val('1');
    });
    $('#formWizard').on('change',ctrlDataWizard.changes.step2.join(','),function(evt) {
        ctrlDataWizard.modified.step2 = true;
        $('#formWizard input[name="dat_general"]').val('1');
    });

    document.querySelector("#ref-laborales input").addEventListener("change", function() {
        ctrlDataWizard.modified.step3 = true;
        $('#formWizard input[name="dat_laboral"]').val('1');
    });
    if(document.querySelector("#ref-laborales select")) {
        document.querySelector("#ref-laborales select").addEventListener("change", function() {
            ctrlDataWizard.modified.step3 = true;
            $('#formWizard input[name="dat_laboral"]').val('1');
        });
    }
    $('#formWizard').on('change','#ref-laborales input', function(evt) {
        ctrlDataWizard.modified.step3 = true;
        $('#formWizard input[name="dat_laboral"]').val('1');
    });
    $('#formWizard').on('change','#ref-laborales select', function(evt) {
        ctrlDataWizard.modified.step3 = true;
        $('#formWizard input[name="dat_laboral"]').val('1');
    });
    $('#formWizard').on('change',ctrlDataWizard.changes.step3.join(','),function(evt) {
        ctrlDataWizard.modified.step3 = true;
        $('#formWizard input[name="dat_laboral"]').val('1');
    });

    document.querySelector("#ref-comerciales input").addEventListener("change", function() {
        ctrlDataWizard.modified.step4 = true;
        $('#formWizard input[name="dat_comercial"]').val('1');
    });
    document.querySelector("#ref-comerciales select").addEventListener("change", function() {
        ctrlDataWizard.modified.step4 = true;
        $('#formWizard input[name="dat_comercial"]').val('1');
    });
    $('#formWizard').on('change','#ref-comerciales input', function(evt) {
        ctrlDataWizard.modified.step4 = true;
        $('#formWizard input[name="dat_comercial"]').val('1');
    });
    $('#formWizard').on('change','#ref-comerciales select', function(evt) {
        ctrlDataWizard.modified.step4 = true;
        $('#formWizard input[name="dat_comercial"]').val('1');
    });
    $('#formWizard').on('change',ctrlDataWizard.changes.step4.join(','),function(evt) {
        ctrlDataWizard.modified.step4 = true;
        $('#formWizard input[name="dat_comercial"]').val('1');
    });

    document.querySelector("#ref-personales input").addEventListener("change", function() {
        ctrlDataWizard.modified.step5 = true;
        $('#formWizard input[name="dat_personal"]').val('1');
    });
    document.querySelector("#ref-personales select").addEventListener("change", function() {
        ctrlDataWizard.modified.step5 = true;
        $('#formWizard input[name="dat_personal"]').val('1');
    });
    $('#formWizard').on('change','#ref-personales input', function(evt) {
        ctrlDataWizard.modified.step5 = true;
        $('#formWizard input[name="dat_personal"]').val('1');
    });
    $('#formWizard').on('change','#ref-personales select', function(evt) {
        ctrlDataWizard.modified.step5 = true;
        $('#formWizard input[name="dat_personal"]').val('1');
    });
    $('#formWizard').on('change',ctrlDataWizard.changes.step5.join(','),function(evt) {
        ctrlDataWizard.modified.step5 = true;
        $('#formWizard input[name="dat_personal"]').val('1');
    });
    if(document.querySelector("#resultado input")) {
        document.querySelector("#resultado input").addEventListener("change", function() {
            ctrlDataWizard.modified.step6 = true;
        });
        document.querySelector("#resultado select").addEventListener("change", function() {
            ctrlDataWizard.modified.step6 = true;
        });
    }
    $('#formWizard').on('change','#ref-comerciales input', function(evt) {
        ctrlDataWizard.modified.step6 = true;
    });
    $('#formWizard').on('change','#ref-comerciales select', function(evt) {
        ctrlDataWizard.modified.step6 = true;
    });
    $('#formWizard').on('change',ctrlDataWizard.changes.step6.join(','),function(evt) {
        ctrlDataWizard.modified.step6 = true;
    });
}

iCtrlWizard.resetDat = function() {
    $('#formWizard input[name="dat_general"]').val('0');
    $('#formWizard input[name="dat_laboral"]').val('0');
    $('#formWizard input[name="dat_comercial"]').val('0');
    $('#formWizard input[name="dat_personal"]').val('0');
}

iCtrlWizard.resetModifiedFlagsWizard = function() {
    ctrlDataWizard.modified.step1 = false;
    ctrlDataWizard.modified.step2 = false;
    ctrlDataWizard.modified.step3 = false;
    ctrlDataWizard.modified.step4 = false;
    ctrlDataWizard.modified.step5 = false;
    ctrlDataWizard.modified.step6 = false;
    ctrlDataWizard.modified.step7 = false;
}

iCtrlWizard.onOpenPdfsCc = function() {
    $(document).on('click', '#open005, #open006', function(evt) {
        let indexPdf = $(evt.target).data('indexPdf');
        $('#cedulaModal #cedulaModalLabel').html(ctrlDataSeer.historyClient.pdfs[parseInt(indexPdf)].plantilla);
        $('#cedulaModal #pdfCedula').prop('src', 'data:application/pdf;base64,'+ctrlDataSeer.historyClient.pdfs[parseInt(indexPdf)].archivo);
        $('#cedulaModal').modal({'show': true});
    });
}

var countTotalPdfs = 0;
var isRegFp = false;
iCtrlWizard.openPdfsModal = function(ignoreOpenModal) {
    let result = false;
    /** ***** HUELLA ***** */
    if(!result) {
        if(ctrlDataWizard.usuario.valid_huella) { // verificacion o registro de huella
            ctrlDataWizard.isValidFinger = (ctrlDataWizard.usuario.valid_huella)? ctrlDataWizard.isValidFinger: true;
            // let valRe = (ctrlDataSeer.historyClient.re)? ((ctrlDataSeer.historyClient.re.length)? ctrlDataSeer.historyClient.re: null): null;
            let isPending = false;
            // if(valRe) {
            //     if(valRe[0].resultado.indexOf('PENDIENTE') != -1) {
            //         isPending = true;
            //     }
            // }

            let lastUpdate = ((ctrlDataSeer.validClient.client)? ctrlDataSeer.validClient.client.ultima_actualizacion: 0);
            if(ctrlDataSeer.historyClient.fp.length < 2) {
                if(!ignoreOpenModal) {
                    $('#fingerprintRegModal').modal({'show': true});
                }
                isRegFp = true;
                result = true;
                return result;
            }else if(!ctrlDataWizard.isValidFinger && !isRegFp && !isPending && lastUpdate > 1) {
                if(!ignoreOpenModal) {
                    $('#fingerprintModal').modal({'show': true});
                }
                result = true;
                return result;
            }
        }
    }
    /** ***** / HUELLA ***** */

    if(!ctrlDataWizard.usuario.ind_auto_firma) {
        return false;
    }

    let is001 = true;
    let is005 = $('#formWizard input[name="consentimiento_datos"]').prop('checked');
    let is006 = $('#formWizard input[name="firma_electronica"]').prop('checked');
    let valIdBiofirma = $('#formWizard input[name="id_biofirma"]').val();

    let daysSeer = parseInt(ctrlDataWizard.usuario.dias_vidente);
    let lastUpdate = ctrlDataSeer.validClient.client.ultima_actualizacion;

    if(ctrlDataSeer.validClient.client.result) {
        if(lastUpdate >= daysSeer || !ctrlDataSeer.historyClient.ac.length) {
            is001 = false;
        }
    }else {
        is001 = false;
    }

    let haveToSign = (!is001 || !is005 || !is006)? true: false;

    if(lastUpdate < daysSeer && (is001 && is005 && is006)) {
        result = false;
    }else {
        if(!haveToSign) {
            result = false;
        }else if(valIdBiofirma && ''+valIdBiofirma !== '0') {
            result = false;
        }else {
            if(!ignoreOpenModal) {
                iCtrlWizard.loadDataPdfModal();
                countTotalPdfs = 0;
                let totalPdfs = 0;
                if(!is001) { totalPdfs++; }
                if(!is005) { totalPdfs++; }
                if(!is006) { totalPdfs++; }

                togglePreloader(true);

                if(is001) {
                    $('#nav-autorizacion-tab').addClass('hide');
                }else {
                    $('#nav-autorizacion-tab').addClass('show');
                    $('#nav-autorizacion-tab').tab('show');
                    iCtrlWizard.getAuthorizationFormat(totalPdfs);
                }
                if(is005) {
                    $('#nav-consentimiento-tab').addClass('hide');
                }else {
                    $('#nav-consentimiento-tab').addClass('show');
                    if(is001) {
                        $('#nav-consentimiento-tab').tab('show');
                    }
                    iCtrlWizard.getDataTreatment(totalPdfs);
                }
                if(is006) {
                    $('#nav-acuerdo-tab').addClass('hide');
                }else {
                    $('#nav-acuerdo-tab').addClass('show');
                    if(is001 && is005) {
                        $('#nav-acuerdo-tab').tab('show');
                    }
                    iCtrlWizard.getElectronicCommunicationAgreement(totalPdfs);
                }

                let valSignClient = $('#formWizard input[name="cliente_firma"]:checked').val();
                $('#pdfsModal input[name="md_cliente_firma"][value="'+valSignClient+'"]').prop('checked', 'checked');
            }

            result = true;
        }
    }

    return result;
}

iCtrlWizard.toggleSendFormWizard = function() {
    let strValidations = '';
    if(!iCtrlWizard.validStep2()) {
        strValidations += 'Generales\n';
    }
    if(!iCtrlWizard.validStep3()) {
        strValidations += 'Ref Laborales\n';
    }
    if(!iCtrlWizard.validStep4()) {
        strValidations += 'Ref Comerciales\n';
    }
    if(!iCtrlWizard.validStep5()) {
        strValidations += 'Ref Personales\n';
    }
    if(!iCtrlWizard.validStep6()) {
        strValidations += 'Resultado\n';
    }

    if(strValidations) {
        swal({
            title: 'Diligencie correctamente toda la información',
            text: 'Hay datos obligatorios sin diligenciar en las siguientes pestañas:\n'+strValidations,
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return false;
    }

    let codCli = getValInput('#formWizard .c-field[name="cod_cli"]');
    reqJSON({
        'path': urlWS+'/validarEstudio',
        'data': {
            'cod_cli': codCli
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        let flagSendForm = true;
        if(response.data.length) {
            if(response.data[0].length) {
                if(response.data[0][0].estudio && getValInput('#formWizard input[name="update"]') == 'on') {
                    flagSendForm = false;
                    swal({
                        title: 'Solicitud en estudio',
                        text: 'El cliente '+codCli+' ya tiene un estudio de crédito pendiente. \nPor favor esperar la respuesta del CALL CENTER.',
                        icon: 'warning',
                        dangerMode: true
                    }).then((value) => {});
                }
            }
        }

        if(flagSendForm && ($('#formWizard input[name="tip_sol"]').val() != '07')) {
            iCtrlWizard.validarIncrease();
            // swal({
            //     'title': 'Enviar solicitud',
            //     'text': '¿Desea enviar la solicitud de estudio al CALLCENTER?',
            //     'icon': 'info',
            //     'buttons': {
            //         'cancel': 'No',
            //         'confirm': 'Sí'
            //     },
            //     'closeOnClickOutside': false
            // }).then((value) => {
            //     if(value) {
            //         $('#formWizard input[name="envia_call"]').val('1');
            //     }else {
            //         $('#formWizard input[name="envia_call"]').val('0');
            //     }
            // });
        }else if(flagSendForm) {
            iCtrlWizard.validarIncrease();
        }
    }, true);
}

iCtrlWizard.validarIncrease = function(codCli) {
    // if($('#formWizard input[name="tip_sol"]').val() == '05') {
    //     iCtrlWizard.sendFormWizard();
    //     return;
    // }

    if($('#formWizard input[name="tip_sol"]').val() != '07') {
        let elFields = document.createElement('div');
        let ctrlValSol = document.createElement('input');
        ctrlValSol.setAttribute('id', 'swalInputCupo');
        ctrlValSol.setAttribute('name', '');
        ctrlValSol.setAttribute('placeholder', 'Ingrese valor cupo(Opcional)');
        ctrlValSol.setAttribute('type', 'text');
        ctrlValSol.setAttribute('class', 'swal-content__input');
        ctrlValSol.setAttribute('style', 'margin-bottom: 8px;');
        let ctrlNotasPos = document.createElement('input');
        ctrlNotasPos.setAttribute('id', 'swalInputNotasPos');
        ctrlNotasPos.setAttribute('name', '');
        ctrlNotasPos.setAttribute('placeholder', 'Notas POS(Opcional)');
        ctrlNotasPos.setAttribute('type', 'text');
        ctrlNotasPos.setAttribute('class', 'swal-content__input');
        let ctrlAlertCallcenter = document.createElement('div');
        ctrlAlertCallcenter.setAttribute('class', 'swal-text m-0 pb-16 alert-increase text-center');
        let strAlertCallcenter = document.createTextNode('¿Desea enviar la solicitud de estudio al CALLCENTER?');
        ctrlAlertCallcenter.appendChild(strAlertCallcenter);
        elFields.appendChild(ctrlAlertCallcenter);
        elFields.appendChild(ctrlValSol);
        elFields.appendChild(ctrlNotasPos);

        swal({
            'title': 'Enviar solicitud',
            'content': elFields,
            'buttons': {
                'cancel': 'No',
                'confirm': 'Sí'
            },
            'closeOnClickOutside': false,
            'closeOnEsc': false,
            'className': 'swal-compact'
        }).then((value) => {
            if(value) {
                $('#formWizard input[name="envia_call"]').val('1');
                $('#formWizard input[name="val_sol"]').val($('#swalInputCupo').val());
                $('#formWizard input[name="notas_pos"]').val($('#swalInputNotasPos').val());
            }
            iCtrlWizard.sendFormWizard();
        });
        return;
    }

    if($('#formWizard input[name="tip_sol"]').val() == '07') {
        let elFields = document.createElement('div');

        let ctrlAlertIncrease = document.createElement('div');
        ctrlAlertIncrease.setAttribute('class', 'swal-text m-0 alert-increase text-center');
        let strAlertIncrease = document.createTextNode('Valor disponible: '+numeral(ctrlDataSeer.historyClient.re[0].cupo).format('$0,000'));
        ctrlAlertIncrease.appendChild(strAlertIncrease);

        let ctrlAlertIncrease2 = document.createElement('div');
        ctrlAlertIncrease2.setAttribute('class', 'swal-text m-0 alert-increase pb-16 text-center');
        let strAlertIncrease2 = document.createTextNode('¿Requiere un aumento?');
        ctrlAlertIncrease2.appendChild(strAlertIncrease2);

        let ctrlValSol = document.createElement('input');
        ctrlValSol.setAttribute('id', 'swalInputCupo');
        ctrlValSol.setAttribute('name', '');
        ctrlValSol.setAttribute('placeholder', 'Ingrese valor cupo');
        ctrlValSol.setAttribute('type', 'text');
        ctrlValSol.setAttribute('class', 'swal-content__input');
        ctrlValSol.setAttribute('style', 'margin-bottom: 8px;');

        let ctrlAlertCallcenter = document.createElement('div');
        ctrlAlertCallcenter.setAttribute('class', 'swal-text m-0 pt-8 alert-increase text-center');
        let strAlertCallcenter = document.createTextNode('¿Desea enviar la solicitud?');
        ctrlAlertCallcenter.appendChild(strAlertCallcenter);

        elFields.appendChild(ctrlAlertIncrease);
        elFields.appendChild(ctrlAlertIncrease2);
        elFields.appendChild(ctrlValSol);
        elFields.appendChild(ctrlAlertCallcenter);

        swal({
            'title': 'Cliente con cupo APROBADO',
            'content': elFields,
            'buttons': {
                'cancel': 'No',
                'confirm': 'Sí'
            },
            'closeOnClickOutside': false,
            'closeOnEsc': false,
            'className': 'swal-compact'
        }).then((value) => {
            if(value) {
                $('#formWizard input[name="envia_call"]').val('1');
                $('#formWizard input[name="val_sol"]').val($('#swalInputCupo').val());
                $('#formWizard input[name="notas_pos"]').val('AUMENTO DE CUPO');
            }
            iCtrlWizard.sendFormWizard();
        });
        return;
    }

    iCtrlWizard.sendFormWizard();
}

iCtrlWizard.validarCall = function(codCli) {
    togglePreloader(true);
    reqJSON({
        'path': urlWS+'/validarCall',
        'data': {
            'StrEmpresa': ctrlDataWizard.usuario.empresa,
            'cod_cli': codCli
        },
        'type': 'POST'
    }, function(err, response) {
        if(response) {
            if(response.data.length) {
                if(response.data[0].length) {
                    if(response.data[0][0]['estado'] == 0 || response.data[0][0]['estado'] == 1) {
                        swal({
                            'title': 'Ya tiene una solicitud',
                            'text': 'El cliente ya tiene una solicitud en estudio , por favor espere a ser atentido',
                            'icon': 'info',
                            'buttons': {
                                'cancel': false,
                                'confirm': 'Aceptar'
                            },
                            'closeOnClickOutside': false
                        }).then((value) => {
                        });

                        return;
                    }
                }
            }
        }

        isPending = false;
        iCtrlWizard.sendFormWizard();
    }, true);
}

var isSendWithCall = false;
iCtrlWizard.sendFormWizard = function() {
    if(isSendWithCall) { return; }

    if(!flagFormWizard) { return; }

    formToJSON('#formWizard');
    let formJSON = formToJSON('#formWizard');

    if(!formJSON.nom1_cli.length && !formJSON.ap1_cli.length) {
        return false;
    }

    // if(($('#formWizard input[name="tip_sol"]').val() == '07' || $('#formWizard input[name="tip_sol"]').val() == '05') && isPending) {
    if($('#formWizard input[name="envia_call"]').val() == '1' && isPending) {
        iCtrlWizard.validarCall(formJSON.cod_cli);
        return;
    }

    let pInds = ['p_ind_amacasa','p_ind_comercial','p_ind_estudiante','p_ind_histcrediti','p_ind_independiente','p_ind_laboral','p_ind_pensionado','p_ind_credito_cedula','p_ind_credito_codeudor'];
    for (let item of pInds) {
        let isItemChecked = $('input[name="'+item+'"]').is(':checked');
        formJSON[item] = (isItemChecked)? 'on': 'off';
    }
    formJSON.cliente_firma = $('#cedula input[name="cliente_firma"]:checked').val();
    formJSON.email = (formJSON.email)? formJSON.email.replace(/(\s)/g, ''): '';
    formJSON.cod_barrio = ((''+formJSON.cod_comuna != '999')? formJSON.cod_barrio: '99|999');
    formJSON.rl1_telefono = (formJSON.rl1_ind_telefono)? '('+formJSON.rl1_ind_telefono+')'+formJSON.rl1_telefono: formJSON.rl1_telefono;
    formJSON.rp1_tel = (formJSON.rp1_ind_tel)? '('+formJSON.rp1_ind_tel+')'+formJSON.rp1_tel: formJSON.rp1_tel;
    formJSON.rp2_tel = (formJSON.rp2_ind_tel)? '('+formJSON.rp2_ind_tel+')'+formJSON.rp2_tel: formJSON.rp2_tel;
    formJSON.rp3_tel = (formJSON.rp3_ind_tel)? '('+formJSON.rp3_ind_tel+')'+formJSON.rp3_tel: formJSON.rp3_tel;
    formJSON.rp4_tel = (formJSON.rp4_ind_tel)? '('+formJSON.rp4_ind_tel+')'+formJSON.rp4_tel: formJSON.rp4_tel;

    let arrRc = [];
    for (let item of [1,2,3,4]) {
        let valRc = {
            'codigo': formJSON['rc'+item+'_codigo'].replace(/(\s)/g, ''),
            'estado': formJSON['rc'+item+'_estado'].replace(/(\s)/g, '')
        }
        if(valRc.codigo.length && valRc.estado.length) {
            let strItemRc = valRc.codigo+''+valRc.estado;
            strItemRc = (strItemRc)? strItemRc.replace(/(\s)/g,''): '';
            let filterItemRc = ctrlDataWizard.strSave.comercial.filter(function(a) {
                return (''+a == ''+strItemRc)? true: false;
            });
            if(!filterItemRc.length) {
                arrRc.push(valRc);
            }
            formJSON['rc'+item+'_codigo'] = '0';
            formJSON['rc'+item+'_estado'] = 'CANCELADA';
        }
    }
    let countRc = 1;
    for (let item of arrRc) {
        formJSON['rc'+countRc+'_codigo'] = item.codigo;
        formJSON['rc'+countRc+'_estado'] = item.estado;
        if(''+item.codigo != '0') {
            let strItemRc = item.codigo+''+item.estado;
            ctrlDataWizard.strSave.comercial.push(((strItemRc)? strItemRc.replace(/(\s)/g,''): ''));
        }
        countRc++;
    }

    let arrRp = [];
    for (let item of [1,2,3,4]) {
        let valRp = {
            'nombre': formJSON['rp'+item+'_nombre'],
            'parentesco': formJSON['rp'+item+'_parentesco'].replace(/(\s)/g, ''),
            'cel': formJSON['rp'+item+'_cel'].replace(/(\s)/g, ''),
            'tel': formJSON['rp'+item+'_tel'].replace(/(\s)/g, '')
        }
        let strItemRp = valRp.nombre.replace(/(\s)/g, '')+''+valRp.parentesco+''+((valRp.cel)? valRp.cel: '')+''+((valRp.tel)? valRp.tel: '');
        strItemRp = (strItemRp)? strItemRp.replace(/(\s)/g,''): '';
        let filterItemRp = ctrlDataWizard.strSave.personal.filter(function(a) {
            return (''+a == ''+strItemRp)? true: false;
        });
        if(!filterItemRp.length) {
            if(valRp.nombre.replace(/(\s)/g, '').length && (valRp.cel.replace(/(\s)/g, '').length || valRp.tel.replace(/(\s)/g, '').length)) {
                arrRp.push(valRp);
            }
        }
        formJSON['rp'+item+'_nombre'] = '';
        formJSON['rp'+item+'_parentesco'] = '0';
        formJSON['rp'+item+'_cel'] = '';
        formJSON['rp'+item+'_tel'] = '';
    }
    let countRp = 1;
    for (let item of arrRp) {
        formJSON['rp'+countRp+'_nombre'] = item.nombre;
        formJSON['rp'+countRp+'_parentesco'] = item.parentesco;
        formJSON['rp'+countRp+'_cel'] = item.cel;
        formJSON['rp'+countRp+'_tel'] = item.tel;
        if(item.nombre.length) {
            let strItemRp = item.nombre+''+item.parentesco+''+((item.cel)? item.cel: '')+''+((item.tel)? item.tel: '');
            ctrlDataWizard.strSave.personal.push(((strItemRp)? strItemRp.replace(/(\s)/g,''): ''));
        }
        countRp++;
    }

    isSendWithCall = true;

    togglePreloader(true);
    iCtrlWizard.sendNewRequest(formJSON, function(err, responseNs) {
        if(err) { console.error(err) } /** Envio de cedula */
        setItemLS({
            'key': 'last_cc_'+ctrlDataWizard.usuario.nom_usu,
            'data': formJSON.cod_cli+'|'+formJSON.nom1_cli+' '+formJSON.nom2_cli+' '+formJSON.ap1_cli+' '+formJSON.ap2_cli
        });

        setTimeout(function() {
            // let valSideA = getValInput('#cedula input[name="side_a"]');
            // let valSideB = getValInput('#cedula input[name="side_b"]');
            // valSideA = valSideA.replace(/\s/g, '');
            // valSideB = valSideB.replace(/\s/g, '');
            let countSides = $('#cedula input[name="side_a"]')[0].files.length;

            if(countSides) {
                iCtrlWizard.onSubmitDocuments(function(responseSd) {
                    if(responseNs) {
                        if(responseNs.data && responseNs.data.length) {
                            if(responseNs.data[0].length) {
                                if(responseNs.data[0][0]) {
                                    if(typeof(responseNs.data[0][0].agentes) !== 'undefined') {
                                        if(responseNs.data[0][0].agentes < 1) {
                                            swal({
                                                title: 'Solicitud en cola',
                                                text: 'En este momento NO hay personal disponible para atender su solicitud. \nQueda en COLA para ser atendida por el CALL CENTER en un momento.',
                                                icon: 'warning',
                                                dangerMode: true
                                            }).then((value) => {
                                                sendingForm = true;
                                                window.location.reload();
                                            });
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    sendingForm = true;
                    window.location.reload();
                });
            }else {
                if(responseNs) {
                    if(responseNs.data && responseNs.data.length) {
                        if(responseNs.data[0].length) {
                            if(responseNs.data[0][0]) {
                                if(typeof(responseNs.data[0][0].agentes) !== 'undefined') {
                                    if(responseNs.data[0][0].agentes < 1) {
                                        swal({
                                            title: 'Solicitud en cola',
                                            text: 'En este momento NO hay personal disponible para atender su solicitud. \nQueda en COLA para ser atendida por el CALL CENTER en un momento.',
                                            icon: 'warning',
                                            dangerMode: true
                                        }).then((value) => {
                                            sendingForm = true;
                                            window.location.reload();
                                        });
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }

                sendingForm = true;
                window.location.reload();
            }
        }, 300);
        let elVal = getValInput('#formWizard .c-field[name="rc1_codigo"]');
        // ctrlDataWizard.isSubmit = true;
        // $('#formWizard #bSubmitFormWizard').click();
    });
}

iCtrlWizard.sendDirectFormWizard = function(flagPreloader) {
    if(!flagFormWizard) { return; }

    flagPreloader = (flagPreloader)? flagPreloader: false;
    let isModified = false;
    if($('#formWizard input[name="dat_general"]').val() == '1') {
        isModified = true;
    }else if($('#formWizard input[name="dat_laboral"]').val() == '1') {
        isModified = true;
    }else if($('#formWizard input[name="dat_comercial"]').val() == '1') {
        isModified = true;
    }else if($('#formWizard input[name="dat_personal"]').val() == '1') {
        isModified = true;
    }

    if(!isModified && !ctrlDataSeer.validClient.client.result) {
        // return false;
    }

    let formJSON = formToJSON('#formWizard');
    if(!formJSON.nom1_cli.length && !formJSON.ap1_cli.length) {
        return false;
    }
    let pInds = ['p_ind_amacasa','p_ind_comercial','p_ind_estudiante','p_ind_histcrediti','p_ind_independiente','p_ind_laboral','p_ind_pensionado','p_ind_credito_cedula','p_ind_credito_codeudor'];
    for (let item of pInds) {
        let isItemChecked = $('input[name="'+item+'"]').is(':checked');
        formJSON[item] = (isItemChecked)? 'on': 'off';
    }
    formJSON.cliente_firma = $('#cedula input[name="cliente_firma"]:checked').val();
    formJSON.email = (formJSON.email)? formJSON.email.replace(/(\s)/g, ''): '';
    formJSON.cod_barrio = ((''+formJSON.cod_comuna != '999')? formJSON.cod_barrio: '99|999');
    formJSON.cod_barrio = ((''+formJSON.cod_comuna != '999')? formJSON.cod_barrio: '99|999');
    formJSON.envia_call = "0";
    formJSON.rl1_telefono = (formJSON.rl1_ind_telefono)? '('+formJSON.rl1_ind_telefono+')'+formJSON.rl1_telefono: formJSON.rl1_telefono;
    formJSON.rp1_tel = (formJSON.rp1_ind_tel)? '('+formJSON.rp1_ind_tel+')'+formJSON.rp1_tel: formJSON.rp1_tel;
    formJSON.rp2_tel = (formJSON.rp2_ind_tel)? '('+formJSON.rp2_ind_tel+')'+formJSON.rp2_tel: formJSON.rp2_tel;
    formJSON.rp3_tel = (formJSON.rp3_ind_tel)? '('+formJSON.rp3_ind_tel+')'+formJSON.rp3_tel: formJSON.rp3_tel;
    formJSON.rp4_tel = (formJSON.rp4_ind_tel)? '('+formJSON.rp4_ind_tel+')'+formJSON.rp4_tel: formJSON.rp4_tel;

    let arrRc = [];
    for (let item of [1,2,3,4]) {
        let valRc = {
            'codigo': formJSON['rc'+item+'_codigo'].replace(/(\s)/g, ''),
            'estado': formJSON['rc'+item+'_estado'].replace(/(\s)/g, '')
        }
        if(valRc.codigo.length && valRc.estado.length) {
            let strItemRc = valRc.codigo+''+valRc.estado;
            strItemRc = (strItemRc)? strItemRc.replace(/(\s)/g,''): '';
            let filterItemRc = ctrlDataWizard.strSave.comercial.filter(function(a) {
                return (''+a == ''+strItemRc)? true: false;
            });
            if(!filterItemRc.length) {
                arrRc.push(valRc);
            }
            formJSON['rc'+item+'_codigo'] = '0';
            formJSON['rc'+item+'_estado'] = 'CANCELADA';
        }
    }
    let countRc = 1;
    for (let item of arrRc) {
        formJSON['rc'+countRc+'_codigo'] = item.codigo;
        formJSON['rc'+countRc+'_estado'] = item.estado;
        if(''+item.codigo != '0') {
            let strItemRc = item.codigo+''+item.estado;
            ctrlDataWizard.strSave.comercial.push(((strItemRc)? strItemRc.replace(/(\s)/g,''): ''));
        }
        countRc++;
    }

    let arrRp = [];
    for (let item of [1,2,3,4]) {
        let valRp = {
            'nombre': formJSON['rp'+item+'_nombre'],
            'parentesco': formJSON['rp'+item+'_parentesco'].replace(/(\s)/g, ''),
            'cel': formJSON['rp'+item+'_cel'].replace(/(\s)/g, ''),
            'tel': formJSON['rp'+item+'_tel'].replace(/(\s)/g, '')
        }
        let strItemRp = valRp.nombre.replace(/(\s)/g, '')+''+valRp.parentesco+''+((valRp.cel)? valRp.cel: '')+''+((valRp.tel)? valRp.tel: '');
        strItemRp = (strItemRp)? strItemRp.replace(/(\s)/g,''): '';
        let filterItemRp = ctrlDataWizard.strSave.personal.filter(function(a) {
            return (''+a == ''+strItemRp)? true: false;
        });


        if(ctrlDataSeer.validClient.client.tipo == 2){
            filterItemRp = false
        }

        if(!filterItemRp.length) {
            if(valRp.nombre.replace(/(\s)/g, '').length && (valRp.cel.replace(/(\s)/g, '').length || valRp.tel.replace(/(\s)/g, '').length)) {
                arrRp.push(valRp);
            }
        }


        formJSON['rp'+item+'_nombre'] = '';
        formJSON['rp'+item+'_parentesco'] = '0';
        formJSON['rp'+item+'_cel'] = '';
        formJSON['rp'+item+'_tel'] = '';
    }
    let countRp = 1;
    for (let item of arrRp) {
        formJSON['rp'+countRp+'_nombre'] = item.nombre;
        formJSON['rp'+countRp+'_parentesco'] = item.parentesco;
        formJSON['rp'+countRp+'_cel'] = item.cel;
        formJSON['rp'+countRp+'_tel'] = item.tel;
        if(item.nombre.length) {
            let strItemRp = item.nombre+''+item.parentesco+''+((item.cel)? item.cel: '')+''+((item.tel)? item.tel: '');
            ctrlDataWizard.strSave.personal.push(((strItemRp)? strItemRp.replace(/(\s)/g,''): ''));
        }
        countRp++;
    }

    if(flagPreloader) {
        togglePreloader(true);
    }

    iCtrlWizard.sendNewRequest(formJSON, function(err, responseNs) {
        if(err) { console.error(err) } /** Envio de cedula */
        $('#formWizard input[name="dat_general"]').val('0');
        $('#formWizard input[name="dat_laboral"]').val('0');
        $('#formWizard input[name="dat_comercial"]').val('0');
        $('#formWizard input[name="dat_personal"]').val('0');
        if(flagPreloader) {

            setItemLS({
                'key': 'last_cc_'+ctrlDataWizard.usuario.nom_usu,
                'data': formJSON.cod_cli+'|'+formJSON.nom1_cli+' '+formJSON.nom2_cli+' '+formJSON.ap1_cli+' '+formJSON.ap2_cli
            });

            setTimeout(function() { togglePreloader(false) }, 0);
        }
    });
}

iCtrlWizard.sendNewRequest = function(valData, fn) {
    let direccion = valData.direccion+' '+valData.di1_cli+' # '+valData.di2_cli;
    if(valData.di3_cli.length > 0) {
        direccion += ' - '+valData.di3_cli;
    }
    if(valData.unidad.length > 0) {
        let residence = valData.cod_residencia;
        residence = (residence)? residence: 'EDIFICIO';
        direccion += ' '+residence+' ('+valData.unidad+')';
    }else if(valData.cod_residencia) {
        let residence = valData.cod_residencia;
        residence = (residence)? residence: 'EDIFICIO';
        direccion += ' '+residence;
    }
    if(valData.di4_cli.length > 0) {
        direccion += ' INT '+valData.di4_cli;
    }
    let dataToSend = null;
    if(valData.update == 'on') {
        dataToSend = {
            'empresa': ctrlDataWizard.usuario.empresa,
            'nom_usu': ctrlDataWizard.usuario.nom_usu,
            'caja': ctrlDataWizard.usuario.caja.trim(),
            'cod_ven': ((ctrlDataWizard.usuario.vendedor)? ctrlDataWizard.usuario.vendedor: '0'),
            'val_sol': valData.val_sol.replace(/(\s)|(\$)|(\,)/g, ''),
            'notas_pos': ((valData.notas_pos)? valData.notas_pos: ''),
            'cliente_firma': ((valData.cliente_firma == 'si')? 1: 2),
            'cod_cli': ((valData.cod_cli)? valData.cod_cli: ''),
            'cod_ciu': ((valData.cod_ciu)? valData.cod_ciu: ''),
            'cod_pai': ((valData.cod_pai)? valData.cod_pai: ''),
            'di1_cli': direccion,
            'te1_cli': ((valData.te1_cli)? valData.te1_cli: ''),
            'fax_cli': ((valData.fax_cli)? valData.fax_cli: ''),
            'edad': ((valData.edad)? valData.edad: ''),
            'email': ((valData.email)? valData.email: ''),
            'envia_call': ((valData.envia_call)? valData.envia_call: '0'),
            'est_civ': ((valData.est_civ)? valData.est_civ: ''),
            'cod_barrio': valData.cod_barrio.split('|')[0],
            'cod_comuna': ((valData.cod_comuna)? valData.cod_comuna: ''),
            'id_firma': ((valData.id_firma)? valData.id_firma: ''),
            'ocup_cli': ((valData.ocup_cli)? valData.ocup_cli: ''),
            'sexo': ((valData.sexo)? valData.sexo: ''),
            'rp1_parentesco': ((valData.rp1_parentesco && valData.rp1_parentesco != '0')? valData.rp1_parentesco: ''),
            'rp1_nombre': ((valData.rp1_nombre)? valData.rp1_nombre: ''),
            'rp1_tel': ((valData.rp1_tel)? valData.rp1_tel: ''),
            'rp1_cel': ((valData.rp1_cel)? valData.rp1_cel: ''),
            'rp2_parentesco': ((valData.rp2_parentesco && valData.rp2_parentesco != '0')? valData.rp2_parentesco: ''),
            'rp2_nombre': ((valData.rp2_nombre)? valData.rp2_nombre: ''),
            'rp2_tel': ((valData.rp2_tel)? valData.rp2_tel: ''),
            'rp2_cel': ((valData.rp2_cel)? valData.rp2_cel: ''),
            'rp3_parentesco': ((valData.rp3_parentesco && valData.rp3_parentesco != '0')? valData.rp3_parentesco: ''),
            'rp3_nombre': ((valData.rp3_nombre)? valData.rp3_nombre: ''),
            'rp3_tel': ((valData.rp3_tel)? valData.rp3_tel: ''),
            'rp3_cel': ((valData.rp3_cel)? valData.rp3_cel: ''),
            'rp4_parentesco': ((valData.rp4_parentesco && valData.rp4_parentesco != '0')? valData.rp4_parentesco: ''),
            'rp4_nombre': ((valData.rp4_nombre)? valData.rp4_nombre: ''),
            'rp4_tel': ((valData.rp4_tel)? valData.rp4_tel: ''),
            'rp4_cel': ((valData.rp4_cel)? valData.rp4_cel: ''),
            'rl1_nom_emp': ((valData.rl1_nom_emp)? valData.rl1_nom_emp: ''),
            'rl1_area': ((valData.rl1_area)? valData.rl1_area: ''),
            'rl1_cargo': ((valData.rl1_cargo)? valData.rl1_cargo: ''),
            'rl1_telefono': ((valData.rl1_telefono)? valData.rl1_telefono: ''),
            'rl1_ext': ((valData.rl1_ext)? valData.rl1_ext: ''),
            'rc1_codigo': ((valData.rc1_codigo)? valData.rc1_codigo: '0'),
            'rc1_estado': ((valData.rc1_codigo)? valData.rc1_estado: ''),
            'rc2_codigo': ((valData.rc2_codigo)? valData.rc2_codigo: '0'),
            'rc2_estado': ((valData.rc2_codigo)? valData.rc2_estado: ''),
            'rc3_codigo': ((valData.rc3_codigo)? valData.rc3_codigo: '0'),
            'rc3_estado': ((valData.rc3_codigo)? valData.rc3_estado: ''),
            'rc4_codigo': ((valData.rc4_codigo)? valData.rc4_codigo: '0'),
            'rc4_estado': ((valData.rc4_codigo)? valData.rc4_estado: ''),
            'dat_general': ((valData.dat_general == '1')? '1': '0'),
            'dat_personal': ((valData.dat_personal == '1')? '1': '0'),
            'dat_laboral': ((valData.dat_laboral == '1')? '1': '0'),
            'dat_comercial': ((valData.dat_comercial == '1')? '1': '0'),
            'origen_act': ((valData.origen_act)? valData.origen_act: ''),
            'tip_sol': ((valData.tip_sol)? valData.tip_sol: ''),
        };
    }else {
        let fec_nac = valData.fec_nac.replace(/(\-)/g, '/');
        dataToSend = {
            'ap1_cli': ((valData.ap1_cli)? valData.ap1_cli: ''),
            'ap2_cli': ((valData.ap2_cli)? valData.ap2_cli: ''),
            'caja': ctrlDataWizard.usuario.caja.trim(),
            'cliente_firma': ((valData.cliente_firma == 'si')? 1: 2),
            'cod_pai': ((valData.cod_pai)? valData.cod_pai: ''),
            'cod_barrio': valData.cod_barrio.split('|')[0],
            'cod_comuna': ((valData.cod_comuna)? valData.cod_comuna: ''),
            'cod_ciu': ((valData.cod_ciu)? valData.cod_ciu: ''),
            'cod_cli': ((valData.cod_cli)? valData.cod_cli: ''),
            'cod_ven': ((ctrlDataWizard.usuario.vendedor)? ctrlDataWizard.usuario.vendedor: '0'),
            'di1_cli': direccion,
            'edad': ((valData.edad)? valData.edad: ''),
            'empresa': ctrlDataWizard.usuario.empresa,
            'email': ((valData.email)? valData.email: ''),
            'envia_call': ((valData.envia_call)? valData.envia_call: '0'),
            'est_civ': ((valData.est_civ)? valData.est_civ: ''),
            'fax_cli': ((valData.fax_cli)? valData.fax_cli: ''),
            'fec_nac': moment(fec_nac,'DD/MM/YYYY"').format('YYYYMMDD'),
            'id_firma': ((valData.id_firma)? valData.id_firma: ''),
            'nit_ciu': ((valData.nit_ciu)? valData.nit_ciu: ''),
            'nom_cli': valData.nom1_cli+' '+valData.nom2_cli+' '+valData.ap1_cli+' '+valData.ap2_cli,
            'nom1_cli': ((valData.nom1_cli)? valData.nom1_cli: ''),
            'nom2_cli': ((valData.nom2_cli)? valData.nom2_cli: ''),
            'nom_usu': ctrlDataWizard.usuario.nom_usu,
            'notas_pos': ((valData.notas_pos)? valData.notas_pos: ''),
            'ocup_cli': ((valData.ocup_cli)? valData.ocup_cli: ''),
            'sexo': ((valData.sexo)? valData.sexo: ''),
            'te1_cli': ((valData.te1_cli)? valData.te1_cli: ''),
            'tip_ide': ((valData.tip_ide)? valData.tip_ide: ''),
            'val_sol': valData.val_sol.replace(/(\s)|(\$)|(\,)/g, ''),
            'p_ind_estudiante': ((valData.p_ind_estudiante == 'on')? 1: 0),
            'p_ind_amacasa': ((valData.p_ind_amacasa == 'on')? 1: 0),
            'p_ind_independiente': ((valData.p_ind_independiente == 'on')? 1: 0),
            'p_ind_histcrediti': ((valData.p_ind_histcrediti == 'on')? 1: 0),
            'p_ind_pensionado': ((valData.p_ind_pensionado == 'on')? 1: 0),
            'p_ind_laboral': ((valData.p_ind_laboral == 'on')? 1: 0),
            'p_ind_comercial': ((valData.p_ind_comercial == 'on')? 1: 0),
            'rp1_parentesco': ((valData.rp1_parentesco && valData.rp1_parentesco != '0')? valData.rp1_parentesco: ''),
            'rp1_nombre': ((valData.rp1_nombre)? valData.rp1_nombre: ''),
            'rp1_tel': ((valData.rp1_tel)? valData.rp1_tel: ''),
            'rp1_cel': ((valData.rp1_cel)? valData.rp1_cel: ''),
            'rp2_parentesco': ((valData.rp2_parentesco && valData.rp2_parentesco != '0')? valData.rp2_parentesco: ''),
            'rp2_nombre': ((valData.rp2_nombre)? valData.rp2_nombre: ''),
            'rp2_tel': ((valData.rp2_tel)? valData.rp2_tel: ''),
            'rp2_cel': ((valData.rp2_cel)? valData.rp2_cel: ''),
            'rp3_parentesco': ((valData.rp3_parentesco && valData.rp3_parentesco != '0')? valData.rp3_parentesco: ''),
            'rp3_nombre': ((valData.rp3_nombre)? valData.rp3_nombre: ''),
            'rp3_tel': ((valData.rp3_tel)? valData.rp3_tel: ''),
            'rp3_cel': ((valData.rp3_cel)? valData.rp3_cel: ''),
            'rp4_parentesco': ((valData.rp4_parentesco && valData.rp4_parentesco != '0')? valData.rp4_parentesco: ''),
            'rp4_nombre': ((valData.rp4_nombre)? valData.rp4_nombre: ''),
            'rp4_tel': ((valData.rp4_tel)? valData.rp4_tel: ''),
            'rp4_cel': ((valData.rp4_cel)? valData.rp4_cel: ''),
            'rl1_nom_emp': ((valData.rl1_nom_emp)? valData.rl1_nom_emp: ''),
            'rl1_area': ((valData.rl1_area)? valData.rl1_area: ''),
            'rl1_cargo': ((valData.rl1_cargo)? valData.rl1_cargo: ''),
            'rl1_telefono': ((valData.rl1_telefono)? valData.rl1_telefono: ''),
            'rl1_ext': ((valData.rl1_ext)? valData.rl1_ext: ''),
            'rc1_codigo': ((valData.rc1_codigo)? valData.rc1_codigo: '0'),
            'rc1_estado': ((valData.rc1_codigo)? valData.rc1_estado: ''),
            'rc2_codigo': ((valData.rc2_codigo)? valData.rc2_codigo: '0'),
            'rc2_estado': ((valData.rc2_codigo)? valData.rc2_estado: ''),
            'rc3_codigo': ((valData.rc3_codigo)? valData.rc3_codigo: '0'),
            'rc3_estado': ((valData.rc3_codigo)? valData.rc3_estado: ''),
            'rc4_codigo': ((valData.rc4_codigo)? valData.rc4_codigo: '0'),
            'rc4_estado': ((valData.rc4_codigo)? valData.rc4_estado: ''),
            'dat_general': ((valData.dat_general == '1')? '1': '0'),
            'dat_personal': ((valData.dat_personal == '1')? '1': '0'),
            'dat_laboral': ((valData.dat_laboral == '1')? '1': '0'),
            'dat_comercial': ((valData.dat_comercial == '1')? '1': '0'),
            'origen_act': ((valData.origen_act)? valData.origen_act: ''),
            'tip_sol': ((valData.tip_sol)? valData.tip_sol: ''),
            'inicio': ((valData.p_ind_credito_cedula == 'on')? '18': ((valData.p_ind_credito_codeudor == 'on')? '03': valData.inicio))
        };
    }
    // /intranetCreditRequest
    reqJSON({
        'path': urlWS+((valData.update == 'on')? '/actualizarSolicitudCredito': '/intranetCreditRequest'),
        'data': dataToSend,
        'type': 'POST'
    }, function(err, responseNs) {
        fn(err, responseNs);
    }, true);
}

iCtrlWizard.initMaterialWizard = function() {
    $('#wizardProfile').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',
        'finishSelector': '.btn-finish',
        'cancelSelector': '.btn-cancel',
        onFinish: function(tab, navigation, index) {
            let isValidOldStep = false;
            if(iCtrlWizard.validStep6()) {
                // iCtrlWizard.saveAutManual();
                let isValidFileDocument = iCtrlWizard.validFileDocument();
                if(isValidFileDocument) {
                    let haveToSignPdfs = (ctrlDataSeer.validClient.codeudor)? iCtrlWizard.openPdfsModal(true): iCtrlWizard.openPdfsModal();
                    if(!haveToSignPdfs) {
                        iCtrlWizard.toggleSendFormWizard();
                    }else {
                        if(ctrlDataSeer.validClient.codeudor) {
                            swal({
                                'title': 'Codeudores registrados',
                                'text': 'No puede enviar la SOLICITUD AL CALLCENTER, faltan las siguientes AUTORIZACIONES.\n\nDebe firmar la AUTORIZACION CENTRALES, CONSENTIMIENTO DE DATOS, ACUERDO FIRMA ELECTRONICA.',
                                'icon': 'warning',
                                'buttons': {
                                    'cancel': false,
                                    'confirm': 'Aceptar'
                                },
                                'closeOnClickOutside': false
                            }).then((value) => {
                                iCtrlWizard.openPdfsModal();
                            });
                        }
                    }
                }
            }

            return isValidOldStep;
        },
        onNext: function(tab, navigation, index) {

            let isValidOldStep = true;
            if(!ctrlDataSeer.validClient.client.result && ctrlDataWizard.restricts) { // Cliente nuevo

                isValidOldStep = iCtrlWizard.onNextCreate();
                iCtrlSeer.updateProfilesSelected();

                if(index == 1) {
                    let profiles = [
                        'p_ind_amacasa', 'p_ind_estudiante',
                        'p_ind_independiente', 'p_ind_pensionado'
                    ];
                    let strProfilesSelected = '';
                    for (let profile of profiles) {
                        if($('input[name="'+profile+'"]').is(':checked')) {
                            let elId = $('#formWizard input[name="'+profile+'"]').prop('id');
                            strProfilesSelected = $('#formWizard input[name="'+profile+'"]').siblings('#formWizard label[for="'+elId+'"]').text();
                        }
                    }
                    if(strProfilesSelected.length) {
                        $('#formWizard input[name="rl1_nom_emp"]').val(strProfilesSelected.toUpperCase());
                        $('#formWizard input[name="dat_laboral"]').val('1');
                    }
                }

                if(index == 8) {
                    $('.nav-pills a[href="#resultado"]').tab('show');
                    $('#wizardProfile .btn-finish').show();
                }
                if(index == 9) {
                    $('#wizardProfile .btn-finish').show();
                }
                if(index !== 1) {
                    iCtrlWizard.sendDirectFormWizard();
                }
            }else { // Cliente actualización; 1=generales,2=ref-laborales,3=ref-comerciales,4=ref-personales,5=cedula,6=aut-centrales
                isValidOldStep = iCtrlWizard.onNextUpdate(index);



                if(index == 7) {
                    let skipTabCod = true;
                    if(ctrlDataSeer.historyClient.co) {
                        if(ctrlDataSeer.historyClient.co.length) {
                            skipTabCod = false;
                        }
                    }
                    if(skipTabCod) {
                        $('.nav-pills a[href="#resultado"]').tab('show');
                    }
                }
                if(isValidOldStep) {
                    if(index == 7) {
                        $('#wizardProfile .btn-finish').show();
                    }
                }

                if(index == 2 && flagDatRL && $('#formWizard input[name="dat_laboral"]').val() != '1') {
                    if(ctrlDataSeer.historyClient.rl.length) {
                        $('#formWizard input[name="dat_laboral"]').val('1');
                        flagDatRL = false;
                    }
                }
                //console.log(ctrlDataSeer.validClient.client.tipo)
                // if(index == 5){
                //     console.log('sigueiente huella')
                //     return
                // }


                iCtrlWizard.sendDirectFormWizard();
            }

            if(ctrlDataSeer.validClient.client.result) {
                let countSides = $('#cedula input[name="side_a"]')[0].files.length;
                if(countSides) {
                    iCtrlWizard.onSubmitDocuments(function(responseSd) { });
                }
            }

            iCtrlWizard.refreshTabSelected();

            if($('#formWizard input[name="p_ind_credito_cedula"]').is(':checked')) {
                $('#alertAttached').show();
            }

            // return false;

            return isValidOldStep;
        },
        onPrevious: function(tab, navigation, index) {
            iCtrlWizard.onPreviousAll(index);

            if(!ctrlDataSeer.validClient.client.result) {
                if(index !== 9) {
                    $('#wizardProfile .btn-finish').hide();
                }
            }else {
                if(index !== 8) {
                    $('#wizardProfile .btn-finish').hide();
                }
            }

            if(ctrlDataSeer.validClient.client.result) {
                let countSides = $('#cedula input[name="side_a"]')[0].files.length;
                if(countSides) {
                    iCtrlWizard.onSubmitDocuments(function(responseSd) { });
                }
            }

            iCtrlWizard.refreshTabSelected();

            return false;
        },
        onTabClick: function(tab, navigation, index, newIndex) {
            if($('#formWizard input[name="tip_sol"]').val() == '08') {
                return false;
            }

            let isValidOldStep = true;
            if(!ctrlDataSeer.validClient.client.result && ctrlDataWizard.restricts) {
                let nextStep = (newIndex < index)? true: false;
                if(nextStep) {
                    if(newIndex !== 8) {
                        $('#wizardProfile .btn-finish').hide();
                    }
                }
                isValidOldStep = nextStep;
            }else {
                // if(ctrlDataWizard.restricts) {
                //     let nextStep = (newIndex < index)? true: false;
                //     if(nextStep) {
                //         if(newIndex !== 7) {
                //             $('#wizardProfile .btn-finish').hide();
                //         }
                //     }
                //     isValidOldStep = nextStep;
                // }else {
                //     if(newIndex > 5) {
                //         let haveToSignPdfs = iCtrlWizard.openPdfsModal();
                //         if(haveToSignPdfs) {
                //             isValidOldStep = false;
                //         }
                //     }
                    if(isValidOldStep && newIndex == 8) {
                        $('#wizardProfile .btn-finish').show();
                    }else {
                        $('#wizardProfile .btn-finish').hide();
                    }
                // }

                if(isValidOldStep) {
                    iCtrlWizard.sendDirectFormWizard();
                }
            }

            if(ctrlDataSeer.validClient.client.result) {
                // let valSideA = getValInput('#cedula input[name="side_a"]');
                // let valSideB = getValInput('#cedula input[name="side_b"]');
                // valSideA = valSideA.replace(/\s/g, '');
                // valSideB = valSideB.replace(/\s/g, '');
                let countSides = $('#cedula input[name="side_a"]')[0].files.length;

                if(countSides) {
                    iCtrlWizard.onSubmitDocuments(function(responseSd) { });
                }
            }

            if(!ctrlDataWizard.restricts) {
                if(newIndex == 1) {
                    // setTimeout(function() { $('#formWizard .c-field[name="fax_cli"]').focus(); }, 100);
                }
                if(newIndex == 2) {
                    // setTimeout(function() { $('#formWizard .c-field[name="rl1_nom_emp"]').focus(); }, 100);
                }
                if(newIndex == 3) {
                    // setTimeout(function() { $('#formWizard .c-field[name="text_rc1_codigo"]').focus(); }, 100);
                }
                if(newIndex == 4) {
                    // setTimeout(function() { $('#formWizard .c-field[name="rp1_nombre"]').focus(); }, 100);
                }
                if(newIndex == 7) {
                    // setTimeout(function() { $('#formWizard .c-field[name="val_sol"]').focus(); }, 100);
                }
            }

            iCtrlWizard.refreshTabSelected();

            return isValidOldStep;
        },
        onInit: function(tab, navigation, index) {
            let $next = $('#wizardProfile .btn-next');
            setTimeout(function() {
                $next.removeClass('disabled');
            },800);
        }
    });
}

iCtrlWizard.refreshTabSelected = function() {
    let elActive = $('.nav-pills a.active');
    if(elActive.length) {
        setTimeout(function() {
            elActive = $('.nav-pills a.active');
            $('select[name="tab_selected"]').val(elActive[0].dataset.idTab);

            setTimeout(function() {
                elActive = $('.nav-pills a.active');
                $('select[name="tab_selected"]').val(elActive[0].dataset.idTab);
            }, 300);
        }, 0);
    }
}

iCtrlWizard.onPreviousAll = function(index) {
    let validSteps = [
        {'tab': 'perfil', 'valid': (!ctrlDataSeer.validClient.client.result), 'next': 'generales'},
        {'tab': 'generales', 'valid': true, 'next': 'ref-laborales'},
        {'tab': 'ref-laborales', 'valid': ($('#formWizard input[name="p_ind_laboral"]').is(':checked')), 'next': 'ref-comerciales'},
        {'tab': 'ref-comerciales', 'valid': ($('#formWizard input[name="p_ind_comercial"]').is(':checked')), 'next': 'ref-personales'},
        {'tab': 'ref-personales', 'valid': true, 'next': 'huella'},
        {'tab': 'huella', 'valid': ((ctrlDataWizard.usuario.valid_huella) ? iCtrlWizard.validFingerprint(true) :  true), 'next': 'cedula'},
        {'tab': 'cedula', 'valid': true, 'next': 'aut-centrales'},
        {'tab': 'aut-centrales', 'valid': true, 'next': 'codeudor'},
        {'tab': 'codeudor', 'valid': ((ctrlDataSeer.historyClient.co)? ((ctrlDataSeer.historyClient.co.length)? true: false): false), 'next': 'resultado'},
        {'tab': 'resultado', 'valid': true, 'next': null}
    ];


    if(ctrlDataSeer.validClient.client.result) {
        validSteps.splice(0, 1);
    }

    let valStepIndex = validSteps[index];
    if(!ctrlDataWizard.usuario.valid_huella) {
        if(valStepIndex.tab == 'huella') {
            $('.nav-pills a[href="#ref-personales"]').tab('show');
        }
        return false;
    }

    if(!valStepIndex.valid) {
        iCtrlWizard.onPreviousAll((index - 1));
    }else {
        $('.nav-pills a[href="#'+valStepIndex.tab+'"]').tab('show');
    }

    return true;
}

iCtrlWizard.onNextUpdate = function(index) {
    let validSteps = [
        {'tab': 'perfil', 'valid': true, 'next': 'generales'},
        {'tab': 'generales', 'valid': iCtrlWizard.validStep2(), 'next': 'ref-laborales'},
        {'tab': 'ref-laborales', 'valid': (($('#formWizard input[name="p_ind_laboral"]').is(':checked'))? iCtrlWizard.validStep3(): true), 'next': 'ref-comerciales'},
        {'tab': 'ref-comerciales', 'valid': (($('#formWizard input[name="p_ind_comercial"]').is(':checked'))? iCtrlWizard.validStep4(): true), 'next': 'ref-personales'},
        {'tab': 'ref-personales', 'valid': iCtrlWizard.validStep5(), 'next': 'huella'},
        {'tab': 'huella', 'valid': ((ctrlDataWizard.usuario.valid_huella)? iCtrlWizard.validFingerprint(true): true ), 'next': 'cedula'},
        {'tab': 'cedula', 'valid': iCtrlWizard.validFileDocument(true), 'next': 'aut-centrales'},
        {'tab': 'aut-centrales', 'valid': !iCtrlWizard.openPdfsModal(true), 'next': 'codeudor'},
        {'tab': 'codeudor', 'valid': true, 'next': 'resultado'},
        {'tab': 'resultado', 'valid': iCtrlWizard.validStep6(), 'next': null}
    ];



    if($('#formWizard input[name="origen_act"]').val() == 'I' || $('#formWizard input[name="origen_act"]').val() == 'V' || $('#formWizard input[name="origen_act"]').val() == 'A') {
        if(index == 1) {
            validSteps[2] = {
                'tab': 'ref-laborales',
                'valid': (!$('#formWizard input[name="p_ind_laboral"]').is(':checked')),
                'next': 'ref-comerciales'
            };
        }else if(index == 2) {
            validSteps[3] = {
                'tab': 'ref-comerciales',
                'valid': (!$('#formWizard input[name="p_ind_comercial"]').is(':checked')),
                'next': 'ref-personales'
            };
        }
    }

    let nextInValidStep = null;
    for (let iStep of validSteps) {
        if(!iStep.valid) {
            nextInValidStep = iStep.tab;
            if(nextInValidStep == 'huella') {
                iCtrlWizard.validFingerprint();
            }
            if(nextInValidStep == 'cedula') {
                iCtrlWizard.validFileDocument();
            }
            if(nextInValidStep == 'aut-centrales') {
                if(iCtrlWizard.validFileDocument()) {
                    iCtrlWizard.openPdfsModal();
                }
            }
            break;
        }
    }

    if(nextInValidStep) {
        if(nextInValidStep == 'resultado') {
            $('#wizardProfile .btn-finish').show();
        }

        setTimeout(function() {
            $('.nav-pills a[href="#'+nextInValidStep+'"]').tab('show');
        }, 0);
        return false;
    }

    return true;
}

iCtrlWizard.onNextCreate = function() {
    let validSteps = [
        {'tab': 'perfil', 'valid': iCtrlWizard.validStep1(), 'next': 'generales'},
        {'tab': 'generales', 'valid': iCtrlWizard.validStep2(), 'next': 'ref-laborales'},
        {'tab': 'ref-laborales', 'valid': (($('#formWizard input[name="p_ind_laboral"]').is(':checked'))? iCtrlWizard.validStep3(): true), 'next': 'ref-comerciales'},
        {'tab': 'ref-comerciales', 'valid': (($('#formWizard input[name="p_ind_comercial"]').is(':checked'))? iCtrlWizard.validStep4(): true), 'next': 'ref-personales'},
        {'tab': 'ref-personales', 'valid': iCtrlWizard.validStep5(), 'next': 'huella'},
        {'tab': 'huella', 'valid': ((ctrlDataWizard.usuario.valid_huella)? iCtrlWizard.validFingerprint(true): true), 'next': 'cedula'},
        {'tab': 'cedula', 'valid': iCtrlWizard.validFileDocument(true), 'next': 'aut-centrales'},
        {'tab': 'aut-centrales', 'valid': !iCtrlWizard.openPdfsModal(true), 'next': 'codeudor'},
        {'tab': 'codeudor', 'valid': true, 'next': 'resultado'},
        {'tab': 'resultado', 'valid': iCtrlWizard.validStep6(), 'next': null}
    ];

    // ctrlDataSeer.historyClient.rl.length
    // ctrlDataSeer.historyClient.rc.length
    // ctrlDataSeer.historyClient.rp.length

    let nextInValidStep = null;
    for (let iStep of validSteps) {
        if(!iStep.valid) {
            nextInValidStep = iStep.tab;
            if(nextInValidStep == 'huella') {
                iCtrlWizard.validFingerprint();
            }
            if(nextInValidStep == 'cedula') {
                iCtrlWizard.validFileDocument();
            }
            if(nextInValidStep == 'aut-centrales') {
                if(iCtrlWizard.validFileDocument()) {
                    iCtrlWizard.openPdfsModal();
                }
            }
            break;
        }
    }

    if(nextInValidStep) {
        if(nextInValidStep == 'generales') {
            setTimeout(function() { $('#formWizard .c-field[name="nit_ciu"]').focus(); }, 50);
        }
        if(nextInValidStep == 'ref-laborales') {
            setTimeout(function() { $('#formWizard .c-field[name="rl1_nom_emp"]').focus(); }, 50);
        }
        if(nextInValidStep == 'ref-comerciales') {
            setTimeout(function() { $('#formWizard .c-field[name="text_rc1_codigo"]').focus(); }, 50);
        }
        if(nextInValidStep == 'ref-personales') {
            setTimeout(function() { $('#formWizard .c-field[name="rp1_nombre"]').focus(); }, 50);
        }
        if(nextInValidStep == 'resultado') {
            $('#wizardProfile .btn-finish').show();
        }

        setTimeout(function() {
            $('.nav-pills a[href="#'+nextInValidStep+'"]').tab('show');
        }, 0);
        return false;
    }

    return true;
}

iCtrlWizard.onFinger = function(indFinger) {
    let totalFingerExists = $('#hands .finger.finger-exist').length;
    let hasFingerExist = $('#hands #finger'+indFinger).hasClass('finger-exist');
    let totalFingerSelected = $('#hands .finger-selected').length;
    let hasFingerSelected = $('#hands #finger'+indFinger).hasClass('finger-selected');
    if(hasFingerSelected) {
        $('#hands #finger'+indFinger).toggleClass('finger-selected');
        return false;
    }

    if(ctrlDataSeer.validClient.fingers.length >= 2) {
        swal({
            title: '¡Importante!',
            text: 'El cliente ya tiene las huellas registradas.',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return false;
    }

    if((totalFingerExists + totalFingerSelected) >= 2 || hasFingerExist) {
        return false;
    }

    $('#hands #finger'+indFinger).toggleClass('finger-selected');
}

iCtrlWizard.registerFingerprints = function(input) {

    if(ctrlDataWizard.updateFinger){
        iCtrlWizard.checkFingerprintVerification();
        console.log('valida huellas')
        return
    }

    console.log('registrar huellas')

    if(!ctrlDataWizard.usuario.valid_huella) {
        swal({
            title: '¡Importante!',
            text: 'La huella se encuentra inhabilitada para este almacen.',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return false;
    }

    let totalFingerExists = (input)? $('#reg_hands .finger.finger-exist').length: $('#hands .finger.finger-exist').length;
    if(totalFingerExists >= 2 || ctrlDataSeer.validClient.fingers.length >= 2) {
        swal({
            title: '¡Importante!',
            text: 'El cliente ya tiene las huellas registradas.',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return false;
    }

    let codCli = getValInput('#formWizard .c-field[name="cod_cli"]');
    let dataFingers = [];
    let elSel = (input)? '#reg_hands .finger.finger-selected': '#hands .finger.finger-selected';
    $(elSel).each(function(elInd, el) {
        dataFingers.push({
            'nit': codCli,
            'dedo': el.dataset.finger
        })
    });

    let totalFingerSelected = (input)? $('#reg_hands .finger-selected').length: $('#hands .finger-selected').length;
    let totalFingersCheck = (totalFingerSelected + totalFingerExists);
    if(totalFingersCheck < 2) {
        swal({
            title: 'Selección de huellas',
            text: 'Debe seleccionar minimo dos dedos (Uno por cada mano)',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return;
    }

    let elPreloader = document.createElement("img");
    elPreloader.setAttribute("src", urlPreloader);
    // let nameFinger = ctrlDataWizard.fingers[parseInt(dataFingers[indDataFingers].dedo)];
    swal({
        'title': 'Registrando huellas',// +((nameFinger)? nameFinger.description: ''),
        'content': elPreloader,
        'buttons': { 'cancel': false },
        'closeOnClickOutside': false,
        'closeOnEsc': false
    }).then((value) => {
        if(value == 'resend') {
            // #code
        }else {
            if(registerFingerprintsInterval) {
                clearTimeout(registerFingerprintsInterval);
            }
        }
    });

    iCtrlWizard.rcRegisterFingerprints(dataFingers, 0, function(arrIds) {
        iCtrlWizard.rcRegisterFingerprintsExtend(arrIds, 0, function(dataset) {
            swal.close();
            isRegFp = true;
            if(input) {
                ctrlDataWizard.isValidFinger = true;
                iCtrlSeerOptional.onSubmitFormSeerOptional();
                $('#fingerprintRegModal').modal('hide');
            }
            console.log("Finish...");
        });
    });
}



iCtrlWizard.rcRegisterFingerprintsExtend = function(arrIds, indIds, fn) {
    if(arrIds.length == indIds) {
        fn(true);
        return;
    }
    if(!arrIds[indIds]['id']) {
        indIds++;
        iCtrlWizard.rcRegisterFingerprintsExtend(arrIds, indIds, fn);
        return;
    }

    iCtrlWizard.isRegisterFingerprints(arrIds[indIds].id, function(dataRegister) {
        if(!dataRegister) {
            swal.close();
            swal({
                'title': 'Registro cancelado',
                'text': 'El registro de la huella se ha cancelado',
                'icon': 'warning',
                'dangerMode': true
            }).then((value) => {});
            fn(false); return
        }
        $('#hands #finger'+arrIds[indIds].dedo).removeClass('finger-selected');
        $('#hands #finger'+arrIds[indIds].dedo).addClass('finger-exist');

        $('#reg_hands #reg_finger'+arrIds[indIds].dedo).removeClass('finger-selected');
        $('#reg_hands #reg_finger'+arrIds[indIds].dedo).addClass('finger-exist');

        indIds++;
        iCtrlWizard.rcRegisterFingerprintsExtend(arrIds, indIds, fn);
    });
}

iCtrlWizard.rcRegisterFingerprints = function(dataFingers, indDataFingers, fn) {
    if(dataFingers.length == indDataFingers) {
        fn(dataFingers);
        return;
    }

    reqJSON({
        'path': urlWS+'/huellaRegistroEstado',
        'data': {
            'caja': ctrlDataWizard.usuario.caja,
            'dedo': dataFingers[indDataFingers].dedo,
            'empresa': ctrlDataWizard.usuario.empresa,
            'estado': 1,
            'id': 0,
            'nit': dataFingers[indDataFingers].nit,
            'nom_usu': ctrlDataWizard.usuario.nom_usu,
            'tipo': 1
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { fn(dataFingers); return }
        dataFingers[indDataFingers]['id'] = response.data[0][0].id;
        indDataFingers++;
        iCtrlWizard.rcRegisterFingerprints(dataFingers, indDataFingers, fn);
    }, true);
}

var registerFingerprintsInterval = null;
iCtrlWizard.isRegisterFingerprints = function(idRegister, fn) {
    if(registerFingerprintsInterval) {
        clearTimeout(registerFingerprintsInterval);
    }

    registerFingerprintsInterval = setTimeout(function() {
        reqJSON({
            'path': urlWS+'/huellaValidaEstado',
            'data': {
                'id': idRegister
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { fn(false); return }
            if(response.data[0].length) {
                if(response.data[0][0].estado == 2) {
                    ctrlDataSeer.historyClient.fp.push(response.data[0][0]);
                    fn(response);
                    return;
                }else if(response.data[0][0].estado == 3) {
                    fn(false);
                    return;
                }
            }

            iCtrlWizard.isRegisterFingerprints(idRegister, fn);
        }, true);
    }, 3000);
}

/**
* @description iCtrlWizard.onFingerVerification
* @param {string}
* @return {void}
*/
iCtrlWizard.onFingerVerification = function(indFinger) {
    if(ctrlDataSeer.validClient.fingers) {
    //     let filterFinger = ctrlDataSeer.validClient.fingers.filter(function(a) {
    //         return (parseInt(a.dedo) == parseInt(indFinger))? true: false;
    //     })[0];
    //     if(filterFinger) {
    //         $('#modal_hands .finger').removeClass('finger-selected');
    //         setTimeout(function() {
    //             $('#modal_hands #modal_finger'+indFinger).addClass('finger-selected');
    //         }, 0);
    //     }
    }
}
/**
* @description iCtrlWizard.checkFingerprintVerification
* @param {string}
* @return {void}
*/
iCtrlWizard.checkFingerprintVerification = function() {
    let codCli = ctrlDataSeer.validClient.client.cod_cli;
    let dataFingers = [];
    dataFingers.push({
        'nit': codCli,
        'dedo': 0,
        'tipo': 2
    });
    // $('#modal_hands .finger.finger-selected').each(function(elInd, el) {
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

    iCtrlWizard.rcCheckFingerprintVerification(dataFingers, 0, function(finish) {
        $('#fingerprintModal').modal('hide');
        swal.close();
        console.log("Finish...");
    });
}
/**
* @description iCtrlWizard.rcCheckFingerprintVerification
* @param {string}
* @return {void}
*/
iCtrlWizard.rcCheckFingerprintVerification = function(dataFingers, indDataFingers, fn) {
    if(dataFingers.length == indDataFingers) {
        swal.close();
        fn(true);
        return;
    }

    let elPreloader = document.createElement("img");
    elPreloader.setAttribute("src", urlPreloader);
    let nameFinger = ctrlDataWizard.fingers[parseInt(dataFingers[indDataFingers].dedo)];
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
        iCtrlWizard.isCheckFingerprintVerification(response.data[0][0].id, function(dataRegister) {
            if(!dataRegister) {
                swal({
                    'title': 'Verifición cancelada',
                    'text': 'La verificación de la huella se ha cancelado',
                    'icon': 'warning',
                    'dangerMode': true
                }).then((value) => {});
                fn(false); return
            }
            $('#hands #finger'+dataFingers[indDataFingers].dedo).removeClass('finger-selected');
            $('#hands #finger'+dataFingers[indDataFingers].dedo).addClass('finger-exist');

            indDataFingers++;
            iCtrlWizard.rcCheckFingerprintVerification(dataFingers, indDataFingers, fn);
        });
    });
}
/**
* @description iCtrlWizard.isCheckFingerprintVerification
* @param {string}
* @return {void}
*/
var checkFingerprintVerificationInterval = null;
iCtrlWizard.isCheckFingerprintVerification = function(idRegister, fn) {
    if(checkFingerprintVerificationInterval) {
        clearTimeout(checkFingerprintVerificationInterval);
    }

    checkFingerprintVerificationInterval = setTimeout(function() {
        reqJSON({
            'path': urlWS+'/huellaValidaEstado',
            'data': {
                'id': idRegister
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { fn(false); return }
            if(response.data[0].length) {
                if(response.data[0][0].estado == 2) {
                    ctrlDataWizard.isValidFinger = true;
                    ctrlDataWizard.updateFinger  = false;
                    $('#fingerprintModal').modal('hide');
                    fn(response);
                    return;
                }else if(response.data[0][0].estado == 3) {
                    ctrlDataWizard.isValidFinger = false;
                    $('#fingerprintModal').modal('hide');
                    fn(false);
                    return;
                }
            }

            iCtrlWizard.isCheckFingerprintVerification(idRegister, fn);
        }, true);
    }, 3000);
}


iCtrlWizard.validFingerprint = function(ignoreOpenAlert) {

    let result = true;
    let text = 'Debe registrar minimo dos huellas del cliente.'

    if(!ctrlDataSeer.historyClient.fp) {
        ctrlDataSeer.historyClient['fp'] = [];
    }

    let totalFingerExists = $('#hands .finger.finger-exist').length;



    if(totalFingerExists < 2) {
        result = false;

    }

    if( ctrlDataWizard.updateFinger ){
        $('#btn-hands').html('Validar huella')
        text ='Debe validar la huella del cliente'
        result =  false
    }



    if(!result && !ignoreOpenAlert) {
        let elContent = document.createElement("div");
        let attrClass = document.createAttribute("class");
        elContent.setAttributeNode(attrClass);
        elContent.innerHTML = '<div class="swal-text w-100 text-center m-0">'+text+'<br></div>';

        swal({
            'title': 'Registro de huella',
            'content': elContent,
            'icon': 'warning',
            'html': true,
            'dangerMode': true
        }).then((value) => {});
    }





    return result;
}

iCtrlWizard.validFileDocument = function(ignoreOpenAlert) {
    let result = true;
    let valFotoCedula = getValInput('#generales input[name="foto_cedula"]');
    let countSides = $('#cedula input[name="side_a"]')[0].files.length;

    if(valFotoCedula != '1') {
        if(ctrlDataSeer.validClient.client.result) {
            if(!countSides || countSides < 2) {
                if(!ctrlDataSeer.historyClient.cc.length) {
                    if(valFotoCedula != '1') {
                        result = false;
                    }
                }else if(!ctrlDataSeer.historyClient.cc[0].cc1 || !ctrlDataSeer.historyClient.cc[0].cc2) {
                    if(valFotoCedula != '1') {
                        result = false;
                    }
                }
            }
        }else {
            if(!countSides || countSides < 2) {
                result = false;
            }
        }

        if(!result && !ignoreOpenAlert) {
            swal({
                title: 'Adjuntos de la cédula',
                text: 'Para continuar, adjunte los archivos de la cédula. \nDebe seleccionar las dos caras al mismo tiempo.',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
        }
    }else {
        let isIndCC = $('#formWizard input[name="p_ind_credito_cedula"]').is(':checked');
        let haveAttacheds = ($('#cedula #prevAttached1').attr('src') || $('#cedula #prevAttached2').attr('src'));
        if(isIndCC) {
            if(!haveAttacheds) {
                result = false;
            }
        }

        if(!result && !ignoreOpenAlert) {
            swal({
                title: 'Otros documentos',
                text: 'Para continuar, adjunte por lo menos otro documento.',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
        }
    }

    return result;
}

iCtrlWizard.validStep1 = function(elSelector, flag) {
    let countSelected = 0;
    for (let item of ctrlDataWizard.validations.step1) {
        let elChecked = $('#formWizard input[name="'+item+'"]').is(':checked');
        if(elChecked) {
            countSelected++;
        }
    }

    for (let item of ctrlDataWizard.validations.step1) {
        if(!countSelected) {
            iCtrlWizard.toggleHasError('#formWizard input[name="'+item+'"]', true);
        }else {
            iCtrlWizard.toggleHasError('#formWizard input[name="'+item+'"]', false);
        }
    }

    return ((countSelected)? true: false);
}

iCtrlWizard.validStep2 = function(elSelector, flag) {
    let result = true;
    for (let item of ctrlDataWizard.validations.step2) {
        let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');

        if(
            item == 'di1_cli' || item == 'di2_cli' ||
            item == 'di3_cli' || item == 'text_ocup_cli' ||
            item == 'ocup_cli'
        ) {
            if(!elVal) {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
            }
        }else {
            if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
            }
        }
    }
    let valTel = {
        'te1_cli': getValInput('#formWizard .c-field[name="te1_cli"]'),
        'te2_cli': getValInput('#formWizard .c-field[name="te2_cli"]'),
        'fax_cli': getValInput('#formWizard .c-field[name="fax_cli"]')
    }
    valTel.te1_cli = valTel.te1_cli.replace(/(\s)/g, '');
    valTel.te2_cli = valTel.te2_cli.replace(/(\s)/g, '');
    valTel.fax_cli = valTel.fax_cli.replace(/(\s)/g, '');
    if(
        (!valTel.te1_cli.length && !valTel.fax_cli.length) ||
        (
            valTel.te1_cli == '0' || valTel.fax_cli == '0' ||
            valTel.te1_cli == '00' || valTel.fax_cli == '00' ||
            valTel.te1_cli == '000' || valTel.fax_cli == '000' ||
            valTel.te1_cli == '0000' || valTel.fax_cli == '0000' ||
            valTel.te1_cli == '00000' || valTel.fax_cli == '00000'
        ) ||
        (valTel.te1_cli.length < 7 && valTel.fax_cli.length < 10)
    ) {
        iCtrlWizard.toggleHasError('#formWizard .c-field[name="te1_cli"]', true);
        iCtrlWizard.toggleHasError('#formWizard .c-field[name="fax_cli"]', true);
        result = false;
    }else {
        iCtrlWizard.toggleHasError('#formWizard .c-field[name="te1_cli"]', false);
        iCtrlWizard.toggleHasError('#formWizard .c-field[name="fax_cli"]', false);
    }
    return result;
}
iCtrlWizard.validStep3 = function(elSelector, flag) {
    let result = true;
    let noValidate = (!$('#formWizard input[name="p_ind_laboral"]').is(':checked'));
    if(noValidate) {
        return result;
    }

    for (let item of ctrlDataWizard.validations.step3) {
        let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');
        if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
            result = false;
        }else {
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
        }
    }
    return result;
}
iCtrlWizard.validStep6 = function(elSelector, flag) {
    let result = true;
    for (let item of ctrlDataWizard.validations.step6) {
        let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');
        if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
            result = false;
        }else {
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
            iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
        }
    }
    return result;
}

iCtrlWizard.validStep4 = function(elSelector, flag) {
    let result = true;
    if(ctrlDataSeer.validClient.client.result) {
        return result;
    }
    let isTrade = $('#pIndComercial').is(':checked');
    if(isTrade) {
        for (let item of ctrlDataWizard.validations.step4) {
            let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
            elVal = ''+elVal.replace(/(\s)/g, '');
            if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
                // iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
                // iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
            }
        }
    }

    return result;
}

iCtrlWizard.validStep5 = function(elSelector, flag) {
    let result = true;
    let countRowsOk = 0;

    for (let item of ctrlDataWizard.validations.step5) {
        let elVal = getValInput('#formWizard .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');
        let indVal = numeral(item)._value;

        if(indVal == 3 || indVal == 4) {
            let elVal2 = getValInput('#formWizard .c-field[name="rp'+indVal+'_nombre"]');
            elVal2 = ''+elVal2.replace(/(\s)/g, '');
            if(elVal2.length) {
                if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                    iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
                    iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
                    // result = false;
                }else {
                    iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
                    iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
                }
            }
        }else {
            if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', true);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', true);
                // result = false;
            }else {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="'+item+'"]', false);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="text_'+item+'"]', false);
            }
        }
    }

    for (let item of [1,2,3,4]) {
        let valRp = {
            'nombre': getValInput('#formWizard .c-field[name="rp'+item+'_nombre"]').replace(/(\s)/g, ''),
            'cel': getValInput('#formWizard .c-field[name="rp'+item+'_cel"]').replace(/(\s)/g, ''),
            'tel': getValInput('#formWizard .c-field[name="rp'+item+'_tel"]').replace(/(\s)/g, ''),
            'parentesco': getValInput('#formWizard .c-field[name="rp'+item+'_parentesco"]').replace(/(\s)/g, '')
        }
        if(valRp.nombre.length) {
            if((!valRp.cel.length && !valRp.tel.length) || (valRp.cel.length < 10 && valRp.tel.length < 7)) {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_cel"]', true);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_tel"]', true);
            }else if(!valRp.parentesco || valRp.parentesco == '0' || valRp.parentesco == '00') {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_parentesco"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_cel"]', false);
                iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_tel"]', false);
                countRowsOk++;
            }
        }
    }
    if(countRowsOk < 2) {
        result = false;
    }
    return result;
}
// iCtrlWizard.validStep5 = function(elSelector, flag) {
//     let result = true;
//     let countRowsOk = 0;
//     for (let item of [1,2,3,4]) {
//         let valRp = {
//             'nombre': getValInput('#formWizard .c-field[name="rp'+item+'_nombre"]').replace(/(\s)/g, ''),
//             'cel': getValInput('#formWizard .c-field[name="rp'+item+'_cel"]').replace(/(\s)/g, ''),
//             'tel': getValInput('#formWizard .c-field[name="rp'+item+'_tel"]').replace(/(\s)/g, ''),
//             'par': getValInput('#formWizard .c-field[name="rp'+item+'_parentesco"]').replace(/(\s)/g, '')
//         }
//         let isOk = true;
//         for (let kValRp in valRp) {
//             if(kValRp !== 'cel' && kValRp !== 'tel') {
//                 let elVal = valRp[kValRp];
//                 elVal = ''+elVal.replace(/(\s)/g, '');
//                 if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
//                     isOk = false;
//                 }
//             }
//         }
//
//         if(valRp.nombre.length) {
//             if((!valRp.cel.length && !valRp.tel.length) || (valRp.cel.length < 10  && valRp.tel.length < 7)) {
//                 isOk = false;
//             }
//         }
//
//         if(isOk) {
//             countRowsOk++;
//         }
//     }
//
//
//     for (let item of [1,2,3,4]) {
//         let valRp = {
//             'nombre': getValInput('#formWizard .c-field[name="rp'+item+'_nombre"]').replace(/(\s)/g, ''),
//             'cel': getValInput('#formWizard .c-field[name="rp'+item+'_cel"]').replace(/(\s)/g, ''),
//             'tel': getValInput('#formWizard .c-field[name="rp'+item+'_tel"]').replace(/(\s)/g, ''),
//             'parentesco': getValInput('#formWizard .c-field[name="rp'+item+'_parentesco"]').replace(/(\s)/g, '')
//         }
//
//         for (let kValRp in valRp) {
//             let elVal = valRp[kValRp];
//             elVal = ''+elVal.replace(/(\s)/g, '');
//             if(countRowsOk < 2) {
//                 if((kValRp == 'cel' && elVal.length < 10 && valRp['tel'].length < 7) && (kValRp == 'tel' && elVal.length < 7 && valRp['cel'].length < 7)) {
//                     iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_'+kValRp+'"]', true);
//                 }else if((!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') && (kValRp != 'cel' && kValRp != 'tel')) {
//                     iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_'+kValRp+'"]', true);
//                 }else {
//                     if(kValRp == 'cel' || kValRp == 'tel') {
//                         iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_cel"]', false);
//                         iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_tel"]', false);
//                     }else {
//                         iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_'+kValRp+'"]', false);
//                     }
//                 }
//             }else {
//                 if(kValRp == 'cel' || kValRp == 'tel') {
//                     iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_cel"]', false);
//                     iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_tel"]', false);
//                 }else {
//                     iCtrlWizard.toggleHasError('#formWizard .c-field[name="rp'+item+'_'+kValRp+'"]', false);
//                 }
//             }
//         }
//     }
//     if(countRowsOk < 2) {
//         result = false;
//     }
//
//     return result;
// }

iCtrlWizard.clearRp = function(elIndex) {
    $('#ref-personales .c-field[name="rp'+elIndex+'_nombre"]').val('');
    $('#ref-personales .c-field[name="rp'+elIndex+'_nombre"]').removeClass('has-error');
    $('#ref-personales .c-field[name="rp'+elIndex+'_nombre"]').removeAttr('readonly');
    $('#ref-personales .c-field[name="rp'+elIndex+'_parentesco"]').val('0');
    $('#ref-personales .c-field[name="rp'+elIndex+'_parentesco"]').removeClass('has-error');
    $('#ref-personales .c-field[name="rp'+elIndex+'_cel"]').val('');
    $('#ref-personales .c-field[name="rp'+elIndex+'_cel"]').removeClass('has-error');
    $('#ref-personales .c-field[name="rp'+elIndex+'_ind_tel"]').val('');
    $('#ref-personales .c-field[name="rp'+elIndex+'_ind_tel"]').removeClass('has-error');
    $('#ref-personales .c-field[name="rp'+elIndex+'_tel"]').val('');
    $('#ref-personales .c-field[name="rp'+elIndex+'_tel"]').removeClass('has-error');
}

iCtrlWizard.toggleHasError = function(elSelector, flag) {
    if(flag) {
        $(elSelector).addClass('has-error');
    }else {
        $(elSelector).removeClass('has-error');
    }
}

iCtrlWizard.setFieldProfile = function() {
    // let nameProfile = null;
    // if(getValInput('#formWizard input[name="p_ind_estudiante"]') == 'on') {
    //     nameProfile = 'p_ind_estudiante';
    // }
    // if(getValInput('#formWizard input[name="p_ind_amacasa"]') == 'on') {
    //     nameProfile = 'p_ind_amacasa';
    // }
    // if(getValInput('#formWizard input[name="p_ind_independiente"]') == 'on') {
    //     nameProfile = 'p_ind_independiente';
    // }
    // if(getValInput('#formWizard input[name="p_ind_laboral"]') == 'on') {
    //     nameProfile = 'p_ind_laboral';
    // }
    // if(getValInput('#formWizard input[name="p_ind_pensionado"]') == 'on') {
    //     nameProfile = 'p_ind_pensionado';
    // }
    // $('#formWizard .c-field[name="profile"]').val(((nameProfile)? ctrlDataWizard.listProfile[nameProfile]: ''));
}

iCtrlWizard.loadDataPdfModal = function() {
    let strName = getValInput('#formWizard .c-field[name="nom1_cli"]')+' '+getValInput('#formWizard .c-field[name="nom2_cli"]');
    let strLastname = getValInput('#formWizard .c-field[name="ap1_cli"]')+' '+getValInput('#formWizard .c-field[name="ap2_cli"]');
    let strAddress = getValInput('#formWizard .c-field[name="direccion"]')+' '+getValInput('#formWizard .c-field[name="di1_cli"]');
    strAddress += ' # '+getValInput('#formWizard .c-field[name="di2_cli"]');
    if(getValInput('#formWizard .c-field[name="di3_cli"]').replace(/(\s)/g, '').length) {
        strAddress += ' - '+getValInput('#formWizard .c-field[name="di3_cli"]');
    }
    if(getValInput('#formWizard .c-field[name="unidad"]').replace(/(\s)/g, '').length) {
        let residence = getValInput('#formWizard .c-field[name="cod_residencia"]');
        residence = (residence)? residence: 'EDIFICIO';
        strAddress += ' '+residence+' ('+getValInput('#formWizard .c-field[name="unidad"]')+')';
    }
    if(getValInput('#formWizard .c-field[name="di4_cli"]').replace(/(\s)/g, '').length) {
        strAddress += ' INT '+getValInput('#formWizard .c-field[name="di4_cli"]');
    }

    let dataModalPdf = {
        'cod_cli': getValInput('#formWizard .c-field[name="cod_cli"]'),
        'nom_cli': strName,
        'nom1_cli': getValInput('#formWizard .c-field[name="nom1_cli"]'),
        'nom2_cli': getValInput('#formWizard .c-field[name="nom2_cli"]'),
        'ap1_cli': getValInput('#formWizard .c-field[name="ap1_cli"]'),
        'ap2_cli': getValInput('#formWizard .c-field[name="ap2_cli"]'),
        'ap_cli': strLastname,
        'email': getValInput('#formWizard .c-field[name="email"]'),
        'te1_cli': getValInput('#formWizard .c-field[name="te1_cli"]'),
        'fax_cli': getValInput('#formWizard .c-field[name="fax_cli"]'),
        'direccion': strAddress,
        'nom_dep': getValInput('#formWizard .c-field[name="text_cod_dep"]'),
        'nom_ciu': getValInput('#formWizard .c-field[name="text_cod_ciu"]')
    }

    if(isSeerOptional) {
        strName = ctrlDataSeer.historyClient.dc[0].nom1_cli+' '+ctrlDataSeer.historyClient.dc[0].nom2_cli;
        strLastname = ctrlDataSeer.historyClient.dc[0].ap1_cli+' '+ctrlDataSeer.historyClient.dc[0].ap2_cli;
        strAddress = getValInput('#formSeerOptional .c-field[name="uco_direccion"]')+' '+getValInput('#formSeerOptional .c-field[name="uco_di1_cli"]');
        strAddress += ' # '+getValInput('#formSeerOptional .c-field[name="uco_di2_cli"]');
        if(getValInput('#formSeerOptional .c-field[name="uco_di3_cli"]').replace(/(\s)/g, '').length) {
            strAddress += ' - '+getValInput('#formSeerOptional .c-field[name="uco_di3_cli"]');
        }
        if(getValInput('#formSeerOptional .c-field[name="uco_unidad"]').replace(/(\s)/g, '').length) {
            let residence = getValInput('#formSeerOptional .c-field[name="uco_cod_residencia"]');
            residence = (residence)? residence: 'EDIFICIO';
            strAddress += ' '+residence+' ('+getValInput('#formSeerOptional .c-field[name="uco_unidad"]')+')';
        }
        if(getValInput('#formSeerOptional .c-field[name="uco_di4_cli"]').replace(/(\s)/g, '').length) {
            strAddress += ' INT '+getValInput('#formSeerOptional .c-field[name="uco_di4_cli"]');
        }

        dataModalPdf = {
            'cod_cli': ctrlDataSeer.historyClient.dc[0].cod_cli,
            'nom_cli': strName,
            'nom1_cli': ctrlDataSeer.historyClient.dc[0].nom1_cli,
            'nom2_cli': ctrlDataSeer.historyClient.dc[0].nom2_cli,
            'ap1_cli': ctrlDataSeer.historyClient.dc[0].ap1_cli,
            'ap2_cli': ctrlDataSeer.historyClient.dc[0].ap2_cli,
            'ap_cli': strLastname,
            'email': getValInput('#formSeerOptional .c-field[name="uco_email"]'),
            'te1_cli': getValInput('#formSeerOptional .c-field[name="uco_te1_cli"]'),
            'fax_cli': getValInput('#formSeerOptional .c-field[name="uco_fax_cli"]'),
            'direccion': strAddress,
            'nom_dep': getValInput('#formSeerOptional .c-field[name="uco_text_cod_dep"]'),
            'nom_ciu': getValInput('#formSeerOptional .c-field[name="uco_text_cod_ciu"]')
        }
    }

    if(ctrlDataSeer.validClient.client.result) {
        dataModalPdf.cod_cli = ctrlDataSeer.validClient.client.cod_cli;
        dataModalPdf.email = (dataModalPdf.email)? dataModalPdf.email: ' ';
        dataModalPdf.te1_cli = (dataModalPdf.te1_cli.replace(/(\s)/g, ''))? dataModalPdf.te1_cli: ' ';
        dataModalPdf.fax_cli = (dataModalPdf.fax_cli.replace(/(\s)/g, ''))? dataModalPdf.fax_cli: ' ';
        dataModalPdf.direccion = (dataModalPdf.direccion.indexOf('AVE  # -') == -1 && dataModalPdf.direccion.indexOf('AVE # -') == -1)? dataModalPdf.direccion: ' ';
        // dataModalPdf.cod_cli = ctrlDataSeer.validClient.client.cod_cli;
        // dataModalPdf.email = (dataModalPdf.email)? dataModalPdf.email: ctrlDataSeer.validClient.client.e_mail;
        // dataModalPdf.te1_cli = (dataModalPdf.te1_cli.replace(/(\s)/g, ''))? dataModalPdf.te1_cli: ctrlDataSeer.validClient.client.te1_cli;
        // dataModalPdf.fax_cli = (dataModalPdf.fax_cli.replace(/(\s)/g, ''))? dataModalPdf.fax_cli: ctrlDataSeer.validClient.client.fax_cli;
        // dataModalPdf.direccion = (dataModalPdf.direccion.indexOf('AVE  # -') == -1 && dataModalPdf.direccion.indexOf('AVE # -') == -1)? dataModalPdf.direccion: ctrlDataSeer.validClient.client.direccion;
    }

    ctrlDataWizard.pdfModal = dataModalPdf;

    $('#modalPdfCedula').html(dataModalPdf.cod_cli);
    $('#modalPdfNombre').html(dataModalPdf.nom_cli);
    $('#modalPdfApellido').html(dataModalPdf.ap_cli);
    $('#modalPdfCorreo').html(dataModalPdf.email);
    $('#modalPdfTelefono').html(((dataModalPdf.te1_cli.replace(/(\s)/g, ''))? dataModalPdf.fax_cli: ''));
    $('#modalPdfDireccion').html(dataModalPdf.direccion+'('+dataModalPdf.nom_ciu+', '+dataModalPdf.nom_dep+')');

    if(ctrlDataSeer.validClient.codeudor) {
        $('#modalPdfCoCedula').html(ctrlDataSeer.validClient.codeudor.cod_cli);
        $('#modalPdfCoNombre').html(ctrlDataSeer.validClient.codeudor.nom1_cli+' '+ctrlDataSeer.validClient.codeudor.nom2_cli);
        $('#modalPdfCoApellido').html(ctrlDataSeer.validClient.codeudor.ap1_cli+' '+ctrlDataSeer.validClient.codeudor.ap2_cli);
        $('#modalPdfCoCorreo').html(ctrlDataSeer.validClient.codeudor.e_mail);
        $('#modalPdfCoTelefono').html(((ctrlDataSeer.validClient.codeudor.te1_cli.replace(/(\s)/g))? ctrlDataSeer.validClient.codeudor.te1_cli: ctrlDataSeer.validClient.codeudor.fax_cli));
        $('#modalPdfCoDireccion').html(ctrlDataSeer.validClient.codeudor.direccion+'('+ctrlDataSeer.validClient.codeudor.nom_ciu+', '+ctrlDataSeer.validClient.codeudor.nom_dep+')');
    }
}

iCtrlWizard.newRc = function() {
    let isRc3 = $('#formWizard #rc3').is(":hidden");
    let isRc4 = $('#formWizard #rc4').is(":hidden");
    if(isRc3) {
        $('#formWizard #rc3').show();
    }else if(isRc4) {
        $('#formWizard #rc4').show();
        $('#formWizard #bNewRc').hide();
    }
}

iCtrlWizard.newRp = function() {
    let isRp3 = $('#formWizard #rp3').is(":hidden");
    let isRp4 = $('#formWizard #rp4').is(":hidden");
    if(isRp3) {
        $('#formWizard #rp3').show();
    }else if(isRp4) {
        $('#formWizard #rp4').show();
        $('#formWizard #bNewRp').hide();
    }
}

iCtrlWizard.onChangeSelects = function() {
    $('#formWizard').on('change','select[name="cod_pai"]',function(evt) {
        iCtrlWizard.printDeparment();
    });
    $('#formWizard').on('change','select[name="cod_dep"]',function(evt) {
        iCtrlWizard.printCities();
    });
    $('#formWizard').on('change','select[name="cod_ciu"]',function(evt) {
        iCtrlWizard.printCommune();
    });
    $('#formWizard').on('change','select[name="cod_comuna"]',function(evt) {
        iCtrlWizard.printNeighborhood();
    });
    $('#formWizard').on('blur','input[name="fec_nac"]',function(evt) {
        iCtrlWizard.refreshAge();
    });
    /** Para todos con opcion SELECCIONAR... */
    iCtrlWizard.onChangeSelects = function() {
        $(document).on('change','select[name="sexo"], select[name="est_civ"], select[name="cod_residencia"], select[name="uc_cod_residencia"]', function(evt) {
            if(!evt.target.value) {
                $(evt.target).addClass('empty');
                return;
            }
            $(evt.target).removeClass('empty');
        });

        $(document).on('change','select[name="tab_selected"]', function(evt) {
            if(evt.target.value) {
                $('.nav-pills a[href="#'+evt.target.value+'"]').tab('show');
                if(evt.target.value == 'resultado') {
                    $('#wizardProfile .btn-finish').show();
                }else {
                    $('#wizardProfile .btn-finish').hide();
                }
                if($('#formWizard input[name="p_ind_credito_cedula"]').is(':checked')) {
                    $('#alertAttached').show();
                }
            }
        });
    }

    /** Para las las locaciones hechizas */
    $('#formWizard').on('change','input[name="text_cod_ciu"]',function(evt) {
        if(!evt.target.value.replace(/(\s)/g, '')) {
            $('#formWizard input[name="text_cod_ciu"]').val(null);
        }
    });
    $('#formWizard').on('keydown','input[name="text_cod_ciu"]',function(evt) {
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode == 9) {
            let elValue = evt.target.value;
            let elNameCity = ""+elValue.replace(/(\s)/g, '');
            let filterCities = ctrlDataWizard.ciudades.filter(function(a) {
                let aNameCity = ""+a.nom_ciu.replace(/(\s)/g, '');
                return (''+aNameCity == ''+elNameCity)? true: false;
            })[0];
            if(filterCities) {
                $('#textCodCiu').val(filterCities.nom_ciu);
                $('#codCiu').val(filterCities.cod_ciu);
                $('#formWizard #textCodBarrio').val('');
                $('#textCodCiu').change();
                iCtrlWizard.printCommune();
            }
        }
    });
    $('#formWizard').on('change','input[name="text_cod_barrio"]',function(evt) {
        if(!evt.target.value.replace(/(\s)/g, '')) {
            $('#formWizard input[name="text_cod_barrio"]').val(null);
        }
    });

    /** Para los campos de nombre */
    $('#formWizard').on('change','input[name="nom1_cli"],input[name="nom2_cli"],input[name="ap1_cli"],input[name="ap2_cli"]',function(evt) {
        let strName = getValInput('#formWizard .c-field[name="nom1_cli"]')+' '+getValInput('#formWizard .c-field[name="nom2_cli"]');
        let strLastname = getValInput('#formWizard .c-field[name="ap1_cli"]')+' '+getValInput('#formWizard .c-field[name="ap2_cli"]');
        $('#fwCliente').html(strName+' '+strLastname);
    });
}
iCtrlWizard.refreshAge = function() {
    let dateAge = moment($('#formWizard input[name="fec_nac"]').val(), 'DD/MM/YYYY').format('DD/MM/YYYY');
    let cAge = calculateAge(dateAge);
    $('#formWizard input[name="edad"]').val(((!isNaN(cAge))? cAge: ''));
}

iCtrlWizard.almacenes = function() {
    let htmlOptions = "";
    let availableTags = [];
    for (let item of ctrlDataWizard.almacenes) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nombre+'</option> \n';
        availableTags.push({label: item.nombre, value: valOption});
    }
    $('#formWizard select[name="rc1_codigo"]').html(htmlOptions);
    iCtrlWizard.almacenesAutocomplete(availableTags, 1);
    $('#formWizard select[name="rc2_codigo"]').html(htmlOptions);
    iCtrlWizard.almacenesAutocomplete(availableTags, 2);
    $('#formWizard select[name="rc3_codigo"]').html(htmlOptions);
    iCtrlWizard.almacenesAutocomplete(availableTags, 3);
    $('#formWizard select[name="rc4_codigo"]').html(htmlOptions);
    iCtrlWizard.almacenesAutocomplete(availableTags, 4);
}
iCtrlWizard.almacenesAutocomplete = function(availableTags, index) {
    $('#formWizard #textRc'+index+'Codigo').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textRc'+index+'Codigo').val(ui.item.label);
            $('#rc'+index+'Codigo').val(ui.item.value);
            $('#textRc'+index+'Codigo').change();
            return false;
        },
        'focus': function(event, ui) {
            $('#textRc'+index+'Codigo').val(ui.item.label);
            $('#rc'+index+'Codigo').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}
iCtrlWizard.printSellers = function() {
    let htmlOptions = "";
    let availableTags = [];
    for (let item of ctrlDataWizard.vendedores) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+valOption+' - '+item.nombre+'</option> \n';
        availableTags.push({label: (valOption+' - '+item.nombre), value: valOption});
    }
    $('#formWizard select[name="cod_ven"]').html(htmlOptions);
    $('#formWizard #textCodVen').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textCodVen').val(ui.item.label);
            $('#codVen').val(ui.item.value);
            return false;
        },
        'focus': function(event, ui) {
            $("#textCodVen").val(ui.item.label);
            $('#codVen').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}
iCtrlWizard.printJobs = function() {
    let htmlOptions = "";
    let availableTags = [];
    ctrlDataWizard.ocupaciones.sort(function(a, b) {
        if(a.nombre < b.nombre) { return -1; }
        if(a.nombre > b.nombre) { return 1; }
        return 0;
    });
    for (let item of ctrlDataWizard.ocupaciones) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nombre+'</option> \n';
        availableTags.push({label: item.nombre, value: valOption});
    }
    $('#formWizard select[name="ocup_cli"]').html(htmlOptions);
    $('#formWizard #textOcupCli').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textOcupCli').val(ui.item.label);
            $('#ocupCli').val(ui.item.value);
            $('#textOcupCli').change();
            $('#ocupCli').change();
            return false;
        },
        'focus': function(event, ui) {
            $("#textOcupCli").val(ui.item.label);
            $('#ocupCli').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}
iCtrlWizard.printResidences = function() {
    let htmlOptions = "";
    for (let item of ctrlDataWizard.residencias) {
        let valOption = ((''+item.codigo != '0')? item.nombre: '');
        htmlOptions += '<option value="'+valOption+'">'+((''+item.codigo != '0')? item.nombre: 'SELECCIONAR...')+'</option> \n';
    }
    $('#formWizard select[name="cod_residencia"]').html(htmlOptions);
    $('#formSeer select[name="uc_cod_residencia"]').html(htmlOptions);
    $('#formSeerOptional select[name="uco_cod_residencia"]').html(htmlOptions);
}
iCtrlWizard.printParents = function() {
    let htmlOptions = "";


    for (let item of ctrlDataWizard.parentesco) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nombre+'</option> \n';
    }
    $('#formWizard select[name="rp1_parentesco"]').html(htmlOptions);
    $('#formWizard select[name="rp2_parentesco"]').html(htmlOptions);
    $('#formWizard select[name="rp3_parentesco"]').html(htmlOptions);
    $('#formWizard select[name="rp4_parentesco"]').html(htmlOptions);
}
iCtrlWizard.printCountry = function() {
    let filterCountries = ctrlDataWizard.paises;
    filterCountries.sort(function(a, b) {
        if(a.nom_pai < b.nom_pai) { return -1; }
        if(a.nom_pai > b.nom_pai) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCountries) {
        let valOption = ""+item.cod_pai.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_pai+'</option> \n';
    }
    $('#formWizard select[name="cod_pai"]').html(htmlOptions);
    iCtrlWizard.printDeparment();
}
iCtrlWizard.printDeparment = function() {
    let elCodeCountry = $('#formWizard select[name="cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let filterDepartments = ctrlDataWizard.departamentos.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry)? true: false;
    });

    filterDepartments.sort(function(a, b) {
        if(a.nom_dep < b.nom_dep) { return -1; }
        if(a.nom_dep > b.nom_dep) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterDepartments) {
        let valOption = ""+item.cod_dep.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_dep+'</option> \n';
        availableTags.push({label: item.nom_dep, value: valOption});
    }
    $('#formWizard select[name="cod_dep"]').html(htmlOptions);
    $('#formWizard select[name="cod_dep"]').val("05");
    $('#formWizard #textCodDep').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textCodDep').val(ui.item.label);
            $('#codDep').val(ui.item.value);
            $('#formWizard #textCodCiu').val('');
            $('#textCodDep').change();
            iCtrlWizard.printCities();
            return false;
        },
        'focus': function(event, ui) {
            $("#textCodDep").val(ui.item.label);
            $('#codDep').val(ui.item.value);
            $('#formWizard #textCodCiu').val('');
            iCtrlWizard.printCities();
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formWizard #textCodDep').val('ANTIOQUIA');
    $('#formWizard #textCodCiu').val('');
    iCtrlWizard.printCities();
}
iCtrlWizard.printCities = function() {
    let elCodeCountry = $('#formWizard select[name="cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let elCodeDeparment = $('#formWizard select[name="cod_dep"]');
    let codeDeparment = elCodeDeparment.val();
    let filterCities = ctrlDataWizard.ciudades.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        let aCodeDeparment = ""+a.cod_dep.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry && aCodeDeparment == codeDeparment)? true: false;
    });

    filterCities.sort(function(a, b) {
        if(a.nom_ciu < b.nom_ciu) { return -1; }
        if(a.nom_ciu > b.nom_ciu) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterCities) {
        let valOption = ""+item.cod_ciu.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_ciu+'</option> \n';
        availableTags.push({label: item.nom_ciu, value: valOption});
    }
    $('#formWizard select[name="cod_ciu"]').html(htmlOptions);
    $('#formWizard select[name="cod_ciu"]').val("05001");
    $('#formWizard #textCodCiu').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textCodCiu').val(ui.item.label);
            $('#codCiu').val(ui.item.value);
            $('#formWizard #textCodBarrio').val('');
            $('#textCodCiu').change();
            iCtrlWizard.printCommune();
            return false;
        },
        'focus': function(event, ui) {
            $("#textCodCiu").val(ui.item.label);
            $('#codCiu').val(ui.item.value);
            $('#formWizard #textCodBarrio').val('');
            iCtrlWizard.printCommune();
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formWizard #textCodCiu').val('MEDELLIN');
    $('#formWizard #textCodBarrio').val('');
    iCtrlWizard.printCommune();
}
iCtrlWizard.printCommune = function() {
    let elCodeCity = $('#formWizard select[name="cod_ciu"]');
    let codeCity = elCodeCity.val();
    let filterCommunes = ctrlDataWizard.comunas.filter(function(a) {
        let aCode = ""+a.cod_ciu.replace(/(\s)/g, '');
        return (aCode == codeCity)? true: false;
    });

    filterCommunes.sort(function(a, b) {
        if(a.nom_comuna < b.nom_comuna) { return -1; }
        if(a.nom_comuna > b.nom_comuna) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCommunes) {
        let valOption = ""+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_comuna+'</option> \n';
    }
    $('#formWizard select[name="cod_comuna"]').html(htmlOptions);
    $('#formWizard #textCodBarrio').val('');
    iCtrlWizard.printNeighborhood();
}
iCtrlWizard.printNeighborhood = function() {
    let elCodeCity = $('#formWizard select[name="cod_ciu"]');
    let codeCity = elCodeCity.val();
    let elCodeComunne = $('#formWizard select[name="cod_comuna"]');
    let codComunne = elCodeComunne.val();
    let filterNeighborhoods = ctrlDataWizard.barrios.filter(function(a) {
        let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
        // let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); && aCodComunne == codComunne
        return (aCodeCity == codeCity)? true: false;
    });
    filterNeighborhoods.sort(function(a, b) {
        if(a.nom_barrio < b.nom_barrio) { return -1; }
        if(a.nom_barrio > b.nom_barrio) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterNeighborhoods) {
        let filterCommune = ctrlDataWizard.comunas.filter(function(a) {
            let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); // && aCodComunne == codComunne
            let iCodComune = ""+item.cod_comuna.replace(/(\s)/g, '');
            let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
            let iCodeCity = ""+item.cod_ciu.replace(/(\s)/g, '');
            return (aCodeCity == iCodeCity && aCodComunne == iCodComune)? true: false;
        })[0];
        let valOption = ""+item.cod_barrio.replace(/(\s)/g, '');
        let valOption2 = ""+item.cod_barrio.replace(/(\s)/g, '')+"|"+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption2+'">'+item.nom_barrio+' - '+filterCommune.nom_comuna+'</option> \n';
        availableTags.push({label: (item.nom_barrio+' - '+filterCommune.nom_comuna), value: valOption2});
    }
    $('#formWizard select[name="cod_barrio"]').html(htmlOptions);
    $('#formWizard #textCodBarrio').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textCodBarrio').val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#codBarrio').val(ui.item.value);
            $('#formWizard select[name="cod_comuna"]').val(valNeighborhood[1]);
            $('#textCodBarrio').change();
            return false;
        },
        'focus': function(event, ui) {
            $("#textCodBarrio").val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#codBarrio').val(ui.item.value);
            $('#formWizard select[name="cod_comuna"]').val(valNeighborhood[1]);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}
/**
* @description iCtrlWizard.newInputsDatePicker Inicializa los datepicker de los inputs
* @return {void}
*/
iCtrlWizard.newInputsDatePicker = function() {
    $('#formWizard input[name="fec_nac"]').datetimepicker({
        'format': 'DD/MM/YYYY',
        'maxDate': moment().subtract(18, 'years'),
        'minDate': moment().subtract(90, 'years'),
        'icons': iconsDateTimeicker
    });
}
/** ***** / WIZARD ***** */


/** ***** VIDENTE ***** */
var iCtrlSeer = iCtrlSeer || {};
var ctrlDataSeer = ctrlDataSeer || {};
iCtrlSeer.timeoutSearchClients = null;

/**
* @description iCtrlSeer.searchClients obtiene el listado de cliente en la busqueda
* @param {object} evt => evento
* @return {void}
*/
iCtrlSeer.searchClients = function(evt) {
    if(iCtrlSeer.timeoutSearchClients) {
        clearTimeout(iCtrlSeer.timeoutSearchClients);
    }
    iCtrlSeer.timeoutSearchClients = setTimeout(function() {
        let strSearch = getValInput('input[name="validar_cedula"]');
        reqJSON({
            'path': urlWS+'/buscarCliente',
            'data': {
                'empresa': ctrlDataWizard.usuario.empresa,
                'stbuscar': strSearch
            },
            'type': 'POST'
        }, function(err, response) {
            iCtrlSeer.printSearchClients(response.data[0]);
        }, true);
    }, 800);
}
iCtrlSeer.printSearchClients = function(input) {
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
            // iCtrl.validClient();
            return false;
        },
        'focus': function(event, ui) {
            $("#validarCedula").val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });

    if(!ignoreFocusSearch) {
        $('#validarCedula').focus();
    }
}

iCtrlSeer.onSubmitValidClient = function() {
    $(document).on('submit','#formValidateClient',function(evt) {
        $('#fwCliente').html('');
        $('#fwCedula').html('');
        iCtrlSeer.validClient();
        return false;
    });
    $(document).on('keypress','#formValidateClient input[name="validar_cedula"]',function(evt) {
        if(evt.which == 13) {
            $('#fwCliente').html('');
            $('#fwCedula').html('');
            iCtrlSeer.validClient();
            return false;
        }
    });
    $(document).on('submit','#formSeerOptional',function(evt) {
        $('#bNormalPdfsNormal').hide();
        $('#bAuxPdfsNormal').show();

        iCtrlSeerOptional.onSubmitFormSeerOptional();
        return false;
    });

    $(document).on('submit','#formSeer',function(evt) {
        let formJSON = formToJSON('#formSeer');
        let valTel1 = formJSON.uc_te1_cli.replace(/(\s)/g, '');
        let valFaxCli = formJSON.uc_fax_cli.replace(/(\s)/g, '');

        if(!valTel1 && !valFaxCli) {
            iCtrlWizard.toggleHasError('#formSeer .c-field[name="uc_te1_cli"]', true);
            iCtrlWizard.toggleHasError('#formSeer .c-field[name="uc_fax_cli"]', true);
            return false;
        }else {
            iCtrlWizard.toggleHasError('#formSeer .c-field[name="uc_te1_cli"]', false);
            iCtrlWizard.toggleHasError('#formSeer .c-field[name="uc_fax_cli"]', false);
        }

        let selParent = '#formSeer .c-field';
        let strAddress = formJSON.uc_direccion+' '+formJSON.uc_di1_cli+' # '+formJSON.uc_di2_cli;
        if(formJSON.uc_di3_cli.replace(/\s/g, '').length) {
            strAddress += ' - '+formJSON.uc_di3_cli;
        }
        if(formJSON.uc_unidad.replace(/\s/g, '').length) {
            let residence = formJSON.uc_cod_residencia;
            residence = (residence)? residence: 'EDIFICIO';
            strAddress += ' '+residence+' ('+formJSON.uc_unidad+')';
        }else if(formJSON.uc_cod_residencia.replace(/\s/g, '').length) {
            let residence = formJSON.uc_cod_residencia;
            residence = (residence)? residence: 'EDIFICIO';
            strAddress += ' '+residence;
        }
        if(formJSON.uc_di4_cli.replace(/\s/g, '').length) {
            strAddress += ' INT '+formJSON.uc_di4_cli;
        }

        iCtrlSeer.endFormSeer({
            'cod_cli': ctrlDataSeer.validClient.client.cod_cli,
            'aprobado': 1,
            'te1_cli': formJSON.uc_te1_cli,
            'fax_cli': formJSON.uc_fax_cli,
            'di1_cli': strAddress,
            'cod_ciu': formJSON.uc_cod_ciu,
            'cod_barrio': formJSON.uc_cod_barrio.split('|')[0],
            'cod_comuna': formJSON.uc_cod_comuna
        }, function() {});
        return false;
    });
}
iCtrlSeer.onChangeSelects = function() {
    $('#formSeer').on('change','select[name="cod_pai"]',function(evt) {
        iCtrlSeer.printDeparment();
    });
    $('#formSeer').on('change','select[name="cod_dep"]',function(evt) {
        iCtrlSeer.printCities();
    });
    $('#formSeer').on('change','select[name="cod_ciu"]',function(evt) {
        iCtrlSeer.printCommune();
    });
    $('#formSeer').on('change','select[name="cod_comuna"]',function(evt) {
        iCtrlSeer.printNeighborhood();
    });
    $('#formSeer').on('blur','input[name="fec_nac"]',function(evt) {
        iCtrlSeer.refreshAge();
    });
    /** Para las las locaciones hechozas */
    $('#formSeer').on('change','input[name="text_cod_ciu"]',function(evt) {
        if(!evt.target.value.replace(/(\s)/g, '')) {
            $('#formSeer input[name="text_cod_ciu"]').val(null);
        }
    });
    $('#formSeer').on('keydown','input[name="uc_text_cod_ciu"]',function(evt) {
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode == 9) {
            let elValue = evt.target.value;
            let elNameCity = ""+elValue.replace(/(\s)/g, '');
            let filterCities = ctrlDataWizard.ciudades.filter(function(a) {
                let aNameCity = ""+a.nom_ciu.replace(/(\s)/g, '');
                return (''+aNameCity == ''+elNameCity)? true: false;
            })[0];
            if(filterCities) {
                $('#textUcCodCiu').val(filterCities.nom_ciu);
                $('#ucCodCiu').val(filterCities.cod_ciu);
                $('#formWizard #textUcCodBarrio').val('');
                $('#textUcCodCiu').change();
                iCtrlSeer.printCommune();
            }
        }
    });
    $('#formSeer').on('change','input[name="text_cod_barrio"]',function(evt) {
        if(!evt.target.value.replace(/(\s)/g, '')) {
            $('#formSeer input[name="text_cod_barrio"]').val(null);
        }
    });
}

iCtrlSeer.saveFormSeer = function(input) {
    for (let item of input) {
        reqJSON({
            'path': './guardarVidente',
            'data': item,
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
        });
    }
    return false;
}

iCtrlSeer.endFormSeer = function(input, fn) {
    togglePreloader(true);
    reqJSON({
        'path': './finalizarVidente',
        'data': input,
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }

        setTimeout(function() {
            $('#updateClient').hide();
            $('#questionsClient').hide();
            $('#formValidateClient').hide();
            $('#formWizard').show();
            $('#selTabSelected').show();
            $('.nav-pills a[href="#generales"]').tab('show');
            iCtrlWizard.refreshTabSelected();

            let $previous = $('#wizardProfile .btn-previous');
            $previous.addClass('disabled');
        }, 300);

        if(!input.aprobado) {
            setTimeout(function() {
                iCtrlSeer.preloadDataClient(ctrlDataSeer.validClient.client);
                iCtrlSeer.getHistoryClient(false);
                togglePreloader(false);
            }, 300);
        }else {
            setTimeout(function() {
                togglePreloader(false);

                if(input.aprobado) {
                    swal({
                        title: 'Datos actualizados correctamente',
                        icon: 'success'
                    }).then((value) => {
                        iCtrlSeer.validClient(input.aprobado);
                    });
                }

                if(fn) {
                    fn();
                }
            }, 300);
        }
    });
    return false;
}

iCtrlSeer.clientIntegrationRCC = function(input, inputRcc) {
    if(!inputRcc.length && (parseInt(input.mes) > parseInt(ctrlDataWizard.usuario.mes_integracion))) {
        ctrlDataSeer.validClient = {
            'client': { result: false },
            'codeudor': null,
            'questions': [],
            'validations': []
        }

        $('#formWizard input[name="tip_sol"]').val('02');

        ctrlDataWizard.restricts = true;
        $('#wizardProfile .btn-finish').hide();
        $('#wizardProfile .btn-save').hide();
        $('#formValidateClient').hide();
        $('#formWizard').show();
        $('#selTabSelected').show();

        setTimeout(function() {
            $('#formWizard input[name="p_ind_estudiante"]').focus();
            iCtrlWizard.validStep2();
            iCtrlWizard.validStep3();
            iCtrlWizard.validStep4();
            iCtrlWizard.validStep5();
            iCtrlWizard.validStep6();
            togglePreloader(false);
        }, 300);
        dilForm = true;
        return false;
    }

    let isRCC = false;
    let isRLC = false;
    for (let iRcc of inputRcc) {
        if(['7','8'].indexOf(''+iRcc.prefijo) != -1) {
            isRCC = true;
            break;
        }
        if(['6','9','12','13','14'].indexOf(''+iRcc.prefijo) != -1) {
            isRLC = true;
        }
    }

    if(isRCC) {
        swal({
            'title': 'Cliente existente en CREDIMARCAS',
            'text': '\n'+ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli+'\n\nCliente con SALDO y REPORTE EN CENTRALES.\nLlamar al CALLCENTER.',
            'icon': 'info',
            'buttons': {
                'cancel': 'Salir',
                'confirm': false
            },
            'closeOnClickOutside': false
        }).then((value) => {
            if(!value) {
                window.location.reload();
                return;
            }
            iCtrlSeer.validClientIntegrationActions();
            dilForm = true;
        });
        return false;
    }else if(isRLC) {
        swal({
            'title': 'Cliente existente en CREDIMARCAS',
            'text': '\n'+ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli+'\nLlamar al Call Center antes de tomar datos.',
            'icon': 'info',
            'buttons': {
                'cancel': 'Salir',
                'confirm': false
            },
            'closeOnClickOutside': false
        }).then((value) => {
            if(!value) {
                window.location.reload();
                return;
            }
            iCtrlSeer.validClientIntegrationActions();
            dilForm = true;
        });
        return false;
    }

    return true;
}

iCtrlSeer.getValidClientIntegration = function(params, fn) {
    reqJSON({
        'path': urlWS+'/validaClienteIntegracion',
        'data': {
            'StrEmpresa': params.empresa,
            'StrCaja': ctrlDataWizard.usuario.caja,
            'cod_cli': params.cliente,
            'tipo': params.tipo
        },
        'type': 'POST'
    }, function(err, dataset) {
        if(err) { fn(err, {}); return }
        let mValidClient = [
            'ap1_cli','ap2_cli','celular','cod_barrio','cod_ciu','cod_cli','cod_comuna',
            'cod_dep','cod_pai','cup_cli','direccion','e_mail','edad','est_civ',
            'fax_cli','fec_nac','nit_ciu','nom1_cli','nom2_cli','nom_cli','ocup_cli',
            'sexo','te1_cli','te2_cli','telefono','tip_ide'
        ];

        let result = {'fingers': [], 'historyClient': dataset.data, 'validClient': {}};
        if(dataset.data[0].length) {
            for (let item of mValidClient) {
                if(typeof(dataset.data[0][0][item]) == 'string') {
                    dataset.data[0][0][item] = dataset.data[0][0][item].trim();
                }else {
                    dataset.data[0][0][item] = dataset.data[0][0][item];
                }
                result.validClient[item] = dataset.data[0][0][item];
            }
            result.validClient['saldo'] = 0;
            result.validClient['result'] = true;
            result.validClient['ultima_actualizacion'] = 0;
            result.validClient['valid_normal'] = 1;
            result.fingers = (dataset.data[13])? dataset.data[13]: [];
        }
        fn(null, result);
    }, true);
}

iCtrlSeer.validClientIntegration = function(input) {
    ctrlDataSeer.tmpIntegration = input;
    let elDocument = $('#formValidateClient input[name="validar_cedula"]');

    togglePreloader(true);
    iCtrlSeer.getValidClientIntegration({
        'cliente': elDocument.val(),
        'tipo': input.tipo,
        'empresa': input.empresa
    }, function(err, response) {
        if(err) { console.error(err); }

        ctrlDataSeer.validClient = {
            'client': response.validClient,
            'codeudor': [],
            'questions': [],
            'validations': [],
            'fingers': response.fingers
        }

        ctrlDataSeer.historyClient.dc = [];
        ctrlDataSeer.historyClient.rl = [];
        ctrlDataSeer.historyClient.rc = [];
        ctrlDataSeer.historyClient.rp = [];
        ctrlDataSeer.historyClient.cc = [];
        ctrlDataSeer.historyClient.re = [];
        ctrlDataSeer.historyClient.fi = [];
        ctrlDataSeer.historyClient.ac = [];
        ctrlDataSeer.historyClient.am = [];
        ctrlDataSeer.historyClient.co = [];
        ctrlDataSeer.historyClient.fa = [{factura: 0}];
        ctrlDataSeer.historyClient.pdfs = [];
        ctrlDataSeer.historyClient.oa = [];
        ctrlDataSeer.historyClient.ad = [];
        ctrlDataSeer.historyClient.fa = [];
        ctrlDataSeer.historyClient.rcc = [];
        ctrlDataSeer.historyClient.fp = [];
        ctrlDataSeer.historyClient.hfp = [];

        let isIntegration = iCtrlSeer.clientIntegrationRCC(input, ((response.historyClient[11])? response.historyClient[11]: []));
        if(!isIntegration) {
            return false;
        }

        $('#formWizard input[name="origen_act"]').val('I');
        $('#fwOrigenAct').html('(I)');
        $('#formWizard input[name="tip_sol"]').val('08');

        ctrlDataSeer.validClient.client['empresa'] = input.empresa;
        ctrlDataSeer.validClient.client['mes'] = input.mes;
        ctrlDataSeer.validClient.client['result'] = true;
        ctrlDataSeer.validClient.client['tipo'] = input.tipo;

        response.historyClient[7] = [];
        ctrlDataSeer.validClient.codeudor = (ctrlDataSeer.validClient.codeudor.length)? ctrlDataSeer.validClient.codeudor: null;
        $('#pdfsModal #codeudor').hide();

        ctrlDataSeer.historyClient.dc = response.historyClient[0];
        ctrlDataSeer.historyClient.rl = response.historyClient[1];
        ctrlDataSeer.historyClient.rc = response.historyClient[2];
        ctrlDataSeer.historyClient.rp = response.historyClient[3];
        ctrlDataSeer.historyClient.cc = response.historyClient[4];
        ctrlDataSeer.historyClient.re = response.historyClient[5];
        ctrlDataSeer.historyClient.fi = response.historyClient[6];
        ctrlDataSeer.historyClient.ac = response.historyClient[7];
        ctrlDataSeer.historyClient.am = [];
        ctrlDataSeer.historyClient.co = [];
        ctrlDataSeer.historyClient.pdfs = [];
        ctrlDataSeer.historyClient.oa = [];
        ctrlDataSeer.historyClient.ad = [];
        if(response.historyClient[7].length) {
            ctrlDataSeer.historyClient.pdfs.push(response.historyClient[7][0]);
        }
        if(response.historyClient[8].length) {
            ctrlDataSeer.historyClient.pdfs.push(response.historyClient[8][0]);
        }
        if(response.historyClient[9].length) {
            ctrlDataSeer.historyClient.pdfs.push(response.historyClient[9][0]);
        }
        ctrlDataSeer.historyClient.fa = [];

        ctrlDataSeer.historyClient.rcc = [];
        if(response.historyClient[11]) {
            ctrlDataSeer.historyClient.rcc = response.historyClient[11];
        }
        ctrlDataSeer.historyClient.fa = [{'factura': 0}];
        if(response.historyClient[12]) {
            ctrlDataSeer.historyClient.fa = response.historyClient[12];
        }
        ctrlDataSeer.historyClient.fp = [];
        if(response.historyClient[13]) {
            ctrlDataSeer.historyClient.fp = response.historyClient[13];
        }
        ctrlDataSeer.historyClient.hfp = [];
        if(response.historyClient[14]) {
            ctrlDataSeer.historyClient.hfp = response.historyClient[14];
        }

        $('#fwCedula').html(ctrlDataSeer.validClient.client.cod_cli);
        $('#formWizard input[name="cod_cli"]').val(ctrlDataSeer.validClient.client.cod_cli);

        let elContent = document.createElement("div");
        let attrClass = document.createAttribute("class");
        elContent.setAttributeNode(attrClass);
        elContent.innerHTML = '<div class="swal-title text-danger w-100">Cliente existente en CREDIMARCAS</div><div class="swal-text w-100"><br><b>'+ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli+'</b><br>Se cargarán los datos del cliente en la solicitud.<br>Confirmar que sean váilidos.</div>';

        swal({
            'content': elContent,
            'icon': 'info',
            'buttons': {
                'cancel': 'Salir',
                'confirm': 'Cargar Datos'
            },
            'html': true,
            'closeOnClickOutside': false
        }).then((value) => {
            if(!value) {
                window.location.reload();
                return;
            }
            iCtrlSeer.validClientIntegrationActions();
            dilForm = true;

            $('#formWizard input[name="dat_general"]').val('1');
            $('#formWizard input[name="dat_personal"]').val('1');
            setTimeout(function() {
                $('#formWizard input[name="dat_general"]').val('1');
                $('#formWizard input[name="dat_personal"]').val('1');
                setTimeout(function() {
                    $('#formWizard input[name="dat_general"]').val('1');
                    $('#formWizard input[name="dat_personal"]').val('1');
                    setTimeout(function() {
                        $('#formWizard input[name="dat_general"]').val('1');
                    }, 500);
                }, 300);
            }, 0);

            if(ctrlDataSeer.historyClient.rl.length) {
                // $('#formWizard input[name="dat_laboral"]').val('0');
                $('#formWizard input[name="p_ind_laboral"]').prop('checked', true);
            }
            if(ctrlDataSeer.historyClient.rc.length) {
                $('#formWizard input[name="dat_comercial"]').val('1');
                $('#formWizard input[name="p_ind_comercial"]').prop('checked', true);
            }

            setTimeout(function() {
                iCtrlSeer.changesToClientIntegration();
            }, 300);
        });
    });
}

iCtrlSeer.changesToClientIntegration = function() {
    flagFormWizard = false;
    flagDatRL = true;
    let arrToSendIntegration = [
        ctrlDataWizard.changes.step2.join(','),
        ctrlDataWizard.changes.step3.join(','),
        ctrlDataWizard.changes.step4.join(','),
        ctrlDataWizard.changes.step5.join(','),
        ctrlDataWizard.changes.step6.join(',')
    ];

    $('#formWizard').on('change',arrToSendIntegration,function(evt) {
        flagFormWizard = true;
    });
}

iCtrlSeer.validClientIntegrationActions = function() {
    let lastUpdate = ctrlDataSeer.validClient.client.ultima_actualizacion;
    let daysSeer = parseInt(ctrlDataWizard.usuario.dias_vidente);
    let daysUpdate = parseInt(ctrlDataWizard.usuario.dias_actualizar);

    $(document).on('click', '#formWizard input[name="cliente_firma"]', function(evt) { return false; });

    ctrlDataWizard.restricts = true;
    iCtrlSeer.preloadDataClient(ctrlDataSeer.validClient.client);
    iCtrlSeer.preloadHistoryClient(ctrlDataSeer.historyClient, false);

    $('#formValidateClient').hide();
    $('#formWizard').show();
    $('#selTabSelected').show();
    $('.nav-pills a[href="#generales"]').tab('show');
    iCtrlWizard.refreshTabSelected();
    let $previous = $('#wizardProfile .btn-previous');
    $previous.addClass('disabled');
    $('#fwCliente').html(ctrlDataSeer.validClient.client.nom_cli);
    // $('#fwFechaActualizacion').html('Ultima actualización: '+moment(ctrlDataSeer.validClient.client.fecha_ultima_actualizacion.replace('z','')).format('DD-MM-YYYY HH:mm'));
    // $('#formWizard input[name="update"]').val('on');
    $('.nav-pills a[href="#perfil"]').parent().hide();

    let elContent = document.createElement("div");
    let attrClass = document.createAttribute("class");
    elContent.setAttributeNode(attrClass);
    elContent.innerHTML = '<div class="swal-title text-danger w-100">Completar la información del cliente en las siguientes opciones</div><div class="swal-text w-100">Información general.<br> Referencia laboral.<br>Referencias personales.</div>';

    swal({
        content: elContent,
        icon: 'warning',
        html: true,
        dangerMode: true
    }).then((value) => {
        iCtrlWizard.validStep2();
        iCtrlWizard.validStep6();
        iCtrlWizard.validStep5();

        // iCtrlWizard.saveAutIntegration();
        let elDocument = $('#formValidateClient input[name="validar_cedula"]');
        reqJSON({
            'path': urlWS+'/actualizarArchivoCelIntegracion',
            'data': {
                'cod_cli': elDocument.val(),
                'StrCaja': ctrlDataWizard.usuario.caja,
                'StrEmpresa': ctrlDataSeer.tmpIntegration.empresa,
                'StrEmpresadestino': ctrlDataWizard.usuario.empresa
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
        }, true);
    });

    setTimeout(function() {
        iCtrlWizard.validStep2();
        iCtrlWizard.validStep3();
        iCtrlWizard.validStep4();
        iCtrlWizard.validStep5();
        iCtrlWizard.validStep6();
    }, 300);
}

/**
* @description iCtrlSeer.getCodeudor obtiene los datos del codeudor
* @return {void}
*/
iCtrlSeer.getCodeudor = function(input, fn) {
    iCtrlSeer.getValidClient({
        'cliente': input.Cedula,
        'fullRes': false
    }, function(err, response) {
        if(err) { console.error(err) }
        let result = null;
        if(response.client.result) {
            result = response.client;
        }
        fn(result);
    });
}

iCtrlSeer.getValidClient = function(params, fn) {
    reqJSON({
        'path': urlWS+'/validaCliente',
        'data': {
            'StrEmpresa': ctrlDataWizard.usuario.empresa,
            'StrCaja': ctrlDataWizard.usuario.caja,
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

iCtrlSeer.validClient = function(flagApproveSeer, ignoreTest) {
    let elDocument = $('#formValidateClient input[name="validar_cedula"]');
    if(!elDocument.val()) { return false; }
    if(isNaN(elDocument.val())) { return false; }

    /* *** ******* QUEMADO ******* *** */
    if(((elDocument.val() == '1020600600') || (elDocument.val() == '1020700700') || (elDocument.val() == '1020900900')) && !ignoreTest) {
        let nameImage = ((elDocument.val() == '1020600600')? 'request_approved.png': ((elDocument.val() == '1020700700')? 'request_denied.png': ((elDocument.val() == '1020900900')? 'request_pending.png': null)));
        let elImage = document.createElement("img");
        elImage.setAttribute("src", "./img/"+nameImage);
        elImage.setAttribute("style", "max-width: 100%;");
        swal({
            'content': elImage,
            'buttons': {
                'cancel': false,
                'confirm': 'Crear Solicitud'
            },
            // 'closeOnClickOutside': false,
            // 'closeOnEsc': false
        }).then((value) => {
            if(value) {
                iCtrlSeer.validClient(false, true);
            }
        });
        return false;
    }
    /* *** ******* / QUEMADO ******* *** */

    setItemLS({
        'key': 'last_cc_'+ctrlDataWizard.usuario.nom_usu,
        'data': elDocument.val()+'|'
    });

    togglePreloader(true);
    iCtrlSeer.getValidClient({'cliente': elDocument.val(), 'fullRes': true}, function(err, response) {
        if(err) { console.error(err) } // iCtrlSeer.printQuestions(response.questions);
        setTimeout(function() {
            togglePreloader(false);
            ctrlDataSeer.validClient = response;
            ctrlDataSeer.validClient.codeudor = (ctrlDataSeer.validClient.codeudor.length)? ctrlDataSeer.validClient.codeudor: null;
            if(ctrlDataSeer.validClient.codeudor) {
                if(ctrlDataSeer.validClient.codeudor[0].ind_next == 1) {
                    iCtrlSeer.getCodeudor(ctrlDataSeer.validClient.codeudor[0], function(record) {
                        ctrlDataSeer.validClient.codeudor = (record)? record: null;
                    });
                }else {
                    ctrlDataSeer.validClient.codeudor = null;
                    $('#pdfsModal #codeudor').hide();
                }
            }else {
                $('#pdfsModal #codeudor').hide();
            }
            iCtrlSeer.validClientActions(flagApproveSeer);
            $('#fwCedula').html(elDocument.val());
            $('#formWizard input[name="cod_cli"]').val(elDocument.val());
        }, 300);
    });

    if(ctrlDataWizard.usuario.ind_solo_huella) {
        $('#formWizard input[name="cliente_firma"][value="no"]').prop('checked', 'true');
        $(document).on('click', '#formWizard input[name="cliente_firma"]', function(evt) { return false; });
    }
}

iCtrlSeer.validClientActions = function(flagApproveSeer) {
    $('#formWizard input[name="origen_act"]').val('A');
    $('#fwOrigenAct').html('(A)');
    $('#formWizard input[name="tip_sol"]').val('01');

    if(!ctrlDataSeer.validClient.client.result) { // cliente nuevo
        // facturas
        let elFields = document.createElement('div');
        let ctrlNotasPos = document.createElement('input');
        ctrlNotasPos.setAttribute('id', 'swalInputLastName');
        ctrlNotasPos.setAttribute('name', '');
        ctrlNotasPos.setAttribute('placeholder', 'APELLIDO');
        ctrlNotasPos.setAttribute('type', 'text');
        ctrlNotasPos.setAttribute('class', 'swal-content__input');
        let ctrlAlertCallcenter = document.createElement('div');
        ctrlAlertCallcenter.setAttribute('class', 'swal-text m-0 pb-16 alert-increase text-center');
        let strAlertCallcenter = document.createTextNode('Ingrese el primer apellido del cliente');
        ctrlAlertCallcenter.appendChild(strAlertCallcenter);
        elFields.appendChild(ctrlAlertCallcenter);
        elFields.appendChild(ctrlNotasPos);

        ignoreFocusSearch = true;
        setTimeout(function() { $('#swalInputLastName').focus(); }, 300);


        if(ctrlDataWizard.usuario.datacredito) {
            swal({
                'title': 'Validar Cliente',
                'content': elFields,
                'buttons': {
                    'cancel': 'Cancelar',
                    'confirm': 'Consultar'
                },
                'closeOnClickOutside': false,
                'closeOnEsc': false,
                'className': 'swal-compact'
            }).then((value) => {
                if(value) {
                    togglePreloader(true);
                    setTimeout(function() {
                        let nameImage = 'request_approved.png';
                        let elImage = document.createElement("img");
                        elImage.setAttribute("src", "http://intranet.credimarcas.com.co/img/"+nameImage);
                        elImage.setAttribute("style", "max-width: 100%;");
                        swal({
                            'content': elImage,
                            'buttons': {
                                'cancel': false,
                                'confirm': 'Crear Solicitud'
                            },
                        }).then((value) => {
                            if(ctrlDataSeer.validClient.client.tipo) { // cliente nuevo por integracion
                                iCtrlSeer.validClientIntegration(ctrlDataSeer.validClient.client);
                            }else {
                                $('#formWizard input[name="tip_sol"]').val('02');

                                ctrlDataWizard.restricts = true;
                                $('#wizardProfile .btn-finish').hide();
                                $('#wizardProfile .btn-save').hide();
                                $('#formValidateClient').hide();
                                $('#formWizard').show();
                                $('#selTabSelected').show();

                                setTimeout(function() {
                                    $('#formWizard input[name="p_ind_estudiante"]').focus();
                                    iCtrlWizard.validStep2();
                                    iCtrlWizard.validStep3();
                                    iCtrlWizard.validStep4();
                                    iCtrlWizard.validStep5();
                                    iCtrlWizard.validStep6();
                                }, 300);
                                dilForm = true;
                                // $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
                                // $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
                            }
                        });
                    }, 800);
                }else {
                    window.location.reload();
                }
            });
        }else {
            if(ctrlDataSeer.validClient.client.tipo) { // cliente nuevo por integracion
                iCtrlSeer.validClientIntegration(ctrlDataSeer.validClient.client);
            }else {
                $('#formWizard input[name="tip_sol"]').val('02');

                ctrlDataWizard.restricts = true;
                $('#wizardProfile .btn-finish').hide();
                $('#wizardProfile .btn-save').hide();
                $('#formValidateClient').hide();
                $('#formWizard').show();
                $('#selTabSelected').show();

                setTimeout(function() {
                    $('#formWizard input[name="p_ind_estudiante"]').focus();
                    iCtrlWizard.validStep2();
                    iCtrlWizard.validStep3();
                    iCtrlWizard.validStep4();
                    iCtrlWizard.validStep5();
                    iCtrlWizard.validStep6();
                }, 300);
                dilForm = true;
                // $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
                // $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
            }
        }


        return;
    }

    // ctrlDataSeer.validClient.client.ultima_actualizacion = 200;

    let lastUpdate = ctrlDataSeer.validClient.client.ultima_actualizacion;
    let daysSeer = parseInt(ctrlDataWizard.usuario.dias_vidente);
    let daysUpdate = parseInt(ctrlDataWizard.usuario.dias_actualizar);

    $(document).on('click', '#formWizard input[name="cliente_firma"]', function(evt) { return false; });

    if(lastUpdate >= daysSeer && lastUpdate < daysUpdate) { // Con vidente
        // ctrlDataWizard.usuario.ind_vidente = 0;
        if(!ctrlDataWizard.usuario.ind_vidente) { // nuevo vidente
            $('#formWizard input[name="origen_act"]').val('A');
            $('#fwOrigenAct').html('(A)');
            $('#formWizard input[name="tip_sol"]').val('02');
            $('#fwCliente').html(ctrlDataSeer.validClient.client.nom_cli);

            $('#formValidateClient').hide();
            $('#updateClientOptional').show();

            isSeerOptional = true;

            iCtrlSeerOptional.getHistoryClient(flagApproveSeer);
        }else { // viejo vidente
            $('#formWizard input[name="origen_act"]').val('V');
            $('#fwOrigenAct').html('(V)');
            $('#formWizard input[name="tip_sol"]').val('01');

            iCtrlSeer.preloadDataClientSingle(ctrlDataSeer.validClient.client);
            iCtrlSeer.printQuestions(ctrlDataSeer.validClient.questions);
            $('#formValidateClient').hide();
            $('#questionsClient').show();

            $('#fwCliente').html(ctrlDataSeer.validClient.client.nom_cli);
            $('#fwFechaActualizacion').html('Ultima actualización: '+moment(ctrlDataSeer.validClient.client.fecha_ultima_actualizacion.replace('z','')).format('DD-MM-YYYY HH:mm'));
            $('#formWizard input[name="update"]').val('on');
            $('.nav-pills a[href="#perfil"]').parent().hide();
            iCtrlWizard.resetDat();
            dilForm = true;
        }
    }else if(lastUpdate >= daysUpdate) { // Actualizar datos con validaciones
        ctrlDataWizard.restricts = true;
        iCtrlSeer.preloadDataClient(ctrlDataSeer.validClient.client);
        iCtrlSeer.getHistoryClient(flagApproveSeer);

        $('#formValidateClient').hide();
        $('#formWizard').show();
        $('#selTabSelected').show();
        $('.nav-pills a[href="#generales"]').tab('show');
        iCtrlWizard.refreshTabSelected();
        let $previous = $('#wizardProfile .btn-previous');
        $previous.addClass('disabled');
        $('#fwCliente').html(ctrlDataSeer.validClient.client.nom_cli);
        $('#fwFechaActualizacion').html('Ultima actualización: '+moment(ctrlDataSeer.validClient.client.fecha_ultima_actualizacion.replace('z','')).format('DD-MM-YYYY HH:mm'));
        $('#formWizard input[name="update"]').val('on');
        $('.nav-pills a[href="#perfil"]').parent().hide();

        swal({
            title: 'Actualización de Datos',
            text: 'Para enviar la SOLICITUD AL CALLCENTER, actualizar la siguiente información. \n\nInformación general \nMínimo 2 referencias personales \nReferencia laboral',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {
            iCtrlWizard.validStep2();
            iCtrlWizard.validStep6();
            // iCtrlWizard.validStep5();
        });
        dilForm = true;
    }else { // Menor a daysUpdate sin validaciones
        ctrlDataWizard.restricts = false;
        iCtrlSeer.preloadDataClient(ctrlDataSeer.validClient.client);
        iCtrlSeer.getHistoryClient(flagApproveSeer, true);

        $('#formValidateClient').hide();
        $('#formWizard').show();
        $('#selTabSelected').show();
        $('.nav-pills a[href="#generales"]').tab('show');
        iCtrlWizard.refreshTabSelected();
        let $previous = $('#wizardProfile .btn-previous');
        $previous.addClass('disabled');

        $('#fwCliente').html(ctrlDataSeer.validClient.client.nom_cli);
        $('#fwFechaActualizacion').html('Ultima actualización: '+moment(ctrlDataSeer.validClient.client.fecha_ultima_actualizacion.replace('z','')).format('DD-MM-YYYY HH:mm'));
        $('#formWizard input[name="update"]').val('on');
        $('.nav-pills a[href="#perfil"]').parent().hide();

        setTimeout(function() { $('#formWizard .c-field[name="fax_cli"]').focus(); }, 300);
        dilForm = true;
    }
}

iCtrlSeer.getHistoryClientRequest = function(params, fn) {
    reqJSON({
        'path': urlWS+'/historiaCliente',
        'data': {
            'cod_cli': params.cod_cli,
            'StrCaja': ctrlDataWizard.usuario.caja,
            'StrEmpresa': ctrlDataWizard.usuario.empresa
        },
        'type': 'POST'
    }, function(err, response) {
        if(response.data) {
            for (let wsVal of response.data) {
                for (let iVal of wsVal) {
                    for (var iAttrKey in iVal) {
                        let iAttrVal = iVal[iAttrKey];
                        iVal[iAttrKey] = (typeof(iAttrVal) == 'string')? iAttrVal.trim(): iAttrVal;
                    }
                }
            }
        }
        fn(null, response);
    }, true);
}

iCtrlSeer.getHistoryClient = function(flagApproveSeer, showPreload) {
    if(showPreload) {
        togglePreloader(true);
    }

    iCtrlSeer.getHistoryClientRequest({
        'cod_cli': ctrlDataSeer.validClient.client.cod_cli
    }, function(err, response) {
        if(showPreload) {
            setTimeout(function() {
                togglePreloader(false);
            }, 0);
        }
        if(err || response.type == 'error') {
            console.error(err);
            ctrlDataSeer.historyClient.dc = [];
            ctrlDataSeer.historyClient.rl = [];
            ctrlDataSeer.historyClient.rc = [];
            ctrlDataSeer.historyClient.rp = [];
            ctrlDataSeer.historyClient.cc = [];
            ctrlDataSeer.historyClient.re = [];
            ctrlDataSeer.historyClient.fi = [];
            ctrlDataSeer.historyClient.ac = [];
            ctrlDataSeer.historyClient.fa = [];
            ctrlDataSeer.historyClient.pdfs = [];
            ctrlDataSeer.historyClient.co = [];
            ctrlDataSeer.historyClient.am = [];
            ctrlDataSeer.historyClient.oa = [];
            ctrlDataSeer.historyClient.ad = [];
            ctrlDataSeer.historyClient.fp = [];
            ctrlDataSeer.historyClient.hfp = [];
            // $('#formWizard').hide();
            // swal({
            //     title: 'No es posible obtener los datos',
            //     text: 'No es posible obtener la historia del cliente.',
            //     icon: 'warning',
            //     dangerMode: true
            // }).then((value) => {
            //     ctrlDataSeer.validClient = null;
            //     window.location.reload();
            // });
            return;
        }
        ctrlDataSeer.historyClient.dc = response.data[0];
        ctrlDataSeer.historyClient.rl = response.data[1];
        ctrlDataSeer.historyClient.rc = response.data[2];
        ctrlDataSeer.historyClient.rp = response.data[3];
        ctrlDataSeer.historyClient.cc = response.data[4];
        ctrlDataSeer.historyClient.re = response.data[5];
        ctrlDataSeer.historyClient.fi = response.data[6];
        ctrlDataSeer.historyClient.ac = response.data[7];
        ctrlDataSeer.historyClient.pdfs = [];

        if(
            ($('#formWizard input[name="origen_act"]').val() == 'V') ||
            ($('#formWizard input[name="origen_act"]').val() == 'A' && parseInt(ctrlDataSeer.validClient.client.ultima_actualizacion) > parseInt(ctrlDataWizard.usuario.dias_actualizar))
        ) {
            let rmRp = [];

            for (let kRp in ctrlDataSeer.historyClient.rp) {
                let vRp = ctrlDataSeer.historyClient.rp[kRp];
                if(!vRp.ind_veri) {
                    rmRp.push(kRp);
                }
            }
            rmRp.sort(function(a,b) {
                return ((a < b)? 1: ((a > b)? -1: 0));
            });
            for (let vRmRp of rmRp) {
                ctrlDataSeer.historyClient.rp.splice(parseInt(vRmRp), 1);
            }
        }

        if(parseInt(ctrlDataSeer.validClient.client.ultima_actualizacion) <= parseInt(ctrlDataWizard.usuario.dias_vidente)) {
            let rmRp = [];
            let dateToDiff = null;
            for (let kRp in ctrlDataSeer.historyClient.rp) {
                let vRp = ctrlDataSeer.historyClient.rp[kRp];
                if(!dateToDiff) {
                    dateToDiff = moment(vRp.fecha);
                }
                let dateDiff = dateToDiff.diff(moment(vRp.fecha), 'days');
                if(dateDiff > 5) {
                    rmRp.push(kRp);
                }
            }
            rmRp.sort(function(a,b) {
                return ((a < b)? 1: ((a > b)? -1: 0));
            });
            for (let vRmRp of rmRp) {
                ctrlDataSeer.historyClient.rp.splice(parseInt(vRmRp), 1);
            }
        }

        if(ctrlDataSeer.historyClient.ac.length) {
            let rmAc = false;
            if((Math.abs(parseInt(ctrlDataSeer.historyClient.ac[0].dias)))  > parseInt(ctrlDataWizard.usuario.dias_cupo)) {
                rmAc = true;
            }else if(parseInt(ctrlDataSeer.validClient.client.ultima_actualizacion) > parseInt(ctrlDataWizard.usuario.dias_cupo)) {
                rmAc = true;
            }

            if(rmAc) {
                ctrlDataSeer.historyClient.ac = [];
                if(ctrlDataSeer.historyClient.fi.length) {
                    let indFi = null;
                    for(let iValFi in ctrlDataSeer.historyClient.fi) {
                        if(ctrlDataSeer.historyClient.fi[iValFi].firmas == '001') {
                            indFi = iValFi;
                        }
                    }
                    if(indFi != null) {
                        ctrlDataSeer.historyClient.fi.splice(indFi, 1);
                    }
                }
            }
        }

        if(ctrlDataSeer.historyClient.ac.length) {
            ctrlDataSeer.historyClient.pdfs.push(ctrlDataSeer.historyClient.ac[0]);
        }
        if(response.data[8].length) {
            ctrlDataSeer.historyClient.pdfs.push(response.data[8][0]);
        }
        if(response.data[9].length) {
            ctrlDataSeer.historyClient.pdfs.push(response.data[9][0]);
        }
        ctrlDataSeer.historyClient.fa = [];
        if(response.data[10]) {
            ctrlDataSeer.historyClient.fa = response.data[10];
        }
        ctrlDataSeer.historyClient.co = [];
        if(response.data[11]) {
            ctrlDataSeer.historyClient.co = response.data[11];
        }
        ctrlDataSeer.historyClient.am = [];
        if(response.data[12]) {
            ctrlDataSeer.historyClient.am = response.data[12];
        }
        ctrlDataSeer.historyClient.oa = [];
        if(response.data[13]) {
            ctrlDataSeer.historyClient.oa = response.data[13];
        }
        ctrlDataSeer.historyClient.ad = [];
        if(response.data[14]) {
            ctrlDataSeer.historyClient.ad = response.data[14];
        }
        ctrlDataSeer.historyClient.fp = [];
        if(response.data[15]) {
            ctrlDataSeer.historyClient.fp = response.data[15];
        }
        ctrlDataSeer.historyClient.hfp = [];
        if(response.data[16]) {
            ctrlDataSeer.historyClient.hfp = response.data[16];
        }

        if(ctrlDataSeer.historyClient.rl.length) {
            $('#formWizard input[name="p_ind_laboral"]').prop('checked', true);
        }else if(ctrlDataSeer.historyClient.rc.length) {
            $('#formWizard input[name="p_ind_comercial"]').prop('checked', true);
        }

        iCtrlSeer.preloadHistoryClient(ctrlDataSeer.historyClient, flagApproveSeer);
    });
}

iCtrlSeer.updateProfilesSelected = function() {
    let profiles = [
        'p_ind_comercial','p_ind_amacasa','p_ind_independiente','p_ind_estudiante',
        'p_ind_histcrediti','p_ind_pensionado','p_ind_laboral'
    ];
    let arrProfilesSelecteds = [];
    for (let profile of profiles) {
        if($('input[name="'+profile+'"]').is(':checked')) {
            let elId = $('#formWizard input[name="'+profile+'"]').prop('id');
            arrProfilesSelecteds.push($('#formWizard input[name="'+profile+'"]').siblings('#formWizard label[for="'+elId+'"]').text());
        }
    }
    if(arrProfilesSelecteds.length) {
        $('#formWizard #generales .profiles-selected').html(arrProfilesSelecteds.join(', '));
    }
}


iCtrlSeer.preloadHistoryClient = function(input, flagApproveSeer) {
    let valDc = (input.dc.length)? input.dc[0]: null;
    if(valDc) {
        $('#formWizard input[name="perfil"]').val(valDc.perfil);

        if(ctrlDataWizard.usuario.ind_solo_huella) {
            $('#formWizard input[name="cliente_firma"][value="no"]').prop('checked', 'true');
        }else {
            $('#formWizard input[name="cliente_firma"][value="'+((valDc.firma == 1)? 'si': 'no')+'"]').prop('checked', 'true');
        }

        $('#formWizard input[name="val_sol"]').val(numeral(valDc.val_sol).format('$0,000'));
        $('#formWizard select[name="cod_ven"]').val(valDc.cod_ven);
        $('#formWizard input[name="text_cod_ven"]').val($('#formWizard select[name="cod_ven"] option[value="'+valDc.cod_ven+'"]').text());
        $('#formWizard input[name="notas_pos"]').val(valDc.notas_pos);
        if(valDc.p_ind_comercial == 1) {
            $('#formWizard input[name="p_ind_comercial"]').prop('checked', true);
        }
        if(valDc.p_ind_amacasa == 1) {
            $('#formWizard input[name="p_ind_amacasa"]').prop('checked', true);
        }
        if(valDc.p_ind_independiente == 1) {
            $('#formWizard input[name="p_ind_independiente"]').prop('checked', true);
        }
        if(valDc.p_ind_estudiante == 1) {
            $('#formWizard input[name="p_ind_estudiante"]').prop('checked', true);
        }
        if(valDc.p_ind_histcrediti == 1) {
            $('#formWizard input[name="p_ind_histcrediti"]').prop('checked', true);
        }
        if(valDc.p_ind_pensionado == 1) {
            $('#formWizard input[name="p_ind_pensionado"]').prop('checked', true);
        }
        if(valDc.p_ind_laboral == 1) {
            $('#formWizard input[name="p_ind_laboral"]').prop('checked', true);
        }
        if(valDc.cod_perfil) {
            $('#formWizard input[name="inicio"]').val(valDc.cod_perfil);
        }
    }

    // selTabSelected

    let valRl = (input.rl.length)? input.rl[0]: null;
    if(valRl) {
        $('#formWizard input[name="rl1_nom_emp"]').val(valRl.nom_emp);
        $('#formWizard input[name="rl1_area"]').val(valRl.area);
        $('#formWizard input[name="rl1_cargo"]').val(valRl.cargo);

        if(!ctrlDataWizard.restricts) {
            let sTelEmp = (valRl.tel_emp)? valRl.tel_emp.split(")"): [];
            if(sTelEmp.length > 1) {
                $('#formWizard input[name="rl1_ind_telefono"]').val(numeral(sTelEmp[0])._value);
                $('#formWizard input[name="rl1_telefono"]').val(sTelEmp[1]);
            }else {
                $('#formWizard input[name="rl1_telefono"]').val(valRl.tel_emp);
            }

            $('#formWizard input[name="rl1_ext"]').val(valRl.ext_emp);
        }
        $('#formWizard input[name="p_ind_laboral"]').prop('checked', true);
    }

    let valRc = (input.rc.length)? input.rc: null;
    if(valRc) {
        let countRc = 1;
        for (let item of valRc) {
            item.rc_estado = (item.rc_estado)? ((item.rc_estado.replace)? item.rc_estado.replace(/\s/g, ''): item.rc_estado): item.rc_estado;
            $('#formWizard select[name="rc'+countRc+'_codigo"]').val(item.rc_codigo);
            $('#formWizard input[name="text_rc'+countRc+'_codigo"]').val($('#formWizard select[name="rc'+countRc+'_codigo"] option[value="'+item.rc_codigo+'"]').text());
            $('#formWizard select[name="rc'+countRc+'_estado"]').val(item.rc_estado);
            $('#formWizard #rc'+countRc+'').show();

            let strItemRc = item.rc_codigo+''+item.rc_estado;
            ctrlDataWizard.strSave.comercial.push((strItemRc)? strItemRc.replace(/(\s)/g,''): '');
            countRc++;
        }
        $('#formWizard input[name="p_ind_comercial"]').prop('checked', true);
    }

    let valCc = (input.cc.length)? input.cc: null;
    if(valCc) {
        let countCc = 1;
        for (let item of valCc) {
            if(item.cc1) {
                $('#formWizard #bSideA').prop('src', 'data:image/jpeg;base64,'+item.cc1).removeClass('hide');
            }
            if(item.cc2) {
                $('#formWizard #bSideB').prop('src', 'data:image/jpeg;base64,'+item.cc2).removeClass('hide');
            }

            if(item.cc1 && item.cc2) {
                if(item.cc1.length > 10 && item.cc2.length > 10) {
                    $('#cedula #sideA').prop('disabled', 'true');
                    $('#cedula .file-zone[for="sideA"], #cedula .file-zone[for="sideB"]').addClass('c-disabled');
                }
            }

            countCc++;
        }
    }

    let valFp = (input.fp.length)? input.fp: null;
    if(valFp) {
        for (let item of valFp) {
            $('#hands #finger'+item.dedo).addClass('finger-exist');
            $('#modal_hands #modal_finger'+item.dedo).addClass('finger-exist');
            if(item.dedo < 6) {
                $('#listFpRight').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
                $('#modal_listFpRight').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
            }else {
                $('#listFpLeft').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
                $('#modal_listFpLeft').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
            }
        }

        $('#fingerprintModal #clientFp b').html(ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli);
    }else {
        $('#fingerprintRegModal #clientFpReg b').html(ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli);
    }

    let valHFp = (input.hfp.length) ? input.hfp : null;

    if(valHFp) {
        let rowsToAddReg = [];
        let rowsToAddHist = [];
        let rowFingerHistory = {}


        //Miro si hay huellas registradas
        const f = valHFp.filter(i =>{
            return i.tipo.toLowerCase().indexOf('registro') != -1
        })

        //si hay huellas registradas
        //enciendo el validar huella
        //este se puede apagar een la linea 4875
        if(ctrlDataWizard.usuario.valid_huella){
            if(f.length>0){
                ctrlDataWizard.updateFinger = true;
            }
        }


        for (let item of valHFp) {


            if(item.tipo.toLowerCase().indexOf('registro') != -1) {

                //si esta aqu es por que ya tiene huella registrada

                //si tiene huella registrada lo pongo en
                //NO y es integracion tengo que actualizar huella
                // console.log('huella')
                // if(ctrlDataSeer.validClient.client.tipo == 2){

                // }


                rowsToAddReg.push({
                    'creacion': moment(item.fecha.replace('Z','')).format('DD-MM-YYYY, HH:mm'),
                    'dedo': ctrlDataWizard.fingers[item.dedo].description,
                    'empresa': item.cod_suc+' - '+item.nom_suc,
                    'caja': item.caja
                });
            }else if(item.tipo.toLowerCase().indexOf('verificacion') != -1 || item.tipo.toLowerCase().indexOf('verifica factura') != -1) {


                rowsToAddHist.push({
                    'fecha_valida': moment(item.fecha.replace('Z','')).format('DD-MM-YYYY, HH:mm'),
                    'empresa': item.cod_suc+' - '+item.nom_suc,
                    'caja': item.caja,
                    'tipo': 'Verificación',
                    'validacion': item.estado,
                    'modulo': ( item.tipo.toLowerCase().indexOf('verificacion') == 0 ? 'Solicitud': 'Facturación')
                });

            }




            if(!ctrlDataSeer.validClient.client.tipo){

                let now = moment(new Date());
                let end = moment(item.fecha_valida)
                let duration = moment.duration(now.diff(end));
                let days = duration.asDays();

                if(ctrlDataWizard.usuario.empresa == item.empresa){
                    if(days<30){
                        //la huella esta menor a 30 dias
                        console.log('encontro una huella, entonces no valido nada')
                        ctrlDataWizard.updateFinger = false;
                    }
                }

            }


        }





        iCtrlWizard.tableRegFP.clear();
        iCtrlWizard.tableRegFP.rows.add(rowsToAddReg).draw();

        iCtrlWizard.tableHistFP.clear();
        iCtrlWizard.tableHistFP.rows.add(rowsToAddHist).draw();
    }else{
        ctrlDataWizard.updateFinger = false;
    }

    let valRe = (input.re.length)? input.re: null;
    if(valRe) {
        let rowsToAdd = [];
        for (let item of valRe) {
            rowsToAdd.push({
                'fecha': moment(item.fecha.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY H:mm"),
                'origen': item.origen_act,
                'cupo': numeral(item.cupo).format('$0,000'),
                'val_sol': numeral(item.val_sol).format('$0,000'),
                'resultado': ((item.resultado.split)? item.resultado.split(/\s/g)[0]: '') ,
                'razon_resultado': item.razon_resultado,
                'usuario': item.usu_call,
                'notas': item.notas
            });
        }

        iCtrlWizard.tableResult.clear();
        iCtrlWizard.tableResult.rows.add(rowsToAdd).draw();
        // $('#formWizard input[name="val_sol"]').val(numeral(valRe[0].val_sol).format('$0,000'));

        let lastUpdate = ctrlDataSeer.validClient.client.ultima_actualizacion;
        let daysQuota = parseInt(ctrlDataWizard.usuario.dias_cupo);
        if(lastUpdate > daysQuota) {
            // $('#formWizard input[name="val_sol"]').prop('disabled', 'disabled');
        }

        let valSaldo = valRe[0].cupo - valDc.cup_cli;
        valSaldo = (valSaldo >= 0)? valSaldo: 0;

        $('#formWizard input[name="res_cupo"]').val(numeral(valRe[0].cupo).format('$0,000'));
        $('#formWizard input[name="res_val_dis"]').val(numeral(valDc.cup_cli).format('$0,000'));
        $('#formWizard input[name="res_saldo"]').val(numeral(valSaldo).format('$0,000'));
        $('#formWizard input[name="res_resultado"]').val(((valRe[0].resultado.split)? valRe[0].resultado.split(/\s/g)[0]: ''));
        $('#formWizard input[name="res_razon_resultado"]').val(valRe[0].razon_resultado);
        $('#formWizard input[name="res_autorizado"]').val(((valRe[0].usu_call)? valRe[0].usu_call.toUpperCase(): ''));

        if(valRe[0].tip_nov_cli == '99') {
            let indFi = null;
            for(let iValFi in input.fi) {
                if(input.fi[iValFi].firmas == '001') {
                    indFi = iValFi;
                }
            }
            if(indFi != null) {
                input.fi.splice(indFi, 1);
                ctrlDataSeer.historyClient.fi.splice(indFi, 1);
                input.ac = [];
                ctrlDataSeer.historyClient.ac = [];
            }

            let indPdfs = null;
            for(let iValPdfs in input.pdfs) {
                if(input.pdfs[iValPdfs].firmas == '001') {
                    indPdfs = iValPdfs;
                }
            }
            if(indPdfs != null) {
                input.pdfs.splice(indPdfs, 1);
                ctrlDataSeer.historyClient.pdfs.splice(indPdfs, 1);
            }
        }
    }

    let valFi = (input.fi.length)? input.fi: null;
    if(valFi) {
        let sign005 = false;
        let sign006 = false;
        for (let item of valFi) {
            if(item.firmas == '005') {
                sign005 = true;
            }else if(item.firmas == '006') {
                sign006 = true;
            }
        }
        if(sign005) {
            $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
        }
        if(sign006) {
            $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
        }
    }

    let valAc = (input.ac.length)? input.ac: null;
    if(valAc) {
        let rowsToAdd = [];
        for (let item of valAc) {
            rowsToAdd.push({
                'detalle': '<i class="material-icons text-danger pl-8 pr-8 pointer" data-toggle="modal" data-target="#autCentralesModal">picture_as_pdf</i>',
                'plantilla': item.plantilla,
                'usuario': item.usuario,
                'maquina': item.pc,
                'fecha': moment(item.fecha_proceso.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY H:mm")
            });
            $('#pdfACentrales').prop('src', 'data:application/pdf;base64,'+item.archivo);
            $('#autCentralesModalLabel').html(item.plantilla);
        }
        iCtrlWizard.tableAutCentral.clear();
        iCtrlWizard.tableAutCentral.rows.add(rowsToAdd).draw();
    }

    let valPdfs = (input.pdfs.length)? input.pdfs: null; // ctrlDataSeer.historyClient.pdfs
    if(valPdfs) {
        let rowsToAdd = [];
        for (let key in valPdfs) {
            let item = valPdfs[key];
            if(item.cod_plantilla == '005') {
                $('#open005').data('indexPdf', ''+key);
                $('#open005').show();
            }
            if(item.cod_plantilla == '006') {
                $('#open006').data('indexPdf', ''+key);
                $('#open006').show();
            }
        }
    }

    let valRp = (input.rp.length)? input.rp: null;
    if(valRp) {
        let countRp = 1;
        for (let item of valRp) {
            if(countRp == 4) { break; }
            $('#formWizard input[name="rp'+countRp+'_nombre"]').val(item.rp_nombre);
            $('#formWizard select[name="rp'+countRp+'_parentesco"]').val(item.rp_parentesco);
            $('#formWizard input[name="rp'+countRp+'_nombre"]').prop('readonly', 'true');
            if(!ctrlDataWizard.restricts) {
                $('#formWizard input[name="rp'+countRp+'_cel"]').val(item.rp_celular);

                let sTelRp = item.rp_tel1.split(")");
                if(sTelRp.length > 1) {
                    $('#formWizard input[name="rp'+countRp+'_ind_tel"]').val(numeral(sTelRp[0])._value);
                    $('#formWizard input[name="rp'+countRp+'_tel"]').val(sTelRp[1]);
                }else {
                    $('#formWizard input[name="rp'+countRp+'_tel"]').val(item.rp_tel1);
                }
            }
            $('#formWizard #rp'+countRp+'').show();

            if(item.nota_call) {
                $("#formWizard #rp"+countRp+"NotaCall").html('<b class="text-danger"> (NOTA CALLCENTER: '+item.nota_call+')</b>');
            }else {
                $("#formWizard #rp"+countRp+"NotaCall").html("");
            }

            let strItemRp = item.rp_nombre+''+item.rp_parentesco+''+((item.rp_celular)? item.rp_celular: '')+''+((item.rp_tel1)? item.rp_tel1: '');
            ctrlDataWizard.strSave.personal.push((strItemRp)? strItemRp.replace(/(\s)/g, ''): '');

            countRp++;
        }

        iCtrlWizard.validStep5();
        if(ctrlDataWizard.restricts) {
            setTimeout(function() {
                let countRp = 1;
                for (let item of valRp) {
                    let valCel = (item.rp_celular.replace)? item.rp_celular.replace(/(\s)/g, ''): item.rp_celular;
                    let valTel = (item.rp_tel1.replace)? item.rp_tel1.replace(/(\s)/g, ''): item.rp_tel1;
                    iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_cel"]', false);
                    iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_tel"]', false);
                    if(valCel) {
                        iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_cel"]', true);
                    }else {
                        iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_cel"]', false);
                    }
                    if(valTel) {
                        iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_tel"]', true);
                    }else {
                        iCtrlWizard.toggleHasError('#formWizard input[name="rp'+countRp+'_tel"]', false);
                    }
                    countRp++;
                }
            }, 300);
        }
    }

    let valCo = (input.co.length)? input.co: null;
    if(valCo) {
        let rowsToAdd = [];
        for (let item of valCo) {
            rowsToAdd.push({
                'codeudor': item.Cedula,
                'nombre': item.Nombre,
                'usuario_ingreso': item.usu_pos,
                'fecha_aprobacion': moment(item.fch_aud.replace('Z','')).format('DD/MM/YYYY HH:mm'),
                'cupo': numeral(item.cod_cupo).format('$0,000'),
                'usuario_aprobacion': item.usu_call,
                'proximo_negocio': item.ind_next
            });
        }

        iCtrlWizard.tableCod.clear();
        iCtrlWizard.tableCod.rows.add(rowsToAdd).draw();
    }

    let valAm = (input.am.length)? input.am[0]: null;
    if(valAm) {
        if(valAm.imagen1) {
            $("#prevAutManual005").prop('src', 'data:image/jpeg;base64,'+valAm.imagen1).removeClass('hide');
        }
        if(valAm.imagen2) {
            $("#prevAutManual006").prop('src', 'data:image/jpeg;base64,'+valAm.imagen2).removeClass('hide');
        }
    }

    let valAd = (input.ad.length)? input.ad[0]: null;
    if(valAd) {
        if(valAd.adj0) {
            $("#prevAttached1").prop('src', 'data:image/jpeg;base64,'+valAd.adj0).removeClass('hide');
        }
        if(valAd.adj1) {
            $("#prevAttached2").prop('src', 'data:image/jpeg;base64,'+valAd.adj1).removeClass('hide');
        }
    }

    dilForm = true;
    if(flagApproveSeer) {
        setTimeout(function() {
            let strValidations = '';
            if(!iCtrlWizard.validStep2()) {
                strValidations += 'Generales\n';
            }
            if(!iCtrlWizard.validStep3()) {
                strValidations += 'Ref Laborales\n';
            }
            if(!iCtrlWizard.validStep4()) {
                strValidations += 'Ref Comerciales\n';
            }
            if(!iCtrlWizard.validStep5()) {
                strValidations += 'Ref Personales\n';
            }
            if(!iCtrlWizard.validStep6()) {
                strValidations += 'Resultado\n';
            }

            if(strValidations) {
                swal({
                    title: 'Diligencie correctamente toda la información',
                    text: 'Hay datos obligatorios sin diligenciar en las siguientes pestañas:\n'+strValidations,
                    icon: 'warning',
                    dangerMode: true
                }).then((value) => {});
                return false;
            }
        },300);
    }

    setTimeout(function() {
        iCtrlWizard.validStep2();
        iCtrlWizard.validStep3();
        iCtrlWizard.validStep4();
        iCtrlWizard.validStep5();
        iCtrlWizard.validStep6();
    }, 300);

    iCtrlWizard.resetDat();

    let valFa = (input.fa.length)? input.fa[0]: null;
    let valOa = (input.oa.length)? input.oa[0]: null;

    /* *** ******* ACTUALIZACION ******* *** */
    if($('#formWizard input[name="origen_act"]').val() == 'A') {
        if(valOa) {
            if(valOa.origen_act == 'A') {
                if(valRe) {
                    if(valRe[0].resultado.indexOf('PENDIENTE') != -1) {
                        $('#formWizard input[name="origen_act"]').val('A');
                        $('#fwOrigenAct').html('(A)');
                        $('#formWizard input[name="tip_sol"]').val('06');
                    }else if(valRe[0].resultado.indexOf('APROBADO') != -1) {
                        $('#formWizard input[name="origen_act"]').val('A');
                        $('#fwOrigenAct').html('(A)');
                        $('#formWizard input[name="tip_sol"]').val('07');
                    }
                    let lastUpdate = moment().diff(moment(valRe[0].fecha), 'days');
                    if(valRe[0].resultado.indexOf('APROBADO') != -1 && lastUpdate > parseInt(ctrlDataWizard.usuario.dias_cupo) && lastUpdate < parseInt(ctrlDataWizard.usuario.dias_vidente)) {
                        $('#formWizard input[name="origen_act"]').val('A');
                        $('#fwOrigenAct').html('(A)');
                        $('#formWizard input[name="tip_sol"]').val('05');
                    }
                    if(valRe[0].resultado.indexOf('APROBADO') != -1 && lastUpdate > parseInt(ctrlDataWizard.usuario.dias_vidente)) {
                        $('#formWizard input[name="origen_act"]').val('A');
                        $('#fwOrigenAct').html('(A)');
                        $('#formWizard input[name="tip_sol"]').val('01');
                    }

                    if(valFa) {
                        if(''+valFa.factura == '0' && valRe[0].resultado.indexOf('NEGADO') != -1) {
                            $('#formWizard input[name="origen_act"]').val('A');
                            $('#fwOrigenAct').html('(A)');
                            $('#formWizard input[name="tip_sol"]').val('02');
                        }
                    }
                }else {
                    if(valFa) {
                        if(''+valFa.factura == '0') {
                            $('#formWizard input[name="origen_act"]').val('A');
                            $('#fwOrigenAct').html('(A)');
                            $('#formWizard input[name="tip_sol"]').val('02');
                        }
                    }
                }
            }
        }
    }
    /* *** ******* / ACTUALIZACION ******* *** */

    /* *** ******* INTEGRACION ******* *** */
    if(valOa) {
        if(valOa.origen_act == 'I' && $('#formWizard input[name="origen_act"]').val() != 'V') {
            setTimeout(function() {
                $('#formWizard input[name="origen_act"]').val('I');
                $('#fwOrigenAct').html('(I)');
                $('#formWizard input[name="tip_sol"]').val('08');

                if(valRe) {
                    if(valRe[0].origen_act == 'I' && valRe[0].resultado.indexOf('PENDIENTE') != -1 || valRe[0].resultado.indexOf('NEGADO') != -1) {
                        $('#formWizard input[name="tip_sol"]').val('06');
                    }
                    if(valRe[0].origen_act == 'I' && valRe[0].resultado.indexOf('APROBADO') != -1) {
                        $('#formWizard input[name="tip_sol"]').val('07');
                    }
                }

                if(valFa) {
                    if(''+valFa.factura == '0' && valRe) {
                        if(valRe[0].resultado.indexOf('APROBADO')) {
                            $('#formWizard input[name="origen_act"]').val('A');
                            $('#fwOrigenAct').html('(A)');
                            $('#formWizard input[name="tip_sol"]').val('02');
                        }
                    }
                }
            },0);
        }
    }
    /* *** ******* / INTEGRACION ******* *** */

    /* *** ******* VIDENTE ******* *** */
    if($('#formWizard input[name="origen_act"]').val() == 'V' && ctrlDataWizard.failedSeer) {
        $('#formWizard input[name="origen_act"]').val('A');
        $('#fwOrigenAct').html('(A)');
        $('#formWizard input[name="tip_sol"]').val('01');
    }else if($('#formWizard input[name="origen_act"]').val() == 'V') {
        $('#formWizard input[name="origen_act"]').val('V');
        $('#fwOrigenAct').html('(V)');
        $('#formWizard input[name="tip_sol"]').val('01');
    }else {
        if(valOa) {
            if(valOa.origen_act == 'V') {
                if(valRe.length) {
                    if(valRe[0].resultado.indexOf('PENDIENTE') != -1) {
                        $('#formWizard input[name="origen_act"]').val('V');
                        $('#fwOrigenAct').html('(V)');
                        $('#formWizard input[name="tip_sol"]').val('06');
                    }else if(valRe[0].resultado.indexOf('APROBADO') != -1) {
                        $('#formWizard input[name="origen_act"]').val('V');
                        $('#fwOrigenAct').html('(V)');
                        $('#formWizard input[name="tip_sol"]').val('07');
                    }
                    let lastUpdate = moment().diff(moment(valRe[0].fecha), 'days');
                    if(valRe[0].resultado.indexOf('APROBADO') != -1 && valRe[0].origen_act == 'V' && lastUpdate > parseInt(ctrlDataWizard.usuario.dias_cupo) && lastUpdate < parseInt(ctrlDataWizard.usuario.dias_vidente)) {
                        $('#formWizard input[name="origen_act"]').val('V');
                        $('#fwOrigenAct').html('(V)');
                        $('#formWizard input[name="tip_sol"]').val('05');
                    }
                    if(valRe[0].resultado.indexOf('APROBADO') != -1 && lastUpdate > parseInt(ctrlDataWizard.usuario.dias_vidente)) {
                        $('#formWizard input[name="origen_act"]').val('V');
                        $('#fwOrigenAct').html('(V)');
                        $('#formWizard input[name="tip_sol"]').val('01');
                    }
                }
            }
        }
    }
    /* *** ******* / VIDENTE ******* *** */

    iCtrlSeer.updateProfilesSelected();
}

iCtrlSeer.preloadDataClient = function(input) {
    setItemLS({
        'key': 'last_cc_'+ctrlDataWizard.usuario.nom_usu,
        'data': input.cod_cli+'|'+input.nom_cli
    });



    $('#formWizard select[name="tip_ide"]').val(input.tip_ide);


    if(input.tip_ide.replace(/(\s)/, '')){
        $('#formWizard select[name="tip_ide"]').prop('disabled',true);
    }

    if(input.fec_nac.replace(/(\s)/, '')){
        $('#formWizard input[name="fec_nac"]').prop('disabled',true);
    }




    $('#formWizard input[name="nit_ciu"]').val(input.nit_ciu);
    $('#formWizard input[name="fec_nac"]').val(((input.fec_nac)? moment(input.fec_nac.replace('Z','')).format('DD/MM/YYYY'): ''));
    iCtrlWizard.refreshAge();// $('#formWizard input[name="edad"]').val(input.edad);

    $('#formWizard input[name="nom1_cli"]').val(input.nom1_cli);
    $('#formWizard input[name="nom2_cli"]').val(input.nom2_cli);
    $('#formWizard input[name="ap1_cli"]').val(input.ap1_cli);
    $('#formWizard input[name="ap2_cli"]').val(input.ap2_cli);
    if(input.nom1_cli.replace(/(\s)/, '').length && input.ap1_cli.replace(/(\s)/, '').length) {

        $('#formWizard input[name="nom1_cli"]').prop('readonly','readonly');
        $('#formWizard input[name="nom2_cli"]').prop('readonly','readonly');
        $('#formWizard input[name="ap1_cli"]').prop('readonly','readonly');
        $('#formWizard input[name="ap2_cli"]').prop('readonly','readonly');
    }

    $('#formWizard select[name="sexo"').val(input.sexo);
    $('#formWizard select[name="sexo"').change();
    $('#formWizard select[name="est_civ"').val(input.est_civ);
    $('#formWizard select[name="est_civ"').change();

    $('#formWizard input[name="email"]').val(input.e_mail);
    $('#formWizard select[name="ocup_cli"]').val(input.ocup_cli);
    $('#formWizard input[name="text_ocup_cli"]').val($('#formWizard select[name="ocup_cli"] option[value="'+input.ocup_cli+'"]').text());

    if(!ctrlDataWizard.restricts) {
        $('#formWizard input[name="te1_cli"').val(input.te1_cli);
        $('#formWizard input[name="te2_cli"').val(input.te2_cli);
        $('#formWizard input[name="fax_cli"').val(input.fax_cli);

        let clientAddress = input.direccion.replace(/([\.\#])/g, '').replace(/(\s\s)/g, ' ').split(/\s/g);
        $('#formWizard select[name="direccion"]').val(clientAddress[0]);
        $('#formWizard input[name="di1_cli"]').val(clientAddress[1]);
        $('#formWizard input[name="di2_cli"]').val(((clientAddress[2])? clientAddress[2].replace(/(\#)/g, ''): ''));
        $('#formWizard input[name="di3_cli"]').val(clientAddress[4]);
        let clientApto = (input.direccion.indexOf('Apto / Casa') !== -1)? input.direccion.split("Apto / Casa")[1].split("Unidad / Edificio"): ['',''];
        if(clientApto.length) {
            if(!clientApto[0] && !clientApto[1]) {
                let sInt = input.direccion.split("INT ");
                let tInt = (sInt.length > 1)? sInt[1]: "";
                let sEdf = input.direccion.split("(");
                sEdf = (sEdf.length > 1)? sEdf[1].split(")"): [];
                let tEdf = (sEdf.length)? sEdf[0]: "";
                clientApto = [tInt, tEdf];
            }
        }

        for (let residence of ctrlDataWizard.residencias) {
            if(input.direccion.indexOf(residence.nombre) != -1 && residence.nombre) {
                $('#formWizard select[name="cod_residencia"]').val(residence.nombre);
                $('#formWizard select[name="cod_residencia"]').removeClass('empty');
                break;
            }
        }

        $('#formWizard input[name="di4_cli"]').val(clientApto[0]);
        $('#formWizard input[name="unidad"]').val(clientApto[1]);


        iCtrlWizard.printCountry();
        $('#formWizard select[name="cod_pai"]').val(((input.cod_pai)? input.cod_pai.replace(/\s/g, ""): ''));
        $('#formWizard select[name="cod_pai"]').change();
        iCtrlWizard.printDeparment();

        setTimeout(function() {
            $('#formWizard select[name="cod_dep"]').val(((input.cod_dep)? input.cod_dep.replace(/\s/g, ""): ''));
            $('#formWizard #textCodDep').val($('#formWizard select[name="cod_dep"] option[value="'+input.cod_dep.replace(/\s/g, "")+'"]').text());
            $('#formWizard select[name="cod_dep"]').change();
            iCtrlWizard.printCities();

            setTimeout(function() {
                $('#formWizard select[name="cod_ciu"]').val(((input.cod_ciu)? input.cod_ciu.replace(/\s/g, ""): ''));
                $('#formWizard #textCodCiu').val($('#formWizard select[name="cod_ciu"] option[value="'+input.cod_ciu.replace(/\s/g, "")+'"]').text());
                $('#formWizard select[name="cod_ciu"]').change();
                iCtrlWizard.printCommune();

                setTimeout(function() {
                    $('#formWizard select[name="cod_comuna"]').val(input.cod_comuna.replace(/\s/g, ""));
                    iCtrlWizard.printNeighborhood();
                    setTimeout(function() {
                        $('#formWizard select[name="cod_barrio"]').val(input.cod_barrio.replace(/\s/g, "")+'|'+input.cod_comuna.replace(/\s/g, ""));
                        $('#formWizard #textCodBarrio').val($('#formWizard select[name="cod_barrio"] option[value="'+(input.cod_barrio.replace(/\s/g, "")+'|'+input.cod_comuna.replace(/\s/g, ""))+'"]').text());
                    },0);
                },0);
            },0);
        },0);
    }

    iCtrlWizard.resetModifiedFlagsWizard();
    iCtrlWizard.resetDat();
}

iCtrlSeer.preloadDataClientSingle = function(input) {
    if(!ctrlDataWizard.restricts) {
        $('#formSeer input[name="uc_te1_cli"').val(input.te1_cli);
        $('#formSeer input[name="uc_fax_cli"').val(input.fax_cli);

        let clientAddress = input.direccion.replace(/([\.\#])/g, '').replace(/(\s\s)/g, ' ').split(/\s/g);
        $('#formSeer select[name="uc_direccion"]').val(clientAddress[0]);
        $('#formSeer input[name="uc_di1_cli"]').val(clientAddress[1]);
        $('#formSeer input[name="uc_di2_cli"]').val(((clientAddress[2])? clientAddress[2].replace(/(\#)/g, ''): ''));
        $('#formSeer input[name="uc_di3_cli"]').val(clientAddress[4]);
        let clientApto = (input.direccion.indexOf('Apto / Casa') !== -1)? input.direccion.split("Apto / Casa")[1].split("Unidad / Edificio"): ['',''];
        if(clientApto.length) {
            if(!clientApto[0] && !clientApto[1]) {
                let sInt = input.direccion.split("INT ");
                let tInt = (sInt.length > 1)? sInt[1]: "";
                let sEdf = input.direccion.split("(");
                sEdf = (sEdf.length > 1)? sEdf[1].split(")"): [];
                let tEdf = (sEdf.length)? sEdf[0]: "";
                clientApto = [tInt, tEdf];
            }
        }

        for (let residence of ctrlDataWizard.residencias) {
            if(input.direccion.indexOf(residence.nombre) != -1 && residence.nombre) {
                $('#formSeer select[name="uc_cod_residencia"]').val(residence.nombre);
                $('#formSeer select[name="uc_cod_residencia"]').removeClass('empty');
                break;
            }
        }

        $('#formSeer input[name="uc_di4_cli"]').val(clientApto[0]);
        $('#formSeer input[name="uc_unidad"]').val(clientApto[1]);

        iCtrlWizard.printCountry();
        $('#formWizard select[name="cod_pai"]').val(input.cod_pai.replace(/\s/g, ""));
        iCtrlWizard.printDeparment();
        $('#formWizard select[name="cod_dep"]').val(input.cod_dep.replace(/\s/g, ""));
        $('#formWizard #textCodDep').val($('#formWizard select[name="cod_dep"] option[value="'+input.cod_dep.replace(/\s/g, "")+'"]').text());
        iCtrlWizard.printCities();
        $('#formWizard select[name="cod_ciu"]').val(input.cod_ciu.replace(/\s/g, ""));
        $('#formWizard #textCodCiu').val($('#formWizard select[name="cod_ciu"] option[value="'+input.cod_ciu.replace(/\s/g, "")+'"]').text());
        iCtrlWizard.printCommune();
        $('#formWizard select[name="cod_comuna"]').val(input.cod_comuna.replace(/\s/g, ""));
        iCtrlWizard.printNeighborhood();
        $('#formWizard select[name="cod_barrio"]').val(input.cod_barrio.replace(/\s/g, ""));
        $('#formWizard #textCodBarrio').val($('#formWizard select[name="cod_barrio"] option[value="'+input.cod_barrio.replace(/\s/g, "")+'"]').text());
    }


    iCtrlWizard.resetModifiedFlagsWizard();
}

iCtrlSeer.printQuestions = function(input) {
    let flagQuestion = 1;
    for (let item of input) {
        $('#question'+flagQuestion+' .question-summary .desc-question').html(item.TextoPregunta);
        let htmlAnswers = iCtrlSeer.buildAnswers(item, flagQuestion);
        $('#question'+flagQuestion+' .question-content').html(htmlAnswers);

        flagQuestion++;
    }
}

// iCtrlSeer.onBlurDocument = function() {
//     $("#asistente-solicitud").on('blur keypress', 'input[name="cedula"]', function(evt) {
//         if(evt.type == 'keypress') {
//             if(evt.which != 13) {
//                 return;
//             }
//             iCtrlSeer.validClient();
//         }
//     });
// }
iCtrlSeer.buildAnswers = function(input, flag) {
    let result = '';
    for (let keyI in input) {
        if(keyI.indexOf('Rta') !== -1) {
            if(input[keyI]) {
                result += '<div class="item-answer" style="font-size: 16px;">';
                result += '<input type="radio" id="q'+flag+'a'+keyI+'" name="question'+flag+'" value="'+input[keyI]+'" data-rta="'+keyI+'" data-ind="'+flag+'">&nbsp;';
                result += '<label for="q'+flag+'a'+keyI+'" style="font-size: 16px;">'+input[keyI]+'</label>';
                result += '</div>';
            }
        }
    }
    return result;
}
iCtrlSeer.listenSelectAnswer = function() {
    $('.questions-container').on('change', 'input[type=radio]', function() {
        let elItem = $(this);
        let elInd = $(this).data('ind');
        $('#bNext'+elInd).removeAttr('disabled');
    });
}
iCtrlSeer.nextQuestion = function(input) {
    let isNext = false;
    $('input[type="radio"][name="question'+input+'"]').each(function(a) {
        let elItem = $(this);
        if($(this).prop('checked')) {
            isNext = true;
        }
    });

    if(!isNext) { return }
    $('.question-item').removeClass('active');
    $('#question'+(input + 1)+'.question-item').addClass('active');
}
iCtrlSeer.endQuestion = function() {
    let flagQuestion = 1;
    let isValid = true;
    let resultToSave = [];
    for (let item of ctrlDataSeer.validClient.questions) {
        let elAnswer = $('#question'+flagQuestion+' input[type="radio"][data-rta="Rta'+item.NumCorrecta+'"]');
        if(!elAnswer.prop('checked')) {
            isValid = false;
        }

        let elItemSelected = $('#question'+flagQuestion+' input[type="radio"]:checked').data('rta');
        resultToSave.push({
            'cod_cli': item.cod_cli,
            'idPregunta': item.idPregunta,
            'NumRespuesta': elItemSelected.replace('Rta', '')
        });

        flagQuestion++;
    }

    iCtrlSeer.saveFormSeer(resultToSave);

    if(isValid) {
        ctrlDataWizard.failedSeer = false;
        $('#questionsClient').hide();
        $('#updateClient').show();

        let validationFormSeer = [
            'uc_fax_cli','uc_te1_cli','uc_direccion','uc_di1_cli','uc_di2_cli',
            'uc_text_cod_dep','uc_cod_dep','uc_text_cod_ciu','uc_cod_ciu',
            'uc_text_cod_barrio','uc_cod_barrio'
        ];

        for (let item of validationFormSeer) {
            let elVal = getValInput('#formSeer .c-field[name="'+item+'"]');
            if(!(''+elVal.replace(/(\s)/g, ''))) {
                iCtrlWizard.toggleHasError('#formSeer .c-field[name="'+item+'"]', true);
                iCtrlWizard.toggleHasError('#formSeer .c-field[name="text_'+item+'"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formSeer .c-field[name="'+item+'"]', false);
                iCtrlWizard.toggleHasError('#formSeer .c-field[name="text_'+item+'"]', false);
            }
        }

        $('#formSeer .c-field[name="uc_fax_cli"').focus();
        ctrlDataWizard.restricts = false;

        setTimeout(function() { $('#formWizard .c-field[name="fax_cli"]').focus(); }, 300);
    }else {
        ctrlDataWizard.failedSeer = true;
        ctrlDataWizard.restricts = true;

        swal({
            title: 'Actualización de Datos',
            text: 'Para enviar la SOLICITUD AL CALLCENTER, actualizar la siguiente información. \n\nInformación general \nMínimo 2 referencias personales \nReferencia laboral\nAutorizaciones',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {
            iCtrlSeer.endFormSeer({
                'cod_cli': ctrlDataSeer.validClient.client.cod_cli,
                'aprobado': 0, 'di1_cli': '', 'te1_cli': '', 'fax_cli': '',
                'cod_ciu': '', 'cod_barrio': '', 'cod_comuna': ''
            }, function() {
                $('#formWizard').show();
                $('#selTabSelected').show();
                $('.nav-pills a[href="#generales"]').tab('show');
                iCtrlWizard.refreshTabSelected();
                let $previous = $('#wizardProfile .btn-previous');
                $previous.addClass('disabled');

                iCtrlWizard.validStep2();
                iCtrlWizard.validStep6();
                // iCtrlWizard.validStep5();
            });
        });

        return;
    }
}

iCtrlSeer.printCountry = function() {
    let filterCountries = ctrlDataWizard.paises;
    filterCountries.sort(function(a, b) {
        if(a.nom_pai < b.nom_pai) { return -1; }
        if(a.nom_pai > b.nom_pai) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCountries) {
        let valOption = ""+item.cod_pai.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_pai+'</option> \n';
    }
    $('#formSeer select[name="uc_cod_pai"]').html(htmlOptions);
    iCtrlSeer.printDeparment();
}
iCtrlSeer.printDeparment = function() {
    let elCodeCountry = $('#formSeer select[name="uc_cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let filterDepartments = ctrlDataWizard.departamentos.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry)? true: false;
    });

    filterDepartments.sort(function(a, b) {
        if(a.nom_dep < b.nom_dep) { return -1; }
        if(a.nom_dep > b.nom_dep) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterDepartments) {
        let valOption = ""+item.cod_dep.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_dep+'</option> \n';
        availableTags.push({label: item.nom_dep, value: valOption});
    }
    $('#formSeer select[name="uc_cod_dep"]').html(htmlOptions);
    $('#formSeer select[name="uc_cod_dep"]').val("05");
    $('#formSeer #textUcCodDep').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcCodDep').val(ui.item.label);
            $('#ucCodDep').val(ui.item.value);
            $('#formSeer #textUcCodCiu').val('');
            iCtrlSeer.printCities();
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcCodDep").val(ui.item.label);
            $('#ucCodDep').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formSeer #textUcCodDep').val('ANTIOQUIA');
    $('#formSeer #textUcCodCiu').val('');
    iCtrlSeer.printCities();
}
iCtrlSeer.printCities = function() {
    let elCodeCountry = $('#formSeer select[name="uc_cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let elCodeDeparment = $('#formSeer select[name="uc_cod_dep"]');
    let codeDeparment = elCodeDeparment.val();
    let filterCities = ctrlDataWizard.ciudades.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        let aCodeDeparment = ""+a.cod_dep.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry && aCodeDeparment == codeDeparment)? true: false;
    });
    filterCities.sort(function(a, b) {
        if(a.nom_ciu < b.nom_ciu) { return -1; }
        if(a.nom_ciu > b.nom_ciu) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterCities) {
        let valOption = ""+item.cod_ciu.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_ciu+'</option> \n';
        availableTags.push({label: item.nom_ciu, value: valOption});
    }
    $('#formSeer select[name="uc_cod_ciu"]').html(htmlOptions);
    $('#formSeer #textUcCodCiu').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcCodCiu').val(ui.item.label);
            $('#ucCodCiu').val(ui.item.value);
            $('#formSeer #textUcCodBarrio').val('');
            iCtrlSeer.printCommune();
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcCodCiu").val(ui.item.label);
            $('#ucCodCiu').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formSeer #textUcCodBarrio').val('');
    iCtrlSeer.printCommune();
}
iCtrlSeer.printCommune = function() {
    let elCodeCity = $('#formSeer select[name="uc_cod_ciu"]');
    let codeCity = elCodeCity.val();
    let filterCommunes = ctrlDataWizard.comunas.filter(function(a) {
        let aCode = ""+a.cod_ciu.replace(/(\s)/g, '');
        return (aCode == codeCity)? true: false;
    });

    filterCommunes.sort(function(a, b) {
        if(a.nom_comuna < b.nom_comuna) { return -1; }
        if(a.nom_comuna > b.nom_comuna) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCommunes) {
        let valOption = ""+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_comuna+'</option> \n';
    }
    $('#formSeer select[name="uc_cod_comuna"]').html(htmlOptions);
    $('#formSeer #textUcCodBarrio').val('');
    iCtrlSeer.printNeighborhood();
}
iCtrlSeer.printNeighborhood = function() {
    let elCodeCity = $('#formSeer select[name="uc_cod_ciu"]');
    let codeCity = elCodeCity.val();
    let elCodeComunne = $('#formSeer select[name="uc_cod_comuna"]');
    let codComunne = elCodeComunne.val();
    let filterNeighborhoods = ctrlDataWizard.barrios.filter(function(a) {
        let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
        // let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); && aCodComunne == codComunne
        return (aCodeCity == codeCity)? true: false;
    });
    filterNeighborhoods.sort(function(a, b) {
        if(a.nom_barrio < b.nom_barrio) { return -1; }
        if(a.nom_barrio > b.nom_barrio) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterNeighborhoods) {
        let filterCommune = ctrlDataWizard.comunas.filter(function(a) {
            let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); // && aCodComunne == codComunne
            let iCodComune = ""+item.cod_comuna.replace(/(\s)/g, '');
            let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
            let iCodeCity = ""+item.cod_ciu.replace(/(\s)/g, '');
            return (aCodeCity == iCodeCity && aCodComunne == iCodComune)? true: false;
        })[0];
        let valOption = ""+item.cod_barrio.replace(/(\s)/g, '');
        let valOption2 = ""+item.cod_barrio.replace(/(\s)/g, '')+"|"+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption2+'">'+item.nom_barrio+' - '+filterCommune.nom_comuna+'</option> \n';
        availableTags.push({label: (item.nom_barrio+' - '+filterCommune.nom_comuna), value: valOption2});
    }
    $('#formSeer select[name="uc_cod_barrio"]').html(htmlOptions);
    $('#formSeer #textUcCodBarrio').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcCodBarrio').val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#ucCodBarrio').val(ui.item.value);
            $('#formSeer select[name="uc_cod_comuna"]').val(valNeighborhood[1]);
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcCodBarrio").val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#ucCodBarrio').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}


/* ******* VIDENTE OPCIONAL ******* */
iCtrlSeerOptional.onFinger = function(indFinger) {
    let totalFingerExists = $('#reg_hands .finger.finger-exist').length;
    let hasFingerExist = $('#reg_hands #reg_finger'+indFinger).hasClass('finger-exist');
    let totalFingerSelected = $('#reg_hands .finger-selected').length;
    let hasFingerSelected = $('#reg_hands #reg_finger'+indFinger).hasClass('finger-selected');
    if(hasFingerSelected) {
        $('#reg_hands #reg_finger'+indFinger).toggleClass('finger-selected');
        return false;
    }
    if(ctrlDataSeer.validClient.fingers.length >= 2 || totalFingerExists >= 2 || totalFingerSelected >= 2 || hasFingerExist) {
        return false;
    }

    $('#reg_hands #reg_finger'+indFinger).toggleClass('finger-selected');
}
iCtrlSeerOptional.newRp = function() {
    let isRp3 = $('#formSeerOptional #ucoRp3').is(":hidden");
    let isRp4 = $('#formSeerOptional #ucoRp4').is(":hidden");
    if(isRp3) {
        $('#formSeerOptional #ucoRp3').show();
    }else if(isRp4) {
        $('#formSeerOptional #ucoRp4').show();
        $('#formSeerOptional #ucoBNewRp').hide();
    }
}

iCtrlSeerOptional.getHistoryClient = function() {
    let codCli = ctrlDataSeer.validClient.client.cod_cli;
    togglePreloader(true);
    iCtrlSeer.getHistoryClientRequest({
        'cod_cli': codCli
    }, function(err, response) {
        setTimeout(function() { togglePreloader(false) }, 0);
        if(err || response.type == 'error') { return }
        ctrlDataSeer.historyClient.dc = response.data[0];
        ctrlDataSeer.historyClient.rp = response.data[3];
        ctrlDataSeer.historyClient.rl = response.data[1];
        ctrlDataSeer.historyClient.re = (response.data[5])? response.data[5]: [];
        ctrlDataSeer.historyClient.fi = response.data[6];
        ctrlDataSeer.historyClient.fp = (response.data[15])? response.data[15]: [];
        ctrlDataSeer.historyClient.hfp = (response.data[16])? response.data[16]: [];

        iCtrlSeerOptional.preloadHistoryClient(ctrlDataSeer.historyClient);





    });
}

iCtrlSeerOptional.preloadHistoryClient = function(input) {
    let valDc = (input.dc.length)? input.dc[0]: null;

    if(valDc) {

        //lleno la ciudad
        $('#ucoCodCiu').val(valDc.cod_ciu)
        $('#textUcoCodCiu').val($("#ucoCodCiu option:selected").text())
        iCtrlSeerOptional.printCommune();


        $('#formSeerOptional input[name="uco_email"]').val(((valDc.e_mail)? valDc.e_mail: ''));
        // let clientAddress = valDc.direccion.replace(/([\.\#])/g, '').replace(/(\s\s)/g, ' ').split(/\s/g);
        // $('#formSeerOptional select[name="uco_direccion"]').val(clientAddress[0]);
        // $('#formSeerOptional input[name="uco_di1_cli"]').val(clientAddress[1]);
        // $('#formSeerOptional input[name="uco_di2_cli"]').val(((clientAddress[2])? clientAddress[2].replace(/(\#)/g, ''): ''));
        // $('#formSeerOptional input[name="uco_di3_cli"]').val(clientAddress[4]);
        // let clientApto = (valDc.direccion.indexOf('Apto / Casa') !== -1)? valDc.direccion.split("Apto / Casa")[1].split("Unidad / Edificio"): ['',''];
        // if(clientApto.length) {
        //     if(!clientApto[0] && !clientApto[1]) {
        //         let sInt = valDc.direccion.split("INT ");
        //         let tInt = (sInt.length > 1)? sInt[1]: "";
        //         let sEdf = valDc.direccion.split("(");
        //         sEdf = (sEdf.length > 1)? sEdf[1].split(")"): [];
        //         let tEdf = (sEdf.length)? sEdf[0]: "";
        //         clientApto = [tInt, tEdf];
        //     }
        // }
        //
        // for (let residence of ctrlDataWizard.residencias) {
        //     if(valDc.direccion.indexOf(residence.nombre) != -1 && residence.nombre) {
        //         $('#formSeerOptional select[name="uco_cod_residencia"]').val(residence.nombre);
        //         $('#formSeerOptional select[name="uco_cod_residencia"]').removeClass('empty');
        //         break;
        //     }
        // }
        //
        // $('#formSeerOptional input[name="uco_di4_cli"]').val(clientApto[0]);
        // $('#formSeerOptional input[name="uco_unidad"]').val(clientApto[1]);

        iCtrlWizard.printCountry();
        $('#formSeerOptional select[name="uco_cod_pai"]').val(valDc.cod_pai.replace(/\s/g, ""));
        iCtrlWizard.printDeparment();
        // $('#formSeerOptional select[name="uco_cod_dep"]').val(valDc.cod_dep.replace(/\s/g, ""));
        // $('#formSeerOptional #textUcoCodDep').val($('#formSeerOptional select[name="uco_cod_dep"] option[value="'+valDc.cod_dep.replace(/\s/g, "")+'"]').text());
        // iCtrlWizard.printCities();
        // $('#formSeerOptional select[name="uco_cod_ciu"]').val(valDc.cod_ciu.replace(/\s/g, ""));
        // $('#formSeerOptional #textUcoCodCiu').val($('#formSeerOptional select[name="uco_cod_ciu"] option[value="'+valDc.cod_ciu.replace(/\s/g, "")+'"]').text());
        // iCtrlWizard.printCommune();
        // $('#formSeerOptional select[name="uco_cod_comuna"]').val(valDc.cod_comuna.replace(/\s/g, ""));
        // iCtrlWizard.printNeighborhood();
        // $('#formSeerOptional select[name="uco_cod_barrio"]').val(valDc.cod_barrio.replace(/\s/g, ""));
        // $('#formSeerOptional #textUcoCodBarrio').val($('#formSeerOptional select[name="uco_cod_barrio"] option[value="'+valDc.cod_barrio.replace(/\s/g, "")+'"]').text());
    }

    let valRp = (input.rp.length)? input.rp: null;

    if(valRp) {

        let countRp = 1;

        for (let item of valRp) {
            if(countRp == 3) {
                break;
            }
            if(item.ind_veri) {
                $('#formSeerOptional input[name="uco_rp'+countRp+'_nombre"]').val(item.rp_nombre);
                $('#formSeerOptional select[name="uco_rp'+countRp+'_parentesco"]').val(item.rp_parentesco);
                $('#formSeerOptional input[name="uco_rp'+countRp+'_nombre"]').prop('readonly', 'true');
                $('#formSeerOptional #ucoRp'+countRp+'').show();

                let strItemRp = item.rp_nombre+''+item.rp_parentesco+''+((item.rp_celular)? item.rp_celular: '')+''+((item.rp_tel1)? item.rp_tel1: '');
                // ctrlDataWizard.strSave.personal.push((strItemRp)? strItemRp.replace(/(\s)/g, ''): '');
                countRp++;
            }
        }
    }

    let valFi = (input.fi.length)? input.fi: null;
    if(valFi) {
        let sign005 = false;
        let sign006 = false;
        for (let item of valFi) {
            if(item.firmas == '005') {
                sign005 = true;
            }else if(item.firmas == '006') {
                sign006 = true;
            }
        }
        if(sign005) {
            $('#formWizard input[name="consentimiento_datos"]').prop('checked','checked');
        }
        if(sign006) {
            $('#formWizard input[name="firma_electronica"]').prop('checked','checked');
        }
    }

    let valFp = (input.fp.length)? input.fp: null;
    if(valFp) {
        for (let item of valFp) {
            $('#modal_hands #modal_finger'+item.dedo).addClass('finger-exist');
            if(item.dedo < 6) {
                $('#modal_listFpRight').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
            }else {
                $('#modal_listFpLeft').append('<p class="m-0"><b>Dedo '+ctrlDataWizard.fingers[item.dedo].description+'</b></p>');
            }
        }

        $('#fingerprintModal #clientFp b').html(ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli);
    }else {
        $('#fingerprintRegModal #clientFpReg b').html(ctrlDataSeer.validClient.client.cod_cli+' - '+ctrlDataSeer.validClient.client.nom_cli);
    }

    dilForm = true;


    iCtrlSeerOptional.validFormSeerOptional();
}

iCtrlSeerOptional.onSubmitFormSeerOptional = function() {
    let isValidForm = iCtrlSeerOptional.validFormSeerOptional();
    if(!isValidForm) {
        swal({
            title: 'Diligencie correctamente toda la información',
            text: 'Hay datos obligatorios sin diligenciar.',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        return false;
    }

    iCtrlSeerOptional.sendFormSeerOptional(true);
    let isValidPdfs = !iCtrlWizard.openPdfsModal(true);
    if(!isValidPdfs) {
        iCtrlWizard.openPdfsModal();
        return false;
    }

    let elFields = document.createElement('div');
    let ctrlValSol = document.createElement('input');
    ctrlValSol.setAttribute('id', 'swalInputCupo');
    ctrlValSol.setAttribute('name', '');
    ctrlValSol.setAttribute('placeholder', 'Ingrese valor cupo(Opcional)');
    ctrlValSol.setAttribute('type', 'text');
    ctrlValSol.setAttribute('class', 'swal-content__input');
    ctrlValSol.setAttribute('style', 'margin-bottom: 8px;');
    let ctrlNotasPos = document.createElement('input');
    ctrlNotasPos.setAttribute('id', 'swalInputNotasPos');
    ctrlNotasPos.setAttribute('name', '');
    ctrlNotasPos.setAttribute('placeholder', 'Notas POS(Opcional)');
    ctrlNotasPos.setAttribute('type', 'text');
    ctrlNotasPos.setAttribute('class', 'swal-content__input');
    let ctrlAlertCallcenter = document.createElement('div');
    ctrlAlertCallcenter.setAttribute('class', 'swal-text m-0 pb-16 alert-increase text-center');
    let strAlertCallcenter = document.createTextNode('¿Desea enviar la solicitud de estudio al CALLCENTER?');
    ctrlAlertCallcenter.appendChild(strAlertCallcenter);
    elFields.appendChild(ctrlAlertCallcenter);
    elFields.appendChild(ctrlValSol);
    elFields.appendChild(ctrlNotasPos);

    swal({
        'title': 'Enviar solicitud',
        'content': elFields,
        'buttons': {
            'cancel': 'No',
            'confirm': 'Sí'
        },
        'closeOnClickOutside': false,
        'closeOnEsc': false,
        'className': 'swal-compact'
    }).then((value) => {
        if(value) {
            $('#formSeerOptional input[name="uco_envia_call"]').val('1');
            $('#formSeerOptional input[name="uco_val_sol"]').val($('#swalInputCupo').val());
            $('#formSeerOptional input[name="uco_notas_pos"]').val($('#swalInputNotasPos').val());
        }
        iCtrlSeerOptional.sendFormSeerOptional();
    });
    return;
}

iCtrlSeerOptional.sendFormSeerOptional = function(ignoreReload) {
    let formJSON = formToJSON('#formSeerOptional', 'uco_');
    let dc = (ctrlDataSeer.historyClient.dc.length)? ctrlDataSeer.historyClient.dc[0]: null;
    if(!dc) { return false }
    if(!dc.nom1_cli.length && !dc.ap1_cli.length) { return false }

    formJSON.cod_cli = (dc.cod_cli)? ''+dc.cod_cli.replace(/(\s)/g, ''): '';
    // formJSON.email = (dc.e_mail)? ''+dc.e_mail.replace(/(\s)/g, ''): '';
    formJSON.est_civ = (dc.est_civ)? dc.est_civ: '';
    formJSON.sexo = (dc.sexo)? ''+dc.sexo: '';
    formJSON.ocup_cli = (dc.ocup_cli)? ''+dc.ocup_cli.replace(/(\s)/g, ''): '';
    formJSON.cod_barrio = ((''+formJSON.cod_comuna != '999')? formJSON.cod_barrio: '99|999');
    formJSON.cod_barrio = ((''+formJSON.cod_comuna != '999')? formJSON.cod_barrio: '99|999');
    formJSON.rp1_tel = (formJSON.rp1_ind_tel)? '('+formJSON.rp1_ind_tel+')'+formJSON.rp1_tel: formJSON.rp1_tel;
    formJSON.rp2_tel = (formJSON.rp2_ind_tel)? '('+formJSON.rp2_ind_tel+')'+formJSON.rp2_tel: formJSON.rp2_tel;
    formJSON.rp3_tel = (formJSON.rp3_ind_tel)? '('+formJSON.rp3_ind_tel+')'+formJSON.rp3_tel: formJSON.rp3_tel;
    formJSON.rp4_tel = (formJSON.rp4_ind_tel)? '('+formJSON.rp4_ind_tel+')'+formJSON.rp4_tel: formJSON.rp4_tel;

    let arrRp = [];
    for (let item of [1,2,3,4]) {
        let valRp = {
            'nombre': formJSON['rp'+item+'_nombre'],
            'parentesco': formJSON['rp'+item+'_parentesco'].replace(/(\s)/g, ''),
            'cel': formJSON['rp'+item+'_cel'].replace(/(\s)/g, ''),
            'tel': formJSON['rp'+item+'_tel'].replace(/(\s)/g, '')
        }
        let strItemRp = valRp.nombre.replace(/(\s)/g, '')+''+valRp.parentesco+''+((valRp.cel)? valRp.cel: '')+''+((valRp.tel)? valRp.tel: '');
        strItemRp = (strItemRp)? strItemRp.replace(/(\s)/g,''): '';
        let filterItemRp = ctrlDataWizard.strSave.personal.filter(function(a) {
            return (''+a == ''+strItemRp)? true: false;
        });
        if(!filterItemRp.length) {
            if(valRp.nombre.replace(/(\s)/g, '').length && (valRp.cel.replace(/(\s)/g, '').length || valRp.tel.replace(/(\s)/g, '').length)) {
                arrRp.push(valRp);
            }
        }
        formJSON['rp'+item+'_nombre'] = '';
        formJSON['rp'+item+'_parentesco'] = '0';
        formJSON['rp'+item+'_cel'] = '';
        formJSON['rp'+item+'_tel'] = '';
    }
    let countRp = 1;
    for (let item of arrRp) {
        formJSON['rp'+countRp+'_nombre'] = item.nombre;
        formJSON['rp'+countRp+'_parentesco'] = item.parentesco;
        formJSON['rp'+countRp+'_cel'] = item.cel;
        formJSON['rp'+countRp+'_tel'] = item.tel;
        if(item.nombre.length) {
            let strItemRp = item.nombre+''+item.parentesco+''+((item.cel)? item.cel: '')+''+((item.tel)? item.tel: '');
            ctrlDataWizard.strSave.personal.push(((strItemRp)? strItemRp.replace(/(\s)/g,''): ''));
        }
        countRp++;
    }

    formJSON['rl1_telefono'] = (formJSON.rl1_ind_telefono)? '('+formJSON.rl1_ind_telefono+')'+formJSON.rl1_telefono: formJSON.rl1_telefono;// rl.tel_emp;
    let rl = (ctrlDataSeer.historyClient.rl.length)? ctrlDataSeer.historyClient.rl[0]: null;
    if(rl) {
        // formJSON['rl1_nom_emp'] = rl.nom_emp;
        formJSON['rl1_area'] = rl.area;
        formJSON['rl1_cargo'] = rl.cargo;
        // formJSON['rl1_ext'] = rl.ext_emp;
        formJSON['dat_laboral'] = 1;
    }

    if(sendingFormSeerOptional) {
        formJSON['dat_general'] = "0";
        formJSON['dat_laboral'] = "0";
        formJSON['dat_personal'] = "0";
        // return false;
    }
    if(!ignoreReload) {
        togglePreloader(true);
    }
    sendingFormSeerOptional = true;
    dilForm = false;

    iCtrlWizard.sendNewRequest(formJSON, function(err, responseNs) {
        if(err) { console.error(err) } /** Envio de cedula */
        // sendingFormSeerOptional = true;
        if(!ignoreReload) {
            window.location.reload();
        }
    });
}

iCtrlSeerOptional.validFormSeerOptional = function() {
    let result = true;
    let countRowsOk = 0;
    let fieldsToValid = [
        'uco_direccion', 'uco_di1_cli', 'uco_di2_cli', 'uco_cod_pai',
        'uco_cod_dep', 'uco_text_cod_dep', 'uco_cod_barrio', 'uco_text_cod_barrio',
        'uco_cod_comuna', 'uco_cod_ciu', 'uco_text_cod_ciu', 'uco_rl1_nom_emp',
        'uco_rl1_ind_telefono', 'uco_rl1_telefono'
    ];


    for (let item of fieldsToValid) {
        let elVal = getValInput('#formSeerOptional .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');
        if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
            iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', true);
            result = false;
        }else {
            iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', false);
        }
    }


    let valTel = {
        'te1_cli': getValInput('#formSeerOptional .c-field[name="uco_te1_cli"]'),
        'fax_cli': getValInput('#formSeerOptional .c-field[name="uco_fax_cli"]')
    }
    valTel.te1_cli = valTel.te1_cli.replace(/(\s)/g, '');
    valTel.fax_cli = valTel.fax_cli.replace(/(\s)/g, '');
    if(
        (!valTel.te1_cli.length && !valTel.fax_cli.length) ||
        (
            valTel.te1_cli == '0' || valTel.fax_cli == '0' ||
            valTel.te1_cli == '00' || valTel.fax_cli == '00' ||
            valTel.te1_cli == '000' || valTel.fax_cli == '000' ||
            valTel.te1_cli == '0000' || valTel.fax_cli == '0000' ||
            valTel.te1_cli == '00000' || valTel.fax_cli == '00000'
        ) ||
        (valTel.te1_cli.length < 7 && valTel.fax_cli.length < 10)
    ) {
        iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_te1_cli"]', true);
        iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_fax_cli"]', true);
        result = false;
    }else {
        iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_te1_cli"]', false);
        iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_fax_cli"]', false);
    }

    let refsToValid = [
        'uco_rp1_nombre', 'uco_rp1_parentesco', 'uco_rp1_cel', 'uco_rp1_tel',
        'uco_rp2_nombre', 'uco_rp2_parentesco', 'uco_rp2_cel', 'uco_rp2_tel',
        'uco_rp3_nombre', 'uco_rp3_parentesco', 'uco_rp3_cel', 'uco_rp3_tel',
        'uco_rp4_nombre', 'uco_rp4_parentesco', 'uco_rp4_cel', 'uco_rp4_tel'
    ];

    for (let item of refsToValid) {
        let elVal = getValInput('#formSeerOptional .c-field[name="'+item+'"]');
        elVal = ''+elVal.replace(/(\s)/g, '');
        let indVal = numeral(item)._value;

        if(indVal == 3 || indVal == 4) {
            let elVal2 = getValInput('#formSeerOptional .c-field[name="uco_rp'+indVal+'_nombre"]');
            elVal2 = ''+elVal2.replace(/(\s)/g, '');
            if(elVal2.length) {
                if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                    iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', true);
                }else {
                    iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', false);
                }
            }
        }else {
            if(!elVal || elVal == '0' || elVal == '00' || elVal == '000' || elVal == '0000' || elVal == '00000') {
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', true);
            }else {
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="'+item+'"]', false);
            }
        }
    }
    for (let item of [1,2,3,4]) {
        let valRp = {
            'nombre': getValInput('#formSeerOptional .c-field[name="uco_rp'+item+'_nombre"]').replace(/(\s)/g, ''),
            'cel': getValInput('#formSeerOptional .c-field[name="uco_rp'+item+'_cel"]').replace(/(\s)/g, ''),
            'tel': getValInput('#formSeerOptional .c-field[name="uco_rp'+item+'_tel"]').replace(/(\s)/g, ''),
            'parentesco': getValInput('#formSeerOptional .c-field[name="uco_rp'+item+'_parentesco"]').replace(/(\s)/g, '')
        }
        if(valRp.nombre.length) {
            if((!valRp.cel.length && !valRp.tel.length) || (valRp.cel.length < 10 && valRp.tel.length < 7)) {
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_rp'+item+'_cel"]', true);
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_rp'+item+'_tel"]', true);
            }else if(!valRp.parentesco || valRp.parentesco == '0' || valRp.parentesco == '00') {
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_rp'+item+'_parentesco"]', true);
                result = false;
            }else {
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_rp'+item+'_cel"]', false);
                iCtrlWizard.toggleHasError('#formSeerOptional .c-field[name="uco_rp'+item+'_tel"]', false);
                countRowsOk++;
            }
        }
    }

    if(countRowsOk < 2) {
        result = false;
    }



    return result;
}

iCtrlSeerOptional.printParents = function() {
    let htmlOptions = "";
    for (let item of ctrlDataWizard.parentesco) {
        let valOption = ""+item.codigo.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nombre+'</option> \n';
    }
    $('#formSeerOptional select[name="uco_rp1_parentesco"]').html(htmlOptions);
    $('#formSeerOptional select[name="uco_rp2_parentesco"]').html(htmlOptions);
    $('#formSeerOptional select[name="uco_rp3_parentesco"]').html(htmlOptions);
    $('#formSeerOptional select[name="uco_rp4_parentesco"]').html(htmlOptions);
}

iCtrlSeerOptional.clearRp = function(elIndex) {
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_nombre"]').val('');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_nombre"]').removeClass('has-error');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_nombre"]').removeAttr('readonly');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_parentesco"]').val('0');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_parentesco"]').removeClass('has-error');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_cel"]').val('');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_cel"]').removeClass('has-error');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_ind_tel"]').val('');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_ind_tel"]').removeClass('has-error');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_tel"]').val('');
    $('#ucoRp'+elIndex+' .c-field[name="uco_rp'+elIndex+'_tel"]').removeClass('has-error');
}

iCtrlSeerOptional.printCountry = function() {
    let filterCountries = ctrlDataWizard.paises;
    filterCountries.sort(function(a, b) {
        if(a.nom_pai < b.nom_pai) { return -1; }
        if(a.nom_pai > b.nom_pai) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCountries) {
        let valOption = ""+item.cod_pai.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_pai+'</option> \n';
    }
    $('#formSeerOptional select[name="uco_cod_pai"]').html(htmlOptions);
    iCtrlSeerOptional.printDeparment();
}
iCtrlSeerOptional.printDeparment = function() {
    let elCodeCountry = $('#formSeerOptional select[name="uco_cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let filterDepartments = ctrlDataWizard.departamentos.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry)? true: false;
    });

    filterDepartments.sort(function(a, b) {
        if(a.nom_dep < b.nom_dep) { return -1; }
        if(a.nom_dep > b.nom_dep) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterDepartments) {
        let valOption = ""+item.cod_dep.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_dep+'</option> \n';
        availableTags.push({label: item.nom_dep, value: valOption});
    }
    $('#formSeerOptional select[name="uco_cod_dep"]').html(htmlOptions);
    $('#formSeerOptional select[name="uco_cod_dep"]').val("05");
    $('#formSeerOptional #textUcoCodDep').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcoCodDep').val(ui.item.label);
            $('#ucoCodDep').val(ui.item.value);
            $('#formSeerOptional #textUcoCodCiu').val('');
            iCtrlSeerOptional.printCities();
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcoCodDep").val(ui.item.label);
            $('#ucoCodDep').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formSeerOptional #textUcoCodDep').val('ANTIOQUIA');
    $('#formSeerOptional #textUcoCodCiu').val('');
    iCtrlSeerOptional.printCities();
}
iCtrlSeerOptional.printCities = function() {
    let elCodeCountry = $('#formSeerOptional select[name="uco_cod_pai"]');
    let codeCountry = elCodeCountry.val();
    let elCodeDeparment = $('#formSeerOptional select[name="uco_cod_dep"]');
    let codeDeparment = elCodeDeparment.val();
    let filterCities = ctrlDataWizard.ciudades.filter(function(a) {
        let aCodeCountry = ""+a.cod_pai.replace(/(\s)/g, '');
        let aCodeDeparment = ""+a.cod_dep.replace(/(\s)/g, '');
        return (aCodeCountry == codeCountry && aCodeDeparment == codeDeparment)? true: false;
    });
    filterCities.sort(function(a, b) {
        if(a.nom_ciu < b.nom_ciu) { return -1; }
        if(a.nom_ciu > b.nom_ciu) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterCities) {
        let valOption = ""+item.cod_ciu.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_ciu+'</option> \n';
        availableTags.push({label: item.nom_ciu, value: valOption});
    }
    $('#formSeerOptional select[name="uco_cod_ciu"]').html(htmlOptions);
    $('#formSeerOptional #textUcoCodCiu').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcoCodCiu').val(ui.item.label);
            $('#ucoCodCiu').val(ui.item.value);
            $('#formSeerOptional #textUcoCodBarrio').val('');
            iCtrlSeerOptional.printCommune();
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcoCodCiu").val(ui.item.label);
            $('#ucoCodCiu').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
    $('#formSeerOptional #textUcoCodBarrio').val('');
    iCtrlSeer.printCommune();
}
iCtrlSeerOptional.printCommune = function() {
    let elCodeCity = $('#formSeerOptional select[name="uco_cod_ciu"]');
    let codeCity = elCodeCity.val();
    let filterCommunes = ctrlDataWizard.comunas.filter(function(a) {
        let aCode = ""+a.cod_ciu.replace(/(\s)/g, '');
        return (aCode == codeCity)? true: false;
    });

    filterCommunes.sort(function(a, b) {
        if(a.nom_comuna < b.nom_comuna) { return -1; }
        if(a.nom_comuna > b.nom_comuna) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    for (let item of filterCommunes) {
        let valOption = ""+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption+'">'+item.nom_comuna+'</option> \n';
    }
    $('#formSeerOptional select[name="uco_cod_comuna"]').html(htmlOptions);
    $('#formSeerOptional #textUcoCodBarrio').val('');
    iCtrlSeerOptional.printNeighborhood();
}
iCtrlSeerOptional.printNeighborhood = function() {
    let elCodeCity = $('#formSeerOptional select[name="uco_cod_ciu"]');
    let codeCity = elCodeCity.val();
    let elCodeComunne = $('#formSeerOptional select[name="uco_cod_comuna"]');
    let codComunne = elCodeComunne.val();
    let filterNeighborhoods = ctrlDataWizard.barrios.filter(function(a) {
        let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
        // let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); && aCodComunne == codComunne
        return (aCodeCity == codeCity)? true: false;
    });
    filterNeighborhoods.sort(function(a, b) {
        if(a.nom_barrio < b.nom_barrio) { return -1; }
        if(a.nom_barrio > b.nom_barrio) { return 1; }
        return 0;
    });
    let htmlOptions = "";
    let availableTags = [];
    for (let item of filterNeighborhoods) {
        let filterCommune = ctrlDataWizard.comunas.filter(function(a) {
            let aCodComunne = ""+a.cod_comuna.replace(/(\s)/g, ''); // && aCodComunne == codComunne
            let iCodComune = ""+item.cod_comuna.replace(/(\s)/g, '');
            let aCodeCity = ""+a.cod_ciu.replace(/(\s)/g, '');
            let iCodeCity = ""+item.cod_ciu.replace(/(\s)/g, '');
            return (aCodeCity == iCodeCity && aCodComunne == iCodComune)? true: false;
        })[0];
        let valOption = ""+item.cod_barrio.replace(/(\s)/g, '');
        let valOption2 = ""+item.cod_barrio.replace(/(\s)/g, '')+"|"+item.cod_comuna.replace(/(\s)/g, '');
        htmlOptions += '<option value="'+valOption2+'">'+item.nom_barrio+' - '+filterCommune.nom_comuna+'</option> \n';
        availableTags.push({label: (item.nom_barrio+' - '+filterCommune.nom_comuna), value: valOption2});
    }
    $('#formSeerOptional select[name="uco_cod_barrio"]').html(htmlOptions);
    $('#formSeerOptional #textUcoCodBarrio').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#textUcoCodBarrio').val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#ucoCodBarrio').val(ui.item.value);
            $('#formSeerOptional select[name="uco_cod_comuna"]').val(valNeighborhood[1]);
            return false;
        },
        'focus': function(event, ui) {
            $("#textUcoCodBarrio").val(ui.item.label);
            let valNeighborhood = ui.item.value.split("|");
            $('#ucoCodBarrio').val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    });
}
iCtrlSeerOptional.autoCompleteEmail = function() {
    let eDomains = [];
    for (let item of ctrlDataWizard.dominios) {
        if(item.dominio.indexOf('@') !== -1) {
            eDomains.push(item.dominio.trim());
        }
    }
    $('#formSeerOptional').on('keyup', 'input[name="uco_email"]', function(evt) {
        let elVal = evt.target.value.replace(/\s/g, '');
        if(elVal.indexOf('@') == -1 && elVal.length > 0) {
            let availableTags = [];
            for (let item of eDomains) {
                let tmpVal = elVal+''+item;
                availableTags.push({label: tmpVal, value: tmpVal});
            }
            $('#formSeerOptional #eDomainsOptional').autocomplete({
                'minLength': 0,
                'source': availableTags
            }).focus(function () {
                $(this).autocomplete('search');
            });
        }else {
            $('#formSeerOptional #eDomainsOptional').autocomplete({'source': []});
        }
    });
}
/* ******* / VIDENTE OPCIONAL ******* */


iCtrlWizard.closePdfstModal = function() {
    swal({
        'title': 'Cliente sin firmar autorizacion(es)',
        'text': 'Para continuar firmar los documentos.',
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

iCtrlWizard.closeFingerprintModal = function() {
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

iCtrlWizard.closeFingerprintRegModal = function() {
    swal({
        'title': 'Cliente sín Huellas',
        'text': 'Para continuar se debe registrar las huellas.',
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

/**
* @description iCtrl.newDataTableAutCentral Inicializa la tabla de autorizacion
* de centrales
* @return {void}
*/
iCtrlWizard.newDataTableAutCentral = function() {
    $('#datatablesAutCentral').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        'columns': [
            { 'data': 'detalle' },
            { 'data': 'plantilla' },
            { 'data': 'usuario' },
            { 'data': 'maquina' },
            { 'data': 'fecha' }
        ]
    });
    iCtrlWizard.tableAutCentral = $('#datatablesAutCentral').DataTable();
}
/**
* @description iCtrl.newDataTableResult Inicializa la tabla de resultados
* @return {void}
*/
iCtrlWizard.newDataTableResult = function() {
    $('#datatablesResult').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        "lengthMenu": [[3, 5, 10, 25, 50, -1], [3, 5, 10, 25, 50, "All"]],
        "order": [],
        'paging': true,
        'columns': [
            { 'data': 'fecha' },
            { 'data': 'origen' },
            { 'data': 'cupo' },
            { 'data': 'val_sol' },
            { 'data': 'resultado' },
            { 'data': 'razon_resultado' },
            { 'data': 'usuario' },
            { 'data': 'notas' }
        ]
    });
    iCtrlWizard.tableResult = $('#datatablesResult').DataTable();
}
/**
* @description iCtrl.newDataTableCod Inicializa la tabla de codeudores
* @return {void}
*/
iCtrlWizard.newDataTableCod = function() {
    $('#datatablesCod').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        'paging': false,
        "order": [],
        'columns': [
            { 'data': 'codeudor' },
            { 'data': 'nombre' },
            { 'data': 'usuario_ingreso' },
            { 'data': 'fecha_aprobacion' },
            { 'data': 'cupo' },
            { 'data': 'usuario_aprobacion' },
            { 'data': 'proximo_negocio' }
        ]
    });
    iCtrlWizard.tableCod = $('#datatablesCod').DataTable();
}
/**
* @description iCtrlWizard.newDataTableHistFP Inicializa la tabla de historia de
* verificaion de huellas
* @return {void}
*/
iCtrlWizard.newDataTableHistFP = function() {
    $('#dataTableHistFP').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'lengthChange': false,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        'paging': true,
        "order": [],
        'columns': [
            { 'data': 'fecha_valida' },
            { 'data': 'empresa' },
            { 'data': 'caja' },
            { 'data': 'tipo' },
            { 'data': 'validacion' },
            { 'data': 'modulo' }
        ]
    });
    iCtrlWizard.tableHistFP = $('#dataTableHistFP').DataTable();
}
/**
* @description iCtrlWizard.newDataTableRegFP Inicializa la tabla de registro
* de huella
* @return {void}
*/
iCtrlWizard.newDataTableRegFP = function() {

    $('#dataTableRegFP').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': false,
        'language': infoDatable.language,
        'searching': false,
        'paging': false,
        'pageLength': 3,
        'order': [],
        'columns': [
            { 'data': 'creacion' },
            { 'data': 'dedo' },
            { 'data': 'empresa' },
            { 'data': 'caja' }
        ]
    });
    iCtrlWizard.tableRegFP = $('#dataTableRegFP').DataTable();
}

$(document).ready(function() {
    iCtrlSeer.onSubmitValidClient();
    iCtrlWizard.onSubmitFormWizard();
    iCtrlWizard.initMaterialWizard();
    iCtrlWizard.onChangeBirthdate();
    iCtrlWizard.onChangeSelects();
    iCtrlWizard.onClosePdfsModal();
    iCtrlWizard.onOpenPdfsCc();

    iCtrlWizard.newDataTableAutCentral();
    iCtrlWizard.newDataTableResult();
    iCtrlWizard.newDataTableCod();
    iCtrlWizard.newDataTableHistFP();
    iCtrlWizard.newDataTableRegFP();

    setTimeout(function() {
        iCtrlWizard.onChangeFieldsFormWizard();
    }, 800);
    setTimeout(function() {
        iCtrlWizard.onChangeFieldsFormWizard();
    }, 1000);

    iCtrlWizard.newInputsDatePicker();
    iCtrlWizard.onChangeSelects();
    iCtrlWizard.printCountry();
    iCtrlWizard.printResidences();
    iCtrlWizard.printParents();
    iCtrlWizard.printJobs();
    iCtrlWizard.printSellers();
    iCtrlWizard.almacenes();
    iCtrlWizard.autoCompleteEmail();

    iCtrlWizard.controlsKeys();


    iCtrlSeer.onChangeSelects();
    iCtrlSeer.printCountry();
    // iCtrlSeer.onBlurDocument();
    iCtrlSeer.listenSelectAnswer();

    iCtrlSeerOptional.printCountry();
    iCtrlSeerOptional.printParents();
    iCtrlSeerOptional.autoCompleteEmail();


    $('[data-toggle="tooltip"]').tooltip();

    // $('#formWizard select[name="cod_dep"]').val('05');
    // $('#formWizard input[name="text_cod_dep"]').val($('#formWizard select[name="cod_dep"] option[value="05"]').html());
    // $('#formWizard select[name="cod_dep"]').change();
    // $('#formWizard select[name="uc_cod_dep"]').val('05');
    // $('#formWizard input[name="uc_text_cod_dep"]').val($('#formWizard select[name="uc_cod_dep"] option[value="05"]').html());
    // $('#formWizard select[name="uc_cod_dep"]').change();

    // $('#formWizard select[name="cod_ciu"]').val('05001');
    // $('#formWizard input[name="text_cod_ciu"]').val($('#formWizard select[name="cod_ciu"] option[value="05001"]').html());
    // $('#formWizard select[name="cod_ciu"]').change();
    // $('#formWizard select[name="uc_cod_ciu"]').val('05001');
    // $('#formWizard input[name="uc_text_cod_ciu"]').val($('#formWizard select[name="uc_cod_ciu"] option[value="05001"]').html());
    // $('#formWizard select[name="uc_cod_ciu"]').change();


    /** Control de clases para la vista de archivos */
    $(document).on('dragenter','.file-zone',function(e) {
        $(this).addClass('drag-hover');
    });
    $(document).on('dragleave','.file-zone',function(e) {
        $('.file-zone').removeClass('drag-hover');
    });
    $(document).on('drop','.file-zone',function(e) {
        $('.file-zone').removeClass('drag-hover');
    });
    /** / Control de clases para la vista de archivos */

    setTimeout(function() {
        $('#formWizard input[name="fec_nac"]').val('');
    }, 300);


    $(document).on('change', '#sideA', function() {
        let countSides = $('#cedula input[name="side_a"]')[0].files.length;
        if(countSides >= 2) {
            iCtrlWizard.onSubmitDocuments(function(responseSd) { });
        }
    });

    $(document).on('change', '#attached1, #attached2', function() {
        iCtrlWizard.saveAttached();
    });

    /**
    * preimplementacion de nombre y apellido obligatorio
    */
    $(document).on('focusout', '#generales input, #generales select', function(evt) {
        let inputToValid = ['nom1_cli','ap1_cli'];
        let inputBack = ['tip_ide','nit_ciu','cod_cli','fec_nac','edad'];
        let elName = evt.target.name;
        if(evt.relatedTarget) {
            if(evt.relatedTarget.tagName == 'INPUT' || evt.relatedTarget.tagName == 'SELECT') {
                let elRName = evt.relatedTarget.name;
                if(inputToValid.indexOf(elName) != -1 && inputBack.indexOf(elRName) == -1) {
                    let elValue = evt.target.value.replace(/(\s)|(0)/g, '');
                    if(!elValue) {
                        $(evt.target).focus();
                    }
                }
            }
        }
    });
    $(document).on('focusin', '#generales input, #generales select', function(evt) {
        let inputBack = ['nom1_cli','tip_ide','nit_ciu','cod_cli','fec_nac','edad'];
        let elRName = evt.target.name;
        if(inputBack.indexOf(elRName) == -1) {
            let elName = getValInput('#generales input[name="nom1_cli"]').replace(/(\s)|(0)/g);
            let elLastname = getValInput('#generales input[name="ap1_cli"]').replace(/(\s)|(0)/g);
            if(!elName) {
                if(elRName != 'ap1_cli' && elRName != 'nom1_cli') {
                    $('#generales input[name="nom1_cli"]').focus();
                }
            }else if(!elLastname) {
                if(elRName != 'ap1_cli' && elRName != 'nom1_cli' && elRName != 'nom2_cli') {
                    $('#generales input[name="ap1_cli"]').focus();
                }
            }
        }
    });
    /**
    * Preimplementacion de ultima cedula digitada
    */
    let lastCC = getItemLS({'key': 'last_cc_'+ctrlDataWizard.usuario.nom_usu});
    if(lastCC) {
        let arrLastCC = lastCC.split('|');
        $('#fwCedula').html(arrLastCC[0]);
        $('#fwCliente').html(arrLastCC[1]);
        // $('#formValidateClient input[name="validar_cedula"]').val(lastCC);
        if(!ctrlDataWizard.usuario.ind_auto_firma) {
            $('#aut-centrales #autManual001').prop('disabled', 'true');
            $('#aut-centrales #autManual005').prop('disabled', 'true');
            $('#aut-centrales #autManual006').prop('disabled', 'true');
            $('#aut-centrales .file-zone').addClass('c-disabled');
        }
    }
    /**
    * eventos para los inputs de swal
    */
    setTimeout(() => {
        $(document).on('keyup','#swalInputCupo', function(event) {
            return isNumber(event);
        }).on('keyup','#swalInputCupo', function(event) {
            formatNumber(event,"$ ", true);
        });
        $(document).on('keyup','#swalInputNotasPos', function(event) {
            onlyUpperCase(document.getElementById('swalInputNotasPos'));
        });
        $(document).on('keyup','#swalInputLastName', function(event) {
            onlyUpperCase(document.getElementById('swalInputLastName'));
        });
    }, 800);
});

/**
* Preguntar antes de salir
*/
/** --- ***** --- */
window.onbeforeunload = beforeLeave;
function beforeLeave() {
    if(ctrlDataSeer.validClient && !sendingForm && dilForm) {
        let isModified = false;
        if($('#formWizard input[name="dat_general"]').val() == '1') {
            isModified = true;
        }else if($('#formWizard input[name="dat_laboral"]').val() == '1') {
            isModified = true;
        }else if($('#formWizard input[name="dat_comercial"]').val() == '1') {
            isModified = true;
        }else if($('#formWizard input[name="dat_personal"]').val() == '1') {
            isModified = true;
        }

        if(isModified) {
            iCtrlWizard.sendDirectFormWizard();
        }
        return "¿Seguro que quieres salir?";
    }
}
/** --- / ***** --- */
/** ***** */


/** ***** / VIDENTE ***** */
