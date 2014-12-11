 var $l = console.log.bind(console);
  // $('input.other').on('click', function(){
  //   var otherValue = $(this).parents('.radio').find('.other-value')
  //   otherValue.show()
  // })
  $(function(){
    setTimeout(function(){ // so we can update after garlic update
      $('.other-value').each(function(){
          if($(this).find('input').val() !== '')
            $(this).show()
      })  
      updatePreview()
    }, 1000)    
  })

  $('#frmBuilder').on('submit', function(e){
    e.preventDefault()
    // var s    = $(this).serialize()
    // var h    = $(this).serializeHash()
    // $l(h)
    // return
    var body = encodeURIComponent("\n\n" + $('#fsPreview').text())
    var mailto="mailto:build@sharktailguitars.com?subject=Custom build&body=" +
               "Hello, here is my custom config, make it so!"
    document.location = mailto + body    
    //console.log($(this).serialize())
  })    
  function updatePreview(){
    var h = $('#frmBuilder').serializeHash()
    $.each(h,function(k,v){
      if(v === 'OTHER'){
       var n = $('#' + k + '-other-value')
       $('#value-' + k).html(n.val()) 
      } else {$('#value-' + k).html(v)}
        
    })   
  }
  $('.radio input').on('change', function(){
    var otherValue = $(this).parents('.radio').find('.other-value')
    if($(this).val() === 'OTHER') {    
      otherValue.show()   
    } else {
      $l('hide' + otherValue)
      otherValue.hide() 
    } 
    updatePreview()
  })  
 