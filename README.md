# MahalliyBaza <!-- omit in toc -->

Firebasega uslubidagi, offalyn, mahalliy ma'lumotlar bazasi.

MahalliyBaza sizga Firebase uslubidagi sodda, kuchli, foydalanuvchi brauzerida saqlanadigan (IndexedDB ma'lumotlar bazasida) oflayn ma'lumotlar bazasini taqdim etadi.

Siz xohlagancha ma'lumotlar bazalarini yaratishingiz mumkin.

Ma'lumotlar bazalari To'plamlar va Hujjatlarga birlashtirilgan (xuddi Firebase Cloud Firestore kabi).

- **Ma'lumotlar bazalarida to'plamlar** mavjud (misol: `foydalanuvchilar`)
- **To'plamlarda hujjatlar** mavjud (misol: `{ id: 1, ism: 'Otabek', age: 19 }`

MahalliyBaza [LocalForage](https://github.com/localForage/localForage) yordamida tuzilgan.

## Mundarija <!-- omit in toc -->

- [Ishni Boshlash](#ishni-boshlash)
  - [O'rnatish va ishga tushirish](#ornatish-va-ishga-tushirish)
    - [Script tegi yordamida](#script-tegi-yordamida)
    - [NPM bilan](#npm-bilan)
    - [NuxtJS bilan](#nuxtjs-bilan)
- [Video Darslik](#video-darslik)
- [Qisqa Kirish](#qisqa-kirish)
- [Ma'lumot Qo'shish](#malumot-qoshish)
  - [To'plamga hujjat qo'shish](#toplamga-hujjat-qoshish)
  - [Hujjatni yangilash](#hujjatni-yangilash)
  - [Hujjatni yangilash (ustiga yozish)](#hujjatni-yangilash-ustiga-yozish)
  - [To'plamni yangilash (ustiga yozish)](#toplamni-yangilash-ustiga-yozish)
- [Ma'lumotni olish](#malumotni-olish)
  - [To'plamni olish](#toplamni-olish)
  - [To'plamni tartiblash](#toplamni-tartiblash)
  - [To'plamni cheklash](#toplamni-checklash)
  - [Hujjatni olish](#hujjatni-olish)
- [Ma'lumotni o'chirish](#malumotni-ochirish)
  - [Hujjatni o'chirish](#hujjatni-ochirish)
  - [To'plamni o'chirish](#toplamni-ochirish)
  - [Ma'lumotlar bazasini o'chirish](#malumotlar-bazasini-ochirish)
- [Kalitlardan yuqori darajada foydalanish](#kalitlardan-yuqori-darajada-foydalanish)
  - [Hujjat qo'shish va o'z kalitingizni kiritish](#hujjat-qoshish-va-oz-kalitingizni-kiritish)
  - [Kalitlarni o'z ichiga olgan to'plamni yangilash (ustiga yozish)](#kalitlarni-oz-ichiga-olgan-toplamni-yangilash-ustiga-yozish)
  - [Hujjatni kalit bilan olish, yangilash, yangilash (qayta yozish) yoki o'chirish (hujjat mezonlari o'rniga)](#hujjatni-kalit-bilan-olish-yangilash-yangilash-qayta-yozish-yoki-ochirish-hujjat-mezonlari-orniga))
  - [To'plamni olish va kalitlarni ma'lumotlar bilan birga qaytarish.](#toplamni-olish-va-kalitlarni-malumotlar-bilan-birga-qaytarish)
- [Promiselar bilan ishlash](#promiselar-bilan-ishlash)
  - [Hujjatni qo'shib, keyin biror narsa qilish](#hujjatni-qoshib-keyin-biror-narsa-qilish)
  - [Hujjatni yangilab, keyin biron bir ishni bajarish](#hujjatni-yangilab-keyin-biron-bir-ishni-bajarish)
  - [Hujjatni yangilab (ustiga yozib), keyin biror narsa qilish](#hujjatni-yangilab-ustiga-yozib-keyin-biror-narsa-qilish)
  - [Hujjatni o'chirib tashlab, keyin biror narsa qilish](#hujjatni-ochirib-tashlab-keyin-biror-narsa-qilish)
  - [To'plamni o'chirib tashlab, keyin biror narsa qilish](#toplamni-ochirib-tashlab-keyin-biror-narsa-qilish)
  - [Ma'lumotlar bazasini o'chirib tashlab, keyin biror narsa qilish](#malumotlar-bazasini-ochirib-tashlab-keyin-biror-narsa-qilish)
- [Async / Await](#async--await)
  - [Hujjat qo'shish (Async Await bilan)](#hujjat-qoshish-async-await-bilan)
  - [Hujjatlarni yangilash (Async Await bilan)](#hujjatlarni-yangilash-async-await-bilan)
  - [Hujjatlarni yangilash (ustiga yozish, Async Await bilan)](#hujjatlarni-yangilash-ustiga-yozish-async-await-bilan))
  - [To'plamni olish va xatolarni ushlash (Async Await bilan)](#toplamni-olish-va-xatolarni-ushlash-async-await-bilan))
- [Sozlash](#sozlash)
  - [Consoledagi Loglarni o'chirish](#consoledagi-loglarni-ochirish)
- [Playground](#playground)


## Ishni Boshlash

### O'rnatish va ishga tushirish

#### Script tegi yordamida
```html
<script src="https://unpkg.com/mahalliybaza/dist/mahalliybaza.dev.js"></script>

<script>
  let db = new MahalliyBaza('db')
</script>
```

Or, use the minified, production version:
```html
<script src="https://unpkg.com/mahalliybaza/dist/mahalliybaza.min.js"></script>

<script>
  let db = new MahalliyBaza('db')
</script>
```


#### NPM bilan

```
npm install mahalliybaza --save
```

```javascript
import MahalliyBaza from 'mahalliybaza'

let db = new MahalliyBaza('db')
```

#### NuxtJS bilan
```
npm install mahalliybaza
```

```javascript
// plugins/mahalliybaza.js

import MahalliyBaza from 'mahalliybaza'
let db = new MahalliyBaza('db')
export default (context,inject) => {
  inject('db', db)
}
```

```javascript
// nuxt.config.js

export default {
  ...
  plugins: [
    { src: "~/plugins/MahalliyBaza", mode: "client" }
  ],
  ...
}
```

```html
<!-- pages/index.vue -->

<script>
export default {
  head: {
    title: 'Nuxt Blog - Home'
  },
  mounted() {
    this.$db.collection('users').add({
      id: 1,
      name: 'Bill',
      age: 47
    })
  }
}
</script>
```

## Video Darslik

<a href="https://www.youtube.com/watch?v=KJnupY2HPCg" target="_blank">Watch my Video Introduction to MahalliyBaza</a>, including how to get started:

<a href="https://www.youtube.com/watch?v=KJnupY2HPCg" target="_blank">
  <img src="images/indexeddb-finally-an-easy-way-with-localbase-link.png">
</a>

## Qisqa Kirish

Get started by adding a document to a collection. Just specify the collection name with the `collection` method (the collection will be created automatically) then specify the document you want to add with the `add` method: 
```javascript
db.collection('users').add({
  id: 1,
  name: 'Bill',
  age: 47
})
```
Simples!

Once you've added some data to a collection, you can get the whole collection with the `get` method:
```javascript
db.collection('users').get().then(users => {
  console.log(users)
})

//  [
//    { id: 1, name: 'Bill', age: 47 },
//    { id: 2, name: 'Paul', age: 34 }
//  ]
```

## Ma'lumot Qo'shish

### To'plamga hujjat qo'shish

Add a new document to a collection.

```javascript
db.collection('users').add({
  id: 1,
  name: 'Bill',
  age: 47
})
```

### Hujjatni yangilash

Update an existing document. Just pass an object with a field and value (usually id) to match the document. Then pass in only the fields you want to update with the `update` method.

```javascript
db.collection('users').doc({ id: 1 }).update({
  name: 'William'
})

//  [
//    { id: 1, name: 'William', age: 47 },
//    { id: 2, name: 'Paul', age: 34 }
//  ]
```

**Note:** if more than one document is matched by your criteria e.g `.doc({ gender: 'male' })` then **all** matched documents will be updated. 

### Hujjatni yangilash (ustiga yozish)

Overwrite an existing document. This will completely overwrite the selected document, so all required fields should be passed into the `set` method.

```javascript
db.collection('users').doc({ id: 2 }).set({
  id: 4, 
  name: 'Pauline',
  age: 27
})

//  [
//    { id: 1, name: 'William', age: 47 },
//    { id: 4, name: 'Pauline', age: 27 }
//  ]
```

**Note:** if more than one document is matched by your criteria e.g `.doc({ gender: 'male' })` then **all** matched documents will be overwritten. 

### To'plamni yangilash (ustiga yozish)

Overwrite an entire collection with an array of documents. This will completely overwrite the selected collection.

```javascript
db.collection('users')
  .set([
    {
      id: 1,
      name: 'Bill',
      age: 48
    },
    {
      id: 2, 
      name: 'Paul',
      age: 28
    }
  ])

//  [
//    { id: 1, name: 'Bill', age: 48 },
//    { id: 2, name: 'Paul', age: 28 }
//  ]
```

## Ma'lumotni olish

### To'plamni olish

Get all items from a collection. The collection will be returned in an array.

```javascript
db.collection('users').get().then(users => {
  console.log(users)
})

//  [
//    { id: 1, name: 'Bill', age: 47 },
//    { id: 2, name: 'Paul', age: 34 }
//  ]
```

### To'plamni tartiblash

Get a collection and order it by a particular field (ascending).

```javascript
db.collection('users').orderBy('age').get().then(users => {
  console.log('users: ', users)
})

//  [
//    { id: 2, name: 'Paul', age: 34 },
//    { id: 1, name: 'Bill', age: 47 }
//  ]
```

Get a collection and order it by a particular field (descending).

```javascript
db.collection('users').orderBy('name', 'desc').get().then(users => {
  console.log('users: ', users)
})

//  [
//    { id: 2, name: 'Paul', age: 34 },
//    { id: 1, name: 'Bill', age: 47 }
//  ]
```

### To'plamni checklash

Order a collection & limit it to a particular number of documents.

```javascript
db.collection('users').orderBy('name', 'desc').limit(1).get().then(users => {
  console.log('users: ', users)
})

//  [
//    { id: 2, name: 'Paul', age: 34 }
//  ]
```


### Hujjatni olish

Get an individual document from a collection

```javascript
db.collection('users').doc({ id: 1 }).get().then(document => {
  console.log(document)
})

// { id: 1, name: 'Bill', age: 47 }
```

## Ma'lumotni o'chirish

### Hujjatni o'chirish
Delete a document from a collection.
```javascript
db.collection('users').doc({ id: 1 }).delete()

//  [
//    { id: 2, name: 'Paul', age: 34 }
//  ]
```

**Note:** if more than one document is matched by your criteria e.g `.doc({ gender: 'male' })` then **all** matched documents will be deleted. 

### To'plamni o'chirish
Delete a collection and all documents contained in it.
```javascript
db.collection('users').delete()
```

### Ma'lumotlar bazasini o'chirish
Delete a database and all collections contained in it.
```javascript
db.delete()
```

## Kalitlardan yuqori darajada foydalanish

Your documents are stored in an IndexedDB store with keys:

![IndexedDB Store - Keys](images/indexed-db-keys.png)

By default, MahalliyBaza generates random, ordered, unique IDs for these keys.

But you might want to take control of these keys. For example, you might want to:
- Specify your own key when you add a document
- Use the key for selecting a document (when getting, updating, setting or deleting a document) instead of using some document criteria
- Return all of the keys as well as the document fields, when getting a collection, e.g.
```javascript
[
  {
    key: 'mykey-2',
    data: {
      { id: 2, name: 'Paul', age: 34 }
    }
  },
  {
    key: 'mykey-1',
    data: {
      { id: 1, name: 'Bill', age: 47 }
    }
  }
]
```

You can do all this with MahalliyBaza:

### Hujjat qo'shish va o'z kalitingizni kiritish

After specifying your document data, pass in a key (to be used by the IndexedDB store) as a second parameter:

```javascript
db.collection('users').add({
  id: 1,
  name: 'Bill',
  age: 47
}, 'mykey-1')
```

Or, you can just use the `set` method:

```javascript
db.collection('users').doc('mykey-1').set({
  id: 1, 
  name: 'Bill',
  age: 47
})
```

Which would look like this in the IndexedDB:

![IndexedDB Store - Own Keys](images/indexed-db-own-keys.png)

### Kalitlarni o'z ichiga olgan to'plamni yangilash (ustiga yozish)

Overwrite an entire collection with an array of documents, and specify a key for each document. Make sure you pass in the `{ keys: true }` option. This will completely overwrite the selected collection.

```javascript
db.collection('users')
  .set([
    {
      id: 1,
      name: 'Bill',
      age: 48,
      _key: 'mykey-1'
    },
    {
      id: 2, 
      name: 'Paul',
      age: 28,
      _key: 'mykey-2'
    }
  ], { keys: true })
```

### Hujjatni kalit bilan olish, yangilash, yangilash (qayta yozish) yoki o'chirish (hujjat mezonlari o'rniga)

When selecting a document with the `doc` method, instead of passing in an object with a field name and value, just pass in a string (or integer) with your key:
```javascript
// get document by key
db.collection('users').doc('mykey-1').get().then(document => {
  console.log(document)
})

// update document by key
db.collection('users').doc('mykey-1').update({
  name: 'William'
})

// set document by key
db.collection('users').doc('mykey-2').set({
  id: 4, 
  name: 'Pauline',
  age: 27
})

// delete a document by key
db.collection('users').doc('mykey-1').delete()
```


### To'plamni olish va kalitlarni ma'lumotlar bilan birga qaytarish.

When getting a collection, just pass `{ keys: true }` into the `get` method:

```javascript
db.collection('users').orderBy('name', 'desc').get({ keys: true }).then(users => {
  console.log('users: ', users)
})

//  [
//    {
//      key: 'mykey-2',
//      data: {
//        { id: 2, name: 'Paul', age: 34 }
//      }
//    },
//    {
//      key: 'mykey-1',
//      data: {
//        { id: 1, name: 'Bill', age: 47 }
//      }
//    }
//  ]
```

## Promiselar bilan ishlash

You can add promises to all operations and do something when it's successful, or when there's an error.

### Hujjatni qo'shib, keyin biror narsa qilish

```javascript
db.collection('users')
  .add({
    id: 1,
    name: 'Bill',
    age: 47
  }, 'mykey-1')
  .then(response => {
    console.log('Add successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })

// you can test the error by passing a 
// string, number or boolean into the 
// .add() method, instead of an object
```

### Hujjatni yangilab, keyin biron bir ishni bajarish

```javascript
db.collection('users')
  .doc({ id: 1 })
  .update({
    name: 'William'
  })
  .then(response => {
    console.log('Update successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })
  
// you can test the error by passing nothing
// into the update() method
```

### Hujjatni yangilab (ustiga yozib), keyin biror narsa qilish

```javascript
db.collection('users')
  .doc({ id: 1 })
  .set({
    id: 1, 
    name: 'Pauline',
    age: 27
  })
  .then(response => {
    console.log('Set successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })

// you can test the error by passing nothing
// into the set() method
```

### Hujjatni o'chirib tashlab, keyin biror narsa qilish

```javascript
db.collection('users')
  .doc({ id: 1 })
  .delete()
  .then(response => {
    console.log('Delete successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })

  // you can test the error by passing nothing
  // into the doc() method
```

### To'plamni o'chirib tashlab, keyin biror narsa qilish

```javascript
db.collection('users')
  .delete()
  .then(response => {
    console.log('Collection deleted, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else')
  })
  
// you can test the error by passing nothing
// into the collection() method
```

### Ma'lumotlar bazasini o'chirib tashlab, keyin biror narsa qilish

```javascript
db.delete()
  .then(response => {
    console.log('Database deleted, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })
  
// note: sometimes when you delete a
// database, the change won't show up
// in Chrome Dev tools til you reload
// the page
```

## Async / Await

You can also use Async / Await with all operations

### Hujjat qo'shish (Async Await bilan)

```javascript
async function addUsers() {
  await db.collection('users').add({
    id: 1,
    name: 'Bill',
    age: 47
  })
  console.log('first user added')
  await db.collection('users').add({
    id: 2,
    name: 'Paul',
    age: 34
  })
  console.log('second user added')
}
addUsers()
```

### Hujjatlarni yangilash (Async Await bilan)

```javascript
async function updateUser() {
  let result = await db.collection('users')
    .doc({ id: 1 })
    .update({
      name: 'William'
    })
  console.log(result)
}
updateUser()
```

### Hujjatlarni yangilash (ustiga yozish, Async Await bilan)

```javascript
async function setUser() {
  let result = await db.collection('users')
    .doc({ id: 2 })
    .set({
      id: 4, 
      name: 'Pauline',
      age: 27
    })
    console.log(result)
}
setUser()
```

### To'plamni olish va xatolarni ushlash (Async Await bilan)

```javascript
async function getUsers() {
  try {
    let users = await db.collection('users')
      .orderBy('age')
      .get()
    console.log('users: ', users)
  }
  catch(error) {
    console.log('error: ', error)
  }
}
getUsers()

// test the error by passing nothing into collection()
```

## Sozlash

### Consoledagi Loglarni o'chirish

By default, when in development, MahalliyBaza will fire out gorgeously labelled debug logs like this:

![Gorgeous, Labelled Logs](images/gorgeous-logs.png)

You can disable these logs by setting `db.config.debug` to `false`.

It's best to do this after you initialize the database, and before you do anything else:
```javascript
import MahalliyBaza from 'mahalliybaza'
let db = new MahalliyBaza('db')

db.config.debug = false

// now do some stuff with the motherflipping db yo
```




## Playground

[Playground](https://github.com/dannyconnell/mahalliybaza-playground) is an app for playing around with MahalliyBaza and all the available methods.

It contains a bunch of different code snippets (for adding, updating, setting and getting) data to/from a MahalliyBaza database.

You can launch these code snippets (and edit them if you like) in the browser and observe the result in the IndexedDB database and in the console.

![IndexedDB Store - Own Keys](images/mahalliybaza-playground.png)

[Playground and launch instructions](https://github.com/dannyconnell/mahalliybaza-playground)