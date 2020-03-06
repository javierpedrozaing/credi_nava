<style type="text/css">
    .dataTables_length{
        padding: 0 20px;
    }
    #datatablesRequest_filter{
        padding-right: 20px;
        width: 100%;
    }
    #datatablesRequest_filter input{
        width: 60%;
        float: right;
    }
    #datatablesRequest thead{
        background: #e24335;
        color: #fff !important;
        font-weight: 300;
    }
    #datatablesRequest thead th{
        padding: 12px !important;
    }
    div.dataTables_wrapper div.dataTables_info{
        padding: 10px 0 15px 20px;
    }
</style>
<div filter-color="black" style="background-image: url('./img/bg2.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Filtros de consulta</h4>
                <!-- <p class="card-category"> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> -->
            </div>
            <div class="card-body">
                <form id="formRequest" class="form c-form-group" autocomplete="off">
                    <div class="row">
                        <div class="col col-12 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <label class="" for="inlineFormInputName2">Fecha desde: &nbsp;</label>
                            <input type="text" class="mb-2 mr-sm-2" id="dateFrom" placeholder="" name="dateFrom">
                        </div>
                        <div class="col col-12 col-lg-2 col-md-2 col-sm-6 col-xs-12">
                            <label class="" for="inlineFormInputName2">Hasta: &nbsp;</label>
                            <input type="text" class="mb-2 mr-sm-2" id="dateTo" placeholder="" name="dateTo">
                        </div>
                        <div class="col col-12 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="" for="inlineFormInputName2">Cédula: &nbsp;</label>
                            <span class="i-search">
                                <input id="fcc" type="text" class="mb-2 mr-sm-2" placeholder="Buscar por cédula ó nombres" onkeyup="iCtrl.searchClients()" name="cc">
                                <span class="b-search pointer" onclick="$('#formRequest').submit()"><i class="material-icons">search</i></span>
                            </span>
                        </div>
                        <div class="col col-12 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <label class="" for="inlineFormCustomSelect">Tipo de Cliente: &nbsp;</label>
                            <select class="mb-2 mr-sm-2" name="typeClient">
                                <option selected value="%">Todos</option>
                                <option value="N">Nuevo</option>
                                <option value="A">Actual</option>
                                <option value="I">Inactivo</option>
                            </select>
                        </div>
                        <div class="col col-12 col-lg-2 col-md-2 col-sm-6 col-xs-12 text-right">
                            <br>
                            <button type="submit" class="btn btn-danger mb-2 ugly-field-button">Consultar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header card-header-danger">
                <h4 class="card-title ">Solicitudes realizadas</h4>
                <div class="card-category">
                    <!-- <button class="btn btn-default btn-sm request-filter all" data-ftype="all" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'all')">
                        Todas(14)
                    </button> -->
                    <button class="btn btn-danger btn-sm request-filter pending button-filter-disabled" data-ftype="pending" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'pending')">
                        Pendientes(<span id="countPending">0</span>)
                    </button>
                    <button class="btn btn-warning btn-sm request-filter transit button-filter-disabled" data-ftype="transit" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'transit')">
                        En trámite(<span id="countTransit">0</span>)
                    </button>
                    <button class="btn btn-success btn-sm request-filter approved button-filter-disabled" data-ftype="approved" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'approved')">
                        Aprobadas(<span id="countApproved">0</span>)
                    </button>
                    <button class="btn btn-primary btn-sm request-filter refused button-filter-disabled" data-ftype="refused" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'refused')">
                        Negadas(<span id="countRefused">0</span>)
                    </button>
                    <button class="btn btn-default btn-sm request-filter attended" data-ftype="attended" type="button" name="button" onclick="iCtrl.toggleFilterRequest(this, 'attended')">
                        Atendidas(<span id="countAttended">0</span>)
                    </button>
                </div>
                <!-- <p class="card-category"> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> -->
            </div>
            <div class="card-body table-full-width">
                <br/>
                <div class="table-responsive c-form-group">
                    <table id="datatablesRequest" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                        <thead class="text-danger">
                            <th>Cliente</th>
                            <th>Nombre &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th style="width: 5%;">Fecha <br>envío</th>
                            <th>Estado</th>
                            <th style="width: 5%;">Fecha <br>aprobación</th>
                            <th>Usuario <br>Callcenter</th>
                            <th style="width: 5%;">Cupo <br>Disponible</th>
                            <th>Resultado</th>
                            <th>Nota <br>Resultado</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<a href="./pages/nueva_solicitud" class="button-float hide">
    <i class="material-icons my-float">add</i>
</a>

<?= $this->Html->script('solicitudes.js', ['block' => 'scriptBottom']) ?>

<style media="screen">
    .bootstrap-datetimepicker-widget {
        top: 0px !important;
    }
</style>
