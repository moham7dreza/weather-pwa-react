import {useEffect, useState} from "react";

const InstallButton = () => {
    // پرامپتی که به تعویق انداخته شده
    const [deferredPrompt, setDeferredPrompt] = useState(null)

    const [showInstallButton, setShowInstallButton] = useState(false)

    // توی این چرخه حیات از نمایش پاپ اپ پیش فرض نصب برنامه جلوگیری کرده و میخوام دکمه شخصی خودم رو نمایش بدم که نصب کنه
    useEffect(() => {
        const handleBeforeInstallPrompt = e => {
            e.preventDefault() // do not show default prompt

            setDeferredPrompt(e)
            setShowInstallButton(true)
        }
        // this event listener should be unmounted
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        }
    }, []); // only one time should be run

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then(result => {
                if (result.outcome === 'accepted') {
                    console.log('accepted')
                } else {
                    console.log('dismissed')
                }
                setDeferredPrompt(null)
                setShowInstallButton(false)
            })
        }
    }

    return (
        <>
            {
                showInstallButton && (
                    <button className="install-button" onClick={handleInstallClick}>نصب برنامه به صورت pwa</button>
                )
            }
        </>
    )
}

export default InstallButton