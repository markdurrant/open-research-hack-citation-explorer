from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("http://opencitations.net/sparql")
sparql.setQuery("""
PREFIX cito: <http://purl.org/spar/cito/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX datacite: <http://purl.org/spar/datacite/>
PREFIX literal: <http://www.essepuntato.it/2010/06/literalreification/>
PREFIX biro: <http://purl.org/spar/biro/>
PREFIX frbr: <http://purl.org/vocab/frbr/core#>
PREFIX c4o: <http://purl.org/spar/c4o/>
SELECT ?cited ?title ?url WHERE {
    ?main cito:cites ?cited .
    ?cited dcterms:title ?title .		
    ?main frbr:part ?ref .
    ?ref biro:references ?cited .
    ?cited datacite:hasIdentifier [
        datacite:usesIdentifierScheme datacite:url ;
        literal:hasLiteralValue ?url
    ] .
    ?main datacite:hasIdentifier [
        datacite:usesIdentifierScheme datacite:url ;
        literal:hasLiteralValue 'http://dx.doi.org/10.1097/igc.0000000000000609'
    ]
}
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()
print(results)
