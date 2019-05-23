let arrNumbers = [];
let arrColors = ['red', 'orange', 'yellow', 'lime', 'blue', 'fuchsia', 'green', 'maroon'];
let objDouble = {};
/*создание объекта с полями от 0 до 15 и значениями полей undefined*/  
for (let i = 0; i <= 15; i++){
  objDouble[`''${i}`] = undefined;
}
/*цикл генерации случайным образом восьми пар цветов и заполнения ими полей объекта objDouble*/
for (let j = 0; j <= 1; j++){
  for (let i = 0; i <= 7; i++){
    let randomItem = Math.round(15*Math.random());
    if(objDouble[randomItem] !== undefined) {
      i--;
    } else {
        objDouble[randomItem] = arrColors[i];
      }
  }     
}

let prevSelectedItem;
let count = 0;
let timerId;
let countFixed = 0;
/*функция обработки события клик мыши с учетом предыдущих кликов и уже найденных пар цветов*/
let events = function (event) {
  let target = event.target;
  let x = target.parentNode.rowIndex;
  let y = target.cellIndex;

  if (!target.className) {
  	count++;
    target.classList.add('selected');
    target.style.backgroundColor = objDouble[4*x + y];

    if (target.style.id === 'fixed') {
      return;
    } else {
        /*условие фиксирования найденных цветов, чтобы они не исчезали*/
        if (prevSelectedItem && 
    	 	prevSelectedItem.style.backgroundColor === target.style.backgroundColor) {
    	  target.id = 'fixed';
    	  prevSelectedItem.id = 'fixed';
    	  prevSelectedItem = null;
    	  count = 0;
    	  countFixed += 2;

    	  if (countFixed === 16) {
    	    clearTimeout(timerId);
    	    document.querySelector('#result-form').style.display = 'block';
    	    document.querySelector('#result').innerHTML = `Затраченное время: ${document.querySelector('.counter').innerHTML}`;
    	  }

    	} else {
     	    if (prevSelectedItem && 
     			prevSelectedItem.style.backgroundColor !== target.style.backgroundColor) {
     	      timeOut(target);
     		} else {
     		    prevSelectedItem = event.target;
     		  }
     	  }
      }
  } else {
      if (target.id === 'fixed') {
        return;
      } else {
    	  target.style = '';
    	  target.className = '';
    	  prevSelectedItem.style = '';
    	  prevSelectedItem.className = '';
    	  prevSelectedItem = null;
        }
    }
};	
/*функция, ограничивающая клик по третьей ячейке до тех пор, пока не исчезнут 2 предыдущие (если они разного цвета)*/		
document.querySelector('table').onclick = function (event) {
  if (count < 2 && startDate) {
    events(event);
  } else {
      return;
    }  
}
/*функция временной фиксации на экране найденных разных цветов, которые исчезнут через 700 мс*/
function timeOut (target) {
  return setTimeout(() => {		  
    target.style = '';
	 	target.className = '';
	  prevSelectedItem.style = '';
	  prevSelectedItem.className = '';
	  prevSelectedItem = null;
	  count = 0;
	}, 700);
}
/*функция вставки на страницу счетчика с периодичностью 1 мс*/
let startDate;
button.onclick = function () {
  startDate = new Date();
  timerId = setInterval(() => {
    document.querySelector('.counter').innerHTML = counterF(new Date() - startDate);
  }, 1);
}
/*функция вычисления текущих показаний счетчика*/	  
function counterF (value) {
  let minutes = Math.floor(value / (60 * 1000));
  let seconds = Math.floor((value - minutes*1000*60)/1000);
  let milliseconds = value - minutes*60*1000 - seconds*1000;
  minutes < 10 ? minutes = `0${minutes}` : minutes;
  seconds < 10 ? seconds = `0${seconds}` : seconds;
  milliseconds < 10 ? milliseconds = `00${milliseconds}` 
    : (milliseconds < 100 ? milliseconds = `0${milliseconds}` : milliseconds);

  return `${minutes}:${seconds}:${milliseconds}`;
}

buttonOK.onclick = function() {
  document.querySelector('#result').innerHTML = '';
  document.querySelector('#result-form').style.display = 'none';
}





