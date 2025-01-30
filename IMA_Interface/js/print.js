 var beforePrintFunc = function() {
   $("#priant1,#secant1,#mswitch1,#tVL").show();

}
//for chrome
window.matchMedia('print').addListener(function(mql) {
    if (mql.matches) {
        beforePrintFunc();
    }
});

//window.onbeforeprint = beforePrintFunc;