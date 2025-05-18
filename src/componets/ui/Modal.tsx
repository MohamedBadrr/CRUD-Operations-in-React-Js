import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { ReactNode } from "react";

interface IProps {
  isOpen : boolean;
  close : () => void;
  title ?:string;
  children : ReactNode;
}
export default function Modal({close , isOpen , title , children}:IProps) {


  return (
    <>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none bg-red-500 flex items-center justify-center w-full"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-2xl p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-5"
            >
              <DialogTitle
                as="h3"
                className="text-[30px] font-medium text-black "
              >
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                {}
              </p>
              <div className="mt-4">
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
