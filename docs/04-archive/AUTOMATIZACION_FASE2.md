# Automatización Fase 2: Conversión MD → DOCX

## 📋 Resumen

La Fase 2 ahora está completamente automatizada. Cuando se ejecuta el comando `pipeline.py fase2`, el sistema:

1. Valida el context file
2. Verifica la recomendación GO/NO-GO
3. Busca el CV optimizado en Markdown
4. Lo convierte automáticamente a DOCX con formato ATS-friendly
5. Reporta los archivos generados

## 🔧 Script Principal: `md_to_docx.py`

Script genérico y reutilizable que convierte cualquier CV en formato Markdown a DOCX con formato profesional.

### Características

- ✅ **Genérico**: Funciona con cualquier CV en Markdown
- ✅ **Formato ATS-friendly**: Márgenes, fuentes y espaciado optimizados
- ✅ **Preserva formato**: Convierte **bold** de Markdown a negrita en DOCX
- ✅ **Estructura flexible**: Detecta automáticamente secciones, subsecciones, bullets, logros
- ✅ **Reutilizable**: Un solo script para todos los JDs

### Uso Independiente

```bash
# Convertir un CV específico
python scripts/md_to_docx.py outputs/CV_Gonzales_Company_Position.md

# Especificar nombre de salida
python scripts/md_to_docx.py outputs/CV_Gonzales_Company_Position.md -o CV_Personalizado.docx
```

## 🔄 Integración con Pipeline

### Flujo Automatizado

```bash
# 1. Ejecutar Fase 2 (convierte automáticamente MD → DOCX)
python scripts/pipeline.py fase2 --context sessions/context_YYYYMMDD_Company_Position.yaml
```

### Cómo Funciona

1. **Extracción de información**: Lee `session_id` del context file
2. **Búsqueda automática**: Localiza el CV en Markdown usando el patrón:
   ```
   outputs/CV_Gonzales_{CompanySlug}_{PositionSlug}.md
   ```
3. **Conversión**: Usa `md_to_docx.py` para generar el DOCX
4. **Reporte**: Muestra rutas de ambos archivos (MD y DOCX)

### Ejemplo de Salida

```
⚠️  Advertencias en context file:
⚠️    - Viabilidad 'Media-Alta' no válida. Debe ser una de: ['Alta', 'Media', 'Baja']
📄 CV Markdown encontrado: outputs/CV_Gonzales_CajaLosAndes_EspecialistaInnovacion.md
🔄 Convirtiendo a formato DOCX...
✅ CV DOCX generado exitosamente: outputs/CV_Gonzales_CajaLosAndes_EspecialistaInnovacion.docx

============================================================
FASE 2 COMPLETADA
📄 CV Markdown: outputs/CV_Gonzales_CajaLosAndes_EspecialistaInnovacion.md
📄 CV DOCX: outputs/CV_Gonzales_CajaLosAndes_EspecialistaInnovacion.docx
============================================================
```

## 📁 Estructura de Archivos

```
easy-job-apply-ai/
├── scripts/
│   ├── md_to_docx.py          # ← Script genérico de conversión
│   └── pipeline.py             # Pipeline integrado (usa md_to_docx)
├── outputs/
│   ├── CV_Gonzales_Company_Position.md    # Generado por LLM (Fase 2)
│   └── CV_Gonzales_Company_Position.docx  # Generado automáticamente
└── sessions/
    └── context_YYYYMMDD_Company_Position.yaml
```

## 🎯 Ventajas de la Solución

### Antes (Script por JD)

- ❌ Un script Python por cada JD
- ❌ Contenido hardcodeado en el código
- ❌ Difícil de mantener y actualizar
- ❌ No escalable

### Ahora (Script Genérico)

- ✅ Un solo script para todos los JDs
- ✅ Lee contenido desde Markdown
- ✅ Fácil de mantener
- ✅ Totalmente escalable
- ✅ Formato consistente

## 🔍 Formato Markdown Soportado

El script detecta y convierte automáticamente:

```markdown
# NOMBRE COMPLETO
Contacto con pipes: Lima | +51 123456 | email@example.com

## SECCIÓN
Texto normal

### Subsección
**Período o subtítulo**

- Bullet point
• Otro bullet point

**Categoría:** Contenido con formato bold

✓ Logro con checkmark
```

## 🛠️ Formato DOCX Generado

- **Márgenes**: 2.5 cm (configurable en `config.py`)
- **Fuente**: Calibri (configurable)
- **Tamaños**:
  - Nombre: 18pt bold
  - Contacto: 9pt
  - Headers: 12pt bold uppercase
  - Texto: 9.5pt justificado
  - Bullets: 9pt
- **Espaciado**: Interlineado simple, 5-10pt entre párrafos
- **ATS-friendly**: Sin tablas complejas, sin columnas

## 📝 Notas Técnicas

### Slugification de Nombres

El script extrae los slugs de `session_id` para garantizar consistencia:

```python
session_id = "20260121_CajaLosAndes_EspecialistaInnovacion"
# → company_slug = "CajaLosAndes"
# → position_slug = "EspecialistaInnovacion"
```

Esto evita problemas con:
- Espacios
- Acentos (á → a)
- Palabras como "de", "y", etc.

### Manejo de Formato Markdown

El script convierte automáticamente:
- `**texto**` → Negrita en DOCX
- Bullets (`-` o `•`) → Bullets formateados
- Checkmarks (`✓`) → Logros destacados

## 🚀 Próximos Pasos

1. **Usuario genera CV con LLM**: Usa prompt de Fase 2
2. **Guarda CV en Markdown**: `outputs/CV_Gonzales_Company_Position.md`
3. **Ejecuta pipeline**: `python scripts/pipeline.py fase2 --context ...`
4. **¡Listo!**: DOCX generado automáticamente

---

**Última actualización**: 2026-01-21
**Versión**: 2.1
