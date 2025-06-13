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
    title: "insufficient balance Insufficient funds on card",
    description: "ensure you have the required funds and try again",
  },
};

export const successCases = {
  requires_auth: {
    title: "Payment requires additional authentication",
    description: "Open link",
  },
  processing: "Payment is being processed",
  success: "Payment processed successfull",
};
