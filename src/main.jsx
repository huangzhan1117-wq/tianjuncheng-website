import React, { StrictMode, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import heroMachine from "../assets/hero-machine.png";
import equip20t from "../assets/equip-20t.png";
import equip25t from "../assets/equip-25t.png";
import equip50t from "../assets/equip-50t.png";
import equip70t from "../assets/equip-70t.png";
import equipAerial from "../assets/equip-aerial.png";
import equipExcavator from "../assets/equip-excavator.png";
import equipTruckCrane from "../assets/equip-truck-crane.png";
import equipFlatbed from "../assets/equip-flatbed.png";
import serviceMap from "../assets/service-map.png";
import projectSite from "../assets/project-site.png";
import projectDaqingPhoto from "../assets/project-daqing-photo.jpg";
import projectJinjiangPhoto from "../assets/project-jinjiang-photo.jpg";

const companyName = "海南田俊程机械工程有限公司";
const phone = "13398926188";
const email = "13876625259@163.com";
const address = "澄迈县金江镇文明路兴吉巷24号";

const navItems = [
  ["home", "首页"],
  ["equipment", "设备展示"],
  ["service", "服务区域"],
  ["strength", "企业实力"],
  ["about", "关于田俊程"],
  ["contact", "联系我们"],
];

const equipment = [
  [equip20t, "20吨汽车吊", "灵活高效，适用于中小型吊装作业。"],
  [equip25t, "25吨汽车吊", "性能稳定，满足多场景施工需求。"],
  [equip50t, "50吨汽车吊", "强劲起重能力，胜任大型工程项目。"],
  [equip70t, "70吨汽车吊", "适用于重型设备吊装与高强度作业。"],
  [equipAerial, "高空作业车", "高空作业更安全，效率更高。"],
  [equipExcavator, "挖掘机", "运转有力，适配土方施工。"],
  [equipTruckCrane, "随车吊", "灵活便捷，吊运一体。"],
  [equipFlatbed, "平板运输车", "承载力强，运输可靠。"],
];

const servicePoints = [
  ["pin", "立足澄迈", "扎根本地，深耕服务"],
  ["truck", "快速响应", "高效调度，及时到位"],
  ["shield", "覆盖全岛", "服务全面，支持工程建设"],
];

const stats = [
  [7, "+", "设备类型", "多种工程设备"],
  [100, "+", "服务项目", "完整施工工程"],
  [10, "+", "行业经验", "专注工程服务"],
  ["24H", "", "快速响应", "随时为您服务"],
];

const featuredProjects = [
  {
    image: projectSite,
    alt: "华润水泥金江粉磨站项目现场",
    title: "华润水泥（金江粉磨站）",
    subtitle: "年度吊车租赁服务项目",
    points: ["厂区日常吊装服务", "设备检修吊装", "转运配送作业", "长期稳定合作"],
  },
  {
    image: projectDaqingPhoto,
    alt: "大庆油田华南区域海南施工设备租赁项目现场",
    title: "大庆油田工程建设有限公司",
    subtitle: "华南区域海南施工设备租赁项目",
    points: ["海南片区施工设备租赁", "油田配套基建支援", "临时设备吊装服务", "央企项目服务能力"],
  },
  {
    image: projectJinjiangPhoto,
    alt: "金江镇城区与产业园片区项目现场",
    title: "金江镇城区、产业园片区项目",
    subtitle: "市政配套、厂区进场与城镇施工服务",
    points: ["政府市政配套工程", "多家厂区设备进场吊装", "自建房集群封顶吊装", "城镇施工项目机械支援"],
  },
];

function Icon({ name }) {
  const paths = {
    arrow: <path d="M5 12h13m-6-6 6 6-6 6" />,
    up: <path d="m6 15 6-6 6 6" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
    ),
    mail: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-5.1 7-12a7 7 0 0 0-14 0c0 6.9 7 12 7 12Z" />
        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      </>
    ),
    truck: (
      <>
        <path d="M4 17h2l2-7h8l2 7h2" />
        <path d="M8 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="M16 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
        <path d="M8 10V5h8v5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4Z" />
        <path d="m8.5 12 2.5 2.5L16 9" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -56px 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options, reduced]);

  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const [ref, visible] = useReveal();

  return (
    <Tag
      ref={ref}
      className={`${className} reveal${visible ? " is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms`, ...props.style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

function CountUp({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof value !== "number") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduced) {
          setDisplay(value);
          observer.disconnect();
          return;
        }

        const start = performance.now();
        const duration = 1300;
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.55 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, value]);

  if (typeof value !== "number") return value;
  return <span ref={ref}>{display}</span>;
}

function useScrollNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);

      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = "home";
      navItems.forEach(([id]) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      });
      setActiveId(current);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return { scrolled, activeId };
}

