# 📚 Documentación - Easy Job Apply AI

Bienvenido a la documentación del sistema de generación automática de CVs.

---

## 🗂️ Estructura de la documentación

### 📖 [01-getting-started/](01-getting-started/) - **EMPIEZA AQUÍ**

Documentos esenciales para comenzar a usar el sistema:

- **[GUIA_EJECUCION_COWORK.md](01-getting-started/GUIA_EJECUCION_COWORK.md)** ⭐ **RECOMENDADO**
  - Guía paso a paso para ejecutar el sistema en Cowork
  - Incluye limitaciones de LLMs y cómo trabajar con ellas
  - Checklist completo y errores comunes
  
- **[CONFIGURACION_PERSONAL.md](01-getting-started/CONFIGURACION_PERSONAL.md)**
  - Configuración de datos personales (CV, expectativas salariales, etc.)
  - Personalización del sistema para tus necesidades

---

### 📘 [02-guides/](02-guides/) - Guías de uso

Guías detalladas para diferentes casos de uso:

- **[GUIA_RAPIDA.md](02-guides/GUIA_RAPIDA.md)**
  - Resumen del sistema v2.0
  - Comparativa con versión anterior
  - Tips de optimización
  - Convenciones de nombres

---

### 📙 [03-reference/](03-reference/) - Referencia técnica

Documentación técnica para desarrolladores:

- **[ESTRUCTURA_SCRIPTS.md](03-reference/ESTRUCTURA_SCRIPTS.md)**
  - Arquitectura del sistema
  - Descripción de scripts Python
  - Flujo de datos entre componentes

---

### 📦 [04-archive/](04-archive/) - Archivo histórico

Documentos deprecados o históricos:

- **[CHANGELOG_v2.1.md](04-archive/CHANGELOG_v2.1.md)**
  - Historial de cambios de la versión 2.1
  
- **[AUTOMATIZACION_FASE2.md](04-archive/AUTOMATIZACION_FASE2.md)**
  - Documentación antigua de automatización (deprecada)
  - Reemplazada por el flujo automático en `prompt_fase1_COWORK_DIRECTO.md`

---

## 🚀 Inicio rápido

1. **Primera vez usando el sistema:**
   - Lee [GUIA_EJECUCION_COWORK.md](01-getting-started/GUIA_EJECUCION_COWORK.md)
   - Configura tus datos en [CONFIGURACION_PERSONAL.md](01-getting-started/CONFIGURACION_PERSONAL.md)

2. **Ya configurado, quiero aplicar a una posición:**
   - Abre `prompts/prompt_fase1_COWORK_DIRECTO.md`
   - Reemplaza JD + expectativas + ubicación
   - Copia/pega en Cowork
   - Responde "Sí" cuando pregunte

3. **Necesito entender el sistema:**
   - Lee [GUIA_RAPIDA.md](02-guides/GUIA_RAPIDA.md)

4. **Quiero modificar los scripts:**
   - Consulta [ESTRUCTURA_SCRIPTS.md](03-reference/ESTRUCTURA_SCRIPTS.md)

---

## 💡 Flujo recomendado

```
┌─────────────────────────────────────────┐
│  1. GUIA_EJECUCION_COWORK.md           │ ← Empieza aquí
│     (Cómo usar el sistema)              │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  2. CONFIGURACION_PERSONAL.md          │
│     (Configura tus datos)               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  3. Ejecuta prompt_fase1_COWORK_DIRECTO │
│     (Aplica a posiciones)               │
└─────────────────────────────────────────┘
```

---

## 📝 Notas

- **Archivos deprecados** están en `04-archive/` para referencia histórica
- **Guías actualizadas** reflejan el flujo automático Fase 1 → 2 → 3
- **Documentación técnica** en `03-reference/` para desarrolladores

---

**Última actualización:** 21 de enero, 2026  
**Versión del sistema:** 2.0
