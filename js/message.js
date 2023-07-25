import { isEscapeKey } from './util.js';

const toggleMessage = (isSuccess) => {
  const messageElement = document.querySelector(isSuccess ? '#success' : '#error')
    .content
    .querySelector('section').cloneNode(true);
  document.body.appendChild(messageElement);
  messageElement.querySelector('button').addEventListener('click', hideMessage);
  messageElement.querySelector('button').addEventListener('keydown', hideMessage);
  messageElement.addEventListener('click', hideMessage);

  function hideMessage (evt) {
    if (isEscapeKey(evt) || evt.type === 'click' && evt.currentTarget === evt.target) {
      messageElement.remove();
      messageElement.querySelector('button').removeEventListener('click', hideMessage);
      messageElement.querySelector('button').removeEventListener('keydown', hideMessage);
      messageElement.removeEventListener('click', hideMessage);
    }
  }
};

export { toggleMessage };
