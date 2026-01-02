import { useState } from "react";
import { UseUser } from "../context/UserContext";



const SignupPage =()=>{
  const {signupFormdata,Setsignupformdata,AddUser}=UseUser();

  const handleChange=(e)=>{
    Setsignupformdata({...signupFormdata,[e.target.name]:e.target.value});
  }

  const handleSignUp = async(e) => {
     e.preventDefault();
   
     await AddUser(signupFormdata);
    
  };

  

    return(
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Branding Icon */}
        <div className="mx-auto h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create Account</h2>
        <p className="mt-2 text-sm text-slate-600">
          Join the platform to manage your workflow
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-5" onSubmit={handleSignUp}>
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="user@gmail.com"
                onChange={handleChange}
              />
            </div>

            {/* Role Selection (RBAC Logic) */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Select Role</label>
              <select
                name="role"
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-white"
                onChange={handleChange}
                value={signupFormdata.role}
              >
                <option value="viewer">Viewer (Read Only)</option>
                <option value="editor">Editor (Can Edit Content)</option>
                <option value="admin">Admin (Full Control)</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all active:scale-[0.98]"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default  SignupPage; 