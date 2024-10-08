import { getImageUrl } from './utils';

export const models = [
  {
    id: 'zKa_6r5RbnVZJPFh9Uf5B',
    name: 'GranTurismo',
    imageUrl: getImageUrl('/cars/GranTurismo.webp'),
    icon: getImageUrl('/icons/GranTurismo.png'),
  },
  {
    id: 'dhu5uq90KmNy-1Eu36Qb6',
    name: 'GranCabrio',
    imageUrl: getImageUrl('/cars/GranCabrio.webp'),
    icon: getImageUrl('/icons/GranCabrio.webp'),
  },
];

export const subModels = [
  {
    modelName: 'GranTurismo',
    carId: 'zKa_6r5RbnVZJPFh9Uf5B',
    id: 'nFIFzX_l5w1-O6pYtwmi7',
    name: 'Modena',
    startingPrice: 158000,
    year: 2024,
    imageUrl: getImageUrl('/models/GranTurismo/Modena.webp'),
    engineLayout: 'V6',
    displacement: '3.0L',
    acceleration: '3.7 sec',
    maxSpeed: '188 mph',
    maxPower: '483 HP',
    traction: 'AWD',
  },
  {
    modelName: 'GranTurismo',
    carId: 'zKa_6r5RbnVZJPFh9Uf5B',
    id: 'PPiom90Y_FKOjYFxFS8ZI',
    name: 'Trofeo',
    startingPrice: 190000,
    year: 2024,
    imageUrl: getImageUrl('/models/GranTurismo/Trofeo.webp'),
    engineLayout: 'V6',
    displacement: '3.0L',
    acceleration: '3.3 sec',
    maxSpeed: '199 mph',
    maxPower: '542 HP',
    traction: 'AWD',
  },
  {
    modelName: 'GranTurismo',
    carId: 'zKa_6r5RbnVZJPFh9Uf5B',
    id: 'iCRQMDXKjGJ3Uw1HtzAFt',
    name: 'Folgore',
    startingPrice: 192000,
    year: 2024,
    imageUrl: getImageUrl('/models/GranTurismo/Folgore.webp'),
    engineLayout: 'EV',
    displacement: null,
    acceleration: '2.6 sec',
    maxSpeed: '202 mph',
    maxPower: '751 HP',
    traction: 'AWD',
  },
];
