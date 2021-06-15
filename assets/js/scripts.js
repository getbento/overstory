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
      let target = $( $(this).attr('href') ).offset().top;
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
  /* END GENERIC SCRIPTS */
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
