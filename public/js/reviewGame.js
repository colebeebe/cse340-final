const stars = document.querySelectorAll('.star');

let currentRating = 0;

stars.forEach((star, index) => {
  star.addEventListener('mousemove', (e) => {
    const rect = star.getBoundingClientRect();
    const half = e.clientX - rect.left < rect.width / 2;

    const index = Number(star.dataset.index);

    let hoverRating = (index + 1) * 2;

    if (half) {
      hoverRating--;
    }

    drawStars(hoverRating);
  });

  star.addEventListener('click', (e) => {
    const rect = star.getBoundingClientRect();
    const half = e.clientX - rect.left < rect.width / 2;

    const index = Number(star.dataset.index);

    currentRating = (index + 1) * 2;

    if (half) {
      currentRating--;
    }
  });
});

document
  .querySelector('.star-rating-container')
  .addEventListener('mouseleave', () => {
    drawStars(currentRating);
  });

document.querySelector('.zero-star').addEventListener('mousemove', (e) => {
  drawStars(0);
});

document.querySelector('.zero-star').addEventListener('click', () => {
  currentRating = 0;
  drawStars(currentRating);
});

document.querySelector('.full-star').addEventListener('mousemove', (e) => {
  drawStars(10);
});

document.querySelector('.full-star').addEventListener('click', () => {
  currentRating = 10;
  drawStars(currentRating);
});

function drawStars(rating) {
  stars.forEach((star, i) => {
    const fullValue = (i + 1) * 2;

    if (rating >= fullValue) {
      star.querySelector('span').textContent = '\u{f04ce}';
    } else if (rating === fullValue - 1) {
      star.querySelector('span').textContent = '\u{f04d0}';
    } else {
      star.querySelector('span').textContent = '\u{f04d2}';
    }
  });

  document.querySelector('.rating-number').textContent = `Stars: ${rating / 2}`;
}

document.querySelector('#submit-button').addEventListener('click', (e) => {
  e.preventDefault();
});
