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

use Cake\Core\Configure;
use Cake\Http\Exception\ForbiddenException;
use Cake\Http\Exception\NotFoundException;
use Cake\View\Exception\MissingTemplateException;
use Cake\Event\Event;
use Cake\Log\Log;
use DateTime;

/**
* Static content controllernu
*
* This controller will render views from Template/Pages/
*
* @link https://book.cakephp.org/3.0/en/controllers/pages-controller.html
*/
class PagesController extends AppController {

    private $user = [
        "cod_usu" => "CAJKOLOR1",
        "cod_caja" => "124",
        "cod_sucursal" => "002",
        "cargo" => "USUARIO CAJA"
    ];

    public function beforeFilter(Event $event) {
        $data = [
            "StrEmpresa" => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja')
        ];
        // $ws = $this->service('totalFacturaSinFirma', $data);
        // $totalFacturaSinFirma = 0;
        // if($ws['data']) {
        //     $totalFacturaSinFirma = $ws['data'][0][0]['cantidad'];
        // }
        // $this->set(compact(['totalFacturaSinFirma']));

        $this->set('minuto_inactivo', $this->Auth->user()['minuto_inactivo']);
        $this->set('user_intranet', $this->Auth->user());
        $this->set('role_usu', trim($this->Auth->user('roles_usu')));
        $this->set('cod_caja', trim($this->Auth->user('cod_caja')));
        $this->set('cod_sucursal', trim($this->Auth->user('cod_sucursal')));
        $this->set('web_service', $this->Auth->user('web_service'));

        parent::beforeFilter($event);
    }

    public function savelog() {
        $this->autoRender = false;
        $dataLog = $this->request->getData()['dataLog'];
        $action = $this->request->getData()['action'];

        $log = print_r($dataLog, true);
        $log = str_replace(array("\n","\t"), " ", $log);
        $log = preg_replace('/\s+/', ' ',$log);
        $this->log("SOLICITUD_DE_CREDITO|ACTION: ".$action);
        $this->log("SOLICITUD_DE_CREDITO|DATA: ".$log);
        return $this->response->withType("application/json")->withStringBody(json_encode($this->request->getData()));
    }

    public function home() {
        
    }

    public function simulador() {
        if ($this->request->is('post')) {
            $data = [
                "user" => "confe",
                "password" => "vedA_Ewaca6u",
                "empresa" => $this->Auth->user('cod_sucursal'),
                "tipo" => $this->request->getData()['tipo'],
                "valor" => $this->request->getData()['valor']
            ];
            $ws = $this->service('webSimulator2', $data);
            return $this->response->withType("application/json")->withStringBody(json_encode($ws));
        } else {
            $data = [
                "empresa" => $this->Auth->user('cod_sucursal'),
                "tipo" => "1"
            ];
            $getTypesCredit = $this->service('intranetMasters', $data);
            $typesCredit = $getTypesCredit['data'][0];
            $typesCreditOptions = [];
            foreach ($typesCredit as $value) {
                $typesCreditOptions[$value['cod_tip']] = $value['nom_tip'];
            }
            $title_for_layout = 'Simulador :: Credimarcas';
            $this->set(compact([
                'typesCredit',
                'typesCreditOptions',
                'title_for_layout'
            ]));
        }
    }

    public function solicitudes() {
        if ($this->request->is('post')) {
            $data = [
                "cli" => $this->request->getData()['cli'],
                "fec1" => $this->request->getData()['fec1'],
                "fec2" => $this->request->getData()['fec2'],
                "ind" => 0,
                "pos" => $this->Auth->user('cod_caja'),
                "tcli" => $this->request->getData()['tcli'],
                "ven" => ""
            ];

            $ws = $this->service('creditRequests', $data);
            return $this->response->withType("application/json")->withStringBody(json_encode($ws));
        } else {
            $title_for_layout = 'Consulta de Solicitudes :: Credimarcas';
            $this->set(compact(['title_for_layout']));
        }
    }

    public function crm() {
        if ($this->request->is('post')) {
            $data = [
                "user" => "confe",
                "password" => "vedA_Ewaca6u",
                "empresa" => $this->Auth->user('cod_sucursal'),
                "nit" => $this->request->getData()['nit']
            ];
            $getCrm = $this->service('crm', $data);
            $calls = $getCrm['data'][1];
            $obligations = [];

            foreach ($getCrm['data'][0] as $key => $value) {
                // if($value['tip_doc'] == '040' || $value['tip_doc'] == '510') {
                if($value['tip_doc'] == '510') {
                    $value['items'] = [];
                    $value['helpItems'] = [];
                    $value['item'] = null;
                    $value['valor_total'] = (float) 0;
                    $flagRegDoc = [];
                    foreach ($getCrm['data'][2] as $sKey => $sValue) {
                        // if($value['num_doc'] == $sValue['num_doc']) {
                        if($value['num_doc'] == $sValue['num_ref']) {
                            if($value['item'] == null) {
                                $value['item'] = $sValue;
                            }
                            $sDate = new DateTime($sValue['fec_ven']);
                            $mDate = new DateTime($value['item']['fec_ven']);
                            if($sDate > $mDate) {
                                $value['item'] = $sValue;
                            }
                            $value['valor_total'] = ((float) ($sValue['val_doc'])) + $value['valor_total'];
                            array_push($value['items'], $sValue);
                        }
                    }
                    foreach ($getCrm['data'][4] as $sKey => $sValue) {
                        if($value['num_doc'] == $sValue['num_doc']) {
                            array_push($value['helpItems'], $sValue);
                        }
                    }

                    array_push($obligations, $value);
                }
            }

            $payments = [];
            foreach ($getCrm['data'][0] as $key => $value) {
                if($value['tip_doc'] == '040') {
                    array_push($payments, $value);
                }
            }
            return $this->response->withType("application/json")->withStringBody(json_encode([
                'calls' => $calls,
                'obligations' => $obligations,
                'payments' => $payments
            ]));
        } else {
            $calls = [];
            $obligations = [];
            $payments = [];
            $title_for_layout = 'CRM :: Credimarcas';
            $user = [
                'empresa' => $this->Auth->user('cod_sucursal'),
                'nom_usu' => $this->Auth->user('cod_usu'),
                'caja' => $this->Auth->user('cod_caja')
            ];
            $this->set(compact(['calls', 'obligations', 'payments', 'title_for_layout', 'user']));
        }
    }

