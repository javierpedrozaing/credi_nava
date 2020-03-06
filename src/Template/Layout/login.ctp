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
    <title><?= $this->fetch('title') ?></title>
    <?= $this->Html->meta('icon') ?>

    <?= 
        $this->Html->css(
            [
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons',
                'https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css',
                'material-dashboard.css?v=2.1.0',
                'main'
            ]
        ); 
    ?>


    <?= $this->fetch('meta') ?>
    <?= $this->fetch('css') ?>
</head>
<body>
    <?= $this->fetch('content') ?>
    <?=
        $this->Html->script(
            [
                'jquery.min.js',
                'popper.min.js',
                'bootstrap-material-design.min.js',
                'perfect-scrollbar.jquery.min.js',
                'chartist.min.js',
                'bootstrap-notify.js',
                'material-dashboard.min.js?v=2.1.0',
                'helpers.js',
                'numeral.min.js'
            ]
        )
    ?>
    <?= $this->fetch('script') ?>
</body>
</html>
