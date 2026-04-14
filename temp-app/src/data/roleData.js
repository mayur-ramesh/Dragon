export const roles = {
  "junior-financial-analyst": {
    title: "Junior Financial Analyst",
    industry: "Fintech",
    taskPool: [
      { id: "fa-1", name: "Data entry & reconciliation", defaultFrequency: "daily" },
      { id: "fa-2", name: "Report formatting & distribution", defaultFrequency: "daily" },
      { id: "fa-3", name: "Financial modelling", defaultFrequency: "weekly" },
      { id: "fa-4", name: "Trend & variance analysis", defaultFrequency: "weekly" },
      { id: "fa-5", name: "Client brief preparation", defaultFrequency: "weekly" },
      { id: "fa-6", name: "Stakeholder presentations", defaultFrequency: "weekly" },
      { id: "fa-7", name: "Ad-hoc data requests", defaultFrequency: "daily" },
      { id: "fa-8", name: "Strategic judgment calls", defaultFrequency: "rarely" },
      { id: "fa-9", name: "Mentoring & knowledge transfer", defaultFrequency: "rarely" },
      { id: "fa-10", name: "Client relationship management", defaultFrequency: "weekly" },
      { id: "fa-11", name: "Compliance checks", defaultFrequency: "daily" },
      { id: "fa-12", name: "Cross-team coordination", defaultFrequency: "weekly" },
    ],
    aiAnalysis: {
      year1: {
        automatable: [
          { id: "fa-1", detail: "AI tools auto-extract and match transaction records with 98% accuracy" },
          { id: "fa-2", detail: "Automated templates and AI formatting tools handle report generation" },
        ],
        augmented: [
          { id: "fa-3", detail: "AI assists with scenario generation, but humans set assumptions and validate" },
          { id: "fa-4", detail: "AI surfaces patterns faster, but interpretation requires human judgment" },
          { id: "fa-5", detail: "AI drafts initial briefs, humans refine for client-specific context" },
          { id: "fa-7", detail: "AI can pull and format data, but framing the answer is human" },
          { id: "fa-11", detail: "AI flags potential issues, humans make the compliance judgment call" },
          { id: "fa-6", detail: "AI helps build slides and talking points, delivery remains human" },
        ],
        human: [
          { id: "fa-8", detail: "High-stakes decisions require human accountability and contextual wisdom" },
          { id: "fa-9", detail: "Human connection and experience transfer can't be replicated" },
          { id: "fa-10", detail: "Trust-building and relationship nuance are deeply human" },
          { id: "fa-12", detail: "Navigating team dynamics and politics requires emotional intelligence" },
        ],
      },
      year5: {
        automatable: [
          { id: "fa-1", detail: "Fully automated with near-zero error rates" },
          { id: "fa-2", detail: "End-to-end automated report generation and distribution" },
          { id: "fa-4", detail: "Standard pattern recognition and variance flagging fully handled by AI" },
          { id: "fa-7", detail: "AI handles routine data pulls and formatting autonomously" },
          { id: "fa-11", detail: "Routine compliance screening fully automated" },
        ],
        augmented: [
          { id: "fa-3", detail: "AI builds most models, humans validate edge cases and strategic assumptions" },
          { id: "fa-5", detail: "AI produces near-final briefs, humans add strategic framing and nuance" },
          { id: "fa-6", detail: "AI generates full presentation drafts, humans refine narrative and deliver" },
        ],
        human: [
          { id: "fa-8", detail: "Even more critical as routine work disappears — judgment IS the job" },
          { id: "fa-9", detail: "Mentoring becomes a core differentiator for experienced professionals" },
          { id: "fa-10", detail: "Client relationships are the ultimate defensible asset" },
          { id: "fa-12", detail: "Cross-functional leadership becomes more valuable, not less" },
        ],
      },
    },
    moves: [
      {
        number: "01",
        title: "Own the client conversation on your next project",
        why: "As AI handles data prep and report formatting, the analyst who understands the client's real concerns — not just their data — becomes indispensable. Your 'Client relationship management' task is fully human and grows in value.",
        linkedTaskId: "fa-10",
        linkedTaskName: "Client relationship management",
        course: {
          name: "AI-Assisted Financial Analysis with Python",
          provider: "NUS School of Computing",
          duration: "8 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "02",
        title: "Start a decision journal this week",
        why: "Document your judgment calls — the assumptions you set in financial models, the anomalies you chose to investigate. This builds a track record of human insight that no AI can replicate, directly strengthening your 'Strategic judgment calls' task.",
        linkedTaskId: "fa-8",
        linkedTaskName: "Strategic judgment calls",
        course: {
          name: "Business Communication with Generative AI",
          provider: "Singapore Management University",
          duration: "4 weeks · Online",
          skillsFuture: true,
        },
      },
      {
        number: "03",
        title: "Become the translator between AI output and business action",
        why: "Your 'Financial modelling' and 'Trend analysis' tasks are being augmented — meaning AI does the heavy computation, but someone needs to explain what it means. Be that person. It's the highest-leverage position in a team.",
        linkedTaskId: "fa-3",
        linkedTaskName: "Financial modelling",
        course: {
          name: "Data Storytelling & Visualisation",
          provider: "General Assembly Singapore",
          duration: "6 weeks · Part-time",
          skillsFuture: false,
        },
      },
    ],
    clarityScore: 78,
    summaryInsight: "3 of your 5 daily tasks will be augmented within 2 years — but your human judgment becomes more valuable, not less.",
  },

  "digital-marketer": {
    title: "Digital Marketer",
    industry: "Marketing",
    taskPool: [
      { id: "dm-1", name: "Social media content creation", defaultFrequency: "daily" },
      { id: "dm-2", name: "Campaign performance analysis", defaultFrequency: "weekly" },
      { id: "dm-3", name: "Ad copywriting", defaultFrequency: "daily" },
      { id: "dm-4", name: "SEO keyword research", defaultFrequency: "weekly" },
      { id: "dm-5", name: "Email marketing campaigns", defaultFrequency: "weekly" },
      { id: "dm-6", name: "Brand strategy planning", defaultFrequency: "rarely" },
      { id: "dm-7", name: "Influencer outreach", defaultFrequency: "weekly" },
      { id: "dm-8", name: "A/B test design & analysis", defaultFrequency: "weekly" },
      { id: "dm-9", name: "Client reporting", defaultFrequency: "weekly" },
      { id: "dm-10", name: "Creative briefing", defaultFrequency: "weekly" },
      { id: "dm-11", name: "Budget allocation", defaultFrequency: "rarely" },
      { id: "dm-12", name: "Community management", defaultFrequency: "daily" },
    ],
    aiAnalysis: {
      year1: {
        automatable: [
          { id: "dm-4", detail: "AI tools can scan and rank thousands of keywords instantly with competitive analysis" },
          { id: "dm-9", detail: "Automated dashboards compile and format campaign reports in real-time" },
        ],
        augmented: [
          { id: "dm-1", detail: "AI generates content drafts, but brand voice, cultural nuance, and timing are human" },
          { id: "dm-3", detail: "AI produces copy variations at scale, humans select, refine, and inject personality" },
          { id: "dm-5", detail: "AI personalises subject lines and segments audiences, humans craft the narrative arc" },
          { id: "dm-8", detail: "AI can auto-generate test variants, humans design the hypothesis and read implications" },
          { id: "dm-2", detail: "AI surfaces performance anomalies, humans draw strategic conclusions and act" },
          { id: "dm-10", detail: "AI helps structure briefs from data, humans define the creative vision and tone" },
        ],
        human: [
          { id: "dm-6", detail: "Brand positioning requires deep cultural and competitive understanding" },
          { id: "dm-7", detail: "Relationship-building with influencers hinges on trust and genuine human connection" },
          { id: "dm-11", detail: "Budget decisions require strategic judgment about trade-offs and business priorities" },
          { id: "dm-12", detail: "Community trust is built through authentic, empathetic human interaction" },
        ],
      },
      year5: {
        automatable: [
          { id: "dm-4", detail: "Fully automated keyword intelligence with real-time competitive mapping" },
          { id: "dm-9", detail: "AI delivers predictive reporting with zero manual input required" },
          { id: "dm-3", detail: "AI writes, tests, and iterates copy autonomously within brand guidelines" },
          { id: "dm-5", detail: "End-to-end AI-driven email personalisation at individual recipient level" },
          { id: "dm-8", detail: "Self-optimising AI runs continuous multivariate testing without human setup" },
        ],
        augmented: [
          { id: "dm-1", detail: "AI generates and schedules content, humans provide creative direction and brand stewardship" },
          { id: "dm-2", detail: "AI delivers strategic recommendations, humans validate against business context" },
          { id: "dm-10", detail: "AI drafts near-complete briefs, humans apply cultural and strategic judgment" },
        ],
        human: [
          { id: "dm-6", detail: "Brand strategy is the last human moat — it requires vision, not just data" },
          { id: "dm-7", detail: "Genuine influencer partnerships are built on credibility and human relationships" },
          { id: "dm-11", detail: "Budget authority and risk judgment remain firmly human" },
          { id: "dm-12", detail: "Building a genuine community of advocates cannot be automated" },
        ],
      },
    },
    moves: [
      {
        number: "01",
        title: "Become the brand voice guardian on your team",
        why: "As AI generates content at scale, someone needs to ensure every piece sounds unmistakably like the brand. Your 'Community management' and 'Brand strategy planning' tasks are deeply human — position yourself as the person who defines and protects the voice AI can't replicate.",
        linkedTaskId: "dm-6",
        linkedTaskName: "Brand strategy planning",
        course: {
          name: "Strategic Brand Management in the AI Era",
          provider: "Singapore Management University",
          duration: "6 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "02",
        title: "Own the strategy layer above the AI content tools",
        why: "When AI can write the copy, your value shifts to deciding what to say, to whom, and why. Your 'A/B test design' and 'Campaign performance analysis' tasks are being augmented — be the person who turns AI insights into creative strategy, not just the person who runs the tools.",
        linkedTaskId: "dm-2",
        linkedTaskName: "Campaign performance analysis",
        course: {
          name: "AI-Powered Marketing Analytics",
          provider: "Google via Coursera",
          duration: "5 weeks · Online",
          skillsFuture: true,
        },
      },
      {
        number: "03",
        title: "Build genuine relationships that AI can't access",
        why: "Influencer outreach and community management are fully human tasks — they depend on authentic connection, empathy, and earned trust. Invest in these relationships deliberately. They become your most defensible professional asset as everything transactional gets automated.",
        linkedTaskId: "dm-7",
        linkedTaskName: "Influencer outreach",
        course: {
          name: "Digital Community Building & Engagement",
          provider: "General Assembly Singapore",
          duration: "4 weeks · Online",
          skillsFuture: false,
        },
      },
    ],
    clarityScore: 72,
    summaryInsight: "4 of your daily tasks will be augmented within 2 years — but the marketers who own brand voice and community will be in higher demand, not lower.",
  },

  "ux-designer": {
    title: "UX Designer",
    industry: "Creative & Media",
    taskPool: [
      { id: "ux-1", name: "User research interviews", defaultFrequency: "weekly" },
      { id: "ux-2", name: "Wireframing", defaultFrequency: "daily" },
      { id: "ux-3", name: "High-fidelity mockups", defaultFrequency: "daily" },
      { id: "ux-4", name: "Design system maintenance", defaultFrequency: "weekly" },
      { id: "ux-5", name: "Usability testing", defaultFrequency: "weekly" },
      { id: "ux-6", name: "Stakeholder presentations", defaultFrequency: "weekly" },
      { id: "ux-7", name: "Competitive analysis", defaultFrequency: "rarely" },
      { id: "ux-8", name: "Interaction design", defaultFrequency: "daily" },
      { id: "ux-9", name: "Accessibility audits", defaultFrequency: "rarely" },
      { id: "ux-10", name: "Cross-functional collaboration", defaultFrequency: "daily" },
      { id: "ux-11", name: "Design critique", defaultFrequency: "weekly" },
      { id: "ux-12", name: "Prototyping", defaultFrequency: "weekly" },
    ],
    aiAnalysis: {
      year1: {
        automatable: [
          { id: "ux-7", detail: "AI scans and catalogues competitor interfaces, surfaces patterns automatically" },
          { id: "ux-9", detail: "AI accessibility checkers flag WCAG violations and suggest fixes across all screens" },
        ],
        augmented: [
          { id: "ux-2", detail: "AI generates wireframe options from prompts, designers select, direct, and refine" },
          { id: "ux-3", detail: "AI-assisted tools accelerate mockup production, humans apply craft and judgment" },
          { id: "ux-4", detail: "AI helps maintain design token consistency, humans govern the system architecture" },
          { id: "ux-12", detail: "AI can generate interactive prototypes from mockups, humans direct the experience flow" },
          { id: "ux-8", detail: "AI suggests micro-interaction patterns, designers evaluate fit and originality" },
          { id: "ux-6", detail: "AI helps structure presentation narratives, humans deliver and respond to questions" },
        ],
        human: [
          { id: "ux-1", detail: "Deep user empathy and nuanced insight extraction cannot be automated" },
          { id: "ux-5", detail: "Facilitation, probing, and reading non-verbal cues require human presence" },
          { id: "ux-10", detail: "Negotiating design decisions across engineering, product, and business is a human skill" },
          { id: "ux-11", detail: "Design critique requires taste, context, and the ability to mentor and influence" },
        ],
      },
      year5: {
        automatable: [
          { id: "ux-7", detail: "Fully automated competitive intelligence with real-time design trend tracking" },
          { id: "ux-9", detail: "AI fixes most accessibility issues autonomously during design generation" },
          { id: "ux-2", detail: "AI generates production-ready wireframes from product requirements docs" },
          { id: "ux-3", detail: "AI produces near-final mockup variants; designers curate and make final calls" },
          { id: "ux-12", detail: "AI builds clickable prototypes end-to-end from design briefs" },
        ],
        augmented: [
          { id: "ux-4", detail: "AI manages routine token updates; humans architect the design system strategy" },
          { id: "ux-8", detail: "AI proposes interaction systems; designers validate against user mental models" },
          { id: "ux-6", detail: "AI builds presentations; humans own the narrative and stakeholder relationship" },
        ],
        human: [
          { id: "ux-1", detail: "User research depth and relationship-based insight remain irreplaceable" },
          { id: "ux-5", detail: "Usability facilitation and insight synthesis are core human strengths" },
          { id: "ux-10", detail: "Design advocacy and cross-functional influence grow more valuable, not less" },
          { id: "ux-11", detail: "Design leadership through critique and taste-making is a distinctly human role" },
        ],
      },
    },
    moves: [
      {
        number: "01",
        title: "Deepen your user research practice — this is your moat",
        why: "AI can generate wireframes, mockups, and even prototypes — but it cannot sit across from a user, listen, probe, and extract the insight that changes a product. Your 'User research interviews' and 'Usability testing' tasks are fully human and grow in value as everything else gets automated.",
        linkedTaskId: "ux-1",
        linkedTaskName: "User research interviews",
        course: {
          name: "Advanced User Research Methods",
          provider: "IDEO U via edX",
          duration: "6 weeks · Online",
          skillsFuture: true,
        },
      },
      {
        number: "02",
        title: "Become the design systems architect, not just a contributor",
        why: "As AI handles routine design production, the person who governs the design system — setting principles, resolving conflicts, and scaling coherence — becomes the most valuable designer on any team. Invest in owning the architecture, not just the components.",
        linkedTaskId: "ux-4",
        linkedTaskName: "Design system maintenance",
        course: {
          name: "Design Systems & Tokens Masterclass",
          provider: "Figma Community x NUS Extension",
          duration: "4 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "03",
        title: "Own the research-to-recommendation pipeline",
        why: "AI will generate designs faster than ever — but someone needs to connect user insight to product decisions. Practice writing crisp design recommendations that translate research into action. 'Design critique' and 'Cross-functional collaboration' are your highest-leverage human skills.",
        linkedTaskId: "ux-11",
        linkedTaskName: "Design critique",
        course: {
          name: "Communicating Design Decisions",
          provider: "General Assembly Singapore",
          duration: "5 weeks · Part-time",
          skillsFuture: false,
        },
      },
    ],
    clarityScore: 81,
    summaryInsight: "Your strongest assets — empathy, research, and design advocacy — are exactly what AI cannot replicate. The shift ahead actually raises the ceiling for great UX designers.",
  },

  "logistics-coordinator": {
    title: "Logistics Coordinator",
    industry: "Logistics",
    taskPool: [
      { id: "lc-1", name: "Shipment tracking & status updates", defaultFrequency: "daily" },
      { id: "lc-2", name: "Route planning & optimisation", defaultFrequency: "daily" },
      { id: "lc-3", name: "Vendor communication", defaultFrequency: "daily" },
      { id: "lc-4", name: "Inventory reconciliation", defaultFrequency: "weekly" },
      { id: "lc-5", name: "Customs documentation", defaultFrequency: "weekly" },
      { id: "lc-6", name: "Exception handling & disruptions", defaultFrequency: "daily" },
      { id: "lc-7", name: "Carrier negotiation", defaultFrequency: "rarely" },
      { id: "lc-8", name: "Demand forecasting", defaultFrequency: "weekly" },
      { id: "lc-9", name: "Warehouse coordination", defaultFrequency: "daily" },
      { id: "lc-10", name: "Client delivery updates", defaultFrequency: "daily" },
      { id: "lc-11", name: "Cost optimisation reports", defaultFrequency: "weekly" },
      { id: "lc-12", name: "Team scheduling", defaultFrequency: "weekly" },
    ],
    aiAnalysis: {
      year1: {
        automatable: [
          { id: "lc-1", detail: "IoT sensors and AI provide real-time shipment visibility with automated status alerts" },
          { id: "lc-4", detail: "AI cross-references warehouse data and purchase orders automatically" },
          { id: "lc-10", detail: "Automated notification systems deliver personalised delivery updates to clients" },
        ],
        augmented: [
          { id: "lc-2", detail: "AI optimises routes continuously, but coordinators handle dynamic real-world constraints" },
          { id: "lc-5", detail: "AI auto-populates standard customs forms, humans review for compliance and exceptions" },
          { id: "lc-8", detail: "AI analyses historical data for forecasts, humans factor in market intelligence" },
          { id: "lc-9", detail: "AI optimises warehouse slotting and workflows, humans manage operational exceptions" },
          { id: "lc-11", detail: "AI generates cost reports automatically, humans draw strategic cost-saving conclusions" },
          { id: "lc-12", detail: "AI assists with scheduling optimisation, humans manage human factors and preferences" },
        ],
        human: [
          { id: "lc-3", detail: "Vendor relationships are built on trust, negotiation, and mutual understanding" },
          { id: "lc-6", detail: "Crisis resolution requires rapid judgment, stakeholder communication, and improvisation" },
          { id: "lc-7", detail: "Contract negotiation requires strategic reading of leverage, relationships, and terms" },
        ],
      },
      year5: {
        automatable: [
          { id: "lc-1", detail: "Fully autonomous shipment monitoring with predictive disruption alerts" },
          { id: "lc-4", detail: "Real-time inventory synchronisation across the entire supply chain" },
          { id: "lc-10", detail: "AI handles all routine client communication autonomously and proactively" },
          { id: "lc-2", detail: "Fully autonomous dynamic route optimisation with real-time traffic and disruption data" },
          { id: "lc-8", detail: "AI demand forecasting surpasses human accuracy for standard product lines" },
          { id: "lc-11", detail: "Automated cost intelligence with continuous optimisation recommendations" },
        ],
        augmented: [
          { id: "lc-5", detail: "AI handles standard customs documentation; humans manage regulatory exceptions" },
          { id: "lc-9", detail: "Automated warehouse systems manage routine operations; humans direct strategy" },
          { id: "lc-12", detail: "AI handles most scheduling; humans focus on complex human resource decisions" },
        ],
        human: [
          { id: "lc-3", detail: "Vendor partnerships and trust-based relationships remain fundamentally human" },
          { id: "lc-6", detail: "Exception handling and crisis judgment become the defining skill of the role" },
          { id: "lc-7", detail: "Strategic negotiation and contract management are irreplaceably human" },
        ],
      },
    },
    moves: [
      {
        number: "01",
        title: "Become the exception-handling expert on your team",
        why: "AI handles the normal flow — predictable routes, standard shipments, routine updates. But when a typhoon reroutes three carriers simultaneously, or a vendor fails at 11pm, that's when your judgment matters. 'Exception handling & disruptions' is your highest-value daily task — own it deliberately.",
        linkedTaskId: "lc-6",
        linkedTaskName: "Exception handling & disruptions",
        course: {
          name: "Supply Chain Risk Management",
          provider: "Singapore Polytechnic CPE",
          duration: "6 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "02",
        title: "Own your key vendor relationships at a personal level",
        why: "As AI handles tracking, scheduling, and reporting, the coordinator who has genuine relationships with key carriers and vendors gains significant negotiating leverage. Invest in 'Vendor communication' as a strategic skill, not an administrative task.",
        linkedTaskId: "lc-3",
        linkedTaskName: "Vendor communication",
        course: {
          name: "Negotiation & Influence in Supply Chain",
          provider: "NUS Business School",
          duration: "5 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "03",
        title: "Master cross-border complexity and regulatory knowledge",
        why: "Customs documentation and regulatory compliance are being augmented — AI handles the standard forms, but the edge cases multiply as global trade grows more complex. Position yourself as the team's expert on cross-border complexity and you become indispensable as AI handles routine compliance.",
        linkedTaskId: "lc-5",
        linkedTaskName: "Customs documentation",
        course: {
          name: "International Trade Compliance & Customs",
          provider: "Singapore Customs Academy",
          duration: "8 weeks · Part-time",
          skillsFuture: true,
        },
      },
    ],
    clarityScore: 68,
    summaryInsight: "5 of your daily tasks are being automated within 2 years — but the coordinators who master exception handling and vendor relationships will be promoted, not replaced.",
  },

  "university-professor": {
    title: "University Professor",
    industry: "Education",
    taskPool: [
      { id: "up-1", name: "Grading & marking", defaultFrequency: "daily" },
      { id: "up-2", name: "Lecture preparation", defaultFrequency: "weekly" },
      { id: "up-3", name: "Student advising & office hours", defaultFrequency: "weekly" },
      { id: "up-4", name: "Research writing", defaultFrequency: "weekly" },
      { id: "up-5", name: "Literature review", defaultFrequency: "weekly" },
      { id: "up-6", name: "Administrative emails", defaultFrequency: "daily" },
      { id: "up-7", name: "Committee & admin duties", defaultFrequency: "weekly" },
      { id: "up-8", name: "Curriculum & course design", defaultFrequency: "rarely" },
      { id: "up-9", name: "Grant writing", defaultFrequency: "rarely" },
      { id: "up-10", name: "Peer review of papers", defaultFrequency: "rarely" },
      { id: "up-11", name: "Student project supervision", defaultFrequency: "weekly" },
      { id: "up-12", name: "Conference presentations", defaultFrequency: "rarely" },
    ],
    aiAnalysis: {
      year1: {
        automatable: [
          { id: "up-6", detail: "AI drafts and categorises routine emails — follow-ups, scheduling, and standard student queries handled automatically" },
          { id: "up-5", detail: "AI tools scan databases, surface relevant papers, and generate annotated summaries in minutes" },
        ],
        augmented: [
          { id: "up-1", detail: "AI grades structured work (MCQ, short answer) and flags anomalies, but nuanced feedback on essays and projects remains human" },
          { id: "up-2", detail: "AI generates lecture outlines and slide drafts, but pedagogical sequencing and deep explanation are yours" },
          { id: "up-7", detail: "AI summarises meeting notes and tracks action items, but committee judgment and institutional knowledge are human" },
          { id: "up-8", detail: "AI suggests learning outcomes and module structures from syllabi data, humans design the intellectual arc" },
          { id: "up-10", detail: "AI does initial desk-review screening and similarity checks, but expert evaluation of contribution and rigour is human" },
          { id: "up-4", detail: "AI assists with drafting sections and checking citations, but the intellectual argument is entirely yours" },
        ],
        human: [
          { id: "up-3", detail: "Student advising requires understanding the whole person — academic, personal, and professional — which no AI can replicate" },
          { id: "up-11", detail: "Shaping a student's research direction, providing critical feedback, and building their academic identity is deeply human" },
          { id: "up-9", detail: "Grant strategy requires reading funding landscapes, building relationships with panels, and crafting a compelling vision" },
          { id: "up-12", detail: "A keynote or invited talk carries your intellectual reputation and scholarly voice — authentically human" },
        ],
      },
      year5: {
        automatable: [
          { id: "up-6", detail: "Routine correspondence fully automated with near-zero manual input required" },
          { id: "up-5", detail: "AI delivers real-time, synthesised literature maps with gap analysis and citation networks" },
          { id: "up-1", detail: "AI handles structured grading end-to-end; professors focus only on complex written work and oral defences" },
          { id: "up-7", detail: "Routine admin and meeting management fully handled by AI assistants" },
        ],
        augmented: [
          { id: "up-2", detail: "AI generates and personalises lecture content per student cohort; professors direct learning strategy and run discussions" },
          { id: "up-4", detail: "AI co-writes first drafts at near-publishable quality; professors contribute original ideas, critique, and final voice" },
          { id: "up-8", detail: "AI designs complete course modules from learning objectives; professors evaluate, iterate, and infuse disciplinary identity" },
          { id: "up-10", detail: "AI does detailed initial review; human reviewers focus on evaluating novelty and field impact" },
        ],
        human: [
          { id: "up-3", detail: "Mentoring and personal advising become even more critical as students navigate an AI-saturated world — the human guide is irreplaceable" },
          { id: "up-11", detail: "Research supervision — teaching intellectual courage, research ethics, and original thinking — becomes the highest-leverage professor activity" },
          { id: "up-9", detail: "Grant leadership and building collaborative research agendas remain fundamentally human and relationship-driven" },
          { id: "up-12", detail: "Thought leadership, keynotes, and scholarly debate are the professional signature only you can carry" },
        ],
      },
    },
    moves: [
      {
        number: "01",
        title: "Become the mentor your students can't get from any AI",
        why: "As AI handles marking and literature search, the professor who invests deeply in 'Student advising & office hours' and 'Student project supervision' becomes the most sought-after in any department. Human guidance through confusion, failure, and academic identity is irreplaceable — and increasingly rare.",
        linkedTaskId: "up-3",
        linkedTaskName: "Student advising & office hours",
        course: {
          name: "Coaching & Mentoring in Higher Education",
          provider: "NUS Teaching Academy",
          duration: "6 weeks · Part-time",
          skillsFuture: true,
        },
      },
      {
        number: "02",
        title: "Shift from writing research to directing it",
        why: "AI will draft your sections and check citations — but it cannot formulate the question, challenge the paradigm, or argue the significance. Position yourself as the intellectual engine behind 'Research writing' and 'Grant writing'. Your value lies in originating ideas, not executing them.",
        linkedTaskId: "up-4",
        linkedTaskName: "Research writing",
        course: {
          name: "AI Tools for Academic Research & Writing",
          provider: "NUS Libraries · Digital Research Skills",
          duration: "4 weeks · Online",
          skillsFuture: true,
        },
      },
      {
        number: "03",
        title: "Design learning experiences AI cannot replicate",
        why: "As AI generates lecture slides and course outlines, 'Curriculum & course design' becomes a higher-order skill — about sequencing ideas, creating intellectual challenge, and building a learning journey. The professors who master this become curriculum architects for their entire institution.",
        linkedTaskId: "up-8",
        linkedTaskName: "Curriculum & course design",
        course: {
          name: "Learning Design for the AI Era",
          provider: "Singapore Institute of Technology",
          duration: "5 weeks · Part-time",
          skillsFuture: true,
        },
      },
    ],
    clarityScore: 74,
    summaryInsight: "4 of your most frequent tasks will be substantially augmented — but your role as intellectual guide, mentor, and research director becomes more vital, not less.",
  },
};

export const roleKeywords = {
  "financial analyst": "junior-financial-analyst",
  "analyst": "junior-financial-analyst",
  "finance": "junior-financial-analyst",
  "fintech": "junior-financial-analyst",
  "accountant": "junior-financial-analyst",
  "marketer": "digital-marketer",
  "marketing": "digital-marketer",
  "social media": "digital-marketer",
  "digital marketing": "digital-marketer",
  "campaign": "digital-marketer",
  "ux": "ux-designer",
  "designer": "ux-designer",
  "design": "ux-designer",
  "ui": "ux-designer",
  "product design": "ux-designer",
  "logistics": "logistics-coordinator",
  "coordinator": "logistics-coordinator",
  "supply chain": "logistics-coordinator",
  "operations": "logistics-coordinator",
  "shipping": "logistics-coordinator",
  "professor": "university-professor",
  "lecturer": "university-professor",
  "academic": "university-professor",
  "faculty": "university-professor",
  "university": "university-professor",
  "researcher": "university-professor",
  "phd": "university-professor",
  "teaching": "university-professor",
};

export function matchRole(input) {
  const lower = input.toLowerCase();
  for (const [keyword, roleKey] of Object.entries(roleKeywords)) {
    if (lower.includes(keyword)) return roleKey;
  }
  return "junior-financial-analyst";
}

const AUTOMATABLE_TERMS = [
  'schedul', 'calendar', 'booking', 'remind',
  'attendance', 'data entry', 'data input',
  'transcri', 'format report', 'generate report',
  'invoice', 'billing', 'payroll',
  'filing', 'document management',
  'routine email', 'auto-reply', 'template',
  'notification', 'alert', 'log ',
  'inventory', 'reconciliation', 'stock ',
  'track', 'kpi', 'status update',
  'report generation', 'weekly report', 'monthly report',
  'daily report', 'operational report', 'seo keyword',
]

const HUMAN_TERMS = [
  'mentor', 'advis', 'counsel', 'coaching', 'coach ',
  'facilitate', 'facilitat',
  'supervise', 'supervision',
  'welfare', 'ethic',
  'inspire', 'motivat', 'leadership',
  'negotiat', 'relationship', 'trust',
  'community', 'emotional', 'empathy',
  'judgment', 'advocacy',
  'keynote', 'strategic vision',
  'culture',
  'stakeholder', 'client ', 'partnership',
  'interview', 'engagement', 'onboard',
  'grievanc', 'exception', 'disruption', 'crisis',
  'present', 'influencer', 'brand activation',
  'vendor relationship', 'team member', 'pair programming',
]

export function classifyCustomTask(taskName) {
  const lower = taskName.toLowerCase()
  for (const term of AUTOMATABLE_TERMS) {
    if (lower.includes(term)) return 'automatable'
  }
  for (const term of HUMAN_TERMS) {
    if (lower.includes(term)) return 'human'
  }
  return 'augmented'
}

export const CUSTOM_TASK_DETAILS = {
  automatable: "This task involves predictable, rule-based steps — expect AI to handle most of it within 1–2 years.",
  augmented: "AI can do the heavy lifting here, but your expertise and judgment are needed to shape and apply the output.",
  human: "This task relies on relationships, empathy, or contextual wisdom that AI cannot replicate — a core part of your value.",
}

/* ──────────────────────────────────────────────
   Job-listing import helpers (prototype / demo)
   ────────────────────────────────────────────── */

const SAMPLE_JOB_LISTINGS = {
  // Indeed-style URLs
  indeed: {
    'marketing': {
      title: 'Digital Marketing Executive',
      industry: 'Marketing',
      description: `We are looking for a Digital Marketing Executive to join our team.

Responsibilities:
• Plan and execute digital marketing campaigns across social media, email, and paid channels
• Create engaging content for Instagram, TikTok, LinkedIn, and Facebook
• Manage and optimise Google Ads and Meta Ads campaigns
• Track campaign performance using Google Analytics and generate weekly reports
• Conduct SEO keyword research and on-page optimisation
• Coordinate with external agencies and influencers for brand partnerships
• Manage email marketing campaigns including A/B testing subject lines
• Monitor competitor activity and market trends
• Respond to customer enquiries and comments on social media platforms
• Prepare monthly marketing performance presentations for management
• Assist in planning and executing events and brand activations
• Develop and maintain content calendars across all platforms`,
    },
    'analyst': {
      title: 'Business Analyst',
      industry: 'Fintech',
      description: `We are seeking a Business Analyst to support our growth team.

Key Responsibilities:
• Gather and document business requirements from stakeholders across departments
• Perform data analysis and create dashboards using SQL and Tableau
• Generate weekly and monthly business performance reports
• Conduct market research and competitive analysis
• Prepare presentation decks for leadership meetings
• Facilitate workshops and requirements-gathering sessions with cross-functional teams
• Write user stories and acceptance criteria for the product team
• Manage project documentation and maintain the team wiki
• Perform UAT testing for new system features before deployment
• Coordinate with vendors and external partners on system integrations
• Identify process improvement opportunities and propose solutions
• Mentor junior team members on analytical tools and frameworks`,
    },
    'engineer': {
      title: 'Software Engineer',
      industry: 'Tech',
      description: `We're hiring a Software Engineer to build scalable applications.

Responsibilities:
• Design and develop backend services using Python and Node.js
• Write and maintain unit tests and integration tests
• Participate in code reviews and provide constructive feedback to peers
• Debug and resolve production issues and customer-reported bugs
• Write technical documentation for APIs and system architecture
• Attend daily standups and sprint planning meetings
• Collaborate with product managers to refine requirements and estimate effort
• Deploy and monitor applications using CI/CD pipelines
• Optimise database queries and improve application performance
• Conduct technical interviews and assess engineering candidates
• Mentor junior developers through pair programming sessions
• Present technical decisions and architecture proposals to stakeholders`,
    },
    'hr': {
      title: 'HR Executive',
      industry: 'Tech',
      description: `We are looking for an HR Executive to support our People team.

Key Responsibilities:
• Manage end-to-end recruitment process including job postings, screening, and interviews
• Process payroll, leave applications, and employee benefits administration
• Conduct employee onboarding and orientation programmes
• Handle employee relations issues, grievances, and provide counselling
• Maintain and update HR information systems and employee records
• Coordinate training and development programmes for staff
• Plan and execute employee engagement activities and events
• Prepare HR reports and analytics for management review
• Ensure compliance with Singapore Employment Act and MOM regulations
• Facilitate performance review cycles and manage appraisal documentation
• Develop and update company policies and employee handbook
• Manage exit interviews and offboarding processes`,
    },
    'default': {
      title: 'Operations Associate',
      industry: 'Logistics',
      description: `We are hiring an Operations Associate for our Singapore office.

Responsibilities:
• Process and track daily orders through internal management systems
• Coordinate with warehouse teams to ensure timely order fulfilment
• Respond to customer enquiries via email and phone
• Generate daily operational reports and KPI dashboards
• Manage inventory records and conduct periodic stock reconciliation
• Liaise with logistics partners and delivery providers
• Schedule and coordinate team meetings and cross-department syncs
• Handle data entry and maintain accurate records in the CRM
• Assist in planning and executing process improvement initiatives
• Support procurement by obtaining quotes and managing vendor relationships
• Prepare training materials and onboard new team members
• Escalate and resolve operational exceptions and service disruptions`,
    },
  },
  // LinkedIn-style URLs
  linkedin: {
    'marketing': null,  // will fall through to indeed
    'analyst': null,
    'engineer': null,
    'hr': null,
    'default': null,
  },
}

/**
 * Given a URL, try to match a sample job listing for demo purposes.
 * Returns { title, industry, description } or null
 */
export function matchSampleFromUrl(url) {
  const lower = url.toLowerCase()
  const isIndeed = lower.includes('indeed')
  const isLinkedIn = lower.includes('linkedin')

  if (!isIndeed && !isLinkedIn) return SAMPLE_JOB_LISTINGS.indeed['default']

  // Try to determine role from URL keywords
  const urlText = lower.replace(/[^a-z0-9 ]/g, ' ')
  if (urlText.includes('market') || urlText.includes('social media') || urlText.includes('content'))
    return SAMPLE_JOB_LISTINGS.indeed['marketing']
  if (urlText.includes('analyst') || urlText.includes('business') || urlText.includes('finance') || urlText.includes('data'))
    return SAMPLE_JOB_LISTINGS.indeed['analyst']
  if (urlText.includes('engineer') || urlText.includes('developer') || urlText.includes('software') || urlText.includes('frontend') || urlText.includes('backend'))
    return SAMPLE_JOB_LISTINGS.indeed['engineer']
  if (urlText.includes('hr') || urlText.includes('human resource') || urlText.includes('recruit') || urlText.includes('people'))
    return SAMPLE_JOB_LISTINGS.indeed['hr']

  return SAMPLE_JOB_LISTINGS.indeed['default']
}

/**
 * Parse a raw job description into an array of task strings.
 */
function extractTasksFromDescription(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const tasks = []

  for (const line of lines) {
    // Match bullet points (•, -, *, numbered)
    const cleaned = line.replace(/^[\s•\-\*\d.)\]]+\s*/, '').trim()
    if (cleaned.length < 8) continue           // skip very short lines
    if (cleaned.length > 120) continue          // skip paragraph-length lines
    // Skip section headers
    if (/^(responsibilities|requirements|qualifications|about|we are|key |main |job )/i.test(cleaned)) continue
    if (/^(the role|the candidate|the ideal|this is|you will|our team)/i.test(cleaned)) continue
    // If it looks like a task/responsibility, keep it
    if (line.match(/^[\s•\-\*\d.)]+/) || cleaned.match(/^(manage|create|develop|coordinate|prepare|conduct|support|assist|handle|maintain|plan|monitor|perform|write|design|build|review|ensure|facilitate|respond|process|track|generate|analyse|analyze|identify|lead|collaborate|implement|configure|research|evaluate|test|deploy|optimize|optimise)/i)) {
      tasks.push(cleaned)
    }
  }

  // Deduplicate
  const unique = [...new Set(tasks)]
  return unique.slice(0, 14) // cap at 14 tasks for the prototype
}

/**
 * Classify a task and generate an AI impact detail string.
 */
function classifyAndDetail(taskName) {
  const category = classifyCustomTask(taskName)
  const detail = CUSTOM_TASK_DETAILS[category]
  return { category, detail }
}

/**
 * Parse a job listing (text) and return a full role object
 * compatible with the `roles` data structure.
 */
export function parseJobListing(title, industry, description) {
  const rawTasks = extractTasksFromDescription(description)
  if (rawTasks.length === 0) return null

  const taskPool = rawTasks.map((name, i) => ({
    id: `jl-${i + 1}`,
    name,
    defaultFrequency: i < 4 ? 'daily' : i < 9 ? 'weekly' : 'rarely',
  }))

  const year1 = { automatable: [], augmented: [], human: [] }
  const year5 = { automatable: [], augmented: [], human: [] }

  for (const task of taskPool) {
    const { category, detail } = classifyAndDetail(task.name)
    year1[category].push({ id: task.id, detail })
  }

  // Year5: shift some augmented to automatable
  for (const task of taskPool) {
    const { category, detail } = classifyAndDetail(task.name)
    if (category === 'augmented' && year5.automatable.length < 4) {
      year5.automatable.push({ id: task.id, detail: 'Fully automated after 5 years of AI advancement.' })
    } else if (category === 'automatable') {
      year5.automatable.push({ id: task.id, detail: 'Fully automated with near-zero human input required.' })
    } else if (category === 'augmented') {
      year5.augmented.push({ id: task.id, detail })
    } else {
      year5.human.push({ id: task.id, detail: 'Even more critical as routine work disappears — this IS the job.' })
    }
  }

  const humanPct = Math.round((year1.human.length / taskPool.length) * 100)
  const clarityScore = Math.min(95, Math.max(45, 40 + humanPct + year1.augmented.length * 3))

  // Generate 3 moves from the human/augmented tasks
  const humanTasks = taskPool.filter(t => classifyCustomTask(t.name) === 'human')
  const augTasks = taskPool.filter(t => classifyCustomTask(t.name) === 'augmented')
  const moveSources = [...humanTasks, ...augTasks].slice(0, 3)

  const moveTemplates = [
    { number: '01', prefix: 'Own and deepen your expertise in', why: 'As AI handles routine work, this task becomes your most defensible asset. Invest in making it your signature strength.' },
    { number: '02', prefix: 'Become the go-to person for', why: 'AI will augment this task — meaning someone still needs to direct, validate, and apply the output. Be that person.' },
    { number: '03', prefix: 'Build strategic depth around', why: 'This task requires judgment, relationships, or creativity that AI cannot replicate. It defines the future shape of your role.' },
  ]

  const moves = moveSources.map((task, i) => ({
    number: moveTemplates[i]?.number || `0${i + 1}`,
    title: `${moveTemplates[i]?.prefix || 'Focus on'} ${task.name.toLowerCase()}`,
    why: moveTemplates[i]?.why || 'This task represents a key area where your human skills create irreplaceable value.',
    linkedTaskId: task.id,
    linkedTaskName: task.name,
    course: {
      name: 'AI & Digital Skills for Professionals',
      provider: 'SkillsFuture Singapore',
      duration: '4–8 weeks · Part-time',
      skillsFuture: true,
    },
  }))

  // Pad moves if fewer than 3
  while (moves.length < 3) {
    moves.push({
      number: `0${moves.length + 1}`,
      title: 'Build your strategic communication skills',
      why: 'As AI handles execution, the ability to communicate decisions, persuade stakeholders, and lead becomes your core value.',
      linkedTaskId: taskPool[0]?.id || 'jl-1',
      linkedTaskName: taskPool[0]?.name || 'General',
      course: { name: 'Business Communication with AI', provider: 'SMU Academy', duration: '4 weeks · Online', skillsFuture: true },
    })
  }

  const roleObj = {
    title: title || 'Custom Role',
    industry: industry || 'General',
    taskPool,
    aiAnalysis: { year1, year5 },
    moves,
    clarityScore,
    summaryInsight: `${year1.augmented.length} of your tasks will be augmented within 2 years — but your ${year1.human.length} highly-human tasks become more valuable, not less.`,
  }

  return roleObj
}

let dynamicRoleCounter = 0

/**
 * Register a parsed role into the global `roles` object.
 * Returns the generated role key.
 */
export function addDynamicRole(roleObj) {
  dynamicRoleCounter++
  const key = `dynamic-${dynamicRoleCounter}`
  roles[key] = roleObj
  return key
}
