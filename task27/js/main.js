$(function(){
			$("div[class ^= 'btn-div']").hide();
			$('#choseForm').submit(function(){
				var $driveType = $("input[name='type']:checked").val();
				var $energeType = $("input[name='energeType']:checked").val();
				var $orbit = $("input[name='orbit']:checked").val();
				var $speed, $consumeRate, $chargeRate;
				switch($orbit){
					case '1': init(1); break;
					case '2': init(2); break;
					case '3': init(3); break;
					case '4': init(4); break;
				}
				switch($driveType){
					case "qjh": $speed = 0.3; $consumeRate = 0.3; break;
					case "bth": $speed = 0.5; $consumeRate = 0.7; break;
					case "cyh": $speed = 0.8; $consumeRate = 0.9; break;
				}
				switch($energeType){
					case "jlx": $chargeRate = 0.2; break;
					case "gnx": $chargeRate = 0.3; break;
					case "yjx": $chargeRate = 0.4; break;
				}
				var $isShop = $('#orbit_'+$orbit+' .ship').length;
				if($isShop >= 1){
					alert(" 该轨道上已经有飞船了，请另选轨道 !");
				}else{
					BUS("createShip", $orbit, $speed, $consumeRate, $chargeRate);
				}
				return false;
			})
			function init(orbit){
				$('.btn-div-'+orbit).show();
				$('#runShip'+orbit).click(function(){
					BUS("run", orbit);
				});
				$('#stopShip'+orbit).click(function(){
					BUS("stop", orbit);
				});
				$('#desShip'+orbit).click(function(){
					BUS("destroy", orbit);
				});
			}
		})