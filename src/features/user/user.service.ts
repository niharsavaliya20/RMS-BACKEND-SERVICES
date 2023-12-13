import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./user.schema";
import { updateSignUpDto } from "src/Dto/updateSignUp.dto";

@Injectable()

export class UserService {

  constructor(@InjectModel('user')
  private userModel: Model<User>) { }

  async getAllSignUp(): Promise<User[]> {
    const profile = await this.userModel.find();
    return profile;
  }

  async findById(id: string): Promise<User[] | null> {
    return this.userModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id), // Match specific userId
        },
      },
      {
        $lookup: {
          from: 'employerprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employerprofile', // Alias for the joined documents
        },
      },
      {
        $lookup: {
          from: 'employeeprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employeeprofile', // Alias for the joined documents
        },
      },
    ])
  }  

  async employerWithProfile(): Promise<User[] | null> {
    return this.userModel.aggregate([
      {
        $match: {
          roles: { $in : ["Employer"]},
          isActive: true
        },
      }, 
      {
        $lookup: {
          from: 'employerprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employerprofile', // Alias for the joined documents
        },
      },
    ])
  }

  async employerProfileId(id): Promise<User[] | null> {
    return this.userModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id), // Match specific userId
          roles: { $in : ["Employer"]},
          isActive: true
        },
      },
      {
        $lookup: {
          from: 'employerprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employerprofile', // Alias for the joined documents
        },
      },
    ])
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async employeeWithProfile(): Promise<User[] | null> {
    return this.userModel.aggregate([
      {
        $match: {
          roles: { $in : ["Employee"]},
          isActive: true
        },
      },    
      {
        $lookup: {
          from: 'employeeprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employeeprofile', // Alias for the joined documents
        },
      },
    ])
  }

  async employeeProfileId(id): Promise<User[] | null> {
    return this.userModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id), // Match specific userId
          roles: { $in : ["Employee"]},
          isActive: true
        },
      },

      {
        $lookup: {
          from: 'employeeprofiles', // Name of the collection to join
          localField: '_id',
          foreignField: 'userId',
          as: 'employeeprofile', // Alias for the joined documents
        },
      },
    ])
  }

  async updateById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { isActive: false }, { new: true }).exec();
  }

  async updateUserById(id: string, updateUserDto: updateSignUpDto): Promise<any | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

}