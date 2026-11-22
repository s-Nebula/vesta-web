/**
 * FAQ and Help Center articles (version 1.1).
 * Based on the User Guide v1.1, the Privacy Policy v1.1 and the app code.
 */
import { docHref, href, type Locale } from "@/i18n";

export type QA = { q: string; a: string[]; links?: { href: string; label: string }[] };
export type HelpTopic = { id: string; title: string; intro: string; steps: string[]; note?: string };

function esFaq(): QA[] {
  return [
    {
      q: "¿Qué es Vesta Security?",
      a: [
        "Dos aplicaciones Android para proteger el entorno digital de un menor. El adulto responsable usa Vesta Padre y el menor tiene Vesta Tracker en su teléfono.",
        "Vesta ayuda a supervisar con responsabilidad, pero no sustituye el acompañamiento familiar ni los servicios de emergencia.",
      ],
    },
    {
      q: "¿En qué se diferencian Vesta Padre y Vesta Tracker?",
      a: [
        "Vesta Padre es la aplicación de gestión: perfiles, filtros, modo estudio, límites, zonas seguras, peticiones, alertas, informes y autorizaciones.",
        "Vesta Tracker se instala en el teléfono del menor: envía la información autorizada, aplica las reglas y le permite pedir permiso o enviar un aviso SOS.",
      ],
      links: [{ href: href("es", "platform"), label: "Cómo se relacionan" }],
    },
    {
      q: "¿Cómo se vinculan los teléfonos?",
      a: [
        "Al crear el perfil del menor, Vesta Padre muestra un código QR y un código de 10 caracteres. En Vesta Tracker se escanea el QR o se escribe el código.",
        "El código es de un solo uso y caduca a las 24 horas. Si caduca, toca el perfil en el panel y pulsa «Código nuevo».",
      ],
      links: [{ href: docHref("es", "guide", "4-vinculacion-de-los-dispositivos"), label: "Guía: vinculación" }],
    },
    {
      q: "¿Qué puede ver el tutor?",
      a: [
        "Según las finalidades autorizadas: la última ubicación, las llegadas y salidas de las zonas seguras, el estado del teléfono, el uso de aplicaciones, las reglas y las alertas.",
        "Vesta no lee mensajes, contraseñas, fotos ni el contenido de otras aplicaciones, ni guarda el historial de navegación.",
      ],
    },
    {
      q: "¿Qué pasa si el teléfono del menor se queda sin internet?",
      a: [
        "Vesta Tracker sigue aplicando las últimas reglas durante 24 horas y guarda los datos para enviarlos al reconectar. El modo estudio y los límites funcionan sin conexión.",
        "Si el teléfono pasa más de 20 minutos sin enviar datos, el tutor recibe una alerta.",
      ],
    },
    {
      q: "¿Cómo funcionan el modo estudio y los límites de tiempo?",
      a: [
        "El modo estudio deja abrir solo las aplicaciones que elijas (más teléfono, mensajes, ajustes y teclado), durante un rato o en un horario. Los límites fijan un máximo diario por aplicación.",
        "Si el menor necesita más tiempo, puede pedirlo desde Vesta Tracker y tú lo apruebas con un toque.",
      ],
      links: [{ href: href("es", "features", "modo-estudio"), label: "Ver el modo estudio" }],
    },
    {
      q: "¿Cómo se autorizan las finalidades?",
      a: [
        "En Vesta Padre, en «Ajustes» → «Privacidad y autorizaciones». Cada finalidad (ubicación, estado del dispositivo, estadísticas de uso, control de aplicaciones, filtrado de sitios web y alertas) es independiente y opcional.",
        "La autorización legal es distinta de los permisos de Android: conceder un permiso del sistema no sustituye la autorización para tratar los datos.",
      ],
    },
    {
      q: "¿Cómo revoco una autorización?",
      a: [
        "Desde «Privacidad y autorizaciones» en Vesta Padre puedes revocar una finalidad o todas. Las funciones asociadas dejan de estar disponibles en menos de un minuto.",
        "También puedes pedir la revocación o la supresión de datos escribiendo al canal de privacidad de la Política.",
      ],
      links: [{ href: docHref("es", "privacy", "16-revocacion-de-autorizacion"), label: "Política: revocación" }],
    },
    {
      q: "¿Qué necesito para instalar las aplicaciones?",
      a: [
        "Dos teléfonos con Android 7.0 o superior, internet y una cuenta para Vesta Padre. Algunas funciones requieren permisos de ubicación, datos de uso, accesibilidad o VPN local en el teléfono del menor.",
        "Vesta solo está disponible para Android.",
      ],
      links: [{ href: href("es", "downloads"), label: "Ir a descargas" }],
    },
  ];
}

