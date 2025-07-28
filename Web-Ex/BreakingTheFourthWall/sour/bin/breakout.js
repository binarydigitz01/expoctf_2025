window.addEventListener("load", async function() {
  let arr = await Scheme.load_main("breakout.wasm", {
    user_imports: {
      document: {
        document: () => document,
        body() { return document.body; },
        createTextNode: Document.prototype.createTextNode.bind(document),
        createElement: Document.prototype.createElement.bind(document),
        getElementById: Document.prototype.getElementById.bind(document),
        setTimeout(timeout,proc){return setTimeout(proc,timeout);},
        alert(str){alert(str);}
      },
      element: {
        appendChild(parent, child) {  parent.appendChild(child); },
        setAttribute(elem,name,value){elem.setAttribute(name,value);},
        remove(elem) { elem.remove(); },
        addEventListener(elem, name, f) { elem.addEventListener(name, f); },
        keyboardCode(event){return event.code;},
        preventDefault(event){event.preventDefault();},
        getValue(elem){return elem.value;},
        setValue: (elem, value) => elem.value = value,
        setTextContent: (elem, txt) => elem.textContent = txt,
      },
      style: {
        setPosition(elm,pos){elm.style.position = pos;},
        setTop(elm,pos){elm.style.top = pos;},
        setLeft(elm,pos){elm.style.left = pos;},
        setTransform(elm,trns){elm.style.transform=trns;},
        setBackground(elm,background){elm.style.background = background;},
        setColor(elm,color){elm.style.color=color;},
        setPadding(elm,padding){elm.style.padding = padding;},
        setBorderRadius(elm,r){elm.style.borderRadius = r;},
        setzIndex(elm,z){elm.style.zIndex=z;},
        setDisplay(elm, display){elm.style.display = display;}
      },
      ctx: {
        beginPath(ctx){ctx.beginPath();},
        arc(ctx,x,y,radius){ctx.arc(x,y,radius,0,Math.PI * 2);},
        rect(ctx,x,y,width,height){ctx.rect(x,y,width,height)},
        clearRect(ctx,x,y,width,height){ctx.clearRect(x, y, width, height);},
        setFillStyle(ctx,color){ctx.fillStyle = color;},
        setFont(ctx, font){ctx.font = font;},
        fillText(ctx,text,x,y){ctx.fillText(text,x,y);},
        fill(ctx){ctx.fill();},
        stroke(ctx){ctx.stroke();},
        closePath(ctx){ctx.closePath();},
        setLineWidth(ctx, n){ctx.lineWidth = n;},
        setStrokeStyle(ctx,style){ctx.strokeStyle = style;},
        reqframe(proc){window.requestAnimationFrame(proc);},
        setFont(ctx, font){ctx.font = font;},
        fillText(ctx, str, x, y){ctx.fillText(str,x,y);},
      },
      canvas: {
        getCtx(canvas){return canvas.getContext("2d");},
        getHeight(canvas){return canvas.height;},
        getWidth(canvas){return canvas.width;},
        setHeight(canvas, h){canvas.height = h;},
        setWidth(canvas, w){canvas.width = w;}
      },
      window: {
        getWidth(){return window.innerWidth;},
        getHeight(){return window.innerHeight;},
      },
      console: {
        log(obj){console.log(obj)}
      }
    }
  });
  console.log(arr)
});


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

let score = 0;
let lives = 3;
let gameStarted = false;
let gameOver = false;
let infiniteLives = false;

let ballDX = 3;
let ballDY = -3;
let paddleSpeed = 7;
let invisible = false;

async function fetchSpeeds() {
  try {
    const response = await fetch("/getSpeeds");
    const params = new URLSearchParams(await response.text());

    if (params.has("bS")) {
      ballDX = parseFloat(params.get("bS"));
      ballDY = -parseFloat(params.get("bS"));
    }
    if (params.has("pS")) {
      paddleSpeed = parseFloat(params.get("pS"));
    }
  } catch (error) {
    console.error("Failed to fetch speeds:", error);
  }
}

const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

let ballRadius = 7;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;

const brickRowCount = 10;
const brickColumnCount = 20;
const brickWidth = canvas.width / brickColumnCount;
const brickHeight = 20;
const brickOffsetTop = 50;

const baseColors = [
  [255, 0, 0],
  [255, 165, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 0, 255]
];

function seededRandom(s) {
  let x = Math.sin(s) * 10000;
  return x - Math.floor(x);
}

let bricks = [];

function initializeBricks() {
  bricks = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[r] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      let randomIndex = Math.floor(seededRandom(seed + r * brickColumnCount + c) * baseColors.length);
      let hits = 5 - randomIndex;
      let hiddenNumber = Math.floor(seededRandom(seed + r * 100 + c) * 1000);
      bricks[r][c] = {
        x: c * brickWidth,
        y: r * brickHeight + brickOffsetTop,
        hits: hits,
        baseColor: baseColors[randomIndex],
        fadeFactor: 1.0,
        hiddenNumber: hiddenNumber,
        revealed: false
      };
    }
  }
}

