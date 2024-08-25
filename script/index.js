const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const carouselInner = document.querySelector('.carousel-inner');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const totalItems = items.length;
let index = 1; // Start from the first actual slide
const intervalTime = 10000; // Time between slides in milliseconds
let autoSlideInterval;

// Clone the first and last items for seamless looping
const firstItem = items[0].cloneNode(true);
const lastItem = items[totalItems - 1].cloneNode(true);
carouselInner.appendChild(firstItem);
carouselInner.insertBefore(lastItem, items[0]);

const newItems = Array.from(carouselInner.querySelectorAll('.carousel-item'));
const newTotalItems = newItems.length;

function showSlide(n) {
    if (n >= newTotalItems) {
        carouselInner.style.transition = 'none'; // Disable transition
        carouselInner.style.transform = `translateX(-${100}vw)`; // Jump to the second slide
        index = 1; // Set index to the actual second item
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            carouselInner.style.transform = `translateX(-${index * 100}vw)`;
        }, 20);
    } else if (n < 0) {
        carouselInner.style.transition = 'none'; // Disable transition
        carouselInner.style.transform = `translateX(-${(newTotalItems - 2) * 100}vw)`; // Jump to the second last slide
        index = newTotalItems - 2; // Set index to the actual second last item
        setTimeout(() => {
            carouselInner.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            carouselInner.style.transform = `translateX(-${index * 100}vw)`;
        }, 20);
    } else {
        index = n;
        carouselInner.style.transform = `translateX(-${index * 100}vw)`;
    }
}

// Start or restart the auto-slide interval
function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        showSlide(index + 1);
    }, intervalTime);
}

// Stop the auto-slide interval
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners for manual controls
nextBtn.addEventListener('click', () => {
    showSlide(index + 1);
    stopAutoSlide();
    startAutoSlide();
});
prevBtn.addEventListener('click', () => {
    showSlide(index - 1);
    stopAutoSlide();
    startAutoSlide();
});

// Initialize the slider
showSlide(index);
startAutoSlide();
