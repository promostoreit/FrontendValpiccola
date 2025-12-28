<script>
import { page } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { registerEvent } from '$lib/functions/registerEvent.ts';

let isFeedbackReceived = $state(false);

let feedbackMessage = {
  "en": {
    "messageFeedback": "Did you find this page useful?",
    "messageSurvey": "Do you have a minute for a few questions?"
  },
  "de": {
    "messageFeedback": "Haben Sie diese Seite nützlich gefunden?",
    "messageSurvey": "Haben Sie eine Minute für ein paar Fragen?"
  },
  "it": {
    "messageFeedback": "Hai trovato questa pagina utile?",
    "messageSurvey": "Hai un minuto per alcune domande?"
  },
  "fr": {
    "messageFeedback": "Avez-vous trouvé cette page utile?",
    "messageSurvey": "Avez-vous une minute pour quelques questions?"
  },
  "jp": {
    "messageFeedback": "このページは役立ちましたか？",
    "messageSurvey": "数分間質問にお答えいただけますか？"
  },
  "zh": {
    "messageFeedback": "您觉得这个页面有用吗？",
    "messageSurvey": "您有一分钟回答几个问题吗？"
  }
}

function highlightStar(i) {
  for (let j = 0; j <= i; j++) {
    if (j <= i) {
      document.getElementById("star" + j).style.color = "orange";
    } else {
      document.getElementById("star" + j).style.color = "black";
    }
  }
}

function unhighlightStar(i) {
  for (let j = 0; j <= i; j++) {
    document.getElementById("star" + j).style.color = "black";
  }
}

function registerFeedback(event_name, value) {
  registerEvent(
    $page.url.href, 
    event_name,
    false, 
    {
      value: value
    }
  );
  isFeedbackReceived = true;
}

</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_missing_attribute -->

<div if="feedbackBanner" class="text-gray-dark text-sm md:text-md py-1 font-semibold flex flex-row bg-blue-base/70 justify-between">
  <div class="flex flex-col md:flex-row items-center align-middle space-x-2 mx-auto">
    {#if !isFeedbackReceived}
    <div class="">
      {feedbackMessage[$language].messageFeedback}
    </div>
    <div class="flex justify-center space-x-2">
      {#each Array(5) as _, i}
      <div
        class="text-gray-400"
        onmouseover={() => highlightStar(i)}
        onmouseleave={() => unhighlightStar(i)}
        onclick={()=> registerFeedback("feedback_page", i)}>
        <svg id={"star" + i} class="h-4 w-4 fill-current" viewBox="0 0 47.94 47.94" xml:space="preserve">
          <path d="m26.285 2.486 5.407 10.956a2.58 2.58 0 0 0 1.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528a2.582 2.582 0 0 0-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685a2.585 2.585 0 0 0-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042a2.582 2.582 0 0 0-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757a2.58 2.58 0 0 0 1.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z"/>
        </svg>
      </div>
      {/each}
    </div>
    {:else}
    <div class="text-center">
      {feedbackMessage[$language].messageSurvey}
    </div>
    <div class="flex justify-center space-x-2">
      <a 
        class="text-gray-400 hover:font-bold"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdJt4fqRr8i7AbUa1oUeiVNoKxZt5xtlZecUylmOa2XWbf7cQ/viewform?usp=sf_link"
        target="_blank"
        rel="noreferrer"
        onclick={()=> registerFeedback("feedback_survey", "yes")}>
        <svg class="h-6 w-6 hover:fill-[orange]" viewBox="0 0 490 490" xml:space="preserve">
          <path d="M313.447 222.026H0v45.938h313.451l-64.822 157.582L490 245 248.629 64.454z"/>
        </svg>
      </a>
    </div>
    {/if}
  </div>
</div>
