import { Injectable } from "@nestjs/common";
import { Account } from "./account.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AccountDto } from "src/Dto/account.dto";
import { Types } from "mongoose";


@Injectable()
export class AccountService{

    constructor(@InjectModel('account')
    private accountModel: Model<Account>){}

    async createAccount( accountDto: AccountDto): Promise<any>  {
        const { email, status}= accountDto;

        const account = await this.accountModel.create({
            email,
            status,
            isActive: true,
            deletedAt:null
          });
        return account;
      }

    async findAccountById(id: string): Promise<any | null> {
      return (await this.accountModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(id), // Match specific userId
            isActive: true
          },
        },
          {
            $lookup: {
              from: 'users', // Name of the collection to join
              localField: '_id',
              foreignField: 'accountId',
              as: 'user', // Alias for the joined documents
            },
          },
        ])
      )
    }

    async getAllJobPost():  Promise<any>{
      return await this.accountModel.aggregate([
        {
          $match: {
            isActive: true
          },
        },
          {
            $lookup: {
              from: 'users', 
              localField: '_id',
              foreignField: 'accountId',
              as: 'user', 
            },
          },
          {
            $addFields: {
              users: { $arrayElemAt: ['$user', 0] }  //data comes in object
            }
          },
          {
            $project: {
              user: 0 // Remove the profileData field if not needed
            }
          }
        ])
      
   }

      async deActivateAccountById(id: string): Promise<any | null> {
        const currentDate = new Date();
        return this.accountModel.findByIdAndUpdate(id, { isActive: false ,deletedAt : currentDate},{ new: true }).exec();
      }
      
      async updateAccountById(id: string, accountDto: AccountDto): Promise<any | null> {
        return this.accountModel.findByIdAndUpdate(id, accountDto, { new: true }).exec();
      } 

}
