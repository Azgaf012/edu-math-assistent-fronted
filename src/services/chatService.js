import axios from 'axios';

class ChatService {
    async sendMessage(question) {
        // Cambie esto por la URL de su API
        const url = 'http://localhost:5000/students/1234/solve';

        try {
            const response = await axios.post(url, { question });
            return response.data;
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            return null;
        }
    }
}

const chatService = new ChatService();

export default chatService;
