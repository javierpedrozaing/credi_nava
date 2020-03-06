var _dataPago = [];
var total = 0;
var descuento = 0;
var timeoutSearchClients = null;
var messageSearchClient = false;

$(document).ready(function() {
    $('#cod_cli').focus();

    // $(document).on('keypress','input[name="cod_cli"]',function(evt) {
    //     if(evt.which == 13) {
    //         getPayments();
    //     }
    // });

    $(document).on('keypress','input[name="cod_cli"]',function(evt) {
        let codeKey = (event.keyCode)? event.keyCode: event.which;
        if(codeKey == 13) {
            messageSearchClient = true;
        //     if(timeoutSearchClients) {
        //         clearTimeout(timeoutSearchClients);
        //     }
        //     return false;
            searchClients();

            var cli = $('#cod_cli').val();
            if (cli.length > 3) {
                getPayments();
            }
        }

        // searchClients();
    });

    $(document).on('keypress', 'input.pagoTabla', function(evt) {
        if (evt.which == 13) {
            updatePayments();
        }
    })

    $(document).on('change', 'input.chk-credi', function(evt) {
        var chk = $(evt.target);
        var doc = chk.data('doc');

        if (chk.prop('checked')) {
            var data_pago = _.where(_dataPago[2], {num_doc: doc});

            var cuotas_restantes = data_pago[0].nro_cuota - data_pago[0].reg + 1;
            if (cuotas_restantes <= 2) {
                swal({
                    title: 'Información!',
                    text: 'Este cliente puede retirar nuevamente, solo le falta(n) '+cuotas_restantes+' cuota(s)',
                    icon: 'info',
                    dangerMode: true
                }).then((value) => {});
            }

            if (data_pago[0].reg == 1 && data_pago[0].dia_mora == 0) {
                swal({
                    title: 'Información!',
                    text: 'Cliente con derecho a DESCUENTO, preguntar al cliente si paga la totalidad',
                    icon: 'info',
                    dangerMode: true
                }).then((value) => {});
            }
        }
    })

    $(document).on('change', 'input.chk-cuota', function(evt) {
        $('.chk-p').prop('checked', false);
        var chk = $(evt.target);
        var p_parcial = chk.parent().siblings('.p_parcial');
        var pos = chk.data('pos');
        var doc = chk.data('doc');

        if (chk.prop('checked')) {
            if (pos != 0 && !$('.chk-cuota[data-doc='+doc+'][data-pos='+(pos-1)+']').prop('checked')) {
                chk.prop('checked', false);

                swal({
                    title: '¡Alerta!',
                    text: 'No puedes seleccionar esta cuota sin antes seleccionar la anterior',
                    icon: 'warning',
                    dangerMode: true
                }).then((value) => {});
            } else {
                $(p_parcial).text(numeral(chk.data('cuota')).format('$0,000'));
                total += parseInt(chk.data('cuota'));

                // Validar si es la última cuota y generar recaulculo de descuento
                if(chk.data('last')) {
                    var doc = chk.data('doc');
                    var chks = $('input.chk-cuota:checked');
                    total = 0;
                    descuento = 0;

                    _.each(chks, function(c) {
                        var p_p = $(c).parent().siblings('.p_parcial');
                        if (doc == $(c).data('doc') && ($(c).data('vencido') == 0)) {
                            $(p_p).text(numeral(parseInt($(c).data('cuota')) - parseInt($(c).data('descuento'))).format('$0,000'));
                            total += parseInt($(c).data('cuota')) - parseInt($(c).data('descuento'));
                            descuento += parseInt($(c).data('descuento'));
                        } else {
                            total += parseInt($(c).data('cuota'));
                        }
                    })
                    $('#descuentos').val(numeral(descuento).format('$0,000'));
                }
            }
        } else {
            if(chk.data('last')) {
                $(p_parcial).text('0');
                total -= parseInt(chk.data('cuota'));

                var doc = chk.data('doc');
                var chks = $('input.chk-cuota:checked');
                total = 0;
                descuento = 0;

                _.each(chks, function(c) {
                    var p_p = $(c).parent().siblings('.p_parcial');
                    if (doc == $(c).data('doc')) {
                        $(p_p).text(numeral(parseInt($(c).data('cuota'))).format('$0,000'));
                        total += parseInt($(c).data('cuota'));
                    } else {
                        total += parseInt($(c).data('cuota'));
                    }
                })
                $('#descuentos').val(numeral(0).format('$0,000'));
            } else {
                if ((pos == 0 && $('.chk-cuota[data-doc='+doc+'][data-pos='+(pos+1)+']').prop('checked')) || ($('.chk-cuota[data-doc='+doc+'][data-pos='+(pos-1)+']').prop('checked') && $('.chk-cuota[data-doc='+doc+'][data-pos='+(pos+1)+']').prop('checked'))) {
                    chk.prop('checked', true);

                    swal({
                        title: '¡Alerta!',
                        text: 'No puedes deseleccionar esta cuota',
                        icon: 'warning',
                        dangerMode: true
                    }).then((value) => {});
                } else {
                    $(p_parcial).text('0');
                    total -= parseInt(chk.data('cuota'));
                }
            }
        }

        $('#subtotal').val(numeral(total + descuento).format('$0,000'));
        $('#total_pagos').val(numeral(total).format('$0,000'));
        $('#valor_abono').val(numeral(total).format('$0,000'));
        calcularValorPagado();
    })

    $(document).on('change', 'input.chk-p', function(evt) {
        var chk = $(evt.target);

        var state = $(chk).prop('checked');

        $('.chk-p').prop('checked', false);
        $(chk).prop('checked', state);

        var type = $(chk).data('chk');
        var _chk = $('input.chk-cuota:not(:disabled)');
        $(_chk).prop('checked', false);

        if (state) {
            if (type == 'todas') {
                _chk = $('input.chk-cuota:not(:disabled)');
                _chk.prop('checked',true);
            } else if(type == 'vencidas') {
                _chk = $('input.chk-cuota:not(:disabled)[data-vencido=1]')
                _chk.prop('checked',true);
            } else if(type == 'desmarcar') {
                _chk = $('input.chk-cuota:not(:disabled)');
                _chk.prop('checked',false);
            }
        }

        total = 0;
        descuento = 0;
        for (c of $('input.chk-cuota')) {
            var _c = $(c);
            var p_parcial = _c.parent().siblings('.p_parcial');
            if (_c.prop('checked')) {
                if (type == 'todas' && (_c.data('vencido') == 0)) {
                    $(p_parcial).text(numeral(parseInt(_c.data('cuota')) - parseInt(_c.data('descuento'))).format('$0,000'));
                    total += parseInt(_c.data('cuota')) - parseInt(_c.data('descuento'));
                    descuento += parseInt(_c.data('descuento'));
                    $('#descuentos').val(numeral(descuento).format('$0,000'));

                } else {
                    $(p_parcial).text(numeral(_c.data('cuota')).format('$0,000'));
                    total += parseInt(_c.data('cuota'));
                }
            } else {
                descuento -= 0;
                $('#descuentos').val(numeral(descuento).format('$0,000'));
                $(p_parcial).text('');
            }
        }

        $('#subtotal').val(numeral(total + descuento).format('$0,000'));
        $('#total_pagos').val(numeral(total).format('$0,000'));
        $('#valor_abono').val(numeral(total).format('$0,000'));
        calcularValorPagado();
    })

    $('#valor_p').focus(function() {
        $('#valor_p').val($('#valor_abono').val().match(/\d+/g).join(''));
        $('#valor_p').trigger('keyup');
    })

    if (externo) {
        $('.sidebar').hide();
        $('#minimizeSidebar').hide();
        $('.b-search').hide();
        
        var abono_externo = externo_pago;
        $('#cod_cli').val(externo_cod_cli);
        getPayments(abono_externo);
    }
    
})

