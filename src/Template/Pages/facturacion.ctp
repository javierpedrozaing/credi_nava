<style media="screen">
    #datatablesSimulator tr {
        cursor: pointer;
    }
    .container-table-result {
        background: #eee;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    #datatablesSimulator tr.active,
    #datatablesSimulator tr.green.active {
        background: #c1c1c1;
        color: #ffffff;
        font-weight: 500;
    }

    #datatablesSimulator tr.green {
        background: #ede079;
        /* color: #ffffff; */
        font-weight: 500;
    }

    /** ***** Modal pdfs ***** */
    .tag-modal-pdf {
        /* background: #efefef;
        border-radius: 2px;
        display: inline-block; */
        font-size: 15px;
        /* margin: 0 4px 8px 0;
        padding: 6px 12px; */
    }
    .tag-modal-pdf .tag-title {
        font-weight: 400;
    }
    .tag-modal-pdf .tag-desc {

    }
    #pdfsModal .card.card-pdf {
        box-shadow: none;
        margin: 0;
    }
    #pdfsModal .card.card-pdf {
        box-shadow: none;
        margin: 0;
    }
    #pdfsModal .card.card-pdf .card-header, #pdfsModal .card .card-body {
        margin: 0;
        padding: 0;
    }
    #pdfsModal .card.card-pdf .card-header .nav-item {
        font-weight: 400;
    }
    #pdfsModal #btnSign, #pdfsModal #btnSignEnd {
        position: absolute;
        bottom: 4px;
        right: 24px;
        font-size: 16px;
        padding: 0.45em 0.8em;
        border-radius: 4px !important;
        font-size: 16px;
        line-height: 1.42857143;
    }
    #formSimulator input:focus, #formSimulator select:focus, #formSimulator textarea:focus, #formSimulator button:focus {
        box-shadow: 0 0 5px rgb(0, 100, 255);
        border: 1px solid rgba(0, 100, 255, 0.8);
    }
    #formSimulator select.empty {
        color: #bbbbbb;
    }
    #deudor {
        padding-bottom: 8px;
    }
    #codeudor {
        border-top: 1px solid #d8d8d8;
        padding-top: 8px;
    }
    /** ***** / Modal pdfs ***** */

    /* ***** TAB DE HUELLAS ***** */
    #hands {
        position: relative;
    }

    #hands #handRight {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #hands #handRight .finger,
    #hands #handLeft .finger {
        background: #999999;
        cursor: no-drop;
        position: absolute;
    }

    #hands #handRight #palmRight {
        background: #999999;
        border-radius: 30px 35px 50px 25px;
        height: 90px;
        left: 60px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #hands #handRight #finger1 {
        border-radius: 75px 75px 100px 20px;
        height: 55px;
        left: 19px;
        transform: rotate(-57deg);
        top: 108px;
        width: 30px;
    }
    #hands #handRight #finger2 {
        border-radius: 75px 75px 75px 20px;
        height: 70px;
        left: 45px;
        transform: rotate(-20deg);
        top: 25px;
        width: 25px;
    }
    #hands #handRight #finger3 {
        border-radius: 75px 75px 25px 55px;
        height: 75px;
        left: 85px;
        transform: rotate(-8deg);
        top: 10px;
        width: 20px;
    }
    #hands #handRight #finger4 {
        border-radius: 75px 75px 25px 55px;
        height: 70px;
        left: 120px;
        transform: rotate(10deg);
        top: 15px;
        width: 20px;
    }
    #hands #handRight #finger5 {
        border-radius: 75px 75px 25px 55px;
        height: 65px;
        left: 155px;
        transform: rotate(25deg);
        top: 33px;
        width: 20px;
    }

    #hands #handLeft {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #hands #handLeft #palmLeft {
        background: #999999;
        border-radius: 35px 30px 25px 50px;
        height: 90px;
        left: 30px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #hands #handLeft #finger6 {
        border-radius: 75px 75px 20px 100px;
        height: 55px;
        left: 140px;
        transform: rotate(57deg);
        top: 108px;
        width: 30px;
    }
    #hands #handLeft #finger7 {
        border-radius: 75px 75px 20px 75px;
        height: 70px;
        left: 120px;
        transform: rotate(20deg);
        top: 25px;
        width: 25px;
    }
    #hands #handLeft #finger8 {
        border-radius: 75px 75px 55px 25px;
        height: 75px;
        left: 85px;
        transform: rotate(8deg);
        top: 10px;
        width: 20px;
    }
    #hands #handLeft #finger9 {
        border-radius: 75px 75px 55px 25px;
        height: 70px;
        left: 50px;
        transform: rotate(-10deg);
        top: 15px;
        width: 20px;
    }
    #hands #handLeft #finger10 {
        border-radius: 75px 75px 55px 25px;
        height: 65px;
        left: 20px;
        transform: rotate(-25deg);
        top: 33px;
        width: 20px;
    }

    #hands .finger.finger-exist {
        background: #ea4641 !important;
        cursor: pointer;
    }
    #hands .finger.finger-selected {
        background: #262626 !important;
        cursor: pointer;
    }


    #hands .finger {
        cursor: no-drop !important;
    }
    #hands .finger.finger-exist {
        background: #ea4641 !important;
        cursor: pointer !important;
    }
    #hands .finger.finger-selected {
        background: #262626 !important;
    }
    .guardaFianza{
        display: none;
    }
    .guardaFianza p{
        font-weight: bold;
    }
    #listFpLeft, #listFpRight{
        color: #ea4641;
        font-size: 20px;
    }
    #guia_pago1{
        display: none;
        position: absolute;
        bottom: -25px;
        right: 15px;
    }
    #guia_pago2{
        display: none;
        position: absolute;
        top: 0px;
        left: 20px;
        z-index: 2;
    }
    #guia_pago3{
        display: none;
        position: absolute;
        right: 125px;
        top: 15px;
    }
    #formSimulator label{
        font-size: 20px;
        line-height: 21px;
        font-weight: bold;
    }
    /* ***** / TAB DE HUELLAS ***** */
