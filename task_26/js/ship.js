	var runOrbit=[], stopOrbit = [], RUN = 1, STOP = 0;

	var ship={
		speed: 0.5, //飞船运行速度
		state: STOP, //飞船状态
		energe: 100, //飞船出示能量

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
			runOrbit[orbit] = setInterval(function(){
				var craft = document.getElementById("ship"+orbit);
				var energe_txt = document.querySelector(".energe_txt"+orbit);
				var angle = /\d*\.?\d/.exec(craft.style.webkitTransform);// 取得当前飞船的位置
				angle = parseFloat(angle) + speed;
				craft.style.webkitTransform = " rotate("+angle+"deg)"; 
				that.energe = that.energe - 1;
				energe_txt.innerHTML = that.energe + "%";
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
					that.energe += 2;
					if(that.energe > 100){
						that.energe = 100;
					}
					energe_txt.innerHTML = that.energe + "%";
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
function createShip(orbit){
	var shipp = Object.create(ship);
	shipp.orbit = orbit;
	var ship_orbit = document.getElementById("orbit_"+orbit);
	var ship_div = document.createElement('div');
	ship_div.className = 'ship'+orbit;
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
	craft.appendChild(energe_bar);
	ship_div.appendChild(craft);
	ship_orbit.appendChild(ship_div);

	shipp.sendMessage = function(command){
			if(command.id === this.orbit){
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


