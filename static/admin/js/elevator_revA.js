var global_start_function=0;
var header_menu=0;
var сurrent_grafic=0; //график токов
var title_dsfvasdc;
var link_global_object;
var global_object_status={};
var global_object_status_analog={};
var global_object_status_kylt={};
var menu_header_text={};
var global_object_oll_kylt_from_server='';
var global_kylt_from_server_formated={};
var element_type_number={'konv':2,'klapan':3,'nor':1,'zadvijka':4,'silos':14,'dryer':16,'separator':17,'gate':18,'vent':6,'tube':7,'car':15,'enable':19,'zadvijkaGroup':23,'current':100,'kylt':101, 'analog_dat':102};//существующие типы элементов

//расстановка событий при полной загрузке окна
$(window).load(function () {

        ////////////////////////////////////////////////
        // Создать новый объект worker1
        var worker = new Worker('/static/admin/js/worker.js');
        // Получить сообщение от работника
        worker.onmessage = function (event) {
            var temp=event.data;
            for (let i in temp){
            global_object_status[i]=temp[i];
        }
        //console.log(global_object_status);
        change(event.data);
        };

        // Создать новый объект worker2
        var worker2 = new Worker('/static/admin/js/worker2.js');
        // Получить сообщение от работника
        worker2.onmessage = function (event) {
            linck(event.data);
        };

        // Создать новый объект worker3
        var worker3 = new Worker('/static/admin/js/worker3.js');
        // Получить сообщение от работника
        worker3.onmessage = function (event) {
        var temp=event.data;
            for (let i in temp){
            global_object_status_analog[i]=temp[i];
        }
        analog_status(event.data);
        };

        // Создать новый объект worker4
        var worker4 = new Worker('/static/admin/js/worker4.js');
        // Получить сообщение от работника
        worker4.onmessage = function (event) {
        var temp=event.data;
            for (let i in temp){
            global_object_status_kylt[i]=temp[i];
        }

        kylt_status(event.data);
        };

        //Объект верхнее меню
        header_menu = new Header_menu();





        ////////////////////////////////////////////////////////////////////
        //Запуск календарика и часиков
        //
        $( "#datepicker_message1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_message2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_rout1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_rout2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_device1" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_device2" ).datepicker({dateFormat: "yy.mm.dd"});
        $( "#datepicker_current").datepicker({dateFormat: "yy.mm.dd"});
        $( "#timepicker_current").timepicker({ 'timeFormat': 'H:i:s' });
            /////////////////////////////////////////////////////////////////////


            /////////////////////////////////////////////////////////////////////////////////
            //проверка размеров окна при загрузке
            if($( window ).width()<1400){
            $( "#header" ).removeClass( "gorizontal" ).addClass( "vertical" );
            $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_gorizont" ).addClass( "menu_button_typ1_vertical" );
            $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_gorizont" ).addClass( "menu_button_typ2_vertical" );
            }
            if($( window ).width()>1400){
                $( "#header" ).removeClass( "vertical" ).addClass( "gorizontal" );
                $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_vertical" ).addClass( "menu_button_typ1_gorizont" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_vertical" ).addClass( "menu_button_typ2_gorizontal" );


            }
            //Изменение меню при изменении размеров окна
            $( window ).resize(function() {

                if($( window ).width()<1400){
                $( "#header" ).removeClass( "gorizontal" ).addClass( "vertical" );
                 $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_gorizont" ).addClass( "menu_button_typ1_vertical" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_gorizont" ).addClass( "menu_button_typ2_vertical" );
                }

                if($( window ).width()>1400){
                $( "#header" ).removeClass( "vertical" ).addClass( "gorizontal" );
                $( ".menu_button_typ1" ).removeClass( "menu_button_typ1_vertical" ).addClass( "menu_button_typ1_gorizont" );
                $( ".menu_button_typ2" ).removeClass( "menu_button_typ2_vertical" ).addClass( "menu_button_typ2_gorizontal" );
                }}
            )
            ////////////////////////////////////////////////////////////////////////////////////

          //setInterval(function() { linck() }, 500);
          //setInterval(function() { change() }, 1000);
          setInterval(function() {worker.postMessage(global_object_status)}, 1000);//циклический вызов воркера для запроса состояния всех механизмов
          setInterval(function() {worker3.postMessage(global_object_status_analog)}, 1000);//циклический вызов воркера для запроса состояния аналоговых датчиков
          setInterval(function() {worker4.postMessage(global_object_status_kylt)}, 1000);//циклический вызов воркера для запроса состояния меток культуры
          setInterval(function() {worker2.postMessage(1)}, 1000); //циклический вызов воркера для запроса состояния линков
          
         // setInterval(function() { plc() }, 1000);


          //-------------------------------------------------------------------------------------


          //Функция перетаскивания------------------------------
          $( ".draggable" ).draggable({distance: 15});//
        //------------------------------------------------------

        //Функция зумирования
         initialize();

          //спрятать иконки
          hide_source_receiver();

           





          // Получаем доступ к SVG DOM
          $("body").on("contextmenu", false);
          var svgobject = document.getElementById('nor');
          if ('contentDocument' in svgobject){
               //Создание объекта с информацией
                var svgdom = svgobject.contentDocument;

                ///////////////////////////////////////////////////////////////////////
                //заполнение переменных
                title_dsfvasdc=svgdom.getElementsByClassName("title_very_dificult");
                link_global_object=$(svgdom.getElementsByClassName("line"));

                ////////////////////////////////////////////////////////////////////////
                //Расстановка собітий на єлементах
                //////////////////////////////////////////////////////////////////////
                for (let i in element_type_number){

                    if (i!='current'& i!='kylt'& i!='analog_dat'){
                        //Подсветка линий
                        $(svgdom.getElementsByClassName(""+i)).hover(
                            function () {
                            setTimeout($.proxy(function(){
                                 var element_name = ($(this).attr('class').split(' ')[1]);
                                 if (parseInt(element_name.match(/-*[0-9]+/)) in menu_header_text){
                                 let temp_text=menu_header_text[parseInt(element_name.match(/-*[0-9]+/))].longName;
                                    $(title_dsfvasdc).text(temp_text);
                                    }

                                $('.'+element_name+'select',svgdom).css({
                                    'stroke-width': '40px',
                                    'stroke':'black'
                                });
                            }, this), 0)},
                            function () {
                                setTimeout($.proxy(function( ){
                                    var element_name =($(this).attr('class').split(' ')[1]);
                                $('.'+element_name+'select',svgdom).css('stroke-width', '5px');
                                $(title_dsfvasdc).text('');
                                 }, this), 0)}
                        );

                        //Клик на устройствах
                       $(svgdom.getElementsByClassName(""+i)).on('click', function(e){
                            var element_name =($(this).attr('class').split(' ')[1]);
                            var elementIndex=parseInt(element_name.match(/-*[0-9]+/));
                            $("#Name_devise").text(elementIndex);
                            $("#footer_help").text(menu_header_text[elementIndex].longName);
                       });

                        //Диалог запуска устройства
                        $(svgdom.getElementsByClassName(""+i)).on('contextmenu', function(e){
                            console.log(($(this).attr('class').split(' ')))
                            var element_name =($(this).attr('class').split(' ')[1]);
                            var temp_string_name=element_name.match(/-*[a-z]+/i);
                            var elementIndex=parseInt(element_name.match(/-*[0-9]+/));
                            $("#Name_devise").text(elementIndex);
                            $("#footer_help").text(menu_header_text[elementIndex].longName);
                            menu_kreator(parseInt(element_name.match(/-*[0-9]+/)),temp_string_name);
                            return false;
                        });
                    }else{
                         $(svgdom.getElementsByClassName(""+i)).on('contextmenu', function(e){
                            var element_name =($(this).attr('class').split(' '));
                            
                            var temp_string_name=element_name[0].match(/[a-z]{1,}[_]{0,}[a-z]{0,}/);
                            console.log(temp_string_name);
                            menu_kreator(parseInt(element_name[1].match(/-*[0-9]+/)),temp_string_name);
                            return false;
                        });
                    }
                }
          };

                //Закрытие окошек меню
                $(svgdom.getElementsByTagName("svg")).on('click', function(e){                    
                    hidemenu();
                });

                //Get list of long and short names of oll dewases to use them in future
                get_name_for_oll_devaces();
                //Get kylt list from server to use them in future
                get_kylt_list();
                //Inicialization prevent defoult on some elements
                inicializePreventDefoult();


  })

