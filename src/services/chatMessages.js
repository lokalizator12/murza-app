export const messageDate = value => new Date(String(value || '').replace(' ', 'T'));

export const mergeMessages = (previous, incoming) => {
    const messages = new Map(previous.map(message => [message.id, message]));
    incoming.forEach(message => {
        const old = messages.get(message.id);
        // A delayed history response must not undo a live read receipt.
        messages.set(message.id, old?.status === 'READ' ? {...message, status: 'READ'} : message);
    });
    return [...messages.values()].sort((a, b) => messageDate(a.timestamp) - messageDate(b.timestamp));
};

export const chatSendError = error => {
    const status = error.response?.status;
    if (status === 429) return 'You have sent several messages quickly. Wait one minute, then try again.';
    if (status === 404) return 'This person is no longer available. Return to Messages to choose another conversation.';
    if (status === 400) return 'Enter a message of up to 2,000 characters and choose another person.';
    if (status === 401 || status === 403) return 'Your session needs attention. Log in again to send this message.';
    return 'The server could not confirm delivery. Your text is saved here. Check your connection and try again.';
};
