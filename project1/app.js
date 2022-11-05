class Dino {
  constructor (dinoObj) {
    this.species = dinoObj.species
    this.weight = dinoObj.weight
    this.height = dinoObj.height
    this.diet = dinoObj.diet
    this.where = dinoObj.where
    this.when = dinoObj.when
    this.fact = dinoObj.fact
  }

  compareWeight (weight) {
    return `Your weight is ${weight} lb compared to ${this.species}'s weigh ${this.weight} lb.`
  }

  compareHeight (height) {
    return `Your height is ${height} inches compared to ${this.species}'s height ${this.height} inches.`
  }

  compareDiet (diet) {
    return `${this.species} diet is ${this.diet}, yours is ${diet}`
  }
}

class Human {
  constructor (humanObj) {
    this.name = humanObj.name
    this.feet = humanObj.feet
    this.inches = humanObj.inches
    this.weight = humanObj.weight
    this.diet = humanObj.diet
  }
}

/**
 * create array of dinosaures
 * @returns {Dino[]}
 */
function createDinosList () {
  const dinosData = [
    {
      species: 'Triceratops',
      weight: 13000,
      height: 114,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'First discovered in 1889 by Othniel Charles Marsh'
    },
    {
      species: 'Tyrannosaurus Rex',
      weight: 11905,
      height: 144,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'The largest known skull measures in at 5 feet long.'
    },
    {
      species: 'Anklyosaurus',
      weight: 10500,
      height: 55,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Anklyosaurus survived for approximately 135 million years.'
    },
    {
      species: 'Brachiosaurus',
      weight: 70000,
      height: '372',
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Jurasic',
      fact: 'An asteroid was named 9954 Brachiosaurus in 1991.'
    },
    {
      species: 'Stegosaurus',
      weight: 11600,
      height: 79,
      diet: 'herbavor',
      where: 'North America, Europe, Asia',
      when: 'Late Jurasic to Early Cretaceous',
      fact: 'The Stegosaurus had between 17 and 22 seperate places and flat spines.'
    },
    {
      species: 'Elasmosaurus',
      weight: 16000,
      height: 59,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.'
    },
    {
      species: 'Pteranodon',
      weight: 44,
      height: 20,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.'
    },
    {
      species: 'Pigeon',
      weight: 0.5,
      height: 9,
      diet: 'herbavor',
      where: 'World Wide',
      when: 'Holocene',
      fact: 'All birds are living dinosaurs.'
    }
  ]
  const dinos = []
  dinosData.forEach((dinoObj) => dinos.push(new Dino(dinoObj)))
  return dinos
}
/**
 * create new instance of Human
 * @returns {Human}
 */
function createHumanObj () {
  const dietSelection = document.querySelector('#diet')
  return new Human({
    name: document.querySelector('#name').value,
    feet: document.querySelector('#feet').value,
    inches: document.querySelector('#inches').value,
    weight: document.querySelector('#weight').value,
    diet: dietSelection.options[dietSelection.selectedIndex].text
  })
}
/**
 * create human tile/card from given human object
 * @param {object} humanObj
 * @returns {HTMLElement}
 */
function createHumanTile (humanObj) {
  const tile = document.createElement('div')
  tile.className = 'grid-item'
  tile.innerHTML = `<h2>${humanObj.name}</h2>`

  const humanImage = document.createElement('img')
  humanImage.src = 'images/human.png'
  tile.append(humanImage)

  return tile
}
/**
 * create random fact from given Dino object
 * @param {Dino} dinoObj an instance of Dino class
 * @returns {string} random fact
 */
function createRandomFact (dinoObj) {
  const human = createHumanObj()
  const factsObj = {
    0: `${dinoObj.species} diet is ${dinoObj.diet}`,
    1: dinoObj.compareWeight(human.weight),
    2: dinoObj.compareHeight(human.inches),
    3: dinoObj.compareDiet(human.diet),
    4: dinoObj.fact,
    5: `Lived during the ${dinoObj.when} period`,
    6: `You can find ${dinoObj.species} in ${dinoObj.where}`,
    7: `${dinoObj.species} Weight is ${dinoObj.weight} lbs, and ${dinoObj.height}inches height`,
    8: 'There are roughly 700 known species of extinct dinosaurs',
    9: 'Dinosaur fossils have been found on all seven continents.'
  }
  const factsObjLength = Object.keys(factsObj).length

  const randomFactKey = Math.floor(Math.random() * factsObjLength)

  return factsObj[randomFactKey]
}
/**
 * create dinosaure tile/card from given dinoObj
 * @param {object} dinoObj
 * @returns {HTMLElement}
 */
function createDinosTile (dinoObj) {
  const tile = document.createElement('div')
  tile.className = 'grid-item'
  tile.innerHTML = `<h2>${dinoObj.species}</h2>`

  const dinoImage = document.createElement('img')
  dinoImage.src = `images/${dinoObj.species.toLowerCase()}.png`
  tile.append(dinoImage)

  const randomFact = document.createElement('p')
  randomFact.innerText =
    dinoObj.species === 'Pigeon'
      ? 'All birds are dinosaurs'
      : createRandomFact(dinoObj)
  tile.append(randomFact)

  return tile
}

/**
 * create grid view from dinosaures and one human in the middle.
 * @param {Dino[]} dinos
 * @param {Human} humanObj
 */
function createGridView (dinos, humanObj) {
  const humanTile = createHumanTile(humanObj)
  const grid = document.querySelector('#grid')

  let forthDino

  dinos.map((dinoObj, index) => {
    if (index === 4) {
      forthDino = dinoObj
      grid.append(humanTile)
    } else {
      const dinoTile = createDinosTile(dinoObj)
      grid.append(dinoTile)
    }
    return 0
  })

  grid.append(createDinosTile(forthDino))
}
/**
 * validate form data
 * @returns {Undefined}
 */
function validateFormData () {
  const name = document.getElementById('name').value
  const feet = document.getElementById('feet').value
  const inches = document.getElementById('inches').value
  const weight = document.getElementById('weight').value

  if (!name || !feet || !inches || !weight) {
    return false
  }
  return true
}
/**
 * IIFE to hide form and display infographic when user submit form.
 */
(function () {
  document.querySelector('#btn').addEventListener('click', () => {
    event.preventDefault()
    if (validateFormData()) {
      document.querySelector('form').style.display = 'none'

      const dinos = createDinosList()
      const human = createHumanObj()
      createGridView(dinos, human)
    }
  })
})()

const duck = {
  hasBill: true
};
const beaver = {
  hasTail: true
};
const otter = {
  hasFur: true,
  feet: 'webbed'
};

const platypus = Object.assign(duck, beaver, otter);
console.log(platypus)
console.log(duck)