function updatePayments() {
    if ($('input.chk-credi:checked').length > 0) {
        showModal();
    } else {
        swal({
            title: '¡Alerta!',
            text: 'Debes ingresar al menos un pago para continuar',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
    }
}

function fillTable(data, abono_p) {
    var items = '';
    var a_parcial = '';
    if (abono_p > 0) {
        a_parcial = abono_p / data.length;
        a_parcial = a_parcial+''.toString().replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    }
    for (obj of data) {
        var classD = '';
        var classD1 = '';
        var proc = '';
        var checked_abono = (abono_p > 0) ? 'checked="checked"' : '';
        var procIco = '<input type="checkbox" tabindex="-1" class="chk-credi" data-doc="'+obj.num_doc+'" '+checked_abono+' />';
        var inputPayment = '<input value="'+a_parcial+'" type="text" class="pagoTabla" onkeypress="return isNumber(event)" onkeyup="inputPay(event);formatNumber(event,\'\',true);" data-doc="'+obj.num_doc+'" data-diacuo="'+obj.dia_cuo+'"/>';

        if (obj.cuotas_mora > 0) {
            classD = ' class="text-danger"';
            classD1 = ' class="text-danger"';
        }

        if (obj.prefijo != 0) {
            proc = ' class="table-warning"';
            procIco = '<a href="javascript:showProcrediAlert(\''+obj.num_doc.toString().trim()+'\',\''+obj.prefijo+'\')" class="lnk-pro"><i class="material-icons text-warning">warning</i></a>';
            inputPayment = '';
        }

        items += '<tr ' + proc + '>'
        + '<td style="text-align: center;">'+procIco+'</td>'
        + '<td>'+obj.nom_cco+'</td>'
        + '<td>'+moment(obj.fch_doc.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY")+'</td>'
        + '<td>'+obj.num_doc+'</td>'
        + '<td>'+obj.prefijo+'</td>'
        + '<td>'+obj.CondCredito+'</td>'
        + '<td style="text-align:right;">'+numeral(obj.valor).format('$0,000')+'</td>'
        + '<td style="text-align:right;">'+numeral(obj.total).format('$0,000')+'</td>'
        + '<td style="text-align:right;">'+numeral(obj.abono).format('$0,000')+'</td>'
        + '<td style="text-align:right;">'+numeral(obj.saldo).format('$0,000')+'</td>'
        + '<td ' + classD + ' style="text-align:center;">'+obj.cuotas_mora+'</td>'
        + '<td ' + classD + ' style="text-align:center;">'+obj.dias_mora+'</td>'
        + '<td ' + classD1 + ' style="text-align:right;">'+numeral(obj.capital_mora).format('$0,000')+'</td>'
        + '<td>' + inputPayment + '</td>'
        + '</tr>';
    }
    $('#data-credi').html(items);
}

function showProcrediAlert(doc, prefijo) {
    swal({
        title: '¡Reportado Centrales!',
        text: 'No es posible recaudar la factura # '+doc+'.\nObligación con PREFIJO: '+prefijo,
        icon: 'warning',
        dangerMode: true
    }).then((value) => {});
}

function inputPay(event) {
    var value = $(event.target);
    if (value.val().replace(/\,/g, '').length > 0) {
        value.parent().siblings().find('.chk-credi').prop('checked', true);
    } else {
        value.parent().siblings().find('.chk-credi').prop('checked', false);
    }
}

/**
 * [addCharacter Agregar caracteres a la izquierda o derecha de un string]
 * @param {[string]} n         [texto]
 * @param {[int]} length    [número de caracteres]
 * @param {[string]} character [caracter a agregar]
 * @param {[string]} position  ["left": caracteres a la izquierda | "right": caracteres a la derecha]
 */
function addCharacter(n, length, character, position) {
    character = character || "0";
    position = position || "left";
    n = n.toString();
    while(n.length < length){
        if(position != "left"){
            n =  n + character;
        }else{
            n = character + n;
        }
    }
    return n;
}

function showModal() {
    $('.chk-p').prop('checked', false);
    $('body').css('overflow', 'hidden');
    $('.cont-modal').fadeIn();
    var data_pago = _.map($('input.chk-credi:checked'), function(o) { return {"factura": $(o).data("doc"), "abono": $('input.pagoTabla[data-doc="'+$(o).data("doc")+'"]').val().replace(/\,/g, ''),  "dia_cuo": $('input.pagoTabla[data-doc="'+$(o).data("doc")+'"]').data('diacuo'), "cuotas": _.where(_dataPago[2], {num_doc: $(o).data("doc")}) } });
    var items = '';
    var i = 0;
    var subtotal = 0;
    var descuentos = 0;
    var dataInteres = _dataPago[3][0];
    var intMora = dataInteres.int_mora;
    var diasGracia = dataInteres.dia_mora;

    total = 0;
    $('#valor_p').val('');


    for (dp of data_pago) {
        var abono = dp.abono;
        var tieneAbono = (abono.toString().length > 0);
        if (abono.length > 0) {
            subtotal += parseInt(abono);
            total += parseInt(abono);
        }

        var doc = '';
        var p_quota = 0;
        var d_mora = 0;

        var j = 0;
        for(cuota of dp.cuotas) {

            var dateDoc = moment(cuota.fch_doc.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY");
            var docDiff = moment().diff(moment(dateDoc, 'DD/MM/YYYY'), 'month');
            
            var fch_descuento = moment(fecha_descuento).format('DD/MM/YYYY');
            var descuento = cuota.s_finan;
            
            // if (moment(fch_descuento, 'DD/MM/YYYY').diff(moment(dateDoc, 'DD/MM/YYYY'), 'day') > 0) {
            //     descuento = cuota.s_finan + cuota.s_aval;

            //     if (docDiff == 0) {
            //         descuento = cuota.val_finan / dp.cuotas.length;
            //     }
            // }

            var color_tr = 'style="background:#e9e9e9"';
            var pago = 0;
            var dateVenc = moment(cuota.fec_ven.replace(/(Z)|(\s)/g, "")).format("DD/MM/YYYY");
            var dateDiff = moment().diff(moment(dateVenc, 'DD/MM/YYYY'), 'days');

            if (dateDiff > (dp.dia_cuo * -1) && dateDiff <= 0) {
                descuento = Math.round((((dateDiff * -1) + 1) * descuento) / dp.dia_cuo);
            }

            var dias_mora = ((dateDiff > 0) ? dateDiff : 0);
            var interesCuota = 0;

            if (dias_mora > diasGracia) {
                interesCuota = ((dias_mora * intMora * cuota.val_doc) / 100).toFixed(0);
                interesCuota = interesCuota - cuota.interes;
            }

            var last = (cuota.reg == cuota.nro_cuota);

            var chk_cuota = '<input type="checkbox" tabindex="-1" class="chk-cuota" data-saldoc="'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota))._value+'" data-pos="'+j+'" data-cuota="'+(parseInt(cuota.valor) + parseInt(interesCuota))+'" data-doc="'+cuota.num_doc+'" data-diamora="'+dias_mora+'" data-descuento="'+descuento+'" data-last="'+last+'" data-vencido="0"';
            var parcial = '';
            var classD = '';

            if (dateDiff > 0) {
                chk_cuota = '<input type="checkbox" tabindex="-1" class="chk-cuota" data-saldoc="'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota))._value+'" data-pos="'+j+'" data-cuota="'+(parseInt(cuota.valor) + parseInt(interesCuota))+'" data-doc="'+cuota.num_doc+'" data-diamora="'+dias_mora+'" data-descuento="'+descuento+'" data-last="'+last+'" data-vencido="1"';
                classD = ' class="text-danger"';
            }
            if ((i % 2) == 1) {
                color_tr = 'style="background:#fff"';
            }


            var venc = (dateDiff > 0) ? 1 : 0;
            var capital = cuota.s_capital;
            if ((abono.toString().length > 0) && (abono > 0)) {
                if (abono >= (parseInt(cuota.valor) + parseInt(interesCuota))) {
                    pago = numeral((parseInt(cuota.valor) + parseInt(interesCuota))).format('$0,000');
                    abono -= (parseInt(cuota.valor) + parseInt(interesCuota));
                    chk_cuota = '<input type="checkbox" tabindex="-1" class="chk-cuota" data-saldoc="'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota))._value+'" data-pos="'+j+'" data-cuota="'+(parseInt(cuota.valor) + parseInt(interesCuota))+'" data-doc="'+cuota.num_doc+'" data-diamora="'+dias_mora+'" data-descuento="'+descuento+'" data-last="'+last+'" data-vencido="'+venc+'" disabled="disabled" checked="checked" ';
                    capital = cuota.s_capital;
                } else {
                    parcial = ' class="table-warning"';
                    pago = numeral(abono).format('$0,000');
                    chk_cuota = '<input type="checkbox" tabindex="-1" class="chk-cuota" data-saldoc="'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota))._value+'" data-pos="'+j+'" data-cuota="'+abono+'" disabled data-doc="'+cuota.num_doc+'"="disabled data-diamora="'+dias_mora+'" data-descuento="'+descuento+'" data-last="false" data-vencido="'+venc+'" checked="checked" ';

                    var tmp_pay = numeral(abono)._value;

                    if (tmp_pay < numeral(interesCuota)._value) {
                        interesCuota = tmp_pay;
                        cuota.s_finan = 0;
                        cuota.s_aval = 0;
                        capital = 0;
                    } else {
                        tmp_pay -= numeral(interesCuota)._value;
                        capital = (capital == 0) ? capital : tmp_pay;
                    }

                    if (tmp_pay < numeral(cuota.s_finan)._value) {
                        cuota.s_finan = tmp_pay;
                        cuota.s_aval = 0;
                        capital = 0;
                    } else {
                        tmp_pay -= numeral(cuota.s_finan)._value;
                        capital = (capital == 0) ? capital : tmp_pay;
                    }

                    if (tmp_pay < numeral(cuota.s_aval)._value) {
                        cuota.s_aval = tmp_pay;
                        capital = 0;
                    } else {
                        tmp_pay -= numeral(cuota.s_aval)._value;
                        capital = (capital == 0) ? capital : tmp_pay;
                    }
                    abono = 0;
                }
            } else if (tieneAbono) {
                chk_cuota = '<input type="checkbox" tabindex="-1" class="chk-cuota" data-saldoc="'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota))._value+'" data-pos="'+j+'" data-cuota="'+(parseInt(cuota.valor) + parseInt(interesCuota))+'" data-doc="'+cuota.num_doc+'" data-diamora="'+dias_mora+'" data-descuento="'+descuento+'" data-last="'+last+'" data-vencido="'+venc+'" disabled="disabled" ';
            }

            capital = capital.toString().split(".")[0];
            console.log("cuota.s_finan", cuota.sal_doc);

            var pago_a = (numeral(pago)._value > 0)  ? numeral(pago)._value : numeral(cuota.valor)._value + numeral(interesCuota)._value;
            var armado = addCharacter(cuota.num_doc,14," ",'right') // --@num_fac = Factura varchar(14)
                + addCharacter(cuota.reg,3,"0") // --@cuota = cuota abono int(3)
                + addCharacter(numeral(pago_a)._value - numeral(interesCuota)._value, 8,"0") // --@valor_cuota = valor cuota money(8)
                + addCharacter(0,8,"0") // --@descuento = valor descuento money(8)
                + addCharacter(capital,8,"0") // --@capital = valor descuento money(8)
                + addCharacter(cuota.s_finan,8,"0") // --@valor_fin = valor financiamiento money(8)
                + addCharacter(cuota.s_aval,8,"0") // --@valor_aval = valor aval money(8)
                + addCharacter(dias_mora,3,"0") // --@dia_mora = dias de mora int(3)
                + addCharacter(moment(cuota.fec_ven.replace(/(Z)|(\s)/g, "")).format("YYYYMMDD"))// --@fecha_ven = fecha vencimiento varchar(8)
                + addCharacter(interesCuota,8,"0")// --@int_cuota = interes de la cuota money(8);

            var armadoDescuento = addCharacter(cuota.num_doc,14," ",'right') // --@num_fac = Factura varchar(14)
                + addCharacter(cuota.reg,3,"0") // --@cuota = cuota abono int(3)
                + addCharacter(numeral(pago_a)._value - numeral(interesCuota)._value, 8,"0") // --@valor_cuota = valor cuota money(8)
                + addCharacter(descuento.toFixed(0),8,"0") // --@descuento = valor descuento money(8)
                + addCharacter(capital,8,"0") // --@capital = valor descuento money(8)
                + addCharacter(cuota.s_finan,8,"0") // --@valor_fin = valor financiamiento money(8)
                + addCharacter(cuota.s_aval,8,"0") // --@valor_aval = valor aval money(8)
                + addCharacter(dias_mora,3,"0") // --@dia_mora = dias de mora int(3)
                + addCharacter(moment(cuota.fec_ven.replace(/(Z)|(\s)/g, "")).format("YYYYMMDD"))// --@fecha_ven = fecha vencimiento varchar(8)
                + addCharacter(interesCuota,8,"0")// --@int_cuota = interes de la cuota money(8);
            chk_cuota += 'data-uuid="'+armado+'" data-uuidDescuento="'+armadoDescuento+'" />';


            items += '<tr '+color_tr+'>'
            + '<td>'+chk_cuota+'</td>'
            + '<td style="text-align:right;" '+parcial+' class="p_parcial">'+pago+'</td>'
            + '<td>'+cuota.num_doc+'</td>'
            + '<td>'+cuota.CondCredito+'</td>'
            + '<td>'+dateVenc+'</td>'
            + '<td style="text-align:right;">'+numeral(cuota.valor).format('$0,000')+'</td>'
            + '<td style="text-align:right;"><b>'+numeral(cuota.sal_doc).format('$0,000')+'</b></td>'
            + '<td style="text-align:center;">'+cuota.reg+' de '+cuota.nro_cuota+'</td>'
            + '<td ' + classD + ' style="text-align:center;">'+dias_mora+'</td>'
            + '<td ' + classD + ' style="text-align:center;">'+numeral(interesCuota).format('$0,000')+'</td>'
            + '<td>'+cuota.iva_int+'</td>'
            + '<td>'+numeral(parseInt(cuota.sal_doc) + parseInt(interesCuota)).format('$0,000')+'</td>';
            j++;
        }
        i++;
    }
    $('#subtotal').val(numeral(subtotal).format('$0,000'));
    $('#descuentos').val(numeral(descuentos).format('$0,000'));
    $('#total_pagos').val(numeral(total).format('$0,000'));
    $('#valor_abono').val(numeral(total).format('$0,000'));
    $('#table_det_credi').html(items);
    calcularValorPagado();
    recalcularDescuentos();
}

