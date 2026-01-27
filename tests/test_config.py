"""
Tests para módulo de configuración
"""

import pytest
from pathlib import Path
import sys

# Agregar scripts al path
sys.path.insert(0, str(Path(__file__).parent.parent / 'scripts'))

from config import (
    get_output_path,
    get_session_path,
    get_template_path,
    get_resume_path,
    CV_MARGINS_CM,
    CV_FONT_SIZES,
    DEFAULT_FONT
)


class TestConfig:
    """Tests para funciones de configuración"""

    def test_get_output_path(self):
        """Test generación de ruta de output"""
        path = get_output_path('test.docx')
        assert path.name == 'test.docx'
        assert 'outputs' in str(path)

    def test_get_session_path(self):
        """Test generación de ruta de sesión"""
        path = get_session_path('context_test.yaml')
        assert path.name == 'context_test.yaml'
        assert 'sessions' in str(path)

    def test_get_template_path(self):
        """Test generación de ruta de template"""
        path = get_template_path('template.docx')
        assert path.name == 'template.docx'
        assert 'templates' in str(path)

    def test_get_resume_path(self):
        """Test generación de ruta de CV"""
        path = get_resume_path('cv.txt')
        assert path.name == 'cv.txt'
        assert 'resumes_base' in str(path)

    def test_cv_margins(self):
        """Test valor de márgenes"""
        assert CV_MARGINS_CM == 1.22

    def test_cv_font_sizes(self):
        """Test diccionario de tamaños de fuente"""
        assert 'nombre' in CV_FONT_SIZES
        assert 'header' in CV_FONT_SIZES
        assert 'body' in CV_FONT_SIZES
        assert CV_FONT_SIZES['nombre'] == 18
        assert CV_FONT_SIZES['header'] == 12
        assert CV_FONT_SIZES['body'] == 9

    def test_default_font(self):
        """Test fuente por defecto"""
        assert DEFAULT_FONT == 'Arial'
