import fetch from "node-fetch";

export enum TaffaLanguageEnum {
  'sv',
  'fi',
  'en',
}

export interface ITaffaMenu {
  date: string;
  dayname: string;
  day: number;
  main: string;
  soup: string;
  salad: string;
  vegetarian: string;
  extra: string;
  alacarte: string;
}

const taffaBaseURL: string = 'http://api.tf.fi/taffa';

/**
 * Reqeuests the menu for a specific day.
 *
 * @param {Date | number | undefined} date - Specifies the date. Only menus one week into the future are usually available (or 5 weekdays). If this parameter is a number, it can only be 0-4, where 0 is today and 4 is four days into the future (not including Saturdays and Sundays). 0 is the default.
 * @param {string | undefined} language - The languge the menu should be in. Can only be "sv" for Swedish, "fi" for Finnish and "en" for English. Swedish is default.
 *
 * @returns {ITaffaMenu} An object containing the different lunch alternatives for the corresponding day. In addition, the object will also contain the date and name of the weekday.
 */
export const menu = async (date?: Date | number, language?: keyof typeof TaffaLanguageEnum): Promise<ITaffaMenu> => {
  let day = '0';

  if (date) {
    if (typeof date === 'number') {
      day = Math.min(Math.max(date, 0), 4).toString();
    } else {
      day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  }

  return fetch(`${taffaBaseURL}/${language ? language : 'sv'}/json/${day}/`)
    .then(res => res.json())
    .catch(e => Promise.reject(e));
};

/**
 * Requests the menus for a whole week.
 *
 * @param {string | undefined} language - The languge the menus should be in. Can only be "sv" for Swedish, "fi" for Finnish and "en" for English. Swedish is default.
 *
 * @returns {ITaffaMenu[]} An array with objects containing the different lunch alternatives for today plus four days into the future (not including Saturdays and Sundays). In addition, the objects will also contain the corresponding date.
 */
export const week = async (language?: keyof typeof TaffaLanguageEnum): Promise<ITaffaMenu[]> => {
  return fetch(`${taffaBaseURL}/${language ? language : 'sv'}/json/week/`)
    .then(res => res.json())
    .catch(e => Promise.reject(e));
};
