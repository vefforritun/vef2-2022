# Postgres dæmi

Þessi dæmi gera ráð fyrir því að:

* postgres keyri á `localhost`
* eigi gagnagrunn sem heitir `vef2`
* gagnagrunnur hafi töfluna `people` skilgreinda í `schema.sql`
* notandinn `vef2-user` hafi les og skrif aðgang, ef keyrt þannig, sjá að neðan

## Búa til gagnagrunn, notanda og töflur

Til að fá þetta allt til að virka er hægt að `psql` CLI tólið, gert ráð fyrir að skipanir séu keyrðar í _þessari_ möppu.

Prófið báðar leiðir og eyðið öllu á milli til að byrja frá byrjun.

Athugið að `psql` aðgerðir eru framkvæmdar sem sjálfgefinn notandi og gæti þurft að senda aukalega inn auðkenningu, sjá „[Að setja upp og tengjast Postgres](../postgres-tenging.md)“.

### Með sjálfgefnum notanda

```bash
> createdb vef2
> psql vef2 < schema.sql
CREATE TABLE
> psql vef2
```

þetta býr til `vef2` gagnagrunninn með sjálfgefnum notanda, tengistrengur verður þá _án notanda og lykilorðs_:

`postgres://:@localhost/vef2`

### Með sérstökum notanda

Byrja á því að búa til gagnagrunn og keyra síðan `create.sql` sem býr til notanda.

```bash
> createdb vef2
> psql vef2 < create.sql
> psql vef2 < schema.sql
```

Tengistrengur verður þá:

`postgres://vef2-user:123@localhost/vef2`

Þetta leyfir okkur að takmarka hvað notandi á vefnum okkar má og má ekki gera í gagnagrunninum, t.d. _bara_ `SELECT` og `INSERT`, ekki `UPDATE` eða `DELETE`. Í þessu dæmi fór þó notandi öll réttindi á gagnagrunn og í schema `public`.

## Bæta við og lesa gögn

Skrá þarf réttann tengistreng m.v. að ofan í `.env` og keyra síðan:

`node insert.js`

og lesa upp gögn með

`node select.js`

## Eyða gagnagrunn, notanda eða töflu

Til að eyða *öllu*  er hægt að keyra:

`dropdb vef2`

Til að eyða innan úr gagnagrunn er hægt að keyra:

`psql vef2 < drop.sql`
