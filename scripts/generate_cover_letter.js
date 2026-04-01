#!/usr/bin/env node
/**
 * generate_cover_letter.js
 * Generador reutilizable de Cover Letters en DOCX (estilo navy/blue, Calibri)
 *
 * USO:
 *   node scripts/generate_cover_letter.js <ruta_json> [ruta_docx_salida]
 *
 * Si no se especifica ruta de salida, genera el .docx en outputs/
 * con el mismo nombre base que el .json.
 *
 * ESTRUCTURA DEL JSON DE ENTRADA:
 * {
 *   "candidate": {
 *     "name": "JULIO ALBERTO GONZALES HEREDIA",
 *     "contact": "Lima, Peru  |  (+51) 992 755 873  |  email@domain.com  |  LinkedIn: url"
 *   },
 *   "date": "March 30, 2026",
 *   "recipient": {
 *     "name": "Hiring Team",           // opcional
 *     "company": "Apply Digital",
 *     "team": "Senior PM / Scrum Master Role",  // opcional
 *     "location": "Remote — LATAM"     // opcional
 *   },
 *   "position": "Senior Project Manager / Scrum Master",
 *   "opening": "Párrafo de apertura...",
 *   "sections": [
 *     { "label": "Título de sección", "body": "Cuerpo del párrafo..." },
 *     ...
 *   ],
 *   "closing": "Thank you for your consideration.",
 *   "attachment": "CV_JulioGonzales_Empresa_Posicion.docx"  // opcional
 * }
 *
 * Versión: 1.0 | Marzo 2026
 */

const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle
} = require('docx');
const fs   = require('fs');
const path = require('path');

// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
const FONT     = "Calibri";
const C_NAME   = "1F3864";   // Azul marino oscuro — nombre candidato
const C_SECT   = "1F4E79";   // Azul navy — labels de sección
const C_DIVID  = "2E75B6";   // Azul medio — línea separadora
const C_BODY   = "000000";   // Negro — texto normal
const C_MUTED  = "555555";   // Gris — textos secundarios
const PAGE_W   = 12240;      // US Letter en DXA
const PAGE_H   = 15840;
const MARGIN   = 1080;       // 0.75 in

// ─── HELPERS DE PÁRRAFO ──────────────────────────────────────────────────────

/** Línea divisora navy */
const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C_DIVID, space: 1 } },
  spacing: { before: 60, after: 100 },
  children: []
});

/** Espacio vertical vacío */
const spacer = (before = 80) => new Paragraph({
  spacing: { before, after: 0 }, children: []
});

/** Párrafo de cuerpo justificado */
const bodyPara = (text, opts = {}) => new Paragraph({
  alignment: AlignmentType.BOTH,
  spacing: { before: opts.before ?? 0, after: 0 },
  children: [new TextRun({
    text,
    size: 19, font: FONT, color: C_BODY,
    bold: opts.bold || false,
    italics: opts.italics || false
  })]
});

/** Label de sección en azul navy (uppercase) */
const sectionLabel = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  children: [new TextRun({
    text: text.toUpperCase(),
    bold: true, size: 19, font: FONT, color: C_SECT
  })]
});

/** Línea simple con tramos mixtos (texto plano + porciones bold) */
const inlinePara = (parts, opts = {}) => new Paragraph({
  spacing: { before: opts.before ?? 0, after: 0 },
  children: parts.map(p => new TextRun({
    text: p.text,
    bold: p.bold || false,
    italics: p.italics || false,
    size: p.size || 19,
    font: FONT,
    color: p.color || C_BODY
  }))
});

// ─── CONSTRUCTOR DEL DOCUMENTO ───────────────────────────────────────────────

