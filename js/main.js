
const container = document.getElementById('all-cards-container')
const hintButton = document.getElementById('hints')
const resetButton = document.getElementById('reset')
const typeContainer = document.getElementById('pokemonTypes')
const count = document.querySelector('.counter')
const cardTally = document.querySelector('.card-tally')



resetButton.addEventListener('click', resetScore)

function resetScore() {
    localStorage.clear()
    document.location.reload(true)
}


/* -------------------- API ------------------- */

if (!localStorage.getItem('botScore')){
    localStorage.setItem('botScore' , 0)
}

let botScoreVal = Number(localStorage.getItem('botScore'))

count.innerHTML = `${botScoreVal}`

if (!localStorage.getItem('remainingCards')){
    localStorage.setItem('remainingCards' , 151)
}

let tallyValue = Number(localStorage.getItem('remainingCards'))

cardTally.innerHTML = `${tallyValue}`

if (!localStorage.getItem('idNumbers')){
    randomUnique(151,151)
} else {
    localStorage.getItem('idNumbers')
    let idNumberArray = JSON.parse(localStorage.getItem('idNumbers'))
    fetchPkm(idNumberArray)
}


async function randomUnique (range, count) {
    let nums = new Set();
    while (nums.size < count) {
    nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    }
    let numsArr = Array.from(nums);
    localStorage.setItem('idNumbers', JSON.stringify(numsArr));
    await fetchPkm(numsArr)
}


async function fetchPkm(numsArr) { 
    let firstNumber = numsArr.shift()
    document.querySelector('.next-card').onclick = function() {
        localStorage.setItem('idNumbers', JSON.stringify(numsArr))
     }
    await getPkm(firstNumber)
}

async function getPkm(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    const spec = await getSpec(id)
    createPokemonCard(pokemon,spec)
}

async function getSpec(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    const res = await fetch(url)
    const spec = await res.json()
    return spec 
}


function createPokemonCard(pokemon, spec) {
    let pokemonEl = document.createElement('div')
    pokemonEl.classList.add('poke-card')
    let form = document.querySelector(".poke-form");

    let resultMessage = document.querySelector(".result-message")



/* -------------------------------------------- */
/*             PROBLEM SECTION START            */
/* -------------------------------------------- */
    let nextCard = document.querySelector('.next-card')
    let nameReset = document.querySelector('#poke-name')
    let enterButton = document.querySelector('.enter')
    


    form.addEventListener("submit", function (e) {
        e.preventDefault()
    
    let formdata = new FormData(this);
    let input = formdata.get("poke-name");
    
    if(input.length <= 0) {
        enterButton.disabled = false
    } else {
        pokemonEl.classList.toggle('flip')
        nextCard.classList.remove('hidden')
        enterButton.classList.add('hidden')
        enterButton.disabled = true

        if (pokemon.name === 'mr-mime') {
            if(input.toLowerCase() === "mr.mime" || input.toLowerCase() === "mr-mime" || input.toLowerCase() === "mr mime") {
                resultMessage.innerText = "Correct"
                resultMessage.classList.add("correct-text")
                botScoreVal += 1
                localStorage.setItem('botScore' , botScoreVal)  
            }
        } else if(pokemon.name === 'nidoran-f') {
            if(input.toLowerCase() === "nidoran" || input.toLowerCase() === "nidoran f" || input.toLowerCase() === "nidoranf"){
                resultMessage.innerText = "Correct"
                resultMessage.classList.add("correct-text")
                botScoreVal += 1
                localStorage.setItem('botScore' , botScoreVal) 
            }
        } else if(pokemon.name === 'nidoran-m') {
            if(input.toLowerCase() === "nidoran" || input.toLowerCase() === "nidoran m" || input.toLowerCase() === "nidoranm"){
                resultMessage.innerText = "Correct"
                resultMessage.classList.add("correct-text")
                botScoreVal += 1
                localStorage.setItem('botScore' , botScoreVal) 
            }
        } else if(input.toLowerCase() === pokemon.name.toLowerCase()){
            resultMessage.innerText = "Correct"
            resultMessage.classList.add("correct-text")
            botScoreVal += 1
            localStorage.setItem('botScore' , botScoreVal)
        } else if (input.toLowerCase() !== pokemon.name.toLowerCase()) {
            resultMessage.classList.add("incorrect-text")
            resultMessage.innerText = "Incorrect"

        }
    }
    count.innerHTML = `${botScoreVal}` 
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }


    nextCard.addEventListener("click", () => {
        console.log('edfd')
        nameReset.value = ""
        resultMessage.innerText = ""
        tallyValue -= 1
        localStorage.setItem('remainingCards' , tallyValue) 
        document.location.reload(true)
        enterButton.disabled = false
      });

    }, {once : true})

