$('document').ready(() => {
  fetch('/api/v1/inventory')
  .then(res => res.json())
  .then(data => {
    cardMaker(data)
  })
})

let cardMaker = (data) => {
  data.inventory.forEach(item => {      
    $('#cards-wrapper').append(
      `<div class="inventory-item">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <img src="${item.picture}"/>
        <p>Price: ${item.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>`
    )
  })
}