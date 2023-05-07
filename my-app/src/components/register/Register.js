import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import Style from './register.module.css';
import Modal from '../modals/Modal';



const schema = yup.object({
    name: yup.string().required("Username is required"),
    sex:yup.string().required("select gender"),
    gov_id:yup.string(),
    country:yup.string(),
    
    mobile_no:yup.string().matches(/^\d+$/,{
        message:"Phone not valid",
        excludeEmptyString:true
        }).test({
            name:"mobile_no",
            test:function(value){
                if(value.length==0 || value.length==10){
                    return true
                }
                return false
            }
        }),
    emergency_no:yup.string().matches(/^\d+$/,{
        message:"Phone not valid",
        excludeEmptyString:true
        }).test({
        name:"emergency_no",
        test:function(value){
            if(value.length==0 || value.length==10){
                return true
            }
            return false
        }
    }),
    email:yup.string().email('please enter a valid email'),
    religion:yup.string(),
    pincode:yup.string().test({
        name:"pincode_check",
        test:function(value){
            if(value.length>0 && !value.match(/^\d+$/)){
                return this.createError({message:'please Enter a valid pin code'})

            }
            return true;
        }
    }),
    state:yup.string(),
    age:yup.string().test({
        name:"age_check",
        test:function(value){
            if(!value.match(/^\d+$/) || value.length>3){
                return this.createError({message:'please Enter a valid age number'})

            }
            return true;
        }
    }).required('please enter a age'),
    city:yup.string(),
    marital_status:yup.string(),
    blood_group:yup.string(),
    occupation:yup.string(),
    guardian:yup.string(),
    guardian_detail:yup.string(),
    gov_id_number:yup.string().when("gov_id",{
        is: (number) => {
            
            if(number.length>0){
            return true
            }else{
                return false;
            }
          },
          then: function (sch){
            
                return yup.string().test({
                    name: 'gov_id_check',
                    
                    
                    test: function (value) {
                        
                        if(this.parent.gov_id=="pan" && (!value.match(/^[a-z0-9]+$/i) || value.length!=10)){
                           
                           return this.createError({message:'please Enter a valid PAN number'})
                           
                        } 
                        if(this.parent.gov_id=="aadhar" && (!value.match(/^\d+$/) || value.length!=12)){
                            
                            return this.createError({message:'please Enter a valid aadhar number'})

                        }
                        return true
                    },
                    
                  })
              
          }
    })
   
  });
