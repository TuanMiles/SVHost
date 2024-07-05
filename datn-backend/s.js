const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  previewContainer.innerHTML = '';

  const files = event.target.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.createElement('img');
      previewImage.className = 'previewImage';
      previewImage.src = e.target.result;
      
      previewContainer.appendChild(previewImage);
    };
    reader.readAsDataURL(file);
  }
}
