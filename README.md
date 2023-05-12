# Práctica 12 - Destravate

[![Node.js CI](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/node.js.yml) [![Coveralls](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/coveralls.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/coveralls.yml) [![Sonar-Cloud](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/sonarcloud.yml) [![pages-build-deployment](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct12-destravate-api-groupa/actions/workflows/pages/pages-build-deployment)

## Introducción

El objetivo de esta práctica es implementar un API REST, haciendo uso de Node/Express, que permita llevar a cabo operaciones de creación, lectura, modificación y borrado (Create, Read, Update, Delete - CRUD) de un registro de actividades deportivas.

Podríamos decir que otro objetivo de la práctica es trabajar en grupo de manera conjunta de tal modo que todos aportemos nuestro conocimiento para cumplir con el objetivo, enunciado y requisitos, todo esto gracias a la comunicación adecuada, al trabajo en grupo y también a herramientas muy útiles que vimos en prácticas anteriores como LiveShare para poder estar todos los componentes del grupo trabjando en el código a la vez.

## Desarrollo

A continuación vamos a explicar cada fichero que tenemos implementado en el proyecto:

### Activity.ts

#### Código

```TypeScript
export enum Activity {
  running = 'running',
  cycling = 'cycling',
  hiking = 'hiking',
}
```

Este código define una enumeración llamada ```Activity``` que contiene tres valores posibles: ```running```, ```cycling``` y ```hiking```.

### Challenge.ts

#### Código

```TypeScript
import { Activity } from './Activity.js'
import { UniqueList } from './UniqueList.js'

export interface ChallengeInterface<T = number> {
  name: string
  activity: Activity
  tracks: Array<T>
  users: Array<T>
}

export class Challenge<T = number> implements ChallengeInterface<T> {

  public readonly id: number

  public name: string

  public activity: Activity

  public tracks: UniqueList<T> = new UniqueList<T>()

  public users: UniqueList<T> = new UniqueList<T>()

  constructor(id, name, activity, ...tracks) {
    this.id = id
    this.name = name
    this.activity = activity
    for (const track of tracks) this.tracks.add(track)
  }
}
```

Este código es una definición de una clase llamada ```Challenge``` que implementa una interfaz llamada ```ChallengeInterface```. La clase Challenge tiene cuatro propiedades: ```id```, ```name```, ```activity```, ```tracks``` y ```users```.

La propiedad ```id``` es de solo lectura y se establece en el constructor. La propiedad ```name``` es una cadena que representa el nombre del desafío. La propiedad ```activity``` es un objeto de la clase ```Activity``` que representa la actividad asociada con el desafío. Las propiedades ```tracks``` y ```users``` son matrices de tipo genérico ```T``` que se implementan como objetos de la clase ```UniqueList```.

El constructor de la clase Challenge toma cuatro argumentos: ```id```, ```name```, ```activity``` y ```tracks```. El argumento ```id``` se utiliza para establecer la propiedad ```id``` de solo lectura. El argumento ```name``` se utiliza para establecer la propiedad ```name```. El argumento ```activity``` se utiliza para establecer la propiedad ```activity```. El argumento ```tracks``` es un número variable


### Coordinate.ts

#### Código

```TypeScript
export type Coordinate = {

  lat: number

  lng: number
}
```

Este código define un tipo de dato llamado ```Coordinate``` que representa una coordenada geográfica. El tipo de dato tiene dos propiedades: ```lat``` y ```lng```, que representan la latitud y longitud de la coordenada, respectivamente. Ambas propiedades son de tipo ```number```, lo que significa que deben ser valores numéricos.

### Entry.ts

#### Código

```TypeScript
import { UniqueList } from './UniqueList'

export type Entry<T = number> = {

  date: string

  tracks: UniqueList<T>
}

export type ExtendedEntry<T = number> = Entry<T> & {
  users: UniqueList<T>
  km: number
}
```

Este código define dos tipos de datos: Entry y ExtendedEntry. Ambos tipos tienen una propiedad date que es una cadena de texto y una propiedad tracks que es una lista única de elementos de tipo T.

El tipo ExtendedEntry extiende el tipo Entry y agrega dos nuevas propiedades: users, que es una lista única de elementos de tipo T, y km, que es un número.


### Group.ts

#### Código

```TypeScript
import { Stats } from './Stats.js'
import { UniqueList } from './UniqueList.js'
import { ExtendedEntry } from './Entry.js'

export interface GroupInterface<T = number> {
  name: string
  users: Array<T>
  stats: Stats
  ranking: Array<T>
  tracks: Array<T>
  records: Array<ExtendedEntry<T>>
}

export class Group<T = number> implements GroupInterface<T> {

  public readonly id: number

  public name: string

  public users: UniqueList<T> = new UniqueList<T>()

  public stats: Stats = new Stats()

  public tracks: UniqueList<T> = new UniqueList<T>()

  public records: UniqueList<ExtendedEntry<T>> = new UniqueList<
    ExtendedEntry<T>
  >()

  public constructor(id: number, name: string, ...users: T[]) {
    this.id = id
    this.name = name
    for (const member of users) this.users.add(member)
    this.stats.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }

  public get ranking(): UniqueList<T> {
    const ranking = new UniqueList<T>()
    const distances: { [id: string]: number } = {}
    for (const record of this.records) {
      for (const user of record.users) {
        if (distances[String(user)]) distances[String(user)] += record.km
        else distances[String(user)] = record.km
      }
    }
    const sorted = Object.keys(distances).sort(
      (a, b) => distances[b] - distances[a]
    )
    for (const id of sorted)
      if (this.convertToT(id) && this.users.has(this.convertToT(id) as T))
        ranking.add(this.convertToT(id) as T)
    return ranking
  }

  /* c8 ignore start */
  private convertToT(value: any): T | null {
    if (
      typeof value === 'string' &&
      typeof Number(value) === 'number' &&
      !isNaN(Number(value))
    )
      return Number(value) as T
    return null
  }
  /* c8 ignore stop */
}
```

Este código define una clase llamada Group que implementa la interfaz GroupInterface. La interfaz GroupInterface define una estructura de datos que representa un grupo de usuarios y sus estadísticas de actividad física. La clase Group tiene propiedades como name, users, stats, tracks, records y ranking, que representan el nombre del grupo, la lista de usuarios, las estadísticas de actividad física, las pistas, los registros y la clasificación de los usuarios en función de su actividad física.

La clase Group tiene un constructor que toma un id, un name y una lista de users. El constructor inicializa las propiedades id y name y agrega los usuarios a la lista de usuarios.

La propiedad ranking es una lista de usuarios ordenados por su actividad física. La propiedad records es una lista de registros de actividad física de los usuarios. La propiedad stats es un objeto que contiene las estadísticas de actividad física del grupo.

La clase Group también tiene un método privado llamado convertToT que convierte un valor a un tipo genérico T. Este método se utiliza para convertir los identificadores de usuario de tipo string a un tipo genérico T.


### Models.ts

#### Código

```TypeScript
import { model, Schema } from 'mongoose'

import { Activity } from './Activity.js'

import { TrackInterface } from './Track.js'
import { UserInterface } from './User.js'
import { GroupInterface } from './Group.js'
import { ChallengeInterface } from './Challenge.js'

export const TrackSchema = new Schema<TrackInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  start: {
    type: Object,
    required: true,
  },
  end: {
    type: Object,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  slope: {
    type: Number,
    required: true,
  },
  users: {
    type: Schema.Types.Mixed,
    required: false,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  score: {
    type: Number,
    required: false,
  },
})

export const TrackModel = model<TrackInterface<string>>('Track', TrackSchema)

export const UserSchema = new Schema<UserInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  users: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  groups: {
    type: Schema.Types.Mixed,
    ref: 'Group',
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  tracks: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  challenges: {
    type: Schema.Types.Mixed,
    ref: 'Challenge',
    required: false,
  },
  records: {
    type: Schema.Types.Mixed,
    required: false,
  },
})

export const UserModel = model<UserInterface<string>>('User', UserSchema)

export const GroupSchema = new Schema<GroupInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  stats: {
    type: Array,
    required: false,
  },
  ranking: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
  tracks: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  records: {
    type: Schema.Types.Mixed,
    required: false,
  },
})

export const GroupModel = model<GroupInterface<string>>('Group', GroupSchema)

export const ChallengeSchema = new Schema<ChallengeInterface<string>>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  activity: {
    type: String,
    required: true,
    enum: Object.values(Activity),
  },
  tracks: {
    type: Schema.Types.Mixed,
    ref: 'Track',
    required: false,
  },
  users: {
    type: Schema.Types.Mixed,
    ref: 'User',
    required: false,
  },
})

export const ChallengeModel = model<ChallengeInterface<string>>(
  'Challenge',
  ChallengeSchema
)
```

En este código, se definen cuatro esquemas: Track, User, Group y Challenge. Cada uno de ellos tiene diferentes campos que definen la estructura de los documentos que se almacenarán en la base de datos. Por ejemplo, el esquema Track tiene campos como ```name```, ```start```, ```end```, ```distance```, ```slope```, ```users```, ```activity``` y ```score```.

Cada esquema se utiliza para crear un modelo correspondiente utilizando la función ```model``` de Mongoose. Por ejemplo, el modelo Track se crea utilizando ```TrackModel = model<TrackInterface<string>>('Track', TrackSchema)```.


### Server.ts

#### Código

```TypeScript
import express from 'express'
import { Server as HttpServer } from 'http'
import { connect, disconnect } from 'mongoose'

import { Group } from './Group.js'

import { UniqueList } from './UniqueList.js'
import { ExtendedEntry } from './Entry.js'
import { TrackModel, UserModel, GroupModel, ChallengeModel } from './Models.js'

const routes = [
  '/tracks',
  '/tracks/:id',
  '/users',
  '/users/:id',
  '/groups',
  '/groups/:id',
  '/challenges',
  '/challenges/:id',
]

export class Server {

  private server: HttpServer = new HttpServer()

  public app: express.Application = express()

  /* c8 ignore start */
  public constructor() {
    this.app.use(express.json())
    this.defineGet()
    this.definePost()
    this.defineDelete()
    this.definePatch()
    this.app.all('*', (_, res) => {
      res.status(501).send()
    })
  }

  private defineGet() {
    for (const route of routes) {
      this.app.get(route, (req, res) => {
        this.get(req, res)
          .then(() => {
            console.log('Get request completed')
          })
          .catch((err) => {
            console.log('Error in get request: ' + err)
          })
      })
    }
  }

  private definePost() {
    for (const route of routes) {
      this.app.post(route, (req, res) => {
        this.post(req, res)
          .then(() => {
            console.log('Post request completed')
          })
          .catch((err) => {
            console.log('Error in post request: ' + err)
          })
      })
    }
  }

  private defineDelete() {
    for (const route of routes) {
      this.app.delete(route, (req, res) => {
        this.delete(req, res)
          .then(() => {
            console.log('Delete request completed')
          })
          .catch((err) => {
            console.log('Error in delete request: ' + err)
          })
      })
    }
  }

  private definePatch() {
    for (const route of routes) {
      this.app.patch(route, (req, res) => {
        this.patch(req, res)
          .then(() => {
            console.log('Patch request completed')
          })
          .catch((err) => {
            console.log('Error in patch request: ' + err)
          })
      })
    }
  }

  public start(port: number | string): void {
    this.server = this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }

  /**
   * Shuts down the server
   */
  public stop(): void {
    disconnect()
    this.server.close()
  }
  /* c8 ignore stop */

  private get = async (req: express.Request, res: express.Response) => {
    connect(process.env.MONGODB_URL!)
      .then(() => {
        console.log('Connected to database ' + process.env.MONGODB_URL!)
        let model
        let url = req.url
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id)
          model
            .findById(req.params.id)
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model && req.query.name)
          model
            .find({ name: req.query.name.toString() })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model)
          model
            .find()
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  private post = async (req: express.Request, res: express.Response) => {
    connect(process.env.MONGODB_URL!)
      .then(() => {
        console.log('Connected to database ' + process.env.MONGODB_URL!)
        let document
        const url = req.url
        let body = req.body
        if (url.includes('?'))
          res.status(400).json({ message: 'Bad parameters' })
        try {
          switch (url) {
            case '/tracks':
              document = new TrackModel(body)
              this.createReferencesToTrack(document)
              break
            case '/users':
              document = new UserModel(body)
              this.createReferencesToUser(document)
              break
            case '/groups':
              body = this.updateRanking(body)
              document = new GroupModel(body)
              this.createReferencesToGroup(document)
              break
            case '/challenges':
              document = new ChallengeModel(body)
              this.createReferencesToChallenge(document)
              break
            default:
              break
          }
        } catch (err) {
          res.status(400).json({ message: 'Bad parameters', error: err })
        }
        if (document) {
          document
            .save()
            .then((result) => {
              res.status(201).json({ message: 'Created', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  private createReferencesToTrack(document: any): void {
    UserModel.find({ _id: { $in: document.users } }).then((users) => {
      if (users && document.users && users.length !== document.users.length)
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.users } },
      { $push: { tracks: document._id } },
      { multi: true, runValidators: true }
    )
  }

  private createReferencesToUser(document: any): void {
    TrackModel.find({ _id: { $in: document.tracks } }).then((tracks) => {
      if (tracks && document.tracks && tracks.length !== document.tracks.length)
        throw new Error('Track not found')
    })
    TrackModel.updateMany(
      { _id: { $in: document.tracks } },
      { $push: { users: document._id } },
      { multi: true, runValidators: true }
    )
    ChallengeModel.find({ _id: { $in: document.challenges } }).then(
      (challenges) => {
        if (
          challenges &&
          document.challenges &&
          challenges.length !== document.challenges.length
        )
          throw new Error('Challenge not found')
      }
    )
    ChallengeModel.updateMany(
      { _id: { $in: document.challenges } },
      { $push: { users: document._id } },
      { multi: true, runValidators: true }
    )
    GroupModel.find({ _id: { $in: document.groups } }).then((groups) => {
      if (groups && document.groups && groups.length !== document.groups.length)
        throw new Error('Group not found')
    })
    GroupModel.updateMany(
      { _id: { $in: document.groups } },
      { $push: { users: document._id } },
      { multi: true, runValidators: true }
    )
  }

  private createReferencesToGroup(document: any): void {
    UserModel.find({ _id: { $in: document.users } }).then((users) => {
      if (users && document.users && users.length !== document.users.length)
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.users } },
      { $push: { groups: document._id } },
      { multi: true, runValidators: true }
    )
  }

  private createReferencesToChallenge(document: any): void {
    UserModel.find({ _id: { $in: document.users } }).then((users) => {
      if (users && document.users && users.length !== document.users.length)
        throw new Error('User not found')
    })
    UserModel.updateMany(
      { _id: { $in: document.users } },
      { $push: { challenges: document._id } },
      { multi: true, runValidators: true }
    )
  }

  private delete = async (req: express.Request, res: express.Response) => {
    connect(process.env.MONGODB_URL!)
      .then(() => {
        console.log('Connected to database ' + process.env.MONGODB_URL!)
        let model
        let url = req.url
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id) {
          model
            .deleteOne({ id: parseInt(req.params.id as string) })
            .then((result) => {
              this.deleteReferencesFromUser(req.params.id)
              res.status(200).json({ message: 'Deleted', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else if (model && req.query.name) {
          model
            .findOne({ name: req.query.name })
            .then((result) => {
              if (result) {
                if (model === UserModel)
                  this.deleteReferencesFromUser(result.id)
              }
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
          model
            .deleteOne({ name: req.query.name })
            .then((result) => {
              if (result.deletedCount === 0)
                res.status(404).json({ message: 'Not found' })
              else res.status(200).json({ message: 'Deleted', result: result })
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        } else {
          res.status(400).json({ message: 'Bad parameters' })
        }
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  private deleteReferencesFromUser(id: string): void {
    TrackModel.find({ users: { $in: [id] } }).then((tracks) => {
      tracks.forEach((track) => {
        track.users = new UniqueList<string>(
          ...track.users.filter((user) => user !== id)
        )
        track.save()
      })
    })
    UserModel.find({ users: { $in: [id] } }).then((users) => {
      users.forEach((user) => {
        user.users = new UniqueList<string>(
          ...user.users.filter((friend) => friend !== id)
        )
        user.save()
      })
    })
    GroupModel.find({ users: { $in: [id] } }).then((groups) => {
      groups.forEach((group) => {
        group.users = new UniqueList<string>(
          ...group.users.filter((member) => member !== id)
        )
        group.ranking.splice(group.ranking.indexOf(id), 1)
        group.records.forEach((record) => {
          record.users.splice(record.users.indexOf(id), 1)
        })
      })
    })
    ChallengeModel.find({ users: { $in: [id] } }).then((challenges) => {
      challenges.forEach((challenge) => {
        challenge.users = new UniqueList<string>(
          ...challenge.users.filter((user) => user !== id)
        )
      })
    })
  }

  private patch = async (req: express.Request, res: express.Response) => {
    connect(process.env.MONGODB_URL!)
      .then(() => {
        console.log('Connected to database ' + process.env.MONGODB_URL!)
        let model
        let url = req.url
        let body = req.body
        if (req.url.includes('?'))
          url = req.url.substring(0, req.url.indexOf('?'))
        switch (url) {
          case '/tracks':
            model = TrackModel
            break
          case '/users':
            model = UserModel
            break
          case '/groups':
            model = GroupModel
            body = this.updateRanking(body)
            break
          case '/challenges':
            model = ChallengeModel
            break
          default:
            break
        }
        if (model && req.params.id)
          model
            .findByIdAndUpdate(req.params.id, body, {
              new: true,
              runValidators: true,
            })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else if (model && req.query.name)
          model
            .findOneAndUpdate({ name: req.query.name.toString() }, body, {
              new: true,
              runValidators: true,
            })
            .then((result) => {
              this.searchResult(result, res)
            })
            .catch((err) => {
              res.status(500).json({ message: err })
            })
        else res.status(400).json({ message: 'Bad parameters' })
      })
      .catch((err) => {
        console.log('Error connecting to database: ' + err)
      })
  }

  private searchResult(result: any, res: express.Response): void {
    if (!result) res.status(404).json({ message: 'Not found' })
    else res.status(200).json({ message: 'Found', result: result })
  }

  private updateRanking(body: any): any {
    const { id, name, users } = body
    const group = new Group(id, name, ...users)
    for (const record of body.records)
      record.users = new UniqueList(...record.users)
    group.records = new UniqueList<ExtendedEntry>(...body.records)
    const ranking = group.ranking.values
    body.ranking = ranking
    return body
  }
}
```

### Stats.ts

#### Código

```TypeScript
export type Stat = {

  km: number

  slope: number
}

export class Stats {

  public values: { [key: string]: Stat }

  public constructor() {
    this.values = {}
  }

  public reset(): void {
    for (const key in this.values) {
      this.values[key].km = 0
      this.values[key].slope = 0
    }
  }
}
```

Este código define una interfaz ```Stat``` y una clase ```Stats```. 

La interfaz ```Stat``` define un objeto que tiene dos propiedades: ```km``` y ```slope```, ambas de tipo número. 

La clase ```Stats``` tiene una propiedad pública llamada ```values``` que es un objeto que tiene claves de tipo string y valores de tipo ```Stat```. El constructor de la clase inicializa la propiedad ```values``` como un objeto vacío.

La clase ```Stats``` también tiene un método público llamado ```reset()``` que no devuelve nada (void). Este método itera sobre todas las claves del objeto ```values``` y establece los valores de ```km``` y ```slope``` en cero.

### Track.ts

#### Código

```TypeScript
import { Coordinate } from './Coordinate.js'
import { Activity } from './Activity.js'
import { UniqueList } from './UniqueList.js'

export interface TrackInterface<T = number> {
  name: string
  start: Coordinate
  end: Coordinate
  distance: number
  slope: number
  users: Array<T>
  activity: Activity
  score: number
}

export class Track<T = number> implements TrackInterface<T> {

  public readonly id: number

  public name: string

  public start: Coordinate

  public end: Coordinate

  public distance: number

  public slope: number

  public users: UniqueList<T> = new UniqueList<T>()

  public activity: Activity

  public score = 0

  public constructor(
    id: number,
    name: string,
    start: Coordinate,
    end: Coordinate,
    distance: number,
    slope: number,
    activity: Activity
  ) {
    this.id = id
    this.name = name
    this.start = start
    this.end = end
    this.distance = distance
    this.slope = slope
    this.activity = activity
  }
}
```

Este código define una interfaz ```TrackInterface``` y una clase ```Track```. 

La interfaz ```TrackInterface``` define un objeto que tiene varias propiedades, incluyendo ```name```, ```start```, ```end```, ```distance```, ```slope```, ```users```, ```activity``` y ```score```. Algunas de estas propiedades tienen tipos genéricos, lo que significa que pueden ser de cualquier tipo.

La clase ```Track``` implementa la interfaz ```TrackInterface``` y tiene varias propiedades públicas, incluyendo ```id```, ```name```, ```start```, ```end```, ```distance```, ```slope```, ```users```, ```activity``` y ```score```. La propiedad ```id``` es de solo lectura y se establece en el constructor. Las propiedades ```name```, ```start```, ```end```, ```distance```, ```slope``` y ```activity``` se establecen en el constructor y se pueden modificar posteriormente. La propiedad ```users``` es una instancia de la clase ```UniqueList```, que es una lista que solo permite valores únicos.

La clase ```Track``` también tiene un constructor que toma varios argumentos, incluyendo ```id```, ```name```, ```start```, ```end```, ```distance```, ```slope``` y ```activity```. Este constructor inicializa las propiedades correspondientes con los valores proporcionados.

### UniqueList.ts

#### Código

```TypeScript
export class UniqueList<T = number> extends Array<T> {

  public constructor(...values: T[]) {
    super()
    for (const value of values) this.add(value)
  }

  public has(value: T): boolean {
    for (const v of this)
      if (JSON.stringify(v) === JSON.stringify(value)) return true
    return false
  }

  public add(value: T): boolean {
    if (this.has(value)) return false
    this.push(value)
    return true
  }

  public remove(value: T): boolean {
    if (!this.has(value)) return false
    this.splice(this.indexOf(value), 1)
    return true
  }
}
```

Este código define una clase ```UniqueList``` en TypeScript que extiende la clase nativa ```Array```. Esta clase se utiliza para almacenar una lista de valores únicos.

El constructor de la clase acepta un número variable de argumentos y los agrega a la lista utilizando el método ```add()```.
La clase tiene tres métodos públicos: ```has()```, ```add()``` y ```remove()```.

- El método ```has()``` se utiliza para verificar si un valor ya está en la lista. El método itera sobre la lista y compara cada valor con el valor proporcionado utilizando ```JSON.stringify()```. Si encuentra una coincidencia, devuelve ```true```, de lo contrario, devuelve ```false```.

- El método ```add()``` se utiliza para agregar un valor a la lista. Primero, verifica si el valor ya está en la lista utilizando el método ```has()```. Si el valor ya está en la lista, devuelve ```false```. De lo contrario, agrega el valor a la lista utilizando el método ```push()``` y devuelve ```true```.

- El método ```remove()``` se utiliza para eliminar un valor de la lista. Primero, verifica si el valor está en la lista utilizando el método ```has()```. Si el valor no está en la lista, devuelve ```false```. De lo contrario, utiliza el método ```splice()``` para eliminar el valor de la lista y devuelve ```true```.


### User.ts

#### Código

```TypeScript
import { Activity } from './Activity.js'
import { Stats } from './Stats.js'
import { UniqueList } from './UniqueList.js'
import { Entry } from './Entry.js'

export interface UserInterface<T = number> {
  name: string
  activity: Activity
  stats: Stats
  users: T[]
  groups: T[]
  tracks: T[]
  challenges: T[]
  records: Entry<T>[]
}

export class User<T = number> implements UserInterface<T> {

  public readonly id: number

  public name: string

  public activity: Activity

  public users: UniqueList<T> = new UniqueList<T>()

  public groups: UniqueList<T> = new UniqueList<T>()

  public stats: Stats = new Stats()

  public tracks: UniqueList<T> = new UniqueList<T>()

  public challenges: UniqueList<T> = new UniqueList<T>()

  public records: UniqueList<Entry<T>> = new UniqueList<Entry<T>>()

  public constructor(id: number, name: string, activity: Activity) {
    this.id = id
    this.name = name
    this.activity = activity
    this.stats.values = {
      weekly: { km: 0, slope: 0 },
      monthly: { km: 0, slope: 0 },
      yearly: { km: 0, slope: 0 },
    }
  }
}
```

Este código define una interfaz ```UserInterface``` y una clase ```User```.

La interfaz ```UserInterface``` define un objeto que tiene varias propiedades, incluyendo ```name```, ```activity```, ```stats```, ```users```, ```groups```, ```tracks```, ```challenges``` y ```records```. Algunas de estas propiedades tienen tipos genéricos, lo que significa que pueden ser de cualquier tipo.

La clase ```User``` implementa la interfaz ```UserInterface``` y tiene varias propiedades públicas, incluyendo ```id```, ```name```, ```activity```, ```users```, ```groups```, ```stats```, ```tracks```, ```challenges``` y ```records```. Las propiedades ```id```, ```name``` y ```activity``` se establecen en el constructor y se pueden modificar posteriormente. Las propiedades ```users```, ```groups```, ```tracks```, ```challenges``` y ```records``` son instancias de la clase ```UniqueList```, que es una lista que solo permite valores únicos. La propiedad ```stats``` es una instancia de la clase ```Stats```, que se utiliza para almacenar estadísticas de actividad física.

El constructor de la clase ```User``` toma tres argumentos: ```id```, ```name``` y ```activity```. Este constructor inicializa las propiedades correspondientes con los valores proporcionados. También inicializa la propiedad ```stats``` con valores predeterminados para las estadísticas semanales, mensuales y anuales.

### main.ts

#### Código

```TypeScript
import { Server } from './Server.js'

function main() {
  new Server().start(3000)
}

main()
```

Este código define una función ```main()``` que crea una instancia de la clase ```Server``` y llama al método ```start()``` con el argumento 3000. Luego, la función ```main()``` se llama para iniciar el servidor.

La clase ```Server``` se utiliza para crear un servidor web utilizando Node.js y Express. El método ```start()``` se utiliza para iniciar el servidor en un puerto específico. En este caso, el servidor se iniciará en el puerto 3000.

La función ```main()``` es la función principal del programa y se llama para iniciar el servidor. Al llamar a la función ```main()```, se crea una instancia de la clase ```Server``` y se inicia el servidor en el puerto 3000.

## Pruebas y cubrimiento

Han sido realiazadas pruebas con mocha y chai con el fin de verificar el correcto funcionamiento de todos y cada uno de los ficheros del proyecto. A continuación se muestras las pruebas realizadas que están todas en un mismo fichero llamado ```Destravate.spec.ts```:

```TypeScript
import 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import { connect, disconnect } from 'mongoose'

import { UniqueList } from '../src/UniqueList.js'
import { Activity } from '../src/Activity.js'
import { Coordinate } from '../src/Coordinate.js'
import { Track } from '../src/Track.js'
import { User } from '../src/User.js'
import { Group } from '../src/Group.js'
import { Challenge } from '../src/Challenge.js'
import { Server } from '../src/Server.js'
import { TrackModel, UserModel, GroupModel, ChallengeModel } from '../src/Models.js'

let server: Server
before(async function () {
  server = new Server()
  await server.start(process.env.PORT || 3000)
  await connect(process.env.MONGODB_URL!) 
  await TrackModel.deleteMany()
  await UserModel.deleteMany()
  await GroupModel.deleteMany()
  await ChallengeModel.deleteMany()
})

describe('Destravate app tests', () => {
  describe('Track class tests', () => {
    const coord1: Coordinate = {
      lat: 40.4167,
      lng: -3.70325,
    }
    const coord2: Coordinate = {
      lat: 52.520008,
      lng: 13.404954,
    }
    const track1: Track = new Track(
      0,
      'Route to El Dorado',
      coord1,
      coord2,
      100,
      0.5,
      Activity.running
    )
    it('Track Objects should have an id', () => {
      expect(track1.id).to.be.a('number')
      expect(track1.id).to.equal(0)
    })
    it('Track Objects should have a name', () => {
      expect(track1.name).to.be.a('string')
      expect(track1.name).to.equal('Route to El Dorado')
    })
    it('Track Objects should have a start and end points, and both should be Coordinates', () => {
      expect(track1.start).to.be.a('object')
      expect(track1.start).to.have.property('lat')
      expect(track1.start).to.have.property('lng')
      expect(track1.start.lat).to.be.a('number')
      expect(track1.start.lng).to.be.a('number')
      expect(track1.start.lat).to.equal(40.4167)
      expect(track1.start.lng).to.equal(-3.70325)
      expect(track1.end).to.be.a('object')
      expect(track1.end).to.have.property('lat')
      expect(track1.end).to.have.property('lng')
      expect(track1.end.lat).to.be.a('number')
      expect(track1.end.lng).to.be.a('number')
      expect(track1.end.lat).to.equal(52.520008)
      expect(track1.end.lng).to.equal(13.404954)
    })
    it('Track Objects should have a distance', () => {
      expect(track1.distance).to.be.a('number')
      expect(track1.distance).to.equal(100)
    })
    it('Track Objects should have a slope', () => {
      expect(track1.slope).to.be.a('number')
      expect(track1.slope).to.equal(0.5)
    })
    it('Track Objects should have a list of users that have done the track', () => {
      expect(track1.users).to.be.a('array')
      expect(track1.users).to.have.lengthOf(0)
    })
    it('Track Objects should have an activity', () => {
      expect(Object.values(Activity)).to.include(track1.activity)
    })
    it('Track Objects should have a score', () => {
      expect(track1.score).to.be.a('number')
      expect(track1.score).to.equal(0)
    })
  })

  describe('User class tests', () => {
    const user = new User(0, 'Iluzio', Activity.running)
    it('User Objects should have an id', () => {
      expect(user.id).to.be.a('number')
      expect(user.id).to.equal(0)
    })
    it('User Objects should have a name', () => {
      expect(user.name).to.be.a('string')
      expect(user.name).to.equal('Iluzio')
    })
    it('User Objects should have an sport activity', () => {
      expect(Object.values(Activity)).to.include(user.activity)
    })

    it('User Objects should have a list of users', () => {
      expect(user.users).to.be.a('array')
      expect(user.users).to.have.lengthOf(0)
    })
    it('User Objects should be able to add users', () => {
      user.users.add(1)
      expect(user.users).to.have.lengthOf(1)
      expect(user.users).to.include(1)
    })
    it('User Objects should be able to remove users', () => {
      user.users.remove(1)
      expect(user.users).to.have.lengthOf(0)
      expect(user.users).to.not.include(1)
    })
    it('User Objects should have a list of groups in which the user is', () => {
      expect(user.groups).to.be.a('array')
      expect(user.groups).to.have.lengthOf(0)
    })
    it('User Objects should be able to add groups', () => {
      user.groups.add(1)
      expect(user.groups).to.have.lengthOf(1)
      expect(user.groups).to.include(1)
    })
    it('User Objects should be able to remove groups', () => {
      user.groups.remove(1)
      expect(user.groups).to.have.lengthOf(0)
      expect(user.groups).to.not.include(1)
    })
    it('User Objects should have stats', () => {
      expect(Object.keys(user.stats.values)).includes('weekly')
      expect(Object.keys(user.stats.values)).includes('monthly')
      expect(Object.keys(user.stats.values)).includes('yearly')
    })
    it('User Objects should be able to reset stats', () => {
      user.stats.reset()
      expect(user.stats.values['weekly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(user.stats.values['monthly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(user.stats.values['yearly']).to.be.deep.equal({ km: 0, slope: 0 })
    })
    it('User Objects should have a list of favorite tracks', () => {
      expect(user.tracks).to.be.a('array')
      expect(user.tracks).to.have.lengthOf(0)
    })
    it('User Objects should be able to add favorite tracks', () => {
      user.tracks.add(1)
      expect(user.tracks).to.have.lengthOf(1)
      expect(user.tracks).to.include(1)
    })
    it('User Objects should be able to remove favorite tracks', () => {
      user.tracks.remove(1)
      expect(user.tracks).to.have.lengthOf(0)
      expect(user.tracks).to.not.include(1)
    })
    it('User Objects should have a list of active challenges', () => {
      expect(user.challenges).to.be.a('array')
      expect(user.challenges).to.have.lengthOf(0)
    })
    it('User Objects should be able to add active challenges', () => {
      user.challenges.add(1)
      expect(user.challenges).to.have.lengthOf(1)
      expect(user.challenges).to.include(1)
    })
    it('User Objects should be able to remove active challenges', () => {
      user.challenges.remove(1)
      expect(user.challenges).to.have.lengthOf(0)
      expect(user.challenges).to.not.include(1)
    })
    it('User Objects should have a record of the tracks done', () => {
      expect(user.records).to.be.a('array')
      expect(user.records).to.have.lengthOf(0)
    })
    it('User Objects should be able to add records', () => {
      user.records.add({ date: '2019-01-01', tracks: new UniqueList(1, 2, 3) })
      expect(user.records).to.have.lengthOf(1)
      expect(user.records).to.be.deep.equal([
        { date: '2019-01-01', tracks: new UniqueList(1, 2, 3) },
      ])
    })
    it('User Objects should know if the friend/group/favorite/challenge/record is in the list when adding', () => {
      user.users.add(1)
      expect(user.users.add(1)).to.be.false
      user.groups.add(1)
      expect(user.groups.add(1)).to.be.false
      user.tracks.add(1)
      expect(user.tracks.add(1)).to.be.false
      user.challenges.add(1)
      expect(user.challenges.add(1)).to.be.false
      user.records.add({ date: '2019-01-01', tracks: new UniqueList(1, 2, 3) })
      expect(
        user.records.add({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
        })
      ).to.be.false
    })
    it('User Objects should know if the friend/group/favorite/challenge/record is not in the list when removing', () => {
      expect(user.users.remove(2)).to.be.false
      expect(user.groups.remove(2)).to.be.false
      expect(user.tracks.remove(2)).to.be.false
      expect(user.challenges.remove(2)).to.be.false
      expect(
        user.records.remove({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2),
        })
      ).to.be.false
    })
  })

  describe('Group class tests', () => {
    const group = new Group(0, 'Canary Team', 3, 4)
    it('Group Objects should have an id', () => {
      expect(group.id).to.be.a('number')
      expect(group.id).to.equal(0)
    })
    it('Group Objects should have a name', () => {
      expect(group.name).to.be.a('string')
      expect(group.name).to.equal('Canary Team')
    })
    it('Group Objects should have a list of users', () => {
      expect(group.users).to.be.a('array')
      expect(group.users).to.have.lengthOf(2)
    })
    it('Group Objects should be able to add users', () => {
      group.users.add(1)
      expect(group.users).to.have.lengthOf(3)
      expect(group.users).to.include(1)
    })
    it('Group Objects should be able to remove users', () => {
      group.users.remove(1)
      expect(group.users).to.have.lengthOf(2)
      expect(group.users).to.not.include(1)
    })
    it('Group Objects should have stats', () => {
      expect(Object.keys(group.stats.values)).includes('weekly')
      expect(Object.keys(group.stats.values)).includes('monthly')
      expect(Object.keys(group.stats.values)).includes('yearly')
    })
    it('Group Objects should be able to reset stats', () => {
      group.stats.reset()
      expect(group.stats.values['weekly']).to.be.deep.equal({ km: 0, slope: 0 })
      expect(group.stats.values['monthly']).to.be.deep.equal({
        km: 0,
        slope: 0,
      })
      expect(group.stats.values['yearly']).to.be.deep.equal({ km: 0, slope: 0 })
    })
    it('Group Objects should have a list of favorite tracks', () => {
      expect(group.tracks).to.be.a('array')
      expect(group.tracks).to.have.lengthOf(0)
    })
    it('Group Objects should be able to add favorite tracks', () => {
      group.tracks.add(1)
      expect(group.tracks).to.have.lengthOf(1)
      expect(group.tracks).to.include(1)
    })
    it('Group Objects should be able to remove favorite tracks', () => {
      group.tracks.remove(1)
      expect(group.tracks).to.have.lengthOf(0)
      expect(group.tracks).to.not.include(1)
    })
    it('Group Objects should have a record of the tracks done', () => {
      expect(group.records).to.be.a('array')
      expect(group.records).to.have.lengthOf(0)
    })
    it('Group Objects should be able to add records', () => {
      group.records.add({
        date: '2019-01-01',
        tracks: new UniqueList(1, 2, 3),
        users: new UniqueList(1, 2, 3),
        km: 10,
      })
      expect(group.records).to.have.lengthOf(1)
      expect(group.records).to.be.deep.equal([
        {
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
          users: new UniqueList(1, 2, 3),
          km: 10,
        },
      ])
    })
    it('Group Objects should know if the user/favorite/record is in the list when adding', () => {
      group.users.add(1)
      expect(group.users.add(1)).to.be.false
      group.tracks.add(1)
      expect(group.tracks.add(1)).to.be.false
      group.records.add({
        date: '2019-01-01',
        tracks: new UniqueList(1, 2, 3),
        users: new UniqueList(1, 2, 3),
        km: 10,
      })
      expect(
        group.records.add({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2, 3),
          users: new UniqueList(1, 2, 3),
          km: 10,
        })
      ).to.be.false
    })
    it('Group Objects should know if the user/favorite/record is not in the list when removing', () => {
      expect(group.users.remove(2)).to.be.false
      expect(group.tracks.remove(2)).to.be.false
      expect(
        group.records.remove({
          date: '2019-01-01',
          tracks: new UniqueList(1, 2),
          users: new UniqueList(1, 2),
          km: 10,
        })
      ).to.be.false
    })
    it('Group Objects should have a ranking', () => {
      group.records.add({
        date: '2023-01-01',
        tracks: new UniqueList(1, 3),
        users: new UniqueList(3),
        km: 250,
      })
      expect(group.ranking).to.be.a('array')
      expect(group.ranking).to.have.lengthOf(2)
    })
  })

  describe('Challenge class tests', () => {
    const challenge = new Challenge(
      0,
      'The World Warrior',
      Activity.cycling,
      0,
      1
    )
    it('Challenge Objects should have an id', () => {
      expect(challenge.id).to.be.a('number')
      expect(challenge.id).to.equal(0)
    })
    it('Challenge Objects should have a name', () => {
      expect(challenge.name).to.be.a('string')
      expect(challenge.name).to.equal('The World Warrior')
    })
    it('Challenge Objects should have an activity', () => {
      expect(Object.values(Activity)).to.include(challenge.activity)
    })
    it('Challenge Objects should have a list of tracks that are part of the challenge', () => {
      expect(challenge.tracks).to.be.a('array')
      expect(challenge.tracks).to.have.lengthOf(2)
      expect(challenge.tracks).to.be.deep.equal([0, 1])
    })
    it('Challenge Objects should be able to add tracks', () => {
      challenge.tracks.add(2)
      expect(challenge.tracks).to.have.lengthOf(3)
    })
    it('Challenge Objects should be able to remove tracks', () => {
      challenge.tracks.remove(2)
      expect(challenge.tracks).to.have.lengthOf(2)
    })
    it('Challenge Objects should have a list of users that are part of the challenge', () => {
      expect(challenge.users).to.be.a('array')
      expect(challenge.users).to.have.lengthOf(0)
    })
    it('Challenge Objects should be able to add users', () => {
      challenge.users.add(1)
      expect(challenge.users).to.have.lengthOf(1)
      expect(challenge.users).to.include(1)
    })
    it('Challenge Objects should be able to remove users', () => {
      challenge.users.remove(1)
      expect(challenge.users).to.have.lengthOf(0)
      expect(challenge.users).to.not.include(1)
    })
    it('Challenge Objects should know if the user/track is in the list when adding', () => {
      challenge.users.add(1)
      expect(challenge.users.add(1)).to.be.false
      challenge.tracks.add(1)
      expect(challenge.tracks.add(1)).to.be.false
    })
    it('Challenge Objects should know if the user/track is not in the list when removing', () => {
      expect(challenge.users.remove(2)).to.be.false
      expect(challenge.tracks.remove(2)).to.be.false
    })
  })
  describe('Server class tests', () => {
    it("Servers should be able to make POST requests to 'the API", async () => {
      await request(server.app).post('/users').send({
        name: 'Test User',
        activity: "running",
      }).expect(201)
      let user_id
      await UserModel.findOne({ name: 'Test User' }).then((user) => {
        if (user)
          user_id = user._id
      })
      await request(server.app).post('/tracks').send({
        name: 'Test Track',
        start: {
          lat: 0,
          lng: 0,
        },
        end: {
          lat: 1,
          lng: 1,
        },
        distance: 100,
        slope: 3.1,
        users: [user_id],
        activity: "running",
      }).expect(201)
    })
  })
})

after(async function () {
  await server.stop()
  await disconnect()
})
```


Y como podemos ver a continuación todas las pruebas fueron superadas con éxito:

También podemos comprobar el cubrimiento de código con Istanbul y Coveralls:

Así que por último mostramos su funcionamiento por terminal:

## Conclusión

Ha sido una práctica con cierto nivel de complejidad pero que nos a ayudado no sólo a saber trabajar en equipo por separado si no a usar herramientas como LiveShare en VSC que ha sido de gran ayuda. Cabe destacar que en esta práctica hemos alcanzado nuestro objetivo que era acabar con algo funcional que estuviera a la altura de lños requisitos del guión, gracias al uso de todos los conocimientos adquiridos en la asignatura durante el cuatrimestre.

## Elementos Bibliográficos:

- Guión de la práctica 12, https://ull-esit-inf-dsi-2223.github.io/prct12-destravate-api/.

- Adam Freeman - Essential TypeScript 4: From Beginner to ProURL,https://www.oreilly.com/library/view/essential-typescript-4/9781484270110/html/Part_1.xhtml .
