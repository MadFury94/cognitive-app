/**
 * Generates public/letterhead.docx  —  single A4 page
 * Run: node scripts/generate-letterhead.mjs
 */
import {
  Document, Packer, Paragraph, TextRun, ImageRun,
  Header, Footer, PageNumber, NumberFormat,
  AlignmentType, VerticalAlign,
  BorderStyle, ShadingType,
  Table, TableRow, TableCell, TableLayoutType,
  WidthType, HeightRule,
  convertMillimetersToTwip as mm,
} from 'docx';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');

// ── Colours ────────────────────────────────────────────────────────────────
const C = {
  purple:  '320070',
  purpleD: '5b21b6',
  purpleP: 'f0ebf8',
  ink:     '111827',
  inkMid:  '4b5563',
  inkSoft: '9ca3af',
  rule:    'e5e7eb',
};
const FONT = 'Calibri';
const sz = pt => pt * 2;   // docx uses half-points

// ── Logo ───────────────────────────────────────────────────────────────────
const logoData = fs.readFileSync(
  path.join(publicDir, 'COGNISKILLS-BRANDING', 'COGNISKILLS', 'LOGO-TRANSPARENT-LIGHT-BG.png')
);

// ── No-border helper ───────────────────────────────────────────────────────
const noBorder = {
  top:    { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left:   { style: BorderStyle.NONE },
  right:  { style: BorderStyle.NONE },
};
const noTableBorder = { ...noBorder, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } };

// ── Tiny spacer paragraph ──────────────────────────────────────────────────
const spacer = (mm_size = 2) => new Paragraph({
  spacing: { before: 0, after: 0, line: mm(mm_size) * 8, lineRule: 'exact' },
  children: [new TextRun({ text: '' })],
});

// ══════════════════════════════════════════════════════════════════════════
//  HEADER  — logo + org name inline (left) | contact block (right)
// ══════════════════════════════════════════════════════════════════════════
function buildHeader() {
  // THREE-column header table:
  //   col 1 (narrow): logo image
  //   col 2 (medium): org name + subtitle
  //   col 3 (wide):   contact details right-aligned
  const logoCell = new TableCell({
    width: { size: mm(22), type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    borders: noBorder,
    children: [
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new ImageRun({ data: logoData, transformation: { width: 68, height: 68 }, type: 'png' }),
        ],
      }),
    ],
  });

  const nameCell = new TableCell({
    width: { size: 38, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: noBorder,
    children: [
      new Paragraph({
        spacing: { before: 0, after: mm(0.5) },
        children: [
          new TextRun({ text: 'Cogniskills', bold: true, size: sz(18), color: C.purple, font: FONT }),
        ],
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({ text: 'LEARNING ENHANCEMENT CENTER', size: sz(7.5), color: C.inkSoft, font: FONT }),
        ],
      }),
    ],
  });

  const contactCell = new TableCell({
    width: { size: 52, type: WidthType.PERCENTAGE },
    verticalAlign: VerticalAlign.CENTER,
    borders: noBorder,
    children: [
      ...[
        '25 Oladimeji Alo Street, Lekki Phase 1, Lagos',
        '0803 858 6878   ·   0901 181 1088',
        'cogniskills@gmail.com   ·   cogniskillsleh.com',
      ].map(text => new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 0, after: mm(0.8) },
        children: [new TextRun({ text, size: sz(9), color: C.inkMid, font: FONT })],
      })),
    ],
  });

  const headerTable = new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noTableBorder,
    rows: [
      new TableRow({
        height: { value: mm(26), rule: HeightRule.AUTO },
        children: [logoCell, nameCell, contactCell],
      }),
    ],
  });

  const rule = new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 20, color: C.purple } },
    spacing: { before: mm(2), after: mm(2) },
    children: [],
  });

  const ribbon = new Paragraph({
    shading: { type: ShadingType.SOLID, color: C.purpleP, fill: C.purpleP },
    alignment: AlignmentType.CENTER,
    spacing: { before: mm(1), after: mm(1) },
    children: [
      new TextRun({
        text: 'Dyslexia · ADHD · Autism · Dyspraxia · Speech & Language · Learning Differences · Cognitive Assessment',
        size: sz(8), color: C.purpleD, font: FONT,
      }),
    ],
  });

  return new Header({ children: [headerTable, rule, ribbon] });
}

