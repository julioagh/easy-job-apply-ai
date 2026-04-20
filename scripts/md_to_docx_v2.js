#!/usr/bin/env node
/**
 * md_to_docx_v2.js
 * Convierte un CV en Markdown (.md) al nuevo estilo DOCX (Calibri, navy/blue palette)
 *
 * USO:
 *   node scripts/md_to_docx_v2.js <ruta_md> [ruta_docx_salida]
 *
 * Si no se especifica ruta de salida, genera el .docx en la misma carpeta outputs/
 * con el mismo nombre base que el .md.
 *
 * Integrado en pipeline.py — llamado automáticamente en Fase 2.
 * Versión: 1.0 | Marzo 2026
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, LevelFormat, TabStopType,
} = require('docx');
const fs = require('fs');
const path = require('path');

// ─── CONSTANTES DE ESTILO ────────────────────────────────────────────────────

const FONT = "Calibri";
const C_NAME = "1F3864";
const C_SECTION = "1F4E79";
const C_DIVIDER = "2E75B6";
const C_AI = "1B5E20";
const C_BODY = "000000";
const C_SUBTLE = "555555";
const C_MUTED = "666666";
const PAGE_W = 12240;
const MARGIN = 720;   // 0.5 in (izq/der) — antes: 1080 (0.75 in)
const CONTENT_W = PAGE_W - 2 * MARGIN;

// ─── HELPERS DE RENDER ───────────────────────────────────────────────────────

const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C_DIVIDER, space: 1 } },
  spacing: { before: 60, after: 80 }, children: []
});

const dividerThin = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB", space: 1 } },
  spacing: { before: 40, after: 60 }, children: []
});

const sectionHeader = (text) => new Paragraph({
  style: "SectionHeader",
  alignment: AlignmentType.LEFT,
  spacing: { before: 200, after: 60 },
  children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, font: FONT, color: C_SECTION, allCaps: true })]
});

const spacer = (before = 60) => new Paragraph({ spacing: { before, after: 0 }, children: [] });

/** Convierte "**bold** normal **more bold**" en array de TextRun */
function parseMixedText(str, baseSize = 19, baseColor = C_BODY) {
  if (!str) return [new TextRun({ text: '', size: baseSize, font: FONT })];
  const runs = [];
  // Detectar **bold** markers
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0, match;
  while ((match = regex.exec(str)) !== null) {
    if (match.index > lastIndex) {
      runs.push(new TextRun({ text: str.slice(lastIndex, match.index), size: baseSize, font: FONT, color: baseColor }));
    }
    runs.push(new TextRun({ text: match[1], bold: true, size: baseSize, font: FONT, color: baseColor }));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < str.length) {
    runs.push(new TextRun({ text: str.slice(lastIndex), size: baseSize, font: FONT, color: baseColor }));
  }
  return runs.length > 0 ? runs : [new TextRun({ text: str, size: baseSize, font: FONT, color: baseColor })];
}

function mixedPara(runs, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before || 40, after: opts.after || 40 },
    alignment: opts.alignment || AlignmentType.LEFT,
    children: Array.isArray(runs[0]) ? runs.flat() : runs
  });
}

function bulletPara(text, labelPrefix) {
  const children = [];
  if (labelPrefix) {
    children.push(new TextRun({ text: labelPrefix, bold: true, size: 19, font: FONT }));
    children.push(new TextRun({ text, size: 19, font: FONT, color: C_BODY }));
  } else {
    // Parsear bold inline dentro del bullet
    children.push(...parseMixedText(text));
  }
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    alignment: AlignmentType.BOTH,
    spacing: { before: 20, after: 20 },
    children
  });
}

// ─── PARSER DEL MARKDOWN ─────────────────────────────────────────────────────

