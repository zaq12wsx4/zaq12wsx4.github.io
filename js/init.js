/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/
// const captchaKey = "A1781D127V58GR2AKBGBTJEPMT6FKUK5FDI2OROTITBQ8LTQ6FQKRTEHIQ";

let email = "am9uYXRoYW5wZmlubkB5YWhvby5jb20=";
let tel = "OTAxMzA1MzA3OQ==";

jQuery(document).ready(function ($) {

   /*----------------------------------------------------*/
   /* Modal Handling
   ------------------------------------------------------ */
   $.when(requestUserRepos()).done(modalPopup())

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */

   setTimeout(function () {
      $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
   }, 100);


   /*----------------------------------------------------*/
   /* Smooth Scrolling
   ------------------------------------------------------ */

   $('.smoothscroll').on('click', function (e) {
      e.preventDefault();

      var target = this.hash,
         $target = $(target);

      $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 600, function () {
         window.location.hash = target;
      });
   });


   /*----------------------------------------------------*/
   /* Highlight the current section in the navigation bar
   ------------------------------------------------------*/

   var sections = $("section");
   var navigation_links = $("#nav-wrap a");

   sections.waypoint({

      handler: function (event, direction) {

         var active_section;

         active_section = $(this);
         if (direction === "up") active_section = active_section.prev();

         var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
         active_link.parent().addClass("current");

      },
      offset: '35%'

   });


   /*----------------------------------------------------*/
   /*	Make sure that #header-background-image height is
   /* equal to the browser height.
   ------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function () {

      $('header').css({ 'height': $(window).height() });
      $('body').css({ 'width': $(window).width() })
   });


   /*----------------------------------------------------*/
   /*	Fade In/Out Primary Navigation
   ------------------------------------------------------*/

   $(window).on('scroll', function () {

      var h = $('header').height();
      var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

      if ((y > h * .20) && (y < h * 0.95) && ($(window).outerWidth() > 768)) {
         nav.fadeOut('fast');
      }
      else {
         if (y < h * .20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

   });


   /*----------------------------------------------------*/
   /*	Flexslider
   /*----------------------------------------------------*/
   // $('.flexslider').flexslider({
   //    namespace: "flex-",
   //    controlsContainer: ".flex-container",
   //    animation: 'slide',
   //    controlNav: true,
   //    directionNav: false,
   //    smoothHeight: true,
   //    slideshowSpeed: 7000,
   //    animationSpeed: 600,
   //    randomize: false,
   // });

   /*----------------------------------------------------*/
   /*	contact form
   ------------------------------------------------------*/

   // $('form#contactForm button.submit').click(function () {

   //    $('#image-loader').fadeIn();

   //    var contactName = $('#contactForm #contactName').val();
   //    var contactEmail = $('#contactForm #contactEmail').val();
   //    var contactSubject = $('#contactForm #contactSubject').val();
   //    var contactMessage = $('#contactForm #contactMessage').val();

   //    var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
   //       '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

   //    $.ajax({

   //       type: "POST",
   //       url: "inc/sendEmail.php",
   //       data: data,
   //       success: function (msg) {

   //          // Message was sent
   //          if (msg == 'OK') {
   //             $('#image-loader').fadeOut();
   //             $('#message-warning').hide();
   //             $('#contactForm').fadeOut();
   //             $('#message-success').fadeIn();
   //          }
   //          // There was an error
   //          else {
   //             $('#image-loader').fadeOut();
   //             $('#message-warning').html(msg);
   //             $('#message-warning').fadeIn();
   //          }

   //       }

   //    });
   //    return false;
   // });

});

/*----------------------------------------------------*/
/*	Github API Request
/*----------------------------------------------------*/

function requestUserRepos() {

   // Create new XMLHttpRequest object
   const xhr = new XMLHttpRequest();

   // GitHub endpoint, dynamically passing in specified username
   const url = `https://api.github.com/users/zaq12wsx4/repos`;

   // Open a new connection, using a GET request via URL endpoint
   // Providing 3 arguments (GET/POST, The URL, Async True/False)
   xhr.open('GET', url, false);

   // When request is received
   // Process it here
   xhr.onload = function () {

      // Parse API data into JSON
      const data = JSON.parse(this.response);

      // Log the response
      console.log(data);

      // Loop over each object in data array
      var repohtml = [];
      var element = $('#portfolio-wrapper');
      var count = 0;


      for (let i in data) {
         repohtml.push('<div class="columns portfolio-item">');
         repohtml.push('<div class="item-wrap">');
         repohtml.push('<a href="#modal-' + count + '" title="">');
         repohtml.push('<img alt="" src="https://source.unsplash.com/random/400x400?sig=' + count + '">');
         repohtml.push('<div class="overlay">');
         repohtml.push('<div class="portfolio-item-meta">');
         repohtml.push('<h5>' + data[i].name + '</h5>');
         repohtml.push('<p>' + data[i].language + '</p>');
         repohtml.push('</div>');
         repohtml.push('</div>');
         repohtml.push('<div class="link-icon"><i class="icon-plus"></i></div>');
         repohtml.push('</a>');
         repohtml.push('</div>');
         repohtml.push('</div>');

         count += 1;

      }
      console.log(repohtml.join(''));
      element.append(repohtml.join(''));


      // Loop over each object in data array
      var repohtml = [];
      var element = $('#portfolio-section');
      var count = 0;


      for (let i in data) {
         repohtml.push('<div id="modal-' + count + '" class="popup-modal mfp-hide">');
         repohtml.push('<img class="scale-with-grid" id="modal-' + count + '-img" src="" alt="" />');
         repohtml.push('<div class="description-box">');
         repohtml.push('<h4>' + data[i].name + '</h4>');
         if(data[i].description == null){
            repohtml.push('<p>' + 'No description available' + '</p>');
         } 
         else{
            repohtml.push('<p>' + data[i].description + '</p>');
         }
         repohtml.push('<span class="categories"><i class="fa fa-tag"></i>' + data[i].language + '</span>');
         repohtml.push('</div>');
         repohtml.push('<div class="link-box">');
         repohtml.push('<a href="' + data[i].html_url + '" target="_blank" rel="noopener noreferrer">View</a>');
         repohtml.push('<a class="popup-modal-dismiss">Close</a>');
         repohtml.push('</div>');
         repohtml.push('</div><!-- modal End -->');

         count += 1;

      }
      console.log(repohtml.join(''));
      element.append(repohtml.join(''));



   }

   // Send the request to the server
   xhr.send();

}

/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/
function modalPopup() {

   $('.item-wrap a').magnificPopup({

      type: 'inline',
      fixedContentPos: false,
      removalDelay: 200,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
   });
}




$('.show').click(function() {
   $(this).prop('disabled', true).text(atob($(this).prop('value')));
   $(".toast").text($(".toast").text().replace("Click to Copy", "Copied!"));
   navigator.clipboard.writeText($(this).text());
});



