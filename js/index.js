
let page = 1;
const createURL = () => `http://localhost:3000/monsters/?_limit=50&_page=${page}`
const monsterContainer = document.querySelector("#monster-container")
const formContainer = document.querySelector("#create-monster")
const forwardButton = document.querySelector("#forward")

function init() {
    let URL = createURL()
    createForm()
    fetch(URL)
    .then(response => response.json())
    .then(data => renderMonsters(data))
}

function renderMonsters(array) {
    array.forEach(monsterObj => renderMonster(monsterObj))
}

function renderMonster(monsterObj) {
//div container, h2 name, h4 age, p tag for bio
    const monsterDiv = document.createElement("div")
    const h2 = document.createElement("h2")
    h2.innerText = `${monsterObj.name}`
    const h4 = document.createElement("h4")
    h4.innerText = `Age: ${monsterObj.age}`
    const pTag = document.createElement("p")
    pTag.innerText = `Bio: ${monsterObj.description}`
    monsterDiv.append(h2, h4, pTag)

    monsterContainer.append(monsterDiv)
}

function createForm() {
    const form = document.createElement("form")
    form.id = "monster-form"
    form.innerHTML= `
    <input id="name" placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create</button>`

    form.addEventListener("submit", addMonster)

    formContainer.append(form)
}

forwardButton.addEventListener("click", nextPage)

function nextPage() {
    page += 1
    let URL = createURL()
    fetch(URL)
    .then(response => response.json())
    .then(data => renderMonsters(data))
}

function addMonster(event) {
    event.preventDefault()
    let URL = createURL()
    fetch(URL, {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify({
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.description.value
        })
    })
    .then(response => response.json())
    .then(data => renderMonster(data))
}


init();

