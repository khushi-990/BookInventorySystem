import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "../../common/dto/common.dto";
import { LoggerService } from "../../common/logger/logger.service";
import { UsersService } from "../../users/users.service";
import { JwtPayload } from "../../common//interfaces/jwt.interface";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private myLogger: LoggerService,
  ) {
    this.myLogger.setContext(AuthService.name);
  }

  async login(params: LoginDto) {
    const user = await this.userService.login(params);
    const accessToken = await this.generateAuthToken(user);
    user["accessToken"] = accessToken;
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
    };
  }

  async generateAuthToken(user) {
    const payload: JwtPayload = {
      _id: user._id,
      email: user.email,
      userType: user.userType
    };
    return this.jwtService.sign(payload);
  }

  async signUp(params: CreateUserDto) {
    console.log("🚀 ~ AuthService ~ signUp ~ params:", params)
    const user = await this.userService.create(params);
    const accessToken = await this.generateAuthToken(user);
    user["accessToken"] = accessToken;
    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: accessToken,
    };
  }
}
