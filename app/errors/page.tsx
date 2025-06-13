"use client";

import Modal from "@/components/Modal/index";
import { useState } from "react";

export default function pageErrors() {
  const [isOpen, setIsOpen] = useState(false);

  const errorCases = {
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

  const successCases = {
    requires_auth: {
      title: "Payment requires additional authentication",
      description: "Open link",
    },
    processing: "Payment is being processed",
    success: "Payment processed successfull",
  };

  const cardData = {
    cardData: {
      number: "4111111111111111",
      expMonth: "12",
      expYear: "25",
      cvv: "123",
      name: "John Doe",
    },
  };

  const submitInformation = async () => {
    const response = await fetch("http://localhost:3001/api/tokenize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });
    const { data, success, error, ...rest } = await response.json();

    if (error) {
      setIsOpen((prev) => !prev);
      return;
    }

    const paymentData = {
      orderId: "12345",
      paymentMethod: "card",
      amount: 100.99,
      tipAmount: 0.0,
      cardToken: data.token,
      last4: data.last4,
      cardBrand: data.card,
    };

    try {
      const response2 = await fetch(
        "http://localhost:3001/api/payments/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const {
        data: dataPay,
        success: successPayment,
        error: errorPayment,
        ...restPayment
      } = await response2.json();

      if (!response2.ok) {
        console.log(
          "error response*****************",
          errorCases[errorPayment.code]
        );
      }

      if (successPayment) {
        const { status } = dataPay;
        setIsOpen((prev) => !prev);
        console.log(successCases[status]);
      }
    } catch (e) {
      console.log(e, "error handle*********************");
    }
  };

  return (
    <>
      <h1>Error</h1>
      <button onClick={() => submitInformation()}>Send information</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Todo salió bien"
      >
        <p>Tu acción se completó correctamente.</p>
      </Modal>
    </>
  );
}