function get_name_for_oll_devaces(){
        var url_string ='/name_list/';
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
                if(result!=404){
                menu_header_text=JSON.parse(result);
                console.log(menu_header_text);
                }
            }
            });
    }
function get_kylt_list(){
        var url_string ='/kylt_list/';
        var temp_kylt_list;
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
              console.log(result);
                if(result!=404){
                    temp_kylt_list=JSON.parse(result);
                    for (let i in temp_kylt_list) {
                      //Создать перечень культур для дальнейшего использования
                      console.log(temp_kylt_list[i].index);
                      console.log(temp_kylt_list[i].name_full);

                      global_kylt_from_server_formated[temp_kylt_list[i].index]=temp_kylt_list[i].name_full;
                      //Создать отформатированную строку для использования при выборе культуры
                      global_object_oll_kylt_from_server=global_object_oll_kylt_from_server+'<option value="'+(temp_kylt_list[i].index)+'" >'+temp_kylt_list[i].name_full+'</option>';
                    }

                    /*
                    for (var i = 0; i < temp_kylt_list.length; i++) {
                        global_object_oll_kylt_from_server=global_object_oll_kylt_from_server+'<option value="'+(i+1)+'" >'+temp_kylt_list[i]+'</option>';
                    }
                    */
                }
                console.log(global_kylt_from_server_formated);
                console.log(global_object_oll_kylt_from_server);
            }
        });
    }


