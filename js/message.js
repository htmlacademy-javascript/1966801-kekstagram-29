const showMessage = (isSuccess) => {
  const messageElement = document.querySelector(isSuccess ? '#success' : '#error')
    .content
    .querySelector('section');
// console.log('messageElement :>> ', messageElement);
  document.body.appendChild(messageElement);
};

export { showMessage };
