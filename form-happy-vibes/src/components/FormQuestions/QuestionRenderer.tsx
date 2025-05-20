
import { Question } from "@/types/form";
import TextQuestion from "./TextQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import RatingQuestion from "./RatingQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

const QuestionRenderer = ({ question, value, onChange }: QuestionRendererProps) => {
  switch (question.type) {
    case "text":
      return (
        <TextQuestion
          question={question}
          value={value as string}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <CheckboxQuestion
          question={question}
          value={value as string[]}
          onChange={onChange}
        />
      );
    case "rating":
      return (
        <RatingQuestion
          question={question}
          value={value as number}
          onChange={onChange}
        />
      );
    case "multipleChoice":
      return (
        <MultipleChoiceQuestion
          question={question}
          value={value as string}
          onChange={onChange}
        />
      );
    default:
      return <div>Unknown question type</div>;
  }
};

export default QuestionRenderer;
