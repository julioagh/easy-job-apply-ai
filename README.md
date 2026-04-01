# Easy Job Apply AI

Sistema optimizado de generación de CVs con análisis estratégico y decisión condicional GO/NO-GO.

**Versión actual:** 2.1 ([Ver changelog](docs/CHANGELOG_v2.1.md))

> **📌 NOTA PARA COWORK/LLMs:** Si eres un asistente de IA ayudando con este proyecto, **LEE PRIMERO** el archivo [`COWORK_README.md`](COWORK_README.md) para entender qué hacer y qué NO hacer.

## 🎯 Objetivo

Generar CVs optimizados para sistemas ATS **solo cuando sea estratégicamente recomendable** aplicar a una posición, basándose en análisis de fit, gaps y expectativas salariales.

## 🚀 Características

### Core (v2.0)
- ✅ **Análisis estratégico de fit** (match score por dimensiones)
- ✅ **Decisión GO/NO-GO explícita** (PROCEDER/RECONSIDERAR/NO_APLICAR)
- ✅ **Generación automática de CV DOCX** (máx 2 páginas, ATS-friendly)
- ✅ **Optimización de keywords** (regla 80/20)
- ✅ **Detección automática de idioma** (español/inglés)
- ✅ **Reducción de 60% en tokens** vs. versión anterior

### Nuevas (v2.1)
- ✨ **Pipeline automatizado** con CLI completo (Fase 1 y 2)
- ✨ **Conversor genérico MD → DOCX** (un script para todos los JDs)
- ✨ **Validador de YAML** para context files
- ✨ **Suite de tests** (29 tests, cobertura 28%)
- ✨ **Configuración centralizada** (rutas portables)
- ✨ **Control de versiones Git**
- ✨ **Entorno virtual Python**

### Optimización de tokens (v2.2)
- 🔵 **CV maestro con marcadores [NO_LLM]** — excluir secciones de uso personal (~400 tokens/llamada)
- 🔵 **Prompt Fase 1 comprimido** — template YAML, contexto y próximos pasos reducidos (-19%)
- 🔵 **Prompt Fase 2 comprimido** — secciones duplicadas eliminadas (-34%)
- 🔵 **CV maestro bilingüe** — usar versión en el idioma de la JD (-30-40% tokens en Fase 2)

---

## 💡 Optimización de Tokens — Impacto Medido

Las siguientes mejoras reducen el consumo de tokens sin afectar la calidad de los CVs generados:

### Cambios implementados

| Área | Antes | Después | Reducción |
|------|-------|---------|-----------|
| `prompt_fase1_analisis_estrategico_v2.md` | 12,998 bytes | 10,474 bytes | **-19%** |
| `prompt_fase2_generacion_cv_docx_v2.md` | 28,420 bytes | 18,802 bytes | **-34%** |
| CV maestro (secciones [NO_LLM] excluidas) | ~7,700 tokens | ~6,700 tokens | **-13%** |

### Qué se eliminó / comprimió

**Prompt Fase 1 (-2,524 bytes):**
- Sección "Contexto del Proyecto": 15 líneas → 2 líneas
- Template YAML: ejemplos repetidos → estructura mínima con comentarios `# ... repetir`
- Sección "Próximos Pasos": 42 líneas → tabla de 3 filas
- Control de versiones histórico → comentario inline de 1 línea

**Prompt Fase 2 (-9,618 bytes):**
- Sección "Tu Tarea / Generar Solo el Markdown": eliminada (estaba duplicada en `COWORK_README.md`)
- Opción B de inputs (sin context file): eliminada (consume más tokens, uso desaconsejado)
- Sección "Proceso Automático": eliminada (instrucciones para el usuario, no para el LLM)
- Paso 3 — template Markdown completo (110 líneas): comprimido a estructura esquemática (20 líneas)
- Metadata con historial de versiones: comprimido a comentario de 2 líneas

**CV Maestro ES + EN (~400 tokens excluibles por llamada):**
- Secciones marcadas con `[NO_LLM]` — no enviar al LLM:
  - `## PROPÓSITO` (~50 tokens)
  - `## INTERESES` (~40 tokens)
  - `## LO QUE OFREZCO` (~220 tokens)
  - `## INFORMACIÓN ADICIONAL PARA ENTREVISTAS` (~450 tokens)

