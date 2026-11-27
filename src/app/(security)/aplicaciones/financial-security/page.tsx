import Link from "next/link";
import { Plus, Download, Smartphone, Server, Monitor } from "lucide-react";
import { securityMeta } from "@/components/security/parts";
import { FinancialBar } from "@/components/apps/FinancialBar";
import { JsonLd } from "@/lib/seo";
import { site, company } from "@/content/site";
import { financial } from "@/content/apps";
import { formatCop } from "@/content/security";

export const metadata = securityMeta(
  "Financial Security · App de cobros para prestamistas",
  "El cobrador registra cada pago en el celular, aunque no tenga señal. Usted ve en el computador cuánto se cobró, cuánto está en mora y cuánto está ganando. Android y Windows.",
  "/aplicaciones/financial-security/",
  false,
  "/og-financial.png",
);

const wa = (t: string) => `https://wa.me/573246167956?text=${encodeURIComponent(t)}`;

const parts = [
  { icon: Smartphone, title: "Celular del cobrador", text: "Ve a quién cobrar hoy, registra pagos, presta, renueva y anota gastos. Sin señal, todo queda guardado." },
  { icon: Server, title: "Servidor central", text: "Guarda los datos de su negocio separados de los demás, con copia de seguridad cifrada cada noche." },
  { icon: Monitor, title: "Usted, el dueño", text: "Métricas, clientes, créditos, equipo y caja de cada cobrador. En el PC o en su propio celular." },
];

const features: [string, string][] = [
  ["Cualquier frecuencia", "Diario, semanal, quincenal o mensual. Usted elige qué días se cobra y si se saltan los festivos de Colombia."],
  ["Tres formas de prestar", "Interés fijo sobre el capital (el clásico del gota a gota), sobre saldo con cuota fija, o préstamo quieto: el cliente paga solo el interés cada mes y los abonos a capital lo bajan."],
  ["Mora clara", "Cuotas atrasadas, días de mora y quién debe primero. Los abonos parciales y adelantados se aplican solos."],
  ["Funciona sin señal", "En el barrio sin cobertura el cobrador sigue trabajando. Cuando vuelve la señal, todo se envía una sola vez, sin duplicados."],
  ["Caja del cobrador", "Lo que debería tener en la mano, los gastos del día y el cierre de caja con el dinero contado y la diferencia."],
  ["Métricas del negocio", "Recaudo, capital en la calle, ganancia, gastos y mora, por día, por cobrador y por ruta."],
  ["Renovaciones", "El saldo pendiente se descuenta del préstamo nuevo y la app dice cuánto efectivo entregar."],
  ["Solo el dueño borra", "El cobrador no puede editar ni borrar pagos. El dueño puede anularlos con motivo o eliminarlos si fueron un error. Cada cobrador ve solo su ruta."],
];

const owner: [string, string][] = [
  ["Entre con su usuario de dueño", "Le entregamos el usuario al activar su negocio. Una guía con flecha le muestra los primeros pasos."],
  ["Registre su base de capital", "Es el dinero con el que presta: cada préstamo sale de ahí y cada cobro vuelve ahí."],
  ["Cree las rutas y los cobradores", "En «Equipo»: cada cobrador con su usuario y la ruta que le toca."],
  ["Registre los clientes y créditos que ya tiene", "La app calcula el total, la cuota y las fechas antes de guardar."],
  ["Entregue la base a cada cobrador", "Queda en la caja del cobrador, y desde ahí se cuadra todo el día."],
  ["Al final del día, cierre la caja de cada cobrador", "Cuente el dinero y escríbalo. Solo el dueño cierra cajas."],
  ["Revise las métricas", "Recaudo, mora y ganancia, por cobrador y por ruta, cuando quiera."],
];