    public function crmItems() {
        $data = [
            'ano_doc' => $this->request->getData()['ano_doc'],
            'per_doc' => $this->request->getData()['per_doc'],
            'tip_doc' => $this->request->getData()['tip_doc'],
            'num_doc' => $this->request->getData()['num_doc']
        ];
        $getCrmItems = $this->service('crmItem', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($getCrmItems));
    }

    public function buscarCliente() {
        $data = [
            'empresa' => $this->Auth->user('cod_sucursal'),
            'stbuscar' => $this->request->getData()['stbuscar']
        ];

        $getCrmItems = $this->service('buscarCliente', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($getCrmItems));
    }

    public function huellaRegistroEstado() {
        $data = [
            'id' => ((!empty($this->request->getData()['id']))? $this->request->getData()['id']: 0),
            'nit' => $this->request->getData()['nit'],
            'empresa' => $this->Auth->user('cod_sucursal'),
            'caja' => $this->Auth->user('cod_caja'),
            'nom_usu' => $this->Auth->user('cod_usu'),
            'tipo' => ((!empty($this->request->getData()['tipo']))? $this->request->getData()['tipo']: 1),
            'estado' => ((!empty($this->request->getData()['estado']))? $this->request->getData()['estado']: 1),
            'dedo' => $this->request->getData()['dedo']
        ];
        $ws = $this->service('huellaRegistroEstado', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function huellaValidaEstado() {
        $data = [
            'id' => $this->request->getData()['id']
        ];
        $ws = $this->service('huellaValidaEstado', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function enviarFirma() {
        $data = $this->request->getData();
        $data['StrUsuario'] = trim($this->Auth->user('cod_usu'));
        $ws = $this->service('enviarFirma', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function eliminarFirma() {
        $data = $this->request->getData();
        $ws = $this->service('eliminarFirma', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function enviarFirmaManual() {
        $data = $this->request->getData();
        $data['StrUsuario'] = $this->Auth->user('cod_usu');
        $data['ced_cod'] = $this->Auth->user('cod_sucursal');
        $ws = $this->service('enviarFirmaManual', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function guardarFirma() {
        $data = [
            'caja' => $this->Auth->user('cod_caja'),
            'empresa' => $this->Auth->user('cod_sucursal'),
            'id_firma' => $this->request->getData()['id_firma'],
            'factura' => $this->request->getData()['factura']
        ];
        $ws = $this->service('guardarFirma', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function firmarPdf() {
        $data = $this->request->getData();
        $ws = $this->signService('firmarDocumento', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function consultarFirma() {
        $data = [
            'id' => $this->request->getData()['id']
        ];
        $ws = $this->service('consultarFirma', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function archivosCrm() {
        $data = [
            'cod_cli' => $this->request->getData()['cod_cli'],
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'Documento' => $this->request->getData()['Documento']
        ];
        $ws = $this->service('archivosCrm', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function historiaCliente() {
        $data = [
            'cod_cli' => $this->request->getData()['cod_cli'],
            'StrCaja' => $this->Auth->user('cod_caja'),
            'StrEmpresa' => $this->Auth->user('cod_sucursal')
        ];
        $ws = $this->service('historiaCliente', $data);

        if(!empty($ws['data'])) {
            foreach ($ws['data'] as $wsKey => $wsVal) {
                foreach ($wsVal as $iKey => $iVal) {
                    foreach ($iVal as $iAttrKey => $iAttrVal) {
                        $ws['data'][$wsKey][$iKey][$iAttrKey] = (is_string($iAttrVal)? trim($iAttrVal): $iAttrVal);
                    }
                }
            }
        }

        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function pdfSolicitud() {
        $ws = $this->service('pdf', $this->request->getData());
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function facturacion() {
        if ($this->request->is('post')) {
            $data = [
                'caja' => $this->Auth->user('cod_caja'),
                'empresa' => $this->Auth->user('cod_sucursal'),
                'nom_usu' => $this->Auth->user('cod_usu'),
                'ced_cod' => $this->request->getData()['ced_cod'],
                'cod_cli' => $this->request->getData()['cod_cli'],
                'cod_ven' => $this->request->getData()['cod_ven'],
                'valor' => $this->request->getData()['valor'],
                'tipo' => $this->request->getData()['tipo'],
                'cuotas' => $this->request->getData()['cuotas'],
                'dias' => $this->request->getData()['dias'],
                'con_huella' => $this->request->getData()['con_huella'],
                'num_pagare' => $this->request->getData()['num_pagare']
            ];

            $ws = $this->service('webFactura', $data);
            return $this->response->withType("application/json")->withStringBody(json_encode($ws));
        } else {
            $data = [
                "empresa" => $this->Auth->user('cod_sucursal'),
                "tipo" => "1"
            ];

            $getTypesCredit = $this->service('intranetMasters', $data);
            $typesCredit = $getTypesCredit['data'][0];
            $typesCreditOptions = ['' => 'SELECCIONAR...'];
            foreach ($typesCredit as $value) {
                $typesCreditOptions[$value['cod_tip']] = $value['nom_tip'];
            }

            $sellers = $this->getMaster("10");
            $title_for_layout = 'Facturación :: Credimarcas';

            $usuario = [
                'empresa' => $this->Auth->user('cod_sucursal'),
                'nom_usu' => $this->Auth->user('cod_usu'),
                'ind_auto_firma' => $this->Auth->user('ind_auto_firma'),
                'ind_vidente' => $this->Auth->user('ind_vidente'),
                'ind_solo_huella' => $this->Auth->user('ind_solo_huella'),
                'dias_vidente' => $this->Auth->user('dias_vidente'),
                'dias_actualizar' => $this->Auth->user('dias_actualizar'),
                'mes_integracion' => $this->Auth->user('mes_integracion'),
                'dias_cupo' => $this->Auth->user('dias_cupo'),
                'caja' => $this->Auth->user('cod_caja'),
                'valid_huella' => $this->Auth->user('valid_huella'),
                'mod_liq' => $this->Auth->user('mod_liq'),
                'valor_biodata' => $this->Auth->user('valor_biodata'),
                'dias_verificacion' => $this->Auth->user('dias_verificacion'),
                'ind_liq_cupo' => $this->Auth->user('ind_liq_cupo'),
                'externo' => $this->Auth->user('externo'),
                'externo_token' => $this->Auth->user('externo_token'),
                'externo_cod_cli' => $this->Auth->user('cod_cli'),
                'externo_valor' => $this->Auth->user('valor'),
                'externo_cod_vendedor' => $this->Auth->user('externo_cod_vendedor'),
                'externo_id_transaccion' => $this->Auth->user('externo_id_transaccion')
            ];

            $user_tmp = $this->Auth->user();
            if (isset($user_tmp['externo']) && $user_tmp['externo'] == 1) {
                $user_tmp['externo'] = 3;
                $user_tmp['externo_token'] = null;
                $user_tmp['externo_cod_cli'] = null;
                $user_tmp['externo_valor'] = null;
                $user_tmp['externo_cod_vendedor'] = null;
                $user_tmp['externo_id_transaccion'] = null;
                $this->Auth->setUser($user_tmp);
            }

            $this->set(compact([
                'typesCredit',
                'typesCreditOptions',
                'sellers',
                'title_for_layout',
                'usuario'
            ]));
        }
    }

    public function usuarios() {
        $title_for_layout = 'Usuarios :: Credimarcas';
        $user = [
            'empresa' => $this->Auth->user('cod_sucursal'),
            'nom_usu' => $this->Auth->user('cod_usu'),
        ];
        $this->set(compact(['title_for_layout', 'user']));
    }

    public function historialVentas() {
        $title_for_layout = 'Historial De Ventas :: Credimarcas';
        $data = [
            'empresa' => $this->Auth->user('cod_sucursal'),
            'caja' => $this->Auth->user('cod_caja'),
            'fecha_ini' => (($this->getValData('fecha_ini'))? $this->getValData('fecha_ini'): date("Ymd", strtotime("first day of this month"))),
            'fecha_fin' => (($this->getValData('fecha_fin'))? $this->getValData('fecha_fin'): date("Ymd", strtotime("last day of this month")))
        ];
        $requestInvoices = $this->service('consultaFactura', $data);
        if($this->request->is('post')) {
            return $this->response->withType("application/json")->withStringBody(json_encode($requestInvoices));
        }else {
            $this->set(compact(['requestInvoices','title_for_layout']));
        }
    }

    public function historialRecaudos() {
        $title_for_layout = 'Historial De Recaudos :: Credimarcas';
        $data = [
            'empresa' => $this->Auth->user('cod_sucursal'),
            'caja' => $this->Auth->user('cod_caja'),
            'fecha_ini' => (($this->getValData('fecha_ini'))? $this->getValData('fecha_ini'): date("Ymd", strtotime("first day of this month"))),
            'fecha_fin' => (($this->getValData('fecha_fin'))? $this->getValData('fecha_fin'): date("Ymd", strtotime("last day of this month")))
        ];
        $requestPayments = $this->service('consultaRecaudo', $data);
        if($this->request->is('post')) {
            return $this->response->withType("application/json")->withStringBody(json_encode($requestPayments));
        }else {
            $this->set(compact(['requestPayments','title_for_layout']));
        }
    }

    public function facturasSinFirmar() {
        $data = [
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja')
        ];
        $invoicesWithoutSign = $this->service('facturaSinFirma', $data);

        // foreach ($invoicesWithoutSign['data'] as $key => $value) {
        //     foreach ($value[$key] as $aKey => $aValue) {
        //         console.log()
        //         // $invoicesWithoutSign['data'][$key][$aKey] = trim($value[$key][$aKey]);
        //     }
        // }

        // foreach ($ws['data'] as $wsKey => $wsVal) {
        //     foreach ($wsVal as $iKey => $iVal) {
        //         foreach ($iVal as $iAttrKey => $iAttrVal) {
        //             $ws['data'][$wsKey][$iKey][$iAttrKey] = (is_string($iAttrVal)? trim($iAttrVal): $iAttrVal);
        //         }
        //     }
        // }

        if ($this->request->is('post')) {
            return $this->response->withType("application/json")->withStringBody(json_encode($invoicesWithoutSign));
        }else {
            $title_for_layout = 'Facturas Sin Firmar :: Credimarcas';
            $this->set(compact(['invoicesWithoutSign','title_for_layout']));
        }
    }
    public function totalFacturasSinFirmar() {
        $data = [
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja')
        ];
        $ws = $this->service('totalFacturaSinFirma', $data);
        $totalFacturaSinFirma = $ws['data'][0][0]['cantidad'];
        return $this->response->withType("application/json")->withStringBody(json_encode($totalFacturaSinFirma));
    }

    // } else {
    //     $data = [
    //         "empresa" => $this->Auth->user('cod_sucursal'),
    //         "tipo" => "1"
    //     ];
    //
    //     $getTypesCredit = $this->service('intranetMasters', $data);
    //     $typesCredit = $getTypesCredit['data'][0];
    //     $typesCreditOptions = ['' => 'SELECCIONAR...'];
    //     foreach ($typesCredit as $value) {
    //         $typesCreditOptions[$value['cod_tip']] = $value['nom_tip'];
    //     }
    //
    //     $sellers = $this->getMaster("10");
    //     $title_for_layout = 'Facturación :: Credimarcas';
    //
    //     $this->set(compact([
    //         'typesCredit',
    //         'typesCreditOptions',
    //         'sellers',
    //         'title_for_layout'
    //     ]));
    // }

    public function imprimirFactura() {
        $data = ['num_doc' => $this->request->getData()['num_doc']];        
        $ws = $this->service('imprimirFactura', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function imprimirPago() {
        $data = ['num_doc' => $this->request->getData()['num_doc']];

        $ws = $this->service('imprimirPago', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function informeVentas() {
        $role_usu = trim($this->Auth->user('roles_usu'));
        $title_for_layout = 'Informe Ventas :: Credimarcas';
        $this->set(compact(['title_for_layout','role_usu']));
    }

    public function pdfInformeVentas() {
        $data = [
            'metodo' => $this->request->getData()['metodo'],
            'row' => [
                'strempresa' => $this->Auth->user('cod_sucursal'),
                'strbodega' => ($this->request->getData()['row']['strbodega'])? $this->request->getData()['row']['strbodega']: $this->Auth->user('cod_caja'),
                'datfecha_ini' => $this->request->getData()['row']['datfecha_ini'],
                'datfecha_fin' => $this->request->getData()['row']['datfecha_fin'],
                'tiporepor' => $this->request->getData()['row']['tiporepor']
            ]
        ];
        $ws = $this->service('pdf', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function validarCliente() {
        $data = [
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja'),
            'cod_cli' => $this->request->getData()['cliente']
        ];

        $ws = $this->service('validaCliente', $data);

        $validClient = ['result' => false];
        $questions = [];
        $validations = [];
        $codeudor = [];
        $fingers = [];
        if(count($ws['data'][0])) {
            if($ws['data'][0][0]['result'] == 'YA EXISTE') {
                $validClient['result'] = true;
                foreach ($ws['data'][1][0] as $wsKey => $wsVal) {
                    $validClient[''.$wsKey] = (is_string($wsVal)? trim($wsVal): $wsVal);
                }

                $questions = $ws['data'][3];
                $validations = $ws['data'][4];
                $codeudor = (array_key_exists(5,$ws['data']))? $ws['data'][5]: [];
                $fingers = (array_key_exists(6,$ws['data']))? $ws['data'][6]: [];

                if(count($ws['data'][2])) {
                    $validClient['valid_normal'] = $ws['data'][2][0]['valid_normal'];
                }else {
                    $validClient['valid_normal'] = 0;
                }
            }else if($ws['data'][0][0]['result'] == 'EXISTE EN OTRA EMPRESA' || $ws['data'][0][0]['result'] == 'EXISTE EN CONFE') {
                $validClient['mes'] = $ws['data'][0][0]['mes'];
                $validClient['empresa'] = $ws['data'][0][0]['empresa'];
                $validClient['tipo'] = $ws['data'][0][0]['tipo'];
            }
        }

        $result = $validClient;
        if($this->request->getData()['fullRes'] == true) {
            $result = [
                'client' => $validClient,
                'questions' => $questions,
                'validations' => $validations,
                'codeudor' => $codeudor,
                'fingers' => $fingers
            ];
        }

        return $this->response->withType("application/json")->withStringBody(json_encode($result));
    }

    public function validarClienteIntegracion() {
        $data = [
            'StrEmpresa' => $this->request->getData()['empresa'],
            'StrCaja' => $this->Auth->user('cod_caja'),
            'cod_cli' => $this->request->getData()['cliente'],
            'tipo' => $this->request->getData()['tipo']
        ];
        $mValidClient = [
            'ap1_cli','ap2_cli','celular','cod_barrio','cod_ciu','cod_cli','cod_comuna',
            'cod_dep','cod_pai','cup_cli','direccion','e_mail','edad','est_civ',
            'fax_cli','fec_nac','nit_ciu','nom1_cli','nom2_cli','nom_cli','ocup_cli',
            'sexo','te1_cli','te2_cli','telefono','tip_ide'
        ];

        $ws = $this->service('validaClienteIntegracion', $data);
        $validClient = [];
        $fingers = [];
        if(count($ws['data'][0])) {
            foreach ($mValidClient as $key => $value) {
                $validClient[$value] = (isset($ws['data'][0][0][$value]))? trim($ws['data'][0][0][$value]): "";
                $ws['data'][0][0][$value] = (isset($ws['data'][0][0][$value]))? trim($ws['data'][0][0][$value]): "";
            }
            $validClient['saldo'] = 0;
            $validClient['result'] = true;
            $validClient['ultima_actualizacion'] = 0;
            $validClient['valid_normal'] = 1;
            $fingers = (array_key_exists(13,$ws['data']))? $ws['data'][13]: [];
        }

        $result = [
            'historyClient' => $ws['data'],
            'validClient' => $validClient,
            'fingers' => $fingers
        ];

        return $this->response->withType("application/json")->withStringBody(json_encode($result));
    }

    public function validarCall() {
        $data = [
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'cod_cli' => $this->request->getData()['cod_cli']
        ];

        $ws = $this->service('validarCall', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function consultarPagos() {
        $data = [
            "cod_cli" => $this->request->getData()['cliente'],
            "cod_suc" => $this->Auth->user('cod_sucursal'),
            "usu_caj" => $this->Auth->user('cod_usu'),
            "cod_caj" => $this->Auth->user('cod_caja')
        ];

        $ws = $this->service('consultarPagos', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function enviarPagos() {
        $data = [
            "empresa" => $this->Auth->user('cod_sucursal'),
            "caja" => $this->Auth->user('cod_caja'),
            "cod_cli" => $this->request->getData()['cliente'],
            "cod_ven" => '112',
            "valor" => $this->request->getData()['valor'],
            "vpago" => $this->request->getData()['vpago'],
            "nom_usu" => $this->Auth->user('cod_usu'),
            "items" => $this->request->getData()['items'],
            "id_transaccion" => $this->request->getData()['id_transaccion']
        ];

        $ws = $this->service('webRecaudo', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function pagos() {
        $title_for_layout = 'Pagos :: Credimarcas';
        $company = $this->Auth->user('cod_sucursal');
        $this->set('fecha_descuento', trim($this->Auth->user('fecha_descuento')));
        $this->set('externo', ($this->Auth->user('externo') != null) ? trim($this->Auth->user('externo')) : 0);
        $this->set('externo_pago', ($this->Auth->user('externo_pago') != null) ? trim($this->Auth->user('externo_pago')) : 0);
        $this->set('externo_cod_cli', trim($this->Auth->user('externo_cod_cli')));
        $this->set('externo_id_transaccion', ($this->Auth->user('externo_id_transaccion')) ? $this->Auth->user('externo_id_transaccion') : 0);
        $this->set(compact(['title_for_layout', 'company']));
    }

    public function info() {

    }

    public function nuevaSolicitud() {
        if ($this->request->is('get')) {
            $residencias = $this->getMaster("13");
            $dominios = $this->getMaster("11");
            $vendedores = $this->getMaster("10");
            $almacenes = $this->getMaster("9");
            $ocupaciones = $this->getMaster("8");
            $parentesco = $this->getMaster("7");
            $paises = $this->getMaster("6");
            $departamentos = $this->getMaster("5");
            $ciudades = $this->getMaster("4");
            $barrios = $this->getMaster("3");
            $comunas = $this->getMaster("2");

            $direcciones_raw = $this->getMaster("12");

            $direcciones = [];
            foreach($direcciones_raw as $direccion){      
                $direcciones[$direccion['cod_dir']] = $direccion['des_dir'];
            }

            $usuario = [
                'empresa' => $this->Auth->user('cod_sucursal'),
                'nom_usu' => $this->Auth->user('cod_usu'),
                'ind_auto_firma' => $this->Auth->user('ind_auto_firma'),
                'ind_vidente' => $this->Auth->user('ind_vidente'),
                'ind_solo_huella' => $this->Auth->user('ind_solo_huella'),
                'dias_verificacion' => $this->Auth->user('dias_verificacion'),
                'dias_vidente' => $this->Auth->user('dias_vidente'),
                'dias_actualizar' => $this->Auth->user('dias_actualizar'),
                'mes_integracion' => $this->Auth->user('mes_integracion'),
                'dias_cupo' => $this->Auth->user('dias_cupo'),
                'valid_huella' => $this->Auth->user('valid_huella'),
                'datacredito' => $this->Auth->user('datacredito'),
                'caja' => $this->Auth->user('cod_caja'),
                'vendedor' => $this->Auth->user('vendedor'),
                'imag_cup' => $this->Auth->user('imag_cup')
            ];

            $title_for_layout = 'Nueva Solicitud de Crédito :: Credimarcas';

            $this->set(compact([
                'paises',
                'departamentos',
                'ciudades',
                'comunas',
                'barrios',
                'parentesco',
                'ocupaciones',
                'almacenes',
                'vendedores',
                'usuario',
                'dominios',
                'residencias',
                'title_for_layout',
                'direcciones'
            ]));
        }else if ($this->request->is('post')) {
            if($this->getValData('update') == 'on') {
                $resultUpdate = $this->actualizarSolicitudCredito();
                return $this->response->withType("application/json")->withStringBody(json_encode($resultUpdate));
            }else {
                $direccion = $this->getValData('direccion').' '.$this->getValData('di1_cli').' # '.$this->getValData('di2_cli');
                if(strlen($this->getValData('di3_cli')) > 0) {
                    $direccion .= ' - '.$this->getValData('di3_cli');
                }
                if(strlen($this->getValData('unidad')) > 0) {
                    $residence = $this->getValData('cod_residencia');
                    $residence = ($residence)? $residence: 'EDIFICIO';
                    $direccion .= ' '.$residence.' ('.$this->getValData('unidad').')';
                }else if(!empty($this->getValData('cod_residencia'))) {
                    $residence = $this->getValData('cod_residencia');
                    $residence = ($residence)? $residence: 'EDIFICIO';
                    $direccion .= ' '.$residence;
                }
                if(strlen($this->getValData('di4_cli')) > 0) {
                    $direccion .= ' INT '.$this->getValData('di4_cli');
                }

                $fec_nac = str_replace('/', '-', $this->getValData('fec_nac'));
                $dataToSend = [
                    'ap1_cli' => $this->getValData('ap1_cli'),
                    'ap2_cli' => $this->getValData('ap2_cli'),
                    'caja' => trim($this->Auth->user('cod_caja')),
                    'cliente_firma' => (($this->getValData('cliente_firma') == 'si')? 1: 2),
                    'cod_pai' => $this->getValData('cod_pai'),
                    'cod_barrio' => explode('|', $this->getValData('cod_barrio'))[0],
                    'cod_comuna' => $this->getValData('cod_comuna'),
                    'cod_ciu' => $this->getValData('cod_ciu'),
                    'cod_cli' => $this->getValData('cod_cli'),
                    'cod_ven' => (!empty($this->Auth->user('vendedor')))? $this->Auth->user('vendedor'): '0',
                    'di1_cli' => $direccion,
                    'edad' => $this->getValData('edad'),
                    'empresa' => $this->Auth->user('cod_sucursal'),
                    'email' => $this->getValData('email'),
                    'envia_call' => (($this->getValData('envia_call'))? $this->getValData('envia_call'): '0'),
                    'est_civ' => $this->getValData('est_civ'),
                    'fax_cli' => $this->getValData('fax_cli'),
                    'fec_nac' => date('Ymd', strtotime($fec_nac)),
                    'id_firma' => $this->getValData('id_firma'),
                    'nit_ciu' => $this->getValData('nit_ciu'),
                    'nom_cli' => $this->getValData('nom1_cli').' '.$this->getValData('nom2_cli').' '.$this->getValData('ap1_cli').' '.$this->getValData('ap2_cli'),
                    'nom1_cli' => $this->getValData('nom1_cli'),
                    'nom2_cli' => $this->getValData('nom2_cli'),
                    'nom_usu' => $this->Auth->user('cod_usu'),
                    'notas_pos' => $this->getValData('notas_pos'),
                    'ocup_cli' => $this->getValData('ocup_cli'),
                    'sexo' => $this->getValData('sexo'),
                    'te1_cli' => $this->getValData('te1_cli'),
                    'tip_ide' => $this->getValData('tip_ide'),
                    'val_sol' => preg_replace('/(\s)|(\$)|(\,)/', '', $this->getValData('val_sol')),
                    'p_ind_estudiante' => (($this->getValData('p_ind_estudiante') == 'on')? 1: 0),
                    'p_ind_amacasa' => (($this->getValData('p_ind_amacasa') == 'on')? 1: 0),
                    'p_ind_independiente' => (($this->getValData('p_ind_independiente') == 'on')? 1: 0),
                    'p_ind_histcrediti' => (($this->getValData('p_ind_histcrediti') == 'on')? 1: 0),
                    'p_ind_pensionado' => (($this->getValData('p_ind_pensionado') == 'on')? 1: 0),
                    'p_ind_laboral' => (($this->getValData('p_ind_laboral') == 'on')? 1: 0),
                    'p_ind_comercial' => (($this->getValData('p_ind_comercial') == 'on')? 1: 0),
                    'rp1_parentesco' => $this->getValData('rp1_parentesco'),
                    'rp1_nombre' => $this->getValData('rp1_nombre'),
                    'rp1_tel' => $this->getValData('rp1_tel'),
                    'rp1_cel' => $this->getValData('rp1_cel'),
                    'rp2_parentesco' => $this->getValData('rp2_parentesco'),
                    'rp2_nombre' => $this->getValData('rp2_nombre'),
                    'rp2_tel' => $this->getValData('rp2_tel'),
                    'rp2_cel' => $this->getValData('rp2_cel'),
                    'rp3_parentesco' => $this->getValData('rp3_parentesco'),
                    'rp3_nombre' => $this->getValData('rp3_nombre'),
                    'rp3_tel' => $this->getValData('rp3_tel'),
                    'rp3_cel' => $this->getValData('rp3_cel'),
                    'rp4_parentesco' => $this->getValData('rp4_parentesco'),
                    'rp4_nombre' => $this->getValData('rp4_nombre'),
                    'rp4_tel' => $this->getValData('rp4_tel'),
                    'rp4_cel' => $this->getValData('rp4_cel'),
                    'rl1_nom_emp' => $this->getValData('rl1_nom_emp'),
                    'rl1_area' => $this->getValData('rl1_area'),
                    'rl1_cargo' => $this->getValData('rl1_cargo'),
                    'rl1_telefono' => $this->getValData('rl1_telefono'),
                    'rl1_ext' => $this->getValData('rl1_ext'),
                    'rc1_codigo' => (!empty($this->getValData('rc1_codigo')))? $this->getValData('rc1_codigo'): '0',
                    'rc1_estado' => (!empty($this->getValData('rc1_codigo')))? $this->getValData('rc1_estado'): '',
                    'rc2_codigo' => (!empty($this->getValData('rc2_codigo')))? $this->getValData('rc2_codigo'): '0',
                    'rc2_estado' => (!empty($this->getValData('rc2_codigo')))? $this->getValData('rc2_estado'): '',
                    'rc3_codigo' => (!empty($this->getValData('rc3_codigo')))? $this->getValData('rc3_codigo'): '0',
                    'rc3_estado' => (!empty($this->getValData('rc3_codigo')))? $this->getValData('rc3_estado'): '',
                    'rc4_codigo' => (!empty($this->getValData('rc4_codigo')))? $this->getValData('rc4_codigo'): '0',
                    'rc4_estado' => (!empty($this->getValData('rc4_codigo')))? $this->getValData('rc4_estado'): '',
                    'dat_general' => (($this->getValData('dat_general') == '1')? '1': '0'),
                    'dat_personal' => (($this->getValData('dat_personal') == '1')? '1': '0'),
                    'dat_laboral' => (($this->getValData('dat_laboral') == '1')? '1': '0'),
                    'dat_comercial' => (($this->getValData('dat_comercial') == '1')? '1': '0'),
                    'origen_act' => (($this->getValData('origen_act'))? $this->getValData('origen_act'): ''),
                    'tip_sol' => (($this->getValData('tip_sol'))? $this->getValData('tip_sol'): ''),
                    'inicio' => (($this->getValData('p_ind_credito_cedula') == 'on')? '18': (($this->getValData('p_ind_credito_codeudor') == 'on')? '03': $this->getValData('inicio')))
                ];
                // if($this->Auth->user('cod_usu') == 'CAJMOVIL3C') {
                //     echo "<pre>";
                //     print_r($dataToSend);
                //     echo "</pre>";
                //     exit;
                // }
                // return 1;
                // exit;
                $ws = $this->service('intranetCreditRequest', $dataToSend);

                return $this->response->withType("application/json")->withStringBody(json_encode($ws));
                // return $this->redirect(['controller' => 'Pages', 'action' => 'nuevaSolicitud']);
            }
        }
    }

    public function actualizarSolicitudCredito() {
        $direccion = $this->getValData('direccion').' '.$this->getValData('di1_cli').' # '.$this->getValData('di2_cli');
        if(strlen($this->getValData('di3_cli')) > 0) {
            $direccion .= ' - '.$this->getValData('di3_cli');
        }
        if(strlen($this->getValData('unidad')) > 0) {
            $residence = $this->getValData('cod_residencia');
            $residence = ($residence)? $residence: 'EDIFICIO';
            $direccion .= ' '.$residence.' ('.$this->getValData('unidad').')';
        }else if(!empty($this->getValData('cod_residencia'))) {
            $residence = $this->getValData('cod_residencia');
            $residence = ($residence)? $residence: 'EDIFICIO';
            $direccion .= ' '.$residence;
        }
        if(strlen($this->getValData('di4_cli')) > 0) {
            $direccion .= ' INT '.$this->getValData('di4_cli');
        }

        $dataToSend = [
            'empresa' => $this->Auth->user('cod_sucursal'),
            'nom_usu' => $this->Auth->user('cod_usu'),
            'caja' => trim($this->Auth->user('cod_caja')),
            'cod_ven' => (!empty($this->Auth->user('vendedor')))? $this->Auth->user('vendedor'): '0',// $this->getValData('cod_ven'),
            'val_sol' => preg_replace('/(\s)|(\$)|(\,)/', '', $this->getValData('val_sol')),
            'notas_pos' => $this->getValData('notas_pos'),
            'cliente_firma' => (($this->getValData('cliente_firma') == 'si')? 1: 2),
            'cod_cli' => $this->getValData('cod_cli'),
            'cod_ciu' => $this->getValData('cod_ciu'),
            'cod_pai' => $this->getValData('cod_pai'),
            'di1_cli' => $direccion,
            'te1_cli' => $this->getValData('te1_cli'),
            'fax_cli' => $this->getValData('fax_cli'),
            'edad' => $this->getValData('edad'),
            'email' => $this->getValData('email'),
            'envia_call' => (($this->getValData('envia_call'))? $this->getValData('envia_call'): '0'),
            'est_civ' => $this->getValData('est_civ'),
            'cod_barrio' => explode('|', $this->getValData('cod_barrio'))[0],
            'cod_comuna' => $this->getValData('cod_comuna'),
            'id_firma' => $this->getValData('id_firma'),
            'ocup_cli' => $this->getValData('ocup_cli'),
            'sexo' => $this->getValData('sexo'),
            'rp1_parentesco' => $this->getValData('rp1_parentesco'),
            'rp1_nombre' => $this->getValData('rp1_nombre'),
            'rp1_tel' => $this->getValData('rp1_tel'),
            'rp1_cel' => $this->getValData('rp1_cel'),
            'rp2_parentesco' => $this->getValData('rp2_parentesco'),
            'rp2_nombre' => $this->getValData('rp2_nombre'),
            'rp2_tel' => $this->getValData('rp2_tel'),
            'rp2_cel' => $this->getValData('rp2_cel'),
            'rp3_parentesco' => $this->getValData('rp3_parentesco'),
            'rp3_nombre' => $this->getValData('rp3_nombre'),
            'rp3_tel' => $this->getValData('rp3_tel'),
            'rp3_cel' => $this->getValData('rp3_cel'),
            'rp4_parentesco' => $this->getValData('rp4_parentesco'),
            'rp4_nombre' => $this->getValData('rp4_nombre'),
            'rp4_tel' => $this->getValData('rp4_tel'),
            'rp4_cel' => $this->getValData('rp4_cel'),
            'rl1_nom_emp' => $this->getValData('rl1_nom_emp'),
            'rl1_area' => $this->getValData('rl1_area'),
            'rl1_cargo' => $this->getValData('rl1_cargo'),
            'rl1_telefono' => $this->getValData('rl1_telefono'),
            'rl1_ext' => $this->getValData('rl1_ext'),
            'rc1_codigo' => (!empty($this->getValData('rc1_codigo')))? $this->getValData('rc1_codigo'): '0',
            'rc1_estado' => (!empty($this->getValData('rc1_codigo')))? $this->getValData('rc1_estado'): '',
            'rc2_codigo' => (!empty($this->getValData('rc2_codigo')))? $this->getValData('rc2_codigo'): '0',
            'rc2_estado' => (!empty($this->getValData('rc2_codigo')))? $this->getValData('rc2_estado'): '',
            'rc3_codigo' => (!empty($this->getValData('rc3_codigo')))? $this->getValData('rc3_codigo'): '0',
            'rc3_estado' => (!empty($this->getValData('rc3_codigo')))? $this->getValData('rc3_estado'): '',
            'rc4_codigo' => (!empty($this->getValData('rc4_codigo')))? $this->getValData('rc4_codigo'): '0',
            'rc4_estado' => (!empty($this->getValData('rc4_codigo')))? $this->getValData('rc4_estado'): '',
            'dat_general' => (($this->getValData('dat_general') == '1')? '1': '0'),
            'dat_personal' => (($this->getValData('dat_personal') == '1')? '1': '0'),
            'dat_laboral' => (($this->getValData('dat_laboral') == '1')? '1': '0'),
            'dat_comercial' => (($this->getValData('dat_comercial') == '1')? '1': '0'),
            'origen_act' => (($this->getValData('origen_act'))? $this->getValData('origen_act'): ''),
            'tip_sol' => (($this->getValData('tip_sol'))? $this->getValData('tip_sol'): '')
        ];

        // echo "<pre>";
        // print_r($dataToSend);
        // echo "</pre>";
        // return 1;
        // exit;

        $ws = $this->service('actualizarSolicitudCredito', $dataToSend);
        return $ws;

        // return $this->redirect(['controller' => 'Pages', 'action' => 'nuevaSolicitud']);
    }

    public function guardarVidente() {
        $this->autoRender = false;
        $data = [
            "cod_cli" => $this->request->getData()['cod_cli'],
            "idPregunta" => $this->request->getData()['idPregunta'],
            "NumRespuesta" => $this->request->getData()['NumRespuesta']
        ];
        $ws = $this->service('guardarVidente', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function actualizarArchivoCelIntegracion() {
        $this->autoRender = false;
        $data = [
            'StrEmpresa' => $this->request->getData()['StrEmpresa'],
            'StrCaja' => $this->Auth->user('cod_caja'),
            "cod_cli" => $this->request->getData()['cod_cli'],
            "StrEmpresadestino" => $this->Auth->user('cod_sucursal')
        ];
        $ws = $this->service('actualizarArchivoCelIntegracion', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function finalizarVidente() {
        $data = [
            'cod_cli' => $this->request->getData()['cod_cli'],
            'aprobado' => $this->request->getData()['aprobado'],
            'StrEmpresa' => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja'),
            'nom_usu' => $this->Auth->user('cod_usu'),
            'te1_cli' => $this->request->getData()['te1_cli'],
            'fax_cli' => $this->request->getData()['fax_cli'],
            'di1_cli' => $this->request->getData()['di1_cli'],
            'cod_ciu' => $this->request->getData()['cod_ciu'],
            'cod_barrio' => $this->request->getData()['cod_barrio'],
            'cod_comuna' => $this->request->getData()['cod_comuna']
        ];

        $ws = $this->service('finalizarVidente', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function subirCedulas() {
        /*
        $ws = $this->service('fotoCedula', $this->request->getData());
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
        */
        return null;
    }

    public function validarEstudio() {
        $data = [
            'cod_cli' => $this->request->getData()['cod_cli']
        ];

        $ws = $this->service('validarEstudio', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function actualizarContrasena() {
        $data = [
            'usuario' => $this->Auth->user('cod_usu'),
            'clave' => $this->request->getData()['clave'],
            'clave_nueva' => $this->request->getData()['clave_nueva']
        ];
        $ws = $this->service('actualizarContrasena', $data);
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function reimpresionDocumentos() {
        $title_for_layout = 'Reimpresión :: Credimarcas'; 
        $this->set(compact(['title_for_layout']));
    }

    protected function service($method = null, $data = null) {
        $data["user"] = "confe";
        $data["password"] = "vedA_Ewaca6u";        
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        //curl_setopt($curl, CURLOPT_URL, 'http://192.168.100.18:4101/ws/'.$method);
        // curl_setopt($curl, CURLOPT_URL, 'http://192.168.100.18:4101/ws/'.$method);
        curl_setopt($curl, CURLOPT_URL, 'http://181.57.139.234:4101/ws/'.$method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);
        $result = json_decode($result, true);
        curl_close($curl);
        return $result;
    }

    protected function signService($method = null, $data = null) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, 'http://192.168.100.18:4200/ws/'.$method.'?'.http_build_query($data));
        // curl_setopt($curl, CURLOPT_URL, 'http://192.168.100.18:4200/ws/'.$method.'?'.http_build_query($data));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);
        $result = json_decode($result, true);
        curl_close($curl);
        return $result;
    }

    public function getValData($nameAttr) {
        $result = '';
        if(!empty($this->request->getData()[$nameAttr])) {
            $result = $this->request->getData()[$nameAttr];
        }
        return $result;
    }

    public function getMaster($type) {
        $result = [];
        $data = [
            "empresa" => $this->Auth->user('cod_sucursal'),
            "tipo" => $type
        ];
        $ws = $this->service('intranetMasters', $data);
        if(count($ws['data'])) {
            $result = $ws['data'][0];
        }

        return $result;
    }

    public function datacreditoTest() {
        $data = [
            'identificacion' => $this->request->getQuery()['identificacion'],
            'primerApellido' => $this->request->getQuery()['primerApellido']
        ];

        $ws = $this->service('datacreditoTest', $data);
        if ($ws['msg'] == 'Success') {
            $ws = $ws['data'];
        }
        return $this->response->withType("application/json")->withStringBody(json_encode($ws));
    }

    public function datacredito(){
        $this->RequestHandler->respondAs('json');
        $this->autoRender = false; 
      
        $request = [];
        $primerApellido =  urlencode($this->request->getQuery('primerApellido'));
        $tipoIdentificacion =  $this->request->getQuery('tipoIdentificacion');
        $identificacion =  $this->request->getQuery('identificacion');

        $des_estrategia = $this->Auth->user('des_estrategia');
        $estrategia = $this->Auth->user('estrategia');

        $request = "tipoIdentificacion=".$tipoIdentificacion."&primerApellido=".$primerApellido."&identificacion=".$identificacion."&estrategia=".$estrategia."&des_estrategia=".$des_estrategia;
    

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => "http://liv02.sspublicaciones.com/ConsultasDCV1Pruebas/API/ConsultasDC/ConsultarPreselecta",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => $request,
          CURLOPT_HTTPHEADER => array(
            "Accept: */*",
            "Accept-Encoding: gzip, deflate",
            "Authorization: Basic MzpDb250cmEqMQ==",
          ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        
        curl_close($curl);

     
        if (!$err) {
            //xml llegua mal parseado
            $response   = str_replace("\\n","",$response);
            $response =  str_replace('\\', '', $response);
            $response =  str_replace('"<', '<', $response);
            $response =  str_replace('>"', '>', $response);
          
            $response = simplexml_load_string($response);
            $response->success = true;
            $data = json_encode($response);
            
        } else {
  
            $data['success'] = false; 
            $data['response'] = $err;
            $data = json_encode($data);

        }
        
     
        echo $data;
    

    }   





    public function facturaSinFirmar() {

        $this->RequestHandler->respondAs('json');
        $this->response->withType('application/json');  
        $this->autoRender = false; 
      

        $data = [
            "StrEmpresa" => $this->Auth->user('cod_sucursal'),
            'StrCaja' => $this->Auth->user('cod_caja'),
            "user" => "confe",
            "password" => "vedA_Ewaca6u"
        ];
      
        $method = 'totalFacturaSinFirma';
        $totalFacturaSinFirma = 0;
     
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($curl, CURLOPT_URL, 'http://192.168.100.18:4101/ws/'.$method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);
        $result = json_decode($result, true);
        curl_close($curl);

        if($result['data']) {
            $totalFacturaSinFirma = $result['data'][0][0]['cantidad'];
        }
        
        echo json_encode(['data'=> $totalFacturaSinFirma]);
     
    }


    

}