function enFaq(): QA[] {
  return [
    {
      q: "What is Vesta Security?",
      a: [
        "Two Android apps that help protect a minor's digital life. The responsible adult uses Vesta Parent and the minor has Vesta Tracker on their phone.",
        "Vesta supports responsible supervision, but it does not replace family support or emergency services.",
      ],
    },
    {
      q: "How are Vesta Parent and Vesta Tracker different?",
      a: [
        "Vesta Parent is the management app: profiles, filters, study mode, limits, safe zones, requests, alerts, reports and authorisations.",
        "Vesta Tracker is installed on the minor's phone: it sends the authorised information, applies the rules and lets the minor ask for permission or send an SOS alert.",
      ],
      links: [{ href: href("en", "platform"), label: "How they work together" }],
    },
    {
      q: "How do I link the phones?",
      a: [
        "When you create the minor's profile, Vesta Parent shows a QR code and a 10-character code. In Vesta Tracker, scan the QR code or type the code.",
        "The code is single-use and expires after 24 hours. If it expires, tap the profile on the dashboard and then “New code”.",
      ],
      links: [{ href: docHref("en", "guide", "4-linking-the-devices"), label: "Guide: linking" }],
    },
    {
      q: "What can the guardian see?",
      a: [
        "Depending on the authorised purposes: the last location, arrivals at and departures from safe zones, phone status, app usage, rules and alerts.",
        "Vesta does not read messages, passwords, photos or the content of other apps, and it does not store browsing history.",
      ],
    },
    {
      q: "What happens if the minor's phone goes offline?",
      a: [
        "Vesta Tracker keeps applying the latest rules for 24 hours and stores the data to send it once reconnected. Study mode and limits work offline.",
        "If the phone goes more than 20 minutes without sending data, the guardian gets an alert.",
      ],
    },
    {
      q: "How do study mode and time limits work?",
      a: [
        "Study mode only lets the apps you choose open (plus phone, messages, settings and keyboard), for a while or on a schedule. Limits set a daily maximum per app.",
        "If the minor needs more time, they can ask from Vesta Tracker and you approve with one tap.",
      ],
      links: [{ href: href("en", "features", "study-mode"), label: "See study mode" }],
    },
    {
      q: "How are purposes authorised?",
      a: [
        "In Vesta Parent, under “Settings” → “Privacy and authorisations”. Each purpose (location, device status, usage statistics, app control, website filtering and alerts) is independent and optional.",
        "Legal authorisation is separate from Android permissions: granting a system permission does not replace the authorisation to process the data.",
      ],
    },
    {
      q: "How do I withdraw an authorisation?",
      a: [
        "From “Privacy and authorisations” in Vesta Parent you can withdraw one purpose or all of them. The related features stop working within a minute.",
        "You can also request withdrawal or deletion of data by writing to the privacy channel in the Policy.",
      ],
      links: [{ href: docHref("en", "privacy", "16-withdrawal-of-authorisation"), label: "Policy: withdrawal" }],
    },
    {
      q: "What do I need to install the apps?",
      a: [
        "Two phones with Android 7.0 or later, an Internet connection and an account for Vesta Parent. Some features need location, usage access, accessibility or local VPN permissions on the minor's phone.",
        "Vesta is only available for Android.",
      ],
      links: [{ href: href("en", "downloads"), label: "Go to downloads" }],
    },
  ];
}

