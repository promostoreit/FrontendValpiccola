import {
  SECRET_TELEGRAM_BOT_TOKEN,
  SECRET_TELEGRAM_CHAT_ID
} from "$env/static/private";

export async function POST({ request }) {
  const requestData = await request.json();
  const text = requestData.text;

  const url = `https://api.telegram.org/bot${SECRET_TELEGRAM_BOT_TOKEN}/sendMessage`;
  const chatID = parseInt(SECRET_TELEGRAM_CHAT_ID, 10);
  const message = {
    chat_id: chatID,
    text: text
  };

  try {
    const response = await fetch(
      url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      }
    );
    if (response.status !== 200) {
      console.error('Error sending message:', response.status);
      return new Response(null, { status: response.status });
    }
    return new Response(null, { status: 200 });
  } catch (err) {
    console.error('Error:', err);
    return new Response(null, { status: 500 });
  }
}
