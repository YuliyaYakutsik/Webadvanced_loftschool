(function() {
  'use strict';

  var myMouseParallax = (function () {
  	var layer = $('.parallax').find('.parallax__layer');
  	
  	var init = function () {
  		_setUpListeners ();
  	};

  	var _setUpListeners = function () {
  		$(window).on('mousemove', _moveLayers);
  	};

  	var _moveLayers = function (e) {
  		var mouseX = e.pageX,
  			mouseY = e.pageY,
  			w = (window.innerWidth/2) - mouseX,
  			h = (window.innerHeight/2) - mouseY;

  		layer.map(function (key,value) {
  			var bottomPosition = ((window.innerHeight/2)*(key/100)),
  				widthPosition = w*(key/100),
  				heightPosition = h*(key/100);

  			$(value).css( {
  				'bottom': '-' + bottomPosition + 'px',
  				'transform': 'translate3d('+widthPosition+'px, '+heightPosition+'px, 0)'
  			});
  		});
  	};

  	return {
  		init:init
  	};

  })();

  var burgerMenu = (function () {

    var menu = $('.fullscreen-menu');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.burger-menu__link').on('click', _openMenu);
    };

    var _openMenu = function (e) {

      e.preventDefault ();

      if ($(this).hasClass('active')) {

        $(this).removeClass('active');
        $('body').css('position','static');
        menu.slideUp();

      } else {

        $(this).addClass('active');
        $('body').css('position','fixed');
        menu.slideDown();

      }

    };

    return{

      init:init

    };

  })();

  var blurForm = (function () {

    var wrapper = $('.write-me__blur-wrapper'),
        wrapperTop = $('.write-me'),
        form = $('.write-me__blur');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $(window).on('resize', _setBlur);
      $(document).ready(_setBlur);
    };

    var _setBlur = function () {

      var imgWidth = $('.reviews__background').width(),
          posLeft = - wrapper.position().left,
          posTop = - wrapperTop.position().top;

      form.css({
        'background-size': imgWidth + 'px'+ ' ' + 'auto',
        'backgroundPosition': posLeft + 'px' + ' ' + posTop + 'px'
      });

    };

    return{

      init:init

    };

  })();

  var sideBarBlog = (function () {

    var sideBar = $('.nav-blog');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.nav-blog__toggle-link').on('click', _openSideBar);
      $(document).on('click', _closeSideBar);
    };

    var _openSideBar = function (e) {

      e.preventDefault();
      var $this = $(this);

      if ($this.hasClass('active')) {

        $this.removeClass('active');
        sideBar.removeClass('active');

      } else {

        $this.addClass('active');
        sideBar.addClass('active');

      }

    };

    var _closeSideBar = function (e) {

      var $this=$(e.target);

      if(!$this.closest(sideBar).length){
        $('.nav-blog__toggle-link').removeClass('active');
        sideBar.removeClass('active');
      }
    };

    return{

      init:init

    };

  })();

  var sideBarNavigation = (function () {

    var sideBar = $('.nav-blog');
    var sideBarList = $('.nav-blog__list');
    var sideBarWrapper = sideBar.closest('.container');
    var contentBarItem = sideBarWrapper.find('.content-blog__item');
    var sideBarItem = sideBarList.find('.nav-blog__link');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $(window).scroll(_checkSection);
      $(document).ready(function() {

        sideBarItem.on('click', function(e) {
          e.preventDefault();          
          _showSection($(this).attr('href'), true);
        });

        _showSection(window.location.hash, false);

      });
      $(window).scroll(_SideBarFixed);
      $(window).on('resize scroll', _SideBarWidthFixed);
      
    };

    var _checkSection = function () {

      contentBarItem.each(function() {
        var $this = $(this),
            topEdge = $this.offset().top - 250,
            bottomEdge = topEdge + $this.height(),
            wScroll = $(window).scrollTop();

        if (topEdge <= wScroll && bottomEdge >= wScroll) {

          var currentId = $this.data('section');
          var reqLink = sideBarItem.filter('[href="#' + currentId + '"]');

          reqLink.closest('.nav-blog__item').addClass('active').siblings().removeClass('active');

          window.location.hash = currentId;

        }

      });

    };

    function _showSection (section, isAnimate) {
  
      var direction = section.replace(/#/, '');
      var reqSection = contentBarItem.filter('[data-section="' + direction + '"]');
      var reqSectionPos = reqSection.offset().top;

      if (isAnimate) {
        $('body, html').animate({scrollTop: reqSectionPos}, 500);
      } else {
        $('body, html').scrollTop(reqSectionPos);
      }
    }

    var _SideBarFixed = function () {

      var topEdge = sideBarWrapper.offset().top - 30,
          leftEdge = sideBarList.position().left,
          wScroll = $(document).scrollTop();

      if (topEdge <= wScroll) {

        sideBar.addClass('fixed');

      } else {

        sideBar.removeClass('fixed');
        
      }

    };

    var _SideBarWidthFixed = function () {

      var OSName = "Unknown OS";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        else if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
        else if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
        else if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";

      var sideBarWidth = ($(window).width()>=1500)?((1500-40)*0.3+'px'):(OSName=="MacOS" && ($(window).width()<=768))?($(window).width()*0.6+'px'):(OSName!="MacOS" && $(window).width()<=(768-17))?($(window).width()*0.6+'px'):(($(window).width()-40)*0.3+'px');

      sideBar.css('width', sideBarWidth);

    };

    return{

      init:init

    };

  })();

  var flipper = (function () {

    var flipperContainer = $('.flipper');
    var authorizationLink = $('.authorization__link');
    var toMain = $('.authorization__form-button_back');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      authorizationLink.on('click', _flipperStart);
      $(document).on('click', _flipperEnd);
      toMain.on('click', _toMain);
    };

    var _flipperStart = function (e) {

      var $this = $(this);
      e.preventDefault();
      flipperContainer.addClass('active');
      $this.fadeOut(1000);

    };

    var _flipperEnd = function (e) {

      var $this=$(e.target);

      if(!$this.closest(flipperContainer).length && !$this.closest('.authorization').length){
        flipperContainer.removeClass('active');
        authorizationLink.fadeIn(1000);
      }

    };

    var _toMain = function (e) {

      var $this=$(this);

      e.preventDefault();
      flipperContainer.removeClass('active');
      authorizationLink.fadeIn(1000);

    };

    return{

      init:init

    };

  })();

  var preloader = (function () {

    var preloader = $('.preloader');
    var percentsTotal = 0;

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $(document).ready(_preloaderStart);
    };

    var _preloaderStart = function () {
      var myImages = imgPath.toArray();

      loadImages(myImages);
    };

    var imgPath = $('*').map(function(index, elem) {
        
      var background = $(elem).css('background-image'),
          img = $(elem).is('img'),
          path = '';

      if (background != 'none') {

        path = background.replace('url("', '').replace('")', '');

      }

      if (img) {

        path = $(elem).attr('src');

      }

      if (path) {
        return path;
      }

    });

    var setPercents = function (total, current) {

      var percents = Math.ceil(current/total*100);

      $('.preloader__percents').text(percents + '%');

      if (percents >=100) {
        setTimeout(function(){
          preloader.fadeOut()
        }, 500);
      }

    };

    var loadImages = function (images) {
      if (!images.length) {
        preloader.fadeOut();
      }

      images.forEach( function(element, index) {
        var fakeImage = $('<img>', {
          attr: {
            src: element
          }

        });

        fakeImage.on('load error', function() {

          percentsTotal++;
          setPercents(images.length, percentsTotal);

        });

      });

    };

    return{

      init:init

    };

  })();

  var slider = (function () {

    var counter = 1,
        duration = 500,
        inProcess = false;

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.slider__link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            sliderContainer = $this.closest('.slider'),
            items = $('.slider__display_first').find('.slider__item'),
            itemsDescription = sliderContainer.find('.works__item'),
            itemsDescriptionContainer = itemsDescription.closest('.works__list');

        if (!inProcess) {
          inProcess = true;

          if ($this.hasClass('slider__link_down')) {
            counter--;
          } else {
            counter++;
          }

          if (counter > items.length-1) {
            counter = 0
          }

          if (counter < 0) {
            counter = items.length-1
          }

          var mainSrc = items.eq(counter).find('img').attr('src');

          var activePicFadeOut = $.Deferred(),
              activePicLoaded = $.Deferred(),
              activePicFadeIn = $.Deferred(),
              descContainerFadeOut = $.Deferred(),
              descContainerChanged = $.Deferred(),
              descContainerFadeIn = $.Deferred(),
              sliderChangeFinished = $.Deferred();

          $('.slider__active-pic').fadeOut(250, function(){
            activePicFadeOut.resolve();
          });

          activePicFadeOut.done (function() {
            $('.slider__active-pic').attr('src', mainSrc).on('load', function () {
              activePicLoaded.resolve();
            });
          });

          activePicLoaded.done (function (){
            $('.slider__active-pic').fadeIn(250, function () {
              activePicFadeIn.resolve();
            });
          });

          itemsDescriptionContainer.fadeOut(220, function() {
            descContainerFadeOut.resolve();
          });

          descContainerFadeOut.done (function () {
            itemsDescription.filter('.active').removeClass('active');
            itemsDescription.eq(counter).addClass('active');
            descContainerChanged.resolve();
          });

          descContainerChanged.done (function () {
            itemsDescriptionContainer.fadeIn(220, function () {
              descContainerFadeIn.resolve();
            });
          });

          if ($this.hasClass('slider__link_down')) {
            _showNextSlide($('.slider__display_first'), 'up');
            _showNextSlide($('.slider__display_opposite'), 'down');
            sliderChangeFinished.resolve();
          } else {
            _showNextSlide($('.slider__display_first'), 'down');
            _showNextSlide($('.slider__display_opposite'), 'up');
            sliderChangeFinished.resolve();
          }

          $.when (activePicFadeIn, descContainerFadeIn, sliderChangeFinished).done (function () {
            inProcess = false;
          });
        }

      });
    };

    var _showNextSlide = function (container, direction) {

      var innerCounter = counter,
          items = container.find('.slider__item'),
          oldItem = items.filter('.active');

      if (container.hasClass('slider__display_first')) {
        (innerCounter - 1 < 0) ? innerCounter = items.length-1 : innerCounter-- ;
      } else {
        (innerCounter + 1 > items.length-1) ? innerCounter = 0 : innerCounter++ ;
      }

      var newItem = items.eq(innerCounter);

      _onSlide(newItem, oldItem, direction);

    };

    var _onSlide = function (newItem, oldItem, direction) {

      var direction = (direction == 'down')? 100 : -100;

      newItem.css('top', direction*(-1) + '%');
      oldItem.animate({'top': direction +'%'}, duration);
      newItem.animate({'top': '0'}, duration, function(){
        newItem.siblings().removeClass('active');
        newItem.addClass('active');
      });
    };

    return{

      init:init

    };

  })();

  var downArrow = (function () {

    var scrollTo = $('.section_to_scroll');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $('.down-arrow').on('click', function(e) {
        e.preventDefault();          
        _scrollToSection();
      });
    };

    var _scrollToSection = function () {
  
      var reqPos = scrollTo.offset().top;

      $('body, html').animate({scrollTop: reqPos}, 500);

    };

    return{

      init:init

    };

  })();

  var upArrow = (function () {

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      $('.up-arrow').on('click', function(e) {
        e.preventDefault();          
        _scrollToTop();
      });
    };

    var _scrollToTop = function () {

      $('body, html').animate({scrollTop: 0}, 500);

    };

    return{

      init:init

    };

  })();

  var writeMe = (function () {

    var form = $('#reviews__form');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {

      form.on('submit', function (e) {
        e.preventDefault();
        _clearMessagesAndInputStyles();
        _contactMeFormInitialization();
      });

      $('.reviews__form-button-reset').on('click', function(e) {
        e.preventDefault();
        form[0].reset();
        _clearMessagesAndInputStyles();        
      });

    };

    var _clearMessagesAndInputStyles = function() {

      $('.reviews-form__messages-element').slideUp(300);
      form.find('.reviews__form-element').each(function () {
          $(this).removeClass('input-alert');
      });

    };

    var _contactMeFormInitialization = function () {

        var formdata = form.serialize(),
            sendName = $('#sendName').val(),
            sendEmail = $('#sendEmail').val(),
            sendText = $('#sendText').val();

        if (!sendName.trim() || !sendEmail.trim() || !sendText.trim()) {

            $('#emptyFieldsDanger').slideDown(300, function () {
                _populateAndHighlightEmptyInputs();
            });
            return false;

        } else { 

            $('#onChecking').show('fast');

            $.ajax({
                url: 'assets/php/mail.php',
                type: 'POST',
                data: formdata,
                success: function(data) {
                    var popup = data.status ? '#success' : '#error';

                    $('#onChecking').hide('fast'); 
                    $(popup).slideDown('fast', function() {
                      _clearFormInputs();
                    });
                }
            });

        }
    };

    var _populateAndHighlightEmptyInputs = function() {

      var emptyInputs = [];

      $('#reviews__form').find('.reviews__form-element').each(function () {
        if (!$(this).val().trim()) {
            emptyInputs.push($(this));
        }
      });

      console.log(emptyInputs);

      _highlightEmptyInputs(emptyInputs);

    };

    var _highlightEmptyInputs = function(emptyInputs) {

      emptyInputs.forEach(function (entry) {
          $(entry).addClass('input-alert');
      });

    };

    var _clearFormInputs = function() {
      form.each(function () {
        this.reset();
      });
    };

    return{

      init:init

    };

  })();

  //вставка отстилизованной GoogleMap
  var initMap = (function () {

    var init = function () {

      var styleArray=[
        {
          featureType:'water',
          stylers:[{color:'#00bfa5'}]
        },
        {
          featureType:'landscape',
          elementType:'geometry.fill',
          stylers:[{color:'#ffffff'}]
        },
        {
          featureType:'landscape.man_made',
          elementType:'all',
          stylers:[{saturation:'-70'}]
        },
        {
          featureType:'landscape.natural',
          elementType:'all',
          stylers:[{visibility:'off'}]
        },
        {
          featureType:'poi',
          elementType:'labels',
          stylers:[{visibility:'off'}]
        },
        {
          featureType:'poi.park',
          elementType:'all',
          stylers:[{visibility:'off'}]
        },
        {
          featureType:'road',
          elementType:'all',
          stylers:[{lightness:'-5'}]
        },
        {
          featureType:'transit',
          elementType:'labels',
          stylers:[{visibility:'off'}]
        }
      ];

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.912838, lng: 27.566431},
        scrollwheel: false,
        styles:styleArray,
        zoom: 15,
        disableDefaultUI:true
      });

      var marker = new google.maps.Marker({
        position: {lat: 53.910684, lng: 27.556924},
        // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
        map: map,
        // Пишем название маркера - появится если навести на него курсор и немного подождать
        title: 'Мое местонахождение',
        // Укажем свою иконку для маркера
        icon: 'assets/img/map_marker_large.png'
      });
    };

    return{

      init:init

    };

  })();

  $(document).ready(function() {

    //вызываем при условии
    if($('.parallax').length){
      myMouseParallax.init();
    }

    if($('.fullscreen-menu').length){
      burgerMenu.init();
    }

    if($('.blur').length){
      blurForm.init();
    }

    if($('.nav-blog').length){
      sideBarBlog.init();
      sideBarNavigation.init();  
    }

    if($('.preloader').length){
      preloader.init();  
    }

    if($('.flipper').length){
      flipper.init();  
    }

    if($('.slider').length){
      slider.init();  
    }

    if($('.down-arrow').length){
      downArrow.init();  
    }

    if($('.up-arrow').length){
      upArrow.init();  
    }

    if($('.write-me').length){
      writeMe.init();  
    }

    if($('.map').length){
      initMap.init();  
    }

  });

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgdmFyIG15TW91c2VQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgXHR2YXIgbGF5ZXIgPSAkKCcucGFyYWxsYXgnKS5maW5kKCcucGFyYWxsYXhfX2xheWVyJyk7XHJcbiAgXHRcclxuICBcdHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIFx0XHRfc2V0VXBMaXN0ZW5lcnMgKCk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHRcdCQod2luZG93KS5vbignbW91c2Vtb3ZlJywgX21vdmVMYXllcnMpO1xyXG4gIFx0fTtcclxuXHJcbiAgXHR2YXIgX21vdmVMYXllcnMgPSBmdW5jdGlvbiAoZSkge1xyXG4gIFx0XHR2YXIgbW91c2VYID0gZS5wYWdlWCxcclxuICBcdFx0XHRtb3VzZVkgPSBlLnBhZ2VZLFxyXG4gIFx0XHRcdHcgPSAod2luZG93LmlubmVyV2lkdGgvMikgLSBtb3VzZVgsXHJcbiAgXHRcdFx0aCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQvMikgLSBtb3VzZVk7XHJcblxyXG4gIFx0XHRsYXllci5tYXAoZnVuY3Rpb24gKGtleSx2YWx1ZSkge1xyXG4gIFx0XHRcdHZhciBib3R0b21Qb3NpdGlvbiA9ICgod2luZG93LmlubmVySGVpZ2h0LzIpKihrZXkvMTAwKSksXHJcbiAgXHRcdFx0XHR3aWR0aFBvc2l0aW9uID0gdyooa2V5LzEwMCksXHJcbiAgXHRcdFx0XHRoZWlnaHRQb3NpdGlvbiA9IGgqKGtleS8xMDApO1xyXG5cclxuICBcdFx0XHQkKHZhbHVlKS5jc3MoIHtcclxuICBcdFx0XHRcdCdib3R0b20nOiAnLScgKyBib3R0b21Qb3NpdGlvbiArICdweCcsXHJcbiAgXHRcdFx0XHQndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcrd2lkdGhQb3NpdGlvbisncHgsICcraGVpZ2h0UG9zaXRpb24rJ3B4LCAwKSdcclxuICBcdFx0XHR9KTtcclxuICBcdFx0fSk7XHJcbiAgXHR9O1xyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdGluaXQ6aW5pdFxyXG4gIFx0fTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIGJ1cmdlck1lbnUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBtZW51ID0gJCgnLmZ1bGxzY3JlZW4tbWVudScpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCcuYnVyZ2VyLW1lbnVfX2xpbmsnKS5vbignY2xpY2snLCBfb3Blbk1lbnUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQgKCk7XHJcblxyXG4gICAgICBpZiAoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLmNzcygncG9zaXRpb24nLCdzdGF0aWMnKTtcclxuICAgICAgICBtZW51LnNsaWRlVXAoKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQoJ2JvZHknKS5jc3MoJ3Bvc2l0aW9uJywnZml4ZWQnKTtcclxuICAgICAgICBtZW51LnNsaWRlRG93bigpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIGJsdXJGb3JtID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgd3JhcHBlciA9ICQoJy53cml0ZS1tZV9fYmx1ci13cmFwcGVyJyksXHJcbiAgICAgICAgd3JhcHBlclRvcCA9ICQoJy53cml0ZS1tZScpLFxyXG4gICAgICAgIGZvcm0gPSAkKCcud3JpdGUtbWVfX2JsdXInKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBfc2V0Qmx1cik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9zZXRCbHVyKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRCbHVyID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIGltZ1dpZHRoID0gJCgnLnJldmlld3NfX2JhY2tncm91bmQnKS53aWR0aCgpLFxyXG4gICAgICAgICAgcG9zTGVmdCA9IC0gd3JhcHBlci5wb3NpdGlvbigpLmxlZnQsXHJcbiAgICAgICAgICBwb3NUb3AgPSAtIHdyYXBwZXJUb3AucG9zaXRpb24oKS50b3A7XHJcblxyXG4gICAgICBmb3JtLmNzcyh7XHJcbiAgICAgICAgJ2JhY2tncm91bmQtc2l6ZSc6IGltZ1dpZHRoICsgJ3B4JysgJyAnICsgJ2F1dG8nLFxyXG4gICAgICAgICdiYWNrZ3JvdW5kUG9zaXRpb24nOiBwb3NMZWZ0ICsgJ3B4JyArICcgJyArIHBvc1RvcCArICdweCdcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgc2lkZUJhckJsb2cgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzaWRlQmFyID0gJCgnLm5hdi1ibG9nJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5uYXYtYmxvZ19fdG9nZ2xlLWxpbmsnKS5vbignY2xpY2snLCBfb3BlblNpZGVCYXIpO1xyXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBfY2xvc2VTaWRlQmFyKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9vcGVuU2lkZUJhciA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzaWRlQmFyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICR0aGlzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzaWRlQmFyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2xvc2VTaWRlQmFyID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcz0kKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgIGlmKCEkdGhpcy5jbG9zZXN0KHNpZGVCYXIpLmxlbmd0aCl7XHJcbiAgICAgICAgJCgnLm5hdi1ibG9nX190b2dnbGUtbGluaycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBzaWRlQmFyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgc2lkZUJhck5hdmlnYXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzaWRlQmFyID0gJCgnLm5hdi1ibG9nJyk7XHJcbiAgICB2YXIgc2lkZUJhckxpc3QgPSAkKCcubmF2LWJsb2dfX2xpc3QnKTtcclxuICAgIHZhciBzaWRlQmFyV3JhcHBlciA9IHNpZGVCYXIuY2xvc2VzdCgnLmNvbnRhaW5lcicpO1xyXG4gICAgdmFyIGNvbnRlbnRCYXJJdGVtID0gc2lkZUJhcldyYXBwZXIuZmluZCgnLmNvbnRlbnQtYmxvZ19faXRlbScpO1xyXG4gICAgdmFyIHNpZGVCYXJJdGVtID0gc2lkZUJhckxpc3QuZmluZCgnLm5hdi1ibG9nX19saW5rJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKHdpbmRvdykuc2Nyb2xsKF9jaGVja1NlY3Rpb24pO1xyXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgc2lkZUJhckl0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgICAgICAgICBcclxuICAgICAgICAgIF9zaG93U2VjdGlvbigkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIF9zaG93U2VjdGlvbih3aW5kb3cubG9jYXRpb24uaGFzaCwgZmFsc2UpO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoX1NpZGVCYXJGaXhlZCk7XHJcbiAgICAgICQod2luZG93KS5vbigncmVzaXplIHNjcm9sbCcsIF9TaWRlQmFyV2lkdGhGaXhlZCk7XHJcbiAgICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2NoZWNrU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIGNvbnRlbnRCYXJJdGVtLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgdG9wRWRnZSA9ICR0aGlzLm9mZnNldCgpLnRvcCAtIDI1MCxcclxuICAgICAgICAgICAgYm90dG9tRWRnZSA9IHRvcEVkZ2UgKyAkdGhpcy5oZWlnaHQoKSxcclxuICAgICAgICAgICAgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgICAgaWYgKHRvcEVkZ2UgPD0gd1Njcm9sbCAmJiBib3R0b21FZGdlID49IHdTY3JvbGwpIHtcclxuXHJcbiAgICAgICAgICB2YXIgY3VycmVudElkID0gJHRoaXMuZGF0YSgnc2VjdGlvbicpO1xyXG4gICAgICAgICAgdmFyIHJlcUxpbmsgPSBzaWRlQmFySXRlbS5maWx0ZXIoJ1tocmVmPVwiIycgKyBjdXJyZW50SWQgKyAnXCJdJyk7XHJcblxyXG4gICAgICAgICAgcmVxTGluay5jbG9zZXN0KCcubmF2LWJsb2dfX2l0ZW0nKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBjdXJyZW50SWQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX3Nob3dTZWN0aW9uIChzZWN0aW9uLCBpc0FuaW1hdGUpIHtcclxuICBcclxuICAgICAgdmFyIGRpcmVjdGlvbiA9IHNlY3Rpb24ucmVwbGFjZSgvIy8sICcnKTtcclxuICAgICAgdmFyIHJlcVNlY3Rpb24gPSBjb250ZW50QmFySXRlbS5maWx0ZXIoJ1tkYXRhLXNlY3Rpb249XCInICsgZGlyZWN0aW9uICsgJ1wiXScpO1xyXG4gICAgICB2YXIgcmVxU2VjdGlvblBvcyA9IHJlcVNlY3Rpb24ub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgaWYgKGlzQW5pbWF0ZSkge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcVNlY3Rpb25Qb3N9LCA1MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxU2VjdGlvblBvcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgX1NpZGVCYXJGaXhlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciB0b3BFZGdlID0gc2lkZUJhcldyYXBwZXIub2Zmc2V0KCkudG9wIC0gMzAsXHJcbiAgICAgICAgICBsZWZ0RWRnZSA9IHNpZGVCYXJMaXN0LnBvc2l0aW9uKCkubGVmdCxcclxuICAgICAgICAgIHdTY3JvbGwgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuXHJcbiAgICAgIGlmICh0b3BFZGdlIDw9IHdTY3JvbGwpIHtcclxuXHJcbiAgICAgICAgc2lkZUJhci5hZGRDbGFzcygnZml4ZWQnKTtcclxuXHJcbiAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfU2lkZUJhcldpZHRoRml4ZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgT1NOYW1lID0gXCJVbmtub3duIE9TXCI7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJXaW5cIikgIT0gLTEpIE9TTmFtZSA9IFwiV2luZG93c1wiO1xyXG4gICAgICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT0gLTEpIE9TTmFtZSA9IFwiTWFjT1NcIjtcclxuICAgICAgICBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiWDExXCIpICE9IC0xKSBPU05hbWUgPSBcIlVOSVhcIjtcclxuICAgICAgICBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTGludXhcIikgIT0gLTEpIE9TTmFtZSA9IFwiTGludXhcIjtcclxuXHJcbiAgICAgIHZhciBzaWRlQmFyV2lkdGggPSAoJCh3aW5kb3cpLndpZHRoKCk+PTE1MDApPygoMTUwMC00MCkqMC4zKydweCcpOihPU05hbWU9PVwiTWFjT1NcIiAmJiAoJCh3aW5kb3cpLndpZHRoKCk8PTc2OCkpPygkKHdpbmRvdykud2lkdGgoKSowLjYrJ3B4Jyk6KE9TTmFtZSE9XCJNYWNPU1wiICYmICQod2luZG93KS53aWR0aCgpPD0oNzY4LTE3KSk/KCQod2luZG93KS53aWR0aCgpKjAuNisncHgnKTooKCQod2luZG93KS53aWR0aCgpLTQwKSowLjMrJ3B4Jyk7XHJcblxyXG4gICAgICBzaWRlQmFyLmNzcygnd2lkdGgnLCBzaWRlQmFyV2lkdGgpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIGZsaXBwZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBmbGlwcGVyQ29udGFpbmVyID0gJCgnLmZsaXBwZXInKTtcclxuICAgIHZhciBhdXRob3JpemF0aW9uTGluayA9ICQoJy5hdXRob3JpemF0aW9uX19saW5rJyk7XHJcbiAgICB2YXIgdG9NYWluID0gJCgnLmF1dGhvcml6YXRpb25fX2Zvcm0tYnV0dG9uX2JhY2snKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXV0aG9yaXphdGlvbkxpbmsub24oJ2NsaWNrJywgX2ZsaXBwZXJTdGFydCk7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIF9mbGlwcGVyRW5kKTtcclxuICAgICAgdG9NYWluLm9uKCdjbGljaycsIF90b01haW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2ZsaXBwZXJTdGFydCA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXJDb250YWluZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAkdGhpcy5mYWRlT3V0KDEwMDApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9mbGlwcGVyRW5kID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcz0kKGUudGFyZ2V0KTtcclxuXHJcbiAgICAgIGlmKCEkdGhpcy5jbG9zZXN0KGZsaXBwZXJDb250YWluZXIpLmxlbmd0aCAmJiAhJHRoaXMuY2xvc2VzdCgnLmF1dGhvcml6YXRpb24nKS5sZW5ndGgpe1xyXG4gICAgICAgIGZsaXBwZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGF1dGhvcml6YXRpb25MaW5rLmZhZGVJbigxMDAwKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF90b01haW4gPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQodGhpcyk7XHJcblxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXJDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBhdXRob3JpemF0aW9uTGluay5mYWRlSW4oMTAwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeShfcHJlbG9hZGVyU3RhcnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3ByZWxvYWRlclN0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgbXlJbWFnZXMgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgIGxvYWRJbWFnZXMobXlJbWFnZXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24oaW5kZXgsIGVsZW0pIHtcclxuICAgICAgICBcclxuICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW0pLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG4gICAgICAgICAgaW1nID0gJChlbGVtKS5pcygnaW1nJyksXHJcbiAgICAgICAgICBwYXRoID0gJyc7XHJcblxyXG4gICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuXHJcbiAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpbWcpIHtcclxuXHJcbiAgICAgICAgcGF0aCA9ICQoZWxlbSkuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocGF0aCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24gKHRvdGFsLCBjdXJyZW50KSB7XHJcblxyXG4gICAgICB2YXIgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudC90b3RhbCoxMDApO1xyXG5cclxuICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuXHJcbiAgICAgIGlmIChwZXJjZW50cyA+PTEwMCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KClcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcclxuICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaW1hZ2VzLmZvckVhY2goIGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XHJcbiAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgYXR0cjoge1xyXG4gICAgICAgICAgICBzcmM6IGVsZW1lbnRcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIHNsaWRlciA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGNvdW50ZXIgPSAxLFxyXG4gICAgICAgIGR1cmF0aW9uID0gNTAwLFxyXG4gICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCcuc2xpZGVyX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgc2xpZGVyQ29udGFpbmVyID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLFxyXG4gICAgICAgICAgICBpdGVtcyA9ICQoJy5zbGlkZXJfX2Rpc3BsYXlfZmlyc3QnKS5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb24gPSBzbGlkZXJDb250YWluZXIuZmluZCgnLndvcmtzX19pdGVtJyksXHJcbiAgICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb25Db250YWluZXIgPSBpdGVtc0Rlc2NyaXB0aW9uLmNsb3Nlc3QoJy53b3Jrc19fbGlzdCcpO1xyXG5cclxuICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xyXG4gICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3NsaWRlcl9fbGlua19kb3duJykpIHtcclxuICAgICAgICAgICAgY291bnRlci0tO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChjb3VudGVyID4gaXRlbXMubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgY291bnRlciA9IDBcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY291bnRlciA8IDApIHtcclxuICAgICAgICAgICAgY291bnRlciA9IGl0ZW1zLmxlbmd0aC0xXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdmFyIG1haW5TcmMgPSBpdGVtcy5lcShjb3VudGVyKS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICB2YXIgYWN0aXZlUGljRmFkZU91dCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBhY3RpdmVQaWNMb2FkZWQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgYWN0aXZlUGljRmFkZUluID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIGRlc2NDb250YWluZXJGYWRlT3V0ID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIGRlc2NDb250YWluZXJDaGFuZ2VkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIGRlc2NDb250YWluZXJGYWRlSW4gPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgc2xpZGVyQ2hhbmdlRmluaXNoZWQgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICAgJCgnLnNsaWRlcl9fYWN0aXZlLXBpYycpLmZhZGVPdXQoMjUwLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBhY3RpdmVQaWNGYWRlT3V0LnJlc29sdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGFjdGl2ZVBpY0ZhZGVPdXQuZG9uZSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2FjdGl2ZS1waWMnKS5hdHRyKCdzcmMnLCBtYWluU3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBhY3RpdmVQaWNMb2FkZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGFjdGl2ZVBpY0xvYWRlZC5kb25lIChmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fYWN0aXZlLXBpYycpLmZhZGVJbigyNTAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBhY3RpdmVQaWNGYWRlSW4ucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb25Db250YWluZXIuZmFkZU91dCgyMjAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkZXNjQ29udGFpbmVyRmFkZU91dC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBkZXNjQ29udGFpbmVyRmFkZU91dC5kb25lIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zRGVzY3JpcHRpb24uZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uLmVxKGNvdW50ZXIpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgZGVzY0NvbnRhaW5lckNoYW5nZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZGVzY0NvbnRhaW5lckNoYW5nZWQuZG9uZSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uQ29udGFpbmVyLmZhZGVJbigyMjAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBkZXNjQ29udGFpbmVyRmFkZUluLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ3NsaWRlcl9fbGlua19kb3duJykpIHtcclxuICAgICAgICAgICAgX3Nob3dOZXh0U2xpZGUoJCgnLnNsaWRlcl9fZGlzcGxheV9maXJzdCcpLCAndXAnKTtcclxuICAgICAgICAgICAgX3Nob3dOZXh0U2xpZGUoJCgnLnNsaWRlcl9fZGlzcGxheV9vcHBvc2l0ZScpLCAnZG93bicpO1xyXG4gICAgICAgICAgICBzbGlkZXJDaGFuZ2VGaW5pc2hlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfc2hvd05leHRTbGlkZSgkKCcuc2xpZGVyX19kaXNwbGF5X2ZpcnN0JyksICdkb3duJyk7XHJcbiAgICAgICAgICAgIF9zaG93TmV4dFNsaWRlKCQoJy5zbGlkZXJfX2Rpc3BsYXlfb3Bwb3NpdGUnKSwgJ3VwJyk7XHJcbiAgICAgICAgICAgIHNsaWRlckNoYW5nZUZpbmlzaGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAkLndoZW4gKGFjdGl2ZVBpY0ZhZGVJbiwgZGVzY0NvbnRhaW5lckZhZGVJbiwgc2xpZGVyQ2hhbmdlRmluaXNoZWQpLmRvbmUgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zaG93TmV4dFNsaWRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgICB2YXIgaW5uZXJDb3VudGVyID0gY291bnRlcixcclxuICAgICAgICAgIGl0ZW1zID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgIG9sZEl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5hY3RpdmUnKTtcclxuXHJcbiAgICAgIGlmIChjb250YWluZXIuaGFzQ2xhc3MoJ3NsaWRlcl9fZGlzcGxheV9maXJzdCcpKSB7XHJcbiAgICAgICAgKGlubmVyQ291bnRlciAtIDEgPCAwKSA/IGlubmVyQ291bnRlciA9IGl0ZW1zLmxlbmd0aC0xIDogaW5uZXJDb3VudGVyLS0gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIChpbm5lckNvdW50ZXIgKyAxID4gaXRlbXMubGVuZ3RoLTEpID8gaW5uZXJDb3VudGVyID0gMCA6IGlubmVyQ291bnRlcisrIDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG5ld0l0ZW0gPSBpdGVtcy5lcShpbm5lckNvdW50ZXIpO1xyXG5cclxuICAgICAgX29uU2xpZGUobmV3SXRlbSwgb2xkSXRlbSwgZGlyZWN0aW9uKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb25TbGlkZSA9IGZ1bmN0aW9uIChuZXdJdGVtLCBvbGRJdGVtLCBkaXJlY3Rpb24pIHtcclxuXHJcbiAgICAgIHZhciBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uID09ICdkb3duJyk/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICBuZXdJdGVtLmNzcygndG9wJywgZGlyZWN0aW9uKigtMSkgKyAnJScpO1xyXG4gICAgICBvbGRJdGVtLmFuaW1hdGUoeyd0b3AnOiBkaXJlY3Rpb24gKyclJ30sIGR1cmF0aW9uKTtcclxuICAgICAgbmV3SXRlbS5hbmltYXRlKHsndG9wJzogJzAnfSwgZHVyYXRpb24sIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbmV3SXRlbS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBuZXdJdGVtLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBkb3duQXJyb3cgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzY3JvbGxUbyA9ICQoJy5zZWN0aW9uX3RvX3Njcm9sbCcpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJCgnLmRvd24tYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgICAgICAgICBcclxuICAgICAgICBfc2Nyb2xsVG9TZWN0aW9uKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3Njcm9sbFRvU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAgICAgdmFyIHJlcVBvcyA9IHNjcm9sbFRvLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcVBvc30sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgdXBBcnJvdyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKCcudXAtYXJyb3cnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAgICAgICAgICBcclxuICAgICAgICBfc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2Nyb2xsVG9Ub3AgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgNTAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciB3cml0ZU1lID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgZm9ybSA9ICQoJyNyZXZpZXdzX19mb3JtJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBfY2xlYXJNZXNzYWdlc0FuZElucHV0U3R5bGVzKCk7XHJcbiAgICAgICAgX2NvbnRhY3RNZUZvcm1Jbml0aWFsaXphdGlvbigpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy5yZXZpZXdzX19mb3JtLWJ1dHRvbi1yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZm9ybVswXS5yZXNldCgpO1xyXG4gICAgICAgIF9jbGVhck1lc3NhZ2VzQW5kSW5wdXRTdHlsZXMoKTsgICAgICAgIFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2xlYXJNZXNzYWdlc0FuZElucHV0U3R5bGVzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAkKCcucmV2aWV3cy1mb3JtX19tZXNzYWdlcy1lbGVtZW50Jykuc2xpZGVVcCgzMDApO1xyXG4gICAgICBmb3JtLmZpbmQoJy5yZXZpZXdzX19mb3JtLWVsZW1lbnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0LWFsZXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jb250YWN0TWVGb3JtSW5pdGlhbGl6YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBmb3JtZGF0YSA9IGZvcm0uc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIHNlbmROYW1lID0gJCgnI3NlbmROYW1lJykudmFsKCksXHJcbiAgICAgICAgICAgIHNlbmRFbWFpbCA9ICQoJyNzZW5kRW1haWwnKS52YWwoKSxcclxuICAgICAgICAgICAgc2VuZFRleHQgPSAkKCcjc2VuZFRleHQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgaWYgKCFzZW5kTmFtZS50cmltKCkgfHwgIXNlbmRFbWFpbC50cmltKCkgfHwgIXNlbmRUZXh0LnRyaW0oKSkge1xyXG5cclxuICAgICAgICAgICAgJCgnI2VtcHR5RmllbGRzRGFuZ2VyJykuc2xpZGVEb3duKDMwMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3BvcHVsYXRlQW5kSGlnaGxpZ2h0RW1wdHlJbnB1dHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHsgXHJcblxyXG4gICAgICAgICAgICAkKCcjb25DaGVja2luZycpLnNob3coJ2Zhc3QnKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdhc3NldHMvcGhwL21haWwucGhwJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGZvcm1kYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3B1cCA9IGRhdGEuc3RhdHVzID8gJyNzdWNjZXNzJyA6ICcjZXJyb3InO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcjb25DaGVja2luZycpLmhpZGUoJ2Zhc3QnKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgJChwb3B1cCkuc2xpZGVEb3duKCdmYXN0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBfY2xlYXJGb3JtSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfcG9wdWxhdGVBbmRIaWdobGlnaHRFbXB0eUlucHV0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIGVtcHR5SW5wdXRzID0gW107XHJcblxyXG4gICAgICAkKCcjcmV2aWV3c19fZm9ybScpLmZpbmQoJy5yZXZpZXdzX19mb3JtLWVsZW1lbnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoISQodGhpcykudmFsKCkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgIGVtcHR5SW5wdXRzLnB1c2goJCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGVtcHR5SW5wdXRzKTtcclxuXHJcbiAgICAgIF9oaWdobGlnaHRFbXB0eUlucHV0cyhlbXB0eUlucHV0cyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2hpZ2hsaWdodEVtcHR5SW5wdXRzID0gZnVuY3Rpb24oZW1wdHlJbnB1dHMpIHtcclxuXHJcbiAgICAgIGVtcHR5SW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgICAkKGVudHJ5KS5hZGRDbGFzcygnaW5wdXQtYWxlcnQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2NsZWFyRm9ybUlucHV0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3JtLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIC8v0LLRgdGC0LDQstC60LAg0L7RgtGB0YLQuNC70LjQt9C+0LLQsNC90L3QvtC5IEdvb2dsZU1hcFxyXG4gIHZhciBpbml0TWFwID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIHZhciBzdHlsZUFycmF5PVtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTond2F0ZXInLFxyXG4gICAgICAgICAgc3R5bGVyczpbe2NvbG9yOicjMDBiZmE1J31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTonbGFuZHNjYXBlJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidnZW9tZXRyeS5maWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3tjb2xvcjonI2ZmZmZmZid9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6J2xhbmRzY2FwZS5tYW5fbWFkZScsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3tzYXR1cmF0aW9uOictNzAnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidsYW5kc2NhcGUubmF0dXJhbCcsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidwb2knLFxyXG4gICAgICAgICAgZWxlbWVudFR5cGU6J2xhYmVscycsXHJcbiAgICAgICAgICBzdHlsZXJzOlt7dmlzaWJpbGl0eTonb2ZmJ31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZToncG9pLnBhcmsnLFxyXG4gICAgICAgICAgZWxlbWVudFR5cGU6J2FsbCcsXHJcbiAgICAgICAgICBzdHlsZXJzOlt7dmlzaWJpbGl0eTonb2ZmJ31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZToncm9hZCcsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3tsaWdodG5lc3M6Jy01J31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTondHJhbnNpdCcsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonbGFiZWxzJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9XHJcbiAgICAgIF07XHJcblxyXG4gICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIHtcclxuICAgICAgICBjZW50ZXI6IHtsYXQ6IDUzLjkxMjgzOCwgbG5nOiAyNy41NjY0MzF9LFxyXG4gICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICBzdHlsZXM6c3R5bGVBcnJheSxcclxuICAgICAgICB6b29tOiAxNSxcclxuICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOnRydWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246IHtsYXQ6IDUzLjkxMDY4NCwgbG5nOiAyNy41NTY5MjR9LFxyXG4gICAgICAgIC8vINCj0LrQsNC30YvQstCw0LXQvCDQvdCwINC60LDQutC+0Lkg0LrQsNGA0YLQtSDQvtC9INC00L7Qu9C20LXQvSDQv9C+0Y/QstC40YLRgdGPLiAo0J3QsCDRgdGC0YDQsNC90LjRhtC1INCy0LXQtNGMINC80L7QttC10YIg0LHRi9GC0Ywg0LHQvtC70YzRiNC1INC+0LTQvdC+0Lkg0LrQsNGA0YLRiylcclxuICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAvLyDQn9C40YjQtdC8INC90LDQt9Cy0LDQvdC40LUg0LzQsNGA0LrQtdGA0LAgLSDQv9C+0Y/QstC40YLRgdGPINC10YHQu9C4INC90LDQstC10YHRgtC4INC90LAg0L3QtdCz0L4g0LrRg9GA0YHQvtGAINC4INC90LXQvNC90L7Qs9C+INC/0L7QtNC+0LbQtNCw0YLRjFxyXG4gICAgICAgIHRpdGxlOiAn0JzQvtC1INC80LXRgdGC0L7QvdCw0YXQvtC20LTQtdC90LjQtScsXHJcbiAgICAgICAgLy8g0KPQutCw0LbQtdC8INGB0LLQvtGOINC40LrQvtC90LrRgyDQtNC70Y8g0LzQsNGA0LrQtdGA0LBcclxuICAgICAgICBpY29uOiAnYXNzZXRzL2ltZy9tYXBfbWFya2VyX2xhcmdlLnBuZydcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIC8v0LLRi9C30YvQstCw0LXQvCDQv9GA0Lgg0YPRgdC70L7QstC40LhcclxuICAgIGlmKCQoJy5wYXJhbGxheCcpLmxlbmd0aCl7XHJcbiAgICAgIG15TW91c2VQYXJhbGxheC5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLmZ1bGxzY3JlZW4tbWVudScpLmxlbmd0aCl7XHJcbiAgICAgIGJ1cmdlck1lbnUuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5ibHVyJykubGVuZ3RoKXtcclxuICAgICAgYmx1ckZvcm0uaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5uYXYtYmxvZycpLmxlbmd0aCl7XHJcbiAgICAgIHNpZGVCYXJCbG9nLmluaXQoKTtcclxuICAgICAgc2lkZUJhck5hdmlnYXRpb24uaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLnByZWxvYWRlcicpLmxlbmd0aCl7XHJcbiAgICAgIHByZWxvYWRlci5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuZmxpcHBlcicpLmxlbmd0aCl7XHJcbiAgICAgIGZsaXBwZXIuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLnNsaWRlcicpLmxlbmd0aCl7XHJcbiAgICAgIHNsaWRlci5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuZG93bi1hcnJvdycpLmxlbmd0aCl7XHJcbiAgICAgIGRvd25BcnJvdy5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcudXAtYXJyb3cnKS5sZW5ndGgpe1xyXG4gICAgICB1cEFycm93LmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy53cml0ZS1tZScpLmxlbmd0aCl7XHJcbiAgICAgIHdyaXRlTWUuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLm1hcCcpLmxlbmd0aCl7XHJcbiAgICAgIGluaXRNYXAuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gIH0pO1xyXG5cclxufSkoKTsiXX0=
