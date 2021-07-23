(function() {

  // Video Modal

  'use-strict';

  (function (root, factory) {

    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory();
    } else {
      root.VideoModal = factory();
    }
  }
  
  (this, function () {

    var VideoModal = function (element) {
      if (!this || !(this instanceof VideoModal)) {
        return new VideoModal(element);
      }

      this.selector = document.querySelectorAll(element);
      this.root     = document.querySelector('body');
      this.run();
    };

    VideoModal.prototype = {
      run: function () {
        Array.prototype.forEach.call(this.selector, function (el) {
          el.addEventListener('click', function (e) {
            e.preventDefault();

            var link = this.parseUrl(el.getAttribute('href'));
            this.render(link);
            this.close();
          }.bind(this), false);
        }.bind(this));
      },
      template: function (s, d) {
        var p;

        for (p in d) {
          if (d.hasOwnProperty(p)) {
            s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
          }
        }
        return s;
      },
      parseUrl: function (url) {
        var service = {},
          matches;

        if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
          service.provider = "youtube";
          service.id       = matches[2];
        } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
          service.provider = "vimeo";
          service.id       = matches[3];
        } else {
          service.provider = "Unknown";
          service.id       = '';
        }

        return service;
      },
      render: function (service) {
        var embedLink,
            lightbox;

        if (service.provider === 'youtube') {
          embedLink = 'https://www.youtube.com/embed/' + service.id;
        } else if (service.provider === 'vimeo') {
          embedLink = 'https://player.vimeo.com/video/' + service.id;
        } else {
          throw new Error("Invalid video URL");
        }

        lightbox = this.template(
          '<div class="videomodal-wrap"><div class="videomodal-content"><span class="videomodal-close"></span><iframe src="{embed}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>', {
          embed: embedLink
        });

        this.root.insertAdjacentHTML('beforeend', lightbox);
      },
      close: function () {
        var wrapper = document.querySelector('.videomodal-wrap');

        wrapper.addEventListener('click', function (e) {
          if (e.target && e.target.nodeName === 'SPAN' && e.target.className === 'videomodal-close') {
            wrapper.classList.add('videomodal-hide');
              setTimeout(function() {
                this.root.removeChild(wrapper);
            }.bind(this), 500);
          }
        }.bind(this), false);
      }
    };

    return VideoModal;
  }));

  document.addEventListener('DOMContentLoaded', function() {
    VideoModal('.video-modal-trigger');
  });

})();

(function() {

  // Logo Scroller

  'use-strict';

  var glideMulti = new Glide('.logo-scroller', {
    type: 'carousel',
    hoverpause: true,
    perView: 5,
    breakpoints: {
      1200: {
        perView: 4
      },
      768: {
        perView: 3
      },
      576: {
        perView: 2
      },
      348: {
        perView: 1
      }
    }
  }).mount();
})();






(function() {

  // Anchor Scroller

  'use-strict';

  var anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach(function(anchor) {

    anchor.addEventListener('click', function() {

      var anchorDestination = anchor.getAttribute('href');

      animateScrollTo(document.querySelector(anchorDestination));
      
    }, false);
  });
})();

(function() {

  // Mobile Menu Control

  'use strict';

  var menuToggles = document.querySelectorAll('.menu-toggle');
  var mainHeaders = document.querySelectorAll('.main-header');
  var noScrolls   = document.querySelectorAll('html, body');
  var menuItems   = document.querySelectorAll('.main-navigation-list-item');

  for (var i = 0; i < menuToggles.length; i++) {
    menuToggles[i].addEventListener('click',   function() {

      for (var i = 0; i < menuToggles.length; i++) {
        menuToggles[i].classList.toggle('-active');
      }

      for (var i = 0; i < mainHeaders.length; i++) {
        mainHeaders[i].classList.toggle('-active');
      }

      for (var i = 0; i < noScrolls.length; i++) {
        noScrolls[i].classList.toggle('-inactive');
      }

    }, false);
  }

  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click',   function() {

      for (var i = 0; i < mainHeaders.length; i++) {
        mainHeaders[i].classList.remove('-active');
      }

      for (var i = 0; i < noScrolls.length; i++) {
        noScrolls[i].classList.remove('-inactive');
      }

      for (var i = 0; i < menuToggles.length; i++) {
        menuToggles[i].classList.remove('-active');
      }

    }, false);
  }

})();

(function() {

  // Logo List Resize

  "use strict";

  window.onload = function() {

    var images = document.querySelectorAll(".logo-list img");
    var logoLists = document.querySelectorAll(".logo-list");

    function adjustImageWidth(image) {
        var widthBase   = 80;
        var scaleFactor = 0.525;
        var imageRatio  = image.naturalWidth / image.naturalHeight;

        image.width = Math.pow(imageRatio, scaleFactor) * widthBase;
    }
    
    function activateLogoList(logoList) {
        logoList.classList.add("logo-list-active");
    }

    images.forEach(adjustImageWidth);
    logoLists.forEach(activateLogoList);

  };

})();

(function() {

  // Privacy Notice

  "use strict";
      
  var settings = {
    cookieExpiration: 365,
    cookieName: 'acknowledgeCookies'
  };

  var privacyNotices = document.getElementsByClassName('privacy-notice');
  var acknowledgeButtons = document.getElementsByClassName('acknowledge-cookies');
  
  function createCookie(name, value, days, domain) {
  
    var expires;
    var domain;
    var date = new Date();
  
    if (days) {
  
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = '; expires=' + date.toGMTString();
  
    } else {
  
      expires = '';
    }
  
    if (domain) {
  
      var domain = '; domain=' + domain;
    }
  
    document.cookie = name + '=' + value + expires + domain + '; path=/';
  }

  function readCookie(name) {
  
    var name = name + '=';
    var fields = document.cookie.split(';');
  
    for(var i=0; i < fields.length; i++) {
  
      var field = fields[i].trim();
  
      if (field.indexOf(name) == 0) {
  
        return field.substring(name.length, field.length);
      }
    }
    return null;
  }
  
  if (!readCookie(settings.cookieName)) {

    for(var i = 0; i < privacyNotices.length; i++) {

      privacyNotices[i].classList.add("privacy-notice-active");
    }
  }


  for(var i = 0; i < acknowledgeButtons.length; i++) {

    var acknowledgeButton = acknowledgeButtons[i];

    acknowledgeButton.onclick = function() {

      createCookie(settings.cookieName, 1, settings.cookieExpiration);

      for(var i = 0; i < privacyNotices.length; i++) {

        if (privacyNotices[i].classList.contains("privacy-notice-active")) {

          privacyNotices[i].classList.remove("privacy-notice-active");
        }
      }
    }
  }
})();