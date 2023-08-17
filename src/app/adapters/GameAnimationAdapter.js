import IGameAdapter from '../core/interfaces/IGameAdapter';

class GameAnimationAdapter extends IGameAdapter {
  startGame(gameParameters) {
    // For demonstration purposes, let's assume it returns a URL to a game animation
    const animationURL = `/animations/${gameParameters.gameType}.mp4`;
    return animationURL;
  }
}

export default GameAnimationAdapter;