function parseMarkdownCV(content) {
  const lines = content.split('\n');
  const data = {
    name: '',
    contact: '',
    lang: 'en',   // idioma detectado: 'en' | 'es'
    summary: [],
    ai_projects: [],
    experience: [],
    competencies: [],
    education: [],
    certifications: [],
    languages: [],
    philosophy: '',
  };

  let section = 'header';
  let currentExp = null;
  let currentAiProject = null;
  let summaryBuffer = [];
  let certGroupBuffer = '';

  const flushSummary = () => {
    if (summaryBuffer.length > 0) {
      data.summary.push([...summaryBuffer]);
      summaryBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line || line === '---') {
      if (section === 'summary' && summaryBuffer.length > 0) flushSummary();
      continue;
    }

    // ── NOMBRE (# H1) ──
    if (line.startsWith('# ') && !data.name) {
      data.name = line.slice(2).trim();
      section = 'header';
      continue;
    }

    // ── CONTACTO ──
    if (section === 'header' && line.includes('|') && (line.includes('@') || line.includes('linkedin'))) {
      data.contact = line.replace(/\*\*/g, '').trim();
      continue;
    }

    // ── SECCIÓN H2 ──
    if (line.startsWith('## ')) {
      flushSummary();
      const secName = line.slice(3).trim().toUpperCase();
      if (secName.includes('SUMMARY') || secName.includes('PROFILE') || secName.includes('RESUMEN')) {
        section = 'summary';
        if (secName.includes('RESUMEN')) data.lang = 'es';
      } else if (secName.includes('AI PRODUCT') || secName.includes('AI PROJECTS') || secName.includes('INDEPENDENT PROJECTS') || secName.includes('PROYECTOS IA') || secName.includes('PROYECTOS DE IA')) {
        section = 'ai_projects';
      } else if (secName.includes('EXPERIENCE') || secName.includes('EXPERIENCIA')) {
        section = 'experience';
        if (secName.includes('EXPERIENCIA')) data.lang = 'es';
      } else if (secName.includes('COMPETENC')) {
        // cubre COMPETENCIES y COMPETENCIAS
        section = 'competencies';
        if (secName.includes('COMPETENCIAS')) data.lang = 'es';
      } else if (secName.includes('EDUCATION') || secName.includes('CERTIF') || secName.includes('FORMACI')) {
        // cubre EDUCATION, CERTIFICATIONS, FORMACIÓN
        section = 'education';
        if (secName.includes('FORMACI')) data.lang = 'es';
      } else if (secName.includes('LANGUAGE') || secName.includes('IDIOMA')) {
        section = 'languages';
        if (secName.includes('IDIOMA')) data.lang = 'es';
      } else if (secName.includes('PHILOSOPHY') || secName.includes('PURPOSE') || secName.includes('PROPÓSITO') || secName.includes('PROPOSITO')) {
        section = 'philosophy';
        if (secName.includes('PROP')) data.lang = 'es';
      } else {
        section = 'other';
      }
      continue;
    }

    // ══════════════════════════════════════════════════════════
    // SECCIONES
    // ══════════════════════════════════════════════════════════

    // ── SUMMARY ──
    if (section === 'summary') {
      if (line.startsWith('### ') || line.startsWith('## ')) continue;
      // Acumula texto del párrafo
      summaryBuffer.push(...parseMixedText(line));
      // Párrafo termina en línea vacía (manejado arriba) o al final
      // Para separar párrafos agregamos un marcador de flush en siguiente vacía
      // Aquí miramos si la siguiente línea es vacía
      const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
      if (!nextLine || nextLine === '---') {
        flushSummary();
      }
      continue;
    }

    // ── AI PRODUCT WORK ──
    if (section === 'ai_projects') {
      // ### project-name — Description | Stack
      if (line.startsWith('### ')) {
        const parts = line.slice(4).split(' — ');
        const name = parts[0].trim();
        const subtitle = parts[1] ? parts[1].trim() : '';
        currentAiProject = { name, subtitle, bullets: [] };
        data.ai_projects.push(currentAiProject);
        continue;
      }
      // **Label:** text
      const aiLabelMatch = line.match(/^\*\*(.+?):\*\*\s*(.*)/);
      if (aiLabelMatch && currentAiProject) {
        const label = aiLabelMatch[1] + ':';
        const text = aiLabelMatch[2].trim();
        const isItalic = label.toLowerCase().includes('learning') || label.toLowerCase().includes('aprendizaje');
        currentAiProject.bullets.push({ label, text: ' ' + text, italics: isItalic });
        continue;
      }
      // Línea sin label pero con contenido — agregar al último bullet o como subtitle
      if (currentAiProject && !line.startsWith('*')) {
        if (currentAiProject.bullets.length === 0) {
          currentAiProject.subtitle = (currentAiProject.subtitle ? currentAiProject.subtitle + ' | ' : '') + line;
        }
      }
      continue;
    }

    // ── EXPERIENCE ──
    if (section === 'experience') {
      // ### COMPANY | Location (o ### EARLY CAREER: ...)
      if (line.startsWith('### ')) {
        const content = line.slice(4).trim();
        // Detectar si es "EARLY CAREER" o bloque narrativo
        if (content.toUpperCase().includes('EARLY CAREER')) {
          currentExp = {
            company: content.replace(/\*\*/g, '').trim(),
            location: '',
            role: '',
            period: '',
            subtitle: null,
            bullets: [],
            isNarrative: true
          };
          data.experience.push(currentExp);
          continue;
        }
        const pipeIdx = content.lastIndexOf(' | ');
        const company = pipeIdx >= 0 ? content.slice(0, pipeIdx).trim() : content;
        const location = pipeIdx >= 0 ? content.slice(pipeIdx + 3).trim() : '';
        currentExp = { company, location, role: '', period: '', subtitle: null, bullets: [], isNarrative: false };
        data.experience.push(currentExp);
        continue;
      }

      if (!currentExp) continue;

      // **Role** | Period  (o **Role** | Start - End)
      const roleMatch = line.match(/^\*\*(.+?)\*\*\s*\|?\s*(.*)/);
      if (roleMatch && !currentExp.role && !line.startsWith('•')) {
        const candidate = roleMatch[1].trim();
        const rest = roleMatch[2].trim();
        // Diferenciar roles de bullets con label
        if (rest.match(/\d{4}/) || rest.match(/Present|Presente/i) || rest.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i)) {
          currentExp.role = candidate;
          currentExp.period = rest;
          continue;
        }
      }

      // Subtitle en itálica (*text* o _text_)
      if ((line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) ||
        (line.startsWith('_') && line.endsWith('_'))) {
        if (!currentExp.role) continue; // skip si no hay rol aún
        currentExp.subtitle = line.replace(/^\*|^_|\*$|_$/g, '').trim();
        continue;
      }

      // Bullet • text  o  • **Label:** text
      if (line.startsWith('•') || line.startsWith('-')) {
        const bulletText = line.replace(/^[•\-]\s*/, '');
        const labelMatch = bulletText.match(/^\*\*(.+?):\*\*\s*(.*)/);
        if (labelMatch) {
          currentExp.bullets.push({ label: labelMatch[1] + ':', text: ' ' + labelMatch[2].trim() });
        } else {
          currentExp.bullets.push({ text: bulletText });
        }
        continue;
      }

      // Texto narrativo (sin bullet, después del role) — para bloques tipo "Drove DevOps..."
      if (currentExp.role && !line.startsWith('#') && !line.startsWith('**')) {
        // Texto como párrafo narrativo del rol
        currentExp.bullets.push({ text: line, isNarrative: true });
        continue;
      }

      // Early career inline entries: **COMPANY** | Role (YYYY-YYYY): desc
      if (currentExp.isNarrative && line.startsWith('**')) {
        currentExp.bullets.push({ text: line.replace(/\*\*/g, ''), isNarrative: true });
        continue;
      }

      continue;
    }

    // ── KEY COMPETENCIES ──
    if (section === 'competencies') {
      if (!line) continue;
      // **Group:** skills  →  [{text:'Group:', bold:true}, {text:' skills'}]
      const compMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
      if (compMatch) {
        const label = compMatch[1] + ':';
        const rest = compMatch[2] ? ' ' + compMatch[2] : '';
        data.competencies.push([
          { text: label, bold: true },
          { text: rest }
        ]);
      } else {
        data.competencies.push([{ text: line }]);
      }
      continue;
    }

    // ── EDUCATION & CERTIFICATIONS ──
    if (section === 'education') {
      const boldMatch = line.match(/^\*\*(.+?)\*\*\s*(.*)/);
      if (boldMatch) {
        const titlePart = boldMatch[1];
        const rest = boldMatch[2].trim();

        // FIX: Grupo de certificaciones PRIMERO — **Category:** items | más items
        // Debe ir antes del check de '|' para no perder el primer ítem del grupo
        if (titlePart.endsWith(':')) {
          if (rest) {
            data.certifications.push({ name: titlePart, detail: rest });
          } else {
            const nextLine = lines[i + 1] ? lines[i + 1].trim() : '';
            if (nextLine && !nextLine.startsWith('**') && !nextLine.startsWith('#')) {
              data.certifications.push({ name: titlePart, detail: nextLine });
              i++;
            } else {
              data.certifications.push({ name: titlePart, detail: '' });
            }
          }
          continue;
        }

        // Universidad / Degree: **Título** (sin texto después → siguiente línea es institución+año)
        if (!rest) {
          if (i + 1 < lines.length) {
            const nextLine = lines[i + 1].trim();
            if (nextLine && !nextLine.startsWith('**') && !nextLine.startsWith('#')) {
              data.education.push({ institution: titlePart, degree: nextLine, location: '' });
              i++;
              continue;
            }
          }
          data.education.push({ institution: titlePart, degree: '', location: '' });
          continue;
        }

        // Certificación individual: **Nombre** | Issuer — Year
        // rest empieza con '|' porque el pipe sigue inmediatamente al cierre de **
        if (rest.startsWith('|')) {
          data.certifications.push({ name: titlePart, detail: rest.slice(1).trim() });
          continue;
        }

        // Certificación con texto directo sin pipe: **Nombre** Issuer — Year
        data.certifications.push({ name: titlePart, detail: rest });
        continue;
      }

      // FIX: Líneas de texto plano — funciona aunque data.education esté vacío
      // Cubre: "Pontificia Universidad Católica del Perú (PUCP) — 2007" como primera línea
      if (!line.startsWith('**') && !line.startsWith('#')) {
        if (data.education.length > 0) {
          const lastEdu = data.education[data.education.length - 1];
          if (!lastEdu.degree) lastEdu.degree = line;
        } else {
          // Primera entrada de texto plano: crear entrada de educación directamente
          data.education.push({ institution: line, degree: '', location: '' });
        }
      }
      continue;
    }

    // ── LANGUAGES ──
    if (section === 'languages') {
      const langMatch = line.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
      if (langMatch) {
        data.languages.push({ lang: langMatch[1], level: langMatch[2].trim() });
      } else if (line && !line.startsWith('#')) {
        // Línea sin bold: agregar como nivel del último idioma
        if (data.languages.length > 0 && !data.languages[data.languages.length - 1].level) {
          data.languages[data.languages.length - 1].level = line;
        }
      }
      continue;
    }

    // ── PHILOSOPHY ──
    if (section === 'philosophy') {
      data.philosophy = line.replace(/^\*|^_|\*$|_$/g, '').trim();
      continue;
    }
  }

  return data;
}

