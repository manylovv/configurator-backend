import { models } from './entities';

export const getModelsByCarId = (carId: number) => {
  return models.filter((model) => model.carId === carId);
};
