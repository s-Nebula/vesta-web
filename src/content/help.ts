/**
 * Preguntas frecuentes y artículos del Centro de ayuda.
 * Basados en la Guía de usuario v1.0, la Política de Privacidad v1.0 y el código de las apps.
 */

export type QA = { q: string; a: string[]; links?: { href: string; label: string }[] };

export const faq: QA[] = [
  {
    q: "¿Qué es Vesta Security?",
    a: [
      "Es una plataforma de protección digital familiar formada por dos aplicaciones Android. El adulto responsable usa Vesta Padre y el menor tiene instalada Vesta Tracker en su dispositivo.",
      "Vesta ayuda a supervisar de forma responsable, pero no sustituye el acompañamiento familiar, la educación digital ni los servicios de emergencia.",
    ],
  },
  {
    q: "¿Cuál es la diferencia entre Vesta Padre y Vesta Tracker?",
    a: [
      "Vesta Padre es la aplicación de gestión: perfiles, dispositivos, filtros, alertas, informes y autorizaciones de privacidad.",
      "Vesta Tracker se instala en el dispositivo del menor. Envía la información autorizada y aplica las reglas de protección que configura el tutor.",
    ],
    links: [{ href: "/plataforma/", label: "Ver cómo se relacionan" }],
  },
  {
    q: "¿Cómo se vinculan los dispositivos?",
    a: [
      "En Vesta Padre se crea el perfil del menor y se genera un código de vinculación de 10 caracteres. Ese código se introduce en Vesta Tracker, en la pantalla «Vincular dispositivo».",
      "El código es de un solo uso. No lo compartas con personas no autorizadas. Si desvinculas el dispositivo, Vesta Padre genera un código nuevo.",
    ],
    links: [{ href: "/documentacion/guia-de-usuario/#4-vinculacion-de-los-dispositivos", label: "Guía: vinculación" }],
  },
  {
    q: "¿Qué información puede consultar el tutor?",
    a: [
      "Según las finalidades autorizadas: la última ubicación recibida, el estado del dispositivo (batería, conexión, modelo y versión de Android), las estadísticas de uso de aplicaciones, las reglas de filtrado y las alertas.",
      "Vesta no tiene como finalidad leer mensajes, contraseñas, fotografías ni el contenido general de otras aplicaciones.",
    ],
  },
  {
    q: "¿Cómo se autorizan las finalidades?",
    a: [
      "En Vesta Padre, en «Privacidad y autorizaciones». Cada finalidad (ubicación, estado del dispositivo, estadísticas de uso, filtrado de aplicaciones, filtrado de dominios y alertas) es independiente y opcional.",
      "La autorización legal es distinta de los permisos de Android: conceder un permiso del sistema no sustituye la autorización para el tratamiento de datos.",
    ],
  },
  {
    q: "¿Cómo puedo revocar una autorización?",
    a: [
      "Desde «Privacidad y autorizaciones» en Vesta Padre puedes revocar una finalidad concreta o todas a la vez. La función asociada dejará de estar disponible.",
      "También puedes solicitar la revocación o la supresión de datos escribiendo al canal de privacidad indicado en la Política.",
    ],
    links: [{ href: "/documentacion/politica-de-privacidad/#16-revocacion-de-autorizacion", label: "Política: revocación" }],
  },
  {
    q: "¿Qué necesito para instalar las aplicaciones?",
    a: [
      "Dos dispositivos Android 7.0 o superior, conexión a Internet y una cuenta para Vesta Padre. Algunas funciones requieren permisos de ubicación, estadísticas de uso, accesibilidad o VPN local en el dispositivo del menor.",
      "Vesta solo está disponible para Android.",
    ],
    links: [{ href: "/descargas/", label: "Ir a descargas" }],
  },
  {
    q: "¿Qué hago si tengo problemas de conexión?",
    a: [
      "Comprueba que ambos dispositivos tengan Internet y que Vesta Tracker siga abierto en segundo plano. Si Vesta Padre muestra «Sin comunicación», el Tracker lleva más de 12 minutos sin enviar datos.",
      "Revisa también las restricciones de batería del fabricante, que pueden detener la aplicación.",
    ],
    links: [{ href: "/ayuda/#problemas-de-conexion", label: "Ayuda: conexión" }],
  },
  {
    q: "¿Dónde puedo consultar la guía de usuario?",
    a: ["La Guía de usuario oficial está publicada completa en la sección de documentación, con índice y capturas de las aplicaciones."],
    links: [{ href: "/documentacion/guia-de-usuario/", label: "Abrir la guía" }],
  },
];

