const sharp = require('sharp');
const path = require('path');

const SOURCE = path.join(__dirname, '..', 'assets', 'CUENTA-CLARA.svg');
const ASSETS = path.join(__dirname, '..', 'assets');

const BG = { r: 0, g: 0, b: 0, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const PADDING = 0.2;

const targets = [
  { name: 'icon.png', size: 1024, bg: BG },
  { name: 'adaptive-icon.png', size: 1024, bg: TRANSPARENT },
  { name: 'splash-icon.png', size: 1284, bg: TRANSPARENT },
  { name: 'favicon.png', size: 192, bg: BG },
];

(async () => {
  for (const { name, size, bg } of targets) {
    const logoSize = Math.round(size * (1 - PADDING * 2));
    const logo = await sharp(SOURCE, { density: 384 })
      .resize(logoSize, logoSize, {
        fit: 'contain',
        background: TRANSPARENT,
      })
      .png()
      .toBuffer();

    await sharp({
      create: { width: size, height: size, channels: 4, background: bg },
    })
      .composite([{ input: logo, gravity: 'center' }])
      .png()
      .toFile(path.join(ASSETS, name));

    console.log(`generated ${name} (${size}x${size}, logo ${logoSize}px)`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

// bien revisa esta app y vas a ver que es un temple de front end en react native donde tenemos varios tipo de fuente tambien tenemos varios tipo de colores ect

// bien entonces lo que necesitamos es hacer algo como  vamos a ir armando distinto tipo de convinacion para generar varias app parescan diferente por los colores por los tema de letra ect la idea es

// ya tenemos varios tipo
// varios tipo de letra -
// varios colores
// varios tema
// teniendo eso encuenta ya sabes que la diferencia de una app y otra app son los colores / letras  y la visual pero la visual es facil cambiar lo que necesito es generar varios grupo diferente de colores / letras para app

// ejemplo
// app - Ecommer
//                  tema -> ocen
