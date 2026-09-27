import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Home from './home';

jest.mock('react-router-dom', () => ({
    Link: ({to, children, ...props}) => <a href={to} {...props}>{children}</a>
}), {virtual: true});
jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({isAuthenticated: false})
}));

beforeAll(() => {
    window.matchMedia = () => ({matches: false, addListener: () => {}, removeListener: () => {}});
});

test('shows honest service copy, working sign-in destinations, and carousel controls', () => {
    render(<Home/>);
    expect(screen.getByRole('heading', {name: /Every parcel has a route/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Find a trip/i}).getAttribute('href')).toBe('/login?next=%2Fmain%3Ftype%3Dtrip');
    expect(screen.getByText(/Live parcel tracking is not available/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'A parcel with somewhere to go'})).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: 'Next story'}));
    expect(screen.getByRole('heading', {name: 'Going that way anyway?'})).toBeInTheDocument();
});
