$(function(){

  function uiUpdate(which, wood, error){
    var sError = error ? '<span style="color:firebrick">[ERROR]</span> ' : ''
    var path   = $PATH + $BUILD + "/" + which + "/" + wood + ".png"  
    $('#uiUpdate').html("<a href='" + path + "'>" + sError + "<b>" + which.titleize('_') + "</b> changed to <b>" + wood.titleize('_') + "</b</a>")
    setTimeout(function(){
      if($('#uiUpdate').html() != ''){
        $('#uiUpdate').html('')
      }
    },3000)
  }



  // Form changes
  $('#frmBuilder input').on('change', function(t){
    //log('frmBuilder input clicked = ' + $(this).val())
    
    var name = $(this).attr('name')
    var val  = $(this).val()
    var isOther = (this.className.indexOf('other') != -1)

    if( name == 'body_shape'){
      //Change the BUILD
      setBuild(val)
      initWoodParts()
    }
    setBookmarklet()

    var which = $(this).parents('.form-group').data('wood')
    if(which && !isOther){ // Wood needs changing?
      var wood = $(this).val().toLowerCase().replace(/\s/g, '_')
        if(true){//wood != 'none'
        var img   = document.getElementById('img-' + which)
        if(wood == 'none'){
          var src   =  $PATH + "blank.png" 
        } else {
          var src   =  $PATH + $BUILD + "/" + which + "/" + wood + ".png"  
        }
        
        //try{img.src   = src} catch(e) {$l(e)}
        //$('#aWood').attr('href', src).text(wood + " changed to " + which)
        img.src      = src
        img.hadError = false
        img.onerror = function(){
          this.hadError = true
          //console.warn(this.src + " NOT FOUND")
          this.src = $PATH + "blank.png"
        }
        img.onload = function(){
          if(!this.hadError){
            uiUpdate(which, wood)
          } else {
            uiUpdate(which , wood, 1)
          }
        }        
      }
    }     

    // Show or hide other text field
    var divOtherValue = $(this).parents('.form-group').find('.other-value')
    if(isOther) {   

      divOtherValue.show()   

      $(divOtherValue).find('.other-value').select()

    } else {
      if(this.name.indexOf('other') == -1){
        divOtherValue.hide() 
        $(divOtherValue).find('.other-value').val('')
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
        f[k].value = decodeURIComponent(v).replace(/\+/g, ' ')
        //$(f[k]).trigger('change')
      }        
    }) 

    $.each($('.input-other-value'), function(){
      if(this.value != ''){
        $(this).parent('.other-value').show()
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
      $($(label).find('input[type=radio]:checked')).trigger('change')
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
