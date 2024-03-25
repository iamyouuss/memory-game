/*let card = document.querySelector(".card")
let img = document.querySelector(".img")

img.classList.add("hidden")

card.addEventListener("click", function () {
    img.classList.toggle("hidden")
    this.classList.toggle("background")
})*/

let grid = document.querySelector(".grid") //lien des images pour les cartes//

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
]

let visuel = 'assets/default.png'; //lien de l'image par défaut pour le dos des cartes//

let clickedcard = [] //tableau pour ajouter les deux cartes cliquées le tempos deles comparer//

let tentatives = 0; //compteur pour le nombre de tentatives//

let tentatives_block = document.querySelector(".tentative")


console.log(tentatives_block)
function init() { //fonction pour choisir au hasard une image à chaque clique//
    links = [...links, ...links] //je double le tableau pour avoir 16 cartes//
    links.sort(() => 0.5 - Math.random()) //sans 0.5 une seule dispositon possible//

    createcard()
}
init()


function createcard() {


    links.forEach(link =>
        // j'attribue à chaque carte un élément html 'img' auquel j'ajoute un attribut src que je récupère dans la variable visuel (pour le dos de la carte)//
        {
            const img = document.createElement('img')
            img.setAttribute('src', visuel)

            img.classList.add('card') //je leur donne une taille en leur rattachant la class '.card' déjà existante dans le css//
            grid.appendChild(img) //j'ajoute les img(child) au grid(parent)//



            img.addEventListener("click", function c() {
                tentatives++;
                tentatives_block.textContent = tentatives
                
                if (clickedcard.length < 2) {
                    img.setAttribute('src', link.src) //lorsqu'une carte est cliquée je lui attribue une image grâce au tableau links et à la fonction init//
                    // this.removeEventListener('click', c)
                    // img.setAttribute('data-id', link.id)

                    clickedcard.push({
                        id: link.id,
                        img: img
                    })
                    // console.log(link.id)
                    console.log(clickedcard)

                    if(clickedcard.length===2)
                    

                    if (clickedcard.length === 2 && clickedcard[0].id == clickedcard[1].id) {
                        clickedcard.forEach(card => {
                            card.img.classList.add('matched');
                        })
                          //  img.removeEventListener('click', c);

                        if (document.querySelectorAll('.matched').length === links.length) {
                            // Toutes les paires ont été trouvées, afficher le message de félicitations
                            setTimeout(() => {
                                alert('Félicitations, vous avez trouvé toutes les paires !');
                            }, 500);
                        }

                    } else {
                        setTimeout(() => {
                            clickedcard.forEach(card => {
                                if (!card.img.classList.contains('matched')) {
                                    card.img.setAttribute('src', visuel);
                                }
                            });
                            clickedcard = [];
                            // img.addEventListener('click',c)

                        }, 1000)
                    }
                }





            })
        }) // fin fonction link//
};

//     img.setAttribute('src', visuel)
//     console.log("hello")
// }
// else{
//     clickedcard.forEach(function(card)
//     {
//         img.setAttribute('src', visuel)
//     });
//     clickedcard = []
// }

// clickedcard[0].img.setAttribute('src', visuel);
//                     clickedcard[1].img.setAttribute('src', visuel);