import { getMenu } from './_repository';

const GET = async () => {
  const response = await getMenu();

  if (response) {
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ error: 'Failed to retrieve menu data' }), {
    status: 500,
    headers: { 'content-type': 'application/json' },
  });
};

export { GET };