window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Ajustează factorul 0.3 dacă vrei să urce mai repede sau mai încet
    const offset = scrollY * 0.3;
    // Creat de simiuc animatia Ș))) Tot Simiuc a scris ca vrea sa si asume meritul ca e egocentrist
    const gogu = document.querySelector(".gogu");
    if (gogu) {
        gogu.style.transform = `translateY(-${offset}px)`;
    }
});