//отображение меню для механизмов
     $( function() {
                 $( "#menu" ).dialog({
                      autoOpen: false,
                      resizable: false,
                      height: "auto",
                      width: "auto",
                      show: {
                        effect: "blind",
                        duration: 0
                      },
                      hide: {
                        effect: "blind",
                        duration: 0
                      },
                      close: function() {


                      },
                      open: function() {

                      }
                    });

     });

//Отображение меню датчиков
 /*    $( function() {
                 $( "#datchiki_kontrol" ).dialog({
                      autoOpen: false,
                      resizable: true,
                      height: "auto",
                      width: "auto",
                      show: {
                        effect: "blind",
                        duration: 200
                      },
                      hide: {
                        effect: "blind",
                        duration: 200
                      },
                      close: function() {
                      //закончить циклический запрос
                      clearInterval(global_start_function);


                      }, 
                      open: function() {
                      //установить циклический запрос
                      //переменная global_start_function должна быть глобальной
                      global_start_function = setInterval(function() { dat_status() }, 1000);

                      }
                    });

     });

*/

//команды для механизмов
    function start_stop_mex(command,p1,p2,EquipIndex) {
        var url_string ='/io_command/?'+escape('UD_DB.EquipCommand')+'='+command+'&'+escape('UD_DB.EquipIndex')+'='+EquipIndex+'&'+escape('UD_DB.Command_P1')+'='+p1+'&'+escape('UD_DB.Command_P2')+'='+p2;
        $( "#menu").dialog( "close" );
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {}
            });
    }
//отображение даты
     function date() {
         var d = new Date();
         var yyyy = d.getFullYear().toString();
         var mm = (d.getMonth()+1);
         if(mm<10){
         mm= '0'+mm.toString();
         }else{
         mm= mm.toString();
         }
         var dd  = d.getDate();
         if(dd<10){
         dd= '0'+dd.toString();
         }else{
         dd= dd.toString();
         }

         var full_date = yyyy +"."+mm+"."+dd;
         return full_date
     }

//отображение текущего времени
     function time() {
         var d = new Date();
         var hh = d.getHours();
         if(hh<10){
          hh= '0'+hh.toString();
         }else{
          hh= hh.toString();
         }
         var mm = d.getMinutes(); // getMonth() is zero-based
         if(mm<10){
          mm= '0'+mm.toString();
         }else{
          mm= mm.toString();
         }
         var ss  = d.getSeconds().toString();
         if(ss<10){
          ss= '0'+ss.toString();
         }else{
          ss= ss.toString();
         }
         var full_time = hh+":"+mm+":"+ss;
         return full_time
     }

//отображение счетчика ПЛК
//     function plc() {
 //       var devise_name_complit=$("#Name_devise").val();
 //       var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
//        var val3 = 0;
//        var url_string ='/timer_cycle/?';
 //       $.ajax({
 //           url: url_string,
 //           data: {},
