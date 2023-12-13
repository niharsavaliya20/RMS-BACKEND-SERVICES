import { IsArray, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class EmployeeProfileDto {

    designation : String;
    experience : String;
    address : String;
    salary : String;
    userId : String

}