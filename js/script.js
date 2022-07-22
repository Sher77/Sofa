// ===
const lang = document.querySelector('.lang__item');
const langDropdown = document.querySelector('.lang__dropdown');
const angleDown = document.querySelector('.icon-angle-down-1');
const sliders = document.querySelectorAll('.categories');
const dropdownMenuLink = document.querySelector('.pull-out-menu__link--dropdown');
const dropdownMenu = document.querySelector('.pull-out-menu__dropdown');
const btnBurger = document.querySelector('.burger-menu');
const btnClose = document.querySelector('.pull-out-menu__btn');
const pullOutMenu = document.querySelector('.pull-out-menu__wrap');
const searchBtn = document.querySelector('.extra-menu__search');
const searchWrap = document.querySelector('.header__search-wrap');
const searchBtnClose = document.querySelector('.header__search-wrap--btn');
const cartBtn = document.querySelector('.extra-menu__cart');
const cartContent = document.querySelector('.shopping-cart');

// Выбор языка
lang.addEventListener('click', () => {
  langDropdown.classList.toggle('open__lang');
  angleDown.classList.toggle('open__icon');
});

dropdownMenuLink.addEventListener('click', (event) => {
  event.preventDefault();
  
  if(dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  } else {
    dropdownMenu.style.display = 'block';
  }
});

// Поисковая строка 
searchBtn.addEventListener('click', () => {
  searchWrap.style.transform = 'translateY(0%)';
  body.style.overflow = 'hidden';
	body.style.paddingRight = "17px";
});

searchWrap.addEventListener('click', function(event) {
  const target = event.target;
  
	if(target.classList.contains('header__search-wrap') || target.classList.contains('header__search-wrap--btn')) {
    searchWrap.style.transform = 'translateY(-120%)';
    body.style.overflow = 'scroll';
    body.style.paddingRight = "initial";
	}	
})

// SWIPERS
const swiper = new Swiper('.discounts', {
  // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
sliders.forEach((el) => {
    const swiper1 = new Swiper('.categories', {
      // Optional parameters
      loop: true,
      slidesPerView: 1,
      allowTouchMove: true,
      spaceBetween: 40,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      
      breakpoints: {
        575: {
          slidesPerView: 2,
          allowTouchMove: true,
          // spaceBetween: 30
        },
        767: {
          slidesPerView: 3,
          allowTouchMove: true,
          // spaceBetween: 40
        },
        991: {
          slidesPerView: 4,
          allowTouchMove: false,
        }
      },
      navigation: {
        nextEl: el.querySelector('.swiper-button-next'),
        prevEl: el.querySelector('.swiper-button-prev'),
      },
  });
})

// SELECT
const multiDefault = () => {
  const elements = document.querySelectorAll('.product__select');
	elements.forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
		});
	});
}
multiDefault();

const multiDefaultS = () => {
  const elements = document.querySelectorAll('.cart-product__middle--count');
	elements.forEach(el => {
    const choices = new Choices(el, {
      searchEnabled: false,
		});
	});
}
multiDefaultS();

// SMOOTH TRANSITION
{
  const scrollLinks = document.querySelectorAll('a.smooth-link');
  
	for(const scrollLink of scrollLinks) {
    scrollLink.addEventListener('click', event => {
      event.preventDefault();
      
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
				block: 'start',
			});
		});
	}
}

// Открытие скрытого меню
btnBurger.addEventListener('click', (event) => {
  pullOutMenu.classList.add('menu__open');
  pullOutMenu.classList.remove('menu__close');
  body.style.overflow = 'hidden';
});

btnClose.addEventListener('click', (event) => {
  pullOutMenu.classList.add('menu__close');
  pullOutMenu.classList.remove('menu__open');
  body.style.overflow = 'scroll';
});

// Открытие подменю в PullOutMenu
pullOutMenu.addEventListener('click', function(event) {
  const target = event.target;
  
	if(target.classList.contains('pull-out-menu__wrap') || target.classList.contains('menu__close')) {
    pullOutMenu.classList.add('menu__close');
    pullOutMenu.classList.remove('menu__open');
    body.style.overflow = 'scroll';
	}	
})

const modal = new GraphModal({
  isOpen: (modal) => {
    console.log('opened');
  },
  isclose: (modal) => {
    console.log('closed');
  }
})

const sorting = document.querySelectorAll('.sorting__link--dropdown');
const sortingDropdown = document.querySelectorAll('.sorting__dropdown');

sorting.forEach((item, itemIndex) => {
  item.addEventListener('click', function() {
    sortingDropdown.forEach((sortingDropdown, listIndex) => {
      if (itemIndex === listIndex) {
        sortingDropdown.classList.toggle('open__lang');
      }
    });
  });
});

document.querySelectorAll('.tabs__btn').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.ordering-delivery__fake').forEach(elem => {
      elem.classList.toggle('fake-checkbox');
    });
  });
});

const checkboxRegCustomers = document.querySelectorAll('.ordering-delivery__input--regular-customers');
const passwordRegCustomers = document.querySelectorAll('.ordering-delivery__password');

checkboxRegCustomers.forEach(el => {
  el.addEventListener('click', () => {
    passwordRegCustomers.forEach(elem => {
      elem.classList.toggle('open');
    });
  });
});

const typeFurnitureLink = document.querySelectorAll('.type-furniture__link--catalog');
const longGoodsList = document.querySelector('.products-grid');

