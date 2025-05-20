import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import dotenv from 'dotenv';
// dotenv.config();
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl);
// Types
interface RawQuestion {
  _id: string;
  type: 'text' | 'paragraph' | 'rating' | 'checkbox' | 'multipleChoice';
  text: string;
  required: boolean;
  options?: string[];
  id?: string;  // since your data also has `id`
}
interface Question {
  _id: string;
  questionText: string;
  questionType: 'text' | 'paragraph' | 'rating' | 'checkbox' | 'multipleChoice';
  isRequired: boolean;
  options?: string[];
}

interface FeedbackFormData {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  eventId: string;
  eventTitle: string;
}

type AnswerValue = string | number | string[];

const FeedbackForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<FeedbackFormData | null>(null);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
useEffect(() => {
  const fetchForm = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/feedback/form/${id}`);

      const transformedQuestions = response.data.questions.map((q: RawQuestion) => ({
        ...q,
        questionType: q.type,
        questionText: q.text,
        isRequired: q.required
      }));

      setForm({
        ...response.data,
        questions: transformedQuestions
      });

    } catch (err) {
      console.error("Error fetching form:", err);
      setError('Failed to load form');
    }
  };

  fetchForm();
}, [id]);

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return {
        ...prev,
        [questionId]: updated,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/feedback/form/${id}/submit`, {
        clientEmail: email,
        answers,
      });
      setSubmitted(true);
    } catch (err) {
      setError('Submission failed');
    }
  };

  if (submitted) {
    return <div className="container max-w-2xl mx-auto py-16 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-600">Thank You!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <p className="text-lg mb-2">Your feedback for has been submitted successfully.</p>
              <p className="text-muted-foreground">We appreciate your time and valuable insights.</p>
            </>
          )}
        </CardContent>
        
      </Card>
    </div>
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {form ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          <p className="text-gray-600 mb-6">{form.description}</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block font-semibold mb-1">Your Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            {form.questions.map((q) => (
              <div key={q._id} className="mb-4">
                <label className="block font-semibold mb-1">
                  {q.questionText} {q.isRequired && <span className="text-red-500">*</span>}
                </label>

                {/* Text input */}
                {q.questionType === 'text' && (
                  <input
                    type="text"
                    value={typeof answers[q._id] === 'string' ? answers[q._id] : ''}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                    required={q.isRequired}
                    className="w-full border p-2 rounded"
                  />
                )}

                {q.questionType === 'rating' && (
  <div className="flex items-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => {
      const rating = Number(answers[q._id] || 0); // Safe cast to number
      return (
        <button
          key={star}
          type="button"
          onClick={() => handleAnswerChange(q._id, star)}
          className={`text-2xl ${
            rating >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      );
    })}
  </div>
)}


                {/* Multiple Choice (radio) */}
                {q.questionType === 'multipleChoice' && q.options?.map((option) => {
  const selectedOptions = answers[q._id] as string[] || [];

  return (
    <div key={option} className="flex items-center mb-1">
      <input
        type="checkbox"
        name={`${q._id}-${option}`}
        value={option}
        checked={selectedOptions.includes(option)}
        onChange={() => {
  const existing = Array.isArray(answers[q._id]) ? answers[q._id] as string[] : [];

  const updatedSelection = existing.includes(option)
    ? existing.filter((opt) => opt !== option)
    : [...existing, option];

  handleAnswerChange(q._id, updatedSelection);
}}
        required={q.isRequired && selectedOptions.length === 0}
        className="mr-2"
      />
      <label>{option}</label>
    </div>
  );
})}


                {/* Checkbox */}
                {/* {q.questionType === 'checkbox' && q.options?.map((option) => (
                  <div key={option} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      value={option}
                      checked={Array.isArray(answers[q._id]) && (answers[q._id] as string[]).includes(option)}
                      onChange={() => handleCheckboxChange(q._id, option)}
                      className="mr-2"
                    />
                    <label>{option}</label>
                  </div>
                ))} */}
                {q.questionType === 'checkbox' && (
  <div className="flex space-x-4">
    {['Yes', 'No'].map((option) => (
      <label key={option} className="flex items-center space-x-2">
        <input
          type="radio"
          name={q._id}
          value={option}
          checked={answers[q._id] === option}
          onChange={() => handleAnswerChange(q._id, option)}
          required={q.isRequired}
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
)}

              </div>
            ))}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Submit
            </button>
          </form>
        </>
      ) : (
        <div>Loading form...</div>
      )}
    </div>
  );
};

export default FeedbackForm;
