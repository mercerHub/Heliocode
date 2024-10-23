import { NavLink } from 'react-router-dom';

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
        name: 'Merge ASTs',
        url: '/merge-asts'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
];

function Navbar() {
    return (
        <header className="flex backdrop-blur-lg bg-white/30 items-center p-2 sticky top-0 justify-center w-full">
            <nav className="flex">
                <ul className="flex gap-4">
                    {NavbarItems.map((item, index) => (
                        <NavLink
                            to={item.url}
                            key={index}
                            className={({ isActive }) => 
                                `font-semibold py-1 px-2 transition-all duration-300 cursor-pointer ease-in-out ${
                                    isActive 
                                        ? 'text-gray-800 border-b-2 border-b-sky-200' 
                                        : 'hover:text-gray-700'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
