#!/usr/bin/env python3
"""
Pipeline completo de Easy Job Apply AI
Automatiza el flujo completo: Fase 1 (análisis) → Decisión → Fase 2 (generación CV)
Versión: 1.0
"""

import sys
import json
from pathlib import Path
from typing import Dict, Optional, Tuple
from datetime import datetime

# Agregar directorio scripts al path
sys.path.insert(0, str(Path(__file__).parent))

from config import (
    get_session_path,
    get_output_path,
    get_resume_path,
    DEFAULT_CURRENCY,
    DEFAULT_LOCATION
)
from validate_yaml import validate_context_file


class Pipeline:
    """Pipeline completo de generación de CVs"""

    def __init__(self, verbose: bool = False):
        self.verbose = verbose
        self.session_id = None
        self.context_file = None

    def log(self, message: str, level: str = "INFO"):
        """Log condicional basado en verbose"""
        if self.verbose or level in ["ERROR", "WARNING"]:
            prefix = {
                "INFO": "ℹ️ ",
                "SUCCESS": "✅",
                "WARNING": "⚠️ ",
                "ERROR": "❌"
            }.get(level, "")
            print(f"{prefix} {message}")

    def generate_session_id(self, company: str, position: str) -> str:
        """
        Genera session ID

        Args:
            company: Nombre de la empresa
            position: Título del puesto

        Returns:
            Session ID en formato YYYYMMDD_EMPRESA_POSICION
        """
        date_str = datetime.now().strftime("%Y%m%d")
        company_slug = company.replace(' ', '').replace('-', '')
        position_slug = position.replace(' ', '').replace('-', '')

        return f"{date_str}_{company_slug}_{position_slug}"

    def fase1_analysis(self,
                       jd_file: Path,
                       cv_file: Path,
                       salary_expectations: str,
                       location: str = DEFAULT_LOCATION,
                       currency: str = DEFAULT_CURRENCY,
                       company: Optional[str] = None,
                       position: Optional[str] = None) -> Tuple[bool, str]:
        """
        Ejecuta Fase 1: Análisis estratégico

        NOTA: Esta función prepara los inputs pero NO ejecuta el LLM.
        El usuario debe copiar el output y ejecutarlo en su LLM preferido.

        Args:
            jd_file: Ruta al archivo con Job Description
            cv_file: Ruta al archivo con CV
            salary_expectations: Expectativas salariales (ej: "USD 4000-5500")
            location: Ubicación
            currency: Moneda
            company: Nombre de empresa (opcional, se extrae de JD)
            position: Título de posición (opcional, se extrae de JD)

        Returns:
            Tupla (success, message)
        """
        self.log("📋 Preparando Fase 1: Análisis Estratégico")

        # Leer archivos
        try:
            with open(jd_file, 'r', encoding='utf-8') as f:
                jd_text = f.read()
            with open(cv_file, 'r', encoding='utf-8') as f:
                cv_text = f.read()
        except Exception as e:
            return False, f"Error leyendo archivos: {e}"

        # Generar session ID
        if not company or not position:
            # Intentar extraer de JD (muy básico)
            company = company or "Company"
            position = position or "Position"

        self.session_id = self.generate_session_id(company, position)
        self.log(f"Session ID: {self.session_id}")

        # Preparar output para Fase 1
        fase1_input = f"""
# FASE 1: ANÁLISIS ESTRATÉGICO
Session ID: {self.session_id}

## INPUTS

### JD_TEXT:
```
{jd_text}
```

### CV_TEXT:
```
{cv_text}
```

### SALARY_EXPECTATIONS:
{salary_expectations}

### LOCATION:
{location}

### CURRENCY:
{currency}

### ANALISIS_SALARIAL_DETALLADO:
true

---

INSTRUCCIÓN: Copia este contenido y pégalo en tu LLM junto con el prompt de Fase 1.
El LLM generará:
1. Context file YAML → Guardar como: sessions/context_{self.session_id}.yaml
2. Análisis Markdown → Guardar como: sessions/analisis_{self.session_id}.md

Después ejecuta: python scripts/pipeline.py fase2 --context sessions/context_{self.session_id}.yaml
"""

        # Guardar input para referencia
        input_file = get_session_path(f"fase1_input_{self.session_id}.txt")
        with open(input_file, 'w', encoding='utf-8') as f:
            f.write(fase1_input)

        self.log(f"✅ Input de Fase 1 generado: {input_file}", "SUCCESS")
        self.log("\n" + "="*60)
        self.log("SIGUIENTE PASO:")
        self.log("1. Abre el archivo generado")
        self.log("2. Copia el contenido completo")
        self.log("3. Pégalo en tu LLM junto con prompts/prompt_fase1_analisis_estrategico_v2.md")
        self.log("4. Guarda los outputs generados (context YAML + análisis MD)")
        self.log(f"5. Ejecuta: python scripts/pipeline.py fase2 --context context_{self.session_id}.yaml")
        self.log("="*60)

        return True, str(input_file)

    def check_decision(self, context_file: Path) -> Tuple[bool, str, str]:
        """
        Revisa la decisión GO/NO-GO del context file

        Args:
            context_file: Ruta al context file YAML

        Returns:
            Tupla (should_proceed, recomendacion, justificacion)
        """
        import yaml

        self.log("🔍 Revisando decisión GO/NO-GO...")

        # Validar context file primero
        is_valid, errors, warnings = validate_context_file(context_file)

        if not is_valid:
            self.log("Context file inválido:", "ERROR")
            for error in errors:
                self.log(f"  - {error}", "ERROR")
            return False, "INVALID", "Context file inválido"

        if warnings:
            self.log("Advertencias en context file:", "WARNING")
            for warning in warnings:
                self.log(f"  - {warning}", "WARNING")

        # Leer decisión
        with open(context_file, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)

        recomendacion = data['fase1_resultado']['recomendacion']
        justificacion = data['fase1_resultado']['justificacion_recomendacion']
        match_score = data['fase1_resultado']['match_score']

        self.log(f"Match Score: {match_score}%")
        self.log(f"Recomendación: {recomendacion}")

        should_proceed = recomendacion == "PROCEDER"

        return should_proceed, recomendacion, justificacion

    def fase2_generate_cv(self, context_file: Path, force: bool = False) -> Tuple[bool, Optional[Path]]:
        """
        Ejecuta Fase 2: Generación de CV DOCX

        Args:
            context_file: Ruta al context file YAML
            force: Forzar generación aunque recomendación sea NO_APLICAR

        Returns:
            Tupla (success, cv_path)
        """
        self.log("📝 Iniciando Fase 2: Generación de CV")

        # Verificar decisión
        should_proceed, recomendacion, justificacion = self.check_decision(context_file)

        if not should_proceed and not force:
            self.log(f"❌ No se recomienda proceder: {recomendacion}", "ERROR")
            self.log(f"Justificación: {justificacion}")
            self.log("\nUsa --force para generar CV de todos modos", "WARNING")
            return False, None

        if not should_proceed and force:
            self.log("⚠️  Generando CV a pesar de recomendación negativa (--force)", "WARNING")

        self.log("✅ Recomendación: PROCEDER")

        import yaml

        with open(context_file, 'r', encoding='utf-8') as f:
            context_data = yaml.safe_load(f)

        session_id = context_data['session_id']
        
        # Extraer nombre completo del candidato del context file
        candidate_full_name = context_data.get('cv_original', {}).get('candidate_name', '')
        
        if not candidate_full_name:
            self.log("⚠️  Advertencia: No se encontró 'candidate_name' en el context file", "WARNING")
            candidate_full_name = "Candidate"

        # Extraer company y position slugs del session_id
        # Formato: YYYYMMDD_CompanySlug_PositionSlug
        parts = session_id.split('_')
        if len(parts) >= 3:
            company_slug = parts[1]
            position_slug = '_'.join(parts[2:])  # En caso de que haya múltiples underscores
        else:
            # Fallback: usar los campos originales
            company = context_data['jd']['company']
            position = context_data['jd']['position']
            company_slug = company.replace(' ', '').replace('-', '')
            position_slug = position.replace(' ', '').replace('-', '')

        # Importar la función de formato de nombre
        from config import format_cv_filename
        
        # Generar nombre de archivo usando la nueva función
        cv_basename = format_cv_filename(candidate_full_name, company_slug, position_slug)
        
        # Buscar CV en Markdown en outputs/
        md_filename = f"{cv_basename}.md"
        md_path = get_output_path(md_filename)

        if not md_path.exists():
            self.log(f"❌ Error: No se encuentra el CV en Markdown: {md_path}", "ERROR")
            self.log("⚠️  Genera primero el CV optimizado usando el LLM con el prompt de Fase 2", "WARNING")

            # Generar archivo de instrucciones para el usuario
            fase2_input = f"""
# FASE 2: GENERACIÓN DE CV DOCX
Session ID: {session_id}

## INPUTS

### CONTEXT_FILE:
Usar: {context_file}

### Instrucciones:
1. Copia el contenido de prompts/prompt_fase2_generacion_cv_docx_v2.md
2. Completa los inputs requeridos (CV_ORIGINAL, JD_COMPLETA)
3. Referencia este context file
4. El LLM generará el CV optimizado en Markdown
5. Ejecuta nuevamente este comando: python scripts/pipeline.py fase2 --context {context_file}

---

ARCHIVO ESPERADO:
{md_path}
"""
            input_file = get_session_path(f"fase2_input_{session_id}.txt")
            with open(input_file, 'w', encoding='utf-8') as f:
                f.write(fase2_input)

            return False, None

        # Convertir MD a DOCX usando el nuevo conversor JS (estilo v2 — Calibri, navy palette)
        print(f"📄 CV Markdown encontrado: {md_path}")
        print("🔄 Convirtiendo a formato DOCX (estilo v2)...")

        docx_path = Path(str(md_path).replace('.md', '.docx'))

        try:
            import subprocess
            script_path = Path(__file__).parent / "md_to_docx_v2.js"

            result = subprocess.run(
                ["node", str(script_path), str(md_path), str(docx_path)],
                capture_output=True, text=True
            )

            if result.returncode != 0:
                # Fallback al conversor Python si node/JS no disponible
                print(f"⚠️  Conversor JS no disponible, usando conversor Python...")
                if result.stderr:
                    print(result.stderr[:200])
                from md_to_docx import create_docx_from_markdown
                docx_path = create_docx_from_markdown(str(md_path))
            else:
                print(result.stdout.strip())

            print(f"✅ CV DOCX generado exitosamente: {docx_path}")
            print("\n" + "="*60)
            print("FASE 2 COMPLETADA")
            print(f"📄 CV Markdown: {md_path}")
            print(f"📄 CV DOCX:     {docx_path}")
            print("="*60)

            return True, docx_path

        except Exception as e:
            print(f"❌ Error al convertir MD a DOCX: {e}")
            import traceback
            traceback.print_exc()
            return False, None

    def run_full_pipeline(self,
                          jd_file: Path,
                          cv_file: Path,
                          salary_expectations: str,
                          **kwargs) -> Tuple[bool, str]:
        """
        Ejecuta pipeline completo (preparación de ambas fases)

        Args:
            jd_file: Ruta a Job Description
            cv_file: Ruta a CV
            salary_expectations: Expectativas salariales
            **kwargs: Argumentos adicionales (location, currency, etc.)

        Returns:
            Tupla (success, message)
        """
        self.log("🚀 Iniciando pipeline completo", "INFO")

        # Fase 1
        success, message = self.fase1_analysis(
            jd_file, cv_file, salary_expectations, **kwargs
        )

        if not success:
            return False, message

        self.log(f"\n✅ Pipeline preparado exitosamente", "SUCCESS")
        self.log(f"Session ID: {self.session_id}")

        return True, f"Pipeline preparado. Session ID: {self.session_id}"


