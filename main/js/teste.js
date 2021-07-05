(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "title",
            alias: "Title",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "year",
            alias: "Year",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "imdbID",
            alias: "imdbID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type",
            alias: "Type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "poster",
            alias: "Poster",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "OMDB",
            alias: "OMDB API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://www.omdbapi.com/?apikey=9b03f932&s=superman", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "title": feat[i].properties.title,
                    "year": feat[i].properties.year,
                    "imdbID": feat[i].properties.imdbID,
                    "type": feat[i].properties.type,
                    "poster": feat[i].properties.poster
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "OMDB API"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
