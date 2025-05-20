
import { Question } from "@/types/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TextQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

const TextQuestion = ({ question, value, onChange }: TextQuestionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={question.id} className="text-base font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={question.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={question.required}
        placeholder="Type your answer here"
        className="w-full"
      />
    </div>
  );
};

export default TextQuestion;
