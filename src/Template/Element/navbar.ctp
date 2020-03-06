<style type="text/css">
    .ni{background: rgba(0,0,0,0.75); color: #fff; padding: 8px 0px; margin: 0 2px; height: 54px; line-height: 24px; font-size: 16px; display: block;}
    .ni a{font-size: 13px !important;}
</style>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
    <div class="container-fluid">
        <div class="navbar-wrapper">
            <button id="minimizeSidebar" class="btn btn-just-icon btn-white btn-fab btn-round">
                <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
                <div class="ripple-container"></div>
            </button>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
                <li class="nav-item ni">
                    <a class="nav-link" href="#" data-toggle="modal" data-target="#tasasDeInteresModal">
                        <i class="material-icons">description</i> Tasas De Interes
                    </a>
                </li>
                <li class="nav-item ni">
                    <a class="nav-link" href="javascript:void(0)">
                        <i class="material-icons">business</i> <?= $this->request->getSession()->read('Auth.User.sucursal') ?>
                    </a>
                </li>
                <li class="nav-item ni">
                    <a class="nav-link" href="javascript:void(0)">
                        <i class="material-icons">print</i> Caja: <?= $this->request->getSession()->read('Auth.User.cod_caja') ?> | <?= $this->request->getSession()->read('Auth.User.nombre_caja') ?>
                    </a>
                </li>
                <li class="nav-item ni dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="material-icons">person</i> <?= $this->request->getSession()->read('Auth.User.cod_usu')/*$this->Auth->user('cod_usu')*/ ?>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <!-- <a class="dropdown-item" href="#">Perfil</a>
                        <a class="dropdown-item" href="#">Configuración</a>
                        <a class="dropdown-item" href="#">Otro Item</a>
                        <a class="dropdown-item" href="#">No Sobra</a>
                        <div class="dropdown-divider"></div> -->
                        <a class="dropdown-item" href="#" data-toggle="modal" data-target="#cambiarClaveModal">Cambiar Clave</a>
                        <?= $this->Html->link('Salir', ['controller' => 'users', 'action' => 'logout'], ['class' => 'dropdown-item']) ?>
                    </div>
                </li>
                <!-- your navbar here -->
            </ul>
        </div>
    </div>
</nav>
<!-- End Navbar -->
<script>
    var auxUser = <?= json_encode($this->request->getSession()->read('Auth.User.cod_usu')) ?>;
</script>
