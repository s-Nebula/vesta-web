/**
 * Institutional content: who we are, mission, values and commitments.
 * Draft wording for review by FORBIDDEN S.A.S. It contains no partnerships,
 * certifications or figures.
 */
import type { Locale } from "@/i18n";

type Institutional = {
  mission: { label: string; text: string };
  vision: { label: string; text: string };
  origin: string[];
  values: { title: string; text: string }[];
  privacyCommitments: string[];
  responsibleUse: string[];
};

const es: Institutional = {
  mission: {
    label: "Misión",
    text: "Dar a las familias herramientas claras para acompañar la vida digital de niños, niñas y adolescentes, con una supervisión proporcionada, autorizada y explicada, que respete su intimidad y su autonomía.",
  },
  vision: {
    label: "Visión",
    text: "Ser la herramienta de protección digital en la que madres, padres y tutores confían porque entienden qué hace, qué datos trata y con qué límites.",
  },
  origin: [
    "Vesta Security es un proyecto de Nebula, operado por FORBIDDEN S.A.S. desde Santa Marta, Colombia.",
    "Empezó con una pregunta sencilla: ¿se puede cuidar el teléfono de un hijo sin espiarlo? De ahí salen las decisiones que lo diferencian: cada función se autoriza por separado, el menor puede ver qué se comparte y pedir permiso, y los límites están escritos en documentos públicos.",
  ],
  values: [
    {
      title: "Proporcionalidad",
      text: "Solo se activa lo que el tutor autoriza, y cada función tiene un propósito concreto. La supervisión debe responder al interés del menor, no a la desconfianza.",
    },
    {
      title: "Transparencia",
      text: "Términos, privacidad y guía están publicados completos, con versión y fecha. También explicamos lo que Vesta no puede garantizar.",
    },
    {
      title: "La voz del menor",
      text: "Vesta Tracker le explica al menor qué se comparte y le permite pedir permiso o más tiempo. Los Términos prohíben ocultar la supervisión cuando eso vulnere sus derechos.",
    },
    {
      title: "Control y revocación",
      text: "Cada autorización se puede retirar desde Vesta Padre, y los titulares pueden consultar, corregir o pedir que se borren sus datos.",
    },
    {
      title: "Lo justo y por un tiempo",
      text: "Se recoge lo necesario para cada finalidad y se guarda durante plazos definidos: 90 días el historial de ubicación y los informes, 12 meses las alertas.",
    },
    {
      title: "Honestidad técnica",
      text: "Ninguna herramienta lo bloquea todo ni localiza en todo momento. Documentamos los límites para que cada familia decida con información.",
    },
  ],
  privacyCommitments: [
    "No usamos los datos para publicidad ni vendemos perfiles personales.",
    "La autorización para tratar datos es independiente de los permisos de Android.",
    "Cualquier finalidad nueva se informa y, cuando hace falta, se pide autorización antes de activarla.",
    "Los titulares pueden presentar consultas y reclamos ante FORBIDDEN S.A.S. y, después, ante la Superintendencia de Industria y Comercio.",
  ],
  responsibleUse: [
    "Vesta es para la protección familiar de menores. No debe usarse para vigilar a parejas, empleados u otros adultos sin su consentimiento.",
    "Vesta no es un servicio de emergencias: el botón SOS avisa a la familia, no a la policía ni a los servicios médicos.",
  ],
};

const en: Institutional = {
  mission: {
    label: "Mission",
    text: "Give families clear tools to support the digital lives of children and teenagers, with supervision that is proportionate, authorised and explained, and that respects their privacy and autonomy.",
  },
  vision: {
    label: "Vision",
    text: "Be the digital protection tool that parents and guardians trust because they understand what it does, what data it handles and where its limits are.",
  },
  origin: [
    "Vesta Security is a project by Nebula, operated by FORBIDDEN S.A.S. from Santa Marta, Colombia.",
    "It started with a simple question: can you look after your child's phone without spying on them? That is where its defining decisions come from: each feature is authorised separately, the minor can see what is shared and ask for permission, and the limits are written down in public documents.",
  ],
  values: [
    {
      title: "Proportionality",
      text: "Only what the guardian authorises is turned on, and each feature has a specific purpose. Supervision should serve the minor's interests, not distrust.",
    },
    {
      title: "Transparency",
      text: "The terms, privacy policy and guide are published in full, with version and date. We also explain what Vesta cannot guarantee.",
    },
    {
      title: "The minor's voice",
      text: "Vesta Tracker tells the minor what is shared and lets them ask for permission or more time. The Terms prohibit hiding the supervision where that would infringe their rights.",
    },
    {
      title: "Control and withdrawal",
      text: "Every authorisation can be withdrawn from Vesta Parent, and data subjects can access, correct or ask for their data to be deleted.",
    },
    {
      title: "Only what is needed, only for a while",
      text: "Only what each purpose needs is collected, and it is kept for set periods: 90 days for location history and reports, 12 months for alerts.",
    },
    {
      title: "Technical honesty",
      text: "No tool blocks everything or locates a phone at every moment. We document the limits so every family can decide with full information.",
    },
  ],
  privacyCommitments: [
    "We do not use data for advertising or sell personal profiles.",
    "Authorisation to process data is separate from Android permissions.",
    "Any new purpose is disclosed and, where required, authorisation is requested before it is turned on.",
    "Data subjects can submit enquiries and complaints to FORBIDDEN S.A.S. and then to Colombia's Superintendence of Industry and Commerce.",
  ],
  responsibleUse: [
    "Vesta is for the family protection of minors. It must not be used to monitor partners, employees or other adults without their consent.",
    "Vesta is not an emergency service: the SOS button alerts the family, not the police or medical services.",
  ],
};

export const institutionalFor = (locale: Locale): Institutional => (locale === "en" ? en : es);
