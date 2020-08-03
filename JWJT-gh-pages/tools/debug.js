//debug tools: marking function
var marklabel = 0;
function mark(q){

	S = '<div id = "mark' + marklabel + '" style = "' +
	'position: absolute; width: 4px; height: 4px; background-color: #fff;' +
	'left: -2px;' +
	'bottom: -2px;' +
	'">' + marklabel + '</div>';

	$('#W').append(S);
	var elem = $('#mark' + marklabel);

	elem.css({
		'-webkit-transform' : 'translate('
		+ q[0] + 'px, '
		+ (-q[1]) + 'px)',

		'-moz-transform' : 'translate('
		+ q[0] + 'px, '
		+ (-q[1]) + 'px)'

	});
	marklabel++;
}
