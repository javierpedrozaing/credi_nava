<style media="screen">
    #datatablesObligations tr {
        transition: background-color 0.5s ease;
    }
    #datatablesFees tr.orange, #datatablesObligations tr.orange {
        background: rgba(255, 170, 0, 0.4);
        background-color: rgba(255, 170, 0, 0.4);
    }
    #datatablesFees tr.orange td, #datatablesObligations tr.orange td {
        border-color: rgba(255, 255, 255, 0.55);
    }
    .dataTables_length{
        padding: 0 20px;
    }
    #datatablesCalls_filter, #datatablesPayments_filter, #datatablesObligations_filter{
        padding-right: 20px;
        width: 100%;
    }
    #datatablesCalls_filter, #datatablesPayments_filter, #datatablesObligations_filter input{
        width: 60%;
        float: right;
    }
    #datatablesCalls thead, #datatablesPayments thead, #datatablesObligations thead{
        background: #e24335;
        color: #fff !important;
        font-weight: 300;
    }
    #datatablesCalls thead th, #datatablesPayments thead th, #datatablesObligations thead th{
        padding: 12px !important;
        font-size: 14px !important;
    }
    div.dataTables_wrapper div.dataTables_info{
        padding: 10px 0 15px 20px;
    }
    .wizard-container.custom-wizard .nav-item .nav-link.active{
        background-color: #f44336 !important;
        color: #fff !important;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 5px 6px 7px -5px rgba(0,0,0,.4) !important;
        border-radius: 4px;
    }

    .modal-dialog .card-header.card-header-danger .nav.nav-tabs a.active,
    .modal-dialog .card-header.card-header-danger .nav.nav-tabs a:hover {
        font-weight: 400;
    }
</style>
<div filter-color="black" style="background-image: url('./img/bg4.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="wizard-container custom-wizard" id="crm">
    <div class="card card-wizard active" data-color="danger" id="wizardCRM">
        <div class="card-header card-header-danger">
            <div class="card-title c-form-group-header">
                <h4 class="">
                    Estado de Cuenta -
                    <span>Cliente <span class="i-search"><?= $this->Form->text('validar_cedula', ['id' => 'validarCedula', 'label' => 'Cédula del Cliente', 'placeholder' => 'Buscar por cédula ó nombres', 'onkeyup' => 'iCtrl.searchClients(this)', 'required' => 'true', 'style' => 'margin-right: .5rem; min-width: 280px; font-size: 16px;']) ?><span class="b-search pointer" onclick="iCtrl.validClient()"><i class="material-icons" style="color: #f59e9c;">search</i></span></span></span>
                </h4>

            </div>
            <div class="row card-category fs-17">
                <div class="col-md-4 p-0">
                </div>
                <div class="col-md-4 p-0">
                    <b><span id="nomCli"></span></b>
                </div>
                <div class="col-md-2 p-0">
                    <span><b>Saldo:</b> <b><span id="saldo">$0</span></span></b>
                </div>
                <div class="col-md-2 p-0">
                    <span><b>Cupo Disponible:</b> <b><span id="cupo">$0</span></span></b>
                </div>
            </div>
        </div>
        <div class="wizard-navigation" style="padding: 8px 16px;">
            <ul class="nav nav-pills">
                <li class="nav-item col-md-3" style="padding: 0;">
                    <a class="nav-link active show"
                    href="#nav-obligations-tab"
                    data-toggle="tab" role="tab"
                    aria-selected="true">Obligaciones</a>
                </li>
                <li class="nav-item col-md-3" style="padding: 0;">
                    <a class="nav-link show"
                    href="#nav-payments-tab"
                    data-toggle="tab" role="tab"
                    aria-selected="true">Pagos</a>
                </li>
                <li class="nav-item col-md-3" style="padding: 0;">
                    <a class="nav-link show"
                    href="#nav-calls-tab"
                    data-toggle="tab" role="tab"
                    aria-selected="true">Llamadas</a>
                </li>
            </ul>
        </div>
        <div class="tab-content" style="padding-top: 8px;">
            <div class="tab-pane active show" id="nav-obligations-tab">
                <div class="pb-8">
                    <button class="btn btn-danger btn-sm request-filter active button-filter-disabled" data-ftype="active" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'active')">
                        Activas(<span id="countActives">0</span>)
                    </button>
                    <button class="btn btn-warning btn-sm request-filter canceled button-filter-disabled" data-ftype="canceled" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'canceled')">
                        Canceladas(<span id="countCanceled">0</span>)
                    </button>
                    <button class="btn btn-default btn-sm request-filter all" data-ftype="all" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'all')">
                        Todas(<span id="countAll">0</span>)
                    </button>
                </div>
                <div class="table-responsive c-form-group">
                    <table id="datatablesObligations" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class="text-danger">
                            <th>Det</th>
                            <th>Reg</th>
                            <th>Almacén</th>
                            <th>Prefijo</th>
                            <th>Nro Cédito</th>
                            <th>Condición</th>
                            <th>Fecha Factura</th>
                            <th>Valor Total</th>
                            <th>Valor Cuota</th>
                            <th>Saldo</th>
                            <th>Fecha Vencimiento</th>
                            <th>Saldo Vencido</th>
                            <th>Días Mora</th>
                            <th>Cuotas en Mora</th>
                            <th>Fecha Pago</th>
                            <th>Codeudor</th>
                            <th>Huella</th>
                            <th>PDF</th>
                            <th>Imp.</th>
                            <th>Paz Y Salvo</th>
                            <th>Documento</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane show" id="nav-payments-tab">
                <div class="table-responsive c-form-group">
                    <table id="datatablesPayments" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class="text-danger">
                            <th>Fecha Hora</th>
                            <th>Tipo Documento</th>
                            <th>Documento</th>
                            <th>Doc. Enlazado</th>
                            <th>Valor</th>
                            <th>Imp.</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="tab-pane show" id="nav-calls-tab">
                <div class="table-responsive c-form-group">
                    <table id="datatablesCalls" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class="text-danger">
                            <th>Reg</th>
                            <th>Empresa</th>
                            <th>Fecha Hora</th>
                            <th>Usuario</th>
                            <th>Grupo</th>
                            <th>Sub Grupo</th>
                            <th>Comentario</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>






