import { subModels } from './entities';

export const getSubModelsByCarName = (carName: string) => {
  return subModels.filter((model) => model.modelName === carName);
};
