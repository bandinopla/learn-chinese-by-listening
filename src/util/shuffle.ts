export const shuffleArray = <T>(array:Array<T>) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  };