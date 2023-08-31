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


const bgVideo = new Plyr('#bgVideo', {
    controls: [],
    muted: true,
    loop: { active: true }
});

const player = new Plyr('#player', {
    controls: ['play-large'],
});

// bgVideo.on('ready', (event) => {
//     document.body.classList.remove('unloaded')
//     bgVideo.play()
//     setTimeout(() => {
//         AOS.init({
//             delay: 0, // values from 0 to 3000, with step 50ms
//             duration: 1200, // values from 0 to 3000, with step 50ms
//             easing: 'ease', // default easing for AOS animations
//             once: true, // whether animation should happen only once - while scrolling down
//         });
//     }, 500);
// });

window.scrollTo({ top: 0 });
window.addEventListener('load', (e) => {
    document.body.classList.remove('unloaded')
    AOS.init({
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1200, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
    });
    setTimeout(() => {
        bgVideo.play()
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





// Плавный скролл на сайте
SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 600,
    // Размер шага в пикселях 
    stepSize: window.innerHeight / 10,
    // Ускорение 
    accelerationDelta: 100,
    // Максимальное ускорение
    accelerationMax: 2,
    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,
    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 3,
    pulseNormalize: 1,
    // Поддержка тачпада
    touchpadSupport: true,
});


const cardSliders = document.querySelectorAll('.cards-slider__container');
cardSliders.forEach(sliderContainer => {
    const sliderEl = sliderContainer.querySelector('.cards-slider');
    const prewBtn = sliderContainer.querySelector('.swiper-button-prev');
    const nextBtn = sliderContainer.querySelector('.swiper-button-next');

    const sliderSwiper = new Swiper(sliderEl, {
        slidesPerView: 3,
        spaceBetween: 111,
        speed: 800,
        navigation: {
            nextEl: nextBtn,
            prevEl: prewBtn,
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