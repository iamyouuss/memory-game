/*let card = document.querySelector(".card")
let img = document.querySelector(".img")

img.classList.add("hidden")

card.addEventListener("click", function () {
    img.classList.toggle("hidden")
    this.classList.toggle("background")
})*/

let grid = document.querySelector(".grid")

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

let visuel = 'assets/default.png';


function init() {
    links = [...links, ...links]
    links.sort(() => 0.5 - Math.random())

    createcard()
}
init()


function createcard() {
    let clickedcard = []
    links.forEach(link => {
        const img = document.createElement('img')
        img.setAttribute('src', visuel)

        img.classList.add('card')
        grid.appendChild(img)

        img.addEventListener("click", function () {
            if (clickedcard.length < 16 && !clickedcard.includes(link.id)) {
                img.setAttribute('src', link.src)
                img.setAttribute('data-id', link.id)


                clickedcard.push(link.id)
            }
            console.log(link.id)
            console.log(clickedcard)

            if (clickedcard.length == 2 && clickedcard[0] != clickedcard[1]) {
                setInterval(() => {
                    img.setAttribute('src', visuel)
                }, 1000)

                clickedcard = []

            }

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
        })

    })
}