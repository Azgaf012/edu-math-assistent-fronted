class ChatAdapter {
    // This method should fetch a response from some chat service.
    async fetchResponse(messageContent) {
      throw new Error('Method fetchResponse() must be implemented by the adapter');
    }
  }
  
  export default ChatAdapter;
  