<!-- Modal -->
<div class="modal fade" id="crmModal" tabindex="-1" role="dialog" aria-labelledby="crmModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="min-width: 50vw;margin-top: 35px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="crmModalLabel">Detalle Factura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="">
                            <b>Nro Factura:</b> <span id="emNumeroFactura"></span>
                        </div>
                        <div class="">
                            <b>Saldo en Mora:</b> <span id="emSaldoMora"></span>
                        </div>
                        <div class="">
                            <b>Intereses de Mora:</b> <span id="emInteresesMora"></span>
                        </div>
                        <div class="">
                            <b>Total Mora</b> <span id="emTotalMora"></span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="">
                            <b>Fecha Calculo Edad:</b> <span id="emFechaEdad"></span>
                        </div>
                        <div class="">
                            <b>Edad:</b> <span id="emEdad"></span>
                        </div>
                        <div class="">
                            <b>Obligación:</b> -
                        </div>
                        <div class="">
                            <b>Total:</b> <span id="emTotal"></span>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card">
                    <div class="card-header card-header-danger p-0">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-items-tab" data-toggle="tab" href="#nav-items" role="tab" aria-controls="nav-items" aria-selected="true">Artículos</a>
                                <a class="nav-item nav-link" id="nav-fees-tab" data-toggle="tab" href="#nav-fees" role="tab" aria-controls="nav-fees" aria-selected="false">Cuotas</a>
                                <a class="nav-item nav-link hide" id="nav-pending-tab" data-toggle="tab" href="#nav-pending" role="tab" aria-controls="nav-pending" aria-selected="false">Pendientes</a>
                                <a class="nav-item nav-link" id="nav-expired-tab" data-toggle="tab" href="#nav-expired" role="tab" aria-controls="nav-expired" aria-selected="false">Vencidas</a>
                                <a class="nav-item nav-link" id="nav-payment-tab" data-toggle="tab" href="#nav-payment" role="tab" aria-controls="nav-payment" aria-selected="false">Abonos</a>
                            </div>
                        </nav>
                        <!-- <h4 class="card-title ">Resumen</h4>
                        <div class="row card-category">
                            <div class="col-md-6 p-0">
                                <span><b>Cliente:</b> VERGARA GALLEGO LUIS HERNEY</span>
                            </div>
                            <div class="col-md-3 p-0">
                                <span><b>Saldo:</b> $295,929</span>
                            </div>
                            <div class="col-md-3 p-0">
                                <span><b>Cupo:</b> $704,071</span>
                            </div>
                        </div> -->
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">
                                <div class="table-responsive c-form-group">
                                    <table id="datatablesItems" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                        <thead class=" text-danger">
                                            <th>Reg</th>
                                            <th>Código</th>
                                            <th>Descripción</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
                                <div class="table-responsive c-form-group">
                                    <table id="datatablesFees" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                        <thead class=" text-danger">
                                            <th>Cuota</th>
                                            <th>Valor</th>
                                            <th>Saldo</th>
                                            <th>Fec Vto</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
                                <div class="table-responsive c-form-group">
                                    <table id="datatablesPending" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                        <thead class=" text-danger">
                                            <th>Cuota</th>
                                            <th>Valor</th>
                                            <th>Fec Vto</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-expired" role="tabpanel" aria-labelledby="nav-expired-tab">
                                <div class="table-responsive c-form-group">
                                    <table id="datatablesExpired" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                        <thead class=" text-danger">
                                            <th>Cuota</th>
                                            <th>Valor</th>
                                            <th>Fec Vto</th>
                                            <th>Días Mora</th>
                                            <th>Intereses</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-payment" role="tabpanel" aria-labelledby="nav-payment-tab">
                                <div class="table-responsive c-form-group">
                                    <table id="datatablesPaymentModal" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                        <thead class=" text-danger">
                                            <th>Cuota</th>
                                            <th>Número</th>
                                            <th>Fecha</th>
                                            <th>Valor</th>
                                            <th>Intereses</th>
                                            <th>Días Mora</th>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                &nbsp;&nbsp; -->
                <button type="button" class="btn btn-danger" data-dismiss="modal">Aceptar</button>
            </div>
        </div>
    </div>
