"use strict";

(function() {

    const Menu = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$menuBtn      = $('.header-menu-btn');
            this.$menuSpans    = this.$menuBtn.find('span');
            this.$menuDisplay  = $('.header-menu-display');
            this.$menuLinks    = this.$menuDisplay.find('.header-menu-links');
            this.$menuLi       = this.$menuDisplay.find('.header-menu-links li');
        },
        bindEvents: function() {
            this.$menuBtn.on('click', this.activeMenu.bind(this));
        },
        activeMenu: function() {
            this.$menuSpans.toggleClass('active-menu');
            this.$menuDisplay.toggleClass('active-menu');
            this.$menuLinks.toggleClass('active-menu');
            this.$menuLi.toggleClass('active-menu');
        }
    }

    Menu.init();

})();