function keyDownHandler(e) {
  if (e.key === "ArrowRight" || e.key === "d") rightPressed = true;
  if (e.key === "ArrowLeft" || e.key === "a") leftPressed = true;
}

function keyUpHandler(e) {
  if (e.key === "ArrowRight" || e.key === "d") rightPressed = false;
  if (e.key === "ArrowLeft" || e.key === "a") leftPressed = false;
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score + " | Lives: " + (infiniteLives ? "∞" : lives), 20, 30);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = "rgb(150, 0, 255)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
}

function drawBricks() {
  for (let r = 0; r < brickRowCount; r++) {
    for (let c = 0; c < brickColumnCount; c++) {
      let b = bricks[r][c];
      if (b.hits > 0 && !invisible) {
        ctx.beginPath();
        ctx.rect(b.x, b.y, brickWidth, brickHeight);
        ctx.fillStyle = `rgb(${b.baseColor[0]}, ${b.baseColor[1]}, ${b.baseColor[2]})`;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      } else if (invisible || b.revealed) {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(b.hiddenNumber, b.x + brickWidth / 3, b.y + brickHeight / 1.5);
      }
    }
  }
}

function collisionDetection() {
  let steps = Math.ceil(Math.max(Math.abs(ballDX), Math.abs(ballDY)) / ballRadius);
  let stepX = ballDX / steps;
  let stepY = ballDY / steps;

  for (let i = 0; i < steps; i++) {
    let checkX = ballX + stepX * i;
    let checkY = ballY + stepY * i;

    for (let r = 0; r < brickRowCount; r++) {
      for (let c = 0; c < brickColumnCount; c++) {
        let b = bricks[r][c];
        if (b.hits <= 0) continue;

        if (checkX > b.x && checkX < b.x + brickWidth && checkY > b.y && checkY < b.y + brickHeight) {
          ballDY = -ballDY;
          score += (6 - b.hits);
          b.hits--;
          if (b.hits === 0) {
            b.revealed = true;
          }
          if(infiniteLives)
            alert("flag{fake_flag}")
          return;
        }
      }
    }
  }
}

function enableInfiniteLives() {
  infiniteLives = true;

  // Create alert element
  let alertBox = document.createElement("div");
  alertBox.textContent = "Infinite lives activated! A hidden level appears...";
  alertBox.style.position = "fixed";
  alertBox.style.top = "10px";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translateX(-50%)";
  alertBox.style.background = "rgba(0, 0, 0, 0.8)";
  alertBox.style.color = "white";
  alertBox.style.padding = "10px 20px";
  alertBox.style.borderRadius = "5px";
  alertBox.style.zIndex = "1000";

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);

  initializeBricks();
}

function update() {
  if (!gameOver) {
    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) ballDX = -ballDX;
    if (ballY - ballRadius < 0) ballDY = -ballDY;

    if (ballY + ballRadius > canvas.height - paddleHeight - 10 && ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDY = -ballDY;
    } else if (ballY + ballRadius > canvas.height) {
      // Lose condition
      lives--;
      if (lives === -1) {
        /* alert("Game Over! Your Score: " + score); */
        // This is where to start the animation
        /* document.location.reload(); */
        triggerSecretMode();
      } else if (lives < -99 && !infiniteLives){
        enableInfiniteLives();
      }
      else {
        // Reset ball position and velocity
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        ballDX = 3 * (Math.random() < 0.5 ? 1 : -1);
        ballDY = -3;

        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }


    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += paddleSpeed;
    if (leftPressed && paddleX > 0) paddleX -= paddleSpeed;

    collisionDetection();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  update();
  requestAnimationFrame(draw);
}


function resetGame() {
  score = 0;
  lives = 3;
  gameOver = false;

  ballDX = 3;
  ballDY = -3;
  paddleSpeed = 7;
  document.getElementById("gameOverScreen").style.display = "none";
  canvas.style.transform = "translateY(0)";
  initializeBricks();
  // You can wrap the below code in a resetBall function for extra neatness
  // Reset ball position and velocity
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballDX = 3;
  ballDY = -3;
  paddleX = (canvas.width - paddleWidth) / 2;
  draw();
}

function triggerSecretMode() {
  gameOver = true;
  document.getElementById("gameOverScreen").style.display = "flex";
  canvas.style.transform = "translateY(-100vh)";

  setTimeout(() => {
    setTimeout(() => {
      resetGame();
    }, 2000);
  }, 2000);
}

async function startGame() {
  await fetchSpeeds();
  seed = parseInt(document.getElementById("seedInput").value);
  initializeBricks();
  document.getElementById("seedInputContainer").style.display = "none";
  gameStarted = true;
  draw();
}
