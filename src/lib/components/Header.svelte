<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { language, isMenuOpen } from '$lib/store/main.svelte.ts';
  import { slide } from 'svelte/transition';
  import { registerEvent } from '$lib/functions/registerEvent';
  import HamburgerMenuClose from '$lib/components/svg/HamburgerMenuClose.svelte';
  import HamburgerMenuOpen from '$lib/components/svg/HamburgerMenuOpen.svelte';
  import { animate, stagger } from "motion";
  import { onMount } from 'svelte';
  import { cart, getCartSize } from '$lib/store/cart';

  // Split VALPICCOLA into letters for animation
  const letters = "VALPICCOLA".split("");
  
  // Stato per controllare lo scroll e mostrare/nascondere CTA
  let scrolled = false;
  let scrollY = 0;
  
  // Controlla lo stato dello scroll
  function handleScroll() {
    // Mostra CTA dopo 200px di scroll
    scrolled = window.scrollY > 200;
    scrollY = window.scrollY;
  }
  
  // Funzione per scrollare alla sezione di acquisto
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Registra l'evento per analytics
      registerEvent(
        $page.url.href,
        "clicked_header_cta_button",
        true,
        {
          scroll_position: scrollY,
          target_section: id
        }
      );
    }
  }

  onMount(() => {
    // Animate letters
    const letterElements = document.querySelectorAll('.letter-ani');
    if (letterElements.length) {
      animate(
        letterElements,
        { 
          y: [20, 0],
          scale: [0.5, 1],
          opacity: [0, 1]
        },
        {
          duration: 0.1,
          delay: stagger(0.05),
          easing: "spring(1, 0.8, 0, 1.2)"
        }
      );
    }

    // Animate other elements
    const elements = document.querySelectorAll('.ani');
    if (elements.length) {
      animate(
        elements,
        { y: 0, opacity: 1 },
        { delay: stagger(0.8) }
      )
    }
    
    // Aggiungi listener per lo scroll
    window.addEventListener('scroll', handleScroll);
    
    // Inizializza lo stato dello scroll
    handleScroll();
    
    return () => {
      // Rimuovi listener quando il componente viene distrutto
      window.removeEventListener('scroll', handleScroll);
    };
  });
  
  export let translations: Array<{ language: string; slug: { current: string } }>;
  export let navbar: { firstLevelCategory: Array<any> };
  export let hasDigitalGuide: boolean;

  let isLanguageMenuOpen = false;

  // Tipo per le chiavi di lingua supportate
  type SupportedLanguage = 'en' | 'it' | 'de' | 'fr' | 'jp' | 'zh';
  
  const languageNames: Record<SupportedLanguage, string> = {
    en: 'English',
    it: 'Italiano',
    de: 'Deutsch',
    fr: 'Français',
    jp: '日本語',
    zh: '中文'
  };

  function changeLanguage(lang: string) {
    registerEvent($page.url.href, "changeLanguage", false, {
      actualPage: $page.url.href,
      newPage: lang
    });
    const langMatch = lang.split("/")[1];
    language.set(langMatch);
    isMenuOpen.set(false);
    isLanguageMenuOpen = false;
    goto(lang);
  }

  function goToPage(newPage: string) {
    isMenuOpen.set(false);
    window.location.href = newPage;
  }

  function toggleMenu() {
    const newMenuState = !$isMenuOpen;
    if (newMenuState) {
      registerEvent($page.url.href, "openHamburgerMenu", false, {
        actualPage: $page.url.href
      });
    }
    isMenuOpen.set(newMenuState);
  }

  const trustMessages: Record<SupportedLanguage, string> = {
    it: "Un progetto digitale sostenibile, indipendente, made in Italy.",
    en: "A sustainable, independent, digital project made in Italy.",
    de: "Ein nachhaltiges, unabhängiges, digitales Projekt made in Italy.",
    fr: "Un projet numérique durable, indépendant, made in Italy.",
    jp: "持続可能で独立したイタリア製のデジタルプロジェクト。",
    zh: "一个可持续的、独立的、意大利制造的数字项目。"
  };
  
  // Frasi CTA per l'acquisto della guida
  const ctaMessages: Record<SupportedLanguage, string> = {
    it: "Acquista la Guida",
    en: "Get the Guide",
    de: "Guide kaufen",
    fr: "Achetez le Guide",
    jp: "ガイドを購入する",
    zh: "购买指南"
  };
</script>

