let direction = { x: 0, y: 0 };


let foodsound = new Audio('./music/food.mp3');
let gameoversound = new Audio('./music/gameover.mp3');
let movesound = new Audio('./music/move.mp3');
let musicsound = new Audio('./music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let score=0;
let snakearr = [
    {
        x: 13, y: 15
    }
]
food = { x: 6, y: 7 };



//Game fuctions

function main(ctime) {
    window.requestAnimationFrame(main);//game loop
   // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return;
    }
    lastPaintTime = ctime;
    gameengine();
}


function iscollide(snakearr)
{
    //bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snakearr[i].x===snakearr[0].x  && snakearr[i].y===snakearr[0].y)
        {
            return true;
        }
      }
      //for coolsion wuth wall
        if(snakearr[0].x>=18 || snakearr[0].y>=18 || snakearr[0].y<=0 || snakearr[0].x<=0)
        {
            return true;
        }
        return false;
        
    
}

function gameengine(){
    //part 1
    //updating snake array

    if(iscollide(snakearr))
    {
        gameoversound.play();
        musicsound.pause();
        direction={x:0,y:0};
        alert("Game over.PRess any key to play again");
        snakearr=[{x:13,y:15}];
        score=0;
        scoreb.innerHTML="Score : "+score;
        musicsound.play();
        

    }
    //If you have eaen the food ,increment the score and regenerate the food
    if(snakearr[0].y===food.y  && snakearr[0].x===food.x)
    {
         snakearr.unshift({x:snakearr[0].x+direction.x ,y:snakearr[0].y+direction.y} );
         foodsound.play();
         score+=1;
         if(score>hiscoreval)
         {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreb.innerHTML="Hi score : "+hiscoreval;
         }
         scoreb.innerHTML="Score :"+score;
         let a=2;
         let b=16;
         food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }


    //moving the snake
    for(let i=snakearr.length-2;i>=0;i--)
    {
        
        snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x+=direction.x;
    snakearr[0].y+=direction.y;



    //part2
    //Render the snake 
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}














//main logic

let hiscore=localStorage.getItem("hiscore");
if(hiscore==null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreb.innerHTML="Hi score : "+hiscoreval;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    
    direction = { x: 0, y: 1 }//Start the game
    let head=document.querySelector('.head');
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            direction.x=0;
            direction.y=-1;

            break;
        case "ArrowDown":
            console.log("arrowdown");
            direction.x=0;
            direction.y=1;
            head[0].style.transform="rotate(180deg)";
            break;
        case "ArrowRight":
            console.log("arrowright");
            direction.x=1;
            direction.y=0;
            break;
        case "ArrowLeft":
            console.log("arrowleft");
            direction.x=-1;
            direction.y=0;
            break;
            default:
                break;

    }

})


