function showmenu() {
    hidemenu();
    header_menu.hide_button(archiv_close);
    header_menu.show_button(archiv_open);
     var pos = $('#archiv_SVG').offset();
     var pos2=$('#archiv_SVG').width()
     //var pos = element.getBBox();
     console.log(pos);
     console.log(pos2);
     console.log(pos.left);
     if(pos.left >20){
     $('.visible').removeClass('visible').addClass('hiden');

     $(".hiden").css("left",""+pos.left+"px");
     $(".hiden").css("top",""+(pos.top+15)+"px");
     //$(".hiden").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");

     $(".visible").css("left",""+pos.left+"px");
     $(".visible").css("top",""+(pos.top+15)+"px");
     //$(".visible").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");
    }

    if(pos.left <20){
     $('.visible').removeClass('visible').addClass('hiden');

     $(".hiden").css("left",""+(pos2)+"px");
     $(".hiden").css("top",""+(pos.top-10)+"px");
     //$(".hiden").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");

     $(".visible").css("left",""+(pos2)+"px");
     $(".visible").css("top",""+(pos.top-10)+"px");
     //$(".visible").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");
    }

    $('#archiv').removeClass('hiden').addClass('visible');


    }
//Показать второе меню для верхней консоли
    function showmenu1() {
    hidemenu();
     header_menu.hide_button(servise_close);
     header_menu.show_button(servise_open);
     var pos = $('#servise_SVG').offset();
     var pos2=$('#servise_SVG').width()
     console.log(pos);
     console.log(pos.left);
     if(pos.left >20){
     $('.visible').removeClass('visible').addClass('hiden');

     $(".hiden").css("left",""+pos.left+"px");
     $(".hiden").css("top",""+(pos.top+15)+"px");
     //$(".hiden").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");

     $(".visible").css("left",""+pos.left+"px");
     $(".visible").css("top",""+(pos.top+15)+"px");
     //$(".visible").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");
    }

    if(pos.left <20){
     $('.visible').removeClass('visible').addClass('hiden');

     $(".hiden").css("left",""+(pos2)+"px");
     $(".hiden").css("top",""+(pos.top - 10)+"px");
     //$(".hiden").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");

     $(".visible").css("left",""+(pos2)+"px");
     $(".visible").css("top",""+(pos.top - 10)+"px");
     //$(".visible").css("width",""+(pos.width-2)+"px");
     $(".hiden").css("width","170px");
    }

    $('#servis').removeClass('hiden').addClass('visible');


    }
    function showmenu2(element, variant) {
    console.log(element);
     var pos = element.getBoundingClientRect();
     console.log(pos);
     console.log(pos.left);
     if (variant==1){
     $('#kulture').removeClass('visible').addClass('hiden');
      $("#configuration").css("left",""+(pos.left+173)+"px");
     $("#configuration").css("top",""+(pos.top+0)+"px");
    // $(".visible").css("width",""+(pos.width-2)+"px");
     //$(".hiden").css("width","170px");
    $('#configuration').removeClass('hiden').addClass('visible');
     }
    if (variant==2){
     $('#configuration').removeClass('visible').addClass('hiden');
      $("#kulture").css("left",""+(pos.left+173)+"px");
     $("#kulture").css("top",""+(pos.top+0)+"px");
    // $(".visible").css("width",""+(pos.width-2)+"px");
     //$(".hiden").css("width","170px");
    $('#kulture').removeClass('hiden').addClass('visible');
     }



    }

//скрыть менюшки
    function hidemenu() {
      header_menu.hide_button(archiv_open);
      header_menu.hide_button(servise_open);
      header_menu.show_button(archiv_close);
      header_menu.show_button(servise_close);


    if( $('.visible').length > 0){

    $('.visible').removeClass('visible').addClass('hiden');
    }
    else{
    }
    }

