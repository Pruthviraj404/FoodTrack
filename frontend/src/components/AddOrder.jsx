import Header from "./Header";
import Sidebar from "./Sidebar";
import OrderForm from "./Orderforms";

const AddOrder = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "230px", padding: "20px", width: "100%" }}>
        <Header title="Add Customer Order" />
        <OrderForm />
      </div>
    </div>
  );
};

export default AddOrder;
