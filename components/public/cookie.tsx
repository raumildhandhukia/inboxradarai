import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "../ui/button";
import Link from "next/link";

const CookieConsent = () => {
  const [cookie, setCookie] = useCookies(["cookieConsent"]);
  const [accepted, setAccepted] = useState(false);
  const giveCookieConsent = () => {
    setCookie("cookieConsent", "true", { path: "/" });
    setAccepted(true);
  };

  return (
    <>
      {accepted ? (
        <></>
      ) : (
        <div>
          <div className="fixed border-2 bottom-3 left-3 w-[50%] bg-white px-4 pt-3 rounded-2xl shadow-2xl flex justify-between gap-20">
            <p className="text-sm">
              This website uses cookies to ensure you get the best experience.
              By continuing to use this site, you agree to our use of cookies.
              <Button variant="link" className="underline -ml-3">
                <Link href="/cookie-policy">Learn more</Link>
              </Button>
            </p>

            <Button onClick={giveCookieConsent}>Accept</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
