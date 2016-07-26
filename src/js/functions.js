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
            }

            this.$commentInput.val('');
            isExecuted++;

            if (isExecuted === 1) {
                $.ajax({
                    type: 'POST',
                    url: loca,
                    data: this.$self,
                    success: function(data) {
                        $('.campsite-comments').append('<ul style="opacity: 0" ><li>'+ data.name +'<p>'+ data.date +'</p></li><li>'+ data.comment +'</li></ul>');
                        this.applyStyles();
                        return isExecuted = 0;
                    },
                    applyStyles: function() {
                        setTimeout(() => {
                            $('.campsite-comments ul').css({ 'opacity' : 1 });
                        }, 200);
                    },
                    error: function() {
                        console.log("Error has occured");
                    }
                });
            } else {
                return isExecuted = 0;
            }
        },
        gettingDate: function() {
            this.date = new Date();
            this.today = this.date.getDate();
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();

            return this.newDate = this.month + "/" + this.today + "/" + this.year;
        }
    };

    Comments.init();

})();



(function() {

    const CommentRemoval = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$commentRemove = $('.remove-comment');
        },
        bindEvents: function() {
            this.$commentRemove.on('click', this.removeComment.bind(this));
        },
        removeComment: function(event) {
            // grabs event to be used to be passed to removeCommentDisplay
            var rcomment = event;
            var commentId = event.target.dataset.id;

            $.ajax({
                type: 'DELETE',
                url: '/campground/comments/' + commentId,
                success: () => {
                    console.log("Delete was Successful");
                    this.removeCommentDisplay(rcomment);
                }
            });
        },
        removeCommentDisplay: function(elem) {
            var element = elem.target
            element.closest('ul').remove();
        }
    }

    CommentRemoval.init();

})();
