 $(function(){
	 var imgRef = new Firebase("https://brilliant-fire-1525.firebaseio.com/images");
	 var $images, $current = null
	 imgRef.on("value", function(snapshot) {
	 	$images  = snapshot.val().urls
	 	$current = snapshot.val().current
	 	setCurrent($current)
	  //console.log($images, $current);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	imgRef.on("child_changed", function(snapshot) {
	  var changed = snapshot.val();
	  setCurrent(changed)
	  console.log("child changed", changed);
	}); 

	$('img.rt').on('click', function(){
		var updated = null
		if(this.src.indexOf('manta') == -1){
			updated = 'manta'
		} else { updated = 'shark'}
		imgRef.update({current: updated})
	})

	function setCurrent(current){
		$('#imgGit').attr('src','../img/rt/' + current + '.png')
	}

 })

