<script lang="ts">
  import type { PortableTextObject } from '@portabletext/svelte/types';
  import { language } from '$lib/store/main.svelte.ts';
  import { buildSanityImage } from '$lib/functions/buildSanityImage';
  import { cart } from '$lib/store/cart';

  // Define the structure of a product item based on the provided data
  interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
    slug: string;
    tags?: string[] | { [key: string]: string }; // Allow tags to be array or object
    heroCarousel?: {
      images: Array<{
        _key: string;
        _type: string;
        alt: string;
        asset: { _ref: string; _type: string };
        title: string;
      }>;
    };
    highlights?: string[];
    isActive: boolean;
    language: string;
    // Add other properties if needed
  }

  // Define the expected structure of the input value
  interface InputValue {
    hubQueryBasedData: Product[];
    // Add other properties if needed from the value object structure
  }

  // Define the overall props structure as shown in the example
  interface Props {
    portableText: {
      value: InputValue;
    };
  }

  // Declare props using SvelteKit's $props()
  let { portableText }: Props = $props();

  let sentences = {
    "it": {
      "all": "Tutti",
      "products": "prodotti",
      "noProducts": "Nessun prodotto trovato",
      "noProductsForTag": "Nessun prodotto trovato per",
      "addToCart": "Aggiungi al carrello",
      "showAllCategories": "Mostra tutte le categorie",
      "garda": "Lago di Garda",
      "maggiore": "Lago Maggiore",
      "como": "Lago di Como",
      "lakes": "Laghi",
      "navigation": "Navigazione",
      "camping": "Campeggi",
      "cities": "Città",
      "beaches": "Spiaggie"
    },
    "en": {
      "all": "All",
      "products": "products",
      "noProducts": "No products found",
      "noProductsForTag": "No products found for",
      "addToCart": "Add to cart",
      "showAllCategories": "Show all categories",
      "garda": "Lake Garda",
      "maggiore": "Lake Maggiore",
      "como": "Lake Como",
      "lakes": "Lakes",
      "navigation": "Navigation",
      "camping": "Camping",
      "cities": "Cities",
      "beaches": "Beaches"
    },
    "fr": {
      "all": "Tous",
      "products": "produits",
      "noProducts": "Aucun produit trouvé",
      "noProductsForTag": "Aucun produit trouvé pour",
      "addToCart": "Ajouter au panier",
      "showAllCategories": "Montrer toutes les catégories",
      "garda": "Lac de Garda",
      "maggiore": "Lac Maggiore",
      "como": "Lac de Como",
      "lakes": "Lacs",
      "navigation": "Navigation",
      "camping": "Camping",
      "cities": "Villes",
      "beaches": "Plages"
    },
    "de": {
      "all": "Alle",
      "products": "Produkte",
      "noProducts": "Keine Produkte gefunden",
      "noProductsForTag": "Keine Produkte gefunden für",
      "addToCart": "Zum Warenkorb hinzufügen",
      "showAllCategories": "Alle Kategorien anzeigen",
      "garda": "Gardasee",
      "maggiore": "Maggioresee",
      "como": "Como-See",
      "lakes": "Seen",
      "navigation": "Navigation",
      "camping": "Camping",
      "cities": "Städte",
      "beaches": "Strände"
    }
  };

  // Base data (non-reactive as it comes from props)
  const allProducts = portableText?.value?.hubQueryBasedData?.filter(p => p.isActive === true) || [];

  const getTags = (product: Product): string[] => {
    if (!product.tags) return [];
    if (Array.isArray(product.tags)) return product.tags;
    if (typeof product.tags === 'object' && product.tags !== null) {
      return Object.values(product.tags).filter((tag): tag is string => typeof tag === 'string');
    }
    return [];
  };

  // Unique tags are calculated once from all products
  const uniqueTags = (() => {
    const tagsSet = new Set<string>();
    allProducts.forEach(product => {
      getTags(product).forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  })();

  // State for the selected tags - this is the primary user-driven state
  let selectedTag = $state<string | null>(null);

  // State for the products to be displayed. We start with all products.
  let products = $state(allProducts);

  // An effect that re-runs whenever `selectedTag` changes
  $effect(() => {
    if (selectedTag === null) {
      products = allProducts; // If no tags are selected, show all products
      return;
    }
    // Filter products based on the selected tags
    products = allProducts.filter(product => {
      const productTags = getTags(product);
      if (productTags.length === 0) return false;
      // Check if the product's tags includes the selected tag
      return productTags.includes(selectedTag);
    });
  });

  // --- Functions to modify state ---

  function selectTag(tag: string) {
    // Set the new tag as the only selected one.
    selectedTag = tag;
  }

  function clearFilters() {
    selectedTag = null; // Re-assigning the array triggers the $effect
  }

  // Currency formatter for price display
  const formatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  });

  // Helper function to get the URL for the first image in the carousel
  function getFirstImageUrl(product: Product): string | undefined {
      const firstImage = product.heroCarousel?.images?.[0];
      if (firstImage?.asset?._ref) {
          // Build and return the Sanity image URL
          // Adjust width/height/quality as needed for your design
          // Using a higher width/height for better visual quality in the listing
          return buildSanityImage(firstImage.asset).width(600).height(450).url(); // Adjusted dimensions
      }
      return undefined;
  }

  // Helper function to get the alt text for the first image
  function getFirstImageAlt(product: Product): string {
      const firstImage = product.heroCarousel?.images?.[0];
      return firstImage?.alt || firstImage?.title || product.title || 'Product image';
  }

  // Add to Cart function
  function handleAddToCart(product: Product) {
    // Prepare the item for the cart
    const cartItem = {
      _id: product._id,
      title: product.title,
      price: product.price,
      slug: product.slug,
      imageUrl: getFirstImageUrl(product)
    };
    
    // Add item to the cart
    cart.addItem(cartItem);
    
    // Show confirmation message
    alert(`"${product.title}" aggiunto al carrello!`);
  }

