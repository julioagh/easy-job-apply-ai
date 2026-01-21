#!/usr/bin/env python3
"""
Validador de Context Files YAML para Easy Job Apply AI
Versión: 1.0
"""

import sys
from pathlib import Path
import yaml
from typing import Dict, List, Any, Tuple

# Agregar directorio scripts al path
sys.path.insert(0, str(Path(__file__).parent))

from config import get_session_path

# Esquema esperado para context files
REQUIRED_FIELDS = {
    'session_id': str,
    'timestamp': str,
    'version': str,
    'jd': {
        'company': str,
        'position': str,
        'seniority_level': str,
        'industry': str,
        'location': str,
        'keywords_criticos': list,
        'requisitos_indispensables': list,
        'idioma_jd': str
    },
    'cv_original': {
        'candidate_name': str,
        'years_experience': (int, float),
        'current_role': str
    },
    'fase1_resultado': {
        'match_score': (int, float),
        'clasificacion': str,
        'recomendacion': str,
        'justificacion_recomendacion': str,
        'gaps_criticos': list,
        'fortalezas_clave': list,
        'keywords_a_incluir': dict,
        'experiencia_a_priorizar': list
    },
    'expectativas_salariales': {
        'candidato_min': (int, float),
        'candidato_max': (int, float),
        'mercado_p50': (int, float),
        'posicionamiento': str,
        'viabilidad': str,
        'currency': str
    }
}

VALID_RECOMENDACIONES = ['PROCEDER', 'RECONSIDERAR', 'NO_APLICAR']
VALID_CLASIFICACIONES = ['Bajo', 'Medio', 'Alto', 'Excelente']
VALID_VIABILIDADES = ['Alta', 'Media', 'Baja']


class YAMLValidationError(Exception):
    """Error de validación de YAML"""
    pass


def validate_field_type(value: Any, expected_type: Any, field_path: str) -> None:
    """
    Valida el tipo de un campo

    Args:
        value: Valor a validar
        expected_type: Tipo esperado o tupla de tipos
        field_path: Ruta del campo para mensajes de error
    """
    if isinstance(expected_type, tuple):
        if not isinstance(value, expected_type):
            raise YAMLValidationError(
                f"Campo '{field_path}': tipo incorrecto. "
                f"Esperado {expected_type}, encontrado {type(value)}"
            )
    elif isinstance(expected_type, dict):
        if not isinstance(value, dict):
            raise YAMLValidationError(
                f"Campo '{field_path}': debe ser un objeto/dict"
            )
    elif isinstance(expected_type, list):
        if not isinstance(value, list):
            raise YAMLValidationError(
                f"Campo '{field_path}': debe ser una lista"
            )
    else:
        if not isinstance(value, expected_type):
            raise YAMLValidationError(
                f"Campo '{field_path}': tipo incorrecto. "
                f"Esperado {expected_type.__name__}, encontrado {type(value).__name__}"
            )


def validate_structure(data: Dict, schema: Dict, path: str = "") -> List[str]:
    """
    Valida recursivamente la estructura del YAML

    Args:
        data: Datos a validar
        schema: Esquema esperado
        path: Ruta actual (para mensajes de error)

    Returns:
        Lista de errores encontrados
    """
    errors = []

    for field_name, expected_type in schema.items():
        current_path = f"{path}.{field_name}" if path else field_name

        # Verificar que el campo existe
        if field_name not in data:
            errors.append(f"Campo requerido faltante: '{current_path}'")
            continue

        field_value = data[field_name]

        # Validar tipo
        if isinstance(expected_type, dict):
            # Campo nested
            if not isinstance(field_value, dict):
                errors.append(f"Campo '{current_path}' debe ser un objeto")
            else:
                # Validar recursivamente
                nested_errors = validate_structure(field_value, expected_type, current_path)
                errors.extend(nested_errors)
        else:
            # Campo simple
            try:
                validate_field_type(field_value, expected_type, current_path)
            except YAMLValidationError as e:
                errors.append(str(e))

    return errors


