// creare come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:XXXX/todos

$(document).ready(function(){

    // effettuo chiamata AJAX di lettura
    $.ajax(
        {
            "url": "http://157.230.17.132:3022/todos",
            "method": "GET",
            "success": function(data) {
                console.log(data);
                render(data);
            },
            "error": function() {
                alert("errore");
            }
        }
    );



    // creo nuovi elementi
    $(".add").click(function() {

        // creo variabile per recuperare l'input dell'utente
        var val = $("#input-element").val();

        if(val != "") {

            $.ajax(
                {
                    "url": "http://157.230.17.132:3022/todos",
                    "method": "POST",
                    "data": {
                        "text": val // variabile input creata sopra
                    },
                    "success": function(data) {
                        console.log(data);
                        addElement(data);
                    },
                    "error": function() {
                        alert("errore");
                    }
                }
            );
        }
    });


    //delete -- cancello elementi dall'API
    $("#list").on("click", "delete", function(){

        var elm = $(this).parent();
        var id = elm.attr("id");


        // effettuo chiamata ajax con method DELETE
        $.ajax(
            {
                "url": "http://157.230.17.132:3022/todos",
                "method": "DELETE",
                "success": function(data) {
                    elm.remove(data);
                },
                "error": function() {
                    alert("errore");
                }
            }
        );
    }); 

});

// ---- funzioni ---- //
function render(data) {

    // compilo il template handlebars
    var source = $("#element-template").html();   // seleziono "id" html e .html() serve per scriverci
    // formula da non toccare di handlebars
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
         // dichiaro una variabile context con i dati del "text" della chiamata ajax
        var context = {
            "id": data[i].id,
            "text": data[i].text
        }
        // variabile del template handlebars
        var html = template(context);

        // scriviamo i dati nell html
        $("#list").append(html);
        
    }
}

// funzione per aggiungere elementi tramite input
function addElement(data) {
    var source = $("#element-template").html();
    var template = Handlebars.compile(source);

    var context = {
        "id": data.id,
        "text": data.text
    }
    // variabile del template handlebars
    var html = template(context);

    // scriviamo i dati nell html
    $("#list").append(html);

}

