# Changelog - Script generate_cv_docx.py

## Versión 1.1 (2026-01-21)

### Cambios de Formato Implementados

**1. Interlineado:**
- ✅ Interlineado 1.0 (simple) aplicado a TODOS los párrafos
- Implementado con: `paragraph.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE`

**2. Espaciado:**
- ✅ Espacio después de párrafo: **5pt por defecto**
- ✅ Espacio después de párrafo: **10pt para última línea de cada sección**
- Lógica implementada con parámetro `is_last_in_section` en función helper

**3. Alineación:**
- ✅ **CENTRADO:** Nombre (línea 1) y Contacto (línea 2)
- ✅ **JUSTIFICADO:** Todo el resto del contenido
- Excepción: Líneas separadoras centradas

**4. Mejoras Adicionales:**
- Creada función helper `set_paragraph_format()` para aplicar formato consistente
- Creada función helper `add_text_run()` para agregar texto con formato
- Lógica para detectar automáticamente última línea de sección en loops

### Estructura de Formato

```python
# Ejemplo de aplicación:
nombre = doc.add_paragraph()
add_text_run(nombre, 'JULIO ALBERTO GONZALES HEREDIA', 18, bold=True)
set_paragraph_format(nombre, 
    alignment=WD_ALIGN_PARAGRAPH.CENTER,  # Centrado
    space_after=5,                        # 5pt después
    is_last_in_section=False)            # No es última de sección
```

### Secciones Afectadas

Todas las secciones ahora tienen formato correcto:
- ✅ Header (Nombre + Contacto) - Centrado
- ✅ Resumen Profesional - Justificado
- ✅ Experiencia Profesional - Justificado (todos los bullets)
- ✅ Formación y Certificaciones - Justificado
- ✅ Competencias Clave - Justificado
- ✅ Idiomas - Justificado

### Backup

Se creó backup del script original:
- Ubicación: `scripts/generate_cv_docx_backup.py`
- Contiene versión 1.0 sin ajustes de formato

---

## Versión 1.0 (2026-01-21)

### Características Iniciales

- Generación de DOCX con formato profesional
- Márgenes: 1.22 cm en todos los lados
- Fuentes: Arial con tamaños específicos
- Formato ATS-friendly
- Keywords optimizados

---

**Última actualización:** 21 de enero, 2026