function recalcularDescuentos() {
    if ($('.chk-cuota').last().prop('checked') && ($('.chk-cuota').last().data('cuota') >= $('.chk-cuota').last().data('saldoc'))) {
        var chk = $('.chk-cuota').last();
        var doc = chk.data('doc');
        var chks = $('input.chk-cuota:checked');
        total = 0;
        descuento = 0;

        _.each(chks, function(c) {
            var p_p = $(c).parent().siblings('.p_parcial');
            if (doc == $(c).data('doc') && ($(c).data('vencido') == 0)) {
                $(p_p).text(numeral(parseInt($(c).data('cuota')) - parseInt($(c).data('descuento'))).format('$0,000'));
                total += parseInt($(c).data('cuota')) - parseInt($(c).data('descuento'));
                descuento += parseInt($(c).data('descuento'));
            } else {
                total += parseInt($(c).data('cuota'));
            }
        })
        $('#descuentos').val(numeral(descuento).format('$0,000'));
        $('#subtotal').val(numeral(total + descuento).format('$0,000'));
        $('#total_pagos').val(numeral(total).format('$0,000'));
        $('#valor_abono').val(numeral(total).format('$0,000'));
        calcularValorPagado();

        $('#valor_pagado').animate({ backgroundColor: "#ff8" }, 300).animate({ backgroundColor: "#f6f6f6" }, 600);
        $('#cambio').animate({ backgroundColor: "#ff8" }, 300).animate({ backgroundColor: "#f6f6f6" }, 600);
        $('#total_pagos').animate({ backgroundColor: "#ff8" }, 300).animate({ backgroundColor: "#f6f6f6" }, 600);
        $('#valor_abono').animate({ backgroundColor: "#ff8" }, 300).animate({ backgroundColor: "#f6f6f6" }, 600);
    }
}

