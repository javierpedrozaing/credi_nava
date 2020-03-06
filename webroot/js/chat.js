$('#prime').click(function () {
    toggleFab();
    refreshList();
});

//Toggle chat and links
function toggleFab() {
    $('.prime').toggleClass('zmdi-comment-outline');
    $('.prime').toggleClass('zmdi-close');
    $('.prime').toggleClass('is-active');
    $('.prime').toggleClass('is-visible');
    $('#prime').toggleClass('is-float');
    $('.chat').toggleClass('is-visible');
    $('.fab').toggleClass('is-visible');
}

var statuses = [{'title': 'Disponible', 'icon' : 'lens', 'color': '#4CAF50', 'id': '1'}, {'title': 'Ocupado', 'icon' : 'access_time', 'color': '#FFC107', 'id': '2'}, {'title': 'No puedo hablar', 'icon' : 'not_interested', 'color': '#F44336', 'id': '3'}, {'title': 'Descansando', 'icon' : 'hotel', 'color': '#37474f', 'id': '4'}, {'title': 'En reunión', 'icon' : 'supervisor_account', 'color': '#1e88e5', 'id': '5'}, {'title': 'Invisible', 'icon' : 'panorama_fish_eye', 'color': '#BDBDBD', 'id': '6'}, {'title': 'Desconectado', 'icon' : 'panorama_fish_eye', 'color': '#616161', 'id': '7'} ];
var server = 'https://api.pedbox.co:8590';
var urlSocket = localStorage.getItem('urlSocket');
var namespace = localStorage.getItem('namespace');
var empresa = localStorage.getItem('empresa');
var usuario = localStorage.getItem('usuario');
var foto_user = localStorage.getItem('foto_user');
var id_pedbox = localStorage.getItem('id_pedbox');
var usuarios = [];
var _data = {};
var subgroups = [];
var active; 
var class_active = '';
var last_key;
var socket = null;
var socket_connected = false;
var myDropzone = new Dropzone("#drop_file");
var files_to_send = []
var groupsPermissions = (localStorage.getItem('groupsPermissions') == "true") ? true : false;
var listGroupsPermissions = [];
var timeouts = {};
var openMenuUser = true;
var permissionRequestPending = false;
var delChecked = false;

$(function() {
    allowNotification();
    startChat();
})

function startChat() {
    $.ajax({
        type:"GET",
        url: server+"/getSubgroups",
    })
    .done(function(result){
        if(result.success) {
            subgroups = _.indexBy(result.data, 'id');
            start();
        } else {
            console.error("Error loading chat");
            localStorage.clear();  
        }
    });
}

