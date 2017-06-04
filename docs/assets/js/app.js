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

    var menu = $('.fullscreen-menu'),
        menuSections = $('.fullscreen-menu__section'),
        list = $('.fullscreen-menu__list'),
        inProcess = false;

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      $('.burger-menu__link').on('click', _openMenu);
    };

    var _openMenu = function (e) {

      e.preventDefault ();

      if (!inProcess){

        inProcess = true;

        if ($(this).hasClass('active')) {

          $(this).removeClass('active');
          $('body').css('position','static');
          list.removeClass('active');
          menuSections.removeClass('active');
          setTimeout(function(){
            menu.removeClass('active')
            inProcess = false;
          }, 500);

        } else {

          $(this).addClass('active');
          $('body').css('position','fixed');
          menu.addClass('active');
          menuSections.addClass('active');
          list.addClass('active');
          setTimeout(function(){
            inProcess = false;
          }, 1100);
        }

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
            topEdge = $this.offset().top - 150,
            bottomEdge = topEdge + $this.height(),
            wScroll = $(window).scrollTop();

        if (topEdge <= wScroll && bottomEdge >= wScroll) {

          var currentId = $this.data('section');
          var reqLink = sideBarItem.filter('[href="#' + currentId + '"]');

          reqLink.closest('.nav-blog__item').addClass('active').siblings().removeClass('active');
          $('.nav-blog__toggle-link').removeClass('active');

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
    };

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
          preloader.fadeOut();
          preloader.addClass('done');
        }, 500);
      }

    };

    var loadImages = function (images) {
      if (!images.length) {
        preloader.fadeOut();
        preloader.addClass('done');
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

  var myScrollParallax = (function () {

    var portfolio = $('.header').find('.header__title-img'),
        bg = $('.header').find('.header__bg'),
        user = $('.header').find('.user_position_header');

    var init = function () {
      _setUpListeners();
    };

    var _setUpListeners = function () {
      $(window).on('scroll', _moveLayers);
    };

    var _moveLayers = function (wScroll) { 
      var wScroll = $(window).scrollTop();
      _move (bg, wScroll, 30);
      _move (portfolio, wScroll, 7);
      _move (user, wScroll, -6);
    };

    var _move = function (block, windowScroll, strafeAmount) {

      var strafe = windowScroll / strafeAmount*(-1) + '%',
          transformString ='translate3d(0,'+strafe+',0)';

      block.css({
        'transform' : transformString,
        '-webkit-transform' : transformString
      });

    };

    return{

      init:init

    };

  })();

  var animateSkills = (function () {

    var items = $('.skill'),
        counter = 0,
        timer;

    var init = function () {
      _setUpListeners();
    };

    var _setUpListeners = function () {
      $(window).on('scroll', _startAnimation);
      $(document).ready(_startChecking);
    };

    var _startChecking = function () {
       if ($('.preloader').hasClass('done')) {
          _startAnimation;
       }
    };

    var _startAnimation = function () {

      if ($(window).height() >= ($('.skills').offset().top + $('.skills').height()) || ($('.skills').offset().top - $(window).scrollTop() + $('.skills').height()/2 - (Math.ceil($(window).height() / ($('body').height() / $(window).height()))) < 0)) {
        _animate();
      }

    };

    var _animate = function() {
      var item = items.eq(counter);

      item.addClass('active');
      counter++;

      timer = setTimeout(_animate, 300);

      if (counter == items.length) {
        if (timer) clearTimeout(timer);
      }

    };

    return{

      init:init

    };

  })();

  var tabs = (function () {

    var init = function () {
      _setUpListeners();
    };

    var _setUpListeners = function () {
      $(document).ready(function(){
        $('.tabs__controls-link').on('click', _tabsChanging);
      });
    };

    var _tabsChanging = function (e) {
      e.preventDefault();
      var item = $(this).closest('.tabs__controls-item');
      var contentItem = $('.tabs__item');
      var position = item.index();

      contentItem.eq(position)
        .addClass('tabs__item_active')
        .siblings()
        .removeClass('tabs__item_active');
      item
        .addClass('tabs__controls-item_active')
        .siblings()
        .removeClass('tabs__controls-item_active');
    };

    return{

      init:init

    };

  })();

  var writeMe = (function () {

    var formMail = document.querySelector('#reviews__form'),
        form = $('#reviews__form'),
        alert = $('.status');

    var init = function () {

      _setUpListeners();

    };

    var _setUpListeners = function () {
      formMail.addEventListener('submit', function(e){
        e.preventDefault();
        _clearMessagesAndInputStyles();
        _prepareSendMail();
      });

      $('.reviews__form-button-reset').on('click', function(e) {
        e.preventDefault();
        form[0].reset();
        alert.text('');
        _clearMessagesAndInputStyles();        
      });

    };

    var _clearMessagesAndInputStyles = function() {

      form.find('.reviews__form-element').each(function () {
          $(this).removeClass('input-alert');
      });

    };

    var _prepareSendMail = function() {
      var data = {
        name: formMail.name.value.trim(),
        email: formMail.email.value.trim(),
        text: formMail.text.value.trim()
      };

      alert.text('');

      if (!data.name || !data.email || !data.text) {
        _populateAndHighlightEmptyInputs();
        alert.text('Пожалуйста, заполните все поля в форме');
      } else { 
        alert.text('Ваше сообщение успешно отправлено');
        _clearFormInputs();
        //prepareSend('/works', formMail, data);
      }
      
    };

    var _populateAndHighlightEmptyInputs = function() {

      var emptyInputs = [];

      form.find('.reviews__form-element').each(function () {
        if (!$(this).val().trim()) {
            emptyInputs.push($(this));
        }
      });

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

  var makeAuthorization = (function () {
    var formLogin = document.querySelector('#login');
    var alert = $('.status'),
        form = $('#login');
    
    var init = function () {
      _setUpListeners ();
    };

    var _setUpListeners = function () {
      formLogin.addEventListener('submit', function(e){
        e.preventDefault();
        _prepareSendLogin();
      });
    };

    var _prepareSendLogin = function() {
      
      var data = {
        login: formLogin.user.value,
        password: formLogin.password.value
      };
      alert.text('');

      if (!data.login || !data.password) {
        _populateAndHighlightEmptyInputs();
        alert.text('Введите логин и пароль!');
      } else {
        _clearMessagesAndInputStyles();
        if ($('.authorization__form-checkbox').prop('checked') && $(":radio[name=answer]").filter(":checked").val()=="yes") {
          _clearFormInputs();
          alert.text('На github.pages не поддерживается node.js!');
          //prepareSend('/login', formLogin, data, function(data) {
            //if (data === 'Авторизация успешна!') {
              //location.href = '/admin';
            //}
          //});
        } else {
          alert.text('Не людям тут не место');
        }
      }
      
    };

    var _populateAndHighlightEmptyInputs = function() {

      var emptyInputs = [];

      form.find('.authorization__form-element').each(function () {
        if (!$(this).val().trim()) {
            emptyInputs.push($(this));
        }
      });

      _highlightEmptyInputs(emptyInputs);

    };

    var _highlightEmptyInputs = function(emptyInputs) {

      emptyInputs.forEach(function (entry) {
          $(entry).addClass('input-alert');
      });

    };

    var _clearMessagesAndInputStyles = function() {

      form.find('.authorization__form-element').each(function () {
          $(this).removeClass('input-alert');
      });

    };

    var _clearFormInputs = function() {
      form.each(function () {
        this.reset();
      });
    };

    return {
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

    if($('.map').length){
      initMap.init();  
    }

    if($('.pages__container').length){
      myScrollParallax.init(); 
    }

    if($('.skills').length){
      animateSkills.init(); 
    }

    if($('.tabs').length){
      tabs.init(); 
    }

    if($('.write-me').length){
      writeMe.init();  
    }

    if($('#login').length){
      makeAuthorization.init();  
    }

  });

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICB2YXIgbXlNb3VzZVBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICAgIFxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9zZXRVcExpc3RlbmVycyAoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdtb3VzZW1vdmUnLCBfbW92ZUxheWVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBtb3VzZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgIG1vdXNlWSA9IGUucGFnZVksXHJcbiAgICAgICAgdyA9ICh3aW5kb3cuaW5uZXJXaWR0aC8yKSAtIG1vdXNlWCxcclxuICAgICAgICBoID0gKHdpbmRvdy5pbm5lckhlaWdodC8yKSAtIG1vdXNlWTtcclxuXHJcbiAgICAgIGxheWVyLm1hcChmdW5jdGlvbiAoa2V5LHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIGJvdHRvbVBvc2l0aW9uID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMikqKGtleS8xMDApKSxcclxuICAgICAgICAgIHdpZHRoUG9zaXRpb24gPSB3KihrZXkvMTAwKSxcclxuICAgICAgICAgIGhlaWdodFBvc2l0aW9uID0gaCooa2V5LzEwMCk7XHJcblxyXG4gICAgICAgICQodmFsdWUpLmNzcygge1xyXG4gICAgICAgICAgJ2JvdHRvbSc6ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JyxcclxuICAgICAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlM2QoJyt3aWR0aFBvc2l0aW9uKydweCwgJytoZWlnaHRQb3NpdGlvbisncHgsIDApJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5pdDppbml0XHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYnVyZ2VyTWVudSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIG1lbnUgPSAkKCcuZnVsbHNjcmVlbi1tZW51JyksXHJcbiAgICAgICAgbWVudVNlY3Rpb25zID0gJCgnLmZ1bGxzY3JlZW4tbWVudV9fc2VjdGlvbicpLFxyXG4gICAgICAgIGxpc3QgPSAkKCcuZnVsbHNjcmVlbi1tZW51X19saXN0JyksXHJcbiAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoJy5idXJnZXItbWVudV9fbGluaycpLm9uKCdjbGljaycsIF9vcGVuTWVudSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfb3Blbk1lbnUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCAoKTtcclxuXHJcbiAgICAgIGlmICghaW5Qcm9jZXNzKXtcclxuXHJcbiAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ3N0YXRpYycpO1xyXG4gICAgICAgICAgbGlzdC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICBtZW51U2VjdGlvbnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBtZW51LnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAkKCdib2R5JykuY3NzKCdwb3NpdGlvbicsJ2ZpeGVkJyk7XHJcbiAgICAgICAgICBtZW51LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIG1lbnVTZWN0aW9ucy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICBsaXN0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICB9LCAxMTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYmx1ckZvcm0gPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3cmFwcGVyID0gJCgnLndyaXRlLW1lX19ibHVyLXdyYXBwZXInKSxcclxuICAgICAgICB3cmFwcGVyVG9wID0gJCgnLndyaXRlLW1lJyksXHJcbiAgICAgICAgZm9ybSA9ICQoJy53cml0ZS1tZV9fYmx1cicpO1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIF9zZXRCbHVyKTtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoX3NldEJsdXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldEJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgaW1nV2lkdGggPSAkKCcucmV2aWV3c19fYmFja2dyb3VuZCcpLndpZHRoKCksXHJcbiAgICAgICAgICBwb3NMZWZ0ID0gLSB3cmFwcGVyLnBvc2l0aW9uKCkubGVmdCxcclxuICAgICAgICAgIHBvc1RvcCA9IC0gd3JhcHBlclRvcC5wb3NpdGlvbigpLnRvcDtcclxuXHJcbiAgICAgIGZvcm0uY3NzKHtcclxuICAgICAgICAnYmFja2dyb3VuZC1zaXplJzogaW1nV2lkdGggKyAncHgnKyAnICcgKyAnYXV0bycsXHJcbiAgICAgICAgJ2JhY2tncm91bmRQb3NpdGlvbic6IHBvc0xlZnQgKyAncHgnICsgJyAnICsgcG9zVG9wICsgJ3B4J1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyQmxvZyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLm5hdi1ibG9nX190b2dnbGUtbGluaycpLm9uKCdjbGljaycsIF9vcGVuU2lkZUJhcik7XHJcbiAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIF9jbG9zZVNpZGVCYXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29wZW5TaWRlQmFyID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIGlmICgkdGhpcy5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuXHJcbiAgICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbG9zZVNpZGVCYXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzPSQoZS50YXJnZXQpO1xyXG5cclxuICAgICAgaWYoISR0aGlzLmNsb3Nlc3Qoc2lkZUJhcikubGVuZ3RoKXtcclxuICAgICAgICAkKCcubmF2LWJsb2dfX3RvZ2dsZS1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHNpZGVCYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzaWRlQmFyTmF2aWdhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNpZGVCYXIgPSAkKCcubmF2LWJsb2cnKTtcclxuICAgIHZhciBzaWRlQmFyTGlzdCA9ICQoJy5uYXYtYmxvZ19fbGlzdCcpO1xyXG4gICAgdmFyIHNpZGVCYXJXcmFwcGVyID0gc2lkZUJhci5jbG9zZXN0KCcuY29udGFpbmVyJyk7XHJcbiAgICB2YXIgY29udGVudEJhckl0ZW0gPSBzaWRlQmFyV3JhcHBlci5maW5kKCcuY29udGVudC1ibG9nX19pdGVtJyk7XHJcbiAgICB2YXIgc2lkZUJhckl0ZW0gPSBzaWRlQmFyTGlzdC5maW5kKCcubmF2LWJsb2dfX2xpbmsnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQod2luZG93KS5zY3JvbGwoX2NoZWNrU2VjdGlvbik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBzaWRlQmFySXRlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7ICAgICAgICAgIFxyXG4gICAgICAgICAgX3Nob3dTZWN0aW9uKCQodGhpcykuYXR0cignaHJlZicpLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgX3Nob3dTZWN0aW9uKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBmYWxzZSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgICAgJCh3aW5kb3cpLnNjcm9sbChfU2lkZUJhckZpeGVkKTtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUgc2Nyb2xsJywgX1NpZGVCYXJXaWR0aEZpeGVkKTtcclxuICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2hlY2tTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgY29udGVudEJhckl0ZW0uZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b3BFZGdlID0gJHRoaXMub2Zmc2V0KCkudG9wIC0gMTUwLFxyXG4gICAgICAgICAgICBib3R0b21FZGdlID0gdG9wRWRnZSArICR0aGlzLmhlaWdodCgpLFxyXG4gICAgICAgICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgICAgICBpZiAodG9wRWRnZSA8PSB3U2Nyb2xsICYmIGJvdHRvbUVkZ2UgPj0gd1Njcm9sbCkge1xyXG5cclxuICAgICAgICAgIHZhciBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdzZWN0aW9uJyk7XHJcbiAgICAgICAgICB2YXIgcmVxTGluayA9IHNpZGVCYXJJdGVtLmZpbHRlcignW2hyZWY9XCIjJyArIGN1cnJlbnRJZCArICdcIl0nKTtcclxuXHJcbiAgICAgICAgICByZXFMaW5rLmNsb3Nlc3QoJy5uYXYtYmxvZ19faXRlbScpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICQoJy5uYXYtYmxvZ19fdG9nZ2xlLWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBjdXJyZW50SWQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX3Nob3dTZWN0aW9uIChzZWN0aW9uLCBpc0FuaW1hdGUpIHtcclxuICBcclxuICAgICAgdmFyIGRpcmVjdGlvbiA9IHNlY3Rpb24ucmVwbGFjZSgvIy8sICcnKTtcclxuICAgICAgdmFyIHJlcVNlY3Rpb24gPSBjb250ZW50QmFySXRlbS5maWx0ZXIoJ1tkYXRhLXNlY3Rpb249XCInICsgZGlyZWN0aW9uICsgJ1wiXScpO1xyXG4gICAgICB2YXIgcmVxU2VjdGlvblBvcyA9IHJlcVNlY3Rpb24ub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgaWYgKGlzQW5pbWF0ZSkge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHJlcVNlY3Rpb25Qb3N9LCA1MDApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxU2VjdGlvblBvcyk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9TaWRlQmFyRml4ZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICB2YXIgdG9wRWRnZSA9IHNpZGVCYXJXcmFwcGVyLm9mZnNldCgpLnRvcCAtIDMwLFxyXG4gICAgICAgICAgbGVmdEVkZ2UgPSBzaWRlQmFyTGlzdC5wb3NpdGlvbigpLmxlZnQsXHJcbiAgICAgICAgICB3U2Nyb2xsID0gJChkb2N1bWVudCkuc2Nyb2xsVG9wKCk7XHJcblxyXG4gICAgICBpZiAodG9wRWRnZSA8PSB3U2Nyb2xsKSB7XHJcblxyXG4gICAgICAgIHNpZGVCYXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XHJcblxyXG4gICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBzaWRlQmFyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX1NpZGVCYXJXaWR0aEZpeGVkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIE9TTmFtZSA9IFwiVW5rbm93biBPU1wiO1xyXG4gICAgICAgIGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiV2luXCIpICE9IC0xKSBPU05hbWUgPSBcIldpbmRvd3NcIjtcclxuICAgICAgICBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTWFjXCIpICE9IC0xKSBPU05hbWUgPSBcIk1hY09TXCI7XHJcbiAgICAgICAgZWxzZSBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIlgxMVwiKSAhPSAtMSkgT1NOYW1lID0gXCJVTklYXCI7XHJcbiAgICAgICAgZWxzZSBpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIkxpbnV4XCIpICE9IC0xKSBPU05hbWUgPSBcIkxpbnV4XCI7XHJcblxyXG4gICAgICB2YXIgc2lkZUJhcldpZHRoID0gKCQod2luZG93KS53aWR0aCgpPj0xNTAwKT8oKDE1MDAtNDApKjAuMysncHgnKTooT1NOYW1lPT1cIk1hY09TXCIgJiYgKCQod2luZG93KS53aWR0aCgpPD03NjgpKT8oJCh3aW5kb3cpLndpZHRoKCkqMC42KydweCcpOihPU05hbWUhPVwiTWFjT1NcIiAmJiAkKHdpbmRvdykud2lkdGgoKTw9KDc2OC0xNykpPygkKHdpbmRvdykud2lkdGgoKSowLjYrJ3B4Jyk6KCgkKHdpbmRvdykud2lkdGgoKS00MCkqMC4zKydweCcpO1xyXG5cclxuICAgICAgc2lkZUJhci5jc3MoJ3dpZHRoJywgc2lkZUJhcldpZHRoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBmbGlwcGVyID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgZmxpcHBlckNvbnRhaW5lciA9ICQoJy5mbGlwcGVyJyk7XHJcbiAgICB2YXIgYXV0aG9yaXphdGlvbkxpbmsgPSAkKCcuYXV0aG9yaXphdGlvbl9fbGluaycpO1xyXG4gICAgdmFyIHRvTWFpbiA9ICQoJy5hdXRob3JpemF0aW9uX19mb3JtLWJ1dHRvbl9iYWNrJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGF1dGhvcml6YXRpb25MaW5rLm9uKCdjbGljaycsIF9mbGlwcGVyU3RhcnQpO1xyXG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBfZmxpcHBlckVuZCk7XHJcbiAgICAgIHRvTWFpbi5vbignY2xpY2snLCBfdG9NYWluKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9mbGlwcGVyU3RhcnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBmbGlwcGVyQ29udGFpbmVyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJHRoaXMuZmFkZU91dCgxMDAwKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfZmxpcHBlckVuZCA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgJHRoaXM9JChlLnRhcmdldCk7XHJcblxyXG4gICAgICBpZighJHRoaXMuY2xvc2VzdChmbGlwcGVyQ29udGFpbmVyKS5sZW5ndGggJiYgISR0aGlzLmNsb3Nlc3QoJy5hdXRob3JpemF0aW9uJykubGVuZ3RoKXtcclxuICAgICAgICBmbGlwcGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBhdXRob3JpemF0aW9uTGluay5mYWRlSW4oMTAwMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfdG9NYWluID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciAkdGhpcz0kKHRoaXMpO1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBmbGlwcGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgYXV0aG9yaXphdGlvbkxpbmsuZmFkZUluKDEwMDApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIHByZWxvYWRlciA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuICAgIHZhciBwZXJjZW50c1RvdGFsID0gMDtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChkb2N1bWVudCkucmVhZHkoX3ByZWxvYWRlclN0YXJ0KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9wcmVsb2FkZXJTdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIG15SW1hZ2VzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcblxyXG4gICAgICBsb2FkSW1hZ2VzKG15SW1hZ2VzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uKGluZGV4LCBlbGVtKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgICAgIGltZyA9ICQoZWxlbSkuaXMoJ2ltZycpLFxyXG4gICAgICAgICAgcGF0aCA9ICcnO1xyXG5cclxuICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcblxyXG4gICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaW1nKSB7XHJcblxyXG4gICAgICAgIHBhdGggPSAkKGVsZW0pLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xyXG5cclxuICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQvdG90YWwqMTAwKTtcclxuXHJcbiAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnRzJykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICBpZiAocGVyY2VudHMgPj0xMDApIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG4gICAgICAgICAgcHJlbG9hZGVyLmFkZENsYXNzKCdkb25lJyk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoaW1hZ2VzKSB7XHJcbiAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICAgICAgcHJlbG9hZGVyLmFkZENsYXNzKCdkb25lJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGltYWdlcy5mb3JFYWNoKCBmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xyXG4gICAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgc3JjOiBlbGVtZW50XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciBzbGlkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBjb3VudGVyID0gMSxcclxuICAgICAgICBkdXJhdGlvbiA9IDUwMCxcclxuICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnLnNsaWRlcl9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHNsaWRlckNvbnRhaW5lciA9ICR0aGlzLmNsb3Nlc3QoJy5zbGlkZXInKSxcclxuICAgICAgICAgICAgaXRlbXMgPSAkKCcuc2xpZGVyX19kaXNwbGF5X2ZpcnN0JykuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uID0gc2xpZGVyQ29udGFpbmVyLmZpbmQoJy53b3Jrc19faXRlbScpLFxyXG4gICAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uQ29udGFpbmVyID0gaXRlbXNEZXNjcmlwdGlvbi5jbG9zZXN0KCcud29ya3NfX2xpc3QnKTtcclxuXHJcbiAgICAgICAgaWYgKCFpblByb2Nlc3MpIHtcclxuICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2xpbmtfZG93bicpKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXItLTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoY291bnRlciA+IGl0ZW1zLmxlbmd0aC0xKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNvdW50ZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIGNvdW50ZXIgPSBpdGVtcy5sZW5ndGgtMVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHZhciBtYWluU3JjID0gaXRlbXMuZXEoY291bnRlcikuZmluZCgnaW1nJykuYXR0cignc3JjJyk7XHJcblxyXG4gICAgICAgICAgdmFyIGFjdGl2ZVBpY0ZhZGVPdXQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgICAgYWN0aXZlUGljTG9hZGVkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIGFjdGl2ZVBpY0ZhZGVJbiA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBkZXNjQ29udGFpbmVyRmFkZU91dCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBkZXNjQ29udGFpbmVyQ2hhbmdlZCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgICBkZXNjQ29udGFpbmVyRmFkZUluID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICAgIHNsaWRlckNoYW5nZUZpbmlzaGVkID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICQoJy5zbGlkZXJfX2FjdGl2ZS1waWMnKS5mYWRlT3V0KDI1MCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgYWN0aXZlUGljRmFkZU91dC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBhY3RpdmVQaWNGYWRlT3V0LmRvbmUgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19hY3RpdmUtcGljJykuYXR0cignc3JjJywgbWFpblNyYykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgYWN0aXZlUGljTG9hZGVkLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBhY3RpdmVQaWNMb2FkZWQuZG9uZSAoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICQoJy5zbGlkZXJfX2FjdGl2ZS1waWMnKS5mYWRlSW4oMjUwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgYWN0aXZlUGljRmFkZUluLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uQ29udGFpbmVyLmZhZGVPdXQoMjIwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVzY0NvbnRhaW5lckZhZGVPdXQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgZGVzY0NvbnRhaW5lckZhZGVPdXQuZG9uZSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpdGVtc0Rlc2NyaXB0aW9uLmZpbHRlcignLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbi5lcShjb3VudGVyKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGRlc2NDb250YWluZXJDaGFuZ2VkLnJlc29sdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGRlc2NDb250YWluZXJDaGFuZ2VkLmRvbmUgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaXRlbXNEZXNjcmlwdGlvbkNvbnRhaW5lci5mYWRlSW4oMjIwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgZGVzY0NvbnRhaW5lckZhZGVJbi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2xpbmtfZG93bicpKSB7XHJcbiAgICAgICAgICAgIF9zaG93TmV4dFNsaWRlKCQoJy5zbGlkZXJfX2Rpc3BsYXlfZmlyc3QnKSwgJ3VwJyk7XHJcbiAgICAgICAgICAgIF9zaG93TmV4dFNsaWRlKCQoJy5zbGlkZXJfX2Rpc3BsYXlfb3Bwb3NpdGUnKSwgJ2Rvd24nKTtcclxuICAgICAgICAgICAgc2xpZGVyQ2hhbmdlRmluaXNoZWQucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3Nob3dOZXh0U2xpZGUoJCgnLnNsaWRlcl9fZGlzcGxheV9maXJzdCcpLCAnZG93bicpO1xyXG4gICAgICAgICAgICBfc2hvd05leHRTbGlkZSgkKCcuc2xpZGVyX19kaXNwbGF5X29wcG9zaXRlJyksICd1cCcpO1xyXG4gICAgICAgICAgICBzbGlkZXJDaGFuZ2VGaW5pc2hlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgJC53aGVuIChhY3RpdmVQaWNGYWRlSW4sIGRlc2NDb250YWluZXJGYWRlSW4sIHNsaWRlckNoYW5nZUZpbmlzaGVkKS5kb25lIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2hvd05leHRTbGlkZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG5cclxuICAgICAgdmFyIGlubmVyQ291bnRlciA9IGNvdW50ZXIsXHJcbiAgICAgICAgICBpdGVtcyA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICBvbGRJdGVtID0gaXRlbXMuZmlsdGVyKCcuYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoY29udGFpbmVyLmhhc0NsYXNzKCdzbGlkZXJfX2Rpc3BsYXlfZmlyc3QnKSkge1xyXG4gICAgICAgIChpbm5lckNvdW50ZXIgLSAxIDwgMCkgPyBpbm5lckNvdW50ZXIgPSBpdGVtcy5sZW5ndGgtMSA6IGlubmVyQ291bnRlci0tIDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAoaW5uZXJDb3VudGVyICsgMSA+IGl0ZW1zLmxlbmd0aC0xKSA/IGlubmVyQ291bnRlciA9IDAgOiBpbm5lckNvdW50ZXIrKyA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBuZXdJdGVtID0gaXRlbXMuZXEoaW5uZXJDb3VudGVyKTtcclxuXHJcbiAgICAgIF9vblNsaWRlKG5ld0l0ZW0sIG9sZEl0ZW0sIGRpcmVjdGlvbik7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX29uU2xpZGUgPSBmdW5jdGlvbiAobmV3SXRlbSwgb2xkSXRlbSwgZGlyZWN0aW9uKSB7XHJcblxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiA9PSAnZG93bicpPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgbmV3SXRlbS5jc3MoJ3RvcCcsIGRpcmVjdGlvbiooLTEpICsgJyUnKTtcclxuICAgICAgb2xkSXRlbS5hbmltYXRlKHsndG9wJzogZGlyZWN0aW9uICsnJSd9LCBkdXJhdGlvbik7XHJcbiAgICAgIG5ld0l0ZW0uYW5pbWF0ZSh7J3RvcCc6ICcwJ30sIGR1cmF0aW9uLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIG5ld0l0ZW0uc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgbmV3SXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgZG93bkFycm93ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgc2Nyb2xsVG8gPSAkKCcuc2VjdGlvbl90b19zY3JvbGwnKTtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoJy5kb3duLWFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgICAgICAgICAgXHJcbiAgICAgICAgX3Njcm9sbFRvU2VjdGlvbigpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zY3JvbGxUb1NlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgXHJcbiAgICAgIHZhciByZXFQb3MgPSBzY3JvbGxUby5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAkKCdib2R5LCBodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiByZXFQb3N9LCA1MDApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIHVwQXJyb3cgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJCgnLnVwLWFycm93Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgICAgICAgICAgXHJcbiAgICAgICAgX3Njcm9sbFRvVG9wKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3Njcm9sbFRvVG9wID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDUwMCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgbXlTY3JvbGxQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHBvcnRmb2xpbyA9ICQoJy5oZWFkZXInKS5maW5kKCcuaGVhZGVyX190aXRsZS1pbWcnKSxcclxuICAgICAgICBiZyA9ICQoJy5oZWFkZXInKS5maW5kKCcuaGVhZGVyX19iZycpLFxyXG4gICAgICAgIHVzZXIgPSAkKCcuaGVhZGVyJykuZmluZCgnLnVzZXJfcG9zaXRpb25faGVhZGVyJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIF9tb3ZlTGF5ZXJzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9tb3ZlTGF5ZXJzID0gZnVuY3Rpb24gKHdTY3JvbGwpIHsgXHJcbiAgICAgIHZhciB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBfbW92ZSAoYmcsIHdTY3JvbGwsIDMwKTtcclxuICAgICAgX21vdmUgKHBvcnRmb2xpbywgd1Njcm9sbCwgNyk7XHJcbiAgICAgIF9tb3ZlICh1c2VyLCB3U2Nyb2xsLCAtNik7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfbW92ZSA9IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcclxuXHJcbiAgICAgIHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyBzdHJhZmVBbW91bnQqKC0xKSArICclJyxcclxuICAgICAgICAgIHRyYW5zZm9ybVN0cmluZyA9J3RyYW5zbGF0ZTNkKDAsJytzdHJhZmUrJywwKSc7XHJcblxyXG4gICAgICBibG9jay5jc3Moe1xyXG4gICAgICAgICd0cmFuc2Zvcm0nIDogdHJhbnNmb3JtU3RyaW5nLFxyXG4gICAgICAgICctd2Via2l0LXRyYW5zZm9ybScgOiB0cmFuc2Zvcm1TdHJpbmdcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgYW5pbWF0ZVNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGl0ZW1zID0gJCgnLnNraWxsJyksXHJcbiAgICAgICAgY291bnRlciA9IDAsXHJcbiAgICAgICAgdGltZXI7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9zZXRVcExpc3RlbmVycygpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIF9zdGFydEFuaW1hdGlvbik7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KF9zdGFydENoZWNraW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zdGFydENoZWNraW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgaWYgKCQoJy5wcmVsb2FkZXInKS5oYXNDbGFzcygnZG9uZScpKSB7XHJcbiAgICAgICAgICBfc3RhcnRBbmltYXRpb247XHJcbiAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc3RhcnRBbmltYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBpZiAoJCh3aW5kb3cpLmhlaWdodCgpID49ICgkKCcuc2tpbGxzJykub2Zmc2V0KCkudG9wICsgJCgnLnNraWxscycpLmhlaWdodCgpKSB8fCAoJCgnLnNraWxscycpLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKSArICQoJy5za2lsbHMnKS5oZWlnaHQoKS8yIC0gKE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAoJCgnYm9keScpLmhlaWdodCgpIC8gJCh3aW5kb3cpLmhlaWdodCgpKSkpIDwgMCkpIHtcclxuICAgICAgICBfYW5pbWF0ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2FuaW1hdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGl0ZW0gPSBpdGVtcy5lcShjb3VudGVyKTtcclxuXHJcbiAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBjb3VudGVyKys7XHJcblxyXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoX2FuaW1hdGUsIDMwMCk7XHJcblxyXG4gICAgICBpZiAoY291bnRlciA9PSBpdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybntcclxuXHJcbiAgICAgIGluaXQ6aW5pdFxyXG5cclxuICAgIH07XHJcblxyXG4gIH0pKCk7XHJcblxyXG4gIHZhciB0YWJzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX3NldFVwTGlzdGVuZXJzKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLnRhYnNfX2NvbnRyb2xzLWxpbmsnKS5vbignY2xpY2snLCBfdGFic0NoYW5naW5nKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfdGFic0NoYW5naW5nID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB2YXIgaXRlbSA9ICQodGhpcykuY2xvc2VzdCgnLnRhYnNfX2NvbnRyb2xzLWl0ZW0nKTtcclxuICAgICAgdmFyIGNvbnRlbnRJdGVtID0gJCgnLnRhYnNfX2l0ZW0nKTtcclxuICAgICAgdmFyIHBvc2l0aW9uID0gaXRlbS5pbmRleCgpO1xyXG5cclxuICAgICAgY29udGVudEl0ZW0uZXEocG9zaXRpb24pXHJcbiAgICAgICAgLmFkZENsYXNzKCd0YWJzX19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYnNfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgIGl0ZW1cclxuICAgICAgICAuYWRkQ2xhc3MoJ3RhYnNfX2NvbnRyb2xzLWl0ZW1fYWN0aXZlJylcclxuICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgIC5yZW1vdmVDbGFzcygndGFic19fY29udHJvbHMtaXRlbV9hY3RpdmUnKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgdmFyIHdyaXRlTWUgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBmb3JtTWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXZpZXdzX19mb3JtJyksXHJcbiAgICAgICAgZm9ybSA9ICQoJyNyZXZpZXdzX19mb3JtJyksXHJcbiAgICAgICAgYWxlcnQgPSAkKCcuc3RhdHVzJyk7XHJcblxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBfc2V0VXBMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZvcm1NYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBfY2xlYXJNZXNzYWdlc0FuZElucHV0U3R5bGVzKCk7XHJcbiAgICAgICAgX3ByZXBhcmVTZW5kTWFpbCgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgICQoJy5yZXZpZXdzX19mb3JtLWJ1dHRvbi1yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZm9ybVswXS5yZXNldCgpO1xyXG4gICAgICAgIGFsZXJ0LnRleHQoJycpO1xyXG4gICAgICAgIF9jbGVhck1lc3NhZ2VzQW5kSW5wdXRTdHlsZXMoKTsgICAgICAgIFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2xlYXJNZXNzYWdlc0FuZElucHV0U3R5bGVzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICBmb3JtLmZpbmQoJy5yZXZpZXdzX19mb3JtLWVsZW1lbnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2lucHV0LWFsZXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9wcmVwYXJlU2VuZE1haWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgbmFtZTogZm9ybU1haWwubmFtZS52YWx1ZS50cmltKCksXHJcbiAgICAgICAgZW1haWw6IGZvcm1NYWlsLmVtYWlsLnZhbHVlLnRyaW0oKSxcclxuICAgICAgICB0ZXh0OiBmb3JtTWFpbC50ZXh0LnZhbHVlLnRyaW0oKVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgYWxlcnQudGV4dCgnJyk7XHJcblxyXG4gICAgICBpZiAoIWRhdGEubmFtZSB8fCAhZGF0YS5lbWFpbCB8fCAhZGF0YS50ZXh0KSB7XHJcbiAgICAgICAgX3BvcHVsYXRlQW5kSGlnaGxpZ2h0RW1wdHlJbnB1dHMoKTtcclxuICAgICAgICBhbGVydC50ZXh0KCfQn9C+0LbQsNC70YPQudGB0YLQsCwg0LfQsNC/0L7Qu9C90LjRgtC1INCy0YHQtSDQv9C+0LvRjyDQsiDRhNC+0YDQvNC1Jyk7XHJcbiAgICAgIH0gZWxzZSB7IFxyXG4gICAgICAgIGFsZXJ0LnRleHQoJ9CS0LDRiNC1INGB0L7QvtCx0YnQtdC90LjQtSDRg9GB0L/QtdGI0L3QviDQvtGC0L/RgNCw0LLQu9C10L3QvicpO1xyXG4gICAgICAgIF9jbGVhckZvcm1JbnB1dHMoKTtcclxuICAgICAgICAvL3ByZXBhcmVTZW5kKCcvd29ya3MnLCBmb3JtTWFpbCwgZGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfcG9wdWxhdGVBbmRIaWdobGlnaHRFbXB0eUlucHV0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgdmFyIGVtcHR5SW5wdXRzID0gW107XHJcblxyXG4gICAgICBmb3JtLmZpbmQoJy5yZXZpZXdzX19mb3JtLWVsZW1lbnQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoISQodGhpcykudmFsKCkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgIGVtcHR5SW5wdXRzLnB1c2goJCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIF9oaWdobGlnaHRFbXB0eUlucHV0cyhlbXB0eUlucHV0cyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2hpZ2hsaWdodEVtcHR5SW5wdXRzID0gZnVuY3Rpb24oZW1wdHlJbnB1dHMpIHtcclxuXHJcbiAgICAgIGVtcHR5SW5wdXRzLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XHJcbiAgICAgICAgICAkKGVudHJ5KS5hZGRDbGFzcygnaW5wdXQtYWxlcnQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2NsZWFyRm9ybUlucHV0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3JtLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICByZXR1cm57XHJcblxyXG4gICAgICBpbml0OmluaXRcclxuXHJcbiAgICB9O1xyXG5cclxuICB9KSgpO1xyXG5cclxuICB2YXIgbWFrZUF1dGhvcml6YXRpb24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZvcm1Mb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dpbicpO1xyXG4gICAgdmFyIGFsZXJ0ID0gJCgnLnN0YXR1cycpLFxyXG4gICAgICAgIGZvcm0gPSAkKCcjbG9naW4nKTtcclxuICAgIFxyXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF9zZXRVcExpc3RlbmVycyAoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm9ybUxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBfcHJlcGFyZVNlbmRMb2dpbigpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9wcmVwYXJlU2VuZExvZ2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIFxyXG4gICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICBsb2dpbjogZm9ybUxvZ2luLnVzZXIudmFsdWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGZvcm1Mb2dpbi5wYXNzd29yZC52YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICBhbGVydC50ZXh0KCcnKTtcclxuXHJcbiAgICAgIGlmICghZGF0YS5sb2dpbiB8fCAhZGF0YS5wYXNzd29yZCkge1xyXG4gICAgICAgIF9wb3B1bGF0ZUFuZEhpZ2hsaWdodEVtcHR5SW5wdXRzKCk7XHJcbiAgICAgICAgYWxlcnQudGV4dCgn0JLQstC10LTQuNGC0LUg0LvQvtCz0LjQvSDQuCDQv9Cw0YDQvtC70YwhJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX2NsZWFyTWVzc2FnZXNBbmRJbnB1dFN0eWxlcygpO1xyXG4gICAgICAgIGlmICgkKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1jaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnKSAmJiAkKFwiOnJhZGlvW25hbWU9YW5zd2VyXVwiKS5maWx0ZXIoXCI6Y2hlY2tlZFwiKS52YWwoKT09XCJ5ZXNcIikge1xyXG4gICAgICAgICAgX2NsZWFyRm9ybUlucHV0cygpO1xyXG4gICAgICAgICAgYWxlcnQudGV4dCgn0J3QsCBnaXRodWIucGFnZXMg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YLRgdGPIG5vZGUuanMhJyk7XHJcbiAgICAgICAgICAvL3ByZXBhcmVTZW5kKCcvbG9naW4nLCBmb3JtTG9naW4sIGRhdGEsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgLy9pZiAoZGF0YSA9PT0gJ9CQ0LLRgtC+0YDQuNC30LDRhtC40Y8g0YPRgdC/0LXRiNC90LAhJykge1xyXG4gICAgICAgICAgICAgIC8vbG9jYXRpb24uaHJlZiA9ICcvYWRtaW4nO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFsZXJ0LnRleHQoJ9Cd0LUg0LvRjtC00Y/QvCDRgtGD0YIg0L3QtSDQvNC10YHRgtC+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3BvcHVsYXRlQW5kSGlnaGxpZ2h0RW1wdHlJbnB1dHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIHZhciBlbXB0eUlucHV0cyA9IFtdO1xyXG5cclxuICAgICAgZm9ybS5maW5kKCcuYXV0aG9yaXphdGlvbl9fZm9ybS1lbGVtZW50JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCEkKHRoaXMpLnZhbCgpLnRyaW0oKSkge1xyXG4gICAgICAgICAgICBlbXB0eUlucHV0cy5wdXNoKCQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBfaGlnaGxpZ2h0RW1wdHlJbnB1dHMoZW1wdHlJbnB1dHMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9oaWdobGlnaHRFbXB0eUlucHV0cyA9IGZ1bmN0aW9uKGVtcHR5SW5wdXRzKSB7XHJcblxyXG4gICAgICBlbXB0eUlucHV0cy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG4gICAgICAgICAgJChlbnRyeSkuYWRkQ2xhc3MoJ2lucHV0LWFsZXJ0Jyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9jbGVhck1lc3NhZ2VzQW5kSW5wdXRTdHlsZXMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgIGZvcm0uZmluZCgnLmF1dGhvcml6YXRpb25fX2Zvcm0tZWxlbWVudCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW5wdXQtYWxlcnQnKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX2NsZWFyRm9ybUlucHV0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3JtLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGluaXQ6aW5pdFxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgLy/QstGB0YLQsNCy0LrQsCDQvtGC0YHRgtC40LvQuNC30L7QstCw0L3QvdC+0LkgR29vZ2xlTWFwXHJcbiAgdmFyIGluaXRNYXAgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgdmFyIHN0eWxlQXJyYXk9W1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOid3YXRlcicsXHJcbiAgICAgICAgICBzdHlsZXJzOlt7Y29sb3I6JyMwMGJmYTUnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidsYW5kc2NhcGUnLFxyXG4gICAgICAgICAgZWxlbWVudFR5cGU6J2dlb21ldHJ5LmZpbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe2NvbG9yOicjZmZmZmZmJ31dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmZWF0dXJlVHlwZTonbGFuZHNjYXBlLm1hbl9tYWRlJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3NhdHVyYXRpb246Jy03MCd9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6J2xhbmRzY2FwZS5uYXR1cmFsJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmVhdHVyZVR5cGU6J3BvaScsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonbGFiZWxzJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidwb2kucGFyaycsXHJcbiAgICAgICAgICBlbGVtZW50VHlwZTonYWxsJyxcclxuICAgICAgICAgIHN0eWxlcnM6W3t2aXNpYmlsaXR5OidvZmYnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOidyb2FkJyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidhbGwnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe2xpZ2h0bmVzczonLTUnfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZlYXR1cmVUeXBlOid0cmFuc2l0JyxcclxuICAgICAgICAgIGVsZW1lbnRUeXBlOidsYWJlbHMnLFxyXG4gICAgICAgICAgc3R5bGVyczpbe3Zpc2liaWxpdHk6J29mZid9XVxyXG4gICAgICAgIH1cclxuICAgICAgXTtcclxuXHJcbiAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG4gICAgICAgIGNlbnRlcjoge2xhdDogNTMuOTEyODM4LCBsbmc6IDI3LjU2NjQzMX0sXHJcbiAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxyXG4gICAgICAgIHN0eWxlczpzdHlsZUFycmF5LFxyXG4gICAgICAgIHpvb206IDE1LFxyXG4gICAgICAgIGRpc2FibGVEZWZhdWx0VUk6dHJ1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjoge2xhdDogNTMuOTEwNjg0LCBsbmc6IDI3LjU1NjkyNH0sXHJcbiAgICAgICAgLy8g0KPQutCw0LfRi9Cy0LDQtdC8INC90LAg0LrQsNC60L7QuSDQutCw0YDRgtC1INC+0L0g0LTQvtC70LbQtdC9INC/0L7Rj9Cy0LjRgtGB0Y8uICjQndCwINGB0YLRgNCw0L3QuNGG0LUg0LLQtdC00Ywg0LzQvtC20LXRgiDQsdGL0YLRjCDQsdC+0LvRjNGI0LUg0L7QtNC90L7QuSDQutCw0YDRgtGLKVxyXG4gICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgIC8vINCf0LjRiNC10Lwg0L3QsNC30LLQsNC90LjQtSDQvNCw0YDQutC10YDQsCAtINC/0L7Rj9Cy0LjRgtGB0Y8g0LXRgdC70Lgg0L3QsNCy0LXRgdGC0Lgg0L3QsCDQvdC10LPQviDQutGD0YDRgdC+0YAg0Lgg0L3QtdC80L3QvtCz0L4g0L/QvtC00L7QttC00LDRgtGMXHJcbiAgICAgICAgdGl0bGU6ICfQnNC+0LUg0LzQtdGB0YLQvtC90LDRhdC+0LbQtNC10L3QuNC1JyxcclxuICAgICAgICAvLyDQo9C60LDQttC10Lwg0YHQstC+0Y4g0LjQutC+0L3QutGDINC00LvRjyDQvNCw0YDQutC10YDQsFxyXG4gICAgICAgIGljb246ICdhc3NldHMvaW1nL21hcF9tYXJrZXJfbGFyZ2UucG5nJ1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJue1xyXG5cclxuICAgICAgaW5pdDppbml0XHJcblxyXG4gICAgfTtcclxuXHJcbiAgfSkoKTtcclxuXHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgLy/QstGL0LfRi9Cy0LDQtdC8INC/0YDQuCDRg9GB0LvQvtCy0LjQuFxyXG4gICAgaWYoJCgnLnBhcmFsbGF4JykubGVuZ3RoKXtcclxuICAgICAgbXlNb3VzZVBhcmFsbGF4LmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuZnVsbHNjcmVlbi1tZW51JykubGVuZ3RoKXtcclxuICAgICAgYnVyZ2VyTWVudS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLmJsdXInKS5sZW5ndGgpe1xyXG4gICAgICBibHVyRm9ybS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLm5hdi1ibG9nJykubGVuZ3RoKXtcclxuICAgICAgc2lkZUJhckJsb2cuaW5pdCgpO1xyXG4gICAgICBzaWRlQmFyTmF2aWdhdGlvbi5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcucHJlbG9hZGVyJykubGVuZ3RoKXtcclxuICAgICAgcHJlbG9hZGVyLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5mbGlwcGVyJykubGVuZ3RoKXtcclxuICAgICAgZmxpcHBlci5pbml0KCk7ICBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcclxuICAgICAgc2xpZGVyLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy5kb3duLWFycm93JykubGVuZ3RoKXtcclxuICAgICAgZG93bkFycm93LmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJy51cC1hcnJvdycpLmxlbmd0aCl7XHJcbiAgICAgIHVwQXJyb3cuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLm1hcCcpLmxlbmd0aCl7XHJcbiAgICAgIGluaXRNYXAuaW5pdCgpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLnBhZ2VzX19jb250YWluZXInKS5sZW5ndGgpe1xyXG4gICAgICBteVNjcm9sbFBhcmFsbGF4LmluaXQoKTsgXHJcbiAgICB9XHJcblxyXG4gICAgaWYoJCgnLnNraWxscycpLmxlbmd0aCl7XHJcbiAgICAgIGFuaW1hdGVTa2lsbHMuaW5pdCgpOyBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcudGFicycpLmxlbmd0aCl7XHJcbiAgICAgIHRhYnMuaW5pdCgpOyBcclxuICAgIH1cclxuXHJcbiAgICBpZigkKCcud3JpdGUtbWUnKS5sZW5ndGgpe1xyXG4gICAgICB3cml0ZU1lLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJyNsb2dpbicpLmxlbmd0aCl7XHJcbiAgICAgIG1ha2VBdXRob3JpemF0aW9uLmluaXQoKTsgIFxyXG4gICAgfVxyXG5cclxuICB9KTtcclxuXHJcbn0pKCk7Il19
