// creare come fatto in aula, una todo list sulla quale sarà possibile svolgere le operazioni di CRUD, usando qusta Api: http://157.230.17.132:XXXX/todos

$(document).ready(function(){

    // effettuo chiamata AJAX
    $.ajax(
        {
            "url": "http://157.230.17.132:3022/todos",
            "method": "GET",
            "success": function(data) {
                render(data);
            },
            "error": function() {
                alert("errore");
            }
        }
    );





});

// ---- funzioni ---- //
function render(data) {

    // compilo il template handlebars
    var source = $("#element-template").html();   // seleziono "id" html e .html() serve per scriverci
    // formula da non toccare di handlebars
    var template = Handlebars.compile(source);

    // dichiaro una variabile context con i dati di "data" della chiamata ajax
    var context = {
        "data": data
    }
    // variabile del template handlebars
    var html = template(context);

    // scriviamo i dati nell html
    $("#list").append(html);
}