
const toggleButton = document.getElementsByClassName('toggle-button') [0]
const navbarLinks = document.getElementsByClassName('navbar-links') [0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('nav-active')
})

const items = document.getElementsByClassName('menuItem')

// Add event listeners to each menu item
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
      navbarLinks.classList.remove('nav-active');
    });
  }