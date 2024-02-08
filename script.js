$(document).ready(()=>{
const canvas=document.querySelector('#gameCanvas');
const ctx=canvas.getContext('2d');

const scale=10;
const rows=canvas.height/scale;
const columns=canvas.width/scale;

let snake;
let fruit;
let gamePaused=false;

(function setup(){
  snake=new Snake();// we will make it work soon , keep following
  fruit=new Fruit();
  fruit.pickLocation();
  // Lets Continue{}
window.setInterval(()=>{
if(!gamePaused){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  fruit.draw();// Draw fruits
  snake.update();//first write the function for snake to continue...
  snake.draw();//Draw Snake

  if(snake.eat(fruit)){
    fruit.pickLocation();// 
  }

  snake.checkCollision();
  $('.score').text(`Score: ${snake.total}`);
}
},150);
}());
//write the listener for key press...

window.addEventListener('keydown',evt=>{
const direction=evt.key.replace('Arrow','');
snake.changeDirection(direction);
if(evt.key===' '){
  gamePaused =!gamePaused;// Spacebar for Pause and Start the Game...
}
});


function Snake(){
  this.x=0;
  this.y=0;
  this.xSpeed=scale*1;
  this.ySpeed=0;
  this.total=0;
  this.tail=[];// array to collect the number of box as fruits..

  this.draw=()=>{
    ctx.fillStyle='#2ecc71';// Snake body color
    for(let i=0;i<this.tail.length;i++){
      ctx.fillRect(this.tail[i].x,this.tail[i].y,scale,scale);
    }
    ctx.fillRect(this.x,this.y,scale,scale);
  };
  this.update=()=>{
    for(let i=0;i<this.tail.length-1;i++){
      this.tail[i]=this.tail[i+1];
    }
    this.tail[this.total-1]={x:this.x,y:this.y};

    this.x +=this.xSpeed;
    this.y +=this.ySpeed;
// filtering width and height relative to the snake body...
    if(this.x>=canvas.width){
      this.x=0;
    }
    if(this.y>=canvas.height){
      this.y=0;
    }
    if(this.x<0){
      this.x=canvas.width-scale;
    }
    if(this.y<0){
      this.y=canvas.height-scale;
    }
  };

  this.changeDirection=(direction)=>{
    // switch case used for reding and prcessing key press and then chage direction...
    switch (direction) {
      case 'Up':
        if(this.ySpeed===0){
          this.xSpeed=0;
          this.ySpeed=-scale*1;
        }
        break;
      case 'Down':
        if(this.ySpeed===0){
          this.xSpeed=0;
          this.ySpeed=scale*1;
        }
        break;
      case 'Left':
        if(this.xSpeed===0){
          this.xSpeed=-scale*1;
          this.ySpeed=0;
        }
        break;
      case 'Right':
        if(this.xSpeed===0){
          this.xSpeed=scale*1;
          this.ySpeed=0;
        }
        break;
    }
  };

  this.eat=(fruit)=>{
    // chek if snake eats the fruit then increase the total count...
    if(this.x===fruit.x && this.y===fruit.y){
      this.total++;
      return true;
    }
    return false;
  };

  this.checkCollision=()=>{
    // The collision function will make sure that the game ends if snake bites its tail....
    for(let i=0;i<this.tail.length;i++){
      if(this.x===this.tail[i].x && this.y===this.tail[i].y){
        this.total=0;
      this.tail=[];
      gamePaused=true;
      alert('Game Over! Press Spacebar to Restart');// Instead of alert we can show popup or a box overlay to show the message...
      }
    }
  };
}

function Fruit(){
  this.x;
  this.y;

  this.pickLocation=()=>{
    this.x=Math.floor(Math.random()*columns)*scale;
    this.y=Math.floor(Math.random()*rows)*scale;
  };
  this.draw=()=>{
    ctx.fillStyle='#e74c3c';
    ctx.fillRect(this.x,this.y,scale,scale);
  };
}

});

//Make sure to check spellings correctly as it can cause serious problems and ae usually hard to detect,... good Luck...