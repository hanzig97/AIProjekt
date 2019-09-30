
(function(){
    var width = window.innerWidth;

    var canvas = document.getElementById("plot");
    canvas.width = width*0.60;

    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var T;
    var T1;
    var T2;
    var k1;
    var k2;

    document.getElementById("T").addEventListener("change", refresh);
    document.getElementById("T1").addEventListener("change", refresh);
    document.getElementById("T2").addEventListener("change", refresh);
    document.getElementById("k1").addEventListener("change", refresh);
    document.getElementById("k2").addEventListener("change", refresh);


    function refresh(){
        get_constants();
        draw();
    }

    function get_constants(){
        T = document.getElementById("T").value;
        T1 = document.getElementById("T1").value;
        T2 = document.getElementById("T2").value;
        k1 = document.getElementById("k1").value;
        k2 = document.getElementById("k2").value;
    }
    // function CX(x){
    // 	return x;
    // }

    function CY(y){
        return height - y;
    }

    function step_inertia1(t){
        return k1*(1-Math.exp(-t/T));
    }

    function step_inertia2(t){
        var T3 = (T1/2) + Math.sqrt((T1^2/4)-T2^2);
        var T4 = (T1/2) - Math.sqrt((T1^2/4)-T2^2);

        return k2*(1 - (1/(T3-T4))*(T3*Math.exp(-t/T3)-T4*Math.exp(-t/T4)));
    }

    function draw(){

        //czyszczenie canvas

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //rysowanie ukladu wspolrzednych

        ctx.strokeStyle = "Black";

        ctx.beginPath();                //os Y
        ctx.moveTo(10,0);
        ctx.lineTo(10,height);
        ctx.stroke();

        ctx.beginPath();                //strzalka Y
        ctx.moveTo(0,10);
        ctx.lineTo(10,0);
        ctx.lineTo(20,10);
        ctx.stroke();

        for(var i = height-30; i > 10; i-=20){
            ctx.beginPath();            //podzialka Y
            ctx.moveTo(5,i);
            ctx.lineTo(15,i);
            ctx.stroke();
        }

        ctx.beginPath();                //os X
        ctx.moveTo(0,height-10);
        ctx.lineTo(width,height-10);
        ctx.stroke();

        ctx.beginPath();                //strzalka X
        ctx.moveTo(width-10,height-20);
        ctx.lineTo(width,height-10);
        ctx.lineTo(width-10,height);
        ctx.stroke();

        for(var i = width-30; i > 10; i-=20){
            ctx.beginPath();            //podzialka X
            ctx.moveTo(i,height-5);
            ctx.lineTo(i,height-15);
            ctx.stroke();
        }

        //rysowanie inercji 1-szego rzedu

        ctx.moveTo(10,CY(0));
        ctx.strokeStyle = "Red";
        ctx.beginPath();

        for (var x = 0; x <= width-20; x += 1) {
            var y = 100*step_inertia1(x);
            ctx.lineTo(x+10,CY(y)-10);
        }
        ctx.stroke();

        //rysowanie inercji 2-go rzedu

        ctx.moveTo(10,CY(0));
        ctx.strokeStyle = "Blue";
        ctx.beginPath();

        for (var x = 0; x <= width-20; x += 1) {
            var y = 100*step_inertia2(x);
            ctx.lineTo(x+10,CY(y)-10);
        }
        ctx.stroke();
    }
    get_constants();
    draw();
})
();
