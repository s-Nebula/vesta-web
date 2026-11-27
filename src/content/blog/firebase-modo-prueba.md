---
title: Firebase en modo de prueba: la regla que deja tu base de datos abierta
description: Muchas apps nuevas salen a producción con las reglas de Firestore que vienen por defecto, o con reglas que solo piden iniciar sesión. Por qué eso no protege los datos de tus usuarios y cómo escribir reglas que sí.
date: 2026-11-26
tags: Startups, Firebase
---

Firebase es una de las formas más rápidas de construir una app: autenticación, base de datos y almacenamiento sin montar un servidor. Esa velocidad tiene un costo escondido. En Firebase **no hay un backend que valide cada petición**: la app habla directamente con la base de datos, y lo único que decide quién puede leer o escribir son las **reglas de seguridad**.

Si las reglas están mal, cualquier persona puede leer o modificar los datos de todos tus usuarios, sin necesidad de tu app.

## El modo de prueba

Al crear una base de datos de Firestore en modo de prueba, Firebase pone una regla parecida a esta:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 12, 26);
    }
  }
}
```

Hasta esa fecha, **cualquiera** puede leer y escribir todo. Muchas apps llegan a producción así, y cuando la fecha vence alguien "arregla" el error cambiando la fecha por una más lejana.

## "Solo usuarios autenticados" tampoco basta

La corrección más común es esta:

```
allow read, write: if request.auth != null;
```

Parece segura, pero en la mayoría de las apps **cualquiera puede crear una cuenta**. Basta registrarse para leer los documentos de todos los demás usuarios. Además, la configuración de Firebase de tu app (incluida la clave de API) está dentro de tu web o tu APK: un atacante no necesita tu app para hablar con tu base de datos.

## Reglas que sí protegen

La regla debe responder a la pregunta: **¿este usuario es el dueño de este documento?**

```
match /usuarios/{uid} {
  allow read, update: if request.auth != null && request.auth.uid == uid;
  allow create: if request.auth != null && request.auth.uid == uid
                && request.resource.data.keys().hasOnly(['nombre', 'telefono']);
  allow delete: if false;
}
```

Fíjate en tres detalles:

1. **Se compara el usuario con el documento**, no solo se verifica que haya sesión.
2. **Se limita qué campos se pueden escribir**, para que nadie se agregue un campo `rol: "admin"`.
3. **Se niega por defecto** todo lo que no está permitido de forma explícita.

## Otras cosas que revisar

- **Storage** tiene sus propias reglas, separadas de Firestore. Es común proteger la base de datos y dejar abiertas las fotos o los documentos de los usuarios.
- **Realtime Database**, si la usas, también.
- **Cloud Functions** que se llaman por HTTP deben verificar quién las llama.
- **App Check** ayuda a que solo tu app use tu proyecto, pero no reemplaza a las reglas.
- El **emulador de Firebase** permite escribir pruebas automáticas de tus reglas. Úsalo.

## ¿Quieres que las revise?

La [Auditoría de Firebase y nube](/servicios/#firebase) prueba tus reglas con usuarios reales, intentando leer y escribir datos ajenos, y te entrega reglas corregidas listas para copiar. Es lo mismo que se hizo con las reglas de [Vesta](/control-parental/), cuyo backend es [código abierto](https://github.com/s-Nebula/vesta-api).
