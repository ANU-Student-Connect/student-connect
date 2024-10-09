import React, { useEffect, useRef } from 'react';

const LottieTypingAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);

        script.onload = () => {
            if (containerRef.current) {
                const player = document.createElement('dotlottie-player');
                player.setAttribute('src', "https://lottie.host/741932f1-08e9-4f7a-83b4-a1fbfc8c7a19/3fLvNwfBbk.json");
                player.setAttribute('background', "transparent");
                player.setAttribute('speed', "1");
                player.setAttribute('loop', '');
                player.setAttribute('autoplay', '');
                player.style.width = '20px';
                player.style.height = '20px';
                containerRef.current.appendChild(player);
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div ref={containerRef}></div>;
};

export default LottieTypingAnimation;