export type HelpTopic = { id: string; title: string; intro: string; steps: string[]; note?: string };

export const helpTopics: HelpTopic[] = [
  {
    id: "instalacion",
    title: "Instalación",
    intro: "Vesta se distribuye como archivos APK para Android. Android pide autorización para instalar aplicaciones fuera de Google Play.",
    steps: [
      "Descarga el APK desde la página oficial de descargas de este sitio.",
      "Abre el archivo. Si Android lo solicita, permite «Instalar apps desconocidas» solo para el navegador o el gestor de archivos que estés usando.",
      "Instala Vesta Padre en el teléfono del adulto y Vesta Tracker en el dispositivo del menor.",
      "Cuando termines, puedes volver a desactivar el permiso de instalación de apps desconocidas.",
    ],
    note: "Descarga Vesta únicamente desde los canales oficiales. Puedes comparar la huella SHA-256 publicada en la página de descargas.",
  },
  {
    id: "inicio-de-sesion",
    title: "Problemas de inicio de sesión",
    intro: "Vesta Padre admite correo electrónico y contraseña, Google y GitHub.",
    steps: [
      "Comprueba que el correo esté bien escrito y que el dispositivo tenga conexión.",
      "Si no recuerdas la contraseña, usa «¿Olvidaste tu contraseña?» en la pantalla de inicio.",
      "Si creaste la cuenta con Google o GitHub, inicia sesión con el mismo método.",
    ],
    note: "El soporte de Vesta nunca te pedirá tu contraseña ni códigos secretos.",
  },
  {
    id: "problemas-de-vinculacion",
    title: "Problemas de vinculación",
    intro: "El código de vinculación tiene 10 caracteres y es de un solo uso.",
    steps: [
      "Copia el código desde Vesta Padre y escríbelo completo en Vesta Tracker.",
      "Acepta los permisos que solicita Vesta Tracker: se piden antes de consumir el código.",
      "Mantén abierta la pantalla de Vesta Padre: detecta la vinculación automáticamente.",
      "Si el código ya se usó, desvincula el dispositivo desde el panel para generar uno nuevo.",
    ],
  },
  {
    id: "problemas-de-conexion",
    title: "Problemas de conexión",
    intro: "Vesta Padre indica «Sin comunicación» cuando Vesta Tracker no envía datos durante más de 12 minutos.",
    steps: [
      "Verifica que el dispositivo del menor esté encendido, con batería y con Internet.",
      "Comprueba que los dispositivos sigan vinculados.",
      "Revisa en Android la configuración de batería y ejecución en segundo plano de Vesta Tracker.",
    ],
    note: "Algunos fabricantes aplican restricciones de batería agresivas que detienen los servicios en segundo plano.",
  },
  {
    id: "permisos",
    title: "Problemas con permisos",
    intro: "Cada función necesita un permiso de Android concreto, además de la autorización de la finalidad en Vesta Padre.",
    steps: [
      "Estadísticas de uso: Ajustes de Android → Acceso a datos de uso → Vesta Tracker.",
      "Bloqueo de aplicaciones y dominios en el navegador: Ajustes → Accesibilidad → Vesta Tracker → activar.",
      "Filtrado DNS: acepta la solicitud de conexión VPN de Vesta Tracker.",
      "Notificaciones: permite las notificaciones de Vesta Padre para recibir alertas.",
    ],
  },
  {
    id: "ubicacion",
    title: "Problemas de ubicación",
    intro: "La ubicación puede aparecer desactualizada por varias causas ajenas a la aplicación.",
    steps: [
      "Comprueba que el GPS esté activado en el dispositivo del menor.",
      "Revisa que Vesta Tracker tenga ubicación precisa y «Permitir todo el tiempo».",
      "Confirma que la finalidad «Ubicación e historial» esté autorizada en Vesta Padre.",
      "Comprueba la batería y la conexión a Internet.",
    ],
  },
  {
    id: "privacidad",
    title: "Gestión de privacidad",
    intro: "Puedes consultar, actualizar, rectificar o suprimir datos y revocar autorizaciones.",
    steps: [
      "Revisa y revoca finalidades en Vesta Padre → «Privacidad y autorizaciones».",
      "Para consultas o reclamos formales, escribe al canal de privacidad indicando tu solicitud.",
      "Las consultas se atienden en un máximo de 10 días hábiles y los reclamos en 15 días hábiles, según la Política.",
    ],
  },
];
