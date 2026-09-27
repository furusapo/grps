$(function() {
    // ページタイトルとトップ画像にヘッダーの高さ分paddingをsp時に付与
    const height = $('#header').outerHeight();
    
    $('.bx-wrapper').attr('style', 'margin-top:' + height + 'px;');
    $('.pageTtlWrapper').attr('style', 'margin-top:' + height + 'px;');
    $('.mainImgWrapper').attr('style', 'margin-top:' + height + 'px;');

    if (window.outerWidth > 768) {
        $('#slideImg').attr('style', 'margin-top:' + height + 'px;');
    }

    let hoverFlag = false;

    /*ハンバーガーボタンをクリックでグロナビ表示*/
    $('.humBtn').click(function(){
        $(this).toggleClass('active');
        $('#headWrapper').toggleClass('active');
        $('#mainNav').toggleClass('active');
        $('#headNav').toggleClass('active');
        $('ul.child').toggleClass('active');
        $('.childIn').toggleClass('active');
        $('body').toggleClass('open');
        
        hoverFlag = !hoverFlag;
        if (hoverFlag) {
            $(".child").show();
            $('nav .parent').off('mouseenter mouseleave');
        } else {
            $('nav .parent').on({
        mouseenter: function() {
            $(this).find(".child").stop().slideDown();
        },
        mouseleave: function() {
            $(this).find(".child").stop().slideUp();
        }
    })
            $(".child").hide();
        }
    });

    /*スクロールでスライド部分を超えた場合.scrollを付与*/
    $(window).scroll(function () {
        const ScrTop = $(document).scrollTop();
        const slideHeight = $('#slideImg').outerHeight();
        const pageTtlHeight = $('.pageTtlWrapper').height();
        const mainImgHeight = $('.mainImgWrapper').height();

        function isOverSlideHeight(ScrTop, slideHeight) {
            if (slideHeight !== null && ScrTop > slideHeight) {
                return true;
            } else {
                return false;
            }
        }

        function isOverMainImgHeight(ScrTop, mainImgHeight) {
            if (mainImgHeight !== null && ScrTop > mainImgHeight) {
                return true;
            } else {
                return false;
            }
        }

        function isOverpageTtlHeight(ScrTop, pageTtlHeight) {
            if (pageTtlHeight !== null && ScrTop > pageTtlHeight) {
                return true;
            } else {
                return false;
            }
        }

        const slideresult = isOverSlideHeight(ScrTop, slideHeight);
        const mainImgResult = isOverMainImgHeight(ScrTop, mainImgHeight);
        const pageTtlResult = isOverpageTtlHeight(ScrTop, pageTtlHeight);

        if(slideresult || mainImgResult || pageTtlResult){
            $('#header').addClass('scroll');
            $('#header #siteTtl a').addClass('scroll');
            $('#header .humBtn').addClass('scroll');
            $('#header #headWrapper').addClass('scroll');
        } else {
            $('#header').removeClass('scroll');
            $('#header #siteTtl a').removeClass('scroll');
            $('#header .humBtn').removeClass('scroll');
            $('#header #headWrapper').removeClass('scroll');
        }
    });

    $(".child").hide();
    $("nav .parent").hover(function() {
        $(this).find(".child").stop().slideDown();
    }, function() {
        $(this).find(".child").stop().slideUp();
    });
    $('.parent').has('.child').addClass("childIn");

    //ページトップ
	const pagetop = $("#pagetop");
    const sp_pagetop = $("#sp_pagetop");

	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 300) {
			pagetop.fadeIn();
            sp_pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
            sp_pagetop.fadeOut();
		}
	});

	$("#pagetop a").on("click", function () {
		$('html,body').animate({ scrollTop: 0 }, 600);
		return false;
	});
    $("#sp_pagetop a").on("click", function () {
		$('html,body').animate({ scrollTop: 0 }, 600);
		return false;
	});

    /* News more */
    let newsSize = $('#newsTopics .list li').length;
    let moreNum = 5;
    if (newsSize > 5) {
        $('#newsTopics .list li:nth-child(n+' + (moreNum + 1) + ')').addClass('is-hidden');
        $('#newsTopics .moreBtn button').on('click', function () {
            $('#newsTopics .list li.is-hidden').slice(0, moreNum).removeClass('is-hidden');
            if ($('#newsTopics .list li.is-hidden').length == 0) {
                $('#newsTopics .moreBtn').fadeOut();
            }
        });
    } else {
        $('#newsTopics .moreBtn').hide();
    }
});
