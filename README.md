# VAVJS Zadanie 3

Urobte jednoduchu verziu e-shopu pre elektroniku. Pouzite DB system. Pouzite JS UI framework. Pouzite Docker a spravte jednoduche testy.

## Zadanie

| #     |                                                                                                                    |        |         |
| ----- | ------------------------------------------------------------------------------------------------------------------ | ------ | ------- |
| **1** | **DB a praca s nou v ramci JS**                                                                                    | SUM 5  |         |
| a     | produkty                                                                                                           | 1      |         |
| b     | objednavky                                                                                                         | 2      |         |
| c     | zakaznici                                                                                                          | 1      |         |
| d     | reklama a pocitadlo                                                                                                | 1      |         |
| **2** | **rozhranie e-shopu**                                                                                              | SUM 10 | &#9745; |
| a     | stranka produktov                                                                                                  | 3      | &#9745; |
| b     | stranka objednavky                                                                                                 | 3      | &#9745; |
| c     | podakovanie (reklama s pocitadlom)                                                                                 | 1      | &#9745; |
| d     | admin rozrhanie (tabulka objednavok so stavom a moznostou zmeny stavu, zmena reklami a zobrazenie stavu pocitadla) | 3      | &#9745; |
| **3** | **Docker a testing**                                                                                               | SUM 5  | &#9745; |
| a     | docker-compose a Dockerfiles                                                                                       | 1      | &#9745; |
| b     | end-to-end test objednavky (simulacia network callov a pouzite mocha)                                              | 4      | &#9745; |
| **4** | **Kosik**                                                                                                          | SUM 5  | &#9745; |
| a     | viac produktov                                                                                                     | 2      | &#9745; |
| b     | viac kusov                                                                                                         | 2      | &#9745; |
| c     | viac kusov a viac produktov                                                                                        | 1      | &#9745; |
| SUM   |                                                                                                                    | 25     | 20      |
 
### DB
RDB: MySQL, PostgreSQL, MariaDB, ??? - povoleny wrapper sequalize, inak sa opytajte (ziadne dokumentove DB, nie sqlite)\
Produkty: id, nazov, obrazok, cena\
Zakaznici: id, e-mail (unikatny), meno, ulica, cislo, mesto , psc\
Objednavky: zakaznik+produkty + stav objednavky\
Reklama: link,\
Seed iba na produkty, 3ks - musia byt v JS "CREATE TABLE produkty", INSERT 3x produkty
 
### Rozhranie
JS framework Angular, React, Vue alebo Svelte\
stranka produktov - zobrazit produkty: nazov, obrazok, cena, tlacidlo objednania\
stranka objednavky - formular pre zadanie udajov objednavajuceho\
podakovanie - stranka s "dakujeme za objednavku" a s reklamou s pocitadlom\
stranka pre admina: tabulka objednavok (s ich obsahom) a s tlacidlom zaplatenia; reklama s moznostou zmeny linkov (img + href) a pocitadlo

## Vypracovanie

Zadanie bolo vypracovane podla poziadaviek, pre vsetky vyssie uvedene body v tabulke s oznacenim &#9745;. Pri prazdnom oznaceni (&#9744;), ide o body zadania ktore som sa rozhodol neimplementovat, pre casove a psychicke dovody.

### Spustenie

Pre spustenie mimo dockeru som vytvoril shell scripty. Pre spustenie testu je potrebne spustit script `run-test.sh`.

### Par dovysvetliviek ku vybranym bodom:

- 1 - na pocitaci mam nejaky problem s dockerom, nepomohlo ani preinstalovavanie, ani nic ine. Nebol som teda schopny rozbehat databazu, ani tu z p8. Pre vypracovanie ulohy som sa teda rozhodol, ze namiesto databazy pouzijem cisto js objekty a polia, s ktorymi bude backend pracovat.
- 2 - hlavna stranka dostupna na `/`, admin interface na `/admin`
- 4 - pri produkte je potrebne vybrat mnozstvo a kliknut na tlacidlo. Je takisto mozne objednat "urychlene" jeden produkt, kliknutim na tlacidlo Objednat pri produkte.
