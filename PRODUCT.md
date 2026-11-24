# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

static HTML5 / CSS3 / Vanilla JavaScript + Python build compiler (Markdown-first)

## Users

- **B2B Principal:** Dueñas de salones de belleza, estéticas, estudios de pestañas (*lashes*), micropigmentadoras (*brows*), técnicas en uñas y cosmetólogas independientes. Necesitan un proveedor confiable, precios competitivos por volumen, stock garantizado y entregas el mismo día para urgencias de cabina.
- **B2C Secundario:** Consumidoras finales que buscan insumos de belleza de grado profesional a precio de menudeo.

## Product Purpose

Ser la distribuidora y comercializadora de confianza para profesionales de la belleza en México, proveyendo consumibles, herramientas y mobiliario ergonómico centralizados en una sola orden de compra, con entregas locales ágiles y cotizaciones personalizadas.

## Positioning

"Todo en un solo lugar con entregas el mismo día y atención directa por WhatsApp". A diferencia de marketplaces impersonales o distribuidores lentos, D-BEAUTY combina catálogo web abierto con trato humano directo para negociar mayoreo y coordinar envíos de urgencia.

## Operating Context

- Uso predominante en smartphones por profesionales activas entre citas de servicio o al cierre de turno.
- Consultas ágiles de stock y precios de menudeo.
- Cierre de ventas, cálculo de flete y acuerdos de pago mediante transferencia bancaria o contra-entrega acordados directamente en WhatsApp.

## Capabilities and Constraints

- **Administración Markdown-First:** El catálogo, inventarios, precios y textos se gestionan 100% mediante archivos Markdown (`.md`) sin bases de datos SQL/NoSQL ni paneles administrativos complejos.
- **Regla de Agotados:** Los productos sin stock permanecen visibles con etiqueta de "Agotado", deshabilitando la compra directa al menudeo pero permitiendo la solicitud bajo demanda por WhatsApp.
- **Cotizador / Carrito WhatsApp:** Carrito interactivo que calcula subtotales y genera mensajes formateados con SKUs, cantidades y tipo de cliente (Menudeo vs Mayoreo).
- **Sin pasarelas bancarias embebidas:** No requiere Stripe, PayPal ni registro de usuarios.

## Brand Commitments

- **Nombre Comercial:** D-BEAUTY
- **Lema:** *Lashes, brows & more*
- **Logotipo Oficial:** [assets/logo.jpg](file:///C:/Users/crist/Documents/Mau01/assets/logo.jpg)
- **Acentos de Identidad:** Estilo sofisticado y femenino, tonos rosa empolvado (*blush pink*), blanco puro, acentos negros elegantes y detalles dorados.

## Evidence on Hand

- Logotipo de alta resolución en `assets/logo.jpg`.
- Catálogo inicial de 20 productos reales distribuidos en 6 categorías: `lashing`, `brows`, `unas`, `cabello`, `mobiliario`, `skincare`.
- Configuración de contacto y políticas de envío en `content/configuracion/general.md`.

## Product Principles

1. **Velocidad y Fiabilidad:** Prioridad absoluta en la rapidez de entrega para resolver imprevistos en cabina.
2. **Cero Fricción:** Experiencia de compra fluida desde celular, sin registros ni pasos innecesarios.
3. **Trato Humano y Mayoreo Preferencial:** Relación cercana con dueñas de negocio para acuerdos de volumen y atención técnica.

## Accessibility & Inclusion

- Contraste tipográfico óptimo (mínimo 4.5:1 en textos principales).
- Botones de acción y áreas táctiles de al menos 44x44px para facilitar la navegación en dispositivos móviles.
- Textos alternativos descriptivos en todas las imágenes de catálogo.
