let isLaunched = false;
let isLocked = false;

window.addEventListener("scroll", () => {
    if (isLaunched || isLocked) return;

    const gogu = document.querySelector(".gogu");
    if (!gogu) return;

    const scrollY = window.scrollY;
    const offset = scrollY * 0.5;

    // Aplicăm parallax-ul
    gogu.style.transform = `translateY(-${offset}px)`;

    // Verificăm poziția
    const rect = gogu.getBoundingClientRect();
    const goguCenter = rect.top + rect.height / 2;
    const windowCenter = window.innerHeight / 2;

    if (goguCenter <= windowCenter) {
        // Blocăm ecranul
        isLocked = true;
        document.body.style.overflow = "hidden";

        // Animăm lansarea
        gogu.style.transition = "transform 1.5s ease-in";
        gogu.style.transform = `translateY(calc(-${offset}px - 150vh))`;

        // Deblocăm după lansare
        setTimeout(() => {
            isLaunched = true;
            isLocked = false;
            document.body.style.overflow = "";
            gogu.style.display = "none";
        }, 1500);
    }
});
