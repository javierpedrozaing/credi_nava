<?php $action = $this->request->getParam('action'); ?>
<!-- Sidebar -->
<div class="sidebar" data-color="danger" data-background-color="black">
    <!-- Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger" -->
    <!-- Tip 2: you can also add an image using data-image tag-->
    <div class="logo">
        <a href="#" class="simple-text logo-mini">
            CM
        </a>
        <a href="#" class="simple-text logo-normal">
            CREDIMARCAS 
        </a>
    </div>

    <div class="sidebar-wrapper">
        <ul class="nav">
            <li class="nav-item <?= ($action == 'home') ? 'active' : ''; ?>">
                <?= $this->Html->link('<i class="material-icons">dashboard</i><p>Dashboard</p>', ['controller' => 'Pages', 'action' => 'home'], ['escape' => false, 'class' => 'nav-link']) ?>
            </li>
            <?php if ($role_usu !== 'G_INFORMES') { ?>
                <li class="nav-item <?= ($action == 'nuevaSolicitud') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">touch_app</i><p>Solicitud de Crédito</p>', ['controller' => 'Pages', 'action' => 'nuevaSolicitud'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?>
            <?php if ($role_usu !== 'G_INFORMES') { ?>
                <li class="nav-item <?= ($action == 'solicitudes') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">ballot</i><p>Consulta de Solicitudes</p>', ['controller' => 'Pages', 'action' => 'solicitudes'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?> 
            <?php if($role_usu !== 'G_INFORMES') { ?>
                <li class="nav-item <?= ($action == 'simulador') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">dialpad</i><p>Simulador</p>', ['controller' => 'Pages', 'action' => 'simulador'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?>
            <li class="nav-item <?= ($action == 'crm') ? 'active' : ''; ?>">
                <?= $this->Html->link('<i class="material-icons">assignment_ind</i><p>Estado de Cuenta</p>', ['controller' => 'Pages', 'action' => 'crm'], ['escape' => false, 'class' => 'nav-link']) ?>
            </li>
            <?php if($role_usu !== 'ASESOR'  && $role_usu !== 'POS') { ?>
            <li class="nav-item <?= ($action == 'facturacion') ? 'active' : ''; ?>">
                <a class="nav-link" data-toggle="collapse" href="#facturacionSub" aria-expanded="false">
                    <i class="material-icons">monetization_on</i>
                    <p>Obligación<b class="caret"></b></p>
                </a>
                <div class="collapse" id="facturacionSub" style="">
                    <ul class="nav">
                        <?php if ($role_usu !== 'G_INFORMES' && $role_usu !== 'CAJA_WEB' && $web_service !== 1) { ?>
                            <li class="nav-item">
                                <?= $this->Html->link('<span class="sidebar-mini"> F </span><span class="sidebar-normal"> Obligación </span>', ['controller' => 'Pages', 'action' => 'facturacion'], ['escape' => false, 'class' => 'nav-link']) ?>
                            </li>
                        <?php } ?>
                        <li class="nav-item">
                            <?= $this->Html->link('<span class="sidebar-mini"> HV </span><span class="sidebar-normal"> Historial De Obligaciones </span>', ['controller' => 'Pages', 'action' => 'historialVentas'], ['escape' => false, 'class' => 'nav-link']) ?>
                        </li>
                        <?php if ($web_service !== 1) { ?>
                            <li class="nav-item">
                                <?= $this->Html->link('<span class="sidebar-mini"> FSF </span><span class="sidebar-normal"> Obligaciones Sin Firmar(<span id="totalFacturaSinFirma" class="translate"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></span>)</span>', ['controller' => 'Pages', 'action' => 'facturasSinFirmar'], ['escape' => false, 'class' => 'nav-link']) ?>
                            </li>
                        <?php } ?>
                    </ul>
                </div>
            </li>
            <?php } ?>
            <?php if($role_usu !== 'ASESOR' && $role_usu !== 'POS') { ?>
                <?php if ($role_usu !== 'G_INFORMES' && $role_usu !== 'CAJA_WEB' && $web_service !== 1) { ?>
                    <li class="nav-item <?= ($action == 'pagos') ? 'active' : ''; ?>">
                        <?= $this->Html->link('<i class="material-icons">local_atm</i><p>Módulo de Pagos</p>', ['controller' => 'Pages', 'action' => 'pagos'], ['escape' => false, 'class' => 'nav-link']) ?>
                    </li>
                <?php } ?>
                <li class="nav-item <?= ($action == 'historialRecaudos') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">local_atm</i><p>Historial de Pagos</p>', ['controller' => 'Pages', 'action' => 'historialRecaudos'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?>
            <?php if($role_usu !== 'ASESOR') { ?>
                <li class="nav-item <?= ($action == 'informeVentas') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">bar_chart</i><p>Informe Ventas</p>', ['controller' => 'Pages', 'action' => 'informeVentas'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?>
            <?php if($role_usu !== 'G_INFORMES' && $role_usu !== 'ASESOR') { ?>
                <li class="nav-item <?= ($action == 'reimpresionDocumentos') ? 'active' : ''; ?>">
                    <?= $this->Html->link('<i class="material-icons">print</i><p>Reimpresión</p>', ['controller' => 'Pages', 'action' => 'reimpresionDocumentos'], ['escape' => false, 'class' => 'nav-link']) ?>
                </li>
            <?php } ?>
            <?php if($role_usu == 'G_SISTEMAS') { ?>
            <li class="nav-item <?= ($action == 'usuarios') ? 'active' : ''; ?>">
                <?= $this->Html->link('<i class="material-icons">group</i><p>Usuarios</p>', ['controller' => 'Pages', 'action' => 'usuarios'], ['escape' => false, 'class' => 'nav-link']) ?>
            </li>
            <?php } ?>

            <!-- your sidebar here -->
        </ul>


        <div id="version" style='position: absolute; bottom: 0; color:#FFF; text-align:center; width:100%'></div>

    </div>
    <div class="sidebar-background" style="background-image: url('<?php echo $this->Url->image('sidebar-cf.jpg') ?>') "></div>
</div>
<!-- / Sidebar -->
