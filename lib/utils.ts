import { SignUpForm } from "@/types";

export const validateSignUpForm = (formData: SignUpForm) => {
  let isCorrect = true;
  let message = "Something is wrong!";

  if (!formData.name || formData.name.length < 1) {
    isCorrect = false;
  }
  if (!formData.lastname || formData.lastname.length < 1) {
    isCorrect = false;
  }
  if (!formData.email || formData.email.length < 1) {
    isCorrect = false;
  }
  if (!formData.password || formData.password.length < 1) {
    isCorrect = false;
  }
  if (!formData.rpassword || formData.rpassword.length < 1) {
    isCorrect = false;
  }

  if (formData.password !== formData.rpassword) {
    isCorrect = false;
    message = "Passwords are not the same! Please try again.";
  }

  if (formData.email) {
    const pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(formData.email)) {
      isCorrect = false;
      message = "That's not a valid email. Please try again.";
    }
  }

  return { isCorrect, message };
};
