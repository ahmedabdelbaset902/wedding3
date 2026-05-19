/* =========================
   SAFETY + INIT
========================= */

document.body.style.overflow = "hidden";

/* =========================
   ELEMENTS
========================= */

const inviteWrapper = document.getElementById("inviteWrapper");
const openingScreen = document.getElementById("opening");
const intro = document.getElementById("cinemaIntro");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;
let opened = false;

/* =========================
   MUSIC CONTROL (FIXED)
========================= */

function playMusicSafe() {

    if (!music || isPlaying) return;

    music.volume = 0.5;

    music.play().then(() => {
        isPlaying = true;

        if (musicBtn) {
            musicBtn.innerHTML = "⏸";
            musicBtn.classList.add("active-music");
        }

    }).catch(() => {
        console.log("Autoplay blocked - waiting user interaction");
    });
}



/* =========================
   NETFLIX INTRO TIMELINE
========================= */

window.addEventListener("load", () => {

    const tl = gsap.timeline();

    tl.from(".cinema-intro", {
        opacity: 0,
        scale: 1.2,
        duration: 1.2,
        ease: "power3.out"
    })

        .from(".line1", {
            opacity: 0,
            y: 40,
            duration: 1
        })

        .from(".line2", {
            opacity: 0,
            y: 30,
            duration: 0.8
        }, "-=0.4")

        .from(".line3", {
            opacity: 0,
            y: 20,
            duration: 0.8
        }, "-=0.4")

        .to(".cinema-text", {
            scale: 1.15,
            opacity: 0,
            duration: 1.2,
            delay: 0.6,
            ease: "power2.inOut"
        })

        .to(intro, {
            opacity: 0,
            duration: 1,
            onComplete: () => {

                intro.style.display = "none";
                document.body.style.overflowY = "auto";

                gsap.from("section", {
                    opacity: 0,
                    y: 60,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out"
                });

            }
        });

});


/* =========================
   OPEN INVITATION
========================= */

if (inviteWrapper && openingScreen) {

    inviteWrapper.addEventListener("click", () => {

        if (opened) return;
        opened = true;

        /* 💌 فتح الظرف */
        inviteWrapper.classList.add("opened");

        /* 🎵 تشغيل الأغنية */
        if (music) {
            music.volume = 0.5;
            music.play().catch(() => { });
        }

        /* 🚀 إخفاء الشاشة */
        setTimeout(() => {

            openingScreen.classList.add("hide-opening");

            setTimeout(() => {
                openingScreen.style.display = "none";
                document.body.style.overflowY = "auto";
            }, 1200);

        }, 800);

    });

}

/* =========================
   COUNTDOWN (Real Date)
========================= */

const weddingDate = new Date("2026-06-15T00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let timer;

function updateCountdown() {

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        clearInterval(timer);

        document.querySelector(".timer").innerHTML =
            `<div class="wedding-finished">🎉 تم الزفاف 🎉</div>`;

        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);

    daysEl.innerHTML = String(d).padStart(2, "0");
    hoursEl.innerHTML = String(h).padStart(2, "0");
    minutesEl.innerHTML = String(m).padStart(2, "0");
    secondsEl.innerHTML = String(s).padStart(2, "0");
}

updateCountdown();
timer = setInterval(updateCountdown, 1000);
/* =========================
   FAQ
========================= */

document.querySelectorAll(".faq").forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    });
});


/* =========================
   PARALLAX
========================= */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (hero) {
        hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
    }

});


/* =========================
   PARTICLES
========================= */

const particleContainer = document.createElement("div");
particleContainer.classList.add("particles");
document.body.appendChild(particleContainer);

for (let i = 0; i < 25; i++) {

    const p = document.createElement("span");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (Math.random() * 10 + 8) + "s";
    p.style.animationDelay = Math.random() * 5 + "s";

    particleContainer.appendChild(p);
}


/* =========================
   CONSOLE
========================= */

console.log("✨ Wedding Loaded Like Netflix Intro ✨");


/* =========================
   INTRO AUTO HIDE (SAFE FIX)
========================= */
window.addEventListener("load", () => {

    const intro = document.getElementById("cinemaIntro");
    const music = document.getElementById("introMusic");

    if (!intro) return;

    setTimeout(() => {

        intro.classList.add("hide");

        setTimeout(() => {

            intro.style.display = "none";
            document.body.style.overflowY = "auto";

            /* 🎵 تشغيل الصوت هنا */
            if (music) {
                music.volume = 0.4;
                music.play().catch(() => { });
            }

        }, 1200);

    }, 2200);

});
window.addEventListener("load", () => {

    const music = document.getElementById("introMusic");

    if (!music) return;

    music.volume = 0;

    music.preload = "auto";

    music.addEventListener("loadedmetadata", () => {

        music.pause();          // مهم جدًا
        music.currentTime = 60; // الدقيقة 1

        setTimeout(() => {

            const playPromise = music.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {

                    // fade in
                    let vol = 0;

                    const fade = setInterval(() => {

                        if (vol < 0.4) {
                            vol += 0.02;
                            music.volume = vol;
                        } else {
                            clearInterval(fade);
                        }

                    }, 100);

                }).catch(() => { });

            }

        }, 200);

    });

});
// ظظظظ


window.addEventListener("scroll", function () {

    const nav = document.querySelector(".navbar");

    if (window.scrollY > 100) {
        nav.classList.add("show");
    } else {
        nav.classList.remove("show");
    }

});




