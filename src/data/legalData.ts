import { University, CaseLaw, BareAct, QuizQuestion, BlogPost } from "../types";

export const UNIVERSITIES: University[] = [
  {
    id: "mumbai-univ",
    name: "Mumbai University",
    shortName: "MU",
    location: "Mumbai, Maharashtra",
    description: "One of the oldest and premier universities in India, offering 3-Year & 5-Year LLB degrees.",
    semesters: 6
  },
  {
    id: "delhi-univ",
    name: "Delhi University (Faculty of Law)",
    shortName: "DU",
    location: "New Delhi, Delhi",
    description: "The prestigious Faculty of Law known for producing top supreme court judges and legal scholars.",
    semesters: 6
  },
  {
    id: "glc-mumbai",
    name: "Government Law College, Mumbai",
    shortName: "GLC",
    location: "Mumbai, Maharashtra",
    description: "Established in 1855, the oldest law school in Asia, affiliated with Mumbai University.",
    semesters: 6
  },
  {
    id: "ils-pune",
    name: "ILS Law College, Pune",
    shortName: "ILS",
    location: "Pune, Maharashtra",
    description: "A premier legal institution known for its stellar academic research and mooting environment.",
    semesters: 6
  },
  {
    id: "bhu",
    name: "Banaras Hindu University (Faculty of Law)",
    shortName: "BHU",
    location: "Varanasi, Uttar Pradesh",
    description: "Offering deep traditional and modern legal insights in the holy city of Varanasi.",
    semesters: 6
  },
  {
    id: "symbiosis-pune",
    name: "Symbiosis Law School, Pune",
    shortName: "SLS",
    location: "Pune, Maharashtra",
    description: "A highly-rated private university offering world-class corporate and legal exposure.",
    semesters: 10
  },
  {
    id: "nlu-delhi",
    name: "National Law University, Delhi",
    shortName: "NLUD",
    location: "New Delhi, Delhi",
    description: "A premier autonomous law school offering integrated five-year B.A. LLB (Hons.) and PG research.",
    semesters: 10
  },
  {
    id: "nlu-mumbai",
    name: "Maharashtra National Law University, Mumbai",
    shortName: "MNLUM",
    location: "Mumbai, Maharashtra",
    description: "A top-tier national university established to promote advanced legal education in Mumbai.",
    semesters: 10
  }
];

