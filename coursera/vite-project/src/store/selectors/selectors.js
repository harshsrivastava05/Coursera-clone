import { selector } from "recoil";
import { courseState, userState } from "../atoms/admin";

export const userEmailState = selector({
  key: "userEmailState",
  get: ({ get }) => {
    const state = get(userState);
    return state.useremail;
  },
});

export const coursedetails = selector({
  key: "coursedetails",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course;
    }
    return "";
  },
});

export const courseimage = selector({
  key: "courseimage",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.imageLink;
    }
    return "";
  },
});

export const coursetitle = selector({
  key: "coursetitle",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return "";
  },
});

export const courseprice = selector({
  key: "courseprice",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.price;
    }
    return "";
  },
});

export const coursedescription = selector({
  key: "courseselector",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.description;
    }
    return "";
  },
});

export const coursepublished = selector({
  key: "coursepublished",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.published;
    }
    return "";
  },
});
