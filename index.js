
function getLength() {
    let data = document.cookie;
    if(data == "") {
        return 0;
    }else{
        let cl = data.split(';');
        return cl.length;
    }
}
function setCookie() {
    let name = getLength();
    let date = new Date();
    date.setTime(date.getTime());
    let exp = new Date();
    exp.setTime(exp.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires="+exp.toUTCString();
    document.cookie = name + "=" + date + ";" + expires + "domain=localhost;" + "path=/;";
    console.log(document.cookie);
}
window.onload = function() {
    if(!sessionStorage.hasOwnProperty("active")) {
        setCookie();
        sessionStorage.setItem("active", "yes");
    }
}

