/**
 * apiData，存储用户输入的空气指数数据
 * 示例格式：
 * apiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var apiData = {};
var inputCity = document.getElementById("aqi-city-input");
var inputValue = document.getElementById("aqi-value-input");

/**
 * 从用户输入中获取数据，向apiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addapiData() {
	//两端去空格
	var city = inputCity.value.trim();
	var value = inputValue.value.trim();
	if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符");
        return;
    }
    if (!value.match(/^\d+$/)) {
        alert("空气质量指数必须为整数");
        return;
    }
    apiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	 while(table.hasChildNodes()) 
    {
        table.removeChild(table.firstChild);
    }
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	td1.innerHTML = "城市";
	td2.innerHTML = "空气质量";
	td3.innerHTML = "操作";
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	table.appendChild(tr);
	for(city in apiData){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
		td1.innerHTML = city;
		td2.innerHTML = apiData[city];
		td3.innerHTML = "<button id='"+city+"'>删除</button>";
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addapiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  delete apiData[city];	//delete只能删除对象的属性，不能用来删除变量
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").addEventListener("click", addBtnHandle);//onclick会产生覆盖！
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
  table.addEventListener("click", function(e) {
  	//target:获得触发事件的元素
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target.id);
        }
  })
}

init();