function buildCoverLetter(cfg) {
  const kids = [];

  // ── CABECERA: NOMBRE ──────────────────────────────────────────────────────
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 40 },
    children: [new TextRun({
      text: cfg.candidate.name,
      bold: true, size: 36, font: FONT, color: C_NAME, allCaps: true
    })]
  }));

  // ── CABECERA: CONTACTO ────────────────────────────────────────────────────
  if (cfg.candidate.contact) {
    kids.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 20 },
      children: [new TextRun({
        text: cfg.candidate.contact,
        size: 18, font: FONT, color: "444444"
      })]
    }));
  }

  kids.push(divider());
  kids.push(spacer(80));

  // ── FECHA ─────────────────────────────────────────────────────────────────
  kids.push(bodyPara(cfg.date));
  kids.push(spacer(120));

  // ── DESTINATARIO ─────────────────────────────────────────────────────────
  const r = cfg.recipient || {};
  if (r.name)     kids.push(inlinePara([{ text: r.name, bold: true }]));
  if (r.company)  kids.push(bodyPara(r.company));
  if (r.team)     kids.push(bodyPara(r.team, { italics: false }));
  if (r.location) kids.push(inlinePara([{ text: r.location, color: C_MUTED }]));

  kids.push(spacer(160));

  // ── REFERENCIA (RE:) ──────────────────────────────────────────────────────
  kids.push(inlinePara([
    { text: "RE: ",       bold: true },
    { text: cfg.position, bold: false }
  ]));

  kids.push(spacer(160));

  // ── SALUDO ────────────────────────────────────────────────────────────────
  const greeting = r.name
    ? `Dear ${r.name},`
    : `Dear ${r.company} Hiring Team,`;
  kids.push(bodyPara(cfg.greeting || greeting));
  kids.push(spacer(120));

  // ── PÁRRAFO DE APERTURA ───────────────────────────────────────────────────
  if (cfg.opening) {
    kids.push(bodyPara(cfg.opening));
  }

  // ── SECCIONES ─────────────────────────────────────────────────────────────
  (cfg.sections || []).forEach(sec => {
    kids.push(sectionLabel(sec.label));
    kids.push(bodyPara(sec.body));
  });

  kids.push(spacer(160));

  // ── CIERRE ────────────────────────────────────────────────────────────────
  kids.push(bodyPara(cfg.closing || "Thank you for your consideration."));
  kids.push(spacer(160));
  kids.push(bodyPara("Sincerely,"));
  kids.push(spacer(200));

  // ── FIRMA ─────────────────────────────────────────────────────────────────
  kids.push(new Paragraph({
    spacing: { before: 0, after: 0 },
    children: [new TextRun({
      text: cfg.candidate.name,
      bold: true, size: 19, font: FONT, color: C_NAME
    })]
  }));

  // ── ADJUNTO (opcional) ────────────────────────────────────────────────────
  if (cfg.attachment) {
    kids.push(spacer(120));
    kids.push(new Paragraph({
      spacing: { before: 0, after: 0 },
      children: [new TextRun({
        text: `Attachment: ${cfg.attachment}`,
        size: 17, font: FONT, color: C_MUTED, italics: true
      })]
    }));
  }

  // ── DOCUMENTO ─────────────────────────────────────────────────────────────
  return new Document({
    sections: [{
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN }
        }
      },
      children: kids
    }]
  });
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const [, , jsonPath, outputPath] = process.argv;

if (!jsonPath) {
  console.error('USO: node scripts/generate_cover_letter.js <ruta_json> [ruta_docx_salida]');
  process.exit(1);
}

if (!fs.existsSync(jsonPath)) {
  console.error(`❌ Archivo no encontrado: ${jsonPath}`);
  process.exit(1);
}

let cfg;
try {
  cfg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
  console.error(`❌ JSON inválido: ${e.message}`);
  process.exit(1);
}

const outPath = outputPath || (() => {
  const base = path.basename(jsonPath, '.json');
  return path.join('outputs', base + '.docx');
})();

const doc = buildCoverLetter(cfg);

Packer.toBuffer(doc)
  .then(buffer => {
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Cover letter generada: ${outPath}`);
  })
  .catch(err => {
    console.error('❌ Error generando DOCX:', err.message);
    process.exit(1);
  });
