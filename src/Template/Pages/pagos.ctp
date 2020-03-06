<style type="text/css">
    input[readonly] {background-color: #f6f6f6; }
    #search_cli{padding: 30px 0px 0px 15px; display: block; }
    .head-credi{background: #e24335; color: #fff; font-weight: 700;}
    .head-credi th{text-align: center;}
    .pagoTabla{width: 100%;}
    #no-data h3{text-align: center;padding: 10px;}
    #datatablesItems thead th{text-align: center;}
    .c-field{margin-bottom: 2px;}
    .f_lbl{padding: 6px 0 6px 40px !important;display: block;color: 484848;}
    .card .card-header.card-header-icon .card-title{float: left;width: 50%;}
    #btn_update_payment{}
    #datatablesItems thead th {font-size: 15px; padding: 5px; }
    #datatablesItems td {padding: 6px;}
    .cont-modal{width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); z-index: 9998; position: fixed; top: 0; left: 0;}
    .modal-pagos{width: 990px; height: 698px; max-height: 100vh; background: #fff; position: fixed; top: 0; z-index: 999999; left: calc(50% - 495px);border-radius: 4px;}
    .modal-pagos .modal-body{padding: 5px 15px;}
    .modal-pagos hr{margin: 10px 0 5px;}
    .modal-pagos .c-form-group input, .modal-pagos .c-form-group select, .modal-pagos .c-form-group textarea, .modal-pagos .c-form-group .form-control {font-size: 12px !important;}
    .modal-pagos .table-responsive{height: 240px;}
    .modal-pagos .table-responsive table {width: 99.9%;font-size: 13px;}
    .modal-pagos .nav-item{padding: 6px 12px;font-size: 14px;}
    .chk-pagos{padding-top: 10px;}
    .chk-pagos label {color: #404040;}
    .nav-tabs{padding: 0;}
    #num_cuotas{padding-top: 20px; padding-left: 3px; font-size: 14px;}
</style>
<div filter-color="black" style="background-image: url('./img/bg6.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
             <div class="card-header card-header-danger">
                <h4 class="card-title ">Pagos y Abonos</h4>
            </div>
            <div class="card-body">
                <div class="row c-form-group">
                    <div class="col-md-4" style="padding-right: 0">
                        <label>Cliente: </label>
                        <span class="i-search"><input type="text" name="cod_cli" class="c-field" id="cod_cli" placeholder="Buscar por cédula ó (apellidos + nombres)"><span class="b-search pointer" onclick="searchClients(); messageSearchClient = true;"><i class="material-icons" style="color: #f59e9c;">search</i></span></span>
                    </div>
                    <div class="col-md-5">
                        <label>&nbsp;</label>
                        <input type="text" name="nom_cli" class="c-field nom_cli" readonly="readonly">
                    </div>
                    <div class="col-md-3">
                        <label>Saldo: </label>
                        <input type="text" name="cup_cli" class="c-field text-danger cup_cli" readonly="readonly" style="text-align:right;" />
                    </div>
                </div>
            </div>
        </div>

        <div class="card" id="cont-credi" style="display: none;">
            <div class="card-header card-header-icon card-header-danger">
                <div class="card-icon">
                    <i class="material-icons">assignment</i>
                </div>
                <h4 class="card-title ">Créditos activos</h4>
                <a href="javascript:updatePayments()" class="btn btn-danger pull-right" id="btn_update_payment"><i class="material-icons">refresh</i> Actualizar</a>
            </div>
            <div class="card-body table-full-width">
                <div id="no-data">
                    <h3 class="card-title">El cliente no tiene créditos pendientes</h3>
                </div>
                <br/>
                <div class="table-responsive" id="table-credi">
                    <table class="table table-striped ">
                        <thead class="head-credi">
                            <th></th>
                            <th>Almacen</th>
                            <th>Fecha</th>
                            <th>Nº Factura</th>
                            <th>Prefijo</th>
                            <th>Condición</th>
                            <th>Valor Cuota</th>
                            <th>Valor Total</th>
                            <th>Abono</th>
                            <th>Saldo Pendiente (Capital)</th>
                            <th>Cuotas en Mora</th>
                            <th>Días en Mora</th>
                            <th>Capital en Mora</th>
                            <th>Pago</th>
                        </thead>
                        <tbody id="data-credi" class="table-bordered table-striped table-hover"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->

<div class="cont-modal" style="display: none;">
    <div class="modal-pagos">
        <div class="modal-header bg-black">
            <h5 class="modal-title cl-black" id="pagosModalLabel">ABONO CRÉDITOS</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick="closeModal()">
                <span class="cl-black" aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-2">
                    <div class="chk-pagos">
                        <input type="checkbox" tabindex="-1" class="chk-p" id="chk-todas" name="chk-todas" data-chk="todas" />
                        <label for="chk-todas">Marcar Todas</label>
                    </div>
                    <div class="chk-pagos">
                        <input type="checkbox" tabindex="-1" class="chk-p" id="chk-vencidas" name="chk-vencidas" data-chk="vencidas" />
                        <label for="chk-vencidas">Solo Vencidas</label>
                    </div>
                    <div class="chk-pagos">
                        <input type="checkbox" tabindex="-1" class="chk-p" id="chk-desmarcar" name="chk-desmarcar" data-chk="desmarcar" />
                        <label for="chk-desmarcar">Desmarcar Cuotas</label>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="row c-form-group">
                        <div class="col-md-3" style="padding-right: 0">
                            <label>Cliente: </label>
                            <input type="text" name="cod_cli" class="c-field cod_cli" readonly="readonly">
                        </div>
                        <div class="col-md-6">
                            <label>&nbsp;</label>
                            <input type="text" name="nom_cli" class="c-field nom_cli" readonly="readonly">
                        </div>
                        <div class="col-md-3">
                            <label>Saldo: </label>
                            <input type="text" name="cup_cli" class="c-field text-danger cup_cli" readonly="readonly" style="text-align:right;" />
                        </div>
                    </div>
                    <hr>
                    <div class="row c-form-group">
                        <div class="col-md-4" style="padding-right: 0">
                            <label>Subtotal: </label>
                            <input type="text" name="Subtotal" id="subtotal" class="c-field" readonly="readonly" style="text-align:right;" />
                        </div>
                        <div class="col-md-4">
                            <label>Descuentos:</label>
                            <input type="text" name="nom_cli" id="descuentos" class="c-field" readonly="readonly" style="text-align:right;" />
                        </div>
                        <div class="col-md-4">
                            <label>Total Pago: </label>
                            <input type="text" name="cup_cli" id="total_pagos" class="c-field" readonly="readonly" style="text-align:right;" />
                        </div>
                    </div>
                </div>
            </div>

            <hr>
            <div class="table-full-width">
                <div class="card-header card-header-danger p-0">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-items-tab" data-toggle="tab" href="#nav-items" role="tab" aria-controls="nav-items" aria-selected="true">Cuotas Pendientes</a>
                            <!-- <a class="nav-item nav-link" id="nav-fees-tab" data-toggle="tab" href="#nav-fees" role="tab" aria-controls="nav-fees" aria-selected="false">Saldos por Almacén</a> -->
                        </div>
                    </nav>
                </div>
                <div class="table-full-width">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">
                            <div class="table-responsive c-form-group">
                                <table id="datatablesItems" class="table table-striped">
                                    <thead class="head-credi">
                                        <th style="width:4%;"></th>
                                        <th>Pago</th>
                                        <th>Número</th>
                                        <th>Condición</th>
                                        <th>Fec. Venc.</th>
                                        <th>Vr Cuota</th>
                                        <th>Saldo</th>
                                        <th># Cuota</th>
                                        <th>Días V.</th>
                                        <th>Interés</th>
                                        <th>Iva. Int</th>
                                        <th>Total</th>
                                    </thead>
                                    <tbody class="table-bordered table-striped table-hover" id="table_det_credi"></tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-fees" role="tabpanel" aria-labelledby="nav-fees-tab">
                            <div class="table-responsive c-form-group">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="row c-form-group">
                <div class="col-md-4">
                    <label>Forma de Pago: </label>
                    <select class="payment">
                        <option value="01">EFECTIVO</option>
                    </select>
                    <p id="num_cuotas"><span>0</span> cuota(s) seleccionada(s)</p>
                </div>
                <div class="col-md-3">
                    <label>Valor Pagado: </label>
                    <input type="text" name="valor_p" id="valor_p" class="c-field" style="text-align:right;" onkeypress="return isNumber(event)" onkeyup="valorPagado(event);formatNumber(event,'$',true);">
                </div>
                <div class="col-md-2">
                    <label class="f_lbl">Valor Abono:</label>
                    <label class="f_lbl">Valor Pagado:</label>
                    <label class="f_lbl">Cambio:</label>
                </div>
                <div class="col-md-3">
                    <input type="text" name="valor_abono" id="valor_abono" class="c-field" style="text-align:right;" readonly="readonly">
                    <input type="text" name="valor_pagado" id="valor_pagado" class="c-field" style="text-align:right;" readonly="readonly" value="$0">
                    <input type="text" name="cambio" id="cambio" class="c-field text-danger" style="text-align:right;" readonly="readonly" value="$0">
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" onClick="closeModal()">Cancelar</button>
            &nbsp;&nbsp;
            <button type="button" class="btn btn-danger" onClick="sendPayments()">Aceptar</button>
        </div>
    </div>
</div>
<!-- / Modal -->
<script>
    var company = <?= json_encode($company) ?>;
    var fecha_descuento = '<?= $fecha_descuento ?>';
    var externo = <?= $externo; ?>;
    var externo_pago = <?= $externo_pago; ?>;
    var externo_cod_cli = '<?= $externo_cod_cli; ?>';
    var externo_id_transaccion = <?= $externo_id_transaccion; ?>;
</script>

<?= $this->Html->script('pagos.js?version='.time(), ['block' => 'scriptBottom']) ?>
