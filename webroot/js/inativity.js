var inactivityTime = function () {
    
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
        alert("Debes iniciar sesión nuevamente")
        location.href = '/users/logout'
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, milisegundos_inactivo)
    }


    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer; // touchscreen presses
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;     // touchpad clicks
    document.onscroll = resetTimer;    // scrolling with arrow keys
    document.onkeypress = resetTimer;

};


window.onload = function() {
    inactivityTime(); 
}


