
import { Question } from "@/types/form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface CheckboxQuestionProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
}

const CheckboxQuestion = ({ question, value, onChange }: CheckboxQuestionProps) => {
  const handleCheckboxChange = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </Label>
      <div className="space-y-2">
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${question.id}-${option}`}
              checked={value.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <Label
              htmlFor={`${question.id}-${option}`}
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