function start() {
    moment.locale("es");
    if(!_.isNull(namespace)) {
        $('#page-loader').fadeIn();
        socket = returnSocket();
    }

    login();

    $('#search').keyup(function(e){
        var query = e.target.value.toLowerCase().replace(/\s/g,'');
        if (query.length > 1) {
            $('.list .new_user_chat').remove();

            _.each($('.list li.chat-msg'), function(o){
                var name = $(o).data('alias').toLowerCase().replace(/\s/g,'');
                var mensaje = $(o).data('mensaje').toString().toLowerCase().replace(/\s/g,'');

                if (name.indexOf(query) != -1 || mensaje.indexOf(query) != -1) {
                    $(o).fadeIn();
                } else {
                    $(o).fadeOut();
                }
            })
            if ($('.list').find('.sep_new_chat').length == 0) {
                $('.list').append('<li class="sep_new_chat">CONTACTOS</li>');
            }

            var new_users = searchInUsers(query);

            _.map(new_users, function(o) { 
                if (o.subgroup.toString().length > 0) {
                    var sg = subgroups[parseInt(o.subgroup)]; 
                    if (typeof(sg) != "undefined") {
                        o.group = sg.group; 
                        o.subgroup = sg.subgroup; 
                    }
                } else {
                    o.group = "Sin asignar"; 
                    o.subgroup = "Sin asignar"; 
                }
                return o; 
            });

            var html_new_users = '';
            _.each(new_users, function(u) {
                var imagen = server+u.url_img;
                if (u.url_img == 'null' || u.url_img.length == 0) {
                    imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
                }
                
                var telefono = (u.telefono) ? u.telefono : '';
                var color_d = (u.estado) ? _.find(statuses, {id: u.estado.toString()}).color : "#86BB71";
                var status_title = (u.estado) ? _.find(statuses, {id: u.estado.toString()}).title : "Disponible";
                status_title = (u.id_socket.length > 0) ? status_title : "Desconectado";
                var color_status = (u.id_socket.length > 0) ? color_d : "#616161";
                html_new_users += '<li title="'+status_title+'" class="chat-msg clearfix msg-'+_data.usuario._id+'-'+u._id+' new_user_chat" data-grupo="'+u.group+'" data-subgrupo="'+u.subgroup+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+u._id+'" data-image="'+imagen+'" data-alias="'+u.alias+'" data-user="'+u.usuario+'" data-telefono="'+telefono+'">'
                + '<div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div><i class="indicator fa fa-circle" style="color:'+color_status+'"></i></div>'
                + '<div class="about"><div class="name">'+u.alias.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase())+'</div><div class="status">'+u.usuario+'</div></div>'
                + '</li>';
            })
            $('.list').append(html_new_users);
        } else {
            refreshList();
        }
    });
    $(document).on('change', '#chk-all', (evt) => {
        var chk = $(evt.target);
        if (chk.prop('checked')) {
            $('.del-chat').prop('checked', true);
        } else {
            $('.del-chat').prop('checked', false);
        }
    });
    $('#search_user').keyup(function(e){
        var query = e.target.value.toLowerCase().replace(/\s/g,'');
        var new_users = searchInUsers(query);
        fillUserList(new_users);
    })
    $('#helpdesk').click(function(e) {
        var token = utf8_to_b64(usuario+'||123||helpdesk');
        window.open("https://app.pedbox.co/login/0/"+token, '_blank');
        return false;
    });
    $('#go-chat').click(function(e) {
        var token = utf8_to_b64(usuario+'||123||chat');
        window.open("https://app.pedbox.co/login/0/"+token, '_blank');
        return false;
    });
    $('.first-u').click(function(e) {
        $('#user-profile').fadeIn();
        var imagen = server+_data.usuario.url_img;
        if (_data.usuario.url_img == 'null' || _data.usuario.url_img.length == 0) {
            imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
        }
        $('#bg-cimg #cimg img').attr('src', imagen);
        $('#u-pin').parent().show();
        $('.u-alias').text(_data.usuario.alias);
        $('#u-leyenda').text(_data.usuario.leyenda);
        $('#u-pin').text(_data.usuario.pin);
        $('#user-status').show();
        fillStatuses();
        return false;
    })
    $('#close-user-profile').click(function(e) {
        $('#user-profile').fadeOut();
        return false;  
    })
    $('#active_chat').click(function(e) {
        $('#favorites').fadeOut();
        $('#user-profile').fadeOut();
        $('#new_chat_list').fadeOut();
        $('#icons_chat li').removeClass('active');
        $('#active_chat').parent('li').addClass('active');
        return false;  
    })
    $('#new_chat').click(function(e) {
        $('#favorites').fadeOut();
        $('#user-profile').fadeOut();
        $('#icons_chat li').removeClass('active');
        $('#new_chat').parent('li').addClass('active');
        $('#new_chat_list').fadeIn();
        return false;
    })
    $('#show_favorites').click(function(e) {
        $('#user-profile').fadeOut();
        $('#new_chat_list').fadeOut();
        $('#icons_chat li').removeClass('active');
        $('#show_favorites').parent('li').addClass('active');
        $('#favorites').fadeIn();

        var favorites_users = '';
        $('.list_user_fav').html('');
        _.each(_data.usuario.favoritos, function(f) {
            if (f) {
                var u = _.where(_data.usuarios, {_id: f.toString()})[0];

                var imagen = server+u.url_img;
                if (u.url_img == 'null' || u.url_img.length == 0) {
                    imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
                }
                
                var color_d = (u.estado) ? _.find(statuses, {id: u.estado.toString()}).color : "#86BB71";
                var color_status = (u.id_socket.length > 0) ? color_d : "#e36868";
                favorites_users += '<li class="chat-msg clearfix msg-'+_data.usuario._id+'-'+u._id+' new_user_chat" data-grupo="'+u.group+'" data-subgrupo="'+u.subgroup+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+u._id+'" data-image="'+imagen+'" data-alias="'+u.alias+'" data-user="'+u.usuario+'">'
                + '<div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div><i class="indicator fa fa-circle" style="color:'+color_status+'"></i></div>'
                + '<div class="about"><div class="name">'+u.alias+'</div></div>'
                + '</li>';
            }

        })
        $('.list_user_fav').append(favorites_users);
        return false;
    })
    $('#msg_difusion').click(function(e) {
        $('.c-difusion textarea').focus();
        $('#cont-difusion').fadeIn();
    });
    $('#del_chat').click((e) => {
        let del_chats = $('.del-chat:checked');
        if (del_chats.length > 0) {
            _.each(del_chats, (c) => {
                let emisor = $(c).data('emisor');
                let receptor = $(c).data('receptor');
                let tipo = $(c).data('tipo');
                let clase = $(c).data('clase');

                let obj = {'emisor': emisor.toString(), 'receptor': receptor.toString(), 'tipo_receptor': tipo};
                
                socket.emit('remove_recent_message', obj);
                $('.list .'+clase).remove();
            })
        } else {
            Swal({
                type: 'warning',
                title: 'Oops...',
                text: 'Debes seleccionar al menos un mensaje para eliminarlo'
            })
        }
    })
    $('#message-to-send').keydown((e) => {
        var receptor = $('#message-to-send').data('receptor').toString();
        var type = $('#message-to-send').data('type').toString();
        
        var emisor = _data.usuario._id;
        var msg = $('#message-to-send').val();

        if(last_key != 16 && e.keyCode==13){
            if ($('#message-to-send').val().replace(/(\s)/g,"").length > 0) {
                sendMessage();
                return false;
            }
        }
        last_key = e.keyCode;

        var obj = {
            id_receptor: receptor, 
            id_emisor: emisor
        };
        socket.emit('typing_message', obj, () => { });
    });

    $('#message-to-send').keyup((e) => {
        var receptor = $('#message-to-send').data('receptor').toString();
        var type = $('#message-to-send').data('type').toString();
        var msg = $('#message-to-send').val();

        if (type == "grupo") {
            localStorage.setItem("g"+receptor, msg);
        } else {
            localStorage.setItem(receptor, msg);
        }
    });

    $('#send').click(() => {
        sendMessage();
    });
    $('.logout').click((e) => {
        localStorage.clear();
        window.location.reload();
        return false;
    })
    $('.ico-pedbox').click(function(e) {
        window.location.href = 'http://pedbox.co';
        return false;
    })
    $('#open-emoticons').click((e) => {
        $(e.target).hide();
        $('#close-emoticons').show();
        $('#emoticons').fadeIn();

        $.getJSON('./js/emoticons.json', function(data) {
            var html = '<ul>';
            for (var i in data) {
                var emojis = data[i].emojis;
                _.each(emojis, function(emoji) {
                    html += '<li><span class="emoji">'+emoji.escapec_unic+'</span></li>';
                });
            }
            html += '</ul>';
            $('#emoticons').html(html);
        })

        return false;
    });
    $('#close-emoticons').click(function(e) {
        $(this).hide();
        $('#open-emoticons').show();
        $('#emoticons').fadeOut();
        return false;
    });
    $('#open-attach').click(function(e) {
        $('#drop_file').fadeIn();
        return false;
    })

    myDropzone.options.autoProcessQueue = false;
    myDropzone.options.clickable = true;
    
    myDropzone.on("addedfile", function(file) {
        var objDataForm = new FormData();
        objDataForm.append('attachment', file);
        objDataForm.append('typeAttached', 'attached');
        
        $.ajax({
            url: server+'/upload',
            data: objDataForm,
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST'
        })
        .done(function(result) {
            files_to_send.push({"file": file, "result": result});
            myDropzone.emit("complete", file);
        })
    });
    $(document).on('click','#emoticons ul li', function(evt) {
        var elm = $(evt.target);
        var emoji = $(elm).html();
        var text = $('#message-to-send').val();
        $('#message-to-send').val(text+emoji);
    })
    $(document).on('click','.del-chat', (evt) => {
        delChecked = true;
    })
    // On Click chat history
    $(document).on('click','li.chat-msg',function(evt) {
        if (delChecked) {
            delChecked = false;
        } else {
            $('#message-to-send').focus();
            var elm = $(evt.target);
            var li = $(elm).parents('li');
            var emisor = $(li).data('emisor');
            var receptor = $(li).data('receptor');
            var image = $(li).data('image');
            var alias = $(li).data('alias');
            var user = $(li).data('user');

            $('#message-to-send').focus();
            var nMsg = '';
            if (!_.isNull(localStorage.getItem(receptor))) {
                nMsg = localStorage.getItem(receptor);
            }
            $('#message-to-send').val(nMsg);
            myDropzone.removeAllFiles();
            files_to_send = [];
            $('#drop_file').fadeOut();

            $('#close-emoticons').hide();
            $('#open-emoticons').show();
            $('#emoticons').fadeOut();

            if (!$('.chat-msgs').hasClass('is-visible')) {
                $('.chat-msgs').addClass('is-visible');
            }

            $('li.chat-msg').removeClass('active');
            $('li.chat-group').removeClass('active');
            $(li).addClass('active');
            $('#chat-messages').html('');
            
            $('#message-to-send').data('receptor', receptor);
            $('#message-to-send').data('type', 'usuario');
            active = receptor;
            class_active = "msg-"+emisor+"-"+receptor;
            var obj = {
                "emisor": emisor,
                "receptor": receptor,
                "tipo_receptor": "usuario",
                "allUnread": true,
                "limit": true
            };
            
            var count_li = $(li).find('.msg-unread').text();

            if (!_.isNaN(parseInt(count_li))) {
                var actual = $('#count-msg-g span').text();
                var new_count = (parseInt(actual) - parseInt(count_li));
                $('#count-msg-g span').text(new_count);
                if (new_count <= 0) {
                    $('#count-msg-g').fadeOut();
                    $('#count-msg-g span').text('');
                }
            }

            $(li).find('.msg-unread').fadeOut(function() {
                $(li).find('.msg-unread').remove();
            })
            
            // Fill data chat window
            $('#img-chat').html('<img src="'+image+'" alt="avatar">');
            $('#img-chat').data('type', 'usuario');
            $('#img-chat').data('id', receptor);
            $('#favorite-user').data('id', receptor);
            $('#favorite-user').show();
            $('#open-chat-history').show();
            if (_data.usuario.favoritos.indexOf(parseInt(receptor)) != -1) {
                $('#favorite-user').addClass('fa-star-selected')
            } else {
                if ($('#favorite-user').hasClass('fa-star-selected')) {
                    $('#favorite-user').removeClass('fa-star-selected');
                }
            }
            $('#alias-chat').text(alias.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase()));
            var _user = _.where(_data.usuarios, {_id: receptor.toString()})[0];
            
            if (_user) {
                $('#user-chat').text(user+' - '+_user.group+' - '+_user.subgroup);
            } else {
                $('#user-chat').text(user);
            }
            
            socket.emit('get_chat_history', obj, function(data) {
                var sorted = _.sortBy(data, 'indexToOrder');
                var list_messages = parseMeesagesHistory(sorted, receptor); 

                $('#chat-messages').html(list_messages);
                $('.chat-history').scrollTop($('.chat-history').prop("scrollHeight"));

                var read_obj = {
                    emisor: receptor, 
                    receptor: emisor, 
                    id_user: _data.usuario._id,
                    tipo_receptor: 'usuario'
                };
                socket.emit('read_messages', read_obj, function(unread_messages) { });
                if (_data.chats[receptor]) {
                    if (!_data.chats[receptor].unread) {
                        _data.chats[receptor].unread = [];
                    }
                    _data.chats[receptor].unread[receptor] = 0;
                }
            })
        }
    })

    $(document).on('click', 'li.chat-group', function(evt) {
        var elm = $(evt.target);
        var li = $(elm).parents('li');
        var id = $(li).data('id');
        var image = $(li).data('image');
        var nombre = $(li).data('nombre');

        $('#message-to-send').focus();
        var nMsg = '';
        if (!_.isNull(localStorage.getItem("g"+id))) {
            nMsg = localStorage.getItem("g"+id);
        }
        $('#message-to-send').val(nMsg);
        myDropzone.removeAllFiles();
        files_to_send = [];
        $('#drop_file').fadeOut();

        $('#close-emoticons').hide();
        $('#open-emoticons').show();
        $('#emoticons').fadeOut();

        if (!$('.chat-msgs').hasClass('is-visible')) {
            $('.chat-msgs').addClass('is-visible');
        }

        $('li.chat-msg').removeClass('active');
        $('li.chat-group').removeClass('active');
        $(li).addClass('active');
        $('#chat-messages').html('');
        
        $('#message-to-send').data('receptor', id);
        $('#message-to-send').data('type', 'grupo');
        class_active = "group-"+id;
        var obj = {
            "emisor": _data.usuario._id,
            "receptor": id,
            "tipo_receptor": "grupo",
            "allUnread": true,
            "limit": true
        };
        
        $(li).find('.msg-unread').fadeOut(function() {
            $(li).find('.msg-unread').remove();
        })
        
        // Fill data chat window
        $('#img-chat').html('<img src="'+image+'" alt="avatar">');
        $('#img-chat').data('type', 'grupo');
        $('#img-chat').data('id', id);
        
        $('#open-chat-history').hide();
        $('#favorite-user').hide();

        $('#alias-chat').text(nombre.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase()));
        var groupDetail = _.find(_data.etiquetas, {_id: id.toString()});
        
        $('#user-chat').text('Grupo');
        // var _user = _.where(_data.usuarios, {_id: receptor.toString()})[0];
        
        // if (_user) {
        //     $('#user-chat').text(user+' - '+_user.group+' - '+_user.subgroup);
        // } else {
        //     $('#user-chat').text(user);
        // }
        
        
        socket.emit('get_chat_history', obj, function(data) {
            var sorted = _.sortBy(data, 'indexToOrder');
            
            var list_messages = parseMeesagesHistory(sorted, _data.usuario._id, id); 
            
            $('#chat-messages').html(list_messages);
            $('.chat-history').scrollTop($('.chat-history').prop("scrollHeight"));

            var read_obj = {
                emisor: _data.usuario._id, 
                receptor: id, 
                id_user: _data.usuario._id,
                tipo_receptor: 'grupo'
            };
            socket.emit('read_messages', read_obj, function(unread_messages) { });
            if (_data.chats[id]) {
                _data.chats[id].unread[id] = 0;
            }
        })
    })

    $(document).on('click','#img-chat',function(evt) {
        var id = $('#img-chat').data('id');
        var usuario = _.where(_data.usuarios, {_id: id.toString()})[0];
        var imagen = server+usuario.url_img;
        if (usuario.url_img == 'null' || usuario.url_img.length == 0) {
            imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
        }
        $('#bg-cimg #cimg img').attr('src', imagen);
        $('#user-profile').fadeIn();
        $('.u-alias').text(usuario.alias);
        $('#u-leyenda').text(usuario.leyenda);
        $('#u-pin').parent().hide();
        $('#user-status').hide();
    })

    $(document).on('click','#favorite-user',function(evt) {
        var id_f = $('#favorite-user').data('id');
        var favorite = {"_id": _data.usuario._id, "favoritos":[]};
        favorite.favoritos.push(id_f);
        
        if ($(evt.target).hasClass('fa-star-selected')) {
            $(evt.target).removeClass('fa-star-selected');
            var p_favorite = _data.usuario.favoritos.indexOf(id_f);
            _data.usuario.favoritos.splice(p_favorite, 1);
            socket.emit('remove_favorite', favorite, function(){});
        } else {
            $(evt.target).addClass('fa-star-selected');
            _data.usuario.favoritos.push(id_f);
            socket.emit('add_favorite', favorite, function(){});
        }
        return false;
    })

    var chatContent = document.getElementById('chat-content');
    chatContent.onscroll = function(ev) {
        if(this.scrollTop == 0){
            if($('#chat-messages').find('li').length > 0) {
                var last = $('#chat-messages').find('li').first().data('id');
                var receptor = $('#chat-messages').find('li').first().data('receptor');
                var grupo = $('#chat-messages').find('li').not('.date-li').first().data('grupo');
                
                var params = {emisor: _data.usuario._id, receptor: receptor, tipo_receptor: "usuario", last: last, limit: true};
                if (grupo != 'no') {
                    params = {emisor: receptor, receptor: grupo, tipo_receptor: "grupo", last: last, limit: true};
                }
                
                socket.emit('get_chat_history', params, function(data) {
                    $('#chat-messages').find('li.date-li').first().remove();
                    var sorted = _.sortBy(data, 'indexToOrder');
                    var list_messages = parseMeesagesHistory(sorted, receptor); 
                    if (grupo != 'no') {
                        list_messages = parseMeesagesHistory(sorted, receptor, grupo); 
                    }
                    $('#chat-messages').prepend(list_messages);
                    var top = $('#chat-messages li[data-id="'+last+'"]').offset().top;
                    $('.chat-history').scrollTop(top);
                })
            }
        }
    }

    $('#a-config').click(function(e) {
        $('#config').fadeIn();
        return false;
    })

    $('#close-config').click(function(e) {
        $('#config').fadeOut();
        return false;
    })

    $('#user-status p').click(function(e) {
        $('#user-status ul').fadeIn('fast');
    });

    $(document).on('click','#user-status li',function(evt) {
        let elm = $(evt.target);
        let id = elm.data('id');
        $('#user-status p').html(elm.html());
        $('#user-status li').removeClass('selected')
        elm.addClass('selected');
        _data.usuario.estado = id.toString();
        $('#user-status ul').fadeOut('fast');
        socket.emit('change_status_user', {"id_usuario": _data.usuario._id, "estado": id, "empresa": empresa}, (data) => {});
    });

    $(document).on('change', '.p_chk', function(evt) {
        var chk = $(evt.target);
        if (chk.prop('checked')) {
            chk.siblings('.sub-c').find('.sp_chk').prop('checked',true);
        } else {
            chk.siblings('.sub-c').find('.sp_chk').prop('checked',false);
        }
    });

    $(document).on('change', '.sp_chk', function(evt) {
        var chk = $(evt.target);
        var selc_chk = false;
        for (var sc of chk.parent().parent().find('.sp_chk')) {
            if ($(sc).prop('checked')) {
                chk.parent().parent().parent().siblings('.p_chk').prop("indeterminate", true);
                return;
            }
        }

        chk.parent().parent().parent().siblings('.p_chk').prop("indeterminate", false);
    })

    $('#close-difusion').click(function() {
        $('#cont-difusion').fadeOut();
    })

    $('#send_difusion').click(function() {
        let msg = nl2br($('.c-difusion textarea').val().replace(/^\s+|\s+$/g, ""));
        if (msg.length > 0) {            
            for (var schk of $('.sp_chk')) {
                if ($(schk).prop('checked')) {
                    var sg = $(schk).data('sg');
                    var users = _.where(_data.usuarios, {subgroup: sg})
                    
                    _.each(users, function(u) {
                        let receptor = u._id;
                        let emisor = _data.usuario._id;

                        var old_unread = {};
                        if (typeof(_data.chats[receptor]) == "undefined") {
                            old_unread[emisor] = 0;
                            old_unread[receptor] = 0;
                        } else {
                            old_unread = _data.chats[receptor].unread;
                        }

                        var type_msg  = "sos";
                        var files = [];

                        var msg_data = { 
                            "emisor": emisor, 
                            "receptor": receptor, 
                            "leido_por": [], 
                            "recibido_por": [], 
                            "empresa": _data.usuario.empresa, 
                            "unread": old_unread,
                            "creado_en": moment().format("DD-MM-YYYY, HH:mm:ss"),
                            "contenido": { 
                                "texto": msg, 
                                "tipo": type_msg, 
                                "url": files 
                            }, 
                            "tipo_receptor": 'usuario', 
                            "estado": {} 
                        };

                        msg_data.estado[receptor] = 1;
                        msg_data.estado[emisor] = 1;
    
                        socket.emit('new_message', msg_data, function(result) {
                            _data.chats[parseInt(msg_data.receptor)] = msg_data;
                        })

                    })
                }
            }
            getReadMessages();
            $('.c-difusion textarea').val('');
            Swal({
                type: 'success',
                title: 'Info...',
                text: 'Mensaje enviado'
            })
        } else {
            Swal({
                type: 'warning',
                title: 'Oops...',
                text: 'Debes escribir un mensaje'
            })
        }
    })

    $('#open-chat-history').click(function(e) {
        $('.chat-history-dates').toggle();
    })

    $('#search-history').click(function(e) {
        let begin = $('#history_begin').val();
        let end = $('#history_end').val();
        let receptor = $('#message-to-send').data('receptor').toString();
        let emisor = _data.usuario._id;

        if (begin.length > 0 && end.length > 0) {
            var obj = {
                "emisor": emisor,
                "receptor": receptor,
                "dateFrom": begin,
                "dateTo": end,
                "tipo_receptor": "usuario",
                "allUnread": true,
                "limit": true
            };

            socket.emit('get_chat_history', obj, function(data) {
                console.log(data); 
                var sorted = _.sortBy(data, 'indexToOrder');
                var list_messages = parseMeesagesHistory(sorted, receptor); 
                
                $('#chat-messages').html(list_messages);
                $('.chat-history').scrollTop($('.chat-history').prop("scrollHeight"));

                var read_obj = {
                    emisor: receptor, 
                    receptor: emisor, 
                    id_user: _data.usuario._id,
                    tipo_receptor: 'usuario'
                };
                socket.emit('read_messages', read_obj, function(unread_messages) { });
                if (_data.chats[receptor]) {
                    if (!_data.chats[receptor].unread) {
                        _data.chats[receptor].unread = [];
                    }
                    _data.chats[receptor].unread[receptor] = 0;
                }
                $('.chat-history-dates').hide();
            });
        } else {
             Swal({
                type: 'warning',
                title: 'Oops...',
                text: 'Debes indicar el rango de fechas a consultar'
            })
        }
    })
}

