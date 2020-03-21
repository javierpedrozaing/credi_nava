var urlPreloader = 'https://www.credimarcas.com.co/img/preloader.gif';
//var urlWS = 'https://www.credimarcas.com.co:8001/ws';
urlWS = 'http://181.57.139.234:4101/ws';

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param base64toBlob {String} Pure base64toBlob string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @return Blob
 */
function base64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function readURL(input, uidFile, uidPreviewFile) { // input => this del elemento, uidFile => id del input tipo file, uidPreviewFile => id del elemento para previsualizar, atributo src
    if (input.files && input.files[0]) {
        var countFiles = 0;
        for (let file of input.files) {
            let reader = new FileReader();
            reader.onload = function(e, test) {
                $('#' + uidFile[countFiles]).siblings('.drop-zone').html(input.files[countFiles].name);
                if (uidPreviewFile[countFiles]) {
                    $('#' + uidPreviewFile[countFiles]).attr('src', e.target.result);
                    $('#' + uidPreviewFile[countFiles]).show();
                }
                countFiles++;
            };
            reader.readAsDataURL(file);
        }
    }
}

function togglePreloader(input) {
    if (input) {
        let elPreloader = document.createElement("img");
        elPreloader.setAttribute("src", urlPreloader);
        swal({
            'title': 'Cargando datos...',
            'content': elPreloader,
            'buttons': {
                'cancel': false,
                'confirm': false
            },
            'closeOnClickOutside': false
        });
    } else {
        swal.close();
    }
}


function onlyUpperCase(evt) {
    evt.value = evt.value.toUpperCase();
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (((charCode > 31 && charCode < 48) || charCode > 57) || charCode == 13) {
        return false;
    }
    return true;
}

function isDate(input, format) {
    if (!input) { return false; }
    let toMatch = "" + ((input) ? input : "");
    let rMatch = toMatch.match(/^\d{2}[\/]\d{2}[\/]\d{4}/g);
    return (rMatch.length) ? true : false;
}

function calculateAge(input) {
    let birthdayArr = input.split("/"); // DD/MM/YYYY
    let birthdayDate = new Date(birthdayArr[2], birthdayArr[1] - 1, birthdayArr[0]);
    let ageDifMs = Date.now() - birthdayDate.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatNumber(evt, pre, noFloat) {
    let value = evt.target.value;
    let valPre = ((pre) ? pre : "");
    evt.target.value = valPre + "" + value.replace(/\D/g, "");
    if (!noFloat) {
        evt.target.value = evt.target.value.replace(/([0-9])([0-9]{2})$/, '$1.$2');
    }

    evt.target.value = evt.target.value.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}

function getJSON(options, fn) {
    $.ajax({
        'type': "GET",
        'headers': {
            'X-CSRF-Token': csrfToken
        },
        'url': options.path,
        'data': options.data,
        'success': function(response) {
            fn(null, response);
        },
        'error': function(request, status, error) {
            fn(error, null);
        },
        'dataType': "json"
    });
}

function reqJSON(options, fn, auth) {
    if (auth) {
        options.data['user'] = 'confe';
        options.data['password'] = 'vedA_Ewaca6u';
    }
    let reqData = {
        'type': ((options.type) ? options.type : "GET"),
        'headers': {
            'X-CSRF-Token': csrfToken
        },
        'url': options.path,
        'data': options.data,
        'success': function(response) {
            console.log("response reqJSON => ", response);

            fn(null, response);
        },
        'error': function(request, status, error) {
            console.log("error response reqJSON => ", error);
            fn(error, null);

        },
        'dataType': "json"
    };

    if (options.isFile) {
        reqData['cache'] = false;
        reqData['contentType'] = false;
        reqData['processData'] = false;
        reqData['method'] = 'POST';
    }

    $.ajax(reqData);
}



async function reqJSON2(options) {


    options.data['user'] = 'confe';
    options.data['password'] = 'vedA_Ewaca6u';

    let response = await fetch(options.path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(options.data)
    });

    const json = await response.json();
    return json;

}



function getValInput(input) {
    let elInput = $(input);
    let valInput = elInput.val();
    return ((valInput) ? valInput : '');
}

function formToJSON(selector, preToReplace) {
    var form = document.querySelector(selector);
    var obj = {};
    var elements = form.querySelectorAll("input, select, textarea");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        if (preToReplace) {
            name = '' + name.replace(preToReplace, '');
        }

        if (name) {
            obj[name] = value;
        }
    }

    return JSON.parse(JSON.stringify(obj));
}

function setItemLS(input) {
    let dataToLS = input.data;
    if (typeof(dataToLS) == 'object') {
        dataToLS = JSON.stringify(dataToLS);
    }
    localStorage.setItem(input.key, dataToLS);
}

function getItemLS(input) {
    let result = localStorage.getItem(input.key);
    if (isStringJSON(result)) {
        result = JSON.parse(result);
    }
    return result;
}

function isStringJSON(input) {
    if (typeof input !== "string") { return false; }
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}

function toggleFSTabsPdfs(input) {
    var element = document.querySelector('#' + input + '.modal');
    if (element) {
        element.classList.toggle("toogleFSTabsPdfs");
    }
}

function printHtml(html) {
    $('#impresora').html(html);
    var mywindow = window.open('', 'PRINT', 'height=800,width=700');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write($('#impresora').html());
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.onfocus = function() { setTimeout(() => { mywindow.close(); }, 200); };
}

function printPazSalvo(doc, fecha, cliente, nomcli, almacen) {
    $('#impresora').html('');

    var html = '<div style="font-family: Arial, sans-serif; font-size: 10px;width: 302px;">' +
        '<h1 align="center" style="font-size: 15px;">CONFE S.A.S.</h1>' +
        '<p align="center">' + fecha + '</p>' +
        '<h1 align="center" style="font-size: 15px;">PAZ Y SALVO</h1>' +
        '<p align="center">Factura Nro: ' + doc + '</p>' +
        '<p align="center"><b>A quien pueda interesar</b></p>' +
        '<p>Certificamos que el señor(a) ' + nomcli + ', identificado(a) con cédula de diudadanía número ' + cliente + ', se encuentra a paz y salvo con CONFE S.A.S. por el crédito ' + doc + ' Adquirido en el almacén ' + almacen + '.</p>' +
        '<p>Deudor<br/><br/><br/><br/>_________________________________</p>' +
        '<p>' + nomcli + '<br/>' + cliente + '</p>' +
        '</div>';

    printHtml(html);
}

