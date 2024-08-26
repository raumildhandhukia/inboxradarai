type Plan = {
  id: number;
  name: string;
  plan: string;
  emailsAllowed: number;
  processLimit: boolean;
  autoProcess: boolean;
  customTag: number;
  totalTags: number;
  price: {
    amount: number;
    priceIds: {
      test: string;
      production: string;
    };
  };
};

export const PLANS: Plan[] = [
  {
    id: 1,
    name: "Free",
    plan: "FREE",
    emailsAllowed: 100,
    processLimit: false,
    autoProcess: false,
    customTag: 3,
    totalTags: 6,
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
    emailsAllowed: 1000,
    processLimit: false,
    autoProcess: true,
    customTag: 8,
    totalTags: 12,
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
    processLimit: false,
    autoProcess: true,
    customTag: 20,
    totalTags: 25,
    price: {
      amount: 4.99,
      priceIds: {
        test: "price_1PR00sJyByQqr4U2AqKWVpsA",
        production: "",
      },
    },
  },
];

export const REQUEST_COOL_DOWN = 1000 * 60 * 1; // 1 minutes
