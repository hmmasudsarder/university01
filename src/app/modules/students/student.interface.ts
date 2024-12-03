import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  // password: string;
  name: TUserName;
  gender: 'male' | 'female' |'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddres?: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  // isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

// export interface StudentModel extends Model<TStudent>{
//   isUserExits(id: string): Promise<TStudent| null>
// }


// for creating instance
export type StudentMethods = {
  isUserExits(id: string): Promise<TStudent | null>;
}

export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>; 
