const listeners = () => {
  const navToggler = document.querySelector('.nav-toggler');
  const navMenu = document.querySelector('.site-navbar ul');
  const navLinks = document.querySelectorAll('.site-navbar a');
  const allEventListners = () => {
    navToggler.addEventListener('click', togglerClick);
    navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
  };
  
  const togglerClick = () => {
    navToggler.classList.toggle('toggler-open');
    navMenu.classList.toggle('open');
  };
  
  const navLinkClick = () => {
    if(navMenu.classList.contains('open')) {
      navToggler.click();
    }
  };

  allEventListners();
};

export default listeners();
