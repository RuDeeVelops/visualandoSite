(function($) {
    var supportCssTransforms = $("html").hasClass("csstransforms3d");
 
    if(supportCssTransforms){
        $("body").addClass("with-translate");
    }
    
    // add IE10 class
    if(navigator.userAgent.indexOf("MSIE 10.")!=-1){
        $("body").addClass("ie10");
    }
    
    //open / clode side menu
    $("#thmlvMenuOverlay, .thmlvToggleMenu, #thmlvToggleClose").on("click", function(){
        $("body, #thmlvToggleWrap").toggleClass("thmlvToggleOpen");
        if($("body").hasClass("thmlvToggleOpen")) {
			$('#thmlvMenuOverlay').show();
		} else {
			$('#thmlvMenuOverlay').hide();
		}
    });
    
    $(document).keyup(function(e){
		if (e.keyCode == 27) {
			$('#thmlvMenuOverlay').hide();
			$("body, #thmlvToggleWrap").removeClass("thmlvToggleOpen");
		};
	});
    
    //close side menu before redirection
    $("#thmlvToggleContent a").on("click", function(){
    	var href = this.href;
    	$("body, #thmlvToggleWrap").toggleClass("thmlvToggleOpen").promise().done(function(){
			location.href = href;
		});
    	return false;
    });
}(jQuery))