</style>
<div filter-color="black" style="background-image: url('./img/bg5.jpg');opacity: 0.4;" class="bg-section-gral"></div>

<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title pb-8">Obligación</h4>
                <!-- <h5 class="card-category">Cupo: <span id="cupo">$0</span></h5> -->
            </div>
            <div class="card-body">
                <form id="formSimulator" class="c-form-group" autocomplete="off">
                    <div class="">
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="client">Documento:* &nbsp;</label>
                            </div>
                            <div class="col">
                                <span class="i-search">
                                    <input id="fClient" class="mb-2 mr-sm-2" type="text" name="client" placeholder="Buscar por cédula ó nombres" value="" onkeyup="iCtrl.searchClients(this)" tabindex="1" required>
                                    <span class="b-search pointer" onclick="iCtrl.validClient()"><i class="material-icons">search</i></span>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="name_client">Nombre cliente: &nbsp;</label>
                            </div>
                            <div class="col">
                                <input class="mb-2 mr-sm-2" type="text" name="name_client" value="" disabled>
                            </div>
                        </div>
                        <div id="nameCodeudor" class="row" style="display: none;">
                            <div class="col col-md-4">
                                <label class="" for="name_codeudor">Codeudor: &nbsp;</label>
                            </div>
                            <div class="col col-md-8">
                                <input class="mb-2 mr-sm-2" type="text" name="name_codeudor" value="" disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="cupo">Cupo: &nbsp;</label>
                            </div>
                            <div class="col">
                                <input class="mb-2 mr-sm-2" type="text" name="cupo" value="" disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="seller">Vendedor:* &nbsp;</label>
                            </div>
                            <div class="col">
                                <select class="mb-2 mr-sm-2 hide" type="text" name="seller" value=""></select>
                                <input id="textSeller" class="mb-2 mr-sm-2" type="text" name="text_seller" value="" tabindex="2" required disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="ammount">Ingrese Valor:* &nbsp;</label>
                            </div>
                            <div class="col">
                                <input class="mb-2 mr-sm-2" type="text" name="ammount" value="" onkeypress="return isNumber(event)" onkeyup="formatNumber(event,'$ ',true)" tabindex="3" required disabled>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="ammount">Documento: &nbsp;</label>
                            </div>
                            <div class="col">
                                <input class="mb-2 mr-sm-2" type="text" name="num_pagare" value="" onkeyup="onlyUpperCase(this)" tabindex="4" maxlength="14">
                            </div>
                        </div>
                        <div class="row" style="position: relative;">
                            <div class="col col-md-4">
                                <label class="" for="typeCredit" style="font-size: 20px;font-weight: bold;">Forma de Pago:* &nbsp;</label>
                            </div>
                            <div class="col">
                                <?= $this->Form->select('typeCredit', $typesCreditOptions, ['label' => false, 'class' => 'mb-2 mr-sm-2 empty', 'placeholder' => 'SELECCIONAR', 'tabindex' => '5','required' => 'required']) ?>
                            </div>
                            <?php echo $this->Html->image('guia_pago1.png', array('id' => 'guia_pago1')); ?>
                        </div>
                        <div class="row" id="diasParaInicial">
                            <div class="col col-md-4">
                                <label class="" for="daysTypeCredit">Días para la inicial: &nbsp;</label>
                            </div>
                            <div class="col">
                                <span id="daysTypeCredit"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="" style="padding:10px;"></div>
                        </div>
                        <div class="row">
                            <div class="col text-right">
                                <!-- <button type="button" name="button" onclick="iCtrl.openPdfModal()">CLICK ME</button> -->
                                <button type="button" class="btn btn-default mt-0" data-toggle="tooltip" data-placement="top" title="(F2)" onclick="iCtrl.resetSimulator()" id="btn-limpiar">Limpiar</button>
                                <button type="submit" class="btn btn-danger mt-0" data-toggle="tooltip" data-placement="top" title="(F4)" tabindex="6" id="btn-simular">Simular</button>
                            </div>                       
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title "><span id="descripcionCredito">Plan de pagos</span></h4>
                <!-- <h5 class="card-category">Cupo: <span id="cupo">$0</span></h5> -->
            </div>
            <div class="card-body">
                <div class="">
                    <div class="row fs-16">
                        <div class="col col-md-6">
                            <div class="row">
                                <div class="col col-md-6 pr-0">
                                    <p class="">Valor Obligación:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="valorFactura">$0</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6 pr-0">
                                    <p class="">Valor Intereses:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="valorIntereses">$0</p>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div class="row">
                                <div class="col col-md-6 p-0">
                                    <p class=""><span class="fw-400" id="cantidadCuotas">0</span> Cuotas de:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="cuotasDe">$0</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col col-md-6 p-0">
                                    <p class="">Total a financiar:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="totalFinanciar">$0</p>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-6 guardaFianza">
                            <div class="row">
                                <div class="col col-md-6 pr-0">
                                    <p class="">Forma de Pago:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="formaPago">EFECTIVO</p>
                                </div>
                            </div>
                        </div>
                        <div class="col col-md-6 guardaFianza">
                            <div class="row">
                                <div class="col col-md-6 p-0">
                                    <p class="">Valor Pagado:</p>
                                </div>
                                <div class="col">
                                    <p class="text-danger fw-400" id="valorPagado">$0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="position: relative;padding-top: 25px;">
                        <?php echo $this->Html->image('guia_pago2.png', array('id' => 'guia_pago2')); ?>
                        <div class="col text-right">
                            <div class="table-responsive container-table-result c-form-group">
                                <table id="datatablesSimulator" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                    <thead class="text-danger">
                                        <th>Cuotas</th>
                                        <th>Valor Cuota</th>
                                        <th>Valor Total</th>
                                        <th>&nbsp;</th>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col text-right">
                            <button id="loadSimulator2" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" style="display:none;"><i class="material-icons" style="line-height: 1.5;">save</i> Pagar Fianza</button>    
                        </div>
                        <div class="col text-right" style="position: relative;">
                            <?php echo $this->Html->image('guia_pago3.png', array('id' => 'guia_pago3')); ?>
                            <!-- <button type="button" class="btn btn-danger" onclick="printInvoice('F483-10963')">Imprimir</button> -->
                            <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="(F7)" onclick="iCtrl.beforeRecordInvoice()">Grabar</button>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col col-md-4">
                            <p class="">Pagado: &nbsp;</p>
                        </div>
                        <div class="col">
                            <p class="text-danger">$0</p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- <div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Opciones de financiación</h4>
            </div>
            <div class="card-body">

            </div>
        </div>
    </div>
