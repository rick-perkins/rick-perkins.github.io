//rev x2

var tmr_time = setInterval(time ,1000);
function time(){
var today = new Date();
            h = today.getUTCHours(),
            m = today.getUTCMinutes(),
            s = today.getUTCSeconds(),
			d = today.getUTCDate(),
			mo = today.getUTCMonth(),
			y = today.getUTCFullYear();
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
$('.time').html(("0"+ h).slice(-2)+":"+("0"+ m).slice(-2)+":"+("0"+ s).slice(-2));
var ha = 0;
if (h+tzh >= 24){ha = (h+tzh)-24;}
else {ha = h+tzh;}
$('.timea').html(("0"+ ha).slice(-2)+":"+("0"+ (m+tzm)).slice(-2));
$('.date').html(month[mo]+":"+("0"+ d).slice(-2)+":"+y);
};
var tz = "+";
var tzh = 0;
var tzm = 0;
var enter = 0;
var btn_home = 0;
var btn_back = 0
var btn_fwd	=0;
var sat_info = 0;
var satellite = 0;
var antenna = 0;
var panel_settings = 0;
var system_info = 0;
var hdgvalue = 0;
var hdginput = "000.0";
var txt_length = 4;
var az = 144.0;
var el = 45.0;
var pol = 90;
var target_sat = 1;
var wizard = 0;
var timezone = 18;

var A = "";
var B = "";
var C = "";//spare for anything :)
var D = "";//spare for anything :)
//presets......
var edit = 0;
var preset = 1;
var edit_code =0;
var name = "";
var lon = "";
var ew = "";
var skew = 0;
var tone = "";
var Tpol = "";
var freq = 1234;
var Brate = 12345;
var fec = "";
var fl_ch = 0;


var nida = "";
var nidb = "";
var thrsh = 100;

function load_save_as(){$('#save_as_1').text($('#scn_sat_1 .name_a').text());$('#save_as_2').text($('#scn_sat_2 .name_a').text());$('#save_as_3').text($('#scn_sat_3 .name_a').text());$('#save_as_4').text($('#scn_sat_4 .name_a').text());
	$('#save_as_5').text($('#scn_sat_5 .name_a').text());$('#save_as_6').text($('#scn_sat_6 .name_a').text());$('#save_as_7').text($('#scn_sat_7 .name_a').text());$('#save_as_8').text($('#scn_sat_8 .name_a').text())
}
function save_as(){
	
	
	$('#scn_sat_'+preset+' .lon_a').text($('#scn_sat_'+target_sat+' .lon_a').text());
	$('#scn_sat_'+preset+' .ew_a').text($('#scn_sat_'+target_sat+' .ew_a').text());
	$('#scn_sat_'+preset+' .skew_a').text($('#scn_sat_'+target_sat+' .skew_a').text());
	$('#scn_sat_'+preset+' .tone_a').text($('#scn_sat_'+target_sat+' .tone_a').text());
	$('#scn_sat_'+preset+' .Tpol_a').text($('#scn_sat_'+target_sat+' .Tpol_a').text());
	$('#scn_sat_'+preset+'a .freq_a').text($('#scn_sat_'+target_sat+'a .freq_a').text());
	$('#scn_sat_'+preset+'a .Brate_a').text($('#scn_sat_'+target_sat+'a .Brate_a').text());
	$('#scn_sat_'+preset+'a .fec_a').text($('#scn_sat_'+target_sat+'a .fec_a').text());
	$('#scn_sat_'+preset+'a .nid_a').text($('#scn_sat_'+target_sat+'a .nid_a').text());
	$('#scn_sat_'+preset+'a .nidb_a').text($('#scn_sat_'+target_sat+'a .nidb_a').text());
	$('#scn_sat_'+preset+'a .thrsh_a').text($('#scn_sat_'+target_sat+'a .thrsh_a').text());
 
 if (preset != target_sat){preset = target_sat;nonsave_preset();}
}
function load_preset (){
	name = $('#scn_sat_'+preset+' .name_a').text();
	lon = $('#scn_sat_'+preset+' .lon_a').text();
	ew = $('#scn_sat_'+preset+' .ew_a').text();
	skew = $('#scn_sat_'+preset+' .skew_a').text();
	tone = $('#scn_sat_'+preset+' .tone_a').text();
	Tpol = $('#scn_sat_'+preset+' .Tpol_a').text();
	freq = $('#scn_sat_'+preset+'a .freq_a').text();
	Brate = $('#scn_sat_'+preset+'a .Brate_a').text();
	fec = $('#scn_sat_'+preset+'a .fec_a').text();
	nida = $('#scn_sat_'+preset+'a .nid_a').text();
	nidb = $('#scn_sat_'+preset+'a .nidb_a').text();
	thrsh = $('#scn_sat_'+preset+'a .thrsh_a').text();
	
}
function load_settings(){
	if ($('#scn_sat_'+preset).is(':visible')){hdginput = $('#scn_sat_'+preset+' .'+edit_code+'_a').text();$('.hdginput:visible').html(hdginput);}
	else if ($('#scn_sat_'+preset+'a').is(':visible')){hdginput = $('#scn_sat_'+preset+'a .'+edit_code+'_a').text();$('.hdginput:visible').html(hdginput);}
	
}
function save_preset(){
	if ((name != $('#scn_sat_'+preset+' .name_a').text())||(lon != $('#scn_sat_'+preset+' .lon_a').text())||(ew != $('#scn_sat_'+preset+' .ew_a').text())
		||(skew != $('#scn_sat_'+preset+' .skew_a').text())||(tone != $('#scn_sat_'+preset+' .tone_a').text())||(Tpol != $('#scn_sat_'+preset+' .Tpol_a').text()))
		{$('#scn_save').show();$('#scn_sat_' + preset).hide();
	}
	else if ((freq != $('#scn_sat_'+preset+'a .freq_a').text())||(Brate != $('#scn_sat_'+preset+'a .Brate_a').text())||(fec != $('#scn_sat_'+preset+'a .fec_a').text())
		||(nida != $('#scn_sat_'+preset+'a .nid_a').text())||(nidb != $('#scn_sat_'+preset+'a .nidb_a').text())||(thrsh != $('#scn_sat_'+preset+'a .thrsh_a').text()))
		{$('#scn_save').show();$('#scn_sat_' + preset+'a').hide();}
	else {if (($('#scn_sat_' + preset+'a').is(':visible'))){$('#scn_sat_' + preset+'a').hide();$('#scn_sat_' + preset).show();}
		else if ((edit == 2)&&($('#scn_sat_' + preset).is(':visible'))){$('#scn_sat_' + preset).hide();$('#sat_edit').click();}
		else if ((edit == 3)&&($('#scn_sat_' + preset).is(':visible'))){$('#scn_sat_' + preset).hide();$("#scn_satellite").show();}
	
	;}
}
function nonsave_preset(){
	$('#scn_sat_'+preset+' .name_a').text(name);
	$('#scn_sat_'+preset+' .lon_a').text(lon);
	$('#scn_sat_'+preset+' .ew_a').text(ew);
	$('#scn_sat_'+preset+' .skew_a').text(skew);
	$('#scn_sat_'+preset+' .tone_a').text(tone);
	$('#scn_sat_'+preset+' .Tpol_a').text(Tpol);
	$('#scn_sat_'+preset+'a .freq_a').text(freq);
	$('#scn_sat_'+preset+'a .Brate_a').text(Brate);
	$('#scn_sat_'+preset+'a .fec_a').text(fec);
	$('#scn_sat_'+preset+'a .nid_a').text(nida);
	$('#scn_sat_'+preset+'a .nidb_a').text(nidb);
	$('#scn_sat_'+preset+'a .thrsh_a').text(thrsh);
	$('.sat'+preset+' .name_a').text(name);
	
}
var tmr_flash_text = setInterval(flash_text ,0);
var flash_tmr = 0;
function flash_text(){
	if (flash_tmr >= 20){clearInterval(tmr_flash_text);flash_tmr=0;$("#scn_target").hide();}
	else {flash_tmr ++;}
	if ($('#targeting_text').is(':visible')){$('#targeting_text').hide();}
	else {$('#targeting_text').show();}
	
}
function target(){$("#scn_target").show();$(".sat_text").html("");
	$("#scn_target .preset_text").text(name);
	buttons();
	tmr_flash_text = setInterval(flash_text ,500);
}
function buttons (){
	//home, back and fwd buttons...
	if ($("#scn_target").is(':visible')){btn_home=1;btn_back=1;btn_fwd=0;}
	else if($('.button2:visible').length >0){btn_home=1;btn_back=1;btn_fwd=1;}
	else if ($('.button1:visible').length >0){btn_home=1;btn_back=1;btn_fwd=0;}
	else if ($('.button0:visible').length >0){btn_home=1;btn_back=0;btn_fwd=0;}
	else {btn_home=0;btn_back=0;btn_fwd=0;}

	if (btn_home == 1){$("#home").attr("src","img/Home.png");}
	else {$("#home").attr("src","img/Home_Dis.png");btn_back=0;btn_fwd=0;}
	if (btn_back == 1){$("#back").attr("src","img/Back.png");}
	else {$("#back").attr("src","img/Back_Dis.png");}
	if (btn_fwd == 1){$("#fwd").attr("src","img/Fwd.png");}
	else {$("#fwd").attr("src","img/Fwd_Dis.png");}
;}

