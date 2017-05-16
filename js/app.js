'use strict';

// Enemy sprite
var Enemy = function(row) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = row * 84 - 25;
    this.speed = getRandomInt(10, 20) * getRandomInt(1,10);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -100;
    } else {
        this.x = this.x + this.speed * dt;
    }

    if (this.x >= player.x - 70 && this.x <= player.x + 70 && this.y >= player.y - 10 && this.y <= player.y + 10) {
        console.log("YOU LOSE");
        player.reset();
    }
} ;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player sprite
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
};

// Resets player to starting position
Player.prototype.reset = function(){
    this.x = 202;
    this.y = 395;
};

// Not needed
Player.prototype.update = function(){};
 
// Player movement and boundries. Also reset if you win.
Player.prototype.handleInput = function (key) {
    switch (key) {
    case 'left':
        if (this.x > 0) {
            this.x -= 101;
        }
        break;
    case 'right':
        if (this.x < 404) {
            this.x += 101;
        }
        break;
    case 'up':
        if (this.y > 0) {
            this.y -= 84;
            if (this.y < 59) {
                console.log("YOU WIN");
                this.reset();
            }
        }
        break;
    case 'down':
        if (this.y < 395) {
            this.y += 84;
        }
        break;
    }
};

// Draws the player
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Random Int helper function
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Creates one enemy for each line with random speed
var allEnemies = [];
var player = new Player();
for (var i = 1; i < 5; i++){
    allEnemies.push(new Enemy(i));
}
    
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