function closeModal() {
    $('body').css('overflow', 'auto');
    $('.cont-modal').fadeOut();
}

function valorPagado(event) {
    calcularValorPagado();
}

function calcularValorPagado() {
    var value = $('#valor_p');
    var value_c = numeral(value.val())._value;

    if (value.val().length > 0) {
        $('#valor_pagado').val(numeral(value_c).format('$0,000'));
        var cambio = parseInt(value_c) - parseInt(total);
        $('#cambio').val(numeral(cambio).format('$0,000'));
    } else {
        $('#valor_pagado').val('$0');
        $('#cambio').val('$0');
    }
    var totalSelected = $('input.chk-cuota:checked').length;
    $('#num_cuotas > span').text(totalSelected.toString());
}

function sendPayments() {
    if (_.isNull($('#valor_p').val().match(/\d+/g))) {
        swal({
            'title': '¡Error!',
            'text': 'No es posible registrar un pago sin ingresar el Valor Pagado',
            'icon': 'error',
            'dangerMode': true
        }).then((value) => {});
    } else {
        if ((parseInt($('#valor_p').val().match(/\d+/g).join('')) - total) >= 0) {
            var cli = $('#cod_cli').val();
            var items = "";
            _.map($('input.chk-cuota:checked'), function(o) {
                var doc = $(o).data('doc');
                if ($('input.chk-cuota[data-doc='+doc+'][data-last=true]').prop('checked')) {
                    items += ($(o).data('vencido')) ? $(o).data('uuid')+"|" : $(o).data('uuiddescuento')+"|";
                } else {
                    items += $(o).data('uuid')+"|";
                }
            });
            items = items.substr(0, items.length -1);

            togglePreloader(true);

            reqJSON({
                'path': './enviarPagos',
                'data': {
                    'cliente': cli,
                    'valor': total,
                    'vpago': numeral($('#valor_p').val())._value,
                    'items': items,
                    'id_transaccion': (externo) ? externo_id_transaccion : 0
                },
                'type': 'POST'
            }, function(err, response) {
                togglePreloader(false);

                if(err) {
                    console.error(err);
                    swal({
                        'title': '¡Error!',
                        'text': 'Un error ha ocurrido. Por favor, intenta nuevamente',
                        'icon': 'error',
                        'dangerMode': true
                    }).then((value) => {});
                } else {
                    if (response.msg == "Success") {
                        $('.cont-modal').fadeOut();
                        swal({
                            title: '¡Pago / Abono registrado!',
                            text: 'Se ha registrado el pago / abono por valor de '+numeral(total).format('$0,000')+'. Recibo #'+response.data[0][0].recibo,
                            icon: 'success',
                            dangerMode: true,
                            'closeOnClickOutside': false
                        }).then((value) => {
                            if (value) {
                                printPayment(response.data[0][0].recibo);
                                closeModal();
                                $('#cont-credi').fadeOut();
                                $('#cod_cli').val('');
                                $('.cod_cli').val('');
                                $('.nom_cli').val('');
                                $('.cup_cli').val('');
                                $('#data-credi').html('');
                                $('#cod_cli').focus();
                            }
                        });
                    }
                }
            });
        } else {
            swal({
            'title': '¡Error!',
            'text': 'El Valor Pagado debe ser mayor o igual al Valor Abono',
            'icon': 'error',
            'dangerMode': true
        }).then((value) => {});
        }
    }
}

