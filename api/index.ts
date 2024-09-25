import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { handle } from 'hono/vercel';
import { JSONFilePreset } from 'lowdb/node';
import { models } from './entities';
import { getSubModelsByCarName } from './helpers';
import { getImagesStateString, getImageUrl } from './utils';

type Db = {
  db: Record<
    string,
    {
      variant: number[];
      images: string[];
    }
  >;
};

const db = await JSONFilePreset<Db>('db.json', { db: {} });

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.use('*', cors());

app.get('/images', async (c) => {
  const { color, wheel, brake, trim, seat } = c.req.query();

  console.log('images request', {
    color,
    wheel,
    brake,
    trim,
    seat,
  });

  if (!color || !wheel || !brake || !trim || !seat) {
    throw new HTTPException(400, { message: 'All fields are required' });
  }

  const stateString = getImagesStateString({ color, wheel, brake, trim, seat });
  const images = db.data.db[stateString].images;

  if (!images) {
    throw new HTTPException(400, { message: 'All fields are required' });
  }

  return c.json(images);
});

app.get('/models', async (c) => {
  return c.json(models);
});

app.get('/subModels/:modelName', async (c) => {
  const carName = c.req.param('modelName');

  if (!carName || carName.length === 0) {
    return c.json({ error: 'Car name is required' });
  }

  const subModels = getSubModelsByCarName(carName);

  const logoUrl = getImageUrl(`/logos/${carName}.webp`);

  return c.json({ carLogo: logoUrl, subModels });
});

