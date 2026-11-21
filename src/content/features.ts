/**
 * Funcionalidades de Vesta.
 *
 * Cada entrada se verificó contra el código de los repositorios
 * s-Nebula/vesta-tutor (Vesta Padre) y s-Nebula/vesta-tracker (Vesta Tracker)
 * el 21/11/2026, y contra la Guía de usuario v1.0. Antes de añadir una función nueva,
 * confirma que existe en la versión distribuida.
 *
 * status: "disponible" | "en-desarrollo". Las funciones "en-desarrollo" se muestran
 * separadas y nunca como terminadas.
 */

export type Screenshot = {
  src: string; // ruta base sin sufijo de tamaño, p. ej. "/img/padre/reportes"
  alt: string;
  kind: "phone" | "tablet";
  sizes: [number, number];
  caption: string;
};

export type Feature = {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  purpose: string;
  howTo: string[];
  managedIn: string;
  authorization: { purpose?: string; android?: string[] };
  limits?: string;
  screenshot?: Screenshot;
  status: "disponible" | "en-desarrollo";
};

const phone = (name: string, alt: string, caption: string): Screenshot => ({
  src: `/img/padre/${name}`,
  alt,
  kind: "phone",
  sizes: [420, 840],
  caption,
});

const tablet = (name: string, alt: string, caption: string): Screenshot => ({
  src: `/img/tracker/${name}`,
  alt,
  kind: "tablet",
  sizes: [800, 1600],
  caption,
});

/** Las seis finalidades que el tutor autoriza de forma independiente en Vesta Padre. */
export const purposes = [
  { id: "location", label: "Ubicación e historial" },
  { id: "device_status", label: "Estado del dispositivo" },
  { id: "usage_stats", label: "Estadísticas de uso de aplicaciones" },
  { id: "app_filtering", label: "Filtrado de aplicaciones" },
  { id: "domain_filtering", label: "Filtrado de dominios" },
  { id: "alerts", label: "Alertas y eventos" },
] as const;

