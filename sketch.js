
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var bananas_collected = 0
var ground
var survivalTime = 0
var PLAY = 0
var END = 1
var gameState =PLAY


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500)
  
monkey =  createSprite(70,350);
  monkey.addAnimation ("running",monkey_running);
  monkey.scale = 0.1  
  monkey.velocityY = 0.3
  monkey.velocityY = monkey.velocityY + 0.8
  
  
  
  ground = createSprite(300,470,600,123);
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {

  background("white")
  
  if(gameState === PLAY){
    if(keyDown("space")){
    monkey.velocityY = -10  ;
  }
  
  
  
  
  survivalTime = Math.round(frameCount)
       
  
  console.log(monkey.y)
  
  if(monkey.isTouching(FoodGroup)){
    bananas_collected = bananas_collected+1
    FoodGroup.destroyEach();     
  }

    
  
  food();
  spawnObs();
    
    if(monkey.isTouching(obstaclesGroup)){
      gameState = END
    }
    
  } else if (gameState === END){
    
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
  }
  monkey.velocityY = monkey.velocityY + 0.8
  drawSprites();
  textSize(25)
  text("SurvivalTime:" + survivalTime,250,20)
  textSize(20)
  text("bananas Collected:" + bananas_collected,10,20)
  
  
  
   
  
  monkey.collide(ground);
  
  monkey.debug = true
  
  
}


 function food(){
   if(frameCount %300 === 0){
    
   banana = createSprite(600,Math.round(random(50,350)));
  banana.addImage(bananaImage);
  banana.scale = 0.1
    banana.velocityX = -15
    if(banana.x<10){
      banana.destroy();
    }
    FoodGroup.add(banana)
  }
 }

function spawnObs(){
  if(frameCount %100 === 0){
    
   obstacle = createSprite(600,390);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.1 
    obstacle.velocityX = -10
    if(obstacle.x<10){
      obstacle.destroy();
    }
    obstaclesGroup.add(obstacle)
  }
  
}






