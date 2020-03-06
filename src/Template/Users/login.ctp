<div class="wrapper wrapper-full-page">
    <div class="page-header login-page header-filter" filter-color="black" style="background-image: url('../img/bg8.jpg'); background-size: cover; background-position: top center;">
        <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
        <div class="container">
            <div class="col-lg-4 col-md-6 col-sm-6 ml-auto mr-auto">
            	<?= $this->Form->create(); ?>

                    <div class="card card-login">
                        <div class="card-header card-header-danger text-center">
                            <h4 class="card-title">Login</h4>
                            <?= $this->Flash->render() ?>
                        </div>
                        <div class="card-body ">
                            <p class="card-description text-center">Estamos cambiando para tí</p>
                            <span class="bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">face</i>
                                        </span>
                                    </div>
                                    <?= $this->Form->text('usuario', ['label' => false, 'class' => 'form-control', 'placeholder' => 'Usuario', 'templates' => ['inputContainer' => false]]); ?>
                                </div>
                            </span>
                            <span class="bmd-form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">lock_outline</i>
                                        </span>
                                    </div>
                                    <?= $this->Form->password('clave', ['label' => false, 'class' => 'form-control', 'placeholder' => 'Contraseña', 'templates' => ['inputContainer' => false]]); ?>
                                </div>
                            </span>
                        </div>
                        <div class="card-footer justify-content-center">
                        	<?= $this->Form->button('Ingresar', ['class' => 'btn btn-danger btn-link btn-lg']); ?>
                        </div>
                    </div>
                <?= $this->Form->end(); ?>
            </div>
        </div>

        <footer class="footer" >
            <div class="container">
                <div class="copyright float-right">
                    &copy;
                    <script>
                        document.write(new Date().getFullYear())
                    </script> - Todos los derechos reservados, 
                    <a href="http://www.navacom.com.co/" target="_blank">Soluciones Navacom</a>.
                </div>
            </div>
        </footer>
    </div>
</div>