function getPayments(abono) {
    var a_parcial = 0;
    if (abono) {
        a_parcial = abono;
    }
    var cli = $('#cod_cli').val();
    if (cli.length > 0) {
        togglePreloader(true);

        reqJSON({
            'path': './consultarPagos',
            'data': {
                'cliente': cli
            },
            'type': 'POST'
        }, function(err, response) {
            togglePreloader(false);

            if(err) {
                $('#cont-credi').fadeOut();
                $('.cod_cli').val('');
                $('.nom_cli').val('');
                $('.cup_cli').val('');
                $('#data-credi').html('');
                console.error(err);
                swal({
                    'title': '¡Error!',
                    'text': 'Un error ha ocurrido. Por favor, intenta nuevamente',
                    'icon': 'error',
                    'dangerMode': true
                }).then((value) => {});
            } else {
                if (response.data[0].length > 0) {
                    _dataPago = response.data;
                    var nombre = response.data[0][0].nom_cli.trim();
                    var cupo = numeral(response.data[0][0].saldo).format('$0,000');
                    $('.cod_cli').val(cli);
                    $('.nom_cli').val(nombre);
                    $('.cup_cli').val(cupo);

                    if (response.data[1].length > 0) {
                        $('#cont-credi').fadeIn();
                        $('#no-data').fadeOut();
                        $('#table-credi').fadeIn();
                        fillTable(response.data[1], a_parcial);
                        if (abono) {
                            updatePayments();
                            $('#valor_p').val(numeral(abono).format('$0,000'));
                            $('#valor_p').trigger('keyup');
                            $('#cont-credi').hide();
                            sendPayments();
                        }
                    } else {
                        $('#cont-credi').fadeOut();
                    }
                } else {
                    $('#cont-credi').fadeOut();
                    $('.nom_cli').val('');
                    $('.cup_cli').val('');
                    $('#data-credi').html('');
                    swal({
                        title: '¡El cliente no existe!',
                        text: 'El cliente con C.C. '+cli+' no ha sido encontrado.',
                        icon: 'warning',
                        dangerMode: true
                    }).then((value) => {});
                }
            }
        });
    } else {
        swal({
            'title': '¡Advertencia!',
            'text': 'Ingresa la cédula del cliente para continuar',
            'icon': 'warning',
            'dangerMode': true
        }).then((value) => {});
    }
}

