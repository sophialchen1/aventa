import fbblanca from '../assets/media/icons/facebook.png'
import fbnegra from '../assets/media/icons/facebookn.png'

import insblanca from '../assets/media/icons/instagram.png'
import instnegra from '../assets/media/icons/instagramn.png'

import linblanca from '../assets/media/icons/linkedin.png'
import linnegra from '../assets/media/icons/linkedinn.png'

import whatblanca from '../assets/media/icons/whatsapp.png'
import whatnegra from '../assets/media/icons/whatsappn.png'

export const medias = [
    {
        id: 1,
        name: 'whatsapp',
        url: /*'https://wa.me/message/RL46H5JT7E3SM1'*/ 'https://api.whatsapp.com/send/?phone=%2B524151246467',
        evento: 'whatsapp_sec',
        target: '_blank',
        imagen: {
            blanca: whatblanca,
            negra: whatnegra,
        }
    },
    {
        id: 2,
        name: 'instagram',
        url: 'https://www.instagram.com/aventawindows',
        evento: 'instagram_click',
        target: '_blank',
        imagen: {
            blanca: insblanca,
            negra: instnegra,
        }
    },
    {
        id: 3,
        name: 'facebook',
        url: 'https://www.facebook.com/aventawindows',
        evento: 'facebook_click',
        target: '_blank',
        imagen: {
            blanca: fbblanca,
            negra: fbnegra,
        }
    },
    {
        id: 4,
        name: 'linkedin',
        url: 'https://www.linkedin.com/company/aventa-windows',
        evento: 'linkedin_click',
        target: '_blank',
        imagen: {
            blanca: linblanca,
            negra: linnegra,
        }
    }
]

