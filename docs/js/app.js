'use strict';
function testWebP() {
    return new Promise(res => {
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = () => {
            res(webP.height === 2);
        };
    }).then(hasWebP => {
        let className = hasWebP === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
};
// Проверка поддержки webP 
testWebP();



//логика работы меню бургер
document.body.addEventListener('click', (e) => {
    const target = e.target;
});

const mainScreenBg = document.querySelector('.main-screen__bg img,.main-screen__bg video');
mainScreenBg.addEventListener('load', (e) => {
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
})

const verticalSliderSection = document.querySelector('#vertical-slider');

const verticalSextSlider = new Swiper('.vertical-text-slider', {
    direction: 'vertical',
    watchOverflow: true,
    slidesPerView: 1,
    speed: 800,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
    },
    on: {
        init(swiper) {
            const slidesLength = swiper.slides.length;
            verticalSliderSection.style.height = `${(slidesLength + 1) * 100}vh`;
            window.addEventListener('scroll', (e) => {
                const sliderTrigger = verticalSliderSection.getBoundingClientRect().top <= 0;
                if (sliderTrigger) {
                    const slideNumber = Math.abs(Math.round(verticalSliderSection.getBoundingClientRect().top / (window.innerHeight)))
                    verticalSextSlider.slideTo(slideNumber, 500);
                }
            })
        }

    }
});
