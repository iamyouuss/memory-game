 // conteneur qui va contenir nos cartes
 let grid = document.querySelector(".grid")


 // Variable (tableau d'objets) qui va contenir les liens de nos images ainsi que les id correspondants
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
 // Variable qui va contenir le lien de l'image par défaut pour le dos de nos cartes
 let visuel = 'assets/default.png';

 // tableau qui va contenir les id des 2 cartes qui ont été activées, pour les comparer
 let clickedcard = [];

 // compteur pour le nombre de tentatives (clic)
 let tentatives = 0;

 // la div qui va contenir le compteur
 let tentatives_block = document.querySelector(".tentative");

 // bouton reset
 let reset = document.querySelector(".reset");

 // Variable qui va servir pour stopper le timer
 let game = "inprogress";

 // Conteneur qui va s'afficher en fin de partie
 let end = document.querySelector(".endOfGame");

 // le body de notre html. le recupérer ici nous servira a changer la couleur du body en fin de partie
 let body = document.querySelector("body");

 // div qui va contenir la durée de la partie dans le conteneur de fin de partie
 let timeScore = document.querySelector(".timeScore");

 // div qui va contenir le nombre de clic dans le conteneur de fin de partie
 let countScore = document.querySelector(".countScore");

 // bouton qui s'affichera en fin de partie pour rejouer
 let playAgain = document.querySelector(".playAgain");

 end.classList.add("hide");

 // variables utiles pour le timer
 let min = 0;
 let sec = 1;


 //Fonction de création du timer
 function timer() {
     let timer = setInterval(function () {
         document.querySelector(".timer").innerHTML = min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');
         sec++;
         if (sec > 60) {
             min++;
             sec = 0
         }

         if (game == "done") {
             clearInterval(timer);
         }
     }, 1000);

 }


 //Fonction d'initialisation du jeu : creation et melange des cartes
 function init() {
     links = [...links, ...links]
     links.sort(() => 0.5 - Math.random())

     createcard();
 }
 init()


 //fonction de création des cartes
 function createcard() {

     links.forEach(link => {
         // je crée une div, à l'intérieur de laquelle je crée une image
         let div = document.createElement('div');
         let img = document.createElement('img')
         div.appendChild(img)

         // j'ajoute un atribut src à mon image, qui sera l'image par défaut
         img.setAttribute('src', visuel)
         img.setAttribute('data-id', link.id)

         // j'ajoute à ma div, la classe card déja existante dans le css, afin de lui attribuer du style
         div.classList.add('card')

         //j'ajoute les img(child) au grid(parent)
         grid.appendChild(div)


         // classe fictive qui nous servira pour le compteur de clics
         img.classList.add("unclicked")


         // dévoilement des cartes au clic 
         // +
         // initialisation du compteur de clics
         img.addEventListener("click", function c() {
             if (img.classList.contains("unclicked") && clickedcard.length < 2) {
                 tentatives++;
                 tentatives_block.textContent = tentatives
                 this.classList.toggle("unclicked")

                 img.setAttribute('src', link.src)


                 clickedcard.push({
                     id: link.id,
                     img: img
                 });


                 if (clickedcard[0].id == clickedcard[1].id) {
                     clickedcard.forEach(card => {
                         card.img.classList.add('matched');
                         clickedcard = [];
                     })
                     //  img.removeEventListener('click', c);

                     if (document.querySelectorAll('.matched').length === links.length) {
                         setTimeout(() => {
                             body.style.backgroundColor = "rgba(0, 0, 0, .8)"
                             grid.classList.add("hide")
                             end.classList.toggle("hide")
                             if (min <= 0) {
                                 timeScore.textContent = sec + " seconds"
                             } else {
                                 timeScore.textContent = min + "minutes and " + sec + " secondes"
                             }
                             countScore.textContent = tentatives + " moves"

                         }, 200);
                         game = "done"
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
                         // img.addEventListener('click',c)

                     }, 500);

                 }


             }
         });


         // initialisation bouton reset
         reset.addEventListener("click", function () {

             // reproduit le "refresh" de la page
             location.reload();
         })

         // initialisation du bouton "play again" qui s'affiche à la fin du jeu, lors du message de "felicitations"
         playAgain.addEventListener("click", function () {
             location.reload();
         })


     })

     // bouton sauvegarder
     let saveBtn = document.querySelector(".save")

     saveBtn.addEventListener("click", function () {

         // sauvegarder l'ordre des images
         localStorage.setItem("saveOrder", JSON.stringify(links))

         // sauvegarder les images "matchées"
         let matchedCards = document.querySelectorAll(".matched");
         let matchedCardsData = [];

         matchedCards.forEach(function (card) {
             let cardData = card.getAttribute("data-id");

             matchedCardsData.push(cardData)

         })

         localStorage.setItem("matchedCards", JSON.stringify(matchedCardsData));


         // sauvegarder le timer
         localStorage.setItem("saveTimerMin", min)
         localStorage.setItem("saveTimerSec", sec)


         // sauvegarder le counter
         localStorage.setItem("saveCounter", tentatives)

     });



     // bouton continuer
     let continueBtn = document.querySelector(".continue")

     continueBtn.addEventListener("click", function () {

         // récupérer le counter sauvegardé
         let saveCounter = localStorage.getItem("saveCounter")
         tentatives = saveCounter

         // Afficher le counter savegardé dès lors que la partie est chargée. sans pour autant qu'il soit actif
         tentatives_block.textContent = saveCounter

         // récupérer l'ordre des images sauvegardé
         let order = JSON.parse(localStorage.getItem("saveOrder"));


         // récupérer les images matchées sauvegardées
         let savedMatchedCards = JSON.parse(localStorage.getItem("matchedCards"));
         console.log(savedMatchedCards)


         // récupérer le timer sauvegardé
         let saveSec = localStorage.getItem("saveTimerSec");
         let saveMin = localStorage.getItem("saveTimerMin");
         sec = saveSec;
         min = saveMin;

         // Afficher le timer sauvegardé dès lors que la partie est chargée. sans pour autant qu'il soit activé.
         document.querySelector(".timer").innerHTML = min.toString().padStart(2, '0') + ':' + sec.toString().padStart(2, '0');

         // Parcourir chaque element img qui à été créé
         document.querySelectorAll("img").forEach(function (image, index) {
             // Vérifie si l'identifiant de l'image est contenu dans savedMatchedCards
             if (savedMatchedCards.includes(image.getAttribute("data-id"))) {
                 image.classList.add("matched")
                 image.setAttribute("src", order[index].src)

             } else {
                 console.log("no matching");
             }

             // instructions à chaque clic sur un element img
             image.addEventListener("click", function () {
                 image.setAttribute("src", order[index].src);
             });
         });


     })


 }


 // Initialisation du timer

 let startTimer = false;

 grid.addEventListener("click", function StartTimerFunction() {
     if (startTimer == false) {
         startTimer = true;
         timer();
         grid.removeEventListener("click", StartTimerFunction)
     }
 })


 // Message de fin de jeu