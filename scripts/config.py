#!/usr/bin/env python3
"""
Configuración centralizada para Easy Job Apply AI
Versión: 2.1
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Rutas del proyecto
PROJECT_ROOT = Path(__file__).parent.parent
OUTPUTS_DIR = PROJECT_ROOT / os.getenv('OUTPUTS_DIR', 'outputs')
SESSIONS_DIR = PROJECT_ROOT / os.getenv('SESSIONS_DIR', 'sessions')
TEMPLATES_DIR = PROJECT_ROOT / os.getenv('TEMPLATES_DIR', 'templates')
RESUMES_DIR = PROJECT_ROOT / os.getenv('RESUMES_DIR', 'resumes_txt')
SCRIPTS_DIR = PROJECT_ROOT / 'scripts'

# Crear directorios si no existen
OUTPUTS_DIR.mkdir(exist_ok=True)
SESSIONS_DIR.mkdir(exist_ok=True)
TEMPLATES_DIR.mkdir(exist_ok=True)
RESUMES_DIR.mkdir(exist_ok=True)

# Configuración de CVs
DEFAULT_CV_LANGUAGE = os.getenv('DEFAULT_CV_LANGUAGE', 'auto')
MAX_CV_PAGES = int(os.getenv('MAX_CV_PAGES', '2'))
DEFAULT_FONT = os.getenv('DEFAULT_FONT', 'Arial')
DEFAULT_FONT_SIZE = int(os.getenv('DEFAULT_FONT_SIZE', '9'))

# Configuración de análisis
SALARY_ANALYSIS_DETAILED = os.getenv('SALARY_ANALYSIS_DETAILED', 'true').lower() == 'true'
DEFAULT_CURRENCY = os.getenv('DEFAULT_CURRENCY', 'USD')
DEFAULT_LOCATION = os.getenv('DEFAULT_LOCATION', 'Remoto LATAM')

# Logging
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
LOG_FILE = PROJECT_ROOT / os.getenv('LOG_FILE', 'logs/easy-job-apply.log')

# Crear directorio de logs
LOG_FILE.parent.mkdir(exist_ok=True)

# Configuración de márgenes y formato DOCX
CV_MARGINS_CM = 1.22
CV_FONT_SIZES = {
    'nombre': 18,
    'contacto': 9,
    'header': 12,
    'subheader': 9.5,
    'body': 9,
    'summary': 9.5
}

# Información del candidato (puede sobrescribirse)
CANDIDATE_INFO = {
    'nombre': os.getenv('CANDIDATE_NAME', 'JULIO ALBERTO GONZALES HEREDIA'),
    'ubicacion': os.getenv('CANDIDATE_LOCATION', 'Lima, Perú'),
    'telefono': os.getenv('CANDIDATE_PHONE', '+51 992755873'),
    'email': os.getenv('CANDIDATE_EMAIL', 'jgonzales.sbs@gmail.com'),
    'linkedin': os.getenv('CANDIDATE_LINKEDIN', 'linkedin.com/in/julioagh')
}

def get_output_path(filename: str) -> Path:
    """Genera ruta completa para archivo de output"""
    return OUTPUTS_DIR / filename

def get_session_path(filename: str) -> Path:
    """Genera ruta completa para archivo de sesión"""
    return SESSIONS_DIR / filename

def get_template_path(filename: str) -> Path:
    """Genera ruta completa para archivo de template"""
    return TEMPLATES_DIR / filename

def get_resume_path(filename: str) -> Path:
    """Genera ruta completa para archivo de CV"""
    return RESUMES_DIR / filename
