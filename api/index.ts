import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getImageUrl = (imageName: string) => {
  return `${process.env.IMAGE_PREFIX_URL}${imageName}`;
};

export const config = {
  runtime: 'edge',
};

const app = new Hono().basePath('/api');

app.use('*', cors());

app.get('/wheels', async (c) => {
  const wheels = [
    {
      imageUrl: 'https://i.imgur.com/0td8fwC.png',
      name: 'Astreo Design Diamond Cut Matte Dark Myron Forged',
      price: 3500,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/jEI7tXC.png',
      name: 'Crio Design Diamond Cut Glossy Black Alloy',
      price: null,
      diameter: '20"/21"',
    },
    {
      imageUrl: 'https://i.imgur.com/iIOpQ6y.png',
      name: 'Astreo Design Diamond Cut Glossy Dark Myron Forged',
      price: 4000,
      diameter: '20"/21"',
    },
  ];

  return c.json({ wheels: wheels });
});

app.get('/colors', async (c) => {
  const colors = [
    {
      name: 'Verde Giada',
      price: null,
      type: 'Metallic',
      imageUrl: getImageUrl('/colors/verde_giada.jpg'),
    },
    {
      name: 'Grigio Incognito',
      price: null,
      type: 'Non-Metallic',
      imageUrl: getImageUrl('/colors/grigio_incognito.jpg'),
    },
    {
      name: 'Blu Modena',
      price: 4500,
      type: 'Metallic',
      imageUrl: getImageUrl('/colors/blu_modena.jpg'),
    },
    {
      name: 'Blu Royale - Fuoriserie',
      price: null,
      type: 'Fuoriserie',
      imageUrl: getImageUrl('/colors/blu_royale_fuoriserie.jpg'),
    },
  ];

  return c.json({ colors: colors });
});

export default handle(app);
