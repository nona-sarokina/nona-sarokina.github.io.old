$(function () {
    setInterval(f, 1000);
    
    function f() {
        var tLeft = Math.floor(Math.random()*100000),
            tTop  = Math.floor(Math.random()*10000);

        var style = "position: absolute; left:" +  tLeft + "; top: " + tTop + "";
        document.getElementById("container").innerHTML += "<div style='" + style + "'><img src='images/cat.ico'/> <span class='mew'>мяф </span></div>";
    }
});

