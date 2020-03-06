<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */
?>
<!DOCTYPE html>
<html>
    <head>
        <?= $this->Html->charset() ?>
        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title><?= (isset($title_for_layout)) ? $title_for_layout : 'Credimarcas'; ?></title>
        <?= $this->Html->meta('icon') ?>

        <?=
            $this->Html->css(
                [
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons',
                    'https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css',
                    'material-dashboard.css?v=2.1.0',
                    // 'bootstrap-datetimepicker',
                    'main',
                    'helpers',
                    'jquery-ui.min.css',
                    'chat',
                    'dropzone.css'
                ]
            );
        ?>


        <?= $this->fetch('meta') ?>
        <?= $this->fetch('css') ?>

        <script>
            const minuto_inactivo = '<?= $minuto_inactivo ?>' ||  10;
            const milisegundos_inactivo =  1000 * 60 * parseInt(minuto_inactivo);
        </script>
    </head>
    <body class="sidebar-mini">
        <div class="wrapper">
            <!-- Sidebar -->
            <?= $this->element('sidebar') ?>
            <!-- / Sidebar -->
            <div class="main-panel">
                <!-- Navbar -->
                <?= $this->element('navbar') ?>
                <!-- / Navbar -->
                <!-- Content -->
                <div class="content">
                    <div class="container-fluid">
                        <?= $this->fetch('content') ?>
                    </div>
                </div>
                <!-- / Content -->
                <!-- Footer -->
                <?= $this->fetch('footer') ?>
                <!-- / Footer -->
                <!-- Chat -->
                <?= $this->element('chat') ?>
                <!-- / Chat -->
                <!-- Cambiar clave -->
                <?= $this->element('cambiar_clave') ?>
                <!-- / Cambiar clave -->
                <!-- Tasas de Interes -->
                <?= $this->element('tasas_de_interes') ?>
                <!-- / Tasas de Interes -->
                <!-- Div para contenido imprimible -->
                <div id="impresora" style="display:none;"></div>
                <!-- / Div para contenido imprimible -->
            </div>
        </div>
        <?=
            $this->Html->script(
                [
                    'jquery.min.js',
                    'popper.min.js',
                    'bootstrap-material-design.min.js',
                    'perfect-scrollbar.jquery.min.js',
                    'chartist.min.js',
                    'bootstrap-notify.js',
                    'material-dashboard.js?v=2.1.0',
                    'helpers.js?v='.time(),
                    'numeral.min.js',
                    'moment.js',
                    'moment-with-locales.js',
                    'bootstrap-datetimepicker.js',
                    'jquery.dataTables.min.js',
                    'sweetalert.min.js',
                    'jquery.bootstrap-wizard.js',
                    'jquery-ui.min.js',
                    'underscore-min.js',
                    'dropzone.js',
                    'chat.js?version='.time(),
                    'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js',
                    'inativity',
                    // 'wizards.js'
                ]
            )
        ?>
        <script>
            var csrfToken = <?= json_encode($this->request->getParam('_csrfToken')) ?>;
            var urlLogout = <?= json_encode($this->Url->build('/users/logout')) ?>;
        </script>
        <?= $this->fetch('script') ?>
        <?= $this->fetch('scriptBottom') ?>
        <script type="text/javascript">
            var Swal = null;
            $(document).ready(function() {
                Swal = swal;

                $.get("<?= $this->Url->build('/facturaSinFirmar')?>", function( response ) {
                   console.log(response)
                   $('#totalFacturaSinFirma').removeClass('translate')
                   $('#totalFacturaSinFirma').html(`${response.data}`)
                 });
                 
            });
        </script>
    </body>
</html>
