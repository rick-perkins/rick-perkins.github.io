

var BLOCK_CANVAS_WIDTH    = 360;
var BLOCK_CANVAS_HEIGHT   = 120;
var BLOCK_STATS_HEADER    =  16;
var BLOCK_CANVAS_H_OFFSET =  20;
var BLOCK_CANVAS_V_OFFSET =   20;
var BLOCK_VALS_PR_BYTE    =   4;
var signal_array = [];
var signal_block = [0,0];


function radom_signal(divide, multi){
 return(Math.floor((Math.random() * 10)/divide)*multi)
}
//create signal array....
function fnc_signal_array(){
for (i=0;i<=10800;i++){
	if ((i >= (2701+(90*signal_block[0])) && i <= (2702+(90*signal_block[0])))||(i >= (2789+(90*signal_block[0])) && i <= (2790+(90*signal_block[0])))){
		if (signal_block[0] <= 24){signal_array[i]=85;}
		else {signal_array[i]=1+(radom_signal(4,0)+(radom_signal(4,4))+(radom_signal(4,16))+(radom_signal(4,64)));}
		
		if(i == (2790+(90*signal_block[0])) && (signal_block[0] <=28)){
			signal_block[0]++;}
		else {signal_block[0] = signal_block[0];}
	
	}
	else if (i >= (2744+(90*signal_block[1])) && i <= (2747+(90*signal_block[1]))){
		if (signal_block[1] <= 24){signal_array[i]=85;}
		else {signal_array[i]=1+(radom_signal(4,0)+(radom_signal(4,4))+(radom_signal(4,16))+(radom_signal(4,64)));}
		if(i == (2747+(90*signal_block[1])) && (signal_block[1] <=28)){
			signal_block[1]++;}
		else {signal_block[1] = signal_block[1];}
	
	}
	else if(i >= 2701 && i <= 5760){
		if (i >= 2881 && i<= 5220){signal_array[i] = 170;}
		else{signal_array[i]=(radom_signal(5,2)+(radom_signal(5,8))+(radom_signal(5,32))+(radom_signal(5,128)));}
	;}
	else {signal_array[i]=0}
	}

}
	
