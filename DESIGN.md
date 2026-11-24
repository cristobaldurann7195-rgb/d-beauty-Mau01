---
name: D-BEAUTY Design System
description: Sistema visual de alta gama para distribuidora de belleza profesional
colors:
  primary: "#B25567"
  primary-dark: "#7A2E3D"
  primary-soft: "#FFF0F2"
  accent-gold: "#C5A059"
  accent-gold-light: "#F4E8D1"
  neutral-bg: "#FAF5F5"
  surface: "#FFFFFF"
  surface-soft: "#FFF9F9"
  text-main: "#221B1C"
  text-muted: "#786C6F"
  border: "#EFE4E6"
  whatsapp: "#25D366"
  whatsapp-dark: "#1EBE5D"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  md: "14px"
  lg: "20px"
  full: "9999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    padding: "12px 20px"
---

# Design System: D-BEAUTY

<!-- impeccable:design-schema 1 -->

## Overview

D-BEAUTY proyecta exclusividad, calidez y sofisticación para dueñas de negocios y salones de belleza. Combina una base luminosa en tonos rosa pálido (*blush pink*), tipografía serif refinada inspirada en la cosmética de lujo europea y acentos dorados discretos, contrastados con tipografía sans-serif neutra de alta legibilidad para datos técnicos, códigos SKU y precios.

## Colors

- **Primario (`#B25567` / `#7A2E3D`):** Rosa berry intenso para llamadas a la acción primarias, enlaces destacados y acentos de navegación.
- **Neutro de Fondo (`#FAF5F5` / `#FFF9F9`):** Lienzo cálido y suave que evita el blanco digital puro y reduce la fatiga visual.
- **Superficies (`#FFFFFF`):** Tarjetas de producto, diálogos modales y paneles de control.
- **Acentos Dorados (`#C5A059` / `#F4E8D1`):** Medallas de productos destacados (*Destacado*), bordes sutiles y detalles de marca.
- **Texto Principal (`#221B1C`):** Carbón profundo que asegura un ratio de contraste superior a 10:1 respecto al fondo.
- **Acción WhatsApp (`#25D366` / `#1EBE5D`):** Verde vibrante específico para el canal de cierre de venta y cotizaciones.

## Typography

- **Títulos y Marca:** *Cormorant Garamond*, peso 700 para encabezados principales. Aporta autoridad visual y carácter artesanal de alta costura.
- **Cuerpo y UI:** *Montserrat*, pesos 400 (regular), 500 (medium), 600 (semibold) y 700 (bold). Garantiza legibilidad en pantallas móviles pequeñas.
- **Cifras y Precios:** `font-variant-numeric: tabular-nums` para alineación perfecta de importes monetarios.

## Layout

- Contenedor máximo: 1240px con 20px de margen seguro lateral.
- Cuadrícula de catálogo responsiva con `minmax(270px, 1fr)` adaptable automáticamente de 1 a 4 columnas sin saltos bruscos.
- Barra superior adhesiva (*sticky header*) con desenfoque de fondo (*backdrop-filter: blur(8px)*) para mantener la navegación siempre disponible.
- Cajón lateral (*Drawer*) deslizante a pantalla completa en móviles y acotado a 440px en computadoras.

## Elevation & Depth

- **Sombra Suave (`--shadow-sm`):** `0 2px 6px rgba(71, 62, 64, 0.04)` para botones e inputs.
- **Sombra de Elevación (`--shadow-md`):** `0 6px 18px rgba(71, 62, 64, 0.08)` en tarjetas de catálogo al reposar.
- **Sombra de Hover (`--shadow-lg`):** `0 14px 34px rgba(71, 62, 64, 0.12)` al interactuar con productos.
- **Sombra de Cajón (`--shadow-drawer`):** `-6px 0 28px rgba(34, 27, 28, 0.15)` para dar tridimensionalidad al cotizador.

## Shapes

- Radios generosos y fluidos: 8px para etiquetas y pequeños controles, 14px para modales/botones secundarios, 20px para tarjetas de producto y forma de píldora (9999px) para botones principales de compra y filtros de categorías.

## Components

- **Tarjetas de Producto:** Imagen con proporción áurea, etiqueta superior de estado de stock o destacado, tipografía de marca en miniatura, precio menudeo con indicador de mayoreo y botones directos.
- **Cotizador WhatsApp:** Lista detallada de insumos, selector conmutable de tipo de cliente (Menudeo vs Mayoreo), cálculo en tiempo real y botón de despacho con enlace formateado.
- **Modal de Ficha Técnica:** Vista expandida con tabla de especificaciones de producto y selector de cantidades numéricas.

## Do's and Don'ts

### Do's
- Mantener siempre un contraste tipográfico nítido y probado contra accesibilidad WCAG AA.
- Usar iconos SVG unificados y coherentes en trazo en lugar de emojis arbitrarios.
- Respetar la presencia visible de los productos agotados con opción clara de consulta bajo demanda.
- Dar más espacio superior a los títulos que el espacio inferior para agrupar visualmente la información.

### Don'ts
- No usar gradientes de texto cliché ni sombras duras sin desenfoque.
- No colocar etiquetas "eyebrow" superfluas encima de los títulos de cabecera.
- No sobrecargar el lienzo con decoraciones que distraigan de los productos y sus fotografías.
