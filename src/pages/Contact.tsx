import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        reset();
      } else {
        toast.error('Failed to send your message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while sending your message.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 md:pt-24">
      <Helmet>
        <title>Contact Us | SGK14 EdTech</title>
      </Helmet>
      <main className="container mx-auto px-4 py-12">
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-foreground/80">
            We'd love to hear from you! Please fill out the form below to get in touch.
          </p>
        </section>

        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Your Name
              </label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="mt-1"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Your Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                rows={5}
                className="mt-1"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
