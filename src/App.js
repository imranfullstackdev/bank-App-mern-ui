import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Payment from "./Component/Payment";
import 'react-toastify/dist/ReactToastify.css';
import AllPayments from './Component/AllPayment'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Payment />} />
          <Route path="/AllPayments" element={<AllPayments />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
