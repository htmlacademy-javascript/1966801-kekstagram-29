// Функция для проверки длины строки
function checkLength (string, maxLength) {
  return string.length <= maxLength;
}

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);


// Функция для проверки, является ли строка палиндромом

function isPalindrom (string) {
  const checkingString = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < string.length / 2; i++) {
    if (checkingString[i] !== checkingString[checkingString.length - i - 1]) {
      return false;
    }
  }
  return true;
}

isPalindrom('топот');
isPalindrom('ДовОд');
isPalindrom('Кекс');
isPalindrom('Лёша на полке клопа нашёл ');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
//  и возвращает их в виде целого положительного числа.

function getNumbers (string) {
  const result = String(string).match(/\d+/g);
  return parseInt(result, 10);
}

getNumbers('2023 год');
getNumbers('ECMAScript 2022');
getNumbers('1 кефир, 0.5 батона');
getNumbers('агент 007');
getNumbers('а я томат');

// Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи
// в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  return 60 * hours + Number(minutes);
};

export const isMeetOnLimit = (workStart, workEnd, meetingStart, meetingLength) => {
  const workStartInMin = parseTime(workStart);
  const workEndInMin = parseTime(workEnd);
  const meetingStartInMin = parseTime(meetingStart);

  return meetingStartInMin >= workStartInMin && meetingStartInMin + meetingLength <= workEndInMin;
};

isMeetOnLimit('08:00', '17:30', '14:00', 90);
isMeetOnLimit('8:0', '10:0', '8:0', 120);
isMeetOnLimit('08:00', '14:30', '14:00', 90);
isMeetOnLimit('14:00', '17:30', '08:0', 90);
isMeetOnLimit('8:00', '17:30', '08:00', 900);
