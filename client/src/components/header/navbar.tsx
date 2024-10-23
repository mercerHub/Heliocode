import { useState, useEffect } from 'react';

interface NavbarItemsInterface {
    name: string;
    url: string;
}

const NavbarItems: NavbarItemsInterface[] = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
];

function Navbar() {
    const [activeUrl, setActiveUrl] = useState<string>(window.location.pathname);

    useEffect(() => {
        // Update active link on page load or navigation change
        const handleLocationChange = () => setActiveUrl(window.location.pathname);

        window.addEventListener('popstate', handleLocationChange);  // Handles browser back/forward navigation
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
        };
    }, []);

    const handleLinkClick = (url: string) => {
        setActiveUrl(url);
    };

    return (
        <>
            <header className='flex bg-black min-h-[10vh] text-gray-400 items-center p-5 sticky top-0 justify-center'>
                <nav className='flex'>
                    <ul className='flex gap-4'>
                        {NavbarItems.map((item, index) => (
                            <li
                                key={index}
                                className={`font-semibold py-2 px-4 rounded-xl transition-all duration-300 cursor-pointer ease-in-out ${
                                    activeUrl === item.url ? 'text-white' : 'hover:text-white'
                                }`}
                                onClick={() => handleLinkClick(item.url)}
                            >
                                <a className='text-lg' href={item.url}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
