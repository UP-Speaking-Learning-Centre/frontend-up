import React from 'react';
import HeaderTitle from './title';

const Header = () => {
    return (
        <div className="[grid-area:header] bg-white border-b flex items-center justify-between px-4">
            <HeaderTitle />
        </div>
    );
};

export default Header;
