import {
  AiOutlineUser,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineMail,
} from "react-icons/ai"
import {
  BsBriefcaseFill,
  BsCodeSlash,
  BsAwardFill,
  BsGlobe,
  BsJournalAlbum,
  BsCpu,
  BsCloudFill,
  BsGraphUp,
  BsPeopleFill,
} from "react-icons/bs"
import { FiFileText, FiCode } from "react-icons/fi"
import { FaServer, FaDocker, FaBlog, FaChartBar, FaUserShield } from "react-icons/fa"
import { MenuData, ServiceData, ClientData, TestimonialData, WorkData, BlogPost, StatItem, TechStat } from "../types"
import About from "../components/aboutPage/About"
import Resume from "../components/resumePage/Resume"
import Works from "../components/worksPage/Works"
import Contact from "../components/contactPage/Contact"
import Blog from "../components/blogPage/Blog"
import Stats from "../components/statsPage/Stats"
import AdminDashboard from "../components/adminPage/AdminDashboard"

export const menus: MenuData[] = [
  { id: 1, label: "about",   Icon: AiOutlineUser,  Component: About          },
  { id: 2, label: "resume",  Icon: FiFileText,     Component: Resume         },
  { id: 3, label: "works",   Icon: FiCode,         Component: Works          },
  { id: 4, label: "blog",    Icon: FaBlog,         Component: Blog           },
  { id: 5, label: "stats",   Icon: FaChartBar,     Component: Stats          },
  { id: 6, label: "contact", Icon: AiOutlineMail,  Component: Contact        },
  { id: 7, label: "admin",   Icon: FaUserShield,   Component: AdminDashboard },
]

export const socialMedia = [
  {
    id: 1,
    Icon: AiFillGithub,
    label: "GitHub",
    mediaUrl: "https://github.com/ClaerDev",
  },
  {
    id: 3,
    Icon: AiOutlineMail,
    label: "Email",
    mediaUrl: "mailto:tobeiokita35@gmail.com",
  },
]

export const services: ServiceData[] = [
  {
    id: 1,
    title: "AI & LLM Development",
    description:
      "Build intelligent applications powered by AI. From chatbots and content generation to document analysis and automated workflows, I create AI solutions that solve real business problems.",
    Icon: BsBriefcaseFill,
  },
  {
    id: 2,
    title: "Full-Stack Engineering",
    description:
      "Complete web applications from front to back. Modern, responsive interfaces paired with robust server-side logic, databases, and APIs. Scalable solutions that grow with your business.",
    Icon: FiCode,
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    description:
      "Streamlined deployment pipelines with Docker and AWS. Automated testing, continuous integration, and reliable deployments across development, staging, and production environments.",
    Icon: FaDocker,
  },
  {
    id: 4,
    title: "Backend & API Design",
    description:
      "Fast, secure REST and GraphQL APIs that connect your applications. Clean architecture, efficient database design, and comprehensive documentation for seamless integration.",
    Icon: FaServer,
  },
]

export const clients: ClientData[] = [
  {
    id: 1,
    name: "IntelliAI Solutions",
    logoUrl: "https://via.placeholder.com/120x40/ffffff/78cc6d?text=IntelliAI",
  },
  {
    id: 2,
    name: "Zenith Review Inc",
    logoUrl: "https://via.placeholder.com/120x40/ffffff/78cc6d?text=Zenith",
  },
  {
    id: 3,
    name: "Jupiter Enterprises",
    logoUrl: "https://via.placeholder.com/120x40/ffffff/78cc6d?text=Jupiter",
  },
  {
    id: 4,
    name: "Phoenix Venture Partners",
    logoUrl: "https://via.placeholder.com/120x40/ffffff/78cc6d?text=Phoenix",
  },
]

export const testimonials: TestimonialData[] = [
  {
    id: 1,
    quote:
      "Takumi delivered an outstanding AI pipeline that dramatically improved our knowledge retrieval accuracy. His expertise in LangChain and RAG is exceptional.",
    userName: "Alex Martinez",
    userProfession: "CTO at IntelliAI Solutions",
    userImage: {
      url: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&q=80",
    },
  },
  {
    id: 2,
    quote:
      "Working with Takumi on our SaaS platform was a game changer. He brought deep full-stack expertise and a strong eye for scalable architecture.",
    userName: "Sarah Chen",
    userProfession: "Product Manager at Zenith Review Inc",
    userImage: {
      url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    },
  },
  {
    id: 3,
    quote:
      "Takumi reduced our deployment time from 3 hours to 25 minutes with his CI/CD improvements. Highly recommend him for any DevOps or full-stack work.",
    userName: "James Wilson",
    userProfession: "Engineering Lead at Jupiter Enterprises",
    userImage: {
      url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80",
    },
  },
  {
    id: 4,
    quote:
      "His AI solutions transformed how we handle customer inquiries. The chatbot he built understands context perfectly and has reduced response times by 60%.",
    userName: "Emily Rodriguez",
    userProfession: "Operations Director at TechFlow Inc",
    userImage: {
      url: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&q=80",
    },
  },
  {
    id: 5,
    quote:
      "Takumi's ability to explain complex technical concepts in simple terms made collaboration seamless. His code quality and documentation are top-notch.",
    userName: "Michael Thompson",
    userProfession: "Senior Developer at CloudSync Systems",
    userImage: {
      url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
    },
  },
  {
    id: 6,
    quote:
      "The API architecture Takumi designed for our platform is elegant and performant. He anticipated scaling challenges before they became problems.",
    userName: "Priya Sharma",
    userProfession: "Tech Lead at DataHub Solutions",
    userImage: {
      url: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=400&q=80",
    },
  },
]

export const quoteData: TestimonialData = {
  id: 99,
  quote:
    "The best way to predict the future is to invent it. Code is not just instructions for machines — it is the language through which we shape tomorrow.",
  userName: "Takumi Shimizu",
  userProfession: "Senior AI & Full Stack Engineer",
  userImage: {
    url: "/images/avatar.png",
  },
}