def main():
    """Función principal CLI"""
    import argparse

    parser = argparse.ArgumentParser(
        description='Pipeline completo de Easy Job Apply AI',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Ejemplos:
  # Preparar Fase 1 completa
  python scripts/pipeline.py fase1 \\
    --jd examples/example_jd.txt \\
    --cv resumes_base/CV_JulioGonzales_MASTER_2025.md \\
    --salary "USD 4000-5500" \\
    --company AttachGroup \\
    --position "Agile Coach"

  # Preparar Fase 2 (después de ejecutar Fase 1 en LLM)
  python scripts/pipeline.py fase2 \\
    --context sessions/context_20260121_AttachGroup_AgileCoach.yaml

  # Validar context file
  python scripts/pipeline.py validate \\
    --context sessions/context_20260121_AttachGroup_AgileCoach.yaml
        """
    )

    subparsers = parser.add_subparsers(dest='command', help='Comando a ejecutar')

    # Fase 1
    fase1_parser = subparsers.add_parser('fase1', help='Preparar Fase 1 (análisis)')
    fase1_parser.add_argument('--jd', required=True, help='Archivo con Job Description')
    fase1_parser.add_argument('--cv', required=True, help='Archivo con CV')
    fase1_parser.add_argument('--salary', required=True, help='Expectativas salariales')
    fase1_parser.add_argument('--location', default=DEFAULT_LOCATION, help='Ubicación')
    fase1_parser.add_argument('--currency', default=DEFAULT_CURRENCY, help='Moneda')
    fase1_parser.add_argument('--company', help='Nombre de la empresa')
    fase1_parser.add_argument('--position', help='Título del puesto')

    # Fase 2
    fase2_parser = subparsers.add_parser('fase2', help='Preparar Fase 2 (generación CV)')
    fase2_parser.add_argument('--context', required=True, help='Context file YAML de Fase 1')
    fase2_parser.add_argument('--force', action='store_true',
                              help='Generar CV aunque recomendación sea negativa')

    # Validar
    validate_parser = subparsers.add_parser('validate', help='Validar context file')
    validate_parser.add_argument('--context', required=True, help='Context file YAML')

    # Argumentos globales
    parser.add_argument('-v', '--verbose', action='store_true', help='Modo verbose')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 1

    # Crear pipeline
    pipeline = Pipeline(verbose=args.verbose)

    # Ejecutar comando
    if args.command == 'fase1':
        success, message = pipeline.fase1_analysis(
            jd_file=Path(args.jd),
            cv_file=Path(args.cv),
            salary_expectations=args.salary,
            location=args.location,
            currency=args.currency,
            company=args.company,
            position=args.position
        )
        return 0 if success else 1

    elif args.command == 'fase2':
        success, result = pipeline.fase2_generate_cv(
            context_file=get_session_path(args.context) if not Path(args.context).is_absolute()
            else Path(args.context),
            force=args.force
        )
        return 0 if success else 1

    elif args.command == 'validate':
        context_path = get_session_path(args.context) if not Path(args.context).is_absolute() else Path(args.context)
        is_valid, errors, warnings = validate_context_file(context_path)

        if errors:
            print("\n❌ ERRORES:")
            for error in errors:
                print(f"  - {error}")

        if warnings:
            print("\n⚠️  ADVERTENCIAS:")
            for warning in warnings:
                print(f"  - {warning}")

        if is_valid:
            print("\n✅ Context file VÁLIDO")
            return 0
        else:
            print("\n❌ Context file INVÁLIDO")
            return 1

    return 0


if __name__ == '__main__':
    sys.exit(main())
