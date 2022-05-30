import { PuttType } from "./constants";

export const getPuttTypeFromLocalStorage = (): PuttType | undefined => {
  const puttTypeFromLocalStorage = localStorage.getItem("puttType");
  if (puttTypeFromLocalStorage) {
    // Maybe add a check for the parsed int to match the existing enums?
    const puttTypeAsEnum = parseInt(puttTypeFromLocalStorage);
    return puttTypeAsEnum;
  }
  return undefined;
};
