$('document').ready(() => {
  fetch('/api/v1/inventory')
  .then(res => res.json())
  .then(data => {
    cardMaker(data)
  }).catch(err => console.log(err))

  let items = localStorage.getItem('cart');
  let parsedItems = JSON.parse(items)
  
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
    priceHtml.innerHTML += `Price: ${(item.price / 100).toFixed(2)}`
    let addToCartHtml = document.createElement('button')
    addToCartHtml.classList.add('add-to-cart')
    addToCartHtml.innerHTML += 'Add to Cart'

    addToCartHtml.addEventListener('click', () => {
      let title = item.title
      let price = (item.price / 100).toFixed(2)

      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({title: title, price: price})
      localStorage.setItem('cart', JSON.stringify(cart))
      $('#items-list').append(`<div><p>${title}</p><p>Price: ${price}</p></div>`)
      let currentTotal = $('.cart-total').text()
      console.log(currentTotal)
      console.log(typeof +price)
      let test = Number(currentTotal) + Number(price)
      console.log(test)
      $('.cart-total').text(test)
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
  $('#cart-body').toggle()
})