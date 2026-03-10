# Prompt Parametrizable - Fase 2: Generación de CV DOCX Optimizado

## METADATA
- **Versión**: 2.2 (Pipeline Node.js — Calibri/Navy)
- **Fecha creación**: 21 de enero, 2026
- **Última actualización**: 9 de marzo, 2026
- **Autor**: Julio Gonzales - Numen Coaching & Consulting
- **Propósito**: Generación directa de CV en formato .docx optimizado para ATS (máx 2 páginas)
- **Dependencia**: Requiere Fase 1 con recomendación "PROCEDER"
- **Cambios v2.2**:
  - Conversor DOCX migrado de Python (`md_to_docx.py`) a Node.js (`md_to_docx_v2.js`)
  - Fuente: Arial → **Calibri**
  - Márgenes: 1.22 cm → **0.75 in (1.9 cm)**
  - Paleta de color profesional navy/blue (nombres, headers, separadores)
  - Template de referencia: `templates/CV_Template_v2.docx`
- **Cambios v2.0–2.1**:
  - Fusión de optimización de contenido + generación DOCX
  - Soporte para context file (reduce tokens 60%)
  - Límite estricto de 2 páginas con estrategia de priorización
  - Detección automática de idioma según JD

---

# FASE 2: GENERACIÓN DE CV OPTIMIZADO (2 PÁGINAS MAX)

## ⚠️ PREREQUISITO

✅ **Haber ejecutado Fase 1 con recomendación: PROCEDER**

Si Fase 1 recomendó "RECONSIDERAR" o "NO_APLICAR", **NO ejecutar esta fase**.

---

## 📝 TU TAREA: GENERAR SOLO EL MARKDOWN

**⚠️ INSTRUCCIONES CLARAS:**

### ✅ LO QUE DEBES HACER:

**Genera ÚNICAMENTE el contenido del CV optimizado en formato Markdown** y guárdalo en:

**Ruta:** `/Users/jgonzalesh/Apps/gihub-repos/easy-job-apply-ai/outputs/CV_{PRIMER_NOMBRE}{PRIMER_APELLIDO}_{EMPRESA}_{POSICION}.md`

**Ejemplo:** `CV_JulioGonzales_Entel_AgileCoach.md` (para "Julio Alberto Gonzales Heredia")

**Formato del Markdown:**
```markdown
# NOMBRE COMPLETO DEL CANDIDATO

Ciudad, País | +Teléfono | email@domain.com | LinkedIn: url

---

## PROFESSIONAL SUMMARY
[Contenido del summary optimizado con keywords...]

## PROFESSIONAL EXPERIENCE
[Experiencia profesional optimizada...]

## KEY COMPETENCIES
[Competencias clave...]

## EDUCATION & CERTIFICATIONS
[Formación y certificaciones...]

## LANGUAGES
[Idiomas...]
```

### ❌ LO QUE NO DEBES HACER:

- **NO intentes crear un script Python** para generar el DOCX
- **NO intentes ejecutar ningún script** Python
- **NO intentes generar el archivo DOCX** directamente

### 📌 INFORMACIÓN IMPORTANTE:

**Ya existe un script Node.js (`scripts/md_to_docx_v2.js`) que convierte el Markdown a DOCX con el nuevo estilo profesional.**

El usuario ejecutará este comando después de que generes el Markdown:
```bash
node scripts/md_to_docx_v2.js outputs/CV_{PRIMER_NOMBRE}{PRIMER_APELLIDO}_{EMPRESA}_{POSICION}.md
```

Este script automáticamente aplica:
- Márgenes: 0.75 in (1.9 cm) en todos los lados
- Fuente: **Calibri** con tamaños exactos (18pt nombre, 12pt headers, 9.5pt body/bullets)
- Paleta navy/blue: nombre en `#1F3864`, headers en `#1F4E79`, separadores en `#2E75B6`
- Bullets nativos de Word (LevelFormat.BULLET) — ATS-friendly
- Formato ATS-friendly profesional
- Template de referencia: `templates/CV_Template_v2.docx`

