import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserTypeEnum } from 'src/users/enum/User.enum';
import { BookService } from './book.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_SUCCESS } from 'src/common/constants/response.constant';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { DetailsBasedOnIdDto, PaginationDto } from 'src/common/dto/common.dto';

@Controller('book')
@Roles(UserTypeEnum.Admin)
@ApiTags("Book Management")
@ApiBearerAuth()

export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post("create")
    @ResponseMessage(RESPONSE_SUCCESS.BOOK_INSERTED)
    @ApiOperation({
        description: `
    This API will be used for creating new Book using the admin panel.`,
    })
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Post("/list")
    @ResponseMessage(RESPONSE_SUCCESS.BOOK_LISTED)
    @ApiOperation({ summary: 'Admin can review all Books' })
    findAll(@Body() body: PaginationDto) {
        return this.bookService.listBooks(body);
    }

    @Post("/deleteBook")
    @ResponseMessage(RESPONSE_SUCCESS.BOOK_DELETED)
    @ApiOperation({ summary: 'Admin can review all Books' })
    deleteBook(@Body() body: DetailsBasedOnIdDto) {
        return this.bookService.deleteBook(body);
    }


    @Post("/getDetails")
    @ResponseMessage(RESPONSE_SUCCESS.BOOK_LISTED)
    @ApiOperation({ summary: 'Admin can review based on Id Book' })
    getDetailsProduct(@Body() body: DetailsBasedOnIdDto) {
        return this.bookService.findOne(body._id);
    }

    @Patch("update/:id")
    @ResponseMessage(RESPONSE_SUCCESS.BOOK_UPDATED)
    update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }

}
