<style type="text/css">
    input[readonly] {background-color: #f6f6f6; }
    #search_cli{padding: 30px 0px 0px 15px; display: block; }
    .head-credi{background: #e24335; color: #fff; font-weight: 700;}
    .head-credi th{text-align: center;}
    .pagoTabla{width: 100%;}
    #no-data h3{text-align: center;padding: 10px;}
    #datatablesItems thead th{text-align: center;}
    .c-field{margin-bottom: 2px;}
    .f_lbl{padding: 10px 0 10px 40px !important;display: block;color: 484848;}
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
    input[type=radio], input[type=checkbox] {width: 20px !important;}
</style>
<div filter-color="black" style="background-image: url('./img/bg6.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
             <div class="card-header card-header-danger">
                <h4 class="card-title ">Reimpresión de documentos</h4>
            </div>
            <div class="card-body">
                <div class="row c-form-group">
                    <div class="col-md-2">
                        <label>Tipo de documento: </label>
                        <input type="radio" name="type_doc" value="factura" checked="checked"><span> Factura</span>
                        <input type="radio" name="type_doc" value="recibo"><span> Recibo</span>
                    </div>
                    <div class="col-md-6" style="padding-right: 0">
                        <label>Número de Documento: </label>
                        <input type="text" name="num_doc" class="c-field" id="num_doc">
                    </div>
                </div>
            </div>
        </div> 
    </div>
</div>
<?= $this->Html->script('reimpesion.js', ['block' => 'scriptBottom']) ?>