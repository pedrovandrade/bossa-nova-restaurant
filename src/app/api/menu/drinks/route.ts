import { updateDrinkPages } from './_repository';
import { requireOwner } from '@/app/api/_util';
import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';

const PUT = requireOwner(async (request) => {
  try {
    const patch = (await request.json()) as DrinkMenuPageData[];
    const updated = await updateDrinkPages(patch);
    console.log('Drink pages update endpoint called! updated:', updated);

    if (!updated) {
      return new Response(JSON.stringify({ error: 'No drink pages document to update' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to update the drink pages. Error: ${err}` }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
});

export { PUT };