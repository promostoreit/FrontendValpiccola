import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

// Definizione dell'interfaccia per gli elementi del carrello
export interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  slug: { current: string };
  imageUrl?: string;
}

// Inizializzazione dallo storage locale se in browser
const initCart = (): CartItem[] => {
  if (browser) {
    const storedCart = localStorage.getItem('valpiccola-cart');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (e) {
        console.error('Errore nel parsing del carrello:', e);
      }
    }
  }
  return [];
};

// Creazione dello store
function createCartStore() {
  const { subscribe, set, update } = writable<CartItem[]>(initCart());

  // Funzione per salvare in localStorage
  const saveToLocalStorage = (items: CartItem[]) => {
    if (browser) {
      localStorage.setItem('valpiccola-cart', JSON.stringify(items));
    }
  };

  return {
    subscribe,
    
    // Aggiungere un elemento al carrello
    addItem: (item: Omit<CartItem, 'quantity'>) => {
      update(items => {
        // Controlla se l'elemento esiste già nel carrello
        const existingItemIndex = items.findIndex(i => i._id === item._id);
        
        let updatedItems: CartItem[];
        
        if (existingItemIndex >= 0) {
          // Se esiste, aumenta la quantità
          updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
        } else {
          // Se è nuovo, aggiungilo con quantità 1
          updatedItems = [...items, { ...item, quantity: 1 }];
        }
        
        saveToLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    
    // Aggiornare la quantità di un elemento
    updateQuantity: (id: string, quantity: number) => {
      update(items => {
        const updatedItems = items.map(item => 
          item._id === id ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0); // Rimuovi gli elementi con quantità 0
        
        saveToLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    
    // Rimuovere un elemento dal carrello
    removeItem: (id: string) => {
      update(items => {
        const updatedItems = items.filter(item => item._id !== id);
        saveToLocalStorage(updatedItems);
        return updatedItems;
      });
    },
    
    // Svuotare il carrello
    clearCart: () => {
      if (browser) {
        localStorage.removeItem('valpiccola-cart');
      }
      set([]);
    }
  };
}

// Esportazione dello store
export const cart = createCartStore();

// Funzioni derivate di utilità
export function getCartSize(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}
