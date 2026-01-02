import "../styles/header.css";
import { FaBell } from "react-icons/fa";
const Header=({title})=>{
    return(

        <div className="header">


            <h2 className="header-title" >{title}</h2>

            <div className="header-right" >

                <div className="search-box">
                    <input type="text" placeholder="Search.."/>

                </div>

                <div className="icon">
                    <FaBell/>
                </div>

                <div className="Profile" >
                    <img src="https://i.pravatar.cc/40" alt="User"/>

                </div>
            </div>

        </div>
        
    );
};;

export default Header;