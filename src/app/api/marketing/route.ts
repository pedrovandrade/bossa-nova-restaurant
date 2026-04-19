import { NextRequest } from 'next/server';
import {
  getMarketingData,
  createMarketingData,
  updateMarketingData,
} from './_repository';
import { requireOwner } from '../_util';

const GET = async (request: NextRequest) => {
  const field = request?.nextUrl?.searchParams.get('field');
  const filter = field ? {field} : undefined;

  const response = await getMarketingData(filter);

  if (response) {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Failed to retrieve marketing data' }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
};

const POST = requireOwner(async (request) => {
  try {
    const body = await request.json();
    const created = await createMarketingData(body);
    if (!created) {
      return new Response(JSON.stringify({ error: 'Marketing document already exists' }), { status: 409, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify(created), { status: 201, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to create marketing data. Error: ${err}` }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
});

const PUT = requireOwner(async (request) => {
  try {
    const patch = await request.json();
    const updated = await updateMarketingData(patch);
    if (!updated) {
      return new Response(JSON.stringify({ error: 'No marketing document to update' }), { status: 404, headers: { 'content-type': 'application/json' } });
    }
    return new Response(JSON.stringify(updated), { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: `Failed to update marketing data. Error: ${err}` }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
});

export { GET, POST, PUT };