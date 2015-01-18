$(function(){

  // show/hide overlay of scale
  $('#aGuide').on('click', function(){
    $('#img-scale').toggle()
  })
  // show/hide overlay of scale
  $('#aJSON').on('click', function(){
    $('#img-scale').toggle()
  })  

  // Find location of clicks  - see which item to toggle thru
  $('#divPreview').on('click', function(e){
    var pos = fuckingBrowsersSTILLFuckingSuckAtPosition(e, $(this))
    var x = pos.x
    if(x < 250){
      setNextWoodFor('body')
    } else if (x > 250 && x < 550) {
      setNextWoodFor('cap')
    } else if (x > 500 && x < 750) {
      setNextWoodFor('neck');
    } else {
      setNextWoodFor('head')
    }
  })

  // When Preview is checked
  function setNextWoodFor(part){
    // Find this part that is being changed
    var label = $(".form-group[data-wood='" + part + "']")
    // Get the checked radio - so we can use next
    var rdo   = $(label).find('input[type=radio]:checked').parents('.radio')
    // Have the .radio - now get the input
    var nxt   = rdo.next().find('input')
    // If the next radio is not 'other'
    if(nxt.length && typeof($(nxt).attr('class')) == 'undefined'){
      nxt.click()
    } else{
      // Check the first one
      $($(label).find('input[type=radio]')[0]).click()
    }
  }


  $.notify.defaults({ className: "success", globalPosition: "bottom right", autoHideDelay: 8000})

  function uiUpdate(which, wood, error){
    var sError = error ? '<span style="color:firebrick">[ERROR]</span> ' : ''
    var path   = $PATH + $BUILD + "/" + which + "/" + wood + ".png"  
    //var html   = "<a data-notify-html='link' class='link' href='" + path + "'>" + sError + "<b>" + which.titleize('_') + "</b> changed to <b>" + wood.titleize('_') + "</b</a>"
    var s = [sError,which.titleize('_'),"changed to",wood.titleize('_')].join(' ')
    $.notify(s, "success", {position: "bottom right"})

    //$('#uiUpdate').html(html)
    // setTimeout(function(){
    //   if($('#uiUpdate').html() != ''){
    //     $('#uiUpdate').html('')
    //   }
    // },3000)
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
      var wood = $(this).val().toName()
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
            //uiUpdate(which , wood, 1)
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

    var serial = $('#frmBuilder').find(":input").filter(function () {
            return $.trim(this.value).length > 0
    }).serialize()

    $('.aBookmarklet').attr('href', "?" + serial)
    //setTitle()
    var h = $("#frmBuilder").serializeHash()
    $('#jsonContainer').html(JSON.stringify(h).split(/,/g).join('<br/>'))
  }

  function setTitle(){
    var t = $('#h1Title').html().trim()
    if(!/^Design/.test(t)){
      $('.aBookmarklet').text(t)
    }
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
    $BUILD = build.toLowerCase().replace(/\s/g,'_').replace(/\+/g, '_')
  }

  // From url
  function initForm(){
    log('init form')
    var f = document.forms.frmBuilder
    $.each(params, function(k,v){
      if(f[k]){        
        f[k].value = decodeURIComponent(v).replace(/\+/g, ' ')
      }        
    }) 
    // if other is selected make it  active
    $.each($('.input-other-value'), function(){
      if(this.value != ''){
        $(this).parent('.other-value').show()
      }
    })

    // Update the editable title
    if(params["title"]){
      $('#h1Title').text(decodeURIComponent(params["title"]).replace(/\+/g, ' '))
    }
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


  if($('#divPreview img').length){
    var params = $.getQueryParameters()

    setBuild(params["body_shape"] || 'Manta')

    $PATH   = setLocalSrcPath() //Where are images when deployed to GH

    initForm() 
    initWoodParts()

    $('#uiUpdate').hide()

    setTimeout(function(){
      $('#uiUpdate').show()
    },2000)    
  }


})

;
