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
<div class="modal fade" id="cambiarClaveModal" tabindex="-1" role="dialog" aria-labelledby="cambiarClaveModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="cambiarClaveModalLabel">Cambiar Clave</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pl-16 pr-16 pb-0">
                <div class="row">
                    <div class="col-md-12">
                        <form id="formChangePass" class="c-form-group" autocomplete="off">
                            <div class="row">
                                <div class="col-md-12">
                                    <label>Clave Actual</label>
                                    <?= $this->Form->password('current_password', ['class' => 'c-field', 'placeholder' => '****']) ?>
                                </div>
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
                                    <p id="msgChangePassword" class="text-danger m-0"></p>
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
                <button type="button" class="btn btn-success" onclick="ctrlChangePass.sendFormChangePass()">Enviar</button>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL CAMBIO DE CLAVE -->
<?= $this->Html->script('cambiar_clave.js', ['block' => 'scriptBottom']) ?>
