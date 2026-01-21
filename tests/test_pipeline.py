"""
Tests para pipeline
"""

import pytest
from pathlib import Path
import sys
import tempfile

# Agregar scripts al path
sys.path.insert(0, str(Path(__file__).parent.parent / 'scripts'))

from pipeline import Pipeline


class TestPipeline:
    """Tests para Pipeline"""

    @pytest.fixture
    def pipeline(self):
        """Fixture con instancia de Pipeline"""
        return Pipeline(verbose=False)

    def test_generate_session_id(self, pipeline):
        """Test generación de session ID"""
        session_id = pipeline.generate_session_id("Test Company", "Senior Developer")
        assert "TestCompany" in session_id
        assert "SeniorDeveloper" in session_id
        assert len(session_id) > 20  # Incluye fecha

    def test_generate_session_id_special_chars(self, pipeline):
        """Test generación de session ID con caracteres especiales"""
        session_id = pipeline.generate_session_id("Test-Company", "Senior Developer")
        assert "-" not in session_id  # Debe eliminar guiones

    def test_log_verbose_false(self, pipeline, capsys):
        """Test logging con verbose=False"""
        pipeline.log("Test message", "INFO")
        captured = capsys.readouterr()
        assert captured.out == ""  # No debe imprimir INFO con verbose=False

    def test_log_verbose_true(self, capsys):
        """Test logging con verbose=True"""
        pipeline = Pipeline(verbose=True)
        pipeline.log("Test message", "INFO")
        captured = capsys.readouterr()
        assert "Test message" in captured.out

    def test_log_error_always_shown(self, pipeline, capsys):
        """Test que ERROR siempre se muestra"""
        pipeline.log("Error message", "ERROR")
        captured = capsys.readouterr()
        assert "Error message" in captured.out

    def test_fase1_analysis_missing_files(self, pipeline, tmp_path):
        """Test Fase 1 con archivos faltantes"""
        jd_file = tmp_path / "nonexistent_jd.txt"
        cv_file = tmp_path / "nonexistent_cv.txt"

        success, message = pipeline.fase1_analysis(
            jd_file, cv_file, "USD 5000-6000"
        )

        assert not success
        assert "Error" in message

    def test_fase1_analysis_valid_files(self, pipeline, tmp_path):
        """Test Fase 1 con archivos válidos"""
        # Crear archivos temporales
        jd_file = tmp_path / "test_jd.txt"
        cv_file = tmp_path / "test_cv.txt"

        jd_file.write_text("Test Job Description")
        cv_file.write_text("Test CV Content")

        success, message = pipeline.fase1_analysis(
            jd_file, cv_file, "USD 5000-6000",
            company="TestCo",
            position="Developer"
        )

        assert success
        assert pipeline.session_id is not None
        assert "TestCo" in pipeline.session_id

    def test_check_decision_invalid_file(self, pipeline):
        """Test check_decision con archivo inválido"""
        should_proceed, recomendacion, justificacion = pipeline.check_decision(
            Path("/tmp/nonexistent.yaml")
        )

        assert not should_proceed
        assert recomendacion == "INVALID"

    def test_check_decision_proceder(self, pipeline, tmp_path):
        """Test check_decision con recomendación PROCEDER"""
        import yaml

        # Crear context file mínimo válido
        context_data = {
            'session_id': 'test_session',
            'timestamp': '2026-01-21T10:00:00',
            'version': '2.0',
            'jd': {
                'company': 'Test', 'position': 'Dev', 'seniority_level': 'Senior',
                'industry': 'Tech', 'location': 'Remote',
                'keywords_criticos': [{'keyword': 'Test', 'categoria': 'Skill', 'frecuencia_objetivo': 5}] * 10,
                'requisitos_indispensables': ['Req1'],
                'idioma_jd': 'español'
            },
            'cv_original': {
                'candidate_name': 'Test', 'years_experience': 5, 'current_role': 'Dev'
            },
            'fase1_resultado': {
                'match_score': 85, 'clasificacion': 'Alto', 'recomendacion': 'PROCEDER',
                'justificacion_recomendacion': 'Good match',
                'gaps_criticos': [], 'fortalezas_clave': [],
                'keywords_a_incluir': {}, 'experiencia_a_priorizar': []
            },
            'expectativas_salariales': {
                'candidato_min': 5000, 'candidato_max': 6000, 'mercado_p50': 5500,
                'posicionamiento': 'Dentro', 'viabilidad': 'Alta', 'currency': 'USD'
            }
        }

        context_file = tmp_path / "test_context.yaml"
        with open(context_file, 'w') as f:
            yaml.dump(context_data, f)

        should_proceed, recomendacion, justificacion = pipeline.check_decision(context_file)

        assert should_proceed
        assert recomendacion == 'PROCEDER'

    def test_check_decision_no_aplicar(self, pipeline, tmp_path):
        """Test check_decision con recomendación NO_APLICAR"""
        import yaml

        context_data = {
            'session_id': 'test_session',
            'timestamp': '2026-01-21T10:00:00',
            'version': '2.0',
            'jd': {
                'company': 'Test', 'position': 'Dev', 'seniority_level': 'Senior',
                'industry': 'Tech', 'location': 'Remote',
                'keywords_criticos': [{'keyword': 'Test', 'categoria': 'Skill', 'frecuencia_objetivo': 5}] * 10,
                'requisitos_indispensables': ['Req1'],
                'idioma_jd': 'español'
            },
            'cv_original': {
                'candidate_name': 'Test', 'years_experience': 5, 'current_role': 'Dev'
            },
            'fase1_resultado': {
                'match_score': 30, 'clasificacion': 'Bajo', 'recomendacion': 'NO_APLICAR',
                'justificacion_recomendacion': 'Poor match',
                'gaps_criticos': [], 'fortalezas_clave': [],
                'keywords_a_incluir': {}, 'experiencia_a_priorizar': []
            },
            'expectativas_salariales': {
                'candidato_min': 5000, 'candidato_max': 6000, 'mercado_p50': 5500,
                'posicionamiento': 'Fuera', 'viabilidad': 'Baja', 'currency': 'USD'
            }
        }

        context_file = tmp_path / "test_context.yaml"
        with open(context_file, 'w') as f:
            yaml.dump(context_data, f)

        should_proceed, recomendacion, justificacion = pipeline.check_decision(context_file)

        assert not should_proceed
        assert recomendacion == 'NO_APLICAR'
