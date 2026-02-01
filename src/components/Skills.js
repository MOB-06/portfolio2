import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

export const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const intervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);

  const skills = [
    { 
      name: 'HTML5 & CSS3', 
      description: 'Building responsive and accessible web layouts with modern HTML5 and CSS features.',
      level: 25,
      technologies: ['HTML5', 'CSS', 'Flexbox', 'Grid'],
      icon: '🎨'
    },
    { 
      name: 'JavaScript', 
      description: 'Creating interactive web applications with vanilla JavaScript and ES6+ features.',
      level: 5,
      technologies: ['ES6+', 'DOM', 'APIs', 'Async/Await'],
      icon: '⚡'
    },
    { 
      name: 'React', 
      description: 'Developing modern single-page applications using React hooks and components.',
      level: 1,
      technologies: ['React', 'Hooks', 'JSX', 'Components'],
      icon: '⚛️'
    },
    { 
      name: 'Node.js', 
      description: 'Building backend services and RESTful APIs with Node.js and Express.',
      level: 2,
      technologies: ['Node.js', 'Express', 'REST API', 'npm'],
      icon: '🟢'
    },
    { 
      name: 'Git & GitHub', 
      description: 'Version control and collaboration using Git for project management.',
      level: 10,
      technologies: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
      icon: '🔧'
    },
    { 
      name: 'Responsive Design', 
      description: 'Creating mobile-first, responsive designs that work across all devices.',
      level: 20,
      technologies: ['Mobile-First', 'Media Queries', 'Bootstrap', 'Tailwind'],
      icon: '📱'
    },
  ];

  // Window resize listener with debounce
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 3500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, goToNext]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
  };

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + skills.length) % skills.length);
    
    // Clear any existing timeout before setting a new one
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    // Resume auto-play after 2 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 2000);
  };

  const goToNextManual = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % skills.length);
    
    // Clear any existing timeout before setting a new one
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    // Resume auto-play after 2 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 2000);
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx-compact">
              <h2>Skills & Technologies</h2>
              <div className="skill-underline"></div>
              <p>Currently learning and building proficiency in these technologies 🚀</p>
              
              <div className="skill-carousel-container-3d">
                <div className="skill-carousel-wrapper-3d">
                  {(() => {
                    // Calculate responsive values once
                    const isMobile = windowWidth <= 768;
                    const isTablet = windowWidth <= 1024;
                    
                    const spacing1 = isMobile ? 300 : isTablet ? 360 : 420;
                    const spacing2 = isMobile ? 450 : isTablet ? 550 : 650;
                    const spacing3 = isMobile ? 600 : isTablet ? 700 : 800;
                    const rotation1 = isMobile ? 25 : 30;
                    const rotation2 = isMobile ? 35 : 40;
                    const scale1 = isMobile ? 0.88 : 0.85;
                    const scale2 = isMobile ? 0.75 : 0.7;
                    
                    return skills.map((skill, index) => {
                      // Calculate relative position to current index
                      let offset = index - currentIndex;
                      const totalItems = skills.length;
                      
                      // Wrap around for continuous rotation
                      if (offset > totalItems / 2) {
                        offset -= totalItems;
                      } else if (offset < -totalItems / 2) {
                        offset += totalItems;
                      }
                      
                      const absOffset = Math.abs(offset);
                      const sign = offset < 0 ? -1 : 1;
                    
                      // Calculate transforms based on position
                      let transform = '';
                      let opacity = 1;
                      let zIndex = 10;
                      
                      if (absOffset === 0) {
                        // Center item
                        transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
                        opacity = 1;
                        zIndex = 10;
                      } else if (absOffset === 1) {
                        // Side items
                        const translateX = sign * spacing1;
                        transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation1}deg) scale(${scale1})`;
                        opacity = 0.7;
                        zIndex = 5;
                      } else if (absOffset === 2) {
                        // Further side items
                        const translateX = sign * spacing2;
                        transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation2}deg) scale(${scale2})`;
                        opacity = 0.4;
                        zIndex = 3;
                      } else {
                        // Hidden items
                        transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
                        opacity = 0;
                        zIndex = 1;
                      }
                    
                      return (
                        <div 
                          key={`${skill.name}-${index}`} 
                          className="skill-card-3d"
                          style={{
                            transform: transform,
                            opacity: opacity,
                            zIndex: zIndex,
                            transition: 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)'
                          }}
                        >
                          <div className="skill-card-inner">
                            <div className="skill-icon-3d">{skill.icon}</div>
                            <h3>{skill.name}</h3>
                            <p className="skill-description">{skill.description}</p>
                            <div className="skill-tech-tags">
                              {skill.technologies.map((tech) => (
                                <span key={tech} className="tech-tag">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="skill-level-indicator">
                              <span className="level-label">Proficiency</span>
                              <span className="level-value">{skill.level}%</span>
                            </div>
                            <div className="skill-progress-bar">
                              <div 
                                className="skill-progress-fill" 
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <button className="carousel-nav carousel-nav-left" onClick={goToPrev} aria-label="Previous">
                  <ChevronLeft size={24} />
                </button>
                
                <button className="carousel-nav carousel-nav-right" onClick={goToNextManual} aria-label="Next">
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <p className="skill-footer">💡 Learning in progress... More skills being added every day!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