// ─── CONSTRUCCIÓN DEL DOCUMENTO ──────────────────────────────────────────────

function buildDocument(data) {
  const children = [];
  const lang = data.lang || 'en';
  const L = lang === 'es' ? {
    summary:      'Resumen Profesional',
    aiWork:       'Proyectos de IA \u2014 Independientes',
    experience:   'Experiencia Profesional',
    competencies: 'Competencias Clave',
    education:    'Formación y Certificaciones',
    languages:    'Idiomas',
  } : {
    summary:      'Professional Summary',
    aiWork:       'AI Product Work \u2014 Independent Projects',
    experience:   'Professional Experience',
    competencies: 'Key Competencies',
    education:    'Education & Certifications',
    languages:    'Languages',
  };

  // ── NOMBRE Y CONTACTO ──
  children.push(new Paragraph({
    style: "HeaderCenter",
    alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
    children: [new TextRun({ text: data.name, bold: true, size: 36, font: FONT, color: C_NAME, allCaps: true })]
  }));
  if (data.contact) {
    children.push(new Paragraph({
      style: "HeaderCenter",
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 20 },
      children: [new TextRun({ text: data.contact, size: 18, font: FONT, color: "444444" })]
    }));
  }
  children.push(divider());

  // ── SUMMARY ──
  if (data.summary.length > 0) {
    children.push(sectionHeader(L.summary));
    data.summary.forEach((para, i) => {
      children.push(new Paragraph({
        style: "BodyText",
        alignment: AlignmentType.BOTH,
        spacing: { before: i === 0 ? 60 : 40, after: 40 },
        children: para
      }));
    });
    children.push(spacer(20));
    children.push(divider());
  }

  // ── AI PRODUCT WORK ──
  if (data.ai_projects.length > 0) {
    children.push(sectionHeader(L.aiWork));
    data.ai_projects.forEach((proj, pi) => {
      children.push(new Paragraph({
        spacing: { before: pi === 0 ? 80 : 60, after: 20 },
        children: [
          new TextRun({ text: proj.name, bold: true, size: 21, font: FONT, color: C_AI }),
          new TextRun({ text: proj.subtitle ? '  \u2014  ' + proj.subtitle : '', size: 18, font: FONT, color: C_SUBTLE, italics: true }),
        ]
      }));
      proj.bullets.forEach(b => {
        children.push(new Paragraph({
          spacing: { before: 20, after: 20 },
          children: b.label
            ? [
              new TextRun({ text: b.label, bold: true, size: 19, font: FONT }),
              new TextRun({ text: b.text, size: 19, font: FONT, italics: b.italics || false }),
            ]
            : parseMixedText(b.text)
        }));
      });
    });
    children.push(spacer(40));
    children.push(divider());
  }

  // ── PROFESSIONAL EXPERIENCE ──
  if (data.experience.length > 0) {
    children.push(sectionHeader(L.experience));

    data.experience.forEach((exp, ei) => {
      if (exp.isNarrative && !exp.role) {
        // Early career block: company = heading
        children.push(new Paragraph({
          spacing: { before: 120, after: 20 },
          children: [new TextRun({ text: exp.company, bold: true, size: 20, font: FONT, color: C_SECTION })]
        }));
        exp.bullets.forEach(b => {
          children.push(bulletPara(b.text));
        });
      } else {
        // Bloque estándar — línea 1: Empresa (bold navy)
        children.push(new Paragraph({
          spacing: { before: 120, after: 0 },
          children: [
            new TextRun({ text: exp.company, bold: true, size: 20, font: FONT, color: C_SECTION }),
          ]
        }));
        // línea 2: Ubicación | Período (itálica muted, sin tab stops)
        const locationPeriod = [exp.location, exp.period].filter(Boolean).join('  |  ');
        if (locationPeriod) {
          children.push(new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [
              new TextRun({ text: locationPeriod, size: 18, font: FONT, color: C_MUTED, italics: true }),
            ]
          }));
        }
        // línea 3: Cargo (bold negro)
        if (exp.role) {
          children.push(new Paragraph({
            spacing: { before: 0, after: exp.subtitle ? 0 : 40 },
            children: [
              new TextRun({ text: exp.role, bold: true, size: 20, font: FONT, color: C_BODY }),
            ]
          }));
        }
        if (exp.subtitle) {
          children.push(new Paragraph({
            spacing: { before: 0, after: 30 },
            children: [new TextRun({ text: exp.subtitle, size: 18, font: FONT, color: C_SUBTLE, italics: true })]
          }));
        }
        exp.bullets.forEach(b => {
          if (b.isNarrative) {
            children.push(new Paragraph({
              style: "BodyText",
              alignment: AlignmentType.BOTH,
              spacing: { before: 20, after: 20 },
              children: parseMixedText(b.text, 19, C_SUBTLE)
            }));
          } else {
            children.push(bulletPara(b.text, b.label));
          }
        });
      }
      if (ei < data.experience.length - 1) children.push(dividerThin());
    });

    children.push(spacer(40));
    children.push(divider());
  }

  // ── KEY COMPETENCIES ──
  if (data.competencies.length > 0) {
    children.push(sectionHeader(L.competencies));
    data.competencies.forEach((line, i) => {
      children.push(new Paragraph({
        spacing: { before: i === 0 ? 60 : 30, after: 30 },
        children: line.map(r => new TextRun({
          text: r.text, bold: r.bold || false, size: 19, font: FONT, color: C_BODY
        }))
      }));
    });
    children.push(spacer(20));
    children.push(divider());
  }

  // ── EDUCATION & CERTIFICATIONS ──
  if (data.education.length > 0 || data.certifications.length > 0) {
    children.push(sectionHeader(L.education));
    data.education.forEach(edu => {
      children.push(new Paragraph({
        spacing: { before: 60, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
        children: [
          new TextRun({ text: edu.institution, bold: true, size: 19, font: FONT }),
          ...(edu.location ? [new TextRun({ text: '\t' + edu.location, size: 18, font: FONT, color: C_MUTED })] : []),
        ]
      }));
      if (edu.degree) {
        children.push(new Paragraph({
          spacing: { before: 0, after: 30 },
          children: [new TextRun({ text: edu.degree, size: 19, font: FONT })]
        }));
      }
    });
    data.certifications.forEach(cert => {
      children.push(new Paragraph({
        spacing: { before: 20, after: 20 },
        children: [
          new TextRun({ text: cert.name, bold: true, size: 19, font: FONT }),
          new TextRun({ text: cert.detail ? '  |  ' + cert.detail : '', size: 19, font: FONT, color: C_BODY }),
        ]
      }));
    });
    children.push(spacer(20));
    children.push(divider());
  }

  // ── LANGUAGES ──
  if (data.languages.length > 0) {
    children.push(sectionHeader(L.languages));
    data.languages.forEach((l, i) => {
      children.push(new Paragraph({
        spacing: { before: i === 0 ? 60 : 20, after: 20 },
        children: [
          new TextRun({ text: l.lang + ':', bold: true, size: 19, font: FONT }),
          new TextRun({ text: l.level ? '  ' + l.level : '', size: 19, font: FONT }),
        ]
      }));
    });
    children.push(spacer(40));
  }

  return new Document({
    styles: {
      paragraphStyles: [
        {
          id: "BodyText",
          name: "Body Text",
          basedOn: "Normal",
          paragraph: { alignment: AlignmentType.BOTH },
          run: { font: FONT, size: 19, color: C_BODY }
        },
        {
          id: "HeaderCenter",
          name: "Header Center",
          basedOn: "Normal",
          paragraph: { alignment: AlignmentType.CENTER },
          run: { font: FONT }
        },
        {
          id: "SectionHeader",
          name: "Section Header",
          basedOn: "Normal",
          paragraph: { alignment: AlignmentType.LEFT },
          run: { font: FONT }
        }
      ]
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 200 } } }
        }]
      }]
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

// ─── EJECUCIÓN CLI ────────────────────────────────────────────────────────────

const [, , mdPath, outputPath] = process.argv;

if (!mdPath) {
  console.error('USO: node scripts/md_to_docx_v2.js <ruta_md> [ruta_docx_salida]');
  process.exit(1);
}

if (!fs.existsSync(mdPath)) {
  console.error(`❌ Archivo no encontrado: ${mdPath}`);
  process.exit(1);
}

const content = fs.readFileSync(mdPath, 'utf8');
const cvData = parseMarkdownCV(content);

// Determinar ruta de salida
let outPath = outputPath;
if (!outPath) {
  const base = path.basename(mdPath, '.md');
  const dir = path.dirname(mdPath);
  outPath = path.join(dir, base + '.docx');
}

const doc = buildDocument(cvData);
Packer.toBuffer(doc)
  .then(buffer => {
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ DOCX generado: ${outPath}`);
  })
  .catch(err => {
    console.error('❌ Error generando DOCX:', err.message);
    process.exit(1);
  });
