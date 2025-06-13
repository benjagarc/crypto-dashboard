export const errorCases = {
  INVALID_CARD_DATA: {
    title: "We couldn't process your card",
    description: "check the information and try again",
  },
  NETWORK_ERROR: {
    title: "Connection Error",
    description: "check your internet connection and try again",
  },
  INSUFFICIENT_FUNDS: {
    title: "Insufficient balance",
    description: "ensure you have the required funds and try again",
  },
  CARD_DECLINED: {
    title: "Card Declined",
    description: "Your bank has declined this transaction",
  },
};

export const successCases = {
  requires_auth: {
    title: "Payment requires additional authentication",
    description: "Open link",
  },
  processing: {
    title: "Payment is being processed",
    description: "",
  },
  success: {
    title: "Payment processed successfull",
    description: "",
  },
};
