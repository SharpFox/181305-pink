"use strict";

(function () {
    var MAIN_NAV = 'main-nav';
    var MAIN_NAV_OPEN = 'main-nav--open';
    var MAIN_NAV_TOGGLE = 'main-nav__toggle';
    var MAIN_NAV_TOGGLE_OPEN = 'main-nav__toggle--open';

    var MAIN_NAV_NOJS = 'main-nav--nojs';
    var MAIN_NAV_TOGGLE_NOJS = 'main-nav__toggle--nojs';

    var navMain = document.querySelector('.' + MAIN_NAV);
    var navToggle = document.querySelector('.' + MAIN_NAV_TOGGLE);

    navMain.classList.remove(MAIN_NAV_NOJS);
    navToggle.classList.remove(MAIN_NAV_TOGGLE_NOJS);

    navToggle.addEventListener('click', function () {
        if (navMain.classList.contains(MAIN_NAV_OPEN)) {
            navMain.classList.remove(MAIN_NAV_OPEN);
            navToggle.classList.remove(MAIN_NAV_TOGGLE_OPEN);
            return;
        }

        navMain.classList.add(MAIN_NAV_OPEN);
        navToggle.classList.add(MAIN_NAV_TOGGLE_OPEN);
    });
})();
