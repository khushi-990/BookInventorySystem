import { Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { TypeExceptions } from "../helpers/exceptions";

@Injectable()
export class CommonService {
  constructor() {}

  /**
   * The function `getDetails` retrieves details of a specific model by ID and throws a custom exception
   * if the details are not found.
   * @param model - The `model` parameter is the Mongoose model that you want to query for details.
   * @param {string} id - The `id` parameter in the `getDetails` function is a string that represents
   */
  async getDetails<T>(
    model: Model<T>,
    id: string,
    notFoundMessage: string,
  ): Promise<T> {
    const details = await model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });

    if (!details) {
      throw TypeExceptions.NotFoundCommonFunction(notFoundMessage); // Use the dynamic message
    }
    return details;
  }

  /**
   * This TypeScript function deletes a document by its ID from a given model and throws a custom error
   * message if the document is not found.
   * @param model - The `model` parameter is the Mongoose model representing a specific collection in
   * the database. It is used to perform operations like finding and deleting documents in that
   * collection.
   * @param {string} id - The `id` parameter in the `deleteById` function represents the unique
   * identifier of the document you want to delete from the database.
   * @param {string} notFoundMessage - The `notFoundMessage` parameter is a string that represents a
   * custom message to be used when the document with the specified ID is not found in the database
   * during the deletion operation. This message is thrown as an error if the document is not found.
   * @returns The `deleteById` function returns a Promise that resolves to the deleted document of type
   * `T`.
   */
  async deleteById<T>(
    model: Model<T>,
    id: string,
    notFoundMessage: string,
  ): Promise<T> {
    const deletedDocument = await model.findOneAndDelete({ _id: id });

    if (!deletedDocument) {
      throw TypeExceptions.NotFoundCommonFunction(notFoundMessage); // Use the dynamic message
    }

    return deletedDocument;
  }
}
