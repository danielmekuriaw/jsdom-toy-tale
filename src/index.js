let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
.then(r => r.json())
.then(data => {
  data.forEach((card)=> renderCard(card))
})

const toyCollection = document.querySelector("#toy-collection")

function renderCard(card){
  let div = document.createElement("div")
  div.classList.add("card")
  div.dataset.id = card.id

  div.innerHTML = `<h2>${card.name}</h2>
  <img src=${card.image} class="toy-avatar" />
  <p>${card.likes} Likes </p>
  <button class="like-btn">Like <3</button>
</div>`

  console.log(div)

  toyCollection.append(div)
}

const newToyForm = document.querySelector(".add-toy-form")

newToyForm.addEventListener('submit', (event) => {
  event.preventDefault()

  let toyObj = {
    name: event.target[0].value,
    image: event.target[1].value,
    likes: 0
  }

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
      {"Content-Type": "application/json",
      Accept: "application/json"},
    body:
      JSON.stringify(toyObj)
  }).then(r => r.json())
  .then(card=> renderCard(card))

  newToyForm.reset()
})

toyCollection.addEventListener('click', function(event) {
  if (event.target.classList.contains('like-btn')) {
    let card = event.target.closest('div.card')
    console.log(card)
    let likesText = card.getElementsByTagName('p')[0]
    let likesVal = parseInt(likesText.textContent)
    likesVal = likesVal + 1


    fetch(`http://localhost:3000/toys/${card.dataset.id}`, {
      method: "PATCH",
      headers:
      {"Content-Type": "application/json",
      Accept: "application/json"},
      body: JSON.stringify({likes: likesVal})
    }).then(likesText.textContent = `${likesVal} Likes`)
  }
})
