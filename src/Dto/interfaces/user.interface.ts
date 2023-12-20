import { Document } from 'mongoose';
import { employerProfile } from 'src/features/employerProfile/employer.schema';
// import { Profile } from './profile.interface';

export interface UserInterface extends Document {
    name: String,
    email: String,
    password : String,
    loginType : String,
     role :[],
    profile : [employerProfile],
    //  profile: Profile
}