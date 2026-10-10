import React from 'react';
import {render, screen} from '@testing-library/react';
import AppErrorBoundary from './AppErrorBoundary';

test('failed route loads offer recovery and navigation clears the error', () => {
    const silence = jest.spyOn(console, 'error').mockImplementation(() => {});
    const BrokenRoute = () => {throw new Error('Loading chunk failed');};
    try {
        const {rerender} = render(<AppErrorBoundary resetKey="/main"><BrokenRoute/></AppErrorBoundary>);
        expect(screen.getByRole('button', {name: 'Reload page'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Return to routes'})).toHaveAttribute('href', '/main');
        rerender(<AppErrorBoundary resetKey="/profile/12"><p>Profile loaded</p></AppErrorBoundary>);
        expect(screen.getByText('Profile loaded')).toBeInTheDocument();
    } finally {silence.mockRestore();}
});