//            success: function( result ) {
//            $("#PLC").text(result);
//            }
 //           });
 //   }


    //Фукция закытия меню датчиков
  function close_datchiki() {

    $('#datchiki_kontrol').removeClass('visible_datchiki').addClass('hiden_datchiki');
    $('#datchiki_kontrol_konteiner').removeClass('datchiki_kontrol_konteiner_show').addClass('datchiki_kontrol_konteiner_hide');
    $('#datchiki_kontrol_konteiner').hide();

    //закончить циклический запрос
    clearInterval(global_start_function);

    }

 //создатель менюшек для различных механизмов
function menu_kreator(device_index,device_string_type){

  var url_string1='/menu/?index='+device_index;
  var device_type;
  var temp_string='';
  if(device_string_type!='current' & device_string_type!='kylt'& device_string_type!='analog_dat'){
        if(device_index in menu_header_text){
        $(".ui-dialog-title").text(menu_header_text[device_index].shortName);
            $.ajax({
            url: url_string1,
            data: {},
            success: function(result){
                  var menu_struktura=JSON.parse(result);

                  for (let i in menu_struktura){
                        if (menu_struktura[i].enable==0) {
                          temp_string=temp_string+'<p class="button_menu"><button onclick="'+menu_struktura[i].function_name+'('+menu_struktura[i].command+',0,0,'+device_index+','+element_type_number[device_string_type]+')" style="width:150px;height:25px; color:'+menu_struktura[i].color+'" disabled>'+menu_struktura[i].name+'</button></p>'
                        } else {
                          temp_string=temp_string+'<p class="button_menu"><button onclick="'+menu_struktura[i].function_name+'('+menu_struktura[i].command+',0,0,'+device_index+','+element_type_number[device_string_type]+')" style="width:150px;height:25px; color:'+menu_struktura[i].color+'">'+menu_struktura[i].name+'</button></p>'
                        }
                  }

                  //temp_string=temp_string+'<p class="button_menu"><button onclick="zadvijka_menu_open()" style="width:150px;height:25px; color:blue;" > Открыть/закрыть</button></p>';
                 // temp_string=temp_string+'<p class="button_menu"><button onclick="datchiki('+device_index+')" style="width:150px;height:25px; color:blue;" > Датчики</button></p>';
                 // temp_string=temp_string+'<p class="button_menu"><button onclick="archiv_alarm_device()" style="width:150px;height:25px" > Сообщения</button></p>';
                 // temp_string=temp_string+'<p class="button_menu"><button style="width:150px;height:25px" onclick="archiv_device()"> Журналы</button></p>';
                 // temp_string=temp_string+'<p class="button_menu"><button style="width:150px;height:25px" onclick="settings_equipment_open('+element_type_number[device_string_type]+','+device_index+')"> Настройки</button></p>';
                  //temp_string=temp_string+'<p class="button_menu"><button style="width:150px;height:25px" onclick="set_kylt(12,0,0,'+device_index+')"> Установка культуры</button></p>';

                  let div_menu = document.getElementById('menu');
                  div_menu.innerHTML = temp_string;
                  $( "#menu").dialog( "open" );
              }
            });
        }else{
                add_equipment_open(device_index,element_type_number[device_string_type]);
        }
  }else{
        $(".ui-dialog-title").text('');
        /*
        if(device_string_type!='current'){
            temp_string=temp_string+'<p class="button_menu"><button onclick="set_kylt()" style="width:150px;height:25px" > Запись культуры</button></p>';
            temp_string=temp_string+'<p class="button_menu"><button style="width:150px;height:25px" onclick="reset_kylt()"> Сброс культуры</button></p>';
        }
        */
        temp_string=temp_string+'<p class="button_menu"><button style="width:150px;height:25px" onclick="settings_equipment_open(0,0,0,'+device_index+','+element_type_number[device_string_type]+')"> Настройки</button></p>';

        let div_menu = document.getElementById('menu');
        div_menu.innerHTML = temp_string;
        $( "#menu").dialog( "open" );
  }
}

