var canvas, ctx;

var w, h;
var gx, gy, dg, xC, yC, gxL, gyL, inc_x, inc_y, tick;
var a, b, sf, as, bs, da;
var Nt, dt;

function init()
{
     // This function is called after the page is loaded
     // 1 - Get the canvas
     canvas = document.getElementById('myCanvas');
     // 2 - Get the context
     ctx = canvas.getContext('2d');
	 // 3 - we can draw
     ctx.clearRect(0,0,canvas.width,canvas.height); 
	 
	constants(); 
	drawGrid();
	drawLabels();
	calculation();
    display(); 
	
	
	
}	 

function  inc_a()
{
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
	if (a > 8) {da = -2;}
	if (a < 4) {da = 2;}
	a = a + da;
	drawGrid();
	drawLabels();
	calculation();
    display(); 
}	

function  inc_b()
{
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
	if (b > 8) {da = -2;}
	if (b < 4) {da = 2;}
	b = b + da;
	drawGrid();
	drawLabels();
	calculation();
    display(); 
}	

 
function constants()
{
    w = canvas.width ;
	h = canvas.height ;
	gx = 400;
	gy = 30;
	dg = 36;
	xC = gx+dg*5;
	yC = gy+dg*5;
	sf = (dg*5)/10;
	
	tick = 5;
	q1 = [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10];    // X axis numbers
    q2 = [10, 8, 6, 4, 2, 0, -2, -4, -6, -8, -10];    // Y axis numbers
	inc_x = 36;
	inc_y = 36;
    a = 6;
	b = 6;
	da = 2;
	Nt = 101;
	dt = 2*Math.PI / (Nt);
}

function drawGrid()
 {
    ctx.save();
    ctx.beginPath();
    
  	// vertical GRID lines
 	for (var c = 0; c < 11; c++)
  	{
  	   ctx.moveTo(gx+dg*c,gy);
  	   ctx.lineTo(gx + dg*c, gy+10*dg+tick);
  	}
    // horizontal GRID lines
  	for (var c = 0; c < 11; c++)
  	{
  	  ctx.moveTo(gx-tick, gy + dg*c);
  	  ctx.lineTo(gx+10*dg, gy + dg*c);
  	}
  	
 	ctx.strokeStyle = 'lightblue';
  	ctx.stroke()
 	ctx.restore();	
 }	
 
 function drawLabels()
 {
     ctx.save();
     ctx.beginPath();
 
 	// X axis
 	ctx.font = "14px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "center"; 
  
	var X, Y;
    Y = 410;   
    for (var c = 0; c < 11; c++)
 	{ 	  
	   X = gx + c * inc_x;
 	   ctx.fillText(q1[c],X,Y);
    }
 	
    //  Y axis
    X = 385;	
  	for (var c = 0; c < 11; c++)
 	{
       Y = gy + c * inc_y + 5;
       ctx.fillText(q2[c],X,Y);
 	}
 	
	ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
	ctx.fillText("y",355,215);
	ctx.fillText("x",576,435);
	
 	ctx.restore();
 }
 
function calculation()
{
    var xP, yP;
	as = a * sf;
	bs = b * sf;
    	
    ctx.moveTo(xC+as, yC);
     for (var c = 0; c < Nt+1; c++)
 	{
        t = c*dt;
        xP = xC  + as * Math.cos(t);
        yP = yC  + bs * Math.sin(t);
 		ctx.lineTo(xP,yP);
    }	
	
	ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
    
	//ctx.fillText(dg,170,100);
}


function display()
{
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
    ctx.fillText( "SIMULATION", 10, 25 );
 	ctx.fillText("ELLIPSES / CIRCLES",10,48);
 	
	ctx.fillStyle = "blue";
 	ctx.fillText("a  =  " ,50,100); 
 	ctx.fillText(a, 85,100);
 	 	
 	ctx.fillText("b  =  ",50,140);
 	ctx.fillText(b, 85,140);
} 
 
