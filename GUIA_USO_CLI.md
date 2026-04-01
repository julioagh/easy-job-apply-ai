# 🚀 Guía de Uso - Herramientas CLI v2.1

**Versión:** 2.1
**Fecha:** 21 de enero, 2026

---

## 📋 Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Pipeline Automatizado](#pipeline-automatizado)
3. [Validador de YAML](#validador-de-yaml)
4. [Generador de CV Personalizado](#generador-de-cv-personalizado)
5. [Testing](#testing)
6. [Ejemplos Completos](#ejemplos-completos)
7. [Troubleshooting](#troubleshooting)

---

## ⚙️ Configuración Inicial

### Primera vez usando el proyecto

```bash
# 1. Navegar al directorio del proyecto
cd easy-job-apply-ai

# 2. Crear y activar entorno virtual
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
# o
venv\Scripts\activate     # Windows

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. (Opcional) Configurar variables de entorno
cp .env.example .env
nano .env  # Editar con tus datos
```

### Cada vez que uses el proyecto

```bash
# Activar entorno virtual
source venv/bin/activate  # macOS/Linux
# o
venv\Scripts\activate     # Windows
```

---

## 🔧 Pipeline Automatizado

### Comando: `python scripts/pipeline.py`

El pipeline automatiza el flujo completo de trabajo.

### Subcomandos disponibles

#### 1. `fase1` - Preparar Fase 1 (Análisis)

Genera los inputs preparados para ejecutar en tu LLM.

**Sintaxis:**
```bash
python scripts/pipeline.py fase1 \
  --jd <archivo_jd> \
  --cv <archivo_cv> \
  --salary "<expectativas>" \
  [--company <empresa>] \
  [--position <puesto>] \
  [--location <ubicación>] \
  [--currency <moneda>] \
  [-v]
```

**Ejemplo:**
```bash
python scripts/pipeline.py fase1 \
  --jd examples/example_jd_attach_group.txt \
  --cv resumes_base/CV_Julio_Gonzales-SPA.txt \
  --salary "USD 5000-6000" \
  --company "AttachGroup" \
  --position "Agile Coach" \
  --location "Remoto LATAM" \
  --currency "USD" \
  -v
```

**Output:**
- Genera `sessions/fase1_input_YYYYMMDD_Empresa_Puesto.txt`
- Muestra instrucciones de siguiente paso
- Debes copiar el contenido y ejecutarlo en tu LLM

#### 2. `validate` - Validar Context File

Valida un context file generado en Fase 1.

**Sintaxis:**
```bash
python scripts/pipeline.py validate --context <archivo_context> [-v]
```

**Ejemplo:**
```bash
python scripts/pipeline.py validate \
  --context sessions/context_20260121_AttachGroup_AgileCoach.yaml
```

**Output:**
```
🔍 Validando: sessions/context_20260121_AttachGroup_AgileCoach.yaml
------------------------------------------------------------
✅ Archivo VÁLIDO
```

#### 3. `fase2` - Preparar Fase 2 (Generación CV)

Verifica decisión GO/NO-GO y prepara inputs para Fase 2.

**Sintaxis:**
```bash
python scripts/pipeline.py fase2 \
  --context <archivo_context> \
  [--force] \
  [-v]
```

**Ejemplo (con recomendación PROCEDER):**
```bash
python scripts/pipeline.py fase2 \
  --context sessions/context_20260121_AttachGroup_AgileCoach.yaml \
  -v
```

**Ejemplo (forzar aunque recomendación sea negativa):**
```bash
python scripts/pipeline.py fase2 \
  --context sessions/context_20260121_Company_Position.yaml \
  --force
```

**Output:**
- Valida el context file
- Verifica decisión GO/NO-GO
- Si PROCEDER: genera `sessions/fase2_input_SESSIONID.txt`
- Si NO_APLICAR: muestra advertencia y detiene

---

## ✅ Validador de YAML

### Comando: `python scripts/validate_yaml.py`

Valida estructura y reglas de negocio de context files.

**Sintaxis:**
```bash
python scripts/validate_yaml.py <archivo> [-v]
```

**Ejemplo:**
```bash
python scripts/validate_yaml.py \
  sessions/context_20260121_AttachGroup_AgileCoach.yaml
```

**Output con errores:**
```
🔍 Validando: sessions/context_test.yaml
------------------------------------------------------------

❌ ERRORES ENCONTRADOS:
  1. Campo requerido faltante: 'jd.company'
  2. Campo 'fase1_resultado.match_score': tipo incorrecto

⚠️  ADVERTENCIAS:
  1. Solo 3 keywords críticos (se recomiendan al menos 8-12)

❌ Archivo INVÁLIDO
```

**Output sin errores:**
```
🔍 Validando: sessions/context_20260121_AttachGroup_AgileCoach.yaml
------------------------------------------------------------

✅ Archivo VÁLIDO
```

### Qué valida

**Estructura:**
- Campos requeridos presentes
- Tipos de datos correctos
- Jerarquía YAML válida

**Reglas de negocio:**
- Recomendación en valores válidos (PROCEDER/RECONSIDERAR/NO_APLICAR)
- Match score entre 0-100
- Expectativas salariales consistentes
- Mínimo de keywords críticos

---

## 📄 Generador de CV Personalizado

### Comando: `python scripts/generate_cv_docx.py`

Genera CV en formato DOCX con personalización.

**Sintaxis:**
```bash
python scripts/generate_cv_docx.py \
  [-o <nombre_salida>] \
  [--nombre <nombre>] \
  [--ubicacion <ubicacion>] \
  [--telefono <telefono>] \
  [--email <email>] \
  [--linkedin <linkedin>]
```

**Ejemplo (usar configuración por defecto):**
```bash
python scripts/generate_cv_docx.py
```

**Ejemplo (personalizado):**
```bash
python scripts/generate_cv_docx.py \
  -o CV_Juan_Perez_Developer.docx \
  --nombre "JUAN ALBERTO PÉREZ GARCÍA" \
  --ubicacion "Lima, Perú" \
  --telefono "+51 999888777" \
  --email "juan.perez@example.com" \
  --linkedin "linkedin.com/in/juanperez"
```

**Output:**
```
✅ CV generado exitosamente: /path/to/outputs/CV_Juan_Perez_Developer.docx
```

**Nota:** Este comando genera el CV con contenido hardcoded de ejemplo. Para CVs optimizados usa el flujo completo (Fase 1 → Fase 2).

---

## 🧪 Testing

### Ejecutar todos los tests

```bash
pytest
```

### Tests con verbose

```bash
pytest -v
```

**Output:**
```
============================= test session starts ==============================
tests/test_config.py::TestConfig::test_get_output_path PASSED            [  3%]
tests/test_config.py::TestConfig::test_get_session_path PASSED           [  6%]
...
============================== 29 passed in 0.22s ==============================
```

### Tests con cobertura

```bash
pytest --cov=scripts
```

**Output:**
```
Name                          Stmts   Miss  Cover
-------------------------------------------------
scripts/config.py                35      0   100%
scripts/validate_yaml.py        113     41    64%
scripts/pipeline.py             156     85    46%
-------------------------------------------------
TOTAL                           646    468    28%
```

### Generar reporte HTML de cobertura

```bash
pytest --cov=scripts --cov-report=html
open htmlcov/index.html  # macOS
# o
xdg-open htmlcov/index.html  # Linux
# o
start htmlcov/index.html  # Windows
```

### Ejecutar solo un módulo de tests

```bash
pytest tests/test_config.py -v
```

### Ejecutar un test específico

```bash
pytest tests/test_config.py::TestConfig::test_get_output_path -v
```

---

## 📝 Ejemplos Completos

### Ejemplo 1: Flujo completo para nueva aplicación

```bash
# 1. Activar entorno
source venv/bin/activate

# 2. Preparar Fase 1
python scripts/pipeline.py fase1 \
  --jd job_descriptions/amazon_senior_agile.txt \
  --cv resumes_base/CV_Julio_Gonzales-ENG.txt \
  --salary "USD 7000-9000" \
  --company "Amazon" \
  --position "Senior Agile Coach" \
  --currency "USD" \
  -v

# 3. Copiar el contenido de sessions/fase1_input_*.txt
# 4. Pegar en LLM junto con prompts/prompt_fase1_analisis_estrategico_v2.md
# 5. Guardar outputs:
#    - sessions/context_20260121_Amazon_SeniorAgileCoach.yaml
#    - sessions/analisis_20260121_Amazon_SeniorAgileCoach.md

# 6. Validar context file
python scripts/pipeline.py validate \
  --context sessions/context_20260121_Amazon_SeniorAgileCoach.yaml

# 7. Si validación OK, preparar Fase 2
python scripts/pipeline.py fase2 \
  --context sessions/context_20260121_Amazon_SeniorAgileCoach.yaml \
  -v

# 8. Copiar contenido de sessions/fase2_input_*.txt
# 9. Pegar en LLM junto con prompts/prompt_fase2_generacion_cv_docx_v2.md
# 10. Ejecutar código Python generado por LLM para crear DOCX
```

### Ejemplo 2: Validar múltiples context files

```bash
# Validar todos los context files
for file in sessions/context_*.yaml; do
    echo "Validando: $file"
    python scripts/validate_yaml.py "$file"
    echo "---"
done
```

### Ejemplo 3: Generar múltiples CVs personalizados

```bash
# CV en español
python scripts/generate_cv_docx.py \
  -o CV_Gonzales_Empresa_A.docx

# CV en inglés (cambiar configuración en .env primero)
python scripts/generate_cv_docx.py \
  -o CV_Gonzales_Company_B.docx
```

---

## 🐛 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'yaml'"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Error: "FileNotFoundError: [Errno 2] No such file or directory"

**Causa:** Ruta relativa incorrecta

**Solución:** Usar rutas absolutas o verificar que estás en el directorio raíz del proyecto
```bash
cd /path/to/easy-job-apply-ai
python scripts/pipeline.py fase1 --jd examples/example_jd.txt ...
```

### Error: "Context file inválido"

**Causa:** YAML mal formado o campos faltantes

**Solución:** Validar con modo verbose
```bash
python scripts/validate_yaml.py sessions/context_file.yaml -v
```

Revisar errores específicos y corregir el YAML.

### Warning: "Solo X keywords críticos (se recomiendan al menos 8-12)"

**Causa:** Context file tiene pocos keywords

**Solución:** No crítico, pero considera agregar más keywords en Fase 1 del LLM.

### Error: "Recomendación: NO_APLICAR" en fase2

**Causa:** Análisis de Fase 1 no recomienda aplicar

**Solución:**
- Revisar `sessions/analisis_*.md` para entender por qué
- Si decides proceder de todos modos: usar `--force`
```bash
python scripts/pipeline.py fase2 --context context.yaml --force
```

### Tests fallan

**Causa:** Entorno no configurado correctamente

**Solución:**
```bash
# Reinstalar dependencias
source venv/bin/activate
pip install -r requirements.txt

# Ejecutar tests
pytest -v
```

---

## 📚 Referencia Rápida

### Comandos Esenciales

```bash
# Activar entorno
source venv/bin/activate

# Fase 1
python scripts/pipeline.py fase1 --jd FILE --cv FILE --salary "USD X-Y"

# Validar
python scripts/pipeline.py validate --context FILE

# Fase 2
python scripts/pipeline.py fase2 --context FILE

# Tests
pytest -v
```

### Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `.env.example` | Plantilla de configuración |
| `scripts/config.py` | Configuración centralizada |
| `scripts/pipeline.py` | Orquestador principal |
| `scripts/validate_yaml.py` | Validador de context files |
| `sessions/` | Archivos de sesión (YAML, MD) |
| `outputs/` | CVs generados |

### Flujo Recomendado

```
1. Pipeline fase1 → 2. Ejecutar en LLM → 3. Guardar outputs →
4. Pipeline validate → 5. Pipeline fase2 → 6. Ejecutar en LLM →
7. CV generado ✅
```

---

## 🎓 Tips y Mejores Prácticas

1. **Siempre activa el virtualenv** antes de ejecutar comandos
2. **Usa `-v` (verbose)** cuando necesites debug
3. **Valida context files** antes de Fase 2
4. **Revisa análisis MD** antes de proceder con CV
5. **Ejecuta tests** después de modificar scripts
6. **Usa `--force` con cuidado** en fase2

---

## 🆘 Ayuda Adicional

### Ayuda de comandos

```bash
# Pipeline
python scripts/pipeline.py --help
python scripts/pipeline.py fase1 --help
python scripts/pipeline.py fase2 --help

# Validador
python scripts/validate_yaml.py --help

# Generador
python scripts/generate_cv_docx.py --help
```

### Documentación

- **Guía rápida:** `docs/GUIA_RAPIDA.md`
- **Changelog:** `docs/CHANGELOG_v2.1.md`
- **Mejoras:** `MEJORAS_IMPLEMENTADAS.md`
- **README:** `README.md`

---

**Desarrollado por:** Julio Gonzales - Numen Coaching & Consulting
**Versión:** 2.1
**Última actualización:** 21 de enero, 2026