app.get('/subModelDetails/:modelName/:subModelName', async (c) => {
  const wheels = [
    {
      imageUrl: 'https://i.imgur.com/0td8fwC.png',
      name: 'Astreo Design Diamond Cut Matte Dark Myron Forged',
      price: 4500,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/jEI7tXC.png',
      name: 'Astreo Design Diamond Cut Glossy Dark Myron Forged',
      price: 4000,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/iIOpQ6y.png',
      name: 'Pegaso Design Glossy Black Diamond Cut Forged',
      price: 3500,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/iIOpQ6y.png',
      name: 'Pegaso Design Glossy Black Finishing Forged',
      price: 3000,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/iIOpQ6y.png',
      name: 'Crio Design Diamond Cut Glossy Black Alloy',
      price: null,
      diameter: '20"/21"',
    },
  ];

  const colors = [
    {
      name: 'Bianco Astro Metallic',
      price: null,
      type: 'Metallic',
      imageUrl: getImageUrl('/colors/verde_giada.jpg'),
    },
    {
      name: 'Blu Modena',
      price: 4500,
      type: 'Metallic',
      imageUrl: getImageUrl('/colors/grigio_incognito.jpg'),
    },
    {
      name: 'Verde Giada',
      price: null,
      type: 'Fuoriserie',
      imageUrl: getImageUrl('/colors/blu_royale_fuoriserie.jpg'),
    },
    {
      name: 'Nero Assoluto',
      price: null,
      type: 'Metallic',
      imageUrl: getImageUrl('/colors/bianco_astro_metallic.jpg'),
    },
    {
      name: 'Grigio Maratea Matte',
      price: 4500,
      type: 'Fuoriserie',
      imageUrl: getImageUrl('/colors/blu_royale_fuoriserie.jpg'),
    },
  ];

  const colorsTypes = ['Metallic'];

  const packages = [
    {
      id: 1,
      name: 'Comfort Package',
      imageUrl: getImageUrl('/packages/comfort.jpg'),
      price: 1470,
      characteristics: [
        'Ventilated Front Seats',
        'Hands-Free Tailgate with Kick Sensor',
        'Heated Black Leather Sport Steering Wheel',
      ],
    },
    {
      id: 2,
      name: 'Sport Design Package',
      imageUrl: getImageUrl('/packages/sport-design.jpg'),
      price: 1800,
      characteristics: [
        'Lightweight Sport Pedals (Aluminium/Stainless Steel) + Aluminium Footrest',
        'Illuminated Stainless Steel Door Sill Plates with Maserati Script',
        'DLO moulding in glossy black',
      ],
    },
    {
      id: 3,
      name: 'Tech Assistance Package',
      imageUrl: getImageUrl('/packages/tech-assistance.jpg'),
      price: 2600,
      characteristics: ['Frameless digital rearview mirror', 'Head Up Display'],
    },
    {
      id: 4,
      name: 'ADAS Full Package',
      imageUrl: getImageUrl('/packages/ADAS.jpg'),
      price: 8300,
      characteristics: [
        'Adaptive Cruise Control (with Stop&Go)',
        'Active Lane Management (Active Blind Spot & Lane Keeping)',
        'Blind Spot Monitor',
        'Drowsy Driver Detection',
        '360° surround view camera',
        'Traffic Sign Recognition',
        'Active Driving Assist',
        'Traffic Sign Recognition',
        'Intersection Collision Assist',
        'Automated Emergency Braking with Pedestrian Recognition',
      ],
    },
    {
      id: 5,
      name: 'ADAS Base Package',
      imageUrl: getImageUrl('/packages/ADAS.jpg'),
      price: 4500,
      characteristics: [
        'Adaptive Cruise Control (with Stop&Go)',
        'Active Lane Management (Active Blind Spot & Lane Keeping)',
        'Blind Spot Monitor',
        'Drowsy Driver Detection',
        '360° surround view camera',
      ],
    },
  ];

  const seats = [
    {
      id: 'INT-94086164',
      name: 'Cuoio',
      imageUrl: getImageUrl('/seats/cuoio.jpg'),
    },
    {
      id: 'INT-94086165',
      name: 'Cuoio White Top',
      imageUrl: getImageUrl('/seats/cuoio-white-top.jpg'),
    },
    {
      id: 'INT-94086166',
      name: 'Greige',
      imageUrl: getImageUrl('/seats/greige.jpg'),
    },
    {
      id: 'INT-94086167',
      name: 'Greige With Black Floor',
      imageUrl: getImageUrl('/seats/greige-with-black-floor.jpg'),
    },
    {
      id: 'INT-94086168',
      name: 'Greige With Black Top',
      imageUrl: getImageUrl('/seats/greige-with-black-top.jpg'),
    },
    {
      id: 'INT-94086130',
      name: 'Nero',
      imageUrl: getImageUrl('/seats/nero.jpg'),
    },
  ];

  const trim = [
    {
      name: 'Open Pore Radica Wood Trim',
      price: null,
      imageUrl: getImageUrl('/trim/Open-Pore-Radica-Wood-Trim.jpg'),
    },
    {
      name: 'Carbon Macrotwill',
      price: 2500,
      imageUrl: getImageUrl('/trim/Carbon-Macrotwill.jpg'),
    },
    {
      name: 'High Gloss Copper Yarn Carbon Fiber Trim',
      price: 3500,
      imageUrl: getImageUrl(
        '/trim/High-Gloss-Copper-Yarn-Carbon-Fiber-Trim.jpg'
      ),
    },
  ];

  const optionsTypes = ['Interior Equipment', 'Performance & Safety'];

  const options = [
    {
      id: 12,
      name: 'Sonus faber high premium sound system with 19 speakers',
      price: 4000,
      imageUrl: getImageUrl('/options/sound-system.jpg'),
      description: null,
      type: 'Interior Equipment',
    },
    {
      id: 13,
      name: 'Alcantara Headliner and Pillars',
      price: 1900,
      imageUrl: getImageUrl('/options/alcantara-headliner.jpg'),
      description:
        'Alcantara textile covers the headliner, upper pillars, dome light surround and front sun visors.',
      type: 'Interior Equipment',
    },
    {
      id: 14,
      name: 'Alarm system',
      price: 2000,
      imageUrl: getImageUrl('/options/alarm-system.jpg'),
      description:
        'The vehicle security alarm monitors the vehicle doors and trunk lid for unauthorized entry and the START/STOP button for unauthorized operations. The system also includes a dual function anti-intrusion sensor and vehicle anti-lift sensor. The anti-intrusion sensor monitors the vehicle interior for motion. The vehicle anti-lift sensor monitors the vehicle for any lifting or tilting actions (tow away, tire removal, ferry transport, etc).',
      type: 'Performance & Safety',
    },
  ];

  const brakeCalipers = [
    {
      id: 1,
      name: 'Gloss Black Painted Brake Calipers',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Gloss Black Painted Brake Calipers.jpg',
      price: 1000,
    },
    {
      id: 2,
      name: 'Gloss Red Painted Brake Calipers',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Gloss Red Painted Brake Calipers.jpg',
      price: 1000,
    },
    {
      id: 3,
      name: 'Gloss Yellow Painted Brake Calipers',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Gloss Yellow Painted Brake Calipers.jpg',
      price: 1000,
    },
    {
      id: 4,
      name: 'Non-Painted Black brake calipers',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Anodized Red Calipers.jpg',
      price: null,
    },
    {
      id: 5,
      name: 'Anodized Red Calipers',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Brake Calipers Painted In Blue.jpg',
      price: 2000,
    },
    {
      id: 6,
      name: 'Brake Calipers Painted In Blue',
      imageUrl:
        '/configurator/GranTurismo/Brake Calipers/Brake Calipers Painted In Blue.jpg',
      price: 1000,
    },
  ];

  return c.json({
    brakeCalipers,
    trim,
    seats,
    wheels,
    colors,
    colorsTypes,
    packages,
    options,
    optionsTypes,
  });
});

export default handle(app);
