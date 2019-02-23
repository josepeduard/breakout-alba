
var ctx = document.getElementById("ctx").getContext("2d");
var WIDTH = 500; //capital letter better
var HEIGHT = 500;
var numOfTiles, tileList, scrore, intervalVar, running = false;
ctx.font = "20px Calibri"; 
ctx.fillText('Toca para empezar', 175, 250 )


//definimos pelota
var ball = {
    x: 0,
    y: 0,
    radius: 5,
    color: "cornsilk",
    speedX: -5,
    speedY: -5,
};

//definimos plataforma
var base = {
    x:0,
    y:400,
    height: 20,
    width: 100,
    color: "olive",
    pressingLeft: false,
    pressingRight: false,
    lives: 3,
}

//4 Definamos los tiles

var tile = {
    height: 20,
    width: 40, 
    color: "LightPink"
}

document.getElementById('ctx').onmousedown = function(){
    if (running){
        running = false;
        clearInterval(intervalVar);
    }
    startGame();
}

//2 Movimientos de la base
document.onkeydown = function(event){
    if(event.keyCode == 37){
        base.pressingLeft = true;
        base.pressingRight = false;
    }
    else if (event.keyCode == 39) {
        base.pressingLeft = false;
        base.pressingRight = true;
    }
}


document.onkeyup = function(event){
    if(event.keyCode == 37){
        base.pressingLeft = false;
    }else if (event.keyCode == 39){
        base.pressingRight = false;
    }
}


//3 golpeo de la pelota

testCollision = function(base, ball){
return ((base.x < ball.x + 2*ball.radius) && 
         (ball.x < base.x + base.width) && 
         (base.y < ball.y + 2*ball.radius) && 
          (ball.y < base.y + base.height))
}
testCollisionTile = function(t, ball){
return ((t.x < ball.x + 2*ball.radius) && 
        (ball.x < t.x + tile.width) && 
        (t.y < ball.y + 2*ball.radius) && 
        (ball.y < t.y + tile.height))
}



//dibujamos pelota
drawBall = function (){
    ctx.save();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.restore();
}

//dibujamos plataforma
drawBase = function(){
    ctx.save();
    ctx.fillStyle = base.color;
    ctx.fillRect(base.x, base.y, base.width, base.height);
    ctx.restore();
}


//4. Dibujamos los tile

drawTile = function(t,i){
    ctx.save();
    ctx.fillStyle = tile.color;
    ctx.fillRect(t.x, t.y, tile.width, tile.height);
    ctx.restore();
}


//2. posición de la base

updateBasePosition = function(){
    if(base.pressingLeft){
        base.x = base.x - 5;
    }
    else if(base.pressingRight){
        base.x = base.x + 5;
    }
    if(base.x < 0){
        base.x = 0;
    }
    if(base.x > WIDTH - base.width){
        base.x = WIDTH - base.width;
    }
}


// 3. movimiento de la pelota y limites

updateBallPosition = function() {
    ball.x += ball.speedX;
    ball.y += ball.speedY; 
    if(ball.x > WIDTH || ball.x < 0) {
        ball.speedX = -ball.speedX
    }
    if (ball.y < 0){
        ball.speedY = -ball.speedY
    }
    if (ball.y > HEIGHT) {
        ball.x = 250;
        ball.y = 250;
        ball.speedY = -ball.speedY
        base.lives--;
    }
}  

//5. Game over

isGameOver = function(){
    if (base.lives <= 0 || score == 330){
        clearInterval(intervalVar);
        ctx.fillText("¡Se acabó! Toca de nuevo", 150,250);

    }
}

update = function() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    tileList.forEach(drawTile); 
    drawBall();
    drawBase();

    if (testCollision(base, ball)){
        ball.speedY = -ball.speedY;
    }

    for (key in tileList){
        if(testCollisionTile(tileList[key], ball)){
         delete tileList[key];
         ball.speedY = -ball.speedY;
         score += 5;
        }
    }

    ctx.fillText("Puntos: " + score, 5, 490);
    ctx.fillText("Vidas: " + base.lives, 430, 490);

    isGameOver();
    updateBasePosition();
    updateBallPosition();
}

//Llamamos funciones
startGame = function(){
    base.x = 150;
    ball.x = base.x + 100;
    ball.y = base.y - 100;
    numOfTiles = 0;
    var tileX = 5;
    var tileY = 5;
    tileList = [];
    score = 0;
    base.lives = 3;
    running = true;
    for(var i=1; i<=6; i++){
        tileX = 5;
        for(var j=1; j<=11; j++){
            tileList[numOfTiles] = {x:tileX, y:tileY};
            numOfTiles++;
            tileX += 45;
        }
        tileY += 25;
    }
   intervalVar = setInterval(update, 20); 
}

//llamamos la función de empezar
