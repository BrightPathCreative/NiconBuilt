export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string[];
};

/** Surviving blog posts — content migrated from WordPress; expand when full list confirmed */
export const blogPosts: BlogPost[] = [
  {
    slug: "renovation-inspirations-before-and-after-success-project-port-melbourne",
    title: "Renovation Inspirations: Before and After Success Project Port Melbourne",
    excerpt:
      "A look at a completed Port Melbourne renovation — from planning through to the finished result.",
    date: "June 2024",
    content: [
      "This Port Melbourne project showcases what's possible when heritage renovation is done with care, experience, and the right team from day one.",
      "From the initial assessment through to final handover, Nick managed every trade personally — coordinating structural work, finishes, and council requirements without handoffs.",
      "The result is a home that respects its original character while delivering modern living standards. If you're planning a similar project in Port Melbourne or the inner south, get in touch for a no-obligation quote.",
    ],
  },
  {
    slug: "should-i-renovate-or-build-new-nicon-built",
    title: "Should I Renovate or Build New?",
    excerpt:
      "Practical guidance on choosing between renovating your existing home and starting fresh.",
    date: "March 2023",
    content: [
      "It's one of the most common questions we hear: should I renovate or build new? The answer depends on your block, your home's condition, council controls, and what you're trying to achieve.",
      "Renovating often makes sense when you have a solid structure, heritage value, or a location you don't want to leave. Building new may suit blocks with poor existing structures or when dual-occupancy potential is the goal.",
      "Nick can assess your property and give you straight advice — no sales pitch, just what's practical for your situation.",
    ],
  },
  {
    slug: "fabulous-at-40-why-experience-matters-in-building",
    title: "Fabulous at 40: Why Experience Matters in Building",
    excerpt: "Three decades in the industry — and why it matters for your project.",
    date: "November 2022",
    content: [
      "Experience in building isn't just about knowing how to lay a brick. It's about anticipating problems before they become expensive, sourcing the right materials, and managing trades in the correct sequence.",
      "Nick has been on the tools since 1990, starting on major Melbourne infrastructure projects before building Nicon Built into one of the inner south's most trusted residential builders.",
      "When you work with an experienced builder, you're paying for fewer surprises — and that's worth more than any discount on day one.",
    ],
  },
  {
    slug: "the-importance-of-collaboration-in-building",
    title: "The Importance of Collaboration in Building",
    excerpt: "Why working with your architect, designer, and builder as a team gets better results.",
    date: "February 2023",
    content: [
      "The best building outcomes happen when the architect, designer, and builder communicate openly from the start — not when the builder is brought in after plans are locked.",
      "Nicon Built regularly collaborates with architects and designers across Melbourne's inner south. We respect the design intent and flag constructability issues early, when they're cheap to fix.",
      "Already working with an architect? We're happy to join your team. Need a recommendation? We can point you to trusted professionals we've worked with for years.",
    ],
  },
  {
    slug: "how-to-design-for-a-narrow-block",
    title: "How to Design for a Narrow Block",
    excerpt: "Making the most of tight inner-suburban sites in Melbourne.",
    date: "March 2023",
    content: [
      "Melbourne's inner suburbs are full of narrow blocks — and they require a different design approach to wide suburban allotments.",
      "Light, vertical circulation, and clever storage become priorities. Setbacks, overshadowing rules, and heritage overlays add further constraints that need to be understood before design begins.",
      "If you're planning a build or extension on a narrow block, talk to an experienced builder early. Nick can assess what's achievable on your site before you invest in detailed drawings.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