function BlockingZones(canvas, width, height)
{
    var shift = (width % BLOCK_VALS_PR_BYTE) * 2;
    var idx = Math.floor((((width + (height - 1) * BLOCK_CANVAS_WIDTH) - 1) / BLOCK_VALS_PR_BYTE) + 1);
	
    return ((canvas[idx] & (0x03 << shift)) >> shift);
}
function map_canvas(){
	var canvas = document.getElementById('blkStatsCanvas');
var ctx = canvas.getContext('2d');
	return ctx;
}
function draw_graph(ctx){

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.translate(10,0);
ctx.clearRect(-10, 0, 765, 290);
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = '#4E5359';
ctx.rect(20,20,720,240);						
ctx.stroke();
for (h = 1; h <= 120; h++)
            {
                for (w = 1; w <= 360; w++)
                {
                    // Note: fillStyle/strokeStyle is a Colour (Hexadecimal RGB value)
                    switch(BlockingZones(signal_array,w,h))
                    {
                    case 2: // Signal
                        ctx.fillStyle = "green";//"#E5ECEF";
                        break;
                    case 1: // Blocked
                        ctx.fillStyle = "red"//"#8996A0";
                        break;
                    case 0: // Intentional fallthrough (Background)
                    default:
                        ctx.fillStyle = "#ABBBC7";
                    }
                    var pixwidth = 2;
                    var x = (w-1)*2 + BLOCK_CANVAS_H_OFFSET;
                    var y = (2*BLOCK_CANVAS_HEIGHT-pixwidth)-((h-1)*2)+ BLOCK_CANVAS_V_OFFSET;
                    ctx.fillRect(x,y,pixwidth,pixwidth);
                }
            }
	ctx.stroke();		

	for (i=0;i<11;i++){
		ctx.beginPath();
		ctx.strokeStyle='#8C949B';
		ctx.moveTo(80+(60*i),20);
		ctx.lineTo(80+(60*i),260);
		ctx.stroke();}
	for (i=0;i<3;i++){
		ctx.beginPath();
		ctx.strokeStyle='#8C949B';
		ctx.moveTo(20,80+(60*i));
		ctx.lineTo(740,80+(60*i));
		ctx.stroke();
	}
	for (i=0;i<=12;i++){
		var text = 180+(i*30);
		if (text >=360){text = text-360;}
		ctx.fillStyle ="#000";
		ctx.font = "12px Verdana";
		ctx.textAlign = "center";
		ctx.fillText(text,20+(i*60),(BLOCK_CANVAS_HEIGHT*2)+BLOCK_CANVAS_V_OFFSET+14);
		}
	ctx.fillText("Azimuth [deg]",380,(BLOCK_CANVAS_HEIGHT*2)+BLOCK_CANVAS_V_OFFSET+24);
	for (i=0;i<=5;i++){
		var text = -30+(i*30);
		ctx.textAlign = "right";
		ctx.fillText(text,15,(BLOCK_CANVAS_HEIGHT*2)+BLOCK_CANVAS_V_OFFSET-(i*60)+4);

	}
	ctx.save();
	ctx.translate(0,140);
	ctx.textAlign = "center";
	ctx.rotate(270 * Math.PI / 180);
	ctx.fillText("Elevation [deg]",-5,0);
	ctx.restore();
}
function draw_blockage(ctx){//area is*2
	for (i=0;i<=7;i++){
		if ($('#active'+i).is(":checked")){
			var start_val = parseInt($("#el_start" + i).val());
			var end_val = parseInt($("#el_end" + i).val());
			if (start_val >= end_val) {
				alert("EL start must be greater then EL stop");
				$("#el_start" + i).focus();
				return false;
			}
			
		}
	}
	compass('cir');compass1();draw_graph(map_canvas());draw(map_canvas());
	
}
function draw(ctx){
	for (i=0;i<=7;i++){
	if ($('#active'+i).is(":checked")){
	var line_colour;
		var area = [$('#az_start'+i).val(),$('#az_end'+i).val(),$('#el_start'+i).val(),$('#el_end'+i).val()];
		area = [area[0]*2,area[1]*2,area[2]*2,area[3]*2];
		ctx.save();
		ctx.translate(20,200);
		if ($('#notx'+i).is(":checked")){ctx.setLineDash([]);}
		else {ctx.setLineDash([10, 5]);}
		ctx.beginPath();
		if (i == 0){line_colour="rgb(0,255,255)";}
		else if (i ==1){line_colour="rgb(0,255,0)";}
		else if (i ==2){line_colour="rgb(255,0,0)";}
		else if (i ==3){line_colour="rgb(205,84,229)";}
		else {line_colour="rgb(0,0,0)";}
		ctx.strokeStyle = line_colour;
		var width = 360;
		var az_start =(width+area[0])% (width*2);
		var az_stop = (width+area[1])% (width*2);
		//vertical lines
		ctx.moveTo(az_start,-area[2]);
		ctx.lineTo(az_start,-area[3]);
		ctx.moveTo(az_stop,-area[2]);
		ctx.lineTo(az_stop,-area[3]);
		//horz lines
		if (az_stop > az_start){
			ctx.moveTo(az_start,-area[2]);
			ctx.lineTo(az_stop,-area[2]);
			ctx.moveTo(az_start,-area[3]);
			ctx.lineTo(az_stop,-area[3]);
		}
		else{//horz lines wrap
			ctx.moveTo(az_start,-area[2]);
			ctx.lineTo(720,-area[2]);
			ctx.moveTo(az_start,-area[3]);
			ctx.lineTo(720,-area[3]);
			
			ctx.moveTo(0,-area[2]);
			ctx.lineTo(az_stop,-area[2]);
			ctx.moveTo(0,-area[3]);
			ctx.lineTo(az_stop,-area[3]);


		}
		ctx.stroke();
		ctx.restore();
		az_blockage(ctx_compass('cir'),i,line_colour);
		el_blockage(ctx_compass1(),i,line_colour);
	}}}
	
