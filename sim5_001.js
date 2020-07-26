var canvas, ctx;

var p = [], q1 = [], q2 = [], q3 = [];
var tick = 6;
var u, a, Nt, t, s, v, tMax, dt;
u = 30;
a = -10;
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
	constants1();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation1(u,a); 
	
	
	constants2();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation2(u,a); 
	
	constants3();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation3(u,a); 
	display();	
}	 

function  inc_u()
{
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
	
	if (u > 30) {du = -5;}
	if (u < -15) {du = 5;}
	u = u + du;
	constants1();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation1(u,a); 
	
	
	constants2();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation2(u,a); 
	
	
	constants3();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation3(u,a);
    display(); 
}	

function  inc_a()
{
 	ctx.clearRect(0,0,canvas.width,canvas.height); 
	
	if (a < -10) {da = 2}
	if (a > 6)   {da = -2;}
	
	a = a + da;
	constants1();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation1(u,a); 
	
	
	constants2();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation2(u,a); 
	
	
	constants3();
	drawGrid1(p);
	drawAxes1(q1,q2,q3);
	calculation3(u,a); 
	display();
}	


 
function constants()
{
    //u = 20;
	du = 5;
	da = 2;
	v = u;
	//a = -10;
	Nt = 1000;
	t = 0;
	s = 0;
	tMax = 10;
	dt = tMax/Nt;
}

function constants1()
{
   // PARAMETERS TO DEFINE GRAPH in percentages of canvas size
   var inc = 4;
   p[0]  = 35;                // x1 GRID positions
   p[1]  = 98;                // x2
   p[2]  = 2;                 // y1
   p[3]  = 30-inc;                // y2
   p[4]  = 64;                           // x position X label
   p[5]  = 32;                           // Y position X label
   p[6]  = "t  [s]  ";                  // X label
   p[7]  = 28;                           // x position Y label
   p[8]  = 18-inc;                           // y position Y label
   p[9]  = "s  [m]";                     // Y label
   p[10] = "   ";
   q1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];    // X axis numbers
   q2 = [120, 80, 40, 0, -40, -80];                   // Y axis numbers
   q3 = [35, 33-inc, 1.05, 33, 2.7, 0.8];                      //X Axis (x y dx) Y Axis (x y dy)
}

function constants2()
{
   // PARAMETERS TO DEFINE GRAPH in percentages of canvas size
   //p = [35, 98, 2, 30, 68, 35];
   var inc = 32;
   p[2]  = 2 + inc;                 // y1
   p[3]  = 30 + inc-4;                // y2
   p[4]  = 64;                           // x position X label
   p[5]  = 36 + inc-4;                           // Y position X label
   p[6]  = "t  [s]  ";                  // X label
   p[7]  = 28;                           // x position Y label
   p[8]  = 18 + inc-4;                           // y position Y label
   p[9]  = "v  [m/s]";                     // Y label
   
   q1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];    // X axis numbers
   q2 = [30, 20, 10, 0, -10, -20];                   // Y axis numbers
   q3 = [35, 33+inc-4, 1.05, 33, 2.7+inc, 0.8];                  //X Axis (x y dx) Y Axis (x y dy)
}


function constants3()
{
   // PARAMETERS TO DEFINE GRAPH in percentages of canvas size
   //p = [35, 98, 2, 30, 68, 35];
   var inc = 64;
   p[2]  = 2 + inc;                 // y1
   p[3]  = 30 + inc-4;                // y2
   p[4]  = 64;                           // x position X label
   p[5]  = 36 + inc-4;                           // Y position X label
   p[6]  = "t  [s]  ";                  // X label
   p[7]  = 28;                           // x position Y label
   p[8]  = 18 + inc-4;                           // y position Y label
   p[9]  = "a  [m/s   ]";                     // Y label
   p[10] = "2";
   
   q1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];    // X axis numbers
   q2 = [8, 4, 0, -4, -8, -12];                   // Y axis numbers
   q3 = [35, 33+inc-4, 1.05, 33, 2.7+inc, 0.8];                  //X Axis (x y dx) Y Axis (x y dy)
}


