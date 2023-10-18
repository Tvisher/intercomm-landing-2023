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


// const bgVideo = new Plyr('#bgVideo', {
//     controls: [],
//     muted: true,
//     loop: { active: true }
// });

const player = new Plyr('#player', {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'pip', 'airplay', 'fullscreen'],
});


window.scrollTo({ top: 0 });
window.addEventListener('load', (e) => {
    console.log('load');
    document.body.classList.remove('unloaded')
    AOS.init({
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1200, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });
    setTimeout(() => {
        document.querySelector('#bgVideo').play()
    }, 600);
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
            // verticalSliderSection.style.height = `${(slidesLength + 1) * 100}vh`;
            // console.log(slidesLength + 1);
            window.addEventListener('scroll', (e) => {
                const sliderTrigger = verticalSliderSection.getBoundingClientRect().top <= 0;
                if (sliderTrigger) {
                    const slideNumber = Math.abs(Math.round(verticalSliderSection.getBoundingClientRect().top / (window.innerHeight)))
                    verticalSextSlider.slideTo(slideNumber, 800);
                }
            })
        }

    }
});





// // Плавный скролл на сайте
// if (window.innerWidth > 1024) {
//     SmoothScroll({
//         // Время скролла 400 = 0.4 секунды
//         animationTime: 600,
//         // Размер шага в пикселях 
//         stepSize: window.innerHeight / 10,
//         // Ускорение 
//         accelerationDelta: 100,
//         // Максимальное ускорение
//         accelerationMax: 2,
//         // Поддержка клавиатуры
//         keyboardSupport: true,
//         // Шаг скролла стрелками на клавиатуре в пикселях
//         arrowScroll: 50,
//         // Pulse (less tweakable)
//         // ratio of "tail" to "acceleration"
//         pulseAlgorithm: true,
//         pulseScale: 3,
//         pulseNormalize: 1,
//         // Поддержка тачпада
//         touchpadSupport: true,
//     });
// }


const cardSliders = document.querySelectorAll('.cards-slider__container');
cardSliders.forEach(sliderContainer => {
    const sliderEl = sliderContainer.querySelector('.cards-slider');
    const prewBtn = sliderContainer.querySelector('.swiper-button-prev');
    const nextBtn = sliderContainer.querySelector('.swiper-button-next');

    const sliderSwiper = new Swiper(sliderEl, {
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: nextBtn,
            prevEl: prewBtn,
        },
        breakpoints: {
            580: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 111,
            }
        },
    });
})


const paralaxElems = document.querySelectorAll('[data-id="paralax-block"]');
if (paralaxElems.length > 0) {
    paralaxElems.forEach(elem => {
        const elemtntParent = elem.closest('section');
        const parallaxInstance = new Parallax(elem, {
            inputElement: elemtntParent,
            hoverOnly: true,
            relativeInput: true
        });
    });
}


//Аккардеон секции faq
$("[data-toggle-elem]").click(function () {
    $(this).parent().toggleClass('open')
    $(this).parent().find("[data-toggle-content]").slideToggle("slow");
});


const halfSlider = new Swiper('.half-slider', {
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
    },
    loop: 1,
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});



const centeredSlider = new Swiper('.centered-slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },

});


document.querySelector(".copy-block__btn").addEventListener("click", function () {
    var sourceText = document.querySelector(".copy-block__text");
    navigator.clipboard.writeText(sourceText.textContent).then(function () {
        document.querySelector(".copy-block__btn").classList.add('copied')
    }).catch(function (err) {
        console.error("Ошибка при копировании: ", err);
    });
});



const mobileBtn = document.querySelector('.mob-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.mob-menu-btn')) {
        mobileBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('hidden');
    }


    if (target.closest('[data-site-link]')) {
        e.preventDefault();
        mobileBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('hidden');
        const linkId = target.closest('[data-site-link]').dataset.siteLink;
        $("html, body").animate({ scrollTop: $(`${linkId}`).offset().top }, 500);
    }
})

const toTopBtn = document.querySelector('#to-top-btn');
toTopBtn.onclick = (e) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}

window.addEventListener('scroll', (e) => {
    window.scrollY > window.innerHeight ? toTopBtn.classList.add('show') : toTopBtn.classList.remove('show')
});