const collector: [string, string][] = [
  ["Instale la app y entre con su usuario", "La primera vez necesita internet para descargar su ruta."],
  ["Abra «Cobros de hoy»", "Primero los que están en mora, después los que pagan hoy."],
  ["Toque al cliente y «Registrar pago»", "Abono, cuota completa o adelanto; en efectivo, Nequi o transferencia."],
  ["Use «Nuevo» para prestar o anotar gastos", "Cliente nuevo, préstamo, renovación, gasolina o almuerzo."],
  ["Al final del día, entregue el efectivo", "El dueño cuenta el dinero y cierra su caja. La app muestra si cuadra."],
];

const planItems = [
  "Cobradores, rutas y clientes ilimitados",
  "App para el cobrador y para el dueño",
  "Funciona sin señal y sincroniza sola",
  "Base de capital, sueldos, métricas, caja y cierre de cada cobrador",
  "Copia de seguridad cifrada todas las noches",
  "Todas las actualizaciones",
  "Le ayudamos a cargar los clientes que ya tiene",
  "Soporte por WhatsApp",
];

const faq: [string, string][] = [
  ["¿Qué pasa si el cobrador no tiene señal?", "Sigue trabajando normal: pagos, préstamos, clientes nuevos y gastos se guardan en el celular. El ícono de la nube muestra cuántas operaciones faltan por enviar. Cuando vuelve la señal se envían solas, en orden y sin duplicados."],
  ["¿El cobrador puede borrar o cambiar un pago?", "No. El cobrador no puede cambiar ni borrar pagos. El dueño puede anular un pago con su motivo, y queda tachado. Si el pago fue un error, el dueño puede eliminarlo: desaparece del crédito y de la caja."],
  ["¿Un cobrador puede ver los clientes de otro?", "No. Cada cobrador ve solo los clientes de su ruta. Si usted le cambia la ruta, los datos de la ruta anterior se borran de su celular."],
  ["¿Si se pierde o se daña el celular, se pierde la información?", "No, la información está en el servidor. Solo se perdería lo que el cobrador registró sin señal y no alcanzó a enviar. Cambie la clave del cobrador e instale la app en el celular nuevo."],
  ["¿Cómo se calculan los intereses?", "Usted elige por crédito: interés fijo sobre el capital (por ejemplo, $ 100.000 al 20 % = $ 120.000 en 24 cuotas) o interés sobre saldo con cuota fija. La app muestra el total, la cuota y las fechas antes de guardar. La mora no cobra recargos: se acumula el valor de las cuotas atrasadas. Si el crédito se vence sin pagarse completo, cada periodo siguiente (día, semana, quincena o mes, según el crédito) suma el interés de un periodo sobre el capital que falta, hasta que se pague."],
  ["¿Mis datos están seguros?", "Las conexiones van cifradas, los datos de cada negocio están separados de los demás en el servidor y cada noche se hace una copia de seguridad cifrada fuera del servidor. Lea la política de tratamiento de datos."],
  ["¿Puedo borrar mis datos?", "Sí, usted decide. Desde «Mi perfil», el dueño puede dejar el negocio como nuevo (borra clientes, créditos, cajas, rutas y las cuentas del equipo) o eliminar su cuenta con todos los datos del servidor. Pide su clave y una confirmación escrita. Las copias de seguridad cifradas que ya existían se borran solas en 30 días."],
  ["¿Por qué no está en la Play Store?", "Se distribuye directamente para dar soporte personalizado a cada negocio. Por eso Android puede mostrar un aviso al instalarla."],
];

const installAndroid: [string, string][] = [
  ["Descargue el archivo desde el celular", "Toque «Descargar APK» en esta página."],
  ["Ábralo desde las notificaciones o la carpeta Descargas", "Si el celular pregunta, permita «Instalar apps desconocidas» para el navegador."],
  ["Si aparece un aviso de Play Protect, toque «Instalar de todos modos»", "Sale porque la app no se distribuye por Play Store, sino directamente desde aquí."],
  ["Abra Financial Security y entre con su usuario", "Para actualizar, descargue la versión nueva e instálela encima: no se pierde nada."],
];

