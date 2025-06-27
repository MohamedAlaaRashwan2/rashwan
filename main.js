window.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader-wrapper");
  const loader2 = document.querySelector(".loader");
  loader2.classList.add("hidden");
  loader.classList.remove("loader-wrapper");
  document.body.removeAttribute("class");
});

// Start Navbar
const links = document.querySelectorAll('nav .container .main-nav li a');
links.forEach(el => {
  el.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-scroll')) {
      const sectionId = e.target.getAttribute('data-scroll');
      const section = document.getElementById(sectionId);
      section.scrollIntoView();
    }
    e.preventDefault();
    links.forEach(link => link.classList.remove('active'));
    el.classList.add('active');
  })
});
const logo = document.querySelectorAll('.main-logo');
logo.forEach(el => {
  el.addEventListener('click', () => {
    window.scrollTo(0, 0);
  })
})
const input1 = document.getElementById('burger');
const menu = document.querySelector('nav .container .main-nav');
input1.addEventListener('change', () => {
  menu.classList.toggle('open');
});

document.addEventListener("click", (event) => {
  if (
    !menu.contains(event.target) &&
    !input1.contains(event.target) &&
    menu.classList.contains('open')
  ) {
    setTimeout(() => {
      input1.checked = false;
      menu.classList.remove('open');
    }, 30);
  }
});
// End Navbar
//Start Home
// Start Typewriter
class Typewriter {
  constructor(el, words, wait = 3000) {
    this.el = el;
    this.words = words;
    this.wait = wait;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.timer = null;
    this.type();
  }

  type() {
    const currentWord = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentWord];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt;

    let typeSpeed = 100;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 700;
    }

    this.timer = setTimeout(() => this.type(), typeSpeed);
  }

  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

let mediaQuery = window.innerWidth;
let typewriterInstance = null;

function init() {
  const el = document.getElementById('typewriter');
  const words = ['Frontend Developer', 'UI/UX Designer'];
  const wait = 2000;

  if (typewriterInstance) {
    typewriterInstance.stop();
    typewriterInstance = null;
  }
  if (mediaQuery > 991) {
    typewriterInstance = new Typewriter(el, words, wait);
  } else {
    el.innerHTML = words[0];
  }
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', () => {
  mediaQuery = window.innerWidth;
  init();
});

// End Typewriter
const imageHome = document.querySelector('.image img');
const stats = document.querySelector('.home .container .text .stats');
window.addEventListener('DOMContentLoaded', () => {
  imageHome.style.animation = 'slide 1.3s ease-in-out';
  stats.style.animation = 'home 1.3s ease-in-out';
});

// End Home

// Start Services
// Start Fade-in on scroll
const boxes = document.querySelectorAll('.services .container .box');

const options = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
}
const boxobserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      boxobserver.unobserve(el.target);
    }
  });
}, options);
boxes.forEach(box => boxobserver.observe(box))
// End Services

// Start Skills
const skills = document.getElementById('skills');
const skillsNums = document.querySelectorAll('.skills .container .skill .text .num');
const circle = document.querySelectorAll('.skills .container .skill circle');
const skillsContainer = document.querySelector('.skills .container');
const options2 = {
  threshold: 0.2,
  rootMargin: '0px 0px -100px 0px'
}
const skillsobserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    skillsContainer.classList.add('visible');
    skillsNums.forEach(num => {
      num.innerHTML = 0;
      const target = num.dataset.value;
      let current = 0;
      const interval = setInterval(() => {
        current++;
        if (current > target) {
          clearInterval(interval);
        } else {
          num.innerHTML = current;
        }
      }, 10);
    })
    circle.forEach(circle => {
      const target = circle.dataset.value;
      circle.style.strokeDashoffset = 472 - 472 * (target / 100);
    })
    skillsobserver.unobserve(skills);
  }
}, options2);
skillsobserver.observe(skills);

// End Skills

// Start Portfolio
const portfolio = document.querySelectorAll('.portfolio .container .box');
const portfolioobserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      portfolioobserver.unobserve(el.target);
    }
  })
}, {threshold: 0.1, rootMargin: '0px 0px -150px 0px'});
portfolio.forEach(portfolio => portfolioobserver.observe(portfolio));
// End Portfolio
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  try {
    const res = await fetch("https://formspree.io/f/mdkgvvgl", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    form.reset();
    if (res.ok) {
      console.log("✅ Message sent");
    } else {
      console.error("❌ Error sending form");
    }

  } catch (err) {
    console.error("❌ Network error");
  }
});

const showMoreBtn = document.getElementById('show-more-btn');
showMoreBtn.addEventListener('click', () => {
  const portfolio = document.querySelectorAll('.portfolio .container .box.five');
  if (portfolio[0].style.display === 'block') {
    portfolio[0].style.display = 'none';
    showMoreBtn.innerHTML = 'Show More';
  } else {
    portfolio[0].style.display = 'block';
    showMoreBtn.innerHTML = 'Show Less';
  }
});

