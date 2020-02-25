let burgers = []
const burgerMenu = document.getElementById('burger-menu')
const orderList = document.getElementById('order-list')
const form = document.getElementById('custom-burger')

function displayBurgers(response){
  burgerHTMLArr = response.map(burger => {
    return `<div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
        ${burger.description}
      </p>
      <button class="button" id=${burger.id}>Add to Order</button>
  </div>`
  })
  burgerMenu.innerHTML = burgerHTMLArr.join('')
}

document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/burgers')
    .then(resp => resp.json())
      .then(response => {
        burgers = response
        displayBurgers(response)
      })
    
  document.addEventListener("click", function(e){
    if (e.target.className === 'button'){
      let foundBurger = e.target.parentNode.children[0].innerText
      let li = document.createElement('li')
      li.innerText = `${foundBurger}`
      orderList.append(li)
    }
  })

  document.addEventListener("submit", function(e){
    e.preventDefault();
    let name = form.elements[0].value
    let description = form.elements[1].value
    let image = form.elements[2].value

    fetch('http://localhost:3000/burgers', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        image: image
      })
    }).then(resp => resp.json()).then(burger => {
      burgerMenu.innerHTML +=     
      `<div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">${burger.description}</p>
      <button class="button" id=${burger.id}>Add to Order</button>
      </div>`
      form.reset()
    })    
  })

})
