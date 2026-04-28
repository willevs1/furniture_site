'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '', subject: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 mb-4 tracking-tight">Contact</h1>
          <p className="text-lg text-stone-600 font-light">
            Let's discuss your interior design project
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-light text-stone-900 mb-4 tracking-wide">ADDRESS</h3>
              <p className="text-stone-600 font-light">123 Design Street</p>
              <p className="text-stone-600 font-light">Creative City, CA 90210</p>
            </div>

            <div>
              <h3 className="text-xl font-light text-stone-900 mb-4 tracking-wide">PHONE</h3>
              <p className="text-stone-600 font-light">(555) 123-4567</p>
              <p className="text-stone-500 font-light text-sm mt-2">Monday—Friday, 9AM—6PM PT</p>
            </div>

            <div>
              <h3 className="text-xl font-light text-stone-900 mb-4 tracking-wide">EMAIL</h3>
              <p className="text-stone-600 font-light">hello@interiors.co</p>
              <p className="text-stone-600 font-light">inquiries@interiors.co</p>
            </div>

            <div>
              <h3 className="text-xl font-light text-stone-900 mb-4 tracking-wide">HOURS</h3>
              <p className="text-stone-600 font-light">Monday—Friday: 9AM—6PM</p>
              <p className="text-stone-600 font-light">Saturday: 10AM—4PM</p>
              <p className="text-stone-600 font-light">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="">
              {submitted && (
                <div className="mb-6 p-4 border border-stone-300 text-stone-700 bg-stone-50">
                  Thank you. We'll be in touch shortly.
                </div>
              )}

              <div className="mb-8">
                <label htmlFor="name" className="block text-sm font-light text-stone-900 mb-3 tracking-wide">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent font-light"
                  placeholder=""
                />
              </div>

              <div className="mb-8">
                <label htmlFor="email" className="block text-sm font-light text-stone-900 mb-3 tracking-wide">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent font-light"
                  placeholder=""
                />
              </div>

              <div className="mb-8">
                <label htmlFor="phone" className="block text-sm font-light text-stone-900 mb-3 tracking-wide">
                  PHONE
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent font-light"
                  placeholder=""
                />
              </div>

              <div className="mb-8">
                <label htmlFor="subject" className="block text-sm font-light text-stone-900 mb-3 tracking-wide">
                  SUBJECT
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent font-light"
                >
                  <option value="">Select a subject</option>
                  <option value="consultation">Design Consultation</option>
                  <option value="product">Product Inquiry</option>
                  <option value="delivery">Delivery Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-light text-stone-900 mb-3 tracking-wide">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-0 py-3 border-b border-stone-300 focus:outline-none focus:border-stone-900 bg-transparent font-light resize-none"
                  placeholder=""
                ></textarea>
              </div>

              <button className="px-8 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors font-light text-sm tracking-wide">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-stone-900 text-stone-50 py-24 px-6 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
            Begin Your Project
          </h2>
          <p className="text-xl text-stone-300 font-light mb-12 leading-relaxed">
            Schedule a consultation to discuss your interior design needs and vision.
          </p>
          <button className="px-8 py-4 border border-stone-50 text-stone-50 hover:bg-stone-50 hover:text-stone-900 transition-colors font-light text-sm tracking-wide">
            SCHEDULE CONSULTATION
          </button>
        </div>
      </section>
    </main>
  );
}
