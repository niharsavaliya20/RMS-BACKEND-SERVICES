import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './features/user/user.module';
import { MongoDatabaseProviderModule } from './providers/database/mongo/provider.module';
import { MongoConfigModule } from './mongo/config.module';
import { EmployeeProfileModule } from './features/employeeProfile/employeeProfile.module';
import { EmployerProfileModule } from './features/employerProfile/employer.module';
import { JobPostingModule } from './features/jobPosting/jobPosting.module';
import { AccountModule } from './features/account/account.module';
import { UserJobPostingModule } from './features/user_JobPosting/user_JobPosting.module';
import { CompanyProfileModule } from './features/companyProfile/companyProfile.module';
import { Employer_StatusModule } from './features/employer_status/employer_status.module';
import { Employee_StatusModule } from './features/employee_status/employee_status.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    EmployeeProfileModule,
    EmployerProfileModule,
    JobPostingModule,
    UserJobPostingModule,
    AccountModule,
    CompanyProfileModule,
    Employer_StatusModule,
    Employee_StatusModule,
    ConfigModule.forRoot(),
    // MongoConfigModule,
    // MongoDatabaseProviderModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
