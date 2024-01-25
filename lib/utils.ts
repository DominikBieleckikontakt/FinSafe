import { AllBudgetInfoType, SignUpForm } from "@/types";

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

export const calculateBudget = (
  newIncome: string,
  newOutcome: string,
  budget: AllBudgetInfoType,
  setNewData: (budget: AllBudgetInfoType) => void
) => {
  const actualIncome =
    budget.income > Number(newIncome)
      ? (budget.income - Number(newIncome)) * -1
      : Number(newIncome) - budget.income;

  const actualOutcome =
    budget.outcome > Number(newOutcome)
      ? Number(newOutcome) - budget.outcome
      : (budget.outcome - Number(newOutcome)) * -1;

  const newOverallBudget = budget.todaysBudget + actualIncome - actualOutcome;

  setNewData({
    ...budget,
    todaysBudget: newOverallBudget,
    income: Number(newIncome),
    outcome: Number(newOutcome),
  });

  return {
    updatedIncome: Number(newIncome),
    updatedOutcome: Number(newOutcome),
    overallBudget: newOverallBudget,
  };
};