export const features: Feature[] = [
  {
    id: "ubicacion",
    index: "01",
    title: "Ubicación",
    short: "Última posición recibida del dispositivo, sobre un mapa.",
    description:
      "Vesta Tracker obtiene las coordenadas del dispositivo mediante el GPS de Android y las envía a la plataforma. Vesta Padre muestra en un mapa la última ubicación recibida y la hora de la última señal.",
    purpose:
      "Saber dónde se encontraba el dispositivo en el último reporte y, si hace falta, abrir la ruta hasta ese punto en Google Maps con el botón «Cómo llegar».",
    howTo: [
      "En Vesta Padre, abre el perfil del menor.",
      "Entra en la pestaña «Mapa».",
      "Consulta la hora de la «Última señal» antes de interpretar la posición.",
    ],
    managedIn: "Se consulta en Vesta Padre. La recopila Vesta Tracker.",
    authorization: {
      purpose: "Ubicación e historial",
      android: ["Ubicación precisa", "Ubicación en segundo plano", "Servicio en primer plano"],
    },
    limits:
      "La frecuencia de actualización depende del GPS, la batería, la conexión y las restricciones del fabricante. La ubicación puede aparecer desactualizada si el dispositivo está apagado o sin señal.",
    screenshot: phone(
      "ubicacion",
      "Pantalla de rastreo en Vesta Padre con un marcador sobre el mapa y el botón Cómo llegar",
      "Vesta Padre · Mapa. El fondo del mapa se ha difuminado para proteger una ubicación real.",
    ),
    status: "disponible",
  },
  {
    id: "estado-del-dispositivo",
    index: "02",
    title: "Estado del dispositivo",
    short: "Batería, conectividad y datos del equipo vinculado.",
    description:
      "Vesta Padre muestra el nivel de batería, si el equipo está cargando, el tipo de conexión, el fabricante, el modelo, la versión de Android y la hora del último contacto con Vesta Tracker.",
    purpose:
      "Comprobar que el dispositivo sigue activo y comunicándose. Si Vesta Tracker no envía actualizaciones durante más de 12 minutos, el panel lo indica como «Sin comunicación».",
    howTo: ["Abre el perfil del menor en Vesta Padre.", "Entra en la pestaña «Equipo»."],
    managedIn: "Se consulta en Vesta Padre.",
    authorization: { purpose: "Estado del dispositivo" },
    screenshot: phone(
      "estado-dispositivo",
      "Pantalla Estado del dispositivo con batería al 84 % y datos de fabricante, modelo y versión de Android",
      "Vesta Padre · Equipo",
    ),
    status: "disponible",
  },
  {
    id: "estadisticas-de-uso",
    index: "03",
    title: "Estadísticas de uso",
    short: "Tiempo de pantalla, uso por aplicación y aperturas.",
    description:
      "Con el acceso a estadísticas de uso de Android, Vesta Tracker genera informes de actividad. Vesta Padre los presenta como resumen del último día o de los últimos 7 días: tiempo de pantalla, uso acumulado de aplicaciones, número de aperturas, ranking de aplicaciones y actividad diaria.",
    purpose:
      "Entender cómo se distribuye el tiempo frente a la pantalla y conversar sobre ello con datos. Los informes pueden exportarse en PDF y consultarse después en el historial de informes.",
    howTo: [
      "En Vesta Tracker, concede el acceso a estadísticas de uso desde los ajustes de Android.",
      "En Vesta Padre, abre la pestaña «Reportes».",
      "Elige «Últimos 7 días» o «Último día» y, si lo necesitas, pulsa «Exportar PDF».",
    ],
    managedIn: "Se consulta en Vesta Padre. El permiso se concede en Vesta Tracker.",
    authorization: {
      purpose: "Estadísticas de uso de aplicaciones",
      android: ["Acceso a datos de uso (se activa manualmente en Ajustes)"],
    },
    screenshot: phone(
      "reportes",
      "Pantalla de Reportes con tiempo de pantalla, uso de aplicaciones, aperturas y gráfico de actividad diaria",
      "Vesta Padre · Reportes",
    ),
    status: "disponible",
  },
  {
    id: "filtrado-de-aplicaciones",
    index: "04",
    title: "Filtrado de aplicaciones",
    short: "Bloqueo de aplicaciones instaladas en el dispositivo del menor.",
    description:
      "Vesta Tracker sincroniza el catálogo de aplicaciones instaladas. Desde Vesta Padre se eligen las que se quieren bloquear y cada regla puede activarse o desactivarse. Cuando se intenta abrir una aplicación bloqueada, Vesta Tracker la detecta mediante el servicio de accesibilidad.",
    purpose: "Limitar el acceso a aplicaciones concretas según la edad y los acuerdos familiares.",
    howTo: [
      "En Vesta Padre, entra en «Filtros».",
      "Selecciona la categoría «Aplicación Android» y pulsa «Elegir aplicaciones instaladas».",
      "Marca las aplicaciones y guarda la selección.",
      "Comprueba que el servicio de accesibilidad de Vesta Tracker esté activado.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker.",
    authorization: { purpose: "Filtrado de aplicaciones", android: ["Servicio de accesibilidad"] },
    limits:
      "La efectividad depende de la versión de Android, del fabricante y de que el servicio de accesibilidad permanezca activo.",
    screenshot: phone(
      "filtros",
      "Pantalla Control de contenido con lista negra y una regla de bloqueo de aplicación activa",
      "Vesta Padre · Filtros",
    ),
    status: "disponible",
  },
  {
    id: "filtrado-de-dominios",
    index: "05",
    title: "Filtrado de dominios",
    short: "Listas de dominios bloqueados y permitidos.",
    description:
      "Vesta Padre permite añadir dominios a una lista negra (bloqueados) o a una lista blanca (permitidos). Vesta Tracker aplica las reglas con una VPN local de Android que procesa las consultas DNS y, en el navegador compatible, con el servicio de accesibilidad.",
    purpose:
      "Restringir sitios web concretos y sus subdominios. Si una regla de bloqueo y una de permiso coinciden, prevalece la más específica; en caso de empate, la permitida.",
    howTo: [
      "En Vesta Padre, entra en «Filtros» y elige la categoría «Dominio web».",
      "Escribe el dominio (por ejemplo, sitio-web.com) en la lista negra o en la lista blanca.",
      "Guarda la regla y comprueba que Vesta Tracker esté conectado para recibirla.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker.",
    authorization: {
      purpose: "Filtrado de dominios",
      android: ["Conexión VPN local (solo para filtrado DNS)", "Servicio de accesibilidad"],
    },
    limits:
      "La VPN de Vesta no es una VPN comercial ni oculta la dirección IP. El DNS cifrado, los navegadores alternativos o las aplicaciones con resolución propia pueden evitar el filtrado.",
    status: "disponible",
  },
  {
    id: "alertas",
    index: "06",
    title: "Alertas y notificaciones",
    short: "Avisos de batería, velocidad e intentos de acceso bloqueados.",
    description:
      "Vesta Tracker registra eventos y Vesta Padre los recibe como alertas y notificaciones: batería baja (20 %), batería crítica (10 %), velocidad superior a unos 80 km/h, intentos de abrir aplicaciones bloqueadas e intentos de acceder a dominios bloqueados.",
    purpose:
      "Enterarse de situaciones que pueden requerir atención. Cada alerta muestra el tipo de evento, la fecha y la hora, y puede eliminarse de forma individual.",
    howTo: [
      "En Vesta Padre, abre la pestaña «Alertas».",
      "Mantén activadas las notificaciones de Vesta Padre en Android para recibir los avisos.",
    ],
    managedIn: "Se reciben en Vesta Padre. Se generan en Vesta Tracker.",
    authorization: { purpose: "Alertas y eventos", android: ["Notificaciones"] },
    limits:
      "Las alertas no son un servicio de emergencias y pueden llegar con retraso si el dispositivo no tiene conexión. Eliminar una alerta no borra el historial de ubicación ni los informes.",
    screenshot: phone(
      "alertas",
      "Pantalla de Alertas con dos avisos: batería crítica y batería baja",
      "Vesta Padre · Alertas",
    ),
    status: "disponible",
  },
  {
    id: "gestion-de-dispositivos",
    index: "07",
    title: "Gestión de dispositivos",
    short: "Perfiles, códigos de vinculación y desvinculación.",
    description:
      "El tutor crea un perfil para cada menor (nombre, edad y un color identificador). Vesta Padre genera un código de vinculación de un solo uso que se introduce en Vesta Tracker. El panel de control muestra los dispositivos registrados y su estado, y permite desvincular un dispositivo; al hacerlo se genera un código nuevo.",
    purpose: "Asociar de forma controlada cada dispositivo a su perfil y retirar la asociación cuando ya no sea necesaria.",
    howTo: [
      "En Vesta Padre, pulsa «Añadir dispositivo» y completa el perfil.",
      "Copia el código de 10 caracteres.",
      "En Vesta Tracker, escribe el código en «Vincular dispositivo».",
      "Para retirar la asociación, usa «Desvincular dispositivo» desde el panel.",
    ],
    managedIn: "Vesta Padre y Vesta Tracker.",
    authorization: {},
    limits: "Desvincular un dispositivo no elimina por sí solo los datos históricos.",
    screenshot: phone(
      "panel-dispositivos",
      "Panel de control de Vesta Padre con un dispositivo vinculado",
      "Vesta Padre · Panel de control",
    ),
    status: "disponible",
  },
  {
    id: "privacidad-y-autorizaciones",
    index: "08",
    title: "Privacidad y autorizaciones",
    short: "Seis finalidades independientes, revocables en cualquier momento.",
    description:
      "Antes de usar el panel, el tutor acepta los documentos legales, declara su representación legal e indica si el menor fue informado y si se escuchó su opinión. Después autoriza, una por una, las finalidades que quiere activar. Vesta Tracker consulta periódicamente esas autorizaciones y no recopila datos de una finalidad que no esté autorizada.",
    purpose:
      "Que cada tipo de información se trate solo con una autorización expresa, y que pueda retirarse sin afectar al resto.",
    howTo: [
      "En Vesta Padre, abre «Privacidad y autorizaciones» desde el panel.",
      "Revisa el estado del consentimiento y las versiones de los documentos aceptados.",
      "Revoca una finalidad concreta o todas a la vez.",
    ],
    managedIn: "Se gestiona en Vesta Padre. Se respeta en Vesta Tracker.",
    authorization: {},
    screenshot: tablet(
      "esperando-autorizacion",
      "Vesta Tracker indicando que la ubicación no está autorizada y que la telemetría permanecerá oculta hasta que todos los tutores autoricen ese propósito",
      "Vesta Tracker · Sin autorización, no se muestra ni se recopila la ubicación.",
    ),
    status: "disponible",
  },
];

/** Funciones que la propia aplicación indica como todavía no disponibles. */
export const upcoming = [
  {
    title: "Edición de perfiles",
    note: "Vesta Padre muestra el aviso «La edición de perfiles todavía no está disponible». Por ahora, los datos de un perfil se definen al crearlo.",
  },
];

/** Métodos de acceso a Vesta Padre verificados en el código. */
export const signInMethods = ["Correo electrónico y contraseña", "Cuenta de Google", "Cuenta de GitHub"];