function fillStatuses() {
    var html_statuses = '';
    _.each(statuses, function(s) { 
        var active = '';
        if (s.id.toString() == _data.usuario.estado) {
            active = 'class="selected"';
            $('#user-status p').html('<i class="fa fa-circle" style="color:'+s.color+'"></i> '+s.title);
        }
        html_statuses += '<li data-id="'+s.id+'" '+active+'><i class="fa fa-circle" style="color:'+s.color+'"></i> '+s.title+'</li>'; 
    });
    $('#user-status ul').html(html_statuses);
}

function parseMeesagesHistory(sorted, receptor, group) {
    var list_messages = '';
    var last = '';
    var date = moment().format('YYYYMMDD');

    _.each(sorted, function(chat) {
        var mensaje = formatChatMessage(chat);
        var date1 = moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").format('YYYYMMDD');
        var grupo = (group) ? 'data-grupo="'+group+'"' : 'data-grupo="no"';

        if (date != date1) {
            list_messages += '<li class="date-li"><div class="content-border"><div class="border"></div><div class="text"><span>'
            + moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").format('dddd DD [de] MMMM / YYYY')
            + '</span></div></div></li>';
            date = date1;
        }

        if (receptor == chat.receptor || ((group) && receptor == chat.emisor)) {
            var leido = '<i class="fa fa-check" title="Leído" style="color: #38944e;"></i>';
            if ((chat.leido_por.indexOf(receptor.toString()) == -1) || (group)) {
                leido = '';
            }
            
            var class_m = (last.length == 0 || last == 'receptor') ? 'first-m' : '';
            list_messages += '<li class="clearfix '+class_m +'" data-id="'+chat._id+'" data-receptor="'+receptor+'" '+grupo+'>'
                + '<div class="message other-message float-right">'
                + mensaje
                + '</div>'
                + '<span class="date_msg-other">'+moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").format("hh:mm:ss A")+leido+'</span>'
                + '</li>';
            last = 'emisor';
        } else {
            var class_m = (last.length == 0 || last == 'emisor') ? 'first-m' : '';
            var img_group = '';
            var clr = '';
            if (group) {
                var image = (_.where(_data.usuarios, {_id: chat.emisor}).length > 0) ? server+_.find(_data.usuarios, {_id: chat.emisor}).url_img : 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
                img_group = '<div class="cont-img" style="width: 55px; height: 55px; overflow: hidden; border-radius: 50%;float: left;"><img src="'+image+'" alt="avatar" style="width:100%"></div>';
                clr = 'style="clear:none; margin-left: 15px; max-width: 80%;"';
            }
            list_messages += '<li class="'+class_m+'" data-id="'+chat._id+'" data-receptor="'+receptor+'" '+grupo+' style="clear:both;">'
                + img_group
                + '<div class="message my-message" '+clr+'>'
                + mensaje
                + '</div>'
                + '<span class="date_msg-my">'+moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").format("hh:mm:ss A")+'</span>'
                + '</li>';
            last = 'receptor';
        }
    })
    return list_messages;
}

