/*
//var widget = document.getElementById('codeview');
//var radios = widget.querySelectorAll('input[type="radio"]');
//var checkedList = [];
//radios = document.codeview.elements;

var var_start=-1
var var_end=-1

var filter = function () {
    var ElementsCount = document.codeview.elements.length;
	for( i=0 ; i< ElementsCount ; i++ ) {
	    if (document.codeview.elements[i].checked) {
            if(input.class==filterstart){
	            console.log("filterstart")
	        }
	        else{
	        	console.log("filterend")
	        }
        }
    
	
	
	}
    
    Array.prototype.forEach.call(radios, function (input) {
        if (input.checked) {
            if(input.class==filterstart){
	            console.log("filterstart")
	        }
	        else{
	        	console.log("filterend")
	        }
        }
    });

    //widget.setAttribute('data-filter-view', checkedList.join(' '));
	console.log(aaa)
};

Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener('change', filter);
});
*/
//start�̃`�F�b�N�{�b�N�X������������ꂽ��

//���ׂĂ�li�^�O�ɑ΂��ăt�B���^�����s
/*
function getstartID(){
	$('li').filter('#filterstart').


	.css( "background-color", "red" )
}
*/

/* TODO チェックを外せるラジオボタン*/
/*https://norando.net/radio-cancel/*/
/*$(function () {
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
});
*/

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



function changefilterstart() {
	var ElementsCount = document.codeview.elements.length;
	for (i = 0; i < ElementsCount; i++) {
		if (document.codeview.elements[i].checked && document.codeview.elements[i].name == "start") {
			var_start = Number(document.codeview.elements[i].id)
			filterli()
		}
	}
}

function changefilterend() {
	var ElementsCount = document.codeview.elements.length;
	for (i = 0; i < ElementsCount; i++) {
		if (document.codeview.elements[i].checked && document.codeview.elements[i].name == "end") {
			var_end = Number(document.codeview.elements[i].id)
			filterli()
		}
	}
}

function filterli() {
	//console.log(elem.id.value)
	console.log(var_start)
	console.log(var_end);
	$('.varvalue').each(function (i, elem) {
		if (var_end == 0) {
			if (elem.id < var_start) {
				document.getElementById(elem.id).style.display = 'none';
				//	elem.hide()
			} else {
				document.getElementById(elem.id).style.display = 'block';
			}
		} else {
			if (elem.id < var_start | elem.id > var_end) {
				document.getElementById(elem.id).style.display = 'none';
				//elem.hide();
			} else {
				document.getElementById(elem.id).style.display = 'block';
			}
		}
	});
}