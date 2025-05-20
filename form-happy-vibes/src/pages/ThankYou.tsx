
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/services/api";
import { FeedbackForm as FeedbackFormType } from "@/types/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ThankYou = () => {
  // const { formId } = useParams<{ formId: string }>();
  // console.log(formId);
  // const [formTitle, setFormTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchFormTitle = async () => {
  //     if (!formId) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const form: FeedbackFormType = await api.getFormById(formId);
  //       setFormTitle(form.title);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to load form details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchFormTitle();
  // }, [formId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
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
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYou;
