let addToy = false;

//EVENT LISTENERS
function handleSubmit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  postToy(toyObj)

}

//HELPER FUNCTIONS
function getLikes(string) {
  let ind = string.indexOf(' ')
  return parseInt(string.slice(0,ind));
}


//DOM RENDER FUNCTIONS
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

  getAllToys()
  toyFormContainer.addEventListener('submit',handleSubmit)

});


//FETCH REQUESTS 

function getAllToys() {
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toy) {
  let card = document.createElement('div');
  card.className = 'card'
  card.innerHTML = `
    <h2>${toy['name']}</h2>
    <img src=${toy['image']} class="toy-avatar" />
    <p>${toy['likes']} Likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
    </div>
    `

  card.querySelector('.like-btn').addEventListener('click', ()=> {
    toy.likes += 1
    updateLikes(toy)
  })
  document.querySelector('#toy-collection').appendChild(card)
}

function postToy(toyObj) {
  fetch('http://localhost:3000/toys/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(toyObj)
    
  })
  .then(res => res.json())
  .then(toy => renderOneToy(toy))
}

function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj['id']}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      Accept: "application/json"
      },
      body: JSON.stringify({
        'likes': toyObj.likes
      })
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
}