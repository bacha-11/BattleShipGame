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
    shipSunk: 0,

    ships: [
        { locations: ["06", "16", "26"], hits: ["", "", ""] },
        { locations: ["24", "34", "44"], hits: ["", "", ""] },
        { locations: ["10", "11", "12"], hits: ["", "", ""] }
    ],

    
    fire: function(guess){
        for(var i=0; i < this.boardSize; i++){
            var ship = this.ships[i];
            var locations = ship.locations;
            let index = locations.indexOf(guess)
            // chaining the variables. We can also write the above two lines like this
            // let index = ship.locations.indexOf(guess) --> this is called chaining
            if (index >= 0){
                ship.hits[index] = 'hit';

                view.displayHit(guess);
                view.displayMessage('HIT');

                if(this.isSunk(ship)){
                    view.displayMessage('You sunk my Battleship!');
                    this.shipSunk++;
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
    }
};

model.fire('01')
model.fire('06')

model.fire('26')
