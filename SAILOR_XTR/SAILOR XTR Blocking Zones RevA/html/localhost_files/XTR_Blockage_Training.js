var signal_array = [];
var signal_block = [0,0];
var BLOCK_CANVAS_WIDTH    = 360;
var BLOCK_CANVAS_HEIGHT   = 120;
var BLOCK_STATS_HEADER    =  16;
var BLOCK_CANVAS_H_OFFSET =  20;
var BLOCK_CANVAS_V_OFFSET =   20;
var BLOCK_VALS_PR_BYTE    =   4;
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
fnc_signal_array();
function draw_map(){
	
	
	var canvas = document.getElementById('block_map');
	var ctx = canvas.getContext('2d');
	var w = canvas.width, h = canvas.height;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	//ctx.translate(10,0);
	ctx.clearRect(0, 0, w, w);
	ctx.font = "12px Roboto,Helvetica Neue,sans-serif";
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#000';
	ctx.rect(60,10,1080,360);						
	ctx.stroke();
	ctx.strokeStyle = '#aaaaaa';
	for(i=1;i<=11;i++){
		ctx.beginPath();
		ctx.moveTo(60+(90*i),10);
		ctx.lineTo(60+(90*i),370);
		ctx.stroke();
	}
	for(i=1;i<=3;i++){
		ctx.beginPath();
		ctx.moveTo(60,10+(90*i));
		ctx.lineTo(1140,10+(90*i));
		ctx.stroke();
	}
	for (i=0;i<=12;i++){
		var text = 180+(i*30);
		if (text >=360){text = text-360;}
		ctx.fillStyle ="#000";
		
		ctx.textAlign = "center";
		ctx.fillText(text,60+(i*90),390);
		}
		ctx.fillText("Azimuth (deg)",(w/2)+24,410);
	for (i=0;i<=5;i++){
		var text = 90-(i*30);
		ctx.textAlign = "right";
		ctx.fillText(text,50,14+(90*i));
	}
	ctx.save();
	ctx.translate(30,h/2-20);
	ctx.textAlign = "center";
	ctx.rotate(270 * Math.PI / 180);
	ctx.fillText("Elevation (deg)",-5,0);
	ctx.restore();	
	ctx.stroke();
	ctx.beginPath();
	for (h = 1; h <= 120; h++){
		for (w = 1; w <= 360; w++){
			var shift = (w % BLOCK_VALS_PR_BYTE) * 2;
			var idx = Math.floor((((w + (h - 1) * BLOCK_CANVAS_WIDTH) - 1) / BLOCK_VALS_PR_BYTE) + 1);
			var signal = ((signal_array[idx] & (0x03 << shift)) >> shift);
			switch(signal){	
				case 2: 
					ctx.fillStyle = "#00a4f2";// Signal
					break;
				case 1: 
					ctx.fillStyle = "#bc0000";// Blocked
					break;
				case 0:
					 default:
					ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            }
            var pixwidth = 3;
            var x =(w-1)*3 + 60;
            var y = 366-((h-1)*3);
            ctx.fillRect(x,y,pixwidth,pixwidth);
        }
    }
	ctx.stroke();
	//block zones
	ctx.save();
	
	ctx.translate(60,280);
	for(i=1;i<=15;i+=2){
			var a = i*2;
		if($('#mat-checkbox-'+i+'-input').attr('aria-checked') == 'true'){
			if($('#mat-checkbox-'+(i+1)+'-input').attr('aria-checked') == 'true'){ctx.setLineDash([]);}
			else {ctx.setLineDash([10, 5]);}
			var line_colour;
			if (i == 1){line_colour="#000";}
			else if (i ==3){line_colour="#996633";}
			else if (i ==5){line_colour="#ff0000";}
			else if (i ==7){line_colour="#ffa500";}
			else {line_colour="#aaaaaa";}
			ctx.strokeStyle = line_colour;
			ctx.lineWidth = 2;	
			
			var Area = [$('#mat-input-'+a).val(),$('#mat-input-'+(a+1)).val(),$('#mat-input-'+(a+2)).val(),$('#mat-input-'+(a+3)).val()];
			const SC = 3, width = 540// scale, map area/2
			area = [Area[0]*SC,Area[1]*SC,Area[2]*SC,Area[3]*SC];
			
			ctx.beginPath();
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
				ctx.lineTo(1080,-area[2]);
				ctx.moveTo(az_start,-area[3]);
				ctx.lineTo(1080,-area[3]);
				
				ctx.moveTo(0,-area[2]);
				ctx.lineTo(az_stop,-area[2]);
				ctx.moveTo(0,-area[3]);
				ctx.lineTo(az_stop,-area[3]);
			}ctx.stroke();
			
			az_blockage(ctx_compass('cir'),Area,line_colour);
			el_blockage(ctx_compass1(),Area,line_colour)
		}
		
		
	}
	ctx.restore();
	
	ctx.save();
	ctx.beginPath();
	ctx.translate(1030,30);
	ctx.fillStyle = "#fff";	
	ctx.fillRect(0,0,90,90);
	ctx.rect(0,0,90,90);
	ctx.stroke();
	ctx.fillStyle = "#bc0000";	
	ctx.fillRect(10,10,10,10);
	ctx.fillStyle = "#00a4f2";	
	ctx.fillRect(10,30,10,10);
	ctx.fillStyle = "#000";
	ctx.textAlign = "left";
	ctx.fillText("Blocked",30,20);
	ctx.fillText("Signal",30,40);
	ctx.fillText("No Tx",30,60);
	ctx.fillText("Tx",30,80);
	ctx.stroke();
	ctx.lineWidth = 2;	
	ctx.rect(10,50,10,10);
	ctx.stroke();
	ctx.setLineDash([2, 2]);
	ctx.rect(10,70,10,10);
	ctx.stroke();
	ctx.restore();
	
	
	
	
}




	
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
	function compass(id,scale) {//cir
		var canvas = document.getElementById(id);
		var ctx = canvas.getContext('2d');
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(scale,scale);
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
			function az_blockage(ctx,area,line_colour,offset){
				var offset;
				if (offset == null){offset = 0;}
				ctx.save();
				ctx.beginPath();
				ctx.globalAlpha = 0.4;
				ctx.fillStyle = line_colour;
				ctx.rotate(rotate(-90));
				ctx.arc(0, 0, 140, (+area[0]+offset) * Math.PI/180, (+area[1]+offset) * Math.PI/180);
				ctx.lineTo(0,0);
				ctx.fill();
				ctx.restore();
			}
		function rotate (deg){return(deg*Math.PI/180);}
		//el zones
		function compass1(scale) {
			var canvas = document.getElementById('cir1');
			var ctx = canvas.getContext('2d');
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(scale,scale);
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
		function el_blockage(ctx,area,line_colour){		
				ctx.save();
				ctx.beginPath();
				ctx.globalAlpha = 0.4;
				ctx.fillStyle = line_colour;
				if ((+area[0] >90) && (+area[0]<270)){ctx.rotate(rotate(180));ctx.arc(0, 0, 140,rotate(area[2]),rotate(area[3]));}
				else {ctx.arc(0, 0, 140,rotate(-area[3]),rotate(-area[2]));}
				ctx.lineTo(0,0);
				ctx.fill();
				ctx.restore();
		}
function all_zero(){
	$('.mat-input-element').attr("value",0);
	
	
}
function el_range_check(){
	var b;
	for (i=1;i<=15;i+=2){
			const a = i*2;
			const start_val = parseInt($('#mat-input-'+(a+2)).val());
			const end_val = parseInt($('#mat-input-'+(a+3)).val());
			if (start_val >= end_val) {
				$('#EL_error').show();
				clearTimeout(b);
				b = setTimeout(EL_error_hide, 4000);
				$('#mat-input-'+(a+2)).focus();
				return false;
			}
		
	}
}
function EL_error_hide(){
	$('#EL_error').fadeOut(1000);
	
}
function settings_pos(){
	var a = $('#spacer').position().left + $('#spacer').width();
	$('.mat-ink-bar').css('left',+(a+160)+"px");
	
	
}
$(document).ready(function(){
	
	$('app-blocking-zones-apply-button').click(function(){el_range_check();});
	$('.mat-checkbox-input').click(function(){
		var id = this.id.slice(0,-6);
		var Tx_state ="off";
		if ( $(this).attr('aria-checked') == 'true' ) {
			$(this).attr('aria-checked',"false");
			$('#'+id).removeClass("mat-checkbox-checked");
		} else {
			$(this).attr('aria-checked',"true");
			$('#'+id).addClass("mat-checkbox-checked");
		}

		blockage_map();
	});
	$('.mat-input-element').on('input',function(){blockage_map();});
	function blockage_map(){
		$('.blocking-zones').empty();
		compass('cir',1.5);compass1(1.5);
		for(i=1;i<=15;i+=2){
			var a = i*2;
			if($('#mat-checkbox-'+i+'-input').attr('aria-checked') == 'true'){
				const start = $('#mat-input-'+a).val()-90;
				const stop = $('#mat-input-'+(a+1)).val()-90;
				var Tx_state = '#aaaaaa';
				if ( $('#mat-checkbox-'+(i+1)+'-input').attr('aria-checked') == 'true' ) {Tx_state = '#ff0000';}
				else {Tx_state = '#aaaaaa'}
				const L = 198, R = 195, Rs = start * (Math.PI/180), Re = stop * (Math.PI/180); //Length , Radians,
				var PD = 0;//Path Direction
				const start_x = L + R * Math.cos(Rs), start_y = L + R * Math.sin(Rs), stop_x = L + R * Math.cos(Re), stop_y = L + R * Math.sin(Re);
				if (stop - start > 180){PD = 1;}else {PD = 0;}
				$('g.blocking-zones').append('<path d="M '+stop_x+' '+stop_y+' A 195 195 0 '+PD+' 0 '+start_x+' '+start_y+' L 198 198 L '+stop_x+' '+stop_y+'" fill='+Tx_state+' stroke='+Tx_state+' opacity="0.35" class="blocking-zones"></path>');
				$('g.blocking-zones').html($('g.blocking-zones').html());
			}
		}
		draw_map();
	}
	
	
});