var oInput = document.getElementById('input');
var oBtn = document.getElementById('button');
var oP = document.getElementById('info');

function validate(){
	//IE下输入规定数量的空格也可通过验证，故先去掉字符串中的行首行尾空格再做验证
	var msg = trim(oInput.value);
	var len = getBytes(msg);
	if(len == 0){
		oP.innerHTML='姓名不能为空';
		oP.style.color = '#E0162A';
		oInput.style.border = '2px solid #E0162A';
	}
	else if(len >= 4 && len <= 16){
		oP.innerHTML = '名称格式正确';
		oP.style.color = '#61B648';
		oInput.style.border = '2px solid #61B648';
	}
	else {
		oP.innerHTML='字符串应为4~16位';
		oP.style.color = '#E0162A';
		oInput.style.border = '2px solid #E0162A';	}
} 

//求字符串的字节长度
//一个英文字符占一个字节，一个中文字符占两个字节
function getBytes(str){
	var len = str.length;
	var bytes = len;
	for(var i=0; i<len; i++){
		if(str.charCodeAt(i) > 255){
			bytes++;
		}
	}
	return bytes;
}

function trim(str){
	var re = /^\s+|\s+$/g;
	return str.replace(re,"");
}

//支持键盘事件：输入框内按下回车即可校验表单
oInput.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		validate();
	}
}

//点击“验证”按钮时可验证表单
oBtn.onclick = function(){
	validate();
}