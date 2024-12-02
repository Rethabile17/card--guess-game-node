document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-btn');
    const winMessage = document.getElementById('win-message');
    let cards = [];
    let flippedCards = [];
    let matchedCount = 0;

    
    function initGame() {
        gameBoard.innerHTML = '';
        cards = generateCards();
        shuffledCards = shuffle(cards);
        createBoard(shuffledCards);
        winMessage.classList.add('hidden');
        flippedCards = [];
        matchedCount = 0;
    }

    
    function generateCards() {
        let cardValues = [];
        for (let i = 1; i <= 18; i++) {
            cardValues.push(i);
            cardValues.push(i);
        }
        return cardValues;
    } 


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    function createBoard(cards) {
        cards.forEach((value, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'hidden');
            card.dataset.value = value;
            card.innerText = value; 
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('matched')) {
            this.classList.remove('hidden');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCount += 2;
            checkWin();
        } else {
            setTimeout(() => {
                card1.classList.add('hidden');
                card2.classList.add('hidden');
            }, 1000);
        }
        flippedCards = [];
    }

    function checkWin() {
        if (matchedCount === cards.length) {
            winMessage.classList.remove('hidden');
        }
    }


    resetBtn.addEventListener('click', initGame);

    
    initGame();
});