const getGoods = async () => {
  const result = await fetch('db/db.json')
  if (!result.ok) {
    throw 'Ошибка' + result.status;
  }
  return await result.json();
}

const createCard = ({ discount, link, img, name, label, price, oldprice, id }) => {
  const card = document.createElement('li');
  card.className = 'products-grid__item';

  card.innerHTML = `
    <article class="product" tabindex="0">
      <div class="product__visible">
        ${discount ?
        `<span class="product__discount">Скидка ${discount} %</span>` :
        ``}
          <a class="product__link" href="${link}">
              <img class="product__img" src="db/${img}" alt="${name}">
          </a>
          ${label ?
            `<span class="product__availability">${label}</span>` :
            `<span class="product__availability--not">Нет в наличии</span>`}
          <p class="product__name">${name}</p>
          <div class="product__price">
              <span class="product__price--current">${price}</span>
              <span class="product__price--old">${oldprice}</span>
          </div>
      </div>
      <div class="product__overflow">
          <button class="product__btn btn" data-graph-path="cart" data-graph-animation="fadeInUp" data-id="${id}">В корзину</button>
          <a href="#no__scroll" class="product__order">Заказ в один клик</a>
          <select name="material" class="product__select" aria-label="Выбор обивки">
              <option value="">Материвал обивки</option>
              <option value="leather">Кожа</option>
          </select>
          <select name="color" class="product__select" aria-label="Выбор цвета">
              <option value="">Цвет обивки</option>
              <option value="black">Черный</option>
              <option value="red">Красный</option>
          </select>
      </div>
    </article>
  `;

  return card;
};

const renderCards = function(data) {
  longGoodsList.textContent = '';
  const cards = data.map(createCard);
  longGoodsList.append(...cards);
};

const filterCards = (field, value) => {
  getGoods()
    .then(data => data.filter(good => good[field] === value))
    .then(renderCards);
}

typeFurnitureLink.forEach((link) => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const field = link.dataset.field;
    const value = link.textContent;
    filterCards(field, value); 
  });
});
// filterCards(field, value); 

const cartTableGoods = document.querySelector('.cart-table__goods');
const cartTableTotal = document.querySelector('.cart-table__total');
const cartCount = document.querySelector('.shopping-cart__quantity');
const btnCartClear = document.querySelector('.btn-danger');

const cart = {
	cartGoods: [],
	countQuantity() {
		cartCount.textContent = this.cartGoods.reduce((sum, item) => {
			return sum + item.count
		}, 0)
	},
	clearCart() {
		this.cartGoods.length = 0;
		this.countQuantity();
		this.renderCart();
	},
	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count }) => {
			const trGood = document.createElement('tr');
			trGood.className = 'cart-item';
			trGood.dataset.id = id;
			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price} руб</td>
				<td><button class="cart-btn-minus">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus">+</button></td>
				<td>${price * count} руб</td>
				<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGood);
		});
		const totalPrice = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count
		}, 0);

		cartTableTotal.textContent = totalPrice + ' руб'

	},
	deleteGood(id) {
		this.cartGoods = this.cartGoods.filter(item => id !== item.id)
		this.renderCart();
		this.countQuantity();
	},
	minusGood(id) {
		for(const item of this.cartGoods) {
			if(item.id === id) {
				if (item.count <= 1) {
					this.deleteGood(id);
				} else {
					item.count--;
				}
				break;
			}
		}
		this.renderCart();
		this.countQuantity();
	},
	plusGood(id) {
		for(const item of this.cartGoods) {
			if(item.id === id) {
				item.count++;
				break;
			}
		}
		this.renderCart();
		this.countQuantity();
	},
	addCartGoods(id) {
		const goodItem = this.cartGoods.find(item => item.id === id);

		if(goodItem) {
			this.plusGood(id);
		} else {
			getGoods()
				.then(data => data.find(item => item.id === id))
				.then(({ id, name, price }) => {
					this.cartGoods.push({
						id,
						name,
						price,
						count: 1 
					});
					this.countQuantity();
				});
		}
	},
}

btnCartClear.addEventListener('click', () => {
	cart.clearCart();
})

document.body.addEventListener('click', (event) => {
  const addToCart = event.target.closest('.add-to-cart');
  if (addToCart) {
    cart.addCartGoods(addToCart.dataset.id)
  }
})

cartTableGoods.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    const id = target.closest('.cart-item').dataset.id;

    if (target.classList.contains('cart-btn-delete')) {
      cart.deleteGood(id);
    };
    
    if (target.classList.contains('cart-btn-plus')) {
      cart.plusGood(id);
    };
    
    if (target.classList.contains('cart-btn-minus')) {
      cart.minusGood(id);
    };
  }
});


const openModal = () => {
  cart.renderCart();
	cartContent.classList.add('show');
  body.style.overflowY = 'hidden';
  body.style.paddingRight = '17px';
}

const closeModal = () => {
  cartContent.classList.remove('show');
  body.style.overflowY = 'scroll';
  body.style.paddingRight = '0';
}

cartBtn.addEventListener('click', () => {
  openModal();  
});

cartContent.addEventListener('click', (event) => {
  const target = event.target;
  
  if(target.classList.contains('shopping-cart') || target.classList.contains('menu__close')) {
    closeModal();
  }
});
