

$('#slcBuild').on('change', function(){
	build = 	$(this).val()
	initParts()
})


var parts = {'body': 0, 'cap': 0, 'neck' : 0 , 'head' : 0}

$('#divPreview').on('click', function(e){
	var x = e.offsetX;
	$l(x)
	if(x < 250){
		setPart('body')
	} else if (x > 250 && x < 450) {
		setPart('cap')
	} else if (x > 450 && x < 900) {
		setPart('neck');
	} else {
		setPart('head')
	}
})

function setPart(which){
	parts[which]++
	var img   = document.getElementById('img-' + which)
	var src   =  $PATH + build + "/" + which + "/" + parts[which] + ".png"
	$l(src)
	img.src = src
	img.onerror = function(){
		parts[which] = 0
		this.src = $PATH + build + "/" + which + ".png"
	}
}

function initParts(){
	parts = {'body': 0, 'cap': 0, 'neck' : 0 , 'head' : 0}
	$l('switch to ' + build)
	$.each(['body', 'cap', 'neck', 'hw', 'head'], function(){
		var src = $PATH + build + "/" + this + ".png"
		document.getElementById('img-' + this).src = src
	})
}
var build = 'manta'

// $(function(){
// 	$l('fucking load' + build)
//   $('#slcBuild').val(build)
//   initParts()	
// })
