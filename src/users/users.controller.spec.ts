import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { getModelToken } from "@nestjs/mongoose";
import { Users } from "./schemas/user.schema";
import { UserModel } from "../common/test/schema.model";
import { LoggerService } from "../common/logger/logger.service";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "./dto/create-user.dto";
import { EncryptPasswordService } from "src/services/encrypt.service";

describe("UsersController", () => {
  let controller: UsersController, service: UsersService, userModel: UserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        LoggerService,
        ConfigService,
        EncryptPasswordService,
        {
          provide: getModelToken(Users.name),
          useClass: UserModel,
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: "65b34473ab4f93d0ccb9d04f",
              firstName: "Jest",
              lastName: "Test",
              gender: "male",
              email: "test@yopmail.com",
              password: "2023-02-02",
              isActive: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    userModel = module.get<UserModel>(getModelToken(Users.name));
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(userModel).toBeDefined();
  });

  it("should be check user create api", async () => {
    const body: CreateUserDto = {
      firstName: "Jest",
      lastName: "Test",
      gender: "male",
      email: "test@yopmail.com",
      password: "2023-02-02",
      isActive: true,
    };

    //Compare the actual response with the expected response
    await expect(controller.create(body)).resolves.toEqual({
      _id: "65b34473ab4f93d0ccb9d04f",
      firstName: "Jest",
      lastName: "Test",
      gender: "male",
      email: "test@yopmail.com",
      password: "2023-02-02",
      isActive: true,
    });
  });
});
