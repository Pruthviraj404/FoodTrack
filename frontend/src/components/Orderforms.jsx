import { useState } from "react";
import "../styles/orderform.css";

const OrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [productType, setProductType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      customerName,
      productType,
      quantity,
      shipDate,
      paymentStatus,
      notes,
    });
    alert("Order Added Successfully!");
  };

  return (
    <div className="order-form-container">
      <h2>➕ Add New Customer Order</h2>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Joes"
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Type</label>
          <select onChange={(e) => setProductType(e.target.value)} required>
            <option value="">Select Product</option>
            <option value="Wheat Shevya Fine">Wheat Shevya Fine</option>
            <option value="Wheat Shevya Thick">Wheat Shevya Thick</option>
            <option value="Rice Shevya">Rice Shevya</option>
          </select>
        </div>

        <div className="form-group">
          <label>Ship Date</label>
          <input
            type="date"
            onChange={(e) => setShipDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Status</label>
          <select onChange={(e) => setPaymentStatus(e.target.value)} required>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Not Paid">Not Paid</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Notes</label>
          <textarea
            placeholder="Order Notes"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button className="submit-btn">Save Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