function printRecaudosVentasDiarias(cod_caja, cod_sucursal, role_usu, dateFrom, dateTo) {
    togglePreloader(true);
    $('#impresora').html('');
    reqJSON({
        'path': urlWS + '/recaudoVentasExternos',
        'data': {
            'user': 'confe',
            'password': 'vedA_Ewaca6u',
            'strempresa': cod_sucursal,
            'datfecha_ini': dateFrom,
            'datfecha_fin': dateTo,
            'strbodega': ((role_usu == 'G_INFORMES') ? '%' : cod_caja)
        },
        'type': 'POST'
    }, function(err, response) {
        togglePreloader(false);
        if (err) {
            console.error(response.msg);
            swal({
                title: 'Un error ha ocurrido',
                icon: 'error',
                dangerMode: true
            }).then((value) => {});
            return;
        }

        if (response.data[0].length > 0) {
            console.log(response);
            let dRows = response.data[0];
            let cRows = {};
            let tmpRows = {};

            for (let item of dRows) {
                if (!cRows[item.Tip_Documento]) {
                    cRows[item.Tip_Documento] = [];
                }
                cRows[item.Tip_Documento].push(item);
            }
            for (let kItem in cRows) {
                for (let item of cRows[kItem]) {
                    if (!tmpRows[item.Tip_Documento]) {
                        tmpRows[item.Tip_Documento] = {};
                    }
                    if (!tmpRows[item.Tip_Documento][item.cod_cco]) {
                        tmpRows[item.Tip_Documento][item.cod_cco] = [];
                    }
                    tmpRows[item.Tip_Documento][item.cod_cco].push(item);
                }
            }

            let detailHtml = '';
            for (let it of _.keys(tmpRows)) {
                for (let itCco of _.keys(tmpRows[it])) {
                    itCco = tmpRows[it][itCco];
                    detailHtml += `<p><strong>${it}</strong></p>   
                        <p><strong>${itCco[0].cod_cco}&nbsp;&nbsp;&nbsp;&nbsp;${itCco[0].nom_cco}</strong></p>
                        <table style="width:90%; margin-left: 20px; font-size: 14px;" >
                        <tr>
                            <th style="text-align: left;">Fecha</th>
                            <th style="text-align: right;">Subtotal</th>
                            <th style="text-align: right;">Total</th>
                        </tr>`;
                    var subtotal = 0;
                    var total = 0;

                    var itCcoTmp = _.map(_.groupBy(itCco, 'fch_doc'), (o) => { return { "fecha": o[0].fch_doc, "capital": _.map(o, (obj) => { return obj.capiltal }).reduce((a, b) => a + b), "total": _.map(o, (obj) => { return obj.total }).reduce((a, b) => a + b) }; })

                    for (let itDetail of itCcoTmp) {
                        subtotal += itDetail.capital;
                        total += itDetail.total;
                        detailHtml += `<tr>
                            <td style="text-align: left;">${moment(itDetail.fecha.split("T")[0]).format('DD/MM/YYYY')}</td>
                            <td style="text-align: right;">${numeral(itDetail.capital).format('$0,000')}</td>
                            <td style="text-align: right;">${numeral(itDetail.total).format('$0,000')}</td>
                        </tr>`;
                    }
                    detailHtml += `<tr>
                        <td style="text-align: right;"><strong>Total:</strong></td>
                        <td style="text-align: right;"><strong>${numeral(subtotal).format('$0,000')}</strong></td>
                        <td style="text-align: right;"><strong>${numeral(total).format('$0,000')}</strong></td>
                    </tr></table>`;
                }
            }

            let html = `<div class="impresora">
                <div style="font-family: Arial, sans-serif; font-size: 14px;width: 302px;">
                    <h1 align="center" style="font-size: 15px;">CONFE S.A.S.<br/>800.097.373-0</h1>
                    <p><strong>Fecha: ${moment().format('DD/MM/YYYY')}&nbsp;&nbsp;&nbsp;&nbsp;14:24:49 &nbsp;Pag.: 1 de 1</strong></p>
                    <p>
                        <strong>RECAUDOS Y VENTAS DIARIAS - TIRILLA</strong><br/>
                        Fecha: ${moment(dateFrom).format('DD/MM/YYYY')} - ${moment(dateTo).format('DD/MM/YYYY')}
                    </p>
                    ${detailHtml}
                    </div>
                </div>`;
            printHtml(html);
        } else {
            swal({
                title: 'No se encontraron datos',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            return;
        }
    })
}

function printInvoiceLetter(number, ignorePreload) {
    if (!ignorePreload) { togglePreloader(true) }
    $('#impresora').html('');
    reqJSON({
        'path': './imprimirFactura',
        'data': {
            'num_doc': number
        },
        'type': 'POST'
    }, function(err, response) {
        if (!ignorePreload) { togglePreloader(false) }
        if (err) {
            swal({
                title: 'Un error ocurrio, intentalo mas tarde',
                icon: 'error',
                dangerMode: true
            });
            return;
        }

        if (response.msg == "Success") {
            console.log(response);
            moment.locale("es");
            console.log(response);
            let info_fact = response.data[0][0];
            let info_detail = response.data[1][0];

            let cuotas = info_detail.Cuotas.split(';');
            let valorCuota = info_detail.ValorCuota.split(';');
            let fecVen = info_detail.FecVen.split(';');
            let valCap = info_detail.ValCap.split(';');
            let ValIvaInt = info_detail.ValIvaInt.split(';');
            let valCuota = info_detail.ValorCuota.split(';');
            let valInt = info_detail.ValInt.split(';');            
            let valFianza = info_detail.ValFianza.split(';');
            let valIvaFia = info_detail.ValIvaFia.split(';');            
            let codeudor = (!_.isNull(info_fact.codeudor1) && !_.isNull(info_fact.nom_cod)) ? info_fact.codeudor1.trim() + '-' + info_fact.nom_cod.trim() : '';


            ////////////////////////// //// START FORMAT RECIBO //////////////////////////
            var outputHtmlRecibo = '<div style="padding: 5px;border:1px solid; display:inline-block; font-family: Roboto, Segoe UI, Tahoma, sans-serif, sans-serif; font-size: 9px; width: 12cm;margin-top:1.5cm;">' +
            '<h3 style="background-color: #bdb8b8;text-align: center;margin: 0 auto;width: 11cm;padding: 0;font-weight: 800;font-size: 11px;font-family: Roboto, Segoe UI, Tahoma, sans-serif;">Nuestra razón social cambió a partir de 27-NOV-2019 por Confe S.A.S</h3>' +
            '<div style="display: block;margin: 0;height: auto;">' +                
                '<p style="margin: 2px 4px;">' + info_fact.vendedor + "  " + info_fact.nom_ven + '</p>' +
                '<div style="text-align: center;margin: 0 auto;width: 12cm;display: inline-block;">' +
                    '<div style="display: inline-block;margin-left: 2cm;width: 7cm;">' +
                    '<h2 style="text-align: center;margin: 2px auto;">' + "RECIBO DE CAJA" + '</h2>' +
                    '<h3 style="margin: 0;">No' + info_fact.num_pagare + '</h3>' +
                    '</div>' +
                    '<div style="display: inline-block;vertical-align: top;margin-top: 8px;line-height: 6px;float:right;">' +
                    '<p style="margin: auto;text-align: right;">Page 1 de 1</p>' +
                    '<p style="text-align: right;">' + info_fact.FechaHora.trim() + '</p>' +
                    '</div>' +
                '</div>' + 
                
                '<div style="text-align: left;display: inline-block;width: 8.5cm;line-height: 7px;">' +
                    '<p>CUENTA CORRIENTE</p>' +
                    '<p><strong>Cliente: </strong>' + info_fact.cliente + " " + info_fact.nom_cli + '</p>' +
                    '<p><strong>Elaboro: </strong>' + info_fact.nom_ven + '</p>' +
                '</div>' +
                '<div style="display: inline-block; vertical-align: top; text-align: right;line-height: 6px;  float: right;">'+
                    '<div style="display: block;">' +
                        '<p style="display: inline-block; width: 2cm;">REIMPRESO</p>' +
                    '</div>' + 
                '</div>' + 
            '</div>' +

            '<div style="width: 8.7cm;padding: 0px 0;display: inline-block;">' +
                '<h2 style="background-color:#ccc;text-align: left;width: 5cm;margin: 2px 0;">Cupo Disponible  $  ' + info_fact.cup_cli + '</h2>' +
            '</div>' +
            '<span style="text-align: right;position: relative;">(Para su uso debe estar al día).</span>' + 
            '<p style="margin: 0;">Aplica restricciones para primeros creditos con codeudor</p>';

        outputHtmlRecibo += '<table style="width:11.5cm; font-size:8px;">' +
            '<thead>' +
            '<tr style="border-top: 1px solid #000000;display: block;width: 11.5cm;border-bottom: 1px solid #000000;">' +
            '<th style="width:1cm;">Documento</th>' +
            '<th style="width:5cm;">Fecha</th>' +
            '<th style="width:1cm;">Cuota</th>' +
            '<th style="width:2cm;">Vr Cuota</th>' +
            '<th style="width:2cm;">Vr Capital</th>' +
            '<th style="width:3cm;">Vr. Int. Cte</th>' +
            '<th style="width:2cm;">Vr. Fianza</th>' +
            '<th style="width:3cm;">Vr.int.Mora</th>' +
            '<th style="width:2cm;">Vr Total</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (k in cuotas) {
            outputHtmlRecibo += '<tr style="display: block;width: 11.5cm;">' +
                '<td style="width:2cm;">' + info_fact.cliente + '</td>' +
                '<td style="width:4cm;">' + fecVen[k] + '</td>' +
                '<td style="width:2cm;">' + cuotas[k] + '</td>' +
                '<td style="width:2cm;">' + valorCuota[k] + '</td>' +
                '<td style="width:2cm;">' + info_detail.VTCap + '</td>' +
                '<td style="width:2cm;">' + valInt[k] + '</td>' +
                '<td style="width:2cm;">' + valFianza[k] + '</td>' +
                '<td style="width:2cm;">' + info_detail.VTInteres + '</td>' +
                '<td style="width:2cm;">' + info_detail.ValorTotal + '</td>' +
                '</tr>';
        }

        outputHtmlRecibo += '</tbody></table>';

        outputHtmlRecibo += '<hr style="border:1px solid #0000008f;"><hr style="border:1px solid #0000008f;">';

        outputHtmlRecibo += '<strong style="text-align: left;width: 7cm;display: inline-block;">Observaciones:</strong>' +                
            '<h2 style="text-align: right; display: inline-block; margin:0;"><span style="width: 3.8cm;display: inline-block;text-align: left;">Vr. Recaudo:</span><span>'+ info_fact.val_tot +'</span></h2>'+
            '<div style="margin: 3px 0;">' +
                '<div style="width:7cm; display: inline-block;">' +                
                    '<p style="margin:0 2px;">PAGO CREADO AUTOMATICAMENTE</p>' +
                    '<p style="margin: 8px 20px;"><strong style="width: 4.3cm;display: inline-block;">Tasa de interes monetario diario</strong><span> '+ info_fact.tasa_ea + '%' + '</span></p>' +
                '</div>' +
                '<div style="display: inline-block;vertical-align: top;width: 4cm;">' +
                    '<p style="text-align: left;margin: 0;width: 5cm;"><span style="width: 4.2cm;display: inline-block;">Interes Mora </span><span style="font-size:11px;">0000</span> </p> ' + //??				
                    '<p style="text-align: left;margin: 6px 0;width: 5cm;"><span style="width: 4.2cm;display: inline-block;">Iva Mora </span><span style="font-size:11px;">0000</span> </p>' + //??
                '</div>' +
            '</div>' +
            '<h4 style="text-align: center;width: 7cm;margin: 0;">GRACAS POR SU PAGO</h4>' +
            '<p style="width: 6cm;text-align: center; margin: 0 22px;">RECUERDE QUE ES IMPORTANTE MANTENER SU CREDITO AL DÍA</p>' +
            
            '<div style="display: inline-block;">' +
                '<div style="text-align: left;display: inline-block;width: 5cm;margin: 0 36px;">' +                        
                    '<p style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;">Saldo Capital</span><span> '+info_detail.VTCap+' </span></p>' +                        
                    '<p  style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;"> Saldo Interes </span><span> '+info_detail.VTInteres+' </span>' +             
                '</div>' +
                '<div style="display: inline-block;width: 5cm;vertical-align: top;">' +
                    '<p style="text-align: right;margin: 8px 0;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">N.C Pago Anticipado</span> <span style="float: right;">0</span></p>' +  // ??                      
                    '<p style="text-align: right; line-height: 23px;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">Total recibido</span> <span style="float: right;"> ' + info_fact.recibido + '</span></p>' +                        
                    '<p style="text-align: right;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">EFECTIVO:</span> <span style="float: right;"> ' + info_fact.val_uni + '</span> </p>' +
                '</div>' +                    
            '</div>' +                
            '<div style="display: inline-block;">' +
                '<div style="text-align: left;display: inline-block;width: 5cm;margin: 0 36px;">' +                     
                    '<p style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;">Capital + Interes</span><span>'+(info_detail.VTCap + info_detail.VTInteres)+' </span></p>' +
                '</div>' + 
                '<div style="display: inline-block;width: 5cm;vertical-align: top;">' +                         
                    '<p style="text-align: right;margin: 8px 0;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">Cambio</span> <span style="float: right;">89799</span></p>' + // ??
                '</div>' +
            '</div>' +
            '<p style="text-align: center">Usuario: ' + info_fact.usuario + ', Base de Datos:' + 'EXTNOVA' + '</p></div>'; // END TABLE 1

            // START COLUMN 2
            outputHtmlRecibo += '<div style="padding: 5px;border:1px solid; display:inline-block; font-family: Roboto, Segoe UI, Tahoma, sans-serif, sans-serif; font-size: 9px; width: 12cm;margin:0.2cm;">' +
            '<h3 style="background-color: #bdb8b8;text-align: center;margin: 0 auto;width: 11cm;padding: 0;font-weight: 800;font-size: 11px;font-family: Roboto, Segoe UI, Tahoma, sans-serif;">Nuestra razón social cambió a partir de 27-NOV-2019 por Confe S.A.S</h3>' +
            '<div style="display: block;margin: 0;height: auto;">' +                
                '<p style="margin: 2px 4px;">' + info_fact.vendedor + "  " + info_fact.nom_ven + '</p>' +
                '<div style="text-align: center;margin: 0 auto;width: 12cm;display: inline-block;">' +
                    '<div style="display: inline-block;margin-left: 2cm;width: 7cm;">' +
                    '<h2 style="text-align: center;margin: 2px auto;">' + "RECIBO DE CAJA" + '</h2>' +
                    '<h3 style="margin: 0;">No' + info_fact.num_pagare + '</h3>' +
                    '</div>' +
                    '<div style="display: inline-block;vertical-align: top;margin-top: 8px;line-height: 6px;float:right;">' +
                    '<p style="margin: auto;text-align: right;">Page 1 de 1</p>' +
                    '<p style="text-align: right;">' + info_fact.FechaHora.trim() + '</p>' +
                    '</div>' +
                '</div>' + 
                
                '<div style="text-align: left;display: inline-block;width: 8.5cm;line-height: 7px;">' +
                    '<p>CUENTA CORRIENTE</p>' +
                    '<p><strong>Cliente: </strong>' + info_fact.cliente + " " + info_fact.nom_cli + '</p>' +
                    '<p><strong>Elaboro: </strong>' + info_fact.nom_ven + '</p>' +
                '</div>' +
                '<div style="display: inline-block; vertical-align: top; text-align: right;line-height: 6px;  float: right;">'+
                    '<div style="display: block;">' +
                        '<p style="display: inline-block; width: 2cm;">REIMPRESO</p>' +
                    '</div>' + 
                '</div>' + 
            '</div>' +

            '<div style="width: 8.7cm;padding: 0px 0;display: inline-block;">' +
                '<h2 style="background-color:#ccc;text-align: left;width: 5cm;margin: 2px 0;">Cupo Disponible  $  ' + info_fact.cup_cli + '</h2>' +
            '</div>' +
            '<span style="text-align: right;position: relative;">(Para su uso debe estar al día).</span>' + 
            '<p style="margin: 0;">Aplica restricciones para primeros creditos con codeudor</p>';

        outputHtmlRecibo += '<table style="width:11.5cm; font-size:8px;">' +
            '<thead>' +
            '<tr style="border-top: 1px solid #000000;display: block;width: 11.5cm;border-bottom: 1px solid #000000;">' +
            '<th style="width:1cm;">Documento</th>' +
            '<th style="width:5cm;">Fecha</th>' +
            '<th style="width:1cm;">Cuota</th>' +
            '<th style="width:2cm;">Vr Cuota</th>' +
            '<th style="width:2cm;">Vr Capital</th>' +
            '<th style="width:3cm;">Vr. Int. Cte</th>' +
            '<th style="width:2cm;">Vr. Fianza</th>' +
            '<th style="width:3cm;">Vr.int.Mora</th>' +
            '<th style="width:2cm;">Vr Total</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (k in cuotas) {
            outputHtmlRecibo += '<tr style="display: block;width: 11.5cm;">' +
                '<td style="width:2cm;">' + info_fact.cliente + '</td>' +
                '<td style="width:4cm;">' + fecVen[k] + '</td>' +
                '<td style="width:2cm;">' + cuotas[k] + '</td>' +
                '<td style="width:2cm;">' + valorCuota[k] + '</td>' +
                '<td style="width:2cm;">' + info_detail.VTCap + '</td>' +
                '<td style="width:2cm;">' + valInt[k] + '</td>' +
                '<td style="width:2cm;">' + valFianza[k] + '</td>' +
                '<td style="width:2cm;">' + info_detail.VTInteres + '</td>' +
                '<td style="width:2cm;">' + info_detail.ValorTotal + '</td>' +
                '</tr>';
        }

        outputHtmlRecibo += '</tbody></table>';

        outputHtmlRecibo += '<hr style="border:1px solid #0000008f;"><hr style="border:1px solid #0000008f;">';

        outputHtmlRecibo += '<strong style="text-align: left;width: 7cm;display: inline-block;">Observaciones:</strong>' +                
            '<h2 style="text-align: right; display: inline-block; margin:0;"><span style="width: 3.8cm;display: inline-block;text-align: left;">Vr. Recaudo:</span><span>'+ info_fact.val_tot +'</span></h2>'+
            '<div style="margin: 3px 0;">' +
                '<div style="width:7cm; display: inline-block;">' +                
                    '<p style="margin:0 2px;">PAGO CREADO AUTOMATICAMENTE</p>' +
                    '<p style="margin: 8px 20px;"><strong style="width: 4.3cm;display: inline-block;">Tasa de interes monetario diario</strong><span> '+ info_fact.tasa_ea + '%' +'</span></p>' +
                '</div>' +
                '<div style="display: inline-block;vertical-align: top;width: 4cm;">' +
                    '<p style="text-align: left;margin: 0;width: 5cm;"><span style="width: 4.2cm;display: inline-block;">Interes Mora </span><span style="font-size:11px;">0000</span> </p> ' + //??				
                    '<p style="text-align: left;margin: 6px 0;width: 5cm;"><span style="width: 4.2cm;display: inline-block;">Iva Mora </span><span style="font-size:11px;">0000</span> </p>' + //??
                '</div>' +
            '</div>' +
            '<h4 style="text-align: center;width: 7cm;margin: 0;">GRACAS POR SU PAGO</h4>' +
            '<p style="width: 6cm;text-align: center; margin: 0 22px;">RECUERDE QUE ES IMPORTANTE MANTENER SU CREDITO AL DÍA</p>' +
            
            '<div style="display: inline-block;">' +
                '<div style="text-align: left;display: inline-block;width: 5cm;margin: 0 36px;">' +                        
                    '<p style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;">Saldo Capital</span><span> '+info_detail.VTCap+' </span></p>' +                        
                    '<p  style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;"> Saldo Interes </span><span> '+info_detail.VTInteres+' </span>' +             
                '</div>' +
                '<div style="display: inline-block;width: 5cm;vertical-align: top;">' +
                    '<p style="text-align: right;margin: 8px 0;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">N.C Pago Anticipado</span> <span style="float: right;">0</span></p>' +  // ??                      
                    '<p style="text-align: right; line-height: 23px;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">Total recibido</span> <span style="float: right;"> ' + info_fact.recibido + '</span></p>' +                        
                    '<p style="text-align: right;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">EFECTIVO:</span> <span style="float: right;"> ' + info_fact.val_uni + '</span> </p>' +
                '</div>' +                    
            '</div>' +                
            '<div style="display: inline-block;">' +
                '<div style="text-align: left;display: inline-block;width: 5cm;margin: 0 36px;">' +                     
                    '<p style="font-size: 10px;font-weight: bold;"><span style="text-align: left;width: 4cm;display: inline-block;">Capital + Interes</span><span>'+(info_detail.VTCap + info_detail.VTInteres)+' </span></p>' +
                '</div>' + 
                '<div style="display: inline-block;width: 5cm;vertical-align: top;">' +                         
                    '<p style="text-align: right;margin: 8px 0;"><span style="text-align: left;width: 4.2cm;float: left;display: inline-block;">Cambio</span> <span style="float: right;">89799</span></p>' + // ??
                '</div>' +
            '</div>' +
            '<p style="text-align: center">Usuario: ' + info_fact.usuario + ', Base de Datos:' + 'EXTNOVA' + '</p></div></div>';
            ////////////////////////// //// FIN FORMAT RECIBO //////////////////////////


            var outputHtmlPagare = '<div style="width:auto;">' +
                '<div style="border:1px solid; display:inline-block; font-family: Arial, sans-serif; font-size: 8px; width: 12cm;margin:0.2cm;">' +
                '<h3 style="background-color:#ccc;text-align: center;margin: 0 auto;">Nuestra razón social cambió a partir de 27-NOV-2019 por Confe S.A.S</h3>' +
                '<div style="display: block;">' +
                    '<div style="text-align: center; margin: 0 auto;">' +
                        '<div style="display: inline-block; width: 10cm;">' +
                        '<h2 style="text-align: center">' + "PAGARÉ DE VENTA" + '</h2>' +
                        '<h3>' + info_fact.num_pagare + '</h3>' +
                        '</div>' +
                        '<div style="display: inline-block;">' +
                        '<p style="right: 0;display: inline-block;">REIMP</p>' +
                        '<p style="">Page 1 de 1</p>' +
                        '</div>' +
                    '</div>' +
                    '<div style="text-align: left; display: inline-block; width: 8cm;">' +
                        '<p'+info_fact.nom_cli+'</p>' +
                        '<p><strong>Forma de pago:</strong>' + info_fact.descrip_cuo + '</p>' +
                        '<p><strong>Cliente:</strong> ' +  info_fact.cliente.trim()  + " " + info_fact.nom_cli + '</p>' +
                        '<p><strong>Codeudor:</strong> ' + codeudor + '</p>' +
                        '<p><strong>Vendedor:</strong> ' + info_fact.vendedor + " " + info_fact.nom_ven + ' </p>' +
                    '</div>' +
                    '<div style="display: inline-block; vertical-align: top; text-align: right">' +
                        '<p">' + info_fact.FechaHora + '</p>' +
                        '<p">Documento: ' + info_fact.num_doc + '</p>' +
                        '<div style="display: block;">' +
                            '<p style="display: inline-block; width: 2cm; font-weight: bold;"> Con Huella:</p>' +
                            '<p style="background-color:#ccc; display: inline-block; padding:0 0.5cm;">' + info_fact.con_huella + '</p >' +
                        '</div>' +
                        '<p>Elaboró: ' + info_fact.nom_ven + '</p>' +
                    '</div>' +
                '</div>' +
                '<div style="padding: 0px 0;display: inline-block;">' +
                    '<h2 style="text-align: left; display: inline-block; width:8.5cm;"><span style="background-color:#ccc; width:8cm; display: block;">Cupo disponible:' + info_fact.cup_cli + '</span></h4>' +
                    '<span style="text-align: right;position: relative; display: inline-block;">Para su uso debe estar al día </span>' +
                '</div>' +
                '<p>Aplica restricciones para primeros creditos con codeudor</p>' +
                '<table style="width:11.5cm; font-size:7px;"></tr><thead><tr>' +
                '<th>Código</th>' +
                '<th>Descripcción</th>' +
                '<th>Iva</th>' +
                '<th>Talla</th>' +
                '<th>Desc</th>' +
                '<th>Cant</th>' +
                '<th>Vr. Unitario</th>' +
                '<th>SubTotal</th>' +
                '</tr></thead>' +
                '<tbody>' +
                '<tr>' +
                '<td> ' + info_fact.cod_cco + '</td>' +
                '<td>' + info_fact.des_item + '</td>' +
                '<td>' + info_fact.mon_iva + '</td>' +
                '<td>' + info_fact.des_talla + '</td>' +
                '<td>' + info_fact.descrip_cuo + '</td>' +
                '<td>' + info_fact.cantidad + '</td>' +
                '<td>' + info_fact.val_uni + '</td>' +
                '<td>' + info_fact.vsubtotal + '</td>' +
                '</tr>' +
                '</tbody></table>' +
                '<hr>' +
                
                '<div>' +
                '<div style="display: inline-block; width:8cm; vertical-align: top;">' +
                    '<strong style="text-align: left;">Observaciones:</strong>' +
                    '<div style="margin:0.5cm;">' +
                        '<p style="display:inline-block; width:3cm;"><strong>Tasa E.A</strong> ' + numeral(info_fact.tasa_ea).format('0,000.00') + '</p>' +
                        '<p style="display:inline-block; width:3cm;"><strong>Tasa Max Leg VIg.</strong>' + numeral(info_fact.tasa_max).format('0,000.00') + '</p>' +
                        '<p style="text-align: center">' + info_fact.req_orc + '</p>' +
                    '</div>' +
                '</div>' +
                '<div style="display: inline-block; text-align: left; width:3.5cm;">' +                
                '<p style="margin:0;width: 3.5cm;text-align: right;"><span style="display: inline-block;width: 2.5cm;text-align: left;">Subtotal:</span><span style="display: inline-block;width:1cm;">'+info_fact.vsubtotal+' </span></p>' +                 
                '<p style="margin:0;text-align: right;"><span style="display: inline-block;">VR Descuento:</span><span style="display: inline-block;width: 2cm;text-align: right;">'+ info_fact.vdescuento + '</span></p>'+
                    '<hr style="width: 1.5cm;margin-left: 2cm;">' +
                    '<p>Total Finanza:' + info_fact.finan + '</p>' +
                    '<p>Total a financiar:' + info_fact.aval + '</p>' +
                    '<p>Total Interés:' + numeral(info_fact.finan).format('$0,000') + '</p>' +
                '</div>' +
                '<div style="display: inline-block; width:7.5cm; margin: 0.5cm; vertical-align: top;">' +
                    '<p style="text-align: center;">Cambios: Los productos que contengan algunos accesorios deben traerse junto con éste para el cambio</p>' +
                '</div>' +
                '<div style="display: inline-block; text-align: left;">' +
                    '<p>Vr Excluido: </p>' +
                    '<p>Vr Exc+inicial: </p>' +
                    '<strong>TOTAL:' + info_fact.val_tot + '</strong>' +
                '</div>' +
                '<div style="display: block; width:7.5cm; margin:0 0.5cm; text-align: center;">' +
                    '<div style="margin:0 auto;">' +
                        '<p>____________________________________</p>' +
                        '<p>Firma cliente</p>' +
                        '<p>C.C ' + info_fact.cliente + '</p>' +
                    '</div>' +
                '</div>' +
                '<div style="display: inline-block;width: 7.5cm;margin: 0.5cm;vertical-align: top;text-align: left;">' +
                    '<strong>Plan de pago No ' + info_fact.num_pagare + ' </strong>' +
                '</div>' +
                '<div style="display: inline-block;background-color: #ccc;text-align: center;font-weight: bold;font-size: 8px; line-height: 3px;">' +
                    '<p>Crédito afianzado por:</p>' +
                    '<p>GARANTIAS CREDITICIAS</p>' +
                    '<p> S.A.S 900.906.654</p>' +
                    '<p>(Ingreso recibidos por terceros)</p>' +
                '</div>' +
                '</div>' +
                '<table style="width:11.5cm; font-size:7px;"><thead><tr>' +
                '<th>Cuota</th>' +
                '<th>F. Pago</th>' +
                '<th>Vr. Mcia</th>' +
                '<th>Fianza</th>' +
                '<th>Iva Fianza</th>' +
                '<th>Vr. a Financiar</th>' +
                '<th>Interes</th>' +
                '<th>Iva Interes </th>' +
                '<th>Vr.Cuota </th>' +                
                '</tr></thead>' +
                '<tbody>';

                for (k in cuotas) {
                    outputHtmlPagare += '<tr>' +
                        '<td align="center">' + cuotas[k] + '</td>' +
                        '<td>' + fecVen[k] + '</td>' +
                        '<td>' + info_fact.vmcia + '</td>' +
                        '<td>' + valFianza[k] + '</td>' +
                        '<td>' + valIvaFia[k] + '</td>' +
                        '<td>' + info_detail.VTFianza + '</td>' +
                        '<td>' + info_detail.VTInteres + '</td>' +
                        '<td>' + info_detail.VTIvaInt + '</td>' +     
                        '<td>' + valCuota[k] + '</td>' +                     
                        '</tr>';
                }
                
                outputHtmlPagare +='</tbody></table>' +
                '<p  style="text-align:center;">Factura impresa por computador. Software Novasoft S.A.S Nit 800.028.326-1</p>'+
                '</div>';


            // START COLUMN 2
            outputHtmlPagare += '<div style="border:1px solid; display:inline-block; font-family: Arial, sans-serif; font-size: 8px; width: 12cm;margin:0.2cm;">' +
            '<h3 style="background-color:#ccc;text-align: center;margin: 0 auto;">Nuestra razón social cambió a partir de 27-NOV-2019 por Confe S.A.S</h3>' +
            '<div style="display: block;">' +
                '<div style="text-align: center; margin: 0 auto;">' +
                    '<div style="display: inline-block; width: 10cm;">' +
                    '<h2 style="text-align: center">' + "PAGARÉ DE VENTA" + '</h2>' +
                    '<h3>' + info_fact.num_pagare + '</h3>' +
                    '</div>' +
                    '<div style="display: inline-block;">' +
                    '<p style="right: 0;display: inline-block;">REIMP</p>' +
                    '<p style="">Page 1 de 1</p>' +
                    '</div>' +
                '</div>' +
                '<div style="text-align: left; display: inline-block; width: 8cm;">' +
                    '<p'+info_fact.nom_cli+'</p>' +
                    '<p><strong>Forma de pago:</strong>' + info_fact.descrip_cuo + '</p>' +
                    '<p><strong>Cliente:</strong> ' +  info_fact.cliente.trim()  + " " + info_fact.nom_cli + '</p>' +
                    '<p><strong>Codeudor:</strong> ' + codeudor + '</p>' +
                    '<p><strong>Vendedor:</strong> ' + info_fact.vendedor + " " + info_fact.nom_ven + ' </p>' +
                '</div>' +
                '<div style="display: inline-block; vertical-align: top; text-align: right">' +
                    '<p">' + info_fact.FechaHora + '</p>' +
                    '<p">Documento: ' + info_fact.num_doc + '</p>' +
                    '<div style="display: block;">' +
                        '<p style="display: inline-block; width: 2cm; font-weight: bold;"> Con Huella:</p>' +
                        '<p style="background-color:#ccc; display: inline-block; padding:0 0.5cm;">' + info_fact.con_huella + '</p >' +
                    '</div>' +
                    '<p>Elaboró: ' + info_fact.nom_ven + '</p>' +
                '</div>' +
            '</div>' +
            '<div style="padding: 0px 0;display: inline-block;">' +
                '<h2 style="text-align: left; display: inline-block; width:8.5cm;"><span style="background-color:#ccc; width:8cm; display: block;">Cupo disponible:' + info_fact.cup_cli + '</span></h4>' +
                '<span style="text-align: right;position: relative; display: inline-block;">Para su uso debe estar al día </span>' +
            '</div>' +
            '<p>Aplica restricciones para primeros creditos con codeudor</p>' +
            '<table style="width:11.5cm; font-size:7px;"></tr><thead><tr>' +
            '<th>Código</th>' +
            '<th>Descripcción</th>' +
            '<th>Iva</th>' +
            '<th>Talla</th>' +
            '<th>Desc</th>' +
            '<th>Cant</th>' +
            '<th>Vr. Unitario</th>' +
            '<th>SubTotal</th>' +
            '</tr></thead>' +
            '<tbody>' +
            '<tr>' +
            '<td> ' + info_fact.cod_cco + '</td>' +
            '<td>' + info_fact.des_item + '</td>' +
            '<td>' + info_fact.mon_iva + '</td>' +
            '<td>' + info_fact.des_talla + '</td>' +
            '<td>' + info_fact.descrip_cuo + '</td>' +
            '<td>' + info_fact.cantidad + '</td>' +
            '<td>' + info_fact.val_uni + '</td>' +
            '<td>' + info_fact.vsubtotal + '</td>' +
            '</tr>' +
            '</tbody></table>' +
            '<hr>' +
            
            '<div>' +
            '<div style="display: inline-block; width:8cm; vertical-align: top;">' +
                '<strong style="text-align: left;">Observaciones:</strong>' +
                '<div style="margin:0.5cm;">' +
                    '<p style="display:inline-block; width:3cm;"><strong>Tasa E.A</strong> ' + numeral(info_fact.tasa_ea).format('0,000.00') + '</p>' +
                    '<p style="display:inline-block; width:3cm;"><strong>Tasa Max Leg VIg.</strong>' + numeral(info_fact.tasa_max).format('0,000.00') + '</p>' +
                    '<p style="text-align: center">' + info_fact.req_orc + '</p>' +
                '</div>' +
            '</div>' +
            '<div style="display: inline-block; text-align: left; width:3.5cm;">' +                
            '<p style="margin:0;width: 3.5cm;text-align: right;"><span style="display: inline-block;width: 2.5cm;text-align: left;">Subtotal:</span><span style="display: inline-block;width:1cm;">'+info_fact.vsubtotal+' </span></p>' +                 
            '<p style="margin:0;text-align: right;"><span style="display: inline-block;">VR Descuento:</span><span style="display: inline-block;width: 2cm;text-align: right;">'+ info_fact.vdescuento + '</span></p>' +
                '<hr style="width: 1.5cm;margin-left: 2cm;">' +
                '<p>Total Finanza:' + info_fact.finan + '</p>' +
                '<p>Total a financiar:' + info_fact.aval + '</p>' +
                '<p>Total Interés:' + numeral(info_fact.finan).format('$0,000') + '</p>' +
            '</div>' +
            '<div style="display: inline-block; width:7.5cm; margin: 0.5cm; vertical-align: top;">' +
                '<p style="text-align: center;">Cambios: Los productos que contengan algunos accesorios deben traerse junto con éste para el cambio</p>' +
            '</div>' +
            '<div style="display: inline-block; text-align: left;">' +
                '<p>Vr Excluido: </p>' +
                '<p>Vr Exc+inicial: </p>' +
                '<strong>TOTAL:' + info_fact.val_tot + '</strong>' +
            '</div>' +
            '<div style="display: block; width:7.5cm; margin:0 0.5cm; text-align: center;">' +
                '<div style="margin:0 auto;">' +
                    '<p>____________________________________</p>' +
                    '<p>Firma cliente</p>' +
                    '<p>C.C ' + info_fact.cliente + '</p>' +
                '</div>' +
            '</div>' +
            '<div style="display: inline-block;width: 7.5cm;margin: 0.5cm;vertical-align: top;text-align: left;">' +
                '<strong>Plan de pago No ' + info_fact.num_pagare + ' </strong>' +
            '</div>' +
            '<div style="display: inline-block;background-color: #ccc;text-align: center;font-weight: bold;font-size: 8px; line-height: 3px;">' +
                '<p>Crédito afianzado por:</p>' +
                '<p>GARANTIAS CREDITICIAS</p>' +
                '<p> S.A.S 900.906.654</p>' +
                '<p>(Ingreso recibidos por terceros)</p>' +
            '</div>' +
            '</div>' +
            '<table style="width:11.5cm; font-size:7px;"><thead><tr>' +
            '<th>Cuota</th>' +
            '<th>F. Pago</th>' +
            '<th>Vr. Mcia</th>' +
            '<th>Fianza</th>' +
            '<th>Iva Fianza</th>' +
            '<th>Vr. a Financiar</th>' +
            '<th>Interes</th>' +
            '<th>Iva Interes </th>' +
            '<th>Vr.Cuota </th>' +                
            '</tr></thead>' +
            '<tbody>';

            for (k in cuotas) {
                outputHtmlPagare += '<tr>' +
                    '<td align="center">' + cuotas[k] + '</td>' +
                    '<td>' + fecVen[k] + '</td>' +
                    '<td>' + info_fact.vmcia + '</td>' +
                    '<td>' + valFianza[k] + '</td>' +
                    '<td>' + valIvaFia[k] + '</td>' +
                    '<td>' + info_detail.VTFianza + '</td>' +
                    '<td>' + info_detail.VTInteres + '</td>' +
                    '<td>' + info_detail.VTIvaInt + '</td>' +     
                    '<td>' + valCuota[k] + '</td>' +                     
                    '</tr>';
            }
            
            outputHtmlPagare +='</tbody></table>' +
            '<p style="text-align:center;">Factura impresa por computador. Software Novasoft S.A.S Nit 800.028.326-1</p>'+
            '</div></div>';


            if (info_fact.nom_tip.trim() != "PAGARE DE VENTA") {
                printHtml(outputHtmlPagare);
            } else {
                printHtml(outputHtmlRecibo);
            }



        } else {
            swal({
                title: 'No se encontraron datos',
                icon: 'warning',
                dangerMode: true
            }).then((value) => {});
            return;
        }

    })


}

