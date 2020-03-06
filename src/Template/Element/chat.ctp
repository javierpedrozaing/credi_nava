<div id="cont-difusion">
    <div class="c-difusion">
        <h3>Nuevo mensaje masivo</h3>
        <span id="close-difusion">X</span>
        <div class="c-list">
            <ul></ul>
        </div>
        <textarea placeholder="Escribe un mensaje..."></textarea>
        <button id="send_difusion" title="Enviar Mensaje"><i class="fa fa-paper-plane"></i></button>
    </div>
</div>
<div class="fabs">
    <div class="chat">
        <div class="cont-chat">
            <div class="sidebar-chat">
                <ul id="icons_chat">
                    <li class="first-u">
                        <div id="cimg">
                            <img src="" class="foto_user">
                        </div>
                    </li>
                    <li class="active">
                        <a href="#" class="icons_chat" id="active_chat" title="Chats Activos">
                            <i class="fa fa-comments-o"></i>
                            <span class="counter"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="icons_chat" id="new_chat" title="Nuevo Chat">
                            <i class="fa fa-plus"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="icons_chat" id="show_favorites" title="Ver favoritos">
                            <i class="fa fa-star"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="icons_chat" id="msg_difusion" title="Enviar mensaje masivo">
                            <i class="fa fa-reply-all"></i>
                        </a>
                    
                    <li>
                        <a href="#" class="icons_chat" id="helpdesk" title="Ir a Helpdesk">
                            <i class="fa fa-headphones"></i>
                        </a>
                    </li>
                </ul>
                <div class="ico-pedbox">
                    <a href="http://pedbox.co" title="Pedbox APP V.1.2" id="open-pedbox" target="_blank" rel="nofollow">
                        <?= $this->Html->image('pedbox.png'); ?>
                    </a>
                </div>
            </div>
            <div class="people-list" id="user-profile">
                <div id="bg-cimg">
                    <a id="close-user-profile" href="#">
                        <i class="fa fa-times"></i>
                    </a>
                    <div id="cimg">
                        <img src="" class="foto_user">
                    </div>
                    <h4 class="u-alias"></h4>
                    <div id="user-status">
                        <p><i class="fa fa-circle" style="color:#86BB71"></i> Disponible</p>
                        <ul></ul>
                    </div>
                </div>
                <div class="card-prodile">
                    <h5>Alias</h5>
                    <p class="u-alias"></p>
                </div>
                <div class="card-prodile">
                    <h5>Leyenda</h5>
                    <input type="text" name="legend" />
                    <p id="u-leyenda"><input type="text" name="legend" /></p>
                </div>
                <div class="card-prodile">
                    <h5>Pin</h5>
                    <p id="u-pin"></p>
                </div>
            </div>
            <div class="people-list" id="people-list">
                <div class="search">
                    <input type="text" placeholder="Buscar..." id="search">
                    <i class="fa fa-search"></i>
                    <div class="chk-all">
                        <input type="checkbox" name="chk-all" id="chk-all" />
                        <label for="chk-all">Seleccionar Chat Activos (Todos)</label>
                    </div>
                </div>
                <ul class="list"></ul>
            </div>
            <div class="people-list" id="new_chat_list">
                <div class="tabs-user">
                    <a href="javascript:showUsers()" class="selected" id="showUsers">Usuarios</a>
                    <a href="javascript:showGroups()" id="showGroups">Grupos</a>
                </div>
                <div class="search">
                    <input type="text" placeholder="Buscar..." id="search_user">
                    <i class="fa fa-search"></i>
                </div>
                <ul class="list_user"></ul>
                <ul class="list_groups"></ul>
            </div>
            <div class="people-list" id="favorites">
                <ul class="list_user_fav"></ul>
            </div>
            <div class="chat chat-msgs">
                <div class="chat-history-dates">
                    <span> Desde </span>
                    <input type="date" name="history_begin" id="history_begin" />
                    <span>  hasta  </span>
                    <input type="date" name="history_end" id="history_end" />
                    <button id="search-history"><i class="fa fa-search"></i></button>
                </div>
                <form action="/file-upload" id="drop_file">
                    <div class="dz-message">Seleccione un archivo<br/><i class="fa fa-upload" style="font-size: 30px;padding-top: 10px;"></i></div>
                    <div class="fallback">
                        <input name="file" type="file" multiple />
                    </div>
                </form>
                <div class="chat-header clearfix">
                    <div class="cont-img" id="img-chat"></div>
                    <div class="chat-about">
                        <div class="chat-with" id="alias-chat"></div>
                        <div class="chat-num-messages" id="user-chat"></div>
                    </div>
                    <i class="fa fa-star" id="favorite-user" title="Marcar como favorito"></i>
                    <i class="fa fa-history" id="open-chat-history" title="Buscar historial de conversación"></i>
                </div>
                <!-- end chat-header -->
                <div class="chat-history" id="chat-content">
                    <ul id="chat-messages"></ul>
                </div>
                <!-- end chat-history -->
                <div id="emoticons"></div>
                <div class="chat-message clearfix">
                    <div class="cont-fa">
                        <i class="fa fa-smile-o" id="open-emoticons"></i>
                        <i class="fa fa-keyboard-o" id="close-emoticons"></i>
                    </div>
                    <div class="cont-fa">
                        <i class="fa fa-paperclip" id="open-attach"></i>
                    </div>
                    <textarea name="message-to-send" id="message-to-send" placeholder="Escribe tu mensaje" rows="3"></textarea>
                    <button id="send" title="Enviar Mensaje"><i class="fa fa-paper-plane"></i></button>
                </div>
                <!-- end chat-message -->
            </div>
        </div>
    </div>
    <div id="count-msg-g"><span>20</span></div>
    <a id="prime" class="fab">
        <i class="material-icons">chat</i>
    </a>
</div>
<script type="text/javascript">
    var user_intranet = <?= json_encode($user_intranet) ?>;
    user_intranet = user_intranet.cod_usu;
</script>