
//navigation
//button
const hamburgerBtn = document.querySelector('.navigation-btn');
//eventlistener
hamburgerBtn.addEventListener("click", ()=>{
    //document.querySelector('.page-navigation').classList.toggle('open');
    document.querySelector('.top-bar').classList.toggle('open');
});

//scrolling to sections
function smoothScroll(target, time){
    let destination = document.querySelector(target);
    let targetPos = destination.offsetTop - 50;
    let currentPos = window.pageYOffset;
    let distance = targetPos - currentPos;
    let startTime = null;

    function animation(currentTime){
        if (startTime === null) startTime = currentTime;
        let progress = currentTime - startTime;
        let makeSmooth = ease(progress, currentPos, distance, time)
        window.scrollTo(0,makeSmooth)
        if (progress < time) requestAnimationFrame(animation); 
    }
    
    function ease(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    };

    requestAnimationFrame(animation); 

}
    
//navigationButtons
const navBtns = document.querySelectorAll('.nav-btn')
for (let i = 0; i < navBtns.length; i++){
    navBtns[i].addEventListener("click", ()=>{
        let allSections = document.querySelectorAll('section')
        let target = allSections[i].className.split(/\s+/)
        document.querySelector('.top-bar').classList.toggle('open');
        smoothScroll('.' + target, 1000);
    })
}

const logo = document.querySelector('.logo')
logo.addEventListener("click", ()=>{
    smoothScroll('.top-bar', 1000);
});


//scroll icon

//move to first section
const scrollBtn = document.querySelector('.scroll-icon');
scrollBtn.addEventListener("click", ()=>{
    smoothScroll('.about', 1000);
});

// move button constantly
const firstSection = document.querySelector('section');
const move = setInterval(()=>{
    if(window.pageYOffset + 74 < firstSection.offsetTop){
        scrollBtn.classList.toggle('move')
    }
}, 500);

// text appearing
const sections = Array.from(document.querySelectorAll('section'));
const tempSections = [...sections];
console.log(sections);
const sectionsY = [];

tempSections.forEach(element => {
    console.log(element)
    if(element.offsetTop > window.pageYOffset + window.innerHeight - 300){
        sectionsY.push(element.offsetTop - 100);
    }
    else{
        console.log(element)
        element.classList.add('appear');
        sections.shift();
    }
});


window.addEventListener('scroll', ()=>{
        if(sectionsY.some( async (elem, index, array) => {
            return (elem < window.pageYOffset + innerHeight)
        }) === true)
        {
            console.log(window.pageYOffset + innerHeight);
            sections[0].classList.add('appear');
            sectionsY.shift();
            sections.shift();
        }
});

function increaseImgOpacity(image , opacity){
     if (opacity < 1){
            opacity += .05;
            setTimeout(()=>{increaseImgOpacity(image, opacity)}, 50);
        }
    image.style.opacity = opacity;
};

function decreaseImgOpacity(image , opacity){
    if (opacity > 0){
            opacity -= .05;
            setTimeout(()=>{decreaseImgOpacity(image , opacity)}, 50);
        }
    image.style.opacity = opacity;
};

// query(zdjecia) -> img[i] decrease && img[i + 1] increase
const allSliderImg = document.querySelectorAll('.slider-img');

let i=0;
let j=1;
const slider = setInterval(()=>{
    decreaseImgOpacity(allSliderImg[i] , 1);
    increaseImgOpacity(allSliderImg[j] , 0);
    if(j == allSliderImg.length - 1){
        j = 0;
    }
    else{
        j++;
    }
    if(i == allSliderImg.length - 1){
        i = 0;
    }
    else{
        i++;
    }
},5000);
