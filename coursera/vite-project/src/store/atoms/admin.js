import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    useremail: null,
  },
});

export const courseState = atom({
  key: "courseState",
  default: {
    course: {
      course: null,
    },
  },
});
