# GUÍA PARA COWORK/LLMs: Cómo Usar Este Proyecto

## 🚨 IMPORTANTE: LEE ESTO PRIMERO

**Este proyecto YA TIENE toda la infraestructura necesaria.** NO necesitas crear nuevos scripts.

---

## 📁 Archivos y Scripts Existentes

### Scripts Python (NO crear nuevos)

1. **`scripts/md_to_docx.py`** - Convierte Markdown a DOCX con formato profesional
   - Aplica márgenes exactos (1.22 cm)
   - Configura fuentes (Arial, tamaños específicos)
   - Genera formato ATS-friendly

2. **`scripts/pipeline.py`** - Pipeline automatizado completo
   - Prepara inputs para Fase 1
   - Valida context files
   - Coordina conversión MD → DOCX en Fase 2

3. **`scripts/validate_yaml.py`** - Valida context files YAML

4. **`scripts/config.py`** - Configuración centralizada de rutas

---

## 🎯 TU TAREA EN CADA FASE

### FASE 1: Análisis Estratégico

**✅ LO QUE DEBES HACER:**
1. Leer el JD y CV proporcionados
2. Generar **DOS archivos**:
   - `sessions/context_{SESSION_ID}.yaml` - Context file estructurado
   - `sessions/analisis_{SESSION_ID}.md` - Análisis para revisión humana

**❌ LO QUE NO DEBES HACER:**
- NO crear scripts Python
- NO intentar ejecutar el pipeline
- NO generar el CV en esta fase

---

### FASE 2: Generación de CV

**✅ LO QUE DEBES HACER:**
1. Leer el context file de Fase 1
2. Generar **UN archivo Markdown**:
   - `outputs/CV_{PRIMER_NOMBRE}{PRIMER_APELLIDO}_{EMPRESA}_{POSICION}.md`
   - Ejemplo: `CV_JulioGonzales_Entel_AgileCoach.md`
   - Contenido optimizado con keywords
   - Máximo 2 páginas de contenido

**❌ LO QUE NO DEBES HACER:**
- **NO crear un script Python** para generar DOCX
- **NO intentar ejecutar** `md_to_docx.py`
- **NO generar el archivo DOCX** directamente

**📌 DESPUÉS DE GENERAR EL MARKDOWN:**

Informa al usuario que ejecute:
```bash
python3 scripts/md_to_docx.py outputs/CV_JulioGonzales_Entel_AgileCoach.md
```

El script `md_to_docx.py` **ya existe** y se encargará de:
- Convertir el Markdown a DOCX
- Aplicar formato profesional
- Guardar en `outputs/`

---

## 📝 Formato del Markdown (Fase 2)

```markdown
# NOMBRE COMPLETO DEL CANDIDATO

Ciudad, País | +Teléfono | email@domain.com | LinkedIn: url

---

## PROFESSIONAL SUMMARY
[3-5 líneas optimizadas con keywords...]

## PROFESSIONAL EXPERIENCE

**EMPRESA** | Ciudad, País  
Cargo | Mes Año - Mes Año

• [Logro con métricas y keywords...]
• [Logro con métricas y keywords...]
• [Logro con métricas y keywords...]

## KEY COMPETENCIES
[Competencias alineadas con JD...]

## EDUCATION & CERTIFICATIONS
[Formación y certificaciones relevantes...]

## LANGUAGES
[Idiomas con niveles...]
```

---

## 🔄 Flujo Completo

```
FASE 1 (Cowork)
├── Input: JD + CV + Expectativas
├── Output 1: sessions/context_{SESSION_ID}.yaml
└── Output 2: sessions/analisis_{SESSION_ID}.md

↓

REVISIÓN (Usuario)
└── ¿Recomendación = PROCEDER?
    ├── SÍ → Continuar a Fase 2
    └── NO → Terminar aquí

↓

FASE 2 (Cowork)
├── Input: context_{SESSION_ID}.yaml + CV + JD
└── Output: outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.md

↓

CONVERSIÓN (Usuario ejecuta script)
└── python3 scripts/md_to_docx.py outputs/CV_*.md
    └── Output: outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.docx
```

---

## 🚫 Errores Comunes a Evitar

### ❌ NO HAGAS ESTO:
1. Crear un nuevo script Python para convertir MD a DOCX
2. Intentar ejecutar `md_to_docx.py` desde el prompt
3. Generar el archivo DOCX directamente
4. Crear nuevas funciones de conversión
5. Proponer "mejoras" al script existente sin que se soliciten

### ✅ SÍ HAZLO:
1. Generar solo el archivo Markdown optimizado
2. Informar al usuario que ejecute el script existente
3. Enfocarte en la optimización del contenido (keywords, métricas, logros)
4. Respetar el límite de 2 páginas de contenido
5. Seguir el formato de Markdown especificado

---

## 📚 Documentación de Referencia

- **README.md** - Documentación completa del proyecto
- **prompts/prompt_fase1_analisis_estrategico_v2.md** - Instrucciones Fase 1
- **prompts/prompt_fase2_generacion_cv_docx_v2.md** - Instrucciones Fase 2
- **GUIA_USO_CLI.md** - Guía de uso del pipeline CLI

---

## ✅ Checklist Rápido

**Antes de empezar Fase 1:**
- [ ] ¿Leí este archivo (COWORK_README.md)?
- [ ] ¿Entiendo que NO debo crear scripts Python?
- [ ] ¿Sé que solo debo generar archivos YAML y MD?

**Antes de empezar Fase 2:**
- [ ] ¿Tengo el context file de Fase 1?
- [ ] ¿Entiendo que solo debo generar el Markdown?
- [ ] ¿Sé que el usuario ejecutará el script de conversión?

---

**Versión:** 1.0  
**Fecha:** 21 de enero, 2026  
**Propósito:** Evitar que Cowork intente crear scripts que ya existen
