/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}
var colorData = {};
/**
用来存不同数值的颜色(根据天气质量的不同从低到高)
*/
var colors =
{
	"0": "#13BB07",
	"1": "#13BB07",
	"2": "#13AE08",
	"3": "#0E8C05",
	"4": "#3C8C05",
	"4": "#608C05",
	"5": "#FDE80D",
	"6": "#FDBA0D",
	"7": "#FD710D",
	"8": "#FD440D",
	"9": "#FD440D"
	};
var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
var innerHTML = "", i = 0;
    var chart = document.getElementById("chart");
	var title;
	if(pageState.nowGraTime=="day")
	{
		title = "每日";
	}
	if(pageState.nowGraTime=="week")
	{
		title = "每周";
	}
	if(pageState.nowGraTime=="month")
	{
		title = "每月";
	}
		var width = chart.clientWidth;
  //  var selectedData = chartData[pageState.nowGraTime][pageState.nowSelectCity];
    var chartDataLength =  Object.keys(chartData).length;
    var preWidth = parseInt(width/chartDataLength)-4;
	var spaceWidth = (width-preWidth*chartDataLength)/(chartDataLength+1)
	var i = 0;
    innerHTML += "<div class='title'>" + pageState.nowSelectCity + "市01-03月"+ title +"空气质量报告</div>";
    for (var key in chartData) {
       innerHTML += "<div title='"+pageState.nowSelectCity+key+"空气质量:"+chartData[key]+"' class='aqi-bar " + pageState.nowGraTime + "' style='display:inline-block; position:absolute; bottom:0px;margin-left:"+(spaceWidth+(spaceWidth+preWidth)*i) +"; height:" + chartData[key]*2 + "px; width: " + preWidth +"px; background-color:" + colors[colorData[key]] + "'></div>"
      // innerHTML += "<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + getHintLfeft(posObj, i++) + "px'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
	  i++;
    }
    chart.innerHTML = innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
	var radios = document.getElementsByName("gra-time");
	var radioLength = radios.length;
	for(var i = 0;i < radioLength;i++)
	{
		if(radios[i].checked)
		{
			if(pageState.nowGraTime!=radios[i].value)
			{
			// 设置对应数据
			pageState.nowGraTime = radios[i].value;
			}
			else
				return;
		}
	}
	//设置对应数据
	initAqiChartData()
// 调用图表渲染函数
renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	var city = this.value;
    if (city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        // 调用图表渲染函数
        
    }
  // 设置对应数据
  initAqiChartData()
  // 调用图表渲染函数
  renderChart();
}
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radios = document.getElementsByName("gra-time");
	var radioLength = radios.length;
	for(var i = 0;i < radioLength;i++)
	{
	radios[i].onchange = graTimeChange;
   }
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var select = document.getElementById("city-select");
	for(city in aqiSourceData)
	{
		var option =document.createElement("option")
		option.innerHTML = city;
		select.appendChild(option);
	}
	select.selectedIndex = 0;
	pageState.nowSelectCity = select[0].value;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	select.onchange = citySelectChange
}
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  chartData={};
  colorData={};
  if(pageState.nowGraTime=="day")
  {
	var day = "";
	for(day in aqiSourceData[pageState.nowSelectCity])
	{
		// 处理好的数据存到 chartData 中
		chartData[day] = aqiSourceData[pageState.nowSelectCity][day];
		colorData[day] = parseInt(aqiSourceData[pageState.nowSelectCity][day]/50);
	}
  }
	else if(pageState.nowGraTime=="week")
	{
		var dat = new Date("2016-01-01");
		var datStr = ''
		var count = 0;
		var weekNum = 1;
		for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		count += aqiSourceData[pageState.nowSelectCity][datStr];
		if(i%7 == 0)
		{
			chartData["第"+weekNum+"周平均"] = parseInt(count/7);
			colorData["第"+weekNum+"周平均"] = parseInt(count/7/50);
			weekNum++;
			count = 0;
		}
		 dat.setDate(dat.getDate() + 1);
		}
	}
	else if (pageState.nowGraTime=="month")
	{
		var dat = new Date("2016-01-01");
		var newDat = new Date("2016-01-01");
		var datStr = ''
		var count = 0;
		for (var i = 1; i < 92; i++) {
		var month =	dat.getMonth()+1;
		newDat.setDate(newDat.getDate() + 1)
		datStr = getDateStr(dat);
		count += aqiSourceData[pageState.nowSelectCity][datStr];
		if(month!=(newDat.getMonth()+1))
		{
			chartData[month+"月平均"] = parseInt(count/dat.getDate());
			colorData[month+"月平均"] = parseInt(count/dat.getDate()/50);
			count = 0;
		}
		 dat.setDate(dat.getDate() + 1);
		}
	}
  }
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
