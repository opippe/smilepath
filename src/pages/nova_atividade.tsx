import { SparklesIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import placeholderImg from "../public/images/placeholder.png";
import Image from "next/image";

export default function NovaAtividade() {
    const [selectedUnidade, setSelectedUnidade] = useState("");
    const [questions, setQuestions] = useState([
        { text: "", answers: ["", "", "", ""], score: "", timeLimit: 15, isMandatory: "nao" }
    ]);

    const handleUnidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUnidade(e.target.value);

    const addQuestion = () => {
        setQuestions([...questions, { text: "", answers: ["", "", "", ""], score: "", timeLimit: 15, isMandatory: "nao" }]);
    };

    const deleteQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleQuestionChange = (index: number, field: string, value: string | number) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((question, i) =>
                i === index ? { ...question, [field]: value } : question
            )
        );
    };

    const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
        setQuestions(prevQuestions =>
            prevQuestions.map((question, i) => {
                if (i === questionIndex) {
                    const newAnswers = [...question.answers];
                    newAnswers[answerIndex] = value;
                    return { ...question, answers: newAnswers };
                }
                return question;
            })
        );
    };

    const generateQuizJSON = () => {
        const quizData = {
            unidade: selectedUnidade,
            questions: questions.map((q) => ({
                text: q.text,
                answers: q.answers,
                score: q.score,
                timeLimit: q.timeLimit,
                isMandatory: q.isMandatory,
            })),
        };
        console.log("Quiz JSON:", JSON.stringify(quizData, null, 2)); // Prepare JSON for POST
    };

    return (
        <div className="flex justify-between min-h-screen">
            {/* Left Sidebar */}
            <div className="border-r-2 min-h-screen pr-4 w-1/5">
                <div className="pb-5 mb-5 border-b-2">
                    <h5 className="font-semibold">Unidade</h5>
                    <select className="text-sm w-full p-2 border-2 rounded-lg" value={selectedUnidade} onChange={handleUnidadeChange}>
                        <option disabled value="">Para qual unidade esta atividade irá?</option>
                        <option value="Unidade 1">Unidade 1</option>
                        <option value="Unidade 2">Unidade 2</option>
                    </select>
                </div>
                <div className="pb-5 mb-5 border-b-2">
                    <h5 className="font-semibold">Questões</h5>
                    {questions.map((question, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <p className="mr-2 min-w-3">{index + 1}.</p>
                            <input
                                className="w-full p-2 border-2 rounded-lg text-sm"
                                type="text"
                                placeholder="Defina o enunciado da questão"
                                value={question.text}
                                onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                            />
                            <button
                                onClick={() => deleteQuestion(index)}
                                className="ml-2 text-red-500 border-2 border-red-500 rounded-lg p-1"
                            >
                                <TrashIcon className="w-6 h-6" />
                            </button>
                        </div>
                    ))}
                </div>
                <button onClick={addQuestion} className="p-1 rounded-lg border-2 border-sky-900 text-sky-900 font-bold w-full">
                    Adicionar questão
                </button>
            </div>

            {/* Main Content */}
            <div className='px-10 w-3/5'>
                <div className="flex border-black-900 border-b pb-2 mb-10">
                    <SparklesIcon className="w-5 h-5"/>
                    <p className="text-black ml-1">Nova Atividade</p>
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="mb-8 border-b-3">
                        <div className="text-2xl font-semibold mb-4 text-center border-2 p-2 rounded-lg flex flex-row justify-between align-center px-6">
                            <p className="font-semibold">{index + 1}.</p>
                            <p>{question.text || "Enunciado da Questão"}</p>
                            <div className="invisible">4.</div>
                        </div>
                        <Image src={placeholderImg} alt="Quiz Image" className="rounded-lg w-full mb-4 h-80 object-cover"/>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {question.answers.map((answer, answerIndex) => (
                                <input
                                    key={answerIndex}
                                    type="text"
                                    placeholder={`Digite a alternativa ${String.fromCharCode(65 + answerIndex)}`}
                                    className="p-4 border rounded-lg"
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Sidebar */}
            <div className="border-l-2 min-h-screen pl-4 w-1/5">
                <div className="pb-5 mb-5 border-b-2">
                    <h5 className="font-semibold">Pontuação</h5>
                    <input
                        type="number"
                        className="w-full border-2 rounded-lg p-2"
                        placeholder="Quanto vale esta questão?"
                        onChange={(e) => handleQuestionChange(questions.length - 1, "score", Number(e.target.value))}
                    />
                </div>
                <div className="pb-5 mb-5 border-b-2">
                    <h5 className="font-semibold">Tempo de Resposta</h5>
                    <select
                        className="w-full p-2 border-2 rounded-lg"
                        onChange={(e) => handleQuestionChange(questions.length - 1, "timeLimit", Number(e.target.value))}
                    >
                        <option value={15}>15 Segundos</option>
                        <option value={30}>30 Segundos</option>
                        <option value={45}>45 Segundos</option>
                        <option value={60}>1 Minuto</option>
                    </select>
                </div>
                <div className="pb-5 mb-5 border-b-2">
                    <h5 className="font-semibold">Questão Obrigatória?</h5>
                    <select
                        className="w-full p-2 border-2 rounded-lg"
                        onChange={(e) => handleQuestionChange(questions.length - 1, "isMandatory", e.target.value)}
                    >
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                    </select>
                </div>
                <button onClick={generateQuizJSON} className="p-1 rounded-lg border-2 border-sky-900 text-sky-900 font-bold w-full">
                    Finalizar Atividade
                </button>
            </div>
        </div>
    );
}