function printInvoice(number, ignorePreload) {
    if (!ignorePreload) { togglePreloader(true) }
    $('#impresora').html('');

    reqJSON({
        'path': './imprimirFactura',
        'data': {
            'num_doc': number
        },
        'type': 'POST'
    }, function(err, response) {
        if (!ignorePreload) { togglePreloader(false) }
        if (response.msg == "Success") {

            moment.locale("es");
            var data_fac = response.data[0][0];
            var data_det = response.data[1][0];

            var cuotas = data_det.Cuotas.split(';');
            var valorCuota = data_det.ValorCuota.split(';');
            var fecVen = data_det.FecVen.split(';');
            var valCap = data_det.ValCap.split(';');
            var valInt = data_det.ValInt.split(';');
            var valFianza = data_det.ValFianza.split(';');
            var valIvaFia = data_det.ValIvaFia.split(';');
            var codeudor = (!_.isNull(data_fac.codeudor1) && !_.isNull(data_fac.nom_cod)) ? data_fac.codeudor1.trim() + '-' + data_fac.nom_cod.trim() : '';

            var html = '<div style="font-family: Arial, sans-serif; font-size: 10px;width: 302px;">' +
                '<h1 align="center" style="font-size: 15px;">CONFE S.A.S.</h1>' +
                '<p align="center">Nit: 800097373-0' +
                '<br/>Cra 49 49 - 73 Piso:3 Tel: 4486564' +
                '<br/><b>Credimarcas</b>' +
                '</p>' +
                '<p align="center"><b>Pagaré de venta: No. ' + number + '</b></p>' +
                '<p>' +
                '<b>Forma de pago:</b>' + data_fac.descrip_cuo.trim() + '<br/>' +
                '<b>Fecha:</b>' + data_fac.FechaHora.trim() + '<br/>' +
                '<b>Fecha Vence:</b>' + fecVen[fecVen.length - 1] + '<br/>' +
                '<b>Huella: </b>' + data_fac.con_huella + '<br/>' +
                '</p>' +
                '<p>' +
                '<b>Deudor:</b> ' + data_fac.cliente.trim() + '<br/>' +
                data_fac.nom_cli.trim() + '<br/>' +
                '<b>Dirección:</b> ' + data_fac.dir_cli.trim() + '<br/>' +
                '<b>Correo:</b> ' + data_fac.e_mail_cli.trim() + '<br/>' +
                '<b>Codeudor:</b> ' + codeudor + '<br/>' +
                '<b>Documento:</b> ' + data_det.num_pagare.trim() + '<br/>' +
                '<b>Almacén:</b> ' + data_fac.nom_cco.trim() + '<br/>' +
                '<b>Vendedor:</b> ' + data_fac.nom_ven.trim() + '<br/>' +
                '</p>' +
                '<p><b style="background-color:#ddd; font-size: 12px;padding: 2px;">Cupo Disponible ' + numeral(data_fac.cup_cli).format('$0,000') + '</b> (Para su uso debe estar al día)</p>' +
                '<table width="100%" style="font-size: 10px">' +
                '<tr>' +
                '<td>Capital: ' + numeral(data_fac.vr_cre + data_det.biodata).format('$0,000') + '</td>' +
                '<td>Interés: ' + numeral(data_fac.finan).format('$0,000') + '</td>' +
                '<td>(' + data_fac.tasa_int.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0] + ') ' + ((data_fac.tipo_credito == '01') ? 'Quincenal' : 'Mensual') + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Fianza: ' + numeral(data_fac.aval).format('$0,000') + ' (' + data_fac.por_aval + '%)</td>' +
                '<td colspan="2">Iva Fianza: ' + numeral(data_fac.iva_aval).format('$0,000') + '</td>' +
                '</tr>' +
                '</table>' +
                '<p>Tasa Max Legal Vig (' + numeral(data_fac.tasa_max).format('0,000.00') + ')<br/>Tasa E.A ' + numeral(data_fac.tasa_ea).format('0,000.00') + ' de acuerdo al siguiente plan de amortización</p>';

            if (data_fac.mod_liq == 2 && data_fac.fianpag > 0) {
                var valorFianza = parseInt(data_fac.fianpag) / 1.19;
                var ivaFianza = data_fac.fianpag - valorFianza;
                html += '<p style="text-align: center;background-color:#ddd;"><b style="font-size: 13px;padding: 2px;">Crédito Afianzado por:<br/>GARANTIAS CREDITICIAS S.A.S. 900.906.654<br/>(Ingresos Recibidos para Terceros)</b></p>' +
                    '<p>Crédito otorgado por Credimarcas.<br/><span style="font-size: 10px;">Factura impresa por computador (Novasoft S.A.S)</p>' +
                    '<table style="font-size: 10px; width: 100%;">' +
                    '<tr><td><b>Valor Fianza:</b></td><td>' + numeral(valorFianza).format('$0,000') + '</td></tr>' +
                    '<tr><td><b>IVA Fianza:</b></td><td>' + numeral(ivaFianza).format('$0,000') + '</td></tr>' +
                    '<tr><td><b>Total Fianza Pagada:</b></td><td>' + numeral(data_fac.fianpag).format('$0,000') + '</td></tr>' +
                    '<tr><td><b>Total a Financiar:</b></td><td>' + numeral(data_fac.val_tot).format('$0,000') + '</td></tr>' +
                    '</table><br/>';
            }

            if (data_det.biodata > 0) {
                var valorBiodata = parseInt(data_det.biodata) / 1.19;
                var ivaBiodata = data_det.biodata - valorBiodata;
                html += '<br/><p style="text-align: center;background-color:#ddd;"><b style="font-size: 12px;padding: 2px;">Ingresos Recibidos Para Terceros:<br/>900.884.021 PROTECDATA S.A.</b></p>' +
                    '<table style="font-size: 10px; width: 100%;">' +
                    '<tr><td><b>Valor BioData:</b></td><td>' + numeral(valorBiodata).format('$0,000') + '</td></tr>' +
                    '<tr><td><b>IVA BioData:</b></td><td>' + numeral(ivaBiodata).format('$0,000') + '</td></tr>' +
                    '<tr><td><b>Total BioData:</b></td><td>' + numeral(data_det.biodata).format('$0,000') + '</td></tr>' +
                    '</table><br/>';
            }

            html += '<table style="font-size: 10px">' +
                '<tr>' +
                '<th width="50px">Cuota</th>' +
                '<th width="70px" align="left">Vr Cuota</th>' +
                '<th>Vencimiento</th>' +
                '</tr>';
            for (k in cuotas) {
                html += '<tr>' +
                    '<td align="center">' + cuotas[k] + '</td>' +
                    '<td>$' + valorCuota[k] + '</td>' +
                    '<td>' + fecVen[k] + '</td>' +
                    '</tr>';
            }
            html += '</table>' +
                '<p>Total Vr Financiado: ' + numeral(data_det.ValorTotal).format('$0,000') + '</br>' +
                '<br/>' +
                '<table style="font-size: 10px">' +
                '<tr>' +
                '<th width="50px">Cuota</th>' +
                '<th width="50px" align="left">Capital</th>' +
                '<th width="50px" align="left">Interés</th>' +
                '<th width="50px" align="left">Fianza</th>' +
                '<th width="60px" align="left">Iva Fianza</th>' +
                '</tr>';
            for (k in cuotas) {
                html += '<tr>' +
                    '<td align="center">' + cuotas[k] + '</td>' +
                    '<td>$' + valCap[k] + '</td>' +
                    '<td>$' + valInt[k] + '</td>' +
                    '<td>$' + valFianza[k] + '</td>' +
                    '<td>$' + valIvaFia[k] + '</td>' +
                    '</tr>';
            }
            html += '<p><b>Discriminación de la cuota:</b></p></table>' +
                '<br/>';

            if (data_fac.mod_liq != 2 || (data_fac.mod_liq == 2 && (_.isNull(data_fac.fianpag) || data_fac.fianpag == 0))) {
                html += '<p style="background-color:#ddd;">' +
                    '<b style="font-size: 13px;padding: 2px;">' +
                    'Crédito Afianzado por:<br/>' +
                    'GARANTIAS CREDITICIAS S.A.S. - 900.906.654<br/>' +
                    '(Ingresos Recibidos para Terceros)' +
                    '</b>' +
                    '</p>';
            }

            html += '<p>Crédito otorgado por Credimarcas.<br/><span style="font-size: 10px;">Factura impresa por computador (Novasoft S.A.S)</p>' +
                '</div>';


            printHtml(html);
        }
    })
}

