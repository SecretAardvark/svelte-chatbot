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
		let updatedMessages = [...$messages, message];
		console.log(message);
		$messages = updatedMessages;
		$loading = true;

		// const response = await fetch("/api/chat/v1/completions", {
		//   method: "POST",
		//   headers: {
		//     "Content-Type": "application/json"
		//   },
		//   body: JSON.stringify({
		//     messages: updatedMessages
		//   })
		// });

		let response = await window.ai.getCompletion({
			messages: $messages
			// prompt: 'hello?'
		});
		if (response.status !== 200) {
			console.error(`Error fetching response from API: ${response.status}`);
			return;
		}

		const data = response.body;
		console.log(response.message.text);
		if (!data) {
			return;
		}

		$loading = false;

		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;
		let isFirst = true;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);

			if (isFirst) {
				isFirst = false;
				$messages = [
					...$messages,
					{
						role: 'assistant',
						content: chunkValue
					}
				];
			} else {
				$messages = $messages.slice(0, -1).concat({
					...$messages[$messages.length - 1],
					content: $messages[$messages.length - 1].content + chunkValue
				});
			}
		}
	}

	function handleReset() {
		$messages = [
			{
				role: 'assistant',
				content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
			}
		];
	}

	onMount(() => {
		scrollToBottom();
		messages.set([
			{
				role: 'assistant',
				content: `Hi there! I'm Chatbot UI, an AI assistant. I can help you with things like answering questions, providing information, and helping with tasks. How can I help you?`
			}
		]);
	});

	afterUpdate(() => {
		scrollToBottom();
	});

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