function searchInUsers(query) {
    var new_users = [];
    if (query.length > 1) {
        _.each(_data.usuarios, function(o){
            var name = o.alias.toLowerCase().replace(/\s/g,'');
            var name_user = o.usuario.toLowerCase().replace(/\s/g,'');
            var grupo = "Sin asignar";
            var subgrupo = "Sin asignar";
            
            if (typeof(o.group) != "undefined") {
                grupo = o.group.toLowerCase().replace(/\s/g,'');
            }
            
            if (typeof(o.subgroup) != "undefined") {
                subgrupo = o.subgroup.toString().toLowerCase().replace(/\s/g,'');
            }

            if (name.indexOf(query) != -1 || grupo.indexOf(query) != -1 || subgrupo.indexOf(query) != -1 || name_user.indexOf(query) != -1) {
                new_users.push(o);
            } 
        })
    } else {
        new_users = _.clone(_data.usuarios);
        openMenuUser = true;
    }
    return new_users;
}

function sendMessage() {
    var receptor = $('#message-to-send').data('receptor').toString();
    var emisor = _data.usuario._id;
    var texto = nl2br($('#message-to-send').val().replace(/^\s+|\s+$/g, ""));

    var old_unread = {};
    if (typeof(_data.chats[receptor]) == "undefined") {
        old_unread[emisor] = 0;
        old_unread[receptor] = 0;
    } else {
        old_unread = _data.chats[receptor].unread;
    }

    var type_msg  = "text";
    var has_files = false;
    var files = [];

    if (files_to_send.length > 0) {
        type_msg = "attached";
        has_files = true;
        files = _.map(files_to_send, function(f) {
            var ext = f.result.original_name.split('.').pop();
            var n = {
                "url":f.result.url_file.replace('/public',''),
                "ext":ext,
                "typeFile":getTypeFile(ext),
                "name":f.result.original_name,
            };
            return n;
        });
    }

    var msg_data = { 
        "emisor": emisor, 
        "receptor": receptor, 
        "leido_por": [], 
        "recibido_por": [], 
        "empresa": _data.usuario.empresa, 
        "unread": old_unread,
        "creado_en": moment().format("DD-MM-YYYY, HH:mm:ss"),
        "contenido": { 
            "texto": texto, 
            "tipo": type_msg, 
            "url": files 
        }, 
        "tipo_receptor": $('#message-to-send').data('type'), 
        "estado": {} 
    };

    msg_data.estado[receptor] = 1;
    msg_data.estado[emisor] = 1;
    
    socket.emit('new_message', msg_data, function(result) {
        _data.chats[parseInt(msg_data.receptor)] = msg_data;
        if (has_files) {
            myDropzone.removeAllFiles();
            files_to_send = [];
            $('#drop_file').fadeOut();
        }
        getReadMessages();
        if (result.ok) {
            var class_m = (!$('#chat-messages li:last div').hasClass('other-message')) ? 'first-m' : '';
            msg = '<li class="clearfix '+class_m +'">'
                + '<div class="message other-message float-right">'
                + formatChatMessage(msg_data)
                + '</div>'
                + '<span class="date_msg-other">'+moment().format("hh:mm:ss A")+'</span>'
                + '</li>';
            $('#chat-messages').append(msg);
            $('.chat-history').scrollTop($('.chat-history').prop("scrollHeight"));
        }
    })

    $('#message-to-send').val('');
    if ($('#message-to-send').data('type') == 'grupo') {
        localStorage.removeItem("g"+receptor);
    } else {
        localStorage.removeItem(receptor);
    }
    $('#message-to-send').focus();

    $('#close-emoticons').hide();
    $('#open-emoticons').show();
    $('#emoticons').fadeOut();
}

