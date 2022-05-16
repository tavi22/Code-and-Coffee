function formular() {

    let nume = document.forms["formular-contact"]["nume"];
    let prenume = document.forms["formular-contact"]["prenume"];
    let email = document.forms["formular-contact"]["email"];
    let atasament = document.forms["formular-contact"]["atasament"]



    if (nume.value === "") {
        window.alert("Introduceti numele.");
        nume.focus();
        return false;
    }

    if (prenume.value === "") {
        window.alert("Introduceti prenumele.");
        prenume.focus();
        return false;
    }

    if (email.value === "") {
        window.alert("Introduceti email.");
        email.focus();
        return false;

    }

    if (atasament.value === "") {
        window.alert("Introduceti CV-ul.");
        atasament.focus();
        return false;

    }


}