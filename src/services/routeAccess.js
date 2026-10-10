export const appDestination = (path, isAuthenticated) =>
    isAuthenticated ? path : `/login?next=${encodeURIComponent(path)}`;

export const safeNextDestination = (search) => {
    const next = new URLSearchParams(search).get('next');
    return next && next.startsWith('/') && !next.startsWith('//') ? next : '/main';
};
