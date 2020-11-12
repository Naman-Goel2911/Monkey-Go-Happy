var monkey, monkeyAnimation;
var ground;
var bananasGroup, ObstaclesGroup;
var bananaImage, ObstacleImage;
var jungle, backgroundImage, backgroundImage2;
var survivalTime;
var play, end;
var gameState;

function preload()
{
  monkeyAnimation = loadAnimation("Monkey_01.png","Monkey_02.png",         "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png", "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
backgroundImage = loadImage("jungle.jpg");
  
bananaImage = loadImage("banana.png");
  
ObstacleImage = loadImage("stone.png");
  
backgroundImage2 = loadImage("nothing.jpg");
}

function setup() 
{
  createCanvas(500, 400);
  
  monkey = createSprite(100, 330, 40, 70);
  monkey.addAnimation("running", monkeyAnimation);
  monkey.scale = 0.15;
  
  jungle = createSprite(350, 150, 700, 300);
  jungle.addImage("background", backgroundImage)
  jungle.depth = monkey.depth - 1;
  jungle.velocityX = -7;
  jungle.x = jungle.width/2
  
  ground = createSprite(250, 390, 500, 30);
  ground.visible = false;
  
  bananasGroup = createGroup();
  ObstaclesGroup = createGroup();
  
  survivalTime = 1;
  
  gameState = play;
} 

function draw() 
{
  background(220);
  
  monkey.velocityY = monkey.velocityY  +  0.8;

  monkey.collide(ground); 
  monkey.collide(ObstaclesGroup);
  
  if(bananasGroup.isTouching(monkey))
  {
    bananasGroup.destroyEach();  
  }
  
  if(gameState === play)
  {
     if(jungle.x < 0)
    {
       jungle.x = jungle.width/2
    }
    
    survivalTime = 1 + Math.round(World.frameCount/60);
    switch(survivalTime)
    {
      case 10: monkey.scale = monkey.scale + 0.0001
      break;
      case 20: monkey.scale = monkey.scale + 0.0002
      break;
      case 40: monkey.scale = monkey.scale + 0.00002
      break;
      case 100: monkey.scale = monkey.scale +  0.000002
      break;
      default: break;
    }
    
    if(keyDown("space") && monkey.y >= 330)
    {
     monkey.velocityY = -15;
     monkey.scale = monkey.scale - 0.001;
    }
    
    food();
    obstacles();
    
    if(ObstaclesGroup.isTouching(monkey))
    {
     gameState = end; 
     monkey.scale = 0.1;
    }
  }
  else if(gameState === end)
  {
     ObstaclesGroup.destroyEach();
     ObstaclesGroup.setVelocityXEach(0);
    
     jungle.setImage(backgroundImage2);
  }
  
  
  
  
  drawSprites();
  
  textSize(20);
  fill("white");
  stroke("white");
  text("Survival Time: "  + survivalTime, 170, 50); 
}

function food ()
{
  if (World.frameCount % 80 === 0)
  {
    var randomNumber = random(150, 250);
    var banana = createSprite(500, randomNumber, 30, 30);
    //banana.depth = jungle.depth + 1;
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6  ;
    banana.lifetime = 85;
    bananasGroup.add(banana);
    }
}

function obstacles ()
{
  if (World.frameCount % 100 === 0)
  {
    var obstacle = createSprite(500, 330, 40, 50);
    obstacle.addImage("stone", ObstacleImage);
    obstacle.depth = jungle.depth + 1;
    obstacle.velocityX = -7;
    obstacle.liftime = 80;
    obstacle.scale = 0.15;
    ObstaclesGroup.add(obstacle);
  }
}
