# Code style et organisation projet

Ce document précise certains éléments de style et d’organisation pour les développement du projet.

Il a pour but d'avoir des règles de style consistantes pour tout le monde.

## Général

### Style
Le codestyle de base ainsi que l'application de nombreuses recommendations
dans ce document pourront être installées lorsque la synchronisation des
paramètres entre IDE Jetbrains fonctionnera convenablement
[(voir ici)](https://blog.jetbrains.com/idea/2017/09/intellij-idea-2017-3-eap-better-synchronization-of-your-settings-across-devices-and-other-improvements/)

Pour le moment, il n'est malheureusement pas possible d'appliquer
automatiquement certaines recommandations malgré que ce soit possible.


### _Wrapping_
Essayer d'avoir des lignes ne dépassant pas **80** caractères. La limite haute
est à **100 caractères**. Au delà, il faut penser à correctement sauter
une ligne.

Ex :
```php
$messageMiseEnRelation = $this->generatePlannedEmailTemplate($this->twig->render('template/mise_en_relation', array('prospect' => $prospect)), 'Visite parking', 1, $prospect);
```

Deviendrait :
```php
$messageMiseEnRelation =
    $this->generatePlannedEmailTemplate(
        $this->twig->render(
            'template/mise_en_relation',
            array('prospect' => $prospect)
        ),
        'Visite parking', 1, $prospect
    );
```

Cette règle de code style n'est qu'une _recommendation_ afin de rendre
le code plus simple à lire sans scroller horizontalement. Elle permet aussi
d'avoir un meilleur confort de lecture du code sur des plateformes comme
Gitlab ou sur les _diff_ git. La règle est basée sur une police de
**taille 16**.

Si une chaîne de caractères est très longue (une URL par exemple), il ne
faut évidemment pas la couper, sauf si celle-ci est composable. Cette règle
s'applique parfaitement pour les interfaces implémentant la
_fluent pattern_ ou _désignation chainée_ en français.

**Important** : pour la raison évoquée dans le paragraphe précédent, il vaut
mieux ne pas activer la fonction `soft wrapping` ou `wrap on typing` de votre
éditeur et faire les sauts de ligne manuellement.

Ex :
```php
// [...]
$queryBuilder
    ->select('u')
    ->from('User u')
    ->where('u.id = :identifier')
    ->orderBy('u.name', 'ASC')
    ->setParameter('identifier', 100);
```

_Note_ : Les documents _Markdown_ (.md) respectent cette règle en sautant
une ligne entre les mots. N'étant pas restreint par la syntaxe de code, il
est plus simple de la respecter.

### Classes
* **En anglais**
* Éviter les abréviations
* Possèdent une seule responsabilité et ne doivent être modifiées que pour
une seule raison (sinon scinder en plusieurs classes)

### Méthodes
* **En anglais**
* Éviter les abréviations
* Possèdent une seule responsabilité
* Utiliser `lower camelCase` (`myMethod`)
* Spécifier le type des paramètres et le type de retour si possible
* Privilégier des méthodes courtes et _KISS_ (Keep It Simple, Stupid)

### Variables
* **En anglais**
* Éviter les abréviations
* Utiliser `lower camelCase` (`myVariable`)
* Ne pas utiliser plusieurs noms différents pour une même instance d'une
classe

### Documentation/commentaires
* **En Anglais**
## Git

### Commits

#### Quand faire un commit
Un commit doit être créé lorsqu'un _changement logique_ est fait. Notamment,
il faut garder à l'esprit, que, comme en développement, le commit ne doit
avoir qu'une seule _responsabilité_, c'est-à-dire qu'il doit être possible
de _revert_ le commit sans que des changements inattendus se produisent.
De la même façon, cela aide à avoir des messages de commits concis.

Une référence peut être à ce sujet peut être trouvée
[ici](https://www.freshconsulting.com/atomic-commits/) (en anglais)

#### Contenu
Le commit doit être rédigé à l'impératif présent et en français.
Il doit décrire le changement qui sera fait lorsqu'il est appliqué et
pourquoi (dans la description).

[Commentaire explicatif](http://365git.tumblr.com/post/3308646748/writing-git-commit-messages)
(en anglais)
ou [un autre article](https://chris.beams.io/posts/git-commit/) plus complet
(en anglais)

Exemple : `Ajoute de la documentation aux tests`

La première ligne d'un commit, aussi appelée le sujet, doit essayer de ne
pas dépasser 52 caractères.
Ceci afin d'avoir des résumés simples à lire, que ce soit dans l'historique
du repository, sur PHPStorm ou sur le CLI.

Si le commit est non-trivial, une description plus complète de celui-ci
peut être faite de façon brève après avoir laissé une ligne vide entre
la description et le sujet du commit. Les lignes de la description doivent
essayer de ne pas dépasser 72 caractères, pour les mêmes raisons que la
recommendation précédente.

Exemple :
```
Met à jour les paramètres par défaut

Les anciens paramètres n'étaient plus en phase avec le projet et pouvait
créer des problèmes et rendre l'installation plus compliquée qu'elle ne
le devrait
```

### Stratégie de fusion
Il est préférable de faire des _merge_ plutôt que des _rebase_. Laisser Git
procéder à un _fast-forward_ si possible (pas de `--no-ff` en CLI).

La commande _rebase_ devrait être plutôt utilisée pour réorganiser ou
modifier des commits locaux.

**Important** : ne jamais _rebase_ ou modifier un commit déjà
partagé sur une branche, sauf si il est certain qu'elle n'a jamais été
récupérée par quelqu'un d'autre.
