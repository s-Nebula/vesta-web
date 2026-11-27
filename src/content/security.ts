/**
 * Servicios de auditoría de Vesta Security (operado por FORBIDDEN S.A.S.).
 *
 * Precios en pesos colombianos ANTES de IVA. FORBIDDEN S.A.S. es responsable
 * de IVA (19 %): la web muestra el precio + IVA y el total. Para cambiar un
 * precio, cámbialo solo aquí.
 */
import { company } from "@/content/site";

export const IVA = 0.19;

export const contact = {
  whatsapp: "573246167956",
  city: "Santa Marta, Magdalena",
  coverage: "Presencial en Santa Marta · Remoto en toda Colombia",
  github: "https://github.com/s-Nebula",
  tiktok: "https://www.tiktok.com/@nebulagnu",
  tiktokHandle: "@nebulagnu",
  email: company.email,
  phone: company.phone,
} as const;

/** Menú de las páginas de seguridad. */
export const securityNav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios/", label: "Servicios y precios" },
  { href: "/aplicaciones/", label: "Aplicaciones" },
  { href: "/blog/", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
] as const;

/** Enlace de WhatsApp con un mensaje inicial ya escrito. */
export function waLink(message = "Hola, quiero agendar el diagnóstico gratuito de seguridad para mi negocio.") {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

const cop = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
export const formatCop = (n: number) => cop.format(n).replace(/\s/g, " ");
export const withIva = (n: number) => Math.round(n * (1 + IVA));

export type SegmentId = "comercios" | "tiendas" | "oficinas" | "startups";

export type Service = {
  id: string;
  name: string;
  segment: SegmentId | "todos";
  /** Precio antes de IVA; 0 = gratis. */
  price: number;
  per?: "mes";
  summary: string;
  duration: string;
  modality: string;
  scope: string;
  includes: string[];
  needs?: string;
  note?: string;
  featured?: boolean;
};

export const segments: { id: SegmentId; name: string; who: string; risk: string; pick: string }[] = [
  {
    id: "comercios",
    name: "Comercios con WiFi y datáfono",
    who: "Restaurantes, tiendas, hoteles y hostales, droguerías.",
    risk: "La WiFi de los clientes suele ser la misma red de la caja, el datáfono y las cámaras. Un cliente con malas intenciones queda a un paso de todo.",
    pick: "red",
  },
  {
    id: "tiendas",
    name: "Tiendas en línea",
    who: "WooCommerce, Shopify o una tienda hecha a la medida.",
    risk: "Cupones que se aplican dos veces, precios que se cambian desde el navegador o pedidos de otros clientes a la vista. Fallos que cuestan dinero.",
    pick: "tienda",
  },
  {
    id: "oficinas",
    name: "Consultorios y oficinas",
    who: "Médicos, odontólogos, contadores, abogados, inmobiliarias.",
    risk: "Manejan historias clínicas, cédulas y datos financieros. Un correo falso o un portátil sin cifrar basta para una filtración y una sanción.",
    pick: "oficina",
  },
  {
    id: "startups",
    name: "Startups con app",
    who: "Emprendimientos con app web o móvil, API o Firebase.",
    risk: "Antes de lanzar o de mostrarle el producto a un inversionista, conviene saber si un usuario puede ver los datos de otro.",
    pick: "pentest-web",
  },
];

export const services: Service[] = [
  {
    id: "diagnostico",
    name: "Diagnóstico gratuito",
    segment: "todos",
    price: 0,
    summary: "Una conversación de 30 minutos y una revisión externa de tu dominio, tu web y tu correo. Te digo los tres riesgos más importantes que veo y qué harías primero.",
    duration: "30 minutos + 1 día hábil",
    modality: "Videollamada, o visita en Santa Marta",
    scope: "Lo que se ve de tu negocio desde internet, sin pruebas intrusivas.",
    includes: [
      "Revisión de tu web y tu dominio desde afuera",
      "Revisión de la configuración de tu correo",
      "Los tres riesgos principales, por escrito",
      "Recomendación honesta: a veces no necesitas contratar nada",
    ],
  },
  {
    id: "express",
    name: "Chequeo Digital Express",
    segment: "todos",
    price: 390_000,
    featured: true,
    summary: "La revisión más rápida para cualquier negocio con página web o correo propio: lo que un atacante ve de ti desde internet, con una lista de arreglos en orden de prioridad.",
    duration: "3 días hábiles",
    modality: "Remoto",
    scope: "Un dominio, su web y su correo.",
    includes: [
      "Certificado HTTPS y cabeceras de seguridad de la web",
      "SPF, DKIM y DMARC: que nadie pueda enviar correos falsos a tu nombre",
      "WordPress, plugins y servidores con fallas conocidas",
      "Paneles de administración y servicios expuestos a internet",
      "Correos del negocio que aparecen en filtraciones públicas",
      "Informe corto con prioridades y 30 minutos para explicártelo",
    ],
    note: "Sin pruebas intrusivas: no se intenta entrar a tus sistemas.",
  },
  {
    id: "red",
    name: "Red Segura para Comercios",
    segment: "comercios",
    price: 790_000,
    featured: true,
    summary: "Reviso en sitio la red de tu local: WiFi, router, datáfonos, cámaras y equipos de caja. Lo que se pueda corregir ese mismo día, lo dejamos corregido.",
    duration: "2 a 3 días hábiles",
    modality: "Presencial en Santa Marta",
    scope: "Una sede, hasta 20 dispositivos conectados.",
    includes: [
      "WiFi de clientes separada de la caja, el datáfono y las cámaras",
      "Router y equipos sin contraseñas de fábrica",
      "Cámaras y grabadores (DVR) que no queden abiertos a internet",
      "Equipos de caja actualizados y con usuarios separados",
      "Copia de seguridad de la facturación y de la información del negocio",
      "Correcciones en sitio, con tu autorización, e informe de lo que se hizo",
    ],
    note: "Fuera de Santa Marta se suman los gastos de viaje, acordados antes.",
  },
  {
    id: "oficina",
    name: "Oficina Protegida",
    segment: "oficinas",
    price: 1_290_000,
    featured: true,
    summary: "Para negocios que guardan datos sensibles de sus clientes: equipos, cuentas de correo, copias de seguridad y una prueba de phishing a tu equipo, con una charla para que nadie vuelva a caer.",
    duration: "5 días hábiles",
    modality: "Presencial en Santa Marta o remoto",
    scope: "Hasta 10 equipos y 10 cuentas de correo.",
    includes: [
      "Equipos: actualizaciones, antivirus, disco cifrado, quién es administrador",
      "Google Workspace o Microsoft 365: verificación en dos pasos, reenvíos ocultos y archivos compartidos de más",
      "Copias de seguridad, con una prueba real de restauración",
      "Red de la oficina e impresoras",
      "Simulación de phishing a tu equipo y charla de 1 hora con los resultados",
      "Lista de medidas técnicas para proteger los datos personales (Ley 1581 de 2012)",
    ],
    note: "Cubre la parte técnica de la protección de datos; no reemplaza la asesoría jurídica.",
  },
  {
    id: "tienda",
    name: "Tienda en Línea Segura",
    segment: "tiendas",
    price: 1_690_000,
    featured: true,
    summary: "Una prueba de penetración a tu tienda, con usuario de cliente y de administrador: intento comprar más barato, ver pedidos ajenos o tomar el control del panel, como lo haría un atacante.",
    duration: "5 a 7 días hábiles",
    modality: "Remoto",
    scope: "Una tienda (WooCommerce, Shopify o propia), con 2 roles.",
    includes: [
      "Precios, cupones, inventario y pagos que se puedan manipular",
      "Cuentas de clientes: ver pedidos o datos de otros, robo de cuenta",
      "Panel de administración, plugins y apps instaladas",
      "Inyecciones, XSS y el resto del OWASP Top 10",
      "Informe con evidencia y cómo corregir cada hallazgo",
      "Nueva prueba incluida cuando corrijas",
    ],
    needs: "La URL de la tienda, un usuario de cliente y uno de administrador de prueba.",
    note: "En Shopify se prueba tu configuración, tu tema y tus apps, no la plataforma de Shopify.",
  },
  {
    id: "firebase",
    name: "Auditoría de Firebase y nube",
    segment: "startups",
    price: 1_490_000,
    summary: "Reviso las reglas de seguridad y la configuración de tu proyecto de Firebase: el error más común en apps nuevas es que cualquiera pueda leer o escribir la base de datos.",
    duration: "2 a 5 días hábiles",
    modality: "Remoto",
    scope: "Un proyecto de Firebase y las apps que lo usan.",
    includes: [
      "Reglas de Firestore, Realtime Database y Storage, probadas con usuarios reales",
      "Claves de API sin restringir y servicios habilitados de más",
      "Métodos de inicio de sesión y cuentas anónimas",
      "Cloud Functions expuestas o sin control de acceso",
      "Reglas corregidas propuestas, listas para copiar",
    ],
    needs: "Acceso de lectura a la consola del proyecto.",
  },
  {
    id: "pentest-web",
    name: "Pentest de app web o API",
    segment: "startups",
    price: 2_900_000,
    summary: "Prueba de penetración completa a tu aplicación web o a tu API, con metodología OWASP y foco en lo que los escáneres no ven: la lógica de tu negocio y el acceso a datos de otros usuarios.",
    duration: "5 a 8 días hábiles",
    modality: "Remoto",
    scope: "Una aplicación o API, 2 roles, hasta 40 pantallas o endpoints.",
    includes: [
      "Autenticación, sesiones y recuperación de contraseña",
      "Acceso a datos de otros usuarios (IDOR/BOLA) y escalada de privilegios",
      "Lógica de negocio: saldos, aprobaciones, límites",
      "Inyecciones, XSS, SSRF y carga de archivos",
      "Resumen para la gerencia o los inversionistas e informe técnico con CVSS",
      "Nueva prueba incluida",
    ],
    needs: "URL, documentación de la API si existe y dos usuarios de prueba por rol.",
  },
  {
    id: "android",
    name: "Pentest de app Android",
    segment: "startups",
    price: 2_900_000,
    summary: "Analizo tu app Android y la API que usa: datos guardados sin cifrar, claves dentro del APK, tráfico interceptable y componentes que otras apps pueden abusar.",
    duration: "5 a 8 días hábiles",
    modality: "Remoto",
    scope: "Una app Android y su API, hasta 30 endpoints.",
    includes: [
      "Almacenamiento local, claves y secretos dentro de la app",
      "Comunicaciones y validación de certificados",
      "Componentes exportados y permisos de más",
      "La API que usa la app",
      "Metodología OWASP MASTG y MASVS",
      "Nueva prueba incluida",
    ],
    needs: "El APK de la versión a probar y usuarios de prueba.",
  },
  {
    id: "codigo",
    name: "Revisión de código seguro",
    segment: "startups",
    price: 3_400_000,
    summary: "Leo el código fuente de tu aplicación buscando vulnerabilidades que se puedan explotar de verdad, con la metodología de la certificación OSWE. Cada hallazgo viene con su ruta de ataque y su corrección.",
    duration: "5 a 10 días hábiles",
    modality: "Remoto",
    scope: "Un repositorio, hasta 20.000 líneas de código.",
    includes: [
      "Revisión manual orientada a explotación, no solo alertas de herramientas",
      "Autenticación, autorización, manejo de datos y dependencias",
      "Verificación contra OWASP ASVS",
      "Sesión con tu equipo de desarrollo para explicar los hallazgos",
    ],
    needs: "Acceso de solo lectura al repositorio.",
  },
];

export const plan = {
  name: "Plan Vigía",
  price: 190_000,
  summary: "Seguimiento mensual para que lo que arreglamos siga arreglado, y alguien de confianza a quien preguntarle.",
  includes: [
    "Revisión externa mensual de tu web, tu correo y tus servicios expuestos, con un reporte corto",
    "Aviso si los correos del negocio aparecen en una filtración nueva",
    "Dudas de seguridad por WhatsApp en horario hábil, con respuesta en máximo 1 día hábil",
    "1 hora de asesoría al mes, por ejemplo antes de contratar un proveedor o lanzar algo nuevo",
    "15 % de descuento en los demás servicios",
  ],
  terms: "Disponible después de cualquier servicio pagado. Sin permanencia: se cancela avisando con 30 días.",
};

export const extras: { name: string; price: number; detail: string }[] = [
  { name: "Charla de seguridad para empleados", price: 450_000, detail: "2 horas, presencial en Santa Marta o virtual: phishing, contraseñas, estafas por WhatsApp." },
  { name: "Nueva prueba adicional", price: 250_000, detail: "Una verificación más, aparte de la incluida." },
  { name: "Carta de atestación", price: 150_000, detail: "Resumen firmado del alcance, las fechas y el estado de los hallazgos, para clientes, bancos o socios." },
];

/** Servicios para cuando el negocio crezca: se cotizan. */
export const enterprise: { name: string; detail: string }[] = [
  { name: "Red interna y Active Directory", detail: "Pentest de la red de una empresa con dominio Windows, desde la posición de un empleado o un intruso." },
  { name: "Ejercicios de red team", detail: "Simulación realista de un adversario contra personas, procesos y tecnología." },
  { name: "Programa anual de seguridad", detail: "Pruebas periódicas, acompañamiento al equipo de desarrollo y seguimiento a la corrección." },
];

export const payment = [
  "Servicios de menos de $1.000.000: pago completo al agendar.",
  "Desde $1.000.000: 50 % al firmar la propuesta y 50 % al entregar el informe.",
  "Pago por transferencia bancaria, con factura electrónica de FORBIDDEN S.A.S.",
  "La nueva prueba incluida se hace dentro de los 60 días siguientes a la entrega.",
];

export const steps: { title: string; text: string }[] = [
  { title: "Diagnóstico gratuito", text: "Hablamos 30 minutos sobre tu negocio y reviso lo que se ve desde internet." },
  { title: "Propuesta con precio cerrado", text: "En 2 días hábiles recibes el alcance, las fechas y el precio. Sin letra pequeña." },
  { title: "Autorización por escrito", text: "Firmamos un acuerdo de confidencialidad y una carta de autorización. Sin ella no toco nada." },
  { title: "Pruebas", text: "Trabajo en la ventana acordada. Si encuentro algo crítico, te aviso ese mismo día." },
  { title: "Informe y reunión", text: "Un resumen en palabras simples para ti y el detalle técnico para quien te hace el soporte." },
  { title: "Nueva prueba", text: "Cuando corrijas, vuelvo a probar para confirmar que el riesgo desapareció." },
];

export const legal: [string, string][] = [
  ["Autorización escrita", "Nunca pruebo un sistema sin la autorización firmada de quien puede darla. En Colombia, el acceso abusivo a un sistema informático es delito (Ley 1273 de 2009): la autorización es lo que separa una auditoría de un ataque."],
  ["Confidencialidad", "Firmamos un acuerdo de confidencialidad antes de que me compartas cualquier información."],
  ["Sin daños", "No hago pruebas de denegación de servicio ni modifico o borro datos reales, salvo acuerdo expreso."],
  ["Tus datos", "La evidencia se guarda cifrada, solo se usa para el informe y se destruye al cierre, según la Ley 1581 de 2012."],
  ["El informe es tuyo", "No publico ni menciono tus hallazgos, ni que eres mi cliente, sin tu permiso."],
];

export const certifications: { name: string; full: string; issuer: string; focus: string }[] = [
  { name: "OSWE", full: "Offensive Security Web Expert", issuer: "OffSec", focus: "Explotación web avanzada y revisión de código fuente" },
  { name: "PNPT", full: "Practical Network Penetration Tester", issuer: "TCM Security", focus: "Pentest de red externa, interna y Active Directory, con informe" },
  { name: "eJPT", full: "Junior Penetration Tester", issuer: "INE Security", focus: "Fundamentos de las pruebas de penetración" },
];

export type QA = { q: string; a: string[] };

export const faq: QA[] = [
  {
    q: "Mi negocio es pequeño, ¿de verdad alguien me atacaría?",
    a: [
      "Sí, y casi nunca es algo personal. La mayoría de ataques son automáticos: programas que recorren internet buscando routers con la contraseña de fábrica, WordPress desactualizados o correos fáciles de suplantar. Un negocio pequeño suele tener menos defensas y por eso es un blanco fácil.",
      "Los casos más comunes en pymes son la suplantación de correo para cambiar los datos de pago de una factura, el secuestro de información (ransomware) y el robo de cuentas.",
    ],
  },
  {
    q: "¿Qué es una prueba de penetración (pentest)?",
    a: [
      "Es un ataque controlado y autorizado: intento entrar a tus sistemas como lo haría un delincuente, pero con permiso por escrito, sin causar daño y documentando cada paso. Al final sabes qué se puede explotar, qué tan grave es y cómo corregirlo.",
    ],
  },
  {
    q: "¿Van a dañar algo o a detener mi negocio?",
    a: [
      "No. Las pruebas se hacen en el horario que acordemos, no hago pruebas de denegación de servicio y no modifico datos reales. Si una prueba tiene algún riesgo, te lo consulto antes.",
    ],
  },
  {
    q: "No sé de tecnología, ¿voy a entender el informe?",
    a: [
      "Sí. Cada informe empieza con un resumen en palabras simples: qué encontré, qué tan grave es para tu negocio y qué hacer primero. La parte técnica es para quien te presta el soporte o te hizo la página.",
    ],
  },
  {
    q: "¿Ustedes también corrigen los problemas?",
    a: [
      "En Red Segura para Comercios y Oficina Protegida corrijo en sitio lo que se puede, con tu autorización. En los pentests te entrego la corrección exacta para tu proveedor o tu equipo y luego verifico que haya quedado bien con la nueva prueba incluida.",
    ],
  },
  {
    q: "¿Por qué los precios son más bajos que los de una empresa grande?",
    a: [
      "Porque Vesta Security está empezando y se enfoca en pequeños negocios: alcances pequeños y bien definidos, sin intermediarios. La calidad de las pruebas es la misma: certificaciones internacionales y metodología OWASP y PTES.",
    ],
  },
  {
    q: "¿Atienden fuera de Santa Marta?",
    a: [
      "Sí. Todo lo que es remoto (Chequeo Express, tiendas en línea, Firebase, pentests de apps y revisión de código) se hace para cualquier ciudad de Colombia. Los servicios presenciales fuera de Santa Marta suman los gastos de viaje, acordados antes.",
    ],
  },
];
