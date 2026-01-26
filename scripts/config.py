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
    'body': 9.5,
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

# Configuración de nombres de archivo CV
# Formato: "FirstLast" (e.g., JulioGonzales) o "Last" (e.g., Gonzales)
CV_FILENAME_FORMAT = os.getenv('CV_FILENAME_FORMAT', 'FirstLast')

def extract_first_and_last_name(full_name: str) -> tuple[str, str]:
    """
    Extrae el primer nombre y primer apellido de un nombre completo.
    
    Args:
        full_name: Nombre completo (ej: "Julio Alberto Gonzales Heredia")
    
    Returns:
        Tupla (primer_nombre, primer_apellido)
        Ejemplo: ("Julio", "Gonzales")
    """
    parts = full_name.strip().split()
    if len(parts) == 0:
        return ("", "")
    elif len(parts) == 1:
        return (parts[0], "")
    elif len(parts) == 2:
        return (parts[0], parts[1])
    else:
        # Asumimos formato: Nombre(s) Apellido(s)
        # Tomamos el primer elemento como nombre y el penúltimo como apellido
        # (en caso de nombres compuestos como "Julio Alberto Gonzales Heredia")
        first_name = parts[0]
        last_name = parts[-2] if len(parts) >= 3 else parts[-1]
        return (first_name, last_name)

def format_cv_filename(full_name: str, company_slug: str, position_slug: str, 
                       format_type: str = None) -> str:
    """
    Genera el nombre del archivo CV según el formato configurado.
    
    Args:
        full_name: Nombre completo del candidato
        company_slug: Slug de la empresa (sin espacios)
        position_slug: Slug de la posición (sin espacios)
        format_type: Tipo de formato ("FirstLast" o "Last"). Si es None, usa CV_FILENAME_FORMAT
    
    Returns:
        Nombre del archivo sin extensión (ej: "CV_JulioGonzales_Entel_AgileCoach")
    """
    if format_type is None:
        format_type = CV_FILENAME_FORMAT
    
    first_name, last_name = extract_first_and_last_name(full_name)
    
    if format_type == "FirstLast":
        name_part = f"{first_name}{last_name}"
    else:  # "Last"
        name_part = last_name
    
    return f"CV_{name_part}_{company_slug}_{position_slug}"

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

