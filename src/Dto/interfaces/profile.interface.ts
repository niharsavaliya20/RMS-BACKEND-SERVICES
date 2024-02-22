import { Document } from 'mongoose';
export interface employerProfile extends Document {
    company : String;
    contactPerson : String;
    designation : String;
    location : String;
    userId : String
    
}