function formatChatMessage(chat) {
    var mensaje = chat.contenido.texto;
    if (chat.contenido.tipo == 'attached') {
        mensaje = '';
        for (var att of chat.contenido.url) {
            switch (att.ext)  {
                case 'jpg': case 'jpeg': case 'gif': case 'png':
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="'+server+att.url+'" width="150px" /></a><br/>';
                    break;
                case 'pdf':
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="./img/icon-pdf.png" width="120px" /></a><br/>';
                    break;
                case 'xlsx':
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="./img/icon-xlsx.png" width="120px" /></a><br/>';
                    break;
                case 'docx':
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="./img/icon-docx.png" width="120px" /></a><br/>';
                    break;
                case 'zip':
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="./img/icon-zip.png" width="120px" /></a><br/>';
                    break;
                default:
                    mensaje += '<a href="'+server+att.url+'" target="_blank"><img src="./img/icon-unknown-file.png" width="120px" /></a><br/>';
                    break;
            }
            mensaje += '<i style="font-weight: 100;">'+att.name+'</i><br/><p>'+chat.contenido.texto+'</p>';
        }
    }  else if(chat.contenido.tipo == 'calendar') {
        var begin = moment(chat.contenido.texto.info.date_begin.replace(/(Z)|(\s)/g, ""));
        var hour_begin = chat.contenido.texto.info.hour_begin.split(":");
        hour_begin = hour_begin[0]+":"+hour_begin[1];
        var end = moment(chat.contenido.texto.info.date_end.replace(/(Z)|(\s)/g, ""));
        var hour_end = chat.contenido.texto.info.hour_end.split(":");
        hour_end = hour_end[0]+":"+hour_end[1];
        mensaje = '<div class="evt-calendar">'
            + '<div class="c-date">'
            + '<div class="c-cont-date">'
            + '<span class="c-month">'+begin.format('MMM')+'</span>'
            + '<span class="c-day">'+begin.format('DD')+'</span>'
            + '<span class="c-day-n">'+begin.format('ddd')+'</span>'
            + '</div>'
            + '</div>'
            + '<div class="c-info">'
            + '<h3>'+chat.contenido.texto.subject+'</h3>'
            + '<p class="ci-info"><b>Inicio: </b>'+begin.format('ddd DD MMM YYYY')+' '+hour_begin+'</p>'
            + '<p class="ci-info"><b>Fin: </b>'+end.format('ddd DD MMM YYYY')+' '+hour_end+'</p>'
            + '<p class="ci-info"><b>Lugar: </b>'+chat.contenido.texto.info.place+'</p>'
            + '<a href="javascript:openEvent('+chat.contenido.texto.info.id+')" class="lnk-event"><i class="fa fa-info-circle"></i> Ver Evento</a>'
            + '</div>'
            + '</div>';
    } else if (chat.contenido.tipo == 'to_do_list') {
        mensaje = '<div class="todo-list">'
            + '<h3>'+chat.contenido.texto.subject+' <i>'+chat.contenido.texto.detail+'</i></h3>'
            + '<p><b>Fecha vencimiento:</b> <span>'+moment(chat.contenido.texto.date_end).format('dddd DD [de] MMMM / YYYY')+'</span><br/>'
            + '<b>Hora vencimiento:</b> <span>'+chat.contenido.texto.hour_end+'</span></p>'
            + '</div>';
    } else if (chat.contenido.tipo == 'sos') {
        mensaje = '<div>'
            + '<div class="sos-msg"><i class="fa fa-bell" style="color: #fb5a4d;"></i> <b style="color: #fb5a4d;">SOS</b></div>'
            + chat.contenido.texto
            + '</div>';
    } else if (chat.contenido.tipo != 'text') {
        mensaje = '<div>'
         + '<h3>'+chat.contenido.texto.subject+'</h3>'
         + '<p>'+chat.contenido.texto.detail+'<p>'
         + '</div>';
    }
    return mensaje;
}

function login() {
    $.ajax({
        type: "POST",
        url: server+"/validater_user",
        data: {
            "user": user_intranet,
            "password": '123',
            // "user": "srestrepo",
            // "password": '1036631904',
            "mobile": false
        },
        error: function (request, status, error) {
            if (request.status == 403) {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Usuario y/o contraseña incorrectos'
                })
            } else {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: '¡Un error ha ocurido!. Intenta nuevamente.'
                })            
            }
        }

    })
    .done(function(result) {
        if (result.success) {
            urlSocket = result.url_socket;
            groupsPermissions = _.where(result.user[0].permission, {code: "1000_MANEJA_RESTRICCION_GRUPOS_CHAT"}).length > 0;
            namespace = result.user[0].company.replace(/[^A-Z0-9]/ig, "_");
            empresa = result.user[0].id_company;
            usuario = result.user[0].user;
            foto_user = result.user[0].photo;
            id_pedbox = result.user[0].id;

            localStorage.setItem('urlSocket', urlSocket);
            localStorage.setItem('groupsPermissions', groupsPermissions);
            localStorage.setItem('namespace', namespace);
            localStorage.setItem('empresa', empresa);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('id_pedbox', id_pedbox);
            localStorage.setItem('foto_user', foto_user);

            socket = returnSocket();
            return socket;
        } else {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: '¡Un error ha ocurido!. Intenta nuevamente.'
            })            
        }
    });
}

function returnSocket() {
    var imagen = server+foto_user;
    if (foto_user+"" == 'null') {
        imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
    }
    $('.foto_user').attr('src', imagen);
    // var socket = io('https://chat.pedbox.co:6306');
    console.log(urlSocket);
    var socket = io(urlSocket);

    socket.on('connect', function() {
        console.log('conectado...');
        
        socket.emit('login', {
            "usuario": encodeURI(usuario),
            "empresa": empresa.toString(),
            "dispositivo": "Web - Intranet"
        }, function(data){ console.log('login'); });

        socket.on('userconnect', function(data) {
            console.log('userconnect...');
            _data = data;
            _data.usuarios = _data.usuarios.concat(_data.usuario.externosInfo);
            usuarios = data.usuarios;
            getReadMessages();

            if (groupsPermissions) {
                getListGroupsPermissions();
            } else {
                fillUserList();
            }
            $('#login').fadeOut();
            $('#page-loader').fadeOut();
            
            $('.chat-cont').addClass('is-visible');
            
            if (!socket_connected) {
                suscribeSockets();
                socket_connected = true;
            }
        })
    })
    return socket;
}

