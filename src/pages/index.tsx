import EmblaCarousel from "@/app/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel'
import ImageCard from "@/app/components/ImageCard";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Home() {
    const [atividades, setAtividades] = useState([
        { title: 'Anatomia Dental', slug: 'anatomia_dental', time: '2h' }, 
        { title: 'Periodontia', slug: 'periodontia', time: '1h 45m' },
        { title: 'Endodontia', slug: 'endodontia', time: '1h 30m' }, 
        { title: 'Prótese Dentária', slug: 'protese_dentaria', time: '2h 15m' },
        { title: 'Radiologia Odontológica', slug: 'radiologia_odontologica', time: '1h 20m' },
        { title: 'Ortodontia', slug: 'ortodontia', time: '2h 30m' },
    ]);
    
    const [unidades, setUnidades] = useState([
        { title: 'Anatomia Dental', slug: 'anatomia_dental', time: '2h' },
        { title: 'Periodontia', slug: 'periodontia', time: '1h 45m' },
        { title: 'Endodontia', slug: 'endodontia', time: '1h 30m' },
        { title: 'Prótese Dentária', slug: 'protese_dentaria', time: '2h 15m' },
        { title: 'Radiologia Odontológica', slug: 'radiologia_odontologica', time: '1h 20m' },
        { title: 'Ortodontia', slug: 'ortodontia', time: '2h 30m' },
    ]);

    const [searchTerm, setSearchTerm] = useState("");  // Search term state

    const OPTIONS: EmblaOptionsType = { align: 'start', slidesToScroll: 1 };

    // Filter units based on search query
    const filteredUnidades = unidades.filter((unidade) => 
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
                        value={searchTerm}  // Bind searchTerm state to input value
                        onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm on input change
                        className="w-full p-2 pl-4 border border-cyan-10 text-black rounded-l-lg focus-visible:rounded-r-none focus:outline-none focus:border focus:border-sky-950"
                    />
                    <button className="bg-sky-950 p-2 rounded-r-lg flex items-center justify-center w-10">
                        <MagnifyingGlassIcon className="text-white" />
                    </button>
                </div>
            </div>
            
            <div className="border-gray-200 border rounded-xl p-5 mb-10">
                <p className="text-lg font-semibold">Atividades Recentes</p>
                { atividades.length === 0 ? 
                    (
                        <div className="flex flex-col items-center">
                            <p className="mb-4">Parece que você ainda não inicou nenhum atividade. Vamos lá!</p>
                            <button className="bg-sky-900 text-white text-sm py-2 px-3 rounded-lg">Inicie uma atividade nova</button>
                        </div>
                    ) : (
                        <div className="flex">
                            <EmblaCarousel slides={atividades} options={OPTIONS} />
                        </div>
                    )
                }
            </div>

            <div>
                <p className="text-lg font-semibold mb-5 ml-3">Inicie uma nova unidade</p>
                {/* Render filtered unidades */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {filteredUnidades.map((unidade) => (
                        <ImageCard key={unidade.title} title={unidade.title} time={unidade.time} slug={unidade.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}