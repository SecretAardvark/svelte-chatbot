<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';
	import Chat from './Chat.svelte';
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
	import type Message from './types';
	import { readable, writable } from 'svelte/store';
	import Input from 'postcss/lib/input';

	let messages = writable<Message[]>([]);
	let loading = writable<boolean>(false);
	let messagesEndRef = null;

	function scrollToBottom() {
		messagesEndRef.scrollIntoView({ behavior: 'smooth' });
	}

	async function handleSend(message: Message) {
		const updatedMessages = [...$messages, message];
		messages.set(updatedMessages);
		loading.set(true);

		let response = await window.ai.getCompletion({
			messages: $messages
		});
		console.log(response.message.content);
		//TODO: window.ai doesn't return the usual response codes. Need to figure out how to handle this.
		// if (response.status !== 200) {
		// 	console.error(`Error fetching response from API: ${response.status}`);
		// 	return;
		// }
		loading.set(false);

		const receivedMesage:Message = response.message;
		messages.update((messages) => [...messages, receivedMesage]);
	}

	function handleReset() {
		messages.set([
			{
				role: 'assistant',
				content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
			}
		]);
	}

	onMount(() => {
		scrollToBottom();
		handleReset();
	});

	afterUpdate(scrollToBottom);

	onDestroy(() => {
		messagesEndRef = null;
	});
</script>

<link rel="stylesheet" href="./src/styles/styles.css" />

<div class="flex flex-col h-screen">
	<Navbar />

	<div class="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
		<div class="max-w-[800px] mx-auto mt-4 sm:mt-12">
			<Chat
				bind:messages={$messages}
				loading={$loading}
				onSend={handleSend}
				onReset={handleReset}
			/>
			<div bind:this={messagesEndRef} />
		</div>
	</div>
	<Footer />
</div>
