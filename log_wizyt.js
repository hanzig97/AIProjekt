
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
window.onload = function() {
    function getLength() {
        let data = document.cookie;
        if(data == "") {
            return 0;
        }else{
            let cl = data.split(';');
            return cl.length;
        }
    }
    let i = 0;
    if(getLength()>0) {
        document.getElementById("cookie_monster").innerHTML = "";
    }
    while(getCookie(i)!="") {
        document.getElementById('cookie_monster').insertAdjacentHTML('beforeend', getCookie(i) + "<br>");
        i+=1;
    }
}