function Register() {
    const [showmodal,setModal]=useState(false)
    const navigate=useNavigate();
    const form = useForm({
        defaultValues: {
          name: "",
          gov_id:"",
          sex: "",
          gov_id_number:"",
          country:"india"
        },
        resolver: yupResolver(schema),
      });

    const { register, handleSubmit, formState ,reset} = form;
    const { errors } = formState;
    const onSubmit = (data) => {
        
        axios.post('http://localhost:4000/',data).then(res=>
        
        {reset()
            setModal(true)
        })
        .catch(err=>console.log(err))
      };
  return (
    <div style={{padding:'10px'}}>
        {showmodal &&<Modal setModal={setModal}/>}
        <div style={{textAlign:'center'}}>
            {/* <button onClick={()=>{navigate('/users')}} className={Style.all_users_button}>see all users</button> */}
            <h3>User Registration form</h3>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h4 style={{margin:0,padding:0}}>Personal details</h4>
        <div className={Style.personal_detail_container}>
            
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Name <span style={{color:'red'}}>*</span></label>
                    <input placeholder="Name" id="name" className={Style.form_input} type="text" {...register("name")}/>
                    <p className={Style.error_style}>{errors.name?.message}</p>

                </div>
                <div className={Style.form_control}>
                    <label className={Style.form_label} >Age <span style={{color:'red'}}>*</span></label>
                    <input placeholder="Age in years" className={Style.form_input} type="text" {...register("age")}/>
                    <p className={Style.error_style}>{errors.age?.message}</p>

                </div> 
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Sex <span style={{color:'red'}}>*</span></label>
                    <select  id="sex" className={Style.form_select} {...register("sex")}>
                    <option value="" disabled selected>select gender</option>

                        <option>male</option>
                        <option>female</option>

                    </select>
                    <p className={Style.error_style}>{errors.sex?.message}</p>

                </div>
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Mobile No</label>
                    <span style={{fontWeight:'bold'}}>+91</span>
                    <input placeholder="Enter mobile" className={Style.form_input} type="text" {...register("mobile_no")}/>
                    <p className={Style.error_style}>{errors.mobile_no?.message}</p>

                </div> 
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Govt Id</label>
                    <select id="gov_id" style={{marginRight:"10px"}} className={Style.form_select} {...register("gov_id")}>
                    <option value="" disabled selected>Id type</option>

                            <option value="aadhar">aadhar</option>
                            <option value="pan">PAN</option>

                    </select>
                    <p className={Style.error_style}>{errors.gov_id?.message}</p>

                    <input placeholder='Enter gov id' id="gov_id_number" className={Style.form_input} type="text" {...register("gov_id_number")}/>
                    <p className={Style.error_style}>{errors.gov_id_number?.message}</p>
                        

                </div>                       
        </div>
        <br></br>
        <br></br>
        <h4 style={{margin:0,padding:0}}>Contact details</h4>
        

        <div className={Style.contact_detail_container}>
             
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Email</label>
                    <input placeholder="Email" className={Style.form_input} type="text" {...register("email")}/>
                    <p className={Style.error_style}>{errors.email?.message}</p>

                </div> 
                <div className={Style.form_control}>
                    <label className={Style.form_label}>Emergency No</label>
                    <span style={{fontWeight:'bold'}}>+91</span>
                    <input placeholder="Emergency No" className={Style.form_input} type="text" {...register("emergency_no")}/>
                    <p className={Style.error_style}>{errors.emergency_no?.message}</p>

                </div> 
                <div className={Style.form_control}>
                        <label className={Style.form_label}>Guardian details</label>
                        <select style={{marginRight:"10px"}} className={Style.form_select} {...register("guardian")}>
                                <option>Father</option>
                                <option>Mother</option>

                        </select>
                        <input placeholder="Guardian detail" className={Style.form_input} type="text" {...register("guardian_detail")}/>
                </div> 
        </div>
        <br></br>
        <br></br>
        <h4 style={{margin:0,padding:0}}>Address details</h4>

        <div className={Style.address_detail_container}>
            <div className={Style.form_control}>
                    <label className={Style.form_label}>adress</label>
                    <input placeholder="Address" className={Style.form_input} type="text" {...register("address")}/>
            </div> 


            <div className={Style.form_control}>
                    <label className={Style.form_label}>State</label>
                    <select className={Style.form_select} {...register("state")}>
                        
                        <option>maharashtra</option>
                        <option>Mp</option>
                        <option>Up</option>
                        <option>Rajasthan</option>
                        <option>Bihar</option>
                        <option>karnataka</option>


                    </select>
                    
            </div>

            <div className={Style.form_control}>
                    <label className={Style.form_label}>city</label>
                    <input placeholder="City" className={Style.form_input} type="text" {...register("city")}/>
            </div> 

            <div className={Style.form_control}>
                    <label className={Style.form_label}>country</label>
                    <input className={Style.form_input} type="text" {...register("country")}/>
            </div> 
            <div className={Style.form_control}>
                    <label className={Style.form_label}>pincode</label>
                    <input placeholder="pincode" className={Style.form_input} type="text" {...register("pincode")}/>
                    <p className={Style.error_style}>{errors.pincode?.message}</p>

            </div> 
        </div>
        <br></br>
        <br></br>
        <h4 style={{margin:0,padding:0}}>other details</h4>

        <div className={Style.other_detail_container}>
            <div className={Style.form_control}>
                    <label className={Style.form_label}>Occupation</label>
                    <input placeholder="Occupation" className={Style.form_input} type="text" {...register("occupation")}/>
            </div>
            <div className={Style.form_control}>
                    <label className={Style.form_label}>Religion</label>
                    <select className={Style.form_select} {...register("religion")}>
                        <option>Hndu</option>
                        <option>muslim</option>
                        <option>christian</option>


                    </select>
            </div>
            <div className={Style.form_control}>
                    <label className={Style.form_label}>Marital status</label>
                    <select className={Style.form_select} {...register("marital_status")}>
                        <option>married</option>
                        <option>unmarried</option>


                    </select>
            </div>
            <div className={Style.form_control}>
                    <label className={Style.form_label}>blood group</label>
                    <select className={Style.form_select} {...register("blood_group")}>
                        <option>A+</option>
                        <option>B+</option>


                    </select>
            </div>
        </div>
        <button className={Style.submit_button}>submit</button>
        </form>
    </div>
  )
}

export default Register