function drawGrid1(p)
{
   var gP = [], dg = [];
   ctx.save();
   ctx.beginPath();
   // GRID position x1 x2 y1 y2 in pixcels
   gP[0] = p[0] * canvas.width /100;
   gP[1] = p[1] * canvas.width /100;
   gP[2] = p[2] * canvas.height /100;
   gP[3] = p[3] * canvas.height /100;

    // [0 1] --> dx	   [2 3] --> dy
   dg[0] = (gP[1] - gP[0])/10;
   dg[1] = (gP[3] - gP[2])/10;
	
 	// vertical GRID lines
	for (var c = 0; c < 11; c++)
 	{
 	   ctx.moveTo(gP[0] + dg[0]*c, gP[2]);
 	   ctx.lineTo(gP[0] + dg[0]*c, gP[3]+tick);
 	}
    
	// horizontal GRID lines
 	for (var c = 0; c < 11; c++)
 	{
 	  ctx.moveTo(gP[0]-tick, gP[2] + dg[1]*c);
 	  ctx.lineTo(gP[1], gP[2] + dg[1]*c);
 	}
 	
	ctx.strokeStyle = 'lightblue';
 	ctx.stroke()
	
	// add X label
	
	var X = p[4] * canvas.width / 100;
	var Y = p[5] * canvas.height / 100;
	var Label = p[6];
    ctx.font = "14px Calibri";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText(Label,X,Y); 
	
	// add Y label
	var X = p[7] * canvas.width / 100;
	var Y = p[8] * canvas.height / 100;
	var Label = p[9];
    ctx.font = "14px Calibri";
	ctx.fillStyle = "black";
	ctx.textAlign = "center"; 
    ctx.fillText(Label,X,Y);
	ctx.fillText(p[10],X+18,Y-3);
	
	ctx.restore();	
}

function drawAxes1(q1, q2, q3)
{
    ctx.save();
    ctx.beginPath();

	// X axis
	ctx.font = "14px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "center"; 
	var X;
	var Y = q3[1] * canvas.height / 100;
	var inc = q3[2] * canvas.height / 100;
	
	for (var c = 0; c < 11; c++)
	{
	   X = (q3[0] + c*inc) * canvas.width / 100;
	   ctx.fillText(q1[c],X,Y);
	}
	
	// Y axis
	X =  q3[3] * canvas.width / 100;
	var inc = q3[5] * canvas.height / 100;
	for (var c = 0; c < 6; c++)
	{
	   Y = (q3[4] + c*inc) * canvas.height / 100;
	   ctx.fillText(q2[c],X,Y);
	}
	
	ctx.restore();
}


function display()
{
    ctx.font = "20px Calibri";
    ctx.fillStyle = "black"; 
    ctx.textAlign = "left";
    ctx.fillText( "SIMULATION", 10, 25 );
	ctx.fillText("UNIFORM ACCELERATION",10,45);
	
	ctx.fillStyle = "#FF00FF";
	ctx.fillText("a =           m/s" ,30,80); 
	ctx.fillText(a, 60,80);
	ctx.fillText("2", 135,77);
	
	//ctx.font = "18px Calibri";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.fillText("Initial Conditions  t = 0 s",25,130);
	ctx.fillStyle = "blue";
	ctx.fillText("s = 0  m",30,170); 
	
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	ctx.fillText("u = "+ u + "  m/s" ,30,210); 
	
	
} 

