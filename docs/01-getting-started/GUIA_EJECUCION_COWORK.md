# 🚀 GUÍA DE EJECUCIÓN - Sistema de Generación de CVs

**Para ejecutar en:** Cowork, Claude, ChatGPT, Gemini, etc.

---

## ⚠️ IMPORTANTE: LIMITACIONES DE COWORK/LLMs

**Cowork NO tiene acceso automático a tus archivos.** Debes:
1. ✅ **Copiar manualmente** el contenido de los archivos que necesites
2. ✅ **Pegar TODO el prompt completo** - Cowork no lee archivos del proyecto
3. ✅ **Incluir TODOS los inputs** - No asumas que Cowork sabe dónde están tus archivos
4. ✅ **Especificar rutas absolutas** cuando pidas que genere archivos

**Cowork NO lee:**
- ❌ Archivos de tu proyecto automáticamente
- ❌ Contenido de carpetas
- ❌ Referencias a archivos (debes copiar el contenido)

---

## 📋 PREPARACIÓN

Antes de comenzar, **ABRE Y COPIA** el contenido de estos archivos:

1. ✅ **Job Description (JD)** completa de la posición → Copia el texto completo
2. ✅ **Tu CV actual** → Abre `resumes_txt/CV_Julio_Gonzales - SPA.txt` o `CV - Julio Gonzales - ENG.txt` y copia TODO el contenido
3. ✅ **Tu expectativa salarial** → Ten claro el rango
4. ✅ **Modalidad de trabajo** → Remoto LATAM / Híbrido Lima / Lima Perú
5. ✅ **Moneda de la oferta** → USD / PEN / EUR / etc.

---

## 🎯 FASE 1: ANÁLISIS ESTRATÉGICO

### Paso 1: Abrir el Prompt de Fase 1

Abre el archivo: `prompts/prompt_fase1_analisis_estrategico_v2.md`

### Paso 2: Completar los Inputs MANUALMENTE

**CRÍTICO:** Debes **COPIAR Y PEGAR** el contenido real, no solo referencias.

```yaml
JD_TEXT: |
  {PEGAR AQUÍ TODO EL TEXTO DE LA JD - NO SOLO EL LINK O NOMBRE}
  # Ejemplo: Copia desde "Empresa X busca..." hasta el final de la oferta

CV_TEXT: |
  {COPIAR TODO EL CONTENIDO DEL ARCHIVO resumes_txt/CV_Julio_Gonzales - SPA.txt}
  # NO escribas solo "resumes_txt/CV_Julio_Gonzales - SPA.txt"
  # Debes ABRIR el archivo y COPIAR todo su contenido aquí

SALARY_EXPECTATIONS: "S/ 15,000 - S/ 17,000"
  # Ajustar según tu expectativa en la moneda de la oferta

LOCATION: "Remoto LATAM"
  # Opciones: "Remoto LATAM" | "Híbrido (Lima)" | "Lima, Perú"

CURRENCY: "PEN"
  # Ajustar según moneda de la oferta: "USD" | "PEN" | "EUR" | etc.

ANALISIS_SALARIAL_DETALLADO: true
  # Siempre true para análisis completo
```

### Paso 3: Copiar TODO el Prompt (Ya Completado)

1. Después de completar los inputs con el contenido REAL (no referencias)
2. Copia **TODO** el contenido del archivo `prompt_fase1_analisis_estrategico_v2.md` (desde línea 1 hasta el final)
3. Verifica que los inputs tengan el contenido completo (no solo nombres de archivos)

### Paso 4: Pegar en Cowork

1. Abre Cowork (o tu LLM preferido)
2. **Pega el prompt completo** (debe ser un texto MUY largo si incluiste JD y CV completos)
3. **IMPORTANTE:** Antes de enviar, verifica que:
   - ✅ La JD completa está pegada (no solo el link)
   - ✅ El CV completo está pegado (no solo el nombre del archivo)
   - ✅ Todos los demás inputs están completos
4. Envía

### Paso 5: Guardar los Outputs MANUALMENTE

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

### Paso 2: Completar los Inputs MANUALMENTE

**CRÍTICO:** Igual que en Fase 1, debes **COPIAR Y PEGAR** el contenido completo.

```yaml
CONTEXT_FILE: |
  {ABRIR sessions/context_YYYYMMDD_EMPRESA_POSICION.yaml Y COPIAR TODO SU CONTENIDO AQUÍ}
  # NO escribas solo "sessions/context_..."
  # Debes ABRIR el archivo YAML generado en Fase 1 y COPIAR todo su contenido

CV_ORIGINAL: |
  {COPIAR TODO EL CONTENIDO DEL ARCHIVO resumes_txt/CV_Julio_Gonzales - SPA.txt}
  # El MISMO CV que usaste en Fase 1
  # Debes ABRIR el archivo y COPIAR todo su contenido aquí

JD_COMPLETA: |
  {PEGAR LA MISMA JD COMPLETA QUE USASTE EN FASE 1}
  # Copia el texto completo de la oferta de trabajo

TEMPLATE_DOCX: "./templates/CV_Template.docx"
  # Ruta al template (opcional, puedes dejarlo así)

IDIOMA_OUTPUT: "auto"
  # "auto" = detectar de JD | "español" | "inglés"
```

### Paso 3: Copiar TODO el Prompt (Ya Completado)

1. Después de completar los inputs con el contenido REAL
2. Copia **TODO** el contenido del archivo `prompt_fase2_generacion_cv_docx_v2.md` (desde línea 1 hasta el final)
3. **Verifica que:**
   - ✅ El CONTEXT_FILE completo está pegado (todo el YAML)
   - ✅ El CV completo está pegado
   - ✅ La JD completa está pegada

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

### ❌ Error Crítico: "Cowork no leyó el prompt completo"
**Causa:** Cowork tiene límites de contexto y puede no procesar todo el prompt.
**Solución:** 
- Asegúrate de pegar TODO el prompt (desde línea 1 hasta el final)
- Si el prompt es muy largo, considera dividirlo en dos mensajes
- Verifica que Cowork haya leído las instrucciones de OUTPUT

### ❌ Error Crítico: "Cowork generó archivos en la raíz en lugar de sessions/ u outputs/"
**Causa:** Cowork no leyó las rutas absolutas o las ignoró.
**Solución:**
- Mueve manualmente los archivos:
  ```bash
  mv context_*.yaml sessions/
  mv analisis_*.md sessions/
  mv CV_*.md outputs/
  mv CV_*.docx outputs/
  ```
- En tu próximo prompt, **enfatiza** la ruta absoluta al inicio

### ❌ Error Crítico: "Cowork dice que no puede acceder a archivos"
**Causa:** Cowork NO tiene acceso a tus archivos locales.
**Solución:**
- **NO escribas** "usa el archivo resumes_txt/CV_Julio_Gonzales - SPA.txt"
- **SÍ copia** TODO el contenido del archivo y pégalo en el prompt
- Cowork solo puede trabajar con el texto que le pegues

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
