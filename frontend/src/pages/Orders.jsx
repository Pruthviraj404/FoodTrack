import React, { useState, useMemo, useEffect } from 'react';
import '../index.css';
import { useOrders } from '../context/OrdersContext';

import {
  Search,
  Filter,
  Package,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Download,
  Eye,
  ShoppingBag,
  Calendar,
  MapPin,
  CreditCard,
  Plus,
  User,
  FileText,
  Trash2,
  Save
} from 'lucide-react';



const StatusBadge = ({ status }) => {
  const styles = {
    Paid: "bg-green-100 text-green-700 ring-green-600/20",
    Pending: "bg-yellow-100 text-yellow-700 ring-yellow-600/20",
    Overdue: "bg-red-100 text-red-700 ring-red-600/20",
    // Shipping statuses
    Delivered: "bg-blue-100 text-blue-700 ring-blue-600/20",
    Shipped: "bg-indigo-100 text-indigo-700 ring-indigo-600/20",
    Processing: "bg-gray-100 text-gray-700 ring-gray-600/20",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <XCircle className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

const Orders = () => {

  const {  orders, fetchOrders, addOrder, updateOrder, loading}=useOrders();

  const [editorder, setEditOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [expandedOrderId, setexpandedOrderId] = useState(null);


  // New Order Form State
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    items: [
      { productType: "White Shevya", quantity: 1 }
    ],
    orderdate: new Date().toISOString().split('T')[0],
    paymentStatus: 'Pending',
    notes: ''
  });

 
  const handleInputChange = (e) => {



    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value
    });
  };

  const handleItemchange = (index, field, value) => {
    const updatedItems = [...newOrder.items];
    updatedItems[index][field] = value;
    setNewOrder({
      ...newOrder,
      items: updatedItems
    });


  };

  const handleInputChangeEdit = (e) => {


    setEditOrder({
      ...editorder,
      [e.target.name]: e.target.value,

    });
  };

  const handleEditInputChange = (index, field, value) => {
    const updatedItems = editorder.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setEditOrder({
      ...editorder,
      items: updatedItems,
    });
  };

  const addNewItemRow = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { productType: 'White Shevya', quantity: 1 }]
    });
  };

  const addNewItemEditRow=()=>{
    setEditOrder({
      ...editorder,
      items:[...editorder.items,{ productType: 'White Shevya', quantity: 1 }]
    });
  };

  const handleAddOrder=async()=>{
    await addOrder(newOrder);
    setNewOrder({
      customerName: '',
    items: [
      { productType: "White Shevya", quantity: 1 }
    ],
    orderdate: new Date().toISOString().split('T')[0],
    paymentStatus: 'Pending',
    notes: ''
    });


  };

  const handleUpdateorder=(e)=>{
    updateOrder(editorder._id,editorder);


  };

  




  // Filter Logic
  const filteredOrders = useMemo(() => {
    const search = searchQuery.toLowerCase();


    return orders.filter(order => {
      const matchesTab = activeTab === 'All'
        ? true
        : activeTab === 'Pending'
          ? order.paymentStatus === 'Pending'
          : order.paymentStatus === activeTab;



      const matchesSearch =
        order.customerName?.toLowerCase().includes(search) ||
        order.id?.toLowerCase().includes(search) ||
        order.orderdate?.toLowerCase().includes(search) ||

        order.items?.some(item =>
          item.productType?.toLowerCase().includes(search)
        );

      return matchesTab && matchesSearch;

    });

  }, [activeTab, searchQuery, orders]);


  const toggleOrderRow = (orderId) => {
    if (expandedOrderId === orderId) {
      setexpandedOrderId(null);
    } else {
      setexpandedOrderId(orderId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">

  
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Orders Page</h1>
            <p className="mt-2 text-gray-500">Manage customer orders, track payments, and update status.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Customer Order
            </button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between items-center gap-4">

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-lg w-full lg:w-auto overflow-x-auto">
              {['All', 'Pending', 'Paid'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 lg:flex-none px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                placeholder="Search Customer, ID, or Product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table View (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer / Order ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Type</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ship Date</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const isExpanded = expandedOrderId === order._id;


                    return (
                      <React.Fragment key={order._id}>

                        {/* MAIN ROW */}
                        <tr
                          onClick={() => toggleOrderRow(order._id)}
                          className={`cursor-pointer transition-colors ${isExpanded ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                          {/* CUSTOMER */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                                {order.customerName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold">{order.customerName}</div>
                                <div className="text-xs text-gray-500 font-mono">{order.id}</div>
                              </div>
                            </div>
                          </td>


                          {/* ITEMS DROPDOWN BUTTON */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white">
                                <span className="text-sm font-medium">
                                  {order.items.length} Items
                                </span>
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>

                              {!isExpanded && (
                                <span className="text-xs text-gray-400">
                                  {order.items[0]?.productType}...
                                </span>
                              )}
                            </div>
                          </td>

                          {/* DATE */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={14} />
                              {new Date(order.orderdate).toLocaleDateString('en-GB')}
                            </div>
                          </td>

                          {/* PAYMENT */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={order.paymentStatus} />
                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // 🔥 VERY IMPORTANT
                                setSelectedOrder(order);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </button>
                          </td>
                        </tr>

                        {/* 🔽 DROPDOWN ROW */}
                        {isExpanded && (
                          <tr className="bg-gray-50">
                            <td colSpan="5" className="px-6 py-4">
                              <div className="pl-12 space-y-2">
                                {order.items.map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex justify-between bg-white p-3 rounded border"
                                  >
                                    <span>{item.productType}</span>
                                    <span className="font-bold">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}

                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Card View (Mobile) */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                        {order.customerName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{order.customerName}</h3>
                        <p className="text-xs text-gray-500">{order.id}</p>
                      </div>
                    </div>
                    <StatusBadge status={order.paymentStatus} />
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Product:</span>
                      <span className="font-medium">{order.productType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Details
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">No orders match your filters.</div>
            )}
          </div>
        </div>
      </main>

      {/* Add New Order Modal - Based on User Image */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Customer Order"
      >
        <form onSubmit={handleAddOrder} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              required
              value={newOrder.customerName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Aditya Singh"
            />
          </div>

          {/* Product Type */}




          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-700">Order Items</label>
            </div>


            <div className="space-y-3">
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-1">
                    <select

                      value={item.productType}
                      onChange={(e) => handleItemchange(index, 'productType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none">
                      <option value="White Shevya">White Shevya</option>
                      <option value="Mango Flavour Shevya">Mango Flavour Shevya</option>
                      <option value="PineApple Flavour Shevya">PineApple Flavour Shevya</option>
                      <option value="Orange Flavour Shevya">Orange Flavour Shevya</option>
                      <option value="Rukwat Shevya">Rukwat Shevya</option>
                    </select>

                  </div>


                  <div className='w-24'>
                    <input
                      type="Number"
                      placeholder='Qty'
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemchange(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                  </div>

                </div>
              )

              )}
            </div>

            <button
              type="button"
              onClick={addNewItemRow}

              className="text-sm text-blue-600 font-bold hover:underline mt-2 flex items-center gap-1"
            >
              + Add Another Product
            </button>

          </div>




          {/* 1. SHIP DATE (Moved to its own row for better layout) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Ship Date</label>
            <div className="relative">
              <input
                type="date"
                name="orderdate"
                value={newOrder.orderdate} // Ensure this matches your state name
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status</label>
            <select
              name="paymentStatus"
              value={newOrder.paymentStatus}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">required</p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={newOrder.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono text-sm"
              placeholder="e.g. want plate circle shevya"
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Order
            </button>
          </div>
        </form>
      </Modal>
      {/* --- ORDER DETAILS MODAL (Add this back) --- */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-bold text-lg text-gray-900">{selectedOrder.customerName}</p>
                <p className="text-xs text-gray-400 font-mono mt-1">{selectedOrder.id || selectedOrder._id}</p>
              </div>
              <StatusBadge status={selectedOrder.paymentStatus} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Product Type</p>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="text-sm text-gray-700 font-medium">
                      {item.productType}
                    </span>

                    <span className="text-sm text-gray-500 font-semibold">
                      {item.quantity} Kg
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-500 uppercase font-semibold">Ship Date</p>
                <p className="font-medium text-gray-900 mt-1">
                  {selectedOrder.orderdate ? new Date(selectedOrder.orderdate).toLocaleDateString('en-GB') : 'N/A'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900 mb-2">Notes</p>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-sm text-yellow-800 italic">
                {selectedOrder.notes || "No notes provided."}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                Print Invoice
              </button>

              <button
                onClick={() => {
                  setEditOrder({
                    ...selectedOrder,
                    items: selectedOrder.items.map(item => ({ ...item }))
                  });
                }}
                className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Edit Order
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* --- EDIT ORDER MODAL (Add this block) --- */}
      <Modal
        isOpen={!!editorder}
        onClose={() => setEditOrder(null)}
        title="Edit Order Details"
      >
        {editorder && (
          <form onSubmit={handleUpdateorder} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                name="customerName"
                required
                value={editorder.customerName}
                onChange={handleInputChangeEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Product Type & Date */}

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Orders Items</label>

              {editorder.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    name="productType"
                    value={item.productType}
                    onChange={(e) => handleEditInputChange(index, 'productType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none">
                  
                    <option value="White Shevya">White Shevya</option>
                    <option value="Mango Flavour Shevya">Mango Flavour Shevya</option>
                    <option value="PineApple Flavour Shevya">PineApple Flavour Shevya</option>
                    <option value="Orange Flavour Shevya">Orange Flavour Shevya</option>
                    <option value="Rukwat Shevya">Rukwat Shevya</option>
                  </select>

                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleEditInputChange(index, 'quantity', e.target.value)}
                    placeholder="Qty"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 outline-none"
                  />

                  <button
                    type="button"
                    onClick={
                      () => {
                        const updatedItemsnew = editorder.items.filter((_, i) => i != index);
                        setEditOrder({ ...editorder, items: updatedItemsnew });
                      }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >

                    <Trash2 size={18} />
                  </button>

                        
                  
                </div>

                
              ))}

               <button
              type="button"
              onClick={addNewItemEditRow}

              className="text-sm text-blue-600 font-bold hover:underline mt-2 flex items-center gap-1"
            >
              + Add Another Product
            </button>




            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ship Date</label>
              <input
                type="date"
                name="orderdate"
                // Handle date formatting if necessary (yyyy-mm-dd)
                value={editorder.orderdate ? new Date(editorder.orderdate).toISOString().split('T')[0] : ''}
                onChange={handleInputChangeEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>


            {/* Payment Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status</label>
              <select
                name="paymentStatus"
                value={editorder.paymentStatus}
                onChange={handleInputChangeEdit}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={editorder.notes}
                onChange={handleInputChangeEdit}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
              ></textarea>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={() => setEditOrder(null)}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Update Order
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default Orders;