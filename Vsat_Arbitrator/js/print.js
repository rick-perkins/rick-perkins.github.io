 var beforePrintFunc = function() {
    $("#coaxl,#modeml,#ethl").show();$("#login").show();
	$("#next").show();$("#line1,#line2,#line3,#line4,#line5,#line6,#line7,#line8,#next").show();
	
	$("#powerb,#relayb,#10mhzb,#tmsb,#modemb,#obmb,#ethb,#consoleb").hide();
}
//for chrome
window.matchMedia('print').addListener(function(mql) {
    if (mql.matches) {
        beforePrintFunc();
    }
});

//window.onbeforeprint = beforePrintFunc;