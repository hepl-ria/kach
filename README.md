# kach

> Main repo for the Kach web app project.

* * *

**Note:** the school where the course is given, the [HEPL](http://www.provincedeliege.be/hauteecole) from Liège, Belgium, is a french-speaking school. From this point, the instructions will be in french. Sorry.

* * *

## Cahier des charges

Notre cahier des charges va être relativement simple : nous voulons une application web qui va récupérer la position géographique de l'utilisateur et va lui lister les distributeurs de billets les plus proches.

L'utilisateur aura la possibilité d'afficher les détails de chaque distributeur, ainsi qu'éventuellement le marquer comme *vide*, éditer ses informations ou le marquer pour suppression.

### Structure des données

Les données existent déjà et nous sont mises à disposition sous forme de deux *dump* MongoDB qui se trouvent dans le dossier [_dev](./_dev).

Nous avons deux types de données : les **banques** et les **terminaux**.

#### Terminaux

Un terminal représente un ou plusieurs distributeurs de billets disponible à un endroit géographique donné.  
Chaque terminal est caractérisé par les informations suivantes : 

* un **id** (`_id`, `ObjectID`)
* une **latitude** (`latitude`, `Number`)
* une **longitude** (`longitude`, `Number`)
* une **adresse** (`address`, `String`, facultative)
* une **banque** (`bank`, `ObjectID`, facultative)
* une **état** de remplissage (`empty`, `Boolean`, facultatif)
* une **date de création** (`created_at`, `String`)
* une **date de mise à jour** (`updated_at`, `String`) 
* une **date de suppression** (`deleted_at`, `String`, facultative)

#### Banque

Une banque représente une entité légale "propriétaire" d'un terminal.  
Chaque banque est caractérisée par : 

* un **id** (`_id`, `ObjectID`)
* un **nom** (`name`, `String`)
* un **pays** (`country`, `String`)
* une **couleur** (`color`, `String`)
* une **icône** (`icon`, `String`)
* une **URL** (`url`, `String`)
* une **date de création** (`created_at`, `String`)
* une **date de mise à jour** (`updated_at`, `String`) 
* une **date de suppression** (`deleted_at`, `String`, facultative)
