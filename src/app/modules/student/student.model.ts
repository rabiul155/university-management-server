import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  GuardianType,
  LocalGuardianType,
  StudentType,
  StudentMethodsType,
  StudentModelType,
  UserNameType,
} from './student.interface';

const userNameSchema = new Schema<UserNameType>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value: string) {
        const check =
          value ===
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return check;
      },
      message: '{VALUE} is not well formatted',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return validator.isAlpha(value);
      },
      message: '{VALUE} does not accept this type of value',
    },
  },
});

const guardianSchema = new Schema<GuardianType>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardianType>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<
  StudentType,
  StudentModelType,
  StudentMethodsType
>({
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: '{VALUES} is not correct gender type',
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return validator.isEmail(value);
      },
      message: 'Email is not valid',
    },
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  results: {
    type: [Number],
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

studentSchema.methods.isUserExist = async function (email: string) {
  const user = await StudentModel.findOne({ email });
  return user ? true : false;
};

export const StudentModel = model<StudentType, StudentModelType>(
  'student',
  studentSchema,
);