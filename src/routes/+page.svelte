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

	//TODO: Refactor project structure.
	//TODO: Refactor to use  https://www.npmjs.com/package/window.ai?activeTab=code
	//TODO: Add loading indicator
	//TODO: local models  take too long to respond and return an axios timeout error. Need to figure out how to handle this.
	async function handleSend(message: Message) {
		const updatedMessages = [...$messages, message];
		messages.set(updatedMessages);
		loading.set(true);
		try {
			let response = await window.ai.getCompletion({
				messages: $messages
			});
			console.log(response.message.content);
			loading.set(false);

			const receivedMesage: Message = response.message;
			messages.update((messages) => [...messages, receivedMesage]);
		} catch (error) {
			loading.set(false);
			handleError(error);
		}
	}

	const handleError = (error: any) => {
		let errorMessage = '';
		switch (error.code) {
			case 'NOT_AUTHENTICATED':
				errorMessage = 'Authentication error. Please check your API key.';
				break;
			case 'PERMISSION_DENIED':
				errorMessage = 'Permission denied. User did not grant permission.';
				break;
			case 'REQUEST_NOT_FOUND':
				errorMessage = 'Request not found. Permission request popup timed out.';
				break;
			case 'INVALID_REQUEST':
				errorMessage = 'Invalid request. The request was badly formed.';
				break;
			case 'MODEL_REJECTED_REQUEST':
				errorMessage = `Model rejected request. Model API returned: ${error.message}`;
				break;
			default:
				errorMessage = 'An unknown error occurred.';
		}
		const errorMesage: Message = {
			role: 'assistant',
			content: `Error: ${errorMessage}`
		};
		messages.update((messages) => [...messages, errorMesage]);
	};
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
