/**
 * Conways Game of Life Clone
 * 
 * Created by Davis Moore + UNHM Programming Club
 */

// ========================== Initial Setup =================================
/**
 * 
 *  Everything in the Initial Setup section is a global variable that all funcs 
 *  can reference freely rather than passing each in.
 * 
 */

// Constants; Options which are not adjustable in the UI

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const BOARD_WIDTH = 50;
const BOARD_HEIGHT = 50;
const BOARD_BACKGROUND = "pink";
const SQUARE_COLOR = "indigo";
const CANVAS_BORDER = "1px solid gray"

// Calculated constants

const SQUARE_WIDTH = CANVAS_WIDTH / BOARD_WIDTH;
const SQUARE_HEIGHT = CANVAS_HEIGHT / BOARD_HEIGHT;

// Adjustable Options

var time_interval = 500; // milliseconds
var survives_lower = 2;
var survives_higher = 3;
var becomes_alive = 3;
var running = false;

// The 2D game array. Referenced with gameBoard[x][y]
var gameBoard = []
for(let i = 0; i < BOARD_WIDTH; i++) {
    let column = []
    for(let j = 0; j < BOARD_HEIGHT; j++) {
        column.push(0)
    }
    gameBoard.push(column)
}

// HTML elements
var game_div = document.getElementById("Conways");
var canvas = document.createElement("Canvas");
var ctx = canvas.getContext("2d");

var buttons_ui_div = document.createElement("div");
var run_button = document.createElement('Button');
var random_button = document.createElement('Button');

var time_slider_ui_div = document.createElement("div");
var time_slider = document.createElement("INPUT");
var time_slider_label = document.createElement('Label');

var survives_lower_ui_div = document.createElement("div");
var survives_lower_slider = document.createElement("INPUT");
var survives_lower_label = document.createElement('Label');

var survives_higher_ui_div = document.createElement("div");
var survives_higher_slider = document.createElement("INPUT");
var survives_higher_label = document.createElement('Label');

var becomes_alive_div = document.createElement("div");
var becomes_alive_slider = document.createElement("INPUT");
var becomes_alive_label = document.createElement('Label');

// set the styles and append them
canvas.style.width = CANVAS_WIDTH;
canvas.width = CANVAS_WIDTH;
canvas.style.height = CANVAS_HEIGHT;
canvas.height = CANVAS_HEIGHT;
canvas.style.border = CANVAS_BORDER;
canvas.id = "CONWAYS-canvas"
game_div.appendChild(canvas);

game_div.appendChild(buttons_ui_div);
buttons_ui_div.id = "CONWAYS-buttons-ui"
run_button.innerHTML = 'Play';
run_button.className = "CONWAYS-button"
buttons_ui_div.appendChild(run_button);
random_button.innerHTML = 'Randomize';
random_button.className = "CONWAYS-button"
buttons_ui_div.appendChild(random_button);

game_div.appendChild(time_slider_ui_div)
time_slider_ui_div.id = "CONWAYS-time-select-ui"
time_slider.setAttribute("type", "range");
time_slider.max = 1000;
time_slider.min = 10;
time_slider.defaultValue = 300;
time_slider.className = "CONWAYS-slider"
time_slider_ui_div.appendChild(time_slider);
time_slider_label.innerHTML = "Updates every " + time_slider.defaultValue + " ms";
time_slider_label.className = "CONWAYS-slider-label";
time_slider_ui_div.appendChild(time_slider_label);

game_div.appendChild(survives_lower_ui_div)
survives_lower_ui_div.id = "CONWAYS-survives-lower-ui"
survives_lower_slider.setAttribute("type", "range");
survives_lower_slider.max = 8;
survives_lower_slider.min = 1;
survives_lower_slider.defaultValue = survives_lower;
survives_lower_slider.className = "CONWAYS-slider"
survives_lower_ui_div.appendChild(survives_lower_slider);
survives_lower_label.innerHTML = "Must have at least " + survives_lower_slider.defaultValue + " neighbors to survive.";
survives_lower_label.className = "CONWAYS-slider-label";
survives_lower_ui_div.appendChild(survives_lower_label);

game_div.appendChild(survives_higher_ui_div)
survives_higher_ui_div.id = "CONWAYS-survives-higher-ui"
survives_higher_slider.setAttribute("type", "range");
survives_higher_slider.max = 8;
survives_higher_slider.min = 1;
survives_higher_slider.defaultValue = survives_higher;
survives_higher_slider.className = "CONWAYS-slider"
survives_higher_ui_div.appendChild(survives_higher_slider);
survives_higher_label.innerHTML = "Must have at most " + survives_higher_slider.defaultValue + " neighbors to survive.";
survives_higher_label.className = "CONWAYS-slider-label";
survives_higher_ui_div.appendChild(survives_higher_label);

game_div.appendChild(becomes_alive_div)
becomes_alive_div.id = "CONWAYS-becomes-alive-ui"
becomes_alive_slider.setAttribute("type", "range");
becomes_alive_slider.max = 8;
becomes_alive_slider.min = 1;
becomes_alive_slider.defaultValue = becomes_alive;
becomes_alive_slider.className = "CONWAYS-slider"
becomes_alive_div.appendChild(becomes_alive_slider);
becomes_alive_label.innerHTML = "Must have exactly " + becomes_alive_slider.defaultValue + " neighbors to be born.";
becomes_alive_label.className = "CONWAYS-slider-label";
becomes_alive_div.appendChild(becomes_alive_label);

