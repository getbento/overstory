/*
 * Constants
 ***************************/
const mobileBreakpoint = 767;

/*
 * Globals
 ***************************/
  /* Window */
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var windowScrollHeight = document.querySelector('body').scrollHeight;
  /* Breakpoints */
    var isMobile = ( windowWidth <= mobileBreakpoint );
  /* Mobile Navigation */
    var isMenuOpen = false;

const handleKeypressADA = function() {
  const keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') return;
  $(this).trigger('click');
};

$(window).on('load', function() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  windowScrollHeight = document.querySelector('body').scrollHeight;
});

$(document).ready(function(){
  /* Generic */
  $('.site-header__toggle').on('click', function(){
    isMenuOpen = !isMenuOpen;
    $(this).attr('aria-expanded', isMenuOpen);
    $(this).toggleClass('active');
    $('.site-header__aux').toggleClass('active');
  }).on('keypress', handleKeypressADA);

  $('a').each(function(){
    if ( $(this).attr('href').charAt(0) == '#' ) {
      $(this).addClass('smooth-scroller');
    }
  })

  if ( $('.modal-area').length ) {
    $('.modal-area').each(function(){
      const prop = $(this).data('propid');

      $(this).find('.modal-area__dismiss').on('click', function(){
        $(this).closest('.modal-area').removeClass('active');
        window.localStorage.setItem( prop, 'true' );
      }).on('keypress', handleKeypressADA);

      const element = $(this).get(0);

      $(this).on('click', function(e){
        if (e.target !== element && !element.contains(e.target)) {
          $(this).removeClass('active');
          window.localStorage.setItem( prop, 'true' );
        }
      });

      const modalDismissed = window.localStorage.getItem( prop );
      if ( modalDismissed != 'true' ) {
        const modal = $(this);
        setTimeout(function(){
          modal.addClass('active');
        }, $(this).data('delay'));
      }
    });
  }

  if ( $('.smooth-scroller').length ) { // internal links, smooth scrolling
    $('.smooth-scroller').on('click', function(e){
      e.preventDefault();
      let target = $( $(this).attr('href') ).offset().top - 94;
      let dist = Math.abs($(window).scrollTop() - target);

      $([document.documentElement, document.body]).animate({
        scrollTop: target
      }, Math.min(1200, ((dist / 1200) * 1000)));
    }).on('keypress', handleKeypressADA);
  }

  if ( $('.fr-dib').length ) {
    $('.fr-dib').each(function(){
      $(this).wrap('<figure></figure');
      $(this).parent().attr('class', $(this).attr('class'));

      const img = $(this).is('img') ? $(this) : $(this).find('img');
      const caption = $(this).find('.fr-inner').length ? $(this).find('.fr-inner') : false;

      const figure = $(this).parent();
      figure.html('');

      figure.append(img);

      if ( caption ) {
        const figcaption = document.createElement('figcaption');
        $(figcaption).append(caption);
        figure.append(figcaption);
      }
    });
  }

  if ( $('.acm').length ) {
    $('.acm').each(function(){
      const trigger = $(this).find('.acm-trigger');
      const controls = $(this).find('.acm-controls');
      controls.addClass('has-js');

      let isAccordionOpen = false;

      trigger.on('click', function() {
        isAccordionOpen = !isAccordionOpen;
        $(this).toggleClass('active');
        $(this).attr('aria-expanded', isAccordionOpen);
        controls.slideToggle(400);
      }).on('keypress', handleKeypressADA);
    });
  }
  /* END GENERIC SCRIPTS */

  /* Gallery */
  if ( $('.homepage-gallery').length ) {
    $('.homepage-gallery').each(function(){
      const controls = $(this).find('.homepage-gallery__nav');
      const indicator = $(this).find('.homepage-gallery__nav-indicator');

      const slick = $(this).find('.homepage-gallery__list');

      slick.slick({
        arrows: true,
        appendArrows: controls,
        prevArrow: '<button type="button" class="slick-prev"><span class="screen-reader-text">Previous</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span class="screen-reader-text">Next</span></button>',
        dots: true,
        appendDots: controls,
        cssEase: 'cubic-bezier(0.64, 0.04, 0.35, 1)'
      });

      indicator.css('left', (controls.find('.slick-active').offset().left - controls.offset().left) + 'px' );
      setTimeout(function(){
        indicator.addClass('active');
      }, 1);


      $(window).on('resize', function(){
        indicator.css('left', (controls.find('.slick-active').offset().left - controls.offset().left) + 'px' );
      });

      slick.on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const newActiveDot = controls.find('.slick-dots li').eq(nextSlide);
        indicator.css('left', (newActiveDot.offset().left - controls.offset().left) + 'px' );
      });
    });
  }
  /* END GALLERY SCRIPTS */
}); // document ready end

/*
 * Window Resize
 ***************************/
$(window).resize(function(){
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  windowScrollHeight = document.querySelector('body').scrollHeight;
  isMobile = ( windowWidth <= mobileBreakpoint );

}); // end window resize functions

/*
 * Functions
 ***************************/
