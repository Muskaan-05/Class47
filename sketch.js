var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obs1, obs2, obs3, obs4, obs5, obs6;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver, restart;
var gameOverImg;
var restartImg;


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obstacle1 = loadImage("assets/obsBottom1.png");
obstacle2 = loadImage("assets/obsBottom2.png");
obstacle3 = loadImage("assets/obsBottom3.png");
obstacle4 = loadImage("assets/obsTop1.png");
obstacle5 = loadImage("assets/obsTop2.png");
obstacle6 = loadImage("bird-removebg-preview.png");
gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png")
}

function setup(){
createCanvas(displayWidth, displayHeight);

//background image
bg = createSprite(width/2, height/2 ,1,1);
bg.addImage(bgImg);
bg.scale = 1.5;


//creating top and bottom grounds
bottomGround = createSprite(width/2,height,800,20);
bottomGround.visible = false;

topGround = createSprite(width/2,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.6;

gameOver = createSprite(width/2, height/2);
gameOver.addImage(gameOverImg);

restart = createSprite(width/2, height/2+40);
restart.addImage(restartImg);

gameOver.visible = false;
restart.visible = false;

obstaclesGroup = new Group ();

score = 0;

// obs1 = createSprite(400,595,700,30);
// obs1.addImage(obstacle1);
// obs1.scale = 0.3;

// obs2 = createSprite(700,525,700,30);
// obs2.addImage(obstacle2);
// obs2.scale = 0.38;

// obs3 = createSprite(1300,495,700,30);
// obs3.addImage(obstacle3);
// obs3.scale = 0.38;

// obs4 = createSprite(950,220,700,30);
// obs4.addImage(obstacle4);
// obs4.scale = 0.5;

// obs5 = createSprite(200,90,700,30);
// obs5.addImage(obstacle5);
// obs5.scale = 0.3;

// obs6 = createSprite(500,120,700,30);
// obs6.addImage(obstacle6);
// obs6.scale = 1.2;

}

function draw() {
  
  background("black");
        
  text ("Score: " + score , 500, 50);
          //making the hot air balloon jump



        drawSprites();

        if(gameState === PLAY){
          score = score + Math.round(getFrameRate()/60);

          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

                    //adding gravity
                    balloon.velocityY = balloon.velocityY + 0.2;
                    spawnObstacles();
                    spawnBuildings();
        }
        
      
        if(obstaclesGroup.isTouching(balloon)){
          gameState = END;
        }
      
        else if(gameState === END){
          gameOver.visible = true;
          restart.visible = true;
          balloon.velocityY = 0;
          obstaclesGroup.setVelocityXEach(0);
          obstaclesGroup.destroyEach();
        }
        
        if(mousePressedOver(restart)){
          reset();
        }
        
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(width + 20,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle4);
      obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(obstacle5);
      obstacle.scale = 0.2;
              break;
      case 3: obstacle.addImage(obstacle6);
      obstacle.scale = 1;
              break;
      default: break;

    }
    obstacle.y=Math.round(random(50,100 ))
    balloon.depth = obstacle.depth;
    balloon.depth=balloon.depth +1;

    gameOver.depth = obstacle.depth;
    gameOver.depth= gameOver.depth +1;

    restart.depth = obstacle.depth;
    restart.depth= restart.depth +1;


    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = width/4;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBuildings() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width,600,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = width/4;
    //add each obstacle to the group
    balloon.depth = obstacle.depth;
    balloon.depth=balloon.depth +1;
  
    obstaclesGroup.add(obstacle);


  
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  score = 0;

}