// spin button
const spinButton = document.querySelector('#spin-button');

const baseReel = ['cat', 'ramen', 'sushi', 'shroom', 'cat', 'ramen', 'sushi', 'cherry', 'bar', 'ramen', 'seven', 'cat', 'bar', 'sushi', 'cherry', 'ramen', 'shroom', 'ramen', 'cat', 'sushi'];
const winSong = new Audio('audio/win.mp3');
const winOverlay = document.querySelector("#win-overlay");

// To show the overlay when a win occurs
function showWinOverlay() {
  winOverlay.style.visibility = 'visible';
  winOverlay.style.opacity = '1';
}

// To hide the overlay when needed
function hideWinOverlay() {
  winOverlay.style.visibility = 'hidden';
  winOverlay.style.opacity = '0';
}

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
      reel.element.innerHTML = `<img class="reel-item" src="img/${reel.symbols[reel.position]}.jpg" alt="${reel.symbols[reel.position]}"/>`;
    });
  },
  spinSound: function() {
    const variant = Math.floor((Math.random() * 6) + 1);
    const sound = new Audio(`audio/spinSound${variant}.mp3`);
    sound.play();
  },
  spin: function() {
    spinButton.classList.add('disabled');
    this.spinSound();
    return new Promise(resolve => {
      this.reel3.count = Math.floor((Math.random() * 5) + 27);
      this.reel2.count = this.reel3.count - (Math.floor(Math.random() * 5) + 3);
      this.reel1.count = this.reel2.count - (Math.floor(Math.random() * 4) + 3);
      let delay = 0
      for (let i = 0; i <= this.reel3.count; i++) {
        if (i >= 20) {
          delay++;
        }
        setTimeout(() => {
          this.reels.forEach(reel => {
            if (i < reel.count) {
              reel.position = reel.position === (reel.symbols.length - 1) ? 0 : reel.position + 1;
              reel.element.innerHTML = `<img class="reel-item" src="img/${reel.symbols[reel.position]}.jpg" alt="${reel.symbols[reel.position]}"/>`;
            }
          });
          if (i === this.reel3.count) {
            resolve();
          }
        }, i * (78 + delay));
      }
    })
  },
  isWin: function() {
    const firstReelSymbol = this.reel1.symbols[this.reel1.position];
    return this.reels.every(reel => {
      return reel.symbols[reel.position] === firstReelSymbol;
    });
  },
  checkOutcome: function() {
    if (this.isWin()) {
      winSong.play();
      setTimeout(() => {
        showWinOverlay();
      }, 1650);
      // Add event listener for the escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {  // Escape key is 27
          hideWinOverlay();  // Assumes you have this function
          if (!winSong.paused) {  // If the song is still playing
            winSong.pause();  // Pause the song
            winSong.currentTime = 0;  // Reset song to start
          }
        }
      });
    }
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

spinButton.addEventListener('click', () => {
  slotMachine.spin()
    .then(() => {
      spinButton.classList.remove('disabled');
      slotMachine.checkOutcome();
    });
  
});

