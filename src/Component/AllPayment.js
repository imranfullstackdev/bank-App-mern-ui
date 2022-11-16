import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import EditPayment from "./EditPayment";

const AllPayment = () => {
  const [allData, setAllData] = useState([]);

  const allPayment = async () => {
    const allPayment = await fetch(`http://localhost:8000/allPayments`);
    const res = await allPayment.json();
    console.log("res", res);
    setAllData(res);
  };

  console.log(allData);

  // delete Handler
  const DeleteHandler = async (id) => {
    const deleteHandler = await fetch(`http://localhost:8000/dlt/${id}`, {
      method: "delete",
    });
      allPayment()
  };

  useEffect(() => {
    allPayment();
  }, []);
  return (
    <>
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>ReceiverName</th>
              <th>SenderName</th>
              <th>RecievedAmount</th>
              <th>sendingAmount</th>
              <th>purpose</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allData.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.ReceiverName}</td>
                  <td>{data.SenderName}</td>
                  <td>{data.RecievedAmount}</td>
                  <td>{data.sendingAmount}</td>
                  <td>{data.purpose}</td>
                  <td><EditPayment data={data}/></td>
                  <td
                    onClick={() => {
                      DeleteHandler(data._id);
                    }}
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default AllPayment;
