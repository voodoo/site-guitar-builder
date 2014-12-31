$(function(){
  // show/hide overlay of scale
  $('#aGuide').on('click', function(){
    $('#img-scale').toggle()
  })

  // Handle clicks on build imgs
  $('#divPreview').on('click', function(e){
    var x = e.offsetX;
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

  $('.layer .piece').on('mouseover', function(){
    $(this).css('opacity', '.1')
  })
  $('.layer .piece').on('mouseout', function(){
    $(this).css('opacity', '0')
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
    if(nxt.length != 0 &&  $(nxt).attr('name').indexOf('other') == -1){
      nxt.click()
    } else{
      // Check the first one
      $($(label).find('input[type=radio]')[0]).click()
    }
  }


})
