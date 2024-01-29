import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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

  // async findJobPosting(jobPostingId: string, userId: string): Promise<any | null> {
  //   const jobPostingObjectId = new ObjectId(jobPostingId);
  //   return this.UserjobPostingModel.aggregate([
  //     {
  //       $match: {
  //         $and: [
  //           { jobPostingId: jobPostingObjectId }, // Ensures jobPostingId is not empty
  //           { userId: userId }         // Ensures userId is not empty
  //         ]
  //       }
  //     }
  //   ])
  // }

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

  async findAllApplicants(Id): Promise<any | null> {
    const accountId = new ObjectId(Id);
    return await this.UserjobPostingModel.aggregate([
      {
        $match: {
          accountId: accountId,

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
                applicantStatus: "rejected"
              }
            },
            { $count: "rejectedApplicantCount" }
          ],

          approveApplicantCount: [
            {
              $match: {
                applicantStatus: "approved"
              }
            },
            { $count: "approveApplicantCount" }
          ],

          allApplicants: [

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

          approvedApplicants: [
            {
              $match: {
                applicantStatus: "approved"
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

          rejectedApplicants: [
            {
              $match: {
                applicantStatus: "rejected"
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
          ]

        },

      }

    ])
  }

  async getApprovedApplicants(Id): Promise<any | null> {
    const accountId = new ObjectId(Id);
    return await this.UserjobPostingModel.aggregate([
      {
        $match: {
          accountId: accountId,

        }
      },

      {
        $facet: {

          approveApplicantCount: [
            {
              $match: {
                applicantStatus: "approved"
              }
            },
            { $count: "approveApplicantCount" }
          ],

          approvedApplicants: [
            {
              $match: {
                applicantStatus: "approved"
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

        },

      }

    ])
  }

  async getRejectedApplicants(Id): Promise<any | null> {
    const accountId = new ObjectId(Id);
    return await this.UserjobPostingModel.aggregate([
      {
        $match: {
          accountId: accountId,

        }
      },

      {
        $facet: {
          rejectedApplicantCount: [
            {
              $match: {
                applicantStatus: "rejected"
              }
            },
            { $count: "rejectedApplicantCount" }
          ],
          rejectedApplicants: [
            {
              $match: {
                applicantStatus: "rejected"
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
          ]
        },

      }

    ])
  }


  async updateRejectAppliedJobPostStatus(id: string,): Promise<any | null> {
    const Rejected = "rejected";
    return this.UserjobPostingModel.findByIdAndUpdate(id, { applicantStatus: Rejected }, { new: true }).exec();
  }

  async updateAppliedJobPostStatus(id: string,): Promise<any | null> {
    const Approve = "approved";
    return this.UserjobPostingModel.findByIdAndUpdate(id, { applicantStatus: Approve }, { new: true }).exec();
  }

}