// ══════════════════════════════════════════════════════════════════════════
//  FOOTER  — single compact line + page number
// ══════════════════════════════════════════════════════════════════════════
function buildFooter() {
  const footerTable = new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noTableBorder,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 75, type: WidthType.PERCENTAGE },
            borders: {
              ...noBorder,
              top: { style: BorderStyle.SINGLE, size: 6, color: C.rule },
            },
            children: [
              new Paragraph({
                spacing: { before: mm(2), after: 0 },
                children: [
                  new TextRun({
                    text: 'Cogniskills Learning Enhancement Center  ·  Lagos, Nigeria  ·  cogniskillsleh.com',
                    size: sz(8), color: C.inkSoft, font: FONT,
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: {
              ...noBorder,
              top: { style: BorderStyle.SINGLE, size: 6, color: C.rule },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { before: mm(2), after: 0 },
                children: [
                  new TextRun({ text: 'Page ', size: sz(8), color: C.inkSoft, font: FONT }),
                  new TextRun({ children: [PageNumber.CURRENT], size: sz(8), color: C.inkSoft, font: FONT }),
                  new TextRun({ text: ' of ', size: sz(8), color: C.inkSoft, font: FONT }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: sz(8), color: C.inkSoft, font: FONT }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  return new Footer({ children: [footerTable] });
}

// ══════════════════════════════════════════════════════════════════════════
//  BODY HELPERS
// ══════════════════════════════════════════════════════════════════════════
const microLabel = text => new Paragraph({
  spacing: { before: mm(3), after: mm(1) },
  children: [new TextRun({ text, size: sz(7), color: C.inkSoft, font: FONT, allCaps: true })],
});

const addressLine = (text, bold = false) => new Paragraph({
  spacing: { before: 0, after: mm(0.6) },
  children: [new TextRun({ text, size: sz(10), color: C.ink, font: FONT, bold })],
});

const bodyPara = (runs) => new Paragraph({
  spacing: { before: 0, after: mm(3) },
  children: runs,
});

const run = (text, opts = {}) => new TextRun({
  text, font: FONT, size: sz(10), color: C.inkMid, ...opts,
});

// ══════════════════════════════════════════════════════════════════════════
//  DOCUMENT
// ══════════════════════════════════════════════════════════════════════════
const today = new Date().toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric',
});

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size:   { width: mm(210), height: mm(297) },
        margin: {
          top: mm(8), bottom: mm(10),
          left: mm(20), right: mm(20),
          header: mm(5), footer: mm(5),
        },
        pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
      },
    },
    headers: { default: buildHeader() },
    footers: { default: buildFooter() },

    children: [

      // ── Date only ───────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: mm(4) },
        children: [
          run('Date:  ', { color: C.inkSoft, size: sz(9) }),
          run(today, { color: C.ink, bold: true, size: sz(9) }),
        ],
      }),

      spacer(3),

      // ── Addressee ───────────────────────────────────────────────
      microLabel('To'),
      addressLine('[Recipient Full Name]', true),
      addressLine('[Title / Designation]'),
      addressLine('[Organisation / School / Clinic]'),
      addressLine('[Address Line 1]'),
      addressLine('[City, State]'),

      spacer(3),

      // ── Subject ─────────────────────────────────────────────────
      new Paragraph({
        border: { left: { style: BorderStyle.SINGLE, size: 20, color: C.purple } },
        spacing: { before: mm(1), after: 0 },
        indent: { left: mm(3) },
        children: [
          run('SUBJECT  ', { size: sz(7), color: C.inkSoft, allCaps: true }),
        ],
      }),
      new Paragraph({
        border: { left: { style: BorderStyle.SINGLE, size: 20, color: C.purple } },
        spacing: { before: 0, after: mm(1) },
        indent: { left: mm(3) },
        children: [
          run('[e.g. Cognitive Assessment Report — [Child\'s Full Name]  |  DOB: DD / MM / YYYY]', {
            color: C.ink, bold: true, size: sz(10),
          }),
        ],
      }),

      spacer(3),

      // ── Salutation ──────────────────────────────────────────────
      bodyPara([run('Dear [Sir / Ma / Name],', { color: C.ink, bold: true })]),

      // ── Body text ───────────────────────────────────────────────
      bodyPara([
        run('We write on behalf of '),
        run('Cogniskills Learning Enhancement Center', { bold: true }),
        run(' with respect to the above-referenced matter. Our centre provides structured, evidence-based cognitive skills training for children and adolescents presenting with dyslexia, ADHD, autism spectrum disorder, dyspraxia, speech difficulties, and related learning differences, using the '),
        run('Cognigym', { italics: true }),
        run(' programme.'),
      ]),

      bodyPara([
        run('[Insert the primary purpose of this letter here — assessment report, referral recommendation, progress update, or inter-professional communication. Reference relevant dates, session records, or supporting documents as appropriate.]',
          { color: C.inkSoft }),
      ]),

      bodyPara([
        run('[Clinical observations, findings, or recommendations. Where relevant, reference cognitive domains: auditory processing, working memory, sustained attention, processing speed, visual-spatial reasoning, or sensory-motor integration.]',
          { color: C.inkSoft }),
      ]),

      bodyPara([
        run('Should you require any further information or wish to discuss this matter, please do not hesitate to contact our office. We look forward to your continued collaboration in support of this child\'s development.'),
      ]),

      spacer(3),

      // ── Signature ───────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: mm(9) },
        children: [run('Yours sincerely,')],
      }),

      new Paragraph({
        spacing: { before: 0, after: mm(0.5) },
        children: [run('[Authorised Signatory]', { color: C.ink, bold: true, size: sz(11) })],
      }),

      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [run('[Title]  —  Cogniskills Learning Enhancement Center', { color: C.inkSoft, size: sz(9) })],
      }),
    ],
  }],
});

// ── Write ──────────────────────────────────────────────────────────────────
const outPath = path.join(publicDir, 'letterhead-v3.docx');
fs.writeFileSync(outPath, await Packer.toBuffer(doc));
console.log(`\n✓  Written → ${outPath}\n`);
