
function addOption() {
	var select = document.getElementById('sample')
	var option = document.createElement('option')
	option.value = "123456"
	//画面に表示されるテキスト部分は createTextNode で作って、optionの子要素として追加
	option.appendChild(document.createTextNode('表示用文字列'))
	//プルダウンに追加
	select.appendChild(option)
}


function TextChange(id, text){
   if(document.all){
	document.all(id).innerHTML = text;
   }else if(document.getElementById){
	document.getElementById(id).innerHTML = text;
   }
}
