import { useState } from "react";
import ImageCard from "./ImageCard";

interface Item {
    title: string;
    basePath: string;
    slug: string;
    time: string;
}

interface ExpandableGridProps {
    items: Item[];
    itemsPerRow?: number;
}

export default function ExpandableGrid({ items, itemsPerRow = 5 }: ExpandableGridProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const visibleItems = isExpanded ? items : items.slice(0, itemsPerRow);

    return (
        <div className="relative">
            {/* Button to toggle expansion */}
            {items.length > itemsPerRow && (
                <button
                    className="absolute top-0 right-3 px-2 rounded-lg text-sky-950 font-medium border-2 border-sky-950"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                </button>
            )}
            {/* Animated grid */}
            <div
                style={{
                    maxHeight: isExpanded ? "none" : "calc(100% / 5)",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out",
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full mt-10 pb-4">
                    {visibleItems.map((item) => (
                        <ImageCard key={item.slug} title={item.title} time={item.time} basePath={item.basePath} slug={item.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}