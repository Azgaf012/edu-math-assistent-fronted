class ChatMessage {
    constructor(id, sender, content, timestamp) {
      this.id = id;               // A unique identifier for the message.
      this.sender = sender;       // Who sent the message: 'user', 'assistant', etc.
      this.content = content;     // The actual content of the message.
      this.timestamp = timestamp; // When the message was sent.
    }
  
    // You can add methods related to behavior of a chat message, if needed.
    // For instance, a method to format the timestamp, etc.
    formatTimestamp() {
      // Return the timestamp in a friendly format, for instance.
    }
  }
  
  export default ChatMessage;
  