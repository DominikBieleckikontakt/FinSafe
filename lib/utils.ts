import { AllBudgetInfoType, SignUpForm } from "@/types";
import { months as namedMonths, now } from "@/constants";

import ChartDataLabels from "chartjs-plugin-datalabels";

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
  budget: AllBudgetInfoType
  // setNewData: (budget: AllBudgetInfoType) => void
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

  // setNewData({
  //   ...budget,
  //   todaysBudget: newOverallBudget,
  //   income: Number(newIncome),
  //   outcome: Number(newOutcome),
  // });

  return {
    updatedIncome: Number(newIncome),
    updatedOutcome: Number(newOutcome),
    overallBudget: newOverallBudget,
  };
};

export const numDays = (y: number, m: number) => new Date(y, m, 0).getDate();

export const getMonths = (
  dataToFilter: { createdAt: Date; budget: number }[]
) => {
  return [
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 0)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 1)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 2)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 3)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 4)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 5)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 6)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 7)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 8)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 9)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 10)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
    {
      data: dataToFilter
        .filter((item) => new Date(item.createdAt).getMonth() === 11)
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue.budget;
        }, 0),
    },
  ];
};

export const changePeriodOfChart = (
  period: string,
  data: [
    {
      period: string;
      todaysBudget: number;
      createdAt: Date;
      id: number;
    }
  ],
  setUserData: ({}) => void
) => {
  if (period === "month") {
    const year = Number(now.year);
    const month = Number(Number(now.month) + 1);
    const numOfDays = Array.from(
      { length: numDays(year, month) },
      (_, i) => i + 1
    );

    setUserData({
      labels: numOfDays.map((item) => item),
      datasets: [
        {
          label: `Your incomes (${namedMonths[new Date().getMonth()]})`,
          data: numOfDays.map((day) => {
            for (let i = 0; i < numOfDays.length - 1; i++) {
              if (new Date(data[i]?.createdAt).getDate() === day) {
                return data[i].todaysBudget;
              }
            }
          }),
        },
      ],
    });
  } else {
    const dataToFilter = data.map((item) => {
      return {
        createdAt: item.createdAt,
        budget: item.todaysBudget,
      };
    });

    const months = getMonths(dataToFilter);
    setUserData({
      labels: namedMonths.map((item) => item),
      datasets: [
        {
          label: `Your incomes (${new Date().getFullYear()})`,
          data: months.map((budget) => {
            if (budget.data !== undefined) {
              return budget.data;
            } else {
              return null;
            }
          }),
        },
      ],
    });
  }
};