function printSearchClients(input) {
    if(!input.length && messageSearchClient) {
        let elDocument = $('input[name="cod_cli"]');
        swal({
            title: '¡El cliente no existe!',
            text: 'El cliente '+elDocument.val()+' no ha sido encontrado.',
            icon: 'warning',
            dangerMode: true
        }).then((value) => {});
        messageSearchClient = false;
    }

    let availableTags = [];
    for (let item of input) {
        let valOption = ""+item.cod_cli.replace(/(\s)/g, '');
        availableTags.push({label: (valOption+' - '+item.nom_cli), value: valOption});
    }

    $('#cod_cli').autocomplete({
        'minLength': 0,
        'source': availableTags,
        'select': function(event, ui) {
            $('#cod_cli').val(ui.item.value);
            getPayments();
            return false;
        },
        'focus': function(event, ui) {
            // $("#cod_cli").val(ui.item.value);
            return false;
        }
    }).focus(function () {
        $(this).autocomplete('search');
    }).focus();
}

function searchClients() {
    if(timeoutSearchClients) {
        clearTimeout(timeoutSearchClients);
    }

    // timeoutSearchClients = setTimeout(function() {
    let strSearch = getValInput('input[name="cod_cli"]').trim();
    $('input[name="cod_cli"]').val(strSearch);
    resetModule();
    reqJSON({
        'path': urlWS+'/buscarCliente',
        'data': {
            'empresa': company,
            'stbuscar': strSearch
        },
        'type': 'POST'
    }, function(err, response) {
        printSearchClients(response.data[0]);
    }, true);
    // }, 800);
}

function resetModule() {
    $('#cont-credi').fadeOut();
    $('.nom_cli').val('');
    $('.cup_cli').val('');
    // $('#cod_cli').val('');
    $('#data-credi').html('');
}
