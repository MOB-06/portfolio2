import { Container, Row, Col } from "react-bootstrap";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();
  const [buttonText, setButtonText] = useState('Send Message');
  const [status, setStatus] = useState({});

  const sendEmail = (e) => {
    e.preventDefault();
    setButtonText('Sending...');

    // Replace these with your EmailJS credentials
    emailjs.sendForm(
      'service_dspas4e',        // Your EmailJS Service ID
      'template_v2mifrx',       // Your EmailJS Template ID
      form.current,
      'As6r0olUf4Mh867Bt'       // Your EmailJS Public Key
    )
    .then((result) => {
        setStatus({ success: true, message: 'Message sent successfully!' });
        setButtonText('Send Message');
        form.current.reset();
        setTimeout(() => setStatus({}), 5000);
    }, (error) => {
        setStatus({ success: false, message: 'Something went wrong, please try again.' });
        setButtonText('Send Message');
    });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="contact-bx">
              <h2>Get In Touch</h2>
              <div className="contact-underline"></div>
              <p>Have a question or want to work together? Feel free to reach out!</p>
              
              <Row className="contact-content">
                <Col xs={12} md={6} className="contact-info">
                  <div className="info-card email-card">
                    <div className="info-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <h3>Email</h3>
                    <a href="mailto:ajitadhiakari18@gmail.com">ajitadhiakari18@gmail.com</a>
                  </div>
                  
                  <div className="info-card connect-card">
                    <h3>Let's Connect!</h3>
                    <p>I'm currently looking for learning opportunities and would love to hear from you. Whether you have a question or just want to say hi, I'll do my best to get back to you!</p>
                    <p className="response-time">Response time: Usually within 24 hours</p>
                  </div>
                </Col>
                
                <Col xs={12} md={6} className="contact-form-col">
                  <div className="contact-form-card">
                    <form ref={form} onSubmit={sendEmail}>
                      <div className="form-group">
                        <label htmlFor="user_name">Name</label>
                        <input type="text" id="user_name" name="user_name" placeholder="Your Name" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="user_email">Email</label>
                        <input type="email" id="user_email" name="user_email" placeholder="Your Email" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
                      </div>
                      {status.message && (
                        <p className={status.success ? "success-message" : "error-message"}>
                          {status.message}
                        </p>
                      )}
                      <button type="submit" className="send-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        {buttonText}
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
