function createDivForeManagmentDevices(){
    var divManageElement;
    var headerText;
    var bodyWithButtons;

    createElements();

    this.show=function(left,top){
        if (divManageElement.style.display!='block') {
                
                divManageElement.style.left=''+left+'px';
                divManageElement.style.top=''+top+'px';
                divManageElement.style.display='block';
            }   
    };

    this.hide=function(){
        if (divManageElement.style.display!='none') {
                divManageElement.style.display='none';
        }        
    };

    this.insertButtons=function(inerText){
        bodyWithButtons.innerHTML=inerText;
    };

    this.setHeader=function(inerText){
        headerText.innerHTML=inerText;
    };
    this.setMainStyle=function(styletext){
        //divManageElement.style.cssText=styletext;
        divManageElement.classList.add(styletext);
    };
    this.setHeaderStyle=function(classtext,styletext){
        headerText.style.cssText=styletext;
        headerText.classList.add(classtext);
    };


    function createElements(){
        divManageElement=document.createElement('div');
        headerText=document.createElement('div');
        bodyWithButtons=document.createElement('div');
        divManageElement.appendChild(headerText);
        divManageElement.appendChild(bodyWithButtons);
        divManageElement.classList.add('draggable');
        divManageElement.setAttribute('id','windowManageDevice');
        document.getElementById("container").appendChild(divManageElement);
    }
	      
}

var objectMenuManager= new createDivForeManagmentDevices();
objectMenuManager.setMainStyle('modal_box');
objectMenuManager.setHeaderStyle('modal_box_header');



