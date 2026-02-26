
export interface Tool {
  title: string;
  description: string;
  href: string;
  index: string;
  category: string;
}

export interface Resource {
  title: string;
  description: string;
  url: string;
  category: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export const tools: Tool[] = [
  {
    title: 'Password Generator',
    description: 'Cryptographically secure entropy engine.',
    href: '/tools/password-generator',
    index: '01',
    category: 'Security',
  },
  {
    title: 'Bcrypt Utility',
    description: 'Enterprise hashing and verification workspace.',
    href: '/tools/bcrypt',
    index: '02',
    category: 'Security',
  },
  {
    title: 'JWT Decoder',
    description: 'Local-first token inspection and debugging.',
    href: '/tools/jwt-decoder',
    index: '03',
    category: 'Development',
  },
  {
    title: 'Crontab Builder',
    description: 'Visual scheduler for automated task management.',
    href: '/tools/crontab',
    index: '04',
    category: 'DevOps',
  },
];

export const resources: Resource[] = [
  {
    title: 'Awesome System Design',
    description: 'A curated list of system design topics, case studies and resources.',
    url: 'https://github.com/donnemartin/system-design-primer',
    category: 'Architecture',
  },
  {
    title: 'Refactoring.Guru',
    description: 'The ultimate guide to design patterns and refactoring. Visual and practical.',
    url: 'https://refactoring.guru/',
    category: 'Design Patterns',
  },
  {
    title: 'React Patterns',
    description: 'A compilation of common patterns and best practices for React components.',
    url: 'https://reactpatterns.com/',
    category: 'Frontend',
  },
  {
    title: 'Go by Example',
    description: 'Hands-on introduction to Go using annotated example programs.',
    url: 'https://gobyexample.com/',
    category: 'Backend',
  },
  {
    title: 'Next.js Documentation',
    description: 'Official documentation for Next.js, including App Router and Turbopack.',
    url: 'https://nextjs.org/docs',
    category: 'Framework',
  },
  {
    title: 'High Performance Browser Networking',
    description: 'What every web developer should know about networking and browser performance.',
    url: 'https://hpbn.co/',
    category: 'Performance',
  },
];

export const projects: Project[] = [
  {
    title: 'Distributed Task Scheduler',
    description: 'A fault-tolerant, high-performance task scheduler built with Go and Redis. Handles 1M+ concurrent jobs.',
    tags: ['Go', 'Redis', 'gRPC'],
    href: 'https://lab.nguyen227.dev',
  },
  {
    title: 'AI Canvas',
    description: 'An experimental drawing tool powered by Stable Diffusion. Generates art based on strokes and prompts.',
    tags: ['Python', 'PyTorch', 'Next.js'],
    href: 'https://lab.nguyen227.dev',
  },
  {
    title: 'Crypto Indexer',
    description: 'High-speed blockchain indexer for Ethereum-based networks. Optimized for analytical queries.',
    tags: ['Rust', 'PostgreSQL', 'Kafka'],
    href: 'https://lab.nguyen227.dev',
  },
];
