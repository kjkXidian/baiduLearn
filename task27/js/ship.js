	var runOrbit=[], //记录当前正在飞行的飞船
	stopOrbit = [], //记录当前停止飞行的飞船
	RUN = 1, //运行状态
	STOP = 0; //暂停状态

	var ship={
		//初始化参数,可以根据指挥官命令进行更改
		speed: 0.5, //飞船运行速度
		state: STOP, //飞船状态
		energe: 100, //飞船出示能量
		chargeRate: 0.2, //飞船充电速率
		consumeRate: 0.5,//飞船能耗率


		//drive system
		 run: function(orbit){
		 	console.log(" runf "+orbit+" run");
			var speed = this.speed;
			var that = this;
			console.log(" run "+that.energe);
			this.state = RUN;
			clearInterval(stopOrbit[orbit]);
			if(runOrbit[orbit]){
				clearInterval(runOrbit[orbit]);
			}
			console.log("consumeRate "+this.consumeRate);
			runOrbit[orbit] = setInterval(function(){
				var craft = document.getElementById("ship"+orbit);
				var energe_txt = document.querySelector(".energe_txt"+orbit);
				var angle = /\d*\.?\d/.exec(craft.style.webkitTransform);// 取得当前飞船的位置
				angle = parseFloat(angle) + speed;
				craft.style.webkitTransform = " rotate("+angle+"deg)"; 
				console.log(" eb 1 "+that.energe);

				that.energe = that.energe - that.consumeRate - that.chargeRate; //计算每秒消耗的能量
				energe_txt.innerHTML = (that.energe).toFixed(1) + " %";
				console.log(" eb  "+that.energe);

				if(that.energe <= 0){ //能量耗尽 飞船停止运行
					console.log(" 0 STOP");
					if(runOrbit[orbit]){
						clearInterval(runOrbit[orbit]);
						that.stop(orbit);
					}
				}
			},100);
		},

		stop: function (orbit) {
			this.state = STOP;
			var that = this;
			console.log("stop "+that.energe);
			var energe_txt = document.querySelector(".energe_txt"+orbit);
			clearInterval(runOrbit[orbit]);
			if(stopOrbit[orbit]){
				clearInterval(stopOrbit[orbit]);
			}
			stopOrbit[orbit] = setInterval(function(){
				if(that.energe < 100){//飞船暂停时利用太阳能充电
					that.energe += that.chargeRate;
					if(that.energe > 100){
						that.energe = 100;
					}
					energe_txt.innerHTML = (that.energe).toFixed(1) + " %";
				}
			}, 1000);
		},
		//self-destruction
		destroy: function(orbit){
			var craft = document.querySelector("#ship"+orbit);
			if (runOrbit[orbit]){
				clearInterval(runOrbit[orbit]);
			}
			craft.parentNode.removeChild(craft);
		},
	};
function createShip(orbit, speed, consumeRate, chargeRate){
	var shipp = Object.create(ship);//创建飞船，并更改相关参数
	shipp.orbit = orbit;
	shipp.speed = speed;
	shipp.consumeRate = consumeRate;
	shipp.chargeRate = chargeRate;

	render(orbit);
	shipp.sendMessage = function(command){ //给飞船添加通讯系统
		console.log(this.orbit);
			if(command.id == this.orbit){
				console.log(" order "+ command.id);
				switch(command.command){
					case "run": this.run(orbit); break;
					case "stop": this.stop(orbit); break;
					case "destroy": this.destroy(orbit); break;
				}
			}
		};

	return shipp;
}

function render(orbit){ //渲染飞船
	var ship_orbit = document.getElementById("orbit_"+orbit);
	var ship_div = document.createElement('div');
	ship_div.className = 'ship';
	ship_div.id = 'ship'+orbit;
	ship_div.style.webkitTransform = "rotate(50deg)";
	var craft = document.createElement('div');
	craft.className = 'craft';
	var energe_bar = document.createElement('div');
	energe_bar.className = 'energe_bar';
	var span = document.createElement('span');
	span.innerHTML = '100%';
	span.className = "energe_txt"+orbit;
	energe_bar.appendChild(span);
	var span_1 = document.createElement('span');
	span_1.innerHTML = orbit+"号";
	energe_bar.appendChild(span_1);
	craft.appendChild(energe_bar);
	ship_div.appendChild(craft);
	ship_orbit.appendChild(ship_div);
}