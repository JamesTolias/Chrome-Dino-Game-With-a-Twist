import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const CHEESE_INTERVAL_MIN = 1500
const CHEESE_INTERVAL_MAX = 3500
const worldElem = document.querySelector('[data-world]')

let nextCheeseTime
export function setUpCheese() {
    nextCheeseTime = CHEESE_INTERVAL_MIN
    document.querySelectorAll('[data-cheese]').forEach(cheese => {
        cheese.remove()
    })
}

export function updateCheese(delta, speedScale) {
    document.querySelectorAll('[data-cheese]').forEach(cheese => {
        incrementCustomProperty(cheese, '--left', delta * speedScale * SPEED * -1)
        if (getCustomProperty(cheese, '--left') <= -100) {
            cheese.remove()
        }
    })

    if (nextCheeseTime <= 0) {
        createCheese()
        nextCheeseTime = randomNumberBetween(CHEESE_INTERVAL_MIN, CHEESE_INTERVAL_MAX) / speedScale
    }   
    nextCheeseTime -= delta
}

export function getCheeseRects() {
    return [...document.querySelectorAll('[data-cheese]')].map(cheese => {
        return cheese.getBoundingClientRect()
    })
}

export function setCheeseRemoved() {
    cheese.remove()
}

function createCheese() {
    const cheese = document.createElement('img')
    cheese.dataset.cheese = true
    cheese.src = 'images/cheese.png'
    cheese.classList.add('cheese')
    setCustomProperty(cheese, "--left", 100)
    worldElem.append(cheese)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}