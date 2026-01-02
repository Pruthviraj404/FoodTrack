import React,{createContext,useContext,useEffect,useState} from "react";
import { data } from "react-router-dom";

const UserContext=createContext();


export const UserProvider=({children})=>{

    
  const[signupFormdata,Setsignupformdata]=useState(
    {
      fullName:'',
      email:'',
      password:'',
      role:'viewer'

    }
  );



    const AddUser= async(signupFormdata)=>{
      try{
        const response= await fetch("http://localhost:5000/api/auth/adduser",{
            method:"POST",  
            headers:{"Content-Type":"application/json"},
            credentials:"include",

            body:JSON.stringify(signupFormdata),
           


        }
      );

      const data = await response.json();


    
    
      if(response.ok){
        alert("Added");


      }

      else{
        alert(data.message || "signup fail");
      }
      }catch(error){
        console.log(error);


      }


    };


    return(
        <UserContext.Provider value={{signupFormdata,Setsignupformdata,AddUser}}>
            {children}
        </UserContext.Provider>

    );





};
export const UseUser=()=>useContext(UserContext);