/* -------------------------------------------- */
/*             PROBLEM SECTION ENDS             */
/* -------------------------------------------- */

    //CODE DOWN HERE DOESNT REALLY MATTER

    let types = []

    hintButton.addEventListener('click', () => {
        for(let i = 0; i < pokemon.types.length; i++){
            let type = pokemon.types[i].type.name
            if(type === "bug"){
                types.push(`<img src="images/bug-type.png">`)
            } else if (type === "dark"){
                types.push(`<img src="images/dark-type.png">`)
            } else if (type === "dragon"){
                types.push(`<img src="images/dragon-type.png">`)
            } else if (type === "electric"){
                types.push(`<img src="images/electric-type.png">`)
            } else if (type === "fairy"){
                types.push(`<img src="images/fairy-type.png">`)
            } else if (type === "fighting"){
                types.push(`<img src="images/fight-type.png">`)
            } else if (type === "fire"){
                types.push(`<img src="images/fire-type.png">`)
            } else if (type === "flying"){
                types.push(`<img src="images/flying-type.png">`)
            } else if (type === "ghost"){
                types.push(`<img src="images/ghost-type.png">`)
            } else if (type === "grass"){
                types.push(`<img src="images/grass-type.png">`)
            } else if (type === "ground"){
                types.push(`<img src="images/ground-type.png">`)
            } else if (type === "ice"){
                types.push(`<img src="images/ice-type.png">`)
            } else if (type === "normal"){
                types.push(`<img src="images/normal-type.png">`)
            } else if (type === "psychic"){
                types.push(`<img src="images/psychic-type.png">`)
            } else if (type === "rock"){
                types.push(`<img src="images/rock-type.png">`)
            } else if (type === "steel"){
                types.push(`<img src="images/steel-type.png">`)
            } else if (type === "water"){
                types.push(`<img src="images/water-type.png">`)
            } else if (type === "poison"){
                types.push(`<img src="images/poison-type.png">`)
            }
    
            {
                let typeColor = pokemon.types[0].type.name
                if(typeColor === "bug"){
                    pokemonEl.classList.add('bug')
                } else if (typeColor === "dark"){
                    pokemonEl.classList.add('dark')
                } else if (typeColor === "dragon"){
                    pokemonEl.classList.add('dragon')
                } else if (typeColor === "electric"){
                    pokemonEl.classList.add('electric')
                } else if (typeColor === "fairy"){
                    pokemonEl.classList.add('fairy')
                } else if (typeColor === "fighting"){
                    pokemonEl.classList.add('fight')
                } else if (typeColor === "fire"){
                    pokemonEl.classList.add('fire')
                } else if (typeColor === "flying"){
                    pokemonEl.classList.add('flying')
                } else if (typeColor === "ghost"){
                    pokemonEl.classList.add('ghost')
                } else if (typeColor === "grass"){
                    pokemonEl.classList.add('grass')
                } else if (typeColor === "ground"){
                    pokemonEl.classList.add('ground')
                } else if (typeColor === "ice"){
                    pokemonEl.classList.add('ice')
                } else if (typeColor === "normal"){
                    pokemonEl.classList.add('normal')
                } else if (typeColor === "psychic"){
                    pokemonEl.classList.add('psychic')
                } else if (typeColor === "rock"){
                    pokemonEl.classList.add('rock')
                } else if (typeColor === "steel"){
                    pokemonEl.classList.add('steel')
                } else if (typeColor === "water"){
                    pokemonEl.classList.add('water')
                } else if (typeColor === "poison"){
                    pokemonEl.classList.add('poison')
                } 
            }
        }
        document.getElementById("pokemonTypes").innerHTML=`${types.join('')}`;

    }, {once : true})

    let description = spec.flavor_text_entries[2].flavor_text.replaceAll('\f', ' ')

    const cardInnerHtml = `
        <div class="front-face">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}">
            <h1>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
        </div>
        <div class="back-face">
            <div class="back-text">
                <h1>Description</h1>
                <span>${description}</span>
            </div>
            <div id="pokemonTypes" class="types">

            </div>
        </div>
    `
    
    pokemonEl.innerHTML = cardInnerHtml
    container.appendChild(pokemonEl)


}



