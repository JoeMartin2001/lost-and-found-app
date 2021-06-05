// import { months } from "../common/months";

export const getParsedDate = (d: Date) => {
  const month = new Date(d).getMonth().toString();
  const day = new Date(d).getDate().toString();
  const year = new Date(d).getFullYear();

  const itemDate = ` ${day.length === 1 ? `0${day}` : day} / ${
    month.length === 1 ? `0${month}` : month
  } / ${year}`;

  return itemDate;
};

export const getParsedTime = (d: Date) => {
  const hour = new Date(d).getHours();
  const minute = new Date(d).getMinutes();

  const itemTime = `${hour}:${minute}`;

  return itemTime;
};

export const getParsedMonthDate = (d: Date) => {
  const mIdx = new Date(d).getMonth();
  const day = new Date(d).getDate();

  // const result = `${day} ${months[mIdx]}`;

  // return result;
};
