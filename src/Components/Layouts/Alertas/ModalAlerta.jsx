import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//{tituloModal,tipoModal}
export const AlertaModal = ({tituloModal,tipoModal, colorModal, tiempoModal}) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
        icon: tipoModal,
        title: tituloModal,
         toast: true,
        position: 'top-right',
        iconColor: 'white',
        color:'white',
        background: colorModal,
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: tiempoModal ? tiempoModal : 1500,
        timerProgressBar: true
      })
}