  // Click button close modal
  $("#close-modal-tab").click(() => {
    $('.product-modal').hide();
    let myCarousel = $(".product-modal-img"); 
    myCarousel.trigger("destroy.owl.carousel");
    // $('.product-modal-img').removeClass('owl-loaded').removeClass('owl-drag').removeClass('owl-hidden').removeClass('owl-carousel');
    // $('.owl-stage-outer').remove();
    // $('.owl-nav').remove();
    // $('.owl-dots').remove();
  });
  