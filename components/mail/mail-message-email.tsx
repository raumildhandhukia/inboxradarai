import * as React from "react";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@nextui-org/kbd";
interface InputProps {
  to: string[];
  cc: string[];
  bcc: string[];
  setTo: React.Dispatch<React.SetStateAction<string[]>>;
  setCc: React.Dispatch<React.SetStateAction<string[]>>;
  setBcc: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailInputs: React.FC<InputProps> = ({
  to,
  cc,
  bcc,
  setTo,
  setCc,
  setBcc,
}) => {
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const turnOnCc = () => setShowCc(true);
  const turnOnBcc = () => setShowBcc(true);
  const turnOffCc = () => {
    setShowCc(false);
    setCc([]);
  };
  const turnOffBcc = () => {
    setShowBcc(false);
    setBcc([]);
  };
  const [toCurrent, setToCurrent] = useState<string>("");
  const [ccCurrent, setCcCurrent] = useState<string>("");
  const [bccCurrent, setBccCurrent] = useState<string>("");

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    addressType: "TO" | "CC" | "BCC"
  ) => {
    if (e.key === "Enter") {
      if (addressType === "TO" && isValidEmail(toCurrent)) {
        if (!to.includes(toCurrent)) {
          setTo((prev) => [...prev, toCurrent]);
        }
        setToCurrent("");
      }
      if (addressType === "CC" && isValidEmail(ccCurrent)) {
        if (!cc.includes(ccCurrent)) {
          setCc((prev) => [...prev, ccCurrent]);
        }
        setCcCurrent("");
      }
      if (addressType === "BCC" && isValidEmail(bccCurrent)) {
        if (!bcc.includes(bccCurrent)) {
          setBcc((prev) => [...prev, bccCurrent]);
        }
        setBccCurrent("");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className=" border rounded-md flex items-center h-full gap-2 px-2">
        <p className="text-xs text-muted-foreground">To</p>
        <div className="flex gap-2 flex-wrap w-full">
          {to.map((email) => (
            <EmailBadge key={email} email={email} unSetEmail={setTo} />
          ))}

          <div className="relative flex-1">
            <input
              className="border-none h-5 focus:outline-none text-xs w-full"
              value={toCurrent}
              onChange={(e) => {
                setToCurrent(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e, "TO");
              }}
            />
            {toCurrent && toCurrent.length > 0 && isValidEmail(toCurrent) && (
              <div className="absolute -left-2">
                <button
                  type="button"
                  className="text-muted-foreground hover:underline text-xs text-white"
                  onClick={() => {
                    if (!to.includes(toCurrent)) {
                      setTo((prev) => [...prev, toCurrent]);
                    }
                    setToCurrent("");
                  }}
                >
                  <div className="bg-[#343436] px-2 rounded-lg flex gap-2 items-center jsutify-center py-1">
                    <p>{toCurrent}</p>
                    <div className="border rounded-md px-2 py-0">
                      <Kbd keys={["enter"]} className="scale-[1.12]" />
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {!showCc && (
          <button
            type="button"
            className="text-muted-foreground hover:underline text-xs"
            onClick={turnOnCc}
          >
            Cc
          </button>
        )}
        {!showBcc && (
          <button
            type="button"
            className="text-muted-foreground hover:underline text-xs"
            onClick={turnOnBcc}
          >
            Bcc
          </button>
        )}
      </div>

      {showCc && (
        <div className="border rounded-md flex items-center h-full gap-2 px-2">
          <p className="text-xs text-muted-foreground">Cc</p>
          <div className="flex gap-2 flex-wrap w-full">
            {cc.map((email) => (
              <EmailBadge key={email} email={email} unSetEmail={setCc} />
            ))}
            <div className="relative">
              <input
                className="border-none h-5 focus:outline-none text-xs w-full"
                value={ccCurrent}
                onChange={(e) => {
                  setCcCurrent(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, "CC");
                }}
              />
              {ccCurrent && ccCurrent.length > 0 && isValidEmail(ccCurrent) && (
                <div className="absolute -left-2">
                  <button
                    type="button"
                    className="text-muted-foreground hover:underline text-xs text-white"
                    onClick={() => {
                      if (!cc.includes(ccCurrent)) {
                        setCc((prev) => [...prev, ccCurrent]);
                      }
                      setCcCurrent("");
                    }}
                  >
                    <div className="bg-[#343436] px-2 rounded-lg flex gap-2 items-center jsutify-center py-1">
                      <p>{ccCurrent}</p>
                      <div className="border rounded-md px-2 py-0">
                        <Kbd keys={["enter"]} className="scale-[1.12]" />
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            className="text-muted-foreground hover:underline text-xs"
            onClick={turnOffCc}
          >
            <IoCloseSharp />
          </button>
        </div>
      )}
      {showBcc && (
        <div className="border rounded-md flex items-center h-full gap-2 px-2">
          <p className="text-xs text-muted-foreground">Bcc</p>
          <div className="flex gap-2 flex-wrap w-full">
            {bcc.map((email) => (
              <EmailBadge key={email} email={email} unSetEmail={setBcc} />
            ))}
            <div className="relative">
              <input
                className="border-none h-5 focus:outline-none text-xs w-full"
                value={bccCurrent}
                onChange={(e) => {
                  setBccCurrent(e.target.value);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, "BCC");
                }}
              />
              {bccCurrent &&
                bccCurrent.length > 0 &&
                isValidEmail(bccCurrent) && (
                  <div className="absolute -left-2">
                    <button
                      type="button"
                      className="text-muted-foreground hover:underline text-xs text-white"
                      onClick={() => {
                        if (!bcc.includes(bccCurrent)) {
                          setBcc((prev) => [...prev, bccCurrent]);
                        }
                        setBccCurrent("");
                      }}
                    >
                      <div className="bg-[#343436] px-2 rounded-lg flex gap-2 items-center jsutify-center py-1">
                        <p>{bccCurrent}</p>
                        <div className="border rounded-md px-2 py-0">
                          <Kbd keys={["enter"]} className="scale-[1.12]" />
                        </div>
                      </div>
                    </button>
                  </div>
                )}
            </div>
          </div>
          <button
            type="button"
            className="text-muted-foreground hover:underline text-xs"
            onClick={turnOffBcc}
          >
            <IoCloseSharp />
          </button>
        </div>
      )}
    </div>
  );
};

const EmailBadge = ({
  email,
  unSetEmail,
}: {
  email: string;
  unSetEmail: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <Badge className="text-xs flex gap-1">
      <button
        onClick={() => {
          unSetEmail((prev) => prev.filter((e) => e !== email));
        }}
      >
        <IoCloseSharp />
      </button>
      <span>{email}</span>
    </Badge>
  );
};

export default EmailInputs;
