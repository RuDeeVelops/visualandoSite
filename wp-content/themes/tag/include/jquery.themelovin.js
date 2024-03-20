(function($) {
    'use strict';
    
    $(window).load(function(){
		
		/*-----------------------------------------------------------------------------------
		LOADING
		-----------------------------------------------------------------------------------*/
		
		$('#thmlvSpinnerPositioning').animate({
			top : '50%'
		}, 900, function() {
			$('body').imagesLoaded( function() {
				$('#thmlvSpinnerPositioning').delay(600).animate({
					top : '-100%'
				}, 900, function() {
					$('#thmlvLoadingOverlay').fadeOut();
				});
			});
		})
	});
    
    $(document).ready(function($){
    
    	var windowWidth = $(window).width();
    	var viewportHeigh = $(window).outerHeight();
    	
    	/*-----------------------------------------------------------------------------------
		CYRCLE GALLERY
		-----------------------------------------------------------------------------------*/
		
		$('.thmlvInnerSlideshow ul').imagesLoaded(function(){
			$('.thmlvInnerSlideshow ul').cycle({
				autoHeight: 'container',
				fx: 'fadeout',
				slides: '> li',
				speed: 500,
				timeout: 0,
				log: false,
				pager: '.thmlvCyclePager',
				updateView: 1,
				swipe: true
			});
		});
    	
    	/*-----------------------------------------------------------------------------------
		FITVID
		-----------------------------------------------------------------------------------*/
		
		$("#thmlv-main, #thmlvVideoWrapper").fitVids();
    	
    	/*-----------------------------------------------------------------------------------
		FOOTER
		-----------------------------------------------------------------------------------*/
		
		var realFooterWrapper = $('#thmlvFooterWrapper'),
        realFooterHeight = $('#thmlvFooterWrapper > div').outerHeight(),
        fakeFooter = $('#thmlvFooterFake');


        if(realFooterHeight > viewportHeigh){
            realFooterWrapper.addClass('thmlvStatic');
            fakeFooter.hide();
        }
        else {
            realFooterWrapper.addClass('thmlvFixed');
            fakeFooter.height(viewportHeigh + 15);
            realFooterWrapper.height(fakeFooter);
        }
    
    	/*-----------------------------------------------------------------------------------
		FULL HEADER IMAGE
		-----------------------------------------------------------------------------------*/
		
        function fix_page_banner_height() {
        	if($('.thmlvHeader').length != 0) {
        		$('#thmlvRgba').css('padding-top', 0);
        		$('#thmlvTitle, #thmlvRgba').height($(window).height());
        	}
        }
        
        fix_page_banner_height();
        
        $(window).resize(function () {
        	fix_page_banner_height();
        });
        
        /*-----------------------------------------------------------------------------------
		FULL SCREEN
		-----------------------------------------------------------------------------------*/
        
        $("#thmlvFullscreen").on('click', function(e) {
        	e.preventDefault();
			var docElement, request;

			docElement = document.documentElement;
			request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;

			if(typeof request!="undefined" && request){
				request.call(docElement);
			}
		});
        
        /*-----------------------------------------------------------------------------------
		MENU
		-----------------------------------------------------------------------------------*/
    	
    	$('.thmlvSideMenu').superfish({
    		delay: 500,
    		animation: {opacity:'show',height:'show'},
    		animationOut: {opacity:'hide',height:'hide'},
    	});
    	
    	/*-----------------------------------------------------------------------------------
		NAVIGATION
		-----------------------------------------------------------------------------------*/
		
		$('#thmlvInnerNav .span_6').hover(function() {
			$(this).find('.thmlvNavTitle').stop().animate({
				top: '-100%'
			}, 300);
			$(this).find('.thmlvNavLink').stop().animate({
				top: '0'
			}, 300);
		}, function() {
			$(this).find('.thmlvNavTitle').stop().animate({
				top: '0'
			}, 300);
			$(this).find('.thmlvNavLink').stop().animate({
				top: '100%'
			}, 300);
		});
    	    	
    	/*-----------------------------------------------------------------------------------
		PARALLAX
		-----------------------------------------------------------------------------------*/
		
		var $window = $(window);
		var windowHeight = $window.height();
	
		$window.resize(function () {
			windowHeight = $window.height();
		});
	
		$.fn.parallax = function(xpos, speedFactor, outerHeight) {
			var $this = $(this);
			var getHeight;
			var firstTop;
			var paddingTop = 0;
		
			//get the starting position of each element to have parallax applied to it		
			$this.each(function(){
				firstTop = $this.offset().top;
			});
		
			$window.resize(function () {
				$this.each(function(){
					firstTop = $this.offset().top;
				});
			});
		
			$window.load(function(){
				$this.each(function(){
					firstTop = $this.offset().top;
				}); 
			});
	 
	
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		 
			
			// setup defaults if arguments aren't specified
			if (arguments.length < 1 || xpos === null) xpos = "50%";
			if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
			if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
			// function to be called whenever the window is scrolled or resized
			function update(){
				var pos = $window.scrollTop();				
	
				$this.each(function(){
					var $element = $(this);
					var top = $element.offset().top;
					var height = getHeight($element);
					// Check if totally above or totally below viewport
					if (top + height < pos || top > pos + windowHeight) {
						return;
					}
					
					if( windowWidth > 1024 ) {
						$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
					}
				});
			}		
	
			$window.bind('scroll', update).resize(update);
			update();
		};
	
		$.fn.countTo = function (options) {
			options = options || {};
		
			return $(this).each(function () {
				// set options for current element
				var settings = $.extend({}, $.fn.countTo.defaults, {
					from:            $(this).data('from'),
					to:              $(this).data('to'),
					speed:           $(this).data('speed'),
					refreshInterval: $(this).data('refresh-interval'),
					decimals:        $(this).data('decimals')
				}, options);
			
				// how many times to update the value, and how much to increment the value on each update
				var loops = Math.ceil(settings.speed / settings.refreshInterval),
					increment = (settings.to - settings.from) / loops;
			
				// references & variables that will change with each update
				var self = this,
					$self = $(this),
					loopCount = 0,
					value = settings.from,
					data = $self.data('countTo') || {};
			
				$self.data('countTo', data);
			
				// if an existing interval can be found, clear it first
				if (data.interval) {
					clearInterval(data.interval);
				}
				data.interval = setInterval(updateTimer, settings.refreshInterval);
			
				// initialize the element with the starting value
				render(value);
			
				function updateTimer() {
					value += increment;
					loopCount++;
				
					render(value);
				
					if (typeof(settings.onUpdate) == 'function') {
						settings.onUpdate.call(self, value);
					}
				
					if (loopCount >= loops) {
						// remove the interval
						$self.removeData('countTo');
						clearInterval(data.interval);
						value = settings.to;
					
						if (typeof(settings.onComplete) == 'function') {
							settings.onComplete.call(self, value);
						}
					}
				}
			
				function render(value) {
					var formattedValue = settings.formatter.call(self, value, settings);
					$self.html(formattedValue);
				}
			});
		};
	
		$.fn.countTo.defaults = {
			from: 0,               // the number the element should start at
			to: 0,                 // the number the element should end at
			speed: 1000,           // how long it should take to count between the target numbers
			refreshInterval: 100,  // how often the element should be updated
			decimals: 0,           // the number of decimal places to show
			formatter: formatter,  // handler for formatting the value before rendering
			onUpdate: null,        // callback method for every time the element is updated
			onComplete: null       // callback method for when the element finishes updating
		};
	
		function formatter(value, settings) {
			return value.toFixed(settings.decimals);
		}
		
		$(".thmlvParallax").parallax("50%", -0.3);
		
		/*-----------------------------------------------------------------------------------
		PORTFOLIO
		-----------------------------------------------------------------------------------*/
		
		$('.thmlvBlockPortfolio').hover(function() {
			if(!$(this).hasClass('format-quote')) {
				$(this).find('.thmlvPortfolioTitle').stop().animate({
					top: '-100%'
				}, 300);
				$(this).find('.thmlvPortfolioLink').stop().animate({
					top: '0'
				}, 300);
			}
			}, function() {
				if(!$(this).hasClass('format-quote')) {
					$(this).find('.thmlvPortfolioTitle').stop().animate({
						top: '0'
					}, 300);
					$(this).find('.thmlvPortfolioLink').stop().animate({
						top: '100%'
					}, 300);
				}
		});
        
        /*-----------------------------------------------------------------------------------
		PORTFOLIO & TOP MENU
		-----------------------------------------------------------------------------------*/
    
    	if($('#thmlvFullPageWrap').length > 0) {
    		if (Modernizr.touch) {
    			$('#thmlvFullPageWrap').fullpage({
					sectionSelector: '.thmlvFullSection',
					css3: true,
					resize: false
				});
    		} else {
				$('#thmlvFullPageWrap').fullpage({
					sectionSelector: '.thmlvFullSection',
					navigation: true,
					css3: true,
					navigationPosition: 'right',
					resize: false,
					afterLoad: function(anchorLink, index){
						if(index == '1') {
							$('body').removeClass('thmlvShowScroll').addClass('thmlvHideScroll');
						} else {
							$('body').removeClass('thmlvHideScroll').addClass('thmlvShowScroll');
						}
					}
				});
			}
    	} else {
    		$(window).bind('scroll',scrollMenu);
    	}
    	
    	function scrollMenu() {
			var scroll = $(window).scrollTop();
			if (scroll >= 800) {
				$('body').removeClass('thmlvHideScroll').addClass('thmlvShowScroll');
			} else {
				$('body').removeClass('thmlvShowScroll').addClass('thmlvHideScroll');
			}
		}
    	
    	/*-----------------------------------------------------------------------------------
		SHARE
		-----------------------------------------------------------------------------------*/
		
		$('#thmlvShareLink').click(function(e){
			e.preventDefault();
			$('#thmlvShareOverlay').css('display', 'table');
			$('#thmlvShareOverlay').animate({opacity: 1}, 500);
		});
		
		$('#thmlvShareOverlay').click(function(e){
			e.preventDefault();
			$('#thmlvShareOverlay').animate({opacity: 0}, 500, function() {
				$('#thmlvShareOverlay').css('display', 'none');
			});
		});
		
		$(document).keyup(function(e){
			if (e.keyCode == 27) {
				$('#thmlvShareOverlay').animate({opacity: 0}, 500, function() {
					$('#thmlvShareOverlay').css('display', 'none');
				});
			};
		});
		
		/*-----------------------------------------------------------------------------------
		SHARE LINKS
		-----------------------------------------------------------------------------------*/
		
		function facebookShareLink(){
			window.open( 'https://www.facebook.com/sharer/sharer.php?u='+window.location, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		$('#thmlvFacebookShare').click(facebookShareLink);
		
		function twitterShareLink(){
			window.open( 'http://twitter.com/intent/tweet?text='+$(".thmlvSectionTitle").text() +' '+window.location, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		$('#thmlvTwitterShare').click(twitterShareLink);
		
		function googleShareLink(){
			window.open( 'https://plus.google.com/share?url='+window.location, "googleWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		$('#thmlvGoogleShare').click(googleShareLink);
		
		$('#thmlvToTop').click(function(e){
			e.preventDefault();
			if($('#thmlvFullPageWrap').length > 0) {
				$.fn.fullpage.moveToFirst();
			} else {
				$("html, body").animate({ scrollTop: 0 }, 450);
			}
		});
		    	
    });
	
}(jQuery))