### Impacto en pipeline completo

```
                    ANTES          DESPUÉS       AHORRO
Fase 1 (prompt):    ~3,250 tok     ~2,620 tok    -630 tok  (-19%)
Fase 2 (prompt):    ~7,100 tok     ~4,700 tok    -2,400 tok (-34%)
CV maestro (input): ~7,700 tok     ~6,700 tok    -1,000 tok (-13%)
─────────────────────────────────────────────────────────
Pipeline completo:  ~18,050 tok    ~14,020 tok   -4,030 tok (-22%)
```

> **Nota:** Los tokens del CV maestro dependen de qué secciones se envíen.
> Usar solo el perfil relevante al tipo de posición ahorra ~720 tokens adicionales.

---

## 📊 Flujo del Sistema

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

## 📁 Estructura del Proyecto

```
/easy-job-apply-ai/
├── README.md                          # Este archivo
├── .env.example                       # ✨ Variables de entorno (plantilla)
├── requirements.txt                   # Dependencias Python
├── pytest.ini                         # ✨ Configuración de tests
│
├── docs/
│   ├── GUIA_RAPIDA.md                # Guía de uso rápido
│   ├── CHANGELOG_v2.1.md             # ✨ Changelog de mejoras v2.1
│   └── RECOMENDACIONES_OPTIMIZACION.md  # Análisis técnico de optimizaciones
│
├── prompts/
│   ├── prompt_fase1_analisis_estrategico_v2.md    # ✅ USAR (v2.0)
│   └── prompt_fase2_generacion_cv_docx_v2.md      # ✅ USAR (v2.0)
│
├── scripts/                           # ✨ Scripts Python (4 genéricos)
│   ├── config.py                      # ✨ Configuración centralizada
│   ├── md_to_docx.py                  # ✨ Conversor genérico MD → DOCX
│   ├── validate_yaml.py               # ✨ Validador de context files
│   └── pipeline.py                    # ✨ Pipeline automatizado (Fase 1 y 2)
│
├── tests/                             # ✨ Tests unitarios
│   ├── test_config.py
│   ├── test_validate_yaml.py
│   └── test_pipeline.py
│
├── templates/
│   └── CV_Template.docx              # Template de formato (opcional)
│
├── sessions/                          # Archivos de sesión por aplicación
│   ├── context_YYYYMMDD_EMPRESA.yaml # Context files generados
│   └── analisis_YYYYMMDD_EMPRESA.md  # Análisis para revisión
│
├── outputs/                           # CVs generados
│   └── CV_APELLIDO_POSICION.docx     # CVs finales listos para aplicar
│
└── examples/                          # Ejemplos de uso
    ├── example_jd.txt                # Job Description de ejemplo
    ├── example_cv.txt                # CV de ejemplo
    └── example_context.yaml          # Context file de ejemplo
```

## 🚀 Inicio Rápido

### Configuración Inicial (Primera vez)

```bash
# 1. Clonar o descargar el repositorio
cd easy-job-apply-ai

# 2. Crear entorno virtual
python3 -m venv venv

# 3. Activar entorno virtual
source venv/bin/activate  # macOS/Linux
# o
venv\Scripts\activate  # Windows

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Configurar variables de entorno (opcional)
cp .env.example .env
# Editar .env con tu información personal
```

### Uso Regular

### Paso 1: Ejecutar Fase 1 (Análisis Estratégico)

1. Abre `prompts/prompt_fase1_analisis_estrategico_v2.md`
2. Completa los inputs requeridos:
   ```yaml
   JD_TEXT: |
     {Pegar descripción completa del puesto}
   
   CV_TEXT: |
     {Pegar tu CV actual}
   
   SALARY_EXPECTATIONS: "S/ 8,000 - S/ 10,000"
   LOCATION: "Lima, Perú"
   INDUSTRY: "Tecnología"
   CURRENCY: "PEN"
   ```
