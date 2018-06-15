$(function() {
	$(window).on('load', function() {
		var href = window.location.pathname;
		var prefix = new RegExp('^.+\/', 'g');
		href = href.replace(prefix, '');
		href = href.replace('/', '');
		href = href.replace(/.html/, '');
		href = href === '' ? 'index' : href;
		var animated = animates[href];
		if (animated && JSON.stringify(animated) !== '{}') {
			animateInit(animated);
		}
	});
});

var animates = {
	'index'	: {
		'fadeIn' : [
			'.cu_tit', '.cl_last',
			'.cb_tit', '.cp_tit', '.cn_tit', 
			'.cp_test', 
			'.cb_txt', '.cpct', '.cpcn p', '.cu1', '.cu3', 
			'.cb_img', '.cpcc', '.cpc_normal img', '.cu2'
		]
	}, 
	'about' 		: {},
	'news'			: {
		'fadeIn' : ['.sub_tit']
	},
	'news_detail'	: {},
	'faq' 			: {
		'fadeIn' : ['.sub_tit', '.qa_q', '.qa_a']
	},
	'contact' 		: {},
	'privacy' 		: {}
};

var animateInit = function(animated, diffHeight) {
	// check
	if (Object.prototype.toString.call(animated) != '[object Object]') {
		return false;
	}
	// init param
	var animateDefault = [
			'fadeIn',
			'fadeInDown',
			'fadeInUp',
			'fadeInLeft',
			'fadeInRight',
			'pulse',
			'bounceIn',
			'flipInX'
		],
		scroll = {},
		diffHeight = diffHeight || 100;
	for (var k in animated) {
		if ($.inArray(k, animateDefault) >= 0) {
			for (var o in animated[k]) {
				var objs = $(animated[k][o]);
				objs.each(function(index) {
					var obj = {
						'obj'	: objs.eq(index),
						'effect': k
					};
					var topHeight = objs.eq(index).offset().top - $(window).height()/2 - diffHeight;
					if (topHeight > $(window).scrollTop() && objs.eq(index).offset().top > $(window).scrollTop() + $(window).height() ) {
						objs.eq(index).css('visibility', 'hidden');
						if (scroll[topHeight]) {
							scroll[topHeight].push(obj);
						} else {
							scroll[topHeight] = [obj];
						}
					} else {
						objs.eq(index).addClass('animated ' + k);
					}
				});
			}
		} else {
			console.log(k);
			console.log(animateDefault);
		}
	}
	$(window).scroll(function() {
		for (var sc in scroll) {
			if ($(this).scrollTop() >= sc) {
				var objs = scroll[sc];
				for (var ob in objs) {
					objs[ob].obj.css('visibility', 'visible');
					objs[ob].obj.addClass('animated ' + objs[ob].effect);
				}
			}
		}
	});
}