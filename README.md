# FixLab.github.io

Sitio web estatico de **FixLab S.L.** para reparacion de moviles, reserva de servicios y catalogo de productos reacondicionados/accesorios.

## Demo y repositorio

- Web en produccion: [https://d1emat.github.io/FixLab.github.io/index.html](https://d1emat.github.io/FixLab.github.io/index.html)
- Repositorio: [https://github.com/d1emat/FixLab.github.io](https://github.com/d1emat/FixLab.github.io)

## Funcionalidades

- Landing corporativa con diseño responsive.
- Paginas de servicios, tiendas físicas (Valladolid + Burgos), contacto y secciones legales.
- Formularios de contacto/reserva con envio por EmailJS.
- Login y registro en cliente con `localStorage` (entorno demo).
- Tienda con filtros por tipo, marca, texto y precio maximo.
- Ficha de producto con cantidad dinamica y total calculado en tiempo real.

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- [EmailJS](https://www.emailjs.com/)

## Estructura principal

```text
FixLab.github.io/
|- index.html
|- servicios.html
|- tiendas.html
|- tienda-rio-shopping.html
|- tienda-centro.html
|- tienda-burgos.html
|- tienda.html
|- producto.html
|- reserva.html
|- reserva-producto.html
|- contacto.html
|- login.html
|- registro.html
|- seguimiento.html
|- valoracion.html
|- aviso-legal.html
|- politica-privacidad.html
|- politica-cookies.html
|- styles.css
|- script.js
```

## Uso local

Puedes abrir `index.html` directamente o usar un servidor local:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Configuracion de EmailJS

En `script.js` se usan estas constantes:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`

Para conectar tu cuenta:

1. Crea una cuenta en EmailJS.
2. Configura un servicio de envio.
3. Crea la plantilla de email.
4. Sustituye los IDs/keys en `script.js`.

## Despliegue en GitHub Pages

Este proyecto ya esta desplegado con GitHub Pages.  
Si necesitas replicarlo en otro repo:

1. Ve a `Settings` > `Pages`.
2. En `Build and deployment`, selecciona `Deploy from a branch`.
3. Elige `main` y `/ (root)`.
4. Guarda y espera la publicacion.

## Flujo con Cursor + GitHub (actualizacion rapida)

Para actualizar el sitio de forma casi automatica desde Cursor:

1. Edita tus archivos en Cursor.
2. Guarda cambios y haz commit.
3. Haz `git push` a `main`.
4. GitHub Pages redepliega automaticamente al detectar el push.

Comandos basicos:

```bash
git add .
git commit -m "Actualiza contenido del sitio"
git push origin main
```

Si quieres automatizar aun mas, puedes usar la terminal integrada de Cursor con alias o scripts para hacer commit+push en un solo comando.

## Problemas comunes de imagenes en GitHub Pages

Si una imagen no carga:

- Verifica que el archivo exista realmente en el repositorio.
- Revisa mayusculas/minusculas del nombre (`Foto_s24.png` no es igual a `foto_s24.png`).
- Evita rutas con carpetas que no existen (por ejemplo `Imagenes%20tienda/...` si esa carpeta no esta subida).
- Usa nombres de archivo simples (sin espacios ni caracteres especiales) para evitar errores de ruta.
- Tras subir imagenes nuevas, espera 1-2 minutos a que Pages regenere el sitio.

## Consideraciones

- La autenticacion actual es solo front-end y no debe usarse en produccion.
- Las credenciales de EmailJS en cliente deben tratarse con cautela.
- Para un entorno real se recomienda backend, validaciones server-side y cifrado.

## Autor

**Diego Mateo Paredes**
**Victor Alonso Fuente**
Proyecto: **FixLab S.L.**
