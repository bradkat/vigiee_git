//power();
function power() {
	var str = "";
	var pwd = location.origin;
	pwd = 'vigiee2018';
	var nowDate = new Date();
//	while (str != pwd && parseInt(window.name) + 1000 * 2 * 2 < nowDate.getTime()) {
	while (str != pwd) {
		if (str === '') {
			str = prompt("パスワードを入力してください。");
		} else if (str === null) {
			window.opener=null;
			window.open('','_self');
			window.close();
		} else {
			str = prompt("パスワードが間違っています。");
		}
	}
	window.name = nowDate.getTime();
}