function suscribeSockets() {

    socket.on('error', (error) => {
        console.log('error...', error);
    });
    
    socket.on('connect_error', function(error) {
        console.log('connect error...', error);
    });

    socket.on('new_user_connect', function(data) {
        var id_user = data._id;
        var id_socket = data._id;
        if (_.where(_data.usuarios, {_id: id_user.toString()}).length > 0) {
            var user = _.findWhere(_data.usuarios, {_id: id_user.toString()});
            user.id_socket = id_socket;
            user.estado = data.estado;
            refreshList();
        }
    })

    socket.on('user_disconnect', function(id_user) {
        if (_.where(_data.usuarios, {_id: id_user.toString()}).length > 0) {
            _.where(_data.usuarios, {_id: id_user.toString()})[0].id_socket = '';
            refreshList();
        }
    })

    socket.on('change_status_user', function(data) {
        let user = _.find(_data.usuarios, {_id: data.id_usuario + ''});

        if (user) {
            _.find(_data.usuarios, {_id: data.id_usuario + ''}).estado = data.estado + '';
            refreshList();
        }
    })

    socket.on('typing_message', function(data) {
        $('#people-list .msg-'+data.id_receptor+'-'+data.id_emisor+' .status').hide();
        $('#people-list .msg-'+data.id_receptor+'-'+data.id_emisor+' .about').append('<div class="status typing">Escribiendo...</div>')
        if (timeouts[data.id_receptor]) {
            clearTimeout(timeouts[data.id_receptor]);
        }
        timeouts[data.id_receptor] = setTimeout(() => { 
            $('#people-list .msg-'+data.id_receptor+'-'+data.id_emisor+' .status').show();
            $('#people-list .msg-'+data.id_receptor+'-'+data.id_emisor+' .typing').remove();
        }, 800);
    })

    socket.on('get_message', function(msg) {
        msg.unread = {};
        msg.unread[msg.emisor] = 0;
        msg.unread[msg.receptor] = 0;

        var user = null;
        var group = null;
        var thisMsg = '';

        if (msg.tipo_receptor == 'grupo') {
            _data.chatsGrupos[parseInt(msg.receptor)] = msg;
            group = _.where(_data.etiquetas, {_id: msg.receptor})[0];

            var imagen = 'https://app.pedbox.co/assets/images/avatars/profile-group.png';  
            if (typeof(group.url_img) != "undefined") {
                if (group.url_img != 'null' || group.url_img.length > 4) {
                    imagen = server+group.url_img;
                }
            }

            var noti = new Notification(group.nombre, {
                "body": msg.contenido.texto, 
                "data": {"li":"msg-"+msg.emisor+"-"+msg.receptor},
                "icon": imagen
            });

            thisMsg = "group-"+msg.receptor;
        } else {
            _data.chats[parseInt(msg.emisor)] = msg;
            user = _.where(usuarios, {_id: msg.emisor})[0];

            var imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
            if (typeof(user.url_img) != "undefined") {
                if (user.url_img != 'null' || user.url_img.length > 4) {
                    imagen = user.url_img;
                }
            }

            var noti = new Notification(user.alias, {
                "body": msg.contenido.texto, 
                "data": {"li":"msg-"+msg.emisor+"-"+msg.receptor},
                "icon": imagen
            });

            thisMsg = "msg-"+msg.receptor+"-"+msg.emisor;
        }

        noti.onclick = function(evt) {
            var n = $(evt.target);
            var li = n[0].data.li;
            $($('.'+li).children()[0]).trigger('click');
        }

        var new_msg = '';

        if (thisMsg == class_active) {
            var list_messages = parseMeesagesHistory([msg], msg.emisor);
            
            if (msg.tipo_receptor == 'grupo') {
                list_messages = parseMeesagesHistory([msg], _data.usuario._id, msg.receptor);
            }
            
            if (msg.emisor != _data.usuario._id) {
                $('#chat-messages').append(list_messages);
            }
            $('.chat-history').scrollTop($('.chat-history').prop("scrollHeight"));
        }
        getReadMessages();
    });

    socket.on('confirm_read_messages', function(result) {
        if ($('.msg-'+result.emisor+'-'+result.receptor).hasClass('active')) {
            _.each($('.date_msg-other'), function(o) {
                if ($(o).find('i').length == 0) {
                    $(o).append('<i class="fa fa-check" title="Leído" style="color: #38944e;"></i>');
                }
            })
        }
    })

    socket.on('get_without_read', function(result) {
        for (unr in _data.chats) {
            if (!_data.chats[unr].unread) {
                _data.chats[unr].unread = [];
            }
            _data.chats[unr].unread[_data.usuario._id] = 0;
        }

        for (etq in _data.chatsGrupos) {
            if (!_data.chatsGrupos[etq].unread) {
                _data.chatsGrupos[etq].unread = [];
            }
            _data.chatsGrupos[etq].unread[_data.usuario._id] = 0;
        }

        var count = 0;
        var unreads = _.where(result.unread, {tipo_receptor: "usuario"});
        
        if (unreads.length > 0) {
            unreads = _.groupBy(unreads, 'emisor');
            for (u in unreads) {
                if (typeof(_data.chats[u]) != "undefined") {
                    _data.chats[u].unread[_data.usuario._id] = unreads[u].length;
                    count += unreads[u].length;
                }
            }
        }

        var unreadsGroup = _.where(result.unread, {tipo_receptor: "grupo"});

        if (unreadsGroup.length > 0) {
            unreadsGroup = _.groupBy(unreadsGroup, 'receptor');
            for (g in unreadsGroup) {
                if (typeof(_data.chatsGrupos[g]) != "undefined") {
                    _data.chatsGrupos[g].unread[_data.usuario._id] = unreadsGroup[g].length;
                    count += unreadsGroup[g].length;
                }
            }
        }

        if (count > 0) {
                $('#count-msg-g').fadeIn();
                $('#count-msg-g span').text(count);
                $('.counter').fadeIn();
                $('.counter').text(count);
            } else {
                $('#count-msg-g').fadeOut();
                $('#count-msg-g span').text('');
                $('.counter').fadeOut();
                $('.counter').text('');
            }
        refreshList();
    })
}

