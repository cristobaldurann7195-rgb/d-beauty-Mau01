# D-BEAUTY — Catálogo Web & Distribuidora

> **Lashes, brows & more**  
> Distribuidora de insumos y mobiliario de belleza para dueñas de negocios, salones y cabinas.

![Logo D-BEAUTY](assets/logo.jpg)

---

## 📌 Documentación de Contexto y Especificación

Todo el contexto, reglas de negocio, estructura y roadmap están detallados en:

👉 **[CONTEXT.md](file:///C:/Users/crist/Documents/Mau01/CONTEXT.md)**

---

## 💻 Cómo Probar la Tienda / Catálogo en tu Computadora

Tienes dos formas sumamente sencillas de abrir y probar la aplicación:

### Opción 1: Directa (Doble clic)
Haz doble clic sobre el archivo **[index.html](file:///C:/Users/crist/Documents/Mau01/index.html)** en tu explorador de Windows.  
El catálogo cargará de forma inmediata gracias al soporte offline integrado (`data/catalog.js`).

### Opción 2: Servidor Local con Python
Abre una terminal en esta carpeta y ejecuta:
```bash
python build.py --serve
```
Luego entra a tu navegador en: **`http://localhost:8000`**

---

## 📝 Cómo Agregar o Modificar Productos (Markdown)

No necesitas tocar una sola línea de código web (HTML, CSS o JavaScript) para gestionar la tienda. Todo se administra desde la carpeta **`content/`**:

```text
content/
├── configuracion/
│   └── general.md          # WhatsApp, dirección, horario, banners de aviso
└── productos/
    ├── lashing/            # Pestañas, adhesivos, bonder, pinzas
    ├── brows/              # Laminado, tintes, mapping paste
    ├── unas/               # Acrílicos, monómeros, lámparas, drills
    ├── cabello/            # Botox capilar, keratinas, protectores
    ├── mobiliario/         # Camillas, lámparas Half Moon, carritos
    └── skincare/           # Espátulas ultrasónicas, sueros, mascarillas
```

### Plantilla de Producto (`.md`):
Crea un archivo nuevo dentro de la categoría que corresponda (por ejemplo: `content/productos/lashing/LASH-006-nuevo-producto.md`):

```markdown
---
id: "LASH-006"
nombre: "Nombre del Producto"
categoria: "lashing"
marca: "Marca Comercial"
precio_menudeo: 250
precio_mayoreo_sugerido: 195
piezas_minimo_mayoreo: 3
estatus: "disponible" # opciones: disponible | agotado
imagen_url: "https://url-de-tu-imagen.jpg"
destacado: true       # opciones: true | false
---

### Descripción del Producto
Breve descripción de las bondades y modo de uso del producto.

### Especificaciones
* **Contenido:** 10 ml
* **Color:** Rosa
```

### Para refrescar el catálogo:
Cada vez que agregues, modifiques o marques un producto como `agotado`, ejecuta:
```bash
python build.py
```
Esto recompilará automáticamente los metadatos y actualizará el catálogo en cuestión de milisegundos.

---

## 📲 Flujo de Cotización a WhatsApp

1. La clienta (dueña de negocio o consumidora) navega, filtra por categoría, marca o disponibilidad, y agrega artículos al cotizador.
2. Abre el cajón lateral del cotizador, elige si es **Cliente Menudeo** o **Dueña de Negocio (Mayoreo)**, e introduce su nombre y ciudad.
3. Presiona **"Enviar Pedido a WhatsApp"**.
4. Se abre automáticamente WhatsApp con un mensaje pre-formateado con la lista de productos, SKUs, totales y solicitud de confirmación de stock y cotización preferencial de mayoreo.
5. Si un producto está marcado como **Agotado**, no permite compra desatendida pero incluye un botón directo de consulta para pedirlo bajo demanda.
