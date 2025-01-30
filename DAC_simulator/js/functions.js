/***************************************************************************
//! 
//!
//! author: Rick Perkins
//!
//! 
***************************************************************************/

	
	var search_on = 0;
	var unlock = 0;
	var etdisp = 0;
	var tmr_trackLED = 0;
	var tmr_search = 0;
	var no_gyro_limit = 0;
	var Dac_variables ={stopenter:1,next:0,underline_start:[0,0],vaztrim:0,veltrim:0,};//use this for all global variables.....
	var Search_variables={srh_tout:0,tmr_search_Con:0,search_el:0,srch_inc:0,sweep_inc:0,sweep_inca:0,search_step:0,srch_inca:0,srch_incb:0,math_cos:0,math_sin:0,search_az_stop:0,search_el_stop:0,target_az_stop:0,target_el_stop:0}//last 4 are search stop point,last search target point before stop

	$("#aza").text("144.0");
	$("#rela").text("144.0");
	$("#ela").text("028.0");
	flowchart("OP1a");
	
	$('.rev').html("Antenna Control Unit<br>DAC 2202 Simulator RevA");
	doc_name();
	//function for next button..
	function status(){$('#status').show();$('#ship').hide();$('#satellite').hide();$('#antenna').hide();$("#OM3, #OM4, #OM5").css("color","black");$("#OM2").css("color","white");screen_OP_mode();
		$("#screen-info-center").html('<img src="images/OPA.png">');flowchart("OP2a");}
	function ship(){$('#status').hide();$('#ship').show();$('#satellite').hide();$('#antenna').hide();$("#OM2, #OM4, #OM5").css("color","black");$("#OM3").css("color","white");
		$("#screen-info-text").html("Ship Main Menu:<br>is screen displays current vessel Geo location and bearing.");
		$("#screen-info-center").html('<img src="images/OPB.png">');flowchart("OP3a");}
	function satellite(){$('#status').hide();$('#ship').hide();$('#satellite').show();$('#antenna').hide();$("#OM2, #OM3, #OM5").css("color","black");$("#OM4").css("color","white");
		$("#screen-info-text").html("Satellite Main Menu:<br>This screen displays the Satellite tracking information.");
		$("#screen-info-center").html('<img src="images/OPC.png">');flowchart("OP4a");}
	function antenna(){$('#status').hide();$('#ship').hide();$('#satellite').hide();$('#antenna').show();$("#OM2, #OM3, #OM4").css("color","black");$("#OM5").css("color","white");
		$("#screen-info-text").html("Antenna Main Menu:<br> Displays the current antenna position and signal strength values. The use of directional arrows allow azimuth and elevation drive control.");
		$("#screen-info-center").html('<img src="images/OPD.png">');flowchart("OP5a");}
	var fncnext = [status,ship,satellite,antenna];
	
	 
	
	//S at the end = blank space

	//function for up down button status..
	function statusall(){$('#st,.antso').show();$('.dacso,.dvbso,.coifso').hide();$("#OM2").css("color","white");$("#OM1").css("color","black");
	$("#screen-info-text").text("This screen reports the above decks Model Configuration and Software version load.  Flash Upgradeable via Sea Tels proprietary PC based diagnostic software ProgTerm");
	$("#screen-info-center").html('<img src="images/OPA.png">');flowchart("OP2a");
	}
	function commifso(){$('#st,.coifso').show();$('.dacso,.dvbso,.antso').hide();$("#OM1").css("color","white");$("#OM2").css("color","black");
		$("#screen-info-text").text("This screen reports the COMMIF module software version.  Flash Upgradeable via 3rd party PC based diagnostic software SHD Download Utility.");
		$("#screen-info-center").html('<img src="images/OP1.png">');flowchart("OP1c");
	}
	function dvbso(){$('#st,.dvbso').show();$('.dacso,.antso,.coifso').hide();$("#OM1").css("color","white");$("#OM2").css("color","black");
		$("#screen-info-text").html("This screen reports the installed tracking receivers software version.  Flash Upgradeable via Sea Tels proprietary PC based diagnostic software ProgTerm.<br> The DVB tuner card is used with TVRO systems<br>The SCPC tuner card is used for VSAT systems<br>The DVB Ver 7.xx tuner card is DVB S/S2 compliant and SCPC");
		$("#screen-info-center").html('<img src="images/OP1.png">');flowchart("OP1b");
	}
	function dacso(){$('#st,.dacso').show();$('.antso,.dvbso,.coifso').hide();$("#OM1").css("color","white");$("#OM2").css("color","black");
		$("#screen-info-text").text("This screen reports the DAC-2202 Main Processors software version. Flash Upgradeable via Sea Tels proprietary PC based diagnostic software ProgTerm.");
		$("#screen-info-center").html('<img src="images/OP1.png">');flowchart("OP1a");
	}
	var fncstatusupdown = [statusall,commifso,dvbso,dacso];
	
	
	//function for enter button ship..
	function latlon(){$('#lata').text(("0"+ (+$('#latb').text()).toFixed(0)).slice(-2));$('#lona').text(("000"+ (+$('#lonb').text()).toFixed(0)).slice(-3));}
	function shipall(){$('#lat,#lata,#lon,#lona,#hdg').show();$('#latb,#lonb,#hdgs').hide();latlon();flowchart("OP3a");}					
	function lat(){$('#lat,#latb').show();$('#lata,#lon,#lona,#hdg,#hdgs').hide();underline(125,50,0);
		$("#screen-info-text").text("Ship Latitude sub-menu (LAT) displays the current latitudinal position of the vessel as provided by either the Antennas internal GPS or as provided by an integrated ships GPS system.");
		$("#screen-info-center").html('<img src="images/OPB1_01.png">');flowchart("OP3b");}
	function lon(){$('#lon,#lonb').show();$('#lat,#hdg').hide();underline(295,50,0);
		$("#screen-info-text").text("Ship Longitude sub-menu (LON) displays the current longitudinal position of the vessel as provided by either the Antennas internal GPS or as provided by an integrated ships GPS system.");
		$("#screen-info-center").html('<img src="images/OPB2_01.png">');flowchart("OP3c");}
	function hdg(){$('#hdg,#hdgs').show();$('#lon,#lat,#latb').hide();underline(142,80,0);
		$("#screen-info-text").html("Ship Heading sub-menu (HDG) displays the current bearing (heading) of the vessel as provided by either the integrated ships Gyro Compass system.<p>HDG Related Parameters:<br>Gyro Type</p>");
		$("#screen-info-center").html('<img src="images/OPB3_01.png">');flowchart("OP3d");}
	var fncshipenter = [shipall,lat,lon,hdg];
	
	//function for enter button satellite..
	function satall(){
		if ($('#fecb').text() == "SCPC"){$('#freqa').html("MHz&nbsp;&nbsp;");}
		else{$('#freqa').html("FREQ&nbsp;");}
		$('#sat,#sata,#thrs,#freq,#nid').show();$('#satb,#nida,#satS,#agc,#baud,#tone,#volt,#fec,#skew').hide();
		var sata = (parseFloat($('#satb').text())).toFixed(0);$('#sata').text(("000"+ sata).slice(-3));flowchart("OP4a");
	}
	function sat(){$('#sat,#satb').show();$('#thrs,#freq,#nid,#sata,#nida,#agc').hide();underline(176,50,-2);
		$("#screen-info-text").html("Satellite Sub-Menu (SAT) displays the longitudinal position of the desired satellite that will used by the DAC for pointing angle (targeting) calculations.<p>NOTE: Targeting a Satellite position with an odd tenths digit (i.e. 101.1) invokes an Inclined Orbit Target/Search.</p>");
		$("#screen-info-center").html('<img src="images/OPC1_01.png">');flowchart("OP4b");}
	function thrs(){$('#thrs').show();$('#sat,#satb,#freq,#agc').hide();underline(362,50,0);
		$("#screen-info-text").html("Threshold Sub-Menu (THRSH) displays the current threshold value.<br>This threshold is the minimum received AGC value that triggers the systems tracking state. <p>Related Parameters:<br>Auto Threshold</p>");
		$("#screen-info-center").html('<img src="images/OPC2.png">');flowchart("OP4c");}
	function freq(){$('#freq,#satS,#agc').show();$('#thrs,#baud').hide();underline(159,80,1);
		if ($('#fecb').text() == "SCPC"){$('#freqa').html("MHz&nbsp;&nbsp;");flowchart("OP4da");}
		else{$('#freqa').html("FREQ&nbsp;");flowchart("OP4d");}
		$("#screen-info-text").html("IN DVB MODE:<p>Satellite FREQ sub-menu (FREQ) displays the IF frequency to be used by the system for satellite location and tracking purposes</p>IN SCPC MODE:<p>Satellite MHz sub-menu (MHz) displays the MHz IF frequency to be used by the system for satellite location and tracking purposes.</p>");
		$("#screen-info-center").html('<img src="images/OPC3a.png">');}
	function baud(){if ($('#fecb').text() == "SCPC"){
					
					$('#baud,#khzval').show();$('#freq,#baudval,#tone').hide();$('#bauda').html("KHz&nbsp;&nbsp;");underline(159,80,1);
					$("#screen-info-text").html("IN SCPC MODE:<p>Satellite MHz sub-menu (MHz) displays the MHz IF frequency to be used by the system for satellite location and tracking purposes.</p><p>NOTE: KHz 0100 = 100KHz, KHz set to 1000 = 100KHz which is 1MHz.</p>");
					$("#screen-info-center").html('<img src="images/OPC4b.png">');flowchart("OP4ea");}
					else{
						
						$('#baud,#baudval').show();$('#freq,#khzval,#tone').hide();$('#bauda').html("BAUD&nbsp;");underline(176,80,1);
					$("#screen-info-text").html("IN DVB MODE:<p>Satellite Baud sub-menu (BAUD) displays the Baud Rate to be used by the system for satellite identification purposes.</p>");
					$("#screen-info-center").html('<img src="images/OPC4a.png">');flowchart("OP4e");}
	}
	function tone(){$('#tone').show();$('#baud,#volt').hide();underline(176,80,1);
		$("#screen-info-text").html("Satellite Tone sub-menu (TONE) displays the 22KHz continuous tone output of the tracking receiver.<p>Related Parameters:</p>System Type (must include type 64 to function properly)");
		$("#screen-info-center").html('<img src="images/OPC5.png">');flowchart("OP4f");}
	function volt(){$('#volt').show();$('#tone,#fec').hide();$('#tone').hide();underline(176,80,1);
		$("#screen-info-text").html("Satellite Tone sub-menu (Volt) displays the DC Voltage output  state of the ACUs tracking receiver.<p>Related Parameters:</p>System Type (must include type 64 to function properly)");
		$("#screen-info-center").html('<img src="images/OPC6.png">');flowchart("OP4g");}
	function fec(){$('#fec').show();$('#volt,#skew').hide();underline(176,80,1);
		$("#screen-info-text").html("Satellite FEC sub-menu (FEC) displays the current Forward Error Correction Rate used by the tracking receiver for positive satellite identification.<p>For L-Band SCPC receivers this parameter must be set to either SCPC or LSCP</p>");
		$("#screen-info-center").html('<img src="images/OPC7.png">');flowchart("OP4h");}
	function skew(){$('#skew').show();$('#fec,#nida').hide();underline(176,80,1);
		$("#screen-info-text").html("Satellite Skew sub-menu (SKEW) displays the satellite polarization angle offset. Typically used to perform Cross-Pol Isolation tests in a VSAT based system or to optimize signal quality in a TVRO based system.<p>Related Parameters:</p>POL Offset, POL Skew, POL Type,TX Polarity");
		$("#screen-info-center").html('<img src="images/OPC8.png">');flowchart("OP4i");}
	function nid(){$('#nida,#satS').show();$('#skew,#sat,#satb').hide();underline(176,80,1);
		$("#screen-info-text").html("Satellite Network ID sub-menu (NID) displays the unique DVB compliant Hexadecimal NID value used for positive satellite identification with DVB-S tuner and Decimal for DVB-S2 tuner when the targeted satellite is broadcasting a DVB compliant transmission.<p>If this parameter is provided in decimal format, it will have to be converted to hexadecimal for entry.</p>");
		$("#screen-info-center").html('<img src="images/OPC9.png">');flowchart("OP4j");}
	var fncsatenter = [satall, sat,thrs,freq,baud,tone,volt,fec,skew,nid];
	
	//array for VOLT
	var arrVolt = ["VERT","HORZ","LHCP","RHCP"];
	//array for FEC and fecs2(DVB-S and DVB-S2)
	var arrFec = ["AUTO","1/2","2/3","3/4","5/6","6/7","7/8","SCPC","AUTO*","1/2*","2/3*","3/4*","5/6*","6/7*","7/8*","LSCP"];
	var arrFecS2 = ["AUTO","S 1/2","S 2/3","S 3/4","S 5/6","S 6/7","S 7/8","SCPC","AUTO*","S 1/2*","S 2/3*","S 3/4*","S 5/6*","S 6/7*","S 7/8*","L SCPC","2Q 1/4","2Q 1/3","2Q 2/5","2Q 1/2","2Q 3/5","2Q 2/3","2Q 3/4","2Q 4/5","2Q 5/6","2Q 8/9","2Q 910","28 3/5","28 2/3","28 3/4","28 5/6","28 8/9","28 910"];
	
	
	//function for enter button antenna..
	function antall(){$('#az,#aza,#el,#ela,#rel,#rela,#agcant').show();$('#azb,#azelS,#trac,#relS,#pol,#pola,#refl,#refla').hide();flowchart("OP5a");}
	function az(){$('#az,#aza,#azelS,#trac,#agcant').show();$('#el,#ela,#rel,#rela,#pol,#pola,#refl,#refla,#relS').hide();underline(142,50,0);
		$("#screen-info-text").html("Antenna Azimuth sub-menu (AZ) displays the antennas azimuth pointing angle relative to true north.<p>Related Parameters:</p>Az Trim");
		$("#screen-info-center").html('<img src="images/OPD1.png">');flowchart("OP5b");}
	function el(){$('#el,#ela,#azelS,#trac,#agcant').show();$('#az,#aza,#rel,#relS').hide();underline(329,50,0);
		$("#screen-info-text").html("Antenna Elevation sub-menu (EL) displays the antennas elevation pointing angle relative to the horizon.<p>Related Parameters:</p>El Trim and Remote Tilt");
		$("#screen-info-center").html('<img src="images/OPD2.png">');flowchart("OP5c");}
	function rel(){$('#relS,#rel,#rela,#agcant').show();$('#azelS,#trac,#el,#ela,#pol').hide();underline(142,80,0);
		$("#screen-info-text").html("Antenna Relative Sub-Menu (REL) displays the mechanical azimuth rotational position of the antenna relative to the Bow of the ship.  When the antenna is pointed inline (parallel to) with the Bow of the ship the REL display should be 360.0/000.0<p>Related Parameters:</p>Remote N6 Home Flag Offset and Azimuth Limits 1-8");
		$("#screen-info-center").html('<img src="images/OPD3.png">');flowchart("OP5d");}
	function pol(){$('#relS,#pol,#pola,#agcant').show();$('#rel,#rela,#refl').hide();underline(142,80,0);
		$("#screen-info-text").html("Antenna Polang sub-menu (POL) displays the current Polarity Angle (a.k.a. Polang) of the antennas feed assembly.  For linear based systems, it is recommended that the system run in AutoPol mode.<p>Related Parameters:</p>Pol Type, Pol Scale, Pol Offset and Tx Polarity");
		$("#screen-info-center").html('<img src="images/OPD4.png">');flowchart("OP5e");}
	function refl(){$('#relS,#refl,#refla,#agcant').show();$('#pol,#pola,#az,#trac,#azelS').hide();underline(193,80,0);
		$("#screen-info-text").html("Antenna Reflector submenu (Reflector) displays the currently selected reflector in antenna systems fitted with QOR(TM) technology or Dual band antennas I.E. 9711.<br>For TVRO and singal band system this should be set to Reflector A.<p>Related Parameters:</p>Track Disp");
		$("#screen-info-center").html('<img src="images/OPD5a.png">');flowchart("OP5f");}
	var fncantenter = [antall,az,el,rel,pol,refl];
	
	//function for enter button status1..
	function track(){$('#ctl,#track').show();$('#srh,#srha,#sts,#err,#rmt').hide();underline(261,80,5);
		$("#OM2").css("color","white");screen_OP_mode();flowchart("OP2b");
		$("#screen-info-text").html("This screen provides the user the ability to view or change the antennas Tracking State and/or selected band of operation.<p>Related parameters:</p>Track Disp");
		$("#screen-info-center").html('<img src="images/OPA1.png">');}
	function srh(){$('#ctl,#srh,#srha').show();$('#track,#sts,#err').hide();
		$("#screen-info-text").html("This screen provides the user the ability to view or change the antennas searching state.");
		$("#screen-info-center").html('<img src="images/OPA2_03.png">');flowchart("OP2c");}
	function err(){$('#sts,#err').show();$('#ctl,#srh,#srha,#rmt').hide();
		$("#screen-info-text").html("LLLL  -  Comms Error Count  -   The first four numeric digits indicates the number of times that a Pedestal M&C communication messages (between the ACU and PCU) was not received correctly.  Occasional counts are acceptable but more than 10 per minute indicates a problem that needs attention.<p>RRRR  -  Error Code  -  The second set of four numeric digits indicates the SUM of the discrete error(s) that have occurred.  It does not indicate how many particular errors have occurred.</p>");
		$("#screen-info-center").html('<img src="images/OPA3.png">');flowchart("OP2d");}
	function rmt(){$('#sts,#rmt').show();$('#err,#ctl,#track').hide();underline(261,80,5);$("#OM2").css("color","white");screen_OP_mode();
		$("#screen-info-text").html("Status Remote AUX ");
		$("#screen-info-center").html('<img src="images/blank.png">');flowchart("OP2e");}		
	var fncstatus1 = [track,srh,err,rmt];	
	
	//function for enter button setup..
	function atrm(){$('#stp,#atrm').show();$('#eltrm,#aztrm,#attrs,#elstp,#azstp,#stitg,#srhinc,#srhlm,#srhdl,#spic,#smtp,#gotp,#pgtp,#plot,#plse,#5vot,#5plse,#az1,#az2,#el12,#az3,#az4,#el34,#az5,#az6,#el56,#txpl,#tkdp,#savep').hide();
		underline(223,80,0);$("#OM2").css("color","black");screen_SM_mode();$("#atrm").html("&nbsp;AUTO&nbsp;TRIM&nbsp;&nbsp;");
		$("#screen-info-text").html("AUTO TRIM:<br>The Auto Trim function will automatically calculate and set the required Azimuth and Elevation trim offset parameters required to properly calibrate the antennas display to the mechanical angle of the antenna itself, while peaked ON satellite.<p>To enable this function, the Antenna MUST be actively tracking the satellite with positive SAT ID and elevation of the antenna must be less than 83 degrees and the ACU must NOT be set for Inclined Orbit Search.  After locating the satellite, with Tracking ON, wait at least 30 seconds before performing the AUTO TRIM feature, this will allow sufficient time for the antenna to peak up on signal.  It is equally important that you verify that the system is tracking the CORRECT satellite (verify video is produced on the Televisions in a TVRO system or verify a RX lock indication on the satellite modem in a VSAT system).</p>");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STa");}
	function eltrm(){$('#stp,#eltrm').show();$('#atrm,#aztrm').hide();underline(244,80,1);
		$("#screen-info-text").html("EL TRIM:<br>Elevation trim offset parameter is entered in tenths of degrees.  Adjusts display to correct for antenna alignment errors or imbalances in the antenna system.");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STb");}
	function aztrm(){$('#stp,#aztrm').show();$('#eltrm,#attrs').hide();underline(244,80,1);
		$("#screen-info-text").html("AZ TRIM:<br>Azimuth trim offset parameter is entered in tenths of degrees.  Offsets true azimuth angle display to compensate for installation alignment errors when used with Ships Gyro Compass input reference.  Azimuth Trim does not affect REL azimuth readin");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STc");}
	function attrs(){$('#stp,#attrs').show();$('#aztrm,#elstp').hide();underline(295,80,1);
		$("#screen-info-text").html("AUTO THRES:<br>Sets offset of AGC tracking threshold above the average noise floor.  Units are in A/D counts, approximately 20 counts/dB.  A setting of 0 disables auto threshold, therefore, the operator would have to manually enter a threshold value.<p>When AUTO THRESHOLD is enabled (any value between 1-255), the ACU automatically re-sets the AGC tracking threshold whenever the antenna Targets (AZ, EL or SAT) or Searches.  The new AGC threshold is set to the average signal level input (approximate background noise level) plus the AUTO THRES offset value. EXAMPLE:  If the Noise Floor off satellite is 1000 counts of AGC and Auto Threshold is set to 100, Threshold will be set to approximately 1100 after the antenna has finished targeting or Searching. </p>");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STd");}
	function elstp(){$('#stp,#elstp').show();$('#attrs,#azstp').hide();
		$("#screen-info-text").html("EL STEP SIZE:<br>For proper DishScan operation this parameter must be set to factory default value of 0000. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STe");}
	function azstp(){$('#stp,#azstp').show();$('#elstp,#stitg').hide();underline(295,80,1);
		$("#screen-info-text").html("AZ STEP SIZE:<br>For proper DishScan operation this parameter must be set to factory default value of 0000. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STf");}
	function stitg(){$('#stp,#stitg').show();$('#azstp,#srhinc').hide();underline(312,80,1);
		$("#screen-info-text").html("STEP INTEGRAL:<br>For proper DishScan operation this parameter must be set to factory default value of 0000. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STg");}
	function srhinc(){$('#stp,#srhinc').show();$('#stitg,#srhlm').hide();underline(295,80,1);
		$("#screen-info-text").html("SEARCH INC:<br>Sets size of search pattern increment.  Units are in pedestal step resolution (12 or 24 steps per degree depending on antenna model).  The suggested setting is equal to the full 3dB beam width of your antenna.  ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STh");}
	function srhlm(){$('#stp,#srhlm').show();$('#srhinc,#srhdl').hide();
		$("#screen-info-text").html("SEARCH LIMIT:<br>Sets the overall peak to peak size of the search pattern.  Units are in pedestal step resolution (12 or 24 steps per degree depending on antenna model). ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STi");}
	function srhdl(){$('#stp,#srhdl').show();$('#srhlm,#spic').hide();
		$("#screen-info-text").html("SEARCH DELAY:<br>Sets the time-out for automatic initiation of a search operation when the signal level (AGC) drops below threshold.  Units are in seconds.  Range is 0-255 seconds.");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STj");}
	function spic(){$('#stp,#spic').show();$('#srhdl,#smtp').hide();
		$("#screen-info-text").html("SWEEP INC:<br>This parameter MUST be set for the desired azimuth sweep speed of a No Gyro search or the sweep increment dimension of an Inclined Orbit search.  ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STk");}
	function smtp(){$('#stp,#smtp').show();$('#spic,#gotp').hide();
		$("#screen-info-text").html('SYSTEM TYPE:<br>This parameter is used to enable a variety of system functions.  Select system options according to the "System Type" table located in the user manual.  Add together all the desired options together and enter the sum into the SYSTEM TYPE parameter to enable the desired functions.  ');
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STl");}
	function gotp(){$('#stp,#gotp').show();$('#smtp,#pgtp').hide();
		$("#screen-info-text").html("GYRO TYPE:<br>This parameter defines the type of gyro compass interface signal, the appropriate hardware connections and the ratio of the expected input signal for ship turning compensation.  Refer to the user manual for the list of accepted settings.   ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STm");}
	function pgtp(){$('#stp,#pgtp').show();$('#gotp,#plot').hide();
		$("#screen-info-text").html("POLANG TYPE:<br>This parameter defines the Polarization assemblys mode of operation.  For Auto Polarization mode set to 72, for manual polarization set to 9. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STn");}
	function plot(){$('#stp,#plot').show();$('#pgtp,#plse').hide();
		$("#screen-info-text").html("POL OFFSET:<br>This parameter is used to mechanically align (calibrate) the feed assembly to its center of range. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STo");}
	function plse(){$('#stp,#plse').show();$('#plot,#az1').hide();
		$("#screen-info-text").html("POL SCALE:<br>This parameter setting is used to define the Polang positional scale factor.  Leave this to factory default setting of 0090. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STp");}
	function az1(){$('#stp,#az1').show();$('#plse,#az2').hide();
		$("#screen-info-text").html("AZ LIMIT 1:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This lower limit represents the beginning of the blockage zone and is paired with Azimuth limit 2. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STq");}
	function az2(){$('#stp,#az2').show();$('#az1,#el12').hide();
		$("#screen-info-text").html("AZ LIMIT 2:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This upper limit represents the ending of the defined blockage zone and is paired with Azimuth limit 1. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STr");}
	function el12(){$('#stp,#el12').show();$('#az2,#az3').hide();
		$("#screen-info-text").html("EL LIMIT 12:<br>When desired, an Elevation limit may be assigned to a defined Azimuth blockage zone. This EL limit represents the Top of the blockage zone.  El limit 12 is paired with Azimuth limits 1 and 2. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STs");}
	function az3(){$('#stp,#az3').show();$('#el12,#az4').hide();
		$("#screen-info-text").html("AZ LIMIT 3:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This lower limit represents the beginning of the blockage zone. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STt");}
	function az4(){$('#stp,#az4').show();$('#az3,#el34').hide();
		$("#screen-info-text").html("AZ LIMIT 4:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This upper limit represents the ending of the defined blockage zone and is paired with Azimuth limit 3. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STu");}
	function el34(){$('#stp,#el34').show();$('#az4,#az5').hide();
		$("#screen-info-text").html("EL LIMIT 34:<br>When desired, an Elevation limit may be assigned to a defined Azimuth blockage zone. This EL limit represents the Top of the blockage zone.  El limit 34 is paired with Azimuth limits 3 and 4.");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STv");}
	function az5(){$('#stp,#az5').show();$('#el34,#az6').hide();
		$("#screen-info-text").html("AZ LIMIT 5:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This lower limit represents the beginning of the blockage zone and is paired with Azimuth limit 6. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STw");}
	function az6(){$('#stp,#az6').show();$('#az5,#el56').hide();
		$("#screen-info-text").html("AZ LIMIT 6:<br>The ACU can be programmed with relative azimuth sectors (zones) where blockage exists or where transmit power would endanger personnel who are frequently in that area.  This upper limit represents the ending of the defined blockage zone and is paired with Azimuth limit 5. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STx");}
	function el56(){$('#stp,#el56').show();$('#az6,#5vot').hide();
		$("#screen-info-text").html("EL LIMIT 56:<br>When desired, an Elevation limit may be assigned to a defined Azimuth blockage zone. This EL limit represents the Top of the blockage zone.  El limit 56 is paired with Azimuth limits 5 and 6. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STy");}
	function p5vot(){$('#stp,#5vot').show();$('#el56,#5plse').hide();
		$("#screen-info-text").html("5v OFFSET:<br>This parameter calibrates the 5V servo positional reference, for antenna's that are fitted with linear/circular switchable feed assemblies. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STz");}
	function p5plse(){$('#stp,#5plse').show();$('#5vot,#txpl').hide();
		$("#screen-info-text").html("5v SCALE:<br>This parameter defines the scale factor of the 5V servo motion scale for antenna's that are fitted with linear/circular switchable feed assemblies. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STaa");}
	function txpl(){$('#stp,#txpl').show();$('#5plse,#tkdp').hide();
		$("#screen-info-text").html("TX POLARITY:<br>This parameter defines the default transmit polarity of the feed assembly.<p>Related Parameters:</p>For ABS legacy systems, Adding System Type 8 (DAC-608 or later) reverses transmit state.");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STab");}
	function tkdp(){$('#stp,#tkdp').show();$('#txpl,#savep').hide();underline(295,80,1);
		$("#screen-info-text").html("TRACK DISP:<br>This parameter defines the viewable list of band selections in the Control Tracking sub-menu, which controls the Tone, Voltage, and Aux functions remotely on the antenna pedestal. ");
		$("#screen-info-center").html('<img src="images/S0.png">');flowchart("STac");}
	function stp(){$('#stp').show();$('#tkdp,#savep,#5vot,#el56').hide();underline(295,80,1);
		$("#screen-info-text").html("This display is read only and has no operational impact. ");
		$("#screen-info-center").html('<img src="images/S0.png">');}
	function savep(){$('#stp,#savep').show();$('#tkdp,#atrm').hide();underline(346,80,1);$("#OM2").css("color","black");screen_SM_mode();
		$("#screen-info-text").html("SAVE NEW PARAMETERS:<br>This display allows a user to submit all ACU settings into NVRAM.  To perform, press the right or left arrow and then press enter.  You will then receive a message confirming that the parameters were saved.  ");
		$("#screen-info-center").html('<img src="images/S32.png">');flowchart("STad");}
	var fncsetup = [atrm,eltrm,aztrm,attrs,elstp,azstp,stitg,srhinc,srhlm,srhdl,spic,smtp,gotp,pgtp,plot,plse,az1,az2,el12,az3,az4,el34,az5,az6,el56,stp,p5vot,p5plse,txpl,tkdp,stp,savep,stp];
	
	//function for enter button remote..
	function rmtcmd(){$('.rmt-cmd').show();$('.rmt-mon, .rmt-dish, .rmt-sat-ref, #tilt, #rmt-bal, #rmt-savep').hide();
		$("#screen-info-text").html("REMOTE COMMAND:<br>This display allows a user to issue above decks commands and/or queries.<br> ***This is non-functional in this emulator software***.");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STae");}
	function rmtmon(){$('.rmt-mon').show();$('.rmt-cmd,.rmt-dish').hide();
		$("#screen-info-text").html("REMOTE COMMAND:<br>This is a read only display that reports data from query request submitted via the Remote Command display");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STaf");}
	function rmtdish(){$('.rmt-dish').show();$('.rmt-mon,.rmt-sat-ref').hide();underline(329,80,1);
		$("#screen-info-text").html("DISHSCAN:<br>This parameter allows a user to toggle the antenna's DishScan state.  Refer to your antenna manual for details. ");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STag");}
	function rmtsatref(){$('.rmt-sat-ref').show();$('.rmt-dish,#rmt-tilt').hide();underline(329,80,1);
		$("#screen-info-text").html("SAT REF:<br>This parameter allows a user to enable or disable the SAT Reference feature. Refer to your antenna manual for details. ");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STah");}
	function rmttilt(){$('#rmt-tilt').show();$('.rmt-sat-ref,#rmt-bal').hide();underline(329,50,1);
		$("#screen-info-text").html("REMOTE TILT:<br>This mode is used to calibrate the level cage assembly to the horizon. Refer to your antenna manual for details. ");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STai");}
	function rmtbal(){$('#rmt-bal').show();$('#rmt-tilt,#rmt-savep').hide();underline(329,50,1);
		$("#screen-info-text").html("REMOTE BALANCE:<br>This mode is used and to turn off motor drive while keeping the system brakes disengaged to allow a technician to perform an antenna balance procedure. ");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STaj");}
	function rmtsavep(){$('#rmt-savep').show();$('#rmt-bal').hide();underline(329,50,1);
		$("#screen-info-text").html("REMOTE PARAMETERS:<br>This display allows a user to submit all PCU settings into NVRAM.  To perform, press the right or left arrow and then press enter.  You will then receive a message confirming that the parameters were saved. ");
		$("#screen-info-center").html('<img src="images/R0.png">');flowchart("STak");}
	var fncremote = [rmtcmd,rmtmon,rmtdish,rmtsatref,rmttilt,rmtbal,rmtsavep];
	
function underline(underline_L,underline_H,underline_LR){
	$("#udrline").css({"left":underline_L+"px","top":underline_H+"px"});
	Dac_variables.underline_start[0] = underline_LR;
	Dac_variables.underline_start[1] = underline_LR;
	
}
function underline_move(direction){
	var left = $("#udrline").position();
	left = left.left;
	if (direction === "L"){left = left-17;$("#udrline").css("left",left+"px");Dac_variables.underline_start[1]++;}
	else if (direction === "R"){left = left+17;$("#udrline").css("left",left+"px");Dac_variables.underline_start[1]--;}
	
	
}	
function underline_reset(){
	var left = $("#udrline").position();
	left = left.left;
	var difference = Dac_variables.underline_start[0]-Dac_variables.underline_start[1]
	
	$("#udrline").css("left",left-(difference*17)+"px");
	Dac_variables.underline_start[1] = Dac_variables.underline_start[0];
	$("#udrline").hide();
}
	
	


function Tdisp(update){
	//function for track disp..
	function Tdisp0a(){$('#trackb').html("&nbsp;C");}function Tdisp0b(){$('#trackb').html("&nbsp;X");}function Tdisp0c(){$('#trackb').html("&nbsp;KuLo");}function Tdisp0d(){$('#trackb').html("&nbsp;KuHi");}
	function Tdisp1a(){$('#trackb').html("&nbsp;C");}function Tdisp1b(){$('#trackb').html("&nbsp;X");}function Tdisp1c(){$('#trackb').html("&nbsp;KuLo");}function Tdisp1d(){$('#trackb').html("&nbsp;KuHi");}//sets reflector a/b....
	function Tdisp20a(){$('#trackb').html("CNV1A");}function Tdisp20b(){$('#trackb').html("CNV1B");}function Tdisp20c(){$('#trackb').html("CNV2A");}function Tdisp20d(){$('#trackb').html("CNV2B");}
	function Tdisp40a(){$('#trackb').html("Xp 13");}function Tdisp40b(){$('#trackb').html("Xp 18");}function Tdisp40c(){$('#trackb').html("Cp 13");}function Tdisp40d(){$('#trackb').html("Cp 18");}
	function Tdisp60a(){$('#trackb').html("LNB A");}function Tdisp60b(){$('#trackb').html("LNB B");}function Tdisp60c(){$('#trackb').html("LNB A");}function Tdisp60d(){$('#trackb').html("LNB B");}
	function Tdisp80a(){$('#trackb').html("&nbsp;RHCP");}function Tdisp80b(){$('#trackb').html("&nbsp;RHCP");}function Tdisp80c(){$('#trackb').html("&nbsp;LHCP");}function Tdisp80d(){$('#trackb').html("&nbsp;LHCP");}
	function Tdisp100a(){$('#trackb').html("PAOFF");}function Tdisp100b(){$('#trackb').html("PAOFF");}function Tdisp100c(){$('#trackb').html("&nbsp;PAON");}function Tdisp100d(){$('#trackb').html("&nbsp;PAON");}
	function Tdisp110a(){$('#trackb').html("&nbsp;PAON");}function Tdisp110b(){$('#trackb').html("&nbsp;PAON");}function Tdisp110c(){$('#trackb').html("PAOFF");}function Tdisp110d(){$('#trackb').html("PAOFF");}
	function Tdisp128a(){$('#trackb').html("Lin V");}function Tdisp128b(){$('#trackb').html("Lin H");}function Tdisp128c(){$('#trackb').html("Cir L");}function Tdisp128d(){$('#trackb').html("Cir R");}
	function Tdisp128e(){$('#trackb').html("XP B1");}function Tdisp128f(){$('#trackb').html("XP B2");}function Tdisp128g(){$('#trackb').html("XP B3");}function Tdisp128h(){$('#trackb').html("XP B4");}
	function Tdisp128i(){$('#trackb').html("CP B1");}function Tdisp128j(){$('#trackb').html("CP B2");}function Tdisp128k(){$('#trackb').html("CP B3");}function Tdisp128l(){$('#trackb').html("CP B4");}
	//set by relefector a/b and tx pol...
	function Tdisp130a(){$('#trackb').html("XP B1");}function Tdisp130b(){$('#trackb').html("XP B2");}function Tdisp130c(){$('#trackb').html("XP B3");}function Tdisp130d(){$('#trackb').html("XP B4");}
	function Tdisp130e(){$('#trackb').html("CP B1");}function Tdisp130f(){$('#trackb').html("CP B2");}function Tdisp130g(){$('#trackb').html("CP B3");}function Tdisp130h(){$('#trackb').html("CP B4");}
	
	var fncTdisp=[[Tdisp0a,Tdisp0b,Tdisp0c,Tdisp0d],[Tdisp1a,Tdisp1b,Tdisp1c,Tdisp1d],[Tdisp20a,Tdisp20b,Tdisp20c,Tdisp20d],[Tdisp40a,Tdisp40b,Tdisp40c,Tdisp40d],[Tdisp60a,Tdisp60b,Tdisp60c,Tdisp60d],[Tdisp80a,Tdisp80b,Tdisp80c,Tdisp80d],
				[Tdisp100a,Tdisp100b,Tdisp100c,Tdisp100d],[Tdisp110a,Tdisp110b,Tdisp110c,Tdisp110d],[Tdisp128a,Tdisp128b,Tdisp128c,Tdisp128d,Tdisp128e,Tdisp128f,Tdisp128g,Tdisp128h,Tdisp128i,Tdisp128j,Tdisp128k,Tdisp128l],
				[Tdisp130a,Tdisp130b,Tdisp130d,Tdisp130e,Tdisp130f,Tdisp130g,Tdisp130h,]];
	var a =[0,1,20,40,60,80,100,110,128,130];
	for (i=0;i<=9;i++){

		if (update == 1 && a[i] == parseFloat($('#tkdpa').text())){fncTdisp[i][etdisp]();}
		else if (a[i] == parseFloat($('#tkdpa').text())){
				if (etdisp < fncTdisp[i].length - 1){etdisp++;}
				else {etdisp = 0;}fncTdisp[i][etdisp]();}
	}
	
}	
function screen_OP_mode(){$("#OM0").css("border","4px solid white");$("#SM0").css("border","4px solid #00A4F2");$("#screen-info-right-line").css("top","20px");}
function screen_SM_mode(){$("#OM0").css("border","4px solid #00A4F2");$("#SM0").css("border","4px solid white");$("#screen-info-right-line").css("top","126px");}
function flowchart(fl_ch){$("#screen-flowchart .A div").css({"background-color":"#53870A","border":"2px solid white"});
	$("#screen-flowchart .B div").css({"background-color":"#53870A","border":"2px solid white"});
	$('#'+fl_ch).css({"background-color":"#80D110","border":"2px solid #00A4F2"});
	}




	function LEDflash() {
		if (vtarget == 1){$("#track_led").css( "backgroundColor","" );}
		else if (satellite_agc[0]>= $("#thrsa").html()){$("#track_led").css( "backgroundColor","rgb(0, 255, 0)" );
			if (Search_variables.srh_tout == 0){Search_variables.srh_tout=0;}
			else {Search_variables.srh_tout--;}
			;}
		else {Search_variables.srh_tout++;
			if ($('#track_led').css('background-color') == "rgb(0, 255, 0)"){$('#track_led').css("background-color", "");}
			else {$('#track_led').css("background-color", "rgb(0, 255, 0)");}
		;}
		
		if (Search_variables.srh_tout >= +$('#srhdla').text()){
			if(vblockage[0] != 0){vtarget = 1;$("#track_led").css( "backgroundColor","" );clearInterval(tmr_trackLED);}//if blocked re-target
			else {search();$('#tracka').html("&nbsp;tMUTE");}
			}
		
	}
//Search

	//continue with search
	function search_Con(){Search_variables.srh_tout = 0;$("#track_led").css( "backgroundColor","" );clearInterval(tmr_trackLED);
			$("#search_led").css( "backgroundColor","rgb(255, 255, 0)" );
		if (nid_lock == 0&& vrot == vantaza && vrotel == vantel){if ($('#gotpa').text() == 0){search_on = 3;}
			else if ($('#satellite #satb').text().substr(4,1) == 0){search_on = 1;}
			else if ($('#satellite #satb').text().substr(4,1) % 2 != 0){search_on = 2;$("#srhid").html();}
			else {search_on = 1;}
			vantaza=+Search_variables.target_az_stop;vantel=+Search_variables.target_el_stop;
			nid_lock = 1;search();
		}
		else {clearTimeout(Search_variables.tmr_search_Con);Search_variables.tmr_search_Con = setTimeout(function(){ search_Con(); }, 500);$('#tracka').html("&nbsp;tMUTE");}
	}
	//reload settings after a target
	function search_target(){
		Search_variables.srch_inc = ($("#srhinca").text()/10);
			Search_variables.srch_inca = 1;
			Search_variables.srch_incb = 0;
			Search_variables.sweep_inc = ($("#spica").text()/12).toFixed(0);
			Search_variables.sweep_inca = +(Search_variables.sweep_inc / 2).toFixed(0);
			Search_variables.search_step = 0;
			Search_variables.target_az_stop = Search_variables.search_az_stop = vantaza;
			Search_variables.target_el_stop = Search_variables.search_el_stop = vantel;
	}
	//search pattern
	
	function search() {
		
		if (nid_lock_wait > 0){nid_lock_wait--}
		else {nid_lock_wait = 0;}
		$('#b6').html("NID lock "+nid_lock+"<br>NID wait "+nid_lock_wait);
		if (Search_variables.srh_tout != 0){Search_variables.srh_tout = 0;$("#track_led").css( "backgroundColor","" );clearInterval(tmr_trackLED);
			$("#search_led").css( "backgroundColor","rgb(255, 255, 0)" );
			Search_variables.search_el = $("#ela").text();
			Search_variables.math_cos = (1*(Math.cos((vk13)*(Math.PI/180)))).toFixed(1);
			Search_variables.math_sin = (1*(Math.sin((vk13)*(Math.PI/180)))).toFixed(1);
			math_cosa = (1*(Math.cos((vk13-90)*(Math.PI/180)))).toFixed(1);
			math_sina = (1*(Math.sin((vk13-90)*(Math.PI/180)))).toFixed(1);
			search_target();
			if ($('#gotpa').text() == 0){search_on = 3;}// no gyro mode
			else if ($('#satellite #satb').text().substr(4,1) == 0){search_on = 1;}//nomral search
			else if ($('#satellite #satb').text().substr(4,1) % 2 != 0){search_on = 2;$("#srhid").html();}//inclined search
			else {search_on = 1;}// normal search
			if (nid_lock_wait > 0){nid_lock_wait--}
			else {nid_lock_wait = 0;}
		$('#tracka').html("&nbsp;tMUTE");
		}
		
		else if (satellite_agc[0] > $("#thrsa").text()&&nid_lock_wait == 0){$('#Track').click();$('#Track').click();vantaza = vrot;Search_variables.search_az_stop = vantaza;vantel = vrotel;Search_variables.search_el_stop = vantel;}
		
		else if (search_on == 1 && +vrotel > (+Search_variables.search_el - ($("#srh_limit").text()/10)/2)){
			if (vrotel == (+vantel).toFixed(1) && Search_variables.search_step == 0){vantaza = vantaza + (Search_variables.srch_inc*Search_variables.srch_inca);$("#srhid").text(0);Search_variables.search_step=1;}	
			else if (vrot == vantaza && Search_variables.search_step == 1){vantel = +vantel + (Search_variables.srch_inc*Search_variables.srch_inca);Search_variables.srch_inca++;$("#srhid").html(1);Search_variables.search_step=2;}
			else if (vrotel == (+vantel).toFixed(1) && Search_variables.search_step == 2){vantaza = vantaza - (Search_variables.srch_inc*Search_variables.srch_inca);$("#srhid").html(2);Search_variables.search_step=3;}
			else if (vrot == vantaza && Search_variables.search_step == 3){vantel = +vantel - (Search_variables.srch_inc*Search_variables.srch_inca);Search_variables.srch_inca++;$("#srhid").html(3);Search_variables.search_step=0;}
			Search_variables.target_az_stop = vantaza;Search_variables.target_el_stop = vantel;
		}
		//inclinded search
		else if (search_on == 2 && Search_variables.srch_inca < ($("#srh_limit").text()/10)){
			
			if (vrot == vantaza & vrotel == vantel){
				if (Search_variables.sweep_inca < Search_variables.sweep_inc && Search_variables.search_step == 0){vantel = (+vantel + +Search_variables.math_cos).toFixed(1);vantaza = (+vantaza + +Search_variables.math_sin).toFixed(1);Search_variables.sweep_inca++;}
				else if (Search_variables.sweep_inca == Search_variables.sweep_inc & Search_variables.search_step == 0){Search_variables.search_step = 1;}
				else if (Search_variables.sweep_inca > 0 & Search_variables.search_step == 1){vantel = (+vantel - +Search_variables.math_cos).toFixed(1); vantaza = (+vantaza - +Search_variables.math_sin).toFixed(1);Search_variables.sweep_inca--;}
				else if (Search_variables.sweep_inca == 0 & Search_variables.search_step == 1){Search_variables.search_step = 2;}
				else if (Search_variables.sweep_inca == 0 & Search_variables.search_step == 2 & Search_variables.srch_incb < Search_variables.srch_inca){vantel = (+vantel - +math_cosa).toFixed(1); vantaza = (+vantaza - +math_sina).toFixed(1);Search_variables.srch_incb++;}
				else if (Search_variables.sweep_inca == 0 & Search_variables.search_step == 2 & Search_variables.srch_incb == Search_variables.srch_inca){Search_variables.search_step = 3;Search_variables.srch_incb =0; Search_variables.srch_inca++;}
				else if (Search_variables.sweep_inca < Search_variables.sweep_inc & Search_variables.search_step == 3){vantel = (+vantel + +Search_variables.math_cos).toFixed(1); vantaza = (+vantaza + +Search_variables.math_sin).toFixed(1);Search_variables.sweep_inca++;}
				else if (Search_variables.sweep_inca == Search_variables.sweep_inc & Search_variables.search_step == 3){Search_variables.search_step = 4;}
				else if (Search_variables.sweep_inca == Search_variables.sweep_inc & Search_variables.search_step == 4 & Search_variables.srch_incb < Search_variables.srch_inca){vantel = (+vantel + +math_cosa).toFixed(1); vantaza = (+vantaza + +math_sina).toFixed(1);Search_variables.srch_incb++;}
				else if (Search_variables.sweep_inca == Search_variables.sweep_inc & Search_variables.search_step == 4 & Search_variables.srch_incb == Search_variables.srch_inca){Search_variables.search_step = 1;Search_variables.srch_incb =0; Search_variables.srch_inca++;}
			Search_variables.target_az_stop = vantaza;Search_variables.target_el_stop = vantel;	
			}
		}
		//no gyro search
		else if (search_on == 3 && +vrotel > (+Search_variables.search_el - ($("#srh_limit").text()/10)/2)){
			if (vrotel == (+vantel).toFixed(1) && Search_variables.search_step == 0){if (no_gyro_limit != 4500){$("#srhid").html(0);}else {Search_variables.search_step=1;};}	//no gyro limit counts to add 450 degs to AZ.
			else if (vrot == (vantaza).toFixed(1) && Search_variables.search_step == 1){vantel = +vantel + (Search_variables.srch_inc*Search_variables.srch_inca);Search_variables.srch_inca++;$("#srhid").html(1);Search_variables.search_step=2;}
			else if (vrotel == (+vantel).toFixed(1) && Search_variables.search_step == 2){if (no_gyro_limit != 0){$("#srhid").html(2);}else {Search_variables.search_step=3;};}
			else if (vrot == (vantaza).toFixed(1) && Search_variables.search_step == 3){vantel = +vantel - (Search_variables.srch_inc*Search_variables.srch_inca);Search_variables.srch_inca++;$("#srhid").html(3);Search_variables.search_step=0;}
		Search_variables.target_az_stop = vantaza;Search_variables.target_el_stop = vantel;
		}
		else if (search_on != 0){
			search_on = 0;comp();;
			vtarget =1;
			$("#search_led").css( "backgroundColor","" );}
		
		
	}
//End of Search
	

	
	
//End of Tracking
var tmr_error = setInterval(error ,1000);
var err = 0;
var err1 = 0;
var err2 = 0;
function clear_error(){err=0;err1=0;err2=0;}
function error(){
	if (err1 == 0 & $("#rmt-dish").text() == "OFF"){err = err + 16; err1 = 1;}
	if (err2 == 0 & vantel <= 0 & vtarget == 1){err = err + 128; err2 = 1;}
	if (err != 0){$("#error_led").css("backgroundColor","red");}
	else {$("#error_led").css("backgroundColor","");}
	$("#errb").html(("0000"+err).slice(-4));
	
}
function gps_hdg_update(){
	$("#lat .d2").html(("0"+((+$('#input-lat').val()).toFixed(1))).slice(-4));
	$("#lon .d3").html(("000"+((+$('#input-lon').val()).toFixed(1))).slice(-5));
	if ($("#input-hdg").val() > 359.9){alert("value can be 0.0 to 359.9");
		if ($("#input-hdg").val() >= 720){$("#input-hdg").val($("#input-hdg").val()-720);}
		else if ($("#input-hdg").val() >= 360){$("#input-hdg").val($("#input-hdg").val()-360);}
	}
	
	if (($("#gotpa").text() == "0002")||($("#gotpa").text() == "0360")){
		$("#hdg .d3").html(("000"+((+$('#input-hdg').val()).toFixed(1))).slice(-5));}
	else {$("#hdg .d3").html($("#hdg .d3").html());}
	vrothdg = parseFloat($("#hdg1").text());
	$("#antlata").html("&nbsp;"+$('#input-lat-pos').val());
	$("#antlona").html("&nbsp;"+$('#input-lon-pos').val());
	
}
$(document).ready(function(){
	var LR = Dac_variables.underline_start[1];
	var vblock = 0;
	var subenter = 0;
	var txt = 0;
	var tunercard = 0;
	var counter =0;
	var enter = 3;
	var tmr = setInterval(function () {statsrn()}, 2000);
	var LR_test = "test";
	function statsrn(){
	if($('#status').is(':visible')){
					enter--;
				if (enter <= 0){enter = 0;clearInterval(tmr);Dac_variables.stopenter = 0;}
				else {enter = enter;}
				
				fncstatusupdown[enter]();}
	}
//revision screen
$('#revision_page_show').click(function(){$('#revision_page').fadeIn(1000);});
//screen and button information
$('#information').click(function(){if($('#satellite_settings').is(':visible')){$('#satellite_settings').fadeOut(1000);}
	else if ($('#revision_page').is(':visible')){$('#revision_page').fadeOut(1000);}
	else{$("#simulator-screen").fadeToggle(1000);$("#information-screen").fadeToggle(1000);}
	});
$('#scn_settings').click(function (){$('#satellite_settings').fadeToggle(1000);$('#revision_page').hide(1000);});
$('#lights').click(function(){$("#lights-info").toggle(1000, function(){
	if ($("#lights-info").is(':visible')){$('#lights span').css({"top":"5px","border-left": "8px solid transparent","border-right": "8px solid transparent","border-top": "8px solid #00A4F2"});}
	else{$('#lights span').css({"top":"0px","border-top":"8px solid transparent","border-bottom": "8px solid transparent","border-left": "8px solid #00A4F2"});}
	});
});
$('#screen-discriptions-show').click(function(){$("#button-discriptions").fadeToggle(1000);$("#screen-discriptions").fadeToggle(1000);$("#lights").fadeToggle(1000);$("#flowchart").fadeToggle(1000);});
$('#screen-buttons-show').click(function(){$("#button-discriptions").fadeToggle(1000);$("#screen-discriptions").fadeToggle(1000);$("#lights").fadeToggle(1000);$("#flowchart").fadeToggle(1000);});
$('#flowchart').click(function(){
	if ($("#setup").is(':visible')||$("#remote-screen").is(':visible')){$("#flowchart-setup").show();$("#flowchart-operation").hide();}
	else {$("#flowchart-operation").show();$("#flowchart-setup").hide();}
	$("#screen-flowchart").toggle(800, function(){
		if ($("#screen-flowchart").is(':visible')){$('#flowchart span').css({"top":"5px","border-left": "8px solid transparent","border-right": "8px solid transparent","border-top": "8px solid #00A4F2"});}
		else{$('#flowchart span').css({"top":"0px","border-top":"8px solid transparent","border-bottom": "8px solid transparent","border-left": "8px solid #00A4F2"});}
	});}
	);

// end of screen and button information
// lat,lon and heading default values
$("#vessel_info").click(function(){$("#vessel_input").show(800);$("#vessel_info").hide(800);});
$("#vessel_info_x").click(function(){$("#vessel_input").hide(800);$("#vessel_info").show(800);});
$("#vessel_input .vessel_gps_input").change(function(){latlon();gps_hdg_update();sat_location_remove();});
$("#vessel_input select").change(function(){gps_hdg_update();sat_location_remove();});
$("#vessel_input .vessel_heading_input").change(function(){gps_hdg_update();});
// end of lat,lon and heading default values

//sat presets
$("#sat1_preset input, #sat1_preset select").change(function(){sat_1[0] = $('#sat1_preset input').val()+$('#sat1_preset select').val();sat_location_remove();$('#sat1_preset .nid').val(("000"+$('#sat1_preset .nid').val().toUpperCase()).slice(-4));});

$("#sat2_preset input, #sat2_preset select").change(function(){sat_2[0] = $('#sat2_preset input').val()+$('#sat2_preset select').val();sat_location_remove();$('#sat2_preset .nid').val(("000"+$('#sat2_preset .nid').val().toUpperCase()).slice(-4));});
$("#sat3_preset input, #sat3_preset select").change(function(){sat_3[0] = $('#sat3_preset input').val()+$('#sat3_preset select').val();sat_location_remove();$('#sat3_preset .nid').val(("000"+$('#sat3_preset .nid').val().toUpperCase()).slice(-4));});
$("#sat4_preset input, #sat4_preset select").change(function(){sat_4[0] = $('#sat4_preset input').val()+$('#sat4_preset select').val();sat_location_remove();$('#sat4_preset .nid').val(("000"+$('#sat4_preset .nid').val().toUpperCase()).slice(-4));});
function preset_screen(mode){
	
	
}
//end of sat presets

//up down button control....
function menu_up(){
	if ($('#status1').is(':visible')){
		if (enter == 0){enter = 0;}
		else {enter--;fncstatus1[enter]();}
	}
	else if ($('#setup').is(':visible')){
		if (unlock == 1){
			if (enter == 0){$('#status1').show();$('#setup').hide();enter = 3;fncstatus1[3]();}
			else {enter--;fncsetup[enter]();
				}
		;}
		else {$('#status1').show();$('#setup').hide();enter = 3;fncstatus1[3]();}
		
	}
	else if ($('#remote-screen').is(':visible')){
		if (enter == 0){$('#setup').show();$('#remote-screen').hide();enter = (fncsetup.length - 1);fncsetup[enter]();}
		else {enter--;fncremote[enter]();
			}
		
	}
	else if($('#ship').is(':visible')){
		if (enter == 1 ){enter = (fncshipenter.length-1);}
		else {enter--;}
		fncshipenter[enter]();
	}
	else if($('#satellite').is(':visible')){
		if (enter == 1){enter = (fncsatenter.length - 1);}
		else {enter--;}
		fncsatenter[enter]();
	}
	else if($('#antenna').is(':visible')){
		if (enter ==1 ){enter = (fncantenter.length - 1);}
		else {enter--;}
		fncantenter[enter]();
	}
	if ($('.d2').is(':visible')){txt = parseFloat($('.d2:visible').text());}
		else if ($('.d3').is(':visible')){txt = parseFloat($('.d3:visible').text());}
		else if ($('.d4').is(':visible')){txt = parseFloat($('.d4:visible').text());}
		else if ($('.d5').is(':visible')){txt = parseFloat($('.d5:visible').text());}
		else if ($('#eltrma').is(':visible')){txt = parseFloat($('#eltrma').text());}
		else if ($('#aztrma').is(':visible')){txt = parseFloat($('#aztrma').text());}
		else {txt= txt}
};

function menu_dwn(){
	
	if ($('#status1').is(':visible')){
		if ((enter == 3)&(unlock == 1)){$('#status1').hide();$('#setup').show();enter = 0;fncsetup[enter]();}
		else if ((enter == 3)&(unlock == 0)){enter = enter;}
		else {enter++;fncstatus1[enter]();}
		
		
	}
	else if ($('#setup').is(':visible')){
		if (enter == fncsetup.length - 1){$('#setup').hide();$('#remote-screen').show();enter = 0;fncremote[enter]();}
		else {enter++;fncsetup[enter]();}
			
	}
	else if ($('#remote-screen').is(':visible')){
		if (enter == fncremote.length - 1){enter = enter;}
		else {enter++;fncremote[enter]();
		}
			
	}
	else if($('#ship').is(':visible')){
		enter = parseFloat(enter) + parseFloat(1);
		if (enter > (fncshipenter.length - 1)){enter = 1;}
		else {enter = enter;}
		fncshipenter[enter]();
	}
	else if($('#satellite').is(':visible')){
		enter = parseFloat(enter) + parseFloat(1);
		if (enter > (fncsatenter.length - 1)){enter = 1;}
		else {enter = enter;}
		fncsatenter[enter]();
	}
	else if($('#antenna').is(':visible')){
		enter = parseFloat(enter) + parseFloat(1);
		if (enter > (fncantenter.length - 1)){enter = 1;}
		else {enter = enter;}
		fncantenter[enter]();
	}
	if ($('.d2').is(':visible')){txt = parseFloat($('.d2:visible').text());}
		else if ($('.d3').is(':visible')){txt = parseFloat($('.d3:visible').text());}
		else if ($('.d4').is(':visible')){txt = parseFloat($('.d4:visible').text());}
		else if ($('.d5').is(':visible')){txt = parseFloat($('.d5:visible').text());}
		else if ($('#eltrma').is(':visible')){txt = parseFloat($('#eltrma').text());}
		else if ($('#aztrma').is(':visible')){txt = parseFloat($('#aztrma').text());}
		else {txt= txt}
};


//end of up down button control...



$('#tunercard').click(function(){
	
			if (tunercard == 0){tunercard = 1;$("#tunercard").text("Switch to DVB-S2 Tunercard");$('#feca').html("FEC&nbsp;&nbsp;&nbsp");$('#fecb').html(arrFec[0]);$("#dvbso").html("&nbsp;&nbsp;&nbsp;SCPC VER 5.53");}
			else if (tunercard == 1){tunercard = 2;$("#tunercard").text("Switch to DVB-S Tunercard");$('#feca').html("FEC&nbsp;&nbsp");$('#fecb').html(arrFecS2[0]);$("#dvbso").html("&nbsp;&nbsp;&nbsp;&nbsp;DVB VER 7.00");}
			else {tunercard = 0; $("#tunercard").text("Switch to SCPC Tunercard");$('#feca').html("FEC&nbsp;&nbsp;&nbsp");$('#fecb').html(arrFec[0]);$("#dvbso").html("&nbsp;&nbsp;&nbsp;&nbsp;DVB VER 4.02");}
			satellite_settings();
			
		});
satellite_settings();
function satellite_settings(){
	$('#satellite_settings .fec').empty();
	if (tunercard == 0 || tunercard == 1){
		for(i=0;i<=arrFec.length-1;i++)
			{$('#satellite_settings .fec').append('<option value="'+arrFec[i]+'">'+arrFec[i]+'</option>');}
	}
	else {for(i=0;i<=arrFecS2.length-1;i++)
			{$('#satellite_settings .fec').append('<option value="'+arrFecS2[i]+'">'+arrFecS2[i]+'</option>');}
		}
	
}
$('.fec').change(function (){
var ida = this.parentNode.id;
	if ($('#'+ida+' .fec').val() == "SCPC"){$('#'+ida+' .freq_text').html("MHz");$('#'+ida+' .baud_text').hide();$('#'+ida+' .khz_text').show();}
	else {$('#'+ida+' .freq_text').html("Freq");$('#'+ida+' .baud_text').show();$('#'+ida+' .khz_text').hide();}
	
	
})


	$('#Track').click(function(){
			if ($('#tracka').html() == "&nbsp;&nbsp;&nbsp;ON&nbsp;"||$('#tracka').html() == "&nbsp;tMUTE" || vtarget == 1){$('#tracka').html("&nbsp;&nbsp;&nbsp;OFF");$("#track_led").css( "backgroundColor","" );clearInterval(tmr_trackLED);clearTimeout(tmr_nid_check);Search_variables.srh_tout = 0;search_on=0;$("#search_led").css( "backgroundColor","" );tmr=1;}
			else {$('#tracka').html("&nbsp;&nbsp;&nbsp;ON&nbsp;");$("#track_led").css( "backgroundColor","rgb(0, 255, 0)" );clearInterval(tmr_trackLED);
				tmr_trackLED = setInterval(LEDflash ,1000);tmr=0;}
	});


	$('#Next').click(function(){
		Dac_variables.stopenter = 0;
		$("#udrline").hide();
		if ($('#setup').is(':visible')||$('#status1').is(':visible')||$('#remote-screen').is(':visible')){
			fncstatus1[0]();fncsetup[0]();fncremote[0]();fncstatusupdown[0]();
			fncnext[0]();enter=0;$('#status').show();$('#setup,#status1,#remote-screen').hide();
		}
		else if(enter > 0){
			if(Dac_variables.next == 0){fncstatusupdown[0]();fncnext[0]();}
			else if(Dac_variables.next == 1){fncshipenter[0]();fncnext[1]();}
			else if(Dac_variables.next == 2){fncsatenter[0]();fncnext[2]();}
			else {fncantenter[0]();fncnext[3]();}
			enter = 0;
		}
		else {enter = 0;
			Dac_variables.next++;
			if (Dac_variables.next > 3){Dac_variables.next = 0;}
			else {Dac_variables.next = Dac_variables.next;}
				fncshipenter[0]();
				fncsatenter[0]();
				fncantenter[0]();
				fncnext[Dac_variables.next]();}
	});
	//change menu..
	$('#Enter').click(function(){

		if (Dac_variables.stopenter == 0){	
			
			subenter = 0;
			
			if ($("#udrline").is(':hidden')){
				if ($('#status').is(':visible')){enter = 0;
					fncstatus1[0]();
					$('#status').hide();$('#status1').show();
					
				
				}
				else if ($('#status1').is(':visible')||$('#setup').is(':visible')||$('#remote-screen').is(':visible')){menu_dwn(enter);}
				else if ($('#ship').is(':visible')||$('#satellite').is(':visible')||$('#antenna').is(':visible')){menu_dwn(enter);}
			}
			else if ($("#udrline").is(':visible')&$("#lat, #lon, #hdg, #gotpa").is(':visible')){
				gps_hdg_update();underline_reset();
				
			}
	
			else if ($("#udrline").is(':visible') & $("#err").is(':visible')){clear_error();underline_reset();}
			else if ($("#udrline").is(':visible')&$('#savep').is(':visible')){
				$('#savep').html("PARAMETERS&nbsp;SAVED&nbsp");underline_reset();
				counter = setTimeout(function(){$('#savep').html("SAVE&nbsp;NEW&nbsp;PARAMETERS");}, 2000);
			}
			else if ($("#udrline").is(':visible')&($('#rmt-dish').is(':visible')||($('#rmt-sat-ref').is(':visible')))){underline_reset();}
			else if ($("#udrline").is(':visible')&$('#rmt-savep').is(':visible')){
				$('#rmt-saveps').show();underline_reset();
				counter = setTimeout(function(){$('#rmt-saveps').hide();}, 2000);
			}
			else if ($("#udrline").is(':visible')&$('#rmt-bal').is(':visible')){
				$('#rmt-bal').html("REMOTE&nbsp;BALANCE");underline_reset();
			}
			else if ($("#udrline").is(':visible')&$('#satb').is(':visible')){
				vtarget =1;
				comp();
				
				underline_reset();
			}
			else if ($("#udrline").is(':visible')&($('#txpl').is(':visible')||$('#plot').is(':visible'))){
				vpolcal();
				underline_reset();
			}
			else if ($("#udrline").is(':visible')&$("#atrm").is(':visible')){
				if(($('#tracka').html() == "&nbsp;&nbsp;&nbsp;ON&nbsp;")&&(satellite_agc[0] > $("#thrsa").text())){
					Dac_variables.vaztrim = (vantazb - ($("#aza").text() - Dac_variables.vaztrim)).toFixed(1);
					Dac_variables.veltrim = (vantelb - ($("#ela").text() - Dac_variables.veltrim)).toFixed(1);
					var azminus="";
					if (Dac_variables.vaztrim <= 0){azminus = "-";}
					else {azminus = "&nbsp;"}
					$("#aztrma").html(azminus +("0000"+(Math.abs(Dac_variables.vaztrim*10))).slice(-4));
					var elminus="";
					if (Dac_variables.veltrim <= 0){elminus = "-";}
					else {elminus = "&nbsp;"}
					$("#eltrma").html(elminus +("0000"+(Math.abs(Dac_variables.veltrim*10))).slice(-4));
					$("#atrm").html("&nbsp;AUTO&nbsp;TRIM&nbsp;COMPLETED");
					vtarget = 1;vcompass();
				}
				else {$("#atrm").html("&nbsp;AUTO&nbsp;TRIM&nbsp;BLOCKED");}

				underline_reset();}
			else if ($("#udrline").is(':visible')&$('#aztrma').is(':visible')){
				Dac_variables.vaztrim = $("#aztrma").text()/10;
				underline_reset();
			}
			else if ($("#udrline").is(':visible')&$('#eltrma').is(':visible')){
				Dac_variables.veltrim = $("#eltrma").text()/10;
				underline_reset();
			}
			else if ($("#udrline").is(':visible')&&$('#azb').is(':visible')){$("#azb").hide();$("#aza").show();vantaza = ($("#azb").text()- +Dac_variables.vaztrim);underline_reset();vtarget =2;}
			else if ($("#udrline").is(':visible')&&$('#elb').is(':visible')){$("#elb").hide();$("#ela").show();vantel = ($("#elb").text()- +Dac_variables.veltrim);underline_reset();vtarget =2;}
			else if ($("#udrline").is(':visible')&&$('#tkdpa').is(':visible')){Tdisp(1);underline_reset();}
			else if ($("#udrline").is(':visible')&&$('#az1a, #az2a, #el12a, #az3a, #az3a, #el34a, #az5a, #az6a, #el56a').is(':visible')){compass_vessel();underline_reset();}
			else {underline_reset();}
			
			if($('#antenna').is(':visible')){azel();}
			
			
			$('#LandR').text(Dac_variables.underline_start[1]);
			$('#subentervalue').text(subenter);
		;}
	});
	
		//Left button....
		$('#Left').click(function(){
			if ($('#antenna').is(':visible')&&(enter==0)){
				vantaza=((vantaza*10 - 0.2*10)/10);vcompass();
			}
			else if ($('#rmt-bal').is(':visible')){$("#udrline").show();
				$('#rmt-bal').html("REMOTE&nbsp;BALANCE&nbsp;&nbsp;ON");
			}
			else if($('#track').is(':visible')){//track screen limit underline to the right...
					$('#LandR').text(Dac_variables.underline_start[1]);$("#udrline").show();
					underline_move("L");
			}
			else if ($('#aza').is(':visible')){$("#aza").hide();$("#azb").show();$("#azb").text(("00"+(+vaza + +Dac_variables.vaztrim).toFixed(1)).slice(-5));$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("L");
					}
			else if ($('#ela').is(':visible')){$("#ela").hide();$("#elb").show();$("#elb").text(("00"+(+vela + +Dac_variables.veltrim).toFixed(1)).slice(-5));$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("L");}
			else if ($("#atrm").is(':visible')){$("#udrline").show();}
			else if (enter !=0){$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("L");
					}
			
			
			
		});
		//Right button...
		$('#Right').click(function(){
			if ($('#antenna').is(':visible')&&(enter==0)){
				vantaza=((vantaza*10 + 0.2*10)/10);vcompass();
			}
			else if ($('#rmt-bal').is(':visible')){$("#udrline").show();
				$('#rmt-bal').html("REMOTE&nbsp;BALANCE&nbsp;&nbsp;ON");
			}
			else if($('#track').is(':visible')){//track screen limit underline to the right...
					if (Dac_variables.underline_start[1] == 1){Dac_variables.underline_start[1]=1}
					else{$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("R");
					}
			}
			else if ($('#aza').is(':visible')){$("#aza").hide();$("#azb").show();$("#azb").text(("00"+(+vaza + +Dac_variables.vaztrim).toFixed(1)).slice(-5));$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("R");}
			else if ($('#ela').is(':visible')){$("#ela").hide();$("#elb").show();$("#elb").text(("00"+(+vela + +Dac_variables.veltrim).toFixed(1)).slice(-5));$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("R");}
			else if ($("#atrm").is(':visible')){$("#udrline").show();}
			else if (enter !=0) {$('#LandR').text(Dac_variables.underline_start[1]);
					$("#udrline").show();
					underline_move("R");
				}
			
			
		});
		//Both L and R button...
		
		$('#Both').mousedown(function(){
			fncnext[0]();Dac_variables.next=0;
			fncshipenter[0]();
			fncsatenter[0]();
			fncantenter[0]();$('#status,#status1,#remote-screen').hide();$('#setup').show();
			fncsetup[0]();
			enter = (fncsetup.length-2);
			fncsetup[enter]();
			counter = setTimeout(function(){fncsetup[0]();enter = 0;unlock = 1;}, 2000);
		
		});
		$('#Both').mouseup(function(){clearTimeout(counter);});
			
			
		//status menu for software...
		
		$('#Up').click(function(){
			if ($("#udrline").is(':hidden')){
				if($('#status').is(':visible')){
						enter = parseFloat(enter) + parseFloat(1);
					if (enter > 3){enter = 3;}
					else {enter = enter;}
					
					fncstatusupdown[enter]();}
				
				else if ($('#antenna').is(':visible')&&(enter==0)){
						vantel=((vantel*10 + 0.2*10)/10);vcompass();
				}
				else if (($('#ship').is(':visible')||$('#satellite').is(':visible')||$('#antenna').is(':visible'))&&(enter>=1)){menu_up(enter);}
				else if ($('#status1').is(':visible')||$('#setup').is(':visible')||$('#remote-screen').is(':visible')){menu_up(enter);}
				
			}
			else{
				if ($('#track').is(':visible')){
					
					if ((Dac_variables.underline_start[1] == 1)&&(vblock < 1)){vblock++;}
					else if ((Dac_variables.underline_start[1] == 1)&&(vblock == 1)){$('#tracka').hide();$('#block').show();}
					else if($('#block').is(':visible')&&(Dac_variables.underline_start[1] >= 2)){
						if (vblock == 0){
							$('#tracka').show();$('#block').hide();}
						else{vblock--;}
					}
					else if ((Dac_variables.underline_start[1] >= 2)&(vblock == 0)){$('#Track').click();}
				}
				else if((Dac_variables.underline_start[1] < -1)&$('.nsew').is(':visible')){
							if ($('.nsew:visible').html() == "&nbsp;N"){$('.nsew:visible').html("&nbsp;S");}
							else if ($('.nsew:visible').html() == "&nbsp;E"){$('.nsew:visible').html("&nbsp;W");}
							else if ($('.nsew:visible').html() == "&nbsp;W"){$('.nsew:visible').html("&nbsp;E");}
							else if ($('.nsew:visible').html() == "&nbsp;A"){$('.nsew:visible').html("&nbsp;B");}
							else if ($('.nsew:visible').html() == "&nbsp;B"){$('.nsew:visible').html("&nbsp;A");}
							else{$('.nsew:visible').html("&nbsp;N");}
						}
				
				else if ((Dac_variables.underline_start[1] >= 1)&$('#tone').is(':visible')){
							if ($('#toneval:visible').html() == "OFF"){$('#toneval:visible').html("ON");}
							else{$('#toneval:visible').html("OFF");}
						}
				else if((Dac_variables.underline_start[1] >= 1)&$('#volt').is(':visible')){
						subenter = arrVolt.indexOf($('#volta').html());
						subenter++;
						if (subenter < 0){subenter = arrVolt.length -1;}
						else if (subenter > arrVolt.length -1){subenter = 0;}
						else {subenter = subenter;}
						$('#volta').html(arrVolt[subenter]);
					}
				else if((Dac_variables.underline_start[1] >= 1)&$('#fec').is(':visible')){
					if (tunercard == 2){subenter = arrFecS2.indexOf($('#fecb').html());
						subenter++;
						if (subenter < 0){subenter = arrFecS2.length -1;}
						else if (subenter > arrFecS2.length -1){subenter = 0;}
						else {subenter = subenter;}
						if (subenter > 15){$('#feca').html("FEC&nbsp");}
						else {$('#feca').html("FEC&nbsp;&nbsp");}
						$('#fecb').html(arrFecS2[subenter]);
					}
					else {subenter = arrFec.indexOf($('#fecb').html());
						subenter++;
						if (subenter < 0){subenter = arrFec.length -1;}
						else if (subenter > arrFec.length -1){subenter = 0;}
						else {subenter = subenter;}
						$('#fecb').html(arrFec[subenter]);
					}
					if($('#fecb').html()=="SCPC"){preset_screen($('#fecb').html());}
					else{preset_screen($('#fecb').html());}
				}
				else if((Dac_variables.underline_start[1] >= 1)&$('#skew').is(':visible')){
						var skewval = parseFloat($("#skval").text());
						{skewval++;}
						if (skewval > 90){skewval = (-90);}
						if (skewval >= 0){$('#skval').html("&nbsp;"+("0000" + skewval).slice(-4));}
						else if (skewval <0){$('#skval').html("-"+("0000" + Math.abs(skewval)).slice(-4));}
						vpolcal()
				}
				else if((Dac_variables.underline_start[1] >= 1)&$('#pol').is(':visible')){
					var polval = $('#pola').text();
						polval++;
						$('#pola').html("&nbsp;"+("0000" + +polval).slice(-4));
						
						vpolcal()
				}
					//NID setting....
				else if ($('#nida').is(':visible')){
					var nid = parseInt($("#nidaval").text(),16);
					if (Dac_variables.underline_start[1] == 1){nid++}
					else if (Dac_variables.underline_start[1] == 2){nid = nid+16;}
					else if (Dac_variables.underline_start[1] == 3){nid = nid + Math.pow(16, 2);}
					else if (Dac_variables.underline_start[1] == 4){nid = nid + Math.pow(16, 3);}
					else {nid = nid;}
					nid = ((+nid).toString(16).toUpperCase());//to HEX
						{$('#nidaval').html(("0000"+nid).slice(-4));}
				}
				
				
				else if ($('#eltrma').is(':visible')||$('#aztrma').is(':visible')){
					var minus = "";
					if (txt >= 1800){txt = -1800;}
					else if (Dac_variables.underline_start[1] == 1){txt = txt + 1;}
					else if (Dac_variables.underline_start[1] == 2){txt = txt + 10;}
					else if (Dac_variables.underline_start[1] == 3){txt = txt + 100;}
					else {txt = txt;}
					if (txt <= 0){minus = "-";}
					else {minus = "&nbsp;"}
					$('.trim:visible').html(minus +("0000"+(Math.abs(txt))).slice(-4));
				}
				else if($('.d2').is(':visible')||$('.d3').is(':visible')||$('.d4').is(':visible')||$('.d5').is(':visible')){
					if (Dac_variables.underline_start[1] == -1){if (txt >= 999.9){txt = 0;} else {txt = ((txt*10 + 0.1*10)/10);};}
					else if (Dac_variables.underline_start[1] == 1){txt = txt + 1;}
					else if (Dac_variables.underline_start[1] == 2){txt = txt + 10;}
					else if (Dac_variables.underline_start[1] == 3){txt = txt + 100;}
					else if (Dac_variables.underline_start[1] == 4){txt = txt + 1000;}
					else {txt = txt;}

					
					$('.d2:visible').html(("000"+ (txt.toFixed(1))).slice(-4));
					$('.d3:visible').html(("000"+(txt.toFixed(1))).slice(-5));
					$('.d4:visible').html(("0000"+txt).slice(-4));
					$('.d5:visible').html(("00000"+txt).slice(-5));
				}
				else if ((Dac_variables.underline_start[1] >= 1)&$('#rmt-dish').is(':visible')){
					if ($("#rmt-dish").text() == "ON"){$("#rmt-dish").text("OFF");}
					else {$("#rmt-dish").text("ON");}
				;}
				else if ((Dac_variables.underline_start[1] >= 1)&$('#rmt-sat-ref').is(':visible')){
					if ($("#rmt-sat-ref").text() == "ON"){$("#rmt-sat-ref").text("OFF");}
					else {$("#rmt-sat-ref").text("ON");}
				;}
				else {txt = txt;}
			;}			
			
		});
			
		$('#Down').click(function(){
			if ($("#udrline").is(':hidden')){
				if($('#status').is(':visible')){
						enter = parseFloat(enter) - parseFloat(1);
					if (enter < 0){enter = 0;}
					else {enter = enter;}
					
					fncstatusupdown[enter]();}
				else if ($('#antenna').is(':visible')&&(enter==0)){
						vantel=((vantel*10 - 0.2*10)/10);vcompass();
				}
				
				else if (($('#ship').is(':visible')||$('#satellite').is(':visible')||$('#antenna').is(':visible'))&&(enter>=1)){menu_dwn(enter);}
				else if ($('#status1').is(':visible')||$('#setup').is(':visible')||$('#remote-screen').is(':visible')){menu_dwn(enter);}
				
			;}
			else{ 
				if ($('#track').is(':visible')){
					if (Dac_variables.underline_start[1] >= 2){
						Tdisp();	
					}
					else if ((Dac_variables.underline_start[1] == 1)&(vblock < 1)){
						vblock++;
					}
					else if ((Dac_variables.underline_start[1] == 1)&(vblock == 1)){
						$('#tracka').hide();$('#block').show();	
					}

				}
	
				else if((Dac_variables.underline_start[1] < -1)&$('.nsew').is(':visible')){
							if ($('.nsew:visible').html() == "&nbsp;N"){$('.nsew:visible').html("&nbsp;S");}
							else if ($('.nsew:visible').html() == "&nbsp;E"){$('.nsew:visible').html("&nbsp;W");}
							else if ($('.nsew:visible').html() == "&nbsp;W"){$('.nsew:visible').html("&nbsp;E");}
							else if ($('.nsew:visible').html() == "&nbsp;A"){$('.nsew:visible').html("&nbsp;B");}
							else if ($('.nsew:visible').html() == "&nbsp;B"){$('.nsew:visible').html("&nbsp;A");}
							else{$('.nsew:visible').html("&nbsp;N");}
						}
				
				else if ((Dac_variables.underline_start[1] >= 1)&$('#tone').is(':visible')){
							if ($('#toneval:visible').html() == "OFF"){$('#toneval:visible').html("ON");}
							else{$('#toneval:visible').html("OFF");}
						}
				else if((Dac_variables.underline_start[1] >= 1)&$('#volt').is(':visible')){
						subenter = arrVolt.indexOf($('#volta').html());
						subenter--;
						if (subenter < 0){subenter = 3;}
						else if (subenter > 3){subenter = 0;}
						else {subenter = subenter;}
						$('#volta').html(arrVolt[subenter]);
					}
				else if((Dac_variables.underline_start[1] >= 1)&$('#fec').is(':visible')){
					if (tunercard == 2){subenter = arrFecS2.indexOf($('#fecb').html());
						subenter--;
						if (subenter < 0){subenter = arrFecS2.length -1;}
						else if (subenter > arrFecS2.length -1){subenter = 0;}
						else {subenter = subenter;}
						if (subenter > 15){$('#feca').html("FEC&nbsp");}
						else {$('#feca').html("FEC&nbsp;&nbsp");}
						$('#fecb').html(arrFecS2[subenter]);
						
						
						
					}
					else {subenter = arrFec.indexOf($('#fecb').html());
						subenter--;
						if (subenter < 0){subenter = arrFec.length -1;}
						else if (subenter > arrFec.length -1){subenter = 0;}
						else {subenter = subenter;}
						$('#fecb').html(arrFec[subenter]);
					}
					if($('#fecb').html()=="SCPC"){preset_screen($('#fecb').html());}
					else{preset_screen($('#fecb').html());}
				
				}
				else if((Dac_variables.underline_start[1] >= 1)&$('#skew').is(':visible')){
					var skewval = parseFloat($("#skval").text());
						{skewval--;}
						if (skewval < -90){skewval = 90;}
						if (skewval >= 0){$('#skval').html("&nbsp;"+("0000" + skewval).slice(-4));}
						else if (skewval <0){$('#skval').html("-"+("0000" + Math.abs(skewval)).slice(-4));}
						vpolcal()
					}
					//NID setting....
				
				else if ($('#nida').is(':visible')){
					
					var nid = parseInt($("#nidaval").text(),16);
					if (Dac_variables.underline_start[1] == 1){if (nid <=0){nid = nid+15;}else{nid--;}}
					else if (Dac_variables.underline_start[1] == 2){if (nid <=15){nid = nid+(15*16);}else{nid = nid-16;}}
					else if (Dac_variables.underline_start[1] == 3){if (nid <=256){nid = nid+(15*Math.pow(16,2));}else{nid = nid - Math.pow(16, 2);}}
					else if (Dac_variables.underline_start[1] == 4){if (nid <=4096){nid = nid+(15*Math.pow(16,3));}else{nid = nid - Math.pow(16, 3);}}
					else {nid = nid;}
					
					nid = ((+nid).toString(16).toUpperCase());//to HEX
						{$('#nidaval').html(("0000"+nid).slice(-4));}
				}
				
				else if ($('#eltrma').is(':visible')||$('#aztrma').is(':visible')){
					var minus = "";
					if (txt <= -1800){txt = 1800;}
					else if (Dac_variables.underline_start[1] == 1){txt = txt - 1;}
					else if (Dac_variables.underline_start[1] == 2){txt = txt - 10;}
					else if (Dac_variables.underline_start[1] == 3){txt = txt - 100;}
					else {txt = txt;}
					if (txt <= 0){minus = "-";}
					else {minus = "&nbsp;"}
					$('.trim:visible').html(minus +("0000"+(Math.abs(txt))).slice(-4));
				}
				else if($('.d2').is(':visible')||$('.d3').is(':visible')||$('.d4').is(':visible')||$('.d5').is(':visible')){
					if (Dac_variables.underline_start[1] == -1){if (txt == 0.0){txt = 999.9;} else {txt = ((txt*10 - 0.1*10)/10);};}
					else if (Dac_variables.underline_start[1] == 1){if (txt < 1){txt = txt + 99999;}else {txt = txt - 1;};}
					else if (Dac_variables.underline_start[1] == 2){if (txt < 10){txt = txt + 99990;}else {txt = txt - 10;};}
					else if (Dac_variables.underline_start[1] == 3){if (txt < 100){txt = txt + 99900;}else {txt = txt - 100;};}
					else if (Dac_variables.underline_start[1] == 4){if (txt < 1000){txt = txt + 99000;}else {txt = txt - 1000;};}
					else {txt = txt;}

					
					$('.d2:visible').html(("000"+ (txt.toFixed(1))).slice(-4));
				$('.d3:visible').html(("000"+(txt.toFixed(1))).slice(-5));
				$('.d4:visible').html(("0000"+txt).slice(-4));
				$('.d5:visible').html(("00000"+txt).slice(-5));
				}
				else if ((Dac_variables.underline_start[1] >= 1)&$('#rmt-dish').is(':visible')){
					if ($("#rmt-dish").text() == "ON"){$("#rmt-dish").text("OFF");}
					else {$("#rmt-dish").text("ON");}
				;}
				else if ((Dac_variables.underline_start[1] >= 1)&$('#rmt-sat-ref').is(':visible')){
					if ($("#rmt-sat-ref").text() == "ON"){$("#rmt-sat-ref").text("OFF");}
					else {$("#rmt-sat-ref").text("ON");}
				;}
				else {txt = txt;}
			;}	
			

		});
	
	
	
		
});	
