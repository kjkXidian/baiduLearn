var oInput = document.getElementById('input');
var oP = document.getElementById('nameInfo');

var oPass = document.getElementById('password');
var oPassText = document.getElementById('passwordInfo');

var oRepass = document.getElementById('repass');
var oRepassText = document.getElementById('repassInfo');

var oEmail = document.getElementById('email');
var oEmailText = document.getElementById('emailInfo');

var oPhone = document.getElementById('phone');
var oPhoneText = document.getElementById('phoneInfo');

var oBtn = document.getElementById('submit');
var access = true;
var oBox = document.getElementById('box');
var oBox2 = document.getElementById('box2');


//验证姓名
function validateName(){
	//IE下输入规定数量的空格也可通过验证，故先去掉字符串中的行首行尾空格再做验证
	var msg = trim(oInput.value);
	var len = getBytes(msg);
	if(len == 0){
		oP.innerHTML ='姓名不能为空';
		oP.style.color = '#E0162A';
		oInput.style.border = '2px solid #E0162A';
		access = false;
	}
	else if(len >= 4 && len <= 16){
		oP.innerHTML = '名称格式正确';
		oP.style.color = '#61B648';
		oInput.style.border = '2px solid #61B648';
		access = true;
	}
	else {
		oP.innerHTML = '字符串应为4~16位';
		oP.style.color = '#E0162A';
		oInput.style.border = '2px solid #E0162A';	
		access = false;
		}
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

//验证密码
function validatePassword(){
	//IE下输入规定数量的空格也可通过验证，故先去掉字符串中的行首行尾空格再做验证
	var msg = trim(oPass.value);
	var len = getBytes(msg);
	if(len == 0){
		oPassText.innerHTML ='密码不能为空';
		oPassText.style.color = '#E0162A';
		oPass.style.border = '2px solid #E0162A';
		access = false;
	}
	else if(len >= 8 && len <= 24){
		oPassText.innerHTML = '密码格式正确';
		oPassText.style.color = '#61B648';
		oPass.style.border = '2px solid #61B648';
		access = true;
		
	}
	else {
		oPassText.innerHTML = '密码应为8~24位';
		oPassText.style.color = '#E0162A';
		oPass.style.border = '2px solid #E0162A';	
		access = false;
	}	
}

//验证密码确认
function rePass(){
	var msg = trim(oPass.value);
	var msg2 = trim(oRepass.value);	
	var len1 = getBytes(msg);
	var len2 = getBytes(msg2);
	var len = (len1>len2)?len1:len2;
	var marker = true;

	for(var i=0;i<len;i++){
		if(msg2[i]!=msg[i]){
			oRepassText.innerHTML = '和输入密码不一致';
			marker = false;
			oRepassText.style.color = '#E0162A';
			oRepass.style.border = '2px solid #E0162A';
			break;
			access = false;
		}
	}
	if(marker == true)
		{
			oRepassText.innerHTML = '和输入密码一致';
			oRepassText.style.color = '#61B648';
			oRepass.style.border = '2px solid #61B648';
			access = true;
		}
	if(len2 == 0){
		oRepassText.innerHTML ='再次输入密码不能为空';
		oRepassText.style.color = '#E0162A';
		oRepass.style.border = '2px solid #E0162A';
		access = false;
	}
}

//验证邮箱
function validateEmail(){
	//IE下输入规定数量的空格也可通过验证，故先去掉字符串中的行首行尾空格再做验证
	var msg = trim(oEmail.value);
	var len = getBytes(msg);
	if(len == 0){
		oPassText.innerHTML ='邮箱不能为空';
		oPassText.style.color = '#E0162A';
		oPass.style.border = '2px solid #E0162A';
		access = false;
	}
	var re = /^\w+@[0-9a-z]+\.[a-z]{2,4}$/;
	if(re.test(msg) == false){
		oEmailText.innerHTML = '请输入正确的邮箱格式';
		oEmailText.style.color = '#E0162A';
		oEmail.style.border = '2px solid #E0162A';
		access = false;
	}
	else {
		oEmailText.innerHTML = '邮箱正确';
		oEmailText.style.color = '#61B648';
		oEmail.style.border = '2px solid #61B648';	
		access = true;
	}
}

//验证手机
function validatePhone(){
	//IE下输入规定数量的空格也可通过验证，故先去掉字符串中的行首行尾空格再做验证
	var msg = trim(oPhone.value);
	var len = getBytes(msg);
	if(len == 0){
		oPhoneText.innerHTML ='手机不能为空';
		oPhoneText.style.color = '#E0162A';
		oPhone.style.border = '2px solid #E0162A';
		access = false;
	}
	var re = /^1[0-9]{10}$/;
	if(re.test(msg) == false){
		oPhoneText.innerHTML = '请输入正确的手机号码';
		oPhoneText.style.color = '#E0162A';
		oPhone.style.border = '2px solid #E0162A';
		access = false;
	}
	else {
		oPhoneText.innerHTML = '手机号码正确';
		oPhoneText.style.color = '#61B648';
		oPhone.style.border = '2px solid #61B648';	
		access = true;	
	}
}

//支持键盘事件：输入框内按下回车即可校验表单
oInput.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		validateName();
	}
}
oInput.onfocus = function(){
	oP.innerHTML = '必填，长度为4-16位的字符串';
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
oInput.onblur = function(){
	validateName();
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}

//密码
oPass.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		validatePassword();
	}
}
oPass.onfocus = function(){
	oPassText.innerHTML = '必填，密码长度为8-24位的字符串';
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
oPass.onblur = function(){
	validatePassword();
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}

//密码确认
oRepass.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		rePass();
	}
}
oRepass.onfocus = function(){
	oRepassText.innerHTML = '必填，请再次输入相同的密码';
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
oRepass.onblur = function(){
	// alert('a');
	rePass();
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}

//邮箱
oEmail.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		validateEmail();
	}
}
oEmail.onfocus = function(){
	oEmailText.innerHTML = '必填，请输入您的邮箱';
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
oEmail.onblur = function(){
	validateEmail();
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
//手机
oPhone.onkeydown = function(ev){
	// alert('');
	oEvent = ev || event;
	if(oEvent.keyCode == 13){
		validatePhone();
	}
}
oPhone.onfocus = function(){
	oPhoneText.innerHTML = '必填，请输入您的手机号码';
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}
oPhone.onblur = function(){
	validatePhone();
	oBox.style.display = 'none';
	oBox2.style.display = 'none';
}

//点击“验证”按钮时可验证表单
oBtn.onclick  = function(){
	validateName();
	validatePassword();
	rePass();
	validateEmail();
	validatePhone();
	console.log(access);
	if(access == true){

		oBox.style.display = 'block';
		oBox2.style.display = 'none';
		oBox.style.zIndex++;
	}
	else{
		oBox2.style.display = 'block';
		oBox.style.display = 'none';
		oBox2.style.zIndex++;
	}
}