<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link https://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller
{

    private function authenticate() {
        $this->loadComponent('Flash');
        $this->loadComponent('Auth', [
            'authenticate' => [
                'Form' => [
                    'fields' => [
                        'username' => 'usuario',
                        'password' => 'clave'
                    ]
                ]
            ],
            'loginAction' => [
                'controller' => 'Users',
                'action' => 'login'
            ],
            'unauthorizedRedirect' => $this->referer() // Si no está autorizado,
                            //el usuario regresa a la página que estaba
        ]);
            $this->Auth->allow(['display', 'facturacionExternos', 'recaudosExternos']);
    }

    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('RequestHandler', [
            'enableBeforeRedirect' => false,
        ]);
        $this->loadComponent('Flash');
        $this->authenticate();
        $this->allowMemory();

        /*
         * Enable the following component for recommended CakePHP security settings.
         * see https://book.cakephp.org/3.0/en/controllers/components/security.html
         */
        //$this->loadComponent('Security');

        // $session = $this->request->session();
        // $session->write('Auth.User', [
        //     "cod_usu" => "CAJKOLOR1",
        //     "cod_caja" => "124",
        //     "cod_sucursal" => "002",
        //     "cargo" => "USUARIO CAJA"
        // ]);
        // $user = $session->read('Auth.User');

        // $user = [
        //     "cod_usu" => "CAJKOLOR1",
        //     "cod_caja" => "124",
        //     "cod_sucursal" => "002",
        //     "cargo" => "USUARIO CAJA"
        // ];
        // $this->set(compact(['user']));
    }

    public function allowMemory() {
        $role_usu = $this->Auth->user('roles_usu');
        switch($this->request->getParam('action')) {
            case 'simulador':
            if($role_usu == 'G_INFORMES') {
                return $this->redirect(['controller' => 'Pages', 'action' => 'home']);
            }
            break;
            case 'facturacion':
            if($role_usu == 'G_INFORMES' || $role_usu == 'ASESOR') {
                return $this->redirect(['controller' => 'Pages', 'action' => 'home']);
            }
            break;
            case 'pagos':
            if($role_usu == 'G_INFORMES' || $role_usu == 'ASESOR') {
                return $this->redirect(['controller' => 'Pages', 'action' => 'home']);
            }
            break;
            case 'reimpresionDocumentos':
            if($role_usu == 'G_INFORMES' || $role_usu == 'ASESOR') {
                return $this->redirect(['controller' => 'Pages', 'action' => 'home']);
            }
            break;
        }
    }
}
