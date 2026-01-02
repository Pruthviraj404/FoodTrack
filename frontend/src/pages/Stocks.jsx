import React, { useEffect, useState } from 'react';
import { useStocks } from '../context/StockContext';
import { 
  Search, 
  Plus, 
  Save, 
  XCircle, 
  Calendar,
} from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <XCircle className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

const Stocks = () => {
  
  // 1. GET DATA FROM CONTEXT
  const { 
    stock, 
    
    setStocks, 
    newStock, 
    setNewStock, 
    handleSaveNewStock, 
    handleAddInputChange,
    isLoading ,
    fetchStocks
  } = useStocks();

  // 2. LOCAL UI STATE
  const [activeTab, setActiveTab] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false); // Edit Modal
  const [isAddStockModalOpen, setAddStockModalOpen] = useState(false); // Add Modal
  const [formdata, setFormData] = useState({});

  // 3. SAFE FILTERING (Prevents Crash)
  const filteredStocks = stock.filter((item) => {
    if (activeTab === "ALL") return true;
    return item.status === activeTab;
  });

  // 4. HELPER FUNCTIONS
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-700 border border-green-200';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'Out of Stock': return 'bg-red-100 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsModalOpen(true);
  }

  const openAddStockModel = () => {
    setAddStockModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  // 5. SAVE HANDLER (Connects Button -> Context -> Close Modal)
  const handleSaveClick = (e) => {
    handleSaveNewStock(e, () => {
        setAddStockModalOpen(false); // This runs ONLY if save is successful
    });
  };

  const handleSaveEdit = async() => {

 
     
    try{
    const stock_id=formdata._id;
    const res= await fetch(`http://localhost:5000/api/stocks/edit/${stock_id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formdata)

    });

    const data= await res.json();
    if(res.ok){
      setIsModalOpen(false);
      setFormData({});
      fetchStocks();
      
   
      
      
    }else{
      alert(res.message)
        

    }
    
 
   
  }catch(error){
    console.error(error);

  }


};
  

    



    // setStocks((prevstocks)=>{
      
    //   prevstocks.map((item)=>(item._id===formdata._id || item.id===formdata.id ? formdata:item))
    // });
 
  
//   if(!stock)return null;

//   return(
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Edit Stock</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium">Name</label>
//             <Input name="name" value={formData.name} onChange={handleChange} />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Quantity</label>
//             <Input name="quantity" type="number" value={formData.quantity} onChange={handleChange} />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Price</label>
//             <Input name="price" type="number" value={formData.price} onChange={handleChange} />
//           </div>

//           <Button className="w-full" onClick={handleSubmit}>
//             Save Changes
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>

//   );
  
// };


  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* MAIN CONTENT - Now takes full width since Sidebar is removed */}
      <main className="flex-1 flex flex-col overflow-y-auto">
       
        
       

        <div className="p-8 max-w-7xl mx-auto w-full">
         <div className="flex justify-end mb-6">

          <button
           className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            onClick={openAddStockModel}
            >
            <Plus className="w-5 h-5 mr-2"/>
            Add Stock


           </button>
         </div>
        

          {/* TABLE CARD */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            
            {/* Table Controls */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['ALL', 'In Stock', 'Low Stock', 'Out of Stock'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search Product, SKU, or Category..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                  <th className="p-5">Product Name / SKU</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Quantity Available</th>
                  <th className="p-5">Last Updated</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStocks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {item.productName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-500">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className={`font-semibold ${item.quantity < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.quantity} <span className="text-xs text-gray-500 font-normal">{item.unit}</span>
                        </span>
                        {/* Simple Progress Bar for Visual Stock Level */}
                        <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.quantity === 0 ? 'bg-gray-200' : 
                              item.quantity < 50 ? 'bg-yellow-400' : 'bg-green-500'
                            }`} 
                            style={{ width: item.quantity > 1000 ? '100%' : `${(item.quantity / 1000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        {item.lastUpdated}
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button  onClick={()=>openEditModal(item)}className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                    </td>

                    


                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
              <span>Showing  { filteredStocks.length} of {stock.length} products</span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50">Prev</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
              </div>
            </div>

          </div>
        </div>

        
      </main>
     {/* Edit Stock Modal */}
      <Modal 
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      title="Edit Stock">

    <div className="space-y-4">
      <div>

      <label className="space-y-4">Product Category</label> 
      <select name="category"
      value={formdata.category}
      onChange={handleInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
      >
      <option value="Plain">Plain</option>
      <option value="Flavoured">Flavoured</option>
      <option value="Special/Rukwat">Special / Rukwat</option>
      </select>
      </div>

         <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <select 
          name="productName" 
          value={formdata.productName || ''} 
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
        >
          <option>White Shevya</option>
          <option>Mango Flavour Shevya</option>
          <option>Orange Flavour Shevya</option>
          <option>PineApple Flavour Shevya</option>
          <option>Rukwat Shevya</option>
        </select>
    </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number"
              name="quantity" 
              value={formdata.quantity || ''} 
              onChange={handleInputChange} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
             <select 
               name="status"
               value={formdata.status || 'In Stock'}
               onChange={handleInputChange}
               className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
             >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
             </select>
          </div>

          <button 

            onClick={handleSaveEdit}
            className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-4 flex justify-center items-center gap-2"
          >
            <Save className="w-4 h-4" /> 
            Save Changes
          </button>
        </div>
        

      </Modal>
      

      {/* ADD stock Modal */}
      <Modal

      isOpen={isAddStockModalOpen}
      onClose={()=>setAddStockModalOpen(false)}
      title={"Add New Stock"}
      >
        <div className="space-y-4">
    

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label> 
      <select name="category"
      value={newStock.category}
      onChange={handleAddInputChange}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
      >
      <option value="Plain">Plain</option>
      <option value="Flavoured">Flavoured</option>
      <option value="Special/Rukwat">Special / Rukwat</option>
      </select>
      

     
    </div>

    {/* Category */}
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <select 
          name="productName" 
          value={newStock.productName} 
          onChange={handleAddInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
        >
          <option>White Shevya</option>
          <option>Mango Flavour Shevya</option>
          <option>Orange Flavour Shevya</option>
          <option>PineApple Flavour Shevya</option>
          <option>Rukwat Shevya</option>
        </select>
    </div>

    {/* Quantity & Unit Grid */}
    <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input 
            type="number"
            name="quantity" 
            value={newStock.quantity} 
            onChange={handleAddInputChange} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <select 
            name="unit" 
            value={newStock.unit} 
            onChange={handleAddInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
          >
            <option value="kg">kg</option>
            <option value="packets">packets</option>
            <option value="box">box</option>
            <option value="liters">liters</option>
          </select>
        </div>
    </div>

    {/* Price */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit (₹)</label>
      <input 
        type="number" 
        name="price" 
        value={newStock.price} 
        onChange={handleAddInputChange} 
        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
      />
    </div>

    {/* Status */}
    <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
       <select 
         name="status"
         value={newStock.status}
         onChange={handleAddInputChange}
         className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-white"
       >
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
       </select>
    </div>

    {/* Save Button */}
    <button 
      onClick={handleSaveClick}
      className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-4 flex justify-center items-center gap-2 shadow-sm"
    >
      <Save className="w-4 h-4" /> 
      Save New Item
    </button>
  </div>
        


      </Modal>



    </div>

    
  );
  
 
  
}

export default Stocks;