# Templates

Este directorio contiene tu CV actual que también sirve como template de formato.

## CV_Template.docx ⭐

**Propósito Dual:**
1. **Tu CV actual** - Contiene tu experiencia, logros y certificaciones más recientes
2. **Template de formato** - Define la estructura y formato visual para CVs generados

**Importante:** Este archivo es la base de todo el sistema. Manténlo actualizado.

### Requisitos del Template:

**Márgenes:**
- Top: 1.22 cm
- Bottom: 1.22 cm
- Left: 1.22 cm
- Right: 1.22 cm

**Tamaños de Fuente:**
- Nombre (Header): 18pt, Bold
- Contacto: 9pt, Normal
- Headers de sección: 12pt, Bold, UPPERCASE
- Summary: 9.5pt, Normal
- Empresa | Cargo: 9pt, Normal (NO Bold)
- Bullets: 9pt, Normal

**Estructura Recomendada:**
1. Header (Nombre + Contacto)
2. PROFESSIONAL SUMMARY / RESUMEN PROFESIONAL
3. EXPERIENCIA PROFESIONAL / PROFESSIONAL EXPERIENCE
4. FORMACIÓN Y CERTIFICACIONES / EDUCATION & CERTIFICATIONS
5. COMPETENCIAS CLAVE / KEY COMPETENCIES
6. HERRAMIENTAS Y PLATAFORMAS / TOOLS & PLATFORMS
7. IDIOMAS / LANGUAGES

## Cómo Usar

**En Fase 1:**
- Copia el contenido de `CV_Template.docx` en el campo `CV_TEXT`
- El sistema analizará tu experiencia actual

**En Fase 2:**
- El sistema usará `CV_Template.docx` como:
  - Fuente de contenido (experiencia a incluir)
  - Template de formato (estructura visual)
- Especifica: `TEMPLATE_DOCX: "./templates/CV_Template.docx"`

## Actualización

Actualiza `CV_Template.docx` cuando:
- Completes proyectos importantes
- Obtengas nuevas certificaciones
- Cambies de rol o empresa
- Agregues habilidades relevantes

## Nota

El template debe ser compatible con `python-docx` para generación automática. Evita:
- Tablas complejas
- Imágenes o logos
- Colores de fondo
- Bordes decorativos
- Fuentes no estándar (usa Arial)
