$('document').ready(() => {
  fetch('/api/v1/inventory')
  .then(res => res.json())
  .then(data => {
    cardMaker(data)
  })
})

let cardMaker = (data) => {
  data.inventory.forEach(item => { 
    let cardHtml = document.createElement('div')
    cardHtml.classList.add('inventory-item')
    let titleHtml = document.createElement('h4')
    titleHtml.innerHTML += item.title
    let descriptionHtml = document.createElement('p')
    descriptionHtml.innerHTML += item.description
    let imgHtml = document.createElement('img')
    imgHtml.src = item.picture
    let priceHtml = document.createElement('p')
    priceHtml.innerHTML += `Price: ${item.price}`
    let addToCartHtml = document.createElement('button')
    addToCartHtml.innerHTML += 'Add to Cart'

    addToCartHtml.addEventListener('click', () => {
      let title = item.title
      let price = item.price
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({title: title, price: price})
      localStorage.setItem('cart', JSON.stringify(cart));
    })

    cardHtml.append(titleHtml)
    cardHtml.append(descriptionHtml)
    cardHtml.append(imgHtml)
    cardHtml.append(priceHtml)
    cardHtml.append(addToCartHtml)
    $('#cards-wrapper').append(cardHtml)
  })
}

$('#cart-reveal-button').on('click', () => {
  console.log('fired')
})

// $('#cards-wrapper').on('click', (e) => {
//   let item = $(e.target).parent()[0]
//   let values = $(item).text()
//   let actualValue = values.replace('Add to Cart', '')
//   let test = actualValue.split('\n')
//   let cart = JSON.parse(localStorage.getItem('cart')) || []
//   cart.push(test)
//   localStorage.setItem('cart', JSON.stringify(cart));
// })