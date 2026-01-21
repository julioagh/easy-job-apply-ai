"""
Tests para validador de YAML
"""

import pytest
from pathlib import Path
import yaml
import tempfile
import sys

# Agregar scripts al path
sys.path.insert(0, str(Path(__file__).parent.parent / 'scripts'))

from validate_yaml import (
    validate_field_type,
    validate_structure,
    validate_business_rules,
    validate_context_file,
    YAMLValidationError,
    VALID_RECOMENDACIONES
)


class TestYAMLValidator:
    """Tests para validador de YAML"""

    @pytest.fixture
    def valid_context_data(self):
        """Fixture con context data válido"""
        return {
            'session_id': '20260121_Test_Position',
            'timestamp': '2026-01-21T10:00:00',
            'version': '2.0',
            'jd': {
                'company': 'Test Company',
                'position': 'Test Position',
                'seniority_level': 'Senior',
                'industry': 'Tech',
                'location': 'Remote',
                'keywords_criticos': [
                    {'keyword': 'Python', 'categoria': 'Hard Skill', 'frecuencia_objetivo': 5},
                    {'keyword': 'Agile', 'categoria': 'Metodología', 'frecuencia_objetivo': 3}
                ],
                'requisitos_indispensables': ['Req1', 'Req2'],
                'idioma_jd': 'español'
            },
            'cv_original': {
                'candidate_name': 'Test User',
                'years_experience': 10,
                'current_role': 'Senior Developer'
            },
            'fase1_resultado': {
                'match_score': 85,
                'clasificacion': 'Alto',
                'recomendacion': 'PROCEDER',
                'justificacion_recomendacion': 'Good fit',
                'gaps_criticos': [],
                'fortalezas_clave': [],
                'keywords_a_incluir': {'Python': {'frecuencia_objetivo': 5}},
                'experiencia_a_priorizar': []
            },
            'expectativas_salariales': {
                'candidato_min': 5000,
                'candidato_max': 6000,
                'mercado_p50': 5500,
                'posicionamiento': 'Dentro',
                'viabilidad': 'Alta',
                'currency': 'USD'
            }
        }

    def test_validate_field_type_string(self):
        """Test validación de tipo string"""
        validate_field_type("test", str, "test_field")
        # No debe lanzar excepción

    def test_validate_field_type_invalid(self):
        """Test validación de tipo inválido"""
        with pytest.raises(YAMLValidationError):
            validate_field_type(123, str, "test_field")

    def test_validate_field_type_multiple(self):
        """Test validación con múltiples tipos permitidos"""
        validate_field_type(123, (int, float), "test_field")
        validate_field_type(123.5, (int, float), "test_field")
        # No debe lanzar excepción

    def test_validate_structure_valid(self, valid_context_data):
        """Test validación de estructura válida"""
        from validate_yaml import REQUIRED_FIELDS
        errors = validate_structure(valid_context_data, REQUIRED_FIELDS)
        assert len(errors) == 0

    def test_validate_structure_missing_field(self):
        """Test validación con campo faltante"""
        from validate_yaml import REQUIRED_FIELDS
        data = {'session_id': 'test'}  # Falta la mayoría de campos
        errors = validate_structure(data, REQUIRED_FIELDS)
        assert len(errors) > 0

    def test_validate_business_rules_valid(self, valid_context_data):
        """Test validación de reglas de negocio válidas"""
        warnings = validate_business_rules(valid_context_data)
        # Puede tener advertencias pero no errores críticos
        assert isinstance(warnings, list)

    def test_validate_business_rules_invalid_recomendacion(self, valid_context_data):
        """Test validación con recomendación inválida"""
        valid_context_data['fase1_resultado']['recomendacion'] = 'INVALID'
        warnings = validate_business_rules(valid_context_data)
        assert any('Recomendación' in w for w in warnings)

    def test_validate_business_rules_invalid_match_score(self, valid_context_data):
        """Test validación con match score fuera de rango"""
        valid_context_data['fase1_resultado']['match_score'] = 150
        warnings = validate_business_rules(valid_context_data)
        assert any('Match score' in w for w in warnings)

    def test_validate_business_rules_salary_mismatch(self, valid_context_data):
        """Test validación con expectativas salariales inconsistentes"""
        valid_context_data['expectativas_salariales']['candidato_min'] = 10000
        valid_context_data['expectativas_salariales']['candidato_max'] = 5000
        warnings = validate_business_rules(valid_context_data)
        assert any('salarial' in w.lower() for w in warnings)

    def test_validate_context_file_valid(self, valid_context_data, tmp_path):
        """Test validación de archivo completo válido"""
        # Crear archivo temporal
        test_file = tmp_path / "test_context.yaml"
        with open(test_file, 'w') as f:
            yaml.dump(valid_context_data, f)

        is_valid, errors, warnings = validate_context_file(test_file)
        assert is_valid
        assert len(errors) == 0

    def test_validate_context_file_not_found(self):
        """Test validación de archivo inexistente"""
        is_valid, errors, warnings = validate_context_file(Path('/tmp/nonexistent.yaml'))
        assert not is_valid
        assert len(errors) > 0

    def test_validate_context_file_invalid_yaml(self, tmp_path):
        """Test validación de YAML inválido"""
        test_file = tmp_path / "invalid.yaml"
        with open(test_file, 'w') as f:
            f.write("invalid: yaml: content:\n  - broken")

        is_valid, errors, warnings = validate_context_file(test_file)
        assert not is_valid
