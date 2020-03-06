<style type="text/css">
    input[type="checkbox"].has-error + label.custom-control-label::before {
        border-color: #de615f;
        box-shadow: 0px 0px 1px 2px rgba(222, 97, 95, 0.4);
    }

    div.content {
        padding-top: 2px !important;
    }
    input[readonly] {
        background-color: #f6f6f6;
    }

    .container-embed {
        height:100%;
        min-height: calc(100vh - 395px);
        display: grid;
    }
    .content-embed {
        height:100%;
        max-height: calc(100vh - 395px);
    }

    .swal-compact .swal-title {
        margin-bottom: 0px;
    }
    .swal-compact .swal-content {
        margin-top: 0px;
    }
    .tab-title {
        font-weight: 500;
        color: gray;
    }
    .alert-increase {
        font-size: 18px;
    }

    .btn-finish[name="finish"] {
        padding: 0.45em 0.8em;
    }
    .inp_err{
        border:2px solid #F00;
    }
    .tandc{
        width:100%;
        font-family: 'Open Sans', sans-serif;
        font-weight:normal;
        padding-top: 12px;
    }
    .avatar div{
        height:auto !important;
    }
    #asistente-solicitud .nav-item{
        text-align: center;
    }
    #asistente-solicitud .nav-item .nav-link{
        background-color: none;
        transform: translate3d(-8px, 0px, 0px);
        transition: transform 0s ease 0s;
        color: #555 !important;
    }
    #asistente-solicitud .nav-item .nav-link.active{
        background-color: #f44336 !important;
        color: #fff !important;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.14), 5px 6px 7px -5px rgba(0,0,0,.4) !important;
        border-radius: 4px;
    }
    .sep{
        margin-top: 10px;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }
    .sep p{
        margin: 0;
    }

    /** ***** Cuestionario de validación de cliente ***** */
    #questionsClient .questions-container .question-item {
        display: none;
    }
    #questionsClient .questions-container .question-item.active {
        display: block;
    }
    #questionsClient .questions-container .question-item .question-summary {/* .num-question | .desc-question */
        font-weight: 400;
    }
    #questionsClient .questions-container .question-content {
        padding: 0px 16px;
    }
    #questionsClient .questions-container .question-content .item-answer label {
        color: #000000;
        font-weight: 100;
    }
    #questionsClient .questions-container .question-actions {

    }
    /** ***** / Cuestionario de validación de cliente ***** */
    #perfil .questions-container .question-divider {
        font-size: 20px;
        font-weight: 500;
        color: red;
        margin: 0 !important;
    }

    #perfil .questions-container .desc-question label {
        font-weight: 100;
    }

    /** ***** Modal pdfs ***** */
    .tag-modal-pdf {
        /* background: #efefef;
        border-radius: 2px;
        display: inline-block; */
        font-size: 16px;
        /* margin: 0 4px 8px 0;
        padding: 6px 12px; */
    }
    .tag-modal-pdf .tag-title {
        font-weight: 400;
    }
    .tag-modal-pdf .tag-desc {

    }
    #pdfsModal .card.card-pdf {
        box-shadow: none;
        margin: 0;
    }
    #pdfsModal .card.card-pdf {
        box-shadow: none;
        margin: 0;
    }
    #pdfsModal .card.card-pdf .card-header, #pdfsModal .card .card-body {
        margin: 0;
        padding: 0;
    }
    #pdfsModal .card.card-pdf .card-header .nav-item {
        font-weight: 400;
    }
    #pdfsModal #btnSign, #pdfsModal #btnSignEnd,  #pdfsModal #btnSend {
        /* position: absolute; */
        /* bottom: 4px; */
        /* right: 24px; */
        font-size: 16px;
        padding: 0.45em 0.8em;
        border-radius: 4px !important;
        font-size: 16px;
        line-height: 1.42857143;
    }
    /** ***** / Modal pdfs ***** */

    /** ***** Pestaña resltado ***** */
    .container-table-result {
        background: #eee;
        border-radius: 4px;
        border: 1px solid #ddd;
    }
    /** ***** / Pestaña resltado ***** */

    /** **** ------- ***** */
    #aut-centrales .row-questions, #cedula .row-questions {
        background: #f2f1f2;
        padding: 8px;
        border: 1px solid #d2d2d2;
        border-radius: 4px;
    }
    #aut-centrales .row-questions input, #cedula .row-questions input,
    #aut-centrales .row-questions label, #cedula .row-questions label,
    #aut-centrales .row-questions span, #cedula .row-questions span {
        color: #424242;
        font-weight: 300;
        width: auto;
        font-size: 16px;
    }
    #cedula .files-container .preview-file {
        margin: 0 auto;
    }
    #cedula .files-container .preview-file,
    #cedula .files-container .preview-file img {
        border-radius: 6px;
        max-width: 330px;
    }

    #cedula .files-container .file-zone {
        height: 55px;
        padding: 8px;
    }

    #cedula .files-container .file-zone .drop-zone {
        padding: 8px;
    }

    #cedula .file-zone.c-disabled,
    #cedula .file-zone.c-disabled .drop-zone,
    #cedula .file-zone.c-disabled input,
    #aut-centrales .file-zone.c-disabled,
    #aut-centrales .file-zone.c-disabled .drop-zone,
    #aut-centrales .file-zone.c-disabled input {
        cursor: not-allowed;
    }

    #aut-centrales .files-container .file-zone {
        height: 60px;
        padding: 10px;
    }
    #aut-centrales .files-container .file-zone .drop-zone {
        padding: 8px;
    }

    #formWizard input:focus, #formWizard select:focus, #formWizard textarea:focus,
    #formSeer input:focus, #formSeer select:focus, #formSeer textarea:focus {
        box-shadow: 0 0 5px rgb(0, 100, 255);
        border: 1px solid rgba(0, 100, 255, 0.8);
    }
    #formWizard select.empty, #formSeer select.empty {
        color: #bbbbbb;
    }
    #formWizard .radio-button {
        background: white;
        border: 1px solid #d2d2d2;
        border-radius: 50%;
        cursor: pointer;
        margin-top: 4px;
        padding: 1px;
    }
    #formWizard .radio-button:hover {
        background: #d2d2d2;
    }
    #wNavigation {
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
    }

    #prevAutManual005:hover, #prevAutManual006:hover,
    #prevAttached1:hover, #prevAttached2:hover {
        opacity: .7;
        cursor: pointer;
    }

    /* input,textarea{padding:10px;width:100%;outline:none;transition: all 0.15s ease-in-out;border-radius:3px;border:1px solid rgba(0,0,0,0.2);}

.azul:focus {box-shadow: 0 0 5px rgba(0,0,255,1);border:1px solid rgba(0,0,255,0.8);}
.rojo:focus {box-shadow: 0 0 5px rgba(255,0,0,1);border:1px solid rgba(255,0,0,0.8);}
.naranja:focus {box-shadow: 0 0 5px rgba(230,95,0,1);border:1px solid rgba(230,95,0,0.8);}
.verde:focus {box-shadow: 0 0 5px rgba(0,255,0,1);border:1px solid rgba(0,255,0,0.8);} */

    /** **** ------- ***** */

    #fwFechaActualizacion, #fwOrigenAct {
        color: #5f5f5f;
    }

    /* ***** TAB DE HUELLAS ***** */
    #hands,
    #reg_hands {
        position: relative;
    }

    #hands #handRight,
    #reg_hands #reg_handRight {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #hands #handRight .finger,
    #hands #handLeft .finger,
    #reg_hands #reg_handRight .finger,
    #reg_hands #reg_handLeft .finger {
        background: #ea4641;
        cursor: pointer;
        position: absolute;
    }

    #hands #handRight #palmRight,
    #reg_hands #reg_handRight #reg_palmRight {
        background: #ea4641;
        border-radius: 30px 35px 50px 25px;
        height: 90px;
        left: 60px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #hands #handRight #finger1,
    #reg_hands #reg_handRight #reg_finger1 {
        border-radius: 75px 75px 100px 20px;
        height: 55px;
        left: 19px;
        transform: rotate(-57deg);
        top: 108px;
        width: 30px;
    }
    #hands #handRight #finger2,
    #reg_hands #reg_handRight #reg_finger2 {
        border-radius: 75px 75px 75px 20px;
        height: 70px;
        left: 45px;
        transform: rotate(-20deg);
        top: 25px;
        width: 25px;
    }
    #hands #handRight #finger3,
    #reg_hands #reg_handRight #reg_finger3 {
        border-radius: 75px 75px 25px 55px;
        height: 75px;
        left: 85px;
        transform: rotate(-8deg);
        top: 10px;
        width: 20px;
    }
    #hands #handRight #finger4,
    #reg_hands #reg_handRight #reg_finger4 {
        border-radius: 75px 75px 25px 55px;
        height: 70px;
        left: 120px;
        transform: rotate(10deg);
        top: 15px;
        width: 20px;
    }
    #hands #handRight #finger5,
    #reg_hands #reg_handRight #reg_finger5 {
        border-radius: 75px 75px 25px 55px;
        height: 65px;
        left: 155px;
        transform: rotate(25deg);
        top: 33px;
        width: 20px;
    }

    #hands #handLeft,
    #reg_hands #reg_handLeft {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #hands #handLeft #palmLeft,
    #reg_hands #reg_handLeft #reg_palmLeft {
        background: #ea4641;
        border-radius: 35px 30px 25px 50px;
        height: 90px;
        left: 30px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #hands #handLeft #finger6,
    #reg_hands #reg_handLeft #reg_finger6 {
        border-radius: 75px 75px 20px 100px;
        height: 55px;
        left: 140px;
        transform: rotate(57deg);
        top: 108px;
        width: 30px;
    }
    #hands #handLeft #finger7,
    #reg_hands #reg_handLeft #reg_finger7 {
        border-radius: 75px 75px 20px 75px;
        height: 70px;
        left: 120px;
        transform: rotate(20deg);
        top: 25px;
        width: 25px;
    }
    #hands #handLeft #finger8,
    #reg_hands #reg_handLeft #reg_finger8 {
        border-radius: 75px 75px 55px 25px;
        height: 75px;
        left: 85px;
        transform: rotate(8deg);
        top: 10px;
        width: 20px;
    }
    #hands #handLeft #finger9,
    #reg_hands #reg_handLeft #reg_finger9 {
        border-radius: 75px 75px 55px 25px;
        height: 70px;
        left: 50px;
        transform: rotate(-10deg);
        top: 15px;
        width: 20px;
    }
    #hands #handLeft #finger10,
    #reg_hands #reg_handLeft #reg_finger10 {
        border-radius: 75px 75px 55px 25px;
        height: 65px;
        left: 20px;
        transform: rotate(-25deg);
        top: 33px;
        width: 20px;
    }

    #hands .finger.finger-exist,
    #reg_hands .finger.finger-exist {
        background: #999999 !important;
        cursor: no-drop !important;
    }
    #hands .finger.finger-selected,
    #reg_hands .finger.finger-selected {
        background: #262626 !important;
    }
    /* ***** / TAB DE HUELLAS ***** */

    /* ***** MODAL DE HUELLAS ***** */
    #modal_hands {
        position: relative;
    }

    #modal_hands #modal_handRight {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #modal_hands #modal_handRight .finger,
    #modal_hands #modal_handLeft .finger {
        background: #ea4641;
        cursor: pointer;
        position: absolute;
    }

    #modal_hands #modal_handRight #modal_palmRight {
        background: #ea4641;
        border-radius: 30px 35px 50px 25px;
        height: 90px;
        left: 60px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #modal_hands #modal_handRight #modal_finger1 {
        border-radius: 75px 75px 100px 20px;
        height: 55px;
        left: 19px;
        transform: rotate(-57deg);
        top: 108px;
        width: 30px;
    }
    #modal_hands #modal_handRight #modal_finger2 {
        border-radius: 75px 75px 75px 20px;
        height: 70px;
        left: 45px;
        transform: rotate(-20deg);
        top: 25px;
        width: 25px;
    }
    #modal_hands #modal_handRight #modal_finger3 {
        border-radius: 75px 75px 25px 55px;
        height: 75px;
        left: 85px;
        transform: rotate(-8deg);
        top: 10px;
        width: 20px;
    }
    #modal_hands #modal_handRight #modal_finger4 {
        border-radius: 75px 75px 25px 55px;
        height: 70px;
        left: 120px;
        transform: rotate(10deg);
        top: 15px;
        width: 20px;
    }
    #modal_hands #modal_handRight #modal_finger5 {
        border-radius: 75px 75px 25px 55px;
        height: 65px;
        left: 155px;
        transform: rotate(25deg);
        top: 33px;
        width: 20px;
    }

    #modal_hands #modal_handLeft {
        display: inline-block;
        height: 190px;
        position: relative;
        width: 190px;
    }

    #modal_hands #modal_handLeft #modal_palmLeft {
        background: #ea4641;
        border-radius: 35px 30px 25px 50px;
        height: 90px;
        left: 30px;
        position: absolute;
        top: 90px;
        width: 100px;
    }
    #modal_hands #modal_handLeft #modal_finger6 {
        border-radius: 75px 75px 20px 100px;
        height: 55px;
        left: 140px;
        transform: rotate(57deg);
        top: 108px;
        width: 30px;
    }
    #modal_hands #modal_handLeft #modal_finger7 {
        border-radius: 75px 75px 20px 75px;
        height: 70px;
        left: 120px;
        transform: rotate(20deg);
        top: 25px;
        width: 25px;
    }
    #modal_hands #modal_handLeft #modal_finger8 {
        border-radius: 75px 75px 55px 25px;
        height: 75px;
        left: 85px;
        transform: rotate(8deg);
        top: 10px;
        width: 20px;
    }
    #modal_hands #modal_handLeft #modal_finger9 {
        border-radius: 75px 75px 55px 25px;
        height: 70px;
        left: 50px;
        transform: rotate(-10deg);
        top: 15px;
        width: 20px;
    }
    #modal_hands #modal_handLeft #modal_finger10 {
        border-radius: 75px 75px 55px 25px;
        height: 65px;
        left: 20px;
        transform: rotate(-25deg);
        top: 33px;
        width: 20px;
    }

    #modal_hands .finger {
        cursor: no-drop !important;
    }
    #modal_hands .finger.finger-exist {
        background: #999999 !important;
        cursor: pointer !important;
    }
    #modal_hands .finger.finger-selected {
        background: #262626 !important;
    }
    /* ***** / MODAL DE HUELLAS ***** */


    .dermatitis label{
        display: inline-block;
        width: 80%;
        padding: 0;
        text-align: left;
        line-height: 28px;
        font-size:18px;
        transform: translateY(2px);
    }

    .dermatitis input{
        
        width: 10%;
        margin: 0;
    }
    
    .dermatitis input:focus {
        box-shadow: none;
    }


