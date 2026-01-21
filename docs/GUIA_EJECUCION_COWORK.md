# 🚀 GUÍA DE EJECUCIÓN - Sistema de Generación de CVs

**Para ejecutar en:** Cowork, Claude, ChatGPT, Gemini, etc.

---

## 📋 PREPARACIÓN

Antes de comenzar, ten listos:
1. ✅ Job Description (JD) completa de la posición
2. ✅ Tu CV actual (español o inglés según JD)
3. ✅ Tu expectativa salarial
4. ✅ Modalidad de trabajo (Remoto LATAM / Híbrido Lima / Lima Perú)
5. ✅ Moneda de la oferta (USD / PEN / EUR / etc.)

---

## 🎯 FASE 1: ANÁLISIS ESTRATÉGICO

### Paso 1: Abrir el Prompt de Fase 1

Abre el archivo: `prompts/prompt_fase1_analisis_estrategico_v2.md`

### Paso 2: Completar los Inputs

Reemplaza las secciones entre `{}` con tus datos reales:

```yaml
JD_TEXT: |
  {Pegar aquí la descripción completa del puesto}

CV_TEXT: |
  {Copiar contenido de resumes_txt/CV_Julio_Gonzales - SPA.txt}
  # O resumes_txt/CV - Julio Gonzales - ENG.txt si JD está en inglés

SALARY_EXPECTATIONS: "S/ 15,000 - S/ 17,000"
  # Ajustar según tu expectativa en la moneda de la oferta

LOCATION: "Remoto LATAM"
  # Opciones: "Remoto LATAM" | "Híbrido (Lima)" | "Lima, Perú"

CURRENCY: "PEN"
  # Ajustar según moneda de la oferta: "USD" | "PEN" | "EUR" | etc.

ANALISIS_SALARIAL_DETALLADO: true
  # Siempre true para análisis completo
```

### Paso 3: Copiar TODO el Prompt

1. Copia **TODO** el contenido del archivo `prompt_fase1_analisis_estrategico_v2.md` (desde el inicio hasta el final)
2. Asegúrate de haber completado los inputs con tus datos reales

### Paso 4: Pegar en Cowork

1. Abre Cowork (o tu LLM preferido)
2. Pega el prompt completo
3. Envía

### Paso 5: Guardar los Outputs

El LLM generará **2 archivos**:

#### Output 1: Context File (YAML)
- **Nombre:** `context_YYYYMMDD_EMPRESA_POSICION.yaml`
- **Guardar en:** `sessions/`
- **Contiene:** Keywords, gaps, fortalezas, datos estructurados

#### Output 2: Análisis Estratégico (Markdown)
- **Nombre:** `analisis_YYYYMMDD_EMPRESA_POSICION.md`
- **Guardar en:** `sessions/`
- **Contiene:** Análisis completo, decisión GO/NO-GO, benchmark salarial

### Paso 6: Revisar la Decisión

Lee el análisis y busca la sección **"DECISIÓN FINAL"**:

- ✅ **PROCEDER** → Continúa a Fase 2
- ⚠️ **RECONSIDERAR** → Evalúa si cerrar gaps o proceder
- ❌ **NO_APLICAR** → **DETENTE AQUÍ** - No ejecutes Fase 2

---

## 📝 FASE 2: GENERACIÓN DE CV OPTIMIZADO

**⚠️ IMPORTANTE:** Solo ejecuta Fase 2 si Fase 1 recomendó **PROCEDER**

### Paso 1: Abrir el Prompt de Fase 2

Abre el archivo: `prompts/prompt_fase2_generacion_cv_docx_v2.md`

### Paso 2: Completar los Inputs

```yaml
CONTEXT_FILE: |
  {Copiar TODO el contenido del archivo context_YYYYMMDD_EMPRESA_POSICION.yaml generado en Fase 1}

CV_ORIGINAL: |
  {Copiar contenido de resumes_txt/CV_Julio_Gonzales - SPA.txt}
  # O resumes_txt/CV - Julio Gonzales - ENG.txt según idioma de JD

JD_COMPLETA: |
  {Pegar la Job Description completa - la misma que usaste en Fase 1}

TEMPLATE_DOCX: "./templates/CV_Template.docx"
  # Ruta al template (opcional)

IDIOMA_OUTPUT: "auto"
  # "auto" = detectar de JD | "español" | "inglés"
```

### Paso 3: Copiar TODO el Prompt

1. Copia **TODO** el contenido del archivo `prompt_fase2_generacion_cv_docx_v2.md`
2. Asegúrate de haber completado los inputs con tus datos reales
3. **Importante:** Incluye el CONTEXT_FILE completo (todo el YAML de Fase 1)

### Paso 4: Pegar en Cowork

1. En la **misma conversación** de Cowork (o nueva si prefieres)
2. Pega el prompt completo de Fase 2
3. Envía

### Paso 5: Guardar el Output

El LLM generará el **CV optimizado**:

- **Formato:** Markdown (para convertir a DOCX/PDF)
- **Nombre:** `CV_{APELLIDO}_{EMPRESA}_{POSICION}.md`
- **Guardar en:** `outputs/`
- **Características:**
  - Máximo 2 páginas
  - Keywords optimizados
  - ATS-friendly
  - Idioma correcto

### Paso 6: Convertir a DOCX/PDF

