var ctrlChangePass = ctrlChangePass || {};
/**
* @description ctrlChangePass.onSubmitFormChangePass Escucha el evento de envio
* del fomulario de cambio de clave
* @param {Object} evt => evento original
* @return {void}
*/
ctrlChangePass.onSubmitFormChangePass = function() {
    $(document).on('submit', '#formChangePass', function(evt) {
        return false;
    });
    $(document).on('keyup', '#formChangePass input[name="new_password"]', function(evt) {
        let dataChangePass = formToJSON('#formChangePass');
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        let isSecure = true;
        if(strongRegex.test(dataChangePass.new_password)) {
            $('#formChangePass input[name="new_password"]').addClass('secure-green');
            $('#formChangePass input[name="new_password"]').removeClass('secure-orange');
            $('#formChangePass input[name="new_password"]').removeClass('secure-red');
        }else if(mediumRegex.test(dataChangePass.new_password)) {
            $('#formChangePass input[name="new_password"]').addClass('secure-orange');
            $('#formChangePass input[name="new_password"]').removeClass('secure-green');
            $('#formChangePass input[name="new_password"]').removeClass('secure-red');
        }else {
            $('#formChangePass input[name="new_password"]').addClass('secure-red');
            $('#formChangePass input[name="new_password"]').removeClass('secure-orange');
            $('#formChangePass input[name="new_password"]').removeClass('secure-green');
        }

        return;
    });
}
/**
* @description ctrlChangePass.onSubmitFormChangePass Escucha el evento de envio
* del fomulario de cambio de clave
* @param {Object} evt => evento original
* @return {void}
*/
ctrlChangePass.onChangePass = function() {
    $(document).on('change', '#formChangePass input[name="new_password"], #formChangePass input[name="confirm_password"]', function(evt) {
        ctrlChangePass.matchPasswords();
    });
}
/**
* @description ctrlChangePass.matchPasswords Compara las nuevas claves
* @return {boolean}
*/
ctrlChangePass.matchPasswords = function() {
    let result = true;
    let dataChangePass = formToJSON('#formChangePass');
    if(dataChangePass.new_password !== dataChangePass.confirm_password) {
        if(dataChangePass.new_password && dataChangePass.confirm_password) {
            $('#msgChangePassword').html('Las claves no coinciden.');
            result = false;
        }
    }

    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    let isSecure = true;
    if(strongRegex.test(dataChangePass.new_password)) {
        // #code
    }else if(mediumRegex.test(dataChangePass.new_password)) {
        // #code
    }else {
        isSecure = false;
    }
    if(!isSecure) {
        $('#msgChangePassword').html('Clave poco segura.');
        result = false;
    }

    if(result) {
        $('#msgChangePassword').html('');
    }
    return result;
}
/**
* @description ctrlChangePass.sendFormChangePass Envia el formulario de cambio
* de clave
* @return {void}
*/
ctrlChangePass.sendFormChangePass = function() {
    let data = formToJSON('#formChangePass');
    let matchPass = ctrlChangePass.matchPasswords();
    if(!matchPass) { return false; }

    togglePreloader(true);
    reqJSON({
        'path': './actualizarContrasena',
        'data': {
            'clave': data.current_password,
            'clave_nueva': data.new_password
        },
        'type': 'POST'
    }, function(err, response) {
        togglePreloader(false);
        if(err) {
            console.error(err);
            return;
        }
        if(response.type == 'error') {
            return;
        }
        if(!response.data[0][0].registro) {
            $('#msgChangePassword').html('La clave ingresada no es correcta.');
        }else {

            reqJSON({
                'path': 'https://api.pedbox.co:8590/user_password',
                'data': {
                    'id_company': 2,
                    'password': data.new_password,
                    'user': auxUser
                },
                'type': 'PUT'
            }, function(errPB, responsePB) {
            });


            
            swal({
                title: 'Datos actualizados correctamente',
                icon: 'success'
            }).then((value) => {
                window.location.href = urlLogout;
            });
        }
    });
}

$(document).ready(function() {
    ctrlChangePass.onSubmitFormChangePass();
    ctrlChangePass.onChangePass();
});
