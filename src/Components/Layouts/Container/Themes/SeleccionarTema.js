export const SeleccionarTemaSiderBar = (config) =>{
/*     console.log(config) */
    const color = config
    if(color == "sidebar-light-theme"){
      return seleccionarTemaClaroSB()      
    }else if (color == "sidebar-dark-theme"){
        return seleccionarTemaOscuroSB() 
    }else if (color == "sidebar-custom-theme"){
        return seleccionarTemaCustomSB() 
    }
}

export const SeleccionarTemaNavbar = (config) => {
 /*    console.log(config) */
    const color = config
    if(color == "colorPrimary"){
        return colorPrimary()
    }else if(color == "colorSuccess"){
        return colorSuccess()
    }else if(color == "colorWarning"){
        return colorWarning()
    }else if(color == "colorDanger"){
        return colorDanger()
    }else if(color == "colorInfo"){
        return colorInfo()
    }else if(color == "colorDark"){
        return colorDark()
    }else if(color == "colorDefault"){
        return colorDefault()
    }
}


//background constants
var navbar_classes = "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
var sidebar_classes = "sidebar-light sidebar-dark sidebar-custom";
var $body ; /* $("body"); */


//Menu
export const verMenu = () =>{
/*     $("#theme-settings").toggleClass("open"); */
}
export const cerrarMenu = () =>{ 
 /*    $("#right-sidebar,#theme-settings").removeClass("open"); */
}
//sidebar backgrounds
export const seleccionarTemaClaroSB = () => {
  /*   $body.removeClass(sidebar_classes);
    $body.addClass("sidebar-light");
    $(".sidebar-bg-options").removeClass("selected");
    $("#sidebar-light-theme").toggleClass("selected"); */
}

export const seleccionarTemaOscuroSB = () =>{
    /* $body.removeClass(sidebar_classes);
    $body.addClass("sidebar-dark");
    $(".sidebar-bg-options").removeClass("selected");
    $("#sidebar-dark-theme").toggleClass("selected"); */
}

export const seleccionarTemaCustomSB = () =>{
    /* $body.removeClass(sidebar_classes);
    $body.addClass("sidebar-custom");
    $(".sidebar-bg-options").removeClass("selected");
    $("#sidebar-custom-theme").toggleClass("selected"); */
}

//Navbar Backgrounds
export const colorPrimary = () =>{
    /* $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-primary");
    $(".tiles").removeClass("selected");
    $("#colorPrimary").toggleClass("selected"); */
}

export const colorSuccess = () => {
    /* $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-success");
    $(".tiles").removeClass("selected");
    $("#colorSuccess").toggleClass("selected"); */
}

export const colorWarning = () => {
   /*  $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-warning");
    $(".tiles").removeClass("selected");
    $("#colorWarning").toggleClass("selected"); */
}

export const colorDanger = () =>{
  /*   $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-danger");
    $(".tiles").removeClass("selected");
    $("#colorDanger").toggleClass("selected"); */
}

export const colorLigth = () => {
    /* $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-light");
      $(".tiles").removeClass("selected");
      $("#colorLigth").toggleClass("selected"); */
}

export const colorInfo = () =>{
  /*   $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-info");
    $(".tiles").removeClass("selected");
    $("#colorInfo").toggleClass("selected"); */
}

export const colorDark = () =>{
 /*    $(".navbar").removeClass(navbar_classes);
    $(".navbar").addClass("navbar-dark");
    $(".tiles").removeClass("selected");
    $("#colorDark").toggleClass("selected"); */
}

export const colorDefault = () =>{
   /*  $(".navbar").removeClass(navbar_classes);
    $(".tiles").removeClass("selected");
    $("#colorDefault").toggleClass("selected"); */
}