</div>

<button class="btn" type="button" name="button" onclick="iCtrl.openPdfModal()">¡Click Me!</button> -->



<!-- MODAL PDFS -->
<div class="modal fade" id="pdfsModal" tabindex="-1" role="dialog" aria-labelledby="pdfsModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 5px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="pdfsModalLabel">APLICACIÓN BIOMETRICA</h5>
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button> -->
            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col pb-8">
                        <div class="card m-0">
                            <div class="card-body">
                                <div class="row p-16 tag-modal-pdf m-0" id="deudor">
                                    <div class="col-md-4">
                                        <span class="tag-title">Cédula:</span>
                                        <span class="tag-desc" id="modalPdfCedula">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Nombre:</span>
                                        <span class="tag-desc" id="modalPdfNombre">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Apellido:</span>
                                        <span class="tag-desc" id="modalPdfApellido">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Correo:</span>
                                        <span class="tag-desc" id="modalPdfCorreo"></span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Teléfono:</span>
                                        <span class="tag-desc" id="modalPdfTelefono">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Dirección:</span>
                                        <span class="tag-desc" id="modalPdfDireccion">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Id Proceso:</span>
                                        <span class="tag-desc" id="modalPdfIdFirma">&nbsp;</span>
                                    </div>
                                    <div class="col-md-8">
                                        <!-- <span class="tag-title">Cliente Firma:</span>
                                        <span class="tag-desc">
                                            &nbsp;
                                            <label for="" style="color:#424242;font-weight:300;">Sí <input type="radio" name="md_cliente_firma" value="si" disabled></label>
                                            &nbsp;&nbsp;
                                            <label for="" style="color:#424242;font-weight:300;">No <input type="radio" name="md_cliente_firma" value="no" disabled></label>
                                        </span> -->
                                    </div>
                                </div>
                                <div class="row p-16 tag-modal-pdf m-0" id="codeudor">
                                    <div class="col-md-12">
                                        <h4 class="m-0" style="text-decoration: underline;">Codeudor</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Cédula:</span>
                                        <span class="tag-desc" id="modalPdfCoCedula">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Nombre:</span>
                                        <span class="tag-desc" id="modalPdfCoNombre">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Apellido:</span>
                                        <span class="tag-desc" id="modalPdfCoApellido">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Correo:</span>
                                        <span class="tag-desc" id="modalPdfCoCorreo"></span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Teléfono:</span>
                                        <span class="tag-desc" id="modalPdfCoTelefono">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Dirección:</span>
                                        <span class="tag-desc" id="modalPdfCoDireccion">&nbsp;</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col col-md-12">
                                        <p class="text-center text-danger fs-18"><b>VALIDAR LA INFORMACIÓN CON EL CLIENTE ANTES DE FIRMAR</b></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col col-md-12">
                                        <button id="btnSign" type="button"
                                        class="btn btn-success"
                                        onclick="iCtrl.sendSign()">Firmar Documento</button>
                                        <p style="text-align: right;padding-bottom: 30px;padding-right: 12px;font-size: 16px;">* Haz click para iniciar la firma en biodata</p>
                                        <!-- <button id="btnSignEnd" type="button"
                                        class="btn btn-success hide"
                                        onclick="window.location.reload()">Continuar</button> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 pt-8">
                        <div class="card card-pdf">
                            <div class="card-header card-header-danger p-0">
                                <nav>
                                    <div class="nav nav-tabs p-0" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-autorizacion-tab" data-toggle="tab" href="#nav-autorizacion" role="tab" aria-controls="nav-autorizacion" aria-selected="true">Autorización Reporte Centrales</a>
                                        <a class="nav-item nav-link" id="nav-contrato-tab" data-toggle="tab" href="#nav-contrato" role="tab" aria-controls="nav-contrato" aria-selected="false">Contrato de Fianza</a>
                                        <a class="nav-item nav-link" id="nav-pagare-tab" data-toggle="tab" href="#nav-pagare" role="tab" aria-controls="nav-pagare" aria-selected="false">Pagare de Venta</a>
                                    </div>
                                </nav>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-autorizacion" role="tabpanel" aria-labelledby="nav-autorizacion-tab">
                                        <div class="" style="height:100%;min-height: calc(100vh - 395px);display: grid;">
                                            <embed id="pdfAutorizacion"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;max-height: calc(100vh - 395px);">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-contrato" role="tabpanel" aria-labelledby="nav-contrato-tab">
                                        <div class="" style="height:100%;min-height: calc(100vh - 395px);display: grid;">
                                            <embed id="pdfContrato"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;max-height: calc(100vh - 395px);">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-pagare" role="tabpanel" aria-labelledby="nav-pagare-tab">
                                        <div class="" style="height:100%;min-height: calc(100vh - 395px);display: grid;">
                                            <embed id="pdfPagare"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;max-height: calc(100vh - 395px);">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-footer p-8" style="padding: 8px 16px;">
                <button id="btnSign" type="button" class="btn btn-success" onclick="iCtrl.sendSign()">Firmar Documento</button>
                <button id="btnSendFormWizard" type="button" class="btn btn-danger hide">Enviar &nbsp;<i class="material-icons" style="font-size: 18px;">compare_arrows</i></button>
            </div> -->
        </div>
    </div>
