
import { Question } from "@/types/form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface MultipleChoiceQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

const MultipleChoiceQuestion = ({
  question,
  value,
  onChange,
}: MultipleChoiceQuestionProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
            <Label
              htmlFor={`${question.id}-${option}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MultipleChoiceQuestion;
