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

(function () {

    var Comments = {
        init: function init() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function cacheDOM() {
            this.$submitComment = $('#submit-comment');
            this.$commentInput = $('#comment-input');
            this.$commentUser = $('#comment-user');
            this.$campsiteComment = $('.campsite-comments');
        },
        bindEvents: function bindEvents() {
            this.$submitComment.on('click', this.addComment.bind(this));
        },
        addComment: function activeMenu() {
            var loca = window.location.pathname;
            this.$self = {
                name: this.$commentUser.val(),
                comment: this.$commentInput.val()
            };

            $.ajax({
                type: 'POST',
                url: 'http://localhost:7000/' + loca,
                data: this.$self,
                success: function success(data) {
                    $('.campsite-comments').append('<ul><li>' + data.name + '<p>March 18, 2016</p></li><li>' + data.comment + '</li></ul>');
                },
                error: function error() {
                    console.log("Error has occured");
                }
            });
        }
    };

    Comments.init();
})();