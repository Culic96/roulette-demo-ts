let numbersMap = new Map<string, number>();
const mainMsg = <HTMLScriptElement>document.getElementById("main-msg");
const rouletteBody = <HTMLScriptElement>document.getElementsByClassName("roulette-body")[0];
const chipsCount = <HTMLScriptElement>document.getElementById("chipsinput");

mainMsg.innerHTML = "Set your chips.";
let chips: number = 0;
let hand: number = 0;

function createTable(width: number, height: number) {
  // columns += `<td id=num-${0}><button class="btn-green">${currNumber}</button></td>`;
  for (let i = 1; i <= height; i++) {

    let rows = "<tr>";
    let columns = "";
    let currNumber = i;
    numbersMap.set(`num-${currNumber}`, currNumber);
    for (let j = 0; j < width; j++) {

      if ((i + j) % 2 != 0) {
        columns += `<td id=num-${currNumber}><button class="btn-black">${currNumber}</button></td>`;
      } else {
        columns += `<td id=num-${currNumber}><button class="btn-red">${currNumber}</button></td>`;
      }

      currNumber += height;
    }

    rows += "</tr>";
    rows += columns;
    rouletteBody.innerHTML += rows;
  }
}
createTable(9, 4);
console.log(numbersMap);