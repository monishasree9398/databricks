const fs = require('fs');
const path = require('path');

const dataDir = __dirname;

// 1. Students Fixture (18 students)
const students = [
  {
    id: "stu-001",
    name: "Monisha Sree",
    email: "monisha.sree@stanford.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    targetRole: "AI / ML Systems Engineer",
    secondaryTarget: "Full Stack Infrastructure Engineer",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 78,
    readinessTier: "Almost Ready",
    readinessReassurance: "Strong core in PyTorch and Distributed Data. Closing the Ray & Vector Indexing gap will boost readiness to 91%.",
    weeklyProgressDelta: 4.8,
    matchedCount: 5,
    almostReadyCount: 3,
    skillGapsCount: 2,
    academic: {
      university: "Stanford University",
      degree: "B.S. in Computer Science (Artificial Intelligence Track)",
      major: "Computer Science",
      graduationYear: 2026,
      cgpa: 3.92,
      scale: 4.0,
      creditsCompleted: 108,
      totalCredits: 120,
      attendanceRate: 98,
      departmentRank: 4,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-1", name: "PyTorch & Deep Learning", category: "AI & ML", level: 88, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-20", evidence: "Built custom transformer fine-tuner with flash-attention v2." },
      { id: "sk-2", name: "Distributed Systems & CUDA", category: "AI & ML", level: 74, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-15", evidence: "Completed lab on tensor parallelism with PyTorch DDP." },
      { id: "sk-3", name: "FastAPI & High-Throughput Services", category: "Core Tech", level: 92, proficiency: "Expert", status: "strong", verifiedProjectsCount: 5, lastAssessed: "2026-08-28", evidence: "Engineered async microservices serving 4,000 req/sec." },
      { id: "sk-4", name: "Vector Databases & RAG Indexing", category: "AI & ML", level: 68, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-10", evidence: "Implemented Milvus & Qdrant semantic retriever benchmark." },
      { id: "sk-5", name: "Kubernetes & GPU Orchestration", category: "Cloud & Systems", level: 58, proficiency: "Learning", status: "learning", verifiedProjectsCount: 1, lastAssessed: "2026-08-01", evidence: "Deployed Ray cluster on local K3s with vLLM." },
      { id: "sk-6", name: "TypeScript & Systems UI", category: "Core Tech", level: 84, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-22", evidence: "Built real-time telemetry console with React and WebSockets." }
    ],
    projects: [
      {
        id: "proj-101",
        title: "OmniTensor: Distributed LLM Speculative Engine",
        tagline: "Low-latency inference server utilizing draft model speculation and custom CUDA kernels.",
        role: "Lead Systems Architect",
        skills: ["PyTorch", "CUDA", "FastAPI", "C++", "Docker"],
        impactScore: 94,
        metrics: "2.8x speedup on Llama-3 70B inference with under 15ms TTFT.",
        githubUrl: "https://github.com/monishasree/omnitensor",
        liveUrl: "https://omnitensor.dev",
        date: "July 2026"
      },
      {
        id: "proj-102",
        title: "AuraKV: Sub-millisecond Vector Hybrid Search",
        tagline: "High-concurrency embedding storage with HNSW index pruning and sparse-dense reranking.",
        role: "Sole Creator",
        skills: ["Vector DB", "Go", "Rust", "gRPC"],
        impactScore: 89,
        metrics: "Indexed 10M vectors with 99.4% recall @ 10 under 8ms.",
        githubUrl: "https://github.com/monishasree/aurakv",
        date: "May 2026"
      }
    ],
    certifications: [
      {
        id: "cert-201",
        name: "NVIDIA Certified: Fundamentals of Accelerated Computing",
        issuer: "NVIDIA Deep Learning Institute",
        issueDate: "June 2026",
        credentialId: "NVD-894129-AC",
        skillsVerified: ["CUDA C/C++", "GPU Memory Hierarchy", "Parallel Optimization"],
        badgeColor: "#10B981"
      },
      {
        id: "cert-202",
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        issueDate: "March 2026",
        credentialId: "AWS-SAA-40918",
        skillsVerified: ["Cloud Systems", "VPC Architecture", "Auto Scaling"],
        badgeColor: "#F59E0B"
      }
    ],
    hackathons: [
      { name: "TreeHacks 2026", position: "1st Place – AI Track", date: "Feb 2026", project: "BioSynthetix Realtime Drug Lead Screener" },
      { name: "CalHacks 11.0", position: "Finalist – Best Systems Hack", date: "Oct 2025", project: "EdgeWhisper Quantized Audio Streamer" }
    ],
    timeline: [
      { date: "Aug 2026", title: "Target Role Readiness Jump: +6%", type: "milestone", scoreDelta: "+6%" },
      { date: "Jul 2026", title: "Published OmniTensor Research Benchmark", type: "project" },
      { date: "Jun 2026", title: "Achieved NVIDIA Accelerated Computing Cert", type: "cert" },
      { date: "May 2026", title: "Mid-Term Systems Evaluation: 98/100", type: "assessment" }
    ],
    bio: "Computer Science senior specializing in efficient deep learning systems, low-latency inference pipelines, and distributed GPU infrastructure.",
    lastSyncedAt: "2026-09-02T10:45:00Z"
  },
  {
    id: "stu-002",
    name: "Alex Rivera",
    email: "alex.rivera@berkeley.edu",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    targetRole: "Full Stack Product Engineer",
    secondaryTarget: "Frontend Architect",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 86,
    readinessTier: "Ready",
    readinessReassurance: "Exceptional frontend architecture and state design. Ready for immediate senior intern interview loops.",
    weeklyProgressDelta: 3.2,
    matchedCount: 6,
    almostReadyCount: 2,
    skillGapsCount: 1,
    academic: {
      university: "UC Berkeley",
      degree: "B.S. in Electrical Engineering & Computer Sciences",
      major: "EECS",
      graduationYear: 2026,
      cgpa: 3.88,
      scale: 4.0,
      creditsCompleted: 112,
      totalCredits: 120,
      attendanceRate: 96,
      departmentRank: 8,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-11", name: "React, Next.js & Server Components", category: "Core Tech", level: 95, proficiency: "Expert", status: "strong", verifiedProjectsCount: 6, lastAssessed: "2026-08-25", evidence: "Architected component systems used by 50k monthly active users." },
      { id: "sk-12", name: "TypeScript & Type-Level Metaprogramming", category: "Core Tech", level: 90, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 5, lastAssessed: "2026-08-20", evidence: "Authored type-safe schema validation library on NPM." },
      { id: "sk-13", name: "PostgreSQL & Prisma ORM", category: "Core Tech", level: 82, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-18", evidence: "Optimized complex query execution plans and indexing strategy." },
      { id: "sk-14", name: "State Machines (XState) & WebSockets", category: "Core Tech", level: 85, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-14", evidence: "Built collaborative multiplayer whiteboard with CRDT sync." },
      { id: "sk-15", name: "Docker & CI/CD Pipelines", category: "Cloud & Systems", level: 70, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-05", evidence: "Configured GitHub Actions workflow for zero-downtime previews." }
    ],
    projects: [
      {
        id: "proj-103",
        title: "Canopy: Linear-Grade Workspace Canvas",
        tagline: "Sub-16ms interactive infinite canvas with optimistic updates and local-first SQLite sync.",
        role: "Fullstack Architect",
        skills: ["React", "TypeScript", "Tailwind", "WebSockets", "SQLite"],
        impactScore: 96,
        metrics: "Over 12,000 GitHub stars and 140 community contributors.",
        githubUrl: "https://github.com/alexrivera/canopy",
        liveUrl: "https://canopy.app",
        date: "August 2026"
      }
    ],
    certifications: [
      {
        id: "cert-203",
        name: "Meta Certified Front-End Developer",
        issuer: "Meta",
        issueDate: "Jan 2026",
        credentialId: "META-FED-9912",
        skillsVerified: ["React", "UI/UX Systems", "Testing"],
        badgeColor: "#06B6D4"
      }
    ],
    hackathons: [
      { name: "HackMIT 2025", position: "Grand Prize Winner", date: "Sept 2025", project: "CollabGrid Realtime Spreadsheets" }
    ],
    timeline: [
      { date: "Aug 2026", title: "Finished Canopy v2.0 Release", type: "project", scoreDelta: "+4%" },
      { date: "Jul 2026", title: "Reached 86% Readiness Tier (Ready)", type: "milestone" }
    ],
    bio: "Obsessive product engineer focused on craftsmanship, micro-interactions, optimistic state synchronization, and web performance.",
    lastSyncedAt: "2026-09-02T09:15:00Z"
  },
  {
    id: "stu-003",
    name: "Priya Sharma",
    email: "priya.sharma@mit.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    targetRole: "Cloud Infrastructure & Platform Engineer",
    secondaryTarget: "DevOps & Reliability Engineer",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 82,
    readinessTier: "Ready",
    readinessReassurance: "Solid Kubernetes operator knowledge and Terraform IAC proficiency. Ready for top cloud infrastructure teams.",
    weeklyProgressDelta: 5.1,
    matchedCount: 5,
    almostReadyCount: 3,
    skillGapsCount: 1,
    academic: {
      university: "MIT",
      degree: "B.S. in Computer Science and Engineering",
      major: "Computer Systems",
      graduationYear: 2026,
      cgpa: 3.95,
      scale: 4.0,
      creditsCompleted: 110,
      totalCredits: 120,
      attendanceRate: 99,
      departmentRank: 2,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-21", name: "Kubernetes & CRD Operators", category: "Cloud & Systems", level: 90, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-26", evidence: "Developed custom controller in Go for auto-scaling spot GPU nodes." },
      { id: "sk-22", name: "Terraform & Pulumi (IaC)", category: "Cloud & Systems", level: 86, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-20", evidence: "Provisioned multi-region AWS topology with automated rollback." },
      { id: "sk-23", name: "Go & High Performance Networking", category: "Core Tech", level: 88, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-18", evidence: "Built custom eBPF packet analyzer for microsegmentation." },
      { id: "sk-24", name: "Prometheus, Grafana & OpenTelemetry", category: "Tools & Infra", level: 80, proficiency: "Intermediate", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-12", evidence: "Standardized distributed tracing across 14 internal services." },
      { id: "sk-25", name: "Rust Systems Programming", category: "Core Tech", level: 64, proficiency: "Learning", status: "improve", verifiedProjectsCount: 1, lastAssessed: "2026-08-01", evidence: "Built safe thread-pool work stealing runtime." }
    ],
    projects: [
      {
        id: "proj-104",
        title: "KubeDrainer: Autonomous Spot Node Evacuator",
        tagline: "Predictive spot termination handler leveraging AWS event bridge with zero pod disruption.",
        role: "Sole Author",
        skills: ["Go", "Kubernetes", "AWS", "Prometheus"],
        impactScore: 92,
        metrics: "Reduced cluster egress costs by 42% across 300 production nodes.",
        githubUrl: "https://github.com/priyasharma/kubedrainer",
        date: "July 2026"
      }
    ],
    certifications: [
      {
        id: "cert-204",
        name: "Certified Kubernetes Administrator (CKA)",
        issuer: "Cloud Native Computing Foundation",
        issueDate: "April 2026",
        credentialId: "CKA-7782190",
        skillsVerified: ["Kubernetes", "Cluster Security", "Networking", "Storage"],
        badgeColor: "#10B981"
      }
    ],
    hackathons: [
      { name: "KubeCon Student Hackathon", position: "Winner – Cloud Native Innovation", date: "Nov 2025", project: "eBPF Edge Firewall" }
    ],
    timeline: [
      { date: "Aug 2026", title: "CKA Certification Verified", type: "cert" },
      { date: "Jul 2026", title: "Completed KubeDrainer Open Source Pilot", type: "project" }
    ],
    bio: "Systems and cloud native engineer obsessed with resilient distributed architectures, eBPF telemetry, and immutable infrastructure.",
    lastSyncedAt: "2026-09-02T08:30:00Z"
  },
  {
    id: "stu-004",
    name: "David Chen",
    email: "david.chen@cmu.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    targetRole: "Distributed Systems & Database Engineer",
    secondaryTarget: "Backend Systems Engineer",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 73,
    readinessTier: "Almost Ready",
    readinessReassurance: "Strong data structures and C++ fundamentals. Closing Raft consensus edge cases will unlock Tier 1 infra matches.",
    weeklyProgressDelta: 4.1,
    matchedCount: 4,
    almostReadyCount: 4,
    skillGapsCount: 2,
    academic: {
      university: "Carnegie Mellon University",
      degree: "B.S. in Computer Science",
      major: "Systems & Algorithms",
      graduationYear: 2026,
      cgpa: 3.82,
      scale: 4.0,
      creditsCompleted: 104,
      totalCredits: 120,
      attendanceRate: 94,
      departmentRank: 12,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-31", name: "C++20 & Memory Management", category: "Core Tech", level: 86, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-24", evidence: "Built lock-free B+ Tree storage engine with SIMD vectorization." },
      { id: "sk-32", name: "Raft & Paxos Consensus", category: "Architecture", level: 66, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-16", evidence: "Implemented Raft leader election and log replication in C++." },
      { id: "sk-33", name: "LSM-Trees & RocksDB Internals", category: "Architecture", level: 75, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-11", evidence: "Wrote custom compaction filter reducing write amplification by 30%." },
      { id: "sk-34", name: "Linux Kernel & Async I/O (io_uring)", category: "Cloud & Systems", level: 72, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-04", evidence: "Benchmarked zero-copy socket transfers using io_uring." },
      { id: "sk-35", name: "Distributed Tracing & Benchmarking", category: "Tools & Infra", level: 80, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-20", evidence: "Automated Jepsen fault injection testing suite." }
    ],
    projects: [
      {
        id: "proj-105",
        title: "VeloxDB: Embedded Storage Engine with MVCC",
        tagline: "Lock-free write-ahead log and snapshot isolation storage engine with crash consistency guarantees.",
        role: "Core Contributor",
        skills: ["C++20", "io_uring", "CMake", "GTest"],
        impactScore: 91,
        metrics: "1.4M random writes/sec on NVMe SSD testbed.",
        githubUrl: "https://github.com/davidchen/veloxdb",
        date: "June 2026"
      }
    ],
    certifications: [],
    hackathons: [
      { name: "CMU TartanHacks", position: "2nd Place – Infrastructure", date: "Feb 2026", project: "FastWAL Zero Copy Logger" }
    ],
    timeline: [
      { date: "Aug 2026", title: "Implemented Jepsen Test Harness", type: "assessment" },
      { date: "Jul 2026", title: "VeloxDB Benchmarks Published", type: "project" }
    ],
    bio: "CMU systems student passionate about storage engines, consensus protocols, and lock-free data structures.",
    lastSyncedAt: "2026-09-02T07:15:00Z"
  },
  {
    id: "stu-005",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@stanford.edu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    targetRole: "Cybersecurity & Security Engineer",
    secondaryTarget: "Application Security Analyst",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 68,
    readinessTier: "Needs Work",
    readinessReassurance: "Outstanding binary exploitation and crypto fundamentals. Hands-on cloud security posture management needed.",
    weeklyProgressDelta: 6.5,
    matchedCount: 3,
    almostReadyCount: 4,
    skillGapsCount: 3,
    academic: {
      university: "Stanford University",
      degree: "B.S. in Computer Science",
      major: "Information Security",
      graduationYear: 2026,
      cgpa: 3.75,
      scale: 4.0,
      creditsCompleted: 98,
      totalCredits: 120,
      attendanceRate: 92,
      departmentRank: 24,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-41", name: "Vulnerability Research & Reverse Engineering", category: "Core Tech", level: 82, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-22", evidence: "Found 2 CVEs in open source C networking libraries via AFL++ fuzzing." },
      { id: "sk-42", name: "Cloud Security & IAM Hardening", category: "Cloud & Systems", level: 52, proficiency: "Learning", status: "missing", verifiedProjectsCount: 1, lastAssessed: "2026-07-28", evidence: "Audited basic AWS IAM roles using Prowler." },
      { id: "sk-43", name: "Applied Cryptography & Zero-Knowledge", category: "Core Tech", level: 74, proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-14", evidence: "Implemented Groth16 zk-SNARK verification circuits in Circom." },
      { id: "sk-44", name: "AppSec & OWASP Top 10 Remediation", category: "Core Tech", level: 80, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-19", evidence: "Conducted automated SAST/DAST audits across campus microservices." }
    ],
    projects: [
      {
        id: "proj-106",
        title: "FuzzStream: Coverage-Guided Protocol Fuzzer",
        tagline: "Mutation-based fuzzer for custom binary RPC protocols with AFL++ integration.",
        role: "Creator",
        skills: ["C", "Python", "GDB", "Ghidra"],
        impactScore: 84,
        metrics: "Discovered zero-day heap out-of-bounds read in legacy broker.",
        githubUrl: "https://github.com/sarahjenkins/fuzzstream",
        date: "July 2026"
      }
    ],
    certifications: [
      {
        id: "cert-205",
        name: "Certified Information Systems Security Professional (Associate)",
        issuer: "ISC2",
        issueDate: "May 2026",
        credentialId: "ISC2-901844",
        skillsVerified: ["Security Architecture", "Network Security", "Cryptography"],
        badgeColor: "#F43F5E"
      }
    ],
    hackathons: [
      { name: "DEF CON CTF Qualifier", position: "Top 20 Team", date: "May 2026", project: "Stanford CTF Team" }
    ],
    timeline: [
      { date: "Aug 2026", title: "Started Cloud Security Gap Closure Track", type: "milestone" },
      { date: "May 2026", title: "DEF CON CTF Qualifier Placement", type: "milestone" }
    ],
    bio: "Security researcher focusing on memory safety, automated protocol fuzzing, and cloud IAM least-privilege automation.",
    lastSyncedAt: "2026-09-02T06:45:00Z"
  },
  {
    id: "stu-006",
    name: "Marcus Vance",
    email: "marcus.vance@gatech.edu",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    targetRole: "Data Platform & Analytics Engineer",
    secondaryTarget: "Machine Learning Engineer",
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: 84,
    readinessTier: "Ready",
    readinessReassurance: "Top-tier Spark, dbt, and Databricks pipeline builder with proven medallion architecture implementations.",
    weeklyProgressDelta: 3.9,
    matchedCount: 6,
    almostReadyCount: 2,
    skillGapsCount: 1,
    academic: {
      university: "Georgia Tech",
      degree: "B.S. in Computer Science",
      major: "Data & Information Internetworks",
      graduationYear: 2026,
      cgpa: 3.89,
      scale: 4.0,
      creditsCompleted: 114,
      totalCredits: 120,
      attendanceRate: 97,
      departmentRank: 6,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: "sk-51", name: "Apache Spark & PySpark Streaming", category: "Core Tech", level: 90, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 5, lastAssessed: "2026-08-27", evidence: "Engineered real-time clickstream processing engine handling 80M events/day." },
      { id: "sk-52", name: "dbt & Data Modeling (Medallion)", category: "Core Tech", level: 92, proficiency: "Expert", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-25", evidence: "Implemented bronze-silver-gold lakehouse transformations with automated testing." },
      { id: "sk-53", name: "Databricks Delta Lake & SQL", category: "Cloud & Systems", level: 86, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 4, lastAssessed: "2026-08-20", evidence: "Built ACID table pipelines with Liquid Clustering optimization." },
      { id: "sk-54", name: "Apache Kafka & Event Brokers", category: "Cloud & Systems", level: 78, proficiency: "Intermediate", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-15", evidence: "Configured multi-broker Kafka cluster with Schema Registry." },
      { id: "sk-55", name: "Airflow & DAG Orchestration", category: "Tools & Infra", level: 82, proficiency: "Advanced", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-10", evidence: "Authored parameterized DAGs with dynamic task generation and alerts." }
    ],
    projects: [
      {
        id: "proj-107",
        title: "LakeStream: Streaming Lakehouse on Delta Lake",
        tagline: "End-to-end telemetry ingestion with automatic schema evolution and sub-second querying.",
        role: "Data Lead",
        skills: ["Spark", "Delta Lake", "dbt", "Airflow", "Python"],
        impactScore: 93,
        metrics: "Cut query latencies by 65% across 4TB analytical warehouse.",
        githubUrl: "https://github.com/marcusvance/lakestream",
        date: "July 2026"
      }
    ],
    certifications: [
      {
        id: "cert-206",
        name: "Databricks Certified Data Engineer Professional",
        issuer: "Databricks",
        issueDate: "June 2026",
        credentialId: "DBX-DEP-33921",
        skillsVerified: ["Delta Lake", "Spark Optimization", "Production Pipelines"],
        badgeColor: "#FF5500"
      }
    ],
    hackathons: [
      { name: "Georgia Tech HackGT", position: "1st Place – Best Data Hack", date: "Oct 2025", project: "TransitPulse Atlanta" }
    ],
    timeline: [
      { date: "Aug 2026", title: "Databricks Pro Certification Earned", type: "cert" },
      { date: "Jul 2026", title: "Deployed LakeStream Open Benchmark", type: "project" }
    ],
    bio: "Data engineer dedicated to scalable lakehouse architectures, streaming analytics, and automated data quality validation.",
    lastSyncedAt: "2026-09-02T09:00:00Z"
  }
];

// Add 12 more concise student records to reach 18 diverse students
const extraStudents = [
  { name: "Elena Rostova", role: "AI Research Scientist", score: 89, tier: "Ready", uni: "Harvard", major: "Applied Math & CS", gpa: 3.96 },
  { name: "Liam O'Connor", role: "Frontend Engineer", score: 71, tier: "Almost Ready", uni: "Columbia", major: "CS", gpa: 3.65 },
  { name: "Aisha Patel", role: "MLOps & Infra Engineer", score: 81, tier: "Ready", uni: "Stanford", major: "CS", gpa: 3.91 },
  { name: "Kenji Sato", role: "Robotics & Embedded Systems", score: 77, tier: "Almost Ready", uni: "CMU", major: "Robotics", gpa: 3.84 },
  { name: "Chloe Dupont", role: "Product Designer & UI Dev", score: 85, tier: "Ready", uni: "RISD / Brown", major: "Design & CS", gpa: 3.90 },
  { name: "Zaid Al-Mansoor", role: "Backend Systems Engineer", score: 62, tier: "Needs Work", uni: "UT Austin", major: "CS", gpa: 3.55 },
  { name: "Maya Lin", role: "Quantum Computing Researcher", score: 79, tier: "Almost Ready", uni: "MIT", major: "Physics & CS", gpa: 3.94 },
  { name: "Ethan Walker", role: "Full Stack Product Engineer", score: 74, tier: "Almost Ready", uni: "UC Berkeley", major: "EECS", gpa: 3.72 },
  { name: "Fatima Noor", role: "Bioinformatics ML Specialist", score: 83, tier: "Ready", uni: "Johns Hopkins", major: "Biomedical CS", gpa: 3.88 },
  { name: "Lucas Silva", role: "DevOps & SRE Engineer", score: 67, tier: "Needs Work", uni: "Georgia Tech", major: "CS", gpa: 3.60 },
  { name: "Hannah Kim", role: "Autonomous Driving Systems", score: 87, tier: "Ready", uni: "Stanford", major: "CS", gpa: 3.93 },
  { name: "Rohan Kapoor", role: "Financial Tech Systems Engineer", score: 76, tier: "Almost Ready", uni: "UPenn", major: "CS & Finance", gpa: 3.79 }
];

const avatars = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80"
];

extraStudents.forEach((st, idx) => {
  const idNum = idx + 7;
  const id = `stu-${idNum < 10 ? '00' + idNum : '0' + idNum}`;
  students.push({
    id,
    name: st.name,
    email: `${st.name.toLowerCase().replace(/[' ]/g, '.')}@${st.uni.toLowerCase().replace(/[^a-z]/g, '')}.edu`,
    avatar: avatars[idx % avatars.length],
    targetRole: st.role,
    cohort: "Cohort 2026",
    classId: "cs-401",
    readinessScore: st.score,
    readinessTier: st.tier,
    readinessReassurance: st.tier === "Ready" 
      ? "Consistent high project impact and verified skill mastery. Priority candidate for Tier 1 partner firms."
      : st.tier === "Almost Ready"
      ? "1-2 targeted skill closures away from entering top quartile readiness score."
      : "Foundational mastery in progress. Focused lab hours and mentoring recommended.",
    weeklyProgressDelta: +(Math.random() * 4 + 1.5).toFixed(1),
    matchedCount: st.score > 80 ? 5 : st.score > 70 ? 4 : 2,
    almostReadyCount: st.score > 80 ? 2 : 3,
    skillGapsCount: st.score > 80 ? 1 : st.score > 70 ? 2 : 4,
    academic: {
      university: st.uni,
      degree: `B.S. in ${st.major}`,
      major: st.major,
      graduationYear: 2026,
      cgpa: st.gpa,
      scale: 4.0,
      creditsCompleted: 100 + (idx % 15),
      totalCredits: 120,
      attendanceRate: 92 + (idx % 8),
      departmentRank: 5 + idx * 2,
      totalStudentsInCohort: 142
    },
    skills: [
      { id: `sk-${id}-1`, name: "Core Architecture & Algorithms", category: "Core Tech", level: Math.min(95, st.score + 5), proficiency: st.score > 80 ? "Advanced" : "Intermediate", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-20", evidence: "High performance on algorithmic design benchmarks." },
      { id: `sk-${id}-2`, name: "System Design & Distributed Patterns", category: "Architecture", level: Math.max(50, st.score - 6), proficiency: "Intermediate", status: st.score > 75 ? "strong" : "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-15", evidence: "Designed fault-tolerant microservice specs." },
      { id: `sk-${id}-3`, name: "Cloud Deployment & Linux", category: "Cloud & Systems", level: Math.max(45, st.score - 10), proficiency: "Intermediate", status: "improve", verifiedProjectsCount: 2, lastAssessed: "2026-08-10", evidence: "Containerized multi-tier applications." },
      { id: `sk-${id}-4`, name: "Automated Testing & CI/CD", category: "Tools & Infra", level: Math.min(90, st.score), proficiency: "Intermediate", status: "strong", verifiedProjectsCount: 3, lastAssessed: "2026-08-18", evidence: "Maintained 85%+ code coverage suites." }
    ],
    projects: [
      {
        id: `proj-${idNum}`,
        title: `${st.role.split(' ')[0]} Systems Framework`,
        tagline: "Scalable reference architecture with real-time telemetry and benchmarking.",
        role: "Lead Developer",
        skills: ["TypeScript", "Python", "Docker", "Postgres"],
        impactScore: st.score + 5,
        metrics: "Demonstrated 40% efficiency gains in controlled load test.",
        githubUrl: `https://github.com/${st.name.toLowerCase().replace(/[' ]/g, '')}/project`,
        date: "July 2026"
      }
    ],
    certifications: [],
    hackathons: [],
    timeline: [
      { date: "Aug 2026", title: "Digital Twin Recomputed: Score Updated", type: "milestone" }
    ],
    bio: `${st.major} student focused on ${st.role} methodologies, production excellence, and high throughput software design.`,
    lastSyncedAt: "2026-09-02T09:30:00Z"
  });
});

// 2. Internships Fixture (8 listings)
const internships = [
  {
    id: "int-101",
    company: "OpenAI",
    role: "AI Systems & Inference Intern",
    location: "San Francisco, CA (Hybrid)",
    type: "Summer 2026",
    stipend: "$62 / hr + Housing Stipend",
    description: "Work with the Core Inference and GPU Infrastructure team building high-throughput low-latency model serving layers for frontier models.",
    requiredSkills: [
      { name: "PyTorch & Deep Learning", minLevel: 80, weight: 0.35 },
      { name: "Distributed Systems & CUDA", minLevel: 75, weight: 0.35 },
      { name: "FastAPI & High-Throughput Services", minLevel: 75, weight: 0.30 }
    ],
    niceToHaveSkills: ["vLLM / TensorRT-LLM", "Kubernetes GPU Operators", "Rust"],
    tags: ["Generative AI", "Inference", "GPU Kernels", "Systems"]
  },
  {
    id: "int-102",
    company: "Stripe",
    role: "Backend Infrastructure Intern",
    location: "San Francisco, CA / Seattle, WA",
    type: "Summer 2026",
    stipend: "$58 / hr + Housing",
    description: "Design distributed ledger primitives, payment routing fault-tolerance, and high-concurrency payment APIs serving millions of merchants worldwide.",
    requiredSkills: [
      { name: "FastAPI & High-Throughput Services", minLevel: 80, weight: 0.35 },
      { name: "PostgreSQL & Prisma ORM", minLevel: 75, weight: 0.35 },
      { name: "Distributed Systems & CUDA", minLevel: 70, weight: 0.30 }
    ],
    niceToHaveSkills: ["Raft Consensus", "gRPC", "Kafka"],
    tags: ["Fintech", "Distributed Systems", "Payments", "High Availability"]
  },
  {
    id: "int-103",
    company: "Linear",
    role: "Product Engineering Intern",
    location: "Remote (Global)",
    type: "Summer 2026",
    stipend: "$55 / hr + Tech Stipend",
    description: "Craft pixel-perfect, keyboard-first, sub-16ms desktop web interactions with local-first synchronisation and modern React architectures.",
    requiredSkills: [
      { name: "React, Next.js & Server Components", minLevel: 85, weight: 0.40 },
      { name: "TypeScript & Type-Level Metaprogramming", minLevel: 80, weight: 0.35 },
      { name: "TypeScript & Systems UI", minLevel: 75, weight: 0.25 }
    ],
    niceToHaveSkills: ["SQLite / CRDTs", "WebSockets", "Framer Motion", "Tailwind CSS"],
    tags: ["Product Design", "Craft", "Local First", "React"]
  },
  {
    id: "int-104",
    company: "Databricks",
    role: "Data Systems & Engine Intern",
    location: "Mountain View, CA",
    type: "Summer 2026",
    stipend: "$60 / hr + Relocation",
    description: "Help build the next generation Photon vectorised query engine, Delta Lake storage layer, and unified Lakehouse metadata catalog.",
    requiredSkills: [
      { name: "Databricks Delta Lake & SQL", minLevel: 75, weight: 0.35 },
      { name: "Apache Spark & PySpark Streaming", minLevel: 80, weight: 0.35 },
      { name: "Distributed Systems & CUDA", minLevel: 70, weight: 0.30 }
    ],
    niceToHaveSkills: ["C++20", "SIMD", "Rust", "Catalog Integrations"],
    tags: ["Lakehouse", "Query Engine", "Spark", "Data Infra"]
  },
  {
    id: "int-105",
    company: "Palantir",
    role: "Forward Deployed Software Engineer Intern",
    location: "New York, NY / Palo Alto, CA",
    type: "Summer 2026",
    stipend: "$57 / hr + Housing",
    description: "Deploy mission-critical data integration pipelines, operational ontologies, and real-time decision intelligence platforms at world-scale enterprises.",
    requiredSkills: [
      { name: "FastAPI & High-Throughput Services", minLevel: 75, weight: 0.35 },
      { name: "TypeScript & Systems UI", minLevel: 75, weight: 0.35 },
      { name: "Kubernetes & GPU Orchestration", minLevel: 65, weight: 0.30 }
    ],
    niceToHaveSkills: ["Ontology Design", "Data Modeling", "High Security Environments"],
    tags: ["Enterprise AI", "Ontology", "Mission Critical", "Full Stack"]
  },
  {
    id: "int-106",
    company: "Vercel",
    role: "Edge Infrastructure & Frameworks Intern",
    location: "San Francisco, CA / Remote",
    type: "Summer 2026",
    stipend: "$56 / hr + Home Office",
    description: "Accelerate frontend delivery pipelines, optimize Turbopack bundling, and expand edge middleware compute runtimes for Next.js developers.",
    requiredSkills: [
      { name: "React, Next.js & Server Components", minLevel: 85, weight: 0.40 },
      { name: "TypeScript & Type-Level Metaprogramming", minLevel: 85, weight: 0.35 },
      { name: "Docker & CI/CD Pipelines", minLevel: 70, weight: 0.25 }
    ],
    niceToHaveSkills: ["Rust / Turbopack", "Wasm", "Edge Compute"],
    tags: ["Frontend Infra", "Next.js", "Edge Compute", "Developer Tools"]
  },
  {
    id: "int-107",
    company: "Anthropic",
    role: "AI Safety & Platform Intern",
    location: "San Francisco, CA",
    type: "Summer 2026",
    stipend: "$65 / hr + Housing",
    description: "Develop automated alignment evaluation harnesses, constitutional AI probes, and distributed evaluation datasets for Claude frontier models.",
    requiredSkills: [
      { name: "PyTorch & Deep Learning", minLevel: 85, weight: 0.40 },
      { name: "FastAPI & High-Throughput Services", minLevel: 80, weight: 0.30 },
      { name: "Vector Databases & RAG Indexing", minLevel: 70, weight: 0.30 }
    ],
    niceToHaveSkills: ["Evals Design", "Interpretability", "JAX"],
    tags: ["AI Safety", "Claude", "Alignment", "Evaluation Infrastructure"]
  },
  {
    id: "int-108",
    company: "Cloudflare",
    role: "Systems & Security Engineering Intern",
    location: "Austin, TX / San Francisco, CA",
    type: "Summer 2026",
    stipend: "$54 / hr + Housing",
    description: "Protect internet infrastructure from multi-terabit DDoS attacks and construct ultrafast Workers KV key-value distributed stores.",
    requiredSkills: [
      { name: "Go & High Performance Networking", minLevel: 80, weight: 0.40 },
      { name: "Vulnerability Research & Reverse Engineering", minLevel: 75, weight: 0.30 },
      { name: "Kubernetes & CRD Operators", minLevel: 70, weight: 0.30 }
    ],
    niceToHaveSkills: ["eBPF / XDP", "BGP Routing", "Rust"],
    tags: ["Edge Security", "Networking", "Distributed KV", "DDoS Mitigation"]
  }
];

// 3. Roadmaps Fixture (4-week structured roadmaps)
const roadmaps = {
  "stu-001": {
    studentId: "stu-001",
    targetRole: "AI / ML Systems Engineer (OpenAI / Anthropic Track)",
    totalWeeks: 4,
    currentWeek: 2,
    overallProgress: 45,
    generatedDate: "2026-08-25T14:00:00Z",
    weeks: [
      {
        weekNumber: 1,
        theme: "Inference Server Foundations & High-Concurrency Benchmarks",
        tagline: "Build production FastAPI / vLLM gateway with asynchronous streaming SSE tokens.",
        state: "completed",
        progressPercentage: 100,
        estimatedHoursTotal: 14,
        keyMilestone: "Shipped vLLM streaming server achieving 450 tokens/sec under load.",
        tasks: [
          {
            id: "t-101",
            title: "Async FastAPI Streaming Gateway with SSE & Backpressure",
            description: "Implement async request queueing and client connection drop handling for continuous generation.",
            estimatedHours: 4,
            skillsAddressed: ["FastAPI & High-Throughput Services"],
            deliverable: "GitHub PR + Locust load test report with p99 latency < 25ms.",
            completed: true,
            status: "completed",
            type: "project_build"
          },
          {
            id: "t-102",
            title: "Tokenization & Dynamic Batching Harness",
            description: "Implement PagedAttention simulation harness and analyze KV-cache memory allocation patterns.",
            estimatedHours: 6,
            skillsAddressed: ["PyTorch & Deep Learning", "Distributed Systems & CUDA"],
            deliverable: "Jupyter diagnostic notebook demonstrating zero OOM crashes under 256 parallel streams.",
            completed: true,
            status: "completed",
            type: "deep_dive"
          },
          {
            id: "t-103",
            title: "OpenAI API Compatibility Layer Audit",
            description: "Verify drop-in compatibility for /v1/chat/completions with tool calling schemas.",
            estimatedHours: 4,
            skillsAddressed: ["FastAPI & High-Throughput Services"],
            deliverable: "100% passing PyTest integration suite against standard SDK.",
            completed: true,
            status: "completed",
            type: "assessment"
          }
        ],
        resources: [
          { title: "vLLM PagedAttention Architecture Whitepaper", provider: "UC Berkeley SkyLab", url: "https://arxiv.org/abs/2309.06180", type: "Research Paper" },
          { title: "FastAPI High-Concurrency Internal Tuning Guide", provider: "Tiangolo Docs", url: "https://fastapi.tiangolo.com/async/", type: "Documentation" }
        ]
      },
      {
        weekNumber: 2,
        theme: "Distributed GPU Memory Management & Tensor Parallelism",
        tagline: "Bridge the CUDA memory gap with custom PyTorch DDP + Ray cluster orchestration.",
        state: "current",
        progressPercentage: 50,
        estimatedHoursTotal: 16,
        keyMilestone: "Zero-copy tensor slicing across multi-GPU simulation with NCCL AllReduce.",
        tasks: [
          {
            id: "t-201",
            title: "Implement Megatron-Style Tensor Parallelism in PyTorch",
            description: "Split linear projection weights column-wise and row-wise across 2 simulated worker processes.",
            estimatedHours: 6,
            skillsAddressed: ["Distributed Systems & CUDA", "PyTorch & Deep Learning"],
            deliverable: "Working Colab reproducing forward and backward tensor parallel passes.",
            completed: true,
            status: "completed",
            type: "project_build"
          },
          {
            id: "t-202",
            title: "Benchmark NCCL AllReduce Ring Bandwidth vs Latency",
            description: "Measure inter-GPU communication overhead vs compute time for 70B parameter layer sharding.",
            estimatedHours: 5,
            skillsAddressed: ["Distributed Systems & CUDA"],
            deliverable: "Profiling flamegraph using PyTorch Kineto profiler.",
            completed: false,
            status: "in_progress",
            type: "deep_dive"
          },
          {
            id: "t-203",
            title: "Ray Cluster Job Submission & Fault Tolerance Drill",
            description: "Configure autoscaling Ray actor workers with healthcheck heartbeats.",
            estimatedHours: 5,
            skillsAddressed: ["Kubernetes & GPU Orchestration"],
            deliverable: "Infrastructure script verifying worker death recovery in under 3 seconds.",
            completed: false,
            status: "pending",
            type: "deployment"
          }
        ],
        resources: [
          { title: "Distributed Training and Tensor Parallelism Deep Dive", provider: "PyTorch Core Docs", url: "https://pytorch.org/tutorials/intermediate/tensor_parallel_tutorial.html", type: "Interactive Lab" },
          { title: "Ray Core GPU Scheduling Handbook", provider: "Anyscale Learning Hub", url: "https://docs.ray.io", type: "Documentation" }
        ]
      },
      {
        weekNumber: 3,
        theme: "Vector Retrieval & High-Speed Approximate Nearest Neighbor (ANN)",
        tagline: "Close the Vector DB & RAG indexing gap to achieve 90%+ readiness score.",
        state: "upcoming",
        progressPercentage: 0,
        estimatedHoursTotal: 14,
        keyMilestone: "Deploy HNSW index server with IVF-PQ quantization serving <5ms queries.",
        tasks: [
          {
            id: "t-301",
            title: "HNSW Graph Index Implementation & Scalar Quantization",
            description: "Implement hierarchical navigable small world graph search in C++ or Cython with int8 quantization.",
            estimatedHours: 6,
            skillsAddressed: ["Vector Databases & RAG Indexing"],
            deliverable: "Benchmarked ANN recall curve @ 10k query-per-second.",
            completed: false,
            status: "pending",
            type: "project_build"
          },
          {
            id: "t-302",
            title: "RAG Hybrid Retrieval with Reciprocal Rank Fusion",
            description: "Combine BM25 sparse lexical search with dense vector embeddings using RRF reranking.",
            estimatedHours: 5,
            skillsAddressed: ["Vector Databases & RAG Indexing", "FastAPI & High-Throughput Services"],
            deliverable: "Live endpoint with 94% Top-3 retrieval precision on MS-MARCO subset.",
            completed: false,
            status: "pending",
            type: "project_build"
          },
          {
            id: "t-303",
            title: "Vector DB Capacity & Egress Sizing Assessment",
            description: "Calculate memory footprints for 100M 1536-dim vectors across FP32, FP16, and INT8.",
            estimatedHours: 3,
            skillsAddressed: ["Vector Databases & RAG Indexing"],
            deliverable: "Architectural blueprint and cost model document.",
            completed: false,
            status: "pending",
            type: "assessment"
          }
        ],
        resources: [
          { title: "HNSW Algorithm & Theoretical Bounds", provider: "IEEE / Malkov & Yashunin", url: "https://arxiv.org/abs/1603.09320", type: "Research Paper" },
          { title: "Vector Index Tuning Blueprint", provider: "Qdrant & Pinecone Arch Docs", url: "https://qdrant.tech/documentation/", type: "Documentation" }
        ]
      },
      {
        weekNumber: 4,
        theme: "End-to-End System Evaluation & Mock Technical Interview Loop",
        tagline: "Synthesize full digital twin project artifacts into Tier 1 interview portfolio.",
        state: "upcoming",
        progressPercentage: 0,
        estimatedHoursTotal: 12,
        keyMilestone: "Complete live system design defense with 95%+ simulated hiring committee consensus.",
        tasks: [
          {
            id: "t-401",
            title: "Frontier Model Serving System Design Defense",
            description: "Present architecture defense for a multi-tenant LLM serving platform handling 100k RPM with SLA guarantees.",
            estimatedHours: 5,
            skillsAddressed: ["AI & ML Systems", "Distributed Systems & CUDA", "Architecture"],
            deliverable: "System architecture whitepaper + architecture diagram artifact.",
            completed: false,
            status: "pending",
            type: "deep_dive"
          },
          {
            id: "t-402",
            title: "Portfolio Codebase Refactoring & README Polishing",
            description: "Ensure OmniTensor repository has automated GitHub actions, Docker quickstart, and live interactive demo.",
            estimatedHours: 4,
            skillsAddressed: ["TypeScript & Systems UI", "Cloud & Systems"],
            deliverable: "Verified reproducible Docker image with one-click startup.",
            completed: false,
            status: "pending",
            type: "project_build"
          },
          {
            id: "t-403",
            title: "Live UNLOCK AI Readiness Re-Assessment",
            description: "Re-run full AI Digital Twin evaluation to verify readiness tier promotion to 91% Ready.",
            estimatedHours: 3,
            skillsAddressed: ["All Target Skills"],
            deliverable: "Verified 90%+ readiness badge on UNLOCK profile.",
            completed: false,
            status: "pending",
            type: "assessment"
          }
        ],
        resources: [
          { title: "Systems Interview Blueprint for Generative AI Infrastructure", provider: "UNLOCK AI Prep Suite", url: "https://unlock.saas/prep/systems-ai", type: "Interactive Lab" }
        ]
      }
    ]
  }
};

// 4. Faculty Data & Aggregates
const facultyDashboard = {
  classId: "cs-401",
  className: "CS 401: Advanced Systems & AI Engineering Capstone",
  department: "Department of Computer Science & EECS",
  semester: "Fall 2026",
  academicYear: "2025–2026",
  totalHeadcount: 142,
  averageReadinessScore: 76.4,
  averageWeeklyGrowth: 4.2,
  readinessDistribution: {
    ready: 48,
    readyPercentage: 33.8,
    almostReady: 69,
    almostReadyPercentage: 48.6,
    needsSupport: 25,
    needsSupportPercentage: 17.6
  },
  topHiringRoles: [
    { role: "AI / ML Systems Engineer", studentMatchRate: 84, demandIndex: "Very High (+38% YoY)" },
    { role: "Distributed Systems & Cloud Engineer", studentMatchRate: 78, demandIndex: "High (+24% YoY)" },
    { role: "Full Stack Product Engineer", studentMatchRate: 91, demandIndex: "High (+18% YoY)" },
    { role: "Data Platform & Lakehouse Engineer", studentMatchRate: 72, demandIndex: "Surging (+44% YoY)" }
  ],
  rankedClassSkillGaps: [
    {
      skillName: "Distributed Systems & Tensor Parallelism",
      category: "AI & ML",
      classProficiencyAvg: 58.2,
      studentsDeficientCount: 64,
      cohortDeficiencyPercentage: 45.1,
      industryDemandScore: 96,
      priority: "Urgent",
      suggestedIntervention: "Schedule a 2-part intensive lab on PyTorch DDP / NCCL inter-node communications."
    },
    {
      skillName: "Vector Databases & High-Throughput RAG",
      category: "AI & ML",
      classProficiencyAvg: 61.4,
      studentsDeficientCount: 52,
      cohortDeficiencyPercentage: 36.6,
      industryDemandScore: 92,
      priority: "Urgent",
      suggestedIntervention: "Assign practical Milvus/Qdrant HNSW quantization indexing project."
    },
    {
      skillName: "Kubernetes GPU Schedulers & Ray Operators",
      category: "Cloud & Systems",
      classProficiencyAvg: 54.0,
      studentsDeficientCount: 59,
      cohortDeficiencyPercentage: 41.5,
      industryDemandScore: 88,
      priority: "High",
      suggestedIntervention: "Deploy shared sandbox K8s cluster for GPU slicing and Keda autoscaling drills."
    },
    {
      skillName: "Raft Consensus & Distributed Storage Primitives",
      category: "Architecture",
      classProficiencyAvg: 63.8,
      studentsDeficientCount: 41,
      cohortDeficiencyPercentage: 28.9,
      industryDemandScore: 84,
      priority: "Moderate",
      suggestedIntervention: "Integrate Jepsen fault injection harness into week 4 homework."
    },
    {
      skillName: "Cloud Security & Least-Privilege IAM",
      category: "Cloud & Systems",
      classProficiencyAvg: 66.1,
      studentsDeficientCount: 35,
      cohortDeficiencyPercentage: 24.6,
      industryDemandScore: 81,
      priority: "Moderate",
      suggestedIntervention: "Offer optional 1-credit AWS IAM policy analysis module."
    }
  ],
  aiClassInsight: {
    headline: "Cohort shows 88% readiness in frontend & API design, but 45% of students face a bottleneck in GPU tensor parallelism.",
    analysis: "Analysis of 142 digital twins reveals an impending hiring-cycle vulnerability. While 84% of students target AI/ML Systems roles, only 38% have verified multi-GPU orchestration artifacts. Closing this specific cluster of skills will elevate 34 'Almost Ready' students into the 'Ready' tier within 3 weeks.",
    criticalBottleneck: "Lack of verified Multi-GPU DDP & Vector Indexing project deliverables.",
    actionableProposal: "Deploy UNLOCK AI's 3-Week Accelerated GPU Systems Workshop. 78% of students have prerequisite CUDA/PyTorch knowledge and need only the distributed coordination layer.",
    projectedCohortImpact: "+12.4% average readiness score gain, unlocking 14 additional top-tier internship placements."
  },
  departmentComparison: [
    { department: "Artificial Intelligence & Systems (CS-401)", avgReadiness: 76.4, topSpecialty: "Inference & ML Platforms" },
    { department: "Software Engineering & Web (CS-302)", avgReadiness: 81.2, topSpecialty: "Fullstack Architecture" },
    { department: "Data Science & Lakehouse (DS-450)", avgReadiness: 74.8, topSpecialty: "Delta Lake & PySpark" },
    { department: "Computer Security & Cryptography (SEC-500)", avgReadiness: 69.5, topSpecialty: "AppSec & Cryptography" }
  ]
};

// 5. Skill Gaps Fixture (detailed matrix)
const skillGapAnalyses = {
  "stu-001": {
    studentId: "stu-001",
    studentName: "Monisha Sree",
    targetRole: "AI / ML Systems Engineer",
    targetCompanyProfile: "Tier 1 AI Labs (OpenAI, Anthropic, Databricks, Stripe)",
    targetRoleReadiness: 78,
    skillsHaveCount: 3,
    skillsImproveCount: 2,
    skillsLearnCount: 1,
    biggestBlocker: {
      skill: "Distributed Systems & Multi-GPU Tensor Parallelism",
      reason: "OpenAI and Anthropic inference teams require verified hands-on Megatron-style column/row weight slicing and NCCL ring reduction profiling.",
      impactOnReadiness: "Resolving this single gap will immediately increase overall readiness score from 78% to 88% (+10%)."
    },
    recommendedNextStep: {
      title: "Complete Distributed GPU Parallelism Lab (Roadmap Week 2)",
      action: "Implement 2-way tensor parallel forward pass in PyTorch using simulated NCCL communicators.",
      estimatedTimeToImpact: "6 hours across 2 study sessions",
      roadmapWeekTarget: 2
    },
    gaps: [
      {
        skillName: "FastAPI & High-Throughput Services",
        category: "Core Tech",
        currentLevel: 92,
        targetLevel: 80,
        status: "have",
        gapDelta: 0,
        importance: "Critical",
        estimatedHoursToClose: 0,
        recommendedAction: "Maintain mastery through active OmniTensor benchmarking PRs.",
        suggestedResource: { title: "FastAPI Production Best Practices", type: "Documentation", duration: "1 hr" }
      },
      {
        skillName: "PyTorch & Deep Learning",
        category: "AI & ML",
        currentLevel: 88,
        targetLevel: 85,
        status: "have",
        gapDelta: 0,
        importance: "Critical",
        estimatedHoursToClose: 0,
        recommendedAction: "Showcase FlashAttention-2 custom kernel integration in portfolio.",
        suggestedResource: { title: "FlashAttention GPU Memory Hierarchy Lab", type: "Interactive Lab", duration: "2 hrs" }
      },
      {
        skillName: "TypeScript & Systems UI",
        category: "Core Tech",
        currentLevel: 84,
        targetLevel: 75,
        status: "have",
        gapDelta: 0,
        importance: "Medium",
        estimatedHoursToClose: 0,
        recommendedAction: "Ensure telemetry dashboard supports real-time WebSockets streaming.",
        suggestedResource: { title: "Telemetry UI Systems Guide", type: "Code Challenge", duration: "1.5 hrs" }
      },
      {
        skillName: "Distributed Systems & CUDA",
        category: "AI & ML",
        currentLevel: 74,
        targetLevel: 85,
        status: "improve",
        gapDelta: 11,
        importance: "Critical",
        estimatedHoursToClose: 8,
        recommendedAction: "Build multi-GPU tensor parallel forward/backward simulation with PyTorch DDP.",
        suggestedResource: { title: "Megatron-LM Sharding Blueprint", type: "Project Blueprint", duration: "6 hrs" }
      },
      {
        skillName: "Vector Databases & RAG Indexing",
        category: "AI & ML",
        currentLevel: 68,
        targetLevel: 80,
        status: "improve",
        gapDelta: 12,
        importance: "High",
        estimatedHoursToClose: 6,
        recommendedAction: "Implement HNSW graph index with product quantization and RRF hybrid reranking.",
        suggestedResource: { title: "Vector Search Optimization & Quantization", type: "Interactive Lab", duration: "4 hrs" }
      },
      {
        skillName: "Kubernetes & GPU Orchestration",
        category: "Cloud & Systems",
        currentLevel: 58,
        targetLevel: 75,
        status: "learn",
        gapDelta: 17,
        importance: "High",
        estimatedHoursToClose: 10,
        recommendedAction: "Deploy and manage Ray cluster on K8s with vLLM autoscaling deployment.",
        suggestedResource: { title: "Ray Operator on K8s Zero-to-Production", type: "Interactive Lab", duration: "5 hrs" }
      }
    ]
  }
};

// 6. AI Insights Fixture
const aiInsights = {
  cohortInsights: [
    {
      id: "ins-1",
      type: "opportunity",
      priority: "high",
      title: "34 Students Poised for Tier-1 Readiness Promotion",
      description: "A targeted 2-week focus on distributed inference concepts will lift 34 students from 'Almost Ready' (70-79%) to 'Ready' (80%+).",
      impact: "+24% overall placement velocity",
      date: "2026-09-01"
    },
    {
      id: "ins-2",
      type: "curriculum",
      priority: "high",
      title: "Curriculum-Market Delta: Vector Indexing & GPU Kernels",
      description: "Industry partner postings for Summer 2026 have increased mentions of 'vLLM', 'FlashAttention', and 'HNSW' by 210% over the last quarter.",
      impact: "Aligns CS 401 syllabus with live recruiter queries",
      date: "2026-08-29"
    },
    {
      id: "ins-3",
      type: "at_risk",
      priority: "medium",
      title: "6 Students Experiencing Momentum Stagnation",
      description: "6 students have not logged verified project commits or completed roadmap tasks in >14 days.",
      impact: "Proactive advisor nudging recommended",
      date: "2026-08-28"
    }
  ],
  actionPlanPreset: {
    title: "CS 401 Fall 2026: 3-Week GPU Systems & Vector Indexing Intensive",
    duration: "3 Weeks (12 contact hours + 18 lab hours)",
    targetStudentCount: 64,
    estimatedReadinessIncrease: "+12.4%",
    modules: [
      {
        week: 1,
        title: "Distributed Memory & PyTorch Tensor Parallelism",
        topics: ["Megatron Column/Row Sharding", "NCCL Ring AllReduce", "FlashAttention v2 Kernel Profiling"],
        labAssignment: "Build 2-GPU Llama-3 layer sharded forward pass."
      },
      {
        week: 2,
        title: "Vector Retrieval Architectures & Quantization",
        topics: ["HNSW Graph Indexes", "Product Quantization (PQ-128)", "Reciprocal Rank Fusion Reranking"],
        labAssignment: "Engineer hybrid search server benchmarking 1M embeddings under 10ms."
      },
      {
        week: 3,
        title: "Production Serving & Ray GPU Orchestration",
        topics: ["vLLM Continuous Batching", "Ray Cluster Autoscaling", "SLA Guardrails & Backpressure"],
        labAssignment: "Deploy production inference endpoint on cloud GPU sandbox."
      }
    ]
  }
};

// 7. Chat Presets Fixture
const chatPresets = {
  suggestedQuestions: [
    "What is the single biggest gap blocking my OpenAI internship readiness?",
    "How can I improve my Distributed Systems score from 74% to 85%?",
    "Compare my digital twin against the Stripe Backend Engineer requirements.",
    "Generate a 3-day accelerated study schedule for my upcoming week."
  ],
  responses: {
    openai: {
      text: "Based on your current digital twin, your overall readiness for OpenAI's AI Systems & Inference Intern role is 78% (Almost Ready). You exceed the bar in FastAPI (92%) and Deep Learning fundamentals (88%). Your primary blocker is Distributed CUDA Parallelism (74% vs 80% minimum).",
      highlightedSkills: ["PyTorch (88%)", "FastAPI (92%)", "Distributed Systems (74%)", "Vector DBs (68%)"],
      percentages: [
        { label: "Overall OpenAI Match", value: 78 },
        { label: "Target Readiness Threshold", value: 85 },
        { label: "Post-Roadmap Projection", value: 91 }
      ],
      recommendationCards: [
        {
          id: "rec-chat-1",
          title: "Execute Roadmap Week 2: Tensor Parallelism",
          description: "Complete the 2-way sharded forward pass lab in PyTorch to gain +6% readiness.",
          impactLabel: "+6% Readiness",
          effortLabel: "5 hours",
          actionText: "Open Week 2 Roadmap",
          actionType: "navigate_roadmap"
        },
        {
          id: "rec-chat-2",
          title: "Benchmark OmniTensor with NCCL",
          description: "Add a multi-GPU latency benchmark to your OmniTensor GitHub repository.",
          impactLabel: "Verified Proof",
          effortLabel: "2 hours",
          actionText: "View Skill Gap Details",
          actionType: "navigate_skillgap"
        }
      ]
    },
    stripe: {
      text: "Your digital twin matches 84% with Stripe's Backend Infrastructure Intern role. Your API design and high-concurrency microservice experience are strong differentiators. Closing your PostgreSQL query indexing and Raft consensus edge cases will position you in the top 5% of applicants.",
      highlightedSkills: ["FastAPI (92%)", "PostgreSQL (82%)", "Distributed Systems (74%)"],
      percentages: [
        { label: "Stripe Match Readiness", value: 84 },
        { label: "Database Optimization", value: 82 },
        { label: "Concurrency Mastery", value: 92 }
      ],
      recommendationCards: [
        {
          id: "rec-stripe-1",
          title: "Add Raft Consensus Primitives to AuraKV",
          description: "Implement simple 3-node leader election to demonstrate distributed transaction safety.",
          impactLabel: "+7% Infra Match",
          effortLabel: "6 hours",
          actionText: "Explore Skill Gap",
          actionType: "navigate_skillgap"
        }
      ]
    },
    generic: {
      text: "UNLOCK AI has analyzed your real-time digital twin. You have 3 verified strong skills, 2 areas for active improvement, and 1 emerging skill. Your weekly velocity is currently +4.8%, which places you ahead of 82% of your cohort.",
      highlightedSkills: ["FastAPI (92%)", "PyTorch (88%)", "Distributed Systems (74%)", "Vector DB (68%)"],
      percentages: [
        { label: "Cohort Percentile", value: 86 },
        { label: "Readiness Score", value: 78 },
        { label: "Weekly Growth Delta", value: 4.8 }
      ],
      recommendationCards: [
        {
          id: "rec-gen-1",
          title: "Continue Current Milestone",
          description: "You have 2 pending tasks in Week 2 of your guided career roadmap.",
          impactLabel: "Target 85% Score",
          effortLabel: "3.5 hrs remaining",
          actionText: "Go to Roadmap",
          actionType: "navigate_roadmap"
        }
      ]
    }
  }
};

// Write all datasets
fs.writeFileSync(path.join(dataDir, 'students.json'), JSON.stringify(students, null, 2));
fs.writeFileSync(path.join(dataDir, 'internships.json'), JSON.stringify(internships, null, 2));
fs.writeFileSync(path.join(dataDir, 'roadmaps.json'), JSON.stringify(roadmaps, null, 2));
fs.writeFileSync(path.join(dataDir, 'faculty.json'), JSON.stringify(facultyDashboard, null, 2));
fs.writeFileSync(path.join(dataDir, 'skillGaps.json'), JSON.stringify(skillGapAnalyses, null, 2));
fs.writeFileSync(path.join(dataDir, 'aiInsights.json'), JSON.stringify(aiInsights, null, 2));
fs.writeFileSync(path.join(dataDir, 'chatPresets.json'), JSON.stringify(chatPresets, null, 2));

console.log('✅ Generated all mock datasets successfully in', dataDir);
