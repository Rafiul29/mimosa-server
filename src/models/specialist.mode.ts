import mongoose from "mongoose";
import { specialistType } from "../types/specialist.type";

const specialistSchema= new mongoose.Schema<specialistType>({
    name:{
      type:String,
      required:true
    },
    designation:{
      type:String,
      required:true,
    },
    bio:{
        type:String,
        required:true
    },
    photoUrl:
      {
        type:String,
        required:true,
      }
    ,
    dateOfBirth:{
      type:String,
      required:true,
    },
    beautyPackages:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"BeautyPackage",
      }
    ]
   
},{timestamps:true})

const SpecialistModel=mongoose.model<specialistType>('Specialist' ,specialistSchema)

export default SpecialistModel;