3. Ejecuta el prompt en tu LLM (Claude, ChatGPT, Gemini)
4. Revisa los outputs:
   - `sessions/analisis_{SESSION_ID}.md` - Para tu revisión
   - `sessions/context_{SESSION_ID}.yaml` - Para Fase 2

### Paso 2: Revisar Decisión

**Si la recomendación es PROCEDER ✅:**
- Continúa a Fase 2

**Si la recomendación es RECONSIDERAR ⚠️:**
- Evalúa si puedes cerrar gaps críticos
- Decide si proceder de todos modos

**Si la recomendación es NO_APLICAR ❌:**
- **TERMINA AQUÍ** - No ejecutes Fase 2
- Revisa gaps y busca posiciones más adecuadas

### Paso 3: Ejecutar Fase 2 (Solo si PROCEDER)

1. Abre `prompts/prompt_fase2_generacion_cv_docx_v2.md`
2. Completa los inputs:
   ```yaml
   CONTEXT_FILE: "./sessions/context_{SESSION_ID}.yaml"
   CV_ORIGINAL: |
     {Pegar CV completo}
   JD_COMPLETA: |
     {Pegar JD completa}
   IDIOMA_OUTPUT: "auto"  # Detecta automáticamente
   ```
3. Ejecuta el prompt
4. Obtén tu CV optimizado: `outputs/CV_{NOMBRE}_{POSICION}.docx`

## 🛠️ Nuevas Herramientas CLI (v2.1)

### Pipeline Automatizado

```bash
# Preparar Fase 1 completa
python scripts/pipeline.py fase1 \
  --jd examples/example_jd.txt \
  --cv resumes_base/CV_Julio_Gonzales-SPA.txt \
  --salary "USD 5000-6000" \
  --company "AttachGroup" \
  --position "Agile Coach"

# Validar context file generado
python scripts/pipeline.py validate \
  --context sessions/context_20260121_AttachGroup_AgileCoach.yaml

# Preparar Fase 2 (solo si recomendación = PROCEDER)
# Busca el CV en Markdown y lo convierte a DOCX automáticamente
python scripts/pipeline.py fase2 \
  --context sessions/context_20260121_AttachGroup_AgileCoach.yaml
```

### Conversor MD → DOCX (Genérico)

```bash
# Convertir cualquier CV en Markdown a DOCX
python scripts/md_to_docx.py outputs/CV_Gonzales_Company_Position.md

# Con nombre personalizado
python scripts/md_to_docx.py outputs/CV_input.md -o CV_Custom.docx
```

### Validador de YAML

```bash
# Validar context file
python scripts/validate_yaml.py sessions/context_20260121_Company_Position.yaml

# Validar con verbose
python scripts/validate_yaml.py -v sessions/context_file.yaml
```

### Tests

```bash
# Ejecutar todos los tests
pytest

# Tests con verbose
pytest -v

# Tests con cobertura
pytest --cov=scripts

# Generar reporte HTML de cobertura
pytest --cov=scripts --cov-report=html
open htmlcov/index.html
```

---

## 📊 Beneficios vs. Sistema Anterior

| Aspecto | v1.0 (3 Fases) | v2.0 (2 Fases) | Mejora |
|---------|----------------|----------------|--------|
| **Número de fases** | 3 | 2 | -33% |
| **Tokens promedio** | ~20,000 | ~8,000 | **-60%** |
| **Reenvío de JD** | 3 veces | 1 vez | -67% |
| **Reenvío de CV** | 2 veces | 1 vez | -50% |
| **Decisión GO/NO-GO** | Implícita | **Explícita** | ✅ |
| **Tiempo ejecución** | 8-10 min | 4-5 min | **-50%** |

## 🔧 Características Técnicas

### Fase 1: Análisis Estratégico
- Análisis de fit por dimensiones (experiencia, skills, seniority, industria)
- Identificación de gaps críticos con estrategias de mitigación
- Análisis salarial (simplificado u opcional detallado)
- Generación de context file YAML para Fase 2
- Decisión GO/NO-GO con criterios explícitos

### Fase 2: Generación CV DOCX
- Fusión de optimización de contenido + generación de documento
- Límite estricto de 2 páginas con priorización inteligente
- Optimización de keywords (regla 80/20)
- Detección automática de idioma (español/inglés)
- Formato profesional compatible con ATS
- Márgenes exactos: 1.22 cm
- Tamaños de fuente específicos por sección

