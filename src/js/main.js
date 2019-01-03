jQuery(document).ready(function($){

  /**
   * Hamhurger Menu
   */
  $('.mobile-menu-button').click(function(){
    $(this).toggleClass('is-open');
    $('nav.site-nav').toggleClass('is-open');
    $('body').toggleClass('body-lock');
  });

  /**
   * Element in viewport
   */
  $.fn.isInViewport = function() {

    let eT = $(this).offset().top;

    let vT = $(window).scrollTop();
    let vB = vT + $(window).height();

    return eT < vB;

  }

  /**
   * Remove effects
   */
  function revealElements() {
    $('.sfx').each(function() {
      let el = $(this);

      if ( el.isInViewport() ) {
        el.removeClass( function( index, className ) {
          return (className.match (/(^|\s)sfx-\S+/g) || []).join(' ');
        });

        setTimeout(function(){
          el.removeClass('sfx');
        }, 1500);
      }
    });
  }

});
