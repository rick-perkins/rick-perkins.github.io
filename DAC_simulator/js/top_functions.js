/***************************************************************************
//! 
//!
//! author: Rick Perkins
//!
//! 
***************************************************************************/
/*moving...	3px = 1 deg*/
var tmragc = setInterval(function(){fagc()}, 100);
var satellite_agc = [1500,1500,0];//agc value,set agc, agc direction
var antenna_pointing = [0,0];//up,left with N/S adjustment
var sat_1 = ["28E", , ]/*name, x, y*/
var sat_2 = ["22W", , ]
var sat_3 = ["1W", , ]
var sat_4 = ["58W", , ]
var vblockage=[0,0];/*blockage, blockage trigger count*/
var vela = 25;
var vaza = 144;
function azel(){
	var left = (((vaza*5)-450)-50).toFixed(0);// az *5 = px posistion - 450 (90degs) - (50)mispointing setting.
	antenna_pointing[0] = (((vela)*5)-16).toFixed(0);
	if (($('#antlata').text()).slice(-1) == "S") {
		if (left <= 0){antenna_pointing[1] = +left + 900;}
		else {antenna_pointing[1] = +left - 900;}
	;}
	else {antenna_pointing[1] = left;}
	$("#target_marker").css("left",antenna_pointing[1]+"px");
	$("#target_marker").css("bottom",antenna_pointing[0]+"px");
	$("#aza").text(("00"+(+vaza + +Dac_variables.vaztrim).toFixed(1)).slice(-5));
	$("#ela").text(("00"+(+vela + +Dac_variables.veltrim).toFixed(1)).slice(-5));	
}
sat_location();	
/*satellite location on #space...*/
function sat_location(){
	var sat_pi = ((Math.PI)/180);/*.toFixed(9)*/
	var vsat_lat = 0;
	var vsat_lon = 0;
	var vsat_pos = 0;
	var vlon_sat = 0;
	var sat_y = 0;
	var sat_azv = 0;
	var sat_aza = 0;
	var sat_azb = 0;
	var sat_elb = 0;
	var sat_match = [0,0,0,0];//sat1=1,2=2,3=4,4=8
	for (var i = 1;i<5;i++){
		if (($('#antlata').text()).slice(-1) == "N") {vsat_lat = (parseFloat($("#latb").text())+ 0.0001);$('#marker0').text("90AZ");$('#marker1').text("270AZ");}
		else {vsat_lat = (-(parseFloat($("#latb").text()))+ 0.0001);$('#marker0').text("270AZ");$('#marker1').text("90AZ");}
				
		if (($('#antlona').text()).slice(-1) == "W") {vsat_lon = (parseFloat($("#lonb").text())+ 0.0001);}
		else {vsat_lon = (-(parseFloat($("#lonb").text()))+ 0.0001);}	
		if ((window["sat_"+i][0]).slice(-1) == "W") {vsat_pos = parseFloat((window["sat_"+i][0]).slice(0,2));}
		else {vsat_pos = -(parseFloat((window["sat_"+i][0]).slice(0,2)));}
		/*Lon Sat*/
		if ((vsat_lon - vsat_pos)> 180){vlon_sat = ((vsat_lon - vsat_pos)-360);}		
		else if ((vsat_lon - vsat_pos)< -180){vlon_sat = ((vsat_lon - vsat_pos)+360);}	
		else{vlon_sat = (vsat_lon - vsat_pos);}
		sat_y = Math.acos((Math.cos(sat_pi*vsat_lat))*(Math.cos(sat_pi*vlon_sat)));/*Y*/
		/*AZ*/
		sat_azv = ((1/sat_pi)*Math.acos((-Math.tan(sat_pi*vsat_lat))/Math.tan(sat_y)));
		if (vlon_sat < 0){sat_azb = (360 - sat_azv)-90;}
		else {sat_azb = sat_azv - 90;}
		if (($('#antlata').text()).slice(-1) == "S") {
			if (sat_azb <= 0){sat_aza = parseFloat((sat_azb + 180).toFixed(0));}
			else {sat_aza = parseFloat((sat_azb - 180).toFixed(0));}
		;}
		else {
			sat_aza = parseFloat((sat_azb).toFixed(0));
			}
		
		/*el*/
		sat_elb = (((1/sat_pi)*Math.atan((Math.cos(sat_y)-0.15116)/Math.sin(sat_y))).toFixed(1));
		sat_el = (+sat_elb).toFixed(0);
		
		/*sat icon placement in to space div*/
		window["sat_"+i][1] = +sat_aza*5;
		window["sat_"+i][2] = +sat_el*5;
		var newimg = $("<img alt='' class='x' src='images/satellite-icon.png'></img>");
		newimg.css({"bottom": (sat_el*5)+"px","left": ((sat_aza)*5)+"px"});
		var newspan = $("<span class='x sattxt' >"+window["sat_"+i][0]+"</span>");
		newspan.css({"position":"absolute","bottom": ((sat_el*5)+50)+"px","left": ((sat_aza)*5)+"px"});
		$('#space').append(newimg, newspan);
		for (ia=i+1;ia<5;ia++){
			if ((window["sat_"+i][0]) == (window["sat_"+ia][0])){sat_match[ia-1]="sat"+i;}
		}
	}
}
function sat_location_remove(){$('.x').remove();sat_location();}
function blockage(){
		if (vela < +$("#el12a").text()/10){
			if (+$("#az1a").text() > +$("#az2a").text()){
				if (((+$("#rela").text()*10 > +$("#az1a").text())&& ($("#rela").text() < 359.9))||((+$("#rela").text()*10 < +$("#az2a").text())&& ($("#rela").text() > 0))){vblockage[0] = 1;$("#block_ref").text("in zone 1");$("#block_ref").css("color","red");}		
			;}
			else if ((+$("#rela").text()*10 > +$("#az1a").text())&& ($("#rela").text()*10 < +$("#az2a").text())){vblockage[0] = 1;$("#block_ref").text("in zone 1");$("#block_ref").css("color","red");}
		;}
		if (vela < +$("#el34a").text()/10){
			if (+$("#az3a").text() > +$("#az4a").text()){
				if (((+$("#rela").text()*10 > +$("#az3a").text())&& ($("#rela").text() < 359.9))||((+$("#rela").text()*10 < +$("#az4a").text())&& ($("#rela").text() > 0))){vblockage[0] = 1;$("#block_ref").text("in zone 2");$("#block_ref").css("color","green");}		
			}
			else if ((+$("#rela").text()*10 > +$("#az3a").text())&& ($("#rela").text()*10 < +$("#az4a").text())){vblockage[0] = 1;$("#block_ref").text("in zone 2");$("#block_ref").css("color","green");}
		;}
		if (vela < +$("#el56a").text()/10){
			if (+$("#az5a").text() > +$("#az6a").text()){
				if (((+$("#rela").text()*10 > +$("#az5a").text())&& ($("#rela").text() < 559.9))||((+$("#rela").text()*10 < +$("#az6a").text())&& ($("#rela").text() > 0))){vblockage[0] = 1;$("#block_ref").text("in zone 3");$("#block_ref").css("color","blue");}	
			}
			else if ((+$("#rela").text()*10 > +$("#az5a").text())&& ($("#rela").text()*10 < +$("#az6a").text())){vblockage[0] = 1;$("#block_ref").text("in zone 3");$("#block_ref").css("color","blue");}
		;}
		if (vblockage[0] == 0){$("#block_ref").text("");$("#block_ref").css("color","orange");}	
}
var tmrtracking = setInterval(function(){onsat()}, 100);
function onsat (){	
	var sat = 0;
	vblockage[1]++;
	if(vblockage[1] == 10){blockage();vblockage[1]=0}
	/*AGC update ref satellite location...*/
	if (vblockage[0] == 0){$('#tracka').show();$('#block').hide();
		if ((antenna_pointing[1] > (sat_1[1] - 38))&&(antenna_pointing[1] < (sat_1[1] + 38))&&(antenna_pointing[0] > (sat_1[2] - 38))&&(antenna_pointing[0] < (sat_1[2] + 38))){sat = 1;check_settings(sat);}
		else if ((antenna_pointing[1] > (sat_2[1] - 38))&&(antenna_pointing[1] < (sat_2[1] + 38))&&(antenna_pointing[0] > (sat_2[2] - 38))&&(antenna_pointing[0] < (sat_2[2] + 38))){sat = 2;check_settings(sat);}
		else if ((antenna_pointing[1] > (sat_3[1] - 38))&&(antenna_pointing[1] < (sat_3[1] + 38))&&(antenna_pointing[0] > (sat_3[2] - 38))&&(antenna_pointing[0] < (sat_3[2] + 38))){sat = 3;check_settings(sat);}
		else if ((antenna_pointing[1] > (sat_4[1] - 38))&&(antenna_pointing[1] < (sat_4[1] + 38))&&(antenna_pointing[0] > (sat_4[2] - 38))&&(antenna_pointing[0] < (sat_4[2] + 38))){sat = 4;check_settings(sat);}
		else {offsat();}
		}
	else{offsat();$('#tracka').hide();$('#block').show();}
		
		
}
function check_settings(sat){
	var satx = 0;
	var saty = 0;
	if((nid_lock_wait ==0)&&($('#sat'+sat+'_preset .freq').val() == $('#freqval').text())&&($('#sat'+sat+'_preset .volt option:selected').text() == $('#volta').text())&&($('#sat'+sat+'_preset .tone option:selected').text() == $('#toneval').text())){scpc_mode();}
	else {offsat();}
	function scpc_mode(){
		if ($('#fecb').text()=="SCPC" && $('#sat'+sat+'_preset .khz').val() == $('#khzval').text()){satx = window["sat_"+sat][1]; saty = window["sat_"+sat][2];tracking(satx,saty);onsat1 (satx,saty,sat);}
		else if ($('#fecb').text()!="SCPC" && $('#sat'+sat+'_preset .baud').val() == $('#baudval').text()){satx = window["sat_"+sat][1]; saty = window["sat_"+sat][2];tracking(satx,saty);onsat1 (satx,saty,sat);}
		else {offsat();}
			
	}
}
function tracking(satx,saty){
	if(($('#tracka').html() == "&nbsp;&nbsp;&nbsp;ON&nbsp;")&&(satellite_agc[0] > $("#thrsa").text())& (vtarget == 0)&& nid_lock_wait ==0){	
		if ((antenna_pointing[1] < satx)&(antenna_pointing[1] > (satx - 38))){vantaza=((vaza*10 + 1)/10);}
		else if	((antenna_pointing[1] > satx)&(antenna_pointing[1] < (satx + 38))){vantaza=((vaza*10 - 1)/10);}
		else if (antenna_pointing[1] == satx){vantaza = vantaza;}
		if ((antenna_pointing[0] < saty)&(antenna_pointing[0] > (saty - 38))){vantel=((vela*10 + 1)/10);}
		else if	((antenna_pointing[0] > saty)&(antenna_pointing[0] < (saty + 38))){vantel=((vela*10 - 1)/10);}
		else if (antenna_pointing[0] == saty){vantel = vantel;}	
		;}
}
var nid_lock = 1;
var nid_lock_wait = 0;
var tmr_nid_check;
function nid_check_tmr(){
	vantaza = Search_variables.search_az_stop;vantel = Search_variables.search_el_stop;nid_lock = 0;nid_lock_wait = 200;search_Con();
}
var nid_check_pause = 0;
function nid_check(sat){
	if ($('#nidaval').text() != 0000){
		if (nid_check_pause == 0){
			if (($('#sat'+sat+'_preset .nid').val() != $('#nidaval').text())||($('#sat'+sat+'_preset .fec option:selected').text() != $('#fecb').text())||($("#tunercard").text()=="Switch to DVB-S2 Tunercard")){
				nid_check_pause = 1; clearTimeout(tmr_nid_check);tmr_nid_check = setTimeout(function(){ nid_check_tmr(); nid_check_pause = 0}, 6000);}
			else {$('#nid_display').html($('#sat'+sat+'_preset .nid').val());nid_lock = 1;}
		}
	}
	else {$('#nid_display').html($('#sat'+sat+'_preset .nid').val());nid_lock = 1;}
}
/*agc offsat*/
function offsat(){if (satellite_agc[1] != 1500){satellite_agc[0] = 1500;satellite_agc[1] = 1500;$("#onsat").text("Off Sat");$("#onsat").css( "color","orange" );$('#nid_display').html("0000");}}
/*AGC peaking up and on sat*/
function onsat1 (satx,saty,sat){
	if (((antenna_pointing[1] > (satx - 5))&&(antenna_pointing[1] < (satx + 5))&&(antenna_pointing[0] > (saty - 5))&&(antenna_pointing[0] < (saty + 5)))){
		$("#onsat").text("On Sat");
		$("#onsat").css( "color","red" );
		if (satellite_agc[1] != 1922){satellite_agc[0] = 1922;satellite_agc[1] = 1922;}
		nid_check(sat);
	}
	else if (((antenna_pointing[1] > (satx - 15))&&(antenna_pointing[1] < (satx + 15))&&(antenna_pointing[0] > (saty - 15))&&(antenna_pointing[0] < (saty + 15)))){
		$("#onsat").text("Almost on Sat");
		$("#onsat").css( "color","green" );
		if (satellite_agc[1] != 1822){satellite_agc[0] = 1822;satellite_agc[1] = 1822;}
				
	}
	else if (((antenna_pointing[1] > (satx - 24))&&(antenna_pointing[1] < (satx + 24))&&(antenna_pointing[0] > (saty - 24))&&(antenna_pointing[0] < (saty + 24)))){
		$("#onsat").text("Getting closer to Sat");
		$("#onsat").css( "color","violet" );
		if (satellite_agc[1] != 1722){satellite_agc[0] = 1722;satellite_agc[1] = 1722;}
		$('#nid_display').html("0000");
	}
	else if (((antenna_pointing[1] > (satx - 38))&&(antenna_pointing[1] < (satx + 38))&&(antenna_pointing[0] > (saty - 38))&&(antenna_pointing[0] < (saty + 38)))){
		$("#onsat").text("close to Sat");
		$("#onsat").css( "color","blue" );
		if (satellite_agc[1] != 1622){satellite_agc[0] = 1622;satellite_agc[1] = 1622;}
		$('#nid_display').html("0000");
	}
}

/*....*/
/*AGC count and screen update...*/
function fagc(){
$("#b1").text("vrot "+ vrot);
	$("#b2").text("Vaza "+ vantaza);
	$("#b3").text("refagc "+ satellite_agc[1]);
	$("#b4").text("agc "+ satellite_agc[0]);
	$('#b5').html("AZ stop"+Search_variables.target_az_stop+"<br>EL stop"+Search_variables.target_el_stop+"<br>search step"+Search_variables.search_step+"<br>Search EL stop"+Search_variables.search_el_stop+"<br>Search AZ Stop"+Search_variables.search_az_stop+"<br>gyro limit "+no_gyro_limit);
	if(satellite_agc[2] == 0){
		if(satellite_agc[0]<satellite_agc[1]+11){satellite_agc[0]++;$(".agc").html(satellite_agc[0]);}
		else{satellite_agc[2] = 1;}
	}
	else{if(satellite_agc[0]>satellite_agc[1]-11){satellite_agc[0]--;$(".agc").html(satellite_agc[0]);}
		else{satellite_agc[2] = 0;}
	}
}