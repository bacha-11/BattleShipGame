var view = {
    displayMessage: function(msg){
        let  messageArea = document.getElementById('messageArea')
        messageArea.innerHTML = msg
    },

    displayHit: function(location){
        let cell = document.getElementById(location)
        cell.setAttribute('class', 'hit')
    },
    
    displayMiss: function(location){
        let cell = document.getElementById(location)
        cell.setAttribute('class', 'miss')
    }

};


var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    // ships: [
    //     { locations: ["06", "16", "26"], hits: ["", "", ""] },
    //     { locations: ["24", "34", "44"], hits: ["", "", ""] },
    //     { locations: ["10", "11", "12"], hits: ["", "", ""] }
    // ],


    ships: [ 
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] } 
        ],

    
    fire: function(guess){
        for(var i=0; i < this.numShips; i++){
            var ship = this.ships[i];
            // var locations = ship.locations;
            // var index = locations.indexOf(guess)
            // chaining the variables. We can also write the above two lines like this
            let index = ship.locations.indexOf(guess) //--> this is called chaining

            if (index >= 0){

                if (ship.hits[index] == ''){
                    
                    ship.hits[index] = 'hit';

                    view.displayHit(guess);
                    view.displayMessage('HIT');
                }else{
                    view.displayHit(guess);
                    view.displayMessage('Already HIT');
                }
                

                if(this.isSunk(ship)){
                    view.displayMessage('You sunk my Battleship!');
                    this.shipsSunk++;
                }
                return true;
            }
        }

        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },


    isSunk: function(ship){
        for(var i=0; i<this.shipLength; i++){
            if (ship.hits[i] !== 'hit'){
                return false;
            }
        }
        return true;
    },


    generateShipLocations: function() {
        var locations;
        for (var i = 0; i < this.numShips; i++) {
            do {
                locations = this.generateShip();
            }while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },


    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }


        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            }else {
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },


    collision: function(locations) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = model.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
};



let controller = {
    guesses: 0,

    processGuess: function(guess){
        let location = this.parseGuess(guess);
        if (location){
            this.guesses++;
            let hit = model.fire(location);
            
            if (hit && model.numShips === model.shipsSunk){
                view.displayMessage("You sank all my battleships, in " +
                this.guesses + " guesses")
            }

        }

    },

    parseGuess: function(guess){

        let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

        if(guess === null || guess.length !== 2 ){
            alert("Oops, please enter a letter and a number on the board!")
        }
        else{
            let firstChar = guess.charAt(0)
            let row = alphabet.indexOf(firstChar)
            let column = guess.charAt(1)

            if(isNaN(row) || isNaN(column)){
                alert("Oops, that isn't on the board")

            }else if( row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
                alert("Oops, that's off the board!")

            }else{
                return row + column
            }
        }
        return null
    }
};


function init(){
    let fireButton = document.getElementById('fireButton');
    fireButton.onclick = handleFireButton;

    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    model.generateShipLocations();
}


function handleFireButton(){
    if ( model.shipsSunk == 3){
        alert('You already sank all my battleships')
    }else{
        var guessInput = document.getElementById("guessInput");
        var guess = guessInput.value;
        controller.processGuess(guess)
        guessInput.value = ""
    }
}


function handleKeyPress(e) {
    if ( model.shipsSunk == 3){
        alert('You already sank all my battleships')
    }else{
        var fireButton = document.getElementById("fireButton");
        if (e.keyCode === 13) {
            fireButton.click();
            return false;
        }
    }
}

window.onload = init;

