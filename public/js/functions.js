"use strict";

(function () {

    var Menu = {
        init: function init() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function cacheDOM() {
            this.$menuBtn = $('.header-menu-btn');
            this.$menuSpans = this.$menuBtn.find('span');
            this.$menuDisplay = $('.header-menu-display');
            this.$menuLinks = this.$menuDisplay.find('.header-menu-links');
            this.$menuLi = this.$menuDisplay.find('.header-menu-links li');
        },
        bindEvents: function bindEvents() {
            this.$menuBtn.on('click', this.activeMenu.bind(this));
        },
        activeMenu: function activeMenu() {
            this.$menuSpans.toggleClass('active-menu');
            this.$menuDisplay.toggleClass('active-menu');
            this.$menuLinks.toggleClass('active-menu');
            this.$menuLi.toggleClass('active-menu');
        }
    };

    Menu.init();
})();