function parseDatacreditoData(response) {

    const attributes = response["@attributes"];


    const idEstrategia = attributes.idEstrategia;
    const idPrograma = attributes.idEstrategia;
    const idMotor = attributes.idEstrategia;
    const fecha_Consulta = attributes.fechaConsulta;

    const NaturalNacional = response.NaturalNacional["@attributes"];

    const cod_cli = response.NaturalNacional.Identificacion['@attributes'].numero



    const nombres = NaturalNacional.nombres;
    const primerApellido = NaturalNacional.primerApellido;
    const segundoApellido = NaturalNacional.segundoApellido;
    const nombreCompleto = NaturalNacional.nombreCompleto;
    const validada = NaturalNacional.validada;
    const rut = NaturalNacional.rut;
    const genero = NaturalNacional.genero;

    const Edad = response.NaturalNacional.Edad['@attributes'];

    const edad_min = Edad.min
    const edad_max = Edad.max


    const ScoresMotor = response.ScoresMotor.ScoreMotor


    const tipo = ScoresMotor['@attributes'].tipo
    const puntaje = ScoresMotor['@attributes'].puntaje
    const clasificacion = ScoresMotor['@attributes'].clasificacion
    const razon = ScoresMotor.Razon

    const RespuestaPersonalizadaMotor = response.RespuestaPersonalizadaMotor.Respuesta

    const causal = RespuestaPersonalizadaMotor[0]['@attributes'].valor


    const decision = RespuestaPersonalizadaMotor[1]['@attributes'].valor


    const cel1 = RespuestaPersonalizadaMotor[2]['@attributes'].valor
    const cel2 = RespuestaPersonalizadaMotor[3]['@attributes'].valor
    const cel3 = RespuestaPersonalizadaMotor[4]['@attributes'].valor


    const ciu1 = RespuestaPersonalizadaMotor[5]['@attributes'].valor
    const ciu2 = RespuestaPersonalizadaMotor[6]['@attributes'].valor
    const ciu3 = RespuestaPersonalizadaMotor[7]['@attributes'].valor

    const dir1 = RespuestaPersonalizadaMotor[8]['@attributes'].valor
    const dir2 = RespuestaPersonalizadaMotor[9]['@attributes'].valor
    const dir3 = RespuestaPersonalizadaMotor[10]['@attributes'].valor


    const e_mail1 = RespuestaPersonalizadaMotor[11]['@attributes'].valor
    const e_mail2 = RespuestaPersonalizadaMotor[12]['@attributes'].valor
    const e_mail3 = RespuestaPersonalizadaMotor[13]['@attributes'].valor


    const tel1 = RespuestaPersonalizadaMotor[14]['@attributes'].valor
    const tel2 = RespuestaPersonalizadaMotor[15]['@attributes'].valor
    const tel3 = RespuestaPersonalizadaMotor[16]['@attributes'].valor


    data = {
        idEstrategia,
        idPrograma,
        idMotor,
        fecha_Consulta,

        nombres,
        primer_Apellido: primerApellido,
        segundo_Apellido: segundoApellido,
        nombre_Completo: nombreCompleto,
        validada,
        rut,
        genero,
        cod_cli,
        edad_min,
        edad_max,
        tipo,
        puntaje,
        clasificacion,
        Razon: razon,
        causal,
        decision,
        cel1,
        cel2,
        cel3,
        ciu1,
        ciu2,
        ciu3,
        dir1,
        dir2,
        dir3,
        e_mail1,
        e_mail2,
        e_mail3,
        tel1,
        tel2,
        tel3,
        user: 'confe',
        password: 'vedA_Ewaca6u'
    }


    return data


}



