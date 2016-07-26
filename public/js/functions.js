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
            var isExecuted = 0;

            this.$self = {
                name: this.$commentUser.val(),
                comment: this.$commentInput.val(),
                date: this.gettingDate()
            };

            this.$commentInput.val('');
            isExecuted++;

            if (isExecuted === 1) {
                $.ajax({
                    type: 'POST',
                    url: loca,
                    data: this.$self,
                    success: function success(data) {
                        $('.campsite-comments').append('<ul style="opacity: 0" ><li>' + data.name + '<p>' + data.date + '</p></li><li>' + data.comment + '</li></ul>');
                        this.applyStyles();
                        return isExecuted = 0;
                    },
                    applyStyles: function applyStyles() {
                        setTimeout(function () {
                            $('.campsite-comments ul').css({ 'opacity': 1 });
                        }, 200);
                    },
                    error: function error() {
                        console.log("Error has occured");
                    }
                });
            } else {
                return isExecuted = 0;
            }
        },
        gettingDate: function gettingDate() {
            this.date = new Date();
            this.today = this.date.getDate();
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();

            return this.newDate = this.month + "/" + this.today + "/" + this.year;
        }
    };

    Comments.init();
})();

(function () {

    var CommentRemoval = {
        init: function init() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function cacheDOM() {
            this.$commentRemove = $('.remove-comment');
        },
        bindEvents: function bindEvents() {
            this.$commentRemove.on('click', this.removeComment.bind(this));
        },
        removeComment: function removeComment(event) {
            var _this = this;

            // grabs event to be used to be passed to removeCommentDisplay
            var rcomment = event;
            var commentId = event.target.dataset.id;

            $.ajax({
                type: 'DELETE',
                url: '/campground/comments/' + commentId,
                success: function success() {
                    console.log("Delete was Successful");
                    _this.removeCommentDisplay(rcomment);
                }
            });
        },
        removeCommentDisplay: function removeCommentDisplay(elem) {
            var element = elem.target;
            element.closest('ul').remove();
        }
    };

    CommentRemoval.init();
})();