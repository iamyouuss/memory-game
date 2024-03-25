let grid = document.querySelector(".grid"); // Lien des images pour les cartes

let links = [{
        id: 1,
        src: 'assets/git.png'
    },
    {
        id: 2,
        src: 'assets/php.png'
    },
    {
        id: 3,
        src: 'assets/vue.png'
    },
    {
        id: 4,
        src: 'assets/react.png'
    },
    {
        id: 5,
        src: 'assets/symfony.png'
    },
    {
        id: 6,
        src: 'assets/node.png'
    },
    {
        id: 7,
        src: 'assets/js.png'
    },
    {
        id: 8,
        src: 'assets/html.png'
    },
];

let visuel = 'assets/default.png'; // Lien de l'image par défaut pour le dos des cartes

let clickedCards = []; // Tableau pour ajouter les deux cartes cliquées le temps de les comparer

let tentatives = 0; // Compteur pour le nombre de tentatives

let tentativesBlock = document.querySelector(".tentative");

function init() {
    links = [...links, ...links]; // Je double le tableau pour avoir 16 cartes
    links.sort(() => 0.5 - Math.random()); // Mélanger les cartes
    createCards();
}

function createCards() {
    links.forEach(link => {
        const img = document.createElement('img');
        img.setAttribute('src', visuel);
        img.classList.add('card', 'unclicked');
        grid.appendChild(img);

        img.addEventListener("click", function() {
            if (this.classList.contains("unclicked") && clickedCards.length < 2) {
                tentatives++;
                tentativesBlock.textContent = tentatives;
                this.classList.remove("unclicked");
                this.setAttribute('src', link.src);
                clickedCards.push({
                    id: link.id,
                    img: this
                });

                if (clickedCards.length === 2) {
                    setTimeout(compareCards, 500);
                }
            }
        });
    });
}

function compareCards() {
    if (clickedCards[0].id === clickedCards[1].id) {
        clickedCards.forEach(card => {
            card.img.classList.add('matched');
        });
    } else {
        clickedCards.forEach(card => {
            card.img.classList.add('unclicked');
            card.img.setAttribute('src', visuel);
        });
    }

    clickedCards = [];

    if (document.querySelectorAll('.matched').length === links.length) {
        setTimeout(() => {
            alert('Félicitations, vous avez trouvé toutes les paires !');
        }, 500);
    }
}

init(); // Lancer le jeu