//меню контроля датчики и контроль открытие
function datchiki(p1,p2,p3,number) {
        $( "#menu").dialog( "close" );
        //var devise_name_complit=$("#Name_devise").text();
        //var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
        //var url_string1 = '/name/?index='+number;
        var url_string2 = '/dat/?index='+number;

        $('#fool_name_of_device').text(menu_header_text[number].shortName);
        $.ajax({
            url: url_string2,
            data: {},
            success: function( result ) {

              //var string_temp_d='<table>';
              var string_temp_d='';
              var string_temp_d_1='';
              var string_temp_d_2='';
              var string_temp_d_3='';
              //var string_temp_c='<table>';
              var string_temp_c='';
              var string_temp_c_1='';
              var  dat_cont=JSON.parse(result);
              console.log(dat_cont);
              for(var k in dat_cont){
              console.log(k);
                if (k.charAt(0) =='d') {
                  string_temp_d_1='<tr><td><input type="text" style="width:15px;height:15px; border-radius: 3px; border: none;border:solid 1px #ccc;" id="dat'+k.substr(1)+'_status" disabled></td>';
                  string_temp_d_2='<td id="dat'+k.substr(1)+'_name">'+dat_cont[k].name+'</td>';
                  if (dat_cont[k].enable_remont ==0) {
                    string_temp_d_3= '';
                  }
                  else{
                    string_temp_d_3= '<td><a href="#" class="remont_button" id="remont'+k.substr(1)+'" onclick="datchik_remont(16,'+number+','+k.substr(1)+')">Ремонт</a></td></tr>';
                  }
                  string_temp_d=string_temp_d+string_temp_d_1+string_temp_d_2+string_temp_d_3;
                }
                if (k.charAt(0) =='c') {
                  string_temp_c_1='<tr><td id="control'+k.substr(1)+'" style="background: #E5E5E6">'+dat_cont[k].name+'</td></tr>';
                  string_temp_c=string_temp_c+string_temp_c_1;
                }
              }
              var div_datchiki = document.getElementById('table_datchiki');
              var div_control = document.getElementById('table_control');
              //div_datchiki.innerHTML = string_temp_d+'</table>';
              div_datchiki.innerHTML = string_temp_d;
             // div_control.innerHTML = string_temp_c+'</table>';
              div_control.innerHTML = string_temp_c;

              //Диалог открытия датчиков
              $('#datchiki_kontrol_konteiner').removeClass('datchiki_kontrol_konteiner_hide').addClass('datchiki_kontrol_konteiner_show');
              $('#datchiki_kontrol_konteiner').show();
              $('#datchiki_kontrol').removeClass('hiden_datchiki').addClass('visible_datchiki');
              //$( "#datchiki_kontrol").dialog( "open" );
              var a = $('#control').width();
              var b = $('#datchiki').width();
              var c = a+b+4;
              $('#datchiki_kontrol').width(c);
              //установить циклический запрос
              //переменная global_start_function должна быть глобальной
               global_start_function = setInterval(function() { dat_status(number) }, 1000);

            }
            });

      }


function dat_status(number) {

        //var devise_name_complit=$("#Name_devise").text();
        //var number = parseInt(devise_name_complit.match(/-*[0-9]+/));
        var url_string = '/dat_status/?index='+number;
        console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
              var  dat_cont=JSON.parse(result);
              for(var k in dat_cont){
                if (k.charAt(0) =='d') {
                  if (dat_cont[k].alarm == 0){
                    if (dat_cont[k].status == 1) {
                      var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                      $(indikator_datchiki).css('backgroundColor','#00FF00');//зеленый
                    }else{
                      var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                      $(indikator_datchiki).css('backgroundColor','#E5E5E6');//серый
                    }

                    if (dat_cont[k].remont == 1) {
                      var button_datchiki = document.getElementById('remont'+k.substr(1));
                      $(button_datchiki).css('backgroundColor','#008BE9');//голубой
                    }else{
                      var button_datchiki = document.getElementById('remont'+k.substr(1));
                      $(button_datchiki).css('backgroundColor','silver');//серый
                    }

                  }else{
                    var indikator_datchiki = document.getElementById('dat'+k.substr(1)+'_status');
                    $(indikator_datchiki).css('backgroundColor','red');
                  }
                }
                if (k.charAt(0) =='c') {
                    if (dat_cont[k].status == 1) {
                      var indikator_control = document.getElementById('control'+k.charAt(1));
                      $(indikator_control).css('backgroundColor','#00FF00');//зеленый
                    }else{
                      var indikator_control = document.getElementById('control'+k.charAt(1));
                      $(indikator_control).css('backgroundColor','#E5E5E6');//серый
                    }
                  }
                }
              }
            });
      }

function datchik_remont(EquipCommand, EquipIndex, Command_P1) {
        var Command_P2=0;
        var url_string = '/io_command/?UD_DB.EquipCommand='+EquipCommand+'&UD_DB.EquipIndex='+EquipIndex+'&UD_DB.Command_P1='+Command_P1+'&UD_DB.Command_P2='+Command_P2;
        console.log(url_string);
        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {}
            });
}

