var oSchool = document.getElementById('school');
var oWork = document.getElementById('work');
var oIn = document.getElementById('inSchool');
var oOut = document.getElementById('outSchool');
var oRegion = document.getElementById('region');
var oSchools = document.getElementById('schools');
var val;

window.onload = function(){
	oIn.onclick = function(){
		oSchool.style.display = 'block';
		oWork.style.display = 'none';
	}

	oOut.onclick = function(){
		oSchool.style.display = 'none';
		oWork.style.display = 'block';
	}

	oRegion.onchange = function(){
		var data={
			bj : ['北京大学','清华大学','北京外国语大学'],
			sh : ['复旦大学','同济大学','上海交通大学'],
			xi : ['西安电子科技大学','西安交通大学','西安工业大学','西北大学'],
			hz : ['浙江大学','浙江工业大学']
		};
		val = oRegion.value;
		//将原有学校的option的innerHTML清空，根据当前的val值，创建新的option(包括value，innerHTML值)，然后再添加回去
		oSchools.innerHTML = '';
		for(var i=0;i<data[val].length;i++){
			var opt = document.createElement('option');
			opt.value = val;
			opt.innerHTML = data[val][i];
			oSchools.appendChild(opt);
		}
	}
}