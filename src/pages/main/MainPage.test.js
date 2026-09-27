import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import MainPage from './MainPage';
import axios from '../../axiosConfig';

jest.mock('react-router-dom', () => ({
    useSearchParams: () => [new URLSearchParams('type=trip&create=trip'), jest.fn()]
}), {virtual: true});
jest.mock('../../axiosConfig', () => ({get: jest.fn()}));
jest.mock('../../components/MainPage/MapboxMap/MapboxMap', () => () => <div>Map ready</div>);
jest.mock('../../components/MainPage/RequestDetailsModal', () => () => null);
jest.mock('../test-wizard/MainFormRequest', () => ({initialType}) => <div>Post {initialType} wizard</div>);

test('opens the requested trip flow and loads trip listings for a landing-page link', async () => {
    axios.get.mockImplementation(url => {
        if (url.includes('/list-summary')) return Promise.resolve({data: {content: [], totalPages: 0}});
        return Promise.resolve({data: []});
    });
    render(<MainPage/>);
    expect(screen.getByText('Post trip wizard')).toBeInTheDocument();
    expect(screen.getByText('Available trips')).toBeInTheDocument();
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/trip-requests/list-summary?')));
});
