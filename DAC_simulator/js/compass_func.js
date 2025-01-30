
var vrot = 0;
var vrothdg = 0;
var vrothdga = 0;
var vantrel =0;
var vrelaz = 0;
var vrota = 0;
var vantaz = 0;
var vantaza = 0;//az target pos
var vantel = 0;
var vrotel = 0;
var vtarget =1;
var vdacpt = 0;
var vantlat = 0;
var vantlon = 0;
var vsatpos = 0;
var vlonsat = 0;
var vpi = ((Math.PI)/180);//.toFixed(9);
var vpi1 = (1/((Math.PI)/180));//.toFixed(8);
var vy = 0;
var vantazv = 0;
var vi13 = 0;
var vj13 = 0;
var vk13 = 0;
var vtxpol = 2;
var vpoloffset = 0;
var vpolscale = 90;
var vpolcr = 90;
var ve14 = 0;
var vrawpol = 0;
var endtarget = 0;
var vhourangle = 0;
var vdeclin = 0;
var vantazb = 0;
var vantelb = 0;//EL target pos
var tmrtar = setInterval(vcompass, 50);
var tout =0;
var img_vessel = new Image();
img_vessel.src = "images/vessel.png";

function comp(){
	//input fields
	if (($('#antlata').text()).slice(-1) == "N") {
		vantlat = (parseFloat($("#latb").text())+ 0.0001);
		$("#antlatb").text(vantlat);
	}
	else {vantlat = (-(parseFloat($("#latb").text()))+ 0.0001);
		$("#antlatb").text(vantlat);}
				
	if (($('#antlona').text()).slice(-1) == "W") {
		vantlon = (parseFloat($("#lonb").text())+ 0.0001);
		$("#antlonb").text(vantlon);
	}
	else {vantlon = (-(parseFloat($("#lonb").text()))+ 0.0001);
		$("#antlonb").text(vantlon);}	
				
	if (($('#satposa').text()).slice(-1) == "W") {
		vsatpos = parseFloat($("#satb").text());
		$("#satposb").text(vsatpos);
	}
	else {vsatpos = -(parseFloat($("#satb").text()));
		$("#satposb").text(vsatpos);}
	//Lon Sat
	if ((vantlon - vsatpos)> 180){vlonsat = ((vantlon - vsatpos)-360);}		
	else if ((vantlon - vsatpos)< -180){vlonsat = ((vantlon - vsatpos)+360);}	
	else{vlonsat = (vantlon - vsatpos);}
	$("#lonsat").html((vlonsat).toFixed(1));
	$("#lonsata").html((-vlonsat).toFixed(1));	
	vy = Math.acos((Math.cos(vpi*vantlat))*(Math.cos(vpi*vlonsat)));//Y
	//AZ	
	vantazv = (vpi1*Math.acos((-Math.tan(vpi*vantlat))/Math.tan(vy)));
	if (vlonsat < 0){vantazb = 360 - vantazv;}
	else {vantazb = vantazv;}
	vantaz = vantazb - +Dac_variables.vaztrim;
	vantaza = parseFloat((vantaz).toFixed(1));
	//el
	vantelb = ((vpi1*Math.atan((Math.cos(vy)-0.15116)/Math.sin(vy))).toFixed(1));
	vantel = vantelb - +Dac_variables.veltrim;	
	vcompass();	
	vpolcal();	
}
	
