const img = document.getElementById('preview-image');
const urlInput = document.getElementById('cover-image');

urlInput.addEventListener('input', (e) => {
  const url = e.target.value;

  if (url.length < 5) {
    img.src = '';
    return;
  }

  img.src = url;
});
