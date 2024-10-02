import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Books, BooksSchema } from './schemas/book.schema';
import { CommonService } from 'src/common/services/common.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Books.name, schema: BooksSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService,CommonService]
})
export class BookModule {}
