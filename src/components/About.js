import { Container, Row, Col } from "react-bootstrap";

export const About = () => {
  return (
    <section className="about" id="about">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="about-box">
              <h2>About Me</h2>
              <div className="about-underline"></div>
              
              <Row className="about-content">
                <Col xs={12} lg={6} className="about-text">
                  <p>
                    Hi! I'm <span className="highlight-purple">Ajit Adhikari</span>, a passionate first-semester 
                    Computer Science student with a strong interest in web development and technology.
                  </p>
                  <p>
                    I'm currently diving deep into the world of web development, learning technologies like
                    <span className="highlight-orange"> HTML</span>,
                    <span className="highlight-blue"> CSS</span>,
                    <span className="highlight-yellow"> JavaScript</span>,
                    <span className="highlight-cyan"> React</span>, and
                    <span className="highlight-green"> Node.js</span>.
                  </p>
                  <p>
                    Though I'm at the beginning of my journey, I'm committed to continuous learning and growth. 
                    I believe in learning by doing, and I'm always working on projects to apply what I learn.
                  </p>
                </Col>

                <Col xs={12} lg={6} className="about-cards">
                  <div className="about-card">
                    <div className="card-icon student">📚</div>
                    <h3>Student</h3>
                    <p>1st Semester CS student building strong programming foundations.</p>
                  </div>
                  <div className="about-card">
                    <div className="card-icon developer">💻</div>
                    <h3>Developer in Training</h3>
                    <p>Learning modern web technologies to become a full-stack developer.</p>
                  </div>
                  <div className="about-card">
                    <div className="card-icon learner">🚀</div>
                    <h3>Fast Learner</h3>
                    <p>Eager to learn, adapt, and grow with new technologies.</p>
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
