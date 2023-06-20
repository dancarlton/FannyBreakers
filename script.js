'use strict';

window.addEventListener('load', windowLoaded);

function windowLoaded() {
  if (document.querySelector('.product_slider')) {
    new Swiper('.product_slider', {
      loop:true,
      speed:1000,
      parallax:true,
      mousewheel:true,
      keyboard:true,
      on: {
        init: function () {
          document.documentElement.classList.add('loaded');
        },
      },
    });
  }
}

// Add to Cart Animation

const cart = document.querySelector('.header_cart');
let cartValue = document.querySelector('.header_cart span');
const speedAnimation = 1000;

document.addEventListener('click', function (e) {
  const targetElement = e.target;
  if (targetElement.closest('.product_buy')) {

    const productSlide = targetElement.closest('.product_slide');
    const productImage = productSlide.closest('.product_picture');
    const productImageFly = productImage.cloneNode(true);

    const cartPos = {
      left: cart.getBoundingClientRect().left,
      top: cart.getBoundingClientRect().top
    };

    productImageFly.style.cssText = `
            position:fixed;
            left: ${productImage.getBoundingClientRect().left + window.scrollX}px;
            top: ${productImage.getBoundingClientRect().top + window.scrollY}px;
            width: ${productImage.offsetWidth}px;
            height: ${productImage.offsetHeight}px;
            transition:all ${speedAnimation}ms ease;
        `;

    document.body.append(productImageFly);

    setTimeout(() => {
      productImageFly.style.left = `${cartPos.left}px`;
      productImageFly.style.top = `${cartPos.top}px`;
      productImageFly.style.width = `0px`;
      productImageFly.style.height = `0px`;
      productImageFly.style.opacity = `0.5`;
    }, 0);

    setTimeout(() => {
      cartValue.innerHTML = ++cartValue.innerHTML;
      productImageFly.remove();
    }, speedAnimation);
  }
});
