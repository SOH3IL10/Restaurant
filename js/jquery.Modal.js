(function($) {
    $.fn.slModal = function(userOptions) {
        var options = $.extend({
            wrapperBgColor: "#000", // color of modal bg
            wrapperOpacity: 0.8, // opacity of modal bg
            width: 500, // width of modal in pixel
            entrance: "top", // fade,top,bottom,right,left,topleft
            speed: 500, // in ms
            top: 100, // distance from top
            showEvent: "click", // all jquery valid events
            showCloseButton: false, // Tamrin
            CloseButtonText: "X", // Tamrin
            onStart: "", // set custom call before popin is inited..
            onFinish: "" // ..and after it was closed
        }, userOptions);

        var enterModal = function(modal, enterMode) {
            var wh = $(window).height();
            var ww = $(window).width();
            var topPosition = options.top + "px";
            var leftPosition = (ww - modal.width()) / 2 + "px";

            switch (enterMode) {
                case "fade":
                    modal.css({ top: topPosition, left: leftPosition })
                    modal.fadeIn(options.speed)
                    break;
                case "bottom":
                    modal.css({ top: 2 * wh, left: leftPosition, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "left":
                    modal.css({ top: topPosition, left: -1 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "right":
                    modal.css({ top: topPosition, left: 2 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "topleft":
                    modal.css({ top: -1 * wh, left: -1 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "topright":
                    modal.css({ top: -1 * wh, left: 2 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "bottomleft":
                    modal.css({ top: 2 * wh, left: -1 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "bottomright":
                    modal.css({ top: 2 * wh, left: 2 * ww, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
                case "top":
                default:
                    modal.css({ top: -1 * wh, left: leftPosition, display: "block" })
                    modal.animate({ top: topPosition, left: leftPosition }, options.speed)
                    break;
            }
        }

        $(document).ready(function() {
            var modalButtons = $("a[data-modal],button[data-modal]");
            var wrapper = $("<div>").addClass("slModalWrapper").css({
                backgroundColor: options.wrapperBgColor,
                opacity: options.wrapperOpacity
            });
            var closeBtn = $("<span>").addClass("closeBtn").text(options.CloseButtonText);

            modalButtons.each(function() {
                var mBtn = $(this);
                var mBox = $("#" + mBtn.attr("data-modal")).css({ width: options.width + "px" });

                mBtn.on(options.showEvent, function(ev) {
                    ev.preventDefault();
                    mBox.before(wrapper)

                    if (typeof options.onStart === 'function')
                        options.onStart();

                    wrapper.fadeIn(options.speed);
                    var enterMode = mBox.is("[data-entrance]") ? mBox.attr("data-entrance") : options.entrance;

                    enterModal(mBox, enterMode);
                    if (options.showCloseButton === true) {
                        $(document.body).append(closeBtn);
                        closeBtn.fadeIn(options.speed);
                    }

                    wrapper.click(function() {
                        wrapper.fadeOut(options.speed)
                        closeBtn.fadeOut(options.speed)
                        mBox.fadeOut(options.speed, function() {
                            if (typeof options.onFinish === 'function')
                                options.onFinish();
                        })
                    })

                    closeBtn.click(function() {
                        wrapper.fadeOut(options.speed)
                        closeBtn.fadeOut(options.speed)
                        mBox.fadeOut(options.speed, function() {
                            if (typeof options.onFinish === 'function')
                                options.onFinish();
                        })
                    })
                })
            })

        })

    }

})(jQuery);