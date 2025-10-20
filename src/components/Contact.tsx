import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (contactInfoRef.current) {
      gsap.fromTo(
        contactInfoRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 70%',
          },
        }
      );
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 70%',
          },
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 bg-[#0E0E0E]"
    >
      <div className="container mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
        >
          Get in Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div ref={contactInfoRef}>
            <div className="bg-[#2A2A2A] p-8 rounded-2xl border-2 border-[#FFD500]/20 h-full">
              <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD500] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#0E0E0E]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:wayatpvtltd@gmail.com"
                      className="text-gray-400 hover:text-[#FFD500] transition-colors"
                    >
                      wayatpvtltd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD500] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#0E0E0E]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+918074925389"
                      className="text-gray-400 hover:text-[#FFD500] transition-colors"
                    >
                      +91 80749 25389
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFD500] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#0E0E0E]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-gray-400">Hyderabad, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#FFD500]/20">
                <h4 className="text-white font-semibold mb-4">Office Hours</h4>
                <p className="text-gray-400 mb-2">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="bg-[#2A2A2A] p-8 rounded-2xl border-2 border-[#FFD500]/20">
              <h3 className="text-3xl font-bold text-white mb-8">Send us a Message</h3>

              <div className="space-y-6">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400">
                    Failed to send message. Please try again or contact us directly at wayatpvtltd@gmail.com
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#FFD500]/20 rounded-lg text-white focus:border-[#FFD500] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#FFD500]/20 rounded-lg text-white focus:border-[#FFD500] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#FFD500]/20 rounded-lg text-white focus:border-[#FFD500] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0E0E0E] border border-[#FFD500]/20 rounded-lg text-white focus:border-[#FFD500] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#FFD500] text-[#0E0E0E] font-bold text-lg rounded-lg hover:glow-yellow-intense transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
