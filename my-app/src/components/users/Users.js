import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import DataTable from 'datatables.net-dt';
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
//import "datatables.net-dt/js/dataTables.dataTables.min.js";


function Users() {
  const [userData,setUserData]=useState([]);
  $.DataTable = DataTable
const tableRef = useRef()
  useEffect(()=>{
    
      const table = $(tableRef.current).DataTable(
        {
            data: userData,
                columns: [
                    { title: "Name"},
                    { title: "age"},
                    { title: "sex"},
                    { title: "mobile."},
                    { title: "address"},
                    {title:"gov_id"},
                    { title: "gov_id_no"},
                    { title: "guardian_details"}

                ],
                destroy: true  
        }
    )
    
    
  },[userData])
  useEffect(()=>{
    axios.get('http://localhost:4000/users').then(res=>{
      //console.log(res)
      const newData=[]
      res.data.forEach(element => {
        const data=[element.name,element.age,element.sex,element.mobile_no,
        element.address,element.gov_id,element.gov_id_number,element.guardian_detail
        ]
        newData.push(data)
      });
      setUserData(newData)
    }).catch(err=>console.log(err))
  },[])
  return (
    <div style={{marginTop:'20px',padding:'10px'}}>
      <table ref={ tableRef } className="display"></table>
    </div>
  )
}

export default Users