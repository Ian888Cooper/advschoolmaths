var ctx, w, h;           // canvas size [px]
var mousePos, mouseButton;
// grid parameters
   var X1, X2, Y1, Y2, XC, YC, dX,dY, X21, Y21, tick;
   var c =[];          // polynomial coefficients
   var xMax, xMin, yMax, yMin, N, dx;
   var x,y;
   var q1 = [], q2 = [];

function init()     //=========================================================
{
     // This function is called after the page is loaded
     // 1 - Get the canvas
     canvas = document.getElementById('myCanvas');
     // 2 - Get the context
     ctx = canvas.getContext('2d');
	 // 3 - we can draw
     ctx.clearRect(0,0,canvas.width,canvas.height); 
	 
	canvas.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(canvas, evt);
        var message = '   ' + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
    }, false);

      canvas.addEventListener('mousedown', function (evt) {
        mouseButton = evt.button;
        var message = " " + evt.button + "   " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
        var message = "Mouse up at position: " + mousePos.x + ',' + mousePos.y;
        writeMessage(canvas, message);
    }, false);
  
  
	setup();
    drawGrid();
    drawLabels();
    display();
    calculation();
	
}	 

function writeMessage(canvas, message) {
    ctx.save();
    ctx.clearRect(0, 280, 350, 150);
    ctx.font = '14pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText("Place mouse in graph area for X,Y positions:", 5,300);
    //ctx.fillText(message, 5, 325);
    if (mousePos.x > X1 && mousePos.x < X2)
      {
      if (mousePos.y > Y1 && mousePos.y < Y2)
      { 
        var sfx, sfy;
        sfx = (xMax - xMin)/X21;
        sfy = (yMax - yMin)/Y21;
        var xPos = Math.round(sfx*(mousePos.x - XC)*10)/10;
        var yPos = -Math.round(sfy*(mousePos.y - YC)*10)/10;
        ctx.fillText(xPos +' , ' + yPos,25,325);  
      }
      }
    
    
    ctx.restore();
}

function getMousePos(canvas, evt) {
    // necessary to take into account CSS boudaries
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}



function setup()     // =======================================================
{
   w = canvas.width ;
   h = canvas.height ;

// grid parameters
   X1 = 390;
   Y1 = 30;
   dX = 36;
   dY = 30;
  
   X21 = 10*dX;
   Y21 = 10*dY;
   X2 = X1+ X21;
   Y2 = Y1 + Y21;
   XC = 5*dX+X1;
   YC = 5*dY+Y1;
   tick = 5;
  
// polynominal coefficients and parameters
  c = [2, 0, 1, 0, 0];
  xMax = 10;
  xMin= -xMax;
  yMax = 10;
  yMin = -yMax;
  
  N = 1000;      // number of x values
  
  x = 0;
  y = 0;
}

function drawGrid()     // ===================================================
 {
    ctx.save();
    ctx.beginPath();
    
  	// vertical GRID lines
 	for (var k = 0; k < 11; k++)
  	{
  	   ctx.moveTo(X1+dX*k,Y1);
  	   ctx.lineTo(X1+dX*k, Y2+tick);
  	}
    // horizontal GRID lines
  	for (k = 0; k < 11; k++)
   {
  	  ctx.moveTo(X1-tick, Y1 + dY*k);
  	  ctx.lineTo(X2, Y1 + dY*k);
  	}
  	
 	ctx.strokeStyle = 'lightblue';
  	ctx.stroke();
   
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
    ctx.fillText( "x", XC-5, Y2+40);
    ctx.fillText( "y", X1-80, Y2-150);
   
 	ctx.restore();	
 }

    

function display()     // =====================================================
{
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
    ctx.fillText( "Polynomial Coefficients", 10, 25 );
 	
 	ctx.fillText("a   =  ",50,90);
    ctx.fillText("0",      60,95);
 	ctx.fillText(c[0],95,90); 
    ctx.fillText("a   =  ",50,130);
    ctx.fillText("1",      60,137);
 	ctx.fillText(c[1],95,130);
    ctx.fillText("a   =  ",50,170);
    ctx.fillText("2",      60,177);
 	ctx.fillText(c[2],95,170);
    ctx.fillText("a   =  ",50,210);
    ctx.fillText("3",      60,217);
 	ctx.fillText(c[3],95,210);
    ctx.fillText("a   =  ",50,250);
    ctx.fillText("4",      60,257);
 	ctx.fillText(c[4],95,250);
	
	 ctx.font = "14px Calibri";
	ctx.fillText("Use only integer values for the coefficients",25,420);
} 

function calculation()     // ==================================================
{
  
  ctx.save();
  ctx.beginPath();
  
  xMin = - xMax;
  yMin = - yMax;
  
  dx = (xMax - xMin) / N;
  
 //  ctx.moveTo(XC, YC);
  
  for(var k = 0; k<N+1; k++)
  {
   x =  xMin + dx*k;
     for (var m = 0; m < 5; m++)
     {  
        y = y + c[m]*Math.pow(x,m);
     }
	
  var fx = X21 / (xMax - xMin);
  var fy = Y21 / (yMax - yMin); 
   
  var xP = XC + fx * x;
  var yP = YC-fy * y;
  
  if (y <= yMax && y >= -yMax)
  { 
     ctx.lineTo(xP,yP);
  }
  
     
  y = 0;
  }
  
   ctx.strokeStyle = 'blue';
   ctx.lineWidth = 3;
   ctx.stroke();
  
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
   // ctx.fillText( xMax, 100, 300);
  
  ctx.restore();
}

function drawLabels()   //====================================
 {
   ctx.save();
   ctx.beginPath();
   var dx = xMax * 2 /10;
   var dy = -yMax * 2 /10;
 for (var k = 0; k<11; k++)
	{
	q1[k] = Math.round((-xMax + k*dx)*10)/10;
	q2[k] = Math.round((yMax + k*dy)*10)/10;
	}	
   // X axis
 	ctx.font = "14px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "center"; 
  
	//var X, Y;
    Y = 350;   
    for (k = 0; k < 11; k++)
 	{ 	  
	   X = X1 + k * 36;
 	   ctx.fillText(q1[k],X,Y);
   }
 	
    //  Y axis
    X = 370;	
  	for (k = 0; k < 11; k++)
    {
      Y = 5+Y1 + k * 30;
      ctx.fillText(q2[k],X,Y);
    }
 	
	
 ctx.restore();
 }

function plot()
{
  //c[0] = parseFloat(document.querySelector("#control_a0").value);
   c[0] = parseInt(document.querySelector("#control_a0").value);
   c[1] = parseInt(document.querySelector("#control_a1").value);
   c[2] = parseInt(document.querySelector("#control_a2").value);
   c[3]= parseInt(document.querySelector("#control_a3").value);
   c[4] = parseInt(document.querySelector("#control_a4").value);
  xMax = parseInt(document.querySelector("#control_xMax").value);
  yMax = parseInt(document.querySelector("#control_yMax").value);
   
  
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  
  drawGrid();
  drawLabels(); 
  display();
  calculation();
}

