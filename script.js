function toggleNavbar() {
    let menuMobile = document.querySelector('.navbar-nav');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open');
    }
}
