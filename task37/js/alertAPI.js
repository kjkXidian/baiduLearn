/*
*@para content 弹出框内容，必填
*@para width 弹出框宽度 可选参数
*@para height 弹出框高度 可选参数
*/
function alertAPI(content, /*optional*/width, /*optional*/height){
	var $show = $("#show");
	$('body').append('<div class="alert" id="alert">'+
		'<div class="head"> 这是一个弹出层 </div>'+
		'<div class="content"> '+content+' </div>'+
		'<footer> <button id="entry">确定</button>'+
		'<button id="cancel"> 取消</button></footer>'+
		'</div>');
	var $alert = $("#alert");
	if(width){
		$alert.css('width',width+'px');
	}
	if (height){
		$alert.css('height', height+'px');
		var ftop = height - 70;
		$('.alert footer').css('top', ftop +'px');
	}
	$('body').append('<div class="shade" id="shade"></div>');
	$("#shade").bind('click', function(e){
		if($alert.is(':visible')){ //如果弹出框处于显示状态 则隐藏
			$alert.hide();
			$shade.hide(); //隐藏遮罩
		}
	});
	var $shade = $("#shade");
	$alert.hide();
	$shade.hide();
	$show.click(function(){
		$alert.show(); //显示弹出框
		$shade.show(); //显示遮罩
	});
	$("#cancel").click(function(){
		$alert.hide();
		$shade.hide();
	});
	$("#entry").click(function(){
		$alert.hide();
		$shade.hide();
	});
}