function vpolcal(){
	vpoloffset = parseFloat($("#plota").text());
	vpolscale = parseFloat($("#plsea").text());
	var skewval = parseFloat($("#skval").text());
	//pol
	vi13 = Math.atan(Math.tan(vantlat*vpi)/Math.sin(-vlonsat*vpi))*vpi1;
	vj13 = (90 - vi13)+ skewval;
	if (Math.abs(vj13)>90){vk13 = vj13-180;}
	else {vk13 = vj13;}
	$("#antpol").text((vk13).toFixed(1));
	// Center reading..
	$("#polcr").text(vpoloffset + vpolscale);
	//tx pol
	if ($('#txpla').html() == "0004") {ve14 = 90;}
	else if ($('#txpla').html() == "0001") {ve14 = 45;}
	else if ($('#txpla').html() == "0003") {ve14 = -45;}
	else {ve14 = 0;}
		
	//raw pol target
	vrawpol = ((vk13*vpolscale)/90)+(vpoloffset + vpolscale)+ve14;
	$("#rawpt").text((vrawpol).toFixed(1));
	//dac pol target
	if (vrawpol < 30){vdacpt = vrawpol+180;}
	else{vdacpt = vrawpol}
	$("#pola").text(("000"+(vdacpt).toFixed(0)).slice(-4));
	//hour angle
	vhourangle = vpi1*Math.atan(Math.sin((-vlonsat)*vpi)/(Math.cos((-vlonsat)*vpi)-0.15126*Math.cos(vantlat*vpi)));
	$("#hourangle").text((vhourangle).toFixed(1));
	//declination
	vdeclin = (-vpi1)*Math.atan(0.15126*Math.sin(vantlat*vpi)*Math.sin(vhourangle*vpi)/Math.sin(vlonsat*vpi));
	$("#declin").text((vdeclin).toFixed(1));
	var r = "rotate("+((vk13 + ve14)+(+vpoloffset - 30)) + "deg)";
	$("#target_marker").css("transform",r);	
}
var step = 0;
var vazb = 0;
function vcompass(){
	compass();
	if (vtarget >= 1){$("#target_led").css( "backgroundColor","rgb(255, 255, 0)" );$('#tracka').html("&nbsp;tMUTE");endtarget = 1;search_on =0;$("#search_led").css( "backgroundColor","" );$("#track_led").css( "backgroundColor","" );}
	if (vtarget == 1){//target satellite.... move EL to El+8 degs
		if (vrotel < +vantel + 8 && step == 0){ vrotel = (((vrotel*10) + (0.1*10))/10); }
		else if (vrotel >= +vantel + 8 && step == 0){
			if (vrot > 359.9){vrot = 0.0;}
			else if (vrot < 0){vrot = 359.9;}
			else {vrot=vrot;
				if ((+vantaza - vrot > 180)||(+vantaza-vrot <-180)){
					if (vrot > vantaza){ vrot = ((vrot*10 + 0.1*10)/10).toFixed(1);}
					else if (vrot < vantaza){ vrot = ((vrot*10 - 0.1*10)/10).toFixed(1);}
				}
				else if (vrot > vantaza){ vrot = ((vrot*10 - 0.1*10)/10).toFixed(1);}
				else if (vrot < vantaza){ vrot = ((vrot*10 + 0.1*10)/10).toFixed(1);}
				else {step = 1 ;$("#thrsa").html(satellite_agc[0] + +$("#attrsa").text());}
				;}	
			}
			else if (vrotel > (+vantel).toFixed(1)){ vrotel = (((vrotel*10) - (0.1*10))/10);}
			else{$("#target_led").css( "backgroundColor","" );vtarget=0;step = 0;
				if (endtarget == 1){$('#Track').click();$('#Track').click();endtarget =0;};}
				search_target();no_gyro_limit =0;
	}
	else if (vrot > 359.9){vrot = 0.0;}
	else if (vrot < 0){vrot = 359.9;}
	else if (vantaza > 359.9){vantaza = 0.0;}
	else if (vantaza < 0){vantaza = 359.9;}
	else{vrot=vrot;vantaza=vantaza;
		if ((+vantaza - vrot > 180)||(+vantaza-vrot <-180)){
			if (vrot > vantaza){ vrot = ((vrot*10 + 0.1*10)/10).toFixed(1);}
			else if (vrot < vantaza){ vrot = ((vrot*10 - 0.1*10)/10).toFixed(1);}
		}
		else if (vrot > vantaza){ vrot = ((vrot*10 - 0.1*10)/10).toFixed(1);}
		else if (vrot < vantaza){ vrot = ((vrot*10 + 0.1*10)/10).toFixed(1);}				
		if (vrotel > (+vantel).toFixed(1)){ vrotel = (((vrotel*10) - (0.1*10))/10);}
		else if (vrotel < (+vantel).toFixed(1)){ vrotel = (((vrotel*10) + (0.1*10))/10); }
		if (vrotel == (+vantel).toFixed(1) && vrot == +vantaza && vtarget == 2){$("#target_led").css( "backgroundColor","" );vtarget=0;
			if (endtarget == 1){$('#Track').click();$('#Track').click();endtarget =0;};}
	}
	//heading rotate
	if (vrothdg != vrothdga){compass_vessel();}
	//end heading rotate
	if ((vrot - vrothdga)< 0){vrelaz = ((vrot - vrothdga)+360).toFixed(1);}
	else {vrelaz = (vrot - vrothdga).toFixed(1);}
	$("#rela").text(("00"+ vrelaz).slice(-5));	
	vcalaz = (parseFloat(vrelaz) +parseFloat(vrothdga));
	if (vcalaz > 360){vazb = ((+vrelaz + +vrothdga)) - 360;}
	else if (vcalaz < 0){vazb = ((+vrelaz + +vrothdga)) + 360;}
	else {vazb = (+vrelaz + +vrothdga);}
	vela = (vrotel).toFixed(1);
	vaza = (vazb).toFixed(1);
	azel();//triggers az and el update on screen
	if (search_on == 1 || search_on == 2){search();clearInterval(tmrtar);tmrtar = setInterval(vcompass, 50);}
	else if (search_on == 3){search();clearInterval(tmrtar);tmrtar = setInterval(vcompass, 10);
		if(Search_variables.search_step == 0 && vrotel == (+vantel).toFixed(1)){vantaza =((vantaza*10 + 0.1*10)/10);no_gyro_limit++;}
		else if (Search_variables.search_step == 2 && vrotel == (+vantel).toFixed(1)){vantaza =((vantaza*10 - 0.1*10)/10);no_gyro_limit--;}
	;}
	else {clearInterval(tmrtar);tmrtar = setInterval(vcompass, 10);}	
}
img_vessel.onload=compass_vessel;
function compass_vessel(){
	if (vrothdga > 359.9){vrothdga = 0.0;}
	else if (vrothdga < 0){vrothdga = 359.9;}
	else {vrothdga=vrothdga;
		if ((vrothdg-vrothdga > 180)||(vrothdg-vrothdga < -180)){
			if (vrothdga > vrothdg){ vrothdga = ((vrothdga*10 + 0.1*10)/10).toFixed(1);}
			else if (vrothdga < vrothdg){ vrothdga = ((vrothdga*10 - 0.1*10)/10).toFixed(1);}
		}
		else {if (vrothdga > vrothdg){ vrothdga = ((vrothdga*10 - 0.1*10)/10).toFixed(1);}
			else if (vrothdga < vrothdg){ vrothdga = ((vrothdga*10 + 0.1*10)/10).toFixed(1);}
		}	
	}
	var ctx = document.getElementById('cir_vessel').getContext('2d');
	// vessel	icon
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, 420, 420);
	ctx.translate(150, 150); 
	ctx.save();
	ctx.rotate(vrothdga *Math.PI / 180);
	ctx.drawImage(img_vessel, -30, -130,60,260);
	//blockage zones
	ctx.beginPath();
	ctx.strokeStyle = "rgba(255, 0, 0, 0)";
	ctx.arc(0, 0, 130, (($("#az1a").text()/10) - 90)* Math.PI/180, (($("#az2a").text()/10) - 90) * Math.PI/180);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.fillStyle ="rgba(255, 0, 0, 0.2)";
	ctx.fill();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0)";
	ctx.arc(0, 0, 120, (($("#az3a").text()/10) - 90)* Math.PI/180, (($("#az4a").text()/10) - 90) * Math.PI/180);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.fillStyle ="rgba(0, 255, 0, 0.2)";
	ctx.fill();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0, 0, 255, 0)";
	ctx.arc(0, 0, 110, (($("#az5a").text()/10) - 90)* Math.PI/180, (($("#az6a").text()/10) - 90) * Math.PI/180);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.fillStyle ="rgba(0, 0, 255, 0.2)";
	ctx.fill();
	//El blockage	
	ctx.restore();
	ctx.rotate(-Math.PI );
	ctx.beginPath();
	ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	ctx.arc(0, 0, 130, 0* Math.PI/180, (($("#el12a").text()/10)) * Math.PI/180);
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
	ctx.arc(0, 0, 120, 0* Math.PI/180, (($("#el34a").text()/10)) * Math.PI/180);
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
	ctx.arc(0, 0, 110, 0* Math.PI/180, (($("#el56a").text()/10)) * Math.PI/180);
	ctx.lineWidth = 4;
	ctx.stroke();
}
function compass() {
	var ctx = document.getElementById('cir').getContext('2d');
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, 420, 420);
	ctx.translate(150, 150);
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	//AZ arrow
	ctx.restore();
	ctx.save();
		ctx.rotate(-Math.PI / 2);
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.rotate((+vrot + +Dac_variables.vaztrim)*Math.PI / 180);
		ctx.moveTo(100, -10);
		ctx.lineTo(130, 0);
		ctx.lineTo(100, 10);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = 'red';
		ctx.fill();
		ctx.font = "14px Consolas";
		ctx.strokeText("AZ",102,4);
	//EL icon
	ctx.restore();
	ctx.save();
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.rotate((+vrotel + +Dac_variables.veltrim)*Math.PI / 180);
		ctx.moveTo(-80, 10);
		ctx.lineTo(-110, 0);
		ctx.lineTo(-80, -10);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.font = "14px Consolas";
		ctx.strokeText("EL",-94,4);
		ctx.restore();	
}
	
