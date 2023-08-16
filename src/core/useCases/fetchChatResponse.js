import ChatAdapter from "../interfaces/ChatAdapter";

class FetchChatResponse {
  constructor(adapter) {
    if (!(adapter instanceof ChatAdapter)) {
      throw new Error('Adapter must implement ChatAdapter');
    }
    this.adapter = adapter;
  }

  async execute(messageContent) {
    try {
      const response = await this.adapter.fetchResponse(messageContent);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default FetchChatResponse;
