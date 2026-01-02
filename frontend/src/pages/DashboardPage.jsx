import React, { useEffect, useState } from 'react';
import { useOrders} from '../context/OrdersContext';
import {StockContext, useStocks} from '../context/StockContext';
import { 
  Package, 
  Search, 
  Bell, 
  Calendar,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const DashboardPage = () => {
  const {orders}=useOrders();
  const {lowstockitems,orders_revenue}=useStocks();
  const[notification,setNotification]=useState([]);
  
  useEffect(()=>{
    if(orders.length==0){
      return;
    }
    const latest=orders[orders.length-1];

    setNotification(prev=>[
      {
      text:`New order placed by ${latest.customerName}`,
      time:"Just Now",
      type:`${latest.productType}`

    },
    ...prev
      
    ]);
  },[orders]);

  const latestOrder=notification[0];

  const totalOrders=orders.length;
  // --- DASHBOARD DATA ---
  const dashboardMetrics = [
    { title: "Total Revenue", value: `${orders_revenue}`, change: "+12.5%", trend: "up", icon: <DollarSign size={20} />, color: "blue" },
    { title: "Total Orders", value:`${totalOrders}`, change: "+8.2%", trend: "up", icon: <ShoppingBag size={20} />, color: "purple" },
    { title: "Low Stock Items", value: `${lowstockitems.length}`, change: "Urgent", trend: "neutral", icon: <AlertCircle size={20} />, color: "orange" },
    { title: "Avg. Order Value", value: "₹340", change: "-2.1%", trend: "down", icon: <TrendingUp size={20} />, color: "green" },
  ];



  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      <main className="flex-1 flex flex-col overflow-y-auto">
        
       

        <div className="p-8 max-w-7xl mx-auto w-full">
          
          {/* COMPANY CONTEXT HEADER */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center text-white bg-purple-600 transition-colors">
                  <TrendingUp size={25} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Shevya Management</h1>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span className="text-blue-600 font-medium capitalize">Dashboard</span>
                    <span>/</span>
                    <span className="hover:text-blue-600 cursor-pointer">Overview</span>
                  </div>
                </div>
             </div>
             
             <div className="flex gap-3">
               <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                 <Calendar size={16} />
                 <span>Dec 2025</span>
               </div>
             </div>
          </div>

          {/* PAGE TITLE */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0d3b66] capitalize">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 mt-1">
              Real-time updates on your business performance and inventory alerts.
            </p>
          </div>

          {/* DASHBOARD CONTENT */}
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</h3>
                    </div>
                    <div className={`p-2 rounded-lg bg-${metric.color}-50 text-${metric.color}-600`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium">
                    {metric.trend === 'up' && <ArrowUpRight size={14} className="text-green-500" />}
                    {metric.trend === 'down' && <ArrowDownRight size={14} className="text-red-500" />}
                    <span className={metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-orange-600'}>
                      {metric.change}
                    </span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Revenue Chart Area */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800">Revenue Overview</h3>
                  <select className="text-sm border-gray-200 border rounded-md px-2 py-1 text-gray-500 outline-none">
                    <option>Last 6 Months</option>
                    <option>This Year</option>
                  </select>
                </div>
                
                {/* Simple CSS Chart */}
                <div className="h-64 flex items-end justify-between gap-2">
                  {[35, 45, 30, 60, 75, 50, 65, 80].map((h, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group cursor-pointer">
                      <div 
                        className="w-full bg-blue-100 rounded-t-sm relative group-hover:bg-blue-600 transition-colors"
                        style={{ height: `${h}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            ₹{h}k
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{'MTWTFSS'[i % 7]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                { latestOrder &&(
                    <div key={latestOrder.text} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className={`mt-1 h-2 w-2 rounded-full ${latestOrder.type === 'order' ? 'bg-blue-500' : latestOrder.type === 'stock' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                      <div>
                        <p className="text-sm text-gray-700">{latestOrder.text}</p>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                          {/* <Clock size={10} /> {item.time} */}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <button className="w-full mt-6 text-sm text-blue-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                  View All Activity <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DashboardPage;