<script lang="ts">
  let { widthMobile, widthDesktop, padding } = $props();
</script>

<div class="flex flex-row space-x-1">
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://instagram.com/valpiccola_" target="_blank" rel="noreferrer">
      <img 
         src="/instagram-logo-white.png" 
         alt="Instagram logo"
         class="w-{widthMobile} sm:w-{widthDesktop}"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://twitter.com/valpiccola_com" target="_blank" rel="noreferrer">
      <img 
         src="/x-logo-white.png" 
         alt="X logo"
         class="w-{widthMobile} sm:w-{widthDesktop}"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://www.linkedin.com/company/valpiccola" target="_blank" rel="noreferrer">
      <img 
         src="/linkedin-logo-white.png" 
         alt="Linkedin logo"
         class="w-{widthMobile} sm:w-{widthDesktop}"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://github.com/Valpiccola/" target="_blank" rel="noreferrer">
      <img 
         src="/github-logo-white.png" 
         alt="Github logo"
         class="w-{widthMobile} sm:w-{widthDesktop}"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://linktr.ee/valpiccola/" target="_blank" rel="noreferrer">
      <img 
         src="/linktree-logo-white.png" 
         alt="Linktree logo"
         class="w-{widthMobile} sm:w-{widthDesktop}"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://www.youtube.com/@Valpiccola" target="_blank" rel="noreferrer">
      <img 
         src="/youtube-logo.png" 
         alt="Youtube logo"
         class="w-{widthMobile} sm:w-{widthDesktop} invert"
      />
    </a>
  </div>
  <div class="p-{padding} justify-center text-center align-middle items-center hover:bg-blue-dark rounded-xl">
    <a href="https://maps.app.goo.gl/W21xbY7A3476Uefj9" target="_blank" rel="noreferrer">
      <img 
         src="/google-maps-logo.png" 
         alt="Google Maps logo"
         class="w-{widthMobile} sm:w-{widthDesktop} invert"
      />
    </a>
  </div>
</div>
