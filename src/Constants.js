// Constant definitions

import * as Model from './Models.js';

export const boardDictReverse = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,

}

export const pieces = [
    {
        getPiece: (name, location, owner, color, code) => new Model.Pawn(name, location, owner, color, code),
        name: 'Pawn',
        locations: {
            white: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
            black: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7']
        }
    },
    {
        getPiece: (name, location, owner, color, code) => new Model.Bishop(name, location, owner, color, code),
        name: 'Bishop',
        locations: {
            white: ['C1', 'F1'],
            black: ['C8', 'F8']
        }
    },
    {
        getPiece: (name, location, owner, color, code) => new Model.Knight(name, location, owner, color, code),
        name: 'Knight',
        locations: {
            white: ['B1', 'G1'],
            black: ['B8', 'G8']
        }
    },
    {
        getPiece: (name, location, owner, color, code) => new Model.Rook(name, location, owner, color, code),
        name: 'Rook',
        locations: {
            white: ['A1', 'H1'],
            black: ['A8', 'H8']
        }
    },
    {
        getPiece: (name, location, owner, color, code) => new Model.Queen(name, location, owner, color, code),
        name: 'Queen',
        locations: {
            white: ['D1'],
            black: ['D8']
        }
    },
    {
        getPiece: (name, location, owner, color, code) => new Model.King(name, location, owner, color, code),
        name: 'King',
        locations: {
            white: ['E1'],
            black: ['E8']
        }
    },
]

export const boardRow = 8;
export const boardCol = 8;
export const colStr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];