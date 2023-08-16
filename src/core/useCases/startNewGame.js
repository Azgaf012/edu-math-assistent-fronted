import GameAdapter from "../interfaces/GameAdapter";

class StartNewGame {
  constructor(adapter) {
    if (!(adapter instanceof GameAdapter)) {
      throw new Error('Adapter must implement IGameAdapter');
    }
    this.adapter = adapter;
  }

  async execute(gameParameters) {
    try {
      const gameData = await this.adapter.startGame(gameParameters);
      return gameData;
    } catch (error) {
      throw error;
    }
  }
}

export default StartNewGame;