<nav class="sticky top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out bg-blue-high text-white">
  <div class="container mx-auto px-2 max-w-7xl">
    <div class="h-16 grid grid-cols-[auto,1fr,auto] md:grid-cols-3 items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-1">
        <img src="/logo.png" alt="Logo Valpiccola" class="w-6 h-6" />
        <span class="text-xl font-bold tracking-wide flex">
          {#each letters as letter}
            <span class="letter-ani inline-block">{letter}</span>
          {/each}
        </span>
      </a>

      <!-- Desktop Navigation -->
      {#if Object.keys(navbar).length > 0}
      <div class="hidden md:flex justify-center items-center h-16">
        <div class="flex space-x-4">
          {#each navbar.firstLevelCategory as firstLevel}
            <div class="relative group flex items-center h-16">
              <a
                href={firstLevel.page.slug}
                class="hover:text-blue-light transition-colors duration-200 py-2 text-sm whitespace-nowrap"
                on:click={() => goToPage(firstLevel.page.slug)}
              >
                {firstLevel.title}
              </a>
              {#if firstLevel.secondLevelCategory.length > 0}
                <div class="absolute left-0 top-16 w-48 bg-blue-light rounded-md shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  {#each firstLevel.secondLevelCategory as secondLevel}
                    <a
                      href={secondLevel.page.slug}
                      class="block px-4 py-2 text-sm text-blue-dark hover:bg-blue-high hover:text-blue-light transition-colors duration-200"
                      on:click={() => goToPage(secondLevel.page.slug)}
                    >
                      {secondLevel.title}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      {/if}

      <!-- Language Selector, Mobile Menu and CTA -->
      {#if Object.keys(navbar).length > 0}
      <div class="flex items-center justify-end space-x-2">
        
        <!-- CTA Button shown on scroll when hasDigitalGuide is true -->
        {#if hasDigitalGuide && scrolled}
          <div class="cta-button-container" transition:slide={{ duration: 300 }}>
            <a
              href="#buyPDFBanner"
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-lg transform hover:scale-105"
              on:click|preventDefault={() => scrollToSection('buyPDFBanner')}
            >
              {ctaMessages[$language] || ctaMessages['en']}
            </a>
          </div>
        {:else}
        
        <!-- Language selector - hidden on scroll when hasDigitalGuide is true -->
        {#if translations.length > 0}
          <div class="relative transition-opacity duration-300">
            <button
              on:click={() => isLanguageMenuOpen = !isLanguageMenuOpen}
              type="button"
              class="focus:outline-none focus:ring-2 focus:ring-white rounded-md px-2 py-1 text-sm font-medium h-9 flex items-center"
              aria-label="Change language"
            >
              {languageNames[$language] || 'Language'}
            </button>
            {#if isLanguageMenuOpen}
              <div class="absolute right-0 mt-2 w-48 bg-blue-light rounded-md shadow-lg z-50">
                {#each translations as translation}
                  {#if translation.language !== $language}
                    <button
                      class="block w-full text-left px-4 py-2 text-sm text-blue-dark hover:bg-blue-high hover:text-blue-light transition-colors duration-200"
                      on:click={() => changeLanguage(translation.slug.current)}
                      type="button"
                    >
                      {languageNames[translation.language]}
                    </button>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
          {/if}
        
        <!-- Menu button - hidden on scroll when hasDigitalGuide is true -->
        <button
          class="md:hidden inline-flex h-9 w-9 items-center justify-center focus:outline-none focus:ring-2 focus:ring-white rounded-md transition-opacity duration-300"
          class:opacity-0={hasDigitalGuide && scrolled}
          class:invisible={hasDigitalGuide && scrolled}
          on:click={toggleMenu}
          aria-label={$isMenuOpen ? "Close menu" : "Open menu"}
        >
          {#if $isMenuOpen}
            <HamburgerMenuClose />
          {:else}
            <HamburgerMenuOpen />
          {/if}
        </button>

        <!-- Cart Icon -->
        <a href="/cart" class="relative flex items-center justify-center h-9 w-9 focus:outline-none focus:ring-2 focus:ring-white rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {#if $cart.length > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getCartSize($cart)}
            </span>
          {/if}
        </a>

        {/if}
      </div>
      {/if}
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if Object.keys(navbar).length > 0}
  {#if $isMenuOpen}
    <div class="md:hidden border-t border-blue-light/20" transition:slide|global>
      <div class="px-4 py-2 space-y-1">
        {#each navbar.firstLevelCategory as firstLevel}
          <div class="py-2">
            <a
              href={firstLevel.page.slug}
              class="block text-base font-medium hover:text-blue-light transition-colors duration-200"
              on:click={() => goToPage(firstLevel.page.slug)}
            >
              {firstLevel.title}
            </a>
            {#each firstLevel.secondLevelCategory as secondLevel}
              <a
                href={secondLevel.page.slug}
                class="block py-2 text-sm text-blue-light/80 hover:text-blue-light transition-colors duration-200 ml-4"
                on:click={() => goToPage(secondLevel.page.slug)}
              >
                {secondLevel.title}
              </a>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  {/if}
  {/if}

</nav>

<!-- Trust Message Banner -->
{#if Object.keys(navbar).length > 0}
<div class="py-0.5 text-center text-gray-dark text-xs font-semibold bg-green-low border-b-2 border-purple-400 shadow-2xl z-50">
  {trustMessages[$language]}
</div>
{/if}

<style>
  .letter-ani {
    opacity: 0;
    transform: translateY(20px);
  }

  .ani {
    opacity: 0;
    transform: translateY(20px);
  }
</style>
