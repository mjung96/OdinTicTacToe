const player = (name, symbol) => {
    return {name, symbol}
}
const player1 = player('Player1', 'x');
const player2 = player('Player2', 'o');

const gameboard = (() => {
    const board = Array(9).fill('');
    return {board}
})();

const playGame = (() =>{
    const {board} = gameboard;
    let symbol = ''; 
    let winner = '';

    const playMove = (e) => { 
        const targetArrayIndex = board[`${e.target.id}`];
        if (symbol === '') {
            symbol = player1.symbol;
            if (targetArrayIndex === '') board.splice(`${e.target.id}`,1, symbol);
        }
        else if (symbol === player1.symbol) {
            symbol = player2.symbol;
            winner = player2.name;
            if (targetArrayIndex === '') board.splice(`${e.target.id}`,1, symbol);
        }
        else if (symbol === player2.symbol) {
            symbol = player1.symbol;
            winner = player1.name;
            if (targetArrayIndex === '') board.splice(`${e.target.id}`,1, symbol);
        }
        const {moves} = render;
        moves();
        winnerFound();
    }
    
    function winnerFound() {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;} 
        if (board[3] === board[4] && board[4] === board[5] && board[3] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;} 
        if (board[6] === board[7] && board[7] === board[8] && board[6] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[0] === board[3] && board[3] === board[6] && board[0] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[1] === board[4] && board[4] === board[7] && board[1] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[2] === board[5] && board[5] === board[8] && board[2] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[0] === board[4] && board[4] === board[8] && board[0] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[2] === board[4] && board[4] === board[6] && board[2] !== '') {wipeBoard(); message.textContent= `${winner} won`; symbol = ''; return;}
        if (board[0] !== '' && board[1] !== '' && board[2] !== '' && board[3] !== '' && board[4] !== '' && board[5] !== '' && board[6] !== '' && board[7] !== '' && board[8] !== '') {message.textContent = "tie"};
    }

    const boxes = Array.from(document.getElementsByClassName('box'));

    function wipeBoard() {
        boxes.forEach((box) => box.removeEventListener('click', playMove));
    }

    function handleClick() {
        boxes.forEach((box) => box.addEventListener('click', playMove));
    }
    handleClick();
    return {handleClick}
})();

const render = (() => {
    const {board} = gameboard;
    const {handleClick} = playGame;

    function moves() {
        for (let i = 0; i < board.length; i++){
            const selected = document.getElementById(`${i}`);
            selected.textContent = board[i]; 
        }
    }
   
    const resetButton = document.getElementById('reset-game-button');

    resetButton.addEventListener('click', () => {
        for (let i = 0; i < board.length; i++){
            board[i] = '';
        }
        message.textContent = 'Gluck!';
        handleClick();
        moves();
    });

    return {moves}
})();