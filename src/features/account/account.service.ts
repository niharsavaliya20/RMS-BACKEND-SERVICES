import { Injectable } from "@nestjs/common";
import { Account } from "./account.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AccountDto } from "src/Dto/account.dto";


@Injectable()
export class AccountService{

    constructor(@InjectModel('account')
    private accountModel: Model<Account>){}

    async createAccount( accountDto: AccountDto): Promise<any>  {
        const { email, status,jobPostingId}= accountDto;

        const account = await this.accountModel.create({
            email,
            status,
            jobPostingId,
            isActive: true,
            deletedAt:null
          });
        return account;
      }

    async findAccountById(id: string): Promise<any | null> {
        return this.accountModel.findById(id).exec();
      }

      async deActivateAccountById(id: string): Promise<any | null> {
        const currentDate = new Date();
        return this.accountModel.findByIdAndUpdate(id, { isActive: false ,deletedAt : currentDate},{ new: true }).exec();
      }
      
      async updateAccountById(id: string, accountDto: AccountDto): Promise<any | null> {
        return this.accountModel.findByIdAndUpdate(id, accountDto, { new: true }).exec();
      } 

}