</style>
<div filter-color="black" style="background-image: url('./img/bg3.jpg');opacity: 0.4;" class="bg-section-gral"></div>
<div class="content">



    <div class="container-fluid">
        <div class="col-md-12 col-12 mr-auto ml-auto">
            <div class="wizard-container" id="asistente-solicitud">
                <div class="card card-wizard active" data-color="danger" id="wizardProfile">
                    <div class="card-header text-center pb-0">
                        <div class="row">
                            <div class="col-4">&nbsp;</div>
                            <div class="col">
                                <h3 class="card-title">Solicitud de Crédito</h3>
                            </div>
                            <div class="col-4 text-right">
                                <div id="selTabSelected" class="hide">
                                    <label>Formulario: *</label>
                                    <?= $this->Form->select('tab_selected', ['generales' => 'Generales', 'ref-laborales' => 'Referencias Laborales', 'ref-comerciales' => 'Referencias Comerciales', 'ref-personales' => 'Referencias Personales', 'huella' => 'Huella', 'cedula' => 'Cédula', 'aut-centrales' => 'Autorización Centrales', 'codeudor' => 'Codeudor', 'resultado' => 'Resultado'], ['label' => 'Pestañas: *', 'class' => 'c-field w-100 empty', 'style' => 'background: #fff;padding: 4px 8px;color: #484848;max-width: 180px;']) ?>
                                </div>
                            </div>
                        </div>
                        <h5 class="card-description m-0 text-black fs-19"><span id="fwCedula"></span> - <span id="fwCliente"></span></h5>
                    </div>

                

                    <!-- CEDULA PARA VALIDAR CLIENTE -->
                    <form id="formValidateClient" class="c-form-group" autocomplete="off">
                        <div class="row">
                            <div class="col col-md-12 text-center">
                                <p class="fs-16">Ingrese la cédula del cliente</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-4">&nbsp;</div>
                            <div class="col col-md-4 text-center">
                                <span class="i-search">
                                    <?= $this->Form->text('validar_cedula', ['id' => 'validarCedula', 'label' => 'Cédula del Cliente', 'placeholder' => 'Buscar por cédula ó nombres', 'onkeyup' => 'iCtrlSeer.searchClients(this)', 'required' => 'true', 'style' => 'margin-right: .5rem;', 'maxlength' => '15']) ?>
                                    <span class="b-search pointer" onclick="iCtrlSeer.validClient()"><i class="material-icons">search</i></span>
                                </span>
                            </div>
                            <div class="col col-md-4">&nbsp;</div>
                        </div>
                        <div class="row pt-8">
                            <div class="col col-md-4">&nbsp;</div>
                            <div class="col col-md-4 text-center">
                                <button type="submit" class="btn btn-danger">Continuar</button>
                            </div>
                            <div class="col col-md-4">&nbsp;</div>
                        </div>
                    </form>
                    <!-- / CEDULA PARA VALIDAR CLIENTE -->


                    <!-- VALID QUESTIONS CLIENT -->
                    <div id="questionsClient" style="display:none;">
                        <div class="row">
                            <div class="col text-center">
                                <h4 class="text-danger fs-20 m-0"><b>Vidente</b></h4>
                                <p class="text-danger fs-18"><b>Información del cliente (Responder 3 Preguntas)</b></p>
                            </div>
                        </div>
                        <form id="questionsClient" class="pr-16 pl-16" autocomplete="off">
                            <div class="questions-container fs-16">
                                <div class="question-item active" id="question1">
                                    <div class="question-summary">
                                        <p style="font-size: 18px;"><span class="num-question">1.</span><span class="desc-question"></span></p>
                                    </div>
                                    <div class="question-content"></div>
                                    <div class="question-actions text-right">
                                        <button id="bNext1" type="button" class="btn btn-danger" onclick="iCtrlSeer.nextQuestion(1)" disabled>Siguiente</button>
                                    </div>
                                </div>
                                <div class="question-item" id="question2">
                                    <div class="question-summary">
                                        <p style="font-size: 18px;"><span class="num-question">2.</span><span class="desc-question"></span></p>
                                    </div>
                                    <div class="question-content"></div>
                                    <div class="question-actions text-right">
                                        <button id="bNext2" type="button" class="btn btn-danger" onclick="iCtrlSeer.nextQuestion(2)" disabled>Siguiente</button>
                                    </div>
                                </div>
                                <div class="question-item" id="question3">
                                    <div class="question-summary">
                                        <p style="font-size: 18px;"><span class="num-question">3.</span><span class="desc-question"></span></p>
                                    </div>
                                    <div class="question-content"></div>
                                    <div class="question-actions text-right">
                                        <button id="bNext3" type="button" class="btn btn-danger" onclick="iCtrlSeer.endQuestion()" disabled>Finalizar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- / VALID QUESTIONS CLIENT -->

                    <!-- ACTUALIZAR DATOS -->
                    <div id="updateClient" style="display:none;">
                        <div class="row">
                            <div class="col">
                                <p class="text-center text-danger fs-18"><b>Actualizar los siguientes datos, para continuar con el VIDENTE</b></p>
                            </div>
                        </div>
                        <form id="formSeer" class="row mb-0 c-form-group">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Celular:</label>
                                        <?= $this->Form->text('uc_fax_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Teléfono:</label>
                                        <?= $this->Form->text('uc_te1_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                </div>
                                <div class="row pt-8">
                                    <div class="col-md-12" id="dircol">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label>Dirección: *</label>
                                                <?= $this->Form->select('uc_direccion', [''=>'', 'AVE' => 'Avenida','CLL' => 'Calle',
                                                'CRA' => 'Carrera','CIR' => 'Circular',
                                                'DIAG' => 'Diagonal','KM' => 'Kilómetro',
                                                'TR' => 'Transversal'], ['label' => 'Dirección: *', 'class' => 'c-field', 'required' => 'true']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label> </label>
                                                <?= $this->Form->text('uc_di1_cli', ['class' => 'c-field', 'required' => 'true', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label>#</label>
                                                <?= $this->Form->text('uc_di2_cli', ['class' => 'c-field', 'required' => 'true', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label>-</label>
                                                <?= $this->Form->text('uc_di3_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>

                                            <div class="col-md-2" style="padding-left: 0px;">
                                                <label>Tipo Vivienda</label>
                                                <?= $this->Form->select('uc_cod_residencia', [], ['label' => 'Unidad:', 'class' => 'c-field empty']) ?>
                                            </div>

                                            <div class="col-md-3" style="padding-left: 0px;">
                                                <label>Nombre(Unidad,Conjunto,Edificio)</label>
                                                <?= $this->Form->text('uc_unidad', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>

                                            <div class="col-md-2" style="padding-left: 0px;">
                                                <label># Apto ó Casa</label>
                                                <?= $this->Form->text('uc_di4_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pt-8">
                                    <div class="col-md-3 hide">
                                        <label>País: *</label>
                                        <?= $this->Form->select('uc_cod_pai', [], ['class' => 'c-field']) ?>
                                    </div>

                                    <div class="col-md-4">
                                        <label>Dep./Estado: *</label>
                                        <?= $this->Form->select('uc_cod_dep', [], ['id' => 'ucCodDep', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uc_text_cod_dep', ['id' => 'textUcCodDep','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'true']) ?>
                                    </div>

                                    <div class="col-md-4">
                                        <label>Ciudad: *</label>
                                        <?= $this->Form->select('uc_cod_ciu', [], ['id' => 'ucCodCiu', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uc_text_cod_ciu', ['id' => 'textUcCodCiu','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'true']) ?>
                                    </div>
                                    <div class="col-md-3 hide">
                                        <label>Comuna: *</label>
                                        <?= $this->Form->select('uc_cod_comuna', [], ['id' => 'ucCodComuna', 'class' => 'c-field hide']) ?>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Barrio: *</label>
                                        <?= $this->Form->select('uc_cod_barrio', [], ['id' => 'ucCodBarrio', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uc_text_cod_barrio', ['id' => 'textUcCodBarrio','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'true']) ?>
                                    </div>
                                </div>
                                <div class="row pull-right pt-16">
                                    <div class="col-md-12">
                                        <button type="submit" class="btn btn-danger">Actualizar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- / ACTUALIZAR DATOS -->

                    <!-- ACTUALIZAR DATOS OPCIONAL -->
                    <div id="updateClientOptional" style="display:none;">
                        <div class="row b-bottom p-0">
                            <div class="col-md-12 p-0 text-center" style="padding-bottom: 4px;">
                                <h3 class="m-0 tab-title tab-title-main">Actualizar datos del Cliente</h3>
                            </div>
                        </div>
                        <form id="formSeerOptional" class="row mb-0 c-form-group" onsubmit="return false;">
                            <div class="col-md-12">
                                <!-- CAMPOS ADICIONALES -->
                                <?= $this->Form->hidden('uco_envia_call', ['value' => '0']) ?>
                                <?= $this->Form->hidden('uco_val_sol', ['value' => '']) ?>
                                <?= $this->Form->hidden('uco_notas_pos', ['value' => '']) ?>
                                <?= $this->Form->hidden('uco_origen_act', ['value' => 'A']) ?>
                                <?= $this->Form->hidden('uco_tip_sol', ['value' => '01']) ?>

                                <?= $this->Form->hidden('uco_id_biofirma', ['value' => '0']) ?>
                                <?= $this->Form->hidden('uco_id_firma', ['value' => '0']) ?>

                                <?= $this->Form->hidden('uco_dat_laboral', ['value' => '0']) ?>
                                <?= $this->Form->hidden('uco_dat_general', ['value' => '1']) ?>
                                <?= $this->Form->hidden('uco_dat_personal', ['value' => '1']) ?>
                                <?= $this->Form->hidden('uco_update', ['value' => 'on']) ?>
                                <!-- / CAMPOS ADICIONALES -->

                                <!-- GENERALES -->
                                <div class="row b-bottom pl-16 pr-16" style="padding-bottom: 4px;">
                                    <div class="col-md-12 pl-0 pr-0 pt-0 sep mt-0" style="padding-bottom: 4px;">
                                        <h3 class="m-0 tab-title" style="font-size: 20px;">Generales</h3>
                                        <!-- <p style="font-weight: 400;font-size: 18px;">Generales</p> -->
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label>Celular:</label>
                                        <?= $this->Form->text('uco_fax_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-3">
                                        <label>Teléfono:</label>
                                        <?= $this->Form->text('uco_te1_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Email:</label>
                                        <?= $this->Form->text('uco_email', ['class' => 'c-field', 'id' => 'eDomainsOptional']) ?>
                                    </div>
                                </div>
                                <div class="row pt-8">
                                    <div class="col-md-12" id="dircol">
                                        <div class="row">
                                            <div class="col-md-2">
                                                <label>Dirección: *</label>
                                                <?= $this->Form->select('uco_direccion', [''=>'', 'AVE' => 'Avenida','CLL' => 'Calle',
                                                'CRA' => 'Carrera','CIR' => 'Circular',
                                                'DIAG' => 'Diagonal','KM' => 'Kilómetro',
                                                'TR' => 'Transversal'], ['label' => 'Dirección: *', 'class' => 'c-field']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label> </label>
                                                <?= $this->Form->text('uco_di1_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label>#</label>
                                                <?= $this->Form->text('uco_di2_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                            <div class="col-md-1" style="padding-left: 0px;">
                                                <label>-</label>
                                                <?= $this->Form->text('uco_di3_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>

                                            <div class="col-md-2" style="padding-left: 0px;">
                                                <label>Tipo Vivienda</label>
                                                <?= $this->Form->select('uco_cod_residencia', [], ['label' => 'Unidad:', 'class' => 'c-field empty']) ?>
                                            </div>

                                            <div class="col-md-3" style="padding-left: 0px;">
                                                <label>Nombre(Unidad,Conjunto,Edificio)</label>
                                                <?= $this->Form->text('uco_unidad', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>

                                            <div class="col-md-2" style="padding-left: 0px;">
                                                <label># Apto ó Casa</label>
                                                <?= $this->Form->text('uco_di4_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row pt-8">
                                    <div class="col-md-3 hide">
                                        <label>País: *</label>
                                        <?= $this->Form->select('uco_cod_pai', [], ['class' => 'c-field']) ?>
                                    </div>

                                    <div class="col-md-4">
                                        <label>Dep./Estado: *</label>
                                        <?= $this->Form->select('uco_cod_dep', [], ['id' => 'ucoCodDep', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uco_text_cod_dep', ['id' => 'textUcoCodDep','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>

                                    <div class="col-md-4">
                                        <label>Ciudad: *</label>
                                        <?= $this->Form->select('uco_cod_ciu', [], ['id' => 'ucoCodCiu', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uco_text_cod_ciu', ['id' => 'textUcoCodCiu','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                    <div class="col-md-3 hide">
                                        <label>Comuna: *</label>
                                        <?= $this->Form->select('uco_cod_comuna', [], ['id' => 'ucoCodComuna', 'class' => 'c-field hide']) ?>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Barrio: *</label>
                                        <?= $this->Form->select('uco_cod_barrio', [], ['id' => 'ucoCodBarrio', 'class' => 'c-field hide']) ?>
                                        <?= $this->Form->text('uco_text_cod_barrio', ['id' => 'textUcoCodBarrio','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                </div>
                                <!-- / GENERALES -->

                                <!-- REFERENCIAS LABORALES -->
                                <div class="row b-bottom pl-16 pr-16" style="padding-bottom: 4px;">
                                    <div class="col-md-12 pl-0 pr-0 sep mt-0" style="padding-bottom: 4px;">
                                        <h3 class="m-0 tab-title" style="font-size: 20px;">Referencias Laborales</h3>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Empresa:*</label>
                                        <?= $this->Form->text('uco_rl1_nom_emp', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'required']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Indicativo:</label>
                                        <?= $this->Form->text('uco_rl1_ind_telefono', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Teléfono oficina:</label>
                                        <?= $this->Form->text('uco_rl1_telefono', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                    </div>
                                    <div class="col-md-4">
                                        <label>Extensión:</label>
                                        <?= $this->Form->text('uco_rl1_ext', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)']) ?>
                                    </div>
                                </div>
                                <!-- / REFERENCIAS LABORALES -->

                                <!-- REFERENCIAS PERSONALES -->
                                <div class="row b-bottom pl-16 pr-16" style="padding-bottom: 4px;">
                                    <div class="col-md-12 pl-0 pr-0 sep mt-0" style="padding-bottom: 4px;">
                                        <h3 class="m-0 tab-title" style="font-size: 20px;">Referencias Familiares</h3>
                                    </div>
                                </div>
                                <div class="row pt-8" id="ucoRp1">
                                    <div class="col-md-3">
                                        <label>Nombre y Apellidos:*</label>
                                        <?= $this->Form->text('uco_rp1_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Parentesco:*</label>
                                        <?= $this->Form->select('uco_rp1_parentesco', [], ['class' => 'c-field', 'label' => 'Parentesco:']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Móvil:</label>
                                        <?= $this->Form->text('uco_rp1_cel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Indicativo:</label>
                                        <?= $this->Form->text('uco_rp1_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Fijo:</label>
                                        <?= $this->Form->text('uco_rp1_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                    </div>
                                    <div class="col-md-1">
                                        <label>&nbsp;</label>
                                        <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlSeerOptional.clearRp('1')">close</i>
                                    </div>
                                </div>
                                <div class="row pt-8" id="ucoRp2">
                                    <div class="col-md-3">
                                        <label>Nombre y Apellidos:*</label>
                                        <?= $this->Form->text('uco_rp2_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Parentesco:*</label>
                                        <?= $this->Form->select('uco_rp2_parentesco', [], ['class' => 'c-field', 'label' => 'Parentesco:']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Móvil:</label>
                                        <?= $this->Form->text('uco_rp2_cel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Indicativo:</label>
                                        <?= $this->Form->text('uco_rp2_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Fijo:</label>
                                        <?= $this->Form->text('uco_rp2_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                    </div>
                                    <div class="col-md-1">
                                        <label>&nbsp;</label>
                                        <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlSeerOptional.clearRp('2')">close</i>
                                    </div>
                                </div>
                                <div class="row pt-8" id="ucoRp3">
                                    <div class="col-md-3">
                                        <label>Nombre y Apellidos:*</label>
                                        <?= $this->Form->text('uco_rp3_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Parentesco:*</label>
                                        <?= $this->Form->select('uco_rp3_parentesco', [], ['class' => 'c-field', 'label' => 'Parentesco:']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Móvil:</label>
                                        <?= $this->Form->text('uco_rp3_cel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Indicativo:</label>
                                        <?= $this->Form->text('uco_rp3_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Fijo:</label>
                                        <?= $this->Form->text('uco_rp3_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                    </div>
                                    <div class="col-md-1">
                                        <label>&nbsp;</label>
                                        <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlSeerOptional.clearRp('3')">close</i>
                                    </div>
                                </div>
                                <div class="row pt-8" id="ucoRp4" style="display:none;">
                                    <div class="col-md-3">
                                        <label>Nombre y Apellidos:*</label>
                                        <?= $this->Form->text('uco_rp4_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Parentesco:*</label>
                                        <?= $this->Form->select('uco_rp4_parentesco', [], ['class' => 'c-field', 'label' => 'Parentesco:']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Móvil:</label>
                                        <?= $this->Form->text('uco_rp4_cel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Indicativo:</label>
                                        <?= $this->Form->text('uco_rp4_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Teléfono Fijo:</label>
                                        <?= $this->Form->text('uco_rp4_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                    </div>
                                    <div class="col-md-1">
                                        <label>&nbsp;</label>
                                        <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlSeerOptional.clearRp('3')">close</i>
                                    </div>
                                </div>
                                <div class="row pt-16" id="ucoBNewRp">
                                    <div class="col-md-12 text-right">
                                        <button type="button" name="button" class="button-radio" onclick="iCtrlSeerOptional.newRp()">+</button>
                                    </div>
                                </div>
                                <!-- / REFERENCIAS PERSONALES -->

                                <!-- <div class="row">
                                    <div class="col-md-12">&nbsp;</div>
                                </div> -->

                                <!-- Solicitudes, solicitud cupo -->
                                <!-- Cupo - A -->
                                <!-- Poner la cuarta -->
                                <!-- Referencia laborales solo insertar el registro en la historia -->

                                <!-- <div class="row pull-right pt-16">
                                    <div class="col-md-12">
                                        <div class="" style="display:flex;justify-content:space-between;align-items:center;">
                                            <div class="mr-auto" style="display: inline-flex;">
                                                <-?= $this->Html->link('Cancelar', ['controller' => 'Pages', 'action' => 'nueva_solicitud'], ['escape' => false, 'class' => 'btn btn-cancel btn-fill btn-default btn-wd fs-16 pt-8 pb-8 pl-12 pr-12']) ?->
                                            </div>
                                            <div class="ml-auto" style="display: inline-flex;">
                                                <button type="submit" class="btn btn-danger">Actualizar</button>
                                            </div>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div> -->



                                <div class="row b-bottom pl-16 pr-16 containercc" style="padding-bottom: 4px;">
                                    <div class="col-md-12 pl-0 pr-0 sep mt-0" style="padding-bottom: 4px;">
                                        <h3 class="m-0 tab-title" style="font-size: 20px;">Cédula</h3>
                                    </div>
                                </div>
                            

                                <div class="files-container p-5 containercc">
                                    <div class="row">
                                        <div class="col col-md-12" id='cedulaIntegra'>
                                            <label class="file-zone c-disabled" for="sideA">
                                                <div class="drop-zone">Dar click para buscar archivos y adjuntar los dos lados de la CÉDULA</div>
                                                <input id="sideA2" name="side_a" type="file" accept="image/*" onchange="readURL(this, ['sideA','sideB'], ['bSideA2','bSideB2']);" multiple="">
                                            </label>
                                        </div>
                                        <div class="col col-md-6">
                                            <div class="">&nbsp;</div>
                                            <div class="preview-file">
                                                <img id="bSideA2" class="" />
                                            </div>
                                        </div>
                                        <div class="col col-md-6">                                          
                                            <div class="">&nbsp;</div>
                                            <div class="preview-file">
                                                <img id="bSideB2" class="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>


                            
                            

                    


                            <div class="card-footer pt-0 mt-0 w-100" style="display: block;">
                                <div class="" style="display:flex;justify-content:space-between;align-items:center;">
                                    <div class="mr-auto" style="display: inline-flex;">
                                        <?= $this->Html->link('Cancelar', ['controller' => 'Pages', 'action' => 'nueva_solicitud'], ['escape' => false, 'class' => 'btn btn-cancel btn-fill btn-default btn-wd fs-16 pt-8 pb-8 pl-12 pr-12']) ?>
                                    </div>
                                    <div class="ml-auto" style="display: inline-flex;">
                                        <button type="submit" class="btn btn-danger">Actualizar</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!-- / ACTUALIZAR DATOS OPCIONAL -->

                    <!-- WIZARD DE FORMULARIOS -->
                    <!-- $this->Form->create('ModelName');
                    $this->Form->input('ModelName.fieldname', array('type'=>'text', 'label'=>'Modified-Name'));
                    $this->Form->end(__('Submit')); -->
                    <?= $this->Form->create('formWizard', ['id' => 'formWizard', 'class' => 'c-form-group', 'method' => 'POST', 'novalidate' => 'novalidate', 'autocomplete' => 'off', 'style' => 'display:none;']) ?>
                    <!-- <form id="formWizard" action="" method="" novalidate="novalidate" > -->
                        <div id="wNavigation" class="wizard-navigation">
                            <ul class="nav nav-pills">
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link active show"
                                    href="#perfil" data-toggle="tab"
                                    data-id-tab="perfil"
                                    role="tab" aria-selected="true">Determina tu perfil</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#generales" data-toggle="tab"
                                    data-id-tab="generales"
                                    role="tab" aria-selected="false">Generales</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#ref-laborales" data-toggle="tab"
                                    data-id-tab="ref-laborales"
                                    role="tab" aria-selected="false">Ref Laborales</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#ref-comerciales" data-toggle="tab"
                                    data-id-tab="ref-comerciales"
                                    role="tab" aria-selected="false">Ref Comerciales</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#ref-personales" data-toggle="tab"
                                    data-id-tab="ref-personales"
                                    role="tab" aria-selected="false">Ref Personales</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#cedula" data-toggle="tab"
                                    data-id-tab="cedula"
                                    role="tab" aria-selected="false">Cédula</a>
                                </li>

                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#aut-centrales" data-toggle="tab"
                                    data-id-tab="aut-centrales"
                                    role="tab" aria-selected="false">Autorización Centrales</a>
                                </li>

                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#huella" data-toggle="tab"
                                    data-id-tab="huella"
                                    role="tab" aria-selected="false">Huella</a>
                                </li>
                               
                                
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#codeudor" data-toggle="tab"
                                    data-id-tab="codeudor"
                                    role="tab" aria-selected="false">Codeudor</a>
                                </li>
                                <li class="nav-item col-md-3" style="padding: 0;">
                                    <a class="nav-link show"
                                    href="#resultado" data-toggle="tab"
                                    data-id-tab="resultado"
                                    role="tab" aria-selected="false">Resultado</a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body pb-0 pt-0">
                            <div class="tab-content" style="padding-top: 0px;">
                                <!-- DEFINE TU PERFIL -->
                                <div class="tab-pane active show" id="perfil">
                                    <div id='viewDataCredito' >
                                        <div class='row'>
                                            <div class='col-md-5'></div>
                                            <div class="col-md-2 col-sm-offset-3">
                                                <label>Documento: *</label>
                                                <?= $this->Form->text('identificacion', ['class' => 'c-field', 'id'=>'identificacionDT', 'readonly' => 'readonly']) ?>
                                            </div>
                                        </div>

                                        <div class='row mt-3'>
                                            <div class="col-md-4"></div>

                                            <div class="col-md-2">
                                                <label>Tipo de  Identificacion: *</label>
                                                <?= $this->Form->select('tipoIdentificacion', [
                                                    '1' => 'Cédula de Ciudadania',
                                                    '2' => 'Nit',
                                                    '3' => 'Nit  de Extranjería',
                                                    '4' => 'Cédula de Extranjería',
                                                   ], ['class' => 'c-field', 'id'=>'tipoIdentificacionDT']) ?>
                                            </div>

                                            <div class="col-md-2 col-sm-offset-3">
                                                <label>Primer Apellido: *</label>
                                                <?= $this->Form->text('primerApellido', ['class' => 'c-field', 'id'=>'primerApellidoDT', 'onkeyup'=>"onlyUpperCase(this)"]) ?>
                                            </div>

                                            <div class='col-md-12 text-center mt-3'>
                                                <button type='button' onClick='iCtrlSeer.onSubmitGetDataCredito()' class="btn btn-fill btn-danger btn-wd ">Consultar</button>
                                            </div>


                                        </div>



                                    </div>

                                    <div id="definePerfil" style='display:none'>
                                        <div class="row">
                                            <div class="col">
                                                <h3 class="m-0 tab-title">Define tu perfil</h3>
                                                <p class="fs-16">Selecciona las opciones donde aplique el cliente</p>
                                            </div>
                                        </div>
                                        <div class="questions-container">
                                            <h3 class="question-divider">Actualmente Tienes?</h3>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_comercial" id="pIndComercial">
                                                        <label class="custom-control-label text-black fs-16" for="pIndComercial">Referencias Comerciales</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_histcrediti" id="pIndHistcrediti">
                                                        <label class="custom-control-label text-black fs-16" for="pIndHistcrediti">Referencia Financiera</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <br>
                                            <h3 class="question-divider">A que te dedicas?</h3>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_laboral" id="pIndLaboral">
                                                        <label class="custom-control-label text-black fs-16" for="pIndLaboral">Empleado</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_pensionado" id="pIndPensionado">
                                                        <label class="custom-control-label text-black fs-16" for="pIndPensionado">Pensionado</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_independiente" id="pIndIndependiente2">
                                                        <label class="custom-control-label text-black fs-16" for="pIndIndependiente2">Independiente</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_estudiante" id="pIndEstudiante">
                                                        <label class="custom-control-label text-black fs-16" for="pIndEstudiante">Estudiante</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_amacasa" id="pIndAmacasa">
                                                        <label class="custom-control-label text-black fs-16" for="pIndAmacasa">Ama de Casa</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <br>
                                            <h3 class="question-divider">Perfiles opcionales?</h3>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_credito_cedula" id="pIndCreditoCedula" onchange="iCtrlWizard.validInicio('p_ind_credito_cedula')">
                                                        <label class="custom-control-label text-black fs-16" for="pIndCreditoCedula">Crédito con cédula(Monto mínimo)</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                            <div class="question-item">
                                                <div class="question-summary custom-control custom-checkbox">
                                                    <div class="desc-question">
                                                        <input type="checkbox" class="custom-control-input" name="p_ind_credito_codeudor" id="pIndCreditoCodeudor" onchange="iCtrlWizard.validInicio('p_ind_credito_codeudor')">
                                                        <label class="custom-control-label text-black fs-16" for="pIndCreditoCodeudor">Crédito con codeudor</label>
                                                    </div>
                                                </div>
                                                <div class="question-content"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <!-- / DEFINE TU PERFIL -->

                                <!-- GENERALES -->
                                <div class="tab-pane show" id="generales">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar la información del cliente</h3>
                                            <p class="fs-16 m-0">Los campos con * son obligatiorios diligenciarlos</p>
                                        </div>
                                    </div>
                                    <div class="row pb-16">
                                        <div class="col fs-16">
                                            <b>Define tu perfil: </b><span class="profiles-selected">Ninguno seleccionado</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="">Tipo de ID: *</label>
                                            <?= $this->Form->hidden('update', ['value' => 'off']) ?>
                                            <?= $this->Form->hidden('dat_general', ['value' => '1']) ?>
                                            <?= $this->Form->hidden('dat_personal', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('dat_laboral', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('dat_comercial', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('id_biofirma', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('id_firma', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('envia_call', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('foto_cedula', ['value' => '0']) ?>
                                            <?= $this->Form->hidden('origen_act', ['value' => '']) ?>
                                            <?= $this->Form->hidden('tip_sol', ['value' => '']) ?>
                                            <?= $this->Form->hidden('inicio', ['value' => '0']) ?>
                                            <?= $this->Form->select('tip_ide', ['01' => 'Cédula de Ciudadania','02' => 'Cédula de Extranjería','03' => 'Tarjeta de Identidad','06' => 'Pasaporte'], ['label' => 'Tipo de ID: *', 'required' => 'required', 'class' => 'c-field']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Documento: *</label>
                                            <?= $this->Form->text('cod_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'readonly' => 'readonly']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>De: *</label>
                                            <?= $this->Form->text('nit_ciu', ['class' => 'c-field', 'placeholder' => 'Expedido en', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>

                                        <div class="col-md-3" id="bircol">
                                            <label>Fecha de Nacimiento: *</label>
                                            <?= $this->Form->text('fec_nac', ['class' => 'c-field', 'onblur' => 'iCtrlWizard.onChangeBirthdate(this)', 'placeholder' => 'DD/MM/AAAA']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Edad: (años) *</label>
                                            <?= $this->Form->text('edad', ['class' => 'c-field', 'readonly' => 'readonly']) ?>
                                        </div>

                                        <div class="col-md-3">
                                            <label>1er. Nombre: *</label>
                                            <?= $this->Form->text('nom1_cli', ['label' => '1er. Nombre: *', 'class' => 'c-field n1', 'onkeyup' => 'onlyUpperCase(this)']) ?>

                                        </div>

                                        <div class="col-md-3">
                                            <label>2do. Nombre:</label>
                                            <?= $this->Form->text('nom2_cli', ['class' => 'c-field n2', 'onkeyup' => 'onlyUpperCase(this)']) ?>

                                        </div>

                                        <div class="col-md-3">
                                            <label>1er. Apellido: *</label>
                                            <?= $this->Form->text('ap1_cli', ['class' => 'c-field a1', 'onkeyup' => 'onlyUpperCase(this)']) ?>

                                        </div>

                                        <div class="col-md-3">
                                            <label>2do. Apellido:</label>
                                            <?= $this->Form->text('ap2_cli', ['class' => 'c-field a2', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>

                                        <div class="col-md-3">
                                            <label>Tel. Móvil: *</label>
                                            <?= $this->Form->text('fax_cli', ['class' => 'c-field c1', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                        </div>

                                        <div class="col-md-3" style="padding-right: 0;">
                                            <label>Tel. Fijo:*</label>
                                            <?= $this->Form->text('te1_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                        </div>

                                        <div class="col-md-3" style="padding-right: 0;">
                                            <label>Tel. Opcional</label>
                                            <?= $this->Form->text('te2_cli', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                        </div>

                                        <div class="col-md-3" id="sexcol">
                                            <label>Sexo: *</label>
                                            <?= $this->Form->select('sexo', ['' => 'SELECCIONAR...', '1'=> 'Mujer', '2' => 'Hombre'],['label' => 'Sexo: *', 'class' => 'c-field empty']) ?>
                                        </div>

                                        <div class="col-md-3 hide">
                                            <label>Estado Civil: *</label>
                                            <?= $this->Form->select('est_civ', ['' => 'SELECCIONAR...', '1' => 'Soltero (a)','2' => 'Casado (a)','3' => 'Union Libre','4' => 'Viudo','5' => 'Divorciado'],['label' => 'Estado Civil: *', 'class' => 'c-field empty', 'value' => '0']) ?>
                                        </div>

                                        <div class="col-md-6">
                                            <label>Email:</label>
                                            <?= $this->Form->text('email', ['class' => 'c-field e1', 'id' => 'eDomains']) ?>

                                        </div>

                                        <div class="col-md-3">
                                            <label>Ocupación ó profesión:</label>
                                            <?= $this->Form->select('ocup_cli', [], ['id' => 'ocupCli','class' => 'c-field hide','placeholder' => 'SELECCIONAR...']) ?>
                                            <?= $this->Form->text('text_ocup_cli', ['id' => 'textOcupCli', 'class' => 'c-field', 'placeholder' => 'SELECCIONAR...', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                            <!-- rl1_cargo -->
                                        </div>

                                        <div class="col-md-3">
                                            <label>Perfil:</label>
                                            <?= $this->Form->text('perfil', ['class' => 'c-field', 'readonly' => 'readonly']) ?>
                                        </div>

                                        <div class="col-md-12" id="dircol">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <label>Dirección: *</label>
                                                    <?= $this->Form->select('direccion', [''=>'', 'AVE' => 'Avenida','CLL' => 'Calle',
                                                    'CRA' => 'Carrera','CIR' => 'Circular',
                                                    'DIAG' => 'Diagonal','KM' => 'Kilómetro',
                                                    'TR' => 'Transversal'], ['label' => 'Dirección: *', 'class' => 'c-field', 'required' => 'true']) ?>
                                                </div>
                                                <div class="col-md-1" style="padding-left: 0px;">
                                                    <label> </label>
                                                    <?= $this->Form->text('di1_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'true']) ?>
                                                </div>
                                                <div class="col-md-1" style="padding-left: 0px;">
                                                    <label>#</label>
                                                    <?= $this->Form->text('di2_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'true']) ?>
                                                </div>
                                                <div class="col-md-1" style="padding-left: 0px;">
                                                    <label>-</label>
                                                    <?= $this->Form->text('di3_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                                </div>

                                                <div class="col-md-2" style="padding-left: 0px;">
                                                    <label>Tipo Vivienda</label>
                                                    <?= $this->Form->select('cod_residencia', [], ['label' => 'Unidad:', 'class' => 'c-field empty']) ?>
                                                </div>

                                                <div class="col-md-3" style="padding-left: 0px;">
                                                    <label>Nombre(Unidad,Conjunto,Edificio)</label>
                                                    <?= $this->Form->text('unidad', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                                </div>

                                                <div class="col-md-2" style="padding-left: 0px:">
                                                    <label># Apto ó Casa</label>
                                                    <?= $this->Form->text('di4_cli', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3 hide">
                                            <label>País: *</label>
                                            <?= $this->Form->select('cod_pai', [], ['label' => 'País: *', 'class' => 'c-field']) ?>
                                        </div>

                                        <div class="col-md-4">
                                            <label>Dep./Estado: *</label>
                                            <?= $this->Form->select('cod_dep', [], ['id' => 'codDep', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_cod_dep', ['id' => 'textCodDep','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>

                                        <div class="col-md-4">
                                            <label>Ciudad: *</label>
                                            <?= $this->Form->select('cod_ciu', [], ['id' => 'codCiu', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_cod_ciu', ['id' => 'textCodCiu','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-3 hide">
                                            <label>Comuna: *</label>
                                            <?= $this->Form->select('cod_comuna', [], ['id' => 'codComuna', 'class' => 'c-field hide']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Barrio: *</label>
                                            <?= $this->Form->select('cod_barrio', [], ['id' => 'codBarrio', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_cod_barrio', ['id' => 'textCodBarrio','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                    </div>
                                </div>
                                <!-- / GENERALES -->

                                <!-- REF LABORALES -->
                                <div class="tab-pane" id="ref-laborales">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar los datos del empleo</h3>
                                            <p class="fs-16">Los campos con * son obligatiorios diligenciarlos</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Empresa:*</label>
                                            <?= $this->Form->text('rl1_nom_emp', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'required']) ?>
                                        </div>
                                        <!-- <div class="col-md-4">
                                            <label>Cargo:</label>
                                            $this->Form->text('rl1_cargo', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)'])
                                        </div> -->
                                        <!-- <div class="col-md-4">
                                            <label>Area:</label>
                                            $this->Form->text('rl1_area', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'required'])
                                        </div> -->

                                        <div class="col-md-2">
                                            <label>Indicativo:</label>
                                            <?= $this->Form->text('rl1_ind_telefono', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Teléfono oficina:</label>
                                            <?= $this->Form->text('rl1_telefono', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Extensión:</label>
                                            <?= $this->Form->text('rl1_ext', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)']) ?>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <label>Nota:</label>
                                            $this->Form->text('rl1_nota', ['class' => 'c-field'])
                                        </div> -->
                                    </div>
                                </div>
                                <!-- / REF LABORALES -->

                                <!-- REF COMERCIALES -->
                                <div class="tab-pane" id="ref-comerciales">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar las referencias comerciales</h3>
                                            <p class="fs-16">Los campos con * son obligatiorios diligenciarlos</p>
                                        </div>
                                    </div>
                                    <div class="row" id="rc1">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 1:</p>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Almacén:</label>
                                            <?= $this->Form->select('rc1_codigo', [], ['id' => 'rc1Codigo', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_rc1_codigo', ['id' => 'textRc1Codigo','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Estado de Cuenta:</label>
                                            <?= $this->Form->select('rc1_estado', ['CANCELADA' => 'Cancelado', 'PAGANDO' => 'Pagando'], ['label' => 'Estado de Cuenta:', 'class' => 'c-field']) ?>
                                        </div>
                                    </div>
                                    <div class="row" id="rc2">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 2:</p>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Almacén:</label>
                                            <?= $this->Form->select('rc2_codigo', [], ['id' => 'rc2Codigo', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_rc2_codigo', ['id' => 'textRc2Codigo','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Estado de Cuenta:</label>
                                            <?= $this->Form->select('rc2_estado', ['CANCELADA' => 'Cancelado', 'PAGANDO' => 'Pagando'], ['label' => 'Estado de Cuenta:', 'class' => 'c-field']) ?>
                                        </div>
                                    </div>
                                    <div class="row" id="rc3" style="display:none;">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 3:</p>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Almacén:</label>
                                            <?= $this->Form->select('rc3_codigo', [], ['id' => 'rc3Codigo', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_rc3_codigo', ['id' => 'textRc3Codigo','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Estado de Cuenta:</label>
                                            <?= $this->Form->select('rc3_estado', ['CANCELADA' => 'Cancelado', 'PAGANDO' => 'Pagando'], ['label' => 'Estado de Cuenta:', 'class' => 'c-field']) ?>
                                        </div>
                                    </div>
                                    <div class="row" id="rc4" style="display:none;">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 4:</p>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Almacén:</label>
                                            <?= $this->Form->select('rc4_codigo', [], ['id' => 'rc4Codigo', 'class' => 'c-field hide']) ?>
                                            <?= $this->Form->text('text_rc4_codigo', ['id' => 'textRc4Codigo','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-6">
                                            <label>Estado de Cuenta:</label>
                                            <?= $this->Form->select('rc4_estado', ['CANCELADA' => 'Cancelado', 'PAGANDO' => 'Pagando'], ['label' => 'Estado de Cuenta:', 'class' => 'c-field']) ?>
                                        </div>
                                    </div>
                                    <div class="row pt-16" id="bNewRc">
                                        <div class="col-md-12 text-right">
                                            <button type="button" name="button" class="button-radio" onclick="iCtrlWizard.newRc()">+</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- / REF COMERCIALES -->

                                <!-- REF PERSONALES -->
                                <div class="tab-pane" id="ref-personales">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar las referencias personales</h3>
                                            <p class="fs-16">Los campos con * son obligatiorios diligenciarlos</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-md-12 text-center">
                                            <p class="text-danger fs-18 m-0"><b>Ingrese mínimo 3 referencias personales que se puedan contactar en el momento.</b></p>
                                        </div>
                                    </div>
                                    <div class="row" id="rp1">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 1:<span id="rp1NotaCall"></span></p>
                                        </div>
                                        <div class="col-md-3">
                                            <label>Nombre y Apellidos:*</label>
                                            <?= $this->Form->text('rp1_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Parentesco:*</label>
                                            <?= $this->Form->select('rp1_parentesco', [], ['class' => 'c-field', 'label' => 'Parentesco:']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Móvil:</label>
                                            <?= $this->Form->text('rp1_cel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '10']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Indicativo:</label>
                                            <?= $this->Form->text('rp1_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Fijo:</label>
                                            <?= $this->Form->text('rp1_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '7']) ?>
                                        </div>
                                        <div class="col-md-1">
                                            <label>&nbsp;</label>
                                            <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlWizard.clearRp('1')">close</i>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <label>Nota:</label>
                                            $this->Form->text('rp1_nota', ['class' => 'c-field'])
                                        </div> -->
                                    </div>
                                    <div class="row" id="rp2">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 2:<span id="rp2NotaCall"></span></p>
                                        </div>
                                        <div class="col-md-3">
                                            <label>Nombre y Apellidos:*</label>
                                            <?= $this->Form->text('rp2_nombre',['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Parentesco:*</label>
                                            <?= $this->Form->select('rp2_parentesco', [], ['label' => 'Parentesco:', 'class' => 'c-field']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Móvil:</label>
                                            <?= $this->Form->text('rp2_cel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '10']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Indicativo:</label>
                                            <?= $this->Form->text('rp2_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Fijo:</label>
                                            <?= $this->Form->text('rp2_tel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '7']) ?>
                                        </div>
                                        <div class="col-md-1">
                                            <label>&nbsp;</label>
                                            <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlWizard.clearRp('2')">close</i>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <label>Nota:</label>
                                            $this->Form->text('rp2_nota', ['class' => 'c-field'])
                                        </div> -->
                                    </div>
                                    <div class="row" id="rp3">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 3:<span id="rp3NotaCall"></span></p>
                                        </div>
                                        <div class="col-md-3">
                                            <label>Nombre y Apellidos:</label>
                                            <?= $this->Form->text('rp3_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Parentesco:</label>
                                            <?= $this->Form->select('rp3_parentesco', [], ['label' => 'Parentesco:', 'class' => 'c-field']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Móvil:</label>
                                            <?= $this->Form->text('rp3_cel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '10']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Indicativo:</label>
                                            <?= $this->Form->text('rp3_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Fijo:</label>
                                            <?= $this->Form->text('rp3_tel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '7']) ?>
                                        </div>
                                        <div class="col-md-1">
                                            <label>&nbsp;</label>
                                            <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlWizard.clearRp('3')">close</i>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <label>Nota:</label>
                                            $this->Form->text('rp3_nota', ['class' => 'c-field'])
                                        </div> -->
                                    </div>
                                    <div class="row" id="rp4" style="display:none;">
                                        <div class="col-md-12 sep">
                                            <p>Referencia 4:<span id="rp4NotaCall"></span></p>
                                        </div>
                                        <div class="col-md-3">
                                            <label>Nombre y Apellidos:</label>
                                            <?= $this->Form->text('rp4_nombre', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Parentesco:</label>
                                            <?= $this->Form->select('rp4_parentesco', [], ['label' => 'Parentesco:', 'class' => 'c-field']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Móvil:</label>
                                            <?= $this->Form->text('rp4_cel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '10']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Indicativo:</label>
                                            <?= $this->Form->text('rp4_ind_tel', ['class' => 'c-field', 'onkeypress' => 'return isNumber(event)', 'maxlength' => '3']) ?>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Teléfono Fijo:</label>
                                            <?= $this->Form->text('rp4_tel', ['onkeypress' => 'return isNumber(event)', 'class' => 'c-field', 'maxlength' => '7']) ?>
                                        </div>
                                        <div class="col-md-1">
                                            <label>&nbsp;</label>
                                            <i class="material-icons pointer text-danger radio-button" data-index-pdf="" onclick="iCtrlWizard.clearRp('4')">close</i>
                                        </div>
                                        <!-- <div class="col-md-12">
                                            <label>Nota:</label>
                                            $this->Form->text('rp4_nota', ['class' => 'c-field'])
                                        </div> -->
                                    </div>
                                    <div class="row pt-16" id="bNewRp">
                                        <div class="col-md-12 text-right">
                                            <button type="button" name="button" class="button-radio" onclick="iCtrlWizard.newRp()">+</button>
                                        </div>
                                    </div>
                                </div>
                                <!-- / REF PERSONALES -->

                                <!-- HUELLA -->
                                <div class="tab-pane" id="huella">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar huellas del Cliente</h3>
                                            <p class="fs-16"></p>
                                        </div>
                                    </div>
                                    <div class="row row-questions text-left">
                                        <div class="col col-md-6">
                                            <div class="">
                                                <div class="table-responsive">
                                                    <table id="dataTableRegFP" class="table">
                                                        <thead class=" text-danger">
                                                            <th>Creación Huella</th>
                                                            <th>Dedo</th>
                                                            <th>Empresa</th>
                                                            <th>Caja</th>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="">
                                                <div class="table-responsive">
                                                    <table id="dataTableHistFP" class="table">
                                                        <thead class=" text-danger">
                                                            <th>Fecha Valida</th>
                                                            <th>Empresa</th>
                                                            <th>Caja</th>
                                                            <th>Tipo</th>
                                                            <th>Validación</th>
                                                            <th>Modulo</th>
                                                        </thead>
                                                        <tbody></tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-md-6 text-center">
                                            <div class="col-12 text-center">
                                                <p class="fs-16">Seleccione los dedos a registrar (Uno por cada mano)</p>
                                            </div>
                                            <div class="col-12 text-center">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div id="listFpLeft" class="">&nbsp;</div>
                                                    </div>
                                                    <div class="col-6">
                                                        <div id="listFpRight" class="">&nbsp;</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="hands">
                                                <div id="handLeft">
                                                    <div id="finger6" class="finger" data-finger="6" onclick="iCtrlWizard.onFinger('6')">&nbsp;</div>
                                                    <div id="finger7" class="finger" data-finger="7" onclick="iCtrlWizard.onFinger('7')">&nbsp;</div>
                                                    <div id="finger8" class="finger" data-finger="8" onclick="iCtrlWizard.onFinger('8')">&nbsp;</div>
                                                    <div id="finger9" class="finger" data-finger="9" onclick="iCtrlWizard.onFinger('9')">&nbsp;</div>
                                                    <div id="finger10" class="finger" data-finger="10" onclick="iCtrlWizard.onFinger('10')">&nbsp;</div>
                                                    <div id="palmLeft">&nbsp;</div>
                                                </div>
                                                <div id="handRight">
                                                    <div id="finger1" class="finger" data-finger="1" onclick="iCtrlWizard.onFinger('1')">&nbsp;</div>
                                                    <div id="finger2" class="finger" data-finger="2" onclick="iCtrlWizard.onFinger('2')">&nbsp;</div>
                                                    <div id="finger3" class="finger" data-finger="3" onclick="iCtrlWizard.onFinger('3')">&nbsp;</div>
                                                    <div id="finger4" class="finger" data-finger="4" onclick="iCtrlWizard.onFinger('4')">&nbsp;</div>
                                                    <div id="finger5" class="finger" data-finger="5" onclick="iCtrlWizard.onFinger('5')">&nbsp;</div>
                                                    <div id="palmRight">&nbsp;</div>
                                                </div>
                                            </div>
                                           
                                            <div class="col-4 offset-8 text-center">
                                                <div id="dermatitis" class='dermatitis'>
                                                    <input type="checkbox"  value='1' id="dermatitisInput">
                                                    <label for="dermatitisInput">Dermatitis</label>
                                                </div>
                                            </div>

                                            <div class="col-12 text-center">&nbsp;</div>
                                            <div class="col-12 text-center">&nbsp;</div>

                                            <div class="col-12 text-center">
                                                <button type="button" id='btn-hands' name="button" class="btn btn-cancel btn-fill btn-default" onclick="iCtrlWizard.registerFingerprints()">
                                                    Registrar huella(s)
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!-- / HUELLA -->

                                <!-- CEDULA -->
                                <div class="tab-pane" id="cedula">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Ingresar cédula del Cliente</h3>
                                            <p class="fs-16">Los campos con * son obligatiorios diligenciarlos</p>
                                        </div>
                                    </div>
                                    <div class="row row-questions text-center">
                                        <div class="col col-md-4 item-answer">&nbsp;</div>
                                        <div class="col col-md-4 item-answer">&nbsp;</div>
                                        <div class="col col-md-4 item-answer">
                                            <span class="tag-title">Cliente Firma:</span>
                                            <span class="tag-desc">&nbsp;
                                                <label for="">Sí <input type="radio" name="cliente_firma" value="si" checked></label>&nbsp;&nbsp;
                                                <label for="">No <input type="radio" name="cliente_firma" value="no"></label>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-md-8">
                                            <div class="files-container pt-16">
                                                <div class="row">
                                                    <div class="col col-md-12">
                                                        <label class="file-zone" for="sideA">
                                                            <div class="drop-zone">Dar click para buscar archivos y adjuntar los dos lados de la CÉDULA</div>
                                                            <input id="sideA" name="side_a" type='file' accept="image/*" onchange="readURL(this, ['sideA','sideB'], ['bSideA','bSideB']);" multiple/>
                                                        </label>
                                                    </div>
                                                    <div class="col col-md-6">
                                                        <div class="">&nbsp;</div>
                                                        <div class="preview-file">
                                                            <img id="bSideA" class="hide" src="" alt="preview-file"/>
                                                        </div>
                                                    </div>
                                                    <div class="col col-md-6">
                                                        <!-- <label class="file-zone" for="sideB">
                                                            <div class="drop-zone">Lado B</div>
                                                            <input id="sideB" name="side_b" type='file' accept="image/*" onchange="readURL(this, 'sideB', 'bSideB');"/>
                                                        </label> -->
                                                        <div class="">&nbsp;</div>
                                                        <div class="preview-file">
                                                            <img id="bSideB" class="hide" src="" alt="preview-file"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row hide">
                                                    <button type="button" name="button" class="button-radio" onclick="iCtrlWizard.onSubmitDocuments()">
                                                        <i class="material-icons" style="line-height: 1.5;">cloud_upload</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-md-4">
                                            <div class="row pt-16">
                                                <div class="col text-center">
                                                    <h2 class="m-0 tab-title fs-22">Otros Documentos</h2>
                                                    <p id="alertAttached" class="text-danger m-0 hide">Ingrese mínimo un adjunto</p>
                                                </div>
                                            </div>
                                            <div class="row files-container pt-8">
                                                <div class="col">
                                                    <label class="file-zone" for="attached1">
                                                        <div class="drop-zone"><b>Dar click para buscar</b> Adjunto 1</div>
                                                        <input id="attached1" name="attached_1" type='file' accept="image/*" onchange="readURL(this, ['attached1'], ['prevAttached1']);"/>
                                                    </label>
                                                    <div class="fs-16" style="line-height: 1;">&nbsp;</div>
                                                    <label class="file-zone" for="attached2">
                                                        <div class="drop-zone"><b>Dar click para buscar</b> Adjunto 2</div>
                                                        <input id="attached2" name="attached_2" type='file' accept="image/*" onchange="readURL(this, ['attached2'], ['prevAttached2']);"/>
                                                    </label>
                                                    <div class="fs-8" style="line-height: 1;">&nbsp;</div>
                                                    <div class="text-center">
                                                        <button type="button" name="button" class="button-radio" onclick="iCtrlWizard.saveAttached()">
                                                            <i class="material-icons" style="font-size: 24px;line-height: 1.4;">save</i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row" style="padding: 4px;"></div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="prevAttached1" src="" alt="" class="w-100 pointer" onclick="iCtrlWizard.openModalAm(this)">
                                                </div>
                                                <div class="col-6">
                                                    <img id="prevAttached2" src="" alt="" class="w-100 pointer" onclick="iCtrlWizard.openModalAm(this)">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- / CEDULA -->

                                <!-- AUTORIZACION CENTRALES -->
                                <div class="tab-pane" id="aut-centrales">
                                    <div class="row">
                                        <div class="col">
                                            <!-- <h3 class="m-0 tab-title">Autorización Tratamiento Datos</h3> -->
                                            <h3 class="m-0 tab-title">Consentimientos</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col col-md-4 text-center">
                                            <div class="row">
                                                <div class="col col-md-12 text-center">
                                                    <h4>&nbsp;</h4>
                                                    <!-- <h4>Autorización centrales de datos</h4> -->
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col col-md-12 text-center">
                                                    <h5>Sep 12 2018 5:52 PM</h5>
                                                </div>
                                            </div>
                                            <div class="row files-container">
                                                <div class="col">
                                                    <label class="file-zone" for="autManual001">
                                                        <div class="drop-zone">Autorización Tratamiento Datos</div>
                                                        <input id="autManual001" name="aut_manual_001" type='file' accept="image/*" onchange="readURL(this, ['autManual001'], ['prevAutManual005']);"/>
                                                    </label>
                                                    <div class="fs-16" style="line-height: 1;">&nbsp;</div>
                                                    <label class="file-zone" for="autManual005">
                                                        <div class="drop-zone">Consentimiento Tratamiento Datos</div>
                                                        <input id="autManual005" name="aut_manual_005" type='file' accept="image/*" onchange="readURL(this, ['autManual005'], ['prevAutManual006']);"/>
                                                    </label>
                                                    <div class="fs-16" style="line-height: 1;">&nbsp;</div>
                                                    <label class="file-zone hide" for="autManual006">
                                                        <div class="drop-zone">Acuerdo Comunicación Electronica</div>
                                                        <input id="autManual006" name="aut_manual_006" type='file' accept="image/*" onchange="readURL(this, ['autManual006'], [null]);"/>
                                                    </label>
                                                    <div class="fs-16" style="line-height: 1;">&nbsp;</div>
                                                    <div class="">
                                                        <button type="button" name="button" class="button-radio" onclick="iCtrlWizard.saveAutManual()">
                                                            <i class="material-icons" style="font-size: 24px;line-height: 1.4;">save</i>
                                                        </button>
                                                    </div>
                                                    <!-- <div class="preview-file">
                                                        <img id="bSideA" class="hide" src="" alt="preview-file"/>
                                                    </div> -->
                                                </div>

                                                <!-- <div class="col" style="min-height: 140px;background: #f4f3f4;">
                                                    <img src="" alt="" class="w-100">
                                                </div> -->
                                            </div>
                                            <div class="row p-8"></div>
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="prevAutManual005" src="" alt="" class="w-100" onclick="iCtrlWizard.openModalAm(this)">
                                                </div>
                                                <div class="col-6">
                                                    <img id="prevAutManual006" src="" alt="" class="w-100" onclick="iCtrlWizard.openModalAm(this)">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-md-8 text-center">
                                            <div class="row text-center">
                                                <div class="col col-md-4 item-answer">&nbsp;</div>
                                                <div class="col col-md-4 item-answer">&nbsp;</div>
                                                <div class="col col-md-4 item-answer">
                                                    <span class="tag-title fs-16"><b>* Seleccionar *:</b></span>
                                                </div>
                                            </div>
                                            <div class="row row-questions text-center">
                                                <div class="col col-md-4 item-answer">
                                                    <input id="cFirma" type="checkbox" name="firma_electronica" disabled>&nbsp;
                                                    <label for="cFirma">Firma electronica <i id="open006" class="material-icons pointer text-danger hide" data-index-pdf="" style="line-height: 1.5;">picture_as_pdf</i></label>
                                                </div>
                                                <div class="col col-md-4 item-answer">
                                                    <input id="cConsentimiento" type="checkbox" name="consentimiento_datos" disabled>&nbsp;
                                                    <label for="cConsentimiento">Consentimiento de datos <i id="open005" class="material-icons pointer text-danger hide" data-index-pdf="" style="line-height: 1.5;">picture_as_pdf</i></label>
                                                </div>
                                                <div class="col col-md-4 item-answer">&nbsp;</div>
                                                <!-- <div class="col col-md-4 item-answer">
                                                    <span class="tag-title">Cliente Firma:</span>
                                                    <span class="tag-desc">&nbsp;
                                                        <label for="">Sí <input type="radio" name="cliente_firma" value="si" checked></label>&nbsp;&nbsp;
                                                        <label for="">No <input type="radio" name="cliente_firma" value="no"></label>
                                                    </span>
                                                 -->
                                            </div>
                                            <div class="row">
                                                <div class="col col-md-12 text-center">
                                                    <h4>&nbsp;</h4>
                                                    <!-- <h4>Autorización centrales de datos</h4> -->
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col col-md-12">
                                                    <div class="table-responsive c-form-group">
                                                        <table id="datatablesAutCentral" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                                            <thead class="text-danger">
                                                                <th>Det</th>
                                                                <th>Plantilla</th>
                                                                <th>Usuario</th>
                                                                <th>Maquina</th>
                                                                <th>Fecha</th>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- / AUTORIZACION CENTRALES -->

                                <!-- CODEUDOR -->
                                <div class="tab-pane" id="codeudor">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Información del codeudor</h3>
                                        </div>
                                    </div>
                                    <div class="row pt-20 pr-16 pl-16">
                                        <div class="table-responsive container-table-result c-form-group p-8 pt-16">
                                            <table id="datatablesCod" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                                <thead class="text-danger">
                                                    <th>Codeudor</th>
                                                    <th>Nombre</th>
                                                    <th>Usuario Ingreso</th>
                                                    <th>Fecha Aprobación</th>
                                                    <th>Cupo</th>
                                                    <th>Usuario Aprobación</th>
                                                    <th>Próximo Negocio</th>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- <div class="row" style="display: none;">
                                        <button id="bSubmitFormWizard" type="submit" name="button">Enviar</button>
                                    </div> -->
                                </div>
                                <!-- / CODEUDOR -->

                                <!-- RESULTADO -->
                                <div class="tab-pane" id="resultado">
                                    <div class="row">
                                        <div class="col">
                                            <h3 class="m-0 tab-title">Resultado Callcenter</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4 hide">
                                            <label>Valor Solicitado:*</label>
                                            <?= $this->Form->text('val_sol', ['class' => 'c-field', 'required' => 'required', 'onkeypress' => 'return isNumber(event)', 'onkeyup' => 'formatNumber(event,"$ ", true)']) ?>
                                        </div>
                                        <div class="col-md-8 hide">
                                            <label>Notas P.O.S:</label>
                                            <?= $this->Form->text('notas_pos', ['class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)']) ?>
                                        </div>
                                        <div class="col-md-6 hide">
                                            <label>Vendedor:*</label>
                                            <?= $this->Form->select('cod_ven', [], ['id' => 'codVen', 'class' => 'c-field hide', 'required' => 'required']) ?>
                                            <?= $this->Form->text('text_cod_ven', ['id' => 'textCodVen','class' => 'c-field', 'onkeyup' => 'onlyUpperCase(this)', 'required' => 'required']) ?>
                                        </div>

                                        <div class="col-md-12 p-8"></div>

                                        <div class="col-md-4">
                                            <label>Cupo:</label>
                                            <?= $this->Form->text('res_cupo', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Valor Disponible:</label>
                                            <?= $this->Form->text('res_val_dis', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Saldo:</label>
                                            <?= $this->Form->text('res_saldo', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>

                                        <div class="col-md-4">
                                            <label>Resultado:</label>
                                            <?= $this->Form->text('res_resultado', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Razon Resultado:</label>
                                            <?= $this->Form->text('res_razon_resultado', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>
                                        <div class="col-md-4">
                                            <label>Autorizado / Negado por:</label>
                                            <?= $this->Form->text('res_autorizado', ['class' => 'c-field', 'disabled' => 'disabled']) ?>
                                        </div>
                                    </div>
                                    <div class="row pt-20 pr-16 pl-16">
                                        <div class="table-responsive container-table-result c-form-group p-8 pt-16">
                                            <table id="datatablesResult" class="table table-striped table-no-bordered table-hover dataTable dtr-inline" cellspacing="0" width="100%" style="width: 100%;" role="grid" aria-describedby="datatables_info">
                                                <thead class="text-danger">
                                                    <th>Fecha</th>
                                                    <th>Origen</th>
                                                    <th>Cupo</th>
                                                    <th>Valor Solicitado</th>
                                                    <th>Resultado</th>
                                                    <th>Razon Resultado</th>
                                                    <th>Usuario</th>
                                                    <th>Notas</th>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- <div class="row" style="display: none;">
                                        <button id="bSubmitFormWizard" type="submit" name="button">Enviar</button>
                                    </div> -->
                                </div>
                                <!-- / RESULTADO -->

                                <!-- OTHER -->

                                <!-- / OTHER -->
                            </div>
                        </div>
                        <div class="card-footer pt-0 mt-0" style="display: block;">
                            <div class="pr-20 pl-20">
                                <span id="fwFechaActualizacion" class="fs-16"></span>
                                <span id="fwOrigenAct" class="fs-16"></span>
                            </div>
                            <div class="" style="display:flex;justify-content:space-between;align-items:center;">
                                <div class="mr-auto" style="display: inline-flex;">
                                    <input type="button" class="btn btn-previous btn-fill btn-default btn-wd" name="previous" value="Atras" data-toggle="tooltip" data-placement="top" title="(F2)">
                                    <?= $this->Html->link('Cancelar', ['controller' => 'Pages', 'action' => 'nueva_solicitud'], ['escape' => false, 'class' => 'btn btn-cancel btn-fill btn-default btn-wd fs-16 pt-8 pb-8 pl-12 pr-12']) ?>
                                </div>
                                <div class="ml-auto" style="display: inline-flex;">
                                    <button class="btn btn-save btn-fill btn-danger btn-wd fs-16" type="button" name="save" data-toggle="tooltip" data-placement="top" title="(F7)" onclick="iCtrlWizard.sendDirectFormWizard(true)">Guardar &nbsp;<i class="material-icons" style="font-size: 18px;">save</i></button>
                                    <button id="btnFinish" class="btn btn-finish btn-fill btn-danger btn-wd fs-16" type="button" name="finish">Enviar Solicitud &nbsp;<i class="material-icons" style="font-size: 18px;">compare_arrows</i></button>
                                    <input type="button" class="btn btn-next btn-fill btn-danger btn-wd" name="next" value="Siguiente" data-toggle="tooltip" data-placement="top" title="(F4)">

                                    <button type="button"  class="btn btn-fill btn-danger btn-wd" id='validarDermatitis' style='display:none; font-size:16px' onclick="iCtrlWizard.validFingerprintDermatitis(false)">Validar</button>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                        </div>
                    <?= $this->Form->end() ?>
                    <!-- / WIZARD DE FORMULARIOS -->
                </div>
            </div>
        </div>
    </div>
</div>


<!-- MODAL PDFS -->
<div class="modal fade" id="pdfsModal" tabindex="-1" role="dialog" aria-labelledby="pdfsModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 5px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="pdfsModalLabel">APLICACIÓN BIOMETRICA</h5>
                <button id="bNormalPdfsNormal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
                <!-- <button id="bAuxPdfsNormal" type="button" class="close" aria-label="Close" onclick="iCtrlWizard.closePdfstModal()" style="display: none;">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button> -->
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">

            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col pb-8">
                        <div class="card m-0">
                            <div class="card-body">
                                <div class="row p-16 pb-0 tag-modal-pdf">
                                    <div class="col-md-4">
                                        <span class="tag-title">Cédula:</span>
                                        <span class="tag-desc" id="modalPdfCedula">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Nombre:</span>
                                        <span class="tag-desc" id="modalPdfNombre">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Apellido:</span>
                                        <span class="tag-desc" id="modalPdfApellido">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Correo:</span>
                                        <span class="tag-desc" id="modalPdfCorreo"></span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Teléfono:</span>
                                        <span class="tag-desc" id="modalPdfTelefono">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Dirección:</span>
                                        <span class="tag-desc" id="modalPdfDireccion">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Id Proceso:</span>
                                        <span class="tag-desc" id="modalPdfIdFirma">&nbsp;</span>
                                    </div>
                                    <div class="col-md-8">
                                        <span class="tag-title">Cliente Firma:</span>
                                        <span class="tag-desc">
                                            &nbsp;
                                            <label for="" style="color:#424242;font-weight:300;">Sí <input type="radio" name="md_cliente_firma" value="si" disabled></label>
                                            &nbsp;&nbsp;
                                            <label for="" style="color:#424242;font-weight:300;">No <input type="radio" name="md_cliente_firma" value="no" disabled></label>
                                        </span>
                                    </div>
                                </div>
                                <div class="row tag-modal-pdf m-0" id="codeudor" style="padding: 0 0 16px 0;">
                                    <div class="col-md-12">
                                        <h4 class="m-0" style="text-decoration: underline;">Codeudor</h4>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Cédula:</span>
                                        <span class="tag-desc" id="modalPdfCoCedula">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Nombre:</span>
                                        <span class="tag-desc" id="modalPdfCoNombre">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Apellido:</span>
                                        <span class="tag-desc" id="modalPdfCoApellido">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Correo:</span>
                                        <span class="tag-desc" id="modalPdfCoCorreo"></span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Teléfono:</span>
                                        <span class="tag-desc" id="modalPdfCoTelefono">&nbsp;</span>
                                    </div>
                                    <div class="col-md-4">
                                        <span class="tag-title">Dirección:</span>
                                        <span class="tag-desc" id="modalPdfCoDireccion">&nbsp;</span>
                                    </div>
                                </div>
                                <div class="row align-items-center h-100">
                                    <div class="col-8">
                                        <p class="text-right text-danger fs-18 m-0"><b>VALIDAR LA INFORMACIÓN CON EL CLIENTE ANTES DE FIRMAR</b></p>
                                    </div>
                                    <div class="col-4">
                                        <div class="row">
                                            <div class="col text-right" style="padding-right: 18px;">
                                                <button id="btnSend" type="button"
                                                class="btn btn-success hide"
                                                onclick="iCtrlWizard.toggleBtnFinish()">Siguiente</button>

                                                <button id="btnSign" type="button"
                                                class="btn btn-success"
                                                onclick="iCtrlWizard.sendSign()">Firmar Documento</button>
                                                <!-- <button id="btnSignEnd" type="button"
                                                class="btn btn-success hide"
                                                data-dismiss="modal" aria-label="Close">Continuar</button> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="row">
                    <div class="col-md-12 pt-8">
                        <div class="card card-pdf">
                            <div class="card-header card-header-danger p-0">
                                <nav>
                                    <div class="nav nav-tabs p-0" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-autorizacion-tab" data-toggle="tab" href="#nav-autorizacion" role="tab" aria-controls="nav-autorizacion" aria-selected="true">Autorización Tratamiento Datos</a>
                                        <a class="nav-item nav-link" id="nav-consentimiento-tab" data-toggle="tab" href="#nav-consentimiento" role="tab" aria-controls="nav-consentimiento" aria-selected="false">Consentimiento Tratamiento Datos</a>
                                        <a class="nav-item nav-link" id="nav-acuerdo-tab" data-toggle="tab" href="#nav-acuerdo" role="tab" aria-controls="nav-acuerdo" aria-selected="false">Acuerdo Comunicación Electronica</a>
                                    </div>
                                    <!-- <button id="btnSign" type="button"
                                    class="btn btn-success"
                                    onclick="iCtrlWizard.sendSign()">
                                        Firmar Documento
                                        <i class="material-icons">fullscreen</i>
                                    </button> -->

                                    <button type="button" name="button" class="btn btn-danger button-radio-full-screen" onclick="toggleFSTabsPdfs('pdfsModal')" data-toggle="tooltip" data-placement="top" title="Ver PDF">
                                        Ver PDF
                                        <i class="material-icons">fullscreen</i>
                                    </button>
                                </nav>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="nav-autorizacion" role="tabpanel" aria-labelledby="nav-autorizacion-tab">
                                        <div class="container-embed">
                                            <embed id="pdfAutorizacion"
                                            class="content-embed"
                                            src=""
                                            type="application/pdf"
                                            width="100%">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-consentimiento" role="tabpanel" aria-labelledby="nav-consentimiento-tab">
                                        <div class="container-embed">
                                            <embed id="pdfConsentimiento"
                                            class="content-embed"
                                            src=""
                                            type="application/pdf"
                                            width="100%">
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="nav-acuerdo" role="tabpanel" aria-labelledby="nav-acuerdo-tab">
                                        <div class="container-embed">
                                            <embed id="pdfAcuerdo"
                                            class="content-embed"
                                            src=""
                                            type="application/pdf"
                                            width="100%">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal-footer p-8" style="padding: 8px 16px;">
                <button id="btnSign" type="button" class="btn btn-success" onclick="iCtrlWizard.sendSign()">Firmar Documento</button>
                <button id="btnSendFormWizard" type="button" class="btn btn-danger hide">Enviar &nbsp;<i class="material-icons" style="font-size: 18px;">compare_arrows</i></button>
            </div> -->
        </div>
    </div>
</div>
<!-- / MODAL PDFS -->

<!-- MODAL PDF AUTORIZACION CENTRALES -->
<div class="modal fade" id="autCentralesModal" tabindex="-1" role="dialog" aria-labelledby="autCentralesModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 35px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="autCentralesModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col-md-12">
                        <div class="" style="height:100%;min-height: 75vh;display: grid;">

                            <embed id="pdfACentrales"
                            src=""
                            type="application/pdf"
                            width="100%"
                            style="height:100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL PDF AUTORIZACION CENTRALES -->

<!-- MODAL CEDULA -->
<div class="modal fade" id="cedulaModal" tabindex="-1" role="dialog" aria-labelledby="cedulaModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" style="min-width: 80vw;margin-top: 35px;">
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="cedulaModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row">
                    <div class="col-md-12">
                        <div class="" style="height:100%;min-height: 60vh;display: grid;">
                            <embed id="pdfCedula"
                            src=""
                            type="application/pdf"
                            width="100%"
                            style="height:100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL CEDULA -->

<!-- MODAL CEDULA -->
<div class="modal fade" id="amModal" tabindex="-1" role="dialog" aria-labelledby="amModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <!-- style="min-width: 80vw;margin-top: 35px;" -->
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="amModalLabel">Autorizaciones manuales</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- style="padding-top: 16px;background: rgb(245, 245, 245);" -->
            <div class="modal-body p-0">
                <div class="row">
                    <div class="col-md-12">
                        <!-- style="height:100%;min-height: 60vh;display: grid;" -->
                        <div class="">
                            <img id="amModalImage" src="" alt="" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL CEDULA -->

<!-- MODAL HUELLA -->
<div class="modal fade fingerprintModal"  id="fingerprintModal" tabindex="-1" role="dialog" aria-labelledby="fingerprintModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 70vw;"><!-- margin-top: 5px; -->
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="modal_fingerprintModalLabel">CLIENTE CON HUELLA REGISTRADA</h5>
                <button type="button" class="close" aria-label="Close" onclick="iCtrlWizard.closeFingerprintModal()">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row" style="padding: 8px 0;">
                    <div class="col col-md-12">
                        <h4>
                            <span style="color: #000000;"><b>Validación de huella</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span id="clientFp" style="color: #5f5f5f;"><b></b></span>
                        </h4>
                    </div>
                </div>
                <div class="row" style="padding: 0 16px;">
                    Seleccione el dedo a verificar.
                    (NOTA: Los dedos sombreados en gris estan registrados)
                </div>
                <div class="row" style="padding: 24px 16px;">
                    <div class="col col-md-12 text-center">
                        <div class="col-12 text-center">
                            <div class="row">
                                <div class="col-6">
                                    <div id="modal_listFpLeft" class="">&nbsp;</div>
                                </div>
                                <div class="col-6">
                                    <div id="modal_listFpRight" class="">&nbsp;</div>
                                </div>
                            </div>
                        </div>
                        <div id="modal_hands">
                            <div id="modal_handLeft">
                                <div id="modal_finger6" class="finger" data-finger="6" onclick="iCtrlWizard.onFingerVerification('6')">&nbsp;</div>
                                <div id="modal_finger7" class="finger" data-finger="7" onclick="iCtrlWizard.onFingerVerification('7')">&nbsp;</div>
                                <div id="modal_finger8" class="finger" data-finger="8" onclick="iCtrlWizard.onFingerVerification('8')">&nbsp;</div>
                                <div id="modal_finger9" class="finger" data-finger="9" onclick="iCtrlWizard.onFingerVerification('9')">&nbsp;</div>
                                <div id="modal_finger10" class="finger" data-finger="10" onclick="iCtrlWizard.onFingerVerification('10')">&nbsp;</div>
                                <div id="modal_palmLeft">&nbsp;</div>
                            </div>
                            <div id="modal_handRight">
                                <div id="modal_finger1" class="finger" data-finger="1" onclick="iCtrlWizard.onFingerVerification('1')">&nbsp;</div>
                                <div id="modal_finger2" class="finger" data-finger="2" onclick="iCtrlWizard.onFingerVerification('2')">&nbsp;</div>
                                <div id="modal_finger3" class="finger" data-finger="3" onclick="iCtrlWizard.onFingerVerification('3')">&nbsp;</div>
                                <div id="modal_finger4" class="finger" data-finger="4" onclick="iCtrlWizard.onFingerVerification('4')">&nbsp;</div>
                                <div id="modal_finger5" class="finger" data-finger="5" onclick="iCtrlWizard.onFingerVerification('5')">&nbsp;</div>
                                <div id="modal_palmRight">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div class="row">
                    
                        <div class="col-4 offset-8 text-center">
                            <div class='dermatitis'>
                                <input type="checkbox"  value='1' id="dermatitisInputModal">
                                <label for="dermatitisInputModal">Dermatitis</label>
                            </div>
                        </div>

                    <div class="col-12 text-center">
                        <button type="button" name="button" class="btn btn-cancel btn-fill btn-default" onclick="iCtrlWizard.checkFingerprintVerification()">
                            Verificar huella(s)
                        </button>

                        <button type="button"  style='display:none' name="button" class="btn btn-danger btn-fill" onclick="iCtrlWizard.validFingerprintDermatitis(true)">
                            Validar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL HUELLA -->


<!-- MODAL REGISTRO HUELLA -->
<div class="modal fade fingerprintModal"  id="fingerprintRegModal" tabindex="-1" role="dialog" aria-labelledby="fingerprintRegModal" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document" style="min-width: 70vw;"><!-- margin-top: 5px; -->
        <div class="modal-content">
            <div class="modal-header bg-black">
                <h5 class="modal-title cl-black" id="modal_fingerprintRegModalLabel">REGISTRAR HUELLA DEL CLIENTE</h5>
                <button type="button" class="close" aria-label="Close" onclick="iCtrlWizard.closeFingerprintRegModal()">
                    <span class="cl-black" aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pt-16" style="padding-top: 16px;background: rgb(245, 245, 245);">
                <div class="row" style="padding: 8px 0;">
                    <div class="col col-md-12">
                        <h4>
                            <span style="color: #000000;"><b>Registro de huella</b>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span id="clientFpReg" style="color: #5f5f5f;"><b></b></span>
                        </h4>
                    </div>
                </div>
                <div class="row" style="padding: 8px 0;">
                    <div class="col col-md-12 text-center">
                        <p class="fs-16">Seleccione los dedos a registrar (Uno por cada mano)</p>
                    </div>
                </div>

                <div class="row" style="padding: 24px 16px;">
                    <div class="col col-md-12 text-center">
                        <div id="reg_hands">
                            <div id="reg_handLeft">
                                <div id="reg_finger6" class="finger" data-finger="6" onclick="iCtrlSeerOptional.onFinger('6')">&nbsp;</div>
                                <div id="reg_finger7" class="finger" data-finger="7" onclick="iCtrlSeerOptional.onFinger('7')">&nbsp;</div>
                                <div id="reg_finger8" class="finger" data-finger="8" onclick="iCtrlSeerOptional.onFinger('8')">&nbsp;</div>
                                <div id="reg_finger9" class="finger" data-finger="9" onclick="iCtrlSeerOptional.onFinger('9')">&nbsp;</div>
                                <div id="reg_finger10" class="finger" data-finger="10" onclick="iCtrlSeerOptional.onFinger('10')">&nbsp;</div>
                                <div id="reg_palmLeft">&nbsp;</div>
                            </div>
                            <div id="reg_handRight">
                                <div id="reg_finger1" class="finger" data-finger="1" onclick="iCtrlSeerOptional.onFinger('1')">&nbsp;</div>
                                <div id="reg_finger2" class="finger" data-finger="2" onclick="iCtrlSeerOptional.onFinger('2')">&nbsp;</div>
                                <div id="reg_finger3" class="finger" data-finger="3" onclick="iCtrlSeerOptional.onFinger('3')">&nbsp;</div>
                                <div id="reg_finger4" class="finger" data-finger="4" onclick="iCtrlSeerOptional.onFinger('4')">&nbsp;</div>
                                <div id="reg_finger5" class="finger" data-finger="5" onclick="iCtrlSeerOptional.onFinger('5')">&nbsp;</div>
                                <div id="reg_palmRight">&nbsp;</div>
                            </div>
                        </div>
                        <div class="col-12 text-center">&nbsp;</div>
                        <div class="col-12 text-center">&nbsp;</div>

                                                   
                        <div class="col-4 offset-8 text-center">
                            <div class='dermatitis'>
                                <input type="checkbox"  value='1' id="dermatitisInputModalReg">
                                <label for="dermatitisInputModalReg">Dermatitis</label>
                            </div>
                        </div>
                
                        <div class="col-12 text-center">
                            <button type="button" name="button" class="btn btn-cancel btn-fill btn-default" onclick="iCtrlWizard.registerFingerprints('reg')">
                                Registrar huella(s)
                            </button>

                            <button type="button"  style='display:none' name="button" class="btn btn-danger btn-fill" onclick="iCtrlWizard.validFingerprintDermatitis(true)">
                                Validar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- / MODAL REGISTRO HUELLA -->



<script>
    var ctrlDataWizard = ctrlDataWizard || {};
    var ctrlDataSeer = ctrlDataSeer || {};
    ctrlDataWizard.paises = <?= json_encode($paises) ?>;
    ctrlDataWizard.departamentos = <?= json_encode($departamentos) ?>;
    ctrlDataWizard.ciudades = <?= json_encode($ciudades) ?>;
    ctrlDataWizard.comunas = <?= json_encode($comunas) ?>;
    ctrlDataWizard.barrios = <?= json_encode($barrios) ?>;
    ctrlDataWizard.parentesco = <?= json_encode($parentesco) ?>;
    ctrlDataWizard.ocupaciones = <?= json_encode($ocupaciones) ?>;
    ctrlDataWizard.almacenes = <?= json_encode($almacenes) ?>;
    ctrlDataWizard.vendedores = <?= json_encode($vendedores) ?>;
    ctrlDataWizard.usuario = <?= json_encode($usuario) ?>;
    ctrlDataWizard.dominios = <?= json_encode($dominios) ?>;
    ctrlDataWizard.residencias = <?= json_encode($residencias) ?>;
</script>

<?= $this->Html->script('nueva_solicitud.js?version='.time(), ['block' => 'scriptBottom']) ?>
