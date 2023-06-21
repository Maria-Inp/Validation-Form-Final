const motionsList = ["َ", "ُ", "ِ", "ّ", "ً", "ٌ", "ٍ"]

const persianNumbers = "\u06F0-\u06F9"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
const arabicNumbers = "\u0660-\u0669"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
const persianNumbersList = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbersList = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

export const isNumber = (str) => {
  const numberReg = new RegExp(`^([0-9${persianNumbers}${arabicNumbers}]){1,}$`);
  return numberReg.test(str);
};

export const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  return re.test(password);
};

export const correctCharacters = (str) => {
  str = str.replaceAll("‌", " ");

  for (let i = 0; i < motionsList.length; i += 1) {
    str = str.replaceAll(motionsList[i], "");
  }
  for (let i = 0; i < 10; i += 1) {
    str = str.replaceAll(persianNumbersList[i], i).replaceAll(arabicNumbersList[i], i);
  }

  return str.trim();
};