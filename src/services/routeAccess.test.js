import {appDestination, safeNextDestination} from './routeAccess';

test('returns unauthenticated visitors to their chosen Murza action after login', () => {
    const destination = '/main?create=trip';
    const loginPath = appDestination(destination, false);
    expect(loginPath).toBe('/login?next=%2Fmain%3Fcreate%3Dtrip');
    expect(safeNextDestination(loginPath.slice(loginPath.indexOf('?')))).toBe(destination);
    expect(appDestination(destination, true)).toBe(destination);
});

test('ignores external redirect targets', () => {
    expect(safeNextDestination('?next=https%3A%2F%2Fexample.com')).toBe('/main');
    expect(safeNextDestination('?next=%2F%2Fevil.example')).toBe('/main');
});
