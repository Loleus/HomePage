export default function() {
  const navToggler = document.querySelector('.nav-toggler');
  const navMenu = document.querySelector('.site-navbar ul');
  const navLinks = document.querySelectorAll('.site-navbar a');
  const navBarArea = document.querySelector('.navbar-area');
  
  const allEventListners = () => {
    navToggler.addEventListener('click', togglerClick);
    navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
  };
  
  const togglerClick = () => {
    navToggler.classList.toggle('toggler-open');
    navMenu.classList.toggle('open');
    navBarArea.classList.toggle('active');
  };
  
  const navLinkClick = () => {
    if(navMenu.classList.contains('open')) {
      navToggler.click();
    }
  };

  allEventListners();
}
