
// spin button
const spinButton = document.querySelector('#spin-button');

const baseReel = ['A', 'B', 'A', 'C', 'E', 'B', 'C', 'D', 'A', 'E', 'B'];
const slotMachine = {
  reel1: {
    symbols: [...baseReel],
    position: 0,
    count: null,
    element: document.getElementById('reel1')
  },
  reel2: {
    symbols: [...baseReel],
    position: 0,
    count: null,
    element: document.getElementById('reel2')
  },
  reel3: {
    symbols: [...baseReel],
    position: 0,
    count: null,
    element: document.getElementById('reel3')
  },
  reels: null,
  init: function() {
    this.reels = [this.reel1, this.reel2, this.reel3];
    this.reels.forEach((reel, i) => {
      reel.position = Math.floor(Math.random() * reel.symbols.length);
      reel.element.innerHTML = `<div class="reel-item">${reel.symbols[reel.position]}</div>`;
    });
  },
  spin: function() {
    return new Promise(resolve => {
      this.reel3.count = Math.floor((Math.random() * 5) + 35);
      this.reel2.count = this.reel3.count - (Math.floor(Math.random() * 3) + 2);
      this.reel1.count = this.reel2.count - (Math.floor(Math.random() * 3) + 2);
  
      console.log('counts: ', this.reel3.count, this.reel2.count, this.reel1.count);
      for (let i = 0; i <= this.reel3.count; i++) {
        setTimeout(() => {
          this.reels.forEach((reel, index) => {
            if (i < reel.count) {
              reel.position = reel.position === 10 ? 0 : reel.position + 1;
              reel.element.innerHTML = `<div class="reel-item">${reel.symbols[reel.position]}</div>`;
            }
          });
          if (i === this.reel3.count) {
            resolve();
          }
        }, i * 150);
      }
    })
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
  slotMachine.spin()
    .then(() => {
      slotMachine.consoleDisplay();
    });
  
});