const installWindows: [string, string][] = [
  ["Descargue el instalador en el computador", "Toque «Descargar instalador» en esta página."],
  ["Ábralo desde la carpeta Descargas", "Si Windows muestra «Windows protegió su PC», toque «Más información» y luego «Ejecutar de todas formas». Sale porque el programa se distribuye directamente desde aquí."],
  ["Siga los pasos del instalador", "Crea un acceso directo en el menú Inicio y, si lo desea, en el escritorio."],
  ["Abra Financial Security y entre con su usuario", "Para actualizar, descargue el instalador nuevo y ejecútelo: no se pierde nada."],
];

function Steps({ items }: { items: [string, string][] }) {
  return (
    <ol className="mt-6 space-y-0">
      {items.map(([t, d], i) => (
        <li key={t} className="grid grid-cols-[2.2rem_1fr] gap-3 border-t border-[#d5e5dc] py-4">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#0B6E4F] text-[0.8rem] font-bold text-white">{i + 1}</span>
          <div>
            <p className="font-semibold">{t}</p>
            <p className="mt-0.5 text-[0.93rem] text-[#4b5d55]">{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Vista de ejemplo de la app (datos ficticios). */
function PhoneMock() {
  const rows: [string, string, string, boolean][] = [
    ["Rosa Martínez", "Mora: $ 36.000 · 3 días", "$ 48.000", true],
    ["Jorge Ramírez", "El Prado", "$ 15.000", false],
    ["Luz Dary Gómez", "Centro", "$ 20.000", false],
    ["Andrés Pineda", "San José", "$ 12.000", false],
  ];
  return (
    <figure className="mx-auto w-full max-w-[20rem]">
      <div className="rounded-[2.2rem] border-[10px] border-[#16211d] bg-[#F5F8F6] p-4 shadow-2xl shadow-[#0B6E4F]/25">
        <div className="flex items-center justify-between">
          <p className="font-bold">Cobros de hoy</p>
          <span className="rounded-full bg-[#E6F2EC] px-2 py-0.5 text-[0.7rem] font-semibold text-[#0B6E4F]">Al día</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            ["Cobrado hoy", "$ 486.000"],
            ["Cuotas de hoy", "$ 612.000"],
            ["Clientes", "23"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-white p-2 shadow-sm">
              <p className="text-[0.6rem] text-[#4b5d55]">{k}</p>
              <p className="text-[0.82rem] font-bold">{v}</p>
            </div>
          ))}
        </div>
        <ul className="mt-3 space-y-2">
          {rows.map(([n, s, v, late]) => (
            <li key={n} className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-sm">
              <span className={`flex size-8 items-center justify-center rounded-full text-[0.8rem] font-bold ${late ? "bg-[#f9dedc] text-[#b3261e]" : "bg-[#E6F2EC] text-[#0B6E4F]"}`}>{n[0]}</span>
              <span className="flex-1">
                <span className="block text-[0.8rem] font-semibold">{n}</span>
                <span className={`block text-[0.68rem] ${late ? "text-[#b3261e]" : "text-[#4b5d55]"}`}>{s}</span>
              </span>
              <span className="text-[0.8rem] font-bold">{v}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-xl bg-[#0B6E4F] px-3 py-2 text-center text-[0.72rem] font-semibold text-white">Pago de $ 15.000 guardado en el celular</p>
      </div>
      <figcaption className="mt-3 text-center text-[0.8rem] text-[#4b5d55]">Así trabaja el cobrador, con o sin señal. Datos de ejemplo.</figcaption>
    </figure>
  );
}

function Download_({ title, req, file, sha, label }: { title: string; req: string; file: string; sha: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#d5e5dc] bg-white p-6">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-1 text-[0.92rem] text-[#4b5d55]">
        Versión {financial.version} · {req}.
      </p>
      <a href={`${financial.downloadsBase}/${file}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B6E4F] px-5 py-2.5 font-semibold text-white hover:bg-[#09573f]">
        <Download aria-hidden="true" className="size-4" /> {label}
      </a>
      <p className="mt-4 text-[0.75rem] text-[#4b5d55]">Huella SHA-256 del archivo:</p>
      <p className="mt-1 break-all font-mono text-[0.72rem] text-[#16211d]">{sha}</p>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Financial Security",
          operatingSystem: "Android 7+, Windows 10/11",
          applicationCategory: "FinanceApplication",
          softwareVersion: financial.version,
          offers: { "@type": "Offer", price: financial.priceMonth, priceCurrency: "COP" },
          publisher: { "@type": "Organization", name: company.legalName, url: site.url },
        }}
      />
      <FinancialBar />
      <div className="bg-[#F5F8F6] font-[family-name:var(--font-sans)] text-[#16211d]">
        {/* Portada */}
        <section className="border-b border-[#d5e5dc]">
          <div className="sx-wrap grid items-center gap-14 py-16 md:py-24 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="inline-flex rounded-full bg-[#E6F2EC] px-3 py-1 text-[0.82rem] font-semibold text-[#0B6E4F]">App de cobros para prestamistas</p>
              <h1 className="mt-6 font-[family-name:var(--font-grotesk)] text-[clamp(2.4rem,1.4rem+3.8vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                Sus cobros al día, sin cuadernos y <span className="text-[#0B6E4F]">sin perder un peso.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-[#4b5d55]">
                El cobrador registra cada pago en el celular, aunque no tenga señal. Usted ve en el computador cuánto se cobró, cuánto está en mora y
                cuánto está ganando.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#descargar" className="inline-flex items-center gap-2 rounded-full bg-[#0B6E4F] px-6 py-3 font-semibold text-white hover:bg-[#09573f]">
                  <Download aria-hidden="true" className="size-4" /> Descargar para Android
                </a>
                <a href="#como-funciona" className="inline-flex rounded-full border border-[#0B6E4F] px-6 py-3 font-semibold text-[#0B6E4F] hover:bg-[#E6F2EC]">
                  Ver cómo funciona
                </a>
              </div>
              <p className="mt-7 text-[0.88rem] text-[#4b5d55]">Créditos diarios, semanales, quincenales y mensuales · Funciona sin internet · Hecho en Colombia</p>
            </div>
            <div className="lg:col-span-5">
              <PhoneMock />
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section id="como-funciona" className="scroll-mt-32 py-16 md:py-24">
          <div className="sx-wrap">
            <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em]">Cómo funciona</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4b5d55]">
              Tres partes conectadas. El cobrador trabaja en la calle con el celular, la información llega a un servidor seguro y usted la ve desde la
              oficina.
            </p>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {parts.map((p) => (
                <li key={p.title} className="rounded-2xl border border-[#d5e5dc] bg-white p-7">
                  <p.icon aria-hidden="true" className="size-7 text-[#0B6E4F]" />
                  <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-[#4b5d55]">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Lo que hace */}
        <section id="funciones" className="scroll-mt-32 border-y border-[#d5e5dc] bg-white py-16 md:py-24">
          <div className="sx-wrap">
            <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em]">Lo que hace</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4b5d55]">Pensada para el cobro diario de verdad: abonos, mora, renovaciones y la caja del cobrador.</p>
            <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {features.map(([t, d]) => (
                <div key={t} className="border-l-[3px] border-[#E9B949] pl-5">
                  <dt className="text-lg font-bold">{t}</dt>
                  <dd className="mt-1.5 text-[#4b5d55]">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Cómo se usa */}
        <section id="uso" className="scroll-mt-32 py-16 md:py-24">
          <div className="sx-wrap">
            <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em]">Cómo se usa</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4b5d55]">Empezar toma unos minutos. Nosotros creamos su negocio y su usuario de dueño.</p>
            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold">El dueño</h3>
                <Steps items={owner} />
              </div>
              <div>
                <h3 className="text-xl font-bold">El cobrador</h3>
                <Steps items={collector} />
              </div>
            </div>
          </div>
        </section>

        {/* Precio */}
        <section id="precio" className="scroll-mt-32 bg-[#0B6E4F] py-16 text-white md:py-24">
          <div className="sx-wrap grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em]">Un solo plan, todo incluido</h2>
              <p className="mt-4 text-[1.05rem] text-white/80">Sin límites de cobradores, rutas ni clientes. Sin costos escondidos.</p>
              <p className="mt-8 font-[family-name:var(--font-grotesk)] text-[3.2rem] font-semibold leading-none tracking-[-0.04em]">
                {formatCop(financial.priceMonth)} <span className="text-lg font-medium text-white/80">al mes</span>
              </p>
              <p className="mt-3 text-[#E9B949]">o {formatCop(financial.priceYear)} al año: dos meses gratis</p>
              <a href={wa("Hola, quiero contratar Financial Security")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-[#E9B949] px-6 py-3 font-semibold text-[#16211d] hover:bg-[#f1ca6b]">
                Quiero contratarlo
              </a>
            </div>
            <ul className="grid gap-3 self-center sm:grid-cols-2 lg:col-span-7">
              {planItems.map((i) => (
                <li key={i} className="flex gap-3 rounded-xl bg-white/10 p-4">
                  <span aria-hidden="true" className="font-bold text-[#E9B949]">✓</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Descargar */}
        <section id="descargar" className="scroll-mt-32 py-16 md:py-24">
          <div className="sx-wrap">
            <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em]">Descargar</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4b5d55]">
              La misma app sirve para el cobrador y para el dueño: cada uno ve lo suyo según su usuario. Para usarla necesita un negocio activo.{" "}
              <a href={wa("Hola, quiero información sobre Financial Security")} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0B6E4F] underline underline-offset-4">
                Escríbanos para activarlo.
              </a>
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Download_ title="Android" req={financial.android.req} file={financial.android.file} sha={financial.android.sha256} label="Descargar APK" />
              <Download_ title="Windows" req={`Para el computador del dueño. ${financial.windows.req}`} file={financial.windows.file} sha={financial.windows.sha256} label="Descargar instalador" />
            </div>
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="text-xl font-bold">Cómo instalar en Android</h3>
                <Steps items={installAndroid} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Cómo instalar en Windows</h3>
                <Steps items={installWindows} />
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas */}
        <section id="preguntas" className="scroll-mt-32 border-t border-[#d5e5dc] bg-white py-16 md:py-24">
          <div className="sx-wrap grid gap-12 lg:grid-cols-12">
            <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(2rem,1.4rem+2vw,3rem)] font-semibold tracking-[-0.035em] lg:col-span-4">Preguntas frecuentes</h2>
            <div className="border-t border-[#d5e5dc] lg:col-span-8">
              {faq.map(([q, a]) => (
                <details key={q} className="group border-b border-[#d5e5dc]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[1.08rem] font-semibold">{q}</h3>
                    <Plus aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#0B6E4F] transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="pb-6 pr-10 text-[#4b5d55]">
                    {a}
                    {q.startsWith("¿Mis datos") && (
                      <>
                        {" "}
                        <Link href="/aplicaciones/financial-security/politica-de-datos/" className="font-semibold text-[#0B6E4F] underline underline-offset-4">
                          Ver la política.
                        </Link>
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="border-t border-[#d5e5dc] py-16 md:py-20">
          <div className="sx-wrap flex flex-col items-start justify-between gap-8 rounded-3xl bg-[#E6F2EC] p-8 md:flex-row md:items-center md:p-12">
            <div>
              <h2 className="font-[family-name:var(--font-grotesk)] text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)] font-semibold tracking-[-0.035em]">¿Quiere probarla en su negocio?</h2>
              <p className="mt-3 max-w-xl text-[#4b5d55]">Escríbanos y activamos su negocio, le creamos el usuario de dueño y le ayudamos a cargar sus clientes.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={wa("Hola, quiero información sobre Financial Security")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0B6E4F] px-6 py-3 font-semibold text-white hover:bg-[#09573f]">
                WhatsApp
              </a>
              <a href={`mailto:${company.email}?subject=Financial%20Security`} className="rounded-full border border-[#0B6E4F] px-6 py-3 font-semibold text-[#0B6E4F]">
                {company.email}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
