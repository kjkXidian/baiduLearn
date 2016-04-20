var ship_1, ship_2, ship_3, ship_4;

//1号飞船控制部分
document.getElementById("createShip1").addEventListener("click", function(){
	Mediator("createShip", 1);
});
document.getElementById("runShip1").addEventListener("click", function(){
	Mediator("run", 1);
});
document.getElementById("stopShip1").addEventListener("click", function(){
	Mediator("stop", 1);
});
document.getElementById("desShip1").addEventListener("click", function(){
	Mediator("destroy", 1);
});

//2号飞船控制部分
document.getElementById("createShip2").addEventListener("click", function(){
	Mediator("createShip", 2);
});
document.getElementById("runShip2").addEventListener("click", function(){
	Mediator("run", 2);
});	
document.getElementById("stopShip2").addEventListener("click", function(){
	Mediator("stop", 2);
});
document.getElementById("desShip2").addEventListener("click", function(){
	Mediator("destroy", 2);
});

//3号飞船控制部分
document.getElementById("createShip3").addEventListener("click", function(){
	Mediator("createShip", 3);
});
document.getElementById("runShip3").addEventListener("click", function(){
	Mediator("run", 3);
});	
document.getElementById("stopShip3").addEventListener("click", function(){
	Mediator("stop", 3);
});
document.getElementById("desShip3").addEventListener("click", function(){
	Mediator("destroy", 3);
});

//4号飞船控制部分
document.getElementById("createShip4").addEventListener("click", function(){
	Mediator("createShip", 4);
});
document.getElementById("runShip4").addEventListener("click", function(){
	Mediator("run", 4);
});	
document.getElementById("stopShip4").addEventListener("click", function(){
	Mediator("stop", 4);
});
document.getElementById("desShip4").addEventListener("click", function(){
	Mediator("destroy", 4);
});
