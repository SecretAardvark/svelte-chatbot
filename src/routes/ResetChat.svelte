<script>
  export let onReset;

 
</script>

<div class="flex flex-row items-center">
  <button 
    class="text-sm sm:text-base text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
    on:click={onReset()}
  >
    Reset
  </button>
</div> 