var iCtrl = iCtrl || {};
ctrlData.users = [];

/**
* @description iCtrl.matchPasswords Compara las nuevas claves
* @return {boolean}
*/
iCtrl.matchPasswords = function() {
    let result = true;
    let dataChangePass = formToJSON('#formChangePassUser');
    if(dataChangePass.new_password !== dataChangePass.confirm_password) {
        if(dataChangePass.new_password && dataChangePass.confirm_password) {
            $('#msgChangePasswordUser').html('Las claves no coinciden.');
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
        $('#msgChangePasswordUser').html('Clave poco segura.');
        result = false;
    }
    if(result) {
        $('#msgChangePasswordUser').html('');
    }
    return result;
}
/**
* @description iCtrl.onSubmitFormChangePassUser Escucha el evento de envio
* del fomulario de cambio de clave
* @param {Object} evt => evento original
* @return {void}
*/
iCtrl.onSubmitFormChangePassUser = function() {
    $(document).on('submit', '#formChangePassUser', function(evt) {
        return false;
    });
    $(document).on('change', '#formChangePassUser input[name="new_password"], #formChangePassUser input[name="confirm_password"]', function(evt) {
        iCtrl.matchPasswords();
    });
    $(document).on('keyup', '#formChangePassUser input[name="new_password"]', function(evt) {
        let dataChangePass = formToJSON('#formChangePassUser');
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(strongRegex.test(dataChangePass.new_password)) {
            $('#formChangePassUser input[name="new_password"]').addClass('secure-green');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-orange');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-red');
        }else if(mediumRegex.test(dataChangePass.new_password)) {
            $('#formChangePassUser input[name="new_password"]').addClass('secure-orange');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-green');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-red');
        }else {
            $('#formChangePassUser input[name="new_password"]').addClass('secure-red');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-orange');
            $('#formChangePassUser input[name="new_password"]').removeClass('secure-green');
        }

        return;
    });
}
/**
* @description iCtrl.sendFormChangePassUser Envia el formulario de cambio
* de clave para el usuario
* @return {void}
*/
iCtrl.sendFormChangePassUser = function() {
    let data = formToJSON('#formChangePassUser');
    let matchPass = iCtrl.matchPasswords();
    if(!matchPass) { return false; }
    togglePreloader(true);
    reqJSON({
        'path': urlWS+'/actualizarContrasena',
        'data': {
            'clave': data.current_password,
            'clave_nueva': data.new_password,
            'usuario': data.user
        },
        'type': 'POST'
    }, function(err, response) {
        togglePreloader(false);
        if(err) { console.error(err); return }
        if(response.type == 'error') { return }
        if(!response.data[0][0].registro) {
            $('#msgChangePasswordUser').html('La clave ingresada no es correcta.');
        }else {
            reqJSON({
                'path': 'https://api.pedbox.co:8590/user_password',
                'data': {
                    'id_company': 2,
                    'password': data.new_password,
                    'user': data.user
                },
                'type': 'PUT'
            }, function(errPB, responsePB) { });
            swal({
                title: 'Datos actualizados correctamente',
                icon: 'success'
            }).then((value) => { window.location.href = urlLogout });
        }
    }, true);
}
/**
* @description iCtrl.getUsers consulta de usuarios por empresa
* @return {void}
*/
iCtrl.getUsers = function() {
    togglePreloader(true);
    reqJSON({
        'path': urlWS+'/intranetMasters',
        'data': {
            'tipo': 14,
            'empresa': ctrlData.user.empresa
        },
        'type': 'POST'
    }, function(err, response) {
        if(err) { console.error(err) }
        iCtrl.printTableUsers(response.data[0]);
        togglePreloader(false);
    }, true);
}
/**
* @description iCtrl.printTableUsers Pinta la tabla de usarios
* @param {Array} input => datos para el llenado de la tabla
* @return {void}
*/
iCtrl.printTableUsers = function(input) {
    let rowsToAdd = [];
    for (let item of input) {
        rowsToAdd.push({
            'cod_usu': ((item.cod_usu)? item.cod_usu: ''),
            'cargo': ((item.cargo)? item.cargo: ''),
            'roles_usu': ((item.roles_usu)? item.roles_usu: ''),
            'area_pos': ((item.area_pos)? item.area_pos: ''),
            'desc_almacen': ((item.desc_almacen)? item.desc_almacen: ''),
            'clave_usu': ((item.clave_usu)? utf8_to_b64(item.clave_usu): '')
        });
    }
    rowsToAdd.sort(function(a, b) {
        if (a.cod_usu < b.cod_usu) { return -1 }
        if (a.cod_usu > b.cod_usu) { return 1 }
        return 0;
    });

    ctrlData.users = rowsToAdd;
    iCtrl.tableUsers.clear();
    iCtrl.tableUsers.rows.add(rowsToAdd).draw();
}
/**
* @description iCtrl.onClickRowTableUsers Escuch el evento click sobre una
* fila de la tabla usuarios
* @return {void}
*/
iCtrl.onClickRowTableUsers = function() {
    $('#datatablesUsers tbody').on('click', 'tr', function() {
        let elData = iCtrl.tableUsers.row(this).data();
        if(!elData) { return }
        let filterRow = ctrlData.users.filter(function(a) {
            return (""+a.cod_usu == ""+elData.cod_usu)? true: false;
        })[0];
        $('#datatablesUsers tr.active').removeClass('active');
        $(this).addClass('active');
        $('#cambiarClaveUsuarioModal').modal('show');
        $('#formChangePassUser input[name="current_password"]').val(b64_to_utf8(filterRow.clave_usu));
        $('#formChangePassUser input[name="user"]').val(filterRow.cod_usu);
    });
}
/**
* @description iCtrl.newDataTableSimulator Inicializa la tabla de resultado de
* simulacion
* @return {void}
*/
iCtrl.newDataTableUsers = function() {
    $('#datatablesUsers').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': infoDatable.lengthMenu,
        'responsive': true,
        'language': infoDatable.language,
        'searching': true,
        'paging': true,
        'columns': [
            { 'data': 'cod_usu' },
            { 'data': 'cargo' },
            { 'data': 'roles_usu' },
            { 'data': 'area_pos' },
            { 'data': 'desc_almacen' }
        ]
    });
    iCtrl.tableUsers = $('#datatablesUsers').DataTable();
}

/**
* @description document.ready inicializa el modulo
* @return {void}
*/
$(document).ready(function() {
    iCtrl.newDataTableUsers();
    iCtrl.onClickRowTableUsers();
    iCtrl.onSubmitFormChangePassUser();
    iCtrl.getUsers();
});
