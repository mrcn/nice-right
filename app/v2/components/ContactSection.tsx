'use client'

import { useState, FormEvent } from 'react'
import './contact.css'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="v2-contact">
      <div className="v2-container">
        <div className="v2-contact-inner">
          <h2>Ready to grow?</h2>
          <p>
            Let&apos;s have a quick conversation about your business. No pressure,
            no pitch deck &mdash; just an honest look at what digital can do for you.
          </p>

          {/* Form */}
          <div className="v2-project-form-wrapper">
            {!submitted ? (
              <form className="v2-project-form" onSubmit={handleSubmit}>
                <div className="v2-form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="v2-form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder="you@company.com"
                  />
                </div>
                <div className="v2-form-field">
                  <label htmlFor="contact-business">What&apos;s your business about?</label>
                  <textarea
                    id="contact-business"
                    name="business"
                    required
                    rows={3}
                    placeholder="Tell me a bit about what you do"
                  />
                </div>
                <div className="v2-form-field">
                  <label htmlFor="contact-challenge">Biggest challenge?</label>
                  <textarea
                    id="contact-challenge"
                    name="challenge"
                    required
                    rows={3}
                    placeholder="What's the #1 thing you'd fix with the right technology?"
                  />
                </div>
                <button type="submit" className="v2-btn v2-form-submit">
                  Send &mdash; I&apos;ll Reply Within 24 Hours
                </button>
              </form>
            ) : (
              <div className="v2-form-success">
                <div className="v2-form-success-icon">&#10003;</div>
                <p>Got it! I&apos;ll get back to you within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Testimonial at conversion point */}
          <div className="v2-testimonial">
            <blockquote className="v2-testimonial-quote">
              &ldquo;was able to decipher what we wanted despite inadequate information from us&rdquo;
            </blockquote>
            <div className="v2-testimonial-attribution">
              <strong>Britt Skaathun</strong>
              <span>Assistant Professor, UC San Diego</span>
            </div>
          </div>

          {/* Contact methods */}
          <div className="v2-contact-methods">
            <a href="mailto:Marcin@uxoxo.xyz" className="v2-contact-card">
              <div className="v2-contact-icon">&#9993;</div>
              <div>
                <strong>Email</strong>
                <span>Marcin@uxoxo.xyz</span>
              </div>
            </a>
            <a
              href="https://linkedin.com/in/mklaudiusz"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-contact-card"
            >
              <div className="v2-contact-icon">&#128188;</div>
              <div>
                <strong>LinkedIn</strong>
                <span>Connect with me</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
