/**
 * Vesta features (version 1.1).
 *
 * Every entry was checked against the code of Vesta Parent and Vesta Tracker
 * on 22/11/2026 and against the User Guide v1.1. Before adding a feature,
 * confirm it exists in the released version.
 */
import type { Locale } from "@/i18n";

export type Screenshot = {
  src: string; // base path without size suffix, e.g. "/img/padre/reportes"
  alt: string;
  kind: "phone" | "tablet";
  sizes: [number, number];
  caption: string;
};

export type Feature = {
  id: string;
  title: string;
  short: string;
  description: string;
  purpose: string;
  howTo: string[];
  managedIn: string;
  authorization: { purpose?: string; android?: string[] };
  limits?: string;
  screenshot?: Screenshot;
  isNew?: boolean;
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

/** The six purposes the guardian authorises independently in Vesta Parent. */
const purposeLabels = {
  es: {
    location: "Ubicación e historial",
    device_status: "Estado del dispositivo",
    usage_stats: "Estadísticas de uso de aplicaciones",
    app_filtering: "Control de aplicaciones",
    domain_filtering: "Filtrado de sitios web",
    alerts: "Alertas y eventos",
  },
  en: {
    location: "Location and history",
    device_status: "Device status",
    usage_stats: "App usage statistics",
    app_filtering: "App control",
    domain_filtering: "Website filtering",
    alerts: "Alerts and events",
  },
} as const;

export type PurposeId = keyof (typeof purposeLabels)["es"];

export function purposesFor(locale: Locale) {
  return (Object.keys(purposeLabels[locale]) as PurposeId[]).map((id) => ({ id, label: purposeLabels[locale][id] }));
}

const P = (locale: Locale, id: PurposeId) => purposeLabels[locale][id];

const es: Feature[] = [
  {
    id: "ubicacion",
    title: "Ubicación",
    short: "Última posición del teléfono sobre un mapa, con la hora real de la medición.",
    description:
      "Vesta Tracker obtiene las coordenadas del teléfono con el GPS de Android y las envía a la plataforma. Vesta Padre muestra en el mapa la última posición, la hora en que se tomó y un aviso si la señal tiene más de 15 minutos.",
    purpose:
      "Saber dónde estaba el teléfono en el último reporte y, si hace falta, abrir la ruta hasta ese punto en Google Maps con el botón «Cómo llegar».",
    howTo: [
      "En Vesta Padre, abre el perfil del menor.",
      "Entra en la pestaña «Mapa».",
      "Fíjate en la hora de la «Última señal» antes de interpretar la posición.",
    ],
    managedIn: "Se consulta en Vesta Padre. La recopila Vesta Tracker.",
    authorization: {
      purpose: P("es", "location"),
      android: ["Ubicación precisa", "Ubicación en segundo plano", "Servicio en primer plano"],
    },
    limits:
      "La frecuencia depende del GPS, la batería, la conexión y las restricciones del fabricante. Sin conexión, las posiciones se guardan en el teléfono y se envían al reconectar.",
    screenshot: phone(
      "ubicacion",
      "Pantalla de rastreo en Vesta Padre con un marcador sobre el mapa y el botón Cómo llegar",
      "Vesta Padre · Mapa. El fondo del mapa se ha difuminado para proteger una ubicación real.",
    ),
  },
  {
    id: "zonas-seguras",
    isNew: true,
    title: "Zonas seguras",
    short: "Aviso cuando el menor llega o sale de casa, del colegio o de otro lugar.",
    description:
      "El tutor marca en el mapa un punto y un radio (de 50 a 2.000 metros) y elige si quiere aviso al llegar, al salir o en ambos casos. Vesta Tracker compara su posición con las zonas en el propio teléfono, así que el aviso se genera aunque la conexión vaya y venga.",
    purpose: "Saber que el menor llegó al colegio o salió de casa sin tener que mirar el mapa.",
    howTo: [
      "En la pantalla del perfil, toca «Zonas» y después «Nueva zona».",
      "Toca el mapa para fijar el centro y ajusta el radio.",
      "Escribe un nombre, elige los avisos y guarda.",
    ],
    managedIn: "Se configuran en Vesta Padre. Las detecta Vesta Tracker.",
    authorization: { purpose: P("es", "location") },
    limits:
      "Depende de la precisión del GPS: el aviso puede llegar tarde o producirse un poco fuera del borde exacto. Para evitar avisos falsos, una salida solo cuenta cuando el teléfono se aleja más allá de un margen.",
  },
  {
    id: "sos",
    isNew: true,
    title: "Botón SOS",
    short: "Un aviso de emergencia desde el teléfono del menor, con su ubicación.",
    description:
      "En Vesta Tracker, el menor mantiene pulsado el botón «Emergencia». Sus tutores reciben al instante una alerta crítica con la ubicación del momento, aunque hayan elegido recibir solo avisos importantes.",
    purpose: "Que el menor pueda pedir ayuda a su familia con un solo gesto.",
    howTo: [
      "En Vesta Tracker, mantén pulsado el botón «Emergencia».",
      "En Vesta Padre, toca la notificación y después «Ver dónde está ahora».",
    ],
    managedIn: "Se usa en Vesta Tracker. Se recibe en Vesta Padre.",
    authorization: { purpose: P("es", "alerts"), android: ["La ubicación se adjunta solo si su finalidad está autorizada"] },
    limits:
      "El botón SOS avisa a la familia, no a los servicios de emergencia. En una emergencia hay que llamar al 123. Sin conexión, el aviso se envía al recuperarla.",
  },
  {
    id: "estado-del-dispositivo",
    title: "Estado del dispositivo",
    short: "Batería, conexión, datos del equipo y aviso si deja de comunicarse.",
    description:
      "Vesta Padre muestra el nivel de batería, si el teléfono está cargando, el tipo de conexión, el fabricante, el modelo y la versión de Android. Si Vesta Tracker pasa más de 20 minutos sin enviar datos, el servidor envía una alerta al tutor, incluso con Vesta Padre cerrada.",
    purpose: "Comprobar que el teléfono sigue encendido, conectado y protegido.",
    howTo: ["Abre el perfil del menor en Vesta Padre.", "Entra en la pestaña «Equipo»."],
    managedIn: "Se consulta en Vesta Padre.",
    authorization: { purpose: P("es", "device_status") },
    screenshot: phone(
      "estado-dispositivo",
      "Pantalla Estado del dispositivo con batería y datos de fabricante, modelo y versión de Android",
      "Vesta Padre · Equipo",
    ),
  },
  {
    id: "estadisticas-de-uso",
    title: "Estadísticas de uso",
    short: "Tiempo de pantalla, uso por aplicación, aperturas y resumen semanal.",
    description:
      "Con el acceso a datos de uso de Android, Vesta Tracker genera informes de actividad. Vesta Padre los presenta por día o por semana: tiempo de pantalla, uso por aplicación, aperturas y actividad diaria. Cada domingo por la tarde llega además un resumen semanal.",
    purpose: "Ver cómo se reparte el tiempo frente a la pantalla y hablarlo en familia con datos. Los informes se pueden exportar en PDF.",
    howTo: [
      "En Vesta Tracker, concede el acceso a datos de uso desde los ajustes de Android.",
      "En Vesta Padre, abre la pestaña «Reportes».",
      "Elige «Últimos 7 días» o «Último día» y, si lo necesitas, toca «Exportar PDF».",
    ],
    managedIn: "Se consulta en Vesta Padre. El permiso se concede en Vesta Tracker.",
    authorization: {
      purpose: P("es", "usage_stats"),
      android: ["Acceso a datos de uso (se activa a mano en Ajustes)"],
    },
    screenshot: phone(
      "reportes",
      "Pantalla de Reportes con tiempo de pantalla, uso de aplicaciones, aperturas y gráfico de actividad diaria",
      "Vesta Padre · Reportes",
    ),
  },
  {
    id: "modo-estudio",
    isNew: true,
    title: "Modo estudio",
    short: "Solo las apps que elijas, durante un rato o en un horario fijo.",
    description:
      "Mientras está activo, en el teléfono del menor solo se abren las aplicaciones permitidas, además del teléfono, los mensajes, los ajustes y el teclado. Se puede activar durante 30 minutos, 1 hora, 2 horas o sin límite, o programar horarios semanales, también nocturnos (por ejemplo, de 21:00 a 07:00).",
    purpose: "Ayudar a concentrarse en los deberes o a desconectar por la noche.",
    howTo: [
      "En la pantalla del perfil, toca «Modo estudio».",
      "Actívalo durante un tiempo o añade un horario.",
      "Marca las aplicaciones permitidas durante el estudio.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker, también sin conexión.",
    authorization: { purpose: P("es", "app_filtering"), android: ["Servicio de accesibilidad"] },
    limits: "Funciona mientras el servicio de accesibilidad de Vesta Tracker siga activado. Si se desactiva, el tutor recibe una alerta.",
  },
  {
    id: "limites-de-tiempo",
    isNew: true,
    title: "Límites de tiempo",
    short: "Un máximo diario para cada aplicación.",
    description:
      "El tutor asigna a cada aplicación un tiempo máximo al día, de 15 minutos a 4 horas. Vesta Tracker mide el uso en el propio teléfono y, al agotarse el tiempo, bloquea la aplicación hasta el día siguiente. Vesta Padre muestra cuánto se ha usado hoy cada una.",
    purpose: "Poner límites concretos a juegos o redes sociales sin bloquearlos del todo.",
    howTo: [
      "En la pantalla del perfil, toca «Límites».",
      "Elige la aplicación.",
      "Selecciona el tiempo máximo al día.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker.",
    authorization: {
      purpose: P("es", "app_filtering"),
      android: ["Servicio de accesibilidad", "Acceso a datos de uso"],
    },
  },
  {
    id: "peticiones",
    isNew: true,
    title: "Peticiones",
    short: "El menor pide más tiempo o desbloquear una app, y el tutor responde con un toque.",
    description:
      "Cuando Vesta bloquea una aplicación, Vesta Tracker muestra un aviso para pedir permiso. El menor elige el tiempo y puede escribir un mensaje. El tutor recibe una notificación y aprueba, eligiendo los minutos, o rechaza. Mientras dura el permiso, la aplicación funciona aunque esté bloqueada, en modo estudio o sin tiempo diario.",
    purpose: "Que los límites se puedan negociar sin quitarle el teléfono al menor ni saltarse las reglas.",
    howTo: [
      "El menor toca el aviso de bloqueo o abre «Pedir permiso» en Vesta Tracker.",
      "En Vesta Padre, toca la notificación o abre «Peticiones» en la pantalla del perfil.",
      "Toca «Aprobar» y elige los minutos, o toca «Rechazar».",
    ],
    managedIn: "Se piden en Vesta Tracker. Se responden en Vesta Padre.",
    authorization: { purpose: P("es", "app_filtering") },
  },
  {
    id: "filtrado-de-aplicaciones",
    title: "Bloqueo de aplicaciones",
    short: "Bloqueo de aplicaciones instaladas en el teléfono del menor.",
    description:
      "Vesta Tracker sincroniza la lista de aplicaciones instaladas. Desde Vesta Padre se eligen las que se quieren bloquear y cada regla se puede activar o desactivar. Si se intenta abrir una aplicación bloqueada, Vesta Tracker vuelve a la pantalla de inicio y ofrece pedir permiso.",
    purpose: "Limitar el acceso a aplicaciones concretas según la edad y los acuerdos familiares.",
    howTo: [
      "En Vesta Padre, entra en «Filtros».",
      "Selecciona la categoría «Aplicación Android» y toca «Elegir aplicaciones instaladas».",
      "Marca las aplicaciones y guarda la selección.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker.",
    authorization: { purpose: P("es", "app_filtering"), android: ["Servicio de accesibilidad"] },
    limits:
      "Depende de la versión de Android, del fabricante y de que el servicio de accesibilidad siga activo. Si se desactiva, el tutor recibe una alerta.",
    screenshot: phone(
      "filtros",
      "Pantalla Control de contenido con lista negra y una regla de bloqueo de aplicación activa",
      "Vesta Padre · Filtros",
    ),
  },
  {
    id: "filtrado-de-dominios",
    title: "Filtro web y búsqueda segura",
    short: "Sitios bloqueados, búsqueda segura y filtros recomendados por edad.",
    description:
      "Vesta Padre permite bloquear o permitir sitios web concretos. Con la búsqueda segura, Google, Bing, DuckDuckGo y YouTube se abren en su versión con filtro de contenido. Vesta Tracker también bloquea los proveedores conocidos de DNS cifrado, para que el filtro no se pueda desactivar desde el navegador. Con un toque se pueden aplicar las recomendaciones para la edad del menor.",
    purpose:
      "Restringir sitios concretos y sus subdominios. Si una regla de bloqueo y una de permiso coinciden, gana la más específica; en caso de empate, la de permiso.",
    howTo: [
      "En Vesta Padre, entra en «Filtros».",
      "Activa «Búsqueda segura» y «Bloquear DNS cifrado».",
      "Toca «Aplicar recomendaciones por edad» o añade sitios a mano.",
    ],
    managedIn: "Se configura en Vesta Padre. Se aplica en Vesta Tracker.",
    authorization: {
      purpose: P("es", "domain_filtering"),
      android: ["Conexión VPN local (solo para filtrar)", "Servicio de accesibilidad"],
    },
    limits:
      "La VPN de Vesta no es una VPN comercial ni oculta la dirección IP. El bloqueo de DNS cifrado se limita a los proveedores conocidos; navegadores o aplicaciones con resolución propia pueden saltarse el filtro.",
  },
  {
    id: "alertas",
    title: "Alertas y notificaciones",
    short: "Avisos en el teléfono del tutor, aunque Vesta Padre esté cerrada.",
    description:
      "Vesta Padre recibe notificaciones de: batería baja (20 %) y crítica (10 %), velocidad superior a unos 80 km/h, aplicaciones y sitios bloqueados, llegadas y salidas de zonas seguras, avisos SOS, teléfono sin conexión, tiempo diario agotado y protecciones desactivadas en el teléfono del menor.",
    purpose:
      "Enterarse de lo importante sin tener que abrir la aplicación. En Ajustes se puede elegir recibir al instante solo las alertas críticas; el resto queda en la app y en el resumen semanal.",
    howTo: [
      "Permite las notificaciones de Vesta Padre en Android.",
      "Abre la pestaña «Alertas» para verlas, filtrarlas por gravedad o eliminarlas.",
    ],
    managedIn: "Se reciben en Vesta Padre. Se generan en Vesta Tracker y en el servidor.",
    authorization: { purpose: P("es", "alerts"), android: ["Notificaciones"] },
    limits:
      "Las alertas no son un servicio de emergencias y pueden retrasarse si el teléfono no tiene conexión. Borrar una alerta no borra el historial de ubicación ni los informes.",
    screenshot: phone("alertas", "Pantalla de Alertas con avisos de batería", "Vesta Padre · Alertas"),
  },
  {
    id: "gestion-de-dispositivos",
    title: "Perfiles y vinculación",
    short: "Perfiles editables, vinculación con código QR y desvinculación.",
    description:
      "El tutor crea un perfil para cada menor (nombre, edad y color) y puede editarlo después. Vesta Padre muestra un código QR y un código de 10 caracteres, de un solo uso y válidos durante 24 horas. Vesta Tracker escanea el QR con la cámara o acepta el código escrito. Al desvincular, el teléfono del menor lo detecta solo y desactiva sus protecciones.",
    purpose: "Asociar cada teléfono a su perfil de forma controlada y retirarlo cuando ya no haga falta.",
    howTo: [
      "En Vesta Padre, toca «Añadir dispositivo» y completa el perfil.",
      "En Vesta Tracker, toca «Escanear código QR» y apunta al código.",
      "Para editar o desvincular, abre el menú ⋮ del perfil en el panel.",
    ],
    managedIn: "Vesta Padre y Vesta Tracker.",
    authorization: { android: ["Cámara (solo para leer el QR; opcional)"] },
    limits: "Desvincular un teléfono no borra por sí solo los datos históricos.",
    screenshot: phone("panel-dispositivos", "Panel de control de Vesta Padre con un dispositivo vinculado", "Vesta Padre · Panel"),
  },
  {
    id: "privacidad-y-autorizaciones",
    title: "Privacidad y autorizaciones",
    short: "Seis finalidades independientes y una pantalla para que el menor sepa qué se comparte.",
    description:
      "Antes de usar el panel, el tutor acepta los documentos legales, declara su representación legal e indica si el menor fue informado y escuchado. Después autoriza, una por una, las finalidades que quiere activar. En Vesta Tracker, la sección «Qué comparte Vesta» explica al menor, en lenguaje sencillo, qué se comparte y qué no.",
    purpose: "Que cada tipo de información se trate solo con una autorización expresa, y que se pueda retirar sin afectar al resto.",
    howTo: [
      "En Vesta Padre, abre «Ajustes» y después «Privacidad y autorizaciones».",
      "Revisa el consentimiento y las versiones de los documentos aceptados.",
      "Revoca una finalidad concreta o todas a la vez.",
    ],
    managedIn: "Se gestiona en Vesta Padre. Se respeta en Vesta Tracker.",
    authorization: {},
    screenshot: tablet(
      "esperando-autorizacion",
      "Vesta Tracker indicando que la ubicación no está autorizada",
      "Vesta Tracker · Sin autorización no se recopila la ubicación.",
    ),
  },
];

const en: Feature[] = [
  {
    id: "location",
    title: "Location",
    short: "The phone's last position on a map, with the real time it was taken.",
    description:
      "Vesta Tracker gets the phone's coordinates from Android's GPS and sends them to the platform. Vesta Parent shows the last position on the map, the time it was taken, and a notice if the signal is more than 15 minutes old.",
    purpose:
      "Know where the phone was at the last report and, if needed, open directions to that point in Google Maps with the “Directions” button.",
    howTo: [
      "In Vesta Parent, open the minor's profile.",
      "Go to the “Map” tab.",
      "Check the time of the “Last signal” before reading the position.",
    ],
    managedIn: "Viewed in Vesta Parent. Collected by Vesta Tracker.",
    authorization: {
      purpose: P("en", "location"),
      android: ["Precise location", "Background location", "Foreground service"],
    },
    limits:
      "The frequency depends on GPS, battery, connection and manufacturer restrictions. When offline, positions are stored on the phone and sent once it reconnects.",
    screenshot: phone(
      "ubicacion",
      "Tracking screen in Vesta Parent with a marker on the map and the Directions button",
      "Vesta Parent · Map. The map background has been blurred to protect a real location.",
    ),
  },
  {
    id: "safe-zones",
    isNew: true,
    title: "Safe zones",
    short: "A notice when the minor arrives at or leaves home, school or another place.",
    description:
      "The guardian marks a point and a radius on the map (from 50 to 2,000 metres) and chooses a notice on arrival, on departure or both. Vesta Tracker compares its position with the zones on the phone itself, so the notice is generated even if the connection comes and goes.",
    purpose: "Know the minor got to school or left home without having to watch the map.",
    howTo: [
      "On the profile screen, tap “Zones” and then “New zone”.",
      "Tap the map to set the centre and adjust the radius.",
      "Enter a name, choose the notices and save.",
    ],
    managedIn: "Set up in Vesta Parent. Detected by Vesta Tracker.",
    authorization: { purpose: P("en", "location") },
    limits:
      "It depends on GPS accuracy: the notice may arrive late or happen slightly outside the exact edge. To avoid false notices, a departure only counts once the phone moves beyond a margin.",
  },
  {
    id: "sos",
    isNew: true,
    title: "SOS button",
    short: "An emergency alert from the minor's phone, with their location.",
    description:
      "In Vesta Tracker, the minor presses and holds the “Emergency” button. Their guardians instantly receive a critical alert with the current location, even if they chose to receive only important notices.",
    purpose: "Let the minor ask their family for help with a single gesture.",
    howTo: [
      "In Vesta Tracker, press and hold the “Emergency” button.",
      "In Vesta Parent, tap the notification and then “See where they are now”.",
    ],
    managedIn: "Used in Vesta Tracker. Received in Vesta Parent.",
    authorization: { purpose: P("en", "alerts"), android: ["The location is attached only if its purpose is authorised"] },
    limits:
      "The SOS button alerts the family, not emergency services. In an emergency, call 123. When offline, the alert is sent once the connection is restored.",
  },
  {
    id: "device-status",
    title: "Device status",
    short: "Battery, connection, device details and a notice if it stops reporting.",
    description:
      "Vesta Parent shows the battery level, whether the phone is charging, the connection type, the manufacturer, the model and the Android version. If Vesta Tracker goes more than 20 minutes without sending data, the server alerts the guardian, even when Vesta Parent is closed.",
    purpose: "Check that the phone is still on, connected and protected.",
    howTo: ["Open the minor's profile in Vesta Parent.", "Go to the “Device” tab."],
    managedIn: "Viewed in Vesta Parent.",
    authorization: { purpose: P("en", "device_status") },
    screenshot: phone(
      "estado-dispositivo",
      "Device status screen with battery and manufacturer, model and Android version",
      "Vesta Parent · Device",
    ),
  },
  {
    id: "usage-statistics",
    title: "Usage statistics",
    short: "Screen time, usage per app, opens and a weekly summary.",
    description:
      "With Android's usage access, Vesta Tracker generates activity reports. Vesta Parent shows them by day or by week: screen time, usage per app, opens and daily activity. Every Sunday evening a weekly summary arrives too.",
    purpose: "See how screen time is spread and talk about it as a family with real data. Reports can be exported as PDF.",
    howTo: [
      "In Vesta Tracker, grant usage access from Android settings.",
      "In Vesta Parent, open the “Reports” tab.",
      "Choose “Last 7 days” or “Last day” and, if needed, tap “Export PDF”.",
    ],
    managedIn: "Viewed in Vesta Parent. The permission is granted in Vesta Tracker.",
    authorization: {
      purpose: P("en", "usage_stats"),
      android: ["Usage access (turned on manually in Settings)"],
    },
    screenshot: phone(
      "reportes",
      "Reports screen with screen time, app usage, opens and a daily activity chart",
      "Vesta Parent · Reports",
    ),
  },
  {
    id: "study-mode",
    isNew: true,
    title: "Study mode",
    short: "Only the apps you choose, for a while or on a fixed schedule.",
    description:
      "While it is on, the minor's phone only opens the allowed apps, plus the phone, messages, settings and keyboard. It can run for 30 minutes, 1 hour, 2 hours or with no limit, or on weekly schedules, including overnight (for example, 21:00 to 07:00).",
    purpose: "Help focus on homework or switch off at night.",
    howTo: [
      "On the profile screen, tap “Study mode”.",
      "Turn it on for a while or add a schedule.",
      "Select the apps allowed while studying.",
    ],
    managedIn: "Set up in Vesta Parent. Applied by Vesta Tracker, even offline.",
    authorization: { purpose: P("en", "app_filtering"), android: ["Accessibility service"] },
    limits: "It works while Vesta Tracker's accessibility service stays on. If it is turned off, the guardian gets an alert.",
  },
  {
    id: "time-limits",
    isNew: true,
    title: "Time limits",
    short: "A daily maximum for each app.",
    description:
      "The guardian gives each app a daily maximum, from 15 minutes to 4 hours. Vesta Tracker measures usage on the phone itself and, when the time runs out, blocks the app until the next day. Vesta Parent shows how much each one has been used today.",
    purpose: "Set specific limits for games or social media without blocking them completely.",
    howTo: [
      "On the profile screen, tap “Limits”.",
      "Choose the app.",
      "Select the maximum time per day.",
    ],
    managedIn: "Set up in Vesta Parent. Applied by Vesta Tracker.",
    authorization: {
      purpose: P("en", "app_filtering"),
      android: ["Accessibility service", "Usage access"],
    },
  },
  {
    id: "requests",
    isNew: true,
    title: "Requests",
    short: "The minor asks for more time or to unlock an app; the guardian answers with one tap.",
    description:
      "When Vesta blocks an app, Vesta Tracker shows a notice to ask for permission. The minor chooses the time and can write a message. The guardian gets a notification and approves, choosing the minutes, or rejects. While the permission lasts, the app works even if it is blocked, in study mode or out of daily time.",
    purpose: "Make limits negotiable without taking the phone away or breaking the rules.",
    howTo: [
      "The minor taps the block notice or opens “Ask for permission” in Vesta Tracker.",
      "In Vesta Parent, tap the notification or open “Requests” on the profile screen.",
      "Tap “Approve” and choose the minutes, or tap “Reject”.",
    ],
    managedIn: "Requested in Vesta Tracker. Answered in Vesta Parent.",
    authorization: { purpose: P("en", "app_filtering") },
  },
  {
    id: "app-blocking",
    title: "App blocking",
    short: "Block apps installed on the minor's phone.",
    description:
      "Vesta Tracker syncs the list of installed apps. In Vesta Parent you choose which ones to block, and each rule can be turned on or off. If someone tries to open a blocked app, Vesta Tracker goes back to the home screen and offers to ask for permission.",
    purpose: "Limit access to specific apps according to age and family agreements.",
    howTo: [
      "In Vesta Parent, go to “Filters”.",
      "Select the “Android app” category and tap “Choose installed apps”.",
      "Select the apps and save.",
    ],
    managedIn: "Set up in Vesta Parent. Applied by Vesta Tracker.",
    authorization: { purpose: P("en", "app_filtering"), android: ["Accessibility service"] },
    limits:
      "It depends on the Android version, the manufacturer and the accessibility service staying on. If it is turned off, the guardian gets an alert.",
    screenshot: phone(
      "filtros",
      "Content control screen with a block list and an active app blocking rule",
      "Vesta Parent · Filters",
    ),
  },
  {
    id: "web-filter",
    title: "Web filter and safe search",
    short: "Blocked sites, safe search and filters recommended by age.",
    description:
      "Vesta Parent lets you block or allow specific websites. With safe search, Google, Bing, DuckDuckGo and YouTube open in their content-filtered versions. Vesta Tracker also blocks known encrypted DNS providers, so the filter cannot be turned off from the browser. With one tap you can apply the recommendations for the minor's age.",
    purpose:
      "Restrict specific sites and their subdomains. If a block rule and an allow rule match, the more specific one wins; in a tie, the allow rule wins.",
    howTo: [
      "In Vesta Parent, go to “Filters”.",
      "Turn on “Safe search” and “Block encrypted DNS”.",
      "Tap “Apply age recommendations” or add sites by hand.",
    ],
    managedIn: "Set up in Vesta Parent. Applied by Vesta Tracker.",
    authorization: {
      purpose: P("en", "domain_filtering"),
      android: ["Local VPN connection (for filtering only)", "Accessibility service"],
    },
    limits:
      "Vesta's VPN is not a commercial VPN and does not hide your IP address. Encrypted DNS blocking is limited to known providers; browsers or apps with their own resolution may bypass the filter.",
  },
  {
    id: "alerts",
    title: "Alerts and notifications",
    short: "Notices on the guardian's phone, even when Vesta Parent is closed.",
    description:
      "Vesta Parent receives notifications for: low (20%) and critical (10%) battery, speed above about 80 km/h, blocked apps and sites, arrivals at and departures from safe zones, SOS alerts, the phone going offline, daily time used up, and protections being turned off on the minor's phone.",
    purpose:
      "Find out about what matters without opening the app. In Settings you can choose to receive only critical alerts instantly; the rest stay in the app and in the weekly summary.",
    howTo: [
      "Allow Vesta Parent notifications in Android.",
      "Open the “Alerts” tab to see them, filter them by severity or delete them.",
    ],
    managedIn: "Received in Vesta Parent. Generated by Vesta Tracker and the server.",
    authorization: { purpose: P("en", "alerts"), android: ["Notifications"] },
    limits:
      "Alerts are not an emergency service and may be delayed if the phone is offline. Deleting an alert does not delete the location history or reports.",
    screenshot: phone("alertas", "Alerts screen with battery notices", "Vesta Parent · Alerts"),
  },
  {
    id: "profiles-and-linking",
    title: "Profiles and linking",
    short: "Editable profiles, linking with a QR code, and unlinking.",
    description:
      "The guardian creates a profile for each minor (name, age and colour) and can edit it later. Vesta Parent shows a QR code and a 10-character code, single-use and valid for 24 hours. Vesta Tracker scans the QR code with the camera or accepts the typed code. When a phone is unlinked, it detects it on its own and turns off its protections.",
    purpose: "Link each phone to its profile in a controlled way, and remove it when no longer needed.",
    howTo: [
      "In Vesta Parent, tap “Add device” and fill in the profile.",
      "In Vesta Tracker, tap “Scan QR code” and point at the code.",
      "To edit or unlink, open the profile's ⋮ menu on the dashboard.",
    ],
    managedIn: "Vesta Parent and Vesta Tracker.",
    authorization: { android: ["Camera (only to read the QR code; optional)"] },
    limits: "Unlinking a phone does not, by itself, delete historical data.",
    screenshot: phone("panel-dispositivos", "Vesta Parent dashboard with a linked device", "Vesta Parent · Dashboard"),
  },
  {
    id: "privacy-and-authorisations",
    title: "Privacy and authorisations",
    short: "Six independent purposes, and a screen that tells the minor what is shared.",
    description:
      "Before using the dashboard, the guardian accepts the legal documents, declares their legal representation and states whether the minor was informed and heard. Then they authorise, one by one, the purposes they want to turn on. In Vesta Tracker, the “What Vesta shares” section explains to the minor, in plain language, what is shared and what is not.",
    purpose: "Process each type of information only with express authorisation, which can be withdrawn without affecting the rest.",
    howTo: [
      "In Vesta Parent, open “Settings” and then “Privacy and authorisations”.",
      "Review the consent and the versions of the documents accepted.",
      "Withdraw one purpose or all of them at once.",
    ],
    managedIn: "Managed in Vesta Parent. Respected by Vesta Tracker.",
    authorization: {},
    screenshot: tablet(
      "esperando-autorizacion",
      "Vesta Tracker showing that location is not authorised",
      "Vesta Tracker · Without authorisation, location is not collected.",
    ),
  },
];

export function featuresFor(locale: Locale): Feature[] {
  return locale === "en" ? en : es;
}

/** Sign-in methods for Vesta Parent, checked in the code. */
export const signInMethods = {
  es: ["Correo electrónico y contraseña", "Cuenta de Google", "Cuenta de GitHub"],
  en: ["Email and password", "Google account", "GitHub account"],
} as const;
