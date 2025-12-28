export async function sendTelegramMessage(text) {
  try {
    const response = await fetch(
      '/api/telegram', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }
      )
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  } catch (err) {
    console.error('Error in sending message:', err);
  }
}
