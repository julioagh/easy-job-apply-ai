# Resume / CV

Este directorio contiene tus CVs actuales en formato texto (.txt) en ambos idiomas.

## 📁 Archivos

### Versión en Español
**Archivo:** `CV_Julio_Gonzales - SPA.txt`
- Usar para posiciones con JD en español
- Mantener actualizado con tu experiencia más reciente

### Versión en Inglés
**Archivo:** `CV - Julio Gonzales - ENG.txt`
- Usar para posiciones con JD en inglés
- Mantener actualizado con tu experiencia más reciente

## 🔄 Uso en el Sistema

### Fase 1 (Análisis Estratégico)
Selecciona la versión que corresponda al idioma de la JD:
```yaml
CV_TEXT: |
  {Copiar contenido de resume/CV_Julio_Gonzales - SPA.txt}
  # O resume/CV - Julio Gonzales - ENG.txt si JD está en inglés
```

### Fase 2 (Generación CV DOCX)
El sistema detectará automáticamente el idioma de la JD y traducirá si es necesario.

## ✏️ Actualización

Actualiza ambas versiones cuando:
- Completes proyectos importantes
- Obtengas nuevas certificaciones
- Cambies de rol o empresa
- Agregues habilidades relevantes

**Importante:** Mantén ambas versiones sincronizadas (mismo contenido, diferente idioma).

## 📝 Formato

Los archivos están en formato .txt plano para:
- Fácil copia/pega en los prompts
- Compatible con cualquier LLM
- Sin problemas de formato
- Fácil de versionar en Git

## 🔒 Privacidad

Estos archivos contienen información personal. El `.gitignore` está configurado para:
- ✅ Incluir estos archivos en el repositorio (son tus CVs base)
- ❌ Excluir CVs generados en `outputs/` (pueden contener datos sensibles por posición)
