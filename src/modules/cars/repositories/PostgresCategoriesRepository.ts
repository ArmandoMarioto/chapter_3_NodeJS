import { Category } from "../entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Promise<Category> {
    console.log("name");
    return null;
  }
  list(): Promise<Category[]> {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): Promise<void> {
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };
