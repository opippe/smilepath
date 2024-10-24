import React, { useState } from 'react';
import Image from 'next/image';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const [isCorrectModalVisible, setCorrectModalVisible] = useState(false);  // Correct answer modal state
    const [isWrongModalVisible, setWrongModalVisible] = useState(false);      // Wrong answer modal state

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

    if (quizFinished) {
        return (
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Congratulations!</h1>
                <p className="text-xl">You answered {score} out of {quiz.questions.length} correctly.</p>
            </div>
            
        );
    }

    return (
        <div className="w-full mx-auto p-5">
            {/* Correct Answer Modal */}
            <Modal isOpen={isCorrectModalVisible} onClose={goToNextQuestion}>
                <ModalContent>
                    <ModalHeader>
                        <h1 className="text-green-600">Correct!</h1>
                    </ModalHeader>
                    <ModalBody>
                        <p>You answered the question correctly.</p>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="py-2 px-4 bg-green-500 text-white rounded-lg"
                            onClick={goToNextQuestion}
                        >
                            Continue
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Wrong Answer Modal */}
            <Modal isOpen={isWrongModalVisible} onClose={goToNextQuestion} className='bg-red'>
                <ModalContent>
                    <ModalHeader>
                        <h1 className="text-red-600">Wrong!</h1>
                    </ModalHeader>
                    <ModalBody>
                        <p>The correct answer was: {currentQuestion.answers[currentQuestion.correctAnswer]}</p>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="py-2 px-4 bg-red-500 text-white rounded-lg"
                            onClick={goToNextQuestion}
                        >
                            Try Next
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Quiz Content */}
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
    );
}