function parseDatacreditoDataError(response) {

    const attributes = response["@attributes"];


    const idEstrategia = attributes.idEstrategia;
    const idPrograma = attributes.idEstrategia;
    const idMotor = attributes.idEstrategia;
    const fecha_Consulta = attributes.fechaConsulta;


    const decision = 'Sin Información';
    const causal = attributes.descError

    let cod_cli = '';
    try {
        cod_cli = response.NaturalNacional.Identificacion['@attributes'].numero
    } catch (error) {
        cod_cli = $('#identificacionDT').val()
    }



    data = {
        idEstrategia,
        idPrograma,
        idMotor,
        fecha_Consulta,
        nombres: '',
        primer_Apellido: '',
        segundo_Apellido: '',
        nombre_Completo: '',
        validada: '',
        rut: '',
        genero: '',
        cod_cli,
        edad_min: '',
        edad_max: '',
        tipo: '',
        puntaje: '',
        clasificacion: '',
        razon: '',
        causal,
        nombre: '',
        valor: '',
        decision,
        cel1: '',
        cel2: '',
        cel3: '',
        ciu1: '',
        ciu2: '',
        ciu3: '',
        dir1: '',
        dir2: '',
        dir3: '',
        e_mail1: '',
        e_mail2: '',
        e_mail3: '',
        tel1: '',
        tel2: '',
        tel3: '',
        user: 'confe',
        password: 'vedA_Ewaca6u'
    }

    return data

}

