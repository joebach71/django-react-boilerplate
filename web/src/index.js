import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    let board = []
    for (let i = 0; i < 9; i+=3) {
      let row = []
      for (let j = i; j < i + 3; j++) {
        // add square to row
        row.push(this.renderSquare(j));
      }
      // add row into board
      board.push(<div key={i} className="board-row">{row}</div>);
    }
    return (<div>{board}</div>);
  }
}
  
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      isAscendingOrder: true,
      winnerLine: [],
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    let moves = history.map((step, move) => {
      let desc = move ?
        getMove(step.squares) :
        'Go to game start';
      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const ordered = <button onClick={() => this.setState({
      isAscendingOrder: !this.state.isAscendingOrder}) }>
        { this.state.isAscendingOrder ? 'ascending' : 'descending' }
      </button>
    let status;
    if (result) {
      status = 'Winner: ' + result.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // square no null draw
      if (gameEnded(current.squares)) {
        status = 'Draw - End';
      }
    }

    if (!this.state.isAscendingOrder) {
      moves = moves.reverse()
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <div>
            <div>{ ordered }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      </div>
    );
  }
}

function gameEnded(squares) {
  return squares.reduce((gameIsEnded, prev, current) => {
    return (prev == null ? false : true);
  }, true);
}

function getMove(squares) {
  let move;
  squares.map((current, currentIndex, src) => {
    if (currentIndex > 0 && current !== null && src[currentIndex - 1] !== current) {
      const row = Math.floor(currentIndex / 3);
      const col = currentIndex % 3;
      move = `row ${row}, col ${col}`;
    }
    return move;
  });
  return 'Go to move #' + move;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);