const toggler = document.querySelector(".toggler");
const navLinks = document.querySelector(".nav-links");
const url = "https://hv-profile-api.herokuapp.com/profiles";
const profile = document.querySelector(".profile");

const timeline = gsap.timeline();
timeline
  .from(".navbar", {
    opacity: 0,
    y: -100,
    duration: 1,
    ease: "power3.out",
  })
  .from(
    ".linkeSeite",
    {
      opacity: 0,
      x: -200,
      duration: 2.5,
      ease: "power4.out",
    },
    "-=-1"
  )
  .from(
    ".rechteSeite",
    {
      opacity: 0,
      x: 200,
      duration: 2.5,
      ease: "power4.out",
    },
    "-=2.3"
  )
  .from(
    ".deco",
    {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1.5"
  );

//Scrolling

gsap.from(".rechteSeite2", {
  scrollTrigger: {
    trigger: ".rechteSeite2",
    start: "bottom bottom",
    end: "bottom bottom-=20%",

    scrub: true,
    // markers: true,
  },
  y: -100,
  opacity: 0,

  ease: "power4.out",
});
gsap.from(".linkeSeite1", {
  scrollTrigger: {
    trigger: ".linkeSeite1",
    start: "bottom bottom",
    end: "bottom bottom-=20%",

    scrub: true,
    // markers: true,
  },
  y: -100,
  opacity: 0,

  ease: "power4.out",
});

toggler.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
//Gsaping

//Fetching
async function presentData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  //Display
  let displayProfile = data
    .map((item) => {
      return `<article class="${item.id} hero flex flex-col justify-center md:flex-row md:w-5/6 md:mx-auto items-center">
      <div class="linkeSeite mt-8 mb-4 px-6  md:w-1/3 w-full ">
      <img src="${item.img.name}" class="w-full" alt=""/>
      
      </div>
      <div class="rechteSeite  md:text-left md:w-1/3 mx-auto w-10/12">
        <h1><span class="text-green-700 text-2xl font-bold font-mono">Name: </span>${item.name}</h1>
        <h1><span class="text-green-700 text-2xl font-bold font-mono">Position: </span>${item.position}</h1>
        <h1><span class="text-green-700 text-2xl font-bold font-mono">Height: </span>${item.height}</h1>
        <h1><span class="text-green-700 text-2xl font-bold font-mono">Weight: </span>${item.weight}</h1>
        
      </div>
      </article>`;
    })
    .join("");

  profile.innerHTML = displayProfile;
}

window.addEventListener("DOMContentLoaded", () => {
  presentData(url);
});

barba.init({
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
        });
      },
    },
  ],
});
