// pages/Home.tsx

import EmblaCarousel from "@/app/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import ExpandableGrid from "@/app/components/ExpandableGrid";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import unidadesData from "../api/unidades.json";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const OPTIONS: EmblaOptionsType = { align: 'start', slidesToScroll: 3 };

    // Flatten all atividades from each unidade for the "Atividades Recentes" section
    const allAtividades = unidadesData.unidades.flatMap(unidade => unidade.atividades);

    // Filter unidades based on search query
    const filteredUnidades = unidadesData.unidades.filter((unidade) =>
        unidade.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex border-black-900 border-b pb-2 mb-2">
                <HomeIcon className="w-5 h-5"/>
                <p className="text-black ml-1">Início</p>
            </div>
            <p className="text-lg font-semibold">Bom dia, Guilherme!</p>
            <div className="flex flex-col items-center my-10">
                <h1 className="text-2xl font-bold mb-4">O que você quer aprender hoje?</h1>
                <div className="flex w-2/3">
                    <input
                        type="text"
                        placeholder="O que você quer aprender hoje?"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-4 border border-cyan-10 text-black rounded-l-lg focus-visible:rounded-r-none focus:outline-none focus:border focus:border-sky-950"
                    />
                    <button className="bg-sky-950 p-2 rounded-r-lg flex items-center justify-center w-10">
                        <MagnifyingGlassIcon className="text-white" />
                    </button>
                </div>
            </div>
            
            <div className="border-gray-200 border rounded-xl p-5 mb-10 overflow-hidden">
                <p className="text-lg font-semibold">Atividades Recentes</p>
                {allAtividades.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <p className="mb-4">Parece que você ainda não inicou nenhum atividade. Vamos lá!</p>
                        <button className="bg-sky-900 text-white text-sm py-2 px-3 rounded-lg">Inicie uma atividade nova</button>
                    </div>
                ) : (
                    <div className="flex max-w-full mx-auto overflow-hidden">
                        <EmblaCarousel slides={allAtividades} options={OPTIONS} />
                    </div>
                )}
            </div>

            {/* Use ExpandableGrid component to display unidades */}
            <ExpandableGrid
                items={filteredUnidades.map((unidade) => ({
                    title: unidade.title,
                    slug: unidade.slug,
                    time: unidade.time,
                    basePath: "/unidades" // Set base path to "/unidades"
                }))}
                itemsPerRow={5}
            />
        </div>
    );
}
