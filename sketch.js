//Create variables here
var dog,dogSprite,happyDog,database,foodS,foodStock,readStock,FeedTime;
function preload()
{
	//load images here
  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dogSprite = createSprite(250,250,50,50);
  dogSprite.addImage(dog);
   dogSprite.scale = .5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
if(keyWentDown(UP_ARROW)){
writeStock(foodS);
dogSprite.addImage(happyDog);
}
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Fed : "+ lastFed%12 + " PM",350,30);
}else if(lastFed==0){
text("Last Fed : 12 AM",350,30);
}else{
  text("Last Fed : " + lastFed + "AM", 350, 30);
}
  drawSprites();
  text("Press the up arrow to feed the dog",250,50);
  textSize(20);
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=10){
x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}