// ========================== Functions ================================

function getNewEmptyBoard() {
    let new_board = []
    for(let i = 0; i < BOARD_WIDTH; i++) {
        let column = []
        for(let j = 0; j < BOARD_HEIGHT; j++) {
            column.push(0)
        }
        new_board.push(column)
    }
    return new_board;
}

function randomizeBoard() {
    for(let x = 0; x < gameBoard.length; x++) {
        let column = gameBoard[x];
        for(let y = 0; y < column.length; y++) {
            column[y] = Math.round(Math.random())
        }
    }
}

function renderBoard() {
    for(let x = 0; x < gameBoard.length; x++) {
        let column = gameBoard[x];
        for(let y = 0; y < column.length; y++) {
            drawSquare(x,y);
        }
    }
}

function drawSquare(x,y) {
    let val = gameBoard[x][y];
    let start_x = x * SQUARE_WIDTH;
    let start_y = y * SQUARE_HEIGHT;
    if(val == 0) {
        ctx.fillStyle = BOARD_BACKGROUND;
    }
    else {
        ctx.fillStyle = SQUARE_COLOR;
    }
    ctx.fillRect(start_x, start_y, SQUARE_WIDTH, SQUARE_HEIGHT);
}

function countNeighbors(x,y) {
    var counter = 0;
       
    for(let row=-1;row <= 1;row++){
        for(let col = -1;col <= 1;col++){
            if(!(row==0&&col==0)){              
              if (x+row>=0  && y + col>=0 && x+row < BOARD_WIDTH && y + col < BOARD_HEIGHT ){
                 counter += gameBoard[x+row][y+col];
                }  
            }                           
        }
    }        
    return counter;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function stepBoard() {
    let new_board = getNewEmptyBoard();
    for(let x = 0; x < BOARD_WIDTH; x++) {
        for(let y = 0; y < BOARD_HEIGHT; y++) {
            square_was_alive = (gameBoard[x][y] == 1);
            neighbors = countNeighbors(x,y);
            if(square_was_alive) {
                if(neighbors >= survives_lower && neighbors <= survives_higher) {
                    new_board[x][y] = 1;
                }
                else {
                    new_board[x][y] = 0;
                }
            }
            else {
                if(neighbors == becomes_alive) {
                    new_board[x][y] = 1;
                }
            }
        }
    }
    gameBoard = new_board;
}

// ====================== Event Callback Functions ===================

function clickBoard(ev) {
    if(ev.buttons == 1 || ev.type == "mousedown") {
        canvas_bounds = canvas.getBoundingClientRect();
        canvas_x = ev.clientX - canvas_bounds.x;
        canvas_y = ev.clientY - canvas_bounds.y;
        square_x = Math.floor(canvas_x / SQUARE_WIDTH);
        square_y = Math.floor(canvas_y / SQUARE_HEIGHT);
        if(square_x < BOARD_WIDTH) { 
            column = gameBoard[square_x];
            if(square_y < BOARD_HEIGHT) {
                cell = column[square_y];
                // newvalue = (cell == 1) ? 0 : 1;
                column[square_y] = 1;
                drawSquare(square_x, square_y);
            }
        }
    }
}

function clickPlayPause(ev) {
    running = !running;
    if(running) {
        run_button.innerHTML = 'Pause';
        run();
    }
    else {
        run_button.innerHTML = 'Play';
    }
}

function clickRandomize(ev) {
    randomizeBoard();
    renderBoard();
}

function timeSlide(ev) {
    time_interval = time_slider.valueAsNumber;
    time_slider_label.innerHTML = "Updates every " + time_interval + " ms";
}

function minNeighborSlide(ev) {
    survives_lower = survives_lower_slider.valueAsNumber;
    survives_lower_label.innerHTML = "Must have at least " + survives_lower + " neighbors to survive.";
}

function maxNeighborSlide(ev) {
    survives_higher = survives_higher_slider.valueAsNumber;
    survives_higher_label.innerHTML = "Must have at most " + survives_higher + " neighbors to survive.";
}

function bornNeighborSlide(ev) {
    becomes_alive = becomes_alive_slider.valueAsNumber;
    becomes_alive_label.innerHTML = "Must have exactly " + becomes_alive + " neighbors to be born."
}


// =================== Main Program Loop =============================

async function run() {
    while(running) {
        stepBoard();
        renderBoard();
        await sleep(time_interval);
    }
}

// ===================== Event Listener(s) ============================

canvas.addEventListener('mousemove', clickBoard);
canvas.addEventListener('mousedown', clickBoard);
run_button.addEventListener('click', clickPlayPause);
random_button.addEventListener('click', clickRandomize);
time_slider.addEventListener('input', timeSlide);
survives_lower_slider.addEventListener('input', minNeighborSlide)
survives_higher_slider.addEventListener('input', maxNeighborSlide)
becomes_alive_slider.addEventListener('input', bornNeighborSlide)

// ===================== Running ======================================

randomizeBoard();
renderBoard();

