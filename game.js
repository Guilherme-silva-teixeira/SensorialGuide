const data =[
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-1.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-2.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-3.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-4.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-5.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-6.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-7.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-8.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-9.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-10.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-12.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-13.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-14.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-15.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-16.svg',
            'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-17.svg',
        ];

        const images = sortearElementos(data);

        function sortearElementos(arrayOriginal) {
    // Verifica se o array tem elementos suficientes
    if (arrayOriginal.length < 17) {
        throw new Error("O array precisa ter pelo menos 17 elementos");
    }

    // Função para embaralhar arrays (Fisher-Yates shuffle)
    function embaralhar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 1. Embaralha o array original
    const arrayEmbaralhado = embaralhar([...arrayOriginal]);
    
    // 2. Seleciona os primeiros 17 elementos
    const elementos17 = arrayEmbaralhado.slice(0, 17);
    
    // 3. Embaralha novamente os 17 elementos
    const elementos17Embaralhados = embaralhar([...elementos17]);
    
    // 4. Seleciona os primeiros 8 elementos
    return elementos17Embaralhados.slice(0, 8);
}

        const gameContainer = document.getElementById('gameContainer');
        const resetButton = document.getElementById('reset');
        const movesElement = document.getElementById('moves');

        let flippedCards = [];
        let moves = 0;
        let lockBoard = false;

        function createGame() {
            const cards = [...images, ...images]
                .sort(() => Math.random() - 0.5)
                .map((img, index) => createCard(img, index));

            gameContainer.innerHTML = '';
            cards.forEach(card => gameContainer.appendChild(card));
            moves = 0;
            movesElement.textContent = `Movimentos: ${moves}`;
        }

        function createCard(imgSrc, index) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.img = imgSrc;
            card.dataset.index = index;

            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';

            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';

            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Card Image';
            cardBack.appendChild(img);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener('click', flipCard);
            return card;
        }

        function flipCard() {
            if (lockBoard || this.classList.contains('flipped') || flippedCards.length >= 2) return;

            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                moves++;
                movesElement.textContent = `Movimentos: ${moves}`;
                checkMatch();
            }
        }

        function checkMatch() {
            lockBoard = true;
            const [card1, card2] = flippedCards;
            const match = card1.dataset.img === card2.dataset.img;

            if (match) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                card1.removeEventListener('click', flipCard);
                card2.removeEventListener('click', flipCard);
                console.log("acerto");
            }

            setTimeout(() => {
                if (!match) {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }

        resetButton.addEventListener('click', createGame);

        // Iniciar o jogo
        createGame();