function hide_icons(){
    $("body").on("contextmenu", false);
    var svgobject = document.getElementById('nor');

    if ('contentDocument' in svgobject){
        var svgdom = svgobject.contentDocument;
        $(svgdom.getElementsByClassName("icon")).hide()
    }
}

function set_kylt(command,p1,p2,device_index){
    $( "#menu").dialog( "close" );
    $('#kylt_set_confirmation_window').show();
    document.getElementById('Kylt_device_Index').value =device_index;
    document.getElementById('kylt_set_confirmation_list').innerHTML = global_object_oll_kylt_from_server;
}
function kylt_set_save(EquipIndex,kylt){
    start_stop_mex(12,kylt,0,EquipIndex);
    $('#kylt_set_confirmation_window').hide();
}

function kylt_set_close(){
    $('#kylt_set_confirmation_window').hide();
}

function set_position_pt(command,p1,p2,device_index){
    var temp_string='';
    $( "#menu").dialog("close");
    $('#position_pt_confirmation_window').show();
    for(let i=1;i<=10;i++){
        temp_string=temp_string+'<td><button onclick="start_stop_mex('+(20+i)+',0,0,'+device_index+')">'+i+'</button></td>'
    }
    document.getElementById('PT_pos_buttons').innerHTML = temp_string;

}

function close_position_pt(){
    $('#position_pt_confirmation_window').hide();
}

function bell_command(command){
    console.log('Команда звонку='+command);
    var url_string ='/bell_command/?command='+command;

        $.ajax({
            url: url_string,
            data: {},
            success: function( result ) {
                if(result!='ok'){
                    console.log('проблема со свонком')
                }
                console.log(result);
            }
        });
}
function oll_mex_confirm(command,p2,p3,device_index,type){
    var temp_string='';
    var temp_string2='';
    $( "#menu").dialog("close");  

    var confirm_header_name_tr=document.getElementById('confirmation_header_name');
    console.log(confirm_header_name_tr);
    confirm_header_name_tr.innerText=menu_header_text[device_index].longName;
    switch(type){
            case 1:
                temp_string='<td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Запуск</button></td><td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Запуск механизма?";
                break;
            case 2:
                temp_string='<td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Запуск</button></td><td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Запуск механизма?";
                break;
            case 4:
                temp_string='<td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Открыть</button></td><td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Полностью открыть задвижку?";
                break;
            case 23:
                temp_string='<td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_confirm('+command+',0,0,'+device_index+')">Открыть</button></td><td style="text-align: center; width:50%"><button onclick="oll_mex_confirm_close()">Отмена</button></td>'
                document.getElementById("oll_mex_message").innerText="Полностью открыть задвижку?";
                break;

            default:
                alert( 'Мы надеемся, что и в вашем браузере все ок!' );
                break;
        }

    $('#oll_mex_confirmation_window').show();
 
    //temp_string='<td style="text-align: center; width:50%"><button onclick="zadvijka_full_open_confirm('+command+',0,0,'+device_index+')">Открыть</button></td><td style="text-align: center; width:50%"><button onclick="zadvijka_full_open_close()">Отмена</button></td>'
    document.getElementById('oll_mex_buttons').innerHTML = temp_string;
}
function oll_mex_confirm_confirm(comand,p2,p3,index){
    $('#oll_mex_confirmation_window').hide();
    start_stop_mex(comand,p2,p3,index);
}
function oll_mex_confirm_close(){
    $('#oll_mex_confirmation_window').hide();
}



function inicializePreventDefoult(){
  var svgobject = document.getElementById('nor');          
  var svgdom = svgobject.contentDocument;
  $(svgdom.getElementsByTagName("svg")).on('contextmenu', cansaleContextMenu);

 svgobject = document.getElementsByClassName('menu_button_typ2');
 console.log(svgobject);
 
 for (var i = 0; i < svgobject.length; i++) {
   var svgdom = svgobject[i].contentDocument;
    $(svgdom.getElementsByTagName("svg")).on('contextmenu', cansaleContextMenu);
 } 
}

//function prevent context menu
function cansaleContextMenu(e){
  console.log('target: '+e.target.nodeName);
  console.log('current target: '+e.currentTarget.nodeName);
  e.stopPropagation();
  e.preventDefault();
}


