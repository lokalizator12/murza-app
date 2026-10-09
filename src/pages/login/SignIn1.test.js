import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import SignIn1 from './SignIn1';
import axios from '../../axiosConfig';

const mockLogin = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({useNavigate: () => mockNavigate, useLocation: () => ({search: '?next=%2Fmain%3Ftype%3Dtrip'})}), {virtual: true});
jest.mock('../../context/AuthContext', () => ({useAuth: () => ({login: mockLogin})}));
jest.mock('../../axiosConfig', () => ({post: jest.fn()}));
jest.mock('js-cookie', () => ({set: jest.fn(), get: jest.fn(), remove: jest.fn()}));

test('existing accounts can sign in with a legacy password and continue to their intended route', async () => {
    axios.post.mockResolvedValue({data: {token: 'test-token', userId: 12, expiresIn: 3600000}});
    render(<SignIn1/>);
    fireEvent.change(document.getElementById('thq-sign-in-2-email'), {target: {value: 'legacy@example.test'}});
    fireEvent.change(document.getElementById('thq-sign-in-2-password'), {target: {value: 'old123'}});
    fireEvent.click(screen.getByRole('button', {name: 'Log in'}));
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/main?type=trip'));
    expect(axios.post).toHaveBeenCalledWith('auth/login', {email: 'legacy@example.test', password: 'old123'}, {withCredentials: true});
    expect(mockLogin).toHaveBeenCalledWith('test-token', 12);
});
