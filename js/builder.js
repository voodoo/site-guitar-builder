$(function(){

  function uiUpdate(which, wood){
    $('#uiUpdate').html("<b>" + which.titleize('_') + "</b> changed to <b>" + wood.titleize('_') + "</b")
    setTimeout(function(){
      if($('#uiUpdate').html() != ''){
        $('#uiUpdate').html('')
      }
    },3000)
  }

  // Form changes
  $('#frmBuilder input').on('click', function(t){
    //log('frmBuilder input clicked = ' + $(this).val())
    
    var name = $(this).attr('name')
    var val  = $(this).val()

    if( name == 'body_shape'){
      //Change the BUILD
      setBuild(val)
      initWoodParts()
    }
    setBookmarklet()

    var which = $(this).parents('.form-group').data('wood')
    if(which){ // Wood needs changing?
      var wood = $(this).val().toLowerCase().replace(/\s/g, '_')
      var img   = document.getElementById('img-' + which)
      var src   =  $PATH + $BUILD + "/" + which + "/" + wood + ".png"  
      img.src   = src    
      //$('#aWood').attr('href', src).text(wood + " changed to " + which)
      uiUpdate(which, wood)
      img.onerror = function(){
        //console.warn(this.src + " NOT FOUND")
        this.src = $PATH + "blank.png"
      }
    }
  })

  function setBookmarklet(){
    var serial = $("#frmBuilder").serialize()
     $('.aBookmarklet').attr('href', "?" + serial)
  }

  // use relative paths
  function setLocalSrcPath(){
    var src    = $('#divPreview img').attr('src')
    var path   = 'img/builds/'
    var end    = src.indexOf(path) + path.length

    return src.substring(0, end) //Where are images when deployed to GH    
  }


  // Set global build var  
  function setBuild(build){
    $BUILD = build.toLowerCase()
  }

  // From url
  function initForm(){
    log('init form')
    var f = document.forms.frmBuilder
    $.each(params, function(k,v){
      if(f[k]){
        //$l(k,v)
        //$l(f[k].value)
        //f[k].value = v
        f[k].value = v
        $(f[k]).trigger('change')
      }
        
    })  
  }

  // REinit parts for build
  function initWoodParts(){
    log('wood parts')
    
    if($BUILD == 'other'){
      $('#divPreviewContainer').hide()
      return
    } else {
      $('#divPreviewContainer').show()
    }

    $.each(['body', 'cap', 'neck', 'hw', 'head'], function(){
      var label = $(".form-group[data-wood='" + this + "']")
      //$l($(label).find('input[type=radio]')[0])
      $($(label).find('input[type=radio]:checked')).trigger('click')
    })
  }



  var params = $.getQueryParameters()

  setBuild(params["body_shape"] || 'Manta')

  $PATH   = setLocalSrcPath() //Where are images when deployed to GH


  


  initForm() 
  initWoodParts()

  $('#uiUpdate').hide()

  setTimeout(function(){
    $('#uiUpdate').show()
  },2000)

  // if(params["body_shape"]){
  //   setTimeout(initWoodParts, 1000)
  // } else {
    
  //   initWoodParts()
  // }
   

})



  // // Bind OTHER form values to preview
  // function updatePreview(){
  //   var h = $('#frmBuilder').serializeHash()
  //   $.each(h,function(k,v){
  //     if(v === 'OTHER'){
  //      var n = $('#' + k + '-other-value')
  //      $('#value-' + k).html(n.val()) 
  //     } else {$('#value-' + k).html(v)}
        
  //   })   
  // }

  // // // Other value handler
  // // $('.radio input').on('change', function(){
  // //   var otherValue = $(this).parents('.col-sm-2').find('.other-value')
  // //   if($(this).val() === 'OTHER') {    
  // //     otherValue.show()   
  // //   } else {
  // //     //$l(otherValue)
  // //     otherValue.hide() 
  // //   } 
  // //   updatePreview()
  // // }) 
;
