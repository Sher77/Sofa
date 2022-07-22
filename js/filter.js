const filter = document.querySelector('.catalog__widget-filter');
const filterWidget = document.querySelectorAll('.filter__widget--title');
const filterContent = document.querySelectorAll('.filter__widget--content');
const filterWrap = document.querySelector('.filter__wrap');
const filterWrapClose = document.querySelector('.filter__close--btn');

filterWidget.forEach((item, itemIndex) => {
  item.addEventListener('click', function() {
    filterContent.forEach((filterContent, listIndex) => {
      if (itemIndex === listIndex) {
        filterContent.classList.toggle('open');
      }
    });
  });
});

filter.addEventListener('click', (event) => {
  filterWrap.classList.add('menu__open');
  filterWrap.classList.remove('menu__close');
  body.style.overflow = 'hidden';
});

// Открытие подменю в PullOutMenu
filterWrap.addEventListener('click', function(event) {
  const target = event.target;
  
  if(target.classList.contains('filter__wrap') || target.classList.contains('filter__close--btn')) {
    filterWrap.classList.add('menu__close');
    filterWrap.classList.remove('menu__open');
    body.style.overflowY = 'scroll';
  }	
})

var myElement = document.getElementById('filter');
new SimpleBar(myElement, { autoHide: true });