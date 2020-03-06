<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Auth\DefaultPasswordHasher;
use Cake\Auth\AbstractPasswordHasher;


/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $users = $this->paginate($this->Users);

        $this->set(compact('users'));
    }

    public function login() {
        $this->viewBuilder()->setLayout('login');
        if ($this->request->is('post')) {
            $data = $this->request->getData();
            $data["user"] = "confe";
            $data["password"] = "vedA_Ewaca6u";

            $curl = curl_init();
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
            // curl_setopt($curl, CURLOPT_URL, 'http://104.236.159.193:4001/ws/login');
            curl_setopt($curl, CURLOPT_URL, 'http://181.57.139.234:4101/ws/login');
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $result = curl_exec($curl);
            $result = json_decode($result, true);
            curl_close($curl);

            if ($result['msg'] == 'Success') {
                if (!empty($result['data'][0])) {
                    $user = $result['data'][0][0];
                    $this->Auth->setUser($user);
                    return $this->redirect($this->Auth->redirectUrl());
                } else {
                    $this->Flash->error('Usuario o contraseña es incorrecta.');
                }
            } else {
                 $this->Flash->error('Un error ha ocurrido. Por favor, intente nuevamente.');
            }
        }
    }

    private function guardarTransaccion($data = null) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        // curl_setopt($curl, CURLOPT_URL, 'http://181.57.139.234:4001/ws/guardarTransaccion');
        curl_setopt($curl, CURLOPT_URL, 'http://181.57.139.234:4101/ws/guardarTransaccion');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($curl);
        $result = json_decode($result, true);
        curl_close($curl);

        return $result;
    }

    public function facturacionExternos($token = null) {
        date_default_timezone_set('America/Bogota');
        
        if ($this->request->is('post')) {
            $date = date('Y-m-d H');
            $body = $this->request->getParsedBody();

            if ($body['user'] == 'artcalle1' && $body['password'] == 'c0N3c4LL3_EyvaIGtA0') {

                $token_mix = sha1($body['cod_vendedor'].$body['tipo_cedula'].$body['cedula'].$body['valor_compra']);
                $estado = (isset($body['estado'])) ? $body['estado'] : '';
                $factura = (isset($body['factura'])) ? $body['factura'] : '';

                $data = [
                    "user" => "confe",
                    "password" => "vedA_Ewaca6u",
                    'cod_usu' => $body['usuario'],
                    'cod_vendedor' => $body['cod_vendedor'],
                    'tipo_doc' => $body['tipo_cedula'],
                    'cod_cli' => $body['cedula'],
                    'token' =>$token_mix,
                    'estado' => $estado,
                    'valor' => $body['valor_compra'],
                    'num_doc' => $factura,
                    'id' => $body['id'],
                    'consulta_cupo' => $body['consultar_cupo'],
                    'consulta' => 0,
                    'tipo_transaccion' => 1,
                    'numero_recibo' => null,
                    'saldo' => 0
                ];

                $result = $this->guardarTransaccion($data);

                if ($result['msg'] == 'Success') {
                    if ($body['id'] > 0) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'obligacion' => $result['data'][0][0]['num_doc'],
                                'estado_transaccion' => $result['data'][0][0]['estado_transaccion'],
                                'fecha_transaccion' => $result['data'][0][0]['fecha_creado_transaccion'],
                                'fecha_actualizacion_transaccion' => $result['data'][0][0]['fecha_modificado_transaccion']
                            ]
                        ];
                    } elseif($result['data'][0][0]['nom_cli'] == null) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'estado_cliente' => 'NO_EXISTE', 
                                'nombre_cliente' => null,
                                'cupo' => 0, 
                                'mensaje' => 'El cliente no existe'
                            ]
                        ];
                    } elseif (!empty($result['data'][0]) && $result['data'][0][0]['cod_caja'] != null) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'estado_cliente' => $result['data'][0][0]['estado_cliente'], 
                                'nombre_cliente' => $result['data'][0][0]['nom_cli'],
                                'cupo' => ($result['data'][0][0]['estado_cliente'] == 'NO_CREDITO') ? 0 : $result['data'][0][0]['cupo_cliente'], 
                                'mensaje' => $result['data'][0][0]['mensaje_cliente'], 
                                'url' => ($body['consultar_cupo'] == 1 || $result['data'][0][0]['estado_cliente'] == 'NO_CUPO') ? '' : 'http://intranet.credimarcas.com.co/api/externos/facturacion/'.$token_mix
                            ]
                        ];
                        if (isset($result['data'][0][0]['id'])) {
                            $resp['data']['id'] = $result['data'][0][0]['id'];
                        }
                    } else {
                        $resp = [
                            'success' => false, 
                            'message' => 'Vendedor no encontrado', 
                            'data' => null
                        ];
                    }
                } else {
                    $resp = [
                        'success' => false, 
                        'message' => 'Error de conexión. Por favor intente nuevamente.', 
                        'data' => $result
                    ];
                }

            } else {
                $resp = ['success' => false, 'message' => 'La solicitud ha fallado. Por favor, intente nuevamente', 'data' => null];
            }
            return $this->response->withType("application/json")->withStringBody(json_encode($resp));
        } else if($this->request->is('get')) {
            if ($token != null) {
                $data = [
                    "user" => "confe",
                    "password" => "vedA_Ewaca6u",
                    'cod_usu' => '',
                    'cod_vendedor' => '',
                    'tipo_doc' => '',
                    'cod_cli' => '',
                    'token' => $token,
                    'estado' => '',
                    'valor' => 0,
                    'num_doc' => '',
                    'id' => '',
                    'consulta' => 1,
                    'consulta_cupo' => '',
                    'tipo_transaccion' => 1,
                    'numero_recibo' => null,
                    'saldo' => 0
                ];

                $result = $this->guardarTransaccion($data);

                if ($result['msg'] == 'Success') {
                    if (!empty($result['data'][0]) && $result['data'][0][0]['cod_caja'] != null) {
                        $user = $result['data'][0][0];
                        $user['externo'] = 1;
                        $user['externo_token'] = $token;
                        $user['externo_estado_transaccion'] = $result['data'][0][0]['estado_transaccion'];
                        $user['externo_cod_vendedor'] = $result['data'][0][0]['cod_vendedor'];
                        $user['externo_id_transaccion'] = $result['data'][0][0]['id'];
                        $this->Auth->setUser($user);

                        return $this->redirect(['controller' => 'pages', 'action' => 'facturacion']);
                    } elseif (!empty($result['data'][0]) && $result['data'][0][0]['cod_caja'] != null) {

                    } else {
                        $resp = [
                            'success' => false, 
                            'message' => 'Vendedor no encontrado', 
                            'data' => null
                        ];
                    }
                } else {
                    $resp = [
                        'success' => false, 
                        'message' => 'Error de conexión. Por favor intente nuevamente.', 
                        'data' => null
                    ];
                }
                return $this->response->withType("application/json")->withStringBody(json_encode($result));
            } else {
                return $this->response->withType("application/json")->withStringBody(json_encode($resp));
            }
        }
    }

    public function recaudosExternos($token = null) {
        date_default_timezone_set('America/Bogota');

        if ($this->request->is('post')) {
            $date = date('Y-m-d H');
            $body = $this->request->getParsedBody();

            if ($body['user'] == 'artcalle1' && $body['password'] == 'c0N3c4LL3_EyvaIGtA0') {
                
                $token_mix = base64_encode(base64_encode($body['usuario'].'||'.$body['pago'].'||'.$body['cedula'].'||'.$body['numero_recibo']));

                $data = [
                    "user" => "confe",
                    "password" => "vedA_Ewaca6u",
                    'cod_usu' => $body['usuario'],
                    'cod_vendedor' => 'O98',
                    'tipo_doc' => '02',
                    'cod_cli' => $body['cedula'],
                    'token' =>$token_mix,
                    'estado' => '',
                    'valor' => $body['pago'],
                    'num_doc' => '',
                    'id' => $body['id'],
                    'consulta_cupo' => 0,
                    'consulta' => 0,
                    'tipo_transaccion' => 2,
                    'numero_recibo' => $body['numero_recibo'],
                    'saldo' => $body['saldo']
                ];

                $result = $this->guardarTransaccion($data);

                if ($result['msg'] == 'Success') {
                    if ($body['id'] > 0) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'num_doc' => $result['data'][0][0]['num_doc'],
                                'estado_transaccion' => $result['data'][0][0]['estado_transaccion'],
                                'fecha_transaccion' => $result['data'][0][0]['fecha_creado_transaccion'],
                                'fecha_actualizacion_transaccion' => $result['data'][0][0]['fecha_modificado_transaccion']
                            ]
                        ];
                    } elseif ($body['saldo'] > 0) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'nombre_cliente' => $result['data'][0][0]['nom_cli'],
                                'saldo_pendiente' => $result['data'][0][0]['saldo_pendiente'],
                                'saldo_descuento' => $result['data'][0][0]['saldo_descuento'],
                                'pago_minimo' => $result['data'][0][0]['pago_minimo']
                            ]
                        ];
                    } elseif (!empty($result['data'][0]) && $result['data'][0][0]['cod_caja'] != null) {
                        $resp = [
                            'success' => true, 
                            'message' => null, 
                            'data' => [
                                'nombre_cliente' => $result['data'][0][0]['nom_cli'],
                                'url' => 'http://intranet.credimarcas.com.co/api/externos/recaudosExternos/'.$token_mix
                            ]
                        ];
                        if (isset($result['data'][0][0]['id'])) {
                            $resp['data']['id'] = $result['data'][0][0]['id'];
                        }
                    } else {
                        $resp = [
                            'success' => false, 
                            'message' => 'Vendedor no encontrado', 
                            'data' => null
                        ];
                    }
                } else {
                    $resp = [
                        'success' => false, 
                        'message' => 'Error de conexión. Por favor intente nuevamente.', 
                        'data' => null
                    ];
                }

            } else {
                $resp = ['success' => false, 'message' => 'La solicitud ha fallado. Por favor, intente nuevamente', 'data' => null];
            }

            return $this->response->withType("application/json")->withStringBody(json_encode($resp));
        } else if($this->request->is('get')) {

            if ($token != null) {
                $tmp = base64_decode(base64_decode($token));
                $tmp_token = explode('||', $tmp);

                if (count($tmp_token) == 4) {
                    list($usuario, $pago, $cod_cli, $numero_recibo) = $tmp_token;

                    $data = [
                        "user" => "confe",
                        "password" => "vedA_Ewaca6u",
                        'cod_usu' => '',
                        'cod_vendedor' => '',
                        'tipo_doc' => '',
                        'cod_cli' => '',
                        'token' => $token,
                        'estado' => '',
                        'valor' => 0,
                        'num_doc' => '',
                        'id' => '',
                        'consulta' => 1,
                        'consulta_cupo' => '',
                        'tipo_transaccion' => 1,
                        'numero_recibo' => null,
                        'saldo' => 0
                    ];

                    $result = $this->guardarTransaccion($data);

                    if ($result['msg'] == 'Success') {
                        if (!empty($result['data'][0])) {
                            $user = $result['data'][0][0];
                            
                            $user['externo'] = 1;
                            $user['externo_pago'] = $pago;
                            $user['externo_cod_cli'] = $cod_cli;
                            $user['externo_id_transaccion'] = $result['data'][0][0]['id'];

                            $this->Auth->setUser($user);

                            return $this->redirect(['controller' => 'pages', 'action' => 'pagos']);
                        } else {
                            $resp = [
                                'success' => false, 
                                'message' => 'Vendedor no encontrado', 
                                'data' => null
                            ];
                        }
                    } else {
                         $resp = [
                            'success' => false, 
                            'message' => 'Error de conexión. Por favor intente nuevamente.', 
                            'data' => null
                        ];
                    }

                // $tmp = base64_decode(base64_decode($token));
                // $tmp_token = explode('||', $tmp);

                // if (count($tmp_token) == 4) {
                //     list($usuario, $pago, $cod_cli, $numero_recibo) = $tmp_token;
                //     $data["user"] = "confe";
                //     $data["password"] = "vedA_Ewaca6u";
                //     $data['usuario'] = $usuario;
                //     $data['numero_recibo'] = $numero_recibo;

                //     $curl = curl_init();
                //     curl_setopt($curl, CURLOPT_POST, 1);
                //     curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
                //     curl_setopt($curl, CURLOPT_URL, 'http://181.57.139.234:4101/ws/loginExterno');
                //     curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                //     $result = curl_exec($curl);
                //     $result = json_decode($result, true);
                //     curl_close($curl);
                   
                //     if ($result['msg'] == 'Success') {
                //         if (!empty($result['data'][0])) {
                //             $user = $result['data'][0][0];
                            
                //             $user['externo'] = 1;
                //             $user['externo_pago'] = $pago;
                //             $user['externo_cod_cli'] = $cod_cli;

                //             $this->Auth->setUser($user);

                //             return $this->redirect(['controller' => 'pages', 'action' => 'pagos']);
                //         } else {
                //             $resp = [
                //                 'success' => false, 
                //                 'message' => 'Vendedor no encontrado', 
                //                 'data' => null
                //             ];
                //         }
                //     } else {
                //          $resp = [
                //             'success' => false, 
                //             'message' => 'Error de conexión. Por favor intente nuevamente.', 
                //             'data' => null
                //         ];
                //     }
                } else {
                    $resp = [
                        'success' => false, 
                        'message' => 'Token no válido', 
                        'data' => null
                    ];    
                }
            } else {
                $resp = [
                    'success' => false, 
                    'message' => 'Error de conexión. Por favor intente nuevamente.', 
                    'data' => null
                ];
            }

            return $this->response->withType("application/json")->withStringBody(json_encode($resp));
        }
    }

    public function logout() {
        return $this->redirect($this->Auth->logout());
    }

    /**
     * View method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);

        $this->set('user', $user);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $user = $this->Users->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Edit method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    /**
     * Delete method
     *
     * @param string|null $id User id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $user = $this->Users->get($id);
        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
