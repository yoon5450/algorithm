import { solution as solution1 } from "./work1.js";
import { solution as solution2 } from "./work2.js";

const sols = [solution1, solution2];
let pageIndex = 0;

// dom tag 선언
const codeEditor = document.getElementById("input-code");
const lines = document.getElementById("line-number");
const submitBtn = document.getElementById("submitBtn");
const resultTableBody = document.getElementById("result-table-body");




// 문제 데이터
const input = [[10, [9, 19, 20, 50, 80, 50, 20, 140]]];
const expectiveValue = [398];

//DOM Load되었을 때 실행
document.addEventListener("DOMContentLoaded", () => {
  let lineNumberText = "";
  for (let i = 1; i < 500; i++) {
    lineNumberText += i + "\n";
  }
  lines.value = lineNumberText;
});

//제출, 실행
submitBtn.addEventListener("click", (e) => {
  const wrappedCode = `(str, weed) => { ${codeEditor.value} }`;
  const solution = new Function("return " + wrappedCode)();
  solve(solution);
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
code.addEventListener("scroll", () => {
  lines.scrollTop = code.scrollTop;
  console.log(lines.scrollTop);
});

// 함수 실행
function solve(callback) {
  // 데이터를 가로채기 위해 console.log 원본 저장 후 override;
  // 데이터 구조까지 가져오지는 못함.
  let output = "";
  let originLog = console.log;

  console.log = (...args) => {
    output += args.map(String).join(" ") + "\n";
  };

  for (let i = 0; i < input.length; i++) {
    let outputTd = resultTableBody.children[i];
    output = "";
    let result = 0;

    try {
      result = callback(...input[i]);
    } catch (err) {
      output += "[에러] : \n" + err;
    }

    outputTd.children[0].textContent = JSON.stringify(input[i]);
    outputTd.children[1].textContent = expectiveValue[i];
    outputTd.children[2].textContent = result;
    outputTd.children[3].textContent = output;
  }

  //원본으로 되돌리기
  console.log = originLog;
}

function sol(index) {
  let output = "";

  try {
    console.log(sols[index]());
  } catch (err) {
    console.log(err, "에러 발생");
  }
}

sol(pageIndex);