## 📝 Convenciones de Nombres

### Session ID
**Formato:** `YYYYMMDD_EMPRESA_POSICION`

**Ejemplos:**
- `20260121_AttachGroup_AgileCoach`
- `20260121_BBVA_ScrumMaster`
- `20260121_LosAndes_ProductOwner`

### Archivos Generados
- **Context File:** `context_{SESSION_ID}.yaml`
- **Análisis:** `analisis_{SESSION_ID}.md`
- **CV Final:** `CV_{APELLIDO}_{POSICION_SLUG}.docx`

## 📚 Documentación

- **[GUIA_RAPIDA.md](docs/GUIA_RAPIDA.md)** - Guía de uso paso a paso
- **[RECOMENDACIONES_OPTIMIZACION.md](docs/RECOMENDACIONES_OPTIMIZACION.md)** - Análisis técnico detallado
- **[AUTOMATIZACION_FASE2.md](docs/AUTOMATIZACION_FASE2.md)** - ✨ Documentación de automatización Fase 2
- **[ESTRUCTURA_SCRIPTS.md](docs/ESTRUCTURA_SCRIPTS.md)** - ✨ Estructura y descripción de scripts Python

## 🎯 Casos de Uso

### Caso 1: Aplicación Recomendable
```
Fase 1 → Match 85% → PROCEDER ✅
Fase 2 → CV_Gonzales_Attach_Coach.docx generado
Resultado: CV listo para aplicar
```

### Caso 2: Aplicación No Recomendable
```
Fase 1 → Match 45% → NO_APLICAR ❌
Resultado: Proceso termina, ahorras tiempo
```

### Caso 3: Aplicación con Reservas
```
Fase 1 → Match 65% → RECONSIDERAR ⚠️
Usuario decide: Cerrar gaps primero
Resultado: No ejecuta Fase 2 aún
```

## ⚡ Tips de Optimización

1. **Usa siempre el Context File** - Ahorra 60% de tokens en Fase 2
2. **Análisis salarial simplificado** - Si solo te interesa el fit, usa `ANALISIS_SALARIAL_DETALLADO: false`
3. **Reutiliza Context Files** - Para posiciones similares
4. **Revisa la decisión GO/NO-GO** - No generes CVs para posiciones no recomendables

## 🚨 Errores Comunes

❌ **NO HAGAS ESTO:**
1. Ejecutar Fase 2 sin revisar la decisión de Fase 1
2. Reenviar todo el análisis en Fase 2 (usa context file)
3. Inventar experiencia en el CV
4. Exceder 2 páginas en el CV final

✅ **SÍ HAZLO:**
1. Revisar siempre la recomendación GO/NO-GO
2. Usar context file para ahorrar tokens
3. Solo reframing de experiencia real
4. Priorizar contenido relevante para cumplir 2 páginas

## 📌 Versiones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-01-20 | Sistema inicial de 3 fases |
| 2.0 | 2026-01-21 | Sistema optimizado de 2 fases con context file y decisión GO/NO-GO |
| 2.1 | 2026-01-21 | Infraestructura mejorada: Git, virtualenv, config centralizado, pipeline CLI, validador YAML, tests (29), rutas portables. [Ver detalles](docs/CHANGELOG_v2.1.md) |

## 📞 Soporte

Para dudas o problemas:
1. Revisa `docs/GUIA_RAPIDA.md`
2. Consulta `docs/RECOMENDACIONES_OPTIMIZACION.md`
3. Verifica que los inputs estén completos
4. Confirma que el context file sea YAML válido

## 📄 Licencia

Uso personal

---

**Desarrollado por:** Julio Gonzales - Numen Coaching & Consulting
**Última actualización:** 21 de enero, 2026
**Versión:** 2.1

---

## 🧪 Calidad y Testing

- ✅ 29 tests unitarios
- ✅ Cobertura: 28% (core modules al 100%)
- ✅ Validación automática de YAML
- ✅ CI/CD ready (pytest configurado)

**Ejecutar tests:**
```bash
pytest -v
```
