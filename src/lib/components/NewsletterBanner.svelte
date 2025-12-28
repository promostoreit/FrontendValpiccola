<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

  import { language } from '$lib/store/main.svelte.ts';
  import { page } from '$app/stores';
  import { registerEvent } from '$lib/functions/registerEvent';
  import { fade } from 'svelte/transition';

  const value = {
    "it": {
      "subscribe": "Iscriviti alla newsletter",
      "sentence": "Ricevi le ultime novità e promozioni esclusive di Valpiccola direttamente nella tua casella di posta!",
      "yourEmail": "La tua email",
      "cta": "Iscriviti ora",
      "thankYou": "Grazie per l'iscrizione!",
      "errorMessage": "Si prega di inserire un indirizzo email valido."
    },
    "de": {
      "subscribe": "Newsletter abonnieren",
      "sentence": "Erhalten Sie die neuesten Nachrichten und exklusive Angebote von Valpiccola direkt in Ihrem Posteingang!",
      "yourEmail": "Ihre E-Mail-Adresse",
      "cta": "Jetzt abonnieren",
      "thankYou": "Danke für Ihre Anmeldung!",
      "errorMessage": "Bitte geben Sie eine gültige E-Mail-Adresse ein."
    },
    "fr": {
      "subscribe": "Abonnez-vous à la newsletter",
      "sentence": "Recevez les dernières nouvelles et offres exclusives de Valpiccola directement dans votre boîte mail !",
      "yourEmail": "Votre adresse e-mail",
      "cta": "S'abonner maintenant",
      "thankYou": "Merci pour votre inscription !",
      "errorMessage": "Veuillez entrer une adresse e-mail valide."
    },
    "en": {
      "subscribe": "Subscribe to our newsletter",
      "sentence": "Get the latest news and exclusive offers from Valpiccola delivered straight to your inbox!",
      "yourEmail": "Your email address",
      "cta": "Subscribe now",
      "thankYou": "Thank you for subscribing!",
      "errorMessage": "Please enter a valid email address."
    },
    "jp": {
      "subscribe": "ニュースレターを購読する",
      "sentence": "Valpiccolaの最新情報や独占オファーを直接受け取るには、メールアドレスを入力してください！",
      "yourEmail": "あなたのメールアドレス",
      "cta": "今すぐ購読",
      "thankYou": "購読していただきありがとうございます！",
      "errorMessage": "有効なメールアドレスを入力してください。"
    },
    "zh": {
      "subscribe": "订阅我们的通讯",
      "sentence": "获取Valpiccola的最新消息和独家优惠，直接发送到您的收件箱！",
      "yourEmail": "您的电子邮件地址",
      "cta": "立即订阅",
      "thankYou": "感谢您的订阅！",
      "errorMessage": "请输入有效的电子邮件地址。"
    }
  };

  let email = $state("");
  let isThankYouVisible = $state(false);
  let isErrorVisible = $state(false);

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function registerNewsletter() {
    if (!validateEmail(email)) {
      isErrorVisible = true;
      return;
    }

    registerEvent(
      $page.url.href, 
      "newsletter", 
      false, 
      { email }
    );
    isThankYouVisible = true;
    isErrorVisible = false;
  }
</script>

<div class="max-w-4xl mx-auto bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-lg overflow-hidden my-8 md:my-12">
  <div class="p-6 md:p-8 lg:p-12 flex flex-col md:flex-row items-center">
    <div class="flex-1 text-center md:text-left mb-6 md:mb-0 md:mr-8">
      <h2 class="text-2xl md:text-3xl font-bold text-green-800 mb-4">
        {value[$language].subscribe}
      </h2>
      <p class="text-green-700 mb-4">
        {value[$language].sentence}
      </p>
    </div>
    <div class="flex-1 w-full max-w-md">
      {#if isThankYouVisible}
        <div class="bg-white p-6 rounded-lg shadow-inner text-center" transition:fade>
          <p class="text-xl font-bold text-green-600">{value[$language].thankYou}</p>
        </div>
      {:else}
        <form onsubmit={preventDefault(registerNewsletter)} class="space-y-4">
          <div>
            <label for="email" class="sr-only">{value[$language].yourEmail}</label>
            <input 
              id="email"
              class="w-full px-4 py-2 rounded-md border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              type="email" 
              bind:value={email} 
              placeholder={value[$language].yourEmail}
              required
            />
          </div>
          {#if isErrorVisible}
            <p class="text-red-500 text-sm" transition:fade>{value[$language].errorMessage}</p>
          {/if}
          <button 
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            {value[$language].cta}
          </button>
        </form>
      {/if}
    </div>
  </div>
</div>
