/*
var widget = document.getElementById('js-filter');
var checkboxes = widget.querySelectorAll('.filter-cond input[type="checkbox"]');
var checkedList = [];
var filter = function () {
    checkedList = [];

    Array.prototype.forEach.call(checkboxes, function (input) {
        if (input.checked) {
            checkedList.push(input.value);
        }
    });

    widget.setAttribute('data-filter-view', checkedList.join(' '));
};

Array.prototype.forEach.call(checkboxes, function (checkbox) {
    checkbox.addEventListener('change', filter);
});
*/

function allcheckoff() {
	var ElementsCount = document.codeview.elements.length; 
	for( i=0 ; i < ElementsCount ; i++ ) {
		document.codeview.elements[i].checked = false; // ON・OFFを切り替え
	}
}