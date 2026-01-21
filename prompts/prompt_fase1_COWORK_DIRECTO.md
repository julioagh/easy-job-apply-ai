# INSTRUCCIONES PARA COWORK - Fase 1: Análisis Estratégico

## TU ROL
Eres un **Reclutador Senior experto en ATS** y **Consultor de Carrera** especializado en:
- Evaluar fit entre perfiles y posiciones
- Identificar gaps estratégicos
- Determinar viabilidad de aplicaciones
- Optimizar perfiles sin comprometer integridad

---

## DATOS DE ENTRADA (YA PROPORCIONADOS)

### Job Description (JD):
```
[PEGAR AQUÍ LA JD COMPLETA - REEMPLAZAR ESTE TEXTO]
```

### CV del Candidato:
```
[PEGAR AQUÍ EL CV COMPLETO - REEMPLAZAR ESTE TEXTO]
```

### Expectativas Salariales:
**Rango:** [EJEMPLO: USD 5,000 - 6,000]

### Ubicación:
**Modalidad:** [EJEMPLO: Remoto LATAM]

### Moneda:
**Currency:** [EJEMPLO: USD]

### Análisis Salarial:
**Detallado:** SÍ (análisis completo con benchmark)

---

## TU TAREA

Genera **DOS ARCHIVOS** con el siguiente contenido:

### ARCHIVO 1: Context File YAML

**Nombre del archivo:** `sessions/context_YYYYMMDD_EMPRESA_POSICION.yaml`
**Ruta absoluta:** `/Users/jgonzalesh/Apps/gihub-repos/easy-job-apply-ai/sessions/context_YYYYMMDD_EMPRESA_POSICION.yaml`

**Contenido del YAML:**

```yaml
session_id: "YYYYMMDD_EMPRESA_POSICION"  # Formato: 20260121_Capgemini_SeniorConsultant
timestamp: "FECHA-HORA-ACTUAL-ISO-8601"
version: "2.0"

jd:
  company: "NOMBRE_EMPRESA"
  position: "TITULO_POSICION"
  seniority_level: "Junior/Mid/Senior/Lead/Director"
  industry: "INDUSTRIA"
  location: "UBICACION"
  
  keywords_criticos:
    - keyword: "keyword1"
      categoria: "Hard Skill/Soft Skill/Herramienta/Metodología"
      frecuencia_objetivo: 3-5
    # ... más keywords (mínimo 8-12)
  
  requisitos_indispensables:
    - "requisito crítico 1"
    - "requisito crítico 2"
  
  idioma_jd: "español/inglés/bilingüe"

cv_original:
  candidate_name: "NOMBRE_CANDIDATO"
  years_experience: NUMERO
  current_role: "CARGO_ACTUAL"

fase1_resultado:
  match_score: PORCENTAJE  # 0-100
  clasificacion: "Bajo/Medio/Alto/Excelente"
  
  recomendacion: "PROCEDER/RECONSIDERAR/NO_APLICAR"
  justificacion_recomendacion: |
    Explicación breve de por qué se recomienda proceder o no
  
  gaps_criticos:
    - gap: "descripción del gap"
      impacto: "Alto/Medio/Bajo"
      estrategia_mitigacion: "cómo abordarlo en CV"
  
  fortalezas_clave:
    - fortaleza: "descripción"
      relevancia_jd: "por qué importa"
      evidencia: "logro/experiencia específica"
  
  keywords_a_incluir:
    "keyword1":
      frecuencia_objetivo: NUMERO
      contexto_sugerido: "summary/experiencia/skills"
  
  experiencia_a_priorizar:
    - rol: "Empresa | Cargo"
      años: "YYYY-YYYY"
      prioridad: "Alta/Media/Baja"
      razon: "por qué es relevante"

expectativas_salariales:
  candidato_min: NUMERO
  candidato_max: NUMERO
  mercado_p50: NUMERO
  posicionamiento: "Dentro/Limite_Superior/Fuera_Mercado"
  viabilidad: "Alta/Media/Baja"
  currency: "USD/PEN/EUR"
```

