import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specifications = this.repository.findOne({
      where: { name },
    });
    return specifications;
  }
}

export { SpecificationsRepository };
