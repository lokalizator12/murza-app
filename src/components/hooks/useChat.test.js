import {act, renderHook, waitFor} from '@testing-library/react';
import {useChat} from './useChat';
import axios from '../../axiosConfig';
import {createChatClient} from '../../services/chatClient';

jest.mock('../../axiosConfig', () => ({get: jest.fn(), post: jest.fn()}));
jest.mock('../../services/chatClient', () => ({createChatClient: jest.fn()}));

beforeEach(() => { jest.clearAllMocks(); });

test('read receipts update outgoing messages only when the other person reads them', async () => {
    const subscriptions = {};
    const client = {connected: true, subscribe: jest.fn((name, callback) => { subscriptions[name] = callback; }),
        publish: jest.fn(), activate: jest.fn(), deactivate: jest.fn()};
    createChatClient.mockImplementation(callbacks => { client.activate.mockImplementation(() => callbacks.onConnect()); return client; });
    axios.get.mockResolvedValue({data: {content: [
        {id: 'own', senderId: 1, receiverId: 2, status: 'SENT', timestamp: '2026-10-09 10:00:00'},
        {id: 'incoming', senderId: 2, receiverId: 1, status: 'SENT', timestamp: '2026-10-09 10:01:00'},
    ], last: true}});
    axios.post.mockResolvedValue({});
    const {result, unmount} = renderHook(() => useChat('2', '1'));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result.current.messages.find(item => item.id === 'own').status).toBe('SENT');
    expect(result.current.messages.find(item => item.id === 'incoming').status).toBe('READ');
    act(() => subscriptions['/user/queue/read-receipts']({body: '3'}));
    expect(result.current.messages.find(item => item.id === 'own').status).toBe('SENT');
    act(() => subscriptions['/user/queue/read-receipts']({body: '2'}));
    expect(result.current.messages.find(item => item.id === 'own').status).toBe('READ');
    unmount();
    expect(client.deactivate).toHaveBeenCalledTimes(1);
});
