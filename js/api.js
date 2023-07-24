function getData () {
  return fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .catch(() => {
      throw new Error('Не удалось загрузить данные');
    });
}

export {getData};
