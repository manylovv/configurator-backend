import { models } from './entities';

export const getModelsByCarName = (carName: string) => {
  return models.filter((model) => model.carName === carName);
};
