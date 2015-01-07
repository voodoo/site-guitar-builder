function fuckingBrowsersSTILLFuckingSuckAtPosition(e, parent){
	var pos = {}
	if(e.offsetX==undefined) { 
		pos.x = e.pageX-parent.offset().left; 
		pos.y = e.pageY-parent.offset().top; }	
	else { pos.x = e.offsetX; pos.y = e.offsetY; }
	return pos	
}