function esTopics(): HelpTopic[] {
  return [
    {
      id: "instalacion",
      title: "Instalación",
      intro: "Vesta se distribuye como archivos APK. Android pide autorización para instalar aplicaciones fuera de Google Play.",
      steps: [
        "Descarga el APK desde la página de descargas de este sitio.",
        "Abre el archivo. Si Android lo pide, permite «Instalar apps desconocidas» solo para el navegador o el gestor de archivos que uses.",
        "Instala Vesta Padre en el teléfono del adulto y Vesta Tracker en el del menor.",
        "Al terminar, puedes volver a desactivar ese permiso.",
      ],
      note: "Descarga Vesta solo desde los canales oficiales y, si quieres, compara la huella SHA-256 publicada en descargas.",
    },
    {
      id: "inicio-de-sesion",
      title: "Inicio de sesión",
      intro: "Vesta Padre admite correo y contraseña, Google y GitHub.",
      steps: [
        "Comprueba que el correo esté bien escrito y que haya conexión.",
        "Si no recuerdas la contraseña, usa «¿Olvidaste tu contraseña?».",
        "Si creaste la cuenta con Google o GitHub, entra con el mismo método.",
      ],
      note: "El soporte de Vesta nunca te pedirá la contraseña ni códigos secretos.",
    },
    {
      id: "problemas-de-vinculacion",
      title: "Vinculación",
      intro: "El código de vinculación (QR o 10 caracteres) es de un solo uso y caduca a las 24 horas.",
      steps: [
        "En Vesta Tracker, toca «Escanear código QR» o escribe el código completo.",
        "Acepta los permisos que pide Vesta Tracker.",
        "Si el código caducó, toca el perfil en el panel de Vesta Padre y pulsa «Código nuevo».",
        "Vesta Padre detecta la vinculación sola; no hace falta recargar.",
      ],
    },
    {
      id: "problemas-de-conexion",
      title: "Conexión",
      intro: "Si Vesta Tracker pasa más de 20 minutos sin enviar datos, recibirás una alerta de «Dispositivo sin conexión».",
      steps: [
        "Comprueba que el teléfono del menor esté encendido, con batería e internet.",
        "Comprueba que los teléfonos sigan vinculados.",
        "Revisa en Android la configuración de batería y segundo plano de Vesta Tracker.",
      ],
      note: "Algunos fabricantes detienen las apps en segundo plano para ahorrar batería. Sin conexión, Vesta Tracker sigue aplicando las reglas hasta 24 horas.",
    },
    {
      id: "permisos",
      title: "Permisos",
      intro: "Cada función necesita un permiso de Android, además de la autorización de la finalidad en Vesta Padre.",
      steps: [
        "Estadísticas de uso y límites: Ajustes → Acceso a datos de uso → Vesta Tracker.",
        "Bloqueo de apps, modo estudio y límites: Ajustes → Accesibilidad → Vesta Tracker → activar.",
        "Filtro web y búsqueda segura: acepta la solicitud de conexión VPN de Vesta Tracker.",
        "Notificaciones: permítelas en Vesta Padre para recibir alertas y peticiones.",
      ],
    },
    {
      id: "ubicacion",
      title: "Ubicación y zonas",
      intro: "La ubicación puede aparecer desactualizada por causas ajenas a la aplicación.",
      steps: [
        "Comprueba que el GPS esté activado en el teléfono del menor.",
        "Revisa que Vesta Tracker tenga ubicación precisa y «Permitir todo el tiempo».",
        "Confirma que la finalidad «Ubicación e historial» esté autorizada.",
        "Para las zonas, usa un radio de al menos 150 metros: el GPS tiene margen de error.",
      ],
    },
    {
      id: "privacidad",
      title: "Privacidad",
      intro: "Puedes consultar, actualizar, rectificar o suprimir datos y revocar autorizaciones.",
      steps: [
        "Revisa y revoca finalidades en Vesta Padre → «Ajustes» → «Privacidad y autorizaciones».",
        "Para consultas o reclamos formales, escribe al canal de privacidad.",
        "Las consultas se responden en máximo 10 días hábiles y los reclamos en 15, según la Política.",
      ],
    },
  ];
}