//compass....	
	function overview_page(offseta,id){//only used on overpage 
		for (i=0;i<=3;i++){
			if ($('#active'+i).is(":checked")){
			var line_colour,offset =[offseta,0];
			if (i == 0){line_colour="rgb(0,0,0)";offset[1]= -10;}
			else if (i ==1){line_colour="rgb(153,102,51)";offset[1]= -10;}
			else if (i ==2){line_colour="rgb(255,0,0)";offset[1]= 10;}
			else if (i ==3){line_colour="rgb(255,165,0)";offset[1]= 10;}
			else {line_colour="rgb(128,128,128)";}
			if (offset[0] == 1){az_blockage(ctx_compass(id),i,line_colour,offset[1]);}
			else {az_blockage(ctx_compass(id),i,line_colour,offset[0]);}
			
			el_blockage(ctx_compass1(),i,line_colour);
			}
		}
		
	}
	function ctx_compass(id){
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
		return(ctx);
	}
	function ctx_compass1(){
		var canvas = document.getElementById('cir1');
		var ctx = canvas.getContext('2d');
		return(ctx);
	}
	function compass(id) {
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, 420, 420);
			ctx.fillStyle = 'white';
			ctx.translate(150.5, 150.5);
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.arc(0,0,140,0,2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(0,0,137,0,2*Math.PI);
			ctx.stroke();
			//vessel
			ctx.save();
			if(id == "ci"){ctx.translate(0,0);}
			else{ctx.translate(-10,0);}
			
				ctx.beginPath();
				ctx.moveTo(-30,76);
				ctx.bezierCurveTo(-30,110,30,110,30,76);
				ctx.lineTo(30,-60);
				ctx.bezierCurveTo(0,-118,0,-118,-30,-60);
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(0,-50,8,0,rotate(360));
				ctx.stroke();
				ctx.beginPath();
				ctx.rect(-20,-60,40,20);
				ctx.rect(-16,30,32,40);
				ctx.stroke();
					ctx.save();
					ctx.beginPath();
					ctx.scale(0.5, 1);
					ctx.arc(0,50,12,0,rotate(360));
					ctx.stroke();
					ctx.restore();
			ctx.restore();
			ctx.beginPath();
			ctx.arc(0,0,6,0,rotate(360));
			ctx.stroke();
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.save();
			  for (var i = 0; i < 36; i++) {
				ctx.beginPath();
				ctx.strokeStyle = 'black';
				ctx.rotate(Math.PI / 18);
				ctx.moveTo(138, 0);
				ctx.lineTo(140, 0);
				ctx.stroke();
			  }
			 
			 // 90 marks
			
			  for (var i = 0; i < 4; i++) {
				ctx.beginPath();
				ctx.strokeStyle = 'red';
				ctx.rotate(Math.PI / 2);
				ctx.moveTo(138, 0);
				ctx.lineTo(140, 0);
				ctx.stroke();
			  }
			 
			// 45 marks
			 
			 ctx.rotate(Math.PI / 4);
			  for (var i = 0; i < 4; i++) {
				ctx.beginPath()
				ctx.strokeStyle = 'blue';
				ctx.rotate(Math.PI / 2);
				ctx.moveTo(138, 0);
				ctx.lineTo(140, 0);
				ctx.stroke();
			  }
			 ctx.rotate(rotate(-45));
			 ctx.textAlign = "center";
			 ctx.font = "9px Verdana";
			 for (i=0;i<=7;i++){
				ctx.beginPath();
				ctx.fillStyle = "#000";
				ctx.fillText((i*45),0,-142);
				ctx.rotate(rotate(45));
				ctx.stroke();
				}
			  // vessel	icon
				
			ctx.restore();	
			
		}
		//blockage zones
			function az_blockage(ctx,i,line_colour,offset){
				var offset;
				if (offset == null){offset = 0;}
				ctx.save();
				ctx.beginPath();
				line_colour = line_colour.replace(')', ', 0.5)').replace('rgb', 'rgba');
				ctx.fillStyle = line_colour;
				ctx.strokeStyle = line_colour;
				ctx.rotate(rotate(-90));
				ctx.arc(0, 0, 140, (+($("#az_start"+i).val())+offset) * Math.PI/180, (+($("#az_end"+i).val())+offset) * Math.PI/180);
				ctx.lineTo(0,0);
				ctx.stroke();
				ctx.fill();
				ctx.restore();
			}
		function rotate (deg){return(deg*Math.PI/180);}
		//el zones
		function compass1() {
			var canvas = document.getElementById('cir1');
			var ctx = canvas.getContext('2d');
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, 420, 420);
				ctx.fillStyle = 'white';
				ctx.translate(150.5, 150.5);
				ctx.lineWidth = 1;
				
				ctx.beginPath();
				ctx.strokeStyle = 'black';
				ctx.arc(0,0,140,rotate(150),rotate(30));
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(0,0,137,rotate(150),rotate(30));
				ctx.stroke();
				//vessel
				ctx.beginPath();
				ctx.arc(-76,24,24,rotate(90),rotate(180));
				ctx.lineTo(100,24);
				ctx.quadraticCurveTo(80,48,60,48);
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(0,0,6,0,rotate(360));
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(0,6);
				ctx.lineTo(0,24);
				ctx.rect(-70,14,40,10);
				ctx.rect(-60,-24,20,38);
				ctx.rect(40,0,20,24);
				ctx.rect(44,-14,10,14);
				ctx.stroke();
				ctx.lineWidth = 2;
				ctx.lineCap = 'round';
				ctx.textAlign = "center";
				ctx.font = "9px Verdana";
				ctx.rotate(rotate(150));
				ctx.fillStyle = "#000";
				ctx.save();
				
				  for (var i = 0; i <= 24; i++) {
					ctx.beginPath();
					ctx.strokeStyle = 'black';
					
					ctx.moveTo(138, 0);
					ctx.lineTo(140, 0);
					ctx.rotate(Math.PI / 18);
					ctx.stroke();
				  }
				ctx.restore();
				ctx.save();
				 
				 // 90 marks
				ctx.rotate(rotate(30));
				  for (var i = 0; i < 3; i++) {
					ctx.beginPath();
					ctx.strokeStyle = 'red';
					ctx.moveTo(138, 0);
					ctx.lineTo(140, 0);
					
					ctx.rotate(Math.PI / 2);
					ctx.stroke();
				  }
				 ctx.restore();
				 ctx.save();
				// 45 marks
				 
				  ctx.rotate(rotate(75));
				  for (var i = 0; i < 2; i++) {
					ctx.beginPath()
					ctx.strokeStyle = 'blue';
					ctx.moveTo(138, 0);
					ctx.lineTo(140, 0);
					ctx.rotate(Math.PI / 2);
					ctx.stroke();
				  }
				  ctx.restore();
				  ctx.rotate(rotate(-150));
				  ctx.save();
				 ctx.textAlign = "center";
				 ctx.font = "9px Verdana";
				 for (i=0;i<=3;i++){
					ctx.beginPath();
					ctx.fillStyle = "#000";
					ctx.save();
					if (i<3){
						ctx.rotate(rotate(45*i));
						ctx.fillText((90-i*45),0,-142);
						}
					else {ctx.rotate(rotate(120));ctx.fillText("-30",0,-142);}
					if (i>0 && i<3){ctx.rotate(rotate((-45*2)*i));ctx.fillText((90-i*45),0,-142);}
					else {ctx.rotate(rotate(-120*2));ctx.fillText("-30",0,-142);}
					ctx.stroke();
					ctx.restore();
					}
					ctx.restore();
				  
				  	
					
		  }
		function el_blockage(ctx,i,line_colour){		
				ctx.save();
				ctx.beginPath();
				line_colour = line_colour.replace(')', ', 0.5)').replace('rgb', 'rgba');
				ctx.fillStyle = line_colour;
				ctx.strokeStyle = line_colour;
				if ((+$("#az_start"+i).val() >90) && (+$("#az_start"+i).val()<270)){ctx.rotate(rotate(180));ctx.arc(0, 0, 140,rotate($("#el_start"+i).val()),rotate($("#el_end"+i).val()));}
				else {ctx.arc(0, 0, 140,rotate(-$("#el_end"+i).val()),rotate(-$("#el_start"+i).val()));}
				ctx.lineTo(0,0);
				ctx.fill();
				ctx.stroke();
				ctx.restore();
		}