import { Roulette, RouletteEvents } from "./roulette";
import { Messages } from "./messages";
import { MessageType } from "./messages";

const mainMsg = document.getElementById("main-msg");
const chipsCount = <HTMLInputElement>document.getElementById("chipsInput");
const handMsg = <HTMLInputElement>document.getElementById("hand-msg");
const btnStart = <HTMLButtonElement>document.getElementById("start-game");
const spinBtn = <HTMLButtonElement>document.getElementById("spin");
const showBox = <HTMLInputElement>document.getElementById("show-box");

Messages.setMessage("Enter your chips", MessageType.INFO);

let randomNumsShowInt: NodeJS.Timer = null;

function randomShow() {
  randomNumsShowInt = setInterval(() => {
    showBox.innerHTML = Math.floor(Math.random() * 36).toString();
  }, 50);
}

function handleBtnStartGameClick() {
  if (!chipsCount.valueAsNumber || chipsCount.valueAsNumber < 1) {
    Messages.setMessage("You dont have chips", MessageType.ERROR);
    chipsCount.disabled = false;
    return;
  }

  showBox.innerHTML = "";
  spinBtn.disabled = false;
  btnStart.disabled = true;
  chipsCount.disabled = true;
  Messages.setMessage("Place your bets now", MessageType.SUCCESS);
  roulette.startGame(chipsCount.valueAsNumber);
}

function handleBtnSpinClick() {
  if (!roulette.getHand()) {
    Messages.setMessage("You need to pust some chips first!", MessageType.ERROR);
    return;
  }
  randomShow();
  roulette.spin();
}

btnStart.addEventListener("click", handleBtnStartGameClick);
spinBtn.addEventListener("click", handleBtnSpinClick);
const roulette = new Roulette(9, 4, document.getElementById("roulette-body"));


function onChipsChange(chips: number, hand: number) {
  chipsCount.value = chips.toString();
  handMsg.innerText = hand.toString();
}

function onSpinFinished(winAmount: number) {
  clearInterval(randomNumsShowInt);

  // Won the spin
  if (winAmount > 0) {
    Messages.setMessage(`Congrats, you just won ${winAmount} chips!`, MessageType.SUCCESS);
    roulette.setChips(winAmount);
    chipsCount.value = (chipsCount.valueAsNumber + winAmount).toString();
  }


  btnStart.disabled = false;
  spinBtn.disabled = true;
  roulette.endGame();
  handMsg.innerText = roulette.endGame().toString();
  roulette.resetField();
}

const events = new RouletteEvents();
events.onChipsChange = onChipsChange;
events.onSpinFinished = onSpinFinished;
roulette.registerEventListeners(events);

roulette.createTable();