def validate_business_rules(data: Dict) -> List[str]:
    """
    Valida reglas de negocio adicionales

    Args:
        data: Datos del context file

    Returns:
        Lista de warnings/errores
    """
    warnings = []

    # Validar recomendación
    recomendacion = data.get('fase1_resultado', {}).get('recomendacion', '')
    if recomendacion not in VALID_RECOMENDACIONES:
        warnings.append(
            f"Recomendación '{recomendacion}' no válida. "
            f"Debe ser una de: {VALID_RECOMENDACIONES}"
        )

    # Validar clasificación
    clasificacion = data.get('fase1_resultado', {}).get('clasificacion', '')
    if clasificacion not in VALID_CLASIFICACIONES:
        warnings.append(
            f"Clasificación '{clasificacion}' no válida. "
            f"Debe ser una de: {VALID_CLASIFICACIONES}"
        )

    # Validar viabilidad salarial
    viabilidad = data.get('expectativas_salariales', {}).get('viabilidad', '')
    if viabilidad not in VALID_VIABILIDADES:
        warnings.append(
            f"Viabilidad '{viabilidad}' no válida. "
            f"Debe ser una de: {VALID_VIABILIDADES}"
        )

    # Validar match score en rango 0-100
    match_score = data.get('fase1_resultado', {}).get('match_score', 0)
    if not (0 <= match_score <= 100):
        warnings.append(f"Match score {match_score} fuera de rango (0-100)")

    # Validar expectativas salariales
    exp_sal = data.get('expectativas_salariales', {})
    if exp_sal.get('candidato_min', 0) > exp_sal.get('candidato_max', 0):
        warnings.append("Expectativa salarial mínima mayor que máxima")

    # Validar que hay keywords críticos
    keywords = data.get('jd', {}).get('keywords_criticos', [])
    if len(keywords) < 5:
        warnings.append(
            f"Solo {len(keywords)} keywords críticos (se recomiendan al menos 8-12)"
        )

    return warnings


def validate_context_file(file_path: Path) -> Tuple[bool, List[str], List[str]]:
    """
    Valida un context file YAML

    Args:
        file_path: Ruta al archivo YAML

    Returns:
        Tupla (es_valido, errores, warnings)
    """
    errors = []
    warnings = []

    # Verificar que el archivo existe
    if not file_path.exists():
        return False, [f"Archivo no encontrado: {file_path}"], []

    # Intentar cargar YAML
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
    except yaml.YAMLError as e:
        return False, [f"Error parseando YAML: {e}"], []
    except Exception as e:
        return False, [f"Error leyendo archivo: {e}"], []

    # Validar estructura
    structure_errors = validate_structure(data, REQUIRED_FIELDS)
    errors.extend(structure_errors)

    # Validar reglas de negocio (solo si estructura es válida)
    if not structure_errors:
        business_warnings = validate_business_rules(data)
        warnings.extend(business_warnings)

    is_valid = len(errors) == 0

    return is_valid, errors, warnings


def main():
    """Función principal para CLI"""
    import argparse

    parser = argparse.ArgumentParser(
        description='Validar context files YAML para Easy Job Apply AI'
    )
    parser.add_argument('file', help='Archivo YAML a validar')
    parser.add_argument('-v', '--verbose', action='store_true',
                        help='Mostrar información detallada')

    args = parser.parse_args()

    # Determinar ruta del archivo
    file_path = Path(args.file)
    if not file_path.is_absolute():
        # Intentar en directorio sessions
        session_path = get_session_path(args.file)
        if session_path.exists():
            file_path = session_path

    print(f"🔍 Validando: {file_path}")
    print("-" * 60)

    # Validar
    is_valid, errors, warnings = validate_context_file(file_path)

    # Mostrar resultados
    if errors:
        print("\n❌ ERRORES ENCONTRADOS:")
        for i, error in enumerate(errors, 1):
            print(f"  {i}. {error}")

    if warnings:
        print("\n⚠️  ADVERTENCIAS:")
        for i, warning in enumerate(warnings, 1):
            print(f"  {i}. {warning}")

    if is_valid:
        if warnings:
            print("\n✅ Archivo VÁLIDO (con advertencias)")
        else:
            print("\n✅ Archivo VÁLIDO")
        return 0
    else:
        print("\n❌ Archivo INVÁLIDO")
        return 1


if __name__ == '__main__':
    sys.exit(main())