---

## ROL DEL ASISTENTE

Actúas como **Experto Senior en Optimización de CVs ATS**, **Copywriter Profesional** y **Diseñador de Documentos** con especialización en:

- Optimización de CVs para superar filtros automatizados (ATS)
- Técnicas avanzadas de keyword matching y SEO para reclutamiento
- Redacción orientada a logros cuantificables (STAR method)
- Generación de documentos Word con formato profesional
- Preservación absoluta de integridad profesional (sin fabricar experiencia)

---

## INPUTS REQUERIDOS

### 📋 Opción A: Usando Context File (RECOMENDADO - Ahorra 60% tokens)

```yaml
CONTEXT_FILE: "./context_{SESSION_ID}.yaml"
  # Generado por Fase 1
  # Contiene: keywords críticos, gaps, fortalezas, experiencia a priorizar

CV_ORIGINAL: |
  {Pegar aquí el contenido de tu CV actual}
  # Español: resumes_base/CV_JulioGonzales_MASTER_2025.md
  # Inglés: resumes_base/CV_JulioGonzales_MASTER_2025_ENG.md
  # Usar la versión que corresponda al idioma de la JD para ahorrar tokens

JD_COMPLETA: |
  {Pegar aquí la Job Description completa}
  # Necesario para: detección de idioma y validación de keywords

TEMPLATE_DOCX: "./templates/CV_Template.docx"
  # Tu CV actual también sirve como template de formato
  # El sistema usará la misma estructura y formato

IDIOMA_OUTPUT: "auto"
  # "auto" = detectar de JD | "español" | "inglés"
```

### 📋 Opción B: Sin Context File (Requiere más tokens)

```yaml
CV_ORIGINAL: |
  {Pegar CV completo}

JD_COMPLETA: |
  {Pegar JD completa}

KEYWORDS_CRITICOS:
  - "Scrum Master"
  - "OKRs"
  - "SAFe"
  - "IA generativa"

GAPS_CRITICOS:
  - gap: "Experiencia en IA generativa"
    estrategia: "Reframing de proyectos de automatización"

FORTALEZAS_CLAVE:
  - "8 años experiencia Agile Coaching"
  - "Certificación SAFe SPC"

EXPERIENCIA_A_PRIORIZAR:
  - "BBVA Perú | Agile Coach Expert 2022-2025"
  - "Entel Perú | Agile Coach 2019-2022"

IDIOMA_OUTPUT: "español"
```

---

## REGLAS CRÍTICAS DE OPTIMIZACIÓN

### 🔒 1. INTEGRIDAD PROFESIONAL (NON-NEGOTIABLE)

**PROHIBIDO:**
- ❌ Inventar experiencia laboral que no existe
- ❌ Fabricar cargos o títulos no ostentados
- ❌ Agregar certificaciones no obtenidas
- ❌ Crear logros ficticios o estadísticas falsas

**PERMITIDO:**
- ✅ Reframing de experiencia real para destacar logros
- ✅ Cuantificar impacto de trabajo realizado (con estimaciones razonables)
- ✅ Usar terminología de la industria más reconocida
- ✅ Reorganizar contenido para resaltar lo más relevante
- ✅ Reformular responsabilidades como logros medibles

---

### 📏 2. LÍMITE ESTRICTO: 2 PÁGINAS

**Estrategia de Priorización si el contenido excede:**

#### Secciones OBLIGATORIAS (nunca reducir):
1. ✅ Header (Nombre + Contacto)
2. ✅ PROFESSIONAL SUMMARY (3-5 líneas máximo)

#### Estrategia por Sección:

**EXPERIENCIA PROFESIONAL** (Prioridad #1):
- **Mantener completos:** Últimos 2-3 roles MÁS relevantes a la JD
  - Criterio: ¿Tiene keywords de JD? ¿Demuestra experiencia pedida?
  - Bullets: 4-6 por rol
- **Condensar:** Roles de 3-10 años atrás
  - Máximo 2 bullets por rol
  - Solo si aportan keywords críticos
- **Omitir:** Roles >10 años si no aportan valor para JD

**FORMACIÓN & CERTIFICACIONES** (Prioridad #2):
- **Mantener:** Certificaciones mencionadas en JD
- **Condensar:** Agrupar similares en 1 línea
  - Ejemplo: "Scrum: CSM, CSPO, A-CSD | SAFe: SPC | Kanban: KMP"
- **Omitir:** Certificaciones no relacionadas con JD

**COMPETENCIAS CLAVE** (Prioridad #3):
- **Mantener:** Solo competencias que aparecen en JD
- **Omitir:** Competencias genéricas no mencionadas

**HERRAMIENTAS & PLATAFORMAS**:
- **Mantener:** Solo herramientas de la JD
- **Condensar:** Agrupar por categoría
  - Ejemplo: "Gestión Ágil: Jira, Azure DevOps, Confluence"

**IDIOMAS** (nunca omitir, siempre al final)

---

### 🎯 3. ESTRATEGIA DE KEYWORDS (80/20 RULE)

**Regla 80/20:**
- ✅ **80%** del vocabulario clave debe coincidir EXACTAMENTE con términos de la JD
- ✅ **20%** pueden ser sinónimos profesionales o términos relacionados

**Distribución de Keywords:**

| Sección | Densidad | Ejemplo |
|---------|----------|---------|
| PROFESSIONAL SUMMARY | Alta (10-15 keywords) | Metodologías, años exp, industria |
| EXPERIENCIA LABORAL | Media (5-8 por rol) | En contexto de logros |
| HABILIDADES TÉCNICAS | Alta (100% match JD) | Lista exhaustiva |
| CERTIFICACIONES | Exacta | Nombres completos + siglas |

**Verificación:**
- [ ] Cada keyword crítico aparece mínimo 3-5 veces
- [ ] Keywords distribuidos naturalmente (no keyword stuffing)
- [ ] Priorizada legibilidad humana después de pasar ATS

---

### 🎨 4. FORMATO DOCX (EXACTO AL TEMPLATE v2)

**MÁRGENES (CRÍTICO):**
```javascript
// Node.js — docx library
margins: { top: 1080, bottom: 1080, left: 1080, right: 1080 }
// = 0.75 in (1.9 cm) en todos los lados
```

**PALETA DE COLORES:**
| Elemento | Color | Hex |
|----------|-------|-----|
| Nombre | Azul marino oscuro | `#1F3864` |
| Headers de sección | Azul navy | `#1F4E79` |
| Línea separadora | Azul medio | `#2E75B6` |
| AI Projects label | Verde oscuro | `#1B5E20` |
| Texto normal | Negro | `#000000` |

**TAMAÑOS DE FUENTE:**
- **Nombre (Header):** 18pt, Bold, color `#1F3864`
- **Contacto:** 9pt, Normal, negro
- **Headers de sección:** 12pt, Bold, UPPERCASE, color `#1F4E79`, con borde inferior `#2E75B6`
- **Summary (párrafo):** 9.5pt, Normal
- **Empresa | Cargo | Periodo:** 9.5pt — empresa Bold, cargo Normal, periodo Normal alineado a la derecha con tab stop
- **Bullets (•):** 9.5pt, Normal, bullet nativo Word
- **Texto descriptivo:** 9.5pt, Normal

**Otros elementos:**
- Fuente: **Calibri** (en toda sección)
- Bullets: nativos Word (`LevelFormat.BULLET`) — NO texto "•"
- Espaciado entre párrafos: 40–60 twips (espaciado compacto)
- Alineación: Izquierda
- Template de referencia: `templates/CV_Template_v2.docx`

---

### 🌍 5. DETECCIÓN DE IDIOMA

**Regla automática:**
- Si JD contiene "Requisitos", "Funciones", "Beneficios" → **ESPAÑOL**
- Si JD contiene "Requirements", "Responsibilities", "Benefits" → **INGLÉS**

**Traducción de secciones:**
```
ESPAÑOL:
- RESUMEN PROFESIONAL
- EXPERIENCIA PROFESIONAL
- COMPETENCIAS CLAVE
- HERRAMIENTAS Y PLATAFORMAS
- FORMACIÓN Y CERTIFICACIONES

INGLÉS:
- PROFESSIONAL SUMMARY
- PROFESSIONAL EXPERIENCE
- KEY COMPETENCIES
- TOOLS & PLATFORMS
- EDUCATION & CERTIFICATIONS
```

**NO traducir:**
- Nombres de empresas
- Nombres de certificaciones (ej: "SAFe SPC")
- Nombres propios

---

## 🔄 PROCESO DE GENERACIÓN (PASO A PASO)

### PASO 1: Carga de Datos

**Si usas CONTEXT_FILE:**
1. Leer `context_{SESSION_ID}.yaml`
2. Extraer:
   - Keywords críticos con frecuencia objetivo
   - Gaps y estrategias de mitigación
   - Fortalezas clave
   - Experiencia a priorizar

**Si NO usas CONTEXT_FILE:**
1. Analizar JD_COMPLETA para extraer keywords
2. Usar keywords, gaps y fortalezas proporcionados manualmente

### PASO 2: Optimización de Contenido

**2.1 PROFESSIONAL SUMMARY:**
```
Template:
{Título profesional} con {X} años de experiencia liderando {área clave} 
en {industrias}. Especializado en {competencia core 1}, {competencia core 2} 
y {competencia core 3}. Historial comprobado de {logro macro 1 con métrica} 
y {logro macro 2 con métrica}. Experto en {metodologías/frameworks de la JD} 
con enfoque en {value proposition alineado con JD}.
```

**Checklist:**
- [ ] Incluye 10-15 keywords críticas de JD
- [ ] Menciona años de experiencia exactos
- [ ] Contiene al menos 2 métricas de impacto
- [ ] Alineado con título/nivel de la JD
- [ ] 3-5 líneas máximo

**2.2 EXPERIENCIA PROFESIONAL:**

Para cada rol (priorizados según relevancia):

```
[EMPRESA] | [Ciudad, País]
[Cargo] | [Mes Año] - [Mes Año / Presente]

• [Logro #1 con mayor match a JD]: {verbo acción} + {contexto} + {resultado}
  → Incluir: 2-3 keywords de JD + métrica cuantificable

• [Logro #2]: {impacto en negocio/equipo}
  → Incluir: metodología/framework mencionado en JD

• [Logro #3]: {scope del rol - # equipos/personas/presupuesto}
  → Incluir: keywords de liderazgo/gestión

[Máximo 4-6 bullets para roles prioritarios]
[Máximo 2 bullets para roles antiguos]
```

**Fórmula STAR comprimida:**
```
[VERBO ACCIÓN] + [QUÉ HICISTE] + [CÓMO] + [RESULTADO CUANTIFICADO]

Ejemplo:
"Lideré transformación ágil de 28 equipos implementando SAFe 5.0, reduciendo 
time-to-market en 40% y mejorando satisfacción del cliente de 65% a 89% en 18 meses"
```

**2.3 HABILIDADES TÉCNICAS:**

Organizar por categorías (match 100% con JD):

```
Metodologías Ágiles: {lista exacta de JD} + {complementarias}
Frameworks & Escalado: {frameworks específicos de JD}
Herramientas: {stack tecnológico de JD} + {complementarias}
Liderazgo & Gestión: {soft skills clave de JD}
Idiomas: {nivel específico según Marco Común Europeo}
```

**2.4 CERTIFICACIONES:**

```
• {Nombre Completo} ({Sigla}) - {Institución} - {Año}

Ejemplo:
• Professional Scrum Master II (PSM II) - Scrum.org - 2023
• SAFe 5 Program Consultant (SPC) - Scaled Agile - 2022

[Ordenar por relevancia para JD, no cronológicamente]
```

### PASO 3: Generación del DOCX

**⚠️ NO generes código Python para crear el DOCX. El conversor ya existe en Node.js.**

El script `scripts/md_to_docx_v2.js` toma el Markdown generado y produce automáticamente el DOCX con el estilo correcto. Solo necesitas asegurarte de que el Markdown esté bien formateado.

**3.1 Estructura de Markdown esperada por el conversor:**
```markdown
# NOMBRE COMPLETO EN MAYÚSCULAS

Ciudad, País  |  +Teléfono  |  email@domain.com  |  LinkedIn: url

---

## PROFESSIONAL SUMMARY
Párrafo del summary...

## AI PRODUCT WORK  ← sección CONDICIONAL — leer criterios antes de incluir

⚠️ CRITERIOS DE USO — solo incluir esta sección si SE CUMPLEN AMBAS condiciones:
  1. El trabajo es VERDADERAMENTE INDEPENDIENTE: proyectos freelance propios, herramientas
     personales construidas fuera de un empleador, experimentos IA como consultor autónomo.
  2. La JD valora explícitamente trabajo independiente, side projects, o AI fluency hands-on
     que no puede demostrarse suficientemente dentro de la experiencia laboral.

❌ NO incluir si el trabajo de IA fue realizado DENTRO de un rol de empleado (aunque sea
   innovador o especial). En ese caso, ese trabajo va como bullet en PROFESSIONAL EXPERIENCE
   bajo la empresa correspondiente.

✅ Ejemplos válidos para esta sección:
   - Herramienta de automatización construida personalmente (fuera del horario laboral)
   - Prototipo IA desarrollado como consultor independiente para cliente propio
   - Proyecto open source o experimento personal con LLMs/APIs

❌ Ejemplos que NO van aquí:
   - Piloto IA liderado como empleado de BBVA → va en BBVA dentro de PROFESSIONAL EXPERIENCE
   - Proyecto de automatización encargado por tu empleador → va en PROFESSIONAL EXPERIENCE

### Nombre Proyecto — Subtítulo descriptivo
**Contexto:** breve descripción del proyecto y año
**Rol:** qué hiciste específicamente
**Herramientas:** stack utilizado
**Impacto:** resultado medible o aprendizaje clave

## PROFESSIONAL EXPERIENCE
### EMPRESA | Ciudad, País
**Cargo** | Mes Año - Mes Año

• bullet de logro cuantificado
• bullet de logro cuantificado

## KEY COMPETENCIES
**Categoría:** item1, item2, item3

## EDUCATION & CERTIFICATIONS
Institución — Grado/Cert — Año

## LANGUAGES
- Idioma: Nivel
```

**3.2 Referencia de colores aplicados automáticamente:**
```javascript
// Estos colores se aplican solos — no hace falta especificarlos en el MD
C_NAME    = "1F3864"  // Nombre del candidato
C_SECTION = "1F4E79"  // Headers de sección (##)
C_DIVIDER = "2E75B6"  // Línea decorativa bajo headers
C_AI      = "1B5E20"  // Label "AI PRODUCT WORK"
```

**3.3 Idioma de los headers — REGLA:**
El idioma del CV debe coincidir con el idioma de la JD.
El conversor detecta automáticamente el idioma según los headers que uses y aplica los títulos de sección correspondientes en el DOCX.

REGLA: Si la JD está en ESPAÑOL → usar headers en ESPAÑOL. Si la JD está en INGLÉS → usar headers en INGLÉS.

```
ESPAÑOL (JD en español):          INGLÉS (JD en inglés):
## RESUMEN PROFESIONAL            ## PROFESSIONAL SUMMARY
## EXPERIENCIA PROFESIONAL        ## PROFESSIONAL EXPERIENCE
## COMPETENCIAS CLAVE             ## KEY COMPETENCIES
## FORMACIÓN Y CERTIFICACIONES    ## EDUCATION & CERTIFICATIONS
## IDIOMAS                        ## LANGUAGES
```

NOTA: El layout de cada entrada de experiencia es:
  Línea 1: ### EMPRESA | Ciudad, País
  Línea 2: **Cargo** | Mes Año – Mes Año   ← fecha va en la misma línea que el cargo

**3.4 Verificar longitud:**
```
Si excede 2 páginas en el Markdown:
1. Condensar roles antiguos (máx 2 bullets)
2. Agrupar certificaciones en una línea
3. Filtrar competencias no relacionadas con JD
4. Omitir roles >10 años si no aportan keywords críticos
```

**3.5 Comando de conversión:**
```bash
node scripts/md_to_docx_v2.js outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.md
# El DOCX se crea automáticamente en la misma carpeta outputs/
```

### PASO 4: Verificación Final

**Checklist de calidad:**
- [ ] Longitud ≤ 2 páginas
- [ ] Idioma correcto (mismo que JD)
- [ ] Márgenes: 0.75 in (1.9 cm) en todos los lados
- [ ] Fuente Calibri en todo el documento
- [ ] Tamaños de fuente correctos (18pt nombre, 12pt headers, 9.5pt body/bullets)
- [ ] Paleta navy/blue aplicada (nombre, headers, separadores)
- [ ] Bullets nativos Word (no texto "•")
- [ ] Formato visual idéntico a `templates/CV_Template_v2.docx`
- [ ] Keywords críticos presentes (80% coincidencia)
- [ ] Contenido 100% fiel al CV original (solo reframing, no invención)
- [ ] Sin errores ortográficos ni gramaticales

---

## 📤 OUTPUT FINAL

**Archivo:** `outputs/CV_{CANDIDATE}_{POSITION_SLUG}.docx`
**Ruta completa:** `/Users/jgonzalesh/Apps/gihub-repos/easy-job-apply-ai/outputs/CV_{CANDIDATE}_{POSITION_SLUG}.docx`

**Ubicación:** `./outputs/`

**Características:**
- ✅ Máximo 2 páginas
- ✅ Formato profesional compatible con ATS
- ✅ Keywords optimizados (80/20 rule)
- ✅ Contenido priorizado por relevancia a JD
- ✅ Idioma correcto (español/inglés según JD)
- ✅ Listo para aplicar sin modificaciones

---

## 🚨 ERRORES COMUNES A EVITAR

❌ **NO HAGAS ESTO:**
1. Usar márgenes default de Word (2.54 cm) → Deben ser 0.75 in (script lo hace automático)
2. Generar CV en inglés cuando JD está en español (o viceversa)
3. Intentar crear el DOCX con Python → usar `node scripts/md_to_docx_v2.js`
4. Usar fuente Arial → es Calibri en toda la v2
5. Exceder 2 páginas
6. Inventar experiencia no presente en CV_ORIGINAL
7. Omitir keywords críticos de la JD
8. Incluir competencias/herramientas no relacionadas con JD

✅ **SÍ HAZLO:**
1. Generar Markdown limpio con la estructura exacta que espera `md_to_docx_v2.js`
2. Detectar idioma de JD y usar los headers de sección en el idioma correcto
3. Aplicar tamaños de fuente correctos en el MD: el script aplica 18pt nombre, 12pt headers, 9.5pt body
4. Priorizar contenido más relevante a la JD
5. Condensar roles antiguos si es necesario (máx 2 bullets)
6. Verificar densidad de keywords (80/20)
7. Mantener métricas cuantificadas en bullets
8. Agrupar certificaciones para ahorrar espacio
9. Ejecutar `node scripts/md_to_docx_v2.js` después de guardar el .md

---

## 📝 EJEMPLO DE TRANSFORMACIÓN

### ANTES (CV Original - Genérico):

```
EXPERIENCIA

BBVA Perú
Agile Coach | 2022 - 2024

- Trabajé con diferentes equipos de la organización
- Apoyé en la implementación de metodologías ágiles
- Realicé capacitaciones sobre Scrum
- Participé en reuniones con stakeholders
```

### DESPUÉS (CV Optimizado - ATS Friendly):

```
EXPERIENCIA PROFESIONAL

BBVA PERÚ | Lima, Perú
Agile Coach Expert | Enero 2022 - Diciembre 2024

• Lideré transformación ágil de 28 equipos multifuncionales implementando Scrum, 
  Kanban y SAFe 5.0, logrando reducción de 40% en time-to-market y mejora de 35% 
  en NPS de clientes internos en 24 meses

• Diseñé e implementé framework de OKRs para 4 VPs (120+ colaboradores), alineando 
  objetivos estratégicos con ejecución táctica y mejorando visibilidad de entrega 
  de valor en 50%

• Facilité diagnósticos de madurez organizacional en 6 unidades de negocio, 
  identificando brechas críticas y planteando roadmaps de evolución que 
  incrementaron métricas ágiles (velocity, lead time) en promedio 30%

• Capacité a 80+ líderes y practicantes en Scrum, Kanban y Lean, alcanzando 
  tasa de adopción de 85% y certificación de 60% de participantes
```

**Mejoras:**
- Keywords: +650% (2 → 15+)
- Métricas: 0 → 8 cuantificables
- Orientación: Tareas → Resultados de negocio
- Verbos: Débil → Fuerte (lideré, diseñé, facilité)

---

## ✅ CONFIRMACIÓN FINAL Y GENERACIÓN DEL DOCX

Antes de generar el CV, verificar:

1. ¿Leíste el CONTEXT_FILE o tienes los datos necesarios? → ✅
2. ¿Identificaste keywords críticos de la JD? → ✅
3. ¿Sabes qué experiencia priorizar? → ✅
4. ¿Detectaste el idioma correcto (español/inglés)? → ✅
5. ¿Tienes clara la estrategia si excede 2 páginas? → ✅

**Si respondiste ✅ a todo, procede con los siguientes pasos:**

---

### 🤖 PROCESO AUTOMÁTICO DE GENERACIÓN DOCX

**PASO 1: Generar Contenido Optimizado en Markdown**
- Crea el contenido del CV siguiendo todas las reglas de optimización
- Asegura que todos los keywords estén en las frecuencias correctas
- Verifica que sea máximo 2 páginas de contenido

**PASO 2: Guardar Markdown en outputs/**
- **Nombre:** `CV_{APELLIDO}_{EMPRESA}_{POSICION}.md`
- **Ruta completa:** `/Users/jgonzalesh/Apps/gihub-repos/easy-job-apply-ai/outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.md`
- **Ubicación:** `outputs/`
- Mantener como referencia

**PASO 3: Convertir Markdown a DOCX usando el Script Node.js**

```bash
# El script lee el .md en outputs/ y crea el .docx automáticamente en la misma carpeta
node scripts/md_to_docx_v2.js outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.md
```

**El script `md_to_docx_v2.js`:**
- Lee el archivo Markdown de `outputs/`
- Aplica estilo profesional: Calibri, paleta navy/blue, márgenes 0.75 in
- Bullets nativos Word (ATS-friendly)
- Guarda el DOCX automáticamente en `outputs/` con el mismo nombre base
- Template de referencia: `templates/CV_Template_v2.docx`

**PASO 4: Validar Output**
- Verificar que el archivo `.docx` se creó en `outputs/`
- Confirmar que el formato es correcto (márgenes, fuentes, espaciado)
- Validar que sea máximo 2 páginas

**PASO 5: Entregar al Usuario**
- Proporcionar link de descarga del DOCX
- Incluir resumen de keywords validados
- Confirmar que está listo para aplicar sin formateo manual

---

## 📌 CONTROL DE VERSIONES

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-01-20 | Versión inicial (Fase 2 separada) |
| 2.0 | 2026-01-21 | Fusión Fase 2+3, soporte context file, límite 2 páginas, detección idioma |
| 2.1 | 2026-01-21 | Integración con script Python automatizado para generación DOCX directa |
| 2.2 | 2026-03-09 | Migración a Node.js (`md_to_docx_v2.js`), fuente Calibri, márgenes 0.75in, paleta navy/blue, bullets nativos Word |

---

**Desarrollado por:** Julio Gonzales - Numen Coaching & Consulting
**Para:** Generación de CVs optimizados para ATS sin comprometer integridad  
**Requisito:** Completar Fase 1 con recomendación "PROCEDER"  
**Licencia:** Uso personal

---
