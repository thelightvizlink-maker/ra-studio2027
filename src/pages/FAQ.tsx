import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import NeomorphicCard from '@/components/NeomorphicCard';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'What is RA Studio, in one sentence?',
          a: 'RA Studio is a creative-tech ecosystem that merges premium design, full-stack web apps, AI workflows, motion, music, and publishing into one coherent production system.',
        },
        {
          q: 'What does "Designs Engineered" actually mean?',
          a: 'It means you get visuals that are not just pretty—they\'re built to work in real products: scalable, consistent, fast to load, accessible, and ready for real users.',
        },
        {
          q: 'What are your 5 divisions?',
          a: '1) RA Studio — Web & Product (Traditional Digital Art & Apps Production), 2) RA Labs — AI / Prompt Engineering, 3) RA Motion — Video / Editing, 4) RA Press — Docs / Books, 5) RA Sound — Music.',
        },
        {
          q: 'What kind of clients do you work with?',
          a: 'Founders, creators, small businesses, and teams who want a premium brand + product experience without juggling multiple vendors.',
        },
        {
          q: 'How do we start a project?',
          a: 'Send your goal, examples you like, your deadline, and any assets you already have. We reply with a scope + a clear plan + the fastest route to ship.',
        },
      ],
    },
    {
      category: 'Divisions & Capabilities',
      questions: [
        {
          q: 'When should I choose RA Studio vs RA Labs?',
          a: 'Choose RA Studio for high-touch craft, unique art direction, complex custom builds, or brand systems. Choose RA Labs for fast front-end shipping, AI-assisted brand drafts, and rapid iterations.',
        },
        {
          q: 'What does "Web & Product" include?',
          a: 'Websites, landing pages, dashboards, web apps, UI systems, front-end engineering, and product-level polish.',
        },
        {
          q: 'What\'s the difference in quality between AI-assisted and traditional?',
          a: 'The final quality is the same—we apply human review and polish to all deliverables. AI accelerates the draft stage, but the output meets the same standards.',
        },
        {
          q: 'What does RA Labs actually do?',
          a: 'Prompt engineering, rapid front-end sprints using AI-assisted workflows, workflow automation, and AI 3D product generation from 2D images.',
        },
      ],
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          q: 'Why is some pricing so low?',
          a: 'We use AI-assisted workflows where appropriate to reduce production time without sacrificing quality. Lower overhead, smarter tools, same premium output.',
        },
        {
          q: 'What\'s the "First 100" pricing?',
          a: 'Early-bird rates for our first 100 clients. Once claimed, prices return to standard rates.',
        },
        {
          q: 'Do you offer payment plans?',
          a: 'For projects over $500, we can arrange milestone-based payments. Contact us to discuss options.',
        },
        {
          q: 'What\'s included in the quoted price?',
          a: 'Clear scope, timeline, deliverables list, revision rules, and handover formats—so you always know what you\'re getting and when.',
        },
      ],
    },
    {
      category: 'Process & Delivery',
      questions: [
        {
          q: 'How fast can you deliver?',
          a: 'Depends on scope. AI-assisted front-end can ship first draft in 24h. Traditional complex projects may take 2-4 weeks. We\'ll give you a clear timeline upfront.',
        },
        {
          q: 'Do you work internationally?',
          a: 'Yes—everything is delivered digitally, and we adapt communication to your time zone and tools.',
        },
        {
          q: 'What happens after delivery?',
          a: 'You own everything. We provide source files, documentation, and handover support. Maintenance packages available if needed.',
        },
        {
          q: 'What if I need changes after delivery?',
          a: 'Revisions within scope are included. Post-delivery changes can be handled through additional agreements or maintenance packages.',
        },
      ],
    },
    {
      category: 'AI & Philosophy',
      questions: [
        {
          q: 'What\'s your core philosophy about AI?',
          a: 'AI is a multiplier, not a replacement: we use it to reduce waste, accelerate drafts, and raise consistency—then we apply human judgment for quality.',
        },
        {
          q: 'Is this "AI-first" or "craft-first"?',
          a: 'Both, but separated: RA Studio is craft-driven traditional production; RA Labs is AI-assisted production optimized for speed and cost.',
        },
        {
          q: 'Will AI replace human designers?',
          a: 'No. AI handles repetitive tasks and accelerates drafts. Human creativity, judgment, and client relationship remain essential.',
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  let globalIndex = 0;

  return (
    <>
      <Helmet>
        <title>FAQ | RA Studio - Frequently Asked Questions</title>
        <meta 
          name="description" 
          content="Find answers to common questions about RA Studio's services, pricing, process, and philosophy. Learn how we can help with your creative-tech needs." 
        />
      </Helmet>
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block neo-card px-4 py-2 text-sm text-primary mb-4">
              FAQ
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-foreground">Frequently Asked </span>
              <span className="text-gradient-primary">Questions</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Everything you need to know about working with RA Studio
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full neo-inset bg-transparent pl-12 pr-4 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {filteredFaqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-semibold text-primary mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = globalIndex++;
                    const isOpen = openIndex === currentIndex;
                    
                    return (
                      <NeomorphicCard
                        key={faq.q}
                        className="overflow-hidden"
                        tiltEnabled={false}
                      >
                        <button
                          className="w-full p-6 text-left flex items-center justify-between gap-4 interactive"
                          onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                        >
                          <span className="font-medium text-foreground">
                            {faq.q}
                          </span>
                          <ChevronDown 
                            className={cn(
                              "w-5 h-5 text-primary shrink-0 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )} 
                          />
                        </button>
                        <div 
                          className={cn(
                            "grid transition-all duration-300",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      </NeomorphicCard>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default FAQ;