</script>

<!-- Tag Filters Section -->
{#if uniqueTags.length > 0}
<div class="mb-4 px-5 pt-5 max-w-screen-lg mx-auto">
  <div class="flex flex-wrap items-center justify-between gap-y-3">
    <!-- Tag buttons on the left -->
    <div class="flex flex-wrap items-center gap-2">
      <!-- "All" button -->
      <button
        on:click={clearFilters}
        class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 {selectedTag === null
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
      >
        {sentences[$language]['all'] ?? 'Tutti'}
      </button>

      <!-- Individual tag buttons -->
      {#each uniqueTags as tag}
        <button
          on:click={() => selectTag(tag)}
          class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 {selectedTag === tag
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
        >
          {sentences[$language][tag] ?? tag}
        </button>
      {/each}
    </div>

    <!-- Results count on the right -->
    <div class="text-sm text-gray-500 whitespace-nowrap">
      <strong>{products.length}</strong> / {allProducts.length} {sentences[$language]['products'] ?? 'prodotti'}
    </div>
  </div>
</div>
{/if}

<!-- Use Tailwind classes for grid layout and padding -->
<!-- The grid container wraps both the product list and the "no products" message -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 pb-5 max-w-screen-lg mx-auto">
  {#if products.length > 0}
    {#each products as product (product._id)}
      <!-- Each card is a flex container, but NOT the main link -->
      <div class="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 bg-white">

        <!-- Link covering the image area -->
        <a href={product.slug || '#'} class="block w-full relative pb-[75%] bg-gray-100 flex items-center justify-center text-gray-500 text-sm"> <!-- Aspect ratio pb-[75%] (4:3) -->
          {#if getFirstImageUrl(product)}
            <!-- Use buildSanityImage to generate the image URL -->
            <img
              src={getFirstImageUrl(product)}
              alt={getFirstImageAlt(product)}
              title={getFirstImageAlt(product)}
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          {:else}
            <!-- Placeholder if no image -->
            <div class="absolute inset-0 flex items-center justify-center p-4 text-center">
                No Image Available
            </div>
          {/if}
        </a>

        <!-- Info section, contains name, title, description, price, and cart button -->
        <div class="flex flex-col p-4 flex-grow">
          <!-- Link covering the name (what the guide is about) -->
          <a href={product.slug || '#'} class="block">
             <h3 class="text-xl font-semibold text-gray-800 mb-2 leading-tight hover:underline">{product.name}</h3>
          </a>

          <!-- Display the full title as descriptive text -->
          <p class="text-sm text-gray-600 mb-3 flex-grow leading-relaxed">
            {product.title}
          </p>

          <!-- Tags Display -->
          {#if product.tags}
            {@const productTags = Array.isArray(product.tags) ? product.tags : (typeof product.tags === 'object' && product.tags !== null ? Object.values(product.tags).filter(tag => typeof tag === 'string') : [])}
            {#if productTags.length > 0}
              <div class="flex flex-wrap gap-1 mb-3">
                {#each productTags as tag}
                  <span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          {/if}

          <!-- Price and Add to Cart button side by side -->
          <div class="flex items-center justify-between gap-3 mt-auto">
            <!-- Price on the left -->
            <p class="text-lg font-bold text-blue-600">{formatter.format(product.price)}</p>

            <!-- Add to Cart button on the right -->
            <button
              on:click={() => handleAddToCart(product)}
              class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ease-in-out duration-150 flex-shrink-0"
            >
              {sentences[$language]['addToCart'] ?? 'Aggiungi al carrello'}
            </button>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <!-- Use Tailwind classes for the "no products" message, spanning columns -->
    <div class="col-span-full text-center py-10">
      {#if selectedTag !== null}
        <p class="text-gray-600 text-lg mb-2">
          {sentences[$language]['noProductsForTag'] ?? 'Nessun prodotto trovato per'} "{sentences[$language][selectedTag] ?? selectedTag}".
        </p>
        <button on:click={clearFilters} class="text-blue-600 hover:underline">
          {sentences[$language]['showAllCategories'] ?? 'Mostra tutte le categorie'}
        </button>
      {:else}
        <p class="text-gray-600 text-lg">
          {sentences[$language]['noProducts'] ?? 'Nessun prodotto disponibile.'}
        </p>
      {/if}
    </div>
  {/if}
</div>

<!-- No custom <style> block is needed -->
