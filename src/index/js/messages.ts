export enum MessageType {
  INFO,
  SUCCESS,
  ERROR
}

export class Messages {
  public constructor(private readonly messageBox: HTMLElement) {
  }

  public static setMessage(msg: string, type: MessageType = MessageType.INFO) {
    if (type == MessageType.INFO) {
      document.getElementById("main-msg").innerHTML = `<span class="msgInfo">${msg}</span>`;
    } else if (type == MessageType.SUCCESS) {
      document.getElementById("main-msg").innerHTML = `<span class="msgSuccess">${msg}</span>`;
    } else if (type == MessageType.ERROR) {
      document.getElementById("main-msg").innerHTML = `<span class="msgError">${msg}</span>`;
    }
  }
}