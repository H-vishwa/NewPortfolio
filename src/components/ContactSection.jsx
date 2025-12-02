import { Linkedin, Mail, MapPin, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description:
          "Thank you for reaching out. I'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-24 px-4 relative bg-secondary/30" id="contact">
      <div className=" container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6 justify-center ">
              <div className="flex flex-col md:flex-row items-center md:items-start space-x-4">
                <div className="p-3 mb-2 rounded-full bg-primary/10 ">
                  <Mail className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="flex flex-col items-center md:items-start justify-center">
                  <label className="font-medium text-xs hidden md:block">
                    Email
                  </label>
                  <a
                    href="mailto:himanshukumar62028@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    himanshukumar62028@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10 ">
                  <MapPin className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                </div>
                <div className="flex flex-col items-start">
                  <label className="font-medium text-xs">Location</label>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Yamunanagar, Haryana{" "}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.linkedin.com/in/himanshu-k-54aba5227/"
                  target="_blank"
                  className="">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
          <div
            className="bg-card p-8 rounded-lg shadow-2xl"
            onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form className="space-y-6 ">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-start">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-start">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary"
                  placeholder="hello@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-start">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 pb-6 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Type your Message"
                />
              </div>

              <button
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2 cursor-pointern"
                )}
                type="submit">
                {isSubmitting ? "Sending..." : "Send Message"}
                <SendIcon size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
