<style media="screen">
    #datatablesUsers tr {
        transition: background-color 0.5s ease;
    }
    .dataTables_length{
        padding: 0 20px;
    }
    #datatablesUsers thead{
        background: #e24335;
        color: #fff !important;
        font-weight: 300;
    }
    #datatablesUsers tbody tr{
        cursor: pointer;
    }
    #datatablesUsers thead th{
        padding: 12px !important;
        font-size: 14px !important;
    }
    div.dataTables_wrapper div.dataTables_info{
        padding: 10px 0 15px 20px;
    }
    .wizard-container.custom-wizard .nav-item .nav-link.active {
        background-color: #f44336 !important;
        color: #fff !important;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 5px 6px 7px -5px rgba(0,0,0,.4) !important;
        border-radius: 4px;
    }

    .modal-dialog .card-header.card-header-danger .nav.nav-tabs a.active,
    .modal-dialog .card-header.card-header-danger .nav.nav-tabs a:hover {
        font-weight: 400;
    }

    #formChangePassUser input.secure-red:focus {
        box-shadow: 0 0 5px rgba(244, 67, 54);
        border: 1px solid rgba(244, 67, 54, .8);
    }
    #formChangePassUser input.secure-orange:focus {
        box-shadow: 0 0 5px rgb(255, 134, 0);
        border: 1px solid rgba(255, 134, 0, .8);
    }
    #formChangePassUser input.secure-green:focus {
        box-shadow: 0 0 5px rgb(76, 175, 80);
        border: 1px solid rgba(76, 175, 80, .8);
    }
</style>
<div filter-color="black" style="background-image: url('./img/bg4.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="wizard-container custom-wizard" id="crm">
    <div class="card card-wizard active" data-color="danger" id="wizardCRM">
        <div class="card-header card-header-danger">
            <div class="card-title c-form-group-header">
                <h4 class="">Usuarios</h4>
            </div>
        </div>
        <div class="table-responsive c-form-group p-18" style="padding: 18px;">
            <table id="datatablesUsers" class="table table-striped table-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                <thead class="text-danger">
                    <th>Usuario</th>
                    <th>Cargo</th>
                    <th>Rol</th>
                    <th>Area POS</th>
                    <th>Almacen</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

<style media="screen">
    #formChangePass input.secure-red:focus {
        box-shadow: 0 0 5px rgba(244, 67, 54);
        border: 1px solid rgba(244, 67, 54, .8);
    }
    #formChangePass input.secure-orange:focus {
        box-shadow: 0 0 5px rgb(255, 134, 0);
        border: 1px solid rgba(255, 134, 0, .8);
    }
    #formChangePass input.secure-green:focus {
        box-shadow: 0 0 5px rgb(76, 175, 80);
        border: 1px solid rgba(76, 175, 80, .8);
    }
</style>
<!-- MODAL CAMBIO DE CLAVE -->
<div class="modal fade" id="cambiarClaveUsuarioModal" tabindex="-1" role="dialog" aria-labelledby="cambiarClaveUsuarioModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="cambiarClaveUsuarioModalLabel">Cambiar Clave</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pl-16 pr-16 pb-0">
                <div class="row">
                    <div class="col-md-12">
                        <form id="formChangePassUser" class="c-form-group" autocomplete="off">
                            <?= $this->Form->password('user', ['class' => 'c-field', 'placeholder' => '****', 'type' => 'hidden']) ?>
                            <?= $this->Form->password('current_password', ['class' => 'c-field', 'placeholder' => '****', 'type' => 'hidden']) ?>
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Clave Nueva</label>
                                    <?= $this->Form->password('new_password', ['class' => 'c-field', 'placeholder' => '****']) ?>
                                </div>
                                <div class="col-md-6">
                                    <label>Confirmar Clave Nueva</label>
                                    <?= $this->Form->password('confirm_password', ['class' => 'c-field', 'placeholder' => '****']) ?>
                                </div>
                            </div>
                            <div class="row pt-16 text-center">
                                <div class="col-md-12">
                                    <p id="msgChangePasswordUser" class="text-danger m-0"></p>
                                </div>
                                <div class="col-md-12">
                                    <p class="fs-14 m-0">La clave debe tener minimo 8 caracteres, 1 mayuscula, 1 número y 1 caracter especial. Ejm: Miclave.123*</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer p-8" style="padding: 8px 16px;">
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Cancelar</button>
                &nbsp;&nbsp;
                <button type="button" class="btn btn-success" onclick="iCtrl.sendFormChangePassUser()">Enviar</button>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL CAMBIO DE CLAVE -->


<script>
    var ctrlData = ctrlData || {};
    ctrlData.user = <?= json_encode($user) ?>;
</script>
<?= $this->Html->script('usuarios.js?version='.time(), ['block' => 'scriptBottom']) ?>
<!-- <-?= $this->Html->script('cambiar_clave.js', ['block' => 'scriptBottom']) ?> -->
