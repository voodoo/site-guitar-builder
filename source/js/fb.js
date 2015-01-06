 $(function(){
 	
 	 // Firebase ----------------------------------

	 var imgRef = new Firebase("https://brilliant-fire-1525.firebaseio.com/images");
	 var $caps, $current = null
	 imgRef.on("value", function(snapshot) {
	 	$caps    = snapshot.val().caps
	 	$current = snapshot.val().current
	 	setCurrent()
	  //console.log($images, $current);
	}, function (errorObject) {
	  console.error("The read failed: " + errorObject.code);
	});

	imgRef.on("child_changed", function(snapshot) {
	  $current = snapshot.val();
	  setCurrent()
	  console.log("current changed", $current);
	}); 

	imgRef.on("child_added", function(snapshot) {
	  var newIp = snapshot.val();
	  console.log("IPs: " + JSON.stringify(newIp));
	});	


  // LOCAL ----------------------------------

	function setCurrent(){
		$('#img-cap').attr('src','../img/builds/manta/cap/' + $caps[$current] + '.png')
	}

	function nextCurrent(){
		var c = $current += 1
		if($caps[c]) imgRef.update({current: c})		
		  else imgRef.update({current: 0}) // start over	
		//imgRef.push({ip: $ip})
	}

  // EVENTS ----------------------------------

	$('#divPreview').on('click', function(){
		$l('click preview')
		//setCurrent()
		nextCurrent()
	})	

	$('#aReset').on('click', function(){
    var imgCaps = ["Maple", "Spalted maple", "Birdseye maple", "Figured maple", "Walnut"]
    var aCaps   = _.map(imgCaps, function(s){return s.toName()})
    imgRef.set({caps: aCaps, current: 0})
	})

	// Hide dev tools
	
	if(location.host.indexOf('localhost') == -1) {
		$('#divTools').hide()
	}

})