function calculation1(u,a)
{
    ctx.save();
    ctx.beginPath();
    var xP;
    var yP;
    var gP = [];
    
    gP[0] = p[0] * canvas.width /100;
    gP[1] = p[1] * canvas.width /100;
    gP[2] = p[2] * canvas.height /100;
    gP[3] = p[3] * canvas.height /100;

    var bx = gP[0];
    var mx = (gP[1] - gP[0])/tMax;
    var by = gP[3] - (gP[3]-gP[2])*(4/10);
    var my = (gP[2]-gP[3])/(q2[0]-q2[5]);
   
    ctx.strokeStyle = 'blue';
    ctx.moveTo(bx, by);
	
    for (var c = 0; c < Nt+1; c++)
	{
        t = c*dt;
        s = u * t + 0.5 * a * t *t; 
		xP = mx * t + bx;
        yP = my * s + by;
		ctx.lineTo(xP,yP);
    	//ctx.stroke();
		if (s < -80) {c = 2*Nt;}
		if (s > 120) {c = 2*Nt;}
		//ctx.fillText(xP,70,70);
	}

    ctx.font = "18px Calibri";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	//ctx.fillText("u =  " + u + "  m/s",30,30); 
    //ctx.fillText(my,150,50);
	//ctx.fillText(by,70,70);
	
	ctx.stroke();
	
    ctx.restore();
}

function calculation2(u,a)
{
    ctx.save();
    ctx.beginPath();
    var xP;
    var yP;
    var gP = [];
   
    gP[0] = p[0] * canvas.width /100;
    gP[1] = p[1] * canvas.width /100;
    gP[2] = p[2] * canvas.height /100;
    gP[3] = p[3] * canvas.height /100;

    var bx = gP[0];
    var mx = (gP[1] - gP[0])/tMax;
    var by = gP[2] + (gP[3]-gP[2])*(6/10) - (gP[3]-gP[2])*(u/(q2[0]-q2[5]));
    var my = (gP[3]-gP[2])*(1/(q2[0]-q2[5]))
   
    ctx.strokeStyle = 'red';
	
	ctx.moveTo(bx, by);
	
    for (var c = 0; c < Nt+1; c++)
	{
        t = c*dt;
        v = u + a * t; 
		xP = mx * t + bx;
        yP = gP[2] + (gP[3]-gP[2])*(6/10) - my * v;
    	ctx.lineTo(xP,yP);
    	//ctx.stroke();
		if (v < -21) {c = 2*Nt;}
		if (v > 35) {c = 2*Nt;}
		//ctx.fillText(xP,70,70);
	}

    ctx.font = "18px Calibri";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	//ctx.fillText("u =  " + u + "  m/s",30,30); 
    //ctx.fillText(u,50,50);
	//ctx.fillText(by,70,70);
	
	ctx.stroke();
	
    ctx.restore();
}

 
function calculation3(u,a)
{
    ctx.save();
    ctx.beginPath();
    var xP;
    var yP;
    var gP = [];
   
    gP[0] = p[0] * canvas.width /100;
    gP[1] = p[1] * canvas.width /100;
    gP[2] = p[2] * canvas.height /100;
    gP[3] = p[3] * canvas.height /100;

    var bx = gP[0];
    var mx = (gP[1] - gP[0])/tMax;
    //var my = (qP[2]-qP[3])/(q2[0]-q2[5]);
    //var by = qP[2] - my*a;
    ctx.strokeStyle = "#FF00FF";
	//yP = my * a + by;
	yP = gP[2]+(4/10)*(gP[3]-gP[2])+(-a/20)*(gP[3]-gP[2]);
    ctx.moveTo(bx, yP);
	
    for (var c = 0; c < Nt+1; c++)
	{
        t = c*dt;
        s = u * t + 0.5 * a * t *t; 
	    xP = mx * t + bx;
        ctx.lineTo(xP,yP);
    	//ctx.stroke();
		//ctx.fillText(xP,70,70);
	}

    ctx.font = "18px Calibri";
	ctx.fillStyle = "red";
	ctx.textAlign = "left";
	//ctx.fillText("u =  " + u + "  m/s",30,30); 
    //ctx.fillText(yP,50,50);
	
	
	ctx.stroke();
	
    ctx.restore();
}
 
   
	 