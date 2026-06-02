const slideshow = document.getElementById('slideshow');
const imageDuration = 5000;
let slides = [];
let index = 0;

fetch('media.json')
  .then(response => response.json())
  .then(files => {
    files.forEach(file => {
      const ext = file.split('.').pop().toLowerCase();
      let element;

      if (['mp4', 'webm', 'ogg'].includes(ext)) {
        element = document.createElement('video');
        element.src = `media/${file}`;
        element.muted = true;
      } else {
        element = document.createElement('img');
        element.src = `media/${file}`;
      }

      element.className = 'slide';
      slideshow.appendChild(element);
      slides.push(element);
    });

    if (slides.length > 0) {
      showSlide(0);
    }
  });

function showSlide(i) {
  slides.forEach(slide => {
    slide.classList.remove('active');
    if (slide.tagName === 'VIDEO') {
      slide.pause();
      slide.currentTime = 0;
    }
  });

  const current = slides[i];
  current.classList.add('active');

  if (current.tagName === 'VIDEO') {
    current.play();
    current.onended = nextSlide;
  } else {
    setTimeout(nextSlide, imageDuration);
  }
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}
