import { Container, Row, Col } from "react-bootstrap";

export const Projects = () => {

  const projects = [
    {
      title: "NEON SURVIVER",
      description: "This game only works on pc/laptop",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/MOB-06/NEON-SURVIVAL.git",
      playLink: "https://spiffy-longma-8676e8.netlify.app",
    },
    {
      title: "Personal Portfolio",
      description: "Modern portfolio with smooth animations and responsive design.",
      tech: ["React", "CSS", "Animations"],
      github: "https://github.com/MOB-06/portfolio2.git",
    },
    {
      title: "Learning Projects",
      description: "Collection of projects built while learning web development fundamentals.",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/MOB-06",
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="project-bx">
              <h2>Projects</h2>
              <div className="project-underline"></div>
              <p>Projects I've been working on during my learning journey 🚀</p>
              
              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={index} className="project-card-new">
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech-tags">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag-project">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="view-code-link">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Code
                    </a>
                    {project.playLink && (
                      <a href={project.playLink} target="_blank" rel="noopener noreferrer" className="play-game-link">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Play Game
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="view-all-projects">
                <a href="https://github.com/MOB-06" target="_blank" rel="noopener noreferrer" className="view-all-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View All Projects on GitHub
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
