/* リセットボタン */
var var_start = 0
var var_end = 0
function allcheckoff() {
	var ElementsCount = document.codeview.elements.length;
	for (i = 0; i < ElementsCount; i++) {
		document.codeview.elements[i].checked = false;
	}
	var_start = 0
	var_end = 0
	$('.varvalue').each(function (i, elem) {
		document.getElementById(elem.id).style.display = 'block';
	});
}

/* ラジオボタン操作 */
function changefilterstart(elem) {

	/* 二度押しで解除 */
	if (var_start ==  Number(elem.id)) {
		elem.checked=false
		var_start = 0
	}
	else {
		var_start = Number(elem.id)
	}
	filterli()

}

function changefilterend(elem) {
	if (var_end ==  Number(elem.id)) {
		elem.checked=false
		var_end = 0
	}
	else {
		var_end = Number(elem.id)
	}
	filterli()
}

/* それぞれのボタンを表示するかのフィルタ処理 */
function filterli() {
	console.log(var_start)
	console.log(var_end);
	$('.varvalue').each(function (i, elem) {
		if (var_end == 0) {
			if (elem.id < var_start) {
				document.getElementById(elem.id).style.display = 'none';
			} else {
				document.getElementById(elem.id).style.display = 'block';
			}
		} else {
			if (elem.id < var_start | elem.id > var_end) {
				document.getElementById(elem.id).style.display = 'none';
			} else {
				document.getElementById(elem.id).style.display = 'block';
			}
		}
	});
}

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

