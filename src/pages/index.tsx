import EmblaCarousel from "@/app/components/Carousel/EmblaCarousel";
import { EmblaOptionsType } from 'embla-carousel';
import ExpandableGrid from "@/app/components/ExpandableGrid";
import { HomeIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import unidadesData from "../api/unidades.json";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import unidadeImg from "../public/images/unidades.png"
import atividadeImg from "../public/images/atividades.png"
import Image from "next/image";
import { handleClientScriptLoad } from "next/script";
import Link from "next/link";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const OPTIONS: EmblaOptionsType = { align: 'start', slidesToScroll: 3 };

    // Flatten all atividades from each unidade for the "Atividades Recentes" section
    const allAtividades = unidadesData.unidades.flatMap(unidade => unidade.atividades);

    // Filter unidades based on search query
    const filteredUnidades = unidadesData.unidades.filter((unidade) =>
        unidade.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [userRole, setUserRole] = useState("professor"); // MOCK AUTENTICAÇÃO

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

    return (
        <div>
            <div className="flex items-center border-black-900 border-b pb-2 mb-2">
                <div className="flex">
                    <HomeIcon className="w-5 h-5"/>
                    <p className="text-black ml-1">Início</p>
                </div>
                {userRole === "professor" && <button onClick={() => setIsCreateModalVisible(true)} className="ml-auto bg-sky-900 px-2 py-1 text-white text-sm rounded-lg flex items-center">Crie algo novo<SparklesIcon className="h-4 w-4 ml-1" /></button>}
            </div>
            <p className="text-lg font-semibold">Bom dia, Guilherme!</p>

            {/* BARRA DE PESQUISA */}
            <div className="flex flex-col items-center my-10">
                {userRole === "aluno" &&
                    (<h1 className="text-2xl font-bold mb-4">O que você quer aprender hoje?</h1>)
                }
                {userRole === "professor" &&
                    (<h1 className="text-2xl font-bold mb-4">O que você quer ensinar hoje?</h1>) 
                }
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
            
            {/* ATIVIDADES RECENTES */}
            { userRole === "aluno" &&
                <div className="border-gray-200 border rounded-xl p-5 mb-10 overflow-hidden">
                    <p className="text-lg font-semibold">Atividades Recentes</p>
                    {allAtividades.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <p className="mb-4">Parece que você ainda não inicou nenhum atividade. Vamos lá!</p>
                            <button className="bg-sky-900 text-white text-sm py-2 px-3 rounded-lg">Inicie uma atividade nova</button>
                        </div>
                    ) : (
                        <EmblaCarousel slides={allAtividades} options={OPTIONS} />
                    )}
                </div>
            }
            { userRole === "professor" &&
                <div className="border-gray-200 border rounded-xl p-5 mb-10 overflow-hidden">
                    <p className="text-lg font-semibold">Últimas Atividades Criadas</p>
                    {allAtividades.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <p className="mb-4">Parece que você ainda não criou nenhum atividade. Vamos lá!</p>
                            <button onClick={() => setIsCreateModalVisible(true)} className="bg-sky-900 text-white text-sm py-2 px-3 rounded-lg">Crie uma atividade</button>
                        </div>
                    ) : (
                        <EmblaCarousel slides={allAtividades} options={OPTIONS} />
                    )}
                </div>
            }

            {/* GRID UNIDADES */}
            <div className="relative">
                <p className="text-lg font-semibold ml-3 absolute">Inicie uma nova unidade</p>
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

            {/* MODAL CRIAR UNIDADE / ATIVIDADE */}
            {userRole === "professor" && 
                <Modal
                    isOpen={isCreateModalVisible}
                    onClose={() => setIsCreateModalVisible(false)}
                    hideCloseButton
                    placement='center'
                    className="rounded-lg"
                    classNames={{
                        backdrop: "bg-black/50"
                    }}
                >
                    <ModalContent className="w-full max-w-3xl h-80" style={{ marginTop: '-4rem' }}>
                        <ModalHeader className='bg-teal-500 p-3 rounded-tl-lg rounded-tr-lg flex items-center'>
                            <h1 className="text-white text-xl font-light">O que vamos criar hoje?</h1>
                            <button onClick={() => setIsCreateModalVisible(false)} className="ml-auto px-2 text-white text-2xl font-light scale-x-125">x</button>
                        </ModalHeader>
                        <ModalBody className='bg-white px-4 py-5 flex flex-row justify-around rounded-b-lg'>
                            <Link href={"/nova_unidade"} className="w-80 h-80">
                                <Image src={unidadeImg} alt="" className="h-2/3 object-cover object-top rounded-t-lg w-80" />
                                <div className="bg-gradient-to-t from-cyan-800 to-teal-500 text-white p-3 rounded-b-lg">
                                    <p className="pb-2 text-lg">Crie uma nova unidade</p>
                                    <p className="text-xs mb-2">Defina novos temas para seus alunos</p>
                                </div>
                            </Link>
                            <Link href={"/nova_atividade"} className="w-80 h-80">
                                <Image src={atividadeImg} alt="" className="h-2/3 object-cover object-top rounded-t-lg" />
                                <div className="bg-gradient-to-t from-cyan-800 to-teal-500 text-white p-3 rounded-b-lg">
                                    <p className="pb-2 text-lg">Crie uma nova atividade</p>
                                    <p className="text-xs mb-2">Adicione exercícios interativos</p>
                                </div>
                            </Link>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </div>
    );
}