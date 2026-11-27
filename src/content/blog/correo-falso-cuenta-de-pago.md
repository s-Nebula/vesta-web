---
title: El correo falso que cambia la cuenta de pago, y cómo evitarlo con SPF, DKIM y DMARC
description: Uno de los fraudes más comunes contra pymes es un correo que parece de un proveedor y pide pagar a una cuenta nueva. Tres registros de tu dominio lo hacen mucho más difícil.
date: 2026-11-26
tags: Correo, Fraude
---

El fraude funciona así: tu contador, tu proveedor o tú mismo reciben un correo que parece legítimo. Mismo nombre, mismo logo, a veces la misma dirección. Dice algo como *"Cambiamos de banco, por favor consigne la factura de este mes a esta nueva cuenta"*. El pago sale, y el dinero no vuelve.

A esto se le llama **compromiso de correo empresarial** (BEC, por sus siglas en inglés). No requiere virus ni conocimientos avanzados: basta con que el correo de tu dominio sea fácil de suplantar.

## Por qué es posible

El correo electrónico se diseñó hace décadas sin verificar quién envía. Por defecto, cualquiera puede mandar un mensaje que diga ser de `facturacion@tunegocio.com`. Para cerrarle la puerta a eso existen tres registros que se configuran en el DNS de tu dominio.

## SPF: quién puede enviar a tu nombre

SPF es una lista de los servidores autorizados para enviar correo de tu dominio. Si usas Google Workspace, se ve así:

```
v=spf1 include:_spf.google.com ~all
```

Si además envías facturas desde tu programa contable o boletines desde otra plataforma, esos servicios también deben estar en la lista.

## DKIM: una firma en cada correo

DKIM agrega una firma digital a cada mensaje que envías. El servidor que lo recibe verifica la firma con una clave pública publicada en tu DNS. Se activa desde el panel de tu proveedor de correo (Google Workspace o Microsoft 365) en pocos minutos.

## DMARC: qué hacer con los correos falsos

DMARC le dice al mundo qué hacer con un correo que dice ser tuyo pero no pasa SPF ni DKIM. Lo recomendable es empezar en modo observación:

```
v=DMARC1; p=none; rua=mailto:dmarc@tunegocio.com
```

Durante unas semanas recibirás reportes de quién envía correo con tu nombre. Cuando confirmes que todos tus envíos legítimos pasan, cambia `p=none` por `p=quarantine` (los falsos van a spam) y luego por `p=reject` (se rechazan).

## Además de la tecnología

Estos registros evitan que suplanten **tu** dominio, pero no que alguien use uno parecido (`tunegoci0.com`) o que roben la contraseña del correo de tu proveedor. Por eso también conviene:

- Confirmar **por teléfono**, a un número que ya tenías, cualquier cambio de cuenta bancaria.
- Activar la **verificación en dos pasos** en todas las cuentas de correo del negocio.
- Desconfiar de la urgencia: *"hoy mismo"*, *"antes del cierre"*, *"no me puedo comunicar"*.

## ¿Tu dominio ya lo tiene?

El [Chequeo Digital Express](/servicios/#express) revisa estos tres registros, entre otras cosas, y te entrega los valores exactos que debes poner. Y si solo quieres saber si estás expuesto, el [diagnóstico gratuito](/servicios/#diagnostico) incluye una revisión de tu correo.
