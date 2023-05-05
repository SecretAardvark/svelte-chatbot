<script lang="ts">
    		import type  Message  from './types'; 

  
    export let message: Message;
  
    const isAssistant = message.role === "assistant";
  </script>
  
  <div class="flex flex-col {isAssistant ? 'items-start' : 'items-end'}">
    <div
      class="flex items-center {isAssistant ? 'bg-neutral-200 text-neutral-900' : 'bg-blue-500 text-white'} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap"
      style="overflow-wrap: anywhere;"
    >
      {message.content}
    </div>
  </div>