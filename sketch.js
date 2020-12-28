var dog, happyDog,dogImg;
var database;
var foodS,foodStock;

function preload(){
	dogImg = loadImage("virtual pet images/ Dog.png");
  happyDog = loadImage("virtual dog images/ happy dog.png");
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(600,340,10,10);
  dog.addImage(dogImg)
  dog.scale=0.30
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("Feed Drago !!")
  feed.position(700,95)
  feed.mousePressed(FeedDog);
 
  add = createButton("Add Food")
  add.position(850,95)
  add.mousePressed(AddFood)


} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(25);
textFont("Comic Sans MS");
text("Last Feed : 5:00 P. M",50,50);
drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(happyDog)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
