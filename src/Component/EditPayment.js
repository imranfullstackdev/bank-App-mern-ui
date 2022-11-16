import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditPayment = (payments) => {
  console.log("payment", payments);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editpayments, SeteditPayments] = useState(payments.data);

  const [allPurposes, SetallPurposes] = useState("");
  useEffect(() => {
    SeteditPayments({
      ...editpayments,
      RecievedAmount: editpayments?.sendingAmount * 80,
    });
  }, [editpayments.sendingAmount]);

  const allPurpos = async () => {
    const Allpurpose = await fetch("http://localhost:8000/getPurpose");
    const res = await Allpurpose.json();
    SetallPurposes(res);
  };

  useEffect(() => {
    allPurpos();
  }, []);
  if (allPurposes === "") {
    return <p>Loading</p>;
  }

  const changeHandler = (e) => {
    SeteditPayments({ ...editpayments, [e.target.name]: e.target.value });
  };

  const EditHandler = async (e, id) => {
    let { body } = editpayments;
    console.log("object",body);
    console.log(id);
    try {
        const editUser = await fetch(`http://localhost:8000/editPayments/${id}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editpayments),
          });
  
      const res = await editUser.json();
      window.location.reload()
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    console.log("edit", editpayments);
  };

  return (
    <>
      <div>
        <Button onClick={handleShow}>Edit</Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                EditHandler(e, editpayments._id);
              }}
            >
              {/* amount send */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-dark"> Sending Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="sendingAmount"
                  defaultValue={editpayments.sendingAmount}
                  onChange={changeHandler}
                  placeholder="Send Amount in Usd"
                />
              </Form.Group>
              {/* Received Amount */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-dark"> Recieving Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="RecievedAmount"
                  value={0 || editpayments.sendingAmount * 80}
                  placeholder="recieved Amount in Inr"
                />
              </Form.Group>

              {/* senderName */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-dark"> Sender Name</Form.Label>
                <Form.Control
                  type="text"
                  name="SenderName"
                  defaultValue={editpayments.SenderName}
                  onChange={changeHandler}
                  placeholder="Sender Name"
                />
              </Form.Group>

              {/* ReceiverName */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-dark"> Reciever Name</Form.Label>
                <Form.Control
                  type="text"
                  name="ReceiverName"
                  value={editpayments.ReceiverName}
                  onChange={changeHandler}
                  placeholder="Receiver Name"
                />
                {/* purpose */}
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label  className="text-dark">Purpose</Form.Label>

              <Form.Select name="purpose" defaultvalue={editpayments.purpose} onChange={changeHandler} >
                {allPurposes.myOption.map((allPurposes) => {
                  return <option value={allPurposes.option} onChange={changeHandler} >{allPurposes.option}</option>;
                })}
              </Form.Select>
            </Form.Group>

              <Button variant="primary" type="submit" id="registerSubmit">
                Edit Payments
              </Button>
            </Form>
          </Modal.Body>

        </Modal>
      </div>
    </>
  );
};

export default EditPayment;
