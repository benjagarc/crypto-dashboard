"use client";

import { useModal } from "@/components/context/ModalContext/index";
import { Loader } from "@/components/Loader/index";
import { errorCases, successCases } from "./cases";
import { ErrorCode, SuccesCode } from "./interface";

export default function pageErrors() {
  const { showModal } = useModal();

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
      const code = error.code as ErrorCode;
      const { title, description } = errorCases[code];
      showModal({
        title,
        content: <p>{description}</p>,
        variant: "error",
      });
      return;
    }

    const paymentData = {
      orderId: "12345",
      paymentMethod: "card",
      amount: 50.88,
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
        const { title, description } = errorCases[code];
        showModal({
          title,
          content: <p>{description}</p>,
          variant: "error",
        });
      }

      if (successPayment) {
        const { status } = dataPay;
        const code = status as SuccesCode;
        const { title, description } = successCases[code];
        showModal({
          title,
          content: <p>{description}</p>,
          variant: status === "processing" ? "process" : "success",
        });
      }
    } catch (e) {
      console.log(e, "error handle*********************");
    }
  };

  return (
    <>
      {/* <Loader /> */}
      <button onClick={() => submitInformation()}>Send information</button>
    </>
  );
}
