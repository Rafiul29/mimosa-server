import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { handleError } from "../errors/handle.error";

export class UserController {
  constructor() { }
  
  public async getAnUser(req: Request, res: Response): Promise<void> {
    try {

      const { uid } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: "user not found" });
        return
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: "Forbidden" });
        return
      }

      await Promise.resolve().then(async() => {
        const user = await UserModel.findById(uid).populate('bookings');
        
        res.status(200).json(user)
      })

    } catch (error:unknown) {
      await handleError(error,res);
    }

  }

  public async deleteAnUser(req: Request, res: Response): Promise<void> {
try {

      const { uid } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: "user not found" });
        return
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: "Forbidden" });
        return
      }

      await Promise.resolve().then(async() => {
        const user = await UserModel.findByIdAndDelete(uid);
        res.status(200).json(user)
      })

    } catch (error:unknown) {
      await handleError(error,res);
    }
  }

  public async updateAnUser(req: Request, res: Response): Promise<void> {
    try {

      const { uid } = req.params;
      const userId = req.user?._id;
      const {name,photoUrl,address,phoneNumber}=req.body;

      if (!mongoose.Types.ObjectId.isValid(uid)) {
        res.status(404).json({ message: "user not found" });
        return
      }

      if (uid !== userId.toString()) {
        res.status(403).json({ message: "Forbidden" });
        return
      }

      await Promise.resolve().then(async() => {
        const user = await UserModel.findByIdAndUpdate(uid,{name,photoUrl,address,phoneNumber},{new:true});
        res.status(200).json(user)
      })

    } catch (error:unknown) {
      await handleError(error,res);
    }
  }


  public async getAllAnUsers(req: Request, res: Response): Promise<void> {
    try {    
      await Promise.resolve().then(async() => {
        const user = await UserModel.find({});
        res.status(200).json(user)
      })
    } catch (error:unknown) {
      await handleError(error,res);
    }
  }

}