import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ProfileDto {

    company : String;
    experience : String;
    designation : String;
    userId : String

}