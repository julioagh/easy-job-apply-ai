# 📁 Tracking — Job Application Tracking

Carpeta de tracking centralizado para la transición laboral 2026.

## Estructura

```
tracking/
├── TRACKING.md          ← Tabla maestra de postulaciones (activas + historial) — NO versionado
└── README.md            ← Este archivo
```

## Cómo usar

### Agregar nueva postulación
1. Ejecutar Fase 1 (análisis estratégico) normalmente via pipeline
2. Una vez generado el `context_*.yaml`, agregar la fila al `TRACKING.md`
3. Actualizar el status conforme avanza el proceso

### Status Flow
```
Analyzing → Preparing → Submitted → In Process → Interview → Offer
                                                            ↘ Rejected
                                                 ↘ Withdrawn
                        ↘ On Hold
↘ Discarded (NO_APLICAR)
```

### Percentile Icons
- ✅ Salary within market (viable)
- ⚠️ Upper limit (needs validation before investing time)
- ❌ Outside market (salary likely insufficient)

## Datos fuente
- Archivos YAML de sesión: `../sessions/context_*.yaml`
- Scripts de entrevista: `../sessions/INTERVIEW_SCRIPT_*.md`
- CVs generados: `../outputs/`
- Cover letters: `../cover_letters/`
