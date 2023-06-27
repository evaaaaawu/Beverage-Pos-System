//app.js

const beveragePos = new BeveragePos()

const addDrinkButton = document.querySelector('[data-beverage-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  // 1. get checked value of options
  const drinkName = beveragePos.getCheckedValue('drink')
  const ice = beveragePos.getCheckedValue('ice')
  const sugar = beveragePos.getCheckedValue('sugar')

  // 2. show alert if user did not check any drink option
  if (!drinkName) {
    alert('Please choose at least one item.')
    return
  }

  // 3. Use Drink Constructor to create drink instance
  const drink = new Drink(drinkName, sugar, ice)

  // 4. add order UI
  beveragePos.addDrink(drink)
})

// Constructor function for Beverage Pos System
function BeveragePos() { }
BeveragePos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

const orderLists = document.querySelector('[data-order-lists]')
BeveragePos.prototype.addDrink = function (drink) {
  let orderListsCard = `
    <div class="card mb-3">
      <div class="card-body pt-3 pr-3">
        <!-- delete drink icon -->
        <div class="text-right">
          <span data-beverage-pos="delete-drink">×</span>
        </div>
        <h6 class="card-title mb-1">${drink.name}</h6>
        <div class="card-text">${drink.ice}</div>
        <div class="card-text">${drink.sugar}</div>
      </div>

      <div class="card-footer text-right py-2">
        <div class="card-text text-muted">
          $ <span data-drink-price></span>${drink.price()}</span>
        </div>
      </div>
    </div>
  `
  orderLists.insertAdjacentHTML('afterbegin', orderListsCard)
}

function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}
