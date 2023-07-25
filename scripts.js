// spin button
const spinButton = document.querySelector('#spin-button');

const baseReel = ['A', 'B', 'A', 'C', 'B', 'D', 'C', 'E', 'D', 'F'];
const slotMachine = {
  reel1: {
    symbols: [...baseReel],
    position: 0
  },
  reel2: {
    symbols: [...baseReel],
    position: 0
  },
  reel3: {
    symbols: [...baseReel],
    position: 0
  },
  reels: null,
  init: function() {
    this.reels = [this.reel1, this.reel2, this.reel3];
    this.reels.forEach(reel => {
      reel.position = Math.floor(Math.random() * reel.symbols.length);
    });
  },
  spin: function() {
    this.reels.forEach(reel => {
      let spinCount = Math.floor(Math.random() * reel.symbols.length);
      reel.position = (reel.position + spinCount) % reel.symbols.length;
    });
  },
  isWin: function() {
    const firstReelSymbol = this.reel1.symbols[this.reel1.position];
    return this.reels.every(reel => {
      return reel.symbols[reel.position] === firstReelSymbol;
    });
  },
  consoleDisplay: function() {
    const text = this.isWin() ? 'THE HEAT IS ON!!!' : 'fail';
    console.log(`*** ${text} ***`);
    this.reels.forEach((reel, index) => {
      console.log(`reel ${index + 1}: ${reel.symbols[reel.position]}`);
    });
  }
}

slotMachine.init();
slotMachine.consoleDisplay();

spinButton.addEventListener('click', () => {
  slotMachine.spin();
  slotMachine.consoleDisplay();
});

