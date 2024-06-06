const images = ['image1.webp', 'image2.jpg', 'image3.png', 'image4.jpg', 'image5.png', 'image6.jpg', 'image7.jpg', 'image8.avif']
let currentTheme = 0
let pairs = {}
let imagedict = {}
let cardFlipped = false
let prevSelected = null
let pairsFound = 0

function pairFound() {
    pairsFound++
    document.getElementById('pairFoundText').innerHTML = `Pairs Found: ${pairsFound}`
    if (Object.entries(pairs).length/2 == pairsFound) {
        alert('You won! Refresh the page to play again')
    }
}

function changecolor(tag, color) {
    let elements = document.getElementsByTagName(tag)
    for (let e of elements) {
        e.style.color = color;
    }
}

function setPairs(pairCount) {
    let arr = []
    for (let i of images.slice(0,pairCount)) {
        arr.push(i, i)
    }
    for (let i=arr.length-1;i>0;i--) {
        let j = Math.ceil(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    for (let i of images.slice(0,pairCount)) {
        pairs[arr.indexOf(i)] = arr.lastIndexOf(i)
        pairs[arr.lastIndexOf(i)] = arr.indexOf(i)
        imagedict[arr.indexOf(i)] = i
        imagedict[arr.lastIndexOf(i)] = i
    }
    
    // for (let i=0;i<pairCount;i++) {
    //     let random = 0
    //     let random2 = 0
    //     do {
    //         random = Math.ceil(Math.random()*16)
    //         random2 = Math.ceil(Math.random()*16)
    //         console.log(`${random}:${random2}`)
    //         pairs[random] = random2
    //     } while (1<0)
    // }
}

function startGame(row, col) {
    setPairs(col*row/2)
    let game = document.getElementsByClassName('game')[0];
    document.getElementById('pairFoundText').style.display = 'inline-block'
    game.innerHTML = ''
    game.style.display = 'grid'
    game.style.gridTemplateColumns = `repeat(${col}, 1fr)`
    game.style.gridTemplateRows = `repeat(${row}, 1fr)`
    for (let i=0;i<row*col;i++) {
        let el = document.createElement('button')
        el.setAttribute('class', 'card')
        el.setAttribute('cid', i)
        game.appendChild(el)
    }
    for (let card of document.getElementsByClassName('card')) {
        card.addEventListener('click', (e) => {
            let el = e.target;
            let cardId = +el.getAttribute('cid')
            e.target.style.backgroundImage = `url('images/${imagedict[cardId]}')`
            if (!cardFlipped) {
                cardFlipped = true
                prevSelected = el
            } else {
                cardFlipped = false
                if (pairs[+prevSelected.getAttribute('cid')] == cardId) {
                    setTimeout(() => {
                        prevSelected.style.opacity = 0
                        el.style.opacity = 0
                        pairFound()
                    }, 300)
                } else {
                    setTimeout(() => {
                        prevSelected.style.backgroundImage = "none"
                        el.style.backgroundImage = "none"
                    }, 500)
                }
            }
        })
    }
}

document.getElementById('themeSwitch').addEventListener('click', () => {
    if (currentTheme == 0) {
        currentTheme = 1
        document.body.style.backgroundColor = '#fff';
        changecolor('h1', '#000')
        changecolor('span', '#000')
    } else {
        currentTheme = 0
        document.body.style.backgroundColor = '#282828';
        changecolor('h1', '#fff')
        changecolor('span', '#fff')
    }
})