import React, {useEffect, useState} from 'react';
import axios from '../../../axiosConfig';
import {Link} from 'react-router-dom';

const ChatHeader = ({receiverId}) => {
    const [receiver, setReceiver] = useState(null);
    const [error, setError] = useState(false);
    useEffect(() => {
        let active = true;
        axios.get(`/v1/profile/${receiverId}`).then(({data}) => { if (active) setReceiver(data); })
            .catch(() => { if (active) setError(true); });
        return () => { active = false; };
    }, [receiverId]);
    const name = receiver ? `${receiver.firstName || ''} ${receiver.lastName || ''}`.trim() || 'Murza member' : error ? 'Member unavailable' : 'Loading person…';
    return <header className="chat-header">
        <Link to="/inbox" className="chat-back">Messages</Link>
        {receiver?.userPhoto ? <img src={receiver.userPhoto} alt="" className="chat-header-avatar"/> : <span className="chat-avatar" aria-hidden="true">{name.charAt(0)}</span>}
        <div className="chat-header-info"><h2>{name}</h2><p>Discuss pickup, delivery and price.</p></div>
        {receiver && <Link to={`/profile/${receiverId}`} className="chat-profile-link">View profile</Link>}
    </header>;
};
export default ChatHeader;
