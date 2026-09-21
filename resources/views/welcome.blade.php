<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="{{ url()->current() }}">
    {{-- Icons. Files live at the web root, not in build/, so they are uploaded
         separately from the Vite output. See DEPLOY.md. --}}
    <link rel="icon" href="/favicon.ico" sizes="32x32">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="theme-color" content="#EE7466">
    <title>Aventa</title>
    @vite('resources/css/app.css')
    @vite('resources/js/app.js')

    <script src="https://js.hsforms.net/forms/embed/24148893.js" defer></script>
    <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/24148893.js"></script>

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NV4MJRZX');</script>
    <!-- End Google Tag Manager -->
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16750250703"></script>

    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-16750250703');
    </script>

    <script>
        // Mismo mapa que ya tienes
        const conversionIds = {
            whatsapp: '-bajCOm9mOEZEM-VkrM-',
            whatsapp_sec: '888wCN7pxaAbEM-VkrM-',
            phone_click: 'urWICJmgscsaEM-VkrM-',
            facebook_click: '2XcaCJygscsaEM-VkrM-',
            instagram_click: 'MxP-CJ-gscsaEM-VkrM-',
            linkedin_click: 'X8d2CJ2hscsaEM-VkrM-',
            physical_address_click: 'jwKJCJ2VwssaEM-VkrM-'
        };

        // ⬇️ Clave: colgarla explícitamente de window
        window.gtag_report_conversion = function (url, eventType) {
            const callback = function () {
                if (typeof url !== 'undefined' && url) {
                    window.location = url; // o window.open(url, '_blank') si quieres nueva pestaña
                }
            };

            const conversionId = conversionIds[eventType];
            if (conversionId && typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-16750250703/' + conversionId,
                    event_callback: callback
                });
            } else {
                console.warn('Evento sin ID definido o gtag no cargó:', eventType);
                callback();
            }
            return false;
        };
    </script>

</head>
<body>
<div id="app"></div>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NV4MJRZX"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
</body>
</html>

