const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const previewImgElement = document.querySelector('.img-upload__preview img');
const effectsPreviewList = document.querySelectorAll('.effects__preview');

const addListenersToFileChooser = () => {
  fileChooserElement.addEventListener('change', () => {
    const file = fileChooserElement.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewImgElement.src = URL.createObjectURL(file);
      effectsPreviewList.forEach((preview) => {
        preview.style.backgroundImage = `url('${previewImgElement.src}')`;
      });
    }
  });
};

export { addListenersToFileChooser };
