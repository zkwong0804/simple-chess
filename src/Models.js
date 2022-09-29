// Javascript model classes

import * as Utility from './Utilities.js';
import * as Constant from './Constants.js';

// Javascript classes
class Piece {
    constructor(name, location, owner, color, code) {
        this.location = location;
        this.name = name;
        this.owner = owner;
        this.color = color;
        this.code = code;
    }

    Move(location) {
        if (this.CheckMove(location)) {
            console.log(`Pice ${this.name} can move from ${this.location} to ${location}`);
            this.location = location;
        } else {
            console.log(`Pice ${this.name} can't move from ${this.location} to ${location}`);
        }
    }

    CheckMove(location) {
        return true;
    }

    toString() {
        return `${this.name}, ${this.color} at ${this.location}`
    }
}

class Pawn extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Pa');
    }

    CheckMove(location) {
        const curLoc = GetLocationArr(this.location);
        const targetLoc = GetLocationArr(location);
        const verticalDiff = (targetLoc.vertical - curLoc.vertical) * this.owner.moveDirection;
        const horizontalDiff = targetLoc.horizontal - curLoc.horizontal;

        if (verticalDiff > 1) {
            if (verticalDiff === 2 && (curLoc.vertical === 7 || curLoc.vertical === 2)) return true;
            return false;
        }
        if (verticalDiff<0) return false;

        if (horizontalDiff > 1 || horizontalDiff < -1) return false;
        return true;
    }
}

class Bishop extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Bi')
    }

    CheckMove(location) {
        console.log('Bishop check move');
        return true;
    }

}

class Knight extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Kn')
    }

}

class Rook extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Rk')
    }

}

class Queen extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Qn')
    }

}

class King extends Piece {
    constructor(name, location, owner, color) {
        super(name, location, owner, color, 'Kg')
    }

}

class Player {
    constructor(name, moveDirection) {
        this.name = name;
        this.moveDirection = moveDirection;
        this.pieces = [];
        for (let p in Constant.pieces) {
            for (let i = 0; i < p.count; i++) {
                this.pieces.push(p.getPiece())
            }
        }
    }

    AddPiece(piece) {
        this.pieces.push(piece);
    }

    RemovePiece(piece) {
        Utility.LogMessage(`Removing ${piece} from player: ${this.name}`);
        for (let i = 0; i < this.pieces.length; i++) {
            const cur = this.pieces[i];
            if (cur.location === piece.location && cur.name === piece.name) {
                this.pieces.splice(i, 1);
            }
        }
    }
    
    GetPieces() {
        return this.pieces;
    }

}

// Javascript methods
function GetLocationArr(location) {
    return {vertical: location[1], horizontal: Constant.boardDictReverse[location[0]]};
}

export {Pawn, Rook, Bishop, Knight, Queen, King, Player}