export const SUBJECT_TOPICS: { [subjectId: string]: { syllabus: string[]; topics: string[]; notes: string[]; questions: string[] } } = {
  "contracts-1": {
    syllabus: [
      "Unit I: General Principles of Contract (Sections 1-75 of the Indian Contract Act, 1872)",
      "Unit II: Offer, Acceptance, Consideration, and Capacity to Contract",
      "Unit III: Free Consent, Void Agreements, Contingent and Quasi-Contracts",
      "Unit IV: Discharge and Remedies for Breach of Contract",
      "Unit V: Specific Relief Act, 1963 (Selected sections)"
    ],
    topics: [
      "Definition and formation of Contract",
      "Doctrine of Consideration & Privity of Contract",
      "Coercion, Undue Influence, Fraud, and Misrepresentation",
      "Consequences of Breach & Liquidated Damages (Sec 73-74)",
      "Quasi-Contracts and Unjust Enrichment"
    ],
    notes: [
      "Standard Form Contracts and Boilerplate terms",
      "The impact of minors entering into legal covenants (Mohori Bibee case)",
      "Understanding Consideration and its legal exceptions in India",
      "Remedies for Breach: Damages vs Specific Performance",
      "The role of public policy in agreements in restraint of trade"
    ],
    questions: [
      "Examine critically the rule that an agreement without consideration is void. What are the exceptions? (12 Marks)",
      "Discuss the law relating to minors' agreements in India with special reference to Mohori Bibee v. Dharmodas Ghose. (12 Marks)",
      "Differentiate between liquidated damages and penalty under section 74 of the Indian Contract Act. (8 Marks)",
      "What is free consent? Explain the distinction between Coercion and Undue Influence. (12 Marks)"
    ]
  },
  "consti-1": {
    syllabus: [
      "Unit I: Historical Background & Preamble to the Constitution of India",
      "Unit II: Citizenship (Part II) and Definition of State (Article 12)",
      "Unit III: Fundamental Rights: Equality and Freedoms (Articles 14, 19, 21)",
      "Unit IV: Freedom of Religion and Cultural/Educational Rights (Articles 25-30)",
      "Unit V: Constitutional Remedies (Article 32 & 226)"
    ],
    topics: [
      "The Definition of State under Article 12",
      "The Test of Reasonable Classification under Article 14",
      "The Expanded Horizon of Article 21 (Right to Life)",
      "The Doctrine of Basic Structure (Kesavananda Bharati)",
      "The Interplay between Fundamental Rights and Directive Principles"
    ],
    notes: [
      "Landmark Expansion of Article 21 and Golden Triangle",
      "Detailed Guide to Constitutional Writs in India",
      "Understanding Judicial Review and the Ninth Schedule",
      "Freedom of Speech & Expression: Reasonable Restrictions (Art 19(2))",
      "The concept of Secularism under Indian Constitutional Jurisprudence"
    ],
    questions: [
      "Explain the concept of 'State' under Article 12 of the Constitution. Is a public sector bank a State? (12 Marks)",
      "Critically evaluate the 'Procedure Established by Law' vs 'Due Process of Law' in the context of Maneka Gandhi v. Union of India. (12 Marks)",
      "Write notes on: (a) Writ of Habeas Corpus, (b) Writ of Quo Warranto. (8 Marks)",
      "Explain the 'Doctrine of Basic Structure' as propounded in the Kesavananda Bharati case. (12 Marks)"
    ]
  },
  "torts": {
    syllabus: [
      "Unit I: Definition, Nature, Scope, and Elements of Law of Torts",
      "Unit II: General Defences (Volenti non fit injuria, Necessity, Act of God)",
      "Unit III: Vicarious Liability and State Liability in Torts",
      "Unit IV: Specific Torts: Negligence, Nuisance, Defamation, Trespass",
      "Unit V: Strict Liability, Absolute Liability, and Consumer Protection Act"
    ],
    topics: [
      "Distinction between Tort, Crime, and Breach of Contract",
      "Damnum Sine Injuria & Injuria Sine Damnum",
      "The Principle of Absolute Liability (MC Mehta case)",
      "Vicarious Liability of the State: Sovereign Immunity",
      "Defamation: Libel and Slander with Indian Context"
    ],
    notes: [
      "Unpacking Strict Liability vs Absolute Liability",
      "Sovereign Immunity: From Kasturilal to Vidyawati",
      "Essentials of Negligence and Res Ipsa Loquitur",
      "Nuisance: Public vs Private and Remedies available",
      "Consumer Rights under the Consumer Protection Act, 2019"
    ],
    questions: [
      "Distinguish between 'Damnum Sine Injuria' and 'Injuria Sine Damnum' with the help of decided cases. (12 Marks)",
      "Explain the rule of strict liability established in Rylands v. Fletcher. How has it been modified into Absolute Liability in India? (12 Marks)",
      "Explain 'Vicarious Liability'. To what extent is the master liable for the tortious acts of his servant? (12 Marks)",
      "What is Negligence? Explain the doctrine of 'Res Ipsa Loquitur' with illustrations. (12 Marks)"
    ]
  },
  "crimes-1": {
    syllabus: [
      "Unit I: General Principles of Criminal Liability (Mens Rea and Actus Reus)",
      "Unit II: General Exceptions under BNS (Bhartiya Nyaya Sanhita) - Private Defence, Insanity",
      "Unit III: Abetment, Criminal Conspiracy, and Attempt",
      "Unit IV: Offences against Human Body (Culpable Homicide vs Murder)",
      "Unit V: Offences against Property (Theft, Extortion, Robbery, Dacoity)"
    ],
    topics: [
      "Mens Rea in Indian Criminal Law",
      "Private Defence: Scope and limitations under BNS",
      "Distinction between Culpable Homicide and Murder",
      "The new nomenclature under Bharatiya Nyaya Sanhita (BNS) 2023",
      "The Offence of Criminal Conspiracy"
    ],
    notes: [
      "Comparative analysis of BNS 2023 vs IPC 1860",
      "Right of Private Defence of Body and Property",
      "Insanity as a General Exception: McNaughten's Rules in BNS",
      "Kidnapping vs Abduction under BNS provisions",
      "The offense of Cheating and Criminal Breach of Trust"
    ],
    questions: [
      "Discuss the principle of 'Mens Rea'. Is there any exception to this principle in statutory offenses? (12 Marks)",
      "Distinguish clearly between Culpable Homicide (Section 100/101 BNS) and Murder (Section 103 BNS) with relevant case laws. (12 Marks)",
      "When can a plea of insanity be successfully taken under BNS? Explain the test. (12 Marks)",
      "Write a critical essay on the newly enacted Bharatiya Nyaya Sanhita (BNS), 2023. (12 Marks)"
    ]
  }
};

