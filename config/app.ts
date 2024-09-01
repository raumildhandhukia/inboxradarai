export type Plan = {
  id: number;
  name: string;
  plan: string;
  emailsAllowed: number;
  processLimit: boolean;
  autoProcess: boolean;
  customTag: number;
  totalTags: number;
  contentAi: boolean;
  multipleInbox: boolean;
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
    emailsAllowed: 5000,
    processLimit: false,
    autoProcess: true,
    customTag: 3,
    totalTags: 3,
    contentAi: true,
    multipleInbox: true,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    id: 2,
    name: "Pro",
    plan: "PRO",
    emailsAllowed: 5000,
    processLimit: false,
    autoProcess: true,
    customTag: 20,
    totalTags: 20,
    contentAi: true,
    multipleInbox: true,
    price: {
      amount: 4.99,
      priceIds: {
        test: "price_1PsWxlJyByQqr4U28Ka1Jp0D",
        production: "price_1PtXWUJyByQqr4U2qAhk7nhn",
      },
    },
  },
];

export const REQUEST_COOL_DOWN = 1000 * 15 * 1; // 15 seconds
