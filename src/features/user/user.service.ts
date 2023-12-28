import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
// import { User } from "./user.schema";
import { updateSignUpDto } from "src/Dto/updateSignUp.dto";
import { User } from "./user.schema";
import { UserInterface } from "src/Dto/interfaces/user.interface";
// import { Userr } from "src/Dto/interfaces/user.interface";

@Injectable()

export class UserService {

  constructor(@InjectModel('user')
  private userModel: Model<any>) { }

  async getAllSignUp(): Promise<any> {
    return this.userModel.find();
    
  }

  async findUserById(id: string): Promise<any | null> {
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

  async usersWithEmployerProfile(): Promise<User[] | null> {
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
      {
        $addFields: {
          profile: { $arrayElemAt: ['$employerprofile', 0] }  //data comes in object
        }
      },
      {
        $project: {
          employerprofile: 0 // Remove the profileData field if not needed
        }
      }
    ])
  }

  async userEmployerProfileId(id): Promise<any| null> {
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
            {
              $addFields: {
                profile: { $arrayElemAt: ['$employerprofile', 0] }
              }
            },
            {
              $project: {
                employerprofile: 0 // Remove the profileData field if not needed
              }
            }
          ])
        }

  async findUserByEmail(email: string): Promise<any | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async usersWithEmployeeWithProfile(): Promise<User[] | null> {
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
      {
        $addFields: {
          profile: { $arrayElemAt: ['$employeeprofile', 0] }
        }
      },
      {
        $project: {
          employeeprofile: 0 // Remove the profileData field if not needed
        }
      }
    ])
  }

  async userEmployeeProfileId(id): Promise<any | null> {
    return this.userModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id), // Match specific userId
          // roles: { $in : ["Employee"]},
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
      {
        $addFields: {
          profile: { $arrayElemAt: ['$employeeprofile', 0] }
        }
      },
      {
        $project: {
          employeeprofile: 0 // Remove the profileData field if not needed
        }
      }
    ])
  }

  async deActivateUserById(id: string): Promise<any | null> {
    const currentDate = new Date();
    return this.userModel.findByIdAndUpdate(id, { isActive: false ,deletedAt : currentDate},{ new: true }).exec();
  }

  async updateUserById(id: string, updateUserDto: updateSignUpDto): Promise<any | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async updateUserProfileById(id: string, updateUserDto: UserInterface): Promise<any | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

}