</div>
<!-- / Modal -->


<!-- MODAL PDFS -->
<div class="modal fade" id="pdfsModal" tabindex="-1" role="dialog" aria-labelledby="pdfsModalLabel" aria-hidden="true" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 35px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="pdfsModalLabel">ARCHIVOS FIRMADOS</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" style="padding-top: 0px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col-md-12 pt-0">
                        <div class="card card-pdf m-0">
                            <div class="card-header card-header-danger m-0 p-0" style="border-radius: 0px;">
                                <nav>
                                    <div class="nav nav-tabs p-0" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-autorizacion-tab" data-toggle="tab" href="#nav-autorizacion" role="tab" aria-controls="nav-autorizacion" aria-selected="true">Autorización Reporte Centrales</a>
                                        <a class="nav-item nav-link" id="nav-contrato-tab" data-toggle="tab" href="#nav-contrato" role="tab" aria-controls="nav-contrato" aria-selected="false">Contrato de Fianza</a>
                                        <a class="nav-item nav-link" id="nav-pagare-tab" data-toggle="tab" href="#nav-pagare" role="tab" aria-controls="nav-pagare" aria-selected="false">Pagare de Venta</a>
                                    </div>
                                </nav>
                            </div>
                            <div class="card-body m-0 p-0">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-autorizacion" role="tabpanel" aria-labelledby="nav-autorizacion-tab">
                                        <div class="" style="height:100%;min-height: 60vh;display: grid;">
                                            <embed id="pdfAutorizacion"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-contrato" role="tabpanel" aria-labelledby="nav-contrato-tab">
                                        <div class="" style="height:100%;min-height: 60vh;display: grid;">
                                            <embed id="pdfContrato"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-pagare" role="tabpanel" aria-labelledby="nav-pagare-tab">
                                        <div class="" style="height:100%;min-height: 60vh;display: grid;">
                                            <embed id="pdfPagare"
                                            src=""
                                            type="application/pdf"
                                            width="100%"
                                            style="height:100%;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL PDFS -->

<script>
    var ctrlData = ctrlData || {};
    ctrlData.payments = <?= json_encode($payments) ?>;
    ctrlData.obligations = <?= json_encode($obligations) ?>;
    ctrlData.calls = <?= json_encode($calls) ?>;
    ctrlData.user = <?= json_encode($user) ?>;
</script>
<?= $this->Html->script('crm.js?version='.time(), ['block' => 'scriptBottom']) ?>
