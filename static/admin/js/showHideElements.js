//////////////////////////////////////////////////////////////////////////////////////////////////////
//Скрытие и показ значков
//////////////////////////////////////////////////////////////////////////////////////////////////////

function showNamesOfKlapan(){
	var svgobject = document.getElementById('nor');
	var svgdom = svgobject.contentDocument;
	var names=svgdom.getElementById('names_of_devices');
	
	if (names.getAttribute('display')=='none'){
		
		names.setAttribute('display', 'block');
	}else{
		
		names.setAttribute('display', 'none');
	}
	
}
function showHideKylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       if($(SVG.getElementsByClassName('kylt')).css('display')=='none'){
       		$(SVG.getElementsByClassName('kylt')).css('display','inline')
       }else{
       		$(SVG.getElementsByClassName('kylt')).css('display','none')
       }
       
}

/*
function show_kylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('kylt')).show();
}
function hide_kylt(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('kylt')).hide();
}
*/
function showHideCurrent(){
       var SVG = document.getElementById("nor").getSVGDocument();
       if($(SVG.getElementsByClassName('current')).css('display')=='none'){
       		$(SVG.getElementsByClassName('current')).css('display','inline')
       }else{
       		$(SVG.getElementsByClassName('current')).css('display','none')
       }
       
}
/*function hide_current(){
       var SVG = document.getElementById("nor").getSVGDocument();
       $(SVG.getElementsByClassName('current')).hide();
       
       console.log($(SVG.getElementsByClassName('current')).css('display'));
}
*/
function adres_datchik(object){
        console.log('huy');
      return "huy";
}