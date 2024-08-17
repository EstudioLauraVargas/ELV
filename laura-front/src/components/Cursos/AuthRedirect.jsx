import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { requestOAuthAuthorization } from '../../Redux/Actions/actions';

const AuthRedirect = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestOAuthAuthorization());
    }, [dispatch]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Redirecting to Google for authorization...</p>
        </div>
    );
};

export default AuthRedirect;
