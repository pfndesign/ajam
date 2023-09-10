/**
 * what is vaj ?
 * vaj is the smallest phonetic unit of persian language that doesn't have a meaning but it can create a meaning
 * what is the diffrence bettwen vaj and charcter ?
 * in vaj pronunciation is important . charcters with same pronunciation are considers as 1 vaj
 */
import { ajamwords } from "../db/ajam_database.js";
/**
 * vaj types
 */
export const VAJTYPES = {
  samet: 0,
  lowmosavet: 1,
  highmosavet: 2,
};
/**
 * list of vaj
 */
export const VAJ = [
  { char: ["ع", "ٍ"], type: VAJTYPES.samet },
  { char: "ب", type: VAJTYPES.samet },
  { char: "پ", type: VAJTYPES.samet },
  { char: ["ت", "ط"], type: VAJTYPES.samet },
  { char: ["ث", "س", "ص"], type: VAJTYPES.samet },
  { char: "ج", type: VAJTYPES.samet },
  { char: "چ", type: VAJTYPES.samet },
  { char: ["ح", "ه"], type: VAJTYPES.samet },
  { char: "خ", type: VAJTYPES.samet },
  { char: "د", type: VAJTYPES.samet },
  { char: ["ذ", "ز", "ظ", "ض"], type: VAJTYPES.samet },
  { char: "ر", type: VAJTYPES.samet },
  { char: "ژ", type: VAJTYPES.samet },
  { char: "ش", type: VAJTYPES.samet },
  { char: ["غ", "ق"], type: VAJTYPES.samet },
  { char: "ف", type: VAJTYPES.samet },
  { char: "ک", type: VAJTYPES.samet },
  { char: "گ", type: VAJTYPES.samet },
  { char: "ل", type: VAJTYPES.samet },
  { char: "م", type: VAJTYPES.samet },
  { char: "ن", type: VAJTYPES.samet },
  { char: "و", type: VAJTYPES.samet },
  { char: "ی", type: VAJTYPES.samet },
  { char: "َ", type: VAJTYPES.lowmosavet }, // a
  { char: "ِ", type: VAJTYPES.lowmosavet }, // e
  { char: "ُ", type: VAJTYPES.lowmosavet }, // o
  { char: "ا", type: VAJTYPES.highmosavet },
  { char: "ی", type: VAJTYPES.highmosavet }, // problem
  { char: "و", type: VAJTYPES.highmosavet }, // problem
];
/**
 * vaj check regex
 */
const VAJCHECKREGEX = new RegExp(
  "[\u0627-\u0628-\u062a-\u062b-\u062c-\u062d-\u062e-\u062f-\u0630-\u0631-\u0632-\u0633-\u0634-\u0635-\u0636-\u0637-\u0638-\u0639-\u063a-\u0641-\u0642-\u0644-\u0645-\u0646-\u0647-\u0648-\u0648-\u064d-\u064e-\u0650-\u0651-\u067e-\u0686-\u0698-\u06a9-\u06af-\u06cc]{1}"
);
const VAJCHECKLOWMOSAVET = new RegExp("[\u064e-\u0650-\u064f]+");
/**
 * isVaj
 * detect if string is vaj
 * unsafe function only checks for string length
 * @param {string} string
 * @returns {boolean}
 */
export const isVajUnsafe = (string) => {
  return string.length == 1;
};
export const isVaj = (string) => {
  return string.length == 1 && VAJCHECKREGEX.test(string);
};
/**
 * checkVaj
 * return vaj type and group or false when string is not a vaj
 * @param {string} string
 * @returns {boolean|object}
 */
export const checkVaj = (string) => {
  if (!isVaj(string)) return false;
  let vajdata = { input: string };
  VAJ.every((entry) => {
    if ([...entry.char].includes(string)) {
      vajdata = { ...vajdata, ...entry };
      return false;
    }
    return true;
  });
  return vajdata;
};
/**
 * extractVaj
 * convert takvaj to array of it's characters then return vaj data for each character in that word
 * @param {string} word
 * @param {boolean} [withRecover=true] recover trueself
 * @param {boolean} [force=false] recover trueself for any words
 * @returns {Array}
 */
export const extractVaj = async (word, withRecover = true, force = false) => {
  if (withRecover) word = await recoverTrueSelf(word, force);
  return word.split("").map((character) => checkVaj(character));
};
/**
 * recoverTrueSelf
 * recover word pronunciation for extract vaj
 * @param {string} word
 * @param {boolean} [force=false] recover trueself for any words
 */
export const recoverTrueSelf = async (string, force = false) => {
  /**
   * if has mosavet it mean that string is probably trueself
   */
  if (VAJCHECKLOWMOSAVET.test(string) && !force) return string;
  /**
   * remove any mosavet from string
   */
  const cleanstring = string.replace(VAJCHECKLOWMOSAVET, "");
  const word = await ajamwords.findOne({ where: { word: cleanstring } });
  /**
   * return string if cannot fin
   */
  if (word == null) return cleanstring;
  /**
   * check pronunciation for more than one pronunce
   * in this case for now we are returning the first one
   */
  return word.pronunciation.split("-")[0];
};
