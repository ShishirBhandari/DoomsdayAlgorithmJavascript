document.addEventListener("DOMContentLoaded", SetupFunc);

let monthArr = ['January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'];

let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let doomsdayArrayLeapYear = [4, 1, 7, 4, 2, 6, 4, 1, 5, 3, 7, 5];
let doomsdayArrayNotLeapYear = [3, 7, 7, 4, 2, 6, 4, 1, 5, 3, 7, 5];


let monthSelect;
let daySelect;
let yearSelect;

let calcBtn;
let resultBox;

function SetupFunc() {
	daySelect = document.getElementById("day");
	monthSelect = document.getElementById("month");
	yearSelect = document.getElementById("year");

	calcBtn = document.getElementById("calcbtn");
	resultBox = document.getElementById("results");

	var thisYear = (new Date()).getFullYear();

	for(var i=0; i<=11; i++) {
		let option = document.createElement("option");
		option.appendChild(document.createTextNode(monthArr[i]));
		monthSelect.appendChild(option)
	}

	for(var i=1; i<=31; i++) {
		let option = document.createElement("option");
		option.appendChild(document.createTextNode(i));
		daySelect.appendChild(option)
	}

	for(var i=thisYear; i>=1900; i--) {
		let option = document.createElement("option");
		option.appendChild(document.createTextNode(i));
		yearSelect.appendChild(option)
	} 

	calcBtn.addEventListener('click', GetResults);
}


function GetResults(){

	let resultStr = ""

	resultStr += "1. Divide the last two digits by 12.\n";
	let year2Digits = yearSelect.value.toString().substr(-2);
	let calc1 = Math.floor(year2Digits / 12);


	resultStr += "2. .\n";
	let calc2 = year2Digits - (calc1 * 12); 


	resultStr += "3. Divide previous year by 4.\n";
	let calc3 = Math.floor(calc2 / 4);



	let calc4 = calc1 + calc2 + calc3 + GetAnchorNum(yearSelect);


	let calc5 = calc4 % 7;


	isLeapYear = IsLeapYear(yearSelect);


	//

	let day = daySelect.value;
	let monthSelected = monthSelect.value.toString();
	let monthIndex = monthArr.indexOf(monthSelected);
	let year = yearSelect.value;
	let dayIndex;
	let doomsdayDay;


	//

	if(isLeapYear) {
		doomsdayDay = doomsdayArrayLeapYear[monthIndex];
	} else{
		doomsdayDay = doomsdayArrayNotLeapYear[monthIndex];
	}

	//

	if (day < doomsdayDay) {
		dayIndex = calc5 - (doomsdayDay - day);
	} else if (day > doomsdayDay){
		dayIndex = calc5 + (day - doomsdayDay);
		
		if(dayIndex >= 7){
			dayIndex = dayIndex % 7;
		} else {

		}
	} else {
		dayIndex = calc5;
	}

	if(dayIndex<0) dayIndex = 7 + dayIndex;
	resultStr = monthSelected + " " + day + ", " + year + " was a " + dayArr[dayIndex] + ".\n";


	resultBox.innerHTML = resultStr;
}

function GetAnchorNum(year){
	let firstDigitYear = String(year.value).toString().charAt(0);
	let anchoNum = (firstDigitYear == 1) ? 3 : 2;
	return anchoNum;
}

function IsLeapYear(_year)  {
	let year = _year.value;
	let leapYear = (year % 4 == 0) ? true : false;
	if((year%100 == 0) && (year%400 != 0)) leapYear = false;

	return leapYear;
}