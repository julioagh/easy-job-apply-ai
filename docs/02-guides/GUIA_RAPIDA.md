# 🚀 Guía Rápida - Sistema Optimizado de Generación de CVs

## 📊 Resumen del Sistema

**Objetivo:** Generar CVs optimizados para ATS solo cuando sea estratégicamente recomendable aplicar a una posición.

**Flujo:** 2 Fases con decisión condicional

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1: Análisis Estratégico                               │
│  Input: JD + CV + Expectativas Salariales                   │
│  Output: Análisis + Context File + Decisión GO/NO-GO        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  ¿PROCEDER?    │
              └────┬───────┬───┘
                   │       │
            SÍ ◄──┘       └──► NO
             │                  │
             ▼                  ▼
┌────────────────────┐   ┌──────────────┐
│  FASE 2:           │   │  TERMINAR    │
│  Generación CV     │   │  No aplicar  │
│  DOCX (2 páginas)  │   └──────────────┘
└────────────────────┘
```

---

## 📁 Archivos del Sistema

### Prompts Optimizados (v2.0)
- **`prompt_fase1_analisis_estrategico_v2.md`** - Análisis + Decisión GO/NO-GO
- **`prompt_fase2_generacion_cv_docx_v2.md`** - Generación directa de DOCX

### Prompts Anteriores (Deprecados)
- ~~`prompt_fase1_analisis_estrategico.md`~~ (v1.0)
- ~~`prompt_fase2_optimizacion_cv.md`~~ (v1.0 - ahora fusionado en Fase 2 v2.0)
- ~~`prompt_fase3_generacion_cv.md`~~ (v1.0 - ahora fusionado en Fase 2 v2.0)

### Documentación
- **`RECOMENDACIONES_OPTIMIZACION.md`** - Análisis detallado de cambios
- **`GUIA_RAPIDA.md`** - Este documento

---

## 🎯 Cómo Usar el Sistema

### Paso 1: Ejecutar Fase 1 (Análisis Estratégico)

1. Abre `prompts/prompt_fase1_analisis_estrategico_v2.md`
2. Completa los inputs requeridos:
   ```yaml
   JD_TEXT: |
     {Pegar descripción completa del puesto}
   
   CV_TEXT: |
     {Copiar contenido de templates/CV_Template.docx}
   
   SALARY_EXPECTATIONS: "USD 4,000 - USD 5,500"
     # Ajustar moneda según la oferta (USD/PEN/EUR/etc.)
   
   LOCATION: "Remoto LATAM"
     # Opciones: "Remoto LATAM" | "Híbrido (Lima)" | "Lima, Perú"
   
   CURRENCY: "USD"
     # Ajustar según moneda de la oferta
   
   ANALISIS_SALARIAL_DETALLADO: true
     # Siempre true para análisis completo
   ```
3. Ejecuta el prompt en tu LLM (Claude, ChatGPT, Gemini)
4. Revisa los outputs:
   - `sessions/analisis_{SESSION_ID}.md` - Para tu revisión
   - `sessions/context_{SESSION_ID}.yaml` - Para Fase 2 (ahorra tokens)

**Decisión posible:**
- ✅ **PROCEDER** → Continuar a Fase 2
- ⚠️ **RECONSIDERAR** → Evaluar si cerrar gaps primero
- ❌ **NO_APLICAR** → Terminar proceso

---

### Paso 2A: Si la decisión es PROCEDER ✅

**Ejecutar Fase 2 (Generación CV DOCX)**

CV_ORIGINAL: |
  {CV completo}
JD_COMPLETA: |
  {JD completa}
KEYWORDS_CRITICOS:
  - "Scrum Master"
  - "OKRs"
  - "SAFe"
# ... más datos manualmente
```

**Output generado:**
- **`CV_{NOMBRE}_{POSICION}.docx`** - Listo para aplicar (máx 2 páginas)

---

### Paso 2B: Si la decisión es NO_APLICAR ❌

**NO ejecutar Fase 2**

**Acciones recomendadas:**
1. Revisar gaps críticos identificados
2. Considerar certificaciones/experiencia a obtener
3. Buscar posiciones más adecuadas a tu perfil actual

---

## 💡 Beneficios del Sistema v2.0

### Comparativa: v1.0 vs v2.0

| Aspecto | v1.0 (3 Fases) | v2.0 (2 Fases) | Mejora |
|---------|----------------|----------------|--------|
| **Número de fases** | 3 | 2 | -33% |
| **Tokens promedio** | ~20,000 | ~8,000 | **-60%** |
| **Reenvío de JD** | 3 veces | 1 vez | -67% |
| **Reenvío de CV** | 2 veces | 1 vez | -50% |
| **Decisión GO/NO-GO** | Implícita | **Explícita** | ✅ |
| **Outputs intermedios** | .txt + .docx | Solo .docx | Simplificado |
| **Tiempo ejecución** | 8-10 min | 4-5 min | **-50%** |

---

## 📂 Estructura de Archivos Recomendada

