$('document').ready(() => {
  fetch('/api/v1/inventory')
  .then(res => res.json())
  .then(data => {
    cardMaker(data)
  }).catch(err => console.log(err))

  let items = localStorage.getItem('cart')
  if (items) {
    let parsedItems = JSON.parse(items)
    for (let i = 0; i < parsedItems.length; i++) {
      let price = Number(parsedItems[i].price)
      let title = parsedItems[i].title

      $('#items-list').append(`<div class="cart-item"><p class="cart-item-title">${title}</p><p class="cart-item-price">Price: $${price}</p></div>`)
        let currentTotal = $('.cart-total').text()
        let add = Number(currentTotal) + Number(price)
        $('.cart-total').text(add.toFixed(2))
    }
  }

  fetch('/api/v1/orders')
  .then(res => res.json())
  .then(data => {
    data.orders.forEach(order => {
      let date = new Date(order.created_at);
      let displayDate = date.toString()
      $('#orders').prepend(`
      <div class="order-in-history">
        <p>Order ID: ${order.id}</p>
        <p>Order Date: ${displayDate}</p>
        <p>Total Price: $${order.total}</p>
      </div>`)
    })
  })
})

let cardMaker = (data) => {
  data.inventory.forEach(item => { 
    let cardHtml = document.createElement('div')
    cardHtml.classList.add('inventory-item')
    let titleHtml = document.createElement('h4')
    titleHtml.classList.add('card-title')
    titleHtml.innerHTML += item.title
    let descriptionHtml = document.createElement('p')
    descriptionHtml.classList.add('card-description')
    descriptionHtml.innerHTML += item.description
    let imgHtml = document.createElement('img')
    imgHtml.src = item.picture
    let priceHtml = document.createElement('p')
    priceHtml.classList.add('card-price')
    priceHtml.innerHTML += `Price: $${(item.price / 100).toFixed(2)}`
    let addToCartHtml = document.createElement('button')
    addToCartHtml.classList.add('add-to-cart')
    addToCartHtml.innerHTML += 'Add to Cart'

    addToCartHtml.addEventListener('click', () => {
      
      let title = item.title
      let price = (item.price / 100).toFixed(2)

      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({title: title, price: price})
      localStorage.setItem('cart', JSON.stringify(cart))
      $('#items-list').append(`<div class="cart-item"><p class="cart-item-title">${title}</p><p class="cart-item-price">Price: ${price}</p></div>`)
      let currentTotal = $('.cart-total').text()
      let add = Number(currentTotal) + Number(price)
      $('.cart-total').text(add.toFixed(2))
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

$('#checkout-button').on('click', () => {
  let orderTotal = $('.cart-total').text()
  fetch('/api/v1/orders', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      total: orderTotal
    })
  })
  .then(res => res.json())
  .then(data => {
    let order = data[0]
    $('#orders').prepend(`
      <div>
        <p>Order ID: ${order.id}</p>
        <p>Order Date: ${order.created_at}</p>
        <p>Total Price: ${order.total}</p>
      </div>`)
    $('#items-list').empty()
    $('.cart-total').text('')
    localStorage.clear();
    $('#cart-body').hide()
    $('#order-history-body').show()
  }).catch(err => console.log(err))
  
})

$('#history-reveal-button').on('click', () => {
  $('#order-history-body').toggle()
})