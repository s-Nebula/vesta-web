import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Device } from "@/components/ui/Device";
import { AppTag } from "@/components/ui/AppTag";
import { Steps } from "@/components/sections/Steps";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "La plataforma",
  description:
    "Cómo funcionan Vesta Padre y Vesta Tracker: qué hace cada aplicación, qué información circula entre ellas, qué permisos de Android necesitan y cuáles son sus límites.",
  path: "/plataforma/",
});

const padre = [
  ["Administración de dispositivos vinculados", "Crea perfiles, genera códigos de vinculación y desvincula dispositivos desde el panel de control."],
  ["Consulta de ubicación", "Muestra en el mapa la última posición recibida y la hora de la última señal, si la finalidad está autorizada."],
  ["Información del dispositivo", "Batería, carga, conectividad, fabricante, modelo, versión de Android y último contacto."],
  ["Estadísticas de uso", "Tiempo de pantalla, uso por aplicación, aperturas y actividad diaria, con exportación a PDF."],
  ["Funciones de protección", "Listas de aplicaciones y dominios bloqueados o permitidos, que se pueden activar o desactivar."],
  ["Alertas", "Batería baja o crítica, velocidad elevada e intentos de acceso a aplicaciones o dominios bloqueados."],
  ["Permisos y autorizaciones", "Consentimiento, finalidades autorizadas y revocación, individual o total."],
];

const tracker = [
  ["Comunicación con la plataforma", "Se vincula con un código de un solo uso y mantiene la comunicación con Vesta mientras está activo."],
  ["Ubicación autorizada", "Obtiene la posición mediante el GPS de Android, también en segundo plano, solo si la finalidad está autorizada."],
  ["Estado del dispositivo", "Informa del nivel de batería, la carga, la conexión y los datos del equipo."],
  ["Supervisión permitida", "Genera informes de uso de aplicaciones con el acceso a datos de uso de Android."],
  ["Reglas de protección", "Aplica los bloqueos de aplicaciones (accesibilidad) y de dominios (VPN local DNS)."],
  ["Coordinación con Vesta Padre", "Consulta periódicamente las autorizaciones vigentes y detiene la recopilación si no puede confirmarlas."],
];

const permissions = [
  ["Ubicación precisa y en segundo plano", "Vesta Tracker", "Obtener la posición del dispositivo y enviarla aunque la app no esté en pantalla.", "Ubicación e historial"],
  ["Acceso a datos de uso", "Vesta Tracker", "Calcular el tiempo de pantalla, el uso por aplicación y las aperturas.", "Estadísticas de uso"],
  ["Servicio de accesibilidad", "Vesta Tracker", "Detectar la apertura de una aplicación bloqueada y el dominio en el navegador compatible.", "Filtrado de aplicaciones y de dominios"],
  ["Conexión VPN local", "Vesta Tracker", "Procesar consultas DNS para aplicar el bloqueo de dominios. No oculta la IP ni es una VPN comercial.", "Filtrado de dominios"],
  ["Servicio en primer plano y notificaciones", "Ambas", "Mantener activos los servicios e informar de que la protección está en marcha.", "—"],
  ["Notificaciones", "Vesta Padre", "Recibir los avisos de alertas.", "Alertas y eventos"],
];

const limits = [
  "Ubicación en tiempo real permanente o precisión absoluta de las coordenadas.",
  "Recepción inmediata de todas las alertas.",
  "Bloqueo de todos los sitios web o aplicaciones: el DNS cifrado o los navegadores alternativos pueden evitar el filtrado.",
  "Compatibilidad con todos los dispositivos, navegadores o versiones de Android.",
  "Protección frente a la desinstalación o la manipulación del sistema operativo.",
  "Sustituir a los servicios de emergencia, policiales, médicos o de protección infantil.",
];

