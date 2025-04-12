import type { APIRoute } from 'astro';
import fonts from '../../collections/fonts.json'; // adjust path if needed

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(fonts), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
