import type { APIRoute } from 'astro';
import fonts from '../../collections/fonts.json';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(fonts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
