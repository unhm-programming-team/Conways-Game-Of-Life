/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var boardwidth = 60;
var boardheight = 60;
var gameOn = false;
var board= [];

ctx.font = "30px Arial";



var startBtn = document.createElement("button");
startBtn.innerHTML = "Start/Stop";


var slider = document.createElement("INPUT");
slider.setAttribute("type", "range");
slider.max = 8;
slider.min = 0;
slider.defaultValue = 3;

var sliderLabel = document.createElement("LABEL");
var sliderLabelText = document.createTextNode("Neighbors Needed: " + slider.value.toString());
sliderLabel.appendChild(sliderLabelText)




var randomizeBtn = document.createElement("button");
randomizeBtn.innerHTML = "Randomize";


document.body.appendChild(startBtn);
document.body.appendChild(randomizeBtn);
document.body.appendChild(slider);
document.body.insertBefore(sliderLabel, slider)

slider.onchange = async function() {
   
    sliderLabelText.nodeValue = "Neighbors Needed: " + slider.value.toString();
};


startBtn.addEventListener ("click", async function() {
     gameOn = !gameOn; 
});

randomizeBtn.addEventListener ("click", async function() {
  var board = [];

        var faceX = 0;
        ctx.clearRect(0, 0, c.width, c.height);
        
        for(let i = 0; i < boardwidth; i++){
            let sample = [];
                for(let j = 0; j < boardheight; j++){
                    sample.push(Math.round(Math.random()));
                }
            board.push(sample);
            
            } 
        for(var x = 0; x < boardwidth; x++){
            //console.log("pain"+x.toString())
            for(var y = 0; y < boardheight; y++){  
                        if(board[x][y] === 0){
                           ctx.beginPath();
                           ctx.fillRect(x*(c.width/boardwidth), y*(c.height/boardheight), c.width/boardwidth, c.height/boardheight); 
                            //ctx.rect(x*10, y*10, c.height/boardheight, c.width/boardwidth);
                           ctx.stroke();
                        }
                        
                        
                    }
                }
  
});
var body = document.getElementsByTagName("div")[0];
body.appendChild(startBtn);
body.appendChild(randomizeBtn)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random(gameboard){
        gameboard = [];

        ctx.clearRect(0, 0, c.width, c.height);
        
        for(let i = 0; i < boardwidth; i++){
            let sample = [];
                for(let j = 0; j < boardheight; j++){
                    sample.push(Math.round(Math.random()));
                }
            gameboard.push(sample);
            
            }
        return gameboard;
}
async function test(){
    while(true){
    while(gameOn){

        board = random(board);
        
        for(var x = 0; x < boardwidth; x++){
            
            for(var y = 0; y < boardheight; y++){  
                
                        if(board[x][y] === 0){
                           ctx.beginPath();
                           ctx.fillRect(x*(c.width/boardwidth), y*(c.height/boardheight), c.width/boardwidth, c.height/boardheight); 
                            //ctx.rect(x*10, y*10, c.height/boardheight, c.width/boardwidth);
                           ctx.stroke();
                           
                        }
                     
                        
                    }
                }

               await sleep(1000);
         
        }
        await sleep(1);
    }   
 
    }
    
test();  


function NeighborCount(x,y ,board){
        var counter = 0;
       
        for(let row=-1;row<2;row++){
            for(let col = -1;col<2;col++){
                if ((x+row>=0)&& (y + col>=0 )&& (x+row<boardwidth)&& (y + col<boardheight ) && !(row==0&&col==0)){
                     counter += board[x+row][y+col];
                    }               
            }
        }    
        
        return counter;
    } 

function clickCanvas(ev) {
    /**
     * Flips the cell in the 2d board array to the opposite value. 1 becomes 0 and 0 becomes 1.
     * Calculates cell click location from mouse coordinates and canvas bounds.
     * Draws a clear rectangle on the canvas if the new value is 1.
     * Draws a black rectangle on the canvas if the new value is 0.
     * @param {ev} MouseEvent A mouse click event on the Canvas object.
     */
    canvas = ev.target
    canvas_bounds = canvas.getBoundingClientRect()
    square_width = canvas.width / boardwidth
    square_height = canvas.height / boardheight
    canvas_x = ev.clientX - canvas_bounds.x
    canvas_y = ev.clientY - canvas_bounds.y
    square_x = Math.floor(canvas_x / square_width)
    square_y = Math.floor(canvas_y / square_height)
    if(square_x < board.length) { // a rename of the global var board will require this to be refactored
        column = board[square_x]
        if(square_y < column.length) {
            cell = column[square_y]
            opposite_cell = (cell == 1) ? 0 : 1
            board[square_x][square_y] = opposite_cell
            if (opposite_cell == 1) {
                ctx.clearRect(square_x*square_width, square_y*square_height, square_width, square_height)
            }
            else {
                ctx.fillRect(square_x*square_width, square_y*square_height, square_width, square_height); 
            }
            
        }
    }
}
    
c.addEventListener('click', clickCanvas)