export const experienceData = [
  {
    id: "exp1",
    badge: "03/2024 – 02/2026",
    title: "AI | Full-Stack Engineer",
    subTitle: "Chinougijutsu Co., Ltd. — Osaka, Japan",
    desc: "Designed and deployed production AI applications using FastAPI, LangChain, OpenAI APIs, and vector databases. Built RAG pipelines that improved response accuracy and reduced hallucinations. Developed AI agents to automate multi-step business workflows. Reduced API latency by 40% while lowering infrastructure costs. Led a team of eight engineers.",
    experience: true,
  },
  {
    id: "exp2",
    badge: "06/2022 – 02/2024",
    title: "AI Developer",
    subTitle: "Rokken — Osaka, Japan",
    desc: "Built machine learning pipelines for real-time sentiment analysis with high prediction accuracy. Implemented privacy-preserving ML techniques for healthcare applications. Integrated AI-powered features into the company's SaaS platform. Developed backend services using Python, FastAPI, PostgreSQL, and Docker.",
    experience: true,
  },
  {
    id: "exp3",
    badge: "09/2020 – 06/2022",
    title: "Full Stack Developer",
    subTitle: "Fenrir Inc — Osaka, Japan",
    desc: "Developed a microservices-based e-commerce platform using React, Node.js, GraphQL, and PostgreSQL. Reduced page load time by 30% through frontend optimization. Designed GraphQL APIs for high-volume production traffic. Implemented CI/CD pipelines using GitHub Actions and Docker, reducing deployment time from 3 hours to 25 minutes.",
    experience: true,
  },
  {
    id: "exp4",
    badge: "05/2018 – 08/2020",
    title: "Junior Full Stack Developer",
    subTitle: "KINTO Technologies — Osaka, Japan",
    desc: "Built and maintained RESTful APIs using Django, Python, and PostgreSQL. Migrated legacy JavaScript applications to TypeScript, improving maintainability and reducing production bugs. Developed automated testing pipelines using Jest and Cypress.",
    experience: true,
  },
]

export const educationData = [
  {
    id: "edu1",
    badge: "04/2014 – 03/2018",
    title: "Bachelor of Science in Computer Science",
    subTitle: "International Professional University of Technology — Osaka, Japan",
    desc: "Specialization in Artificial Intelligence. Studied machine learning, algorithms, data structures, distributed systems, and software engineering principles.",
    experience: false,
  },
]

export const skillsData = {
  backEnd: [
    { id: "b1", field: "Python / FastAPI", value: "95" },
    { id: "b2", field: "Node.js / Express", value: "90" },
    { id: "b3", field: "Django", value: "88" },
    { id: "b4", field: "Go", value: "80" },
  ],
  frontEnd: [
    { id: "f1", field: "React / Next.js", value: "93" },
    { id: "f2", field: "TypeScript", value: "92" },
    { id: "f3", field: "Tailwind CSS", value: "90" },
    { id: "f4", field: "Redux / React Query", value: "88" },
  ],
  knowledge: [
    "LangChain & LangGraph",
    "RAG Pipelines",
    "AI Agents",
    "OpenAI / GPT-5.6 APIs",
    "Vector Databases (Pinecone, Weaviate)",
    "Prompt Engineering & Fine-tuning (LoRA, PEFT)",
    "Docker & Kubernetes",
    "AWS & Terraform",
    "CI/CD (GitHub Actions)",
    "PostgreSQL / MongoDB / Redis / Elasticsearch",
    "GraphQL & REST APIs",
    "Microservices Architecture",
  ],
  languages: [
    { id: "l1", field: "English", value: "10" },
    { id: "l2", field: "Japanese", value: "10" },
  ],
}

