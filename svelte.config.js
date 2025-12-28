// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';

const config = {
  preprocess: [
    sveltePreprocess({
      postcss: true,
      preserve: ['ld+json']
    }),
  ],
	kit: {
    adapter: adapter()
	},
  onwarn: () => {
    return;
  }
};

export default config;
