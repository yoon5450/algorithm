import { solution as solution1 } from "./work1.js";
import { solution as solution2 } from "./work2.js";

const sols = [solution1, solution2];
let pageIndex = 0;

// dom tag 선언
const code = document.getElementById("input-code");
const lines = document.getElementById("line-number");
const submitBtn = document.getElementById("submitBtn");

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
  const editor = document.getElementById("input-code");
  const userCode = `${editor.value}`;
  const solution = new Function("a", "b", userCode);
  solve(solution);
});

//textarea keydown 설정
code.addEventListener("keydown", function (e) {
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
  const str = 10;
  const weed = 2;
  console.log(callback(str, weed));
}

function sol(index) {
  try {
    console.log(sols[index]());
  } catch (err) {
    console.log(err, "에러 발생");
  }
}

sol(pageIndex);
