# Archivos de sesión

Este directorio contiene los archivos generados durante el proceso de análisis y generación de CVs.

## Tipos de Archivos

### Context Files (`.yaml`)
**Formato:** `context_{SESSION_ID}.yaml`

Archivos YAML generados por Fase 1 que contienen:
- Keywords críticos con frecuencia objetivo
- Gaps identificados y estrategias de mitigación
- Fortalezas clave del candidato
- Experiencia a priorizar
- Datos estructurados para Fase 2

**Ejemplo:** `context_20260121_AttachGroup_AgileCoach.yaml`

### Análisis (`.md`)
**Formato:** `analisis_{SESSION_ID}.md`

Documentos markdown generados por Fase 1 para revisión humana que contienen:
- Análisis de fit detallado
- Tabla de gaps críticos
- Análisis salarial
- Decisión GO/NO-GO con justificación
- Próximos pasos recomendados

**Ejemplo:** `analisis_20260121_AttachGroup_AgileCoach.md`

## Convención de Nombres

**Session ID:** `YYYYMMDD_EMPRESA_POSICION`

Ejemplos:
- `20260121_AttachGroup_AgileCoach`
- `20260121_BBVA_ScrumMaster`
- `20260121_LosAndes_ProductOwner`

## Limpieza

Se recomienda archivar o eliminar archivos de sesión después de:
- Completar el proceso de aplicación
- Decidir no aplicar a la posición
- 30 días de inactividad

## Nota

Los context files NO contienen el texto completo de JD o CV (solo referencias y datos estructurados) para optimizar el uso de tokens.