```
/easy-job-apply-ai/
├── prompts/
│   ├── prompt_fase1_analisis_estrategico_v2.md    ← USAR
│   ├── prompt_fase2_generacion_cv_docx_v2.md      ← USAR
│   ├── prompt_fase1_analisis_estrategico.md       (deprecado)
│   ├── prompt_fase2_optimizacion_cv.md            (deprecado)
│   └── prompt_fase3_generacion_cv.md              (deprecado)
│
├── templates/
│   └── CV_Template.docx                           (opcional)
│
├── sessions/                                       ← NUEVO
│   ├── context_20260121_AttachGroup.yaml
│   ├── context_20260121_LosAndes.yaml
│   └── analisis_20260121_AttachGroup.md
│
└── outputs/                                        ← NUEVO
    ├── CV_Gonzales_Attach_Coach.docx
    └── CV_Gonzales_LosAndes_PO.docx
```

---

## 🔧 Convenciones de Nombres

### Session ID
**Formato:** `YYYYMMDD_EMPRESA_POSICION`

**Ejemplos:**
- `20260121_AttachGroup_AgileCoach`
- `20260121_BBVA_ScrumMaster`
- `20260121_LosAndes_ProductOwner`

### Archivos de Output
**Context File:** `context_{SESSION_ID}.yaml`
**Análisis:** `analisis_{SESSION_ID}.md`
**CV Final:** `CV_{APELLIDO}_{POSICION_SLUG}.docx`

---

## ⚡ Tips de Optimización

### 1. Usa siempre el Context File
- **Ahorra 60% de tokens** en Fase 2
- Evita copiar/pegar análisis completo
- Mantiene trazabilidad de la sesión

### 2. Análisis Salarial Simplificado
Si solo te interesa el fit (no negociación salarial):
```yaml
ANALISIS_SALARIAL_DETALLADO: false
```
Reduce ~40% del output de Fase 1

### 3. Reutiliza Context Files
Si aplicas a posiciones similares:
- Puedes reutilizar keywords y estrategias
- Solo ajusta lo específico de cada JD

### 4. Automatización Futura
El sistema está diseñado para automatizarse:
```python
def pipeline_cv(jd, cv, salary):
    fase1 = ejecutar_fase1(jd, cv, salary)
    if fase1.recomendacion == "PROCEDER":
        return ejecutar_fase2(fase1.context_file, cv, jd)
    else:
        return {"status": "NO_APLICAR"}
```

---

## 📋 Checklist de Ejecución

### Antes de Fase 1:
- [ ] Tengo la JD completa (no solo link)
- [ ] Tengo mi CV actualizado
- [ ] Conozco mis expectativas salariales
- [ ] Sé la ubicación y sector de la posición

### Después de Fase 1:
- [ ] Revisé el análisis generado
- [ ] Entiendo los gaps identificados
- [ ] Revisé las fortalezas a destacar
- [ ] La recomendación es clara (PROCEDER/RECONSIDERAR/NO_APLICAR)
- [ ] Se generó el `context_{SESSION_ID}.yaml`

### Antes de Fase 2 (solo si PROCEDER):
- [ ] Tengo el context file de Fase 1
- [ ] Tengo el CV original disponible
- [ ] Tengo la JD completa disponible
- [ ] Confirmé que quiero aplicar a esta posición

### Después de Fase 2:
- [ ] El CV generado tiene máximo 2 páginas
- [ ] El idioma es correcto (español/inglés según JD)
- [ ] Los keywords críticos están presentes
- [ ] El formato es profesional y limpio
- [ ] Revisé que no haya errores ortográficos

---

## 🚨 Errores Comunes

### ❌ Error 1: Ejecutar Fase 2 sin revisar Fase 1
**Problema:** Generas CV para posición no recomendable
**Solución:** Siempre revisar la decisión GO/NO-GO de Fase 1

### ❌ Error 2: No usar Context File en Fase 2
**Problema:** Gastas 60% más tokens reenviar todo
**Solución:** Siempre usar `CONTEXT_FILE` en Fase 2

### ❌ Error 3: Inventar experiencia en Fase 2
**Problema:** Falta de integridad profesional
**Solución:** Solo reframing de experiencia real, nunca inventar

### ❌ Error 4: Exceder 2 páginas
**Problema:** CV muy largo no se lee
**Solución:** Priorizar experiencia relevante, condensar roles antiguos

---

## 📞 Soporte

### Si tienes dudas sobre:

**Fase 1:**
- Revisa `RECOMENDACIONES_OPTIMIZACION.md` sección "Fase 1"
- Verifica que completaste todos los inputs requeridos
- Confirma que el análisis salarial sea apropiado (detallado vs. simplificado)

**Fase 2:**
- Revisa `RECOMENDACIONES_OPTIMIZACION.md` sección "Fase 2"
- Verifica que el context file se generó correctamente
- Confirma que el idioma detectado es correcto

**Context File:**
- Debe ser YAML válido
- No debe contener texto completo de JD/CV (solo referencias)
- Debe tener keywords con frecuencia objetivo

---

## ✅ Próximos Pasos

1. **Prueba el sistema v2.0** con 1-2 JDs reales
2. **Compara resultados** con sistema v1.0 (si lo usaste antes)
3. **Ajusta según necesites** (ej: análisis salarial detallado on/off)
4. **Considera automatización** si aplicas frecuentemente

---

**Última actualización:** 21 de enero, 2026  
**Versión del sistema:** 2.0  
**Desarrollado por:** Julio Gonzales - Numen Coaching & Consulting
