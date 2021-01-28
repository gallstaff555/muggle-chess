import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

const Profile = () => {
    const { user } = useAuth0();
    const { name, email } = user;

    return (
        <div className='profile-details'>
            <h2>{name}</h2>
            <div></div>
            <h4>{email}</h4>
        </div>
    );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
});
