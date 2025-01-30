function doc_name(){
	$(".title").text("Sea Tel DAC2202 Simulator");
	$(".rev").text("Rev A");
}

//contents page layout
function content_page(layout){
/*Layout contents = blue with dark blue area
Layout blue = blue back ground
layout light blue = blue background
Layout red = red background
Layout brown = brown back ground
*/
var fill,stroke;	
if (layout == "contents"){fill = "rgba(39,106,161,1)"; stroke = "rgba(35,97,146,1)";page(0);}
else if (layout == "blue"){fill = "rgba(35,97,146,1)"; stroke = "rgba(39,106,161,1)";page(1);}	
else if (layout =="lightblue"){fill = "rgba(0,176,185,1)"; stroke = "rgba(0,198,208,1)";page(1);}
else if (layout =="red"){fill = "rgba(155,0,81,1)"; stroke = "rgba(180,0,94,14)";page(1);}
else if (layout =="brown"){fill = "rgba(176,170,126,1)"; stroke = "rgba(164,157,108,1)";page(1);}
else {fill = "rgba(113,122,128,1)"; stroke = "rgba(148,161,170,1)";page(1);}
function page(a){
	if (a == 0){$('#contents-text').show();$('#divider-text').hide();}
	else{$('#divider-text').show();$('#contents-text').hide();}
	if (layout == "complete"){$("#logo").css({"right":"483px","top":"276px"});}
	else {$("#logo").css({"right":"0px","top":"0px"});}
}$('#contents').html('<canvas  id="canvas_contents" style="border-radius:0 10px 0 0;" width="1216" height="614" >Your browser does not support the HTML5 canvas tag.</canvas>');
var canvas = document.getElementById('canvas_contents')
					var ctx = canvas.getContext('2d');
					var w = canvas.width,
					h = canvas.height;
					ctx.fillStyle = fill;
					ctx.strokeStyle = stroke;
					ctx.beginPath();
					ctx.fillRect(0,0,w,h);
					ctx.fill();
					ctx.stroke();
					function zero(x,y,r){
						ctx.beginPath();
						ctx.arc(x, y, r, 0, 2 * Math.PI);
						ctx.stroke();
						}
					function line(x,y,r){
						ctx.beginPath();
						ctx.moveTo(x,y-r);ctx.lineTo(x,y+r);
						ctx.stroke();
					}
					if (layout == "contents"){
						ctx.beginPath();
						ctx.fillStyle = stroke;
						ctx.strokeStyle = fill;
						ctx.beginPath();
						ctx.fillRect(w-912,0,w,h);
						ctx.fill();
						ctx.stroke();
						ctx.lineWidth = 16;
						
						ctx.strokeStyle = stroke;
						zero(10,h-150,120);
						line(210,h-150,120);
						
						
						ctx.strokeStyle = fill;
						zero(w-10,h-150,120);
						line(w-210,h-150,120);
						
					}
					else if (layout == "complete"){
						ctx.lineWidth = 16;
						line(20,30,120);zero(220,30,120);line(420,30,120);
						zero(20,h/2,120);line(220,h/2,120);
						zero(w-10, h-150,120);line(w-210,h-150,120);
						ctx.lineWidth = 6;
						zero(480,50,25);line(550,50,25);
						line(480,120,25);					
						line(260,212,25);zero(330,212,25);
						line(260,282,25);
						line(20,502,25);zero(90,502,25);line(160,502,25);
						line(w-20,269,25);zero(w-90,269,25);
						line(w-260,419,25);zero(w-330,419,25);
						zero(w-260,489,25);line(w-330,489,25);zero(w-400,489,25);
						line(w-260,559,25);zero(w-330,559,25);line(w-400,559,25);zero(w-470,559,25);
						
					}
					else{
						ctx.lineWidth = 6;
						var background =[[0,0,1,1,0],[0,1,1,0,0,1,0,1],[1,0,0,1,0,0],[1,0,1,0,0],[0,1,1,0],[1,0,0,0],[1,0,1,1],[0,0],[0,1,0],[0,1,1,1],[1,1,0,0,0]];
					
						for (i=0;i<=background.length-4;i++)
							{	for (ii=0;ii<=background[i].length-1;ii++)
								{
									var wi = w-40-(ii*70), hi = 50+(i*70);
									if (i === 0){wi = wi-(4*70);}else {wi = wi;}
									ctx.beginPath();
									if(background[i][(background[i].length-1)-ii] == 0){
										ctx.arc(wi, hi, 25, 0, 2 * Math.PI);
										}
									else {ctx.moveTo(wi,hi-25);
										ctx.lineTo(wi,hi+25);}
									
									ctx.stroke();
								}
							}
						for (ia=8;ia<=background.length-1;ia++)
							{	for (iia=0;iia<=background[ia].length-1;iia++)
								{	var wi = 40+(iia*70), hi = 50+((ia-3)*70);
									ctx.beginPath();
									if(background[ia][iia] == 0){
										ctx.arc(wi, hi, 25, 0, 2 * Math.PI);
										}
									else {ctx.moveTo(wi,hi-25);
										ctx.lineTo(wi,hi+25);}
									
									ctx.stroke();
							
								}
							}
					}
}
function coffee(state){
	if (state == "show"){$('#coffee-div').show();}
	else {$('#coffee-div').hide();}
}