</div>
<!-- / MODAL PDFS -->


<!-- MODAL HUELLA -->
<div class="modal fade" id="fingerprintModal" tabindex="-1" role="dialog" aria-labelledby="fingerprintModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 70vw;"><!-- margin-top: 5px; -->
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="fingerprintModalLabel">VALIDAR HUELLA DEL CLIENTE</h5>
                <button type="button" class="close" aria-label="Close" onclick="iCtrl.closeFingerprintModal()">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row" style="padding: 8px 0;">
                    <div class="col col-md-12">
                        <h4>
                            <span id="clientFp" style="color: #5f5f5f;font-size: 20px;"><b></b></span>
                        </h4>
                    </div>
                </div>
                <div class="row" style="padding: 0 16px;font-size: 18px;">
                    NOTA: Los dedos sombreados son las huellas registradas del cliente.
                </div>
                <div class="row" style="padding: 32px 16px;">
                    <div class="col-12 text-center">
                        <div class="row">
                            <div class="col-6">
                                <div id="listFpLeft" class="">&nbsp;</div>
                            </div>
                            <div class="col-6">
                                <div id="listFpRight" class="">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-md-12 text-center">
                        <div id="hands">
                            <div id="handLeft">
                                <div id="finger6" class="finger" data-finger="6" onclick="iCtrl.onFinger('6')">&nbsp;</div>
                                <div id="finger7" class="finger" data-finger="7" onclick="iCtrl.onFinger('7')">&nbsp;</div>
                                <div id="finger8" class="finger" data-finger="8" onclick="iCtrl.onFinger('8')">&nbsp;</div>
                                <div id="finger9" class="finger" data-finger="9" onclick="iCtrl.onFinger('9')">&nbsp;</div>
                                <div id="finger10" class="finger" data-finger="10" onclick="iCtrl.onFinger('10')">&nbsp;</div>
                                <div id="palmLeft">&nbsp;</div>
                            </div>
                            <div id="handRight">
                                <div id="finger1" class="finger" data-finger="1" onclick="iCtrl.onFinger('1')">&nbsp;</div>
                                <div id="finger2" class="finger" data-finger="2" onclick="iCtrl.onFinger('2')">&nbsp;</div>
                                <div id="finger3" class="finger" data-finger="3" onclick="iCtrl.onFinger('3')">&nbsp;</div>
                                <div id="finger4" class="finger" data-finger="4" onclick="iCtrl.onFinger('4')">&nbsp;</div>
                                <div id="finger5" class="finger" data-finger="5" onclick="iCtrl.onFinger('5')">&nbsp;</div>
                                <div id="palmRight">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center">
                        <button type="button" name="button" class="btn btn-cancel btn-fill btn-danger" onclick="iCtrl.checkFingerprint()">Verificar huella(s)</button>
                        <p>* Haz click para iniciar la verificación de la huella</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL HUELLA -->





