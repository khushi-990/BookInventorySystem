import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Books, BooksDocument } from "./schemas/book.schema";
import { Model } from "mongoose";
import { CommonService } from "src/common/services/common.service";
import { CreateBookDto, UpdateBookDto } from "./dto/book.dto";
import { DetailsBasedOnIdDto, PaginationDto } from "src/common/dto/common.dto";
import { RESPONSE_ERROR } from "src/common/constants/response.constant";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<BooksDocument>,
    private readonly commonService: CommonService,
  ) {}

  /**
   * This function use for craete Book
   * @param createBookDto
   * @returns
   */

  async create(createBookDto: CreateBookDto) {
    return await this.bookModel.create(createBookDto);
  }

  /**
   * This function use for Fetch list of Book
   * @param PaginationDto
   * @returns
   */
  async listBooks(body: PaginationDto) {
    const limit = body.limit ? Number(body.limit) : 10;
    const page = body.page ? Number(body.page) : 1;
    const skip = (page - 1) * limit;

    const aggregateQuery = [];

    aggregateQuery.push({
      $project: {
        title: "$title",
        author: "$author",
        price: "$price",
        level: "$level",
        publishedDate: "$publishedDate",
        isStock: "$isStock",
        createdAt: "$createdAt",
        updatedAt: "$updatedAt",
      },
    });

    if (body.search) {
      const searchText = body.search;
      const regex = new RegExp(searchText, "i"); // Use the search term directly in the regex
      aggregateQuery.push({
        $match: {
          $or: [
            {
              title: {
                $regex: regex,
              },
            },
          ],
        },
      });
    }

    const sortDir = body.sort_order && body.sort_order.includes("asc") ? 1 : -1;

    /// sorting
    aggregateQuery.push({
      $sort: { [body.sort_by ? `${body.sort_by}` : "createdAt"]: sortDir },
    });

    aggregateQuery.push({
      $facet: {
        total_records: [{ $count: "count" }],
        topicList: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const BookList = await this.bookModel.aggregate(aggregateQuery).exec();
    if (BookList) {
      BookList[0].total_records =
        BookList[0].total_records.length > 0
          ? BookList[0].total_records[0].count
          : 0;
    }
    return BookList;
  }

  /**
   * This function use for Delete Book
   * @param DetailsBasedOnIdDto
   */

  async deleteBook(body: DetailsBasedOnIdDto) {
    return await this.commonService.deleteById(
      this.bookModel,
      body._id,
      RESPONSE_ERROR.BOOK_DELETED,
    );
  }

  /**
   * This function is use for Get Book
   * @param _id
   * @returns
   */

  async findOne(_id: string) {
    return await this.commonService.getDetails(
      this.bookModel,
      _id,
      RESPONSE_ERROR.BOOK_NOT_FOUND,
    );
  }

  /**
   * This Function is used for Update Book
   * @param bookId
   * @param updateBookDto
   * @returns
   */

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    await this.bookModel.findOneAndUpdate({ _id: bookId }, updateBookDto);
    return {};
  }
}
