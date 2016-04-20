var nowShip = []; // 用已存放当前以后的飞船
function Mediator(command, orbit){
	var order ={id: orbit, command: command};
	var sendMessage = function(order) { //发送命令
		if(order.command === 'createShip'){
			var ship = createShip(order.id);
			nowShip.push(ship);
		}else{
			if(nowShip.length != 0){
				nowShip.forEach(function(ship){ //广播该命令
					ship.sendMessage(order);
				});
				if(order.command === "destroy"){
					nowShip.forEach(function(ship, idx){ //飞船自毁以后必须消除当前存在的飞船记录
						if(ship.orbit === order.id){
							nowShip.splice(idx,1);
						}
					});
				}
			}else{
				return;
			}
		}
		console.log("snum "+nowShip.length);
	}
	var tip_ul = document.querySelector("#tip-ul");
	var Msg=[];
	if(Math.ceil(Math.random()*10) > 3){//模拟 30% 的丢包率
		sendMessage(order);
		var msg = "[消息] : "+ order.id + " 号飞船 '"+ order.command + "' 命令发送 成功 ！";
		var li = document.createElement("li");
		li.innerHTML = msg;
		li.className = "success";
		li.style.listStyleType = "none";
		tip_ul.appendChild(li);
	}else{
		var msg = "[消息] : "+ order.id + "号飞船 '"+ order.command + "'命令 丢包了 ！";
		var li = document.createElement("li");
		li.innerHTML = msg;
		li.className = "error";
		li.style.listStyleType = "none";
		tip_ul.appendChild(li);
	}
	var msgLen = document.getElementsByTagName('li');
	if(msgLen.length >=10 ){//控制提示窗口的信息数量不超过10条
		var child = tip_ul.firstChild;
		tip_ul.removeChild(child);
	}
}