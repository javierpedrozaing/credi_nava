<?php

/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */

use Cake\Core\Plugin;
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;
use Cake\Routing\Route\DashedRoute;

/**
 * The default class to use for all routes
 *
 * The following route classes are supplied with CakePHP and are appropriate
 * to set as the default:
 *
 * - Route
 * - InflectedRoute
 * - DashedRoute
 *
 * If no call is made to `Router::defaultRouteClass()`, the class used is
 * `Route` (`Cake\Routing\Route\Route`)
 *
 * Note that `Route` does not do any inflections on URLs which will result in
 * inconsistently cased URLs when used with `:plugin`, `:controller` and
 * `:action` markers.
 *
 * Cache: Routes are cached to improve performance, check the RoutingMiddleware
 * constructor in your `src/Application.php` file to change this behavior.
 *
 */
Router::defaultRouteClass(DashedRoute::class);

Router::scope('/', function (RouteBuilder $routes) {
    /**
     * Here, we are connecting '/' (base path) to a controller called 'Pages',
     * its action called 'display', and we pass a param to select the view file
     * to use (in this case, src/Template/Pages/home.ctp)...
     */
    $routes->connect('/', ['controller' => 'Pages', 'action' => 'home']);
    $routes->connect('/simulador', ['controller' => 'Pages', 'action' => 'simulador']);
    $routes->connect('/solicitudes', ['controller' => 'Pages', 'action' => 'solicitudes']);
    $routes->connect('/solicitud-de-credito', ['controller' => 'Pages', 'action' => 'nuevaSolicitud']);
    $routes->connect('/nuevaSolicitud', ['controller' => 'Pages', 'action' => 'nuevaSolicitud']);
    $routes->connect('/crm', ['controller' => 'Pages', 'action' => 'crm']);
    $routes->connect('/crmItems', ['controller' => 'Pages', 'action' => 'crmItems']);
    $routes->connect('/buscarCliente', ['controller' => 'Pages', 'action' => 'buscarCliente']);
    $routes->connect('/validarCliente', ['controller' => 'Pages', 'action' => 'validarCliente']);
    $routes->connect('/validarClienteIntegracion', ['controller' => 'Pages', 'action' => 'validarClienteIntegracion']);
    $routes->connect('/validarCall', ['controller' => 'Pages', 'action' => 'validarCall']);
    $routes->connect('/guardarVidente', ['controller' => 'Pages', 'action' => 'guardarVidente']);
    $routes->connect('/finalizarVidente', ['controller' => 'Pages', 'action' => 'finalizarVidente']);
    $routes->connect('/obligacion', ['controller' => 'Pages', 'action' => 'facturacion']);
    $routes->connect('/historialVentas', ['controller' => 'Pages', 'action' => 'historialVentas']);
    $routes->connect('/historialRecaudos', ['controller' => 'Pages', 'action' => 'historialRecaudos']);
    $routes->connect('/facturasSinFirmar', ['controller' => 'Pages', 'action' => 'facturasSinFirmar']);
    $routes->connect('/totalFacturasSinFirmar', ['controller' => 'Pages', 'action' => 'totalFacturasSinFirmar']);
    $routes->connect('/imprimirFactura', ['controller' => 'Pages', 'action' => 'imprimirFactura']);
    $routes->connect('/imprimirPago', ['controller' => 'Pages', 'action' => 'imprimirPago']);
    $routes->connect('/consultaFactura', ['controller' => 'Pages', 'action' => 'consultaFactura']);
    $routes->connect('/informeVentas', ['controller' => 'Pages', 'action' => 'informeVentas']);
    $routes->connect('/pdfInformeVentas', ['controller' => 'Pages', 'action' => 'pdfInformeVentas']);
    $routes->connect('/pagos', ['controller' => 'Pages', 'action' => 'pagos']);
    $routes->connect('/historiaCliente', ['controller' => 'Pages', 'action' => 'historiaCliente']);
    $routes->connect('/actualizarSolicitudCredito', ['controller' => 'Pages', 'action' => 'actualizarSolicitudCredito']);
    $routes->connect('/subirCedulas', ['controller' => 'Pages', 'action' => 'subirCedulas']);
    $routes->connect('/pdfSolicitud', ['controller' => 'Pages', 'action' => 'pdfSolicitud']);
    $routes->connect('/enviarFirma', ['controller' => 'Pages', 'action' => 'enviarFirma']);
    $routes->connect('/eliminarFirma', ['controller' => 'Pages', 'action' => 'eliminarFirma']);
    $routes->connect('/enviarFirmaManual', ['controller' => 'Pages', 'action' => 'enviarFirmaManual']);
    $routes->connect('/firmarPdf', ['controller' => 'Pages', 'action' => 'firmarPdf']);
    $routes->connect('/consultarFirma', ['controller' => 'Pages', 'action' => 'consultarFirma']);
    $routes->connect('/guardarFirma', ['controller' => 'Pages', 'action' => 'guardarFirma']);
    $routes->connect('/validarEstudio', ['controller' => 'Pages', 'action' => 'validarEstudio']);
    $routes->connect('/consultarPagos', ['controller' => 'Pages', 'action' => 'consultarPagos']);
    $routes->connect('/enviarPagos', ['controller' => 'Pages', 'action' => 'enviarPagos']);
    $routes->connect('/archivosCrm', ['controller' => 'Pages', 'action' => 'archivosCrm']);
    $routes->connect('/actualizarContrasena', ['controller' => 'Pages', 'action' => 'actualizarContrasena']);
    $routes->connect('/reimpresionDocumentos', ['controller' => 'Pages', 'action' => 'reimpresionDocumentos']);
    $routes->connect('/actualizarArchivoCelIntegracion', ['controller' => 'Pages', 'action' => 'actualizarArchivoCelIntegracion']);
    $routes->connect('/huellaRegistroEstado', ['controller' => 'Pages', 'action' => 'huellaRegistroEstado']);
    $routes->connect('/huellaValidaEstado', ['controller' => 'Pages', 'action' => 'huellaValidaEstado']);
    $routes->connect('/usuarios', ['controller' => 'Pages', 'action' => 'usuarios']);

    $routes->connect('/api/externos/facturacion', ['controller' => 'Users', 'action' => 'facturacion_externos']);
    $routes->connect('/api/externos/facturacion/:token', ['controller' => 'Users', 'action' => 'facturacion_externos'], ['pass' => ['token']]);

    $routes->connect('/api/externos/recaudosExternos', ['controller' => 'Users', 'action' => 'recaudosExternos']);
    $routes->connect('/api/externos/recaudosExternos/:token', ['controller' => 'Users', 'action' => 'recaudosExternos'], ['pass' => ['token']]);

    $routes->connect('/facturaSinFirmar', ['controller' => 'Pages', 'action' => 'facturaSinFirmar']);


    $routes->connect('/datacredito', ['controller' => 'Pages', 'action' => 'datacredito']);
    $routes->connect('/datacreditoTest', ['controller' => 'Pages', 'action' => 'datacreditoTest']);
    /**
     * ...and connect the rest of 'Pages' controller's URLs.
     */

    /**
     * Connect catchall routes for all controllers.
     *
     * Using the argument `DashedRoute`, the `fallbacks` method is a shortcut for
     *    `$routes->connect('/:controller', ['action' => 'index'], ['routeClass' => 'DashedRoute']);`
     *    `$routes->connect('/:controller/:action/*', [], ['routeClass' => 'DashedRoute']);`
     *
     * Any route class can be used with this method, such as:
     * - DashedRoute
     * - InflectedRoute
     * - Route
     * - Or your own route class
     *
     * You can remove these routes once you've connected the
     * routes you want in your application.
     */
    $routes->fallbacks(DashedRoute::class);
});
