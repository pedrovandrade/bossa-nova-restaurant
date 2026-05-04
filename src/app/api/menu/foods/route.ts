import { FoodMenuPageData } from '@/types/FoodMenuPageData';
import { updateFoodPages } from './_repository';
import { requireOwner } from '@/app/api/_util';

const PUT = requireOwner(async (request) => {
  try {
    const patch = (await request.json()) as FoodMenuPageData[];
    const updated = await updateFoodPages(patch);
    console.log('Food pages update endpoint called! updated:', updated);

    if (!updated) {
      return new Response(JSON.stringify({ error: 'No food pages document to update' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to update the food pages. Error: ${err}` }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
});

export { PUT };