import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const salt: number = 16;

export const hashPassword = async (plainText: string): Promise<string> => await bcrypt.hash(plainText, salt);

export const comparePassword = async (passwordInPlainText: string, hashedPassword: string): Promise<void> => {
  const isPasswordMatching = await bcrypt.compare(passwordInPlainText, hashedPassword);

  if (!isPasswordMatching) {
    throw new HttpException('Wrong Credentials provided', HttpStatus.BAD_REQUEST);
  }
};
