//prohibit('news');
function prohibit(page) {
//	$(function() {
//		$('a').click(function(e) {
//			var href = $(this).attr('href');
//			var prefix = new RegExp('^.+\/', 'g');
//			href = href.replace(prefix, '');
//			href = href.replace(/.html/, '');
//			if (page === href || page === href + '_detail') {
//				alert('Coming Soon');
//				return false;
//			}
//		});
//	});
	var a = document.getElementsByTagName('a');
	for (var k in a) {
		a[k].onclick = function() {
			var href = this.getAttribute('href');
			var prefix = new RegExp('^.+\/', 'g');
			href = href.replace(prefix, '');
			href = href.replace('/', '');
			href = href.replace(/.html/, '');
			if (page === href || page === href + '_detail') {
				alert('Coming Soon');
				return false;
			}
		};
	}
}