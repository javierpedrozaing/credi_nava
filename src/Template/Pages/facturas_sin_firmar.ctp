<style media="screen">
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
</style>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Facturas Sín Firmar</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive c-form-group">
                    <table id="datatablesPdfsWithoutSign" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class=" text-danger">
                            <th>Reg</th>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Fecha</th>
                            <th>Factura</th>
                            <th>Codeudor</th>
                            <th>Firmar</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- MODAL PDFS -->
<div class="modal fade" id="pdfsModal" tabindex="-1" role="dialog" aria-labelledby="pdfsModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 5px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="pdfsModalLabel">APLICACIÓN BIOMETRICA</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col pb-8">
                        <div class="card m-0">
                            <div class="card-body">
                                <div class="row p-16 tag-modal-pdf">
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
        </div>
    </div>
</div>
<!-- / MODAL PDFS -->

<script>
    var ctrlData = ctrlData || {};
    ctrlData.invoicesWithoutSign = <?= json_encode($invoicesWithoutSign) ?>;
</script>
<?= $this->Html->script('facturas_sin_firmar.js', ['block' => 'scriptBottom']) ?>
