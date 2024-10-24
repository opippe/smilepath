import { PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { users_data } from "@/api/users";
import React from "react";
import { CircularProgress } from "@nextui-org/progress";
import AchievementCard from "@/app/components/AchievementCard";

export default function Perfil() {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="flex border-black-900 border-b pb-2 mb-2">
                <UserIcon className="w-5 h-5" />
                <p className="text-black ml-1">Perfil</p>
            </div>
            <p className="text-xl font-semibold mb-2">Informações Básicas</p>
            <div className="border-gray-200 border rounded-xl p-5 mb-10">
                <div className="flex items-center">
                    <Image
                        src={users_data[0].avatar}
                        alt="Profile Picture"
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                    />
                    <div>
                        <p className="font-bold text-lg">{users_data[0].nome} {users_data[0].sobrenome}</p>
                        <a href="" className="underline text-sky-500">{users_data[0].email}</a>
                    </div>
                    <button className="bg-sky-950 p-2 flex items-center justify-center w-10 ml-auto rounded-lg">
                        <PencilIcon className="text-white" />
                    </button>
                </div>
            </div>
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
                            value={value}
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
                    <p className="font-semibold text-lg">Desempenho</p>
                    <div className="flex">
                        <p className="text-5xl font-bold mr-5">6</p>
                        <p className="text-center">Você está entre os 3 melhores em 6 unidades diferentes. Continue assim!</p>
                    </div>
                    <button className="bg-sky-950 text-white w-full rounded-md p-2">Ver ranking</button>
                </div>
                <div className="border-gray-200 border rounded-xl p-5 w-full ml-5 grid">
                    <p className="font-semibold text-lg">Teste Final</p>
                    <p className="text-center justify-self-center">Complete todas as atividades para realizar uma prova e emitir o seu certificado.</p>
                </div>
            </div>
            <div className="border-gray-200 border rounded-xl p-5">
                <p className="font-semibold text-lg">Conquistas</p>
                <AchievementCard title="Jogador ativo" description="Faça login por 7 dias." progress={5} image="aa" />
                <AchievementCard title="Jogador ativo" description="Faça login por 7 dias." progress={5} image="aa" />
                <AchievementCard title="Jogador ativo" description="Faça login por 7 dias." progress={5} image="aa" />
            </div>
        </div>
    );
}
