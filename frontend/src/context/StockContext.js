import React, { createContext, useEffect, useState, useContext } from "react";

const StockContext = createContext();

export const StockContextProvider = ({ children }) => {
    // 1. Initialize as empty array [] (Fixes "filter of undefined" crash)
    const [stock, setStocks] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    
    // 2. State for the New Stock Form
    const [newStock, setNewStock] = useState({
        id: '',
        productName: 'White Shevya',
        sku: '',
        category: 'Plain',
        quantity: '',
        unit: "kg",
        status: 'In Stock',
        lastUpdated: '',
        price: '70' 
    });


    const lowstockitems=stock?.filter(item=>item.status==="Low Stock" || []);

   const orders_revenue=stock.reduce((total,item)=>{
  const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);
    return total + itemTotal;
  },0);

  

    // 3. API Call: Get All Stocks
    const fetchStocks = async () => {
        try {
            // Ensure this URL matches your backend route exactly
            const res = await fetch("http://localhost:5000/api/stocks");
            const data = await res.json();
            if (res.ok) {
                setStocks(data);
            }
        } catch (error) {
            console.error("Error fetching stocks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 4. API Call: Add Stock
    const handleSaveNewStock = async (e, onSuccess) => {
        e.preventDefault();
        try {
            // Prepare data
            const { id, ...restOfStock } = newStock;
            const itemsToSend = {
                ...restOfStock,
                sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                lastUpdated: new Date().toLocaleDateString('en-GB'),
            };

            // Send to Backend
            const res = await fetch("http://localhost:5000/api/stocks/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(itemsToSend)
            });
            
            const data = await res.json();

            if (res.ok) {
                alert(data.message);

                // Refresh data immediately
                fetchStocks(); 
                
                // Clear Form
                setNewStock({
                    id: '', productName: 'White Shevya', sku: '', category: "Plain",
                    quantity: '10', unit: "kg", status: 'In Stock', lastUpdated: '', price: '70'
                });

                // Execute Callback (Closes the modal in UI)
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error saving stock:", error);
            alert("Network error. Please try again.");
        }
    };

    const handleAddInputChange = (e) => {
        setNewStock({ ...newStock, [e.target.name]: e.target.value });
    };

    // 5. Initial Load
    useEffect(() => {
        fetchStocks();
    }, []);

    // 6. Return Provider
    return (
        <StockContext.Provider value={{
            stock,
            setStocks,
            newStock,
            setNewStock,
            handleSaveNewStock,
            handleAddInputChange,
            isLoading,
            fetchStocks,
            orders_revenue,
            lowstockitems
            
        }}>
            {children}
        </StockContext.Provider>
    );
}

export const useStocks = () => useContext(StockContext);