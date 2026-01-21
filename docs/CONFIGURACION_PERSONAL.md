# ⚙️ Configuración Personal del Sistema

Este documento describe la configuración específica para tu uso del sistema de generación de CVs.

---

## 📋 Configuración de Inputs

### CV Actual
**Ubicación:** `resumes_txt/`

Tienes **2 versiones** de tu CV en formato .txt:
- ✅ **Español:** `resumes_txt/CV_Julio_Gonzales - SPA.txt`
- ✅ **Inglés:** `resumes_txt/CV - Julio Gonzales - ENG.txt`

**Uso:**
- Selecciona la versión que corresponda al **idioma de la JD**
- Si JD está en español → Usa versión SPA
- Si JD está en inglés → Usa versión ENG
- El sistema puede traducir si es necesario, pero es más eficiente usar la versión correcta

**Importante:** Mantén ambas versiones actualizadas y sincronizadas.


---

### Location (Modalidad de Trabajo)

**Preferencias por orden:**
1. 🌎 **Remoto LATAM** (primera opción)
2. 🏢 **Híbrido (Lima)** (segunda opción)
3. 🏙️ **Lima, Perú** (si es presencial)

**Cómo usar en Fase 1:**
```yaml
LOCATION: "Remoto LATAM"  # Ajustar según la oferta
```

**Ejemplos según la JD:**
- Si JD dice "100% remoto" → `LOCATION: "Remoto LATAM"`
- Si JD dice "híbrido" → `LOCATION: "Híbrido (Lima)"`
- Si JD dice "presencial" → `LOCATION: "Lima, Perú"`

---

### Currency (Moneda de la Oferta)

**Depende de la JD** - Usar la moneda mencionada en la oferta.

**Monedas comunes:**
- `USD` - Dólares americanos (común en empresas tech/remotas)
- `PEN` - Soles peruanos (empresas locales Perú)
- `EUR` - Euros (empresas europeas)
- `CLP` - Pesos chilenos
- `COP` - Pesos colombianos
- `MXN` - Pesos mexicanos

**Cómo identificar:**
```
JD dice: "Salario competitivo USD 3,000 - 5,000"
→ CURRENCY: "USD"

JD dice: "Rango salarial: S/ 8,000 - 12,000"
→ CURRENCY: "PEN"

JD no menciona moneda pero empresa es de Chile
→ CURRENCY: "CLP" (inferir del país)
```

---

### Análisis Salarial

**Configuración:** `ANALISIS_SALARIAL_DETALLADO: true`

Siempre se genera análisis completo que incluye:
- ✅ Benchmark de mercado por percentiles (P25, P50, P75, P90)
- ✅ Desglose del paquete de compensación
- ✅ Factores que influyen en el rango
- ✅ Matriz de viabilidad de negociación
- ✅ Estrategias de negociación específicas
- ✅ Plan B (opciones alternativas)

**Beneficio:** Tendrás información completa para negociar efectivamente.

---

### Industry (Sector)

**No es necesario especificar** - El sistema lo extrae automáticamente de la JD.

El análisis identificará el sector basándose en:
- Descripción de la empresa en la JD
- Tipo de productos/servicios mencionados
- Contexto del rol

---

## 🎯 Template de Inputs para Fase 1

Copia y completa esto cada vez que ejecutes Fase 1:

```yaml
JD_TEXT: |
  {Pegar descripción completa del puesto}

CV_TEXT: |
  {Copiar contenido de templates/CV_Template.docx}

SALARY_EXPECTATIONS: |
  {Tu expectativa en la moneda de la oferta}
  Ejemplo: "USD 4,000 - USD 5,500" o "S/ 10,000 - S/ 13,000"

LOCATION: "Remoto LATAM"
  # Ajustar según oferta: "Remoto LATAM" | "Híbrido (Lima)" | "Lima, Perú"

CURRENCY: "USD"
  # Ajustar según moneda de la oferta: "USD" | "PEN" | "EUR" | etc.

ANALISIS_SALARIAL_DETALLADO: true
  # Siempre true para análisis completo
```

---

## 📊 Ejemplos de Configuración por Tipo de Oferta

### Ejemplo 1: Startup Tech Remota (USD)
```yaml
SALARY_EXPECTATIONS: "USD 4,000 - USD 5,500"
LOCATION: "Remoto LATAM"
CURRENCY: "USD"
```

### Ejemplo 2: Empresa Local Perú (PEN)
```yaml
SALARY_EXPECTATIONS: "S/ 10,000 - S/ 13,000"
LOCATION: "Híbrido (Lima)"
CURRENCY: "PEN"
```

### Ejemplo 3: Empresa Regional Chile (CLP)
```yaml
SALARY_EXPECTATIONS: "CLP 3,500,000 - CLP 4,500,000"
LOCATION: "Remoto LATAM"
CURRENCY: "CLP"
```

### Ejemplo 4: Empresa Europea (EUR)
```yaml
SALARY_EXPECTATIONS: "EUR 3,500 - EUR 4,800"
LOCATION: "Remoto LATAM"
CURRENCY: "EUR"
```

---

## 🔄 Workflow Típico

### 1. Preparación
- [ ] Actualizar `templates/CV_Template.docx` con experiencia reciente
- [ ] Tener la JD completa lista

### 2. Identificar Configuración
- [ ] Leer JD para identificar:
  - Modalidad de trabajo → `LOCATION`
  - Moneda mencionada → `CURRENCY`
  - Rango salarial (si lo mencionan)

### 3. Definir Expectativas
- [ ] Investigar rango de mercado para la posición
- [ ] Definir tu expectativa en la moneda correcta
- [ ] Considerar tu experiencia y fit con la posición

### 4. Ejecutar Fase 1
- [ ] Completar inputs con configuración identificada
- [ ] Ejecutar prompt de Fase 1
- [ ] Revisar análisis salarial detallado
- [ ] Verificar decisión GO/NO-GO

### 5. Ejecutar Fase 2 (si PROCEDER)
- [ ] Usar context file generado
- [ ] Copiar contenido de `CV_Template.docx`
- [ ] Generar CV optimizado

---

## 💡 Tips Específicos

### Tip 1: Conversión de Monedas
Si la JD no menciona moneda pero quieres negociar en otra:
- Investiga el tipo de cambio actual
- Convierte tu expectativa a la moneda de la empresa
- Menciona en entrevista tu preferencia de moneda

### Tip 2: Rangos Salariales Amplios
Para posiciones remotas LATAM, considera:
- Rango más amplio (ej: USD 3,500 - 6,000)
- El análisis te dirá dónde estás posicionado
- Ajusta según el país de la empresa

### Tip 3: Modalidad Híbrida
Si prefieres remoto pero oferta es híbrida:
- Usa `LOCATION: "Híbrido (Lima)"` en el análisis
- El CV se optimizará para esa modalidad
- Puedes negociar más remoto en entrevista

### Tip 4: Actualización del CV Base
Actualiza `CV_Template.docx` cuando:
- Completes un proyecto importante
- Obtengas una nueva certificación
- Cambies de rol o empresa
- Agregues nuevas habilidades relevantes

---

## 📌 Checklist de Verificación

Antes de ejecutar Fase 1, verifica:
- [ ] `CV_Template.docx` está actualizado
- [ ] Identificaste la moneda correcta de la oferta
- [ ] Definiste expectativa salarial realista
- [ ] Seleccionaste LOCATION según modalidad de la oferta
- [ ] `ANALISIS_SALARIAL_DETALLADO: true` (siempre)

---

**Última actualización:** 21 de enero, 2026  
**Configuración para:** Julio Alberto Gonzales Heredia
