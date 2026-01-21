# Cómo Actualizar el Script para Futuros CVs

## 🎯 Objetivo

El script `generate_cv_docx.py` actualmente está hardcodeado para el CV de Julio Gonzales (Attach Group - Agile Coach). Para usarlo en futuras aplicaciones, hay dos opciones:

---

## Opción 1: Dejar que el LLM lo Maneje Automáticamente (RECOMENDADO)

**Ventaja:** Cero esfuerzo manual, el LLM genera el script completo cada vez

**Cómo funciona:**
1. En Fase 2, el LLM analiza el context file y CV original
2. El LLM genera un script Python personalizado en memoria
3. El LLM ejecuta el script y crea el DOCX

**Instrucción para el LLM en Fase 2:**
```
Después de generar el contenido optimizado del CV:
1. Crea un script Python temporal con el contenido específico
2. Usa python-docx para generar el DOCX con formato profesional
3. Ejecuta: python3 [script_temporal].py
4. Entrega el DOCX generado
```

**Ejemplo de implementación:**
```python
# El LLM crea esto dinámicamente cada vez
def create_cv_docx(summary_text, experience_data, certifications, skills):
    doc = Document()
    # ... aplicar formato estándar ...
    # ... usar datos parametrizados ...
    doc.save(f"outputs/CV_{candidate}_{company}.docx")
```

---

## Opción 2: Parametrizar el Script Actual

**Ventaja:** Script reutilizable permanente

**Pasos:**

### 1. Crear archivo de datos (YAML/JSON)

```yaml
# cv_data.yaml
candidate:
  name: "JULIO ALBERTO GONZALES HEREDIA"
  contact: "Lima, Perú | +51 992755873 | jgonzales.sbs@gmail.com"
  
summary: |
  Agile Coach Expert con 7 años...
  
experience:
  - company: "BBVA PERÚ"
    location: "Lima, Perú"
    role: "Agile Coach Expert"
    period: "Enero 2022 - Presente"
    bullets:
      - "Lideré transformación..."
      - "Diseñé e implementé..."
```

### 2. Modificar script para leer datos

```python
import yaml

def create_cv_docx(data_file):
    with open(data_file, 'r') as f:
        data = yaml.safe_load(f)
    
    doc = Document()
    
    # Nombre
    nombre = doc.add_paragraph()
    run = nombre.add_run(data['candidate']['name'])
    # ... formato ...
    
    # Summary
    summary = doc.add_paragraph()
    run = summary.add_run(data['summary'])
    # ... formato ...
    
    # Experiencia
    for exp in data['experience']:
        empresa = doc.add_paragraph()
        run = empresa.add_run(f"{exp['company']} | {exp['location']}")
        # ... formato ...
```

### 3. Uso

```bash
python3 scripts/generate_cv_docx.py cv_data_attach_group.yaml
```

---

## Recomendación

**Para tu caso (aplicaciones frecuentes):** 

Usa **Opción 1** (LLM genera script dinámicamente) porque:
- ✅ No requiere mantenimiento del script
- ✅ Se adapta automáticamente a cada JD
- ✅ El LLM ya tiene toda la lógica de optimización
- ✅ Menos pasos manuales

El script actual sirve como **referencia de formato** para el LLM. En cada nueva aplicación, el LLM puede:
1. Leer este script como template de formato
2. Generar nuevo script con contenido específico
3. Ejecutarlo para crear el DOCX

---

## Instrucción Clara para Fase 2

Agrega esto al final del prompt de Fase 2:

```markdown
## 🤖 GENERACIÓN AUTOMÁTICA DEL DOCX

Después de optimizar el contenido del CV:

1. **Lee el script de referencia:**
   ```bash
   cat scripts/generate_cv_docx.py
   ```

2. **Crea script temporal con contenido optimizado:**
   - Usa el mismo formato del script de referencia
   - Reemplaza contenido hardcodeado con el contenido optimizado
   - Mantén márgenes (1.22cm) y tamaños de fuente exactos

3. **Ejecuta el script:**
   ```bash
   python3 /tmp/generate_cv_temp.py
   ```

4. **Entrega el DOCX generado:**
   - Ubicación: `outputs/CV_{APELLIDO}_{EMPRESA}_{POSICION}.docx`
   - Validar que sea máximo 2 páginas
```

---

**Última actualización:** 21 de enero, 2026
