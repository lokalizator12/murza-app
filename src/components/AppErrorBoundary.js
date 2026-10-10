import React from 'react';

export default class AppErrorBoundary extends React.Component {
    state = {failed: false};
    static getDerivedStateFromError() {return {failed: true};}
    componentDidUpdate(previous) {
        if (this.state.failed && previous.resetKey !== this.props.resetKey) this.setState({failed: false});
    }
    render() {
        if (!this.state.failed) return this.props.children;
        return <main className="murza-page-error" role="alert">
            <img src="/images/murza-mascot.webp" alt=""/>
            <h1>We couldn’t open this page.</h1>
            <p>Reload the page to try again, or return to the route board.</p>
            <div><button className="murza-button" onClick={() => window.location.reload()}>Reload page</button><a className="murza-button murza-button-outline" href="/main">Return to routes</a></div>
        </main>;
    }
}
