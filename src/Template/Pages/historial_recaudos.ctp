<style media="screen">
    .date-range {width: 304px; background-color: #ffffff; }
    .date-range .bootstrap-datetimepicker-widget table td.day>div {z-index: 1; }
    div.content {padding-top: 16px !important; }
    .datepicker {color: rgba(80,80,80); }
    .container-calendar {float: right; position: relative; width: max-content; }
    .container-calendar .content-calendar {background: #f0f0f0; border-radius: 4px; box-shadow: 2px 2px 8px 2px rgba(80,80,80,.35); display: none; overflow: hidden; padding: 0px 4px; position: absolute; z-index: 99; right: 100%; top: 100%; }
    .container-calendar .content-calendar.active {display: block; min-width: 656px; }
</style>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger p-0">
                <div class="row">
                    <div class="col col-8">
                        <h4 class="card-title p-15">Historial De Recaudos</h4>
                    </div>
                    <div class="col col-4 text-right">
                        <div class="container-calendar" style="padding: 4px;">
                            <button id="buttonCalendar" type="button" name="button" class="btn btn-danger button-radio-full-screen pointer" onclick="iCtrl.toggleCalendar()" data-toggle="tooltip" data-placement="top" title="Filtro de fechas" style="box-shadow: none;">
                                Filtro Fecha
                                <i class="material-icons" style="line-height: 1.5;">today</i>
                            </button>
                            <div id="contentCalendar" class="content-calendar" style="overflow:hidden;">
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="pull-right">
                                                <div id="dateFrom" class="date-range"></div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div>
                                                <div id="dateTo" class="date-range"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 text-right pt-8">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="iCtrl.getHistorySales(); iCtrl.toggleCalendar()">Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <br/>
                <div class="table-responsive c-form-group">
                    <table id="datatablesHistorySales" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class=" text-danger">
                            <th style="width: 13%;">Fecha</th>
                            <th style="width: 13%;">Documento</th>
                            <th style="width: 13%;">Vr Factura</th>
                            <th style="width: 13%;">NIT</th>
                            <th style="width: 35%;">Cliente</th>
                            <th style="width: 5%;">Imp.</th>
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
    ctrlData.requestPayments = <?= json_encode($requestPayments) ?>;
</script>
<?= $this->Html->script('historial_recaudos.js', ['block' => 'scriptBottom']) ?>
