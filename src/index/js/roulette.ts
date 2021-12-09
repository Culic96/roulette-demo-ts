import { Messages, MessageType } from "./messages";

export class RouletteEvents {
  public onChipsChange: (chips: number, hand: number) => void;
  public onSpinFinished: (winAmount: number) => void;
}

export class Roulette {
  private numbersMap: Map<string, number>;
  private chips: number;
  private hand: number;

  private events: RouletteEvents;

  public constructor(
    private readonly tableWidth: number,
    private readonly tableHeight: number,
    private readonly rouletteRoot: HTMLElement) {

    this.numbersMap = new Map<string, number>();
    this.chips = 0;
    this.hand = 0;
  }

  public createTable(): void {
    const divLeft = document.createElement("div");
    const divRight = document.createElement("div");

    const btnZero = document.createElement("button");
    btnZero.classList.add("btn-green");
    btnZero.innerText = "0";
    btnZero.addEventListener("click", this.btnClicked.bind(this, 0));

    divLeft.appendChild(btnZero);

    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    divRight.appendChild(table);
    divRight.appendChild(tBody);

    for (let i = 1; i <= this.tableHeight; i++) {
      const row = document.createElement("tr");
      table.appendChild(row);

      let currNumber = i;
      this.numbersMap.set(`num-${currNumber}`, currNumber);

      for (let j = 0; j < this.tableWidth; j++) {
        const id = `num-${currNumber}`;
        const td = document.createElement("td");
        td.setAttribute("id", id);
        row.appendChild(td);

        const btn = document.createElement("button");
        td.appendChild(btn);
        btn.innerText = currNumber.toString();
        btn.addEventListener("click", this.btnClicked.bind(this, currNumber));

        if ((i + j) % 2 != 0) {
          btn.classList.add("btn-black");
        } else {
          btn.classList.add("btn-red");
        }

        currNumber += this.tableHeight;
      }
    }

    this.rouletteRoot.appendChild(divLeft);
    this.rouletteRoot.appendChild(divRight);
  }

  public resetField() {
    const nullNum = 0;
    for (let i = 0; i < 37; i++) {
      this.numbersMap.set((`num-${i}`), nullNum);
    }
  }

  public setChips(newChips: number) {
    this.chips += newChips;
  }

  public getChips() {
    return this.chips;
  }

  public getHand() {
    return this.hand;
  }

  public startGame(startingChips: number) {
    this.chips = startingChips;
  }

  public endGame() {
    return this.hand = 0;
  }

  public getNumberAtField(fieldKey: string) {
    return this.numbersMap.get(fieldKey);
  }

  public registerEventListeners(events: RouletteEvents) {
    this.events = events;
  }

  public spin(): void {
    setTimeout(() => {
      const result = Math.floor(Math.random() * 36);
      const winAmount = (this.numbersMap.get(`num-${result}`) ?
        this.numbersMap.get(`num-${result}`) : 0) * 36;

      this.events.onSpinFinished(winAmount);
    }, 1000);

  }

  private btnClicked(i: number) {
    if (!this.numbersMap.get(`num-${i}`)) {
      this.numbersMap.set(`num-${i}`, 0);
    }

    console.log(this.numbersMap);
    if (this.chips > 0) {
      this.chips--;
      this.hand++;
      this.numbersMap.set(`num-${i}`, this.numbersMap.get(`num-${i}`) + 1);
      this.events.onChipsChange(this.chips, this.hand);
    } else {
      Messages.setMessage("Not enough chips!", MessageType.ERROR);
      this.hand = 0;
      return;
    }
  }
}