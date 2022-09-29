// Main React logic

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as Model from './Models.js';
import * as Utility from './Utilities.js';
import * as Constant from './Constants.js';



function PreparePlayers(name1, name2) {
    let players = {};
    let p1 = new Model.Player(name1, 1);
    let p2 = new Model.Player(name2, -1);

    for (let p of Constant.pieces) {
        for (let wl of p.locations.white) {
            p1.AddPiece(p.getPiece(p.name, wl, p1, 'white'));
        }

        for (let bl of p.locations.black) {
            p2.AddPiece(p.getPiece(p.name, bl, p2, 'black'));
        }
    }


    players[p1.name] = p1;
    players[p2.name] = p2;

    return players;
}


// React components

class Square extends React.Component {
    constructor(props) {
        super(props);

        // bind local methods
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.squareClick(this.props.squareCode);
    }
    render() {
        const color = this.props.piece ? this.props.piece.color : '';
        const code = this.props.piece ? this.props.piece.code : '';
        return (
            <div className={`square ${this.props.squareColor} ${color}`} onClick={this.handleClick}>
                <h1>{code}</h1>
            </div>
        );
    }
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log("Oops, if you see this message, it means React error boundary is working!");
    }

    render() {
        if (this.state.hasError) {
            return <h1 className='error'>Oops, if you see this message, it means React error boundary is working!</h1>
        }

        return this.props.children;
    }
}

class TriggerError extends React.Component {
    constructor(props) {
        super(props);
        this.handleTriggerErrorClick = this.handleTriggerErrorClick.bind(this);
        this.state = { triggerError: false }
    }

    handleTriggerErrorClick() {
        this.setState({ triggerError: true });
    }

    render() {
        if (this.state.triggerError) {
            throw Error("Trigger React error boundary!");
        }

        return (
            <React.Fragment>
                <button type='button' className='button' onClick={this.handleTriggerErrorClick}>Trigger error</button>
            </React.Fragment>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        const players = PreparePlayers('Player 1 zhen kai', 'Player 2 zk');
        let squares = {};

        // set up squares
        for (let row = 0; row < Constant.boardRow; row++) {
            for (let col = 0; col < Constant.boardCol; col++) {
                squares[Constant.colStr[col] + (row + 1)] = null;
            }
        }

        // add pieces to square
        for (let player in players) {
            for (let piece of players[player].pieces) {
                squares[piece.location] = piece;
            }
        }

        this.selectedPiece = null;

        //set state
        this.state = {
            squares, players
        };

        // bind local methods
        this.squareClick = this.squareClick.bind(this);
    }

    squareClick(squareCode) {
        if (this.state.squares[squareCode] && (!this.selectedPiece || this.state.squares[squareCode].owner === this.selectedPiece.owner)) {
            // case where player select piece
            if (!this.selectedPiece) {
                Utility.LogMessage(`You have selected: ${String(this.selectedPiece)}. Current square code ${squareCode}`);
            } else {
                Utility.LogMessage(`You have reselected: ${String(this.selectedPiece)}. Current square code ${squareCode}`);
            }
            this.selectedPiece = this.state.squares[squareCode];
        } else {
            // case where player select location
            if (!this.selectedPiece) {
                // case where player select a location without select a piece first
                Utility.LogMessage('You must select a piece first');
                return;
            }
            Utility.LogMessage(`You selected a location: ${squareCode}, moving ${String(this.selectedPiece)} to ${squareCode}`);
            let squares = this.state.squares;
            let selectedSquare = squares[squareCode];
            if (this.selectedPiece.CheckMove(squareCode)) {
                if (selectedSquare && selectedSquare.owner !== this.selectedPiece.owner) {
                    // perform capture move
                    let players = this.state.players;
                    players[selectedSquare.owner.name].RemovePiece(selectedSquare);
                    Utility.LogMessage('Capture piece');

                    this.setState({ players });
                }
                squares[this.selectedPiece.location] = null;
                this.selectedPiece.location = squareCode;
                squares[squareCode] = this.selectedPiece;
            }

            this.setState({ squares });
            this.selectedPiece = null;
        }
    }

    render() {

        // draw board
        let isLight = false;
        let boards = [];
        for (let row = Constant.boardRow - 1; row >= 0; row--) {
            isLight = !isLight;
            for (let col = 0; col < Constant.boardCol; col++) {
                const color = isLight ? 'light' : 'dark';
                const squareCode = Constant.colStr[col] + (row + 1);
                boards.push(<Square squareColor={color} key={squareCode} squareClick={this.squareClick} squareCode={squareCode} piece={this.state.squares[squareCode]} />);
                isLight = !isLight;
            }
        }

        return (boards);
    }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<ErrorBoundary>
    <section className="board">
        <Board />
    </section>
    <TriggerError />
</ErrorBoundary>);