function fillUserList(search) {
    var data = _data;
    var usuarios = (search) ? search : _.clone(_data.usuarios);
    var users_html = '';

    _.map(usuarios, (o) => { 
        if (o.subgroup.toString().length > 0) {
            var sg = subgroups[parseInt(o.subgroup)]; 
            if (typeof(sg) != "undefined") {
                o.group = sg.group; 
                o.subgroup = sg.subgroup; 
            }
        } else {
            o.group = "Sin asignar"; 
            o.subgroup = "Sin asignar"; 
        }
        return o; 
    });

    var grupos = _.groupBy(_.sortBy(usuarios, 'group'), 'group');
    for (var g in grupos) {
        var group = grupos[g];
        users_html += '<li class="nav-item top_nav">'
            + '<a class="nav-link" data-toggle="collapse" href="#'+g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'Sub" aria-expanded="true">'
            + '<p>'+g+'<b class="caret"></b></p>'
            + '</a>'
            + '<div class="collapse in" id="'+g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'Sub" style=""  aria-expanded="true">'
            + '<ul class="nav">';
        var subgrupos = _.groupBy(_.sortBy(group, 'subgroup'), 'subgroup');
        for (var sg in subgrupos) {
            var ref = ((g.replace(/\s/g,'').match(/[a-zA-Z]+/g)) != null) && (sg.replace(/\s/g,'').match(/[a-zA-Z]+/g) != null) ? g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'-'+sg.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('') : '';
            users_html += '<li class="nav-item sub_nav">'
            + '<a class="nav-link" data-toggle="collapse" href="#'+ref+'Sub" aria-expanded="true">'
            + '<p>'+sg+'<b class="caret"></b></p>'
            + '</a>'
            + '<div class="collapse in" id="'+ref+'Sub" style=""  aria-expanded="true">'
            + '<ul class="nav">';

            var users = subgrupos[sg]
            for (u of users) {
                var imagen = server+u.url_img;
                if (u.url_img == 'null' || u.url_img.length == 0) {
                    imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
                }

                var telefono = (u.telefono) ? u.telefono : '';
                var color_d = (u.estado) ? _.find(statuses, {id: u.estado.toString()}).color : "#86BB71";
                var status_title = (u.estado) ? _.find(statuses, {id: u.estado.toString()}).title : "Disponible";
                status_title = (u.id_socket.length > 0) ? status_title : "Desconectado";
                var color_status = (u.id_socket.length > 0) ? color_d : "#616161";
                users_html += '<li title="'+status_title+'" class="chat-msg clearfix msg-'+_data.usuario._id+'-'+u._id+'" data-grupo="'+g+'" data-subgrupo="'+sg+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+u._id+'" data-image="'+imagen+'" data-alias="'+u.alias+'" data-user="'+u.usuario+'" data-telefono="'+telefono+'">'
                + '<div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div><i class="indicator fa fa-circle" style="color:'+color_status+'"></i></div>'
                + '<div class="about"><div class="name">'+u.alias.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase())+'</div><div class="status">'+u.usuario+'</div></div>'
                + '</li>';
            }
            users_html += '</ul></div></li>';
        }
        users_html += '</ul></div></li>';
    }
    $('.list_user').html(users_html);

    var users_html_check = '';
    for (var g in grupos) {
        var group = grupos[g];
        users_html_check += '<li class="nav-item">'
            + '<input type="checkbox" class="p_chk" /> <a class="nav-link" data-toggle="collapse" href="#'+g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'1Sub" aria-expanded="true">'
            + '<p>'+g+'<b class="caret"></b></p>'
            + '</a>'
            + '<div class="collapse in sub-c" id="'+g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'1Sub" style=""  aria-expanded="true">'
            + '<ul class="nav sub_dif">';
        var subgrupos = _.groupBy(_.sortBy(group, 'subgroup'), 'subgroup');
        for (var sg in subgrupos) {
            var ref = ((g.replace(/\s/g,'').match(/[a-zA-Z]+/g)) != null) && (sg.replace(/\s/g,'').match(/[a-zA-Z]+/g) != null) ? g.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('')+'-'+sg.replace(/\s/g,'').match(/[a-zA-Z]+/g).join('') : '';
            users_html_check += '<li class="nav-item sub_nav">'
            + '<input type="checkbox" class="sp_chk" data-sg="'+sg+'" />'
            + '<a class="nav-link" data-toggle="collapse" href="#'+ref+'1Sub" aria-expanded="true">'
            + '<p>'+capitalize(sg)+'<b class="caret"></b></p>'
            + '</a>'
            + '<div class="sub-cu collapse in" id="'+ref+'1Sub" style=""  aria-expanded="true">'
            + '<ul class="nav">';

            var users = subgrupos[sg];
            for (u of users) {
                users_html_check += '<li>'
                    + '<input type="checkbox" class="usp_chk" data-uid="'+u._id+'" />'
                    + '<label>'+capitalize(u.alias)+'</label>'
                    +'</li>'
            }
            users_html_check += '</ul></div></li>';
        }
        users_html_check += '</ul></div></li>';
    }
    $('#cont-difusion .c-list ul').html(users_html_check);

    var groups_html = '';
    for (var etiqueta of _data.etiquetas) {
        var imagen = 'https://app.pedbox.co/assets/images/avatars/profile-group.png'
        if (etiqueta.url_img && (etiqueta.url_img != 'null' || etiqueta.url_img.length > 0)) {
            imagen = server+etiqueta.url_img;;
        }

        groups_html += '<li class="chat-group clearfix group-'+etiqueta._id+'" data-id="'+etiqueta._id+'" data-image="'+imagen+'" data-nombre="'+etiqueta.nombre+'" >'
            + '<div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div></div>'
            + '<div class="about"><div class="name">'+etiqueta.nombre.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase())+'</div><div class="status">Grupo</div></div>'
            + '</li>';
    } 
    $('.list_groups').html(groups_html);
    if (openMenuUser) {
        $('.list_user .nav-link').trigger('click');
        openMenuUser = false;
    }
}

function refreshList() {
    if ($('#search').val().length < 1 && ($('.del-chat:checked').length == 0)) {
        var data = _data;
        var users_html = '';
        var chats = _.map(_.keys(data.chats), (o) => { var chat = data.chats[o]; chat.user = o; return chat; });
        var chatsGrupos = _.map(_.keys(data.chatsGrupos), (o) => { var chat = data.chatsGrupos[o]; chat.group = o; return chat; })
        var sorted = _.sortBy(chats.concat(chatsGrupos), 'indexToOrder').reverse();
        
        _.each(sorted, (chat) => {
            var user = null;
            var group = null;
            var tagHtml = '';
            
            if (chat.tipo_receptor == 'grupo') {
                group = _.where(data.etiquetas, {_id: chat.group});
                tagHtml = 'group-'+chat.group;
            } else {
                user = _.where(usuarios, {_id: chat.user});
                tagHtml = 'msg-'+_data.usuario._id+'-'+chat.user;
            }
            
            var mensaje = chat.contenido.texto;
            var data_mensaje = mensaje.toString().replace(/<[^>]*>?/g, '');
            
            if (chat.contenido.tipo == 'attached') {
                switch (chat.contenido.url[0].ext)  {
                    case 'jpg': case 'jpeg': case 'gif': case 'png':
                        mensaje = '<i class="fa fa-file-image-o"></i> Imagen';
                        data_mensaje = '';
                        break;
                    default:
                        mensaje = '<i class="fa fa-file-o"></i> Archivo';
                        data_mensaje = '';
                        break;
                }
            } else if (chat.contenido.tipo == 'calendar') {
                mensaje = '<i class="fa fa-calendar-o"></i> Evento';
                data_mensaje = '';
            } else if (chat.contenido.tipo == 'task' || chat.contenido.tipo == 'to_do_list') {
                mensaje = '<i class="fa fa-list-ol"></i> Tarea';
            } else if (chat.contenido.tipo == 'task') {
                mensaje = '<i class="fa fa-bell"></i> Helpdesk';
            } else if (chat.contenido.tipo == 'sos') {
                mensaje = '<i class="fa fa-bell" style="color: #c1362c;"></i> <b style="color: #c1362c;">SOS</b> - '+mensaje.toString().replace(/<[^>]*>?/g, '');
            } else if (chat.contenido.tipo != 'text') {
                mensaje = '<i class="fa fa-bell"></i> Notificación';
            }

            var active_class = (class_active == tagHtml) ? 'active' : '';
            if (user != null) {
                var imagen = 'https://app.pedbox.co/assets/images/avatars/profile.jpg';
            } 

            if (group != null) {
                var imagen = 'https://app.pedbox.co/assets/images/avatars/profile-group.png';  
            }

            if (user != null) {
                if (user.length > 0) {
                    if (user[0].url_img) {
                        if (user[0].url_img != 'null' || user[0].url_img.length > 4) {
                            imagen = server+user[0].url_img;
                        }
                    }
                

                    var new_msg_alert = '';

                    if (chat.unread) {
                        if (chat.unread[_data.usuario._id] > 0) {
                            new_msg_alert = '<div class="msg-unread"><span>'+chat.unread[_data.usuario._id]+'</span></div>';
                        } 
                    }

                    var time_ago = moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").fromNow();

                    var telefono = (user[0].telefono) ? user[0].telefono : '';
                    var color_d = (user[0].estado) ? _.find(statuses, {id: user[0].estado.toString()}).color : "#86BB71";
                    var status_title = (user[0].estado) ? _.find(statuses, {id: user[0].estado.toString()}).title : "Disponible";
                    status_title = (user[0].id_socket.length > 0) ? status_title : "Desconectado";
                    var color_status = (user[0].id_socket.length > 0) ? color_d : "#616161";
                    users_html += '<li title="'+status_title+'" class="chat-msg clearfix '+active_class+' msg-'+_data.usuario._id+'-'+chat.user+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+chat.user+'" data-image="'+imagen+'" data-alias="'+user[0].alias+'" data-user="'+user[0].usuario+'" data-mensaje="'+data_mensaje+'" data-telefono="'+telefono+'">'
                        + '<input type="checkbox" class="del-chat" data-clase="msg-'+_data.usuario._id+'-'+chat.user+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+chat.user+'" data-tipo="usuario" /><div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div><i class="indicator fa fa-circle" style="color:'+color_status+'"></i></div>'
                        + '<div class="about"><div class="name">'+user[0].alias.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase())+'</div><div class="hide-status">Mensaje</div><div class="status">'+mensaje+'</div><div class="time-msg">'+time_ago+'</div>'
                        + new_msg_alert
                        + '</div></li>';
                }
            }

            if (group != null) {
                if (group.length > 0) {
                    if (group[0].url_img) {
                        if (group[0].url_img != null) {
                            imagen = server+group[0].url_img;
                        }
                    }
                }

                var new_msg_alert = '';


                if (chat.unread) {
                    if (chat.unread[_data.usuario._id] > 0) {
                        new_msg_alert = '<div class="msg-unread"><span>'+chat.unread[_data.usuario._id]+'</span></div>';
                    } 
                }
            

                var time_ago = moment(chat.creado_en, "DD-MM-YYYY, HH:mm:ss").fromNow();

                users_html += '<li class="chat-group clearfix '+active_class+' group-'+chat.group+'" data-id="'+chat.group+'" data-image="'+imagen+'" data-nombre="'+group[0].nombre+'" >'
                    + '<input type="checkbox" class="del-chat" data-clase="group-'+chat.group+'" data-emisor="'+_data.usuario._id+'" data-receptor="'+chat.group+'" data-tipo="grupo" /><div class="c-img"><div class="cont-img"><img src="'+imagen+'" alt="avatar"></div></div>'
                    + '<div class="about"><div class="name">'+group[0].nombre.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase())+'</div><div class="hide-status">Grupo</div><div class="status">Grupo</div><div class="time-msg">'+time_ago+'</div>'
                    + new_msg_alert
                    + '</div></li>';
            }
        });
        $('.list').html(users_html);
    }
}

