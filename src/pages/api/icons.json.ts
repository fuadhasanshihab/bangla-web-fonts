import type { APIRoute } from 'astro';
import icons from '../../collections/icons.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(icons), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};