// /pages/quiz/[slug].tsx
import { useRouter } from 'next/router';
import quizData from '@/api/quiz.json'; // Import the quiz JSON data
import Atividade from '../../app/components/Atividade'; // The quiz component

export default function QuizPage() {
    const router = useRouter();
    const { slug } = router.query;  // Get the dynamic slug from the URL

    if (!slug) {
        return <p>Loading...</p>;  // Handle loading state
    }

    // Find the quiz by its slug in the quizData
    const quiz = quizData.find((q) => q.slug === slug);

    if (!quiz) {
        return <p>Quiz not found</p>;  // Handle case where no quiz is found with the given slug
    }

    return (
        <div>
            <Atividade quiz={quiz} />
        </div>
    );
}
