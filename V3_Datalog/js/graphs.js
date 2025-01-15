



function pop_checkbox(){
    for (i =0;i < title.length;i++){
        $("#table-filter ul").append('<li> <input type="checkbox" id="'+i+'"checked>:'+ title[i] +' </li>');
        Filter[i] = 1;
   }
    pop_list();
}
function pop_list(){
    $("#table thead tr").html("");$("#table tbody").html("");
    for (ia = 0; ia < Filter.length; ia++) {
        if(Filter[ia] == 1){
        $("#table thead tr").append('<th> '+ title[ia] +' </th>');}
    }
    
    var line ="";
    var table;
    for (i = 0; i < (output.length-1); i++) {
        line ="";
        for(ii = 0; ii < Filter.length; ii++){
            if(Filter[ii] == 1){
                if(output[i][ii] == "ON"){line += "<td style='background-color: #00FF00;background-clip: content-box;'> "+ output[i][ii] +" </td>";}
                else if(output[i][ii] == "OFF"){line += "<td style='background-color: #FF0000;background-clip: content-box;'> "+ output[i][ii] +" </td>";}
                else {line += "<td> "+ output[i][ii] +" </td>";}
            };
        }
        table = table+'<tr>'+line+'</tr>';
        
    }
    $("#table tbody").append(table);
    $('#message').text("Processing Data Finshed");$('.submit_hide').show();
}
function draw_admc_side (){console.log("draw ADMC side")
    $("#admc_side #Yaxis").empty();
        for(i=-4;i<=42;i++){
        var name = ["Inatialization","Targetting","Searching","Block Zone","Appr Block zone"];
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            text1.setAttribute('x', '-12');
            text1.setAttribute('fill', '#000');
            if(i<37){text1.setAttribute('y', 3-(i*10));text1.textContent = (i*10);}
            else {text1.setAttribute('y', (-2)-(i*10));text1.textContent = name[i-38];}
    $("#admc_side #Yaxis").append(text1);}
    $("#admc_side #Key").empty();
        for(i=0;i<=6;i++){
        var name = ["AZ deg","EL deg","CL deg","REL deg","AGC/10","THRS","HDG"];
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            text1.setAttribute('x', '-90');
            text1.setAttribute('y', (-300)+(i*10));
            text1.setAttribute('fill', Colour[i]);
            if(i>=4){text1.setAttribute('fill', Colour[i+1]);}
            text1.textContent = name[i];
    $("#admc_side #Key").append(text1);}
}
//var y_start = -2, y_end = 2,x_end =1000;
function side_draw(graph,name,scale,y_start,y_end){console.log("draw "+graph+" side")
    const plot = document.getElementById(graph).id;
    var name;
    var scalea;
    if (scale < 1){scalea = 1/scale;}
    else {scalea = scale}
    $('#'+plot+" #Yaxis").empty();
    $('#'+plot+" #Yaxis").attr("transform","translate(0,"+(10-y_end*100)+")");
    //for(i=(-36);i<=36;i++){
    for(i=(y_start*10);i<=(y_end*10);i++){
        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', '-12');
        text1.setAttribute('fill', '#000');
        text1.setAttribute('y', ((y_end*100)+3)-(i*10));
        text1.textContent = Math.round((i/scale) * 100) / 100;
    $('#'+plot+" #Yaxis").append(text1);
    }
    $('#'+plot+" #Key").empty();
    for(i=0;i<=name.length-1;i++){
        const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', '-90');
        text1.setAttribute('y', (-100)+(i*10));
        text1.setAttribute('fill', Colour[i]);
        if(i>=4){text1.setAttribute('fill', Colour[i+1]);}
        text1.textContent = name[i];
        $('#'+plot+" #Key").append(text1);
    }
console.log("draw "+graph+" side done");
}

function draw_canvas_side1 (){console.log("draw canvas side")
//id,text,scale
// side_draw('tc_side',["AZ Amp","EL Amp","CL Amp"],10);
//side_draw('ivc_side',["AZ Error","EL Error","CL Error"],100,y_start,y_end);
 side_draw('track_delta_side',["AZ Delta","EL Delta","CL Delta"],100,y_start,y_end);


}

