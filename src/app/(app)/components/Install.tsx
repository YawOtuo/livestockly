// import React, { useEffect, useState } from "react";

// function Install() {
//   const [deferredPrompt, setDeferredPrompt] = useState<null>(null);

//   useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//       event.preventDefault(); // Prevent the mini info bar from appearing on mobile
//       setDeferredPrompt(event); // Stash the event so it can be triggered later
//       const installBtn = document.getElementById(
//         "installBtn"
//       ) as HTMLButtonElement;
//       if (installBtn) {
//         installBtn.style.display = "block"; // Show the install button
//       }
//     };

//     window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

//     // Clean up the event listener
//     return () => {
//       window.removeEventListener(
//         "beforeinstallprompt",
//         handleBeforeInstallPrompt
//       );
//     };
//   }, []);

//   const handleInstallClick = async () => {
//     if (deferredPrompt) {
//       deferredPrompt.prompt(); // Show the install prompt
//       const { outcome } = await deferredPrompt.userChoice; // Wait for the user to respond to the prompt
//       console.log(`User response to the install prompt: ${outcome}`);
//       setDeferredPrompt(null); // Clear the deferredPrompt variable
//     }
//   };

//   return (
//     <div>
//       <button
//         id="installBtn"
//         style={{ display: "none" }}
//         onClick={handleInstallClick}>
//         Install App
//       </button>
//     </div>
//   );
// }

// export default Install;