**Opción A - Manual (Recomendado):**
1. Copiar contenido del CV generado
2. Pegar en Google Docs o Word
3. Aplicar formato:
   - Márgenes: 1.22 cm
   - Fuente: Arial
   - Nombre: 18pt Bold
   - Headers: 12pt Bold UPPERCASE
   - Contenido: 9-9.5pt
4. Exportar como PDF o DOCX

**Opción B - Pandoc (Si está instalado):**
```bash
pandoc outputs/CV_APELLIDO_EMPRESA.md -o outputs/CV_APELLIDO_EMPRESA.pdf
```

---

## 📊 EJEMPLO COMPLETO: ATTACH GROUP

### Fase 1 - Inputs de Ejemplo

```yaml
JD_TEXT: |
  Attach Group: tecnología y estrategia para llevar los negocios al siguiente nivel.
  
  Posición: Agile Coach Entry (AI Transformation)
  
  Requisitos:
  * Experiencia mínima de 2 años como Scrum Master (indispensable)
  * Experiencia en manejo de OKRs
  * Conocimiento de agilidad escalada (SAFe, LeSS, etc.) - Excluyente
  [... resto de la JD ...]

CV_TEXT: |
  {Contenido completo de resumes_txt/CV_Julio_Gonzales - SPA.txt}

SALARY_EXPECTATIONS: "S/ 15,000 - S/ 17,000"
LOCATION: "Híbrido (Lima)"
CURRENCY: "PEN"
ANALISIS_SALARIAL_DETALLADO: true
```

### Outputs Esperados de Fase 1

1. `sessions/context_20260121_AttachGroup_AgileCoach.yaml`
2. `sessions/analisis_20260121_AttachGroup_AgileCoach.md`

**Decisión esperada:** PROCEDER ✅

### Fase 2 - Inputs de Ejemplo

```yaml
CONTEXT_FILE: |
  {TODO el contenido de context_20260121_AttachGroup_AgileCoach.yaml}

CV_ORIGINAL: |
  {Contenido completo de resumes_txt/CV_Julio_Gonzales - SPA.txt}

JD_COMPLETA: |
  {Misma JD de Fase 1}

IDIOMA_OUTPUT: "auto"
```

### Output Esperado de Fase 2

`outputs/CV_Gonzales_AttachGroup_AgileCoach.md`

---

## ✅ CHECKLIST DE EJECUCIÓN

### Antes de Empezar
- [ ] Tengo la JD completa
- [ ] Tengo mi CV actualizado en `resumes_txt/`
- [ ] Sé mi expectativa salarial
- [ ] Identifiqué la moneda de la oferta
- [ ] Identifiqué la modalidad de trabajo

### Fase 1
- [ ] Abrí `prompts/prompt_fase1_analisis_estrategico_v2.md`
- [ ] Completé todos los inputs con mis datos reales
- [ ] Copié TODO el prompt
- [ ] Pegué en Cowork y ejecuté
- [ ] Guardé `context_*.yaml` en `sessions/`
- [ ] Guardé `analisis_*.md` en `sessions/`
- [ ] Leí el análisis completo
- [ ] Verifiqué la decisión GO/NO-GO

### Fase 2 (Solo si PROCEDER)
- [ ] Abrí `prompts/prompt_fase2_generacion_cv_docx_v2.md`
- [ ] Copié TODO el context file de Fase 1
- [ ] Completé todos los inputs
- [ ] Copié TODO el prompt
- [ ] Pegué en Cowork y ejecuté
- [ ] Guardé CV generado en `outputs/`
- [ ] Convertí a DOCX/PDF
- [ ] Revisé formato (2 páginas, márgenes, fuente)

### Después de Generar CV
- [ ] Revisé keywords (sin errores)
- [ ] Verifiqué que sea máximo 2 páginas
- [ ] Actualicé LinkedIn con keywords
- [ ] Preparé respuestas para entrevista
- [ ] Apliqué a la posición

---

## 🚨 ERRORES COMUNES

### Error 1: "El LLM no genera los archivos"
**Solución:** Asegúrate de copiar **TODO** el prompt, incluyendo las instrucciones de outputs.

### Error 2: "El context file está incompleto"
**Solución:** Verifica que el LLM generó el YAML completo. Si no, pídele que complete.

### Error 3: "El CV es muy largo (>2 páginas)"
**Solución:** Pide al LLM que condense la experiencia 2007-2017 o elimine bullets menos relevantes.

### Error 4: "Faltan keywords críticos"
**Solución:** Revisa el análisis de keywords y pide al LLM que agregue los faltantes.

### Error 5: "El idioma no es el correcto"
**Solución:** Especifica `IDIOMA_OUTPUT: "español"` o `"inglés"` en lugar de `"auto"`.

---

## 💡 TIPS PARA MEJORES RESULTADOS

1. **Usa la misma conversación** para Fase 1 y Fase 2 (el LLM tiene contexto)
2. **Revisa el análisis salarial** antes de aplicar
3. **Personaliza la carta de presentación** usando insights del análisis
4. **Actualiza LinkedIn** con keywords identificados
5. **Prepara respuestas** para gaps identificados en Fase 1

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa `docs/GUIA_RAPIDA.md`
2. Consulta `docs/CONFIGURACION_PERSONAL.md`
3. Verifica que los inputs estén completos
4. Confirma que el YAML del context file sea válido

---

**Sistema:** Easy Job Apply AI v2.0  
**Última actualización:** 21 de enero, 2026
