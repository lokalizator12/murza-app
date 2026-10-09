import {mergeMessages, chatSendError} from './chatMessages';

test('merges history with live messages in order without duplicating or losing read status', () => {
    const previous = [{id: '2', timestamp: '2026-10-09 10:02:00', status: 'READ', content: 'two'}];
    const merged = mergeMessages(previous, [
        {id: '2', timestamp: '2026-10-09 10:02:00', status: 'SENT', content: 'two'},
        {id: '1', timestamp: '2026-10-09 10:01:00', status: 'SENT', content: 'one'},
    ]);
    expect(merged.map(item => item.id)).toEqual(['1', '2']);
    expect(merged[1].status).toBe('READ');
});

test('explains rate limits and uncertain delivery without exposing server internals', () => {
    expect(chatSendError({response: {status: 429}})).toContain('Wait one minute');
    expect(chatSendError({})).toContain('could not confirm delivery');
});
