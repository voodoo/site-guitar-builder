var $l = console.log.bind(console);


$(function(){
  
  setTimeout(function(){ // so we can update after garlic update
    $('.other-value').each(function(){
        if($(this).find('input').val() !== '')
          $(this).show()
    })  
    updatePreview()
  }, 1000)    

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

})

$('button[type="submit"]').on('click', function(e){
  e.preventDefault()
  switch(e.target.id){
    case 'btnSave':
      break;
      //nada
    case 'btnCopy':
      var json = JSON.stringify($('#frmBuilder').serializeHash())
      prompt("Copy this to the clipboard",json)
      break
    case 'btnSend':
      var n = "\n\n"
      var body = encodeURIComponent(n + $('#fsPreview').text())
      var mailto="mailto:build@sharktailguitars.com?subject=Custom build&body=" +
                 "Hello, here is my custom config, make it so!"
      document.location = mailto + body

  }
   
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
  var otherValue = $(this).parents('.col-sm-2').find('.other-value')
  if($(this).val() === 'OTHER') {    
    otherValue.show()   
  } else {
    //$l(otherValue)
    otherValue.hide() 
  } 
  updatePreview()
})  

$('#neck').on('activate.bs.scrollspy', function () {
  console.log('neck')
  // do something…
})
