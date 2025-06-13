"use client";

import Modal from "@/components/Modal/index";
import { useState } from "react";
import { errorCases, successCases } from "./cases";
import { ErrorCode, SuccesCode } from "./interface";

export default function pageErrors() {
  const [isOpen, setIsOpen] = useState(false);

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
      amount: 27.99,
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
        const code = errorPayment.code as ErrorCode;
        console.log("error response*****************", errorCases[code]);
      }

      if (successPayment) {
        const { status } = dataPay;
        const code = status as SuccesCode;
        setIsOpen((prev) => !prev);
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
