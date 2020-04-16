let menu = document.getElementById('menuCanvas');
let canv = document.getElementById('gameCanvas');
let contxt = canv.getContext("2d");
let box = 16;

canv.style.display = 'none';
menu.style.display = 'block';

// Preparing the menu content
let MC = menu.getContext('2d'); // MC is Menu Context

//Making the background color
MC.fillStyle = 'lightblue';
MC.fillRect(0, 0, 608, 550);

//Making the menu button

MC.fillStyle = 'white';
MC.fillRect(220, 340, 140, 50);

MC.font = "20px helvetica";
MC.strokeText('New Game', 240, 370);

// Making the New Game button Functional


document.addEventListener('mousemove', (e) => {
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if (mouseX < 340 && mouseX > 220 && mouseY < 390 && mouseY > 340) {
        menu.style.cursor = 'pointer'

        MC.fillStyle = 'white';
        MC.fillRect(220, 340, 140, 50);
        MC.strokeStyle = 'green'
        MC.strokeRect(220, 340, 140, 50)
        MC.font = "20px helvetica";
        MC.strokeText('New Game', 240, 370);
    } else {
        MC.fillStyle = 'white';
        MC.fillRect(220, 340, 140, 50);
        menu.style.cursor = 'auto'
        MC.strokeStyle = 'black'
        MC.strokeRect(220, 340, 140, 50)

        MC.font = "20px helvetica";
        MC.strokeText('New Game', 240, 370);
    }
})


// adding an event on the new game button
menu.addEventListener('click', e => {

    var mouseX = e.offsetX; // x coordinates of the cursor
    var mouseY = e.offsetY; // y coordinates of the cursor
    console.log(mouseX)
    console.log(mouseY)
    console.log(e)

    // a condition to verify that the cursor is on the button
    if (mouseX < 340 && mouseX > 220 && mouseY < 390 && mouseY > 340) {
        menu.style.display = 'none'
        canv.style.display = 'block'
    }

})

/*************************************/


//Direction check
let dir;
document.addEventListener('keydown', (event) => {
    let d = event.keyCode

    if (d == 37 && dir != 'RIGHT') {
        dir = 'LEFT'
    } else if (d == 38 && dir != 'DOWN') {
        dir = 'UP'
    } else if (d == 39 && dir != 'LEFT') {
        dir = 'RIGHT'
    } else if (d == 40 && dir != 'UP') {
        dir = 'DOWN'
    }
})


//Creating the snake object
let snake = [];
snake[0] = {
    x: box,
    y: 0
}
snake[1] = {
    x: 0,
    y: 0
}
let food = []
food[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}
let score = 0;


function draw() {
    /**********Snake body and food drowing*************/
    //Drawing background 
    contxt.fillStyle = 'teal'
    contxt.fillRect(0, 0, 608, 550);


    //Drawing the snake
    for (let i = 0; i < snake.length; i++) {
        contxt.fillStyle = (i == 0) ? 'red' : 'purple';
        contxt.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //Drawing food


    contxt.fillStyle = 'brown';
    contxt.fillRect(food[0].x, food[0].y, box, box);

    //Getting the head and tay coords
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let snakeTailX = snake[snake.length - 1].x;
    let snakeTailY = snake[snake.length - 1].y;

    /***************Snake direction and borders conditions***************/
    //position of new head
    switch (dir) {
        case 'LEFT':
            snakeX -= box
            break;
        case 'UP':
            snakeY -= box
            break;
        case 'RIGHT':
            snakeX += box
            break;
        case 'DOWN':
            snakeY += box
            break;

    }
    if (snakeX < 0) {
        snakeX = 608
    }
    if (snakeX > 608) {
        snakeX = 0
    }
    if (snakeY < 0) {
        snakeY = 544
    }
    if (snakeY > 544) {
        snakeY = 0
    }
    /***********Snake Movement************/
    //Removing the old head block
    snake.pop()

    // adding a new head block
    let newhead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newhead)



    /**************Snake Growth****************/
    if (snakeX == food[0].x && snakeY == food[0].y) {
        let block = { x: snakeTailX, y: snakeTailY };
        snake.push(block)
        let foody = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 17 + 1) * box
        }
        food.push(foody);
        food.shift()
        score++;

    }
    contxt.fillStyle = 'black';
    contxt.fillText(`Score: ${score}`, 500, 500)


    /***************GameOver Condition ****************/


    for (let i = 2; i < snake.length; i++) {
        if (newhead.x == snake[i].x && newhead.y == snake[i].y) {


            //Drawing Gameover screen
            contxt.fillStyle = '#bb0020'
            contxt.fillRect(0, 0, 608, 550);

            contxt.font = '40px Helvetica'
            contxt.fillStyle = 'black';
            contxt.fillText('Game Over', 180, 250)
            contxt.font = '20px Helvetica'
            contxt.fillText('Refresh the page to play again', 150, 300)

            let previous = localStorage.getItem('Highscore')
            if (score > previous) {
                localStorage.setItem('Highscore', score)
            }
            clearInterval(game)
        }
    }

}

function highscore() {
    let High
    if (localStorage.length == 0) {
        High = 0;
    } else {
        High = localStorage.getItem('Highscore')
    }

    let max = 0;
    if (High > max) {
        max = High
    }

    contxt.fillText(`Highest-Score: ${max}`, 400, 500)
}
var game = setInterval(draw, 60)
var hs = setInterval(highscore, 60)
