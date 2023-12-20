import { Document } from 'mongoose';
// import { User } from './user.interface';

export interface employerProfile extends Document {
    company : String;
    contactPerson : String;
    designation : String;
    location : String;
    userId : String
    
}