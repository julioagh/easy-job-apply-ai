# CVs Base / Master

Este directorio contiene los CVs maestro/base del candidato.

## Propósito

Los CVs en este directorio sirven como fuente para:
- Generar análisis estratégicos (Fase 1)
- Crear CVs optimizados para posiciones específicas (Fase 2)
- Mantener un registro actualizado de experiencia y competencias

## Estructura Actual

```
resumes_base/
├── README.md                                    # Este archivo
├── CV_JulioGonzales_MASTER_2025.md             # CV maestro en español (Markdown)
└── CV_JulioGonzales_MASTER_2025_ENG.md         # CV maestro en inglés (Markdown)
```

## Formato

Los CVs base están en:
- **Markdown (.md)** - Formato recomendado para facilidad de edición y versionamiento

## Uso por Idioma

### Para posiciones en español:
```bash
python scripts/pipeline.py fase1 \
  --cv resumes_base/CV_JulioGonzales_MASTER_2025.md \
  --jd jd_empresa.txt \
  --salary "USD 5000-6000"
```

### Para posiciones en inglés:
```bash
python scripts/pipeline.py fase1 \
  --cv resumes_base/CV_JulioGonzales_MASTER_2025_ENG.md \
  --jd jd_company.txt \
  --salary "USD 5000-6000"
```

**Ventaja:** Al usar el CV maestro en el mismo idioma que la JD, ahorras 30-40% de tokens en Fase 2 y mejoras la precisión de términos técnicos.

## Nota Importante

**Este directorio NO se versiona en Git** (está en `.gitignore`) para proteger información personal.

Mantén tus CVs base actualizados con:
- Nuevas experiencias profesionales
- Certificaciones recientes
- Proyectos destacados
- Competencias adquiridas

---

**Última actualización:** 26 de enero, 2026
