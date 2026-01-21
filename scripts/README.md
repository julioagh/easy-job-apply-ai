# Scripts - Easy Job Apply AI

Este directorio contiene scripts de automatización para el sistema Easy Job Apply AI v2.0

---

## 📄 generate_cv_docx.py

**Propósito:** Genera CV en formato DOCX con formato profesional ATS-friendly

**Uso:**
```bash
python3 scripts/generate_cv_docx.py
```

**Output:**
- Archivo: `outputs/CV_Gonzales_AttachGroup_AgileCoach.docx`
- Formato: Microsoft Word (.docx)
- Tamaño aproximado: 39 KB

**Formato aplicado automáticamente:**
- **Márgenes:** 1.22 cm en todos los lados
- **Fuente:** Arial
- **Tamaños:**
  - Nombre: 18pt Bold
  - Headers de sección: 12pt Bold UPPERCASE
  - Contacto: 9pt Normal
  - Empresa/Cargo: 9pt Normal (sin bold)
  - Bullets: 9pt Normal
  - Summary: 9.5pt Normal
  - Subheaders: 9.5pt Bold

**Dependencias:**
```bash
pip install python-docx --user
```

**Características:**
- ✅ 100% ATS-friendly (sin tablas, sin gráficos)
- ✅ Keywords optimizados incluidos
- ✅ Formato profesional consistente
- ✅ Máximo 2 páginas
- ✅ Listo para aplicar sin edición manual

**Nota actual:**
El script está hardcodeado para el CV de Julio Gonzales aplicando a Attach Group (Agile Coach Entry - AI Transformation). Para futuras aplicaciones, el contenido debe ser generado dinámicamente por el LLM en Fase 2.

**Roadmap futuro:**
- [ ] Hacer el script parametrizable (recibir contenido vía JSON/YAML)
- [ ] Soportar múltiples idiomas automáticamente
- [ ] Detectar y ajustar longitud para mantener 2 páginas
- [ ] Validar keywords automáticamente

---

**Última actualización:** 21 de enero, 2026
**Versión:** 1.0
