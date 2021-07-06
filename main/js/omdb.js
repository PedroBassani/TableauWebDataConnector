(function() {
    var myConnector = tableau.makeConnector();

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

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://www.omdbapi.com/?apikey=9b03f932&s=superman", function(resp) {
            var feat = resp.Search,
                tableData = [];

            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "title": feat[i].title,
                    "year": feat[i].year,
                    "imdbID": feat[i].imdbID,
                    "type": feat[i].type,
                    "poster": feat[i].poster
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "OMDB API";
            tableau.submit();
        });
    });
})();
