import React, { useState } from 'react';
import Image from 'next/image';
import wrong_answer from '../../public/images/wrong-answer.png';
import correct_answer from '../../public/images/correct-answer.png';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { useRouter } from 'next/router';  // Import Next.js router
import { BookOpenIcon } from '@heroicons/react/24/solid';
import { CircularProgress } from '@nextui-org/progress';

interface Question {
    question: string;
    answers: string[];
    correctAnswer: number;
}

interface Quiz {
    slug: string;
    title: string;
    image: string;
    questions: Question[];
}

interface AtividadeProps {
    quiz: Quiz;
}

export default function Atividade({ quiz }: AtividadeProps) {
    const router = useRouter();  // Initialize Next.js router
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const [isCorrectModalVisible, setCorrectModalVisible] = useState(false);
    const [isWrongModalVisible, setWrongModalVisible] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleSelectAnswer = (index: number) => {
        setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(score + 1);
            setCorrectModalVisible(true);  // Show correct answer modal
        } else {
            setWrongModalVisible(true);    // Show wrong answer modal
        }
    };

    const handleSkipQuestion = () => {
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        } else {
            setQuizFinished(true);
        }
        setCorrectModalVisible(false);  // Close modals after going to the next question
        setWrongModalVisible(false);
    };

    // Handle quitting the quiz and resetting progress
    const handleQuitQuiz = () => {
        // Reset the quiz state
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizFinished(false);
        // Redirect to the home page
        router.push('/');
    };

    if (quizFinished) {
        return (
            <div className="text-center mt-36">
                <h1 className="text-3xl font-semibold mb-4">Atividade Finalizada!</h1>
                <p className="text-xl mb-4">Você respondeu {score} de {quiz.questions.length} questões corretamente.</p>
                <div className='relative'>
                    <CircularProgress
                        className='mx-auto'
                        classNames={{
                            svg: "w-56 h-56 drop-shadow-md",
                            indicator: "stroke-teal-500",
                            track: "stroke-black/10",
                        }}
                        value={(score/quiz.questions.length*100)}
                        strokeWidth={4}
                    />
                    <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-5xl" style={{ fontFamily: 'Nunito', letterSpacing: '2px' }}>{score}/{quiz.questions.length}</p>
                </div>

                <button
                    className="mt-8 py-2 px-4 border-2 border-sky-950 text-sky-950 font-semibold w-6/12 rounded-lg"
                    onClick={handleQuitQuiz} 
                >
                    Sair da Atividade
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex border-black-900 border-b pb-2 mb-2 relative ">
                <BookOpenIcon className="w-5 h-5" />
                <p className="text-black ml-6 absolute bottom-1.5">{quiz.title}</p>

                <div className="text-right absolute right-0 bottom-1.5">
                    <button
                        className="py-1 px-2 border-2 border-sky-950 text-sky-950 font-semibold text-sm rounded-lg"
                        onClick={handleQuitQuiz}
                    >
                        Sair da Atividade
                    </button>
                </div>
            </div>

            {/* Correct Answer Modal */}
            <Modal
                isOpen={isCorrectModalVisible}
                onClose={goToNextQuestion}
                hideCloseButton={true}
                placement='center'
                className="rounded-lg"
                classNames={{
                    backdrop: "bg-black/50"
                }}
            >
                <ModalContent className="w-full max-w-md h-80" style={{ marginTop: '-10.5rem' }}> 
                    <Image src={correct_answer} alt="not-found" className='w-72 mx-auto' />
                    <ModalHeader className='bg-teal-500 p-2 rounded-tl-lg rounded-tr-lg'>
                        <h1 className="text-white text-xl">Continue assim!</h1>
                    </ModalHeader>
                    <ModalBody className='bg-white px-4 pt-4 pb-10'>
                        <p>Você está indo muito bem!</p>
                    </ModalBody>
                    <ModalFooter className='bg-white rounded-bl-lg rounded-br-lg p-4'>
                        <button
                            className="border-2 border-sky-950 text-sky-950 font-semibold py-1 px-3 rounded-lg"
                            onClick={goToNextQuestion}
                        >
                            Ver explicação
                        </button>
                        <button
                            className="py-2 px-4 bg-sky-950 text-white rounded-lg w-5/12 ml-auto"
                            onClick={goToNextQuestion}
                        >
                            Continuar
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Wrong Answer Modal */}
            <Modal
                isOpen={isWrongModalVisible}
                onClose={goToNextQuestion}
                hideCloseButton={true}
                placement='center'
                className="rounded-lg"
                classNames={{
                    backdrop: "bg-black/50"
                }}
            >
                <ModalContent className="w-full max-w-md h-80" style={{ marginTop: '-4rem' }}>
                    <Image src={wrong_answer} alt="not-found" className='w-96 mx-auto' />
                    <ModalHeader className='bg-teal-500 p-2 rounded-tl-lg rounded-tr-lg'>
                        <h1 className="text-white text-xl">Resposta errada!</h1>
                    </ModalHeader>
                    <ModalBody className='bg-white px-4 pt-4 pb-10'>
                        <p>A resposta certa era: {currentQuestion.answers[currentQuestion.correctAnswer]}</p>
                    </ModalBody>
                    <ModalFooter className='bg-white rounded-bl-lg rounded-br-lg p-4'>
                        <button
                            className="border-2 border-sky-950 text-sky-950 font-semibold py-1 px-3 rounded-lg"
                            onClick={goToNextQuestion}
                        >
                            Ver explicação
                        </button>
                        <button
                            className="py-2 px-4 bg-sky-950 text-white rounded-lg w-5/12 ml-auto"
                            onClick={goToNextQuestion}
                        >
                            Continuar
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Quiz Content */}
            <div className='p-10'>
                <p className="text-2xl font-bold mb-4 text-center">{currentQuestion.question}</p>
                <img
                    src={quiz.image}
                    alt="Quiz Image"
                    width={'100%'}
                    className="rounded-lg mx-auto mb-4 h-80 object-cover"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.answers.map((answer, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            className={`p-4 border rounded-lg ${
                                selectedAnswer === index ? 'bg-teal-500 text-white' : 'bg-white'
                            }`}
                        >
                            {answer}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleSkipQuestion}
                        className="border-2 border-sky-950 text-sky-950 font-semibold py-1 px-3 rounded-lg"
                    >
                        Pular
                    </button>

                    <button
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className={`py-1 px-3 rounded-lg ${
                            selectedAnswer !== null ? 'bg-sky-950 text-white' : 'bg-gray-300'
                        }`}
                    >
                        Enviar Resposta
                    </button>
                </div>
            </div>
        </div>
    );
}