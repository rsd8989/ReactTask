import React from 'react'
import { Link ,NavLink} from 'react-router-dom'
import Style from './nav.module.css';
function Nav() {
  return (
    <div className={Style.navigation_cotainer}>
        <div>
            <h4 style={{padding:'0',color:'white'}}>ReactTask</h4>
        </div>
        <div style={{display:'flex'}}>
            <div style={{padding:'10px'}}>
            <NavLink className={Style.nav_bar_link} style={({isActive})=>{return isActive?{fontWeight:'bold',textDecoration:'none'}:{}}} to="/">Register</NavLink>

            </div>

            <div style={{padding:'10px'}}>
            <NavLink className={Style.nav_bar_link} style={({isActive})=>{return isActive?{fontWeight:'bold',textDecoration:'none'}:{}}} to="/users">Users</NavLink>

            </div>    

                
           
        </div>
    </div>
  )
}

export default Nav