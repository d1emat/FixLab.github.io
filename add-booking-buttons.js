// Script to add booking buttons to service pages
const fs = require('fs');
const path = require('path');

const services = [
  { file: 'servicio-pantalla.html', service: 'Pantalla', label: 'Reservar reparación de pantalla' },
  { file: 'servicio-bateria.html', service: 'Batería', label: 'Reservar cambio de batería' },
  { file: 'servicio-camara.html', service: 'Cámara', label: 'Reservar reparación de cámara' },
  { file: 'servicio-conector.html', service: 'Conector', label: 'Reservar reparación de conector' },
  { file: 'servicio-agua.html', service: 'Agua', label: 'Reservar tratamiento contra agua' }
];

const buttonHTML = (service) => `
            <div class="booking-action" style="margin-top: 1.5rem;">
              <a href="reserva.html?service=${encodeURIComponent(service)}" class="btn btn-primary" style="font-size: 1.1rem; padding: 1rem 2rem;">📅 Reservar: ${service}</a>
              <p style="margin-top: 0.75rem; font-size: 0.9rem; color: #94a3b8;">Sin compromiso · Sin iniciar sesión</p>
            </div>`;

services.forEach(({ file, service, label }) => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log('NOT FOUND:', file);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add button after the last </p> inside <article class="card">
  const articleEnd = content.lastIndexOf('</article>');
  if (articleEnd === -1) {
    console.log('No article found in', file);
    return;
  }
  
  // Find the last </p> before </article>
  const lastP = content.lastIndexOf('</p>', articleEnd);
  if (lastP === -1) {
    console.log('No </p> found in', file);
    return;
  }
  
  const insertPos = lastP + 4; // after </p>
  const before = content.substring(0, insertPos);
  const after = content.substring(insertPos);
  
  const newContent = before + buttonHTML(service) + after;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Updated:', file);
});

console.log('Done!');
