import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/**
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de error de
 * [x] - Acessar o repositorio
 */

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name} already exists`);
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