function enTopics(): HelpTopic[] {
  return [
    {
      id: "installation",
      title: "Installation",
      intro: "Vesta is distributed as APK files. Android asks for permission to install apps from outside Google Play.",
      steps: [
        "Download the APK from the downloads page of this site.",
        "Open the file. If Android asks, allow “Install unknown apps” only for the browser or file manager you are using.",
        "Install Vesta Parent on the adult's phone and Vesta Tracker on the minor's.",
        "When you are done, you can turn that permission off again.",
      ],
      note: "Only download Vesta from the official channels and, if you like, compare the SHA-256 fingerprint published on the downloads page.",
    },
    {
      id: "sign-in",
      title: "Signing in",
      intro: "Vesta Parent supports email and password, Google and GitHub.",
      steps: [
        "Check that the email is spelled correctly and that you are online.",
        "If you forgot your password, use “Forgot your password?”.",
        "If you created the account with Google or GitHub, sign in with the same method.",
      ],
      note: "Vesta support will never ask for your password or secret codes.",
    },
    {
      id: "linking",
      title: "Linking",
      intro: "The linking code (QR or 10 characters) is single-use and expires after 24 hours.",
      steps: [
        "In Vesta Tracker, tap “Scan QR code” or type the full code.",
        "Accept the permissions Vesta Tracker asks for.",
        "If the code expired, tap the profile on the Vesta Parent dashboard and then “New code”.",
        "Vesta Parent detects the link on its own; there is no need to refresh.",
      ],
    },
    {
      id: "connection",
      title: "Connection",
      intro: "If Vesta Tracker goes more than 20 minutes without sending data, you will get a “Device offline” alert.",
      steps: [
        "Check that the minor's phone is on, charged and online.",
        "Check that the phones are still linked.",
        "Review Vesta Tracker's battery and background settings in Android.",
      ],
      note: "Some manufacturers stop background apps to save battery. While offline, Vesta Tracker keeps applying the rules for up to 24 hours.",
    },
    {
      id: "permissions",
      title: "Permissions",
      intro: "Each feature needs an Android permission, as well as the purpose being authorised in Vesta Parent.",
      steps: [
        "Usage statistics and limits: Settings → Usage access → Vesta Tracker.",
        "App blocking, study mode and limits: Settings → Accessibility → Vesta Tracker → turn on.",
        "Web filter and safe search: accept Vesta Tracker's VPN connection request.",
        "Notifications: allow them for Vesta Parent to receive alerts and requests.",
      ],
    },
    {
      id: "location",
      title: "Location and zones",
      intro: "The location may look out of date for reasons outside the app.",
      steps: [
        "Check that GPS is on in the minor's phone.",
        "Check that Vesta Tracker has precise location and “Allow all the time”.",
        "Confirm that the “Location and history” purpose is authorised.",
        "For zones, use a radius of at least 150 metres: GPS has a margin of error.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy",
      intro: "You can access, update, correct or delete data and withdraw authorisations.",
      steps: [
        "Review and withdraw purposes in Vesta Parent → “Settings” → “Privacy and authorisations”.",
        "For formal enquiries or complaints, write to the privacy channel.",
        "Enquiries are answered within 10 business days and complaints within 15, according to the Policy.",
      ],
    },
  ];
}

export const faqFor = (locale: Locale): QA[] => (locale === "en" ? enFaq() : esFaq());
export const helpTopicsFor = (locale: Locale): HelpTopic[] => (locale === "en" ? enTopics() : esTopics());
