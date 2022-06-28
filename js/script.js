"use strict";

/***************** page Loading *****************/
$(window).on("load", function() {
    $("#loading").fadeOut();
})
$(document).ready(function() {

    /***************** Navbar active class*****************/
    $(".nav-defult .navbar ul").find("li").each(function() {
        var elm = $(this);
        elm.click(function() {
            elm.parent().find("li").removeClass("active");
            elm.addClass("active");

        });
        $("li#reservation").click(function() {
            elm.parent().find("li").removeClass("active");
        });

    });


    /***************** Mobile Navbar *****************/
    $("#responsive-menu-btn").click(function() {
        $("#responsive-menu-btn span.top").toggleClass("span-top-menu");
        $("#responsive-menu-btn span.main").toggleClass("span-main-menu");
        $("#responsive-menu-btn span.bottom").toggleClass("span-bottom-menu");
        $(".nav-mobile").slideToggle();
    });
    // hide navbar when click on link in navbar mobile and go The desired section
    $(".nav-mobile .navbar ul").find("li").each(function() {
        var elm = $(this);
        elm.click(function() {
            $(".nav-mobile").slideUp(10);
            $("#responsive-menu-btn span.top").removeClass("span-top-menu");
            $("#responsive-menu-btn span.main").removeClass("span-main-menu");
            $("#responsive-menu-btn span.bottom").removeClass("span-bottom-menu");
        });
    });


    /***************** Back to top Btn & scroll Event *****************/
    $(window).on("scroll", function() {
        var goTop = $("#back-to-top");
        var navbar = $("nav.nav-defult");
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            navbar.addClass("navbar-fixed");
            $("nav.nav-mobile").css("top", "50px");
            goTop.fadeIn();
            goTop.click(function(e) {
                e.preventDefault();
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        } else {
            goTop.fadeOut();
            navbar.removeClass("navbar-fixed")
            $("nav.nav-mobile").css("top", "107px");
        }
    });


    /***************** Special Menu Btn *****************/
    $("a[data-specialBtn]").each(function() {
        var btn = $(this);
        var tabBox = $("#" + btn.attr("data-specialBtn"));
        btn.click(function(e) {
            e.preventDefault();
            btn.parent().parent().find("li").removeClass("bg-active");
            btn.parent().addClass("bg-active");
            btn.parent().parent().find(".btn-item").css("color", "#fff");
            btn.css("color", "#000")
            btn.parent().parent().parent().parent().parent().find(".special-content").hide();
            tabBox.show();
        })
    });


    /***************** Event Slider *****************/
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 45,
        // centeredSlides: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });


    /***************** Member Comment Slider *****************/
    if (window.innerWidth > 992) {
        var swiper = new Swiper(".mySwiper1", {
            slidesPerView: 3,
            slidesPerGroup: 3,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }
        });
    } else if (window.innerWidth <= 992 && window.innerWidth > 768) {
        var swiper = new Swiper(".mySwiper1", {
            slidesPerView: 2,
            slidesPerGroup: 2,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }
        });
    } else if (window.innerWidth <= 768) {
        var swiper = new Swiper(".mySwiper1", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }
        });
    }


    /***************** Menu Filter and active btn *****************/
    var mixer = mixitup('.box-list')

    $("#menu .menu-filter ul").find("li").each(function() {
        var elm = $(this);
        elm.click(function() {
            elm.parent().find("li").removeClass("active");
            elm.addClass("active");

        })
    });


    /***************** AOS animate plugin *****************/
    AOS.init({
        once: true,
        duration: 1200,
        easing: 'ease-in-out',
    });


    /***************** venoBox Gallery Plugin *****************/
    $('.venobox').venobox({
        framewidth: '800px',
        frameheight: '100%',
    });


    /***************** Form validate : Book Table & contact *****************/
    var emailRegex = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/;
    var phoneNumberRegex = /(0|\+98|0098)?9[0123][0-9]{8}/;
    var peopleRegex = /^[1-9]{1,2}/;
    var nameRegex = /^[a-z\u0600-\u06ff]{3,18}/;
    $("#bookTableForm").submit(function(e) {
        var clintName = $("#bookTableName");
        if (!nameRegex.test(clintName.val())) {
            $("p#nameError").html("لطفا نام خود را به فارسی وارد کنید").show();
        } else {
            $("p#nameError").hide();
        }
        var clintEmail = $("#bookTableEmail");
        if (!emailRegex.test(clintEmail.val())) {
            $("p#emailError").html("لطفا یک ایمیل معتبر وارد کنید").show();
        } else {
            $("p#emailError").hide();
        }
        var clintPhone = $("#bookTablePhone");
        if (!phoneNumberRegex.test(clintPhone.val())) {
            $("p#phoneError").html("لطفا یک شماره معتبر وارد کنید").show();
        } else {
            $("p#phoneError").hide();
        }
        var clintPeople = $("#bookTablePeople");
        if (!peopleRegex.test(clintPeople.val())) {
            $("p#peopleError").html("لطفا تعداد افراد را مجاز انتخاب کنید").show();
        } else {
            $("p#peopleError").hide();
        }
        var clinetText = $("#bookTableText");
        if (nameRegex.test(clintName.val()) && emailRegex.test(clintEmail.val()) && phoneNumberRegex.test(clintPhone.val()) && peopleRegex.test(clintPeople.val())) {
            clintName.val("");
            clintEmail.val("");
            clintPhone.val("");
            clintPeople.val("");
            clinetText.val("");
        } else {
            e.preventDefault()
        }
    });

    $("#contactForm").submit(function(e) {
        var contactName = $("#contactName");
        if (!nameRegex.test(contactName.val())) {
            $("p#contactNameError").html("لطفا یک نام معتبر وارد کنید").show();
        } else {
            $("p#contactNameError").hide();
        }
        var contactEmail = $("#contactEmail");
        if (!emailRegex.test(contactEmail.val())) {
            $("p#contactEmailError").html("لطفا یک ایمیل معتبر وارد کنید").show();
        } else {
            $("p#contactEmailError").hide();
        }
        var contactSubject = $("#contactSubject");
        var contactText = $("#contactText");
        if (nameRegex.test(contactName.val()) && emailRegex.test(contactEmail.val())) {
            alert("پیام شما ارسال شد. \r با تشکر از پیام شما");
            contactName.val("");
            contactEmail.val("");
            contactSubject.val("");
            contactText.val("");
        } else {
            e.preventDefault();
        }
    });


    /***************** Date and Time picker *****************/
    $(".datepicker").pDatepicker({
        "format": "LLLL",
        "viewMode": "day",
        "initialValue": false,
        "autoClose": false,
        "calendarType": "persian",
        "observer": false,
        "responsive": true,
        "timePicker": {
            "enabled": true,
        },
        "toolbox": {
            "enabled": true,
            "calendarSwitch": {
              "enabled": false,
            },
            "submitButton": {
              "enabled": true,
              "text": {
                "fa": "تایید",
                "en": "Submit"
              }
            },
        },
    });

});