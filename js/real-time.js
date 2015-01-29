$(function(){


 	 // Firebase ----------------------------------

	 var imgRef   = new Firebase("https://git-builder-public.firebaseio.com/real-time");

   imgRef.unauth();
   // if(!imgRef.getAuth()){
   //  imgRef.authAnonymously(function(error, authData) {
   //    if (error) {
   //      console.log("Login Failed!", error);
   //    } else {
   //      console.log("Authenticated successfully with payload:", authData);
   //    }
   //  });    
   // }



	 var $current = null
	 imgRef.on("value", function(snapshot) {
	 	$current = snapshot.val().currents
	 	updateParts()
	 	updateBuild()
	 	updateUI()
	}, function (errorObject) {
	  console.error("The read failed: " + errorObject.code);
	});

	// Update the dynamic image parts
  function updateParts(){
  	for(var part in Part){
  		//$l(part, $current[part].current)
  		$('#img-' + part).attr('src', '../img/builds/' + Build[$current.build.current] + '/' + part + '/' + Part[part][$current[part].current] + '.png')
  	}
  }

  // make the Build button active
  function updateBuild(){
  	$('.btn-group.btn-builds label').removeClass('active')
  	$($('.btn-group.btn-builds label')[$current.build.current]).addClass('active')
  }

	// Update the ui 
  function updateUI(){
  	for(var part in Part){
  		//$l(part, $current[part].current)
  		$('#' + part + "-wood").html((Part[part][$current[part].current]).titleize('_'))
  	}
  }

  // Find location of clicks  - see which item to toggle thru
  $('#divPreview').on('click', function(e){
    var pos = fuckingBrowsersSTILLFuckingSuckAtPosition(e, $(this))
    var x = pos.x
    if(x < 200){
      setNextWoodFor('body')
    } else if (x > 200 && x < 400) {
      setNextWoodFor('cap')
    } else if (x > 400 && x < 750) {
      setNextWoodFor('neck');
    } else {
      setNextWoodFor('head')
    }
  })



  // Update the wood part
  function setNextWoodFor(part){
  	var iCurrent = $current[part]["current"]
  	var iNext    = iCurrent + 1
  	if(typeof Part[part][iNext] == 'undefined') iNext = 0
  	imgRef.child('currents/' + part).update({current: iNext}) 	
  }


  // Update which build
	$('.btn-builds').on('click', function(e){ // TODO: un-ugly
		var v = $(e.target).find('input').val()
		imgRef.child('currents/build').update({current: v}) 	
		
	})

	// Resets the db. Only exposed to dev tools
	function resetParts(){ // TODO: had to use deep hash, why?
    imgRef.set({
    		currents: {
    			body:  {current: 0}, 
    			cap:   {current: 0}, 
    			neck:  {current: 0}, 
    			head:  {current: 0},
    			hw:    {current: 0},
    			build: {current: 0}
    		}
    	})
	}

	// Various parts for each part - we will cycle through them
	var Part = {
		body:  	["walnut", "alder", 		"mahogany", "swamp_ash"],
		cap:  	["walnut", "maple", 		"spalted_maple", 	"birdseye_maple", 	"figured_maple", "figured_walnut", "paduk", "koa"],
		neck:  	["walnut", "rosewood", 	"ebony", 					"birdseye_maple"],
		head:  	["walnut", "maple", 		"spalted_maple", 	"birdseye_maple", "none"],
		hw:  	  ["chrome"],
	}

	var Build = ["manta", "shark", "modern_shark"]

	$('#aReset').on('click', function(){
		resetParts()
	})	

	// Hide dev tools
	if(location.host.indexOf('localhost') == -1) { 
		$('#divTools').hide()
	}

})


;
