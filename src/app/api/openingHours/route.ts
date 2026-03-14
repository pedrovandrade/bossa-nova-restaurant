import { NextRequest } from 'next/server';
import { createOpeningHours, getOpeningHours, updateOpeningHours } from './_repository';
import { OpeningHoursData } from '@/types/OpeningHoursData';

const GET = async () => {
  const response = await getOpeningHours();

  if (response) {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Failed to retrieve opening hours' }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
};

const POST = async (request: NextRequest) => {
  try {
    const payload = (await request.json()) as OpeningHoursData;
    const created = await createOpeningHours(payload);
    if (!created) {
      return new Response(JSON.stringify({ error: 'Opening hours document already exists' }), {
        status: 409,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to create opening hours. Error: ${err}` }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};

const PUT = async (request: NextRequest) => {
  try {
    const patch = (await request.json()) as OpeningHoursData;
    const updated = await updateOpeningHours(patch);
    if (!updated) {
      return new Response(JSON.stringify({ error: 'No opening hours document to update' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to update opening hours. Error: ${err}` }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};

export { GET, POST, PUT };