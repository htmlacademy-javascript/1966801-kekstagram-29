const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const previewImg = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const addListenersToFileChooser = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewImg.src = URL.createObjectURL(file);
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${previewImg.src}')`;
      });
    }
  });
};

export { addListenersToFileChooser };
