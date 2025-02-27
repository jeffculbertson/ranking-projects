$(function() {
    $( "#accordion" ).accordion({
        heightStyle: "content"
    });
    $( ".tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( ".tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 });