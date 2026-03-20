import { Container, Row, Col } from "react-bootstrap";

export const Games = () => {
  return (
    <section className="games" id="games">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="games-bx">
              <h2>Games</h2>
              <div className="games-underline"></div>
              <p>Play one of my mini-games directly here. 🎮</p>

              <div className="game-embed-card">
                <iframe
                  title="Puzzle Game"
                  src="/puzzle.html"
                  className="game-frame"
                  loading="lazy"
                ></iframe>
              </div>

              <div className="game-actions">
                <a href="/puzzle.html" target="_blank" rel="noopener noreferrer" className="play-game-link">
                  Open Puzzle in New Tab
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}