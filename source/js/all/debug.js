function log(){
	$.each(arguments, function(){
		$('#logContainer').prepend(this + "<br/>")
	})
}


$(function(){
	$('#aLog').on('click', function(){
		$('#logContainer').toggle()
	})
})

$(function(){
	$('#aJson').on('click', function(){
		$('#jsonContainer').toggle()
	})
})