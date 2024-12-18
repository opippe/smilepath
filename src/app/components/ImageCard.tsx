import { ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface ImageCardProps {
    title: string | null;
    slug: string;
    time: string | number;
    basePath: string;
}

const ImageCard = ({ title, slug, time, basePath }: ImageCardProps) => {
    return (
        <Link href={`${basePath}/${slug}`} className="block rounded-lg bg-white shadow-secondary-1 text-surface m-2 drop-shadow-lg h-64 max-w-80 hover:scale-105 transition ease-in-out">
            <div className="relative overflow-hidden bg-cover bg-no-repeat h-2/3">
                <img
                    className="rounded-t-lg h-full w-full object-cover"
                    src="https://tecdn.b-cdn.net/img/new/slides/041.webp"
                    alt="" />
            </div>
            <div className="p-4 h-1/3">
                <h5 className="mb-2 text-l font-medium leading-tight">
                    {title}
                </h5>
                <div className='flex items-center'>
                    <ClockIcon className='text-teal-500 w-4 h-4 mr-1' />
                    <p className="text-base text-surface/75 dark:text-neutral-300">
                        {time}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default ImageCard;