export const CASE_LAWS: CaseLaw[] = [
  {
    id: "kesavananda-bharati",
    title: "Kesavananda Bharati Sripadagalvaru v. State of Kerala",
    citation: "(1973) 4 SCC 225",
    court: "Supreme Court of India (13-judge bench)",
    year: 1973,
    keywords: ["Basic Structure", "Constitutional Amendment", "Judicial Review", "Article 368"],
    facts: "The head of a Hindu mutt, Kesavananda Bharati, challenged the Kerala government's attempts to impose restrictions on the management of his religious property under land reform laws. He questioned the validity of three Constitutional Amendments (24th, 25th, and 29th) which gave Parliament unlimited power to amend any part of the Constitution, including Fundamental Rights.",
    issues: "1. What is the scope of Parliament's power to amend the Constitution under Article 368?\n2. Can Parliament amend the Fundamental Rights of citizens?\n3. What is the constitutional validity of the 24th, 25th, and 29th Amendments?",
    judgement: "By a thin 7-6 majority, the Supreme Court ruled that while Parliament has wide powers to amend the Constitution, including the Fundamental Rights, it cannot amend or alter the 'Basic Structure' or basic features of the Constitution.\n\nSeveral Supreme Court judges listed features that constitute the basic structure, such as Supremacy of the Constitution, Republican and Democratic form of government, Secular character, Separation of Powers, and Federalism.",
    ratio: "The power to amend under Article 368 does not include the power to alter the basic structure, framework, or essential features of the Indian Constitution.",
    importantPoints: [
      "Propounded the landmark 'Doctrine of Basic Structure'.",
      "Saved Indian Democracy from absolute Parliamentary dominance.",
      "The longest hearing in Supreme Court history, spanning 68 days.",
      "Reversed the Golaknath case which held that Parliament cannot amend fundamental rights."
    ],
    relatedCases: ["Golaknath v. State of Punjab (1967)", "Minerva Mills v. Union of India (1880)", "Indira Gandhi v. Raj Narain (1975)"]
  },
  {
    id: "maneka-gandhi",
    title: "Maneka Gandhi v. Union of India",
    citation: "(1978) 1 SCC 248",
    court: "Supreme Court of India (7-judge bench)",
    year: 1978,
    keywords: ["Article 21", "Due Process", "Personal Liberty", "Passport Act", "Natural Justice"],
    facts: "Maneka Gandhi's passport was impounded by the Regional Passport Officer, New Delhi, in 'public interest' under Section 10(3)(c) of the Passport Act, 1967. She was not given any reasons for the impoundment, nor was she given a pre-decisional or post-decisional hearing, violating principles of natural justice.",
    issues: "1. Whether the Right to Travel Abroad is part of the 'Personal Liberty' under Article 21?\n2. Whether the Passport Act, 1967 violates Article 14, 19, and 21?\n3. Whether the principles of natural justice can be overridden by a statutory provision?",
    judgement: "The Supreme Court held that the Right to Travel Abroad is an essential part of 'Personal Liberty' under Article 21. The Court ruled that any procedure established by law under Article 21 must be 'just, fair, and reasonable' and not arbitrary, fanciful, or oppressive.\n\nThis effectively introduced the American concept of 'Substantive Due Process' into Indian constitutional jurisprudence.",
    ratio: "Procedure under Article 21 must be fair, just, and reasonable, incorporating the principles of Natural Justice (Audi Alteram Partem). Articles 14, 19, and 21 are not mutually exclusive but form a unified Golden Triangle.",
    importantPoints: [
      "Transformed Article 21 into the most expansive fundamental right.",
      "Introduced 'Due Process' into India, supplementing 'Procedure established by law'.",
      "Held that there is an inseparable connection between Articles 14, 19, and 21.",
      "Emphasized that natural justice principles apply to administrative actions."
    ],
    relatedCases: ["A.K. Gopalan v. State of Madras (1950)", "Kharak Singh v. State of UP (1963)"]
  },
  {
    id: "dk-basu",
    title: "D.K. Basu v. State of West Bengal",
    citation: "AIR 1997 SC 610",
    court: "Supreme Court of India",
    year: 1997,
    keywords: ["Custodial Violence", "Arrest Guidelines", "Human Rights", "Article 21", "Article 22"],
    facts: "The Executive Chairman of Legal Aid Services, West Bengal, wrote a letter pointing out several instances of brutal custodial violence, torture, and deaths in police custody. The letter was treated as a Public Interest Litigation (PIL).",
    issues: "How can the court prevent and check torture and deaths in police custody and protect the basic human rights of arrestees?",
    judgement: "The Supreme Court issued 11 mandatory guidelines (often called D.K. Basu guidelines) to be followed by the police during arrest, detention, and interrogation of any person. These guidelines include preparing a memo of arrest, notifying family members, conducting medical examinations, and displaying clear identification tags.",
    ratio: "Custodial torture is a severe violation of human dignity and Article 21. Police personnel are bound to adhere strictly to procedural guidelines during arrests to safeguard liberty.",
    importantPoints: [
      "Laid down 11 mandatory guidelines for arrest and detention.",
      "Declared custodial death/torture as an absolute breach of Article 21.",
      "Established the right to have a friend or family member informed of the arrest.",
      "Paved the way for major amendments in the CrPC (now BNSS)."
    ],
    relatedCases: ["Nilabati Behera v. State of Orissa (1993)", "Sheela Barse v. State of Maharashtra (1983)"]
  },
  {
    id: "lalita-kumari",
    title: "Lalita Kumari v. Govt. of UP",
    citation: "(2014) 2 SCC 1",
    court: "Supreme Court of India (Constitution Bench)",
    year: 2014,
    keywords: ["FIR Registration", "Cognizable Offence", "Section 154 CrPC", "Preliminary Inquiry"],
    facts: "A petition was filed on behalf of a minor girl, Lalita Kumari, who was kidnapped. Her father went to register an FIR but the police did not take action. When they finally registered an FIR, no efforts were made to rescue her.",
    issues: "Whether Section 154 of the CrPC (now BNSS Sec 173) makes registration of FIR mandatory upon receipt of information disclosing a cognizable offense?",
    judgement: "The Constitution Bench ruled that the registration of an FIR is MANDATORY if the information discloses the commission of a cognizable offense, and no preliminary inquiry is permissible in such a situation. If the information does not disclose a cognizable offense, a preliminary inquiry can be conducted only to ascertain if a cognizable offense is disclosed.",
    ratio: "The use of the word 'shall' in Section 154(1) of CrPC leaves no room for police discretion. Registration of FIR is compulsory for cognizable crimes.",
    importantPoints: [
      "Made FIR mandatory for all cognizable offenses.",
      "Listed categories of cases where a preliminary inquiry is permitted (e.g., matrimonial disputes, medical negligence, corruption, commercial offenses).",
      "Enforced that a preliminary inquiry must be completed within 7 to 15 days.",
      "Highly cited in everyday criminal jurisprudence and police procedures."
    ],
    relatedCases: ["State of Haryana v. Bhajan Lal (1992)", "Ramesh Kumari v. State (NCT of Delhi) (2006)"]
  }
];

