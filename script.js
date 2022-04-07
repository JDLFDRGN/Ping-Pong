let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');
let canvas_width = 350, canvas_height = 500;
let radius = 10, ball_x = canvas_width/2, ball_y = canvas_height/2;
let dx = Math.random()>0.5?1:-1, dy = Math.random()>0.5?1:-1;
let previous_ball_x = 0, previous_ball_y = 0;
let paddle_movement = 10, paddle_height = 10, paddle_width = 50, paddle_distance = 20;
let player_one_x = canvas_width/2 - paddle_width/2;
let player_two_x = canvas_width/2 - paddle_width/2;
let spacer = 3;
let space_pressed = false, click_pressed = false;
let start_interval; 
let player_one_left_hand = document.querySelector('#player-one-left-hand');

canvas.width = canvas_width;
canvas.height = canvas_height;

function prepare(){
    context.clearRect(0, 0, canvas_width, canvas_height)

    //Ball
    context.beginPath();
    context.arc(ball_x, ball_y, radius, 0, 2 * Math.PI);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.stroke();

    //Player 1 Design
    context.beginPath();
    context.rect(player_one_x, paddle_distance, paddle_width, paddle_height);
    context.fillStyle = "#FF0000";
    context.fill();

    //Player 2 Design
    context.beginPath();
    context.rect(player_two_x, canvas_height - paddle_height - paddle_distance, paddle_width, paddle_height);
    context.fillStyle = "#000000";
    context.fill();
    context.stroke();
    
}

function enableControls(e){
    if((e.key == 'a' || e.key == 'A') && player_one_x > 0) playerOneTurnLeft();
    if((e.key == 'd' || e.key == 'D') && player_one_x < canvas_width - paddle_width) playerOneTurnRight();
    if(e.key == 'ArrowLeft' && player_two_x > 0) playerTwoTurnLeft();
    if(e.key == 'ArrowRight'&& player_two_x < canvas_width - paddle_width) playerTwoTurnRight();
}

function playerOneTurnLeft(){
    if(!space_pressed && !click_pressed)return;
    player_one_x -= paddle_movement;
    updatePaddle();
}
function playerOneTurnRight(){
    if(!space_pressed && !click_pressed)return;
    player_one_x += paddle_movement;
    updatePaddle();
}
function playerTwoTurnLeft(){
    if(!space_pressed && !click_pressed)return;
    player_two_x -= paddle_movement;
    updatePaddle();
}
function playerTwoTurnRight(){
    if(!space_pressed && !click_pressed)return;
    player_two_x += paddle_movement;  
    updatePaddle();
}
function start(){
    //Bounce horizontal
    if(ball_x + radius > canvas_width || ball_x - radius < 0) dx = -dx; 
    
    //Player One
    if(ball_y - radius - spacer <= paddle_distance + paddle_height){
        if(ball_x - radius <= player_one_x + paddle_width){
            if(ball_x + radius > player_one_x){
                dy = -dy;
            }
        }
        if(ball_x - radius == player_one_x + paddle_width + 2){
            dx = -dx;
        }
        if(ball_x + radius == player_one_x - 2){
            dx = -dx;
        }
    }
    //PLayer Two
    if(ball_y + radius + spacer > canvas_height - (paddle_distance + paddle_height)){
        if(ball_x - radius <= player_two_x + paddle_width ){
            if(ball_x + radius > player_two_x){
                dy = -dy;
            }
        }
        if(ball_x - radius == player_two_x + paddle_width + 2){
            dx = -dx;
        }
        if(ball_x + radius == player_two_x - 2){
            dx = -dx;
        }
    }
    //Overlap
    if(ball_y - radius > canvas_height || ball_y - radius < 0) reset();
    updateBall();
}

function updatePaddle(){
    context.clearRect(0,0,canvas_width, canvas_height);

    context.beginPath();
    context.rect(player_one_x, paddle_distance, paddle_width, paddle_height);
    context.fillStyle = "#FF0000";
    
    context.stroke();
    context.fill();

    context.beginPath();
    context.rect(player_two_x, canvas_height - paddle_height - paddle_distance, paddle_width, paddle_height);
    context.fillStyle = "#000000";
    context.fill();
    context.stroke();
}

function updateBall(){
    context.clearRect(previous_ball_x - radius - 1, previous_ball_y - radius - 1, radius * 2 + 2, radius * 2 + 2);
    context.beginPath();
    context.arc(ball_x, ball_y, radius, 0, 2 * Math.PI);
    context.fillStyle = "#FFFFFF";
    context.fill();
    context.stroke();

    previous_ball_x = ball_x;
    previous_ball_y = ball_y;

    ball_x += dx;
    ball_y += dy;   
}

function reset(){
    clearInterval(start_interval);
    radius = 10, ball_x = canvas_width/2, ball_y = canvas_height/2;
    dx = Math.random()>0.5?1:-1, dy = Math.random()>0.5?1:-1;
    previous_ball_x = 0, previous_ball_y = 0;
    player_one_x = canvas_width/2 - paddle_width/2;
    player_two_x = canvas_width/2 - paddle_width/2;
    space_pressed = false;
    click_pressed = false;
    prepare();
}

prepare();

addEventListener('keydown',e=>{
    if(e.key == ' '){
        if(space_pressed == false) start_interval = setInterval(start, 10);
        space_pressed = true;
    }
    if(space_pressed || click_pressed) enableControls(e);      
});

canvas.addEventListener('click',()=>{
    if(click_pressed == false) start_interval = setInterval(start, 10);
    click_pressed = true;
})