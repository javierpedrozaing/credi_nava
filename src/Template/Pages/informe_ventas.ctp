<style media="screen">
    .date-range {
        width: 304px;
        background-color: #ffffff;
    }
    .date-range .bootstrap-datetimepicker-widget table td.day>div {
        z-index: 1;
    }
</style>

<div style="overflow:hidden;">
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
    </div>
</div>

<div class="row">
    <div class="col-md-12 text-center">
        <button type="button" class="btn btn-danger" onclick="iCtrl.recaudosVentasTirilla()">Recaudos y ventas diarias Tirilla</button>
    </div>

    <?php if($role_usu !== 'ASESOR') { ?>
    <div class="col-md-12 text-center">
        <button type="button" class="btn btn-danger" onclick="iCtrl.getExternalSales()">Recaudos y ventas diarias</button>
    </div>
    <?php } ?>

    <div class="col-md-12 text-center">
        <button type="button" class="btn btn-danger" onclick="iCtrl.getExternalSalesPresent()">Recaudos y ventas diarias cuota regalo</button>
    </div>

    <?php if($role_usu !== 'G_INFORMES') { ?>
        <div class="col-md-12 text-center">
            <button type="button" class="btn btn-danger" onclick="iCtrl.getSellerSales()">Ventas por vendedor</button>
        </div>
    <?php } ?>
</div>

<!-- MODAL PDFS -->
<div class="modal fade" id="pdfsModal" tabindex="-1" role="dialog" aria-labelledby="pdfsModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 35px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="pdfsModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="" style="height:100%;min-height: 60vh;display: grid;">
                    <embed id="pdfGeneric"
                    src=""
                    type="application/pdf"
                    width="100%"
                    style="height:100%;">
                </div>
            </div>
            <div class="modal-footer p-8" style="padding: 8px 16px;">
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL PDFS -->

<script type="text/javascript">
    var role_usu = <?= json_encode($role_usu) ?>;
    var cod_caja = <?= json_encode($cod_caja) ?>;
    var cod_sucursal = <?= json_encode($cod_sucursal) ?>;
</script>
<?= $this->Html->script('informe_ventas.js', ['block' => 'scriptBottom']) ?>
