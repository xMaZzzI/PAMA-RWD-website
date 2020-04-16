
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
const sectionsY = [];

sections.forEach(element => {
    if(element.offsetTop + 300 > window.pageYOffset + window.innerHeight){
        sectionsY.push(element.offsetTop);
        document.querySelector('.' + element.className.split(/\s+/)[0]).classList.remove('appear');
    }
});


window.addEventListener('scroll', ()=>{
        if(sectionsY.some( (elem, index, array) => {
            return (elem < window.pageYOffset + 175)
        }) === true)
        {
            document.querySelector('.' + sections[0].className.split(/\s+/)[0]).classList.add('appear');
            sectionsY.shift();
            sections.shift();
        }
});