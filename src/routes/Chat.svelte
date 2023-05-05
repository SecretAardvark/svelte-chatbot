<script lang="ts">
	import type Message from './types';
	import ChatInput from './ChatInput.svelte';
	import ChatLoader from './ChatLoader.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import ResetChat from './ResetChat.svelte';

	export let messages: Message[] = [];
	export let loading = false;
	export let onSend: (message: Message) => void;
	export let onReset: () => void;

	let displayedMessages: Message[] = [];

	$: displayedMessages = messages;
</script>

<div class="flex flex-col rounded-lg px-2 sm:p-4 sm:border border-neutral-300">
	{#each displayedMessages as message, index}
		<div class="my-1 sm:my-1.5">
			<ChatMessage {message} />
		</div>
	{/each}

	{#if loading}
		<div class="my-1 sm:my-1.5">
			<ChatLoader />
		</div>
	{/if}

	<div class="mt-4 sm:mt-8 bottom-[56px] left-0 w-full">
		<ChatInput {onSend} />
	</div>
</div>

<div class="flex flex-row justify-between items-center mb-4 sm:mb-8">
	<ResetChat {onReset} />
</div>
