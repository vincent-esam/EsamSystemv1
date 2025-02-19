document.addEventListener('DOMContentLoaded', function () {
  (function () {
    'use strict';
    function initialize () {
      var headerTogglers = document.querySelectorAll('.js-collapse-toggler');
      if (headerTogglers.length) {
        addListener(headerTogglers, 'click', headerToggle);
      }
      var lastScrollTop = 0;
      window.addEventListener("scroll", function (e) {
        var o = this.scrollY;
        o > 50 ? document.querySelector('header').classList.add('scrolled') : document.querySelector('header').classList.remove('scrolled'), lastScrollTop = o;
      });
    }
    //collapses
    function headerToggle () {
      let target = document.getElementById(this.dataset.aim);
      if (target) {
        if (target.classList.contains('in')) {
          var targetHeight = target.offsetHeight;
          target.style.height = targetHeight + 'px';
          setTimeout(() => {
            target.style.height = '1px';
          }, 5);
          setTimeout(() => {
            this.classList.add('collapsed');
            target.classList.remove('in');
            target.removeAttribute("style");
          }, 300);
        } else {
          target.classList.add('in');
          var targetHeight = target.offsetHeight;
          this.classList.remove('collapsed');
          target.style.height = '1px';
          setTimeout(() => {
            target.style.height = targetHeight + 'px';
          }, 5);
          setTimeout(() => {
            target.removeAttribute("style");
          }, 305);
        }
      }
    }
    function addListener (elem, event, action) {
      for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener(event, action, false);
      }
    }
    initialize();
  })();
});