document.querySelector('#search').addEventListener('click', getFetch)
document.querySelector('#home').addEventListener('click', goHome);
let currentCocktails = [];

function goHome(){
  document.querySelector('#selectionScreen').classList.remove('hidden');
  document.querySelector('#drinkResultsScreen').classList.add('hidden');
  removeAllChildNodes(document.querySelector('#resultsCarousel'));
  currentCocktails = [];
  scrollOptions.forEach(item => {
    item.classList.remove('selected');
  });
  document.querySelector("#search").classList.remove('grow')
}

function removeAllChildNodes(parent){
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
};

async function getFetch(){
  //Updates page
  if(scrollChoice === "none"){alert("Please select a main ingredient first"); return};
  document.querySelector('#selectionScreen').classList.add('hidden');
  document.querySelector('#drinkResultsScreen').classList.remove('hidden');
  document.querySelector('#resultsH2').innerText = `${scrollChoice} Cocktails`;

  //Fetches Data
  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${scrollChoice}`;
  const res = await fetch(url);
  const data = await res.json();
  let drinkArray = data.drinks;
  drinkArray.forEach((drink) => {
    let newCocktail = new CocktailButton(drink.strDrink, drink.strDrinkThumb, drink.idDrink);
    
    //Creates new div, title, and ingredient list for each cocktail
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'resultsDiv');

    const newContent = document.createElement('h3');
    newContent.innerText = `${newCocktail.name}`;

    const newImg = document.createElement('img');
    newImg.setAttribute('src', newCocktail.image);

    const newLink = document.createElement('a')
    newLink.setAttribute('href', `https://www.thecocktaildb.com/drink/${newCocktail.idNumber}`)
    newLink.setAttribute('target', '_blank')

    newDiv.appendChild(newContent);
    newDiv.appendChild(newLink);
    newLink.appendChild(newImg);
    document.querySelector('#resultsCarousel').appendChild(newDiv)
  })
  
}

let scrollOptions = document.querySelectorAll(".scrollOption");
scrollOptions.forEach(item => {
  item.addEventListener('click', select);
});

let scrollChoice = 'none';
function select(){
  scrollOptions.forEach(item => {
    item.classList.remove('selected');
  });
  this.classList.add('selected');
  scrollChoice = this.querySelector('h3').innerText;
  document.querySelector("#search").classList.add('grow')
}

class CocktailButton{
  constructor(name, image, idNumber){
    this.name = name;
    this.image = image;
    this.idNumber = idNumber;
  }
}

// //Gets individual data
// fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${newCocktail.idNumber}`)
// .then(indres => indres.json())
// .then(inddata => {
//   console.log(inddata);
//   newCocktail.instructions = inddata.drinks[0].strInstructions;
//   console.log(newCocktail.instructions)
// })
// .catch(err => {
//   console.log(`error ${err}`)
// });