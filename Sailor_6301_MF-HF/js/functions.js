//mouse pos
var mx, my;
var knob_timer;
//var knob;
var diff;

$(document).mousemove(function(e){mx=e.offsetX;my=e.offsetY;$("#mouse").html("X pos = "+mx+" Y pos = "+my);});
function knob_difference(){
	
	alert(diff);
	diff = 22;
	
	
}
function tmr_rotate(knob){
	var knob = '#'+knob+'_a';
	var w = $(knob).width();
	var h = $(knob).height();
	var angle = Math.atan2(my - (w/2), mx - (h/2)) * 180 / Math.PI;
    angle += 90;
    if(angle < 0) { angle = 360 + angle; }
	var degrees = knob_pos(knob);
	
	
	
	offset = angle-degrees
	knob_timer=setInterval(function(){knob_rotate(knob,offset);}, 100)
	
}
function knob_pos(knob){
	var angle2 = $(knob).css('transform');
	var arrAngle2 = angle2.match(/[\-0-9.]+/g);
	if ((parseFloat(arrAngle2[1]) == (-1 * parseFloat(arrAngle2[2]))) || 
    (parseFloat(arrAngle2[3]) == parseFloat(arrAngle2[0])) || 
    ((parseFloat(arrAngle2[0]) * parseFloat(arrAngle2[3]) - parseFloat(arrAngle2[2]) * parseFloat(arrAngle2[1])) == 1)) {
    var degrees = Math.round(Math.acos(parseFloat(arrAngle2[0])) * 180 / Math.PI);
	var degrees1 = Math.round(Math.asin(parseFloat(arrAngle2[1])) * 180 / Math.PI);
	} 
	else {degrees = 0;}
	
	if (degrees1 <0){degrees = 360-degrees;}
	else {degrees = degrees;}
	return degrees;
	
}
function knob_rotate(knob,offset){
	var w = $(knob).width();
	var h = $(knob).height();
	var angle = Math.atan2(my - (w/2), mx - (h/2)) * 180 / Math.PI;
    angle += 90;
    if(angle < 0) { angle = 360 + angle; }
	
   
	angle1 = angle-offset;
	if (angle1 <0){angle1 = 360 +angle1;}
	else if (angle1>360){angle1 = angle1-360}
	var degrees = knob_pos(knob);
	
	
	var dim;
	if(knob == "#dim_knob_a"){
		dim = $('#brightness_br').width();
		$('#brightness').show();
		if (degrees > Math.round(angle1)){dim-=5}
		else if (degrees < Math.round(angle1)){dim+=5;}
		else {dim = dim}
		if (dim >= 200){$('#brightness_br').css('width',200);}
		else{$('#brightness_br').css('width',dim);}
		if(dim < 100){night_mode();}
		else {day_mode();}
	}
	else if(knob == "#pwr_knob_a"){
		dim = $('#volume_br').width();
		$('#volume').show();
		if (degrees > Math.round(angle1)){dim-=5}
		else if (degrees < Math.round(angle1)){dim+=5;}
		else {dim = dim}
		if (dim >= 200){$('#volume_br').css('width',200);}
		else if(dim <= 0){$('#volume_br').css('width',0);
			if($('#brightness_br').width() < 100){$('#mute_red').show();}
			else {$('#mute').show();}
		}
		else{$('#volume_br').css('width',dim);$('#mute').hide();$('#mute_red').hide();}
		
	}
	$('#angle2').text(angle1+" degrees"+degrees);
	$(knob).css({"transform":'rotate('+angle1+'deg)'});
}
function night_mode(){
	$("#screen ").css({"background-color":"#000","color":"#FF0000"});
	$('#brightness').css({'border':'1px solid #FF0000'});$('#brightness_br').css({'background-color':'#FF0000'});
	$('#volume').css({'border':'1px solid #FF0000'});$('#volume_br').css({'background-color':'#FF0000'});
	if ($('#mute').is(':visible')){$('#mute_red').show();$('#mute').hide();}
	
}
function day_mode(){
	$("#screen ").css({"background-color":"#7FCFFF","color":"#000"});
	$('#brightness').css({'border':'1px solid #000'});$('#brightness_br').css({'background-color':'#000'});
	$('#volume').css({'border':'1px solid #000'});$('#volume_br').css({'background-color':'#000'});
	if ($('#mute_red').is(':visible')){$('#mute_red').hide();$('#mute').show();}
}
$(document).ready(function(){

	//buttons

$("#num_0").click(function(){$("#screen #text").text("Button 0 Pressed");});
$("#num_1").click(function(){$("#screen #text").text("Button 1 Pressed");});
$("#num_2").click(function(){$("#screen #text").text("Button 2 Pressed");});
$("#num_3").click(function(){$("#screen #text").text("Button 3 Pressed");});
$("#num_4").click(function(){$("#screen #text").text("Button 4 Pressed");});
$("#num_5").click(function(){$("#screen #text").text("Button 5 Pressed");});
$("#num_6").click(function(){$("#screen #text").text("Button 6 Pressed");});
$("#num_7").click(function(){$("#screen #text").text("Button 7 Pressed");});
$("#num_8").click(function(){$("#screen #text").text("Button 8 Pressed");});
$("#num_9").click(function(){$("#screen #text").text("Button 9 Pressed");});
$("#num_ch").click(function(){$("#screen #text").text("Channel Button Pressed");});
$("#rx_tx").click(function(){$("#screen #text").text("RX/TX Button Pressed");});
$("#mode").click(function(){$("#screen #text").text("Mode Button Pressed");});
$("#spk").click(function(){$("#screen #text").text("Message Button Pressed");});
$("#distress").click(function(){$("#screen #text").text("HELP......");});
//knobs
//$('#rf_knob').click(function(){knob_difference();});
$('#rf_knob,#pwr_knob,#dim_knob').mousedown(function(){tmr_rotate(this.id);});
$('#rf_knob,#pwr_knob,#dim_knob').mouseup(function(){clearInterval(knob_timer);$('#brightness').hide();$('#volume').hide();});
$('#rf_knob, #pwr_knob, #dim_knob').mouseout(function(){clearInterval(knob_timer);$('#brightness').hide();$('#volume').hide();});

});