export const worksData: WorkData[] = [
  // ── AI Projects ────────────────────────────────────────────────────────────
  {
    id: "w1",
    title: "MatrixAI — AI SaaS Platform",
    description:
      "A production-grade AI SaaS platform with multi-model support, chat interface, and automated workflow orchestration. Built with Next.js and OpenAI APIs.",
    liveUrl: "https://jj-nextgen-ai.vercel.app/",
    githubUrl: "https://github.com/ClaerDev/AI-MatrixAI",
    images: [
      { url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80" },
    ],
    technologies: ["Next.js", "OpenAI API", "TypeScript", "Tailwind CSS"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  {
    id: "w2",
    title: "MindForge — AI Productivity SaaS",
    description:
      "AI-powered productivity SaaS platform featuring intelligent note-taking, knowledge management, and automated content generation workflows.",
    liveUrl: "https://mindforgee.vercel.app/",
    githubUrl: "https://github.com/ClaerDev/Mindforge",
    images: [
      { url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80" },
    ],
    technologies: ["React", "Node.js", "OpenAI API", "PostgreSQL"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  {
    id: "w3",
    title: "Lumore — AI UI/UX E-Commerce",
    description:
      "Modern AI-enhanced e-commerce experience with intelligent product recommendations, dynamic UI, and seamless checkout flow.",
    liveUrl: "https://lumore.vercel.app/",
    githubUrl: "https://github.com/ClaerDev/E-commerce-project",
    images: [
      { url: "https://api.microlink.io/?url=https://lumore.vercel.app/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  {
    id: "w4",
    title: "Document Chat — RAG System",
    description:
      "Retrieval-Augmented Generation system for document intelligence. Upload any document and chat with it using natural language powered by vector search.",
    liveUrl: "https://document-chat-system.vercel.app/",
    githubUrl: "https://github.com/ClaerDev/document-chat-system",
    images: [
      { url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80" },
    ],
    technologies: ["Python", "LangChain", "FastAPI", "Pinecone", "OpenAI API"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  {
    id: "w5",
    title: "ACE AI — LangChain Study Assistant",
    description:
      "Full-stack AI study assistant built with Next.js, FastAPI, LangChain, and Pinecone. Features document upload, chat, quiz and notes generation, and web search agent.",
    liveUrl: "https://ace-ai-ashen.vercel.app",
    githubUrl: "https://github.com/ClaerDev/nextjs-fastapi",
    images: [
      { url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80" },
    ],
    technologies: ["Next.js", "FastAPI", "LangChain", "Pinecone", "OpenAI API"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  {
    id: "w6",
    title: "Video2Text — FastAPI AI Transcription",
    description:
      "AI-powered video-to-text transcription service built with FastAPI. Automatically extracts and transcribes audio from video files with high accuracy.",
    liveUrl: "https://e-commerce.partners/video-to-text/",
    githubUrl: "https://github.com/ClaerDev/video-2-ai",
    images: [
      { url: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80" },
    ],
    technologies: ["Python", "FastAPI", "Whisper", "Docker"],
    workTabs: [{ tab: "All" }, { tab: "AI" }],
  },
  // ── Full Stack Projects ────────────────────────────────────────────────────
  {
    id: "w7",
    title: "Wedding Site — Full Stack",
    description:
      "Elegant wedding website with RSVP management, event details, photo gallery, and guest coordination features. Clean modern design with smooth animations.",
    liveUrl: "http://site-weding.netlify.app",
    githubUrl: "https://github.com/ClaerDev/Wedding-site",
    images: [
      { url: "https://api.microlink.io/?url=https://site-weding.netlify.app/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["React", "Node.js", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },
  {
    id: "w8",
    title: "Modern E-Commerce Platform",
    description:
      "Fully responsive and modern e-commerce website with product listings, cart, checkout, and order management. Built for performance and scalability.",
    liveUrl: "https://modern-commerce-site.netlify.app/",
    githubUrl: "https://github.com/ClaerDev/-Fully-responsive-and-modern-eCommerce-website",
    images: [
      { url: "https://api.microlink.io/?url=https://modern-commerce-site.netlify.app/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },
  {
    id: "w9",
    title: "Weflix — Free Movie Streaming",
    description:
      "Movie streaming platform with real-time search, genre filtering, watchlists, and a clean cinema-style UI. Integrates with external media APIs.",
    liveUrl: "https://www.weflix.app/",
    githubUrl: "https://github.com/ClaerDev/Free-Movie-Streaming-Website",
    images: [
      { url: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80" },
    ],
    technologies: ["React", "REST API", "Tailwind CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },
  {
    id: "w10",
    title: "Teamora — Multi-Tenant Project Management",
    description:
      "ERP-style multi-tenant project management platform with team workspaces, task tracking, role-based access control, and real-time updates.",
    liveUrl: "https://teamora.vercel.app",
    githubUrl: "https://github.com/ClaerDev/Teamora",
    images: [
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" },
    ],
    technologies: ["Django", "DRF", "React", "Redux", "PostgreSQL", "Redis"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },
  {
    id: "w11",
    title: "Coode — Online Course Platform",
    description:
      "Full-featured online course platform with video lessons, Stripe payments, progress tracking, and instructor dashboards. Built with Next.js 15 and Drizzle ORM.",
    liveUrl: "https://coode-platform.vercel.app",
    githubUrl: "https://github.com/ClaerDev/coode",
    images: [
      { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" },
    ],
    technologies: ["Next.js 15", "React", "Stripe", "Drizzle ORM", "PostgreSQL"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },
  {
    id: "w12",
    title: "Amazoning — Full-Stack E-Commerce",
    description:
      "Comprehensive full-stack e-commerce platform inspired by Amazon. Features include product catalog, shopping cart, user authentication, order management, and payment processing.",
    liveUrl: "https://amazoning.onrender.com/",
    githubUrl: "https://github.com/ClaerDev/e-commerce-full-stack-project",
    images: [
      { url: "https://api.microlink.io/?url=https://amazoning.onrender.com/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    workTabs: [{ tab: "All" }, { tab: "Full-Stack" }],
  },

  // ── Web Design Projects ────────────────────────────────────────────────────
  {
    id: "w13",
    title: "Miss Helly — Hair Care Brand",
    description:
      "Elegant e-commerce website for a premium Japanese hair care brand. Graceful, flower-inspired UI with product listings, brand storytelling, and smooth animations.",
    liveUrl: "https://misshelly.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fmisshelly.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "EC-CUBE"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w14",
    title: "Senya Gafu — Samurai Experience",
    description:
      "Immersive website for a traditional Japanese samurai and sword experience service. Rich storytelling, temple venue showcases, and cultural activity booking.",
    liveUrl: "https://senya-gafu.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fsenya-gafu.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w14",
    title: "Tsubaki Music School — Online Lessons",
    description:
      "Large-scale music school website covering all 23 Tokyo wards. Instrument search, lesson booking system, and instructor profiles across hundreds of locations.",
    liveUrl: "https://tsubaki-musicschool.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Ftsubaki-musicschool.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "PHP", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w15",
    title: "Dress Atelier — Wedding Dress Shop",
    description:
      "Sophisticated bridal boutique website for a Sapporo wedding dress shop. Gallery, rental plans, ceremony packages, and photo plan pages with a luxurious aesthetic.",
    liveUrl: "https://dress-atelier.jp/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fdress-atelier.jp%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w16",
    title: "Flower Web Shop — Fashion EC",
    description:
      "Official online store for the Flower fashion brand. Seasonal lookbooks, layered-style collections, and a seamless shopping experience for women's apparel.",
    liveUrl: "https://flower-webshop.jp/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fflower-webshop.jp%2F&screenshot=true&meta=false&embed=screenshot.url&scroll=footer" },
    ],
    technologies: ["Shopify", "Liquid", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w17",
    title: "Ririmew — Japanese Cosmetics",
    description:
      "Official website for Ririmew, a popular Japanese cosmetics brand. Product launches, makeup tutorials, colour lookbooks, and a full e-commerce catalogue.",
    liveUrl: "https://www.ririmew.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io/?url=https://www.ririmew.com/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["Shopify", "Liquid", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w18",
    title: "Gelato Pique — Lifestyle Brand",
    description:
      "Premium lifestyle and loungewear brand website. Clean, minimal design with seasonal collections, lookbooks, and an integrated online shop experience.",
    liveUrl: "https://gelatopique.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fgelatopique.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["Shopify", "Liquid", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w19",
    title: "Studio Tremo — Creative Studio",
    description:
      "Portfolio and services website for a creative studio. Minimal, editorial design showcasing photography, branding, and video production work.",
    liveUrl: "https://studio-tremo.com/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fstudio-tremo.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w20",
    title: "HK Wedding — Bridal Studio",
    description:
      "Elegant wedding studio website offering photo, dress, and ceremony planning services. Soft, romantic aesthetic with gallery showcases and booking flow.",
    liveUrl: "https://www.hk-wedding.jp/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io/?url=https://www.hk-wedding.jp/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w21",
    title: "Ogiya Wedding — Wedding Hall",
    description:
      "Wedding hall and banquet venue website with ceremony plan showcases, venue galleries, and a comprehensive reservation and consultation system.",
    liveUrl: "https://ogiya-wedding.jp/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io/?url=https://ogiya-wedding.jp/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w22",
    title: "Ecru's Pose — Bridal Photography",
    description:
      "Bridal photo studio website with a soft, sophisticated design. Features photo plan options, couple galleries, and an online appointment booking system.",
    liveUrl: "https://www.ecruspose.jp/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io/?url=https://www.ecruspose.jp/&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["WordPress", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
  {
    id: "w23",
    title: "Kuraudia Holdings — Bridal Group",
    description:
      "Corporate website for a major Japanese bridal industry holding company. Clean corporate design presenting group brands, IR information, and company overview.",
    liveUrl: "https://www.kuraudia.holdings/",
    githubUrl: "",
    images: [
      { url: "https://api.microlink.io?url=https%3A%2F%2Fwww.kuraudia.holdings%2F&screenshot=true&meta=false&embed=screenshot.url" },
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    workTabs: [{ tab: "All" }, { tab: "Web Design" }],
  },
]

export const workTabs = ["All", "AI", "Full-Stack", "Web Design"]

export const prices = [
  {
    id: "p1",
    title: "AI Consulting",
    price: "$150/hr",
    features: [
      "LLM Application Design",
      "RAG Pipeline Architecture",
      "AI Agent Development",
      "Performance Optimization",
      "Technical Review",
    ],
  },
  {
    id: "p2",
    title: "Full-Stack Development",
    price: "$120/hr",
    features: [
      "React / Next.js Frontend",
      "FastAPI / Node.js Backend",
      "Database Design",
      "Cloud Deployment",
      "CI/CD Setup",
    ],
  },
]

// ─── Blog Data ───────────────────────────────────────────────────────────────

export const blogTabs = ["All", "AI", "Full-Stack", "Web Design"]

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Building MatrixAI: A Multi-Model AI SaaS Platform",
    excerpt:
      "How I architected a production AI SaaS platform with Next.js and OpenAI APIs — covering multi-model routing, streaming responses, auth, and deployment on Vercel.",
    content: `MatrixAI started as an experiment: what would a truly production-grade AI SaaS look like when built lean?\n\n**Multi-Model Architecture**\nRather than hardcoding GPT-4, I built a model router that selects the best model per request based on complexity, cost, and latency targets. Simple queries hit GPT-3.5-turbo; complex reasoning goes to GPT-4o. This cut costs by ~35% with no quality loss.\n\n**Streaming with Next.js App Router**\nNext.js 14's App Router + React Server Components made streaming trivial. I use the Vercel AI SDK's useChat hook on the client, with a route handler that pipes OpenAI's streaming response directly to the browser.\n\n**Auth & Multi-Tenancy**\nClerk handles auth — it's the fastest way to get social login, session management, and org-level multi-tenancy running without rolling your own. Each org gets isolated usage quotas tracked in Postgres.\n\n**Deployment**\nVercel + Postgres (Neon serverless) + Edge Functions for the streaming endpoints. Cold starts are under 200ms thanks to Edge runtime. Total infra cost for early users: under $20/month.`,
    category: "AI",
    date: "Jul 2025",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    tags: ["Next.js", "OpenAI", "SaaS", "TypeScript"],
  },
  {
    id: "b2",
    title: "MindForge: AI-Powered Knowledge Management at Scale",
    excerpt:
      "Inside the architecture of MindForge — an AI productivity SaaS with intelligent note-taking, semantic search, and automated content generation built on React and Node.js.",
    content: `MindForge solves the problem every developer faces: too much information, not enough structure. Here is how I built the AI layer.\n\n**Semantic Search over Notes**\nEvery note is embedded with text-embedding-3-small at save time and stored in Pinecone. When you search, the query is embedded and the top-k semantically similar notes are returned — far better than keyword matching.\n\n**Auto-Summarisation Pipeline**\nLong notes are chunked and summarised on a background queue (Bull + Redis). Summaries are cached and re-generated only when the source note changes. This keeps the UI instant while the LLM work happens asynchronously.\n\n**Content Generation Workflows**\nUsers can trigger generation jobs: expand a bullet list into a full doc, generate a presentation outline from notes, or draft an email from a meeting summary. Each workflow is a LangChain chain with a structured output parser.\n\n**Scaling the Backend**\nNode.js + Fastify (not Express — Fastify is ~30% faster for JSON serialisation). PostgreSQL for relational data, Redis for caching and queues. Everything containerised with Docker and deployed on Railway.`,
    category: "AI",
    date: "Jun 2025",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80",
    tags: ["React", "Node.js", "OpenAI", "Pinecone"],
  },
  {
    id: "b3",
    title: "Lumore: Designing an AI-Enhanced E-Commerce Experience",
    excerpt:
      "How I used AI to personalise the shopping experience on Lumore — product recommendations, smart search, and dynamic UI components driven by user behaviour.",
    content: `E-commerce personalisation used to require a data science team. With modern LLMs and embedding models, one engineer can ship a compelling personalised experience.\n\n**AI Product Recommendations**\nI embed product descriptions and user purchase history, then use cosine similarity to surface relevant products. Updated nightly via a cron job — no real-time inference needed, which keeps costs near zero.\n\n**Semantic Product Search**\nInstead of SQL LIKE queries, search uses a hybrid approach: BM25 keyword matching combined with vector similarity re-ranking. Users find what they mean, not just what they typed.\n\n**Dynamic UI with AI**\nThe hero banner and featured products sections are populated by a lightweight recommendation model that considers time-of-day, device type, and browsing history. A/B tested against static content — 18% higher click-through.\n\n**Tech Stack**\nNext.js 14 App Router for the frontend, a serverless FastAPI layer for AI inference, and Shopify as the commerce backend via GraphQL Storefront API. Hosted on Vercel with edge caching for static pages.`,
    category: "AI",
    date: "May 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    tags: ["Next.js", "AI", "E-Commerce", "TypeScript"],
  },
  {
    id: "b4",
    title: "Document Chat: Building a Production RAG System from Scratch",
    excerpt:
      "A complete walkthrough of the Document Chat RAG system — from document ingestion and chunking to vector search, reranking, and a clean chat UI.",
    content: `Document Chat lets users upload any PDF, Word doc, or text file and chat with it using natural language. Here is how the pipeline works end to end.\n\n**Document Ingestion**\nFiles are uploaded to S3, then processed by a FastAPI background task. I use LangChain's document loaders for format handling, then recursive character splitting with 512-token chunks and 64-token overlap.\n\n**Embedding & Storage**\nChunks are embedded with OpenAI's text-embedding-3-small and upserted to Pinecone with document metadata (filename, page number, chunk index). Namespace per user keeps data isolated.\n\n**Retrieval & Reranking**\nOn each query, I retrieve top-20 chunks by cosine similarity, then rerank with Cohere's rerank-english-v2.0 model to get the top-5. The reranker consistently outperforms pure vector similarity by a meaningful margin on precision.\n\n**Chat Interface**\nNext.js + Vercel AI SDK on the frontend. The API handler streams the LLM response token-by-token. Source citations (filename + page) are appended after the answer so users can verify every claim.`,
    category: "AI",
    date: "Apr 2025",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80",
    tags: ["LangChain", "RAG", "FastAPI", "Pinecone"],
  },
  {
    id: "b5",
    title: "ACE AI: Full-Stack Study Assistant with LangChain and Pinecone",
    excerpt:
      "Building ACE AI — a Next.js + FastAPI study assistant that combines document chat, quiz generation, note summarisation, and a web search agent in one cohesive app.",
    content: `ACE AI combines four AI features that students actually need: document chat, quiz generation, note summarisation, and live web search. Here is how I built each one.\n\n**Document Chat with Pinecone**\nSame RAG pipeline as Document Chat (see previous post) but scoped to study materials. Each user's uploaded notes are namespaced in Pinecone so queries only search their own documents.\n\n**Quiz Generation**\nGiven a topic or uploaded doc, GPT-4o generates multiple-choice questions with distractors and explanations. I use structured output (JSON mode) and validate with Pydantic before returning to the client — no more hallucinated answer formats.\n\n**Web Search Agent**\nFor questions beyond the uploaded docs, a LangChain agent with a Tavily Search tool fetches current information. The agent decides whether to use search based on the query — it doesn't blindly call the web for every question.\n\n**Vercel AI SDK Integration**\nThe Next.js frontend uses useChat for the streaming chat UI and useCompletion for one-shot generation features (quiz, summary). Both connect to the same FastAPI backend via separate endpoints.`,
    category: "AI",
    date: "Mar 2025",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    tags: ["LangChain", "Next.js", "FastAPI", "Pinecone"],
  },
  {
    id: "b6",
    title: "Video2Text: AI Transcription Service with FastAPI and Whisper",
    excerpt:
      "How I built a production video-to-text transcription API using OpenAI Whisper and FastAPI — handling large files, async processing, and accurate speaker timestamps.",
    content: `Video2Text lets users submit any video URL or upload a file and receive an accurate transcript within minutes. The engineering is straightforward but the edge cases are brutal.\n\n**Whisper for Transcription**\nOpenAI's Whisper large-v3 model is the quality bar to beat for transcription. I run it via the openai-whisper Python package on a CPU instance — GPU would be faster but the cost doesn't justify it for batch workloads.\n\n**Async Processing with FastAPI**\nLong videos can take minutes to process. The API accepts the job and returns a task ID immediately. A Celery worker picks up the job, processes it, and stores the result in Redis. The client polls the task status endpoint until completion.\n\n**Audio Extraction**\nffmpeg extracts audio from video before passing to Whisper. I chunk long audio into 30-minute segments to avoid memory issues on the worker. Segments are transcribed in parallel when multiple workers are available.\n\n**Timestamp & Speaker Info**\nWhisper's word-level timestamps are enabled for precise subtitle generation. For speaker diarisation (who said what), I integrate pyannote.audio as a post-processing step — it assigns speaker labels to each Whisper segment.`,
    category: "AI",
    date: "Feb 2025",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
    tags: ["FastAPI", "Whisper", "Python", "Docker"],
  },
  {
    id: "b7",
    title: "Building a Wedding Website with React: UX Lessons Learned",
    excerpt:
      "What I learned building a full wedding website — from RSVP flow design and photo gallery performance to guest-facing UX and mobile-first layout decisions.",
    content: `Building a wedding website sounds simple. It isn't — guests range from 18 to 80, many on mobile, some on slow connections, all with zero tolerance for confusion.\n\n**RSVP Form UX**\nThe RSVP form went through four iterations. Key insight: multi-step forms with a progress indicator outperformed single-page forms for completion rate. Guests knew exactly how much was left.\n\n**Photo Gallery Performance**\nOriginal implementation loaded full-res images — page weight hit 40MB. Solution: sharp for server-side image resizing to multiple breakpoints, lazy loading with IntersectionObserver, and WebP with JPEG fallback. Page weight dropped to 3MB.\n\n**Mobile-First Everything**\nOver 70% of RSVP submissions came from mobile. I rebuilt the layout mobile-first with CSS Grid, ensuring tap targets were minimum 44×44px and form inputs didn't trigger unwanted zoom on iOS.\n\n**Animation Without Jank**\nUsed Framer Motion for entrance animations but wrapped every animation in a will-change: transform to keep compositing on the GPU. No layout thrash, smooth 60fps on mid-range Android devices.`,
    category: "Full-Stack",
    date: "Jan 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    tags: ["React", "UX", "Performance", "JavaScript"],
  },
  {
    id: "b8",
    title: "Modern E-Commerce with React, Node.js, and Stripe",
    excerpt:
      "A practical guide to building a production e-commerce platform — cart state management, Stripe checkout integration, order management, and performance optimisation.",
    content: `Building e-commerce from scratch teaches you exactly why Shopify exists. But doing it yourself gives you full control and a deep understanding of the moving parts.\n\n**Cart State Management**\nI used Zustand for cart state — simpler than Redux for this use case, with built-in persistence via zustand/middleware. The cart syncs to localStorage so it survives page refreshes.\n\n**Stripe Integration**\nStripe Checkout handles the payment page — no PCI scope, battle-tested UX. I use Stripe webhooks to update order status server-side. The webhook handler verifies the signature before processing to prevent spoofed events.\n\n**Order Management**\nOrders are stored in MongoDB with status transitions (pending → paid → shipped → delivered). An admin dashboard built with React Query and a simple Express API lets me manage inventory and update order statuses.\n\n**Performance**\nNext.js ISR (Incremental Static Regeneration) for product pages — they rebuild in the background when inventory changes, serving static HTML to users. Product pages load in under 500ms on a 4G connection.`,
    category: "Full-Stack",
    date: "Dec 2024",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
  },
  {
    id: "b9",
    title: "Weflix: Building a Movie Streaming UI with React",
    excerpt:
      "How I built Weflix — a Netflix-style movie streaming interface with React, real-time search, genre filtering, and a media API integration that handles thousands of titles.",
    content: `Weflix is a front-end engineering challenge disguised as a fun project. Here is what made it non-trivial.\n\n**API Integration Strategy**\nThe TMDB API returns paginated results with variable response shapes. I wrote a typed API client with Zod validation — if the API returns unexpected data, the app fails gracefully instead of crashing.\n\n**Real-Time Search**\nSearch is debounced at 300ms with useCallback. Results are cached in a Map keyed by query string — repeat searches are instant. I cancel in-flight requests with AbortController when a new query comes in before the previous one resolves.\n\n**Virtualized Lists**\nWith thousands of titles, rendering every card causes noticeable jank. React Window virtualises the grid — only visible cards are in the DOM. Scroll performance stays at 60fps even on long genre lists.\n\n**Trailer Modals**\nYouTube embeds inside a React Portal with a focus trap for accessibility. The modal preloads the iframe src only when opened — not on page load — so it doesn't affect initial LCP.`,
    category: "Full-Stack",
    date: "Nov 2024",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    tags: ["React", "REST API", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "b10",
    title: "Teamora: Multi-Tenant ERP Architecture with Django and React",
    excerpt:
      "Deep dive into Teamora's multi-tenant architecture — Django DRF for the API, React Redux for state, PostgreSQL row-level security for data isolation, and Redis for real-time features.",
    content: `Multi-tenancy at the application level is one of those architectural decisions you want to get right from day one. Here is how Teamora handles it.\n\n**Tenant Isolation**\nEvery database row has a tenant_id foreign key. A custom Django middleware injects the tenant into every ORM query via a thread-local, so no query can accidentally leak data across tenants. PostgreSQL row-level security adds a database-level enforcement layer.\n\n**Django REST Framework Structure**\nViewSets with tenant-scoped querysets, serializers with nested relations, and custom permissions that check both authentication and tenant membership. API versioning via URL prefix (v1, v2) from day one.\n\n**Real-Time with Redis and Channels**\nProject status updates and notifications use Django Channels over WebSocket. Redis as the channel layer — all worker processes share the same pub/sub bus, so notifications reach users regardless of which dyno handles their WebSocket.\n\n**React Redux State**\nRedux Toolkit with RTK Query for API fetching. One slice per resource (projects, tasks, members). Optimistic updates for task status changes — the UI updates instantly while the API call happens in the background.`,
    category: "Full-Stack",
    date: "Oct 2024",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    tags: ["Django", "React", "Redux", "PostgreSQL"],
  },
  {
    id: "b11",
    title: "Coode: Building an Online Course Platform with Next.js 15 and Stripe",
    excerpt:
      "How I built Coode — a full-featured online learning platform with Next.js 15, Drizzle ORM, Stripe subscriptions, video progress tracking, and instructor dashboards.",
    content: `Course platforms seem simple until you start building one. Video delivery, payment flows, progress tracking, and instructor tooling each have real depth.\n\n**Next.js 15 App Router**\nServer Components for the course catalogue (rendered at request time, always fresh), Client Components only where interactivity is needed (video player, quiz). This gets excellent Core Web Vitals without any manual optimisation.\n\n**Drizzle ORM + PostgreSQL**\nDrizzle's TypeScript-first design means your schema is your types. Migrations are SQL files you control — no magic. Relations are declared in the schema and Drizzle generates the correct JOINs. I use Neon serverless Postgres for zero cold-start connection pooling.\n\n**Stripe Subscriptions**\nThree tiers: free (preview lessons), pro (full access), team (multiple seats). Stripe Customer Portal handles upgrades, downgrades, and cancellations without custom UI. Webhooks sync subscription status to the database.\n\n**Video Progress Tracking**\nI track progress events (started, 25%, 50%, 75%, completed) from the video player and store them per user per lesson. Completion certificates are generated server-side with a PDF library when 100% of lessons in a course are marked complete.`,
    category: "Full-Stack",
    date: "Sep 2024",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    tags: ["Next.js 15", "Stripe", "Drizzle ORM", "PostgreSQL"],
  },
  {
    id: "b12",
    title: "Amazoning: Building a Full-Stack E-Commerce Platform",
    excerpt:
      "Deep dive into building Amazoning — a comprehensive Amazon-inspired e-commerce platform with React, Node.js, Express, MongoDB, user authentication, shopping cart, and Stripe payment integration.",
    content: `Building a full-featured e-commerce platform from scratch teaches you the complexity behind modern online retail. Amazoning covers the complete user journey from browsing to checkout.\n\n**Architecture Overview**\nFull MERN stack: React frontend with React Router for navigation, Express.js REST API, MongoDB for data persistence, and JWT-based authentication. The frontend and backend are deployed separately — React on Netlify, Express on Render.\n\n**User Authentication & Authorization**\nJWT tokens stored in httpOnly cookies for security. Role-based access control distinguishes between customers and admin users. Password hashing with bcrypt before storage. Protected routes on both frontend and backend.\n\n**Shopping Cart & State Management**\nCart state managed with React Context API. Cart persists to localStorage so users don't lose items on page refresh. Real-time price calculations including tax and shipping. Guest checkout supported with email confirmation.\n\n**Product Catalog & Search**\nMongoDB for flexible product schema with categories, variants, and inventory tracking. Text search with MongoDB indexes. Image uploads handled via Cloudinary for optimized delivery and transformations.\n\n**Payment Processing**\nStripe Checkout integration for secure payment handling. Webhook listeners for order confirmation. Automatic email receipts sent via SendGrid. Order history accessible in user dashboard.\n\n**Admin Dashboard**\nFull CRUD operations for products, orders, and users. Sales analytics with chart visualizations. Inventory management with low-stock alerts. Order fulfillment workflow with status tracking.`,
    category: "Full-Stack",
    date: "Aug 2024",
    readTime: "9 min read",
    coverImage: "https://api.microlink.io/?url=https://amazoning.onrender.com/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
  },
  {
    id: "b13",
    title: "Miss Helly: Building a Premium Hair Care Brand Website",
    excerpt: "How I designed and built the Miss Helly hair care e-commerce site — balancing graceful brand aesthetics with a smooth product browsing and purchase experience.",
    content: `Miss Helly required a site that felt as refined as the products themselves. The brief was clear: floral, elegant, and feminine without being fragile.\n\n**Brand-First Design**\nEvery layout decision started with the brand language. Soft cream backgrounds, serif-influenced typography, and generous whitespace let the product photography breathe.\n\n**Product Architecture**\nThe catalogue is structured around hair concern categories — moisture, shine, damage repair — so customers find solutions rather than browsing blind. Each product page includes ingredient highlights and usage guides.\n\n**Performance**\nAll hero images are served in WebP with JPEG fallback. Lazy loading is applied to below-fold product grids. The result is a sub-2s LCP on mobile despite the rich imagery.`,
    category: "Web Design",
    date: "Aug 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fmisshelly.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "E-Commerce", "CSS", "JavaScript"],
  },
  {
    id: "b13",
    title: "Senya Gafu: Designing an Immersive Japanese Cultural Experience Site",
    excerpt: "Building the website for a samurai and traditional arts experience brand — merging historical aesthetics with modern web storytelling and booking flows.",
    content: `Senya Gafu offers sword, Zen, and tea ceremony experiences at temples and dojos across Japan. The website needed to transport visitors into that world before they ever booked.\n\n**Storytelling Layout**\nEach experience page opens with full-bleed photography, followed by descriptive copy written in both poetic Japanese and clear English. The scroll journey mirrors the experience itself — unhurried, deliberate.\n\n**Venue Showcases**\nThree distinct venue types (temple, urban dojo, rural farmhouse) each have dedicated pages with atmosphere photography, access maps, and available experience menus.\n\n**Booking Integration**\nA reservation form connects to an external booking system. Date availability is fetched via API so guests see real-time slot availability without leaving the page.`,
    category: "Web Design",
    date: "Jul 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fsenya-gafu.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "JavaScript", "UX"],
  },
  {
    id: "b15",
    title: "Tsubaki Music School: Scaling a Lesson Booking Site Across Tokyo",
    excerpt: "How I built a music school website covering all 23 Tokyo wards — with searchable lesson listings, instructor profiles, and a high-performance location-based browsing system.",
    content: `Tsubaki Music School operates across hundreds of locations in Tokyo. The challenge: make a vast catalogue feel navigable and personal.\n\n**Location Search Architecture**\nA custom location search lets students filter by nearest station, instrument, and lesson style. The query system handles hundreds of combinations without perceptible latency.\n\n**Instrument Pages**\nEach instrument has a dedicated landing page with FAQs, lesson format descriptions, and sample lesson videos — optimised for both SEO and conversion.\n\n**Mobile Experience**\nOver 70% of traffic comes from mobile. The entire site is designed mobile-first, with tap-friendly filters and a streamlined booking flow that takes under 60 seconds to complete.`,
    category: "Web Design",
    date: "Jun 2025",
    readTime: "6 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Ftsubaki-musicschool.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "PHP", "SEO"],
  },
  {
    id: "b16",
    title: "Dress Atelier: A Bridal Boutique Website with a Luxurious Feel",
    excerpt: "Designing and building the Dress Atelier website — a Sapporo wedding dress shop requiring an imported European dress gallery, rental plans, and an editorial aesthetic.",
    content: `Dress Atelier specialises in imported European wedding dresses. The website needed to communicate exclusivity and warmth simultaneously.\n\n**Gallery Architecture**\nThe dress gallery uses a masonry grid with hover overlays showing dress name and collection. Filtering by silhouette, neckline, and colour lets brides narrow choices intuitively.\n\n**Plan Pages**\nThree clear service tiers — Rental, Ceremony, Photo — each have dedicated landing pages with pricing, inclusions, and gallery. CTAs lead to a single unified inquiry form.\n\n**Trust Signals**\nBlog posts documenting real shoot locations (snow, overseas, studio) act as social proof and fuel organic search traffic for location-specific queries.`,
    category: "Web Design",
    date: "May 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fdress-atelier.jp%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "CSS", "Bridal"],
  },
  {
    id: "b17",
    title: "Flower Web Shop: Building a Fashion EC Site on Shopify",
    excerpt: "How I built the official Flower brand online store — seasonal collections, layered-style lookbooks, and a Shopify storefront optimised for conversion and brand consistency.",
    content: `Flower is a women's fashion brand with a strong seasonal identity. The web shop needed to match that identity while driving sales.\n\n**Shopify Theme Architecture**\nI built a custom Liquid theme from scratch rather than adapting an existing one. This gave full control over component structure, load order, and brand-specific interactions.\n\n**Lookbook Integration**\nSeasonal lookbook pages are built as editorial spreads. Each look links directly to the product page for every item worn — a key conversion driver.\n\n**Cart and Checkout UX**\nA slide-out cart with real-time stock indicators and a streamlined checkout reduced drop-off. Upsell suggestions in the cart are based on the current season's curated pairings.`,
    category: "Web Design",
    date: "Apr 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fflower-webshop.jp%2F&screenshot=true&meta=false&embed=screenshot.url&scroll=footer",
    tags: ["Web Design", "Shopify", "Liquid", "E-Commerce"],
  },
  {
    id: "b18",
    title: "Ririmew: Launching a Japanese Cosmetics Brand Online",
    excerpt: "Building the Ririmew official site — a Japanese cosmetics brand requiring product launches, makeup coordination lookbooks, and a Shopify storefront with strong visual identity.",
    content: `Ririmew targets young Japanese women seeking expressive, affordable cosmetics. The site had to feel current and trend-led while being easy to shop.\n\n**Product Launch Pages**\nNew releases get dedicated launch pages with full-width hero imagery, colour variant previews, and a how-to-use section. These pages are built reusably so the marketing team can spin up a new one in minutes.\n\n**Coordination Content**\nA makeup coordination section shows complete looks using multiple Ririmew products. Each look lists every product used with direct add-to-cart links — measurably increasing basket size.\n\n**Performance on Shopify**\nBy deferring non-critical scripts and using Shopify's native image optimisation pipeline, the storefront achieves a 90+ Lighthouse performance score despite heavy imagery.`,
    category: "Web Design",
    date: "Mar 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io/?url=https://www.ririmew.com/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "Shopify", "Liquid", "Cosmetics"],
  },
  {
    id: "b19",
    title: "Gelato Pique: Minimal Lifestyle Branding on the Web",
    excerpt: "How I designed the Gelato Pique website — a premium loungewear brand requiring minimal aesthetics, seasonal lookbooks, and a seamless integrated shopping experience.",
    content: `Gelato Pique is known for soft, pastel loungewear. The website had to feel as gentle and considered as the products.\n\n**Minimal Design System**\nA tight design system — two typefaces, a muted pastel palette, 8px grid — ensures every page feels cohesive. No component deviates from the system without reason.\n\n**Seasonal Campaign Pages**\nCampaign pages are rebuilt each season. I created a template system in Liquid so the in-house team can update seasonal content without touching code.\n\n**International Considerations**\nThe site serves both domestic and international customers. Locale detection switches language and currency automatically, and the checkout adapts to the selected region.`,
    category: "Web Design",
    date: "Feb 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fgelatopique.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "Shopify", "Liquid", "Fashion"],
  },
  {
    id: "b20",
    title: "Studio Tremo: Building an Editorial Creative Studio Portfolio",
    excerpt: "Designing Studio Tremo's portfolio site — a creative studio requiring a minimal, editorial look with GSAP animations, photography showcases, and a services presentation.",
    content: `Studio Tremo handles photography, branding, and video production. The website is both their portfolio and their primary business development tool.\n\n**Editorial Layout**\nTaking inspiration from print editorial design, each project page is a unique layout. No two case studies look alike — this itself communicates the studio's creative range.\n\n**GSAP Animation**\nSubtle scroll-triggered animations — image reveals, text staggering, cursor follower — add polish without distracting from the work. All animations are disabled via prefers-reduced-motion.\n\n**Performance**\nLazy video loading and adaptive image sizing keep the site fast even on mobile, despite hosting extensive photography and video content.`,
    category: "Web Design",
    date: "Jan 2025",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fstudio-tremo.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "GSAP", "JavaScript", "CSS"],
  },
  {
    id: "b21",
    title: "HK Wedding: Romantic Bridal Studio Website Design",
    excerpt: "Building the HK Wedding studio site — soft romantic design, ceremony and photo plan showcases, gallery, and a streamlined consultation booking flow.",
    content: `HK Wedding offers wedding photography and planning services. The brief was simple: romantic, trustworthy, and easy to book.\n\n**Visual Language**\nSoft ivory backgrounds, elegant serif headings, and full-bleed couple photography set the emotional tone immediately. Every colour and spacing decision reinforces the feeling of a special occasion.\n\n**Gallery Architecture**\nA filterable gallery lets prospective clients browse by venue type, season, and style. This reduces pre-inquiry friction and helps clients arrive at consultations with a clear visual brief.\n\n**Booking Flow**\nA two-step inquiry form — style preferences first, then contact details — reduced abandonment compared to the previous single long form.`,
    category: "Web Design",
    date: "Dec 2024",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io/?url=https://www.hk-wedding.jp/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "CSS", "Bridal"],
  },
  {
    id: "b22",
    title: "Ogiya Wedding: Venue Website for a Full-Service Wedding Hall",
    excerpt: "Designing the Ogiya Wedding website — a full-service wedding hall requiring ceremony plan showcases, banquet galleries, and an online reservation system.",
    content: `Ogiya Wedding is a traditional Japanese wedding hall offering end-to-end ceremony and reception services. The website serves both as a brochure and a lead generation tool.\n\n**Plan Showcase Pages**\nEach ceremony style (Japanese, Western, garden) has a dedicated page with venue photos, included services breakdown, and guest capacity information. Clear pricing CTAs are present on every page.\n\n**Gallery and Virtual Tour**\nA filterable photo gallery and embedded virtual room tours let couples explore the venue remotely. This proved especially valuable for out-of-town clients.\n\n**Reservation System**\nAn online consultation reservation widget connects to the venue's CRM. Available slots are shown in real-time and confirmation emails are sent automatically.`,
    category: "Web Design",
    date: "Nov 2024",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io/?url=https://ogiya-wedding.jp/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "PHP", "Bridal"],
  },
  {
    id: "b23",
    title: "Ecru's Pose: Bridal Photo Studio Website with Appointment Booking",
    excerpt: "Building the Ecru's Pose bridal photography studio site — a soft, sophisticated design with photo plan options, couple galleries, and an online appointment system.",
    content: `Ecru's Pose specialises in bridal and pre-wedding photography. The website needed to convert curious visitors into booked consultations.\n\n**Photo Plan Pages**\nFive distinct photo plans are presented with clear inclusions, pricing tiers, and sample albums. Comparison tables help couples choose the right package without needing to call.\n\n**Portfolio Gallery**\nA filterable portfolio organised by season, location, and style lets couples find examples that resonate with their vision. Each gallery item links to a full behind-the-scenes feature post.\n\n**Appointment System**\nA calendar-based booking widget shows available consultation slots. After booking, automated email sequences send reminders, preparation guides, and style questionnaires.`,
    category: "Web Design",
    date: "Oct 2024",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io/?url=https://www.ecruspose.jp/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "WordPress", "JavaScript", "Bridal"],
  },
  {
    id: "b24",
    title: "Kuraudia Holdings: Corporate Website for a Major Bridal Group",
    excerpt: "Designing the Kuraudia Holdings corporate site — clean, authoritative design presenting group brands, investor relations, news, and company philosophy.",
    content: `Kuraudia Holdings is a holding company overseeing multiple bridal industry brands. The website serves investors, media, and prospective partners.\n\n**Corporate Design Language**\nA clean, authoritative design system uses a muted palette, precise grid alignment, and conservative typography to communicate stability and scale.\n\n**Group Brand Architecture**\nEach subsidiary brand has a dedicated section linking to its own site, with a clear visual hierarchy that distinguishes the holding company from operating brands.\n\n**IR and News**\nInvestor relations pages present financial highlights, press releases, and governance information in a structured, scannable format. News is filtered by category (corporate, bridal, ESG).`,
    category: "Web Design",
    date: "Sep 2024",
    readTime: "5 min read",
    coverImage: "https://api.microlink.io?url=https%3A%2F%2Fwww.kuraudia.holdings%2F&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Web Design", "HTML", "CSS", "Corporate"],
  },
]

// ─── Stats Data ───────────────────────────────────────────────────────────────

export const statCards: StatItem[] = [
  {
    id: "s1",
    label: "Years of Experience",
    value: 8,
    suffix: "+",
    description: "Building production software across AI, full-stack, and cloud engineering",
    Icon: BsAwardFill,
  },
  {
    id: "s2",
    label: "Projects Shipped",
    value: 40,
    suffix: "+",
    description: "End-to-end products delivered across startups and enterprise clients",
    Icon: BsCodeSlash,
  },
  {
    id: "s3",
    label: "AI Models Deployed",
    value: 15,
    suffix: "+",
    description: "LLM, RAG, and ML systems running in production environments",
    Icon: BsCpu,
  },
  {
    id: "s4",
    label: "Cloud Cost Saved",
    value: 40,
    suffix: "%",
    description: "Average infrastructure cost reduction through optimization",
    Icon: BsCloudFill,
  },
  {
    id: "s5",
    label: "API Latency Reduced",
    value: 40,
    suffix: "%",
    description: "Inference and API latency improvement on optimized LLM services",
    Icon: BsGraphUp,
  },
  {
    id: "s6",
    label: "Engineers Led",
    value: 8,
    suffix: "+",
    description: "Cross-functional engineering team at IntelliAI Solutions",
    Icon: BsPeopleFill,
  },
]

export const techStats: TechStat[] = [
  { id: "t1", name: "Python / FastAPI",    percentage: 95, color: "#f59e0b" },
  { id: "t2", name: "React / Next.js",     percentage: 93, color: "#f59e0b" },
  { id: "t3", name: "LangChain / RAG",     percentage: 92, color: "#f59e0b" },
  { id: "t4", name: "TypeScript",          percentage: 90, color: "#f59e0b" },
  { id: "t5", name: "AWS / Kubernetes",    percentage: 85, color: "#f59e0b" },
  { id: "t6", name: "PostgreSQL / Redis",  percentage: 87, color: "#f59e0b" },
  { id: "t7", name: "Docker / CI-CD",      percentage: 88, color: "#f59e0b" },
  { id: "t8", name: "Go",                  percentage: 74, color: "#f59e0b" },
]

export const githubStats = [
  { label: "Public Repos",    value: "30+",  Icon: BsCodeSlash  },
  { label: "Total Commits",   value: "1.2k+", Icon: BsGraphUp   },
  { label: "Pull Requests",   value: "300+", Icon: BsAwardFill  },
  { label: "Contributions",   value: "800+", Icon: BsGlobe      },
]