export const BARE_ACTS: BareAct[] = [
  {
    id: "constitution",
    title: "The Constitution of India, 1950",
    shortTitle: "Constitution",
    enactmentYear: 1950,
    chapters: [
      {
        id: "part-3",
        number: "Part III",
        title: "Fundamental Rights",
        sections: [
          {
            id: "art-12",
            number: "Article 12",
            title: "Definition of State",
            content: "In this part, unless the context otherwise requires, 'the State' includes the Government and Parliament of India and the Government and the Legislature of each of the States and all local or other authorities within the territory of India or under the control of the Government of India.",
            illustration: "Local municipalities, statutory bodies like ONGC, LIC, and state electricity boards are considered 'State' under Article 12, allowing citizens to file writs against them for fundamental rights violations."
          },
          {
            id: "art-14",
            number: "Article 14",
            title: "Equality before law",
            content: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
            illustration: "Ensures both equality of opportunity and prohibits discriminatory classification unless based on an intelligible differentia with a rational nexus to the object."
          },
          {
            id: "art-19",
            number: "Article 19",
            title: "Protection of certain rights regarding freedom of speech, etc.",
            content: "All citizens shall have the right—\n(a) to freedom of speech and expression;\n(b) to assemble peaceably and without arms;\n(c) to form associations or unions;\n(d) to move freely throughout the territory of India;\n(e) to reside and settle in any part of the territory of India; and\n(g) to practise any profession, or to carry on any occupation, trade or business.",
            illustration: "Includes freedom of the press, commercial speech, and the right to keep silent. These are subject to reasonable restrictions under Art 19(2)."
          },
          {
            id: "art-21",
            number: "Article 21",
            title: "Protection of life and personal liberty",
            content: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
            illustration: "Interpreted to include Right to Clean Environment, Right to Privacy, Right to Medical Care, and Right to Speedy Trial."
          },
          {
            id: "art-32",
            number: "Article 32",
            title: "Remedies for enforcement of rights conferred by this Part",
            content: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. The Supreme Court shall have power to issue directions or orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari.",
            illustration: "Dr. B.R. Ambedkar termed Article 32 as the 'Heart and Soul' of the Constitution because it makes Fundamental Rights real."
          }
        ]
      }
    ]
  },
  {
    id: "bns",
    title: "Bharatiya Nyaya Sanhita, 2023",
    shortTitle: "BNS",
    enactmentYear: 2023,
    chapters: [
      {
        id: "bns-ch-6",
        number: "Chapter VI",
        title: "Of Offences Affecting the Human Body",
        sections: [
          {
            id: "bns-sec-100",
            number: "Section 100",
            title: "Culpable Homicide",
            content: "Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.",
            illustration: "A lays sticks and turf over a pit, with the intention of causing death. Z, believing the ground to be firm, treads on it, falls in and is killed. A has committed the offence of culpable homicide."
          },
          {
            id: "bns-sec-103",
            number: "Section 103",
            title: "Murder",
            content: "Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or done with the knowledge that it is so imminently dangerous that it must, in all probability, cause death.",
            illustration: "A, without any excuse, fires a loaded cannon into a crowd of persons and kills one of them. A is guilty of murder, although he may not have had a premeditated design against any particular individual."
          }
        ]
      }
    ]
  },
  {
    id: "contract-act",
    title: "The Indian Contract Act, 1872",
    shortTitle: "Contract Act",
    enactmentYear: 1872,
    chapters: [
      {
        id: "contract-ch-1",
        number: "Chapter I",
        title: "Of the Communication, Acceptance and Revocation of Proposals",
        sections: [
          {
            id: "contract-sec-2",
            number: "Section 2",
            title: "Interpretation-clause (Definitions)",
            content: "In this Act the following words and expressions are used in the following senses, unless a contrary intention appears from the context:\n(a) When one person signifies to another his willingness to do or to abstain from doing anything, with a view to obtaining the assent of that other to such act or abstinence, he is said to make a proposal;\n(b) When the person to whom the proposal is made signifies his assent thereto, the proposal is said to be accepted. A proposal, when accepted, becomes a promise;\n(h) An agreement enforceable by law is a contract;",
            illustration: "A offers to sell his watch to B for Rs. 500. B agrees. This agreement, being enforceable by law, is a contract."
          },
          {
            id: "contract-sec-10",
            number: "Section 10",
            title: "What agreements are contracts",
            content: "All agreements are contracts if they are made by the free consent of parties competent to contract, for a lawful consideration and with a lawful object, and are not hereby expressly declared to be void.",
            illustration: "An agreement between minors is not a contract because minors are not competent to contract under Section 11."
          }
        ]
      }
    ]
  }
];

