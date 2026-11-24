"""
build.py - Generador estático de catálogo para D-BEAUTY
Convierte los archivos Markdown de content/ a data/catalog.json y data/catalog.js
100% compatible con la librería estándar de Python (sin dependencias externas).
"""

import os
import re
import json
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CONTENT_DIR = BASE_DIR / "content"
DATA_DIR = BASE_DIR / "data"

def parse_frontmatter_value(val_str: str):
    val_str = val_str.strip()
    if not (val_str.startswith('"') and val_str.endswith('"')) and not (val_str.startswith("'") and val_str.endswith("'")):
        val_str = re.sub(r'\s+#.*$', '', val_str).strip()
    
    if (val_str.startswith('"') and val_str.endswith('"')) or (val_str.startswith("'") and val_str.endswith("'")):
        return val_str[1:-1]
    if val_str.lower() == 'true':
        return True
    if val_str.lower() == 'false':
        return False
    if val_str.lower() in ('null', 'none', '~', ''):
        return None
    try:
        if '.' in val_str:
            return float(val_str)
        return int(val_str)
    except ValueError:
        return val_str

def parse_markdown_file(file_path: Path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    meta = {}
    body = content

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1]
            body = parts[2].strip()
            for line in fm_text.splitlines():
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if ":" in line:
                    key, val = line.split(":", 1)
                    key = key.strip()
                    meta[key] = parse_frontmatter_value(val)

    sections = {}
    current_section = "general"
    sections[current_section] = []

    for line in body.splitlines():
        h_match = re.match(r'^###?\s+(.+)$', line.strip())
        if h_match:
            current_section = h_match.group(1).strip().lower()
            sections[current_section] = []
        else:
            sections[current_section].append(line)

    desc_text = "\n".join(sections.get("descripción del producto", sections.get("descripción", []))).strip()
    specs_lines = sections.get("especificaciones", [])
    specs = []
    for s_line in specs_lines:
        s_line = s_line.strip()
        bullet_match = re.match(r'^\*\s+\*\*(.+?):\*\*\s*(.+)$', s_line)
        if bullet_match:
            specs.append({
                "label": bullet_match.group(1).strip(),
                "val": bullet_match.group(2).strip()
            })
        elif s_line.startswith("* "):
            specs.append({
                "label": "",
                "val": s_line[2:].strip()
            })

    return {
        "meta": meta,
        "body_raw": body,
        "description": desc_text,
        "specs": specs
    }

def generate_catalog():
    config_file = CONTENT_DIR / "configuracion" / "general.md"
    config = {}
    if config_file.exists():
        parsed_config = parse_markdown_file(config_file)
        config = parsed_config["meta"]
        config["sobre_nosotros"] = parsed_config["body_raw"]

    productos = []
    productos_dir = CONTENT_DIR / "productos"
    
    if productos_dir.exists():
        for md_file in sorted(productos_dir.rglob("*.md")):
            try:
                parsed = parse_markdown_file(md_file)
                prod_data = parsed["meta"]
                prod_data["descripcion"] = parsed["description"]
                prod_data["especificaciones"] = parsed["specs"]
                prod_data["_archivo"] = str(md_file.relative_to(BASE_DIR)).replace("\\", "/")
                
                if "categoria" not in prod_data:
                    prod_data["categoria"] = md_file.parent.name
                if "estatus" not in prod_data:
                    prod_data["estatus"] = "disponible"
                if "destacado" not in prod_data:
                    prod_data["destacado"] = False
                    
                productos.append(prod_data)
            except Exception as e:
                print(f"Error procesando {md_file}: {e}", file=sys.stderr)

    categorias_nombres = {
        "lashing": "Lashing (Pestañas)",
        "brows": "Brows (Cejas)",
        "unas": "Uñas & Manicura",
        "cabello": "Cabello & Cuidado Capilar",
        "mobiliario": "Mobiliario & Aparatología",
        "skincare": "Skincare Facial & Spa"
    }
    
    categorias_encontradas = sorted(list(set(p.get("categoria", "") for p in productos if p.get("categoria"))))
    categorias = []
    for cat_slug in categorias_encontradas:
        categorias.append({
            "slug": cat_slug,
            "nombre": categorias_nombres.get(cat_slug, cat_slug.capitalize()),
            "total_productos": sum(1 for p in productos if p.get("categoria") == cat_slug)
        })

    marcas = sorted(list(set(p.get("marca") for p in productos if p.get("marca"))))

    catalog_data = {
        "version": "1.0.0",
        "configuracion": config,
        "categorias": categorias,
        "marcas": marcas,
        "total_productos": len(productos),
        "productos": productos
    }
    return catalog_data

def build():
    catalog_data = generate_catalog()
    
    # Intenta escribir archivos en disco
    try:
        DATA_DIR.mkdir(exist_ok=True)
        json_path = DATA_DIR / "catalog.json"
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(catalog_data, f, indent=2, ensure_ascii=False)
        print(f"Generado {json_path} ({len(catalog_data['productos'])} productos)")

        js_path = DATA_DIR / "catalog.js"
        with open(js_path, "w", encoding="utf-8") as f:
            f.write("// Autogenerado por build.py para D-BEAUTY\n")
            f.write("window.__CATALOG_DATA__ = ")
            json.dump(catalog_data, f, indent=2, ensure_ascii=False)
            f.write(";\n")
        print(f"Generado {js_path} (Soporte offline / local directo)")
    except PermissionError:
        print("Aviso: No se pudo escribir directamente en data/ por permisos del entorno.", file=sys.stderr)

    return catalog_data

if __name__ == "__main__":
    if "--json" in sys.argv:
        data = generate_catalog()
        print(json.dumps(data, ensure_ascii=False, indent=2))
        sys.exit(0)

    data = build()
    
    if "--serve" in sys.argv:
        import http.server
        import socketserver
        PORT = 8000
        Handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print(f"\nServidor local activo en {url}")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\nServidor detenido.")
