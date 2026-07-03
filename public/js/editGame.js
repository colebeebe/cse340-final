const imageUrlInput = document.getElementById('imageUrl');
const coverArt = document.querySelector('.cover-art');

imageUrlInput.addEventListener('input', (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const url = e.target.value;
    coverArt.src = url;
  }, 1000);
});
