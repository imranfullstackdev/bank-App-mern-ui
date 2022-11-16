import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";

const Payment = () => {
  const [data, SetData] = useState({
    sendingAmount: "",
    RecievedAmount: "",
    SenderName: "",
    ReceiverName: "",
    purpose: "",
  });


const navigate=useNavigate()

  const [allPurposes, SetallPurposes] = useState("");
  const { sendingAmount, RecievedAmount, SenderName, ReceiverName, purpose } =
    data;

  useEffect(() => {
    SetData({ ...data, RecievedAmount: data?.sendingAmount * 80 });
  }, [sendingAmount]);

  // change Handler
  const changeHandler = (e) => {
    SetData({ ...data, [e.target.name]: e.target.value });
  };

  // submitHandler
  const submitHandler = async (e) => {

    e.preventDefault();
    if (handleValidation() === true) {
      try {
        const addAmount = await fetch("http://localhost:8000/addAmount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const res = await addAmount.json();
        console.log(res);
        if(res.status==='true'){
          navigate('/AllPayments')
        }
      } catch (error) {}
      toast.success("Amount Send Sucessfully!", data, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // onSubmit Validation
  const handleValidation = () => {
    if (SenderName.length < 3) {
      toast.error("Sender Name Must be greater than 3", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else if (ReceiverName.length < 3) {
      toast.error("Reciever Name Must be greater than 3", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else if (!sendingAmount || !SenderName || !ReceiverName) {
      toast.error("please enter all the details", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return false;
    } else if (isNaN(RecievedAmount)) {
      toast.error("Sender name has a InCorrect Syntax", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else {
      return true;
    }
  };
  // getting all purposes
  const allPurpose = async () => {
    const Allpurpose = await fetch("http://localhost:8000/getPurpose");
    const res = await Allpurpose.json();
    SetallPurposes(res);
  };
  useEffect(() => {
    allPurpose();
  }, []);
  if (allPurposes === "") {
    return <p>Loading</p>;
  }
  return (
    <>
      <div
        className="d-flex align-item-center justify-content-center"
        id="registerContainer"
      >
        <div className="brand">
          <h1></h1>
        </div>
        <div className="formcontainer">
          <h3>
            <b>Pay Now</b>
          </h3>
          <Form onSubmit={submitHandler}>
            {/* amount send */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Sending Amount</Form.Label>
              <Form.Control
                type="text"
                name="sendingAmount"
                value={sendingAmount}
                onChange={changeHandler}
                placeholder="Send Amount in Usd"
              />
            </Form.Group>
            {/* Received Amount */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Recieving Amount</Form.Label>
              <Form.Control
                type="text"
                name="RecievedAmount"
                value={0 || RecievedAmount}
                placeholder="recieved Amount in Inr"
              />
            </Form.Group>

            {/* senderName */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Sender Name</Form.Label>
              <Form.Control
                type="text"
                name="SenderName"
                value={SenderName}
                onChange={changeHandler}
                placeholder="Sender Name"
              />
            </Form.Group>

            {/* ReceiverName */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Reciever Name</Form.Label>
              <Form.Control
                type="text"
                name="ReceiverName"
                value={ReceiverName}
                onChange={changeHandler}
                placeholder="Receiver Name"
              />
              {/* purpose */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Purpose</Form.Label>

              <Form.Select name="purpose" value={purpose.option} onChange={changeHandler}>
                {allPurposes.myOption.map((purpose) => {
                  return <option value={purpose.option}>{purpose.option}</option>;
                })}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" id="registerSubmit">
              Send Money
            </Button>
          </Form>
          <span className="alreadyuser">
            See All Payments
            <Link to="/AllPayments" style={{ textDecoration: "none" }}>
              <u>Payments👉👉</u>
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Payment;
