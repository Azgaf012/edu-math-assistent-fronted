export default class ChatMessage {
  constructor(sender, data, timestamp) {
    this.sender = sender;
    this.responseMessage = data;
    this.timestamp = timestamp;
  }
}