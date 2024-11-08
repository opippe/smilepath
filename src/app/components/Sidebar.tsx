// /app/components/Sidebar.tsx
import { useRouter } from 'next/router';
import { HomeIcon, BookOpenIcon, TrophyIcon, ClipboardIcon, UserIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const router = useRouter();
    
    const navItems = [
        { name: 'Início', path: '/', icon: HomeIcon },
        { name: 'Unidades', path: '/unidades', icon: BookOpenIcon },
        { name: 'Minha Atividade', path: '/minha_atividade', icon: ClipboardIcon },
        // { name: 'Conquistas', path: '/conquistas', icon: TrophyIcon },
        { name: 'Perfil', path: '/perfil', icon: UserIcon },
    ];

    return (
        <aside className="fixed w-64 h-screen bg-slate-200 text-black p-4">
            <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                    const isActive = router.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.name}
                            href={item.path}
                            className={`flex items-center space-x-2 p-2 rounded hover:bg-slate-100
                                ${isActive ? 'bg-teal-600 text-white hover:bg-teal-600 hover:text-white' : ''}
                            `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-teal-500'}`} />
                            <span>{item.name}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;

