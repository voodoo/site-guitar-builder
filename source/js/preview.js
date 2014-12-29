$(function(){
  // show hide overlay of scale
  $('#aGuide').on('click', function(){
    $('#img-scale').toggle()
  })

  // Handle clicks on build imgs
  $('#divPreview').on('click', function(e){
    var x = e.offsetX;
    if(x < 250){
      setNextWoodFor('body')
    } else if (x > 250 && x < 450) {
      setNextWoodFor('cap')
    } else if (x > 450 && x < 900) {
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
    if(nxt &&  nxt.attr('id').indexOf('other') == -1){
      nxt.click()
    } else{
      // Check the first one
      $($(label).find('input[type=radio]')[0]).click()
    }
  }


})
