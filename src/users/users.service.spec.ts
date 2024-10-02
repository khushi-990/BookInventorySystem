import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getModelToken } from "@nestjs/mongoose";
import { Users } from "./schemas/user.schema";
import { UserModel } from "../common/test/schema.model";
import { LoggerService } from "../common/logger/logger.service";
import { ConfigService } from "@nestjs/config";
import { HttpStatus } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { EncryptPasswordService } from "src/services/encrypt.service";

describe("UsersService", () => {
  let service: UsersService, userModel: UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        LoggerService,
        ConfigService,
        EncryptPasswordService,
        {
          provide: getModelToken(Users.name),
          useClass: UserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<UserModel>(getModelToken(Users.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe("create user api", () => {
    const body: CreateUserDto = {
      firstName: "Admin",
      lastName: "test",
      email: "test@yopmail.com",
      gender: "male",
      password: "123456",
      isActive: true,
    };

    it("should check create user api", async () => {
      // Mock the addModel.create method to return a ad entity
      jest.spyOn(userModel, "getUserByEmail").mockResolvedValue(null as never);
      jest.spyOn(userModel, "create").mockResolvedValue(body as never);

      const result = await service.create(body);
      // Expectations
      expect(userModel.create).toHaveBeenCalled();
      expect(result).toEqual(body);
    });

    it("should throw email already exist error", async () => {
      try {
        // Mock the addModel.create method to return a ad entity
        jest
          .spyOn(userModel, "getUserByEmail")
          .mockResolvedValue(body as never);
        await service.create(body);
        // Expectations
        expect(userModel.getUserByEmail).toHaveBeenCalled();
      } catch (error) {
        expect(error.response).toEqual({
          statusCode: HttpStatus.CONFLICT,
          message: "User already exist with this email",
          error: "Already Exists",
        });
      }
    });
  });
});
