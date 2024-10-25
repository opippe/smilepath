import ExpandableGrid from "@/app/components/ExpandableGrid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import unidadesData from "../api/unidades.json"
import { useRouter } from "next/router";

export default function Unidades() {
    const router = useRouter();

    const handleCardClick = (slug: string) => {
        router.push(`/unidades/${slug}`);
    };

    return (
        <div>
            <div className="flex border-black-900 border-b pb-2 mb-2 relative">
                <BookOpenIcon className="w-5 h-5" />
                <p className="text-black ml-6 absolute bottom-1.5">Unidades</p>
            </div>
            <p className="text-xl font-semibold mb-2">O que você quer aprender hoje?</p>

            <div>
                <ExpandableGrid
                items={unidadesData.unidades.map((unidade) => ({
                    ...unidade,
                    basePath: "/unidades",
                    onClick: () => handleCardClick(unidade.slug),
                }))}
                itemsPerRow={5}
            />
            </div>
        </div>
    );
}