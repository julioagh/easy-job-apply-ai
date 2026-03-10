/**
 * generate_cv_v2.js
 * Template reutilizable para generación de CVs optimizados
 *
 * ESTILO: Calibri, navy/blue palette, section dividers, bullet points nativos
 * USO: node scripts/generate_cv_v2.js
 *
 * PERSONALIZACIÓN:
 *   1. Editar la sección CV_DATA más abajo con el contenido del CV
 *   2. Ajustar OUTPUT_PATH con el nombre del archivo final
 *   3. Ejecutar: node scripts/generate_cv_v2.js
 *
 * DEPENDENCIA: npm install docx (en el directorio del proyecto)
 * Versión: 1.0 | Creado: Marzo 2026
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, WidthType, LevelFormat, TabStopType, TabStopPosition,
} = require('docx');
const fs = require('fs');
const path = require('path');

// ─── CONFIGURACIÓN DE SALIDA ────────────────────────────────────────────────

const OUTPUT_PATH = path.join(__dirname, '../outputs/CV_Output.docx');

// ─── DATOS DEL CV (EDITAR AQUÍ) ─────────────────────────────────────────────

const CV_DATA = {

  // Encabezado personal
  name: "JULIO ALBERTO GONZALES HEREDIA",
  contact: "Lima, Peru  |  (+51) 992 755 873  |  jgonzales.sbs@gmail.com  |  linkedin.com/in/julioagh",

  // Summary: array de párrafos. Cada elemento es un array de {text, bold?, italics?}
  summary: [
    [
      { text: "Product Leader", bold: true },
      { text: " con 8+ años impulsando resultados en productos B2B y consumidor. Reemplaza este bloque con el summary optimizado para la posición objetivo." }
    ],
  ],

  // Sección de proyectos AI (dejar vacío [] si no aplica)
  ai_projects: [
    {
      name: "easy-job-apply-ai",
      subtitle: "AI-Powered Job Application Pipeline  |  0→1 · Bootstrapped · Python · LLMs · Claude API · YAML · pytest",
      bullets: [
        { label: "Problem:", text: " Descripción del problema resuelto." },
        { label: "Solution built:", text: " Descripción de la solución y arquitectura." },
        { label: "Metrics:", text: " 35+ applications processed · v2.0 iterated from real usage · full documentation" },
        { label: "Key learning:", text: " Aprendizaje principal del proyecto.", italics: true },
      ]
    },
    // Agregar más proyectos si aplica:
    // { name: "orgflow-diagnostic", subtitle: "...", bullets: [...] }
  ],

  // Experiencia laboral: array de roles
  experience: [
    {
      company: "LEAN OKR",
      location: "Lima, Peru (Remote)",
      role: "Independent Consultant — Change Management & Organizational Transformation",
      period: "Jan 2026 – Present",
      subtitle: null,
      bullets: [
        { text: "Advisory on operating model redesign and decision-making frameworks in bootstrapped, self-directed environment." },
        { text: "Async-first collaboration with distributed clients." },
      ]
    },
    {
      company: "BBVA PERU",
      location: "Lima, Peru",
      role: "Agile Coach Expert / Product Strategy & Transformation Lead",
      period: "Apr 2022 – Nov 2025",
      subtitle: "Products: Global Mobile (Glomo/BBVA app), Plin (digital wallet), Open Banking APIs, Gema (B2B mobile)",
      bullets: [
        { text: "Logro 1 con métricas cuantificadas." },
        { text: "Logro 2." },
        { text: "Logro 3." },
      ]
    },
    {
      company: "ENTEL PERU",
      location: "Lima, Peru",
      role: "Agile Coach / Product & Transformation Lead",
      period: "Oct 2018 – Feb 2022",
      subtitle: "Products: OTT Cell (Sweepstakes, Games, Subscriptions), B2B Wholesalers App, Digital Channels",
      bullets: [
        { label: "0→1 B2B:", text: " Descripción del producto 0→1 con métricas." },
        { text: "Otro logro." },
      ]
    },
    {
      company: "ENTEL PERU",
      location: "Lima, Peru",
      role: "Integration Architect",
      period: "May 2017 – Oct 2018",
      subtitle: null,
      bullets: [
        { text: "Diseño e implementación de integraciones. Adopción DevOps." }
      ]
    },
    {
      company: "HEWLETT PACKARD PERU",
      location: "Lima, Peru",
      role: "Technical Leader",
      period: "Sep 2010 – Jul 2015",
      subtitle: null,
      bullets: [
        { text: "One-Day Portability Project — 2.27M nuevos clientes en 6 meses. Reducción de packaging de 4h a 30min." }
      ]
    },
  ],

  // Competencias clave: array de líneas, cada una con array de {text, bold?}
  competencies: [
    [
      { text: "0→1 Product Development", bold: true },
      { text: "  |  AI-Native Products  |  LLMs · RAG · Agent-Based Systems  |  " },
      { text: "Customer Discovery", bold: true },
      { text: "  |  Hypothesis-Driven  |  MVP · Iteration" }
    ],
    [
      { text: "B2B SaaS Product Strategy", bold: true },
      { text: "  |  Product Discovery · Delivery  |  Roadmap  |  Cross-Functional Teams  |  OKRs · Flow Metrics" }
    ],
    [
      { text: "Bootstrapped Environments", bold: true },
      { text: "  |  Ambiguity Management  |  Async Collaboration  |  Small Teams (≤5)  |  Resource-Constrained Delivery" }
    ],
    [
      { text: "AI & Automation:", bold: true },
      { text: "  Claude API · LLM Prompt Engineering · Python · YAML · Embeddings · RAG · OpenAI API · Hugging Face · Pinecone" }
    ],
    [
      { text: "Technical Foundation:", bold: true },
      { text: "  Python · Java · Spring · SQL (advanced analytics) · APIs · Microservices · PostgreSQL · DevOps (CI/CD)  |  Figma · Design Sprint · Lean Inception" }
    ],
  ],

  // Educación y certificaciones: array de líneas
  education: [
    {
      institution: "Pontificia Universidad Católica del Perú (PUCP)",
      location: "Lima, Perú",
      degree: "Bachelor of Science in Computer Engineering  |  2007"
    }
  ],

  certifications: [
    { name: "AI+ Executive", detail: "AICerts  |  2025  — GenAI strategies, analytics, ROI; People Analytics & ML; Embeddings, Vector DBs, LLMOps (DataCamp, 82% in progress)" },
    { name: "Organization Design Certificate (ODC)", detail: "Org-ology  |  Dec 2025  — CODP Pathway: Organizational Architecture, Governance" },
    { name: "Strategy & Execution Specialist", detail: "UMAAN  |  Oct–Nov 2025  — Strategy & Execution Systems, OKR Management" },
    { name: "Agile & Product:", detail: "SAFe SPC  |  Scrum@Scale  |  Kanban Coaching Professional  |  CSM  |  CSPO  |  Certified Lean Inception Facilitator  |  Design Sprint Bootcamp" },
    { name: "Coaching:", detail: "Conscious Business Coach (CBC International — Fred Kofman)  |  Real LIFE Facilitator  |  Leadership Circle Profile" },
  ],

  // Idiomas
  languages: [
    { lang: "English", level: "Advanced (C1) — Strong reading/writing proficiency, actively developing conversational fluency" },
    { lang: "Spanish", level: "Native" },
  ],
};

// ─── CONSTANTES DE ESTILO (NO EDITAR) ───────────────────────────────────────

const FONT = "Calibri";
const C_NAME = "1F3864";
const C_SECTION = "1F4E79";
const C_DIVIDER = "2E75B6";
const C_AI = "1B5E20";
const C_BODY = "000000";
const C_SUBTLE = "555555";
const C_MUTED = "666666";
const PAGE_W = 12240;
const MARGIN = 1080;
const CONTENT_W = PAGE_W - 2 * MARGIN;

// ─── FUNCIONES DE UTILIDAD ────────────────────────────────────────────────────

const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C_DIVIDER, space: 1 } },
  spacing: { before: 60, after: 80 },
  children: []
});

const dividerThin = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB", space: 1 } },
  spacing: { before: 40, after: 60 },
  children: []
});

const sectionHeader = (text) => new Paragraph({
  spacing: { before: 200, after: 60 },
  children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, font: FONT, color: C_SECTION, allCaps: true })]
});

const spacer = (before = 80) => new Paragraph({ spacing: { before, after: 0 }, children: [] });

const mixedPara = (runs, opts = {}) => new Paragraph({
  spacing: { before: opts.before || 40, after: opts.after || 40 },
  alignment: opts.alignment || AlignmentType.LEFT,
  children: runs.map(r => new TextRun({
    text: r.text, bold: r.bold || false, italics: r.italics || false,
    size: r.size || 19, font: FONT, color: r.color || C_BODY,
  }))
});

const bodyPara = (text, opts = {}) => new Paragraph({
  spacing: { before: opts.before || 40, after: opts.after || 40 },
  children: [new TextRun({
    text, size: opts.size || 19, font: FONT,
    color: opts.color || C_BODY, bold: opts.bold || false, italics: opts.italics || false,
  })]
});

const bulletPara = (text, bold_prefix) => {
  const children = [];
  if (bold_prefix) {
    children.push(new TextRun({ text: bold_prefix, bold: true, size: 19, font: FONT }));
    children.push(new TextRun({ text, size: 19, font: FONT, color: C_BODY }));
  } else {
    children.push(new TextRun({ text, size: 19, font: FONT, color: C_BODY }));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 20, after: 20 },
    children
  });
};

const companyBlock = ({ company, location, role, period, subtitle, bullets }) => {
  const blocks = [];
  // Empresa + período
  blocks.push(new Paragraph({
    spacing: { before: 120, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
    children: [
      new TextRun({ text: company, bold: true, size: 20, font: FONT, color: C_SECTION }),
      new TextRun({ text: "  |  " + location, size: 19, font: FONT, color: C_SUBTLE }),
      new TextRun({ text: "\t" + period, size: 18, font: FONT, color: C_MUTED, italics: true }),
    ]
  }));
  // Rol
  blocks.push(new Paragraph({
    spacing: { before: 0, after: 40 },
    children: [new TextRun({ text: role, bold: true, size: 20, font: FONT, color: C_BODY })]
  }));
  // Subtitle (productos trabajados)
  if (subtitle) {
    blocks.push(bodyPara(subtitle, { before: 0, after: 30, italics: true, color: C_SUBTLE }));
  }
  // Bullets
  bullets.forEach(b => blocks.push(bulletPara(b.text, b.label || null)));
  return blocks;
};

// ─── CONSTRUCCIÓN DEL DOCUMENTO ──────────────────────────────────────────────

function buildDocument(data) {
  const children = [];

  // — ENCABEZADO —
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
    children: [new TextRun({ text: data.name, bold: true, size: 36, font: FONT, color: C_NAME, allCaps: true })]
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 20 },
    children: [new TextRun({ text: data.contact, size: 18, font: FONT, color: "444444" })]
  }));
  children.push(divider());

  // — SUMMARY —
  children.push(sectionHeader("Professional Summary"));
  data.summary.forEach((para, i) => {
    children.push(mixedPara(para, { before: i === 0 ? 60 : 40, after: 40 }));
  });
  children.push(spacer(20));
  children.push(divider());

  // — AI PRODUCT WORK —
  if (data.ai_projects && data.ai_projects.length > 0) {
    children.push(sectionHeader("AI Product Work — Independent Projects  (2025–Present)"));
    data.ai_projects.forEach((proj, pi) => {
      children.push(new Paragraph({
        spacing: { before: pi === 0 ? 80 : 60, after: 20 },
        children: [
          new TextRun({ text: proj.name, bold: true, size: 21, font: FONT, color: C_AI }),
          new TextRun({ text: "  —  " + proj.subtitle, size: 18, font: FONT, color: C_SUBTLE, italics: true }),
        ]
      }));
      proj.bullets.forEach(b => {
        children.push(mixedPara([
          ...(b.label ? [{ text: b.label, bold: true }] : []),
          { text: b.text, italics: b.italics || false },
        ], { before: b.label ? 30 : 20, after: 20 }));
      });
    });
    children.push(spacer(40));
    children.push(divider());
  }

  // — PROFESSIONAL EXPERIENCE —
  children.push(sectionHeader("Professional Experience"));
  data.experience.forEach((exp, i) => {
    companyBlock(exp).forEach(p => children.push(p));
    if (i < data.experience.length - 1) children.push(dividerThin());
  });
  children.push(spacer(40));
  children.push(divider());

  // — KEY COMPETENCIES —
  children.push(sectionHeader("Key Competencies"));
  data.competencies.forEach((line, i) => {
    children.push(mixedPara(line, { before: i === 0 ? 60 : 30, after: 30 }));
  });
  children.push(spacer(20));
  children.push(divider());

  // — EDUCATION & CERTIFICATIONS —
  children.push(sectionHeader("Education & Certifications"));
  data.education.forEach(edu => {
    children.push(new Paragraph({
      spacing: { before: 60, after: 20 },
      tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
      children: [
        new TextRun({ text: edu.institution, bold: true, size: 19, font: FONT }),
        new TextRun({ text: "\t" + edu.location, size: 18, font: FONT, color: C_MUTED }),
      ]
    }));
    children.push(bodyPara(edu.degree, { before: 0, after: 30 }));
  });
  data.certifications.forEach(cert => {
    children.push(mixedPara([
      { text: cert.name, bold: true },
      { text: "  |  " + cert.detail },
    ], { before: 20, after: 20 }));
  });
  children.push(spacer(20));
  children.push(divider());

  // — LANGUAGES —
  children.push(sectionHeader("Languages"));
  data.languages.forEach((l, i) => {
    children.push(mixedPara([
      { text: l.lang + ":", bold: true },
      { text: "  " + l.level },
    ], { before: i === 0 ? 60 : 20, after: 20 }));
  });
  children.push(spacer(40));

  return new Document({
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{
            level: 0, format: LevelFormat.BULLET, text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 200 } } }
          }]
        },
      ]
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: 15840 },
          margin: { top: 900, right: MARGIN, bottom: 900, left: MARGIN }
        }
      },
      children
    }]
  });
}

// ─── EJECUCIÓN ────────────────────────────────────────────────────────────────

const doc = buildDocument(CV_DATA);
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT_PATH, buffer);
  console.log(`✅ CV generado: ${OUTPUT_PATH}`);
}).catch(err => {
  console.error('❌ Error generando CV:', err);
  process.exit(1);
});
