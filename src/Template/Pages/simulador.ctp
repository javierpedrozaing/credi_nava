<style type="text/css">
    .dataTables_length {
        padding: 0 20px;
    }
    #datatablesSimulator_filter {
        padding-right: 20px;
        width: 100%;
    }
    #datatablesSimulator_filter input {
        width: 60%;
        float: right;
    }
    #datatablesSimulator thead {
        background: #e24335;
        color: #fff !important;
        font-weight: 300;
    }
    #datatablesSimulator thead th {
        padding: 12px !important;
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
    div.dataTables_wrapper div.dataTables_info {
        padding: 10px 0 15px 20px;
    }

    #formSimulator input:focus, #formSimulator select:focus, #formSimulator textarea:focus, #formSimulator button:focus {
        box-shadow: 0 0 5px rgb(0, 100, 255);
        border: 1px solid rgba(0, 100, 255, 0.8);
    }
    #formSimulator select.empty {
        color: #bbbbbb;
    }
</style>
<div filter-color="black" style="background-image: url('./img/bg1.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Datos para la simulación</h4>
                <!-- <p class="card-category"> Here is a subtitle for this table</p> -->
            </div>
            <div class="card-body">
                <form id="formSimulator" class="c-form-group" autocomplete="off">
                    <div class="">
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="inlineFormInputName2">Ingrese Valor: &nbsp;</label>
                            </div>
                            <div class="col">
                                <input class="mb-2 mr-sm-2" type="text" name="ammount" value="" onkeypress="return isNumber(event)" onkeyup="formatNumber(event,'$ ', true)" tabindex="1">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="inlineFormInputName2">Tipo de Crédito: &nbsp;</label>
                            </div>
                            <div class="col">
                                <?= $this->Form->select('typeCredit', $typesCreditOptions, ['label' => false, 'class' => 'mb-2 mr-sm-2', 'tabindex' => '2']) ?>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <label class="" for="inlineFormInputName2">Días para la inicial: &nbsp;</label>
                            </div>
                            <div class="col">
                                <span id="daysTypeCredit"></span>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="" style="padding:10px;"></div>
                        </div> -->
                        <div class="row">
                            <div class="col text-right">
                                <button type="" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="(F2)" onclick="iCtrl.resetSimulator()">Limpiar</button>
                                <button type="submit" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="(F4)" tabindex="3">Simular</button>
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
                <h4 class="card-title "><span id="descripcionCredito">Crédito</span></h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Vr. Factura: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="text-danger" id="valorFactura">$0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Vr. Intereses: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="text-danger" id="valorIntereses">$0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class=""><span id="cantidadCuotas">0</span> Cuotas de: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="text-danger" id="cuotasDe">$0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">
                                <p class="">Total a financiar: &nbsp;</p>
                            </div>
                            <div class="col">
                                <p class="text-danger" id="totalFinanciar">$0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="" style="padding:4px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Resultado de la simulación</h4>
                <p class="card-category">Dando click sobre la fila deseada puedes ver mas información</p>
            </div>
            <div class="card-body table-full-width">
                <br/>
                <div class="table-responsive c-form-group">
                    <table id="datatablesSimulator" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
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
    </div>
</div>

<script>
    var ctrlData = ctrlData || {};
    ctrlData.typesCredit = <?= json_encode($typesCredit) ?>;
</script>
<?= $this->Html->script('simulador.js', ['block' => 'scriptBottom']) ?>
