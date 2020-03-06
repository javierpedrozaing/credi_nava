<style media="screen">
    .carousel-control-next, .carousel-control-prev {background: rgba(0,0,0,0.1);}
    #tasasDeInteresModal .modal-dialog {
        width: 98%;
        height: calc(100vh - 48px);
        padding: 0;
        margin-top: 24px;
        min-width: 640px;
    }
    #tasasDeInteresModal .modal-dialog .modal-content {
        width: 98%;
        height: calc(100vh - 48px);
        padding: 0;
        margin-top: 24px;
        min-width: 640px;
    }
</style>
<!-- MODAL CAMBIO DE CLAVE -->
<div class="modal fade" id="tasasDeInteresModal" tabindex="-1" role="dialog" aria-labelledby="cambiarClaveModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="cambiarClaveModalLabel">Tasas De Interes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" style="overflow: auto;">
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <?= $this->Html->image('slide1.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                        <div class="carousel-item">
                            <?= $this->Html->image('slide2.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                        <div class="carousel-item">
                            <?= $this->Html->image('slide3.jpg', ['class' => 'd-block w-100']); ?>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <!-- <div class="modal-footer p-8" style="padding: 8px 16px;">
                <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">Cancelar</button>
                &nbsp;&nbsp;
                <button type="button" class="btn btn-success" onclick="ctrlChangePass.sendFormChangePass()">Enviar</button>
            </div> -->
        </div>
    </div>
</div>
<!-- / MODAL CAMBIO DE CLAVE -->
<?= $this->Html->script('tasas_de_interes.js', ['block' => 'scriptBottom']) ?>