//function for system information screens..
function sys_info(){$("#scn_sys_info,#scn_sys_info_a ").hide();$('#home').click();system_info = 0;}
function sys_info_a(){$('#scn_sys_info').show();$('#scn_sys_info_a').hide();buttons();}
function sys_info_b(){$('#scn_sys_info_a').show();$('#scn_sys_info').hide();buttons();}
var fncsys_info = [sys_info,sys_info_a,sys_info_b];
//wizard






//info text
function info_text(){
	if ($("#scn_home").is(':visible')){$(".OM").css('color','black');$("#screen-info-text").html('This is the home screen.'+
								'<ul><li>Satellite info: This displays the system staus of, Initializing, Searching, Targeting, Tracking, Identifying or Unwrapping.<br>The satellite name is displayed in <span style="color:yellow;">yellow</span> when DVB lock has been established but the NID is set to NULL. No NID verification.<br>The satellite name is displayed in <span style="color:green;">green</span> when an NID match has been made.'+
								'<li>Time: Displays the current time in UTC +/- timezone.</li><li>AGC and signal bars: Displays the AGC signal level.</li>'+
								'<li>Satellite: This is to edit, view or change the saved satellite settings.</li>'+
									'<li>Antenna: This is to view or change the GPS, Heading, Trims settings or to manually control the antenna.</li>'+
									'<li>Panel Settings: This to change the Lockout time, screen brigtness etc.</li>'+
									'<li>System Information: This is to view the system information and software.</li></ul>'
								+'The Home button <img src="img/Home.png" >will take you back to this screen.<br>The forward <img src="img/fwd.png" >and back <img src="img/back.png" >arrows allow you to navigate though the different screens.<br>The padlock <img src="img/Unlock.png" >allows you to lock the screen.<br>When the buttons are greyed out they are inactive.');}
	else if ($("#scn_lock").is(':visible')){$(".OM").css('color','black');$("#screen-info-text").html('This is the lock screen.<br><br>'+
								'This screen will appear after the Lock time out has been reached. To unlock the screen just click on the locked padlock icon, then slide the slider all the way to the right, this will take the user back to the home screen' );}
	else if ($("#scn_satellite").is(':visible')){$("#OM1").css('color','white');fl_ch = '.OPsat';$("#screen-info-text").html('From this page you can select Target, Edit or View for one of the 1 to 8 saved satellites.'
								+'<ul><li>Target: Select one of the 1 to 8 saved satellites to be used for tracking.</li>'
								+'<li>Edit: Select one of the 1 to 8 saved satellites to edit there settings</li>'
								+'<li>View: Select one of the 1 to 8 saved satellites to view there settings only</li></ul>The Currect Settings allows you to view/edit the current settings being used for tracking.');}
	else if ((edit == 1)&&($("#scn_satellite_target").is(':visible'))){fl_ch = '#OP1a, #OP2a';$("#screen-info-text").html('To target a satellite click on one of the satellites. <br>If the satellite can not viewed then the message <span style="color:violet;">Satellite Name Out of Range</span> will be displayed .<br>If the satellite is viewable then the message <span style="color:blue;">Satellite Name Set as Target</span> will be displayed.<br>To edit the settings go back to the satellite edit menu using the back arrow.');}
	else if ((edit == 1)&&($("#scn_satellite_targeta").is(':visible'))){fl_ch = '#OP1a, #OP2a, #OP2b';$("#screen-info-text").html('To target a satellite click on one of the satellites. To edit the settings go back to the satellite edit menu using the back arrow. <br>Only satellites 1 to 4 can be targeted, viewed or edited in the simulator.');}
	else if ((edit == 2)&&($("#scn_satellite_target").is(':visible'))){fl_ch = '#OP1b, #OP1c';$("#screen-info-text").html('Select one of the satellites to edit.');}
	else if ((edit == 2)&&($("#scn_satellite_targeta").is(':visible'))){fl_ch = '#OP1b, #OP1c, #OP2c';$("#screen-info-text").html('Select one of the satellites to edit.<br>Only satellites 1 to 4 can be targeted, viewed or edited in the simulator.');}
	else if ((edit == 2)&&($("#scn_sat_"+preset).is(':visible'))){fl_ch = '#OP1b, #OP1c, #OP1d';info_text();}
	else if ((edit == 2)&&($("#scn_sat_"+preset+"a").is(':visible'))){fl_ch = '#OP1b, #OP1c, #OP1d,#OP2d';info_text();}
	else if ((edit == 3)&&($("#scn_sat_"+preset).is(':visible'))){fl_ch = '#OP1h, #OP1i';info_text();}
	else if ((edit == 3)&&($("#scn_sat_"+preset+"a").is(':visible'))){fl_ch = '#OP1h, #OP1i, #OP2g';info_text();}
	else if ($("#scn_satellite_target").is(':visible')){fl_ch = '#OP1e, #OP1f';$("#screen-info-text").html('Select one of the satellites to view the settings. To edit the settings go back to the satellite edit menu using the back arrow');}
	else if ($("#scn_satellite_targeta").is(':visible')){fl_ch = '#OP1e, #OP1f, #OP2e';$("#screen-info-text").html('Select one of the satellites to view the settings. To edit the settings go back to the satellite edit menu using the back arrow. <br>Only satellites 1 to 4 can be targeted, viewed or edited in the simulator.');}
	else if ($("#scn_sat_"+preset).is(':visible')){fl_ch = '#OP1e, #OP1f, #OP1g';info_text();}
	else if ($("#scn_sat_"+preset+"a").is(':visible')){fl_ch = '#OP1e, #OP1f, #OP1g,#OP2f';info_text();}
	
	else if ($("#scn_antenna").is(':visible')){$("#OM2").css('color','white');fl_ch = '.OPant';$("#screen-info-text").html('This is the antenna screen'
									+'<ul><li>Advanced Options are: <ul><li>GPS status</li><li> Manual control</li><li>System Test</li><li>Setup Wizard</li><li>Factory Restore.</li></ul></li>'
									+'<li>Position: Allows the user to select the GPS source.</li><li>Heading: Allows the user to select the heading source.</li><li>Trims: allows the system to be trimed.</li>');}
	else if ($("#scn_advanced_options, #scn_advanced_optionsa").is(':visible')){fl_ch = '.OPadvan';$("#screen-info-text").html('Advanced Options<ul><li>GPS status: The user can view the current GPS, time and date info</li><li> Manual control: allows the user to manually control the antenna.</li><li>System Test: Allows the user to perform built in tests.</li><li>Setup Wizard: Step by step guide to setting up the system.</li><li>Factory Restore: Resets the system back to factory default.</li></ul>');}
	else if ($("#scn_gps_status").is(':visible')){fl_ch = '#OP3a, #OP4a, #OP5b';$("#screen-info-text").html('Display the current UTC time and date, curret lat and lon.');}
	else if ($("#scn_manual_control").is(':visible')){fl_ch = '#OP3a, #OP4b, #OP5c';$("#screen-info-text").html('<ul><li>POL CCW & CW: Allows the user to drive the polarization.</li></li>EL Arrows: Allows the user to drive the antenna up and down in elevation.</li><li>AZ arrows: Allows the user to drive the antenna CCW (down) & CW (up) in azimuth.</li><li>Dishscan Button: <ul><li>When the button is <span style="color:green;">green</span> tracking is enabled.</li><li>When the button is <span style="color:red;">red</span> tracking is turned off.</li></ul></li><li>Search Button:<ul><li>When the button is <span style="color:green;">green</span> the system will be in searching mode.</li><li>When the button is <span style="color:red;">red</span> searching is disabled.</li></ul></li><li>Hold Button: This will pause the search function.</li>');}
	else if ($("#scn_system_test").is(':visible')){fl_ch = '#OP3a, #OP4c, #OP5d';$("#screen-info-text").html('System Tests<ul><li>Power ON Self Test</li><li>In Service Test</li><li>Out of Service Test</li></ul>The tests can be preformed on the PCU or GACP (Panel), once the test has been done the GACP will display the results as a <span style="color:green;">PASS</span> or <span style="color:red;">FAIL</span>.');}
	//see set up wizard for wizard text...
	else if ($("#scn_factory_reset").is(':visible')){fl_ch = '#OP3a, #OP4e, #OP5f';$("#screen-info-text").html('The Factory Reset will default the system back to factory defalt settings and erase any saved satellites.');}
	else if ($("#scn_position").is(':visible')){fl_ch ='#OP3b, #OP3c';$("#screen-info-text").html('GPS Selection<br>Note: baudrate is fixed to 4800<ul><li>Internal: Uses the built in GPS on the antenna</li>'
									+'<li>External: Allows a NMEA GPS to be connected to the GACP.<br>RS232<img style="width:255px;height:94px;vertical-align: text-top;"src="img/RS232.png"><br>RS422<img style="width:255px;height:94px;vertical-align: text-top;"src="img/RS422.png" ></li><li>Manual: Allows the user to enter in a fixed GPS position.</li></ul>');}
	else if ($("#scn_heading").is(':visible')){fl_ch ='#OP3d, #OP3e';$("#screen-info-text").html('Heading Selection<br>Note: baudrate is fixed to 4800<ul><li>None: Puts the system in to no gyro mode, search pattern will be skyscan</li>'
									+'<li>NMEA: Allows a NMEA gyro to be connected to the GACP.<br>RS232<img style="width:255px;height:94px;vertical-align: text-top;"src="img/RS232.png"><br>RS422<img style="width:255px;height:94px;vertical-align: text-top;"src="img/RS422.png" ></li><li>Fixed: Allows the user to enter in a fixed heading.</li></ul>');}
	else if ($("#scn_trims").is(':visible')){fl_ch ='#OP3f, #OP3g';$("#screen-info-text").html('Trims<br>This is typlically used when a NMEA gyro is connected, the trims can be entered in manually or by using the auto trim button.');}
	else if ($("#scn_panel_settings").is(':visible')){fl_ch ='#OP5a';$("#screen-info-text").html('This screen allows you to change the panel settings.<ul><li>Lock Timeout: This changes how long it takes for the screen to lock.</li><li>Blank Timeout: This changes how it takes for the screen to go blank.</li><li>Brightness: Changes the screen brightness.</li><li>Timezone: Changing the time zone will change the displayed clock time.</li></ul>');if (wizard == 1){$("#OM3").css('color','black');}else{$("#OM3").css('color','white');};}
	else if ($("#scn_sys_info").is(':visible')){fl_ch ='#OP6a';$("#OM4").css('color','white');$("#screen-info-text").html("This screen displays the software versions loaded in to the system.<br>The STxx software is the PCU software.<ul><li>1.xx, the PCU will have a DVB-S tuner card fitted.</li><li>2.xx, the PCU will have a DVB-S2 tuner card fitted.</li></ul>Note: the software is not compatible between the DVB-S and DVB-S2 PCU's.<p> The forward arrow will display the Dealer contact info.</p>");}
	else if ($("#scn_sys_info_a").is(':visible')&&(wizard ==0)){fl_ch ='#OP6a, #OP6b';$("#screen-info-text").html("The Dealer contact info can be eddited via the Setup Wizard. Click the Home or Back button, Click the Antenna button then Click Advanced Options.");};
	
	function info_text(){
		if ($("#scn_sat_"+preset).is(':visible')){$("#screen-info-text").html('Click on the text to edit the setting when using the edit or current settings menu.<ul><li>Name: This is the presets displayed name.</li><li>Longitude: This is the satellite longtiude position.</li><li>E/W: This is the satellites east/west position</li><li>Sat Skew: Should be left as 0 unless the satellite has a known skew.</li><li>22KHz Tone: This is only used for a LNB that requies a tone to switch bands for tracking (not used for the european quad LNB).</li><li>Traacking Polarity: This is used to change the voltage to the LNB (not used for the european quad LNB).</li><li>Tuning Parameters: click on this to display the tracking settings.</li></ul>')}
		else{$("#screen-info-text").html('Click on the text to edit the setting when using the edit or current settings menu.<ul><li>Frequency: Sets the tracking frequency, must be between 950 and 2150MHz.</li><li>Baud Rate: Sets the baudrate.</li><li>FEC: changes the FEC setting.</li><li>NID: Set the NID value, this can be set as HEX or DEC.</li><li>Threshold: Sets the auto threshold value.</li><ul>')}
	}
;}
function manual(){
	$('.az').html(("000"+(az).toFixed(1)).slice(-5));
	$('.el').html(("00"+(el).toFixed(1)).slice(-4));
	$('.pol').html(("00"+pol).slice(-3));
	var canvas = document.getElementById('scn_lock_el');
	var ctx = canvas.getContext('2d');
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, 200, 200);
	ctx.fillStyle = 'white';
	ctx.translate(30, 140);
	ctx.strokeStyle = '#199FFF';
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.moveTo(0,-120);
	ctx.arcTo(120,-120,120,0,120);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = '#199FFF';
	ctx.rotate((90-el)*Math.PI / 180);
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -100);
	ctx.moveTo(-30,-15);
	ctx.quadraticCurveTo(0,10,30,-15)
	ctx.stroke();
}
info_text();
manual();
load_preset();
load_save_as();
	
