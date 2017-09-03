
var frostingColors = [];
var teal;
var pink;
var brown;
var j = 0;
var mins = 0;
var num = 0;
var prevSec;
var prevMin;
var numSec = 0;


function setup() { 
  createCanvas(800, 800);
  background(255);
  //create layer that sits above frosting for sprinkles
  sprinkleCanvas = createGraphics(800, 800);
  noStroke();
  teal = color(188, 255, 241);
  pink = color(241,170,192);
  brown = color(71, 51, 42);
  prevSec = second();
  prevMin = minute();
  frostingColors = [teal, pink, brown];
} 

function draw() { 
  //if statement to set the color of the frosting based on minutes
  
  //if prevMin is set to the current minute
  //...once the minute # does not match the minute() function
  //...then perform the nested if statement
  //...which increments num variable up until 3 (number of colors in array)
  //...or resets back to 0
  if (prevMin !== minute()) {
   if (num < 3) {
  	num++
   }else{
     num = 0 
   }
  prevMin = minute();
  }
  
  themins();
  
  sprinkleCanvas.noStroke();
  //pushes a sprinkle based on frame count being divisble by 60 (aka every second)
  if (frameCount % 60 == 0) {
    //fill with random colors
    sprinkleCanvas.fill(random(10,240), random(10,240), random(10,240));
  	sprinkleCanvas.push();
    //position where sprinkles are placed
  	sprinkleCanvas.translate(345,310);
    //rotate each sprinkle
  	sprinkleCanvas.rotate(PI/random(3.0));
    //randomly place on coordinates within the bounds of the donut
  	var xPos = random(0,200);
  	var yPos = random(0,100);
  	sprinkleCanvas.rect(xPos, yPos, 12, 5, 20);
  	sprinkleCanvas.pop();
		}
  //place and draw this new layer
  image(sprinkleCanvas, 55, 80, 800, 800);
  
	thebaseOuter();
}

function themins(){
  //set speed of frosting redraw
  mins = (mins + 200*(800));
  
  //set radius of circle movement
  x = sin(mins) * 100; 
  y = cos(mins) * 100;
  
  //positin where frosting is drawn
  coord = rotateXY(x,y,2.3);
  x = coord.x+400;
  y = coord.y+400;
  
  fill(frostingColors[num]);
  ellipse(x, y, 300, 300);
}

function thebaseOuter(){
  //set speed
  j = (j + PI*0.008);
  
  //set radius of circle movement
  var x = sin(j) * 265; 
  var y = cos(j) * 265;
  
  //position where outer edge of donut is drawn
  coord = rotateXY(x,y,2.3);
  x = coord.x+400;
  y = coord.y+400;
  
  //change fill based on the hour
  //if it is an even hour, it will be one color
  //odd will be the next
  if (hour() % 2 === true) {
  	fill(206, 148, 90);
  } else{
    fill(112, 79, 58);
  }
  ellipse(x, y, 30,30);
}

//set sine and cosine of angles to use for circle drawing radius and position
function rotateXY(x,y, theta){
  return {
    x: x*cos(theta) - y*sin(theta),
    y: x*sin(theta) + y*cos(theta)
  };
}