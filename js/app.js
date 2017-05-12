// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = row / 6 * 506 - 25;
    this.speed = speed * getRandomInt(1,10);
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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
}

Player.prototype.handleInput = function(input) {
    this.keyPress = input;
}

Player.prototype.update = function() {
    if (this.keyPress === 'left'){
        if (this.x > 0){
            this.x -= 101;
        }
    } else if (this.keyPress === 'up'){
        if (this.y > 0){
            this.y -= 101;
        }
    } else if (this.keyPress === 'right'){
        if (this.x < 404){
            this.x += 101;
        }
    } else if (this.keyPress === 'down'){
        if (this.y < 404){
            this.y += 101;
        }
    }
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


var allEnemies = [];
var player = new Player();
var getEnemies = function() {
    for (var i = 1; i < 5; i++){
        allEnemies.push(new Enemy(i, getRandomInt(10, 20)))
    }
}
getEnemies();
getEnemies();


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