function parseDatacreditoDataErrorServer() {

    // const causal = 'Error sin Resp Data'
    // const decision = 'Sin información'

    const decision = 'Error sin Resp Data'
    const causal = 'Sin información'

    data = {
        idEstrategia: '',
        idPrograma: '',
        idMotor: '',
        fecha_Consulta: moment().format('MMM DD YYYY h:m A'),
        nombres: '',
        primer_Apellido: '',
        segundo_Apellido: '',
        nombre_Completo: '',
        validada: '',
        rut: '',
        genero: '',
        cod_cli: $('#identificacionDT').val(),
        edad_min: '',
        edad_max: '',
        tipo: '',
        puntaje: '',
        clasificacion: '',
        razon: '',
        causal,
        nombre: '',
        valor: '',
        decision,
        cel1: '',
        cel2: '',
        cel3: '',
        ciu1: '',
        ciu2: '',
        ciu3: '',
        dir1: '',
        dir2: '',
        dir3: '',
        e_mail1: '',
        e_mail2: '',
        e_mail3: '',
        tel1: '',
        tel2: '',
        tel3: '',
        user: 'confe',
        password: 'vedA_Ewaca6u'
    }

    return data

}




function printPayment(number, ignorePreload) {
    if (!ignorePreload) { togglePreloader(true) }
    $('#impresora').html('');

    reqJSON({
        'path': './imprimirPago',
        'data': {
            'num_doc': number
        },
        'type': 'POST'
    }, function(err, response) {
        if (!ignorePreload) { togglePreloader(false) }
        if (response.msg == "Success") {
            var table1 = response.data[0];
            var table2 = response.data[1];
            var tbl_docs = response.data[4][0].Oblig.split(';');
            var tbl_ven = response.data[4][0].prox_fecven.split(';');
            var tbl_val = response.data[4][0].Val_obl.split(';');

            var html = '<div style="font-family: Arial, sans-serif; font-size: 10px;width: 302px;">' +
                '<h1 align="center" style="font-size: 15px;">CONFE S.A.S.</h1>' +
                '<p align="center">Nit: 800097373-0' +
                '<br/>Cra 49 49 - 73 Piso:3 Tel: 4486564' +
                '<br/><b>Credimarcas</b>' +
                '</p>' +
                '<p>' + table1[0].nom_cco.trim() + '</p>' +
                '<p align="center">' +
                '<b>' + table1[0].nom_tip.trim() + '</b><br/>' +
                '<b>No. ' + table1[0].num_doc.trim() + '</b>' +
                '</p>' +
                '<p>' + table1[0].det_doc.trim() + '</p>' +
                '<p>' +
                '<b>Fecha: </b>' + table1[0].FechaHora.trim() + '<br/>' +
                '<b>Cliente: </b>' + table1[0].cod_cli.trim() + ' ' + table1[0].nom_cli.trim() + '<br/>' +
                '<b>Elaboro: </b>' + table1[0].usuario.trim() + '<br/>' +
                '</p>' +
                '<p>' +
                '<b style="background-color:#ddd; font-size: 13px;padding: 2px;">Cupo Disponible ' + numeral(table1[0].cup_cli).format('$0,000') + '</b><br/>' +
                '<span style="font-size:10px">Aplica restricciones para primeros créditos con codeudor</span>' +
                '</p>' +
                '</table>' +
                '<br/>' +
                '<table style="font-size: 10px">' +
                '<tr><td colspan="5" style="border-bottom:2px solid #000;"></td></tr>' +
                '<tr>' +
                '<th width="65px">Documento</th>' +
                '<th width="50px" align="left">Fecha</th>' +
                '<th width="50px" align="center">Cuota</th>' +
                '<th width="50px" align="center">Vr.Cuota</th>' +
                '<th width="60px" align="center">Vr. Capital</th>' +
                '</tr>' +
                '<tr><td colspan="5" style="border-bottom:2px solid #000;"></td></tr>';
            for (t of table1) {
                html += '<tr>' +
                    '<td>' + t.num_ref + '</td>' +
                    '<td>' + moment(t.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY") + '</td>' +
                    '<td align="center">' + t.reg_ref + '/' + t.tot_cuo + '</td>' +
                    '<td align="right">' + numeral(t.val_doc).format('$0,000') + '</td>' +
                    '<td align="right">' + numeral(t.capital).format('$0,000') + '</td>' +
                    '</tr>';
            }
            html += '</table><br/>' +
                '<table style="font-size: 10px">' +
                '<tr><td colspan="5" style="border-bottom:2px solid #000;"></td></tr>' +
                '<tr>' +
                '<th width="80px">Vr. Int. Cte</th>' +
                '<th width="70px" align="left">Vr. Fianza</th>' +
                '<th width="80px" align="center">Vr.Int. Mora</th>' +
                '<th width="70px" align="center">Vr.Total</th>' +
                '</tr>' +
                '<tr><td colspan="5" style="border-bottom:2px solid #000;"></td></tr>';
            var vr_recaudo = 0;
            var discount = 0;
            var hasDiscount = false;
            var interes_mora = 0;
            for (t of table1) {
                vr_recaudo += t.Total;
                discount += t.val_des;
                interes_mora += t.intereses;
                html += '<tr>' +
                    '<td align="right" style="padding-right: 5px">' + numeral(t.finan).format('$0,000') + '</td>' +
                    '<td align="right" style="padding-right: 5px">' + numeral(t.aval).format('$0,000') + '</td>' +
                    '<td align="right" style="padding-right: 5px">' + numeral(t.intereses).format('$0,000') + '</td>' +
                    '<td align="right" style="padding-right: 5px"><b>' + numeral(t.Total).format('$0,000') + '</b></td>' +
                    '</tr>';
                if (!hasDiscount && (t.val_des > 0)) {
                    hasDiscount = true;
                }
            }

            html += '</table><br/>' +
                '<table style="font-size: 10px; width:100%;">' +
                '<tr><td><b style="font-size:13px;">Vr.Recaudo</b></td><td><b style="font-size:13px;">' + numeral(vr_recaudo).format('$0,000') + '</b></td></tr>' +
                '<tr><td>Interés Mora ' + numeral(interes_mora).format('$0,000') + '</td><td>Iva Mora $0</td></tr>' +
                '<tr><td colspan="2">&nbsp;</td></tr>' +
                '<tr><td>N.C. Pago Anticipado</td><td>' + numeral(discount).format('$0,000') + '</td></tr>' +
                '<tr><td>Total Recibido</td><td>' + numeral(table2[0].ValorPago).format('$0,000') + '</td></tr>' +
                '<tr><td>' + table2[0].FormaPago + '</td><td>' + numeral(table2[0].ValorPago).format('$0,000') + '</td></tr>' +
                '<tr><td>Cambio</td><td>' + numeral(table2[0].cambio).format('$0,000') + '</td></tr>' +
                '</table>' +
                '<p style="text-align:center;"><b>Tasa de Interes Moratorio Diaria</b>&nbsp:&nbsp; ' + table1[0].tasa_int + ' %</p>' +
                '<table style="font-size: 12px; font-weight: bold; width:90%;margin: 0 5%;">' +
                '<tr><td>Saldo Capital</td><td>' + numeral(table1[0].saldo).format('$0,000') + '</td></tr>' +
                '<tr><td>Saldo Interes</td><td>$0</td></tr>' +
                '<tr><td style="font-size: 14px;">Capital + Interes</td><td style="font-size: 14px;">' + numeral(table1[0].saldo).format('$0,000') + '</td></tr>' +
                '</table>' +
                '<p style="text-align:center;font-size:12px;font-weight:bold">GRACIAS POR SU PAGO</p>' +
                '<p style="text-align:center;">RECUERDE QUE ES IMPORTANTE MANTENER<br/>SU CRÉDITO AL DÍA</p><br/>' +
                '<b style="background-color:#ddd; font-size: 13px;padding: 2px;width:100%;text-align:center;display:block;">PRÓXIMOS PAGOS</b><br/>' +
                '<table style="font-size: 10px; width:100%;">' +
                '<tr>' +
                '<th style="text-align: left;">Documento</th>' +
                '<th style="text-align: left;">Fecha</th>' +
                '<th style="text-align: left;">Valor</th>' +
                '</tr>'
            for (i in tbl_docs) {
                html += '<tr>' +
                    '<td>' + tbl_docs[i] + '</td>' +
                    '<td>' + tbl_ven[i] + '</td>' +
                    '<td>' + numeral(tbl_val[i]).format('$0,000') + '</td>' +
                    '</tr>';
            }
            html += '</table>';

            if (hasDiscount) {
                html += '<br/><b style="background-color:#ddd; font-size: 13px;padding: 2px;width:100%;text-align:center;display:block;">DESCUENTOS APLICADOS</b><br/>' +
                    '<table style="font-size: 10px; width:100%;">' +
                    '<tr><td colspan="4" style="border-bottom:2px solid #000;"></td></tr>' +
                    '<tr>' +
                    '<th style="text-align: left;">Documento</th>' +
                    '<th style="text-align: left;">Cuota</th>' +
                    '<th style="text-align: left;">Dto. Interes</th>' +
                    '<th style="text-align: left;">Dto. Iva Int</th>' +
                    '</tr>' +
                    '<tr><td colspan="4" style="border-bottom:2px solid #000;"></td></tr>';

                for (d of table1) {
                    if (d.val_des > 0) {
                        html += '<tr>' +
                            '<td>' + d.num_ref + '</td>' +
                            '<td align="center">' + d.reg_ref + '/' + d.tot_cuo + '</td>' +
                            '<td align="center">' + numeral(d.dto_interes).format('$0,000') + '</td>' +
                            '<td align="center">' + numeral(d.dto_ivaint).format('$0,000') + '</td>' +
                            '</tr>';
                    }
                }

                html += '</table><table style="font-size: 10px; width:100%;">' +
                    '<tr><td colspan="4" style="border-bottom:2px solid #000;"></td></tr>' +
                    '<tr>' +
                    '<th style="text-align: left;">Documento</th>' +
                    '<th style="text-align: left;">Dto. Fianza</th>' +
                    '<th style="text-align: left;">Dto. Iva Fianza</th>' +
                    '<th style="text-align: left;">Dto. Total</th>' +
                    '</tr>' +
                    '<tr><td colspan="4" style="border-bottom:2px solid #000;"></td></tr>';

                for (d of table1) {
                    if (d.val_des > 0) {
                        html += '<tr>' +
                            '<td>' + d.num_ref + '</td>' +
                            '<td align="center">' + numeral(d.dto_fianza).format('$0,000') + '</td>' +
                            '<td align="center">' + numeral(d.dto_ivafi).format('$0,000') + '</td>' +
                            '<td align="center"><b>' + numeral(d.val_des).format('$0,000') + '</b></td>' +
                            '</tr>';
                    }
                }

                html += '</table>';
            }

            printHtml(html);
        }
    })
}

var iconsDateTimeicker = {
    'time': 'fa fa-time',
    'date': 'fa fa-calendar',
    'up': 'fa fa-chevron-up',
    'down': 'fa fa-chevron-down',
    'previous': 'fa fa-chevron-left',
    'next': 'fa fa-chevron-right',
    'today': 'fa fa-screenshot',
    'clear': 'fa fa-trash',
    'close': 'fa fa-remove'
}

var infoDatable = {
    'lengthMenu': [
        [10, 25, 50, -1],
        [10, 25, 50, 'All']
    ],
    'language': {
        'search': '_INPUT_',
        'searchPlaceholder': "Buscar",
        'lengthMenu': 'Mostrar _MENU_ registros por página',
        'zeroRecords': 'Sin resultados',
        'info': 'Mostrando página _PAGE_ de _PAGES_',
        'infoEmpty': 'No hay registro disponibles',
        'infoFiltered': '(filtrado de _MAX_ registros)',
        'paginate': {
            'first': 'Primero',
            'previous': 'Anterior',
            'next': 'Siguiente',
            'last': 'Ultimo'
        }
    }
}