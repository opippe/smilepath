// pages/unidades/[slug].tsx

import { useRouter } from "next/router";
import ExpandableGrid from "@/app/components/ExpandableGrid";
import unidadesData from "../../api/unidades.json";
import { CircularProgress } from "@nextui-org/progress";
import { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/solid";

export default function Unidade() {
    const router = useRouter();
    const { slug } = router.query;

    const [materiais, setMateriais] = useState(false)

    // Find the specific unidade based on the slug
    const unidade = unidadesData.unidades.find((item) => item.slug === slug);

    if (!unidade) return <p>Unidade not found.</p>;

    return (
        <div className="p-5">
            <div className="flex border-black-900 border-b pb-2 mb-2 relative">
                <BookOpenIcon className="w-5 h-5" />
                <p className="text-black ml-1 text-black ml-6 absolute bottom-1.5">Unidades / {unidade.title}</p>
            </div>
            <h1 className="text-2xl font-bold my-4">{unidade.title}</h1>

            <div className="flex justify-between mb-10">
                <div className="border-gray-200 border rounded-xl p-5 w-full">
                    <p className="font-semibold text-lg mb-3">Meu Progresso</p>
                    <div className="flex relative items-center">
                        {/* CircularProgress with centered value */}
                        <CircularProgress
                            classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                indicator: "stroke-teal-500",
                                track: "stroke-black/10",
                                value: "text-3xl font-semibold text-black",
                            }}
                            value={90}
                            strokeWidth={4}
                            showValueLabel={true}
                        />
                        {/* Value in the center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                        </div>
                        <p className="mx-auto w-1/3 text-center">Você concluiu 9 de 10 unidades.</p>
                    </div>
                </div>
                <div className="border-gray-200 border rounded-xl p-5 w-full ml-5 flex flex-col justify-between">
                    <p className="font-semibold text-lg">Ranking</p>
                    <div className="flex">
                        <p className="text-5xl font-bold mr-5">15°</p>
                        <p className="text-center">Você está em 15° lugar entre os alunos.</p>
                    </div>
                    <button className="bg-sky-950 text-white w-full rounded-md p-2">Ver ranking</button>
                </div>
                <div className="border-gray-200 border rounded-xl p-5 w-full ml-5 grid">
                    <p className="font-semibold text-lg">Teste Final</p>
                    <p className="text-center justify-self-center">Complete todas as atividades para realizar uma prova e emitir o seu certificado.</p>
                </div>
            </div>

            <div className="border-gray-200 border rounded-xl p-5 mb-10 overflow-hidden">
                <p className="font-semibold text-lg">Materiais Complementares</p>
                {materiais ? (
                        <p></p>
                    ) : (
                        <p className="text-center mt-4">Seu professor ainda não publicou nenhum material complementar.</p>
                    )
                }
            </div>

            <p className="text-xl font-semibold ml-2">Atividades</p>
            <div>
                {unidade.atividades && (
                    <ExpandableGrid
                        items={unidade.atividades.map((atividade) => ({
                            title: atividade.title,
                            basePath: "/quiz",
                            slug: atividade.slug,
                            time: atividade.time,
                        }))}
                        itemsPerRow={5}
                    />
                )}
            </div>
        </div>
    );
}
