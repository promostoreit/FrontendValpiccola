import {
  PUBLIC_ENV,
  PUBLIC_EVENT_HTTP_URL,
} from "$env/static/public"

// This function is used to register an event in the system
// It sends a POST request to the specified URL with event details
// page: The page where the event occurred
// event_name: The name of the event
// deep: A boolean indicating if the backend check for ip details, such as country
// details: Additional details about the event
export async function registerEvent(
  page: string, 
  event_name: string, 
  deep: boolean, 
  details: object
) {

  if (PUBLIC_ENV !== 'production') {
    return;
  }

  // Verifica se il codice viene eseguito in un contesto browser
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  
  // Se non siamo in un browser, non possiamo accedere a document o window
  if (!isBrowser) {
    return;
  }

  fetch(PUBLIC_EVENT_HTTP_URL + "/record_event", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Page: decodeURIComponent(page),
      Event_name: event_name,
      Referrer: document.referrer,
      Cookie: document.cookie.match('(^|;)\\s*userId\\s*=\\s*([^;]+)')?.pop() || '',
      Ref: document.cookie.match('(^|;)\\s*ref\\s*=\\s*([^;]+)')?.pop() || '',
      Size: innerWidth.toString()+"x"+innerHeight.toString(),
      Language: navigator.language,
      Deep: deep,
      Details: details
    })
  });
}