<!-- <div class="row" style="padding: 8px 0;">
    <div class="col col-md-12">
        <h4>
            <span style="color: #000000;"><b>Validación de huella</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span style="color: #5f5f5f;"><b>10394324932432 - AAN MARIA ARAIAS</b></span>
        </h4>
    </div>
</div>
<div class="row" style="padding: 0 16px;">
    Seleccione el dedo a verificar.
    (NOTA: Los dedos sombreados en gris estan registrados)
</div>
<div class="row" style="padding: 24px 16px;">
    <div class="col col-md-12 text-center">
        <div class="col-12 text-center">
            <div class="row">
                <div class="col-6">
                    <div id="modal_listFpLeft" class="">&nbsp;</div>
                </div>
                <div class="col-6">
                    <div id="modal_listFpRight" class="">&nbsp;</div>
                </div>
            </div>
        </div> -->


<div class="row hide">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Aplicación Biometrica</h4>
                <p class="card-category">Usuario: sis1 | 11</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Cédula: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">1035423395</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Nombre: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">DEISY YASMIN</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Apellido: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">AGUDELO HERNANDEZ</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Correo: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id=""></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Teléfono: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">314 897 1773</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Dirección: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">CLL 50 # 35 - 23(COPABANA, ANTIOQUIA)</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Cliente Firma: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="" id="">
                                    <label for="">Sí <input type="radio"></label>
                                    &nbsp;&nbsp;
                                    <label for="">No <input type="radio"></label>
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-12">
                                <p class="text-center text-danger"><b>VALIDAR CON EL CLIENTE ANTES DE FIRMAR</b></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-12 pull-right">
                                <button type="submit" class="btn btn-success">Firmar Documento</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <nav>
                            <div class="nav nav-tabs p-0" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-items-tab" data-toggle="tab" href="#nav-items" role="tab" aria-controls="nav-items" aria-selected="true">PAGARE DE VENTA</a>
                                <a class="nav-item nav-link" id="nav-fees-tab" data-toggle="tab" href="#nav-fees" role="tab" aria-controls="nav-fees" aria-selected="false">CONTRATO FIANZA</a>
                                <a class="nav-item nav-link" id="nav-pending-tab" data-toggle="tab" href="#nav-pending" role="tab" aria-controls="nav-pending" aria-selected="false">AUTO.REPORTE CENTRALES</a>
                                <!-- <a class="nav-item nav-link" id="nav-expired-tab" data-toggle="tab" href="#nav-expired" role="tab" aria-controls="nav-expired" aria-selected="false">...</a>
                                <a class="nav-item nav-link" id="nav-payment-tab" data-toggle="tab" href="#nav-payment" role="tab" aria-controls="nav-payment" aria-selected="false">...</a> -->
                            </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">
                                <div class="" style="height:100%;min-height: 640px;display: grid;">
                                    <embed id="embedPDF"
                                    src="http://api.pedbox.co:4590/files/attached/REQUERIMIENTO_INTRANET_attachediA8bawo.pdf"
                                    type="application/pdf"
                                    width="100%"
                                    style="height:100%;">
                                    <!-- min-width: 80vw; height: 65vh; -->
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
                                <div class="" style="height:100%;min-height: 640px;display: grid;">
                                    <embed id="embedPDF"
                                    src="http://api.pedbox.co:4590/files/attached/REQUERIMIENTO_INTRANET_attachediA8bawo.pdf"
                                    type="application/pdf"
                                    width="100%"
                                    style="height:100%;">
                                    <!-- min-width: 80vw; height: 65vh; -->
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
                                <div class="" style="height:100%;min-height: 640px;display: grid;">
                                    <span class="text-danger">No se cargo PDF(Mensaje de prueba)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<br><br>

<div class="row hide">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Facturas sin firmar</h4>
                <p class="card-category">Ragged - CAJA RAGGED #2 | 102</p>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead class=" text-danger">
                            <th>Reg</th>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Factura</th>
                            <th>Codeudor</th>
                            <th>Firmar</th>
                            <th>&nbsp;</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>1035423395</td>
                                <td>AGUDELO HERNANDEZ DEISY YASMIN</td>
                                <td>13/10/2018</td>
                                <td>F102-07445</td>
                                <td>No</td>
                                <td>√</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<br><br>
<script>
    var ctrlData = ctrlData || {};
    ctrlData.typesCredit = <?= json_encode($typesCredit) ?>;
    ctrlData.sellers = <?= json_encode($sellers) ?>;
    ctrlData.usuario = <?= json_encode($usuario) ?>;
</script>
<?= $this->Html->script('facturacion.js?v=2', ['block' => 'scriptBottom']) ?>
