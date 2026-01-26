# Prompts del Sistema

Este directorio contiene los prompts oficiales para usar con Cowork u otros LLMs.

## 📋 Prompts Activos

### Fase 1: Análisis Estratégico
**Archivo:** `prompt_fase1_analisis_estrategico_v2.md`

**Propósito:** Analizar el fit entre tu perfil y una posición, generar recomendación GO/NO-GO

**Outputs:**
- `sessions/context_{SESSION_ID}.yaml` - Context file para Fase 2
- `sessions/analisis_{SESSION_ID}.md` - Análisis detallado para revisión

**Uso:**
1. Abre el archivo
2. Completa los inputs (JD, CV, expectativas salariales, etc.)
3. Copia TODO el contenido
4. Pégalo en Cowork
5. Revisa los outputs generados

---

### Fase 2: Generación de CV Optimizado
**Archivo:** `prompt_fase2_generacion_cv_docx_v2.md`

**Propósito:** Generar CV optimizado en Markdown (máx 2 páginas, ATS-friendly)

**Prerequisito:** Haber ejecutado Fase 1 con recomendación "PROCEDER"

**Outputs:**
- `outputs/CV_JulioGonzales_{EMPRESA}_{POSICION}.md` - CV optimizado en Markdown

**Uso:**
1. Abre el archivo
2. Completa los inputs (context file, CV original, JD completa)
3. Copia TODO el contenido
4. Pégalo en Cowork
5. Cowork genera el Markdown
6. **TÚ ejecutas:** `python3 scripts/md_to_docx.py outputs/CV_*.md`

---

## 🗂️ Archivos Deprecados

Los siguientes archivos han sido deprecados y movidos a `docs/04-archive/`:

- ~~`prompt_fase1_COWORK_DIRECTO.md`~~ → `docs/04-archive/prompt_fase1_COWORK_DIRECTO_DEPRECATED.md`
  - **Razón:** Intentaba automatizar todo el flujo, pero generaba problemas
  - **Reemplazo:** Usar `prompt_fase1_analisis_estrategico_v2.md` + `prompt_fase2_generacion_cv_docx_v2.md`

---

## 📌 Notas Importantes

### Para Cowork/LLMs

**LEE PRIMERO:** [`COWORK_README.md`](../COWORK_README.md) en la raíz del proyecto

**Reglas clave:**
- ✅ Genera SOLO archivos Markdown en Fase 2
- ❌ NO intentes crear scripts Python
- ❌ NO intentes ejecutar `md_to_docx.py`
- ❌ NO intentes generar DOCX directamente

El script `scripts/md_to_docx.py` **ya existe** y el usuario lo ejecutará manualmente.

---

## 🔄 Flujo Recomendado

```
FASE 1 (prompt_fase1_analisis_estrategico_v2.md)
├── Input: JD + CV + Expectativas
└── Output: context_*.yaml + analisis_*.md

↓ (Revisar recomendación)

FASE 2 (prompt_fase2_generacion_cv_docx_v2.md)
├── Input: context_*.yaml + CV + JD
└── Output: CV_JulioGonzales_*.md

↓ (Usuario ejecuta script)

CONVERSIÓN
└── python3 scripts/md_to_docx.py outputs/CV_*.md
    └── Output: CV_JulioGonzales_*.docx ✅
```

---

**Última actualización:** 21 de enero, 2026  
**Versión:** 2.1
