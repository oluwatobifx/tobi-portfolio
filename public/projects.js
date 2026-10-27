// ============================================================
//  YOUR PROJECTS: this file lives in your GitHub repo.
//  Edit it, commit to GitHub, and Vercel redeploys the site.
//
//  category: 'design' → shows on the Design page (/design) and home page
//            'data'   → shows on the Data Analyst page (/data) and home page
//  image:    screenshot in public/ (e.g. '/project-my-site.webp')
//  live:     link to the live website / published dashboard, or null
//  repo:     link to the GitHub repository, or null
//  Clicking a card opens a preview with these details and links.
// ============================================================
export const projects = [
  {
    title: 'NexFlow AI',
    category: 'design',
    description: 'AI platform for SMEs, with multi-tenant SaaS, billing, and analytics.',
    image: '/project-nexflow.webp',
    live: 'https://nexflow-ai-theta.vercel.app',
    repo: 'https://github.com/oluwatobifx/NexFlow-AI',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
  },
  {
    title: 'Logistics Partner Network',
    category: 'design',
    description: 'Logistics marketplace for truck owners, warehousing and delivery companies.',
    image: '/project-logiflow.webp',
    live: 'https://logistics-partner-network.vercel.app',
    repo: 'https://github.com/oluwatobifx/Logistics-Partner-Network',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
  },
  {
    title: 'Business Portfolio Website',
    category: 'design',
    description: 'TechSolutions: a modern website that helps small businesses go digital, with online store and marketing services, a sales tracking dashboard and an import/export partner network.',
    image: '/project-techsolutions.webp',
    live: 'https://tech-solution-kappa.vercel.app',
    repo: 'https://github.com/oluwatobifx/Tech-Solution',
    tags: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
  },
  {
    title: 'Sales Performance Dashboard',
    category: 'data',
    description: 'Interactive dashboard showing sales trends, customer insights and product performance.',
    image: '/project-sales.webp',
    live: null,
    repo: null,
    tags: ['Excel', 'Power BI', 'DAX'],
  },
  {
    title: 'Customer Insights Dashboard',
    category: 'data',
    description: 'Analysis of customer behavior, segmentation and retention trends for business growth.',
    image: '/project-customers.webp',
    live: null,
    repo: null,
    tags: ['Excel', 'Power BI', 'DAX'],
  },
  {
    title: 'Logistics & Delivery Analysis',
    category: 'data',
    description: 'Visualized delivery performance, shipment volume and operational efficiency.',
    image: '/project-logistics.webp',
    live: null,
    repo: null,
    tags: ['Excel', 'Power BI', 'SQL'],
  },
  {
    title: 'Financial Data Analysis',
    category: 'data',
    description: 'Financial performance analysis with interactive charts and KPI tracking.',
    image: '/project-finance.webp',
    live: null,
    repo: null,
    tags: ['Excel', 'Power BI', 'DAX'],
  },
];

// Your GitHub profile, used when a project has no repo link yet.
export const GITHUB_PROFILE = 'https://github.com/oluwatobifx';
