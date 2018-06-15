$(function() {
	$(".nbtn").click(function() {
		if ($("#panel").css('display') == 'block') {
			navClose();
		} else {
			navShow();
		}
		$("#panel").slideToggle(200);
		$(".nbtn_icon").toggleClass("close");
	});
	
	// foot btn
	setFootBtnPosition();
	
	$(window).scroll(function() {
		setFootBtnPosition();
	});
	
	$("#top").click(function() {
		$('html, body').animate({scrollTop:0}, 'slow');
	});
	
	$('.cart').click(function() {
		toggleCartBox('block');
	});
	
	createCartBox();
});

function setFootBtnPosition() {
	var normalBottom = 40;
	var height = {
		'scroll'	: $(window).scrollTop(),
		'window'	: $(window).height(),
		'document'	: $(document).height()
	};
	var foot = $('#foot');
	var footBorderHeight = foot.css('border-top-width');
	if (footBorderHeight) {
		footBorderHeight = replaceStr(footBorderHeight);
	}
	var btnCart = $('#foot .cart');
	var btnHeight = btnCart.height();
	var btnMarginTop = btnCart.css('margin-top');
	if (btnMarginTop) {
		btnMarginTop = replaceStr(btnMarginTop);
	}
	var footBottom = parseFloat(foot.height()) - parseFloat((btnHeight - footBorderHeight)/2) + parseFloat(normalBottom);
	// btn 
	var footBtnBottom = 0;
	var width = $(window).width();
	if (width < 0) { //767 - 19
		var footBtnHeight = $('.foot_btn').height();
		if (height.document - height.window - height.scroll >= footBottom - footBtnHeight - 15) {
			$('.foot_btn').css({'position': 'fixed', 'bottom': '0px'});
		} else {
			$('.foot_btn').css({'position': 'relative'});
		}
	} else {
		if (height.document - height.window - height.scroll >= footBottom) {
			footBtnBottom = normalBottom;
		} else {
			footBtnBottom = parseFloat(foot.height()) - parseFloat(height.document - height.window - height.scroll) - parseFloat((btnHeight - footBorderHeight)/2);
		}
		if (height.window - $('.foot_btn').height() <= parseFloat(footBottom) + parseFloat($('#head').height())) {
			footBtnBottom = normalBottom;
		}
		$('.foot_btn').css('bottom', footBtnBottom + 'px');
	}
	if (height.scroll >= 1000) {
		$('#top').css('visibility', 'visible');
	} else {
		$('#top').css('visibility', 'hidden');
	}
}

function replaceStr (str, k) {
	k = k || 'px';
	str = str.replace(new RegExp(k,'g'),'');
	return str;
}

function navShow() {
	toggleCartBox('none');
	var nav = document.getElementById('panel');
	navClear(nav);
	var oldNavHtml = document.getElementsByClassName('nav')[0].innerHTML;
	var newNav = document.createElement('ul');
	newNav.innerHTML = oldNavHtml;
	nav.appendChild(newNav);
	var a = document.getElementById('panel').getElementsByTagName('a');
	for (var k in a) {
		a[k].onclick = function() {
			var href = this.getAttribute('href');
			var prefix = new RegExp('^.+\/', 'g');
			href = href.replace(prefix, '');
			href = href.replace(/.html/, '');
			if (page === href || page === href + '_detail') {
				alert('Coming Soon');
				return false;
			}
		};
	}
}

function navClose() {
	var nav = document.getElementById('panel');
	navClear(nav);
}

function navClear(nav) {
	var navUl = nav.getElementsByTagName('ul')[0];
	if (navUl) navUl.parentNode.removeChild(navUl);
}

function createCartBox() {
	var baseUrl = getBaseUrl();
	var cart = '';
	cart += '<div class="cart_close"><a href="javascript:;" onclick="toggleCartBox(\'none\')"></a></div>';
	cart += '<h2>ショッピングサイトから購入</h2>';
	cart += '<p>';
	cart += '<a href="https://store.shopping.yahoo.co.jp/vigiee" target="_blank"><img src="' + baseUrl + 'img/icon_yahoo.png"></a>';
	cart += '<a href="https://www.rakuten.co.jp/vigiee/" target="_blank"><img src="' + baseUrl + 'img/icon_rakuten.png"></a>';
	cart += '<a href="https://wowma.jp/user/42887401" target="_blank"><img src="' + baseUrl + 'img/icon_wowma.png"></a>';
	cart += '</p>';
	var cartBox = document.createElement('div');
	cartBox.id = 'cart';
	cartBox.innerHTML = cart;
	document.body.appendChild(cartBox);
}

function toggleCartBox(status) {
	status = status || 'block';
	var cartBox = document.getElementById('cart');
	cartBox.style.display = status;
}

function getBaseUrl() {
	var href = window.location.href;
	var baseUrlReg = new RegExp('^.+\/', 'g');
	var baseUrl = href.match(baseUrlReg);
	return baseUrl;
}

var $_GET = (function() {
    var url = window.location.search.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();