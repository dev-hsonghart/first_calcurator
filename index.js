// 계산기 구현 기능
// 1. 기본적인 사칙연산이 가능할 것
// 2. 등부호를 통해 연산이 실행될 것
// 3. 2*2일 경우 등부호 없이 연산이 실행될 것
// 4. 초기화 버튼이 있을 것 

const displayResult = document.querySelector("span"),
  btnReset = document.querySelector(".calc-reset"),
  btnCalc = document.querySelectorAll(".calc"),
  btnNum = document.querySelectorAll(".num"),
  btnEqual = document.querySelector(".equal"),
  calcHidden = document.querySelector(".hidden"),
  btnTimes = document.querySelector(".calc-time");

function emptyHidden(){
  if(calcHidden.innerText !== null){
    calcHidden.innerText = "";
  }
}

function emptyDisplay(){
  displayResult.innerText = "";
}

function resetView(){
  emptyDisplay()
  emptyHidden()
  const hiddenClass = calcHidden.classList,
  displayClass = displayResult.classList;
  hiddenClass.remove("timeTwo" , "addCalc");
  displayClass.add("resetDisplay");
  displayClass.remove("timeRuned");
}

function funCalc(){
  const hiddenText = calcHidden.innerText,
    hiddenClass = calcHidden.classList,
    displayClass = displayResult.classList;

  if(displayClass.contains("resetDisplay") !== true && hiddenClass.contains("addCalc") !== true && displayClass.contains("equalRuned") !== true){
    displayResult.innerText = eval(hiddenText);
    emptyHidden();
    displayClass.add("equalRuned");
  } 
}



function addTime(event){ //곱하기 연산자
  const targetCalc = event.target.innerText,
    hiddenText = calcHidden.innerText,
    hiddenClass = calcHidden.classList,
    displayClass = displayResult.classList;

  event.preventDefault();  
  if(hiddenClass.contains("addCalc") !== true  && displayClass.contains("resetDisplay") !== true  ){
    if(hiddenText.indexOf("2*2") === 0 &&
    hiddenText.indexOf("1") === -1 &&
    hiddenText.indexOf("3") === -1 &&
    hiddenText.indexOf("4") === -1 &&
    hiddenText.indexOf("5") === -1 &&
    hiddenText.indexOf("6") === -1 &&
    hiddenText.indexOf("7") === -1 &&
    hiddenText.indexOf("8") === -1 &&
    hiddenText.indexOf("9") === -1 &&
    hiddenText.indexOf("0") === -1 &&
    hiddenText.indexOf("+") === -1 &&
    hiddenText.indexOf("-") === -1 &&
    hiddenText.indexOf("/") === -1
     ){// 2를 연속으로 곱할 경우 등부호 없이 바로 결과 출력
      calcHidden.innerText = hiddenText + `${targetCalc}`;
      displayResult.innerText = eval(hiddenText);
      hiddenClass.add("timeTwo" , "addCalc");
    }else{
      calcHidden.innerText = hiddenText + `${targetCalc}`;
      emptyDisplay();
      hiddenClass.add("addCalc");
    }
  }  
}

function addCalc(event){ // 곱하기를 제외한 사칙연산
  event.preventDefault();
  const targetCalc = event.target.innerText,
  hiddenText = calcHidden.innerText,
    hiddenClass = calcHidden.classList,
    displayClass = displayResult.classList;
    
    if(hiddenClass.contains("addCalc") !== true  && displayClass.contains("resetDisplay") !== true  ){
      calcHidden.innerText = hiddenText + `${targetCalc}`
      emptyDisplay()
      calcHidden.classList.add ("addCalc")
    }
  }

function displayValue(event){
  event.preventDefault();
  const hiddenClass = calcHidden.classList,
  displayClass = displayResult.classList,
  hiddenText = calcHidden.innerText,
  displayText = displayResult.innerText;

  const targetNum = event.target.innerText;

  if(displayText === "0" || displayClass.contains("equalRuned") === true || hiddenClass.contains("timeTwo")){
      emptyDisplay()
      displayResult.innerText = targetNum;
      calcHidden.innerText = hiddenText + `${targetNum}`
  } else{
    displayResult.innerText = displayText + targetNum;
    calcHidden.innerText = hiddenText + `${targetNum}`
  }
  

  if( hiddenClass.contains("addCalc") === true){
    hiddenClass.remove( "addCalc")
  }

  displayClass.remove("resetDisplay" , "equalRuned")
}

function init(){
  for(let i = 0; i < btnNum.length; i++) {
    btnNum[i].addEventListener("click", displayValue);
    }

  for(let i = 0; i < btnCalc.length; i++) {
    btnCalc[i].addEventListener("click", addCalc);
    }
  btnEqual.addEventListener("click", funCalc);
  btnReset.addEventListener("click", resetView);
  btnTimes.addEventListener("click", addTime);
  } 

init();