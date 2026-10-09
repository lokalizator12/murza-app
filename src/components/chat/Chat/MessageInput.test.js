import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import MessageInput from './MessageInput';

test('retains text after a failed send and clears it only after confirmation', async () => {
    const send = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    render(<MessageInput onSendMessage={send}/>);
    const field = screen.getByLabelText('Message');
    fireEvent.change(field, {target: {value: 'Can you collect the parcel on Friday?'}});
    await act(async () => { fireEvent.click(screen.getByRole('button', {name: 'Send message'})); });
    expect(send).toHaveBeenCalledTimes(1);
    expect(field).toHaveValue('Can you collect the parcel on Friday?');
    fireEvent.click(screen.getByRole('button', {name: 'Send message'}));
    await waitFor(() => expect(field).toHaveValue(''));
});

test('blocks duplicate sends and lets Shift Enter create a new line', async () => {
    let confirm;
    const send = jest.fn(() => new Promise(resolve => { confirm = resolve; }));
    render(<MessageInput onSendMessage={send}/>);
    const field = screen.getByLabelText('Message');
    fireEvent.change(field, {target: {value: 'Hello'}});
    fireEvent.keyDown(field, {key: 'Enter', shiftKey: true});
    expect(send).not.toHaveBeenCalled();
    fireEvent.keyDown(field, {key: 'Enter'});
    fireEvent.click(screen.getByRole('button', {name: 'Send message'}));
    expect(send).toHaveBeenCalledTimes(1);
    confirm(true);
    await waitFor(() => expect(field).toHaveValue(''));
});