function Header({ navOpen, setNavOpen }) {
  const { scrolled, activeId } = useScrollNavigation();

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
    return () => document.body.classList.remove("nav-open");
  }, [navOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [setNavOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#home" aria-label={`${companyName}官网首页`} onClick={() => setNavOpen(false)}>
        <span>{companyName}</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={navOpen ? "关闭导航" : "打开导航"}
        aria-expanded={navOpen}
        onClick={() => setNavOpen((value) => !value)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className="site-nav" aria-label="主导航" onClick={() => setNavOpen(false)}>
        {navItems.map(([id, label]) => (
          <a key={id} className={activeId === id ? "active" : ""} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reduced) return;

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.setProperty("--hero-x", x.toFixed(3));
      node.style.setProperty("--hero-y", y.toFixed(3));
    };

    const onLeave = () => {
      node.style.setProperty("--hero-x", "0");
      node.style.setProperty("--hero-y", "0");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <section className="hero section" id="home" ref={heroRef}>
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker">工程机械租赁与施工服务</p>
          <h1>
            <span>海南田俊程</span>
            <span>机械工程有限公司</span>
          </h1>
          <p className="hero-lead">
            <span>智能设备驱动</span>，高效工程服务
          </p>
          <p className="hero-desc">专注工程机械租赁与工程施工服务，快速响应海南区域工程建设设备需求。</p>
          <div className="hero-actions">
            <a className="btn primary" href="#equipment">
              查看设备
              <Icon name="arrow" />
            </a>
            <a className="btn secondary consult" href={`tel:${phone}`}>
              立即咨询
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="大型汽车吊设备展示">
          <img src={heroMachine} alt="大型汽车吊工程机械" fetchPriority="high" decoding="async" />
          <span className="hero-highlight" aria-hidden="true"></span>
        </div>
      </div>
    </section>
  );
}

function Equipment() {
  return (
    <section className="equipment section" id="equipment">
      <Reveal className="section-head">
        <div>
          <p className="eyebrow">Equipment Matrix</p>
          <h2>专业设备矩阵</h2>
          <p>多种工程机械设备，满足不同工程需求。</p>
        </div>
        <button className="text-link" type="button" aria-label="查看全部设备">
          查看全部设备
          <Icon name="arrow" />
        </button>
      </Reveal>

      <div className="equipment-grid">
        {equipment.map(([image, title, desc], index) => (
          <Reveal
            as="article"
            className="equipment-card"
            delay={Math.min(index * 55, 280)}
            key={title}
          >
            <img src={image} alt={title} loading="lazy" decoding="async" />
            <h3>{title}</h3>
            <p>{desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Service() {
  return (
    <section className="service section" id="service">
      <div className="service-inner">
        <Reveal className="service-copy">
          <p className="eyebrow">Service Area</p>
          <h2>服务区域</h2>
          <p className="service-title">深耕海南 · 服务澄迈 · 辐射全岛</p>
          <p>
            公司立足海南省澄迈县，长期为本地及周边区域提供工程机械租赁与工程施工服务，
            具备快速调度和本地化服务优势。
          </p>
          <div className="service-points">
            {servicePoints.map(([icon, title, desc], index) => (
              <div className="service-point" style={{ "--point-delay": `${index * 90}ms` }} key={title}>
                <Icon name={icon} />
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="map-panel" aria-label="海南服务区域示意">
          <img src={serviceMap} alt="海南澄迈服务区域示意图" loading="lazy" decoding="async" />
        </Reveal>
      </div>
    </section>
  );
}

function Strength() {
  return (
    <section className="strength section" id="strength">
      <div className="strength-grid">
        <Reveal className="strength-block">
          <div className="section-mini-head">
            <p className="eyebrow">Strength</p>
            <h2>企业实力</h2>
          </div>
          <div className="stats-grid">
            {stats.map(([value, suffix, label, desc], index) => (
              <div className="stat" key={label} style={{ "--stat-delay": `${index * 80}ms` }}>
                <strong>
                  <CountUp value={value} />
                  {suffix}
                </strong>
                <span>{label}</span>
                <small>{desc}</small>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" className="project-block" delay={120}>
          <div className="section-mini-head">
            <p className="eyebrow">Featured Project</p>
            <h2>标杆项目</h2>
          </div>
          <div className="project-list">
            {featuredProjects.map((project, index) => (
              <article className="project-card" key={project.title} style={{ "--project-delay": `${index * 80}ms` }}>
                <img src={project.image} alt={project.alt} loading="lazy" decoding="async" />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                  <ul>
                    {project.points.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal as="article" className="about-block" id="about" delay={210}>
          <div className="section-mini-head">
            <p className="eyebrow">About</p>
            <h2>关于田俊程</h2>
          </div>
          <p>
            海南田俊程机械工程有限公司专注于工程机械租赁与工程施工服务，
            以专业的设备、丰富的经验和高效的服务，为客户提供可靠建设支持。
          </p>
          <dl>
            <div>
              <dt>公司地址</dt>
              <dd>{address}</dd>
            </div>
            <div>
              <dt>主营业务</dt>
              <dd>工程机械租赁、工程施工协调与设备调度</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-inner">
        <div className="contact-item">
          <Icon name="phone" />
          <div>
            <strong>电话</strong>
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        </div>
        <div className="contact-item">
          <Icon name="mail" />
          <div>
            <strong>邮箱</strong>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <p>© 2024 {companyName} 版权所有</p>
        <p>地址：{address}</p>
        <p className="icp-placeholder">ICP备案号：备案办理后填写</p>
      </div>
    </footer>
  );
}

function ContactRail() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <aside className="contact-rail" aria-label="快捷联系">
      <a href={`tel:${phone}`} aria-label="电话咨询">
        <Icon name="phone" />
      </a>
      <a href={`mailto:${email}`} aria-label="邮箱咨询">
        <Icon name="mail" />
      </a>
      <button type="button" aria-label="返回顶部" onClick={scrollToTop}>
        <Icon name="up" />
      </button>
    </aside>
  );
}

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: companyName,
      telephone: phone,
      email,
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: "澄迈县",
        addressRegion: "海南省",
        addressCountry: "CN",
      },
      areaServed: "海南省",
      description: "工程机械租赁、工程施工协调与设备调度服务。",
    }),
    [],
  );

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <Header navOpen={navOpen} setNavOpen={setNavOpen} />
      <main>
        <Hero />
        <Equipment />
        <Service />
        <Strength />
      </main>
      <Footer />
      <ContactRail />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
