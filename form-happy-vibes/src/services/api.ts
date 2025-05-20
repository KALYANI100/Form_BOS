import { FeedbackForm, FormResponse } from '../types/form';

// Mock form data - in a real app this would come from MongoDB
const mockForms: Record<string, FeedbackForm> = {
  'form123': {
    id: 'form123',
    title: 'Product Feedback',
    description: 'Please share your thoughts about our product to help us improve it.',
    questions: [
      {
        id: 'q1',
        type: 'text',
        text: 'What feature do you like most about our product?',
        required: true,
      },
      {
        id: 'q2',
        type: 'rating',
        text: 'How would you rate the ease of use?',
        required: true,
      },
      {
        id: 'q3',
        type: 'checkbox',
        text: 'Which of the following features have you used?',
        required: false,
        options: ['Dashboard', 'Reports', 'User Management', 'Settings', 'API Integration']
      },
      {
        id: 'q4',
        type: 'multipleChoice',
        text: 'How did you hear about us?',
        required: true,
        options: ['Social Media', 'Friend/Colleague', 'Search Engine', 'Advertisement', 'Other']
      },
      {
        id: 'q5',
        type: 'text',
        text: 'Any additional comments or suggestions?',
        required: false,
      }
    ]
  },
  'form456': {
    id: 'form456',
    title: 'Website Feedback',
    description: 'Help us improve our website by sharing your experience.',
    questions: [
      {
        id: 'q1',
        type: 'rating',
        text: 'How would you rate your overall experience with our website?',
        required: true,
      },
      {
        id: 'q2',
        type: 'multipleChoice',
        text: 'What was the primary reason for your visit today?',
        required: true,
        options: ['Research', 'Purchase', 'Support', 'Just browsing', 'Other']
      },
      {
        id: 'q3',
        type: 'checkbox',
        text: 'Which sections of the website did you visit?',
        required: false,
        options: ['Home', 'Products', 'Blog', 'Support', 'Contact Us']
      },
      {
        id: 'q4',
        type: 'text',
        text: 'What would you improve about our website?',
        required: false,
      }
    ]
  },
  'general': {
    id: 'general',
    title: 'General Client Feedback',
    description: 'We value your feedback! Please take a moment to share your thoughts with us.',
    questions: [
      {
        id: 'q1',
        type: 'text',
        text: 'What was the reason for your recent interaction with us?',
        required: true,
      },
      {
        id: 'q2',
        type: 'rating',
        text: 'How satisfied were you with the service you received?',
        required: true,
      },
      {
        id: 'q3',
        type: 'multipleChoice',
        text: 'How likely are you to recommend us to others?',
        required: true,
        options: ['Very unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very likely']
      },
      {
        id: 'q4',
        type: 'checkbox',
        text: 'Which aspects of our service did you appreciate the most?',
        required: false,
        options: ['Response time', 'Quality of service', 'Communication', 'Problem resolution', 'Follow-up']
      },
      {
        id: 'q5',
        type: 'text',
        text: 'How can we improve our service to better meet your needs?',
        required: false,
      }
    ]
  }
};

// Simulate API calls with promises
export const api = {
  // Fetch form details by ID
  getFormById: async (formId: string): Promise<FeedbackForm> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const form = mockForms[formId];
        if (form) {
          resolve(form);
        } else {
          reject(new Error('Form not found'));
        }
      }, 500); // Simulate network delay
    });
  },

  // Submit form response
  submitFeedback: async (response: FormResponse): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submission data:', response);
        resolve({
          success: true,
          message: 'Thank you for your feedback!'
        });
      }, 800); // Simulate network delay
    });
  }
};
