import { OnModuleInit } from '@nestjs/common';
import _ = require('lodash');
import { OptionModel } from './option-general.model';

interface OptionBase {
  name: string;
  value: number;
}

export class OptionGeneralService implements OnModuleInit {
  private defaultOptions: OptionBase[];
  constructor(
    defaultOptions: OptionBase[],
    private repository: typeof OptionModel,
  ) {
    this.defaultOptions = defaultOptions;
  }

  async create(dto) {
    const option = await this.repository.create(dto);
    return option;
  }

  async findAll() {
    const options = await this.repository.findAll();
    return options;
  }
  async findOne(id: number) {
    const type = await this.repository.findByPk(id);
    return type;
  }

  async existEnity(id: number): Promise<boolean> {
    const entity = await this.findOne(id);
    return Boolean(entity?.id);
  }

  async getByName(name) {
    const type = await this.repository.findOne({
      where: { name },
    });
    return type;
  }

  async onModuleInit(): Promise<void> {
    await this.initOptions();
  }

  async initOptions(): Promise<void> {
    const existOptions = await this.findAll();
    const notExistOptions = this.getNotExistTypes(existOptions);
    if (!notExistOptions?.length) return;
    await Promise.all(
      notExistOptions.map((option: OptionBase) => this.create(option)),
    );
  }

  getNotExistTypes(existOptions: OptionBase[]) {
    return _.differenceBy(
      this.defaultOptions,
      existOptions.map(({ value, name }) => ({ value, name })),
      'name',
    );
  }
}
