export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      try {
        const { name, email, message } = await request.json();
        
        // Insert into D1 database
        const { success } = await env.DB.prepare(
          'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
        ).bind(name, email, message).run();

        if (success) {
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response('Method not allowed', { status: 405 });
  }
};