export const DAILY_QUIZZES: QuizQuestion[] = [
  {
    id: "q1",
    question: "Under the Bharatiya Nyaya Sanhita (BNS) 2023, culpable homicide is defined under which section?",
    options: ["Section 100", "Section 103", "Section 300", "Section 299"],
    correctOptionIndex: 0,
    explanation: "Under the newly enacted Bharatiya Nyaya Sanhita (BNS) 2023, Culpable Homicide is defined under Section 100, which replaces Section 299 of the Indian Penal Code (IPC), 1860.",
    subject: "Criminal Law"
  },
  {
    id: "q2",
    question: "Which of the following writs literally means 'To have the body of'?",
    options: ["Mandamus", "Habeas Corpus", "Certiorari", "Quo Warranto"],
    correctOptionIndex: 1,
    explanation: "Habeas Corpus is a Latin term which literally translates to 'To have the body of'. It is a constitutional remedy used to protect individuals against illegal detention.",
    subject: "Constitutional Law"
  },
  {
    id: "q3",
    question: "The doctrine of 'Basic Structure' was established by the Supreme Court of India in which case?",
    options: ["Golaknath v. State of Punjab", "Kesavananda Bharati v. State of Kerala", "Minerva Mills v. Union of India", "Indira Gandhi v. Raj Narain"],
    correctOptionIndex: 1,
    explanation: "The historic doctrine of 'Basic Structure' was propounded by a 13-judge bench of the Supreme Court in the landmark case of Kesavananda Bharati v. State of Kerala, 1973.",
    subject: "Constitutional Law"
  },
  {
    id: "q4",
    question: "An agreement enforceable by law is a contract. This definition is stated under which section of the Indian Contract Act, 1872?",
    options: ["Section 2(a)", "Section 2(d)", "Section 2(h)", "Section 10"],
    correctOptionIndex: 2,
    explanation: "Section 2(h) of the Indian Contract Act, 1872 explicitly defines that 'an agreement enforceable by law is a contract'.",
    subject: "Contract Law"
  },
  {
    id: "q5",
    question: "In which case did the Supreme Court lay down 11 mandatory guidelines regarding the arrest of individuals?",
    options: ["D.K. Basu v. State of West Bengal", "Lalita Kumari v. Govt. of UP", "A.R. Antulay v. R.S. Nayak", "Prem Shankar Shukla v. Delhi Administration"],
    correctOptionIndex: 0,
    explanation: "D.K. Basu v. State of West Bengal, 1997 is the landmark case where the Supreme Court prescribed 11 mandatory procedures to protect the rights of arrestees.",
    subject: "Criminal Procedure"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-bns-vs-ipc",
    title: "Understanding Bharatiya Nyaya Sanhita (BNS) 2023: Key Changes from IPC 1860",
    excerpt: "A comprehensive guide analyzing the structural and material changes brought by the new Bharatiya Nyaya Sanhita (BNS) in comparison with the IPC.",
    content: `### Introduction to BNS, 2023
The criminal justice system in India underwent a historic transformation on July 1, 2024, with the enforcement of three new laws: the **Bharatiya Nyaya Sanhita (BNS), 2023**, the **Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023**, and the **Bharatiya Sakshya Adhiniyam (BSA), 2023**. These legislative acts replaced the colonial-era Indian Penal Code (IPC), 1860, Code of Criminal Procedure (CrPC), 1973, and Indian Evidence Act, 1872.

In this article, we outline the primary changes introduced in the substantive criminal code: the **Bharatiya Nyaya Sanhita (BNS)**.

---

### 1. Structural Reorganization
The BNS has consolidated the 511 sections of the IPC into **358 sections**. Several chapters have been renamed, sections have been renumbered to follow a more logical pattern (e.g., placing offenses against women and children in earlier chapters), and redundant colonial terminology has been purged.

*   **Offenses Against Human Body**: Formerly placed in Chapter XVI of IPC starting at Section 299, these are now found in **Chapter VI** starting at Section 100.
*   **Offenses Against Women & Children**: Now prioritized in **Chapter V** (Sections 63-99).

---

### 2. Definition of Culpable Homicide and Murder
The core definition of culpable homicide and murder remains structurally identical, but the sections have been dramatically changed:
*   **Culpable Homicide** is now under **Section 100** (previously Sec 299).
*   **Murder** is now under **Section 103** (previously Sec 300).
*   **Attempt to Murder** is now defined under **Section 109** (previously Sec 307).

---

### 3. Inclusion of Community Service as a Punishment
For the first time in Indian statutory history, **Community Service** has been recognized as a formal, minor form of punishment under Section 4(f) of the BNS. It can be awarded for minor offenses such as:
1.  Attempt to commit suicide to intimidate a public servant.
2.  Theft of property valued under Rs. 5,000 (upon restitution).
3.  Public misconduct by a drunken person.
4.  Defamation.

---

### 4. Codification of Organized Crime & Terrorism
The IPC did not have a general, country-wide statutory definition of terrorism or organized crime, relying instead on special statutes like UAPA or state-specific laws (MCOCA).
*   **Organized Crime**: Section 111 of BNS defines and criminalizes syndicate-based illegal activities.
*   **Terrorist Act**: Section 113 of BNS formally defines terrorism within the general penal code, covering acts endangering the sovereignty, unity, and economic security of India.

---

### Conclusion for Law Students
Adapting to the new BNS section numbers is the highest priority for law students and practitioners preparing for judicial services or semester examinations. LawBuddy is fully updated to map these new sections and compare them with corresponding legacy IPC sections.`,
    category: "New Criminal Laws",
    author: {
      name: "Adv. Vijay Tiwari",
      role: "Senior Legal Educator",
      avatarUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=120"
    },
    tags: ["BNS 2023", "Criminal Law", "IPC 1860", "Legal Reform"],
    date: "July 2, 2026",
    readTime: "5 min read",
    seoTitle: "Bharatiya Nyaya Sanhita vs Indian Penal Code: Complete Comparative Analysis",
    seoDescription: "Examine the vital differences between BNS 2023 and IPC 1860. Learn about new section numbers, community service, and organized crime codification."
  },
  {
    id: "blog-crack-judiciary",
    title: "How to Crack State Judicial Services Exams (PCS-J) in Your First Attempt",
    excerpt: "An expert blueprint to map your preparation strategy, optimize your bare act reading habits, and practice answer writing for judicial exams.",
    content: `### Planning Your Judiciary Journey
State Judicial Services Exams are among the most competitive legal exams in India. They require a rigorous, disciplined approach. The key to cracking them is not just memorization, but developing a deep legal acumen and masterly answer-writing skills.

---

### 1. Master the Bare Acts
Bare Acts are your Bible. Over 70% of questions in Prelims are directly bare-act based.
*   **Index Mastery**: You must remember the chapter and section index structure. It helps in rapid elimination of options.
*   **Read the Provisos and Illustrations**: Most application-based questions are derived directly from the statutory illustrations. Pay close attention to "provided that" conditions.
*   **New Laws Focus**: Since BNS, BNSS, and BSA are now fully in force, expect deep comparisons and direct sections from these newly codified statutes.

---

### 2. Formulate a Mock Strategy
Do not wait to finish the syllabus to start practicing MCQs.
*   Practice at least 50-100 MCQs daily.
*   Use LawBuddy's **Judiciary section** to practice interactive Daily Quizzes and mock exam patterns.
*   Keep a separate logbook for questions you answered incorrectly, detailing the relevant section or case law.

---

### 3. Mains Answer Writing Technique
Prelims is a screening test; your final selection depends entirely on Mains.
*   **Syllogistic Pattern**: Organize your answers in the **IRAC** model (Issue, Rule, Application, Conclusion).
*   **Stat statutory references clearly**: Always start with the section and act name.
*   **Cite Landmark & Recent Judgments**: A good answer has 1-2 historic landmark cases (e.g. Lalita Kumari) and 1 recent Supreme Court judgment of the current year.

With the proper guidance and persistent efforts, you can easily top the state judicial services. Keep studying!`,
    category: "Judiciary Prep",
    author: {
      name: "Hon'ble Retd. Judge S.K. Sharma",
      role: "Judiciary Advisory Council Member",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120"
    },
    tags: ["PCS-J", "Bare Acts", "Judiciary Exam", "Study Planner"],
    date: "June 28, 2026",
    readTime: "8 min read",
    seoTitle: "Complete Judiciary Exam Preparation Strategy: Prelims and Mains Blueprint",
    seoDescription: "Unlock the ultimate roadmap to clear Indian State Judicial Services (PCS-J) exams on your first attempt. Expert tips on bare acts and IRAC answer writing."
  }
];
