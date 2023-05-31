
const buttons = document.querySelectorAll("[data-carousel-button]");
let intervalId;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        resetInterval(); // Reset the interval whenever a button is clicked

        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]");

        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    });
});

function startInterval() {
    intervalId = setInterval(() => {
        const nextButton = document.querySelector("[data-carousel-button='next']");
        nextButton.click(); // Simulate a click on the "next" button
    }, 5000); // Change slide every 5 seconds (adjust this value as needed)
}

function resetInterval() {
    clearInterval(intervalId);
    startInterval();
}

startInterval(); // Start the interval when the page loads