function draw_admc (){
    var below_zero = 4;//graph negative vaule adjust
    console.log("admc draw");
    $("#admc #Blockage").empty();$("#admc #GridLines").attr("d"," ");
    if (output.length*SC > 1000){$("#admc").attr("width",(output.length*SC)+100);$("#admc").attr("viewBox", "-100 -440 "+((output.length*SC)+100)+" 630"); }
    var svgW = $("#admc").attr("width"),GridW = [svgW-110,(svgW-110)/10];
    var svgH = $("#admc").attr("height");
    var Grid_lines ="";
    for (i=-below_zero;i<=43;i++){Grid_lines = Grid_lines+"M0 "+(0-i*10)+" L"+GridW[0]+" "+(0-i*10)+" "; }
    for(i=1;i<=GridW[1];i++){Grid_lines = Grid_lines+"M"+(i*10)+" "+(below_zero*10)+" L"+(i*10)+" -430 ";}
    $("#admc #GridLines").attr("d",Grid_lines);Grid_lines ="";
    $("#admc .Xaxis").attr({"y1":below_zero*10,"x2":GridW[0],"y2":below_zero*10});
    $("#admc .Xaxis").eq(1).attr({"y1":(below_zero*10)+5,"x2":GridW[0],"y2":(below_zero*10)+5});
    $("#AZpos").css("stroke",Colour[0]);$("#AZpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+(-output[i][title.indexOf("Position-Az (Deg)")])+" ";}
    $("#AZpos").attr("points",Grid_lines);Grid_lines ="";
    $("#ELpos").css("stroke",Colour[1]);$("#ELpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+(-output[i][title.indexOf("Position-El (Deg)")])+" ";}
    $("#ELpos").attr("points",Grid_lines);Grid_lines ="";
    $("#CLpos").css("stroke",Colour[2]);$("#CLpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+(-output[i][title.indexOf("Position-Cl (Deg)")])+" ";}
    $("#CLpos").attr("points",Grid_lines);Grid_lines ="";

    $("#RELpos").css("stroke",Colour[3]);$("#RELpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+(-output[i][title.indexOf("Sensor-Z-Enc Rel (Deg)")])+" ";}
    $("#RELpos").attr("points",Grid_lines);Grid_lines ="";
    $("#AGCpos").css("stroke",Colour[5]);$("#AGCpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+((-output[i][title.indexOf("Display AGC")])/10)+" ";}
    $("#AGCpos").attr("points",Grid_lines);Grid_lines ="";
    $("#THRpos").css("stroke",Colour[6]);$("#THRpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+((-output[i][title.indexOf("Threshold")])/10)+" ";}
    $("#THRpos").attr("points",Grid_lines);Grid_lines ="";
    $("#HDGpos").css("stroke",Colour[7]);$("#HDGpos").attr("points"," ");
    for(i=0;i<outputLength;i++){Grid_lines = Grid_lines+i*10+","+(-output[i][title.indexOf("Heading (Deg)")])+" ";}
    $("#HDGpos").attr("points",Grid_lines);Grid_lines ="";
    $("#admc #Xaxis").empty();
    for(i=0;i<outputLength;i++){
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', (-(below_zero+1)*10));
        text1.setAttribute('y', 3+(i*10));
        text1.setAttribute('fill', '#000');
        text1.textContent = output[i][0];
        $("#admc #Xaxis").append(text1);
    }
    
    for(i=0;i<outputLength;i++){
        if(output[i][title.indexOf("Block Zone")] == "1"){
            var rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect1.setAttribute('x', i*10);
                rect1.setAttribute('y', '-420');
                rect1.setAttribute('width', '10');
                rect1.setAttribute('height', '10');
                rect1.setAttribute('fill', Colour[1]);
        $("#admc #Blockage").append(rect1);}
    }
    $("#admc #ApprBlockage").empty();
    for(i=0;i<outputLength;i++){
        if(output[i][title.indexOf("Warning Zone")] == "1"){
            var rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect1.setAttribute('x', i*10);
                rect1.setAttribute('y', '-430');
                rect1.setAttribute('width', '10');
                rect1.setAttribute('height', '10');
                rect1.setAttribute('fill', Colour[0]);
        $("#admc #ApprBlockage").append(rect1);}
    
    }
    $("#admc #Target").empty();
    $("#admc #Search").empty();
    $("#admc #Initialization").empty();
   
    for(i=0;i<outputLength;i++){
        var SI_val = "Target";
        var Xpos = 400;
        var Text ="";
        
        if(output[i][1] == "Target Clear Sky"){Text="TCS";}
        else if (output[i][1] == "Target Satellite"){Text="TS";}
        else if (output[i][1] == "Calc Backgnd AGC"){Text="CBAGC";}
        else if (output[i][1] == "Search Delay"){Text="SD";SI_val="Search";Xpos=Xpos+10;}
        else if (output[i][1] == "Resume Search"){Text="RS";SI_val="Search";Xpos=Xpos+10;}
        else if (output[i][1] == "Spiral Search"){Text="SS";SI_val="Search";Xpos=Xpos+10;}
        else if (output[i][1] == "Find Home Position"){Text="FHP";SI_val=0;Xpos=Xpos-10;}
        else if (output[i][1] == "Find Az Home Flag"){Text="FAHF";SI_val=0;Xpos=Xpos-10;}
        else if (output[i][1] == "Find Stops"){Text="FS";SI_val="Initialization";Xpos=Xpos-10;}
         else if (output[i][1] == "Home Position"){Text="HP";SI_val="Initialization";Xpos=Xpos-10;}
        else{continue;}
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('y', (i*10)+8);
        text1.setAttribute('fill', '#000');
        text1.textContent = Text;        
        text1.setAttribute('x', Xpos);        
        $('#admc #'+SI_val).append(text1);
       
    }

    
    
}
function draw_tc (){
    
    console.log("draw tc side")
    $("#tc #Xaxis").empty(); $("#tc #GridLines").attr("d"," ");
    y_start = -2, y_end = 2,x_end =1000;
    $("#tc #AZpos").css("stroke",Colour[0]);$("#tc #AZpos").attr("points"," ");
    $("#tc #ELpos").css("stroke",Colour[1]);$("#tc #ELpos").attr("points"," ");
    $("#tc #CLpos").css("stroke",Colour[2]);$("#tc #CLpos").attr("points"," ");
    var Graph_lines =["","",""];
    for(i=0;i<outputLength;i++){
        var amps = [output[i][title.indexOf("Motor-Az (Amps)")],output[i][title.indexOf("Motor-El (Amps)")],output[i][title.indexOf("Motor-Cl (Amps)")]];  
        Graph_lines[0]=Graph_lines[0]+i*10+","+(-amps[0])*100+" ";
        Graph_lines[1]=Graph_lines[1]+i*10+","+(-amps[1])*100+" ";
        Graph_lines[2]=Graph_lines[2]+i*10+","+(-amps[2])*100+" ";
        var Amps_val = [(output[i][title.indexOf("Motor-Az (Amps)")]),(output[i][title.indexOf("Motor-El (Amps)")]),(output[i][title.indexOf("Motor-Cl (Amps)")])];
       for (iA=0;iA<=2;iA++){
            if (Amps_val[iA] < 0 ){
                if ((Amps_val[iA] < -4)|| (y_start==-5)){y_start=-5}
                else if ((Amps_val[iA] < -3)|| (y_start==-4) ){y_start=-4}
                else if ((Amps_val[iA] < -2)|| (y_start==-3) ){y_start=-3}
            }
            else{
                if ((Amps_val[iA]> 4)|| (y_end==5)){y_end=5}
                else if ((Amps_val[iA]>3)|| (y_end==4) ){y_end=4}
                else if ((Amps_val[iA]> 2)|| (y_end==3) ){y_end=3}
            }
        }
    }
    $("#tc #AZpos").attr("points",Graph_lines[0]);
    $("#tc #ELpos").attr("points",Graph_lines[1]);
    $("#tc #CLpos").attr("points",Graph_lines[2]);
    for(i=0;i<outputLength;i++){
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', -20+(y_start*100));
        text1.setAttribute('y', 3+(i*10));
        text1.setAttribute('fill', '#000');
        text1.textContent = output[i][0];
        $("#tc #Xaxis").append(text1);
    }
    $("#tc_side").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"viewBox":"-100 "+(-20-(y_end*100))+" 101 "+(((Math.abs(y_start)+y_end)*100)+200)});
    $("#tc_side .yaxis").attr("y1",((0-y_start)*100)+10);
    $("#tc_side .yaxis").attr("y2",((0-y_end)*100)+10);
    side_draw('tc_side',["AZ Amp","EL Amp","CL Amp"],10,y_start,y_end);
    if (output.length*SC > 1000){x_end=(output.length*SC)+100;}else{x_end=1000;}
    $("#tc").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"width":x_end,"viewBox":"-100 "+(-20-(y_end*100))+" "+x_end+" "+(((Math.abs(y_start)+y_end)*100)+200)});
    
    var svgW = $("#tc").attr("width"),GridW = [svgW-110,(svgW-110)/10];
    var svgH = $("#tc").attr("height");
    
    for (i=(y_start*10)-1;i<(y_end*10);i++){$("#tc #GridLines").attr("d",function(){return $(this).attr("d") + "M0 "+(0-i*10)+" L"+GridW[0]+" "+(0-i*10)+" "});}
    for(i=1;i<=GridW[1];i++){$("#tc #GridLines").attr("d",function(){return $(this).attr("d") + "M"+(i*10)+" "+(0-((y_start*10)-1)*10)+" L"+(i*10)+" "+(10-(y_end*100))});}
    $("#tc .Xname").attr("transform","translate(0,"+(0-y_start*100)+")");
    $("#tc .Xaxis").attr("x2",GridW[0]);
    
}
function draw_ivc (){console.log("draw IVC side")
    $("#ivc #Xaxis").empty();$("#ivc #GridLines").attr("d"," ");
    y_start = -3.6, y_end = 3.6,x_end =1000;
    //fix transform when y_end is not default, default is -190 but needs to increase when Y_end is adjusted
    $("#ivc #ELpos").css("stroke",Colour[0]);$("#ivc #ELpos").attr("points"," ");
    $("#ivc #AZpos").css("stroke",Colour[1]);$("#ivc #AZpos").attr("points"," ");
    $("#ivc #CLpos").css("stroke",Colour[2]);$("#ivc #CLpos").attr("points"," ");
    var Graph_lines =["","",""];
    for(i=0;i<outputLength;i++){
        var ivc = [output[i][title.indexOf("Target Error-Az (Deg)")],output[i][title.indexOf("Target Error-El (Deg)")],output[i][title.indexOf("Target Error-Cl (Deg)")]]; 
        for(b=0;b<=2;b++){
            var ivca = ivc[b];
            var yend = y_end*10, ystart = y_start*10, ivcscale = IVC_scale/10;
            if(ivca <ystart/ivcscale){ivc[b]=(ystart/ivcscale);} //broken it here somewhere......
            else if(ivca >yend/ivcscale){ivc[b]=(yend/ivcscale);} 
            else {ivc[b] =ivca;}
        }
        Graph_lines[0]=Graph_lines[0]+i*10+","+(-ivc[0])*(IVC_scale)+" ";
        Graph_lines[1]=Graph_lines[1]+i*10+","+(-ivc[1])*(IVC_scale)+" ";
        Graph_lines[2]=Graph_lines[2]+i*10+","+(-ivc[2])*(IVC_scale)+" ";
    }
        $("#ivc #ELpos").attr("points",Graph_lines[0]);
        $("#ivc #AZpos").attr("points",Graph_lines[1]);
        $("#ivc #CLpos").attr("points",Graph_lines[2]);
    for(i=0;i<outputLength;i++){
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', -20+(y_start*100));
        text1.setAttribute('y', 3+(i*10));
        text1.setAttribute('fill', '#000');
        text1.textContent = output[i][0];
        $("#ivc #Xaxis").append(text1);
    }
    $("#ivc_side").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"viewBox":"-100 "+(-20-(y_end*100))+" 101 "+(((Math.abs(y_start)+y_end)*100)+200)});
    $("#ivc_side .yaxis").attr("y1",((0-y_start)*100)+10);
    $("#ivc_side .yaxis").attr("y2",((0-y_end)*100)+10);
    side_draw('ivc_side',["AZ Error Deg","EL Error Deg","CL Error Deg"],IVC_scale/10,y_start,y_end);
    if (output.length*SC > 1000){x_end=(output.length*SC)+100;}else{x_end=1000;}
    $("#ivc").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"width":x_end,"viewBox":"-100 "+(-20-(y_end*100))+" "+x_end+" "+(((Math.abs(y_start)+y_end)*100)+200)});
    var svgW = $("#ivc").attr("width"),GridW = [svgW-110,(svgW-110)/10];
    var svgH = $("#ivc").attr("height");
    for (i=(y_start*10)-1;i<(y_end*10);i++){$("#ivc #GridLines").attr("d",function(){return $(this).attr("d") + "M0 "+(0-i*10)+" L"+GridW[0]+" "+(0-i*10)+" "});}
    for(i=1;i<=GridW[1];i++){$("#ivc #GridLines").attr("d",function(){return $(this).attr("d") + "M"+(i*10)+" "+(0-((y_start*10)-1)*10)+" L"+(i*10)+" "+(10-(y_end*100))});}
    $("#ivc .Xname").attr("transform","translate(0,"+(0-y_start*100)+")");
    $("#ivc .Xaxis").attr("x2",GridW[0]);
}
function draw_Velocity (){
    $("#Velocity #Xaxis").empty();$("#Velocity #GridLines").attr("d"," ");
    y_start = -10, y_end = 10,x_end =1000;
    //fix transform when y_end is not default, default is -190 but needs to increase when Y_end is adjusted
    $("#Velocity #ELpos").css("stroke",Colour[0]);$("#Velocity #ELpos").attr("points"," ");
    $("#Velocity #AZpos").css("stroke",Colour[1]);$("#Velocity #AZpos").attr("points"," ");
    $("#Velocity #CLpos").css("stroke",Colour[2]);$("#Velocity #CLpos").attr("points"," ");
    var Graph_lines =["","",""];
    for(i=0;i<outputLength;i++){
        var Velocity = [output[i][title.indexOf("Velocity-Az (D/Sec)")],output[i][title.indexOf("Velocity-El (D/Sec)")],output[i][title.indexOf("TVelocity-Cl (D/Sec)")]]; 
        
        Graph_lines[0]=Graph_lines[0]+i*10+","+(-Velocity[0])*(Velocity_scale)+" ";
        Graph_lines[1]=Graph_lines[1]+i*10+","+(-Velocity[1])*(Velocity_scale)+" ";
        Graph_lines[2]=Graph_lines[2]+i*10+","+(-Velocity[2])*(Velocity_scale)+" ";
    }
        $("#Velocity #ELpos").attr("points",Graph_lines[0]);
        $("#Velocity #AZpos").attr("points",Graph_lines[1]);
        $("#Velocity #CLpos").attr("points",Graph_lines[2]);
    for(i=0;i<outputLength;i++){
        var text1 = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        text1.setAttribute('x', -20+(y_start*100));
        text1.setAttribute('y', 3+(i*10));
        text1.setAttribute('fill', '#000');
        text1.textContent = output[i][0];
        $("#Velocity #Xaxis").append(text1);
    }
    $("#Velocity_side").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"viewBox":"-100 "+(-20-(y_end*100))+" 101 "+(((Math.abs(y_start)+y_end)*100)+200)});
    $("#Velocity_side .yaxis").attr("y1",((0-y_start)*100)+10);
    $("#Velocity_side .yaxis").attr("y2",((0-y_end)*100)+10);
    side_draw('Velocity_side',["AZ Error Deg","EL Error Deg","CL Error Deg"],Velocity_scale/10,y_start,y_end);
    if (output.length*SC > 1000){x_end=(output.length*SC)+100;}else{x_end=1000;}
    $("#Velocity").attr({"height":((Math.abs(y_start)+y_end)*100)+200,"width":x_end,"viewBox":"-100 "+(-20-(y_end*100))+" "+x_end+" "+(((Math.abs(y_start)+y_end)*100)+200)});
    var svgW = $("#Velocity").attr("width"),GridW = [svgW-110,(svgW-110)/10];
    var svgH = $("#Velocity").attr("height");
    for (i=(y_start*10)-1;i<(y_end*10);i++){$("#Velocity #GridLines").attr("d",function(){return $(this).attr("d") + "M0 "+(0-i*10)+" L"+GridW[0]+" "+(0-i*10)+" "});}
    for(i=1;i<=GridW[1];i++){$("#Velocity #GridLines").attr("d",function(){return $(this).attr("d") + "M"+(i*10)+" "+(0-((y_start*10)-1)*10)+" L"+(i*10)+" "+(10-(y_end*100))});}
    $("#Velocity .Xname").attr("transform","translate(0,"+(0-y_start*100)+")");
    $("#Velocity .Xaxis").attr("x2",GridW[0]);
}