var tmr_test = 0;
var tmr_count_dwn = 0;
//flow chart
function flowchart(){$("#screen-flowchart .A div, #screen-flowchart .B div").css({"background-color":"#53870A","border":"2px solid white"});
	$("#screen-flowchart .B .blank").css({"border":"none","background-color":"transparent"});
	$(fl_ch).css({"background-color":"#80D110","border":"2px solid #00A4F2"});
	}
	
	
$(document).ready(function(){
	$(document).on('click',function (e) {info_text();flowchart();});
	$('#flowchart').click(function(){
		if ($("#setup").is(':visible')||$("#remote-screen").is(':visible')){$("#flowchart-setup").show();$("#flowchart-operation").hide();}
		else {$("#flowchart-operation").show();$("#flowchart-setup").hide();}
		$("#screen-flowchart").toggle(800, function(){
		if ($("#screen-flowchart").is(':visible')){$('#flowchart span').css({"top":"5px","border-left": "8px solid transparent","border-right": "8px solid transparent","border-top": "8px solid #00A4F2"});}
		else{$('#flowchart span').css({"top":"0px","border-top":"8px solid transparent","border-bottom": "8px solid transparent","border-left": "8px solid #00A4F2"});}
	});}
	);
// lock
	$("#unlock").click(function(){
		$(".hide").hide();$("#scn_home, #status").hide();
		$("#scn_lock").show();
	});
	$("#lock").click(function(){
		$("#scn_lock_slider").show();$("#myRange").val(0);
		$("#scn_lock").hide();
	});
	$("#myRange").change(function(e) {
		var num = $("#myRange").val();
		$("#demo").html(num);
		if (num == 100){$("#status").show();$("#scn_home").show();
			$("#scn_lock_slider").hide();info_text();}
	});
//home screen....
	$('#satellites').click(function(){
		$("#scn_home").hide();
		$("#scn_satellite").show();
		buttons();
		
		
	});
	$('#antenna').click(function(){
		$("#scn_home").hide();
		$("#scn_antenna").show();
		buttons();
		
	});
	$('#panel_set').click(function(){
		$("#scn_home").hide();
		$("#scn_panel_settings").show();
		buttons();
	});
	$('#info').click(function(){
		system_info = 1;
		enter = 1;
		fncsys_info[enter]();
		$("#scn_home").hide();
		$('#info_text').text("Dealer Contact information:");
	});
//satellite screen....
	$('#sat_target').click(function(){
		$("#scn_satellite").hide();
		$("#scn_satellite_target").show();
		$(".sat_text").html("Select Satellite to TARGET");
		buttons();
		edit = 1;
		
	});
	$('#sat_edit').click(function(){
		$("#scn_satellite").hide();
		$("#scn_satellite_target").show();
		$(".sat_text").html("Select Satellite to EDIT");
		$(".preset_text").text("EDIT:");
		edit = 2;
		buttons();
	});
		$('.sat1').click(function(){
				preset = 1;
				load_preset();
				$('.preset_num').text("Preset 1");
			if (edit == 1){target();target_sat = 1;}
			else{$("#scn_satellite_target").hide();
				$("#scn_sat_1").show();
				
				buttons();}

		});
		$('.sat2').click(function(){
			preset = 2;
				load_preset();
				$('.preset_num').text("Preset 2");
			if (edit == 1){target();target_sat = 2;}
			else{$("#scn_satellite_target").hide();
				$("#scn_sat_2").show();
				
				buttons();};
		});
		$('.sat3').click(function(){
				preset = 3;
				load_preset();
				$('.preset_num').text("Preset 3");
			if (edit == 1){target();target_sat = 3;}
			else{$("#scn_satellite_target").hide();
				$("#scn_sat_3").show();
				
				buttons();}

		});
		$('.sat4').click(function(){
			preset = 4;
				load_preset();
				$('.preset_num').text("Preset 4");
			if (edit == 1){target();target_sat = 4;}
			else{$("#scn_satellite_target").hide();
				$("#scn_sat_4").show();
				
				buttons();};
		});
	$('#sat_view').click(function(){
		$("#scn_satellite").hide();
		$("#scn_satellite_target").show();
		$(".sat_text").html("Select Satellite to View");
		$(".preset_text").text("VIEW:");
		edit = 0;
		buttons();
	});
	$('#sat_current').click(function(){
		preset = target_sat;
		load_preset();
		$(".preset_text").text("EDIT:");
		$('.preset_num').text("Edit Current Settings");
		$("#scn_satellite").hide();
		$("#scn_sat_"+target_sat).show();
		edit = 3;
		buttons();
	});
		$('#save_as_1').click(function(){
			preset = 1;save_as_preset();
		});
		$('#save_as_2').click(function(){
			preset = 2;save_as_preset();
		});
		$('#save_as_3').click(function(){
			preset = 3;save_as_preset();
		});
		$('#save_as_4').click(function(){
			preset = 4;save_as_preset();
		});
		
		function save_as_preset(){$('#scn_save_as').hide();$("#scn_keypad").show();$('.hdginput:visible').html($('#scn_sat_'+preset+' .name_a').text());hdginput = $('#scn_sat_'+preset+' .name_a').text();}
//antenna screen....
	
	$('#advanced_options').click(function(){
		$("#scn_antenna").hide();
		$("#scn_advanced_options").show();
		buttons();
	});
		$('#gps_status').click(function(){
			$("#scn_advanced_options").hide();
			$("#scn_gps_status").show();
			buttons();
		});
		$('#manual_cont').click(function(){
			$("#scn_advanced_options").hide();
			$("#scn_manual_control").show();
			buttons();
			manual();
		});
		$('#system_test').click(function(){
			$("#scn_advanced_options").hide();
			$("#scn_system_test").show();
			buttons();
		});
		$('#setup_wiz').click(function(){
			$("#scn_advanced_options").hide();
			$("#scn_setup_wizard").show();
			enter = 1;
			fnc_wizard[enter]();
			wizard = 1;
			buttons();
		});
			
		$('#factory_reset').click(function(){
			$("#scn_advanced_optionsa").hide();
			$("#scn_factory_reset").show();
			buttons();
		});
	$('#position').click(function(){
		$("#scn_antenna").hide();
		$("#scn_position").show();
		buttons();
	});
	$('#heading').click(function(){
		$("#scn_antenna").hide();
		$("#scn_heading").show();

		buttons();
	
	});
	$('#trims').click(function(){
		$("#scn_antenna").hide();
		$("#scn_trims").show();

		buttons();
	
	});
// system tests.....
	$('#test_a').click(function(){$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#scn_system_test_results').html('<div class="button2">Elevation Motor & Encoder: <span>Pass</span></div><div>Pol. Angle Motor & Encoder: <span>Pass</span></div><div>Azimuth Motor: <span>Pass</span></div><div>Tilt Sensor: <span>Pass</span></div>');
		$('#scn_system_test_results_a').html('<div>Rate Sensor: <span>Pass</span></div><div>GPS: <span>Pass</span></div><div>Tracking Receiver: <span>Pass</span></div><div>NID Capture Chip: <span>Pass</span></div>');
		buttons();});
	$('#test_b, #test_d').click(function(){$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#scn_system_test_results').html('<div class="button1">Processor:<span>Pass</span></div><div>Touch Screen:<span>Pass</span></div><div>Modem Board:<span>Pass</span></div><div>PCU:<span>Pass</span></div>');buttons();});

	
	$('#test_c').click(function(){ 
		var tmr_flash_test = setInterval(flash_test ,500);
		$('#scn_system_test_results').html('<div id="pre_test" >Preforming In Service Test...</div>');
		$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#status').hide();
		
		function flash_test(){
			if (tmr_test >= 6){clearInterval(tmr_flash_test);tmr_test = 0;$('#status').show();$("#pre_test").show();$('#scn_system_test_results').html('<div class="button1">Tilt Sensor:<span>Pass</span></div><div>Rate Sensor:<span>Pass</span></div><div>GPS:<span>Pass</span></div><div>Tracking Receiver:<span>Pass</span></div><div>NID Capture Chip:<span>Pass</span></div>');buttons();}
			else {tmr_test ++;
				if ($('#pre_test').is(':visible')){$('#pre_test').hide();}
				else {$('#pre_test').show();}
			}	
		}
	;});
	
	$('#test_e').click(function(){$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#scn_system_test_results').html('<div id="pre_test">Are you sure??<br>This will take you to OFF Satellite<br><img id="save" src="img/save.png"><img id="cancel"src="img/Cancel.png"></div>');buttons();

	});
	$("#scn_system_test_results").on('click','#save',function (e){
		var tmr_flash_test = setInterval(flash_test ,500);
		$('#scn_system_test_results').html('<div id="pre_test" >Preforming Out of Service Test...</div>');
		$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#status').hide();
		function flash_test(){
			if (tmr_test >= 6){clearInterval(tmr_flash_test);tmr_test = 0;$('#status').show();$("#pre_test").show();$('#scn_system_test_results').html('<div class="button2">Elevation Motor & Encoder: <span>Pass</span></div><div>Pol. Angle Motor & Encoder: <span>Pass</span></div><div>Azimuth Motor: <span>Pass</span></div><div>Tilt Sensor: <span>Pass</span></div>');
		$('#scn_system_test_results_a').html('<div>Rate Sensor: <span>Pass</span></div><div>GPS: <span>Pass</span></div><div>Tracking Receiver: <span>Pass</span></div><div>NID Capture Chip: <span>Pass</span></div>');
		buttons();}
			else {tmr_test ++;
				if ($('#pre_test').is(':visible')){$('#pre_test').hide();}
				else {$('#pre_test').show();}
			}
		};
	});
	$("#scn_system_test_results").on('click','#cancel',function (e){$('#scn_system_test').show();$('#scn_system_test_results').hide();});
	$('#test_f').click(function(){$('#scn_system_test').hide();$('#scn_system_test_results').show();$('#scn_system_test_results').html('<div class="button1">Processor:<span>Pass</span></div><div>Touch Screen:<span>Pass</span></div>');buttons();});
// system tests end....		
//Wizard....
	$('#feed_auto').click(function(){
		if ($(this).is(':checked')){$('#feed_manual').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#feed_manual').click(function(){
		if ($(this).is(':checked')){$('#feed_auto').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_active').click(function(){
		if ($(this).is(':checked')){$('#diseqc_inactive').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_inactive').click(function(){
		if ($(this).is(':checked')){$('#diseqc_active').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_manual').click(function(){
		if ($(this).is(':checked')){$('#diseqc_2_sat, #diseqc_3_sat, #diseqc_4_sat').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_2_sat').click(function(){
		if ($(this).is(':checked')){$('#diseqc_manual, #diseqc_3_sat, #diseqc_4_sat').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_3_sat').click(function(){
		if ($(this).is(':checked')){$('#diseqc_manual, #diseqc_2_sat, #diseqc_4_sat').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#diseqc_4_sat').click(function(){
		if ($(this).is(':checked')){$('#diseqc_manual, #diseqc_2_sat, #diseqc_3_sat').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#up_btn').click(function(){C++; 
				if (C<=0){C=SatRecord_DBsat.length-1}						
				else if (C>SatRecord_DBsat.length-1){C=0;}
				else {C=C;}
				$('.hdginput:visible').html(SatRecord_DBsat[C][0]);
			});
	$('#dwn_btn').click(function(){C--; 
		if (C<=0){C=SatRecord_DBsat.length-1}
		else if (C>SatRecord_DBsat.length-1){C=0;}
		else {C=C;}
		$('.hdginput:visible').html(SatRecord_DBsat[C][0]);
	});
	$('.save_btn').click(function(){
		$('#scn_sat_'+D+' .name_a').html(SatRecord_DBsat[C][0]);//name
		a = (SatRecord_DBsat[C][4]);//sat pos and E/W
		if (a > 0x8000){a= a-0x8000;$('#scn_sat_'+D+' .lon_a').html(a/10);$('#scn_sat_'+D+' .ew_a').text("WEST");}
		else {$('#scn_sat_'+D+' .lon_a').html(a/10);$('#scn_sat_'+D+' .ew_a').text("EAST");}
		$('#scn_sat_'+D+' .skew_a').html(SatRecord_DBsat[C][5]);//skew
		a = (SatRecord_DBsat[C][2]);//volt
		if (a == "TRUE"){$('#scn_sat_'+D+' .Tpol_a').html("Horz/LHCP(18V)");}
		else {$('#scn_sat_'+D+' .Tpol_a').html("Vert/RHCP(13V)");}
		a = (SatRecord_DBsat[C][3]);//tone
		if (a == "TRUE"){$('#scn_sat_'+D+' .tone_a').html("ON");}
		else {$('#scn_sat_'+D+' .tone_a').html("OFF");}

		$('#scn_sat_'+D+'a .freq_a').html(SatRecord_DBsat[C][21]);//freq
		$('#scn_sat_'+D+'a .Brate_a').html(SatRecord_DBsat[C][22]);//baud rate
		$('#scn_sat_'+D+'a .nid_a').html((SatRecord_DBsat[C][23]).toString(16).toUpperCase());$('#scn_sat_'+D+'a .nidb_a').html(SatRecord_DBsat[C][23]);//HEX NID, DEC NID
		a = (SatRecord_DBsat[C][24]);//FEC
		if (a == "AUTO"){$('#scn_sat_'+D+'a .fec_a').html(a);}
		else if (a.substr(0,1)== "S"){$('#scn_sat_'+D+'a .fec_a').html(a.substr(2,1)+"/"+a.substr(3,1)+"*");}
		else{$('#scn_sat_'+D+'a .fec_a').html(a.substr(2,1)+"/"+a.substr(3,1));}
		$('#scn_sat_'+D+'a .thrsh_a').html(SatRecord_DBsat[C][25]);//auto threshold
		$('#current_sat').html($('#scn_sat_'+D+' .name_a').text());
		$('.sat'+D+' .name_a').text($('#scn_sat_'+D+' .name_a').text());
	});
	var tmr = 6;
	$('#scn_setup_wizard').click(function(){
		if ($('#2').is(':visible')){$('#scn_cal').show();$('#2').hide();$('#2a').show();$('#cal_1').show();$('.x').remove();tmr = 6;}
		
		var tmr_count_dwn = setInterval(count_dwn ,1000);
		function count_dwn(){if (tmr == 0){clearInterval(tmr_count_dwn);$('#scn_cala').hide();$('#scn_cal').hide();}
			else{tmr--;$('.count_dwn').text(tmr);}
		};
	});
	$('#scn_cala').click(function () {tmr =6;
    var x = event.clientX;
    var y = event.clientY;
	var newspan = $("<span class='x'>+</span>");
	newspan.css({"font-size":"20px","position":"absolute","top": (y-108)+"px","left": (x-83)+"px"});
   
	$('#scn_cala').append(newspan);
	})
	
	$('#cal_1').click(function(){tmr =6;$(this).hide();$('#cal_2').show();});
	$('#cal_2').click(function(){tmr =6;$(this).hide();$('#cal_3').show();});
	$('#cal_3').click(function(){tmr =6;$(this).hide();$('#scn_cal').hide();$('#scn_cala').show();$('#cal_1a').show();});
	$('#cal_1a').click(function(){tmr =6;$(this).hide();$('#cal_2a').show();});
	$('#cal_2a').click(function(){tmr =6;$(this).hide();$('#cal_3a').show();});
	$('#cal_3a').click(function(){tmr =6;$(this).hide();$('#cal_4a').show();});
	$('#cal_4a').click(function(){tmr =6;$(this).hide();$('#scn_cala').hide();$('#scn_calb').show();$('#scn_calb').delay(2000).hide(0);});
	function wizard_0(){$("#scn_setup_wizard ").hide();wizard = 0;$('#scn_setup_wizard #12').hide();$('#home').click();}
	function wizard_1(){$('#scn_setup_wizard #1').show();$('#scn_setup_wizard #2').hide();$('#2a').hide();fl_ch = '#OP3a, #OP4d, #OP5e';$("#screen-info-text").html('The setup Wizard will take the user step by step though setting up the system.');}
	function wizard_2(){$('#scn_setup_wizard #2').show();$('#2a').hide();$('#scn_setup_wizard #1').hide();$('#scn_setup_wizard #3').hide();$("#screen-info-text").html('This screen allows the user to calibrate the screen.');}
	function wizard_3(){$('#scn_setup_wizard #3').show();$('#scn_setup_wizard #2').hide();$('#2a').hide();$('#scn_setup_wizard #4').hide();$("#screen-info-text").html('Select between Auto feed which has a pol motor or a manual feed without a pol motor.');}
	function wizard_4(){$('#scn_setup_wizard #4').show();$('#scn_setup_wizard #3').hide();$('#scn_setup_wizard #4a').hide();$('#scn_setup_wizard #5').hide();$("#screen-info-text").html('For normal operatrion this would be set to Inactive.<br>Active is used with a Dish Network stacked output LNB, Dish Pro satellite receivers and DiSEqC (Digital Satellite Equipment Control) Switch. This enables the antenna to switch satellites from the DiSEqC commands from the master satellite receiver.');}
	function wizard_4a(){$('#scn_setup_wizard #4a').show();$('#scn_setup_wizard #4').hide();$('#scn_setup_wizard #5').hide();$("#screen-info-text").html('When being used with Dish Network DiSEqC set up, the number of satellites to be targeted are selcted on this screen. This will depend on the TV subscription.<br>When the user changes channels on the master satellite receiver the GACP will chnage satellites depending on the DiSEqC commands sent from the master satellite receiver via the DiSEqC switch.');}
	function wizard_5(){$('#scn_setup_wizard #5').show();$('#scn_setup_wizard #4').hide();$('#scn_setup_wizard #4a').hide();$('#scn_setup_wizard #6').hide();$('#logo, #home, #unlock').css('visibility','visible');$("#screen-info-text").html('');}
	function wizard_6(){$('#scn_setup_wizard #6').show();$('#scn_setup_wizard #5').hide();$('#scn_setup_wizard #7').hide();C=0;D=1;$('.hdginput:visible').html(SatRecord_DBsat[C][0]);$('#sel_sat').text(1);$('#current_sat').html($('#scn_sat_1 .name_a').text());$('#logo, #home, #unlock').css('visibility','hidden');$("#screen-info-text").html('Select from the list of preset satellites to save to Satellite 1, once the satellite has been selected and saved the settings will be loaded in to satellite 1.<br>Press the right arrow to skip this step if satellite 1 is not be changed.'); }
	function wizard_7(){C=0;D=2;$('.hdginput:visible').html(SatRecord_DBsat[C][0]);$('#sel_sat').text(2);$('#current_sat').html($('#scn_sat_2 .name_a').text());$("#screen-info-text").html('Select from the list of preset satellites to save to Satellite 2, once the satellite has been selected and saved the settings will be loaded in to satellite 2.<br>Press the right arrow to skip this step if satellite 2 is not be changed.');}
	function wizard_8(){C=0;D=3;$('.hdginput:visible').html(SatRecord_DBsat[C][0]);$('#sel_sat').text(3);$('#current_sat').html($('#scn_sat_3 .name_a').text());$("#screen-info-text").html('Select from the list of preset satellites to save to Satellite 3, once the satellite has been selected and saved the settings will be loaded in to satellite 3.<br>Press the right arrow to skip this step if satellite 3 is not be changed.');}
	function wizard_9(){C=0;D=4;$('.hdginput:visible').html(SatRecord_DBsat[C][0]);$('#sel_sat').text(4);$('#current_sat').html($('#scn_sat_4 .name_a').text());$('#scn_setup_wizard #6').show();$('#scn_sys_info_a').hide();$('#logo, #home, #unlock').css('visibility','hidden');$("#screen-info-text").html('Select from the list of preset satellites to save to Satellite 4, once the satellite has been selected and saved the settings will be loaded in to satellite 4.<br>Press the right arrow to skip this step if satellite 4 is not be changed.<br>In the ST24 the next pages will be for satellites 5 to 8.');}
	function wizard_10(){$('#scn_sys_info_a').show();$('#scn_setup_wizard #6').hide();$('#scn_panel_settings').hide();$('#info_text').text("Select the line to edit dealer contact info:");$('#logo, #home, #unlock').css('visibility','visible');$("#screen-info-text").html("Click on each line to edit the information.");}
	function wizard_11(){$('#scn_panel_settings').show();$('#scn_sys_info_a').hide();$('#scn_setup_wizard #12').hide();}
	function wizard_12(){$('#scn_setup_wizard #12').show();$('#scn_panel_settings').hide();}
	var fnc_wizard = [wizard_0,wizard_1,wizard_2,wizard_3,wizard_4,wizard_4a,wizard_5,wizard_6,wizard_7,wizard_8,wizard_9,wizard_10,wizard_11,wizard_12];
//Wizard end .....	
//Dealer info....
	$('#line1').click(function(){
		if (wizard == 1){$('#scn_keypad').show();hdginput = $('#line1').text();$('.hdginput:visible').html(hdginput);$('#keypad_id').text("Line1");C = 1;keypad_large();}
	});
	$('#line2').click(function(){
		if (wizard == 1){$('#scn_keypad').show();hdginput = $('#line2').text();$('.hdginput:visible').html(hdginput);$('#keypad_id').text("Line2"); C = 2;keypad_large();}
	});
	$('#line3').click(function(){
		if (wizard == 1){$('#scn_keypad').show();hdginput = $('#line3').text();$('.hdginput:visible').html(hdginput);$('#keypad_id').text("Line3");C= 3;keypad_large();}
	});
	$('#line4').click(function(){
		if (wizard == 1){$('#scn_keypad').show();hdginput = $('#line4').text();$('.hdginput:visible').html(hdginput);$('#keypad_id').text("Line4");C = 4;keypad_large();}
	});
//Panel settings...
//time zone settings
function Tout_0(){tz="+";tzh=13;tzm=0};
function Tout_1(){tzh=12;};
function Tout_2(){tzh=11;};
function Tout_3(){tzh=10;tzm=0;};
function Tout_4(){tzh=9;tzm=30;};
function Tout_5(){tzh=9;tzm=0;};
function Tout_6(){tzh=8;};
function Tout_7(){tzh=7;};
function Tout_8(){tzh=6;tzm=0};
function Tout_9(){tzh=5;tzm=45;};
function Tout_10(){tzm=30;};
function Tout_11(){tzh=5;tzm=0;};
function Tout_12(){tzh=4;tzm=30;};
function Tout_13(){tzh=4;tzm=0;};
function Tout_14(){tzh=3;tzm=30;};
function Tout_15(){tzh=3;tzm=0;};
function Tout_16(){tzh=2;};
function Tout_17(){tzh=1;};
function Tout_18(){tz="+";tzh=0;};
function Tout_19(){tz="-";tzh=1;};
function Tout_20(){tzh=2;};
function Tout_21(){tzh=3;tzm=0;};
function Tout_22(){tzh=3;tzm=30;};
function Tout_23(){tzh=4;tzm=0;};
function Tout_24(){tzh=4;tzm=30;};
function Tout_25(){tzh=5;tzm=0;};
function Tout_26(){tzh=6;};
function Tout_27(){tzh=7;};
function Tout_28(){tzh=8;};
function Tout_29(){tzh=9;};
function Tout_30(){tzh=10;};
function Tout_31(){tzh=11;};
function Tout_32(){tzh=12;};
var fnc_Tout = [Tout_0,Tout_1,Tout_2,Tout_3,Tout_4,Tout_5,Tout_6,Tout_7,Tout_8,Tout_9,Tout_10,Tout_11,Tout_12,Tout_13,Tout_14,Tout_15,Tout_16,Tout_17,Tout_18,Tout_19,Tout_20,Tout_21,Tout_22,Tout_23,Tout_24,Tout_25,Tout_26,Tout_27,Tout_28,Tout_29,Tout_30,Tout_31,Tout_32]

	$('#lock_Tout').click(function(){
		$("#scn_keypad_small").show();$(".n").hide();$("#keypad_small_name").html("Lock Timeout:");hdginput = $('#lock_Tout .settings').text();$('.hdginput:visible').html(hdginput);C = this.id;
	});
	$('#blank_Tout').click(function(){
		$("#scn_keypad_small").show();$(".n").hide();$("#keypad_small_name").html("Blank Timeout:");hdginput = $('#lock_Tout .settings').text();$('.hdginput:visible').html(hdginput);C = this.id;
	});
	$('#timezone_sel').click(function(){
		$('#timezone_adjust').show();enter = timezone;
		fnc_Tout[enter]();
		$('.hdginput:visible').html(tz+("0"+tzh).slice(-2)+':'+("0"+tzm).slice(-2));
		hdginput = $('.hdginput:visible').text();
	});
	$('#button_up').click(function(){
		if (enter == 0){enter = 0;}else{enter--;fnc_Tout[enter]();}
		$('.hdginput:visible').html(tz+("0"+tzh).slice(-2)+':'+("0"+tzm).slice(-2));
	hdginput = $('.hdginput:visible').text();
	});
		
	$('#button_dwn').click(function(){
		if (enter == (fnc_Tout.length -1)){fnc_Tout[enter]();}
		else {enter++;fnc_Tout[enter]();}
		$('.hdginput:visible').html(tz+("0"+tzh).slice(-2)+':'+("0"+tzm).slice(-2));
	hdginput = $('.hdginput:visible').text();
	});
	
	
	
// sat edit....
	$('.name').click(function(){
		if (edit ==2){$("#scn_keypad").show();$('.hdginput:visible').html(name);hdginput = name;$('#keypad_id').text("Name:");}
	});
	//Allowed range 0 to 180//
	$('.lon').click(function(){
		if (edit >= 2){$("#scn_keypad_small").show();$('.hdginput:visible').html(lon);hdginput = lon;$("#keypad_small_name").html("Orbital Position:");edit_code = "lon";}
	});
	$('.ew').click(function(){
		if (edit >=2){
			if ($('.ew_a:visible').html() == "EAST"){$('.ew_a:visible').html("WEST");}
			else{$('.ew_a:visible').html("EAST");}
		;}
	});
	$('.tone').click(function(){
		if (edit >=2){
			if ($('.tone_a:visible').html() == "ON"){$('.tone_a:visible').html("OFF");}
			else{$('.tone_a:visible').html("ON");}
		;}
	});
	//sat skew -45 to 45//
	$('.skew').click(function(){
		if (edit >=2){$("#scn_keypad_small").show();$(".n").hide();$(".ndash").show();$('.hdginput:visible').html(skew);hdginput = skew;$("#keypad_small_name").html("Sat Skew:");edit_code = "skew";}
	});
	$('.Tpol').click(function(){
		if (edit >=2){
			if ($('.Tpol_a:visible').html() == "Horz/LHCP(18V)"){$('.Tpol_a:visible').html("Vert/RHCP(13V)");}
			else{$('.Tpol_a:visible').html("Horz/LHCP(18V)");}
		;}
	});
	// 0 to 9999//
	$('.freq').click(function(){
		if (edit >=2){$("#scn_keypad_small").show();$(".n").hide();$("#keypad_small_name").html("Frequency:");edit_code = "freq";load_settings();}
	});
	//0 to 50000//
	$('.Brate').click(function(){
		if (edit >=2){$("#scn_keypad_small").show();$(".n").hide();$('.hdginput:visible').html(Brate);hdginput = Brate;$("#keypad_small_name").html("Baudrate:");edit_code = "Brate";}
	});
	$('.fec').click(function(){
		if (edit >=2){$("#scn_fec").show();edit_code = "fec";$('.hdginput:visible').html(fec);hdginput = fec;}
	});
		$('#dvb').click(function(){if ($('.dvb').text()== "DVB-S2"){$('.dvb').text("DVB-S")}
			else {$('.dvb').text("DVB-S2")}
		});
		$('#fec').click(function(){if ($('.dvb').text()!= "DVB-S"){$('#dvb-s').toggle();$('#dvb-s2').hide();hdginput =$('#dvb-s option').filter(':selected').text();}
			else {$('#dvb-s2').toggle();$('#dvb-s').hide();hdginput =$('#dvb-s2 option').filter(':selected').text();}
			update();
		});
	// dec = 65535 or hex = FFFF
	$('.nid').click(function(){
		if (edit >=2){$("#scn_nid").show();
			if ($('#ndec_a').text() == "Dec"){edit_code = "nidb";A = $('#scn_sat_'+preset+'a .nid_a').text();}//A = dec, B = hex
			else {edit_code = "nida";B = $('.nidb_a').text();}
		}
		load_settings();
	});
	//0 to 255//
	$('.thrsh').click(function(){
		if (edit >=2){$("#scn_keypad_small").show();$(".n").hide();$('.hdginput:visible').html(thrsh);hdginput = thrsh;$("#keypad_small_name").html("Threshold:");edit_code = "thrsh";}
	});
	$('.button_Tpram').click(function(){$('#scn_sat_'+preset).hide();$('#scn_sat_'+preset+'a').show();});
// sat edit end....	

//manual control....

	$('.dish').click(function(){
		if ($('#red_ds').is(':visible')){$('#red_ds').hide();$('#green_ds').show();}
		else{$('#red_ds').show();$('#green_ds').hide();}
	});
	$('.srh').click(function(){
		if ($('#red_srh').is(':visible')){$('#red_srh').hide();$('#green_srh').show();}
		else{$('#red_srh').show();$('#green_srh').hide();}
	});
	$('#azup').click(function(){if (az >= 359.9){az = (0);}
		else{az = ((az*10 + 0.1*10)/10);}manual();
	});	
	$('#azdown').click(function(){if (az <= 0){az = (359.9);}
		else{az = ((az*10 - 0.1*10)/10);}manual();
	});	
	$('#up').click(function(){if (el >= 90){el = (90);}
		else{el = ((el*10 + 0.1*10)/10);}manual();
	});	
	$('#down').click(function(){if (el <= 0){el = (0);}
		else{el = ((el*10 - 0.1*10)/10);}manual();
	});
	$('#polcw').click(function(){if (pol >= 180){pol = 180;}
		else{pol = pol+1;}manual();
		});
	$('#polccw').click(function(){if (pol <= 0){pol = 0;}
		else{pol = pol -1;}manual();
	});
//manual control end...

// bottom screen buttons...
	$('#home').click(function(){
		if ((edit == 3)&&($("#scn_save_as, #scn_save_as_a").is(':visible'))){$("#scn_save").show();$("#scn_save_as,#scn_save_as_a").hide();}
		else{$("#scn_home").show();$(".hide").hide();
		if (enter > 0){enter = 0;fncsys_info[enter]();fnc_wizard[enter];wizard = 0;}
		btn_home = 0;buttons();info_text();
		fl_ch="";}
	});
	$('#back').click(function(){
		if ($("#scn_target").is(':visible')){$("#scn_target").hide();$(".sat_text").html("Select Satellite to TARGET");clearInterval(tmr_flash_text);flash_tmr=0;}
		else if ($("#scn_satellite_target").is(':visible')){$("#scn_satellite_target").hide();$("#scn_satellite").show();edit=0;}
		else if ($("#scn_satellite_targeta").is(':visible')){$("#scn_satellite_target").show();$("#scn_satellite_targeta").hide();}
		else if ($("#scn_advanced_options").is(':visible')){$("#scn_advanced_options").hide();$("#scn_antenna").show();}
		else if ($("#scn_advanced_optionsa").is(':visible')){$("#scn_advanced_optionsa").hide();$("#scn_advanced_options").show();}
		else if ($("#scn_gps_status").is(':visible')){$("#scn_gps_status").hide();$("#scn_advanced_options").show();}
		else if ($("#scn_manual_control").is(':visible')){$("#scn_manual_control").hide();$("#scn_advanced_options").show();}
		else if ($("#scn_system_test").is(':visible')){$("#scn_system_test").hide();$("#scn_advanced_options").show();}
		else if ($('#scn_system_test_results').is(':visible')){$("#scn_system_test").show();$("#scn_system_test_results").hide();}
		else if ($('#scn_system_test_results_a').is(':visible')){$("#scn_system_test_results").show();$("#scn_system_test_results_a").hide();}
		/*else if ($("#scn_setup_wizard").is(':visible')){$("#scn_setup_wizard").hide();$("#scn_advanced_options").show();}*/
		else if ($("#scn_position").is(':visible')){$("#scn_position").hide();$("#scn_antenna").show();}
		else if ($('#scn_heading').is(':visible')){$("#scn_heading").hide();$("#scn_antenna").show();}
		else if ($('#scn_trims').is(':visible')){$("#scn_trims").hide();$("#scn_antenna").show();}
		else if ($("#scn_save_as_a").is(':visible')){$("#scn_save_as_a").hide();$("#scn_save_as").show();}
		else if ($("#scn_save_as").is(':visible')){$("#scn_save").show();$("#scn_save_as").hide();}
		else if (wizard == 1){if (enter == 0){enter = 0;}else{if ($('#diseqc_active').is(':checked')){enter--;}else if(enter == 6){enter = 4;}else {enter--;}fnc_wizard[enter]();};}
		else if (system_info == 1){
			if (enter == 0){enter = 0;}
			else{enter--;
			fncsys_info[enter]();}
		;}
		else if ($("#scn_satellite").is(':visible')||$("#scn_antenna").is(':visible')||$("#scn_panel_settings").is(':visible')){$('#home').click();}
		else if (edit >= 2){save_preset();}
		else if ($('#scn_sat_' + preset+'a').is(':visible')){$('#scn_sat_' + preset+'a').hide();$('#scn_sat_' + preset).show();}
		else if ($('#scn_sat_' + preset).is(':visible')){$('#scn_sat_' + preset).hide();$('#sat_view').click();}
		buttons();
	});
	$('#fwd').click(function(){
		if ($("#scn_satellite_target").is(':visible')){$("#scn_satellite_target").hide();$("#scn_satellite_targeta").show();}
		else if ($("#scn_advanced_options").is(':visible')){$("#scn_advanced_options").hide();$("#scn_advanced_optionsa").show();}
		else if ($("#scn_save_as").is(':visible')){$("#scn_save_as").hide();$("#scn_save_as_a").show();}
		else if ($('#scn_system_test_results').is(':visible')){$("#scn_system_test_results_a").show();$("#scn_system_test_results").hide();}
		else if (wizard == 1){if (enter == (fnc_wizard.length -1 )){enter =0;fnc_wizard[enter]();}else{if ($('#diseqc_active').is(':checked')){enter++;}else if(enter == 4){enter = 6;}else {enter++;}fnc_wizard[enter]();};}
		else if (system_info == 1){
			if (enter == (fncsys_info.length -1)){fncsys_info[enter]();}
			else {enter++;
			fncsys_info[enter]();}
		;}
		buttons();
	});
	
	// position....
	var gpsinput = "00";
	$('#internal').click(function(){
		if ($(this).is(':checked')){$('#external').prop("checked", false);$('#manual').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#external').click(function(){
		if ($(this).is(':checked')){$('#internal').prop("checked", false);$('#manual').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#manual').click(function(){$("#scn_position_fixed").show();$("#scn_heading_name").text("Heading:");
		if ($(this).is(':checked')){$('#internal').prop("checked", false);$('#external').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#b_lat').click(function(){
		$(".lat").show();$(".lon").hide();
	});
	$('#b_lon').click(function(){
		$(".lat").hide();$(".lon").show();
	});
	$('#b_deg').click(function(){
		if ($("#lat").is(':visible')){$("#lat_deg_cursor").show();$("#lat_min_cursor").hide();gpsinput = $('#lat_deg_input').text();}
		else {$("#lon_deg_cursor").show();$("#lon_min_cursor").hide();gpsinput = $('#lon_deg_input').text();}
	});
	$('#b_min').click(function(){
		if($("#lat").is(':visible')){$("#lat_min_cursor").show();$("#lat_deg_cursor").hide();gpsinput = $('#lat_min_input').text();}
		else {$("#lon_min_cursor").show();$("#lon_deg_cursor").hide();gpsinput = $('#lon_min_input').text();}
	});
	$('#b_hem').click(function(){
		if ($('.hem_input:visible').html() == "N"){$('.hem_input:visible').html("S");}
		else if ($('.hem_input:visible').html() == "E"){$('.hem_input:visible').html("W");}
		else if ($('.hem_input:visible').html() == "W"){$('.hem_input:visible').html("E");}
		else{$('.hem_input:visible').html("N");}
	});
	//heading input...
	

	$('#none').click(function(){
		if ($(this).is(':checked')){$('#nmea').prop("checked", false);$('#fixed').prop("checked", false);$('.hdgvalue').html("N/A");}
		else{$(this).prop("checked", true);}
	});
	$('#nmea').click(function(){$('.hdgvalue').html("000.0&#176; This will be the NMEA Heading Value");
		if ($(this).is(':checked')){$('#none').prop("checked", false);$('#fixed').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	$('#fixed').click(function(){$("#scn_keypad_small").show();hdgvalue = $('.hdgvalue').text();$('.hdginput:visible').text(hdgvalue);
				txt_length = ($('.hdginput:visible').text().length);$("#keypad_small_name").html("Heading:");update();
		if ($(this).is(':checked')){$('#none').prop("checked", false);$('#nmea').prop("checked", false);}
		else{$(this).prop("checked", true);}
	});
	//number keypad...


	var dot = 0;
	var dash = 0;
	var upper_case = 0;
	
	function keypad_small_reset (){
		$(".n").show();$(".ndash").hide();
		
	}
	function keypad_large(){if (wizard == 1){$('#scn_keypad .n').hide();$('#scn_keypad .ncoma').show();}
		else {$('#scn_keypad .n').show();$('#scn_keypad .ncoma').hide();}
	}
	function update(){
		var hdginput1 = (+hdginput).toFixed(1);
		if ($("#scn_position_fixed").is(':visible')){$('#pos_input_error').html("");
			if (txt_length >1){$('#pos_input_error').html("Use Backspace");}
			else if($("#lat_deg_cursor").is(':visible')){if (gpsinput >90){$('#pos_input_error').html("Allowed range 0 to 90");}else{$('#lat_deg_input').html(gpsinput);};}
			else if($("#lat_min_cursor").is(':visible')){if (gpsinput >60){$('#pos_input_error').html("Allowed range 0 to 60");}else{$('#lat_min_input').html(gpsinput);};}
			else if($("#lon_deg_cursor").is(':visible')){if (gpsinput >180){$('#pos_input_error').html("Allowed range 0 to 180");}else{$('#lon_deg_input').html(gpsinput);};}
			else if($("#lon_min_cursor").is(':visible')){if (gpsinput >60){$('#pos_input_error').html("Allowed range 0 to 60");}else{$('#lon_min_input').html(gpsinput);};}
		}
		else if($('#scn_heading').is(':visible')){
			if(hdginput > 360.0){$('#keypad_small_error').html("Allowed range 0.0 to 360.0");}
			else {$('.hdginput:visible').html(hdginput);$('#keypad_small_error').html("");}
		}
		else if ($('#scn_nid').is(':visible')){$('#nid_error').html("");
			if($('#ndec_a').text() == "Hex"){B = ((+hdginput).toString(16).toUpperCase());A=hdginput;}
			else {B=hdginput;A = parseInt(B, 16);}$("#a").text(A);$("#b").text(B);
			if (($('#ndec_a').text() == "Hex")&(A >65535)){$('#nid_error').html("Allowed range 0 to 65535");}
			else if (($('#ndec_a').text() == "Dec")&(A >65535)){$('#nid_error').html("Allowed range 0 to FFFF");}
			else {$('.hdginput:visible').html(hdginput.toUpperCase());}
		}
		else if ((edit_code == "lon")&(hdginput > 180)){$('#keypad_small_error').html("Allowed range 0 to 180");hdginput = hdginput1;}
		else if ((edit_code == "skew")&(hdginput > 45)||(hdginput < -45)){$('#keypad_small_error').html("Allowed range -45 to 45");}
		else if ((edit_code == "freq")&(hdginput > 9999)){$('#keypad_small_error').html("Allowed range 0 to 9999");}
		else if ((edit_code == "Brate")&(hdginput > 50000)){$('#keypad_small_error').html("Allowed range 0 to 50000");}
		else if ((edit_code == "thrsh")&(hdginput > 255)){$('#keypad_small_error').html("Allowed range 0 to 255");}
		
		else {$('#keypad_small_error').html("");$('.hdginput:visible').html(hdginput);}
	};
	//nid screen....
	$('.ndec').click(function(){
		if($('#ndec_a').text() == "Dec"){$('#fec_name').text("(Dec)");$('#ndec_a').text("Hex");$('#dec').show();B = $('.hdginput:visible').text();hdginput = A;$('.hdginput:visible').text(A);}
		else{$('#fec_name').text("(Hex)");$('#ndec_a').text("Dec");$('#dec').hide();A = $('.hdginput:visible').text();hdginput = B;$('.hdginput:visible').text(B);}
		
	});
	//large keypad screen
	$('.case').click(function(){
		if (upper_case == 0){upper_case = 1;$("#keypad").attr("src","img/Keypad_upper.png"); }
		else {upper_case = 0;$("#keypad").attr("src","img/Keypad.png"); }
	});
	//default buttons....
	$('.ndash').click(function(){
		if ($('#scn_keypad_small').is(':visible')){dash = $('.hdginput:visible').text().indexOf("-");
			if (dash >= 0){hdginput = hdginput;}
			else {hdginput = (hdginput + "-");update();}
		}
	});
	$('.n').click(function(){
		if ($('#scn_keypad_small').is(':visible')){dot = $('.hdginput:visible').text().indexOf(".");
			if (dot >= 0){hdginput = hdginput; }
			else {hdginput = (hdginput + ".");update();}
		}
		else {hdginput = (hdginput + ".");update();}
	});
	$('.ncoma').click(function(){hdginput = (hdginput + ",");update();});
	$('.n0').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "0");}else {hdginput = (hdginput + "0");}update();});
	$('.n1').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "1");}else {hdginput = (hdginput + "1");}update();});
	$('.n2').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "2");}else {hdginput = (hdginput + "2");}update();});
	$('.n3').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "3");}else {hdginput = (hdginput + "3");}update();});
	$('.n4').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "4");}else {hdginput = (hdginput + "4");}update();});
	$('.n5').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "5");}else {hdginput = (hdginput + "5");}update();});
	$('.n6').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "6");}else {hdginput = (hdginput + "6");}update();});
	$('.n7').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "7");}else {hdginput = (hdginput + "7");}update();});
	$('.n8').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "8");}else {hdginput = (hdginput + "8");}update();});
	$('.n9').click(function(){if($("#scn_position_fixed").is(':visible')){gpsinput = (gpsinput + "9");}else {hdginput = (hdginput + "9");}update();});
	$('.sp').click(function(){hdginput = (hdginput + " ");update();});
	$('.na').click(function(){if(upper_case == 1){hdginput = (hdginput + "A");}else {hdginput = (hdginput + "a");}update();});
	$('.nb').click(function(){if(upper_case == 1){hdginput = (hdginput + "B");}else {hdginput = (hdginput + "b");}update();});
	$('.nc').click(function(){if(upper_case == 1){hdginput = (hdginput + "C");}else {hdginput = (hdginput + "c");}update();});
	$('.nd').click(function(){if(upper_case == 1){hdginput = (hdginput + "D");}else {hdginput = (hdginput + "d");}update();});
	$('.ne').click(function(){if(upper_case == 1){hdginput = (hdginput + "E");}else {hdginput = (hdginput + "e");}update();});
	$('.nf').click(function(){if(upper_case == 1){hdginput = (hdginput + "F");}else {hdginput = (hdginput + "f");}update();});
	$('.ng').click(function(){if(upper_case == 1){hdginput = (hdginput + "G");}else {hdginput = (hdginput + "g");}update();});
	$('.nh').click(function(){if(upper_case == 1){hdginput = (hdginput + "H");}else {hdginput = (hdginput + "h");}update();});
	$('.ni').click(function(){if(upper_case == 1){hdginput = (hdginput + "I");}else {hdginput = (hdginput + "i");}update();});
	$('.nj').click(function(){if(upper_case == 1){hdginput = (hdginput + "J");}else {hdginput = (hdginput + "j");}update();});
	$('.nk').click(function(){if(upper_case == 1){hdginput = (hdginput + "K");}else {hdginput = (hdginput + "k");}update();});
	$('.nl').click(function(){if(upper_case == 1){hdginput = (hdginput + "L");}else {hdginput = (hdginput + "l");}update();});
	$('.nm').click(function(){if(upper_case == 1){hdginput = (hdginput + "M");}else {hdginput = (hdginput + "m");}update();});
	$('.nn').click(function(){if(upper_case == 1){hdginput = (hdginput + "N");}else {hdginput = (hdginput + "n");}update();});
	$('.no').click(function(){if(upper_case == 1){hdginput = (hdginput + "O");}else {hdginput = (hdginput + "o");}update();});
	$('.np').click(function(){if(upper_case == 1){hdginput = (hdginput + "P");}else {hdginput = (hdginput + "p");}update();});
	$('.nq').click(function(){if(upper_case == 1){hdginput = (hdginput + "Q");}else {hdginput = (hdginput + "q");}update();});
	$('.nr').click(function(){if(upper_case == 1){hdginput = (hdginput + "R");}else {hdginput = (hdginput + "r");}update();});
	$('.ns').click(function(){if(upper_case == 1){hdginput = (hdginput + "S");}else {hdginput = (hdginput + "s");}update();});
	$('.nt').click(function(){if(upper_case == 1){hdginput = (hdginput + "T");}else {hdginput = (hdginput + "t");}update();});
	$('.nu').click(function(){if(upper_case == 1){hdginput = (hdginput + "U");}else {hdginput = (hdginput + "u");}update();});
	$('.nv').click(function(){if(upper_case == 1){hdginput = (hdginput + "V");}else {hdginput = (hdginput + "v");}update();});
	$('.nw').click(function(){if(upper_case == 1){hdginput = (hdginput + "W");}else {hdginput = (hdginput + "w");}update();});
	$('.nx').click(function(){if(upper_case == 1){hdginput = (hdginput + "X");}else {hdginput = (hdginput + "x");}update();});
	$('.ny').click(function(){if(upper_case == 1){hdginput = (hdginput + "Y");}else {hdginput = (hdginput + "y");}update();});
	$('.nz').click(function(){if(upper_case == 1){hdginput = (hdginput + "Z");}else {hdginput = (hdginput + "z");}update();});
	
	$('.ndel').click(function(){
		if($("#lat_deg_cursor").is(':visible')){txt_length = ($('#lat_deg_input').text().length);gpsinput = gpsinput.slice(0, (txt_length-1));$('#lat_deg_input').html(gpsinput);}
		else if($("#lat_min_cursor").is(':visible')){txt_length = ($('#lat_min_input').text().length);gpsinput = gpsinput.slice(0, (txt_length-1));$('#lat_min_input').html(gpsinput);}
		else if($("#lon_deg_cursor").is(':visible')){txt_length = ($('#lon_deg_input').text().length);gpsinput = gpsinput.slice(0, (txt_length-1));$('#lon_deg_input').html(gpsinput);}
		else if($("#lon_min_cursor").is(':visible')){txt_length = ($('#lon_min_input').text().length);gpsinput = gpsinput.slice(0, (txt_length-1));$('#lon_min_input').html(gpsinput);}
		
		else {txt_length = ($('.hdginput:visible').val().length);hdginput = hdginput.toString().slice(0, (txt_length-1));}
		
		update();
		});
	var edit_codea = 0;	
	$('.cancel').click(function(){edit_codea = edit_code
		if ($('#scn_save').is(':visible')){nonsave_preset();$("#scn_satellite_target").show();preset=0;$('#scn_save').hide();buttons();}
		else if ($('#scn_keypad').is(':visible')){$('#scn_keypad').hide();$('#scn_sat_'+preset+' .name_a').text(name);}
		else if($('#scn_heading').is(':visible')){$("#scn_keypad_small").hide();$('.hdgvalue').html(hdgvalue);}
		else if ($("#scn_position_fixed").is(':visible')){$("#scn_position_fixed").hide();$("#scn_position").show();}
		else if ($('#scn_fec').is(':visible')){$("#scn_fec").hide();}
		else if ($('#scn_nid').is(':visible')){$('#scn_nid').hide();}
		else if ($("#scn_factory_reset").is(':visible')){$("#scn_factory_reset").hide();$("#scn_advanced_optionsa").show();}
		else if ($('#scn_sat_'+preset).is(':visible')||$('#scn_sat_'+preset+'a').is(':visible')){$("#scn_keypad_small").hide();keypad_small_reset();}
		else if ($('#timezone_adjust').is(':visible')){$('#timezone_adjust').hide();}
		else if ($('#scn_panel_settings').is(':visible')){$("#scn_keypad_small").hide();keypad_small_reset();}
		
		
	});
	$(".save").on("click",function(){
		if ($('#scn_save').is(':visible')&& (edit ==3)){$('#scn_save_as').show();$('#scn_save').hide();buttons();}
		else if ($('#scn_save').is(':visible')){$("#scn_satellite_target").show();preset=0;$('#scn_save').hide();buttons();}
		else if($('#scn_heading').is(':visible')){$("#scn_keypad_small").hide();
			if ((hdginput < 100)&(hdginput > 0)){$('.hdgvalue').html("0"+hdginput);}
			else {$('.hdgvalue').html(hdginput);}
		}
		else if ($("#scn_position_fixed").is(':visible')){$("#scn_position_fixed").hide();$("#scn_position").show();
				$("#latvalue").html($('#lat_deg_input').text()+"."+$('#lat_min_input').text()+".00"+$('#lat_hem').text())
				$("#lonvalue").html($('#lon_deg_input').text()+"."+$('#lon_min_input').text()+".00"+$('#lon_hem').text())
		;}
		else if ($('#scn_keypad').is(':visible')){
			if (wizard == 1){$('#line'+C).text(hdginput);$('#scn_keypad').hide();}
			else {$('#scn_sat_'+preset+' .name_a').text(hdginput);$('.sat'+preset+' .name_a').text(hdginput);$('#scn_keypad').hide();
					if (edit == 3){$('#scn_satellite').show();save_as();}
					else {$('#scn_sat_'+preset).show();}
			;}
		;}
		else if ($('#scn_fec').is(':visible')){$("#scn_fec").hide();$('#scn_sat_'+preset+'a .'+edit_code+'_a').text(hdginput);}
		else if ($('#scn_nid').is(':visible')){$('#scn_nid').hide();$('#scn_sat_'+preset+'a .nid_a').text(A);$('#scn_sat_'+preset+'a .nidb_a').text(B.toUpperCase());}
		else if ($('#scn_sat_'+preset).is(':visible')){$('#scn_sat_'+preset+' .'+edit_code+'_a').text(hdginput);$("#scn_keypad_small").hide();keypad_small_reset();}
		else if ($('#scn_sat_'+preset+'a').is(':visible')){$('#scn_sat_'+preset+'a .'+edit_code+'_a').text(hdginput);$("#scn_keypad_small").hide();keypad_small_reset();}
		else if ($('#timezone_adjust').is(':visible')){timezone = enter;$('#timezone_adjust').hide();$('.timezone_sel .settings').html(hdginput); }
		else if ($('#scn_panel_settings').is(':visible')){$('#'+C+' .settings').html(hdginput);$("#scn_keypad_small").hide();keypad_small_reset();}
	;});











});