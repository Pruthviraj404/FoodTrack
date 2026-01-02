import React, { createContext, useState, useEffect, useContext } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  


  // 1. Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };
 

  useEffect(() => {
    fetchOrders();
  }, []);

  
  // 2. Add Order
  const addOrder = async (newOrder) => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchOrders(); 
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || "Failed to add" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // 3. Update Order
  const updateOrder = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchOrders(); 
        return { success: true, message: "Order Updated Successfully" };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

 
  return (
    <OrdersContext.Provider value={{ orders, fetchOrders, addOrder, updateOrder, loading}}>
      {children}
    </OrdersContext.Provider>
  );
};

// Custom hook
export const useOrders = () => useContext(OrdersContext);