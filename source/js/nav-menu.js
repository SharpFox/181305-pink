"use strict";

(function () {
    var MAIN_NAV_CLASS = 'main-nav';
    var MAIN_NAV_OPEN_CLASS = 'main-nav--open';
    var MAIN_NAV_TOGGLE_CLASS = 'main-nav__toggle';
    var MAIN_NAV_TOGGLE_OPEN_CLASS = 'main-nav__toggle--open';
    var MAIN_NAV_ITEM_LOGO_OPEN_CLASS = 'main-nav__item--logo-open';
    var MAIN_NAV_NOJS_CLASS = 'main-nav--nojs';
    var MAIN_NAV_ITEM_NOJS_CLASS = 'main-nav__item--nojs';
    var MAIN_NAV_TOGGLE_NOJS_CLASS = 'main-nav__toggle--nojs';

    var navMain = document.querySelector('.' + MAIN_NAV_CLASS);
    var navMainItemLogo = navMain.querySelector('.' + MAIN_NAV_ITEM_LOGO_OPEN_CLASS);
    var navToggle = document.querySelector('.' + MAIN_NAV_TOGGLE_CLASS);

    navMain.classList.remove(MAIN_NAV_NOJS_CLASS);
    navMainItemLogo.classList.remove(MAIN_NAV_ITEM_NOJS_CLASS);
    navToggle.classList.remove(MAIN_NAV_TOGGLE_NOJS_CLASS);

    navToggle.addEventListener('click', function () {
        if (navMain.classList.contains(MAIN_NAV_OPEN_CLASS)) {
            navMain.classList.remove(MAIN_NAV_OPEN_CLASS);
            navToggle.classList.remove(MAIN_NAV_TOGGLE_OPEN_CLASS);
            navMainItemLogo.classList.add(MAIN_NAV_ITEM_LOGO_OPEN_CLASS);
            
            return;
        }

        navMain.classList.add(MAIN_NAV_OPEN_CLASS);
        navToggle.classList.add(MAIN_NAV_TOGGLE_OPEN_CLASS);
        navMainItemLogo.classList.remove(MAIN_NAV_ITEM_LOGO_OPEN_CLASS);
    });
})();
