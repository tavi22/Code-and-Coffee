if(document.status === 404) {
    window.location.href = '404.html'
}

if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ok)
} else {
    ok()
}



function ok() {
    onLoadCartNumbers()
    displayCart()


    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i=0; i<removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let j=0; j<quantityInputs.length; j++) {
        let input = quantityInputs[j]
        input.addEventListener('change', quantityUpdated)
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let k=0; k<addToCartButtons.length; k++) {
        let btn = addToCartButtons[k]
        btn.addEventListener('click', addToCartClicked)
    }

    let butonFinalizareComanda = document.getElementsByClassName('btn-purchase')[0]
    if (butonFinalizareComanda) {
        butonFinalizareComanda.addEventListener('click', finalizareComanda)
    }

}

function addToCartClicked(event) {
    cartNumbers()
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let nume = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let pret = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let img = shopItem.getElementsByClassName('shop-item-image')[0].src

    let product = { name: nume,
                    tag: "Tag-" + nume,
                    price: pret,
                    src: img,
                    contor: 0}

    addItemToCart(product)

}

function addItemToCart(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)

    if(cartItems != null) {
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].contor +=1;
    } else {
        product.contor = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))

}

function displayCart() {

    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let productsContainer = document.getElementsByClassName('cart-items')[0]
    let total = 0

    if (cartItems && productsContainer) {
        let itemsArr = Object.values(cartItems)
        for(let z=0; z<itemsArr.length; z++) {
            sursa = itemsArr[z].src
            titlu = itemsArr[z].name
            pretul = itemsArr[z].price
            cantitate = itemsArr[z].contor



        let cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        cartRow.innerHTML = `<div class="cart-item cart-column">
                <img class="cart-item-image" src=${sursa} width="100" height="100" alt="">
                <span class="cart-item-title">${titlu}</span>
            </div>
            <span class="cart-price cart-column">${pretul}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value=${cantitate}>
                <button class="btn btn-danger" type="button">STERGE</button>
            </div>`
        productsContainer.append(cartRow)
        }
        calcTotal()
    }

}


function removeCartItem() {
    let parent = event.target.parentElement.parentElement
    let aux = parent.getElementsByClassName('cart-item-title')[0].innerText


    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let itemsArr = Object.values(cartItems)
    let newValues = []
    let skip = ''
    for(let z=0; z<itemsArr.length; z++) {
        if (itemsArr[z].name === aux) {
            skip = itemsArr[z].tag
        } else {
            newValues.push(itemsArr[z])
        }
    }

    if (skip !== '') {
        delete cartItems[skip]
    }

    if (newValues.length === 0) {
        localStorage.removeItem('productsInCart')
    } else {
        localStorage.setItem('productsInCart', JSON.stringify(cartItems))
    }


    parent.remove()
    onLoadCartNumbers()
    calcTotal()

}

function quantityUpdated(event) {
    let input = event.target
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1
    }
    calcTotal()

    let newCartNumbers = 0
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    let valori = Object.values(cartItems)
    for (let i=0; i<valori.length; i++) {
        newCartNumbers += valori[i].contor
    }

    localStorage.setItem('cartNumbers', newCartNumbers)
}

function calcTotal() {
    let cartItemsContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemsContainer.getElementsByClassName('cart-row')
    let pretTotal = 0
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)


    for (let i=0; i<cartRows.length; i++) {
        let row = cartRows[i]
        let priceElement = row.getElementsByClassName('cart-price')[0]
        let quantityElement = row.getElementsByClassName('cart-quantity-input')[0]
        let titleElement = row.getElementsByClassName('cart-item-title')[0]
        let theTag = 'Tag-' + titleElement.innerText

        let pret = parseFloat(priceElement.innerText.replace(' LEI', ''))
        let cantitate = quantityElement.value
        if (cantitate !== undefined && cartItems[theTag] !== undefined) {
            cartItems[theTag].contor = parseInt(cantitate)
        } else if ( cantitate === undefined) {
            cartItems[theTag].contor = 0
        }


        pretTotal += pret * cantitate

    }


    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
    pretTotal = Math.round(pretTotal*100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = pretTotal + 'LEI'
}

function onLoadCartNumbers() {
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'))
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems)
    if (cartItems === undefined || cartItems === null) {
        localStorage.removeItem('cartNumbers')
        localStorage.removeItem('productsInCart')
        return
    }
    let itemsArr = Object.values(cartItems)
    let c = 0
    for(let z=0; z<itemsArr.length; z++) {
        c += itemsArr[z].contor
    }

    if (productNumbers) {
        if(productNumbers === c) {
            document.querySelector(".cartNr").textContent = '(' + productNumbers + ')'
        } else {
            document.querySelector(".cartNr").textContent = '(' + c + ')'
            localStorage.setItem('cartNumbers', c)

        }
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')

    productNumbers = parseInt(productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector(".cartNr").textContent = '(' + parseInt(productNumbers + 1) + ')'
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector(".cartNr").textContent = '(1)'

    }
}


function finalizareComanda() {

    localStorage.removeItem('productsInCart')
    localStorage.removeItem('cartNumbers')
    location.reload()
    alert('Iti multumim ca ai comandat de la noi!')
}

