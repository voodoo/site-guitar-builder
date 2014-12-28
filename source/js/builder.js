$(function(){

  var $l = console.log.bind(console);

  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  // Set global build var  
  function setBuild(build){
    $BUILD = build.toLowerCase()
  }

  // From url
  function initForm(){
    var f = document.forms.frmBuilder
    $.each(params, function(k,v){
      if(f[k])
        f[k].value = v
    })  
  }
  // Filter each parts part (diff necks, body etc)
  function setPart(which){
    parts[which]++
    var img   = document.getElementById('img-' + which)
    var src   =  $PATH + $BUILD + "/" + which + "/" + parts[which] + ".png"
    
        img.src = src
    
    img.onerror = function(){
      parts[which] = 0
      this.src = $PATH + $BUILD + "/" + which + ".png"
    }
  }


  // Handle clicks on build imgs

  $('#divPreview').on('click', function(e){
    var x = e.offsetX;
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

  // REinit parts for build
  function initParts(){
    
    if($BUILD == 'other'){
      $('#divPreview').hide()
      return
    } else {
      $('#divPreview').show()
    }
    
    parts = {'body': 0, 'cap': 0, 'neck' : 0 , 'head' : 0}

    $.each(['body', 'cap', 'neck', 'hw', 'head'], function(){
      var src = $PATH + $BUILD.toLowerCase() + "/" + this + ".png"
      document.getElementById('img-' + this).src = src
    })
  }

  // Bind OTHER form values to preview
  function updatePreview(){
    var h = $('#frmBuilder').serializeHash()
    $.each(h,function(k,v){
      if(v === 'OTHER'){
       var n = $('#' + k + '-other-value')
       $('#value-' + k).html(n.val()) 
      } else {$('#value-' + k).html(v)}
        
    })   
  }

  // // Other value handler
  // $('.radio input').on('change', function(){
  //   var otherValue = $(this).parents('.col-sm-2').find('.other-value')
  //   if($(this).val() === 'OTHER') {    
  //     otherValue.show()   
  //   } else {
  //     //$l(otherValue)
  //     otherValue.hide() 
  //   } 
  //   updatePreview()
  // })  

  function setBookmarklet(){
    var serial = $("#frmBuilder").serialize()
    // TODO: Optimize
    // var h = $("#frmBuilder").serializeHash()
    // var hc = {}
    // $.each(h, function(k,v){
    //   if(v != '') hc[k] = v
    // })
    // $l(hc.serialize())
    //var serial = $("#frmBuilder").serialize()
    //$l(serial.length)
    $('.aBookmarklet').attr('href', "?" + serial)
  }

  // Form changes
  $('#frmBuilder input').on('change', function(t){
    var name = $(this).attr('name')
    var val  = $(this).val()
    if( name == 'body_shape'){
      setBuild(val)
      initParts()
    }

    setBookmarklet()
  })

  // Scrolling

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 50
        }, 1000);
        return false;
      }
    }
  })
   
  function setLocalSrcPath(){
    var src    = $('#divPreview img').attr('src')
    var path   = 'shark/builds/'
    var end    = src.indexOf(path) + path.length

    return src.substring(0, end) //Where are images when deployed to GH    
  }

  var params = $.getQueryParameters()


  var parts  = {'body': 0, 'cap': 0, 'neck' : 0 , 'head' : 0}

  var src    = $('#divPreview img').attr('src')

  var end    = src.indexOf('shark/builds/') + 'shark/builds/'.length

  setBuild(params["body_shape"] || 'Manta')

  $PATH      = setLocalSrcPath() //Where are images when deployed to GH

  initParts()

  initForm()


})