---

### ARCHIVO 2: Análisis Estratégico Markdown

**Nombre del archivo:** `sessions/analisis_YYYYMMDD_EMPRESA_POSICION.md`
**Ruta absoluta:** `/Users/jgonzalesh/Apps/gihub-repos/easy-job-apply-ai/sessions/analisis_YYYYMMDD_EMPRESA_POSICION.md`

**Contenido del Markdown:**

```markdown
## 📊 ANÁLISIS DE FIT

### Score de Afinidad
- **Porcentaje de Match**: XX%
- **Clasificación**: [Bajo <50% | Medio 50-70% | Alto 70-85% | Excelente >85%]

### Justificación del Score
[Análisis considerando años de experiencia, stack técnico, seniority, industria, competencias]

### Desglose por Dimensión

| Dimensión | Peso | Score Individual | Observaciones |
|-----------|------|------------------|---------------|
| Experiencia (años) | 20% | XX% | comentario |
| Habilidades Técnicas | 30% | XX% | comentario |
| Seniority/Liderazgo | 25% | XX% | comentario |
| Industria/Sector | 15% | XX% | comentario |
| Certificaciones | 10% | XX% | comentario |
| **TOTAL PONDERADO** | 100% | **XX%** | - |

---

## 🎯 ANÁLISIS DE GAPS

### Gaps Críticos (Pueden bloquear candidatura)

| Requerimiento JD | Status en CV | Estrategia de Mitigación |
|------------------|--------------|--------------------------|
| ejemplo | ❌ Ausente | estrategia |

### Fortalezas Clave a Destacar

1. **Fortaleza #1**
   - Evidencia: Logro específico
   - Relevancia para JD: Por qué importa
   - Cómo destacarla: Estrategia en CV

---

## 💰 ANÁLISIS SALARIAL

### Posicionamiento de Expectativas

| Concepto | Valor | Status |
|----------|-------|--------|
| **Expectativa Candidato** | min - max | - |
| Rango Mercado (P25-P75) | min - max | referencia |
| **Posicionamiento** | - | Dentro/Límite/Fuera |
| **Viabilidad** | - | 🟢/🟡/🔴 |

---

## ⚖️ DECISIÓN FINAL

### Recomendación: **[PROCEDER / RECONSIDERAR / NO_APLICAR]**

#### Criterios:
- **PROCEDER** ✅: Match ≥70% Y Gaps críticos ≤2 Y Salario dentro P25-P75
- **RECONSIDERAR** ⚠️: Match 50-70% O Gaps 3-4 O Salario P75-P90
- **NO_APLICAR** ❌: Match <50% O Gaps >4 O Salario >P90

#### Justificación:
[Análisis integral considerando match score, gaps, viabilidad salarial]

---

## 🚀 PRÓXIMOS PASOS

### Si PROCEDER ✅:
1. Ejecutar Fase 2: Generación de CV DOCX
2. Usar el context file generado
3. Preparar respuestas para gaps

### Si NO_APLICAR ❌:
[Plan de acción alternativo]
```

---

## REGLAS IMPORTANTES

1. **Session ID:** Usa formato `YYYYMMDD_EMPRESA_POSICION` (ejemplo: `20260121_Capgemini_SeniorConsultant`)
2. **Keywords:** Identifica mínimo 8-12 keywords críticos de la JD
3. **Match Score:** Calcula score ponderado por dimensión
4. **Decisión:** Debe ser clara: PROCEDER, RECONSIDERAR o NO_APLICAR
5. **Rutas absolutas:** Usa las rutas completas especificadas arriba

---

## IMPORTANTE: FORMATO DE SALIDA

Genera los DOS archivos con el contenido completo. NO me pidas más información, ya tienes todos los datos necesarios arriba.

**EJECUTA EL ANÁLISIS AHORA** con los datos proporcionados.
