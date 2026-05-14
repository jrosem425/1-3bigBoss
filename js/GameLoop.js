var canvas, context, ball, player, timer, interval = 1000/60;
var frictionX = 1;
var frictionY = 1;
var gravity = 0.3;

var score = 0;

var d = false;
var a = false;

canvas = document.getElementById("canvas")
context = canvas.getContext("2d")




ball = new GameObject(canvas.width/2,canvas.height/2,80,80,"#ff00ff")
player = new GameObject( canvas.width/2, canvas.height - 50, 250, 40,"#00ffff")
ball.vx = 0;
ball.vy = 0;
ball.jumpSpeed = -20;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);


    context.font = "16px Arial black";
    context.fillstyle = "#555555";
    context.fillText("Score: " + score, 80, 25);


   
    doHandleAcceleration();
    doApplyFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckBottomBounds();
     


    ball.move();
    if(ball.x > canvas.width + ball.width/2 - 100)
    {
         ball.vx *= -1;
    }
     if (ball.x < 0 + ball.width/2)
     {
         ball.vx *= -1;
         ball.x ++;
     }
     if(ball.y > canvas.height + ball.height/2 - 100)
     {
         ball.vy *= -1;
         score = 0;
     }


    player.move();

    if (player.x < canvas.width/2 -400)
    {
        player.x = canvas.width/2 - 400
        if (player.vx < 0) player.vx = 0;
    }
    if (player.x > canvas.width/2 + 400)
    {
        player.x = canvas.width/2 + 400
        if (player.vx > 0) player.vx = 0;
    }
    
    function doHandleAcceleration () 
    {
        if (d) {
            player.vx += player.ax * player.force;
        }

        if (a) {
            player.vx += player.ax * -player.force;
        }
    }

    if(ball.collisionCheck(player))
    {

        /////OUTER LEFT
        if(ball.x < player.x - player.width/3)
        {
            console.log("Outer Left")
            ball.vy =- 10
            ball.vx = ball.force * -5
            score++;

        }
        /////INNER LEFT
        else if(ball.x < player.x - player.width/6)
        {
            console.log("Inner Left")
            ball.vy =- 10
            ball.vx = ball.force * -2.5
            score++;
        }
        /////CENTER
        else if(ball.x < player.x + player.width/6)
        {
            console.log("Center")
            ball.vy =- 10
            ball.vx = ball.force * 0
            score++;
        }
        /////INNER RIGHT 
        else if(ball.x < player.x + player.width/3)
        {
            console.log("Inner Right")
            ball.vy =- 10
            ball.vx = ball.force * 2.5
            score++;
        }
        /////OUTER LEFT
        else
        {
            console.log("Outer Right")
            ball.vy =- 10
            ball.vx = ball.force * 5
            score++;
        }

    
    }

    function doHandleGravity () {
        ball.vy += gravity;
    }

    function doUpdatePosition () {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }

    function doCheckBottomBounds() {
        if (ball.y > canvas.height - ball.height/2) 
        {
        }
    }

    function doApplyFriction()
    {
        player.vx *= 0.93;
    }


        context.beginPath();
    {
        context.moveTo(ball.x, ball.y);
        context.lineTo(player.x, player.y);
        context.closePath();
        context.lineWidth = 6;
        context.stroke();
        
    }

        ball.drawCircle();
        player.drawRect();



}
 