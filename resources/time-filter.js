/* 起動時 */
$(document).ready(function () {
	filterli()
});
setInterval(filterli, 1000);

/*リロード・リセット時にボタンの状態を正しい状態にする */
function checkbutton() {
	var ElementsCount = document.codeview.elements.length;
	for (i = 0; i < ElementsCount; i++) {
		if (localStorage.var_start == 0 && localStorage.var_end == 0) {
			document.codeview.elements[i].checked = false
		}
		else {
			if (document.codeview.elements[i].name == "start") {
				if (document.codeview.elements[i].id == localStorage.var_start) {
					document.codeview.elements[i].checked = true
				} else {
					document.codeview.elements[i].checked = false
				}
			} else {
				if (document.codeview.elements[i].id == localStorage.var_end) {
					document.codeview.elements[i].checked = true
				} else {
					document.codeview.elements[i].checked = false
				}
			}
		}

	}
}
/* リセットボタン */

function allcheckoff() {
	var ElementsCount = document.codeview.elements.length;
	for (i = 0; i < ElementsCount; i++) {
		document.codeview.elements[i].checked = false;
	}

	localStorage.var_start = 0
	localStorage.var_end = 0

	$('.varvalue').each(function (i, elem) {
		document.getElementById(elem.id).style.display = 'block';
	});
}


/* ラジオボタン操作 */
function changefilterstart(elem) {

	/* 二度押しで解除 */
	if (localStorage.var_start == Number(elem.id)) {
		elem.checked = false
		localStorage.var_start = 0
	}
	else {

		localStorage.var_start = Number(elem.id)
	}
	filterli()

}

function changefilterend(elem) {
	if (localStorage.var_end == Number(elem.id)) {
		elem.checked = false
		localStorage.var_end = 0
	}
	else {
		localStorage.var_end = Number(elem.id)
	}
	filterli()
}

/* それぞれのボタンを表示するかのフィルタ処理 */
function filterli() {
	$('.menu__single').each(function (i, elem) {
		elem.className="menu__single__notshow"
	});

	$('.varvalue').each(function (i, elem) {
		if (localStorage.var_end == 0) {
			if (Number(elem.id) < Number(localStorage.var_start)) {
				document.getElementById(elem.id).style.display = 'none';
			} else {
				document.getElementById(elem.id).style.display = 'block';
				target=elem.parentNode.parentNode;
				target.className="menu__single";
			}
		} else {
			if (Number(elem.id) < Number(localStorage.var_start) | Number(elem.id) > Number(localStorage.var_end)) {
				document.getElementById(elem.id).style.display = 'none';
			} else {
				document.getElementById(elem.id).style.display = 'block';
				target=elem.parentNode.parentNode;
				target.className="menu__single";
			}
		}
	});

	filterparentli()
	checkbutton()
}


function filterparentli() {
	$('.var').each(function (i, elem) {	
		if(elem.parentNode.className == 'menu__single'){
			$(elem).css('background', 'black');
			$(elem).css('color', 'white');
		}else{
			$(elem).css('background', 'white');
			$(elem).css('color', 'black');	
		}
	});
}






/* TODO チェックを外せるラジオボタン*/
/*https://norando.net/radio-cancel/*/
function changebutton() {
	var nowchecked = [];
	$('input[type="radio"]:checked').each(function () {
		nowchecked.push($(this).attr('id'));
	});

	$('input[type="radio"]').click(function () {
		var idx = $.inArray($(this).attr('id'), nowchecked); // nowcheckedにクリックされたボタンのidが含まれるか判定。なければ-1が返る。
		if (idx >= 0) { // クリックしたボタンにチェックが入っていた場合
			$(this).prop('checked', false); // チェックを外す
			nowchecked.splice(idx, 1); // nowcheckedからこのボタンのidを削除
		} else { // チェックが入っていなかった場合
			// 同じname属性のラジオボタンをnowcheckedから削除する
			var name = $(this).attr('name');
			$('input[name="' + name + '"]').each(function () {
				var idx2 = $.inArray($(this).attr('id'), nowchecked);
				if (idx2 >= 0) {
					nowchecked.splice(idx2, 1);
				}
			});
			// チェックしたものをnowcheckedに追加
			nowchecked.push($(this).attr('id'));
		}
	});
}

