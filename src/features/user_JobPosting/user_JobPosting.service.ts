import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserJobPosting } from "./user_JobPosting.schema";
import { UserJobPostingDto } from "src/Dto/user_JobPosting.Dto";
import { Status } from "src/constants/status";
const { ObjectId } = require('mongodb');

@Injectable()
export class UserJobPostingService {

  constructor(@InjectModel('user_JobPosting')
  private UserjobPostingModel: Model<UserJobPosting>) { }

  async appliedJobPost(userJobPostingDto: UserJobPostingDto, Id: string): Promise<any> {

    const { userId, jobPostingId, applicantStatus, accountId, status, applied } = userJobPostingDto;

    const post = await this.UserjobPostingModel.create({
      userId: Id,
      jobPostingId,
      accountId,
      applicantStatus,
      status: Status.Active,
      applied: true,
    });
    return post;
  }

  async findJobPostingId(userId: string): Promise<any | null> {

    const data = await this.UserjobPostingModel.aggregate([
      {
        $match: { userId: userId }
      },
      {
        $project: { jobPostingId: 1, _id: 0 }
      }
    ])

    let list: string[] = [];
    data.map((res) => {
      let objectId = res.jobPostingId
      list.push(objectId.toString())
      console.log(objectId.toString());
    })
    return list;
  }

  async findAllApplicants(Id, applicantStatus, JobId): Promise<any | null> {

    const jobPostingId = new ObjectId(JobId);

    const appliedStatus = applicantStatus == 6 ?
      {
        applicantStatus: { $in: [1, 2, 3, 4, 5, 6] }
      } :
      {
        applicantStatus: Number(applicantStatus)
      };
    return await this.UserjobPostingModel.aggregate([
      {
        $match: {
          jobPostingId: jobPostingId,
        }
      },

      {
        $facet: {
          count: [

            { $count: "totalcount" }
          ],

          rejectedApplicantCount: [
            {
              $match: {
                applicantStatus: 2
              }
            },
            { $count: "rejectedApplicantCount" }
          ],

          approveApplicantCount: [
            {
              $match: {
                applicantStatus: 1
              }
            },
            { $count: "approveApplicantCount" }
          ],

          allApplicants: [
            {
              $match: appliedStatus
            },
            {
              $lookup: {
                from: 'employeeprofiles', // Name of the collection to join
                localField: 'userId',
                foreignField: 'userId',
                as: 'appliedUserProfile', // Alias for the joined documents
              },
            },
            {
              $lookup: {
                from: 'users', // Name of the collection to join
                localField: 'userId',
                foreignField: '_id',
                as: 'appliedUserDetail', // Alias for the joined documents
              },
            },
          ],

        },

      }

    ])
  }

  async updateAppliedJobPostStatus(id: string, statusId): Promise<any | null> {
    console.log("<,,,,,,,,,,,,,approve", statusId)
    return this.UserjobPostingModel.findByIdAndUpdate(id, { applicantStatus: statusId }, { new: true }).exec();
  }


  async applicantDetail(id): Promise<any | null> {

    return await this.UserjobPostingModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'employeeprofiles', // Name of the collection to join
          localField: 'userId',
          foreignField: 'userId',
          as: 'appliedUserProfile', // Alias for the joined documents
        },
      },
      {
        $lookup: {
          from: 'users', // Name of the collection to join
          localField: 'userId',
          foreignField: '_id',
          as: 'appliedUserDetail', // Alias for the joined documents
        },
      },
    ],
    )
  }

}
