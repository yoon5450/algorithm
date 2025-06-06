// import './work1.js';
import "./work2.js";
import { solution as solution1 } from "./work1.js";
// import { solution as solution2 } from './work2.js';

const sols = [solution1];
let pageIndex = 0;

// 문제 데이터 : 일단 하드코딩해서 테스트 케이스 채우기.
// 가능한 방법들 : JSON 데이터로 바꿔서 import하기, 백엔드 서버에 올려서 ajax로 문제 데이터 수령
const problemExplain = `
문제 : 가계부 정리

✔️ 문제 설명

당신은 가계부를 정리하려고 합니다. 가계부에는 금액과 플래그(a, s)가 번갈아가며 기록되어 있습니다.

- 초기 자산은 0입니다.
- 금액 다음에는 반드시 하나의 플래그가 옵니다.  ex) 23000a
- 플래그 a는 수입을 의미합니다.
- 플래그 s는 지출을 의미합니다.
- 이러한 금액, 플래그 쌍이 문자열 전체에서 반복됩니다.

주어진 가계부 기록을 보고 총 자산을 계산하는 함수를 작성하세요!
`;
const input = [["10000a4000s3000a"], ["5000a1000s25000a"], ["300s200a"]];
const expectiveValue = [9000, 29000, -100];

let problemSett = [[input, expectiveValue]];

// dom tag 선언
const codeEditor = document.getElementById("input-code");
const lines = document.getElementById("line-number");
const submitBtn = document.getElementById("submitBtn");
const resultTableBody = document.getElementById("result-table-body");
const resultOveray = document.getElementById("overlay");
const overlay = document.getElementById("overlay");
const resultModal = document.getElementById("result-modal");
const closeBtn = document.getElementById("overlay-close-btn");

overlay.addEventListener("click", (e) => {
  e.currentTarget.classList.add("hidden");
});

resultModal.addEventListener("click", (e) => {
  e.stopPropagation();
});

closeBtn.addEventListener("click", (e) => {
  overlay.classList.add("hidden");
});

//DOM Load되었을 때 실행
window.onload = () => {
  let lineNumberText = "";
  for (let i = 1; i < 500; i++) {
    lineNumberText += i + "\n";
  }
  lines.value = lineNumberText;
};

//제출, 실행
submitBtn.addEventListener("click", (e) => {
  try {
    const wrappedCode = `(arg) => { ${codeEditor.value} }`;
    const solution = new Function("return " + wrappedCode)();
    solve(solution);
  } catch (err) {
    resultTableBody.children[1].children[3].textContent = err;
  }
});

//textarea keydown 설정
codeEditor.addEventListener("keydown", function (e) {
  const start = this.selectionStart;
  const end = this.selectionEnd;
  const value = this.value;

  if (e.key === "Tab") {
    e.preventDefault();
    this.value = value.slice(0, start) + "   " + value.slice(end);
    this.selectionStart = this.selectionEnd = start + 2;
  }

  if (e.key === "Enter") {
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const line = value.slice(lineStart, start);
    const indent = line.match(/^\s*/)?.[0] ?? "";

    // 개행해서 textarea를 넘어갔을 때 포커싱해주는 기능
    // 중간에서 개행해도 가장 끝으로 이동하는 문제.
    // setTimeout(() => {
    //   code.scrollTop = code.scrollHeight;
    // }, 0);

    e.preventDefault();
    this.value = value.slice(0, start) + "\n" + indent + value.slice(end);
    const newPos = start + 1 + indent.length;
    this.selectionStart = this.selectionEnd = newPos;
  }
});

// 스크롤 동기화
codeEditor.addEventListener("scroll", () => {
  lines.scrollTop = codeEditor.scrollTop;
  console.log(lines.scrollTop);
});

// 함수 실행
function solve(callback) {
  let output = { value: "" }

  overrideLog(output);
  solveAllProblem(callback, output);
  returnLog();

  // 데이터를 가로채기 위해 console.log 원본 저장 후 override;
  // string형태로 가져오기 때문에 데이터 구조까지 가져오지는 못함.
}

let originLog = console.log;

function overrideLog(output) {
  console.log = (...args) => {
    output.value += args.map(String).join(" ") + "\n";
  };
}

function returnLog() {
  console.log = originLog;
}

// 기능 분리
function solveAllProblem(callback, output) {
  for (let i = 0; i < input.length; i++) {
    solveEachProblem(callback, output, i);
  }
}

//각각 문제 풀고 결과 리턴
function solveEachProblem(callback, output, index) {
  let result = 0;
  output.value = "";

  // arg가 더 적절할까?
  try {
    result = callback(...input[index]);
  } catch (err) {
    output += "[에러] : \n" + err;
  }

  drawView(index, result, output.value);
}

//그리기
function drawView(index, result, output) {
  let outputTr = resultTableBody.children[index];
  outputTr.children[0].textContent = JSON.stringify(input[index]);
  outputTr.children[1].textContent = expectiveValue[index];
  outputTr.children[2].textContent = result;
  outputTr.children[3].textContent = output;

  outputTr.classList.remove("success", "fail");
  if (expectiveValue[index] === result) {
    outputTr.classList.add("success");
    outputTr.children[4].textContent = "정답!";
    resultOveray.classList.remove("hidden");
  } else {
    outputTr.classList.add("fail");
    outputTr.children[4].textContent = "실패";
  }
}

//반드시 한번은 수행됨.
solve(sols[pageIndex]);
