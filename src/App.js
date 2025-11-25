import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // ===== AOS INIT =====
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      });
    }

    // ===== YEAR =====
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.innerText = new Date().getFullYear();
    }

    // ===== THEME TOGGLE =====
    const themeBtn = document.getElementById("themeToggle");
    const body = document.body;
    const themeLabel = document.getElementById("themeLabel");
    const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

    function updateThemeUI(theme) {
      if (!themeLabel || !themeIcon) return;
      if (theme === "light") {
        themeLabel.innerText = "Light";
        themeIcon.className = "bi bi-sun-fill";
      } else {
        themeLabel.innerText = "Dark";
        themeIcon.className = "bi bi-moon-stars";
      }
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      body.classList.add("light-theme");
      updateThemeUI("light");
    }

    const onThemeClick = () => {
      body.classList.toggle("light-theme");
      const isLight = body.classList.contains("light-theme");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateThemeUI(isLight ? "light" : "dark");
    };

    if (themeBtn) {
      themeBtn.addEventListener("click", onThemeClick);
    }

    // ===== SCROLL / NAVBAR / BACK TO TOP =====
    const backToTop = document.getElementById("backToTop");
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > 300) {
        if (backToTop) backToTop.classList.add("active");
        if (navbar) navbar.classList.add("scrolled");
      } else {
        if (backToTop) backToTop.classList.remove("active");
        if (navbar) navbar.classList.remove("scrolled");
      }

      if (window.innerWidth > 991 && navbar) {
        if (currentY > lastScrollY && currentY > 120) {
          navbar.classList.add("nav-hide");
        } else {
          navbar.classList.remove("nav-hide");
        }
      } else if (navbar) {
        navbar.classList.remove("nav-hide");
      }

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll);

    const onBackToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (backToTop) {
      backToTop.addEventListener("click", onBackToTop);
    }

    // ===== NAVBAR UNDERLINE & ACTIVE LINKS =====
    const navLinks = Array.from(
      document.querySelectorAll(".nav-link")
    );
    const nav = document.querySelector(".navbar-nav");

    let underline = null;
    if (nav) {
      underline = document.createElement("span");
      underline.className = "nav-underline";
      nav.appendChild(underline);
    }

    const moveUnderline = (el) => {
      if (!underline || !el) return;
      const { offsetLeft, offsetWidth } = el;
      underline.style.width = `${offsetWidth}px`;
      underline.style.transform = `translateX(${offsetLeft}px)`;
    };

    const onNavClick = (e) => {
      const link = e.currentTarget;
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      if (window.innerWidth > 991) {
        moveUnderline(link);
      } else if (underline) {
        underline.style.width = "0";
      }
    };

    navLinks.forEach((link) =>
      link.addEventListener("click", onNavClick)
    );

    // Initial underline after DOM is ready
    setTimeout(() => {
      const active = document.querySelector(".nav-link.active");
      if (active && window.innerWidth > 991) moveUnderline(active);
    }, 0);

    const onScrollSpyActivate = () => {
      const activeLink = document.querySelector(
        ".navbar-nav .nav-link.active"
      );
      if (activeLink && window.innerWidth > 991) {
        moveUnderline(activeLink);
      }
    };

    document.body.addEventListener(
      "activate.bs.scrollspy",
      onScrollSpyActivate
    );

    const onResize = () => {
      const active = document.querySelector(
        ".navbar-nav .nav-link.active"
      );
      if (!underline) return;

      if (window.innerWidth <= 991) {
        underline.style.width = "0";
      } else if (active) {
        moveUnderline(active);
      }
    };

    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      if (themeBtn) {
        themeBtn.removeEventListener("click", onThemeClick);
      }
      window.removeEventListener("scroll", onScroll);
      if (backToTop) {
        backToTop.removeEventListener("click", onBackToTop);
      }
      document.body.removeEventListener(
        "activate.bs.scrollspy",
        onScrollSpyActivate
      );
      window.removeEventListener("resize", onResize);
      navLinks.forEach((link) =>
        link.removeEventListener("click", onNavClick)
      );
      if (underline && nav) {
        nav.removeChild(underline);
      }
    };
  }, []);

  return (
    <>
      {/* Background layers */}
      <div className="bg-animation"></div>
      <div className="bg-orbit-layer">
        <span className="bg-orbit-dot dot-1"></span>
        <span className="bg-orbit-dot dot-2"></span>
        <span className="bg-orbit-dot dot-3"></span>
        <span className="bg-orbit-dot dot-4"></span>

        <span className="shooting-star star-1"></span>
        <span className="shooting-star star-2"></span>
        <span className="shooting-star star-3"></span>
        <span className="shooting-star star-4"></span>
        <span className="shooting-star star-5"></span>
        <span className="shooting-star star-6"></span>
      </div>

      {/* NAVBAR */}
      <nav id="mainNav" className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            MEHUL MORE
          </a>
          <button
            className="navbar-toggler shadow-none border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span
              className="bi bi-list fs-2"
              style={{ color: "var(--text-main)" }}
            ></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#skills">
                  Skills
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#experience">
                  Experience
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projects">
                  Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <button className="theme-toggle" id="themeToggle">
                  <i className="bi bi-moon-stars"></i>{" "}
                  <span id="themeLabel">Dark</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Text */}
            <div
              className="col-lg-7 text-center text-lg-start"
              data-aos="fade-right"
            >
              <div className="hero-badge">
                <span className="dot"></span> Available for Web Dev, Data
                Roles, Finance Roles
              </div>
              <span class="section-subtitle2">Hi, I'm</span>
              <h1 className="hero-title">Mehul More</h1>
              <p className="hero-subtitle mb-4">
                An IT undergraduate crafting modern web applications, software
                solutions, and data-driven insights. Bridging the gap between
                Code and Finance.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <a href="#projects" className="btn btn-glow">
                  View Projects
                </a>
                <a
                  href="https://drive.google.com/file/d/1cl9a6K4oh64RGX4nMUF-v9qK6tTxVQrd/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-glow"
                >
                  Download CV <i className="bi bi-download ms-2"></i>
                </a>
              </div>
              <div className="mt-4 pt-2 d-flex gap-4 justify-content-center justify-content-lg-start text-muted">
                <a
                  href="https://github.com/mehulm30"
                  target="_blank"
                  rel="noreferrer"
                  className="fs-4 text-reset transition-hover"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/mehulm30/"
                  target="_blank"
                  rel="noreferrer"
                  className="fs-4 text-reset transition-hover"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="mailto:mehulmore2005@gmail.com"
                  className="fs-4 text-reset transition-hover"
                >
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>

            {/* Rocket / Moon */}
            <div
              className="col-lg-5 mt-5 mt-lg-0 hero-visual-wrapper"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="rocket-scene">
                <div className="moon">
                  <div className="crater crater-1"></div>
                  <div className="crater crater-2"></div>
                  <div className="crater crater-3"></div>
                  <div className="crater crater-4"></div>
                  <div className="crater crater-5"></div>
                  <div className="shadow"></div>
                  <div className="eye eye-l"></div>
                  <div className="eye eye-r"></div>
                  <div className="mouth"></div>
                  <div className="blush blush-1"></div>
                  <div className="blush blush-2"></div>
                </div>
                <div className="orbit">
                  <div className="rocket">
                    <div className="window"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div
              className="col-lg-6 order-2 order-lg-1"
              data-aos="fade-up"
            >
              <div className="glass-card">
                <span className="section-subtitle">Who am I?</span>
                <h2 className="section-heading">
                  Tech Enthusiast &amp;
                  <br />
                  Problem Solver.
                </h2>
                <p className="text-muted mt-3">
                  I’m an Information Technology undergraduate at{" "}
                  <strong>SIES Graduate School of Technology</strong>, Navi
                  Mumbai (2022–2026).
                </p>
                <p className="text-muted">
                  I enjoy taking complex problems and turning them into simple,
                  beautiful interface designs. My passion lies in full-stack
                  development, but I have a serious soft spot for{" "}
                  <strong>Financial Markets</strong> and{" "}
                  <strong>Data Analytics</strong>.
                </p>
                <p className="text-muted mb-4">
                  When I&apos;m not coding, I&apos;m analyzing market trends or
                  exploring the latest in Fintech.
                </p>
                <div className="d-flex gap-4">
                  <div>
                    <h3 className="fw-bold mb-0 text-info">3+</h3>
                    <small className="text-muted text-uppercase">
                      Years Study
                    </small>
                  </div>
                  <div>
                    <h3 className="fw-bold mb-0 text-info">10+</h3>
                    <small className="text-muted text-uppercase">
                      Projects
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="glass-card">
                <span className="section-subtitle">Highlights</span>
                <ul className="list-unstyled mt-3">
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-info mt-1 me-3"></i>
                    <span>
                      First Prize @ Cognition Tech Fest (Project Presentation)
                    </span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-info mt-1 me-3"></i>
                    <span>Intern @ EasyGoLife Web Solutions</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-info mt-1 me-3"></i>
                    <span>Tech Coordinator @ IETE Students&apos; Chapter</span>
                  </li>
                  <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-check-circle-fill text-info mt-1 me-3"></i>
                    <span>Financial Market Analyst Certified (Finlatics)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">My Arsenal</span>
            <h2 className="section-heading">Technologies &amp; Tools</h2>
          </div>

          <div className="row g-4">
            <div
              className="col-md-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="glass-card h-100 text-center">
                <div className="mb-3">
                  <i className="bi bi-code-slash fs-1 text-primary"></i>
                </div>
                <h4 className="mb-3">Languages</h4>
                <div>
                  <span className="tech-pill">Java</span>
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">JavaScript</span>
                  <span className="tech-pill">HTML5</span>
                  <span className="tech-pill">CSS3</span>
                  <span className="tech-pill">C</span>
                  <span className="tech-pill">C++</span>
                </div>
              </div>
            </div>

            <div
              className="col-md-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="glass-card h-100 text-center">
                <div className="mb-3">
                  <i className="bi bi-layers fs-1 text-primary"></i>
                </div>
                <h4 className="mb-3">Frameworks</h4>
                <div>
                  <span className="tech-pill">React.js</span>
                  <span className="tech-pill">Node.js</span>
                  <span className="tech-pill">Bootstrap</span>
                  <span className="tech-pill">Flask</span>
                  <span className="tech-pill">FastAPI</span>
                  <span className="tech-pill">OpenCV</span>
                  <span className="tech-pill">AWT</span>
                </div>
              </div>
            </div>

            <div
              className="col-md-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="glass-card h-100 text-center">
                <div className="mb-3">
                  <i className="bi bi-tools fs-1 text-primary"></i>
                </div>
                <h4 className="mb-3">Tools &amp; Cloud</h4>
                <div>
                  <span className="tech-pill">Git</span>
                  <span className="tech-pill">GitHub</span>
                  <span className="tech-pill">MongoDB</span>
                  <span className="tech-pill">MySQL</span>
                  <span className="tech-pill">SQLite</span>
                  <span className="tech-pill">AWS Basics</span>
                  <span className="tech-pill">Figma</span>
                  <span className="tech-pill">Netlify</span>
                  <span className="tech-pill">VS Code</span>
                  <span className="tech-pill">Microsoft Office</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Career Path</span>
            <h2 className="section-heading">Experience</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline">
                <div className="timeline-item" data-aos="fade-left">
                  <span className="timeline-dot"></span>
                  <span className="timeline-date">
                    FEB 2025 – APR 2025
                  </span>
                  <h4 className="mb-1">Website Developer Intern</h4>
                  <p className="text-info mb-2">
                    EasyGoLife Web Solutions · Remote
                  </p>
                  <p className="text-muted">
                    Converted Figma designs into responsive HTML/CSS/JS.
                    Implemented smooth scrolling, UI interactions, and connected
                    frontend forms to backend endpoints.
                  </p>
                </div>

                <div
                  className="timeline-item"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <span className="timeline-dot"></span>
                  <span className="timeline-date">
                    FEB 2024 – FEB 2025
                  </span>
                  <h4 className="mb-1">Technical Coordinator</h4>
                  <p className="text-info mb-2">
                    IETE Students&apos; Chapter · SIES GST
                  </p>
                  <p className="text-muted">
                    Led technical setups for workshops and events. Facilitated
                    peer learning and coordinated between technical teams for
                    smooth event execution.
                  </p>
                </div>

                <div
                  className="timeline-item"
                  data-aos="fade-left"
                  data-aos-delay="100"
                >
                  <span className="timeline-dot"></span>
                  <span className="timeline-date">
                    AUG 2024 – DEC 2025
                  </span>
                  <h4 className="mb-1">Internship Trainee</h4>
                  <p className="text-info mb-2">CodSoft · Remote</p>
                  <p className="text-muted">
                    Completed various web development tasks involving HTML, CSS,
                    and JS logic. Collaborated with a remote team to deliver
                    module-based projects.
                  </p>
                </div>

                <div
                  className="timeline-item"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <span className="timeline-dot"></span>
                  <span className="timeline-date">
                    FEB 2023 – MAR 2023
                  </span>
                  <h4 className="mb-1">FIFA Event Head</h4>
                  <p className="text-info mb-2">
                    SIES GST Students&apos; Council · SIES GST
                  </p>
                  <p className="text-muted">
                    Managed the FIFA event end-to-end, overseeing registrations,
                    technical arrangements, and participant engagement to ensure
                    a seamless experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Academia</span>
            <h2 className="section-heading">Education Journey</h2>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-10">
              <div className="glass-card py-4 px-5">
                <div className="d-flex flex-column flex-md-row justify-content-between mb-4 border-bottom border-secondary border-opacity-25 pb-3">
                  <div>
                    <h4 className="mb-1">B.Tech Information Technology</h4>
                    <p className="mb-0 text-muted">
                      SIES Graduate School of Technology
                    </p>
                  </div>
                  <div className="text-md-end mt-2 mt-md-0">
                    <span className="badge bg-primary bg-opacity-10 text-primary">
                      2022 - 2026
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-4 border-bottom border-secondary border-opacity-25 pb-3">
                  <div>
                    <h4 className="mb-1">Higher Secondary (12th)</h4>
                    <p className="mb-0 text-muted">
                      New Horizon Public School
                    </p>
                  </div>
                  <div className="text-md-end mt-2 mt-md-0">
                    <span className="badge bg-light bg-opacity-10 text-muted">
                      2020 - 2022
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <div>
                    <h4 className="mb-1">Secondary School (10th)</h4>
                    <p className="mb-0 text-muted">
                      Pawar Public School
                    </p>
                  </div>
                  <div className="text-md-end mt-2 mt-md-0">
                    <span className="badge bg-light bg-opacity-10 text-muted">
                      2018 - 2020
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Portfolio</span>
            <h2 className="section-heading">Featured Projects</h2>
          </div>

          <div className="row g-4">
            {/* Project 1 */}
            <div className="col-lg-6" data-aos="fade-up">
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">BizNiche</h3>
                  <a
                    href="https://github.com/mehulm30/BizNiche"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  A marketplace platform connecting startups with verified
                  sellers for essential business assets. Features user auth,
                  product listings, and a responsive UI.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">PHP</span>
                  <span className="tech-pill">MySQL</span>
                  <span className="tech-pill">Bootstrap</span>
                </div>
                <div className="mt-2 text-info small fw-bold">
                  <i className="bi bi-trophy-fill me-1"></i> 1st Prize Winner -
                  Cognition Tech Fest
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">Number Plate Scanner</h3>
                  <a
                    href="https://github.com/mehulm30/Car-Number-Plate-Scanner"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  A Computer Vision system using OpenCV and Tesseract OCR to
                  automatically detect and extract text from vehicle license
                  plates with high accuracy.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">OpenCV</span>
                  <span className="tech-pill">OCR</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">Traffic Flow Prediction</h3>
                  <a
                    href="https://github.com/mehulm30/TrafficPrediction-semIV"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  A machine learning-based project that predicts traffic
                  patterns and congestion trends using historical data, helping
                  analyse peak hours and flow behaviour.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">Machine Learning</span>
                  <span className="tech-pill">Data Analysis</span>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">ClothAid v2</h3>
                  <a
                    href="https://github.com/mehulm30/Clothaidv2"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  A web-based clothing platform that showcases products with a
                  clean, responsive UI, focusing on user-friendly browsing and
                  structured category layouts.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">HTML</span>
                  <span className="tech-pill">CSS</span>
                  <span className="tech-pill">JavaScript</span>
                  <span className="tech-pill">Responsive UI</span>
                </div>
              </div>
            </div>

            {/* Project 5 */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">Traffic Signs Web App</h3>
                  <a
                    href="https://github.com/mehulm30/TrafficSigns-WebApp"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  A web application that wraps a traffic sign recognition model,
                  allowing users to upload images and get predicted sign classes
                  along with relevant details.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">Flask</span>
                  <span className="tech-pill">Computer Vision</span>
                  <span className="tech-pill">Web App</span>
                </div>
              </div>
            </div>

            {/* Project 6 */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="glass-card d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold">DMIT Project</h3>
                  <a
                    href="https://github.com/mehulm30/DMIT-Project"
                    target="_blank"
                    rel="noreferrer"
                    className="text-reset"
                  >
                    <i className="bi bi-github fs-4"></i>
                  </a>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  An academic mini-project implementing a basic management
                  system with CRUD operations, authentication, and structured
                  database design as part of the DMIT course.
                </p>
                <div className="mb-3">
                  <span className="tech-pill">PHP</span>
                  <span className="tech-pill">MySQL</span>
                  <span className="tech-pill">HTML</span>
                  <span className="tech-pill">CSS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <a
              href="https://github.com/mehulm30?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-glow"
            >
              View More on GitHub <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="zoom-in">
              <div className="glass-card text-center py-5">
                <span className="section-subtitle">Get In Touch</span>
                <h2 className="section-heading mb-4">
                  Let&apos;s Work Together
                </h2>
                <p
                  className="text-muted mb-5 mx-auto"
                  style={{ maxWidth: "500px" }}
                >
                  I&apos;m currently looking for internships and entry-level
                  opportunities in Software Engineering and Data Analytics. Have
                  a question or Connect with me on
                </p>
                <a
                  href="mailto:mehulmore2005@gmail.com"
                  className="btn btn-glow btn-lg mb-4"
                >
                  <i className="bi bi-envelope-fill me-2"></i> Say Hello
                </a>
                <div className="d-flex justify-content-center gap-4 mt-3">
                  <a
                    href="https://www.linkedin.com/in/mehulm30/"
                    className="text-reset fs-3 transition-hover"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/mehulm30"
                    className="text-reset fs-3 transition-hover"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-github"></i>
                  </a>
                  <a
                    href="tel:+919137363140"
                    className="text-reset fs-3 transition-hover"
                  >
                    <i className="bi bi-telephone"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <p className="mb-1">
            &copy; <span id="year"></span> Mehul More. All rights reserved.
          </p>
          <small className="text-muted">
            Built with precision &amp; coffee.
          </small>
        </div>
      </footer>

      <button id="backToTop">
        <i className="bi bi-arrow-up"></i>
      </button>
    </>
  );
};

export default App;
