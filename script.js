let grid = document.querySelector(".grid") //lien des images pour les cartes//

let start = document.querySelector('.start');
let startbtn = document.getElementById('startBtn')

let links = [
    {id: 1, src: 'assets/git.png'},
    {id: 2, src: 'assets/php.png'},
    {id: 3, src: 'assets/vue.png' },
    {id: 4, src: 'assets/react.png'},
    {id: 5, src: 'assets/symfony.png'},
    {id: 6, src: 'assets/node.png'},
    {id: 7, src: 'assets/js.png'},
    {id: 8, src: 'assets/html.png'},
]

let visuel = 'assets/default.png'; //lien de l'image par défaut pour le dos des cartes//

let clickedcard = [] //tableau pour ajouter les deux cartes cliquées le tempos de les comparer//

let tentatives = 0; //compteur pour le nombre de tentatives//

let tentatives_block = document.querySelector(".tentative")

let chrono = document.getElementById('chrono');

let décompte = 0;
let minutes = 0;
let interval;  

startbtn.addEventListener('click', ()=> {
    start.classList.add('hidden');
    timer();
})


function timer()
{
  timerVar = setInterval(() => {
        décompte++;
        if(décompte>59){
            décompte=0;
            minutes++
        }
        chrono.textContent = minutes+' : '+décompte;
}, 1000);
}


//fonction pour choisir au hasard une image à chaque clique//
function init() { 
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

            img.classList.add("unclicked")

            img.addEventListener("click", function c() {

                 

                if (img.classList.contains("unclicked") && clickedcard.length < 2) {
                    tentatives++;
                    tentatives_block.textContent = tentatives
                    this.classList.toggle("unclicked")

                    img.setAttribute('src', link.src) //lorsqu'une carte est cliquée je lui attribue une image grâce au tableau links et à la fonction init//
                  

                    clickedcard.push({
                        id: link.id,
                        img: img
                    });


                    

                    if (clickedcard[0].id == clickedcard[1].id) {
                        clickedcard.forEach(card => {
                            card.img.classList.add('matched');
                            clickedcard = [];
                        })

                        if (document.querySelectorAll('.matched').length === 16) {
                            // Toutes les paires ont été trouvées, afficher le message de félicitations
                            clearInterval(timerVar)
                            setTimeout(() => {
                                alert(`Félicitations, vous avez trouvé toutes les paires en ${tentatives} coups !`);
                            }, 500);
                        }

                    } else {
                        setTimeout(() => {
                            clickedcard.forEach(card => {
                                if (!card.img.classList.contains('matched')) {
                                    card.img.setAttribute('src', visuel);
                                    card.img.classList.toggle("unclicked")
                                }
                            });
                            clickedcard = [];

                        }, 500);

                    }
                }

            });




        })
}

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', () => {
    location.reload()
});
// fin fonction link//



//timer//
