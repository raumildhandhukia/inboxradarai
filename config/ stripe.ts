export const PLANS = [
  {
    id: 1,
    name: "Free",
    plan: "FREE",
    emailsAllowed: 100,
    insights: false,
    processLimit: true,
    customTag: false,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    id: 3,
    name: "Pro",
    plan: "PRO",
    emailsAllowed: 100,
    insights: true,
    processLimit: true,
    customTag: false,
    price: {
      amount: 1.99,
      priceIds: {
        test: "price_1PQzzwJyByQqr4U2Bf1gnFXt",
        production: "",
      },
    },
  },
  {
    id: 2,
    name: "Max",
    plan: "MAX",
    emailsAllowed: 5000,
    insights: true,
    processLimit: false,
    customTag: true,
    price: {
      amount: 4.99,
      priceIds: {
        test: "price_1PR00sJyByQqr4U2AqKWVpsA",
        production: "",
      },
    },
  },
];