function getReadMessages() {
    socket.emit('message_without_read', {"id_user": _data.usuario._id});
    // $.ajax({
    //     url: server+"/get_without_read?id_user="+id_usuario,
    //     type:"GET",
    //     dataType: "json"
    // })
    // .done(function(result) {
    //     for (unr in _data.chats) {
    //         _data.chats[unr].unread[_data.usuario._id] = 0;
    //     }

    //     var count = 0;
    //     if (result.unread.length > 0) {
    //         var unreads = _.groupBy(result.unread, 'emisor');
    //         for (u in unreads) {
    //             if (typeof(_data.chats[u]) != "undefined") {
    //                 _data.chats[u].unread[_data.usuario._id] = unreads[u].length;
    //                 count += unreads[u].length;
    //             }
    //         }
    //         if (count > 0) {
    //             $('#count-msg-g').fadeIn();
    //             $('#count-msg-g span').text(count);
    //         } else {
    //             $('#count-msg-g').fadeOut();
    //             $('#count-msg-g span').text('');
    //         }
    //     }
    //     refreshList();
    // })
}

function getListGroupsPermissions() {
    if (!permissionRequestPending) {
        permissionRequestPending = true;
        $.ajax({
            type:"GET",
            url: server+"/getChatGroupsPermissions?id_company="+empresa,
        })
        .done(function(result){
            if(result.success) {
                listGroupsPermissions = result.data;
                var g = subgroups[_data.usuario.subgroup].id_group;
                var sg = _data.usuario.subgroup;

                var tmp_subgroups = [];

                for (var p of listGroupsPermissions) {
                    if (p.group_parent == g && _.isNull(p.subgroup_parent)) {
                        var n_sub = _.map(_.where(subgroups, {id_group: p.group_rel}), function(o) { return o.id; });
                        if (!_.isNull(p.subgroup_rel)) {
                            n_sub = _.map(_.where(subgroups, {id: p.subgroup_rel}), function(o) { return o.id; });
                        }
                        _.each(n_sub, function(ns) {
                            if (tmp_subgroups.indexOf(ns) == -1) {
                                tmp_subgroups.push(ns);
                            }
                        })
                    }
                    if (p.group_parent == g && p.subgroup_parent == sg) {
                        var n_sub = _.map(_.where(subgroups, {id_group: p.group_rel}), function(o) { return o.id; });
                        if (!_.isNull(p.subgroup_rel)) {
                            n_sub = _.map(_.where(subgroups, {id: p.subgroup_rel}), function(o) { return o.id; });
                        }
                        _.each(n_sub, function(ns) {
                            if (tmp_subgroups.indexOf(ns) == -1) {
                                tmp_subgroups.push(ns);
                            }
                        })
                    }
                    if (p.group_rel == g && _.isNull(p.subgroup_rel)) {
                        var n_sub = _.map(_.where(subgroups, {id_group: p.group_parent}), function(o) { return o.id; });
                        if (!_.isNull(p.subgroup_parent)) {
                            n_sub = _.map(_.where(subgroups, {id: p.subgroup_parent}), function(o) { return o.id; });
                        }
                        _.each(n_sub, function(ns) {
                            if (tmp_subgroups.indexOf(ns) == -1) {
                                tmp_subgroups.push(ns);
                            }
                        })
                    }

                    if (p.group_rel == g && p.subgroup_rel == sg) {
                        var n_sub = _.map(_.where(subgroups, {id_group: p.group_parent}), function(o) { return o.id; });
                        if (!_.isNull(p.subgroup_parent)) {
                            n_sub = _.map(_.where(subgroups, {id: p.subgroup_parent}), function(o) { return o.id; });
                        }
                        _.each(n_sub, function(ns) {
                            if (tmp_subgroups.indexOf(ns) == -1) {
                                tmp_subgroups.push(ns);
                            }
                        })
                    }
                }

                var copy_users = _.clone(_data.usuarios);
                _data.usuarios = [];
                _.each(copy_users, function(u) {
                    if (tmp_subgroups.indexOf(u.subgroup) != -1 || u.subgroup == _data.usuario.subgroup) {
                        _data.usuarios.push(u);
                    }
                })
            
                fillUserList();
            }
            permissionRequestPending = false;
        });
    }
}

function openEvent(id) {
    var token = utf8_to_b64(usuario+'||123||calendar/'+id+',quote');
    shell.openExternal("https://app.pedbox.co/login/0/"+token);
    return false;
}

function utf8_to_b64(str) {
   return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
   return decodeURIComponent(escape(window.atob(str)));
}

function nl2br(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function getTypeFile(ext) {
    switch (ext) {
        case 'jpg': case 'jpeg': case 'gif': case 'png':
            return 'image';
        case 'mp4': case 'webm': case 'ogv':
            return 'video';
        case 'mp3': case 'wav': case 'ogg':
            return 'audio';
        default:
            return 'file';
    }
}

function allowNotification() {
    // Comprobamos si el navegador soporta las notificaciones
    if (!("Notification" in window)) {
        console.error("Este navegador no soporta las notificaciones del sistema");
    }

    // Comprobamos si ya nos habían dado permiso
    else if (Notification.permission === "granted") {
        // Si esta correcto lanzamos la notificación
        console.log('Notificaciones activas');
    }

    // Si no, tendremos que pedir permiso al usuario
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // Si el usuario acepta, lanzamos la notificación
            if (permission === "granted") {
                console.log('Notificaciones activas');
            }
        });
    }
}

function showUsers() {
    $('#showUsers').addClass('selected');
    $('#showGroups').removeClass('selected');
    $('#new_chat_list .list_user').show();
    $('#new_chat_list .list_groups').hide();
}

function showGroups() {
    $('#showUsers').removeClass('selected');
    $('#showGroups').addClass('selected');
    $('#new_chat_list .list_user').hide();
    $('#new_chat_list .list_groups').show();
}

function capitalize(str) {
    var strings = str.split(' ');
    var aStrings = [];
    for (var s of strings) {
        aStrings.push(s.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
            return index == 0 ? word.toUpperCase() : word.toLowerCase();
        }));
    }
    return aStrings.join(' ');
}