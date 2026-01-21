# 📁 Prompts - Sistema de Generación de CVs

Esta carpeta contiene los prompts para las diferentes fases del sistema.

---

## 🎯 ¿Qué prompt usar?

### Para Cowork (RECOMENDADO)

**Usa:** `prompt_fase1_COWORK_DIRECTO.md`

**Por qué:**
- ✅ Formato optimizado para Cowork
- ✅ Instrucciones imperativas (no hace preguntas)
- ✅ Estructura más simple
- ✅ Menos probabilidad de que Cowork pida inputs adicionales

**Cómo usar:**
1. Abre `prompt_fase1_COWORK_DIRECTO.md`
2. **REEMPLAZA** las secciones marcadas con `[PEGAR AQUÍ...]` con tu contenido real:
   - `[PEGAR AQUÍ LA JD COMPLETA]` → Copia toda la Job Description
   - `[PEGAR AQUÍ EL CV COMPLETO]` → Copia todo tu CV
   - `[EJEMPLO: USD 5,000 - 6,000]` → Tu expectativa salarial real
   - `[EJEMPLO: Remoto LATAM]` → Tu ubicación/modalidad
   - `[EJEMPLO: USD]` → Moneda de la oferta
3. Copia **TODO** el prompt (ya con tus datos)
4. Pega en Cowork y envía
5. Guarda los archivos generados en `sessions/`

---

### Para Claude/ChatGPT/Gemini (Alternativa)

**Usa:** `prompt_fase1_analisis_estrategico_v2.md`

**Por qué:**
- ✅ Más detallado y estructurado
- ✅ Mejor para LLMs con mayor contexto
- ✅ Incluye más instrucciones de calidad

**Cómo usar:**
1. Abre `prompt_fase1_analisis_estrategico_v2.md`
2. Busca la sección `## INPUTS REQUERIDOS`
3. **REEMPLAZA** los placeholders `{...}` con tu contenido real
4. Copia TODO el prompt
5. Pega en tu LLM y envía

---

## 📋 Comparación

| Característica | COWORK_DIRECTO | v2.md (Original) |
|----------------|----------------|------------------|
| **Optimizado para** | Cowork | Claude/ChatGPT/Gemini |
| **Longitud** | Más corto | Más largo |
| **Estructura** | Imperativa | Parametrizable |
| **Probabilidad de preguntas** | Baja | Media |
| **Nivel de detalle** | Medio | Alto |
| **Facilidad de uso** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🚨 Problema común: "Cowork me pide los datos de nuevo"

**Causa:** Estás usando `prompt_fase1_analisis_estrategico_v2.md` que tiene estructura parametrizable.

**Solución:** Usa `prompt_fase1_COWORK_DIRECTO.md` en su lugar.

---

## 📝 Fase 2

Para Fase 2, usa:
- `prompt_fase2_generacion_cv_docx_v2.md`

**Importante:** En Fase 2, SIEMPRE debes copiar:
1. El contenido completo del archivo YAML generado en Fase 1
2. Tu CV completo
3. La JD completa

---

## 💡 Tips

1. **Siempre copia contenido completo**, nunca solo nombres de archivos
2. **Verifica antes de enviar** que todos los placeholders estén reemplazados
3. **Guarda manualmente** los outputs en las carpetas correctas
4. **Si Cowork pregunta**, es porque no reemplazaste algún placeholder

---

**Última actualización:** 21 de enero, 2026
