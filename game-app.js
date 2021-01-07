
// variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
// paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
// controls variables
var rightPressed = false;
var leftPressed = false;
// brick variables
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// counting the score of the user
var score = 0;
// user lives
var lives = 3;

// looping through the columns and rows, and create new bricks

var bricks = [];
for(var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {
      x: 0, y: 0, status: 1
    };
  }
}



// functions

// controls functions

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// collision detection

function collisionDetection() {
  for(var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      // calculations
    if(b.status == 1)  {
        if(x > b.x && x < b.x + brickWidth && y > b.y && b.y < brickHeight) {
        dy = -dy;
        b.status = 0;
        score++;
        // end of the game
        if(score == brickRowCount * brickColumnCount) {
          alert("You win, congrats!");
          document.location.reload(); // reloads the page and starts the game after the win alert is displayed
        }
      }
    }
    }
  }
}


// ball

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// paddle

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// draw bricks function

function drawBricks() {
  for(var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle() = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    }
  }
}

// counting the score function

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// user lives functions

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(); // drawing the bricks
    drawBall(); // drawing the ball
    drawPaddle(); // drawing the paddle
    drawScore(); // drawing the score
    drawLives(); // draws the user lives
    collisionDetection(); // activating collision detection

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height - ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--; // decrements the user Lives
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();

      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2
        dy = -2;
        paddleX = (canvas.width - paddle.width) / 2;
      }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw); // makes the draw() function call itself over and over again
}

draw();

