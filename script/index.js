const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const carouselInner = document.querySelector('.carousel-inner');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const totalItems = items.length;
let index = 1; // Start from the first actual slide
const intervalTime = 7000; // Time between slides in milliseconds
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



class Slider {
	constructor($el, interval = 3000) { // Added interval parameter with a default value
		this.$el = $el;
		this.$refs = {
			items: [...document.querySelectorAll('[data-slider]', this.$el)],
		};
		this.length = this.$refs.items.length - 1;
		this.interval = interval; // Store the interval value
		this.startAutoSlide(); // Start the automatic sliding
	}

	next() {
		this.slide('next');
	}

	prev() {
		this.slide('prev');
	}

	slide(direction) {
		this.$refs.items.forEach(el => {
			const pos = Number(el.getAttribute('data-position'));
			const next = (pos + 1) > this.length ? 0 : pos + 1;
			const prev = (pos - 1) < 0 ? this.length : pos - 1;
			const go = direction === 'next' ? next : prev;

			el.setAttribute('data-position', go);
		});
	}

	jump(pos) {
		for (let i = 0; i < pos; i++) {
			const timeout = setTimeout(() => {
				this.slide('prev');
				clearTimeout(timeout); // Clear the timeout after execution
			}, 100);
		}
	}

	startAutoSlide() {
		this.autoSlide = setInterval(() => {
			this.next(); // Automatically go to the next slide
		}, this.interval);
	}

	stopAutoSlide() {
		clearInterval(this.autoSlide); // Stop the automatic sliding
	}
}

const slider = new Slider(document.querySelector('[data-component="slider"]'), 5000); // Initialize with a 5-second interval

document.querySelector('.arrow--prev').addEventListener('click', () => {
	slider.prev();
	slider.stopAutoSlide(); // Stop auto slide on manual interaction
});

document.querySelector('.arrow--next').addEventListener('click', () => {
	slider.next();
	slider.stopAutoSlide(); // Stop auto slide on manual interaction
});

document.querySelectorAll('.slider__item').forEach(sliderItem => {
	sliderItem.addEventListener('click', () => {
		const pos = Number(sliderItem.getAttribute('data-position'));

		slider.jump(pos);
		slider.stopAutoSlide(); // Stop auto slide on manual interaction
	});
});
