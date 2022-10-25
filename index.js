// transliteration
const transliteration = {
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'yo',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'й': 'j',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'kh',
  'ц': 'c',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'shch',
  'ь': '\'',
  'ы': 'y',
  'ъ': '"',
  'э': 'e',
  'ю': 'yu',
  'я': 'ya',

  'А': 'A',
  'Б': 'B',
  'В': 'V',
  'Г': 'G',
  'Д': 'D',
  'Е': 'E',
  'Ё': 'Yo',
  'Ж': 'Zh',
  'З': 'Z',
  'И': 'I',
  'Й': 'J',
  'К': 'K',
  'Л': 'L',
  'М': 'M',
  'Н': 'N',
  'О': 'O',
  'П': 'P',
  'Р': 'R',
  'С': 'S',
  'Т': 'T',
  'У': 'U',
  'Ф': 'F',
  'Х': 'Kh',
  'Ц': 'C',
  'Ч': 'Ch',
  'Ш': 'Sh',
  'Щ': 'Shch',
  'Ь': '\'',
  'Ы': 'Y',
  'Ъ': '"',
  'Э': 'E',
  'Ю': 'Yu',
  'Я': 'Ya'
};

const transliterate = (str) => {
  let newStr = '';

  for (let i = 0; i < str.length; i++) {
    str[i] in transliteration
      ? (newStr += transliteration[str[i]])
      : (newStr += str[i]);
  }
  return newStr;
};

// adding new words to the dictionary, word length checking
const dictionary = document.querySelector('.dictionary__container');
const addWordButton = document.querySelector('.input__button');

addWordButton.addEventListener('click', (e) => {
  e.preventDefault();
  const dictionaryRow = document.querySelector('.dictionary__row');
  const inputText = document.querySelector('.input__text');
  const newDictionaryRow = dictionaryRow.cloneNode(true);
  console.log(newDictionaryRow);

  const wordLengthChecking = (word) => {
    if (inputText.value.length > 7) {
      let shortWord = '';

      for (let i = 0; i < 7; i++) {
        shortWord += inputText.value[i];
      }

      const longWords = newDictionaryRow.querySelectorAll('.dictionary__column');
      longWords[0].querySelector('.dictionary__сyrillic').setAttribute('fullword', word);
      longWords[1].querySelector('.dictionary__latin').setAttribute('fullword', transliterate(word));

      return shortWord + '...';
    } else {
      return word;
    }
  };
  
  newDictionaryRow.querySelector('.dictionary__num').innerText = document.querySelectorAll('.dictionary__row').length + 1;
  newDictionaryRow.querySelector('.dictionary__сyrillic').innerText = wordLengthChecking(inputText.value);
  newDictionaryRow.querySelector('.dictionary__latin').innerText = transliterate(wordLengthChecking(inputText.value));

  dictionary.append(newDictionaryRow);
  inputText.value = '';
});

// deleting words from the dictionary
// button for single word
dictionary.addEventListener('click', (e) => {
  const allDictionaryRows = document.querySelectorAll('.dictionary__row');
  const allRemoveWordButtons = document.querySelectorAll('.dictionary__remove-icon_for_word');

  const updateNum = () => {
    const nums = document.querySelectorAll('.dictionary__num');
    for (let i = 0; i < nums.length; i++) {
      nums[i].innerText = i + 1;
    }
  };

  for (let i = 1; i < allDictionaryRows.length; i++) {
    if (e.target === allRemoveWordButtons[i]) {
      allDictionaryRows[i].remove();
      updateNum();
    }
  }
});

// button for all words
const removeAllWordsButton = document.querySelector('.dictionary__remove-button');
removeAllWordsButton.addEventListener('click', () => {
  const allDictionaryRows = document.querySelectorAll('.dictionary__row');
  for (let i = 0; i < allDictionaryRows.length - 1; i++) {
    dictionary.lastElementChild.remove();
  }
});
