
import { Question } from "@/types/form";
import { Label } from "../ui/label";
import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingQuestionProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
}

const RatingQuestion = ({ question, value, onChange }: RatingQuestionProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">
        {question.text} {question.required && <span className="text-red-500">*</span>}
      </Label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className="star-rating-item cursor-pointer"
            onClick={() => onChange(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            <Star
              className={cn(
                "h-8 w-8",
                (hoveredRating || value) >= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingQuestion;
