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
var board = [];

ctx.font = "30px Arial";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function test(){
    
    while(true){

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

               await sleep(1000);
         
        }
    }   

test();





