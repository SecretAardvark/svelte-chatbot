<script lang="ts">
	import type Message from './types';
	// import IconArrowUp from '@tabler/icons/ArrowUp';
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let onSend;
	let content = '';

	// const handleSend = () => {
	// 	if (!content) {
	// 		alert('Please enter a message');
	// 		return;
	// 	}
	// 	dispatch('send', { role: 'user', content });
	// 	content = '';
	// };

	const handleChange = (event) => {
		const value = event.target.value;
		if (value.length > 4000) {
			alert('Message limit is 4000 characters');
			return;
		}

		content = value;
	};

	function handleKeyDown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			// handleSend();
			onSend({ role: 'user', content });
		}
	}

	let textareaRef;

	onMount(() => {
		if (textareaRef && textareaRef.current) {
			textareaRef.current.style.height = 'inherit';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	});
</script>

<div class="relative">
	<textarea
		bind:value={content}
		class="min-h-[44px] rounded-lg pl-4 pr-12 py-2 w-full focus:outline-none focus:ring-1 focus:ring-neutral-300 border-2 border-neutral-200 resize-none"
		placeholder="Type a message..."
		rows="1"
		on:input={handleChange}
		on:keydown={handleKeyDown}
	/>

	<button
		on:click={onSend({ role: 'user', content })}
		class="text-sm sm:text-base text-neutral-900 font-semibold rounded-lg px-4 py-2 bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300"
	>
		<!-- <IconArrowUp
			class="
          absolute
          right-2
          bottom-3
          h-8
          w-8
          hover:cursor-pointer
          rounded-full
          p-1
          bg-blue-500
          text-white
          hover:opacity-80"
		/> -->
		send
	</button>
</div>
