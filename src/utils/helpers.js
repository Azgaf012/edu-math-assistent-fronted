/**
 * Extract and format the error message from a Fetch API response.
 * @param {Response} response - The Fetch API response.
 * @returns {string} - The extracted and formatted error message.
 */
export const extractErrorMessage = async (response) => {
    try {
      const data = await response.json();
      return data.message || 'An unknown error occurred.';
    } catch (error) {
      return 'An error occurred while processing your request.';
    }
  };
  
  /**
   * Format a user's message for display in the chat window.
   * @param {string} content - The message content.
   * @returns {object} - The formatted message object.
   */
  export const formatUserMessage = (content) => {
    return { sender: 'user', content };
  };
  
  /**
   * Format the assistant's message for display in the chat window.
   * @param {string} content - The message content.
   * @returns {object} - The formatted message object.
   */
  export const formatAssistantMessage = (content) => {
    return { sender: 'assistant', content };
  };
  
  /**
   * Generate a math question for the game based on the difficulty.
   * @param {string} difficulty - The difficulty level (e.g., 'easy', 'medium', 'hard').
   * @returns {string} - A math question.
   */
  export const generateMathQuestion = (difficulty) => {
    // Implement logic to generate a math question based on difficulty.
    // This is just a placeholder for demonstration purposes.
    return 'What is 2 + 2?';
  };
  
  // ... any other helper functions you need.
  