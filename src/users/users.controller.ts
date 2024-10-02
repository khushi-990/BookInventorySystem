import { Controller, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { RESPONSE_SUCCESS } from "../common/constants/response.constant";
import { ResponseMessage } from "../common/decorators/response.decorator";
import { Public } from "../security/auth/auth.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserTypeEnum } from "./enum/User.enum";

@Controller("users")
@Roles(UserTypeEnum.Admin)
@ApiTags("User Management")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  @ResponseMessage(RESPONSE_SUCCESS.USER_INSERTED)
  @Public()
  @ApiOperation({
    description: `
    This API will be used for creating new user using the admin panel.
    `,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
