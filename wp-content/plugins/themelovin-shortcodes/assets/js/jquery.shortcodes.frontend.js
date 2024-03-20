jQuery(document).ready(function($){

	/***************** PARALLAX FUNCTION ******************/
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
	
				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
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
	
	/***************** BAR GRAPH ******************/
	$('.thmlv-short-progress-bar').each(function(i){
		
		$(this).appear(function(){
			
			var percent = $(this).find('span').attr('data-width');
			var $endNum = parseInt($(this).find('strong i').text());
			var $that = $(this);
			
			$(this).find('span').animate({
				'width' : percent + '%'
			},1600, 'easeOutCirc',function(){
			});
			
			$(this).find('strong').animate({
				'opacity' : 1
			},1350);
			
			
			$(this).find('strong i').countTo({
				from: 0,
				to: $endNum,
				speed: 1100,
				refreshInterval: 30,
				onComplete: function(){
		
				}
			});	
			
			////100% progress bar 
				if(percent == '100'){
					$that.find('strong').addClass('full');
				}
	
		});

	});
	
	/***************** CIRCULAR GRAPH ******************/
	$(".knob").knob();
	$('.knob').each(function(){
		
		$(this).appear(function(){
		
			var currId = $(this).attr("id");
			currId = "#" + currId;
			if($(currId).val() == 0) {
				$({value: 0}).animate({value: $(currId).attr("rel")}, {
					duration: 900,
					easing:'swing',
					step: function() {
						$(currId).val(Math.ceil(this.value)).trigger('change');
					}
				})
			}
			
		});
	});
	
	/***************** COLUMNS ANIMATION ******************/
	$('.thmlv-short-col.has-animation').each(function() {

		$(this).appear(function() {
			if($(this).attr('data-animation') == 'fade-in-from-left'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'left' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in-from-right'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'right' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'bottom' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in') {
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1
				},800,'easeOutSine');	
			} else if($(this).attr('data-animation') == 'grow-in') {
				var $that = $(this);
				setTimeout(function(){ 
					$that.transition({ scale: 1, 'opacity':1 },900,'cubic-bezier(0.15, 0.84, 0.35, 1.25)');
				},$that.attr('data-delay'));
			}
		
		},{accX: 0, accY: -105},'easeInCubic');

	});
	
	/***************** FULL WIDTH SECTION ******************/
	$('.thmlv-short-full-width-section.parallax_section').each(function(){
	   var $id = $(this).attr('id');
	   $('#'+$id + ".parallax_section").parallax("50%", 0.2);
	});
	
	$('.thmlv-short-full-width-section').each(function(){
		var $fwsHeight = $(this).outerHeight(true);
		//make sure it's empty and also not being used as a small dvider
		if($(this).find('.container *').length == 0 && $.trim( $(this).find('.container').text() ).length == 0  && $fwsHeight > 40){
			$(this).addClass('bg-only');
			$(this).css({'height': $fwsHeight, 'padding-top': '0px', 'padding-bottom': '0px'});
			$(this).attr('data-image-height',$fwsHeight);
		}

	});
	
	function fullwidthImgOnlySizing(){
		$('.thmlv-short-full-width-section.bg-only').each(function(){
			var $initialHeight = $(this).attr('data-image-height');
			
			if( window.innerWidth < 1000 && window.innerWidth > 690 ) {
				$(this).css('height', $initialHeight - $initialHeight*.60);
			} 
			else if( window.innerWidth <= 690 ) {
				$(this).css('height', $initialHeight - $initialHeight*.78);
			} 
			else if( window.innerWidth < 1300 && window.innerWidth >= 1000  ) {
				$(this).css('height', $initialHeight - $initialHeight*.33);
			} 
			else {
				$(this).css('height', $initialHeight);
			}			
		});	
	}
	
	fullwidthImgOnlySizing();
	
	/***************** IMAGES ANIMATION ******************/
	$('img.img-with-animation').each(function() {

		$(this).appear(function() {
			if($(this).attr('data-animation') == 'fade-in-from-left'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'left' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in-from-right'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'right' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1,
					'bottom' : '0px'
				},800,'easeOutSine');
			} else if($(this).attr('data-animation') == 'fade-in') {
				$(this).delay($(this).attr('data-delay')).animate({
					'opacity' : 1
				},800,'easeOutSine');	
			} else if($(this).attr('data-animation') == 'grow-in') {
				var $that = $(this);
				setTimeout(function(){ 
					$that.transition({ scale: 1, 'opacity':1 },900,'cubic-bezier(0.15, 0.84, 0.35, 1.25)');
				},$that.attr('data-delay'));
			}
		
		},{accX: 0, accY: -105},'easeInCubic');

	});
	
	/***************** FULL WIDTH ******************/
	function fullWidthSections(){
		var $shortWindowWidth = ($(window).width() <= parseInt($('#thmlv-main').css('max-width'))) ? parseInt($('#thmlv-main').css('max-width')) : $(window).width();
		var $justOutOfSight = Math.ceil((($shortWindowWidth - parseInt($('#thmlv-main').css('max-width'))) / 2) )
		$justOutOfSight = $justOutOfSight + parseInt($('#thmlv-main').css('padding-right'));
		$('.thmlv-short-full-width-section').each(function(){
			$(this).css({
				'margin-left': - $justOutOfSight,
				'padding-left': $justOutOfSight,
				'padding-right': $justOutOfSight,
				'visibility': 'visible'
			});	
		});
	};
	
	fullWidthSections();
	
	$(window).resize(function(){
		fullWidthSections();
	});
	
	/***************** MILESTONE COUNTER ******************/
	if(!$('body').hasClass('mobile')) {
		$('.thmlv-short-milestone').each(function() {
			//symbol
			if($(this).has('[data-symbol]')) {
				if($(this).attr('data-symbol-pos') == 'before') {
					$(this).find('.thmlv-short-number').prepend($(this).attr('data-symbol'));
				} else {
					$(this).find('.thmlv-short-number').append($(this).attr('data-symbol'));
				}
			}
			
			//animation
			$(this).appear(function() {
				var $endNum = parseInt($(this).find('.thmlv-short-number span').text());
				$(this).find('.thmlv-short-number span').countTo({
					from: 0,
					to: $endNum,
					speed: 1500,
					refreshInterval: 20
				});
			},{accX: 0, accY: 0});
		}); 
	}
	
	/***************** TABBED ******************/
	$('.thmlv-short-tabbed > ul li a').click(function(){
		var $id = $(this).attr('href');
		
		if(!$(this).hasClass('thmlv-short-active-tab') && !$(this).hasClass('thmlv-short-loading')){
			$(this).parents('ul').find('a').removeClass('thmlv-short-active-tab');
			$(this).addClass('thmlv-short-active-tab');
			
			$(this).parents('.thmlv-short-tabbed').find('> div:not(.thmlv-short-clear)').css({'visibility':'hidden','position':'absolute','opacity':'0','left':'-9999px','display':'none'});
			$(this).parents('.thmlv-short-tabbed').find('> div'+$id).css({'visibility':'visible', 'position' : 'relative','left':'0','display':'block'}).stop().animate({'opacity':1});
			
			if($(this).parents('.thmlv-short-tabbed').find('> div'+$id + ' .iframe-embed').length > 0) responsiveVideoIframes();
		}
		
		return false;
	});
	
	$('.thmlv-short-tabbed').each(function(){
		if($(this).find('.thmlv-short-testimonial_slider').length == 0 && $(this).find('iframe').length == 0){
			$(this).find('> ul li:first-child a').click();
		}	
		if($(this).find('.thmlv-short-testimonial_slider').length == 1 || $(this).find('iframe').length > 0 ){
			var $that = $(this);
			
			$(this).find('.thmlv-short-tab').show().css({'opacity':0,'height':'1px'});
			$(this).find('> ul li a').addClass('thmlv-short-loading');
			
			setTimeout(function(){ 
				$that.find('.thmlv-short-tab').hide().css({'opacity':1,'height':'auto'}); 
				$that.find('> ul li a').removeClass('thmlv-short-loading');
				$that.find('> ul li:first-child a').click(); 
			},900);
		}
	});
	
	/***************** Testimonial Slider ******************/
	$('.thmlv-short-testimonial_slider').animate({'opacity':'1'},800);

	//testimonial slider controls
	$('body').on('click','.thmlv-short-testimonial_slider .thmlv-short-controls li', function(){
	
		if($(this).find('span').hasClass('thmlv-short-active')) return false;
	
		var $index = $(this).index();
		var currentHeight = $(this).parents('.thmlv-short-testimonial_slider').find('.thmlv-short-slides blockquote').eq($index).height();
	
		$(this).parents('.thmlv-short-testimonial_slider').find('li').html('<span class="thmlv-short-pagination-switch"></span>');
		$(this).html('<span class="thmlv-short-pagination-switch thmlv-short-active"></span>');
	
		$(this).parents('.thmlv-short-testimonial_slider').find('.thmlv-short-slides blockquote').stop().css({'opacity':'0', 'left':'-25px', 'z-index': '1'});
		$(this).parents('.thmlv-short-testimonial_slider').find('.thmlv-short-slides blockquote').eq($index).stop(true,true).animate({'opacity':'1','left':'0'},550,'easeOutCubic').css('z-index','20');
		$(this).parents('.thmlv-short-testimonial_slider').find('.thmlv-short-slides').stop(true,true).animate({'height' : currentHeight + 20 + 'px' },450,'easeOutCubic');
	
	});


	var $tallestQuote;

	//create controls
	$('.thmlv-short-testimonial_slider').each(function(){
	
		$(this).append('<div class="thmlv-short-controls"><ul></ul></div>');
	
		var slideNum = $(this).find('blockquote').length;
		var $that = $(this);
	
		for(var i=0;i<slideNum;i++) {
			$that.find('.thmlv-short-controls ul').append('<li><span class="thmlv-short-pagination-switch"></span></li>')
		}
	
		//activate first slide
		$(this).find('.thmlv-short-controls ul li').first().click();
	
		//autorotate
		if($(this).attr('data-autorotate').length > 0) {
			slide_interval = (parseInt($(this).attr('data-autorotate')) < 100) ? 4000 : parseInt($(this).attr('data-autorotate'));
			var $that = $(this);
			var $rotate = setInterval(function(){ testimonialRotate($that) },slide_interval);
		}
	
		$(this).find('.thmlv-short-controls li').click(function(e){
			if(typeof e.clientX != 'undefined') clearInterval($rotate);
		});
	
		////swipe for testimonials
		$(this).swipe({
	
			swipeLeft : function(e) {
				$(this).find('.thmlv-short-controls ul li span.thmlv-short-active').parent().next('li').find('span').trigger('click');
				e.stopImmediatePropagation();
				clearInterval($rotate);
				return false;
			 },
			 swipeRight : function(e) {
				$(this).find('.thmlv-short-controls ul li span.thmlv-short-active').parent().prev('li').find('span').trigger('click');
				e.stopImmediatePropagation();
				clearInterval($rotate);
				return false;
			 }    
		});
	
	});

	function testimonialRotate(slider){
	
		var $testimonialLength = slider.find('li').length;
		var $currentTestimonial = slider.find('.thmlv-short-pagination-switch.thmlv-short-active').parent().index();
		if( $currentTestimonial+1 == $testimonialLength) {
			slider.find('ul li:first-child').click();
		} else {
			slider.find('.thmlv-short-pagination-switch.thmlv-short-active').parent().next('li').click();
		}

	}

	function testimonialHeightResize(){
		$('.thmlv-short-testimonial_slider').each(function(){
		
			var $index = $(this).find('.thmlv-short-controls ul li span.thmlv-short-active').parent().index();
			var currentHeight = $(this).find('.thmlv-short-slides blockquote').eq($index).height();
			$(this).find('.thmlv-short-slides').stop(true,true).animate({'height' : currentHeight + 20 + 'px' },450,'easeOutCubic');
		
		});
	}
	
	/***************** TOGGLES ******************/
	$('.thmlv-short-toggle h3 a').click(function(){
		
		if(!$(this).parents('.thmlv-short-toggles').hasClass('thmlv-short-accordion')) { 
			$(this).parents('.thmlv-short-toggle').find('> div').slideToggle(300);
			$(this).parents('.thmlv-short-toggle').toggleClass('thmlv-short-open');
			
			//switch icon
			if( $(this).parents('.thmlv-short-toggle').hasClass('thmlv-short-open') ){
				$(this).find('i').attr('class','icon-minus-sign');
			} else {
				$(this).find('i').attr('class','icon-plus-sign');
			}

			if($(this).parents('.thmlv-short-toggle').find('> div .iframe-embed').length > 0 && $(this).parents('.thmlv-short-toggle').find('> div .iframe-embed iframe').height() == '0') responsiveVideoIframes();
			
			return false;
		}
	});
	
	//accordion
	$('.thmlv-short-accordion .thmlv-short-toggle h3 a').click(function(){
		
		if($(this).parents('.thmlv-short-toggle').hasClass('thmlv-short-open')) return false;
		
		$(this).parents('.thmlv-short-toggles').find('.thmlv-short-toggle > div').slideUp(300);
		$(this).parents('.thmlv-short-toggles').find('.thmlv-short-toggle h3 a i').attr('class','icon-plus-sign');
		$(this).parents('.thmlv-short-toggles').find('.thmlv-short-toggle').removeClass('thmlv-short-open');
		
		$(this).parents('.thmlv-short-toggle').find('> div').slideDown(300);
		$(this).parents('.thmlv-short-toggle').addClass('thmlv-short-open');
		
		//switch icon
		if( $(this).parents('.thmlv-short-toggle').hasClass('thmlv-short-open') ){
			$(this).find('i').attr('class','icon-minus-sign');
		} else {
			$(this).find('i').attr('class','icon-plus-sign');
		}
		
		return false;
	});
	
	//accordion start open
	$('.thmlv-short-accordion > .thmlv-short-toggle').first().addClass('thmlv-short-open').find('> div').show();
	$('.thmlv-short-accordion > .thmlv-short-toggle').first().find('a i').attr('class','icon-minus-sign');
	
	$('.thmlv-short-toggles').each(function(){
		
		var $isAccordion = ($(this).hasClass('thmlv-short-accordion')) ? true : false;
		
		$(this).find('.thmlv-short-toggle').each(function(){
			if($(this).find('> div .thmlv-short-testimonial_slider').length > 0 || $(this).find('> div iframe').length > 0) {
				var $that = $(this);
				$(this).find('> div').show().css({'opacity':0,'height':'1px', 'padding':'0'});
				
				testimonialHeightResize();
				
				setTimeout(function(){
					$that.find('> div').hide().css({'opacity':1,'height':'auto', 'padding':'10px 14px'}); 
					if($isAccordion == true && $that.index() == 0) $that.find('> div').slideDown(300);
				},900);
			} 
		});
	})
	
	
	/***************** SHARING ******************/
	
	if( $('a.thmlv-short-facebook-share').length > 0 || $('a.thmlv-short-twitter-share').length > 0 || $('a.thmlv-short-pinterest-share').length > 0) {

	
		////facebook
		function facebookShare(){
			window.open( 'https://www.facebook.com/sharer/sharer.php?u='+window.location, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		
		$('.thmlv-short-facebook-share').click(facebookShare);
		
		////twitter
		function twitterShare(){
			window.open( 'http://twitter.com/intent/tweet?text='+$(".section-title h1").text() +' '+window.location, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		
		$('.thmlv-short-social .thmlv-short-twitter-share').click(twitterShare);
		
		////pinterest
		function pinterestShare(){
			var $sharingImg = ($('.single-portfolio').length > 0 && $('div[data-featured-img]').attr('data-featured-img') != 'empty' ) ? $('div[data-featured-img]').attr('data-featured-img') : $('#post-area img').first().attr('src'); 
			window.open( 'http://pinterest.com/pin/create/button/?url='+window.location+'&media='+$sharingImg+'&description='+$('.section-title h1').text(), "pinterestWindow", "height=640,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" ) 
			return false;
		}
		
		$('.thmlv-short-social .thmlv-short-pinterest-share').click(pinterestShare);
		
		//social light up
		$('.thmlv-short-social').each(function() {

			$(this).appear(function() {
				
				$(this).addClass('in-sight');
				
				$(this).find('> *').each(function(i){
					
					var $that = $(this);
					
					setTimeout(function(){ 
						
						$that.delay(i*100).queue(function(){ 
							
							var $that = $(this); $(this).addClass('hovered'); 
							
							setTimeout(function(){ 
								$that.removeClass('hovered');
							},300); 
							
						});
					
					},450);
				});
			
			},{accX: 0, accY: -115});
		
		}); 

	}
	
});