export default function PlataformaPage() {
  return (
    <>
      <PageHero
        kicker="La plataforma"
        title="Dos aplicaciones que trabajan juntas."
        lead="Vesta Security se compone de Vesta Padre, la aplicación de gestión del adulto responsable, y Vesta Tracker, que se instala en el dispositivo del menor. Ninguna funciona sola: se asocian mediante un código y se coordinan a través de la plataforma Vesta."
      />

      {/* Relación entre las apps */}
      <section aria-labelledby="relacion" className="py-20 md:py-28">
        <div className="wrap">
          <h2 id="relacion" className="kicker">
            Relación entre las aplicaciones
          </h2>
          <div className="mt-10 grid items-stretch gap-0 border border-line md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="p-7 md:p-9">
              <AppTag app="padre" />
              <p className="mt-5 font-serif text-2xl">Vesta Padre</p>
              <p className="mt-3 text-sm text-muted">Crea perfiles y códigos, define reglas, autoriza finalidades y consulta la información recibida.</p>
            </div>
            <div className="flex items-center justify-center border-y border-line py-4 text-rose-700 md:border-x md:border-y-0 md:px-5">
              <ArrowLeftRight aria-hidden="true" className="size-5 rotate-90 md:rotate-0" />
            </div>
            <div className="bg-wine p-7 text-ivory md:p-9">
              <span className="tag text-rose-300">Plataforma Vesta</span>
              <p className="mt-5 font-serif text-2xl">Servicios de Vesta</p>
              <p className="mt-3 text-sm text-ivory/75">
                Autenticación de cuentas y dispositivos, vinculación, almacenamiento de perfiles, reglas, alertas e informes, y verificación de las
                autorizaciones vigentes.
              </p>
            </div>
            <div className="flex items-center justify-center border-y border-line py-4 text-rose-700 md:border-x md:border-y-0 md:px-5">
              <ArrowLeftRight aria-hidden="true" className="size-5 rotate-90 md:rotate-0" />
            </div>
            <div className="p-7 md:p-9">
              <AppTag app="tracker" />
              <p className="mt-5 font-serif text-2xl">Vesta Tracker</p>
              <p className="mt-3 text-sm text-muted">Recibe reglas y autorizaciones; envía ubicación, estado, informes y eventos de las finalidades autorizadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vesta Padre */}
      <section aria-labelledby="vesta-padre" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              kicker="Para el tutor"
              id="vesta-padre"
              title="Vesta Padre"
              lead="La aplicación desde la que el padre, la madre o el representante legal gestiona la protección digital del menor."
            />
            <p className="mt-6 text-sm text-muted">Acceso con correo y contraseña, cuenta de Google o cuenta de GitHub.</p>
          </div>
          <dl className="border-t border-wine lg:col-span-7">
            {padre.map(([t, d]) => (
              <div key={t} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[15rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg leading-snug">{t}</dt>
                <dd className="text-[0.94rem] text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-16">
          <ul className="no-scrollbar -mx-5 flex snap-x gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0">
            {[
              ["panel-dispositivos", "Panel de control"],
              ["ubicacion", "Mapa"],
              ["reportes", "Reportes"],
              ["alertas", "Alertas"],
            ].map(([n, c]) => (
              <li key={n} className="w-[58vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
                <figure>
                  <Device
                    shot={{ src: `/img/padre/${n}`, alt: `Vesta Padre: ${c}`, kind: "phone", sizes: [420, 840] }}
                    sizesAttr="(min-width: 48rem) 25vw, 58vw"
                  />
                  <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{c}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vesta Tracker */}
      <section aria-labelledby="vesta-tracker" className="py-20 md:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              kicker="Para el dispositivo del menor"
              id="vesta-tracker"
              title="Vesta Tracker"
              lead="La aplicación que se instala en el teléfono o la tableta del menor. Envía solo la información autorizada y aplica las reglas configuradas."
            />
          </div>
          <dl className="border-t border-wine lg:col-span-7">
            {tracker.map(([t, d]) => (
              <div key={t} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[15rem_1fr] sm:gap-8">
                <dt className="font-serif text-lg leading-snug">{t}</dt>
                <dd className="text-[0.94rem] text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap mt-16 grid gap-8 md:grid-cols-2">
          <figure>
            <Device shot={{ src: "/img/tracker/vinculacion", alt: "Vesta Tracker: pantalla de vinculación con código", kind: "tablet", sizes: [800, 1600] }} sizesAttr="(min-width: 48rem) 45vw, 90vw" />
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Vinculación</figcaption>
          </figure>
          <figure>
            <Device shot={{ src: "/img/tracker/rastreo-activo", alt: "Vesta Tracker: rastreo activo con estadísticas habilitadas y filtros sincronizados", kind: "tablet", sizes: [800, 1600] }} sizesAttr="(min-width: 48rem) 45vw, 90vw" />
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Rastreo activo</figcaption>
          </figure>
        </div>
      </section>

      {/* Cómo funciona */}
      <section aria-labelledby="como-funciona" className="on-dark bg-wine py-20 text-ivory md:py-28">
        <div className="wrap">
          <SectionHead kicker="Cómo funciona" id="como-funciona" title="Seis pasos, dos dispositivos." />
          <div className="mt-16">
            <Steps dark />
          </div>
        </div>
      </section>

      {/* Permisos */}
      <section aria-labelledby="permisos" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHead
            kicker="Requisitos y permisos"
            id="permisos"
            title="Qué pide Android y para qué."
            lead="Dos dispositivos con Android 7.0 o superior y conexión a Internet. Cada permiso del sistema se solicita para una función concreta y no sustituye la autorización de la finalidad."
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-wine text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="py-3 pr-6 font-semibold">Permiso de Android</th>
                  <th scope="col" className="py-3 pr-6 font-semibold">Aplicación</th>
                  <th scope="col" className="py-3 pr-6 font-semibold">Para qué se usa</th>
                  <th scope="col" className="py-3 font-semibold">Finalidad asociada</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(([p, a, u, f]) => (
                  <tr key={p} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-6 font-serif text-base font-medium">{p}</th>
                    <td className="py-4 pr-6 whitespace-nowrap">{a}</td>
                    <td className="py-4 pr-6 text-muted">{u}</td>
                    <td className="py-4">{f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Límites */}
      <section aria-labelledby="limites" className="border-t border-line bg-paper py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead kicker="Límites" id="limites" title="Lo que Vesta no puede garantizar." />
            <p className="lead mt-6">Lo decimos de forma explícita, como lo recogen los Términos y condiciones.</p>
            <Link href="/documentacion/terminos-y-condiciones/#8-limitaciones-del-servicio" className="arrow-link mt-8">
              Términos, sección 8 <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="border-t border-wine lg:col-span-7">
            {limits.map((l) => (
              <li key={l} className="flex gap-5 border-b border-line py-5 text-[0.98rem]">
                <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-rose" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap flex flex-col items-start justify-between gap-8 border-t border-wine pt-10 md:flex-row md:items-center">
          <p className="font-serif text-3xl leading-tight md:text-4xl">¿Listo para empezar?</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/descargas/" className="btn btn-primary">
              Descargar aplicaciones
            </Link>
            <Link href="/documentacion/guia-de-usuario/" className="btn btn-ghost">
              Leer la guía de usuario
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
