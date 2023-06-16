    var body; /* $('body'); */
    var contentWrapper; /* $('.content-wrapper'); */
    var scroller; /* $('.container-scroller'); */
    var footer; /* $('.footer'); */
    var sidebar; /* $('.sidebar'); */

    // Agregar clase activa al enlace de navegación basado en url dinámicamente.
    // La clase activa se puede codificar directamente en el archivo html también según sea necesario.
    export const addActiveClass = (element) => {
        /* if (current === "") {
          //para URL raíz
          if (element.attr('href').indexOf("index.html") !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
          }
        } else {
          //para otra url
          if (element.attr('href').indexOf(current) !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
            if (element.parents('.submenu-item').length) {
              element.addClass('active');
            }
          }
        } */
      }

      /* var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
      $('.nav li a', sidebar).each(function() {
        var $this = $(this);
        addActiveClass($this);
      })
  
      $('.horizontal-menu .nav li a').each(function() {
        var $this = $(this);
        addActiveClass($this);
      }) */
      
        //Cerrar otro submenú en la barra lateral al abrir cualquier

 /*    sidebar.on('show.bs.collapse', '.collapse', function() {
        sidebar.find('.collapse.show').collapse('hide');
      }); */
  

      //Cambiar la barra lateral y la altura del contenedor de contenido
    applyStyles();

    function applyStyles() {
      /* //Aplicando la barra de desplazamiento perfecta
      if (!body.hasClass("rtl")) {
        if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
          const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
        }
        if ($('.chats').length) {
          const chatsScroll = new PerfectScrollbar('.chats');
        }
        if (body.hasClass("sidebar-fixed")) {
          if($('#sidebar').length) {
            var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
          }
        }
      } */
    }


   /*  $('[data-toggle="minimize"]').on("click", function() {
        if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
          body.toggleClass('sidebar-hidden');
        } else {
          body.toggleClass('sidebar-icon-only');
        }
      }); */


      //checkbox y radios
   /*  $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

    //Menú horizontal en celular
    $('[data-toggle="horizontal-menu-toggle"]').on("click", function() {
      $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
    });
    // Navegación de menú horizontal en el menú de celular al hacer clic
    var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
    navItemClicked.on("click", function(event) {
      if(window.matchMedia('(max-width: 991px)').matches) {
        if(!($(this).hasClass('show-submenu'))) {
          navItemClicked.removeClass('show-submenu');
        }
        $(this).toggleClass('show-submenu');
      }        
    })
 */


 /*    $(window).scroll(function() {
        if(window.matchMedia('(min-width: 992px)').matches) {
          var header = $('.horizontal-menu');
          if ($(window).scrollTop() >= 70) {
            $(header).addClass('fixed-on-scroll');
          } else {
            $(header).removeClass('fixed-on-scroll');
          }
        }
      });
    }); */


    // enfocar la entrada al hacer clic en el icono de búsqueda
 /*  $('#navbar-search-icon').click(function() {
    $("#navbar-search-input").focus();
  }); */
  