import { ClipboardIcon } from "@heroicons/react/24/solid";
import not_found from '../public/images/not-found.png'
import Image from "next/image";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useState } from "react";
import ImageCard from "@/app/components/ImageCard";

export default function MinhaAtividade() {
    const [unidades, setUnidades] = useState([
        { title: 'Anatomia Dental', slug: '/unidades', time: '2h' },
        { title: 'Periodontia', slug: '/unidades', time: '1h 45m' },
        { title: 'Endodontia', slug: '/unidades', time: '1h 30m' },
        { title: 'Prótese Dentária', slug: '/unidades', time: '2h 15m' },
        { title: 'Radiologia Odontológica', slug: '/unidades', time: '1h 20m' },
        { title: 'Ortodontia', slug: '/unidades', time: '2h 30m' },
    ]);

    const [unidadesConcluidas, setUnidadesConcluidas] = useState([]);
    const [atividadesCriadas, setAtividadesCriadas] = useState([]);

    return (
        <div>
            <div className="flex border-black-900 border-b pb-2 mb-2">
                <ClipboardIcon className="w-5 h-5" />
                <p className="text-black ml-1">Minha Atividade</p>
            </div>
            
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 ",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12 focus-visible:outline-0",
                        tabContent: "group-data-[selected=true]:text-sky-500 group-data-[selected=true]:border-b-3 border-sky-500 ease-linear duration-100"
                    }}
                >
                    <Tab key="em_progresso" title={<div className="flex items-center space-x-2"><span>Em Progresso</span></div>}>
                        {unidades.length === 0 ? (
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <Image src={not_found} alt="not-found" />
                                <p>Parece que você ainda não iniciou nenhuma unidade.</p>
                                <button className="bg-sky-950 py-2 px-4 text-white rounded-lg flex items-center justify-center">Encontre uma unidade</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                                {unidades.map((unidade) => (
                                    <ImageCard key={unidade.title} title={unidade.title} time={unidade.time} slug={unidade.slug} />
                                ))}
                            </div>
                        )}
                    </Tab>
                    <Tab key="concluidas" title={<div className="flex items-center space-x-2"><span>Concluídas</span></div>}>
                        {unidadesConcluidas.length === 0 ? (
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <Image src={not_found} alt="not-found" />
                                <p>Parece que você ainda não concluiu nenhuma unidade.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                                {unidadesConcluidas.map((unidade) => (
                                    <ImageCard key={unidade.title} title={unidade.title} time={unidade.time} slug={unidade.slug} />
                                ))}
                            </div>
                        )}
                    </Tab>
                    <Tab key="criadas" title={<div className="flex items-center space-x-2"><span>Criadas</span></div>}>
                        {atividadesCriadas.length === 0 ? (
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <Image src={not_found} alt="not-found" />
                                <p>Parece que você ainda não criou nenhuma atividade.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                                {atividadesCriadas.map((atividade) => (
                                    <ImageCard key={atividade.title} title={atividade.title} time={atividade.time} slug={atividade.slug} />
                                ))}
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}