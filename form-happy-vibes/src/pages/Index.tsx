
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Mock forms to showcase
  const demoForms = [
    {
      id: "general",
      title: "General Client Feedback",
      description: "Share your overall experience with our services"
    },
    {
      id: "form123",
      title: "Product Feedback",
      description: "Share your experience with our product"
    },
    {
      id: "form456",
      title: "Website Feedback",
      description: "Help us improve our website"
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Client Feedback Forms</h1>
        <p className="text-xl text-muted-foreground">
          Help us serve you better by sharing your feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {demoForms.map((form) => (
          <Card key={form.id} className="transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={`/public-form/${form.id}`}>Open Form</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Why Your Feedback Matters</h2>
          <p className="mb-4">
            We're committed to providing the best possible experience. 
            Your feedback helps us understand what we're doing well and where we can improve.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/public-form/general">Share Your Feedback</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
