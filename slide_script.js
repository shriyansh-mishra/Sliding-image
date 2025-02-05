const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const thumbnailsContainer = document.querySelector('.thumbnails');
let currentIndex = 0;


slides.forEach((_, index) => {
   const thumbnail = document.createElement('div');
   thumbnail.classList.add('thumbnail');
   
   const img = document.createElement('img');
   img.src = slides[index].querySelector('img').src; 
   img.alt = `Thumbnail ${index + 1}`;
   
   thumbnail.appendChild(img);
   
   thumbnail.addEventListener('click', () => goToSlide(index));
   
   thumbnailsContainer.appendChild(thumbnail);
});
 
function goToSlide(index) {
   slides[currentIndex].classList.remove('active');  
   currentIndex = (index + slides.length) % slides.length;  
   slides[currentIndex].classList.add('active'); 
   updateThumbnails();
}

function updateThumbnails() {
   const thumbnails = document.querySelectorAll('.thumbnail');
   thumbnails.forEach((thumb, index) => {
       thumb.classList.toggle('active', index === currentIndex);
   });
}

prevBtn.addEventListener('click', () => {
   goToSlide(currentIndex - 1); 
});

nextBtn.addEventListener('click', () => {
   goToSlide(currentIndex + 1); 
});

// setInterval(() => {
//    goToSlide(currentIndex + 1);
// }, 2000); 

let touchStartX = 0;

sliderTrack.addEventListener('touchstart', (e) => {
   touchStartX = e.changedTouches[0].screenX;  
});

sliderTrack.addEventListener('touchend', (e) => {
   const touchEndX = e.changedTouches[0].screenX;  
   if (touchStartX - touchEndX > 50) {  
       nextBtn.click();
   } else if (touchEndX - touchStartX > 50) {  
       prevBtn.click();
   }
});
