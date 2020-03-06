<style type="text/css">
    .content{padding-top: 0px !important;}
    .carousel-control-next, .carousel-control-prev {background: rgba(0,0,0,0.1);}
</style>
<div filter-color="black" style="background-image: url('./img/bg7.jpg');" class="bg-section-gral"></div>
<div class="container">
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <!-- <div class="card">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <?= $this->Html->image('slide1.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                        <div class="carousel-item">
                            <?= $this->Html->image('slide2.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                        <div class="carousel-item">
                            <?= $this->Html->image('slide3.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div> -->
        </div>
    </div>
</div>

<!-- <h1>Intranet Dashboard</h1>
<p>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged.
</p>
<p>
    It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
    PageMaker including versions of Lorem Ipsum.
</p> -->

<!-- Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Bummmm!!!!
</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSeer">
    Bummmm2!!!!
</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalFormSeer">
    Bummmm3!!!!
</button> -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">INTRANET TITULO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="">
                            <b>Nro Factura</b> F260-090466
                        </div>
                        <div class="">
                            <b>Saldo en Mora</b> $22,321
                        </div>
                        <div class="">
                            <b>Intereses de Mora</b> $0
                        </div>
                        <div class="">
                            <b>Total Mora</b> $22,321
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="">
                            <b>Fecha Calculo Edad</b> 19/09/2018
                        </div>
                        <div class="">
                            <b>Edad</b> 0
                        </div>
                        <div class="">
                            <b>Obligación</b> -
                        </div>
                        <div class="">
                            <b>Total</b> $22,321
                        </div>
                    </div>
                </div>
                <hr>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-items-tab" data-toggle="tab" href="#nav-items" role="tab" aria-controls="nav-items" aria-selected="true">Artículos</a>
                        <a class="nav-item nav-link" id="nav-fees-tab" data-toggle="tab" href="#nav-fees" role="tab" aria-controls="nav-fees" aria-selected="false">Cuotas</a>
                        <a class="nav-item nav-link" id="nav-pending-tab" data-toggle="tab" href="#nav-pending" role="tab" aria-controls="nav-pending" aria-selected="false">Pendientes</a>
                        <a class="nav-item nav-link" id="nav-expired-tab" data-toggle="tab" href="#nav-expired" role="tab" aria-controls="nav-expired" aria-selected="false">Vencidas</a>
                        <a class="nav-item nav-link" id="nav-payment-tab" data-toggle="tab" href="#nav-payment" role="tab" aria-controls="nav-payment" aria-selected="false">Abonos</a>
                    </div>
                </nav>
                <hr>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five centuries, but also the
                            leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                    </div>
                    <div class="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <th>Cuotas</th>
                                    <th>Valor</th>
                                    <th>Saldo</th>
                                    <th>Fec Vto</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>16/03/2018</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>15/04/2018</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>15/05/2018</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>14/06/2018</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>14/07/2018</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>13/08/2018</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>12/09/2018</td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td class="text-primary">$22,321</td>
                                        <td class="text-primary">$22,321</td>
                                        <td>12/10/2018</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <th>Cuotas</th>
                                    <th>Valor</th>
                                    <th>Saldo</th>
                                    <th>Fec Vto</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>14/07/2018</td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>13/08/2018</td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>12/09/2018</td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td class="text-primary">$22,321</td>
                                        <td class="text-primary">$22,321</td>
                                        <td>12/10/2018</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-expired" role="tabpanel" aria-labelledby="nav-expired-tab">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <th>Cuotas</th>
                                    <th>Valor</th>
                                    <th>Saldo</th>
                                    <th>Fec Vto</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>9</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>16/03/2018</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="nav-payment" role="tabpanel" aria-labelledby="nav-payment-tab">
                        <div class="table-responsive">
                            <table class="table">
                                <thead class=" text-primary">
                                    <th>Cuotas</th>
                                    <th>Valor</th>
                                    <th>Saldo</th>
                                    <th>Fec Vto</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>16/03/2018</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>15/04/2018</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td class="text-primary">$22,800</td>
                                        <td class="text-primary">$0</td>
                                        <td>15/05/2018</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>




<!-- Modal2 Formulario Completo Vidente -->
<div class="modal fade" id="modalFormSeer" tabindex="-1" role="dialog" aria-labelledby="modalFormSeer" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black">Validación de Información Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <p class="text-center text-danger"><b>Actualizar los siguientes datos, para continuar con el VIDENTE</b></p>
                    </div>
                </div>
                <form id="formSeer" class="row mb-0 c-form-group">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6">
                                <label>Teléfono:</label>
                                <input name="telefono" type="text" onkeypress="return isNumber(event)" required>
                            </div>
                            <div class="col-md-6">
                                <label>Celular:</label>
                                <input name="celular" type="text" onkeypress="return isNumber(event)" required>
                            </div>
                        </div>
                        <div class="row pt-8">
                            <div class="col-md-12">
                                <label>Dirección:</label>
                                <input name="direccion" type="text" required>
                            </div>
                        </div>
                        <div class="row pull-right pt-16">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-danger">Actualizar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- / Modal2 Formulario Completo Vidente -->

<!-- / Script Formulario Completo Vidente -->
<script type="text/javascript">
    var iCtrlFormSeer = iCtrlFormSeer || {};
    var ctrlDataFormSeer = ctrlDataFormSeer || {};

    iCtrlFormSeer.onSubmitFormSeer = function() {
        $(document).on('submit','#formSeer',function(evt) {
            alert(JSON.stringify({
                'telefono': getValInput('#formSeer input[name="telefono"]'),
                'celular': getValInput('#formSeer input[name="celular"]'),
                'direccion': getValInput('#formSeer input[name="direccion"]')
            }, null, 4));

            // reqJSON({
            //     'path': './simulador',
            //     'data': {
            //         'tipo': valTypeCredit,
            //         'valor': valAmmount
            //     },
            //     'type': 'POST'
            // }, function(err, response) {
            //     if(err) { console.error(err) }
            //     iCtrl.printTableSimulator(response.data[0]);
            // });
            return false;
        });
    }

    iCtrlFormSeer.loadFormSeer = function() {
        $('#formSeer input[name="telefono"]').val(ctrlDataSeer.validClient.client.telefono);
        $('#formSeer input[name="celular"]').val(ctrlDataSeer.validClient.client.celular);
        $('#formSeer input[name="direccion"]').val(ctrlDataSeer.validClient.client.direccion);
    }

    setTimeout(function() {
        $(document).ready(function() {
            setTimeout(function() {
                iCtrlFormSeer.loadFormSeer();
            },3000);
            iCtrlFormSeer.onSubmitFormSeer();
        });
    }, 800);
</script>
<!-- / Script Formulario Completo Vidente -->

<!-- Modal2 Vidente -->
<div class="modal fade" id="modalSeer" tabindex="-1" role="dialog" aria-labelledby="modalSeer" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black">Validación de Información Cliente</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="questions-container">
                    <div class="question-item active" id="question1">
                        <div class="question-summary">
                            <p><span class="num-question">1.</span><span class="desc-question"></span></p>
                        </div>
                        <div class="question-content"></div>
                        <div class="question-actions text-right">
                            <button id="bNext1" type="button" class="btn btn-danger" onclick="iCtrlSeer.nextQuestion(1)" disabled>Siguiente</button>
                        </div>
                    </div>
                    <div class="question-item" id="question2">
                        <div class="question-summary">
                            <p><span class="num-question">2.</span><span class="desc-question"></span></p>
                        </div>
                        <div class="question-content"></div>
                        <div class="question-actions text-right">
                            <button id="bNext2" type="button" class="btn btn-danger" onclick="iCtrlSeer.nextQuestion(2)" disabled>Siguiente</button>
                        </div>
                    </div>
                    <div class="question-item" id="question3">
                        <div class="question-summary">
                            <p><span class="num-question">3.</span><span class="desc-question"></span></p>
                        </div>
                        <div class="question-content"></div>
                        <div class="question-actions text-right">
                            <button id="bNext3" type="button" class="btn btn-danger" onclick="iCtrlSeer.endQuestion()" disabled>Finalizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / Modal2 Vidente -->

<!-- ESTOS SON LOS ESTILOS PARA EL VIDENTE -->
<style media="screen">
.questions-container .question-item {
    display: none;
}
.questions-container .question-item.active {
    display: block;
}
.questions-container .question-item .question-summary {/* .num-question | .desc-question */
    font-weight: 400;
}
.questions-container .question-content {
    padding: 0px 16px;
}
.questions-container .question-content .item-answer label {
    color: #000000;
    font-weight: 100;
}
.questions-container .question-actions {

}
</style>
<!-- ESTOS SON LOS ESTILOS PARA EL VIDENTE -->
<!-- ESTE ES EL SCRIPT PARA EL VIDENTE -->
<script type="text/javascript">
    var iCtrlSeer = iCtrlSeer || {};
    var ctrlDataSeer = ctrlDataSeer || {};

    iCtrlSeer.validClient = function() {
        reqJSON({
            'path': './validarCliente',
            'data': {
                'cliente': '1152697787',
                'fullRes': true
            },
            'type': 'POST'
        }, function(err, response) {
            if(err) { console.error(err) }
            ctrlDataSeer.validClient = response;
            iCtrlSeer.printQuestions(response.questions);
        });
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
    iCtrlSeer.buildAnswers = function(input, flag) {
        let result = '';
        for (let keyI in input) {
            if(keyI.indexOf('Rta') !== -1) {
                if(input[keyI]) {
                    result += '<div class="item-answer">';
                    result += '<input type="radio" id="q'+flag+'a'+keyI+'" name="question'+flag+'" value="'+input[keyI]+'" data-rta="'+keyI+'" data-ind="'+flag+'">&nbsp;';
                    result += '<label for="q'+flag+'a'+keyI+'">'+input[keyI]+'</label>';
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
        for (let item of ctrlDataSeer.validClient.questions) {
            let elAnswer = $('#question'+flagQuestion+' input[type="radio"][data-ind="'+item.NumCorrecta+'"]');
            if(!elAnswer.prop('checked')) {
                isValid = false;
            }
            flagQuestion++;
        }

        if(isValid) {
            alert("VALIDACIÓN DE INFORMACIÓN CORRECTA.");
        }else {
            alert("No puede enviar la SOLICITUD AL CALLCENTER, faltan las siguientes AUTORIZACIONES. \n\nDebe Firmar la AUTORIZACION CENTRALES \nNo tiene CONSENTIMIENTO DE DATOS\nNo tiene ACUERDO FIRMA ELECTRONICA");
        }
    }


    setTimeout(function() {
        $(document).ready(function() {
            iCtrlSeer.validClient();
            iCtrlSeer.listenSelectAnswer();
        });
    }, 800);
</script>
<!-- / ESTE ES EL SCRIPT PARA EL VIDENTE -->
