import ChatAdapter from "../../core/interfaces/ChatAdapter";

class ChatGPTAdapter extends ChatAdapter {
  async fetchResponse(messageContent) {
    try {
      const response = await fetch('http://localhost:5000/students/1234/solve', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: messageContent }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return data.response; 
    } catch (error) {
      console.error('There was a problem fetching the chat response:', error);
      return 'Lo siento, hubo un error al procesar tu solicitud.';
    }
  }
}

export default ChatGPTAdapter;
