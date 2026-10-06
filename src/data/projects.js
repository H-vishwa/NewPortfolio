export const projectsData = [
  {
    id: 1,
    slug: "interviewiq-ai",
    title: "InterviewIQ.ai",
    tagline: "AI-Powered Technical & Behavioral Interview Simulation Platform",
    category: "Full Stack & AI",
    role: "Full Stack Engineer & AI Prompt Architect",
    timeline: "2024",
    status: "Live in Production",
    description:
      "An AI-powered mock interview platform that conducts realistic technical and behavioral interviews, scores responses, and delivers detailed feedback.",
    overview:
      "InterviewIQ.ai was built to bridge the gap between academic preparation and real-world engineering interviews. It creates an adaptive, high-pressure yet safe mock interview environment where candidates face dynamically generated technical, system design, and behavioral questions tailored to their target role, receive instant AI evaluations, and get actionable suggestions for improvement.",
    problem:
      "Job seekers often experience high interview anxiety and lack access to rigorous, unbiased technical feedback. Traditional mock interviews with peers are hard to schedule, inconsistent in assessment quality, and rarely provide structured rubrics to measure improvement over time.",
    solution:
      "An automated, end-to-end interview simulation platform powered by advanced LLM prompt orchestration. It generates role-specific interview tracks, analyzes candidate answers in real time, grades communication clarity and technical depth, and generates an instant performance scorecard with actionable growth points.",
    keyFeatures: [
      {
        title: "Dynamic Question Engine",
        description:
          "Synthesizes role-specific interview tracks across Software Engineering, System Design, and Behavioral domains adapted to user experience level.",
      },
      {
        title: "Multi-Dimensional AI Rubric Scoring",
        description:
          "Evaluates candidate responses across technical correctness, communication clarity, problem-solving methodology, and edge-case handling.",
      },
      {
        title: "Detailed Actionable Scorecards",
        description:
          "Highlights key strengths, flags conceptual gaps or misconceptions, and provides model answers for every question tackled.",
      },
      {
        title: "Progress & Readiness Tracking",
        description:
          "Maintains interview history and visual performance trends so candidates can measure their interview readiness week over week.",
      },
    ],
    architecture: {
      frontend: "React, Tailwind CSS, responsive component hierarchy, clean dark/light UI",
      backend: "Node.js & Express RESTful API with structured session controllers",
      database: "MongoDB Atlas for user interview logs, question banks, and scores",
      aiIntegration: "Engineered prompt templates with structured JSON outputs for reliable scoring",
      deployment: "Render (Client & Server) with environment configuration management",
    },
    challenges: [
      {
        title: "Minimizing AI Evaluation Latency",
        description:
          "Real-time interview pacing requires prompt response times. Addressed this by chunking evaluation criteria, using streamlined system prompts, and optimizing API calls to return feedback within seconds.",
      },
      {
        title: "Ensuring Deterministic & Fair Scoring",
        description:
          "Unconstrained LLM responses risk subjective or inconsistent scoring. Designed strict JSON schema outputs and few-shot calibration to produce standardized, objective ratings.",
      },
      {
        title: "Intuitive Multi-Step Interview UX",
        description:
          "Balancing question reading, time limits, answer formulation, and review without overwhelming the user. Designed an uncluttered, distraction-free interface with clear progress indicators.",
      },
    ],
    results: [
      "Simulates end-to-end mock interviews with structured sub-2-second scorecards.",
      "Supports tailored question generation across frontend, backend, and full-stack disciplines.",
      "Delivered a zero-config web experience accessible to candidates worldwide.",
    ],
    imageUrl: "/projects/InterviewIQ.webp",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "AI Prompt Engineering",
    ],
    demoUrl: "https://interviewiq-client-sw9d.onrender.com/",
    githubUrl: "https://github.com/H-vishwa/InterviewIQ",
  },
  {
    id: 2,
    slug: "welth-ai",
    title: "Welth AI",
    tagline: "Intelligent Personal Finance & Automated Expense Management Platform",
    category: "FinTech & AI Automation",
    role: "Full Stack Engineer & Database Architect",
    timeline: "2024",
    status: "Live in Production",
    description:
      "An intelligent finance management platform featuring smart receipt scanning, budget planning, and automated spending insights.",
    overview:
      "Welth AI reimagines personal financial tracking by eliminating manual data entry. By combining AI document parsing and automated background workflows, Welth AI extracts itemized data from receipt images, auto-categorizes expenses, tracks budgets in real-time, and surfaces predictive spending insights to help users manage wealth smarter.",
    problem:
      "Manual expense logging is tedious, error-prone, and one of the primary reasons people abandon personal budgeting tools. Most existing apps either require manually typing in merchant and amount details or present rigid, static charts that fail to guide better spending behavior.",
    solution:
      "Built a modern full-stack finance web app using Next.js, Supabase, and Prisma. Users simply capture or upload a receipt, and the AI OCR extracts merchant name, total, date, and line items. Serverless background workers handle budget limit checks and generate personalized expense breakdowns.",
    keyFeatures: [
      {
        title: "AI Smart Receipt Scanning",
        description:
          "Instant OCR extraction that parses merchant name, dates, itemized costs, tax, and totals from uploaded receipt photos.",
      },
      {
        title: "Automated Background Workflows",
        description:
          "Inngest-driven event pipelines that asynchronously process uploaded receipts, recalculate category budgets, and send limit alerts.",
      },
      {
        title: "Multi-Account & Budget Management",
        description:
          "Unified financial overview supporting checking, savings, and expense categories with dynamic progress bars and threshold warnings.",
      },
      {
        title: "Predictive Analytics & Visual Insights",
        description:
          "Categorized spending breakdown visualizer identifying recurring subscriptions and high-burn categories month over month.",
      },
    ],
    architecture: {
      frontend: "Next.js App Router, React, Tailwind CSS with server & client component splitting",
      backend: "Next.js Server Actions & API routes with Prisma ORM",
      database: "Supabase PostgreSQL with relational schemas, indexes, and Row-Level Security (RLS)",
      backgroundEngine: "Inngest for event-driven serverless background queues and scheduled tasks",
      aiVision: "AI Document & Vision API for high-accuracy receipt extraction",
    },
    challenges: [
      {
        title: "Extracting Low-Quality / Crumpled Receipts",
        description:
          "Real-world receipts feature crumpled paper, faded thermal ink, and inconsistent layouts. Created a robust prompt validation pipeline with schema fallbacks to parse amounts and merchants accurately.",
      },
      {
        title: "Preventing Serverless Function Timeouts",
        description:
          "Heavy image processing and multi-table updates could cause API route timeouts. Decoupled receipt parsing into Inngest background event jobs, providing instant UI feedback while processing in the background.",
      },
      {
        title: "Data Consistency in Multi-Category Budgets",
        description:
          "Designed ACID-compliant Prisma transactions ensuring that expense additions, account balance deductions, and category limit updates always commit atomically.",
      },
    ],
    results: [
      "Eliminated over 85% of manual receipt data entry steps through automated OCR.",
      "Reliable background event queues with zero user-blocking on receipt uploads.",
      "Full type-safe data layer with Prisma ORM and Supabase PostgreSQL.",
    ],
    imageUrl: "/projects/WelthAi.webp",
    tags: [
      "Next.js",
      "React",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "Inngest",
      "AI OCR",
    ],
    demoUrl: "https://welth-ai-finance-platform-orpin.vercel.app/",
    githubUrl: "https://github.com/H-vishwa/welth-ai-finance-platform",
  },
  {
    id: 3,
    slug: "iprep-ai",
    title: "IPrep AI",
    tagline: "AI-Driven Real-Time Developer Interview Prep & Question Simulator",
    category: "EdTech & Career Prep",
    role: "Full Stack Engineer",
    timeline: "2024",
    status: "Live in Production",
    description:
      "An AI-driven interview preparation web tool designed to help developers simulate real-time technical questions and sharpen response delivery.",
    overview:
      "IPrep AI is an interview readiness platform designed for software engineers. While traditional platforms test whether code passes unit tests, IPrep AI focuses on technical communication—drilling developers on how they explain algorithms, trade-offs, and design decisions before an interview panel.",
    problem:
      "Candidates frequently know how to code a solution but stumble when asked to explain their thought process, justify time/space complexity, or handle open-ended architectural questions. Most practice tools provide no feedback on communication or reasoning clarity.",
    solution:
      "An interactive practice room that challenges developers with progressive technical questions, offers intelligent hint ladders without spoiling full solutions, and reviews both implementation efficiency and explanation clarity.",
    keyFeatures: [
      {
        title: "Adaptive Problem Simulations",
        description:
          "Curated problem sets across Data Structures, Algorithms, System Design, and Modern Web architectures with adjustable difficulty.",
      },
      {
        title: "Intelligent Progressive Hint Ladder",
        description:
          "Multi-tiered hints that nudge candidates toward the optimal approach step-by-step rather than immediately giving away the answer.",
      },
      {
        title: "Complexity & Edge-Case Review",
        description:
          "Automated scrutiny of candidate explanations focusing on Big-O time/space trade-offs and overlooked boundary cases.",
      },
      {
        title: "Personalized Prep Roadmaps",
        description:
          "Identifies recurring conceptual blind spots and recommends targeted drill topics to build interview confidence.",
      },
    ],
    architecture: {
      frontend: "React SPA with Tailwind CSS, clean dark aesthetic, and distraction-free workspace",
      backend: "Node.js & Express API managing interview sessions and prompt pipelines",
      database: "MongoDB for question categories, user history, and response telemetry",
      aiIntegration: "Custom LLM prompt pipelines tuned for conversational technical coaching",
    },
    challenges: [
      {
        title: "Guiding Without Spoiling Answers",
        description:
          "Engineered prompt behavior to act as an encouraging senior interviewer—supplying conceptual clues rather than spitting out completed code blocks.",
      },
      {
        title: "Snappy Conversational Pacing",
        description:
          "Optimized backend response pipelines and client-side UI states to make interaction feel fluid, engaging, and conversational.",
      },
    ],
    results: [
      "Provides realistic interactive verbal and conceptual interview coaching.",
      "Broad topic coverage spanning algorithms, data structures, and system fundamentals.",
      "Modern, fast-loading responsive interface designed for focused developer practice.",
    ],
    imageUrl: "/projects/IPrepAI.webp",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "AI Coaching"],
    demoUrl: "https://iprep-ai-1.onrender.com/",
    githubUrl: "https://github.com/H-vishwa/IPrep-AI",
  },
  {
    id: 4,
    slug: "car-rental",
    title: "Car Rental",
    tagline: "Full-Stack Vehicle Fleet Reservation & Management System",
    category: "Full Stack Web Application",
    role: "Full Stack Engineer",
    timeline: "2023",
    status: "Live in Production",
    description:
      "A full-featured vehicle rental web app with real-time fleet availability, booking management, and role-based administrative control.",
    overview:
      "A complete vehicle reservation platform built to deliver a seamless rental experience for customers while giving fleet managers a robust administrative dashboard to monitor vehicle status, handle reservations, and maintain fleet inventory in real time.",
    problem:
      "Many vehicle rental sites suffer from confusing multi-step booking workflows, inaccurate vehicle availability, and lack of administrative synchronization, leading to scheduling conflicts and lost customer bookings.",
    solution:
      "Engineered an intuitive, transparent booking experience with instant date-range filtering, precise vehicle specs, clear pricing calculation, and a protected administrative back-office with role-based access control.",
    keyFeatures: [
      {
        title: "Dynamic Fleet Catalog & Filtering",
        description:
          "Filter vehicles by transmission, fuel type, seating capacity, daily pricing, and brand with instant catalog updates.",
      },
      {
        title: "Conflict-Free Date Availability Engine",
        description:
          "Validates reservation intervals against current bookings to prevent overlapping dates and guarantee vehicle availability.",
      },
      {
        title: "Role-Based Admin Console",
        description:
          "Restricted dashboard allowing administrators to add, edit, or remove vehicles, review booking statuses, and manage user accounts.",
      },
      {
        title: "Transparent Cost Breakdown",
        description:
          "Clear pricing calculator computing daily rates, duration discounts, and estimated taxes before reservation submission.",
      },
    ],
    architecture: {
      frontend: "React with Tailwind CSS for mobile-first catalog browsing and booking forms",
      backend: "Node.js & Express.js REST API with MVC structure, JWT authentication, and input validation",
      database: "MongoDB with Mongoose schemas for vehicles, bookings, and user profiles",
      security: "JWT auth with HTTP-only tokens, bcrypt password hashing, and role-based middleware",
    },
    challenges: [
      {
        title: "Preventing Double-Booking Race Conditions",
        description:
          "Crafted MongoDB date overlap queries ($lte and $gte checks) to ensure conflicting reservations cannot be confirmed simultaneously.",
      },
      {
        title: "Secure Role-Based Route Authorization",
        description:
          "Implemented backend route guards and frontend protected routes ensuring only authenticated admins can manage fleet assets.",
      },
    ],
    results: [
      "Zero-conflict reservation engine with real-time fleet status.",
      "Clean, mobile-optimized booking flow with instant pricing feedback.",
      "Full administrative oversight with protected fleet management CRUD operations.",
    ],
    imageUrl: "/projects/CarRental.webp",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT Auth"],
    demoUrl: "https://car-rental-six-ivory.vercel.app/",
    githubUrl: "https://github.com/H-vishwa/Car-Rental",
  },
];
