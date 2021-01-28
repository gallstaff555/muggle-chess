import React from "react";
import AuthenticationButton from "./AuthenticationButton";

const Navbar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-success'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='/'>
                    Muggle Chess
                </a>
                <AuthenticationButton />
            </div>
        </nav>
    );
};

export default Navbar;
